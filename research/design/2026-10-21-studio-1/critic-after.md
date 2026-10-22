# Critic, after — studio pass 1 (Oct 21, 2026)

Cold read. I had only the `after/` first screens and `after-tiles/` at 390 and 1440, STUDIO.md and CLAUDE.md §3. I did not see the brief, the notes, the diff or any before shots. I did not mark down the frozen identity: the stencil, the rose blank, the After Hours palette, Overpass, or the worn desktop hero stencil. The tally showing "—" and the blank external maps are from the offline capture, so they are not findings.

Pages I looked at: home, /rides/, the Phoenix hub, TSR, /find-a-ride/, /events/2027/, the riding page, STP, the Phoenix town guide, /brief/, /guides/, the tire-pressure guide, /cyclefor/ and /resources/. I saw every first screen at both widths, at least the first three tiles of each page at both widths, and the last tile of most pages.

## The score — 35 / 50

| # | Line | Score | Earned by | Why |
|---|---|---|---|---|
| 1 | First screen | 4 | `home@390-first`, `home@1440-first` | On the homepage, "I'm Robert. In 2027 I ride 10,000 miles" plus one dated Ride with me tile and two finder tiles tells you who, what and what next in five seconds at both widths. It loses a point on phones, where "CYCLE" sits over the busy HAUS jersey print, and on `guides@390-first`, which is 60% selfie with no guide showing. |
| 2 | Way-finding | 4 | `rides_az_phoenix@1440-first`, `rides_scottsdale-…@390-first` | Nav underlines the current section, crumbs look like links, and the footer is the same everywhere. The crumbs start from a different place in each section ("Find a ride / Group rides", "Group rides / Arizona", "Home / Events", "Events / Washington", "Towns / Arizona"). On `find-a-ride@390-first` the crumb is plain "Find a ride" sitting directly on an h1 that says "Find a ride". |
| 3 | Hierarchy | 3 | `events_seattle-to-portland@390-first`, `events_2027@390-04` | The homepage and /rides/ lead the eye well. Elsewhere a second thing outshouts the h1: the "07.10 Seattle" block is set bigger than the STP title, the rose "Missing an event" form is the loudest thing on the calendar, and the Phoenix hub on a phone is 18 equal-weight boxes in a row. |
| 4 | Finish | 3 | `home@1440-06`, `rides_scottsdale-…@390-02` | Hairlines line up, the tally numbers are tabular and the folds are tidy. Against that: a comma starts a line in the homepage sign, button widths are ragged, glyphs are glued to event dates, the riding-page rows truncate mid-phrase ("16 mi…", "Day 2…"), and pages end on loose links followed by dead air (`rides@1440-03` y 470–775). |
| 5 | Photography | 3 | `rides_az_phoenix@390-03`, `rides_scottsdale-…@390-first` | Every photo has a clean edge and a place and month caption, and they run edge to edge on phones. But the three biggest placements (home hero, guides hero, `#today`) are arm-out wide-angle selfies. The TSR film poster at the top of the ride page is soft and blown out. The Phoenix town photo sits at half width with nothing beside it (`towns_arizona_phoenix@1440-02`). |
| 6 | Consistency | 3 | `home@390-08` vs `events_2027_riding@390-first` | There is one card, one button family and one closing field, and most pages use them. Dates come in four formats ("Sat, Oct 24", "July 10–11, 2027", "07.10", "Apr 23 to 25, 2027"), and the same ride is "Apr 23 to 25" on the homepage and "23–25" on the riding page. /cyclefor/ and the phone homepage skip the bruise closing field (`cyclefor@1440-03`, `home@390-10`). |
| 7 | Desktop composition | 3 | `home@1440-first`, `find-a-ride@1440-first` vs `events_seattle-to-portland@1440-04` | First screens use the width: the split hero, tiles beside a portrait, the riding list beside a portrait, months beside kinds. Below the first screen, the detail pages collapse into a left-hand column with the right 40% empty for thousands of pixels (worst thing #1). |
| 8 | Phone comfort | 4 | `rides@390-first`, `resources@390-first` | Tap targets are big: 48px buttons, full-width search and Near me, and the 988 bar pinned on /resources/. The cost is length. Home, TSR, STP, guides and the town page all run past the 9,000 CSS px capture limit. |
| 9 | His | 4 | `rides_scottsdale-…@390-05`, `home@390-03` | The stencil, the blank that takes your word, his photos, "I rode it" in his own words, the "Monday monday" log row and "The carrot cake theory" all read as one man's site. The directory pages (/rides/, the hub, the calendar) are a tile directory that could belong to anyone once you are past the header. |
| 10 | Ease of reading | 4 | `guides_bike-tire-pressure@390-02`, `towns_arizona_phoenix@390-02` | Body text is 17–18px on phones with open leading and good contrast, and the guide measure is about 65 characters on desktop. The walls of text cost a point: the Phoenix intro is a single 19-line paragraph on a phone, and STP's town paragraph runs to 10+ lines (`events_seattle-to-portland@1440-04`). |

## Five things that most make it look cheap or hard to use (worst first)

1. **On desktop, the detail pages leave a column stranded on the left with the right 40% empty for screen after screen.**
   - `rides_scottsdale-az-scottsdale-cycling-saturday-ride@1440-03` and `-04`: the street map, the three route buttons, the write-up and the reviews all sit in x 96–814. Across both tiles, x 830–1344 is empty plaster.
   - `events_seattle-to-portland@1440-02` / `-04` / `-05`: the facts sidebar ends in tile 02. After that the body paragraphs run x 96–634 and the town-guide boxes stop at 814, with nothing to the right for about 4,000px.
   - `towns_arizona_phoenix@1440-02` to `-05`: the skyline photo, the ride list and the clubs text all stop at x 814 or narrower.
   - `guides_bike-tire-pressure@1440-02` to `-05`: paragraphs wrap at x 610 but the bullet lists run to 810, so the column changes width mid-section. The "Keep reading" sidebar ends in the first screen, leaving about 630px of bare plaster to the right.
   - `cyclefor@1440-02`: the left 600px is empty for the whole height of the form.

   This is the "phone layout stranded on a desktop" look, on exactly the pages people land on from search.

2. **The homepage's "Ride with me" sign breaks with a comma at the start of a line.** It reads "April 23 to 25 / **, I cycle for** / the Center", at x 96, y 730–990 on `home@1440-06` and x 34, y 1090–1365 on `home@390-08`. It is the biggest type in that section and the first thing the eye lands on there. A broken line at display size looks unfinished.

3. **Bordered boxes are the default, so directory pages read as medium-everything.**
   - On a phone, the Phoenix hub shows five stacked grids of hairline boxes before a single ride name: two door cards, six kind tiles, three made-for tiles, seven day tiles and a boxed button (`rides_az_phoenix@390-first` y 658–1690, `@390-02` y 126–855).
   - /guides/ is 21 identical bordered cards, each ending in a small "Read →" (`guides@390-02`, `-03`, `guides@1440-02`).
   - The town guide opens on seven boxes (`towns_arizona_phoenix@390-first` y 706–1690), and STP repeats the same seven (`events_seattle-to-portland@1440-05` y 160–493).

   Everything is the same size, weight and box, so nothing is big and nothing is quiet.

4. **The TSR ride page has about a dozen caps buttons in three treatments and ragged widths, and an information bar that looks like a button.**
   - On `rides_scottsdale-…@390-02`, y 880–1390, the bruise "Next ride Sat, Oct 24" bar sits directly on top of a bruise "@TSR_THESATURDAYRIDE ON INSTAGRAM ↗" button (which wraps to two lines). They look like the same kind of thing. Below them come an outlined ADD TO CALENDAR beside a loose underlined "Google Calendar", then SAVE and SHARE, every one a different width.
   - Then come DOWNLOAD THE GPX / BRIEF THIS RIDE / DIRECTIONS TO THE START at three widths (`@390-04` y 608–935), SEND NEXT WEEK'S ROUTE (`@390-05`), REVIEW THIS RIDE (`@390-06`) and three more outlined buttons with ↗ (`@390-08` y 1396–1607).
   - The desktop first screen has the same pile in two ragged rows (`@1440-first` y 665–837).

5. **The events pages bring in a graphic system of their own that clashes with the rest of the site.**
   - On `events_2027@1440-02` (y 600–905), the "12 events with their own page" tiles set dates as "11.20~" and "04.25✓", with the tilde and tick jammed against the numbers, over a busy topo-line texture, with the event names in small rose at the foot of each tile.
   - The same tile, blown up, becomes a second headline under the STP h1: "07.10 Seattle" is set bigger than "Seattle to Portland Bicycle Classic" (`events_seattle-to-portland@390-first` y 1360–1645, `@1440-first` y 719 on).
   - Lower on the calendar, the "Missing an event, or a date changed?" form is a full smeared-rose field with pale-pink helper text on rose (`events_2027@390-04` y 606–1700, `@390-05` y 0–632). It is the loudest block on the page. At 1440 it stops at x 920 and leaves the right third empty (`events_2027@1440-03`).

## Three things that already work, and must survive

1. **The homepage first screen** (`home@1440-first`, `home@390-first`). On desktop, the left half is a bruise field with the big stencil and the rose blank, and the right half is his photo, edge to edge. Under them come one line saying who and what, one dated Ride with me tile and two finder tiles. On a phone, everything down to the finder tiles fits the first screen. Each screen-height is about one thing, which is the clearest single screen on the site.
2. **The one ending.** It is a full-width bruise closing field with two actions, then the drained-pool footer with the giant stencil and the "change" plate, the same on every inner page (`guides@1440-05`, `rides_az_phoenix@1440-03`, `brief@390-02`, `resources@1440-04`). It uses big calm colour fields and a mark at real scale, and it is the most fashion-house thing on the site.
3. **The TSR route block and his write-up.** The stats row has big numbers ("44.1 mi", "1,911 ft"). The drawn route names each climb on square hairline plates, and the climb chart sits beside it on desktop (`rides_scottsdale-…@1440-02`, `@390-03`). Then "I rode it" follows in his own words, behind the rose rule (`@390-05`). It has a product site's clarity and one person's voice, on the same page.

Also worth keeping: /resources/ opens on the 988 door in a dark box with Trevor beside it, and the 988 bar pinned at the foot (`resources@390-first`, `@1440-first`). The homepage tally field (4,060 / 107 / 10,000 in powder rose on bruise, `home@1440-02`) is the right use of scale contrast.
