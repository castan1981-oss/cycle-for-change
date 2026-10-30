# Cycle for Change — how this repo works (current as of Oct 6, 2026)

Read this before changing anything. It is the voice, brand, safety and build spec for
cycleforchange.org. It replaces the stacked pass notes that used to live here (they described
retired skins and the retired pledge); `git log -- CLAUDE.md` has them if you need history.
Where an older doc, comment or agent file disagrees with this one, this one wins.

## 1. What this is now

- **Robert Castan rides 10,000 miles in 2027, all on the bike.** It is his commitment. Nobody
  pledges, votes, signs a board or pays anything on the site. "Pledge" is never a verb for
  visitors. `/pledge/` 301s home (`netlify.toml`).
- **The story:** cycling changed his life. He'd like to say he cycles for everyone else; he's
  really cycling for himself. That honesty is the story. Recovery and queer identity can inform a
  piece lightly. They never headline it and they are never a credential.
- **The orgs he rides for:** one·n·ten (Phoenix), the Los Angeles LGBT Center, San Francisco AIDS
  Foundation. The money goes through their own rides, never through Robert or this site:
  - Cycling 4 one·n·ten — Nov 7, 2026 — **canceled** (Robert, Oct 15, 2026). Giving to one·n·ten goes to onenten.org.
  - Center Ride Out — April 2027, LA → Ojai and back (not LA to San Diego)
  - Cycle to Zero — May 2027
- **The big thing:** group rides everywhere. Robert shows up, rides, and writes up each ride (who
  he met, what happened) with his own video. Alongside that, the worldwide group-ride directory
  (`/rides/`), where every ride says when it was last checked.
- **The number:** bike miles since June 1, 2026. One number, everywhere, never a percentage, never shown
  against 10,000. The count restarts January 1, 2027 at midnight in Phoenix, on its own (Oct 26, 2026):
  `tools/lib/season.js` is the one switch. `netlify/functions/strava.js` counts only rides (never runs or swims) inside
  the season, and never serves a cached training total as the 2027 number. The words around the number come as two
  `[data-season]` spans (`seasonText()`): the build sets which one shows, `/chrome.js` and `/home.js` re-set it in the
  browser, and the deploy's tally pass (`scripts/tally.js`) flips the homepage's. `MANUAL_BONUS_MILES` is training only.
- **Everything funnels to the site and Instagram.** The site sends no email to visitors (Robert, Oct 9,
  2026): the footer's "Mile updates" column points at Instagram, there is no signup form. Instagram is
  **@cycl_eforchange** (not @cycle_forchange).
- Primary internal link target: the homepage `/` or `/events/2027/riding/` ("Ride with me").
  Never `/pledge/`, never `/#board`.
- **Ride with me = the next ride Robert is doing** (Pass 36). **Oct 25, 2026: the one list is the calendar.**
  `RIDING` in `scripts/chrome.js` reads `data/calendar-2027.json` (`riding: true`, date order, TBA last); `NEXT_RIDES`
  is the confirmed-date rides from it (`until` = last day, Phoenix time) — a projected or TBA date never goes on the
  bar. To add or drop one of his rides: mark it `on_list` in the "2027 Ride Directory" artifact and pull it in
  (`tools/calendar-from-artifact.js`, §5), or flip `riding` in the JSON if the artifact can't wait — the refresh
  overwrites `riding` from the artifact's `on_list`, so the artifact has to agree. `SHORT` and `WHERE` in chrome.js are
  the house phrasings ("Sea Otter Classic", "LA to Ojai and back"); everything else is the calendar's own text.
  **Oct 27, 2026: the Fruit Loop heads the bar's list until its first Friday** (`FRUIT_LOOP` in chrome.js, until 2026-12-11,
  → `/fruitloop/`; Robert wanted it on the homepage's first screen "in case people go to the home page"). It's his own
  ride, not a calendar event, so it never reaches `RIDING`, the homepage's 2027 list or the riding page. After Dec 11 the bar
  rolls on to Tour de Palm Springs.
  Tour de Palm Springs (Feb 6, 2027) is first because it's first (Robert, Oct 21: his next ride). Each `href` opens
  that ride's row on the riding page, open (`/events/2027/riding/#<slug>`; studio pass 1). The nav button, the menu,
  the closing block, the homepage's first-screen tile (`#heroRide`) and the bar at the foot of every page (`.ridebar`,
  `/ridebar.js`, its last day in `data-until`) all point at the first one still ahead; the script re-picks in the
  browser and rolls on its own. Never on `/resources/` (the 988 bar owns that spot).
  **The homepage lists all of them** (`#year`, "The 2027 rides I'm doing", `yearSection()` in build-home.js): one row
  per ride, date order, the row is the link to its riding-page row; the plate carries the blank only on his orgs' rides
  (Center Ride Out → "the Center", Cycle to Zero → "SFAF"); a projected or TBA date is greyed and says so in the row's
  line; the count under Find a group ride ("13, so far") comes from the same list.
  As of Oct 25, 2026 the list is 13: Tour de Palm Springs (Feb 6), Belgian Waffle Ride Arizona (Mar 5–6), The Mid South
  (Mar 11–13), Sea Otter Classic (Apr 15–18), Center Ride Out (Apr 23–25), Cycle to Zero (May 21–23), Unbound Gravel
  (Jun 3–6), Seattle to Portland (Jul 10–11), Friends for Life Bike Rally (Toronto to Montréal, Aug 1–6), Cycle for the
  Cause (Sep 24–26), Chino Grinder (Oct 16, projected), El Tour de Tucson (Nov 20, projected), Recovery Ride (TBA).
  The homepage `#ride` section stays written for Center Ride Out (since Oct 15, 2026): it's about where the money goes
  (§5), and Palm Springs isn't one of his three orgs' rides. After Apr 25, 2027: rewrite it for the next org ride and
  rebuild everything.
