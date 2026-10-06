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
  - Cycling 4 one·n·ten — Nov 7, 2026 (RunSignup)
  - Center Ride Out — April 2027, LA → Ojai and back (not LA to San Diego)
  - Cycle to Zero — May 2027
- **The big thing:** group rides everywhere. Robert shows up, rides, and writes up each ride (who
  he met, what happened) with his own video. Alongside that, the worldwide group-ride directory
  (`/rides/`), where every ride says when it was last checked.
- **The number:** miles since June 1, 2026. One number, everywhere, never a percentage, never shown
  against 10,000. The count restarts January 1, 2027.
- **Everything funnels to the site and the mile-updates list** (the footer signup, Netlify form
  `waitlist`). Instagram is **@cycl_eforchange** (not @cycle_forchange).
- Primary internal link target: the homepage `/` or `/events/2027/riding/` ("Ride with me").
  Never `/pledge/`, never `/#board`.

## 2. How the site is built

### Stack
- Static HTML/CSS/JS. No framework, no markdown rendering. Netlify **publishes `cfc-site/`**, not
  the repo root (`netlify.toml` → `publish = "cfc-site"`). Anything outside `cfc-site/` is not
  served. The repo-root `index.html`, `guides/`, `logo.css` and the `cfc-mark-*` / `cfc-roundel-*`
  SVGs are an old unpublished tree; don't build there.
- Netlify build command: `npm install && node tools/build-rides.js`. If the rides build fails, the
  deploy fails and the previous deploy stays live.
- Functions in `netlify/functions/`: `strava` (behind `/api/strava`, the tally), `strava-webhook`,
  `strava-connect`, `strava-week`, `mileage`, `instagram`, `submission-created`. The retired
  `votes` / `pledges` functions and the `/api/votes` redirect are being removed — don't call them,
  don't revive them, and never renew a Netlify token for them.

### Generators — edit the source, run the script, commit both
| Script | Writes |
|---|---|
| `node scripts/build-home.js` | `cfc-site/index.html` (the homepage). Never hand-edit index.html. |
| `node tools/build-rides.js` | everything under `cfc-site/rides/` and `cfc-site/find-a-ride/` (pages, `index.json`, `live.json`, `hubs.json`, `.ics`, maps, sitemap) |
| `node scripts/build-events.js` | `cfc-site/events/<slug>/`, `/events/`, `/towns/…`, `sitemap-events.xml` |
| `node scripts/build-calendar.js` | `cfc-site/events/2027/` (home, months, categories, `riding/`, `all/`, `where.json`), `sitemap-calendar.xml` |
| `scripts/chrome.js` | the shared `<head>`, header + phone menu, tally line, closing block (`CHROME.pledge()` — old name, no-pledge copy), footer with the mile-updates signup. Required by every generator. |
| `python3 scripts/apply-chrome.py` | puts chrome.js onto the hand-written pages (guides, field notes, resources, journal, tonight, 404) and refreshes their closing block (`section.pledge`, `.fn-why` on resources) |
| `scripts/photos.js` + `node scripts/apply-photos.js` | the photo registry (src, size, alt, place · month caption, crop, `figure(key, {cls, line, caption})`); apply-photos rewrites the figures baked into hand pages |
| `python3 tools/grade.py --all --only <key>` | grades `cfc-site/photos/<key>.jpg` into `cfc-site/img/ph/` (portraits 1440 tall, landscapes 1600 wide, q76). `--only` keeps live photos from re-encoding. |
| `python3 tools/print.py` | the Pass 27 screenprint. Not used on the hero since Pass 32; kept for reference. |
| `scripts/towns.js`, `scripts/blocks.js` | the one town lookup + strip; the shared ride-report form and how-it's-built tiles |

