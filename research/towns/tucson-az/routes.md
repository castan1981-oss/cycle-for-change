# tucson-az · route-scout · 2026-10-03

Seven routes: the climb, the path, the park loop, the west-side pass, the
group-ride route, the long one and one dirt ride. Every route has a public
route page that was fetched this run. Unknown is null.

How this run went, so the next one doesn't repeat it. The search cap (8) was
spent. The fetch tool here only opens a URL that came back in a search result,
or a link on the same site as a page it already opened. So the RideWithGPS
routes linked from other sites (To Be Determined's guide, the UA cycling page,
El Tour's own route page, rides.json) could not be opened; they are listed
under Couldn't confirm with their ids. RideWithGPS pages that did open give
only the name, miles, feet and "Tucson, AZ", not the roads or the start.
Strava segments did not open. Distances are from downtown (32.2226,
-110.9747), and only one start has coordinates.

## Findings

```json
[
  {
    "name": "Mount Lemmon (the Catalina Highway)",
    "type": "climb",
    "miles": 28,
    "elevation_gain_ft": 6750,
    "surface": "Paved. Smooth to about mile 21, then more cracks and bumps; the first three miles were repaved in 2024.",
    "difficulty": "epic",
    "start": { "name": "Mile marker 0, Catalina Highway", "address": "5315 Mt Lemmon Hwy, Tucson, AZ 85749", "lat": null, "lon": null },
    "description": "The climb from the desert floor at mile marker 0 (2,858 feet) to the observatory at the top: 27.8 miles and about 6,750 feet, the course GABA's Mt. Lemmon Hill Climb uses. The main climb averages 4.7 percent; the last stretch to the observatory is close to 7. Windy Point is at mile 14. At the top, Bike Mount Lemmon lists the Mount Lemmon Cookie Cabin, the general store and Sawmill Run for food. If you drive, Bike Mount Lemmon points you to the Le Buzz Cafe and Safeway lot, 4.5 miles from mile 0. A RideWithGPS version from town is 59.3 miles and 6,866 feet round trip.",
    "water": "None on the climb until the Bigelow trailhead, past mile marker 19 (Bike Mount Lemmon; the University of Arizona cycling team says mile 19.5). Windy Point, at mile 14, has pit toilets and no water. Before the climb, McDonald Park off Harrison Road is a short detour for water (UA cycling).",
    "hazards": "The top runs 20 to 30 F colder than the bottom, and gusts over 30 mph come up, mostly in the afternoon. Ice forms in the shade from December to February. Going down, the shoulder is narrower than on the way up, and cars move into it on the curves. Winter weather closes the road: in January 2026 it reopened at noon on Jan 8 to four-wheel-drive, all-wheel-drive or chained vehicles only (KOLD, from the Pima County Sheriff). Pima County's roads hotline is 520-351-3351.",
    "links": { "rwgps": "https://ridewithgps.com/routes/1725903", "strava": null, "komoot": null, "gpx": null, "other": "https://bikemountlemmon.com/faqs" },
    "sources": [
      "https://bikemountlemmon.com/faqs",
      "https://bikemountlemmon.com/strava",
      "https://bikemountlemmon.com/2025-events",
      "https://ridewithgps.com/routes/1725903",
      "https://uacycling.com/tucson-routes/",
      "https://www.kold.com/2026/01/08/road-mount-lemmon-closed/"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "The Loop (Chuck Huckelberry Loop)",
    "type": "path",
    "miles": 54,
    "elevation_gain_ft": null,
    "surface": "Paved shared-use path, with short stretches of buffered bike lane.",
    "difficulty": "hard",
    "start": { "name": "Where Congress Street crosses the Loop on the Santa Cruz River, west of downtown", "address": null, "lat": null, "lon": null },
    "description": "Pima County's car-free path along the Santa Cruz River, the Rillito, the Pantano Wash, Julian Wash, the Harrison Road Greenway and the Cañada del Oro. The full circuit is 53.9 miles; the whole system is more than 138 miles and reaches Marana and Oro Valley. You can join it anywhere and turn around anywhere, so it's the ride for the evening you land. The University of Arizona cycling team calls it fantastic for easy spins, with the quieter east and south sections good for tempo. From downtown, join it where Congress Street crosses the river; the Mercado San Agustín is less than half a mile away.",
    "water": "Most trailheads have water fountains and restrooms (Visit Tucson).",
    "hazards": "Open sunrise to sunset; riding it at night is prohibited. In summer, Pima County says carry enough water and ride before 9 a.m. or after 5 p.m. Julian Wash from Kino to Irvington is closed indefinitely while the Mosaic Quarter sports complex is built; the county posts a paved detour along I-10. Storms leave sand in the underpasses: the Julian Wash underpass at Benson Highway closed for it in August 2026. Check Pima County's Loop closures page before a long day.",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://www.pima.gov/162/The-Chuck-Huckelberry-Loop" },
    "sources": [
      "https://www.pima.gov/162/The-Chuck-Huckelberry-Loop",
      "https://www.pima.gov/3864/About-The-Loop",
      "https://www.pima.gov/250/Notices-Closures",
      "https://www.visittucson.org/blog/post/loving-the-loop/",
      "https://uacycling.com/tucson-routes/"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Cactus Forest Loop Drive (Saguaro National Park East)",
    "type": "road",
    "miles": 8,
    "elevation_gain_ft": null,
    "surface": "Paved, except the gravel spur to the Mica View picnic area.",
    "difficulty": "easy",
    "start": { "name": "Saguaro National Park, Rincon Mountain District Visitor Center", "address": "3693 S Old Spanish Trail, Tucson, AZ 85730", "lat": null, "lon": null },
    "description": "An 8-mile paved loop through the saguaro forest in the park's east district, per the park service. To Be Determined's Tucson guide calls it mostly rolling, with one 650-foot climb. A rider pays $15 for a 7-day pass; under 16 is free (NPS, Oct 2026). A RideWithGPS version from a hotel in town is 28.5 miles and 1,264 feet. {ride:tucson-az-cactus-cycling-friday-saguaro-east-ride|Cactus Cycling Club's Saguaro East ride} loops the east side of the park.",
    "water": "Outside the visitor center. None on the loop drive or at the picnic areas (NPS).",
    "hazards": "The park service says the loop is narrow, with tight turns and steep hills, and to slow down before the curves and the hills.",
    "links": { "rwgps": "https://ridewithgps.com/routes/38013971", "strava": null, "komoot": null, "gpx": null, "other": "https://www.nps.gov/sagu/planyourvisit/bicycling-at-saguaro-national-park.htm" },
    "sources": [
      "https://www.nps.gov/sagu/planyourvisit/bicycling-at-saguaro-national-park.htm",
      "https://www.nps.gov/sagu/planyourvisit/fees.htm",
      "https://www.nps.gov/sagu/planyourvisit/conditions.htm",
      "https://www.nps.gov/sagu/planyourvisit/basicinfo.htm",
      "https://www.tobedetermined.cc/journal/ride-guide-tucson-arizona",
      "https://ridewithgps.com/routes/38013971"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Gates Pass and the McCain Loop",
    "type": "road",
    "miles": 18,
    "elevation_gain_ft": 1500,
    "surface": "Paved road; rough pavement on Kinney Road.",
    "difficulty": "moderate",
    "start": { "name": null, "address": null, "lat": null, "lon": null },
    "description": "Over Gates Pass in the Tucson Mountains west of town and around the McCain Loop: 17.9 miles and about 1,500 feet, per the RideWithGPS page. Gates Pass is the main climb on the University of Arizona cycling team's Tuesday route, and the team says the pass is a great ride on its own. A longer RideWithGPS version is 38.7 miles and 2,244 feet, with a food stop at El Guero Canelo near the end. The route pages give the numbers, not the start; read the map before you go.",
    "water": null,
    "hazards": "No bike lanes on Gates Pass. Kinney Road has no bike lanes and rough pavement (University of Arizona cycling team, 2020).",
    "links": { "rwgps": "https://ridewithgps.com/routes/1042796", "strava": null, "komoot": null, "gpx": null, "other": null },
    "sources": [
      "https://ridewithgps.com/routes/1042796",
      "https://ridewithgps.com/routes/54251596",
      "https://uacycling.com/tucson-routes/"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "The Shootout",
    "type": "road",
    "miles": 70,
    "elevation_gain_ft": 1600,
    "surface": "Paved road.",
    "difficulty": "hard",
    "start": { "name": "University Blvd & Euclid Ave, by the University of Arizona", "address": "University Blvd & Euclid Ave, Tucson, AZ", "lat": null, "lon": null },
    "description": "{ride:tucson-az-the-shootout|The Shootout} is Tucson's fast group ride. The groups leave University and Euclid by pace and head south through the San Xavier Mission district, left at Nogales Highway and Sahuarita Road by Helmet Peak, over to Mission Road and back into town on it. Fair Wheel Bikes, which posts the start times, puts it at about 70 miles for the A group (22 to 28+ mph) and the Scootout (19 to 23); the Old-Old Man group (16 to 20) rides a shorter day. A RideWithGPS version from the university is 59.9 miles and 1,595 feet. Ride it alone any day, or start with the slowest group.",
    "water": null,
    "hazards": "Self-supported: Fair Wheel says bring water, food and flat repair, and know the route before you go. It has a mid-ride stop. To Be Determined's guide says it's casual until Mission Road crosses Valencia, then race pace. The A group is for racers.",
    "links": { "rwgps": "https://ridewithgps.com/routes/6748456", "strava": null, "komoot": null, "gpx": null, "other": "https://www.fairwheelbikes.com/service/group-rides/" },
    "ride_slug": "tucson-az-the-shootout",
    "sources": [
      "https://www.fairwheelbikes.com/service/group-rides/",
      "https://uacycling.com/tucson-routes/",
      "https://www.tobedetermined.cc/journal/ride-guide-tucson-arizona",
      "https://ridewithgps.com/routes/6748456"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "El Tour de Tucson century course",
    "type": "road",
    "miles": 102,
    "elevation_gain_ft": 3000,
    "surface": "Paved road.",
    "difficulty": "epic",
    "start": { "name": "Tucson Convention Center", "address": null, "lat": null, "lon": null },
    "description": "The 102-mile course of El Tour de Tucson, the city's biggest ride, starting and finishing at the Tucson Convention Center. The organizer lists Davis-Monthan Air Force Base, Old Spanish Trail, Colossal Cave, Corona de Tucson, Vail, Sahuarita and Green Valley along the way. The organizer's 2025 route on RideWithGPS is 101.7 miles and 3,007 feet. On event day the century starts at 7 a.m. and the routes close at 4:30 p.m.; the 62- and 32-mile courses start later.",
    "water": "On event day, aid stations about every 12 miles (organizer). Nothing published for riding it on another day.",
    "hazards": "On any other day the roads are open to traffic, and the course runs through Davis-Monthan Air Force Base; check whether you can get through the base before you ride it on your own.",
    "links": { "rwgps": "https://ridewithgps.com/routes/51686479", "strava": null, "komoot": null, "gpx": null, "other": "https://eltourdetucson.org/el-tour-de-tucson/route/" },
    "sources": [
      "https://eltourdetucson.org/el-tour-de-tucson/route/",
      "https://ridewithgps.com/routes/51686479"
    ],
    "verified": "2026-10-03"
  },
  {
    "name": "Sweetwater Preserve trails",
    "type": "mtb",
    "miles": 8,
    "elevation_gain_ft": 500,
    "surface": "Singletrack.",
    "difficulty": "moderate",
    "start": { "name": "Sweetwater Preserve trailhead", "address": null, "lat": 32.2792, "lon": -111.0818 },
    "description": "The most-ridden loop of the Sweetwater trail system, about 7 miles northwest of downtown: Saguaro Vista, Sun Circle, Black Rock, Lost Arrow, Red Canyon and Red Tail Ridge, then Wildflower Ridge back to the trailhead. 7.7 miles and 479 feet, per MTB Project, which calls it mostly easy with a few intermediate sections. Lost Arrow is a sustained climb that's a stretch for a beginner. Dogs on leash; MTB Project lists e-bikes as not allowed.",
    "water": null,
    "hazards": "Shared with hikers and horses (MTB Project).",
    "links": { "rwgps": null, "strava": null, "komoot": null, "gpx": null, "other": "https://www.mtbproject.com/trail/4728806/sweetwater-trail-system" },
    "sources": [
      "https://www.mtbproject.com/trail/4728806/sweetwater-trail-system",
      "https://www.mtbproject.com/directory/8007022"
    ],
    "verified": "2026-10-03"
  }
]
```

## Why these

- **Mount Lemmon** — Zone 1, the signature ride and the climb. Numbers: 27.8 miles from Bike Mount Lemmon's FAQ; 6,774 feet from the same site's Strava page (the MP 0 to Observatory segment) and its listing of GABA's hill climb course, rounded to 6,750. The FAQ itself says 6,276 feet. The segment and the club course win under the rules. Epic by the 6,000-foot rule. The `links.rwgps` page (59.3 mi, 6,866 ft) is the round trip from town; `links.other` carries the climb's own numbers. Hand-offs: **GABA Mt. Lemmon Hill Climb** (`data/calendar-2027.json` id 96, `mt-lemmon-hill-climb`, May 7, 2027 projected) is on this road. **Le Buzz Cafe** is where Bike Mount Lemmon sends drivers to park and where To Be Determined starts the climb, and rides.json has Cactus Cycling's Friday riders stopping there after their ride: a lead for @coffee-scout. **Tucson Tri Girls' "Easy Peasy Lemmon Squeezy"** (a 2025 summer series from mile 0, to Windy Point or Summerhaven) is a lead for @community-scout.
- **The Loop** — Zone 2, the easy one: car-free, join anywhere. The 53.9-mile full circuit makes it "hard" by the distance rule; the editor may want the tile to say "any length". Elevation is null because no county page gives one. The start is the Congress Street crossing because Visit Tucson names it as the downtown join point, with the Mercado under half a mile away. Hand-off: the **Mercado San Agustín** is where the Women's Shootout (`tucson-az-womens-shootout`) starts, and Transit Cycles and Seis Kitchen (already in the file) are in the Mercado district.
- **Cactus Forest Loop Drive** — Zone 3. The short park loop, easy by the rule (8 miles; TBD's 650-foot climb keeps it under 1,000). The NPS page gives no elevation, so the field is null. Fee read Oct 3, 2026 from the NPS fees page (updated Dec 10, 2025). The NPS conditions page (updated Sept 9, 2026) says all east-district roads are open. It belongs in part to `tucson-az-cactus-cycling-friday-saguaro-east-ride` (that ride rotates three 32- to 34-mile routes around the park; none is published), so it's a token in the description, not a `ride_slug`. El Tour also runs Old Spanish Trail past the park.
- **Gates Pass and the McCain Loop** — Zone 4. The west-side climb. I picked the 17.9-mile RideWithGPS loop because its name says what it is. The 38.7-mile version (54251596) is named in the description for the longer day. The hazard line is from the UA cycling team's page, dated Oct 11, 2020; nothing newer on the pavement was found. Hand-off for @eat-scout: **El Guero Canelo** is the food stop on route 54251596 (which location isn't given).
- **The Shootout** — the group-ride route (`tucson-az-the-shootout`). The brief puts it in Zone 5 (north). Fair Wheel, the UA team and To Be Determined all say it heads south, through San Xavier, so it covers the south side here. Miles are Fair Wheel's (about 70 for the A and Scootout groups). Elevation is from the 59.9-mile RideWithGPS version, the only page with a number. Fair Wheel's own route link is a Strava route (login). The road description (left at Nogales Hwy and Sahuarita Rd, by Helmet Peak) is from the UA page (2020), which calls it an update to the route. Fair Wheel Bikes, near the start, is already in the shops list.
- **El Tour century course** — the long one, and Robert's ride: `data/calendar-2027.json` id 482, `el-tour-de-tucson`, `riding: true`, Nov 20, 2027 projected; event page `/events/el-tour-de-tucson/`. Elevation 3,000 is from the organizer's 2025 RideWithGPS route (3,007 ft); `data/events/el-tour-de-tucson.json` says 2,800+. The organizer's route page embeds 2026 RideWithGPS routes (102 mi: 55558194; 62 mi: 55558445; 32 mi: 55558485) that I couldn't open. The editor should swap `links.rwgps` to 55558194 once the verifier opens it.
- **Sweetwater Preserve trails** — Zone 6's dirt ride and the only start with coordinates (MTB Project's trail point, about 7.4 miles from downtown). It's "easy" on numbers (7.7 mi, 479 ft), but the easy grade is for path or quiet road. This is singletrack MTB Project rates intermediate, with a sustained climb, so I graded it moderate. The first fetch's summary added "rocky, cholla, rattlesnakes, heat" to this page. A verbatim re-read showed none of those words, so the hazards line holds only what the page says.

