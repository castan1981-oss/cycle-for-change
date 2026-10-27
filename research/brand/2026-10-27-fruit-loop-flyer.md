# Brand review: The Fruit Loop flyer (Robert's ChatGPT v1 → v2), Oct 27, 2026

**Job:** get queer riders in Phoenix to the rainbow crosswalk at 5:30 on a Friday, from Dec 11, 2026 — on Instagram
(feed + Stories), on paper, and on /fruitloop/.

## Scores on v1 (all ten, each on its own axis)
Positioning 3 · Memory assets 2 · Voice 3 · Craft 1 (Kill) · Cultural filter 2 · Audience 3 · Format 2 · Proof 2 ·
System 1 (Kill) · Longevity 2.

**Position in 12 words:** every Friday night, the gay bar circuit Phoenix called the Fruit Loop.

## What v1 got right (kept)
The name. "A queer night ride through Phoenix history." "Every Friday." "Meet 5:30 pm / Roll 6:00." The rainbow
crosswalk at Central and Portland. The six crosswalk bars as an idea. Robert in the red dress as the social object.

## What the AI got wrong
- Redrew the lockup: trans bands on the **first** O (the lock is the second), a rainbow fan for a chevron with **no
  black or brown** (the two stripes that make it the Progress flag), chalk letters with a lowercase i.
- Chalk on everything, two suns on a night-ride poster, a clip-art skyline/palm/saguaro doodle.
- Re-rendered and graded the photo: halos, over-sharpening, invented wig strands, made-up decals on the bikes.
- Left out how far, free, no-drop, 18+, lights, who hosts and any way to find the ride again.

## Accepted (two specialists or more, or a fact) — applied in v2
1. The real lockup, placed not redrawn (`tools/fruitloop-poster.py` lifts it from the page's h1). 7 of 10.
2. No chalk, no scribbles, no suns, no doodle; Overpass on flat bruise; nothing over the photo. 6–9 of 10.
3. The basics on the image: about 14 flat miles · free · nobody gets dropped · 18 and up · bring two lights. 6 of 10.
4. Who hosts, and the way in: cycleforchange.org/fruitloop (digital), the /fl QR (print), @cycl_eforchange. 6 of 10.
5. The why: "The Fruit Loop was the circuit of gay bars and drag clubs downtown, mid-1940s to mid-1990s. The ride ends
   by riding it." 3 of 10.
6. One kicker everywhere: the page's "A queer night ride in Phoenix" → "…through Phoenix history". 2 of 10.
7. Native sizes: 1080×1350 feed, 1080×1920 Story (words out of the top and bottom 230 px), 8.5×11 vector PDF with the
   QR, a 1200×630 share card for /fruitloop/. 2–4 of 10.
8. Fact (Proof, checked against azleg.gov): ARS 28-817 requires a white front lamp and a red rear **reflector**; a red
   rear lamp is optional. The page said "Arizona law wants both". Fixed and cited.

## Accepted, still open
- **His original photo**, as shot, ungraded (6 of 10). v2 uses a crop of the AI render as a stand-in until he sends
  the file. Nothing merges with the stand-in.
- A night photo at the crosswalk with his lights on, after he rides the route this week (3 of 10).

## Rejected, and why
- Don't show the poster on the page, only a link (Format, System): Robert asked for it on the page, and v2 uses the
  page's own lockup, so the "second logo" problem is gone. It sits below the basics, words first on phones.
- The route drawing on the poster (Longevity, Proof): tried; at poster scale it's too small to read. Left off.
- Kill the 🍑 (Cultural only); the Voice desk calls it his call. A new tagline (Voice; Proof): one each, and Memory
  says lock the current line. Caption rewrites (Voice; Format): one each.

## Robert decides
- Dec 25 and Jan 1 are Fridays. Ride, or say "no ride" on the page and the posts? (The countdown can't skip a date yet.)
- Who leads on the Fridays he's away at events in 2027 (eight of them).
- Spring: by March the 6:00 roll is in daylight (sunset 6:27 pm on Mar 5). Keep 6:00 or move it later.

## Second look on v2 (the two Kills re-run)
- Craft 1 → 3: no Kill. Goes to 4 with his original photo at print size (≥ 1100 × 1350 px).
- System 1 → 4: no Kill. Applied: dates in plaster, not rose (rose is the blank); the share card numbered
  (`og-fruitloop-1.jpg`); the print QR at 1.5 in with a 4-module quiet zone; CLAUDE.md says the titles keep "in Phoenix"
  for search. Left as is, said so in the PR: no `CSS_V` bump (stays clear of #211/#215; sheets cache an hour).
  Later, if the poster becomes a series: one builder for all four sizes, facts read from the ride record, a crop box per
  size, a print file with bleed.
