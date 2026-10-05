# tucson-az — shops

town: `tucson-az` · agent: **shop-scout** · date: **2026-10-03**

A refresh. The five shops in `data/towns/tucson-az.json` were re-checked on
their own sites: all five are open and kept, four with fixes (Fair Wheel's
service moved to a second address; BICAS loses `repair`, `parts` and `rental`;
Ajo loses `parts` and the lines its pages no longer back up; Transit loses
`parts` and gains `suspension`). Two added: Earlybird Bikes at the base of
Mount Lemmon, and Pima Street Bicycle, the one shop that says on its own site
to ship your bike to it. That makes seven, one over the target of six. The
brief says to keep every listing that passes, so the editor makes the cut;
BICAS (DIY only) or Ajo (thin this run) is the one to drop.

Distances are straight-line estimates from downtown (32.2226, -110.9747)
using approximate coordinates, not fetched ones. The verifier should
recompute. Prices are as read on 2026-10-03.

Some fetches were refused this session ("permission request not answered"),
including Fair Wheel's homepage and contact page, Ajo's service and about
pages, Bicycle Ranch's fitting page and Campfire Cycling's repair page. What
those pages would have settled is under Couldn't confirm.

## Findings

```json
[
  {
    "name": "Fair Wheel Bikes",
    "url": "https://www.fairwheelbikes.com/our-services/6th-street-location/",
    "address": "1110 E 6th St, Tucson, AZ 85719",
    "phone": "(520) 884-9018",
    "services": ["repair", "parts", "rental", "rental-road", "rental-gravel", "rental-mtb", "rental-ebike", "fitting", "suspension"],
    "note": "About a mile northeast of downtown, near University and Euclid, where {ride:tucson-az-the-shootout|the Shootout} and {ride:tucson-az-tuesday-morning-fast-ride|the Tuesday Morning Fast Ride} start. The 6th Street store sells and hands out rentals and is closed Sundays; repairs and FitWorks fittings happen at the Park Avenue Studio, 503 S Park Ave, (520) 624-3045, Monday to Friday 8 to 5 by call or email (tune-up $120; fit $125 an hour, usually 2 to 3 hours; Oct 2026). Rents a real fleet, first day (Oct 2026): aluminum road $65, carbon Shimano 105 $100, 105 Di2 $115, ENVE with SRAM AXS $135, Trek Checkpoint ALR gravel $75, mountain bikes $65 to $100, e-road and e-gravel $150; extra days discounted, helmet, flat kit and your choice of pedals included."
  },
  {
    "name": "Earlybird Bikes",
    "url": "https://www.earlybirdbikes.com/",
    "address": "8969 E Tanque Verde Rd, Suite 213, Tucson, AZ 85749",
    "phone": "(520) 372-2016",
    "services": ["repair", "rental", "rental-road", "rental-gravel", "rental-mtb", "rental-ebike"],
    "note": "Near the base of the Mount Lemmon climb on Tanque Verde Road, about 10 miles northeast of downtown. Services almost every make, e-bikes included; the shop says to just stop by or call. Opens at 8 on Monday, Friday and weekends: Monday and Friday 8 to 5, Tuesday and Thursday 10 to 5, Saturday and Sunday 8 to 4, closed Wednesday ('out riding'). Rents Bianchi and Cannondale road, e-road and gravel bikes and Transition mountain bikes, one day to a week, with flat pedals, a flat kit and cages; SPD or SPD-SL pedals and a helmet cost extra, and prices show only in the booking system (Oct 2026)."
  },
  {
    "name": "Bicycle Ranch Tucson",
    "url": "https://www.bicycleranchtucson.com/",
    "address": "7090 N Oracle Rd #156, Tucson, AZ 85704",
    "phone": "520-219-4311",
    "services": ["repair", "parts", "fitting", "shop-rides"],
    "note": "On Oracle Road about 8 miles north of downtown, the shop for Oro Valley, Catalina State Park and the north side; {ride:tucson-az-bicycle-ranch-saturday-roundup|the Saturday Roundup} is the shop's own ride. Open every day: Monday to Saturday 10 to 6, Sunday 11 to 4. Services all makes; standard tune $125, flat repair $20, and it boxes a bike to ship home for $75 with materials (Oct 2026). El Tour de Tucson's shipping page names it the partner shop that receives riders' bikes, $55 to assemble or $90 with repacking after the ride (Oct 2026); the shop's own pages don't say so, so call before you ship."
  },
  {
    "name": "Transit Cycles",
    "url": "https://www.transitcycles.com/",
    "address": "267 S Avenida del Convento, Bldg 10, Tucson, AZ 85745",
    "phone": "520-396-4525",
    "services": ["repair", "suspension"],
    "note": "In the Mercado district, under a mile west of downtown, near the Mercado start of {ride:tucson-az-womens-shootout|the Women's Shootout}. Woman-owned, in the shop's own words. Jenna, certified by Shimano, SRAM and Bosch, does flats, brake bleeds, suspension overhauls and wheel builds, and works on Rad Power and Aventon e-bikes. Tuesday to Saturday 10 to 6, Sunday 11 to 4, closed Monday. No rentals, fitting or shipping on the site."
  },
  {
    "name": "Pima Street Bicycle",
    "url": "https://www.pimastreetbicycle.com/",
    "address": "3400 E Speedway Blvd, Suite 108, Tucson, AZ 85716",
    "phone": "520-326-4044",
    "services": ["repair", "parts", "ship-to-shop", "suspension"],
    "note": "Midtown on Speedway, about 3 miles northeast of downtown; a service-first shop that sells Giant and Liv. The one shop whose own site says to call and have your bike shipped straight to it: standard assembly $100, e-bike $149 (Oct 2026). Tune-ups $69 to $239, suspension from $65 (Oct 2026). Tuesday to Friday 10 to 6, Saturday 9 to 5, closed Sunday and Monday."
  },
  {
    "name": "BICAS",
    "url": "https://bicas.org/",
    "address": "2001 N 7th Ave, Tucson, AZ 85705",
    "phone": "520-628-7950",
    "services": ["diy"],
    "note": "Nonprofit community shop under 2 miles north of downtown. They don't fix your bike; they give you a stand, the tools and a mechanic's help to do it yourself, $6 to $12 an hour on a sliding scale, $30 to $60 for the day (Oct 2026). The homepage gives open hours as Thursday to Sunday 11 to 6; check its calendar before you go. Its rentals are single-speed coaster-brake bikes, $8 a day (Oct 2026), fine for town, not for the road. Home of {ride:tucson-az-bicas-wtf-ride|the women, trans and femme ride}."
  },
  {
    "name": "Ajo Bikes",
    "url": "https://www.ajobikes.com/about/location-pg141.htm",
    "address": "1301 E Ajo Way #117, Tucson, AZ 85713",
    "phone": "520-294-1434",
    "services": ["repair"],
    "note": "South side, about 3 to 4 miles south of downtown and the closest pick to the airport. Tuesday to Friday 10 to 6, Saturday 10 to 5, closed Sunday and Monday. Repair is on the site; prices and turnaround aren't, so call first."
  }
]
```

