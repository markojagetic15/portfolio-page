---
name: jagetic.com
description: Marko Jagetić's site as a brick build-instructions booklet. Sky-blue pages with a stud grid, white keylined panels, primary-colour bricks that click down flush, black ink.
colors:
  sky: "#58b3ea"
  sky-light: "#9dd3f3"
  sky-deep: "#3d9ad6"
  page: "#ffffff"
  ink: "#0d1014"
  ink-2: "#2f3a45"
  ink-3: "#4c5a68"
  brick-red: "#e2231a"
  brick-yellow: "#ffcd00"
  ghost: "#dde6ee"
  ghost-ink: "#4f5d6b"
  error: "#b3150e"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(56px, 8.2vw, 116px)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  numeral:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(96px, 10vw, 150px)"
    fontWeight: 800
    lineHeight: 0.8
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(44px, 6.4vw, 88px)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  title-step:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(34px, 3.6vw, 48px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(24px, 2.4vw, 32px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 500
    lineHeight: 1.45
  body:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tnum"
  label:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 800
    lineHeight: 1.5
  brick-label:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.5
rounded:
  key-mark: "2px"
  kbd: "4px"
  brick: "6px"
  input: "8px"
  panel: "10px"
spacing:
  keyline: "3px"
  drop: "5px"
  drop-page: "8px"
  stud: "28px"
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(72px, 9vw, 128px)"
  nav-height: "68px"
  wrap: "1240px"
components:
  brick-yellow:
    backgroundColor: "{colors.brick-yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.brick-label}"
    rounded: "{rounded.brick}"
    padding: "6px 12px"
    height: "36px"
  brick-red:
    backgroundColor: "{colors.brick-red}"
    textColor: "{colors.page}"
    typography: "{typography.brick-label}"
    rounded: "{rounded.brick}"
    padding: "6px 12px"
    height: "36px"
  brick-blue:
    backgroundColor: "{colors.sky-light}"
    textColor: "{colors.ink}"
    typography: "{typography.brick-label}"
    rounded: "{rounded.brick}"
    padding: "6px 12px"
    height: "36px"
  brick-white:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.brick-label}"
    rounded: "{rounded.brick}"
    padding: "6px 12px"
    height: "36px"
  brick-ghost:
    backgroundColor: "{colors.ghost}"
    textColor: "{colors.ghost-ink}"
    typography: "{typography.brick-label}"
    rounded: "{rounded.brick}"
    padding: "6px 12px"
    height: "36px"
  button-primary:
    backgroundColor: "{colors.brick-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.brick}"
    padding: "0 24px"
    height: "52px"
  button-secondary:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.brick}"
    padding: "0 24px"
    height: "52px"
  panel:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "22px"
  input:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.input}"
    padding: "12px 14px"
    height: "52px"
  nav:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    height: "{spacing.nav-height}"
  skill-flat:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.brick}"
    padding: "0 12px"
    height: "40px"
---

# Design System: jagetic.com

## Overview

**Creative North Star: "The Build Booklet"**

The site is a brick set's assembly booklet. Each project is a numbered build step, the stack is the box of parts, and every step shows which parts it used. The page ground is instruction-page sky blue with a faint grid of white studs; content sits on white pages and call-out boxes drawn with thick black keylines and small radii. The parts are bricks in four colours (red, yellow, light blue, white), and the only depth in the world is a brick's: a solid ink drop straight down under raised pieces, which disappears when a piece is pressed flush.

Colour and play carry the personality; plain words carry the facts. Type is one family, Bricolage Grotesque, used very heavy (800) for the name, section heads and step numerals and regular-to-medium for reading text. Density is generous: one idea per booklet page, big numerals, large tap targets. The system refuses both the dark developer portfolio and the plain document page.

Motion is assembly, not decoration: on load the name rises, step 1 drops in along its dashed arrow, the inventory bricks settle on a short non-uniform stagger, all once and ease-out. Nothing reveals on scroll. Reduced motion shows everything at rest.