## Rejected

- **RideWithGPS 2921676** "McCain Loop and Gates Pass" (35.2 mi, 1,607 ft). The only description is "BALLS TO THE WALL ONCE YOU HIT AJO!!!". I used 1042796 instead.
- **RideWithGPS 6620806** "GatesPass-Map" (41.7 mi, 2,777 ft). No description or start.
- **RideWithGPS 34404552** "The Tucson Loop with Saguaro Natl Park East" (69.8 mi, 1,768 ft). It's the Loop plus the park loop, both already here. Keep it as a second long day if the editor wants one.
- **Komoot guide 1843468** (road cycling in Saguaro NP). Auto-generated tours from odd start points ("Malcolmson Donation", "Sanctuary Cove"), and no tour URLs in the page. **Komoot guide 3945915** (Pima County passes) has highlights with no numbers.
- **RideWithGPS region and group pages** (24-tucson, 1162 gravel, 1094 Arizona, groups/Tucson, groups/Cycle-Mania). They return only page metadata, no route list.
- **Strava routes**: UA cycling's Pistol Hill, Mt. Lemmon, Foothills, Vistoso, Saddlebrooke, Dove Mountain and Big Square; Fair Wheel's Shootout and TMFR; Bicycle Ranch's Saturday Roundup. A Strava route needs a login, so it can't be cited.
- **MTB Project Cactus Forest Trail** (2.6 mi). The NPS calls it "very thin" with "eroded sections that may make it dangerous for bikers". **Hope Camp Trail** (2.9 mi) is a short out-and-back. I'd take one dirt ride done well over these.
- **MTB Project featured rides** not opened (one MTB route is enough this run; leads below): Honeybee Canyon Loop, Starr Pass Main Loop, Ridgeline Loop, Golder Ranch, Brown Mountain, Lemmon Drop (18.8 mi, 1,928 ft up), Bug Springs, Upper 50-Year Trail.
- **KGUN9 "More Catalina Highway work Thursday"**: March 2021, stale.
- **Arizona Highways, "Seasonal Closures on Mount Lemmon"**: undated. It says the Control roads and other upper-mountain roads gate until March 1 and bicyclists can still use them. That's a lead for gravel, not a source for a route.
- **Guide and listicle sites** (PJAMM, Zeno, Tucson Athlete, FKT, airial.travel, bikeaz.org, tucsonbikerentals.org, AllTrails, Rails to Trails, tucsontopia, tucsonloop.org, Discover Marana, Southern Arizona Guide, Wikipedia): names only, not fetched. arizonabikerides.com was tried, but its robots.txt fetch failed.

