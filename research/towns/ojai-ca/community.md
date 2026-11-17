# ojai-ca — community

@community-scout · 2026-11-15

Short version: **no recurring group ride that starts in the Ojai Valley could
be confirmed.** No club is based in Ojai that publishes a ride. The rides
that reach the valley come up from Ventura. So the `rides` block is empty on
purpose, and the three clubs below are the Ventura-based ones whose own pages
show them riding to Ojai, Meiners Oaks or Sulphur Mountain. Every fact is
from a page fetched this run (list under Sources).

One limit on this run: the fetch tool only opened pages that came back in a
search result. `cibike.org`, `bikeventura.org`, `venturacycling.com`,
`themobshop.com` and `mountainadoras.com` would not open. Where a club's own
domain was blocked, the facts come from that club's own Strava, Meetup or
member-portal page, and the `url` is the page that was read.

## Findings

### clubs

```json
[
  {
    "name": "Easy Rider (Channel Islands Bicycle Club and BikeVentura)",
    "url": "https://www.meetup.com/meetup-group-easyrider",
    "note": "The closest thing to a group ride into the Ojai Valley. Free rides from the Museum of Ventura County lot that the group calls beginner-friendly and no-drop, in two groups: Easy Rider and a longer Easy Rider Plus. The Plus group rode up the path to Meiners Oaks on Nov 15, 2026, about 29 miles round trip. Sign the online waiver first, and be able to ride 20 miles at 12 mph. Day and time: {ride:ventura-ca-easy-rider-community-ride|the Easy Rider ride}.",
    "inclusive_focus": ["beginner", "no-drop"],
    "ride_slug": "ventura-ca-easy-rider-community-ride"
  },
  {
    "name": "Channel Islands Bicycle Club",
    "url": "https://www.strava.com/clubs/CIBike",
    "note": "A road club in Ventura that describes itself as social riding. Weekly rides leave from Ventura, and special rides come up to Ojai: on April 2, 2026 it ran a Sulphur Mountain gravel and road loop into Ojai, 47 miles from the Museum lot or 32 from the Sulphur Mountain trailhead, with lunch in Meiners Oaks. Ride as a member, or sign the ride waiver on the club's calendar page.",
    "inclusive_focus": [],
    "ride_slug": [
      "ventura-ca-channel-islands-bicycle-club-saturday-up-the-pacific-coast",
      "ventura-ca-channel-islands-bicycle-club-saturday-montecito-summerland",
      "ventura-ca-channel-islands-bicycle-club-sunday-canyon-to-canyon"
    ]
  },
  {
    "name": "Great Outdoors — Santa Barbara Ventura County chapter",
    "url": "https://greatoutdoors.wildapricot.org/sbvc",
    "note": "An all-volunteer LGBTQIA+ and allies outdoors club, not a cycling club. It hikes and camps, and it has led a bike ride from Ventura up the trail to Ojai and back: 30 miles, at a pace it called leisurely, with lunch in downtown Ojai (Nov 23, 2025). No bike ride was on its calendar on Nov 15, 2026, so check the outings page. Register for an outing on the site. Membership is $25 a year (Nov 2026).",
    "inclusive_focus": ["lgbtq"],
    "ride_slug": null
  }
]
```

### rides

```json
[]
```

No new ride records. Nothing recurring that starts in Ojai, Meiners Oaks,
Mira Monte, Oak View, Casitas Springs or Upper Ojai was found on a host's own
page. Checked against `cfc-site/rides/rides.json`: no entry has Ojai as its
city and none mentions Ojai in its text.

### For the editor (not `clubs[]`, not `rides`)

- **Ojai Valley Century** — the valley's own annual ride, run by Ojai Valley
  Rides, Inc., for the Scout troops of Ventura County. It is not in
  `data/calendar-2027.json`. Two listing sites that mirror the BikeReg entry
  (event 65595) give **Saturday June 5, 2027**. Both still title it "2026
  Ojai Valley Century", and one says it was rescheduled from May 30, 2026 and
  other dates. The organizer's own page was not reached. If it goes in the
  calendar, it's `projected`, not `confirmed`, until BikeReg or the organizer
  is read. Start is unsettled too: the 2027 listing gives 958 Boardman Rd,
  Ojai; a 2024 listing gives Nordhoff High School, 1401 Maricopa Highway.
