# Cycle for Change — project context for automated content

> **PASS 27 — LANE PAINT, ON THE ROAD (Oct 6, 2026).** The homepage's graphics are things a city paints:
> the sign is the stencil over ONE screenprint of Robert and Caleb (`tools/print.py` → `img/sign-print-2.jpg`
> + `-2-phone.jpg`; bump the number when the picture changes, phones cache it; four inks + rose spot; the only print on the site, signed with the painter's mark
> `#lpMark` top right — never on a second photo); after FOR there is only the blank (a rose bar) until a
> visitor types; the numbers sit on a stop bar; the ride log is roller strokes (`.bar-mi` + `#lpRoller`,
> newest wet in powder rose); the orgs carry the hand-painted PHX–LA–SF route map; "How this works" is a
> bike lane with three marks (bicycle, roller stroke, three diamonds — never an arrow, never an icon set);
> the finder is one field plus the count with its source and lane dashes. Rules: rose means the blank and
> wet paint only (buttons and links are plaster); worn filters only above 120px; grain only in the print;
> no tracked caps with middots. Panel sheet: project doc `claude/panel-lane-paint-homepage-oct-6-2026.md`.

> **PASS 26 — LANE PAINT, NO PLEDGE (Oct 5, 2026). Read this before anything below.**
> The brand is "Lane Paint": the mark is CYCLE FOR drawn as road-stencil letters (SVG paths in
> `scripts/chrome.js`, never a font) with a rose bar as the blank. Colors are "After Hours" — the old
> token NAMES were kept so every page keeps working, but they now mean: `--bone` concrete #E1DFDB,
> `--paper` plaster #EFEDEA, `--dust` patina #A9BDB8, `--creosote` smeared rose #A84C58 (the accent),
> `--creosote-lift` / `--volt` powder rose #D9B1AA (rose on dark grounds), `--asphalt` bruise #1C1A22,
> `--tar` #141218, `--mute` gunmetal #4A4E55, `--pool` drained pool #2C4F55 (the footer). Type is
> Overpass only (`--display` and `--mono` both point at it). The wheel logo is retired. "Creosote
> house" notes below describe the previous skin; where they talk about green, read rose.
> **The pledge is gone.** Nobody pledges, votes or pays on the site: `/pledge/` 301s home, the nav
> button is "Ride with me" (`/events/2027/riding/`), the closing block on every page is the sign
> (`CHROME.pledge()` still exists by name; its copy and buttons are the no-pledge version). The
> 10,000 is Robert's own commitment; the money goes through the orgs' own rides (Cycling 4
> one·n·ten Nov 7 2026, Center Ride Out Apr 2027, Cycle to Zero May 2027). "Pledge" is never a verb
> for visitors. The homepage is generated: `node scripts/build-home.js` (the sign, the numbers, the
> last rides, why, the orgs `#orgs`, ride with me `#ride`, how `#how`, read). Its styles are the
> Pass 26 block at the foot of `/home.css`; the sign's typing lives at the foot of `/home.js`.
> Logo rules: stroke 16 (18 only under 120px), worn only on the homepage sign / end cards / big
> print, rose bar always rose (smeared on light, powder on dark), the stencil only ever spells
> CYCLE FOR, everything else goes on a rose plate in Overpass 900. Frozen until Dec 1, 2027.
> Brand storyboard and the panel review: https://claude.ai/artifact/RoGAUpeAAzk4ktA6zeDqEm
> **Oct 5, after it went live:** two sessions checked it (PR #98, then Pass 26b below — the one that
> stands). The hand pages' body copy that still said pledge / board / vote was rewritten with it;
> the journal entry (Robert's own words, "your pledge") was left alone.

> **HOMEPAGE: the redesign is live since 2026-09-27; Pass 6 (Sept 29) brightened it; Pass 23 (Oct 3) is the hero; Pass 24 (Oct 4) gave it two films; Pass 25 (Oct 4) put his photos on the inner pages.**
> `cfc-site/index.html` + `cfc-site/home.css` + `cfc-site/home.js` + `cfc-site/img/` (the
> house-graded photos; the hero is a still on phones and a film on desktop — Pass 24). The Sept 18 coming-soon-based homepage and its files
> (`coming-soon.css/js`, `main.js`, `next/home.css/js`, the feed video and audio) are
> gone — git history has them. `/next/*` redirects home.
> `/field-notes`, `/guides`, `/resources` and `/journal` are served; `cfc-site/404.html`
> is the catch-all. Content work is allowed. **Every page is in the Creosote house
> (Sept 27, 2026) and every inner page wears the homepage's chrome.** One source:
> `scripts/chrome.js` = `<head>` block, header + mobile menu, tally line, pledge
> block, footer (with the mile-updates signup). The three generators import it;
> `python3 scripts/apply-chrome.py` puts it on the hand-written pages (guides,
> field notes, resources, journal, tonight, 404). Styles: `/chrome.css` (tokens,
> type scale, buttons, nav, menu, pledge, footer — every value copied from
> `/home.css`) loads first on every inner page, then the section's own sheet.
> Behaviour: `/chrome.js` (tally, menu, signup). Titles end " — Cycle for Change".
> The cream/plum/yellow + Fraunces/Anton look is gone everywhere.
> The goal is **10,000 miles in 2027, all on the bike**. The count on the site
> is miles since June 1, 2026; never show it as a fraction of 10,000.

## Pass 26b — the Lane Paint check (Oct 5, 2026)
Robert: "Check the new layout." Every page screenshotted at 390 and 1280 after Pass 26 went live. Fixed:
- **Overpass is self-hosted** (`cfc-site/fonts/`, OFL). Google's build classes the middot (U+00B7) as a
  combining mark, so "one·n·ten" rendered as "onenten" and every " · " separator hugged the next word, on
  every page. `overpass-latin.woff2` has that one glyph reclassified (fontTools: GDEF class 3 → 1, dropped
  from the mark-to-base lookup); `overpass-latin-ext.woff2` is Google's file as served. The `@font-face`
  rules live at the top of `/chrome.css` and `/home.css` (same unicode-ranges Google uses); `CHROME.FONTS`
  is now one preload. Never load Overpass from Google again.
- The header keeps its gutter on phones (`.nav-in{padding-left:0}` was the wheel stamp's corner rule).
- Dark pages (`/tonight/`): the stencil is bone, the bar powder rose, the nav the new tar.
- The homepage's `#orgs` was being wiped by the old ballot code in home.js (it keyed on `$("orgs")`) and
  re-rendered as the vote list with "Pick this one" buttons — the heading and gutter went with it. The
  ballot now looks for `[data-ballot]`, which nothing carries. `#roadRides` is painted with `#rideCount`.
- `build-home.js` reads the ride and country counts from live.json/rides.json (it said 1,407 at 1,422).
- `apply-chrome.py` refreshes an existing closing block (`section.pledge`, and `.fn-why` on resources)
  on every run — eighteen hand pages had kept the Sept 28 "Pledge a mile" copy. 404's link too.
- "pledger / pledge page" copy in the Phoenix and SF town guides; ABC Monday (Munroe Falls) runs Apr–Oct
  (its calendar lists Oct 5), so "next ride" is next Monday, not April.
Left for Robert: the road reel's poster frame has a car far down the road (the no-cars rule); the guide
"Pledge-per-mile fundraising, explained" keeps its name (it's about charity rides in general).

## Rider pages — CONCEPT ONLY, do not build yet (Oct 4, 2026)
Robert, coming down South Mountain: riders post a ride (ride file, photos, a clip, a few words) in two
minutes, it lands on a rider profile, bots stay out, and Google trusts it. Rides first; hotels and the
rest later. **Nothing is built and nothing ships until he says so** — this note is so a session that
touches rides, towns or the board knows the plan and doesn't contradict it.
- The plan: the "CFC Ride Profiles — Concept" doc (https://claude.ai/code/artifact/bae9be7e-9c4e-4ffc-967b-a68da75a93f6).
  The mockup (phone draft, ride page, profile, from his Oct 4 ride): https://claude.ai/artifact/16m6iotqqBvnNqUMHvkGZP
- Decided: pages live under **`/riders/`** (`/riders/<handle>/`, `/riders/<handle>/<date>-<slug>/`) —
  `/rides/` is the group-ride finder and stays that. Sign-up opens to anyone 18+ (no invite beta).
  Other riders' miles show only on their own profile; the 10K stays Robert's. Rides from anywhere;
  only guide towns get "Ridden here" lists.
- Hard rules when it's built:
  - **No Strava API data on any public page**, and none through any AI step (Strava API Policy
    §2.3, §5.3, §6.2). Sources: Garmin Connect Activity API (approved app, Garmin credited on the
    page), or a .fit/.gpx file the rider drops or emails in. Strava = a plain link out only.
  - Ride pages are noindex until the rider is Verified/Known AND the page has their own words or
    original photos; every rider link carries `rel="ugc"`. Rider text is never machine-written.
  - Privacy by default: first/last half mile cut (slightly random), saved home zones, date only (no
    start time), photo/video location stripped on upload, Garmin rides arrive as private drafts.
- Open: apply to the Garmin Connect Developer Program under Cycle for Change LLC when he's ready.
  The live mile counter reads Strava today — moving it to Garmin settles §2.3 for it too.

## Pass 25 — Robert's photos through the site (Oct 4, 2026)
Robert: "What about having a whole bunch of photos edited throughout the site that I have taken." 34 of
his photos from the stockpile now run on ~40 pages that had none (guides, field notes, rides hubs, town
guides, the calendar, /pledge/, /tonight/, /resources/, the 404).
- **One registry:** `scripts/photos.js` — every photo's src, size, alt text, place · month caption and
  crop, plus `figure(key, { cls, line, caption })`. The three generators require it (`photoBand()` in
  build-rides.js is now a wrapper; `HUB_PHOTO`, `STATE_PHOTO`, `FACET_PHOTO` there; `TOWN_PHOTO` in
  build-events.js; /events/2027/ home + riding in build-calendar.js). The hand pages carry the figure
  baked in: after editing photos.js run `node scripts/apply-photos.js` to rewrite them.
- **Files:** originals in `cfc-site/photos/<key>.jpg`, graded copies in `cfc-site/img/ph/` via
  `python3 tools/grade.py --all --only <key>` (portraits 1440 tall, landscapes 1600 wide, q76; sunrise
  and sunset shots take the Pass 11 `sun` settings, the /tonight/ dusk a light `dusk` grade). `--only`
  keeps the run from re-encoding photos already live.
- **The figure** (`.ph` in /chrome.css; the same block in /home.css for /pledge/): dissolves top and foot
  into whatever it sits on (bone, or tar on /tonight/), a 2.5% side feather on desktop only; phones run it
  edge to edge in the photo's own shape (`ph--p` 4:5, `ph--l` 4:3). Desktop: portraits 4:5 at 460px,
  landscapes 3:2; `ph--wide` = 2:1 band, `ph--frame` = 3:2 the column's width. Mono caption under it.
  `.gr-photo` is gone from rides.css. The guides hub / Phoenix field notes header photo
  (`.fn-pillar-photo`) now fades in at its top on phones too.
- **No cars (Robert, Oct 4):** "I don't think we should have cars on the website — landscapes or cycling." No car, truck or van in any photo, not even parked in the distance. The Airstream, the van rack, the from-the-car dusk and four street shots with parked cars were swapped out the same day; the Sedona photo is cropped to the butte above the traffic; Portland has no photo until there's one without a car.
- **Rules:** only Robert is recognisable — riders seen from behind or far off are fine, oncoming riders
  get cropped out (pv-golden-climb was cut above them); nothing from `07-group-rides` without people's
  OK. The caption always says where it was really taken (the Hill Country guide shows a Boise road and
  says so). Never the first thing on a phone on a rides hub. Rides output isn't committed — Netlify
  rebuilds it on deploy; events, towns and the calendar are.

## Pass 24 — two films on the homepage (Oct 4, 2026)
Robert: "go through my video and photos and make a stockpile to grab from for design web pages. We
should make a cool video or two for the home page." The stockpile lives on his Mac, not in the repo:
`~/Pictures/CFC Stockpile/` (304 web-ready photos in seven folders, 54 clips, `index.html` to browse,
`manifest.csv` with each file's Photos ID; `07-group-rides` has other people in it — ask before use).
- **The hero film** (`/film/home-film.mp4`, 1600×900, 10.5 s, silent, H.264, ~4.6 MB): drone footage
  following Robert up a desert road in Phoenix, cut to a stretch with no saguaro in frame (Pass 23's
  brief), graded with the Pass 23b hero grade baked into a LUT (`strength .6, warm .10, sat .95, lift
  .15`), faded from/to bone at the loop seam. `#heroVid` sits over the still inside `.hero-media` with
  the same desktop masks; it is `display:none` under 900px, so **phones keep the still** (the floor).
  home.js (the Pass 5 film code, kept) starts it after `load`, only without reduced motion, pauses it
  off screen; it fades up on `playing` (`data-on`) and the still steps out (`data-film="on"`) so the
  fades never show two pictures. The pause control is a quiet text link next to "Read the last ride"
  (`#filmBtn`, shown once ready) — never chrome on the picture.
- **The road reel** (`/film/road-film.mp4`, 864×1080, 4:5, ~17.5 s, 13 cuts of 1.35 s from his own
  phone/Osmo/drone clips, fades from tar; poster `/film/road-film.jpg`; see 24b for the grade): in `#road`
  above the tally. Desktop plays it while it's on screen; phones wait for a tap ("Play the reel").
  Its edges dissolve into the tar; the playing dot is volt (it's on tar).
- **Pass 24b, same day — the reel, fixed.** Robert, on his phone: "This looks kinda off." It filled
  the screen, faded top and foot with hard sides (a shaded box), its control sat on the picture, and
  the bone-forward house grade washed it out on tar. Now: square on phones (`aspect-ratio:1/1`, 4:5
  on desktop), a 2.5% feather on all four edges (6–7% read as an old-TV vignette), the control is a
  mono line under the picture (dust; bone + volt dot while playing), and the cut is 864×1080 CRF 29
  (~6.5 MB) in a light grade (`reel-tar`: strength .12, lift .05, stop .1, warm .05).
- Headless Chromium can't decode H.264 — test with VP9 copies served from a scratch folder; never
  commit those. Recut: `ffmpeg … -vf "crop,scale,lut3d=<grade>.cube"` with a LUT made from
  `tools/grade.py`'s `grade()` (33-point cube), CRF ~31 slow, `+faststart`, no audio.

## Pass 23 — the hero: one photograph, one kicker, the line, two actions (Oct 3, 2026)
Robert, after the Assos homepage (an overcast photo, a mono kicker, one word, two buttons, nothing
else) — the brief, in his words: "One photograph, full bleed. No collage, no sunset, no saguaro. One
kicker in Space Mono: 10K · MILE 04,212 · PHX. Middots, not the double slash … One headline, the line.
Two actions only: Get on the board. Read the last ride. The wheel in the corner, asphalt square,
never redrawn." Live the same day.
- **The photo** is the bike against the block wall, helmet hung on the bars: `photos/bike-detail.jpg`
  → `photos/bike-detail-2x.jpg` (tools/sr.py) → `img/home-hero.jpg` (1600, phones) and
  `img/home-hero-wide.jpg` (2400×1371, 7:4, desktop), house grade. `img/hero.jpg` / `hero-wide.jpg`
  (the sunset crew) stay — `/rides/` and `/rides/az/` still use them as their photo band.
- **Phones:** the photo runs edge to edge under a clear nav for ~54svh and dissolves into the bone
  (mask 46%→90%); the copy starts inside the fade. Kicker, the line, two equal buttons, all on the
  first screen. **Pass 12's "no photo above the fold on phones" is lifted by this brief.** The photo
  is zoomed a touch into its top-left (`transform:scale(1.18)`) so the helmet and frame lead and the
  rim falls into the fade. **Desktop:** the nav is bone from the first pixel (it has text links);
  the photo runs the full width under its edge and fades in from the left (24%→60%), so the copy
  keeps bone under it. No scrim, no type over the picture — the Pass 7/11 rules hold.
- **The kicker** (`.kicker`): `10K · Mile <live count> · PHX`, Space Mono 12px/.18em, middots in
  mute, never the retired `//`. The count is `[data-miles]` (home.js paints it), shown plain —
  no zero-padding, no fraction, nothing against 10,000. "Since June 1 · the 10,000 start Jan 1"
  now lives in the From-the-road side column (`.road-tally`, with `#rideCount` and `#daysTo`) and
  in the phone bar. PHX is hand-kept.
- **Two actions** (`.hero-acts`, `.btn--hero`): "Get on the board" → `/pledge/` (the one solid
  button on the screen; volt on hover) and "Read the last ride" → `#road` (ghost; fills asphalt on
  hover — volt never sits on bone). Side by side from 360px, stacked under it.
- **The wheel in its asphalt square** (`.brand-sq`, 44px): the same drawing, on asphalt; the
  currentColor arc and hub go bone, the creosote arc lifts to `--creosote-lift`. On phones the
  wordmark hides while the nav is clear over the photo and comes back once the nav is bone; the
  menu button carries an asphalt square there too; the nav Pledge button is 44px to match.
  home.js: the nav watches `.hero-media` (clear while the photo is under it), the phone bar still
  waits for the whole hero.
- **The four picks** (Pass 22) left the hero for their own section right under it (`#picks`,
  `.s--picks`, the old sub as its lede): two by two on phones, four across on desktop. The live
  line (`#live`, Pass 13) and the big tally (`.tally-hero`) are gone from the page; the ids
  home.js still looks for are guarded.
- **Pass 23b, the same evening.** Robert, on his phone, live: "It's very blocky and doesn't really
  blend." What was wrong: three asphalt rectangles across the top (I had boxed the menu button and
  the nav Pledge to match the wheel square), a solid asphalt button, and a photo a step cooler than
  the bone, so the fade read as a seam. Now: the nav is bone from the first pixel on every screen
  (the only block left is the wheel's square; on phones the nav Pledge button is hidden — the hero's
  button, the menu and the tally bar all carry it); the photo fades in from under the nav's edge
  (`padding-top:var(--nav-h)` on `.hero-media`, mask transparent→#000 14%) and out at its foot
  (44%→96%), so it sits in the paper instead of ending; the grade is a deeper bone duotone
  (`strength=0.6, warm=0.10, sat=0.95, lift=0.15` — not the manifest default; re-run with those if
  the photo changes); both actions are hairline buttons (`.btn--hero`, asphalt fill on hover); the
  copy starts just under the fade (`margin-top:-3svh`) instead of inside it; the phone crop is
  `scale(1.3)` from `12% 0`. The rule to keep: a photo band with hard edges or chrome boxed on top
  of it reads as blocks to him — soften every edge and keep the chrome bare.
- **Pass 23c, same evening.** Robert: "I also wanna break one of the rules and make sure that we
  put Find a ride. Find a race. Find a fundraiser above the fold." So the hero carries four
  hairline buttons — Get on the board (`/pledge/`), Find a ride (`/rides/`), Find a race
  (`/events/2027/races/`), Find a fundraiser (`/events/2027/charity-rides/`) — two by two on phones
  (`.hero-acts`), one row on desktop, and "Read the last ride" (`#road`) is the quiet `.link`
  under them (`.hero-more`). The photo is 50svh on phones so the fourth button clears a 664px
  viewport. The separate picks section (`#picks`, Pass 22/23) is gone — it asked the same question
  twice — and its mission sentence now sits under the How-it-works h2 (`.how-lede`). The `.pick`
  styles left home.css with it. The hand-kept counts that rode on the picks (1,407 rides, 112
  charity rides) no longer appear in the hero; the menu still carries 1407 / 640.
- **Pass 23d, same evening — the header.** Robert: "I think we can do better for the header,
  especially on mobile it just looks sloppy." It was a 44px tile floating in a 56px strip, a 13px
  wordmark jammed against it and a small "=" at the far right. Now, on every page (home.css and
  chrome.css carry the same rules; `scripts/chrome.js` gives the mark `class="brand-sq"`): the bar
  is 64px on every screen; on phones the asphalt square IS the corner — the full bar height, flush to
  the screen's left edge (`.nav-in{padding-left:0}`), the wheel 28px inside — then the wordmark set
  to it (12.5px, .1em), then the menu glyph as two 26px lines whose right edge lands on the gutter.
  Desktop keeps the 44px square inside the column. Inner pages keep their Pledge button on phones
  as a hairline (one block per bar). Regenerated: `python3 scripts/apply-chrome.py`,
  `node scripts/build-events.js`, `node scripts/build-calendar.js`; the rides pages pick it up from
  chrome.js on the next deploy (Netlify runs tools/build-rides.js every time).

## Pass 22 — ten riders used the site (Oct 2–3, 2026)
Robert: "Create ten agents, each one a biker, ten different ways that would use the site. Let them critique
it and then let's use that to fix." Ten personas (a Boise rider flying to LA with a bike, a Phoenix first-timer,
a queer rider new to Chicago, a charity-ride fundraiser, a Boulder gravel rider, a Dallas racer, a Londoner
visiting Phoenix, a skeptical pledger, a 66-year-old e-bike rider, a Tucson ride organizer) each walked the
site on a phone and wrote up what broke. The fixes, by area — reports in the session, not the repo:
- **Rows** (`card()` in build-rides.js, `hub.js`): the mono line is now wait · pace · length · checked.
  Distance from a point shows only relative to the reader ("3 mi away"), never on static place pages
  (five riders read "3 mi" as the ride's length). `tools/lib/ride-facts.js` is the one place pace and
  length text come from (`pc`/`lg` in index.json and live.json; tests in `tools/test/ride-facts.test.js`).
  A posted average beats a keyword ("13 mph" is never "fast"). "Regroups" → "Pace groups"; the "Bike"
  filter group → "Kind of ride". E-bike facts come only from the ride's own text, never the host's name.
- **Ride page:** When / Starts at / Pace sit above the buttons; the first-time fold opens by default on
  beginner and no-drop rides and describes the easiest group the host posted; "First group ride? Start
  here →" (`/rides/about/#first-ride`) is on every ride page and beginner/no-drop list.
- **Search** (`rides.js` `CFCFind`, used by hub.js): every word must match — place (aliases, exonyms,
  London boroughs/postcodes), tag synonyms (queer → lgbtq, women → wtf…), day words, pace words, whole
  words of a name/host. A city + words gives the city sub-page's own set. Zero results never dead-end:
  Near me, the nearest hubs, Outside the US, Every state; a zip says plainly we can't read those yet.
  A one-city result shows "Narrow these →" (its /all/ page) and the town guide (`hubs.json` now carries
  `url` and `guide`).
- **Duplicate hubs:** a hub whose rides are a subset of a bigger hub's is dropped (16 went; Watford was a
  copy of London) with 301s in netlify.toml. Country tiles name cities by ride count.
- **Calendar** (`build-calendar.js`): research notes never reach a page — the build fails on "web-search
  budget", "this session", "provenance", "artifact", "scheduled task", "unverified". Projected dates say
  "· projected (2026 was Aug 15)" in the fold. Category/month pages link into `/all/` pre-filtered;
  `calendar.js` keeps filters in the URL (URL beats localStorage). "How far?" filter (`far=`). Charity rows
  always show the minimum ("Not published yet"). The first tile is "Robert's rides". /races/ says plainly
  that local amateur races live on USA Cycling's calendar.
- **Town guides** (`build-events.js`, `towns.js`): a guide names a ride by slug — `{ride:<slug>|label}` in
  text or `ride_slug` on an entry — and the build fills day/time/link from rides.json and fails on a slug
  that doesn't exist (the LA guide had the Nichols ride on the wrong day with a 404). Picks sit right under
  the h1; About/Riding/Getting-there and Sources fold. Strip lines are counted from the data ("1 with a bike
  policy in writing · 5 to ask") — never claim bike-friendly without a stated policy. Phone numbers are
  `tel:` links. `/towns/` has a jump row and an A–Z.
- **Organizer flow** (`blocks.js`, `report.js`, `rides-reports.js`): "I run this ride" (`role=host`);
  "Something changed" reveals `new_time` + `from_date` (→ a `start_times` row on re-check); "New ride"
  reveals days/time/start/drop/for/link. A host update with an email raises no public warning and starts no
  hide clock; it goes to the top of the re-check queue (`rides-freshness.js`) for a person to confirm by
  reply. The form never stamps `verified_on`.
- **/tonight/:** LGBTQ+ and women/trans/femme marks and toggles (from live.json `tags`); My week near the
  top when it has anything; a saved ride with no time shows "Date on the host's calendar →" (live.json `hl`).
- **Home + /pledge/:** the FAQ grid only applies to a `<dt>` with a mark (the pledge FAQ rendered one word
  per line); chips read "$500 at 10,000 mi"; the tally line everywhere reads "training miles since June 1 ·
  the 10,000 start Jan 1" with an ink dot (volt only inside the homepage's live disc); "Find your people"
  items are links; the town search no longer promises zip codes; "Town guides" is in every menu.
- **Floor:** small labels are ≥11px in rem (they scale with the phone's text size), small creosote text is
  creosote-ink, tap targets are 44px (chips, save stars, breadcrumbs, map labels — `map.js` loads on every
  page with a labelled map), dark buttons show an asphalt focus ring.
- **Robert decided (Oct 3, 2026):** a pledger picks their org when they commit and the money goes to that
  org — there is no vote at year-end (the org buttons say "Pick this one"; the votes function just tallies
  picks). A per-mile pledge keeps counting past 10,000 unless capped. No texts: the phone field and the
  text opt-in are gone from the form, home.js and the confirmation email.

## Search Lab — every page change is an experiment (Oct 2, 2026)
Robert's brief: track everything search-related on this site as a case study — what moves, what
lasts, and what we got wrong — on the thesis that SEO is the base under AI answers and social.
- `seo/README.md` has the method; `seo/crawl.mjs` is the weekly crawler (no dependencies);
  `seo/keywords.json` lists the tracked searches and AI questions. A scheduled run every Monday
  crawls, reads Search Console, logs merged PRs as changes on trial and writes the week's findings.
- **Every PR that changes public pages gets one line in its description:**
  `Search Lab: <what should move> · <which measure> · read <date>` (2 weeks out for indexing,
  4 weeks for rankings). The Monday run reads these.
- Day 0 facts that should shape new work: single-ride pages earn ~77% of Google clicks; the thin
  city and filter pages earn almost none; 129 pages sit "discovered, not indexed". Titles over 60
  characters are likely cut off in results (86% of pages). Prefer fewer, fuller pages over more, thinner ones until
  indexing catches up.

## Pass 22 — the homepage asks what you came for (Oct 3, 2026)
Robert: "The home page should have options. Pledge/find a ride/find a race/ or find a fundraiser."
- The hero's button + link became four picks (`.picks` / `.pick` in home.css — removed in Pass 23c, when the four links became the hero's own buttons; the Pass 22 block was where
  the old `.paths` rules were): **Pledge** (`/pledge/`, the one solid pick: asphalt, volt on hover),
  **Find a ride** (`/rides/`), **Find a race** (`/events/2027/races/`), **Find a fundraiser**
  (`/events/2027/charity-rides/`). Two by two on every screen; all four sat on the first phone screen
  until Pass 23 moved them to their own section right under the hero.
- The "Start here" photo doors (Pledge / Ride / Read) left the page — they asked the same question
  again right below. `img/door-*.jpg` are still in /img/ if a door photo is wanted elsewhere.
- Races is road, crit and stage only, so its page opens with "Racing off the road?" → Gravel ·
  Mountain bike · Hill climbs · Ultra (`CAT_LEAD` in build-calendar.js); Charity rides points at /pledge/.
- Hand-kept numbers on the picks: the ride count (with the other homepage spots) and the charity-ride
  count ("112 charity rides"). Update them when the rides merge or the calendar refresh lands.

## Pass 21 — the hub pages fold their explaining (Oct 2, 2026)
After Pass 20 Robert said yes to folding the words on the other hub pages. `BLOCKS.BUILT(items,
{ fold: true })` tucks "How this works" under a one-line `<details>` (`.dir-fold`, events.css) and
`BLOCKS.REPORT({ compact: true })` does the same for the form; `/events/` and `/towns/` use both and
their ledes are one line. `/guides/` keeps its cards (they are the content) with shorter intros.
Left alone on purpose: `/resources/` (crisis info is never behind a tap) and `/rides/about/` (it IS the
explaining page; people go there to read). The rides hubs were already clean (Pass 15).

## Pass 20 — Find a ride: what kind, then where (Oct 2, 2026)
Robert: "Find a ride … is that person looking for a group ride? … a gravel or a fundraising ride? The
next page needs to find out what's the ride … then are they looking in the United States? Outside?
… everything we build needs to be click friendly … we need [the words] for SEO but we need to find a
better way to hide it behind stuff." The journey (`tools/build-rides.js`, the Pass 20 block; styles at
the foot of `rides.css`):
- **`/find-a-ride/`** (every "Find a ride" link: chrome.js nav + menu, the homepage and /pledge/ nav)
  asks **What kind of ride?** — Group ride (→ `/rides/`), Rolling tonight, Charity ride, Gravel (→
  `/find-a-ride/gravel/`: Every week → `/rides/gravel/` or One big day → `/events/2027/gravel/`),
  Fondo or century, Multi-day tour, Race (→ the `/events/2027/` category pages), Ride with me (→
  `/events/2027/riding/`). Counts from rides.json and `data/calendar-2027.json`. Written beside
  `/rides/` (`OUT/../find-a-ride/`), so it rebuilds with the rides.
- **`/rides/`** asks **Where? Tap a state** — the tap-a-state map (`usMap()`) right there (Robert:
  "I really just love that map"), then two wide doors (Every state, as a list → `/rides/united-states/`;
  Outside the US → `/rides/world/`), the six big cities as a chip row, then who's riding. Search and
  Near me stay on top.
- **`/rides/united-states/`**: the map, the ten busiest states as rows, "All N, A to Z" folded, six cities.
- **The words go under a fold, not away:** `fold()` writes `<details class="gr-fold gr-about">` —
  crawled, one tap for a person. Use it for the explaining on every hub page; keep the picks on top.
- Homepage "Find a group ride" buttons still go straight to `/rides/` (they already said which kind).

## Pass 19 — the 2027 calendar steps down, and keeps up (Oct 2, 2026)
Robert, on his phone at `/events/2027/`: "Should we clean this up too?" The first screen was a stats
strip, the h1 and a paragraph explaining ✓ and ~, and the filters ran off the side. Now the Pass 15
pattern (`scripts/build-calendar.js`, the Pass 19 block; styles at the foot of `calendar.css`):
- `/events/2027/` = h1, one sub line, **When?** (a tile per month, its count and a bar; "N more with
  no date yet") and **Or pick what** (a door per category, plus "I'm riding" for the six), then the
  twelve deep-page tiles, "All N, with filters", the report form. No rows, no calendar.js.
- Short pages, rows only (no filters): `/events/2027/<month>/` (january…december, `date-tba/`) with
  prev/next month; `/events/2027/<category>/` (`charity-rides`, `road`, `gravel`, `mountain-bike`,
  `multi-day-tours`, `ultra-and-bikepacking`, `races`, `hill-climbs`) by month with a jump row;
  `/events/2027/riding/`. A `#slug` on any of them opens that row (`OPEN_JS`).
- The full list with every filter moved to `/events/2027/all/` (calendar.js loads only there).
- Old `/events/2027/#slug` links (the homepage's six, anything shared) still land: the home page
  reads `/events/2027/where.json` (slug → month page) and sends them to the row. Town pages link
  the month page directly. Every page is in `sitemap-calendar.xml`.
- **Keeping up:** `node tools/calendar-from-artifact.js <data.json>` brings the "2027 Ride
  Directory" artifact's data block into `data/calendar-2027.json` (slugs kept by id, on_list →
  riding, defunct → retired, the site's retired list kept, an event that silently drops off is
  retired with a reason). The twice-monthly "2027 Ride Directory refresh" scheduled task now runs it,
  rebuilds and opens a PR after republishing the artifact. The menu count lives in chrome.js; the
  homepage and /pledge/ hard-code it (update both when the count moves).

## Pass 18 — the maps get terrain, water and roads (Oct 2, 2026)
Robert, after Pass 17: the map "needs to be more detailed. It looks a little weird just being a blank
slate like that." Every state/country map (and the small city and ride maps) now carries, inside the
outline and under the dots: terrain contours, lakes, rivers and the expressways (interstates in the US).
- Data: `data/geo/detail.json`, drawn by `node tools/geo-detail.js` (Natural Earth 10m roads, rivers,
  lakes + AWS Terrain Tiles; needs `npm i --no-save pngjs`, and `NODE_USE_ENV_PROXY=1` behind a proxy).
  Contour levels come from the state's own land, so flat states still draw. Re-run when outlines.json
  changes or a new country gets rides (`--only TX`, `--only GB --country`, `--no-relief`).
- Build: `/rides/maps/detail/<st>.svg` (countries `c-<cc>.svg`) is one picture per map, drawn as an
  `<image>` clipped to the outline (`.gr-map-pic`). Maps that zoom on a phone also carry the roads and
  water inside the zoomed areas as paths (`.gr-map-zlayer`, shown only while zoomed, so they stay a
  hairline), and each zoomed region tags up to five interstates (`roadShields()`, `.gr-map-shield`),
  clear of the cities, the rides, the back button and off-land spots. Contours fade out when zoomed.
- Style: contours and roads asphalt, faint; water dust cut back to bone. The Pass 18 block in rides.css.

## Pass 17 — the area map zooms on a phone (Oct 2, 2026)
Robert, on his phone at `/rides/tx/`: the map is "a bit too small and not super easy to use and looks
kind of funky … I don't want to rework everything … but make it more friendly." Desktop is unchanged.
- `mapZoom()` in `tools/build-rides.js` (the Pass 17 block, next to `mapFigure`): cities within
  `REGION_MI` (45 mi) of each other are one region; the region's number counts each ride once (city
  hubs overlap — Dallas and Frisco share suburbs). Each state/country map gains, hidden: a bubble per
  region (dark = several cities, zooms; pale = one city, a link), a layer per multi-city region laid
  out at its zoom (`data-vb`, `data-paths`), chips ("All Texas", "Dallas area 45"), a "← Texas" back
  button, and "Every city in Texas" under the tiles. Only areas with a multi-city region get it.
- `/rides/map.js` turns it on up to 640px (`.is-live`): labels hide, bubbles show, a dark bubble or
  chip moves the viewBox in (420 ms, none with reduced motion) and narrows "Pick a city" to that
  region's tiles. Wider than 640px or without JS, the map is exactly the Pass 16 map.
- Styles: the Pass 17 block in `cfc-site/rides/rides.css`. Test: `build-rides-world.test.js`.

## Pass 16 — maps, ride buttons, photos (Oct 2, 2026)
Robert, after Pass 15 went live: "can you make even more custom buttons and graphics or even some
photos." All in `tools/build-rides.js` (the Pass 16 block) + `cfc-site/rides/rides.css`:
- **Drawn maps.** `data/geo/outlines.json` (written once by `tools/geo-outlines.js` from us-atlas /
  world-atlas, Natural Earth; run `npm i --no-save us-atlas world-atlas topojson-client d3-geo
  i18n-iso-countries` first) holds every state's and country's outline plus the Mercator numbers;
  `geoPlace()` puts a ride on it, so the build needs no map library. A state or country page opens
  on its map (a dot per ride, its cities as tappable labels — labels that can't find room skip, the
  tiles name them); a city page ends on "Where <city> sits" (its 25-mile ring, its rides dark, the
  rest light, the other cities to tap); a ride page shows its start under the facts;
  `/rides/united-states/` opens on a tap-a-state map shaded by ride count (four steps of asphalt).
  The "Every US state" / "Outside the US" tiles on /rides/ wear the outline (`/rides/maps/*.svg`).
- **The ride button** `rideBtn()` / `.gr-btn`: a stamp holding the mark, the words, an arrow
  (↗ off-site, ← back). Solid once per screen (the host's site on a ride page); `--ghost`
  everywhere else ("All N rides, with filters", Add to calendar, the short pages' way back).
  The stamp turns volt on hover — on asphalt only.
- **Badges.** Every short page carries its pick drawn big (`badge()`): the mark, or the day's two
  letters, on an asphalt square, the place under it.
- **Photos** (`photoBand()`, Robert's own, house grade, dissolving into the paper; never the first
  thing on a phone): the crew on /rides/ and Arizona, the road on Phoenix, the finish line on the
  LGBTQ+ / no-drop / beginner / WTF pages and /rides/about/. Only where they're true to the place.
- City headers wear their contour (the route art) behind the h1, fading.

## Pass 15 — step down, don't scroll (Oct 1, 2026, evening)
Robert: "The words everywhere is very overwhelming … move them through more pages but less
content. Like topic to subtopic, then that subtopic is where they find what they need." House
rule for /rides/ now (and the pattern for the rest of the site):
- **Every page asks one question with a few big picks.** `/rides/` → a place (home base + the
  biggest city in five other states, Every US state, Outside the US `/rides/world/`) or who's
  riding (the facet doors). A state/country → its cities (poster tiles), who's riding (doors to
  `/rides/<st>/<facet>/`), and the rides no city covers (inline when ≤6, else an "Other towns"
  door → `/<st>/other-towns/`). A city → two picks (New to group rides? / Want to go fast?),
  Your bike · Made for · Which day (doors to `/<st>/<city>/<road|social|…|no-drop|…|saturday>/`),
  and "All N rides, with filters" → `/<place>/all/` (the Pass 14 panel lives only there now).
- **`LIST_MAX = 12`:** a place page never shows more than 12 rows before a pick (the test checks
  every page). At or under it, the place page *is* the list. A door with one ride behind it goes
  straight to the ride; a door with none is quiet.
- **Short pages** (`subPage()`): h1, one sub line, rows. Long ones are cut by day (the week strip
  on top jumps to `#saturday`; a ride on two days shows under both) or, across a state, by town
  (one-ride towns fold into "Other towns", a "Jump to" row on top).
- **The row** (`card()` + hub.js): mark · name · when · town/hood · one mono line (Waits for you ·
  N mi · Checked Sep 30). Pace, distance and tags moved to the ride page. Separators are CSS.
- **Off the path:** how it's built + the questions + why → `/rides/about/` (FAQPage JSON-LD);
  the form → `/rides/add/`. Every list page ends with one quiet line linking both.
- **Ride page:** short lede (the long one stays the meta description), every fact carries its
  mark, "Made for" is a fact, the first-time drill and the evidence are folded (`details`).
- **Old links:** `/rides/step.js` sends `?bike=&for=&day=` on a doorway page to its `/all/` page
  (`data-all`, `data-keep` on facet pages). Every short page is in the sitemap with an ItemList.

## Pass 14 — the ride finder is tiles, not words (Oct 1, 2026)
> Pass 15 moved this panel to the `/all/` pages; the doorway pages use the same tiles as links.
Robert, on his phone, looking at `/rides/az/phoenix/`: the filters looked confusing once you used
them — a wall of mono caps chips, and tapping one changed nothing you could see (the count was a
small line below the fold). Now, on every state, city, country and facet page and inside "More
filters" on `/rides/`:
- **One generator:** `filterPanel()` in `tools/build-rides.js` (used by `searchUi()` and the /rides/
  page). Bike and Made for are **tiles** (`.gr-tile`: the mark, the name, a count top-right);
  When is the **week strip** (`.gr-day`, Mo–Su, a bar per day like the calendar's month strip,
  a creosote dot on today). The search box carries `m-search`; Near me carries `m-locate`
  (both new in `marks.svg`). The /rides/ quick chips carry marks (`.gr-chip--mk`).
- **Counts are live** (`rides.js`, `hub.js` once index.json has loaded): each tile says how many
  rides you'd get with it on, inside whatever place is typed. Bike and When are "any of",
  Made for is "all of". A tile that would leave nothing goes quiet (`aria-disabled`, dashed) and
  can't be tapped on.
- **What's left is big:** `.gr-result` under the panel — the number (`#gr-n`), the picks in words
  ("rides · gravel · Sundays"), Clear all. While it's below the fold, `.gr-jump` sits at the foot
  of the screen ("2 rides · See them ↓") and scrolls to `#gr-list` (`#results` on /rides/).
- `?day=` takes a list now (`day=sat,sun`); `today`, `weekend` and `weekday` still read. The
  `#gr-day` select is gone.

## Group rides go worldwide, and every ride says when it was checked (Sept 30, 2026)
Robert's brief: be the local expert on group rides in Europe, North and South America and beyond —
rides that are hard to find — and keep them current, because "nobody wants to look for a ride and
find out it changed or no longer exists."
- **Data:** `cfc-site/rides/rides.json` is schema v3 (`data/SCHEMA.md` → "Group rides"; code contract
  `tools/lib/rides-schema.js`): `country`, `region`, `kind` (group-ride · open-streets · critical-mass ·
  training-series), `status`, `name_en`, `language`, `visitor_notes`, `distance_km`, `last_seen`,
  `evidence`, `refresh {method, watch_url, feed_url, notes}`. `state` is US-only. Run
  `node tools/derive-ride-fields.js` after any edit (it fills the v3 defaults and derived fields).
- **Pages:** US URLs never change. New: `/rides/<country-slug>/` (`/rides/united-kingdom/`), world
  city hubs `/rides/<country-slug>/<city>/` (2+ listed rides within 40 km), `/rides/united-states/`
  (the states, as a country), "By country" tiles on `/rides/` (the `globe` mark). Search folds
  accents and knows country names and aliases (hub.js, rides.js). World pages say "local time" and
  km first. Optional `data/rides-countries.json` ({"ES": {words, where, rhythm, visitors}}) adds a
  "Riding in Spain: what to know" block to country and city pages.
- **Freshness (`tools/lib/rides-freshness.js`, the one policy):** every card says "Checked Sep 30";
  every ride page has a checked block (how, the evidence sentence, "last seen", a link to the host's
  page). Checked ≤90 days = fresh; 90–150 = still listed with "confirm with the host"; 150+ = off
  every list, index.json, live.json, the sitemap and "nearby"; its page stays with a banner and
  `noindex`, no Event markup, no .ics. Flags from `data/rides-health.json` (the machine side) or a
  rider's "gone/changed" report show a warning for 14 days, then hide the ride until a person
  re-checks it (a new `verified_on`). Ended rides keep a page for a year. .ics files stop at the hide
  date. Never stamp `verified_on` on a ride nobody checked — it is the clock.
- **Adding rides:** scouts follow `research/rides/world/BRIEF.md` and write
  `research/rides/world/<region>.json`; then `node tools/merge-ride-research.js research/rides/world/*.json`
  (gates: high/medium only, evidence under 12 months, no news-only undated rides, dedupe by city +
  day + time + host unless the starts differ, the LGBTQ never-list, geocoding, derive), then
  `node tools/build-rides.js && node scripts/build-events.js && node scripts/build-calendar.js`.
- `/tonight/` and `scripts/build-events.js` read `cfc-site/rides/live.json` (listed rides only).
- The ride-report form on a listed ride page has a fourth choice, "Still on — I rode it" (`still-on`).
- Netlify runs the rides build on every deploy and the Monday workflow forces a deploy, so rides fall
  off the lists on schedule even when no data changes. When a hub URL disappears because the data
  grew, add a 301 in `netlify.toml` (Carlsbad → Encinitas is the first).
- Never list LGBTQ-focused rides in `NO_LGBTQ_LISTING` countries (criminalisation or bans on
  gatherings / "propaganda"). The merge refuses them.
- **Upkeep (built Sept 30, 2026; plain words in `tools/RIDES-UPKEEP.md`):** Mondays 2 am Phoenix
  `tools/rides-watch.js` reads every ride's pages and feeds (ICS, JSON-LD, Strava club event pages)
  → `data/rides-health.json` (flags, proof of life) + `data/rides-queue.json/.md` + the "Rides to
  re-check" issue; `tools/rides-reports.js` brings in the ride-report form. 3 am the re-check
  workflow runs `/rides refresh 40` (`.claude/commands/rides.md`, @ride-verifier) through
  `tools/rides-apply.js` — the only way a re-check reaches rides.json — and opens a PR labelled
  rides-upkeep. `node tools/validate-rides.js` gates every change (`rides-check.yml`).

## Arizona deep sweep + start-time tables (Sept 30, 2026, evening)
Robert: "there are so many group rides that we do not have especially in Arizona" — his own 5:30 am
Thursday ride from Gainey Village wasn't listed. Arizona rides live on Strava clubs, Meetup,
RideWithGPS club calendars and shop pages, not on websites; `research/rides/az/BRIEF-AZ.md` says
where to look (public Strava event pages first). 46 new Arizona rides merged (76 in the state);
the four scout reports in `research/rides/az/` list ~80 groups we couldn't confirm (Instagram /
Facebook / login-only) for Robert to confirm by hand.
- **`start_times`** (schema, `data/SCHEMA.md`): the host's own table of start-time changes,
  `[{ "from": "2026-10-10", "start_hhmm": "07:00" }]`. `S.startOn(ride, date)` in
  `tools/lib/rides-schema.js` is the one lookup: the build shows the time in force at the next ride
  (cards, titles, JSON-LD, live.json), says the coming changes under "When", writes one .ics VEVENT
  per stretch; ride.js (`data-times`), /tonight/ and the watcher read the table date by date.
  Tucson's Shootout, PMBC's month-by-month starts and Sun City's are in. Only what the host published.
- **derive-ride-fields.js fixes:** `season: "year-round"` always means no `season_months` (month
  words in a schedule are usually dates or a start-time table — 49 year-round rides had been made
  seasonal and dropped out of "next ride"); a weekly ride never gets a `monthly_rule`; month words
  are whole words ("market" isn't March, "the start may vary" isn't May); "May–fall" reads as May–Oct.
  `tools/test/derive-ride-fields.test.js` holds the cases.
- **City hubs:** the ten biggest cities keep their hub name against a busy suburb (Phoenix stays
  `/rides/az/phoenix/`), and a city with 8+ rides of its own gets its own hub 6+ miles from the
  others (`OWN_MIN`, `OWN_GAP` → `/rides/az/scottsdale/`). Check `cfc-site/rides/hubs.json` against
  the last commit after a merge: a hub that disappears needs a 301.
- Irregular rides (posted date by date) say "Some Mondays", never "Every Monday".
- Re-check batches live in `research/rides/upkeep/` and go through `tools/rides-apply.js`.

## The deep sweep, everywhere (Oct 1, 2026)
Robert: "lets get all the places we have covered in detail like arizona." Every area the directory
covered got the Arizona treatment: 29 areas (`research/rides/deep/areas.js`, run it to refresh each
area's `_existing.tsv`), 559 new rides (716 → 1,275; 14 countries outside the US) and a source
re-check of ~700 rides already listed. `research/rides/deep/BRIEF-DEEP.md` is the scout brief (two
jobs: re-check what's listed → `<area>/upkeep.json` through `tools/rides-apply.js`; find new rides →
`<area>/<area>.json` through `tools/merge-ride-research.js`); each area has a `<area>.md` report with
the leads nobody could confirm (Instagram / Facebook / login-only) for Robert to check by hand.
- What worked for proof: public Strava club event pages, Meetup (the .ics feeds now answer "Invalid
  feed signature" for many groups), RideWithGPS (`events.json?organization_id=<id>` and
  `organizations/<id>-<slug>/calendar.ics` need no login), public Google Calendar `.ics` (the club
  page's calendar iframe `src=` holds the id; `calendar.google.com/calendar/ical/<id>/public/basic.ics`),
  WordPress events calendars (POST `/wp-admin/admin-ajax.php` with the page's nonce), ClubExpress,
  NEMBA chapter pages, `criticalmass.in`.
- Scouts ran with the WebSearch cap spent, so Strava event hunts by city were thin after wave 1.
  A second pass with search on (Strava club events per city, Instagram-only groups Robert confirms)
  is the next gain. Yields: big metros are mostly Facebook/Instagram; shop pages with no dates are
  `medium` at best. Per-host cap is 3 rides, counting rides already listed; the extras are in the reports.
- **`geocode-rides.js` backs off and retries on a Nominatim 429** (a throttled merge used to drop
  rides silently: "left out … no coordinates"). If a merge says "merged N" with N below "accepted",
  re-run it — the leftovers go through.
- **Hub names follow the data.** After every merge diff `cfc-site/rides/hubs.json` against
  `git show origin/main:cfc-site/rides/hubs.json` and add a 301 in `netlify.toml` for each vanished
  hub (this sweep: Redondo Beach, Plano, Greenlawn, Matteson, Portsmouth NH, Canton MS, Sullivan's
  Island, and Encinitas — which flipped back to Carlsbad, so the Sept 30 redirect was reversed).
  Never leave a redirect pointing at a URL that no longer exists.
- The homepage hard-codes the ride count in four places (menu, the "Find a ride" pick, lede, directory
  tile) plus "N more countries"; update them after a merge (`grep -n "1,407\|more countries" cfc-site/index.html`).

## The second pass (Oct 2, 2026)
The deep sweep's leads (~636 unproven rides, mostly Instagram / Facebook only) got a second search pass:
eight scouts by region (`research/rides/deep/second-pass/g1…g8`, brief `BRIEF-SECOND-PASS.md`), each with a
`-leads.json`, a new-rides `.json`, an `-outcomes.json` (proven | gone | still-unproven + a public contact) and a
report. 132 new rides merged (1,275 → 1,407; 18 countries outside the US), 3 re-checks through
`tools/rides-apply.js` (`research/rides/upkeep/2026-10-02-second-pass.json`).
- The WebSearch cap is shared by every agent in a session and ran out again: ~480 leads are still unproven.
- Scouts that run in parallel need their own scratch subfolders (they overwrote each other's scripts).
- Held back by the 3-rides-per-host cap: Motherland, PBA, Bicycle World RGV, CC Cycling Club, Seminole, Fat Cake,
  Valley Spokesmen, Landry's Needham, Fox Valley Bike Rack, Bike Mart (~18 recurring). Date-by-date rides (UK Breeze
  groups) need a type the schema doesn't have yet.
- Sources worth a third pass: Bike LB's public Google Calendars, `bikethetriangle.com/events/?ical=1`, Bike Mart's
  Elfsight widget JSON, more NEMBA chapter pages, Boulder BMA Monday/Thursday rides, West Texas Cycling Association
  (Lubbock) Tue/Thu drop ride.
- Hubs that vanished and got 301s: Frisco → Plano (Plano came back, so its old Plano → Frisco redirect is gone),
  Denton → Flower Mound, Paxton and Uxbridge → Millbury.
- The leads live in the "Group Ride Check" claude.ai artifact (see the project doc `claude/rides-worldwide-sept-2026.md`).

## Town guides — the destination layer (Sept 30, 2026)
Robert's brief: the site becomes the guide for a rider who lives somewhere else and is coming to
a town with a bike — "you live in Boise, you're going to LA, you're bringing the bike": where to
ride, the ride-out coffee, who fixes or rents a bike, where to sleep with it, what to do off the
bike, how to get the bike there. **And it sits everywhere we post races, fundraising rides and
group rides** (his words): every event page, every 2027 calendar row and every group-ride page
carries the town strip when a guide exists for that city.
- **Data:** `data/towns/<id>.json` grew the guide fields (`data/SCHEMA.md`, "Town guide fields"):
  `kind` (event-host | destination), `tagline`, `best_months`, `covers[]` (the cities a big guide
  speaks for), `routes[]`, `coffee[]`, `culture[]`, `clubs[]`, `bring_your_bike`, `faq[]`, hotel
  `bike_policy` / `booking_url`, `travel_links[]`. Start from `data/towns/_template.json`. Every
  field is optional; a page renders only when its data exists. First full guide: `los-angeles-ca`.
- **Pages:** `scripts/build-events.js` writes `/towns/<state>/<town>/` plus `routes/`, `coffee/`,
  `culture/`, `bring-your-bike/` next to the old `hotels/`, `restaurants/`, `bike-shops/`. The town
  page lists the clubs, the nearest group rides (rides.json, 30 mi), the town's 2027 calendar rows,
  and links the rides hub (`/rides/<st>/<city>/`). `FAQPage` JSON-LD from `faq[]`.
- **The strip:** `scripts/towns.js` is the one town lookup all three generators use —
  `TOWNS.find({ city, state, lat, lng })` matches the town's name, then `covers[]`, then the nearest
  `destination` within 25 mi — and `TOWNS.strip(t)` renders the cards. build-events (event pages),
  build-calendar (row link + strip in the details) and build-rides (ride pages, city hubs) all call
  it. Never hand-write a town strip.
- **Agents (`.claude/agents/`):** eight scouts, one section each — `route-scout`, `shop-scout`,
  `coffee-scout`, `eat-scout`, `stay-scout`, `culture-scout`, `logistics-scout`, `community-scout`
  — plus `town-editor` (opens the brief, assembles the JSON, ships the PR; the only agent that
  writes `data/towns/*.json`), `town-verifier` (re-fetches; a guide doesn't ship without its
  **ships**), `voice-editor`, `seo-geo-editor`. Rules they share: `research/towns/SCOUT-RULES.md`
  (verified = fetched; unknown = null; queer-owned only in the business's own words). Reports live
  in `research/towns/<id>/`. Run the whole thing with `/town Los Angeles, CA`, `/town refresh
  <id>` or `/town next` (`.claude/commands/town.md`).
- **Check before the build:** `node tools/verify-town.js data/towns/<id>.json` — fetches every URL,
  checks fields and vocabularies, lints banned phrases, flags undated prices and `queer-owned`
  entries whose note doesn't say where the business says so. `--all`, `--no-fetch`.
- **Rides the scouts find** go into `cfc-site/rides/rides.json` through the editor (confidence
  high/medium only), then `node tools/build-rides.js`. Build order when everything changed:
  `node tools/build-rides.js && node scripts/build-events.js && node scripts/build-calendar.js`.
- The queer lens informs the picks and never headlines a page. No mental-health language on a
  town page; if any gets in, it needs 988 + Trevor like everywhere else.

## The homepage and /pledge/ (Sept 27, 2026 — Pass 2 of the site plan)
- `cfc-site/index.html` is the door: film hero (the locked line, plain sub, Pledge a mile /
  Find a group ride), the Free / No card / 100% strip, three paths (Pledge / Ride / Read),
  How it works, the orgs + vote, the Find-your-people plane, the directory tiles + six 2027
  dates, Read, five questions, the close. Board, calculator, chart, kit and story left it.
- `cfc-site/pledge/index.html` is where every "Pledge" button on the site lands: the pledges
  form (name, email, rate chips 1/2/5/10¢ or Flat + amount, ok-text), the board, the tiers,
  the vote, the ride log + chart, the full FAQ. It is the link in bio.
- Both pages load `/home.css` + `/home.js`. home.js guards every block by element, so one
  file serves both; don't fork it. The `pledges` Netlify form now carries `rate` and `amount`.
- Nav everywhere: Find a ride · 2027 calendar · Guides · Resources · Pledge (→ /pledge/).
  The FAQ answers were drafted from the site's own copy; Robert rewrites them in his words.

## The directories (Sept 28, 2026 — Pass 3 of the site plan)
- Event pages: sign-up up top; the town strip (Sleep / Eat / Fix) with a link to the town guide;
  "Group rides around <town>" pulled from cfc-site/rides/rides.json (within 30 mi, up to 4);
  on the six rides Robert is doing (calendar `riding: true`, matched by name) the pledge block
  says "I'm riding this one" via `CHROME.pledge({ line, copy })`.
- Ride cards carry the third fact: Waits for you / Regroups / Drops (from `drop_policy`).
  The directory search row links to /tonight/. Ride pages fold Text/WhatsApp/Email under
  Share until the browser has no share sheet.
- Calendar: the "I'm riding" filter, and a strip of the twelve events that have their own page.

## The story pages (Sept 28, 2026 — Pass 4 of the site plan, the last)
- Field notes index: photo cards (`.fn-cards` / `.fn-card`, 4:5 images from /img/) and the
  "Coming in 2027" list of the six rides, hand-kept like the homepage's. Guides hub ends with
  a "From the road" strip of the same cards.
- Resources pages break two rules on purpose (apply-chrome.py does it): the crisis line sits
  right under the h1, and the page closes with the quiet `.fn-why` note, not the pledge block.
- `email/mile-updates.html` is the mile-updates email template (table-based, inline styles,
  {{placeholders}} listed at the top). Send from whatever reads the Netlify "waitlist" form.

## Pass 13 — the live line tells the truth (Oct 1, 2026)
Robert: "the live thing on the home page is kinda off." It was a black slab above the h1 that said
"Live" over a ride four days old.
- `.live` is a quiet status line now: an asphalt disc holding the dot, then mono text on the bone.
  `home.js` says "Live" and turns the dot volt (and ping) only when the last bike ride is under 36
  hours old (`is-live` on `#live`); otherwise it says "Last ride" with a bone dot. Never claim live
  on a stale ride. Volt still only sits on asphalt (the disc).
- The sub is `text-wrap:pretty` (no orphan "goes."). Fallback numbers refreshed to Oct 1 (92 days).

## Pass 12 — no photo above the fold on phones (Sept 30, 2026, evening)
Robert, on his phone: "I do not like above the fold. It doesn't look well on mobile. That picture
is probably not gonna work. The background kind of makes the logo as you scroll look weird."
- Phones (<900px): the hero is poster type on bone — the live chip, the line, the sub (shown
  again), the button, the number — with the Phoenix contour (`/rides/art/az-phoenix.svg`, the
  route art) behind it as `.hero-art` at 30%, fading out by the foot. That is the art direction's
  own fallback: a photo where there's a photo, route art where there isn't. `.hero-media` is
  `display:none` on phones; the nav is bone from the first pixel there (no transparent state), so
  the logo never sits on a picture. Desktop keeps the side-by-side split with the sharp photo.
- The crew photo still lives on desktop; the Pass 11 phone restack (photo up top, dissolving) is
  gone. Don't put a photo back above the fold on phones without asking him.

## Pass 11 — the homepage, last comb (Sept 30, 2026)
Robert: the above-the-fold still "looks a little blocky and not perfect", and the page wants more
custom icons. What changed:
- **The hero photo is sharp now.** `photos/crew.jpg` is a 1024px phone export, so at 2x screens it
  was soft and blocky. `tools/sr.py` (denoise, then EDSR 2x in tiles) wrote `photos/crew-2x.jpg`;
  grade.py reads that for `hero.jpg` (1600) and `hero-wide.jpg` (2000×1428) with a gentler
  half-stop (`stop=0.3`) so the sunset holds. Any photo that will run big goes through sr.py
  once before it goes in the manifest (crew, mural and finish-line are done: `*-2x.jpg`). The
  `<img>` sizes match the new files.
- **Phones get the split too, stacked.** The photo sits up top (58svh), whole and bright, and
  dissolves into the bone the copy sits on (`.hero-media picture` bottom mask); the copy starts
  84px up inside the fade. No scrim, no type over the picture, no hard edge where the photo
  stops. The button is asphalt everywhere; the tally sits on bone in asphalt/mute. The phone crop
  is `object-position:78% 34%` so the saguaro at the photo's left edge stays out of frame.
  Desktop keeps the side-by-side split; its tally rule stays inside the copy column.
- **Marks where the page still read as words:** the doors' "I want to" kicker, the six 2027
  rides (type before the name — `hundred` for the centuries, `distance` for the multi-day rides;
  `checked` / `date` in the status tag), Next up, the field-note cards' kickers, the guides list
  (stage marks, like the hub), the five questions, and three facts under Find your people
  (no-drop · queer rides · tonight). 46 marks on the page; every one picked by meaning.

## Pass 10 — the board is a board (Sept 30, 2026)
- `/pledge/`: the board is a sheet (`.sheet`: paper, a hairline frame, the board mark): bib
  numbers in boxes (`.slots .n`), your line on top as you type it, the open lines under it
  (`.open` rows are a quiet mono word). When the pledges function can't read names back the
  rows carry no numbers (`li.nobib`) and never claim a count. The swag is four poster tiles
  (`.swag`, marks `m-bottle` / `m-socks` / `m-jersey` / `m-bibs`, added to the sprite).
- **The card.** Once a pledge is in, `drawCard()` in home.js paints a 1080×1350 PNG on a
  canvas — the stack, I'M ON THE BOARD., the name (fitted, two lines if it must), the pledge
  line, the org, the link — shows it under the thank-you (`#cardWrap`), and "Share the pledge"
  sends it as an image where the share sheet takes files; "Save the card" downloads it. Bone,
  asphalt, creosote-ink; Outfit + Space Mono loaded through `document.fonts` first.
- The fallback numbers (the HTML tallies, the `feed` object in home.js, the four static log
  rows) were refreshed to Sept 30; refresh them whenever these pages are touched.
- The live pledges function currently answers `status: 401` — the NETLIFY_API_TOKEN in the
  site's env is refused, so the board can't show names until Robert makes a new token.

## Pass 9 — the calendar and resources (Sept 30, 2026)
- `/events/2027/`: the month strip is a bar chart (`.mo-bar`, `--h` = the month's share of the
  busiest month, set by build-calendar.js); every row is a small poster (`CAT_MARK` picks the
  category's mark, the day is a big numeral, the rest of the date small); the type chips carry
  marks; the twelve events with their own page are `.tile-p--deep` poster tiles with their 2027
  date from this calendar (never the events feed's next_date, which may be 2026) and the town's
  contour behind. Small creosote text on bone is creosote-ink everywhere on the page.
- `/resources/`: the three doors and the three age cards carry marks (help / riders / no-drop;
  youth / beginner / riders). `/tonight/` stays tar on purpose: it is the night page, and volt
  there means live.

## Pass 8 — custom graphics and marks throughout (Sept 30, 2026)
Robert: "there needs to be more custom graphics and custom icons throughout." Now:
- **The mark family is 58 pictograms** in `cfc-site/rides/marks.svg` (ride types, who it's for, the
  pledge, the event facts, the town, weather, the guides, the site). Same stroke system. A fact, a
  list row, a tile kicker or a step gets its mark: homepage facts strip, How it works (big marks),
  the orgs, the directory rows; event facts (`MARK_FOR` in build-events.js), Sleep/Eat/Fix, the
  weather heading and every forecast day (`wxMark` in events.js, from the WMO code); the
  how-it's-built tiles (`BUILT_MARKS` in blocks.js); the guides' three stages; the pledge perks.
  `.mk` is the base class (22px, currentColor); sized variants per context. Add a mark to the
  sprite, never inline; pick the mark by meaning, never decorate.
- **The 2027 route map** (`cfc-site/img/route-2027.svg`, drawn by `python3 tools/route-map.py`
  from real coordinates: the lower 48 as one stroke, the six rides, Phoenix as home) sits beside
  the six-rides list on the homepage. Re-run the script when the six rides change.
- **The ride log carries bars** (`.bar-mi`, length = miles against the longest ride shown, the
  latest in volt on tar; painted by home.js).

## Pass 7 — photos on the paper, posters everywhere, the route art drawn (Sept 30, 2026)
Robert's note after Pass 6 went live: the homepage photos "don't blend into the sections or the
background, they're just put there." Now house rules on top of Pass 6:
- **Photos live on the paper.** Every photo edge that meets bone dissolves into it with
  `mask-image` (never a wash, never a hard seam): the desktop hero fades in from the copy column
  and out at the foot with a warm radial wash across the seam; the three doors step down the page
  in a stagger and fade into their own words; Find your people bleeds to the screen's left edge;
  the close fades in from the copy; the field-note cards fade at the foot. Phone thumbnails stay
  crisp. New photos follow the same rule.
- **Events are posters.** `.ev-poster` on every event page (date as a big numeral, the town
  filling the width, the specs beside) and `.tile-p--event` tiles on the events index, state,
  town and nearby lists. States on /rides/ are `.tile-p--code` (postal code big, name small) so
  all 49 are the same size. The guides hub opens on a photo (`.fn-pillar-head--photo`).
- **The route art is drawn.** `cfc-site/rides/art/` (58 city hubs) and `cfc-site/towns/art/`
  (12 towns) hold real topographic contours from AWS terrain tiles, 7–90 KB each; both generators
  keep those folders when they rebuild, and the tiles and posters pick the art up automatically.
  Re-draw with `node tools/contour-art.js` on the Mac (`npm i pngjs` once) when a city hub or
  town is added, then run both builds. The Cowork sandbox can't reach the tile server.

## Pass 6 — brighten + the graphic system (Sept 29, 2026)
Robert's brief: the site was too dark and read as "words on a page"; he wants designed
graphics, "visually stunning, high fashion", and the film hero redone. Art direction happened
first (claude.ai project doc `claude/art-direction-prompt-kit-sept-2026.md` and the "Three
Directions" canvas); he picked 01 high-key photos where there's a photo, route art where there
isn't, poster type as the fallback. These are now house rules:
- **Tar is not a canvas.** `html` and the page sit on bone; the hero, photo planes and the close
  are on bone/bone-2 with the photo whole and bright. Dark is allowed once per page (the ride
  log on the homepage; the footer). The phone menu is bone. No gradient washes over photos, no
  grain overlay. `--sec` is roughly double what it was: air is deliberate.
- **Photos wear the house grade.** `python3 tools/grade.py --all` regrades `cfc-site/photos/`
  (originals — keep adding here) into `cfc-site/img/` (what the site loads): lifted blacks, half
  a stop over, warm, 22% bone-forward duotone. The desert at 10 a.m., not 8 p.m. Never place
  a dark-duotoned or gradient-washed photo again. Robert's picks: crew.jpg = hero (phone crop +
  `hero-wide.jpg` desktop), portrait = the Pledge door, mural = the close, finish line = Find
  your people. The film (`hero.mp4`) is gone; the hero is one still on every device.
- **Volt only ever sits on asphalt or tar** (the live chip, the button hover). Never on bone.
- **No tile is text-only.** Directory tiles are "poster tiles" (`.tile-p`, styles in
  `cfc-site/events/events.css`): the name fills the tile (type fitted to the longest word via
  `--l`, set by the generator), the count sits big at the foot, tiles alternate bone-2/paper,
  the home base is asphalt. Used on /rides/ (who / city / state) and /towns/. Generators:
  `posterTile()` in tools/build-rides.js, `townTile()` in scripts/build-events.js.
- **Route art.** `node tools/contour-art.js` (run on the Mac — it fetches AWS terrain tiles; the
  Cowork sandbox can't) draws one topographic contour per city hub into `cfc-site/rides/art/`
  and per event town into `cfc-site/towns/art/`. The generators pick the art up automatically
  (`.tile-p--art`, one stroke, asphalt, behind the type); no art = the type-only tile. After
  drawing: `node tools/build-rides.js && node scripts/build-events.js`. `cfc-site/rides/hubs.json`
  (written by build-rides) is the list of hub centres it reads.
- **Marks.** `cfc-site/rides/marks.svg` is the pictogram family (a symbol sprite; 24-unit grid,
  one 1.7 stroke, round caps, currentColor). Ride cards open with the discipline's mark
  (`.gr-mark`; `card()` in build-rides.js and hub.js are in step), facet tiles carry their
  facet's mark. Add marks to the sprite, never inline. The "icons — dead" line in the kit lock
  below refers to the retired 2025 icon set, not to this family.
- **The floor, checked at the end of every design pass, never designed from:** Creosote house
  tokens, Outfit + Space Mono, WCAG AA (creosote-ink for small text on bone), one primary
  button per screen, a still not a film on phones, no scroll-snap, 988 + Trevor on every page,
  the voice rules, 390px first.

## Pass 5 — the in-between (Sept 29, 2026)
Built from the research in the claude.ai project doc `claude/ux-research-design-and-funnels-sept-2026.md`
(same content at https://claude.ai/artifact/LhaJ5fK8MLfmdhHjpUiuwC). Robert's brief: "funky and cool"
but "storyboard-like" → "super user-friendly", between the current look and behavioralhealthguide.org.
Tokens, type and copy rules unchanged. What changed:
- Homepage: hero stops at ~72svh so the next section peeks (no more full-viewport panels);
  the film only plays on desktop, after `load`, with a pause button (`#filmBtn`); phones get the
  poster. One number in the hero (`.tally-hero`), rides + days as a mono caption. One button
  ("Pledge a mile"); "Find a group ride" is a text link. The money sentence sits under the three
  facts (`.facts-line`). The announcement bar is gone; "Next up · Nov 7" lives in the 2027 block
  (`.next-up`). New "From the road" log (`#road`, `#log[data-max]`) painted by home.js from Strava.
  Orgs have no Vote buttons on the homepage (the container is `#orgList`, so the ballot code
  skips it) — the pick is made in the pledge form. The directory section opens on a town box
  (GET `/rides/?q=`) and compact count rows, not four giant numerals. Nav labels are Outfit 15px.
- /pledge/: email is required (hint says why); chips show their total; optional cap (`name="cap"`);
  "Who are your miles for?" radios (`name="org"`: onenten / lalgbtcenter / sfaf / later) inside
  the form — on submit the pick is also cast as the browser's vote; mobile (`name="phone"`) with
  the text opt-in revealed only once a number is typed; button "Get on the board"; the form is
  replaced by the thank-you state (`#done`) with the pledge restated in dollars and a share button.
  Section order: board → the last rides → where it goes (vote buttons can now SWITCH a vote) →
  questions in two groups (The money · The ride).
- Functions: `votes.js` moves a vote instead of refusing a second one; `pledges.js` returns `org`
  with each name (never email/phone/rate/amount); new `submission-created.js` sends the
  confirmation email for the pledges form via Resend when `RESEND_API_KEY` + `PLEDGE_FROM` are set
  (optional `PLEDGE_REPLY_TO`, `PLEDGE_BCC`) — a no-op until then.
- Contrast: `--creosote-ink` #4A5639 for small creosote text on bone (creosote itself is 4.35:1);
  `--dust-deep` #8A7C66 for hairlines that must be seen; the empty board slots use `--mute`.
- Shared chrome (scripts/chrome.js, regenerated): menu "Resources · Help lines, by age", tally line
  "10,000 in 2027", footer "Where the money goes" link, signup "Send me mile updates" + the
  once-a-month note. Nav labels in chrome.css match home.css.
- Still to do from the research: /rides/ location-first "Where" tap, filter counts + load-more, the
  towns A–Z index; the monthly ledger email; the January 2028 settle-up sequence (see the doc).

## The homepage (Sept 2026 redesign)
- Same Creosote house tokens. `--tar` #1A1D18 (asphalt a step darker) is now used only for the
  ride log (Pass 6: tar is not a canvas); `--paper` #F6F1E7 for text on the creosote field and
  the poster tiles.
- Two families only: Outfit (display + body) and Space Mono (labels, data). No Space Grotesk.
- Volt means "live" and nothing else: the hero dot, the ghost under 10000, the last point on the
  miles chart, desktop hover. Never next to creosote. Creosote is used once, as the field behind
  the orgs.
- `10000` crops on the rule; `10K` appears only in the kit section. Count stays "miles since
  June 1", never shown against 10,000.
- Wiring (all in `home.js`): `/api/strava` → strava function, polled each minute while the tab is
  visible, with the same guards as before (a dead feed is never painted as 0); votes (same
  localStorage keys as before); pledges (board names; the count hides while the function can't
  read them); instagram; Netlify forms `pledges` and `waitlist`. Every number in the HTML is a
  fallback; failures show an honest message.
- The six "riding" rows are hand-kept from `data/calendar-2027.json` (`"riding": true`).
- Do NOT touch `cfc-site/index.html`, `cfc-site/home.js` or anything under `netlify/functions/`
  from the content loops.

## Directories + help pages (Sept 28, 2026 — Passes 3 and 4 of the site plan)
UX references Robert named: behavioralhealthguide.org, recovery.com, thesyn.cc. Blueprint:
the "Pass 3 Blueprint" artifact; notes in the claude.ai project doc `claude/ux-references-pass-3-4.md`.
- `/rides/` is search-first: paper hero (Pass 6; it was tar) with the search box + quick chips, a "Three taps"
  matcher (ride · pace · when), then poster tiles (by who's riding, by city, by state), the
  how-it's-built tiles, plain questions, and the add/fix form. It ships NO ride cards:
  `/rides/hub.js` fetches `/rides/index.json` (written by tools/build-rides.js) on the first
  search or filter. State, city and facet pages keep every card in HTML (`/rides/rides.js`).
- Facet pages: `/rides/lgbtq/`, `/no-drop/`, `/beginner/`, `/women-trans-femme/`, `/bipoc/`,
  `/family/`, `/gravel/` — `FACETS` in tools/build-rides.js. "no-drop" counts `drop_policy`
  as well as the tag (`tagsOf()`), so chips, tiles and pages agree. City hubs were already there.
- Cards are `<div class="gr-card">` with a stretched name link and a Save star
  (`/rides/save.js`, localStorage `cfc-week` — the same list /tonight/ calls "My week").
  hub.js renders the same markup client-side; keep `card()` and hub.js in step.
- One Netlify form for every directory: `ride-report` (add / something changed / it's gone),
  markup in `scripts/blocks.js`, submit script `/events/report.js` (kept by build-events.js).
  It replaced every "message us on Instagram" ask. `BLOCKS.BUILT()` = the four
  how-it's-built tiles. Styles for both live in `/events/events.css`.
- `/guides/` is sorted by stage: 01 Pick a ride · 02 Get ready · 03 Raise the money, then
  "From the road" (field notes, journal). New guides go in the right stage.
- `/resources/` opens on three doors: Right now (988, Trevor, 911) · For me (by age) ·
  For someone I love (988 for someone else, PFLAG, Trevor). Every resources page carries
  the phone-only `.help-bar` (tap to call 988) just before `</main>`.
- `/pledge/` lists "What you get on the board": your name, a vote, ride days (an easy open
  ride the day before each of the six 2027 events, details by email), mile updates.

## 10K kit — PRODUCTION LOCK (Sep 2026)
> **Update 2026-09-10 (after this lock was written): the lock was reopened.** The maker-pack
> specs and both lookbooks no longer match the direction. New direction: the kit adopts the
> live coming-soon site's identity — bone body, Outfit as the mark face, creosote back in
> (bibs, collar, pocket panel), asphalt 10K, volt as a single slash never adjacent to
> creosote, wheel logo kept. Surviving from the explored all-black direction: the crop,
> off-register volt, and "YOU DECIDE" as the back-hem line. Cap treatment undecided. Maker
> email on hold until the pack is rebuilt. Treat the locked specs below as the *previous*
> state until the pack is rebuilt and this section is rewritten.

If kit mockups, lookbooks, or maker files conflict with older chat, **"sand"** palette notes, slash logos, or the cream/plum/yellow Field Notes tokens below: **the kit lock wins.**

### Marks (do not mix)
| Mark | Role |
|------|------|
| **10K** | Wearable on kit (Outfit ExtraBold 800). Crop on jersey / vest back. Tiny on bibs, cap, socks, stem. Favicon uses 10K. |
| **10000** | Year / story. Coming-soon site hero. Off-bike tee back only if used. **Never on bike kit.** |
| **CYCLE / FOR / CHANGE** | Stack — hem / gripper / hangtag / site. FOR in creosote. Not a chest graphic. |
| **CFC** | Later merch left chest only. Not on bib straps. |
| Icons / `///` / wheel-C / graffiti | **Dead.** Do not revive. If they still appear on the live site, remove them — do not bend the kit toward them. |

`10000` (site/story) and `10K` (wearable) are one hierarchy, not two brands.

### Colors — Creosote house (not "sand")
- Bone `#E8DFD0`
- Creosote `#5C6B4A`
- Asphalt `#2A2E28`
- Volt `#C6FF00` (collar whip only; PMS 802 C)
- Dust `#C4B7A2`

**"Sand" is outdated naming.** Do not audit the kit or coming-soon page against a sand / black / volt-only palette. Cream / plum / acid yellow / Anton below are **paused Field Notes tokens only** — never use them to critique or redesign the kit.

### Locked product (do not redesign)
- **Jersey:** black short-sleeve **pullover, no zipper**. Bone 10K crops off edges. One volt whip at left collar (printed). Three unmarked rear pockets. House woven patch at hem only.
- **Bibs:** quiet creosote; blank black mesh straps; tiny bone 10K + gripper patch only. No large leg type.
- **Cap:** creosote cotton, tiny centered bone 10K. Not corduroy, not 10000, not stack, not CFC.
- Vest / socks / bidon / stem follow the same hierarchy.

### Packs
See `kit-handoff/` (local): `KIT-LOCK.md`, `CFC-10K-CLAUDE-DESIGN.zip`, `CFC-10K-CLAUDE-FACTORY.zip`. Inside the factory zip, `maker-pack/00-LOCKED.md` is the law if anything conflicts.

### Allowed next work
1. Kill leftover `///` / sand / old cream-plum-yellow on anything still public.
2. Men's M jersey + bibs sample / maker email from the factory pack.
3. Real conflicts between locked kit and **live** coming-soon only — do not reopen the kit to match the holding page.
4. No store required for the sample. Coming-soon stays until December.

---

You write content for cycleforchange.org. Follow these rules on every run.

## Stack (read this — it determines WHERE pages go)
- This is a **hand-written static site**. No framework, no markdown rendering,
  no SSG. The only build command is `npm install` (for the serverless functions);
  there is no step that turns markdown/data into pages.
- **Netlify publishes the `cfc-site/` directory**, NOT the repo root
  (`netlify.toml` → `publish = "cfc-site"`). Anything outside `cfc-site/` is not
  served. **Put every new page inside `cfc-site/`** or it will not deploy.
  - Legacy note: the repo-root `index.html` and the `/guides/` folder (with
    `guides.css`) are an older tree that is **not published**. Do not build there.
- The homepage is `cfc-site/index.html`. Do NOT touch it, `cfc-site/home.js`
  (pledge form, votes, Strava/Instagram wiring), `cfc-site/home.css`, or anything
  under `netlify/functions/`. Content pages style with `/chrome.css` +
  `cfc-site/styles.css` (no inline `<style>` block to edit).
- New content pages are **self-contained HTML files**, not markdown. There is no
  `/content` folder and nothing renders markdown.
  - Field Notes: `cfc-site/field-notes/<slug>/index.html`
    → lives at `cycleforchange.org/field-notes/<slug>/`
  - The Field Notes index is `cfc-site/field-notes/index.html` (`/field-notes/`).
  - Directory-style (`<slug>/index.html`) gives a clean URL with no build step.
- Start every new post from `cfc-site/field-notes/_template.html`. Keep the
  `<head>`, the nav, the footer, the JSON-LD block, and the
  `/chrome.css` + `/styles.css` links exactly as the template has them.
  Fill in the page-specific parts only.
- Publishing a post = three edits, all by hand (no loader): create the
  `<slug>/index.html`, add one row to `cfc-site/field-notes/index.html` (newest
  first), and add the URL to `cfc-site/sitemap.xml`.
- Every content page links `/chrome.css` then `/styles.css` (absolute paths) so
  it inherits the brand. Do not inline a different stylesheet.
- The header, menu, tally line, pledge block and footer are shared: edit
  `scripts/chrome.js` (and `/chrome.css`), re-run the three generators, then
  `python3 scripts/apply-chrome.py`. Never hand-edit one page's chrome. If the
  homepage nav or footer changes, change `scripts/chrome.js` to match the same day.
- Every content page ends with the shared pledge block (`CHROME.PLEDGE`) — don't
  write a page-specific CTA. Buttons are the homepage's: `.btn .btn--bone`,
  `.btn--ink`, `.btn--ghost`, `.btn--sm`; text links with an arrow are `.link`.
- The live mileage count is painted into `[data-cur]` by `/chrome.js`
  (reads `/api/strava`, leaves "—" if the feed fails — never paints a dead feed as 0).
  Show it as "miles since June 1". No percentages, no progress line against 10,000.

## 2027 ride calendar — `/events/2027/`
- Generated: `node scripts/build-calendar.js` reads
  `data/calendar-2027.json` (600+ organized US rides and races for 2027) and
  writes `cfc-site/events/2027/` (the step-down home, month/category/riding pages,
  `all/`, `where.json`; see Pass 19) + the JSON feed + `sitemap-calendar.xml`.
  Schema and rules in `data/SCHEMA.md` ("2027 calendar"). `calendar.css` and
  `calendar.js` next to it are hand-written; the page loads `/chrome.css`,
  `/events/events.css`, `/chrome.js` and `/events/events.js`.
- Edit the JSON, run the build, commit both. Never hand-edit the generated page.
- Dates: `confirmed` only when the organizer published it. `projected` keeps its
  `date_note`. No invented dates.
- /events/ is already served (netlify.toml only force-redirects guides,
  field-notes, resources and journal), so this page is public as soon as it
  is merged and deployed.

## Voice
- Short sentences. Anti-polish. Plain.
- No corporate language, no buzzwords, no hype.
- Authenticity over performance. Write like a person, not a brand.

## Never use (auto-reject the draft)
- The "$800 / two suitcases" origin line
- Any "Prescott" or "est. 2008" reference
- Career-bragging or résumé language
- Robert's age
- Robert's recovery or queer identity framed as a credential. It can lightly
  inform a piece. It never headlines.
- **Continuous sober-time, in any form.** "in recovery" / "18 years in
  recovery" is allowed; "X years sober" / "sober since" / anything implying
  unbroken sobriety is forbidden. Never reference or hint at a relapse.
- Banned words anywhere (meta, alt text, nav labels, copy): leverage, synergy,
  "journey" (as a buzzword), "passionate about," "thrilled to announce,"
  "excited to share."

## Mission first
- Every page ties back to the pledge (10,000 miles, all on the bike, 2027) and the cause.
  The old 7,500-mile swim/bike/run framing is retired — never write it.
- At least one internal link toward the pledge. The pledge form lives on
  `/pledge/` (since Sept 27, 2026), so the canonical internal link is `/pledge/`.
- Topics live at the intersection of cycling/endurance and queer mental health.

## Health-content safety (queer mental health is YMYL — handle with care)
- No medical claims you can't source. No diagnosis or treatment advice.
- Cite credible sources where a claim needs backing.
- Every mental-health page includes a crisis line:
  988 Suicide & Crisis Lifeline, and the Trevor Project (1-866-488-7386) for LGBTQ youth.
- Lived experience is experience, not advice.

## SEO / GEO
- One target query per page, in the `<title>`, the `<h1>`, and an `<h2>`.
- Real `<meta name="description">`, a `<link rel="canonical">`, clean heading
  hierarchy, descriptive `alt` text on any image.
- Put a short, quotable answer near the top (the `.fn-lede` paragraph) so AI
  assistants can cite it.
- Keep the JSON-LD `BlogPosting` block in the template and fill its fields to
  match the page (headline, description, datePublished, url, author "Robert
  Castan", publisher Cycle for Change).
- Cross-link 2 related posts at the bottom of each post (same tag where
  possible), and link every post from the index. Add new URLs to `sitemap.xml`.

## Brand on content pages — Creosote house (Sept 27, 2026)
- Tokens come from `/chrome.css` and are the homepage's: bone #E8DFD0, bone-2
  #E1D7C5, paper #F6F1E7, dust #C4B7A2, creosote #5C6B4A, asphalt #2A2E28, tar
  #1A1D18, volt #C6FF00, mute #5F5E56. Type scale: h1 = home `.h1`, h3 = home `.h3`.
- Fonts: Outfit (display + body) and Space Mono (labels, data). Nothing else.
- Creosote is the accent (eyebrow rule, link underlines, blockquote rule, kicker
  labels). Volt is not used on content pages — it means "live" (homepage, /tonight/).
- Square corners, hairlines, no shadows, no rounded pills. The end-of-post CTA is
  an asphalt block with the big "10,000" in bone.
- Reuse the `.fn-*` / `.res-*` / `.jr-*` classes in `styles.css`; don't start a
  parallel stylesheet. Share image for every page: `/og-cfc.png`.
- The old cream/plum/acid-yellow, Fraunces, Anton, Space Grotesk and the `///`
  slash are retired. Do not bring them back.
