# UX architect: audit, studio pass 1 (Oct 21, 2026)

Way-finding only: the header and phone menu, the tally line, breadcrumbs, each page type's first screen
and section order, the one primary action, and how pages end. This is findings only. I edited no site
file, generator or stylesheet.

Inputs: `critic-before.md`, `lab-before.md` (it landed partway through and agrees with my probes on the
worst problems), the `before/` and `before-tiles/` screenshots, and my own probes. The probes are
in-process server + Playwright, in the session scratch folder
`/tmp/claude-0/-home-claude/065fb8a8-1db5-530f-9a75-ba4101ea1410/scratchpad/ux/`:
- `probe.py`: headings, crumbs, buttons and the closing block's position on all 14 pages at 390 and 1440.
- `ys.py`: where the answers sit on ride and event pages.
- `homefold.py`: the homepage hero at 1440×900, 1366×768, 1280×800 and 1024×768.
- `foot.py`: closing-block and footer geometry.
- `menu.py`: the phone menu open, the page ends, and the ride bar mid-scroll.

Shots I added are in `…/scratchpad/ux/shots/`. One extra page was probed:
`/rides/phoenix-az-bullshifters-saturday-club-ride/`. It's a ride page with no film (1,423 of the 1,425
ride pages have none) and no route.

Each fix gets **impact** 1–5 and **effort** 1–5.

Effort scale:
- **1:** CSS only (`/chrome.css`, a section sheet) or one static JS or hand file. Nothing regenerates.
- **2:** one change in `scripts/chrome.js` or one generator helper. It rides the single regeneration
  (about 2,600 files, 25 s).
- **3:** several generators, or a template reorder that needs the tests rechecked.
- **4–5:** new component work.

## The numbers that frame this

| Page (390) | Height | Where the answer sits | How much of the page is its ending (closing block + gap + footer) |
|---|---|---|---|
| `/brief/` | 2.9 screens | tool on screen 1 | **68%** (from y 803 of 2,475) |
| `/find-a-ride/` | 4.2 | tiles on screen 1 | **49%** |
| `/rides/` | 4.4 | search on screen 1, Phoenix chip at y 904 | **47%** |
| `/rides/az/phoenix/` | 5.9 | picks on screen 1 | 35% |
| TSR ride page | 12.2 | When at y 924 (screen 2); "I rode it" at y 3,536 | 17% |
| Bullshifters ride page (typical) | 8.3 | When at y 368; About at y 2,850 | 25% |
| STP event page | 12.2 | h1 at y 594; Sign up at y 1,135 | 16% |

The shared ending is the same on every page:
- **390:** closing block 385px + 64px of concrete + footer 1,295px. That's 1,744px, or **2.1 phone
  screens**.
- **1440:** 336 + 128 + 1,233 = 1,697px.

It sits on 2,507 of 2,520 HTML files. It's the single biggest thing on the site, and it's the critic's
"pile of links, dark slab, sliver, dark slab".

## 1. Header and phone menu

**What I saw.**
- **Two lists for one site.**
  - Desktop nav: Find a ride · 2027 calendar · Towns · **Field notes** · Resources.
  - Phone menu: Ride with me · Find a ride · 2027 calendar · **Town guides** · **Guides** · Resources.
  - So Guides isn't in the desktop header at all. Lab task 5 at 1440 is 9.3 screens of scrolling.
  - Field notes isn't in the phone menu.
  - Towns is "Towns" in one list and "Town guides" in the other.
- **The lit nav item is wrong for some sections.** `/chrome.js` `SECTION` lights "Field notes" on
  `/guides/` (critic: a nav lit "Field notes" on a page titled "The guides"). It lights nothing on
  `/brief/` or `/cyclefor/`.
- **Desktop nav links are 40px tall** (`.nav-links a{padding:8px 0}`; lab: 73×40, 71×40).
- **The phone menu shows no "you are here".**
- **In the phone menu, "988 call or text" is plain text**, not `tel:`. Trevor beside it is a link (lab).
- **The header's RIDE WITH ME is a second primary on every inner page.**
  - Desktop: it's filled bruise. On a ride page it sits beside the host button and the bruise "Next
    ride" bar, so three dark blocks fight on one first screen
    (`…/ux/shots/rides_phoenix-az-bullshifters-saturday-club-ride@1440-first.png`).
  - Phones: once you scroll, the header button and the Ride with me bar at the foot are both on
    screen, the same action twice (`…/ux/shots/tsr-mid@390.png`).
