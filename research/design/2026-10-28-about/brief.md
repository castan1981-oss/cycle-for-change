# /about/ — "About me", the brief (Oct 28, 2026)

The ask (Robert's project, Oct 28, 2026), verbatim art direction:

- Use the existing CYCLE FOR_ stencil, After Hours palette, and Overpass typography.
- Build the page like a premium independent cycling magazine feature.
- Use Robert's real photographs and cycling footage, not stock or AI-generated portraits.
- Give the introduction an intimate, cinematic opening.
- Treat "Then Came the Bike" as the visual transition into movement and community.
- Make "The Love Bubble Was Real" a distinctive photographic collage using authentic AIDS/LifeCycle imagery.
- Feature "I found a version of myself I actually liked hanging out with" as a typographic statement.
- Make the 10,000-mile challenge a strong visual moment.
- Give the mission its own powerful editorial composition.
- Finish with the interactive CYCLE FOR_ sign and clear ways to participate.
- Avoid repetitive text-and-image blocks, generic nonprofit styling, excessive textures, decorative scribbles, and
  manufactured street slang.
- Robert's latest revised narrative is the source of truth. Every recovery reference stays off the page. No invented
  personal details, no generic inspirational copy in place of his language.
- The Wrenches review it for originality, emotional pacing, mobile composition, accessibility and MAAP/ASSOS-level
  polish. Staged with phone and desktop screenshots. Nothing goes live without Robert's approval.

## What isn't in yet (so the reviewers judge the composition, not the placeholders)

- **His narrative.** It wasn't anywhere Claude could reach (project chats, docs, repo, Drive, mail); he's been asked
  for it. Every dashed box on the page is a slot for his words (`data/about.json`). The page is noindex while any slot
  is open. Expect: a couple of short opening lines (the cold open), then several paragraphs per section.
- **His AIDS/LifeCycle photos.** None are in the repo or his Drive; asked for. The collage's six frames are empty
  prints with what each could hold.
- Only the section headings and the statement line came with the brief.

## The build

- `scripts/build-about.js` → `cfc-site/about/index.html`; `cfc-site/about/about.css`, `cfc-site/about/about.js`;
  `data/about.json` (his words); `tools/about-art.py` (the letterbox crops of his Camelback selfie);
  `cfc-site/film/about-bike-1.*` (his first TSR, Oct 10, recut to drop the retired halftone frames at its head).
- Rooms: tar (cold open, letterbox, opening) · tar → concrete (Then came the bike: his film straddles the seam,
  night to day) · plaster (the love bubble collage) · patina (the statement) · tar (10,000 + the year as a lane) ·
  concrete (My mission + the orgs roll call + help lines) · tar (the sign + the ways in) · bruise (closing block) ·
  pool (footer).
