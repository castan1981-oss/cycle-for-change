# seattle-wa — community

@community-scout · 2026-10-03

Six clubs and five new ride records. All five rides are Cascade Bicycle Club
series that the Oct 1 deep sweep held back under its three-rides-per-host
cap; this guide isn't bound by that cap, so they're proposed here and the
editor decides. Every fact below is from a page fetched this run (list under
Sources). Two limits shaped the run. WebFetch only loaded URLs that came back
from a search, so most club and series pages I could name myself were
refused. And I used 9 WebSearch calls, one over the cap of 8 for this
session. Search is now spent.

`rides-proposed.json` holds the same five records as the `rides` block.
Coordinates are null on purpose: `tools/merge-ride-research.js` runs the
geocoder, and the addresses are in `start_location`. A scratch copy passed
`tools/derive-ride-fields.js --data` and `tools/validate-rides.js --data`
with 0 errors (the only warnings were the missing coordinates).

## Findings

### clubs

```json
[
  {
    "name": "Cascade Bicycle Club",
    "url": "https://cascade.org/rides-events/welcome-free-group-rides/ride-series",
    "note": "The region's big club and the STP's organizer. Its volunteer-led free group rides go out most days of the week from Seattle and the Eastside, posted about a week ahead on the club's ride calendar: {ride:seattle-wa-cascade-frumps-friday-ride|FRUMPS}, {ride:bellevue-wa-cascade-eastside-tours-evening-ride|Eastside Tours}, {ride:issaquah-wa-cascade-issaquah-social|the Issaquah Social}, and the MUMPS, TREATS, LUMPS, ROAD and Eastside Hills series. Free, but register for each ride on the site, wear a helmet and be there for the safety briefing; each pace, from Steady (12–14 mph) up, is its own group.",
    "inclusive_focus": []
  },
  {
    "name": "Outspoken Cycle Club (Seattle)",
    "url": "https://www.heylo.com/g/878fc3a9-d8c1-4ac5-8ff5-1cc8d6a52e71",
    "note": "Seattle's queer and allied cycle club, in its own words, with social rides from beginner-friendly outings to day-long rides around the region, and trips to rides elsewhere. Every ride is posted and signed up for on its Heylo page: in 2026 that meant spring and summer weeknight rides (Mercer Mondays from the East Portal Viewpoint, a no-drop West Seattle Wednesday ride from the Seacrest water taxi dock) and, this October, a three-ride chocolate-stop series. Join the Heylo group and pick a ride.",
    "inclusive_focus": ["lgbtq", "beginner"]
  },
  {
    "name": "NorthStar Cycling Club",
    "url": "https://northstar-bicycle-club.myshopify.com/pages/when-we-ride",
    "note": "A Central District club whose aim, in its own intro, is to \"Get Melanated People on Bicycles.\" Sunday Service leaves the clubhouse at 21st and Union: easy pace, no-drop, all levels invited, with a few bikes to rent. Fill in the club's waiver before you ride; the Wednesday Mercer Island ride is on hold.",
    "inclusive_focus": ["bipoc", "no-drop"],
    "ride_slug": "seattle-wa-northstar-sunday-service"
  },
  {
    "name": "Moxie Monday",
    "url": "https://everydayrides.com/groups/moxie-monday",
    "note": "A monthly evening ride \"for folks who are femme, trans, non-binary, gender non-conforming, and/or women,\" on any kind of bike, from Westlake Park downtown. Easy pace, 8 to 15 miles; the group stays together and picks the route before it rolls. Show up; ice or snow cancels. Instagram @moxiemonday.",
    "inclusive_focus": ["women-trans-femme", "no-drop"],
    "ride_slug": "seattle-wa-moxie-monday"
  },
  {
    "name": "Good Weather",
    "url": "https://everydayrides.com/groups/good-weather",
    "note": "The Sunday Social leaves Tailwind Cafe, 1424 11th Ave, on Capitol Hill: in the group's words, \"our weekly no-drop ride around town,\" with park sits and pastry stops at 10 to 12 mph. It also posts faster rides and the odd campout. Show up.",
    "inclusive_focus": ["no-drop"],
    "ride_slug": "seattle-wa-good-weather-sunday-social"
  },
  {
    "name": "Bike Works",
    "url": "https://bikeworks.org/adult-programs/open-shop-community-repair-space/",
    "note": "The nonprofit's Open Shop: its stands and tools, with or without a mechanic's help, in the warehouse at the back of 3715 S Hudson St. Usually the second and fourth Saturdays, 1 to 5 pm (first and third Saturdays from May to September in 2026); $10 to $20-plus an hour on a sliding scale, plus parts (Oct 2026). No sign-up: first come, four at a time.",
    "inclusive_focus": []
  }
]
```

