# Luís Badalo — Personal Portfolio

Static personal site for Luís Badalo — Middleware Consultant & MuleSoft Developer.

Live: **https://luisbadal0.github.io/luisbadalo-portfolio/**

## Features

- Single-page, hand-built HTML/CSS/vanilla JS — no framework, no build step
- EN / PT-PT language toggle (client-side, persisted in `localStorage`, CV download follows language)
- Dark / light theme with system preference detection and manual toggle
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Sticky nav with active-section highlighting and accessible mobile menu
- "whoami" terminal easter egg — type `whoami` anywhere or hit Send in the contact console
- Embedded schema.org `Person` structured data
- Open Graph + Twitter card metadata and `color-scheme` support
- Custom 404 page, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `humans.txt`, `security.txt`
- Preload for critical CSS and LCP image, `author` link
- Optional zero-dependency Node server (`server.js`) with gzip (LRU), ETags + `If-Modified-Since`, conditional caching, path-traversal hardening, and security headers (CSP with hash, HSTS in production, COOP/CORP, graceful shutdown)

## Local development

```sh
npm run dev      # starts server with auto-restart (node --watch)
npm start        # plain start
npm run check    # syntax-check server.js and client scripts
```

Then open http://localhost:3000

No build step — it is served as-is.

Environment variables for the server:

- `PORT` (default `3000`)
- `HOST` (default `0.0.0.0`)
- `NODE_ENV=production` enables `Strict-Transport-Security`

Health check: `GET /health` → `{"status":"ok"}` (`Cache-Control: no-store`)

## Hosting

Deploys automatically to **GitHub Pages** on every push to `main` (source: `main` branch, root directory, legacy build type).

The GitHub Pages project URL is https://luisbadal0.github.io/luisbadalo-portfolio/. The manifest and 404 page use the project path, and `.nojekyll` keeps the static files (including `.well-known/security.txt`) intact.

A project site cannot place files at the `github.io` host root. `robots.txt` and `.well-known/security.txt` are available under `/luisbadalo-portfolio/`, so host-root crawlers will not discover them automatically.

## Project structure

```
index.html                  — single page markup (inline theme/lang bootstrap)
assets/css/styles.css       — warm paper + ink theme, responsive, print styles
assets/js/script.js         — nav, scroll, reveal, theme, whoami console
assets/js/i18n.js           — EN/PT-PT strings, persistence, CV link switching
assets/img/                 — favicon, apple-touch-icon, og-card, portrait
cv/                         — downloadable résumé PDFs (EN + PT)
404.html                    — standalone 404 (no external deps)
robots.txt                  — project-path sitemap reference
sitemap.xml                 — single canonical URL
site.webmanifest            — PWA manifest
.nojekyll                   — publish static files without Jekyll processing
humans.txt                  — team & colophon
.well-known/security.txt    — security contact at the project path
server.js                   — optional static server (hardened)
Dockerfile                  — node:22-alpine, healthcheck on /health
.github/workflows/ci.yml    — syntax check on push/PR
```

## Security headers (server)

`Content-Security-Policy` (hash for inline bootstrap), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-site`, and `Strict-Transport-Security` in production.

GitHub Pages serves the static files without running `server.js`. The homepage therefore also includes a CSP `<meta>` tag for script and resource restrictions. Header-only protections such as `frame-ancestors`, `X-Frame-Options`, and COOP/CORP require hosting that can set response headers.

## License

All content and code © 2026 Luís Badalo. All rights reserved.
