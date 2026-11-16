# ojai-ca · route-scout · 2026-11-15

Six routes: the path, the gravel loop over Sulphur Mountain, the Highway 33
climb, the short climb east to Upper Ojai, the lake-and-coast road loop, and
a two-day dirt loop. Every pick has a public route page that was opened this
run. Unknown is null. First build; there was no earlier report.

How this run went, so the next one doesn't repeat it:

- **Ventura County Parks would not load.** Both county URLs for the trail
  (venturacounty.gov/parks-department/?p=359 and parks.venturacounty.gov/?p=655)
  came back "Request Rejected". So the trail's hours, e-bike rule and
  managing-agency facts are **not** from the agency. See Couldn't confirm.
- **RideWithGPS, Strava, TrailLink's trail page, Caltrans and the geocoder
  are off this session's fetch allowlist.** None was opened. RideWithGPS and
  Strava links below come from the pages that cite them and are marked.
- **PJAMM's Highway 33 page loaded empty** (0 mi, 0 ft). Not used.
- **Lat/lon** only where a fetched page printed one (BikeClimbs, MTB
  Project). No geocoding was done. Everything else is null.
- **Downtown point:** no city or geocoder page was opened, so no downtown
  point is proposed. The brief's centre (34.4492, -119.2467) stands.
- 5 web searches used.

## Findings

