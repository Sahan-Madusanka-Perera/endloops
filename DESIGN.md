---
name: Endloops
description: Financial work, prepared for your sign-off. An audit file on security paper.
colors:
  paper: "#ffffff"
  mist: "#f4f7f6"
  mist-2: "#eaf0ee"
  ink: "#141c2e"
  ink-2: "#465166"
  ink-3: "#5f697c"
  rule: "#e1e6ea"
  rule-2: "#cfd6dc"
  green: "#08ab66"
  green-ink: "#067a4a"
  green-wash: "#e6f6ee"
  teal: "#0c847a"
  teal-ink: "#0a6b63"
  teal-wash: "#e3f2f0"
  blue: "#2f5bea"
  blue-ink: "#2449c7"
  blue-wash: "#e9eefd"
  purple: "#6a4cd8"
  purple-ink: "#5638c0"
  purple-wash: "#efebfb"
  navy: "#0d1424"
  navy-text: "#b9c2d6"
typography:
  display:
    fontFamily: "'Archivo Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.6rem)"
    fontWeight: 640
    lineHeight: 0.98
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "'Archivo Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 620
    lineHeight: 1.06
    letterSpacing: "-0.024em"
    fontVariation: "'wdth' 108"
  title:
    fontFamily: "'Archivo Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 620
    lineHeight: 1.06
    letterSpacing: "-0.024em"
    fontVariation: "'wdth' 108"
  body:
    fontFamily: "'Archivo Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'ss01' on"
  body-small:
    fontFamily: "'Archivo Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  display-md:
    fontFamily: "'Archivo Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 640
    lineHeight: 0.98
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 112"
  display-lg:
    fontFamily: "'Archivo Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "4rem"
    fontWeight: 640
    lineHeight: 0.98
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 112"
  headline-md:
    fontFamily: "'Archivo Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 620
    lineHeight: 1.06
    letterSpacing: "-0.024em"
    fontVariation: "'wdth' 108"
  subhead:
    fontFamily: "'Archivo Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 620
    lineHeight: 1.06
    letterSpacing: "-0.024em"
    fontVariation: "'wdth' 108"
  caption:
    fontFamily: "'Archivo Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
  micro:
    fontFamily: "'Azeret Mono Variable', ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1
    fontFeature: "'tnum' on"
  label:
    fontFamily: "'Azeret Mono Variable', ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.02em"
    fontFeature: "'tnum' on"
rounded:
  tab: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  sheet: "1.25rem"
  full: "9999px"
spacing:
  shell-phone: "1.25rem"
  shell-desktop: "2.5rem"
  margin-column: "7rem"
  section: "5rem"
  section-md: "7rem"
  rule-row: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "44px"
  button-primary-lg:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "52px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "44px"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "52px"
  button-light-hover:
    backgroundColor: "{colors.mist}"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 16px"
    height: "48px"
  chip-interest:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.full}"
    padding: "0 16px"
    height: "40px"
  chip-interest-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  index-tab:
    typography: "{typography.label}"
    textColor: "{colors.paper}"
    rounded: "{rounded.tab}"
    size: "20px"
  product-ref-chip:
    typography: "{typography.label}"
    rounded: "{rounded.tab}"
    width: "36px"
    height: "24px"
  divider-sheet:
    rounded: "{rounded.sheet}"
    padding: "80px 24px 48px"
  navy-panel:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.navy-text}"
    rounded: "{rounded.sheet}"
---

# Design System: Endloops

## Overview

**Creative North Star: "The Audit File"**

The site is an audit file on security paper. Every page is a divider in that file with its own letter and its own ink (A Home, B Solutions, C Tools, D About, E Contact). Sections inside a page carry working-paper references (A1, A2, A4.3) set in a mono face in a left margin column, the way an index sits in the margin of a working paper. Figures sit on ruled lines in tabular numerals, closed by a heavy rule above and a double rule below. Fine-line guilloche (a WebGL rosette in the Home hero, static SVG seals on dividers and dark panels, a wave band above the footer) is the security-paper engraving that makes the paper feel like it holds something of value.

The ground is white and quiet, the ink is navy, and colour arrives as solid fills with a job: a divider's field, an index tab, a tick mark that means "prepared", a flag that means "needs your judgement". Density is a reader's density: generous section spacing (5rem, 7rem from md), long measures capped near 60ch, and tables that read like a schedule rather than a dashboard. Motion files things into place; it never performs.

The world rejects the gradient-blob SaaS hero, dashboard screenshots and icon-card grids. Its version of a feature grid is a ruled index sheet; its version of a hero image is a prepared schedule awaiting review.

