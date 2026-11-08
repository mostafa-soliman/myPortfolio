/**
 * Runtime configuration — no secrets live here beyond the public keys that
 * the browser must send anyway (EmailJS public key / Web3Forms access key
 * are designed to be exposed). Restrict them per-domain on the provider
 * side; see readme.md → "Setting up the contact form".
 */
export const config = {
  /** "emailjs" | "web3forms" */
  provider: "emailjs",

  /* EmailJS (https://dashboard.emailjs.com) */
  serviceId: "",
  templateId: "",
  publicKey: "",

  /* Web3Forms (https://web3forms.com) — used when provider === "web3forms" */
  web3formsKey: "",

  /* Fallback "send via email app" recipient + reply target */
  receiverEmail: "m.fadaly52@gmail.com",

  /** Seconds the submit button stays disabled after a successful send. */
  cooldownSeconds: 30,
};

/** True when the selected provider has everything it needs to POST. */
export function isConfigured() {
  if (config.provider === "web3forms") return Boolean(config.web3formsKey);
  return Boolean(config.serviceId && config.templateId && config.publicKey);
}
