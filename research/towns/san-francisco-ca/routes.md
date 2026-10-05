# routes — san-francisco-ca

@route-scout · 2026-10-03 · first run (no earlier report, no `data/towns/san-francisco-ca.json` yet)

Eight routes, spread across the five riding zones in the brief. Every pick has a route
page I fetched today. Start addresses and lat/lon are null throughout: none of the route
pages give a street address or coordinates, and I didn't fetch the start places' own pages.

## 1. Findings

```json
[
  {
    "name": "Golden Gate Bridge and the Marin Headlands (Hawk Hill)",
    "type": "road",
    "miles": 28,
    "elevation_gain_ft": 2400,
    "surface": "Paved: city streets and the Embarcadero, the bridge's shared sidewalk, and the Headlands roads. About two-thirds of Hawk Hill has a bike lane (PJAMM).",
    "difficulty": "moderate",
    "start": {
      "name": "Near the San Francisco Caltrain station",
      "address": null,
      "lat": null,
      "lon": null
    },
    "description": "Out along the Embarcadero, across the Golden Gate Bridge, a clockwise lap of the Marin Headlands and back: 28 miles and about 2,400 feet, per the RideWithGPS page. The climb is Hawk Hill, Conzelman Road from the lot at the north end of the bridge: 1.8 miles and 538 feet at 5.8 percent (PJAMM). For the first day, the Presidio Trust publishes a short version, an 8-mile loop from Crissy Field up to the bridge and Vista Point and back on the Bay Trail and the Presidio Promenade. {ride:san-francisco-ca-fat-cake-club-tuesday-headlands-arsicault|Fat Cake's Headlands and Arsicault ride} leaves the south end of the bridge.",
    "water": "Round House Café by the bridge Welcome Center; public restrooms at Vista Point, the north end of the bridge (Presidio Trust).",
    "hazards": "On the bridge you share a sidewalk with people walking. Which side bikes use changes by day, hour and season: on weekdays until 3:30 p.m. it is the east side; after that and on weekends, check the bridge's own table. 15 mph on the sidewalk, 5 mph around the towers, and yield to people walking (Golden Gate Bridge district). Past the top of Hawk Hill, Conzelman drops at up to 18 percent (PJAMM).",
    "links": {
      "rwgps": "https://ridewithgps.com/routes/2145313",
      "strava": null,
      "komoot": null,
      "gpx": null,
      "other": "https://pjammcycling.com/climb/2357.Hawk-Hill"
    },
    "sources": [
      "https://ridewithgps.com/routes/2145313",
      "https://pjammcycling.com/climb/2357.Hawk-Hill",
      "https://presidio.gov/explore/itineraries/getting-to-the-golden-gate-bridge-by-bike",
      "https://www.goldengate.org/bridge/visiting-the-bridge/bikes-pedestrians/"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Sunset Dunes (the old Upper Great Highway)",
    "type": "path",
    "miles": 4,
    "elevation_gain_ft": null,
    "surface": "A former highway along Ocean Beach, closed to cars: 2 miles of old road (KQED), with entrances from Lincoln Way to Sloat Blvd (the park's own page).",
    "difficulty": "easy",
    "start": {
      "name": "Lincoln Way entrance, the north end (or any cross street down to Sloat Blvd)",
      "address": null,
      "lat": null,
      "lon": null
    },
    "description": "The Upper Great Highway beside Ocean Beach, closed to cars and opened as a park, Sunset Dunes, in April 2025 (KQED). Two miles of old road by the sand; end to end and back is about 4 miles, the course the SF Bicycle Coalition used for its family ride. This is the ride for the evening you land: no cars, and you can turn around whenever you want. Its future came up again in 2026: KQED reported a citizen initiative gathering signatures to let cars back on weekdays, so check the park's page before you plan around it.",
    "water": "Water fountains by the side path next to the restrooms at Judah and Taraval; restrooms at Sloat Blvd too, open during the day (the park's own page).",
    "hazards": "The streets in from the Sunset (Kirkham, Ortega, Vicente, Sloat) are signed bike routes with no physical protection; Lincoln Way has a separated bike lane (the park's own page). You share the park with people walking and skating.",
    "links": {
      "rwgps": null,
      "strava": null,
      "komoot": null,
      "gpx": null,
      "other": "https://sunsetdunes.org/visit"
    },
    "sources": [
      "https://sunsetdunes.org/visit",
      "https://sfbike.org/event/sunset-dunes-family-ride/",
      "https://www.kqed.org/news/12079238/one-year-of-san-franciscos-controversial-beachside-park"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "The Tiburon loop (Different Spokes' Jersey Ride)",
    "type": "road",
    "miles": 48,
    "elevation_gain_ft": 2250,
    "surface": "Paved: city streets, the bridge's shared sidewalk, Marin roads and the Corte Madera-Larkspur path (club pages).",
    "difficulty": "hard",
    "start": {
      "name": "Peet's Coffee, 16th and Market, the Castro",
      "address": null,
      "lat": null,
      "lon": null
    },
    "description": "The route of {ride:san-francisco-ca-different-spokes-jersey-ride|Different Spokes' Jersey Ride}, the club ride of San Francisco's LGBTQ+ cycling club: from the Castro across the Golden Gate Bridge to Sausalito, a small climb over Camino Alto, then out and around the Tiburon peninsula on Paradise Drive. 48 miles and 2,253 feet, per the club. Guests are welcome; there's no sweep, but the club regroups for slower riders. The Short and Sassy version, 24 miles and about 1,050 feet, leaves Mike's Bikes in Sausalito, skips the bridge, and meets the long group for lunch in Tiburon.",
    "water": "Woodlands Market in Tiburon, the lunch stop on the club's ride pages.",
    "hazards": "The bridge, which the club's own page calls a mosh pit: you share the sidewalk with people walking, the side bikes use changes by day and hour, 15 mph on the sidewalk and 5 mph at the towers (Golden Gate Bridge district). The club cancels for heavy rain.",
    "links": {
      "rwgps": "https://ridewithgps.com/routes/53843226",
      "strava": null,
      "komoot": null,
      "gpx": null,
      "other": "https://www.dssf.org/content.aspx?page_id=22&club_id=17789&module_id=336753"
    },
    "ride_slug": "san-francisco-ca-different-spokes-jersey-ride",
    "sources": [
      "https://www.dssf.org/content.aspx?page_id=22&club_id=17789&module_id=336753",
      "https://www.dssf.org/content.aspx?page_id=4002&club_id=17789&item_id=2992657",
      "https://dssf.org/content.aspx?page_id=4091&club_id=17789&item_id=2864261",
      "https://www.dssf.org/content.aspx?page_id=4091&club_id=17789&item_id=2527581",
      "https://www.goldengate.org/bridge/visiting-the-bridge/bikes-pedestrians/"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Marin Headlands dirt loop",
    "type": "gravel",
    "miles": 18,
    "elevation_gain_ft": 2650,
    "surface": "Mixed: pavement, fire road and singletrack. The page doesn't give the dirt miles.",
    "difficulty": "hard",
    "start": {
      "name": "Golden Gate Bridge plaza, San Francisco",
      "address": null,
      "lat": null,
      "lon": null
    },
    "description": "RideWithGPS's ambassador route for the Headlands off the pavement: over the bridge, up Conzelman Road, then fire road and singletrack. The climbs are the Miwok Trail, at nearly 10 percent, and Marincello Road, a steady 9; the descents are technical singletrack on Old Springs Trail and the Coastal Trail. 18 miles and about 2,650 feet.",
    "water": "None named on the route page. It says to carry food and water.",
    "hazards": "Loose gravel in the turns on Bobcat Trail; waterbars across lower Old Springs Trail; walk your bike through the Miwok Livery Stables; much of the loop has no phone signal (route page). On the bridge, 15 mph on the sidewalk, 5 mph at the towers, and yield to people walking (Golden Gate Bridge district).",
    "links": {
      "rwgps": "https://ridewithgps.com/routes/9573159",
      "strava": null,
      "komoot": null,
      "gpx": null,
      "other": "https://ridewithgps.com/ambassador_routes/466-marin-headlands-loop?lang=en"
    },
    "sources": [
      "https://ridewithgps.com/ambassador_routes/466-marin-headlands-loop?lang=en",
      "https://ridewithgps.com/routes/9573159",
      "https://www.goldengate.org/bridge/visiting-the-bridge/bikes-pedestrians/"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Mt. Tam from Fairfax: Alpine Dam, the Seven Sisters and East Peak",
    "type": "climb",
    "miles": 38,
    "elevation_gain_ft": 4400,
    "surface": "Paved, with broken pavement in places (Jay's Essential Bike Rides) and potholes on the first stretch of Fairfax-Bolinas Road (PJAMM).",
    "difficulty": "hard",
    "start": {
      "name": "The public lot in the median of Fairfax's main street",
      "address": null,
      "lat": null,
      "lon": null
    },
    "description": "Jay's Essential Bike Rides' loop up Mt. Tamalpais: Fairfax-Bolinas Road over to Alpine Dam, the climb past the dam to West Ridgecrest Boulevard and its 9 percent rollers, the Seven Sisters, a spur out to East Peak, then down Pantoll Road and Panoramic Highway and back to Fairfax through Mill Valley, Larkspur, San Anselmo and Ross. 38 miles and 4,400 feet. The climb alone, Alpine Dam to West Peak, is 7.9 miles and 2,053 feet at 4.5 percent, 9.6 at its steepest (PJAMM).",
    "water": "East Peak: restrooms, water and a visitor center (Jay's page). Nothing between Alpine Dam and the top (PJAMM).",
    "hazards": "Broken pavement and launch ramps on the descents, and strong ocean wind along Ridgecrest (Jay's page). The same page says Fairfax-Bolinas Road is often under construction and signed closed; check before you go. It also says to wait for a day when the bay is clear of fog.",
    "links": {
      "rwgps": null,
      "strava": null,
      "komoot": null,
      "gpx": null,
      "other": "https://bestrides.org/mt-tamalpais/"
    },
    "sources": [
      "https://bestrides.org/mt-tamalpais/",
      "https://pjammcycling.com/climb/350.Mt.%20Tam%20via%20Alpine%20Dam"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "San Francisco to Point Reyes Station",
    "type": "road",
    "miles": 72,
    "elevation_gain_ft": 4800,
    "surface": null,
    "difficulty": "hard",
    "start": {
      "name": "San Francisco",
      "address": null,
      "lat": null,
      "lon": null
    },
    "description": "The long day: out to Sausalito and Mill Valley, Shoreline Highway over to Muir Beach and Stinson Beach, Highway 1 up to Olema and Point Reyes Station, then back by Nicasio, Fairfax, San Anselmo and Ross. 72 miles and about 4,800 feet, per the RideWithGPS page; its description stops after Ross, so check the last miles on the map. A one-way version, 70 miles and about 3,600 feet from Embarcadero BART, comes home on the Larkspur ferry (RideWithGPS). {ride:fairfax-ca-marin-cyclists-fairfax-to-point-reyes-station|Marin Cyclists' ride from Fairfax to Point Reyes Station} does the inland half with a group.",
    "water": null,
    "hazards": "The route page says nothing about traffic or shoulders on Shoreline Highway or Highway 1. On the bridge: shared sidewalk, the side bikes use changes by day and hour, 15 mph, 5 mph at the towers, yield to people walking (Golden Gate Bridge district).",
    "links": {
      "rwgps": "https://ridewithgps.com/routes/8476160?lang=en",
      "strava": null,
      "komoot": null,
      "gpx": null,
      "other": null
    },
    "sources": [
      "https://ridewithgps.com/routes/8476160?lang=en",
      "https://ridewithgps.com/routes/28865102?lang=en",
      "https://www.goldengate.org/bridge/visiting-the-bridge/bikes-pedestrians/"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Old La Honda and Kings Mountain (Woodside)",
    "type": "road",
    "miles": 19,
    "elevation_gain_ft": 2600,
    "surface": "Paved, narrow; the upper pavement on Old La Honda is bad (RideWithGPS note).",
    "difficulty": "hard",
    "start": {
      "name": "Woodside town center, the main intersection",
      "address": null,
      "lat": null,
      "lon": null
    },
    "description": "The Peninsula's benchmark climb in a short loop: from Woodside by Whiskey Hill and Sand Hill roads to Old La Honda Road, almost exactly three miles at a touch under 8 percent with short pitches up to about 14, north on Skyline, and down Kings Mountain Road. 19 miles and 2,600 feet (Bay Area Rides; the page dates from 2010). A 28-mile, 3,200-foot version from Menlo Park climbs Kings Mountain and comes down Old La Honda (RideWithGPS).",
    "water": "Alice's Restaurant and a general store at Skyline and Route 84 (Bay Area Rides).",
    "hazards": "Kings Mountain Road is narrow and very twisty, and the descent is fast. Skyline has fast drivers and little shoulder. Old La Honda is very narrow, with bad pavement near the top (Bay Area Rides; RideWithGPS).",
    "links": {
      "rwgps": "https://ridewithgps.com/routes/469253",
      "strava": null,
      "komoot": null,
      "gpx": null,
      "other": "https://www.bayarearides.com/rides/oldlahonda2/"
    },
    "sources": [
      "https://www.bayarearides.com/rides/oldlahonda2/",
      "https://ridewithgps.com/routes/469253"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Grizzly Peak and Redwood Road (Berkeley hills)",
    "type": "road",
    "miles": 44,
    "elevation_gain_ft": 4500,
    "surface": "Paved; the corners on Pinehurst Road are often gravelly.",
    "difficulty": "hard",
    "start": {
      "name": "Spruce St and Grizzly Peak Blvd, Berkeley",
      "address": null,
      "lat": null,
      "lon": null
    },
    "description": "The East Bay hills loop from Jay's Essential Bike Rides (updated September 2026): Grizzly Peak Boulevard along the ridge, Skyline, Pinehurst Road and Redwood Road, then down Claremont Avenue. About 44 miles and 4,510 feet. The Three Bears Loop, the other East Bay classic, is 38 miles and about 3,250 feet from Berkeley on its RideWithGPS page.",
    "water": "Restrooms and water at Sibley Volcanic Regional Preserve, on Skyline 100 feet south of the Grizzly Peak intersection (Jay's page).",
    "hazards": "Traffic on the residential stretch of Grizzly Peak is dangerous; Pinehurst's corners are sharp and often gravelly; Claremont Avenue comes down at 10 percent for 2 miles, curvy and very fast (Jay's page).",
    "links": {
      "rwgps": null,
      "strava": null,
      "komoot": null,
      "gpx": null,
      "other": "https://bestrides.org/grizzly-peak-to-redwood-road/"
    },
    "sources": [
      "https://bestrides.org/grizzly-peak-to-redwood-road/",
      "https://ridewithgps.com/routes/20947168?lang=en"
    ],
    "verified": "2026-10-03"
  }
]
```

