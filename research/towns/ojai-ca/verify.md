# ojai-ca — verify (@town-verifier, Nov 15, 2026)

**ships.** No fail is left in queer-owned (none claimed), ship-to-shop (none claimed), rentals,
routes or bike policy. Five facts failed or couldn't be re-read and were corrected or cut in
`data/towns/ojai-ca.json` this run (the launching brief allowed that edit; the agent file's
"never fixes the data" was overridden for this run only). The fetch run still exits FAIL on 10
source links: 5 load in a browser and 5 are aggregator bot walls. None is a listing's own URL
except `ojaiinn.com`, which answers 520 to the script and 200 to a browser user agent.

## Script output

First run, with fetches (`NODE_USE_ENV_PROXY=1 node tools/verify-town.js data/towns/ojai-ca.json`):

```
FAIL  data/towns/ojai-ca.json  (212 urls, 19 fails, 10 warnings)
```

After the fixes, with fetches:

```
FAIL  data/towns/ojai-ca.json  (206 urls, 10 fails, 10 warnings)
  ✗ https://ojaiinn.com/ → 520            (+ /amenities/, /around-ojai/bicycle-adventures/, /casa-blog/)
  ✗ https://www.opentable.com/r/boccalis-ojai → timeout
  ✗ https://www.opentable.com/r/ojai-deer-lodge-ojai → timeout
  ✗ https://www.hoteltonight.com/hotel/ojai-rancho-inn-in-ojai-ca → 406
  ✗ https://hotels.com/ho262385/hummingbird-inn-of-ojai-... → timeout
  ✗ https://ojairetreat.com/ → fetch failed
  ✗ https://www.localharvest.org/ojai-certified-farmers-market-M31753 → fetch failed
```

After the fixes, `--no-fetch`:

```
ok  data/towns/ojai-ca.json  (206 urls, not fetched, 0 fails, 3 warnings)
  ! routes[0] start has no lat/lon
  ! routes[2] start has no lat/lon
  ! routes[4] start has no lat/lon
```

`node scripts/build-events.js`: passes. Built 121 pages: 13 events, 17 towns, 10 states.

Non-200s resolved by hand (curl, browser user agent, Nov 15):
- `ojaiinn.com` and its three pages: 200. Bot wall on the script's fetch, not a dead site.
- `ojairetreat.com`, `thedutchessojai.com`: 200 on retry.
- OpenTable (2), HotelTonight, Hotels.com (429), LocalHarvest (connection reset): couldn't verify.
  Source links only.

## Fails (all applied)

- **routes, Ojai Rim Loop** — "Nordhoff Ridge at 6,700 feet" is wrong. Bikepacking.com gives
  6,700' as the route's high point and as Hines Peak, an optional out-and-back. Reworded to say that.
- **summary** — "9 paved miles" against 9.3 everywhere else. TrailLink's trail page says 9.3.
  Summary now says 9.3. `routes[0].miles` stays 9 (rounded to the mile, per the route rule).
- **routes[0] source** — TrailLink guidebook PDF is 404. Replaced with
  `https://www.traillink.com/trail/ojai-valley-trail/` (9.3 miles, 37 Casitas Vista Rd, 402 Bryant St).
- **rentals, The Mob Shop "from $125"** (also e-bikes "from $99", town bikes "from $39") — the price
  sits in a Booqable widget that no fetch renders, and the logistics scout also couldn't load it.
  Couldn't verify, so cut in `bike_shops[0]`, `rent.shops[0]` and the rental FAQ. The pages now say
  prices show once you pick dates. Everything else on the rental (models, sizes, no walk-ins,
  no mass-start events, refund terms, hours) is on the pages.
- **airline_note, Southwest "$45 and $55 in Sept 2026"** — Southwest's fee page as fetched today
  shows $35 and $45 in its table. The two reads disagree, so the dollar figures are cut. The line
  now sends the reader to the fee page.