## Couldn't confirm

- **Madera Canyon (Zone 6, the south climb).** To Be Determined links an enduranceWERX "Shootout + Madera Canyon" route, RideWithGPS 6933322, which I couldn't open. Cactus Cycling's October 2026 weekend list includes Madera Canyon (rides.json). Where to look: open 6933322; a Strava segment for Madera Canyon Road; cactuscycling.org/Schedule-List.
- **A gravel ride.** Candidates with numbers but no surface, start or water:
  - Redington Pass loop (RideWithGPS 32285634: 105.2 mi, 5,834 ft)
  - "Reddington Pass", Redington to Oracle (58176: 51.5 mi, 4,614 ft)
  - Green Valley Box Canyon Gravel (27099226: 44.6 mi, 3,980 ft)
  - Redington Pass (31329192, a 403)
  - Redington–Mount Lemmon Loop (38726848, not opened)

  RideWithGPS's Tucson gravel page names Redington Pass and the Mount Lemmon Control Road in its description. Where to look: that gravel page in a browser; Coronado National Forest's Santa Catalina district pages for the Control Road; Transit Cycles (gravel focus, already in the file) for its local routes. Sand, washes and water on Redington are the facts a guide needs and none were found.
- **Zone 5, north (Oro Valley, Catalina State Park, Tortolita).** UA cycling's Vistoso, Saddlebrooke and Dove Mountain routes are Strava routes (login). Cactus Cycling's Wednesday Oro Valley ride rotates four 36- to 39-mile routes from Bruegger's on La Cañada (rides.json) with no route page fetched. For dirt: MTB Project's Tortolita Mountain Park (12 trails), Golder Ranch, Honeybee Canyon and Ridgeline (Catalina). Where to look: cactuscycling.org; Bicycle Ranch's rides page.
- **To Be Determined's RideWithGPS routes**, all cited by a fetched page and none openable from here:
  - 1452187: the official Shootout, per TBD and UA cycling
  - 38035607: Lemmon from Le Buzz, 26 mi
  - 41659454: Gates Pass from the AC Hotel downtown
  - 41681488: San Xavier loop
  - 41673361: Loop access to Saguaro East
  - 29260863: the full Loop
  - 41661292: a Loop ride

  Also GABA's El Tour training route 57369192 (rides.json) and Bike Mount Lemmon's 49526678. A verifier with a browser can open these. 41659454 (from a downtown hotel) would make a better Gates Pass entry than 1042796, and 1452187 is the Shootout's own route.
