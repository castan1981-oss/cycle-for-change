# Critic, cold read — homepage, Before (live) vs After (v7)

Oct 27, 2026. What I read: `research/design/STUDIO.md`, CLAUDE.md §3 (the identity and the Oct 26 editorial
opening). What I looked at: `review/before/` (390-first, 390-00…06, 1440-first, 1440-00…05), `review/after7/` (390-first,
375se-first, 820-first, 1024-first, 1440-first, 390-00…07, 1440-00…05, 375se/820/1024-full), `review/after7-reduced/`
(390-first, 1440-first), `film7-phone-sheet.jpg`, `film7-wide-sheet.jpg`. No briefs, no notes, no code, no other passes.
Both columns are scored on one scale in this one sitting.

Coordinates are CSS px inside the named tile. The 390 tiles are 1600 px tall, the 1440 tiles 1800 px.

## The score

| # | Line | Before | After | Change |
|---|---|---|---|---|
| 1 | First screen | 4 | 5 | +1 |
| 2 | Way-finding | 4 | 4 | held |
| 3 | Hierarchy | 3 | 4 | +1 |
| 4 | Finish | 3 | 4 | +1 |
| 5 | Photography | 4 | 3 | **−1** |
| 6 | Consistency | 4 | 4 | held |
| 7 | Desktop composition | 3 | 4 | +1 |
| 8 | Phone comfort | 4 | 4 | held |
| 9 | His | 4 | 4 | held |
| 10 | Ease of reading | 4 | 4 | held |
| | **Total** | **37** | **40** | **+3** |

**Rose:** first screen, hierarchy, finish, desktop composition. **Dropped:** photography. Under STUDIO.md's rule ("raises
the total without dropping any line") the After doesn't ship as it stands. A core task also got slower (thing 3 below).

### Line by line

1. **First screen.** Before 4 (`before/1440-first`): the phone first screen is clear, but on desktop three Ride with me's
   share one screen (header button 1220–1344 × 10–54, the tile at 96–341 × 649–741, the bar at 965–1383 × 886–947) and the
   "Who do you cycle for?" field (96–616 × 830–925) competes with them. After 5 (`after7/375se-first`): stencil, who and
   what, his line, one primary with the date plate, one quiet link and the pause button all fit 375×667. Nothing competes.
2. **Way-finding.** Before 4 (`before/390-first`): four doors on the first screen (Ride with me, Group rides, Events, Read
   the last ride) and a mark to get home. After 4 (`after7/1440-02`, `1440-03`): labels on rules ("13 rides", "Group rides",
   "Read") and the numbered map tied to the numbered list are real gains. But the first screen dropped from four doors to
   two, and Read the last ride is now about 5,000 px down on a phone (thing 3).
3. **Hierarchy.** Before 3 (`before/1440-03`): medium-weight rooms one after another, and 1,425 said three times on one
   screen (tile, the 1,425 numeral at 756–978 × 580–655, the counts table). After 4 (`after7/1440-01`): each room has one big
   thing, like the 10,000 at 96–1075 × 1290–1575 and the closing stencil. The biggest type on the page repeats the hero's
   sentence, though ("miles in 2027, all on the bike", 96–461 × 1600–1630).
4. **Finish.** Before 3 (`before/1440-05`): the trust links run together as "How rides are checkedPrivacyContact"
   (605–825 × 1508), the tile truncates "Palm Spring…" (`before/1440-first` 108–326 × 721), the bar sits on the photo, and
   there's a 270 px dead gap (`before/1440-03` y 1060–1330). After 4 (`after7/1440-02`, `1440-03`): the map, the date
   blocks, the two-column list and the labelled rules are drawn precisely and the old bugs are fixed. The empty header slab
   on every first screen keeps it from 5 (thing 2).
5. **Photography.** Before 4 (`before/390-first`): a crisp, ungraded still of him fills the phone's first screen. After 3
   (`after7/820-first`, `after7-reduced/1440-first`): the stills further down are better placed than ever (on the grid,
   clean edges, place · month captions, `1440-01`, `1440-04`), but the hero is the most important picture and it is now
   the softest one on the page. It's shown at the largest size and cut every second (thing 1).
