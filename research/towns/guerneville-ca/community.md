# guerneville-ca — @community-scout — 2026-11-16

First build. Read before writing: `brief.md`, `SCOUT-RULES.md`, the agent
file, `clubs` and "Group rides" in `data/SCHEMA.md`, the top of
`tools/build-rides.js`, the first record of `cfc-site/rides/rides.json`,
the vocabularies in `tools/lib/rides-schema.js`, `CLAUDE.md`.

**The short answer: no page I could fetch shows a club or a recurring
group ride that starts in Guerneville.** The riding community a visitor
can join is the Santa Rosa Cycling Club, whose calendar starts rides in
Monte Rio, Sebastopol, Graton, Windsor, Healdsburg and Santa Rosa and
routes one of them to Guerneville. Everything else confirmed is in Santa
Rosa.

**Three things the editor needs to know before using this file.**

1. **No coordinates and no miles.** This session's fetch tool only opens
   URLs that a search returned. Wikipedia, the county parks site, the
   club's individual event pages, Strava and Instagram were all refused.
   So I have no fetched lat/lng for any start. Every proposed ride has
   `lat: null, lng: null`, and I did not measure miles from 38.5064,
   -122.9908. The brief asks for miles on every ride; that is not done.
   `tools/merge-ride-research.js` geocodes; the miles follow from that.
2. **I did not check the proposals against the whole of `rides.json`.**
   I have no grep here and read only the first record. I relied on the
   brief's statement that one ride in Sonoma County is listed (the
   Sports Basement last-Sunday ride). The merge dedupes by city, day,
   time and host.
3. **Vocabulary.** The agent file says `women-trans-femme` and `gravel`
   for `inclusive_focus`; `rides-schema.js` says `wtf` and has no
   `gravel`. It did not matter here: no ride I confirmed states a focus
   beyond no-drop and beginner.

## 1. Findings

### clubs

```json
[
  {
    "name": "Santa Rosa Cycling Club",
    "url": "https://srcc.wildapricot.org/About-SRCC",
    "note": "The county's big road club, with rides most days at 9:30 am from parks in Sebastopol, Windsor, Healdsburg and Santa Rosa, and some from Monte Rio and Graton. Its calendar gives each ride a terrain number, a pace letter and the miles. A non-member can ride once after signing the waiver at the start; after that you join ($25 a year, or a free 90-day trial, read Nov 2026).",
    "inclusive_focus": [],
    "ride_slug": null
  },
  {
    "name": "Sports Basement Santa Rosa",
    "url": "https://www.visitsantarosa.com/events/group-rides-with-sports-basement",
    "note": "A shop that leads a free monthly road ride from inside the store at 1970 Santa Rosa Ave. Most routes are 30 to 40 miles and nobody is left behind. Show up; the shop posts changes on its Strava club.",
    "inclusive_focus": ["no-drop"],
    "ride_slug": "santa-rosa-ca-sports-basement-last-sunday-ride"
  },
  {
    "name": "Santa Rosa Taco Tuesday Ride",
    "url": "https://www.visitsantarosa.com/events/santa-rosa-taco-tuesday-bike-ride",
    "note": "A community evening ride through central Santa Rosa to the taco trucks at Mitote Food Park and back, 8 miles round trip, all year. Free, show up. Rain and holidays cancel it.",
    "inclusive_focus": [],
    "ride_slug": null
  }
]
```

Notes on the block:

- `ride_slug` on Sports Basement is the ride the brief says is already
  listed. The other two are null until the editor decides on the
  proposals below; if they merge, the slugs are the ones in the `rides`
  block.
- The Sports Basement and Taco Tuesday `url` values are the Visit Santa
  Rosa listings, because those are the pages I read. The shop's own
  store page and the ride's own Facebook group and Instagram would not
  open (see part 4). Swap in the host's own page once someone has read
  it.
- `inclusive_focus` on Sports Basement is from the listing's "we won't
  leave any rider behind". The directory record also carries `beginner`
  per the brief; I did not find that word on the last-Sunday listing, so
  I left it off here.

### rides

Three proposals. None is in Guerneville. All `lat`/`lng` are null (see
the top of the file).

