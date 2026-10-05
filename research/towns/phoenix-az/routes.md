# phoenix-az · route-scout · 2026-10-03

Eight routes across five of the brief's six zones: South Mountain, Scottsdale
and the northeast (two), the East Valley, the paths (two), and dirt (two).
Every route has a public route page that was fetched this run. No gravel
route made it: nothing published and fetchable turned up (see "Couldn't
confirm").

How this run went: the session's search budget was 8 WebSearch calls, and all
8 were used. The fetch tool would only open URLs that came out of a search
result, so pages named in `rides.json` (McDowell Mountain Cycles, Regroup)
could not be opened directly. No Strava segment page was fetched; the South
Mountain climb numbers come from PJAMM's climb page.

Start addresses and lat/lon are null on every route. No start had its own page
fetched, and two pages disagree on one park's address (see "Couldn't
confirm"). With no start coordinates, no distance from downtown Phoenix
(33.4484, -112.0740) is given.

Heat is in every hazard line. The numbers used: summer highs average 104 to
106 F (PJAMM). On Extreme Heat Warning days the City of Phoenix closes named
preserve trails 8 a.m. to 5 p.m. (city heat page, approved March 27, 2025).
It counted 45 closure days between May 1 and Oct 13, 2024. In 2026 the
closures started March 19, after the earliest 100-degree day on record
(azfamily, March 17, 2026).

## Findings

```json
[
  {
    "name": "Rio Verde – Fountain Hills loop",
    "type": "road",
    "miles": 50,
    "elevation_gain_ft": 2750,
    "surface": "Road. The route page names Pima, Dynamite, Rio Verde, Saguaro and Shea; it doesn't describe the surface.",
    "difficulty": "hard",
    "start": { "name": "Safeway at DC Ranch, Scottsdale", "address": null, "lat": null, "lon": null },
    "description": "The loop around the north and east side of the McDowell Mountains. From the Safeway at DC Ranch it goes up Pima to Dynamite, over the hill to Rio Verde, then left on Saguaro all the way to Shea, per the route page. That's 50 miles and about 2,750 feet. The page's note stops at Shea, so check the map for the way back. You can also start in Fountain Hills: a 48-mile, 2,529-foot RideWithGPS loop through the same three towns starts there. The Tour de Scottsdale's 54-mile route also goes around the McDowells through Scottsdale, Rio Verde and Fountain Hills.",
    "water": "The Safeway at DC Ranch, at the start and finish. The route page names nothing in between.",
    "hazards": "The route page names no hazards. Heat, May to October: summer highs average 104 to 106 F (PJAMM). That's 50 miles with no water stop on the page, so start at first light and carry all your water.",
    "links": { "rwgps": "https://ridewithgps.com/routes/50221588", "strava": null, "komoot": null, "gpx": null, "other": null },
    "sources": [
      "https://ridewithgps.com/routes/50221588",
      "https://ridewithgps.com/routes/10851307",
      "https://www.tourdescottsdale.org/Race/TourdeScottsdale/Page-1",
      "https://pjammcycling.com/climb/1812.South-Mountain"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "South Mountain, Summit Road to the towers",
    "type": "climb",
    "miles": 7,
    "elevation_gain_ft": 1350,
    "surface": "Paved park road. PJAMM calls it adequate and says it's cracked in many places from heat.",
    "difficulty": "moderate",
    "start": { "name": "The ranger station at the bottom of Summit Road, South Mountain Park/Preserve", "address": null, "lat": null, "lon": null },
    "description": "The city's climb: Summit Road from the ranger station to the radio towers at the top. PJAMM measures 7 miles and 1,330 feet at 3.2 percent. The road dips on the way up; without those bits it's 4.8 percent, and the steepest quarter-mile is 8.9 percent. Dobbins Lookout, at 2,330 feet, is the highest point in the park open to the public (City of Phoenix). Every Sunday, cars are stopped at the 1.0 mile marker from 5 to 10 a.m. On the 4th Sunday of the month the road is closed to cars all day, 5 a.m. to 7 p.m., and drivers park at the Activity Complex. The park's entrance and parking hours are 5 a.m. to 7 p.m.",
    "water": null,
    "hazards": "PJAMM: minimal shoulder most of the way, blind corners with nowhere to bail out on the descent, and a hole or two to watch for on the way down. Outside the Silent Sunday hours cars use the road; PJAMM calls traffic minimal. Heat, May to October: summer highs average 104 to 106 F (PJAMM). On Extreme Heat Warning days the city closes the Holbert, Mormon and Hau'pal Loop trails, and the National Trail from Pima Canyon, 8 a.m. to 5 p.m. The list doesn't name Summit Road. No city page names a water stop on the climb, so bring all of it.",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://pjammcycling.com/climb/1812.South-Mountain" },
    "ride_slug": "phoenix-az-city-of-phoenix-silent-sunday-south-mountain",
    "sources": [
      "https://pjammcycling.com/climb/1812.South-Mountain",
      "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/south-mountain-parkpreserve.html",
      "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/heat-safety.html",
      "https://www.azfamily.com/2026/05/11/phoenix-extends-trail-closures-into-tuesday-triple-digit-heat-continues/"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Usery Loop and Salt River",
    "type": "road",
    "miles": 27,
    "elevation_gain_ft": 1500,
    "surface": "Paved road. The author says it has a good shoulder for the most part.",
    "difficulty": "moderate",
    "start": { "name": "Thomas Rd and Power Rd, Mesa (the Walgreens on the corner)", "address": null, "lat": null, "lon": null },
    "description": "East Side Cycling's RideWithGPS ambassador route through the East Valley's best desert. North on Power Rd past Red Mountain, down the steep hill locals call Kong, and along the Salt River. Then up Little Kong, about a mile at 5 to 6 percent, and 4 miles at a steady 5 to 6 percent over Usery Pass. It finishes with a descent to McDowell Rd and a short climb up Hawes through Las Sendas. That's 27 miles and about 1,500 feet. A side trip goes out to the Cliffs just below Saguaro Lake. The author says people have parked behind the Walgreens at the start; ask first.",
    "water": "The only drinking water on the route is at the top of Usery, near the visitor center, after most of the climbing (East Side Cycling).",
    "hazards": "Kong is a steep downhill early in the ride. An older Bikemap route along the Salt River on Bush Highway (about 13 years old) warns that boaters use Bush Highway heavily. Heat, May to October: summer highs average 104 to 106 F (PJAMM). There's no water until the top of Usery, so start at first light and carry enough for the river and the pass.",
    "links": { "rwgps": "https://ridewithgps.com/ambassador_routes/438-usery-loop-and-salt-river?lang=en", "strava": null, "komoot": null, "gpx": null, "other": null },
    "sources": [
      "https://ridewithgps.com/ambassador_routes/438-usery-loop-and-salt-river?lang=en",
      "https://www.bikemap.net/en/r/1822978/",
      "https://pjammcycling.com/climb/1812.South-Mountain"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Gainey (the Thursday morning loop)",
    "type": "road",
    "miles": 29,
    "elevation_gain_ft": 1100,
    "surface": "Road. The route page doesn't describe the surface.",
    "difficulty": "moderate",
    "start": { "name": "Gainey Village, southeast corner of Scottsdale Rd and Doubletree Ranch Rd, Scottsdale", "address": null, "lat": null, "lon": null },
    "description": "The route of {ride:scottsdale-az-scottsdale-cycling-gainey-thursday|Scottsdale's Thursday morning group ride}, which clips in at the southeast corner of Doubletree and Scottsdale. It's 29 miles and about 1,100 feet, per the RideWithGPS page. Join the group, or ride the loop on your own any morning.",
    "water": null,
    "hazards": "The route page names no hazards. Heat, May to October: summer highs average 104 to 106 F (PJAMM). Start at first light and carry all your water.",
    "links": { "rwgps": "https://ridewithgps.com/routes/29074769", "strava": null, "komoot": null, "gpx": null, "other": null },
    "ride_slug": "scottsdale-az-scottsdale-cycling-gainey-thursday",
    "sources": [
      "https://ridewithgps.com/routes/29074769",
      "https://pjammcycling.com/climb/1812.South-Mountain"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Indian Bend Wash path (the Scottsdale Greenbelt)",
    "type": "path",
    "miles": 11,
    "elevation_gain_ft": null,
    "surface": "Concrete multiuse path (TrailLink), with more than 24 underpasses and bridges (City of Scottsdale).",
    "difficulty": "easy",
    "start": { "name": "Chaparral Park, Scottsdale (one of the path's trailheads)", "address": null, "lat": null, "lon": null },
    "description": "An 11-mile path through Scottsdale's greenbelt of parks, lakes and golf courses (City of Scottsdale). More than 24 underpasses and bridges carry it past the big streets. TrailLink measures 12 miles from Venturoso Park in Phoenix to E Curry Rd in Tempe, with trailheads at Chaparral Park and Eldorado Park in Scottsdale. This is the ride for the evening you land: almost no cross traffic, and you can turn around anywhere.",
    "water": null,
    "hazards": "TrailLink says underpasses take it under almost all road crossings, so expect a few at street level. It's shared with walkers and runners. Scottsdale's path rules: keep right and leave the left side for passing. Heat, May to October: summer highs average 104 to 106 F (PJAMM). Neither the city's page nor TrailLink names a water fountain.",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://www.traillink.com/trail/indian-bend-wash-trail" },
    "sources": [
      "https://www.scottsdaleaz.gov/outdoor-activities/paths-trails",
      "https://www.traillink.com/trail/indian-bend-wash-trail",
      "https://pjammcycling.com/climb/1812.South-Mountain"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Indian Bend Wash Greenbelt loop (to Tempe Town Lake)",
    "type": "path",
    "miles": 52,
    "elevation_gain_ft": 1000,
    "surface": "Paved throughout. About 32 of the 52 miles are bike path; about 8 are road and about 6 are state road (Komoot).",
    "difficulty": "hard",
    "start": { "name": null, "address": null, "lat": null, "lon": null },
    "description": "Komoot's 52-mile loop joins the Indian Bend Wash greenbelt to other paths and roads: past Taliesin West and Camelback Park, down to Tempe Town Lake, and on to a viewpoint over the Salt River. That's about 1,000 feet of climbing, per Komoot. Much of the way crosses streets on underpasses and overpasses. It's the long day on this list, and most of it is away from cars.",
    "water": null,
    "hazards": "About 6 miles are on a state road; Komoot doesn't say which. Heat, May to October: summer highs average 104 to 106 F (PJAMM). It's 52 miles and Komoot names no water stop, so start at first light and plan your refills before you go.",
    "links": { "rwgps": null, "strava": null, "komoot": "https://www.komoot.com/smarttour/e1352775357/indian-bend-wash-greenbelt-loop-scottsdale-arizona", "gpx": null, "other": null },
    "sources": [
      "https://www.komoot.com/smarttour/e1352775357/indian-bend-wash-greenbelt-loop-scottsdale-arizona",
      "https://pjammcycling.com/climb/1812.South-Mountain"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Trail 100 (Charles M. Christiansen Memorial Trail)",
    "type": "mtb",
    "miles": 11,
    "elevation_gain_ft": 850,
    "surface": "Singletrack: mild to moderate, with some steep, short climbs (MTB Project). Rocky, with loose pebbles (Singletracks).",
    "difficulty": "moderate",
    "start": { "name": "Dreamy Draw Park, off SR 51 at Northern Ave", "address": null, "lat": null, "lon": null },
    "description": "Phoenix's in-town mountain bike trail runs across the Phoenix Mountains Preserve. MTB Project measures 11.3 miles with 860 feet up, rated intermediate/difficult. Singletracks names the trailheads: Dreamy Draw Park (the main lot), Tatum Blvd at the east end, 7th Ave at the west end, and Mountain View Park. For shorter rides there's MTB Project's West Side Trail 100 Loop (10.9 miles, 743 feet, from the Central Ave lot in North Mountain Park) and Trailforks' 5.3-mile intermediate loop on the east side.",
    "water": null,
    "hazards": "Rocky with loose pebbles (Singletracks). The west end near the 7th St lot gets a lot of hikers (MTB Project). A Trailforks review says parts of the Fence Line trail on the east loop are hike-a-bike over boulders. Heat, May to October: summer highs average 104 to 106 F (PJAMM). On Extreme Heat Warning days the city closes the Piestewa Peak Summit Trail and associated trails 8 a.m. to 5 p.m. That list doesn't name Trail 100. No page names a place to get water, so carry it all.",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://www.mtbproject.com/directory/8011919/phoenix-mountains-preserve" },
    "ride_slug": "phoenix-az-valley-epic-rides-night-rider-trail-100",
    "sources": [
      "https://www.mtbproject.com/directory/8011919/phoenix-mountains-preserve",
      "https://www.mtbproject.com/trail/4873242/west-side-trail-100-loop",
      "https://www.mtbproject.com/trail/4881161/trail-100-west",
      "https://www.trailforks.com/route/trail-100-intermediate/",
      "https://www.singletracks.com/bike-trails/trail-100/",
      "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/heat-safety.html",
      "https://pjammcycling.com/climb/1812.South-Mountain"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "McDowell Mountain Competitive Track (Long Loop)",
    "type": "mtb",
    "miles": 8,
    "elevation_gain_ft": null,
    "surface": "Mountain bike race track, ridden one way as marked. Don't 'improve' it, per the county.",
    "difficulty": "moderate",
    "start": { "name": "Four Peaks Staging Area, McDowell Mountain Regional Park, Fountain Hills", "address": null, "lat": null, "lon": null },
    "description": "Maricopa County's 15-mile Competitive Track in McDowell Mountain Regional Park has three loops. The 7.9-mile Long Loop is 'designed for the average rider and enjoyed by all skill levels.' The 3.0-mile Sport Loop suits intermediate and advanced riders, and the 2.7-mile Technical Loop is for experts only. All three start and finish at the Four Peaks Staging Area. {ride:fountain-hills-az-mcdowell-mountain-cycles-tuesday-night-mtb|McDowell Mountain Cycles' Tuesday night ride} rides in this park.",
    "water": "Four Peaks Staging Area: water, restrooms with showers, and a bike wash rack (county map).",
    "hazards": "Ride it one way only; slower riders yield to faster ones. The Technical Loop is experts only, with steep climbs and technical descents. The county says to carry plenty of water, check conditions, and tell someone your route. Heat, May to October: summer highs average 104 to 106 F (PJAMM). Fill up at Four Peaks before every loop.",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://www.maricopacountyparks.net/assets/1/6/mcdowell-8x11-competitive-track_combined.pdf" },
    "sources": [
      "https://www.maricopacountyparks.net/assets/1/6/mcdowell-8x11-competitive-track_combined.pdf",
      "https://www.maricopacountyparks.net/park-locator/mcdowell-mountain-regional-park/park-activities/biking/",
      "https://pjammcycling.com/climb/1812.South-Mountain"
    ],
    "verified": "2026-10-03"
  }
]
```

## Why these

- **Rio Verde – Fountain Hills loop.** Zone 2, the signature ride: the loop
  the brief names first. It's the hard one on this list, at 50 miles. The
  start is a supermarket, not a café; whatever opens early at DC Ranch is a
  lead for @coffee-scout. Hand-offs: the **HonorHealth Tour de Scottsdale**
  (calendar id 42, confirmed Sat April 10, 2027) runs its 54-mile route around
  the McDowells through the same three towns. The page says its RideWithGPS
  GPX comes "closer to the event". `fountain-hills-az-mcdowell-mountain-cycles-saturday-road-ride`
  (McDowell Mountain Cycles) leaves from the shop in Fountain Hills, on this
  loop; a lead for @shop-scout. **Bike MS: Arizona** (id 476) and **Belgian
  Waffle Ride Arizona** (id 24, March 7, 2027) are in Fountain Hills or the
  McDowell area. No course for either was fetched.
- **South Mountain, Summit Road.** Zone 1, the climb. It's moderate by the
  rule (7 mi, 1,350 ft, 3.2 percent average; no sustained 6 percent). It
  belongs to `phoenix-az-city-of-phoenix-silent-sunday-south-mountain`; a
  rider can come on a car-free Sunday or any other morning. The Silent Sunday
  schedule here is the city's page, which matches the directory.
- **Usery Loop and Salt River.** Zone 3, the East Valley. It's a RideWithGPS
  ambassador route with the water fact in it. The start is a Walgreens
  corner; nothing for @coffee-scout.
- **Gainey.** Zone 2, the group-ride route. It belongs to
  `scottsdale-az-scottsdale-cycling-gainey-thursday`. The RideWithGPS route
  is the one the directory already links. Gainey Village is also where
  Scottsdale Cycling's Tuesday and Saturday rides start, and TriScottsdale
  starts at Village Tavern on the same block. Whatever pours coffee at Gainey
  Village before 5:30 a.m. is a lead for @coffee-scout. Per the brief, the
  note doesn't say whose ride it is.
- **Indian Bend Wash path.** Zone 4, the easy one. It's 11 miles one way;
  the city's figure is used over TrailLink's 12. No page gives an elevation,
  so it's null. It's graded easy because it follows a wash and Komoot's
  52-mile loop that uses it climbs only about 1,000 feet in all. For
  @community-scout: `scottsdale-az-the-bike-lane-greenbelt-and-canal-rides`
  (The Bike Lane) is a social group in the directory that rides the
  greenbelt and canals.
- **Indian Bend Wash Greenbelt loop.** Zone 4, the long one, and the answer
  to "how do I string the paths together." It's hard by the rule (52 miles)
  even though most of it is bike path; the editor may want the tile to say
  that. No road day of 60 to 100 miles was found with a fetchable page.
- **Trail 100.** Zone 5, dirt in the city. Moderate: 11 miles and 850 feet
  would be easy on a path, but singletrack isn't "path or quiet road." It
  belongs to `phoenix-az-valley-epic-rides-night-rider-trail-100`.
- **McDowell Competitive Track.** Zone 5, the destination dirt. Moderate on
  the same reasoning: under 20 miles, elevation unpublished, singletrack. The
  start has water, showers and a bike wash, which is rare. Hand-off: the
  **Specialized Cactus Cup** (id 638, projected the second weekend of March
  2027) is held in McDowell Mountain Park. Whether it uses the Competitive
  Track was not confirmed. The directory also has McDowell Mountain Cycles'
  Monday ladies' mountain bike ride from the Four Peaks lot.

## Rejected

- **Livelo's "Phoenix Cycling Routes"** (Silent Sunday 46.6 mi, Somo X2
  35.4 mi, Desert Classic Gravel Trail 14.8 mi). All three link Strava
  routes, which need a login. Not citable.
