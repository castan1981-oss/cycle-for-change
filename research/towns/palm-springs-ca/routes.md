# palm-springs-ca · route-scout · 2026-10-03

Seven routes: the path, the century, two easy town loops, the Box Canyon
climb from Mecca, and two in Joshua Tree (the park road and a dirt road).
Every route has a public route page that was fetched this run. Unknown is
null. There is no Highway 74 or Tram road climb in the findings: no page
for either could be opened (see Couldn't confirm). The editor has to
decide whether the guide ships without "the climb."

How this run went, so the next one doesn't repeat it:

- **Search ran out early.** WebSearch answered three times. The fourth call
  (Highway 74) came back "this session has used its web search budget (200
  of 200)". Every lead after that came from links on pages already open.
- **The fetch tool opens only some URLs.** It opens a URL that came back in
  a search result, or a link on the same site as a page it already opened.
  Everything else hung on a permission request and was withdrawn: the
  RideWithGPS routes embedded on Velo Palm Springs, the Desert Cycling
  Club's site, a RideWithGPS user page, the Visit Greater Palm Springs
  biking page and the Nominatim geocoder. Per the session rules, none was
  fetched another way.
- **RideWithGPS pages that did open** give only the name, miles, feet and
  town. No roads, no start, no owner.
- **No start has a lat/lon.** The geocoder page was refused, so the brief's
  centre (33.8303, -116.5453) is unconfirmed and no distance from downtown
  was computed.

## Findings

