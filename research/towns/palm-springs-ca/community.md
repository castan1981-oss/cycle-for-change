# palm-springs-ca — community

@community-scout · 2026-10-03

Four clubs and four new ride records. Every fact here comes from a page fetched this run (see Sources).
All four rides start in Palm Desert. I found no weekly ride with a published start in Palm Springs,
La Quinta or Indio. The valley's group riding runs through one club, the Desert Bicycle Club. Its
ClubExpress calendar is public and lists dated rides into December 2026, so its rides are `high`.

Search: the session's shared WebSearch cap ran out after my third search. Searches four to six came back
"200 of 200 WebSearch calls". So the La Quinta / Indio, women's-ride and Strava-club searches never
ran. Six WebFetch permission requests also timed out. They're listed under Couldn't confirm and weren't
fetched any other way.

Notes for the editor before you paste:
- **`country`.** The ride records follow the LA file's shape, which has no `country` key, and
  `tools/merge-ride-research.js` rejects a record without one ("no country"). Add `"country": "US"`
  on paste. With that one key added, a `--dry` merge accepts all four.
- **`lat`/`lng` are null on purpose.** No geocoder page loaded (Nominatim timed out), so I placed no
  coordinates. The merge geocodes from `start_location.address` and says "scouts leave them null".
  All four addresses come from the host's own page.
- **Three-per-host cap.** The deep-sweep rule allows at most three rides per host. The Desert Bicycle
  Club posts about a dozen recurring rides, so I proposed three and listed the rest, with their
  facts, under "Held back" in Rejected. Promote any of them as you see fit.
- **Season bounds.** The club calendar shows the Saturday groups and Sunday Climbers in March 2026 and
  from October 2026, and the Monday Palm Springs ride in March 2026 and from November 2026. It shows
  none of them in August 2026. So `season` reads "October to March" / "November to March", which is
  the span I saw rows for. April, May and September weren't visible, because the calendar pages back
  with a postback the fetcher can't follow. Widen the season once the spring calendar posts.
- **Club notes use `{ride:…}` tokens** for the three proposed slugs and the existing Big Wheel slug.
  Merge the rides first, or `build-events.js` fails on the new slugs.
- `clubs[].inclusive_focus` uses `women-trans-femme` per the schema. None of these clubs needed it.
  Only Great Outdoors carries a tag (`lgbtq`).

## Findings

### clubs

```json
[
  {
    "name": "Desert Bicycle Club",
    "url": "https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953",
    "note": "A Coachella Valley road club based in Palm Desert. Guests are welcome and there's no sign-up, but you need to be comfortable in a group, and no aerobars. A groups (drop) and B groups (regroup) go out most mornings: {ride:palm-desert-ca-desert-bicycle-club-saturday-rides|the Saturday rides} from Palm Desert Civic Park, {ride:palm-desert-ca-desert-bicycle-club-sunday-climbers|Sunday Climbers} up Highway 74, {ride:palm-desert-ca-desert-bicycle-club-palm-springs-ride|a winter Monday ride to Palm Springs}, and weekday rides from Coffee Bean on El Paseo and from Bike n Brews. From November the easier C rides (20 to 35 miles, about 13 to 14 mph) start from a different place each time and are posted on the club's C Rides Facebook page.",
    "inclusive_focus": [],
    "ride_slug": "palm-desert-ca-desert-bicycle-club-saturday-rides"
  },
  {
    "name": "Tri-A-Bike",
    "url": "https://www.triabike.com/articles/local-rides-pg196.htm",
    "note": "A Palm Desert bike shop at 44841 San Pablo Ave, (760) 340-2840. {ride:palm-desert-ca-tri-a-bike-saturday-fun-ride|Its weekly fun ride} leaves from the front of the store, and all types of bikes are welcome; the page says the rides start in October 2026. The same page links a RideWithGPS account of Palm Springs-area routes.",
    "inclusive_focus": [],
    "ride_slug": "palm-desert-ca-tri-a-bike-saturday-fun-ride"
  },
  {
    "name": "Big Wheel Bikes CV",
    "url": "https://www.bigwheelbikescv.com/events",
    "note": "Shops in Palm Springs and Palm Desert. {ride:palm-springs-ca-big-wheel-bikes-community-group-rides|Its community group rides}, demo days, clinics and bike nights run in the November-to-April season and go up on its Instagram and Facebook, not on a fixed weekly slot, so follow the shop before you come. The Palm Springs store closes for the summer.",
    "inclusive_focus": [],
    "ride_slug": "palm-springs-ca-big-wheel-bikes-community-group-rides"
  },
  {
    "name": "Great Outdoors (Palm Springs chapter)",
    "url": "https://greatoutdoors.wildapricot.org/",
    "note": "An all-volunteer LGBTQIA+ and allies outdoor club with five Southern California chapters, Palm Springs among them; cycling and mountain biking are on its list. The latest Palm Springs bike outing a page showed was a Gay History Bike Ride in March 2025, about 18 miles from the Mizell Senior Center. Events are for members unless noted, so join before you plan on one.",
    "inclusive_focus": ["lgbtq"]
  }
]
```

