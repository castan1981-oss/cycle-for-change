# phoenix-az — logistics

town: `phoenix-az` · agent: **logistics-scout** · date: **2026-10-03**

One `bring_your_bike` object. The ship and rent lists are lifted from
`research/towns/phoenix-az/shops.md` (same run, same date), not re-checked.
Distances are straight-line from downtown Phoenix (City Hall, 33.4484,
-112.0740) using approximate coordinates; the verifier should recompute.
Everything else was read on Oct 3, 2026.

This one is thinner than the LA bar, and the gaps are named below. The
session's WebSearch cap (12) was spent, 4 of it here, and many pages that
were named but never surfaced by a search refused to load (the fetch
approval timed out): Southwest, Delta, Alaska, JetBlue, Arizona's statutes,
ADOT, Phoenix-Mesa Gateway. Valley Metro's pages loaded but came back as
script shells with no text. So: **one airline confirmed (American),
`transit_bike_rules` null, `bike_share` null, and `rules_and_safety` carries
the City of Phoenix heat rule only — no state law and no traffic read.** The
editor has to fill those before this ships.

## Findings

```json
{
  "summary": "Bring it for anything longer than a day. American checks a bike in a case as an ordinary bag, $45 each way paid online when it is your only checked bag (Oct 2026), and a day on Bike Emporium's carbon road rental in south Scottsdale is $90, so renting wins only on a one-day trip. No Valley shop says on its own site that it takes in a shipped bike, so call before you send one. Plan on a car: the shops in this guide sit 2 to 23 miles north, east and southeast of downtown Phoenix.",
  "fly": {
    "airports": [
      {
        "name": "Phoenix Sky Harbor International",
        "code": "PHX",
        "miles": 4,
        "note": "About 4 miles east of downtown Phoenix. Terminal 3: Alaska, Allegiant, Breeze, Delta, Frontier, JetBlue, Sun Country, United and others; Terminal 4: American and Southwest, plus Aeroméxico, Air France, British Airways, Volaris and WestJet, per the airport's airline list (Oct 2026). The free PHX Sky Train runs 24 hours between both terminals, the Rental Car Center and the Valley Metro Rail stop at 44th and Washington streets."
      }
    ],
    "airline_note": "Read on the airline's own page, Oct 2026. American (Terminal 4): one non-motorized touring, mountain, tandem or racing bike in a hard case, bike bag or box, handlebars fixed sideways, pedals off (or pedals and bars wrapped in foam). Standard checked bag fee up to 50 lb, the standard overweight fee from 51 to 70 lb, and oversize fees do not apply. Not in a hard case, the bike is treated as fragile, and American is liable for damage only when the bike is in a hard case that is visibly damaged. First bag $50 ($45 paid online), second $60 ($55 online), updated May 18, 2026; a standard bag is 62 linear inches and 50 lb. Southwest (the other Terminal 4 carrier), Delta, United, Alaska, Frontier, JetBlue and Allegiant: not confirmed; read each airline's sports-equipment page before you book."
  },
  "ship": {
    "note": "No Valley shop says on its own site that it receives a shipped bike (Oct 2026). BikeFlights lists Moxie Multisport in Scottsdale as a partner to ship to; the shop's own site does not say it, so call before you book. Bike Emporium in south Scottsdale builds bikes bought elsewhere and boxes bikes for shipping, prices not published (Oct 2026), but does not say it takes in a carrier delivery. BikeFlights prices a shipment from the box's size and weight when you book, bigger and heavier costing more, and takes nothing over 150 lb or 165 inches in total size; its shipping-policy and rates pages give no transit-day count (Oct 2026).",
    "shops": []
  },
  "rent": {
    "note": "Bike Emporium in south Scottsdale is the one shop that publishes its fleet and prices: a 2023 carbon Cannondale SuperSix EVO with Shimano 105 and disc brakes, 48 to 61 cm, $90 per 24 hours; a 2024 Marin Kentfield 1 aluminum gravel bike, 7-speed, $60; a 2023 Cannondale Habit full-suspension MTB, $85 (Oct 2026). Pedals, helmet and flat kit included; a $50 non-refundable deposit holds one; closed Sundays. McDowell Mountain Cycles in Fountain Hills rents road, gravel, mountain and e-bikes and delivers to McDowell Mountain Regional Park, prices not published. Bike Barn in Phoenix rents road and mountain bikes through a booking page; Airpark Bike Co in Scottsdale rents mountain bikes for the dirt and you need a hitch rack. The math: on American a cased bike is $45 each way paid online when it is your only checked bag, $90 round trip (Oct 2026) — the price of one day on the carbon rental. Rent for a single day. For a training week or a winter month, bring yours, and bring your gravel bike: the one gravel rental with a published spec is a 7-speed.",
    "shops": [
      {
        "name": "Bike Emporium",
        "url": "https://www.bikeemporium.com/rentals",
        "note": "2023 Cannondale SuperSix EVO (carbon road, Shimano 105, disc), 48 to 61 cm, $90 per 24 hours; 2024 Marin Kentfield 1 (aluminum gravel, 7-speed), 49 to 59 cm, $60; 2023 Cannondale Habit (full-suspension MTB), S to XL, $85 (Oct 2026). Helmet, lock, cage, pedals and flat kit included. $50 non-refundable deposit to reserve a road, gravel or MTB. No e-bikes. Closed Sundays; Saturday 9 to 3. 8443 E. McDonald Dr., Scottsdale; (480) 991-5430."
      },
      {
        "name": "McDowell Mountain Cycles",
        "url": "https://mcdowellmountaincycles.com/bike-rentals/",
        "note": "Road, gravel, mountain and e-bikes; models, sizes and prices not published (Oct 2026). Helmet, pedals (limited clipless; ask at booking) and flat kit included; ID at pickup; $25 cancellation; car rack $40 a booking; delivers in Fountain Hills and to McDowell Mountain Regional Park, up to four bikes. Closed Sundays. 11879 N. Saguaro Blvd., Fountain Hills; (480) 272-8741."
      },
      {
        "name": "Bike Barn",
        "url": "https://www.bikebarnaz.com/articles/bike-rentals-pg978.htm",
        "note": "Road, mountain and city bikes, booked through the shop's online rental system; models, sizes and prices are not on its own pages (Oct 2026). Closed Mondays. 4112 N 36th St, Phoenix; (602) 956-3870."
      },
      {
        "name": "Airpark Bike Co (Scottsdale)",
        "url": "https://www.airparkbikeco.com/pages/mtb-rental-scottsdale",
        "note": "Mountain bikes only, from Santa Cruz, Yeti and Rocky Mountain; the current fleet and prices sit in an online booking listing, not on the page (Oct 2026). Photo ID and a matching credit card; pick up at the Scottsdale store; bring a hitch rack. Monday to Friday 9 to 6, Saturday 9 to 2, closed Sunday. 15745 Hayden Rd, Suite 117, Scottsdale; 480-596-6633."
      }
    ]
  },
  "get_around": {
    "car_needed": true,
    "note": "Yes. The riding is spread across the Valley: the shops in this guide run from Coronado, about 2 miles north of downtown, to south Scottsdale at about 11 miles, Chandler at about 14 and Fountain Hills at about 23. Out of PHX with a bike case: the free PHX Sky Train runs every 3 to 5 minutes, 24 hours, to the Rental Car Center, where 14 companies rent; reserve, because walk-up cars are limited. Early Bag Check at the Rental Car Center lets you check bags as you drop the car; ask your airline whether it takes a bike case there. Rideshare picks up at marked curbs at Terminals 3 and 4 and at the Rental Car Center visitor lot, and Waymo uses the same terminal spots around the clock. Taxis are $7 for the first mile and $2.60 a mile after, or a $20 flat rate to downtown Phoenix between Roosevelt and Lincoln streets and 7th Avenue and 7th Street (Oct 2026). Riding in or out on a built bike: the airport asks riders to lock up at the free racks at the 44th Street PHX Sky Train station (enter off Washington Street, heading south on 41st Place) and take the train to the terminals; locks left more than five days are removed. That station is also the Valley Metro Rail stop for Phoenix, Tempe and Mesa; bus 44 stops there and bus 13 at the 24th Street Sky Train station.",
    "transit_bike_rules": null,
    "bike_share": null
  },
  "rules_and_safety": "Heat, from the City of Phoenix, read Oct 2026: on days the National Weather Service issues an Extreme Heat Warning, these trails close from 8 a.m. to 5 p.m.: Echo Canyon and Cholla on Camelback Mountain; the Piestewa Peak Summit Trail and its associated trails in the Phoenix Mountains Preserve; and at South Mountain the Holbert, Mormon and Hau'pal Loop trails and the National Trail from the Pima Canyon Trailhead (the National Trail stays open from other trailheads, and the rest of Pima Canyon's trails stay open). The city's advice is to do outdoor activity in the coolest part of the day and drink water before, during and after.",
  "sources": [
    "https://www.skyharbor.com/flights/passenger-airlines/",
    "https://www.skyharbor.com/ground-transportation/phx-sky-train/",
    "https://www.skyharbor.com/ground-transportation/rental-cars/",
    "https://www.skyharbor.com/ground-transportation/ride-share/",
    "https://www.skyharbor.com/ground-transportation/taxis-shuttles/",
    "https://www.skyharbor.com/ground-transportation/public-transportation/",
    "https://www.skyharbor.com/ground-transportation/biking/",
    "https://www.aa.com/i18n/travel-info/baggage/specialty-and-sports.jsp",
    "https://www.aa.com/i18n/travel-info/baggage/checked-baggage-policy.jsp",
    "https://www.bikeflights.com/",
    "https://www.bikeflights.com/shippingpolicy",
    "https://www.bikeflights.com/dimensionsandrates",
    "https://www.bikeflights.com/partners/Moxie-Multisport",
    "https://www.bikeemporium.com/rentals",
    "https://www.bikeemporium.com/service",
    "https://mcdowellmountaincycles.com/bike-rentals/",
    "https://www.bikebarnaz.com/articles/bike-rentals-pg978.htm",
    "https://www.airparkbikeco.com/pages/mtb-rental-scottsdale",
    "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/heat-safety.html",
    "https://www.phoenix.gov/administration/departments/heat/heat-response-programs/heat-safety.html"
  ]
}
```

