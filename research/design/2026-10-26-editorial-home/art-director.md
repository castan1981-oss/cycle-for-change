# The editorial homepage: art director's review (Mon Oct 26, 2026)

Branch `feat/home-editorial-film`, working tree as of 22:50. Read against the brief Robert sent today
(`/home/claude/handoff/CLAUDE_START_HERE_CFC.md`), the concept art, Cadence's prototype, CLAUDE.md, STUDIO.md and
BRAND_CONTENT_FACTS.md §11–§14. The identity freeze is lifted for this redesign. The retired list, the banned look,
the voice and never-list, the photo rules and the health rules still hold. This is a review. No site file was changed.

Screenshots: `S/` = `/tmp/claude-0/-home-claude/42a8e16b-6128-5358-8471-887b1648b6bf/scratchpad/review/` (the
builder's set) and `A/` = `/tmp/claude-0/-home-claude/42a8e16b-6128-5358-8471-887b1648b6bf/scratchpad/ad/` (mine:
`measure.py` serves `cfc-site/` in-process with Chromium and writes `m.json`, the hero and section boxes at six sizes).
Line numbers are `scripts/build-home.js` (BH) and `cfc-site/home.css` (HC) as they are now.

## The aim of this pass

Make the film-first homepage read as one calm, finished thing on a phone. Every word should be clear over the footage,
rose should go back to meaning the blank, and each fact should be said once. The mark, the palette, the data and his
words don't change.

## Where it stands

The bones are right. It's his footage, his mark, his words and live data, and it's on the house grid. The patina room
(`#orgs`) and the painted log in `#road` are the best things on the page. Four things keep it from looking finished:
- **The film.** It cuts about twice a second. On a phone its band seams cross the words at every size. On desktop the
  middle panel centres on his bib shorts.
- **Rose.** It's on more than 50 things, including 26 squares in `#year` alone.
- **Repeats.** 10,000, 4,273, 1,423 and Center Ride Out each show up two or three times.
- **Decoration that reads as a template.** The numbered "01 ——" eyebrows, a stock-looking bike, torn caption tabs that
  read as smudges.

The phone page is 14,669 px tall at 390, against about 10,930 for the page it replaces. Pass 37 cut that page because a
person Robert trusts found it overwhelming.

---

## Ranked list

Format for each item: severity · moves served (STUDIO.md numbers) · impact/effort out of 5 · owner · files.
Owners: **A** = markup builder (generators, film, images, CSS_V, CLAUDE.md). **B** = CSS builder (`cfc-site/home.css`
only).

### Must fix before Robert sees it

**1. Phone film: one full-frame film, not three stacked bands.**
Must · moves 1, 6, 11 · 5/3 · A (film, BH) + B (one rule) · `tools/hero-film.py`, BH 113–116, HC hero media.
- *Evidence:* `S/after/390-first.png` (a seam runs under "on the bike."), `S/after/375se-first.png` (seams cut through
  CYCLE and through the quote), `S/after/820-first.png` (a seam through the stencil, and his head cropped off the top
  band).
- *Measured (`A/m.json`), seam y vs text box:*

  | Screen | Seam | Collides with |
  |---|---|---|
  | 360×640 | 211–215 | mark 173–316 |
  | 360×640 | 425–429 | quote 397–466 |
  | 375×667 | 220–224 | mark 193–342 |
  | 375×667 | 443–447 | quote 423–493 |
  | 390×844 | 561–566 | intro 519–567 |
  | 430×932 | 619–625 | intro 604–653 |
  | 820×1180 | 830–839 | mark 807–911 |

- *Why no band layout can work:* the type block covers the bottom 63–73% of every phone. On top of that, the bands come
  from the 512 px social reel, so the picture is upscaled about 2.8× on an iPhone. Each band also cuts on its own clock:
  15 cuts in a 7.1 s loop.
- *The still is the worst frame.* The phone poster is frame 0, and frame 0 is a motion-blurred close-up of his mouth.
  That is also the LCP image and the still shown under reduced motion and Save-Data (`S/after-reduced/390-first.png`,
  `cfc-site/film/hero-phone-1.jpg`).
