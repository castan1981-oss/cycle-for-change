# palm-springs-ca — shops

town: `palm-springs-ca` · agent: **shop-scout** · date: **2026-10-04** (replaces the Oct 3 report)

Seven shop records: two in Palm Springs, four in Palm Desert, one in La Quinta,
plus one mobile mechanic who covers the valley. Every record was fetched on the
business's own site, Oct 3 or Oct 4, 2026. Prices are as read on those dates.

What closed since Oct 3:

- **Palm Springs has a repair shop.** Trek Bicycle Palm Springs, 611 S Palm
  Canyon Dr, fetched on trekbikes.com: service on any brand, 24-hour
  turnaround on most jobs, Monday to Saturday 9 to 5. It goes first.
- **The valley has a ship-to-shop shop.** Tri-A-Bike's service page says it
  accepts shipped bikes, recommends bikeflights.com, and charges $150 to unbox
  and assemble (Oct 2026). The ship list is no longer empty.
- Trek Bicycle Palm Desert fetched too: the only shop in the valley open on a
  Monday (noon to 5).
- Bike N Brews' service page fetched: tune-up and suspension prices; it boxes
  a bike for shipping but does not say it receives one.

Seven is one over the three-to-six target. The editor can drop Trek Palm Desert
(two other Palm Desert shops do more) or ACME; I kept both because Trek Palm
Desert is the Monday shop and ACME comes to the hotel.

Distances: Big Wheel Palm Springs is from its `rides.json` coordinates
(33.8033, -116.5455). Trek Palm Springs sits on the same street, 600 block
south of Tahquitz, so "under a mile" is from the address, not a geocoder. The
Palm Desert and La Quinta figures are straight-line estimates from approximate
coordinates; the verifier should recompute them. The centre (33.8303,
-116.5453) was not checked against a geocoder page; none loaded.

## Findings

