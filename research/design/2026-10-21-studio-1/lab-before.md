# Usability lab — before (studio pass 1, Oct 21, 2026)

The six core tasks from `research/design/STUDIO.md`, scripted as a stranger would do them, from the
homepage, finding things by the words on the screen. Built site as committed (`cfc-site/`), served
in-process, every request off 127.0.0.1 blocked (the tally shows "—" offline; expected, not a finding).
Phones 390×844 (is_mobile, touch, 2x), spot checks at 375×667, 360×640, 430×932; desktop 1440×900.
Reduced motion on.

Script: `scratchpad/lab/tasks.py` (`python3 tasks.py <site_dir> <out_dir>`), rerun unchanged for
`lab-after.md`. Screenshots: `scratchpad/lab/before/` in the session scratch folder
(`/tmp/claude-0/-home-claude/065fb8a8-1db5-530f-9a75-ba4101ea1410/scratchpad/lab/before/`), never in the repo.

**How it counts.** The stranger taps the words they want if they're on the screen; scrolls if they're
within half a screen; on a phone, tries the menu next (a menu with nothing costs two taps: open, close);
otherwise scrolls to the nearest match. *Taps* includes the menu button and the keyboard's Go key.
*Screens* = pixels scrolled by hand ÷ viewport height, summed over the path. *Way on 1st screen* = the
first tap was on the screen the task started on ("via menu" = one tap into the phone menu).
*Smallest tap* = the smallest box tapped on the path, CSS px. CLS was measured on every page of every
path; it is 0.000 everywhere except `/brief/` (0.009, the "How it's worked out" fold). Nothing moved
under a thumb.

## Results

| # | Task | Width | Taps | Screens | Way on 1st screen | Answer on 1st screen | Smallest tap |
|---|---|---|---|---|---|---|---|
| 1 | What is this, whose is it | 390 | 0 | 0.0 | — | yes | — |
| 1 | | 1440 | 0 | 0.0 | — | partly (whose yes, what no) | — |
| 2 | Group ride in Phoenix this week | 390 | 2 | 0.1 | yes | yes | 104×44 "Phoenix home" |
| 2 | | 1440 | 3 | 0.7 | yes | yes | **73×40** "Find a ride" |
| 3 | Next ride, and how to ride it with him | 390 | 2 | 0.8 | yes | date yes, sign-up no | 357×64 |
| 3 | | 1440 | 2 | 0.3 | yes | date yes, sign-up no | 124×44 |
| 4 | His latest ride write-up | 390 | **8** | **6.3** | **no** | no | 44×44 menu |
| 4 | | 1440 | **6** | 2.1 | **no** | no | **143×27** "Read the last ride" |
| 5 | Fundraising minimum guide | 390 | 3 | 2.8 | via menu | yes | 44×44 menu |
| 5 | | 1440 | 2 | **9.3** | **no** | no | 1248×93 |
| 6 | Help right now | 390 | 2 | 0.0 | via menu | yes | 44×44 menu |
| 6 | | 1440 | 1 | 0.0 | yes | yes | **71×40** "Resources" |

## Per task

### 1. What is this site, and whose is it?
| Width | Taps | Screens | First screen | Smallest |
|---|---|---|---|---|
| 390 | 0 | 0 | yes | — |
| 1440 | 0 | 0 | partly | — |

- 390: "I'm Robert. In 2027 I ride 10,000 miles, all on the bike." plus the line, then Ride with me and the two finder tiles, all on the first screen; also true at 375×667, 360×640, 430×932 (lowest tile bottom 643, 616, 908). `t1-390-01-home-first-screen.png`, `spot-*-home.png`
- 1440: the intro line is phone-only. The desktop first screen says "Robert. Phoenix. Mile 3,848 of training, on Strava. The 10,000 start Jan 1." — whose, yes; what, only as "the 10,000" with no noun. `t1-1440-01-home-first-screen.png`
- 1440: the biggest control on the first screen is the "Who do you cycle for?" field (520×56). A stranger who types a city there and presses Enter gets nothing but the word on the sign's plate. `t1-1440-02-typed-phoenix-in-the-first-screen-field.png`
- Both widths: the name "Cycle for Change" is never in readable words on the first screen (the stencil says CYCLE FOR + the blank; the name is in `aria-label` only).

### 2. Find a group ride in Phoenix this week
| Width | Taps | Screens | First screen | Smallest |
|---|---|---|---|---|
| 390 | 2 | 0.1 | yes | 104×44 |
| 1440 | 3 | 0.7 | yes | 73×40 |