### rides

```json
[
  {
    "slug": "kirkland-wa-cascade-eastside-hills",
    "name": "Eastside Hills",
    "city": "Kirkland",
    "state": "WA",
    "neighborhood": null,
    "lat": null,
    "lng": null,
    "geo_precision": null,
    "discipline": ["road"],
    "schedule": "Saturdays, year round, from the Kirkland Transit Center, in separate pace groups (Brisk, Strenuous, Vigorous). Each ride posts its own start time: 10:00 am in early October, 9:00 am in late August. A new hilly route east of Lake Washington each week.",
    "days": ["sat"],
    "time_local": "10:00 am",
    "frequency": "weekly",
    "season": "year-round",
    "start_location": {
      "name": "Kirkland Transit Center",
      "address": "3rd Street & Park Lane, Kirkland, WA 98033"
    },
    "distance_miles": "50–60",
    "duration": "about 4 hours",
    "pace": "Brisk most weeks, sometimes Vigorous (18–20 mph on the flat) or faster; 3,000 to 4,000 ft of climbing",
    "drop_policy": "groups",
    "host": { "name": "Cascade Bicycle Club Free Group Rides", "type": "nonprofit" },
    "founded_year": null,
    "founded_note": null,
    "cost": "free; register for each ride on Cascade's site",
    "description": "Cascade's hill ride for strong riders: 50 to 60 miles east of Lake Washington with 3,000 to 4,000 feet of climbing, from the Kirkland Transit Center. Each pace is its own group, and regroups are occasional, at the tops of hills. Free, but register on Cascade's site first, wear a helmet and be there for the safety briefing.",
    "links": {
      "website": "https://cascade.org/rides-events/84215",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": [
        "https://cascade.org/rides-events/welcome-free-group-rides/ride-series",
        "https://cascade.org/rides-events/eastside-hills/90363"
      ]
    },
    "inclusive_focus": [],
    "sources": [
      "https://cascade.org/rides-events/84215",
      "https://cascade.org/rides-events/eastside-hills/90363",
      "https://cascade.org/rides-events/welcome-free-group-rides/ride-series"
    ],
    "verified_on": "2026-10-03",
    "confidence": "high",
    "tz": "America/Los_Angeles",
    "start_hhmm": "10:00",
    "duration_min": 240,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "kenmore-wa-cascade-mumps-monday-ride",
    "name": "MUMPS (Monday Urban Merry Pedalers)",
    "city": "Kenmore",
    "state": "WA",
    "neighborhood": null,
    "lat": null,
    "lng": null,
    "geo_precision": null,
    "discipline": ["road"],
    "schedule": "Mondays, 10:00 am, from Log Boom Park in Kenmore, in three pace groups (Steady, Moderate, Brisk). Routes loop the north end of Lake Washington and Mercer Island, 26 to 50 miles. Some rides start at 9:00; check the posting.",
    "days": ["mon"],
    "time_local": "10:00 am",
    "frequency": "weekly",
    "season": null,
    "start_location": {
      "name": "Tracy Owen Log Boom Park",
      "address": "17415 61st Ave NE, Kenmore, WA 98028"
    },
    "distance_miles": "26–50",
    "duration": "about 4 to 5 hours",
    "pace": "Steady (12–14 mph), Moderate (14–16 mph) and Brisk groups; frequent regroups, but leaders won't wait long for anyone well off the pace",
    "drop_policy": "groups",
    "host": { "name": "Cascade Bicycle Club Free Group Rides", "type": "nonprofit" },
    "founded_year": null,
    "founded_note": null,
    "cost": "free; register for each ride on Cascade's site",
    "description": "A Monday-morning Cascade free group ride from Log Boom Park, at the north tip of Lake Washington, on loops around the lake and Mercer Island. Three pace groups each week. Free, but register on Cascade's site first, wear a helmet and be there for the safety briefing.",
    "links": {
      "website": "https://cascade.org/rides-events/monday-urban-merry-pedalers-mumps/87109",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": [
        "https://cascade.org/rides-events/ride-event-search",
        "https://cascade.org/rides-events/welcome-free-group-rides/ride-series"
      ]
    },
    "inclusive_focus": [],
    "sources": [
      "https://cascade.org/rides-events/ride-event-search",
      "https://cascade.org/rides-events/welcome-free-group-rides/ride-series",
      "https://cascade.org/rides-events/monday-urban-merry-pedalers-mumps/87109"
    ],
    "verified_on": "2026-10-03",
    "confidence": "high",
    "tz": "America/Los_Angeles",
    "start_hhmm": "10:00",
    "duration_min": 240,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "redmond-wa-cascade-treats-tuesday-ride",
    "name": "TREATS (Tuesday Ride for Eclectic Athletic Travelers)",
    "city": "Redmond",
    "state": "WA",
    "neighborhood": null,
    "lat": null,
    "lng": null,
    "geo_precision": null,
    "discipline": ["road"],
    "schedule": "Tuesdays, 10:00 am; the start and route change each week, mostly on the Eastside. Steady pace.",
    "days": ["tue"],
    "time_local": "10:00 am",
    "frequency": "weekly",
    "season": null,
    "start_location": {
      "name": "Varies by week (Oct 6, 2026: Redmond; Jul 14, 2026: Redmond Ridge QFC, 23471 NE Novelty Hill Rd)",
      "address": null
    },
    "distance_miles": "27–43",
    "duration": "about 4 to 5 hours, with a lunch or coffee stop",
    "pace": "Steady, 12–14 mph; hilly routes; keep the group in sight, with occasional regroups at the top of climbs",
    "drop_policy": "unknown",
    "host": { "name": "Cascade Bicycle Club Free Group Rides", "type": "nonprofit" },
    "founded_year": null,
    "founded_note": null,
    "cost": "free; register for each ride on Cascade's site",
    "description": "A Tuesday Cascade free group ride at a steady pace, with a new start and route each week, often out to the Snoqualmie Valley with a lunch or coffee stop. Riders are asked to stay within sight of the group; the sweep won't stay with a rider far off the pace. Free, but register on Cascade's site first, wear a helmet and be there for the safety briefing.",
    "links": {
      "website": "https://cascade.org/rides-events/tuesday-ride-eclectic-athletic-travelers-treats/89978",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": [
        "https://cascade.org/rides-events/ride-event-search",
        "https://cascade.org/rides-events/welcome-free-group-rides/ride-series"
      ]
    },
    "inclusive_focus": [],
    "sources": [
      "https://cascade.org/rides-events/ride-event-search",
      "https://cascade.org/rides-events/welcome-free-group-rides/ride-series",
      "https://cascade.org/rides-events/tuesday-ride-eclectic-athletic-travelers-treats/89978"
    ],
    "verified_on": "2026-10-03",
    "confidence": "high",
    "tz": "America/Los_Angeles",
    "start_hhmm": "10:00",
    "duration_min": 240,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "seattle-wa-cascade-lumps-wednesday-ride",
    "name": "LUMPS (Leisurely Urbane Matthews-beach Pedalers)",
    "city": "Seattle",
    "state": "WA",
    "neighborhood": "North Seattle",
    "lat": null,
    "lng": null,
    "geo_precision": null,
    "discipline": ["road", "social"],
    "schedule": "Wednesdays, late morning. The posted rides have two starts: Matthews Beach Park in North Seattle at 11:30 am (Steady) and the East Lake Sammamish Trail by the Redmond Whole Foods at 11:10 am (Moderate). Both ride flat trails to a pie stop in Bothell.",
    "days": ["wed"],
    "time_local": "11:30 am",
    "frequency": "weekly",
    "season": null,
    "start_location": {
      "name": "Matthews Beach Park",
      "address": null
    },
    "distance_miles": "17–23",
    "duration": "about 3 hours",
    "pace": "Steady (12–14 mph) from Matthews Beach; Moderate (14–16 mph) from Redmond; flat trail riding, a social ride",
    "drop_policy": "groups",
    "host": { "name": "Cascade Bicycle Club Free Group Rides", "type": "nonprofit" },
    "founded_year": null,
    "founded_note": null,
    "cost": "free; register for each ride on Cascade's site",
    "description": "Cascade's Wednesday social ride on the flat trails north of the lake, built around a pie or cookie stop at the North Shore Senior Center in Bothell. One group leaves Matthews Beach Park, another leaves Redmond. Free, but register on Cascade's site first, wear a helmet and be there for the safety briefing; e-bikes welcome at these paces.",
    "links": {
      "website": "https://cascade.org/rides-events/leisurely-urbane-matthews-beach-pedalers-lumps/87919",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": [
        "https://cascade.org/rides-events/ride-event-search",
        "https://cascade.org/rides-events/welcome-free-group-rides/ride-series"
      ]
    },
    "inclusive_focus": [],
    "sources": [
      "https://cascade.org/rides-events/ride-event-search",
      "https://cascade.org/rides-events/welcome-free-group-rides/ride-series",
      "https://cascade.org/rides-events/leisurely-urbane-matthews-beach-pedalers-lumps/87919"
    ],
    "verified_on": "2026-10-03",
    "confidence": "medium",
    "tz": "America/Los_Angeles",
    "start_hhmm": "11:30",
    "duration_min": 180,
    "season_months": null,
    "monthly_rule": null
  },
  {
    "slug": "redmond-wa-cascade-road-ride-on-after-dark",
    "name": "ROAD: Ride On After Dark",
    "city": "Redmond",
    "state": "WA",
    "neighborhood": null,
    "lat": null,
    "lng": null,
    "geo_precision": null,
    "discipline": ["road"],
    "schedule": "Wednesdays, 6:00 pm, through the winter, from the plaza between the Redmond Senior & Community Center and the police station. Five pace groups, Steady to Strenuous, on rotating routes of about 21 to 24 miles. A good headlight and red taillight are required.",
    "days": ["wed"],
    "time_local": "6:00 pm",
    "frequency": "weekly",
    "season": "October–March",
    "start_location": {
      "name": "Redmond Senior & Community Center (plaza by the police station)",
      "address": "8701 160th Ave NE, Redmond, WA 98052"
    },
    "distance_miles": "21–24",
    "duration": "about 2.5 hours",
    "pace": "Five groups: Steady (12–14 mph), Moderate, Brisk, Vigorous and Strenuous; 1,340 to 1,600 ft of climbing; short regroups at the tops of hills",
    "drop_policy": "groups",
    "host": { "name": "Cascade Bicycle Club Free Group Rides", "type": "nonprofit" },
    "founded_year": null,
    "founded_note": null,
    "cost": "free; register for each ride on Cascade's site",
    "description": "Cascade's winter night training ride: every Wednesday evening out of Redmond, about 21 to 24 hilly miles in five pace groups. Lights front and rear are required. Groups don't stop for mechanicals, and a rider who can't hold the pace may finish alone. Free, but register on Cascade's site first and be there for the safety briefing.",
    "links": {
      "website": "https://cascade.org/rides-events/ride-after-dark-road/89097",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": [
        "https://cascade.org/rides-events/ride-event-search",
        "https://cascade.org/rides-events/welcome-free-group-rides/ride-series"
      ]
    },
    "inclusive_focus": [],
    "sources": [
      "https://cascade.org/rides-events/ride-event-search",
      "https://cascade.org/rides-events/welcome-free-group-rides/ride-series",
      "https://cascade.org/rides-events/ride-after-dark-road/89097"
    ],
    "verified_on": "2026-10-03",
    "confidence": "high",
    "tz": "America/Los_Angeles",
    "start_hhmm": "18:00",
    "duration_min": 150,
    "season_months": { "start": 10, "end": 3 },
    "monthly_rule": null
  }
]
```