- **Summit food hours on Lemmon.** Bike Mount Lemmon's FAQ (modified March 7, 2025) lists the Cookie Cabin 11 to 5, the general store 10 to 6, Sawmill Run 10 to 5, and a Beyond Bread (7 to 7, "opened in 2024"). These are not 2026 and not from the businesses' own pages, so no hours are in the note. A lead for @eat-scout.
- **Catalina Highway in 2026.** No 2026 construction or fire-restriction notice was found. The only 2026 item is the January winter closure (KOLD, Jan 8, 2026). Where to look: Pima County DOT road alerts, Coronado NF alerts, the hotline (520-351-3351).
- **Coordinates and some addresses.** Only Sweetwater has a lat/lon. Mile 0's address is Bike Mount Lemmon's, not a county page. The Saguaro visitor center address is what NPS gives as the park's address on its basic-info page. The Tucson Convention Center is left null: `data/events/el-tour-de-tucson.json` says 260 S Church Ave, but I didn't re-fetch it. Where to look: the route pages' first track point; the NPS directions page; the TCC's own page.
- **The Shootout's point in rides.json** (`tucson-az-the-shootout`: 32.2627, -110.9495) is about 2.1 miles from the TNR's Old Main point (32.232, -110.9534). Fair Wheel puts the start at University and Euclid, a few blocks from Old Main. The rides.json point looks wrong; the editor should check it.
- **Loop details.** The Pima County parks page doesn't list water, restrooms or parking by park. The county PDF map (content.civicplus.com) was not opened. The About page has a line on e-bikes that the fetch summary garbled, so no e-bike rule is in the note.
- **Goatheads and tubeless** (a watch item in the brief): no local source found.
- **Heat beyond the Loop.** No fetched route page gives a heat line for Lemmon's lower slopes, the park loop, Gates Pass or the Shootout.
- **Sweetwater trailhead**: the address, parking, water and restrooms aren't on the MTB Project page. Where to look: Pima County's Sweetwater Preserve page.
- **Fantasy Island** (MTB Project directory 8012403): the fetch proxy rate-limited it (HTTP 429) and said not to retry.