Path 390: Group rides tile → /rides/ "Phoenix home" chip (just under the fold) → the Phoenix hub opens on "New to group rides? Phoenix Downtempo Ride, Every Monday, 8:00 pm", on the first screen. `t2-390-02…`, `t2-390-03…`, `t2-390-04-answer…`
- 1440: **the Group rides and Events tiles start at y=906 on a 900px screen**: entirely below the fold. Only Ride with me shows. The stranger goes through the header's "Find a ride" (73×40, under 44) → /find-a-ride/ "Group ride" → /rides/, where "Phoenix home" is 0.66 screens down under the map. One tap more than the phone. `t2-1440-01-home-first-screen.png`, `t2-1440-04-tap-phoenix-home.png`
- Breadcrumbs on the hub ("Group rides / Arizona") have no link cue (no underline, color or arrow).

### 3. When is Robert's next ride, and how do I ride it with him?
| Width | Taps | Screens | First screen | Smallest |
|---|---|---|---|---|
| 390 | 2 | 0.8 | date yes, sign-up no | 357×64 |
| 1440 | 2 | 0.3 | date yes, sign-up no | 124×44 |

- The homepage tile answers "when" on the first screen: "Apr 23–25, Ride with me, Center Ride Out". Good.
- **It opens a page that answers differently.** `/events/2027/riding/` lists six rides, and the first row is Tour de Palm Springs, Sat Feb 6, also tagged "Robert's ride" and earlier than Apr 23. A stranger asking "when is his next ride" now has two answers. `t3-390-03-tap-23-apr-23-25-center-ride-out.png`
- The link lands at the top of the list, not on the Center Ride Out row (the row already has `id="center-ride-out"`), and the row is closed.
- The way to ride it is a ghost button labelled "Event site", 0.8 screens down inside the opened row, under the facts table. Nothing on the path says "Sign up" or "Register". `t3-390-04-answer-the-way-to-sign-up.png`. The homepage's own "SIGN UP WITH THE CENTER" button is in `#ride`, about 8 screens down at 390, and no Ride with me link goes there.
- Each closed row on the riding page has a "Los Angeles guide →" link (134×20) inside the tappable summary: a thumb aimed at the row can leave the page instead of opening it.
- Breadcrumbs (Home / Events / 2027 calendar) have no link cue.

### 4. Read his latest ride write-up
| Width | Taps | Screens | First screen | Smallest |
|---|---|---|---|---|
| 390 | 8 | 6.3 | no | 44×44 |
| 1440 | 6 | 2.1 | no | 143×27 |

**No link from the homepage, the menu, the ride bar or the footer reaches the write-up.** The only
page that links `#robert` is `/nov7/`, which nothing links to.
- The homepage names the ride once: the log row "Sat Oct 10 **TSR** 93.0 mi", 3 screens down at 390. It's bold white text and not a link. The note under it promises "The big ones get a page: the route, the town, who was there, the footage" and links none of them. `t4-390-04-clue-tsr-in-the-log.png`, `t4-1440-03-clue-tsr-in-the-log.png`
- 1440: "Read the last ride" (143×27, under 44, hidden on phones) says *read* but scrolls to that Strava mileage log, not a write-up. `t4-1440-02-tap-read-the-last-ride.png`
- 390: the menu has nothing named for it (no write-up, blog, notes or TSR), so the stranger spends two taps there. `t4-390-02…`, `t4-390-03…`
- A stranger who now knows the word "TSR" opens the ride finder and searches it, which works (one result, the whole card is the target, 357×115). `t4-390-09-search-tsr.png`
- On the TSR page "I rode it" is 3.25 screens down at 390 (y=3,563 on a 10,264px page), after the route block. There is no jump to it at the top (the top links only `#reviews`), and when it scrolls in, its heading sits under the Ride with me bar. `t4-390-11-answer-i-rode-it.png`

### 5. How a charity ride's fundraising minimum works (a guide)
| Width | Taps | Screens | First screen | Smallest |
|---|---|---|---|---|
| 390 | 3 | 2.8 | via menu | 44×44 |
| 1440 | 2 | 9.3 | no | 1248×93 |

