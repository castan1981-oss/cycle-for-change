# Usability lab, before: the staged editorial homepage (Tue Oct 27, 2026)

Pass `2026-10-27-cadence-final`, homepage only. This is the baseline the pass gets measured against.

- **What was measured:** `feat/home-editorial-film` at `c796bdf7e2` (hero v9), PR #215, as built in `cfc-site/`.
  - The tree was clean before and after the runs. `index.html` was last written at 06:31, `home.css`, `home.js` and
    `chrome.css` at 01:52.
  - Nothing on the site was changed.
- **Setup:**
  - An in-process `http.server`, started by the same Python script that drives Playwright.
  - `/api/*` and `/.netlify/*` return 404. `chrome.js` asks for `/api/strava` and then `/.netlify/functions/strava` on every
    load. Both get a 404, so the tally line shows "—" and the baked 4,273 stays. That's expected.
  - Every request that leaves 127.0.0.1 is blocked. None were attempted. No Strava endpoint was called.
  - Reduced motion is on. A second run with it off covers the film and layout shift.
  - Phone: 390×844, `is_mobile`, touch, 2x. Desktop: 1440×900. Spot checks at 375×667, 360×640 and 430×932.
- **Method:**
  - Each task starts from a cold load of `/`.
  - The script finds each target by the words a stranger reads, then taps it with touch on phones or clicks it on desktop.
  - **Screens** = scrollY ÷ viewport height, added up across the pages on the path. It runs until the target is whole
    on screen and not under the Ride with me bar.
  - **Smallest target** = the bounding box, with the real hit area in brackets, measured with `elementFromPoint`.
- **Scripts:** `/tmp/claude-0/-home-claude/42a8e16b-6128-5358-8471-887b1648b6bf/scratchpad/labkit-cf/`
- **Screenshots:** every shot named below is in
  `/tmp/claude-0/-home-claude/42a8e16b-6128-5358-8471-887b1648b6bf/scratchpad/pass/lab-before/`. None are in the repo.
  - Section shots are in `sec/`. Affordance crops are in `aff/`.
- **Check against the earlier run:** every task's taps and screens match the Oct 27 01:51 lab at `f1c1f0e382` exactly.
  The v9 hero recut didn't move any task.

## First

1. **Task 4 (his latest write-up) is the slow one, and it's the baseline Cadence's note 1 is aimed at.**
   - It takes 1 tap at both sizes, but 5.09 screens of scrolling at 390 and 3.60 at 1440.
   - "Read the last ride" sits at y 5,046 (screen 6) at 390, and y 4,101 at 1440.
   - Nothing on the first screen or in the menu leads to a write-up.
2. **On phones, a tap on "988 call or text" in the orgs room calls the Trevor Project.**
   - This is broken, not slower. Details are under "Broken" below.

## 390×844

| # | Task | Taps | Screens | On 1st screen | Smallest target on the path | Problems (shot) |
|---|---|---|---|---|---|---|
| 1 | What is this, whose is it | 0 | 0 | yes: "I'm Robert. In 2027 I ride 10,000 miles, all on the bike." (y 532–581) and his line (y 597–647) | none (no tap) | The name "Cycle for Change" is never in readable words on the first screen. The h1 is the stencil plus a hidden span. (`before-390-t1-first-screen-02-answer-i-m-robert-in-2027-i-ri.png`) |
| 2 | Group ride in Phoenix this week | 2 | 0 | yes: "Find a group ride" (y 776–820) | "Phoenix home" on /rides/, 122×44 (123×45) | None. The Phoenix hub's first row, "Phoenix Downtempo Ride, Every Monday", is on its first screen. The other route, menu → Find a ride → Group ride → Phoenix, takes 4 taps and 0 screens. (`before-390-t2-words-group-ride-o-02-tap-find-a-group-ride.png`, `…-06-answer-new-to-group-rides-phoe.png`) |
| 3 | Robert's next ride, and how to ride it | 1 | 0 | yes: the Ride with me tile shows "Feb 6, Tour de Palm Springs, Palm Springs, CA" (y 687–764) | the tile, 357×77 (358×77). On landing, "Event site" is 121×48. | None. The riding page opens on the ride's row with "Event site" on screen. (`before-390-t3-words-ride-with-me-02-tap-feb-6-ride-with-me-tour-de-p.png`, `…-04-answer-event-site.png`) |
| 4 | His latest ride write-up | 1 | **5.09** | **no** | "Read the last ride", 143×27 (144×45) | Slow (see "First"). The link sits under a log whose top row is Sun Oct 25, but it opens the Oct 10 TSR write-up. That's the only write-up in `data/ride-notes.json`, so the target is right, but the placement makes the words read as the Oct 25 ride. Other route: menu → Guides → "My first TSR" takes 3 taps and 8.08 screens. (`before-390-t4-words-read-the-las-02-tap-read-the-last-ride.png`, `…-04-answer-i-rode-it.png`, `before-390-t4-menu-guides-my-fir-05-tap-my-first-tsr.png`) |
| 5 | How a charity ride's fundraising minimum works | 3 | 3.13 | via the menu | "Open menu", 44×44 (45×45) | The guide card on /guides/ is 3.1 screens down, and the guide's lede is on its first screen. The homepage's own way in, the "All 22 guides" row at y 10,136, takes 2 taps and 14.32 screens, and that row doesn't look like a link (see "Looks tappable"). (`before-390-t5-menu-guides-05-tap-charity-rides-how-to-hit-you.png`, `before-390-t5-words-guides-fundr-02-tap-all-22-guides-your-first-cha.png`) |
| 6 | Get help right now | 1 | 0 | via the menu: its foot shows "988 call or text" and "Trevor Project 1-866-488-7386" | "Open menu", 44×44 (45×45) | Menu → Resources takes 2 taps and 0 screens, and Trevor is on the first screen of /resources/. Scrolling the homepage without a tap reaches 988 and Trevor in the orgs room after 8.36 screens (y 7,783). There, a tap on 988 calls Trevor (see "Broken"). (`before-390-t6-menu-shows-988-tre-03-answer-trevor-project.png`, `before-390-t6-scroll-the-homepag-02-answer-988.png`) |

