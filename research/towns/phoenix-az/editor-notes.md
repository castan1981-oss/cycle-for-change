# phoenix-az · editor notes

@town-editor · 2026-10-03 · Jobs 3 and 4 (assemble, check, build, read). The PR is the main
session's. `data/towns/phoenix-az.json` is new, built from `_template.json` and the eight reports
in this folder. Nothing in the JSON is outside a report; the three places I went past a report's
Findings block are listed under "Editor's calls" with the source each one rests on.

## Counts

routes 8 · coffee 4 (1 ride-out) · bike shops 6 (3 rent) · hotels 6 (0 with a bike policy in
writing) · restaurants 5 · culture 7 · clubs 6 · faq 6 · ride slugs named 20 (all in rides.json
and all on the live list) · sources 190 · bring_your_bike: 1 airport, 1 airline, 0 ship-to shops,
4 rental shops.

## How it was checked

- `NODE_USE_ENV_PROXY=1 node tools/verify-town.js data/towns/phoenix-az.json` → **ok, 193 urls,
  0 fails, 37 warnings.** In this sandbox Node's fetch needs `NODE_USE_ENV_PROXY=1` to go through
  the agent proxy; without it a handful of hosts answer 503 from the transparent egress (luxcoffee.com
  did). Through the proxy a single URL sometimes drops with "fetch failed" under 190 parallel
  requests and passes on its own (azfamily, hyatt, firstdraftbookbar did this on different runs);
  that is network noise, not a dead link. Run it twice before believing a lone fail.
