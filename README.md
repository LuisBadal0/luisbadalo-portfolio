# Luís Badalo — Personal Portfolio

Static personal site for [Luís Badalo](https://luisbadal0.github.io/luisbadalo-portfolio/) — Middleware Consultant & MuleSoft Developer.

## Features

- Single-page, hand-built HTML/CSS/vanilla JS — no framework, no build step
- Dark / light theme with system preference detection
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Sticky nav with active-section highlighting and mobile menu
- "whoami" terminal easter egg — type `whoami` anywhere on the page or hit Send in the contact console
- Embedded schema.org `Person` structured data
- Open Graph + Twitter card metadata
- Custom 404 page, `robots.txt`, `sitemap.xml`
- Optional zero-dependency Node server (`server.js`) with gzip, ETags, security headers and graceful shutdown

## Local development

```sh
npm run dev      # starts server with auto-restart (node --watch)
npm start        # plain start
npm run check    # syntax-check server.js and script.js
```

Then open http://localhost:3000

No build step — it is served as-is.

## Hosting

Deploys automatically to **GitHub Pages** on every push to `main` (source: `main` branch, root directory, legacy build type).

Live URL: https://luisbadal0.github.io/luisbadalo-portfolio/

## Project structure

```
index.html          — single page markup
assets/css/styles.css
assets/js/script.js
assets/img/         — images, favicon, og-card
cv/                 — downloadable résumé PDF
404.html
robots.txt
sitemap.xml
server.js           — optional static server
Dockerfile
```

## License

All content and code © 2026 Luís Badalo. All rights reserved.