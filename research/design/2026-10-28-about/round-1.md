# /about/ — the Wrenches, round 1 (Oct 28, 2026)

Eleven reads on the staged page (screenshots v2): the eight studio desks, the two gates, the story desk.
A change shipped when a gate required it, when two or more desks agreed, or as an art-director ruling.

## Scores and verdicts

| Desk | Verdict |
|---|---|
| design-critic (cold) | 31/50: first screen 2, way-finding 3, hierarchy 3, finish 3, photography 3, consistency 4, desktop 3, phone 3, his 3, reading 4 |
| brand-ambassador | BLOCK (7 findings) |
| access-speed | BLOCK (2 findings) |
| art-director | 3 rulings |
| type-layout, ux-architect, design-system, photo-editor, motion-interaction, usability-lab, story-editor | findings below |

## What changed, and who asked

**Gates**
- The film. `tsr-1`'s first 1.7 s carry the retired halftone print; the 1.6 s cut kept a frame of it and its poster
  was the print (brand). From 3.6 s his edit cuts between night and day every 5–7 frames, about three flashes a second
  at the loop restart, WCAG 2.3.1's limit (access). Now `about-bike-3`: 110 frames from 1.7 s, the calm part (a dip to
  black about once a second), ending on the night shot so every loop goes night to day. The poster is the night frame
  at 3.4 s: the group and road frames have a vehicle far off, which a still can't carry (photo editor).
- Phones get a still until the disc asks (access, art-director; §3: a still, not a film, on phones).
- The wide opening crop: `-2` dropped a pale box on a driveway (brand); `-3` drops a dark box in the bushes too and
  comes in closer on his face (photo editor).
- The meta description is the homepage's own share line, word for word (brand).
- Nothing laid on a photograph: the numbers on the prints and the 8px ring came off; each print has its own
  place · month line under it (brand, design-system). A print with a file but no place · month line is still a slot.
- "In my words" and ", across the year" came off (invented labels, brand).
- The ending: four arrow rows cut to one link under the sign, "Say it on video. Five seconds." Read the last ride moved
  beside All my 2027 rides under the lane (brand, art-director, critic, ux-architect, usability: five desks).

**His words (story desk)**
- `data/about.json` is an ordered list of his sections, in his order, each naming the room it sits in, under his own
  heading as he wrote it (the first build had sentence-cased them and added periods). His line breaks and lists keep
  their shape. A room he doesn't write is left out, not left waiting. `'90s` curls as ’90s.
- The love bubble: the photographs first, then his words, so the statement lands straight off them.

**Composition**
- The cold open: one title card at the foot of the screen ("About me", his name as a byline, his lines at the opener
  size), the letterbox's top edge on the first screen (critic, lab, art-director). The `13em` column bug (234px wide)
  fixed: `13ch` on the line (type-layout, lab).
- One opener size for the chapter heads, the cold open and the mission head (type-layout, design-system).
- One right edge: every column of his words, the film and the mission's second column start on column 7 (critic,
  type-layout).
- The love bubble: a staggered set on the grid, two columns each stepping down on its own, the finish across the page;
  no overlap (critic; the brand gate's "if the overlap leaves no room for the caption, lose the overlap").
- **Art-director ruling:** 10,000 on plaster (asphalt numeral, smeared-rose lane marks, gunmetal labels): night at the
  start, day through the middle, dusk at the sign. The lane taller (56 / 96px). The numeral sized to the grid
  (type-layout's measure: 2.914 em).
- **Art-director ruling:** the mission without the sticky head; the orgs as a roll call across the page (the name on
  the left half, the line and links from column 7). Org names at `--fs-h2` (type-layout, design-system).
  "Sign up with the Center" added to the Center's row, the homepage's own label (ux-architect, §5: the org ride first).
- The help lines: 988 and Trevor on lines of their own, no dangling middot (critic, art-director, type-layout, lab).
- The sign: the mark as wide as the grid with a line kept for the plate, so typing moves nothing; the blank is the
  field's label, so tapping it puts the cursor in the field (type-layout, lab).
- **Art-director ruling:** the statement's word-by-word reveal is gone; it arrives whole.
- Tokens instead of raw values, the dead focus rules and `!important`s out, the frame states at the foot only
  (design-system).

**Motion (round 1b)**
- The letterbox opens on the house's `--t-open`, not 1200ms; if the script never runs it opens anyway at 2.5 s.
- The film's disc starts hidden (the script shows it); a film that fails to load loses its disc; tapping the picture
  plays it. "Clear the sign" has its room, so the first letter moves nothing; Enter keeps keyboard focus.

## Not done, and why
- Shared components in /chrome.css (the opener token, the sign, the film disc, the help line) — design-system's
  proposal touches the homepage and every page's stylesheet version; a follow-up pass, not this page's PR.
- The ride bar covering a Give link at the foot of a phone screen (lab): the fix is in /ridebar.js, which every page
  loads with one version; a follow-up with the next chrome change.
- The orgs before his mission words (lab) vs his words first (critic): his words lead.
- A link to /about/ from every page (ux-architect: the footer's Read column, "About me") ships with the PR that fills
  the slots and drops the noindex, never before.

## For Robert
- His narrative, and his AIDS/LifeCycle photos with the town and month for each (shot list in the PR).
- His headings: his own casing (Then Came the Bike) or the house's sentence case (Then came the bike)?
- His name: "Robert Castan, Phoenix" sits under "About me" as a byline (the site's own facts). Keep, or put his name in
  his own lines?
- The closing block's line ("I'd like to say I ride for everyone else. I ride because it changed me.") may repeat his
  narrative; once it's in, it may close on the sign and the two buttons alone.
- The orgs: on Oct 21 he didn't want to feel tied to them yet; the homepage still names them. The roll call stays only
  if he says so.
- The film is his posted TSR cut, about 518px of real detail. The original camera-roll clip would be sharper.
- A landscape photo of him, glasses off, used nowhere else, would make a better opening than the Camelback selfie
  (photo editor).