## 1440×900

| # | Task | Taps | Screens | On 1st screen | Smallest target on the path | Problems (shot) |
|---|---|---|---|---|---|---|
| 1 | What is this, whose is it | 0 | 0 | yes: the intro at y 534–620 and the line at y 636–692 | none (no tap) | Same as 390: the name isn't in readable words. (`before-1440-t1-first-screen-02-answer-i-m-robert-in-2027-i-ri.png`) |
| 2 | Group ride in Phoenix this week | 2 | 0 | yes: "Find a group ride" (y 808–852) | "Phoenix home", 122×44 (122×45) | None. Header "Find a ride" → Group ride → Phoenix takes 3 taps and 0 screens. (`before-1440-t2-words-group-ride-o-02-tap-find-a-group-ride.png`) |
| 3 | Robert's next ride, and how to ride it | 1 | 0 | yes: the tile at y 732–796 | the tile, 410×64 (411×64). On landing, "Event site" is 121×48. | None. The header's Ride with me is hidden over the film, so the tile is the way in. (`before-1440-t3-words-ride-with-me-02-tap-feb-6-ride-with-me-tour-de-p.png`, `…-04-answer-event-site.png`) |
| 4 | His latest ride write-up | 1 | **3.60** | **no** | "Read the last ride", 143×27 (144×46) | Slow, and the same log mismatch as at 390. Header Guides → "My first TSR" takes 2 taps and 3.10 screens, which is 5.1 against 4.6 for scrolling. (`before-1440-t4-words-read-the-las-02-tap-read-the-last-ride.png`, `before-1440-t4-header-guides-my-f-04-tap-my-first-tsr.png`) |
| 5 | How a charity ride's fundraising minimum works | 2 | 1.47 | yes: Guides is in the header | header "Guides", 47×48 (48×49) | The in-page way, "All 22 guides" at y 8,360, takes 2 taps and 9.94 screens, and that cell doesn't look like a link (see below). (`before-1440-t5-header-guides-04-tap-charity-rides-how-to-hit-you.png`) |
| 6 | Get help right now | 1 | 0 | yes: Resources is in the header | header "Resources", 71×48 (72×49) | Trevor is on the first screen of /resources/. Scrolling the homepage reaches the orgs room's 988 and Trevor after 6.57 screens. At this width they're on one line, and the taps land right. (`before-1440-t6-header-resources-04-answer-lgbtq-youth-the-trevor.png`) |

Taps + screens on the best route:

| Width | T1 | T2 | T3 | T4 | T5 | T6 |
|---|---|---|---|---|---|---|
| 390 | 0 | 2 | 1 | **6.09** | 6.13 | 1 |
| 1440 | 0 | 2 | 1 | **4.60** | 3.47 | 1 |

## The first screen