```json
[
  {
    "name": "Ojai Valley Trail",
    "type": "path",
    "miles": 9,
    "elevation_gain_ft": 500,
    "surface": "Paved bike path on an old rail line. Some stretches are bumpy and cracked from tree roots and flooding. A wood-chip horse path runs beside it behind a fence.",
    "difficulty": "easy",
    "start": { "name": "Ojai Valley Trail, Ojai end", "address": "402 Bryant St, Ojai, CA", "lat": null, "lon": null },
    "description": "The car-free path down the valley. TrailLink lists it as a 9.3-mile rail-trail from Bryant Street in Ojai to Foster Park (37 Casitas Vista Rd), where it meets the Ventura River Trail and keeps going to the coast. Ojai to Ventura is about 15 miles one way, gently downhill, so the climb is on the way home: about 500 feet from Foster Park back up to Ojai, 800 to 1,000 from Ventura. Ride out as far as you like and turn around. The miles and feet here are one way, Ojai to Foster Park.",
    "water": "Carry it. Restrooms at Libbey Park in Ojai and at Foster Park (about 5.5 miles up from the Ventura end). No fountain is named on any page read. Shops and gas stations along the route will refill a bottle (Two Wheeled Wanderer, Jan 2024).",
    "hazards": "It crosses streets in Ojai, crosses Highway 33 near Ojai, and passes the busy Highway 150 / Baldwin Road intersection. It gets crowded on weekends with walkers and e-bikes; bring a bell. Root bumps and cracks in the pavement. Ojai gets hot; go early in summer.",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://www.venturacountytrails.org/TrailMaps/OjaiBikePath/AreaHome.html" },
    "sources": [
      "https://www.traillink.com/gdbkpdf/trail/6015273/ojai-valley-trail63915996388455-2026.pdf",
      "https://www.venturacountytrails.org/TrailMaps/OjaiBikePath/AreaHome.html",
      "https://www.twowheeledwanderer.com/posts/ojai-valley-trail/",
      "https://www.komoot.com/smarttour/e1415270834/lake-casitas-loop"
    ],
    "verified": "2026-11-15"
  },
  {
    "name": "Sulphur Mountain Road loop",
    "type": "gravel",
    "miles": 30,
    "elevation_gain_ft": 2800,
    "surface": "Mixed: paved path, a short stretch of Highway 33, about 9 miles of gated dirt fire road, then paved road back. The dirt is rough in places from cattle and horses, muddy after rain and bumpy once it dries.",
    "difficulty": "moderate",
    "start": { "name": "Downtown Ojai (street parking a few blocks off Ojai Avenue)", "address": null, "lat": null, "lon": null },
    "description": "Where the gravel bikes go. Down the Ojai Valley Trail, a short stretch on Highway 33, then up Sulphur Mountain Road: a gated ranch road, closed to cars, about 9 miles and 2,100 feet at a 5% average (12% at its steepest) from about 400 feet to 2,300. It comes out on pavement in Upper Ojai and drops back to town on a switchbacked road. A gravel bike with wide tires; not a road bike. Ride it in the cooler months.",
    "water": null,
    "hazards": "Cattle on the road, sometimes standing in the middle of it; close the gates behind you. No water and little shade on the climb, so carry plenty. Hoof ruts make the dirt rough, and it is slick mud after rain. The return is a switchbacked descent on a two-lane road. The fire road is busy on weekends.",
    "links": { "rwgps": "https://ridewithgps.com/routes/38769077", "strava": null, "komoot": null, "gpx": null, "other": "https://www.twowheeledwanderer.com/posts/sulphur-mountain-trail-ojai-california/" },
    "sources": [
      "https://www.twowheeledwanderer.com/posts/sulphur-mountain-trail-ojai-california/",
      "https://mtbproject.com/trail/7062383/sulphur-mountain-fire-road",
      "https://venturacountytrails.org/TrailMaps/OjaiSulphurMtn/AreaHome.html",
      "https://www.pathlesspedaled.com/blog/2022/01/the-best-gravel-in-ojai",
      "https://www.twowheeledwanderer.com/posts/biking-in-ojai/"
    ],
    "verified": "2026-11-15"
  },
  {
    "name": "Highway 33 climb, Matilija to the top",
    "type": "climb",
    "miles": 11,
    "elevation_gain_ft": 2650,
    "surface": "Paved two-lane state highway.",
    "difficulty": "moderate",
    "start": { "name": "Highway 33 (Maricopa Highway) north of Ojai, where the climb starts", "address": "15512 Maricopa Highway, Ojai, CA 93023", "lat": 34.4855, "lon": -119.3008 },
    "description": "The climb. Highway 33 leaves the valley, runs through Wheeler Gorge and its three tunnels, and keeps going up into Los Padres National Forest. The segment is 10.8 miles and 2,625 feet at a 4.6% average, from 943 feet to 3,568. The miles and feet are one way, and the start is about 4 miles from the centre of town, so from Ojai and back it is a much bigger day than the numbers say. Turn around at the top and come down the way you went up.",
    "water": "None you can count on. The Forest Service says there is no potable water on the byway. A 2015 ride report says Wheeler Gorge Campground has no running water and that bottled water was sold at the visitor center there; that is old, so don't plan on it. Fill up in Ojai.",
    "hazards": "Three tunnels in Wheeler Gorge; a 2015 ride report says the first one curves and is disorienting inside. Rocks and gravel fall onto the road, which matters most on the way down. The road draws motorcycle groups and car clubs. Spotty or no cell service in the gorge (2015 report). No services. Wind on the descent. Los Padres National Forest listed fire danger as Very High when read on Nov 15, 2026. No road-closure page could be opened; check Caltrans for State Route 33 before you go.",
    "links": { "rwgps": null, "strava": "https://www.strava.com/segments/11812242", "komoot": null, "gpx": null, "other": "https://bikeclimbs.com/climb/united-states/california/ventura-county/ojai/hwy-33-climb---matilija-to-the-top" },
    "sources": [
      "https://bikeclimbs.com/climb/united-states/california/ventura-county/ojai/hwy-33-climb---matilija-to-the-top",
      "https://www.fs.usda.gov/r05/lospadres/recreation/jacinto-reyes-national-scenic-byway",
      "https://venturacycling.blogspot.com/2015/01/rose-valley.html",
      "https://www.rouleur.cc/en-ca/blogs/rouleur-explore/layers-of-history-riding-highway-33-to-reyes-peak"
    ],
    "verified": "2026-11-15"
  },
  {
    "name": "Upper Ojai Summit climb",
    "type": "climb",
    "miles": 6,
    "elevation_gain_ft": 800,
    "surface": "Paved two-lane road.",
    "difficulty": "moderate",
    "start": { "name": "East Ojai Avenue, east edge of town", "address": "1994 East Ojai Avenue, Ojai, CA 93023", "lat": 34.4484, "lon": -119.2201 },
    "description": "The short climb east out of town to Upper Ojai. The segment is 6.5 miles and 781 feet at a 2.3% average, 7.5% at its steepest, from 663 feet to 1,421. It starts about a mile and a half east of the centre of town. An hour's ride on a Saturday morning: up, turn around, back for coffee. Graded moderate, not easy, because it is a highway and not a quiet road.",
    "water": null,
    "hazards": "A winding two-lane road with narrow shoulders between Ojai and Santa Paula (Komoot's route notes). You share the lane with cars the whole way up and down.",
    "links": { "rwgps": null, "strava": "https://www.strava.com/segments/1727810", "komoot": null, "gpx": null, "other": "https://www.bikeclimbs.com/climb/united-states/california/ventura-county/ojai/upper-ojai-summit-climb" },
    "sources": [
      "https://www.bikeclimbs.com/climb/united-states/california/ventura-county/ojai/upper-ojai-summit-climb",
      "https://www.komoot.com/smarttour/e1415194855/loop-di-ventura-ojai"
    ],
    "verified": "2026-11-15"
  },
  {
    "name": "Lake Casitas loop",
    "type": "road",
    "miles": 48,
    "elevation_gain_ft": 2800,
    "surface": "Paved. About 27 miles of it is bike path, about 16 is state highway.",
    "difficulty": "hard",
    "start": { "name": "Ojai (the route page names the town, not a spot)", "address": null, "lat": null, "lon": null },
    "description": "The long road day from town. West on Highway 150 past Lake Casitas, down to the coast at Mussel Shoals, south along the shore past Faria County Park to Ventura, then home up the bike path. 48 miles and about 2,800 feet, topping out near 1,100 feet. More than half of it is car-free path. The climbing on the path comes last.",
    "water": "Faria County Park on the coast has restrooms and water (Komoot's notes on the neighbouring loop). Nothing else is named.",
    "hazards": "Highway 150 is busy at commute times; about 16 miles of the loop is on state highway. The bike path is crowded on weekends and has root bumps and cracks. Inland it is hot in summer; start early.",
    "links": { "rwgps": null, "strava": null, "komoot": "https://www.komoot.com/smarttour/e1415270834/lake-casitas-loop", "gpx": null, "other": null },
    "sources": [
      "https://www.komoot.com/smarttour/e1415270834/lake-casitas-loop",
      "https://www.komoot.com/guide/1937665/road-cycling-routes-around-ojai",
      "https://www.komoot.com/smarttour/e1415194855/loop-di-ventura-ojai"
    ],
    "verified": "2026-11-15"
  },
  {
    "name": "Ojai Rim Loop",
    "type": "gravel",
    "miles": 67,
    "elevation_gain_ft": 10300,
    "surface": "Mixed: 78% unpaved, 17% singletrack, the rest paved.",
    "difficulty": "epic",
    "start": { "name": "Sulphur Mountain Road trailhead, between Casitas Springs and Oak View", "address": null, "lat": 34.3778, "lon": -119.3010 },
    "description": "A two-day bikepacking loop around the rim of the valley: up Sulphur Mountain Road, up Sisar Road to Nordhoff Ridge at 6,700 feet, and back down through Meiners Oaks. 67 miles and 10,277 feet, 28 miles and 6,676 feet of it on day one. Bikepacking.com says you can leave a car overnight at the trailhead. Rideable November through May; February and March are best, when it is cooler and the creeks run. Not a Saturday ride for someone who rode 80 miles on Friday.",
    "water": "Stagecoach Store and Summit Drive-In on Highway 150, and a spigot at the Ventura County fire station just west of the drive-in. Sisar Creek usually runs at the bottom of the Sisar Road climb. Nothing sure after that until Meiners Oaks; carry 4 to 6 liters when it is dry.",
    "hazards": "Long, dry, exposed climbs; heat is the main danger. Rattlesnakes, black bears and mountain lions. No camping on Sulphur Mountain Road. Fires only in the fire rings at the Nordhoff Ridge Road campsites; check Los Padres fire restrictions first (fire danger was listed Very High on Nov 15, 2026).",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://bikepacking.com/routes/ojai-rim-loop/" },
    "sources": [
      "https://bikepacking.com/routes/ojai-rim-loop/",
      "https://mtbproject.com/trail/7062383/sulphur-mountain-fire-road",
      "https://www.fs.usda.gov/r05/lospadres/recreation/jacinto-reyes-national-scenic-byway"
    ],
    "verified": "2026-11-15"
  }
]
```

