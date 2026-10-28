# /about/ — critic, before (cold)

Read from screenshots only: `about-390*`, `about-1440*`, plus the full pages at 820 and 1024. I did not open the code, the brief or `context.md`.
The dashed "Robert's words go here" boxes are judged as if a few short paragraphs of his sat in them. I mark down where those columns sit, how wide they are and what sits beside them. I don't mark down that they're empty.

## The score

| # | Line | Score | Tile that earned it | Why |
|---|---|---|---|---|
| 1 | First screen | 2 | about-1440-first | At 1440 the h1 is cut by the fold: only "About me and my mission" and "I'm" show, at the bottom-left of a bruise void about 600 px tall. "Robert." is below the fold. At 390 (about-390-first) it works: his face, then "I'm Robert.", then the place. |
| 2 | Way-finding | 3 | about-1440-t00 | The label over the h1 says where you are. Nothing in the nav is lit and there's no crumb. The closing block gives clear ways out. That's adequate, nothing more. |
| 3 | Hierarchy | 3 | about-1440-t05 / t06 | Every chapter opens on the same ~120 px head at x=96 ("Then came the bike.", "The love bubble was real.", "I found a version…"). Then the 10,000 comes in at ~300 px straight after the pool quote. The order is clear, but there's no single peak, and the biggest thing on a personal page is a number. |
| 4 | Finish | 2 | about-1024 / about-820 (film caption), about-1440-t03 | At 820 and 1024 the dashed box's right edge runs through the "S" of "Scottsdale, AZ · Oct 2026". The handlebar strip starts at x=56, off the 96 margin, and the window cuts off its fourth photo. The text sits on three left edges (202, 96, 732). Ten rose dashes line up with nothing. At 390 the Trevor number breaks mid-number. A fashion house would not ship this. |
| 5 | Photography | 2 | about-1440-t03 / t04 | The portrait and the Stanley band are good. The rest: four near-identical cockpit POV frames in a row; a love-bubble collage of soft video grabs with one tile that's a crop of the tile beside it; a halftone duotone film poster that can't be read at 1440; a sunset shot with lens flare across a second rider's face. The collage, the sunset and the portrait have no captions. |
| 6 | Consistency | 3 | about-1440-t02 | The site parts are right: the closing block, the footer, `.link`, the org rows and the film disc. Inside the page it isn't consistent. There are two picture systems (strip and collage), five image ratios and captions on some photos only. The halftone appears at 820, 1024 and 1440 but not at 390. The page opens on two bruise rooms in a row, so the first change of room happens behind the film. |
| 7 | Desktop composition | 2 | about-1440-first, about-1440-t01, about-1440-t06 | The first screen is a void on the left. The opening column (540 wide at x=202) and the 10,000 column (at x=96) each have about 700 px of nothing to their right. The strip runs off the screen. Only the love bubble spread (t03–t04) and the patina room (t08) actually use two columns. |
| 8 | Phone comfort | 3 | about-390-t03, about-390-t07–t10 | One column, big type and edge-to-edge photos make it easy with one thumb. Against that: the collage squeezes three tiny crops (about 168 css px) beside one tall photo, which looks like a social grid. The page is about 10.5 screens long before his words go in, and the last four are rows and links. |
| 9 | His | 3 | about-1440-t04 / t05 | The words and pictures are his, and the pool room is the most personal moment on the site. The layout is a stock "story" template, though: big head left, picture right, box below, colored band, repeat. The halftone is the one designed move, and it reads as a filter. |
| 10 | Ease of reading | 4 | about-1440-t07, about-390-t04 | The display type is excellent and contrast holds everywhere, gunmetal on patina included. The text column (about 490 px inside the box at 1440, about 310 css px at 390) is a sound measure. Points off for "of myself I": the "I" sits alone at the end of line 2 at both widths. Also the broken Trevor number and the double-spaced crisis line in the phone footer. |

**Total: 27 / 50**

## What a fashion-house art director would send back (MAAP / ASSOS)

- **"The pictures aren't edited."** MAAP runs one cockpit POV full bleed and moves on. Here there are four (about-1440-t03). ASSOS would never put a filter on just one image in a feature. The halftone duotone (about-1440-t02) looks like an effect preset, and at this crop it shows a diagonal torso that reads as someone lying on the ground. The love-bubble frames are compressed video stills shown bigger than they can hold. Pick fewer frames, make them sharp and run them bigger.
- **"The type is bigger than the photographs."** Every chapter head is about 120 px. Most photos are 306–520 px boxes beside them. In a fashion feature the photograph carries the spread, the type is small and exact, and there is one huge type moment per story. This page has five (t01, t03, t04, t05, t07), so none of them lands.
- **"It's one module four times."** Head left, picture right, box under, new color band. That's how a site builder lays out "Our story". A magazine feature changes the spread: a full-bleed opener, a picture spread with no words, a pull quote alone, a close-up beside a column.
- **"Hold one text column."** The words move from x=202 to x=96 to x=732. An editorial layout keeps the reading column in one place and lets the pictures move around it.
- **"The opener is broken."** The name has to be on the first screen of a profile, either very big or very small but there (about-1440-first).
- **"Where does the feature end?"** The story stops at the sunset photo. After that it's a services page: org rows, give links, help lines, then the site's closing rows and footer (about-1440-t08–t10, about-390-t07–t10). There's no last image and no last line of his.
- **"Five ratios and half the captions."** The portrait is 4:5, the strip 3:4, the collage mixes square and 4:3 crops, Stanley is about 3:1 and the sunset 4:5. Some have the place · month line and some don't. Premium means one system, with every caption present.

