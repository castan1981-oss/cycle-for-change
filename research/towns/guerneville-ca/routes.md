# guerneville-ca — routes

Town id: `guerneville-ca` · Agent: @route-scout · Date: 2026-11-16

First report for this town. Five picks. Every one has a public route page
fetched today. Two things to know before reading the numbers:

- **No start has a lat/lon.** None of the fetched pages prints coordinates
  or a street address for its start, so `start.lat` / `start.lon` /
  `start.address` are null throughout. The editor or verifier geocodes the
  named starts; I did not type any from memory.
- **ridewithgps.com/routes/… pages would not load in this session** (the
  ambassador page did). The Santa Rosa Cycling Club's two routes are cited
  from the club's own route pages, which carry the RideWithGPS links. The
  club pages give miles and no total climbing, so `elevation_gain_ft` is
  null on both.

## 1. Findings

```json
[
  {
    "name": "Sweetwater Springs Road loop",
    "type": "road",
    "miles": 26,
    "elevation_gain_ft": 2300,
    "surface": "paved; patchy and bumpy on the Sweetwater Springs descent along Porter Creek",
    "difficulty": "hard",
    "start": {
      "name": "Guerneville town centre (the route page suggests street parking on First Street, one block off River Road)",
      "address": null,
      "lat": null,
      "lon": null
    },
    "description": "The loop that leaves from town. North on Armstrong Woods Road, nearly flat, to the redwood reserve, then right onto Sweetwater Springs Road: narrow, twisting, almost no cars, and one hard climb. Down the far side to Westside Road and its wineries, then River Road back past Korbel and Rio Nido. Ride it clockwise; the other direction opens with a quarter mile over 16%.",
    "water": null,
    "hazards": "The climb is 2.3 miles at 8.8% with short pitches of 16% or more; the route page's author walked the worst of it. The descent after it is steep, narrow and curvy on patchy pavement. Westside Road's shoulder is 1 to 2 feet and sometimes gone. River Road back to town has heavy traffic.",
    "links": {
      "rwgps": null,
      "strava": null,
      "komoot": null,
      "gpx": "https://bayarearides.com/rides/sweetwatersprings/track.gpx",
      "other": "https://bayarearides.com/rides/sweetwatersprings"
    },
    "sources": [
      "https://bayarearides.com/rides/sweetwatersprings",
      "https://pjammcycling.com/climb/417.Sweetwater%20Springs%20Road%20west"
    ],
    "verified": "2026-11-16"
  },
  {
    "name": "King Ridge",
    "type": "road",
    "miles": 55,
    "elevation_gain_ft": null,
    "surface": "paved; old rough pavement on Austin Creek Road, mediocre to very bad on the Hauser Bridge descent, smooth on Meyers Grade",
    "difficulty": "hard",
    "start": {
      "name": "Parking lot at the north end of the Russian River bridge, Monte Rio",
      "address": null,
      "lat": null,
      "lon": null
    },
    "description": "The big one, and one of the Santa Rosa Cycling Club's Ten Great Rides. Up Austin Creek to Cazadero, onto King Ridge Road and its open ridgetop, down Hauser Bridge Road, back over Seaview and Meyers Grade to Highway 1, then Jenner, Duncans Mills and Moscow Road home. The club calls it very remote and says only fit, self-reliant riders should try it. A Fort Ross Road shortcut makes it 36 miles and it is still hilly.",
    "water": "Cazadero general store (mile 9). After that the club counts two refills in the 40 miles to Jenner: a hose bib at Ratna Ling Retreat Center (mile 28.6) and Fort Ross Elementary School (mile 32.8). Jenner has a small store and water in the park across the street. Bakery and café in Duncans Mills (about mile 51).",
    "hazards": "Hauser Bridge Road drops for a mile and ends in a 20% pitch onto a one-lane iron-grate bridge, with loose gravel, potholes and tree roots. Meyers Grade is a 16% descent to Highway 1. Cattle guards on the ridge roads. Highway 1 and River Road (Highway 116) carry real traffic, and River Road often has no shoulder. Long stretches with no services. Fog on the ridge; dress for a cold start.",
    "links": {
      "rwgps": "https://ridewithgps.com/routes/15294984",
      "strava": null,
      "komoot": null,
      "gpx": null,
      "other": "https://srcc.wildapricot.org/page-274943"
    },
    "sources": [
      "https://srcc.wildapricot.org/page-274943",
      "https://srcc.wildapricot.org/Ten-Great-Rides-&-Ride-Library",
      "https://bayarearides.com/rides/kingridge"
    ],
    "verified": "2026-11-16"
  },
  {
    "name": "Sonoma Coast",
    "type": "road",
    "miles": 34,
    "elevation_gain_ft": null,
    "surface": "paved",
    "difficulty": "hard",
    "start": {
      "name": "Centre of Occidental",
      "address": null,
      "lat": null,
      "lon": null
    },
    "description": "The coast loop, from the Santa Rosa Cycling Club's Ten Great Rides. Down the Bohemian Highway along Dutch Bill Creek to Monte Rio, Moscow Road along the river to Duncans Mills, Highway 116 to Jenner, then about 10 miles south on Highway 1. Bay Hill Road, Bodega, Joy Road and Bittner Road bring it back to Occidental. A rider staying in Guerneville can join it where it passes through Monte Rio. Bakery and coffee at the Duncans Mills bridge (about mile 10) and a coffee shop across from the Bay Hill junction (about mile 22).",
    "water": null,
    "hazards": "River Road (Highway 116) between Duncans Mills and Jenner has heavy traffic and shoulders that come and go. Highway 1 backs up on summer and holiday weekends. Bay Hill climbs about 750 feet in 1.5 miles. Joy Road has two steep climbs back to back. The Coleman Valley alternate descends steep and twisting, with cattle guards, potholes and sudden drop-offs. The Bohemian Highway descent is cold in the morning.",
    "links": {
      "rwgps": "https://ridewithgps.com/routes/15294865",
      "strava": null,
      "komoot": null,
      "gpx": null,
      "other": "https://srcc.wildapricot.org/page-274850"
    },
    "sources": [
      "https://srcc.wildapricot.org/page-274850",
      "https://srcc.wildapricot.org/Ten-Great-Rides-&-Ride-Library"
    ],
    "verified": "2026-11-16"
  },
  {
    "name": "West County Regional Trail",
    "type": "path",
    "miles": 5.5,
    "elevation_gain_ft": null,
    "surface": "bike path, mostly paved; a boardwalk north of Graton and compacted rock near Ross Station Road",
    "difficulty": "easy",
    "start": {
      "name": "Forestville trailhead, Highway 116 in downtown Forestville (parking)",
      "address": null,
      "lat": null,
      "lon": null
    },
    "description": "The easy one. A county rail-trail from downtown Forestville south through Graton to Sebastopol, 5.5 miles each way, so 11 out and back. Free parking at the Forestville, Ross Station Road and Graton Road trailheads. In Sebastopol it meets the Joe Rodota Trail, 8.5 more miles to Santa Rosa; the county counts 14 miles for the pair. Open 7 a.m. to sunset. It does not reach Guerneville: Forestville is the next town upriver.",
    "water": null,
    "hazards": "Shared with walkers, dogs and joggers. A club route that uses it warns of a dirt section and posts on the Graton stretch. If you carry on along the Joe Rodota Trail, the county says the crossings at Merced Avenue and Llano Road are unimproved and need care.",
    "links": {
      "rwgps": null,
      "strava": null,
      "komoot": null,
      "gpx": null,
      "other": "https://parks.sonomacounty.ca.gov/visit/find-a-park/west-county-regional-trail"
    },
    "sources": [
      "https://parks.sonomacounty.ca.gov/visit/find-a-park/west-county-regional-trail",
      "https://parks.sonomacounty.ca.gov/visit/find-a-park/joe-rodota-trail",
      "https://ridewithgps.com/ambassador_routes/110-howarth-to-korbel-clockwise"
    ],
    "verified": "2026-11-16"
  },
  {
    "name": "Howarth to Korbel (clockwise)",
    "type": "road",
    "miles": 48,
    "elevation_gain_ft": 1550,
    "surface": "mixed: paved roads and paved multi-use trails, with some gravel, dirt and rough pavement (rough on Old River Road)",
    "difficulty": "hard",
    "start": {
      "name": "Lower tennis court parking lot, Howarth Park, Santa Rosa (free parking)",
      "address": null,
      "lat": null,
      "lon": null
    },
    "description": "A Santa Rosa Cycling Club ride leader's loop, published as a RideWithGPS ambassador route: Santa Rosa out to the deli at Korbel, just upriver of Guerneville, and back. Out on the Santa Rosa Creek and West County trails through Graton and Forestville, then Martinelli Road and River Road. Home by Westside Road, Wohler Bridge and Eastside Road. It is the published way to link the river and Santa Rosa mostly off the main roads. Graded hard on distance alone; the steepest hill is an eighth of a mile at up to 9%.",
    "water": "Korbel Deli (coffee, sandwiches). Gas station and minimart at Occidental Road and Gravenstein Highway, with a restroom. Roasters Espresso Bar in Forestville. Portable toilet in the lot before Wohler Bridge.",
    "hazards": "River Road is busy and its shoulder collects debris. Gravel on the turn onto Eastside Road has put riders down. A sharp right onto Sunset Avenue drops straight into a descent. The trails are crowded; slow for the underpasses at Stony Point and Fulton. Heavy traffic on Guerneville Road coming back into Santa Rosa.",
    "links": {
      "rwgps": "https://ridewithgps.com/ambassador_routes/110-howarth-to-korbel-clockwise",
      "strava": null,
      "komoot": null,
      "gpx": null,
      "other": null
    },
    "sources": [
      "https://ridewithgps.com/ambassador_routes/110-howarth-to-korbel-clockwise"
    ],
    "verified": "2026-11-16"
  }
]
```