- **restaurants, Ojai Deer Lodge "On the way … the road out to the Highway 33 climb"** and
  **routes[3] "on the way out"** — no fetched page places the lodge between town and the climb.
  Its own page gives 2261 Maricopa Highway; bikeclimbs starts the climb at 15512 Maricopa Highway.
  Kept "same road", cut the direction.
- **clubs / routes[2] / Papa Lennon's, CIBC April 2, 2026** — the date is right (club forum post,
  "Alternate Sulphur Mountain Special Ride, 2 April 2026", posted Mar 29, 2026). But the post is an
  announcement, not a report. "Ran" and "stopped here for lunch" changed to "posted" and "picked it
  for lunch".
- **clubs, Easy Rider Nov 15** — Meetup lists it under past events, 15 attendees, Plus group about
  29 miles to Meiners Oaks. Same-day listing, so "rode" changed to "its Nov 15, 2026 ride sent".
- **hotels, Ojai Valley Inn source** — `/ojai-california-activities` is 404. The Linus line and the
  two guided tours (about 3 and 7 miles) are on `/ojai-activities`. Source swapped. The 404 press
  release was dropped.
- **dead sources removed** (404 twice): Edible Ventura County market page, two ojaihub.com pages,
  ojaifestival.org `?p=6360`, the Pivot demo event page. No prose rested on them alone.

## Passes

- bike_shops, The Mob Shop — themobshop.com and its contact page: open, 110 W Ojai Ave,
  (805) 272-8102, Mon/Thu/Fri 10–5, Sat 9–5, Sun 9–4, closed Tue/Wed. MapQuest listing (2026) shows
  the same hours. Booqable storefront is live, © 2026. Workshop prices match the workshop page.
- rent, The Mob Shop — booqableshop.com/products/enve-melee: sizes, book ahead, no walk-ins,
  deposit, no mass-start events or races, no transport without permission, refund terms.
- rent, Ventura Bike Depot — venturabikedepot.com/rental-rates: road and mountain $65 to $245,
  four hours to four days, helmet free, open daily 9–5, 239 W. Main Street, (805) 652-1114.
- routes, Ojai Valley Trail — traillink.com trail page: 9.3 miles, both addresses.
  Two Wheeled Wanderer: 15 miles to Ventura, about 800 ft, refills at shops and gas stations.
- routes, Upper Ojai Summit — bikeclimbs: 6.48 mi, 781 ft, 2.3%, max 7.5%, 663 to 1,421 ft,
  start 1994 East Ojai Avenue.
- routes, Sulphur Mountain — MTB Project: 9.2 mi, 2,080 ft up, 134 down, 363 to 2,308 ft, 5% average,
  12% max. One source, one set; the numbers hold together (net 1,945 plus 134). Loop: Two Wheeled
  Wanderer, 30 miles, 2,820 ft.
- routes, Highway 33 — bikeclimbs: 10.81 mi, 2,625 ft, 4.6%, 943 to 3,568 ft, Cat. 1, start 15512
  Maricopa Highway. "Moderate" is right by the route-scout rule (up to 3,000 ft, not over 6%).
  Caltrans closure release loads.
- routes, Lake Casitas loop — Komoot: 77 km, 845 m, cycleway 43.2 km, state road 25.9 km, high
  point 340 m. "Hard" is right by the rule (45–80 miles). Komoot's own grade is moderate.
- routes, Ojai Rim Loop — bikepacking.com: 67 mi, 10,277 ft, day one 28 miles and 6,676 ft,
  overnight parking at the trailhead, 4 to 6 liters.
- airports — great-circle miles from the town's lat/lon to the coordinates on each airport's
  Wikipedia page: SBA 33.8, BUR 53.5, LAX 59.4. The 34, 54 and 59 stand.
- getting_there — ojaivalleyinn.com/how-to-get-to-ojai: 101 about 50 miles, Highway 33 14 miles,
  Route 150 "not recommended in rain, night, or for those unfamiliar with the road".
