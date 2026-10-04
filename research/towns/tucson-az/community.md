# tucson-az — community

@community-scout · 2026-10-03

Six clubs and four new ride records. The directory already lists 14 rides
within 15 miles of downtown; I checked every one by slug, city and name, and
none of the four below repeats one. Every fact is from a page fetched this run
(the list is under Sources). I used all eight web searches allowed this run;
the rest came from pages I could name. The `rides` block is also in
`research/towns/tucson-az/rides-proposed.json`, and it passes
`tools/derive-ride-fields.js` and `tools/validate-rides.js --strict` on a copy.

**For the editor**

1. The ride tokens in the clubs block point only at rides already in
   `rides.json`, so the block validates as pasted (`tools/verify-town.js
   --no-fetch` passes on a copy of the town file with these clubs). Once the
   rides block merges, in GABA's note make "easy social rides" into
   `{ride:tucson-az-gaba-tuesday-social-ride|easy social rides}` and "the
   north-side NW rides" into `{ride:tucson-az-gaba-nw-social-rides|the
   north-side NW rides}`, and move GABA's `ride_slug` to
   `tucson-az-gaba-nw-social-rides` (the El Tour training rides stop after the
   race).
2. `inclusive_focus`: the clubs use `women-trans-femme`; `rides.json` stores it
   as `wtf`. No proposed ride carries it.
3. The Cyclovia record has one key the LA shape doesn't: `kind:
   "open-streets"`. Without it derive files it as a group ride. CicLAvia is the
   precedent.
4. With these two, GABA is at the three-rides-per-host cap (the El Tour
   training rides are the third). Held back: Touring Tucson, Wednesday
   Wandering, the Thursday ride from Udall Park, Sunday Funday. All under
   Rejected.
5. A re-check for a listed ride, `tucson-az-bicas-wtf-ride`: BICAS's WTF
   Events page (changed May 10, 2026) now gives the time the record says to
   confirm: gather 6:30 pm, head out at 7, 5 to 10 miles, no-drop. Source
   `https://bicas.org/wtf-events/`. That goes through `tools/rides-apply.js`,
   not this report.
6. Tucson Queer Outdoors is the thinnest club entry: no ride schedule, mostly
   hikes. It is the only LGBTQ+ group I could show is active this fall. Keep or
   drop.
7. RAR Tucson (femme, trans, women and non-binary riders, and BIPOC riders;
   gravel and bikepacking) is the only BIPOC lead. Its page was last changed
   Jan 10, 2025 and it posts on Instagram only, so it is under Couldn't
   confirm.

## Findings

### clubs