Notes on the numbers, for the editor:

- **Sweetwater Springs.** 26 miles and about 2,300 ft are the route page's.
  The climb's 2.3 miles, 1,117 ft and 8.8% are PJAMM's climb page; the
  route page calls the same climb "about 2 miles" at around 11% with a
  quarter mile over 14%. I used PJAMM for the climb (it is the climb's own
  page) and the route page for the loop. Graded hard on the sustained
  climb over 6%, not on miles. The route page is dated April 2010 with no
  update shown; road surface and parking signs may have changed.
- **King Ridge.** 55 miles is the club's number. The club gives no total
  climbing. Bay Area Rides publishes a 50-mile version from Duncans Mills
  at 4,900 ft; a different start and length, so it is not carried into
  the field. Graded hard on 45–80 miles. The club's own page uses the
  word "epic" for it; the fixed scale says hard unless the climbing
  figure for this route turns out over 6,000 ft.
- **Sonoma Coast.** 34 is from the club's library table, which prints the
  number with no unit; every other row reads as miles. Graded hard on Bay
  Hill (750 ft in 1.5 miles is over 6%).
- **West County Regional Trail.** 5.5 miles is one way, as the county
  publishes it.
- **Howarth to Korbel.** The page says 47.7 mi and 1,529 ft; rounded to
  48 and 1,550.

