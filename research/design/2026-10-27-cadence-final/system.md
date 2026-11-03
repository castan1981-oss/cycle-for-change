# Design system, before: the staged homepage (Oct 27, 2026)

Measured in the browser at 360×640, 375×667, 390×844, 430×932, 1440×900 (`scratchpad/ds-hero-links.py`,
`ds-stencil.py`; the second link added in the browser only). No site file changed.

## 1. What the page draws (Cadence note 2)

| Drawn thing | Where | Defined | Drift |
|---|---|---|---|
| Lane dash | strip ×3, #sign ×1 | `dash-rose-1.svg` / `dash-powder-1.svg` (`home-art.py`): nicked, worn ends | wear (§3 "drawn clean"); over the sign it is a second rose bar in the stencil's own lockup |
| Ride stroke | #road ×4 | `.log .bar-mi`, clip-path, powder, 8px | the dash's idea, drawn a second way |
| Asphalt | #road, #sign | `asphalt-2.webp` at .24 | none |
| 2027 map | #year, ≥760 only | `map-2027.svg` + `.mp-dot` 28px discs | `border-radius:50%` and `box-shadow:inset` on `--soft`: the page's only radius and shadow; one number is a disc on the map and bare `.yr-i` in the list; phones get no map (#year is 80% text) |
| Date block | #year | `.date` 1.5px, dashed when projected | a third border width |
| Plate | hero tile, #why ×3, #today, #year ×2, #ride, #sign | `.plate` + 5 sizes | #why's three stand with no stencil: chips |
| Marks | How ×3, orgs ×3 | inlined, 24 grid | the How marks repeat their headline |
| Edges | rules, lists, facts | 1px `--line`, 1px rgba(.28) in #orgs, 1.5, 2, 3px asphalt, 3px powder | six weights and colours; the system has 1px `--line` / `--line-d` / `--line-s` and a 1px asphalt opener (M7, M9) |

**The one graphic to develop: the painted stroke.** The dash and the log stroke are one thing drawn twice: rose
paint on the road, as long as what it measures. One drawing (one clip-path shape, square clean ends, no nicks), one
height (8px phone, 11px from 1024), smeared rose on light, powder on dark. Three places only: over the strip's
numbers, in the log as long as the ride, over the sign. Never over a photo, under body text, as a divider (the -2
dashes read as perforation), on patina, in the hero (the stencil's bar is the blank), on an inner page.
Impact 3, effort 2: `home.css` `.strip-cell::before`, `.sign-in::before`, `.log .bar-mi`; `tools/home-art.py`.

Then **one numbered square**: `.mp-dot` a 24px ink square with a 13/800 plaster numeral, `--soft` a dashed
`--dust-deep` outline like `.date--soft`, `.yr-i` the same square, so map and list share a mark. Drops the radius and
the shadow; answers the lab's "looks tappable". Impact 3, effort 2: `home.css` `.mp-dot`, `.mp-dot--soft`, `.yr-i`.

Cut `.plates` in #why: the sign already changes twice on the page (#today, #sign). Impact 2, effort 1:
`build-home.js` STORY, `home.css` `.plates`. The sign's dash doubles the blank: keep the strip's, drop the sign's
unless the art director wants two. Impact 1, effort 1.

## 2. Torn paper and the bicycle (note 6)

Leave them out. Torn paper is a worn texture (§3; Robert: "very sloppy"). A bicycle at display scale is a second
drawing system beside the 1.7-stroke marks (mixed icon weights), and the bike is in every photo and the film. The
motif exists: the stencil, the blank, the plate, the paint. Nothing for review.

## 3. Component drift

| Homepage | The system has | Fix | Impact / effort |
|---|---|---|---|
| How this works: mark, bold line, grey line, three across | explaining text under `details.gr-fold` (§6); numerals | if it stays open: numerals 1–3 (900, `--fs-h3`, the date-numeral family) for the marks, one column, the line at `--fs-body` asphalt; else one fold | 3 / 2 · `home.css .how-*`, `build-home.js` STORY |
| #read: four text rows, no arrow, hover-only underline | `.fn-card` (`styles.css`: 4:5 registry photo, place · month, title, dek; guides, field notes, journal); `.link` | cut #read (−0.9 screens at 390; the footer's Read column and the header's Guides say it; task 5's best route is the header). If it stays: three `.fn-card`s via `PH.card()`, `.fn-card` promoted to `/chrome.css` as the one card, "All N guides" a `.link` | 3 / 1 cut · 3 / 3 cards |
| `.find`: a bare field over an equal ghost box | M5 field; the hub's `.gr-field` with `m-search`; field 52px, `.btn` 48px (misaligned at 1440) | the field with the mark (inline `#mkSearch`), one row at every width, 52px for both; Search stays ghost (Sign up with the Center is the fill above) | 2 / 2 · `home.css .find-*`, `build-home.js` FIND |
| `.facts-dl`: 3px rule, values stranded right at 390 | M9 `.facts`: label over value, 1px asphalt | the `.facts` markup | 2 / 2 |
| `.org` rgba(.28) and `.orgs-help` asphalt hairlines; 2px openers | `--line-s`; 1px asphalt openers | one colour, one weight | 1 / 1 |
| Three film controls: `.hero-pause` box, `.today-play` disc, `.today-film-btn` text | the disc (`.gr-film-play`), ring inside | cut `.today-film-btn`; the hero's stop stays (WCAG 2.2.2) | 2 / 1 |
| `.link--bone` (home) and `.pledge .link` (chrome) | — | one dark-ground `.link` variant in `/chrome.css` | 1 / 1 |

States: hover, focus-visible, active and empty are drawn on the tile, the strip, the rows, the field and the log
(`aria-live`, "—"). Missing: a press state on `.link`, site-wide (M3); hover on `.read-list` without an arrow.
Type: `.ridewith-big` and `.orgs-door` can take `--fs-display` and `--fs-h2` (1 / 1); `.hero-intro` waits for a
`hero-contrast.py` run.

## 4. Buttons and links (notes 1 and 4)

- One primary per screen holds at 390 and 1440 (the 1440 screen with Sign up and Search has one fill). No rose on
  hover or press: holds; the tile's plate goes smeared → powder as the tile inverts (the bar's ground rule).
- `.hero-links .link{min-height:44px}` pushes the hairline 15px under the text (6px in #road): the component breaks in
  the hero. Drop it; `.hero-links{gap:0 28px;padding-block:10px}` (the `::before` pad keeps 44px). Impact 2, effort 1.
- "Read the last ride →" as a `.link` is 143px. One row at 430 (ends at x 327 of 334) and 1440. At 360/375/390 it
  stacks: the row's budget is `100% − 60px` for the pause button (268 / 283 / 297 < 309). Two left-aligned 44px rows
  are comfortable, and the first screen keeps the tile and both links at every size, but the stencil lifts 48px: the
  band under the header goes 135 → 87 at 360×640, 156 → 108 at 375×667, 274 → 226 at 390. At 360×640 the stencil's
  top then sits beside his chin (`ds-hero-stack-360x640.png`). For that size only: `@media (max-width:379px) and
  (max-height:660px){.hero-mark--stack{width:min(34vw,160px)}.hero-ride{min-height:56px}}`, then `hero-contrast.py`.
  The alternative that keeps one row everywhere, a motion/ux call: the pause into the header bar over the film on
  phones (it carries only the menu), freeing the 60px; effort 3 (`home.css` unlayered foot, `home.js`).
  Impact 4 (task 4 from 5.09 screens to 0), effort 1–2: `build-home.js` HERO `.hero-links`, `home.css` 85–86, 97–101.