```json
[
  {
    "name": "Greater Arizona Bicycling Association (GABA)",
    "url": "https://www.bikegaba.org/",
    "note": "The oldest and largest club in Southern Arizona, in its own words. Leaders post road rides on its Gatherist page most days of the week, from easy social rides at 12 to 14 mph to the north-side NW rides at 14 to 16 mph, which the leaders call no-drop, plus {ride:tucson-az-gaba-el-tour-training-rides|El Tour training rides} in the 11 weeks before the race. Rides cap at about 15, so sign up first; the posts ask riders to join GABA ($25 a year, Oct 2026). Its Bike Swap is Sunday, Nov 15, 2026, 7 am to 1 pm, in the El Con Center lot at 3601 E Broadway.",
    "inclusive_focus": [
      "no-drop"
    ],
    "ride_slug": "tucson-az-gaba-el-tour-training-rides"
  },
  {
    "name": "Cactus Cycling Club",
    "url": "https://www.cactuscycling.org/Schedule-List",
    "note": "A road club running mostly B-level rides, 15 to 17 mph, from starts that move around the valley: {ride:oro-valley-az-cactus-cycling-wednesday-oro-valley-ride|the Oro Valley ride}, {ride:tucson-az-cactus-cycling-friday-saguaro-east-ride|the Saguaro East loop} and {ride:tucson-az-cactus-cycling-weekend-b-rides|the weekend B rides}, most with a coffee or brunch stop after. You must be a member to register, so a visitor takes the free Trial membership (one ride a year), signs the waiver and registers on the club's site first. The club cancels for weather by email.",
    "inclusive_focus": [],
    "ride_slug": "tucson-az-cactus-cycling-friday-saguaro-east-ride"
  },
  {
    "name": "BICAS",
    "url": "https://bicas.org/",
    "note": "The nonprofit community bike shop at 2001 N 7th Ave: fix your own bike on its stands with a mechanic's help, buy used parts or a refurbished bike, or rent one. Open Thursday to Sunday, 11 am to 6 pm; Mondays 3 to 7 pm are the Women, Trans and Femme Workshop, with the tools free that night, and {ride:tucson-az-bicas-wtf-ride|the monthly WTF ride} leaves after it. BICAS says it is at risk of closing or pausing for lack of money, so call 520-628-7950 before you go.",
    "inclusive_focus": [
      "women-trans-femme"
    ],
    "ride_slug": "tucson-az-bicas-wtf-ride"
  },
  {
    "name": "FUGA (Familias Unidas Ganando Accesibilidad)",
    "url": "https://www.fugatucson.org/",
    "note": "Runs two free monthly community rides, posted in English and Spanish: {ride:tucson-az-fuga-bicis-y-burros-second-sunday-ride|Bicis y Burros} from the Ward 1 Office on the west side and {ride:tucson-az-fuga-southside-ride|Bicicleteada del Sur} from El Pueblo Center on the south side. No bike? FUGA reserves a TUGO bike share for free: 520-261-5446. Free bike repair once a month at the Ward 1 Office, 940 W Alameda St.",
    "inclusive_focus": [],
    "ride_slug": "tucson-az-fuga-bicis-y-burros-second-sunday-ride"
  },
  {
    "name": "Sonoran Desert Mountain Bicyclists (SDMB)",
    "url": "https://www.sdmb.org/",
    "note": "The mountain bike club: it builds and looks after the singletrack around Tucson with Pima County, Marana, the city and the Coronado National Forest. No weekly ride; its public calendar has fall trail work days at Sweetwater, Tucson Mountain Park and Fantasy Island, a Thirsty Thursday at a bar most months, and an all-ladies skills clinic on Oct 24, 2026 at the new 100-Acre Wood Bike Park, 2801 S Alvernon Way.",
    "inclusive_focus": []
  },
  {
    "name": "Tucson Queer Outdoors",
    "url": "https://linktr.ee/tucsonqueeroutdoors",
    "note": "An outdoors group for LGBTQ+ people and allies. Mostly hikes and camping trips, with the odd bike ride; there's no ride schedule. Events go up on its Instagram, @tucsonqueeroutdoors; this fall's include an evening hike up Tumamoc Hill on Oct 30, 2026.",
    "inclusive_focus": [
      "lgbtq"
    ]
  }
]
```

### rides

