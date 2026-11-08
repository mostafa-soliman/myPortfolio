/**
 * contact.js — the contact form and the social link list.
 *
 * No backend: the form POSTs straight to EmailJS or Web3Forms (see
 * data/config.js). When the provider is unconfigured or a send fails, a
 * "Send via email app" button appears and composes a mailto: with whatever
 * the visitor typed. Also owns: per-field validation in the active language,
 * honeypot, loading / success / error states and a cooldown that stops
 * double sends.
 */
import { config, isConfigured } from "../data/config.js";
import { socialLinks } from "../data/links.js";
import { t, onLangChange } from "./i18n.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELDS = [
  { input: "cName", error: "errName", messageKey: "eName", test: (v) => v.trim().length > 0 },
  { input: "cEmail", error: "errEmail", messageKey: "eEmail", test: (v) => EMAIL_RE.test(v.trim()) },
  { input: "cSubject", error: "errSubject", messageKey: "eSubject", test: (v) => v.trim().length > 0 },
  { input: "cMessage", error: "errMessage", messageKey: "eMessage", test: (v) => v.trim().length > 0 },
];

let lastSentAt = 0;
let cooldownTimer = 0;
let isLoading = false;

/** @type {string} */
let statusKind = "";
/** @type {string} */
let statusKey = "";

/** @param {string} id */
function el(id) {
  return document.getElementById(id);
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------------------------------------------------------------- links -- */

function renderSocialLinks() {
  const host = el("socialLinks");
  if (!host) return;
  host.innerHTML = socialLinks
    .filter((item) => item.href)
    .map(
      (item) =>
        `<a href="${esc(item.href)}"${
          item.external ? ' target="_blank" rel="noopener noreferrer"' : ""
        }>${esc(item.label)}</a>`
    )
    .join("");
}

/* -------------------------------------------------------------- status -- */

function paintStatus() {
  const msg = el("formMsg");
  if (!msg) return;
  msg.className = "form-msg" + (statusKind ? ` is-${statusKind}` : "");
  msg.textContent = statusKey ? t(statusKey) : "";
}

/**
 * @param {""|"ok"|"error"} kind
 * @param {string} key i18n key (empty clears the message)
 */
function setStatus(kind, key) {
  statusKind = kind;
  statusKey = key;
  paintStatus();
}

/* ------------------------------------------------------------- fields -- */

function clearField(field) {
  const input = el(field.input);
  const error = el(field.error);
  if (input) input.removeAttribute("aria-invalid");
  if (error) {
    error.textContent = "";
    error.hidden = true;
  }
}

function clearErrors() {
  FIELDS.forEach(clearField);
}

function validateField(field) {
  const input = el(field.input);
  const error = el(field.error);
  if (!input) return true;
  const ok = field.test(input.value);
  if (ok) {
    clearField(field);
  } else {
    input.setAttribute("aria-invalid", "true");
    if (error) {
      error.textContent = t(field.messageKey);
      error.hidden = false;
    }
  }
  return ok;
}

/* ------------------------------------------------------------ loading -- */

function setLoading(on) {
  isLoading = on;
  const btn = el("submitBtn");
  const spinner = el("submitSpinner");
  const label = el("submitLabel");
  if (spinner) spinner.hidden = !on;
  if (label) label.textContent = on ? t("sending") : t("send");
  if (btn) btn.disabled = on || inCooldown();
}

/* ----------------------------------------------------------- cooldown -- */

function cooldownLeft() {
  if (!lastSentAt) return 0;
  return config.cooldownSeconds * 1000 - (Date.now() - lastSentAt);
}

function inCooldown() {
  return cooldownLeft() > 0;
}

function startCooldown() {
  lastSentAt = Date.now();
  const btn = el("submitBtn");
  if (btn) btn.disabled = true;
  clearInterval(cooldownTimer);
  cooldownTimer = window.setInterval(() => {
    if (cooldownLeft() > 0) return;
    clearInterval(cooldownTimer);
    const button = el("submitBtn");
    if (button && !isLoading) button.disabled = false;
    if (statusKey === "wait" || statusKey === "sent") setStatus("", "");
  }, 500);
}

/* ------------------------------------------------------------- mailto -- */

function showMailto() {
  const btn = el("mailtoBtn");
  if (btn) btn.hidden = false;
}

function refreshMailto() {
  const btn = el("mailtoBtn");
  if (!btn) return;
  const name = (el("cName") || {}).value || "";
  const email = (el("cEmail") || {}).value || "";
  const subject = (el("cSubject") || {}).value || "";
  const message = (el("cMessage") || {}).value || "";
  const body = [message.trim(), "", "— " + name.trim(), email.trim()].join("\n");
  const to = encodeURIComponent(config.receiverEmail);
  btn.href = `mailto:${to}?subject=${encodeURIComponent(
    subject.trim()
  )}&body=${encodeURIComponent(body)}`;
}

/* -------------------------------------------------------------- send --- */

async function sendEmailJS(payload) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: config.serviceId,
      template_id: config.templateId,
      user_id: config.publicKey,
      template_params: {
        from_name: payload.name,
        from_email: payload.email,
        subject: payload.subject,
        message: payload.message,
        reply_to: payload.email,
      },
    }),
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}`);
}

async function sendWeb3Forms(payload) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: config.web3formsKey,
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      from_name: payload.name,
      reply_to: payload.email,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) throw new Error(`Web3Forms ${res.status}`);
}

function send(payload) {
  return config.provider === "web3forms"
    ? sendWeb3Forms(payload)
    : sendEmailJS(payload);
}

/* ------------------------------------------------------------- submit -- */

async function onSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;

  // honeypot: real visitors never see this field
  const honeypot = el("cHoneypot");
  if (honeypot && honeypot.value) {
    setStatus("ok", "sent");
    form.reset();
    clearErrors();
    return;
  }

  if (inCooldown()) {
    setStatus("error", "wait");
    return;
  }

  clearErrors();
  const valid = FIELDS.map(validateField).every(Boolean);
  if (!valid) {
    setStatus("error", "bad");
    return;
  }

  if (!isConfigured()) {
    setStatus("error", "fail");
    showMailto();
    refreshMailto();
    return;
  }

  const payload = {
    name: el("cName").value.trim(),
    email: el("cEmail").value.trim(),
    subject: el("cSubject").value.trim(),
    message: el("cMessage").value.trim(),
  };

  setLoading(true);
  setStatus("", "");

  try {
    await send(payload);
    form.reset();
    clearErrors();
    setStatus("ok", "sent");
    startCooldown();
  } catch (err) {
    setStatus("error", "fail");
    showMailto();
    refreshMailto();
  } finally {
    setLoading(false);
  }
}

/* --------------------------------------------------------------- init -- */

export function initContact() {
  renderSocialLinks();

  const form = el("contactForm");
  if (!form) return;

  form.addEventListener("submit", onSubmit);
  form.addEventListener("input", (e) => {
    const field = FIELDS.find((f) => el(f.input) === e.target);
    if (field) clearField(field);
    refreshMailto();
  });

  // the fallback button only matters when there is no working provider
  if (!isConfigured()) showMailto();
  refreshMailto();

  onLangChange(() => {
    paintStatus();
    if (isLoading) {
      const label = el("submitLabel");
      if (label) label.textContent = t("sending");
    }
    refreshMailto();
  });
}
