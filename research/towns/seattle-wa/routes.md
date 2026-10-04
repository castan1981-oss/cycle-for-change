# seattle-wa · route-scout · 2026-10-03

A refresh: `data/towns/seattle-wa.json` had no `routes[]`, so this is the
first set. Eight routes, two in each of the brief's riding zones (trails
north and east; Lake Washington; the Eastside hills and the Snoqualmie
Valley; the water side). Every route has a public route page fetched this
run: two Cascade Bicycle Club RideWithGPS ambassador routes, a King County
trail page, and Cascade's own ride pages, which publish the start, miles,
feet and the route map. Unknown is null.

What's thin: no start has a fetched lat/lon, so every `lat`/`lon` is null
and no distance from downtown is given. Most start addresses come from
Cascade's ride pages, not the place's own page. RideWithGPS route pages
linked from cascade.org would not open from this session (the fetch
permission timed out); the RideWithGPS pages linked from RideWithGPS's own
ambassador pages did. The WebSearch cap (8) was used in full; search never
failed.

## Findings

```json
[
  {
    "name": "Lake Washington loop",
    "type": "road",
    "miles": 50,
    "elevation_gain_ft": 1900,
    "surface": "A mix of trail and road, per Cascade's route page.",
    "difficulty": "hard",
    "start": { "name": "South Bellevue Park and Ride, off Bellevue Way, Bellevue", "address": null, "lat": null, "lon": null },
    "description": "The lap of the lake: counter-clockwise from Bellevue, north through Kirkland and Kenmore, down the Seattle shore past Seward Park, and back through Renton. 50 miles and about 1,900 feet, per Cascade Bicycle Club's RideWithGPS ambassador route. No steep climbs; most of the climbing is in the first half, on the Eastside. It's a loop, so from Seattle you can join it on the lakeshore, at Seward Park for one. Some of it is hard to follow, the club says, so study the map first.",
    "water": "Stops the club's page names: Log Boom Park in Kenmore, Seward Park in Seattle and Gene Coulon Park in Renton. It doesn't say which have water.",
    "hazards": "From the club's page: the downtown Bellevue stretch may be safer on the sidewalk, depending on the time of day. Seattle's roads are in poor shape. Cross the railroad tracks in Renton at 90 degrees. Check the University of Washington section before you go; construction there has meant detours. Don't leave valuables in your car at the South Bellevue lot.",
    "links": { "rwgps": "https://ridewithgps.com/routes/10708345", "strava": null, "komoot": null, "gpx": null, "other": "https://ridewithgps.com/ambassador_routes/548-full-lake-loop-from-south-bellevue-p-r?lang=en" },
    "sources": [
      "https://ridewithgps.com/ambassador_routes/548-full-lake-loop-from-south-bellevue-p-r?lang=en",
      "https://ridewithgps.com/routes/10708345"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "The Burke-Gilman Trail",
    "type": "path",
    "miles": 19,
    "elevation_gain_ft": null,
    "surface": "Paved, with a soft-surface shoulder, except an on-road stretch in Ballard.",
    "difficulty": "easy",
    "start": { "name": "Gas Works Park, one of the access points King County names", "address": null, "lat": null, "lon": null },
    "description": "Seattle's rail-trail, one of the first in the country, per Cascade. It runs from Golden Gardens and Shilshole Bay past the Ballard Locks, Fremont, Gas Works Park, the University of Washington and Magnuson Park to Bothell, where it meets the Sammamish River Trail. About 19 miles, per Cascade; King County says more than 20. This is the ride for the evening you land: no cars, turn around whenever you want. If you're in town for the STP, it runs past the start on the UW campus.",
    "water": null,
    "hazards": "It's shared with everyone on foot: all non-motorized uses are allowed, King County says. In Ballard the trail leaves the path for a stretch on the road.",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://kingcounty.gov/en/dept/dnrp/nature-recreation/parks-recreation/king-county-parks/trails/leafline-trails/burke-gilman" },
    "sources": [
      "https://kingcounty.gov/en/dept/dnrp/nature-recreation/parks-recreation/king-county-parks/trails/leafline-trails/burke-gilman",
      "https://cascade.org/resources/where-ride/trails-bicyclists"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "North Lake Washington trail loop (Burke-Gilman, Sammamish River, 520)",
    "type": "path",
    "miles": 35,
    "elevation_gain_ft": 1100,
    "surface": "Mostly paved trail, with about 3 miles on roads with traffic, per the club.",
    "difficulty": "moderate",
    "start": { "name": "Log Boom Park, Kenmore", "address": "17415 61st Ave NE, Kenmore, WA 98028", "lat": null, "lon": null },
    "description": "The north end of the lake almost all on trail: the Burke-Gilman to Bothell, the Sammamish River Trail to Redmond, and the SR 520 Trail back over the 520 bridge to Montlake. 35 miles and about 1,100 feet, per Cascade's ride page; the club's ride started at Log Boom Park in Kenmore, with restrooms at the start and along the way. It's a loop, so start where you're staying. Seattle Bike Blog rode a 32-mile version from UW Station, on the light rail, that uses the Eastrail and the Cross Kirkland Corridor on the east side; that version has about 7.5 miles of hard-packed gravel.",
    "water": null,
    "hazards": "About 3 miles are on roads with traffic, per the club. On the Seattle Bike Blog's Eastrail version, the blog named the Eastrail crossing at 132nd Ave NE and the stretch of 108th Ave NE near South Kirkland Park and Ride as the weak spots (July 2023).",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://cascade.org/rides-events/82922" },
    "sources": [
      "https://cascade.org/rides-events/82922",
      "https://www.seattlebikeblog.com/2023/07/10/biking-the-new-north-lake-washington-trail-loop/"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Mercer Island loop",
    "type": "road",
    "miles": 17,
    "elevation_gain_ft": 1000,
    "surface": "Paved road and trail.",
    "difficulty": "moderate",
    "start": { "name": "South Bellevue Park and Ride, off Bellevue Way, Bellevue", "address": null, "lat": null, "lon": null },
    "description": "Across the I-90 bridge to Mercer Island, a clockwise lap of the island, and back on the Mountains to Sound Greenway trail. 17 miles and about 1,000 feet, per Cascade's RideWithGPS ambassador route (the route page itself says 16.5 miles). Rolling, with one real climb and descent. The club calls the island roads low-traffic, with few turns and a good shoulder. Lid Park, on the I-90 lid, has bathrooms and the view.",
    "water": "On the route, per the club's points of interest: a QFC grocery and a Starbucks on the island, the Roanoke Inn & Tavern, and bathrooms at Lid Park.",
    "hazards": "Stop signs on the island are patrolled; come to a full stop, the club says. Where the trail meets a road, check for cars. Don't leave valuables in your car at the South Bellevue lot; the club says it has no cameras.",
    "links": { "rwgps": "https://ridewithgps.com/routes/10318567", "strava": null, "komoot": null, "gpx": null, "other": "https://ridewithgps.com/ambassador_routes/511-south-bellevue-mercer-island-loop" },
    "sources": [
      "https://ridewithgps.com/ambassador_routes/511-south-bellevue-mercer-island-loop",
      "https://ridewithgps.com/routes/10318567"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Zoo Hill (Cougar Mountain)",
    "type": "climb",
    "miles": 9,
    "elevation_gain_ft": 1450,
    "surface": "Paved road.",
    "difficulty": "hard",
    "start": { "name": "Lewis Creek Park, upper parking lot, Bellevue", "address": "5808 Lakemont Blvd SE, Bellevue, WA 98006", "lat": null, "lon": null },
    "description": "The Eastside's climb: Cascade built a ride around Cougar Mountain's Zoo Hill, a 9-mile loop from Lewis Creek Park with about 1,450 feet of climbing. The grade runs from 3 to 18 percent, mostly 8 to 13, and there's no flat: in the club's words, \"you're either going up, or down.\" If you have more in you, the club adds Newport to 164th or the Lakemont hill after. The ride page is from 2018; the hill hasn't moved.",
    "water": "Lewis Creek Park at the start (water and bathrooms, per the club).",
    "hazards": null,
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://cascade.org/rides-events/44024" },
    "sources": [
      "https://cascade.org/rides-events/44024"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Snoqualmie Valley Trail gravel loop from Carnation",
    "type": "gravel",
    "miles": 38,
    "elevation_gain_ft": 1200,
    "surface": "About 19 miles of gravel trail, the rest paved road. The club asks for tires of at least 28mm.",
    "difficulty": "moderate",
    "start": { "name": "Tolt MacDonald Park, Carnation", "address": "31020 NE 40th St, Carnation, WA 98014", "lat": null, "lon": null },
    "description": "Cascade's gravel ride in the Snoqualmie Valley: south on the Snoqualmie Valley Trail to North Bend, paved roads to the Snoqualmie Falls viewpoint, back on the trail to Fall City, then paved roads home to Carnation. 38 miles and about 1,200 feet, about half of it gravel, per the club (Sept 2023). Cascade calls the trail an easy first gravel ride, with farmland and river views. On the club's rides, full fenders are required when the roads are wet.",
    "water": "Restrooms and water at the Snoqualmie Falls viewpoint, about mile 23; restrooms at the start (club page).",
    "hazards": null,
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://cascade.org/rides-events/82167" },
    "sources": [
      "https://cascade.org/rides-events/82167",
      "https://cascade.org/resources/where-ride/trails-bicyclists"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Bainbridge Island by ferry (the Chilly Hilly course)",
    "type": "road",
    "miles": 33,
    "elevation_gain_ft": 2150,
    "surface": "Paved public roads.",
    "difficulty": "moderate",
    "start": { "name": "Colman Dock, the Seattle ferry terminal", "address": "801 Alaskan Way, Seattle, WA 98104", "lat": null, "lon": null },
    "description": "Roll onto the Bainbridge ferry at Colman Dock on the downtown waterfront and ride the Chilly Hilly course: a 33-mile loop of the island along the shore with the Seattle skyline behind you, through forested back roads, and up and down the hills it's named for. About 2,150 feet, per Cascade's 2026 event page; a RideWithGPS copy of the course says 32.8 miles and 2,290 feet. It's the course of Cascade's February season opener, and the club has led it as a midsummer ride too. Return ferries run on the regular Washington State Ferries schedule.",
    "water": "Battle Point Park, about mile 14 (restrooms and water, per Cascade's midsummer ride page). Restrooms on the ferry.",
    "hazards": "All public roads, open to traffic. On event day, traffic officers work the highway crossings; on your own, nobody does. In February, Cascade's page says to wear layers and be ready for rain.",
    "links": { "rwgps": "https://ridewithgps.com/routes/741387", "strava": null, "komoot": null, "gpx": null, "other": "https://cascade.org/rides-events/chilly-hilly-2026" },
    "sources": [
      "https://cascade.org/rides-events/chilly-hilly-2026",
      "https://cascade.org/rides-events/81550",
      "https://ridewithgps.com/routes/741387"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "West Seattle loop (Lincoln Park and Alki)",
    "type": "road",
    "miles": 12,
    "elevation_gain_ft": 450,
    "surface": "Road and trail, with half a mile of crushed-rock trail that road bikes handle fine, per the club.",
    "difficulty": "easy",
    "start": { "name": "Seacrest Pier, West Seattle", "address": "1660 Harbor Ave SW, Seattle, WA 98126", "lat": null, "lon": null },
    "description": "Cascade's 12-mile clockwise loop of West Seattle from Seacrest Pier, past Lincoln Park and along Alki. The first half climbs; the second half is mostly flat by the water. About 450 feet, per the club. Restrooms at Seacrest Park, start and finish. Cascade also leads a ride that crosses Elliott Bay to West Seattle on the West Seattle Water Taxi from Pioneer Square; the boat has a limited number of bike racks.",
    "water": null,
    "hazards": null,
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://cascade.org/rides-events/83393" },
    "sources": [
      "https://cascade.org/rides-events/83393",
      "https://cascade.org/rides-events/87939"
    ],
    "verified": "2026-10-03"
  }
]
```