```json
[
  {
    "slug": "tucson-az-gaba-nw-social-rides",
    "name": "GABA NW Social Rides",
    "city": "Tucson",
    "state": "AZ",
    "neighborhood": "Catalina Foothills and Oro Valley (the start alternates)",
    "lat": 32.22288,
    "lng": -110.97485,
    "geo_precision": "city",
    "discipline": [
      "road"
    ],
    "schedule": "Thursdays and Saturdays, posted ride by ride on GABA's Gatherist page as NW plus a route number and the leader's name (Cliff's NW07, Auvie's NW10). Start times move with the heat; the last few have rolled at 7:00 am. Two usual starts: St. Philip's Plaza (southeast corner of the south lot, 4300 N Campbell Ave) and the lot south of Bruegger's Bagels, 11143 N La Cañada Dr, Oro Valley.",
    "days": [
      "thu",
      "sat"
    ],
    "time_local": "7:00 am",
    "frequency": "irregular",
    "season": null,
    "start_location": {
      "name": "Alternates: St. Philip's Plaza, south lot (4300 N Campbell Ave, Tucson) or the lot south of Bruegger's Bagels (11143 N La Cañada Dr, Oro Valley); the post for each ride says which",
      "address": null
    },
    "distance_miles": "30–41",
    "duration": "about 3 hours",
    "pace": "C+ on GABA's scale: 14 to 16 mph, about 15 mph average at the end; mostly minor hills",
    "drop_policy": "no-drop",
    "host": {
      "name": "Greater Arizona Bicycling Association (GABA)",
      "type": "club"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": "GABA membership, $25 a year for one person (Oct 2026); the ride posts ask riders who aren't members to join",
    "description": "GABA's north-side social road rides, posted as NW plus a route number: 30 to 41 miles at 14 to 16 mph, with coffee after at Ren's or Bruegger's. Leaders call them social, no-drop, base-building rides, with a sweep at the back and set spots to ride your own pace. Each is capped at about 15 riders, so sign up on Gatherist, text the leader your emergency contact if you're new, and come 15 minutes early to sign the waiver. No earbuds.",
    "links": {
      "website": "https://gatherist.org/groups/greater-arizona-bicycle-association-gaba",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": [
        "https://www.bikegaba.org/content.aspx?page_id=22&club_id=307669&module_id=780113"
      ]
    },
    "inclusive_focus": [
      "no-drop"
    ],
    "sources": [
      "https://gatherist.org/groups/greater-arizona-bicycle-association-gaba",
      "https://gatherist.org/events/1086",
      "https://gatherist.org/events/1073",
      "https://gatherist.org/events/1068",
      "https://gatherist.org/events/1045",
      "https://www.bikegaba.org/content.aspx?page_id=60&club_id=307669"
    ],
    "verified_on": "2026-10-03",
    "confidence": "high",
    "tz": "America/Phoenix",
    "start_hhmm": "07:00",
    "duration_min": 180,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "tucson-az-gaba-tuesday-social-ride",
    "name": "GABA Tuesday Social Ride",
    "city": "Tucson",
    "state": "AZ",
    "neighborhood": "Start changes (the Rillito path, St. Philip's Plaza, the east side)",
    "lat": 32.22288,
    "lng": -110.97485,
    "geo_precision": "city",
    "discipline": [
      "road"
    ],
    "schedule": "Tuesday mornings, posted ride by ride on GABA's Gatherist page, with a different leader, route and start most weeks. One has gone up for every Tuesday since the first week of August 2026 (one was cancelled). Next listed: Tue Oct 6, 7:00 am, Two Bridges, from the Rillito River Path parking at Craycroft Rd. Recent starts: Craycroft and the Rillito path, River and Campbell (St. Philip's Plaza), Michael Perry Park at 2755 S Pantano Pkwy, Margie's Kitchen, Viv's Cafe.",
    "days": [
      "tue"
    ],
    "time_local": "7:00 am",
    "frequency": "irregular",
    "season": null,
    "start_location": {
      "name": "Changes by week. Oct 6, 2026: Craycroft Rd and the Rillito River Path parking (water and bathrooms)",
      "address": null
    },
    "distance_miles": "25–42",
    "duration": null,
    "pace": "C on GABA's scale: an end-of-ride average of 12 to 14 mph (some leaders say 13 to 15); flat to minor hills",
    "drop_policy": "unknown",
    "host": {
      "name": "Greater Arizona Bicycling Association (GABA)",
      "type": "club"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": "GABA membership, $25 a year for one person (Oct 2026); some leaders require it, others ask you to join",
    "description": "GABA's easiest regular road ride: a social pace of 12 to 14 mph for 25 to 42 miles, much of it on the Loop. The leader, route and start change most weeks, so read the Gatherist post for the Tuesday you want. Rides cap at 15 or so riders; sign up, send the leader your emergency contact if you're new, and come 15 minutes early for the waiver. Every leader asks for a sweep at the back, and some call the ride no-drop.",
    "links": {
      "website": "https://gatherist.org/groups/greater-arizona-bicycle-association-gaba",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": [
        "https://gatherist.org/events/1096"
      ]
    },
    "inclusive_focus": [],
    "sources": [
      "https://gatherist.org/events/1096",
      "https://gatherist.org/events/1060",
      "https://gatherist.org/events/1036",
      "https://gatherist.org/events/992",
      "https://gatherist.org/events/950",
      "https://gatherist.org/events/1061",
      "https://www.bikegaba.org/content.aspx?page_id=60&club_id=307669"
    ],
    "verified_on": "2026-10-03",
    "confidence": "high",
    "tz": "America/Phoenix",
    "start_hhmm": "07:00",
    "duration_min": null,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "tucson-az-transit-cycles-third-thursday-ride",
    "name": "Third Thursday Westside Community Ride",
    "city": "Tucson",
    "state": "AZ",
    "neighborhood": "Mercado District",
    "lat": 32.2178,
    "lng": -110.9845,
    "geo_precision": "start",
    "discipline": [
      "social"
    ],
    "schedule": "Third Thursday of the month. Meet 5:30 pm at the MSA Annex for a pre-ride drink at Westbound; roll about 6:10 pm. The shop's page says its monthly ride is getting a refresh, so check the shop's Instagram before you go.",
    "days": [
      "thu"
    ],
    "time_local": "5:30 pm (rolls about 6:10 pm)",
    "frequency": "monthly",
    "season": null,
    "start_location": {
      "name": "MSA Annex (Transit Cycles)",
      "address": "267 S Avenida del Convento, Bldg 10, Tucson, AZ 85745"
    },
    "distance_miles": "about 10",
    "duration": null,
    "pace": "moderate; about 30 to 40 minutes to the brewery",
    "drop_policy": "unknown",
    "host": {
      "name": "Transit Cycles (with Dragoon Brewing Company)",
      "type": "shop"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": "free; the shop's page says your first beer at Dragoon is a dollar, n/a or 0.0% included (page last updated May 2026)",
    "description": "Transit Cycles' monthly evening cruise from the Mercado District: meet at the MSA Annex, say hi in the shop, then ride about 10 miles at a moderate pace to Dragoon Brewing. Bring a helmet, lights, water and cash; food trucks are sometimes there. The shop says the ride is getting a refresh, so confirm on its Instagram before you go.",
    "links": {
      "website": "https://www.transitcycles.com/events-1",
      "instagram": "http://instagram.com/transitcycles",
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": []
    },
    "inclusive_focus": [],
    "sources": [
      "https://www.transitcycles.com/events-1",
      "https://www.transitcycles.com/sitemap.xml"
    ],
    "verified_on": "2026-10-03",
    "confidence": "medium",
    "tz": "America/Phoenix",
    "start_hhmm": "18:10",
    "duration_min": null,
    "season_months": null,
    "monthly_rule": [
      {
        "ord": 3,
        "day": "thu"
      }
    ]
  },
  {
    "slug": "tucson-az-cyclovia-tucson",
    "name": "Cyclovia Tucson",
    "kind": "open-streets",
    "city": "Tucson",
    "state": "AZ",
    "neighborhood": "South Tucson and downtown (fall 2026 route)",
    "lat": 32.22288,
    "lng": -110.97485,
    "geo_precision": "city",
    "discipline": [
      "social"
    ],
    "schedule": "Twice a year on a Sunday, 9:00 am to 3:00 pm, on car-free streets; the route changes each time. Next: Sun Oct 25, 2026, connecting South Tucson and downtown. The spring 2026 event was Sun Apr 12, through West University, Feldman's, Sugar Hill, Keeling and Amphi.",
    "days": [
      "sun"
    ],
    "time_local": "9:00 am",
    "frequency": "irregular",
    "season": "year-round",
    "start_location": {
      "name": "No single start; join anywhere on the route. Oct 25, 2026: South Tucson to downtown",
      "address": null
    },
    "distance_miles": null,
    "duration": "9 am to 3 pm",
    "pace": "ride, walk, skate or roll at your own pace",
    "drop_policy": "unknown",
    "host": {
      "name": "Living Streets Alliance",
      "type": "nonprofit"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": "free",
    "description": "Living Streets Alliance closes a few miles of Tucson streets to cars twice a year and opens them to people walking, biking, skating and rolling. The fall 2026 event is the 25th, on 2.25 miles from South Tucson to downtown; the host counts about 40,000 people, with food trucks, activities, free mobile bike repair and free helmets. Free, all ages and abilities, and you can join anywhere on the route.",
    "links": {
      "website": "https://cycloviatucson.org/",
      "instagram": "https://www.instagram.com/cycloviatucson",
      "facebook": "https://www.facebook.com/CycloviaTucson",
      "strava": null,
      "meetup": null,
      "other": [
        "https://www.livingstreetsalliance.org/events/cyclovia-tucson-fall-2026"
      ]
    },
    "inclusive_focus": [],
    "sources": [
      "https://cycloviatucson.org/",
      "https://www.livingstreetsalliance.org/events/cyclovia-tucson-fall-2026",
      "https://www.livingstreetsalliance.org/events/cyclovia-spring-2026",
      "https://www.livingstreetsalliance.org/events"
    ],
    "verified_on": "2026-10-03",
    "confidence": "high",
    "tz": "America/Phoenix",
    "start_hhmm": "09:00",
    "duration_min": null,
    "season_months": null,
    "monthly_rule": null
  }
]
```