**Key Characteristics:**
- White security paper, navy ink, four solid divider inks (green, blue, purple, teal).
- Lettered divider tabs navigate; mono reference codes index every section from the margin.
- Ruled columns, tabular figures, a heavy rule to open and a double rule to close a schedule.
- Single-ink fine-line guilloche as the only ornament.
- Drawn auditor's marks (tick, cast, flag, sign) as the icon grammar.
- Sign-off blocks: "Prepared by Endloops" beside "Reviewed by" a person.

## Colors

Restrained white and navy carry the page; four solid inks each hold one role in the file and one divider.

### Primary
- **Ledger Navy Ink** (ink): All body and heading text, the primary button, the opening rule of every schedule (2px), the closing double rule (3px double), selected chips. The Home divider (A) tab.
- **Logo Green** (green): The colour of work Endloops has prepared. Solid field of the Solutions divider sheet (with navy text, not white), B-series product chips, the outer band of the hero rosette, the drawn underline under "your sign-off", progress bars on prepared steps. Its deeper sibling **Ledger Green** (green-ink) carries green as text, tick marks on white, and the Solutions tab in the nav.

### Secondary
- **Ruling Blue** (blue): Standalone tools and the act of matching. Solid field of the Tools divider (white text), C-series product chips, the "cast to ledger" mark, the inner band of the hero rosette, and every focus ring (2px outline, 3px offset; 2px ring on fields). **Deep Ruling Blue** (blue-ink) is blue as text.
- **Reviewer Teal** (teal): The person. The sign mark, the "You" station in every flow, the Contact divider, selected radio cards (teal-wash ground with teal ring), the footer guilloche band at 45%. **Deep Teal** (teal-ink) is teal as text.

### Tertiary
- **Judgement Purple** (purple): Anything that needs a professional's judgement. The flag mark, flagged ledger rows (purple-wash at 45%), "Awaiting you" in sign-off blocks, form errors and required asterisks (purple-ink), and the About divider. **Deep Judgement Purple** (purple-ink) is purple as text.

Each ink has a **wash** (green-wash, teal-wash, blue-wash, purple-wash) used as a tinted ground behind a reference chip, a selected card, or a flagged row. Washes never carry text in their own base ink; text on a wash uses the matching -ink step.

### Neutral
- **Security Paper** (paper): The page, every card, the header, the footer. The only ground the logo may sit on.
- **Mist** (mist) and **Deep Mist** (mist-2): Alternate section grounds (heritage strip, principles, the solutions explorer), the "Sample" pill, skeleton lines in miniature documents.
- **Slate** (ink-2): Secondary copy and intros. **Pale Slate** (ink-3): metadata, margin references, labels, placeholders.
- **Hairline Rule** (rule) and **Firm Rule** (rule-2): Row dividers, card rings, the 1px seams of ruled index grids, field rings at rest.
- **Night File** (navy): The dark demo section and the closing call-to-action panel, with **Night Text** (navy-text) for body copy on it and white for headings. Guilloche on navy is teal at 20-40% or purple at 25%.

### Named Rules
**The One Ink, One Job Rule.** Green means prepared, blue means matched or tools, teal means the person, purple means needs judgement. A colour is never borrowed for decoration outside its role or its divider.

**The Solid Fill Rule.** Divider inks appear as flat solid fields, chips and marks. No gradients between inks, no hue sweeps; the hero shader itself runs one solid ink per band (outer green, inner blue).

**The White Ground Rule.** The logo is the supplied JPG on white and appears only on white surfaces (header, footer). It never goes on mist, navy or a divider field.

## Typography

**Display Font:** Archivo Variable, set wide (with ui-sans-serif, system-ui)
**Body Font:** Archivo Variable at normal width (stylistic set 1 on)
**Label/Mono Font:** Azeret Mono Variable (with ui-monospace, SF Mono, Menlo)

**Character:** One grotesque in two widths: stretched and tightly tracked for headings, so they read like the title on a file cover, and normal width for reading. The mono is reserved for reference codes, the file's index language.

