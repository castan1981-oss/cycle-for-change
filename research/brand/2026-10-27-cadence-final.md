# Brand read: Cadence's final notes on the staged homepage (`design/2026-10-27-cadence-final`, PR #215)

Read Tue Oct 27, 2026, by `brand-ambassador`, against CLAUDE.md §3, §4 and §10, Cadence's notes, the brief, and my v9
read (`2026-10-27-home-v9.md`).

**The build I read:** `cbbc7224ed`, with a clean tree.
- `hero-wide-9.mp4` `e0386b62` / `.webm` `5deb51ba`, 88 frames each. Posters: `.jpg` `1fa3a89a`, `.webp` `1af51a82`, `.avif` `9958c312`.
- `hero-phone-8.mp4` `fb8401c1` / `.webm` `188780a6`, poster `7e09a1dd`. These are the files I passed at 07:25, unchanged.

**What I looked at:**
- Every visible string and attribute on the built page, diffed against `c796bdf7e2`.
- The diffs to `home.css`, `chrome.css`, `home.js`, `build-home.js`, `today.json` and `hero-film.py`.
- All 88 wide frames mapped back to his source frames, and the source frames themselves.
- The page rendered over every wide frame, at 1024 and 1440 (all 88 frames) and at 1280 and 1920 (the road, out 0–47).
- The page shots in `scratchpad/pass/after/` and the lab's 360×640 and 375×667 film sheets.
- A `tools/hero-contrast.py` run: PASS. The tightest stencil reading is 4.90:1 at 1024, against 3:1 needed.

## PASS

Nothing is blocked.

1. **Words: pass.**
   - The visible-text diff adds one string to the hero: "Read the last ride". It's already in `#road`, and it was on the old homepage's first screen from Oct 21.
   - One caption is new: "Phoenix · Oct 2026", under the `#today` film.
   - Gone: "Play", "0:03" and the plates "me", "one·n·ten" and "change".
   - "Pause" and "Play, 3 seconds" were already in use as labels.
   - Nothing else changed in meta, the JSON-LD or the alt text. The gravel photo's alt moved with its section.
   - No banned word, nothing from the never-list.
   - **The film caption is sourced.** The film shows the same LOVE mural (purple, green and yellow letters on siding, the teal plant above) and the same white long-sleeve kit and red glasses as the gravel photo. `today.json` has captioned that photo "Phoenix · October" since Oct 12, and the entry's date is 2026-10-12. Whether it was the same morning is Robert's to say (brief, For Robert 4). It isn't a gate.
2. **Voice: pass.**
   - No new copy.
   - On phones, "So the sign changes." now follows the Boise photo, with no sign near it. The plates were its picture. The brief puts that cut to Robert (For Robert 3).
3. **Lane Paint: pass.**
   - The stencil only spells CYCLE FOR (the hero, the header, `#today`, `#sign`), and every blank is rose.
   - No new font.
   - No new radius or shadow:
     - The map's round, shadowed dots are now 24px squares.
     - The one circle left is the `#today` film disc, the site's film control (§10).
   - The log strokes have clean square ends, and the sign's second rose bar is gone.
   - Rose in `home.css` is only on the plates, the blanks, the strip's three dashes, the log strokes and the sign's field line. Nothing new.
   - The new hover and press states are concrete, `--bone-2` and patina. No rose.
   - One primary per screen:
     - The hero has the Ride with me tile.
     - `#ride` has Sign up with the Center.
     - The header's Ride with me is a line.
   - Labels are in sentence case ("13 rides", "rides since June 1.", "From the road"), and the buttons keep caps.
4. **The banned look: pass.**
   - No serif, no mono, and no tracked caps outside the buttons. Captions are 13 / 700 Overpass in sentence case.
   - Footage of his tyre isn't the wheel mark. No 10000, no `///`.
5. **Too polished: pass, with one note.**
   - The hero, `#why` and `#today` are his: his film, his photographs, his line, the plate with his word.
   - **How this works** traded its marks for the numerals 1, 2 and 3. It's still three across (numeral, bold line, sentence), which the critic read as "any SaaS page" (`critic-before.md` 3).
   - His three lines keep it from being any brand's, so it isn't a block. It's the one section on the page that still reads as a template. Cutting it is Robert's call (brief, For Robert 6).
6. **Photos: pass.**
   - Nothing new except the `#today` film, now larger. I looked at every 10th of its 97 frames: Robert alone at the mural, with his wheel at the left edge. No vehicle.
   - Every picture is captioned with place and month.
7. **Health: pass.**
   - "Mental clarity" is on the homepage only.
   - `#orgs`, with 988 and Trevor (1-866-488-7386), now comes straight after `#today`, so the line comes up sooner.
   - Every tel link is 44px tall.