Notes on the numbers, for the editor:

- **Ojai Valley Trail.** 9 miles / 500 ft is TrailLink's (9.3 miles; "climbs
  about 500 feet" from Foster Park). Two other pages give the whole
  Ojai–Ventura path: venturacountytrails.org says about 15 miles and about
  1,000 ft up from Ventura (updated Sept 20, 2023); Two Wheeled Wanderer says
  15 miles and about 800 ft (9 Ojai Valley Trail + 6 Ventura River Trail,
  Jan 2024). **The Ojai end is described two ways:** TrailLink and Two
  Wheeled Wanderer say Bryant Street; venturacountytrails.org says it ends
  "at Highway 150, two blocks west of Gridley Road." I used Bryant Street
  (two sources, one with an address). TrailLink lists more Ojai parking at
  "1199-1075 W Ojai Ave" and "521 S Montgomery St"; Two Wheeled Wanderer
  names the Rotary Community Park lot. Foster Park charges to park.
- **Sulphur Mountain.** 30 miles / 2,820 ft is the loop table on Two Wheeled
  Wanderer (the author rode 29). The fire road alone: MTB Project 9.2 miles,
  2,080 ft up, 5% average, 12% max, 363 to 2,308 ft; venturacountytrails.org
  9.0 miles, about 2,000 ft; Pathless Pedaled "about 10 miles, about 2,500
  feet." The loop page names the return road two ways (Ojai Santa Paula Road
  in the intro, "Ojai Santa Barbara Road" in the route line), so the
  description doesn't name it. The same page lists a high point of 3,775 ft,
  which doesn't fit a road that tops out at 2,300; not used. The gate at the
  bottom is at about 34.3778, -119.3010 (MTB Project), about 6 miles
  straight-line from the centre.