- Menu sub-labels are 12px, under the 13px label floor.

**What works.** Six big rows at 66px, the crisis lines in the menu foot, and the sticky 64px bar. No
mega-menu, no hamburger on desktop.

## 2. The tally line

`● — training miles since June 1. The 10,000 start Jan 1.` sits in a 39px band under the header on
every inner page.
- It's 12px (`.tally-line{font-size:.75rem}`), under the floor.
- It isn't tappable, but the dot reads as a "live" control.
- It sits between the header and the breadcrumbs, so "how far has he ridden" comes before "where am I".
- It's the only place the number appears on inner pages, and the rules want the number everywhere, so
  it stays. It should go somewhere and be the right size.
- The closing block then adds a third action, "The live count", to say the same thing again.

## 3. Breadcrumbs

**Five roots for one site, and some trails leave their section:**

| Page | Trail shown | Problem |
|---|---|---|
| `/rides/` | Find a ride / Group rides | fine |
| `/rides/az/phoenix/` | Group rides / Arizona / Phoenix | root changes to Group rides |
| ride page | Group rides / Arizona / Scottsdale / The Saturday Ride (TSR) | the last item repeats the h1 right under it; it wraps to 2 lines at 390 on Bullshifters |
| Bullshifters ride (Phoenix, AZ) | … / Arizona / **Peoria** / … | says Peoria on a ride whose place line says Phoenix. 6 rides do this: their own city has a hub, but `hubFor` picks the nearest hub instead (Bullshifters, Global Bikes Ahwatukee, Night Rider Trail 100, SFVBC Saturday, two NWCC Houston rides) |
| `/find-a-ride/` | Find a ride | a one-item trail that's just the page's own name |
| calendar pages | **Home / Events** / 2027 calendar / Robert's rides | "Home" appears only here; "Events" isn't a nav word |
| event pages | **Events / Washington** / STP | the nav lights "2027 calendar", but the trail goes to `/events/` and `/events/state/washington/` |
| town pages | Towns / **Arizona** / Phoenix | "Arizona" goes to `/events/state/arizona/` ("Cycling events in Arizona"): the trail leaves Towns |
| guides, field notes, resources, brief, cyclefor | none | a guide shows "Guides · Wheels and tires" as grey text, not links |

On top of that, crumbs carry no link cue: no underline, no color, no arrow (lab, tasks 2 and 3). They
are 12px.

## 4. One primary action per screen

| Page type | The one it should be | Today |
|---|---|---|
| Home | Ride with me tile | right at 390; **below the fold at 1366×768** (y 814), and the other two tiles start at y 906 on a 900px screen |
| `/find-a-ride/` | Group ride (the ink tile) | right; "Brief a ride" is a tool, not a kind of ride, and leaves a one-tile hole in row 3 |
| `/rides/` | search + NEAR ME | right; the six big-city chips ("Phoenix home") are under the map: y 904 at 390, **y 1,450 at 1440** |
| city hub | the two picks | right |
| ride page | the host's page (go check before you go) | five controls in three looks in 110px: an ink three-cell bar, a light three-cell bar, a bare "Google Calendar", and SAVE and SHARE caps outlines (critic #2) |
| `/events/2027/riding/` | sign up for the next ride | the row is labelled "Event site" (ghost), 0.8 screens into the opened row, under the facts table (lab task 3) |
| event page | Sign up for STP | it's there (ink), but at y 1,135 on a phone, under a poster and a second headline |
| guide | reading, then "Keep reading" | right, but the "← All guides" link lands *after* the closing slab |
| `/resources/` | Call 988 | right, but under a six-line lede; Trevor sits under the 988 bar at 390×844 and off the first screen at 375×667 (lab) |

## 5. How pages end

Every inner page runs the same sequence at the foot.

1. **A pile of loose links.** These come from page-specific helpers:
   - `/rides/`: "What's rolling tonight →", then "How we check rides, and first-ride questions ·
     Add a ride we're missing". They start at two different x positions (critic).
   - City hub: "Nearby" chips, "← All of Arizona", the same footline.
   - Ride page: Nearby rides (4 rows + up to 4 "→" links), then "← Find another group ride".
   - Event page: "All events · Events in Washington".
   - Guide: "Keep reading", then **after the closing**, "← All guides".