## Why these

- **Lake Washington loop** is the signature ride and the long one. It's the route Cascade's own ambassador page calls one of the area's classics, it runs through both Seattle and the Eastside, and it has hazards in writing. At 50 miles it grades hard. The start is a park and ride, not a café.
- **The Burke-Gilman Trail** is the easy one, and the STP rider's trail: it passes the UW campus where the STP starts (`/events/seattle-to-portland/`). Miles are Cascade's (18.8, rounded); King County says "more than 20 miles". By the rule the club's number wins, and 19 miles of path is easy. Elevation is null because neither page gives it; the editor may want the tile to say flat only if a source does.
- **North Lake Washington trail loop** covers the brief's Zone 1 (Burke-Gilman, Sammamish River Trail, the 520 Trail) in one ride that's almost all trail. Numbers are the club's; the Seattle Bike Blog version is there for the rider who wants to start at UW Station.
- **Mercer Island loop** is the short Lake Washington ride with the clearest hazard line on any page this run (patrolled stop signs). Hand-off for @shop-scout: **Veloce Velo Bike Shop** is on the route, in the club's points of interest. Hand-off for @eat-scout: the **Roanoke Inn & Tavern** is too.
- **Zoo Hill** is the climb, Zone 3. "Hard" because the grade is mostly 8 to 13 percent, over the rule's 6. The start is a city park with water and bathrooms, not a café. The Cascade page is a 2018 ride; the numbers are the club's, not a Strava segment's.
- **Snoqualmie Valley Trail gravel loop** is the gravel ride, Zone 3. Cascade's page gives the miles of gravel (about 19) and a tire width, which is what a visitor needs to decide what to bring. Hand-off for @logistics-scout: Cascade's ride pages require full fenders on wet roads (this ride) or recommend them (the West Seattle loop). That's a source for the brief's fender question.
- **Bainbridge Island by ferry** is the ferry-and-island day the brief asks for, Zone 4. It is the course of **Chilly Hilly** (`data/calendar-2027.json` id 18, slug `chilly-hilly`, projected); the editor can link the calendar row. Ferry fares and bike boarding belong to @logistics-scout; the 2023 fare on Cascade's midsummer page is stale and isn't used.
- **West Seattle loop** is the second water-side ride, and the short one with views: Lincoln Park and Alki. 12 miles and 450 feet grades easy by the rule, though the first half climbs. Seacrest Pier is a pier, not a café.

