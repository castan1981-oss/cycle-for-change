# guerneville-ca — bike shops

@shop-scout · 2026-11-16 · first build (no earlier report, no `data/towns/guerneville-ca.json`)

**The first question, answered: I found no bike shop in Guerneville.** Not on the
county tourism office's bike list (12 of its 16 listings read; none in Guerneville,
Monte Rio, Rio Nido, Duncans Mills or Occidental), not in the Russian River
Chamber's business directory (no listing with bike, bicycle or cycle in it), and
not in two searches. That is "none found", not "none exists": four county listings
on page 2 were not readable. The nearest shop is in Forestville, upriver.

Distances below are straight-line from the brief's centre (38.5064, -122.9908) to
my own approximate point for each street address. I had no geocoder. **The editor
should geocode the four addresses before a mile figure goes on a page.** Road miles
will be longer.

## 1. Findings

```json
[
  {
    "name": "Russian River Cycle Service",
    "url": "https://russianrivercycles.com/",
    "address": "6559 Front St., Forestville, CA 95436",
    "phone": "(707) 887-2453",
    "services": ["repair", "same-day", "parts", "rental", "rental-road"],
    "note": "The nearest shop to Guerneville, about 6 miles upriver in Forestville, at the trailhead of the West County Regional Trail. A one-person repair shop: small jobs often while you wait, simpler ones usually by the end of the day, never over a week. Open Wednesday to Friday 11 to 6 and Saturday 9 to 5; closed Sunday to Tuesday, with rental appointments seven days a week. Road bikes $75 a day, hybrids $45 (Nov 2026)."
  },
  {
    "name": "Revel Cycles",
    "url": "https://www.revelcycles.com/",
    "address": "6770 McKinley Street, Suite 120, Sebastopol, CA 95472",
    "phone": "(707) 867-2145",
    "services": ["repair", "fitting", "suspension", "builds", "rental", "rental-ebike"],
    "note": "In The Barlow in Sebastopol, about 12 miles from Guerneville, open every day 11 to 6. Publishes its prices: tune-up $150, flat repair $20, basic fit $95, packing a bike for travel or shipping $125, building a bike from the box $200 (Nov 2026). Rentals are e-bikes ($75 for 3 hours, $95 a day) and cruisers ($50 a day), so they suit the people who drove up, not the ride."
  },
  {
    "name": "Trek Bicycle Santa Rosa",
    "url": "https://www.trekbikes.com/us/en_US/retail/santa_rosa_downtown/",
    "address": "512 Mendocino Ave, Santa Rosa, CA 95401",
    "phone": "(707) 546-8735",
    "services": ["repair", "shop-rides"],
    "note": "Downtown Santa Rosa, about 15 miles from Guerneville. Says it turns most service around in 24 hours on any brand, no appointment needed. Boxes a bike for travel for $79.99 (Nov 2026). Closed Mondays; Tuesday to Friday 11 to 6, Saturday 10 to 6, Sunday 12 to 5. No rentals listed."
  },
  {
    "name": "Sports Basement Santa Rosa",
    "url": "https://www.sportsbasement.com/collections/santa-rosa-bike-rentals",
    "address": "1970 Santa Rosa Avenue, Santa Rosa, CA 95407",
    "phone": "(707) 921-3147",
    "services": ["repair", "fitting", "builds", "rental", "rental-road", "rental-mtb", "rental-ebike"],
    "ride_slug": "santa-rosa-ca-sports-basement-last-sunday-ride",
    "note": "The widest rental range near the river, about 16 miles from Guerneville: carbon road bikes $100 a day or $175 for 2 to 4 nights, aluminum road $75 a day, deposit required (chain rates, Nov 2026). Open Monday to Friday 10 to 7, Saturday and Sunday 9 to 6. The chain's service page says many small jobs are done on the spot, builds a bike from its box for $155 and boxes one for shipping for $110 (Nov 2026)."
  }
]
```

For `bring_your_bike`:

```json
{
  "ship": {
    "note": "No shop within reach of Guerneville says on its own site that it receives a shipped bike. Three will build one you bring in a box or pack yours to go home, for a published fee. Call before you ship anything to a shop.",
    "shops": []
  },
  "rent": {
    "note": "Nothing to rent in Guerneville itself that we could find. The nearest road bikes are in Forestville; the widest choice is in Santa Rosa. Cycle to Zero does not allow e-bikes.",
    "shops": [
      {
        "name": "Russian River Cycle Service",
        "url": "https://russianrivercycles.com/rentals",
        "note": "Forestville, about 6 miles. Road bike $75 a day with a helmet and repair kit; hybrid $45 a day with helmet, basket, lock and pump (Nov 2026). The page gives no brand, frame, groupset or sizes: tell them your pedals and ask what the bike is. Rental appointments seven days a week; delivery offered."
      },
      {
        "name": "Sports Basement Santa Rosa",
        "url": "https://www.sportsbasement.com/collections/santa-rosa-bike-rentals",
        "note": "Santa Rosa, about 16 miles. Chain rates (Nov 2026): carbon road $100 a day, $175 for 2 to 4 nights, $300 for 5 to 9; aluminum road $75 a day; full-suspension carbon mountain bike $135 a day; e-bike $75 a day. Deposit required. Reserve online ahead; same-day in store with a smaller choice."
      },
      {
        "name": "Revel Cycles",
        "url": "https://www.revelcycles.com/rentals.html",
        "note": "Sebastopol, about 12 miles. E-bikes $75 for 3 hours or $95 a day; cruisers $50 a day (Nov 2026). Free cancellation up to 24 hours ahead. No road, gravel or mountain bikes."
      }
    ]
  }
}
```

Shop builds and boxing that are NOT ship-to-shop (none says it receives a carrier
delivery), for @logistics-scout:

| shop | build from a box | box for travel | read |
|---|---|---|---|
| Revel Cycles | $200 ("Bought a bike online? Swing by and we'll get it built and ready to ride.") | $125 | 2026-11-16 |
| Sports Basement (chain page) | $155 new from box, $120 used from box, $330 pro build | $110 | 2026-11-16 |
| Trek Bicycle Santa Rosa | not stated | $79.99 ("We can box your bike up and help send it where you need it to go.") | 2026-11-16 |

## 2. Why these

- **Russian River Cycle Service** — the closest wrench to camp, open at 9 on a Saturday, and the only road-bike rental on the river side of Santa Rosa.
- **Revel Cycles** — open seven days including Sunday and Monday, when Forestville is shut; prices on the page; the only one of the four that lists a fit and suspension service.
- **Trek Bicycle Santa Rosa** — a stated 24-hour turnaround with no appointment, and the cheapest published boxing fee, for a rider flying home.
- **Sports Basement Santa Rosa** — carbon road bikes by the day or the weekend, the longest hours, and it hosts the one directory ride within 30 miles.

## 3. Rejected

- **A bike shop in Guerneville** — none found (see the top of this file).
- **King's Sporting Goods & Kayak Rentals** (16258 Main St., Guerneville) — the county listing says kayaks and fishing gear. No bikes, parts or tubes mentioned. Not a bike shop.
- **Getaway Adventures / Wine Country Bikes, Jenner** — on the county list; its page would not load here. Tours first by its name. Not listed.
- **Adventures in Cycling (Healdsburg), Ace It Bike Tours (Windsor, Bodega Bay), Comova Cycling (Cazadero), eVenture Sonoma and Sonoma On A Bike (Santa Rosa)** — county-list names that read as tour outfits. Not fetched; not shops for this section. Comova in Cazadero is a lead for @route-scout or @community-scout, nothing more.
- **Healdsburg shops** — the brief says Healdsburg is a different town. I spent no searches there; four shops closer in cover the needs.

## 4. Couldn't confirm