2. **The closing block.**
   - It's bruise and capped at 820px, so at 1440 it's stranded on the left.
   - On guides it's centered at 640px (`.fn-post>.pledge`).
   - On phones its text is inset 22px, off the 16px gutter.
   - It carries **three** actions: RIDE WITH ME, FIND A GROUP RIDE, The live count.
3. **A 64px (phone) / 128px (desktop) strip of concrete.** This is `.foot{margin-top:var(--sec)}`.
4. **The footer.**
   - It's bruise on inner pages but drained pool on the homepage (`home.css:977`).
   - CLAUDE.md §3 says pool *is* the footer color.
   - Its columns repeat things: "Follow → Instagram" plus a separate "Mile updates → @cycl_eforchange";
     "Events" (the `/events/` directory) beside "2027 calendar".
   - `/brief/` is reachable only from a find-a-ride tile.

## 6. Page types: first screen and section order

**Home.**
- **390:** the first screen is right (critic: 4/5, must survive). Who, what, Ride with me and the two
  finders are all above the fold.
- **1440:**
  - The phone-only intro ("I'm Robert. In 2027 I ride 10,000 miles, all on the bike.") is hidden, so
    desktop never says what this is (lab task 1).
  - The biggest control is the sign's field, which only changes the sign.
  - The finder tiles fall below the fold: Group rides and Events at y 906 on a 900px screen; at
    1366×768 even Ride with me (y 814) is gone.
- **His latest write-up is unreachable** (lab task 4: 8 taps, 6.3 screens).
  - "Read the last ride" (desktop only) scrolls to the Strava log.
  - The log's "TSR" row isn't a link.
  - The note under the log promises "the big ones get a page" and links none.
  - The only link to `#robert` anywhere is on `/nov7/`, which nothing links to.

**`/find-a-ride/`.** Good: one question, nine tiles. "Brief a ride" breaks the grid and the question.

**`/rides/`.**
- Search and NEAR ME are on screen one.
- The big-city chips, the fastest path for most visitors, sit under a map whose phone targets go down
  to 1×2px (lab).
- "Outside the US" appears twice: a hero link and a wide door.

**City hub.** Good: the two picks, then kind, made for, day, then "All 46 rides, with filters". The
foot is the link pile.

**Ride page** (1,425 pages, the ones that earn the clicks).
- **Typical page (Bullshifters):**
  - When / Starts at / Pace sit on screen one.
  - Then a separate bruise "Next ride Sat, Oct 24, 7:30 AM MST" bar repeats When in a different format
    ("6:00 am" vs "6:00 AM MST", critic).
  - Then the five-control action row.
  - Then two **empty asks**: "No reviews yet … REVIEW THIS RIDE", and later "Nobody has sent us this
    ride's route yet" + its form.
  - The host's own description of what the ride is ("About the … group ride") comes at **y 2,850, 3.4
    screens down**.
  - The town strip "Riding Phoenix from out of town?" is **1,182px** of seven stacked tiles at 390.
