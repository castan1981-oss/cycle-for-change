# ojai-ca — shops

town: `ojai-ca` · agent: **shop-scout** · date: **2026-11-15** (first report)

Four shop records: one in Ojai, three in Ventura. Every record was fetched on
the business's own site on Nov 15, 2026. Prices are as read that day.

The short version:

- **Ojai has one bike shop I could confirm: The Mob Shop**, downtown at
  110 W Ojai Ave. Repairs, suspension service, and a rental fleet a rider
  would choose (ENVE Melee road, ENVE MOG and Salsa Flyway gravel, Moots
  Vamoots 33, Pivot mountain bikes). Closed Tuesday and Wednesday.
- **Bicycles of Ojai did not confirm.** Its own domain is a parked page.
  It is in "Couldn't confirm", not in the findings.
- **Nobody in the valley or in Ventura says on its own site that it receives
  and builds a shipped bike.** The ship list is empty. Trek Bicycle Ventura
  boxes a bike to send home ($79.99); that is outbound only.
- **Nobody states same-day repair in Ojai.** The Mob Shop's workshop page
  lists tune-ups and prices but no turnaround. The nearest stated turnaround
  is Trek Bicycle Ventura ("24-hour turnaround on most service jobs").
- **One thing the Center Ride Out reader needs to know:** The Mob Shop's
  rental pages say its performance bikes "may not be rented for mass start
  events or races", must be booked ahead (no walk-ins), and may not be
  transported without permission. So a Mob Shop rental is for a Saturday
  spin from town or for the people who drove up. It is not a bike for the
  event itself.

Distances: The Mob Shop is on Ojai Avenue downtown; I did not geocode it, so
the note says "downtown" and gives no figure. The Ventura figures are
straight-line estimates from the brief's centre (34.4492, -119.2467) to
approximate street positions; the verifier should recompute them. The brief
already puts the Ventura Bike HUB at 12 miles.

Downtown point: no city or geocoder page was fetched for one. The centre in
the brief stands.

## Findings

```json
[
  {
    "name": "The Mob Shop",
    "url": "https://www.themobshop.com/",
    "address": "110 W Ojai Ave, Ojai, CA 93023",
    "phone": "(805) 272-8102",
    "services": ["repair", "suspension", "builds", "rental", "rental-road", "rental-gravel", "rental-mtb", "rental-ebike"],
    "note": "Downtown Ojai, on Ojai Avenue. The one shop in town with a workshop and a rental fleet worth riding. Monday, Thursday and Friday 10 to 5, Saturday 9 to 5, Sunday 9 to 4; closed Tuesday and Wednesday. Tune-ups from $99 (Basic) to $189 (Premium-Plus), wash and lube $39, 50-hour fork or shock service $95 plus parts, and wheelbuilding (Nov 2026); the page gives no turnaround time, so call before you count on a same-day fix. Rentals are book-ahead only, no walk-ins: ENVE Melee road bike in 54, 56 and 58, ENVE MOG and Salsa Flyway gravel bikes, a Moots Vamoots 33 and Pivot mountain bikes, each listed \"from $125\" (Nov 2026; the page doesn't say per what), with a security deposit at pick-up and helmets included. The rental pages say these bikes can't be rented for mass-start events or races."
  },
  {
    "name": "Ventura Bike Depot",
    "url": "https://www.venturabikedepot.com/",
    "address": "239 W. Main Street, Ventura, CA 93001",
    "phone": "(805) 652-1114",
    "services": ["repair", "rental", "rental-road", "rental-mtb", "rental-ebike"],
    "note": "Downtown Ventura, about 12 miles south of Ojai. The reason to make the trip: it's open every day, 9 to 5, so it covers the Tuesday and Wednesday when the Ojai shop is closed. Safety check $49, basic tune-up $89, standard tune-up $149, deluxe $299, parts extra (Nov 2026); e-bike work is mechanical only. Rents \"premium road bikes\" and hardtail mountain bikes by the block, from four hours to four days, plus Gazelle e-bikes; the page doesn't name the road bike models or sizes, so ask. Helmet free with a rental. A local shop since 1995, by its own About page."
  },
  {
    "name": "Trek Bicycle Ventura",
    "url": "https://www.trekbikes.com/us/en_US/retail/ventura/",
    "address": "4060 E Main Street, Ventura, CA 93003",
    "phone": "(805) 416-8735",
    "services": ["repair", "shop-rides"],
    "note": "East Ventura, about 13 miles south of Ojai. The nearest shop that puts a turnaround in writing: service on any brand, no appointment needed, with \"24-hour turnaround on most service jobs\" and a free bike check. Level One $99.99, Level Two $189.99, Level Three from $449.99; boxes a bike to ship home for $79.99 (Nov 2026). Monday to Friday 11 to 6, Saturday 10 to 6, Sunday noon to 5. The page lists group rides and clinics but no schedule, and says nothing about receiving a shipped bike."
  },
  {
    "name": "Ventura Bike HUB (Bike Ventura County)",
    "url": "https://bikeventura.org/the-bike-hubs/",
    "address": "490 N. Ventura Avenue, Ventura, CA 93001",
    "phone": "(805) 641-2665",
    "services": ["diy", "parts", "shop-rides"],
    "note": "Ventura's community bike shop, about 12 miles south of Ojai. Fix it yourself: stand time is $10 an hour with tools and a mechanic or volunteer to help (Nov 2026). Sells used bikes and the parts a traveler runs out of: tires, tubes, cables and housing, pedals, derailleurs. Wednesday and Thursday noon to 5, Friday 11 to 5, Saturday 10 to 5; closed Sunday to Tuesday. Bike Ventura County runs its community rides from here."
  }
]
```

