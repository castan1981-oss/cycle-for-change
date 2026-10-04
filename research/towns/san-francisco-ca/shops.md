# san-francisco-ca — shops

town: `san-francisco-ca` · agent: **shop-scout** · date: **2026-10-03**

Six shops, each one fetched on its own site this run. Zones follow `brief.md`.
Distances are straight-line from City Hall (37.7793, -122.4193). Five come from
OpenStreetMap geocodes of the shop's own street address; Sports Basement
Presidio would not geocode and is an estimate. The verifier should recheck all
six. Prices are as read in Oct 2026. One shop says on its own site that it
receives a shipped bike (Columbus Cyclery). One says same-day for most simple
repairs (Valencia Cyclery). Sports Basement says it does small jobs on the spot.

Some pages were read with `curl` through the session proxy instead of
WebFetch. WebFetch only loaded URLs that had come up in a search; for other
URLs its permission prompt timed out. Each URL below is the page that was read.

## Findings

```json
[
  {
    "name": "Sports Basement Presidio",
    "url": "https://shop.sportsbasement.com/blogs/stores/san-francisco-presidio",
    "address": "610 Old Mason Street, San Francisco, CA 94129",
    "phone": "(415) 934-2900",
    "services": ["repair", "same-day", "fitting", "rental", "rental-road", "rental-gravel", "rental-mtb", "rental-ebike", "box-rental"],
    "note": "Zone 1, the Presidio, about 3 miles northwest of City Hall; the closest pick to the bridge. Rents carbon road bikes (Cannondale Synapse or Scott Addict 30, Shimano 105 or better, 44 to 61 cm) and a Cannondale Topstone Carbon gravel bike (XS to XL) at $100 a day, $175 for 2 to 4 days and $300 for 5 to 9 days, and a Synapse Hi-Mod Dura-Ace (51 to 61 cm) at $135, $220 and $380 (Oct 2026). Helmet, lock and flat kit come with it; pedals aren't mentioned; a $1,000 hold goes on a physical credit card with matching ID. Reserve online and pick up here, or at the Stonestown or Berkeley stores. Open every day, weekdays 10 to 8 and weekends 9 to 7. The service desk does small jobs and flats on the spot. GURU fit $300. Rents a Thule RoundTrip bike case at $55 a day, $80 for 2 to 4 days or $110 for 5 to 9 days (Oct 2026)."
  },
  {
    "name": "High Trails Cyclery",
    "url": "https://www.hightrailscycles.com/",
    "address": "1825 Polk Street, San Francisco, CA 94109",
    "phone": "(415) 814-3216",
    "services": ["repair", "fitting", "rental", "rental-road", "rental-gravel", "rental-mtb", "rental-ebike"],
    "note": "Zone 6, Polk Gulch below Russian Hill, about a mile north of City Hall. Rents a carbon road bike with hydraulic discs (Cervelo Caledonia or similar, 48 to 61 cm) at $100 a day and a gravel bike (Cervelo Aspero or similar, 48 to 58 cm) at $125 a day. Pedals of your choice (flat, SPD, SPD-SL or Look Keo), cage, helmet and lock come free (prices read Oct 2026). Opens late: Monday to Friday noon to 6, Saturday 10 to 4, closed Sunday. Its mechanics work on Di2, eTap AXS and Campagnolo; safety check $60, tune-up $180 (Oct 2026). The rental page's images date from May 2024, so call to confirm the fleet and prices."
  },
  {
    "name": "Columbus Cyclery",
    "url": "https://columbuscyclery.com/",
    "address": "2011 Mason Street, San Francisco, CA 94133",
    "phone": "(415) 561-9999",
    "services": ["repair", "ship-to-shop", "rental", "rental-road", "rental-mtb", "rental-ebike"],
    "note": "Zone 6, North Beach, about 1.6 miles north of City Hall; the shop says the Wharf and the bike path to the bridge are a few minutes away. The one confirmed ship-to-shop: ship the bike here and they build and tune it in 24 to 48 hours for $135 ($190 for an e-bike), and box it for the trip home for $115, or $135 with accessories (Oct 2026). Open every day, 10 to 6. Walk-in repair, no appointment, 24 to 48 hours; flat fix $16 labor. It does not service tubeless or tubular tires. Rents what it calls race bikes at $59 a day or $50 a day for three days or more (Oct 2026); no model or size is listed."
  },
  {
    "name": "Valencia Cyclery",
    "url": "https://www.valenciacyclery.com/articles/bike-repair-pg184.htm",
    "address": "1065 Valencia St., San Francisco, CA 94110",
    "phone": "(415) 550-6601",
    "services": ["repair", "same-day"],
    "note": "Zone 6, the Mission, about 1.6 miles south of City Hall and about a mile from the Castro start of {ride:san-francisco-ca-different-spokes-jersey-ride|Different Spokes' Jersey Ride}. Repairs are walk-in only, and most simple jobs are done the same day; Level 1 service is $160 (Oct 2026). Monday to Saturday 10 to 6, Sunday 10 to 5. Boxes a bike for BikeFlights from $120; allow four business days between drop-off and pickup (Oct 2026). Its site doesn't say it receives a shipped bike. Use the repair shop at 1065; the sales floor is next door at 1077, (415) 550-6600."
  },
  {
    "name": "Mike's Bikes of Sausalito",
    "url": "https://mikesbikes.com/pages/sausalito",
    "address": "#1 Gate 6 Rd., Sausalito, CA 94965",
    "phone": "(415) 332-3200",
    "services": ["repair"],
    "note": "Zone 2, the Marin City end of Sausalito, about 8 miles north of City Hall, at the start of the Mill Valley-Sausalito bike path (the shop's words). Service is open every day; appointments are encouraged and walk-ins are welcome. Monday to Saturday 10 to 6, Sunday 10 to 5. The chain's NorCal price list has a tube or tire install at $15 labor (Oct 2026). This store doesn't rent bikes. The chain's demo and rental fleet in Marin is at Mike's Bikes of San Rafael."
  },
  {
    "name": "Splitrock Tap & Wheel",
    "url": "https://www.splitrocktapandwheel.com/contact/fairfax-bike-shop-cafe-pg141.htm",
    "address": "2020 Sir Francis Drake Blvd., Fairfax, CA 94930",
    "phone": "(415) 721-7644",
    "services": ["repair", "rental", "rental-mtb", "rental-ebike"],
    "note": "Zone 2, Fairfax, about 17 miles north-northwest of City Hall; a bike shop with a café and taproom, and the start of {ride:fairfax-ca-marin-cyclists-fairfax-to-point-reyes-station|Marin Cyclists' Point Reyes Station ride}. The shop is open every day, 10 to 6. Rents full-suspension, hardtail and electric trail bikes for a half day or 24 hours; no prices on the site. Walk-ins are taken, but reserve to get your size. Tune-up $150 (Oct 2026). The business filed for Chapter 11 in April 2026 and said it will keep operating (WhatNow, April 14, 2026), so call before you count on it."
  }
]
```