## Why these

**Clubs**

- **GABA:** the one club with a ride most days. Its NW and Tuesday rides are
  the easiest way for a visitor to ride with locals at a known pace, and the
  Bike Swap falls the Sunday before El Tour.
- **Cactus Cycling Club:** four B-level rides a week, out to Saguaro East,
  Oro Valley and Sahuarita, with coffee or brunch after. The trial membership
  gets a visitor one ride free.
- **BICAS:** the co-op. A visitor with a broken bike can fix it here Thursday
  to Sunday; Monday is the WTF workshop, and the monthly WTF ride leaves from
  it.
- **FUGA:** the west- and south-side community rides. Free, in English and
  Spanish, and a free TUGO bike for anyone who flew in without one.
- **SDMB:** the mountain bike people. No weekly ride, but its calendar is where
  trail days, clinics and the new bike park show up.
- **Tucson Queer Outdoors:** the LGBTQ+ outdoors group that is active now;
  where a queer visitor finds company, on a bike now and then.

**Rides**

- **GABA NW Social Rides:** 30 to 41 miles at 14 to 16 mph on the north side,
  no-drop in the leaders' words, ending at a coffee shop. A ride went up for
  every Thursday and Saturday from Aug 1 to Oct 3, 2026: 19 posts, 19 days.