| Size | Who and what | His line | Primary (Ride with me) | Find a group ride | Film button | Room left under the bottom row |
|---|---|---|---|---|---|---|
| 390×844 | whole (532–581) | whole | 687–764, 357×77 | 776–820, 138×44 (hit 139×63) | 48×48 | 24 px |
| **375×667** | **whole (371–420)** | whole | **510–587, 343×77** | 599–643 | 48×48 | 24 px |
| **360×640** | **whole (344–393)** | whole | **483–560, 328×77** | 572–616 | 48×48 | 24 px |
| 430×932 | whole (631–681) | whole | 788–852, 394×64 | 864–908 | 48×48 | 24 px |
| 1440×900 | whole (534–620) | whole | 732–796, 410×64 | 808–852 | 131×48 | 48 px |

- **Yes:** 360×640 and 375×667 both show who and what, the line and the primary on the first screen. So do Find a group
  ride and the film button.
  - Shots: `before-360x640-fs-01-first-screen.png`, `before-375x667-fs-01-first-screen.png`,
    `before-390x844-fs-01-first-screen.png`, `before-430x932-fs-01-first-screen.png`,
    `before-1440x900-fs-01-first-screen.png`.
- **Targets:** every target on the first screen is 44 px or more. The smallest is "Open menu" at 44×44 on phones, and
  "Towns" at 43×48 (hit 44×49) at 1440.
- **Phone targets:** four in all: Open menu, Ride with me, Find a group ride and the film button.
- **The hero is exactly one screen tall** at every size. Nothing below it peeks onto the first screen.
- **Room on the first screen, for Cadence's note 1** (measured, not a design):
  - The gap between "Find a group ride" and the film button is 142 px at 360, 157 at 375, 171 at 390 and 207 at 430.
  - "Read the last ride →" is 143 px wide as it's set in `#road`.
  - With any gap between two links, it doesn't fit on that row at 360 or 375.
  - Under the row there are 24 px at every phone size.
  - Between the header's foot and the top of the stencil there are 135 px at 360×640 and 156 at 375×667. His face is in
    that band.

## Section heights

- **390×844:** the homepage is **11,853 px = 14.04 phone screens**.
- **1440×900:** it's **10,060 px = 11.18 screens**.
- **375×667:** 11,680 px = 17.51 screens.
- **360×640:** 11,644 px = 18.19 screens.
- The height was the same at load and after scrolling to the foot. Nothing loads in late and grows the page.

How to read the table:
- Top to bottom.
- "Starts" is the screen number where the section begins, counting from 0.
- "Text" is the share of the section's height covered by text blocks. "Pictures" is the share covered by photos, film or
  the map.
- Shots of each section are in `sec/` (`390-sec-NN-<id>.png`, `1440-sec-NN-<id>.png`).

| Section | 390: screens (starts) | 390: px | 390: text / pictures, words | 375×667 screens | 360×640 screens | 1440: screens (starts) | 1440: px |
|---|---|---|---|---|---|---|---|
| `#top` hero (film) | 1.00 (0) | 844 | text over a full-screen picture, 50 words | 1.00 | 1.00 | 1.00 (0) | 900 |
| `.strip` the numbers | 0.45 (1.00) | 377 | 33% / 0%, 22 words | 0.57 | 0.62 | 0.29 (1.00) | 264 |
| `#why` How this works + It always says cycling | **1.73** (1.45) | 1,459 | 39% / 35%, 99 words | 2.20 | 2.26 | 1.11 (1.29) | 1,002 |
| `#today` Today I rode for | **1.73** (3.18) | 1,464 | 17% / 58%, 43 words | 2.15 | 2.19 | 0.94 (2.41) | 844 |
| `#road` 10,000 and the last rides | 1.16 (4.91) | 981 | 61% / 0%, 49 words | 1.47 | 1.52 | 1.36 (3.34) | 1,222 |
| `#year` the 2027 rides | **1.76** (6.07) | 1,488 | **80% / 0%**, 207 words | 2.23 | 2.33 | 1.81 (4.70) | 1,633 |
| `#orgs` the orgs on patina | **1.54** (7.84) | 1,301 | 39% / 0%, 106 words | 1.95 | 2.10 | 1.17 (6.52) | 1,054 |
| `#ride` Center Ride Out | 1.36 (9.38) | 1,147 | 37% / 36%, 74 words | 1.70 | 1.74 | 0.96 (7.69) | 866 |
| `#find` Find a group ride | 0.59 (10.74) | 501 | 41% / 0%, 44 words | 0.82 | 0.86 | 0.48 (8.65) | 431 |
| `#read` field notes, guides | 0.91 (11.33) | 766 | **77% / 0%**, 79 words | 1.15 | 1.20 | 0.44 (9.13) | 396 |
| `#sign` the sign | 0.61 (12.24) | 512 | 30% / 0%, 19 words | 0.76 | 0.79 | 0.89 (9.57) | 801 |
| footer | 1.20 (12.84) | 1,013 | 9% / 0%, 72 words | 1.52 | 1.58 | 0.72 (10.46) | 648 |

