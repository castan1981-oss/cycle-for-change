# phoenix-az · coffee-scout · 2026-10-03

Four cafés: Tempe, Scottsdale, central Phoenix and Fountain Hills. Each one
was fetched on its own site or on two listings that agree. One is a ride-out
café: Regroup in Tempe. **No café at the Gainey Village corner could be
confirmed.** The Coffee Bean & Tea Leaf there is missing from the chain's own
Scottsdale store list, and the club doesn't name its coffee stop. Robert rides
Gainey on Thursdays and can name the place (see Couldn't confirm). No bike
parking, pump or hose was confirmed anywhere.

Distances are straight lines from City Hall (33.4484, -112.0740). Ride starts
come from `rides.json`; other addresses were geocoded with OpenStreetMap
Nominatim. All hours are Arizona time, which has no daylight saving.

Budget: this run used the full 12-search cap, 7 for coffee and 5 for
restaurants. The fetch tool could only open URLs that came back in a search
this session. Pages named in `rides.json` (PMBC's calendar, McDowell Mountain
Cycles, Regroup's home page) were refused until a search returned them.

## Findings

```json
[
  {
    "name": "Regroup Coffee + Bicycles",
    "url": "https://regroupwithus.com/coffee/",
    "address": "1205 N Scottsdale Rd, Tempe, AZ 85288",
    "note": "Tempe, on Scottsdale Rd about 8.5 miles east of downtown Phoenix: a café and bike shop where {ride:tempe-az-regroup-coffee-ride|Regroup's Saturday coffee ride} leaves at 6:30 and comes back for coffee and pastries. The café opens at 6:30 too, so the coffee comes after, and it's closed Mondays. The café's page says nothing about bike parking or a pump.",
    "hours_hint": "6:30 a.m. to noon Tuesday to Thursday, 6:30 a.m. to 2 p.m. Friday to Sunday; closed Monday",
    "ride_out": true,
    "ride_slug": "tempe-az-regroup-coffee-ride"
  },
  {
    "name": "Village Coffee Roastery",
    "url": "https://joe.coffee/locations/az/scottsdale/village-coffee-roastery-scottsdale/",
    "address": "8120 N Hayden Rd, Scottsdale, AZ 85258",
    "note": "Scottsdale, in McCormick Ranch, about 1.6 miles east of the Gainey Village corner: open at 6 every day, with breakfast and a sidewalk patio, per two listings. The Gainey rides roll at 5:30, so this is the coffee after. Its own site didn't load for us; call (480) 905-0881 before you count on it.",
    "hours_hint": "6 a.m. daily; closes at 2 or 4 p.m. (the listings disagree)",
    "ride_out": false
  },
  {
    "name": "Lux Central",
    "url": "https://luxcoffee.com/",
    "address": "4402 N Central Ave, Phoenix, AZ 85012",
    "note": "Central Phoenix, on Central Avenue about 3.5 miles north of downtown, open 6 a.m. to 10 p.m. every day, per its site. It's the one early café this run confirmed in central Phoenix; it isn't at a ride start, and it's still open after an evening ride. TripAdvisor lists outdoor seating; nothing says bikes.",
    "hours_hint": "6 a.m. to 10 p.m. daily",
    "ride_out": false
  },
  {
    "name": "Fountain View Coffee",
    "url": "https://joe.coffee/locations/az/fountain-hills/fountain-view-coffee-fountain-hills-cd8925a5-84b1-447d-9ea5-05e251e3c6a4/",
    "address": "12645 N Saguaro Blvd Ste 17, Fountain Hills, AZ 85268",
    "note": "Fountain Hills, about 23 miles from downtown Phoenix, on Saguaro Blvd, which the Rio Verde – Fountain Hills loop follows to Shea. It's about half a mile north of McDowell Mountain Cycles, where {ride:fountain-hills-az-mcdowell-mountain-cycles-saturday-road-ride|the shop's Saturday road ride} and {ride:fountain-hills-az-mcdowell-mountain-cycles-sunday-funday-gravel|Sunday gravel ride} leave. Open 6 to 3 every day, with a back patio facing the fountain, per two listings; no site of its own turned up, so call (805) 310-1544 first.",
    "hours_hint": "6 a.m. to 3 p.m. daily",
    "ride_out": false
  }
]
```

## Why these

- **Regroup Coffee + Bicycles.** The ride-out café, Tempe. Its own café page
  gives the address, the phone ((480) 648-8309) and the hours. `rides.json`
  (read Sept 30) has the Saturday ride leaving here at 6:30 and ending back
  here with coffee and pastries. The café opens at 6:30 on the dot, so a
  visitor can find people Saturday morning and come back to an open door. It's
  also a bike shop, so it goes to @shop-scout too. @stay-scout's Hampton Inn
  pick is on the same road.
- **Village Coffee Roastery.** The early one in Scottsdale. It opens at 6 every
  day (joe.coffee and wanderlog agree) and sits about 1.6 miles from the
  corner where all three Scottsdale Cycling rides and TriScottsdale's rides
  start. It stands in for the Gainey café this run couldn't find. Breakfast
  and a sidewalk patio, per both listings.
- **Lux Central.** The early one in central Phoenix. Its own site says 6 a.m. to
  10 p.m. daily, and a TripAdvisor listing agrees. It's here under the rule's
  exception: no ride starts beside it, but it's the only 6 a.m. café confirmed
  in central Phoenix. The site gives the address as 4402 N Central; TripAdvisor
  says 4400. The site's number is used.
- **Fountain View Coffee.** The on-route stop for Zone 2. It's on Saguaro Blvd,
  the road `routes.md` puts the Rio Verde – Fountain Hills loop on ("left on
  Saguaro all the way to Shea"). It's also half a mile from McDowell Mountain
  Cycles, the start of the shop's 6:30 Saturday road ride and 6:00 Sunday
  gravel ride. It opens at 6 every day, so it's coffee before the Saturday
  ride or after either one. Wanderlog calls it newly opened.

## Rejected

- **The Coffee Bean & Tea Leaf, Gainey Village** (8877 N Scottsdale Rd, per
  search titles). A komoot cyclists' highlight praises a Coffee Bean & Tea Leaf
  "in Paradise Valley" as a ride stop. But the chain's own Scottsdale page
  (read Oct 3) lists only two stores, 16420 N Scottsdale Rd and 9380 N 90th St.
  The newest Yelp result for 8877 says "Updated June 2025". Treat it as
  closed until someone sees it open.
- **The Coffee Bean & Tea Leaf, 9380 N 90th St and 16420 N Scottsdale Rd.**
  Both are on the chain's page, 6–6 daily and 6 a.m. weekdays / 7 a.m.
  weekends. They're chains, and neither is at a ride start or on a route this
  run found.
- **Lux Max Annex, 16220 N Scottsdale Rd.** On luxcoffee.com at 7 to 5 daily.
  It opens at 7 and isn't near a ride.
- **Starbucks, 13733 N Fountain Hills Blvd.** A chain, and not fetched.
  Fountain View is the café on the loop road.
- **Panera Bread, 2970 E Germann Rd, Chandler.** `rides.json` has
  Southeast Chandler Cycling's Sunday social ride leaving here at 6:00, so it
  qualifies as a ride-out café. It's a chain about 20 miles from downtown, the
  ride is Meetup-only, and the page wasn't fetched within the budget. The
  editor can add it as a Chandler ride-out if the guide wants one.
- **Red Robin, Goodyear.** West Valley Cycle's start. A restaurant chain in the
  West Valley, which the brief says may get its own hub.
- **Bicycle Ranch, Velo Bikes, Shadetree Bikes, Exhale Bikes.** A May 2019
  TrainerRoad thread says these shops served coffee or food after their rides.
  That's seven years old. These are leads for @shop-scout and @community-scout,
  not picks.
- **Village Tavern.** TriScottsdale's start. It's a restaurant, so it's in
  `eat.md`.

## Couldn't confirm

- **The Gainey Village café.** This is the one the guide most wants. Scottsdale
  Cycling's three rides (Tuesday, Thursday, Saturday, all 5:30) start at the
  southeast corner of Scottsdale Rd and Doubletree Ranch. The club's Strava
  page says "our coffee must be strong" but names no café. @community-scout
  reports that the Fuss Buss ends at a coffee stop the club calls "always
  mandatory", also unnamed. No café open at the corner was confirmed. **Robert
  rides Gainey Thursday and can name it.** Other places to look: the Phoenix
  New Times Gainey Village dining guide (403 for us), the Shops at Gainey
  Village store directory, and the club's ride posts on Strava (invite-only).
- **The Regroup Saturday ride on Regroup's own page.** The rides page as read
  Oct 3 listed two events, the Sept 26 Chino Grinder pre-ride and the Oct 10
  packet pick-up, and no Saturday coffee ride. `rides.json` had it on for Oct 3
  at 6:30 (read Sept 30). The ride may only be posted week to week. It's worth
  a look by @ride-verifier before the editor leans on the `ride_slug`.
- **Regroup's bike side.** The café page doesn't mention the shop. Its hours,
  repairs and any pump or rack are for @shop-scout. Regroup's home page was
  refused (no search had returned it).
- **Village Coffee Roastery.** Its own site (villagecoffee.com) was refused
  because no search had returned it. The closing time conflicts: joe.coffee
  says 2, wanderlog says 4. A restaurant.com URL suggests "Ste E104", but the
  page loaded something unrelated. The two listings are undated; Yelp search
  titles say "Updated September 2026", but that's a snippet, not a fetch.
- **Fountain View Coffee.** No site of its own was found. The Fountain Hills
  Times opening story returned 403. The phone has a California area code
  (805); both listings give it.
- **Mountain View Coffee Company, Fountain Hills.** A TripAdvisor page and a
  New Times listing came up in search. Neither was fetched.
- **An early café at DC Ranch.** The Rio Verde loop in `routes.md` starts at
  the DC Ranch Safeway. Not searched.
- **South Mountain's north side.** No café near the Central Ave entrance or the
  Summit Road start was searched. The Silent Sunday crowd has no coffee pick.
- **The Granada Sunday breakfast ride (PMBC).** It ends at a different
  breakfast place each week, named on PMBC's RideWithGPS calendar. That URL is
  in `rides.json` but was refused because no search returned it.
- **Bike parking, a floor pump, a hose.** Not on any fetched page, for any
  pick.

## Sources

- https://regroupwithus.com/coffee/
- https://regroupwithus.com/rides-and-events/
- https://www.strava.com/clubs/scottsdale-cycling-620243
- https://www.komoot.com/highlight/6231884
- https://www.coffeebean.com/store/az/scottsdale
- https://wanderlog.com/place/details/1415442
- https://joe.coffee/locations/az/scottsdale/village-coffee-roastery-scottsdale/
- https://luxcoffee.com/
- https://www.tripadvisor.com/Restaurant_Review-g31310-d4999309-Reviews-LUX_Coffee_Shop-Phoenix_Arizona.html
- https://joe.coffee/locations/az/fountain-hills/fountain-view-coffee-fountain-hills-cd8925a5-84b1-447d-9ea5-05e251e3c6a4/
- https://wanderlog.com/place/details/12049091/fountain-view-coffee
- https://www.trainerroad.com/forum/t/moving-to-phoenix-hoping-to-get-into-the-cycling-community-there/16111
- https://nominatim.openstreetmap.org/ (geocoding for distances only)
- cfc-site/rides/rides.json: the Arizona rides, their starts and coordinates
- research/towns/phoenix-az/routes.md: the Rio Verde – Fountain Hills loop on Saguaro, the Gainey and DC Ranch leads
- research/towns/phoenix-az/community.md: the Fuss Buss "mandatory" coffee stop hand-off
- research/towns/phoenix-az/stay.md: the Hampton Inn on the Regroup road

Tried and could not open: https://regroupwithus.com/ (refused, not from a search) · https://www.phoenixnewtimes.com/food-drink/dine-drink-all-day-best-restaurants-gainey-village-scottsdale-11331355/ (403) · https://www.mallsinamerica.com/arizona/the-shops-at-gainey-village/the-coffee-bean-tea-leaf (403) · https://www.toogoodtogo.com/en-us/find/scottsdale/thecoffeebeantealeaf/meal/surprisebag-649914 (404) · https://www.facebook.com/thecoffeebeanGaineyVillage/ (robots.txt) · https://nextdoor.com/pages/the-coffee-bean-and-tea-leaf-scottsdale-az-1/ (robots.txt) · http://www.villagecoffee.com/ (refused, not from a search) · https://www.restaurant.com/locations/village-coffee-roastery-scottsdale-8120-n-hayden-rd-ste-e104 (loaded an unrelated page) · https://www.yelp.com/biz/village-coffee-roastery-scottsdale?start=100 and the Lux Yelp pages (robots.txt) · https://maps.apple.com/place?place-id=I285E66313C729036 (robots.txt) · https://www.fhtimes.com/stories/fountain-view-coffee-opens-in-fountain-hills,460860 (403) · https://fountain-view-coffee.goto-restaurants.com/ (robots.txt check failed) · https://azcoffeeshops.com/coffee/lux-central/ (timeout)