- *Change (hero-film.py):*
  - PHONE becomes one lane at 720×1280, cut only from the ≥720 px sources (`road`, `tsr`). Not the reel, and not `love`.
  - Each shot is cropped portrait with his head in the top 30%.
  - Order: `s1_mint` first (frame 0 = the poster: sharp, daylight, his face), then `s4_river`, `s6_tunnel`,
    `s3_ahead`, `s8_bike`, `s7_road`, `s2_drone`. Loop about 9 s, no shot under 1.2 s.
  - Encode: CRF 27 for H.264, CRF 40 for VP9. The phone mp4 stays at or under 2 MB.
  - Write `hero-phone-2.*` and point BH 114 at it: `w: 720, h: 1280`.
- *Change (HC):* `@media (max-width:759px),(max-aspect-ratio:1/1){.hero-poster img,.hero-film{object-position:50% 0}}`.
  Portrait tablets then crop from the foot, not off his head.
- *Also:* the cut drops `r_riding`. Its first second has a white shape behind the hedge at the right edge
  (`A/mid-sheet.png`) that may be a parked vehicle, and the homepage hero stays car-free. Check it at full resolution
  before the clip is used anywhere again.

**2. Wide film: calmer, his face where nothing covers it, the LOVE loop out.**
Must · moves 1, 2, 6 · 5/3 · A · `tools/hero-film.py` (WIDE), BH 115.
- *Evidence:* `S/after/1440-first.png`, `S/after/1024-first.png`, `cfc-site/film/hero-wide-1.jpg`,
  `S/film-wide-sheet.jpg`.
- *Pace:* 15 cuts plus the loop in 7.1 s, about 2.2 picture changes a second. `t_selfie` and `s9_sun` run as
  half-second flashes. Seven shots repeat across panels within 2–3 s (`s6_tunnel`, `s1_mint`, `s2_drone`, `s4_river`,
  `s5_forest`, `s8_bike`, `t_selfie`). That pace is the "masculine extreme-sports" energy the brief rules out.
- *The LOVE loop:* `love` is 3.2 s of the loop and sits in the centre panel, poster included.
  - At 1440 the optical centre of the screen lands on his bib shorts, under "FOR".
  - At 1024 the O and R of FOR disappear into his white kit.
  - It's also `#today`'s film (`today-oct12-1.mp4`), 1,500 px further down.
- *Change:* keep 1620×960 but make the panels **768 | 420 | 420** (6 px gutters).
  - Panel 1 runs the road footage at its native 4:5: `s4_river`, `s3_ahead`, `s7_road`, `s2_drone`, `s5_forest`.
    These are faceless, calm, and sit under the words.
  - Panels 2–3 carry his face in their top half: `s1_mint`, `s6_tunnel`, `s8_bike`, and `t_selfie` only if 1 s or more
    of it exists.
  - Rules: no shot under 1.0 s; no shot on screen twice within 3 s; no two panels cutting within 0.4 s of each other;
    frame 0 is the poster, with his face sharp in panel 2; `love` is in neither film.
  - Write `hero-wide-2.*`.
- *What the new panel widths buy (object-fit cover):*
  - Seam 1 sits right of the words at every landscape width: 1024 ≈ x 478 (words end ≈ 437), 1440 ≈ 680 (654), 1920 ≈
    910 (≈ 896).
  - Seam 2 clears the blank: at 1440 it's ≈ 1080, and the bar ends at 1005. Today it runs through the bar.
  - The words sit on one picture instead of two.

**3. A clean mark over the film.**
Must · moves 4, 10 · 4/1 · A · BH 140, BH 81–90.
- *Evidence:* `A/1440-mark.png` and `S/after/1440-first.png`. Over moving footage, the `#lpWorn` holes show the video
  through the letters and read as compression noise. The blank's speckle reads as dirt. Robert called worn texture
  "sloppy".
- *Change:* `MARK_LINE("hero-mark hero-mark--line", false)` and delete the `#lpWorn` filter from `DEFS`.
- *This overturns an earlier decision on purpose.* Pass 27's one sanctioned wear was over a still photograph. With a
  clean, opaque mark, letters crossing a panel seam read as layered type, which is fine.

