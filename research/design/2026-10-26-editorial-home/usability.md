# Usability lab: the editorial homepage, live vs proposed (Tue Oct 27, 2026)

The six core tasks in `research/design/STUDIO.md`, run as scripted Playwright paths from a cold load of the homepage. Each path
finds its target by the words a stranger reads. Nothing on the site was changed.

- **Live:** the live homepage files (byte-identical to `origin/main`: `index.html`, `home.css`, `home.js`, `chrome.css`,
  `chrome.js`, `ridebar.js`).
- **Proposed:** `feat/home-editorial-film` at `f1c1f0e382`.
- **Setup:**
  - An in-process `http.server` started by the same Python script that drives Playwright.
  - `/api/*` returns 404, so both pages keep their baked numbers.
  - Every request that leaves 127.0.0.1 is blocked. None were attempted across 42 runs.
  - Reduced motion is on. A second run with it off covers the film, the Pause button and shifts.
  - Phone: 390×844, `is_mobile`, touch, 2x. Desktop: 1440×900. Spot checks at 375×667, 360×640 and 430×932.
- **Downstream pages:** the live extract only has the homepage. After the tap that leaves the homepage, both columns run on
  the branch's inner pages. The branch only bumps their stylesheet version and data, and `chrome.css` is unchanged, so the
  **homepage leg is the whole difference**.
- **Scripts:** `/tmp/claude-0/-home-claude/42a8e16b-6128-5358-8471-887b1648b6bf/scratchpad/labkit/` (`tasks.py`,
  `affordance.py`, `pausekey.py`, `evid.py`).
- **Screenshots:** `/tmp/claude-0/-home-claude/42a8e16b-6128-5358-8471-887b1648b6bf/scratchpad/lab/`. Shot names below are
  in that folder. None are in the repo.
- **Taps** = taps or clicks from a cold load to the answer.
- **Screens** = scrolling needed on each page (scrollY ÷ viewport height), added up across pages. It runs from where each
  page opens to where the target is whole and not under the Ride with me bar.
- The best route is the one with the fewest taps + screens. The other routes are listed under each task.

## First: Task 4 got slower. That's a block.

**"Read his latest ride write-up" went from 0 screens to 5.1 screens on a phone and 3.6 on desktop.** The taps are the same
(1).

| Read the last ride | live | proposed |
|---|---|---|
| 390: y position | 810 (first screen) | 5,046 (6th screen) |
| 1440: y position | 758 (first screen) | 4,101 (5th screen) |

- It now sits under "The last rides." in `#road`. Nothing on the proposed first screen or in the menu leads to a write-up.
  - The other way in is the menu → Guides → "My first TSR": 3 taps, 8.1 screens on a phone.
  - At 1440, header Guides → "My first TSR" takes 2 taps and 3.1 screens. That's still worse than the scroll (4.6 against 5.1).
- Shots: `live-390-t4-words-read-the-las-02-tap-read-the-last-ride.png`,
  `proposed-390-t4-words-read-the-las-02-tap-read-the-last-ride.png`,
  `proposed-1440-t4-words-read-the-las-02-tap-read-the-last-ride.png`.
- The art director's sign-off already calls this "slower by construction" and sends it to Robert as a decision. By the
  studio bar (no core task gets slower) it blocks the pass until Robert rules on it, or until a way to the write-up is back
  above the fold.

The other five tasks take the same taps and the same screens.

## Results: live → proposed