```json
[
  {
    "name": "CV Link, West Valley (Palm Springs to Cathedral City)",
    "type": "path",
    "miles": 20,
    "elevation_gain_ft": null,
    "surface": "Wide paved path, with a decomposed-granite walking and running path beside it on most of it. The Palm Desert piece switches between path and street.",
    "difficulty": "easy",
    "start": { "name": "Palm Springs Visitor Center, Highway 111 at Tramway Road (the west end)", "address": null, "lat": null, "lon": null },
    "description": "The valley's car-free path: about 40 miles in three pieces, finished in 2025. The Palm Springs piece runs 19.63 miles from the Palm Springs Visitor Center, along the Chino Wash and the Whitewater River levee, to Date Palm Drive in Cathedral City. A spur follows Tahquitz Creek through Demuth Park. Join it anywhere and turn around anywhere. There's an access point with street parking at Via Escuela and Executive Drive, just east of Gene Autry Trail. CVAG posts no hours, and solar lights set in the path mark it at night. The other two pieces are in Palm Desert (5.44 miles, Bump and Grind trailhead to Cook Street) and from La Quinta to Coachella (16.02 miles, Washington Street to Airport Boulevard).",
    "water": "Hydration stations at the rest stops. Patch counted 30 rest stops with benches, bike racks and hydration stations (Sept 2026). CVAG lists restrooms at the Palm Springs Visitor Center, Esperanza Park, the Bump and Grind access point, Palm Desert Civic Park, North Jackson Park and Sierra Vista Park.",
    "hazards": "You share it with e-bikes, electric scooters and golf carts. The limit is 20 mph for bikes and carts and 15 for scooters (CVAG). It isn't one path end to end. Rancho Mirage and Indian Wells pulled out of the project, so the path stops at their city lines (Palm Springs Post, Nov 2025): the West Valley piece ends at Date Palm Drive, and the next piece starts in Palm Desert. In November 2025 Palm Springs listed work under way at the Sunrise Way undercrossing and along the Tahquitz Creek corridor. Check the CVAG map before a long ride. Wind can come up at any time, and in summer, ride early or late (Coachella Valley Independent, April 2026).",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://www.coachellavalleylink.com/maps/" },
    "sources": [
      "https://www.coachellavalleylink.com/maps/",
      "https://www.coachellavalleylink.com/",
      "https://www.coachellavalleylink.com/about-the-project/faqs/",
      "https://www.coachellavalleylink.com/cv-link-city-gaps/",
      "https://engagepalmsprings.com/cv-link",
      "https://thepalmspringspost.com/cv-link-ribbon-cuttings-celebrate-completion-of-40-mile-path-some-work-still-to-be-done-in-palm-springs/",
      "https://cvindependent.com/2026/04/hiking-with-t-cv-link-includes-more-than-40-miles-of-trails-with-opportunities-for-exercise-transportation-and-desert-views/",
      "https://www.visitgreaterpalmsprings.com/things-to-do/outdoors-and-recreation/cv-link/",
      "https://patch.com/california/palmdesert/more-shade-coming-deserts-cv-link?+transit="
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Tour de Palm Springs century",
    "type": "road",
    "miles": 101,
    "elevation_gain_ft": 3150,
    "surface": "Paved road and path. The organizer says the 2027 routes will be routed on the CV Link.",
    "difficulty": "epic",
    "start": { "name": "South Palm Canyon Dr at Tahquitz, downtown Palm Springs", "address": null, "lat": null, "lon": null },
    "description": "The long route of the Tour de Palm Springs, the valley's big charity ride. It starts and finishes downtown on South Palm Canyon at Tahquitz. The 2027 ride is Feb 6, with 101, 88, 77, 64, 32 and 16-mile routes; the organizer says the full 2027 maps are coming soon. A RideWithGPS route of it is 101.4 miles and 3,161 feet. GranFondoGuide describes the long routes as rolling hills and gradual climbs, nothing steep, and Velo Palm Springs' 2016 write-up of an earlier century runs out to Thermal and back.",
    "water": "On event day, 3 lunch stops, 2 snack stops and 4 water stops along the routes (organizer). Nothing published for riding it on another day.",
    "hazards": "The organizer says routes and departures can be changed by the host cities, and the 2027 maps weren't out on Oct 3, 2026, so the RideWithGPS line may not be this year's course. On any other day these are open roads with no support.",
    "links": { "rwgps": "https://ridewithgps.com/routes/933811", "strava": null, "komoot": null, "gpx": null, "other": "https://tourdepalmsprings.com/event-info/routes/" },
    "sources": [
      "https://tourdepalmsprings.com/event-info/routes/",
      "https://tourdepalmsprings.com/routes2/",
      "https://tourdepalmsprings.com/event-info/",
      "https://ridewithgps.com/routes/933811",
      "https://www.granfondoguide.com/Events/Index/2618/tour-de-palm-springs",
      "https://www.velopalmsprings.com/tour-de-palm-springs-century/"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "The Midcentury Modern loop (downtown Palm Springs)",
    "type": "road",
    "miles": 8,
    "elevation_gain_ft": null,
    "surface": "Paved city streets.",
    "difficulty": "easy",
    "start": { "name": "Palm Springs Art Museum Architecture and Design Center", "address": "300 S Palm Canyon Dr, Palm Springs, CA", "lat": null, "lon": null },
    "description": "Velo Palm Springs' downtown loop: 7.86 miles, mostly flat with one short climb. It passes eight landmark buildings, among them the Del Marcos Hotel, Albert Frey's Fire Station No. 1 and Frey House II, Sinatra's Twin Palms and the Kaufmann Desert House. The route uses Palm Canyon Drive, Baristo Road, Indian Canyon Drive, Palisades Drive, Alejo Road, Ladera Circle, Hermosa Place and Vista Chino. Do it the evening you land or on a slow morning. Street parking on Palm Canyon is metered, and the Civic Center has a parking structure.",
    "water": null,
    "hazards": "Palm Canyon Drive carries traffic. Velo Palm Springs says to ride it early, when it's cooler and there's less traffic on Palm Canyon.",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://www.velopalmsprings.com/cycling-palm-springs-midcentury-modern/" },
    "sources": [
      "https://www.velopalmsprings.com/cycling-palm-springs-midcentury-modern/"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Gerald Ford, Tamarisk and Country Club loop (Palm Desert and Rancho Mirage)",
    "type": "road",
    "miles": 14,
    "elevation_gain_ft": null,
    "surface": "Bike lanes and residential streets, with a stretch on the Abrams-Butler trail.",
    "difficulty": "easy",
    "start": { "name": "Tri-A-Bike, Palm Desert", "address": "44841 San Pablo Ave, Palm Desert, CA 92260", "lat": null, "lon": null },
    "description": "A loop of 14-plus miles from Tri-A-Bike's door, from the shop's own list of local rides. It takes San Pablo, Magnesia Falls, Portola, Gerald Ford, Tamarisk, Frank Sinatra, the Abrams-Butler trail and Country Club, among others. It rides Palm Desert and Rancho Mirage, and Rancho Mirage isn't on CV Link. The shop calls it easy, with a moderate uphill on Portola and on Gerald Ford to Monterey, and lists Trojan Plaza as a second start.",
    "water": null,
    "hazards": null,
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://www.triabike.com/articles/local-rides-pg196.htm" },
    "sources": [
      "https://www.triabike.com/articles/local-rides-pg196.htm",
      "https://www.coachellavalleylink.com/cv-link-city-gaps/"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Box Canyon from Mecca",
    "type": "road",
    "miles": 20,
    "elevation_gain_ft": 1600,
    "surface": null,
    "difficulty": "moderate",
    "start": { "name": "66 Ave and Johnson Rd, near Mecca", "address": null, "lat": null, "lon": null },
    "description": "Tri-A-Bike's scenic ride at the east end of the valley. It goes from 66 Ave and Johnson Rd through Box Canyon to Pinto Road at I-10. That's 19.5 miles one way with a shuttle back, or 39 miles if you turn around and ride down. The shop puts the climbing at 1,590 feet. A car day from Palm Springs.",
    "water": null,
    "hazards": "The shop rates it advanced. It climbs all the way to the turnaround or the shuttle pickup at I-10. The page names no water stop on the route, so carry all you need.",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://www.triabike.com/articles/local-rides-pg196.htm" },
    "sources": [
      "https://www.triabike.com/articles/local-rides-pg196.htm"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Park Boulevard, Joshua Tree National Park",
    "type": "road",
    "miles": 25,
    "elevation_gain_ft": null,
    "surface": "Paved park road, mostly without a shoulder.",
    "difficulty": "moderate",
    "start": { "name": "West Entrance, Joshua Tree National Park", "address": null, "lat": null, "lon": null },
    "description": "The main road through the Mojave side of the park. It runs roughly 25 miles between the West and North entrances, over moderate rolling hills (Velo Palm Springs, April 2026). Keys View Road, a paved spur, is a climb of roughly five miles from its turnoff on Park Boulevard to the overlook. A rider pays $15 for a seven-day pass (Velo Palm Springs, read Oct 3, 2026). A car day from Palm Springs; Velo puts the riding window at roughly October to April.",
    "water": "None on the park's interior roads. Water only at the park entrances and at the Cottonwood, Black Rock and Indian Cove campgrounds (Velo Palm Springs).",
    "hazards": "There are no bike lanes anywhere in the park, and most paved roads have no shoulder. There is no shade. Cell service is unreliable. Summer temperatures regularly pass 100 F and have reached 124 F. Keys View Road is exposed and the wind can be strong there; descend carefully.",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://www.velopalmsprings.com/cycling-through-joshua-tree-national-park/" },
    "sources": [
      "https://www.velopalmsprings.com/cycling-through-joshua-tree-national-park/",
      "https://www.velopalmsprings.com/segment-series-exploring-joshua-trees-keys-view-road/"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Geology Tour Road, Joshua Tree National Park",
    "type": "gravel",
    "miles": 18,
    "elevation_gain_ft": null,
    "surface": "Dirt road. Riders on wider tires handle it well, per Velo Palm Springs; drivers are told to bring a high-clearance vehicle for the lower section.",
    "difficulty": "moderate",
    "start": { "name": "Geology Tour Road at Park Boulevard", "address": null, "lat": null, "lon": null },
    "description": "An 18-mile out-and-back on dirt (not a loop). It drops south from Park Boulevard through some of the park's most interesting geology, per Velo Palm Springs. Bikes are allowed on every paved and dirt road in the park that's open to cars. Add it to a Park Boulevard day.",
    "water": "None. Velo Palm Springs says to carry extra water here.",
    "hazards": "It's remote and shadeless, and there's nothing out there if something goes wrong (Velo Palm Springs). Cell service in the park is unreliable.",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://www.velopalmsprings.com/cycling-through-joshua-tree-national-park/" },
    "sources": [
      "https://www.velopalmsprings.com/cycling-through-joshua-tree-national-park/"
    ],
    "verified": "2026-10-03"
  }
]
```