### rides

The same four records are in `research/towns/palm-springs-ca/rides-proposed.json`.

```json
[
  {
    "slug": "palm-desert-ca-desert-bicycle-club-saturday-rides",
    "name": "Desert Bicycle Club Saturday Rides",
    "city": "Palm Desert",
    "state": "CA",
    "neighborhood": "Civic Center Park",
    "lat": null,
    "lng": null,
    "geo_precision": null,
    "discipline": ["road"],
    "schedule": "Saturdays, 7:30 am, four groups from Palm Desert Civic Park: A 1000 Palms Ride (65 mi, drop), A Fast Dealership Ride (55 mi, drop), B Classic Dealership Ride (55 mi, regroup) and B Sport Ride (40 mi, regroup; it rolls five minutes after the others). On the club calendar from October 2026, and in March 2026. In summer the club runs one earlier Saturday ride instead (a B/B+ ride at 6:30 am in August 2026).",
    "days": ["sat"],
    "time_local": "7:30 am",
    "frequency": "weekly",
    "season": "October to March",
    "start_location": {
      "name": "Palm Desert Civic Park, by the restroom next to the skate park",
      "address": "43900 San Pablo Ave, Palm Desert, CA 92260"
    },
    "distance_miles": "40–65",
    "duration": null,
    "pace": "A groups 20-plus mph average, drop; B groups about 17 mph average with sections to 22, regroup (the Sport ride says no chasing)",
    "drop_policy": "groups",
    "host": {
      "name": "Desert Bicycle Club",
      "type": "club"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": "guests welcome, no registration; no fee stated",
    "description": "The valley club's Saturday: four groups leave Palm Desert Civic Park at 7:30. Two A rides drop (the 65-mile 1000 Palms Ride over the Thousand Palms climb, and the 55-mile Fast Dealership Ride); two B rides regroup (the 55-mile Classic Dealership Ride out toward Indio and back through the Cove, and the 40-mile Sport Ride, for riders getting used to a group, five minutes later). Meet by the restroom next to the skate park. Guests are welcome with no sign-up; the club asks that you're comfortable in a group, and no aerobars.",
    "links": {
      "website": "https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": ["https://ridewithgps.com/routes/53964607", "https://ridewithgps.com/routes/54260610"]
    },
    "inclusive_focus": [],
    "sources": [
      "https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953&action=cira&vm=MonthView",
      "https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953&action=cira&vm=Future&sif=0",
      "https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2090387&event_date_id=494943",
      "https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2919028&event_date_id=457550",
      "https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=1919420&event_date_id=494881",
      "https://cycleclub.clubexpress.com/"
    ],
    "verified_on": "2026-10-03",
    "confidence": "high",
    "tz": "America/Los_Angeles",
    "start_hhmm": "07:30",
    "duration_min": null,
    "season_months": { "start": 10, "end": 3 },
    "monthly_rule": null
  },
  {
    "slug": "palm-desert-ca-desert-bicycle-club-sunday-climbers",
    "name": "Desert Bicycle Club Sunday Climbers",
    "city": "Palm Desert",
    "state": "CA",
    "neighborhood": "El Paseo at Highway 74",
    "lat": null,
    "lng": null,
    "geo_precision": null,
    "discipline": ["road"],
    "schedule": "Sundays, 7:30 am, from the Starbucks at Highway 74 and El Paseo. On the club calendar every Sunday from October 2026, and in March 2026.",
    "days": ["sun"],
    "time_local": "7:30 am",
    "frequency": "weekly",
    "season": "October to March",
    "start_location": {
      "name": "Starbucks, Highway 74 and El Paseo",
      "address": "73030 El Paseo, Palm Desert, CA 92260"
    },
    "distance_miles": "20–40",
    "duration": null,
    "pace": "B level (the club's B is 17–20 mph average); the climb is at your own pace",
    "drop_policy": "groups",
    "host": {
      "name": "Desert Bicycle Club",
      "type": "club"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": "guests welcome, no registration; no fee stated",
    "description": "Highway 74 from the Starbucks at El Paseo: ride up at your own pace, 8.5 to 20 miles, and come back down. The group regroups at the Art Smith Trailhead (mile 4) and the Vista Point (mile 8.5). The club's own warning: past mile 4 the road is narrow and winding with no bike lane. Guests welcome with no sign-up; no aerobars.",
    "links": {
      "website": "https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": ["https://ridewithgps.com/routes/54218049", "https://www.strava.com/routes/3472013871891119752"]
    },
    "inclusive_focus": [],
    "sources": [
      "https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2911649&event_date_id=456578",
      "https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953&action=cira&vm=MonthView",
      "https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953&action=cira&vm=Future&sif=0"
    ],
    "verified_on": "2026-10-03",
    "confidence": "high",
    "tz": "America/Los_Angeles",
    "start_hhmm": "07:30",
    "duration_min": null,
    "season_months": { "start": 10, "end": 3 },
    "monthly_rule": null
  },
  {
    "slug": "palm-desert-ca-desert-bicycle-club-palm-springs-ride",
    "name": "Desert Bicycle Club Palm Springs Ride",
    "city": "Palm Desert",
    "state": "CA",
    "neighborhood": "Highway 111",
    "lat": null,
    "lng": null,
    "geo_precision": null,
    "discipline": ["road"],
    "schedule": "Mondays, 7:30 am, in winter: a B group and a B+ group from Bike n Brews. On the club calendar every Monday from November 2, 2026, and in March 2026.",
    "days": ["mon"],
    "time_local": "7:30 am",
    "frequency": "weekly",
    "season": "November to March",
    "start_location": {
      "name": "Palm Desert Bike n Brews",
      "address": "73865 CA-111, Palm Desert, CA 92260"
    },
    "distance_miles": "45",
    "duration": null,
    "pace": "B+ 18–19 mph average with stretches at 25-plus; a B group rides the same morning; both regroup",
    "drop_policy": "groups",
    "host": {
      "name": "Desert Bicycle Club",
      "type": "club"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": "guests welcome, no registration; no fee stated",
    "description": "The club's winter ride to Palm Springs and back: 45 miles from Bike n Brews on Highway 111, with a rest stop at Victoria Park, a faster stretch after it, and Koffi in Rancho Mirage as the destination. Two groups, B and B+, and both regroup; the B+ page puts it at 18 to 19 mph average, with a sprint up the Dinah Shore overpass. It starts in Palm Desert, not Palm Springs. Comfortable in a group, no aerobars.",
    "links": {
      "website": "https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": ["https://ridewithgps.com/routes/53964648", "https://www.strava.com/routes/3431655834665650334"]
    },
    "inclusive_focus": [],
    "sources": [
      "https://cycleclub.clubexpress.com/content.aspx?page_id=4091&club_id=400953&item_id=2905068&event_date_id=454222",
      "https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953&action=cira&vm=Future&sif=0"
    ],
    "verified_on": "2026-10-03",
    "confidence": "high",
    "tz": "America/Los_Angeles",
    "start_hhmm": "07:30",
    "duration_min": null,
    "season_months": { "start": 11, "end": 3 },
    "monthly_rule": null
  },
  {
    "slug": "palm-desert-ca-tri-a-bike-saturday-fun-ride",
    "name": "Tri-A-Bike Saturday Fun Ride",
    "city": "Palm Desert",
    "state": "CA",
    "neighborhood": null,
    "lat": null,
    "lng": null,
    "geo_precision": null,
    "discipline": ["social"],
    "schedule": "Saturdays, 10:30 am, from the front of the store. The shop's page says the weekly rides start in October 2026.",
    "days": ["sat"],
    "time_local": "10:30 am",
    "frequency": "weekly",
    "season": "from October 2026; no end date on the page",
    "start_location": {
      "name": "In front of Tri-A-Bike",
      "address": "44841 San Pablo Ave, Palm Desert, CA 92260"
    },
    "distance_miles": null,
    "duration": null,
    "pace": "a fun ride; the shop says all types of bikes are welcome",
    "drop_policy": "unknown",
    "host": {
      "name": "Tri-A-Bike",
      "type": "shop"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": null,
    "description": "A weekly Saturday ride from the front of Tri-A-Bike on San Pablo Avenue in Palm Desert, with a late-morning start at 10:30. The shop calls it a fun ride and says all types of bikes are welcome. Distance and pace aren't posted, so call the shop at (760) 340-2840 before your first one.",
    "links": {
      "website": "https://www.triabike.com/articles/local-rides-pg196.htm",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": []
    },
    "inclusive_focus": [],
    "sources": ["https://www.triabike.com/articles/local-rides-pg196.htm"],
    "verified_on": "2026-10-03",
    "confidence": "high",
    "tz": "America/Los_Angeles",
    "start_hhmm": "10:30",
    "duration_min": null,
    "season_months": null,
    "monthly_rule": null
  }
]
```