## 2. Why these

- **Golden Gate Bridge and the Marin Headlands** (zone 1, the signature): the ride every visitor names first, the bridge and Hawk Hill, and it starts in the city. The Presidio Trust's 8-mile Crissy Field loop sits inside it as the first-day version. Hand-offs: the Presidio page names Sports Basement (its parking lot is the start) and Lyft Bike for rentals, a lead for @shop-scout; Round House Café by the Welcome Center is a lead for @coffee-scout. Riders here for Cycle to Zero (2026 started at Fort Baker, per the brief) or the Recovery Ride (Sausalito) can use it as the shakeout on the same side of the bridge.
- **Sunset Dunes** (zone 3, the easy one): car-free, flat, by the ocean, reachable by Muni (the park's page lists the N Judah and L Taraval). The ride for the jet-lagged first evening, and the brief asked for the park's 2026 name and status.
- **The Tiburon loop** (zone 1, the group-ride route): the club publishes the route, so a rider can join the ride or do the loop alone; it's the Paradise Drive loop locals ride anyway. `ride_slug` set. Hand-offs: the start is Peet's at 16th and Market (already a known café start); Mike's Bikes Sausalito is the Short and Sassy start, a lead for @shop-scout; Woodlands Market in Tiburon is the lunch stop, a lead for @eat-scout or @coffee-scout.
- **Marin Headlands dirt loop** (zone 1, the gravel): the dirt version of the Headlands, from the bridge, with the trails named and the hazards spelled out by RideWithGPS's own ambassador.
- **Mt. Tam from Fairfax** (zone 2, the climb): the proper Tam climb the brief asks for, by Alpine Dam and the Seven Sisters, with water at the top. Calendar hand-off: the Marin Century (Aug 7, 2027, confirmed, Marin Cyclists, Novato) has a 94-mile distance it names "Mt. Tam"; I didn't check that route's roads.
- **San Francisco to Point Reyes Station** (zone 2, the long one): the brief's "classic long day". It also carries the ferry-home version, which the brief wants as the ride-home option. Ties to the Marin Cyclists Saturday ride, already in the directory.
- **Old La Honda and Kings Mountain** (zone 4, the Peninsula): the Peninsula's best-known climb in a 19-mile loop. The editor should link the Palo Alto rides hub (`/rides/ca/palo-alto/`) here and not re-list rides. Alice's Restaurant at Skyline and 84 is a lead for @eat-scout.
- **Grizzly Peak and Redwood Road** (zone 5, the East Bay): the ridge ride over Berkeley, with real water and an honest hazard list on a page updated last month. Calendar hand-off: the Grizzly Peak Century (May 2, 2027, projected, Grizzly Peak Cyclists, Moraga); I didn't check whether its route uses these roads.

## 3. Rejected

- **Presidio Trust's 8-mile Crissy Field to the bridge loop**, as its own route: good official page, but it's the first and last miles of the signature ride. Folded into that route's description to keep eight routes across five zones.
- **Komoot "Hawk Hill via Golden Gate Park, Presidio, and Golden Gate Bridge loop"** (smarttour e806610077): the page I fetched described a 27.8-mile Crissy Field loop that didn't match its own title and called the Headlands a "state park". Machine-written text; not used.
- **RideWithGPS 3983888, "Golden Gate Bridge to Point Reyes and Back"** (66 miles, about 4,200 feet): the description breaks off mid-sentence and I couldn't tell its roads. Took 8476160, which names its towns.
- **Three Bears Loop, RideWithGPS 20947168**, as its own route: the page gives 38 miles, 3,241 feet and "Berkeley", but no start spot and no roads. Named in the Grizzly Peak entry instead.
- **Blazing Saddles' self-guided Headlands loop**: a rental company's tour page, 18 miles and no other numbers. Left for @shop-scout as a rental lead.
- **RideWithGPS San Francisco region page**: loads empty without scripts; no routes readable.
- **Wikipedia's Sunset Dunes page**: read for leads only. It gives hours of 5 a.m. to midnight; not used, because the city's page didn't load.
- **A 2023 reader comment on Jay's Grizzly Peak page** about bike-jackings along the route: a comment isn't a source of record, so it's not in the hazards line. @logistics-scout may want to look for an official source on bike theft in the East Bay hills.
- **Tourism blogs on biking the bridge** (sftourismtips, inside-guide-to-san-francisco-tourism, workhardtravelwell, bucketlistjourney): used the bridge district's own page instead.
- **Komoot Old La Honda and Kings Mountain loop from Palo Alto, MapMyRide Woodside loop, RideWithGPS 8188729 and 747754**: not fetched. The Woodside loop plus 469253 cover it, and Palo Alto has its own hub.

## 4. Couldn't confirm

- **RideWithGPS maps the pages link to.** The fetch tool refused these (a permission prompt timed out); the pages themselves aren't known to be dead. The verifier should fetch them:
  - Different Spokes' classic Jersey Ride map `https://ridewithgps.com/routes/53843226` (on the Aug 8, 2026 event page; I put it in `links.rwgps` because the club prints it, but I didn't load it). The standing Jersey Ride page links an older map, `https://ridewithgps.com/routes/1599856`, and the May 2025 event page links `https://ridewithgps.com/routes/30909606`. Short and Sassy: `https://ridewithgps.com/routes/38713687`.
  - Jay's Mt. Tam loop embeds RideWithGPS route 37952333; his Grizzly Peak loop embeds 37929927. If those load, they belong in `links.rwgps` for those two routes.
  - The SF Bicycle Coalition's Sunset Dunes family-ride map, `https://ridewithgps.com/routes/50427179`.
