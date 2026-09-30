# Events directory — data and build

`/events/` and `/towns/` on cycleforchange.org are generated from the JSON in
this folder by `scripts/build-events.js`. No framework, no build service:
you run the script, it writes plain HTML into `cfc-site/`, you commit the
output. Netlify serves the files.

```bash
node scripts/build-events.js
```

## Adding an event

1. Add `data/towns/<town-id>.json` if the host town isn't there yet
   (`<town-id>` = `<town-slug>-<state-code>`, e.g. `tucson-az`).
2. Add `data/events/<slug>.json`. `town` must match a town `id`.
3. Run the build. Commit `data/`, `cfc-site/events/`, `cfc-site/towns/`,
   `cfc-site/sitemap-events.xml`.

The build fails on: bad JSON, an event pointing at a missing town, a missing
required field, or any banned phrase from CLAUDE.md (leverage, synergy,
journey, "$800", Prescott, sober-time, 7,500-mile framing, …).

## Rules for the data

- **Verified only.** Every fact comes from a page you fetched. List those
  URLs in `sources`. Unknown → `null`, never a guess.
- **next_date** is the next edition after today. If unannounced, `null`
  plus `date_note` and `typical_timing`.
- **Businesses** (hotels, restaurants, bike shops) must be confirmed open via
  their own site or a live listing. No invented addresses or phones.
- **Voice:** short sentences, plain, no hype. `summary` is a 2–4 sentence
  answer an AI assistant could quote whole.
- **register_url** is the actual sign-up page, not the homepage.

## Event — `data/events/<slug>.json`

| field | type | notes |
|---|---|---|
| slug | string | URL: `/events/<slug>/` |
| name, short_name | string | |
| type | enum | road, gravel, mtb, tour, hillclimb, charity, multi-day |
| status | enum, optional | `on-hold` or `cancelled` → flag on page + schema eventStatus |
| town | string | a town `id` |
| start_location | string | venue + address if known |
| start_lat, start_lon | number | start venue; falls back to town |
| next_date, end_date | ISO date or null | |
| date_note, typical_timing | string | |
| founded | int or null | |
| founded_by | string or null | |
| organizer | {name, url} | |
| website, register_url | url | |
| registration_note | string | opens when, sells out, lottery |
| distances | [{label, miles, note}] | |
| terrain | string | one line |
| elevation_gain_ft | int or null | longest route |
| participants, cost | string | |
| summary | string | the quotable answer |
| history | [string] | how it started, 2–3 paragraphs |
| what_to_expect | [string] | 2–3 paragraphs |
| weather_note | string | typical conditions with a number |
| faq | [{q, a}] | 4–6 |
| sources | [url] | |
| verified | ISO date | |

## Town — `data/towns/<id>.json`

| field | type | notes |
|---|---|---|
| id | string | `<slug>-<st>` |
| name, state, state_code, county | string | |
| lat, lon | number | town centre, 4 dp |
| timezone | IANA | drives the weather widget |
| population, elevation_ft | string / int | |
| nearest_airport, major_airport | {name, code, miles} | |
| official_url, visitor_url | url | |
| summary | string | quotable |
| about, riding | [string] | |
| getting_there | string | |
| hotels | [{name, url, address, note, price_hint}] | |
| restaurants | [{name, url, address, cuisine, note}] | |
| bike_shops | [{name, url, address, phone, services[], note}] | `services` words: repair, same-day, parts, rental, rental-road, rental-gravel, rental-mtb, rental-ebike, ship-to-shop, fitting, diy, suspension, box-storage, box-rental, shop-rides, coffee |
| sources | [url] | |
| verified | ISO date | |

### Town guide fields (Sept 30, 2026 — the destination layer)

A town can be more than an event host. Give it the fields below and it
becomes a destination guide: you live in Boise, you are going to Los Angeles,
you are bringing the bike — one page tells you where to ride, where the
ride-out coffee is, who can fix or rent you a bike, where to sleep with it,
what to do off the bike, and how to get the bike there. Every field is
optional; a page or a card only appears when its data exists. The old
fields above keep working unchanged.

