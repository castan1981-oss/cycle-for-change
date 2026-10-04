# san-francisco-ca — editor notes

@town-editor · 2026-10-03 · Jobs 3 and 4 (assemble; check, build, read). The PR is the main session's.

Built `data/towns/san-francisco-ca.json` from `_template.json` and the eight reports. Draft pages
were built with `CFC_OUT` into a scratch folder and read top to bottom; the data was fixed and
rebuilt twice. `node tools/verify-town.js` ends with 2 fails, both the same bot wall (below).

## Counts

routes 8 · coffee 5 (3 ride-out) · bike shops 6 (4 rent) · hotels 6 (1 bike policy in writing,
5 null) · restaurants 4 · culture 6 · clubs 7 · bring_your_bike 1 (3 airports, 1 ship shop,
4 rent shops) · faq 6 · sources 202 URLs (206 unique URLs across the whole file).

## What I decided

- **Order.** Routes: the bridge and Headlands (the signature, and the first-day ride) · Sunset
  Dunes (the easy one) · the Tiburon loop (the club-ride route) · Mt. Tam (the climb) · Point Reyes
  (the long day) · the Headlands dirt loop · Old La Honda (Peninsula) · Grizzly Peak (East Bay).
  Zones 1, 3, 1, 2, 2, 1, 4, 5. Shops: Columbus Cyclery first (the one shop that says it receives
  a shipped bike, and it rents), then Sports Basement Presidio (the rentals a visitor would actually
  ride, the case rental, nearest the bridge). Hotels: the HI Fort Mason hostel first (the one bike
  policy in writing), then the Lodge at the Presidio (nearest the bridge). Coffee: Equator (the
  Saturday ride start) first.
- **`covers[]`** = Sausalito, Mill Valley, Tiburon, Fairfax, Point Reyes Station, Berkeley,
  Oakland, Emeryville — the places the guide actually has listings or routes in, plus the three the
  brief named. Palo Alto and Woodside are left out (their rides would otherwise carry this strip;
  Palo Alto is its own future guide). `scripts/towns.js` confirms: Sausalito, Mill Valley, Oakland,
  Berkeley, Emeryville, Fairfax and Moraga (by distance) match this guide; Palo Alto, Woodside and
  San Jose do not.
- **The Jersey Ride start.** rides.json and the club's standing ride page say Peet's, 16th and
  Market; the club's Aug 8, 2026 event listing said Jane Warner Plaza, Castro and Market, a block
  away. The guide describes the start as the club's page does (Peet's, with the rides.json address
  and coordinates), says in the route description that the August listing moved it a block and to
  check the club calendar, and never contradicts the ride record. The record itself was left alone.
  The coffee scout also saw a Yelp search title "PEET'S COFFEE - CLOSED - Updated September 2026"
  for 2257 Market (title only; Yelp blocks fetches). Peet's Castro is therefore **not** a coffee
  pick. Hand-off to @ride-verifier: re-check `start_location` on
  `san-francisco-ca-different-spokes-jersey-ride` against the Oct 10, 2026 event page on dssf.org.
- **Fat Cake Tuesday time.** fatcake.cc/tuesdays says gather 6:10, roll 6:17 from the Welcome
  Center; rides.json (from fatcake.cc/rides, Oct 1) says 6:30 from the southern pavilion. No
  hand-typed time anywhere in the guide; every mention is a token, so the page says what the record
  says. Hand-off to @ride-verifier.
- **The rejected wildcard slug.** The clubs note no longer tokens
  `san-francisco-ca-fat-cake-club-thursday-wildcard`; it tokens Donut Alley (the merged record) and
  says in words that the club's page lists a Thursday ride on the other weeks, start posted on
  Instagram.
- **Sunset Dunes ballot question.** Stated only what KQED's dated piece says: a signature drive
  (April 2026, updated Sept 2026) for a measure to let cars back on weekdays; whether it made a
  ballot "was not confirmed when we checked." Hours null (sfrecpark.org 403'd the scout).
- **El Rio and Twin Peaks Tavern**: out. Neither was confirmed on its own page. The culture
  page's h1 promises a bar, so Splitrock Tap & Wheel's taproom (Fairfax, the Marin Cyclists'
  start, fetched on its own site by the shop scout) is the `bar` entry, with the Chapter 11 note.
  Nothing is `queer-owned`: no business said so in its own words.
- **United**: left off the airline list; the airline note and the FAQ say its page didn't load.
- **SFAF** is named once in `about[]` as one of the orgs a pledger can pick, next to Cycle to Zero.
  Dates for Cycle to Zero and the Recovery Ride are not typed into the prose; the page's 2027
  calendar section carries them live.
- **Clubs**: the community scout's six, minus San Francisco Cycling Club (members-only; its one open
  ride is tokened in `riding[]` and shows in the weekday list), plus Tam Velo Club and Berkeley
  Bicycle Club, built from the coffee scout's fetched club pages (tamveloclub.com/weeklyrides.html,
  berkeleybikeclub.org/friday-coffee-ride) and the rides.json records. Seven, one over the 2–6
  target, so Marin and the East Bay each have a club on the page.
- **High Trails `fitting`**: dropped. The scout tagged it; nothing in the note or on its service or
  home page (curl, Oct 3) says fit. **Columbus `rental-mtb` / `rental-ebike`**: kept; its rental
  page's own description lists "Mountain, Road, Tandem, Comfort, kids & Electric."