Ship and rent lists, shaped like `bring_your_bike.ship.shops` and
`bring_your_bike.rent.shops`:

```json
{
  "ship": {
    "note": "No shop in the Ojai Valley or Ventura says on its own site that it receives and builds a shipped bike (checked Nov 15, 2026). Call The Mob Shop before you ship anything to it. Trek Bicycle Ventura boxes a bike for the trip home for $79.99 (Nov 2026); that covers leaving, not arriving.",
    "shops": []
  },
  "rent": {
    "note": "One rental shop in Ojai, and it's a good one. Book ahead; it takes no walk-ins, and its performance bikes can't be used in a mass-start event.",
    "shops": [
      {
        "name": "The Mob Shop",
        "url": "https://www.themobshop.com/articles/rental-bikes-pg202.htm",
        "note": "Downtown Ojai. ENVE Melee road bike (54 fits 5'8\" to 5'11\", 56 fits 5'10\" to 6'1\", 58 fits 6'0\" to 6'3\"); ENVE MOG gravel (54); Salsa Flyway carbon gravel (Small 5'2\" to 5'6\", Large 5'11\" to 6'3\"); Moots Vamoots 33; Pivot mountain bikes. Each \"from $125\" (Nov 2026; the page doesn't state the period). E-bikes from $99, town bikes from $39. Book in advance, security deposit at pick-up, helmets provided. Full refund more than 24 hours out, half inside 24. Not for mass-start events or races; no transporting the bike without the shop's permission. Closed Tuesday and Wednesday."
      },
      {
        "name": "Ventura Bike Depot",
        "url": "https://www.venturabikedepot.com/rental-rates",
        "note": "Downtown Ventura, about 12 miles south. \"Premium road bikes\" and hardtail mountain bikes with hydraulic discs and a dropper post, rented from four hours to four days; rates on the page run from $65 to $245 (Nov 2026). Models and sizes aren't listed, so call. Open daily 9 to 5."
      }
    ]
  }
}
```

## Why these

- **The Mob Shop** — the only confirmed shop in Ojai, downtown, with a real workshop and a rental fleet of bikes a rider would pick over their own. Open Saturday at 9, which is the day Center Ride Out riders are free.
- **Ventura Bike Depot** — open seven days from 9. It's the fallback on the two days Ojai's shop is shut, and it rents road bikes with no event restriction stated.
- **Trek Bicycle Ventura** — the nearest shop that states a turnaround (24 hours on most jobs, any brand, no appointment), and it boxes a bike for the trip home.
- **Ventura Bike HUB** — $10 an hour for a stand and tools if you'd rather fix it yourself, cheap used parts, and it's where the BikeVC rides already in the directory start.

## Rejected

- **Ojai Electric Bikes** (lead from a California Green Business listing in search results) — `ojaielectricbikes.com` returns an empty directory index, last touched 2026-04-11. No business page to read. E-bike only in any case; not a shop for this guide.
- **Open Air Bicycles, Ventura** — `openairbicycles.com` returns "This site is currently shut down." Nothing to verify.
- **The Mob Shop as a ship-to-shop pick** — the site has no line about receiving a shipped bike. Not listed for it.
- **The Mob Shop as `same-day`** — no turnaround on the workshop page. Not tagged.
- **The Mob Shop as `shop-rides`** — the events page still shows the cancelled 2023 Gravel Mob, and the home-page banner for a "Black Friday E-Bike Group Ride" is dated "Friday, Nov 28", which was a Friday in 2025, not 2026. No current weekly ride on the site. Not tagged.
- **The Mob Shop as `parts`** — it sells bikes and gear online and in store, but the site doesn't say what spares it stocks. Not tagged; call for a hanger or a Di2 charger.
- **Trek Bicycle Ventura as a rental shop** — the store page has a "Rent bikes" link label but no rental fleet, price or size on the page I read. Not listed for rentals.
- **Ventura Bike Depot as `same-day`** — the service page says its mechanics "work quickly". That isn't a turnaround. Not tagged.
- **Fit studios** — none found in the valley on a page I fetched. None of the four shops' sites mention fitting. `fitting` is on nobody.
- **Box rental or storage** — no shop states it.

## Couldn't confirm