- **The directory's Ventura records, two things seen in passing** (for
  `/rides check`, not for this guide):
  - CIBC's Strava club page says its rides are Tuesdays, Thursdays and
    Saturdays. The directory holds two Saturday rides and a Sunday ride, and
    no Tuesday or Thursday ride.
  - The Easy Rider Meetup lists Oct 18, Nov 1, Nov 15 and Dec 6, 2026, all
    Sundays at 9:00 from the Museum lot. That matches the directory record.
    An older BikeVentura page (May 2025) said 2nd and 4th Saturdays; the
    Meetup is the current one.
- **Ride tokens.** The notes above name directory rides by token only. No day
  or time is typed by hand.
- **Centre point.** No page read this run gave a downtown point for Ojai.
  Nothing to add to the brief's coordinates.

### Leads handed off

- @shop-scout: The Mob Shop, 110 W. Ojai Ave (address on the Ojai Music
  Festival's page and on a Pivot Cycles event page; phone 805 272 8102 on the
  festival page only; neither page is dated). It runs guided tours and has
  hosted demo days and the Gravel Mob. Its own site did not open here.
- @coffee-scout: Ojai Coffee Roasters, 337 E Ojai Avenue, is where both the
  Great Outdoors ride (Nov 2025) and the TGIF x Ventura Coffee Ride (March
  2025) stopped or met. Papa Lennon's in Meiners Oaks was CIBC's lunch stop
  (April 2026). That one is @eat-scout's.
- @route-scout: CIBC's Sulphur Mountain gravel and road loop into Ojai (47
  miles from Ventura, or 32 miles and about 3,200 ft from the Sulphur
  Mountain trailhead). CIBC keeps GPS route maps on its ride calendar. The
  Easy Rider page gives 13 miles round trip Ventura to Foster Park, 16 to the
  San Antonio Creek bridge, 29 to Meiners Oaks. Great Outdoors gave the
  Ventura to Ojai trail ride as about 15 miles each way with 856 ft of gain,
  uphill going, mostly downhill coming back.

## Why these

- **Easy Rider** — the only published, recurring, free group ride that comes
  into the valley, and it says beginner and no-drop in its own words. A rider
  staying in Ojai can roll down the path and meet it, or start in Ventura.
- **Channel Islands Bicycle Club** — the county's social road club. It's the
  one with a route library and a habit of special rides to Ojai and Sulphur
  Mountain. A visitor can ride after signing a waiver.
- **Great Outdoors SBVC** — the one group in reach of Ojai that states an
  LGBTQIA+ focus, and it has ridden this exact trail. Bike rides are
  occasional, and the note says so.

## Rejected

- **Ojai Valley Bike Coalition** — only a MapQuest listing turned up. No
  address, phone, site or date, and the description is about a green home
  tour. No sign it runs rides or still exists.
- **The Mob Shop as a ride host** — tours and one-off events are confirmed on
  other people's pages. No weekly shop ride is stated on any page read. A
  paid guided tour isn't a group ride for the directory.
- **Peloton Gravel Mob** — the Ojai Hub page describes it with a 2018 date.
  Nothing newer found. Not listed.
- **Trails by Potter, Bikes and Hikes LA** — paid guided tours. Not group
  rides.
- **TGIF x Ventura Coffee Ride (Thank Gravel It's Friday, with Ventura Coffee
  Ride)** — a real ride from Ojai: met at Ojai Coffee Roasters, rolled from
  Topa Topa at 345 East Ojai Avenue, Zone 2 pace with regroup spots. But it
  was one date, March 1, 2025, and nothing says it repeats.
- **Trek Bicycle Ventura** (4060 E Main St, Ventura) — its store page lists
  "group rides and clinics" with no day, time or start. Nothing to list.
- **Santa Barbara Newcomers Club** — many Ojai ride pages in search. A
  members' social club in another county. Not opened.
- **E-Biking LA County and Beyond, 1000 Treks, Hiking with Dean,
  West Coast Self-Supported Bicycle Touring (Meetup and similar)** —
  out-of-town groups that visit the Ojai trail on one-off dates. Not local,
  not recurring. Not opened.
- **BikeVentura as its own `clubs[]` entry** — it's a nonprofit for a more
  bike-friendly Ventura County, with wrench nights at the Ventura Bike HUB,
  490 N. Ventura Ave. Its own rides stay in Ventura (the coffee ride turns at
  Foster Park). Its link to Ojai is the Easy Rider ride, which is listed
  above. The editor can add it if the guide wants a co-op line: Community
  Wrench and Women's Wrench Night were both on its Meetup for October 2026.