- **The Jersey Ride start.** The standing Jersey Ride page (and `rides.json`) say Peet's at 16th and Market. The Aug 8, 2026 event page says Jane Warner Plaza, Castro and Market. The two are a block apart. The editor should check the Oct 10, 2026 event page on dssf.org before shipping.
- **Sunset Dunes status and hours.** sfrecpark.org returned 403 on both its Sunset Dunes pages. KQED (April 11, 2026, updated Sept 16, 2026) reported a signature drive to put weekday cars back before voters "in November". I couldn't confirm whether a measure is on the Nov 3, 2026 ballot, or what it does if it passes. **The editor must resolve this before the guide ships.** The SF Department of Elections' November 2026 measures list or Rec and Park's page are the places to look. Hours are null for the same reason.
- **Golden Gate Bridge table.** The fetch summary of the bridge's page showed bikes on "East & West sidewalks" on weekends in daylight time, and the west sidewalk only on weekends in standard time. The hazards lines only claim weekday daytime on the east side and send riders to the bridge's own table. @logistics-scout should copy the table from the page directly. Standard time starts Nov 1, 2026.
- **Mt. Diablo.** Valley Spokesmen's route, RideWithGPS 52792445 (24.3 miles, 3,400 feet, per `rides.json`), is the obvious East Bay climb. The fetch was refused, and it would have been a ninth route anyway.
- **Marin Cyclists' Fairfax to Point Reyes Station page** (38 miles, 2,360 feet, per `rides.json`): the fetch was refused. If the club's event page has a RideWithGPS route, it's a cleaner long-day source from Fairfax than 8476160.
- **Strava segments.** Hawk Hill (229781) and Old La Honda (8109834) were refused. The climb numbers here come from PJAMM and Bay Area Rides.
- **Golden Gate Park's JFK Promenade and the Lake Merced loop.** No route page found within the search budget.
- **Fat Cake's rides page** (fatcake.cc/rides): refused. It may publish route links for the Headlands ride.
- **Point Reyes route surface and water**: the RideWithGPS page gives neither. Both are null.
- **Start addresses and lat/lon** for all eight: null. The Peet's address (2257 Market St) is in `rides.json` from the directory's own check, if the editor wants it there.
- **Search ran out.** I used all 8 WebSearch calls. Several pages linked from fetched pages were refused by the fetch tool, which is why the club maps above are unconfirmed.