| # | Task | Width | Taps | Screens | First element that starts it (y, box) | On 1st screen | Smallest tap on the path (box, hit area) | Verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | What is this, whose is it | 390 | 0 → 0 | 0 → 0 | "I'm Robert. In 2027 I ride 10,000 miles…" y 539 → 532 | yes → yes | — | same |
| 1 | | 1440 | 0 → 0 | 0 → 0 | same line, y 521 → 534 | yes → yes | — | same |
| 2 | Group ride in Phoenix | 390 | 2 → 2 | 0 → 0 | "Group rides 1,425 worldwide" y 734, 174×64 → "Find a group ride" y 776, 138×44 (hit 139×63) | yes → yes | 122×44 "Phoenix home" on /rides/ → same | same |
| 2 | | 1440 | 2 → 2 | 0 → 0 | "Group rides" tile y 649, 163×93 → "Find a group ride" y 808, 138×44 | yes → yes | 122×44 → same | same |
| 3 | Next ride, how to ride it | 390 | 1 → 1 | 0 → 0 | Ride with me tile y 660, 357×64 → y 687, 357×77 | yes → yes (date on the tile, "Event site" on landing) | 357×64 → 357×77 | same |
| 3 | | 1440 | 1 → 1 | 0 → 0 | header RIDE WITH ME y 10, 124×44 → tile y 732, 410×64 | yes → yes | 124×44 → 410×64 | same |
| 4 | His latest write-up | 390 | 1 → 1 | **0 → 5.1** | "Read the last ride" y 810 → **5,046** | **yes → no** | 143×25 (hit 144×44) → 143×27 (hit 144×45) | **slower** |
| 4 | | 1440 | 1 → 1 | **0 → 3.6** | "Read the last ride" y 758 → **4,101** | **yes → no** | 143×27 (hit 143×46) → same | **slower** |
| 5 | Fundraising-minimum guide | 390 | 3 → 3 | 3.1 → 3.1 | menu (44×44) → Guides → the guide card | via menu → via menu | 44×44 menu → same | same |
| 5 | | 1440 | 2 → 2 | 1.5 → 1.5 | header Guides y 12, 47×40 → y 7, 47×48 | yes → yes | 47×40 (hit 48×41) → 47×48 (hit 48×49) | same |
| 6 | Help right now (988 + Trevor) | 390 | 1 → 1 | 0 → 0 | menu: its foot shows 988 and Trevor (2 taps to /resources/, both) | via menu → via menu | 44×44 → same | same |
| 6 | | 1440 | 1 → 1 | 0 → 0 | header Resources y 12, 71×40 → y 7, 71×48 | yes → yes | 71×40 → 71×48 | same |

Taps + screens, live → proposed:

| Width | T1 | T2 | T3 | T4 | T5 | T6 |
|---|---|---|---|---|---|---|
| 390 | 0 → 0 | 2 → 2 | 1 → 1 | **1.0 → 6.1** | 6.1 → 6.1 | 1 → 1 |
| 1440 | 0 → 0 | 2 → 2 | 1 → 1 | **1.0 → 4.6** | 3.5 → 3.5 | 1 → 1 |

Layout shift (CLS) was 0.000 on every page of every path in both columns.

## Per task

### 1. What is this site, and whose is it?
- Both versions answer it on the first screen at every size tested. The line is "I'm Robert. In 2027 I ride 10,000 miles, all
  on the bike." plus his ride line.
  - Shots: `proposed-390-t1-first-screen-01-home-first-screen.png`, `proposed-1440-t1-first-screen-01-home-first-screen.png`
    and the `live-…` pair.
- Unchanged: the name "Cycle for Change" is never in readable words on the first screen. The stencil spells CYCLE FOR plus a
  blank plate.
  - The proposed page also hides the small header mark over the film (`visibility:hidden` until the nav turns solid). Live
    showed it, but as the same CYCLE FOR mark, not the name.

### 2. Find a group ride in Phoenix this week
- Same path in both: a homepage link → /rides/ → "Phoenix home" (first screen) → the Phoenix hub. Its first row, "Phoenix
  Downtempo Ride, Every Monday, 8:00 pm", is on the first screen.
- Proposed: the way in is the quiet "Find a group ride" link (138×44, hit area 139×63) instead of the 174×64 tile. It's
  still on the first screen at every phone size, with its bottom at 820/844, 643/667, 616/640 and 908/932.
- Other routes: menu → Find a ride → Group ride → Phoenix takes 4 taps in both. At 1440, header "Find a ride" takes 3 taps
  in both.
- Shots: `proposed-390-t2-words-group-ride-o-02-tap-find-a-group-ride.png` and `…-06-answer-new-to-group-rides-phoe.png`.

