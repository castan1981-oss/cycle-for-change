# Start pins, part 5 — Oct 19, 2026

Eight listed rides with `geo_precision: "city"`. Pin only where the host states the start in its own words. A pin fix is not a re-check: `checked_on` is the record's current `verified_on`, so the freshness clock stays put. Batch: `2026-10-19-tier-a-pins-part-5.json` (2 entries, dry run passes).

## Pinned (2)

- **suamico-wi-broken-spoke-monday-night-road-ride** — the shop's local rides page says "Monday Night Road Ride · Every Monday · 6:00 PM · B group pace averaging 18-20mph · Broken Spoke Bike Studio Suamico"; the shop's own Suamico store page gives 1580 Lineville Road, Suamico, WI 54313 and carries its map pin at 44.5920552, -88.0450006. Nominatim had no house number: three queries returned three segments of Lineville Road (44.5909, -88.0814 · 44.5909, -88.0898 · 44.5914, -88.0494, all "Lineville Road, Suamico, Brown County, Wisconsin"), spread over 3.4 km, so the pin is the host's own (44.59206, -88.04500; the 54303 Nominatim segment is 350 m from it). Outcome: changed, pin only (checked_on 2026-09-15). The page has no date on it, so the ride itself is not confirmed. Sources: https://www.brokenspokebikes.com/events/local-rides-pg206.htm · https://www.brokenspokebikes.com/about/suamico-pg213.htm
- **nashville-tn-bike-curious-sunday-ride** — Bike Curious's About page: "Bike Curious' Sunday rides on Shelby Park's riverfront greenway have become a ritual for many. The group meets every Sunday below the train trestle." No address, no time. Nominatim: "Shelby Park, Nashville, Tennessee" → 36.16917, -86.73154, "Shelby Park, Rosebank, Nashville, Davidson County, Middle Tennessee, Tennessee, United States" (the park, not the trestle). OpenStreetMap (Overpass, overpass.openstreetmap.fr): one railway bridge crosses the riverfront greenway at Shelby Park, the CSX Nashville Terminal Subdivision Radnor Cut-Off (way 53624730); the Shelby Bottoms Greenway (way 53624737) passes under it at 36.16572, -86.72580, where it meets the Shelby Park Greenway. Pin set there. Outcome: changed, pin only (checked_on 2026-09-18). Source: https://bikecurious.net/about

## No stated start (6) — no batch entry

- **toronto-ca-critical-mass** — the start moves month to month: Aug 28, 2026 Prince Edward Viaduct Parkette; Sept 25, 2026 High Park front gates (jnyyz.wordpress.com, Sept 25 post, fetched Oct 19). criticalmass.in/toronto has no description, no meeting point and "nothing known about a next ride" (fetched Oct 19). Neither blog (jnyyz.wordpress.com, twowheeledpolitics.ca, both current to Oct 17–18, 2026) has announced the Oct 30 start yet. Stays unpinned. A person could check the blogs in the last week of October.
- **chicago-il-streets-calling-bike-club-night-ride** — streetscallingbc.com (home, blog, blog feed) says nothing about any ride, day, time or start; the newest post is Nov 2, 2020. The record already says the start is posted on Instagram (@streets.calling.bc). The Strava club needs a login. Stays unpinned. For the next re-check: the host's site offers no proof of life at all; a person could check @streets.calling.bc.
- **clarksville-tn-clarksville-cycling-club-evening-rides** — the only source is the club's Facebook page, which redirects to a login wall. No other host page. Stays unpinned. A person could check facebook.com/Clarksvillecyclingclub for the start and whether the 5:30 pm rides are still running now that DST ends Nov 1.
- **emporia-ks-babes-on-bikes-wednesday-ride** — visitemporia.com (tourism board, not the host; loaded fine today, 200) says only "follow the Babes on Bikes Facebook page for updates on their weekly ride"; the Facebook page is a login wall. No host-stated start. Lead for the next re-check: the record's "700 block of Commercial St" matches nothing on the page except Visit Emporia's own office address (719 Commercial St), so the record's start may have been lifted from the tourism office, not the ride. A person could check facebook.com/BabesOnBikesEmporia.
- **indianapolis-in-bikeparty-indianapolis** — centralincycling.org's neighborhood rides table lists "BikeParty · 2nd Friday of the month · 7 pm · 8 - 12 miles · Partner Ride · Varies" (fetched Oct 19). Start varies; stays unpinned. Lead for the next re-check: the page says 7 pm where the record says rolls 7:30 pm, and it is a partner ride with no host page of its own.
- **providence-ri-providence-bike-jam** — dashbicycle.com (a shop, not the host) says "Basic ride details are always posted on instagram @pvdbikejam at least a day ahead of time"; the "more information" link is the Instagram account. Start varies by month; stays unpinned. A person could check @pvdbikejam.

## Nominatim hits used

- Suamico: Nominatim matched only the road ("Lineville Road, Suamico, Brown County, Wisconsin, 54313/54303, United States"); the pin is the host's own map point for 1580 Lineville Road, 44.59206, -88.04500.
- Nashville: Nominatim gave the park (36.16917, -86.73154, "Shelby Park, Rosebank, Nashville, Davidson County, Middle Tennessee, Tennessee, United States"); the pin is the OSM greenway/rail-bridge crossing, 36.16572, -86.72580.

## Notes

- overpass-api.de resets through the proxy and the kumi / private.coffee mirrors return 500; overpass.openstreetmap.fr works.
- No WebSearch used.