Ship-to-shop and rental lists, shaped like `bring_your_bike.ship.shops` and
`bring_your_bike.rent.shops`, for @logistics-scout and the editor:

```json
{
  "ship": {
    "shops": [
      {
        "name": "Pima Street Bicycle",
        "url": "https://www.pimastreetbicycle.com/bicycle-service-and-repair",
        "note": "Its assembly section says to call and have your bike shipped directly to the shop. Standard assembly $100, e-bike $149 (Oct 2026). Tuesday to Friday 10 to 6, Saturday 9 to 5, closed Sunday and Monday. 3400 E Speedway Blvd, Suite 108; 520-326-4044."
      }
    ]
  },
  "rent": {
    "shops": [
      {
        "name": "Fair Wheel Bikes",
        "url": "https://www.fairwheelbikes.com/our-services/rental-bikes/",
        "note": "First-day prices (Oct 2026): aluminum road (Allez E5, Domane AL, Tiagra or Cues) $65; carbon Cervélo Caledonia or Trek Domane SL with Shimano 105 $100; Caledonia or Madone with 105 Di2 $115; ENVE Melee (SRAM Red AXS, sizes 47 to 60) or Fray (Force AXS with power meter, 52 to 58) $135; Trek Checkpoint ALR gravel (Apex 1x, 50 mm tubeless, sizes 47 to 61) $75; Trek Roscoe hardtail $65, Specialized Chisel FS $85, Trek Fuel EX 8 $100, Fuel+ EX 8 e-MTB $135; Trek Domane+ SLR 7 or Checkpoint+ SL 5 e-bike $150. Extra days discounted; rates not published. Helmet, flat kit, cages and pedals of your choice (SPD-SL, SPD, Speedplay, Look Keo or flat) included; hitch rack $10 first day, $5 after. Book online; free cancellation with 24 hours' notice, but for El Tour and 24 Hours in the Old Pueblo, 50 percent at 14 days and no cancellation inside 7. Pick up and return at 1110 E 6th St; closed Sundays, Monday returns at 9 am. (520) 884-9018."
      },
      {
        "name": "Earlybird Bikes",
        "url": "https://www.earlybirdbikes.com/rentals-and-demos",
        "note": "Bianchi and Cannondale road, e-road and gravel bikes and Transition mountain bikes, one day to a week, booked online. Flat pedals, flat kit and cages included; SPD or SPD-SL pedals and a helmet extra. Prices and sizes only in the booking system (Oct 2026). Full refund with 24 hours' notice. At the base of the Mount Lemmon climb, 8969 E Tanque Verde Rd; closed Wednesdays. (520) 372-2016."
      },
      {
        "name": "Tucson Bicycle Rentals",
        "url": "https://tucsonbicyclerentals.com/rental-road-bikes-tucson/",
        "note": "A rental outfit, not a repair shop, with pickup points rather than a storefront: central (Prince Rd and I-10), near 6900 N Thornydale on the Loop, and on N Oracle Rd by Catalina State Park. Carbon road (Trek Domane or similar, Tarmac, Emonda, Roubaix, women's Ruby and Amira; sizes 45 to 61): $125 a day, $85 a day for three, $60 a day for five, $395 a week; aluminum road $85 a day (Oct 2026). SPD, SPD-SL or Look Keo pedals free. No walk-ins; book first. Three-day minimum for El Tour. Pickup from 6 am. The site gives two phone numbers, 520-260-8293 and 520-357-1208, and the pickup hours differ between pages; text first."
      }
    ]
  }
}
```

