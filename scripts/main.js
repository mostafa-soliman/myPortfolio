/**
 * main.js — single entry point. Every module owns exactly one concern and
 * exposes an init function; this file only wires them up in dependency order
 * (i18n first: the other modules translate through it).
 */
import { initI18n } from "./modules/i18n.js";
import { initTheme } from "./modules/theme.js";
import { initNav } from "./modules/nav.js";
import { initProjects } from "./modules/projects.js";
import { initGallery } from "./modules/gallery.js";
import { initContact } from "./modules/contact.js";

function init() {
  initI18n();
  initTheme();
  initNav();
  initProjects();
  initGallery();
  initContact();

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
