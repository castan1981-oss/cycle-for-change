# Brand read: studio pass 1 (`2026-10-21-studio-1`)

Branch `design/studio-pass-1`, `a488656..b6b390e`, read Oct 21, 2026, by `brand-ambassador`. b6b390e (the comma fix) landed while I was reading. I checked it: the words didn't change.

## BLOCK

Three photos break §10, one press state is still rose, and one action was added to the homepage's first screen.

1. **Words: pass.** No banned or retired words in any added or changed string. "Pledge" shows up only in internal names (`CHROME.pledge()`, `section.pledge`). The tally line still reads "training miles since June 1. The 10,000 start Jan 1." and is never set against 10,000. `/home.js` stopped rolling the count, so one number paints.
2. **Voice: pass.** The pass wrote no prose for Robert. Every change is a cut, a move, a label the site already used, or data (list below). No research notes reach a page.
3. **Lane Paint: FAIL.** `cfc-site/rides/rides.css:187` `.gr-save[aria-pressed="true"]{color:var(--creosote-ink)}`: the Save star on every directory row goes rose ink after a press. Chromium shows rgb(143, 62, 74) after a mouse click with the pointer moved away and after a tap, on 46 stars on `/rides/az/phoenix/all/`. §3 says "no rose on any hover or press". The studio's own `system.md` (line 146) said Save pressed should be asphalt. `.gr-save-btn` got that fix through `.btn[aria-pressed]`; the icon star didn't. Everything else here passes. No new color (every rgba in the diff was already there). No gradient or mask added (seven photo masks came out). No shadow except inset focus rings. Radius is 0 everywhere new; the round play buttons were already there and §10 names them. No new font. Rose came out of 28 hover and press rules.
4. **Banned look: pass.** Labels are 13px / 700, sentence case, letter-spacing 0. Only `.btn`-family buttons keep .04em caps. `--mono` points at Overpass. No serif italic, mono-caps-with-middots, `///`, wheel or "10000".
5. **Too polished: pass.** Every first screen I opened still has his things on it: the stencil and the rose plate, his photo on the homepage, his film and the "I rode it" chip on TSR, and "Try one of Robert's rides" on `/brief/`. One thing to watch: an event page's first screen is now words and two buttons, with the poster moved below the sign-up. That's right for a fact page, but nothing on that screen is his except the header mark.
6. **Photos: FAIL.** I looked at all 41 files the pass placed or changed at 1:1, in the served copies.
   - `cfc-site/img/ph/bike-wall-2.jpg` (and `.avif`/`.webp`), on `/guides/charity-ride-packing-list/`: the mirrored sunglasses hung on the bars reflect a **red pickup truck** on the street (about x 350–375, y 460–480 of the 1600×1200 file). The clean encode shows it more plainly than the old graded copy did.
   - `cfc-site/img/ph/gravel-road-2.jpg`, on `/find-a-ride/gravel/`: a **green-and-white vehicle** (bus, RV or truck) is parked in the tree line right of centre (about x 915–945, y 505–515 of 1080×1440).
   - `cfc-site/img/ph/pv-dusk-2.jpg`, on `/guides/what-happened-to-aids-lifecycle/`: **a rider coming up the road toward the camera, face front on** (about x 500–540, y 630–660). The studio pulled `south-mountain` for the same reason. If the rider is Robert, his word clears it.
   - The other 38 are clean: riders shown only from behind or far off, the only face is Robert's, no vehicles. Every figure carries its place and month.
7. **Health: pass.** No mental-health words were added to a town or ride page. 988 is now tap-to-call in the menu and the footer, with the same words ("988 call or text"). On `/resources/` at 390×844, the 988 line sits at 419px, Trevor (1-866-488-7386) at 478px and the Call 988 button at 578px, with the intro after the doors.
8. **Two actions: FAIL.** "Read the last ride" (`.sign-acts a.link--bone`, now pointing at `/rides/<slug>/#robert`) is new on the homepage's first screen at both 390×844 and 1440×900. It's a fourth action next to the three tiles Robert ruled in (Ride with me, Group rides, Events; Passes 34, 36 and 37). Before the pass it was hidden on phones and below the first screen on desktop. Everywhere else is fine: the closing block is down to two actions ("The live count" was cut), event pages have Sign up plus Official site, `/brief/` has Choose a ride file plus Try one of Robert's rides, and rows on the riding page open with The full page plus Event site.

**To clear the block:** crop or swap the three photos and bump their file numbers. Make `.gr-save[aria-pressed="true"]` asphalt. Keep "Read the last ride" off the first screen, or put it to Robert.