Start a new town from `data/towns/_template.json`. The scout agents in
`.claude/agents/` fill these (rules in `research/towns/SCOUT-RULES.md`);
`node tools/verify-town.js data/towns/<id>.json` checks every URL and field
before the build.

| field | type | notes |
|---|---|---|
| kind | enum | `event-host` (default) or `destination` — changes the tile and the title |
| tagline | string | one line, under 60 chars, for the tile and the eyebrow: "Coast road north, canyons inland" |
| best_months | string | when to come, with a reason: "October to April; summer afternoons pass 100 F" |
| routes | [route] | the rides. 4–8 for a destination. See below |
| coffee | [{name, url, address, note, hours_hint, ride_out}] | cafés riders actually roll out from or finish at; `ride_out: true` when a known group ride starts or ends there |
| culture | [{name, kind, url, address, note}] | off the bike. `kind`: record-store, bookstore, gallery, museum, bar, queer-owned, venue, market, other |
| clubs | [{name, url, note, inclusive_focus[], ride}] | clubs and collectives (the weekly rides themselves live in `cfc-site/rides/rides.json`); `ride` = the slug of their ride in the directory, rendered as a link |
| bring_your_bike | object | the logistics page. See below |
| hotels[].bike_policy | string | "Bikes allowed in rooms", "Locked bike room", "No stated policy — ask" |
| hotels[].booking_url | url | a booking link when one exists; the plain `url` stays the property's own site |
| travel_links | [{label, url, kind, note}] | `kind`: official or affiliate. Affiliate links carry the disclosure in the page footer automatically |
| faq | [{q, a}] | 4–6 questions a visiting rider actually asks ("Should I bring my bike to Los Angeles?"), answered in 1–3 plain sentences from the guide's own data; renders as a Questions section + FAQPage JSON-LD |

**route**

| field | type | notes |
|---|---|---|
| name | string | the local name if there is one ("The Donut", "Mulholland to the Rock Store") |
| type | enum | road, gravel, mtb, path, climb |
| miles, elevation_gain_ft | number or null | as published on the route page you cite |
| surface | string | one line: "paved, 2 mi of chip seal" |
| difficulty | enum | easy, moderate, hard, epic |
| start | {name, address, lat, lon} | where riders actually start; the lat/lon at 4 dp |
| description | string | 2–4 sentences: what it is, why locals ride it, what to watch |
| water | string or null | where to fill up |
| hazards | string or null | the honest line: traffic, doors, sand, heat |
| links | {rwgps, strava, komoot, gpx, other} | at least one public route page; null for the rest |
| ride | string | optional: the slug of the group ride that rides this route, from `cfc-site/rides/rides.json` |
| sources | [url] | |
| verified | ISO date | |

**bring_your_bike**

| field | type | notes |
|---|---|---|
| summary | string | the quotable 2–4 sentence answer to "should I bring my bike to <town>" |
| fly | {airports: [{name, code, miles, note}], airline_note} | `airline_note`: what bikes cost or count as on the airlines that serve it, with the date you checked |
| ship | {note, shops: [{name, url, note}]} | shops confirmed (on their own site) to receive and build a shipped bike; the carriers people use |
| rent | {note, shops: [{name, url, note}]} | shops that rent road/gravel/MTB bikes worth riding, with sizes and price if published |
| get_around | {car_needed, note, transit_bike_rules, bike_share: {name, url, note}} | `car_needed` is a boolean; `note` says why |
| rules_and_safety | string | state or city law that matters on the bike (passing distance, e-bike class, helmet rules), and the honest read on traffic |
| sources | [url] | |

Rules for the guide fields are the same as everything else in this folder
and stricter where it matters: a route must have a public route page you
cite; a shop that "ships" or "rents" must say so on its own site; nothing
is `queer-owned` unless the business says it; prices carry the date.