- **Sports Basement's "about 3 miles"**: dropped (the scout said it was an estimate; the address
  didn't geocode). The note says "the closest pick to the bridge," which the Presidio page supports.
- **Multi-ride tokens** render as "label: Ride A (…); Ride B (…)", so every one sits at the end of
  its clause ("Equator Coffees is the start of Tam Velo Club's rides: …"). Mid-sentence they broke
  the grammar; fixed after the first read.
- **`get_around.note`** no longer starts with "No." — the build prints "You can skip the car." in
  front of it.
- The `/rides/ca/palo-alto/` path appears once as plain text in the Old La Honda route (the build
  only linkifies ride tokens and phone numbers).

## Null, and why

- `population`, `elevation_ft`, `official_url`, `visitor_url`: no report fetched a source. The
  "San Francisco: the town" fold shows only the time zone. A city page (sf.gov) and sftravel.com
  would fill it on a refresh.
- `bike_policy` null on 5 of 6 hotels (this run's rule; the page prints "No stated policy — ask when
  you book" itself). The Presidio Trust's "Bike Parking" tag on the Lodge is in the note, not the
  field: it isn't the hotel's own page and doesn't say where.
- Route `start.lat/lon` null on 7 of 8 (the scout fetched no start-place pages). The Tiburon loop's
  start carries the rides.json address and coordinates for Peet's.
- Route 5 (Point Reyes) `surface` and `water` null: the RideWithGPS page gives neither.
- Arsicault `url` null: no site of its own; the Waze listing the scout read is in `sources` only.
  Its hours are from that undated listing and the note says so.
- Hotel rates: only the three pages that showed a number (Beck's, Cavallo Point via Expedia; the
  hostel's momondo figure was in pounds and is left out).
- `best_months` is not null but is thin on purpose: no report gave a season, so it says what the
  sources do say (the bridge is open to bikes every day, shorter west-sidewalk clock Nov–Mar; the
  directory's rides run year-round; Jay's page says wait for a fog-free day for Tam). A climate
  source (NWS Bay Area, a dated city page) would let a refresh say more.

## For @town-verifier — look hardest at

1. **Two alaskaair.com URLs fail with 406.** Node's fetch gets a 406 block page from Alaska's edge
   (HEAD and GET, 8.9 KB); curl with the same user agent gets 200 and 301 KB with the bike text.
   The logistics scout read the embedded JSON the same way. The LA guide carries the same URLs.
   A bot wall, not a dead page: verify by hand and keep.
2. Delta's two baggage pages 200 but redirect to `ssp.delta.com/.../delta_sorry.html` for the
   verifier — another bot wall. The scout read them with curl.
3. 403/429 bot walls the verifier warns on, all fetched by a scout: sfbike.org (6 pages), flysfo.com
   (5), aa.com (2), ihg.com (2), tripadvisor (5), restaurantji (2), expedia (2), javabeachcafe.com,
   amoeba.com, discogs, greenapplebooks, doordash, dothebay. Kept, as instructed.
4. The Jersey Ride start (above) and the Fat Cake Tuesday time (above) against the club pages.
5. Splitrock Tap & Wheel: Chapter 11 filing April 2026 (WhatNow). It appears under shops, culture
   and rent. Phone it.
6. High Trails' rental fleet and prices (page images from May 2024).
7. Bovine Bakery (hours from undated listings), Arsicault (undated Waze hours).
8. Caltrain's 2026 bike-rules review (report due Nov/Dec 2026): `transit_bike_rules` quotes the
   current page.
9. The Great Highway / Sunset Dunes measure: SF Department of Elections, November 2026 list.
10. Peet's Coffee, 2257 Market St: open or closed.

## Open questions for Robert

- The Jersey Ride start: keep Peet's in rides.json until the club's Oct 10 page is read, or move
  the record to Jane Warner Plaza now?
- `covers[]` includes Oakland, Berkeley and Emeryville as the brief suggested, so East Bay ride
  pages will say "Once you're in San Francisco." Fine until an East Bay guide exists?
- Zone 3 (the ocean side) has one coffee pick and no bed or restaurant; Zone 5 (the East Bay) has
  one café, one route and two clubs, no bed or restaurant. The stay and eat scouts ran out of
  search. Is a second pass worth it before this ships, or does it ship as is?
- Cycle to Zero / Recovery Ride host hotels (Fort Baker, Sausalito): the stay scout couldn't open
  the Cycle to Zero FAQ. Worth a line from you if you know the 2026 arrangement.
- Rapha San Francisco (2198 Filbert) runs weekly rides but the schedule page refused the fetcher;
  Mike's Bikes Sausalito's Wednesday Col du Pantoll ride is only on an aggregator. Both would be
  clubs/rides picks the moment one page confirms them.
- Leads the scouts left for a refresh: Sports Basement Berkeley (an East Bay shop by BART), Mike's
  Bikes San Rafael (Marin gravel rentals), Marina Motel and Tamalpais Motel (budget beds), Green
  Apple Books On the Park (the Zone 3 bookstore), Gestalt Haus Fairfax, the Aquatic Park swim
  (Dolphin Club / South End day use), Java Hut Fairfax (the Fairfax ride-out café), SF2G.