```json
[
  {
    "slug": "sebastopol-ca-santa-rosa-cycling-club-friendly-friday-first-friday",
    "name": "Friendly Friday Rides, First Friday",
    "name_en": null,
    "kind": "group-ride",
    "status": "active",
    "status_note": null,
    "status_since": null,
    "city": "Sebastopol",
    "neighborhood": null,
    "region": "California",
    "state": "CA",
    "country": "US",
    "lat": null,
    "lng": null,
    "geo_precision": "start",
    "tz": "America/Los_Angeles",
    "discipline": ["road"],
    "schedule": "First Friday of the month, 9:30 am, from Ragle Park in Sebastopol. The club's other Friendly Friday rides start elsewhere: second Friday in Cotati, third at Howarth Park in Santa Rosa, fourth at Healdsburg City Hall.",
    "days": ["fri"],
    "time_local": "9:30 am",
    "start_hhmm": "09:30",
    "frequency": "monthly",
    "monthly_rule": null,
    "dates": ["2026-12-04"],
    "season": null,
    "season_months": null,
    "start_location": { "name": "Ragle Park, Sebastopol", "address": null },
    "distance_km": null,
    "distance_miles": null,
    "duration": null,
    "duration_min": null,
    "pace": null,
    "drop_policy": "unknown",
    "host": { "name": "Santa Rosa Cycling Club", "type": "club" },
    "founded_year": null,
    "founded_note": null,
    "cost": null,
    "language": ["en"],
    "visitor_notes": "Non-members are welcome on their first ride with the club and sign a waiver at the start. Helmets are required. The ride leaves 10 minutes after the posted time, or when the leader's talk ends. Rain cancels unless the listing says otherwise.",
    "description": "The Santa Rosa Cycling Club's Friendly Friday ride on the first Friday of the month, from Ragle Park in Sebastopol. The calendar lists it as a series with no pace code; the route and the day's pace are in that month's listing.",
    "links": {
      "website": "https://srcc.wildapricot.org/Calendar",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": ["https://srcc.wildapricot.org/Introduction-to-Club-Rides"]
    },
    "inclusive_focus": [],
    "sources": [
      "https://srcc.wildapricot.org/Calendar",
      "https://srcc.wildapricot.org/Introduction-to-Club-Rides"
    ],
    "verified_on": "2026-11-16",
    "last_seen": "2026-11-16",
    "evidence": "The club's calendar (fetched Nov 16, 2026) lists 'Friendly Friday Rides, First Friday' as a two-date series, Fri Nov 6 and Fri Dec 4, 2026, 9:30 am, Ragle Park, Sebastopol. The event's own page could not be opened, so pace, distance and regroup policy are not read.",
    "confidence": "medium",
    "refresh": {
      "method": "calendar-page",
      "watch_url": "https://srcc.wildapricot.org/Calendar",
      "feed_url": null,
      "notes": "A Wild Apricot calendar. The series is event id 6554906 on the calendar; that page was not fetched."
    }
  },
  {
    "slug": "santa-rosa-ca-santa-rosa-cycling-club-chain-gang",
    "name": "Chain Gang",
    "name_en": null,
    "kind": "group-ride",
    "status": "active",
    "status_note": null,
    "status_since": null,
    "city": "Santa Rosa",
    "neighborhood": null,
    "region": "California",
    "state": "CA",
    "country": "US",
    "lat": null,
    "lng": null,
    "geo_precision": "city",
    "tz": "America/Los_Angeles",
    "discipline": ["road"],
    "schedule": "Tuesdays, Thursdays and Saturdays, 9:30 am. The start changes every ride: in November 2026 it was Keiser Park in Windsor, Howarth Park and Finley Park in Santa Rosa, Healdsburg City Hall, Ragle Ranch Park in Sebastopol and the Cotati Vets north lot. No Chain Gang ride was listed for Sat Nov 21.",
    "days": ["tue", "thu", "sat"],
    "time_local": "9:30 am",
    "start_hhmm": "09:30",
    "frequency": "weekly",
    "monthly_rule": null,
    "season": null,
    "season_months": null,
    "start_location": { "name": "Varies; the club's calendar names it for each ride", "address": null },
    "distance_km": null,
    "distance_miles": null,
    "duration": null,
    "duration_min": null,
    "pace": "Mostly B (14–16 mph) or AB and B (12–16 mph) on the club's scale; 31 to 38 miles on rolling terrain in November 2026",
    "drop_policy": "unknown",
    "host": { "name": "Santa Rosa Cycling Club", "type": "club" },
    "founded_year": null,
    "founded_note": null,
    "cost": null,
    "language": ["en"],
    "visitor_notes": "Check the club's calendar for the day's start. Non-members are welcome on their first ride with the club and sign a waiver at the start. Helmets are required. The ride leaves 10 minutes after the posted time, or when the leader's talk ends.",
    "description": "The Santa Rosa Cycling Club's Chain Gang rides three mornings a week from a different park each time, across Santa Rosa, Windsor, Healdsburg, Sebastopol and Cotati. Each listing carries the club's rating: terrain, pace and miles. One November 2026 ride went from Ragle Ranch Park in Sebastopol on an Occidental loop.",
    "links": {
      "website": "https://srcc.wildapricot.org/Calendar",
      "instagram": null,
      "facebook": null,
      "strava": null,
      "meetup": null,
      "other": [
        "https://srcc.wildapricot.org/Ride-Rating-System",
        "https://srcc.wildapricot.org/Introduction-to-Club-Rides"
      ]
    },
    "inclusive_focus": [],
    "sources": [
      "https://srcc.wildapricot.org/Calendar",
      "https://srcc.wildapricot.org/Ride-Rating-System",
      "https://srcc.wildapricot.org/Introduction-to-Club-Rides"
    ],
    "verified_on": "2026-11-16",
    "last_seen": "2026-11-16",
    "evidence": "The club's calendar (fetched Nov 16, 2026) lists Chain Gang rides at 9:30 am on Tue Nov 3, 10, 17 and 24, Thu Nov 5, 12, 19 and 26, and Sat Nov 7, 14 and 28, 2026, each with its own start and rating (2/B/35, 2/AB&B/37, 3/B/32 and the like). The individual event pages could not be opened.",
    "confidence": "medium",
    "refresh": {
      "method": "calendar-page",
      "watch_url": "https://srcc.wildapricot.org/Calendar",
      "feed_url": null,
      "notes": "Every ride is its own calendar event with a new id. The weekly pattern is read off the calendar, not stated by the club in a sentence."
    }
  },
  {
    "slug": "santa-rosa-ca-taco-tuesday-bike-ride",
    "name": "Santa Rosa Taco Tuesday Bike Ride",
    "name_en": null,
    "kind": "group-ride",
    "status": "active",
    "status_note": null,
    "status_since": null,
    "city": "Santa Rosa",
    "neighborhood": null,
    "region": "California",
    "state": "CA",
    "country": "US",
    "lat": null,
    "lng": null,
    "geo_precision": "start",
    "tz": "America/Los_Angeles",
    "discipline": ["social"],
    "schedule": "Every Tuesday, all year. Meet at 5:30 pm, pedals up at 6:00 pm. Canceled for rain and holidays.",
    "days": ["tue"],
    "time_local": "6:00 pm",
    "start_hhmm": "18:00",
    "frequency": "weekly",
    "monthly_rule": null,
    "season": "year-round",
    "start_location": { "name": "SRJC parking lot", "address": "550 Silva Ave, Santa Rosa, CA 95404" },
    "distance_km": null,
    "distance_miles": 8,
    "duration": null,
    "duration_min": null,
    "pace": null,
    "drop_policy": "unknown",
    "host": { "name": "Santa Rosa Taco Tuesday Ride", "type": "informal" },
    "founded_year": null,
    "founded_note": null,
    "cost": "free",
    "language": ["en"],
    "visitor_notes": "If you drive, park along the back wall on the east side of the lot; the listing says riders park free during the ride. Bring money for tacos and dessert.",
    "description": "A community ride through the middle of Santa Rosa: the JC and McDonald Avenue neighborhood, Courthouse Square, then Mitote Food Park in Roseland for the taco trucks. After dinner it rides back through Courthouse Square and on to Yogurt Farms for dessert. 8 miles round trip.",
    "links": {
      "website": "https://www.visitsantarosa.com/events/santa-rosa-taco-tuesday-bike-ride",
      "instagram": "https://www.instagram.com/santarosatacotuesdayride/",
      "facebook": "https://www.facebook.com/groups/santarosatacotuesday/",
      "strava": null,
      "meetup": null,
      "other": []
    },
    "inclusive_focus": [],
    "sources": [
      "https://www.visitsantarosa.com/events/santa-rosa-taco-tuesday-bike-ride"
    ],
    "verified_on": "2026-11-16",
    "last_seen": "2026-11-16",
    "evidence": "Visit Santa Rosa's listing (fetched Nov 16, 2026), written in the organizers' voice ('Come join us this Tuesday'), lists Nov 17, 24 and Dec 1, 8, 15, 22 and 29; all seven are Tuesdays in 2026. It gives the meet time, the roll time, the lot and its address. The ride's own Facebook group and Instagram are linked from the listing and were not read.",
    "confidence": "medium",
    "refresh": {
      "method": "calendar-page",
      "watch_url": "https://www.visitsantarosa.com/events/santa-rosa-taco-tuesday-bike-ride",
      "feed_url": null,
      "notes": "The source is a tourism listing, not the host's own page. The Instagram and Facebook links are copied from that listing, unopened."
    }
  }
]
```