- **Bicycles of Ojai, 108 Canada St, Ojai.** Its domain (`bicyclesofojai.com`) now lands on a GoDaddy parking page. A MapQuest/Yelp listing still shows it with hours (Tuesday to Friday 9:30 to 5:30, Saturday 9:30 to 5, closed Sunday and Monday) and says it does repairs and rentals, but the newest review shown there is two years old. By the scout rules that's a dead site and a stale listing: not a pick. If it's open it would be the shop that covers Wednesday in Ojai. The editor or the verifier should phone it, or look for a current Google listing; I have no phone number from a page of its own.
- **The Mob Shop — how fresh the site is.** Footer copyright reads 2022; the blog stops in April 2021; the home banner is from November 2025. Against that: the rental storefront footer reads 2026, the fleet pages carry current models (Specialized Levo 4, Turbo Vado 3 EVO), and a MapQuest/Yelp listing shows the same hours and a review dated "1 week ago". I'm calling it open. The hours match in two places, but a phone call before April would settle them.
- **The Mob Shop — rental price period.** The rental storefront shows "from $125" for the road, gravel and mountain bikes without saying per day or per block. The day rate needs a date entered in the booking widget, or a call.
- **The Mob Shop — same-day repair, ship-to-shop, bike boxing, group size.** The site says nothing on any of them. All null. With one shop in town and a few hundred riders in camp, the Saturday of Center Ride Out is the day to ask about; the shop's own advice on its tune-up page is to book a Premium Tune "before a BIG event".
- **Ventura Bike Depot — road rental rates by block.** The rate table came through with labels and prices out of order. Lowest figure $65 and highest $245 are as printed; I paired them to four hours and four days by size, which is an inference. Models, sizes and pedals aren't on the page.
- **Trek Bicycle Ventura — group ride schedule.** Listed as a thing the store does; no day or time on the page.
- **A downtown point for distances.** Not fetched. Ventura distances above are estimates.

## Hand-offs

- **@community-scout:** no weekly shop ride starts in Ojai on any page I read. The Mob Shop's only ride notice is the stale Black Friday banner above. Its routes page (`/articles/routes-pg209.htm`) is a lead for **@route-scout**: East End Loop, Bike Path to the Beach (33.1 miles), Bike Path to Foster Park (17.3), Sulphur Mountain Loop (31), Hwy 33 to Rose Valley (31.1 / 42.4 / 65.1), Casitas Pass Loop (48.5), Gridley-Pratt, Rice-Wills. Mileage and climbing are as printed there; each links onward to a route page I didn't open.
- **@town-editor:** the Ventura Bike HUB record could carry `ride_slug` for the BikeVC rides the brief places there (`ventura-ca-bikevc-brew-ride`, `ventura-ca-bikevc-sunday-morning-coffee-ride`, `ventura-ca-easy-rider-community-ride`). I didn't add it; check each ride's start in `rides.json` first.
- **@logistics-scout:** the ship list is empty and should stay empty unless a shop confirms by phone. The Mob Shop's rental terms (no mass-start events, no transport without permission) belong in the `rent.note`.
- **@coffee-scout:** none of these shops has a café.

## Sources

- https://www.themobshop.com/
- https://www.themobshop.com/about/contact-pg141.htm
- https://www.themobshop.com/articles/about-pg181.htm
- https://www.themobshop.com/articles/workshop-pg198.htm
- https://www.themobshop.com/articles/rental-bikes-pg202.htm
- https://www.themobshop.com/articles/road-bikes-pg237.htm
- https://www.themobshop.com/articles/all-road-bikes-pg242.htm
- https://www.themobshop.com/articles/mountain-bikes-pg244.htm
- https://www.themobshop.com/articles/electric-bikes-pg243.htm
- https://www.themobshop.com/articles/store-policies-pg59.htm
- https://www.themobshop.com/articles/events-pg208.htm
- https://www.themobshop.com/articles/routes-pg209.htm
- https://www.themobshop.com/articles/blog-pg204.htm
- https://www.themobshop.com/articles/careers-pg207.htm
- https://the-mob-shop.booqableshop.com/ (the shop's rental storefront: fleet list)
- https://the-mob-shop.booqableshop.com/products/enve-melee
- https://the-mob-shop.booqableshop.com/products/enve-mog-54360d1b-f018-4a2f-9913-86074c2bfbb4
- https://the-mob-shop.booqableshop.com/products/salsa-flyway
- https://the-mob-shop.booqableshop.com/products/moots-vamoots-33
- https://startpage.mapquest.com/us/california/the-mob-shop-283848501 (open signal only: hours and a recent review)
- https://www.venturabikedepot.com/
- https://www.venturabikedepot.com/rental-rates
- https://www.venturabikedepot.com/service
- https://www.venturabikedepot.com/about
- https://www.trekbikes.com/us/en_US/retail/ventura/
- https://bikeventura.org/the-bike-hubs/
- https://bikeventura.org/bike-service/
- https://www.bicyclesofojai.com/ (parked domain; nothing to read)
- https://startpage.mapquest.com/us/california/bicycles-of-ojai-11552638 (stale listing; not a source of record)
- https://ojaielectricbikes.com/ (empty directory index)
- https://www.openairbicycles.com/ ("site is currently shut down")