- **Critical Mass, a bike swap, a co-op in Ojai** — none found.

## Couldn't confirm

- **Any recurring ride starting in the Ojai Valley.** The Mob Shop and
  Bicycles of Ojai are the places to ask. Look at each shop's Instagram and
  call. The Mob Shop's own site was blocked here; Bicycles of Ojai never came
  up in a result, so nothing about it was read.
- **Ventura Cycling Club** — in the directory
  (`ventura-ca-ventura-cycling-club-tuesday-group-ride`, confidence medium).
  Its site was blocked, `meetup.com/venturacycling` returned "Group not
  found", and one of its Meetup event pages failed to load. Search results
  still show current "Ventura Cycling Tuesday Evening Rides" event pages and
  a Visit Ventura listing, so the group is likely live. Not re-verified, so
  not in `clubs[]`. Whether any of its rides climb to Ojai is unknown.
- **Great Outdoors SBVC: can a non-member join a bike ride, and when is the
  next one.** The join page says non-members "may have to pay extra for
  certain events" and stops there. Ask info-sbvc@greatoutdoors.org. The
  chapter's Meetup address (`meetup.com/gosbvc`) returned "Group not found".
- **Channel Islands Bicycle Club's own site and calendar** (`cibike.org`) —
  blocked. The club facts above are from its Strava club page and its member
  portal forum. The `url` should become `https://www.cibike.org/` once the
  editor or verifier opens it. Membership price not read: null.
- **Ojai Valley Century 2027** — date, start and routes on BikeReg or the
  organizer's own page. See "For the editor".
- **Garrett Lemire Memorial Grand Prix** — one search found no page for a
  2026 or 2027 edition. Not fetched, not confirmed running. Left for
  @culture-scout or the editor.
- **Mountainadoras "Senduro"** — came up in a search for Ojai mountain bike
  group rides. The page would not open. What it is, and whether it is in
  Ojai, is unknown.
- **A women/trans/femme ride, a BIPOC ride, a gravel group** based in the
  valley — none found on any page read.

## Sources

Read this run (2026-11-15):

- https://www.meetup.com/meetup-group-easyrider
- https://www.meetup.com/meetup-group-easyrider/events/312320375
- https://bikeventura.wildapricot.org/event-6127117
- https://www.meetup.com/bikeventura/
- https://www.strava.com/clubs/CIBike?hl=ru-RU
- https://cibike.wildapricot.org/Rides-Forum/13614853
- https://cibike.wildapricot.org/event-6276648
- https://greatoutdoors.wildapricot.org/
- https://greatoutdoors.wildapricot.org/sbvc
- https://greatoutdoors.wildapricot.org/sbvc-outings
- https://greatoutdoors.wildapricot.org/sbvc-joinus
- https://greatoutdoors.wildapricot.org/event-6408823
- https://www.ojaihub.com/explore-ojai/outdoors/biking-in-ojai/
- https://ojaihub.com/ojai-business/the-mob-shop
- https://ojaifestival.org/?p=6360
- https://pivotcycles.com/en/event/the-mob-shop-mtb-demo
- https://mapquest.com/us/california/ojai-valley-bike-coalition-379065454
- https://www.trekbikes.com/retail/ventura/
- https://strawberry-seahorse-rs6d.squarespace.com/rides/vcrgrvlojai
- https://www.grouprides.cc/rides/tgif-social-shake-out-gravel-ride-2026-04-16
- https://haid.app/en/events/2026-ojai-valley-century-to-support-the-scouts-of-troops-of-ventura-county-159895
- https://haid.app/en/events/the-prelude-to-the-ojai-valley-century-85878
- https://trainerday.com/de/events/us/bikereg-65595-2027-06-05
- https://www.bikeride.com/?p=474479
- `cfc-site/rides/rides.json`, `data/calendar-2027.json` (read 2026-11-15)

Tried, nothing read (blocked, error or "not found"):

- https://www.cibike.org/
- https://www.bikeventura.org/community-rides/
- https://themobshop.com/
- https://www.mountainadoras.com/senduro
- https://sheriff.venturacounty.gov/?p=3296
- https://meetup.com/venturacycling
- https://www.meetup.com/venturacycling/events/315772244/
- https://www.meetup.com/gosbvc