**4. First-screen hierarchy: who and what, louder than the quote.**
Must · moves 2, 11 · 4/1 · B (+A for nothing) · HC 59, 65, 71, 74, 96–100.
- *Evidence:* `S/after/390-first.png`. The answer to "what is this" is the quietest line on the screen:
  "I'm Robert. In 2027 I ride 10,000 miles, all on the bike." sits at 18 px/600, under a 21.4 px/800 quote. At 1440 it's
  a 20 px kicker above the mark, wrapping "all / on the bike." The order also differs between widths.
- *Change, sizes:*
  - `.hero-intro{margin:var(--s3) 0 0;max-width:24ch;font-size:clamp(1.3rem,.95rem + 1.6vw,2.4rem);font-weight:800;line-height:1.1;letter-spacing:-.022em;text-wrap:balance}`
  - `.hero-line{margin:var(--s2) 0 0;max-width:34ch;font-size:var(--fs-intro);font-weight:500;line-height:1.38;letter-spacing:0;text-wrap:pretty}`
- *Change, order:* `.hero-h{order:-1}` for every width (drop the phone-only block at HC 96–100). Mark, then intro,
  then quote, then actions, everywhere.
- *Change, tile:* the tile truncates "Tour de Palm Springs, Palm Sprin…" (390) and "Palm Sp…" (375).
  `@media (max-width:479px){.hero-ride .finder-s{white-space:normal;text-wrap:balance}}`. This stays CSS-only because
  `/ridebar.js` rewrites that span's text.
- *Change, the date plate:* the plate is powder rose 13 px by accident. The unlayered `.ridebar-d` in chrome.css (line
  417) beats HC 71, which sits in `@layer section`. Move the rule to the unlayered foot of home.css:
  - `.home .hero-ride .ridebar-d{background:var(--creosote);color:var(--paper);font-size:.9375rem;padding:10px 10px 8px}`
  - and, since the tile goes clear over the film on hover,
    `.home .hero-ride:hover .ridebar-d{background:var(--creosote-lift);color:var(--asphalt)}`.
  - Smeared rose on light, powder on dark. Plaster on smeared rose is 4.68:1.

**5. Say it once, and never next to the 10,000.**
Must · moves 1, 11 · never-list · 5/2 · A · BH 157, 261–262, 368–369, 375–376, 424–429, 228.
- *Evidence:*
  - `S/after/390-00.png`, `390-02.png` and `390-03.png`: 10,000 appears at display size three times in the first
    3,300 px, and 4,273 twice.
  - "the count restarts / starts over / The 10,000 start Jan 1" is said three times.
  - The strip sets 4,273 and 10,000 side by side as a matched pair of numerals. `#road` prints "Mile 4,273" under a
    336 px 10,000. Both read as "4,273 of 10,000", which the never-list rules out.
  - `390-07.png` and `1440-04.png`: 1,423 twice in `#find`, giant numeral and table. Pass 37 says "no second 1,422 or
    counts table under the search".
  - Center Ride Out appears three times in 2,500 px (`#year` row, `#orgs` card, `#ride`).
- *Change:*
  - (a) Strip: delete the 10,000 cell (BH 157). Cell 1's label becomes "training miles since June 1, on Strava. The
    count restarts in <b id="daysTo">…</b> days." Both sentences are already on the site.
  - (b) `#road`: delete `.miles-count` (BH 261). `.miles-rides` keeps "N rides since June 1." and drops its second
    sentence.
  - (c) `#find`: delete the `facts-dl` table (BH 424–429).
  - (d) `#orgs`: delete both `.org-ride` lines and both "Ride it with me" links (BH 368–369, 375–376). `#ride`, the next
    section, and `#year` carry those rides.
  - (e) `#today`: the bruise box (BH 228) becomes a `.link` with the same words. It's a box, and it repeats `#sign`.
- *Result:* the giant 10,000 in "From the road" is the page's one oversized numeral, the brief's "large 10,000-mile
  feature". It stays a numeral of the goal, in Overpass. It is never the stencil and never a mark.