## Why these

- **CV Link, West Valley.** Zone 2, and the signature ride for this town:
  the easy one, car-free, join anywhere.
  - **Numbers.** 19.63 miles from CVAG's maps page, shown as 20. Graded easy
    because it's a path under 20 miles. Elevation is null because no CVAG
    page gives one.
  - **Hours.** CVAG's FAQ says no hours are posted. The Coachella Valley
    Independent (April 2026) says it's open 24 hours. Velo Palm Springs
    (2023) said 6 a.m. to 10 p.m. CVAG's word stands.
  - **The construction line** is from Engage Palm Springs, last updated
    Nov 4, 2025. It may be done by now (see Couldn't confirm).
  - **Hand-offs.** The west end, the Palm Springs Visitor Center at Highway
    111 and Tramway Road, is the foot of the Tram road. The Tour de Palm
    Springs says its 2027 routes use CV Link.
- **Tour de Palm Springs century.** The long one, and Robert's ride:
  `data/calendar-2027.json` id 7, slug `tour-de-palm-springs`, `riding: true`,
  Feb 6, 2027.
  - **Numbers.** From RideWithGPS 933811 ("Tour de Palm Springs", 101.4 mi,
    3,161 ft, rounded to 3,150). The page doesn't say who made it or what
    year.
  - **Why this route.** I chose it over 38541342 ("100 mile route (copy)",
    103.0 mi, 3,180 ft) because it's closer to the 2027 century's 101 miles
    and isn't a copy.
  - **The start.** GranFondoGuide says North Palm Canyon. The organizer says
    South Palm Canyon at Tahquitz, and the organizer wins.
  - **Editor.** Swap `links.rwgps` to the organizer's 2027 route when the
    routes page posts it.
- **The Midcentury Modern loop.** Zone 1, the downtown easy ride.
  - **Freshness.** Velo Palm Springs, April 8, 2026.
  - **Numbers.** Elevation is null; the page says "mostly flat with one short
    climb". Graded easy on 7.86 miles of city street.
  - **The address** is the route page's, not the museum's own site.
  - **Hand-off.** The Architecture and Design Center is a lead for
    @culture-scout.
- **Gerald Ford, Tamarisk and Country Club loop.** Zone 2. This is how to
  ride Palm Desert and Rancho Mirage, where CV Link has its gap.
  - **The page.** Tri-A-Bike's page has no date, but it says its Saturday
    ride "starts OCTOBER 2026", so it was edited this year.
  - **Numbers.** Elevation is null. Hazards are null: the page names only the
    uphill on Portola and Gerald Ford, and that's in the description.
  - **Hand-offs.**
    - The start is a shop (**Tri-A-Bike**): a lead for @shop-scout.
    - For @community-scout: Tri-A-Bike's "weekly fun rides", Saturdays at
      10:30 from the store, all bikes welcome, starting October 2026.
    - For @community-scout: the shop says it supports the **Desert Cycling
      Club**, "weekly rides on Tuesdays, Wednesdays, and Thursdays", for
      intermediate and advanced road riders.
    - For @coffee-scout: Tri-A-Bike names **Old Town Coffee, 78100 Main St,
      La Quinta**. It's the stop on the shop's 20-mile ride and about 0.6
      mile from the north end of the Bear Creek Trail.
- **Box Canyon from Mecca.** Zone 4, a car day. It's the nearest thing to a
  climb this run could confirm.
  - **Numbers.** Miles are the shop's 19.5 one way, shown as 20; the
    description gives the 39-mile return. The shop's "1590 ft" doesn't say
    whether it's for the one-way or the return ride. Shown as 1,600. Graded
    moderate either way.
  - **Surface** is null; the page doesn't say.
- **Park Boulevard.** Zone 4, Joshua Tree.
  - **Freshness.** Velo Palm Springs' park guide, April 8, 2026, modified
    May 3, 2026.
  - **The route page.** It's a written route: one named road between two
    named entrances, with no map. If the editor wants a map, the Keys View
    segment page (Feb 2024) embeds RideWithGPS 54166520, which a browser can
    open.
  - **The fee** comes from Velo, not NPS. @logistics-scout should confirm it
    on nps.gov.
  - **Best months.** Velo's "roughly October through April" is a source for
    `best_months`.
- **Geology Tour Road.** The gravel ride, from the same Velo guide.
  - **Grade.** Moderate rather than easy. Elevation is unknown, and easy is
    for a path or a quiet paved road; this is a remote dirt road where
    drivers are told to bring high clearance.
  - **Sand.** None of the fetched pages says whether the lower section is
    sandy. "Wider tires" is as far as the page goes.

## Rejected

- **RideWithGPS 38541342** "Tour de Palm Springs 100 mile route (copy)"
  (103.0 mi, 3,180 ft). It's a copy, and 933811 is closer to the 2027
  distance.
- **RideWithGPS 28715867** "Tour de Palm Springs 25 mi" (42.3 km, 136 m).
  The 2027 event has no 25-mile route (it has 32 and 16), and the page gives
  no roads.
- **RideWithGPS 39024638** "Palm Springs Citywide Loop" (22.5 km, 109 m).
  Velo's Citywide Loop article (Jan 2015) says "just over 20 miles" and
  embeds a different route (54166522). I can't tell which is current, and
  the 2026 Midcentury loop covers the same ground.
- **Velo Palm Springs, Tahquitz Creek Loop** (Jan 2014, 7.1 mi from Demuth
  Park). CV Link now has a spur through Demuth Park (CV Independent, 2026),
  and the 2014 page predates it.
- **Velo Palm Springs, Tour de Palm Springs 55-mile (2014) and 25-mile
  (2016, modified March 2026).** Neither distance is on the 2027 event. The
  55-mile page warns of "rough roads" through the Coachella Valley Preserve
  section, but it's a 2014 course.
- **Velo Palm Springs, CV/Link (Oct 2018).** CVAG's own pages replace it.
- **Velo Palm Springs, CV Link Cathedral City segment** (Nov 2023, 2.3 mi,
  Ramon Road to Vista Chino). It's covered by the West Valley entry, and its
  6 a.m. to 10 p.m. hours conflict with CVAG's FAQ.
- **Velo Palm Springs, Redlands Classic Beaumont Road Stage** (2014). It's
  in Beaumont, outside the valley.
- **Tri-A-Bike's other street rides.**
  - River Shopping Center, 5 miles: too short.
  - South of El Paseo: variable length. The shop warns of Highway 74 there:
    "be careful there is no bike route here."
  - The 20-mile ride to Old Town Coffee: it's unclear whether that's one way
    or the round trip.
  - Bear Creek Trail: 4.8 miles of paved path in La Quinta. CV Link covers
    the easy-path need; it's a lead if the editor wants a La Quinta pick.
- **Tri-A-Bike's mountain bike trails**: Cove to the Lake, Boo Hoff, Art
  Smith, Bump & Grind, Hop Along Cassidy and Dunn Road Hahn. Each has miles
  and a grade but no climbing, water or start address. I'd take one dirt
  ride done properly.
- **Tri-A-Bike's other entries.**
  - Hemet's Diamond Valley Lake loop: outside the valley.
  - Joshua Tree's "29 miles of gravel roads": no single route.
- **Big Wheel Bikes CV events page.** It posts no route; rides are announced
  on social media, Nov to Apr (the ride is already in rides.json).
- **Village Peddler (La Quinta).** The site lists rentals and repair, no
  rides.
- **Tour de Palm Springs 2025 PDF** (website-files.com). It has 2025 numbers
  (a 103-mile century, 6:30 to 7:30 a.m. starts) and an unclear source.
- **Patch, "Another CV Link Segment Set To Begin Construction In Palm
  Springs."** It's from March 2022: stale.
- **Velo Palm Springs, "Cycling in Hot Weather"** (Aug 2023). General
  advice; no Palm Springs numbers or wind.

## Couldn't confirm

- **Highway 74 (Palms to Pines), the climb the brief asks for.** No page
  opened. Search ran out before a Strava segment or RideWithGPS route could
  turn up. The only fetched line is Tri-A-Bike's warning about Highway 74
  south of El Paseo: "be careful there is no bike route here." Where to look:
  a Strava segment page for Highway 74 from Palm Desert, the Desert Cycling
  Club's site, PJAMM.
- **The Tram road (Tramway Road from Highway 111).** CV Link's west end sits
  at its foot, but no segment or route page was found. Where to look: a
  Strava segment for Tramway Road.
- **Dillon Road / Desert Hot Springs (Zone 3).** Velo's Tour de Palm Springs
  25-mile page says the ride explores Desert Hot Springs. Its route,
  RideWithGPS 54166528, didn't open, and the page gives no roads or numbers.
- **Whitewater Canyon to the Whitewater Preserve.** This is Velo's "Fish
  Hatchery" ride (Jan 2014): out of Palm Springs, with a "fun" descent home,
  and "drinking water is not readily available." There are no miles or feet,
  and its route, RideWithGPS 54166518, didn't open.
- **Indian Canyons via South Palm Canyon.** Velo's page (Dec 2023, modified
  April 9, 2026) gives "approximately 4 miles", easy. Its route, RideWithGPS
  54166519, didn't open. The page doesn't say whether bikes are allowed past
  the gate, the fee or the hours. Where to look: the Agua Caliente tribe's
  Indian Canyons page.