Not in the ship list because it isn't on the shop's own site: El Tour de
Tucson's shipping page names Bicycle Ranch Tucson (7090 N Oracle Rd,
520-219-4311) as the partner shop that receives riders' bikes, $55 to
assemble, $90 with repacking after the ride (read Oct 3, 2026; the page is
for the Nov 21, 2026 ride). Bicycle Ranch's own repair page lists boxing a
bike to ship for $75 with materials (Oct 2026). The editor decides whether
the event's word is enough for the ship note.

## Why these

- **Fair Wheel Bikes** — the shop for a visiting road rider: the deepest rental fleet in town (aluminum to ENVE, gravel, MTB, e-bikes) at published first-day prices, a FitWorks fit, and the store sits near the start of the Shootout and TMFR. Central zone, by the university.
- **Earlybird Bikes** — the Mount Lemmon zone: at the base of the climb, open at 8 four days a week, repairs e-bikes, and rents road, gravel and MTB bikes from the door you'd climb from.
- **Bicycle Ranch Tucson** — the north zone (Oro Valley, Catalina State Park, Oracle Road): open seven days, published repair prices, its own Saturday ride, a $75 box-to-ship service, and El Tour's named receiving shop.
- **Transit Cycles** — the Loop and Mercado zone: west of downtown, near the Women's Shootout start, open Sundays, woman-owned by its own statement, one certified mechanic who does the whole job.
- **Pima Street Bicycle** — the only shop in town that says on its own site to ship your bike to it, with a published assembly fee. Midtown, between downtown and the east side.
- **BICAS** — fix it yourself with help for a few dollars; a community institution and the host of the women, trans and femme ride. Not a repair service, said plainly.
- **Ajo Bikes** — kept from the last run: open, confirmed hours, and the nearest shop to TUS for a bike that arrives broken. Thin this run.

