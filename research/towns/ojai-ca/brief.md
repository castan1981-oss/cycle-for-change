# Brief — ojai-ca

Written by @town-editor (opened from the main session), 2026-11-15. A new
guide. Robert rides Center Ride Out in April 2027, and the ride camps in
Ojai.

## The town

- id `ojai-ca` · Ojai, California · Ventura County · America/Los_Angeles
- Centre for distances: **34.4492, -119.2467** — the city coordinates on
  the Wikipedia page for Ojai, California (34.44917, -119.24667), fetched
  2026-11-15 (page last edited 2026-11-02). It's the city point, not a
  street corner. Ojai is small (4.4 sq mi), so it works for every distance
  in the guide. Scouts: if a city or geocoder page gives a downtown point
  (Ojai Ave at Signal St, the Arcade), say so in your report; don't swap it
  yourself.
- Same page: elevation 745 ft, population 7,637 (2020 census), about 15
  miles inland (that last one carries a "citation needed" on the page, so
  don't use it). The city's own site is ojaicity.org — not fetched yet;
  @logistics-scout confirms `official_url` and `visitor_url`.
- `kind: destination`. No event page in `data/events/` for this town.
  No `data/towns/ojai-ca.json` yet, so this is a first build, not a refresh.
- Suggested `covers[]`: Meiners Oaks, Mira Monte, Oak View, Casitas
  Springs, Upper Ojai. All are named as Ojai Valley communities on the
  same Wikipedia page. **Not Ventura** — it has its own rides hub and is a
  different town.
- Airports: null for now. @logistics-scout fills `nearest_airport` and
  `major_airport` from pages it fetches.

## Who it's for

Two readers. First, the Center Ride Out rider: camping in Ojai, with one
free Saturday (April 24, 2027) to find coffee, a shop and a short ride.
Second, the family and friends who drive up to meet them and need a room,
plus anyone who comes to Ojai with a bike on any other weekend.

What makes it a place to ride: left for the scouts to say from a source.
Two leads from the Wikipedia page, both to confirm on a primary page: the
old rail line became the Ojai Valley Trail in 1989, and the Garrett Lemire
Memorial Grand Prix is a one-mile downtown circuit race held in early
April (check it still runs, and its 2027 date).

## Center Ride Out 2027 — what the organizer's pages say

Read 2026-11-15 on centerrideout.lalgbtcenter.org and
give.lalgbtcenter.org/campaign/780795/donate.

- **April 23–25, 2027.** Check-in Thursday April 22, 3–7 pm, at the Los
  Angeles LGBT Center.
- Day 1 (Fri): rolls 6:30 am, LA to Ojai, 80+ miles, to Basecamp.
- Day 2 (Sat): stay in camp or ride an out-and-back.
- Day 3 (Sun): roll by 7:00 am, Ojai back to LA, finishing along the coast
  near Santa Monica.
- Riders camp. So the hotel reader is mostly family and friends. Saturday
  is the day riders want coffee, a shop and a short ride. Sunday they are
  gone by 7:00 am, so anything that opens later on Sunday is for the
  people who drove.
- **The Basecamp location in Ojai is not published. It is null. Never
  guess it, never hint at it, never measure a distance from a guessed
  spot.** Measure from the town centre above.
- **Robert rides this one** (`data/calendar-2027.json`, id 61, slug
  `center-ride-out`, `riding: true`, `confirmed`). The closing block can
  say so.
- The calendar entry files the event under Los Angeles, not Ojai. Leave
  the calendar alone.
- The event's money goes to the Los Angeles LGBT Center. Nobody gives
  through this site.

## Zones (spread the picks across them)

1. **Downtown Ojai** — Ojai Avenue, the Arcade, Libbey Park. Coffee, shops,
   most of the small hotels.
2. **The Ojai Valley Trail corridor** — the path down the valley toward
   Ventura: Mira Monte, Oak View, Casitas Springs. Confirm length,
   surface, hours and e-bike rules on the agency's own page.
3. **The west end and the lake** — Meiners Oaks, Highway 150 toward Lake
   Casitas.
4. **The East End and Upper Ojai** — the orchard roads east of town, the
   Dennison Grade (Highway 150 east), Sulphur Mountain Road.
5. **Highway 33 north** — the climb into Los Padres National Forest
   (Wheeler Springs and beyond). Only with a public route page and an
   honest hazards line.
6. **Ventura and the coast** — about 12 miles south. Group rides and
   bigger shops live here. A pick down here needs a reason a rider
   staying in Ojai would make the trip.

Zone names come from the Wikipedia page's list of Ojai Valley places and
from the rides directory. Road details are leads until a scout fetches a
route or agency page.

## Already known (don't re-research; link)

**No ride in `cfc-site/rides/rides.json` is in Ojai.** No slug, city or
text mentions it. **@community-scout's job matters most here**: any ride
that starts in the Ojai Valley (a shop ride, a club ride, anything
weekly), proposed with sources, confidence high or medium only.

Nine active directory rides start within 30 miles of the centre. The
build will show these on the town page on its own. Name them by slug
only; never type a day or time.

| miles | slug |
|---|---|
| 10 | `ventura-ca-ventura-cycling-club-tuesday-group-ride` (no-drop; start alternates Faria Camp / Cañada Larga; confidence medium) |
| 12 | `ventura-ca-bikevc-brew-ride` (beginner) |
| 12 | `ventura-ca-bikevc-sunday-morning-coffee-ride` (no-drop) |
| 12 | `ventura-ca-easy-rider-community-ride` (beginner, no-drop) |
| 12 | `ventura-ca-channel-islands-bicycle-club-saturday-montecito-summerland` |
| 12 | `ventura-ca-channel-islands-bicycle-club-saturday-up-the-pacific-coast` |
| 12 | `ventura-ca-channel-islands-bicycle-club-sunday-canyon-to-canyon` (starts Hobert Park, Saticoy) |
| 12 | `ventura-ca-bikevc-ventura-electric-light-parade` |
| 25 | `santa-barbara-ca-fastrack-saturday-lake-ride` |

Hosts: Ventura Cycling Club, Bike Ventura County (BikeVC, from the
Ventura Bike HUB, 490 N Ventura Ave), Channel Islands Bicycle Club (the
Museum lot in Ventura). All were last checked Sept 15 – Oct 2, 2026. None
has an lgbtq focus stated.

Just outside 30 miles, for context only: three Conejo Valley Cyclists
rides (Thousand Oaks, Westlake Village; 31–32 miles).

Rides hubs: none for Ojai. `/rides/ca/ventura/` (8 rides, no guide) and
`/rides/ca/santa-barbara/` (7 rides, no guide) are the neighbours.

Neighbouring guides in `data/towns/`: none close. `los-angeles-ca` is
about 63 miles from this centre (its `covers[]` reaches Malibu, Calabasas
and Agoura Hills, not Ventura County). Next nearest are `del-mar-ca`
(about 154) and `palm-springs-ca` (about 160). No overlap to settle.

One thing for assembly: the town lookup falls back to the nearest
`destination` within 25 miles. Once Ojai is a destination, Ventura ride
pages (12 miles) will pick up the Ojai strip. That's a call for the
editor at Job 3, not for the scouts.

## What search shows (Search Console, 16 town guides, last 90 days, read Nov 15, 2026)

- Plain "bike shop + city" searches sit at positions 40–99 and get no
  clicks. A bare list of shops earns nothing.
- Specific questions with a bike in them rank. A question about Palm
  Springs hotels with complimentary bicycles for guests is position 1.
  "bicycle cafe" is about 9. "cycle cafe near me" is 11.

So for every place, these are the facts that matter most. Get them from
the business's own page, in its own words. If the page doesn't say, it's
null:

1. What time it opens (each day; Saturday and Sunday above all).
2. Whether your own bike can go in the room.
3. Loaner or complimentary bikes for guests.
4. Room for a group (a patio, a big table, somewhere to lean ten bikes).
5. Same-day repair.
6. Bike boxing and shipping.

## Leads only — NOT verified

Found by web search. Nothing below is confirmed: not that it's open, not
its address, not its hours, not what it does. Fetch the business's or
agency's own page for each one, or it doesn't go in a report.

- Routes: Ojai Valley Trail · Sulphur Mountain Road
- Shops: The Mob Shop · Bicycles of Ojai
- Coffee: Beacon Coffee
- Stay: Capri Hotel · Ojai Valley Inn · Ojai Rancho Inn
- Off the bike: Bart's Books · the Sunday farmers' market

## Watch for

- **Basecamp is null.** Said twice on purpose.
- Saturday April 24, 2027 is the day that counts. A café that opens at 6
  or 7 on a Saturday beats a better one that opens at 9. Say which is
  which.
- Sunday market: riders roll by 7:00 am that Sunday. It's a pick for the
  people who drove up, and for any other weekend. Check the market's own
  page for hours and place.
- Hotels fill on event weekends and some set minimum stays. Say so only
  where a hotel's own page does. `bike_policy` only as the hotel states
  it; otherwise "No stated policy — ask".
- Highway 33 and Highway 150: narrow, fast, little shoulder is what
  people say. That's a lead. The hazards line needs a source.
- Heat and fire season: `best_months` from a source, with the reason.
  Check for any road or forest closures on Caltrans and Los Padres pages
  and carry the date.
- Getting there without a car: the Wikipedia page says Gold Coast Transit
  connects Ojai with Ventura and the city runs the Ojai Trolley.
  @logistics-scout confirms both on the operators' pages, with bike
  rules.
- `queer-owned` only when the business says so itself. It informs the
  picks and never headlines the page.
- No mental-health language anywhere in the reports. Ojai sells itself on
  wellness and retreats; leave that out and say what a place is.
- An event-host-sized town: half targets are fine. Three verified cafés
  beat six with two guesses.

## Sources

- https://en.wikipedia.org/wiki/Ojai,_California (coordinates, county,
  elevation, population, valley communities, trail and race leads,
  transit lead) — fetched 2026-11-15
- https://centerrideout.lalgbtcenter.org/ and
  https://give.lalgbtcenter.org/campaign/780795/donate (Center Ride Out
  2027 schedule) — read 2026-11-15 by the main session
- `cfc-site/rides/rides.json`, `cfc-site/rides/hubs.json`,
  `data/calendar-2027.json`, `data/towns/*.json` — read 2026-11-15