## Sources

- https://www.fairwheelbikes.com/service/group-rides/
- https://www.pima.gov/162/The-Chuck-Huckelberry-Loop
- https://www.pima.gov/3864/About-The-Loop
- https://www.pima.gov/3780/Parks-on-the-Loop
- https://www.pima.gov/250/Notices-Closures
- https://www.visittucson.org/blog/post/loving-the-loop/
- https://bikemountlemmon.com/
- https://bikemountlemmon.com/faqs
- https://bikemountlemmon.com/strava
- https://bikemountlemmon.com/2025-events
- https://uacycling.com/tucson-routes/
- https://www.tobedetermined.cc/journal/ride-guide-tucson-arizona
- https://ridewithgps.com/routes/1725903
- https://ridewithgps.com/routes/2921676
- https://ridewithgps.com/routes/1042796
- https://ridewithgps.com/routes/54251596
- https://ridewithgps.com/routes/6620806
- https://ridewithgps.com/routes/6748456
- https://ridewithgps.com/routes/34404552
- https://ridewithgps.com/routes/38013971
- https://ridewithgps.com/routes/51686479
- https://ridewithgps.com/routes/32285634
- https://ridewithgps.com/routes/58176
- https://ridewithgps.com/routes/27099226
- https://ridewithgps.com/regions/north_america/us/24-tucson-arizona-usa
- https://ridewithgps.com/regions/north_america/us/1162-gravel-riding-around-tucson-arizona
- https://www.nps.gov/sagu/planyourvisit/bicycling-at-saguaro-national-park.htm
- https://www.nps.gov/sagu/planyourvisit/fees.htm
- https://www.nps.gov/sagu/planyourvisit/conditions.htm
- https://www.nps.gov/sagu/planyourvisit/basicinfo.htm
- https://eltourdetucson.org/el-tour-de-tucson/route/
- https://www.kold.com/2026/01/08/road-mount-lemmon-closed/
- https://www.kgun9.com/traffic/more-catalina-highway-work-thursday
- https://www.arizonahighways.com/blog/seasonal-closures-mount-lemmon-start-week
- https://www.komoot.com/guide/1843468/road-cycling-routes-in-saguaro-national-park
- https://www.komoot.com/ko-kr/guide/3945915
- https://www.mtbproject.com/directory/8011944/saguaro-national-park
- https://www.mtbproject.com/directory/8007022
- https://www.mtbproject.com/trail/4728806/sweetwater-trail-system

Tried and could not open: https://ridewithgps.com/routes/1452187 · https://ridewithgps.com/routes/41659454 · https://ridewithgps.com/routes/57369192 · https://ridewithgps.com/routes/49526678 · https://ridewithgps.com/routes/31329192 (403) · https://veloviewer.com/segment/1364765/Mt+Lemmon+MP+0+to+Observatory · https://www.nps.gov/sagu/planyourvisit/hours.htm · https://www.arizonabikerides.com/rides/220/mt-lemmon-bike-ride-tucson-arizona/ (robots.txt fetch failed) · https://www.mtbproject.com/directory/8012403/fantasy-island (429)