## Why these

Clubs:

- **Desert Bicycle Club**: the valley's group riding. Its own calendar lists rides on most days with a
  start, a time, a distance and a level, guests are welcome, and there's no sign-up. A visitor can
  plan a week around it.
- **Tri-A-Bike**: the one shop ride with a fixed day, time and place on the shop's own page, and the
  gentlest start in the valley (10:30, any bike).
- **Big Wheel Bikes CV**: the shop with a store in Palm Springs itself, and the existing directory
  ride. Its winter rides are social-media only, so the note tells a visitor where to look.
- **Great Outdoors (Palm Springs chapter)**: the LGBTQIA+ outdoor club that runs bike outings in
  Palm Springs. It's the only club I found that states a queer focus on its own site. Members only,
  and the newest bike outing I could read was March 2025, which the note says plainly.

Rides:

- **DBC Saturday Rides**: the valley's big weekend morning, four groups from one park, so a visitor
  picks a pace. One record, not four: same host, start and time, and the merge would read four
  records as one ride anyway. `drop_policy: groups` because the A groups drop and the B groups
  regroup. `high`: the host's calendar lists every Saturday in October and November 2026.
- **DBC Sunday Climbers**: Highway 74, the climb the brief names, from a coffee shop, with two
  regroup points and the club's own traffic warning. `high` on the same calendar.
