# Start pins, tier A, part 2 — Oct 19, 2026

Eight listed rides with `geo_precision: "city"`. Batch: `2026-10-19-tier-a-pins-part-2.json` (six entries; dry run passes). Pins come only from a start the host states on its own page, geocoded with Nominatim and checked against the record's city pin.

## In the batch

- `philadelphia-pa-vino-velo-saturday-ride` — the ride's Strava club page says "Leaving Lloyd's Hall on Boathouse Row at 9:05 on Saturdays"; QCW's Area Rides page says "Leaves at 9:00 AM from Lloyd Hall". No date on either. Pin: Lloyd Hall Recreation Center, 39.96896, -75.18522 (OSM). Outcome: changed, pin only; `checked_on` stays 2026-10-02. Sources: https://www.strava.com/clubs/1567535 · https://qcwcycling.org/arearides
- `punta-gorda-fl-caloosa-riders-tuesday-gravel-nights` — ClubExpress events for Tue Oct 20 and Oct 27, 2026, 5:15 PM, "Cecil Webb Wildlife Mgt Area, Babcock Webb Wildlife Management Area, Punta Gorda, FL 33982"; the club's gravel page gives directions to "Cecil Webb WMA - Tuckers Corner" and says the $3 permit is paid at the kiosk at the entrance. The WMA itself is a 16 × 21 km polygon (its centroid is nowhere a car can go), so the pin is the entrance at the east end of Tuckers Grade, just east of I-75: 26.85825, -81.97505 (OSM road geometry). Outcome: changed, confirmed at source; `checked_on` 2026-10-19. `start_location.name` now says "entrance off Tuckers Grade". Sources: https://crbc.clubexpress.com/content.aspx?page_id=4091&club_id=787276&item_id=3081667 · https://crbc.clubexpress.com/content.aspx?page_id=22&club_id=787276&module_id=644634
- `santa-monica-ca-la-grange-amalfi-loops` — rides page: "6:30AM @ 26th and San Vicente Blvd. in Santa Monica"; Amalfi page: "Thursday, 6:30AM departs from 26th St. and San Vicente Blvd." Squarespace page dates Jan 30 and Feb 6, 2026; no calendar, no events JSON. Pin: Blue Bottle Coffee on San Vicente, 34.04830, -118.49118 (OSM; the 26th Street ways end either side of San Vicente at 34.04826, -118.49179, 55 m away). Outcome: changed, pin only; `checked_on` stays 2026-10-01. Sources: https://www.lagrange.org/rides · https://www.lagrange.org/riviera
- `santa-monica-ca-la-grange-marina-ride` — Marina page: "Tuesday Varsity, 6:30 AM departs from 26th St. and San Vicente Blvd. in Santa Monica (@ Blue Bottle Coffee)". Page dated June 2025. Same pin as Amalfi. Outcome: changed, pin only; `checked_on` stays 2026-10-01. Sources: https://www.lagrange.org/rides · https://www.lagrange.org/marina-tues
- `chico-ca-saturday-fast-road-ride-october-to-february` — North Rim's Chico rides table: "Every Saturday 9:00 AM … Runs October to February. One Mile Recreation Area". No date on the page. Pin: Sycamore Pool (the One-Mile pool), Peterson Memorial Way, 39.73538, -121.82999 (OSM; Nominatim finds no "One Mile Recreation Area" by name, but "One Mile, Chico" resolves to the pool). Outcome: changed, pin only; `checked_on` stays 2026-10-01. Source: https://www.northrimadventure.com/articles/chico-area-rides-and-events-pg37.htm
- `durango-co-church-of-the-high-pines` — Pedal Durango's ICS: Sun Oct 25, 2026, 10:00 am, "Bread, 42 County Rd 250, Durango, CO, 81301"; Nov 1 through March at 11 am from "Home Depot South Lot, 1301 S Camino Del Rio". The record already carries `start_times` for the Nov 1 flip to 11:00. Pin: Bread's address, 37.29830, -107.84815 (OSM house node 42 CR 250; the bakery node is 25 m off). Outcome: changed, confirmed at source; `checked_on` 2026-10-19. `start_location.name` now carries the winter lot's address. Source: https://pedaldurango.com/events/list/?ical=1
  - Note for the winter: from Nov 1 to March the real start is the Home Depot south lot, 37.22442, -107.85959 (OSM), 8 km south of the pin. The schedule, `start_location.name` and `visitor_notes` all say so; the pin can't flip by date.

## Stated start, not in the batch

- `fort-collins-co-the-oval` — host page: "Bring your A-game to the Southwest corner of the CSU Oval right in front of the Statistics Building", with a "Start map" link whose Google Maps pin resolves to 40.57564, -105.08189. But the page still says "Status: DONE FOR THE 2025/2026 SEASON" (updated 03/27/2026) and the record is `seasonal-break`; `rides-apply.js` turns any `changed` entry on a seasonal-break ride into `active` (line 131), so a pin-only entry would wrongly put it back on the lists. Left for the re-check that catches the host's November status change: use lat 40.57564, lng -105.08189, geo_precision "start" then. Source: https://yourgroupride.com/the-oval/

## No stated start

- `grand-junction-co-cyclepaths-group-rides` — member-led Meetup rides with a different start each time; the ICS feed's LOCATION field is empty on every upcoming event (Meetup hides it until you RSVP), and the group page names no fixed meeting spot. No single start exists to pin. A person could join the Meetup group to see each ride's start. Source: https://www.meetup.com/gj-cyclepaths/events/ical/

## Nominatim hits used

| slug | lat | lng | display_name |
|---|---|---|---|
| philadelphia-pa-vino-velo-saturday-ride | 39.96896 | -75.18522 | Lloyd Hall Recreation Center, 1, Schuylkill River Trail, Fairmount, North Philadelphia, Philadelphia, PA 19130 |
| punta-gorda-fl-caloosa-riders-tuesday-gravel-nights | 26.85825 | -81.97505 | east end of "Tuckers Grade, South Punta Gorda Heights, Charlotte County, FL 33955" (way 85635669, polygon_geojson), at the WMA boundary |
| santa-monica-ca-la-grange-amalfi-loops | 34.04830 | -118.49118 | Blue Bottle Coffee, West San Vicente Boulevard, Brentwood, Los Angeles, CA 90403 (node 2329493333) |
| santa-monica-ca-la-grange-marina-ride | 34.04830 | -118.49118 | same node |
| chico-ca-saturday-fast-road-ride-october-to-february | 39.73538 | -121.82999 | Sycamore Pool, Peterson Memorial Way, Chico, Butte County, CA 95928 (way 954114989) |
| durango-co-church-of-the-high-pines | 37.29830 | -107.84815 | 42, CR 250, Durango, La Plata County, CO 81301 (node 7255948400) |
| fort-collins-co-the-oval (report only) | 40.57564 | -105.08189 | the host's own Google Maps pin (goo.gl/maps/7pcRmY5zP7r7nhyy9 → 40°34'32.4"N 105°04'54.3"W) |

Blocked: the Caloosa gravel page's own maps.app.goo.gl link served a Google interstitial with no redirect, and WebFetch could not follow it; the entrance pin comes from OSM road data instead.
