---
name: jagetic.com
description: Marko Jagetić's site, laid out as a component datasheet. Paper, carbon ink, hairline rules and one solder-mask green.
colors:
  green: "#0e6b45"
  green-deep: "#0a5236"
  green-ink: "#eef6f1"
  green-ink-2: "#c9e4d5"
  green-tint: "#dcebe2"
  paper: "#f6f7f5"
  paper-2: "#eceeea"
  ink: "#121412"
  ink-2: "#444a45"
  ink-3: "#5f665f"
  rule: "rgba(18, 20, 18, 0.16)"
  rule-strong: "#121412"
  field: "#ffffff"
  error: "#a3261b"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(44px, 6.6vw, 88px)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(34px, 4.1vw, 56px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(22px, 2vw, 28px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 125"
  lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "'tnum' 1"
  table:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 78"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  wrap: "1240px"
  nav-h: "56px"
  column-gap: "24px"
  row-gap: "32px"
  section-y: "clamp(64px, 9vw, 120px)"
  cell-y: "12px"
  cell-x: "16px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.green}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  title-block:
    backgroundColor: "{colors.green}"
    textColor: "{colors.green-ink}"
    rounded: "{rounded.none}"
    padding: "clamp(22px, 2.6vw, 36px) clamp(20px, 3.4vw, 44px)"
  spec-table-row:
    textColor: "{colors.ink}"
    typography: "{typography.table}"
    padding: "10px 0"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "48px"
  nav-link:
    textColor: "{colors.ink-2}"
    padding: "0 12px"
    height: "44px"
  command-item-active:
    backgroundColor: "{colors.green}"
    textColor: "{colors.green-ink}"
    padding: "0 16px"
    height: "44px"
---

# Design System: jagetic.com

## Overview

**Creative North Star: "The Component Datasheet"**

The site reads like the datasheet for a part an engineer can spec in a minute. It has a title block, a feature list, typical applications, a revision history, electrical-style characteristics and ordering information. Everything sits on cool white paper in carbon ink and is organised by hairline rules. The ruled table is the core component: projects, career, skills and contact details are all rows with a condensed label and a value. Density is moderate. Each section fills a screen and opens on a full-width ink rule, and inside it the content is tight and tabular rather than spread over cards.

One solder-mask green does two jobs: it fills the title-block band, and it marks state (the selected pin, focus, the live link, the hovered primary button, the active command). It is never used for decoration. The page is flat, with no glow and no gradients, and corners are square throughout. Screenshots sit flat inside a 1px ink frame and zoom slightly inside it on hover; they never lift. This replaces the previous dark "dev portfolio" look. The rejected template is a dark ground, a centred name, typewriter roles, a stat strip and a grid of equal cards.

Typography is one family, Archivo, used across its width axis. The expanded width is for the name and headings, the condensed width for table heads, labels and metadata, and the normal width for reading. Wherever numbers appear they are tabular.

**Key Characteristics:**
- Paper ground, carbon ink, 1px rules at 16% ink; strong rules in full ink at section and table edges.
- One green, used only for the title block and for active states.
- Ruled tables and label/value rows rather than cards.
- Archivo variable: wide (125%) for display, narrow (78%) for labels, normal for body. Tabular numerals globally.
- Square corners everywhere; flat surfaces; image frames instead of shadows.
- Motion: one clip-path wipe of the title band, a short content stagger, a 1.02 zoom inside frames, and a 0.97 press on buttons.

## Colors

A near-monochrome paper-and-ink palette with one saturated green held back for the title block and state.

### Primary
- **Solder-Mask Green** (`green`): fills the title-block band, the active pin lead and lit rating bar, the current revision letter, the highlighted command-palette item, the primary button on hover, the focus outline, text selection and the input caret.
- **Deep Mask Green** (`green-deep`): a darker step defined for pressed or hover-on-green use; the current build does not rely on it.
- **Mask Ink** (`green-ink`): text on green: the name and description in the title block, and the text of the active command.
- **Mask Ink Dim** (`green-ink-2`): secondary text and hairlines on green: title-block meta labels and their rules, and hints on the active command.
- **Mask Tint** (`green-tint`): the pale wash behind a text link when it has keyboard focus.

### Neutral
- **Cool Paper** (`paper`): the page ground, the palette and dialogs, and text on ink.
- **Paper Shade** (`paper-2`): image-frame backfill, hovered table rows, keycaps, the rating track and the scrollbar track.
- **Carbon Ink** (`ink`): body text, primary button fill, the IC package body, bullets and rating fills. Also `rule-strong`, used at section tops, table head and foot rules and frame borders.
- **Graphite** (`ink-2`): secondary prose, section intros, stack columns, nav links.
- **Pencil** (`ink-3`): labels, pin numbers, private/inactive entries, placeholders.
- **Hairline** (`rule`): the 1px divider between rows, the input side borders and quiet button outlines.
- **Field White** (`field`): the fill of form inputs only, so fields stand off the paper.
- **Fault Red** (`error`): the invalid input border and the error message. Nothing else.

### Named Rules
**The One Green Rule.** Green appears in two places only: the title block and active states (selected, focused, live, hovered primary, current revision). If green is on screen and nothing is selected, focused or hovered, it must be the title block.

**The Ink Hierarchy Rule.** Text uses three inks: `ink` for content, `ink-2` for supporting prose, `ink-3` for labels and metadata. Don't add a fourth grey.

## Typography

**Display Font:** Archivo variable (wdth 62–125, wght 100–900), self-hosted woff2, with ui-sans-serif / system-ui fallback
**Body Font:** Archivo at normal width
**Label/Mono Font:** Archivo at condensed width (78%). There is no monospace face.

**Character:** One engineered grotesque stretched to do every job: expanded and heavy for the part name, condensed and medium for the spec labels, plain for reading. Variation comes from the width axis instead of from a second typeface.

### Hierarchy
- **Display** (800, clamp(44px, 6.6vw, 88px), 0.92, wide, -0.035em): the name in the title block only.
- **Headline** (700, clamp(34px, 4.1vw, 56px), 1, wide, -0.025em): section h2s, each sitting on its section's top rule.
- **Title** (700, `--h3` clamp(22px, 2vw, 28px), 1.1, wide, -0.01 to -0.02em): project names, employer names, sub-table heads, the confirmation heading.
- **Lead** (400–500, 18px, 1.45): feature lists, section intros and project summaries, kept to 44–52ch.
- **Body** (400, 17px, 1.55): default text, with tabular numerals set on `body`.
- **Table** (400, 15–16px, 1.4): table cells, spec rows, revision changes (max 64ch).
- **Label** (600, 14px, narrow 78%, +0.01em, sentence case): table heads, spec keys, form labels, meta keys. Column heads use the same narrow width at 700/15px.

### Named Rules
**The Width-Axis Rule.** Hierarchy comes from width before size: wide for names and headings, narrow for labels and metadata, normal for prose. Never bring in a second family.

**The No-Caps Label Rule.** Labels are condensed and in sentence case, never all caps or letter-spaced into kickers. A label belongs to a table head or a key/value row. It never floats above a heading.

**The Tabular Rule.** Numerals are tabular everywhere (`font-variant-numeric: tabular-nums` on body), so dates, revisions and values line up in columns.

## Layout

Content sits in a 1240px wrap with a fluid gutter of clamp(16px, 4vw, 48px). Every two-part composition uses the same 12-column split (24px column gap, 32px row gap). The text column spans columns 1–5 and the second column always starts at column 6 and runs to the right edge. At 900px and below, both columns span the full width. Each section is at least one screen tall (100svh), has clamp(64px, 9vw, 120px) vertical padding and opens on a 1px ink rule. Its head is the same split: the h2 on the left and the intro (max 52ch) on the right, aligned to the bottom.

The fixed nav is 56px tall, and anchor scrolling is offset by nav height + 16px. Tables collapse into stacked records on phones (≤720px): the header row is hidden, each row becomes a block, and the rules stay. The revision table moves from four columns (56px / 180px / 3fr / 6fr) to a letter-plus-text layout at 960px. On phones the hero puts the screenshot and actions before the feature list, so the primary button is on the first screen. List bullets are 7px ink squares that hang in the left margin so the text stays on the column line; at ≤600px they move inside.

**The Column-Six Rule.** The second column of every split starts at grid line 6. Don't invent other split ratios for a new section.

## Elevation & Depth

The page is flat. Depth comes from rules, frames and tone (paper over paper-2, ink blocks on paper), not from shadows. Screenshots sit in a 1px ink frame over a paper-2 or ink backfill, and their hover response is a 1.02 zoom inside the frame, never a lift. The fixed nav is the one translucent surface: paper at 94% with a light backdrop blur and an ink bottom rule.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 24px 48px -12px rgba(18,20,18,.35), 0 2px 6px rgba(18,20,18,.12)`): the command palette only, a modal layer above a 32% ink scrim.

### Named Rules
**The Flat Sheet Rule.** Nothing on the page casts a shadow. The one exception is the modal command palette, which sits above the page.

**The Frame-Not-Lift Rule.** Images respond inside their frame (scale 1.02, 300ms ease-out). Frames and cards never translate, rise or gain a shadow on hover.

## Shapes

Corners are square everywhere: buttons, inputs, frames, keycaps, the title block, the palette and the revision letter boxes. Borders are 1px. Use full ink for edges that define structure (section tops, table head and foot, frames, primary and ghost buttons, the IC body outline) and the 16% hairline for row dividers and quiet controls. Small solid ink squares are the shape for bullets and the nav monogram chip. The only curve in the system is the half-round notch on the drawn IC package in the pinout, which is part of the drawing of a real chip.

**The Square Corner Rule.** Radius is 0. The IC package notch is a drawn object, not a precedent for rounded UI.

## Components

### Buttons
Square, ink-outlined and firm. They change colour on hover and press down on click.
- **Shape:** square (0), 1px ink border, min-height 48px, 0 22px padding, 600 weight 16px, 10px icon gap.
- **Primary:** ink fill, paper text. On hover (fine pointers only) it fills with green and its border turns green.
- **Ghost:** transparent with ink text and border. On hover it inverts to an ink fill with paper text.
- **Press:** `scale(0.97)` with 160ms ease-out; colours change over 160ms ease.
- **Compact variants:** the nav CTA (44px, 0 16px), the copy button (44px, hairline border that turns ink on hover) and the menu button keep the same square shape and press.

### Text Links
- **Style:** 600 weight with a 1px currentColor underline drawn as a background.
- **Hover:** text turns green and the underline redraws from 0 to 100% width (360ms ease-out).
- **Focus:** green-tint wash behind the text plus the global 2px green outline.

### Spec Table (signature)
The core component: a `dl` of label/value rows.
- **Structure:** ink rule on top, hairline between rows, 112px label column with a 16px gap, 10px vertical padding, 16px/1.4 text.
- **Variants:** two-up (label above value, paired across two columns) and a four-up strip (one ruled row of label-over-value cells, used under the hero screenshot). Both stack on phones.
- **Data tables** (applications, revisions) follow the same grammar: an ink rule above and below the head row, hairlines between body rows, 12px 16px cells, row names in bold, and a paper-2 hover on rows.

### Title Block (signature)
- The one green field: green fill, mask-ink text, display name with a 26px-max description under it. On the right is a meta `dl` (narrow mask-ink-dim keys, bold right-aligned values, mask-ink-dim hairlines).
- Wipes in once with `clip-path: inset(0 100% 0 0) → inset(0)` over 760ms ease-out.

### Image Frame
- 1px ink border, `overflow: hidden`, a fixed aspect ratio (16/9 for plates, the native ratio for the hero) and a paper-2 or ink backfill. The image is `object-fit: cover`, anchored top-left.
- On hover the image zooms to 1.02 over 300ms ease-out. Focus shows a 3px green outline offset 4px.

### Inputs / Fields
- **Style:** field-white fill, hairline sides, ink bottom border, square, min-height 48px, 12px 14px padding, 17px text. Textareas start at 140px tall and resize vertically.
- **Hover:** the side borders darken to pencil.
- **Focus:** the border turns green with a 1px green ring. The caret is green.
- **Error:** fault-red border and a 15px fault-red message below.

### Navigation
- Fixed, 56px tall, translucent paper with an ink bottom rule. A monogram chip (30×22 ink block, wide 12px) sits beside the narrow wordmark.
- Links are 15px/500 in graphite with 44px targets and turn green on hover. A search trigger has a hairline outline and a keycap. A compact primary CTA sits at the right.
- At ≤860px the links and search are replaced by a menu button that opens a full-screen paper sheet of 28px wide links on hairline rows. The rows rise in with a 30–75ms stagger.

### Stack Pinout (signature)
- An IC package with an ink body, wide part number and half-round notch, and six pins per side. Each pin has a 10px ink-outlined lead and a narrow pin number.
- When a pin is selected (by pointer or arrow keys), its lead fills green and the label turns ink and is underlined. The matching rating bars turn green and the readout lists the applications and roles that use it.
- Rating rows: a 10px paper-2 track with quarter ticks drawn in hairline and an ink fill (green when lit), with the value on the right in tabular figures.

### Revision Table
- Each row has a 32px square letter box with an ink outline; the current revision's box is filled green with mask-ink text. Dates are narrow 600, the employer is a wide title, and the changes are a bulleted list (max 64ch).

### Command Palette
- A 600px paper panel with an ink border and the overlay shadow, over a 32% ink scrim. The input row is 56px with an ink bottom rule, and keycaps are narrow, on paper-2, with hairline borders.
- The active item is filled green with mask-ink text. It opens and closes with no animation on purpose, because it is a keyboard surface. Only its toast fades and rises (200ms).

## Do's and Don'ts

### Do:
- **Do** build new content as ruled rows: a condensed sentence-case label, a value, and a 16% hairline between rows, with full ink rules at the top and bottom of the table.
- **Do** keep green to the title block and to state (selected, focused, live, current, primary hover).
- **Do** start every split's second column at grid line 6 of the 12-column wrap (1240px, gutter clamp(16px, 4vw, 48px)).
- **Do** use Archivo's width axis for hierarchy: wide (125%) for names and headings, narrow (78%) for labels, normal for prose.
- **Do** put screenshots in a 1px ink frame and respond to hover inside it (scale 1.02, 300ms, cubic-bezier(0.23, 1, 0.32, 1)).
- **Do** press buttons to 0.97, and let entrances run once: the title wipe at 760ms, then content at 380ms and 460ms delays.
- **Do** bring every entrance to rest under `prefers-reduced-motion: reduce`.

### Don't:
- **Don't** use a dark ground, a centred name, typewriter roles, a stat strip or a grid of equal cards. That is the dev-portfolio look this system replaced.
- **Don't** round corners, add gradients or glow, or lift anything on hover. Only the modal palette casts a shadow.
- **Don't** use green as decoration, as a section background beyond the title block, or for a second accent.
- **Don't** set labels in all caps or float them above headings as eyebrows.
- **Don't** animate the command palette's open or close.
- **Don't** add a second typeface or a monospace face. Keycaps and pin numbers use narrow Archivo.