- **clippedin.bike, Silent Sunday pilot.** That pilot ran December 2018 to
  March 2019, with cars stopped until 1 p.m. The city's current page
  replaces it (5 to 10 a.m.).
- **PJAMM on Silent Sunday.** It says the all-day closure is the *last*
  Sunday; the city says the *4th*. They differ in months with five Sundays.
  The city is used.
- **City of Phoenix newsroom release, Oct 25, 2024.** It says the heat
  program covers *all* South Mountain trails. The current heat page (approved
  March 27, 2025) and the May 11, 2026 azfamily report name only four. The
  current page is used.
- **RideWithGPS 10851307, "Fountain Hills / Scottsdale / Rio Verde Loop"**
  (47.9 mi, 2,529 ft). It's the same loop with no description or road names.
  Kept as a mention in the Rio Verde note, not as its own route.
- **Bikemap "Bush Beeline Loop"** (50.6 mi). Its elevation figure (2,229 m)
  doesn't fit the length, it's about 13 years old, and its own author warns
  that the Beeline is a four-lane, mostly divided highway with very heavy
  traffic at times. Used only for the Bush Highway boater line.
- **MTB Project "Trail 100 – West"** (1.5 mi doubletrack). Too short to be a
  ride; used only for the hiker-traffic note.
- **Tour de Scottsdale routes page.** No numbers or roads yet; GPX comes
  "closer to the event."