- **The Goat Trails (Palm Springs, mountain bike).** Tri-A-Bike: "10 miles
  out and back", singletrack, advanced, "Many networked trails in area." The
  start is printed as "the Rimrock shopping mall at the corner of East
  Canyon Dr and Palm Hills Rd". Those street names look garbled, and I
  couldn't check them. There are no feet and no water. This is the dirt ride
  in Palm Springs itself if someone can confirm the start.
- **Palm Canyon Epic (mountain bike).** Tri-A-Bike: "28 miles out one way to
  Pinyon", a shuttle ride with "much climbing". The fetch read the start as
  the Rimrock shopping center, so the direction is unclear. Where to look:
  MTB Project.
- **Keys View Road numbers.** Velo's segment page (Feb 2024) says
  "approximately 17 miles (round trip)" from the Cap Rock parking lot. Velo's
  2026 park guide says the climb is "roughly five miles from the turnoff on
  Park Boulevard". The two disagree, and RideWithGPS 54166520 didn't open.
- **Velo Palm Springs' RideWithGPS routes, all embedded on fetched pages and
  none openable here.** A verifier with a browser can open them. 54166521
  and 54166527 would let the Midcentury and century entries carry a map.
  - 54166517: CV Link Cathedral City
  - 54166518: Whitewater Canyon
  - 54166519: Indian Canyons
  - 54166520: Keys View
  - 54166521: Modernism Ride
  - 54166522: Citywide Loop
  - 54166523: Tahquitz Creek Loop
  - 54166526: the 55-mile
  - 54166527: the Tour de Palm Springs century
  - 54166528: the 25-mile
