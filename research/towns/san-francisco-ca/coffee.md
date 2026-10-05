# san-francisco-ca · coffee-scout · 2026-10-03

Five cafés. Three are ride-out cafés named on a club's own page: Equator at
Proof Lab (Tam Velo, Mill Valley), Peet's on Domingo (Berkeley Bicycle Club)
and Arsicault (where Fat Cake's Tuesday ride ends). Then two on-route stops:
Bovine Bakery at Point Reyes Station and Java Beach on the ocean side. The
brief's headline ride-out café, Peet's at 16th and Market in the Castro, is
**not** a pick. A Yelp listing in the search results is titled "CLOSED" (Sept
2026), and Different Spokes' own August 2026 Jersey Ride page moved the start
to Jane Warner Plaza. See Couldn't confirm. The editor needs to act on this.
Search ran out: all 12 WebSearch calls are spent across coffee and eat.
WebFetch here only opens URLs that came up in a search result, so every pick
cost a search, and some leads went unchecked. Bike parking, a pump or a hose:
not confirmed anywhere.

## Findings

```json
[
  {
    "name": "Equator Coffees at Proof Lab",
    "url": "https://www.equatorcoffees.com/blogs/journal/celebrating-10-years-at-proof-lab",
    "address": "244 Shoreline Hwy, Mill Valley, CA 94941",
    "note": "Zone 2, Mill Valley, on Highway 1 on the Marin side of the bridge. {ride:mill-valley-ca-tam-velo-club-saturday-ride|Tam Velo Club's Saturday ride} and {ride:mill-valley-ca-tam-velo-sunday-recovery-ride|its Sunday ride} leave from here, per the club's 2026 page. Equator calls it a regular stop for cyclists, with patios front and back; nothing on any page says bike parking.",
    "hours_hint": "6:30 a.m. to 5 p.m. daily",
    "ride_out": true,
    "ride_slug": [
      "mill-valley-ca-tam-velo-club-saturday-ride",
      "mill-valley-ca-tam-velo-sunday-recovery-ride"
    ]
  },
  {
    "name": "Peet's Coffee, Domingo",
    "url": "https://www.peets.com/pages/store/domingo",
    "address": "2916 Domingo Ave, Berkeley, CA 94705",
    "note": "Zone 5, the East Bay: the Claremont corner of Berkeley, next to the Claremont Hotel. {ride:berkeley-ca-berkeley-bicycle-club-friday-coffee-ride|Berkeley Bicycle Club's Friday Coffee Ride} and {ride:berkeley-ca-berkeley-bicycle-club-sunday-wtfn-ride|its WTFN Sunday ride} meet here. The early one: 5:30 a.m. on weekdays, 6 on weekends, with benches outside, per Peet's. No bike parking on the page.",
    "hours_hint": "5:30 a.m. to 6 p.m. weekdays, 6 a.m. to 6 p.m. weekends",
    "ride_out": true,
    "ride_slug": [
      "berkeley-ca-berkeley-bicycle-club-friday-coffee-ride",
      "berkeley-ca-berkeley-bicycle-club-sunday-wtfn-ride"
    ]
  },
  {
    "name": "Arsicault Bakery",
    "url": "https://www.waze.com/live-map/directions/arsicault-bakery-arguello-blvd-397-san-francisco?to=place.w.155648378.1556745922.4255117",
    "address": "397 Arguello Blvd, San Francisco, CA 94118",
    "note": "Where {ride:san-francisco-ca-fat-cake-club-tuesday-headlands-arsicault|Fat Cake Club's Tuesday Headlands ride} ends: over the bridge, up Hawk Hill, back through the Presidio to here, per the club. On Arguello at Clement in the Inner Richmond, just south of the Presidio. Expect a line out the door; nothing on any page says bike parking.",
    "hours_hint": "7 a.m. to 1:30 p.m. weekdays, 8 to 2 Saturday, 8 to 3 Sunday",
    "ride_out": true
  },
  {
    "name": "Bovine Bakery",
    "url": "https://www.tripadvisor.com/Restaurant_Review-g32908-d935052-Reviews-Bovine_Bakery-Point_Reyes_Station_Point_Reyes_National_Seashore_Marin_County_Califo.html",
    "address": "11315 Highway 1, Point Reyes Station, CA 94956",
    "note": "Zone 2, the long day: a bakery on Highway 1 in Point Reyes Station, the town {ride:fairfax-ca-marin-cyclists-fairfax-to-point-reyes-station|Marin Cyclists' Saturday ride from Fairfax} rides out to. Opens at 6:30 on weekdays. Two listings agree on the hours and the phone, but neither was dated this year, so call (415) 663-9420 before you plan the day around it.",
    "hours_hint": "6:30 a.m. weekdays, 7 a.m. weekends; closes at 4 or 5 p.m. (listings differ)",
    "ride_out": false
  },
  {
    "name": "Java Beach Cafe",
    "url": "https://javabeachcafe.com/page/locations",
    "address": "1396 La Playa Street, San Francisco, CA 94122",
    "note": "Zone 3, the ocean side: in the Outer Sunset, across the Great Highway from Ocean Beach, per its site. Opens at 7, so it's the coffee after a dawn loop of the park and the coast, not before. Nothing on its page says bike parking.",
    "hours_hint": "7 a.m. to 5 p.m. daily",
    "ride_out": false
  }
]
```

## Why these

- **Equator Coffees at Proof Lab**: the ride-out café the club names by name. Tam Velo's 2026 weekly rides page: "Equator Coffees at Prooflab in Mill Valley: 244 CA-1", meet 8:30 / roll 8:35 Saturday, meet 9:30 / roll 9:35 Sunday. Equator's own post says "a popular stop for cyclists" with a "sun-filled patio space in the front and rear", and Equator ran a pride ride from here with Mike's Bikes. The café's own page writes the address 244 CA-1; TripAdvisor and `rides.json` write 244 Shoreline Hwy. It's the same road, and I used the Shoreline form so it matches the directory. Hours: 6:30 to 5 daily on a listing updated April 10, 2026 (restaurantjump). TripAdvisor's page says 7 to 5, but its newest review is from April 2021, so I went with 6:30. About 9 miles from City Hall in a straight line (from the ride's coordinates in `rides.json`).
- **Peet's Coffee, Domingo**: the East Bay ride-out café and the earliest confirmed door in this report. Peet's own store page gives 5:30 a.m. weekdays and 6 a.m. weekends, plus "outdoor bench seating". Berkeley Bicycle Club's Friday Coffee Ride page: meet 6:45, roll 6:50 "sharp" from "Peet's on Domingo". A coach's ride list (achieveptc.com, updated June 2025) also starts BBC's Tuesday night ride and a "Domingo Peet's Ride" here. That list is a lead, not a source. About 10 miles from City Hall in a straight line. The WTFN Sunday ride is for women, trans, femme and non-binary riders; the token carries it.
- **Arsicault Bakery**: Fat Cake's own Tuesday page ends its route at "Arsicault Bakery": bridge, Hawk Hill, McCullough Road, back over the bridge and through the Presidio. `ride_out: true` because the ride ends here. I left `ride_slug` off on purpose: the build renders it as "The ride from here", and the ride doesn't start here. The token in the note links the ride instead. No own site came up. Hours are from Waze, which isn't dated. Time Out (2016) gives the address with "at Clement St" and says "Lines regularly snake out the door". A rider's bakery blog (sfbakeryride.com) says a rainy morning cut the wait to 10 minutes.
- **Bovine Bakery**: the on-route stop for the classic long day. The brief names Point Reyes Station as Zone 2's long ride, and Marin Cyclists' Saturday ride goes Fairfax to Point Reyes Station and back (`rides.json`). TripAdvisor (newest review July 2025) and restaurantji (undated) agree on 11315 Highway 1, (415) 663-9420, and opening at 6:30 a.m. weekdays and 7 a.m. weekends. They disagree on closing (5 vs 4). One TripAdvisor reviewer says you sit out front and watch "bicyclist[s] go by on Highway 1". By the rules this is "open, confirm by phone"; the note says so.
- **Java Beach Cafe**: the only Zone 3 pick, on the ocean side where the brief puts the Great Highway. Its own locations page says "right across the Great Highway from Ocean Beach" and gives 7 to 5 every day. Not early. A second shop, Java Beach at the Zoo (2650 Sloat Blvd, (415) 731-2965), opens at 7 daily per the same page. The editor can use it if the route scout's Lake Merced loop wants a stop at that end.

## Rejected

- **Peet's Coffee, 2257 Market St (Castro)**: see Couldn't confirm. Not listed while it may be closed.
- **Equator's TripAdvisor page** as the hours source: the newest review is from 2021, and it shows 7 a.m. where a 2026 listing shows 6:30.
- **Yelp, Nextdoor, Apple Maps, Foursquare, corner.inc, SF Chronicle**: robots.txt blocked every one. Yelp titles in search results (Arsicault, Bovine, Java Beach all "Updated September 2026") were leads only and aren't used as facts.
- **HappyCow (Bovine)**: the page came back empty.
- **The Ride Report's Fat Cake story**: the site wouldn't resolve.

## Couldn't confirm

- **Peet's Coffee, Castro, 2257 Market St. The editor has to act on this one.** The brief and `rides.json` (`san-francisco-ca-different-spokes-jersey-ride`, `start_location` "Peet's Coffee, Castro (16th and Market)") both put the Different Spokes Jersey Ride here. Against that: (1) Yelp's listing for 2257 Market St came up in search titled "PEET'S COFFEE - CLOSED - Updated September 2026" (search title only; Yelp blocks fetches). (2) Different Spokes' own event page for the Aug 8, 2026 Jersey Ride gives the Classic start as "Jane Warner Plaza, Castro and Market, San Francisco, CA 94114", meet 8:45, roll 9:00. The May 2025 event page still said "Peets Coffee in the Castro … 2257 Market Street", and the club's general monthly page still says "Peets in the Castro". On the other side, restaurantji (undated) lists the shop at 5:30 a.m. to 7 p.m. daily. Hand-off to the editor and @ride-verifier: re-check the Jersey Ride's `start_location` (Jane Warner Plaza looks current). Where to look: Peet's own store page for Castro (the URL pattern is peets.com/pages/store/<name>, but no Castro URL came up in search), dssf.org's October 10 event page, Hoodline or the SF Standard for a closure note.
- **Fat Cake's Tuesday start.** The club's `/tuesdays` page says riders gather around 6:10 and roll at 6:17 from "The Golden Gate Bridge's Welcome Center". `rides.json` has 6:30 from the southern pavilion, from the club's `/rides` page on Oct 1. One of the two pages is out of date. Hand-off to @ride-verifier. The coffee note doesn't type a time, so it's safe either way.
- **Hummingbird's "coffee at Flywheel"**: `rides.json` says the Tuesday interval ride regroups for coffee at Flywheel. The Strava event page needs a search hit to open, and the budget ran out before Flywheel's own page came up. Where to look: the Strava event (`strava.com/clubs/1384021/group_events/3539467867329820304`) and Flywheel Coffee's own site for the location and hours.
- **Arsicault's own site and Monday hours.** Waze shows it open Monday at 7. Time Out's 2016 entry said Tuesday to Friday only. No own site came up in search. Where to look: arsicault-bakery.com if it exists, and its Google listing.
- **Where Berkeley Bicycle Club's Friday ride has its coffee.** The club page says the ride "concludes with coffee in Elmwood" but doesn't name the café. Where to look: the club's Slack and Strava club (strava.com/clubs/661921).
- **Java Hut, Fairfax ("beside Good Earth")**: the achieveptc list (updated June 2025) starts the Divine Ride and the Roasters Ride there. It would be the Fairfax ride-out café, near Split Rock Tap and Wheel, where Marin Cyclists' Saturday ride meets. Not searched; the budget ran out. Hand-off to @community-scout for the two rides, and back to coffee for the café.
- **SF2G's cafés**: the same list starts SF2G (the bike-to-work ride down the Peninsula) at "Ritual Roasters (SF mission) or Philz Coffee (SF)". A Mission ride-out café for Zone 6 if confirmed. Hand-off to @community-scout (SF2G isn't in `rides.json`).
- **Rapha Cycle Club San Francisco**: the same list has the Stammtisch Ride from there ("Ends at Biergarten") and a Rapha Donut Ride from the Golden Gate Bridge Plaza. It's a bike-shop café, so it goes to @shop-scout, with the rides to @community-scout. Whether it's still open is not checked.
- **A Zone 1 café at the bridge or in Sausalito**: none confirmed. Five rides in the directory and the list start at the bridge pavilions. The Different Spokes short route and the Col du Pantoll ride start at Mike's Bikes Sausalito (hand-off to @shop-scout). Where to look: the café at the bridge Welcome Center, and Equator's Sausalito shop (Equator's post says its pride ride finished "at the Sausalito location").
- **A Zone 4 café on the Peninsula**: nothing searched. The Palo Alto rides hub covers that side; Alice's Restaurant on Skyline is in eat.md.
- **Bike parking, a floor pump, a hose**: not on any fetched page, for any pick.

## Sources

- https://www.dssf.org/content.aspx?page_id=22&club_id=17789&module_id=336753
- https://www.dssf.org/content.aspx?page_id=4002&club_id=17789&item_id=2992657
- https://www.dssf.org/content.aspx?page_id=4091&club_id=17789&item_id=2527581
- https://www.dssf.org/content.aspx?page_id=4001&club_id=17789
- https://www.dssf.org/
- https://www.restaurantji.com/ca/san-francisco/peets-coffee-14/
- https://www.tamveloclub.com/weeklyrides.html
- https://www.equatorcoffees.com/blogs/journal/celebrating-10-years-at-proof-lab
- https://restaurantjump.com/equator-coffees-94941-2/
- https://www.tripadvisor.com/Restaurant_Review-g60909-d16816385-Reviews-Equator_Coffees-Mill_Valley_Marin_County_California.html
- https://enjoymillvalley.com/2025/01/16/tam-velo-clubs-ride-leaders-and-legacy-have-established-the-clubs-evolution-continues-to-build-on-marins-cycling-legacy/
- https://www.peets.com/pages/store/domingo
- https://berkeleybikeclub.org/friday-coffee-ride
- https://www.achieveptc.com/blog/bay-area-group-rides-summary
- https://www.fatcake.cc/tuesdays
- https://www.waze.com/live-map/directions/arsicault-bakery-arguello-blvd-397-san-francisco?to=place.w.155648378.1556745922.4255117
- https://www.timeout.com/san-francisco/restaurants/arsicault-bakery
- https://www.sfbakeryride.com/blog/ride-5
- https://www.tripadvisor.com/Restaurant_Review-g32908-d935052-Reviews-Bovine_Bakery-Point_Reyes_Station_Point_Reyes_National_Seashore_Marin_County_Califo.html
- https://www.restaurantji.com/ca/point-reyes-station/bovine-bakery-/
- https://javabeachcafe.com/page/locations
- https://www.tripadvisor.com/Restaurant_Review-g60713-d2620311-Reviews-Java_Beach_Cafe-San_Francisco_California.html
- cfc-site/rides/rides.json: the rides within 30 miles of City Hall, their `start_location`, and the coordinates the distances use

Tried and could not open: https://www.yelp.com/biz/peets-coffee-san-francisco-27 (robots.txt) · https://www.corner.inc/place/21237 (robots.txt) · https://nextdoor.com/pages/equator-coffees-teas-1/ (robots.txt) · https://order.thanx.com/equator?location=7391 (link from Equator's post; no fetch approval) · https://maps.apple.com/place?place-id=I9640DD49BFC5E63C (robots.txt) · https://www.happycow.net/reviews/bovine-bakery-point-reyes-station-398216 (empty) · https://www.sfchronicle.com/totalsf/article/fat-cake-bike-club-22062754.php (robots.txt) · https://www.theridereport.com/stories/spotlight/eat-cake-ride-bikes (did not resolve) · https://www.fatcake.cc/rides, https://www.strava.com/clubs/1384021/group_events/3539467867329820304 (no search hit, so no fetch approval)