What fills the tall ones at 390 (measured from the blocks inside each section):
- **`#why` (1.73 screens):**
  - How this works: 411 px (the three steps take 304).
  - The story words: 367 px.
  - The two photos stacked: 513 px.
  - At 1440 the words and photos sit side by side, so the section is 1.11 screens.
- **`#today` (1.73):**
  - The words: 0–436 px. That's the eyebrow, the sign, his line and the ask.
  - The wide photo: 318 px.
  - The film poster: 538 px, with its own Play line under it.
- **`#year` (1.76):**
  - The heading block: 153 px.
  - The note: 104 px.
  - The 13 date rows: 981 px, one under another, 73–85 px each. The map is hidden under 760.
- **`#orgs` (1.54):**
  - The heading: 116 px.
  - Three org blocks at 225 px each: 677 px.
  - The "You don't have to be queer…" line: 111 px.
  - The help line: 126 px.
- **`#ride` (1.36):**
  - The photo: 416 px.
  - The words, facts and buttons: 615 px.
- **Footer (1.20):**
  - Four link columns: 691 px.
  - The crisis line and the bottom line: 183 px.

Phone screens, by what's on each, at 390. A section is listed when it takes 40 px or more of that screen.

| Screen | What's on it |
|---|---|
| 1 | hero |
| 2 | strip, How this works |
| 3 | `#why` (the steps, the story words, the first photo) |
| 4 | `#why` (the end), `#today` |
| 5 | `#today`, the top of `#road` |
| 6 | `#road` |
| 7 | `#year` |
| 8 | `#year`, the top of `#orgs` |
| 9 | `#orgs` |
| 10 | `#orgs`, `#ride` |
| 11 | `#ride`, `#find` |
| 12 | `#find`, `#read` |
| 13 | the end of `#read`, `#sign`, the top of the footer |
| 14 | footer |

Words and links said more than once on the page. These are counts only; whether they should go is the desks' call.

**Phrases in visible text** (the same counts at 390 and 1440):

| Phrase | Times | Where |
|---|---|---|
| "10,000" | 4 | hero, How this works, `#road`, `#year` ("Part of the 10,000 miles.") |
| "all on the bike" | 2 | hero, `#road` |
| "cycle for" | 7 | — |
| "group ride" | 6 | — |
| "the Center" | 6 | 4 of them in `#ride` |
| "2027 rides" | 4 | — |
| "1,423" | 2 | strip, `#find` |
| "on video" | 2 | `#today`, `#sign` |

**One destination linked twice or more inside `<main>`:**

| Destination | Links |
|---|---|
| `/rides/` | hero link, strip tile |
| `/events/2027/riding/` | `#year` link, `#ride` link |
| the Tour de Palm Springs row | hero tile, `#year` row 1 |
| `/cyclefor/` | `#today`, `#sign` |
| the Strava profile | strip, `#road` |

No visible sentence of 12 characters or more repeats in `<main>`. The only exact repeats are the 988 and Trevor lines,
in the orgs room and the footer.

## Broken

1. **The orgs room's "988 call or text" dials the Trevor Project on phones** (390, 375 and 360; desktop is fine).
   - **The test:** 15 points spread across the visible words "988 call or text", checked with `elementFromPoint`. One real
     tap at the centre, with the click cancelled so nothing dials.
   - **Orgs room:**
     - 10 of the 15 points land on `tel:18664887386`, and the centre tap does too.
     - Only the top row of points reaches `tel:988`.
   - **Footer (same pattern, smaller):**
     - The bottom 5 of 15 points land on Trevor.
     - The centre lands on 988.
     - The 988 link's real hit area is 111×23.
   - **Phone menu:** 15 of 15 points land on 988. Its lines are 29 px apart.
   - **Cause:**
     - Every tel: link carries a 44 px tap pad, a `::before` centred on its line (`home.css` line 333, `chrome.css`
       line 696).
     - At phone widths the 988 link and the Trevor number wrap onto lines 22 px apart in the orgs room, and 23 px apart
       in the footer.
     - The Trevor pad comes later in the page, so it sits on top of the lower part of the 988 line.
   - **Shots:** `before-390x844-tel-orgs.png` (green is 988, magenta is Trevor), `before-390x844-tel-footer.png`,
     `before-390x844-tel-menu.png`, `before-375x667-tel-orgs.png`, `before-360x640-tel-orgs.png`. Data in
     `results-tel.json`.
   - **For the access desk.** This is the crisis line on the homepage. It isn't a task timing, but it's the one thing
     here that sends someone to the wrong number.