- **Highway 33.** 10.81 miles, 2,625 ft, 4.6% from BikeClimbs, which links
  Strava segment 11812242. BikeClimbs shows a 30.8% maximum; that is a data
  spike, not a grade, and it is left out. The page does not say what "the
  top" is. The 2015 blog puts the Rose Valley sign at 3,400 ft, about 14
  miles from downtown, so the segment top (3,568 ft) is near there, but no
  page read says so. Don't name the top. Difficulty is "moderate" by the
  fixed rule (11 miles, under 3,000 ft, under 6%). Ridden from town and back
  it is a hard day; the description says so.
- **Upper Ojai Summit.** 6.48 miles, 781 ft, 2.3% from BikeClimbs (Strava
  segment 1727810). The brief calls this the Dennison Grade. **No page read
  uses that name**, so the route doesn't either.
- **Lake Casitas loop.** 77.3 km / 850 m on Komoot (the page's FAQ says 845
  m). It is a Komoot "smart tour": built by Komoot from its users' data, not
  posted by a club. The road list is Komoot's.
- **Distances from the centre** (34.4492, -119.2467) are straight-line, worked
  from the coordinates the pages print.

## Why these

- **Ojai Valley Trail** — the easy one. Car-free from the edge of downtown,
  downhill out and a gentle climb home. The ride for Saturday April 24 on
  tired legs, and the answer for anyone deciding whether to bring a bike.
- **Sulphur Mountain Road loop** — the gravel ride every Ojai page names
  first. Nine miles with no cars. Needs a gravel bike.
- **Highway 33 climb** — the one real road climb from town, with a segment
  page and an honest hazards line from the Forest Service and a ride report.
- **Upper Ojai Summit climb** — a short climb that starts a mile and a half
  from the centre. Fits a Saturday morning before coffee.
- **Lake Casitas loop** — the long road day, and more than half of it is
  path. For the other weekends, not the day between two 80-mile days.
- **Ojai Rim Loop** — the big dirt one, for the reader who comes back with a
  bikepacking setup. It also carries the only sourced season line.

Hand-offs:

- **No route starts at a café or a shop.** Nothing here for @coffee-scout or
  @shop-scout from the route pages.
- **No route belongs to a weekly ride.** `cfc-site/rides/rides.json` has no
  ride in Ojai. One directory ride touches this ground: the description of
  `santa-barbara-ca-fastrack-saturday-lake-ride` says it goes up to Lake
  Casitas and back from Santa Barbara. It publishes no route, so no
  `ride_slug` is set.
- **No climb here has an event on it in `data/calendar-2027.json`.** The
  Center Ride Out entry mentions Ojai but publishes no course, and the
  Saturday out-and-back is not described anywhere read. No route is tied to
  it.
