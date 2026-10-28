# Critic, cold read: the homepage, live vs the editorial proposal (v2)

Read from screenshots only: `before/` (live), `after2/`, `after2-reduced/`, `film2-phone-sheet.jpg`,
`film2-wide-sheet.jpg`. I read STUDIO.md and CLAUDE.md §3 for the bar and nothing else in research/.
Coordinates are CSS px. The 1440 tiles are 1440×1800 and the 390 tiles 390×1600, so a tile's pixels
are CSS px. On `390-first` (3x) I divided by 2.37, on `375se-first` by 2 and on `820-first` by 1.7.
I compared page length by adding up the tiles: before 390 ≈ 10,900 px, after 390 ≈ 12,600 px
(+15%); 1440 is about the same (≈ 10,550 → 10,200).

## The score

| # | Line | Before | After | Earned by |
|---|---|---|---|---|
| 1 | First screen | 4 | 4 | **B** `before/390-first`: his face, the sign, who and what, the dated Ride with me tile and both finder tiles all on one screen. It's held back at 1440 (`before/1440-00`): three Ride with me's on one screen (header 1220–1344 × 10–53, tile 96–341 × 649–741, bar 965–1383 × 886–946), plus the sign's input. **A** `after2/375se-first`: everything down to "Read the last ride" fits 375×667, with one primary. It's held back because the type lands on the person in the film, and in most frames you can't see who "I'm Robert" is. |
| 2 | Way-finding | 4 | 4 | **B** `before/1440-00`: mark, nav and button in the header, and labelled sections. **A** the section labels on hairlines and the numbered map that matches the list are good (`after2/1440-02`). Over the film, though, the 1440 header is five centred links (483–944 × 20–38) with no mark and nothing on either side. |
| 3 | Hierarchy | 3 | 4 | **B** `before/1440-00`: the stencil, two lines, three tiles, a link and "Who do you cycle for?" all compete on the first screen, and the rose 10,000 competes with 4,273 below it. **A** `after2/1440-first`: stencil → who and what → one primary → two quiet links, and the 10,000 is the page's one giant number (`after2/1440-01`). It's held back at `after2/1440-04`, where "Find a group ride." and "1,423" are stacked at the same size and weight (96–510 × 705–960). |
| 4 | Finish | 3 | 3 | **B** the footer links run together: "How rides are checkedPrivacyContact" (`before/1440-05` 605–825 × 1508). The hero tile is cut off at "Palm Spring…" (`before/1440-00` 108–326 × 721). The dark "What do you cycle for?" box is nearly empty (`before/390-01` 199–373 × 827–1194). **A** those bugs are fixed and replaced by near-misses. Text blocks have holes, photos miss each other's edges, the Thu Oct 22 row looks broken and the fact-table baselines don't line up (thing 4 below). |
| 5 | Photography | 4 | **3** | **B** `before/390-first`, `before/1440-00`: the hero is a crisp, close, ungraded still of his face. **A** the photos in the body got better: Boise and Paradise Valley are clean-edged and well cropped (`after2/390-01`, `after2/1440-00`). But the biggest picture on the page is now soft (`after2/820-first`), shows his face in one shot out of six (`film2-phone-sheet`), and has the type on top of its subject. At 390, `#today` puts two full-width pictures of the same wall and outfit one after the other (`after2/390-02` 25–315 and 383–868). |
| 6 | Consistency | 3 | 3 | **B** outlined tiles, ink buttons, a dark box, hairline rows: about one family. **A** there are three kinds of button on one page: the plaster hero tile (`after2/1440-first` 96–506 × 732–796), the ink "Sign up with the Center" (`after2/1440-04` 732–956 × 424–471), and the ghost "Search rides" and "Pause the film" (1202–1344 × 972–1024; 1248–1384 × 808–851). The opener sizes are mostly one, but "How this works." (`after2/1440-00` y 1215) and "Field notes…" (`after2/1440-04` y 1235) sit a tier lower. |
| 7 | Desktop composition | 3 | 4 | **B** `before/1440-03`: an empty block under Ride with me (96–684 × 1060–1330). The 2027 rows run the full width with about 380 px of nothing between name and place, and the field notes are 800 px lines. **A** the map sits beside the list, the photo beside the Center's text, and the notes are four columns: the width is used on purpose (`after2/1440-02`, `-04`). It's held back by two voids (thing 3 below). |
| 8 | Phone comfort | 4 | **3** | **B** `before/390-00`: a still hero, tiles 44+, about 10,900 px. **A** the first screen fits and the targets pass (pause 44×43 at 330–374 × 777–820). But a film starts on load over cellular, white type sits on bright frames you'd be reading in the sun, and the page is about 15% longer (≈ 12,600 px). That gives back Pass 37's cut on the very screen that was called "overwhelming". |
| 9 | His | 4 | 4 | **B** `before/1440-00`: the worn stencil on bruise next to his face, and the sign under his words. **A** the clean full-width sign at the foot (`after2/1440-05` 96–1252 × 0–143) and his photographs all the way down. The two most template-looking things on the page are new: the montage hero and the dashed dividers. |
| 10 | Ease of reading | 4 | 4 | **B** good measure, and small grey text kept to labels. **A** the story, orgs and Center blocks are set well (`after2/1440-03`, `-04`). The hero's reading surface changes brightness every 1–1.5 s, and the fact-table keys are tiny (`after2/1440-04` x 732). |
| | **Total** | **36** | **36** | |