## Rejected

- **BICAS as a rental** — its rentals are single-speed coaster-brake bikes, $8 a day, and its own page says "Not good for mountain biking or fast road rides." The `rental` tag comes off; the shop stays as `diy`.
- **BICAS `repair` and `parts`** — its tools page says "We don't fix your bike for you." Used parts weren't on a page I read. Both tags off.
- **Transit Cycles `parts` and `fitting`** — not on its site. The homepage line is about outfitting bikes for the road or trail, not a fit.
- **Ajo Bikes' old note** ("family shop for 50-plus years; four certified mechanics, recumbents and trikes") — the about and service pages didn't load this run, so those lines are out until someone reads them again. `parts` off for the same reason.
- **Tucson Bicycle Rentals in `bike_shops`** — a rental business with pickup points and no stated repair service or street address. It's in the rent list only.
- **Bicycle Ranch as `ship-to-shop`** — the claim is on El Tour's page, not the shop's. In the ship note, not the tag. See Couldn't confirm.
- **El Tour's bike-shop partner list, not fetched this run** (search budget): Ben's Bikes (7431 S Houghton Rd), Sabino Cycles (7045 E Tanque Verde Rd), Gnome Cycle (4044 E Speedway), RC Bicycles (428 N Fremont), Guru Bikes (2634 N 1st Ave), Tucson Bike Service (248 E 22nd St), Cycle Fit (6960 E Sunrise Dr), Tucson Endurance Center (7231 E Speedway), Pro Valley Bike, Broadway Bikes (140 S Sarnoff Dr), Trek Bikes (7645 N Oracle Rd), Copper Spoke (5626 E Broadway). Leads only; addresses are El Tour's, not the shops'. Its list also has Pima Street Bicycle at an old address (5445 E Pima St); the shop's own site says 3400 E Speedway.
- **BikeFlights' El Tour page** — loaded, but the receiving shop and dates sit behind the booking form; nothing usable.
- **Yelp, Birdeye, Pinkbike directory, Locally, Yellow Pages, Wheree, Apple Maps** — leads only, never a source.

## Couldn't confirm

