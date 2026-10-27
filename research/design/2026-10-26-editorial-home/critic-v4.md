# Critic, cold read: the homepage, live (Before) vs the v4 editorial proposal (After)

Read Oct 27, 2026. What I read: STUDIO.md, and CLAUDE.md §3 for what's frozen and what the Oct 26 opening allows.
Nothing else from research/: no brief, no earlier critique, no code.
Screens: `review/before/` (390-first, 390-00…06, 1440-first, 1440-00…05), `review/after4/` (390-first,
375se-first, 820-first, 1024-first, 1440-first, 390-00…07, 1440-00…05, 375se-full, 820-full, 1024-full),
`review/after4-reduced/` (390-first, 1440-first), `film4-phone-sheet.jpg`, `film4-wide-sheet.jpg`.

Coordinates are CSS px. Tiles: 390-xx are 1,600 px tall, 1440-xx are 1,800 px; a page position is
tile index × tile height + y. The 390-first and 820-first PNGs are 3x and 2x; I've converted.

## The score

| # | Line | Before | After | Earned by |
|---|---|---|---|---|
| 1 | First screen | 4 | 5 | Before 390-first: clear, but four ways out and the who-and-what sentence is set smaller than the line; at 1440 three "Ride with me"s (header, tile, the bar over the photo) and the sign's field all share the first screen. After 390-first / 375se-first: stencil and blank, a big "I'm Robert. In 2027 I ride 10,000 miles", one plaster tile, one quiet link, Pause. It all fits down to 375×667 and you know what to do in two seconds. |
| 2 | Way-finding | 4 | 4 | After: the strip under the hero (390-00 y 1093–1157) puts group rides and events one tap from the second screen, and the section labels sit on rules. Against that, 1440-first has no mark and no home at top left, only a floating nav slab. |
| 3 | Hierarchy | 3 | 4 | After: one size for every opener, and real scale contrast (1440-00 "It always says cycling" ~80 px against 13 px labels). It still slips in places: a whole screen on "10,000" (1440-01 y 1290–1640) that repeats the hero's sentence, and the dates fine print placed above the list (390-03 y 398–455). |
| 4 | Finish | 3 | 4 | Before: the empty dark "What do you cycle for?" box (before/1440-01 x 299–590), footer links run together ("How rides are checkedPrivacyContact", before/1440-05 y 1508), and the bar laid over the hero photo. After: rules, date blocks and grids line up and the footer is fixed. It's a low 4: see the five things. |
| 5 | Photography | 4 | **3** | Before: the hero still is crisp, his face, half the 1440 screen. After: the stills are good and well placed (Boise and PV staggered on 1440-00/01, edge to edge on 390-01/04), but the hero film is soft, hazy, mismatched in light and cut every second. The first image a visitor sees got worse. |
| 6 | Consistency | 3 | 4 | After: one row (date blocks, dashed when projected), one label-on-a-rule, one link style, plates used one way. Still three button looks on one page (plaster tile, ink "Sign up with the Center", ghost "Search rides"), and the strip's three labels come in two styles (1440-00 y 1062–1098). |
| 7 | Desktop composition | 3 | 4 | Before: the 2027 rows put the name at x 240 and the detail at x 838 with nothing between them, and the field notes run as full-width single rows. After: two hero panels, the map on eight columns over a two-column list, orgs in three, field notes in four, a giant closing sign. Dead blocks remain (see 5 below). |
| 8 | Phone comfort | 4 | 4 | After: a big primary tile, a 47×46 Pause, a full-width search with a visible label. The film costs data on cellular, the page is ~6% longer (11,600 vs 10,900 px), and the loop's "Play" control is a small text line. |
| 9 | His | 4 | 4 | After: more of his pictures and the sign at the end. But three of the film's four shots are anonymous riders from behind or above, and the full-bleed video, centred translucent nav, giant stat, three-up icon row and pinned US map are all moves you see on template sites. |
| 10 | Ease of reading | 4 | 4 | After: good measures (field notes at ~40 characters, story at ~45), ink on patina reads well. Against that, the hero's regular-weight line sits over a background that changes every ~1 s. |
| | **Total** | **36** | **40** | |

**Rose:** first screen, hierarchy, finish, consistency, desktop composition (+5).
**Dropped:** photography (4 → 3).
**Same:** way-finding, phone comfort, His, ease of reading.
By the bar ("raises the total without dropping any line") this doesn't ship as is. Photography is the line to win back.

## Footage vs how it's used (photography, line 5)

