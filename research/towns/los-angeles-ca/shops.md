# los-angeles-ca — shops

town: `los-angeles-ca` · agent: **shop-scout** · date: **2026-09-30**

Six shops, every one fetched on its own site. Zones follow `brief.md`.
Distances are straight-line estimates from City Hall (34.0522, -118.2437)
using approximate coordinates, not fetched lat/lon — the verifier should
check them. Prices are as read in Sept 2026. No shop states same-day service;
the honest lines are in the notes.

## Findings

```json
[
  {
    "name": "Helen's Cycles Santa Monica",
    "url": "https://www.helenscycles.com/about/santa-monica-pg284.htm",
    "address": "2501 Broadway, Santa Monica, CA 90404",
    "phone": "(310) 829-1836",
    "services": ["repair", "fitting", "rental", "rental-road", "shop-rides"],
    "note": "Zone 1, the Westside, about 13 miles west of downtown and a mile or so from the La Grange 6:30 weekday start at 26th and San Vicente. Rents a carbon Cannondale SuperSix EVO CRB 3: $120 for one day, $90 a day for three days, $75 a day for five or more (Sept 2026); pedals, helmet and lock on request, flat kit in the saddle bag, photo ID, reserve by phone. Closed Mondays; Tuesday to Saturday 10 to 6, Sunday 11 to 5; service is call-ahead, not walk-in (standard tune-up $125, Sept 2026). Bike fitting on site; boxes a bike to ship home for $145 (Sept 2026); road and dirt shop rides leave from the door but the site lists the schedule as TBD — check the shop's Strava club."
  },
  {
    "name": "Bike Attack",
    "url": "https://bikeattack.com/",
    "address": "2904 Main Street, Santa Monica, CA 90405",
    "phone": "(310) 862-5001",
    "services": ["repair", "rental", "rental-road"],
    "note": "Zone 1, Main Street at the Ocean Park end of Santa Monica, about 14 miles west of downtown. Rents Bianchi and KHS road bikes with Shimano 105 or similar: $50 a day or $75 for 24 hours (Sept 2026), first come first served, no reservations — call before you count on one; the fleet changes. Open every day 10 to 6. Flat fix $25 plus tube, tune-ups $95 to $235; assembles a boxed bike for $120 to $300 and boxes one to ship for $100 to $250 (Sept 2026), but the site does not say it receives shipments addressed to the shop — ask."
  },
  {
    "name": "Bike Shop LA",
    "url": "https://www.bikeshopla.com/",
    "address": "7740 Santa Monica Blvd, West Hollywood, CA 90046",
    "phone": "(323) 515-0070",
    "services": ["repair", "ship-to-shop"],
    "note": "West Hollywood, about 7 miles west of downtown; the closest pick to the Hollywood side of Nichols Canyon and to Griffith Park. The one confirmed ship-to-shop: register with BikeFlights, name Bike Shop LA as the recipient, they build it and call you; no build fee is published (Sept 2026). Walk-ins welcome, no appointment, typical turnaround 24 to 48 hours; flat fix $23 plus tube, standard tune-up $109.25 (Sept 2026). Open every day; the site says 9 to 5 in one place and 10 to 5 in another. No rentals of its own."
  },
  {
    "name": "Incycle Pasadena",
    "url": "https://www.incycle.com/pages/pasadena-ca",
    "address": "175 S Fair Oaks Ave, Pasadena, CA 91105",
    "phone": "(626) 577-0440",
    "services": ["repair", "fitting", "shop-rides"],
    "note": "Zone 4, Old Pasadena, about 8 miles northeast of downtown; the shop for the San Gabriels side. Retul custom fit, 2.5 hours, $400 (Sept 2026), booked at this store. Runs the FOO CHOW ride from the door, first and third Tuesdays, roll at 7 pm (already in the rides directory). Open every day: Monday 10 to 5, Tuesday to Saturday 10 to 6, Sunday 11 to 5. The chain's service page lists boxed-bike assembly at $70 to $200 (Sept 2026) and does not say the store receives shipped bikes — call."
  },
  {
    "name": "Helen's Cycles Manhattan Beach",
    "url": "https://www.helenscycles.com/about/manhattan-beach-pg283.htm",
    "address": "1570-C Rosecrans Avenue, Manhattan Beach, CA 90266",
    "phone": "(310) 321-5290",
    "services": ["repair", "fitting", "rental"],
    "note": "Zone 5, the South Bay, about 13 miles southwest of downtown, for the beach path south and the Palos Verdes loop. Closed Mondays; Tuesday to Saturday 10 to 6, Sunday 11 to 5; call ahead for service. Repair and bike fitting on site. The only rental here is a Cannondale Treadwell 3, a flat-bar fitness bike, $50 a day (Sept 2026) — fine for the beach path, not the bike for the Donut."
  },
  {
    "name": "C Street Bikes",
    "url": "https://www.cstreetbikes.com/",
    "address": "3717 Cahuenga Blvd., Studio City, CA 91604",
    "phone": "(818) 980-7456",
    "services": ["repair"],
    "note": "Zone 6, the Valley, on Cahuenga Blvd in Studio City, about 9 miles northwest of downtown. Family-owned; repair and service on road, gravel, mountain and commuter bikes. Tuesday to Saturday 11 to 6, or by appointment; closed Sunday and Monday. No rentals, fitting or shipping stated on the site; email service@cstreetbikes.com before you show up."
  }
]
```

