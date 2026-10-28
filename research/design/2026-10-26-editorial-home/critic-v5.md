# Design critic: cold read, editorial homepage v5 (Oct 27, 2026)

I read STUDIO.md and CLAUDE.md §3 and nothing else: no brief, no earlier critiques, no code. I scored from the
screenshots in `scratchpad/review/before/`, `after5/`, `after5-reduced/` and the two `film5-*-sheet.jpg` files.

Coordinates are CSS px. The 390 first-screen PNGs are 3x, 820 is 2x, and 1024 and 1440 are 1x. The tiles are 1:1, so a
page y is the tile number × 1600 (390) or × 1800 (1440), plus the y on the tile.

Page lengths: at 390 the page goes from 10,934 px to 11,898 (+9%). At 1440 it goes from 10,552 to 10,033 (−5%). At 820
the After is 14,422 px.

## The score

On four lines the footage matters, so they get a split:
- **Footage** is the most this line could score with the clips as shot (about a second each, low resolution, no
  originals), however well they're used.
- **Use** is how well the design uses what exists, judged as if the clips were sharp and long.
- The line's score is what a stranger sees.

| # | Line | Before | After | Footage / Use | Screenshot and why |
|---|---|---|---|---|---|
| 1 | First screen | 4 | 4 | 4 / 4 | **Before** `before/390-first`: who, what, next ride and both finders on one screen, but it's crowded (stencil, two lines, three bordered tiles, a link). At 1440 the sign's question shares the screen (`before/1440-first`, y 833–950). **After** `after5/375se-first` and `after5-reduced/390-first`: who, what, one primary, one quiet link and Pause all fit 375×667. Two things hold it back. The picture behind the words changes every second, and an empty dark band with only a hamburger sits across the top (`after5/390-first`, y 0–63). |
| 2 | Way-finding | 4 | 4 | | **Before** `before/1440-first`: mark, five nav links, RIDE WITH ME, and doors on the first screen. **After** `after5/1440-02` and `1440-04`: every section opens on a label on a hairline, which helps. But "Read the last ride" and the calendar door left the first screen, and the header's Ride with me is gone until the film scrolls away. |
| 3 | Hierarchy | 3 | 4 | | **Before** `before/1440-03`: "Ride with me.", "April 23 to 25, I cycle for the Center", "Find a group ride." and a 1,425 numeral are all display size on one screen, so nothing leads. **After** `after5/1440-02`: a label, one 80 px opener, the lede beside it on the baseline, then the map. The eye goes in order. What holds it back: the 330 px "10,000" (`1440-01`, y 1330–1620) is the biggest thing on the page and outranks both stencils. |
| 4 | Finish | 3 | 3 | | **Before** `before/1440-05`: the footer reads "How rides are checkedPrivacyContact" run together (x 605–825, y 1508), and the ride bar sits on the hero photo (`before/1440-00`, 965–1383 × 886–946). **After** `after5/1440-00`: a seam runs down through the header. "–" stands in as a ride's name (`1440-02`). The map key is stranded, and Pause sits 39 px outside the right content edge. What's new and good: list rows line up across the gutter, footer links are spaced, ranges use en dashes. Fix the seam and the empty state and this line is a 4. |
| 5 | Photography | 3 | 3 | 2 / 3 | **Before** `before/1440-first`: a crisp half-screen selfie with a clean edge, plus good stills and two round play buttons on posters. **After** `after5/1440-01`: the stills are crisp, ungraded and on the grid (Boise at 4:5 staggered against the shadow shot; the LOVE-wall selfie at 824 wide). The hero film is soft, and its crops are poor at desktop. |
| 6 | Consistency | 3 | 3 | | **Before** `before/390-01`: bordered tiles, a bordered dark card, rows, rose and grey marks. **After** `after5/390-02` against `390-first`: a round plaster play button on the wall clip but a square Pause on the hero. There are four button looks: the plaster tile, ink, ghost (full width on phones, compact on desktop) and the ghost Pause. The openers do share one size now. |
| 7 | Desktop composition | 3 | 4 | 3 / 4 | **Before** `before/1440-04`: the field notes are rows 1,248 px wide; the hero split was good. **After** `after5/1440-03`: the orgs sit in three columns on the grid, the #ride photo sits beside its words, the strip runs in three columns and the field notes in four. What holds it back: the split-screen hero and two stranded side columns (the log and the map key). **Tablet:** `820-full` is 14,422 px, a phone column with the pictures blown up. |
| 8 | Phone comfort | 4 | 4 | | **Before** `before/390-first`: big tiles (about 64 px) and one-thumb use; the reel waits for a tap. **After** `after5/390-00` to `07`: one thumb, a 46 px Pause, a plaster tile. What holds it back: the page is 9% longer, and the strip's links are single text lines. |
| 9 | His | 4 | 4 | 5 / 4 | **Before** `before/390-01`: the day's word on the sign, his selfies, his log. **After** `after5-reduced/390-first`: his own action-cam selfie, his stencil, his log in rose. The clips are the most personal thing on the page. The layout around them (a full-screen loop, words bottom left, a box for the call to action) is the most common hero on the web. The stencil and the plate are what keep it his. |
| 10 | Ease of reading | 4 | 4 | | **Before** `before/1440-04`: field-note lines run about 120 characters (y 1672). **After** `after5/1440-04`: the field notes are now four columns of about 270 px and body measures stay around 520 px. What holds it back: regular-weight words over moving footage (`390-first`, the line over the forest floor) and 12 px labels in the fact rows ("3 days" at 732, 158). |
| | **Total** | **35** | **37** | | |