**Group-ride route:** none of the Seattle-area rides in `cfc-site/rides/rides.json` publishes a fixed route. Mello Fellos posts each Saturday's route on its Strava club shortly before the ride; FRUMPS, Eastside Tours, the Issaquah Social and Good Weather change route every week; Critical Mass picks it on the night. So no route carries a `ride_slug`. The brief wants a Saturday group ride; that's the town page's "Group rides around Seattle" list, not a route.

Hand-offs for @community-scout, @shop-scout and @coffee-scout: **Cascade Bicycle Studio** (180 North Canal Street, Seattle, WA 98103, in Fremont) publishes eight loops that start at the shop, including its "classic Wednesday group ride", the **Magnolia Loop** (20.28 mi, 1,241 ft). That ride isn't in `rides.json`. The shop's route links are Strava routes, which need a login, so none could be cited here (see Rejected). Also, FRUMPS started at **Matthews Beach Park** on the Burke-Gilman on Oct 2, per rides.json; it moves every week.

Events on these routes, for the editor: Chilly Hilly (Bainbridge course, above). Flying Wheels Summer Century (id 135, Redmond) and Tour de Cure Pacific Northwest (id 114, Bothell Landing) start near the north loop and the Burke-Gilman, but their courses weren't fetched, so they're not tied to a route here.