### 3. When is Robert's next ride, and how do I ride it with him?
- The date and ride name ("Feb 6, Tour de Palm Springs, Palm Springs, CA") are on the first screen in both.
- One tap opens the riding page on that ride's row, with "Event site" (121×48) on the screen it lands on.
- At 1440 the proposed header's Ride with me button is hidden over the film. The hero tile does the job and is bigger (410×64).
- Shots: `proposed-390-t3-words-ride-with-me-02-tap-feb-6-ride-with-me-tour-de-p.png`,
  `proposed-390-t3-words-ride-with-me-04-answer-event-site.png`.

### 4. Read his latest ride write-up
- Slower. See the top of this report.
- Also new, from where the link now sits: "Read the last ride" is right under the log.
  - The log's top row is Sun Oct 25, "Somo sunday", 61.7 mi.
  - The link opens the Oct 10 TSR write-up.
  - The words point at the newest ride; the page that opens is two weeks older.
  - Live had the same link, but on the first screen and away from the log, so the mismatch didn't show.
  - Shot: `proposed-390-t4-words-read-the-las-02-tap-read-the-last-ride.png`.

### 5. How a charity ride's fundraising minimum works
- Identical, because the homepage leg is the same: menu (390) or header Guides (1440) → /guides/ → "How to hit your
  fundraising minimum".
  - The guide card is 3.1 screens down at 390 and 1.5 at 1440.
  - The guide's lede ("The minimum looks scary…") is on the first screen of the guide.
- The homepage's own "All 22 guides… hitting your…" card is far down in both.
  - 390: y 9,441 → 10,136.
  - 1440: y 9,094 → 8,360.
- At 1440 the header links are taller: 40 → 48 px.

### 6. Get help right now
- 390: one tap on the menu shows "If it's now: 988 call or text, any hour / Trevor Project 1-866-488-7386" in both. It's
  two taps to /resources/, where Trevor is on the first screen.
- 1440: header Resources, 1 tap in both.
- Without a tap, the proposed page gets there sooner. 988 and Trevor first appear in the orgs room on patina:
  - 390: footer at y 10,774 (11.8 screens) → orgs room at y 7,783 (8.4 screens).
  - 1440: 10.6 → 6.6 screens.
- Unchanged, for the record: "or text START to 678-678" is plain text everywhere it appears. That's the homepage, the menu's
  line and /resources/. The 988 and Trevor numbers next to it are tap-to-call.
- Shots: `proposed-390-t6-menu-shows-988-tre-03-answer-trevor-project.png`, `proposed-390-orgs-help.png`.

## The first screen

Smallest tap target on the first screen, box (hit area):

| Size | Live | Proposed |
|---|---|---|
| 390×844 | "Read the last ride" 143×25 (hit 144×44) | "Open menu" 44×44 (hit 45×45). Every box on the first screen is ≥44. |
| 1440×900 | header links 40 tall, "Towns" 43×40 (hit 44×41) | "Towns" 43×48 (hit 44×49) |

- Proposed first screen at 390: Open menu, Ride with me 357×77, Find a group ride 138×44 (hit 139×63) and the film button
  48×48. That's four targets; live had six.
- The Events tile ("640 in 2027") moved off the first screen to the numbers strip: 390 y 1,050; 1440 y 940, just under the
  fold. It isn't a core task.
- Spot checks (`proposed-375x667-fs-01-first-screen.png`, `proposed-360x640-fs-01-first-screen.png`,
  `proposed-430x932-fs-01-first-screen.png`): who and what, the line, Ride with me, Find a group ride and the film button are
  all whole on the first screen at 375×667, 360×640 and 430×932.

## Keyboard (Tab from the top)

| | Live 390 | Proposed 390 | Live 1440 | Proposed 1440 |
|---|---|---|---|---|
| Ride with me | Tab 4 (tile) | **Tab 3** (tile) | Tab 8 (header), Tab 10 (tile) | **Tab 7** (tile) |
| Film Pause / Play | — | Tab 5 | — | Tab 9 |

- Proposed order at 390: Skip, Open menu, Ride with me, Find a group ride, the film button, "on Strava", 1,423, 640.
- At 1440 the five nav links come before Ride with me.
- The order matches what you see: the film button sits bottom right of the hero, after its two links.
- The header mark and header Ride with me button are skipped while they're hidden over the film, so there's no invisible
  focus stop.
