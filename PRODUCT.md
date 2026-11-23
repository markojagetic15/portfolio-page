# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who look Marko up after meeting him, seeing his name on a project, or getting his link: engineering peers, hiring managers, recruiters and founders. They arrive from a link (LinkedIn, GitHub, an email signature), spend a minute or two, and want to know who he is, what he has built, and how to reach him.

## Product Purpose

jagetic.com is Marko Jagetić's personal site: a professional calling card for a full-stack engineer in Zagreb. He is employed (Software Engineer at Njuškalo since Mar 2026) and **not actively looking** — the site makes no availability or "hire me" claims. Success: a visitor leaves knowing what he builds, has seen real shipped work, and can reach him in one click.

## Positioning

He builds and runs his own products end to end, not only employer work: proarda (real-time collaborative workspace, Yjs) and Udomi me (pet adoption platform) are live, self-hosted, and his. Alongside that, five years of production work on large systems (Croatia's largest classifieds marketplace, a government tax-fraud platform).

## Capabilities and Constraints

- Static Vite + React 19 + TypeScript build, CSS Modules, hash routing; served by a `caddy file-server` container. No backend.
- Contact is email (`marko.jagetic3@gmail.com`) and LinkedIn. The contact form opens the visitor's mail client (mailto) — it does not send on its own.
- Features the owner wants kept: Cmd+K command palette, the easter egg, the mailto contact form, the skill level bars.
- Projects: curated to 4–5 featured; the rest listed compactly.

## Brand Commitments

- Name as written: Marko Jagetić (with the ć). Title: Full-Stack Engineer, Zagreb, Croatia.
- No availability or hiring claims (owner decision 2026-11-23).

## Evidence on Hand

- Experience: Njuškalo (2026–), True North (2024–2026), Valere Margins (2023–2024), AsyncLabs (2022–2023) with concrete highlights — `src/entities/experience/data/index.ts`.
- Projects with real screenshots in `public/`: proarda, Udomi me, Njuškalo, Dwell Optimal, Guardian (private), AMS (private), Omni Academy, HOPS, K-Drive — `src/entities/project/data/index.ts`.
- Portrait: `public/photo.jpeg`.
- Absent, never fabricate: testimonials, client logos, user counts, metrics beyond those already in the experience highlights.

## Product Principles

1. Show shipped work before talking about it.
2. Plain, specific language; numbers only where they are real.
3. One click to email.
4. Fast and light — an engineer's site is judged on how it loads.
