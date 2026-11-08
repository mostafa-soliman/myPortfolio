/**
 * nav.js — in-page navigation: smooth scrolling that respects
 * prefers-reduced-motion, IntersectionObserver scroll-spy, active states for
 * both the desktop header nav and the mobile bottom bar, and the hero CV
 * link resolved from data/links.js.
 */
import { links } from "../data/links.js";

const SECTIONS = ["home", "about", "experience", "projects", "contact"];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Mark one section as current in both navigation bars.
 * @param {string} id
 */
function setActive(id) {
  document
    .querySelectorAll(".nav__link[data-go], .bottom-nav__item[data-go]")
    .forEach((el) => {
      const active = el.dataset.go === id;
      el.classList.toggle("is-active", active);
      if (active) el.setAttribute("aria-current", "true");
      else el.removeAttribute("aria-current");
    });
}

/**
 * Scroll a section into view and keep the URL shareable.
 * @param {string} id
 */
function goTo(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  setActive(id);
  try {
    history.replaceState(null, "", `#${id}`);
  } catch {
    /* file:// or blocked history — the scroll still happened */
  }
}

function initSpy() {
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  SECTIONS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

function applyCvLink() {
  const cv = document.getElementById("cvLink");
  if (cv && links.cv) cv.href = links.cv;
}

export function initNav() {
  applyCvLink();

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-go]");
    if (!trigger) return;
    // keep the native hash fallback for no-JS, but own the scroll here
    e.preventDefault();
    goTo(trigger.dataset.go);
  });

  const fromHash = location.hash.replace("#", "");
  setActive(SECTIONS.includes(fromHash) ? fromHash : SECTIONS[0]);

  initSpy();
}
