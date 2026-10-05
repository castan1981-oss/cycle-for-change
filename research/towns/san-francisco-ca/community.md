# san-francisco-ca — community

@community-scout · 2026-10-03

Six clubs and three new ride records. Every fact below is from a page fetched
this run (the list is under Sources). Search ran out: the session cap of eight
searches was spent, and the fetcher refused pages that hadn't come up in a
search (Strava club pages, Rapha's events page, Mike's Bikes' events page), so
those are under Couldn't confirm. The seven SF rides already in the directory
(Different Spokes Jersey Ride, Butterlap, three Fat Cake rides, Hummingbird,
Critical Mass) and Friday Ride Day in Sausalito are not re-proposed.

Three things for the editor:

- The `clubs` notes name the three proposed rides by token. Merge
  `rides-proposed.json` into rides.json (derive, geocode) before the clubs go
  in, or `build-events.js` fails on the slugs.
- `inclusive_focus` words differ by file: clubs take `women-trans-femme`, the
  rides build takes `wtf`. The host of the Friday ride says "women &
  nonbinary"; I mapped that to `women-trans-femme` / `wtf`. Your call.
- `lat`/`lng` are null on all three rides (scouts leave them to
  `tools/geocode-rides.js`). The Fat Cake wildcard ride has two possible starts
  and no address, so it will fall back to the city centre.

## Findings

### clubs

```json
[
  {
    "name": "Different Spokes San Francisco",
    "url": "https://dssf.org/",
    "note": "The Bay Area's recreational bicycling club for the LGBTQ+ community and friends, in its own words, with routes for every level. {ride:san-francisco-ca-different-spokes-jersey-ride|The Jersey Ride} is the club ride, with lunch in Tiburon; other Saturday rides leave Jane Warner Plaza in the Castro, and the route is on the club calendar. Guests ride three times on a waiver, then join.",
    "inclusive_focus": [
      "lgbtq"
    ],
    "ride_slug": "san-francisco-ca-different-spokes-jersey-ride"
  },
  {
    "name": "Fat Cake Club",
    "url": "https://www.fatcake.cc/rides",
    "note": "Early rides that end at a bakery. {ride:san-francisco-ca-fat-cake-club-monday-ftwnb-ride|The FTWNB ride} from the Conservatory of Flowers is for femme, trans, women and non-binary riders, with allies asked along the first Monday of the month; {ride:san-francisco-ca-fat-cake-club-tuesday-headlands-arsicault|Headlands and Arsicault} and {ride:san-francisco-ca-fat-cake-club-first-thursday-donut-alley|Donut Alley} leave the bridge, and {ride:san-francisco-ca-fat-cake-club-thursday-wildcard|the wildcard ride} starts at the park or the bridge, posted on Instagram. Sign the waiver on the site before your first ride; ride calls land on the club's Strava first.",
    "inclusive_focus": [
      "women-trans-femme"
    ],
    "ride_slug": "san-francisco-ca-fat-cake-club-monday-ftwnb-ride"
  },
  {
    "name": "Women and Non-Binary Bike SF",
    "url": "https://sfbike.org/events/category/membership-2/women-bike-sf/",
    "note": "A free social ride for women and non-binary riders, slow enough to talk, and in the host's words no rider left behind. {ride:san-francisco-ca-women-and-non-binary-bike-sf-friday-morning-ride|The ride} leaves McLaren Lodge at the Stanyan Street entrance to Golden Gate Park and takes the park's car-free roads out to Sunset Dunes and back. Show up; no RSVP. It is on the SF Bicycle Coalition calendar but run by riders, not the coalition.",
    "inclusive_focus": [
      "women-trans-femme",
      "no-drop"
    ],
    "ride_slug": "san-francisco-ca-women-and-non-binary-bike-sf-friday-morning-ride"
  },
  {
    "name": "San Francisco Bicycle Coalition",
    "url": "https://sfbike.org/events/",
    "note": "The city's bike advocacy group. Its events calendar is where community rides go up; October 2026 has a Filipino-American History Month ride, an accessible ride in Golden Gate Park, a family ride with the fire department and adult learn-to-ride classes. Bike It Forward, a community repair night, runs every Tuesday 5 to 7 pm at the office, 1720 Market St.",
    "inclusive_focus": []
  },
  {
    "name": "Bike Kitchen",
    "url": "https://bikekitchen.org/",
    "note": "The non-profit co-op that teaches bike repair, at 650 Florida St, Suite H, between 18th and 19th. Day use is $5; a year's membership is $40 to $100 on a sliding scale, or six volunteer hours (Oct 2026). Open Tuesday and Wednesday 6 to 9 pm and Saturday 9 am to noon; Monday 6:30 to 9 pm is Women/Trans/Fem/Non-Binary Night (hours posted for the week of Jan 25, 2026). 415-506-7433.",
    "inclusive_focus": [
      "women-trans-femme"
    ]
  },
  {
    "name": "San Francisco Cycling Club",
    "url": "https://www.sfcyclingclub.org/",
    "note": "A club with its own races and members-only weekday rides. {ride:san-francisco-ca-sf-cycling-club-friday-coffee-ride|The Coffee Ride} is the one open to everyone: a spin around the city from Fell and Baker that ends with coffee at The Mill. Joining takes three member endorsements and $100 a year (Oct 2026).",
    "inclusive_focus": [],
    "ride_slug": "san-francisco-ca-sf-cycling-club-friday-coffee-ride"
  }
]
```

### rides

```json
[
  {
    "slug": "san-francisco-ca-women-and-non-binary-bike-sf-friday-morning-ride",
    "name": "Women and Non-Binary Bike SF Friday Morning Ride",
    "city": "San Francisco",
    "state": "CA",
    "neighborhood": "Golden Gate Park",
    "lat": null,
    "lng": null,
    "geo_precision": "start",
    "discipline": [
      "social"
    ],
    "schedule": "Second and fourth Fridays of the month; gather 7:15 am, depart 7:30 am, back by 8:45 am",
    "days": [
      "fri"
    ],
    "time_local": "7:15 am (departs 7:30 am)",
    "frequency": "monthly",
    "season": "year-round",
    "start_location": {
      "name": "McLaren Lodge, Golden Gate Park",
      "address": "501 Stanyan St, San Francisco, CA 94117"
    },
    "distance_miles": null,
    "duration": "about 75 minutes (7:30 to 8:45 am)",
    "pace": "social; in the host's words, slow enough to talk without getting out of breath",
    "drop_policy": "no-drop",
    "host": {
      "name": "Women and Non-Binary Bike SF",
      "type": "informal"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": "free",
    "description": "A social ride for women and non-binary riders from McLaren Lodge, at the east end of Golden Gate Park. It takes the park's car-free roads out to Sunset Dunes to see the beach, stops for a snack and is back by 8:45. The host says the pace is slow enough to talk and no rider gets left behind. Free, no RSVP; it is listed on the SF Bicycle Coalition calendar but run by riders, not the coalition.",
    "links": {
      "website": "https://sfbike.org/events/category/membership-2/women-bike-sf/",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": [
        "https://sfbike.org/event/women-and-non-binary-bike-sf-friday-morning-ride-2/2026-10-09/"
      ]
    },
    "inclusive_focus": [
      "wtf",
      "no-drop"
    ],
    "sources": [
      "https://sfbike.org/event/women-and-non-binary-bike-sf-friday-morning-ride-2/2026-10-09/",
      "https://sfbike.org/events/category/membership-2/women-bike-sf/",
      "https://sfbike.org/events/"
    ],
    "verified_on": "2026-10-03",
    "confidence": "high",
    "tz": "America/Los_Angeles",
    "start_hhmm": "07:30",
    "duration_min": 75,
    "season_months": null,
    "monthly_rule": [
      {
        "ord": 2,
        "day": "fri"
      },
      {
        "ord": 4,
        "day": "fri"
      }
    ]
  },
  {
    "slug": "san-francisco-ca-sf-cycling-club-friday-coffee-ride",
    "name": "The Coffee Ride (San Francisco Cycling Club)",
    "city": "San Francisco",
    "state": "CA",
    "neighborhood": "Fell & Baker",
    "lat": null,
    "lng": null,
    "geo_precision": "start",
    "discipline": [
      "road"
    ],
    "schedule": "Every Friday, 6:15 am, from Fell & Baker; ends with coffee at The Mill",
    "days": [
      "fri"
    ],
    "time_local": "6:15 am",
    "frequency": "weekly",
    "season": "year-round",
    "start_location": {
      "name": "Fell St & Baker St",
      "address": "Fell St & Baker St, San Francisco, CA"
    },
    "distance_miles": null,
    "duration": null,
    "pace": "a morning spin around the city; the club calls it all inclusive",
    "drop_policy": "unknown",
    "host": {
      "name": "San Francisco Cycling Club",
      "type": "club"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": "open to all; no fee stated",
    "description": "San Francisco Cycling Club's one ride open to everyone: a Friday morning spin around the city from the corner of Fell and Baker, ending with coffee at The Mill. The club calls it all inclusive and a good ride to meet members and make weekend plans. Its Tuesday to Thursday rides are for members only.",
    "links": {
      "website": "https://www.sfcyclingclub.org/",
      "instagram": null,
      "facebook": null,
      "strava": "https://www.strava.com/clubs/SanFranciscoCyclingClub",
      "meetup": null,
      "other": []
    },
    "inclusive_focus": [],
    "sources": [
      "https://www.sfcyclingclub.org/"
    ],
    "verified_on": "2026-10-03",
    "confidence": "medium",
    "tz": "America/Los_Angeles",
    "start_hhmm": "06:15",
    "duration_min": null,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "san-francisco-ca-fat-cake-club-thursday-wildcard",
    "name": "Fat Cake Thursday Wildcard",
    "city": "San Francisco",
    "state": "CA",
    "neighborhood": "Golden Gate Park or the Golden Gate Bridge",
    "lat": null,
    "lng": null,
    "geo_precision": "start",
    "discipline": [
      "road"
    ],
    "schedule": "Thursdays, 6:30 am, from the Conservatory of Flowers in Golden Gate Park or the Golden Gate Bridge pavilion (the start and the bakery are posted on Instagram); the first Thursday is Donut Alley, listed separately",
    "days": [
      "thu"
    ],
    "time_local": "6:30 am",
    "frequency": "weekly",
    "season": "year-round",
    "start_location": {
      "name": "Conservatory of Flowers, Golden Gate Park, or the Golden Gate Bridge pavilion (posted on Instagram)",
      "address": null
    },
    "distance_miles": "15–30",
    "duration": null,
    "pace": null,
    "drop_policy": "unknown",
    "host": {
      "name": "Fat Cake Club",
      "type": "club"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": null,
    "description": "Fat Cake Club's Thursday dawn ride. It leaves at 6:30 from the Conservatory of Flowers in Golden Gate Park or from the Golden Gate Bridge pavilion, runs 15 to 30 miles and ends at a bakery or café, with riders there around 8. The start and the stop go up on the club's Instagram; the first Thursday of the month is Donut Alley instead. Sign the club's waiver before your first ride.",
    "links": {
      "website": "https://www.fatcake.cc/rides",
      "instagram": "https://www.instagram.com/fatcakeclub/",
      "facebook": null,
      "strava": "https://www.strava.com/clubs/40422",
      "meetup": null,
      "other": []
    },
    "inclusive_focus": [],
    "sources": [
      "https://www.fatcake.cc/rides"
    ],
    "verified_on": "2026-10-03",
    "confidence": "medium",
    "tz": "America/Los_Angeles",
    "start_hhmm": "06:30",
    "duration_min": null,
    "season_months": null,
    "monthly_rule": null
  }
]
```

## Why these

Clubs:

- **Different Spokes San Francisco**: the queer club, and the one with a Saturday a visitor can plan around. The Jersey Ride is in the directory; the other Saturday rides (Oct 3 "SF to Marin: Decide and Ride," about 50 miles; Oct 17 "Double Hawk Hill and Bunker Road," 35.1 miles) leave Jane Warner Plaza. Starts in zone 6 (the Castro), rides into zones 1 and 2.
- **Fat Cake Club**: four early rides a week, all ending at a bakery, and the FTWNB Monday ride in its own words. Zones 1 and 3 (the bridge pavilions, Golden Gate Park).
- **Women and Non-Binary Bike SF**: the slow social ride for women and non-binary riders, no-drop in the host's words, dated through 2027 on the SFBC calendar. Zone 3 (Golden Gate Park out to Sunset Dunes).
- **San Francisco Bicycle Coalition**: the advocacy group whose calendar carries the community rides, and a weekly repair night. Office at 1720 Market St; rides citywide.
- **Bike Kitchen**: the co-op, for a visitor with a broken bike and no shop budget, with a Monday night that says who it's for. Zone 6 (the Mission).
- **San Francisco Cycling Club**: a weekday road club whose Friday coffee ride is open to all. Zone 3 (the Panhandle end of Golden Gate Park).

Rides:

- **Women and Non-Binary Bike SF Friday Morning Ride**: the SFBC event page gives the 2nd and 4th Fridays, gather 7:15, depart 7:30, back by 8:45, McLaren Lodge, free, no RSVP, and lists dates from Oct 9, 2026 to Aug 2027. `high`. Host is "not officially sponsored or organized by the SF Bicycle Coalition" (the calendar's own asterisk), so the host is the ride's own name, type `informal`. The event page names one organiser; not copied.
- **The Coffee Ride (SFCC)**: the club page gives "FRIDAY // THE COFFEE RIDE // 0615 // FELL & BAKER" and "all inclusive." Page undated, so `medium`.
- **Fat Cake Thursday Wildcard**: on Fat Cake's rides page next to the three already listed: "630a at the Conservatory of Flowers in Golden Gate Park or at the Golden Gate Bridge Pavillon," 15 to 30 miles. Page undated, so `medium`, same as the Fat Cake records already in the directory. The first Thursday is Donut Alley, which is listed; the schedule says so.

The Fat Cake page still matches the three Fat Cake records in rides.json as of today (Monday 6:30 Conservatory, 17 miles; Tuesday 6:30 southern pavilion, 25 miles; first Thursday 6:30 northern pavilion, 30 miles). The DSSF October calendar still lists Friday Ride Day (Oct 2, 9, 16, 23, 30) and the Jersey Rides (Oct 10).

Hand-offs:

- @coffee-scout: The Mill (end of the SFCC Coffee Ride; after Fat Cake's Monday ride), Arsicault Bakery (Fat Cake Tuesday), Donut Alley (Fat Cake first Thursday), the Rapha clubhouse café at 2198 Filbert St (café 10 to 3 weekdays, 9 to 3 weekends, Oct 2026).
- @shop-scout: Rapha San Francisco (2198 Filbert St, 415-829-3683, retail 10 to 6 weekdays, 9 to 5 weekends); Mike's Bikes Sausalito (1 Gate 6 Rd, (415) 332-3200, 10 to 6 Monday to Saturday, 10 to 5 Sunday); Bespoke Cycles (2843 Clay St).
- @route-scout: the DSSF calendar's Oct 2026 rides with distance and climbing (Double Hawk Hill and Bunker Road, 35.1 mi / 2,580 ft; Marin Marauders to Nicasio, Point Reyes and Samuel P. Taylor, 46.4 mi / 2,262 ft from Hal Brown Park, Kentfield). Search also showed a RideWithGPS route for Fat Cake's Monday ride (ridewithgps.com/routes/37343588) and Mike's Bikes Sausalito to Mt. Tam (ridewithgps.com/routes/14853393); not fetched.
- @logistics-scout / @route-scout: the SFBC event pages (Oct 2026) call the car-free Great Highway park "Sunset Dunes." A lead for the name; confirm on the park's own page.

## Rejected

- **Bespoke Cycles Riders Club** (Saturday, meet 7:45, depart 8:15, from the shop at 2843 Clay St, no-drop): the page still says it "will be in effect soon pending modifications to stay-at-home order." A 2020 page. Not proposed.
- **Sports Basement Sunday Riders Club** (Presidio, 610 Old Mason St, Sunday 9 am, 30 to 45 miles, no-drop with a sweep): only on a Funcheap listing from 2011, last modified 2019. Not proposed. The Sports Basement Presidio x Rapha community ride (Eventbrite, Sunday July 12) was a one-off.
- **SFBC one-off rides**: Honoring Compton's Cafeteria, a Pride history ride (Aug 16, 2026, one time for the riot's 60th anniversary); Dogon' Bike Ride; Birds & Bikes; Ghosts of Transit Past tour. None recur.
- **fastkadence.com group ride directory**: an index of names (Sports Basement, Performance, SFCC, Rapha, Mission Cycling, Mike's Bikes) with no days, times or starts.
- **bayarearides.org**: the home page doesn't render to the fetcher; one ride page read (Mike's Bikes, below). An aggregator, a lead only.
- **Mission Cycling**: search returned only a link-shortener page and a SportsEngine stub; no ride page.
- **SFAF and Castro Country Club 2026 rides** (search results): the annual fundraisers, already on the 2027 calendar as Cycle to Zero and the Recovery Ride. Not clubs.

## Couldn't confirm

- **Rapha San Francisco clubhouse rides**: the clubhouse page (open; 2198 Filbert St) says organised rides roll out every week and that non-members and riders new to cycling are catered for, but the schedule is on events.rapha.cc/rapha-sanfrancisco, which the fetcher refused, and the two Tito pages show no ride list. A June 2025 coaching blog (Achieve PTC) lists a Rapha Donut Ride, Wednesday 6:30 am from the bridge plaza, and a Stammtisch Ride, Thursday 6 pm from the clubhouse. Where to look: the Rapha events page in a browser. A strong club pick the moment one ride is confirmed. (DoTheBay lists 415.896.4671 for the venue; Rapha's own page says 415-829-3683.)
- **Mike's Bikes Sausalito, Col du Pantoll**: Wednesday, meet 6, roll 6:15 sharp, to Stinson Beach and up to Pantoll, about 25 miles, A/B/C groups, waiver. Only on bayarearides.org as a single Sept 2025 date, sourced to the shop's Strava club. The shop's Sausalito page names no ride; its community-and-events page was refused. Where to look: mikesbikes.com/pages/community-and-events; the Mike's Bikes Strava club.
- **SFCC Strava club** (strava.com/clubs/SanFranciscoCyclingClub, linked from the club site): refused by the fetcher. The one place a 2026 date for the Coffee Ride might show; it would move the ride to `high`.
- **The Achieve PTC list** (last updated June 8, 2025; secondary): Roasters Ride (Sat 8 am, bridge south lot, fast), Scotty's Ride (Sat 8:30 am, bridge south pavilion, social), 707 CC (Fri 7:07 am, south pavilion, @ride707.cc), Thursdays.cc TLT (Thu 6:30 am, south pavilion, @thursdays.cc), a seasonal Tuesday 6 pm Golden Gate Park race-pace ride, SF2G (weekday commutes south, sf2g.com), and in Marin the Chicken Ride (Fri 7:10 am, Mill Valley bike path) and the Divine Ride (Wed 9:15, Sun 10:00, Fairfax). No host pages; several are Instagram-only. Its Fat Cake line (Tue/Thu 6:15) is already out of date against Fat Cake's own page. Where to look: the Instagram handles, sf2g.com.
- **Marin and East Bay clubs**: Tamalpais Velo, Marin Cyclists, AIR cc (WXMNS ride, `wtf`), Berkeley Bicycle Club (Sunday WTFN ride), Grizzly Peak Cyclists and Red Bike & Green are in rides.json with recent checks, and their rides render on the town page by distance. Not re-fetched: the search cap was spent and their URLs were refused. The editor can build `clubs[]` entries from those records if the page wants a Marin or East Bay club; Red Bike & Green is the lead for a `bipoc` entry, in its own words.
- **Bayview Black History Month bike ride** (Livable City, Feb 2026): seen in a search title only (Idealist). An annual ride, not weekly; for the calendar if the editor wants it.

## Sources

Fetched and read:

- https://www.dssf.org/
- https://dssf.org/content.aspx?page_id=4001&club_id=17789
- https://www.fatcake.cc/rides
- https://tockify.com/sanfranciscorides/detail/11/1778506200000
- https://sfbike.org/events/
- https://sfbike.org/events/category/rides/
- https://sfbike.org/events/category/membership-2/women-bike-sf/
- https://sfbike.org/event/women-and-non-binary-bike-sf-friday-morning-ride-2/2026-10-09/
- https://sfbike.org/event/honoring-comptons-cafeteria-a-pride-history-ride/
- https://bikekitchen.org/
- https://bikekitchen.org/programs-membership/
- https://www.sfcyclingclub.org/
- https://content.rapha.cc/us/en/clubhouses/san-francisco
- https://ti.to/ccsfc/rapha-rides-san-francisco
- https://ti.to/ccsfc/rapha-event-rides
- https://dothebay.com/venues/rapha-cycle-club
- https://mikesbikes.com/pages/sausalito
- https://bayarearides.org/
- https://bayarearides.org/rides/2956
- https://www.bespokecyclessf.com/rides
- https://sf.funcheap.com/golden-gate-group-bike-ride-sports-basement/
- https://www.achieveptc.com/blog/bay-area-group-rides-summary
- https://fastkadence.com/resources/group-ride/

Refused by the fetcher (not read):

- https://events.rapha.cc/rapha-sanfrancisco
- https://www.strava.com/clubs/SanFranciscoCyclingClub
- https://mikesbikes.com/pages/community-and-events