Notes on the block:

- **`time_local` on Taco Tuesday is the roll time (6:00 pm), with the
  5:30 meet in `schedule`.** That is my reading of how the directory
  treats a meet/roll pair (the Fruit Loop does the same). Editor's call.
- **The Friendly Friday `dates` entry is the one future date the
  calendar shows.** I left `monthly_rule` null because I don't know the
  string format `derive-ride-fields.js` expects; "first Friday" is the
  host's own wording, in the ride's name.
- **Host cap.** The merge allows three rides per host. Santa Rosa
  Cycling Club would have two with these.
- **`cost` is null on both club rides.** The pages give the membership
  price and the first-ride rule, not a per-ride cost.

### One fix for a ride already listed (for `rides-apply.js`, not for me)

`santa-rosa-ca-sports-basement-last-sunday-ride` has no street address
on its record (brief). Visit Santa Rosa's listing, fetched today, gives:
Sports Basement Santa Rosa, 1970 Santa Rosa Ave, Santa Rosa, CA 95407;
meet inside the store at 9:00 am, ride at 9:15 am; last Sunday of the
month; most routes 30 to 40 miles; free; "we won't leave any rider
behind"; next date listed Nov 29 (the last Sunday of November 2026). It
is a third-party listing in the shop's voice, so I'd treat it as a pin
and a last-seen, and leave `verified_on` to @ride-verifier.