**Key Characteristics:**
- Sky ground with a 28px white stud grid; white keylined pages on top.
- 3px black keylines on every page, brick, input and frame.
- Solid straight-down ink drops; no blur, no diagonal offset, no gradients.
- One brick colour per stack part, the same everywhere it appears.
- New parts bright, parts already used ghosted; choosing a part lights the steps that use it and ghosts the rest.
- Outlined white step numerals, very heavy.

## Colors

A toy-box primary palette on a sky ground, held together by one black ink.

### Primary
- **Instruction Sky** (sky): the page ground under everything, behind the stud grid; also the mobile menu sheet and the easter-egg wash (at 85%).
- **Brick Yellow** (brick-yellow): the primary action brick (Email Marko, Send email), the link hover fill, the input focus halo, the "lit" outline around chosen steps, the active command-palette row, text selection, history bullets.

### Secondary
- **Brick Red** (brick-red): a part colour (TypeScript, NestJS, Redis), the MJ mark chip, the newest history block. White text on it only (4.68:1).
- **Light Blue Brick** (sky-light): a part colour (React, Yjs and WebSockets, PostgreSQL), keyboard-hint caps, scrollbar track.

### Neutral
- **Page White** (page): pages, panels, call-outs, nav, footer, white part bricks and secondary buttons; the fill of step numerals.
- **Ink** (ink): all text, every keyline and every drop shadow. 8.22:1 on sky.
- **Ink 2** (ink-2): text of the flat, untracked skill bars only.
- **Ink 3** (ink-3): secondary text on white (roles, stack lines, hints, notes; 7.07:1). On sky it is 3.05:1, so it is only for large heavy text there (the step-title separator).
- **Ghost** (ghost): ghosted brick fill, row dividers, the parts-list ruler marks, empty image frames.
- **Ghost Ink** (ghost-ink): text and keyline of ghosted bricks and of dimmed pages, and the dashed edge of flat skills (5.35:1 on ghost).
- **Error Red** (error): invalid input border and error text (6.93:1 on white).
- **Sky Deep** (sky-deep): defined on `:root`, currently unused.

### Named Rules
**The One Ink Rule.** Text, keylines and drops are all the same ink. A second dark is never introduced for borders or shadows; ghosting swaps ink for ghost-ink as a whole.

**The One Colour Per Part Rule.** Each tracked part has exactly one brick colour (`PARTS` in `src/shared/lib/tech.ts`) and keeps it in the hero inventory, every step, the alternate builds and the parts list. Untracked parts are white.

**The Ghosted Part Rule.** In a build step, a part no earlier step used is shown in its colour; a part already in the box is shown as a ghost brick. Step order is proarda, Njuškalo, Guardian, Udomi me.

## Typography

**Display Font:** Bricolage Grotesque, variable (wght 200–800, wdth 75–100), self-hosted as latin and latin-ext woff2, with ui-sans-serif / system-ui fallback.

**Character:** A chunky, slightly quirky grotesque that reads like printed instruction-booklet lettering at 800 and stays plain and friendly at 400–500 for text. Numbers are tabular everywhere.

### Hierarchy
- **Display** (800, clamp(56px, 8.2vw, 116px), 0.86): the name in the hero, on two lines.
- **Numeral** (800, clamp(96px, 10vw, 150px) in steps, up to 190px in the hero, 0.8): step numbers, white fill with a 3px ink stroke painted under the fill. Also the 88px count in the parts readout.
- **Headline** (800, clamp(44px, 6.4vw, 88px), 0.92): section heads (Build history, Parts list), paired with a 19px/500 intro paragraph capped at 44ch.
- **Title Step** (800, clamp(34px, 3.6vw, 48px)): build-step project names and the alternate-builds heading.
- **Title** (800, clamp(24px, 2.4vw, 32px)): hero step caption, alternate-build names, the sent-form heading, history company names (clamp(24px, 2.3vw, 32px)).
- **Lede** (500, 19px, 1.45, max 40–44ch): the hero sub-line and section intros. Step summaries are 18px/500, max 44–52ch.
- **Body** (400, 17px, 1.5): base text and inputs.
- **Label** (800, 15–16px): form labels, contact row terms, list headings such as "Parts used" and "Parts for this step", in sentence case.
- **Brick label** (700, 15px): text on part bricks; buttons are 700 at 17px.

