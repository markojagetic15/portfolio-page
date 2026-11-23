# jagetic.com — Personal Portfolio

Personal site of Marko Jagetić, full-stack engineer in Zagreb. React 19 + TypeScript + Vite, hand-written CSS Modules, no UI library.

Live at **[jagetic.com](https://jagetic.com)**.

## Design

The page is laid out as a **brick build-instruction booklet**. Each project is a numbered build step, the stack is the box of parts, and each step shows which parts it used: new parts are bright, parts from earlier steps are greyed out. The ground is sky blue with a faint stud grid, under white keylined pages and primary-colour bricks. Every brick and button sits raised on an ink drop and clicks down flush when pressed. The type is **Bricolage Grotesque**, self-hosted in `public/fonts/`.

- Product facts: `PRODUCT.md`. Visual system: `DESIGN.md`. Page strategy: `.impeccable/surfaces/`.
- Content lives in `src/entities/*/data` (projects, experience, skills). The step order and the "new vs already used" parts logic are in `src/shared/lib/build.ts`. Part colours and the skill-to-part mapping are in `src/shared/lib/tech.ts`.
- Project screenshots are `public/work/*.webp` (1600 px wide).

## Sections

| Section | What it shows |
|---|---|
| Hero | Name, sub-line, Email Marko + LinkedIn, the box of parts, and proarda as step 1 |
| Build steps | Njuškalo, Guardian and Udomi me as steps 2–4, then a flippable strip of alternate builds |
| Build history | Experience as a staircase of bricks, 2022 to now |
| Parts list | Self-rated skill levels as bricks; choosing one shows where it was used and lights the matching steps |
| Contact | Email (with a copy button), LinkedIn, portrait, and a mailto form |

## Features

- **Command menu**: `Cmd/Ctrl + K`, or the Index button in the nav.
- **Parts list**: choose a part and the steps and alternate builds that use it light up; Clear resets.
- **Easter egg**: type `hireme` anywhere outside a form field.
- Reduced-motion users get the page at rest.

## Architecture

Feature-Sliced Design:

```
src/
  app/        # global styles (tokens, font, the brick primitive), App
  pages/      # HomePage composition
  widgets/    # nav, hero, steps, history, parts, contact, footer
  features/   # command palette, easter egg
  entities/   # project / experience / skill data + types
  shared/     # config, parts/steps logic (lib/tech, lib/build), part selection context
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