## What the build writes

- `/events/` index, `/events/<slug>/`, `/events/state/<state>/`
- `/towns/`, `/towns/<state>/<town>/` + `hotels/`, `restaurants/`, `bike-shops/`
- when a town has the guide fields: `/towns/<state>/<town>/routes/`, `coffee/`,
  `culture/`, `bring-your-bike/`; clubs and the nearest group rides (from
  `cfc-site/rides/rides.json`, within 30 miles) render on the town page itself
- `/events/events.json` machine-readable feed
- `/sitemap-events.xml` — reference it from `sitemap.xml` when the site returns

Each page carries JSON-LD (SportsEvent, City, ItemList of LodgingBusiness /
Restaurant / BikeStore, BreadcrumbList, FAQPage, WebPage with `speakable`),
one target query in title + h1 + an h2, a quotable `.lede`, and a live
Open-Meteo forecast for the host town.

## 2027 calendar — `data/calendar-2027.json`

`/events/2027/` is generated from this one file by `scripts/build-calendar.js`
(`npm run build:calendar`). It is a different animal from `data/events/`: one
row per event, 600+ events, no town pages, no weather. The 12 hand-researched
events in `data/events/` keep their own deep pages; the calendar links out to
the organizer instead.

```bash
node scripts/build-calendar.js
```

Writes `cfc-site/events/2027/index.html` (every row in the HTML; `calendar.js`
only filters), `cfc-site/events/2027/calendar-2027.json` (feed) and
`cfc-site/sitemap-calendar.xml`. `calendar.css` and `calendar.js` in that folder
are hand-written and untouched by the build. Commit `data/calendar-2027.json`
and everything the build writes.

Top level: `updated` (ISO date, printed on the page), `source` (one sentence),
`events[]`, `retired[]` (`{name, state, reason}` — ended, paused or unverifiable
events, listed so nobody plans around them).

| field | type | notes |
|---|---|---|
| id | int | stable; never reuse |
| slug | string | page anchor, `/events/2027/#<slug>`; unique |
| name | string | |
| category | enum | Charity ride, Road, Gravel, MTB, Multi-day tour, Ultra / bikepacking, Race, Hill climb |
| subtype | string | one line, e.g. "HIV/AIDS 3-day ride" |
| start, end | ISO date or "" | end = start for one-day events |
| date_status | enum | `confirmed` = organizer published the 2027 date; `projected` = placed on the 2026 weekend pattern; `tba` = no usable date (start must be "") |
| date_note | string | how the date was set and what to verify — required for projected/tba |
| city, state | string | state is the two-letter code; "" for national/multi-state |
| region | enum | Southwest, California, Pacific NW, Mountain, Texas & South Central, Midwest, Southeast, Mid-Atlantic, Northeast, Alaska & Hawaii, National / multiple |
| start_city, end_city | string | point-to-point rides only |
| days | int | |
| distances, elevation | string | |
| cause, beneficiary | string | cause is one word or two (LGBTQ+, HIV/AIDS, Recovery, Cancer, MS, …); "" when there is none |
| fundraising_min, cost | string | as published, with the year if it is last year's |
| organizer, url | string | url = the event's own site, not an aggregator |
| reg_status, lottery, series, qualification | string | |
| notes | string | plain prose, short sentences |
| sources | [url] | pages actually read; 1–4 |
| riding | bool | Robert is doing this one in 2027 — shows the "Riding" tag and the Riding filter |

Rules are the same as the rest of this folder: verified only, unknown is "",
never a guess, and never a made-up date. A refresh runs twice a month on the
claude.ai side (the "2027 Ride Directory refresh" task) and republishes the
artifact at https://claude.ai/artifact/1BhU7ywcW4SBYrg3GitPqC; its data block
has the same fields plus `on_list` (= `riding`) and can be dropped straight
into this file, then rebuilt.