**Rose:** Hierarchy (+1) and Desktop composition (+1).
**Dropped:** none.
**Where the footage holds it back:** First screen, Photography and the desktop hero's narrow panel. On His, the footage
is what earns the line.

One thing outside the score: core task 4 (read his latest write-up) is now one scroll further. "Read the last ride"
moved from the first screen to the strip: at 390 from y ≈ 819 (`before/390-first`) to page y 1037 (`after5/390-00`),
and at 1440 from y 767 to y 1128. The usability lab should time it before anything ships.

## Five things that most make the After look cheap, unfinished or hard to use (worst first)

1. **The desktop hero reads as two videos in a split-screen template, and the header is cut in two by the seam.** In
   `after5/1440-00` (the paused first frame) a dark gutter runs from y 0 to 900 at x 1025–1030, straight through the
   header. Left of it the header is blue-grey; right of it, olive-brown. From x 944 (the end of Resources) to 1440 the
   header holds nothing. `after5/1024-first` is the same: the gutter is at x 772–776 and the header from 776 to 1024 is
   an empty slate block. Every pair clashes in temperature across the gutter (blue sky | green forest, terracotta dirt |
   grey dawn road; see `film5-wide-sheet`). The dawn panel's top third is blown white (`after5/1440-first`, 1030–1440 ×
   64–330). On phones the same header is an empty dark band with only a hamburger at the right (`after5/390-first`,
   0–390 × 0–63).
   *Use:* the split, the pairing and the header crossing the seam. *Footage:* the blown dawn sky.

2. **The film is soft and cuts every second.** `film5-phone-sheet` has three shots of about a second each in a
   three-second loop, so behind the words the picture flips from face to back to overhead every second. The wide film
   does the same, and shows the face clip twice in one loop (left panel, then right). At 820 the 608-px phone cut fills
   an 820×1180 screen: in `after5/820-first` the forest is mush and the jersey breaks into blocks (about 190–475 ×
   490–700). At 1440 the face panel's clouds and jersey are smeared (`after5/1440-00`, 0–1025 × 64–900).
   *Footage:* the clip length and resolution. Nothing fixes those without his originals. *Use:* the edit cuts on every
   second instead of holding a shot, and the phone cut is sent to an 820 portrait screen.

3. **The hero's crops.** In `after5-reduced/1440-first` and `after5/1440-00` his mouth sits at about y 350–370 and the
   stencil's cap line at y 370. The "E F" (x 330–500) sit on his chin, with no air between the face and the mark. The
   1440 poster's narrow panel (the LCP, and the only picture a reduced-motion visitor gets) slices a rider at the
   window's edge: an orange sleeve, a hand and a wheel at x 1340–1440, y 200–900. In the forest frame at 390
   (`after5/390-first`, about 20–190 × 342–416) the C, L and E sit on his cream jersey and read clearly weaker than FOR
   over the dark shorts. All three are use, not footage.

4. **The #today clip is a thumbnail in a box, next to a still of the same moment.** In `after5/1440-01` a 230×287 box
   (96–326 × 814–1101, page y 2614–2901) has a 64 px round play button over his torso and "▶ Play 0:03" under it. Beside
   it is an 824×618 still of the same wall, same jersey, same day (520–1344 × 483–1101). On a phone the two LOVE-wall
   pictures run back to back (`after5/390-02`: the selfie at y 40–333, the clip still at 400–887, page y 3240–4087). And
   the round play button doesn't match the hero's square Pause.

5. **The ride log has an undesigned empty state and a stranded column.** The Thu Oct 22 row's name is a lone "–":
   `after5/390-03` (17–25, 80; page y 4880) and `after5/1440-02` (96–106, 422; page y 4022). A screen reader will read
   it as "en dash". At 1440, "111 rides since June 1." and its two links sit at 944–1253 × 95–190, with a 400×415 dark
   void under them (944–1344 × 190–605). That's a phone fragment stranded at the top of a desktop column.

Also seen, smaller:
- **The 2027 section on a phone** (`after5/390-03`): about 75 px of dead space where the map is hidden (y 625–700, page
  5425–5500). The dates footnote and "All my 2027 rides" come before the list (y 700–800), so you read about projected
  dates before you've seen one.
- **The 2027 section at 1440** (`after5/1440-02`): the key and footnote sit at the bottom right (944–1311 × 1380–1520)
  under a 400×410 empty block. Toronto's dot 9 floats in blank space off the drawn land at (746, 1133).
- **Said twice:** "10,000 / miles in 2027, all on the bike." (`after5/1440-01`, 96–1075 × 1330–1680) repeats the hero's
  sentence, as the largest thing on the page.
