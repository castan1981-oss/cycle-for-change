# Cycle for Change — project context for automated content

> **HOMEPAGE: the redesign is live since 2026-09-27; Pass 6 (Sept 29) brightened it.**
> `cfc-site/index.html` + `cfc-site/home.css` + `cfc-site/home.js` + `cfc-site/img/` (the
> house-graded photos; the hero is a still, the film is gone). The Sept 18 coming-soon-based homepage and its files
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
- Next to build: the weekly watcher (`tools/rides-watch.js` → `data/rides-health.json`: dead pages,
  changed schedules, feed proof of life), rider-report intake from Netlify Forms, and the weekly
  re-check PR (a Claude Code action working the queue). The policy and the pages already read them.

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
- One page, generated: `node scripts/build-calendar.js` reads
  `data/calendar-2027.json` (600+ organized US rides and races for 2027) and
  writes `cfc-site/events/2027/index.html` + the JSON feed + `sitemap-calendar.xml`.
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