**Rose:** 3 Hierarchy (+1), 7 Desktop composition (+1).
**Dropped:** 5 Photography (−1), 8 Phone comfort (−1).
The total is flat and two lines dropped, so under STUDIO.md this doesn't ship as it stands. Both drops
come from the hero film and the page length, not from the direction.

## Five things that most make the After look cheap, unfinished or hard to use (worst first)

1. **The type lands on the person in the film.** The scrim is measured up from the foot, so the
   stencil sits above it on the brightest part of every frame.
   - `after2/1440-first`: the rose blank (640–720 × 463–494) sits on the drone rider's helmet, and "FOR" (440–615 × 370–494) runs across his bike.
   - `after2/1440-00`: white "CYCLE" (96–385 × 370–494) sits on the light mint jersey and the blank sits on his wrist.
   - `after2/1024-first`: white "bike." sits on the white helmet (≈ 400–515 × 370–490).
   - `after2-reduced/390-first`, the poster: "CYCLE" sits on the jersey (≈ 89–192 × 295–367).

   The mark and the man fight and neither wins. In places this is under 3:1 for large text.
2. **The hero footage is soft, faceless and stitched.**
   - The phone cut is six shots of 1–1.5 s each (`film2-phone-sheet`). Only the first shows his face. The rest are a black silhouette in a tunnel, a fisheye underpass, riders' backs, a forest trail, a bike frame and a drone dot.
   - `after2/390-first` and `after2/820-first` catch the underpass. His face is black, and a saturated orange-red bar is the loudest colour on the first screen (390: 106–171 × 95–274; 820: 257–369 × 162–472). It isn't the rose.
   - At 820 the 608-wide cut is visibly mushy.
   - At 1440 the split puts warm drone dirt next to cool blue fisheye: two clips, not one picture.
   - The panel seam runs through the nav's "Resources": at 1440 the seam is x ≈ 910 and the word sits at 873–944 × 20–38; at 1024 the seam is x ≈ 675 and the word sits at 650–721 × 20–38.
   - The top-left of the wide poster is greyed by the scrim (`after2-reduced/1440-first` 0–500 × 0–350), which reads as a wash over the photo.
3. **Two desktop voids.**
   - The map in `after2/1440-02` stops at y 1457, but the list runs on into `1440-03` y 280. That leaves the left half (x 0–830) as empty concrete for about 800 px (`1440-02` y 1490–1800, then `1440-03` y 0–505). A still can't show whether the map is sticky; if it isn't, this is the worst hole on the page.
   - The search form in `after2/1440-04` is pushed to the bottom right (838–1344 × 953–1024) under a 300 px empty column (838–1344 × 670–945). Its button is a ghost outline, so the section's one action is its quietest element.
   - Smaller, in the same section of the map: the California dots 13, 6 and 4 overlap (`1440-02` ≈ 103–150 × 1185–1250). "15–18" and "23–25" fill their 63 px date blocks with about 6 px to spare (x 877–940). At 390 the org rides' blocks grow taller than the rest (`390-03`: Feb 6 ≈ 57 px at y 827–884, Apr 23–25 ≈ 67 px at 1143–1210).
4. **Near-miss alignment all the way down.** A fashion house never ships these.
   - "How this works" (`1440-00`): "I ride." is at y 1316 and its line at y 1382, a 50 px hole, because column 3's title wraps. The orgs repeat it (`1440-03`: one·n·ten at y 850, its line at y 917).
   - The story photos are staggered but miss each other's edges. Tops are at 1529 and 1633 (`1440-00`); bottoms are at 228 and 200 (`1440-01`), with the captions at two different heights.
   - In `#today` (`1440-01`) the photo starts at y 629, well below the section's start (label at y 430), leaving a 718 × 200 empty block beside the stencil (626–1344 × 420–629). The film ends at 1143 and the photo at 1167.
   - The Thu Oct 22 row has no name, so "31.7" drops 16 px below its date and the row looks broken (`1440-02` 432–507; `390-03` 65–83).
   - The fact-table keys ride about 5 px above their values (`1440-04` keys at x 732, y 244/297/350; values at y 249/302/355).
   - The 10,000's "1" starts at x 113 against a column edge at 96 (`1440-01`).