- The 37 warnings: 6 hotels with `bike_policy: null` (this run's rule — the page prints "No stated
  policy — ask when you book" by itself); 7 route starts without lat/lon (no start page was fetched);
  24 URLs behind bot walls (403) that the scouts did read: hyatt.com ×8, changinghands.com ×5,
  tripadvisor.com ×3, aa.com ×2, trailforks.com, trivago.com, reservationdesk.com, phoenixmag.com,
  bookshop.org, axios.com. Kept, because the scouts fetched them and the page facts rest on them.
- Pruned from `sources[]` (dead or unreachable every run): `clippedin.bike/silent-sunday-pilot…`
  (a rejected 2018 source; nothing on the page uses it), `moxiebikeshop.com` (would not connect;
  the ship note now says so), `hotels.com/ho538654/…` (429/503/timeout on every try — the Sonesta
  $159 rate is still in the note, attributed to hotels.com and dated; verifier, check it by hand),
  `firstdraftbookbar.com` (connection resets on 3 of 4 runs; the First Draft bar is also on
  changinghands.com/store/2, which is kept).
- Build: `CFC_OUT=<scratch>/out-phx node scripts/build-events.js` → 100 pages, no warnings (no
  named ride is off the lists). I read all eight Phoenix pages as text, top to bottom. Two fixes
  from the read: the get_around note began "Yes." under the build's own "You'll want a car." (cut),
  and the Gainey start printed "Scottsdale" twice (name trimmed; the address carries the city).
  `tools/build-rides.js` was **not** run and `rides.json` was **not** touched, per the run's rules;
  `hubs.json` still has `guide: null` for Phoenix until the rides build runs.

## Editor's calls

- **Order.** Routes: South Mountain first (the city's own climb, car-free Sundays, tied to a
  directory ride), then the Rio Verde–Fountain Hills loop (the long one), Gainey (the group-ride
  loop), Usery, the Greenbelt path (easy), the Greenbelt loop (52 mi), Trail 100, the McDowell
  Competitive Track. Coffee: the ride-out café (Regroup) first. Shops: the rental shop (Bike
  Emporium) first. Hotels: the two at Gainey Ranch first (nearest the riding), then Tempe, then
  central Phoenix. Restaurants: after-the-ride places first, the night-before ones last.
- **covers[]:** Scottsdale, Paradise Valley, Tempe, Mesa, Chandler, Gilbert, Fountain Hills, Cave
  Creek, Carefree, Glendale, Peoria — the brief's list. Goodyear, Sun City, Surprise and Queen
  Creek are out. Note for whoever runs the rides build: `TOWNS.find` also matches the nearest
  destination within 25 miles by lat/lng, so Goodyear's rides (about 17 mi from downtown) will get
  the Phoenix strip through the radius rule regardless of covers[]. That is the build's rule, not
  this file's; if Goodyear should not carry it, that is a change in scripts/towns.js.
- **Gainey route start lat/lon and address** come from `rides.json`
  (`scottsdale-az-scottsdale-cycling-gainey-thursday`, geo_precision "start": 8977 N Scottsdale Rd,
  33.5584, -111.9260), not from a page the route scout fetched. The route *is* that ride's route and
  the scout's start description matches the record. The other seven starts stay null: no start page
  was fetched, and the Silent Sunday and MMC night-ride records are city-precision, so their
  coordinates are not a start.
- **South Mountain elevation** is 1,330 ft (PJAMM's figure, which the route description quotes),
  not the 1,350 the scout put in the field.
- **Cross-references added:** the Rio Verde loop names McDowell Mountain Cycles and Fountain View
  Coffee on Saguaro Blvd (coffee.md, shops.md) and the Tour de Scottsdale (calendar id 42, April 10,
  2027 confirmed); the Gainey route carries the five hills from the club's Strava event
  (community.md); the Greenbelt path names The Bike Lane's social rides by token; the Competitive
  Track names MMC's night ride and Ladies ride by token and the shop's delivery to the park; the
  South Mountain route mentions Taco Tuesday riding the park's trails from Ahwatukee; hotels carry
  `ride_slug` for the ride on their road (Sonesta and Grand Hyatt → the three Gainey rides, Hampton
  → Regroup, Hostel → Downtempo, Biltmore → Granada). Village Tavern carries all three TriScottsdale
  slugs. The Rio Verde route has no `ride_slug` (MMC's ride leaves from the shop on the loop but no
  page says it rides this loop).
- **Pedal Haus appears twice on purpose:** the Tempe brewpub under Restaurants (food, late hours)
  and the Roosevelt Row brewery under Off the bike (the rooftop bar). Different addresses; each
  note points at the other.
- **one·n·ten** gets one sentence in about[1]: one of the orgs a pledger can pick, its ride on the
  2027 calendar. "Home base" is the only line about the owner. No daylight-saving line: no report
  sourced it (the logistics scout flagged it; one official line would do).
- **Ride labels** never carry a day or time; the build fills them from rides.json. Where a label
  is the host's own ride name ("Saturday Cycling", "Sunday Funday", "Taco Tuesday") the day word
  is the name, and the build still prints the directory's day and time after it.
- **MMC's `women-trans-femme` tag** rests on its Ladies Mountain Bike Ride, which the directory
  already tags `wtf`. The shop's word is "Ladies"; Robert can pull the tag if he thinks it
  overreaches.
- **Boycott Bar is `queer-owned`** on the business's own words (its site: "Arizona's last
  lesbian-owned bar"; its About page: "proudly LGBTQ+ owned & operated"). The note says where.
- **First Friday on Roosevelt Row stays out** (the culture scout's 2026 news on violence; not on the
  page, not in sources as a pick).
- **The rules_and_safety text says plainly** that Arizona's bike statutes were not read and gives
  the heat rule, which is the hazard that matters here. The heading the build prints is "The rules
  on the road in Arizona"; the first sentence tells the rider what is missing rather than leaving
  the section out. Swap in the statute summary when the logistics gaps below are filled.

## What's null, and why

- `population`, `elevation_ft` — no report sourced them.
- `major_airport` — PHX is the only airport read; Phoenix-Mesa Gateway's site timed out.
- All eight `routes[].start.lat/lon` except Gainey; `start.address` on seven routes.
- `routes[].water` on South Mountain, Gainey, the Greenbelt path and loop, Trail 100 — no page
  names a fill-up; the hazards line says to carry it all.
- `routes[].elevation_gain_ft` on the Greenbelt path and the Competitive Track — not published.
- Every `hotels[].bike_policy` — none of the six puts a policy for your own bike in writing. Three
  lend or rent the resort's bikes, which is not the same thing. Rates for the Grand Hyatt, Mission
  Palms and the Biltmore — their booking engines don't render in a fetch.
- `hotels[].phone` — the stay scout put no phones in Findings.
- `bring_your_bike.ship.shops` — **empty.** No Valley shop says on its own site that it receives a
  shipped bike. The page says so.
- `bring_your_bike.get_around.transit_bike_rules` — Valley Metro's pages load as script shells
  with no text. The note tells the rider to check valleymetro.org or call 602-253-5000.
- `bring_your_bike.get_around.bike_share` — none confirmed.
- Arizona bike law and a local traffic read — azleg.gov, ADOT and the city's Road Safety Action
  Plan page all timed out for the logistics scout.
- Airlines other than American — Southwest, Delta, Alaska, JetBlue pages would not load; United,
  Frontier, Allegiant not attempted. The LA guide read Alaska, Southwest and Delta in Sept 2026; a
  re-fetch of those three pages fills most of this.
- Heard Museum admission price — behind its ticket portal.
- Scottsdale Stadium address — the city's and the Giants' pages would not load.
- `travel_links` — none.

## For the verifier: look hardest at

1. **The Sonesta rate** ($159, Sun Oct 25, plus $34.21 fee) — its hotels.com source URL was pruned
   as unreachable by machine; check by hand or cut the number.
2. **Hampton Inn rates** ($100–$139 October; $417 Sat Nov 7) — trivago is bot-walled.
3. **Village Coffee Roastery and Fountain View Coffee** — both rest on two listings each
   (joe.coffee + wanderlog); neither site of its own was opened. Fountain View's phone has a
   California area code. Closing-time conflict on Village (2 vs 4).
4. **Matt's Big Breakfast and Village Tavern** — listings only (TripAdvisor + restaurants-us;
   NetWaiter + scottsdale.com). Village Tavern's ZIP: 85258 (ordering page) vs 85253 (OSM).
5. **Old Town Scottsdale Farmers Market address** — three city listings, two addresses; the
   operator's page would not load. The note tells the rider to check before riding over.
6. **Cactus League dates** (Feb 19 – Mar 20, 2027) — cactusleague.com gave two different lists on
   two reads; only the first and last game are used.
7. **South Mountain closure hours** — from the city's page, which has nothing dated after April
   2026; PJAMM says "last Sunday", the city says "4th Sunday" (the city is used).
8. **The heat-closure list** — the parks trails page names four South Mountain trails; the city's
   general heat page says "all trails associated with … South Mountain". The trails page is used.
9. **Distances** ("about N miles from downtown") are straight lines from City Hall
   (33.4484, -112.0740) to rides.json start coordinates or the scouts' approximate geocodes.
10. The 24 bot-walled URLs listed above.

## For the rides re-check (`tools/rides-apply.js`; I did not touch rides.json)

- `scottsdale-az-scottsdale-cycling-saturday-ride` (Fuss Buss): record 5:30 am; the Strava event for
  Sat Oct 10, 2026 says **6:00 am** and "Still a 'drop' ride" (record `drop_policy: unknown`).
- `fountain-hills-az-mcdowell-mountain-cycles-sunday-funday-gravel`: record 6:00 am; the shop's
  calendar and ride text say **6:30 am** (Oct 4 and 25).
- `scottsdale-az-triscottsdale-tuesday-flat-and-fast`: `time_local` "5:35 am" and the schedule text
  agree on morning, but `start_hhmm` is **17:35**. The town page prints the morning time (the build
  reads `time_local`); the .ics and /tonight/ read `start_hhmm`. One of them is wrong.
- `tempe-az-regroup-coffee-ride`: the shop's rides page as read Oct 3 listed only the Sept 26 Chino
  Grinder pre-ride and an Oct 10 packet pick-up — no Saturday coffee ride; the record (read Sept 30)
  had Oct 3 at 6:30 "NEW START TIME". Probably posted week to week; worth @ride-verifier's look.
- `phoenix-az-valley-epic-rides-night-rider-trail-100`: the Meetup series ends Oct 27, 2026 (last
  ride Oct 21), and the event text says it alternates South Mountain and Trail 100 weekly. The guide
  names it by token in two places and as `ride_slug` on the Trail 100 route; if the record goes off
  the lists the build warns and prints the label without a link — drop the token then if the
  series isn't renewed.
- The Gainey RideWithGPS route (29074769) says "Every Tus and Thurs morning"; the directory has the
  Tuesday ride as a different, flat Paradise Valley loop. Only the Thursday slug is on the route.
- Not in rides.json, for the next merge: **The Velo's weekly shop ride** (Wednesdays 6 am from the
  shop in Coronado, per thevelo.com/ride-with-us); **MMC's Thursday "Pedal & Pints + Social"** from
  Fountain Hills Park (next date TBD, mcdowellmountaincycles.com/mmc-life/); the community scout's
  C3: Cultural Cadence Cycle (an Indigenous Peoples' Day ride on the Rio Salado path, 2026 date
  TBA) is a calendar item, not a recurring ride.

