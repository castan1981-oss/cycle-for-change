# palm-springs-ca — shops

town: `palm-springs-ca` · agent: **shop-scout** · date: **2026-10-03**

Six shop records: one in Palm Springs, three in Palm Desert, one in La
Quinta, one mobile mechanic who covers the valley. None in Cathedral City.
Every record was fetched on the business's own site this run. Prices are as
read on Oct 3, 2026.

The gap: **Palm Springs has no confirmed repair shop.** Big Wheel's downtown
store rents and sells; its site never mentions repairs. Trek Bicycle Palm
Springs (611 S Palm Canyon Dr) is the obvious downtown service shop on the
local list, but its own page could not be fetched. See Couldn't confirm. That
is the first thing the editor should close.

Search ran out early. WebSearch refused after the third call of this run (the
session's shared cap was spent), so every lead after that came from pages
that loaded. Many permission requests timed out; those pages are listed under
Couldn't confirm and were not fetched any other way.

Distances: Big Wheel Palm Springs is measured from its `rides.json`
coordinates (33.8033, -116.5455). The rest are straight-line estimates from
approximate coordinates, not fetched lat/lon; the verifier should recompute
them. The centre (33.8303, -116.5453) was not checked against a geocoder
page; none loaded.

## Findings

```json
[
  {
    "name": "Big Wheel Bikes CV, Palm Springs",
    "url": "https://bigwheelbikescv.com/locations/",
    "address": "1590 South Palm Canyon Drive, Palm Springs, CA 92264",
    "phone": "(760) 548-0500 ext. 1",
    "services": ["rental", "rental-road", "rental-mtb", "rental-ebike", "shop-rides"],
    "note": "Downtown, on South Palm Canyon about 2 miles south of the Tour de Palm Springs start. The carbon road rental is a KHS Flite 720 with Di2 and hydraulic discs: $105 a day, $250 for four days, $350 a week; KHS Flite Team road bikes and full-suspension KHS mountain bikes are $80 a day, $195 for four days, $295 a week (Oct 2026). Helmet, lock and repair kit included; $50 delivery to a resort; two-day minimum on Tour weekend; changes inside 24 hours cost 25 percent. The store was closed for summer until Aug 31 and its winter hours are not posted, so call. The site does not mention repairs. Guided rides November to April: {ride:palm-springs-ca-big-wheel-bikes-community-group-rides|Big Wheel's community group rides}."
  },
  {
    "name": "Big Wheel Bikes CV, Palm Desert",
    "url": "https://bigwheelbikescv.com/locations/",
    "address": "74200 Highway 111, Palm Desert, CA 92260",
    "phone": "(760) 779-1837 ext. 2",
    "services": ["rental", "rental-road", "rental-mtb", "rental-ebike"],
    "note": "Palm Desert, on Highway 111 about 12 miles southeast of downtown Palm Springs; the flagship, and the store on the Highway 74 side of the valley. Road rentals are Ritte Esprits: SRAM Rival with aluminum wheels $105 a day, $250 for a half week, $350 a week; SRAM Force with deep carbon wheels $125, $295 and $395; full-suspension mountain bikes and e-bikes $125 a day (Oct 2026). Clip-in or flat pedals, helmet, lock and repair kit; $50 delivery. Summer hours were Wednesday to Saturday 10 to 5; winter hours are not posted. The site does not mention repairs."
  },
  {
    "name": "Tri-A-Bike",
    "url": "https://www.triabike.com/",
    "address": "44841 San Pablo Ave, Palm Desert, CA 92260",
    "phone": "(760) 340-2840",
    "services": ["repair", "rental", "rental-road", "rental-mtb", "rental-ebike", "shop-rides"],
    "note": "Palm Desert, about 12 miles southeast of downtown Palm Springs; open since 1987, and one of the two rental shops the Tour de Palm Springs FAQ names. Rents Cannondale or Giant road bikes: aluminum with 105 $75 a day, $200 a week; full carbon with Ultegra $100 a day, $300 a week; carbon with Di2 $124 a day, $350 a week; full-suspension mountain bikes $80 a day, $250 a week (Oct 2026). Helmet, lock and a seat-bag kit with tube and CO2; delivery $50 one way to Palm Springs, La Quinta or Indio, $35 to Cathedral City or Rancho Mirage; two-day minimum on Tour weekend. Repairs, appointments recommended in winter. Tuesday to Saturday 10 to 4, closed Sunday and Monday; the site says winter hours resume Oct 19 but does not post them. A weekly shop ride leaves the door from October 2026."
  },
  {
    "name": "Palm Desert Bike N Brews",
    "url": "https://www.pdbikesnbrew.com/",
    "address": "73865 CA-111, Palm Desert, CA 92260",
    "phone": "(760) 340-3861",
    "services": ["repair", "parts", "rental", "rental-road", "rental-mtb", "rental-ebike", "coffee"],
    "note": "Palm Desert, on Highway 111 about 12 miles southeast of downtown Palm Springs. Road rentals: carbon $140 a day, $300 for three days, $400 a week; aluminum $100, $190 and $300; carbon full-suspension mountain bikes $125 a day (Oct 2026). No makes, models or sizes listed, so call with your height. Helmet and lock included; reserve ahead, walk-ins taken; pickup and drop-off in Palm Springs is $100 for up to five bikes. Tuesday to Saturday 9 to 5, closed Sunday and Monday. Service and repair are listed but turnaround and prices are not; the shop's own line is \"sales, rentals, e-bikes, shuttles, coffee, beer, components.\""
  },
  {
    "name": "Village Peddler",
    "url": "https://villagepeddlerlq.com/",
    "address": "50855 Washington St. #2D, La Quinta, CA 92253",
    "phone": "(760) 777-7433",
    "services": ["repair"],
    "note": "La Quinta, in the La Quinta Village across from City Hall, about 17 miles southeast of downtown Palm Springs. Tune-ups, flat repair, wheel truing and adjustments, by appointment only. Open 9 to 4, closed Sunday and Wednesday; summer hours vary. Its rentals are hybrids and cruisers ($40 a day, Oct 2026), not road bikes. The repair page lists \"bike shipping\" with no detail; ask before you count on it."
  },
  {
    "name": "ACME Bike Company",
    "url": "https://acmebikecompany.com/",
    "address": null,
    "phone": "(760) 895-2727",
    "services": ["repair"],
    "note": "Mobile repair, no storefront. Comes to homes, vacation rentals, RV parks and workplaces in Palm Springs, Rancho Mirage, Palm Desert, Indian Wells, La Quinta and Indio, and says it never charges a service-call fee. Tune-ups, flats, e-bike repair and major repairs; book online or by phone. Prices and hours are not on the home page."
  }
]
```

### ship_and_rent

```json
{
  "ship": {
    "note": "No Coachella Valley shop says on its own site that it receives a shipped bike and builds it (checked Oct 2026). Village Peddler in La Quinta lists \"bike shipping\" with its repairs and does not say which way; call before you ship anything. With three shops renting carbon road bikes, renting is the simpler plan here.",
    "shops": []
  },
  "rent": {
    "note": "Three shops, four stores, rent carbon road bikes: $100 to $140 a day, $300 to $400 a week (Oct 2026), two of them with Di2. All four also rent full-suspension mountain bikes. Big Wheel on South Palm Canyon is the only fleet in Palm Springs; the rest sit in Palm Desert, about 12 miles down the valley, and deliver to Palm Springs for $50 (Big Wheel, Tri-A-Bike) or $100 (Bike N Brews). None lists frame sizes; call with your height. Big Wheel and Tri-A-Bike set a two-day minimum on Tour de Palm Springs weekend. No gravel rental was found.",
    "shops": [
      {
        "name": "Big Wheel Bikes CV, Palm Springs",
        "url": "https://bwbtours.com/palm-springs-bike-rentals/",
        "note": "KHS Flite 720, carbon road, Di2, hydraulic discs: $105 a day, $250 for four days, $350 a week. KHS Flite Team road and KHS full-suspension mountain bikes: $80 a day, $195 for four days, $295 a week (Oct 2026). Helmet, lock and repair kit; $50 delivery; two-day minimum on Tour weekend. Sizes not listed for the road bikes. 1590 South Palm Canyon Drive; (760) 548-0500 ext. 1."
      },
      {
        "name": "Big Wheel Bikes CV, Palm Desert",
        "url": "https://bwbtours.com/palm-desert-bike-rentals/",
        "note": "Ritte Esprit road bikes: SRAM Rival with aluminum wheels $105 a day, $250 for a half week, $350 a week; SRAM Force with deep carbon wheels $125, $295, $395 (Oct 2026). Clip-in or flat pedals; helmet, lock and repair kit; $50 delivery. Sizes not listed. 74200 Highway 111, Palm Desert; (760) 779-1837 ext. 2."
      },
      {
        "name": "Tri-A-Bike",
        "url": "https://www.triabike.com/articles/bike-rentals-pg183.htm",
        "note": "Cannondale or Giant road bikes: aluminum with 105 $75 a day, $200 a week; full carbon with Ultegra $100 a day, $300 a week; carbon with Di2 $124 a day, $350 a week. Full-suspension mountain bikes (Giant Stance 2 or Cannondale Habit) $80 a day, $250 a week (Oct 2026). Helmet, lock, seat-bag kit; $50 one-way delivery to Palm Springs; two-day minimum on Tour weekend. Sizes not listed. 44841 San Pablo Ave, Palm Desert; (760) 340-2840. Closed Sunday and Monday."
      },
      {
        "name": "Palm Desert Bike N Brews",
        "url": "https://www.pdbikesnbrew.com/articles/bike-rentals-pg233.htm",
        "note": "Road bikes: carbon $140 a day, $300 for three days, $400 a week; aluminum $100, $190, $300. Carbon full-suspension mountain bikes $125 a day (Oct 2026). No makes or sizes listed. Helmet and lock; reserve ahead; $100 pickup and drop-off in Palm Springs, up to five bikes. 73865 CA-111, Palm Desert; (760) 340-3861. Closed Sunday and Monday."
      }
    ]
  }
}
```

## Why these

- **Big Wheel Bikes CV, Palm Springs** — the only rental fleet in Palm Springs, two miles down South Palm Canyon from the Tour start, with a carbon Di2 road bike. The pick for a rider who flies in and doesn't want to build a bike.
- **Big Wheel Bikes CV, Palm Desert** — the same business's flagship on the Palm Desert side, with a SRAM Force bike on deep carbon wheels and clip-in pedals on request; closer to the Highway 74 climb.
- **Tri-A-Bike** — open since 1987, the valley's longest-running shop by its own account, and the one that both rents and repairs on its own site. Cheapest carbon rental found ($100 a day), a Di2 option, delivery to Palm Springs for $50, and a new weekly shop ride. Named in the Tour's FAQ.
- **Palm Desert Bike N Brews** — repair, parts and a carbon road rental under one roof, with coffee and beer in the shop. The most expensive carbon rental, and the one with a three-day price.
- **Village Peddler** — the La Quinta repair stop, by appointment, for a rider staying at the east end of the valley. Listed for repair only; its rentals are hybrids.
- **ACME Bike Company** — a mobile mechanic who comes to a vacation rental or RV park anywhere from Palm Springs to Indio with no call-out fee. For the bike that came out of the box wrong on Friday night.

## Rejected

- **Village Peddler's rentals** — multi-speed hybrids and cruisers, $40 a day (Oct 2026). Not a rental for this guide; the shop stays in for repair.
- **Big Wheel's cruisers, comfort bikes and cargo e-bikes** — left out of the rental lines; only the road, mountain and e-bike tiers are named.
- **pdbikenbrews.com** — the second domain in the search results for Palm Desert Bike N Brews now serves an online gambling site (fetched Oct 3, 2026). The shop's site is **pdbikesnbrew.com**. Never link the other one.
- **oldtownpeddler.com** — Village Peddler's old site, same address and phone; it sends people to villagepeddlerlq.com. Use the new one.
- **Kings Rideshop** (1251 Montalvo Way, Suite C, Palm Springs) — BMX bikes and parts, per the local list. Not fetched; not a shop for a road visitor.
- **Jade Mobile Bicycle Detailing** — detailing and minor repairs, Facebook page only. Not fetched.
- **Big Wheel Tours' festival pricing** ($140 to $160 a bike for four days) — that's Coachella and Stagecoach weekend pricing, not the Tour. Left out.
- **Velo Palm Springs' local shop list** (updated Sept 19, 2026) — a lead list, used as the second "open" signal for Village Peddler, ACME and the Palm Desert shops. Not a source for any service.
- **Yelp, TripAdvisor, Velomesto** — leads only, not fetched.

## Couldn't confirm

- **Trek Bicycle Palm Springs** — 611 S Palm Canyon Dr, (760) 325-9319, "Trek/Bontrager bikes, service for all makes/models," per the Velo Palm Springs list (Sept 2026). This is the downtown service shop the guide most needs. Trek's store-finder page timed out on the permission step. Where to look: the store's trekbikes.com page, its Google listing, a phone call. If it confirms repair, it goes first in the list.
- **Trek Bicycle Palm Desert** — 77750 Country Club Dr, (760) 345-9096, per the same list. Same problem, same fix.
- **Bikeman** — 42280 Beacon Hill, Suite D-6, Palm Desert, (760) 341-5022, "high-end road cycling specialist" with "expert bike fitting," per the same list. No website named; the only fit lead in the valley. Where to look: Google listing, phone.
- **Bike Palm Springs Rentals & Tours** — downtown rentals, seen on TripAdvisor; the site (tried as bikepsrentals.com, a guessed address) timed out. May be cruisers. Where to look: the business's own site, Google listing.
- **Tri-A-Bike service page** (https://www.triabike.com/articles/bike-service-repair-pg184.htm) — timed out. Missing: turnaround, tune-up prices, boxed-bike assembly, and whether it receives a shipped bike. This is where a ship-to-shop line would most likely be.
- **Palm Desert Bike N Brews service page** (https://www.pdbikesnbrew.com/articles/bike-service-repair-pg229.htm) — timed out. Missing: the same as Tri-A-Bike's.
- **Big Wheel repairs** — the Tour de Palm Springs home page says "Rentals and repairs available at Bike Wheel Tours and Tri a Bike," but Big Wheel's own pages mention only sales and rentals. Not tagged `repair`. Where to look: phone either store.
- **Ship-to-shop anywhere in the valley** — no shop says it. Village Peddler's "bike shipping" has no detail. Where to look: the two service pages above, BikeFlights' shop directory, phone.
- **In-season hours** — Big Wheel posts only summer hours (Palm Springs closed until Aug 31; Palm Desert Wed to Sat 10 to 5). Tri-A-Bike says winter hours resume Oct 19 without posting them. Where to look: phone, Google listing after Oct 19.
- **Same-day repair** — no shop says it. Tri-A-Bike asks for appointments in winter; Village Peddler is appointment only.
- **Fit studio** — none confirmed; Bikeman is the lead.
- **Bike-box or case storage** — none found on any fetched page.
- **Rental frame sizes** — no shop lists sizes for its road bikes.
- **Tri-A-Bike's "extra day" rate** — the rentals page lists an extra-day price beside the day and week prices ($20 for carbon) without saying whether it follows the first day or the week. Left out of the notes. Ask.
- **Tour weekend minimums** — Tri-A-Bike's page states the two-day minimum against the Feb 7, 2026 Tour; Big Wheel's is undated. Both may carry to Feb 6, 2027; confirm in January.
- **ACME prices and hours** — on a price list page not reached this run.
- **Cathedral City, Rancho Mirage, Indian Wells, Indio, Desert Hot Springs** — no shop on the local list in Cathedral City; the others were not checked. With search spent, nothing more could be found.
- **Distances** — estimates, as noted at the top.

## Hand-offs

- **@community-scout:** Tri-A-Bike lists a Saturday 10:30 am shop ride from the store, "all type of bikes welcome," starting October 2026, and the Desert Cycling Club's Tuesday, Wednesday and Thursday rides for intermediate to advanced road riders (http://www.cycleclub.com/rides), both on https://www.triabike.com/articles/local-rides-pg196.htm. Big Wheel's events page (Nov to Apr rides, announced on social) is already in rides.json at low confidence. Palm Desert Bike N Brews has a "Local Rides & Clubs" page (https://www.pdbikesnbrew.com/articles/local-rides-clubs-pg225.htm) that timed out.
- **@coffee-scout:** Palm Desert Bike N Brews serves coffee and beer ("The Hub Gastropub," https://www.pdbikesnbrew.com/articles/the-hub-gastropub-pg227.htm, timed out).
- **@route-scout:** Tri-A-Bike points to its posted Palm Springs-area routes on RideWithGPS (https://ridewithgps.com/users/219822). Velo Palm Springs has route pages for South Palm Canyon to Indian Canyons, a citywide loop and the Tour century.

## Sources

- https://www.velopalmsprings.com/local-bike-shops/
- https://bigwheelbikescv.com/
- https://bigwheelbikescv.com/rentals/
- https://bigwheelbikescv.com/locations/
- https://bigwheelbikescv.com/about-us/
- https://bigwheelbikescv.com/events/
- https://bigwheelbikescv.com/contact-us/
- https://bwbtours.com/palm-springs-bike-rentals/
- https://bwbtours.com/palm-desert-bike-rentals/
- https://www.triabike.com/
- https://www.triabike.com/articles/bike-rentals-pg183.htm
- https://www.triabike.com/about/location-pg141.htm
- https://www.triabike.com/articles/about-us-pg189.htm
- https://www.triabike.com/articles/local-rides-pg196.htm
- https://www.pdbikesnbrew.com/
- https://www.pdbikesnbrew.com/articles/bike-rentals-pg233.htm
- https://villagepeddlerlq.com/
- https://villagepeddlerlq.com/bike-repair/
- https://villagepeddlerlq.com/bike-rental/
- https://villagepeddlerlq.com/bike-rental-rates/
- https://www.oldtownpeddler.com/
- https://acmebikecompany.com/
- https://www.tourdepalmsprings.com/
- https://tourdepalmsprings.com/faq/
- cfc-site/rides/rides.json — `palm-springs-ca-big-wheel-bikes-community-group-rides` (coordinates for the Palm Springs store)

Fetched and rejected: https://pdbikenbrews.com/bike-rentals/ (gambling site).

Not fetched (permission request timed out): https://www.triabike.com/articles/bike-service-repair-pg184.htm, https://www.pdbikesnbrew.com/articles/bike-service-repair-pg229.htm, https://www.pdbikesnbrew.com/articles/local-rides-clubs-pg225.htm, https://www.pdbikesnbrew.com/articles/the-hub-gastropub-pg227.htm, https://www.trekbikes.com/us/en_US/store-finder/?q=Palm%20Springs%2C%20CA, https://www.bikepsrentals.com/.