5. **Neither texture does anything, and the dashes read as a template divider.**
   - The lane dashes are a full-bleed row of about 42 px dashes with about 30 px gaps, a fixed distance under a section edge (`1440-00` y 925–937; `1440-04` y 1605–1615; `390-00` y 870–877; `390-06` y 1486–1492). Those are the proportions of `border-style: dashed` or a coupon's tear line, not lane paint, where the gap is several times the dash.
   - The asphalt on `#road` and `#sign` (`390-02` 985–1600, `390-03` 0–478, `1440-02`, `1440-05`) reads as dust or compression specks on a 3x phone and almost disappears at 1x.

   Both are restrained, but neither is finished.

## The accessibility floor (what a screenshot can show)

- **Contrast, fail or at risk:** the white stencil and hero lines over bright frames (thing 1). The
  check has to be done against every shot of the loop, not the poster. The worst frames I can see are
  the mint-jersey selfie under the type in the wide cut (`1440-00`) and the helmet under "bike." at
  1024. The bike close-up's white fence (`film2-*-sheet`) will be worse at mid-height.
- **Nav over the film, at risk:** the 15 px white links have no header field behind them. "Resources"
  crosses the seam onto the drone's tan dirt (`1440-00` 873–944 × 20–38), so measure it on the brightest frame.
- **Possibly under 12px, measure:**
  - the fact-table keys "3 days", "1 day", "Money" (`1440-04` x 732), which look about 11–12 px next to the 13 px captions;
  - the numbers inside the map dots and the row index numbers 1–13 (`1440-02` x ≈ 857), which look about 11 px.
- **Tap targets:**
  - The map dots are about 24 px at 1440 and smaller at 820/1024, where people use touch. If they're links, they're under 44.
  - The phone pause control is 44 × 43 (`390-first` 330–374 × 777–820), so it passes only just.
  - The hero links and the date tile pass.
- **Passes:**
  - A Pause/Play control at every width (WCAG 2.2.2).
  - Reduced motion shows the poster with "Play the film" (`after2-reduced/*`).
  - The search now has a visible label ("Your town or a ride name", `390-06` y 433).
  - Plaster on rose plates is about 4.6:1.
  - 988 and Trevor sit in the orgs room and the footer.
- **Not a floor item, but check it:** in the riders-from-behind shot there's a pale box at the right
  edge of the road (`after2-reduced/1440-first` ≈ 680–720 × 490–530; the same shot on the phone,
  `390-00` right edge ≈ y 450–500). I read it as a wall or a gate post. It needs a look against the
  no-cars rule.

## Three things that work and must survive

1. **The first screen's order on a phone:** the stencil, who and what in two lines, one primary (the
   plaster tile with the rose date), two quiet links and a pause, all inside 375×667
   (`after2/375se-first`). Desktop now has one Ride with me where it had three.
2. **The 2027 rides as dated blocks** (solid when confirmed, dashed when projected or TBA), with a
   numbered map that matches the rows (`after2/390-03`–`04`, `1440-02`–`03`), and **the orgs on
   patina** as their own room with 988 and Trevor inside it (`after2/1440-03`). The page now has
   rooms: concrete, bruise, patina, plaster, bruise, pool.
3. **The scale moments:** the giant plaster 10,000 on bruise (`after2/1440-01`), and the clean
   full-width stencil sign that ends the page over the drained-pool footer (`after2/1440-05`,
   `390-07`). These are the most his and the most finished things on the page. The new body
   photographs (Boise, Paradise Valley) belong with them.

## Against the bar

- **Finish (Assos, MAAP, Pas Normal, Rapha):** their hero films are shot for the frame. There's a clear
  area for the type, the footage is sharp at 2x, and one shot holds long enough to look at. This one is
  cut fast from action-cam footage, soft at tablet width, and the type lands on the rider. It reads as a
  template with a video in it, not a campaign. Below the fold it's much closer to the bar: big openers,
  colour in fields, date blocks. But the near-misses in thing 4 are exactly what those houses never ship.
- **Clarity (Specialized, Tesla):** yes. Who, what and the one action are on the first screen at every
  width, and that's better than live at 1440.
- **One person's site:** the sign at the foot, his words and his photographs say one man made it. The
  montage hero and the dashed dividers are the parts that could be anyone's.
