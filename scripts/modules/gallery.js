/**
 * gallery.js — renders the device-frame screenshot strip for a project and
 * drives the lightbox (Esc / arrow keys, focus trap, RTL-aware arrows).
 *
 * Shot data is read from the DOM (data-src / data-alt) so no registry has to
 * stay in sync with the accordion re-renders.
 */
import { t } from "./i18n.js";

const SHOT_W = 132;
const SHOT_H = 264;

/** @type {{src: string, alt: string}[]} */
let shots = [];
let index = 0;
let blurred = false;
let isOpen = false;
/** @type {HTMLElement|null} */
let lastFocused = null;

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Build the gallery markup for one project.
 * @param {import("../data/projects.js").projects[number]} project
 * @returns {string} HTML
 */
export function renderShots(project) {
  if (!project.images.length) return "";

  const buttons = project.images
    .map((src, i) => {
      const alt = t("shotAlt")
        .replace("{n}", String(i + 1))
        .replace("{title}", project.title);
      const safeAlt = escapeAttr(alt);
      return `
        <button class="shot" type="button" data-shot
                data-src="${escapeAttr(src)}" data-alt="${safeAlt}">
          <span class="phone">
            <img src="${escapeAttr(src)}" alt="${safeAlt}"
                 width="${SHOT_W}" height="${SHOT_H}"
                 loading="lazy" decoding="async">
          </span>
        </button>`;
    })
    .join("");

  const note = project.blur
    ? `<span class="shots-note">${escapeAttr(t("pend"))}</span>`
    : "";

  return `
    <div class="shots${project.blur ? " shots--blur" : ""}"
         data-blur="${project.blur ? "1" : "0"}">${buttons}</div>${note}`;
}

function element(id) {
  return document.getElementById(id);
}

function render() {
  const current = shots[index];
  if (!current) return;
  const img = element("lightboxImg");
  const cap = element("lightboxCap");
  const count = element("lightboxCount");
  const box = element("lightbox");
  if (img) {
    img.src = current.src;
    img.alt = current.alt;
  }
  if (cap) cap.textContent = current.alt;
  if (count) count.textContent = `${index + 1} / ${shots.length}`;
  if (box) box.classList.toggle("is-blurred", blurred);
}

function show() {
  const box = element("lightbox");
  if (!box) return;
  box.hidden = false;
  document.body.classList.add("is-locked");
  isOpen = true;
  const close = element("lightboxClose");
  if (close) close.focus();
}

function hide() {
  const box = element("lightbox");
  if (!box || !isOpen) return;
  box.hidden = true;
  document.body.classList.remove("is-locked");
  isOpen = false;
  if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
}

/**
 * Move through the strip; wraps around at both ends.
 * @param {number} step
 */
function move(step) {
  if (!shots.length) return;
  index = (index + step + shots.length) % shots.length;
  render();
}

function open(trigger) {
  const container = trigger.closest(".shots");
  if (!container) return;
  const nodes = [...container.querySelectorAll("[data-shot]")];
  const found = nodes.indexOf(trigger);
  if (found < 0) return;

  shots = nodes.map((node) => ({
    src: node.dataset.src || "",
    alt: node.dataset.alt || "",
  }));
  index = found;
  blurred = container.dataset.blur === "1";
  lastFocused = trigger;
  render();
  show();
}

function focusables() {
  const box = element("lightbox");
  if (!box) return [];
  return [...box.querySelectorAll("button:not([disabled])")];
}

function trapTab(e) {
  const list = focusables();
  if (!list.length) return;
  const first = list[0];
  const last = list[list.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

export function initGallery() {
  document.addEventListener("click", (e) => {
    const shot = e.target.closest("[data-shot]");
    if (shot) {
      open(shot);
      return;
    }
    if (e.target.closest("[data-lb-close]")) {
      hide();
      return;
    }
    if (e.target.closest("[data-lb-prev]")) {
      move(-1);
      return;
    }
    if (e.target.closest("[data-lb-next]")) {
      move(1);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!isOpen) return;
    if (e.key === "Escape") {
      e.preventDefault();
      hide();
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      // in RTL the reading direction is mirrored, so "back" is ArrowRight
      move(document.documentElement.dir === "rtl" ? 1 : -1);
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      move(document.documentElement.dir === "rtl" ? -1 : 1);
      return;
    }
    if (e.key === "Tab") trapTab(e);
  });
}