## 5. Sources

https://ridewithgps.com/routes/2145313
https://pjammcycling.com/climb/2357.Hawk-Hill
https://presidio.gov/explore/itineraries/getting-to-the-golden-gate-bridge-by-bike
https://www.goldengate.org/bridge/visiting-the-bridge/bikes-pedestrians/
https://sunsetdunes.org/visit
https://sunsetdunes.org/events
https://sfbike.org/event/sunset-dunes-family-ride/
https://www.kqed.org/news/12079238/one-year-of-san-franciscos-controversial-beachside-park
https://en.wikipedia.org/wiki/Sunset_Dunes
https://www.dssf.org/content.aspx?page_id=22&club_id=17789&module_id=336753
https://www.dssf.org/content.aspx?page_id=4002&club_id=17789&item_id=2992657
https://dssf.org/content.aspx?page_id=4091&club_id=17789&item_id=2864261
https://www.dssf.org/content.aspx?page_id=4091&club_id=17789&item_id=2527581
https://ridewithgps.com/ambassador_routes/466-marin-headlands-loop?lang=en
https://ridewithgps.com/routes/9573159
https://bestrides.org/mt-tamalpais/
https://pjammcycling.com/climb/350.Mt.%20Tam%20via%20Alpine%20Dam
https://ridewithgps.com/routes/8476160?lang=en
https://ridewithgps.com/routes/28865102?lang=en
https://ridewithgps.com/routes/3983888
https://ridewithgps.com/regions/north_america/us/17-san-francisco-california-usa?lang=en
https://www.bayarearides.com/rides/oldlahonda2/
https://ridewithgps.com/routes/469253
https://bestrides.org/grizzly-peak-to-redwood-road/
https://ridewithgps.com/routes/20947168?lang=en
https://www.komoot.com/smarttour/e806610077/hawk-hill-via-golden-gate-park-presidio-and-golden-gate-bridge-loop-san-francisco
https://www.blazingsaddles.com/san-francisco/routes-and-tours/marin-headlands

Local files read: `cfc-site/rides/rides.json` (Bay Area rides, slugs), `data/calendar-2027.json` (Marin Century, Grizzly Peak Century).
