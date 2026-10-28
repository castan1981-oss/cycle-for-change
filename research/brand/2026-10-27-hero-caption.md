# Brand read: one caption on the hero (`feat/home-hero-caption`)

Read Tue Oct 27, 2026, by `brand-ambassador`, against CLAUDE.md §3, §4 and §10 and the words Robert and Cadence approved.

**The tree I read:** `feat/home-hero-caption`, uncommitted, on `3c753fca3e` (origin/main).

**What I looked at:**
- The diffs to `build-home.js`, `home.css`, `hero-contrast.py`, `CLAUDE.md` and `chrome.js` (`CSS_V` 56).
- `cfc-site/index.html` as built. Every other change under `cfc-site/` is `?v=56` or the ride dates rolling past Tue, Oct 27 (no copy).
- The screens in `scratchpad/pass/cap2/` (first screens at 360, 375, 390, 430, 820, 1024, 1440; the story at 390) and `cap3/` (the story at 820, 1024, 1440).
- My own run of `python3 tools/hero-contrast.py`: PASS. Tightest is the caption at 820×1180, 5.59:1 (needs 4.5).

## PASS

1. **Words: pass.**
   - The caption is Robert and Cadence's text exactly: "10,000 miles. One year. All on the bike." It uses the thousands separator.
   - The moved sentence is his, word for word, with curly apostrophes: "I’d like to say I ride for everyone else. I ride because it changed me."
   - The only visible-text changes are the two hero paragraphs gone, the caption added and the sentence added to `#why`. Meta, JSON-LD, alt text and labels are unchanged.
   - No banned word, nothing from the never-list.
   - Miles: 10,000 appears as a goal, never as a fraction or a percentage. The strip under it says "training miles since June 1" and "The count restarts in 66 days", so nothing is measured against 10,000.
2. **Voice: pass, with one note.** Three short spoken fragments, and none of it is research notes. The note: the standfirst and the lede now say the same two things in a row ("I’d like to say I ride for everyone else" / "I’d like to say I’m cycling for other people"; "I ride because it changed me" / "I’m cycling because it changed me"). At 760–1023 they sit back to back. That's his approved placement, so it isn't a block. See For Robert.
3. **Lane Paint: pass.**
   - The stencil is unchanged and spells CYCLE FOR. The blank is powder rose on the film.
   - On phones under 700px tall the stencil is larger, so it's more prominent (min(42vw, 200px), was min(32vw, 150px)).
   - No new colour, font, radius, shadow or gradient. `.hero-cap` and `.story-say` inherit plaster and asphalt.
   - No hover or press rules added. No new animation.
   - Still one primary on the first screen (the Ride with me tile). Buttons keep caps.
4. **The banned look: pass.** Overpass 700 and 800 only. The letter-spacing is negative, not tracked caps. No serif, no mono, no "10000" mark, no wheel, no `///`.
5. **Too polished: pass.**
   - Taken alone, the caption could be anyone's tagline.
   - On the page it sits under his stencil, over his own film with his face. His sentence sits beside his Boise portrait. That makes it his.
6. **Photos: pass.** No new picture or film. `hero-phone-8` and `hero-wide-9` are the ones I passed. The story photos keep their captions ("Boise, ID · May 2025", "Paradise Valley, AZ · Jul 2026"). Only Robert is in them, and no vehicles.
7. **Health: pass.** No mental-health language was added.
8. **Two actions: pass.** The first screen's three actions are unchanged: the tile and two quiet links. They're there on Robert's Oct 21 call and Cadence's must, and he approved them again here ("keep the ride card and the quiet links").

## The record: two lines to fix (not a block)

- **CLAUDE.md §3, editorial homepage:** "the first screen's "who" is now the stencil, the caption and the title, not "I'm Robert"". Neither the stencil nor the caption names anyone. On the screen, the "who" is his face in the film. His name is only in `<title>` and the meta description. It should say that.
- **`home.css`, the under-700px comment:** "With one caption line instead of two paragraphs … the stencil only steps down a little there, not to 150px". On those phones the caption runs two lines. The stencil renders 151px at 360 and 158px at 375. It should say "one caption instead of two paragraphs; the stencil steps to 42vw (151px at 360, 158 at 375) instead of 32vw".

Neither changes what a visitor sees. Fix both before merge.

## For Robert

- The first screen no longer says your name. Only the browser tab and search results do. That's what you approved. It's flagged here because Pass 37's "who and what" rule came from someone you trust.
- Your sentence now sits right above a lede that says it again in longer form. If you want it said once, the cut is yours: the lede's middle, or the standfirst.