**6. Rose goes back to the blank.**
Must · move 7 · 4/1 · B (+A one line) · HC 136, 183, 281–283, 288, 294–297, 322; BH 317.
- *Evidence:* `S/after/390-04.png` and `S/after/1440-02.png`/`-03.png`. Ten solid rose date blocks plus three outlined,
  thirteen rose map squares, and rose icons in the strip, `#how` and `#orgs`. The old page used text dates and kept the
  plate for his org rides only (`S/before/390-04.png`).
- *Change:*
  - `.date{background:transparent;color:var(--asphalt);box-shadow:inset 0 0 0 1.5px var(--asphalt)}`
  - `.date--soft{color:var(--mute);box-shadow:inset 0 0 0 1.5px var(--dust-deep)}` (gunmetal on concrete is 6.28:1;
    dust-deep is the hairline that must be seen)
  - `.mp-dot{background:var(--asphalt)}`, `.mp-dot--soft{background:var(--paper);border:2px solid var(--mute)}`, and at
    ≥760 `color:var(--mute)`
  - `.how-mk{color:var(--asphalt)}`, `.org-mk{color:var(--asphalt)}`, `.strip-mk{color:currentColor}`
- *Where rose stays:* the blanks, the plates (`#why`, `#today`, "for the Center", "for SFAF", "the Center"), the lane
  dashes and the log strokes. That's paint and the blank, and nothing else.

**7. Drop the numbered eyebrows.**
Must · moves 9 (his), 10 · 3/1 · A (markup) + B (`.rule`) · BH 171, 246, 289, 334, 355, 414, 439; HC 26–31.
- *Evidence:* `S/after/390-00.png` ("01 ——" with no label) and `S/after/1440-03.png` ("04 ——" with no label). The
  numbers run 01–06 with labels only on four. A visitor never uses them. A numbered rule over every section is the
  studio-default editorial tell, and Robert has asked not to get Claude's go-to look.
- *Change:*
  - Remove every `<span class="rule-n">0N</span>`.
  - Delete the label-less rules (BH 171 and 355).
  - Keep the hairline with its label where one exists ("From the road", "N rides", "Group rides", "Read"), label first.
  - Drop the `.rule-n` styles.
  - The `#year` row index becomes `String(i + 1)` (BH 289), so the list reads 1–13 like the map.

**8. Photos: clean edges, captions on the grid, nothing stranded on a phone.**
Must · moves 4, 6, 8 · 4/1 · B (+A drops `class="torn"` at BH 232) · HC 161–166, 205, 217.
- *Evidence:*
  - The torn tab is plaster on concrete at 1.14:1, so it reads as a smudge with a ragged edge, not paper.
  - It pushes every caption off the photo's left edge (`S/after/1440-01.png`: Boise caption at x 640 vs photo 626;
    `#today` 534 vs 520).
  - On phones, the Paradise Valley shadow photo sits at 64% width with a dead left side (`S/after/390-01.png`), and the
    `#today` film sits at 62% with a dead right side (`S/after/390-02.png`).
