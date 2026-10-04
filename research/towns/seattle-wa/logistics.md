# seattle-wa · logistics-scout · 2026-10-03

One `bring_your_bike` object. The ship and rent lists are lifted from
`research/towns/seattle-wa/shops.md` (same run, same date), not re-checked.
Both lists are empty. The car note draws on the route starts in
`research/towns/seattle-wa/routes.md` (same run).

**WebSearch didn't work for this run.** The session's search budget was spent
(200 of 200) before the first call here, so no searches ran. WebFetch opened
only pages an earlier search or fetch in this session had surfaced; the
airport, Sound Transit, Washington State Ferries, Delta, Alaska, Amtrak and
Cascade's STP transportation pages all came back with the fetch approval timed
out. Nothing was read any other way.

What that leaves: **one airline confirmed (American), STP return logistics from
Cascade's 2026 page, and BikeFlights' shop FAQ. `transit_bike_rules`,
`bike_share` and `rules_and_safety` are null; SEA's miles and note are null; no
Amtrak Cascades bike rule; no ferry fare.** This one doesn't ship until those
are filled.

## Findings

```json
{
  "summary": "Bring it. American Airlines checks a bike in a hard case, bike bag or bike box as an ordinary bag, $45 online for a first bag with oversize fees waived (Oct 2026). For the STP, Cascade Bicycle Club trucks your bike home from Portland for $70, or you and the bike for $115 (2026 prices). Most of the rides in this guide start in the city, at the downtown ferry dock or on the trails, so a car only matters for the Eastside hills and the Snoqualmie Valley.",
  "fly": {
    "airports": [
      {
        "name": "Seattle-Tacoma International",
        "code": "SEA",
        "miles": null,
        "note": null
      }
    ],
    "airline_note": "Read on American's own pages, Oct 2026. American: one non-motorized bike in a hard-sided case, a bike bag or a box built for bikes pays the standard checked-bag fee up to 50 lb and the standard overweight fee from 51 to 70 lb; oversize fees don't apply. Nothing over 70 lb or 115 linear inches. Handlebars fixed sideways and pedals off, or both wrapped in foam. Outside a hard case it's treated as fragile, and American pays for damage only to a hard case that's visibly damaged. First bag $45 online or $50 at the airport, second $55 or $60 (fees updated May 18, 2026). Alaska, Delta, Southwest and United: not confirmed; check each one's sports-equipment page before you book."
  },
  "ship": {
    "note": "No shop in this guide says on its own site that it receives a shipped bike, so call before you book. Cascade Bicycle Studio in Fremont builds a bike from the box for $250 and up (Oct 2026); ask whether it will take the delivery. BikeFlights' shop FAQ says some shops pack and book the shipment for you and others ask you to book once they've packed it, and that you and the shop need to talk before, during and after (read Oct 2026). Its shipping policy points to UPS's and FedEx's service guides for delivery guarantees and gives no transit-day count (read Oct 2026).",
    "shops": []
  },
  "rent": {
    "note": "No shop in this guide rents a road, gravel or mountain bike on its own site, so there's no rental to weigh against flying yours. Flying it on American costs $90 round trip as a first checked bag paid online (Oct 2026). For the STP, ride your own bike: it's 207 miles, and Cascade's trucks bring it back from Portland.",
    "shops": []
  },
  "get_around": {
    "car_needed": false,
    "note": "Not for most of it. The Burke-Gilman and the West Seattle loop start in the city, the north-lake trail loop can start at UW Station on Link light rail, the Bainbridge Island loop starts at Colman Dock, the downtown ferry terminal, and the Lake Washington loop passes Seward Park, so you can join it there. Two rides sit out of town: the Zoo Hill climb from a Bellevue park, and the gravel loop from Carnation in the Snoqualmie Valley; for those, a car or a long ride out. The STP starts at the University of Washington's E-18 lot, with start-line parking at $20 a day (2026). Getting home from Portland, Cascade sold Bus & Bike Transportation for $115, Bike-Only Transportation for $70, Bike Box Transportation for $25 and bike storage at $20 a day, all by July 5 (2026 prices); the buses leave from the finish line and bring riders back to the University of Washington. If you live in Portland, the Portland Bicycling Club ran buses and bike trucks up to Seattle on the Friday before the ride (2026).",
    "transit_bike_rules": null,
    "bike_share": null
  },
  "rules_and_safety": null,
  "sources": [
    "https://www.aa.com/i18n/travel-info/baggage/specialty-and-sports.jsp",
    "https://www.aa.com/i18n/travel-info/baggage/checked-baggage-policy.jsp",
    "https://www.cascadebicyclestudio.com/bike-service-repair-seattle/schedule",
    "https://faq.bikeflights.com/support/solutions/articles/13000072589-how-do-i-ship-with-a-bike-shop-",
    "https://www.bikeflights.com/shippingpolicy",
    "https://cascade.org/rides-events/seattle-portland-2026",
    "https://www.seattlebikeblog.com/2023/07/10/biking-the-new-north-lake-washington-trail-loop/",
    "https://kingcounty.gov/en/dept/dnrp/nature-recreation/parks-recreation/king-county-parks/trails/leafline-trails/burke-gilman",
    "https://ridewithgps.com/ambassador_routes/548-full-lake-loop-from-south-bellevue-p-r?lang=en",
    "https://cascade.org/rides-events/82922",
    "https://cascade.org/rides-events/44024",
    "https://cascade.org/rides-events/82167",
    "https://cascade.org/rides-events/chilly-hilly-2026",
    "https://cascade.org/rides-events/83393"
  ]
}
```

