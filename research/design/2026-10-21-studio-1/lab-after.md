# Usability lab — after (studio pass 1, Oct 21, 2026)

The six core tasks again, on the built site after the pass (`b42f09f`), against the site as it was
before it (`a488656`, extracted to scratch). Same setup as `lab-before.md`: in-process server, every
request off 127.0.0.1 blocked (the tally shows "—" offline; expected), 390×844 phone (is_mobile, touch,
2x), 1440×900 desktop, 375×667 and 360×640 spot checks, reduced motion on.

Script: `scratchpad/lab/tasks.py`, adapted for the new labels (listed below). **Both columns come from
the adapted script**: run on the pre-pass site, it reproduces every number in `lab-before.md`. Shots:
`/tmp/claude-0/-home-claude/065fb8a8-1db5-530f-9a75-ba4101ea1410/scratchpad/lab/after/` (after) and
`…/lab/before-v3/` (before). None in the repo.

## First: what got worse

**No task got slower in taps plus screens scrolled.** Two things did get worse:

1. **The Ride with me landing now shifts sometimes (new).** Tapping Ride with me from the homepage
   opens `/events/2027/riding/#tour-de-palm-springs`. The Palm Springs row opens, then an inline script
   scrolls to it after `load`. In about 1 load in 4 that's caught mid-layout, and the rows under it
   register as a layout shift:
   - 390: 3 of 8 loads shifted, max CLS **0.583**.
   - 1440: 1 to 4 of 8 loads shifted, max CLS **0.28**.
   - Before the pass: 0 of 8 at both widths.
   - Not seen on a phone with a throttled network (0/6), but seen on desktop (2/6).
   - A thumb going for "Event site" can have the page move under it.
   - Cause: the script at the foot of `riding/index.html`, `e.open=true; addEventListener("load", … scrollIntoView)`.
   - Shots: `landing-riding-390.png`, `landing-riding-1440.png`.
2. **Task 5 at 390 can take one more tap, or 0.13 screens more scrolling.**
   - The new line on `/guides/` reads "Short on the minimum? Jump to **03**". A stranger who taps 03 lands right on the card: 4 taps, 0.1 screens.
   - One who ignores it and scrolls: 3 taps, 2.9 screens (before: 3 taps, 2.8).
   - The card sits 105px lower than before because the guides intro grew.
   - The jump links themselves are **17–21 × 21px** (hit area 21×22): the smallest target on any path, at either width.
   - Shots: `guides-first-390.png`, `t5-390-04-tap-03.png`.

Also new and smaller:
- The tally line ("— training miles since June 1…") is now a link on every inner page (to `/#road`). It's 323×20 (hit area 325×41), so a sub-44 target on the first screen of 13 of the 14 pages.
- A "988 call or text" link (102×19, hit area 112×35) is new in the footer and the menu. It's the smallest target off the map on 8 pages. The old smallest there was a 16px link, so this is bigger, not smaller.

## Results — before → after

