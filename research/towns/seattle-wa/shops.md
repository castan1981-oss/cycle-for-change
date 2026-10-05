# seattle-wa · shop-scout · 2026-10-04

A refresh with search back on. Every shop below was read on its own site today
(Oct 4, 2026) unless the note says otherwise. The Oct 3 run confirmed two shops
(Cascade Bicycle Studio, Bike Works Open Shop); both stand and are carried in.
The four Sept 15 shops were all re-read: Montlake, Recycled Cycles (address
found) and Gregg's stay; R+E moves to Rejected (six-week repair queue).

What a visitor gets: **two shops rent a road or gravel bike worth the trip**
(Métier on Capitol Hill, evo in Fremont, with prices), a third rents road and
gravel without a published price (Mello Fellos, downtown). **No shop in the
city says on its own site that it receives a shipped bike.** Three publish a
build-from-box fee (Mello Fellos $190, Cascade Bicycle Studio $250 and up,
Métier's builds start far higher); none says "ship it to us." The ship list is
empty on purpose.

The brief's `covers[]` towns: Bainbridge Island has two shops read (Classic
Cycle, Bainbridge Bike Co by the ferry); Issaquah has Ride Bicycles (MTB and
e-MTB rentals). Bellevue has Gregg's second store (address and phone only).
No lat/lon was fetched for any shop, so no distances are given; neighborhoods
are from the shops' own addresses.

## Findings

The city list, seven shops. The editor's six: drop evo if the list needs to be
shorter (it is a rental counter more than a shop; its page lists no service).