## Why these

- **summary** — "Bring it" rests on what was confirmed: American's bike rule and fee, Cascade's STP return trucks, and no rental found. If the verifier confirms a road-bike rental at Montlake or Gregg's (see shops.md), the rental half of the summary and `rent.note` need redoing.
- **SEA** — carried over from the current file's `nearest_airport` (verified Sept 15), not re-read. The airport's pages refused, so `miles` and `note` are null. The current file says 14 miles; no coordinates were fetched to measure it.
- **airline_note** — American is the only airline whose pages opened. Both pages read today; the fee page carries "updated as of May 18, 2026," the same date the LA guide's note has, so nothing changed for the other towns.
- **ship** — empty list, honest note. The only build fee in Seattle is Cascade Bicycle Studio's $250-and-up box build, and the shop doesn't say it takes deliveries. BikeFlights' FAQ is the one shipper page read.
- **rent** — empty list. The math is only half there: flying the bike is $90 round trip on American; no rental price exists to compare it to.
- **get_around** — `car_needed: false` from the route starts in routes.md: Gas Works and the city for the Burke-Gilman, Seacrest Pier for West Seattle, Colman Dock for Bainbridge, Seward Park on the Lake loop, UW Station for the north loop (Seattle Bike Blog, July 2023). Zoo Hill (Lewis Creek Park, Bellevue) and the Carnation gravel loop are the out-of-town starts. STP lines are from Cascade's 2026 event page, quoted: "Bus & Bike Transportation | $115," "Bike-Only Transportation | $70," "Bike Box Transportation | $25," "Bike Storage | $20/day," deadline "Sunday, July 5, 2026," "UW Start Line Parking | $20/day," and the Portland Bicycling Club line. The STP itself is July 10, 2027 (confirmed, per the brief); Cascade's 2027 page wasn't read, so every STP price carries 2026.
- **Fenders**, for the editor's `best_months` or `riding` text: routes.md has Cascade's Carnation gravel page requiring full fenders on its rides when the roads are wet. That's the club's rule, not a city norm.

## Rejected

- **Cascade's Chilly Hilly midsummer page** (Aug 2, 2023): "pay $10.45 (age 19 - 64) or $5.70 (age 65 & over) for round trip fare," and the leader waits "in the bicycle waiting queue." A 2023 fare on a club page, not Washington State Ferries' own. Not used.
- **Cascade's West Seattle Water Taxi ride page** (Oct 11, 2025): "a limited number of available bike racks on the boat"; fare by "cash/credit/ORCA card." A club's past ride, not King County's water taxi page. Lead only.
- **Chilly Hilly 2026 ferry lines**: the Seattle start includes the ferry fare in registration, and the official sailings are 7:55, 8:55 and 9:35 am. Event-day only; it's for the calendar row, not the logistics page.
- **BikeFlights Bike Shop Finder**: results are drawn by script; none came through.

## Couldn't confirm

