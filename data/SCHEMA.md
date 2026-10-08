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
| line | string, any listing (optional) | the card's one short line (Pass 35). Without it the card shows the note's first sentence; the rest of the note is one tap away under "More". On the home shop it is Robert's own words, in quotes. |
| bike_shops | [{name, url, address, phone, services[], note}] | `services` words: repair, same-day, parts, rental, rental-road, rental-gravel, rental-mtb, rental-ebike, ship-to-shop, fitting, diy, suspension, box-storage, box-rental, shop-rides, coffee, builds. Optional `home_shop: true` puts the shop first with a "My home shop" plate — one shop on the whole site, Robert's (Bicycle Haüs, Phoenix guide); never add another. |
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
| clubs | [{name, url, note, inclusive_focus[], ride_slug}] | clubs and collectives (the weekly rides themselves live in `cfc-site/rides/rides.json`); `ride_slug` = their ride in the directory (see "Naming a ride" below) |
| bring_your_bike | object | the logistics page. See below |
| hotels[].bike_policy | string | "Bikes allowed in rooms", "Locked bike room", "No stated policy — ask". Only a policy the hotel states on its own page counts: the strip and the hotels card count "N with a bike policy in writing · M to ask" from this field, and null or "No stated policy …" is "to ask". Nothing on the site says "bike-friendly" without it |
| (any entry).ride_slug | slug or [slug] | coffee, hotels, routes, clubs, shops, restaurants: the directory ride this place serves or starts. Renders "The ride from here: <name> (<days>, <time>) →" with the day, time and link from rides.json |
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
| ride_slug | string | optional: the slug of the group ride that rides this route, from `cfc-site/rides/rides.json` (the old name `ride` still reads) |
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