```json
[
  {
    "name": "Métier Cycling & Café",
    "url": "https://metier.cc/pages/bike-rental-seattle",
    "address": "1017 E Union St, Seattle, WA 98122",
    "phone": "(206) 816-3436",
    "services": ["repair", "rental", "rental-road", "rental-gravel", "fitting", "shop-rides", "coffee"],
    "note": "Capitol Hill. The rental fleet a visitor would choose over their own: a Cervélo Caledonia (Ultegra Di2) or Soloist (Ultegra) at $125 a day, a Specialized Tarmac SL8 (SRAM Rival AXS) or a Cervélo Aspero gravel bike (Rival AXS XPLR) at $175 a day, 10% off from four days; your choice of SPD, SPD-SL, Look Keo or flat pedals, a computer mount and a saddle bag with a repair kit; no helmets or shoes to rent; full refund up to 72 hours out (Oct 2026). Service is $150 an hour, an Essential Tune $225, 24-hour rush for $100 more (Oct 2026); nothing on the page about same-day. Bike fits on site. The café opens at 8; closed Mondays, Tuesday to Saturday until 5 or 6, Sunday until 3. The club's B2B ride leaves Saturday mornings, 38 miles and 2,400 feet, and you don't have to be a member."
  },
  {
    "name": "Mello Fellos Bike Shop",
    "url": "https://www.mellofellos.com/",
    "address": "2151 6th Ave, Seattle, WA 98121",
    "phone": "(206) 745-5501",
    "services": ["repair", "rental", "rental-road", "rental-gravel", "parts", "shop-rides"],
    "note": "Downtown, in the Via6 building, the start of {ride:seattle-wa-mello-fellos-saturday-ride|the shop's Saturday ride}. Rents road, gravel and city hybrid bikes for adults, helmet, lock and phone mount included; no price is published, so book or call first (Oct 2026). Rent one and buy a bike within 30 days and up to a week's rental comes off the price. Bring the bike in for an estimate; labor $130 an hour, a basic tune $125, a new bike built from the box $190 (Oct 2026); nothing on the page says it receives shipments. Monday to Friday 10 to 6, Saturday 10 to 5, Sunday noon to 5.",
    "ride_slug": "seattle-wa-mello-fellos-saturday-ride"
  },
  {
    "name": "Montlake Bicycle Shop",
    "url": "https://www.montlakebike.com/",
    "address": "2223 24th Ave E, Seattle, WA 98112",
    "phone": "(206) 329-7333",
    "services": ["repair", "rental", "rental-mtb", "rental-ebike", "parts", "suspension"],
    "note": "Montlake, the closest full-service shop to the STP start at the University of Washington. Drop the bike off any day, no appointment; a mechanic calls within 24 to 48 hours and most repairs take three to five business days, so this is not the same-day fix. $120 an hour, a check-over and basic adjust $120, a full adjust and lube $200; fork and shock service too (Oct 2026). Rents electric, city and mountain bikes from Giant and Cannondale, no road bikes and no prices on the page; reservations are paid in full and non-refundable, bring government ID. Monday to Friday 10 to 6, Saturday 9 to 5, Sunday 10 to 4."
  },
  {
    "name": "Recycled Cycles",
    "url": "https://www.recycledcycles.com/",
    "address": "1007 NE Boat St, Seattle, WA 98105",
    "phone": "(206) 547-4491",
    "services": ["repair", "rental", "parts"],
    "note": "On Boat Street under the University Bridge, right off the Burke-Gilman and a short ride from the STP start. Drop-in service: some fixes are done within a couple of hours, the rest get a pickup time and a price before you leave. New, used and consignment bikes, and tools if you'd rather do it yourself. Rentals are booked online with insurance offered; the shop's own pages don't say which bikes, so check the booking page (Oct 2026). Tuesday to Friday 11 to 6, Saturday 10 to 6, closed Sunday and Monday."
  },
  {
    "name": "Gregg's Greenlake Cycle",
    "url": "https://www.greggscycles.com/about/greenlake-pg270.htm",
    "address": "7007 Woodlawn Ave NE, Seattle, WA 98115",
    "phone": "(206) 523-1822",
    "services": ["repair", "fitting", "parts"],
    "note": "Green Lake, the big shop, open 10 to 6 every day. A full repair floor: tunes at $165, $275 and $420 ($485 with hydraulic brakes); the Platinum road tune overhauls the bottom bracket, headset and hubs (Oct 2026). Every Gregg's bike fit happens here: a Basic Fit $150, a Foundation Fit $265, cancel with 24 hours or pay half (Oct 2026). Nothing on its site about rentals or shipped bikes. A small lot on the northwest side of the store. Two more stores, in Bellevue (105 Bellevue Way NE, 425-462-1900) and Lynnwood."
  },
  {
    "name": "Cascade Bicycle Studio",
    "url": "https://www.cascadebicyclestudio.com/bike-service-repair-seattle/schedule",
    "address": "180 North Canal Street, Seattle, WA 98103",
    "phone": "(206) 547-4900",
    "services": ["repair", "fitting", "shop-rides"],
    "note": "In Fremont, on North Canal Street at Phinney Ave; the Burke-Gilman runs through the neighborhood. The fit studio: a $350 bike fit, or a $500 fit of two to three hours with motion capture, saddle pressure mapping and shoes, each with one follow-up visit; saddle or shoe-and-insole fits are $125 (Oct 2026). Service is scheduled, not same-day: come by any time for an evaluation, no appointment needed, and they book the work; a tune-up often takes a few days. Road or gravel tune-up about $300, labor $150 an hour, a build from the box $250 and up (Oct 2026). The shop's eight local loops start at the door, and it calls the Magnolia Loop its classic Wednesday group ride route; no ride time is posted. Tuesday to Saturday 10 to 6, closed Sunday and Monday."
  },
  {
    "name": "evo Seattle",
    "url": "https://www.evo.com/locations/seattle/services/bike-rentals",
    "address": "1320 N 35th St, Seattle, WA 98103",
    "phone": "(206) 973-4470",
    "services": ["rental", "rental-road", "rental-mtb", "rental-ebike"],
    "note": "Fremont, a few blocks up from the Burke-Gilman. The cheaper road rental: a carbon road bike $100 for 24 hours or $500 for seven days, a mountain bike demo $130 or $650, an e-mountain bike $150 or $750, a hybrid $60; helmets included, optional damage cover $15 ($25 on e-bikes and full suspension), 20% off when you book online (Oct 2026). No model or size list on the page. Pick up any time from opening; Monday to Saturday 10 to 8, Sunday 10 to 7. A rental counter inside an outdoor store; the page lists no repair service."
  }
]
```

For the `covers[]` towns and the DIY slot, four more. Classic Cycle and Bainbridge
Bike Co are the ferry-day shops; Ride Bicycles is the Eastside trail shop.

