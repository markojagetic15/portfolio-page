---
version: 1
slug: "src-pages-home-ui-homepage-tsx"
primary_target: "src/pages/home/ui/HomePage.tsx"
related_targets: []
---

# Home (jagetic.com)

Scope: the single home page. Visitor mode: Experience (the work leads from the first viewport).
Audience: peers, hiring managers, recruiters, founders arriving from a link. Job: learn who Marko is and what he has built, reach him in one click. No availability claims.
Constraints: keep Cmd+K palette, easter egg, mailto form, skill bars. Curate 5 featured projects, the rest compact.

## Direction contract

THESIS: The site is Marko's datasheet, a part an engineer can spec in a minute: title block, features, typical applications, revision history, characteristics, ordering info. It refuses the dev-portfolio default (dark ground, centred name, typewriter roles, stat strip, equal card grid).

OWN-WORLD: Cool white paper (#f6f7f5), carbon ink (#121412), 1px ink hairlines at low alpha, ruled tables, square corners. One solder-mask green (#0e6b45) owns the title-block band and every active state (selected pin, focus, live link) and nothing else. Archivo across its width axis: expanded for the name, condensed for table heads and labels, normal for body; tabular numerals everywhere numbers sit. No glow, no gradients; screenshots sit flat inside a ruled frame.

STORY: The visitor sees a full-stack engineer in Zagreb with five years of production work, sees proarda running in the first viewport, scans five applications with stack and status, reads the career as a revision table, checks characteristics, and emails him.

FIRST VIEWPORT: Full-width green title block: name at display scale in expanded Archivo, "Full-stack engineer in Zagreb" under it, document meta at right (datasheet number, revision date). Below, a 5/7 split on the wrap: left the features list (four lines) with "Email Marko" primary and LinkedIn secondary; right the proarda screenshot at about 60% of the wrap inside a ruled frame with its spec strip.

FORM: Component datasheet; position 1 on my ordered list (chosen by the user as the pick over the dealt #6, industrial product catalogue); seed:0f74d28184408d71.

SIGNATURE: Stack pinout: an IC package drawn in SVG whose pins are technologies; selecting a pin (pointer or arrow keys) lights the applications and roles that use it. Motion grammar: the title band wipes in once by clip-path (ease-out, ~700ms), content follows on a short non-uniform stagger; screenshots zoom 1.02 inside their frame on hover; buttons press to 0.97; reduced motion shows everything at rest.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