6. **Consistency.** Before 4 (`before/1440-02`, `1440-04`): one button family, but the mark colors are mixed (rose org and
   step marks). After 4 (`after7/1440-00`, `1440-03`): the marks are all ink, there's one ink primary per screen, and the
   column starts line up at 96 / 520 / 944 from the strip down to the orgs. Against that: the #today clip is a 230 px
   thumbnail at 1440 and full-bleed at 820 and 390, and in the strip the first number gets a two-line sentence while the
   other two get link labels (`1440-00` y 1060–1095).
7. **Desktop composition.** Before 3 (`before/1440-04`): the 2027 rows have an empty 380 px middle (455–838) and the
   reading list is a full-width stack of text. After 4 (`after7/1440-01`, `1440-02`): a staggered story spread, the map on
   eight columns, a two-column list and four reading columns. Three rooms still hold a left column with the right half
   empty (thing 4).
8. **Phone comfort.** Before 4 (`before/390-00`): big tiles, everything one thumb away, a still that costs little. After 4
   (`after7/390-first`, `390-05`): the primary is a 76 px plaster tile, pause is 47 px, and the find field now has a
   visible label. Against that: the page is about 8% longer (≈11,850 px against ≈10,930), the hero plays on cellular, and
   the fact table wraps its values into a 218 px column (`390-05` 157–297 × 650–825).
9. **His.** Before 4 (`before/390-01`): the stencil, his line, his selfies and the sign. After 4 (`after7/1440-04` foot,
   `1440-05`): the same words, more of his photographs, a map of his year and the sign at the foot at full scale. A
   full-screen film under a nav bar is the most common template move there is; the stencil and his words over it are what
   keep it his.
10. **Ease of reading.** Before 4 (`before/1440-02`): good measures, ink on concrete. After 4 (`after7/390-01`,
    `1440-03`): good measures, and the patina room reads well. The hero's regular-weight line now sits over moving footage
    (see the accessibility notes).

## Where the owner's footage caps it, and where the use does

**The footage itself.** These clips run about a second each, top out at 864×1080 and have no originals behind them. No
layout can make that crisp at 820 and up. The phone cut is 608 px wide, stretched to 820 CSS px on a 2x screen. The wide
cut's panels are stretched from sources no wider than 864 to a 1024 px panel. One-second clips also force either hard cuts
or a very short loop. That alone holds photography at about 3 for the hero, and nothing about how it's cut changes that.

**The way it's used (separate from the cap):**
- It runs full screen (100svh) at every width, so the softest material gets the most pixels. `after7/820-first` is the
  worst: the forest trees across 0–820 × 64–600 are visibly smeared and blocky.
- The phone loop is three shots of about a second each (`film7-phone-sheet`: two frames per shot), so the words sit on a
  hard cut every second. It reads like a GIF, not a film.
- Which frame lands under the type isn't controlled. In the forest shot the stencil sits on the rider's back and shorts:
  `after7/390-first` stencil 19–192 × 342–502 over the rider at ≈55–232 × 290–515; `after7/820-first` stencil
  34–429 × 720–800 over the shorts at ≈195–472 × 684–885. In the wide mint shot his face drifts down until FOR crosses his
  mouth: `after7/1440-00`, F and O at 440–560 × 370–495 against his chin at ≈450–530 × 380–410. Compare
  `after7-reduced/1440-first`, where the face clears the stencil.
- The wide film swaps its shots. In `film7-wide-sheet` frame 5 (second row, first cell) the rear forest shot takes the
  wide panel and his face is squeezed into the 410 px sliver.
- Under the scrim the forest frame turns flat grey-brown (`after7/390-first`, the whole upper half). That's the
  "washed-out picture behind words" that move 6 names.

## The five things that most make the After look cheap, unfinished or hard to use (worst first)