- **GABA Tuesday Social Ride:** the slowest regular road ride on GABA's
  calendar, much of it on the Loop. A ride went up for every Tuesday from
  Aug 4 to Oct 6, 2026; one (Sept 29) was cancelled.
- **Third Thursday Westside Community Ride:** an evening cruise to a brewery
  from the shop beside the Loop on the west side. Medium: the page carries no
  date (the shop's sitemap says it last changed May 12, 2026) and says the ride
  is getting a refresh.
- **Cyclovia Tucson:** car-free streets twice a year. The fall one, Oct 25,
  2026, falls in the visiting season.

## Rejected

- **Critical Mass Tucson.** criticalmass.in shows no ride, photo or post from
  Tucson in six months and no next ride (read Oct 3, 2026).
- **Living Streets Alliance as a club entry.** Its ride is Cyclovia (in the
  rides block); the rest of its calendar is mobile bike repair at schools and
  volunteer nights.
- **GABA series held back for the per-host cap** (all real, all on Gatherist):
  Touring Tucson (flat, social, no-drop rides of 18 to 31 miles on some
  Thursdays and Sundays; the post says members only, for the club's
  insurance), Wednesday Wandering (51 to 57 miles, harder hills), the Thursday
  ride from Udall Park (C pace, 28 to 36 miles), Sunday Funday (53 to 64
  miles).
- **Ride On Cycling.** Its Strava club links rideoncycling.club, which doesn't
  resolve, and the club is request-to-join.
- **Ben's Bikes of Tucson (Rita Ranch).** Its site lists no ride now. A 2023
  list had a Monday mountain bike ride.
- **The group-ride list on tucsonbikerentals.org.** Last updated Oct 4, 2023.
  Leads only: the JKG group (Thursday from Le Buzz, Wednesday from Udall Park),
  Monday Night Mash, Heavy Pedal, a Tuesday fixed-gear ride, Tucson Bike Polo,
  a women's ride from Performance Bicycle.
- **El Tour de Tucson's training page.** A paid virtual plan, not a group ride.
- **Queer WTFNB Bike Ride (Meetup).** It is in Ypsilanti, Michigan.
- **Tucson Riders 4 The Cure, El Mercado Ride.** Still one Meetup event (Sun
  Oct 4), with 6:30 pm in the feed and a morning start in the text. Nothing
  shows it repeats.
- **Epic Rides' Strava club.** An events company (24 Hours in the Old Pueblo),
  not a ride.
- **El Grupo Youth Cycling.** Youth programs; its Fall Fondo is an event
  (hand-off below).
- **Not re-checked, still out from the Sept 30 sweep**
  (`research/rides/az/az-tucson-north-state.md`): University of Arizona
  Cycling (not public), Vistoso Cyclists (residents), Sabino Cycles (rides on
  hold), Fair Wheel's Sunday women's ride (ended), Project Bike Club (paid
  youth programs).

## Couldn't confirm

| Who | What I saw | Missing | Where to look |
|---|---|---|---|
| RAR Tucson (Radical Adventure Riders) | Chapter page: "a supportive space for FTWN-B and BIPOC riders of all experiences and fitness levels"; gravel and bikepacking; four people in its core group | Any ride, any 2026 date. The page was last changed Jan 10, 2025 (WordPress API) | instagram.com/rar.tucson · tucson.rar@gmail.com |
| Tucson Sundaze Ride (TSDR) | Strava club: "Intermediate group ride on Sunday mornings". Transit Cycles' page (changed May 2026): 7:00 am, Highland Underpass, UA campus | The time and place on the host's own page; the Strava event is behind a login | strava.com/clubs/TSDR. Medium if the editor takes Transit's page as enough |
| Dragonfly Rides, Full Moon Ride | Transit Cycles' page: nearly every full moon from Tucson Hop Shop to Bear Canyon along the Loop, about 20 miles, no-drop, all bikes | Dates (Instagram only). hopflycycling.org failed to connect; Hop Shop's pages don't mention the ride | instagram.com/dragonflyrides |
| Tucson Velo | Club rides page: Saturdays, 40 to 50 miles, speed groups from 14–16 to 18–21 mph, start time set by the forecast | Any ride: its calendar is empty for August, September and October 2026 | tusvelo.com/events · strava.com/clubs/TusVelo |
| Tucson Women Shredders | Women's mountain bike group, monthly rides in Tucson Mountain Park and Catalina State Park, "WTF (women, trans, femme) friendly" (This Is Tucson) | A page of its own; any 2026 date | Its Instagram, linked from the This Is Tucson bike-groups article |
| Saddlebrooke Cyclemasters | Site has Saturday Ride and Start Times pages; the text doesn't load (frames or images). Home page lists a Sept 22 meeting and a 2027 trip | Who can ride; day, time, start | saddlebrookecyclemasters.org, in a browser |
| SDMB group rides | This Is Tucson says SDMB runs group rides every month | Its own calendar shows clinics, trail days and socials, no open ride | sdmb.org/events (a public Google Calendar) |
| Monday Night Mash; JKG group | Named on the 2023 list | Everything | Facebook |

## Hand-offs

- **@coffee-scout:** Ren's Coffeehouse (after GABA's NW rides from St.
  Philip's Plaza); Bruegger's Bagels, 11165 N La Cañada Dr, Oro Valley (NW
  rides and Cactus's Wednesday ride start there); LeBuzz on Tanque Verde Rd
  (after Cactus's Friday ride); Westbound at the MSA Annex (Third Thursday
  pre-ride); Pour My Coffee (a stop on GABA's velodrome ride); Viv's Cafe and
  Margie's Kitchen (GABA Tuesday starts). Tucson Hop Shop, 3230 N Dodge Blvd,
  on the Rillito path, says "bike friendly" on its home page (a bar; for
  @culture-scout too).
- **@route-scout:** Fair Wheel Bikes' road, gravel and leisure route pages
  (linked from its group-rides page); GABA's "Local Ride Favorites" route bank
  (GABA says some links are broken); RideWithGPS route 57382896 (GABA's Two
  Bridges ride on the Rillito and Santa Cruz paths); SDMB's trails page; the
  100-Acre Wood Bike Park, 2801 S Alvernon Way (grand opening Oct 19, 2026 on
  SDMB's calendar).
- **@shop-scout:** Bicycle Ranch's Roundup page (as of Sept 19, 2026, back
  after a long delay, 6:30 am); Ben's Bikes of Tucson (Rita Ranch,
  veteran-owned); BICAS's warning that it may close or pause.
- **Editor, 2027 calendar:** El Grupo Fall Fondo (Sun Nov 8, 2026, for El
  Grupo Youth Cycling; not on the 2027 calendar); GABA Bike Swap (twice a year:
  Nov 15, 2026, and Apr 19, 2026 on SDMB's calendar); Zia Old Tucson 10'er
  (Jan 16, 2027 on SDMB's calendar; organizer page not opened). Cyclovia is in
  the rides block.

## Sources

Clubs, shops and nonprofits
- https://www.bikegaba.org/
- https://www.bikegaba.org/content.aspx?page_id=22&club_id=307669&module_id=780113
- https://bikegaba.org/content.aspx?page_id=4002&club_id=307669&item_id=2956941&eml=1&actr=3
- https://www.bikegaba.org/content.aspx?page_id=60&club_id=307669
- https://www.bikegaba.org/content.aspx?page_id=22&club_id=307669&module_id=398377 (no prices in the text)
- https://gatherist.org/groups/greater-arizona-bicycle-association-gaba
- https://gatherist.org/events/1086
- https://gatherist.org/events/1073
- https://gatherist.org/events/1068
- https://gatherist.org/events/1045
- https://gatherist.org/events/1096
- https://gatherist.org/events/1060
- https://gatherist.org/events/1061
- https://gatherist.org/events/1036
- https://gatherist.org/events/992
- https://gatherist.org/events/950
- https://gatherist.org/events/1062
- https://gatherist.org/events/1063
- https://gatherist.org/events/1085
- https://gatherist.org/events/1089
- https://gatherist.org/events/1020
- https://gatherist.org/events/1029
- https://gatherist.org/events/975
- https://gatherist.org/events/900 to https://gatherist.org/events/1110 (every id read for title, host and date; 63 GABA events dated Aug 1 to Nov 15, 2026)
- https://www.meetup.com/bikegaba/events/ical/
- https://www.cactuscycling.org/Guests
- https://www.cactuscycling.org/Schedule-List
- https://bicas.org/
- https://bicas.org/women-trans-femme/
- https://bicas.org/wtf-events/
- https://www.fugatucson.org/
- https://www.fugatucson.org/events
- https://www.sdmb.org/
- https://www.sdmb.org/events
- https://www.sdmb.org/calendar-widget
- https://calendar.google.com/calendar/ical/2bosdd21tb6dsg6qmnt8uijgm8%40group.calendar.google.com/public/basic.ics (SDMB's public calendar, embedded on sdmb.org/events)
- https://www.transitcycles.com/events-1
- https://www.transitcycles.com/sitemap.xml
- https://www.fairwheelbikes.com/service/group-rides/
- https://www.bicycleranchtucson.com/articles/group-rides-pg68.htm
- https://www.bensbikestucson.com/
- https://www.bensbikes.com/ (failed to connect)
- https://www.tusvelo.com/events/ (and ?mo=8, 9 and 10, yr=2026)
- https://www.tusvelo.com/about/club-rides/
- http://saddlebrookecyclemasters.org/
- https://saddlebrookecyclemasters.org/membershipNew.php
- https://saddlebrookecyclemasters.org/SaturdayRideNew.php
- https://www.elgrupocycling.org/calendar
- https://www.meetup.com/tr4tc_az/events/ical/

Open streets
- https://www.livingstreetsalliance.org/
- https://www.livingstreetsalliance.org/events
- https://www.livingstreetsalliance.org/events/cyclovia-tucson-fall-2026
- https://www.livingstreetsalliance.org/events/cyclovia-spring-2026
- https://cycloviatucson.org/
- https://cycloviatucson.org/overview
- https://cycloviatucson.org/participate
- https://criticalmass.in/tucson

Queer, women/trans/femme and BIPOC leads
- https://radicaladventureriders.com/chapters/tucson
- https://radicaladventureriders.com/wp-json/wp/v2/pages?slug=tucson&_fields=modified,date,link
- https://www.tucsonspotlight.org/tucson-queer-outdoors-builds-community-beyond-nightlife/
- https://linktr.ee/tucsonqueeroutdoors
- https://www.eventbrite.com/e/tucson-queer-outdoors-silent-disco-hike-tickets-2002399160793
- https://tucsonloveletter.com/articles/queer-tucson/ (bot wall)
- https://www.meetup.com/wtfnb-bike-ride/
- https://www.instagram.com/rar.tucson/, /tucsonqueeroutdoors/, /dragonflyrides/, /bicas_wtf/, /tucson_women_shredders/ (login wall; nothing read)
- https://www.hopflycycling.org/ (failed to connect)
- https://www.tucsonhopshop.com/
- https://www.tucsonhopshop.com/events

Strava
- https://www.strava.com/clubs/TSDR
- https://www.strava.com/clubs/314302
- https://www.strava.com/clubs/163811
- https://www.strava.com/clubs/73667
- http://www.rideoncycling.club/ (does not resolve)

Leads only, not sources of record
- https://thisistucson.com/local-bike-groups/article_5333e91e-8ede-11ee-bc7e-6f64f9ce4e37.html
- https://www.tucsonbikerentals.org/group-rides/ (last updated Oct 4, 2023)
- https://eltourdetucson.org/
- https://eltourdetucson.org/training/

Geocoding
- https://nominatim.openstreetmap.org/search?format=json&q=267+S+Avenida+del+Convento,+Tucson,+AZ+85745