- *Change, captions:*
  - `.story-ph figcaption,.today-ph figcaption,.ridewith-ph figcaption{display:block;margin:var(--s1) 0 0;padding:0;background:none;clip-path:none;font:var(--label);color:var(--mute)}`
  - Delete HC 163.
  - Under 900, full-bleed figures get `padding-inline:var(--gut)` on the caption (as chrome's `.ph figcaption`) instead
    of `margin-left`.
- *Change, phones:*
  - `@media (max-width:899px){.story-ph--a{margin-inline:calc(-1 * var(--gut))}}` (edge to edge, the house rule)
  - `@media (max-width:759px){.story-ph--b{display:none}}`
  - `@media (max-width:899px){.today-film{width:auto;margin-inline:calc(-1 * var(--gut))}.today-film-frame{aspect-ratio:4/5}.today-film video{object-position:50% 20%}.today-film-cap{padding-inline:var(--gut)}}`

**9. The bike: his bike, or no bike.**
Must · moves 9, 10 · 3/3 · A · BH 99–108 (`#hmBike`), BH 259–260.
- *Evidence:* `A/1440-bike.png` and `S/after/1440-02.png`. A flat top tube, a stub of a head tube, a hooked bar and a
  crank that reads as a kickstand, at 560 px. It reads as stock art, which the brief's own line rules out ("avoid stock
  graphics").
- *Change:* trace his red S-Works, side-on, from `cfc-site/img/today/oct12-love-1.jpg` (1600×900). Anchors in that
  photo's pixels:

  | Part | Photo pixels |
  |---|---|
  | Rear axle | ≈ (130, 565) |
  | Front axle | ≈ (474, 565) |
  | Tyre outer radius | ≈ 117 |
  | Deep-rim inner edge radius | ≈ 76 |
  | Bottom bracket | ≈ (261, 590) |
  | Seat cluster | ≈ (235, 432) |
  | Saddle | ≈ x 180–255, y 355 |
  | Head tube top | ≈ (418, 410) |
  | Fork crown | ≈ (435, 452) |
  | Bar tops | ≈ (450, 375) |

  - Draw it with one stroke (3 in the 480×270 box), round caps and no fill.
  - The deep rims are the second circle. No spokes. The drops hang down and back.
- *Fallback:* if it can't be drawn clean before the preview, cut `.miles-bike` and its lane (BH 259–260) and let
  `.miles-log` span `1 / span 7`. Don't show Robert this drawing.

**10. The map: no invented line, and nothing that looks tappable and isn't.**
Must · moves 9, 11 · copy rule · 3/1 · A (+B two rules) · BH 311, 313, 317, 324, 327; HC 280–284.
- *The caption is new copy.* "Each dot is a ride… the road between isn't drawn" appears nowhere else on the site, and it
  reads as a method note. Research never reaches a page. Cut the figcaption (BH 327).
- *Drop the finish rings* (BH 311 and the `#A84C58` ring at BH 317). Without the caption nothing explains them. One
  square per ride, at its start.
- *Make the dots spans.* Use `<span class="mp-dot" aria-hidden="true">` (BH 313), not `<a>`. Today they're 13 extra tab
  stops that `pointer-events:none` (HC 281) makes unclickable, and their numbers pick up the link underline
  (`A/1440-year-scrolled.png`). The list is the link.
- *Move "Phoenix" off the map.* The label is clipped to "oenix" under square 1 (`S/after/1440-03.png`). Put it in a
  one-line key under the map, using the existing label:
  - markup: `<p class="yr-key"><i aria-hidden="true"></i>Phoenix</p>`
  - CSS: `.yr-key{display:flex;align-items:center;gap:8px;margin:var(--s2) 0 0;font:var(--label);color:var(--mute)}`
    and `.yr-key i{width:10px;height:10px;background:var(--asphalt)}`

### Should fix in this pass

**11. Over the film, the header shows one mark and one Ride with me.**
Moves 1, 2 · 3/1 · B · HC 423 (the unlayered foot).
- *Evidence:*
  - `S/after/390-first.png`: CYCLE FOR shows twice, 190 px apart.
  - `S/after/1440-first.png`: RIDE WITH ME shows twice, and the header's outline button sits on bright sky.
  - A hairline crosses the film at 64 px.
- *Change:*
  - `.js .home .nav[data-solid="false"]{border-bottom-color:transparent}`
  - `.js .home .nav[data-solid="false"] .brand,.js .home .nav[data-solid="false"] .btn--sm{opacity:0;visibility:hidden;transition:opacity var(--t-open) var(--ease),visibility 0s linear var(--t-open)}`
  - The solid state brings both back with `visibility:visible;transition:opacity var(--t-open) var(--ease)`.
  - Without JS the nav stays solid, as now.

**12. The film's stop moves to the foot on phones.**
Moves 9, 11 · 2/1 · B · HC 86–96.
- *Evidence:* top right, under the nav, the stop reads as a close button and sits on his face.
- *Change:* `@media (max-width:759px){.hero-pause{top:auto;bottom:calc(env(safe-area-inset-bottom,0px) + 28px)}}`. At
  390 it lands at the right end of the "Find a group ride" row (y 772–816).

**13. How this works is the second idea again (Pass 37).**
Moves 1, 11 · 3/1 · A + B · BH 182–189, HC 179.
- *Change:* move `<div class="wrap how" id="how">` above `.story-in` inside `section.story`. HC 179 becomes
  `.how{margin:0 0 var(--sec)}`, and the 2px rule stays. The order is then film, numbers, how it works, the story. A
  stranger gets the mechanics before scrolling past two photographs.

**14. One grid, one edge at 1440.**
Move 4 · 3/2 · B · HC 128–145, 168–178, 186, 268, 333–335.
- *Story photos:* they sit on a 12-column grid nested inside 7 columns, so photo A ends at 1035 and B starts at 1059.
  The page lines are at 1026 and 1050 (`S/after/1440-00.png`). At ≥1024:
  - `.story-photos{grid-column:6 / -1;display:grid;grid-template-columns:subgrid;align-items:start}`
  - `.story-ph--a{grid-column:1 / span 4}`
  - `.story-ph--b{grid-column:5 / -1;margin-top:var(--s6)}`
- *Year and orgs heads:* at 7fr/5fr the lede lands 4 px off the list edge, and "ride one." hangs on its own line.
  - Set `grid-template-columns:repeat(12,minmax(0,1fr))`.
  - `.year-h,.orgs-h{grid-column:1 / span 7}`
  - `.year-lede,.orgs-lede{grid-column:8 / -1;max-width:none;text-wrap:balance}`
- *The strip:* three cells, span 4 each, with no vertical rules.
  - Rows go to a subgrid so the numerals share a top. Today 4,273 starts at y 92 and 1,423 at 125
    (`A/1440-strip.png`).
  - `.strip-in{grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--col-gap);grid-template-rows:auto auto auto}`
  - `.strip-cell{grid-column:span 4;grid-row:span 3;display:grid;grid-template-rows:subgrid;align-content:start;border:0;padding:0}`
  - `.strip-cell>.strip-n{grid-row:2}`
  - Phones: two columns, with `.strip-cell:first-child{grid-column:1 / -1}`. The live count gets its own row and the two
    finders sit side by side.
- *Orgs and #how:* a heading that wraps pushes its column down. SFAF's two-line name drops its column 31 px
  (`S/after/1440-03.png`), and "The money goes to the orgs." does the same in `#how` (`S/after/1440-01.png`).
  - Orgs at ≥900: `.orgs-list{grid-template-rows:repeat(4,auto);column-gap:var(--col-gap)}` and
    `.org{display:grid;grid-row:span 4;grid-template-rows:subgrid;align-content:start}`. That's four rows (mark, name,
    line, link) once item 5d lands.
  - `#how` steps: the same, with `grid-row:span 2` on each `li`.