## Open questions for Robert

1. **The Gainey Village coffee.** Which café do the Scottsdale Cycling rides use? The Coffee Bean &
   Tea Leaf at 8877 N Scottsdale Rd is missing from the chain's own Scottsdale store list; Village
   Coffee Roastery (McCormick Ranch, opens 6) stands in for it on the coffee page. Where does the
   Fuss Buss's "always mandatory" coffee stop land?
2. **Gainey Tuesday vs Thursday** — does the Tuesday ride use the same 29-mile loop (RWGPS says
   "Tus and Thurs") or the flat Paradise Valley route the directory has?
3. **South Mountain start** — is "the ranger station at the bottom of Summit Road" the right way to
   name it, and is there water anywhere on the climb?
4. **Chaparral Park** as the Greenbelt trailhead — TrailLink puts it at 5401 N Hayden Rd; good
   enough to print? (El Dorado Park: TrailLink says 2311 N Miller, the directory 2301.)
5. **OutCyclists** — is the LGBT road club still riding (Thursday sunset social from Old Town
   Scottsdale, last dated May 2022)? It would be the queer club on this page with `lgbtq` and
   `no-drop`. The Gravel Collective's site has lapsed; is it alive on Instagram?
6. **Moxie Multisport** — does it actually receive BikeFlights shipments and build them, and what
   does it charge? One phone call fills the ship-to list.
7. **Goatheads and glass** — the brief wanted a flats line; no shop page says it. Your word, or a
   shop's?
8. **Arizona's no-DST line** — one official source and it goes in.
9. The **TriScottsdale Tuesday** time: 5:35 am or 5:35 pm?

## Gaps for a second pass (not blocking)

Bartlett Lake Rd / Cave Creek / Carefree, Tempe Town Lake and the Rio Salado path, the Arizona
Canal and Crosscut, Hawes, San Tan; a gravel route with a public page (BWR Arizona course, MMC's
Sunday Funday route, Cyclologic's Sunday gravel); a Fountain Hills or Ahwatukee hotel; a Scottsdale
breakfast that opens by 7; the PMBC breakfast stops (on its RideWithGPS calendar); Landis Cyclery
Tempe North as a seventh shop once its phone number is settled; Bike Saviours as a `diy` shop chip;
Southwest/Delta/Alaska bike pages; Valley Metro bike rules; Arizona statute summary; a Phoenix
bike-share answer; Phoenix-Mesa Gateway's airlines.