- **The footage itself** caps the line at about 4. The sources are low resolution and go soft above about 600 px. The forest shot
  is mush at 1440 (after4-reduced/1440-first, x 0–1025). The dawn road shot is hazy at the source. Nobody can fix that
  until the originals arrive.
- **How it's used** costs the other point:
  - The poster at 1440 (after4-reduced/1440-first, 1440-00) gives the softest, most anonymous shot (forest, rider from
    behind) the 1,025 px panel. His face, the one sharp and recognisable shot, is squeezed into the 410 px panel at
    x 1030–1440.
  - On portrait screens the hazy dawn shot fills the top half with empty milky sky that reads as a wash: 820-first
    y 0–550 (47% of the screen), 390-first y 0–330, 375se-first y 0–250.
  - The pairs don't share light. 1440-first puts saturated red dirt (x 0–1025) beside the milky dawn road
    (x 1030–1440). The poster puts a dark green forest beside a saturated blue-sky selfie.
  - In the drone shot the only person in the frame sits right under "FOR" and the blank (1440-first x 600–830,
    y 280–640; 1024-first x 420–610, y 240–560).
  - The pace: the phone sheet shows four shots in nine half-second frames, and the wide sheet three pairings in seven.
    That's about one second per shot, so the ground under the reading text changes every second, and a 4 s loop shows
    its seam fast.

## Five things that most make the After look cheap, unfinished or hard to use (worst first)

1. **The hero film is soft, hazy and twitchy, and the best shot is in the smallest place.** This is everyone's first
   screen, at every width.
   - 820-first y 0–550: half the screen is blank haze.
   - 1440-00 / after4-reduced 1440-first: soft forest at x 0–1025, his face in the sliver at x 1030–1440.
   - 1440-first: warm dirt beside milky dawn. The drone rider is hidden under the mark at x 600–830, y 280–640.
   - Cuts every ~1 s (film4 sheets).

   A MAAP or Pas Normal hero holds a sharp, graded shot for 2–4 s. This reads as phone clips stretched to billboard size.
   The reduced-motion phone poster (after4-reduced/390-first, his face under a blue sky) is the best frame of the lot.
2. **The desktop header over the film is a floating dark slab with nothing at top left.** 1440-first: the five links
   sit in a translucent box at x 462–965, y 6–56 (1024-first: x 270–742). It looks like a tooltip or a browser
   overlay, not a header, and it's the only box over the film apart from the tile. The top-left corner, where a
   stranger looks for the mark and a way home, is empty down to y 370. On phones the menu is a grey square floating on
   sky (390-first x 326–373, y 8–55), lighter than everything around it.
3. **"Read the last ride" left the first screen. Core task 4 got slower.** Before, it was one tap on the first screen
   (before/390-first y ~818, before/1440-first y 767). Now it sits under the log: about 4,795 px down on a phone
   (390-02 y ~1595 into 390-03 y 0–18) and about 3,730 px down at 1440 (1440-02 x 944–1087, y 128). Nothing above it
   points at the write-up. Robert's write-ups are the site's "big thing", and now the page makes you hunt for the
   newest one.
4. **The "today" block looks like something is missing.**
   - 390-02 y 358–635: the 3 s loop is 222 px wide at x 16–238. Its "Play / 0:03" control floats alone at x 255–310,
     y 585–630, and the rest of the row is empty. It reads as a missing element (the Before had a panel there).
   - 390-01 y 1150–1520: label, small stencil, plate, line and link are spread over 370 px with ~70–80 px gaps and no
     picture. It looks empty, not airy.
   - 1440-01: the loop (y 770–1058) and its control row (y 1078–1092) miss the photo's bottom (1082) and caption (1096)
     by 24 and 12 px. Near misses read as sloppiness.
5. **The worn rose dashes and the strip they sit on.** The texture is restrained, three thin strokes, but it isn't finished.
   - 390-00: the first dash is ~204 px (y 883–890, x 18–222) and overshoots its column. The next two are ~167 px each
     (y 1053–1060, x 18–185 and 204–372). That's two lengths of "lane mark" on one screen.
   - At 1440 (1440-00 y 942–950) they're even, but the ragged ends and notch are the only rough edges on a page of square
     corners and hairlines. Over a stat they don't mark anything, so they read as a brush-stroke underline from a kit.
   - Under them, the first label is a two-line gunmetal sentence while the other two are bold ink links
     (1440-00 y 1062–1098; 390-00 y 975–1157). The three columns don't match.

Smaller things, all real:
- **Map dead zone.** At 1440 the four columns beside the map are empty (1440-02 x 944–1344, y 940–1380). Under them sits
  a key with one entry ("Phoenix", y 1388) and the fine print.
