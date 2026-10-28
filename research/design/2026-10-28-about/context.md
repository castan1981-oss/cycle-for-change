# Pass 2026-10-28-about — "About me and my mission" (`/about/`)

A new page, staged on branch `feat/about-page`. Not live, not linked from anywhere yet, noindex while it's a draft.

## Robert's brief (Oct 28, 2026, his words, trimmed)
A signature editorial experience, built like a premium independent cycling magazine feature. His revised narrative is
the source of truth. Keep every recovery reference out of the page. Don't invent personal details or replace his
language with generic inspirational copy.
- The existing CYCLE FOR stencil, After Hours palette, Overpass.
- His real photographs and cycling footage, no stock, no AI portraits.
- An intimate, cinematic opening.
- "Then Came the Bike" as the visual transition into movement and community.
- "The Love Bubble Was Real" as a distinctive photographic collage of real AIDS/LifeCycle pictures.
- "I found a version of myself I actually liked hanging out with" as a typographic statement.
- The 10,000-mile challenge as a strong visual moment.
- The mission in its own editorial composition.
- Finish with the interactive CYCLE FOR sign and clear ways to take part.
- Avoid: repetitive text-and-image blocks, generic nonprofit styling, excessive textures, decorative scribbles,
  manufactured street slang.
- The Wrenches review it for originality, emotional pacing, mobile composition, accessibility and MAAP/ASSOS-level
  polish. Nothing goes live without his approval.

## What's on the page and where it came from
- **His narrative isn't in yet.** It lives with Cadence; it's been asked for. Every place his words go is a dashed
  slot ("Robert's words go here: …"). Judge the layout with real paragraphs in mind (a few short paragraphs per
  slot). Don't score a slot as a content failure, and never propose copy for him.
- His words already on the page: the section heads ("Then came the bike.", "The love bubble was real.") and the line
  ("I found a version of myself I actually liked hanging out with."), set in house sentence case.
- Everything else is existing approved site copy: "I'm Robert." (the old Pass 37 phone intro), the mission sentence
  (the homepage standfirst / closing block), the orgs' one-liners (homepage `#orgs`), the ways-in labels, the 988 /
  Trevor line, "One year. All on the bike." (the hero caption), "Every ride gets written down." (the closing block).
- Pictures: the opening is `photos/portrait.jpg` (768×1024, the one photo where you see his eyes; full-res original
  to be asked for). The bike: his TSR film `film/tsr-1.mp4` (riders from behind, poster `tsr-1b`), then six of his
  over-the-bars photos from the registry. The love bubble: one real AIDS/LifeCycle finish-line photo
  (`photos/finish-line-2x.jpg`, the banner reads AIDS/LifeCycle) read four ways — crops that keep only Robert
  recognisable — until he sends more ALC photos. The 10,000: the road to the Sawtooths (Stanley, ID · Jun 2024),
  a 2.4:1 band on wide screens. The mission: Robert and Caleb at sunset (Caleb cleared by Robert Oct 26).
- Rooms: tar (opening) · the hinge (tar into concrete, the film across the line) · concrete (the bike + the strip) ·
  plaster (the love bubble mosaic) · drained pool (the line) · tar (10,000) · patina (mission) · bruise (the sign).
  The page ends on its own sign, so the footer's stencil is hidden (as on the homepage) and the closing block isn't
  repeated.
- Motion: the opening photo opens from a letterbox band (1.5 s, CSS); the opening words rise in; the film plays muted
  from 760px when on screen (phones: a still until tapped; a disc to pause, always); the over-the-bars strip drifts
  sideways with the scroll at ≥1024 (swipe strip on phones, plain sideways scroll with reduced motion); the line
  arrives word by word. Everything is off under reduced motion.

## Files
- `scripts/build-about.js` (the generator) · `data/about.json` (his words and the picture list) ·
  `cfc-site/about/about.css` · `cfc-site/about/about.js` · `tools/about-art.py` (the crops) · output
  `cfc-site/about/index.html`.

## Screenshots (scratch, not the repo)
`/tmp/claude-0/-home-claude/59637241-17cc-57d7-8992-4261e7875761/scratchpad/about/shots-before/`:
`about-390.png` (full page, 390 wide at 2x), `about-1440.png`, `about-820.png`, `about-1024.png`, the first screens
`about-390-first.png` / `about-1440-first.png`, and one-screen tiles `about-390-tNN.png` (390×844 at 2x) and
`about-1440-tNN.png` (1440×900). Shot with reduced-motion off, so the film on desktop shows a frame mid-play.
To serve the page yourself: an in-process `http.server` on `cfc-site/` from the same Python script that drives
Playwright (CLAUDE.md §2, Local preview).