```json
[
  {
    "name": "Bainbridge Bike Co",
    "url": "https://www.bainbridgebikeco.com/contact",
    "address": "124 Bjune Dr SE, Bainbridge Island, WA 98110",
    "phone": "(206) 842-6413",
    "services": ["repair", "rental"],
    "note": "In Winslow, steps from the Bainbridge ferry terminal, in the shop's words. Sales, service, and rentals of electric and non-electric bikes, booked online; the site doesn't say which bikes or what they cost, so book ahead for a ferry day (Oct 2026). Wednesday to Friday 10 to 6, Saturday 10 to 5, Sunday noon to 4; closed Monday and Tuesday, so a Monday island ride means bringing your own."
  },
  {
    "name": "Classic Cycle",
    "url": "https://classiccycleus.com/",
    "address": "617 High School Rd NE, Bainbridge Island, WA 98110",
    "phone": "(206) 842-9191",
    "services": ["repair", "fitting"],
    "note": "Bainbridge Island, a mile or so up from the ferry on High School Road. Repairs, bike fitting, repair classes and used bikes; Cascade names it as one of the two full-service shops on the island for Chilly Hilly. Nothing about rentals on the pages read (Oct 2026). Tuesday to Saturday 10 to 5, Sunday noon to 4, closed Mondays."
  },
  {
    "name": "Ride Bicycles",
    "url": "https://ridebicycles.com/pages/bike-rentals",
    "address": "160 NW Gilman Blvd #102, Issaquah, WA 98027",
    "phone": "(425) 961-9061",
    "services": ["rental", "rental-mtb", "rental-ebike"],
    "note": "Issaquah, the shop for Duthie Hill, Tiger Mountain and Raging River. Rents mountain bikes and e-mountain bikes only: half day up to four hours, full day over four; helmet, flat or SPD pedals and a safety check included; reservations required, booked online, 48 hours to cancel, riders under 280 lb with gear; no prices on the page (Oct 2026). Weekdays 9:30 to 6, Saturday 9:30 to 5, Sunday 9:30 to 3."
  },
  {
    "name": "Bike Works Open Shop",
    "url": "https://bikeworks.org/adult-programs/open-shop-community-repair-space/",
    "address": "3715 S Hudson St, Seattle, WA 98118",
    "phone": null,
    "services": ["diy"],
    "note": "The nonprofit's repair space in its Columbia City warehouse: its stands and tools, with or without a mechanic's help. Second and fourth Saturdays, 1 to 5 pm, year-round; in 2026, May through September moved to the first and third Saturdays. $10 an hour on your own, $15 with some help, $20 and up for a full walkthrough, parts extra (Oct 2026). Adults only, first come first served, four people at a time. For the rider who can fix it with a stand and the right tool; nobody does the work for you."
  }
]
```

Ship-to-shop and rental lists, shaped like `bring_your_bike.ship.shops` and
`.rent.shops`. The ship list is empty: no shop page read says it receives a
bike shipped to the shop. The rent list is the shops that rent a road, gravel
or mountain bike on their own site.

```json
{
  "ship": { "shops": [] },
  "rent": {
    "shops": [
      {
        "name": "Métier Cycling & Café",
        "url": "https://metier.cc/pages/bike-rental-seattle",
        "note": "Capitol Hill. Cervélo Caledonia (Ultegra Di2) or Soloist (Ultegra) $125 a day; Specialized Tarmac SL8 or Cervélo Aspero gravel (SRAM Rival AXS) $175 a day; 10% off from four days; your pedals, no helmets (Oct 2026). Book online; full refund 72 hours out. Closed Mondays. 1017 E Union St; (206) 816-3436 ext. 2."
      },
      {
        "name": "evo Seattle",
        "url": "https://www.evo.com/locations/seattle/services/bike-rentals",
        "note": "Fremont. Carbon road bike $100 for 24 hours, $500 for seven days; mountain bike demo $130, e-mountain bike $150 for 24 hours; helmet included; 20% off booked online (Oct 2026). No model or size list. Open every day. 1320 N 35th St; (206) 973-4470."
      },
      {
        "name": "Mello Fellos Bike Shop",
        "url": "https://www.mellofellos.com/articles/rental-pg233.htm",
        "note": "Downtown. Road, gravel and city hybrid bikes with helmet, lock and phone mount; no price published, book online or call (Oct 2026). Open every day. 2151 6th Ave; (206) 745-5501."
      },
      {
        "name": "Ride Bicycles",
        "url": "https://ridebicycles.com/pages/bike-rentals",
        "note": "Issaquah, for the Tiger Mountain and Duthie trails. Mountain and e-mountain bikes only, half or full day, reservations required, no price on the page (Oct 2026). 160 NW Gilman Blvd #102; (425) 961-9061."
      }
    ]
  }
}
```

## Why these

