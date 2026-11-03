# Critic, cold read: the homepage, before vs after3 (Oct 27, 2026)

Read: STUDIO.md, CLAUDE.md §3. Looked at every tile in `scratchpad/review/before/` and `after3/`, both
`after3-reduced/` first screens and both `film3-*` sheets. Nothing else. Coordinates are CSS px. The `*-first`
captures are device-scaled (390 at 3x, 820 and 375 at 2x), so their numbers are already converted. The 390 tiles
are 1600 tall and the 1440 tiles 1800 tall, each counted from the top of the tile.

## The score

| # | Line | Before | After | Δ | Earned by |
|---|---|---|---|---|---|
| 1 | First screen | 4 | 4 | = | **B** 390-first: face, sign, who and what, Ride with me, two finder tiles. Clear, but it's three tiles and a link, and at 1440 Ride with me shows three times (header, tile, bar). **A** 390-first, 1440-first: CYCLE FOR with the blank right after FOR, who and what, one plaster primary with the date plate, one quiet link, Pause. Better hierarchy. It doesn't get a 5 because on most frames the top half is haze (820-first y 0–650) or other riders' backs sit under "I'm Robert". |
| 2 | Way-finding | 4 | 4 | = | **B** solid header with the mark and nav, labelled sections, footer. **A** labels on hairlines ("13 rides", "Group rides", "Read") help, and the stat links go somewhere. Over the film the header is just a hamburger on a gradient (390-first x 348–374, y 26–37), and at 1440 the nav floats with an empty top-left. |
| 3 | Hierarchy | 3 | 4 | **+1** | **B** 1440-00/03: the three stats are the same size, Ride with me and Find a group ride sit side by side as equals, and How this works ends up near the bottom. **A** real scale contrast: the film, then the 10,000 at about 300 px (1440-01 y 1300–1595), the openers at about 84 px, the sign at the end. Rose is overused, though: three dashes, three plates and the date plate all in the first two screens. |
| 4 | Finish | 3 | 3 | = | **B** footer trust links run together ("How rides are checkedPrivacyContact", 1440-05 x 605–825, y 1508), the empty dark tile in #today (1440-01 x 299–590, y 0–387), the ride bar laid over the hero photo. **A** fixes those, then adds new ones: lane dashes off the grid, the map cut short, list rules that don't meet across the gutter, a plaster sliver at 390. Five things below. |
| 5 | Photography | 4 | 3 | **−1** | **B** one crisp still of his face as the hero, the LOVE-wall pictures, the reel poster. **A** the still photography gets better: the Boise portrait (1440-00 x 626–1026) is the best picture on the site, and the staggered pair and the Paradise Valley portrait beside the Center ride are well placed. But the hero is the biggest picture on the page, and it's soft at 820 and up, mostly haze and backs, in four different lights, with a dark band across the sky under the nav. See "Footage vs use". |
| 6 | Consistency | 3 | 4 | **+1** | **B** three kinds of tile on one screen, "Apr 23 to 25, 2027" next to "Apr 23–25". **A** one primary style, one link style, one date block, one plate, one rule label. Still mixed: the stat labels (1440-00 y 1070–1106: a grey regular sentence with an underlined link, then two bold ink links with arrows and no underline) and two heading sizes for sections of the same rank. |
| 7 | Desktop composition | 4 | 4 | = | **B** a 50/50 hero, three-column stats and orgs, but a sparse Find column (1440-03 x 756–1344, y 1000–1250). **A** on the 12-column grid almost everywhere (stats on columns 1, 5 and 9; photos on 6 and 10; the form on 8). Two places miss: the map ends at x 1096 of 1344, and #road's right column is two lines over 420 px of empty bruise (1440-02 x 944–1344, y 160–580). |
| 8 | Phone comfort | 4 | 4 | = | **B** big tiles, finders on the first screen. **A** one-thumb primary tile, labelled search field, Pause at 48×47 (390-first x 326–374, y 772–819). It costs a film on cellular, a page about 6% longer (about 11,640 vs 10,930 px), and one tile that looks like a thumbnail (#5). |
| 9 | His | 4 | 4 | = | **B** stencil, the blank, his face, his words. **A** his rides on film, his places on every caption, and the page ends on his sign where you type the blank. The giant numeral and the numbered-dot map are the two most template-like moves. At 1440 the hero often gives the man the site is about 30% of the width (1440-00 x 1030–1440). |
| 10 | Ease of reading | 4 | 4 | = | Both have good measure and leading, and body text passes AA on concrete. **A** the 390 lede breaks at about 190 px on a 358 px column (390-03 x 16–207, y 297–345, "Part of the 10,000 / miles."), and the fact-table labels are small (1440-04 x 732–771, y 327–445). |
| | **Total** | **37** | **38** | **+1** | |

**Rose:** Hierarchy (+1), Consistency (+1). **Dropped:** Photography (−1). **The other seven didn't move.**
By STUDIO.md's rule (the total rises with no line dropping) **this doesn't ship yet**. Photography has to come back to
4 first. The film is what's holding it down.

## Footage vs use (the hero)

- **The footage itself:** the sources are soft. The phone cut is stretched about 2.7x on a 2x screen at 820 (the
  mountains and trees in 820-first y 550–800 are mush), and the dirt texture in the 1440 left panel smears. The road
  shot is mostly blown haze (820-first, the top 55%). Four shots, four lights: saturated blue noon, milky dawn, green
  forest, orange dirt. Three of the four don't show his face. Nobody can fix that in CSS. **With his original clips, and
  a road shot that isn't half sky, this line is a 4.**
- **How it's used:** the dark band behind the nav reads as a dirty lid over the pale sky (1440-00 x 0–1024, y 0–60
  dark, then a white band at y 120–180; 820-first y 0–106; 390-first y 0–50). The wide cut pairs the hazy dawn road with
  the saturated blue-sky face in one frame (1440-00 / after3-reduced 1440-first), so the two panels don't share a light.
  The words scrim takes the dirt panel down to mud (1440-first x 0–1024). The scrim is needed for contrast. The lid and
  the pairing are choices.

