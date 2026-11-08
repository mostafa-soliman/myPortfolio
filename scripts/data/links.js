/**
 * Outbound links. An empty string hides the control that renders it —
 * nothing else has to change when a link goes live.
 */
export const links = {
  github: "https://github.com/mostafa-soliman",
  linkedin: "https://www.linkedin.com/in/mostafa-soliman-fadali",
  whatsapp: "https://wa.me/201128356597",
  email: "mailto:m.fadaly52@gmail.com",
  upwork: "", // TODO: add the Upwork profile URL
  cv: "assets/cv/Mostafa_Soliman_ReactNative_CV.pdf",
  domain: "mostafafadali.me",
};

/** Rendered in the contact section — filtered by the module that uses it. */
export const socialLinks = [
  { label: "GitHub", href: links.github, external: true },
  { label: "LinkedIn", href: links.linkedin, external: true },
  { label: "WhatsApp", href: links.whatsapp, external: true },
  { label: "Email", href: links.email, external: false },
  { label: "Upwork", href: links.upwork, external: true },
];