- **`best_months`:** Bikepacking.com says November through May for the Rim
  Loop, February and March best (cooler, more water). Pathless Pedaled says
  ride Sulphur Mountain "in the cooler months." Komoot and Two Wheeled
  Wanderer both say inland Ojai is hot in summer. That supports a
  November–May line for the dirt. No source gave months for the road rides.
- **@logistics-scout:** Two Wheeled Wanderer (Jan 2024) says Bus #16 runs
  between Ojai and Ventura and can make the trail a one-way ride. A lead;
  confirm route number and bike rules on the operator's page.
- **@community-scout / @culture-scout:** the Garrett Lemire Memorial Grand
  Prix was not checked by this scout. It is a race, not a route.

## Rejected

- **Komoot "Ojai Loop"** (49 miles, 2,034 ft) — filed under Ventura, and its
  start point is unnamed. The Lake Casitas loop covers the same ground from
  Ojai.
- **Komoot "Farm loop"** (13.4 miles, 1,005 ft) — the guide page's text for
  it describes Fairbanks and the Alaska Range. The listing can't be trusted.
- **Komoot highlight "Pine Mountain Ridge Climb"** — lists 56.7 km with
  2,900 m up and 1,070 m down. That doesn't match any other page for this
  road. Not used.
- **Komoot Wheeler Springs routes** (16.3 miles / 1,448 ft; ~45 miles /
  ~4,232 ft; ~66 miles / ~6,299 ft) — named on the Komoot guide page, but
  the page gave no route URLs. No route page, no route.
- **Komoot long loops from Ojai** (Ventura pier 35 miles; Butterfly Beach
  Santa Barbara ~96 miles; two "Ojai Bell Tower" loops) — same reason: on
  the guide list, no route URL opened.
- **BikeClimbs "Ojai HWY 33 to Casitas Pass Summit"** (11.3 miles, 951 ft,
  0.6% average) — the name and the address don't agree on the road, and
  0.6% is not a climb. The Lake Casitas loop covers that direction.
- **BikeClimbs "Hwy 33 to the First Tunnel"** (3.5 miles, 796 ft, 4.3%) —
  the first third of the Highway 33 climb already listed. A turnaround
  option, not its own route. No page read says there is room to stop at the
  tunnel, so it isn't offered as one.
- **Sulphur Mountain Road as its own climb entry** — folded into the loop.
  Same road, same hazards.
- **Sulphur Mountain 54-mile version from Santa Paula through Ventura** —
  starts in Santa Paula. Not an Ojai ride.
- **Mountain bike trails: Gridley Trail, Ventura River Preserve, Ropersmith
  (Harmon Canyon)** — named on Two Wheeled Wanderer's Ojai page with no
  numbers and no route links. Ropersmith is in Ventura and closes after
  rain. Not opened further; the visiting reader is on a road or gravel bike.
- **Shelf Road** — named only as a rough add-on off the trail. No route page.
- **Rouleur, "Highway 33 to Reyes Peak"** — a magazine story, about 40 miles
  and about 8,200 ft to Reyes Peak. No route link and no date. Used only as
  a second source for rockfall on Highway 33.

## Couldn't confirm

- **Ojai Valley Trail, from the agency.** Hours, e-bike rule, speed limit,
  who runs it, any closure. Both Ventura County Parks URLs returned "Request
  Rejected." The only e-bike line read is Two Wheeled Wanderer's (Class 1
  and 2 allowed, Jan 2024); it is not in the findings because it isn't the
  agency's. Try the county parks page in a browser, or call the county parks
  office. The brief's "became a trail in 1989" was not confirmed either.
- **Lat/lon for the trail's Ojai end (402 Bryant St) and for downtown.** No
  geocoder page could be opened.
- **Highway 33 and Highway 150 closures.** The Caltrans road-conditions page
  is off the fetch allowlist. The Forest Service byway page (last updated
  April 1, 2025) names no closure on the byway. Check Caltrans for SR-33 and
  SR-150 and carry the date.
- **Highway 33 water.** The only named stop is from a 2015 blog (bottled
  water at the Wheeler Gorge visitor center). Needs a current page.
- **Highway 33 shoulder width.** No page read describes it. The hazards line
  says what the pages say and no more.
