# los-angeles-ca — community

@community-scout · 2026-09-30

Six clubs and eleven ride records below. Every fact is from a page fetched this
run (the list is under Sources). Different Spokes was not re-fetched: the call
cap ran out first; its record from Sept 15 stands. The two `inclusive_focus`
notes for the editor: the rides build stores the women/trans/femme tag as `wtf`
(`tools/build-rides.js`, FACETS), so convert `women-trans-femme` on paste; and
none of the ride records below need that tag, so nothing breaks either way.

## Findings

### clubs

```json
[
  {
    "name": "Velo Club La Grange",
    "url": "https://www.lagrange.org/rides",
    "note": "The Westside club. Weekday rides leave 26th and San Vicente in Santa Monica at 6:30 (Marina Ride, Mandeville Canyon, Gravel Wednesday, Amalfi Loops, Marina Lite; 15 to 26 miles) and the Saturday Nichols Canyon ride leaves Westwood at 8; every one is open to non-members, helmet required, no earphones. A monthly women's ride for female-identifying riders, members and guests, at a social pace where the club says no one gets left behind.",
    "inclusive_focus": ["women-trans-femme", "gravel"]
  },
  {
    "name": "Big Orange Cycling",
    "url": "https://www.bigorangecycling.org/local-rides",
    "note": "The South Bay club, and the one page that lists the South Bay's rides: the Donut (Saturday 8, Avenue I and Elena, Redondo Beach), the New Pier Ride (Tuesday and Thursday 6:40, Manhattan Beach Pier), the Wheatgrass (Sunday 8, Malaga Cove Plaza), plus its own Saturday club ride and Sunday team ride. The Friendly Donut Ride, Saturdays from Miramar Park, is the no-drop one. Show up; the club says its aim is that nobody goes home feeling like a loser.",
    "inclusive_focus": ["no-drop"]
  },
  {
    "name": "Bicycle Kitchen",
    "url": "https://bicyclekitchen.org/",
    "note": "The volunteer-run co-op at 4429 Fountain Ave: walk in, no membership, no fee, and fix your own bike with their tools and their help. Open Monday to Thursday evenings and Saturday 12 to 3; call ahead, (323) 662-2776, because nights get cancelled. Thursday is the gender-expansive wrench night, in their words for women, trans and non-binary folks.",
    "inclusive_focus": ["women-trans-femme"]
  },
  {
    "name": "Wild Wolf Cycling Collective",
    "url": "https://wildwolfcc.weebly.com/",
    "note": "A collective that says it centers all gender-expansive and women riders, founded and led by BIPOC and LGBTQIA+ riders, all skill levels. Social rides, monthly bike campouts, wrench classes and skill shares around LA and Southern California. No fixed weekly ride on its site; join the Slack through the form on the site or follow @wildwolf.cc for the next one.",
    "inclusive_focus": ["women-trans-femme"]
  },
  {
    "name": "Black Girls Do Bike: Los Angeles",
    "url": "https://www.blackgirlsdobike.org/chapters",
    "note": "The LA chapter of the national group, which describes itself as a community of women and girls of color who ride. The chapter runs through its Facebook group (facebook.com/groups/BGDBLA), where rides are posted; join the group and ask for the next one. No ride schedule is published on the site.",
    "inclusive_focus": ["bipoc", "women-trans-femme"]
  },
  {
    "name": "Los Angeles Wheelmen",
    "url": "https://www.lawheelmen.org/",
    "note": "A recreational club with a ride every Sunday from a different start around LA, Orange and Ventura counties, with easy, moderate and ambitious routes, and a smaller Saturday group on shorter, harder ones. Guests ride with a signed waiver; helmets mandatory; the month's schedule and route sheets are on the site. It puts on the Grand Tour double century in late June.",
    "inclusive_focus": []
  }
]
```

### rides