## Rejected

- **Cascade Bicycle Studio's eight loops** (Magnolia Loop 20.28 mi / 1,241 ft; Short Magnolia 11.78 / 567; The 610 + Mercer 33.76 / 1,860; Thrilla 55.2 / 3,345, mixed surface with the Tolt Pipeline trail; Vashon Island Ferry Loop 37.15 / 3,601; Burke-Gilman to Redmond 54.58 / 2,368; Edmonds & Back 26.69 / 2,189; Seattle–Bainbridge–Kingston–Edmonds 62.49 / 3,594). The page is real and the numbers are the shop's, but every route link is a Strava route (login), so none can be the cited route page. Same call the LA run made on Helen's Cycles. A Vashon loop and a 60-mile day are in this list if the shop moves them to RideWithGPS.
- **RideWithGPS 51117899 "Lake Washington Loop"** (48.2 mi, 2,086 ft, "Seattle, WA"). No author, start or road list on the page. The Cascade ambassador route is the club's and has the hazards.
- **RideWithGPS 29642861 "North Lake Washington Loop - 520"** (37.4 mi, 1,101 ft) and **40426734 "North Lake Washington Loop"** (26.7 mi, 1,162 ft). No owner or description on either page. Cascade's ride page was used.
- **Gravel Snoqualmie Valley Trail from Sixty Acres** (Cascade, April 13, 2025; 15200 NE 116th St, Redmond; 56 mi, 2,256 ft; Sammamish River, PSE, Redmond Watershed, Tolt Pipeline, Redmond Ridge, Snoqualmie Valley, Preston-Snoqualmie, Issaquah-Snoqualmie and Sammamish Lake trails; restrooms and food at miles 7, 22, 33, 42 and 49). A good longer gravel day with named stops. Left out only to hold eight routes. The page gives no gravel mileage. The editor can swap it in for the Carnation loop.
- **Cascade's Bike Transit: West Seattle Water Taxi ride** (Oct 11, 2025; 5 mi, 91 ft, from Pioneer Square Habitat Beach). Too short to stand alone; folded into the West Seattle loop's description.
- **Cascade "Gravel Ride--Duvall-Tolt Pipeline-Lake Joy-Carnation"** (cascade.org/node/41379). 404.
- **The STP course.** It's the event page's (`/events/seattle-to-portland/`), not a ride from town.
- **Strava segments for Zoo Hill.** No segment URL came up in search, and the budget went to route pages. Bike Forums, RoadBikeReview and the "cycling in seattle" blogspot post on the Zoo were leads only, not fetched.
- **Komoot** (lake washington loop bellevue; Chilly Hilly loop; Magnuson Park to Mercer Island; Edmonds–Lake Forest Park loop) and the **RideWithGPS Seattle region page** (fetched; it returned no route list). Club pages were preferred where both existed.
- **WTA, TrailLink, Rails to Trails Conservancy, Wikipedia, Mountains to Sound Greenway Trust** for the Burke-Gilman. Not route sources; King County's page is.
- **Lonely Planet, Do206 "Best Bike Rides in Seattle", The Bicycle Fixer events page**: guide and listing pages, names only, not fetched.