- **DBC Palm Springs Ride**: the one weekly ride that goes to Palm Springs (Monday, in winter). It
  starts in Palm Desert. Only the B+ detail page loaded, so the B group's pace is the club's B band
  from another page (17–20 mph). `high`: listed every Monday from November 2, 2026.
- **Tri-A-Bike Saturday Fun Ride**: a slower option for a rider who doesn't want a 7:30 club pace.
  `high` because the page says "starts OCTOBER 2026". Distance and pace aren't posted, so the
  description says call first, and `drop_policy` is unknown.

None start in Palm Springs. All four are in Palm Desert, well inside the 30 miles the town page draws
rides from.

## Rejected

- **Held back by the three-per-host cap (Desert Bicycle Club).** All are confirmed on the club
  calendar, all ask for group skills and no aerobars, and none needs registration:
  - "B" Ride, Tuesdays 30 mi and Thursdays 35 mi, 6:00 am, Coffee Bean & Tea Leaf, 73400 El Paseo,
    Palm Desert; regroup, 17–18 mph average. Tuesday heads east through Indian Wells and La Quinta
    to Trilogy; Thursday goes to Rancho Mirage and up "the Ritz climb", with a regroup at the top.
    Listed every week through November 2026; detail pages dated March 2026.
  - "A" Fast Ride, Tuesdays 6:00 am, same Coffee Bean start, 18–21 mph, drop.
  - "A" Fastest Hour Ride, Thursdays, 30 mi, drop, 20+ mph. 6:30 am from PD Civic Center in the
    October and November 2026 rows; 6:00 am from Coffee Bean in August 2026.
  - Winter only, from Bike n Brews (73865 CA-111), 7:30 am, starting the week of November 2, 2026:
    "B+" Hot Laps Ride on Tuesdays (45 mi, regroup), "B" 1000 Palms Ride on Wednesdays (50 mi,
    regroup), "A" Fast & Furious Ride on Thursdays (50 mi, drop). Detail pages not read.
  - "C" Ride, Sundays and Thursdays, 9:00 am, "Various Locations", 20–35 mi, regroup, November to
    April. The club's C Rides page says 13–14 mph average and "Guests are welcome", and points to
    the DBC C Rides Facebook page for each week's start. It has no fixed start, so it isn't a
    directory record yet. It's the easiest club ride, so it's in the club note.
  - "C+" Recovery Ride, Sundays, 7:30 am, Big Wheel Bikes Palm Desert, 40 mi, "Drop ride except for
    mechanicals", east on the CV Link. On the calendar July 26 to October 25, 2026, not in November,
    so it's a summer-and-fall ride. Off-season for this guide's reader.