After a change to `scripts/chrome.js`, regenerate everything that wears it, the same day, in this
order (events and calendar read rides' `live.json`): `node scripts/build-home.js && node
tools/build-rides.js && node scripts/build-events.js && node scripts/build-calendar.js && python3
scripts/apply-chrome.py`. Never hand-edit one page's chrome.

### Committed vs built on deploy
- Committed: source, data and every generator's output (homepage, events, towns, calendar, and the
  rides pages as of your commit). Netlify reruns `tools/build-rides.js` on every deploy, so ride
  pages, "next ride" dates and freshness hiding are computed at deploy time; a weekly workflow
  forces a deploy. Commit the rides rebuild with a data change so the diff can be reviewed.

### Styles and behaviour
- Inner pages load `/chrome.css` (tokens, type, buttons, nav, closing block, footer, `.ph`
  figure), then their section sheet (`styles.css` with its `.fn-*`/`.res-*`/`.jr-*` classes,
  `events.css`, `calendar.css`, `rides.css`, `tonight.css`). The homepage loads `/home.css` +
  `/home.js`. Share image: `/og-cfc.png`.
- `/chrome.js` paints the tally into `[data-cur]` from `/api/strava`; a failed feed leaves "—",
  never 0.

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
#A9BDB8 (`--dust-deep` #6F8683 for hairlines that must be seen) · `--creosote` smeared rose #A84C58,
the accent · `--creosote-ink` #8F3E4A, small rose text on light (4.5:1) · `--creosote-lift` and
`--volt` powder rose #D9B1AA, rose on dark · `--mute` gunmetal #4A4E55 · `--pool` drained pool
#2C4F55 (footer) · `--asphalt` bruise #1C1A22 · `--tar` #141218.

Rose means the blank and wet paint. Buttons and links are plaster/ink, not rose. Small rose text
uses `--creosote-ink`. "Creosote", "volt" and "bone" are only token names now — never colors,
never words in copy or briefs.

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
  `#mkRide`, `#mkWrite`, `#mkOrgs`).
- Graphics are **drawn clean — never painted, worn or grained.** The only wear on the site is the
  big desktop hero stencil (`#lpWorn`). `#lpWornSoft` / `#lpRoller` are a small hand edge only (no
  holes, no streaks); on phones the stencil is clean (`.sign-mark [filter]{filter:none}`).
- Square corners, hairlines, no shadows, no pills, no gradient washes or grain over photos. Photo
  edges dissolve into the page (`mask-image`, the `.ph` figure) — no hard seams, no chrome boxed on
  a picture.

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
  `</main>`. `/resources/` opens on three doors (Right now · For me · For someone I love). Crisis
  info is never behind a tap.
- No mental-health language on town or ride pages; if any gets in, it needs 988 + Trevor.

## 5. Content workflow

Every content page is a self-contained HTML file inside `cfc-site/`, wearing the shared chrome,
linking `/chrome.css` then `/styles.css` (absolute paths), ending on the shared closing block (no
page-specific CTA). `head()` in scripts/chrome.js adds " — Cycle for Change" only when the whole
title still fits 60 characters; generated ride pages drop the suffix. Internal link target: `/` or `/events/2027/riding/`. Point at the org rides (Nov 7 first,
until it has passed) when the money comes up.

### Field notes (`/field-notes/<slug>/`)
- Templates: **`templates/field-notes/`** (`_template.html`, `_pillar-template.html`), outside the
  published folder (if they're still in `cfc-site/field-notes/`, that move hasn't landed yet).
  Copy to `cfc-site/field-notes/<slug>/index.html`, fill every `{{PLACEHOLDER}}`. Tag is exactly
  "Place + Miles" (`place`) or "Mind + Miles" (`mind`, keeps the crisis-line block).
- Body copy is Robert's. If his words aren't there yet, leave the `.fn-todo` block and open the PR
  as a draft — never write his experiences for him.
- Publishing = three hand edits: the page, one row in `cfc-site/field-notes/index.html` (newest
  first), the URL in `cfc-site/sitemap.xml`. Cross-link 2 related posts in `.fn-related`. Then
  `python3 scripts/apply-chrome.py`.

### Ride write-ups
One page per group ride Robert rides: who he met, what happened, his own video and photos, in
**his own words**. Claude can lay out the page, cut the video, fix a typo — not invent the story,
and not turn Strava data into a recap. People in it are only recognisable with their OK (§10).

### Guides (`/guides/`)
Sorted by stage: 01 Pick a ride · 02 Get ready · 03 Raise the money, then "From the road" (field
notes, journal). New guides go in the right stage. The guide "Pledge-per-mile fundraising,
explained" keeps its name: it's about charity rides in general, not this site.

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

### 2027 calendar (`/events/2027/`)
- `data/calendar-2027.json` (600+ US rides and races) → `node scripts/build-calendar.js`. Schema in
  `data/SCHEMA.md` ("2027 calendar"). Edit the JSON, run the build, commit both.
- `confirmed` only when the organizer published it; `projected` keeps its `date_note` and says
  "projected (2026 was …)". No invented dates. Robert's own rides are `riding: true`.
- Research notes never reach a page (the build fails on "web-search budget", "this session",
  "provenance", "artifact", "scheduled task", "unverified").
- Refresh: `node tools/calendar-from-artifact.js <data.json>` pulls the "2027 Ride Directory"
  artifact's data in (slugs kept by id; dropped events retired with a reason); the twice-monthly
  task runs it, rebuilds, opens a PR — never hand-editing `index.html` or the gone `/pledge/`.
- `/all/` is the only calendar page with filters (`calendar.js`, filters in the URL); `where.json`
  sends old `/events/2027/#slug` links to the right month page.

### Mile-updates email
`email/mile-updates.html` — table-based, inline styles, After Hours, placeholders listed at the
top. The signup is the Netlify `waitlist` form; no list tool or welcome email is wired yet — export
the form as CSV until Robert picks one.

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

### Upkeep (plain-words version: `tools/RIDES-UPKEEP.md`)
- Mondays, Phoenix time: 2 am `rides-watch.yml` (`tools/rides-reports.js` pulls the ride-report
  form, `tools/rides-watch.js` reads every ride's pages and feeds → `data/rides-health.json`,
  `data/rides-queue.json/.md`, the "Rides to re-check" issue); 3 am `rides-reverify.yml` runs
  `/rides refresh 40` (`.claude/commands/rides.md`, `@ride-verifier`) through
  `tools/rides-apply.js` — the only way a re-check reaches rides.json — and opens a PR labelled
  `rides-upkeep`; 4 am `rides-weekly-rebuild.yml` forces a deploy. `node tools/validate-rides.js`
  gates every change (`rides-check.yml`). Tests: `node --test tools/test/*.test.js`.
- Every ride was checked Sept 15–Oct 4, 2026, so they all age out together (most hide by mid-March
  2027). The re-check has to actually run each week, at ~80 rides a week, or the directory empties.
- Organizer flow: "I run this ride" with an email is a host update — no public warning, no hide
  clock, top of the queue for a person to confirm by reply. The form never stamps `verified_on`.
- Commands: `/rides status`, `/rides check <slug>`, `/rides refresh [N]`, `/rides discover <area>`,
  `/rides add <name or URL>`.

### UI rules that still hold
- **Step down, don't scroll.** Every page asks one question with a few big picks: `/find-a-ride/`
  asks what kind; `/rides/` asks where (the tap-a-state map, Every state, Outside the US, six
  cities); a state → cities, who's riding, other towns; a city → two picks, then doors, then
  "All N rides, with filters" (`/<place>/all/`, the only page with the full filter panel).
- `LIST_MAX = 12` rows on a place page before a pick (tested). A door with one ride goes straight to
  it; a door with none is quiet.
- Explaining text goes under a fold (`fold()` → `<details class="gr-fold">`), crawled but one tap
  away. `/rides/about/` is the explaining page; `/rides/add/` is the form.
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
- Event markup only for a date still ahead, and never for a flagged or one-source ride. The rides
  rebuild runs daily (`rides-weekly-rebuild.yml`) so next-ride dates stay current.
- Real `<meta name="description">`, `<link rel="canonical">`, clean heading order, descriptive
  `alt` on every image.
- A short quotable answer near the top (`.fn-lede` / `.lede`) so assistants can cite it.
- JSON-LD matches the page (field notes: `BlogPosting`, author Robert Castan, publisher Cycle for
  Change). Nothing in the LD that isn't on the page.
- New URLs go in the right sitemap (`sitemap.xml`, `sitemap-pages.xml`, `sitemap-events.xml`,
  `sitemap-calendar.xml`, `rides/sitemap.xml`). A redirected URL never sits in a sitemap.
- Prefer fewer, fuller pages over more, thinner ones. Single-ride pages earn most of the clicks;
  thin city and filter pages earn almost none.
- **Search Lab** (`seo/README.md`, `seo/crawl.mjs`, `seo/keywords.json`): every PR that changes
  public pages gets one line in its description —
  `Search Lab: <what should move> · <which measure> · read <date>` (2 weeks out for indexing, 4
  for rankings). The Monday run reads these.

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

- **No cars** — no car, truck or van in any photo or video frame, not even parked far away.
- **Only Robert is recognisable.** Riders from behind or far off are fine; oncoming faces get
  cropped. Other people need their OK.
- Captions say where the picture was really taken (place · month).
- The homepage hero (Pass 32) is Robert on the canal path, **clear, crisp, ungraded**:
  `img/sign-print-4.jpg` (1200×1600) and `-4-phone.jpg` (960×1280). Phones: the photo fills the
  first screen (`object-position:62% 0`), the sign sits over its lower half under a scrim sized to
  the picture. A full-resolution export would sharpen desktop at 2x — ask Robert when convenient.
  `tools/sr.py` (upscaling) needs opencv-contrib, which the sandbox lacks.
- Inner-page photos: originals in `cfc-site/photos/<key>.jpg`, graded copies in `cfc-site/img/ph/`,
  registered in `scripts/photos.js`. Never the first thing on a phone on a rides hub.
- **The stockpile** is on Robert's Mac, not in the repo: `~/Pictures/CFC Stockpile/` (photos in
  seven folders, clips, `index.html` to browse, `manifest.csv` with each file's Photos ID).
  `07-group-rides` has other people in it — ask before using any of it.
- **Bump the image number when a picture changes** — phones and Safari cache hard.
- Films: `/film/road-film.mp4` (the reel; phones wait for a tap) — its poster frame has a vehicle
  far down the road and needs a new one. `home-film.mp4` is unused. Recut with `ffmpeg` (CRF ~30,
  `+faststart`, no audio). Social video cuts never go in git.
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
