/**
 * projects.js — renders the numbered accordion from data/projects.js and
 * manages which row is open. Re-renders when the language changes; opening
 * and closing is done in place so focus and scroll position survive.
 */
import { projects, LINK_LABELS } from "../data/projects.js";
import { getLang, t, onLangChange } from "./i18n.js";
import { renderShots } from "./gallery.js";

/** @type {string} */
let openId = projects.length ? projects[0].id : "";

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function techLine(project) {
  return project.tech.join(" · ");
}

function projectLinks(project) {
  const entries = Object.entries(project.links).filter(([, href]) => href);
  if (!entries.length) return "";
  return `
    <div class="project__links">
      ${entries
        .map(
          ([key, href]) => `
        <a class="btn btn--sm" href="${esc(href)}" target="_blank"
           rel="noopener noreferrer">${t(LINK_LABELS[key])}
          <span aria-hidden="true">↗</span></a>`
        )
        .join("")}
    </div>`;
}

function body(project) {
  const lang = getLang();
  const description =
    (project.description && (project.description[lang] || project.description.en)) || "";
  const badge = project.status
    ? `<span class="badge">${esc(t(project.status))}</span>`
    : "";
  const extra = [project.role, project.period].filter(Boolean).join(" · ");

  return `
    <div class="project__body" id="p-${esc(project.id)}-body">
      <p class="project__desc">${badge}${esc(description)}</p>
      <p class="project__meta">${esc(techLine(project))}</p>
      ${extra ? `<p class="project__meta">${esc(extra)}</p>` : ""}
      ${renderShots(project)}
      ${projectLinks(project)}
    </div>`;
}

function row(project, i) {
  const isOpen = project.id === openId;
  const num = String(i + 1).padStart(2, "0");
  return `
    <article class="project${isOpen ? " is-open" : ""}" data-project="${esc(project.id)}">
      <h3 class="project__heading">
        <button class="project__head" type="button"
                data-project-toggle="${esc(project.id)}"
                aria-expanded="${isOpen}"
                aria-controls="p-${esc(project.id)}-body">
          <span class="project__num">${num}</span>
          <span class="project__title">${esc(project.title)}</span>
          <span class="project__tech">${esc(techLine(project))}</span>
          <span class="project__toggle" aria-hidden="true">+</span>
        </button>
      </h3>
      ${body(project)}
    </article>`;
}

function render() {
  const root = document.getElementById("projectList");
  if (!root) return;
  root.innerHTML = projects.map(row).join("");
}

/**
 * Open exactly one row (or none when id is empty) without re-rendering.
 * @param {string} id
 */
function setOpen(id) {
  openId = id;
  document.querySelectorAll(".project").forEach((article) => {
    const match = article.dataset.project === id;
    article.classList.toggle("is-open", match);
    const btn = article.querySelector("[data-project-toggle]");
    if (btn) btn.setAttribute("aria-expanded", String(match));
  });
}

export function initProjects() {
  const root = document.getElementById("projectList");
  if (!root) return;

  render();

  document.addEventListener("click", (e) => {
    const head = e.target.closest("[data-project-toggle]");
    if (!head) return;
    const id = head.dataset.projectToggle;
    setOpen(openId === id ? "" : id);
  });

  onLangChange(render);
}