## Couldn't confirm

- **Lat/lon for every start.** No fetched page gave coordinates. Where to look: each place's own page (Bellevue Parks for Lewis Creek Park; King County Parks for Tolt MacDonald Park; Seattle Parks for Gas Works Park and Seacrest Park; Kenmore for Log Boom Park; WSF for Colman Dock), or the first track point of each RideWithGPS route.
- **Start addresses from the place's own page.** Log Boom Park, Lewis Creek Park, Tolt MacDonald Park, Seacrest Pier and Colman Dock addresses are as Cascade's ride pages print them. South Bellevue Park and Ride and Gas Works Park have no address on any fetched page. Where to look: the pages above, and Sound Transit's South Bellevue Station page for the lot. Whether all-day parking there still works for a ride wasn't checked.
- **The RideWithGPS routes Cascade's ride pages link.** They wouldn't open from this session (the fetch permission timed out): Zoo Hill https://ridewithgps.com/routes/27125593, North Lake loop https://ridewithgps.com/routes/42243392, SVT gravel https://ridewithgps.com/routes/44397889, West Seattle https://ridewithgps.com/routes/45644229, Water Taxi https://ridewithgps.com/routes/52856214, Sixty Acres https://ridewithgps.com/routes/50240972, Chilly Hilly midsummer https://ridewithgps.com/routes/40715993, and Seattle Bike Blog's North loop https://ridewithgps.com/routes/43630246. The verifier should open each one and fill `links.rwgps`.
- **The Burke-Gilman "Missing Link" in Ballard.** King County says there's an on-road segment there; SDOT's project page (seattle.gov/transportation, Burke-Gilman Trail Missing Link) wouldn't open, so the 2026 status of the gap, and what the road stretch is like, isn't here.
- **Zoo Hill's climb on its own** (length, average grade from a Strava segment), traffic on the road and what the descent is like. Where to look: a Strava segment search for "Zoo" / "Cougar Mountain", or a recent Cascade Eastside ride page.
- **Water on the Burke-Gilman, the Lake loop, the North loop and the West Seattle loop.** The pages name parks and restrooms, not fountains. Where to look: Seattle Parks and King County Parks pages for Gas Works, Matthews Beach, Log Boom, Seward and Seacrest Parks.
- **Snoqualmie Valley Trail closures in 2026.** King County's trail page wasn't fetched. Where to look: King County Parks, Snoqualmie Valley Trail page and its alerts.
- **Ferry fares and bike boarding** (Seattle–Bainbridge, and the West Seattle Water Taxi). Belongs to @logistics-scout; WSF and King County Metro pages.
- **How current the Cascade ride pages are.** They're past rides (2018 Zoo Hill, Sept 2023 Carnation gravel, Jan 2024 North loop, March 2024 West Seattle, Aug 2023 Chilly Hilly midsummer). The routes are public; the pages don't promise the ride runs again. The ambassador pages carry no date.
- **seattlebiketours.org "Gasworks – North Lake Washington Loop – 42 Miles" (PDF)**: robots.txt timed out. A Gas Works start would suit a visitor; worth one more try.