### ship_and_rent

```json
{
  "ship": {
    "note": "One shop says it on its own site: Columbus Cyclery in North Beach takes a bike shipped to the shop and builds and tunes it in 24 to 48 hours for $135, $190 for an e-bike (Oct 2026). It holds the bike free for a few days, then charges $13 a day, and boxes it for the trip home for $115, or $135 with accessories. Sports Basement builds a boxed bike bought elsewhere for $155 (new) or $120 (used) and boxes one to ship for $110. Valencia Cyclery boxes for BikeFlights from $120 (Oct 2026). Neither says it will receive a shipment; call before you book.",
    "shops": [
      {
        "name": "Columbus Cyclery",
        "url": "https://columbuscyclery.com/bike-assembly-tune-up/",
        "note": "Ship your bike to the shop; they assemble and tune it in 24 to 48 hours. $135, $90 single speed, $190 e-bike (Oct 2026). Free storage for 5 days after assembly per this page (the repair page says 7), then $13 a day. Boxing for the return: $115 bare, $135 with accessories. No tubeless or tubular service. Open every day 10 to 6. 2011 Mason Street, North Beach; (415) 561-9999."
      }
    ]
  },
  "rent": {
    "note": "Two city shops rent carbon road and gravel bikes worth riding, both at $100 a day for road (Oct 2026). Sports Basement Presidio, nearest the bridge, has Synapse or Addict road bikes and a Topstone Carbon gravel bike, both cheaper by the week ($300 for 5 to 9 days), with a Dura-Ace Synapse at $135 a day. Its pages list sizes, it's open every day, and the same fleet picks up at Stonestown and Berkeley. High Trails Cyclery on Polk Street has a Cervelo Caledonia-type road bike at $100 and an Aspero-type gravel bike at $125 a day, with the pedals you ask for; it's closed Sundays and its rental page may be dated. Columbus Cyclery's race bikes run $59 a day with no model listed. For Tam's trails, Splitrock in Fairfax rents full-suspension and e-MTBs; prices aren't published.",
    "shops": [
      {
        "name": "Sports Basement Presidio",
        "url": "https://www.sportsbasement.com/pages/bike-rental-rates",
        "note": "Carbon road (Cannondale Synapse or Scott Addict 30, Shimano 105 or better, 44 to 61 cm) and Cannondale Topstone Carbon gravel (105, XS to XL): $100 a day, $175 for 2 to 4 days, $300 for 5 to 9 days. Synapse Hi-Mod Dura-Ace (51 to 61 cm): $135, $220, $380. Cannondale Habit 6 full-suspension (S to XL): $100 a day. E-bikes $75 a day (all Oct 2026). Helmet, lock and flat kit included; pedals not stated; $1,000 hold on a physical credit card with matching ID; no sales tax. Reserve online; pick up at Presidio, Stonestown or Berkeley. 610 Old Mason Street; (415) 934-2900."
      },
      {
        "name": "High Trails Cyclery",
        "url": "https://www.hightrailscycles.com/rentals/rental-and-demo-bikes-pg204.htm",
        "note": "Premium road (carbon, hydraulic disc, Cervelo Caledonia or similar, 48 to 61 cm) $100 a day; premium gravel (Cervelo Aspero or similar, 48 to 58 cm) $125 a day; full-suspension MTB $150; e-MTB $200 (read Oct 2026; the page's images date from May 2024, so call). Flat, SPD, SPD-SL or Look Keo pedals, cage, helmet and lock included. Reserve by the shop's form; waiver required. Closed Sundays. 1825 Polk Street; (415) 814-3216."
      },
      {
        "name": "Columbus Cyclery",
        "url": "https://columbuscyclery.com/bike-rental-san-francisco/",
        "note": "Race bikes: $20 an hour (2-hour minimum), $59 a day, $50 a day for three days or more (Oct 2026). No model, groupset or sizes listed. U-lock, pump, spare tube and free helmet included. No booking; walk in. Open every day 10 to 6. 2011 Mason Street; (415) 561-9999."
      },
      {
        "name": "Splitrock Tap & Wheel",
        "url": "https://www.splitrocktapandwheel.com/about/demos-rentals-pg231.htm",
        "note": "Full-suspension, hardtail and electric trail bikes for a half day or 24 hours, minutes from Tamarancho and Mt. Tamalpais State Park (the shop's words). No prices or sizes on the site. Reserve ahead to get your size. Open every day 10 to 6. 2020 Sir Francis Drake Blvd., Fairfax; (415) 721-7644."
      }
    ]
  }
}
```