### Hierarchy
- **Display** (640, steps 2.5 / 3.5 / 4 / 4.6rem, line-height 0.98, width 112%, tracking -0.032em): Page titles only: the Home hero (2.5 → 4 → 4.6) and each divider sheet's h1 (2.5 → 3.5 → 4.6). The 404 uses 2.5 → 4.
- **Headline** (620, steps 2 / 2.5 / 3rem, line-height 1.06, width 108%, tracking -0.024em): Section h2s via the section head and the closing panel, both 2 → 2.5 → 3.
- **Subhead** (620, 1.75rem, stepping to 2rem from sm where it heads a panel): Explorer panel titles, the bridge heading, half-sheet and principle titles, demo stage headings.
- **Title** (620, 1.25-1.5rem, same width and tracking as headline): Card, capability, tool and product names.
- **Body** (400, 1.0625rem, line-height 1.6): Running copy; intros step up to 1.125-1.25rem relaxed. Measures cap at 44-62ch.
- **Body small** (400, 0.9375rem): Nav, footer, table cells, list items.
- **Caption** (600, 0.8125rem): Compact labels inside the demo, such as station names on phones and extracted field values.
- **Label** (mono 500, 0.75rem, tracking 0.02em, tabular): Section references, tab letters, footer column heads, the slip's schedule code.
- **Micro** (mono 500, 0.6875rem): Product ref chips (B1, C2), nav and footer tab letters, step numbers. The smallest size on the site; nothing goes below it.

**The One Ramp Rule.** Every font size comes from the steps above, or Tailwind's lg / xl / 2xl body steps. A new size is a design-system change, not a local tweak.

### Named Rules
**The Reference Rule.** Mono is only for reference codes and index letters. It never sets sentences, buttons or headings.

**The Tabular Rule.** Every table and figure list uses tabular, lining numerals so columns of numbers align like a schedule.

**The Margin Reference Rule.** Section references live only in the md+ margin column, never stacked above a heading. On phones there is no margin, so the reference is not shown.

## Layout

A single shell (max 78rem, 1.25rem side padding on phones, 2.5rem from 768px) holds every page. From md, content uses a working-paper grid: a 7rem margin column for the reference code, then the content column (max ~48rem for headings and intros). Content below a section head indents to align with that column (7rem margin) so the margin stays clear.

Sections are spaced 5rem on phones and 7rem from md, separated by a hairline top rule or a change of ground (paper, mist, navy). Divider sheets sit 1rem below the header inside the shell.

Grids of items are ruled, not carded: a 1px gap over a rule-coloured ground creates hairline seams between white cells (the two-shapes comparison, the flow strip, principles on mist). Lists of capabilities and labour are ruled rows with a 2px navy opening rule and hairline row rules. A repeating 2.5rem ruled-line background is available for ledger texture.

The header is 4.5rem tall and sticky; full navigation shows from lg, below which a full-height menu sheet takes over. Breakpoints follow Tailwind defaults (sm 640, md 768, lg 1024, xl 1280).

## Elevation & Depth

Mostly flat paper. Depth is conveyed by rules, rings and grounds; shadows appear only where a sheet of paper physically lifts off the file: the prepared slip in the hero, the stacked mini-documents, the selected explorer row, buttons, and the header once scrolled. Every shadow is a soft, navy-tinted, negative-spread drop; none is a hard offset.

### Shadow Vocabulary
- **Lifted slip** (`box-shadow: 0 30px 60px -28px rgba(13,20,36,0.45), 0 2px 6px -2px rgba(13,20,36,0.12)`): A loose sheet resting on the file; the hero slip.
- **Paper card** (`box-shadow: 0 8px 18px -14px rgba(13,20,36,0.5)`): Small paper objects in illustrations and the selected row of a list.
- **Ink button** (`box-shadow: 0 1px 0 rgba(255,255,255,0.12) inset, 0 10px 24px -12px rgba(13,20,36,0.55)`): The primary button only.
- **Scrolled header** (`box-shadow: 0 1px 0 var(--color-rule), 0 8px 24px -20px rgba(13,20,36,0.35)`): Appears after 8px of scroll.

### Named Rules
**The Paper Lift Rule.** A shadow means a sheet lifted off the file. Section containers, ruled grids and divider sheets stay flat; they use a 1px ring or a ground change instead.

## Shapes

Gently rounded paper. Small reference tabs are nearly square (4px); cards and fields are 8-12px; divider sheets and the navy panel are 1.25rem; buttons and filter chips are full pills. Tabs on miniature documents are rounded on top only, like a file divider's tab. Borders are 1px hairlines (usually as inset rings), except the 2px navy opening rule and 3px double closing rule of a schedule. Guilloche strokes are non-scaling hairlines (0.5-0.7px).

## Components

### Buttons
Confident ink pills, quiet motion.
- **Shape:** full pill; md 44px tall (0.9375rem text), lg 52px (1rem).
- **Primary:** navy ink ground, white text, medium weight, with the ink button shadow; hover deepens the navy. An optional drawn arrow slides 2px right on hover.
- **Light:** white on navy panels; hover to mist.
- **Outline:** transparent with a 1px firm-rule inset ring; hover turns the ring navy and fills white. **Outline dark** uses a 35% white ring on navy.
- **States:** press scales to 0.98; focus shows the blue outline at 4px offset; disabled drops to 45% opacity. Transitions run 300ms on the file ease.