- **Phoenix New Times, "Rolling and Climbing Along Bush Highway and Usery
  Pass."** It returned 403. **mtbikeaz.com** Trail 100 and McDowell pages:
  they got stuck in a redirect loop between http and https. Neither loaded.

## Couldn't confirm

- **A gravel route.** No published gravel route was fetched. Leads:
  McDowell Mountain Cycles' Sunday Funday gravel ride
  (`fountain-hills-az-mcdowell-mountain-cycles-sunday-funday-gravel`; the
  shop's page is mcdowellmountaincycles.com/mmc-life/), Cyclologic's Sunday
  gravel ride (start rotates, posted on Instagram), the **BWR Arizona** course
  (March 7, 2027), and **Rez Gravel** in Sacaton. Look for a RideWithGPS
  event route or a club collection.
- **Bartlett Lake Rd / Cave Creek / Carefree, Tempe Town Lake and the Rio
  Salado path, the Arizona Canal and Crosscut, Hawes trails, San Tan.** The
  search budget ran out before these. Look at the City of Phoenix, Tempe and
  Scottsdale bike-map pages and RideWithGPS club collections.
- **Regroup Coffee ride route** (`tempe-az-regroup-coffee-ride`) and the
  **McDowell Mountain Cycles Saturday road route.** The shop pages are in
  `rides.json` but couldn't be opened from a search result.
- **Start addresses and lat/lon, all eight.** None was fetched from the
  place's own page. What other pages say, for the editor or a second pass:
  - TrailLink lists Chaparral Park at 5401 N. Hayden Rd and Eldorado Park at
    2311 N. Miller Rd. The directory has El Dorado Park at **2301** N Miller
    Rd. One of them is wrong.
  - The directory has Gainey Village at 8977 N Scottsdale Rd.
  - The county's McDowell address (41835 N. Castle Hot Springs Rd,
    Morristown) is its operations center, not the trailhead.