- **Pause at 1440** (`after5/1440-00`, 1245–1383 × 805–851): its right edge is 39 px outside the 1344 content edge. At
  1024 it lines up.
- **Buttons:** the full-width ghost SEARCH RIDES on phones (`after5/390-05`, 17–373 × 1455–1502) against the
  content-width ink SIGN UP above it (17–240 × 928–975) makes two button shapes in one scroll.

## Accessibility floor (CLAUDE.md §3), as far as a screenshot shows

**Passes:**
- Pause is always there, 46×46 on phones (`after5/390-first`, 327–373 × 772–819) and 138×46 at 1440.
- Reduced motion shows the poster with a Play control (`after5-reduced/`).
- The search field has a visible label, "Your town or a ride name" (`after5/390-05`, y 1376). Before, it had only a
  placeholder.
- 988 and Trevor are in the orgs room and in the footer.
- The small rose plates (Feb 6, the Center, SFAF) are plaster on smeared rose, about 4.6:1, which passes.
- The #today clip stays a still until it's tapped.
- No car is visible in any frame or still.
- Only Robert is recognisable (the dawn riders are from behind).

**Fails or risks to measure:**
- **Stencil over the cream jersey:** in the forest frame at 390 (`after5/390-first`, about 20–190 × 342–416) the CLE
  letters look under the 3:1 the rest of the stencil gets. The contrast check says it passes every frame; check it again
  on the glyph pixels themselves.
- **Words over moving detail:** the regular-weight "I'd like to say…" line sits over a bright, busy forest floor
  (`after5/390-first`, about y 600–640). It may pass on contrast, but it's harder to read than the same words on a still.
- **Strip tap targets:** "group rides worldwide →" and "events in 2027 →" look like single text lines about 18 px tall
  (`after5/390-00`, y 1183–1200). They're under 44 px unless the numeral above is inside the link.
- **Small inline links:** "on Strava" (`390-00`, 195–253 × 979) and "Powered by Strava" (`390-03`, y 149) are
  text-height targets.
- **Possible small targets:** if the rose plates "me / one·n·ten / change" are tappable, they're about 26 px tall
  (`390-01`, y 470–496). If the map's numbered dots are links, they're 26 px (`1440-02`).
- **The "–" name:** read aloud as "en dash" (above).
- **Focus:** can't be judged from screenshots.

## Three things that already work and must survive

1. **The 2027 map and the two-column date-block list** (`after5/1440-02` and `1440-03`). It's drawn clean: numbered
   dots, projected rides outlined, the projected date blocks dashed. The row hairlines sit at the same y on both sides
   of the gutter (77, 168, 260). It's the best new object on the page and the most "one man made this" thing at 1440.
2. **The phone first screen as a structure** (`after5/375se-first`, `after5-reduced/390-first`). The stencil with the
   powder bar inline after FOR, "I'm Robert. In 2027 I ride 10,000 miles", one plaster tile with the date on a rose
   plate, one quiet link and Pause. It all fits 375×667, and on the face poster there's clear air above the mark. This
   is clearer than the Before's three bordered tiles.
3. **The section rhythm and the rooms.** A label on a hairline, one opener size, the lede on the opener's baseline
   (`1440-02`, `1440-03`, `1440-04`). The patina orgs room with the 988 and Trevor line inside it (`1440-03`, y
   1343–1390). The staggered story photographs (`1440-00` and `1440-01`). The closing sign: a full-width stencil on the
   dark field (`1440-04`, y 1527–1790).

## The textures (approved, so judged only for restraint and finish)

- **Asphalt aggregate on `#road` and `#sign`:** restrained and finished. At 1440 it reads as a faint tooth
  (`1440-02`, `1440-05`); on a phone it's nearly invisible. Keep it.
- **Worn rose dashes:** restrained in number (three on the strip, one powder over the sign) and lined up with their
  columns (`1440-00`, y 941–949, at x 98, 522, 946). On a phone each one is a 133 px rough stroke that reads closer to a
  highlighter swipe than lane paint (`390-00`, y 884–890). They also share the log bars' shape, so three of them over
  three numbers can read as bars of a chart that measures nothing. They pass, just.

## Against the bar

- **Finish (Assos, MAAP, Pas Normal, Rapha):** below the hero this is the closest the site has come. The labelled
  hairline, the one big opener, the lede on its baseline, the quiet lists and the map all have an editorial rhythm a
  house would recognise. The hero is where it falls short. Their films are one held, sharp, tone-matched shot. This is
  two soft action-cam panels that cut every second, with a seam through the header. It reads like a reel, not a
  campaign. Part of that is the footage. The split, the pairing and the crops are not.
- **Clarity (Specialized, Tesla):** the first screen meets it: one idea, one action, the next ride's date in the
  button. Moving "Read the last ride" and the calendar door one scroll down costs a little of that.
- **One person's own site:** yes. His selfie-cam footage, his stencil, his day's word, his log and his map of rides.
  The only template-shaped move is the hero's layout, and the stencil and the plate rescue it.
