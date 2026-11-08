/**
 * theme.js — dark / light toggle. Default is dark; the value is mirrored to
 * <html data-theme> which style/themes.css keys off. A tiny inline script in
 * <head> applies it before first paint so there is no flash.
 */
import { t, onLangChange } from "./i18n.js";

const STORAGE_KEY = "theme";

/** @type {"dark"|"light"} */
let theme = "dark";

/** @returns {"dark"|"light"} */
export function getTheme() {
  return theme;
}

function read() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function write(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
}

function paintLabel() {
  const btn = document.getElementById("themeBtn");
  if (!btn) return;
  btn.textContent = theme === "dark" ? t("toLight") : t("toDark");
  // keep the visible word inside the accessible name (WCAG 2.5.3)
  btn.setAttribute(
    "aria-label",
    `${btn.textContent.trim()} — ${t("ariaTheme")}`
  );
}

function apply() {
  document.documentElement.dataset.theme = theme;
  paintLabel();
}

/**
 * @param {"dark"|"light"} next
 */
export function setTheme(next) {
  if (next !== "dark" && next !== "light") return;
  theme = next;
  write(next);
  apply();
}

export function toggleTheme() {
  setTheme(theme === "dark" ? "light" : "dark");
}

export function initTheme() {
  const saved = read();
  theme = saved === "light" ? "light" : "dark";
  apply();

  const btn = document.getElementById("themeBtn");
  if (btn) btn.addEventListener("click", toggleTheme);

  // the button label is translated, so repaint it when the language flips
  onLangChange(paintLabel);
}