- **Métier** is the rental a visiting road rider wants: current Cervélos and a Tarmac SL8 with Di2 or AXS, published prices, pedal choice, and a café that opens at 8. It is also a fit studio and a $150-an-hour service floor with a paid 24-hour rush, which is the nearest thing to a fast fix found. `shop-rides` from its own group-rides page (Saturday B2B, non-members welcome); `coffee` from the rental page ("Handlebar Coffee"). Sizes aren't on the shop's page; Cascade's rental list (dated July 2024) says 48 to 61 cm, not used in the note.
- **Mello Fellos** rents road and gravel, hosts the Saturday ride already in rides.json, is downtown where a visitor sleeps, and publishes the one build-from-box fee under $200. No price for rentals, said plainly.
- **Montlake** stays for the STP: nearest shop to the start, open seven days, full service menu. The Sept 15 note said it rents "city, electric and mountain bikes"; the homepage still says exactly that, so `rental-mtb` and `rental-ebike`, no `rental-road`. Not same-day: its own page says 24 to 48 hours to a call and three to five days to a fix.
- **Recycled Cycles** got its address (1007 NE Boat St, from its contact page) and stays: drop-in service with "within a couple hours" on some fixes is the closest thing to a same-day line in the U District, and it sits on the Burke-Gilman. `rental` only — its own pages name no bike type.
- **Gregg's Greenlake** is the fit stop with published prices and the all-week floor. **The current file's `riding[1]` says Gregg's rents bikes; nothing on greggscycles.com says so.** The editor should cut that sentence or move it to Montlake and Métier.
- **Cascade Bicycle Studio** carried from Oct 3 unchanged (read then, not re-read today).
- **evo** is the budget carbon road rental, and the only one with a seven-day price. Its page lists rentals only, so no `repair`.
- **Bainbridge Bike Co** is the shop at the ferry for a rider who comes over without a bike; **Classic Cycle** is the island's service shop. **Ride Bicycles** is for the Eastside trails. **Bike Works Open Shop** carried from Oct 3.

## Rejected

- **R+E Cycles / Rodriguez Bicycle Company** (rodbikes.com; recycles.com fails its TLS check) — 5627 University Way NE, 206.527.4822, Tuesday to Friday noon to 6, Saturday 10 to 5. Its homepage says the repair wait is six weeks (Oct 2026). A custom frame builder and fitter, not a shop a visitor can use. Dropped from `bike_shops`; the editor can keep one line on the STP page if wanted ("hand-built in Seattle since 1973").
- **Veloce Velo, Mercer Island** — the only pages found are from 2010–2011 (the Mercer Island Reporter: 2755 77th Ave SE, consolidated there Aug 1, 2011). A Yelp result lists it as closed (Dec 2025) but Yelp blocks the fetcher. Not listed; the Mercer Island loop in routes.md should not point at it.
- **velocevelo.com** — a French site with nothing to do with the shop.
- **Métier on the ship list** — publishes build fees ($895 tailored, $1,200 custom, Oct 2026) for bikes it sells and builds; says nothing about receiving a shipment.
- **Mello Fellos, Cascade Bicycle Studio and Montlake on the ship list** — build or assembly fees published, nothing about taking a carrier delivery addressed to the shop.
- **Cascade's bike-rentals resource page** (cascade.org/resources/finding-bike/bike-rentals) — a useful list, dated 7/12/24, so used only for leads; every fact in the findings comes from the shop's own page. It gives evo's address as 3500 Stone Way N; evo's own page says 1320 N 35th St, which is what's listed.
- **Electric & Folding Bikes Northwest** (Ballard), **Wombi**, **Spokeo**, **Seattle Bicycle Tours**, **Rack 'n Road** — e-bikes, cargo subscriptions, a peer-to-peer platform, tours and car racks. Not a shop for this guide.
- **Outdoors For All Adaptive Cycling Center** (Magnuson Park) — adaptive bikes and trikes, free May to September per Cascade's list. Worth a line to @community-scout for the resources side; not a rental shop here.
- **The Line Bicycle Experience, North Bend** and **evo Snoqualmie Pass** — trail shops 30-plus miles out; outside `covers[]`.
- **BikeFlights' Seattle to Portland event page** — a shipping landing page with no partner shop named. Its 2026 STP code is in logistics.md.
- **The Bicycle Fixer, Speedy's E-Bike Rescue, NorthStar's loaner bikes, Yelp** — rejected Oct 3 for the same reasons; nothing changed.

## Couldn't confirm