1. **The hero is the softest picture on the page, shown biggest, cut every second, with type on the wrong part of the
   frame.** `after7/820-first`: smeared trees across 0–820 × 64–600, and the stencil (34–429 × 720–800) on the rider's
   shorts. `after7/390-first`: the stencil (19–192 × 342–502) on the rider's back and shorts. `after7/1440-00`: FOR
   (440–560 × 370–495) crosses his mouth. `film7-phone-sheet`: three one-second shots looping. This is the first thing
   anyone sees, and it's the one place the references never cut a corner.
2. **The header over the film is an empty black slab.** `after7/390-first` 0–390 × 0–64 is solid tar with only the menu
   icon (348–374 × 27–37). `after7/1440-first` 0–1440 × 0–64 has five links centered at 483–944, with nothing from 0 to 480
   or from 945 to 1440: no mark, no Ride with me. The same goes for `1024-first` (links at 290–722) and `820-first` (menu
   only). It reads as a header that failed to load, and an opaque 64 px band cuts the top off a "full-screen" film.
3. **Read the last ride and Events left the first screen; task 4 is slower.** Before, Read the last ride was on the
   phone's first screen (`before/390-first` 17–159 × 810–833) and on desktop's (`before/1440-first` 96–239 × 758–785), with
   Group rides and Events as tiles beside it. After, it's at `after7/390-03` 17–158 × 248–262, about 5,050 px down the phone
   page, and at `after7/1440-02` 363–506 × 503–527, about 4,110 px down at 1440. Under STUDIO.md that counts as a slower
   core task.
4. **On desktop, three rooms are a left column with the right half empty.** The dark room: the 10,000 stops at 1075
   (`1440-01` 1290–1575), and the last-rides list holds 96–814 while 814–1344 × 0–630 of `1440-02` is bare bruise.
   That's about 1,200 px of dark room carried by its left 60%, where the Before filled the right with the road film
   (`before/1440-01` 841–1344 × 1162–1790). The others: the queer line on patina (`1440-03`, text at 96–740 × 1120–1325,
   760–1344 empty), the map's key column (`1440-02` 944–1344 × 990–1400, empty above the key) and the sign's field
   (`1440-05`, 96–800, right half empty).
5. **#today is a thumbnail in a box at 1440, a soft clip blown up at 820, and a repeat on the phone.** `1440-01`
   96–326 × 768–1092 is a boxed 230×288 clip with a 64 px round play button (179–243 × 879–943) and a "Play 0:03" bar, beside
   an 824 px photo. Move 6 says no thumbnails in boxes. At 820 (`820-full`) the same 3-second clip runs about 820×1025,
   more screen than any crisp still gets. On the phone (`390-02`) it sits directly under the LOVE-wall selfie (0–390 ×
   0–290 and 0–390 × 355–840): the same wall and the same white kit twice in a row. The group above it is loose too
   (`390-01`: plate foot at 1307, line at 1375, link at 1490, next block at 1596), so the space inside the group is as wide
   as the space between groups.

Also seen, smaller:
- The unnamed ride shows an en dash as its name (`390-03` 17–27 × 35; `1440-02` 96–106 × 377). It reads as a placeholder.
- The strip's three rose dashes (`1440-00` 98–325, 522–749 and 946–1173 × 941–948) are identical, so they read as three
  equal bars rather than lane paint. With the four powder-rose log bars and about a dozen plates, I count roughly 18 rose
  marks on the 1440 page, so rose isn't rare any more. The single powder dash above the closing stencil (`1440-04`
  98–325 × 1557) is the restrained one and it works.
- The San Francisco AIDS Foundation name wraps to two lines (`1440-03` 944–1155 × 795–853), so the three org names don't
  share a top line.
- On desktop the find field (`1440-04` 838 × 788) starts 150 px below the heading's top (640).
- The asphalt texture is restrained: it barely registers at a glance (`1440-01` y 1210 and down) and doesn't look dirty.

## Accessibility floor (what a screenshot can show)