**15. Fewer, bigger rooms, and a lighter second screen.**
Move 7 · 3/1 · B · HC 38–39, 191, 362.
- *Why:* the hero's foot and the strip are both dark, so the first two phone screens are near-black. Robert's list
  includes "too dark". Concrete and plaster differ by 1.14:1, so alternating them reads as faint banding, not rooms
  (`#ride` plaster, then `#find` concrete, then `#read` plaster, in `S/after/1440-04.png`/`-05.png`).
- *Change:*
  - The strip goes onto concrete: `.strip{background-color:var(--bone);color:var(--asphalt);--ring:var(--asphalt)}`.
    Take it out of the asphalt group. `.strip .lane{background-image:url(/img/home/lane-rose-1.svg)}`, labels gunmetal,
    links ink.
  - `#today` goes onto concrete like `#why`, separated by space and one hairline.
  - `#find` goes onto plaster like `#ride` and `#read`.
  - Asphalt (HC 39) drops from `opacity:.42` to `.2` on the two dark rooms that keep it. At .42 its sparse light specks
    read as dust on the screen.

**16. Type: one display size, a softer weight, and one big thing at a time.**
Moves 2, 6 (consistency), the brief's "softer, premium" · 3/1 · B (+A for #ride markup) · HC 152, 265, 364, 366, 398;
BH 394–395.
- *Section openers:* today they come in three sizes (112, 92 and 88 px at 1440), all at 900.
  - `.story-h`, `.year-h,.orgs-h` and `.find-h` all take
    `font-size:clamp(2.5rem,1.35rem + 4.6vw,5.75rem);font-weight:800;line-height:.92;letter-spacing:-.035em`.
  - 900 stays for the 10,000, the plates and the date numerals.
