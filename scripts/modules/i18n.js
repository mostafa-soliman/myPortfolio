/**
 * i18n — single source of truth for every visible string.
 *
 * Owns: language detection + persistence, <html lang/dir>, static text
 * binding ([data-i] / [data-h] / [data-ph] / [data-aria]) and document
 * metadata. Modules subscribe through onLangChange() to re-render anything
 * they built themselves.
 */
import en from "../i18n/en.js";
import ar from "../i18n/ar.js";

const DICT = { en, ar };
const STORAGE_KEY = "lang";

/** @type {Set<(lang: string) => void>} */
const listeners = new Set();

let lang = "en";

/** @returns {"en"|"ar"} */
export function getLang() {
  return lang;
}

/**
 * Translate a key. Falls back to English, then to the key itself so a typo
 * never renders "undefined".
 * @param {string} key
 * @returns {string}
 */
export function t(key) {
  return (DICT[lang] && DICT[lang][key]) || DICT.en[key] || key;
}

/**
 * Subscribe to language changes.
 * @param {(lang: string) => void} fn
 * @returns {() => void} unsubscribe
 */
export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function detect() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && DICT[saved]) return saved;
  } catch {
    /* private mode — fall through to the browser language */
  }
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("ar") ? "ar" : "en";
}

function setMeta(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute("content", value);
}

function applyStaticText() {
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i]").forEach((el) => {
    el.textContent = t(el.dataset.i);
  });
  document.querySelectorAll("[data-h]").forEach((el) => {
    el.innerHTML = t(el.dataset.h);
  });
  document.querySelectorAll("[data-ph]").forEach((el) => {
    el.placeholder = t(el.dataset.ph);
  });
  document.querySelectorAll("[data-alt]").forEach((el) => {
    el.alt = t(el.dataset.alt);
  });
  document.querySelectorAll("[data-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.aria));
  });

  // The visible label must appear inside the accessible name (WCAG 2.5.3),
  // so rebuild the two controls whose text is their own name.
  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.setAttribute(
      "aria-label",
      `${langBtn.textContent.trim()} — ${t("ariaLang")}`
    );
  }
  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.setAttribute(
      "aria-label",
      `${themeBtn.textContent.trim()} — ${t("ariaTheme")}`
    );
  }

  // decorative tech strip — repeated an even number of times so the
  // translateX(-50%) keyframe loops seamlessly
  const marquee = document.getElementById("marqueeTrack");
  if (marquee) marquee.textContent = t("marquee").repeat(4);
}

function applyMetadata() {
  const title = t("metaTitle");
  const description = t("metaDescription");
  document.title = title;
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[name="twitter:title"]', title);
  setMeta('meta[name="twitter:description"]', description);
}

function apply() {
  applyStaticText();
  applyMetadata();
  listeners.forEach((fn) => fn(lang));
}

/**
 * Switch language, persist it and repaint.
 * @param {"en"|"ar"} next
 */
export function setLang(next) {
  if (!DICT[next] || next === lang) return;
  lang = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore quota / private mode */
  }
  apply();
}

/** Toggle between English and Arabic. */
export function toggleLang() {
  setLang(lang === "en" ? "ar" : "en");
}

/** Read the stored language (or the browser's) and paint the document. */
export function initI18n() {
  lang = detect();
  apply();

  const btn = document.getElementById("langBtn");
  if (btn) btn.addEventListener("click", toggleLang);
}