## 2. Why these

- **Santa Rosa Cycling Club** — the only club whose current calendar
  puts rides on the roads around Guerneville: a Sunday ride from
  Sebastopol to Guerneville on Nov 8, and two Friday coast rides from
  the Monte Rio Community Center in November 2026. A visitor gets one
  ride as a guest. It also keeps a route library ("Ten Great Rides",
  with Ride with GPS links), which is a lead for @route-scout.
- **Sports Basement Santa Rosa** — the one no-drop shop ride in the
  county that's already in the directory, and now it has an address.
  The shop is a lead for @shop-scout (the listings say it rents bikes;
  not confirmed on its own page).
- **Santa Rosa Taco Tuesday Ride** — the easy one: 8 flat-sounding town
  miles, every week, free, ends at food. It's the ride for the people
  who drove up, if they're in Santa Rosa on a Tuesday. Not a reason to
  drive from Guerneville on its own.
- **Friendly Friday, First Friday (ride)** — the nearest ride I could
  confirm with a fixed day, time and place: Sebastopol, monthly.
- **Chain Gang (ride)** — three mornings a week, so a visitor on almost
  any trip has one; the start moves, and some weeks it's Sebastopol.

None of the three clubs states an lgbtq, women/trans/femme or BIPOC
focus. I found no queer ride in Sonoma County on any page I fetched.

## 3. Rejected

- **Ride With Pride (Rise Cycle Co. and Sonoma County Pride)** — an
  indoor spin-class benefit on one day, Oct 10, 2020. Not a ride.
- **Ride and Wrench, Trek Bicycle Santa Rosa** (512 Mendocino Ave) — a
  monthly ride and clinic; Eventbrite says "Event ended", last date Aug
  10, 2025. The shop is a lead for @shop-scout.
- **Santa Rosa Cycling Club's Monday and Wednesday groups** (Tailwinds,
  Leaderless B/BC/C, Team Wednesday, C/D Peloton) — weekly at 9:30 am on
  the calendar, but the start is "Various" with no place named on the
  page I could read. No meeting place, no listing.
- **SRCC Easy Riders** (Tuesdays 9:30 am, Cotati Vets north lot) and the
  second-Friday Friendly Friday rides (Cotati) — real, but Cotati is the
  far side of Santa Rosa from the river. Left to a Santa Rosa or
  Petaluma sweep.