## Why these

- **Sports Basement Presidio**: the most complete stop for a visitor. It has carbon road and carbon gravel rentals with sizes listed, a Dura-Ace option, a bike case to rent for the trip, a fit studio, and a service desk that does flats on the spot. It's open seven days, until 8 on weekdays, and it's the closest pick to the bridge.
- **High Trails Cyclery**: the other real road and gravel rental in the city, and the only one that puts SPD-SL or Keo pedals on for you. Its mechanics list Di2, AXS and Campagnolo, which matters if your electronic bike arrives with a fault. It's listed with a phone-first note because of its hours and the age of its rental page.
- **Columbus Cyclery**: the only shop whose own site says to ship your bike there. The build fee, turnaround and boxing fee are all published, and it's open seven days near the bridge path. The tubeless gap is said plainly.
- **Valencia Cyclery**: the walk-in, same-day repair shop, in the Mission, where many visitors sleep. It's about a mile from the Different Spokes start, and it boxes your bike for BikeFlights on the way out.
- **Mike's Bikes of Sausalito**: the Marin repair stop on the far side of the bridge, at the start of the Mill Valley path. It's open every day and takes walk-ins, which fits a Headlands or Tam day that goes wrong.
- **Splitrock Tap & Wheel**: the start of the Marin Cyclists' Saturday ride to Point Reyes Station. It's a shop open every day with MTB rentals near Tam and Tamarancho, plus a taproom for after. It's listed with the Chapter 11 note.