- **Any ship-to-shop in Seattle.** Two searches and every shop page read came up empty. BikeFlights' shop finder draws results by script. The Chilly Hilly page says Classic Cycle is full service; nothing says it takes shipments. Where to look: call Mello Fellos (publishes the $190 build) and Cascade Bicycle Studio ($250 and up) and ask whether they'll sign for a BikeFlights box; whichever says yes gets a line with "by phone, Oct 2026" until its site says so.
- **Métier's rental sizes** — the shop's page doesn't list them; Cascade's 2024 list says 48 to 61 cm.
- **Recycled Cycles' rental fleet and prices** — on us.bikerentalmanager.com, not read. Cascade's 2024 list says hybrids and road bikes with reservations required.
- **Mello Fellos' and Bainbridge Bike Co's rental prices** — both on valet.rentals / valet.ventures booking widgets, not read.
- **Classic Cycle rentals** — the search surfaced classiccycleus.com/home/specials/bikes/ ("Bike rentals on Bainbridge Island available at Classic Cycle"); it 404s. Its fitting page (classiccycleus.com/rentals/bike-fitting/) wasn't read.
- **Bainbridge Island Cycle Shop** (the other shop Cascade names for Chilly Hilly) — only a Roadtrippers listing surfaced; no site read. Bainbridge Bike Co may be the same shop under a new name (bainbridgeisland.com lists "Bainbridge Bike Co" at the slug b-i-cycle-shop); not confirmed.
- **Gregg's Bellevue and Lynnwood hours** — the store pages weren't read; only the addresses and phones from the homepage.
- **Sound Break Bike House, 115 S Jackson St** — still unread; Everyday Rides lists a Wednesday lunch ride from it. Lead for @community-scout and @coffee-scout.
- **Wright Brothers Cycle Works** — https/http loop, same as Oct 3.
- **The Bikery** (855 Hiawatha Pl S) — site read Oct 3; nothing dated after January 2024, no phone. Not listed.

## Sources

Read today (Oct 4, 2026):

- https://www.montlakebike.com/
- https://www.montlakebike.com/articles/bike-rentals-pg148.htm
- https://www.montlakebike.com/articles/bike-service-pg146.htm
- https://www.greggscycles.com/
- https://www.greggscycles.com/about/greenlake-pg270.htm
- https://www.greggscycles.com/about/service-repair-pg368.htm
- https://www.greggscycles.com/articles/bike-fit-pg377.htm
- https://www.recycledcycles.com/
- https://www.recycledcycles.com/rentals/
- https://www.recycledcycles.com/service-center/
- https://www.recycledcycles.com/service/contact/
- https://www.rodbikes.com/
- https://metier.cc/pages/bike-rental-seattle
- https://metier.cc/
- https://metier.cc/pages/contact
- https://metier.cc/pages/seattle-bicycle-builds
- https://metier.cc/pages/seattle-bicycle-repair
- https://metier.cc/pages/metier-group-rides
- https://www.mellofellos.com/
- https://www.mellofellos.com/articles/rental-pg233.htm
- https://www.mellofellos.com/articles/service-pg229.htm
- https://www.mellofellos.com/about/via6-building-pg265.htm
- https://www.evo.com/locations/seattle/services/bike-rentals
- https://ridebicycles.com/pages/bike-rentals
- https://classiccycleus.com/
- https://classiccycleus.com/rentals/
- https://www.bainbridgebikeco.com/contact
- https://cascade.org/resources/finding-bike/bike-rentals (leads only; dated 7/12/24)
- https://www.bikeflights.com/events/Seattle_to_Portland
- https://www.mi-reporter.com/news/veloce-velo-is-consolidating-on-mercer-island/ (2011)
- https://www.velocevelo.com/ (not the shop)

Carried from Oct 3 (read then): https://www.cascadebicyclestudio.com/bike-service-repair-seattle/schedule · https://www.cascadebicyclestudio.com/bike-fitting-seattle/schedule · https://www.cascadebicyclestudio.com/local-loops-seattle · https://bikeworks.org/adult-programs/open-shop-community-repair-space/ · https://www.thebikery.org/ · https://cascade.org/rides-events/chilly-hilly-2026

Tried, failed: https://www.recycles.com/ (TLS certificate; use rodbikes.com) · http://classiccycleus.com/home/specials/bikes/ (404) · https://www.bainbridgebikeco.com/ (429) · https://www.velocevelo.com/ (wrong site)

Hand-offs:

- @community-scout: Métier's Saturday B2B ride (38 mi, 2,400 ft, non-members welcome; the time isn't on the page, join via the Strava club) is not in rides.json. Cascade Bicycle Studio's Wednesday Magnolia Loop ride, still no time posted. Sound Break Bike House's Wednesday lunch ride. Outdoors For All's adaptive cycling center for the resources side.
- @coffee-scout: Métier's café (Handlebar Coffee) opens at 8 on Capitol Hill; Sound Break Bike House.
- @logistics-scout: the rent list above is yours; the ship list is empty, and Mello Fellos' $190 build is the lowest published build fee.
- Editor: cut "Gregg's in Green Lake and Montlake Bicycle Shop both rent bikes" from `riding[1]` — Gregg's site says nothing about rentals and Montlake rents no road bikes.