**Naming a ride (Pass 22, Oct 2, 2026).** A guide never types a group ride's day, time or URL
by hand — the directory is the one source, and it changes (the LA guide said "the Saturday
Nichols Canyon ride" after the ride's own page had moved it to Sunday, and the link 404'd).
In any text field write the ride as a token:

    {ride:los-angeles-ca-la-grange-nichols-canyon-ride|La Grange's Nichols Canyon ride}
    {ride:slug-a,slug-b,slug-c|weekday rides from 26th and San Vicente}

The build renders the label as a link to `/rides/<slug>/` followed by the day and time from
`rides.json` — "La Grange's Nichols Canyon ride (Sundays, 8:00 am)"; several slugs on one clock
read "(Tue, Wed, Thu and Fri, 6:30 am)", each day its own link. JSON-LD and meta get the same
words without the link. Don't write the day or time next to a token. For a whole entry, use
`ride_slug` (above). `node scripts/build-events.js` **fails** on a slug that isn't in rides.json;
a ride that's off the lists (stale, paused, ended) prints a warning and renders as its label
with no link. The town page's "Group rides around <town>" is picked from the directory by day
(Saturday, Sunday, During the week; the rides the guide names first, then weekly, nearest) — no
hand-picked list. Phone numbers in any text (`(310) 376-7786`, `520-884-9018`) and every `phone`
field render as tap-to-call links.

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

## Group rides — `cfc-site/rides/rides.json` (schema v3, Sept 30, 2026)

One array, one object per recurring ride, US and the world. Code contract:
`tools/lib/rides-schema.js` (vocabularies, field order, countries, the safety
list) and `tools/lib/rides-freshness.js` (what's fresh, what hides).
`tools/derive-ride-fields.js` fills the derived fields and the v3 defaults and
orders the keys; run it after every edit, then `node tools/validate-rides.js`,
then `node tools/build-rides.js`.

### Fields

| Field | Type | Notes |
|---|---|---|
| `slug` | string | `<city>-<st or cc>-<host>-<ride>`, `a-z 0-9 -`, unique. Never changes once published (it is the URL). |
| `name` / `name_en` | string / string\|null | The host's name for the ride; `name_en` only when `name` isn't English. |
| `kind` | `group-ride` · `open-streets` · `critical-mass` · `training-series` | Open streets = a city's car-free program (Bogotá's Ciclovía). Training series = the training rides for a charity event. |
| `status` | `active` · `seasonal-break` · `paused` · `ended` | `status_note`, `status_since` (YYYY-MM-DD) say what and when. Changed day/time is not a status: edit the fields. A `seasonal-break` ride stays listed but promises nothing: no next ride, no Event markup, no .ics; its page and row say it's on its break and, when the data says, when it's back (its next `dates` entry, or the month its `season_months` starts). |
| `city`, `neighborhood`, `region` | string | `region` = state name in the US, first-level division elsewhere (Catalonia, Ontario). |
| `state` | `AZ`… \| null | US only. `null` everywhere else. |
| `country` | ISO 3166-1 alpha-2 | `US` for the US. |
| `lat`, `lng`, `geo_precision` | number, number, `start`\|`city` | Start point when geocoded from its address; else the city centre. |
| `tz` | IANA zone | Derived in the US; from the research elsewhere. Drives next-ride dates and the .ics. |
| `discipline` | array | `road` `gravel` `mtb` `social` `cruiser` `fixed` `track` `cyclocross` `ebike` `mixed` `bmx` |
| `schedule` | string | The whole rule in plain words, summer/winter differences included. |
| `days`, `time_local`, `start_hhmm` | array, string, `HH:MM` | `time_local` 12-hour English ("7:30 am"); `start_hhmm` the 24-hour roll time. derive reads it from `schedule` / `time_local` (`tools/lib/ride-time.js`): a clock time has minutes or am/pm — never a speed ("19-20 mph") or a road ("A1A") — roll beats meet, and am/pm comes from the ride's own words. It never overwrites a time the text states, or one set by hand. |
| `start_hhmm_by_hand` | `true`\|absent | A person set `start_hhmm` and derive must keep it, whatever the text reads as. Use it when the text holds several times and the right one isn't the first ("5:30 pm; a second lap leaves at 6:30 pm"). |
| `start_times` | array\|absent | The host's own table of start-time changes, oldest first: `[{ "from": "2026-10-10", "start_hhmm": "07:00" }]`. From `from` (local date) on, the ride starts at that time; before the first entry, at `start_hhmm`. For rides that move with the heat and the light (Tucson's Shootout: 6:30 from the first Saturday of September, 7:00 from the second Saturday of October, 7:30 from the second Saturday of November) or an announced change ("6:30 pm from Oct 7"). The build shows the time in force at the next ride on cards, titles, JSON-LD and live.json, says the coming changes under "When", writes one .ics VEVENT per stretch; ride.js, /tonight/ and the watcher read the table date by date (`startOn` in tools/lib/rides-schema.js). Only what the host published — never a guess. Leave it out when there's no table. |
| `frequency`, `monthly_rule` | `weekly`·`biweekly`·`monthly`·`irregular`, `[{ord,day}]` | `ord` 1–4 or -1 (last). `monthly_rule` is the week-of-month rule ("third Saturday" → `[{ord:3,day:"sat"}]`): the next ride, the JSON-LD (`byMonthWeek`) and the .ics (`RRULE:FREQ=MONTHLY;BYDAY=3SA`) all read it. Only from the host's own words. A `monthly` ride with no rule is posted date by date: it says "Some Saturdays (about once a month)", never "Every Saturday", and its next ride comes only from `dates`. |
| `dates` | array\|absent | The host's posted dates, `[{ "date": "2026-11-21", "start_hhmm": "09:00" }]` (`start_hhmm` null when the host hasn't posted the time yet). For rides posted date by date (`irregular`, or `monthly` with no rule). Only dates still ahead ever render — next ride, one Event, one .ics VEVENT per date (all-day when there's no time); past ones are ignored, so a stale list just goes quiet. A rule (`days` + `frequency`, `monthly_rule`) wins when there is one. |
| `season`, `season_months` | string, `{start,end}`\|null | Months inclusive; southern-hemisphere wraps (`{start:10,end:4}`) are fine. |
| `start_location` | `{name, address}` | |
| `distance_km`, `distance_miles` | number\|string\|null | US data keeps display text in `distance_miles` ("10–12"). World records give km as a number; miles is filled from it. |
| `duration`, `duration_min`, `pace`, `drop_policy` | | `drop_policy`: `no-drop` · `groups` · `drop` · `unknown`. `pace` in the host's own units and words. |
| `host` | `{name, type}` | `type`: `shop` `club` `collective` `nonprofit` `informal` `brand` `team` `cafe` `public` |
| `founded_year`, `founded_note`, `cost` | | |
| `language` | array of ISO 639-1 | The language(s) the ride runs in. |
| `visitor_notes` | string\|null | What a visitor needs: sign-up, licence, guest rides, lights, which side of the road. |
| `description` | string | 2–4 plain sentences in English. |
| `links` | `{website, instagram, facebook, strava, meetup, other[]}` | Never a guessed handle. |
| `inclusive_focus` | array | `lgbtq` `wtf` `bipoc` `beginner` `no-drop` `family` `adaptive` `youth` — only in the host's own words. |
| `sources` | array of URLs | Every page a fact came from. |
| `verified_on` | YYYY-MM-DD | The last day a person or agent confirmed the ride at its source. The freshness clock. Never stamp today on a ride nobody checked. |
| `last_seen` | YYYY-MM-DD\|null | The newest dated evidence the ride is happening (a listed date, a dated post). |
| `evidence` | string\|null | One sentence: what the source showed, and its date. |
| `confidence` | `high` · `medium` · `low` | High: the host's own page states day/time/start and there's a dated 2026 signal. Medium: host page without a recent date, or a dated secondary source. Low: shown with an "Unconfirmed" line and re-checked first. |
| `refresh` | `{method, watch_url, feed_url, notes}` | How to re-check it. `watch_url`: the one page that changes when the schedule does. `feed_url`: an ICS/iCal or Meetup feed that lists this ride's dates (the watcher reads it on its own). `method`: `ics` `calendar-page` `meetup` `ridewithgps` `eventbrite` `heylo` `spond` `strava-club` `instagram` `facebook` `static-page` `federation-calendar` `news`. |

### List pages and old hub URLs (Oct 6, 2026)

- A short page (a pick inside a place, or its `/all/` list) with exactly the rides of another list page points
  its canonical at that page (a state, country or city page when one matches; else the copy under the biggest
  place), and a city hub with exactly its state's or country's rides points at that page. Pages with 2 rides or
  fewer (short pages, national facets) are `noindex, follow`. Neither kind is in the sitemap; all of them still work.
- `data/rides-hubs-history.json` lists every list path the build has ever written (a real
  `node tools/build-rides.js` adds new ones; commit it). Each path that stops being built gets a 301 — the path
  and everything under it — to the nearest page above it that is built, in a generated block of
  `cfc-site/_redirects`. Paths `netlify.toml` already redirects are left to it (their subpaths follow its
  target). Never remove a path from the history.

### Freshness — how a ride stays on the site (tools/lib/rides-freshness.js)

- **Fresh**: checked in the last 90 days (a person, or the host's own feed
  showing the next date in the last 21 days). Card says "Checked Sep 30".
- **Due**: 90–150 days. Still listed; the page says when it was checked and
  asks the rider to confirm with the host. First in line for a re-check.
- **Stale**: 150+ days. Off the directory, hubs, search and sitemap. The page
  stays, says so, and is `noindex`.
- **Flagged**: the watcher saw the host's page go away or say "cancelled",
  or a rider reported it gone or changed. Listed with a warning for 14 days
  while it's re-checked, then off the lists. A person re-checking it
  (`verified_on` moving past the flag) clears it; a feed hit doesn't.
- **Paused** / **ended**: off the lists. Ended pages stay a year (noindex,
  pointing at rides nearby), then the build drops them.

The machine side lives in `data/rides-health.json` (written by
`tools/rides-watch.js`; rider reports added by `tools/rides-reports.js`, flags
resolved by `tools/rides-apply.js`; never by hand): per ride, the last fetch of each
URL, fingerprints of the schedule text, flags, the feed's next date, rider
reports. Human-checked facts live only in `rides.json`.

Around it: `data/rides-queue.json` / `.md` (the re-check queue, from the watcher),
`data/rides-suggestions.json` (new rides and unmatched reports from the ride-report
form), `data/rides-changelog.json` (every applied re-check). A re-check reaches
`rides.json` only through `tools/rides-apply.js`. How it all runs: `tools/RIDES-UPKEEP.md`.

## Rider reviews — `data/ride-reviews.json` (Oct 8, 2026)

Approved reviews only, newest first, written by `tools/reviews-post.js` (never by hand):
`{ id, slug, name, from|null, again: "yes"|"no", pace: "easier"|"right"|"harder"|null, words, date, posted }`.
`id` is the Netlify submission id; `date` the day it was sent. Rules: `tools/lib/reviews.js`.

## Ride films — `data/ride-films.json` (Oct 8, 2026)

`{ "<ride slug>": [{ src, poster, width, height, seconds, caption, alt, added }] }` — the first entry shows on
the ride page as "From the ride". `caption` is place · month; `alt` says what's in it.