- **The RideWithGPS and Strava links were not opened.**
  `ridewithgps.com/routes/38769077` is the link Two Wheeled Wanderer gives
  for its Sulphur loop. `strava.com/segments/11812242` and
  `strava.com/segments/1727810` are built from the segment IDs BikeClimbs
  prints. The verifier should open all three, or the editor should null them
  and keep the `other` link. Also not opened: `ridewithgps.com/routes/38355892`
  (Pathless Pedaled's Sulphur route) and RideWithGPS route ID 45862277
  (embedded on the Ojai Rim Loop page, which also offers a GPX download; no
  direct file URL was seen).
- **"Dennison Grade" as the name of the Upper Ojai climb,** and that the
  road is Highway 150. BikeClimbs calls the road East Ojai Avenue. Needs a
  page that says it.
- **Komoot "Ventura - Santa Paula - Ojai Loop"** (66 miles, about 3,900 ft,
  rated hard). It would be the second long road day, over Upper Ojai to
  Santa Paula. The page opened, but the waypoints it listed (Lake Casitas,
  Rincon Bluffs, Faria) are the lake loop's, not a Santa Paula route, and it
  names no start. Open it in a browser and read the map before it goes in.
- **The full Highway 33 climb to Pine Mountain summit.** PJAMM's page
  (pjammcycling.com/climb/1784.Hwy-33-to-Pine-Mountain-Summit) loaded as an
  empty template. The Forest Service gives Pine Mountain Ridge as 5,020 ft.
  If PJAMM loads in a browser, this is the "long climb" entry.
- **A Center Ride Out Saturday route.** The organizer's pages say "ride an
  out-and-back" and publish no course. Nothing to list.
- **A club route library for Ojai.** None found. No Ojai club or shop rides
  page turned up in the searches run; @community-scout may find one.

## Sources

- https://www.traillink.com/gdbkpdf/trail/6015273/ojai-valley-trail63915996388455-2026.pdf
- https://www.venturacountytrails.org/TrailMaps/OjaiBikePath/AreaHome.html
- https://venturacountytrails.org/TrailMaps/OjaiSulphurMtn/AreaHome.html
- https://www.twowheeledwanderer.com/posts/ojai-valley-trail/
- https://www.twowheeledwanderer.com/posts/sulphur-mountain-trail-ojai-california/
- https://www.twowheeledwanderer.com/posts/biking-in-ojai/
- https://www.pathlesspedaled.com/blog/2022/01/the-best-gravel-in-ojai
- https://mtbproject.com/trail/7062383/sulphur-mountain-fire-road
- https://bikepacking.com/routes/ojai-rim-loop/
- https://bikeclimbs.com/climb/united-states/california/ventura-county/ojai/hwy-33-climb---matilija-to-the-top
- https://www.bikeclimbs.com/climb/united-states/california/ventura-county/ojai/upper-ojai-summit-climb
- https://bikeclimbs.com/climb/united-states/california/ventura-county/ojai/ojai-hwy-33-to-casitas-pass-summit
- https://bikeclimbs.com/climb/united-states/california/ventura-county/ojai/hwy-33-to-the-first-tunnel
- https://www.fs.usda.gov/r05/lospadres/recreation/jacinto-reyes-national-scenic-byway
- https://venturacycling.blogspot.com/2015/01/rose-valley.html
- https://www.rouleur.cc/en-ca/blogs/rouleur-explore/layers-of-history-riding-highway-33-to-reyes-peak
- https://www.komoot.com/smarttour/e1415270834/lake-casitas-loop
- https://www.komoot.com/smarttour/e1415194855/loop-di-ventura-ojai
- https://www.komoot.com/smarttour/e735019024/ojai-loop
- https://www.komoot.com/guide/1937665/road-cycling-routes-around-ojai
- https://www.komoot.com/highlight/7437217
- `cfc-site/rides/rides.json`, `data/calendar-2027.json`, `data/SCHEMA.md` (read 2026-11-15)

Opened but returned nothing usable (not sources):

- https://venturacounty.gov/parks-department/?p=359 — "Request Rejected"
- https://parks.venturacounty.gov/?p=655 — "Request Rejected"
- https://pjammcycling.com/climb/1784.Hwy-33-to-Pine-Mountain-Summit — empty template