- **Oct 15, 2026: Cycling 4 one·n·ten (Nov 7) is canceled and off the site** (Robert: "get anything for that ride
  off of the website"). Nothing links to it and it's not on the 2027 calendar, not even the retired list. **`/nov7/` stays** because
  Robert put the link on social media, and it **never announces anything** (Robert, Oct 16: few people signed up,
  they don't need to know): a landing page, "Ride with me in Phoenix" (Robert, Oct 16: "everything above the fold, buttons,
  less verbiage"): the photo, the sign (CYCLE FOR + "me"), four big buttons that all fit a phone's first screen down
  to 375×548 — Find a group ride (ink, → /rides/az/phoenix/), Ride with me in 2027 (→ /events/2027/riding/), Read the
  blog (→ his newest write-up, now TSR's `#robert`), Follow on Instagram — then the friends film cut to 15 s (`/film/friends-2.*`, ends on
  "Somebody always waits at the top"). No sliding Ride with me bar there. noindex, not in the sitemap. Never 404 or redirect it; never point anything at it; never write "canceled" on it.

## 2. How the site is built

### Stack
- Static HTML/CSS/JS. No framework, no markdown rendering. Netlify **publishes `cfc-site/`**, not
  the repo root (`netlify.toml` → `publish = "cfc-site"`). Anything outside `cfc-site/` is not
  served. The repo-root `index.html`, `guides/`, `logo.css` and the `cfc-mark-*` / `cfc-roundel-*`
  SVGs are an old unpublished tree; don't build there.
- Netlify build command: `npm install && node tools/build-rides.js && node scripts/build-events.js && node
  scripts/build-calendar.js` (events and calendar since Oct 21, 2026, so a passed event date clears itself). If any of
  them fails, the deploy fails and the previous deploy stays live.
- Functions in `netlify/functions/`: `strava` (behind `/api/strava`, the tally), `strava-webhook`,
  `strava-connect`, `strava-week`, `mileage`, `instagram`, `submission-created`, `deploy-succeeded` (IndexNow, §7), `rsvp`
  (behind `/api/rsvp`, the Fruit Loop RSVP, §5). The retired
  `votes` / `pledges` functions and the `/api/votes` redirect are being removed — don't call them,
  don't revive them, and never renew a Netlify token for them.

### Generators — edit the source, run the script, commit both
| Script | Writes |
|---|---|
| `node scripts/build-home.js` | `cfc-site/index.html` (the homepage). Never hand-edit index.html. |
| `node tools/build-rides.js` | everything under `cfc-site/rides/` and `cfc-site/find-a-ride/` (pages, `index.json`, `live.json`, `hubs.json`, `.ics`, maps, sitemap) |
| `node scripts/build-events.js` | `cfc-site/events/<slug>/`, `/events/`, `/towns/…`, `sitemap-events.xml` |
| `node scripts/build-calendar.js` | `cfc-site/events/2027/` (home, months, categories, `riding/`, `all/`, `where.json`), `sitemap-calendar.xml` |
| `scripts/chrome.js` | the shared `<head>`, header + phone menu, tally line, closing block (`CHROME.pledge()` — old name, no-pledge copy, no "10000" numeral), footer (Mile updates → Instagram). Required by every generator. `CSS_V` is the one stylesheet version (below). |
| `python3 scripts/apply-chrome.py` | puts chrome.js onto the hand-written pages (guides, field notes, resources, journal, tonight, nov7, 404) and refreshes their closing block (`section.pledge`, `.fn-why` on resources) |
| `scripts/photos.js` + `node scripts/apply-photos.js` | the photo registry (src, size, alt, place · month caption, crop, `band` crops, `figure(key, {cls, line, caption})`, `card(key)`); apply-photos rewrites the figures, the pillar heroes, the "From the road" cards and their JSON-LD image baked into hand pages |
| `python3 tools/grade.py --all --only <key>-2` | writes `cfc-site/photos/<key>.jpg` into `cfc-site/img/ph/<key>-2.jpg` **clean** (ungraded since studio pass 1; portraits 1440 tall, landscapes 1600 wide, q76) with `.avif` and `.webp` beside it; `box` crops are plain crops of his file. `--only` keeps live photos from re-encoding. |
| `node scripts/build-brief.js` | `cfc-site/brief/index.html` (wears the chrome; bump `V` when the engine, page script or sheet changes) |
| `python3 tools/print.py` | the Pass 27 screenprint. Not used on the hero since Pass 32; kept for reference. |
| `scripts/towns.js`, `scripts/blocks.js` | the one town lookup + strip; the shared ride-report form and how-it's-built tiles |
| `node scripts/tally.js` | the baked tally on the homepage: reads `/api/strava` (the one place the site may read Strava), keeps `data/tally.json`, and rewrites every `[data-miles]`, the four "last rides" rows and the `#tallyData` JSON that `/home.js` paints first. build-home.js applies the copy; build-rides.js refreshes it live on every deploy. Never type the number. Tests: `tools/test/tally.test.js`. |
| `python3 tools/road-film.py --src …` | the film under the 10,000 in `#road` (`cfc-site/film/road-film-N.*`, from his own footage, car-free; Oct 28, 2026) |
| `python3 tools/hero-film.py` + `python3 tools/hero-contrast.py` | the homepage hero films (`cfc-site/film/hero-*-N.*`, from his own footage, car-free) and the check that the hero's type reads on every frame of them (§3, the editorial homepage) |
| `node scripts/build-signals.js` | `cfc-site/llms.txt` (what the site is, for AI search; counts from the data) and `cfc-site/feed.xml` (RSS of guides, field notes, journal, event and town pages, newest first by the sitemaps' lastmod). build-rides.js runs it last on every build, so the deploy keeps them current. Tests: `tools/test/build-signals.test.js`. |

After a change to `scripts/chrome.js`, regenerate everything that wears it, the same day, in this
order (events and calendar read rides' `live.json`): `node scripts/build-home.js && node
tools/build-rides.js && node scripts/build-events.js && node scripts/build-calendar.js && node
scripts/build-brief.js && node scripts/apply-photos.js && python3 scripts/apply-chrome.py`, then
`node --test tools/test/*.test.js && node tools/validate-rides.js`. Never hand-edit one page's chrome.

**One stylesheet version (studio pass 1, Oct 21, 2026).** `CSS_V` in `scripts/chrome.js` goes on every stylesheet link
(`head()` replaces any old `?v=` on a section sheet), on `/chrome.js`, and on `/home.css` and `/home.js` (build-home.js).
Bump it whenever a stylesheet or `/chrome.js` changes and run the regeneration above: the sheets share cascade layers,
so a page must never pair an old `/chrome.css` with new section sheets. `netlify.toml`'s cache headers are untouched.
Check after: no page links a bare `chrome.css"`. (`/ride/` keeps its own `ride.css?v=`.)

### Committed vs built on deploy
- Committed: source, data and every generator's output (homepage, events, towns, calendar, and the
  rides pages as of your commit). Netlify reruns `tools/build-rides.js`, `scripts/build-events.js` and
  `scripts/build-calendar.js` on every deploy, so ride pages, event pages, "next ride" dates and freshness
  hiding are computed at deploy time; a daily workflow forces a deploy. Commit the rides rebuild with a data change so the diff can be reviewed.

### Styles and behaviour
- Inner pages load `/chrome.css` (tokens, type, buttons, nav, closing block, footer, `.ph`
  figure), then their section sheet (`styles.css` with its `.fn-*`/`.res-*`/`.jr-*` classes,
  `events.css`, `calendar.css`, `rides.css`, `tonight.css`). The homepage loads `/home.css` +
  `/home.js`. Share image: `/og-cfc.png`.
- `/chrome.js` paints the tally into `[data-cur]` from `/api/strava`; a failed feed leaves "—",
  never 0. Nothing else carries `data-cur` (the Ride with me bar's date is `data-until`). The tally line under the
  header is a link to the live count (`/#road`); it has no dot.
- **Cascade layers (studio pass 1).** `/chrome.css` opens with `@layer base, section;`. The generic base (tokens, type,
  `.btn`, `.link`, `.field`, `.ph`, `.pledge`, the one token block, the element type rules, the reduced-motion guard)
  is `@layer base`; every section sheet is wrapped in `@layer section{…}`; the frame (nav, menu, tally line, footer,
  ridebar, `.theme-dark`) and the system rules (focus, button, link, pick, field, door, row, fold, fact grid, the
  closing field) are unlayered at the end of `/chrome.css`, so no section sheet can undo them. `/home.css` and
  `/nov7/nov7.css` are not layered. A new rule in a section sheet goes inside its `@layer section`, at the end.

### Local preview
- Serve `cfc-site/` with an **in-process** `http.server` started from the same Python script that
  drives Playwright (a backgrounded `python3 -m http.server &` dies between tool calls). Check 390px
  first, then 820, 1024, 1440.
- Headless Chromium can't decode H.264. To test the films, make VP9 copies in a scratch folder and
  serve those; never commit them.
- After a picture changes, bump the file number (`sign-print-4.jpg` → `-5`). Safari and phones cache
  images hard.

### Shipping
- Branch + PR, never push to main. List open PRs first (`gh api repos/castan1981-oss/cycle-for-change/pulls`);
  from the container GraphQL is blocked, so create/merge with `gh api …/pulls` and
  `gh api -X PUT …/pulls/N/merge`. Public-page PRs carry a Search Lab line (§7).

## 3. Brand and design — Lane Paint (frozen until Dec 1, 2027)

### The mark
- **CYCLE FOR** as hand-drawn road-stencil letters — SVG paths in `scripts/chrome.js` (`#lpC`,
  `#lpY`, …), never a font — followed by a **rose bar: the blank**. The stencil only ever spells
  CYCLE FOR; anything else goes on a rose plate in Overpass 900.
- Stroke 16 (18 only under 120px). The bar is always rose: smeared rose on light grounds, powder
  rose on dark.
- The homepage sign: CYCLE FOR + the blank; a visitor types and the plate changes. The footer:
  the stencil with "change" on the powder-rose plate. The wheel (`mark.svg`, `assets/logo.svg`
  are leftovers) and "10000" are not marks; the kit's mark is 10K.

### After Hours palette (token names are old; values are new — keep the names, every page uses them)
`--bone` concrete #E1DFDB · `--bone-2` #D7D5D0 · `--paper` plaster #EFEDEA · `--dust` patina
#A9BDB8 (`--dust-deep` #687F7C for hairlines that must be seen, 3.2:1 on concrete) · `--creosote` smeared rose #A84C58,
the accent · `--creosote-ink` #8F3E4A, small rose text on light (4.5:1) · `--creosote-lift` and
`--volt` powder rose #D9B1AA, rose on dark · `--mute` gunmetal #4A4E55 · `--pool` drained pool
#2C4F55 (footer) · `--asphalt` bruise #1C1A22 · `--tar` #141218.

Rose means the blank and wet paint. Buttons and links are plaster/ink, not rose — **no rose on any hover or press**
(studio pass 1). Small rose text uses `--creosote-ink`. "Creosote", "volt" and "bone" are only token names now — never
colors, never words in copy or briefs.

**The one token block** (studio pass 1, end of `@layer base` in `/chrome.css`; mirrored at the end of `/home.css` without
`--sec` / `--band`): space `--s1…--s7` (8, 16, 24, 40, 64, 104, 168) and `--top --gap --sec --band --col-gap`; the fluid
type scale `--fs-small --fs-label --fs-body --fs-intro --fs-lede --fs-h4 --fs-h3 --fs-h2 --fs-display --fs-h1` and
`--measure` (30em); `--line-s` (the seen hairline, `--dust-deep`: folds, fields, picks); `--ring` (the focus ring: asphalt,
plaster inside the dark rooms — the closing block, footer, ridebar, help bar, the 988 door, `.theme-dark`); `--btn-h`
48 / `--btn-h-sm` 44; `--label` (13px / 700); motion `--t-color` 120ms, `--t-move` 200ms, `--t-open` 320ms, one
`--ease`. It never redeclares `--line`, `--line-d` or `--pad` (`/tonight/` re-points `--line`). Under reduced motion
the durations are 0 and one guard in `@layer base` stops every transition and animation.

### Type
- **Overpass only**, self-hosted from `cfc-site/fonts/` (OFL). Never load it from Google Fonts:
  Google's build treats the middot as a combining mark ("one·n·ten" renders "onenten").
  `overpass-latin.woff2` has that glyph reclassified (fontTools: GDEF class 3 → 1, dropped from the
  mark-to-base lookup); `overpass-latin-ext.woff2` is Google's file as served. The `@font-face`
  rules sit at the top of `/chrome.css` and `/home.css`; `CHROME.FONTS` is one preload.
  `--display`, `--body` and `--mono` all point at Overpass.
- Labels, eyebrows, kickers: **sentence case**, 13px / 700, gunmetal. Nothing under 12px.
- Text links: `.link`, 15px / 700, hairline underline. Its arrow is the link's affordance; no
  other arrows or chevrons as decoration.
- **Buttons alone keep caps** (a road sign): 13px / 800 / .04em. `.btn`, `.btn--bone`, `.btn--ink`,
  `.btn--ghost`, `.btn--sm`. One primary button per screen.

### Graphics
- **The mark family** — `cfc-site/rides/marks.svg`: a symbol sprite on a 24 grid, one 1.7 stroke,
  round caps, `currentColor`, `.mk` base class. Pick a mark by meaning, never to decorate. Add new
  marks to the sprite (homepage ones are inlined in build-home.js as `#mkPhx`, `#mkOjai`, `#mkSF`,
  `#mkRide`, `#mkWrite`, `#mkOrgs`, and the finder's `#mkGroup` / `#mkFinish`, also in the sprite as
  `m-group` / `m-finish`).
- Graphics are **drawn clean — never painted, worn or grained.** The only wear on the site is the
  big desktop hero stencil (`#lpWorn`). `#lpWornSoft` / `#lpRoller` are a small hand edge only (no
  holes, no streaks); on phones the stencil is clean (`.sign-mark [filter]{filter:none}`).
- Square corners, hairlines, no shadows, no pills, no gradient washes or grain over photos.
- **Photos have a clean edge** (studio pass 1, Oct 21, 2026; Robert: a feathered photo "looks unfinished"). Edge to
  edge on phones, on the grid on desktop (`.ph` + `--wide` 2:1 band, `--frame` 3:2, `--tall` / a lone portrait 4:5 on
  five of twelve columns). **No mask, no fade, no wash, no frame, no grade** — anywhere, the homepage hero's inner edge
  and `#today` included. Nothing laid over a picture except the homepage hero's measured flat scrim. The place · month
  caption sits under the photo on its left edge, 13px / 700 gunmetal. A wide band uses its own art-directed crops
  (`band` in `scripts/photos.js`), never `object-fit` guesses.

### Banned look
- Serif italic accents; small mono caps with middots; tracked caps labels; Claude's default three
  fonts.
- Retired forever: Outfit, Space Mono, Space Grotesk, Fraunces, JetBrains Mono, Anton; creosote
  green / volt yellow / old bone as colors; plum / cream / acid yellow; the `///` mark; the wheel;
  "10000" as a mark.

### Accessibility floor (check at the end of every design pass)
390px first. WCAG AA (smeared rose on concrete is 4.11:1 — only large text; small rose text is
`--creosote-ink`). Tap targets 44px. Visible focus. Labels on every field. A still, not a film, on
phones. Respect reduced motion. 988 + Trevor wherever mental health comes up.

### The Wrenches — the design studio (Oct 21, 2026)
The design studio is **The Wrenches** (Robert's name for it, Oct 21, 2026). Robert: "usability and an image that is
visually easy to navigate and enjoyable to look at … modern and high fashion in the sense that it looks polished."
Eight agents polish the site **inside** this frozen identity: `art-director`, `ux-architect`, `type-layout`, `design-system`,
`photo-editor`, `motion-interaction`, `usability-lab`, `design-critic` (roster in
`.claude/agents/README.md`). The bar — the eleven moves, the ten-line score, the six core tasks —
is `research/design/STUDIO.md`. `/design site | <page> | check <page>` runs a pass; notes go in
`research/design/<date>-<pass>/`. A pass ships only when the critic's cold score rises with no line
dropping, no core task gets slower, and `brand-ambassador` + `access-speed` pass — as one PR Robert
checks on his phone before it merges.
- **Two builders, no shared file.** A pass's brief names who owns which file: one builder owns the stylesheets, the
  other the generators, the photo system, the behaviour JS, the hand pages it names, images, tests and CLAUDE.md. They
  work at the same time, then the markup builder regenerates once (the §2 order) and the CSS builder fits its sheets to
  the rebuilt pages. Nobody hand-edits generated output. Nobody stashes, resets or `add -A`s in a shared checkout.
- **Rulings the studio keeps** (pass 1): one primary per screen; inner pages' header Ride with me is a line at ≥900 that
  fills on hover (the homepage header is its own); one fold marker (right edge, "+" then "−", never rotating); crumbs
  look like links (13px / 700, a patina hairline; the current page gunmetal); the tally line is `--fs-small`.
- **One ending.** Every inner page ends on the closing block (`CHROME.pledge()`, two actions: Ride with me and Find a
  group ride) as a full-width bruise field, with the footer flush under it in **drained pool** — on every page, the
  homepage included. Nothing in `<main>` comes after the closing block (apply-chrome.py moves a hand page's back link and
  notes above it). Resources pages close on `.fn-why` instead, as before.
- **One nav list.** Header: Find a ride · 2027 calendar · Towns · Guides · Resources (Guides replaced Field notes, which
  stays in the footer and on `/guides/`). The phone menu uses the same names. `/chrome.js` lights Guides on `/guides/`,
  `/field-notes/` and `/journal/`, Find a ride on `/brief/`, in the nav and the phone menu. 988 is tap-to-call in the
  menu and the footer. The footer's Ride column has Brief a ride (Events left it).
- **Copy is never invented by the studio.** Cutting repeated words is fine; every label it uses already exists on the
  site. A desk that wants one of Robert's rules changed writes it under "For Robert" in its brief.

### The editorial homepage (Oct 26, 2026)
Robert and Cadence (the art director he brought in) approved a new homepage direction on Oct 26, 2026, and Robert lifted
the freeze above for it ("Everything is to go you have my permission"): "a blend of MAAP's fashion-editorial energy and
ASSOS's precision, but original to Cycle for Change. Softer/feminine, premium and expressive." The brief is
`research/design/2026-10-26-editorial-home/` (with the Wrenches' and the desks' reviews). What it changes, on the
homepage only; every other rule in this section still holds there and everywhere else:
- **The first screen is his film, full screen** (`100svh`): `cfc-site/film/hero-phone-8.*` (608×1080, one full frame:
  the rail-yard take alone, uncut, 4.5 s, his face in the top quarter; phones and portrait screens) and
  `hero-wide-9.*` (1620×960, 88 frames: the wide left panel the words sit in, cut on its own clock — the red-rock road
  cropped to its lower part (a static region, rows 580–1493 of the clip, so the ridge and the roadside gate pillar sit
  higher as the camera tilts up; not a tracked crop), then the tunnel cropped low to the bike and his legs, then half a
  second of the wheel on the road, with a strip of grass verge and kerb at the top left (the palms shot's last 15
  frames, out 73–87; the shot's first 1.3 s is gone) — and the
  tall right panel, the rail-yard take uncut (its frames 54–141), so one face on the screen at a time; the gutter at 70%
  so no nav link sits on it; landscape ≥760px; every cut on a frame), cut by `python3 tools/hero-film.py --rail … --hit …`
  (`--n` numbers the phone film, `--wide-n` the wide one: they carry their own numbers, bump the one that was recut) from
  the clean clips Robert sent on Oct 27, 2026 after "the video needs to be changed" (v1–v8 used road-film-2; the v1
  three-band cut put seams through the type), car-free, only him recognisable. **It plays on phones too** (this replaces
  "a still, not a film, on phones" for the hero): muted, inline, looped, after load, never under reduced motion, Save-Data
  or a 2G/3G connection, paused off screen, with a Pause button always there (WCAG 2.2.2). The poster is the film's first
  frame and the page's LCP. Over it: the stencil (clean, no wear: the hero no longer carries `#lpWorn`), **one caption, "10,000
  miles. One year. All on the bike."** (`.hero-cap`, 700, small and quiet; Robert and Cadence, Oct 27, 2026: the two
  paragraphs came off so the footage carries the screen; each phrase is a no-wrap span so a phone breaks between them), one primary (Ride with me, `#heroRide`, the date on a rose plate) and two quiet links, "Find a group ride" (the
  approved direction) and, when there is a write-up, "Read the last ride" (Cadence's must, Oct 27, 2026: `NOTE.href` in
  build-home.js, his newest write-up, never the riding page; omitted when there is none). "Read the last ride" stays in
  `#road` too. **Oct 30, 2026: a third quiet link, "Give to my Center Ride Out"** (Robert: his Instagram bio sends people to
  the homepage, "I would rather they go to cycle for change and then click this link to go to the LGBT center"): his own
  fundraiser page on the Center's site (`CRO_GIVE` in build-home.js), also `#ride`'s primary ("Give to my ride"), the
  Center's "Give to the Center" in `#orgs`, and the first button in the Center Ride Out row on the riding page (`GIVE` in
  build-calendar.js). `hero-contrast.py` passes with it (links 7.8:1 and up). It comes off with the `#ride` rewrite after Apr 25, 2027. The scrim rides with the words, not the screen (`.hero-in::before`): it eases in over the 200px
  above the stencil, .6 at its top, .72 at the foot — measured against every frame of both films at nine screen sizes
  (3:1 for the stencil, 4.5:1 for the caption and the links): `python3 tools/hero-contrast.py` after any
  recut or change to the hero's type or scrim (exits 1 on a fail). Over the film the header is the site's solid bar on
  tar with a hairline, carrying only the menu (the nav links at ≥900); the mark and the header's Ride with me come back
  once the film has scrolled under it (the hero carries both, so nothing is said twice).
- **Two textures, small:** a fine asphalt aggregate (`img/home/asphalt-2.webp`, a 2x tile, opacity .24) on the two dark
  rooms only (`#road` and `#sign`), never on a photo; one lane dash at the head of each of the strip's three numbers
  only (`img/home/dash-rose-1.svg`, a drawn shape, no filter) — rose as wet paint, lined up with what it marks. The
  sign's dash is off (Oct 27, 2026: the blank is its bar; `dash-powder-1.svg` is unused).
  `python3 tools/home-art.py` draws them. Torn-paper captions and a drawn bicycle were in the approved direction and were
  cut in review (they read as decoration and no drawing was good enough); captions are plain place · month lines.
- **Rose on the homepage** is the blank, the plates, the lane paint and the log strokes. Nothing else.
- **The 2027 rides get a map** (≥760px; `tools/home-map.js` → `data/geo/home-2027.json` → `img/home/map-2027.svg`): a
  numbered square per ride at its start town (24px ink with a plaster numeral; a plaster square with a dashed patina
  edge when the date is projected or TBA; no radius, no shadow), the list's numbers in the same style, a small square
  for Phoenix, nothing drawn between (never a route we drew), numbers as HTML; the whole lower 48 with a margin, no Canada fill (any box cuts it with a straight edge). Rows are
  outlined date blocks (dashed when projected/TBA); from 1024 the map takes eight columns with the key and the dates note
  beside it, and the list runs in two columns under both.
- **One opener size** for the big section heads (`.story-h .year-h .orgs-h .find-h`, 800), 900 kept for the 10,000, the
  plates and the date numerals. Section labels on a hairline (`.rule`) only where the site already had the label.
- **The orgs sit on patina** (the soft room), with the 988 / Trevor line in the section.
- **Said once:** the 10,000 is the big plaster numeral in `#road`; the training count lives in the strip under the hero
  (`[data-miles]`); the page ends on its own sign, so the footer's stencil is hidden on the homepage only.
- The old road reel is gone from the homepage (the hero carries the footage); "Read the last ride" and the log stay in
  `#road`. **Oct 28, 2026: `#road` gets a film again** (Robert, sending his drone reel: "This another video that could go
  below the fold"): `film/road-film-3.*` (1440×810, 8 s, silent; `python3 tools/road-film.py --src …`, three of the reel's
  shots, what was left out and why in the tool's header), a 16:9 band between "miles in 2027, all on the bike." and the
  log, edge to edge on phones, with today's player (`smallFilm()` in /home.js: a still on phones until the disc is tapped,
  playing on a wide screen while it's on screen, never under reduced motion, Save-Data or a slow connection; the disc,
  `.today-play.road-play`, always there). The homepage loads `/chrome.css` then `/home.css` (the page in `@layer section`, the frame's homepage states
  unlayered at its foot), so its header, footer and bar are the site's own rules. The stencil's clip (`#lpRow`) lives in
  the header's mark; `home.css` keeps its rect visible while the header is hidden, or every CYCLE FOR on the page vanishes.
- **His sentence is the story's standfirst** (Oct 27, 2026, off the hero): "I'd like to say I ride for everyone else. I ride
  because it changed me." (`.story-say`, `--fs-h3` 800) under "It always says cycling."; on phones head, sentence, portrait,
  lede; from 1024 it sits across from the head on columns 7–12 with the portrait under it (both boxes `display:contents`).
- Pass 37's phone rules below are kept where they still apply (say it once; the first screen's "who" is now his face in the
  film, with his name in the `<title>` and the meta description, not "I'm Robert"); the sign's question now lives in `#sign` at the foot of the page at every width.
- **Cadence's final notes (Oct 27, 2026; `research/design/2026-10-27-cadence-final/`):** the sections run hero · strip ·
  `#why` · `#road` · `#today` · `#orgs` · `#year` · `#ride` · `#find` · `#read` · `#sign` (markup order in build-home.js,
  no CSS `order`: the rooms alternate concrete / tar / concrete / patina / concrete / plaster, and the 988 line comes up
  sooner; `ORGS_S` and `RIDE_S` are two constants so the 2027 rides sit between them). The hero carries the second quiet
  link, Read the last ride (above). How this works is a ledger of three rows (no marks, no numerals). `#today` has **one
  film control**: the disc at the frame's bottom-left (`.today-play`, the site's film control, both glyphs inside it, the
  figure's `data-playing` picks one, the label says what it does next); the Play · 0:03 line under the film is gone; the film is a sibling of the photo (`.today-lead`, `.today-say`,
  `.today-film`, `.today-ph` on one grid, in that DOM order so the disc follows the ask link) with its own place · month
  caption from `today.json`'s `film.where`. On phones the film sits beside his line and the photo runs full bleed under
  both; from 1024 the film shares the line's column and the photo's foot. Save-Data or a slow connection keeps both
  films still until their control asks. The three plates under
  "It always says cycling" are cut (the sign already changes in `#today` and at the foot). The `#ride` facts are chrome's
  `.facts` grid; the find field carries `#mkSearch`. **The Ride with me bar is hidden at ≥900 on the homepage** (the
  header's Ride with me carries it there; phones keep the bar): the one exception to §1's "every page".

### The homepage on a phone (Pass 37, Oct 6, 2026)
Someone Robert trusts found the phone homepage "overwhelming and hard to figure out what it was all about"
(desktop "much better"). The rules that came out of it, all under 760px (tablets and desktop unchanged):
- **The first screen says what before it asks anything:** the sign, then the caption ("10,000 miles. One year. All on the
  bike." since Oct 27, 2026; it said "I'm Robert. In 2027 I ride 10,000 miles, all on the bike." and his line before),
  then the Ride with me tile and the quiet links. His face stays clear above the sign; the scrim is measured up from the foot of the screen.
- **"Who do you cycle for?" lives in `#why` on phones** (`.sign-play`, its own one-line sign), under the
  words that explain the sign. `/home.js` keeps every `[data-sign-plate]` and `[data-sign-input]` in step.
- **How this works is the second screen** (`main` is a flex column on phones; `#how` has `order:-1`). It has
  no links, so the tab order doesn't change. Don't put links in it without moving it in the markup instead.
- **Say it once.** No second bar at the foot (the Ride with me bar is the only one; the old tally `#bar`
  is gone), no ride count under the reel, no second 1,422 or counts table under the search.
- Check 390×844, 375×667, 360×640 and 430×932: everything down to the finder tiles on the first screen.

## 4. Voice, the never-list, health safety

### Voice
Short sentences. Spoken rhythm. Plain. Anti-polish. Honest over impressive, specific over vague.
Write like a person, not a brand. Lived experience is experience, not advice.

Banned words anywhere (copy, meta, alt text, nav, captions): **leverage, synergy, "journey" as a
buzzword, "passionate about", "thrilled to announce", "excited to share".**

Copy style (content review, Oct 6, 2026 — Robert: grammar is "extremely important"): curly quotes
and apostrophes in visible text (the three page generators curl them as they write with
`scripts/curl-quotes.js`, text nodes only; hand pages are written with ’ “ ” directly — never run
either on Robert's journal, it is his raw writing); an en dash for ranges (Apr 23–25, $125–$300);
°F; US spelling; thousands separators (1,422); sentence case for eyebrows, kickers and headings;
day lists as "Tuesdays, Thursdays and Saturdays" / "Second and fourth Saturdays of the month"
(`dayPhrase` in tools/build-rides.js). Research notes never reach a page ("IMPORTANT:", "per the
FAQ", "we confirmed", "would not load for us").

### Never (auto-reject the draft)
- The "$800 / two suitcases" line. Prescott as an origin. "est. 2008". Robert's age (or a number
  that reads as it). Career bragging or résumé language.
- Any continuous-sobriety phrasing ("X years sober", "sober since", anything implying unbroken
  sobriety). Any reference to or hint of a relapse. "In recovery" is fine, lightly.
- Recovery or queer identity framed as a credential or headline.
- The 7,500-mile swim/bike/run or Ironman framing.
- Miles as a fraction or percentage of 10,000; progress bars against 10,000; "if I fall behind".
- "You decide who they're for", pledging, the board, votes, picks, settle-up, kit tiers, perks,
  "pledge a mile". "Pledge" as a verb for visitors.
- "10,000 miles for queer communities" — he rides for himself; the orgs get the rides' money.
- Machine-written ride recaps or Strava numbers turned into prose (§10).

### Health-content safety (queer mental health is YMYL)
- No medical claims you can't source. No diagnosis or treatment advice. Never say cycling treats
  or cures anything. Cite credible sources where a claim needs backing.
- Every mental-health page carries **988 Suicide & Crisis Lifeline** and **the Trevor Project
  1-866-488-7386** (LGBTQ youth).
- Resources pages (apply-chrome.py handles it): crisis line right under the h1, the quiet
  `.fn-why` close instead of the closing block, the phone-only `.help-bar` (tap to call 988) before
  `</main>`. `/resources/` opens on three doors (Right now · For me · For someone I love), **right under the h1, Right
  now first, then the intro** (studio pass 1: that satisfies both rules; Trevor is on the first screen at 375×667 and
  above the 988 bar at 390×844). Crisis info is never behind a tap.
- No mental-health language on town or ride pages; if any gets in, it needs 988 + Trevor.

## 5. Content workflow

Every content page is a self-contained HTML file inside `cfc-site/`, wearing the shared chrome,
linking `/chrome.css` then `/styles.css` (absolute paths), ending on the shared closing block (no
page-specific CTA). `head()` in scripts/chrome.js adds " — Cycle for Change" only when the whole
title still fits 60 characters; generated ride pages drop the suffix. Internal link target: `/` or `/events/2027/riding/`. Point at the org rides (Center Ride Out
first, until it has passed) when the money comes up.

### Field notes (`/field-notes/<slug>/`)
- Templates: **`templates/field-notes/`** (`_template.html`, `_pillar-template.html`), outside the
  published folder (if they're still in `cfc-site/field-notes/`, that move hasn't landed yet).
  Copy to `cfc-site/field-notes/<slug>/index.html`, fill every `{{PLACEHOLDER}}`. Tag is exactly
  "Place + Miles" (`place`) or "Mind + Miles" (`mind`, keeps the crisis-line block).
- Body copy is Robert's. If his words aren't there yet, leave the `.fn-todo` block and open the PR
  as a draft — never write his experiences for him.
- Publishing = three hand edits: the page, one row in `cfc-site/field-notes/index.html` (newest
  first), the URL in `cfc-site/sitemap-pages.xml`. Cross-link 2 related posts in `.fn-related`. Then
  `python3 scripts/apply-chrome.py`.

### Ride write-ups
One page per group ride Robert rides: who he met, what happened, his own video and photos, in
**his own words**. Claude can lay out the page, cut the video, fix a typo — not invent the story,
and not turn Strava data into a recap. People in it are only recognisable with their OK (§10).

### What do you cycle for? (`/cyclefor/`, Oct 12, 2026)
Robert's idea from a ride: every ride he says who he's riding for that day, and he asks everyone else for five
or ten seconds on video. The way in is **their own Instagram** (film it, post it, tag @cycl_eforchange). The page's
form is **the OK** that lets him use their clip in his reels, boosted posts and on the site.
- Hand page (`cfc-site/cyclefor/index.html` + `cyclefor.css` + `cyclefor.js`, on apply-chrome.py's list). The sign's
  blank turns through a few answers and shows theirs after they send. The homepage `#why` links here.
- The Netlify form `cycle-for`: what they cycle for, first name, Instagram, post link, optional clip, optional
  email, three required boxes (18+, they're in it and anyone else said OK, we can use it), `release`, `agreed_at`.
  A clip over 7.5 MB is shrunk in the browser (played once into a recorder at 720p, first 20 s); if that can't
  happen, the page tells them to post it and tag us instead.
- **The release wording is `data/releases/cyclefor-v1.md`. Never edit it.** New wording = `cyclefor-v2.md` + the
  form's `release` value + the page text; the test (`tools/test/cyclefor.test.js`) keeps page and file identical.
- Review: hourly, `tools/cyclefor-pull.js` (in `ride-reviews.yml`) opens one issue per complete OK, labelled
  `release`: name, handle, answer, release version, time, a checklist. No email, no clip link (public repo); the
  record and the clip stay in Netlify → Forms → cycle-for. Robert labels `cleared` to use it; closes to drop it.
  Take-backs come by Instagram DM: within 7 days delete our posts with it, take it off the site, stop any boost.
- Other people's faces in these clips are fine **with a cleared OK** (§10). Under 18: never.

### The Fruit Loop (`/fruitloop/`, Oct 23, 2026)
Robert's own ride: a queer social night ride, **every Friday from Fri, Dec 11, 2026** (Robert, Oct 25: "Every friday is the
ride second friday in december it starts"; it had been first Fridays from Dec 4), meet 5:30 pm, **roll 6:00** (Robert, Oct 23:
"lets meet at 5:30 and roll at 6"; it had been 7:00, then 5:30 for a few minutes), coffee about 7:45, **about 14 flat miles with
one stop** (Robert, Oct 23: "1 stop and then end at a gay coffee shop"; Oct 26: draft 7, "let me see 3" then "add this to all
the material"). **The loop, draft 7 (14.4 mi, 59 ft of gain, not ridden yet):** from the 2018 rainbow crosswalk at Central and
Portland, downtown first (2nd St, Monroe past Heritage Square, Washington west past Old City Hall on the 1981 Pride march route
to 15th Ave, two blocks short of the Capitol), 15th Ave north, Encanto Park and Willo, **3rd Ave north (the Sonoran Bikeway)
to where it ends above Indian School** (Robert, Oct 25: "up 3rd avenue"; the trans flag's corner, 3rd Ave and Indian School),
the alley path to 6th Dr and Glenrosa, **the one stop at the Melrose Curve** (7th Ave and Glenrosa, mile 7.6, about 15
minutes), 7th Ave north through the bend to the Grand Canal, the canal path east past Central and 7th St to 12th St (lit from
7th St east), 12th St south through Coronado to Roosevelt, Roosevelt west, 1st St north past 915, Portland west to the
crosswalk, and **coffee at the end, three blocks south of the start**. Draft 6 (8.2 mi, 3rd Ave up, 3rd St down) was the
short version; draft 5 (15.5 mi) went through Steele park and the Fruit Loop circuit twice. Files: `scratchpad/ride/v4/d7-line.json`,
`loop7.json` (the page's drawing), `files_d7.py` (GPX/FIT), the map page https://claude.ai/artifact/Y89z6wPyzUKEzDoLgDEFg3.
The intended finish is Skoden, inside Central Records, 824 N Central Ave (its co-owner calls it "a queer, Indigenous,
femme-led coffee shop", New Times), but **the page doesn't name it until they've said yes** (Oct 25, 2026: the page went live
first; the finish reads "over coffee, the spot gets named here once it's set"). Ask Central Records and Skoden (Friday hours at
7:45, ages, where 40 bikes go); The Churchill (901 N 1st St) is the backup. Name it in `build-fl7.py`'s place 7, the basics
and the ride record once it's set. Seven places on the drawing (the crosswalk, Old City Hall, the Capitol, the trans flag at
3rd and Indian School, the Curve, the Fruit Loop, coffee), one stop; passed: Heritage Square, CityScape, Encanto and Willo,
the canal, Coronado. No-drop, no sign-up (the page and everything printed leave out free, every Friday and 18 and up, Robert,
Oct 27). Streets and lit paths only: no dead-end detours, no climbs.
- **Its own page, on purpose** (Robert: "special, not like the rest, with a Fruit Loop logo"): `cfc-site/fruitloop/`
  (`index.html`, `fruitloop.css`, `fruitloop.js`; on apply-chrome.py's list with `/styles.css` + its own sheet; body
  `theme-dark fl-page`). A night page: bruise ground, the ride's wordmark, the next-ride date and countdown
  (`fruitloop.js`, every Friday from Dec 11, 2026, 6:00 pm Phoenix), the loop drawn from `loop7.json` with the seven place numbers (HTML buttons
  placed by percent over the SVG, the stop's plate bigger, hairline leaders from the start, the finish and the circuit;
  every story is in the list without the script), one light room for "How it works".
- **The logo (Oct 27, 2026) replaces the lockup below.** Robert's crayon drawing, his pick ("I want this logo. It's
  perfect."): the rainbow-and-trans arrow, THE FRUIT LOOP in black crayon with an O in the trans flag's colors, the six
  rainbow dashes and "A QUEER NIGHT RIDE THROUGH PHOENIX HISTORY." Master: `templates/fruitloop/logo-1.png` (1993 × 789);
  the page serves `cfc-site/fruitloop/logo-1.avif/.webp/.jpg` as the h1 (alt carries the words). Used exactly as given, on
  its own paper (#F5F3EE, sampled from the file) as a plate on the night ground, edge to edge on phones, 1080 wide on
  desktop: never redrawn, recolored, re-lettered or traced. It's the one place the site carries a hand-textured mark
  (the "drawn clean" rule is for everything else). A new version from Robert = `logo-2`. The kit and the stickers
  still carry the lockup until they're redone.
- **The lockup** (Robert's picks, Oct 25, 2026: "12 and 13" from the logo studies, then "Show em that design"): the
  **Progress chevron** (five nested chevrons, the Progress flag's hoist, pointing right) in front of **FRUIT LOOP** in
  pavement lettering — drawn SVG strokes (18, square ends), solid, no stencil bridges — with **the second O of LOOP in
  the trans flag's five bands**, wrapped along the stroke from the top centre. One drawing:
  `scratchpad/logo/lockup.py` (`horizontal()` viewBox `-9 -9 880 208`, `stacked()` without the chevron for narrow
  spots, `swap_board()` for the kit); the page's copy is `logo/lockup-inline.svg` (CSS vars, `currentColor`), read by
  `build-fl15.py`. "The" and the kicker start where the letters do (`padding-left: calc(min(100%,1080px) * .2273)`).
  The stencil still only ever spells CYCLE FOR. **The one place on the site with color outside After Hours** is this
  page: the six bars of the rainbow crosswalk the ride starts on and the Progress flag's five, all muted to sit with
  the palette (`--fl-red` … `--fl-violet`, `--fl-tb --fl-tp --fl-tw --fl-br --fl-bk` in fruitloop.css, scoped to
  `.fl`). On a light ground the trans O gets a bruise halo and the chevron bruise edges. Never cereal imagery: no
  rings, no toucan, the loop is the route.
- Short links in `netlify.toml`: `/fl` (the poster's QR, tagged `utm_source=poster`), `/fruity` (the handout stickers'
  QR, tagged `utm_source=sticker`) and `/fruit-loop`. **Its own address: fruitloopphx.com** (Robert, Oct 23: "its own address") 301s apex and www, every
  path, to `/fruitloop/` with no UTM tags. It needs the domain bought and added as a domain alias on this Netlify site; until
  then the rules sit idle. Its directory row
  is `phoenix-az-cycle-for-change-fruit-loop` (weekly, `first_ride: "2026-12-11"`, so nothing before Dec 11 is ever promised;
  `first_ride` is on `rides-apply.js`'s CHANGEABLE list since Oct 25, a host can move a first date).
- **The history is sourced, never invented, and credited**: most of it is Marshall Shore's work (his LGBTQ+ Tour of DTPHX
  and his Fruit Loop walking tour on Clio); the rest is Visit Phoenix, Cronkite News, Phoenix New Times, 12News, KTAR and the Phoenix Pride
  record. The sources and the date read are in the page's note. A new place needs a source.
- **The drawing is not a map.** No route file on the page until Robert has ridden it (§6 Routes: Robert's own ride file,
  never a route we drew). After his ride, his GPX goes in through `data/ride-routes.json` like any host's.
- **No photo rule in public** (Robert, Oct 27, 2026: "take the photo thing off everything"): no "Photos OK" sticker, no
  "no sticker, no photo", no "we never post who came" on the page, the kit, the record or anything printed. §10 still
  holds for what goes on the site and in our posts: only Robert recognisable, anyone else with their OK.
- **The RSVP** (Oct 30, 2026; Robert: "click this link yes I'm coming. No, I'm not that's it", a "maybe but keep me
  informed on upcoming events", and "I don't wanna try to get their information just the ones that want more
  information"). `cycleforchange.org/rsvp` → `/fruitloop/rsvp/` (noindex, no chrome, one column): the logo, the next
  Friday, "You coming?", three taps. **Yes, I'm coming** and **Can't make it** are counted and land on `/fruitloop/`;
  nothing about the person is sent but a random id the browser keeps, so a second tap changes the answer.
  **Maybe. Keep me posted** opens a form (first name, email or phone, one is enough), then `/fruitloop/`. Works without the
  script (plain posts, 303 to the ride page). `netlify/functions/rsvp.js` + `lib/fruitloop-rsvp.js` store it in Netlify Blobs
  (`fruitloop-rsvp`; deploy previews write to `fruitloop-rsvp-preview`): `r/<friday>/<answer>/<id>` and `c/<id>`. The
  Friday is the page's next ride on the same clock as `fruitloop.js`. Robert's tally is `/fruitloop/tally/#k=<key>`
  (counts for the next Friday, every Friday so far, the keep-posted list with Text / Email / Remove, copy all); the key's
  SHA-256 is in the lib, the key itself only in his link and the project doc "Fruit Loop RSVP" — never in the repo, a
  PR, an issue or a log. Contacts never go to GitHub; they're used only by Robert, by hand, for ride news (`/privacy/#fruit-loop`).
  Tests: `tools/test/fruitloop-rsvp.test.js`. Other questions still come by Instagram DM.
- **The chalk look** (Oct 27, 2026; Robert's "Brand Family Playbook" from ChatGPT: three brands, Cycle for Change the
  platform, the Fruit Loop the gathering, Queers on Bikes the invitation; "Nobody gets dropped" is the promise). **Everything
  Fruit Loop is chalk + photo**: his real photo with only the background darkened through his own cut-out masks (nothing in
  it redrawn, extended or made up), his crayon logo in white chalk on the night ground (`templates/fruitloop/logo-1-night.png`,
  made from his file by `tools/fruitloop-chalk/night.py`: black crayon to chalk white, colors kept, the white bands filled;
  never an AI redraw), lettering in Walter Turncoat (Apache 2.0, `templates/fruitloop/walter-turncoat.woff2`), all caps, a
  little chalk grain, a colored scribble under a line, the colors in `tools/fruitloop-chalk/lib.py` (night #1A181E, chalk
  white, pink, yellow, sky blue, blue, orange, green, purple). The playbook's own model flyer had an AI-re-rendered Robert
  (face redone, legs and shoes invented, the background swapped) and "Hosted by"; that one never goes anywhere. The chalk
  look is the Fruit Loop's only: the rest of the site stays Lane Paint (the playbook says its swatches don't replace the
  site's tokens). Kit and reel overlays: the launch kit canvas (https://claude.ai/artifact/Y1X1aU1asvEPRAf4P5HPRk).
- **The poster** (Oct 27, 2026): `#poster` on the page, after the basics — the words first on a phone, the poster beside them
  on desktop with a hairline edge, "Save the poster" plus the Story size and the 8.5 × 11 print PDF (QR to `/fl`, a third
  of an inch clear of the paper edge). One poster, three sizes and the reel overlays, all from
  `python3 tools/fruitloop-chalk/make.py <N>` (`-6` files now). **What the flyer says is Robert's call** (Oct 27): starts
  Friday, Dec 11; meet 5:30 pm, roll 6:00 pm; the rainbow crosswalk, Central Ave and Portland St; 14 flat miles, 14–16 mph
  pace (Robert, Oct 29: 10–12 was "way slow"); nobody gets dropped; a front and rear light; the link and @cycl_eforchange. **Never on the flyer: "free," "every
  Friday," "18 and up," "hosted by," or "the ride ends by riding it."** The page leaves them out too (Robert, Oct 27: "take
  all three off"); its share card is `og-fruitloop-3.jpg` (`tools/fruitloop-chalk/og.py`). The kicker (inside the logo) is "A queer night ride through Phoenix history"; the
  `<title>`, og/twitter titles and JSON-LD keep "a queer night ride in Phoenix" for search.

### The print and social kit (`tools/cfc-kit/`, Oct 29, 2026)
Robert: "make something like this [the Fruit Loop kit] for Cycle for Change, all our print stuff and social", in the
site's look (his pick over the chalk). `python3 tools/cfc-kit/make.py` writes, into `tools/cfc-kit/.build/out/` (never
committed): **posts** (1080 × 1350) and **Stories** (1080 × 1920, top 200 / bottom 330 px left clear for Instagram's
bars): 10,000 miles · Who do you cycle for? · the ride and who it was for (the homepage's #today: its dated line "The
ride on Monday, October 12.", never "today", its plate and photo; or `--for "…" --date … --photo … --where …`, no photo
unless one is given; a word about the mind puts 988 and Trevor on the piece; the Story also comes blank, to type the
word on the plate) · three stats with their source and catch (`--stat <id>` for any other) · Ride with me
(the next of his 2027 rides) · the 2027 list · Find a group ride · the count; **reel** overlays (each on a flat tar
block, so it reads over footage; see-through outside it) and an end card; **print** as vector PDFs (8.5 × 11 flyer,
11 × 17 poster with the homepage's map, and every stat in the bank as a 5 × 7 card, one PDF, 1/8 in bleed); **stickers**
(CYCLE FOR + a blank plate to write on, 10K on its own, Who do you cycle for? with a QR), PDF with bleed + 300 dpi PNG.
Then `python3 tools/cfc-kit/kitpage.py` builds the "CFC Phone Kit" artifact's files (`.build/kit/`;
https://claude.ai/artifact/Uc4aoGeyh82Q87N2mUZLH1, republish that URL): every piece with
a Save button (the downloads capability); republish that artifact, bump `V` when pictures change.
- **The site's rules, nothing new**: the stencil from chrome.js (only ever CYCLE FOR), the blank as a rose bar or a
  plate in Overpass 900, After Hours, Overpass from `cfc-site/fonts/`, a photo and a solid field one above the other
  (nothing on a photo) with its place · month line under it, photos only from the registry or `#today` (no cars, only
  Robert; his photos cropped to the waist). CYCLE FOR is never followed by a number: 10K stands on its own. Every line is a line the site
  already says or comes from data: the count from `/api/strava` (else `data/tally.json`, with `season.js`'s words),
  the rides from chrome.js `RIDING`, the directory count from `rides/live.json` (as build-home.js counts it).
- **The stat bank** is `data/stats/stat-bank.json`: a copy of Robert's "CFC Stat Bank" artifact (132 stats, each with
  org, report, year, URL, the catch). Fix or add stats in the artifact, then re-copy. The cards print the source, the
  catch and a QR to the report; `mh: true` ones carry 988 and Trevor (the substance-use stats too, since Oct 30). A card
is a column, so a long stat shrinks its line instead of running into the source. All 132 QR codes decode (zxing, 200 dpi).
The brand read: `research/brand/2026-10-29-cfc-kit.md` (its six blocks fixed Oct 30).
- **Short links** for the QR codes (netlify.toml): `/gr` → `/rides/`, `/2027` → `/events/2027/riding/`, `/cf` →
  `/cyclefor/`, tagged `utm_source=cfc-kit`.

### Today I rode for (`#today` on the homepage, Oct 12, 2026)
Every ride Robert says who he rode for that day. `data/today.json` (date, `for` = the plate, `line` = his words,
`photo`, `photo2`, `film`) → `todaySection()` in `scripts/build-home.js` → a light section after the 10,000 (`#road`)
and before the orgs: the sign with the day's word on the plate, his line, a link to `/cyclefor/`, his pictures (§3, the
editorial homepage, has the grid). Phones: words with the film beside them (a still until tapped, `/home.js`), then the
big photo full bleed; `photo2` is not shown. Media in `cfc-site/img/today/` and
`cfc-site/film/today-*` (iPhone HDR tone-mapped to SDR, no audio; bump the number on a recut). His words and his
pictures only; only Robert recognisable. Change the JSON and run `node scripts/build-home.js`.

### Guides (`/guides/`)
Sorted by stage: 01 Pick a ride · 02 Get ready · 03 Raise the money, then "From the road" (field
notes, journal). New guides go in the right stage. The guide "Pledge-per-mile fundraising,
explained" keeps its name: it's about charity rides in general, not this site.
- **The tire-and-wheel guides are linked where their question comes up** (Oct 18, 2026; they had 2–7 inlinks
  each): a ride page's first-time fold gets a "Read" row by discipline (gravel → pressure, tread, tubeless;
  mountain bike → tubeless, flats, wheel sizes; a fast or drop road ride → width, aero, stiffness; `readRow()`,
  `GUIDES` in build-rides.js); an event page gets "Get the bike ready" by its kind (`READY`, `G` in
  build-events.js); a town guide gets one "Get the bike ready" line (`townReady()`, the goathead line in AZ, NM,
  NV, UT), its bike-shops and bring-your-bike pages a line each; the first-ride FAQ on `/rides/about/` has "What
  should I check on the bike first?"; the charity guides' "Keep reading" carries two; `/brief/`'s Carry line links
  the flats guide. Never a boilerplate list on every page.

- **05 Phoenix crews** (Oct 23, 2026): a hub page per crew that runs group rides here, from its own site, Strava
  club and Instagram, with a "not connected, nobody paid" line. First: `/guides/heavy-pedal/` (The Heavy Pedal: its two
  rides, the shop, the events) and `/guides/heavy-pedal/kit/` (lines, prices, fit, policies, from their product pages —
  we haven't worn it, never a review). Both target the brand's searches (`seo/keywords.json`, cluster "Heavy Pedal").
  Their ride pages link back through `data/ride-guides.json`. Never their logo or product photos; prices carry the date.

### Town guides (`/towns/<state>/<town>/`) — `/town`
- `/town <City, ST>`, `/town refresh <id>`, `/town next` (`.claude/commands/town.md`; team in
  `.claude/agents/README.md`). Only `town-editor` writes `data/towns/<id>.json`. Rules:
  `research/towns/SCOUT-RULES.md` (verified = fetched; unknown = null; queer-owned only in the
  business's own words). Shape: `data/SCHEMA.md`, `data/towns/_template.json`.
- Before the build: `node tools/verify-town.js data/towns/<id>.json` (`--all`, `--no-fetch`).
- A guide names a ride by slug (`{ride:<slug>|label}` in text, `ride_slug` on an entry); the build
  fills day/time/link from rides.json and fails on a slug that doesn't exist. Strip lines are
  counted from the data; never claim bike-friendly without a stated policy. Phone numbers are
  `tel:` links.
- `TOWNS.find({city, state, lat, lng})` (name → `covers[]` → nearest `destination` within 25 mi)
  and `TOWNS.strip(t)` are the one lookup — event pages, calendar rows, ride pages and city hubs
  all call it. Never hand-write a town strip.
- The queer lens informs the picks and never headlines a page.
- Guide pages are cards (Pass 35, `placeCard()` in build-events.js): mark, name, one short line (the
  optional `line`, else the note's first sentence), icon chips, icon facts, buttons (call · directions ·
  website · book), the rest of the note under "More". "What do you need?" toggles sit over the cards when
  two or more filters would split the list. No new prose on these pages; long text folds.
- **Bicycle Haüs (Scottsdale) is Robert's home shop** (`home_shop: true`, Phoenix guide only): first in
  the bike shops with the "My home shop" plate and his line. One shop on the whole site; never anywhere
  else (not the hub tile, not other towns, not the strip). Only what their own site says (no repair
  claims until it says so) — with one exception: the **Friday Shop Ride**
  (`scottsdale-az-bicycle-haus-friday-shop-ride`, Fridays 7:00 am, Paradise Valley loop to La Grande Orange) is
  listed on Robert's own word (he rides it every Friday, Oct 8, 2026) and linked from the card (`ride_slug`,
  shown as "The shop ride"). The owner, Kale Keltz, sends changes through "I run this ride" on the ride page.

### 2027 calendar (`/events/2027/`)
- `data/calendar-2027.json` (600+ US rides and races) → `node scripts/build-calendar.js`. Schema in
  `data/SCHEMA.md` ("2027 calendar"). Edit the JSON, run the build, commit both.
- `confirmed` only when the organizer published it; `projected` keeps its `date_note` and says
  "projected (2026 was …)". No invented dates. Robert's own rides are `riding: true`.
- US only, except the rides outside the US Robert is doing (Oct 25, 2026: the Friends for Life Bike Rally, Toronto
  to Montréal, `region: "Canada"`, the one non-US region in `REGIONS`); the `/all/` lede and the method note say so
  from the count. Cycling 4 one·n·ten's projected 2027 edition (artifact id 477) is left out of every pull (§1).
- Research notes never reach a page (the build fails on "web-search budget", "this session",
  "provenance", "artifact", "scheduled task", "unverified").
- Refresh: `node tools/calendar-from-artifact.js <data.json>` pulls the "2027 Ride Directory"
  artifact's data in (slugs kept by id; dropped events retired with a reason); the twice-monthly
  task runs it, rebuilds, opens a PR — never hand-editing `index.html` or the gone `/pledge/`.
- `/all/` is the only calendar page with filters (`calendar.js`, filters in the URL's hash —
  `#type=gravel&far=200`; old `?` links still read); `where.json` sends old `/events/2027/#slug` links to the
  right month page. Oct 18, 2026: `/all/` rows are **light** (`eventHtml(e, { light: true })`: the summary and
  the links); the full panel is fetched from the row's month page the first time it opens (`data-src`, one fetch
  per month). The month pages carry the facts, notes and town strips; `/all/` never duplicates them.

### Trust pages (`/privacy/`, `/methodology/`, `/contact/`, Oct 19, 2026)
Hand pages on apply-chrome.py's list, written from the site's own code and rules, never from memory:
`/privacy/` (GA4 via Netlify, the five Netlify forms and where each entry goes — the review queue is the
public issue list, emails/files/photos never leave Netlify — browser storage, "near me", the outside
services a page talks to, the 7-day take-back), `/methodology/` (the source-plus-date rule, the 90/150
clock, the Monday watcher and re-check, pins and routes, the calendar's confirmed/projected rule, what is
software and what is a person), `/contact/` (Instagram DM; no email — the domain has no MX). The footer's
bottom line links all three (`.foot-trust` in chrome.js). When a form, a pull script, an analytics event
or a policy changes, change the page the same day and bump its "Updated" date. `/about/` waits for
Robert's words (the guides' Person bylines point there once it exists).

### Mile-updates email — retired (Oct 9, 2026)
Robert isn't emailing from the site. The footer signup is gone and `submission-created.js` no longer
sends a welcome. `email/mile-updates.html` stays as a template only. Old `waitlist` submissions are
still in Netlify (Forms) if he ever wants them; don't email them without his say-so.
`cycleforchange.org` has no mail records (no SPF, DKIM, DMARC or MX) — it can't send or receive mail.

## 6. The group-ride directory (`/rides/`) — the rides system

### Data
- `cfc-site/rides/rides.json`, **schema v3** (`data/SCHEMA.md` → "Group rides"; code contract
  `tools/lib/rides-schema.js`): `country`, `region`, `kind` (group-ride · open-streets ·
  critical-mass · training-series), `status`, `name_en`, `language`, `visitor_notes`,
  `distance_km`, `last_seen`, `evidence`, `refresh {method, watch_url, feed_url, notes}`; `state`
  is US-only. rides.json is written by the merge and apply tools, never by hand. Run
  `node tools/derive-ride-fields.js` after any edit.
- **`start_times`**: the host's own table of start-time changes,
  `[{ "from": "2026-10-10", "start_hhmm": "07:00" }]`. `S.startOn(ride, date)` is the one lookup —
  cards, titles, JSON-LD, live.json, one .ics VEVENT per stretch, ride.js, /tonight/ and the
  watcher all use it. Only what the host published.
- derive-ride-fields rules: `season: "year-round"` never gets `season_months`; a weekly ride never
  gets a `monthly_rule`; month words are whole words ("market" isn't March). Irregular rides say
  "Some Mondays", never "Every Monday". Cases in `tools/test/derive-ride-fields.test.js`.
- `tools/lib/ride-facts.js` is the one source of pace and length text (`pc`/`lg`; tests in
  `tools/test/ride-facts.test.js`). A posted average beats a keyword. E-bike facts come only from
  the ride's own text.

### Freshness — `tools/lib/rides-freshness.js` is the one policy
- Every row says "Checked <date>"; every ride page has a checked block (how, evidence, last seen).
- ≤90 days = fresh. 90–150 = listed with "confirm with the host". 150+ = off every list,
  index.json, live.json, the sitemap and "nearby"; its page stays with a banner, `noindex`, no
  Event markup, no .ics.
- A red flag (`data/rides-health.json`) or a rider's gone/changed report shows a warning for 14
  days, then hides the ride until a person re-checks it. Ended rides keep a page for a year. .ics
  files stop at the hide date.
- **`verified_on` is the clock. Never stamp it on a ride nobody checked.**
- Seasonal-break rides must not show a "Next ride" or `EventScheduled`.

### Adding rides
- Scouts follow `research/rides/world/BRIEF.md` (Arizona-style hunting: `research/rides/az/BRIEF-AZ.md`;
  deep sweeps: `research/rides/deep/BRIEF-DEEP.md`, `deep/second-pass/BRIEF-SECOND-PASS.md`) and
  write research JSON. Parallel scouts each get their own scratch folder.
- `node tools/merge-ride-research.js <files>` — gates: high/medium confidence only, evidence under
  12 months, no undated news-only rides, dedupe by city + day + time + host unless the starts
  differ, **3 rides per host** (counting rides already listed), the LGBTQ never-list, geocoding,
  derive. If it says "merged N" with N below "accepted", re-run (Nominatim 429s; the geocoder backs
  off and retries).
- **`NO_LGBTQ_LISTING`**: never list LGBTQ-focused rides in countries that criminalise or ban
  gatherings / "propaganda". The merge refuses them.
- Proof that works: public Strava club event pages (no login), Meetup, RideWithGPS
  (`events.json?organization_id=<id>`, `organizations/<id>-<slug>/calendar.ics`), public Google
  Calendar `.ics` (`calendar.google.com/calendar/ical/<id>/public/basic.ics` — the id is in the
  club page's iframe), WordPress events calendars (POST `/wp-admin/admin-ajax.php` with the page's
  nonce), ClubExpress, NEMBA chapter pages, `criticalmass.in`. Shop pages with no dates are
  `medium` at best. Instagram/Facebook-only leads go in the area report for Robert to confirm.
- The WebSearch cap is shared by every agent in a session; plan scout waves around it.

### Hubs and redirects
- Hub names follow the data. The ten biggest cities keep their hub name against a busy suburb; a
  city with 8+ rides of its own gets its own hub 6+ miles out (`OWN_MIN`, `OWN_GAP`). A hub whose
  rides are a subset of a bigger hub's is dropped.
- **After every merge**, diff `cfc-site/rides/hubs.json` against
  `git show origin/main:cfc-site/rides/hubs.json` and add a 301 in `netlify.toml` for each hub
  that vanished — including its sub-pages (`/rides/tx/frisco/*`). Never leave a redirect pointing
  at a URL that no longer exists.
- World pages: `/rides/<country-slug>/`, world city hubs (2+ rides within 40 km),
  `/rides/united-states/`. US URLs never change. World pages say "local time" and km first.
  Optional `data/rides-countries.json` adds a "Riding in <country>" block.
- Homepage and menu ride counts come from the data (build-home.js, chrome.js) — rebuild, don't
  hand-type them.

- **Hubs are sticky by a mile** (Oct 23, 2026): a hub in the last build's `hubs.json` keeps its page until it sits
  `HUB_HOLD` (1 mi) inside `HUB_GAP`. City centroids move as rides are added; two new Phoenix rides moved Phoenix's
  half a mile and swapped `/rides/az/peoria/` for `/rides/az/goodyear/`. Build from the committed `hubs.json`.
- **Named-ride hubs** (Oct 26, 2026; growth plan Phase 4 "a"): `/rides/critical-mass/` (`criticalMassPage()` in
  build-rides.js) lists every listed `kind: "critical-mass"` ride by country, each row with its next date (`card(r, { next })`,
  worked out at build time from the ride's own rule), the Fridays line from the data, "What Critical Mass is" from two dated
  sources in a fold, and the list paragraph. Every listed Critical Mass ride page links up to it (`guideLine()`); it's in the
  rides sitemap. Bike Party and open streets come next, the same way.
- **Biweekly rides with a posted date** run on that date's weeks (`dates` on a `biweekly` ride; `data/SCHEMA.md`), so
  "Next ride" lands on the right Saturday instead of the next one.

### Upkeep (plain-words version: `tools/RIDES-UPKEEP.md`)
- Mondays, Phoenix time: 2 am `rides-watch.yml` (`tools/rides-reports.js` pulls the ride-report
  form, `tools/rides-watch.js` reads every ride's pages and feeds → `data/rides-health.json`,
  `data/rides-queue.json/.md`, the "Rides to re-check" issue); 3 am `rides-reverify.yml` runs
  `/rides refresh 80` (`.claude/commands/rides.md`, `@ride-verifier`) through
  `tools/rides-apply.js` — the only way a re-check reaches rides.json — and opens a PR labelled
  `rides-upkeep`; 4 am `rides-weekly-rebuild.yml` forces a deploy. `node tools/validate-rides.js`
  gates every change (`rides-check.yml`). Tests: `node --test tools/test/*.test.js`.
- Every ride was checked Sept 15–Oct 4, 2026, so they all age out together (most hide by mid-March
  2027). The re-check has to actually run each week, at ~110 rides a week, or the directory empties. Until Oct 21,
  2026 it never did: the verifiers ran in the background and died with the Action. They run in the foreground now, and
  a run that pushes no branch fails red ("Did it ship?").
- Organizer flow: "I run this ride" with an email is a host update — no public warning, no hide
  clock, top of the queue for a person to confirm by reply. The form never stamps `verified_on`.
  A link ending in `#fix` (the host emails, Oct 24, 2026) opens the form with "Something changed" and "I run
  this ride" already picked (`cfc-site/events/report.js`); nothing on the site links to `#fix`, so riders never
  arrive with it ticked. Keep it that way.
- Commands: `/rides status`, `/rides check <slug>`, `/rides refresh [N]`, `/rides discover <area>`,
  `/rides add <name or URL>`.

### Film and rider reviews on ride pages (Oct 8, 2026)
- **Film:** `data/ride-films.json` → `{ slug: [{ src, poster, width, height, seconds, caption, alt, added }] }`;
  the first shows at the top of the page: beside the name, facts and buttons on desktop, edge to edge under the name on phones (`.ride--film`, `.gr-top`; a VideoObject in the LD). 4:5, H.264, no
  audio, `+faststart`, files in `cfc-site/film/` (bump the number on a recut). Plays like the homepage reel.
  Now: `shop-ride-7.mp4` (7 s, 864×1080, silent): Robert's own CapCut cut of the Oct 9, 2026 shop ride ("Weekend / Loading" title baked in), his call over the Claude cut — the CapCut watermark band cropped off, 9:16 cropped to 4:5, metadata stripped. The people in it are Robert's call (he made and chose it, Oct 9). The earlier cuts (`shop-ride-5` Sept 25, `shop-ride-6` Oct 9) and the TikTok clip (Central Ave, not this ride) are gone. Raw clips and social cuts live outside the repo.
  TSR (`scottsdale-az-scottsdale-cycling-saturday-ride`): `tsr-1.mp4` (11 s, 864×1080, silent), Robert's own clip of his first TSR, Oct 10, 2026 — iPhone HDR (HLG) tone-mapped to SDR, 4:5, metadata stripped. Poster `tsr-1b.jpg/.webp/.avif` (studio pass 1): the sharp frame at 4.2 s, cut at x ≥ 200 so a car on the far road stays out (the poster is a still, so the no-cars rule holds). Its caption keeps its place: "From the ride, Scottsdale · Oct 2026". His own review of that ride is the first in `data/ride-reviews.json` (his words, sent in chat, Oct 10).
- **Builds from the shop** (Oct 9, 2026): `data/ride-walls.json` → a photo collage edge to edge across the top of
  a ride page (`tiles[]`: src, size, name, one line, alt), credit line under it. The Friday Shop Ride's: six of
  Bicycle Haüs's own build photos from their Instagram in `cfc-site/img/haus/` — **used with the shop's OK**
  (Robert, Oct 9). Robert's Crux 5 LTD first. Photos only — no captions, no credit line, no words baked into a photo (Robert, Oct 9: the labels were cheesy; the Crux's Instagram text was painted out → `crux-ltd-2.jpg`). Laid out as the shop floor: every bike on one hairline, tops stepping up and down, the Crux tallest; phones get the same skyline as a swipe strip. The line-art
  version is saved, not shown: `rides/art/haus-wall-1.svg` (`python3 tools/draw-haus-wall.py`, `saved_drawing`).
- **"I rode it"** (Oct 13, 2026): Robert's own write-up of a ride he rode, on that ride's page, under the route and
  above the reviews. Studio pass 1: the newest one is one tap from the homepage ("Read the last ride", and the log row
  from that day, both from `data/ride-notes.json` in build-home.js), and the ride page's tag row carries an "I rode it"
  chip to `#robert`. `data/ride-notes.json` → `{ slug: [{ id, date, line, paras[] }] }` (`data/SCHEMA.md`), newest
  first; four paragraphs show, the rest under "The rest of it" (both crawled). **His words only** — never written,
  tidied or recapped from Strava (§4, §10); people he names are his call. Now: TSR, Sat, Oct 10, 2026, his first one.
  A review (`data/ride-reviews.json`) is the short form, capped at 600 characters; a write-up is the long one.
- **Reviews:** "Rider reviews" sits beside the film (or alone): counts, "would ride it again", the pace
  most riders named, the newest three, the rest folded, and "Review this ride" (the Netlify form
  `ride-review` — again yes/no, pace, words 20–600, first name, from, optional email). `#review` opens the
  form; the tag at the top of the page links `#reviews` once there's one. `/shopride` → the shop ride's reviews.
- **Nothing shows until Robert has read it.** Every hour `ride-reviews.yml` turns new reviews into GitHub
  issues (label `post` publishes, close drops) — the path that always works. If Resend is set up in Netlify,
  each review is also emailed to him (`netlify/functions/submission-created.js`, to `REVIEWS_EMAIL`, from
  Resend's shared sender `onboarding@resend.dev` unless `REVIEWS_FROM` is set) with **Post it / Drop it**
  buttons. They open `netlify/functions/review.js`: a confirm page (a GET never changes anything, since mail
  apps pre-open links), then Post writes the review into `data/ride-reviews.json` on main through the GitHub
  API → the deploy's rides build shows it. Links are signed (`REVIEWS_SECRET`, `lib/review-link.js`) and
  carry the review, so nothing is stored in between; they last 60 days. Netlify env needed: `RESEND_API_KEY`,
  `REVIEWS_EMAIL`, `REVIEWS_SECRET`, `GITHUB_TOKEN` (fine-grained, Contents read/write, this repo only).
  Rules in `tools/lib/reviews.js` (tests: `tools/test/reviews.test.js`). Never edit a rider's words beyond
  that, never write a review, never post one he hasn't approved. Emails stay in Netlify and his inbox.
- The committed ride pages can lag `data/ride-reviews.json` until the next local rebuild; the deploy is
  what counts (Netlify runs `tools/build-rides.js` on every deploy).

### Routes on ride pages (Oct 9, 2026)
A rider asked TSR on Instagram for "an actual route" because the written directions didn't work on a map, then
for the pace. Every ride page now answers that, or says where the answer lives.
- **With a route:** "This week's route" / "The route" right under the buttons: distance · climbing · pace on the
  flats (mph) · if you come off; the map (OSM tiles, tinted quiet, the line in rose); a climb chart you drag along
  (or arrow keys) that moves a dot on the map; the host's turns (tap one → the map zooms there); "Download the GPX";
  "Directions to the start" (the route's own first point). `/rides/route.js` loads only on those pages.
- **Without one (every ride today):** a short "The route" block: where the host posts routes (Ride with GPS,
  Komoot, the Strava club — `RT.whereRoutesLive`) or "Nobody has sent us this ride's route yet", and the form.
- **Where routes come from:** only the people who run the ride, or Robert's own ride file with their OK. Never
  Strava's API (§8, §10), never a route we drew. "Send us the route" (Netlify form `ride-route`, a file upload,
  on every listed ride page) → `tools/routes-pull.js` (hourly, in `ride-reviews.yml`) → an issue labelled `route`
  (no email, no file link; the file stays in Netlify → Forms → ride-route).
- **Putting one up:** save the file as `data/routes/<slug>/<posted>.gpx`; add the entry to `data/ride-routes.json`
  (`gpx, posted, from, by, for_date, pace_mph, drop, regroup, cues, note` — rules in `tools/lib/routes.js`);
  `python3 tools/route-build.py <slug>` (Pillow + network: OSM tiles one ride at a time, opentopodata heights when
  the GPX has none) writes `cfc-site/rides/routes/<slug>/` (route JSON, map JPG, the GPX); then
  `node tools/build-rides.js`. The deploy only reads what's committed. `routes/` survives the rides build's wipe.
- Weekly routes (TSR): `for_date` = the ride's date. After it passes the page says "The route from Sat, Oct 10.
  Routes change every week; this week's isn't in yet." Turns (`cues`) only in the host's words, with miles.
- Pins: 485 of 1,423 rides have only a city-level pin (`geo_precision: "city"`). Route pages use the route's
  first point for directions. Oct 9 fixed the three Gainey Village rides (pin was 0.6 mi south, by Hash Kitchen)
  and Yuma's Foothills ride, through `rides-apply.js` with `checked_on` = their old `verified_on` (a pin fix
  isn't a re-check). Batch: `research/rides/upkeep/2026-10-09-start-pins.json`. Oct 19 (Tier A batch 1, #190):
  24 more pins, 940 → 964; the part reports list what a person could check by hand. Learned: a `changed` entry flips a
  `seasonal-break` / `paused` ride back to `active` (rides-apply.js), so a pin on a ride that's off for the season waits
  for its spring re-check or a pin-only path in the tool; a start that moves every week or month stays at the city pin;
  Google Calendar embeds need the decoded `c_…@group.calendar.google.com` id for the public .ics (the base64 `src` 404s);
  parallel verifiers each need their own scratch subfolder.

### UI rules that still hold
- **Step down, don't scroll.** Every page asks one question with a few big picks: `/find-a-ride/`
  asks what kind; `/rides/` asks where (the tap-a-state map, Every state, Outside the US, six
  cities); a state → cities, who's riding, other towns; a city → two picks, then doors, then
  "All N rides, with filters" (`/<place>/all/`, the only page with the full filter panel).
- `LIST_MAX = 12` rows on a place page before a pick (tested). A door with one ride goes straight to
  it; a door with none is quiet.
- Explaining text goes under a fold (`fold()` → `<details class="gr-fold">`), crawled but one tap
  away. `/rides/about/` is the explaining page; `/rides/add/` is the form.
- **The list-page paragraph** (Oct 26, 2026; growth plan Phase 4 "b"): every hub, facet, day, state, country, "all"
  and other-towns page carries "About these N rides" — one fold, one paragraph written from that page's rides by
  `tools/lib/list-lede.js` (`aboutList()` in build-rides.js): the days and the big one, the earliest and latest start,
  weekday evenings, no-drop and beginners, who else they're made for, the bikes, how often, the checked window. A
  sentence only when the rides back it; numerals, never a sentence that opens on one; no clock, so the same rides write
  the same words. `focus` keeps a page from repeating itself (a Saturday page doesn't say Saturday). 907 pages.
  Tests: `tools/test/list-lede.test.js`.
- The row (`card()` in build-rides.js and `hub.js`, kept in step): mark · name · when · town · one
  line (wait · pace · length · checked). Distance from a point only relative to the reader
  ("3 mi away"), never on static pages.
- Search (`CFCFind` in `rides.js`): every word must match; zero results never dead-end. Filter
  tiles show live counts; a tile that would leave nothing is `aria-disabled`.
- Maps: `data/geo/outlines.json` (`tools/geo-outlines.js`) + `data/geo/detail.json`
  (`tools/geo-detail.js`; `npm i --no-save pngjs`, `NODE_USE_ENV_PROXY=1` behind a proxy); phones
  zoom by region (`mapZoom()`, `/rides/map.js`). Route art: `node tools/contour-art.js` on the Mac.
  Some map colors are still the old palette — fix toward After Hours when touched.
- Ride page: When / Starts at / Pace above the buttons; the first-time fold opens on beginner and
  no-drop rides; "First group ride? Start here" links `/rides/about/#first-ride`.
- `/tonight/` reads `live.json`. One Netlify form for every directory: `ride-report` (markup in
  `scripts/blocks.js`, submit script `/events/report.js`).

## 7. Search and the Search Lab

- One target query per page: in the `<title>`, the `<h1>` and an `<h2>`. Titles fit 60
  characters (`head()` drops the brand suffix when it won't fit).
- Event markup only for a date still ahead, and never for a red-flagged, hidden or one-source ride. An
  amber flag (the host's page wording moved, a time went missing) keeps the "confirm with the host" nudge on
  the page and keeps the Event: the markup says what the page says (Oct 18, 2026, Robert's OK — 174 pages,
  Critical Mass London among them, had a date on the page and no Event while their amber flags waited for
  a re-check). The rides rebuild runs daily (`rides-weekly-rebuild.yml`) so next-ride dates stay current.
- Real `<meta name="description">`, `<link rel="canonical">`, clean heading order, descriptive
  `alt` on every image.
- **Ride pages answer first** (Oct 25, 2026, the 500K plan): the description leads with when, from where and cost
  (`answerDescription()` in build-rides.js) — a ride on a monthly rule with its next date ("Next ride Fri, Oct 30, 7:30 pm
  GMT from South Bank…"), a weekly ride with its day and time, which never go stale in a snippet; then the kind of ride,
  distance and pace, and the checked date. Monthly-rule rides put "next <Mon D>" in the `<title>` when it fits; a name
  that already says the city doesn't repeat it. Only what the page says.
- A short quotable answer near the top (`.fn-lede` / `.lede`) so assistants can cite it.
- JSON-LD matches the page (field notes: `BlogPosting`, author Robert Castan, publisher Cycle for
  Change). Nothing in the LD that isn't on the page.
- New URLs go in the right sitemap (`sitemap-pages.xml`, `sitemap-events.xml`, `sitemap-calendar.xml`,
  `rides/sitemap.xml`). A redirected URL never sits in a sitemap. `/sitemap.xml` is the index, written from its
  children by `scripts/sitemap-index.js` (each child's lastmod = the newest inside it; every generator runs it at
  the end, Oct 25, 2026). Never hand-edit it.
- Prefer fewer, fuller pages over more, thinner ones. Single-ride pages earn most of the clicks;
  thin city and filter pages earn almost none.
- **AI search is welcome** (Oct 18, 2026): `robots.txt` names the AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot,
  PerplexityBot, Google-Extended, Applebot-Extended…) with an explicit Allow — the competitors block them, and the
  directory is meant to be the cited answer. `/llms.txt` and `/feed.xml` come from `scripts/build-signals.js`; every
  page's `<head>` links the feed. A free ride's Event carries an `Offer` at 0 (`offersLd()` in build-rides.js); the
  hubs (`/towns/`, `/field-notes/`, `/tonight/`) carry CollectionPage / WebPage markup. `/tonight/` gets a crawlable
  "Evening rides, by city and day" block (the directory's six cities, rides from 5 pm) written by build-rides.js between
  the `evenings` markers in `cfc-site/tonight/index.html`.
- **IndexNow** (Oct 21, 2026): after every production deploy, `netlify/functions/deploy-succeeded.js` reads the live
  sitemaps and sends Bing (and the other IndexNow engines) the URLs whose lastmod is in the last two days, plus `/`,
  `/rides/`, `/events/2027/` and `/tonight/`. Bing feeds ChatGPT search and Copilot. The key is public by design:
  `cfc-site/02fdf11f9a0f2fd20baefc2d59a0addc.txt` — never delete or rename it. Rules in `netlify/functions/lib/indexnow.js`;
  by hand: `NODE_USE_ENV_PROXY=1 node tools/indexnow.js --dry-run` (or `--all`, `--since <date>`). Only our own sitemap
  URLs are ever sent. Google doesn't read IndexNow; it reads the sitemaps. Tests: `tools/test/indexnow.test.js`.
- **Search Lab** (`seo/README.md`, `seo/crawl.mjs`, `seo/keywords.json`): every PR that changes
  public pages gets one line in its description —
  `Search Lab: <what should move> · <which measure> · read <date>` (2 weeks out for indexing, 4
  for rankings). The Monday run reads these.

### Analytics
- Google Analytics 4, property "Cycle for Change", measurement ID `G-DWNR81WXS3`. The tag is added by
  **Netlify snippet injection** (Site settings → Build & deploy → Post processing), not by the repo —
  don't add a second copy. Search Console: the `https://cycleforchange.org/` URL-prefix property.
- Key events, sent from `/chrome.js` and `/home.js` via `cfcTrack()` only when `gtag` exists:
  `sign_up` (retired with the signup, Oct 9, 2026), `org_ride_click` (a tap to RunSignup / one·n·ten / the Center /
  SFAF), `ride_host_click` (a tap out to a group ride's host), `finder_click` (a homepage finder
  tile: `group_rides` or `events`), `ride_bar_click` (a tap on the Ride with me bar). No personal data in any event.

## 8. Rider pages — CONCEPT ONLY, do not build (Oct 4, 2026)

Robert's idea: riders post a ride (ride file, photos, a clip, a few words) in two minutes, it lands
on a rider profile, bots stay out, Google trusts it. **Nothing is built and nothing ships until he
says so** — this note is here so rides/towns work doesn't contradict the plan.
- Plan: "CFC Ride Profiles — Concept" (https://claude.ai/code/artifact/bae9be7e-9c4e-4ffc-967b-a68da75a93f6);
  mockup: https://claude.ai/artifact/16m6iotqqBvnNqUMHvkGZP
- Pages would live under `/riders/<handle>/` and `/riders/<handle>/<date>-<slug>/`. `/rides/` stays
  the group-ride finder. Sign-up open to anyone 18+. Other riders' miles show only on their own
  profile; the 10K stays Robert's.
- When built: **no Strava API data on any public page or through any AI step** (Strava API Policy
  §2.3, §5.3, §6.2) — Garmin Connect Activity API (credited) or a dropped .fit/.gpx; Strava is a
  plain link out. Ride pages noindex until the rider is Verified/Known and the page has their own
  words or photos; rider links `rel="ugc"`; rider text never machine-written. Privacy by default:
  first/last half mile cut, home zones, date only, location stripped from media, Garmin rides
  arrive as private drafts.
- Open: apply to the Garmin Connect Developer Program under Cycle for Change LLC when he's ready.
  Moving the live counter to Garmin settles §2.3 for it too.

## 9. Kit

The kit is reopened. It follows Lane Paint (After Hours palette, Overpass, the stencil family).
**10K is the wearable mark**; "10000" never goes on kit. Old lock specs (Creosote colors, Outfit,
volt whip, "YOU DECIDE" hem line) are retired. Packs and working files live in `kit-handoff/`
(local); treat anything there that predates Oct 5, 2026 as the previous state.

## 10. Photos, video, Strava

- **No cars** in photos — no car, truck or van in any photo, not even parked far away. **Video from a ride
  is the exception** (Robert, Oct 8, 2026: "cars are ok in some video"): a parked or passing car in the
  background of ride footage is fine. The homepage hero and the homepage reel stay car-free.
- **Only Robert is recognisable.** Riders from behind or far off are fine; oncoming faces get
  cropped. Other people need their OK — for clips people send about what they cycle for, that's a cleared
  `/cyclefor/` OK (§5).
- Captions say where the picture was really taken (place · month).
- The homepage hero (Pass 32) is Robert on the canal path, **clear, crisp, ungraded**:
  `img/sign-print-4.jpg` (1200×1600) and `-4-phone.jpg` (960×1280). Phones: the photo fills the
  first screen (`object-position:62% 0`), the sign sits over its lower half under a scrim sized to
  the picture. A full-resolution export would sharpen desktop at 2x — ask Robert when convenient.
  `tools/sr.py` (upscaling) needs opencv-contrib, which the sandbox lacks.
- Inner-page photos: originals in `cfc-site/photos/<key>.jpg`, **served ungraded** (studio pass 1, Oct 21, 2026: the
  Pass 6 high-key grade lifted the blacks and pulled skin toward bone; the hero has been "clear, crisp, ungraded" since
  Oct 5) as `cfc-site/img/ph/<key>-2.jpg` + `.avif` + `.webp`, registered in `scripts/photos.js`. To bring the grade back
  it's one setting (`CLEAN` in `tools/grade.py`). Never the first thing on a phone on a rides hub.
- **Off the site until Robert says** (studio pass 1): `crew` (the sunset stop: a second rider's face, no OK on record)
  and `people` (the finish line: a second man's face and a crowd) — riders-camelback runs in their place;
  `south-mountain` whole (a rider's face, front on, maybe not him) — `south-mountain-view` runs; `pv-camelback-road` (a
  pale shape behind a wall that may be a parked car) — Scottsdale's hub shows camelback-sunrise. The old card files
  (`card-pv`, `card-south`, `card-journal` — a parked car) are replaced by registry crops.
- **AVIF beside every JPG** (Oct 18, 2026, the audit's speed pass): `tools/grade.py` writes a `.avif` (quality 52,
  about 45% of the bytes at the same look) next to each graded JPG, and `figure()` serves it first in a `<picture>`
  with the JPG as the fallback. The homepage's hero, the reel's poster and the `#today` pictures have `.avif` and
  `.webp` siblings (Pillow, q52 / q78; `<picture>` sources and `imagesrcset` preloads in build-home.js; video posters
  use the WebP). A new picture gets its siblings the same way, same file number.
- **The stockpile** is on Robert's Mac, not in the repo: `~/Pictures/CFC Stockpile/` (photos in
  seven folders, clips, `index.html` to browse, `manifest.csv` with each file's Photos ID).
  `07-group-rides` has other people in it — ask before using any of it.
- **Bump the image number when a picture changes** — phones and Safari cache hard.
- Films: `/film/road-film-2.mp4` (the reel, 12 s; phones wait for a tap). Oct 6, 2026: the four
  clips with cars in them were cut and the poster is the drone frame (`road-film-2.jpg`). On the
  homepage it's a crisp 4:5 picture with a round plaster play button on the poster and a
  play/pause line under it (Robert: the feathered version "looks unfinished"). `home-film.mp4` is unused. Recut with `ffmpeg` (CRF ~30,
  `+faststart`, no audio). Social video cuts never go in git.
  Oct 26, 2026 (the editorial homepage): the homepage's film is the hero; the reel player is off the homepage. Oct 27:
  `hero-phone-8` / `hero-wide-9`, cut by `tools/hero-film.py` from two of the clean clips Robert sent (his rail-yard
  selfie-mount ride, `1789929494081.mov`, one continuous take; and three moving shots of his "CFC Reel Hit v3": the
  red-rock road with his shadow 8.24–9.86 s, the tunnel 6.32–7.17 s, the palms 9.94–11.26 s — wide 9 keeps only the
  palms' last half second, 10.74–11.24 s, the wheel on the road, and takes the road from a static lower region of the
  frame, rows 580–1493). Out of that reel: the
  black-kit ride at the camera (parked cars on the left), the bike lane (a white shape past the far kerb), the overlook
  (a smoke plume, a baked vignette), the tunnel's first 0.7 s (a red post behind his helmet), the far side of the street in the palms shot (a dark shape in an
  arched opening the brand gate couldn't clear, 10.07–10.67 s: the palms are cropped below it and are off the phone film)
  and the stills (other people).
  His first batch (Oct 27) had captions burned in or was photo slideshows; none of it is used. The clips stay out of git.
  Every frame of every shot used was looked at for vehicles. The v1–v8 hero was cut from road-film-2: **road-film-2 itself is not car-free**: the brand gate found a car at the far end of its
  road shot (8.25–9.55 s) and a parked vehicle in its sun shot (11.05–11.6 s), and couldn't clear a shape under the river
  shot (4.15–5.45 s); none of the three is in the hero. Recut it before it goes on any page again. His three-band reel
  (the handoff's test footage) stays out: a parked truck at the overlook, traffic in its last second, glitch frames, and
  512 px slivers too small for either frame; the tan-jersey peace sign is left out too (it reads as shirtless at a glance
  on a phone; Robert's call to bring it back).
- **Strava:** the tally and the ride log on the site may read Strava. Nothing else: **no Strava API
  data through any AI step or onto public pages beyond the tally / ride log.** Ride write-ups are
  Robert's own words, never machine-written recaps of Strava data. Bots and agents don't call
  `strava-week`.

## 11. Automation in this repo

- `.github/workflows/cfc-loop.yml` — the content loop (manual run only until the December
  relaunch). Drafts one field note on the no-pledge model; Robert's voice pass decides.
- `.github/workflows/cfc-ride-recap.yml` — **disabled** (Oct 6, 2026): it sent Strava data through
  Claude onto a public page. Ride write-ups are Robert's.
- `rides-watch.yml`, `rides-reverify.yml`, `rides-weekly-rebuild.yml`, `rides-check.yml` — §6.
- Agents in `.claude/agents/` (see its README); commands `/rides`, `/town` in `.claude/commands/`.
- Content loops never touch `scripts/build-home.js`, `cfc-site/index.html`, `cfc-site/home.js` or
  `netlify/functions/`.

## 12. The briefing engine and the trust desk (Oct 17, 2026)

Robert's direction from the "most useful cycling websites" reel (RideBriefing, Bike Insights):
**every ride page tells you what you're riding into, every fact says who checked it and when, and
nobody needs an account.** The plan (page system, team, funnel, build order):
https://claude.ai/artifact/QKG9zHH8dYZtjnFcYgLpCv (republish that URL to update).

### `/brief/` — the ride briefing
- `scripts/build-brief.js` → `cfc-site/brief/index.html`. The engine is `cfc-site/brief/engine.js`
  (pure functions, tested in `tools/test/brief-engine.test.js`); the page is `brief.js` + `brief.css`.
  Bump `V` in the build script when any of the three changes, then rebuild.
- Drop a ride file → distance, climbing, high point, loop; the climb chart coloured by grade (patina → powder
  rose → smeared rose → rose ink → asphalt, never green-to-red); climbs by a stated rule (3% over 200 m,
  100 ft of gain, Strava's length × grade categories); times at a flat speed (slower up, faster down,
  an estimate); **weather at up to eight points at the hour you reach them** (Open-Meteo hourly, °F,
  wind as head / cross / tail against the route's heading, sunrise); Wear and Carry from the house
  table (`wear()`); bottles from `water()` with the desert heat lines; a share link that carries the
  route (a polyline in the hash, so it works for anyone); the GPX back out.
- **Free, no account, nothing stored.** The file never leaves the browser. The only requests are to
  Open-Meteo (heights when the file has none; the forecast) and carry sample coordinates. No cookies,
  no storage, no form. The page says exactly this under "How it's worked out" and in the verification
  line; keep both true.
- **Files** (Oct 18, 2026): GPX, TCX, and **FIT** straight off a Garmin, Wahoo or Hammerhead (`parseFIT()`: record
  messages only, developer fields skipped, no CRC check), and Garmin Connect's "Export original" zip as it comes
  (`unzipFirst()`, DecompressionStream in the browser, zlib in node). `parseAny(file)` is the one door the page uses.
  A recorded file gives the start clock and the moving speed, so there is nothing to type. Strava and Garmin stay
  export-and-drop on purpose: no API, no sign-in, nothing stored (§8, §10). The Garmin Connect Developer Program
  (pushed rides) is the only "connect" path the rules allow, and only for Robert's own rides, when he applies.
- Heights: the file's, or Open-Meteo's 90 m model when the file has none; never a route we drew,
  never Strava's API (§10). A sample ride (`cfc-site/brief/sample.gpx`) is Robert's own file or
  nothing. Now: his Oct 13, 2026 Garmin ride ("Central Phoenix, a Tuesday", exported from Garmin Connect in his
  browser), the first and last mile cut so his street isn't on the site, every third point kept (330 KB).
- Words inside a stretched SVG are banned (they squash): the chart's axis, the climb numbers and the
  map's marks are HTML positioned by percent (`drawProfile()`, `drawMap()` are the pattern).
- **The route card** (Oct 18, 2026; Robert's reference: Eat Sleep Cycle Nice's "route of the month" post):
  `cfc-site/brief/card.js` draws the route as one line with its points named — start and finish, each
  climb's top with its height and mile, the host's regroup and stops — labels on square plates with
  hairline leaders, placed clear of the line and of each other, never in the title block. One `layout()`,
  two painters: `svg()` for pages, `paint()` onto a canvas. It is "The route" on `/brief/` and the
  **poster** there (1080 × 1350 PNG, title, date, `cycleforchange.org/brief`; optionally over the rider's
  own photo with a flat asphalt band under the words, no wash, no grain). It is also the drawn route on
  **every ride page that has a route** (`routeCard()` in build-rides.js, above the street map), with a
  **"Brief this ride"** button: `/brief/` opened on the host's GPX at the ride's next start and the host's
  pace, nothing to type. Overpass, sentence case, "Climb 1 · 2,355 ft · mile 8.5"; never a mono-caps label.
- **Compare** (the Bike Insights idea): drop a second GPX on `/brief/` and both climb charts sit on one
  distance-and-height scale (patina and powder rose), a seven-row table, and the difference in sentences
  from `compare()` in the engine (same within 5%; "hillier" is ft per mile; "steepest" is the steepest
  tenth of a mile; times at one flat speed). The share link carries both rides (`b` in the hash).
- Not yet in the engine: surface and road mix (the `surface-analyst` desk does it offline for site
  routes), refill points (the `water-heat` desk, per route), hazards. The page doesn't pretend.

### The desks
Nineteen specialist agents in `.claude/agents/`, cut by what can be wrong, not by page: Route
(route-analyst, climb-specialist, surface-analyst, pace-timing), Conditions (weather-on-the-road,
water-heat, wear-carry, hazards), Local (ride-verifier, ride-scout, the town scouts, checkin-steward),
Money and orgs (orgs-giving, events-analyst), Story (story-editor, brand-ambassador, graphics-maps),
Trust (editor, consent-legal, search-answers, access-speed, analytics-growth). The roster, who writes
what, and the freshness table the Editor holds every page to are in `.claude/agents/README.md`.
`/brief <ride-slug>` runs the desks on a listed ride's route (`.claude/commands/brief.md`).

The one rule: **a fact is a source plus a date, or it isn't on the page.** Every public page ends on
a verification line (what was checked, by which desk, from which source, on which date). The Editor
would rather leave a field blank than guess; so would you.

### The page system (to build, in this order; each step ships something a rider can use)
1. `/brief/` (done). 2. Group-ride pages get the engine: the route card and "Brief this ride" are on every
ride page with a route (done, Oct 18); this week's weather inline on the page is still to come.
3. Climb pages (`/climbs/<id>/`); compare is done on `/brief/`. 4. Org pages (`/for/<org>/`, 990-sourced, the money sentence) and the 2027 event pages
briefed day by day. 5. Phoenix town page with the climate window and the one-morning ride, then
Tucson. 6. `/10000/` and the ride log, live by January 1. Each page type has one reader, one shape,
two exits; the shapes are on the plan canvas.

## Changelog (one line per pass; details in git history and the claude.ai project docs)

- 2026-09-18 — Coming-soon gate lifted; field notes, guides, resources, journal served.
- 2026-09-27 — Homepage redesign live; every inner page on the shared chrome (Passes 2–4: homepage, directories, story pages).
- 2026-09-29 — Pass 5 "the in-between" (UX research); Pass 6 brighten + the graphic system, the mark family.
- 2026-09-30 — Passes 7–12: photos dissolve into the page, posters, route art, marks everywhere, calendar + resources marks.
- 2026-09-30 — Rides go worldwide (schema v3, freshness policy, upkeep workflows); town guides; Arizona sweep, `start_times`.
- 2026-10-01 — Pass 13 honest live line; Pass 14 filter tiles; Pass 15 step down, don't scroll; the deep sweep (1,275 rides).
- 2026-10-02 — Passes 16–21: drawn maps, phone map zoom, terrain/water/roads, calendar step-down, find-a-ride by kind, folds; second pass (1,407 rides); Search Lab started.
- 2026-10-03 — Pass 22 ten-rider critique fixes; Pass 23 single-photo hero.
- 2026-10-04 — Pass 24 films + the stockpile; Pass 25 Robert's photos on ~40 pages; no-cars rule; rider pages concept.
- 2026-10-05 — Pass 26 Lane Paint + no pledge (`/pledge/` → home); 26b self-hosted Overpass, closing blocks refreshed.
- 2026-10-05 — Passes 27–29: lane-paint homepage, screenprint (later dropped), type retyped (no tracked caps; buttons keep caps).
- 2026-10-05 — Pass 30 clean paint, first screen on phones; Pass 31 org/step marks drawn clean; Pass 32 clear ungraded hero photo.
- 2026-10-06 — Instruction files rewritten to the no-pledge model; ride-recap bot disabled; mile-updates email rebuilt.
- 2026-10-06 — Pass 34: the first screen gets two finder tiles (Group rides, Events) with their own marks; the reel is a crisp 4:5 picture with a real play button, recut to 12 s without the car clips.
- 2026-10-06 — Pass 35: town guide pages as cards with icons, chips, real buttons and folds; "What do you need?" filters; nine new marks (call, clock, box, key, gear, fit, build, watch, effort); coffee's mark is the cup; Bicycle Haüs first in Phoenix as Robert's home shop.
- 2026-10-06 — Pass 36: Ride with me goes to the next ride (one·n·ten, Nov 7): a tile on the homepage's first screen and a bar at the foot of every page as you scroll.
- 2026-10-06 — Pass 37: the homepage on a phone, said plainly — who and what on the first screen, How this works second, the sign's question moved to It always says cycling, one bar at the foot instead of two, repeats cut (12% shorter). Desktop and tablets pixel-identical.
- 2026-10-08 — `/nov7/`: the shareable page for Cycling 4 one·n·ten with its own share card (`tools/og.py`); every Ride with me points there until Nov 7.
- 2026-10-08 — Friday Shop Ride (Bicycle Haüs) listed and linked from the home-shop card; ride pages get "From the ride" (film) and "Rider reviews" (form, moderated through issues + the `post` label); cars OK in ride video.
- 2026-10-08 — `/nov7/`: the 26 s ride-with-friends film under the first screen; on desktop the hero is the riding wall (three panels of group-ride footage) with a light wash under the words.
- 2026-10-09 — No site email: the footer signup becomes "Mile updates" → Instagram, the welcome email is gone, reviews come in as hourly GitHub issues (email optional via Resend's shared sender); the "10000" numeral comes off the closing block.
- 2026-10-09 — Routes on ride pages: map, climb chart, turns, GPX and pace from the people who run the ride (`data/ride-routes.json` → `tools/route-build.py`); "Send us the route" on every ride page → `route` issues; Gainey Village and Yuma pins fixed; the blank Strava button under "Where to find them" fixed (hub link styles were leaking).
- 2026-10-12 — `/cyclefor/`: "What do you cycle for?" Five seconds on video, post it and tag @cycl_eforchange, give us the OK (Netlify form `cycle-for`, release `data/releases/cyclefor-v1.md`, in-browser clip shrink, hourly `release` issues to review); the homepage question links to it.
- 2026-10-12 — Homepage `#today`: "Today I rode for mental clarity" — the sign with the day's word, his line, the route-on-gravel photo, the LOVE-wall bike and a 3 s loop of him at the wall (`data/today.json`).
- 2026-10-13 — "I rode it" on ride pages: Robert's own long write-up of a ride, in his words (`data/ride-notes.json`), first one TSR, Oct 10.
- 2026-10-15 — Cycling 4 one·n·ten (Nov 7) is canceled: off NEXT_RIDES, the homepage org card and `#ride` (now Center Ride Out), the riding page and the Phoenix town page; `/nov7/` says so.
- 2026-10-15 — Everything for that ride comes off the site (homepage, riding page, Phoenix guide, the 2027 calendar, films, share card); `/nov7/` is a short noindex "canceled" page for the links already on social.
- 2026-10-16 — `/nov7/` says nothing about the ride: "Ride with me in Phoenix" (his rides, the friends film cut to 15 s, what's next); the ride is off the retired list too.
- 2026-10-16 — `/nov7/` is a landing page: the sign and four big buttons on the first screen (group ride, 2027 rides, blog, Instagram), the friends film below.
- 2026-10-16 — Two Valley women's rides (Femmes Friday, Women's BOS, PhxWmn); Phoenix guide routes 8 → 12 (Tempe Town Lake loop, Brown's Ranch, Bartlett Dam Rd, Seven Springs, the guide's first gravel); a top-10 city inside the radius now always names the metro hub (two Scottsdale rides had renamed `/rides/az/phoenix/`). Tempe has 3 provable rides, short of a hub (`research/rides/az/az-tempe-mesa-2026-10-16.md`).
- 2026-10-17 — `/brief/`, the ride briefing (drop a GPX: climbs, weather where you'll be when you get there, wear, water, back by; free, no account, nothing stored); the briefing team and the trust desk (19 agents, the freshness table, the verification line); `/brief` command; the plan canvas.
- 2026-10-18 — Phase 2 of the growth plan: /brief/ linked, Tempe → Phoenix, noindex on rides.json and /photos/, the re-check's output shown; an amber flag no longer strips a ride page's Event markup (red flags and one-source rides still do).
- 2026-10-18 — `/brief/`: the plan folds to one line (start time and speed read from a recorded ride); compare (two rides on one chart, the difference in sentences); the route card (the route drawn with its climbs named) as the map, as a 1080×1350 poster, and on every ride page that has a route, with "Brief this ride" (the briefing at the ride's next start, nothing to type).
- 2026-10-18 — `/brief/` reads FIT (off the unit) and TCX, and Garmin Connect's zipped export, through one door (`parseAny`); the start time and speed come off the file.
- 2026-10-18 — The tire-and-wheel guides get their inlinks (growth audit): a "Read" row on 285 gravel, mountain-bike and fast-road ride pages, "Get the bike ready" on the 12 event pages and 16 town guides, a line on the shop and bring-your-bike pages, a first-ride FAQ entry, two per charity guide, the brief's Carry line — every one of the ten guides now has 22–220 inlinks, each where its question comes up.
- 2026-10-18 — Homepage numbers and speed (growth audit): the tally baked from `/api/strava` on every deploy (`scripts/tally.js`; the HTML said 3,573 to crawlers while people saw 3,848) and `/home.js` paints the page's own copy, not one of its own; "The ride on Monday, October 12" instead of "Today's ride"; AVIF/WebP for the hero, the reel poster, the `#today` pictures and every registry photo (mobile Lighthouse 72 → 88 locally, LCP 5.0 → 3.9 s, 959 → 596 KiB); the dead grain filter dropped from the hero.
- 2026-10-18 — `/events/2027/all/` goes light (growth audit): 1.4 MB and 30,000 DOM nodes → 0.77 MB and 12,000; rows carry the summary and links, the full panel arrives from the month page on open; the filters moved from `?query` to `#hash`, so the fifty crawlable copies of the page are gone.
- 2026-10-18 — The crawl signals (growth audit, apply-now list): `/llms.txt` and `/feed.xml` (`scripts/build-signals.js`, run by the rides build), the AI crawlers named in robots.txt, `/strava-setup` 301, the footer's Journal link to `/journal/`, an Offer on free rides' Event markup, CollectionPage on the hubs, and a crawlable evening-rides block on `/tonight/`; the `.ics` files out of the index (#183).
- 2026-10-19 — Trust pages: `/privacy/`, `/methodology/`, `/contact/` (week 1 of the content plan), linked from every footer and from `/rides/about/`; a Trust section in llms.txt.
- 2026-10-21 — The Wrenches, studio pass 1: photos clean-edged and ungraded (`-2` files, AVIF/WebP), rule-breaking photos swapped for ones that pass; one ending (bruise closing field, drained-pool footer), Guides in the header, the tally line a link; Ride with me opens Tour de Palm Springs' row (Robert: his next ride) on the riding page, links first; his write-up one tap from the homepage; `/rides/` cities in the hero; event pages name, date, sign-up first; `/resources/` opens on its doors; cascade layers and one `CSS_V` on every stylesheet.
- 2026-10-19 — Rides re-check, Tier A batch 1: the 63 best-earning pages pinned to a city and the 31 amber flags re-checked at their sources; 24 start pins, 5 confirmed, 35 changed, 2 seasonal breaks, 6 unconfirmed; Critical Mass London confirmed and pinned.
- 2026-10-21 — IndexNow (the 500K plan, AI-search desk): every production deploy tells Bing which pages changed (`deploy-succeeded`), the key file at the root, `tools/indexnow.js` for a full send.
- 2026-10-21 — The Monday re-check actually re-checks: verifiers in the foreground, background tasks off for the step, a red run when nothing ships, 110 rides a week.
- 2026-10-21 — Event pages and the 2027 calendar rebuild on every deploy, after the rides (a passed event date no longer keeps its Event markup until someone rebuilds by hand).
- 2026-10-23 — The Fruit Loop: `/fruitloop/` (Robert's queer First Friday night ride from Dec 4, 2026), its directory row tagged LGBTQ+, `/fl` and `/fruit-loop`; `first_ride` in the rides schema so a ride that hasn't started never promises a date before its first (build-rides, live.json, /tonight/, the validator). Same day: its own night page and wordmark, then the route cleaned up for a social ride (about 21 flat miles, the canal path, `/fruity` for the handout stickers), then one stop and coffee at the end (about 15 flat miles, the Curve, coffee three blocks south) and a 6:00 roll-out; `duration_min` counts the minutes after the hours ("2 hours 45 minutes" = 165; 11 rides corrected).
- 2026-10-23 — The Heavy Pedal: Heavy Saturday (Arcadia) and Heavy Thursday (Sunnyslope) listed; `/guides/heavy-pedal/` and `/kit/` as the first "Phoenix crews" hub on the brand's searches; biweekly rides take a posted week; hubs hold by a mile.
- 2026-10-24 — Stable form ids on ride pages (`rv-*`, `rt-*`, no build-order counter): a rebuild of the same data now changes 0 files (was ~1,400), so re-check PRs show only what changed.
- 2026-10-24 — `#fix` opens the report form for hosts ("I run this ride" ticked) for the info-ask emails; the report form's field ids hang off its element id, not a build-order counter.
- 2026-10-25 — The Fruit Loop is weekly: every Friday from Dec 11, 2026 (page, countdown, record, `.ics` weekly rule, kit, stickers, plan); the finish stays "over coffee" on the page until the shop says yes; the page goes live (#201 merged) so the posts and stickers have somewhere to point.
- 2026-10-25 — The Fruit Loop lockup: the Progress chevron and the trans O (Robert's picks) on `/fruitloop/` and across the kit; `CSS_V` 48.
- 2026-10-26 — The Fruit Loop is draft 7, about 14 miles (downtown, up 3rd Ave, the canal to 12th St, down through Coronado): the page's drawing and places, the record, the kit, the stickers, the plan.
- 2026-10-25 — Answer-first ride pages: descriptions lead with when, where and cost (1,293 pages); monthly-rule rides carry their next date in the title (Critical Mass, bike parties); city names stop repeating; doubled periods in ledes gone.
- 2026-10-25 — The sitemap index is written from its children (`scripts/sitemap-index.js`, run by every generator): each child's lastmod is the newest date inside it, not the Oct 6 it said for three weeks.
- 2026-10-25 — The 2027 rides on the homepage (`#year`): all 13 Robert is doing, date order, from the calendar; the Oct 21 artifact refresh pulled in (640 events, 11 dates moved to confirmed, the Friends for Life Bike Rally and the Jonathan Pon Memorial Ride added; the Nov 7 ride's 2027 projection left out); `NEXT_RIDES` reads the same list, confirmed dates only; `CSS_V` 49.
- 2026-10-25 — The year at a glance on `/events/2027/riding/` (`yearPoster()` in build-calendar.js, `.cal-year` in calendar.css): the night poster from the "The 2027 calendar" canvas (https://claude.ai/artifact/QmWdhNccLAoKJNEAaYms5S — Robert: "the first one") above the rows: twelve month grids on bruise, every day he rides a powder-rose square, projected dates outlined, each ride a link that opens its row; `CSS_V` 50. The canvas's lime poster stays a canvas thing.
- 2026-10-26 — The list-page paragraph: "About these N rides" on all 907 hub, facet, day, state and all pages, written from each page's own rides (days, first and last start, after-work rides, no-drop, beginners, who they're for, bikes, how often, the checked window), folded under the picks.
- 2026-10-26 — `/rides/critical-mass/`: every Critical Mass we list (36 in 35 cities, 7 countries) by country with its next date, a sourced "What Critical Mass is", linked from all 36 ride pages; `/find-a-ride/`'s Ride with me tile no longer says "six".
- 2026-10-26 — The editorial homepage (Robert and Cadence's approved direction, §3; staged as a PR, not live until Robert approves): his film full screen (one frame on phones, two panels on wide screens, from road-film-2's four clean shots, every frame checked by `tools/hero-contrast.py`), the numbers under lane-paint dashes, the story with his photographs, 10,000 and the last rides, the 2027 rides on a map with date blocks, the orgs on patina, the sign at the foot; `/chrome.css` now loads on the homepage too; `CSS_V` 53. Eight rounds with the Wrenches (the critic's last cold read 40 vs 37 for live, photography held by the footage), the brand gate (passes), the access desk (its five fixes in) and the usability lab (task 4, the latest write-up, slower by the one-button hero: Robert's call); the art director's rulings in `research/design/2026-10-26-editorial-home/sign-off.md`. Fact desk (research/events/2026-10-26-homepage-facts.md): Seattle to Portland is 206 miles, one or two days; The Mid South shows Mar 11 until the organizer posts its last day; SFAF's "No one turned away for cost" is cut (their site doesn't say it).
- 2026-10-27 — The staged homepage's hero recut from the clean clips Robert sent ("the video needs to be changed"): `hero-phone-8` / `hero-wide-8` — his rail-yard take (one continuous shot: the whole phone film, and the tall panel on wide screens), and the red-rock road, the tunnel and the palms (cropped low) from his Reel Hit v3 in the wide panel; the brand gate's three blocks fixed (an uncleared shape across the street cropped out, a judder from joins off the frame grid, two of him at once); `tools/hero-contrast.py` passes at nine sizes; the critic's blind reads 22 vs 18 for v8 on the first cut, 23 vs 19 on the fixed one (photography level, no line down); still staged, not live.
- 2026-10-27 — Cadence's final notes on the staged homepage (`research/design/2026-10-27-cadence-final/`): Read the last ride on the first screen (the hero's second quiet link); the sections reordered so the rooms alternate (why · road · today · orgs · year · ride · find · read · sign) and the 988 line comes up sooner; `#today` on one grid with one film control (the disc) and a place · month caption on the film; the three plates under "It always says cycling" cut; the `#ride` facts on chrome's `.facts`, the find field with its mark, the rides count in `#road` as a numeral over its label; the Ride with me bar hidden at ≥900 on the homepage; the wide hero film recut as `hero-wide-9` (88 frames: the road from a static lower region, the tunnel, half a second of the wheel on the road with a strip of grass verge at the top left; the phone film stays 8); `CSS_V` 55; still staged, not live.
- 2026-10-27 — The homepage hero says one thing (Robert and Cadence): "10,000 miles. One year. All on the bike." under the stencil; the two paragraphs come off and his sentence becomes the story's standfirst (across from the head on wide screens); `hero-contrast.py` reads the caption; `CSS_V` 56; staged first.
- 2026-10-27 — The Fruit Loop poster: Robert's ChatGPT flyer through the brand review panel, rebuilt from the page's own lockup and type (`tools/fruitloop-poster.py`: feed, Story, 8.5 × 11 PDF with the `/fl` QR), on `/fruitloop/#poster`; the page kicker is now "A queer night ride through Phoenix history".
- 2026-10-27 — The Fruit Loop logo is Robert's crayon drawing (his pick): the page's h1 on its own paper plate, the poster's top band and the share card (`og-fruitloop-2.jpg`); his original photo in the poster (`-4` files; no "hosted by", no "ends by riding it").
- 2026-10-27 — The Fruit Loop goes chalk (Robert's brand playbook): the flyer rebuilt on his real photo, his logo in white chalk from his own file, Walter Turncoat lettering (`tools/fruitloop-chalk/`, `-5` files on `/fruitloop/#poster`); no free, every Friday, 18 and up or hosted by on the flyer; reel overlays and the chalk kit on the launch kit canvas.
- 2026-10-27 — The Fruit Loop page drops every Friday, free and 18 and up (Robert); the chalk share card `og-fruitloop-3.jpg`.
- 2026-10-27 — Ride with me points at the Fruit Loop until Dec 11 (Robert: a button on the homepage's first screen): the homepage tile, the header button, the menu, the closing block and the bar on every page; `CSS_V` 57 for the Fruit Loop sheet.
- 2026-10-27 — The Fruit Loop's photo rule comes off everything (Robert): the page's How it works and its "why" line, the directory record's visitor notes, place card 6, the how-it-works slide, the Photos OK sticker.
- 2026-10-28 — `#road` gets a film again: Robert's drone reel cut to 8 s, silent, 16:9 (`tools/road-film.py`, `road-film-3`: the drone over him on the desert road, the lookout, the mountain road; the sunset bike, the canal path, the bridge and the side-on shot left out), under the 10,000 with today's player (`smallFilm()`); `CSS_V` 58.
- 2026-10-28 — The count is bike miles only (runs and swims were being added in) and restarts by itself at midnight on Jan 1, 2027 in Phoenix (`tools/lib/season.js`, both wordings on every page, `tools/test/strava-count.test.js`); the `/tonight/` Flyer redrawn in Overpass and After Hours without the never-list line it carried; `CSS_V` 59. (Made Oct 26 as #211, rebuilt on top of the road film.)
- 2026-10-29 — The Fruit Loop's pace is about 14 to 16 mph (Robert: 10 to 12 was "way slow"): the poster in all three sizes (`-6`), the page's basics and How it works, the directory record (host update), the how-it-works slide, the 11 × 17 poster and reel sticker 4. The Story survey's "how fast" choices are left as asked.
- 2026-10-29 — The print and social kit (`tools/cfc-kit/`, Robert: "something like this for cyc for all our prints stuff and social"): posts, Stories, reel overlays, the flyer, the 11 × 17 poster, all 132 stats as 5 × 7 cards and three stickers, in the site's look, from the site's data; the stat bank copied to `data/stats/`; short links `/gr`, `/2027`, `/cf`; the "CFC Phone Kit" artifact to save them from.
- 2026-10-30 — Give to my Center Ride Out (Robert: the Instagram bio lands on the homepage): his fundraiser page
  (give.lalgbtcenter.org/fundraiser/7694885) as the hero's third quiet link, `#ride`'s primary, the Center's give link in
  `#orgs` and the first button in the riding page's Center Ride Out row; "Sign up with the Center" stays as a link.
- 2026-10-30 — The Fruit Loop RSVP (Robert): `/rsvp` → yes, can't make it, or keep me posted; yes and no are counts and go
  to `/fruitloop/`, maybe leaves a name and an email or phone; Robert's private tally at `/fruitloop/tally/`; `/privacy/` says what's kept.