I can't see an outright fail in these screenshots. These are the close calls to measure:
- **Contrast over the film.** The closest calls are the regular-weight line and "Find a group ride" over the forest frame
  (`after7/390-first` 17–360 × 600–640 and 17–155 × 785–805; `after7/820-first` 35–395 × 920–965). If the contrast check
  has to fail anywhere, it will be on these frames.
- **Gunmetal on patina is 4.2:1.** It fails for small text if any is used in the orgs room. The org lines and "If it's
  now" (`1440-03` 96–153 × 1397) look darker than gunmetal in the screenshot, so check the actual color.
- **Tap targets (house floor 44 px).** The map's numbered dots are about 26 px (`1440-02`, for example 8 at
  162–189 × 1044–1071), if they're links. "Powered by Strava" (`390-03` 17–125 × 97–110), the inline "on Strava"
  (`390-00` 195–254 × 972–987) and the footer trust links (`390-07` y 572–586) all look about 15–20 px tall. The trust links
  were the same in the Before.
- **The closing field's label.** If "Who do you cycle for?" (`390-06` 17–233 × 980–1000) is a heading rather than a
  `<label>`, the field's only visible cue is a placeholder that disappears once you type. The find field's new visible
  label (`390-05` 17–168 × 1330) is a fix to keep.
- **Smallest type.** The list's row numbers and small plates ("the Center", "SFAF", `1440-03` 215–296 × 144–160) sit right
  at 12 px.
- **Passes as seen.** Pause is always there (47 px at `390-first` 326–373 × 772–819). Reduced motion shows his face as the
  poster with Play instead of Pause (`after7-reduced/390-first`). 988 and Trevor are in the orgs room and the footer.
  Focus states can't be judged from these screenshots.

## Three things that already work and must survive

1. **The first screen's order and its one action.** `after7/375se-first`: stencil, "I'm Robert. In 2027 I ride 10,000
   miles, all on the bike.", his line, Ride with me with the Feb 6 plate, one quiet link, pause. All of it fits 375×667,
   and the reduced-motion poster is his face. This is the line that rose most and it's right.
2. **The 2027 map with the numbered list.** `1440-02` y 1020–1800 and `1440-03` y 0–360: numbered ink dots, outlined dots
   for projected and TBA dates, a square for Phoenix, the numbers matched in a two-column list, and dashed date blocks for
   projected rows. There's no rose and no route drawn. It's the most finished thing on either version, and it's clear in
   the Specialized sense.
3. **The rooms that carry real scale, and the stills on the grid.** The closing stencil on bruise (`1440-04` y 1557 and
   down, `1440-05`) and the 10,000 are what "big things really big" means. The story spread puts the photos on the grid
   with clean edges and place · month captions: Boise and Paradise Valley (`1440-00` 626–1344 × 1536 and down, `1440-01`)
   and the Paradise Valley portrait (`1440-04` 96–602 × 0–480). Keep both. Also keep the two small fixes: the find field's
   visible label and the spaced trust links.

## Against the bar

- **Clarity (Specialized, Tesla).** The After meets it on the first screen and in the 2027 map and list. One sentence,
  one action, and a year you can read at a glance.
- **Finish (Assos, MAAP, Pas Normal, Rapha).** The drawn parts meet it: the map, the date blocks, the labelled rules and
  the closing sign. The hero doesn't. Those houses never run a hero softer than the rest of their photographs, and they
  don't put an opaque bar with five centered links over it. Today's live hero still is crisper than the new film at every
  width.
- **One person's site, not a template.** It's still his: the stencil, the plates, his own sentences, a map of his year,
  "You don't have to be queer to ride with me", and the sign at the foot. The full-screen film under a nav bar is the
  generic part. Right now it's carried by the identity over it, not the other way round.

**Verdict:** 37 → 40 on one scale, a real gain in clarity and composition. Photography dropped, though, and task 4 is
slower, so by the studio's own rule it isn't ready. Most of the drop is the footage, but not all of it: the 820 and up
full-bleed sizing, the one-second phone loop, uncontrolled frames under the type and the empty header slab are choices,
not the footage.