8. **Two actions: pass, on Robert's call.**
   - The first screen has three actions: Ride with me, "Find a group ride" and "Read the last ride".
   - I blocked this same set in v2, when the only OK was the builder's own CLAUDE.md line. Now there are two sources:
     - Robert's call on Oct 21 (`2026-10-21-studio-pass-1.md`, Resolution): keep "Read the last ride" on the homepage's first screen as a quiet text link, desktop only if it looks crowded on his phone.
     - Cadence's MUST (`cadence-notes.md` item 1).
   - Both links are quiet, not buttons. At 360×640 all three fit, with his face clear of the stencil in every frame of the lab's sheet. The fallback stays his.
   - Hiding the bar at ≥900 leaves fewer actions, not more.
   - Carried from v1, not new: `#orgs` (three Give links plus Help lines, by age) and `#find` (Search rides plus three links).

**Miles: pass.** "111 rides since June 1." is now a big numeral under the 10,000 in `#road`. It counts rides, its label sits right under it, and no miles sit beside it. The training count stays in the strip.

## PASS: the wide film, `hero-wide-9`

- **It reproduces.** Re-running `tools/hero-film.py` on his two clips gives the committed MP4 and all three posters byte for byte.
  - The WebM doesn't reproduce byte for byte: the VP9 encode differs from run to run.
  - The committed WebM matches the MP4 frame for frame: worst 5.5/255, median 4.8. A one-frame offset would cost about 14.
- **Each output frame comes from one source frame, once, in order.**
  - Wide panel, out 0–47: reel 247–294, the red-rock road (rows 580–1493).
  - Wide panel, out 48–72: reel 190–214, the tunnel (rows 905–1818).
  - Wide panel, out 73–87: reel 322–336, the palms shot (rows 1030–1919, x 15–1064).
  - Tall panel, out 0–87: rail 54–141.
  - The next-best match is at least 1.67× worse (out 74), and in the tall panel at least 3.5× worse.
  - The gutter is tar.
- **No holds, skips or slow motion.** 30 fps in, 30 fps out, one source frame per output frame.
- **The joins:** road → tunnel (out 47→48), tunnel → wheel (72→73) and wheel → road at the loop (87→0).
  - All three are hard cuts on his reel's own frames, with no blended frame.
  - At the loop, the tall panel jumps from rail 141 to 54. That's 1.9× a normal frame's change (it was 3× in v9), with the same man, kit, light and framing.
  - It happens on the same frame as the wide panel's cut, so the screen cuts once.
- **No grade.** The mean channel shift against his source is 2.3/255 at most, in every shot.
- **No vehicles.** All four ranges sit inside what I cleared in full frame in v9. I looked again at every output frame and zoomed in on:
  - **The road:** the far road and the hillside. Houses, the gate pillar, posts and the road curving into trees.
  - **The tunnel:** the exit, at 2.6× his source frames. A beige building with a colonnade, a planter and trees.
  - **The wheel shot:** its top edge.
    - The dark rounded shape at the top edge of out 73–76 (x 740–780) is the bottom of his handlebar drop (source x 700–750, y about 1032). It isn't the far side of the street.
    - In reel 322–336 the far kerb stays above row 1010. The opening I couldn't clear in v9 (x 660–690, y 985–1000) never comes into frame.
- **Faces: only Robert, one at a time.**
  - His face is only ever in the tall panel.
  - The wide panel never shows a face: his shadow, then his legs and bars, then his leg and shoe.
- **The posters are frame 0.** They differ from it by 5.0–5.4/255, against 14.3 or more from frame 1.

**The gate pillar (Builder B's question): a framing note, not a brand problem.**
- **What it is:** the white stucco gate pillar with its call box, cleared in v9.
- **Where it sits:**
  - **1440:** it drops into the stencil's band at out 12 and sits in the CYCLE | FOR word space for out 12–23 (0.4 s). Then it slides behind the letters, the L and then the C, through out 47.
  - **1024:** the same path, in the gap for out 12–22.
  - **1920:** it passes behind the C and Y only, never the gap.
- **Why it isn't a block:**
  - It's real footage, not a vehicle or a face.
  - It doesn't add a letter or change what the mark spells. The letters stay on top and read CYCLE FOR in every frame I rendered.
  - Whether it's readable is access-speed's measure, and `hero-contrast.py` passes.
- **Whose call:** it belongs to Cadence's item 4 ("deliberate and premium throughout the loop"), so the photo desk and the art director decide it.
- **The per-frame horizon crop (brief, "Not this pass"):** if it comes, it isn't an effect as long as it only cancels his camera's tilt. No zoom, no push, no move the camera didn't make, and one source frame per output frame. I'd gate the recut again.

## The record (not a gate)

- `tools/hero-film.py` (line 23) says "no grass", and CLAUDE.md §3 (line 256) says "its 1.3 s of grass and kerb is gone". But out 73–87 still show a grass verge and the kerb across about a fifth of the panel, top left. The words should say what's in the frame.
- CLAUDE.md §3 still describes the sign's powder dash (line 276) and "a numbered dot per ride" (line 282; also `build-home.js` line 288). The dash is gone and the dots are squares now.

## For Robert

- "Read the last ride" opens your Oct 10 TSR write-up, the only one so far. The log right under the 10,000 lists rides through Sun Oct 25. That's true of what you've written up, not of what you've ridden. Your words, so your call.
- If the hero looks crowded on your phone, your Oct 21 fallback still stands: "Read the last ride" on desktop only.