- **Desert Cycling Club** (http://www.cycleclub.com/rides, linked by
  Tri-A-Bike). Refused. It likely has a route library and the Tuesday,
  Wednesday and Thursday rides.
- **RideWithGPS user 219822**, which Tri-A-Bike labels "Palm Springs Rides".
  Refused.
- **Visit Greater Palm Springs, "Biking & Bike Rentals."** Refused, even
  though it's on the same site as a page that opened.
- **CV Link in Palm Springs, 2026.** The newest status pages are November
  2025: the Ramon Road undercrossing was aimed at December, and work was
  listed at Sunrise Way, Tahquitz Creek, Bel Air Greens, Four Seasons and
  North Palm Springs. No 2026 closure page was found. Where to look: CVAG's
  updates page, https://www.coachellavalleylink.com/updates/. The project
  hotline is 1-833-428-5465.
- **Box Canyon details.** Surface, traffic, shoulder and water are not on
  the shop's page.
- **Wind in the valley (the San Gorgonio Pass).** The only line is CV
  Independent's "high desert winds that could pop up at any time." No page
  on the pass or the wind farms was fetched.
- **The Salton Sea.** Nothing found before search ran out.
- **Coordinates for every start, and the brief's centre point.** The
  Nominatim page was refused. The start addresses for the Midcentury loop
  and the century are from route pages, not the places' own sites.

