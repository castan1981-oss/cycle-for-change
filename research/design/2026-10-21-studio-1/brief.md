# Brief: studio pass 1 (Oct 21, 2026)

Art director. Branch `design/studio-pass-1`. This file is the brief and the build plan; the sign-off goes at the foot.

Read in order: `critic-before.md` (28 / 50), `lab-before.md`, then `ux.md`, `type-layout.md`, `system.md`, `photo.md`,
`motion.md`. Already on main (PR #192): the Ride with me bar no longer gets painted over by the tally. Only its
follow-up is in this pass (the bar's attribute becomes `data-until`, line 17).

Screenshots named below live in the session scratch folder,
`/tmp/claude-0/-home-claude/065fb8a8-1db5-530f-9a75-ba4101ea1410/scratchpad/`, under `before/`, `before-tiles/`,
`lab/before/` and each desk's own folder (`system/`, `photo/`, `motion/shots/`, `ux/shots/`). Never in the repo.

## The aim

Bring every inner page up to the homepage's finish — one set of controls, his photographs big and clean-edged, the
desktop width used on one grid, one ending — and put his write-up, his next ride, the guides and the crisis line one
tap closer, without slowing any core task.

What it should move: the critic's four 2s (finish, photography, consistency, desktop composition) to 4, way-finding,
hierarchy and reading from 3 to 4, nothing down. Target 36+ / 50. "His" (4) is the line to watch: one system must not
turn into anyone's template.

## Rulings already made (kept)

- **Photo edges go clean.** No mask, no fade, anywhere. CLAUDE.md §3's figure rule is rewritten in the build (B).
- **The footer is drained pool on every page**, and the closing block and the footer become one ending.
- **Photo rule breaks are fixed this pass** by swapping to pictures already in the repo that pass the rules.
- **Robert's explicit rules stay as they are.** Where a desk wants one changed, it's under For Robert.
- **Copy is never invented.** Cutting repeated words is fine. Every label named below already exists on the site.

## Rulings on the desks' conflicts (new, this brief)

| # | Conflict | Ruling | Why |
|---|---|---|---|
| D1 | Robert's portraits on desktop: photo-editor's 2:1 / 3:2 crops (C1–C3) vs type-layout's pairing (portrait on 5 of 12 columns beside the next block) | **Pairing.** robert-camelback, robert-peace and phx-canal stay 4:5 and sit beside content on the grid. 2:1 bands are for places and the swaps (riders-camelback on `/rides/`, empty-road, sawtooth-calm, phx-skyline). | Keeps him whole (the crops cut him at the hip), uses the width with words beside the picture (move 5), and needs fewer new files. |
| D2 | Fold marker: type-layout keeps a left "+"; system and motion keep a right "+" / "−" | **Right edge, "+" then "−" (U+2212), never rotating.** Type-layout's two fold lines in its rides.css block are dropped. | One fold family; two desks out of three. |
| D3 | Press and hover: motion fills powder rose on press and on the nav button's hover | **No rose on any hover or press** (system's states). Motion owns timing only. | §3: buttons and links are plaster and ink, never rose. |
| D4 | Header Ride with me at ≥900 on inner pages: system keeps it filled, UX makes it a line | **A line on inner pages at ≥900; it fills on hover.** The homepage header stays as it is. | One primary per screen; on a ride page it's the third dark block on the first screen. |
| D5 | The ride page's dark "Next ride" bar: system keeps it as the answer's field, UX folds it into the When cell | **It stays this pass.** Only its time format changes to match the cell ("6:00 am"). Folding it into When is part of the ride-page restructure in Pass 2. | 1,425 pages and the tests; it's one change, done with the rest of that page's order. |
| D6 | Caption size: type-layout `--fs-small` (14–15px), photo and system 13px / 700 | **13px / 700 gunmetal**, on the photo's left edge. | A caption is a label (place · month). |
| D7 | The closing block: three desks wrote it | **System M10's shape** (full-width bruise field, words on the gutter, heading left and actions right from 900px, the footer flush under it in drained pool), **type-layout's numbers** (`--sec` above, the heading at `--fs-h2` and 20ch, the footer on 12 columns at ≥1024), **UX's content** (two actions). System's `.pledge ~ .fn-back` patch is not built: B moves the back links above the block. | One owner per property. |
| D8 | Homepage band padding: type-layout `.s` on `--band` (+8% height at 1440) | **Not this pass.** The homepage keeps its own `--sec` and band padding. Its `:root` mirror does not redefine `--sec` or `--band`. | The homepage scored best. Its spacing moves with its own desktop composition (Pass 2). |
| D9 | `/find-a-ride/` kinds: type-layout's 3×3 (9 tiles) vs UX dropping the Brief tile (8) | **8 kinds.** Brief is a tool, not a kind of ride. Desktop 4×2 on columns 1–8 with the photo in 9–12; phones two across, no hole. | One question per page; still no hole. |
| D10 | Cache: system's `max-age=0` header for the deploy week vs regenerating | **Version every stylesheet link** (one shared `?v=` from `scripts/chrome.js`) in the one regeneration we're already doing. `netlify.toml` is untouched. | A page can't pair an old unlayered chrome.css with new layered section sheets. |
| D11 | Breadcrumb weight: type-layout (links 500, current 700) vs system / UX (links 700 underlined, current 500 gunmetal) | **System / UX.** | Crumbs have to look like links (lab, tasks 2 and 3). |
| D12 | Field focus offset 2px (system) vs 4px (motion); door press bruise fill (motion) vs plaster-2 fill + ink edge (system) | **System's.** | The component owner decides its own states. |
| D13 | Tally line: 13px (UX) vs `--fs-small` (type-layout) | **`--fs-small`**, and it becomes a link to the live count (`/#road`) with no dot. | It's a line of words, not a label. Both are at or above the floor. |

## Ranked list: Pass 1

The effort scale is UX's: 1 = one sheet or one static file; 2 = one generator helper or several sheets, riding the
one regeneration; 3 = several generators, or images plus a generator. Moves are STUDIO.md's eleven. A and B are the
two builders (see the build plan). Shared things come first.

| # | Change | Proof | Moves | Impact | Effort | Owner | Files |
|---|---|---|---|:-:|:-:|---|---|
| 1 | **Cascade layers, one token block, one focus ring per ground.** Section sheets in `@layer section`, chrome base in `@layer base`, the system unlayered. One `:root` for space, rhythm, type, measure, the seen hairline, button heights, the label and the motion tokens. One `--ring`: bruise on light, plaster on dark (fixes the invisible ring on every filled button, the 988 door and the help bar). Every stylesheet link gets the pass's version. | `system/focus-nav-before.png` | 9, 10, 11 | 5 | 2 | A; B for the link versions | every `.css` (A); `scripts/chrome.js` `head()`, every generator's `styles:` list, `apply-chrome.py` `SECTION_STYLES`, `build-home.js` home.css link (B) |
| 2 | **One ending.** Full-width bruise closing field on the grid edge, drained pool footer flush under it on every page, footer on 12 columns at ≥1024. The closing keeps two actions: "The live count" goes (the tally line becomes that link, line 17). Nothing sits between the closing block and the footer: the 28 hand pages' "← All guides" / notes and `/rides/about/`'s disclaimer move above it. | `before-tiles/rides@390-03.png`, `before-tiles/brief@1440-02.png`, `before-tiles/guides@1440-06.png` | 7, 4, 1 | 5 | 2 | A + B | `chrome.css`, `styles.css`, `rides/rides.css` (A); `scripts/chrome.js` `pledge()`, `scripts/apply-chrome.py`, `tools/build-rides.js:1580` (B) |
| 3 | **One button, one link, one field.** The ride stamp (`.gr-btn`), the town buttons, Zoom and Add your clip take `.btn`. Ten small-link looks become `.link`, with currentColor underlines (no rose). Six field looks become one, with no white boxes and no 1.42:1 edges. The arbitrary second fill goes to a line. Header Ride with me is a line on inner desktop pages (D4). Every state is drawn: hover under `(hover:hover)`, press, pressed, disabled, busy. | `before/rides_scottsdale-az-scottsdale-cycling-saturday-ride@1440-first.png`, `before-tiles/cyclefor@390-02.png`, `ux/shots/rides_phoenix-az-bullshifters-saturday-club-ride@1440-first.png` | 9, 8, 1 | 5 | 2 | A | `chrome.css`, `home.css`, `cyclefor/cyclefor.css` |
| 4 | **One door, fold, fact grid, row and pick, plus crumbs that read as links.** No shared-border grids, so no holes. No checkerboards. Counts and meta in gunmetal, not rose. One hairline fold (fixes "+ … +" and the native ▶ on 1,423 pages). Fact cells on one top line, with no box. The ride row sits on a hairline, not in a box. Toggles are sentence-case picks, not buttons. Crumbs 13/700 with a patina hairline. | `before-tiles/towns_arizona_phoenix@1440-02.png`, `before-tiles/find-a-ride@1440-02.png`, `before/events_2027@390-first.png` | 8, 9, 10, 7 | 4 | 2 | A | `chrome.css`, plus the section sheets' in-place hover fixes |
| 5 | **One type scale, the 13px label floor, measure, spacing.**<br>• One fluid scale; under-13 text drops from 26–35% to 2–11% on directory pages.<br>• `--measure:30em`, so 105–191 characters a line come down to about 70.<br>• One page top, `--sec` between sections, three gaps on ride pages instead of eleven.<br>• Tabular numbers, `text-wrap`, the `.gr-note` collision, no 11px text. | `before-tiles/events_seattle-to-portland@1440-03.png`, `before/rides@1440-first.png` | 2, 3, 10 | 4 | 2 | A | `chrome.css`, `home.css` (minus D8), every section sheet |
| 6 | **Desktop: every inner page on one 12-column grid.**<br>• Town doors sticky in columns 9–12 beside the h1; event facts beside the lede.<br>• Calendar home in two columns; the riding list with the portrait sticky in 9–12.<br>• Hub portraits beside the next block; tiles `auto-fit`; find-a-ride kinds 4×2 beside the photo (D9).<br>• Ride pages: the state map in 9–12 beside the facts.<br>• Reading pages: the column on the 96px edge, with Keep reading in 9–12.<br>• The brief: words beside the drop box. | `before/towns_arizona_phoenix@1440-first.png`, `before/events_2027@1440-first.png`, `before-tiles/rides_az_phoenix@1440-02.png`, `before/brief@1440-first.png` | 5, 4 | 5 | 2 | A | `events/events.css`, `events/2027/calendar.css`, `rides/rides.css`, `styles.css`, `brief/brief.css` |
| 7 | **Photographs clean.**<br>• Every mask goes: `.ph`, the guides hero, the homepage hero's inner edge, `#today`, nov7.<br>• The `.ph` figure is rewritten (edge to edge on phones, on the grid on desktop; `--wide` / `--frame` / `--tall`).<br>• Captions on the photo's edge (D6).<br>• Registry photos served **ungraded** (grade.py's `clean` look, files bumped to `-2`, AVIF/WebP beside each). | `before/guides@1440-first.png`, `before-tiles/find-a-ride@390-02.png`, `before-tiles/rides_az_phoenix@1440-02.png`, `photo/grade-vs-clean.jpg` | 6 | 5 | 2 | A (CSS); B (grade, files, registry) | `chrome.css` (`.ph` in place, in base), `home.css`, `styles.css`, `nov7/nov7.css` (A); `tools/grade.py`, `scripts/photos.js`, `cfc-site/img/ph/*-2.*` (B) |
| 8 | **Photo rule breaks swapped; soft sources made crisp.**<br>Swaps:<br>• `crew` (a face with no OK, soft) → riders-camelback 2:1 on `/rides/`; pv-camelback-road on `/rides/az/`.<br>• `people` → riders-camelback on its 6 pages.<br>• sawtooth-road (a camper trailer) → empty-road on `/events/2027/`.<br>• The South Mountain rider's face → the no-rider crop.<br>• card-journal (a parked car) → the love-wall crop; card-pv and card-south rebuilt from the registry.<br>Crisp sources:<br>• The TSR poster → the 3.9 s frame (`tsr-1b`).<br>• The guides hero gets AVIF/WebP (`haus-road-2`).<br>• sawtooth-calm's desktop source from the 2400 original.<br>• The Phoenix town guide gets phx-skyline as a band.<br>Repair: the `apply-photos.js` regex (0 / 16 → 16 / 16).<br>Check every new placement at 1:1 for vehicles and faces (pv-camelback-road wasn't in the photo editor's check). | `before-tiles/rides@1440-02.png`, `before-tiles/events_2027@1440-02.png`, `before/rides_scottsdale-az-scottsdale-cycling-saturday-ride@390-first.png` | 6, 11 | 5 | 3 | B | `scripts/photos.js` (`wide` sources, new keys), `scripts/apply-photos.js`, `tools/grade.py` MANIFEST, `tools/build-rides.js` (`STATE_PHOTO`, `FACET_PHOTO`, `photoBand` keys at 1423 / 1572), `scripts/build-calendar.js:598`, `scripts/build-events.js` `TOWN_PHOTO`, `data/ride-films.json`, hand pages `guides/`, `field-notes/`, `field-notes/phoenix/`, `field-notes/south-mountain-climb/`, `journal/`; images from `photo/crops/` |
| 9 | **His write-up is one tap from the homepage.**<br>• "Read the last ride" points at `/rides/<slug>/#robert` (the newest entry in `data/ride-notes.json`) and shows on phones too (R1).<br>• The log row with that date links there.<br>• The ride page's tag row gets "I rode it" (the existing link-chip class `gr-tag-rev`).<br>• The guides' From the road gets a row ("My first TSR", his line). | `lab/before/t4-390-04-clue-tsr-in-the-log.png`, `lab/before/t4-390-11-answer-i-rode-it.png` | 11 | 5 | 2 | B + A (R1) | `scripts/build-home.js`, `cfc-site/home.js` (log painter), `tools/build-rides.js` ridePage `tags`, `cfc-site/guides/index.html`; `home.css` (A) |
| 10 | **The crisis line comes right under the h1 on `/resources/`.**<br>• New order: h1, then the three doors (Right now first; same words), then the intro.<br>• That satisfies both of §4's rules: "crisis line right under the h1" and "opens on three doors".<br>• Trevor lands on the first screen at 375×667 and above the 988 bar at 390×844.<br>• 988 is tap-to-call in the phone menu and the footer.<br>• `apply-chrome.py` keeps that order on every resources page. | `before/resources@390-first.png`, `lab/before/spot-375x667-resources.png`, `lab/before/t6-390-02-menu-open.png` | 11 | 5 | 1 | B + A (R4) | `cfc-site/resources/index.html`, `scripts/apply-chrome.py`, `scripts/chrome.js` HEADER `menu-foot` and FOOTER `foot-crisis`; `styles.css` (A) |
| 11 | **One nav list.**<br>• Guides replaces Field notes in the desktop header; Field notes stays in the footer and on `/guides/`.<br>• "Towns" in both lists.<br>• The lit section is right: `/guides/`, `/field-notes/`, `/journal/` light Guides; `/brief/` lights Find a ride.<br>• The phone menu marks where you are.<br>• Nav links 44px tall; menu sub-labels 13px. | `lab/before/t5-1440-02-tap-all-21-guides-your-first-chari.png`, `before/guides@1440-first.png` | 11, 9 | 4 | 2 | B + A | `scripts/chrome.js` HEADER, `cfc-site/chrome.js` `SECTION` + `.menu-list` `aria-current` (B); `chrome.css` (A) |
| 12 | **Ride with me lands on the ride, open.**<br>• `NEXT_RIDES` hrefs become `/events/2027/riding/#center-ride-out` and `#cycle-to-zero`.<br>• `/ridebar.js`'s `here` test ignores the hash.<br>• On Robert's list, the links row moves to the top of the opened row.<br>• "Robert's ride" leaves his own list.<br>• The town link leaves every row summary (a 20px trap on 638 rows; the panel already carries it). | `lab/before/t3-390-03-tap-23-apr-23-25-center-ride-out.png`, `lab/before/t3-390-04-answer-the-way-to-sign-up.png` | 11, 1 | 4 | 2 | B + A (R5) | `scripts/chrome.js`, `cfc-site/ridebar.js`, `scripts/build-calendar.js` (`eventHtml`, the riding `shortPage`); `calendar.css` (A) |
| 13 | **The desktop homepage says what it is and keeps the way in on the first screen.**<br>• The three finder tiles in one row above the fold at 1440×900 and 1366×768.<br>• The sign capped by viewport height.<br>• `.sign-intro` shows at ≥760 in place of the kicker.<br>• The sign's question moves under the finder row.<br>• Typing in the sign never moves the page, at any width.<br>• Phones stay identical apart from the reserved space and R1. | `before/home@1440-first.png`, `lab/before/t2-1440-01-home-first-screen.png`, `lab/before/t1-1440-01-home-first-screen.png`, `motion/sign390_pair.png` | 1, 5, 11 | 4 | 2 | A | `home.css` (the sign block, `.finder`, 1108 / 1132 / 1179–1185) |
| 14 | **`/rides/`: the six big cities on the first screen.**<br>• The jump chips go into the hero under the search.<br>• "Outside the US" becomes their last chip.<br>• The duplicate wide door goes. | `lab/before/t2-1440-04-tap-phoenix-home.png`, `before/rides@1440-first.png` | 11 | 3 | 2 | B + A (R6) | `tools/build-rides.js` `directory()` (1397, 1419, 1421); `rides.css` (A) |
| 15 | **Event pages: name, date and sign-up first.**<br>• One headline.<br>• The poster keeps date and town only (the 12px rose text over contour lines goes).<br>• The eyebrow goes; check every fact in it is also in the facts list first, and keep any that isn't. | `before/events_seattle-to-portland@1440-first.png` | 1, 2 | 3 | 2 | B + A (R8) | `scripts/build-events.js` `eventPage()`; `events.css` (A) |
| 16 | **Motion and states.**<br>• The mile number paints once (no 34-value roll).<br>• Films: the play disc leaves the tab order while playing, no scale bounce, Play / Pause doesn't move the caption.<br>• Today's film gets the reel's Play / Pause line (WCAG 2.2.2).<br>• One timing scale (120 / 200 / 320 ms, one easing); one reduced-motion guard; `brief.js` respects it.<br>• Touch press: no blue flash, no hover that sticks.<br>• Focus never hides under the nav or the bar.<br>• The `/brief/` load shift goes; the crumb ring is no longer clipped.<br>• Decoration stops moving: the shop-floor rise, the card zoom, the `/tonight/` ticker, the hidden ping.<br>• `/tonight/` loses its grain, shadows and tilt (§3). | `motion/shots/film@1440-todayVid.png`, `motion/shots/press@390-fn-spoke.png`, `motion/shots/grhead-clip.png` | 9, 10 | 3 | 2 | A + B | every sheet, `home.css`, `tonight/tonight.css`, `nov7/nov7.css` (A); `cfc-site/home.js` (`rollTo`, today's film, touchstart), `cfc-site/chrome.js` (touchstart), `scripts/build-home.js` `todaySection()`, `cfc-site/brief/brief.js`, `scripts/build-brief.js` (sample shown, `V` bumped) (B) |
| 17 | **Finish details in markup.**<br>• The raw "- " lists in 6 tire and wheel guides become real lists; footnote numbers sit on their word.<br>• The guides hub's "01 / 03 / 04" become anchor links (same words).<br>• `/find-a-ride/` loses the Brief tile; "Brief a ride" goes into the footer's Ride column, where "Events" leaves.<br>• The tally line becomes a link to `/#road`, with no dot (R3).<br>• The TSR film caption gets its place back ("Scottsdale · Oct 2026").<br>• `#today`'s caption sits under its lead photo as "Phoenix · Oct 2026".<br>• The ride page's next-ride time uses one format.<br>• "April 23 to 25" can't break inside the date (nowrap).<br>• The bar's `data-cur` becomes `data-until`, with `ridebar.js` bumped to `?v=39`. | `before-tiles/guides_bike-tire-pressure@1440-02.png`, `before/find-a-ride@1440-first.png`, `before-tiles/home@1440-06.png` | 10, 11, 8 | 3 | 1 | B + A (R3, R7) | `cfc-site/guides/{are-aero-wheels-worth-it,bike-hub-maintenance,bike-tire-pressure,bike-tire-tread,bike-wheel-stiffness-comfort,spoke-tension-wheel-truing}/index.html`, `cfc-site/guides/index.html`, `tools/build-rides.js` (`findPage` kinds, film caption 2213), `scripts/chrome.js` (FOOTER, tally line, `RIDE_BAR`), `scripts/build-home.js` (371, `#today`), `cfc-site/rides/ride.js:84`, `cfc-site/ridebar.js:39` |

Expected lab moves (the lab reruns `tasks.py` unchanged):

| Task | Width | Before | Target |
|---|---|---|---|
| 1 What is this | 1440 | partly (whose yes, what no) | yes |
| 2 Phoenix ride this week | 1440 | 3 taps, smallest 73×40 | 2 taps, nothing under 44 |
| 3 Next ride, ride it with him | both | 2 taps, the list opens on another ride | 1 tap to Center Ride Out's row, open, links first |
| 4 His write-up | 390 / 1440 | 8 taps, 6.3 screens / 6 taps | 1 / 1 |
| 5 Fundraising minimum guide | 1440 | 9.3 screens | Guides in the header, then the list |
| 6 Help right now | 375×667 | Trevor off the first screen | Trevor on it; 988 in the menu is a link |

No task may get slower. Every page must stay at CLS 0.

## Not this pass

| What | Desk | Why it waits |
|---|---|---|
| Ride-page restructure (UX F6): next ride folded into When, one filled host button, the empty review and route asks in one section, About moved up | ux | 1,425 pages, the rides tests, and it interacts with item 6's ride grid. Its own pass, on the page that earns the clicks. |
| Breadcrumb rule (F8): one root per section, never leaving it, the h1 repeat dropped, `hubFor` preferring the ride's own city (6 rides), the event trail to its month, guide crumbs | ux | Four generators plus a hub-assignment change, which needs the hubs.json and redirect check. Pass 1 only makes crumbs look like links. |
| One next step at the foot of every page (F13, `CHROME.next()`) | ux | A new component. Pass 1's single link style puts the loose links on the gutter in one look meanwhile. |
| Phones: hide the header button while the bar shows (F10, phone half) | ux + motion | Needs `ridebar.js` plus CSS, and an iPhone check. |
| Fold and menu animation, map and route zoom on the token (motion #6 JS) | motion | Adds motion that screenshots can't score. Test it on Robert's iPhone in Pass 2. |
| The sign's one-time plate wipe (motion #4, optional) | motion | A pass that adds movement should be judged by itself. |
| Deleting 132 dead classes and the dead homepage JS (M12, motion #14) | system | Invisible. Its own commit next pass, so either revert stays clean. Pass 1 only fixes the stray `}` at `home.css:789` (it eats the next rule) and the stale "Creosote house" header comments. |
| Generator follow-ups M14 (`rideBtn()` emits `.btn`, `pbtn()` → `btn--sm`, `TOWNS.strip()` and the town `res-grid` as one function, the save mark in the sprite) | system | The aliases hold the look this pass. |
| Portrait 2:1 / 3:2 desktop crops (photo C1–C3) | photo | Superseded by D1. Revisit if Robert sends a wide picture of himself riding. |
| The faded contour art behind hub h1s (`rides.css:499`) and under the event poster | graphics-maps | Drawn art, not photographs. Its desk's call. |
| Color fields on inner pages (plaster, patina, pool rooms per section) | system + type | Needs a rule for which section gets which field. Pass 1 adds the one big field (the ending). |
| Calendar and riding row summary (the middot run cut off mid-phrase), "Details" at 12px grey | type + ux | It's a row redesign. |
| "Sign up" as the riding rows' button label | ux | Only with a sourced "registration is open" field. `reg_status` is free text today. |
| Homepage desktop composition below the first screen; `.s` on `--band` (D8); "Events" tile → "2027 calendar" (F17) | type + ux | With the naming rule and the homepage's own pass. |
| `/rides/` map state targets down to 1×2px | ux | Search and "Every state, as a list" are the way around; the map needs its own redesign. |
| "April 23 to 25" → "April 23–25" (§4 range rule) | editor | Copy style, not the studio's. |
| `templates/field-notes/_pillar-template.html` still carries the retired 10000 numeral and the old masked hero | editor + brand-ambassador | Outside the published folder; flagged so a copy never ships it. |

## For Robert

1. ~~**Which ride is "next"?**~~ **Answered (Robert, Oct 21): Tour de Palm Springs (Feb 6, 2027) is his next ride.** It
   goes first in `NEXT_RIDES`; every Ride with me opens its row on the riding page until Feb 6, then rolls to Center Ride
   Out. The homepage `#ride` section stays written for Center Ride Out (where the money goes, §5); its "Next up" was cut.
2. **The ride film on phones.** Your Oct 8 rule puts it edge to edge under the name. On TSR that puts when, where and
   pace on screen two. UX recommends facts first and the film under the buttons, on phones only. Kept as you have it.
3. **The long Instagram button** ("@TSR_THESATURDAYRIDE ON INSTAGRAM"). The system desk would shorten it to
   "Instagram ↗". It's your copy, so it's kept.
4. **`/cyclefor/`'s word cycle** turns forever. Moving content over five seconds needs a way to stop it (WCAG 2.2.2).
   One turn through the words, stopping on "you"? Kept for now.
5. **The footer's Mile updates column.** UX would fold it into Follow (one column, your note kept under Instagram).
   It's your Oct 9 column, so it's kept.
6. **The homepage asks "What do you cycle for?" twice within two phone screens** (the dark tile, then the sign in
   It always says cycling). Keep one? Which?
7. **Photos served ungraded (built this pass).** The inner-page photos lose the September high-key grade (lifted
   blacks, the cream duotone) to match the hero you chose clear and ungraded on Oct 5. If you want the grade back,
   it's one setting in `tools/grade.py`.
8. **Pictures the site needs** (photo editor's list):
   - A full-resolution export of the canal-path hero.
   - A wide (landscape) photo of you riding in Phoenix.
   - An OK or a no on `crew` (the sunset stop) and `people` (the finish line). Both are off the site this pass.
   - The South Mountain climb photo: is that rider you? Until we know, it runs as the view-only crop.
   - A still from TSR.
   - One photo per 2027 ride.
   - South Mountain at dawn and a McDowell loop for the Phoenix guide.
   - A tire or pump close-up for the guides.
9. **"Ride with me" in the header of a group-ride page** can read as "ride this ride with me." It's your label
   (Pass 36). Noted only.

---

# The build plan

## Who owns what (by file; no file has two builders)

**Builder A, the CSS.** Lead: `design-system`. A builds type-layout's, photo-editor's and motion-interaction's CSS
too, from their notes.
`cfc-site/chrome.css`, `home.css`, `styles.css`, `rides/rides.css`, `events/events.css`, `events/2027/calendar.css`,
`brief/brief.css`, `cyclefor/cyclefor.css`, `tonight/tonight.css`, `nov7/nov7.css`. Nothing else. `ride/ride.css` is
untouched.

**Builder B, the markup.** Lead: `ux-architect`. B builds photo-editor's registry and images and
motion-interaction's JS too.
- Generators: `scripts/chrome.js`, `scripts/build-home.js`, `tools/build-rides.js`, `scripts/build-events.js`,
  `scripts/build-calendar.js`, `scripts/build-brief.js`, `scripts/apply-chrome.py`, `scripts/apply-photos.js`.
- Photo system: `scripts/photos.js`, `tools/grade.py`.
- Behaviour JS: `cfc-site/chrome.js`, `home.js`, `ridebar.js`, `rides/ride.js`, `brief/brief.js`.
- Data: `data/ride-films.json`.
- Hand pages: `resources/`, `guides/` (hub and the 6 guides), `field-notes/` (hub, `phoenix/`,
  `south-mountain-climb/`), `journal/`.
- Images: `cfc-site/img/…`, `cfc-site/film/tsr-1b.*`.
- `tools/test/*` (only where markup changed on purpose), `CLAUDE.md`, and every generated file.

A and B work **at the same time** (no shared file), then B regenerates once, then A fits its CSS to the new markup.
Nobody hand-edits generated output.

## The CSS: one order of operations (A)

The two desks' rules reconciled:
- **Design-system:** merges only stick with layers.
- **Type-layout:** blocks go at the END of each sheet.

Both hold if "the end of the sheet" means **the last thing inside that sheet's layer**. Type-layout tested its blocks
appended after each sheet's own rules, and inside `@layer section` they still come after them, so they win the same
way. Three things change under layers, and the order below is built around them:

1. **Unlayered beats layered at any specificity.** An unlayered `h2{font-size:…}` would override every section-sheet
   h2 that is styled as a label (`.gr-filter-label`, `.cal-q`, `.fn-related h2`). So type-layout's **element rules
   go at the end of `@layer base`**, never unlayered. Its rules for the frame (tally line, footer) go unlayered after
   the frame.
2. **For `!important`, it's reversed:** a layered `!important` beats an unlayered one, and `base` beats `section`. So:
   - The reduced-motion guard goes **inside `@layer base`**, where nothing can outrank it.
   - `rides.css:823–824`'s `!important` borders on `.gr-route-nums` come out, or they beat the system's fact grid.
3. **Tokens in `@layer base` can still be re-pointed by a page's sheet.** `/tonight/` re-points `--line` on `:root`
   from its section sheet. So the one token block sits at the end of base and **never redeclares `--line`,
   `--line-d` or `--pad`**.

**`/chrome.css`, top to bottom:**
```
@layer base, section;                         ← first line
@font-face ×2                                 (unchanged)
@layer base {
  B1  today's base, in place: :root (old names) … type, .btn, .link, .field, .cta-row, .pledge base, the Pass 29
      type block; transition durations moved onto the motion tokens in place;
      the Pass 25 .ph block (295–325) REPLACED IN PLACE by photo-editor's clean .ph block (photo.md §A)
  B2  the one token block (:root): --s1…--s7, --top --gap --sec --band --col-gap, --fs-* and --measure,
      --line-s, --btn-h --btn-h-sm, --label, --t-color --t-move --t-open --ease          (not --line/--line-d/--pad)
  B3  type-layout's element rules: body, h1–h4, .lede, text-wrap, main.wrap padding-top
  B4  the reduced-motion guard (motion.md §6), replacing 279–282
}
the frame, unlayered, in place: nav, menu, tally line, .pledge-line, footer, ridebar, .theme-dark
/* Studio pass 1 — unlayered, in this order */
S1  focus: :focus-visible on --ring; the dark grounds that flip it to plaster (the union of system and motion:
    .pledge .foot .ridebar .help-bar .gr-next .gr-banner .gr-jump .res-door--now .theme-dark .cal-door--you
    .gr-kind--ink .s--creosote .dir-report:not(.dir-report--compact)); .help-bar's inset ring.
    Unlayered so no section sheet can hide focus.
S2  the system, M2–M11 (system.md "The CSS"): every transition on the motion tokens, no raw durations;
    M10 rewritten per D7; M11's caption line dropped (photo owns it); no `.pledge ~ .fn-back` patch
S3  type-layout's frame rules: .tally-line (--fs-small), .foot-line, .foot-col a balance, the footer on 12 columns
    at ≥1024; R3
S4  motion and UX frame rules: tap highlight with the press states, scroll-padding top and bottom, nav links
    44px, .menu-list current state, menu sub-labels 13px, the desktop header button as a line (D4)
```

**Each section sheet** (`rides`, `events`, `calendar`, `styles`, `brief`, `cyclefor`, `tonight`):
```
@layer section {
  today's file, with in-place edits only:
    • masks off
    • transitions onto the tokens
    • bare :hover moved into (hover:hover) (motion #7's list)
    • the per-element rings: .gr-film-play and the US map in rides.css; events.css:285 deleted
    • decorative motion off: gr-rise, .fn-card img zoom, the ticker
    • /tonight/: the noise, the shadows and the tilt deleted
    • rides.css:590 overflow-x:clip
    • rides.css:823–824 !important out
  LAST: that sheet's type-layout block, minus the lines the system owns (below), then B's requests for that sheet
}
```
The wrapped copies in `scratchpad/system/layered/` match today's section sheets (checked Oct 21). Use them for the
wrapping step. That folder's `chrome.css` already has the system block and the old `.ph` in it, so build chrome.css
by hand to the order above.

**`/home.css`** (not layered; the homepage loads nothing else):
- **First:** the stray `}` at 789.
- **In place:**
  - the clean `.ph` block replaces 874–904;
  - masks off at 1099, 1247 and 1279;
  - the reduced-motion guard replaces 783–787;
  - transitions onto the tokens.
- **At the end, in this order:**
  1. the token mirror (B2 without `--sec` / `--band`, D8);
  2. focus and ring;
  3. the system's home mirror;
  4. type-layout's home block without the two `.s` lines;
  5. motion's home rules (the sign reserves its space, the film disc);
  6. item 13 (the desktop first screen);
  7. R1, R2.

**`/nov7/nov7.css`** stays unlayered, as the system tested it. Changes:
- masks off (6, 57);
- the film disc has no scale bounce, its ring sits inside, and it leaves the tab order while playing;
- `.lp-tile` transitions on the tokens.

**One owner per property: the lines A drops from the desks' blocks**

| Owner | Owns | Dropped from the others |
|---|---|---|
| system | component look and states: button, link, pick, field, door, row, fold, fact grid, the closing field, crumbs | Type-layout's two `details.gr-fold:not(.gr-first)…` lines and `.gr-fold>summary` / `.more-f summary` / `.dir-fold>summary` label sizes; its `.crumbs` weights; its `.facts>div` / `.gr-fact` `align-content` (duplicate); its `.pledge` padding, border and `main:has(.pledge)~.foot`. Motion's powder-rose press and nav hover, its bruise-filled door press, its 4px field offset. |
| type-layout | sizes, line heights, measure, spacing tokens, grid placement | The system's `.pledge` margin and padding use type-layout's `--sec` / `--gap`. |
| photo-editor | `.ph`, figure crops, captions, every photo mask | Type-layout's `.ph figcaption` size and padding; the system's M11 caption rule. |
| motion | durations, easing, reduced motion, scroll padding, film discs, tap highlight | Its per-selector reduced-motion rules (motion #6's list) are now redundant; delete them where A is already editing that line, otherwise leave them for M12. |

## The markup (B), then the one regeneration

**B1 — Photos.**
- `tools/grade.py`: the `clean` look, wide crops in the MANIFEST.
- Regrade the Pass 25 keys plus the new crops, bump to `-2`, AVIF and WebP beside each.
- `scripts/photos.js`: `wide` sources, auto `ph--wide`, new keys for the swaps and cards.
- `scripts/apply-photos.js`: the regex fix.
- New files from `photo/crops/` and the TSR poster. Check every new placement at 1:1.

**B2 — Generators.**
- `scripts/chrome.js`:
  - `head()` versions `/chrome.css` and passes one `CSS_V` to every generator and to `apply-chrome.py`;
  - HEADER (nav list, Towns, 988 link, the tally line as a link with no dot);
  - FOOTER (Brief a ride in, Events out, 988 link);
  - `pledge()` with two actions;
  - `NEXT_RIDES` hashes;
  - `RIDE_BAR` gets `data-until`, `ridebar.js?v=39`.
- `build-home.js`: items 9, 16 and 17, and the `home.css?v=` bump.
- `build-rides.js`: items 8, 9, 14 and 17, and the `/rides/about/` note above the closing block (1580).
- `build-events.js`: items 8 and 15.
- `build-calendar.js`: items 8 and 12.
- `build-brief.js`: the sample shown, `V` bumped.
- `apply-chrome.py`:
  - back links and notes above the closing block (28 hand pages; after B5, nothing in `<main>` follows
    `section.pledge` on any page);
  - the resources crisis order;
  - `CSS_V`.

**B3 — Behaviour JS.**
- `cfc-site/chrome.js`: `SECTION`, `.menu-list` `aria-current`, the touchstart listener.
- `home.js`: `rollTo`, the write-up link on the log row, today's Play / Pause, touchstart.
- `ridebar.js`: the hash in `here`, `data-until`.
- `rides/ride.js:84`: one time format.
- `brief/brief.js`: reduced-motion scroll.

**B4 — Hand pages.**
- `/resources/`: crisis order.
- `/guides/`:
  - stage anchors;
  - the From the road row;
  - the hero `<picture>`;
  - the cards.
- The 6 guides' lists and footnote spacing.
- `/field-notes/` and `/journal/` cards.
- The `/field-notes/phoenix/` hero.
- The south-mountain figure (through apply-photos).

Words unchanged everywhere.

**B5 — The one regeneration**, after B1–B4, in this order. `build-brief.js` wears the chrome too and isn't in
§2's list:
```
node scripts/build-home.js
node tools/build-rides.js            # runs build-signals.js last
node scripts/build-events.js
node scripts/build-calendar.js
node scripts/build-brief.js
node scripts/apply-photos.js
python3 scripts/apply-chrome.py
node --test tools/test/*.test.js && node tools/validate-rides.js
```
Then:
- **hubs.json.** Diff `cfc-site/rides/hubs.json` against `origin/main`. Expect nothing; Pass 1 doesn't touch hub
  logic, so stop if a hub moved.
- **Stylesheet links.** `grep -rL` for a bare `chrome.css"` link: every page must carry `CSS_V`.
- **Tests.** Update only assertions whose markup changed on purpose. Never loosen a rule test.

**B6 — CLAUDE.md**, last, with A's facts:
- §3:
  - the figure rule (clean edge, edge to edge on phones, on the grid on desktop, no mask, fade, wash or grade);
  - the layer rule for sheets;
  - the new tokens (`--line-s`, `--ring`, the space and type scale, the motion tokens);
  - the footer is drained pool under one closing field;
  - `--dust-deep` is `#687F7C`.
- §2: the regeneration order with `build-brief.js` and `apply-photos.js`, and `CSS_V`.
- §1: the Ride with me hrefs.
- §10: photos served ungraded.
- The changelog line.

### Requests from B to A (A builds these in its own sheets, in the order above)

- **R1, `home.css`.** "Read the last ride" (`.sign-acts`) shows on phones as a quiet link under the finder tiles.
  The tiles stay on the first screen at 375×667 and 360×640.
- **R2, `home.css`.** Today's film gets a caption line styled like the reel's Play / Pause line.
- **R3, `chrome.css` (S3).** The tally line holds a link:
  - it inherits the line's color, with a patina hairline underline and a 44px hit area;
  - the `.dot` rule goes.
- **R4, `styles.css`.** On `/resources/`, the crisis block under the h1 sits on the grid, with Trevor above the 988
  bar at 390×844.
- **R5, `calendar.css`.** On Robert's riding list, the links row at the top of an opened row: spacing and separation
  from the facts.
- **R6, `rides.css`.** `/rides/`'s jump chips sit inside the hero, under the search: one wrapping row of 44px picks.
- **R7, `rides.css`.** `/find-a-ride/` has 8 kinds (D9):
  - desktop 4×2 on columns 1–8, with the photo in 9–12;
  - phones two across.
- **R8, `events.css`.** The event page's new order (h1 → date → sign-up → poster → lede → facts) on the grid, with
  facts in columns 9–12.

B's markup, as built (for the fit-up, step 5):
- R5: the opened row on Robert's list is `.det.det--mine`, its first child the `p.det-links` (above `dl.facts`). On every
  other calendar page the links stay after the notes.
- R6: `/rides/`'s `p.gr-jumpcities` is inside `.gr-hero .wrap`, between `#gr-form` and `#gr-status`; "Outside the US" is
  its last `a.gr-chip` (no mark). The old `p.gr-hero-alt` is gone from `/rides/` (hub.js still adds it on the hubs).
- R8: `article.event` now holds, in order, `h1`, `p.date-line`, `p.date-note`, `.ev-signup`, then `section.ev-poster`
  (date and town only: `.ev-poster-info` is gone), the hidden h2, `p.lede`, `dl.facts`. The eyebrow is gone; its kind
  is the first fact row ("Type"). The poster used to sit outside the article, before it.
- R1: "Read the last ride" is still `.sign-acts > a.link.link--bone`, now to `/rides/<slug>/#robert`.
- R2: today's film has `figcaption.road-film-cap.today-film-cap` with `button.road-film-btn.today-film-btn#todayBtn`
  (Play / Pause) and `.road-film-len` "0:03", the reel's markup.
- R3: `.tally-line .wrap > a[href="/#road"]` wraps the number and the words; the `.dot` span is gone from the markup.
- R4: `/resources/`: h1, then `section.res-doors-wrap` (the three doors, Right now first), then `div.wrap.res-intro`
  holding the `p.fn-pillar-intro` and the `.fn-line` that used to sit in the header.

### More requests from B to A (new, from the build)

- **R9, `styles.css`.** The guide, field-note and journal cards carry a place · month line under the picture:
  `.fn-card > span.fn-card-where` (right after the `figure`). It needs the caption look (13px / 700 gunmetal, D6).
- **R10, `styles.css`.** `/guides/` "From the road": his write-up is a `p.fn-more.fn-road-note > a.link` ("My first TSR")
  between the "From the road" label and the cards. Spacing only (it reuses `.fn-more` and `.link`).
- **R11, `styles.css`.** The guide hero and the Phoenix field-notes hero are `figure.fn-pillar-photo > picture > img`
  now (AVIF / WebP sources): the `.fn-pillar-photo img` rules need `picture` to fill the figure
  (`.fn-pillar-photo picture{display:block;width:100%;height:100%}`).
- **R12, `home.css`.** The homepage tally line (`.tally-line--home`, hidden) and the menu now carry links: the menu's
  "988 call or text" is `.menu-foot a[href="tel:988"]`, the footer's `.foot-crisis a[href="tel:988"]` (inner pages and
  home). They want the same hairline-underlined link as the Trevor number beside them.
- **R13, `rides.css`.** The ride page's tag row can now hold two link chips: "I rode it" (`a.gr-tag.gr-tag-rev`
  to `#robert`) before the reviews chip. Gap only.

### Sequence and commits (one PR)

| Step | Who | What | Commit |
|---|---|---|---|
| 1 | A | Wrap the sheets in layers, nothing else. Diff computed styles on the 14 pages: only the closing heading's leaked 33px on rides directory pages may move (system bug 6). | `css: cascade layers (no-op)` |
| 2 | A | B1–B4 in base, S1–S4, the section sheets, home.css, nov7.css, R1–R8 | `css: studio pass 1 system, type, photo, motion` |
| 2′ | B, in parallel | B1 photos | `photos: clean grade, swaps, wide sources` |
| 3′ | B, in parallel | B2–B4 | `markup: nav, ending, write-up, Ride with me, events, crisis order` |
| 4 | B | B5 regeneration | `rebuild: studio pass 1` (output only) |
| 5 | A | **Fit-up:** shoot the regenerated pages and fix only A's sheets against the new markup (R5–R8, the ride grid, the footer columns). No regeneration needed. | `css: fit to the rebuilt pages` |
| 6 | B | B6 CLAUDE.md | `docs: studio pass 1 rules` |

The PR description carries the aim, the before / after scores, the lab table, the board for Robert's phone, For
Robert, and the Search Lab line (§7). Write it in that line's format: Guides in the header of 2,500 pages should lift
`/guides/` impressions while Field notes (still in the footer) holds, measured in Search Console impressions and
clicks for `/guides/` and `/field-notes/`. Read it 2 and 4 weeks after the merge.

## The check, then the sign-off

Shoot again at 390, 820, 1024 and 1440:
- the critic's 14 pages;
- `/tonight/`, `/rides/lgbtq/`, `/field-notes/`, a calendar month, a town sub-page, a resources age page, `/404`;
- the homepage at 1366×768;
- `/nov7/` at 375×548.

Then `design-critic` writes `critic-after.md` (after shots only), `usability-lab` writes `lab-after.md`, and
`brand-ambassador` and `access-speed` read the result.

Ship only if all of these hold:
- **Score.** The critic's total rose and **no line dropped**. Watch "His".
- **Lab.** No task got slower; CLS is 0 on every page.
- **What must survive, intact:**
  - the homepage's phone first screen at 390×844, 375×667, 360×640 and 430×932: everything down to the finder tiles,
    pixel-identical apart from R1 and the sign's reserved space;
  - the desktop stencil, the blank and his face;
  - the TSR route kit and "I rode it";
  - the guide's reading column;
  - the 988 bar on `/resources/`;
  - `/nov7/`'s four buttons on a 375×548 screen.
- **Floor.** No text under 12px. No new tap target under 44px on the tested paths. No horizontal scroll. Every focus
  ring at 3:1 or better on its ground. Nothing moves under reduced motion.
- **Photos.** No vehicle, no face but Robert's, a place · month caption on every one, a new file number on every
  changed picture.
- **Identity.** No new color, tint, gradient, font, mark, icon style or radius. No rose on a hover or press. No words
  written for him.

## Sign-off

Pending the after shots.