### ship_and_rent

```json
{
  "ship": {
    "note": "One shop says it on its own site: Bike Shop LA in West Hollywood takes BikeFlights deliveries addressed to the shop and builds the bike; no build fee is published (Sept 2026). Helen's Cycles, Bike Attack and Incycle each publish a fee to assemble a boxed bike ($145, $120 to $300 and $70 to $200, Sept 2026) but none says it will receive a shipment — call before you book. Bike Shop LA's page says BikeFlights typically runs about $100 within the US (Sept 2026).",
    "shops": [
      {
        "name": "Bike Shop LA",
        "url": "https://www.bikeshopla.com/articles/bike-shipping-assembly-pg230.htm",
        "note": "Register with BikeFlights, pick Bike Shop LA as the recipient; they build it and call when it is ready. Build fee not published (Sept 2026). Open every day. 7740 Santa Monica Blvd, West Hollywood; (323) 515-0070."
      }
    ]
  },
  "rent": {
    "note": "Two Westside shops rent a road bike worth the day; neither lists sizes, so call with your height. Helen's Cycles Santa Monica has a carbon Cannondale SuperSix EVO CRB 3 at $120 a day, $90 a day for three days, $75 a day for five or more, with the pedals you ask for (Sept 2026). Bike Attack on Main Street has Bianchi and KHS road bikes at Shimano 105 level, $50 a day or $75 for 24 hours, first come first served (Sept 2026). No gravel or mountain bike rental was confirmed anywhere. Helen's Manhattan Beach rents only a Treadwell fitness bike, $50 a day (Sept 2026), which does the beach path and not much more.",
    "shops": [
      {
        "name": "Helen's Cycles Santa Monica",
        "url": "https://www.helenscycles.com/articles/bike-rentals-pg271.htm",
        "note": "Cannondale SuperSix EVO CRB 3 (carbon road). $120 one day, $90 a day for three days, $75 a day for five or more (Sept 2026). Pedals, helmet and lock free on request; flat kit included; photo ID. Reserve ahead: (310) 829-1836. Sizes not listed. Closed Mondays."
      },
      {
        "name": "Bike Attack",
        "url": "https://bikeattack.com/bike-rentals/",
        "note": "Bianchi and KHS road bikes, Shimano 105 or similar. $50 a day or $75 for 24 hours (Sept 2026). First come first served, no reservations; call (310) 862-5001 for availability. Waiver, ID and card copy. Sizes not listed. Open every day 10 to 6."
      }
    ]
  }
}
```

## Why these

- **Helen's Cycles Santa Monica** — the Westside road shop: the only carbon road rental confirmed in the city, a fit studio, boxing to ship home, and the shop the route scout's Latigo and PCH rides leave from. Closest pick to the La Grange 6:30 weekday start.
- **Bike Attack** — the cheaper road rental on the Westside and open seven days, a few blocks off the beach path in Ocean Park. Service prices are on the site, so a rider knows what a flat costs before walking in.
- **Bike Shop LA** — the only shop that says on its own site it will receive a BikeFlights delivery and build the bike. Walk-in repairs with a stated 24 to 48 hour turnaround. Sits between the Westside and Griffith Park.
- **Incycle Pasadena** — the San Gabriels shop: a Retul fit at a published price and the FOO CHOW ride already in the directory. Pasadena gets its own guide later; this is the one pick there because Zone 4 needs a shop.
- **Helen's Cycles Manhattan Beach** — the South Bay branch for the beach path south and the PV loop; repair and fit, same hours as Santa Monica. The rental is a fitness bike, said plainly.
- **C Street Bikes** — the Valley pick, repair only, for the SFVBC Saturday rider or the Mulholland-from-the-Valley day. Thin, but fetched and open Tuesday to Saturday.

## Rejected

- **Golden Saddle Cyclery** (Silver Lake) — the shop's site could not be fetched from this session (the fetch approval never came, twice). Yelp's listing is marked CLOSED (updated June 2026). Not listed; the editor should confirm the closure so the next run skips it.
- **Velo Pasadena** (2562 E Colorado Blvd, (626) 304-0064) — fetched its service page: tune-ups $100 / $180 / $450, "bike rentals" and "bike fitting" offered with no bikes or prices on the page. Left out as a second Pasadena shop in a town that will get its own guide; the rentals page was not fetched. A lead if the editor wants an east-side rental.
- **Bikes and Hikes LA** — where Bike Shop LA's "Bike Rentals" link goes. A tour company, not fetched; not a shop rental for this guide.
- **Unlimited Biking Santa Monica** — a rental-and-tour outfit in the search results; not fetched. Not a shop with a service department.
- **REI Burbank / REI Northridge** bike shops — chain store pages in the search results; not fetched. A fallback for the Valley if C Street is booked.
- **Burbank Bike Shop** (burbankbikeshop.com) — in the search results; not fetched.
- **Specialized Santa Monica** — a Retul fit page came up in search; not fetched. A lead for a second Westside fit.
- **Helen's "New Bike Assembly" ($145 road) and Incycle's "Boxed Bike Assembly" ($70 to $200)** as ship-to-shop — assembly fees for a bike in a box, not a statement that the shop receives shipments. See Couldn't confirm.
- **Yelp, Yellow Pages, Foursquare, Nextdoor, Bike Forums, MyVeloFit, BikeFitFinder** — leads only, never a source.

