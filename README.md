# jagetic.com — Personal Portfolio

Personal site of Marko Jagetić, full-stack engineer in Zagreb. React 19 + TypeScript + Vite, hand-written CSS Modules, no UI library.

Live at **[jagetic.com](https://jagetic.com)**.

## Design

The page is laid out as a **component datasheet**: a green title block, features, a typical application, revision history, characteristics and contact. Paper, carbon ink and hairline rules, with one solder-mask green that marks the title block and every active state. The type is **Archivo**, self-hosted in `public/fonts/` and used across its width axis.

- Product facts: `PRODUCT.md`. Visual system: `DESIGN.md`. Page strategy: `.impeccable/surfaces/`.
- Content lives in `src/entities/*/data` (projects, experience, skills). Edit those to change the page.
- Project screenshots are `public/work/*.webp` (1600 px wide). The original PNGs are in git history (removed 2026-11-23).

## Sections

| Section | What it shows |
|---|---|
| Title block (hero) | Name, role, datasheet meta, four features, proarda as the typical application |
| Applications | Udomi me, Njuškalo and Guardian as full plates; the rest of the projects in a table |
| Revision history | Experience as a revision table, newest first |
| Characteristics | Stack pinout (pick a pin to see where each technology was used) and the self-rated skill levels |
| Contact | Email (with a copy button), LinkedIn, portrait, and a mailto form |

## Features

- **Command menu**: `Cmd/Ctrl + K`, or the Index button in the nav.
- **Stack pinout**: works with pointer or arrow keys.
- **Easter egg**: type `hireme` anywhere outside a form field.
- Reduced-motion users get the page at rest.

## Architecture

Feature-Sliced Design:

```
src/
  app/        # global styles (tokens, font, buttons, split grid), App
  pages/      # HomePage composition
  widgets/    # nav, hero, applications, history, characteristics, contact, footer
  features/   # command palette, easter egg
  entities/   # project / experience / skill data + types
  shared/     # config (email, links, sections), tech-name helpers, SpecTable
```

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
```

Production: `cd /var/www/portfolio-page && docker compose up -d --build` (static build served by Caddy, see `Dockerfile`).

## Design tooling (local, not committed)

The redesign used these agent skills. They are installed in this folder and ignored by git. To reinstall:

```bash
npx skills add Leonxlnx/taste-skill            # design-taste-frontend
npx skills add emilkowalski/skills             # animation / design-engineering skills
npx impeccable install --project --providers=claude --no-hooks
npm install -g @playwright/cli@latest && playwright-cli install --skills
```

Taste-skill scripts need Node 22+ (on the VPS: `/opt/node22/bin/node`). As root, point `CHROME_PATH` at a wrapper that adds `--no-sandbox`.