## Why these

Clubs:

- **Cascade Bicycle Club**: the club that runs the STP, and the easiest way onto local roads any day of the week. Free, and every pace is posted. The note links the three Cascade rides already in the directory by token. Once the five below are merged, swap in `{ride:kenmore-wa-cascade-mumps-monday-ride|MUMPS}`, `{ride:redmond-wa-cascade-treats-tuesday-ride|TREATS}`, `{ride:seattle-wa-cascade-lumps-wednesday-ride|LUMPS}`, `{ride:redmond-wa-cascade-road-ride-on-after-dark|ROAD}` and `{ride:kirkland-wa-cascade-eastside-hills|Eastside Hills}` for the plain names.
- **Outspoken Cycle Club (Seattle)**: the queer club, which says so itself ("Seattle's queer and allied cycle club"). `beginner` because it names "beginner-friendly outings". The San Diego chapter is already in the directory (`san-diego-ca-outspoken-cycle-club-rides`); this is the Seattle chapter. None of its rides could go in the directory this run (see Couldn't confirm), so the note sends people to Heylo.
- **NorthStar Cycling Club**: the BIPOC ride. The host page states the Sunday ride, the clubhouse corner, "No-drop ride" and "All levels invited". The words "Get Melanated People on Bicycles" are the club's Facebook intro, read on a mirror page (localgymsandfitness.com) because Facebook blocks fetchers and northstarcycling.org returns 526. That's the source for `bipoc`; the directory record already carries it. Editor, your call whether a mirror is enough.
- **Moxie Monday**: the women, trans, femme and non-binary ride, in its own words on its Everyday Rides group page, with dates posted to Dec 7. `no-drop` comes from the group's own "stay together" setting. The directory record also carries `lgbtq`; the group's page doesn't use that word, so I left it off the club entry.
- **Good Weather**: the easy Sunday ride from a Capitol Hill café, no-drop in its own words, and dates posted three weeks out. Good for a visitor staying downtown or on the Hill.
- **Bike Works**: the co-op slot. Its own page has a 2026 note about the hours, no sign-up and published prices. A visitor with a problem the hotel can't fix and no shop budget can use it.

Rides:

- **Eastside Hills** (Kirkland): the Saturday hill ride a strong visitor wants, at 50 to 60 miles and 3,000 to 4,000 ft. The series page says it runs year-round and lists Oct 3, 2026 at 10:00 am in three paces. The Aug 22, 2026 ride page gives the Transit Center corner and the regroup rule. It sits in the brief's zone 3, the Eastside hills.
- **MUMPS** (Kenmore): a Monday ride around Lake Washington and Mercer Island, in three paces. The search listing shows Oct 5, 2026 at 10:00 am from Kenmore. The Log Boom Park address is on a June 30, 2025 ride page and the series page names the same park. Zone 2. `season` is null because no page says whether it runs all winter.
- **TREATS** (Redmond): Tuesdays at 10:00 am, steady pace, a new start each week (Oct 6, 2026 listed). I set `drop_policy: "unknown"` because the page asks riders to stay in sight and says the sweep won't stay with someone far off the pace. That isn't a pace-group setup or a stated drop.
- **LUMPS** (Seattle): the slow Wednesday pie ride. It is `medium` because the 11:30 Matthews Beach start time comes from one listing (Oct 7, 2026); the Redmond start has listings for Oct 1, 2025 and Oct 7, 2026. The editor may want to split it into two records if both starts run every week.
- **ROAD** (Redmond): the winter night ride, Wednesdays at 6:00 pm with lights. The March 25, 2026 page says "every Wednesday in Redmond" and calls it the last of the 2025–26 season. The listing shows it back on Oct 7, 2026 in five paces. I took `season_months` 10–3 from those two dates; the season may start in late September.

Already in the directory and seen alive on today's pages (for upkeep, no change proposed): Eastside Tours (Oct 8, 6:20 pm, winter location), Issaquah Social (Oct 8, 11:00 am), FRUMPS (Oct 9, Woodinville), Good Weather (Oct 4, 11, 18), Moxie Monday (Oct 5, Nov 2, Dec 7), Mello Fellos (Oct 17, 24, 8:00 am), Beer Junction (Oct 31, 2:00 pm), Seattle Bike Disco (Oct 23 at Red Square, Nov 20 at Pratt Park). NorthStar's host page is undated.

## Rejected

- **Cascade's one-date rides this week**: Snoqualmie to Middle Fork (Sun Oct 4), Bouncing Goats (Mon Oct 5), Midweek Hills from Bothell (Wed Oct 7), the North Lake Washington loop from Big Finn Park in Kirkland (Wed Oct 7), and Midweek Tune-Up, 6 or 7 Hills of Kirkland (Thu Oct 8). None is a series on the page.
- **Kitsap Color Classic (Oct 11), Cranksgiving (Nov 21), Cascade's member meeting**: events, not recurring rides. The calendar already has `kitsap-color-classic`.
- **The Bikery** as the co-op pick: its own site lists weekend shop hours (Sat and Sun 12 to 6, stand time $5 to $15 an hour, "no one will be turned away for lack of funds") but nothing dated in 2026, and its events page shows nothing after 2024. Bike Works had the dated page. It goes to @shop-scout below.
- **COGS and Brevay Cycling** as club picks: their rides are in the directory. COGS lets a guest ride once before joining. Brevay's Thursday series has nothing posted after Sept 24. The six slots went to groups a visitor can join this month.
- **The Bicycle Fixer**: a mobile shop. Its rides page lists annual events only.
- **Coffee Outside Seattle and Eastside Coffee Outside** (Wednesdays, 7 am): coffee meetups, not rides.
- **Seattle Dykes on Bikes**: a motorcycle club.
- **Sound Break co-working ride (Oct 7), Ride to the Steilacoom MFG CX race (Oct 11, from Tacoma), Cat Rides NW's Pumpkin Patch Ride (Oct 10, Colman Dock to Bainbridge)**: one-offs.

## Couldn't confirm

- **Outspoken Mercer Mondays**: Mon Apr 6, 2026, 5:30 to 7:30 pm, East Portal Viewpoint on Lake Washington Blvd S (outside the east end of the Mt Baker tunnel), 15 miles and 875 ft, working lights required, rain cancels. The page doesn't say whether it repeats or when the season ends, and nothing is posted for October. Where to look: the Heylo group's past events, or ask an organizer through Heylo.
- **Outspoken West Seattle Wednesday Rides**: Wed Jun 24, 2026, 6:00 to 8:00 pm, the West Seattle Water Taxi pier at the Seacrest dock. "This is a no drop ride", "All ride levels welcome", and the stops alternate between The Lumberyard and Beer Star in White Center. The text says "Now that Spring is here, it's time to restart," so it's seasonal, but no end date is given. Same place to look. Both rides are good `lgbtq` directory records for spring 2027 once a season is stated.
- **Oh, Henry!** (Cascade): Thu Oct 8, 2026, 10:00 am, Seattle, 22.5 miles, 1,100 ft, Steady (search listing). The ride page was refused, so no start place. The Oct 1 sweep calls it a Thursday ride, but it isn't on the series list. Where to look: cascade.org/rides-events/90645.
- **MEETS** (Wednesday evenings from Sixty Acres, Redmond, from April) and **MORE** (Monday evenings from Woodland Park, several paces): summer series on Cascade's series page, with no dated ride now. Re-check in April.
- **Cascade's other series** (CATS from Magnuson Park on Saturdays, CHEW on Sundays, Cycle Tuesdays, CAFES, Friday Riders, GR2R, NERDS from the Edmonds Park & Ride, Hills of the West Coast, Winter Training Series): names on the series page, but no day, time and start that I could read together. Most are seasonal training series.
- **Emerald City Bike Club**: "No-drop social ride covering 20-30 miles" on Thursdays at 5:15 pm, per the Everyday Rides groups list. No start place, no events. The group page was refused. Instagram @emeraldcitybikeclub.
- **Half-Fast Bicycle Spirit Club** (Georgetown, first Saturdays), **Con Fleis Cycling Club** ("for latino/x guys in Seattle Area"), **KREW** (Korean Riders Exploring Washington), **Familybike Seattle** (Kidical Mass, no-drop rides for all ages), **Night Moves** (a Monday social), **BCC** (fixed gear, "most Saturday's"): one line each on the Everyday Rides groups list, with no events posted.
- **The Cyclist Club**: Sat Oct 17, 8:30 am, Alki Beach, 10 miles, "relaxed no drop first ride". It's a first ride with no schedule yet. Re-check after Oct 17.
- **Classic Cycle, Bainbridge Island**: its ride calendar (classiccycleus.com/rentals/rides/) redirects from https to http and back, and the fetcher can't follow. This is the likely Bainbridge shop ride. Where to look: the page in a browser, or a call.
- **Good Weather's own site** (goodweatherinseattle.com): refused. The Everyday Rides group page carried the facts.
- **Seattle Queer History Ride** (Cascade): Sat June 20, 2026, noon, from the Black Sun sculpture in Volunteer Park, 5 miles at 10 to 12 mph with ten stops on Seattle's LGBTQ+ history. "#1" means more were planned in 2026, but none are listed now. It's a dated ride, not a weekly one: a lead for @culture-scout and the calendar.

## Sources

Fetched and read:

- https://cascade.org/rides-events/welcome-free-group-rides/ride-series
- https://cascade.org/rides-events/ride-event-search
- https://cascade.org/rides-events/ride-event-search?page=1
- https://cascade.org/rides-events/ride-event-search?date_from=2026-10-10&date_to=2026-10-31
- https://cascade.org/rides-events/84215
- https://cascade.org/rides-events/eastside-hills/90363
- https://cascade.org/rides-events/monday-urban-merry-pedalers-mumps/87109
- https://cascade.org/rides-events/tuesday-ride-eclectic-athletic-travelers-treats/89978
- https://cascade.org/rides-events/leisurely-urbane-matthews-beach-pedalers-lumps/87919
- https://cascade.org/rides-events/ride-after-dark-road/89097
- https://cascade.org/rides-events/89717
- https://www.heylo.com/g/878fc3a9-d8c1-4ac5-8ff5-1cc8d6a52e71
- https://www.heylo.com/event/f2c73aa7-e2ac-41f8-bbad-98bdde37ed49
- https://www.heylo.com/event/0ec2ab46-33d2-4950-a27e-84b47c54cb42
- https://ridewithgps.com/organizations/9613-outspoken-cycle-club/home?lang=en (loaded; no profile text came through)
- https://northstar-bicycle-club.myshopify.com/pages/when-we-ride
- https://www.localgymsandfitness.com/US/Seattle/107319527688971/NorthStar-Cycling-Club
- https://everydayrides.com/calendar
- https://everydayrides.com/groups
- https://everydayrides.com/groups/moxie-monday
- https://everydayrides.com/groups/good-weather
- https://everydayrides.com/event-series/690e2a060214ed1d170518b0-brevay-cycling-wtfnb-weekly
- https://bikeworks.org/adult-programs/open-shop-community-repair-space/
- https://www.thebikery.org/
- https://www.thebikery.org/events/
- https://thebicyclefixer.com/events-and-rides

Tried, did not load:

- https://www.northstarcycling.org/blog-1 (HTTP 526)
- https://www.facebook.com/NorthStarCyclingClub (robots.txt)
- http://classiccycleus.com/rentals/rides/ (https/http redirect loop)
- https://cascade.org/rides-events/90645, https://cascade.org/rides-events/282, https://cascade.org/rides-events/284 (fetch permission not granted)
- https://www.goodweatherinseattle.com (fetch permission not granted)
- https://everydayrides.com/groups/emerald-city-bike-club, https://everydayrides.com/cities/seattle-wa (fetch permission not granted)

Surfaced by search, not fetched (leads for the next run):

- https://www.facebook.com/outspokencc/
- https://giving.aidslifecycle.org/teams/7252 (Team Outspoken Seattle, AIDS/LifeCycle)
- https://www.heylo.com/event/-OmqwHDIlwH03K0nFjFA (OCC Pride Ride, 66 miles)
- https://www.heylo.com/event/-Oysovc-sZAtADEjJJvO (OCC at Obliteride 2026)
- https://www.heylo.com/event/-OQiYPnPrA1E1ez24OrV (OCC Ride and Dine series, 2025)
- https://seattlepride.org/events/seattle-queer-history-bike-ride
- https://cascade.org/rides-events/86431 (an earlier Queer History Ride)
- https://everydayrides.com/events/69d47ac9776c1818aaa1bee0-moxie-monday-monthly-reboot
- https://www.yelp.com/biz/bike-works-seattle-2 · https://www.yelp.com/biz/the-bikery-seattle
- https://www.commuteseattle.com/bike-month-spotlight-cycling-groups-for-shared-identies/ (May 2023)
- http://wrightbrotherscycleworks.com/

Local files read for leads: `research/rides/deep/wa/wa.md`,
`research/rides/deep/second-pass/g2-norcal-pnw.md` and `-outcomes.json`.

Hand-offs:

- @route-scout: Outspoken's RideWithGPS organization page is a route library, but its profile didn't render for the fetcher. Cascade's ride pages carry route files ("download route files beforehand"). The MUMPS loop of the north end of Lake Washington and Mercer Island is 49 miles and 2,350 ft (Oct 5 listing). Outspoken's Mercer Mondays loop from the East Portal Viewpoint is 15 miles and 875 ft.
- @coffee-scout: Tailwind Cafe, 1424 11th Ave, is a ride-out spot (`ride_out: true`, Good Weather). Look for coffee near the Kirkland Transit Center (Eastside Hills) and Log Boom Park in Kenmore (MUMPS).
- @shop-scout: The Bikery, 855 Hiawatha Pl S (its own site; Yelp lists 845), DIY shop open Sat and Sun 12 to 6. Bike Works' retail shop (Yelp gives 3709 S Ferdinand St; not fetched). Classic Cycle on Bainbridge Island (the ride calendar wouldn't load). NorthStar rents a few bikes for its Sunday ride.
- @culture-scout: the Seattle Queer History Ride (above).
- Editor: (1) the five Cascade records and the per-host cap; (2) the `bipoc` source for NorthStar; (3) `lgbtq` on the Moxie Monday directory record isn't in the group's own words on the page I read; (4) the town clubs use `women-trans-femme`, the rides store `wtf` (none of the five records needs it); (5) Brevay's Thursday ride has nothing posted after Sept 24 and should go to the re-check queue; (6) swap the Cascade note's plain series names for tokens after the merge (Why these, first bullet).