```json
[
  {
    "name": "Trek Bicycle Palm Springs",
    "url": "https://www.trekbikes.com/us/en_US/retail/palm_springs/",
    "address": "611 S Palm Canyon Dr, Suite 24, Palm Springs, CA 92264",
    "phone": "(760) 325-9319",
    "services": ["repair", "shop-rides"],
    "note": "Downtown, on South Palm Canyon under a mile south of Tahquitz Canyon Way and about a mile north of the Tour de Palm Springs start. The repair shop in Palm Springs: service on any brand, with \"24-hour service turnaround on most service jobs,\" a free bike check, and pick-up and drop-off for repairs. Level One service $99.99, Level Two $189.99, Level Three from $449.99; boxes a bike to ship home for $79.99 (Oct 2026). Monday to Saturday 9 to 5, closed Sunday. The page lists group rides and clinics but no schedule, and says nothing about rentals, fitting or receiving a shipped bike."
  },
  {
    "name": "Big Wheel Bikes CV, Palm Springs",
    "url": "https://bigwheelbikescv.com/locations/",
    "address": "1590 South Palm Canyon Drive, Palm Springs, CA 92264",
    "phone": "(760) 548-0500 ext. 1",
    "services": ["rental", "rental-road", "rental-mtb", "rental-ebike", "shop-rides"],
    "note": "Downtown, on South Palm Canyon about 2 miles south of the Tour de Palm Springs start. The carbon road rental is a KHS Flite 720 with Di2 and hydraulic discs: $105 a day, $250 for four days, $350 a week; KHS Flite Team road bikes and full-suspension KHS mountain bikes are $80 a day, $195 for four days, $295 a week (Oct 2026). Helmet, lock and repair kit included; $50 delivery to a resort; two-day minimum on Tour weekend; changes inside 24 hours cost 25 percent. The store was closed for summer until Aug 31 and its winter hours are not posted, so call. The site does not mention repairs. Guided rides November to April: {ride:palm-springs-ca-big-wheel-bikes-community-group-rides|Big Wheel's community group rides}."
  },
  {
    "name": "Tri-A-Bike",
    "url": "https://www.triabike.com/",
    "address": "44841 San Pablo Ave, Palm Desert, CA 92260",
    "phone": "(760) 340-2840",
    "services": ["repair", "ship-to-shop", "rental", "rental-road", "rental-mtb", "rental-ebike", "shop-rides"],
    "note": "Palm Desert, about 12 miles southeast of downtown Palm Springs; open since 1987, and one of the two rental shops the Tour de Palm Springs FAQ names. The valley's ship-to-shop shop: it accepts shipped bikes, recommends bikeflights.com, and unboxes and assembles for $150; boxing a bike to ship home is $100 to $150 (Oct 2026). Rents Cannondale or Giant road bikes: aluminum with 105 $75 a day, $200 a week; full carbon with Ultegra $100 a day, $300 a week; carbon with Di2 $124 a day, $350 a week; full-suspension mountain bikes $80 a day, $250 a week (Oct 2026). Helmet, lock and a seat-bag kit; delivery $50 one way to Palm Springs, La Quinta or Indio, $35 to Cathedral City or Rancho Mirage, $25 in Palm Desert; two-day minimum on Tour weekend. Repairs by appointment: check and adjust $95, standard tune-up $150, overhaul $225, a tube swap $20 labor and \"within 24 hours during our busy times,\" 30-day guarantee (Oct 2026). Tuesday to Saturday 10 to 4, closed Sunday and Monday; the site says winter hours resume Oct 19 but does not post them. A weekly shop ride leaves the door from October 2026."
  },
  {
    "name": "Palm Desert Bike N Brews",
    "url": "https://www.pdbikesnbrew.com/",
    "address": "73865 CA-111, Palm Desert, CA 92260",
    "phone": "(760) 340-3861",
    "services": ["repair", "parts", "suspension", "rental", "rental-road", "rental-mtb", "rental-ebike", "coffee"],
    "note": "Palm Desert, on Highway 111 about 12 miles southeast of downtown Palm Springs. Road rentals: carbon $140 a day, $300 for three days, $400 a week; aluminum $100, $190 and $300; carbon full-suspension mountain bikes $125 a day (Oct 2026). No makes, models or sizes listed, so call with your height. Helmet and lock included; reserve ahead, walk-ins taken; pickup and drop-off in Palm Springs is $100 for up to five bikes. Repairs: basic tune-up $150, major $200, deluxe $399 (e-bikes more); tube install $10, wheel true $15 to $25, brake bleed $30; fork service $150 to $225, shock $150 to $200; boxes a bike for shipping for $100 to $150 but does not say it receives one (Oct 2026). Turnaround not posted. Tuesday to Saturday 9 to 5, closed Sunday and Monday. The shop's own line is \"sales, rentals, e-bikes, shuttles, coffee, beer, components.\""
  },
  {
    "name": "Trek Bicycle Palm Desert",
    "url": "https://www.trekbikes.com/us/en_US/retail/palm_desert/",
    "address": "77750 Country Club Dr, Palm Desert, CA 92211",
    "phone": "(760) 345-9096",
    "services": ["repair", "shop-rides"],
    "note": "Palm Desert, on Country Club Drive about 12 miles southeast of downtown Palm Springs and north of Highway 111. Service on any brand with 24-hour turnaround: Level One $99.99, Level Two $189.99, Level Three from $449.99, a \"Traveling\" package at $79.99, and boxing a bike to ship for $79.99 (Oct 2026). The one shop in the valley open on a Monday, noon to 5; Tuesday to Saturday 10 to 6; closed Sunday. Group rides and clinics listed, no schedule. Nothing on rentals, fitting or receiving a shipped bike."
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
    "note": "One valley shop says it on its own site: Tri-A-Bike in Palm Desert accepts shipped bikes, recommends bikeflights.com, and unboxes and assembles for $150; boxing it for the trip home is $100 to $150, and delivery to a Palm Springs hotel is $50 one way (Oct 2026). It is about 12 miles down the valley from downtown Palm Springs, closed Sunday and Monday, and asks for a call ahead. Both Trek stores and Bike N Brews box a bike to ship out ($79.99; $100 to $150, Oct 2026) but none says it receives one; Village Peddler lists \"bike shipping\" with no detail. Call before you ship anywhere but Tri-A-Bike.",
    "shops": [
      {
        "name": "Tri-A-Bike",
        "url": "https://www.triabike.com/articles/bike-service-repair-pg184.htm",
        "note": "Ship to the shop (it recommends bikeflights.com); unbox and assemble $150, box for the return $100 to $150, delivery to Palm Springs $50 one way (Oct 2026). Call 760-340-2840 to book before you ship. Tuesday to Saturday 10 to 4, closed Sunday and Monday. 44841 San Pablo Ave, Palm Desert."
      }
    ]
  },
  "rent": {
    "note": "Three shops, four stores, rent carbon road bikes: $100 to $140 a day, $300 to $400 a week (Oct 2026), two of them with Di2. All four also rent full-suspension mountain bikes. Big Wheel on South Palm Canyon is the only fleet in Palm Springs; the rest sit in Palm Desert, about 12 miles down the valley, and deliver to Palm Springs for $50 (Big Wheel, Tri-A-Bike) or $100 (Bike N Brews). None lists frame sizes; call with your height. Big Wheel and Tri-A-Bike set a two-day minimum on Tour de Palm Springs weekend. No gravel rental was found. Neither Trek store mentions rentals.",
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

Big Wheel's Palm Desert store (74200 Highway 111, (760) 779-1837 ext. 2, rental only, fetched Oct 3) is in the rent list and was in the Oct 3 shop list; I folded it out of `bike_shops` to make room for the two repair shops. The editor can put it back as a seventh or eighth record from the Oct 3 text if the page wants it.

## Why these

- **Trek Bicycle Palm Springs** — the only repair shop in Palm Springs, on the same street as the Tour start, any brand, 24-hour turnaround, open Saturdays. The first call for the bike that came out of the case wrong.
- **Big Wheel Bikes CV, Palm Springs** — the only rental fleet in Palm Springs, two miles down South Palm Canyon from the Tour start, with a carbon Di2 road bike. The pick for a rider who flies in and doesn't want to build a bike.
- **Tri-A-Bike** — open since 1987, the valley's longest-running shop by its own account, and now the one that receives a shipped bike, rents a carbon Di2 bike, repairs with posted prices, delivers to Palm Springs and runs a weekly ride. Named in the Tour's FAQ.
- **Palm Desert Bike N Brews** — repair, parts, suspension service and a carbon road rental under one roof, with coffee and beer in the shop. The most expensive carbon rental, and the one with a three-day price.
- **Trek Bicycle Palm Desert** — the Monday shop. Everything else in the valley is closed Monday; this one opens at noon. Any brand, 24-hour turnaround.
- **Village Peddler** — the La Quinta repair stop, by appointment, for a rider staying at the east end of the valley. Listed for repair only; its rentals are hybrids.
- **ACME Bike Company** — a mobile mechanic who comes to a vacation rental or RV park anywhere from Palm Springs to Indio with no call-out fee. For the bike that came out of the box wrong on Friday night.

## Rejected

- **Village Peddler's rentals** — multi-speed hybrids and cruisers, $40 a day (Oct 2026). Not a rental for this guide; the shop stays in for repair.
- **Big Wheel's cruisers, comfort bikes and cargo e-bikes** — left out of the rental lines; only the road, mountain and e-bike tiers are named.
- **Trek's "bike shipping" line** — both stores box your bike and "help send it where you need it to go" ($79.99). Outbound only; neither says it receives a shipment. Not tagged `ship-to-shop`.
- **Bike N Brews' "box bike for shipping"** — $100 to $150, outbound. Same reason.
- **pdbikenbrews.com** — the second domain in the search results for Palm Desert Bike N Brews serves an online gambling site (fetched Oct 3, 2026). The shop's site is **pdbikesnbrew.com**. Never link the other one.
- **oldtownpeddler.com** — Village Peddler's old site, same address and phone; it sends people to villagepeddlerlq.com. Use the new one.
- **Kings Rideshop** (1251 Montalvo Way, Suite C, Palm Springs) — BMX bikes and parts, per the local list. Not fetched; not a shop for a road visitor.
- **Jade Mobile Bicycle Detailing** — detailing and minor repairs, Facebook page only. Not fetched.
- **Big Wheel Tours' festival pricing** ($140 to $160 a bike for four days) — that's Coachella and Stagecoach weekend pricing, not the Tour. Left out.
- **Velo Palm Springs' local shop list** (updated Sept 19, 2026) — a lead list, used as the second "open" signal for Village Peddler, ACME and the Palm Desert shops. Not a source for any service.
- **Locally.com, Yelp, Yellow Pages, Wheree, Velomesto, TripAdvisor, roadbikereview threads** — leads only, not fetched.

## Couldn't confirm

- **Bikeman** — 42280 Beacon Hill, Suite D-6, Palm Desert, (760) 341-5022, "high-end road cycling specialist" with "expert bike fitting," per the Velo Palm Springs list (Sept 2026). No website surfaced in search; the only fit lead in the valley. Where to look: Google listing, phone. Nothing is tagged `fitting` until it does.
- **Bike Palm Springs Rentals & Tours** — downtown rentals, seen on TripAdvisor; no site surfaced. May be cruisers. Where to look: the business's own site, Google listing.
- **Big Wheel repairs** — the Tour de Palm Springs home page says "Rentals and repairs available at Bike Wheel Tours and Tri a Bike," but Big Wheel's own pages mention only sales and rentals. Not tagged `repair`. Where to look: phone either store.
- **Trek Palm Springs' group rides** — the page lists "group rides and clinics" with no day or time. A hand-off below; not a `ride_slug` yet.
- **Same-day repair** — no shop says it. Trek's "24-hour turnaround on most service jobs" is the closest; Tri-A-Bike asks for appointments in winter and swaps a tube "within 24 hours during our busy times"; Village Peddler is appointment only. Nothing is tagged `same-day`.
- **In-season hours** — Big Wheel posts only summer hours (Palm Springs closed until Aug 31; Palm Desert Wed to Sat 10 to 5). Tri-A-Bike says winter hours resume Oct 19 without posting them. Where to look: phone, Google listing after Oct 19.
- **Bike-box or case storage** — none found on any fetched page. A rider shipping to Tri-A-Bike should ask whether the shop keeps the box for the week.
- **Rental frame sizes** — no shop lists sizes for its road bikes.
- **Tri-A-Bike's "extra day" rate** — the rentals page lists an extra-day price beside the day and week prices ($20 for carbon) without saying whether it follows the first day or the week. Left out of the notes. Ask.
- **Tour weekend minimums** — Tri-A-Bike's page states the two-day minimum against the Feb 7, 2026 Tour; Big Wheel's is undated. Both may carry to Feb 6, 2027; confirm in January.
- **ACME prices and hours** — on a price list page not reached.
- **Parts at Trek** — a Trek store stocks Bontrager parts, but the store page doesn't say so. Not tagged `parts`.
- **Cathedral City, Rancho Mirage, Indian Wells, Indio, Desert Hot Springs** — no shop on the local list in Cathedral City; the others were not checked. Search was capped at 12 calls this run and all were spent.
- **Distances** — estimates, as noted at the top.

## Hand-offs

- **@community-scout:** Tri-A-Bike lists a Saturday 10:30 am shop ride from the store, "all type of bikes welcome," starting October 2026, and the Desert Cycling Club's Tuesday, Wednesday and Thursday rides for intermediate to advanced road riders (http://www.cycleclub.com/rides), both on https://www.triabike.com/articles/local-rides-pg196.htm. Both Trek stores list "group rides and clinics" with no schedule — their Strava clubs or Facebook pages would have the day. Big Wheel's events page (Nov to Apr rides, announced on social) is already in rides.json at low confidence. Palm Desert Bike N Brews has a "Local Rides & Clubs" page (https://www.pdbikesnbrew.com/articles/local-rides-clubs-pg225.htm), not fetched.
- **@coffee-scout:** Palm Desert Bike N Brews serves coffee and beer ("The Hub Gastropub," https://www.pdbikesnbrew.com/articles/the-hub-gastropub-pg227.htm, not fetched).
- **@route-scout:** Tri-A-Bike points to its posted Palm Springs-area routes on RideWithGPS (https://ridewithgps.com/users/219822). Velo Palm Springs has route pages for South Palm Canyon to Indian Canyons, a citywide loop and the Tour century.
- **@logistics-scout:** the ship list above is yours to lift. Tri-A-Bike is the only receiving shop.

## Sources

Fetched Oct 4, 2026:
- https://www.trekbikes.com/us/en_US/retail/palm_springs/
- https://www.trekbikes.com/us/en_US/retail/palm_desert/
- https://www.triabike.com/articles/bike-service-repair-pg184.htm
- https://www.pdbikesnbrew.com/articles/bike-service-repair-pg229.htm

Fetched Oct 3, 2026 (the earlier run; facts kept as read then):
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

Fetched and rejected: https://pdbikenbrews.com/bike-rentals/ (gambling site, Oct 3).

Not fetched (permission request timed out, Oct 3 or Oct 4; not fetched any other way): https://www.pdbikesnbrew.com/articles/local-rides-clubs-pg225.htm, https://www.pdbikesnbrew.com/articles/the-hub-gastropub-pg227.htm, https://www.bikepsrentals.com/ (a guessed address).