## 2. Why these

- **Sweetwater Springs Road loop** — the only pick that starts and ends in
  Guerneville. It covers three of the brief's zones in 26 miles (Armstrong
  Woods Road, the Westside Road wine country, River Road past Korbel and
  Rio Nido) and it has the town's climb in it. This is the Saturday ride
  for someone who wants a real morning without a car.
- **King Ridge** — the ride people name first for this corner of Sonoma
  County, and the long hard day. Starts in Monte Rio, the next town
  downriver. Water is scarce enough that the club lists the two refills
  by mile; that list is the reason to cite the club's page.
- **Sonoma Coast** — the coast, with a published loop and a hazards line
  that says what Highway 116 and Highway 1 are like. It runs through
  Monte Rio and Duncans Mills, so a Guerneville rider can pick it up
  without driving to Occidental.
- **West County Regional Trail** — the car-free one. For the people who
  drove up, a rider with tired legs on Saturday, or anyone deciding
  whether to bring the bike. Honest catch: it starts in Forestville, not
  Guerneville, and there is no published path between the two.
- **Howarth to Korbel** — the upriver zone, and the only fetched
  RideWithGPS page of the five. It is a Santa Rosa start, so it is mostly
  for a visitor based there or driving in; kept because it shows the
  trail-and-back-road line between Santa Rosa and the river, with named
  stops.

