# seattle-wa · shop-scout · 2026-10-03

A refresh of the four shops in `data/towns/seattle-wa.json`, then a look across
the city. This run is thin, and the reason comes first.

**WebSearch didn't work for this run.** The first call came back with the
session's search budget already spent (200 of 200), so no searches ran here.
WebFetch opened only pages an earlier search or fetch in this session had
already surfaced. Every other URL, including all four existing shops' sites,
came back with the fetch approval timed out. Nothing was read any other way.

So: **two shops confirmed, none of the four existing shops re-checked,
Recycled Cycles dropped (still no address), no rental and no ship-to-shop
confirmed.** The Sept 15 entries for Montlake, R+E and Gregg's are not in
Findings because nothing was re-read; the editor decides whether they stand
until the verifier opens their sites (see Couldn't confirm). No lat/lon was
fetched for any shop, so no distances are given.

## Findings

```json
[
  {
    "name": "Cascade Bicycle Studio",
    "url": "https://www.cascadebicyclestudio.com/bike-service-repair-seattle/schedule",
    "address": "180 North Canal Street, Seattle, WA 98103",
    "phone": "(206) 547-4900",
    "services": ["repair", "fitting", "shop-rides"],
    "note": "In Fremont, on North Canal Street at Phinney Ave; the Burke-Gilman runs through the neighborhood. The fit studio: a $350 bike fit, or a $500 fit of two to three hours with motion capture, saddle pressure mapping and shoes, each with one follow-up visit; saddle or shoe-and-insole fits are $125 (Oct 2026). Service is scheduled, not same-day: come by any time for an evaluation, no appointment needed, and they book the work; a tune-up often takes a few days. Road or gravel tune-up about $300, labor $150 an hour, a build from the box $250 and up (Oct 2026). The shop's eight local loops start at the door, and it calls the Magnolia Loop its classic Wednesday group ride route; no ride time is posted. Tuesday to Saturday 10 to 6, closed Sunday and Monday."
  },
  {
    "name": "Bike Works Open Shop",
    "url": "https://bikeworks.org/adult-programs/open-shop-community-repair-space/",
    "address": "3715 S Hudson St, Seattle, WA 98118",
    "phone": null,
    "services": ["diy"],
    "note": "The nonprofit's repair space in its warehouse: its stands and tools, with or without a mechanic's help. Second and fourth Saturdays, 1 to 5 pm, year-round; in 2026, May through September moved to the first and third Saturdays. $10 an hour on your own, $15 with some help, $20 and up for a full walkthrough, parts extra (Oct 2026). Adults only, first come first served, four people at a time. For the rider who can fix it with a stand and the right tool; nobody does the work for you."
  }
]
```

Ship-to-shop and rental lists, shaped like `bring_your_bike.ship.shops` and
`.rent.shops`. Both are empty: no shop page that opened says it receives a
shipped bike or rents a road, gravel or mountain bike.

```json
{
  "ship": { "shops": [] },
  "rent": { "shops": [] }
}
```

## Why these

- **Cascade Bicycle Studio** is the fit studio and the one full-service shop whose own pages opened. Fit prices, service prices, the no-appointment evaluation and the hours are all on its site. It builds a bike from the box ($250 and up) but never says it receives a shipment, so it is not on the ship list. `shop-rides` is there because the site calls the Magnolia Loop "our classic Wednesday group ride route" and says the loops start "from CBS"; there's no day-and-time listing, so the note says so. No `same-day`: the page says the work is scheduled after the evaluation.
- **Bike Works Open Shop** is the budget fix: a stand, tools and an optional mechanic for $10 to $20-plus an hour, with a 2026 schedule note on its own page, so it reads as current. @community-scout also used this page for the co-op slot in `clubs[]`; the editor can keep it in one place or both. `phone` is null: the only number on the page belongs to the community resources team, not the shop.

## Rejected

- **Recycled Cycles** — dropped from `bike_shops`. The Sept 15 entry has no address, and its site (https://www.recycledcycles.com/) wouldn't open, so it couldn't be fixed. Back in only when someone reads the address on its own contact page.
- **Cascade Bicycle Studio on the ship list** — publishes a build-from-box price, says nothing about taking a carrier delivery addressed to the shop.
- **The Bicycle Fixer** — a mobile shop, in its own words ("Mobile bicycle shop"). No storefront address or hours on its page; phone (253) 486-7468. A visitor can't walk in.
- **Speedy's E-Bike Rescue** — showed up only as ads on a Seattle Bike Blog post. E-bike repair; its site wasn't read.
- **NorthStar Cycling Club's loaner bikes** — @community-scout read on the club's page that it has a few bikes for its Sunday ride. A club's bikes for its own ride, not a rental shop.
- **BikeFlights Bike Shop Finder** (https://www.bikeflights.com/bicycleshops) — the page loads, but its shop results are drawn by script after a search, and none came through to the fetcher.
- **Yelp for Bike Works** (https://www.yelp.com/biz/bike-works-seattle-2) — blocked by robots.txt. Leads only anyway.

## Couldn't confirm

The first four are the shops in the current file. None was re-read.

- **Montlake Bicycle Shop** — https://www.montlakebike.com/ and https://montlakebike.com/ refused (fetch approval timed out). The Sept 15 entry: 2223 24th Ave E, Seattle, WA 98112, (206) 329-7333, repair, rental, parts, "rents city, electric and mountain bikes." Missing: hours, the rental fleet by type with prices and the date, whether it takes shipped bikes. It's the closest shop to the STP start in the current file; worth the verifier's first read.
- **R+E Cycles (Rodriguez Bicycle Company)** — https://www.recycles.com/ refused. The Sept 15 entry has `"phone": ""`; unknown is `null`, not an empty string. Missing: phone, hours, and whether it still does repair at 5627 University Way NE.
- **Gregg's Greenlake Cycle** — https://www.greggscycles.com/ refused. The current file disagrees with itself: `riding[1]` says Gregg's rents bikes, but its `bike_shops` services are only repair and parts and the note says "service and bike fitting." Missing: the rental page (type, sizes, price), the fit service, hours, the other Gregg's stores.
- **Recycled Cycles** — see Rejected. Missing: street address, phone, hours, and which bikes it rents. The Sept 15 note says rentals are bookable online.
- **Veloce Velo, Mercer Island** — the lead from routes.md. Cascade's RideWithGPS ambassador route for the Mercer Island loop lists "Veloce Velo Bike Shop," on Mercer Island, as a point of interest. https://www.velocevelo.com/ refused. Missing: everything from its own site.
- **Mello Fellos Bike Shop** — Everyday Rides' calendar lists its Saturday ride from 2151 Sixth Ave, 8:00 am on Oct 17 and Oct 24, 2026, "friendly-paced," 14 to 16 mph, 15 to 25 miles. Its Instagram (https://www.instagram.com/MelloFellosBikeShop/) and Strava club (https://www.strava.com/clubs/2297734) refused; its own site wasn't surfaced. Missing: the shop's services, hours and phone from its own page. Already in `rides.json` as `seattle-wa-mello-fellos-saturday-ride`.
- **Bainbridge Island Cycle Shop and Classic Cycle** — Cascade's Chilly Hilly 2026 page says, "Full service is available at Bainbridge Island Cycle Shop and Classic Cycle." The island shops are the ones that matter on the ferry day, and a Bainbridge rental would suit a rider without a bike. Classic Cycle's site loops between https and http and the fetcher can't follow (@community-scout hit the same loop). Neither site was read.
- **Bike Works' full-service bike shop** — the site's menu has "Bike Shop (Full Service)," but the page read gives no address or hours for it. @community-scout's lead: Yelp gives 3709 S Ferdinand St (not read; Yelp blocks fetchers). Where to look: the Bike Shop page on bikeworks.org.
- **The Bikery** — its own site (https://www.thebikery.org/) loaded: 855 Hiawatha Pl S, Seattle, WA 98144, "Sat/Sun 12-6p," stand time "$5-15 per hour," "no one will be turned away for lack of funds," refurbished bikes and new and used parts (Oct 2026). Nothing on the page is dated 2026 (the newest photos are January 2024) and there's no phone, so it doesn't pass "open." @community-scout made the same call.
- **Wright Brothers Cycle Works** — http://wrightbrotherscycleworks.com/ redirects https to http and back; not read.
- **Sound Break Bike House** — Everyday Rides lists a "Co-Working & Lunch Ride" there on Wed Oct 7, 2026, 9:00 am, 115 S Jackson St. What it is (shop, café, co-working) is unknown. Lead for @community-scout and @coffee-scout.
- **A city-wide sweep.** With no searches, nothing new was found beyond the pages above. The next run should start with the agent file's searches (`Seattle bike shop`, `Seattle road bike rental`, `Seattle bike shop ship bike build`, `bikeflights Seattle shop`, `Seattle bike fit`) and the shop pages they surface, Bellevue, Kirkland and Bainbridge included.

## Sources

Read this run:

- https://www.cascadebicyclestudio.com/local-loops-seattle
- https://www.cascadebicyclestudio.com/bike-fitting-seattle/schedule
- https://www.cascadebicyclestudio.com/bike-service-repair-seattle/schedule
- https://bikeworks.org/adult-programs/open-shop-community-repair-space/
- https://www.thebikery.org/
- https://thebicyclefixer.com/events-and-rides
- https://ridewithgps.com/ambassador_routes/511-south-bellevue-mercer-island-loop
- https://cascade.org/rides-events/chilly-hilly-2026
- https://cascade.org/rides-events/82922 (its link list only)
- https://everydayrides.com/calendar
- https://www.seattlebikeblog.com/2023/07/10/biking-the-new-north-lake-washington-trail-loop/
- https://www.bikeflights.com/
- https://www.bikeflights.com/bicycleshops (loaded; no results came through)
- https://faq.bikeflights.com/support/solutions/articles/13000072589-how-do-i-ship-with-a-bike-shop-

Tried, refused (fetch approval timed out): https://www.montlakebike.com/ · https://montlakebike.com/ · https://www.recycles.com/ · https://www.greggscycles.com/ · https://www.recycledcycles.com/ · https://www.velocevelo.com/ · https://www.instagram.com/MelloFellosBikeShop/ · https://www.strava.com/clubs/2297734 · https://cascade.org/resources/finding-bike · https://cascade.org/membership/member-benefits-portal

Tried, other failure: https://www.yelp.com/biz/bike-works-seattle-2 (robots.txt) · http://wrightbrotherscycleworks.com/ (https/http redirect)

Hand-offs:

- @community-scout: Cascade Bicycle Studio's Wednesday ride on the Magnolia Loop (the shop calls it its "classic Wednesday group ride route"; no time on the page). Sound Break Bike House's Wednesday lunch ride, 115 S Jackson St (Everyday Rides).
- @logistics-scout: no ship-to-shop and no rental confirmed; Cascade Bicycle Studio's build-from-box price is the only build fee.