## Five things that most make the After look cheap or hard to use (worst first)

1. **The hero film at 820 and up looks soft and washed, and it's the first thing anyone sees.**
   - 820-first: the top 0–650 px is a milky fog gradient under a grey band (0–106).
   - 1440-first: the left panel is a smeared, scrim-muddied dirt texture, cut by a 6 px seam at x 1024–1030.
   - 1440-00 (the poster): "I'm Robert" (x 96–608, y 535–615) sits over two other riders' backs in haze, and his
     face is in the 410 px right panel.
   - MAAP or Pas Normal would never open on a soft clip. Footage and use are split out above.
2. **The rose lane dashes are off the grid and read as stray brush marks, not road paint.**
   - 1440-00 y 926–936: three dashes at x 108–398, 578–861 and 1040–1333 over stats that start at 96, 520 and 944.
     They miss their columns by 12, 58 and 96 px and share an edge with nothing.
   - The same three repeat on the #sign field (1440-04 y 1588–1600).
   - At 390 it's a single dash centred at x 95–295 (390-00 y 868–876; 390-06 y 582–590), on a page where everything
     else hangs off x 16.
   - With the date plate and the blank, the first two screens at 1440 show five rose marks. That isn't "rare, so it
     means something".
3. **The 2027 map is a cropped viewBox, not a composed figure** (1440-02 x 96–1096, y 967–1562).
   - It stops 248 px short of the content edge (1344).
   - The grey Canada and Great Lakes fill ends in a hard vertical cut at x 1096. Texas and Florida are sliced flat
     along the bottom (y about 1562), and Washington is clipped at the top.
   - "■ Phoenix" floats alone under it (x 96–163, y 1585).
   - Dots 4, 5, 6 and 13 pile up on the California coast with crossing leaders (x 110–170, y 1190–1275).
4. **The two-column ride list doesn't line up, and its plates are too small** (1440-02 y 1660 → 1440-03 y 410).
   - The rows with a plate (Center Ride Out, Cycle to Zero) are about 90 px tall against 73 px for the rest. So the
     right column's rules (1440-03 y about 227 and 317) miss the left column's (244 and 334) by 17 px across the gutter.
   - At 1440 the plates shrink to about 11 px text on a 15 px plate (1440-03 x 215–290, y 193–207 and x 215–257,
     y 283–298), and the row numbers 1–13 at x 110–120 repeat what the date blocks already say.
   - At 390 the same list is the best thing on the page (see below). At 1440 it loses its finish.
5. **On a phone, the #today film is a thumbnail in a box with dead space beside it** (390-02 x 16–238, y 326–640).
   - It's a 222 px tile with Play and 0:03 under it, and 136 px of empty concrete to its right. The before had a
     partner tile there; the after just took it away.
   - Same family of seams:
     - a 51 px plaster sliver between the patina orgs room and the Paradise Valley photo (390-04 y 1287–1338);
     - the lede breaking at about 190 px (390-03 x 16–207, y 297–345);
     - at 1024 the "mental clarity" plate looks like it wraps onto two lines (1024-full, about x 45–330,
       y 820–905; check it at full size).