| # | Task | Width | Taps | Screens | Way on 1st screen | Answer on 1st screen | Smallest tap (box, hit area) |
|---|---|---|---|---|---|---|---|
| 1 | What is this, whose is it | 390 | 0 → 0 | 0 → 0 | — | yes → yes | — |
| 1 | | 1440 | 0 → 0 | 0 → 0 | — | partly → **yes** | — |
| 2 | Group ride in Phoenix | 390 | 2 → 2 | 0.1 → **0.0** | yes → yes | yes → yes | 104×44 → 122×44 |
| 2 | | 1440 | 3 → **2** | 0.7 → **0.0** | yes → yes | yes → yes | 73×40 → **122×44** |
| 3 | Next ride, how to ride it | 390 | 2 → **1** | 0.8 → **0.0** | yes → yes | date only → **yes** | 357×64 → 357×64 |
| 3 | | 1440 | 2 → **1** | 0.3 → **0.0** | yes → yes | date only → **yes** | 124×44 → 124×44 |
| 4 | His latest write-up | 390 | 8 → **1** | 6.3 → **0.0** | no → **yes** | no → **yes** | 44×44 → 143×25 (hit 144×45) |
| 4 | | 1440 | 6 → **1** | 2.1 → **0.0** | no → **yes** | no → **yes** | 73×40 → 143×27 (hit 144×47) |
| 5 | Fundraising minimum guide | 390 | 3 → 4 *(or 3)* | 2.8 → **0.1** *(or 2.9)* | via menu → via menu | yes → no (0.05 down) | 44×44 → **21×21** *(or 44×44)* |
| 5 | | 1440 | 2 → 3 *(or 2)* | 9.3 → **0.5** *(or 1.7)* | no → **yes** | no → no (0.46 down) | 1248×93 → **21×21** *(or 47×40)* |
| 6 | Help right now | 390 | 2 → 2 | 0 → 0 | via menu → via menu | yes → yes | 44×44 → 44×44 |
| 6 | | 1440 | 1 → 1 | 0 → 0 | yes → yes | yes → yes | 71×40 → 71×40 |

*Task 5:* the first figure takes the new "Jump to 03" link; *(or …)* is the same stranger scrolling
past it. Taps + screens: 390 went from 5.8 to 4.1 with the jump (5.9 without it); 1440 from 11.3 to 3.5
(3.7 without it).

CLS on every task path: 0.000 → 0.000 in the main run. The Ride with me landing's shift is
intermittent and shows only on repeated loads (see the top of this report).

## Per task

### 1. What is this site, and whose is it?
- 1440: **fixed.** "I'm Robert. In 2027 I ride 10,000 miles, all on the bike." now shows on the desktop first screen, and the Group rides and Events tiles sit in one row with Ride with me. All three tiles are fully on the first screen. `t1-1440-01-home-first-screen.png`
- 390, 375, 360: unchanged and still good. The tiles sit 22px higher than before (lowest tile bottom 643 → 621 at 375×667, 616 → 594 at 360×640). "Read the last ride" is now on the phone's first screen too. `spot-375x667-home.png`, `spot-360x640-home.png`
- Unchanged: the name "Cycle for Change" is still never in readable words on the first screen. At 1440, typing a city into "Who do you cycle for?" still only changes the sign. The field is now under the tiles, at the fold.

### 2. Find a group ride in Phoenix this week
- 1440: **one tap fewer.** Group rides is on the first screen (163×93), so the 40px header link isn't needed. "Phoenix home" is on the first screen of /rides/ at both widths (122×44, was 104×44 and 0.66 screens down at 1440). `t2-1440-02…`, `t2-1440-03-tap-phoenix-home.png`
- Breadcrumbs on the Phoenix hub no longer read as plain text: the plain-link count went from 2 to 0.

### 3. When is Robert's next ride, and how do I ride it with him?
**Path adapted:** the homepage now names Tour de Palm Springs (Feb 6). The old script went looking
for Center Ride Out; the new one follows whatever ride the tile names.
- **Answered in one tap at both widths.** The link opens the riding page on the Palm Springs row, already open, with "Event site" on screen (390: y 317–365; 1440: y 264–312). The old mismatch is gone: the tile and the first "Robert's ride" row are now the same ride. `t3-390-02-tap-feb-6-ride-with-me-tour-de-pal.png`, `t3-390-03-answer-the-way-to-sign-up.png`
- The town-guide link ("Palm Springs guide →", 141×20) is out of the row's tappable summary.
- Still true: the way to ride it is a ghost button labelled "Event site". Nothing on the path says sign up or register.
- **Worse:** the landing shift described at the top.
- **Mismatch on the homepage:** the `#ride` block (6,340px down at 390) still says "Ride with me. A Los Angeles LGBT Center fundraiser April 23 to 25… Sign up with the Center". The first-screen tile now says Feb 6, Tour de Palm Springs. That's by design (CLAUDE.md §1 keeps `#ride` on Center Ride Out), but a stranger who scrolls sees two different "Ride with me" rides on one page.