Hand-offs:

- **Starts that are cafés or shops:** none. Leads for @coffee-scout from
  the route pages, not verified by me as open: Coffee Bazaar (first block
  of Armstrong Woods Road, named on the 2010 Sweetwater page), the Korbel
  Deli (on the ambassador route and the Sweetwater page), Roasters
  Espresso Bar in Forestville, the bakery and café at the Duncans Mills
  bridge. No shop appears on any route page.
- **Weekly rides:** none of these belongs to a ride in
  `cfc-site/rides/rides.json`. The brief says no directory ride is in
  Guerneville, and I took that as read. The Santa Rosa Cycling Club
  publishes all three club routes; it is a lead for @community-scout.
- **Calendar events on a climb:** not checked. I did not open
  `data/calendar-2027.json` for King Ridge. The editor should search it
  for King Ridge, Cazadero and Jenner before linking.
- **Cycle to Zero:** none of these is an organizer route. The Day 2 route
  files are unpublished; nothing here should be presented as "Let's
  Chill" or the century.
- **Town centre:** no page I fetched gives a downtown point. The Sweetwater
  page starts riders at First Street, one block off River Road, with no
  coordinates. The brief's centre stands.

## 3. Rejected

- **Willow Creek trails (Bay Area Rides, 12 mi, 2,700 ft, singletrack and
  fire road)** — permit, orientation and a locked gate when written, and
  the page itself warns that park management changed afterwards and the
  permit program may have ended. Page from 2010–2011. Not something a
  visitor can find and follow from what is published.
- **Bay Area Rides' King Ridge Loop (50 mi, 4,900 ft, from Duncans Mills)**
  — the same ride as the club's, from a different lot. Kept the club's
  version (newer, with the water list). Used as a second source for the
  hazards only.
- **Joe Rodota Trail as its own pick** — 8.5 miles, Sebastopol to Santa
  Rosa, farther from Guerneville than the West County trail it joins.
  Folded into the West County entry's description.
- **The other eight Ten Great Rides** (Windsor Plain, Dry Creek, Sebastopol
  and Valley Ford, Alexander Valley, Valley of the Moon, Spring Hill,
  Cavedale, The Geysers) — start in Santa Rosa, Healdsburg, Sebastopol,
  Windsor, Glen Ellen, Petaluma, Sonoma and Geyserville. Other towns.
- **Gravel Cyclist's Santa Rosa–Old Caz–Willow Creek video ride (Oct
  2021)** — names the roads, publishes no miles, no climbing and no route
  file.
- **bikemap.net routes** (Guerneville Cazadero Loop, Guerneville to Bodega
  Bay Loop and others in the search results) — anonymous user uploads,
  not fetched, not a club or agency source.

## 4. Couldn't confirm

- **A gravel pick.** Two real leads, neither with a route page I could
  fetch. (a) Old Cazadero Road: PJAMM's climb page gives 3.3 miles,
  1,002 ft and 5.2% from Highway 116 in Guerneville, paved on the
  Guerneville side, dirt on the back with a ford of East Austin Creek,
  and a 2019 note that the last few hundred yards were closed to motor
  vehicles. It does not give the miles of dirt, the current state of the
  road or the ford, or a start address. Its loop is
  ridewithgps.com/routes/26849590, which would not load. (b) Komoot's
  Sonoma County gravel guide lists "Willow Creek Fire Road: loop from
  Occidental" (26.9 km, 620 m, hard) and "Westminster Woods: Monte Rio
  loop from Occidental" (59.9 km, 1,230 m, hard), with no tour links on
  the page; the individual komoot tour pages redirected and did not load.
  Where to look: the two RideWithGPS and komoot pages in a browser, and
  Sonoma Coast State Park's page for Willow Creek Road's status.