- **Film pages (TSR, shop ride):**
  - At 390 the film fills y 353–893, so When / Where / Pace start at y 924, on screen two (critic #4).
  - "I rode it" is at y 3,536 with no jump to it from the top.

**`/events/2027/` and month and type pages.** One question with big picks: good. The crumbs read
"Home / Events / 2027 calendar".

**`/events/2027/riding/`.**
- Ride with me lands here at the top of the list. The first row is Tour de Palm Springs (Feb 6), not
  Center Ride Out (Apr 23–25), which every Ride with me surface names. Two answers (lab task 3).
- Every row carries "Robert's ride", on a page titled "The 2027 rides I'm doing".
- Each row's summary holds a "Los Angeles guide →" link, a 20px-tall trap inside a tappable row. The
  same town strip is already inside the opened panel.

**Event page (STP).**
- Crumbs, then a full-width poster: "07.10 Seattle" plus an info column of rose 12px text over contour
  lines.
- Then an eyebrow (Tour · Seattle, Washington · since 1979), then the h1, a date line, a lede, and
  only then Sign up.
- The date appears four ways on one screen (critic). The h1 is at y 594 at 390.

**Town page.**
- First screen right: h1, a line, seven doors.
- The crumb "Arizona" leaves Towns.
- At 1440 the 4×2 door grid has a hole and the intro paragraph is a 365px strip beside nothing
  (critic). That one is type-layout's, but the door count is mine: 7 doors at 4 across leaves a hole
  every time.

**`/brief/`.** Good first screen and one primary. Then 68% of the page is the ending.

**Guides hub.**
- "First ride? Start at 01. Short on the minimum? Jump to 03. Bike questions live in 04." gives
  directions as plain text, where links belong. The fundraising guide is the ninth card, 2.76 screens
  down (lab task 5).

**Guide page.** The best reading page on the site. The meta line is the place a crumb belongs. The
ending puts "← All guides" after the slab.

**`/cyclefor/`.** One job, one primary (GIVE US THE OK). Fine.

**`/resources/`.**
- 988 is on screen one at every width, and the fixed bar works.
- But CLAUDE.md says "crisis line right under the h1", and today a six-line lede and "Where do you want
  to start?" come first.
- So at 390×844 the Trevor line (y 798–846) is under the 988 bar, and at 375×667 it's off screen.

## 7. Looks tappable and isn't / is tappable and doesn't look it

- **Looks tappable, isn't:**
  - the tally line's dot;
  - "TSR" bold in the homepage log;
  - bordered fact cells on ride, event and town pages (they look like cards);
  - "Robert's ride" tags;
  - the "Next ride" bar.
- **Tappable, doesn't look it:**
  - breadcrumbs;
  - the homepage reading rows at 1440 (lab);
  - "Details" on calendar rows (12px grey);
  - the riding rows themselves (the whole row opens);
  - "Map ↗" on ride pages (17px tall);
  - the eyebrow's "Seattle, Washington" (16px).
- **Reads as an action and isn't one:** "988 call or text" in the phone menu.

---

## The fixes

Ranked by impact against effort and reach. Fixes marked *(regen)* go in **one** batch with the
`scripts/chrome.js` change and one regeneration in the §2 order. Fixes marked *(no regen)* can land
first, on their own.

### F1. One ending: the closing block and the footer become one field. Impact 5, effort 1 *(no regen)*, plus 2 for the follow-ups *(regen)*
- **Friction:**
  - Two dark slabs with a concrete sliver between them.
  - The slab is pinned left at 820px (1440) or centered at 640 (guides).
  - The footer is a different color on home.
  - It's 2.1 phone screens on every page.
- **Shots:** `before-tiles/rides@390-03.png`, `before-tiles/rides@1440-03.png`,
  `…/ux/shots/tire-end@1440.png`, `…/ux/shots/riding-end@1440.png`, `…/ux/shots/phx-close@390.png`.
- **Fix (CSS):**
  1. `.foot{background:var(--pool)}` in `/chrome.css`, matching home and §3.
  2. `.pledge` goes full-bleed, on the same pool field: `margin-inline:calc(50% - 50vw)`, its inner
     content on the page grid's left edge (the 16px gutter on phones, the `.wrap` edge on desktop), and
     `margin-bottom:0`.
  3. The footer loses its top margin when the page ends on the closing block:
     `body:has(main .pledge) .foot{margin-top:0}`.
  4. One field from the closing line to the footer's last line, with the stencil inside it.
  5. Remove the `.fn-post>.pledge` / `.fn-pillar>.pledge` width rules in `styles.css:123–125` and
     `.wrap>.pledge` in `chrome.css:228–229`.
  6. The Ride with me bar's observer (`/ridebar.js`) still sees `.pledge`, so it still tucks away.
- **Fix (follow-ups, in the regen):**
  1. `pledge()` in `scripts/chrome.js:224–230` keeps **two** actions: Ride with me (primary) and one
     link. Drop "The live count"; F9 gives the number a home.
  2. `scripts/apply-chrome.py` moves `<p class="fn-back">` above the closing block on hand pages, so
     nothing sits between the closing and the footer.
- **Files:**
  - `cfc-site/chrome.css` (`.pledge` 222–229, `.foot` 232)
  - `cfc-site/styles.css` 123–125
  - `cfc-site/rides/rides.css` 283
  - `scripts/chrome.js` `pledge()`
  - `scripts/apply-chrome.py` (the `fn-cta` swap, ~line 96)
- **Scope:** design-system owns the field's look. Robert's §3 token note already names pool as the
  footer color.

### F2. Resources: the crisis line right under the h1. Impact 5, effort 1 *(no regen)*, plus the menu's 988 *(regen)*
- **Friction:** Trevor is under the 988 bar at 390×844 and off screen at 375×667. 988 in the phone
  menu isn't tap-to-call.
- **Shots:** `before/resources@390-first.png`; lab `spot-375x667-resources.png`.
- **Fix:**
  1. In `cfc-site/resources/index.html`, move the "Right now" door's content (Call or text 988, Trevor
     1-866-488-7386 / text START, 911) to directly under the h1, ahead of the lede. The For me and For
     someone I love doors stay under "Where do you want to start?".
  2. `scripts/apply-chrome.py` (`WHY` / the crisis handling, 112–127) should enforce that order on
     every resources page.
  3. In `scripts/chrome.js` HEADER `menu-foot`, make 988 `<a href="tel:988">`. The footer's
     `.foot-crisis` gets the same.