- **SRCC Friendly Friday, third and fourth Fridays** (Howarth Park in
  Santa Rosa; Healdsburg City Hall) — confirmed on the calendar; left
  out so the club stays under the three-ride cap and because the
  Sebastopol one is the nearest. Easy to add later.
- **Meetup e-bike trips to the Russian River** (an LA County e-bike
  group) and Sacramento Wheelmen trips — visiting groups' one-off
  weekends, from search results only. Not local, not recurring.
- **North Bay Positive Pedalers training rides from Windsor** — the only
  pages are AIDS/LifeCycle training listings from 2022 and 2025, and
  that event has ended. Search results only; not fetched.
- **Giro Bello (Sebastopol), Tour de Fuzz, Levi's GranFondo, the
  Backroad Challenge** — annual events on the county tourism page with
  months and no dates. Not clubs. For the calendar desk if they aren't
  there.
- **Critical Mass, a bike co-op, a bike swap** — nothing came up for
  Guerneville or the river towns in any search. I did not run a
  dedicated search for each (shared budget), so this is "not found",
  not "doesn't exist".

## 4. Couldn't confirm

- **Any ride that starts in Guerneville.** Two searches and the club
  calendar turned up none. The town's bike shop, if @shop-scout finds
  one, is the place to ask (a search result named "Russian River Cycle
  Service" on the county tourism site; not fetched, a lead only).
- **Stewarts Point Coastal Route, from the Monte Rio Community Center**
  (Santa Rosa Cycling Club). On the calendar for Fri Nov 6 and Fri Nov
  20, 2026, 8:20 am, rated 5/B/73: very hilly, 14–16 mph, 73 miles. It
  is the closest start to Guerneville I found. Two dates, each its own
  event, and nothing on the page says it repeats, so it isn't a
  recurring ride yet. Missing: the event page (ids 6906382 and 6916619).
- **Church of the Bicycle** (SRCC, Sundays). Nov 1 from Cotati at 9:00
  am and Nov 8 "Ragle to Guerneville" from Ragle Park at 9:30 am, rated
  3/AB&B/36; no Sunday ride listed for Nov 15, 22 or 29. Two Sundays
  isn't a schedule. Worth a line in the guide only once the pattern
  holds.
- **Wanna Bs** (SRCC, Wed Nov 4, 9:30 am, Ragle Ranch Park, 3/B/39) —
  one date in the window.
- **Everything on SRCC's individual event pages**: pace and miles for
  Friendly Friday, regroup policy for every ride, leader contacts. The
  tool refused those URLs. Also whether "Ragle Park" and "Ragle Ranch
  Park" are the same lot, and its street address.
- **SRCC's guest rule reads two ways.** The About page: "Non-members are
  welcome to join us for a ride, but are asked to sign a liability
  waiver." The Introduction page: "Non-club members are welcome on their
  first ride with the Club." I wrote the stricter one.
- **Biker Chicks** (Sonoma County Bicycle Coalition's monthly women's
  ride). The newest dated page is Sat, Sept 21, 2024: 10 am, Echelon
  Cyclery, 25 5th St, Santa Rosa, "Open to all women (age 18 and
  older)", "No Chick is left behind!", usually the third or fourth
  weekend. Two tourism listings show "Apr 19" with no year (a Saturday
  in 2025, a Sunday in 2026). Nothing from 2026. Missing: the
  coalition's own site, which the tool refused. If it's still running,
  it is the women's ride for this guide; its own words would be
  `wtf` only if it says trans and femme riders, which the pages I read
  don't.
- **Sonoma County Bicycle Coalition as a club entry.** Not fetched, so
  not in `clubs`. It's the advocacy group the brief's method points to
  for a ride calendar and a co-op.
- **Sports Basement's second-Saturday ride.** Two Visit Santa Rosa
  listings disagree (9:00 am "beginner" and 9:30 am "casual", both
  15–25 miles, no-drop) and their dates are old: Oct 12, Nov 9 and Dec
  14 fall on Saturdays in 2024, Dec 13 in 2025. Missing: the shop's
  Strava club (strava.com/clubs/santarosagrouprides, refused) or its
  store page (refused after a redirect).
