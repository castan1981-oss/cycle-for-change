# Critic, before: studio pass 1 (Oct 21, 2026)

Cold read from screenshots only: `before/*-first.png` and `before-tiles/*.png`, 14 pages at 390 and 1440.
I looked at every first screen and at least the first three tiles of each page at both widths, plus the last
tiles of rides, find-a-ride, towns, brief, guides, resources and the Phoenix hub. Coordinates are CSS px.
1440 tiles are 1:1. Phone tiles are 2x, so I halved their coordinates. I didn't score the offline tally
dash, blank map tiles or the "Forecast unavailable" box.

The bar: a cycling fashion house's finish, a product site's clarity, one man's own site.

## The score: 28 / 50

| # | Line | Score | Earned by | Why |
|---|------|:-----:|-----------|-----|
| 1 | First screen | 4 | `home@390-first`, `home@1440-first` | Who (his face, "I'm Robert"), what (10,000 miles in 2027, all on the bike) and the next tap (Ride with me, Apr 23–25) all fit above the fold at both widths. It loses a point because inner first screens don't hold that standard (STP, and TSR on a phone). |
| 2 | Way-finding | 3 | `guides@1440-first`, `events_seattle-to-portland@390-first` | There are breadcrumbs everywhere and an underlined current nav item at 1440. The trouble is that one place goes by two or three names. The nav lights "Field notes" on a page titled "The guides". Breadcrumbs start at Home, Events, Group rides, Find a ride or Towns depending on the page. STP's trail begins at "Events", but no nav item has that name. |
| 3 | Hierarchy | 3 | `events_seattle-to-portland@1440-first` | The home page orders well. STP opens with two headlines ("07.10 Seattle", then "Seattle to Portland Bicycle Classic") and shows the date four times on one screen. On the directory pages, rose counts, labels and tags compete with the titles. |
| 4 | Finish | 2 | `events_seattle-to-portland@1440-02` | In the fact grid, values in one row sit at three different heights. Elsewhere: captions sit off the column edge, tile rows leave holes, the guide has a list that never got formatted (raw "- " marks run into the paragraph), and one accordion has a "+" at both ends. A fashion house wouldn't ship it. |
| 5 | Photography | 2 | `rides_az_phoenix@1440-02` | The photos of him are the best asset on the site. But most are soft video stills, feathered or washed into the page. On desktop they often appear 456px wide with nothing beside them. |
| 6 | Consistency | 2 | `rides_scottsdale-az-scottsdale-cycling-saturday-ride@1440-first` | One 180px block holds five treatments for five actions. Across the site there are four input styles and three borders on the same town-guide tiles. The footer is drained pool on the home page and bruise everywhere else. |
| 7 | Desktop composition | 2 | `towns_arizona_phoenix@1440-first` | The home and cyclefor pages use the width. Every directory, event, town and tool page is an ~820px column on the left with the right third empty from header to footer. |
| 8 | Phone comfort | 3 | `rides@390-first` | Targets are big, and search plus NEAR ME work with one thumb on the first screen. But home, guides, towns, STP and TSR each run 8,000–9,000px. On TSR, when and where sit below a near-full-screen video. The "Details" links on the riding list are small grey text. |
| 9 | His | 4 | `home@390-03`, `rides_scottsdale-…@390-06` | The stencil, the blank, his face, "CYCLE FOR change" painted on the ground in his own photo, "TSR 1, Bobby 0": this could only be his site. It slides toward a template on the directory pages, which are icon-tile grids with rose counts (`find-a-ride@1440-first`). |
| 10 | Ease of reading | 3 | `guides_bike-tire-pressure@1440-first` vs `events_seattle-to-portland@1440-03` | The guide reads well: the answer comes first, lines run ~70 characters and the leading is generous. Elsewhere, STP body copy runs ~105 characters a line, the town page has a ~45-character strip, the resources disclaimer is one ~180-character line, and STP sets 12px rose text over contour lines. |

## Five things that most make it look cheap or hard to use (worst first)