- **Files:** `cfc-site/resources/index.html`, `scripts/apply-chrome.py`, `scripts/chrome.js` (HEADER
  165, FOOTER 215).

### F3. His write-up is one tap from the homepage. Impact 5, effort 2 *(regen)*
- **Friction:** 8 taps and 6.3 screens on a phone, 6 taps on desktop, and only if you already know the
  word "TSR" (lab task 4).
- **Shots:** lab `t4-390-04-clue-tsr-in-the-log.png`, `before-tiles/rides_scottsdale-…@1440-03.png`.
- **Fix:**
  1. `scripts/build-home.js` reads `data/ride-notes.json` and finds the newest entry (slug, date,
     `line`).
  2. The hero's "Read the last ride" (build-home.js:255) points to `/rides/<slug>/#robert`.
  3. Show it on phones too. Today it's hidden under 760px by `home.css:1132`; show it as a quiet
     `.link` under the finder tiles.
  4. In `#road`, the log row whose date matches the note links to the same place. `home.js` repaints
     the log, so give the row's `<b>` an `<a>` from a `data-note-date` / `data-note-href` on `#log`.
  5. On the ride page, the `tags` row (`build-rides.js` ridePage, ~2574) gets an "I rode it" tag linking
     `#robert` when `notesFor(r.slug)` has one, beside the reviews tag.
  6. `cfc-site/guides/index.html` "From the road" gets the write-up as a row (hand edit; the label is
     his `line`, "My first TSR").
  7. Every label reuses words already on the site.
- **Files:** `scripts/build-home.js`, `cfc-site/home.js` (log painter ~115–129), `cfc-site/home.css`
  1132, `tools/build-rides.js` ridePage `tags`, `cfc-site/guides/index.html`.

### F4. One nav list, one name per place. Impact 4, effort 2 *(regen)*
- **Friction:** Guides is missing from the desktop header, Field notes is missing from the phone menu,
  and three names are used for two places (lab task 5 at 1440: 9.3 screens).
- **Fix:**
  1. `scripts/chrome.js` HEADER:
     - Desktop nav: `Find a ride · 2027 calendar · Towns · Guides · Resources`. **Guides replaces Field
       notes**, which follows the "no new item without removing one" rule. `/guides/` already lists the
       field notes and the journal under "From the road".
     - Phone menu: keep its six rows, with the same words (Towns, not Town guides).
  2. `cfc-site/chrome.js` `SECTION`:
     - `"/guides/": /^\/(guides|field-notes|journal)\//`
     - add `brief` to the Find a ride pattern
     - also set `aria-current` on `.menu-list a` (no regen).
  3. `cfc-site/chrome.css`:
     - `.nav-links a{padding:12px 0}` for 44px.
     - `.menu-list a[aria-current]` gets the hairline-underline state the desktop nav uses.
     - `.menu-list a span` goes to 13px.
- **Files:** `scripts/chrome.js` HEADER 136–161, `cfc-site/chrome.js` 94–99, `cfc-site/chrome.css`
  171–174, 205–207.

### F5. Ride with me lands on the ride, opened, with Sign up first. Impact 4, effort 2 *(regen)*
- **Friction:** the link opens a list whose first row is a different, earlier ride, the row is closed,
  and the way to sign up is "Event site" 0.8 screens in (lab task 3).