- Focus ring: a 2px plaster outline on the hero, visible in `proposed-390-keys-01-tab-3-heroride.png` and
  `proposed-1440-keys-motion-02-tab-9-heropause.png`.
- Space and Enter both stop and restart the film. With reduced motion on, the button reads "Play the film" and the still
  stays.

**One problem: tabbing past Ride with me jumps the hero.**
- Tab 4 at 390 ("Find a group ride") scrolls the page **376 px** (0.45 screen), though the link is already whole on screen.
  At 1440, Tab 8 scrolls 390 px. The stencil goes off the top (`proposed-390-keys-02-tab-5-heropause.png`).
- Cause: `chrome.css` sets `scroll-padding-bottom` to 76px under 900 and 96px at 900+, to keep focus clear of the Ride with
  me bar. That space is reserved on the first screen too, where the bar isn't showing.
  - The hero's bottom row falls inside that band: "Find a group ride" at 776–820 and the film button at 772–820 (390);
    808–852 and 804–852 (1440).
- Live has the same rule. It gives a 38px nudge at Tab 5 and a 366px jump at Tab 7 ("Read the last ride", 810–834). On the
  proposed page it comes one stop sooner and lands on the film's own control.
- Keyboard only. Touch is unaffected.

For the access desk: the film button flips its label ("Play the film" / "Pause the film") *and* `aria-pressed`. A screen
reader hears "Play the film, toggle button, pressed" while it's stopped. One of the two would do.

## Anything that moves under the thumb
- CLS was 0.000 on every homepage load in both versions: reduced motion on and off, and with the film playing (VP9 plays in
  headless Chromium).
- With the film playing, the first-screen targets sat at the same y at load, +2.5 s and +5 s.
- One small movement at 1440: when the film starts, about 1.5 s after load, the button's label changes from "Play the film"
  to "Pause the film".
  - The button widens from 131 to 140 px, and its left edge moves 9 px (x 1213 → 1204).
  - It moves back on every press.
  - At 390 it's an icon-only 48×48 and doesn't move.
- The riding-page landing shift seen in studio pass 1 (intermittent, about 1 load in 4) wasn't re-tested with repeat loads.
  It's the same page in both columns.

## Looks tappable and isn't, or doesn't do what it says
- **New, ≥760 px: the 2027 map's 13 numbered dots.** They're 28×28 dark discs that read as map markers.
  - They are inert `<span>`s inside an `aria-hidden` figure. Clicking dot 1 did nothing.
  - The build's own comment says "the dots and the rows open the ride on the riding page". Only the rows do.
  - The map is hidden under 760 px.
  - Shot: `proposed-1440-year-map.png`.
- **New by placement:** "Read the last ride" under a log topped by a different, newer ride (Task 4 above).
- **Unchanged:** the rose plates "me · one·n·ten · change" under "It always says cycling." read as chips and are plain text.
  They're at y 2,025 on the proposed page (390) and y 4,697 on live. Shot: `proposed-390-plates.png`.
- **Note, within the house rule:** in the numbers strip, "4,273 training miles…" has the same rose dash, numeral and label
  as the two link cells next to it.
  - The link cells are "1,423 group rides worldwide →" and "640 events in 2027 →", 400×160 at 1440.
  - Only the 13px arrow tells a link from a fact. The arrow is the house's link affordance (CLAUDE.md §3), so this isn't a
    finding.
  - Shot: `proposed-1440-strip.png`.
- No link in `<main>` on the proposed page lacks an underline, an arrow, a fill or a border, except the footer columns.
  Those look the same as on live. Crops: `aff/`. Data: `results-aff.json`.

## Verdict per task
1. What is this, whose: **same**.
2. Group ride in Phoenix: **same** (2 taps, 0 screens).
3. Next ride and how to ride it: **same** (1 tap, 0 screens). Ride with me is one Tab sooner.
4. Latest write-up: **slower**. 0 → 5.1 screens at 390 and 0 → 3.6 at 1440, both at 1 tap. **This blocks the pass until
   Robert decides it.**
5. Fundraising-minimum guide: **same**.
6. Help right now: **same** by taps (1). Scrolling the homepage without a tap, it's faster.