### 4. Read his latest ride write-up
- **Fixed: 8 taps / 6.3 screens → 1 tap / 0 screens on a phone; 6 → 1 on desktop.** "Read the last ride" is on the first screen at both widths and goes straight to `…saturday-ride/#robert`. "I rode it" is at the top of the screen when it opens, with nothing over it. `t4-390-02-tap-read-the-last-ride.png`, `t4-390-03-answer-i-rode-it.png`
- The link's box is 143×25, but it has a 44px hit area (144×45). On the TSR page, a new "I rode it" jump in the head (68×32 hit area) also leads there.
- Landing on `#robert`: 0 of 8 loads shifted at either width.

### 5. How a charity ride's fundraising minimum works
**Path adapted:** the script now reads the words before a short link ("Short on the minimum? Jump to
03."), the way a stranger reads the new line on `/guides/`. Both ways in are measured above.
- 1440: **Guides is now in the desktop header** (47×40). The task drops from 9.3 screens to 0.5 (1.7 if you scroll instead of jumping). `t5-1440-02-tap-guides.png`
- 390: unchanged route through the menu; see "what got worse" for the 21px jump links and the card 105px lower.
- The guide's answer sits 0.05 (390) and 0.46 (1440) screens below where the page opens: just under the fold, after the photo.
- New plain-looking links: the guide's "Keep reading" links ("Pledge-per-mile fundraising", "Start a team") have no underline, color or arrow. They moved up to the first screen at 1440 (y 283 and 328, beside the lede), so a stranger meets them now. They were 2,450px down before.

### 6. Get help right now
- **Fixed on small phones.** `/resources/` now opens on its doors right under the h1, so the crisis card with 988 *and* the Trevor line is on the first screen at 390×844 (Trevor y 479–527, clear of the 988 bar), 375×667 and 360×640. The "Call 988" button is half under the 988 bar at 360×640, but the bar is itself tap-to-call 988. `t6-390-05-answer-988.png`, `spot-375x667-resources.png`, `spot-360x640-resources.png`
- **Fixed: 988 in the phone menu is now a tap-to-call link** (102×19, hit area 111×44). `t6-390-02-menu-open.png`
- 1440: still 1 tap ("Resources", 71×40).

## Every page at 390 — before → after

Hit areas are measured by probing the screen (`elementFromPoint`) from each target's centre, so a link
with an invisible 44px pad counts at its real size. The skip link is left out of the hit-area column.

| Page | Interactive on 1st screen | …under 44 (box) | …under 44 (hit area) | On page | …under 44 (box) | Smallest off the map (box → hit) |
|---|---|---|---|---|---|---|
| / | 5 → 6 | 0 → 1 | 0 → 0 | 49 → 52 | 17 → 19 | 108×16 "Powered by Strava" → same |
| /rides/ | 60 → 65 | 43 → 44 | 39 → 40 *(map + tally)* | 97 → 97 | 49 → 47 | 119×27 → 102×19 "988 call or text" (hit 112×36); map still to 1×2 (DC) |
| /rides/az/phoenix/ | 13 → 14 | 1 → 1 | 1 → 1 | 67 → 68 | 14 → **9** | 85×16 "← All of Arizona" → 102×19 (hit 112×35) |
| /rides/…-saturday-ride/ | 8 → 10 | 2 → 3 | 2 → 3 | 73 → 75 | 23 → **19** | 85×16 → 92×16 "OpenStreetMap" |
| /find-a-ride/ | 12 → 13 | 0 → 1 | 0 → 1 *(tally)* | 37 → 37 | 6 → **4** | 119×27 → 102×19 (hit 112×35) |
| /events/2027/ | 18 → 19 | 2 → 3 | 2 → 3 | 65 → 66 | 6 → 6 | 32×44 "Home" → 36×44 "Home" |
| /events/2027/riding/ | 11 → 10 | 4 → 3 | 4 → 3 | 41 → 36 | 12 → **6** | 141×20 "Palm Springs guide →" → 102×19 (hit 112×35) |
| /events/seattle-to-portland/ | 6 → 8 | 2 → 2 | 2 → 2 | 62 → 62 | 23 → **12** | 120×16 → 69×16 "weather.gov" |
| /towns/arizona/phoenix/ | 12 → 13 | 2 → 2 | 2 → 2 | 99 → 100 | 51 → **41** | 45×16 → 48×16 "No-drop" chip |
| /brief/ | 6 → 7 | 2 → 2 | 1 → 1 | 24 → 28 | 4 → 5 | 357×26 → 102×19 (hit 112×35) |
| /guides/ | 3 → 7 | 0 → **4** | 0 → **4** *(01/03/04 + tally)* | 51 → 56 | 7 → 11 | 123×16 → **17×21 "01"** |
| /guides/bike-tire-pressure/ | 3 → 4 | 0 → 1 | 0 → 1 | 86 → 87 | 65 → 64 | 7×16 citation "1" → same |
| /cyclefor/ | 6 → 7 | 1 → 2 | 1 → 2 | 36 → 38 | 9 → 10 | 144×22 → 102×19 (hit 112×35) |
| /resources/ | 5 → 8 | 1 → 2 | 0 → 1 | 34 → 36 | 9 → 9 | 125×16 → 102×19 (hit 112×35); PFLAG 54×23 |

- **Better:** fewer sub-44 targets per page on the ride hub (14 → 9), the TSR page (23 → 19), the riding page (12 → 6), STP (23 → 12) and the Phoenix guide (51 → 41).
- **Worse:** `/guides/` (0 → 4 under 44 on the first screen: the three jump numbers and the tally link).
- **Unchanged:** the `/rides/` map states (down to 1×2px), the tire-guide citations (7×16), the town-card chips (48×16), and the homepage footer's 16px trust links.
- Layout shift on direct loads: 0.000 on all 14 pages (`/brief/` 0.009 → 0.000).

## Small phones

| Size | Intro on 1st screen | Three tiles fully on 1st screen | Lowest tile bottom | /resources/ 988 on 1st screen | Trevor on 1st screen |
|---|---|---|---|---|---|
| 375×667 | yes → yes | yes → yes | 643 → 621 | yes → yes | no → **yes** |
| 360×640 | yes → yes | yes → yes | 616 → 594 | yes → yes | no → **yes** |

## Repeated landings (new check)

CLS depends on timing, so each link was tapped from the homepage 8 times in fresh tabs.

| Link | Width | Before | After |
|---|---|---|---|
| Ride with me | 390 | 0/8 shifted (`/events/2027/riding/`) | **3/8, max 0.583** (`…/riding/#tour-de-palm-springs`) |
| Ride with me | 1440 | 0/8 | **1/8, max 0.152** (4/10 and 0.28 in a separate 10-load run) |
| Read the last ride | 390 | (no link) | 0/8 |
| Read the last ride | 1440 | 0/8 (`#road`) | 0/8 (`…saturday-ride/#robert`) |

## What changed in the script

- **Task 3:** follows the ride the homepage tile names (was hard-coded to Center Ride Out). Checks whether the row is open on arrival and looks for the sign-up link inside that row.
- **Task 5:** a short link (four characters or less) can be picked by the words just before it ("Short on the minimum? Jump to 03"). `LAB_NO_CTX=1` turns this off; that run gave the *(or …)* figures.
- **Hit areas:** every tap and the page census now probe the real hit area (`__lab.hit`). The smallest tap is judged by the larger of box and hit area. This changed no before figure.
- **New:** the repeated-landing CLS check, `LAB_TASKS=n` to run single tasks, and a `DONE` marker.
- Tasks 1, 2, 4 and 6 needed no path change: "Read the last ride" (phone and desktop) and Guides in the header were found by their words with the same patterns as before.