- **Shot:** lab `t3-390-03-tap-23-apr-23-25-center-ride-out.png`.
- **Fix:**
  1. `NEXT_RIDES` hrefs in `scripts/chrome.js:111–114` become `/events/2027/riding/#center-ride-out`
     and `…#cycle-to-zero`. The rows already have those ids, and `OPEN_JS` already opens and scrolls to
     a hashed row. I tested it: it lands at y 468 at 390, open.
  2. `/ridebar.js`'s `here` test compares `href.split("#")[0]`, so the bar still stays away on the
     riding page.
  3. In `scripts/build-calendar.js`:
     - `eventHtml()`: for `e.riding` rows, the `det-links` row moves to the top of the panel, above
       the facts.
     - Its first button reads "Sign up" (the homepage's word) when `reg_status` says registration is
       open, and stays "Event site" otherwise.
     - Remove `meta.push(TOWNS.link(town))` (line 421) from the row summary. The panel's town strip
       already carries it, and that removes the 20px tap trap on all 638 rows.
     - The riding `shortPage()` call (563–567) passes a flag so `you-tag` is left off on Robert's own
       list.
- **Files:** `scripts/chrome.js`, `cfc-site/ridebar.js`, `scripts/build-calendar.js` (eventHtml
  410–443, riding shortPage 563).
- **For Robert:** Tour de Palm Springs (Feb 6) is on his riding list but not in `NEXT_RIDES`, so the
  site has two "next rides". Which one is it?

### F6. Ride pages: the answer, one action, then the ride. Impact 4, effort 3 *(regen; 1,425 pages)*
- **Friction:**
  - A second, louder When in a bruise bar.
  - Five controls in three looks.
  - Two empty asks before the ride's own description, which sits 3.4 screens down.
  - A 1,182px town strip.
  - On film pages, When / Where / Pace on screen two.
- **Shots:** `…/ux/shots/rides_phoenix-az-bullshifters-saturday-club-ride@390-first.png` and
  `@1440-first.png`, `before/rides_scottsdale-…@390-first.png`, `before-tiles/rides_scottsdale-…@390-09.png`.
- **Fix in `tools/build-rides.js` `ridePage()`:**
  1. **Next ride goes into the When cell** as its sub-line: the `#gr-next` markup (2696–2700) moves
     inside the When `dd`, with the same ids so `ride.js` still finds it. Drop the bruise bar.
     `cfc-site/rides/ride.js:84` lowercases am/pm the way `fmtNext()` does, so it's one format.
  2. **`.gr-actions`** (2702–2708): one filled button for the host's page (`btn--ink`). Add to
     calendar, Google Calendar, Save and Share become one row of quiet `.link`s.
  3. **When there are no reviews and no route** (nearly every ride page), the order after the actions becomes:
     checked → About (the lede + host's text) → the remaining facts → first-time fold → For visitors →
     map → town strip → Where to find them → **one** "Rode it, run it, or something's wrong?" section.
     That section holds the empty review ask, the route ask and the report form, under the summary
     line the report fold already uses. Then Nearby.
  4. **Pages with a route, a write-up or reviews keep the documented order** (§6: route under the
     buttons, "I rode it" above the reviews).
- **Fix in `cfc-site/rides/rides.css`:**
  1. `.gr-ride .town-strip` gets the same two-up compact treatment as `.gr-steps .town-strip`
     (382–386). That's about 700px less at 390.
  2. On phones, the film follows the actions: `.gr-top{grid-template-areas:"head" "body" "film"}`
     under 900px.
- **Files:** `tools/build-rides.js` ridePage 2481–2760, `cfc-site/rides/ride.js`,
  `cfc-site/rides/rides.css` (146–151, 382–386, 747–756).
- **Checks:** `node --test tools/test/*.test.js`. `build-rides-world.test.js:215` slices h1 →
  `gr-actions`.
- **For Robert / art director:** CLAUDE.md §6 (Oct 8) puts the film "edge to edge under the name on
  phones". This moves it under the buttons on phones only; desktop is unchanged.

### F7. The desktop homepage keeps the way in on the first screen. Impact 4, effort 2 *(no regen)*
- **Friction:**
  - Group rides and Events start at y 906 on a 900px screen.
  - At 1366×768 even Ride with me is below the fold (y 814).
  - Desktop never says "10,000 miles, all on the bike".
- **Shots:** `before/home@1440-first.png`; `…/ux/homefold.py` output in this file's numbers.
- **Fix (`cfc-site/home.css` only):**
  1. At ≥1024 the three finder tiles sit in one row (Ride with me wider), so 64px instead of 138.
  2. The sign's height is capped by the viewport (`min(…, 36svh)`), so the finder row lands above
     100svh at 768–900 tall.
  3. `.sign-intro` shows at ≥760 in place of `.sign-kicker`. The mile number is in the stats band right
     under the hero and in the tally.
  4. The sign's question and field stay; they move under the finder row.
  5. Phone layout untouched (Pass 37).
- **Files:** `cfc-site/home.css` (1108, 1132, 1179–1185 and the `.finder` rules).
- **Scope:** the critic says this first screen must survive. Type-layout should own the stencil scale.

### F8. Breadcrumbs: one rule everywhere. Impact 3, effort 3 *(regen)*
- **Rule:**
  - The trail starts at the section whose nav item is lit.
  - It never leaves that section.
  - It never repeats the h1 under it. The current page stays in the BreadcrumbList LD only.
  - It looks like links.
- **Fix:**
  1. `tools/build-rides.js`:
     - `crumbsHtml()` (649–652) shows `items.slice(1, -1)`.
     - The `/rides/` and `/find-a-ride/` callers then show "Find a ride" / nothing, which is fine for
       section fronts.
     - `buildMetros()` `hubFor` (563–567) prefers a hub named for the ride's own city when it covers
       the ride, then the nearest. That fixes the 6 rides, Bullshifters among them, that point at a
       neighbour's hub.
  2. `scripts/build-events.js`:
     - `breadcrumb()` (330–339) drops the current item visually.
     - Event pages trail "2027 calendar / July" (→ `/events/2027/`, the month page) instead of
       "Events / Washington"; the state events page moves to the `p.back` line.
     - Town pages trail "Towns" only (drop the `/events/state/` crumb, line 610).
  3. `scripts/build-calendar.js` `crumbs()` (457): no Home, no Events.
  4. **CSS:** move `.crumbs` from `events.css:17–21` to `/chrome.css`:
     - 13px/600;
     - links with the `--dust-deep` hairline underline that `.gr-footline a` uses;
     - keep the 44px hit area.
  5. `scripts/apply-chrome.py` turns a guide's `fn-meta` ("Guides · Wheels and tires") into the crumb
     "Guides / Wheels and tires" (→ `/guides/`, `/guides/#wheels`).
- **Files:** as named. Run the rides tests.

---

### Also worth doing (smaller, or folded into the batches above)

- **F9. The tally line: 13px, and it goes somewhere.** Impact 2, effort 1 *(regen, bundled)*.
  - `scripts/chrome.js:168`: the line becomes a link to `/#road`.
  - `chrome.css:212`: `.tally-line` → 13px, and the dot is dropped (it reads as a live control).
  - Replaces the closing block's "The live count" (F1).
- **F10. Header button: one primary.** Impact 3, effort 1 *(no regen)*.
  - `chrome.css:176`: at ≥900 `.nav .btn--sm` is the outline style on inner pages, so the page's own
    primary is the only filled thing on the first screen.
  - On phones, `/ridebar.js` `paint()` toggles `html.ridebar-on`, and
    `.ridebar-on .nav .btn--sm{visibility:hidden}` under 900px. Then Ride with me shows once per
    screen: the header on the first screen, the bar after that.
- **F11. `/rides/`: the big cities on the first screen.** Impact 3, effort 2 *(regen)*.
  - `tools/build-rides.js` `directory()`: move `p.gr-jumpcities` (1421) into the hero under the
    search, and make "Outside the US" (1397) its last chip. Drop the wide door's duplicate (1419).
  - Phoenix moves from y 1,450 to the first screen at 1440 (lab task 2: 3 taps → 2).
- **F12. Event pages: name, date, sign-up first.** Impact 3, effort 2 *(regen; 14 pages)*.
  - `scripts/build-events.js` `eventPage()`: order crumbs → h1 → date line → `ev-signup` → poster →
    lede → facts.
  - The poster keeps the date and town only; drop `.ev-poster-info` (476–487).
  - Drop the eyebrow (489); "since 1979" is in the facts.
- **F13. Every page ends on one next step.** Impact 3, effort 3 *(regen)*.
  - Add `CHROME.next({ up, side })` in `scripts/chrome.js`: one hairline row, the up link on the left,
    at most one sideways link on the right, styled once in `/chrome.css`.
  - It replaces `FOOTLINE` (build-rides.js:1281), the `.gr-tonight-row`, `p.back` / `.cal-back` /
    `.fn-back`, and the event `p.back`.
  - "How we check rides" stays in the footer's trust line. "Add a ride we're missing" stays on hubs as
    the side link. "What's rolling tonight" becomes a chip in the F11 row.
  - Nearby rides keeps 4 rows; its extra "→" links collapse to the up link.
- **F14. The guides hub's directions become links.** Impact 3, effort 1 *(no regen)*.
  - `cfc-site/guides/index.html` `.fn-stage-intro`: "01", "03" and "04" link `#stage-01`, `#stage-03`
    and `#wheels`.
  - The words don't change. Lab task 5 at 390: 2.8 screens → 1 tap.
- **F15. `/find-a-ride/`: Brief is a tool, not a kind.** Impact 2, effort 1 *(regen)*.
  - `findPage()` `kinds` (1472–1483) drops the Brief tile, leaving 8 tiles and no hole.
  - `/brief/` goes under "The whole 2027 calendar" as a second `rideBtn` row, and into the footer's
    Ride column (F16).
- **F16. Footer columns.** Impact 2, effort 1 *(regen, bundled)*.
  - `scripts/chrome.js` FOOTER (184–212):
    - Ride: Group rides · 2027 calendar · Towns · Tonight · Brief a ride · My 2027 rides · The orgs I
      ride for. Drop "Events": the `/events/` directory stays reachable from the calendar.
    - Read: Guides · Field notes · Journal · Resources.
    - Follow: Instagram (with the mile-updates note under it) · Strava. One column instead of two.
  - `home.css` gets the inner pages' 44px `.foot-trust a` (lab: 16px on `/`).
- **F17. Homepage finder label.** Impact 1, effort 1.
  - The "Events" tile goes to the 2027 calendar. Label it "2027 calendar" with "638 events" under it
    (build-home.js), so one place has one name.

## How to ship it

1. **CSS and static JS first, no regeneration:** F1 (CSS), F2 (resources page), F7, F10, F14, the
   `SECTION` and menu-current part of F4, and the ride-page CSS of F6 (town strip, film order). These
   touch about 6 files, and every page picks them up.
2. **Then one regeneration** for everything in `scripts/chrome.js` and the generators: F1 follow-ups,
   F2 menu 988, F3, F4 HEADER, F5, F6 template, F8, F9, F11, F12, F13, F15, F16. Run it in the §2
   order: `build-home → build-rides → build-events → build-calendar → apply-chrome.py`, then
   `node --test tools/test/*.test.js`.

Expected lab moves:

| Task | Width | Today | After |
|---|---|---|---|
| 3 (ride with him) | both | 2 taps | 1 tap to an opened row with Sign up first |
| 4 (his write-up) | 390 | 8 taps | 1 |
| 4 (his write-up) | 1440 | 6 taps | 1 |
| 5 (a guide) | 1440 | 9.3 screens | 1 tap + 1 anchor tap |
| 2 (Phoenix ride) | 1440 | 3 taps | 2 |
| 6 (help now) | 375×667 | Trevor off screen | Trevor on the first screen |

No task gets slower.

## For Robert, not the studio

- **Which is the next ride?** Tour de Palm Springs (Feb 6) is on "The 2027 rides I'm doing" but not in
  `NEXT_RIDES`, so Ride with me says Center Ride Out while the list it opens leads with Palm Springs.
- **The film on phones** (F6): the Oct 8 rule puts it under the name; the answer-first rule (§6) wants
  When / Where / Pace there. I recommend facts first, film under the buttons, phones only.
- **The footer color** (F1): §3 says pool; inner pages wear bruise. I recommend pool everywhere, as §3
  and the homepage already have it.
- **"Ride with me" in the header of a group-ride page** reads as "ride this ride with me". It's his
  label (Pass 36), so I'm only noting it.
