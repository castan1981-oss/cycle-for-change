# palm-springs-ca · town-editor · 2026-10-04 — assemble, check, build, read

`data/towns/palm-springs-ca.json` assembled from the eight reports (brief, routes incl. the
second pass, community, and the Oct 4 reruns of shops, logistics, coffee, eat, stay, culture).
Every entry traces to a report with a fetched source. `verified: 2026-10-04`. Built into a
scratch folder with `CFC_OUT` and read page by page; `tools/verify-town.js` passes with
0 fails (163 URLs).

## Counts

| section | count | notes |
|---|---|---|
| routes | 9 | CV Link · Tramway Road · Highway 74 · Tour century · Midcentury loop · Gerald Ford/Tamarisk loop · Box Canyon · Park Blvd (JT) · Geology Tour Rd (JT gravel) |
| coffee | 6 | 3 ride-out (Starbucks Hwy 74 → Sunday Climbers; Coffee Bean → DBC weekdays, no slug yet; Koffi Rancho Mirage → Monday ride turnaround) |
| restaurants | 7 | Townie Bagels cross-listed from coffee; Blackbook dropped (see below) |
| hotels | 6 | all `bike_policy: null` |
| bike_shops | 7 | one over target; kept Trek Palm Desert (the Monday shop) and ACME (mobile) per the scout's reasons |
| culture | 9 | one over target; all nine read on their own or the city's page. Hunters is the one `queer-owned` (its About page: "LGBTQ+ owned, inclusive and welcoming") |
| clubs | 4 | Great Outdoors carries `lgbtq`; DBC is not tagged (qcal.app's label isn't the club's) |
| bring_your_bike | 1 | lifted whole from logistics.md |
| travel_links | 1 | the Tour's hotel list (official) |
| faq | 6 | bring / car / Tour start / group rides / CV Link / heat |

## Decisions

- **Order.** Routes: the path first (the ride for the day you land), then the two climbs,
  the century, the two easy loops, the three car days. Coffee: ride-outs first. Shops:
  Tri-A-Bike first (ships, rents, repairs, runs a ride), then the two Palm Springs stores.
  Hotels: nearest the Tour start first. Restaurants: after the ride, then the night before,
  then late.
- **Ride tokens.** Every ride named is a `{ride:…}` token or `ride_slug`; all five slugs
  exist in rides.json. The DBC weekday rides from Coffee Bean are not in the directory
  (held back by the three-per-host cap), so the Coffee Bean note says "check the club's
  calendar for the day and time" instead of typing them. Highway 74 carries
  `ride_slug` for the Sunday Climbers; the Gerald Ford loop names Tri-A-Bike's fun ride in
  text but not as `ride_slug` (nothing says the fun ride rides that loop).
- **Big Wheel's `ride_slug` left off** the shop and club entries on purpose: the ride has no
  fixed day, and `rideLine()` (scripts/build-events.js:544) prints `(…)` unguarded, so the
  page showed "Big Wheel Bikes CV Community Group Rides ()". The note tokens still link
  the ride. **For the main session:** guard `rideWhen(r)` in `rideLine` the way lines 189
  and 195 do; then the two `ride_slug`s can go back.
- **Heat on every route.** The brief asks for it; the sources are PJAMM's Highway 74 page
  (June–Sept highs 102–108 F, don't start after sunrise), Velo Palm Springs' Joshua Tree
  guide (summer past 100 F, reached 124 F; riding window Oct–Apr) and the Coachella Valley
  Independent (April 2026: ride early or late in summer). Each route cites the one it
  uses and carries that URL in `sources`. "Roughly May to October" is the span those three
  bound; no page prints that phrase.
- **Start coordinates.** Two routes carry lat/lon from rides.json's geocode of the same
  address (Hwy 74 → the Sunday Climbers' Starbucks, 33.7206/-116.3913; Gerald Ford loop →
  Tri-A-Bike, 33.7226/-116.3826). The other seven are null: no scout fetched a geocoder.
  Town centre 33.8303, -116.5453 is the brief's, unconfirmed.
- **Dropped:** Blackbook (address, phone and hours all from press; its own site refuses
  crawlers — the Amigo Room covers "late"). GranFondoGuide (timed out three times; the
  century keeps the organizer, RideWithGPS 933811 and Velo). The eat scout's "rolling
  hills, nothing steep" line went with it.
- **Kept with the caveat in the note:** Taqueria Tlaquepaque (hours from a Tripadvisor
  listing with Sept 2026 reviews, own site never loaded), Starbucks (two listings
  disagree on hours; `hours_hint: null`), Main Street Coffee (Tri-A-Bike still calls it
  Old Town Coffee), The Best Bookstore (hours conflict; "call first"), Streetbar (city
  listing, `bar` not `queer-owned`).
- **Never linked:** pdbikenbrews.com (gambling site). The shop is pdbikesnbrew.com.
- `major_airport` null (Ontario not measured or confirmed). `official_url` null (the
  city's pages 403'd). `population`, `elevation_ft` null.
- Big Wheel's Palm Desert store is in the rent list only, as the shop scout filed it.

## What's null and why

- `hotels[].bike_policy` ×6 — no hotel page says a word about a guest's bike; the page
  prints "ask when you book" itself.
- `hotels[].price_hint` ×6 — no rate loaded on any booking engine.
- `routes[].start.lat/lon` ×7 — no geocoder page fetched.
- `routes[].elevation_gain_ft` on CV Link, Midcentury, Gerald Ford, Park Blvd, Geology
  Tour Rd — not on the cited pages.
- `routes[].water` on Hwy 74, Midcentury, Gerald Ford, Box Canyon — no page names a stop.
- `coffee[3].hours_hint` (Starbucks) — listings disagree, none the store's own.
- `bike_shops[6].address` (ACME) — mobile, no storefront.
- `bike_share` — none in the valley per any page.

## Verifier (Oct 4, 2026)

0 fails. Warnings: the nulls above; "Iconic" (Iconic Atomic, a shop name, in the Uptown
note); 403 bot walls on lulupalmsprings.com, hyatt.com, palmspringsca.gov (swim center),
aa.com ×2, storeopeninghours.com, tripadvisor.com ×3 — each read by a scout this week, kept.
Redirects noted: theshopsat1345.com → www; delta.com ×2 → Delta's "sorry server" (the
logistics scout read the pages Oct 4; re-fetch before shipping if it still bounces).

## Unresolved for @town-verifier / the next run

- The `rideLine` guard above.
- Starbucks 73030 El Paseo hours (call the store). Tri-A-Bike winter hours after Oct 19.
  Big Wheel Palm Springs winter hours. Tour-weekend rental minimums for Feb 6, 2027.
- The Tramway's own rule on bikes at the toll gate (pstramway.com visit page).
- Palm Mountain Resort (155 S Belardo, on the Tour's under-a-mile list) never loaded; the
  likeliest mid-price pick nearest the start. Drift Palm Springs needs one fetch for an
  address.
- Routes: the club's Hwy 74 RWGPS 54218049, Velo's embedded routes (54166521 Modernism,
  54166527 century) for maps; Indian Canyons (bikes past the gate?); CV Link 2026
  construction status (coachellavalleylink.com/updates).
- DBC `lgbtq`: ask the club. Great Outdoors: a 2026 Palm Springs bike outing.
- The nine held-back DBC rides (community.md, Rejected) are ready to merge if the
  per-host cap is lifted; then the Coffee Bean note gets its token.
- `/rides/ca/palm-desert/` is new; `hubs.json` shows `guide: null` for it until the rides
  build runs after this guide lands (towns.js matches Palm Desert via `covers[]`).