- **Gainey, Tuesday vs Thursday.** The RideWithGPS description says "Every
  Tus and Thurs morning" with this route. The directory says the Tuesday ride
  is a different, flat Paradise Valley loop. Only the Thursday slug is linked.
  Robert can settle it.
- **Water on South Mountain, Gainey, the greenbelt and Trail 100.** No page
  names a fill-up. The South Mountain city page doesn't list fountains or
  restrooms.
- **A Strava segment for Summit Road.** PJAMM mentions one but gives no URL.
- **RideWithGPS 28230429, "NEW Hyatt Gainey Ranch – 30 miles – Hills of
  Paradise Valley."** Seen in a search result, not fetched. A lead for
  @stay-scout (a hotel that publishes rides).

## Sources

https://ridewithgps.com/routes/50221588
https://ridewithgps.com/routes/10851307
https://www.tourdescottsdale.org/Race/TourdeScottsdale/Page-1
https://pjammcycling.com/climb/1812.South-Mountain
https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/south-mountain-parkpreserve.html
https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/heat-safety.html
https://www.phoenix.gov/newsroom/parks-news/3256.html
https://www.azfamily.com/2026/05/11/phoenix-extends-trail-closures-into-tuesday-triple-digit-heat-continues/
https://www.azfamily.com/2026/03/17/several-popular-hiking-trails-close-extreme-heat-hits-phoenix-area/
https://www.clippedin.bike/silent-sunday-pilot-program-south-mountain-cyclists/
https://www.livelo.cc/pages/phoenix-cycling-routes
https://ridewithgps.com/ambassador_routes/438-usery-loop-and-salt-river?lang=en
https://www.bikemap.net/en/r/1822978/
https://ridewithgps.com/routes/29074769
https://www.scottsdaleaz.gov/outdoor-activities/paths-trails
https://www.traillink.com/trail/indian-bend-wash-trail
https://www.komoot.com/smarttour/e1352775357/indian-bend-wash-greenbelt-loop-scottsdale-arizona
https://www.mtbproject.com/directory/8011919/phoenix-mountains-preserve
https://www.mtbproject.com/trail/4873242/west-side-trail-100-loop
https://www.mtbproject.com/trail/4881161/trail-100-west
https://www.trailforks.com/route/trail-100-intermediate/
https://www.singletracks.com/bike-trails/trail-100/
https://www.maricopacountyparks.net/park-locator/mcdowell-mountain-regional-park/park-activities/biking/
https://www.maricopacountyparks.net/park-locator/mcdowell-mountain-regional-park/park-activities/trails/
https://www.maricopacountyparks.net/assets/1/6/mcdowell-8x11-competitive-track_combined.pdf
