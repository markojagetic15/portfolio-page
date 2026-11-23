---
version: 1
slug: "src-pages-home-ui-homepage-tsx"
primary_target: "src/pages/home/ui/HomePage.tsx"
related_targets: []
---

# Home (jagetic.com)

Scope: the single home page. Visitor mode: Experience (the work leads from the first viewport).
Audience: peers, hiring managers, recruiters, founders arriving from a link. Job: learn who Marko is and what he has built, reach him in one click. No availability claims.
Constraints: keep Cmd+K palette, easter egg, mailto form, skill levels. Curate featured projects, the rest compact.
History: the 2026-11-23 "component datasheet" build shipped and was rejected by the owner (big green block, too plain and table-heavy, wrong concept). Owner steer: bold and colourful. Bolder re-roll; owner picked the brick build-instruction world from three rendered sketches.

## Direction contract

THESIS: The site is an assembly booklet for Marko's work: each project is a numbered build step, his stack is the box of parts, and every step shows which parts it used. It refuses both the dark dev portfolio and the plain document page; colour and play carry it, plain words carry the facts.

OWN-WORLD: Instruction-page sky blue (#58b3ea) as the ground with a faint white stud grid; white pages and call-out boxes with 3px black keylines and small radii; brick red, brick yellow, light blue and white for parts; black ink for all text. Bricolage Grotesque, very heavy for names and step numerals, regular for text. Depth is a brick's: a solid ink drop under raised pieces that disappears when a piece is pressed down flush.

STORY: The visitor sees a full-stack engineer in Zagreb and proarda as step 1 right away, follows steps 2 to 4 (Njuškalo, Guardian, Udomi me) with new parts bright and parts already used ghosted, flips through alternate builds, reads the build history, checks the parts list, and emails him.

FIRST VIEWPORT: Sky page. Left: the name very large on two lines, one plain sub-line, Email Marko (yellow brick) and LinkedIn; under them a white "Parts used" inventory of stack bricks. Right: a huge outlined step numeral 1 beside the proarda screenshot in a keyline frame, a 1:1 call-out naming the part that matters (Yjs real-time sync), an arrow from the inventory to the step.

FORM: Brick build instructions (catalog: games-toys-physics-play-brick-build-instructions), owner's choice from the bolder re-roll; seed:0f74d28184408d71 (reroll 1, bolder).

SIGNATURE: Press-to-click: every brick and button sits raised on an ink drop and clicks down flush when pressed. Parts list: choosing a part lights the steps that use it. Motion grammar: on load the name rises and step 1 drops in along its arrow once (ease-out); inventory bricks settle on a short non-uniform stagger; nothing reveals on scroll; reduced motion shows everything at rest.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