- **Armstrong Woods as a ride of its own.** parks.ca.gov and the Stewards
  of the Coast and Redwoods site were both blocked in this session. So:
  whether bikes are allowed past the entrance, on which roads, the fee,
  water, and any closure of Armstrong Redwoods or Austin Creek are all
  unconfirmed. The 2010 Sweetwater page says bikes enter free; too old to
  print. The brief asked for this check and it is not done. Nothing in
  the findings claims a park policy.
- **Total climbing for King Ridge and Sonoma Coast.** On the RideWithGPS
  pages the club links (routes 15294984 and 15294865), which would not
  load. Both fields are null until someone reads them.
- **Every start's address and lat/lon.** Not on any fetched page. Needs a
  geocoder or the county's trailhead pages: First Street in Guerneville,
  the lot at the north end of the Monte Rio bridge, the centre of
  Occidental, the Forestville trailhead on Highway 116, Howarth Park's
  lower tennis court lot.
- **A Strava segment for the Sweetwater Springs climb.** Not searched
  (shared budget). PJAMM's numbers stand in.
- **Bohemian Highway, Westside Road to Healdsburg, Highway 116 to the
  coast as stand-alone rides** (the brief's leads). Each appears inside a
  pick above; none has its own route page that I fetched.
- **Current road conditions and closures** on Highway 116, Highway 1,
  King Ridge Road and Hauser Bridge Road. Caltrans and the county roads
  page were not fetched. The hazards lines are the route pages' words,
  two of them from 2010. Re-check before May 2027, after the winter.
- **Open today:** the Cazadero general store, the Jenner store, the
  Korbel Deli, Roasters Espresso Bar, the Duncans Mills bakery, and the
  two King Ridge water points (Ratna Ling's hose bib, Fort Ross
  Elementary). All named on club or route pages with no date. A rider
  counting on the mile 28.6 and 32.8 refills needs these confirmed.

## 5. Sources

Fetched 2026-11-16:

- https://bayarearides.com/rides/sweetwatersprings
- https://bayarearides.com/rides/kingridge
- https://bayarearides.com/rides/willowcreek
- https://pjammcycling.com/climb/417.Sweetwater%20Springs%20Road%20west
- https://pjammcycling.com/climb/405.Old%20Cazadero%20Road%20Old%20Caz
- https://srcc.wildapricot.org/Ten-Great-Rides-&-Ride-Library
- https://srcc.wildapricot.org/page-274943
- https://srcc.wildapricot.org/page-274850
- https://ridewithgps.com/ambassador_routes/110-howarth-to-korbel-clockwise
- https://parks.sonomacounty.ca.gov/visit/find-a-park/west-county-regional-trail
- https://parks.sonomacounty.ca.gov/visit/find-a-park/joe-rodota-trail
- https://www.komoot.com/guide/3495233/gravel-biking-in-sonoma-county
- https://www.gravelcyclist.com/videos/riding-sonoma-county-california-on-a-gravel-bike-santa-rosa-occidental-old-caz-willow-creek-more/

Tried, did not load (not sources; listed so the next run knows):

- https://ridewithgps.com/routes/15294984 (blocked in this session)
- https://www.parks.ca.gov/?page_id=450 (blocked in this session)
- https://stewardscr.org/armstrong-redwoods-state-natural-reserve/ (blocked in this session)
- https://blog.komoot.it/guide/1947849/cycling-around-guerneville (redirected to a hub page)
- https://blog.komoot.it/smarttour/27687458/westminster-woods-willow-creek-fire-road-loop-from-monte-rio (redirected to a hub page)

Linked in the findings but not fetched (the club's page that carries each
link was fetched): https://ridewithgps.com/routes/15294984,
https://ridewithgps.com/routes/15294865