- **Hella Joy Ride** (Trail House, 4036 Montgomery Drive, Santa Rosa):
  a monthly Saturday mountain bike ride, 9:00 am, February to November,
  "Mountain biking womxn of all skill levels and ages are welcome",
  "a social, no drop, ride". Every dated ride on the page is 2024.
  Missing: a 2026 or 2027 date. Trail House is a lead for @shop-scout.
- **Taco Tuesday's own pages.** The Facebook group and Instagram are
  linked from the listing and unread. Pace and drop policy aren't
  stated anywhere I could read.
- **The Recovery Ride and the Jonathan Pon Memorial Ride** (both camp
  in Guerneville, per the brief). Not re-read; a search result pointed
  at an SFAF press page about the Castro Country Club's rides that I
  did not fetch. Nothing from me for the calendar.

## Hand-offs

- **@shop-scout:** Sports Basement Santa Rosa (1970 Santa Rosa Ave;
  listings say rentals, (707) 921-3151), Trek Bicycle Santa Rosa (512
  Mendocino Ave), Trail House (4036 Montgomery Drive, (707) 843-4943),
  Echelon Cyclery (25 5th St, Santa Rosa, from a 2024 page), and the
  unread "Russian River Cycle Service" lead.
- **@coffee-scout / @eat-scout:** nothing confirmed. Taco Tuesday ends
  at Mitote Food Park and Yogurt Farms, both Santa Rosa, outside this
  guide.
- **@route-scout:** SRCC's "Ten Great Rides & Ride Library"
  (srcc.wildapricot.org/Ten-Great-Rides-&-Ride-Library); the one page I
  read is "Dry Creek Valley - Alexander Valley - Russian River", from
  Esposti Park in Windsor, with a Ride with GPS route
  (ridewithgps.com/routes/15291595), a PDF map dated 2016 and no
  distance on the page. The club's rating page also sorts local roads
  by difficulty (River Road "mostly flat", Westside Road "rolling",
  Graton Road "moderate", Coleman Valley Road "hilly").
- **Editor, for the calendar:** SRCC says the Wine Country Century is
  "held annually since 1980 on the first Saturday in May" and the
  Terrible Two "in June each year since 1976". No 2027 dates on the
  page. The first Saturday of May 2027 would be May 1; that's a
  projection from their rule, not a published date.
- **Editor, for `radius`:** I can't give Sebastopol's distance. The
  nearest confirmed fixed start is Ragle Park, Sebastopol.

## 5. Sources

Fetched 2026-11-16:

- https://srcc.wildapricot.org/Calendar
- https://srcc.wildapricot.org/About-SRCC
- https://srcc.wildapricot.org/Join-the-Club
- https://srcc.wildapricot.org/Introduction-to-Club-Rides
- https://srcc.wildapricot.org/Club-Ride-Information
- https://srcc.wildapricot.org/Ride-Rating-System
- https://srcc.wildapricot.org/page-274748
- https://www.visitsantarosa.com/events/santa-rosa-taco-tuesday-bike-ride
- https://www.visitsantarosa.com/events/group-rides-with-sports-basement
- https://www.visitsantarosa.com/events/second-saturday-santa-rosa-bike-ride
- https://www.visitsantarosa.com/events/monthly-beginner-bike-ride-with-sports-basement
- https://www.visitsantarosa.com/events/biker-chicks-womens-ride/
- https://www.santarosametrochamber.com/events/biker-chicks-womens-ride/
- https://www.happeningsonomacounty.com/events/biker-chicks-ride-28
- https://www.incycle.com/pages/retail-event/hella-joy-ride
- https://www.eventbrite.com/e/ride-and-wrench-trek-bicycle-santa-rosa-tickets-1245393277819
- https://www.sonomacounty.com/outdoor-activities/biking/biking-events-sonoma-county/
- https://www.sonomacountypride.org/?p=26244

Opened, nothing usable came back (page body cut off or script-only):

- https://www.sportsbasement.com/pages/sb-x-strava-groups
- https://ridewithgps.com/organizations/88-santa-rosa-cycling-club/home

Refused by the fetch tool, so unread: srcc.com, bikesonoma.org, the SRCC
event pages, strava.com/clubs/santarosagrouprides,
instagram.com/santarosatacotuesdayride, sportsbasement.com/blogs/stores/santa-rosa,
parks.sonomacounty.gov, en.wikipedia.org (Monte Rio, Ragle Ranch).

Searches run: 9.
