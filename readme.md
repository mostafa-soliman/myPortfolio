# My Portfolio

Personal portfolio of **Mostafa Soliman Fadali** — React Native & Android Developer. An editorial, soft Neo‑Brutalist one‑page site built with plain **HTML5 + CSS3 + vanilla JavaScript ES Modules**. No frameworks, no build step, no backend.

## Live Demo

- Production: [https://mostafafadali.me/](https://mostafafadali.me/)
- GitHub Pages: [https://mostafa-soliman.github.io/myPortfolio/](https://mostafa-soliman.github.io/myPortfolio/)

## Features and Functions

### Tech Stack & Structure

- Semantic HTML5, CSS3 with custom properties, and native ES Modules (`<script type="module">`).
- Zero dependencies and zero build tooling — the site runs as‑is from any static host (Live Server, GitHub Pages, Vercel, Netlify).
- CSS split by responsibility: `base` (reset, tokens, typography, a11y), `themes` (colours), `layout` (page scaffolding), `components` (UI parts), `responsive` (breakpoints 360 → 1920px).
- One concern per JavaScript module; `scripts/main.js` only wires the `init*` functions in dependency order.

### Fonts

- Self‑hosted variable woff2 in `webfonts/` with `font-display: swap` — no Google Fonts request.
- **Fraunces** (display serif) + **DM Sans** (UI) for English, **Cairo** for Arabic.
- The Latin fonts are preloaded in `<head>`; when the saved language is Arabic the pre‑paint script swaps in a Cairo preload.

### Pre‑paint Theme Script

- A tiny inline script in `<head>` reads `localStorage` (`lang`, `theme`) and sets `<html lang dir data-theme>` **before first paint**, so there is no flash of the wrong theme/language.

### Navigation

- **Desktop (≥ 1024px):** sticky header with logo, section links, and the Colors / Language / Theme controls.
- **Mobile (< 1024px):** fixed bottom bar with 5 icon+label items, `env(safe-area-inset-bottom)` padding, active item filled with the accent colour, and extra `body` padding so content is never covered.
- Scroll‑spy via `IntersectionObserver` marks the current section in both bars (`aria-current`).
- Smooth scrolling that automatically falls back to instant scrolling under `prefers-reduced-motion`.

### Dark / Light Mode

- Toggle button in the header; default is **dark**. Persisted in `localStorage` under `theme`.
- The button label ("Light"/"Dark", "فاتح"/"داكن") and its `aria-label` update on every toggle and language change.

### Colour Tokens (Vermilion, dark + light)

- A single accent scheme (**Vermilion**) in two modes, defined as CSS custom properties in `style/themes.css`.
- Every foreground/background pair is verified **≥ 4.5:1 (WCAG AA)** by `tools/check-contrast.py` (18 pairs).

### Language Toggle (English / العربية)

- All visible strings live in `scripts/i18n/en.js` and `scripts/i18n/ar.js`; nothing is hardcoded in the markup (`data-i`, `data-h`, `data-ph`, `data-alt`, `data-aria` bindings).
- Switching sets `dir="rtl"` + `lang="ar"`, persists under `lang`, and defaults from the browser language on first visit.
- Layout uses CSS **logical properties** (`margin-inline`, `inset-inline-start`, …) so RTL needs no extra rules; directional glyphs (`.arr`) auto‑mirror.
- Technical terms (React Native, Expo, Kotlin, API…) intentionally stay in English inside the Arabic copy.

### Sections

- **Hero** — availability tag, oversized name, role, lead, CV + contact CTAs, identity card with photo and key/value rows, and a 3‑stat strip.
- **Marquee** — infinite tech strip (paused under `prefers-reduced-motion`).
- **About + Skills** — short bio and a 4‑group skill grid (React Native, Native Android, Web, Tools).
- **Experience** — three dated roles as bordered rows.
- **Projects** — numbered accordion rendered from `scripts/data/projects.js` (6 projects) with `aria-expanded`/`aria-controls`.
- **Contact** — headline, social links (from `links.js`) and the form.
- **Footer** — © line with a dynamically filled year.

### Projects Accordion & Galleries

- Each project row toggles open/closed in place (only one open at a time), so focus and scroll position survive.
- Screenshots render inside CSS **device frames** (`loading="lazy"`, translated `alt`); projects without screenshots simply show no gallery.
- **Lightbox:** click a screenshot to zoom — `Esc` to close, ◀/▶ to navigate (arrow meaning flips in RTL), focus trapped inside the dialog, focus restored to the trigger on close, background scroll locked.
- Projects marked `blur: true` (TAMS) show softened screenshots plus a "pending client approval" note.
- Store/website buttons render **only** when the project has that link.

### Contact Form (no backend)

- Fields: Name, Email, Subject, Message + hidden honeypot.
- Client‑side validation with messages in the active language (`aria-invalid` + per‑field error text).
- Sends through **EmailJS** or **Web3Forms** (switchable in `scripts/data/config.js`).
- Loading state (spinner + disabled button), success/error status (`role="status"`), and a **30‑second anti‑duplicate cooldown**.
- If the provider is unconfigured or a send fails, a **"Send via email app"** button appears and composes a `mailto:` with everything the visitor typed.

### Accessibility

- Skip link, semantic landmarks, visible focus rings, labelled controls, `aria-expanded` accordion, dialog semantics for the lightbox, keyboard operation everywhere.
- Lighthouse: **Accessibility 100 · Best Practices 100 · SEO 100**.

### SEO

- Title, meta description, canonical, Open Graph and Twitter cards (updated per language), JSON‑LD `Person`, `robots.txt`, `sitemap.xml`.

## Project Structure

```
myPortfolio/
├── index.html                 # single page: markup, pre-paint script, SEO tags
├── readme.md
├── robots.txt
├── sitemap.xml
├── .gitignore
├── assets/
│   ├── cv/                    # Mostafa_Soliman_ReactNative_CV.pdf
│   ├── logo/                  # favicon.svg (original sources gitignored)
│   ├── profile/               # photo.webp / photo.png (originals gitignored)
│   ├── projects/              # published WebP screenshots (20 files)
│   └── projects-original/     # full-res JPGs — NOT committed, not published
├── scripts/
│   ├── main.js                # entry point: wires every module's init()
│   ├── data/
│   │   ├── config.js          # contact provider + keys + feature flags
│   │   ├── links.js           # GitHub / LinkedIn / WhatsApp / email / CV …
│   │   └── projects.js        # the 8-project catalogue
│   ├── i18n/
│   │   ├── en.js              # every English string
│   │   └── ar.js              # every Arabic string
│   └── modules/
│       ├── i18n.js            # language detect/persist + text binding
│       ├── theme.js           # dark / light
│       ├── nav.js             # scroll-spy + smooth scroll + CV link
│       ├── projects.js        # accordion render/toggle
│       ├── gallery.js         # device frames + lightbox
│       └── contact.js         # validation, EmailJS/Web3Forms, cooldown, mailto
├── style/
│   ├── base.css               # reset, fonts, tokens, typography, a11y helpers
│   ├── themes.css             # dark + light colour tokens
│   ├── layout.css             # page scaffolding, header, section grids, footer
│   ├── components.css         # buttons, cards, projects, gallery, form, nav
│   └── responsive.css         # 400 / 640 / 820 / 1023 / 1600 breakpoints
├── tools/
│   ├── convert-images.py      # JPG → WebP converter
│   ├── check-contrast.py      # WCAG AA audit of the colour tokens
│   └── responsive-test.html   # iframe harness for 360/820/1024/1920
└── webfonts/                  # Fraunces, DM Sans, Cairo (woff2, variable)
```

## Setup

### 1. Run locally

Any static server works (ES Modules need `http://`, not `file://`):

```bash
# VS Code: Live Server (right-click index.html → Open with Live Server)

# or Python
python -m http.server 8099

# or Node
npx serve .
```

Open `http://127.0.0.1:8099/index.html`.

### 2. Setting up the contact form (EmailJS, step by step)

The form works without any setup (it falls back to the visitor's mail app), but to receive messages directly in your inbox:

1. **Create an account** — go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up (free tier: 200 emails/month).
2. **Add an email service** — in *Email Services*, click **Add New Service**, choose **Gmail**, connect the Google account that should receive the messages (`m.fadaly52@gmail.com`), and allow access. Copy the **Service ID** (e.g. `service_abc123`).
3. **Create a template** — in *Email Templates*, **Add New Template**. Set:
   - **Subject:** `{{subject}}`
   - **Content** (example):

     ```
     Name: {{from_name}}
     Email: {{from_email}}
     Reply-To: {{reply_to}}

     {{message}}
     ```
   - Save and copy the **Template ID** (e.g. `template_xyz789`).
4. **Get your public key** — in *Account → General*, copy the **Public Key**.
5. **Fill in `scripts/data/config.js`**:

   ```js
   provider: "emailjs",
   serviceId: "service_abc123",
   templateId: "template_xyz789",
   publicKey: "your_public_key",
   ```

6. **Restrict the key** — in *Account → Security*, add your domains (`mostafafadali.me`, `localhost`, `*.vercel.app`, `*.github.io`) so nobody else can use your key.
7. **Test** — deploy (or run locally with `localhost` added to the allowed domains), fill the form and press *Send message*. You should see "Message sent. Thank you!" and receive the email within a minute.

**Web3Forms alternative:** set `provider: "web3forms"` and put your access key from [https://web3forms.com](https://web3forms.com) into `web3formsKey`.

### 3. Converting the screenshots

Published images are WebP (max width 800px, quality 80). Sources stay in `assets/projects-original/` which is **gitignored**:

```bash
pip install Pillow
python tools/convert-images.py
```

The script converts every `assets/projects-original/*.jpg|jpeg|png` → `assets/projects/<name>.webp` and rebuilds `assets/profile/photo.webp` + `photo.png` from `photo-original.png`.

Equivalent one-off command (what the script does per file):

```bash
# resize to max 800px wide, save as WebP q80
python -c "from PIL import Image; im=Image.open('assets/projects-original/flod-1.jpg'); im=im.resize((800, round(im.height*800/im.width))) if im.width>800 else im; im.save('assets/projects/flod-1.webp','WEBP',quality=80,method=6)"
```

### 4. Checking colour contrast

After touching any value in `style/themes.css`:

```bash
python tools/check-contrast.py
# → All 18 pairs pass WCAG AA (>= 4.5:1).
```

### 5. Responsive check

Open `tools/responsive-test.html` — it loads the site in 360 / 820 / 1024 / 1920px iframes side by side.

## Adding a New Project

1. Drop the screenshots into `assets/projects-original/` (e.g. `myapp-1.jpg`, `myapp-2.jpg`).
2. Run `python tools/convert-images.py` → they appear as `assets/projects/myapp-1.webp`, …
3. Add an entry to `scripts/data/projects.js`:

   ```js
   {
     id: "myapp",
     title: "My App",
     role: "React Native Developer",        // "" to hide
     description: { en: "…", ar: "…" },
     tech: ["React Native", "Expo"],
     period: "Jan 2026 — Present",          // "" to hide
     status: "live",                        // "live" | "dev" | "web" | ""
     images: ["assets/projects/myapp-1.webp", "assets/projects/myapp-2.webp"],
     links: { appStore: "", playStore: "", site: "", repo: "" }, // empty = hidden
     blur: false,                           // true until the client approves
   },
   ```

4. Done — the accordion row, gallery, lightbox, badges and buttons are generated automatically. Translated labels (`live`, `store`, `shotAlt`, …) already exist in both dictionaries.

**Removing/hiding a link:** set its value to `""` — the button disappears, nothing else changes.

## Deployment

### GitHub Pages

```bash
git add .
git commit -m "feat: rebuild portfolio"
git push origin main
```

Then: **Repository → Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.**
The site will be live at `https://<user>.github.io/myPortfolio/`.

> If the site loads without styling, the repo is served from a sub‑path — that is fine here because every asset URL is **relative** (`style/…`, `scripts/…`, `assets/…`). Update `canonical`, Open Graph URLs and `sitemap.xml` to the final domain.

### Vercel

```bash
npm i -g vercel
vercel        # framework: Other, output dir: . , no build command
vercel --prod
```

Or connect the GitHub repo in [vercel.com/new](https://vercel.com/new) with **Framework Preset: Other** and no build step. Add your custom domain under **Settings → Domains** and point DNS accordingly.

## Author

Implemented by **Mostafa Soliman Fadali** — React Native & Android Developer, Cairo, Egypt.

- GitHub: [github.com/mostafa-soliman](https://github.com/mostafa-soliman)
- LinkedIn: [linkedin.com/in/mostafa-soliman-fadali](https://www.linkedin.com/in/mostafa-soliman-fadali)
- Email: `m.fadaly52@gmail.com`