**1. On desktop, the inner pages are a phone column stranded on the left.**
- `towns_arizona_phoenix@1440-first`: the 4×2 tile grid stops at x≈916 against a 1344 edge. Its 8th cell is an empty hole. Below it, the intro paragraph is a 365px strip (x 96–460, ~45 characters a line) with nothing beside it. `towns_arizona_phoenix@1440-full` shows the right ~430px empty for the whole 6,000px.
- `rides_az_phoenix@1440-02`, about halfway down: the canal photo is portrait, 456px wide at x 96–552, with ~800px of bare concrete to its right. It's feathered on all four sides and floats between "All 46 rides, with filters" and "The town guide". `find-a-ride@1440-02` (Robert, Paradise Valley) and `events_2027_riding@1440-02` (Robert, peace sign) do the same thing.
- `events_2027@1440-first`: the month grid, kind tiles, photo and 12 event tiles all end at x≈916. The right 40% under the nav is empty all the way down.
- The closing dark slab ("I'd like to say I ride for everyone else…") is 820px wide and pinned left on every page (`rides@1440-03` y 668–1000, `guides@1440-05` y 190–483). On the tire-pressure guide it's centered at x 400–1040 instead (`guides_bike-tire-pressure@1440-06`). So the one shared block doesn't even have one position.

**2. Control soup: too many kinds of button, input and tile.**
- `rides_scottsdale-…@1440-first`, bottom block, y 747–858: a dark three-cell Instagram bar (icon | label | ↗), a light three-cell "Add to calendar" bar (dark icon cell | label | →), a bare underlined "Google Calendar" link, and two caps outline buttons, SAVE and SHARE. That's five looks in 110px. Further down (`…@1440-03`) come DOWNLOAD THE GPX (filled) plus four more outline buttons: BRIEF THIS RIDE, DIRECTIONS TO THE START, ZOOM IN, SEND NEXT WEEK'S ROUTE.
- Four input styles:
  - white with a 2px dark border (`home@1440-06`, "Your town or a ride name")
  - concrete fill with a 1px border and a search icon (`rides@1440-first`)
  - white with a pale grey border (`cyclefor@390-02`)
  - underline only, on a rose field (`events_2027@1440-03`)
- The same town-guide tiles (Ride / Coffee / Fix / Sleep…) appear three ways:
  - dark ink borders with sub-lines (`towns_arizona_phoenix@390-first`)
  - grey borders without sub-lines (`rides_az_phoenix@390-03`)
  - grey borders with sub-lines (`events_seattle-to-portland@390-08`)
- "ADD YOUR CLIP" (`cyclefor@390-02`, y≈700) is a thin, light-weight caps button unlike any other button.
- The accordion on `find-a-ride@1440-02` (y≈694) has a "+" at both ends of a centered label.

**3. Photographs are treated as filler.** They're feathered, washed, soft, placed off-grid and unrelated to the section around them.
- `guides@390-first` / `guides@1440-first`: the hero is bleached and dissolved into the concrete, so it reads like a faded print. "The guides" label sits on the washed-out part.
- `find-a-ride@390-02`: the top of the photo melts into a blue-grey haze band (y≈200–260), and the image itself is a soft, compressed video still.
- `rides@1440-02/03`: the sunset group shot is blown up to 1248px, blooming, with its edges vignetted into the page.
- Captions sit off the column edge: x≈107 on `rides_az_phoenix@1440-02` and `find-a-ride@1440-02`, x≈116 on `events_2027@1440-02`, against the 96 edge.
- Robert's own word for a feathered photo was "unfinished", and that's what these look like.
- The good ones (`home@1440-first`, the LOVE mural at `home@1440-03`, the TSR pack video) show what the rest should be: big, crisp, with a clean edge.

**4. Ride and event pages bury the answer and give the page two headlines.**
- `rides_scottsdale-…@390-first`: below the title, the video fills from y≈353 to the bottom of the screen. When, where and pace, plus "Next ride Sat, Oct 24", only appear on screen two (`…@390-02`). On a ride page those are the answer.
- `events_seattle-to-portland@1440-first`: a full-width topo banner says "07.10 Seattle" at display size. Its right half carries 12px rose text laid over dense contour lines (x 889–1296, y 316–491), and those lines run straight through the address. Then a second display headline repeats the event name. In one screen the date appears as "07.10", "July 10–11, 2027" (twice) and "Saturday, July 10, 2027, 5:00 a.m. through…".
- `events_2027_riding@390-first`: each row is a middot-chained run, "Palm Springs, CA · road · Various charities · 101 mi, 88, 77, 64 (metric), 33 (half-metric), 16 mi… ·", cut off mid-phrase. Every row also carries a rose "Robert's ride" tag, on a page titled "The 2027 rides I'm doing".