## Rejected

- **Cycle Sport San Francisco** (934 Mason St, the Presidio; roaringmousecycles.com now redirects to cyclesport.com): fetched. The SF store page lists sales and repair only. It opens at noon on weekdays, and its Saturday hours read "12:00 AM - 5:00 PM", which is a typo. The chain's rentals are in Santa Cruz. Sports Basement Presidio is nearby with longer hours and a rental fleet. Left out. The editor may want to note that Roaring Mouse is now Cycle Sport.
- **Above Category** (42½ Caledonia St, Sausalito, (415) 339-9250): fetched. A high-end custom and servicing studio that starts new clients with a consultation. It's open Tuesday to Friday 11 to 6 and Saturday 11 to 5. That doesn't fit a visitor with a broken bike; Mike's Sausalito does. Its route guides go to @route-scout (see hand-offs).
- **Sports Basement Berkeley** (2727 Milvia St, (510) 984-3907; weekdays 11 to 8, weekends 10 to 7): fetched. It has the same rental fleet as the Presidio store, a GURU fit and a full-service shop. It's left out of the six only to keep the list short; it's named as a pickup point in the Presidio and rent notes. Add it as a seventh if the editor wants an East Bay shop by BART.
- **Mike's Bikes of San Rafael** (836 4th St, (415) 454-3747): only seen on the chain's rentals page, which lists e-MTB, full-suspension and gravel demos at this store. Chain pricing runs $60, $80 or $100 a day by bike tier, and a two-day overnight is $100, $125 or $150 (Oct 2026). The store page wasn't fetched. It's a lead for a Marin gravel rental.
- **Livelo** (livelo.cc): fetched. It delivers Cannondale and Scott carbon road bikes to a hotel concierge the evening before, set up with your pedals. The page shows no price, address or phone. See Couldn't confirm.
- **Sausalito Bike Rentals, the AAA and SF Station rental listings**: search results for hybrid bikes to cross the bridge. Not fetched. These aren't rental shops for this guide.
- **Columbus Cyclery's comfort hybrids**: a hybrid rental, not a pick. The homepage says $8 an hour and $27 for 24 hours; the rental page says $10 an hour and $35 a day. The rental page is the one cited.
- **Yelp, Yellow Pages, SFGate, Wanderlog, Birdeye, Wheree, Apple Maps**: leads only, never a source.

## Couldn't confirm

- **Ship-to-shop beyond Columbus.** Sports Basement publishes a build fee for a boxed bike bought elsewhere ($155 new, $120 used). Valencia publishes a boxing fee ($120 minimum). Mike's NorCal price list has no box or build line. None says it accepts a carrier delivery addressed to the shop. Where to look: phone each shop. BikeFlights' Bike Shop Finder (bikeflights.com/bicycleshops) didn't load this session.
- **Livelo's prices, fleet sizes and contact.** Where to look: booking.livelo.cc/san-francisco.
- **High Trails' current fleet and prices.** The rental page's images date from May 2024 and the footer says 2020. The hours page loaded. Where to look: phone (415) 814-3216, or its Google listing.
- **Splitrock's rental prices and sizes, and whether it fits riders.** WebFetch's summary of the contact page mentioned fitting; the text read by curl didn't show it. Where to look: phone (415) 721-7644.
- **Pedals on Sports Basement rentals.** The product pages list a helmet, lock and flat kit, not pedals. Where to look: phone (415) 934-2900; bring your own to be safe.
- **Same-day repair at Mike's Sausalito and Columbus.** Mike's says walk-ins are welcome but gives no turnaround. Columbus says 24 to 48 hours.
- **Bike-case storage for the week.** Columbus stores bikes at $13 a day; no shop says it stores a case. Where to look: phone Sports Basement Presidio, which rents cases.
- **Parts for travelers** (Di2 chargers, hangers, sealant). No site lists them, so `parts` is tagged nowhere.
- **Fitting at Mike's Sausalito.** The chain's fit page doesn't name its studios. Where to look: mikesbikes.com/pages/fit-services and the booking tool.
- **Columbus Cyclery's free-storage window**: 5 days on the assembly and boxing pages, 7 on the repair page.
- **A Peninsula or Golden Gate Park shop.** Sports Basement Stonestown (by Lake Merced) and Redwood City are rental pickup points per the product pages, but their store pages weren't fetched. The Palo Alto rides hub covers the Peninsula.
- **Sports Basement Presidio's distance.** About 3 miles is an estimate; the address didn't geocode.