## Every added or changed visible string

- Header nav: "Field notes" → "Guides". Phone menu: "Town guides" → "Towns".
- Footer, Ride column: "Events" cut; "Brief a ride" added (the label `/find-a-ride/` already used).
- Tally line: the dot is gone; "— training miles since June 1. The 10,000 start Jan 1." is now a link to `/#road`, same words.
- Closing block: "The live count" cut.
- Ride with me tile, bar and menu: "Feb 6 · Ride with me · Tour de Palm Springs, Palm Springs, CA" (from `NEXT_RIDES`, Robert's Oct 21 call).
- Homepage:
  - "Next up, a Los Angeles LGBT Center fundraiser" → "A Los Angeles LGBT Center fundraiser".
  - "April 23 to 25, I cycle for the Center": same words; the comma now stays with the date.
  - `#today` caption is now "Phoenix · Oct 2026" (from data).
  - "Play" and "0:03": the reel's existing control.
  - A log row's title is now a link, with no new words.
- Ride pages: an "I rode it" chip (the section's existing heading). The film caption "From the ride, Oct 2026" became "From the ride, Scottsdale · Oct 2026" (the data's full caption).
- Event pages: the eyebrow and the poster's spec lines are cut. A new fact row, "Type", uses the existing kind labels ("Road", "Gravel", "Tour", "Charity ride", "Hill climb", "Mountain bike").
- `/events/2027/riding/`: "Robert's ride" and "· <town> guide →" cut from the rows.
- `/rides/`: "Or jump to … Outside the US" moved into the hero; the "Outside the US, N rides in N countries" door is cut.
- `/find-a-ride/`: the "Brief a ride, Drop a GPX: climbs, weather, water" tile is cut.
- `/guides/`:
  - A "My first TSR" link (his own `line` in `data/ride-notes.json`).
  - "01", "03" and "04" in the stage intro became links.
  - Card captions "Paradise Valley, AZ · Jul 2026", "Phoenix, AZ · Oct 2025" and "Phoenix, AZ · Oct 2026" (from the registry).
- New alt text, written by the pass for the new crops:
  - "The view from the South Mountain climb: a far range of mountains over the valley floor."
  - "Robert's red bike leaning on a painted wall, the LOVE mural behind it."
  - The pv-shadow card now uses the registry's alt text. ", a saguaro by the road" was cut from pv-cloud-road's.
- Moved with the same words: the `/resources/` intro, every hand page's back link, the `/rides/about/` note.
- The ten tire and wheel guides: "- " pseudo-bullets inside paragraphs became real lists, and the space before footnote numbers is gone. No words changed.
- `/brief/`: "Try one of Robert's rides" now shows on load.

## Already there before this pass (not counted against it)

- `cfc-site/rides/save.js` (the pass didn't touch it): after a Save, the "MY WEEK →" link and the "★ SAVED / MY WEEK →" toast render at 11px, uppercase, with .12em tracking, and the link is rose ink. That's a tracked caps label, under the 12px floor, and a rose link. It's the same fix as the star.
- The ride page's first screen at 1440 has five actions: Instagram, Add to calendar, Google Calendar, Save, Share. It had the same five before.
- Retired files are still in `cfc-site/`. Nothing links to them, but they can be reached by URL:
  - `img/card-journal.jpg` (a parked car)
  - `img/hero.jpg` (crew)
  - `img/people.jpg`
  - `img/ph/south-mountain.jpg` and `.avif`
  - `img/ph/pv-camelback-road.jpg`
  - `photos/crew.jpg`, `photos/finish-line.jpg`, `photos/south-mountain.jpg`
- The `/guides/` hero (`haus-road-2`) has no place and month line, because the registry's `haus` has none to give (`where: ""`).
- `camelback-sunrise-2` is newly placed on `/rides/az/scottsdale/`. A mailbox number (6043) and the 40th St sign can be read in it. It breaks no rule, but it's Robert's call.

## Resolution (lead, Oct 21, 2026, evening)
- Lane Paint (rose press state): fixed in 0d81ddf — the row star and the Save button go asphalt when pressed.
- Photos: fixed in 0d81ddf — bike-wall → stanley-dock, gravel-road → gravel-pines, pv-dusk → pv-sunrise-bars (all three replacements already on the site and cleared by this read).
- Two actions: **Robert's call, Oct 21: keep "Read the last ride" on the homepage's first screen** (it took his write-up from 8 taps to 1; a quiet text link, not a button). Fallback if it ever looks crowded on his phone: desktop only. Not a block.