- *The #find numeral:* `.find-count b` becomes `font-size:clamp(3rem,1.9rem + 4.6vw,6rem)`, so the 10,000 is the one
  oversized numeral on the page.
- *#ride:*
  - Problem: a 40 px "Ride with me." sits over a 72 px line, and it points at a different ride than the hero's Ride with
    me.
  - Change: delete `<h2 class="ridewith-h">` (BH 394) and make the display line the h2:
    `<h2 class="ridewith-big" id="ride-h">`. One kicker, one display line.
- *#sign and the footer:* the page ends on two big stencils within 700 px, and the right 40% of `#sign` is empty at 1440
  (`S/after/1440-05.png`).
  - `--h:clamp(62px,calc((100vw - 2 * var(--gut)) / 4.6),236px)`
  - `.home .foot-sign{display:none}` and `@media (min-width:1024px){.home .foot-grid{grid-column:1 / -1}}`
  - The interactive sign is the homepage's sign-off.

**17. Details.**
Move 10 · 2/1 each · A (spans, class) + B (rules).
- *A date breaks at its dash.* "200+ miles, Apr 23– / 25, 2027" (`A/390-facts.png`).
  - BH 398: wrap the date in `<span class="nowrap">`.
  - HC 346: the dt column becomes `minmax(5.5rem,8rem)`.
- *"queer-serving" splits at its hyphen* at 1440 (`S/after/1440-03.png`). BH 379: wrap it in `<span class="nowrap">`.
- *Phone numbers break* ("1-866- / 488-7386", `S/after/390-05.png`). HC 330 adds `white-space:nowrap`. The footer's copy
  is chrome; see Later.
- *Generated arrows lose their space* ("worldwide→", "video→"). A leading space inside an inline-block is dropped. At HC
  138 and 200: `content:"\2192";margin-left:.3em`.
- *The hero link has no arrow.* BH 144 uses the house `link link--bone`, so it carries the arrow every other text link
  has.
- *A log row with no ride name is shorter* (Thu Oct 22, `S/after/390-03.png`), and its miles sit higher. Reserve the
  name line, with a min-height on `.log .when` equal to the date line plus the name line, so every row is the same
  height and the miles share a baseline.

---

## Not this pass

- **A truly calm, crisp film.** The repo's footage tops out at 1.3 s per shot and 864 px wide. Items 1–2 make it calmer
  and cleaner, but MAAP/ASSOS pace (3–4 s holds, sharp at 2×) needs his original takes. See For Robert.
- **Row and map linking.** Hovering or focusing a `#year` row would fill its square on the map (motion-interaction).
  Wait until the dots are spans.
- **One family for media controls.** The hero's stop (a boxed, sentence-case control) and `#today`'s Play should become
  one control style.
- **#read with pictures.** The four teasers are text-only at 1440.
- **Footer details** (chrome.css, a sitewide pass). "The orgs / I ride for" wraps at 1440, and the footer's Trevor
  number breaks on phones.
- **A crossfade at the loop point.**
- **If the lab still finds the phone long:** the next cuts are the map on phones (unnumbered 12 px squares there) and
  the "Ten with dates…" note, which repeats what the rows say.

## For Robert

1. **Originals of the clips behind the hero film.** Longer takes (4 s or more) at full resolution, from the stockpile.
   The calm, crisp version can't be cut from the 1.3 s, 864 px copies in the repo.
2. **#today still says Oct 12.** It needs a new day, with his word, his line and his pictures, when he has one.
3. **Clean letters on the hero.** This ends the one sanctioned wear (Pass 27). Over moving film the wear reads as noise,
   and he has called worn texture sloppy. Needs his OK.
4. **The torn-paper treatment from the approved direction is cut from the captions.** At 1.14:1 on concrete it reads
   as a smudge. If he wants collage, it should get its own moment in a later pass, not sit under every photo.
5. **On phones the film becomes one full frame** instead of the test reel's three bands. The words cover the bottom
   two-thirds of a phone, the seams cut through them at every size, and the reel's clips are 512 px wide. Desktop keeps
   three panels.
6. **The oversized 10,000.** One stays, in "From the road", as the number of the goal. It's never the stencil and never
   on kit. brand-ambassador should confirm it stays clear of "10000 as a mark".