- coffee, Ojai Coffee Roasters — own page: 337 E. Ojai Ave., 6am–5pm and 6am–6pm, kitchen 9–2.
- coffee, Coffee Connection — own page: 311 East El Roblar Drive, 805.646.7821, Mon–Fri 5am–5pm,
  Sat/Sun 6am–1pm (footer © 2021). joe.coffee: Mon–Sat 6–1, Sunday closed. pos.do: 6–1 daily,
  outdoor seating. The hint already says the sources differ. Left as written.
- restaurants, Ojai Deer Lodge — own page: address, phone, every hour in the note.
- restaurants, Boccali's — own page: 3277 E. Ojai Avenue, 805-646-6116, hours, no pets. Same road
  as the Upper Ojai climb start (1994 East Ojai Avenue), so that line stays.
- hotels, Casa Ojai Inn — ojaiinn.com: address, phone, "complimentary bicycles" line, the amenity
  list, hydration station. Webrez booking page is live for the property.
- hotels, Ojai Rancho Inn — hotel.cfm: "Complimentary bicycles for use", "easy 5 minute bike ride".
- hotels, Hummingbird Inn — home page: "grab a complimentary bicycle and tour Ojai".
- hotels, Ojai Valley Inn — /ojai-activities: "Pick up a complimentary Linus bicycle", two tours.
- hotels, bike_policy — all six say no stated policy. None of the pages read states one.
- culture, Bart's Books — own page: since 1964, 10 to 6 daily, closed Thanksgiving and Christmas.
- culture, Ojai Valley Museum — own page: closed for remodeling, normal hours resume Thu, Nov 19.
- culture, Ojai Playhouse — own page: 145 E. Ojai Ave (voice item 2 settled), films this week.
- clubs, CIBC — Strava club page: Ventura, social riding, waiver or membership. Forum post as above.
- clubs, Easy Rider — Meetup: free, beginner-friendly, no-drop, 20 miles at 12 mph, waiver.
- clubs, Great Outdoors SBVC — page loads.
- ship — BikeFlights FAQ ("allow an extra day or two") and ShipBikes FAQ ("No more than 6 business
  days", UPS ground) re-read today. They carry "(Sept 2026)"; the editor can move that to Nov 2026.
- airline_note — Delta bike rule and $45 / $55 re-read today.
- health rules — no mental-health language on the page.

## Stale

Nothing is past six months. Every `verified` is 2026-11-15.

## Couldn't verify (rests on one signal or an earlier read)

- American's bike rule and fees: aa.com is a bot wall (403). Scout's Nov 2026 read stands alone.
- Alaska (Sept 2026) and the LAX airline list and LAX-it line (Sept 2026): pages wouldn't render or
  answered 403. Carried from the LA guide with their read date, as that guide does.
- United: sports-equipment page wouldn't load. Still "we don't have its rule".
- Hummingbird Inn "$186 a night on Hotels.com": 429 today. One read.
- Farmers' market: LocalHarvest unreachable today.
- Casa Ojai Inn open status: its own site (footer 2022, blog last dated 2018) and a live booking
  page. No dated listing. The note already says to call.
- Coffee Connection Sunday and weekday hours: three sources, three answers. A phone call settles it.
- The Mob Shop rental prices: needs a browser with dates picked, or a call.
- Ojai sidewalk rule; whether the Ojai Trolley carries bikes. Both say so on the page.
- Four hotels still have no rate. `price_hint` stays null.

## Watch

- The Mob Shop's home page banner is a Black Friday ride on "Friday, Nov 28". That was 2025. The
  site isn't kept current, so re-check hours before April.
- Airport cards: `nearest_airport.miles` and `major_airport.miles` are straight-line and the card
  shows them bare. The prose says so; the card doesn't. Editor's call.
- Southwest bag fees: two reads two months apart disagree. Read again before quoting a number.
- Ojai Valley Museum reopens Nov 19. Los Padres fire danger "Very High on Nov 15, 2026" (routes 3
  and 5). Libbey Bowl has nothing listed for April 2027. Caltrans tunnel work ends winter 2026/2027.
- Center Ride Out: the camp location is not published and is not named anywhere in the file.
- "Aug 28 to 31, 2026" is still a hyphen-free date range; house style wants an en dash.