```json
[
  {
    "slug": "los-angeles-ca-los-angeles-critical-mass",
    "name": "Los Angeles Critical Mass",
    "city": "Los Angeles",
    "state": "CA",
    "neighborhood": "Koreatown",
    "lat": 34.0617,
    "lng": -118.3089,
    "geo_precision": "start",
    "discipline": ["social"],
    "schedule": "Last Friday of every month; gather 6:30 pm, roll at 7:29 pm",
    "days": ["fri"],
    "time_local": "6:30 pm (rolls 7:29 pm)",
    "frequency": "monthly",
    "season": "year-round",
    "start_location": {
      "name": "Wilshire/Western Metro D Line station",
      "address": "Wilshire Blvd & Western Ave, Koreatown, Los Angeles, CA"
    },
    "distance_miles": null,
    "duration": null,
    "pace": "mass ride; the group says all ages and skill levels",
    "drop_policy": "no-drop",
    "host": {
      "name": "Los Angeles Critical Mass",
      "type": "informal"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": null,
    "description": "The last-Friday mass ride out of Koreatown, which calls itself the largest community bike ride in the country at 4,000-plus riders. Gather at Wilshire and Western by 6:30 and roll at 7:29. Every kind of bike; the group says all ages and skill levels. Read the ride rules and the waiver on the site before you come.",
    "links": {
      "website": "https://la-criticalmass.org/",
      "instagram": "https://www.instagram.com/lacriticalmass/",
      "facebook": "https://www.facebook.com/lacriticalmass/",
      "strava": null,
      "meetup": null,
      "other": ["https://la-criticalmass.org/lacm-ride-rules/", "https://la-criticalmass.org/directions-and-parking/"]
    },
    "inclusive_focus": [],
    "sources": ["https://la-criticalmass.org/"],
    "verified_on": "2026-09-30",
    "confidence": "high",
    "tz": "America/Los_Angeles",
    "start_hhmm": "18:30",
    "duration_min": null,
    "season_months": null,
    "monthly_rule": [{ "ord": -1, "day": "fri" }]
  },
  {
    "slug": "santa-monica-ca-la-grange-gravel-wednesday",
    "name": "Gravel Wednesday (Velo Club La Grange)",
    "city": "Santa Monica",
    "state": "CA",
    "neighborhood": "26th & San Vicente",
    "lat": 34.0447,
    "lng": -118.4869,
    "geo_precision": "start",
    "discipline": ["gravel"],
    "schedule": "Every Wednesday, 6:30 am",
    "days": ["wed"],
    "time_local": "6:30 am",
    "frequency": "weekly",
    "season": "year-round",
    "start_location": {
      "name": "26th St & San Vicente Blvd",
      "address": "San Vicente Blvd & 26th St, Santa Monica, CA"
    },
    "distance_miles": "15",
    "duration": null,
    "pace": "moderate/difficult; climbing and descending on gravel and loose dirt",
    "drop_policy": "unknown",
    "host": {
      "name": "Velo Club La Grange",
      "type": "club"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": "open to non-members; no fee stated",
    "description": "The club's weekday dirt ride: 15 miles from the corner of 26th and San Vicente at 6:30 on Wednesdays, with climbing and descending on gravel and loose dirt. Open to members and non-members, like all the club's rides. The club's rules: helmet, lights when it's dark, no aero bars, no earphones.",
    "links": {
      "website": "https://www.lagrange.org/rides",
      "instagram": "https://www.instagram.com/veloclublagrange",
      "facebook": "https://www.facebook.com/groups/lagrangecycling",
      "strava": "https://www.strava.com/clubs/velo-club-la-grange",
      "meetup": null,
      "other": []
    },
    "inclusive_focus": [],
    "sources": ["https://www.lagrange.org/rides"],
    "verified_on": "2026-09-30",
    "confidence": "medium",
    "tz": "America/Los_Angeles",
    "start_hhmm": "06:30",
    "duration_min": null,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "redondo-beach-ca-the-donut-ride",
    "name": "The Donut Ride",
    "city": "Redondo Beach",
    "state": "CA",
    "neighborhood": "Riviera Village",
    "lat": 33.8185,
    "lng": -118.3866,
    "geo_precision": "start",
    "discipline": ["road"],
    "schedule": "Every Saturday, 8:00 am",
    "days": ["sat"],
    "time_local": "8:00 am",
    "frequency": "weekly",
    "season": "year-round",
    "start_location": {
      "name": "Avenue I & Elena Ave",
      "address": "Avenue I & Elena Ave, Redondo Beach, CA"
    },
    "distance_miles": "42.9",
    "duration": null,
    "pace": "hard; regroups after the major climbs",
    "drop_policy": "groups",
    "host": {
      "name": "The Donut Ride",
      "type": "informal"
    },
    "founded_year": null,
    "founded_note": "Ridden every Saturday since the 1980s, per bigorangecycling.org",
    "cost": null,
    "description": "The South Bay's Saturday ride since the 1980s, around the Palos Verdes peninsula: 42.9 miles and about 4,700 feet, per Big Orange's page. No club or team owns it. You show up at Avenue I and Elena at 8 and ride hard; it regroups after the major climbs. Not a first group ride.",
    "links": {
      "website": "https://www.bigorangecycling.org/local-rides",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": []
    },
    "inclusive_focus": [],
    "sources": ["https://www.bigorangecycling.org/local-rides"],
    "verified_on": "2026-09-30",
    "confidence": "medium",
    "tz": "America/Los_Angeles",
    "start_hhmm": "08:00",
    "duration_min": null,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "redondo-beach-ca-friendly-donut-ride",
    "name": "Friendly Donut Ride (FDR)",
    "city": "Redondo Beach",
    "state": "CA",
    "neighborhood": "Hollywood Riviera (south Redondo Beach)",
    "lat": 33.8115,
    "lng": -118.3912,
    "geo_precision": "start",
    "discipline": ["road"],
    "schedule": "Every Saturday, usually 8:00 am",
    "days": ["sat"],
    "time_local": "8:00 am (usually)",
    "frequency": "weekly",
    "season": "year-round",
    "start_location": {
      "name": "Miramar Park",
      "address": "Miramar Park, Redondo Beach, CA"
    },
    "distance_miles": "25–75",
    "duration": null,
    "pace": "no-drop; 1,000 to 5,000-plus feet depending on the day",
    "drop_policy": "no-drop",
    "host": {
      "name": "Friendly Donut Ride",
      "type": "informal"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": null,
    "description": "The no-drop version of the Donut, from Miramar Park on Saturday mornings. 25 to 75 miles depending on the day, and the group's stated rule is that no one goes home feeling like a loser. It runs beginner rides at least twice a year; check in with the group before your first one. Listed on Big Orange's rides page, with its own Instagram.",
    "links": {
      "website": "https://www.bigorangecycling.org/local-rides",
      "instagram": "https://www.instagram.com/fdr.group/",
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": []
    },
    "inclusive_focus": ["no-drop"],
    "sources": ["https://www.bigorangecycling.org/local-rides"],
    "verified_on": "2026-09-30",
    "confidence": "medium",
    "tz": "America/Los_Angeles",
    "start_hhmm": "08:00",
    "duration_min": null,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "redondo-beach-ca-big-orange-club-ride",
    "name": "Big Orange Club Ride",
    "city": "Redondo Beach",
    "state": "CA",
    "neighborhood": "Hollywood Riviera (south Redondo Beach)",
    "lat": 33.8115,
    "lng": -118.3912,
    "geo_precision": "start",
    "discipline": ["road"],
    "schedule": "Every Saturday, usually 8:00 am",
    "days": ["sat"],
    "time_local": "8:00 am (usually)",
    "frequency": "weekly",
    "season": "year-round",
    "start_location": {
      "name": "Miramar Park",
      "address": "Miramar Park, Redondo Beach, CA"
    },
    "distance_miles": "40–100",
    "duration": null,
    "pace": "club training ride; regroups at the top of the major climbs; prior group-riding experience expected",
    "drop_policy": "groups",
    "host": {
      "name": "Big Orange Cycling",
      "type": "club"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": null,
    "description": "Big Orange's Saturday club ride out of Miramar Park: 40 to 100 miles and 3,000 to 6,000-plus feet, with regroups at the top of the major climbs. The club asks for prior group-riding experience and that you know its group practices. This week's route is on the club's Strava.",
    "links": {
      "website": "https://www.bigorangecycling.org/local-rides",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": []
    },
    "inclusive_focus": [],
    "sources": ["https://www.bigorangecycling.org/local-rides"],
    "verified_on": "2026-09-30",
    "confidence": "medium",
    "tz": "America/Los_Angeles",
    "start_hhmm": "08:00",
    "duration_min": null,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "manhattan-beach-ca-big-orange-team-ride",
    "name": "Big Orange Team Ride",
    "city": "Manhattan Beach",
    "state": "CA",
    "neighborhood": "Downtown Manhattan Beach",
    "lat": 33.8845,
    "lng": -118.4097,
    "geo_precision": "city",
    "discipline": ["road"],
    "schedule": "Every Sunday morning; 7:00 or 8:00 am depending on the season",
    "days": ["sun"],
    "time_local": "7:00–8:00 am, varies with the season",
    "frequency": "weekly",
    "season": "year-round; easier in August and September, harder October through January",
    "start_location": {
      "name": "Starbucks, Manhattan Beach (as the club page names it)",
      "address": null
    },
    "distance_miles": "60–100",
    "duration": null,
    "pace": "endurance tempo, around 3 w/kg; no-drop but serious training",
    "drop_policy": "no-drop",
    "host": {
      "name": "Big Orange Cycling",
      "type": "club"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": null,
    "description": "The club's Sunday training ride from a Starbucks in Manhattan Beach: 60 to 100 miles and anything from 1,000 to 7,000-plus feet. The page calls it no-drop and serious training at an endurance tempo. Mellow in August and September, harder from October into the racing season. The start time moves with the season; check the club's Strava before you go.",
    "links": {
      "website": "https://www.bigorangecycling.org/local-rides",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": []
    },
    "inclusive_focus": ["no-drop"],
    "sources": ["https://www.bigorangecycling.org/local-rides"],
    "verified_on": "2026-09-30",
    "confidence": "medium",
    "tz": "America/Los_Angeles",
    "start_hhmm": null,
    "duration_min": null,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "manhattan-beach-ca-new-pier-ride",
    "name": "New Pier Ride (NPR)",
    "city": "Manhattan Beach",
    "state": "CA",
    "neighborhood": "Manhattan Beach Pier",
    "lat": 33.8842,
    "lng": -118.4108,
    "geo_precision": "start",
    "discipline": ["road"],
    "schedule": "Every Tuesday and Thursday, 6:40 am",
    "days": ["tue", "thu"],
    "time_local": "6:40 am",
    "frequency": "weekly",
    "season": "year-round",
    "start_location": {
      "name": "Manhattan Beach Pier",
      "address": "Manhattan Beach Pier, Manhattan Beach, CA"
    },
    "distance_miles": "21.8",
    "duration": null,
    "pace": "flat and fast; the pace can pick up at any time",
    "drop_policy": "unknown",
    "host": {
      "name": "New Pier Ride",
      "type": "informal"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": null,
    "description": "The South Bay's weekday fast ride: 21.8 flat miles from the Manhattan Beach Pier at 6:40 on Tuesday and Thursday mornings. Big Orange's page says the pace can pick up at any time and that it's not for the timid. Know your speed before you show up.",
    "links": {
      "website": "https://www.bigorangecycling.org/local-rides",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": []
    },
    "inclusive_focus": [],
    "sources": ["https://www.bigorangecycling.org/local-rides"],
    "verified_on": "2026-09-30",
    "confidence": "medium",
    "tz": "America/Los_Angeles",
    "start_hhmm": "06:40",
    "duration_min": null,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "palos-verdes-estates-ca-wheatgrass-ride",
    "name": "Wheatgrass Ride",
    "city": "Palos Verdes Estates",
    "state": "CA",
    "neighborhood": "Malaga Cove",
    "lat": 33.8018,
    "lng": -118.3893,
    "geo_precision": "start",
    "discipline": ["road"],
    "schedule": "Every Sunday, 8:00 am",
    "days": ["sun"],
    "time_local": "8:00 am",
    "frequency": "weekly",
    "season": "year-round",
    "start_location": {
      "name": "Malaga Cove Plaza",
      "address": "Malaga Cove Plaza, Palos Verdes Estates, CA"
    },
    "distance_miles": "40",
    "duration": null,
    "pace": "quick; hilly, about 4,600 feet",
    "drop_policy": "unknown",
    "host": {
      "name": "Wheatgrass Ride",
      "type": "informal"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": null,
    "description": "Sunday's hilly ride on the Palos Verdes peninsula: 40 miles and about 4,600 feet from Malaga Cove Plaza at 8. Big Orange's page calls it friendly but challenging, at a quick pace. Bring climbing legs.",
    "links": {
      "website": "https://www.bigorangecycling.org/local-rides",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": []
    },
    "inclusive_focus": [],
    "sources": ["https://www.bigorangecycling.org/local-rides"],
    "verified_on": "2026-09-30",
    "confidence": "medium",
    "tz": "America/Los_Angeles",
    "start_hhmm": "08:00",
    "duration_min": null,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "los-angeles-ca-major-taylor-tuesday-ride",
    "name": "Major Taylor (Westchester Parkway laps)",
    "city": "Los Angeles",
    "state": "CA",
    "neighborhood": "Westchester",
    "lat": 33.9588,
    "lng": -118.409,
    "geo_precision": "city",
    "discipline": ["road"],
    "schedule": "Tuesdays, 6:00 pm, Daylight Saving Time only",
    "days": ["tue"],
    "time_local": "6:00 pm",
    "frequency": "weekly",
    "season": "Daylight Saving Time only (March–November)",
    "start_location": {
      "name": "Westchester Parkway",
      "address": "Westchester Pkwy, Westchester, Los Angeles, CA"
    },
    "distance_miles": null,
    "duration": null,
    "pace": "circuit-race training, 4.5-mile laps; half of each lap into a headwind",
    "drop_policy": "unknown",
    "host": {
      "name": "Major Taylor ride",
      "type": "informal"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": null,
    "description": "Tuesday-evening laps on Westchester Parkway by LAX, 4.5 miles and 60 feet a lap, during Daylight Saving Time. Race training, not a social ride; Big Orange's page says half of every lap is into the headwind. The page names the parkway, not a corner; ask on the club's Strava where the group gathers.",
    "links": {
      "website": "https://www.bigorangecycling.org/local-rides",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": []
    },
    "inclusive_focus": [],
    "sources": ["https://www.bigorangecycling.org/local-rides"],
    "verified_on": "2026-09-30",
    "confidence": "medium",
    "tz": "America/Los_Angeles",
    "start_hhmm": "18:00",
    "duration_min": null,
    "season_months": { "start": 3, "end": 11 },
    "monthly_rule": null
  },
  {
    "slug": "torrance-ca-telo-tuesday-crit",
    "name": "Telo (Tuesday practice crit)",
    "city": "Torrance",
    "state": "CA",
    "neighborhood": null,
    "lat": 33.8358,
    "lng": -118.3406,
    "geo_precision": "city",
    "discipline": ["road"],
    "schedule": "Tuesdays, 6:00 pm, Daylight Saving Time only",
    "days": ["tue"],
    "time_local": "6:00 pm",
    "frequency": "weekly",
    "season": "Daylight Saving Time only (March–November)",
    "start_location": {
      "name": "Telo Ave & Kashiwa St",
      "address": "Telo Ave & Kashiwa St, Torrance, CA"
    },
    "distance_miles": null,
    "duration": "about 1 hour",
    "pace": "practice criterium, A and B groups; one-mile, six-corner flat circuit",
    "drop_policy": "groups",
    "host": {
      "name": "Telo practice crit",
      "type": "informal"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": null,
    "description": "The South Bay's Tuesday-night practice criterium: a flat one-mile, six-corner circuit off Telo Avenue in Torrance, A and B groups, during Daylight Saving Time. Big Orange's page calls it one hour of beat down. It's a race, not a group ride.",
    "links": {
      "website": "https://www.bigorangecycling.org/local-rides",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": []
    },
    "inclusive_focus": [],
    "sources": ["https://www.bigorangecycling.org/local-rides"],
    "verified_on": "2026-09-30",
    "confidence": "medium",
    "tz": "America/Los_Angeles",
    "start_hhmm": "18:00",
    "duration_min": 60,
    "season_months": { "start": 3, "end": 11 },
    "monthly_rule": null
  },
  {
    "slug": "los-angeles-ca-la-wheelmen-sunday-ride",
    "name": "LA Wheelmen Sunday Ride",
    "city": "Los Angeles",
    "state": "CA",
    "neighborhood": null,
    "lat": 34.0522,
    "lng": -118.2437,
    "geo_precision": "city",
    "discipline": ["road"],
    "schedule": "Every Sunday; the start and routes change weekly and are posted on the club site",
    "days": ["sun"],
    "time_local": null,
    "frequency": "weekly",
    "season": "year-round",
    "start_location": null,
    "distance_miles": null,
    "duration": null,
    "pace": "easy, moderate and ambitious routes each Sunday",
    "drop_policy": "unknown",
    "host": {
      "name": "Los Angeles Wheelmen",
      "type": "club"
    },
    "founded_year": null,
    "founded_note": null,
    "cost": "guests welcome with a signed waiver; membership price not on the page",
    "description": "A recreational club that rides every Sunday from a different start around LA, Orange and Ventura counties, with easy, moderate and ambitious routes; a smaller Saturday group rides shorter, harder ones. Guests are welcome on every ride with a signed waiver. Helmets are mandatory. The month's schedule and route sheets are on the club site under Upcoming Rides.",
    "links": {
      "website": "https://www.lawheelmen.org/",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": ["https://www.lawheelmen.org/upcoming-rides/", "https://www.lawheelmen.org/overview-of-rides/"]
    },
    "inclusive_focus": [],
    "sources": ["https://lawheelmen.org", "https://www.lawheelmen.org/overview-of-rides/"],
    "verified_on": "2026-09-30",
    "confidence": "medium",
    "tz": "America/Los_Angeles",
    "start_hhmm": null,
    "duration_min": null,
    "season_months": null,
    "monthly_rule": null
  }
]
```