7. **Still open from the handoff:** how much weight the orgs get (facts §14 item 3). This review keeps them as they are,
   minus the repeated ride lines.

## What NOT to touch

- The decision to make the hero his own footage, re-edited and car-free, instead of the test reel. Dropping the old road
  reel because the hero carries the footage.
- The CYCLE FOR stencil and the blank from the chrome.js drawings (`#lpC` …). The stacked phone version. Stroke 16.
  Powder rose on dark.
- After Hours tokens only. No new color, font, radius or icon style came in, and none should.
- The patina room for `#orgs`: the softest, best-composed field on the page. The 988 + Trevor line in it and in the
  footer.
- The log as painted strokes, each as long as the ride: data, his, and wet paint. "Powered by Strava".
- The map draws no routes. The squares are keyed to the list. The sticky map beside the list at ≥1024 works in a real
  scroll (`A/1440-year-scrolled.png`; in the full-page capture it only looks empty).
- The 13 rides come from the calendar. Projected and TBA say so in the row. The facts desk's corrections are in (The
  Mid South Mar 11, Seattle to Portland 206 miles one or two days, the SFAF cost sentence cut).
- Film behaviour in `home.js`: it starts after load, shows the still under reduced motion and Save-Data, keeps a stop
  for the visit, pauses off-screen and swaps on rotation.
- `#sign` as the ending: type, and the plate changes. Nothing is sent. The `/cyclefor/` link.
- The hero's one primary (the Ride with me tile, which `/ridebar.js` keeps current) and the one link beside it.
- `#ride` written for Center Ride Out, with its facts table and "checked Oct 26".
- Sticky story words at ≥1024. Every other sentence on the page is the site's own copy. Keep it that way.

## Who edits what (two builders, no shared file)

- **A, markup and film.** A owns these files and the one regeneration:
  - `scripts/build-home.js`: items 3, 5, 7, 9, 10, 13, the `#ride` markup in 16, the spans and class in 17, and
    `class="torn"` in 8.
  - `tools/hero-film.py`, writing `cfc-site/film/hero-phone-2.*` and `hero-wide-2.*`: items 1 and 2.
  - `CSS_V` in `scripts/chrome.js`, then the CLAUDE.md §2 regeneration order and tests.
  - CLAUDE.md, where this pass changes it: the worn hero stencil line in §3, the homepage hero in §10, and "home.css is
    not layered" in §2. It now is, with the frame states unlayered at its foot.
  - Then `node scripts/build-home.js`.
- **B, styles.** `cfc-site/home.css` only: items 4, 6, 8, 11, 12, 14, 15, 16 and 17, plus the object-position rule in 1.
  B fits the sheet to the rebuilt page.
- **Nobody edits** `cfc-site/chrome.css`, `cfc-site/ridebar.js` or `cfc-site/home.js` in this pass.

## What I check at sign-off (390 and 1440, before and after)

- **Seams.** At 360×640, 375×667, 390×844, 430×932 and 820×1180, no seam, edge or cut crosses a line of type. His face
  is visible above the mark in the poster.
- **The still.** The poster, which is also the reduced-motion still, is sharp, in daylight, and shows his face.
- **The film.**
  - No shot under 1.0 s.
  - No shot on screen twice within 3 s.
  - Wide: no two panels cut within 0.4 s.
  - The phone mp4 is 2 MB or less. LCP is no worse than today.
- **1440.** The words sit inside panel 1. The blank is clear of seam 2. Nothing sits more than 1 px off the 12-column
  lines: story photos, the year and orgs heads, the strip.
- **Phone length.** 13,500 px or less at 390 (today 14,669).
- **Rose.** Only blanks, plates, lanes and strokes. Counted.
- **Said once.**
  - 10,000 appears at display size once.
  - 4,273 appears once.
  - There's no counts table.
  - Center Ride Out appears in `#year` and `#ride` only.
  - The page carries no copy that isn't already on the site.
- **The studio gate.** The critic's total rises with no line dropping. The lab's six tasks are no slower, and tasks 1
  and 3 answer on the first screen. brand-ambassador and access-speed pass. It ships as one PR and one preview, with
  before and after.