- **Toronto off the map.** Dot 9 floats on blank concrete off the US outline (1440-02 at 746, 1094).
- **Empty log column.** The log room's right column is empty under two links (1440-02 x 944–1344, y 160–560).
- **"10,000" off the edge.** The "1" starts at x ≈ 112, against the 96 px edge everything else uses (1440-01 y 1290–1580).
- **A different-looking row.** "Thu Oct 22" has no ride name, so its date is set in the name style and the row looks
  like another kind of row (390-02 y 1382; 1440-02 y 382).
- **Search parked low.** "Find a group ride" puts the search bottom right with the h2's right side empty
  (1440-04 x 838–1344, y 650–800).

## Accessibility floor (what a screenshot can show)

- **Tap targets to measure.** Some visible controls are smaller than 44 px, and the screenshots can't show their hit areas:
  - The loop's "Play" (390-02 x 255–310, y 585–600; 1440-01 y 1078–1092) is one ~15 px text line.
  - The footer's trust links (390-07 y 330–345) are 13 px text with ~18 px gaps.
  - The strip's "group rides worldwide" and "events in 2027" (390-00 y 1143–1157) are single 14 px lines.
  - If the "me / one·n·ten / change" plates are controls, they're 26 px tall (390-01 y 430–455). That fails.
- **12 px floor on the map.** The numbers in the outlined dots ("13", "11", "12" at 1440-02 142,1151 / 254,1252 /
  279,1325) look at or under 12 px. Check them.
- **Greyed projected rows.** Chino Grinder, El Tour de Tucson and Recovery Ride (390-03 y 1250–1450; 1440-02/03) are set
  lighter than gunmetal. At 14 px on concrete they need measuring against 4.5:1.
- **Text over the film.** The intro and the line held on every frame I saw. The weakest spot is the 14 px "Find a group
  ride" over the drone's lit dirt (1440-first x 96–234, y 818–834). I can't measure a moving ground from a still, so this
  relies on the contrast script being run against every frame.
- **Motion.** Pause is always there and 47×46 on phones (390-first x 326–373, y 772–819). Reduced motion shows the
  poster with Play (after4-reduced). That passes. The one-second cuts aren't a WCAG failure (nothing flashes 3×/s), but
  they make the hero harder to read.
- **Passes visible here:**
  - The search field now has a visible label (390-05 y 1085). It only had a placeholder before.
  - 988 and Trevor are on the page, in the orgs room and the footer, where "mental clarity" comes up.
  - Everything down to Pause fits a 375×667 first screen.
- **Not judged:** focus states. They aren't visible in any capture.

## Three things that already work and must survive

1. **The first screen's structure.** The blank sits on the FOR line, "I'm Robert…" is bigger than the line under it,
   there's one plaster tile with the date on a rose plate, one quiet link and Pause, and it fits from 375×667 to 1440
   (375se-first, 390-first, 1440-first). That's Tesla-grade clarity. Keep it while the film is fixed.
2. **The 2027 rides.** At 1440 the drawn map sits over a two-column list of date blocks, dashed when projected or TBA,
   with rows matched across the columns (1440-02 y 960–1800, 1440-03 y 0–292). On phones the date-block list is the
   cleanest list the site has (390-03).
3. **The rooms at the end.** The orgs on patina with the names bottom-aligned so the descriptions share a line, and
   988 / Trevor inside the room (1440-03 y 490–1545; 390-04). Then the giant closing sign, CYCLE FOR plus the blank
   across the full width (1440-04 y 1600 to 1440-05 y 440), which bookends the hero. Both look like this site and no
   other.

## Against the bar

- **Clarity (Specialized, Tesla):** the first screen now meets it on a phone. One line, one action.
- **Finish (Assos, MAAP, Pas Normal, Rapha):** below the hero, the grid, rules, date blocks and type scale are the
  closest the site has come to Assos precision. The hero isn't there. Those houses lead with one sharp, graded,
  held image. This leads with soft clips that change every second and leave half a portrait screen as haze.
- **The rough marks:** the rough dashes are the one thing none of those houses would ship next to square, hairline type.
- **One person's site:** it reads as his wherever his face, his words and the sign are. It reads as a template in the
  video-hero/centred-nav/three-up/US-map stretch.

The fixes that would most move the score: give the face shot the big panel or the first frame at every width, drop the
dawn shot from portrait, hold shots longer, put the mark back at top left on desktop, put a way to the latest write-up
back above the fold, and finish the today row.
