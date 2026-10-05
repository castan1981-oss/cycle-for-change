# seattle-wa · town-editor · 2026-10-04 (Jobs 3 and 4)

A refresh: `data/towns/seattle-wa.json` went from an event-host page (STP start, U District
listings) to a full destination guide. `kind: destination`. Every legacy field the
`/events/seattle-to-portland/` page reads is still there (id, name, state, county, lat/lon,
population, elevation, airports, official/visitor URLs, summary, about, riding, getting_there,
hotels, restaurants, bike_shops, sources, verified). Built with `CFC_OUT` into my scratch
folder; nothing under `cfc-site/` was written. No git.

## Counts

| section | count | notes |
|---|---|---|
| routes | 8 | all from routes.md (Oct 3); Lake Washington loop, Burke-Gilman, North Lake trail loop, Mercer Island, Zoo Hill, Snoqualmie Valley gravel, Bainbridge/Chilly Hilly, West Seattle |
| coffee | 5 | coffee.md (Oct 4); Tailwind is the one ride-out café |
| restaurants | 8 | eat.md (Oct 4): 4 new + the 4 U District legacy entries; Thai Tom and Aladdin dropped (no page of their own) |
| hotels | 8 | stay.md (Oct 4): the 5 U District hotels re-read + HI Seattle, Hotel Max, Silver Cloud Broadway |
| bike_shops | 11 | shops.md (Oct 4): 7 in the city + Bainbridge Bike Co, Classic Cycle, Ride Bicycles (covers[] towns) + Bike Works Open Shop (the DIY slot) |
| culture | 7 | culture.md (Oct 4) |
| clubs | 5 | community.md (Oct 3): Cascade, Outspoken, NorthStar, Moxie Monday, Good Weather |
| faq | 6 | drafted here; @seo-geo-editor hasn't run |
| bring_your_bike | 1 | logistics.md (Oct 4), as filed; rent 4 shops, ship 0 |
| travel_links | 1 | Cascade's 2026 STP lodging list (official) |
| sources | 135 | union of the reports' fetched pages that back something on the page; leads, rejected places and failed fetches left out |

## Decisions

- **Rides.** The five Cascade series are merged (slugs confirmed by grep against rides.json), so
  the Cascade club note and `riding[1]` use tokens for MUMPS, TREATS, LUMPS, ROAD and Eastside
  Hills as community.md asked. Every `{ride:}` token and `ride_slug` in the file resolved; the
  build passed first time.
- **Route `ride_slug`.** Only the Burke-Gilman carries one (LUMPS leaves Matthews Beach Park on
  the trail for Bothell). I first put MUMPS on the North Lake loop and took it off after reading
  the built page: "Ride it with the group" claims the group rides *this* route, and MUMPS changes
  its loop weekly. The route-scout's call (no fixed-route group ride in Seattle) stands; the other
  group rides are named in descriptions as text tokens only.
- **Brevay WTFNB (Pacha Collective).** Not claimed as running. Pacha stays in `coffee` as a
  verified café (own site, hours) with `ride_out: false`, no `ride_slug`, no token; the note says
  the ride met there through September 2026 and the series page showed no upcoming date on
  Oct 4, 2026. **For the rides re-check queue:** `seattle-wa-wtfnb-weekly-with-brevay` — Everyday
  Rides series page says "No upcoming events scheduled", last ride Sept 24, 2026. rides.json still
  lists it active (last_seen 2026-09-24), so the town page's "Group rides around Seattle" still
  shows it; that is the directory's clock, not the guide's.
- **Gregg's rents bikes** — removed from `riding`; greggscycles.com says nothing about rentals
  (shops.md). Montlake rents city/e-bike/MTB only, no road; the bring-your-bike rent note says so.
- **`bike_policy`** is null on seven hotels (renders "No stated policy — ask when you book").
  HI Seattle at the American Hotel is the one in writing (its FAQ: basement bike storage, the
  desk walks you down). Hotel Max's "Bicycle storage" is Expedia's line, not the hotel's, so null.
- **Charlie's Queer Books → `kind: queer-owned`.** The store's own Bookshop.org storefront says
  "Charlie's is a trans-owned bookstore in Seattle that sells queer books of all genres." The
  note quotes it. Reasoning: SCOUT-RULES says queer-owned only when the business itself says so;
  the words are the business's own, on its own storefront, and "trans-owned" is a queer-identity
  ownership statement about a store that sells only queer books. If Robert reads the rule as
  needing the literal phrase "queer-owned", flip `kind` to `bookstore` and keep the sentence.
- **Easy Street Records** stays out: no report fetched its own page (robots.txt). Culture-scout's
  draft record is in culture.md for the day a page loads.
- **NorthStar `bipoc`.** The club's words ("Get Melanated People on Bicycles") were read on a
  mirror of its Facebook intro, not on northstarcycling.org (526). The directory record already
  carries `bipoc` from the Sept 15 check. I accepted it; flagged here.
