# Archbold — static site

Production-ready static site for GitHub Pages. Pure HTML5 with one custom stylesheet
(the MIR-style asymmetric grid, the hero desaturation filter, the lightbox),
and two small vanilla JS modules. No build step, no dependencies to install.

## Structure

```
archbold/
├── index.html            EN home
├── works.html            EN — full gallery
├── services.html         EN — services list
├── pricing.html          EN — pricing tiers
├── contact.html          EN — form, socials, WhatsApp
├── de/
│   ├── index.html        DE home
│   ├── works.html        DE — full gallery
│   ├── services.html     DE — services list
│   ├── pricing.html      DE — pricing tiers
│   └── contact.html      DE — form, socials, WhatsApp
├── sk/
│   ├── index.html        SK home
│   ├── works.html        SK — full gallery
│   ├── services.html     SK — services list
│   ├── pricing.html      SK — pricing tiers
│   └── contact.html      SK — form, socials, WhatsApp
└── assets/
    ├── css/style.css     tokens, header, hero, MIR grid, lightbox, footer
    ├── js/nav.js         scroll state, mobile menu, language dropdown
    ├── js/lightbox.js    gallery lightbox (vanilla, no dependencies)
    └── img/              put hero-reel.mp4 / hero-poster.jpg here
```

All three languages are fully built out — every page in `de/` and `sk/`
links to its sibling pages and to the matching page in the other two
languages via the language dropdown, so switching language mid-browse
(e.g. from the English Pricing page to German) lands on the translated
Pricing page, not the homepage.

## Before deploying

1. **Hero video** — drop a real, ideally desaturated-friendly, `.mp4` at
   `assets/img/hero-reel.mp4` plus a `hero-poster.jpg` first-frame fallback.
   The CSS filter (`grayscale(0.45) brightness(0.62) contrast(1.06) saturate(0.85)`)
   is applied live, so a normally-graded source works fine.
2. **Gallery images** — every `<img>` and `data-lightbox` currently points at
   `picsum.photos` placeholders (seeded, so they're stable across reloads).
   Swap the `src`/`data-lightbox` pair on each `.g-item` for your own render,
   at roughly 800–900px wide for the grid thumbnail and 1600–2400px wide for
   the lightbox's `data-lightbox` value.
3. **Contact form** — `contact.html`'s `<form action="https://formspree.io/f/your-form-id">`
   needs your real Formspree endpoint (or another static form handler).
4. **Phone / WhatsApp / email / socials** — placeholder values throughout
   (`+421 900 000 000`, `studio@archbold.eu`, `instagram.com`, `facebook.com`)
   — replace with the real ones.
5. **Domain** — `<link rel="canonical">` and `hreflang` tags assume
   `https://archbold.eu/`. Update if the final domain differs, and add a
   `CNAME` file at the repo root if using a custom domain with GitHub Pages.

## Deploying to GitHub Pages

Push this folder's contents to the repo root (or `/docs`), then in
**Settings → Pages** set the source to that branch/folder. No build step —
GitHub Pages serves the HTML directly.