### Chips
- **Interest chips (form):** 40px pills with a firm-rule ring and slate text; selected turns solid navy with white text.
- **Reference chips:** mono label on a solid ink (B green with navy text, C blue with white), 36x24px, 4px corners. Used in capability rows and the explorer.
- **Sample pill:** mist ground, pale slate 0.6875rem text, reading "Sample". Every piece of demonstration data carries one.

### Cards / Containers
- **Corner Style:** 12px for panels and explorer sheets, 1.1-1.25rem for large comparison grids.
- **Background:** white on paper or mist; mist steps for in-card stations.
- **Shadow Strategy:** flat, 1px rule ring (see Elevation).
- **Internal Padding:** 24px phone, 40px from sm.

### Inputs / Fields
- **Style:** 48px tall, white, 8px corners, 1px firm-rule inset ring, 16px side padding; hover ring to pale slate.
- **Focus:** ring thickens to 2px blue; no glow.
- **Error:** ring turns purple and stays purple on focus; message and required asterisk in deep purple.
- **Radio cards:** 12px cards with a ring; selected uses teal-wash ground, teal ring and a filled teal check dot.

### Navigation
- **Desktop (lg+):** each item is a lettered index tab (20px solid-ink square, mono letter, 4px corners) beside a medium 0.9375rem label. Active is navy text with a 3px ink bar along the header's foot in that page's ink, which slides between items; the tab lifts 2px on hover and when active.
- **Mobile:** a full-height white sheet that wipes down (clip reveal, 380ms), listing every divider as a 36px lettered tab, title-size label and a one-line description, separated by hairlines, ending in a full-width Request a demo.
- **Footer:** the guilloche band, then an "Index" column of lettered tabs with quiet underlined links.

### Divider Sheet (signature)
The page hero for every inner page: a solid ink field (green with navy text; blue, purple, teal with white text), 1.25rem corners, a single-ink rosette bleeding off the top right in white at 28-55%, and the page letter in a tab. From md the tab sits in the 7rem margin as a 56px translucent-white square with a white ring. On phones it is pinned to the sheet's top-right corner as a 44px solid white square with the tone's ink letter. Title in Display, intro in large body, optional actions below.

### Prepared Slip and Sign-off Block (signature)
A white schedule card: mono schedule code and title over a 2px navy rule, ruled rows of label and tabular figure each led by an auditor's mark, closed by a 3px double rule, then a two-column sign-off: "Prepared by Endloops" with a green tick, "Reviewed by" in purple with a pulsing dot reading "Awaiting you". Always labelled Sample.

### Auditor's Marks
An authored icon set on a 24px grid, 1.75 stroke, round caps and joins: tick (prepared), cast (matched to ledger), flag (diamond, needs judgement), sign (reviewed), plus arrows and a few interface glyphs. Ticks can draw themselves on reveal.

### Motion
One easing, the file ease (cubic-bezier(0.22, 1, 0.36, 1)). The hero entrance runs in CSS keyframes on the compositor: rise (fade plus up to 26px), fade-in, draw (stroke dash) and slip-in (the slip drops in and settles at -1.5deg), staggered by delay. Scroll reveals use motion, rise 18px and start from 30% opacity so content is legible before it moves; they run once. Reduced motion collapses all of it.

## Do's and Don'ts

### Do:
- **Do** give every new page a divider letter, one of the four inks, and a divider sheet hero.
- **Do** index sections with mono references in the md+ margin column (7rem), and align following content to the content column.
- **Do** present comparisons, features and capabilities as ruled rows or hairline-seamed grids with a 2px navy opening rule.
- **Do** set every figure in tabular numerals and close schedules with a 3px double rule.
- **Do** use the auditor's marks by meaning: green tick prepared, blue cast matched, purple flag needs judgement, teal sign reviewed.
- **Do** label every piece of sample data with the Sample pill.
- **Do** keep guilloche to one ink per figure, hairline stroke, behind content.
- **Do** start scroll reveals at 30% opacity and use the file ease for all motion.

### Don't:
- **Don't** use gradient-blob heroes, dashboard screenshots or icon-card grids.
- **Don't** place a reference code, kicker or eyebrow above a heading; references live only in the margin column.
- **Don't** blend inks into gradients or hue sweeps, in CSS or in the shader.
- **Don't** place the logo on anything but white, or redraw, recolour or stretch it.
- **Don't** show metrics, testimonials, customer names or live/upcoming product labels.
- **Don't** set sentences, buttons or headings in the mono face.
- **Don't** use hard offset shadows or put shadows on flat containers; a shadow means a lifted sheet.
- **Don't** put white text on Logo Green; the green field takes navy ink.