**5. Every page ends the same cheap way: a pile of links, a dark slab, a sliver of concrete, another dark slab.**
- `rides@390-03`: three loose links. "What's rolling tonight →" and "How we check rides…" have icons and start at x≈40. "Add a ride we're missing" has no icon and starts at x≈16. Then comes the bruise CTA slab. Its text is inset ~22px, so it's off the 16px gutter. Next is a ~64px concrete band, then the bruise footer. Two dark slabs with a sliver between them read like a rendering seam. The same sequence shows on `find-a-ride@390-03`, `towns_arizona_phoenix@390-09` and `brief@390-02`.
- At 1440 (`brief@1440-02`, y 293–900), the footer's big stencil fills the left ~430px and the rest is ~500px of empty bruise.
- The footer is drained pool on the home page (`home@390-10`) and bruise on every other page (`guides@1440-06`, `resources@390-06`), so the last thing a visitor sees isn't even the same color site-wide.

## Smaller, but on the list

- **Rose is spent in bits, not held back for fields.** On `rides_az_phoenix@1440-first` every tile number is rose, and so is every eyebrow label. On `towns_arizona_phoenix@390-first` there's a rose subtitle plus rose labels and icons on all seven tiles. `brief@390-first` has rose square bullets, and guide cards end in rose "Read →" links. The one place rose becomes a large field is a utility form (`events_2027@1440-03`). Meanwhile the inner pages are a single concrete field from header to CTA slab, with no plaster, patina or drained-pool rooms. That's the "blocky and plain" read.
- **The guide shows raw markdown.** On `guides_bike-tire-pressure@1440-02` (y≈539, 657, 774; also the bottom of `@390-02`), "…not the exact numbers: - **Model.** … . - **Thesis.** … . - **Small study.**" is a list that rendered inline. Footnote numbers also float loose after a space ("suspension losses" ¹ ¹³.).
- **Fact-cell values don't share a top line.** On `towns_arizona_phoenix@1440-02`, "Best months" starts at y≈228 while "Nearest airport" and "Group rides" float at y≈316–327. The same icon (the race crosshair) marks both "Best months" and "Group rides".
- **Tile rows leave holes while their hairline runs the full width.** See `guides@1440-02/03` (2 of 4 and 3 of 4), `resources@1440-02` (3 of 4), the lone "Gravel" tile on `rides@1440-03`/`rides@390-02`, and the lone "Brief a ride" tile on `find-a-ride@1440-first`.
- **A date breaks across a line.** `home@1440-06` sets "April 23 to / 25, I cycle for".
- **Time formats don't match.** The TSR page has "Every Saturday, 6:00 am" in one cell and "Sat, Oct 24, 6:00 AM MST" in the bar right below it.
- **The home page asks the same question twice within two phone screens, and one ask is an empty box.** The dark "What do you cycle for? / Say it on video →" tile (`home@390-03/04`) is followed by the "Who do you cycle for?" sign and "Say it on video. Five seconds." (`home@390-06`). At 1440 that dark tile is a 290×340 box with a heading at the top, a link at the bottom and nothing in between (`home@1440-02`).
- **The events month grid is a checkerboard of plaster and concrete fills** (`events_2027@390-first`) that carries no meaning.

## Three things that already work, and must survive

1. **The home first screen at both widths** (`home@390-first`, `home@1440-first`). At 1440, the worn stencil and the blank sit on bruise with his face on the right, which is the closest thing on the site to a fashion-house cover. "I'm Robert. In 2027 I ride 10,000 miles, all on the bike." and the Ride with me tile land in five seconds. The stats band below (3,848 / 102 / 10,000 on bruise, `home@1440-02`) is real scale contrast.
2. **The TSR ride page's route kit and his write-up.** The drawn route has its climbs named in boxes. The climb chart and the rose line on a grey map (`rides_scottsdale-…@1440-02`, `@390-03`) are drawn clean on one stroke, on brand and useful. Then come "I rode it" in his own words with the rose rule (`@1440-03`) and the "TSR 1, Bobby 0" review (`@390-06`). That's "the most useful thing" and "his" in one place, and it's the model for every ride page.
3. **The guide's reading column** (`guides_bike-tire-pressure@390-first`, `@1440-first`). A big h1, the answer first in a ~20px lead, ~70-character lines, generous leading and the evidence level stated plainly. It's the one page where reading is easy, and every long page should borrow its measure.

Also must survive: the sticky "Hard night? Call or text 988" bar on `resources@390-first`, which puts the crisis line on the first screen with no tap.

## For Robert, not the studio

CLAUDE.md §3 says photo edges "dissolve into the page (`mask-image`, the `.ph` figure)". STUDIO.md's bar says "a clean edge, not a fade into the page", and you called a feathered photo "unfinished". The screenshots follow §3, and that's what thing 3 above is about. The studio needs you or the art director to say which rule wins before it touches the photos.