### Named Rules
**The Heavy Or Plain Rule.** Weight jumps straight from 800 (names, heads, numerals, labels) to 400–600 (reading text). Nothing in between carries hierarchy.

**The Sentence Case Rule.** No uppercase, no letterspaced small caps. Labels are heavy sentence case.

## Layout

A centred wrap of 1240px with a fluid gutter (clamp(16px, 4vw, 48px)); sections pad clamp(72px, 9vw, 128px) top and bottom. The fixed white nav is 68px tall, and anchors scroll to 16px below it.

Section heads are a 6fr / 5fr grid: heavy head left, intro paragraph right, bottom-aligned; one column under 820px. The hero is 5fr / 7fr (name, sub-line, actions and the "Parts used" inventory left; the outlined numeral 1, the framed proarda screenshot and its 1x call-out right), with a dashed assembly arrow from inventory to step that hides under 1100px. Under 960px the hero reorders to name, step 1, sub-line, actions, inventory.

Build steps are white pages in a 5fr / 7fr grid that alternate sides (7fr / 5fr when flipped) and stack under 900px. Alternate builds are a horizontally scrolling, snap-aligned strip of pages (min(820px, 88%) wide, 86% under 640px) with previous/next bricks and a page counter. The build history is a four-column staircase in which each company sits 56px higher than the one before; two columns under 1000px, and a single column with the newest on top under 620px. The parts list is 7fr / 4fr: the rated skill bars left and a sticky readout right (static under 900px).

Bricks in a wrapping row use a 20px row gap so studs never touch the brick above.

## Elevation & Depth

Depth is the depth of a brick: a solid, unblurred ink shadow offset straight down. Raised pieces sit on it; pressing removes it as the piece moves down by the same distance. Pages carry a deeper drop than bricks. There is no blur shadow, no diagonal offset and no tonal elevation anywhere.

### Shadow Vocabulary
- **Brick drop** (`box-shadow: 0 5px 0 var(--ink)`, local `--drop` 3–6px): every brick; small bricks use 3–4px, history blocks 6px.
- **Brick hover** (`box-shadow: 0 7px 0 var(--ink)` with `translateY(-2px)`): interactive bricks on fine pointers.
- **Brick pressed** (`box-shadow: 0 0 0 var(--ink)` with `translateY(var(--drop))`): `:active` and `aria-pressed="true"`.
- **Page drop** (`box-shadow: 0 8px 0 var(--ink)`): build-step pages, alternate builds, hero screenshot frame, parts list, readout and contact panels.
- **Card drop** (`box-shadow: 0 6px 0 var(--ink)`): history cards. **Call-out drop** (`0 5px 0`): the hero call-out and the toast.
- **Overlay drop** (`box-shadow: 0 10px 0 var(--ink)`): command palette and easter-egg message.

### Named Rules
**The Click-Down Rule.** Anything raised on a drop is pressable or is a part; pressing moves it down by exactly its drop and removes the drop. A pressed state never adds a shadow.

**The Lie-Flat Rule.** Studs belong only to bricks. A skill with nothing to press is not a brick: untracked skills lie flat with no studs, no drop and a 2px dashed ghost-ink edge. Pages keep their deeper page drop, and lose it only when dimmed.

## Shapes

Small radii and thick strokes: bricks 6px, inputs and toast 8px, pages and panels 10px, keyboard caps 4px, history bullets 2px. Every container and control has a 3px ink keyline; dividers inside panels are 2px ghost rules. Bricks carry studs on top: a row of 16px outlined bumps (7px tall, 3px stroke), inset 9px from each end and spaced so only whole studs show. Image frames clip their screenshot inside the keyline.

## Components

### Bricks (signature)
The one raised component and the system's unit of play.
- **Shape:** 6px radius, 3px keyline, studs on top, solid ink drop.
- **Colours:** yellow (default), red with white text, light blue, white, ghost (ghost fill, ghost-ink text and keyline).
- **Sizes:** part 36px (6px 12px, 15px/700), step part 34px, call-out piece 3px drop, nav chip 30px, button 52px.
- **Hover / press:** lifts 2px on fine-pointer hover; clicks down flush on press (120ms ease-out).
- **Disabled:** 40% opacity, no movement (the alternate-builds flip bricks).