## Sources

- https://www.coachellavalleylink.com/
- https://www.coachellavalleylink.com/maps/
- https://www.coachellavalleylink.com/about-the-project/faqs/
- https://www.coachellavalleylink.com/cv-link-city-gaps/
- https://engagepalmsprings.com/cv-link
- https://thepalmspringspost.com/cv-link-ribbon-cuttings-celebrate-completion-of-40-mile-path-some-work-still-to-be-done-in-palm-springs/
- https://cvindependent.com/2026/04/hiking-with-t-cv-link-includes-more-than-40-miles-of-trails-with-opportunities-for-exercise-transportation-and-desert-views/
- https://www.visitgreaterpalmsprings.com/things-to-do/outdoors-and-recreation/cv-link/
- https://patch.com/california/palmdesert/more-shade-coming-deserts-cv-link?+transit=
- https://patch.com/california/palmdesert/another-cv-link-segment-set-begin-construction-palm-springs
- https://tourdepalmsprings.com/event-info/routes/
- https://tourdepalmsprings.com/routes2/
- https://tourdepalmsprings.com/event-info/
- https://www.granfondoguide.com/Events/Index/2618/tour-de-palm-springs
- https://trans.rctlma.org/news/28th-annual-tour-de-palm-springs-coachella-valley
- https://assets-global.website-files.com/675393537320c524157846b0/682b18dd0eb4327313b2cbfe_24916165901.pdf
- https://ridewithgps.com/routes/933811 (fetched as https://ridewithgps.com/routes/933811?lang=en)
- https://ridewithgps.com/routes/38541342
- https://ridewithgps.com/routes/28715867
- https://ridewithgps.com/routes/39024638
- https://www.velopalmsprings.com/
- https://www.velopalmsprings.com/category/rides/
- https://www.velopalmsprings.com/cycling-palm-springs-midcentury-modern/
- https://www.velopalmsprings.com/cycling-through-joshua-tree-national-park/
- https://www.velopalmsprings.com/segment-series-exploring-joshua-trees-keys-view-road/
- https://www.velopalmsprings.com/segment-series-exploring-the-cv-link-segment-in-cathedral-city/
- https://www.velopalmsprings.com/indian-canyons-cycling-route-south-palm-canyon-guide/
- https://www.velopalmsprings.com/tour-de-palm-springs-century/
- https://www.velopalmsprings.com/tour-de-palm-springs-25-mile-ride/
- https://www.velopalmsprings.com/tour-de-palm-springs-55-mile-ride/
- https://www.velopalmsprings.com/palm-springs-citywide-loop/
- https://www.velopalmsprings.com/palm-springs-tahquitz-creek-loop/
- https://www.velopalmsprings.com/fish-hatchery/
- https://www.velopalmsprings.com/cycling-in-hot-weather/
- https://www.velopalmsprings.com/local-bike-shops/
- https://triabike.com
- https://www.triabike.com/articles/local-rides-pg196.htm
- https://www.bigwheelbikescv.com/events
- https://villagepeddlerlq.com

Tried and could not open (permission request withdrawn):

- https://ridewithgps.com/routes/54166517
- https://ridewithgps.com/routes/54166519
- https://ridewithgps.com/routes/54166527
- http://www.cycleclub.com/rides
- https://ridewithgps.com/users/219822
- https://www.visitgreaterpalmsprings.com/things-to-do/outdoors-and-recreation/biking-and-bike-rentals-/
- https://nominatim.openstreetmap.org/search?q=Tahquitz+Canyon+Way+and+Palm+Canyon+Drive,+Palm+Springs,+CA&format=json

WebSearch stopped after three calls: "this session has used its web search
budget (200 of 200)".