Also seen, not in the five:
- #road's right column is nearly empty (1440-02 x 944–1344, y 160–580).
- The stat links have no underline while "on Strava" next to them does (1440-00 x 520–692 and 944–1066, y 1078).
- "Field notes, guides, the journal." and "How this works." are set at half the size of the other openers, though
  they're sections of the same rank (1440-04 y 1220; 1440-00 y 1213).
- The 10,000's "1" starts at x 112, off the 96 edge (1440-01).
- The facts table's values start at x 872, which isn't a column (1440-04).

## Three things that already work (keep them)

1. **The first screen's order:** CYCLE FOR with the blank right after FOR (it finally reads as a sentence with a
   blank), who and what, his line, one plaster primary with the rose date plate, one quiet link, Pause or Play
   (390-first, 1440-first, after3-reduced). Ride with me appears once, not three times. The phone poster opens on his
   face (after3-reduced 390-first).
2. **The date blocks** for the 2027 rides on a phone: solid for confirmed, dashed for projected and TBA, one row
   rhythm (390-03 y 425–1395). The orgs room on patina carries the 988 and Trevor line inside the section
   (1440-03 y 613–1667; 390-04). Real information design, and it's his.
3. **The page ends on its own idea:** the giant stencil with the empty powder-rose plate and "Who do you cycle for?
   Type it." on the bruise field, then the pool footer with its stencil hidden (1440-04 y 1560 → 1440-05 y 525;
   390-06 y 553–1028). The asphalt texture on the two dark rooms is restrained: you see it, and it never fights the
   type. Keep it at this strength. The staggered still photographs with place and month captions (1440-00/01) belong
   here too.

## Accessibility floor (only what a screenshot can show)

- **Possibly under 12 px (measure):** the list plates at 1440 (1440-03 x 215–290, y 193–207), the map's dot numerals
  (1440-02, e.g. "13" at x 137–157, y 1193–1212) and the row numbers 1–13 (1440-02/03 x 110–120). The facts table's
  labels look under the 13 px label size (1440-04 x 732–771, y 327–445).
- **Contrast to measure:** if any of the orgs room's grey text is `--mute` (#4A4E55) on patina (#A9BDB8), that's
  about 4.2:1. It fails AA for body text (1440-03 x 96–1200, y 1015–1060; 390-04 y 260–330, 485–555, 710–780). The
  date plate in plaster on smeared rose works out to about 4.7:1, so it passes.
- **Over the film:** the hamburger and nav pass only because of the top gradient (at 390-first the icon's ground is
  about 4:1). That's the same band item 1 calls a lid. If it goes, the menu still needs 3:1 on the haze frames.
- **Tap targets to measure:** the stat links at 390 (390-00 x 16–176 and 203–316, y 1110–1126) are 13 px text with no
  underline. Unless they're padded, they're under 44 px tall. The first screen's "Find a group ride" link
  (390-first x 16–155, y 784–819) looks about 40 px.
- **Film on phones** (allowed by the Oct 26 direction): Pause is there and 48×47, Play shows under reduced motion and
  the poster holds, so that passes. The 390 Pause is icon-only, so it needs an accessible name. Can't verify from here.
- **Fields:** the search now has a visible label (an improvement). The #sign input's label can't be confirmed from a
  screenshot.
- **988 and Trevor:** in the orgs room and the footer. #today's "mental clarity" is about 4,500 px above the first
  988 line on a phone, but both are on the same page.
- **Focus states:** not visible in any capture. Unjudged.

## Against the bar

- **Finish (Assos, MAAP, Pas Normal):** the quiet rooms reach it: the orgs on patina, the four-column read list, the
  sign at the end. The hero doesn't. Fashion houses open on one sharp, graded clip with nothing laid over the sky. The
  dashes, the map crop and the list gutter are the kind of thing their QA catches.
- **Clarity (Specialized, Tesla):** the first screen is Tesla-clear: one line, one primary, one secondary. After that
  it's a long editorial scroll (13 rooms). "Find a group ride" moves to the ninth room, but the first-screen link
  still makes it one tap.
- **One person's own site:** yes. The stencil, the blank you type, his rides, his places, his words. It doesn't read as
  a template, except for the numbered-dot map and the giant numeral, which any events site could carry.