## Why these

- **PHX only.** The one airport fetched. Sky Harbor's own pages gave the airline list by terminal, the Sky Train, the Rental Car Center, rideshare and taxi curbs, the downtown flat fare and the bike racks at 44th Street — everything a rider with a case needs on landing.
- **American's page** — the one airline page that loaded, and one of the two Terminal 4 carriers people will fly in on with a bike. Quoted in plain words with the May 18, 2026 fee update.
- **Ship: empty on purpose.** The rule is the shop's own site; none says it. Moxie (a BikeFlights partner page) and Bike Emporium (builds and boxes) are named in the note as calls to make, not as listings.
- **Rent: four shops from shops.md.** Bike Emporium carries the math because it is the only one with prices. McDowell Mountain Cycles is the northeast fleet with delivery to the regional park. Bike Barn and Airpark are the Phoenix-side road/MTB and the dirt-zone MTB.
- **`car_needed: true`** — the shop distances alone make the case; the brief's zones (South Mountain, Fountain Hills/Rio Verde, Usery/Bush Highway) sit further apart again.
- **The heat rule** — the brief's hazard line, from the city's own trails page, with the exact trails and hours. It is a trail rule; the page doesn't say it covers roads like Summit Road, so the note doesn't either.

## Rejected

- **Tucson International (TUS)** — about 110 miles straight-line from downtown Phoenix; outside the 90-minute line. Not fetched. Tucson has its own guide.
- **Goodyear and Phoenix Deer Valley airports** — city-run general-aviation airports linked from skyharbor.com; no airline service on the page. Not fetched.
- **Secondary airline round-ups** — bikepackingreviews.com (updated Aug 10, 2026), athleticmindedtraveler.com, Outside, TravelAwaits, Orucase, Pinkbike, The Points Guy. Leads only; never a source for a fee. bikepackingreviews gave the addresses of Delta's, Southwest's and JetBlue's own pages, which then would not load.
- **The PHX Sky Train with a bike** — the airport recommends parking the bike at 44th Street "for safety reasons" before riding the train. Not offered as a way in with a built bike.
- **Waymo with a bike case** — the airport says Waymo picks up at the rideshare curbs; nothing about luggage size. Not advised either way.
- **Phoenix Bike Rentals** (bikeaz.org) — closed, hybrids only.
- **Cyclologic's "Road Bike Bag Pro"** ($400 a week, with packing and reassembly, Oct 2026) — a travel bag for a rider leaving Phoenix. Not a ship or rent line for a visitor.