- **Fair Wheel's 6th Street store hours.** The homepage and contact page were refused twice. The rental pages say closed Sundays and returns on Monday at 9 am. Where to look: fairwheelbikes.com/service/contact-us/ or the Google listing.
- **Fair Wheel's multi-day rates and the carbon 105 sizes.** Only "additional days discounted"; the Peek booking pages hold the prices. Where to look: the Peek links on the road and gravel pages, or call.
- **Earlybird's rental prices and sizes.** Only in its Peek booking system. Where to look: the "Rent a bike" button on the rentals page.
- **Bicycle Ranch receiving shipped bikes, on its own site.** El Tour's page says so; the shop's homepage and repair page don't. Its fitting page (fit system, price) was refused. Where to look: call 520-219-4311; bicycleranchtucson.com/articles/bike-fitting-pg64.htm.
- **Ajo Bikes' services and history.** Service and about pages refused twice. Where to look: ajobikes.com/articles/bike-service-repair-pg186.htm and about-us-pg181.htm.
- **BICAS hours.** The homepage says Thursday to Sunday 11 to 6; the tools page says Tuesday to Sunday with no times. The ZIP (85705) is from the last run; the page I read gave no ZIP. Where to look: bicas.org/calendar/.
- **Campfire Cycling** (15 E Toole Ave, downtown, a few blocks from the El Tour start). Its directions page loaded: a repair center and a bikepacking and camping outfitter, Monday 11 to 6, Tuesday to Thursday 11 to 5, Friday 11 to 6, Saturday 11 to 5, Sunday not listed, phone (800) 717-2596 (El Tour's list gives 520-717-2596). The repair-center and contact pages were refused twice, so services and prices are unknown. The best downtown lead for the next run.
- **A shop for Saguaro East and Vail, the Tucson Mountains, and Green Valley.** None confirmed. Ben's Bikes on Houghton Rd is the lead for the Saguaro East side.
- **Same-day repair.** No shop says it. Earlybird says to just stop by; Pima Street says suspension comes back in days. Event weekends: no shop says when to call. Where to look: phone.
- **Box storage or rental.** No shop states it. Tucson Bicycle Rentals' homepage mentions storing bikes at its locations; not clear whether that means a rider's case. Where to look: text them.
- **Tucson Bicycle Rentals' phone and hours.** Two numbers and three sets of pickup hours across its pages; the gravel page was not fetched (the homepage lists gravel at $50 a day on a 7-day rental). Where to look: text both numbers.
- **Distances.** All straight-line estimates from approximate coordinates. The verifier should recompute from geocoded addresses.

Hand-offs:
- **@community-scout** — rides on Transit Cycles' events page that aren't in `rides.json`: the Dragonfly Rides Full Moon Ride (no-drop, about 20 miles, from Tucson Hop Shop, dates on Instagram), the Tucson Sundaze Ride (Sundays 7 am, Highland Underpass on campus), Third Thursdays (5:30 pm meet at the MSA Annex, a 10-mile cruise). Earlybird's Wednesday 6 am cross-country ride at Fantasy Island, June to August. And a conflict: Transit's page gives the Women's Shootout start as 6 am (6:15 seasonally) from the Mercado; `rides.json` has Fair Wheel's 6:45 / 7:15 / 7:45 table.
- **@ride-verifier** — Bicycle Ranch's group-rides page still gives no meeting point for the Saturday Roundup beyond the shop's address in the footer.

## Sources

- https://www.fairwheelbikes.com/service/group-rides/
- https://www.fairwheelbikes.com/our-services/
- https://www.fairwheelbikes.com/our-services/6th-street-location/
- https://www.fairwheelbikes.com/our-services/park-avenue-studio/
- https://www.fairwheelbikes.com/our-services/bike-fitting/
- https://www.fairwheelbikes.com/our-services/rental-bikes/
- https://www.fairwheelbikes.com/our-services/rental-bikes/road-bikes/
- https://www.fairwheelbikes.com/rentals/rental-bikes/mountain-bikes/
- https://www.earlybirdbikes.com/
- https://www.earlybirdbikes.com/about
- https://www.earlybirdbikes.com/service
- https://www.earlybirdbikes.com/rentals-and-demos
- https://www.earlybirdbikes.com/shopridesandevents
- https://www.bicycleranchtucson.com/
- https://www.bicycleranchtucson.com/articles/bike-repair-pg63.htm
- https://www.bicycleranchtucson.com/articles/group-rides-pg68.htm
- https://www.transitcycles.com/
- https://www.transitcycles.com/contact
- https://www.transitcycles.com/about-2
- https://www.transitcycles.com/events-1
- https://www.pimastreetbicycle.com/
- https://www.pimastreetbicycle.com/bicycle-service-and-repair
- https://bicas.org/
- https://bicas.org/bikes/
- https://bicas.org/bikes/community-tools/
- https://bicas.org/bikes/rent-a-bicycle/
- https://www.ajobikes.com/about/location-pg141.htm
- https://tucsonbicyclerentals.com/
- https://tucsonbicyclerentals.com/rental-road-bikes-tucson/
- https://tucsonbicyclerentals.com/bike-rental-locations/
- https://www.campfirecycling.com/directions
- https://eltourdetucson.org/el-tour-de-tucson/https-www-bikeflights-com-events-el-tour-de-tucson/
- https://eltourdetucson.org/el-tour-de-tucson/bike-shop-partners/
- https://www.bikeflights.com/El-Tour-de-Tucson
