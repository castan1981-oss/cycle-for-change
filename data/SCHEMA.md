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
| bike_shops | [{name, url, address, phone, services[], note}] | |
| sources | [url] | |
| verified | ISO date | |

## What the build writes

- `/events/` index, `/events/<slug>/`, `/events/state/<state>/`
- `/towns/`, `/towns/<state>/<town>/` + `hotels/`, `restaurants/`, `bike-shops/`
- `/events/events.json` machine-readable feed
- `/sitemap-events.xml` — reference it from `sitemap.xml` when the site returns

Each page carries JSON-LD (SportsEvent, City, ItemList of LodgingBusiness /
Restaurant / BikeStore, BreadcrumbList, FAQPage, WebPage with `speakable`),
one target query in title + h1 + an h2, a quotable `.lede`, and a live
Open-Meteo forecast for the host town.