### Buttons
- **Primary:** yellow brick, 52px tall, 0 24px, 17px/700 (Email Marko, Send email).
- **Secondary:** white brick, same size (LinkedIn, Write another).
- **Small:** white bricks at 40–44px for search, menu, copy and the nav Email Marko CTA (yellow, 44px).

### Cards / Containers (panels)
- **Corner Style:** 10px. **Background:** page white. **Border:** 3px ink.
- **Shadow Strategy:** page drop (8px) for content pages, 6px for history cards, 5px for call-outs.
- **Internal Padding:** 16–22px on cards, clamp(24px, 3.4vw, 44px) on build-step pages.

### Inputs / Fields
- **Style:** white, 3px ink keyline, 8px radius, 52px tall (textarea 150px), 17px text, red caret.
- **Focus:** no outline; a 4px yellow halo ring (140ms).
- **Error:** border turns error red, 15px/700 error text below.

### Navigation
Fixed white bar, 68px, 3px ink rule beneath. Red MJ brick chip plus name on the left; text links (17px/600, 44px targets) fill yellow on hover; white search brick with a light-blue kbd cap; yellow Email Marko brick. Under 860px links and search collapse into a Menu brick that opens a full sky sheet of white 72px page-rows with outlined numerals.

### Links
Inline links are 700 with a 2px underline at 4px offset; hover and focus fill the background yellow.

### Build step
A white page: outlined numeral, project title, role in ink-3, summary, "Parts for this step" with bright new parts and ghosted used parts, then the live link or a "private" note; the framed screenshot sits on the other side and zooms 1.025 on hover. **Lit** (its stack has the chosen part): 5px yellow outline at 5px offset, lifted 4px. **Dim:** loses its drop, keyline turns ghost-ink, picture goes grayscale at 50%, bricks ghost; text stays full ink.

### Parts list
Each rated skill is a brick whose width is its level (min 200px) over a faint ruler of 10% stud marks. Tracked skills are pressable bricks in their part colour; pressed shows a 3px ink outline at 4px offset and lights the matching steps across the page. The sticky readout counts uses with a large numeral and lists them on 2px ghost rules.

### Build history
A staircase of large bricks (blue, white, yellow, red, oldest to newest), 120px tall with dates and company name, each over a white card of highlights with yellow square bullets.

### Command palette and easter egg
Palette: white panel, 3px keyline, 10px drop, over a 35% ink scrim; the active row is yellow with a 2px ink border; a yellow toast on a 5px drop confirms actions. Easter egg: a sky wash, small brick particles bursting outward (1.2s), and a white message panel that pops in (280ms) with a yellow email brick.

## Do's and Don'ts

### Do:
- **Do** draw every container and control with the 3px ink keyline and a small radius (6px bricks, 8px inputs, 10px pages).
- **Do** raise pressable things on a solid straight-down ink drop and click them down flush by the same distance when pressed.
- **Do** give each stack part its one colour from `PARTS` and use it everywhere that part appears.
- **Do** show parts new to a step bright and parts already used as ghost bricks.
- **Do** keep entrances to one-time, ease-out (cubic-bezier(0.23, 1, 0.32, 1)) assembly moves on load, with content visible throughout.
- **Do** keep step numerals white-filled with a 3px ink stroke at weight 800.
- **Do** keep a 20px row gap between wrapping rows of bricks so studs clear the brick above.

### Don't:
- **Don't** blur a shadow, offset one diagonally, or add gradients to bricks or pages; depth is only the solid drop.
- **Don't** draw an untracked skill as a brick; it lies flat with no studs and no drop.
- **Don't** add scroll-triggered reveals.
- **Don't** colour a part differently in two places.
- **Don't** set reading text in ink-3 on the sky ground (3.05:1); on sky, text is ink.
- **Don't** introduce a second typeface or uppercase labels.