- **Palm Springs Cyclery (pscyclery.com)**: its "Palm Springs Ride Calendar" URL now serves an
  online-slots page (March 2026 date). The shop's ride calendar is gone. @shop-scout should check
  whether the shop still exists.
- **Social Cycle Palm Springs**: a pedal-party bike, not a group ride. Search snippets only, not
  fetched.
- **Big Wheel Tours (bwbtours.com), Bike Palm Springs history tours**: paid guided tours, not open
  group rides. Named in a January 2023 Palm Springs Life piece (fetched, leads only).
- **Desert Bicycle Club as `lgbtq`**: qcal.app (an LGBTQ+ event aggregator; the listing is marked
  "Unclaimed") titles it "Palm Springs Gay Cycling & Social Club". None of the club's own pages I
  read say so. No tag. If the club confirms it in its own words, add it.
- **queeradventurers.com queer bike clubs list** (updated July 2026): no Coachella Valley club.
- **Trek Bicycle Palm Desert**: its store page mentions "Group rides and clinics" with no day, time
  or place. Not proposed. Lead for @shop-scout.

## Couldn't confirm

- **The club calendar in April, May and September.** The calendar pages back and forward with a
  postback the fetcher can't follow. Only October to December 2026 (month and future views), August
  2026 (an earlier read) and single March 2026 detail pages loaded. Where to look:
  https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953 in a browser, months
  back. The answer sets the three DBC season bounds.
- **The DBC event detail pages for the Monday "B" Palm Springs Ride, the C Ride and the Fast
  Dealership Ride.** ClubExpress kept serving the Tuesday B ride's page for those item ids
  (session state). Their titles (time, level, distance, start) are on the calendar views, which did
  load.
- **Great Outdoors Palm Springs chapter page and events calendar**
  (greatoutdoors.wildapricot.org/ps and /events): the permission request timed out. Wanted: a 2026
  Palm Springs bike outing and the membership price.
- **Desert Bicycle Club on Meetup and Strava** (meetup.com/desert-bicycle-club,
  strava.com/clubs/desert-bicycle-club): permission timed out, and both URLs were my guesses. The
  club's About page links a Facebook page and a Meetup group, and its home page links "DBC Strava".
  The fetcher didn't return the link targets.
- **Bike n Brews Palm Desert (pdbikenbrews.com)**: permission timed out. It's the winter start for
  four DBC rides. Wanted: its own shop rides or shuttle rides, hours, and whether riders can park
  bikes there.
- **Tri-A-Bike's RideWithGPS route account** (ridewithgps.com/users/219822, "Palm Springs Area Posted
  Rides"): permission timed out. Lead for @route-scout.
- **Start coordinates**: Nominatim timed out. The merge geocodes them from the addresses.
- **Searches that never ran** (cap spent): La Quinta and Indio shop rides, a women's ride in the
  valley, Strava club events for Palm Springs, a Palm Springs bike co-op or Critical Mass, and the
  LGBTQ Community Center of the Desert for any ride. All are open leads for the next run.
- **Big Wheel Bikes CV winter ride days**: the events page (© 2026) still says rides are posted on
  social media, November to April, with no fixed slot. The low-confidence directory record stands.
  Where to look: the shop's Instagram or Facebook in November, or a phone call.

## Sources

Fetched and read:

- https://cycleclub.clubexpress.com/
- https://cycleclub.clubexpress.com/content.aspx?page_id=22&club_id=400953&module_id=547339
- https://cycleclub.clubexpress.com/content.aspx?page_id=22&club_id=400953&module_id=682537
- https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953
- https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953&action=cira&vm=MonthView
- https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953&action=cira&vm=Future&sif=0
- https://cycleclub.clubexpress.com/content.aspx?page_id=4091&club_id=400953&item_id=2905068&event_date_id=454222
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2090387&event_date_id=494943
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2913082&event_date_id=457247
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2913086&event_date_id=457320
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2911649&event_date_id=456578
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=3088626&event_date_id=497005
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2919028&event_date_id=457550
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=1919420&event_date_id=494881
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=1895059&event_date_id=435164
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2090424&event_date_id=496342
- https://www.triabike.com/articles/local-rides-pg196.htm
- https://www.bigwheelbikescv.com/events
- https://www.trekbikes.com/us/en_US/retail/palm_desert/
- https://greatoutdoors.wildapricot.org/
- https://greatoutdoors.wildapricot.org/event-6094904
- https://qcal.app/host/desert-bicycle-club (aggregator; read for the label only)
- https://queeradventurers.com/queer-bike-clubs/
- https://www.palmspringslife.com/an-insiders-guide-to-the-coachella-valley-cycling-scene/ (leads only, January 2023)
- https://www.pscyclery.com/articles/palm-springs-ride-calender-pg122.htm (now a gambling page)

Loaded but served another item's page (ClubExpress session):

- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2906251&event_date_id=454442
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2906251&event_date_id=454443
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2904911&event_date_id=495164
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2904911&event_date_id=495156

Permission request timed out (not fetched any other way):

- https://greatoutdoors.wildapricot.org/events
- https://greatoutdoors.wildapricot.org/ps
- https://pdbikenbrews.com/
- https://www.meetup.com/desert-bicycle-club/
- https://www.strava.com/clubs/desert-bicycle-club
- https://ridewithgps.com/users/219822
- https://nominatim.openstreetmap.org/search?q=43900+San+Pablo+Ave,+Palm+Desert,+CA&format=json&limit=1

Surfaced by search, not fetched (leads):

- https://www.bikeforums.net/road-cycling/1138042-palm-springs-riding.html
- https://www.bikeforums.net/road-cycling/965703-riding-palm-desert-ca.html
- https://www.visitgreaterpalmsprings.com/blog/post/lgbtq-tour-operators-and-owners/
- https://www.socialcycleca.com/palm-springs
- https://bwbtours.com/palm-springs-bicycle-tours/
- https://www.trekbikes.com/us/en_US/store/3308001/

Hand-offs:

- @shop-scout: Tri-A-Bike (44841 San Pablo Ave, Palm Desert, (760) 340-2840, from its own page);
  Trek Bicycle Palm Desert (77750 Country Club Dr, 760-345-9096; Sun closed, Mon 12–5, Tue–Sat
  10–6, from Trek's store page); Bike n Brews Palm Desert (73865 CA-111, from the club's page; its
  own site didn't load); Big Wheel Bikes CV; Palm Springs Cyclery's site is gone.
- @coffee-scout: ride-out corners are Coffee Bean & Tea Leaf, 73400 El Paseo (DBC weekdays,
  6:00 am); Starbucks, 73030 El Paseo at Highway 74 (Sunday Climbers, 7:30); and Koffi in Rancho
  Mirage (the Monday ride's destination).
- @route-scout: the DBC event pages carry public routes. Highway 74 Sunday Climbers is RWGPS
  54218049; 1000 Palms 53964607; Classic Dealership 54260610; Fastest Hour 53964567; the Palm
  Springs ride 53964648; the Tuesday Coffee Bean loop 54260667; the C+ CV Link ride 53552033.
  Tri-A-Bike links a RideWithGPS account of area routes (users/219822).
- @logistics-scout: the club's C+ ride uses the CV Link eastbound from Big Wheel Bikes in Palm
  Desert, so riders use it. Hours and rules still come from CVAG.
- Editor: add `country`; the season bounds; the cap (nine more DBC rides are ready if you want
  them); whether Great Outdoors stays with no 2026 bike outing seen; the DBC `lgbtq` question
  (ask the club).