## Sources

- https://ridewithgps.com/ambassador_routes/548-full-lake-loop-from-south-bellevue-p-r?lang=en
- https://ridewithgps.com/routes/10708345
- https://ridewithgps.com/ambassador_routes/511-south-bellevue-mercer-island-loop
- https://ridewithgps.com/routes/10318567
- https://ridewithgps.com/routes/741387
- https://ridewithgps.com/routes/51117899
- https://ridewithgps.com/routes/29642861
- https://ridewithgps.com/routes/40426734?lang=en
- https://ridewithgps.com/regions/north_america/us/3-seattle-washington-usa?lang=en
- https://kingcounty.gov/en/dept/dnrp/nature-recreation/parks-recreation/king-county-parks/trails/leafline-trails/burke-gilman
- https://cascade.org/resources/where-ride/trails-bicyclists
- https://cascade.org/rides-events/82922
- https://cascade.org/rides-events/44024
- https://cascade.org/rides-events/82167
- https://cascade.org/rides-events/86374
- https://cascade.org/rides-events/chilly-hilly-2026
- https://cascade.org/rides-events/81550
- https://cascade.org/rides-events/83393
- https://cascade.org/rides-events/87939
- https://www.seattlebikeblog.com/2023/07/10/biking-the-new-north-lake-washington-trail-loop/
- https://www.cascadebicyclestudio.com/local-loops-seattle

Tried and could not open: https://ridewithgps.com/routes/43630246 · https://ridewithgps.com/routes/27125593 · https://ridewithgps.com/routes/44397889 · https://ridewithgps.com/routes/45644229 · https://ridewithgps.com/routes/42243392 · https://www.seattle.gov/transportation/projects-and-programs/programs/bike-program/burke-gilman-trail-missing-link · https://www.seattlebiketours.org/members/maps/north_lake_wash.pdf · https://cascade.org/node/41379 (404)