- **Moxie Monday** carries `women-trans-femme` + `no-drop` (the group's own page). The directory
  record also has `lgbtq`; the page doesn't say that word, so the club entry doesn't.
- **Bike Works Open Shop** is in `bike_shops` (`services: ["diy"]`), not `clubs` — it's a repair
  space, not a riding group. clubs stays at 5.
- **R+E Cycles / Rodriguez** dropped from `bike_shops` (six-week repair wait, Oct 2026; a frame
  builder). **Veloce Velo** (Mercer Island) never added — only 2011 pages exist.
- **best_months, tagline, faq, summary, about, riding, getting_there** written here from the
  reports; no @voice-editor or @seo-geo-editor run yet. Tagline 56 chars. Facts in best_months:
  WeatherSpark (July, 77°F, under an inch), Cascade's fender rule (ride pages), Chilly Hilly's
  page (February, layers, rain). I avoided a "rainy season" claim — no report fetched one.
- **Dates.** `verified: 2026-10-04`. Routes keep the scout's 2026-10-03.

## What's null and why

- `routes[*].start.lat/lon` — no fetched page gave coordinates (routes.md). Eight warnings.
- `routes[1].elevation_gain_ft` (Burke-Gilman) — neither King County nor Cascade gives it.
- `routes[*].water` on Burke-Gilman, North loop, West Seattle — pages name parks, not fountains.
- `hotels[*].price_hint` on six hotels — no rate shows without dates (stay.md); the Sept 15
  `$`/`$$`/`$$$` guesses are gone on purpose.
- `hotels[*].phone` — not on the hotel pages read.
- `culture[6].address` (Matthews Beach) — Seattle Parks' page loaded but the extract had no
  address; TripAdvisor's isn't a source of record.
- `bring_your_bike.ship.shops` — empty; no Seattle shop says on its own site it receives a
  shipped bike. The note names the three published build fees to call.
- `bring_your_bike.get_around.bike_share` — SDOT's pages render as menus.
- `bike_shops[10].phone` (Bike Works) — not on the page.

## Verify (`tools/verify-town.js`, fetched through the proxy)

- 0 fails after pruning one dead source: `cycleandcoffee.com/pages/bike-shop` answered 404 at
  verify time (the homepage still links it; coffee-scout read it this morning). The fact it backed
  ("walk-ins for quick fixes") stays in PIM's note on the scout's read; the URL is out of
  `sources`.
- Bot-walled, kept because a scout read them today: TripAdvisor (Roanoke Inn, Marination),
  cedarsseattle.com (its site; 403 to the fetcher), Expedia (Hotel Max, 429), seattleartmuseum.org
  (403), aa.com ×2 (403; read Oct 3), portseattle.org/transportation/lyft (403), bookshop.org
  (403; Charlie's ownership line). Delta's two pages redirect to a "sorry server" for the fetcher;
  logistics-scout read them today.
- Warnings left standing: 7 hotels without a written policy, 8 route starts without lat/lon,
  "eclectic" inside the TREATS URL.

## Build and read

`CFC_OUT=<scratch>/out-sea node scripts/build-events.js` → 112 pages. Read
`towns/washington/seattle/` (index, routes, coffee, restaurants, hotels, bike-shops, culture,
bring-your-bike) and `events/seattle-to-portland/` as text. Strip line: "8 routes · 5 places,
1 at a ride start · 11 shops, 7 rent bikes · 1 with a bike policy in writing, 7 to ask · 8 places ·
7 places". No nulls/undefined in the HTML. Fixes made after the read: four unsourced phrases in
my own text (an "about 25 miles" for Carnation, "Fred Hutch fundraiser" on Obliteride, a
water-taxi guess, "the group-ride hosts say" → "Cascade's lake-loop page says") and the North
Lake `ride_slug` above.

## Unresolved (for the verifier / next run)

- Alaska and United bike rules from their own pages (both unreadable to the fetcher); Alaska is
  written second-hand with "confirm before you book".
- Which airlines fly SEA; SEA's ground-transport page (403).
- Lat/lon for the eight route starts; the RideWithGPS routes Cascade's pages link
  (27125593, 42243392, 44397889, 45644229) would fill `links.rwgps`.
- Hours for the four legacy U District restaurants (sites refused twice; cedarsseattle.com is a
  bot wall). Notes say "check them before you go."
- Roanoke Inn hours newer than July 2025 (no website; call (206) 232-0800).
- Elliott Bay's and Charlie's hours from their own sites (JavaScript-only).
- Cascade's 2027 STP lodging and transportation pages (404 until spring); every STP price is 2026.
- Burke-Gilman "Missing Link" status in Ballard (SDOT page wouldn't open).
- Hotel Max's bike storage line, by phone.
- Outspoken's Mercer Mondays / West Seattle Wednesdays for the directory once a 2027 season posts.
- `verify.md` from @town-verifier doesn't exist yet; the guide doesn't ship without it.