## Couldn't confirm

- **An east-side shop (Silver Lake / Los Feliz / Frogtown).** Nothing verified on the Zone 3 side; Bike Shop LA in West Hollywood is the nearest pick. **Spoke Bicycle Cafe** (spokebicyclecafe.com) sits on the river path in Frogtown per the search results; its site rate-limited robots.txt (429) twice. Where to look: spokebicyclecafe.com again, its Instagram, the Eastsider LA piece in the search results. Hand-off to @coffee-scout as well — it is a café. A DIY co-op in that part of town would also fill the `diy` chip; none was fetched.
- **Same-day repair.** No site says it. Bike Shop LA is walk-in with a stated 24 to 48 hours; Helen's is call-ahead; Bike Attack and Incycle say nothing about turnaround. Where to look: phone each shop; ask about event weekends (Center Ride Out, April 23, 2027).
- **Ship-to-shop beyond Bike Shop LA.** Helen's ($145 road assembly, $145 boxing), Bike Attack ($120 to $300 assembly from box) and Incycle ($70 to $200 boxed assembly) publish fees but not that they accept a carrier delivery addressed to the shop. Where to look: call; BikeFlights' shop directory.
- **Bike Shop LA's build fee** for a shipped bike — the page says they assemble and call; no price. Where to look: phone (323) 515-0070.
- **Rental sizes** at Helen's Santa Monica and Bike Attack — neither page lists frame sizes; Bike Attack says the fleet changes. Where to look: phone with rider height.
- **Gravel or MTB rental** anywhere in the city — none found on a fetched page.
- **Bike-box or case storage.** Helen's lists "daily storage $10/day" and Bike Shop LA "daily storage fee $15"; neither says whether that is a bike case for the week or an uncollected bike after service. Bike Attack's "$20 each day after 3 days" is a late-pickup charge. Where to look: phone each shop; if Helen's stores a case for $10 a day that is worth its own line.
- **Helen's fit price** — the store pages and nav list "Bike Fit Services" (Nate Loyal fitting); the fit page was not fetched. Where to look: helenscycles.com/articles/bike-fit-services-pg78.htm.
- **Helen's shop ride schedule** — the rides page says "Group Rides TBD, check Facebook and Instagram"; the shop keeps a Strava club (strava.com/clubs/helenscycles) and says rides leave from the shop, road and off-road, 14 to 22 mph, 3-plus hours, regroups. Hand-off to @community-scout. Where to look: the Strava club, @helenscycles on Instagram.
- **Bike Shop LA hours** — 9 to 5 in the header, 10 to 5 in the text. Where to look: Google listing or phone.
- **Parts stock** (Di2 chargers, sealant, hangers) — no site lists it; `parts` is tagged nowhere. Where to look: phone.
- **Distances** in the notes are straight-line estimates from approximate coordinates; only Incycle's start (34.1435, -118.1505) comes from `rides.json`. The verifier should recompute from geocoded addresses.

## Sources

- https://www.helenscycles.com/
- https://www.helenscycles.com/storelocator/
- https://www.helenscycles.com/about/santa-monica-pg284.htm
- https://www.helenscycles.com/about/manhattan-beach-pg283.htm
- https://www.helenscycles.com/articles/bike-rentals-pg271.htm
- https://www.helenscycles.com/articles/bike-repair-and-service-pg62.htm
- https://www.helenscycles.com/articles/local-rides-events-pg390.htm
- https://bikeattack.com/
- https://bikeattack.com/bike-rentals/
- https://bikeattack.com/service-repairs/
- https://bikeattack.com/contact-us/
- https://www.bikeshopla.com/articles/bike-shipping-assembly-pg230.htm
- https://www.bikeshopla.com/articles/bike-service-repair-pg186.htm
- https://www.incycle.com/pages/pasadena-ca
- https://www.incycle.com/pages/bike-fit
- https://www.incycle.com/pages/bike-service
- https://www.cstreetbikes.com/
- https://www.velopasadena.com/articles/bike-service-repair-pg186.htm
- cfc-site/rides/rides.json — `pasadena-ca-foo-chow-ride` (its source, https://www.incycle.com/pages/retail-event/foo-chow-ride, was not re-fetched this run)
- research/towns/los-angeles-ca/routes.md — the Helen's and La Grange hand-offs

Not fetched (blocked from this session): https://www.goldensaddlecyclery.com/ (no fetch approval), https://www.spokebicyclecafe.com/ (robots.txt 429), https://www.incycle.com/pages/pasadena (no fetch approval; the `pasadena-ca` page loaded instead).