- 390: menu → "Guides, Notes · journal" → "How to hit your fundraising minimum" is the ninth card, 2.76 screens down (stage 03, Raise the money). When it first scrolls in, it's under the Ride with me bar. The guide's first paragraph answers it at the fold. `t5-390-04-tap-charity-rides-how-to-hit-your.png`, `t5-390-05-answer-what-the-minimum-is.png`
- **1440: Guides isn't in the desktop header** (Find a ride · 2027 calendar · Towns · Field notes · Resources), and there's no menu button at that width. The only way from the homepage is the "All 21 guides" row 7.6 screens down, then 1.3 screens on /guides/. `t5-1440-02-tap-all-21-guides-your-first-chari.png`. (Through Field notes it's 1 tap plus ~2.4 screens to a "Guides" link at the foot of that page; the guides list at 1440 is a single column.)
- The homepage's reading rows at 1440 (South Mountain, Paradise Valley, carrot cake, All 21 guides) have no link cue: no underline, no arrow, the same color as body text.

### 6. Get help right now
| Width | Taps | Screens | First screen | Smallest |
|---|---|---|---|---|
| 390 | 2 | 0 | yes | 44×44 |
| 1440 | 1 | 0 | yes | 71×40 |

- `/resources/`: 988 is visible without a tap at every width: the "Call or text 988" card, and on phones the fixed "Hard night? Call or text 988" bar (tel:988, 390×49). `t6-390-05-answer-988.png`, `t6-1440-03-answer-988.png`
- The Trevor Project line (y=798–846) **sits under the 988 bar at 390×844** and is off the first screen at 375×667 and 360×640. `spot-375x667-resources.png`. The crisis card is preceded by a six-line lede and "Where do you want to start?". CLAUDE.md says "crisis line right under the h1".
- The phone menu shows "988 call or text, any hour" the moment it opens, but **988 there is plain text, not tap-to-call**. Trevor's number beside it is a link. `t6-390-02-menu-open.png`
- 1440: "Resources" in the header is 71×40.

## Every page at 390 — tap targets on the first screen

| Page | Interactive on 1st screen | …under 44px | On page | …under 44px | Smallest target | Fixed bar once scrolled |
|---|---|---|---|---|---|---|
| / | 5 | 0 | 49 | 17 | 108×16 "Powered by Strava" | 61px |
| /rides/ | **60** | **43** | 97 | 49 | **1×2 Washington, DC** (map) · off the map 119×27 | — |
| /rides/az/phoenix/ | 13 | 1 | 67 | 14 | 108×15 "Scottsdale 44" (map) · off the map 85×16 "← All of Arizona" | 61px |
| /rides/…-saturday-ride/ (TSR) | 8 | 2 | 73 | 23 | 85×16 "OpenStreetMap"; sources 49×17 | 61px |
| /find-a-ride/ | 12 | 0 | 37 | 6 | 119×27 "The live count" | — |
| /events/2027/ | 18 | 2 | 65 | 6 | 119×27; breadcrumbs 32×44 | 61px |
| /events/2027/riding/ | 11 | 4 | 41 | 12 | 141×20 "Palm Springs guide →" (inside a row) | — |
| /events/seattle-to-portland/ | 6 | 2 | 62 | 23 | 120×16 "Seattle, Washington" | 61px |
| /towns/arizona/phoenix/ | 12 | 2 | 99 | **51** | **45×16 "No-drop"**, 35×16 "Gravel" (card chips) | 61px |
| /brief/ | 6 | 2 | 24 | 4 | 357×26 "How it's worked out" | — |
| /guides/ | 3 | 0 | 51 | 7 | 123×16 "the Phoenix field notes" | 61px |
| /guides/bike-tire-pressure/ | 3 | 0 | 86 | **65** | **7×16** citation "1" | 61px |
| /cyclefor/ | 6 | 1 | 36 | 9 | 144×22 "@cycl_eforchange"; checkboxes 24×24 (labels tappable) | 61px |
| /resources/ | 5 | 1 | 34 | 9 | 125×16 "← Read the Field Notes" | 49px (988 bar) |

- `/rides/`: 43 of the 60 targets on its first screen are map states under 44px (DC 1×2, Delaware 7×11, Connecticut 11×11, New Jersey 9×20). The search and "Every state, as a list" are the way around, and both are on the page.
- The homepage footer's bottom line ("How rides are checked", "Privacy", "Contact") is 16px tall on `/`; on inner pages the same links are 44px tall (`home.css` lacks the inner pages' fix).
- The Ride with me bar takes 61px off the foot of the screen on most pages once you scroll. On the tested paths it covered the "I rode it" heading and the fundraising guide card as each scrolled in.
- No layout shift on any of the 14 pages (CLS 0.000; `/brief/` 0.009).

## The three biggest problems

1. **His latest write-up can't be reached from the homepage** (task 4: 8 taps and 6.3 screens on a phone,
   6 taps on desktop, and only if you already know the word "TSR"). The ride's name in the log isn't a
   link, "Read the last ride" goes to a mileage log, the menu doesn't name it, and on the ride page it's
   3 screens down with no jump to it.
2. **Desktop 1440×900 hides the way in.** The Group rides and Events tiles start 6px below the fold, so
   task 2 takes an extra tap through a 40px-tall nav link. Guides isn't in the desktop header and there's
   no menu button, so task 5 is 9.3 screens of scrolling. The first screen never says "10,000 miles", and
   its biggest control is a field that only changes the sign.
3. **"Ride with me" gives two answers.** The homepage says Center Ride Out, Apr 23–25. The page it opens
   leads with Tour de Palm Springs, Feb 6, also "Robert's ride". The link doesn't land on or open the
   Center Ride Out row, and the way to sign up is a button called "Event site", 0.8 screens into it.

Also worth fixing: the Trevor line under the 988 bar on `/resources/` at 390, and off the first screen on
smaller phones; 988 in the phone menu isn't tap-to-call; the `/rides/` map's state targets (down to 1×2px);
the 16px chips and citations on town guides and tire guides; and breadcrumbs and homepage reading rows
that don't look like links.