## Hand-offs

- @coffee-scout / @culture-scout: Splitrock Tap & Wheel's café and taproom (the café is open 11 am to 8:30 or 9 pm), at the start of the Marin Cyclists' ride.
- @community-scout: Sports Basement's events calendar lists ride groups at its stores (rides.json already has its Redwood City and Walnut Creek rides). Mike's Bikes says it runs weekly rides from several stores; none is named at Sausalito.
- @route-scout: Above Category publishes route guides, including "Pacific Dreams: The Sausalito/Olema Loop".
- Editor: roaringmousecycles.com now redirects to cyclesport.com. Any earlier note naming Roaring Mouse is out of date.

## Sources

- https://shop.sportsbasement.com/blogs/stores/san-francisco-presidio
- https://shop.sportsbasement.com/blogs/stores
- https://www.sportsbasement.com/blogs/stores/berkeley
- https://www.sportsbasement.com/pages/bike-rental-rates
- https://www.sportsbasement.com/collections/presidio-bike-rentals (rendered empty to the fetcher)
- https://shop.sportsbasement.com/products/sbrents-road-carbon-relaxed-geometry
- https://shop.sportsbasement.com/products/sbrents-topstone-carbon-105
- https://shop.sportsbasement.com/products/sbrents-cannondale-synapse-hi-mod-disc-dura-ace
- https://shop.sportsbasement.com/products/sbrents-mountain-bike-alloy-fs
- https://shop.sportsbasement.com/products/sbrents-rental-electric-bikes
- https://shop.sportsbasement.com/products/sbrents-bike-travel-case
- https://shop.sportsbasement.com/pages/services-bike
- https://www.hightrailscycles.com/
- https://www.hightrailscycles.com/rentals/rental-and-demo-bikes-pg204.htm
- https://www.hightrailscycles.com/contact/contact-pg141.htm
- https://www.hightrailscycles.com/articles/service-department-pg186.htm
- https://columbuscyclery.com/
- https://columbuscyclery.com/bike-assembly-tune-up/
- https://columbuscyclery.com/bike-boxing-shipping/
- https://columbuscyclery.com/bike-rental-san-francisco/
- https://columbuscyclery.com/bike-repair-san-francisco/
- https://columbuscyclery.com/contact/
- https://www.valenciacyclery.com/
- https://www.valenciacyclery.com/articles/bike-repair-pg184.htm
- https://www.valenciacyclery.com/articles/ship-your-bike-pg199.htm
- https://www.valenciacyclery.com/contact/location-pg202.htm
- https://mikesbikes.com/pages/sausalito
- https://mikesbikes.com/pages/bike-demos-rentals
- https://mikesbikes.com/pages/bike-services
- https://mikesbikes.com/pages/fit-services
- https://mikesbikes.com/pages/community-and-events
- https://www.splitrocktapandwheel.com/
- https://www.splitrocktapandwheel.com/contact/fairfax-bike-shop-cafe-pg141.htm
- https://www.splitrocktapandwheel.com/about/demos-rentals-pg231.htm
- https://www.splitrocktapandwheel.com/about/bike-service-pg229.htm
- https://whatnow.com/news/trending/northern-california-bike-shop-and-taproom-files-for-chapter-11/
- https://cyclesport.com/ (where roaringmousecycles.com redirects)
- https://cyclesport.com/pages/sfcs-store-location
- https://cyclesport.com/pages/bike-rental
- https://abovecategory.com/
- https://abovecategory.com/pages/contact
- https://abovecategory.com/pages/servicing-upgrades
- https://www.livelo.cc/pages/san-francisco-road-bike-hire
- https://faq.bikeflights.com/support/solutions/articles/13000072589-how-do-i-ship-with-a-bike-shop-
- https://nominatim.openstreetmap.org/ (geocodes of the shop addresses, for distances only)
- cfc-site/rides/rides.json: `san-francisco-ca-different-spokes-jersey-ride`, `fairfax-ca-marin-cyclists-fairfax-to-point-reyes-station`

Not fetched (WebFetch permission timed out, not retried): https://www.bikeflights.com/bicycleshops