2. **Tabbing past Ride with me jumps the hero.** This is unchanged from the earlier lab.
   - At 390, Tab 4 ("Find a group ride", already whole on screen) scrolls the page 376 px. At 1440, Tab 8 scrolls 390 px.
   - The stencil leaves the top of the screen.
   - Cause: the `scroll-padding-bottom` kept for the Ride with me bar is applied on the first screen too, where the bar
     isn't showing.
   - Keyboard only; touch is unaffected.
   - Shots: `before-390-keys-02-tab-5-heropause.png`, `before-1440-keys-02-tab-9-heropause.png`.
   - The focus ring is visible on every stop: 2 px, plaster on dark, asphalt on light.

## Looks tappable and isn't, or is a link and doesn't look it

- **At 1440, the 2027 map's 13 numbered dots** (28×28 dark discs) read as map markers.
  - They're inert: a click on dot 1 did nothing, the cursor is the default arrow, and they're inside an `aria-hidden`
    figure.
  - Only the rows below the map open a ride. The map is hidden under 760.
  - Shot: `before-1440-year-map.png`.
- **The rose plates "me · one·n·ten · change"** under "It always says cycling" read as chips. They're plain text.
  - Position: y 2,025 at 390 and y 1,990 at 1440.
  - Shots: `before-390-why-plates.png`, `before-1440-why-plates.png`.
- **The `#read` rows are links that don't look like links.** These are "South Mountain at sunset", "The Paradise Valley
  loop", "The carrot cake theory" and "All 22 guides".
  - None has an arrow or an underline.
  - At 1440 they're four text columns under one hairline. The underline only appears on hover.
  - At 390 they're rows split by hairlines, and on touch there's no cue at all.
  - "All 22 guides" is the homepage's only in-page way to the guides, which is task 5's other route.
  - Shots: `before-1440-read-rows.png`, `before-1440-read-rows-hover.png`, `before-390-read-rows.png`.
- **Within the house rule, so not a finding:** in the strip, "4,273 training miles" has the same dash, numeral and label
  as the two link cells next to it. Only the 13 px arrow separates a fact from a link (CLAUDE.md §3: the arrow is the
  link's affordance).
- **Footer link columns:** these are plain text links, as on every page.

## Small targets and movement

- **Targets under 44 px** (box, and the real hit area). Neither is on a core-task path, except the 988 link on task 6's
  scroll route:
  - "on Strava" in the strip: 59×17 (59×18) at 390, and 63×19 (64×20) at 1440.
  - The orgs room's "988 call or text" at phone widths: only its top third is its own (see Broken).
- **Every other small text link reaches 44 px or more through its pad.**
  - "Read the last ride", "Give to …", "Help lines, by age", "No-drop rides" and similar links all measure 144×45 to 47
    or more.
  - "Powered by Strava" is 108×16, with a hit area of 117×45.
- **Layout shift:**
  - CLS was 0 on every page of every path.
  - Scrolling the whole homepage with reduced motion caused 0 shifts at 390, 1440, 375 and 360.
  - With motion on at 1440 there were two tiny shifts (3.5e-5 each). They come from the film button's label changing from
    "Play the film" to "Pause the film": the button widens from 131 to 140 px and its left edge moves 9 px.
  - With motion on at 390 there were none. The button there is an icon at 48×48.
  - The first-screen targets sat at the same y at load, at +2.5 s and at +5 s, with the film both on and off.
- **The Ride with me bar:**
  - It shows from one screen down (scrollY 844 at 390, 900 at 1440) to `#sign`, and hides at the page foot.
  - The link is 342×60 at 390 and the hide button 48×60.
  - It never sat over a target at the end of any path.
  - Shots: `before-390-ridebar-midpage.png`, `before-390-page-foot-ridebar.png`.

## Noted, not findings

- **The log's fourth row reads "Thu Oct 22 / —".** This is by design: Strava's default title is hidden and the row keeps
  its shape (`home.css` line 246). To a stranger the dash reads as a missing name.
- **For the access-speed desk:** on this local server the measured largest paint is the hero's text, not the poster that
  CLAUDE.md names as the LCP. It's `p.hero-line` at 390 and `p.hero-intro` at 1440, at about 0.2–0.3 s. Localhost timing
  says nothing about real phones.