- **SEA: airlines, distance, ground transport with a bike box** (Link from the airport, rideshare pickup, the rental-car shuttle, anything on oversize bags). Tried https://www.portseattle.org/sea-tac and https://www.soundtransit.org/ride-with-us/popular-destinations/sea-tac-airport; both refused. Where to look: the Port of Seattle's SEA airline list and ground-transportation pages.
- **Other airports within 90 minutes**, Paine Field (PAE) in Everett first. Not read. Where to look: the airport's own airlines page.
- **Alaska, Delta, Southwest, United bike rules and fees.** Tried https://www.alaskaair.com/content/travel-info/baggage/special-baggage/traveling-with-sporting-equipment and https://www.delta.com/us/en/baggage/special-items/sporting-equipment; both refused. The LA guide's `airline_note` (Sept 2026) and research/towns/san-francisco-ca/logistics.md (Oct 2026) carry Alaska, Southwest and Delta lines from their own pages; the verifier can re-read those URLs and add them with this month's date. United hasn't loaded on any run.
- **Bikes on Link, Sounder and ST Express.** Tried https://www.soundtransit.org/ride-with-us/know-before-you-go/bikes; refused. Where to look: Sound Transit's bikes page.
- **Bike racks on King County Metro buses, and bikes on the King County Water Taxi.** Not read. Where to look: King County Metro's bikes-on-transit page and the Water Taxi page.
- **Washington State Ferries, Seattle–Bainbridge:** passenger fare, the bicycle surcharge, how bikes board and unload. Tried https://wsdot.wa.gov/travel/washington-state-ferries/fares; refused. Where to look: WSF's fares page and its bicycles page.
- **Amtrak Cascades, Portland to Seattle with a bike:** whether a bike reservation is required, the fee, boxed or rolled on. Cascade's 2026 STP page doesn't mention Amtrak. Tried https://www.amtrak.com/bikes; refused. Where to look: Amtrak's bikes-on-board page and the Amtrak Cascades site.
- **STP details beyond the overview page:** where in Portland the finish is, when the buses and trucks leave, e-bike and tandem limits, and baggage-truck rules. The overview gives only the bag-drop times (Friday 6 to 9 pm, Saturday 4:45 to 7:15 am). Tried https://cascade.org/rides-events/seattle-portland-2026/transportation-details, https://cascade.org/rides-events/seattle-portland-2026/baggage-trucks and https://cascade.org/rides-events/ride-information-support/faq; all refused. Cascade's 2027 STP page wasn't surfaced.
- **Washington law:** the passing rule, helmet rules (state, King County, Seattle), e-bike classes, any stop-as-yield rule, sidewalk riding. Nothing read. Where to look: WSDOT's bicycle laws page, then the RCW sections it cites on app.leg.wa.gov, and Washington Bikes for the overview.
- **The honest read on traffic.** Nothing read. Where to look: SDOT's Vision Zero page and its annual traffic report, Seattle Bike Blog, the Seattle Times.
- **Bike share.** Nothing read. Where to look: SDOT's bike share program page for the permitted operators and prices.
- **Rentals and ship-to-shop.** See shops.md: Montlake, Gregg's and Recycled Cycles (rentals in the Sept 15 file, not re-read), Classic Cycle on Bainbridge Island.

## Sources

Read this run:

- https://www.aa.com/i18n/travel-info/baggage/specialty-and-sports.jsp
- https://www.aa.com/i18n/travel-info/baggage/checked-baggage-policy.jsp
- https://www.bikeflights.com/
- https://www.bikeflights.com/shippingpolicy
- https://www.bikeflights.com/bicycleshops (loaded; no results came through)
- https://faq.bikeflights.com (hub page only)
- https://faq.bikeflights.com/support/solutions/articles/13000072589-how-do-i-ship-with-a-bike-shop-
- https://cascade.org/rides-events/seattle-portland-2026
- https://cascade.org/rides-events/chilly-hilly-2026
- https://cascade.org/rides-events/81550
- https://cascade.org/rides-events/87939
- https://cascade.org/rides-events/82922 (its link list only)
- https://cascade.org/resources/where-ride/trails-bicyclists (nothing on transit)
- https://www.seattlebikeblog.com/2023/07/10/biking-the-new-north-lake-washington-trail-loop/
- https://www.cascadebicyclestudio.com/bike-service-repair-seattle/schedule
- research/towns/seattle-wa/shops.md — the ship and rent lists

From routes.md (same run; read by @route-scout, not re-read): https://kingcounty.gov/en/dept/dnrp/nature-recreation/parks-recreation/king-county-parks/trails/leafline-trails/burke-gilman · https://ridewithgps.com/ambassador_routes/548-full-lake-loop-from-south-bellevue-p-r?lang=en · https://cascade.org/rides-events/44024 · https://cascade.org/rides-events/82167 · https://cascade.org/rides-events/83393

Tried, refused (fetch approval timed out): https://www.portseattle.org/sea-tac · https://www.soundtransit.org/ride-with-us/popular-destinations/sea-tac-airport · https://www.soundtransit.org/ride-with-us/know-before-you-go/bikes · https://wsdot.wa.gov/travel/washington-state-ferries/fares · https://www.alaskaair.com/content/travel-info/baggage/special-baggage/traveling-with-sporting-equipment · https://www.delta.com/us/en/baggage/special-items/sporting-equipment · https://www.amtrak.com/bikes · https://cascade.org/rides-events/seattle-portland-2026/transportation-details · https://cascade.org/rides-events/seattle-portland-2026/baggage-trucks · https://cascade.org/rides-events/ride-information-support/faq · https://faq.bikeflights.com/support/solutions/articles/13000072445-what-delivery-date-should-i-choose-

Hand-offs:

- Editor: American's fee page still says "updated as of May 18, 2026," so the LA, SF and Phoenix American lines stand.
- Editor: `get_around.note` uses no `{ride:}` tokens; none of the routes named has a directory ride.