## Why these

Clubs:

- **Velo Club La Grange** — the easiest join in the city: five weekday 6:30 rides from one corner, open to non-members, plus the Saturday ride already in the directory. Zone 1.
- **Big Orange Cycling** — the South Bay's rides live on its one page; a visitor with a Saturday morning goes to the Donut or, if they'd rather not get shelled, the FDR. Zone 5.
- **Bicycle Kitchen** — the co-op. A visitor with a broken bike and no shop budget, and a Thursday night that says who it's for. Zone 3.
- **Wild Wolf Cycling Collective** — the gender-expansive and women's collective, queer- and BIPOC-led in its own words. The tag is `women-trans-femme` because that's the focus it states; whether `lgbtq` and `bipoc` belong too (it says "founded and led by BIPOC & LGBTQIA+ riders") is the editor's call.
- **Black Girls Do Bike: Los Angeles** — the BIPOC women's ride. Its rides are inside a Facebook group, so the note says join first.
- **Los Angeles Wheelmen** — the club for a rider who wants a Sunday with a route sheet and a waiver, not a race. Also the Grand Tour host (calendar, June 27 projected; the club page says "late June," no date).

Different Spokes Southern California is the queer club and is already in the directory (Sunday ride, `lgbtq`, `no-drop`, verified Sept 15); the editor can build its `clubs[]` entry from that record. Not re-fetched this run.

