# jagetic.com — Personal Portfolio

Personal portfolio site for Marko Jagetić, Senior Full-Stack Engineer. Built with React, TypeScript, and Vite. No UI library — all styling is hand-written with CSS Modules.

Live at **[jagetic.com](https://jagetic.com)**

## Sections

| Section | Description |
|---|---|
| Hero | Animated intro with name, title, and CTA links |
| About | Bio, core values, and photo with availability status |
| Experience | Tab-based work history (True North, Valere Margins, AsyncLabs) |
| Skills | Categorised tech stack grid |
| Contact | Email and social links |

## Features

- **Interactive CLI** — `/cli` route renders a fully functional terminal with commands: `whoami`, `cat about/resume/contact`, `ls skills`, `history`, tab-completion, arrow-key history navigation, and keyboard shortcuts (`Ctrl+C`, `Ctrl+L`)
- **Recruiter / Engineer mode toggle** — switches between a simplified and a technical view of the content
- **Command palette** — keyboard-driven navigation (`Cmd+K`)
- **Particle background** — Three.js canvas rendered behind the hero
- **Scroll-reveal animations** — elements animate in as they enter the viewport
- **Custom cursor** — replaces the default OS cursor
- **Easter egg** — hidden interaction somewhere on the page

## Tech stack

- **React 19** + **TypeScript 6**
- **Vite 8** (build + dev server)
- **CSS Modules** (no Tailwind, no UI library)
- **react-router-dom 7** with hash-based routing
- **Three.js** for the particle background
- **gh-pages** for deployment

## Architecture

Follows **Feature-Sliced Design (FSD)**:

```
src/
  app/        # Providers, global styles, router
  pages/      # Route-level components (Home, CLI)
  widgets/    # Composed sections (Hero, About, Experience, …)
  features/   # Isolated behaviours (command palette, easter egg)
  shared/     # Reusable UI primitives, hooks, utilities
```

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run deploy    # build + push to gh-pages
```