- **Sebastopol Bike Center** — on the county list with a description ("novice cyclist, club rider or racer") but no address, phone, hours or services on that page, and its own site never came up to fetch. Not listed. Editor: find the shop's own site or Google listing; a third-party page says "now open Sundays" (unread).
- **Russian River Cycle Service's street address** — its home, services, rentals and about pages give no address (as read), and its contact page blocks automated readers. The address above is from the county tourism office's listing; the phone matches the shop's own page. Confirm the address on the Google listing or by phone.
- **Russian River Cycle Service's holiday notice** — the home page says "closed 11/23 thru 11/30" with no year. Read as this Thanksgiving week; re-read the hours before May.
- **Russian River Cycle Service's road bikes** — no brand, frame material, groupset or sizes published. Whether they are bikes a visitor would choose over their own is a phone call.
- **Ship-to-shop, anywhere** — no fetched page says a shop receives a BikeFlights, ShipBikes or carrier delivery. `ship.shops` is empty on purpose.
- **Sports Basement Santa Rosa specifics** — the rental rates, service prices and "small jobs on the spot" line are from chain-wide pages, not a Santa Rosa-only page. The Santa Rosa page names e-bikes, mountain bikes, road bikes, race bikes, commuters and hybrids; it does not name gravel in that sentence, so `rental-gravel` is left off (the chain rate sheet lists carbon gravel at $100 a day). Which models and sizes sit in Santa Rosa: not published. Deposit amount: not published. Its store page (`/blogs/stores/santa-rosa`) would not load; hours and phone are from the store block on its Santa Rosa rentals page. Visit Santa Rosa's listing gives a different phone, (707) 921-3151.
- **Sports Basement's ride** — `ride_slug` is from the brief and the directory. I did not re-read the ride on the shop's site, so `shop-rides` is not in its services.
- **Trek Santa Rosa** — no fit service and no rentals on the store page as read. Loaner bikes during longer repairs are mentioned; not a rental.
- **Revel Cycles** — no turnaround or same-day line on its service page ("Bring it by" for a free look). A Sebastopol Times piece (Aug 15, 2025) says it reopened in The Barlow in March 2025 and quotes the owner on parts and accessories; the shop's own pages I read don't list parts, so `parts` is left off.
- **Box storage or box rental** — no shop states either.
- **Mileages** — approximate, straight-line, from ungeocoded addresses (see the top).

Hand-offs: none for @coffee-scout (no shop café found). @community-scout: Trek Bicycle Santa Rosa's store page lists "Group rides and clinics" with no day or time as read — a lead, URL in Sources. Nothing for @bike-expert.

## 5. Sources

All fetched 2026-11-16.

- https://russianrivercycles.com/
- https://russianrivercycles.com/services
- https://russianrivercycles.com/rentals
- https://russianrivercycles.com/about-1
- https://www.sonomacounty.com/profiles/russian-river-cycle-service
- https://www.wineroad.com/blogs/recreation/russian-river-cycles/ (2017, modified 2019; background only)
- https://www.revelcycles.com/services.html
- https://www.revelcycles.com/rentals.html
- https://www.revelcycles.com/location.html
- https://thebarlow.net/pages/revel-cycles
- https://www.sonomacounty.com/profiles/revel-cycles
- https://www.sebastopoltimes.com/p/the-return-of-revel-cycles
- https://www.trekbikes.com/us/en_US/retail/santa_rosa_downtown/
- https://www.sportsbasement.com/collections/santa-rosa-bike-rentals
- https://www.sportsbasement.com/pages/bike-rental-rates
- https://www.sportsbasement.com/pages/services-bike
- https://www.visitsantarosa.com/directory/sports-basement-shopping-and-specialty-retail/
- https://www.sonomacounty.com/profiles/sebastopol-bike-center/
- https://sonomacounty.com/sonoma-listings/bike-rentals-tours
- https://sonomacounty.com/activities/bike-rentals-tours/?page=0
- https://russianriver.com/businesses
- https://www.sonomacounty.com/outdoor-activities/kings-sporting-goods-kayak-rentals/

Did not load (no facts taken): https://www.russianrivercycles.com/contact-us.html (blocks automated readers) · https://www.sportsbasement.com/blogs/stores/santa-rosa · https://www.sonomacounty.com/outdoor-activities/sebastopol-bike-center/ · https://www.sonomacounty.com/outdoor-activities/getaway-adventureswine-country-bikes-jenner/
