# Design system: studio pass 1, audit (Oct 21, 2026)

The `design-system` agent, AUDIT step of `2026-10-21-studio-1`. No site file was edited. This file holds the
inventory, the drift, the merge plan, every state, and the CSS. The CSS is tested and ready to paste.

**How this was checked.** I read every sheet and generator named in the brief. I counted class use across all
2,520 built pages. I took computed styles of every control on 23 pages at 390 and 1440, and made contact sheets
of each variant side by side. Then I injected the proposed CSS into the live pages and shot before/after. I ran
the cascade the way it would ship (see "How it ships") and diffed computed styles element by element.

Evidence is under `/tmp/claude-0/-home-claude/065fb8a8-1db5-530f-9a75-ba4101ea1410/scratchpad/system/`:
- `sheets/` has every variant of each family, side by side (buttons, inputs, tiles, folds, chips, facts, closing), at both widths.
- `ba-layered/` has before/after crops through the shipping cascade. `after-layered-overview.png` is the summary sheet.
- `focus-nav-before.png` / `focus-nav-after.png` show the focus ring bug.
- `layered/` holds the sheets as they would ship (chrome.css split into layers, section sheets wrapped).
- `probe.json`, `classes.json`, `losers*.json` and `l3-*.json` are the raw measurements.

---

## The short version

The critic counted five button looks in 110px and four input styles. Measured, it is worse:

| Family | Looks shipping today | Should be |
|---|---|---|
| Buttons and button-like links | **9** (`.btn` ×3 fills, `.gr-btn` stamp ×3, `.pbtn`, `.gr-route-zoom`, `label.cf-pick`), 6 heights (44, 48, 50, 52, 54, 55), 5 type settings | 1 family, 2 heights, 1 type setting |
| Picks (toggle/filter chips) | **6** (`.gr-chip`, calendar `.tag`, `.pfil` in caps, `.tbtn`, report `.dir-report-kind/-chips`, `.gr-rev-pick`) | 1 |
| Static chips | 4 (`.gr-tag`, `.place-chips li`, `.gr-rev-tags li`, `.status-flag`) | 1, plus the warning |
| Fields | **6** looks plus 2 browser defaults (`.field` underline, `.gr-search` box, `.cf-field` pale #fff box, calendar `.search` underline, home `.find-field` 2px #fff, `.sign-play-input` 2px #fff/800, `.bf-plan` box, tonight `.select`) | 1 |
| Link tiles / doors | **13** (`.res-card`, `.town-strip a`, `.res-jump a`, `.gr-tile/.gr-door`, `.gr-kind--ink`, `.gr-pick`, `.gr-wide-door`, `.cal-door`, `.mo-tile`, `.cal-pick`, `.tile-p`, `.res-door`, `.fn-spoke`) in 4 border colors and 2 checkerboards | 1 door + the poster tile |
| Disclosure folds | **11** summary treatments (+ left, + right, + both ends, boxed +, native ▶, 12px mono, 16.8px/700…) | 1 |
| Small text links | **10** (`.link`, `.gr-minor` 12px grey, `.gr-footline a`, `.gr-tonight`, `.back a`, `.town-more a`, `.cal-back a`, `.mo-nav a`, `.gr-hero-alt a`, `.gr-clear` at **11px**) | 1 (`.link`) |
| Fact grids | 4 (`.gr-facts`, `.facts`, `.gr-route-nums`, `.bf-stats`): boxed, dust lines, values on different baselines | 1 |
| Closing | 2 widths and positions (820 left, 640 centered), 2 footer colors, a 64–128px concrete sliver between | 1 field |

Six bugs turned up along the way (each is fixed by a merge below):

1. **The focus ring disappears on every filled ink button on inner pages.** `:focus-visible{outline:2px solid currentColor}`
   draws a concrete ring (the button's text color) on a concrete page. I measured it on the header "Ride with me",
   Download the GPX, Join the Strava club, Near me, Give us the OK and Send my OK. `/home.css` got a patch for this in
   Pass 22 (line 848), but `/chrome.css` never did. Before/after: `focus-nav-*.png`. This is an accessibility fail on
   2,518 pages.
2. **Fact cells don't share a top line.** `.gr-fact` and `.facts>div` are two-row grids with the default
   `align-content:normal`, so the rows stretch to the tallest cell. TSR's dd tops sit at 568 / 526 / 548. With
   `align-content:start` all three sit at 526, and the Phoenix town cells go from 1219 / 1307 / 1318 to 1219 / 1219 / 1219.
3. **"+ … +" on `/find-a-ride/` and `/rides/united-states/`.** Two `.gr-fold` blocks in rides.css (line 370 sets `::after`,
   line 567 sets `::before`) both match, so the label centers between two plus signs.
4. **Native ▶ disclosure markers** on "How we know" (1,423 ride pages, 18px tall, under the 44px floor) and on event-page FAQs.
5. **The cyclefor fields' edges are 1.42:1** (`2px solid var(--line)` on #fff). That fails WCAG 1.4.11 (3:1 for a field
   boundary). `#fff` isn't in the palette either.
6. **The closing block's heading has an accidental 33px top margin on rides directory pages.** rides.css
   `.gr-dir h2{margin-top:1.6em}` leaks into the shared block.

**On the CLAUDE.md button spec (13px / 800 / .04em, caps):** `.btn` does ship it, but only because the Pass 29 override
at `chrome.css:335` wins over the original block at `:94–113` (12px / 700 / none, now dead weight). What is off-spec:
- `.gr-btn` at 12 / 700, sentence case, on 2,065 pages. It's the ride page's primary.
- `.gr-route-zoom` at 12 / 800.
- `.gr-chip` and `.tbtn` at 12 / 400.
- `.cf-pick` at 15 / 800, with its label span thinned to 15 / 400 grey by `.cf-field > label span`. That's the
  "thin, light-weight ADD YOUR CLIP" the critic saw.

There are also two hovers on the same class. On inner pages `.btn--bone` and `.btn--ink` hover to powder rose
(`--volt`). On the homepage `.btn--bone` hovers to asphalt. Rose on a hover breaks §3 ("Buttons and links are
plaster/ink, not rose").

---

## How it ships (read this before building any merge)

**Appending to `/chrome.css` alone does not work.** Every section sheet loads after chrome.css. So any section rule
of equal or higher specificity beats the system: `.gr-btn`, `.pfil`, `.town .res-card`, `details.gr-fold`, `.tag`,
`.cf-field input…`, `.facts > div`, and many more. I measured it by moving the injected block to right after
`<link href="/chrome.css">`. Across 21 pages, 203 section-sheet rules won back (98 in events.css, 58 in rides.css).

There are three ways to fix that:

| | How | Markup or regen | Verdict |
|---|---|---|---|
| A | Append to chrome.css and delete the ~200 losing rules' declarations from the section sheets | none | Error-prone. My automated version still left ~2,100 element differences. |
| **B** | **Cascade layers.** Each section sheet is wrapped in `@layer section{…}`. In chrome.css, the generic base (tokens, type, `.btn`, `.link`, `.field`, `.ph`, `.pledge`) goes in `@layer base{…}`. The frame (nav, menu, tally line, footer, ridebar, `.theme-dark`, `.pledge-line`) and the system block stay unlayered at the end. | **none** | **Use this.** |
| C | Put the system in a new sheet loaded last | `head()` in chrome.js changes, so all 2,520 pages regenerate | Rejected: that's the regen we're avoiding |

**What B looks like** (generated files: `scratchpad/system/layered/`):
```css
/* chrome.css */
@layer base, section;
@font-face{…} @font-face{…}
@layer base{ /* everything from :root through .cta-row, .ph, .pledge, the Pass 29 type block */ }
/* the frame, unlayered: .nav … .menu … .tally-line … .pledge-line … .foot … .theme-dark … .ridebar */
/* Studio pass 1 system block (below), unlayered */

/* rides.css, events.css, calendar.css, styles.css, brief.css, cyclefor.css, tonight.css */
@layer section{ /* the file, unchanged */ }
```

**B is verified as a no-op before the system goes in.** I wrapped everything with no system block and diffed computed
styles of every element on 26 page types at both widths. 12 elements changed, and all 12 are bug 6 going away (the
closing heading's leaked 33px margin on rides directory pages). Nothing else moved.

**B with the system** is stricter than the screenshotted prototype: unlayered rules beat layered ones at any
specificity. Where a more specific section rule held out in the prototype, it now takes the system look. Examples:
`.det .facts>div` on month pages, `.dir-report--compact` picks, `/tonight/`'s `#evenings` folds, `.fn-spoke-more`.
I shot every risky page through the real layered sheets: the rose report form, `/tonight/` (dark), `/resources/`
(988 door), `/rides/` search, `/rides/about/`, the route-send form, and the town report form. Each one holds
(`ba-layered/`, `lay-shots/`).

**Caveats for the builder:**
- **Cache.** If a browser has an old unlayered chrome.css with new layered section sheets, the section looks lose for
  up to an hour (`/*.css` is `max-age=3600, must-revalidate`). Set `/*.css` to `public, max-age=0, must-revalidate`
  in `netlify.toml` for the deploy week. Netlify's ETags keep revalidation cheap. Ship all sheets in one deploy.
- **Support.** `@layer` needs Safari 15.4+, Chrome 99+ or Firefox 97+. The site already relies on `:has()`, which has
  the same floor (`body:has(.help-bar)`, `.faq dt:has`).
- **The homepage** loads only `/home.css`, so it needs no layers. Its mirror block goes at the end of home.css.
- **`/nov7/`, `/ride/`** stay as they are. nov7.css wasn't wrapped in the test, and `/ride/` has its own sheet with no chrome.

---

## Inventory, drift and merge, component by component

Page counts are pages carrying the class (of 2,520). The sheet locations are where each variant is defined today.

### 1. Buttons and button-like links

| Variant | Defined | Pages | Look today | Drift | Merge |
|---|---|---:|---|---|---|
| `.btn` `.btn--ink/--bone/--ghost/--sm` | chrome.css 94–122, 335; home.css 110–141, 1070 | 2,520 | 13/800/.04em caps, 50px (44 sm) | Hover to powder rose (inner) vs asphalt (home); ring invisible on ink; original 12/700 block dead | **Winner.** 48px / 44px sm, one hover: invert (filled ↔ line), press, pressed, disabled, busy |
| `.btn-solid` `.btn-dark` | chrome.css 115 | 0 | — | dead aliases | delete |
| `.gr-btn` (stamp: mark cell / words / arrow cell) + `--ghost` `--back` `.gr-primary` | rides.css 511–535; `rideBtn()` build-rides.js:1219 | 2,065 | 12/700 sentence case, 52px, 3 cells, ghost has an ink mark cell inside a plaster button | The "dark three-cell bar" and "light three-cell bar"; not caps; boxes inside a box | Re-pointed to `.btn` look: mark + words + arrow in one cell (`.gr-btn-mk{display:contents}`). Non-ghost = `--ink`, ghost = `--ghost`. Alias kept. |
| `.gr-minor` ("Google Calendar") | rides.css 151; build-rides.js:2637 | 1,189 | 12/400 grey, underlined, 18px tall | a fourth action look in the row; under 44px | Becomes a `.link`: 15/700, 44px |
| `summary.btn--ghost.gr-rev-open` | build-rides.js:2234, 2446 | 1,423 | `.btn--ghost` | fine | stays |
| `.btn--ink` second fill in one block (`.gr-linkrow` "Join the Strava club") | build-rides.js:2569 | 1,425 | filled | two primaries on a screen | That one goes ghost (`.gr-linkrow .btn--ink`) |
| `.pbtn` (call / directions / website) | events.css 482–484, 524; `pbtn()` build-events.js:813 | 72 | 13/800 caps, 44px; hover not under the media query | matches `.btn--sm` except states | Re-pointed to `.btn--sm`. Alias kept. |
| `.gr-route-zoom` | rides.css 836 | 2 | 12/800 caps, plaster fill | off-size | `.btn--sm` look |
| `label.btn.btn--ghost.cf-pick` "Add your clip" | cyclefor.css 49–52 | 1 | 15/800, words 15/400 grey | the thin caps button | Words inherit the button (`.cf-field>label.btn span{font:inherit}`) |
| `.tbtn` `.metros button` `.seg button` | tonight.css 121–154 | 1 | 12/400 none, bone line on tar | a toggle, not a button | → **Pick** (M4) |
| `.btn--plate` `.btn--glass` `.btn--hero` | home.css 133, 320, 929 | 0 | — | dead | delete |

**States: one family.**

| State | Ink (primary) | Ghost / line | Bone (on dark) |
|---|---|---|---|
| rest | asphalt fill, plaster words | 1px currentColor line, no fill | plaster fill, asphalt words |
| hover `(hover:hover)` | line only, asphalt words | asphalt fill, plaster words | line only, plaster words |
| active / press | gunmetal fill (every device: the tap feedback a phone gets) | asphalt fill | plaster stays |
| focus-visible | 2px `--ring` at 3px offset: asphalt on light ground, plaster on dark (`.pledge`, `.foot`, `.gr-next`, `.gr-banner`, `.res-door--now`, `.theme-dark`, the rose form) | same | same |
| aria-pressed=true (Save) | — | asphalt fill (was rose ink, a rose state) | — |
| aria-disabled / :disabled | dashed `--dust-deep` line, dust-deep words, no pointer | same | same |
| aria-busy (sending) | 75% opacity, progress cursor | same | same |

### 2. Text links

| Variant | Defined | Pages | Look today | Merge |
|---|---|---:|---|---|
| `.link` | chrome.css 123–139, 333 | 2,520 | 15/700, 1.5px hairline, arrow | **Winner** |
| `.gr-footline a` (+ a check mark on the first link only) | rides.css 315–317 | 913 | 12/400 mono-family, dust-deep underline | 15/700 underline; the mark goes (it pushed one of three links off the gutter, critic #5) |
| `.gr-tonight` (+ live mark) | rides.css 69–71 | 64 | 12/400, rose hover | same as above |
| `.back a`, `.town-more a`, `.cal-back a`, `.mo-nav a`, `.fn-back a` | events.css 74–75, 136; calendar.css 192–195; styles.css 81 | 1,875 / 260 / 22 / 12 / 33 | 12px, three different underline treatments | 15/700 underline, 44px |
| `.gr-all-link .link`, `.gr-hero-alt a`, `.gr-hub .gr-links a`, `.cal-tba a`, `.gr-near a` | rides.css; calendar.css | 64–169 | 12px mono, rose underline | same |
| `.gr-clear` / `.clear` "Clear" | rides.css 78; calendar.css 48 | 64 | **11px** (.6875rem), under the 12px floor | 15/700 |

All `text-decoration-color:var(--creosote)` underlines go to currentColor. There are 22 such declarations: rose in
bits, not fields (STUDIO move 7). States: hover thickens the underline (`(hover:hover)` only). Focus is `--ring`.
There's no press state on links (the browser's own active state is enough).

### 3. Picks (things you toggle) and static chips

| Variant | Defined | Pages | Look today | Merge |
|---|---|---:|---|---|
| `.gr-chip` | rides.css 19–23, 600; **copied** into events.css 417–419 | 84 | 12/400, dust line, bone fill; hover not under the media query | **Pick**: 14/700 sentence case, 44px, `--line-s` edge, plaster |
| calendar `button.tag` | calendar.css 32–36, 125 | 1 (`/all/`, 47 buttons) | 12/400, dust | Pick |
| `.pfil` "What do you need?" | events.css 508–513 | 18 | **13/800 caps**: reads as a button | Pick (sentence case) |
| `.dir-report-kind span`, `.dir-report-chips span` | events.css 196–229 | 1,530 | 12/400, two edge colors (light vs rose ground) | Pick; flips on the rose form |
| `.gr-rev-pick span` | rides.css 721–728 | 1,423 | 15/700, dust-deep | Pick |
| `.tbtn` | tonight.css | 1 | 12/400 | Pick, dark |
| `.cal-picks--chips .cal-pick`, `.cal-jump a` | calendar.css 189–191, 215–218 | 6 / 8 | 12px mono | Pick |
| static: `.gr-tag`, `.place-chips li`, `.gr-rev-tags li` | rides.css 125, events.css 474–476, rides.css 705 | 30 / 56 / — | bordered dust vs filled bone vs bordered | **Static chip**: 13/700 on a bone-2 fill, no border |
| `.gr-tag-warn` | rides.css 126 | 29 | rose line | stays: the one rose chip, a warning |
| `.gr-tag-rev` (a link to #reviews) | rides.css 712 | 1 | ink line | static chip look + ink line, hover fills |
| `.tag--soft`, `.gr-tag-ok`, `.chips--bone` | home.css, rides.css | 0 | — | delete |

Pick states: rest edge `--line-s`. Hover edge goes asphalt. **Pressed** (`aria-pressed=true` or `:checked+span`) is an
asphalt fill with plaster words and counts in patina. Focus is `--ring`. Disabled stays the tile's dashed state.

### 4. Fields

| Variant | Defined | Pages | Look today | Merge |
|---|---|---:|---|---|
| `.field` (report, review, route forms) | chrome.css 246–260, home.css 456–470, overridden in events.css/rides.css | 1,532 | underline only, 18px, 44px | **One field**: 1px ink box, plaster fill, 17/500, 52px |
| `.gr-search input` | rides.css 15–16, 201 | 64 | 1px ink box on concrete, 17.6px | One field |
| `.cf-field input` | cyclefor.css 45–47 | 1 | 2px `--line` (1.42:1) on **#fff** | One field (fixes 1.4.11) |
| calendar `.search input` | calendar.css 18–20 | 1 | underline, 18px | One field |
| `.find-field`, `.sign-play-input` | home.css 966, 1222 | home | 2px ink on #fff, 600 / 800 weight | One field (home mirror) |
| `.bf-plan input/select` | brief.css 24 | 1 | 1px ink box, plaster, 16px | One field |
| tonight `.select` | tonight.css 136 | 1 | line-d on tar, 12px | One field, dark |
| `<select>`/date pickers with no class | — | 12 | browser default 13.3px inset | Inherit via `.field` where wrapped |
| `.lab` labels | chrome.css 245, events.css 191 | — | 12/400 | 13/700 asphalt (`--label`) |

Field states:
- **focus:** the edge doubles (inset 1px ink); keyboard focus also gets the 2px `--ring`.
- **invalid** (`aria-invalid`): rose-ink edge.
- **disabled:** dashed `--dust-deep`.
- **placeholder:** gunmetal at full opacity (7.15:1).
- **On the rose form:** transparent fill, plaster edge and words.

### 5. Doors (link tiles), the poster tile, the ride row, cards

| Variant | Defined | Pages | Look today | Merge |
|---|---|---:|---|---|
| Town guide: `.res-card` on the town page | events.css 86–93, 350–358 | 19 | shared-border **ink** grid, bone-2, rose kicker + mark; hover inverts to asphalt (sticky on phones: not under the media query) | **Door** |
| Town guide: `.town-strip a` on ride and event pages | events.css 68–73; rides.css 382–386; `TOWNS.strip()` towns.js:148 | 240 | shared-border **grey** grid; one column on event pages; **sub-line hidden** on city hubs | Door, same columns everywhere (two across at 390), sub-line always shown |
| Town guide: `.res-jump a` on guide sub-pages | events.css 517–522 | 72 | ink grid, bone-2; hover inverts | Door |
| `.gr-tile` / `.gr-door` / `.gr-kind` | rides.css 38–51, 289–292, 545–552 | 136 | plaster, dust edge, **rose counts** | Door; counts in gunmetal; pressed = asphalt; disabled dashed |
| `.gr-pick` | rides.css 301–309 | 31 | dust edge + 3px ink left rule | Door (rule goes) |
| `.gr-wide-door`, `.cal-door`, `.cal-pick`, `.mo-tile` | rides.css 581–587; calendar.css 160–213 | 1–6 | plaster or **plaster/bone-2 checkerboard**, dust edge, rose counts | Door, one fill |
| `.res-door` (resources' three doors) | styles.css 174–184 | 1 | ink edge, paper; "Right now" on tar | Door; "Right now" stays tar |
| `.fn-spoke` | styles.css 88–94 | 3 | shared-border grid, `--line` | Door |
| `.tile-p` posters | events.css 250–286 | 78 | bone-2 / paper **checkerboard** (3n+2) | keeps its own shape (the type is the image); one fill |
| `.place--card` | events.css 459–493 | 72 | plaster, `--line`, rose edge for the home shop | stays (a card holding buttons is the one card) |
| `.gr-card`, the ride row (`card()` build-rides.js:713 + hub.js:90, kept in step) | rides.css 109–127, 182–191, 335–348, 638–642 | 865 | **a boxed card** on plaster with a dust edge; its meta line all rose; tracked .02em | **Row**: on a hairline, no box (§6 calls it "the row"); meta in gunmetal, untracked; two columns from 1024 |
| `.res-card` on `/resources/<age>/` (a `<div>`, not a link) | styles.css 97–107 | 3 | shared-border grid | Door look, no hover (hover scoped to `a.res-card`) |
| `.card` (events.css), `.dir-tile`, `.res-links-row`, `.tiles-p--facets` | events.css | 0 | — | delete |

Door states:
- **hover** `(hover:hover)`: the edge goes asphalt and the name underlines. No inverting: inversion is the
  pressed-filter state, and it stuck on phones.
- **active:** bone-2 fill with an asphalt edge.
- **pressed** (a filter tile): asphalt fill.
- **aria-disabled:** dashed `--dust-deep`.
- **focus:** `--ring`.
- **aria-current:** the town guide jump-row already drops the page you're on, so nothing to style. If a generator
  ever keeps it, `[aria-current=page]` takes the pressed look.

**Why gaps instead of shared borders:** a shared-border grid (`border-top/left` on the grid, `right/bottom` on each
cell) is what leaves "holes while the hairline runs the full width" when the last row is short (critic, smaller list).
8px of air per tile has no holes.

### 6. Folds (`<details>`)

| Variant | Defined | Pages | Look today |
|---|---|---:|---|
| `details.gr-fold` (+ `.gr-about`) | rides.css 370–375 **and** 567–571 | 1,428 | boxed bone-2, dust edge, + right; on `.gr-about` **+ both ends, label centered** |
| `.gr-first.gr-fold` | rides.css 650–653 | 1,425 | boxed, + right |
| `.dir-report--compact` | events.css 170–173, 224, 235–243, 341–345 | 1,527 | 12px, + left, ink rules top and bottom |
| `.dir-fold`, `.town-fold` | events.css 334–340, 360 | 35 | 12px, + left |
| `.place-more` | events.css 485–489 | 72 | 13px gunmetal, + left |
| `.gr-checked-more` | rides.css 377 | 1,423 | **native ▶**, 12px rose-ink, 18px tall |
| event `.faq details` | events.css 125–128 | 12 | **native ▶**, 16.8/500 |
| `.more-f` | calendar.css 37–43 | 1 | 12px, + left |
| `.gr-note-more` | rides.css 906–912 | 1 | 15/700 + right, underline |
| `.bf-how` | brief.css 123–127 | 1 | **boxed + in a square** |
| `.cf-release` | cyclefor.css 66–71 | 1 | 15/700 + after the words |
| `#evenings details.gr-fold` | tonight.css 317–322 | 1 | boxed on tar |
| `.retired` | calendar.css 86–88 | 1 | 22px/800 |

**Merge: one fold.** A `--line-s` hairline above and below (3.2:1, so the edge reads as tappable). No box, no fill.
The question at 16/700 in the ground's ink. A 20px "+" at the right edge that becomes "−" when open. 48px tall
("How we know" stays inline at 44px). On dark grounds the lines take `--line-d`.

Fold states:
- **hover** `(hover:hover)`: the question underlines.
- **focus:** `--ring`.
- **open:** "−", content padded 0 0 24px.
- `.gr-rev-write[open]>summary` stays hidden: the button that opened a form goes away while the form is open.

### 7. Fact grids and stat strips

| Variant | Defined | Pages | Look today |
|---|---|---:|---|
| `.gr-facts` / `.gr-fact` | rides.css 154–158, 366–369, 644–645 | 1,425 | **boxed** in dust; cells stretch, so values sit on 3 heights; rose marks |
| `.facts` | events.css 34–39, 323–325 | 52 (+ 23 calendar months via `.det .facts` on bone-2) | same as above; town page "Best months" 1219 vs 1307 / 1318 |
| `.gr-route-nums` | rides.css 809–825 | 2 | boxed plaster, `!important` borders |
| `.bf-stats` | brief.css 37–43 | 1 | gap-1px-on-dust grid |
| `.gr-rev-stats` | rides.css 694–697 | 1,423 | ink top rule, dust bottom (the model) |

**Merge:** `align-content:start` in every cell. One asphalt rule above, quiet hairlines between, no box. dt in
`--label` gunmetal, marks in ink, numbers tabular. `.gr-rev-stats` was already this shape.

### 8. Single-purpose slabs on the ride page

`.gr-next` (asphalt slab), `.gr-checked` (bone-2 box, dust edge, **3px rose left rule**), `.gr-first` (boxed fold),
`.wx` (boxed), `.gr-banner` (asphalt). The first screen of a ride page is the facts box, then the dark slab, then the
stamps, then the checked box: boxes inside a column.

- **This pass:** the fact box and the fold boxes come off (M8, M9). `.gr-next` stays as the one dark field above the
  fold: it's the answer. Its `--ring` is plaster.
- **Next pass:** `.gr-checked`'s rose rule becomes a plain hairline line of text under the actions. That's the
  ux-architect's call (it moves content), so it's not in the CSS below.

### 9. The closing block and the footer

| Piece | Defined | Pages | Today |
|---|---|---:|---|
| `.pledge` | chrome.css 222–229; styles.css 123–125; rides.css 283 | 2,507 | asphalt box, `max-width:820px` pinned left; 640 and centered on field notes and guides; `.gr-steps>.pledge` margin reset |
| the loose links above it | `.gr-footline` (913), `.gr-tonight-row` (64), `.back` (1,875) | — | 12px, two with marks (x≈40) and one without (x≈16) |
| `.fn-back` / `.gr-note` **after** it | styles.css 81; hand pages | 33 + 1 | a concrete strip between two dark slabs on guides, journal and trust pages |
| `.foot` | chrome.css 232 (asphalt); home.css 728 then **977 `background:var(--pool)`** | 2,518 | bruise inside, drained pool on home; `margin-top:var(--sec)` leaves a 64–128px concrete sliver |
| `.fn-why` (resources) | styles.css 153–157 | 4 | stays as it is; it's the quiet close the 988 pages need |

**Merge (M10):**
- The closing block becomes a full-width **bruise field**: edge to edge, its words on the page's own gutter and max
  width, the heading on the left and the actions on the right from 900px.
- The footer runs flush under it in **drained pool**. §3 names `--pool` as the footer color, and the homepage already
  wears it, so the inner pages are the drift.
- The way-on links sit on the gutter at 15/700 with no marks.
- A back link or note after the block joins the field (CSS now; cleaner later when apply-chrome.py writes the block
  after them).

The result is two calm fields of different color instead of "dark slab, sliver, dark slab". Verified on 18 page types:
- the closing field spans 0 to the full width;
- its heading starts exactly on the page's crumb or h1 edge (16 at 390, 96 at 1440);
- there is 0px between it and the footer.

Pages with no closing block (`/cyclefor/`, `/field-notes/`, `/404.html`, `/tonight/`) are unchanged.

### 10. Breadcrumbs, figures, labels

- **`.crumbs`**: events.css 17–21, 2,475 pages, 12px. Goes to `--label` (13/700); the current page in gunmetal/500.
  Hand pages (guides, brief, cyclefor) have no crumb at all. `/guides/<slug>/` shows a non-link "Guides · Wheels and
  tires" in `.fn-meta`. That's a way-finding fix for the ux-architect (markup in the hand pages and
  `templates/field-notes/`), so it's not in the CSS.
- **`.ph figcaption`**: chrome.css 305, 324. `padding-left:2.5%` puts it at x≈107–116 against the 96 edge (critic #3).
  It goes to 0 at desktop, in `--label`. **The feathered edge itself is not touched:** the critic put §3's "dissolve"
  vs STUDIO's "clean edge" to Robert.
- **Labels and eyebrows**: about 130 rules still set `font-family:var(--mono);font-size:12px` (mono is Overpass now, so
  that's no font violation, but 12/400 is under the 13/700 label rule). The system re-points the labels it touches.
  The rest are listed for the type-layout agent.

---

## Rose, hairlines, contrast, tokens

| Measured | Ratio | Where it's used | Verdict |
|---|---:|---|---|
| `--line` rgba(28,26,34,.18) on concrete | 1.42:1 | row and tile hairlines; **cyclefor field edges** | decoration only; never a field edge |
| `--dust` #A9BDB8 on concrete / plaster | 1.48 / 1.69 | most borders on rides, events and calendar | decoration only |
| `--dust-deep` #687F7C on concrete / plaster | 3.21 / 3.66 | a few hairlines | **the "seen" line**: field, fold and pick edges |
| `--mute` on concrete / plaster | 6.28 / 7.15 | labels, counts | the label color |
| `--creosote-ink` on concrete | 5.34 | small rose text, ~80 rules | keep for the blank and warnings; counts and meta to gunmetal |
| plaster on smeared rose | 4.68 | the rose report form's words | passes AA, just |
| `--dust` on `--pool` | 4.52 | footer labels on pool | passes AA |

- **Tokens added** (STUDIO move 3, and my brief): the space scale `--s1…--s7` (8 to 168), `--line-s` (the seen
  hairline), `--ring`, `--btn-h`, `--btn-h-sm` and `--label`. Old token names are kept. `--line` and `--line-d` stay
  where they are (`/tonight/` re-points `--line` on `:root`).
- **One deviation from my brief:** it says "one hairline color per ground". There are two on light grounds: `--line`
  for separation and `--line-s` where the edge is the affordance. One line can't be both quiet and 3:1.
- **Doc drift, for whoever edits CLAUDE.md §3:** it lists `--dust-deep` as #6F8683, which is 2.91:1 on concrete and
  fails 3:1. The sheets ship **#687F7C** (3.21:1). The doc should say #687F7C.
- **Retired-palette values still in sheets.** These are the old bone, cream and creosote:
  - home.css: `rgba(232,223,208,…)`, `rgba(246,241,231,…)`, `rgba(26,29,24,.28)`, `#2A2830`, `#9A96A2`, `#6A6670`, `#fff` ×2
  - styles.css:193, rides.css:397 and :515, events.css:199 and :208, cyclefor.css:45 `#fff`, tonight.css:7
  - build-rides.js:958, 961 and 1214 (`#2A2E28` in outline SVGs)

  Swap each one for the nearest After Hours token when the sheet is touched: `--line-d`, `--paper`, `--asphalt`.
- **Identity violations on `/tonight/`** (§3: "no shadows … never grained"):
  - a noise overlay: `body::before`, `--noise`, `mix-blend-mode:overlay`;
  - `box-shadow:0 26px 40px -22px` on the flyers;
  - rotated flyers (tonight.js still paints them);
  - a volt "ghost" title.

  That's the art-director's call because it changes the page's character. The fix is deleting four rules.

---

## Dead weight (delete in the build step; nothing emits these)

Checked against all 2,520 pages and every `.js`/`.py` in `scripts/`, `tools/` and `cfc-site/`, including template
strings like `bf-chip--${diff}`:
- **home.css: 86 classes.** The whole pledge-era board, swag, tiers, chips, calc, plane, hero, season, log-grid,
  close-copy and `.specs--dark`, plus `.btn--plate/--glass/--hero`. Lines 449–547, 409–433, 588–626, 709–725 and
  803–843 are almost entirely dead. There's also a stray `}` at line 789.
- **rides.css: 18.** `gr-match*`, `gr-wall*`, `gr-quick`, `gr-hub-foot`, `gr-events`, `gr-card-place/-stat/-top`,
  `gr-disc`, `gr-all-mark`, `tile-p--outline`, `gr-ridebox--film`, `gr-wide-doors`.
- **events.css: 14.** `.card`, `.dir-tile*`, `.dir-tiles*`, `.dir-browse`, `.dir-all`, `.res-links*`, `.calendar-link`,
  `.tiles-p--facets`, `.bike-policy*`. Also the whole map block at lines 383–452, copied from rides.css with a "keep
  the two in step" note: move it to one place.
- **styles.css: 6** (`fn-list`, `fn-row`, `fn-rdate`, `fn-page`, `fn-todo`, `fn-stage--read`). **brief.css: 5**
  (`bf-map-box`, `bf-rt`, `bf-scale`, `bf-start`, `bf-finish`). **chrome.css: 2** (`pledge-num`, `brand-word`), plus
  the `.btn-solid/.btn-dark` aliases and the 12/700 button block superseded at :335. **calendar.css: 1** (`deep-links`).
- **Stale header comments** still describe "Creosote house: Outfit + Space Mono": chrome.css:7, styles.css:1–7,
  rides.css:1–4, home.css:1–10, events.css:260. Their next reader will take them as the rule.
- **127 distinct `font-size` values** across the nine sheets. The type scale is the type-layout agent's (`--label` is
  my one contribution).
- **Sub-12px still live:**
  - `.gr-clear` 11px (fixed in M3);
  - brief.css 89, 91, 104, 106 (11px wind chip, temp unit, climb dt/units: painted by brief.js);
  - home.css 381 and 391 (the `.specs dt` / `.fact span` rules are dead).
- **Bare `:hover` outside `(hover:hover)`** (sticks after a tap on phones): 24 rules, not counting the maps. The ones that matter:
  - `.res-card:hover` inverts the whole tile;
  - `.gr-chip:hover`, `.gr-card:hover`, `.fn-spoke:hover`;
  - `.fn-row:hover` (padding shift, dead);
  - `.deep-links a:hover`, `.foot-trust a:hover`, `.gr-btn:hover` (rides.css 524–527).

  The system restates every hover it owns inside `(hover:hover)`. The rest go in the cleanup.
- **`:active` is defined nowhere** outside the maps. The system adds press states for buttons and doors.

---

## The merge plan

Impact is how much the critic's score and the site's consistency move, 1–5. Effort is 1–5:
- 1: CSS only, under 40 lines.
- 2: CSS only, with context overrides and a check across page types.
- 3: CSS plus a hand-page or one-generator change.
- 4: a generator change and a full regen.
- 5: a new component or cross-agent work.

All of M1–M11 are CSS only. No page is regenerated.

| # | Merge | Winner / losers | Fixes | Impact | Effort |
|---|---|---|---|:-:|:-:|
| **M0** | Ship through cascade layers | — | Makes every merge below stick without regenerating 2,520 pages; fixes bug 6 on its own | 4 | 2 |
| **M1** | Tokens + one focus ring per ground | `--ring` replaces `currentColor` | Bug 1 (invisible ring on ink buttons, 2,518 pages); space scale; `--line-s`; `--label` | 4 | 1 |
| **M2** | **One button** | `.btn` wins; `.gr-btn` stamp, `.pbtn`, `.gr-route-zoom`, `label.cf-pick` re-pointed; second fill to ghost; rose hover gone; press, pressed, disabled, busy | Critic #2 "five treatments in 110px": TSR's action block becomes one primary + equal ghosts + one text link | 5 | 2 |
| **M3** | One link | `.link` wins; 10 small-link styles re-pointed; rose underlines to currentColor | "Google Calendar" 12px grey; 11px "Clear"; the footline links off the gutter | 3 | 1 |
| **M4** | One pick + one static chip | Pick wins over `.gr-chip`, `.tag`, `.pfil` (caps), `.tbtn`, report and review picks | Toggles stop looking like buttons; 12/400 picks become 14/700 | 3 | 2 |
| **M5** | **One field** | Box field wins; underline fields, #fff fields and 2px fields re-pointed; home mirror | Critic's "four input styles"; bug 5 (1.42:1 edges); #fff off palette | 4 | 1 |
| **M6** | **One door** | Door wins over 12 tile treatments; the town-guide tile is one tile in all three places, sub-line always shown; no checkerboards; counts gunmetal | Critic: the town tiles "three ways", tile-row holes, rose in bits, the month checkerboard; sticky hover inversion on phones | 4 | 2 |
| **M7** | The ride row is a row | `.gr-card` loses its box; hairline rows, two columns from 1024 | Boxes in a column; rose meta lines; the desktop stranded column on short pages | 3 | 1 |
| **M8** | **One fold** | One hairline fold wins over 11 | Bug 3 ("+ … +"), bug 4 (native ▶ and 18px target on 1,423 pages) | 3 | 1 |
| **M9** | **One fact grid** | Open grid wins; boxes off | Bug 2 (values on three heights: critic's Finish 2/5) | 3 | 1 |
| **M10** | **One closing** | Full-width bruise field + pool footer flush | Critic #5: "pile of links, dark slab, sliver, dark slab"; two footer colors; two closing widths | 5 | 2 |
| **M11** | Crumbs and captions on the edge | `--label` crumbs; caption at x=96 | Captions off the column edge (x≈107–116) | 2 | 1 |
| M12 | Cleanup | Delete 132 dead classes, stale comments, retired colors, bare hovers | Next readers aren't misled; about 25 KB lighter | 2 | 2 |
| M13 | `/tonight/` grain, shadows, rotation off | art-director's call | §3 identity rules | 2 | 1 |
| M14 | Generator follow-ups (batch with the next regen) | see the list below | Lets the aliases go | 2 | 4 |

**Generator follow-ups for M14.** None are needed for this pass. Batch them with the next full rebuild in §2 order:
- `rideBtn()` (build-rides.js:1219) emits `<a class="btn btn--ink|btn--ghost">${mark}${text}${arrow}</a>`. Then delete
  `.gr-btn*` from rides.css.
- The Google Calendar link gets `class="link"`. The Instagram primary's label shortens to "Instagram ↗": a handle in
  caps runs long ("@TSR_THESATURDAYRIDE ON INSTAGRAM"). That's copy, so it's Robert's call.
- `pbtn()` (build-events.js:813) emits `btn btn--sm`; `.pfil` emits the pick class.
- `TOWNS.strip()` (towns.js:148) and the town page `res-grid` (build-events.js:661) become one function with one class.
- `FOOTLINE` drops its mark. The tonight, about and add links become one `.way-on` line.
- `scripts/apply-chrome.py` writes the closing block **after** `.fn-back` / `.fn-note` (33 hand pages). Then delete
  the `.pledge ~ .fn-back` rule.
- The Save star `☆` / `★` is a text glyph, not from the mark family. Add `m-save` to `marks.svg` and use it in
  `card()`, `hub.js` and `save.js`.

---

## The CSS

### For the end of `/chrome.css`, after it is split into layers (M0)

Tested at 23 pages × 390 / 1440: no horizontal overflow on any of them, and no new tap target under 24px. The small
ones left are native radios inside labelled picks and inline `.town-link` text on calendar rows, as before. Through
the layered build it matches the before/after screenshots, as described under "How it ships".

```css
/* ————————————————————————————————————————————————————————————————————————
   Studio pass 1 (Oct 21, 2026) — the system. One of each: button, link, pick, field, door, row, fold,
   fact grid, closing. Appended to the END of /chrome.css (inner pages); the parts marked [home] are
   mirrored at the end of /home.css. Losing classes are re-pointed here by selector, so no generated
   page has to change. Old classes stay as aliases until a generator touches them.
   ———————————————————————————————————————————————————————————————————————— */

/* M1 — tokens. Space from one scale; one quiet hairline and one seen hairline per ground; one focus ring
   per ground. [home] */
:root{
  --s1:8px;--s2:16px;--s3:24px;--s4:40px;--s5:64px;--s6:104px;--s7:168px;
  /* --line (quiet, 1.4:1) and --line-d (quiet on dark) stay where they are: /tonight/ re-points --line on :root */
  --line-s:var(--dust-deep);          /* seen: around a fold, a field's neighbours (3.2:1 on concrete) */
  --ring:var(--asphalt);
  --btn-h:48px;--btn-h-sm:44px;
  --label:700 .8125rem/1.35 var(--display);   /* 13px / 700, sentence case, gunmetal */
}
.pledge,.foot,.gr-next,.gr-banner,.res-door--now,.theme-dark,.ridebar,.cal-door--you,.gr-kind--ink,.dir-report:not(.dir-report--compact){--ring:var(--paper)}
:focus-visible{outline:2px solid var(--ring);outline-offset:3px}

/* M2 — one button. .btn is the family; the ride stamp (.gr-btn), the town buttons (.pbtn) and the map's
   Zoom take its look. Caps 13/800/.04em, one height, square. Hover inverts (filled ↔ line), press = the
   hover look on every device, no rose. */
.btn,.gr-btn,.pbtn,.gr-route-zoom{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  min-height:var(--btn-h);padding:0 20px;border:1px solid currentColor;border-radius:0;
  background:transparent;color:var(--asphalt);
  font:800 .8125rem/1.2 var(--display);letter-spacing:.04em;text-transform:uppercase;
  text-decoration:none;white-space:nowrap;cursor:pointer;
  transition:background-color .18s ease,color .18s ease,border-color .18s ease}
.btn--sm,.pbtn,.gr-route-zoom{min-height:var(--btn-h-sm);padding:0 14px}
.btn svg,.btn .mk,.gr-btn-mark,.pbtn .mk{width:18px;height:18px;flex:none;color:currentColor}
.btn--ink,.gr-btn:not(.gr-btn--ghost){background:var(--asphalt);border-color:var(--asphalt);color:var(--paper)}
.btn--bone{background:var(--paper);border-color:var(--paper);color:var(--asphalt)}
@media (min-width:900px){.nav .btn--sm{background:var(--asphalt);border-color:var(--asphalt);color:var(--paper)}}   /* phones keep Pass 23d's hairline */
/* the ride stamp, unstamped: mark + words + arrow in one cell */
.gr-btn-mk,.gr-btn--ghost .gr-btn-mk{display:contents;background:none;border:0;color:inherit}
.gr-btn-t{display:inline;padding:0;min-width:0;white-space:normal;text-align:left}
.gr-btn-go{display:inline;border:0;font-weight:400;letter-spacing:0}
.gr-btn--back .gr-btn-go{order:-1}
/* one primary per screen: the arbitrary second fill goes to line */
.gr-linkrow .btn--ink{background:transparent;border-color:var(--asphalt);color:var(--asphalt)}
/* /cyclefor/'s clip picker: `.cf-field > label span` was thinning its words to 15px/400 grey */
.cf-field>label.btn{font-size:.8125rem}
.cf-field>label.btn span{font:inherit;color:inherit}
@media (hover:hover){
  .btn:hover,.gr-btn--ghost:hover,.pbtn:hover,.gr-route-zoom:hover{background:var(--asphalt);border-color:var(--asphalt);color:var(--paper)}
  .btn--ink:hover,.gr-btn:not(.gr-btn--ghost):hover{background:transparent;border-color:var(--asphalt);color:var(--asphalt)}
  .btn--bone:hover{background:transparent;border-color:var(--paper);color:var(--paper)}
  .gr-btn:hover .gr-btn-mk{background:none}
  .gr-linkrow .btn--ink:hover{background:var(--asphalt);color:var(--paper)}
}
.btn:active,.gr-btn--ghost:active,.pbtn:active{background:var(--asphalt);border-color:var(--asphalt);color:var(--paper)}
.btn--ink:active,.gr-btn:not(.gr-btn--ghost):active{background:var(--mute);border-color:var(--mute)}
.btn[aria-pressed="true"]{background:var(--asphalt);border-color:var(--asphalt);color:var(--paper)}   /* Save, saved */
.btn[aria-disabled="true"],.btn:disabled{border-style:dashed;border-color:var(--dust-deep);background:transparent;color:var(--dust-deep);cursor:default;pointer-events:none}
.btn[aria-busy="true"]{cursor:progress;opacity:.75}
/* context: /rides/ hub's Near me is emitted .btn--bone and shown ink (it's that screen's primary); on the rose
   report form the submit is a ghost so the page keeps one filled button (events.css, Pass 6) */
.gr-hub .gr-search .btn--bone{background:var(--asphalt);border-color:var(--asphalt);color:var(--paper)}
.dir-report:not(.dir-report--compact) .btn--ink{background:transparent;border-color:var(--paper);color:var(--paper)}
@media (hover:hover){.dir-report:not(.dir-report--compact) .btn--ink:hover{background:var(--paper);color:var(--asphalt)}}
/* on dark ground */
.pledge .btn--ghost,.foot .btn--ghost,.gr-banner .btn--ghost,.theme-dark .btn--ghost{color:var(--paper);border-color:var(--paper)}
@media (hover:hover){.pledge .btn--ghost:hover,.foot .btn--ghost:hover,.theme-dark .btn--ghost:hover{background:var(--paper);border-color:var(--paper);color:var(--asphalt)}}
.pledge .btn--ghost:active,.foot .btn--ghost:active,.theme-dark .btn--ghost:active,.pledge .btn--bone:active{background:var(--paper);border-color:var(--paper);color:var(--asphalt)}

/* M3 — one link. .link (15/700, a hairline, the arrow) is the look for every single "way on" link; the
   12px mono ones and the 12px grey "Google Calendar" take it. No rose underlines on inner pages. [home] */
a{text-decoration-color:currentColor}
.gr-minor,.gr-footline a,.gr-tonight,.back a,.fn-back a,.town-more a,.cal-back a,.mo-nav a,.gr-all-link .link,.gr-hero-alt a,.cal-tba a,.gr-hub .gr-links a,.gr-clear,.clear,.gr-near a{
  font:700 .9375rem/1.35 var(--display);letter-spacing:0;color:var(--asphalt);
  text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:5px;text-decoration-color:currentColor;border:0}
.gr-minor,.gr-footline a,.gr-tonight,.back a,.fn-back a,.town-more a,.cal-back a,.mo-nav a,.gr-clear,.clear,.gr-near a{display:inline-flex;align-items:center;min-height:44px}
.gr-clear,.clear{background:none;border:0;padding:0 2px;cursor:pointer}   /* "Clear" was 11px (.6875rem), under the floor */
.gr-footline,.gr-tonight-row,.back,.fn-back,.town-more,.cal-back,.mo-nav{font:700 .9375rem/1.35 var(--display);letter-spacing:0;color:var(--asphalt)}
.gr-footline-mark,.gr-tonight-mark{display:none}       /* decoration: it put two of three links off the gutter */
@media (hover:hover){.gr-minor:hover,.gr-footline a:hover,.gr-tonight:hover,.back a:hover,.town-more a:hover{text-decoration-thickness:2.5px}}

/* M4 — one pick: a filter or choice you toggle (sentence case, not a road sign). The ride report's kinds and chips,
   the review's picks, the town page's "What do you need?", the calendar's tags, the hub's city chips. display stays
   the section sheets' own (rides.css hides the map's back/reset chips until it zooms). */
.gr-chip,button.tag,.pfil,.tbtn,.dir-report-kind span,.dir-report-chips span,.gr-rev-pick span,.cal-picks--chips .cal-pick,.cal-jump a{
  align-items:center;gap:8px;min-height:44px;padding:0 14px;
  border:1px solid var(--line-s);border-radius:0;background:var(--paper);color:var(--asphalt);
  font:700 .875rem/1.2 var(--display);letter-spacing:0;text-transform:none;text-decoration:none;cursor:pointer}
.gr-chip-n,.tag .c,.pfil-n,.cal-picks--chips .cal-pick b{font-weight:400;color:var(--mute)}
@media (hover:hover){.gr-chip:hover,button.tag:hover,.pfil:hover,.tbtn:hover,.dir-report-kind label:hover span,.dir-report-chips label:hover span,.gr-rev-pick label:hover span,.cal-jump a:hover{border-color:var(--asphalt)}}
.gr-chip[aria-pressed="true"],.tag[aria-pressed="true"],.pfil[aria-pressed="true"],.tbtn[aria-pressed="true"],
.dir-report-kind input:checked+span,.dir-report-chips input:checked+span,.gr-rev-pick input:checked+span{background:var(--asphalt);border-color:var(--asphalt);color:var(--paper)}
.gr-chip[aria-pressed="true"] .gr-chip-n,.tag[aria-pressed="true"] .c,.pfil[aria-pressed="true"] .pfil-n{color:var(--dust)}
.dir-report-kind input:focus-visible+span,.dir-report-chips input:focus-visible+span,.gr-rev-pick input:focus-visible+span{outline:2px solid var(--ring);outline-offset:2px}
.tag.you[aria-pressed="true"]{background:var(--asphalt);border-color:var(--asphalt)}
/* on the rose form the pick flips */
.dir-report:not(.dir-report--compact) .dir-report-kind span,.dir-report:not(.dir-report--compact) .dir-report-chips span{background:transparent;border-color:var(--paper);color:var(--paper)}
.dir-report:not(.dir-report--compact) .dir-report-kind input:checked+span,.dir-report:not(.dir-report--compact) .dir-report-chips input:checked+span{background:var(--paper);color:var(--asphalt)}
.theme-dark .tbtn{background:transparent;color:var(--paper);border-color:var(--line-d)}
.theme-dark .tbtn[aria-pressed="true"],.theme-dark .tbtn.solid{background:var(--paper);color:var(--asphalt);border-color:var(--paper)}
/* a static chip (it says what something is; you can't tap it): no border, a plaster-on-concrete fill */
.gr-tag,.place-chips li,.gr-rev-tags li{display:inline-flex;align-items:center;gap:6px;padding:5px 9px 4px;border:0;background:var(--bone-2);color:var(--asphalt);font:700 .8125rem/1.2 var(--display);letter-spacing:0}
.gr-tag-warn{background:transparent;border:1px solid var(--creosote-ink);color:var(--creosote-ink)}   /* the one rose chip: a warning */
.gr-tag-rev{min-height:32px;background:transparent;border:1px solid var(--asphalt);text-decoration:none}   /* this one is a link (to #reviews) */
@media (hover:hover){.gr-tag-rev:hover{background:var(--asphalt);color:var(--paper)}}

/* M5 — one field. A box with a 1px ink edge, plaster inside (never #fff), 17px words, 52px tall. [home] */
.field,.gr-search input,.search input,.cf-field input[type="text"],.cf-field input[type="url"],.cf-field input[type="email"],.bf-plan input,.bf-plan select,.find-field,.sign-play-input{
  width:100%;min-height:52px;margin:0;padding:12px 14px 10px;
  border:1px solid var(--asphalt);border-radius:0;background:var(--paper);color:var(--asphalt);
  font:500 1.0625rem/1.3 var(--display);box-shadow:none;appearance:none;-webkit-appearance:none}
.gr-field input{padding-left:44px}
textarea.field{min-height:6em;resize:vertical}
.field::placeholder,.gr-search input::placeholder,.search input::placeholder,.cf-field input::placeholder{color:var(--mute);opacity:1}
.field:focus,.gr-search input:focus,.search input:focus,.cf-field input:focus{outline:0;box-shadow:inset 0 0 0 1px var(--asphalt);border-color:var(--asphalt)}
.field:focus-visible,.gr-search input:focus-visible,.search input:focus-visible,.cf-field input:focus-visible{outline:2px solid var(--ring);outline-offset:2px}
.field[aria-invalid="true"],.cf-field input[aria-invalid="true"]{border-color:var(--creosote-ink);box-shadow:inset 0 0 0 1px var(--creosote-ink)}
.field:disabled{border-style:dashed;border-color:var(--dust-deep);color:var(--dust-deep)}
.lab,.cf-field>label,.gr-rev-lab,.search label,.bf-plan label{font:var(--label);color:var(--asphalt)}
.dir-report:not(.dir-report--compact) .field{background:transparent;border-color:var(--paper);color:var(--paper)}
.dir-report:not(.dir-report--compact) .lab,.dir-report:not(.dir-report--compact) .lab small{color:var(--paper)}
.dir-report:not(.dir-report--compact) .field:focus{box-shadow:inset 0 0 0 1px var(--paper)}
.theme-dark .select{min-height:52px;background:var(--asphalt);color:var(--paper);border-color:var(--paper);font:500 1rem/1.3 var(--display)}

/* M6 — one door (a link tile: mark, name, one line). Plaster, one quiet hairline, 8px of air between —
   never a shared-border grid (that's what left holes with the hairline running on). One fill: no
   checkerboards. Ink marks, gunmetal counts. Hover = the edge goes ink and the name underlines. */
.town .res-grid,.res-grid,.town-strip,.res-jump,.fn-spokes,.res-doors{gap:var(--s1);border:0}
.res-card,.town .res-card,.town-strip a,.res-jump a,.gr-tile,.gr-pick,.gr-wide-door,.cal-door,.mo-tile,.mo-tiles>.mo-tile:nth-child(2n),.cal-pick,.cal-picks>.cal-pick:nth-of-type(2n),.res-door,.fn-spoke{
  background:var(--paper);border:1px solid var(--line);color:var(--asphalt)}
.gr-pick{border-left-width:1px}
/* the town-guide tile is one tile everywhere: same columns (two across at 390), sub-line always shown
   (rides.css hid it on city hubs; events.css ran one column on event pages; the town page ran 168px) */
.town-strip,.town .res-grid{grid-template-columns:repeat(auto-fill,minmax(min(160px,100%),1fr))}
.gr-steps .town-strip a span:last-child{display:block}
.town-strip a,.town .res-card{padding:14px 14px 16px;gap:4px}
@media (max-width:420px){.town-strip a:last-child:nth-child(odd){grid-column:1 / -1}}   /* as the town page already does (events.css) */
.tile-p,.tiles-p>.tile-p:nth-child(3n+2){background:var(--paper)}           /* posters: one fill */
.res-k,.town .res-k,.town-strip a .eyebrow,.gr-tile-n,.gr-tile-sub,.cal-door-n,.gr-pick-k,.gr-wide-door span span,.cal-pick b,.fn-spoke-more,.res-door .fn-spoke-more,.gr-row-st i,.gr-day-n,.mo-n{color:var(--mute)}
.mk--res,.mk--strip,.res-jump .mk,.gr-tile-mark,.cal-door-mk,.gr-pick-mark,.mk--door{color:currentColor}
@media (hover:hover){
  a.res-card:hover,.town-strip a:hover,.res-jump a:hover,a.gr-tile:hover,a.gr-wide-door:hover,a.cal-door:not(.cal-door--you):hover,a.mo-tile:hover,a.res-door:not(.res-door--now):hover,.fn-spoke:hover,.gr-pick:hover,.cal-pick:hover,button.gr-tile:not([aria-pressed="true"]):not([aria-disabled="true"]):hover{background:var(--paper);border-color:var(--asphalt);color:var(--asphalt)}
  a.res-card:hover .res-k,a.res-card:hover span:last-child,a.res-card:hover .mk--res,.res-jump a:hover .mk{color:inherit}
  a.res-card:hover b,.town-strip a:hover b,.res-jump a:hover span,.gr-tile:hover .gr-tile-name,.cal-door:hover .cal-door-name,.fn-spoke:hover .fn-spoke-title{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px}
}
a.res-card:active,.town-strip a:active,.res-jump a:active,a.gr-tile:active,.gr-pick:active,.cal-door:active,.mo-tile:active{border-color:var(--asphalt);background:var(--bone-2)}
.gr-tile[aria-pressed="true"],.cal-door--you,.gr-kind--ink{background:var(--asphalt);border-color:var(--asphalt);color:var(--paper)}
.gr-tile[aria-pressed="true"] .gr-tile-n,.gr-tile[aria-pressed="true"] .gr-tile-sub,.cal-door--you .cal-door-n,.gr-kind--ink .gr-tile-sub{color:var(--dust)}
.gr-tile[aria-pressed="true"] .gr-tile-mark,.cal-door--you .cal-door-mk{color:currentColor}
.gr-tile[aria-disabled="true"],.mo-tile[aria-disabled="true"]{background:transparent;border-style:dashed;border-color:var(--dust-deep);color:var(--dust-deep)}
.res-door--now{background:var(--tar);border-color:var(--tar);color:var(--paper)}

/* M7 — one row (the ride row, card() + hub.js): a row on a hairline, not a box. Its small line in
   gunmetal, untracked. */
.gr-grid{gap:0 var(--s4);border-top:1px solid var(--asphalt);grid-template-columns:repeat(auto-fill,minmax(min(100%,480px),1fr))}
.gr-card{background:transparent;border:0;border-bottom:1px solid var(--line);padding:14px 46px 14px 0}
@media (hover:hover){.gr-card:hover{border-color:var(--line)}.gr-card:hover .gr-card-name{text-decoration-color:currentColor}}
.gr-card:focus-within{border-color:var(--line)}
.gr-card-meta,.gr-card-meta .gr-wait,.gr-card-checked,.gr-dist,.gr-disc{letter-spacing:0;color:var(--mute)}
.gr-wait--waits{color:var(--asphalt)}

/* M8 — one fold. A hairline above and below, the question at 16/700, "+" and "−" at the right edge,
   48px tall, no box, no fill. Fixes the "+ … +" on /find-a-ride/ (two .gr-fold rules in rides.css). */
details.gr-fold,.dir-fold,.dir-report--compact,.more-f,.place-more,.gr-note-more,.bf-how,.cf-release,.faq details,details.gr-country-notes,.retired{
  margin:var(--s3) 0 0;padding:0;background:transparent;border:0;border-top:1px solid var(--line-s);border-bottom:1px solid var(--line-s)}
.dir-fold+.dir-report--compact,.faq details+details,details.gr-fold+details.gr-fold,.place-more:last-child{margin-top:0}
.dir-fold+.dir-report--compact,.faq details+details,details.gr-fold+details.gr-fold{border-top:0}
details.gr-fold>summary,.dir-fold>summary,.dir-report--compact>summary,.more-f>summary,.place-more>summary,.gr-note-more>summary,.bf-how>summary,.cf-release>summary,.faq summary,.gr-checked-more>summary,details.gr-country-notes>summary{
  display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:48px;padding:12px 0;margin:0;
  list-style:none;cursor:pointer;text-align:left;border:0;position:static;
  font:700 1rem/1.3 var(--display);letter-spacing:0;text-transform:none;color:inherit}
details>summary::-webkit-details-marker{display:none}
details.gr-fold>summary::before,.dir-fold>summary::before,.dir-report--compact>summary::before,.more-f>summary::before,.place-more>summary::before,.bf-how>summary::before{content:none}
details.gr-fold>summary::after,.dir-fold>summary::after,.dir-report--compact>summary::after,.more-f>summary::after,.place-more>summary::after,.gr-note-more>summary::after,.bf-how>summary::after,.cf-release>summary::after,.faq summary::after,.gr-checked-more>summary::after,details.gr-country-notes>summary::after{
  content:"+";flex:none;width:1em;margin:0;border:0;position:static;text-align:center;font:400 20px/1 var(--display);color:currentColor}
details.gr-fold[open]>summary::after,.dir-fold[open]>summary::after,.dir-report--compact[open]>summary::after,.more-f[open]>summary::after,.place-more[open]>summary::after,.gr-note-more[open]>summary::after,.bf-how[open]>summary::after,.cf-release[open]>summary::after,.faq details[open] summary::after,.gr-checked-more[open]>summary::after,details.gr-country-notes[open]>summary::after{content:"\2212"}
.gr-rev-write[open]>summary{display:none}   /* the button that opens a form goes away while it's open (rides.css) */
.gr-checked-more{margin:2px 0 0;border:0}
.gr-checked-more>summary{min-height:44px;padding:0;justify-content:flex-start;font-size:.875rem;color:var(--asphalt)}
.gr-checked-more>summary::after{font-size:16px}
@media (hover:hover){details.gr-fold>summary:hover,.dir-fold>summary:hover,.dir-report--compact>summary:hover,.more-f>summary:hover,.place-more>summary:hover,.faq summary:hover,.cf-release>summary:hover,.bf-how>summary:hover{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px}}
details.gr-fold>dl,details.gr-fold>.gr-about-body,.dir-fold>.dir-built-grid,.place-more-body{padding:0 0 var(--s3)}
.theme-dark details.gr-fold,#evenings details.gr-fold{border-color:var(--line-d)}

/* M9 — one fact grid: the label and the value share a top line in every cell; one rule above, hairlines
   between, no box. (The dd dropped by half the slack: the cell's two grid rows stretched.) */
.gr-fact,.facts>div{align-content:start}
.gr-facts,.facts{border:0;border-top:1px solid var(--asphalt);gap:0}
.gr-fact,.facts>div{border:0;border-bottom:1px solid var(--line);padding:14px 16px 14px 0}
@media (min-width:640px){.gr-fact+.gr-fact,.facts>div+div{border-left:1px solid var(--line);padding-left:16px}}
.gr-fact dt,.facts dt,.gr-route-nums dt,.bf-stats dt{font:var(--label);color:var(--mute);letter-spacing:0}
.gr-fact-mark,.facts>div .mk{color:var(--asphalt)}
.gr-route-nums,.det .facts{background:transparent;border:0;border-top:1px solid var(--asphalt)}
.gr-route-nums>div{border-color:var(--line)!important}
.gr-route-nums b.num,.bf-stats dd,.fn-table td,.gr-rev-stat b,.mo-c{font-variant-numeric:lining-nums tabular-nums}

/* M10 — the end of every inner page: the way-on links on the gutter, then the closing block as a full-width
   bruise field (its words on the page's edge), then the footer flush under it in drained pool (CLAUDE.md §3:
   --pool is the footer; the homepage already wears it). No concrete sliver, no second dark slab. */
.pledge,.wrap>.pledge,.fn-post>.pledge,.fn-pillar>.pledge,.gr-steps>.pledge{
  max-width:none;margin:var(--s6) calc(50% - 50vw) 0;
  padding:var(--s5) max(var(--gut),calc((100vw - var(--maxw)) / 2 + var(--gut)))}
@media (min-width:900px){
  .pledge{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);column-gap:var(--s5);align-items:end}
  .pledge .cta-row{grid-column:2;grid-row:1 / span 2}
}
.pledge-line{margin:0 0 14px}   /* restated: events.css's bare h2{margin:2em …} would win from @layer section */
/* hand pages put "← All guides" (or a note) after the block; it joins the field instead of leaving a concrete
   sliver above the footer. Cleaner later: apply-chrome.py writes the block after it (33 hand pages). */
.pledge ~ .fn-back,.pledge ~ .fn-note,.pledge ~ .gr-note{max-width:none;margin:0 calc(50% - 50vw);
  padding:0 max(var(--gut),calc((100vw - var(--maxw)) / 2 + var(--gut))) var(--s4);background:var(--asphalt);color:var(--dust)}
.pledge ~ .fn-back a,.pledge ~ .gr-note a{color:var(--paper)}
body:has(main .pledge) .foot{margin-top:0;border-top:1px solid var(--line-d)}
main:has(.pledge){padding-bottom:0}
.foot{background:var(--pool)}
.foot-col .eyebrow,.foot-crisis .eyebrow,.foot-line,.foot-trust a,.signup .note{color:var(--dust)}   /* 4.5:1 on pool */

/* M11 — crumbs and the figure caption on the column edge */
.crumbs{font:var(--label);letter-spacing:0;color:var(--asphalt)}
.crumbs [aria-current]{color:var(--mute);font-weight:500}
@media (min-width:900px){.ph figcaption{padding-left:0}}
.ph figcaption,.gr-film-where{font:var(--label);color:var(--mute)}
```

### For the end of `/home.css`

Tested at 390 and 1440. The first screen is unchanged. 11 elements change, all of them the two fields and two
buttons in "Ride with me" and the finder. No overflow.

```css
/* ————————————————————————————————————————————————————————————————————————
   Studio pass 1 (Oct 21, 2026) — the system, mirrored onto the homepage (end of /home.css). Same tokens,
   one focus ring per ground, the button states, one field. The first screen's sign, plate and finder
   tiles are untouched.
   ———————————————————————————————————————————————————————————————————————— */
:root{
  --s1:8px;--s2:16px;--s3:24px;--s4:40px;--s5:64px;--s6:104px;--s7:168px;
  --line-s:var(--dust-deep);--ring:var(--asphalt);--btn-h:48px;--btn-h-sm:44px;
  --label:700 .8125rem/1.35 var(--display);
}
.sign,.nums--bar,.s--tar,.foot,.ridebar,.today-ask,.road-film-frame{--ring:var(--paper)}
:focus-visible{outline:2px solid var(--ring);outline-offset:3px}
.btn{min-height:var(--btn-h);padding:0 20px}
.btn--sm{min-height:var(--btn-h-sm);padding:0 14px}
.btn--bone{background:var(--paper);border-color:var(--paper)}
@media (hover:hover){
  .btn--ink:hover{background:transparent;border-color:var(--asphalt);color:var(--asphalt)}   /* was powder rose: rose isn't a hover */
  .btn--bone:hover{background:transparent;border-color:var(--paper);color:var(--paper)}
  .btn--ghost:hover{background:var(--asphalt);border-color:var(--asphalt);color:var(--paper)}
}
.btn:active{background:var(--asphalt);border-color:var(--asphalt);color:var(--paper)}
.btn--ink:active{background:var(--mute);border-color:var(--mute)}
/* one field: the two white boxes (#fff is off the palette) take the inner pages' field */
.find-field,.sign-play-input{min-height:52px;padding:12px 14px 10px;border:1px solid var(--asphalt);background:var(--paper);font:500 1.0625rem/1.3 var(--display)}
.find-field:focus,.sign-play-input:focus{outline:0;box-shadow:inset 0 0 0 1px var(--asphalt)}
.find-field:focus-visible,.sign-play-input:focus-visible{outline:2px solid var(--ring);outline-offset:2px}
```

### Build order for the build step

1. Split chrome.css into `@layer base` + the unlayered frame and wrap the seven section sheets. The generated example
   is in `scratchpad/system/layered/`. Check the no-op: only the closing heading's 33px margin moves.
2. Append the system block. Append the home mirror to home.css.
3. In netlify.toml, set `/*.css` to `max-age=0, must-revalidate` for the deploy week.
4. Shoot `/`, a ride page (TSR), `/rides/`, a city hub, `/find-a-ride/`, `/events/2027/` and a month, an event page,
   `/towns/arizona/phoenix/` and a sub-page, `/brief/`, `/guides/` and a guide, `/cyclefor/`, `/resources/` and an age
   page, and `/tonight/`, at 390, 820, 1024 and 1440.
5. Run the cleanup (M12) as its own commit, so a revert of either is clean.

No generator runs and no page regenerates for M0–M11.