Rides:

- **LA Critical Mass** — the one monthly ride in the city a visitor can plan around; the site carries 2026 dates. `drop_policy: no-drop` is the mass-ride reading, the same as the SF record, not a quoted policy.
- **Gravel Wednesday** — the only La Grange weekday ride whose day is on the page (it's in the name). The other four are under Couldn't confirm.
- **The Donut, FDR, Big Orange Club Ride, Team Ride, NPR, Wheatgrass, Major Taylor, Telo** — every recurring ride on the Big Orange page. The page is undated (© 2026, DST references), so all are `medium`; the Donut, NPR, Wheatgrass, Major Taylor and Telo have no owner and the Big Orange page is where they're published. City fields are the real cities (Redondo Beach, Manhattan Beach, Palos Verdes Estates, Torrance); all sit inside 30 miles of City Hall, so they render on the LA town page either way. Whether they should carry `city: "Los Angeles"` to land in the LA hub is the editor's call; the brief says Long Beach and Pasadena have their own guides and the South Bay doesn't.
- **LA Wheelmen Sunday Ride** — rotating start, like the Different Spokes record; the club page confirms the day, the guest rule and the helmet rule. Time comes from the monthly schedule, which didn't load (below).

Coordinates: every `lat`/`lng` was placed on the corner or park the host names, not read off a page. The verifier should check them; the two `city`-precision ones (Major Taylor, Telo) are deliberately loose because the page names a road, not a corner.

## Rejected

- **BikeLA (LACBC)** — the county advocacy org. Its "Join a Bike Ride" page lists no ride and points to a Reddit wiki; the chapters page lists fifteen chapters and no rides. Not a club for this list; a link for @logistics-scout if wanted.
- **Trash Panda Cycling** as a club pick — real (Strava club, 601 members, "All welcome regardless of ethnicity, sexuality, gender identity, creed or nationality," Tuesday rides at 7 pm) but no start place anywhere I could read, and the six slots went to clubs with a ride a visitor can find. A general welcome is not a stated focus, so no tag. Its ride is under Couldn't confirm.
- **Big Orange Holiday Ride** — national-holiday Mondays and Thanksgiving, 8:00 from Highland and Manhattan Beach Blvd. Not a weekly or monthly pattern the directory holds. One line for the town page if the editor wants it.
- **Ovarian Psycos** — the search returned only the 2016 documentary and 2012–2017 press; no page of the collective's own surfaced. Can't say it rides in 2026.
- **Bike SGV Women on Wheels / SGV Bike Train** — from a 2017 LA Weekly piece; San Gabriel Valley, Pasadena's guide, not fetched.
- **CicLAvia** — an open-streets event, not a recurring ride. Dated editions go to the calendar.
- **Long Beach groups** (Queercicles, Lightning Velo, Bikes and Coffee) — Long Beach has its own hub and guide.
- **The 2017 BGDB LA schedule** (Wednesday 6 pm, Raleigh Park, Gardena; Fridays from Marina del Rey) — nine years old, not on the host's page. Not proposed.

## Couldn't confirm

- **La Grange weekday days** — Marina Ride (26 mi, moderate/difficult), Mandeville Canyon (20 mi, moderate), Amalfi Loops (26 mi, moderate), Marina Lite (23 mi, recovery): all 6:30 am at 26th and San Vicente, all open to non-members, confirmed on lagrange.org/rides. The page text names no day for any of them (three reads; only Gravel Wednesday carries one). @coffee-scout's read of the same page put them Tuesday / Wednesday / Thursday / Friday. Where to look: the club's Strava club events, @veloclublagrange, or a phone call; four `high` records the moment a day is on a page.
- **La Grange Women's Ride, which Saturday** — the rides page says "2nd Saturday of each month"; the ride's own page (lagrange.org/womens-ride) says "3rd Saturday of every month," which is what rides.json has. Host's two pages disagree. Where to look: the club Strava/Instagram; the page names Renée Fox as the contact.
- **Helen's Cycles shop ride** — the Strava club (2,278 members) shows no public schedule; the shop page says "Group Rides TBD." Nothing to list. Where to look: @helenscycles, or the shop by phone.
- **Different Spokes SoCal** — not re-fetched (call cap). The Sept 15 record stands; nothing new.
- **Trash Panda Cycling Tuesday 7 pm ride** — day and time on its Strava club page, no start place; its Threads page is blocked to fetchers; Instagram not fetched. Where to look: @trashpandacycling on Instagram; the Strava club events when logged in.
- **Trash Panda's Gender Expansive Ride (GXR)** — a 2023 LA Public Press piece and a CalBike piece describe it (weekend mornings, women and gender-queer riders); not on a host page I could read. Where to look: same handles.
- **Wild Wolf weekly ride** — the 2023 piece says weekly rides with a hub at LA Cyclery on Sunset in Silver Lake; the collective's site and RideWithGPS page list social rides and monthly campouts, no day or place. Where to look: @wildwolf.cc, the Slack.
- **BGDB LA rides** — posted in the Facebook group only (login wall).
- **LA Wheelmen start times and this month's starts** — lawheelmen.org/upcoming-rides redirects https to http and the fetcher won't follow; the overview page shows September and August 2026 schedule tabs with PDFs. Where to look: that page in a browser; the September 2026 PDF.
- **Big Orange page currency** — no date on the page; © 2026 and Daylight Saving Time references only. A Strava look at the Donut or NPR before any of the nine go `high`.
- **The Donut's own Strava and Facebook** — linked from Big Orange's page as icons; URLs not captured.

## Sources

Fetched and read:

- https://www.lagrange.org/rides
- https://www.lagrange.org/womens-ride
- https://www.bigorangecycling.org/local-rides
- https://www.strava.com/clubs/helenscycles
- https://la-bike.org
- https://www.la-bike.org/join-a-bike-ride-2
- https://www.la-bike.org/chapters
- https://bicyclekitchen.org
- https://lawheelmen.org
- https://www.lawheelmen.org/overview-of-rides/
- https://www.blackgirlsdobike.org/
- https://www.blackgirlsdobike.org/chapters
- https://wildwolfcc.weebly.com/
- https://ridewithgps.com/partners/wild-wolf-cycling-collective
- https://www.strava.com/clubs/456639
- https://la-criticalmass.org/
- https://lapublicpress.org/2023/05/biking-in-la-hasnt-always-been-accepting-but-these-gender-expansive-group-rides-are-trying-to-change-that/ (leads only, May 2023)
- https://www.laweekly.com/7-group-bike-rides-for-cyclists-new-to-l-a-s-streets/ (leads only, March 2017)

Tried, did not load:

- https://www.lawheelmen.org/upcoming-rides/ (302 to http, not followed)
- https://www.threads.com/@trashpandacycling (robots.txt)

Surfaced by search, not fetched (leads for the next run):

- https://www.calbike.org/community-on-two-wheels-las-gender-expansive-ride/
- https://queeradventurers.com/queer-bike-clubs/
- https://www.wildwolfcc.com/organizers.html
- https://www.instagram.com/wildwolf.cc/
- https://www.facebook.com/groups/BGDBLA
- https://la-criticalmass.org/faqs/

Hand-offs: @coffee-scout — Miramar Park (FDR and the club ride, Saturday 8) and the Manhattan Beach Pier (NPR, 6:40) are new ride-out corners; Avenue I and Elena and Malaga Cove Plaza they already have. @shop-scout — LA Cyclery, Sunset Blvd, Silver Lake (@lacyclery), named as Wild Wolf's hub in the 2023 piece; not fetched. @route-scout — Wild Wolf's RideWithGPS partner page is a route library; Big Orange's page carries distance and elevation for the Donut (42.9 mi / 4,695 ft), the Wheatgrass (40.0 / 4,634) and NPR (21.8 / 473). Editor — the Women's Ride ordinal, the `wtf` tag, the hub question for the South Bay cities, and the Grand Tour date (club says late June; calendar has June 27 projected).