## Couldn't confirm

- **Southwest** (Terminal 4) bike policy and bag fees — https://support.southwest.com/helpcenter/s/article/flying-with-a-bike-policy and https://www.southwest.com/html/customer-service/travel-fees.html; approval timed out on every try. Southwest and American are the two Terminal 4 carriers; this is the biggest hole in `airline_note`.
- **Delta** (https://www.delta.com/us/en/baggage/special-items/sporting-equipment), **Alaska** (https://www.alaskaair.com/content/travel-info/baggage/special-baggage/traveling-with-sporting-equipment and /checked-bags), **JetBlue** (https://www.jetblue.com/legal/fees) — approval timed out. **United, Frontier, Allegiant** — no page in hand. The LA guide read Alaska, Southwest and Delta in Sept 2026; an editor re-fetch of those pages would fill most of this.
- **Valley Metro bike rules** (`transit_bike_rules`) — https://www.valleymetro.org/how-to-ride/faqs, /how-to-ride, /how-to-ride/rail, /how-to-ride/airports and the "Ride On! How Bikes & Transit Work Together" page all returned only script and meta tags, no text. Needed: where bikes ride on light rail, hooks or standing room, any rush-hour limit, bus rack capacity, e-bikes, the Tempe Streetcar. Where to look: valleymetro.org in a browser; Valley Metro customer service 602-253-5000 (number from skyharbor.com).
- **Bike share** — none confirmed for Phoenix, Tempe or Scottsdale. Where to look: Valley Metro, City of Tempe and City of Phoenix transportation pages.
- **Phoenix-Mesa Gateway (AZA)** — https://www.gatewayairport.com/ timed out twice. Roughly 26 miles southeast of downtown by approximate coordinates; airlines unconfirmed. Worth a line for East Valley riders if its airline page loads.
- **Arizona law** (`rules_and_safety`) — passing distance, riding position, helmet rules by age, e-bike classes, sidewalk riding, stop-as-yield. https://www.azleg.gov/ars/28/00735.htm (twice) and https://azdot.gov/ timed out. Where to look: azleg.gov Title 28 (28-735, 28-812, 28-815), ADOT's bicycle safety page, the League of American Bicyclists' Arizona page for the overview.
- **The traffic read** — the City of Phoenix Road Safety Action Plan page (https://www.phoenix.gov/administration/departments/streets/safety-improvements/road-safety-action-plan/) timed out. Needed: the city's crash or bike-death numbers and a local source on drivers.
- **No daylight saving** — the brief asks the guide to say Phoenix keeps Arizona time all year (America/Phoenix). No page fetched here states it; one line from an official source would do.
- **BikeFlights transit days and carriers** — the home, shipping-policy and rates pages give neither; faq.bikeflights.com articles timed out.
- **Early Bag Check** — the airport's rental-car page says it exists at the Rental Car Center; which airlines take part, and whether they take a bike case, isn't on the page.
- **A wording difference on the heat rule.** The city's general heat-safety page says the closure covers "all trails associated with Piestewa Peak Trailhead in the Phoenix Mountains Preserve and South Mountain Park and Preserve"; the parks department's trails heat page names only Holbert, Mormon, Hau'pal Loop and the National Trail from Pima Canyon at South Mountain. The note uses the trails page's specific list. The editor might confirm with the parks department.
- **Ship-to-shop** — see shops.md: Moxie Multisport is the lead (BikeFlights partner page; own site silent).

### Hand-offs

- **@town-editor:** American's bag page reads "updated as of May 18, 2026" — same as the LA guide's note, so no change for LA. The other airline pages could not be read this run; nothing new to flag for other towns.
- **@route-scout:** the heat closure list above names South Mountain's Holbert, Mormon and Hau'pal Loop trails and the National Trail from Pima Canyon; worth a hazard line on any dirt route that uses them.

## Sources

- https://www.skyharbor.com/ground-transportation/
- https://www.skyharbor.com/ground-transportation/ride-share/
- https://www.skyharbor.com/ground-transportation/phx-sky-train/
- https://www.skyharbor.com/ground-transportation/rental-cars/
- https://www.skyharbor.com/ground-transportation/taxis-shuttles/
- https://www.skyharbor.com/ground-transportation/public-transportation/
- https://www.skyharbor.com/ground-transportation/biking/
- https://www.skyharbor.com/flights/passenger-airlines/
- https://www.aa.com/i18n/travel-info/baggage/specialty-and-sports.jsp
- https://www.aa.com/i18n/travel-info/baggage/checked-baggage-policy.jsp
- https://www.bikeflights.com/
- https://www.bikeflights.com/shippingpolicy
- https://www.bikeflights.com/dimensionsandrates
- https://www.bikeflights.com/partners/Moxie-Multisport
- https://faq.bikeflights.com (hub page only)
- https://www.bikeemporium.com/rentals
- https://www.bikeemporium.com/service
- https://mcdowellmountaincycles.com/bike-rentals/
- https://www.bikebarnaz.com/articles/bike-rentals-pg978.htm
- https://www.airparkbikeco.com/pages/mtb-rental-scottsdale
- https://www.cyclologic.com/rentals-1
- https://bikeaz.org/phoenix-bike-rentals/
- https://phoenix.gov/ (link list only)
- https://www.phoenix.gov/administration/departments/heat/heat-response-programs/heat-safety.html
- https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/heat-safety.html
- https://bikepackingreviews.com/posts/airline-bike-fees-policies (lead; airline page addresses only)
- https://www.valleymetro.org/how-to-ride/faqs (loaded, no text)
- https://www.valleymetro.org/how-to-ride (loaded, no text)
- https://www.valleymetro.org/how-to-ride/rail (loaded, no text)
- https://www.valleymetro.org/how-to-ride/airports (loaded, no text)
- https://www.valleymetro.org/commute-solutions/employer-transportation-coordinator-kits/spring-2022/ride-on (loaded, no text)
- research/towns/phoenix-az/shops.md — the ship and rent lists

Not fetched (approval timed out): the Southwest, Delta, Alaska and JetBlue pages above; https://www.azleg.gov/ars/28/00735.htm; https://azdot.gov/; https://www.gatewayairport.com/; https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails.html; https://www.phoenix.gov/administration/departments/streets/safety-improvements/road-safety-action-plan/; https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/take-a-hike-do-it-right.html; https://www.valleymetro.org/maps-schedules/SKYT; https://www.bikeflights.com/partners; two faq.bikeflights.com articles.