What would survive their review: the pool room, the Stanley band, the phone portrait and the colored rooms as chapters (see the end).

## What makes it look cheap or generic, worst first

1. **about-1440-first.** The left two-thirds of the first screen is empty bruise. The label and "I'm" sit at y≈780–900 and "Robert." is below the fold. The 4:5 portrait's height pushes the h1 down. A stranger at 1440 sees a nav, a photo and a hole.
2. **about-1440-t02 → t03, the handlebar strip.** Four frames of the same composition: bars, Garmin, road ahead. The strip starts at x=56, not the 96 margin, and the window edge cuts off the fourth frame at x=1440. Desktop has no scroll control, so it looks like a broken carousel. At 390 (about-390-t02) the second frame is cut on the right. That's a swipe hint on a phone, but it's still four of one shot.
3. **about-1440-t02, about-1024, about-820, the film poster.**
   - It's halftone-dotted and toned patina-green. It's the only treated image on the page and it's the grained, worked-over look the bar bans.
   - At 1440 the frame shows nothing you can name.
   - At 820 and 1024 the dashed column's right border runs through the "S" of "Scottsdale, AZ · Oct 2026".
   - At 390 (about-390-t01) the same film is in full color with a tilted horizon, so the treatment depends on the screen.
   - The film straddles the bruise → concrete seam at y≈305 of t02. With the box starting lower in the concrete room, it looks accidental rather than placed.
4. **about-1440-t03 / t04 and about-390-t03, the love-bubble collage.**
   - The top-left tile is a crop of the big tile beside it: the same raised hands in front of the same buildings. It's filler.
   - All four tiles are soft video grabs with lifted blacks.
   - The rainbow umbrella with a cartoon bear sign (bottom-left tile) looks like stock Pride imagery.
   - None of the four is captioned.
   - At 390 the three left crops are about 168 css px wide, too small to read as photographs.
5. **The chapter-head stack: about-1440-t01, t03, t04, t05, t07.** Five display heads at nearly the same size and the same x. Right after the pool quote, the 10,000 (about-1440-t05–t06, about-390-t04) takes over the climax at a bigger size, with "miles in 2027." and three slogans on hairlines ("One year." "All on the bike." "Every ride gets written down."). That block is the homepage's `#road` dropped into a personal story. It reads as a stats module, not a chapter.
6. **Stranded text columns: about-1440-t01, about-1440-t06.** The opening column is 540 px at x=202 with nothing to its right up to x=1344. The 10,000-mile column is the same at x=96. With real paragraphs in them, this is the "phone column stranded on a desktop" the bar names. Three different left edges for the narrative (202, 96, 732) make it look unplanned.
7. **about-1440-t06 and about-390-t04, the rose dashes.** Ten 72 px rose dashes on a 128 px pitch at 1440 and three at 390. They head nothing: the three statement columns start at 96, 520 and 944 and the dashes don't line up with them. Rose is supposed to be rare so it means something. Here it's trim.
8. **about-390-t07 → t10, the ending on a phone.** After the sunset photo come the mission column and then about four screens of rows and links before the page ends: three give links, help lines, five closing rows and 13 footer links. The bar calls out "pages that end in a pile of links", and on a feature that's the last impression.
9. **about-1440-t08 and about-390-t06, the sunset photo.** It has lens flare across the left rider and no caption. A second rider stands front-on with his face readable. Only Robert may be recognisable, and this looks like a sunset-stop photo. The photo editor should check whether it's one that's off the site until Robert clears it. I'm flagging it, not ruling on it.
10. **Small finish misses.**
    - about-390-t08: the Trevor number breaks "1-866-488-" / "7386".
    - about-390-first: "I'm Robert." and then "Robert Castan · Phoenix" right under it says his name twice.
    - about-1440-t04 and about-390-t04: "of myself I" leaves the "I" alone at the end of a line.
    - about-390-t01: about 166 css px of empty bruise between the opening box and "Then came the bike." It's all one room, so it reads as a hole, not a break.
    - about-390-t10: the footer's crisis line is double-spaced, with a lone "·" at the end of line 1.

## Three things that already work (keep them)

1. **The pool room** (about-1440-t04 / t05, about-390-t04). "I found a version of myself I actually liked hanging out with." It's one idea in one room with no picture and no box. This is the page's peak. Protect it, and don't put anything bigger right after it.
2. **The Stanley band** (about-1440-t06 / t07) and **the phone portrait** (about-390-first). They're sharp, on the grid or edge to edge, with clean edges, and the band has its caption. They set the standard every other photo here should meet.
3. **The rooms as chapters.** Bruise, concrete, plaster, pool, bruise, patina gives the story real chapter breaks in the house palette. The patina room's two-tone standfirst (about-1440-t07, about-390-t06) sounds like him.
