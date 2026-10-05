# phoenix-az — shops

town: `phoenix-az` · agent: **shop-scout** · date: **2026-10-03**

Six shops, every one fetched on its own site: two in Scottsdale and the
northeast (south Scottsdale, Fountain Hills), two in Phoenix (Coronado, east
Phoenix on 36th Street), one in Tempe, one in the East Valley (Chandler).
Distances are straight-line estimates from downtown Phoenix (City Hall,
33.4484, -112.0740) using approximate coordinates for each address, not
geocoded ones — the verifier should recompute. Prices and hours are as read
on Oct 3, 2026.

The short version: rentals are good (Bike Emporium publishes a carbon road
bike, a gravel bike and a full-suspension MTB with prices; McDowell Mountain
Cycles rents all four kinds, unpriced). **Ship-to-shop is empty.** No shop
fetched says on its own site that it receives a shipped bike; the one lead
is a BikeFlights partner page for Moxie Multisport, whose own site would not
load (see Couldn't confirm). No shop states `same-day`; two say they fix
what they can on the spot or take walk-ins.

Search ran out: the session's 12 WebSearch calls were spent (8 on shops, 4 on
logistics). Several shop pages also refused to load (the fetch approval
timed out), listed at the foot of Sources.

## Findings

```json
[
  {
    "name": "Bike Emporium",
    "url": "https://www.bikeemporium.com/",
    "address": "8443 E. McDonald Dr., Scottsdale, AZ 85250",
    "phone": "(480) 991-5430",
    "services": ["repair", "rental", "rental-road", "rental-gravel", "rental-mtb"],
    "note": "South Scottsdale, at the southeast corner of Granite Reef and McDonald, in the plaza behind Walgreens; about 11 miles northeast of downtown Phoenix. The best published rental fleet in the Valley: a 2023 carbon Cannondale SuperSix EVO with Shimano 105 and disc brakes, sizes 48 to 61 cm, $90 per 24 hours; a 2024 Marin Kentfield 1 aluminum gravel bike, 49 to 59 cm, $60; a 2023 Cannondale Habit full-suspension MTB, S to XL, $85 (Oct 2026). Pedals, helmet, lock, cage and flat kit come with every rental; a $50 non-refundable deposit holds a road, gravel or mountain bike. No e-bikes. Builds bikes bought elsewhere and boxes bikes for shipping, prices not published. Monday to Friday 9 to 5, Saturday 9 to 3, closed Sunday."
  },
  {
    "name": "McDowell Mountain Cycles",
    "url": "https://mcdowellmountaincycles.com/",
    "address": "11879 N. Saguaro Blvd., Fountain Hills, AZ",
    "phone": "(480) 272-8741",
    "services": ["repair", "suspension", "rental", "rental-road", "rental-gravel", "rental-mtb", "rental-ebike", "shop-rides"],
    "note": "Fountain Hills, about 23 miles northeast of downtown Phoenix; the shop for the northeast loops and McDowell Mountain Regional Park. Rents road, gravel, mountain and e-bikes with helmet and pedals (a few clipless sets, so say so when you book) and a flat kit; ID at pickup, $25 to cancel, a car rack for $40 a booking, and delivery in Fountain Hills and to McDowell Mountain Regional Park. No rental prices on the site (Oct 2026); call. Service runs Alloy, Carbon and Titanium tune packages, the last with fork and shock service. {ride:fountain-hills-az-mcdowell-mountain-cycles-saturday-road-ride|The Saturday road ride} and {ride:fountain-hills-az-mcdowell-mountain-cycles-sunday-funday-gravel|Sunday FunDay gravel} leave from the door. Monday to Friday 8 to 5, Saturday 8 to 4, closed Sunday."
  },
  {
    "name": "The Velo",
    "url": "https://www.thevelo.com/",
    "address": "2317 N 7th St, Phoenix, AZ 85006",
    "phone": "(602) 759-8169",
    "services": ["repair", "fitting", "shop-rides"],
    "note": "Phoenix, in the Coronado neighborhood, about 2 miles north of downtown; the closest of these shops to a downtown or Roosevelt Row stay. Walk-ins welcome; a flat fix is $10, tune-ups $90, $150 and $250 (Oct 2026). Fits for road, gravel, mountain, tri and cleats, $90 to $180, 30 to 120 minutes; call or text to book. Custom builds. Runs a weekly shop ride from the door; see its Ride With Us page. Open every day: Monday to Friday 10 to 6, Saturday 10 to 4, Sunday 10 to 2."
  },
  {
    "name": "Bike Barn",
    "url": "https://www.bikebarnaz.com/",
    "address": "4112 N 36th St, Phoenix, AZ 85018",
    "phone": "(602) 956-3870",
    "services": ["repair", "fitting", "rental", "rental-road", "rental-mtb"],
    "note": "East Phoenix, on 36th Street, about 5 miles northeast of downtown. \"If we can fix it on the spot, we will\"; pick-up and delivery within 10 miles. Rents road, mountain and city bikes through an online booking page; prices and sizes are not on the shop's own pages (Oct 2026). Specialized Body Geometry fits by appointment: basic $90, comprehensive 2D $150 (Oct 2026). Closed Monday; Tuesday to Saturday 9 to 5, Sunday 11 to 4."
  },
  {
    "name": "Regroup Coffee + Bicycles",
    "url": "https://regroupwithus.com/",
    "address": "1205 N Scottsdale Rd, Tempe, AZ 85288",
    "phone": "(480) 648-8309",
    "services": ["repair", "fitting", "shop-rides", "coffee"],
    "note": "Tempe, on Scottsdale Road, about 9 miles east of downtown Phoenix. A café and a bike shop in one room, and the start of {ride:tempe-az-regroup-coffee-ride|the Regroup coffee ride}. Service is booked, not walk-in: Bronze $125, Silver $250, Gold $400 (Oct 2026). Fits with motion capture, saddle pressure mapping and AiRO; price not published. Bike shop: Monday by appointment, Tuesday to Friday 10 to 6, Saturday 10 to 4, closed Sunday (the shop's own service page shows shorter Friday and Saturday hours; call). Café opens at 6:30 every day but Monday."
  },
  {
    "name": "Global Bikes & E-Bikes Chandler North",
    "url": "https://www.globalbikes.info/about/chandler-n.-rental-center-pg2498.htm",
    "address": "2915 West Ray Road #10, Chandler, AZ 85224",
    "phone": "(480) 899-3625",
    "services": ["repair", "suspension", "shop-rides"],
    "note": "East Valley, at the southeast corner of Ray Road and the 101 next to Whole Foods, about 14 miles southeast of downtown Phoenix. One of five Global Bikes stores (Ahwatukee, Chandler North and South, Gilbert, Mesa); repairs regular bikes and e-bikes, from flats to fork and shock rebuilds and wheel building. The chain runs free rides and clinics every week; {ride:chandler-az-global-bikes-chandler-north-saturday-ride|the Chandler North Saturday ride} starts here. Open every day: Monday to Friday 10 to 7, Saturday 10 to 6, Sunday 11 to 4."
  }
]
```

### ship_and_rent

```json
{
  "ship": {
    "note": "No Valley shop says on its own site that it receives a shipped bike (Oct 2026). BikeFlights lists Moxie Multisport in Scottsdale as a partner to ship to; the shop's own site does not say it, so call before you book. Bike Emporium in south Scottsdale builds bikes bought elsewhere and boxes bikes for shipping, with no prices published (Oct 2026); it does not say it takes in a carrier delivery.",
    "shops": []
  },
  "rent": {
    "note": "Bike Emporium in south Scottsdale is the one shop that publishes its fleet and prices: a carbon Cannondale SuperSix EVO with Shimano 105, 48 to 61 cm, $90 per 24 hours; a Marin Kentfield 1 aluminum gravel bike, $60; a Cannondale Habit full-suspension MTB, $85 (Oct 2026). McDowell Mountain Cycles in Fountain Hills rents road, gravel, mountain and e-bikes and delivers to McDowell Mountain Regional Park, prices not published. Bike Barn in Phoenix rents road and mountain bikes through a booking page; Airpark Bike Co in Scottsdale rents mountain bikes and you need a hitch rack to take one away.",
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
  }
}
```

## Why these

- **Bike Emporium** — the rental shop. The only Valley shop that puts a carbon road bike, a gravel bike and a full-suspension MTB on its own page with sizes and a price. South Scottsdale, the nearer of the two northeast picks to Old Town. Repairs too.
- **McDowell Mountain Cycles** — the northeast shop: rents all four kinds of bike, delivers to McDowell Mountain Regional Park, and runs the Saturday road and Sunday gravel rides the brief names. Fountain Hills is where the Shea climb and the Rio Verde loops are, so a mechanical out there has somewhere to go.
- **The Velo** — the downtown-side shop: walk-ins, a $10 flat fix on the menu, fits at a published price, open seven days. For a rider staying downtown, on Roosevelt Row or in Coronado.
- **Bike Barn** — the second Phoenix pick: fixes on the spot when it can, picks up and delivers within 10 miles, rents road and mountain bikes, and fits at a published price. Fills the gap between downtown and Scottsdale.
- **Regroup Coffee + Bicycles** — Tempe: the café, the fit studio and the start of the Saturday Regroup coffee ride the brief names. Service is by booking, said plainly; it's the place to meet the Tempe riders, not the place for an emergency fix.
- **Global Bikes & E-Bikes Chandler North** — the East Valley pick: open every day, repairs from flats to shock rebuilds, and the Chandler North Saturday ride leaves from the door. One of five Global stores, so the chain covers Ahwatukee (South Mountain side), Gilbert and Mesa as well.
- **Airpark Bike Co** (rent block only) — the one shop page that confirms a high-end MTB rental for the dirt zone. Not one of the six because the rental is all it confirms for a visitor.

## Rejected

- **Cyclologic** (9376 E Bahia Drive, Suite D104, Scottsdale 85260; 480-699-5358) — fetched fit, service, rentals and shop-rides pages. Fit studio ($399 three-hour fit, $150 follow-up, $200 AiRO, Oct 2026), service tiers $79.99 to $399.99 and $80 an hour, and the Saturday 6:30 ride (`scottsdale-az-cyclologic-saturday-group-ride`, already in the directory). The only "rental" is a "Road Bike Bag Pro" at $400 a week with packing and reassembly — a travel bag for a rider leaving Phoenix, not a bike for one arriving. Closed Sunday and Monday. Left out to hold six: fit is covered by The Velo, Bike Barn and Regroup at lower published prices, and its ride is in the directory either way. The editor's first swap if a north Scottsdale shop is wanted near Gainey.
- **Landis Cyclery Tempe North** (2180 E Southern Ave, Tempe) — fetched. Four Valley stores, open every day, and "we strive to fix minor repair issues on the spot"; tune-ups from $89.99. Left out to hold six (Tempe already has Regroup), and its phone doesn't agree with itself: the store page says (480) 839-9383, the home page lists Tempe North as (480) 839-7383. A strong seventh if the editor wants a walk-in fix in Tempe; settle the number first.
- **Airpark Bike Co** as a full shop pick — the first fetch summary said "shipped bike assembly"; a word-for-word re-read of the same page found no sentence about shipping, assembly or fitting. Not ship-to-shop. Kept in the rent block only.
- **Phoenix Bike Rentals** (bikeaz.org) — the page says the operation has closed; it rented hybrids from a locker, by appointment.
- **Dynamite Bike Lab** (28170 N Alma School Pkwy #107, Scottsdale) — its rentals page loaded with no bike types or prices. Far north Scottsdale. Not listed.
- **Bike Emporium's cruisers, hybrids and kids' bikes** — on the same rental page; not the bikes this guide is about.
- **Bicycle Ranch Scottsdale** (15807 N. Frank Lloyd Wright Blvd., Trek store) — home page and Trek locator fetched: hours and repair/fit pages exist, nothing on rentals or shipped bikes. Not listed; a fallback for north Scottsdale.
- **The Pro's Closet "Top 5 Phoenix bike shops"** and the PMBC shop directory — leads only, never a source.
- **Yelp** — robots.txt blocks fetching; used for nothing.

## Couldn't confirm

- **Ship-to-shop, anywhere.** No fetched shop page says it takes in a bike shipped by BikeFlights, ShipBikes or a carrier. The best lead: **Moxie Multisport**, Scottsdale. BikeFlights' partner page says "Ship your bike, wheels and gear with confidence to Moxie Multisport for AZ." Its own site (moxiebikeshop.com) loaded with no address, hours or services; shop.moxiebikeshop.com/service/ returned 404; themoxiemultisport.com would not resolve. Argon 18's dealer page gives 2952 N Hayden Rd, Scottsdale 85251 and (480) 994-1174, and points to bicyclestorescottsdaleaz.com (not fetched) — a brand locator, not the shop. Where to look: phone the shop and ask whether it receives BikeFlights deliveries and what the build costs; its Google listing for address and hours; bicyclestorescottsdaleaz.com.
- **Same-day repair.** No site says "same day." The Velo says walk-ins welcome; Bike Barn and Landis say they fix small things on the spot. Where to look: phone; ask about event weekends (Valley of the Sun Stage Race, Feb 2027).
- **Rental prices** at McDowell Mountain Cycles (none published), Bike Barn (behind bikebarnaz.rentabikenow.com, not fetched) and Airpark (behind a HubTiger listing). Where to look: phone, or the booking pages.
- **Global Bikes rentals.** The Chandler North page's URL reads "rental-center" and the chain links a "Bicycle Rentals in Arizona" page (globalbikes.info/about/bicycle-rentals-in-arizona-pg516.htm), which would not load. The PMBC directory lists Global Bikes Gilbert under rentals. Not tagged. Where to look: that page, or phone (480) 899-3625.
- **Global Bikes fitting.** The chain's home and Chandler pages mention bike fitting and Body Geometry without saying which store; not tagged.
- **Global Bikes Ahwatukee and Mesa** store pages (the South Mountain and Usery/Bush Highway side) would not load. Where to look: globalbikes.info/contact/ahwatukee-bike-e-bike-shop-pg2499.htm and /contact/mesa-bike-e-bike-shop-pg2960.htm.
- **Landis Cyclery Central Phoenix and North Scottsdale** store pages would not load.
- **Airpark Bike Co Phoenix** (10401 N 32nd St, Unit H) MTB rental page would not load; it may be the closer pickup for the Phoenix Mountains Preserve, unconfirmed.
- **Bike Saviours** (Tempe) — a volunteer DIY co-op per The Pro's Closet; not fetched. Would fill the `diy` chip.
- **Regroup's Friday and Saturday shop hours** — the Visit Us page says Friday 10 to 6 and Saturday 10 to 4; the Bike Shop page says Friday and Saturday 10 to 2. Where to look: phone (480) 648-8309.
- **Bike-box storage** — no shop page mentions storing a case for the week. Cyclologic's weekly bag rental is the only box-related service found.
- **Parts stock** (Di2 chargers, sealant, hangers) — no page lists it; `parts` is tagged nowhere.
- **Goatheads and glass** — no shop page read mentions flats or thorns; the brief's flats line has no shop source yet.
- **Distances** are straight-line from approximate coordinates; the verifier should recompute from geocoded addresses.

### Hand-offs

- **@coffee-scout:** Regroup's café — opens 6:30 Tuesday to Sunday (closes noon Tuesday to Thursday, 2 Friday to Sunday), closed Monday, per its Visit Us page; Chacónne Patisserie pastries per its home page.
- **@community-scout:** The Velo's weekly shop ride, Wednesdays at 6 am from the shop in Coronado, Strava club for results — not in `rides.json`. Source: https://www.thevelo.com/ride-with-us. McDowell Mountain Cycles' page also lists a Thursday "Pedal & Pints + Social" from Fountain Hills Park, next date TBD (https://mcdowellmountaincycles.com/mmc-life/).

## Sources

- https://www.bikeemporium.com/
- https://www.bikeemporium.com/rentals
- https://www.bikeemporium.com/info
- https://www.bikeemporium.com/service
- https://mcdowellmountaincycles.com/
- https://mcdowellmountaincycles.com/bike-rentals/
- https://mcdowellmountaincycles.com/services/
- https://mcdowellmountaincycles.com/mmc-life/
- https://www.thevelo.com/
- https://www.thevelo.com/contact-5
- https://www.thevelo.com/new-services
- https://www.thevelo.com/ride-with-us
- https://www.bikebarnaz.com/
- https://www.bikebarnaz.com/articles/bike-rentals-pg978.htm
- https://www.bikebarnaz.com/articles/bike-service-repair-pg982.htm
- https://www.bikebarnaz.com/articles/bike-fitting-pg845.htm
- https://www.bikebarnaz.com/articles/contact-us-pg823.htm
- https://regroupwithus.com/
- https://regroupwithus.com/the-bike-shop/
- https://regroupwithus.com/the-bike-shop/service/
- https://regroupwithus.com/visit-us/
- https://www.globalbikes.info/
- https://www.globalbikes.info/about/chandler-n.-rental-center-pg2498.htm
- https://www.globalbikes.info/about/arizona-bike-shops-pg515.htm
- https://www.globalbikes.info/about/chandler-bike-shops-pg514.htm
- https://www.globalbikes.info/articles/ride-and-clinic-calendar-pg2857.htm
- https://www.airparkbikeco.com/
- https://www.airparkbikeco.com/pages/bike-shop-scottsdale
- https://www.airparkbikeco.com/pages/mtb-rental-scottsdale
- https://www.cyclologic.com/fit
- https://www.cyclologic.com/rentals-1
- https://www.cyclologic.com/service
- https://www.cyclologic.com/shoprides
- https://www.landiscyclery.com/
- https://www.landiscyclery.com/about/tempe-north-pg406.htm
- https://www.landiscyclery.com/about/bicycle-maintenance-repair-pg51.htm
- https://www.bikeflights.com/partners/Moxie-Multisport
- https://moxiebikeshop.com/
- https://www.argon18.com/en-us/dealers/united-states/arizona/scottsdale/moxie-multisport-bike-shop
- https://www.dynamitebikelab.com/pages/bike-rentals
- https://bikeaz.org/phoenix-bike-rentals/
- https://www.bicycleranch.com/
- https://www.trekbikes.com/us/en_US/store/61439/
- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=359034 (lead)
- https://www.theproscloset.com/pages/top-5-phoenix-bike-shops (lead)
- cfc-site/rides/rides.json — the ride slugs named in the notes

Not fetched (approval timed out, 404, or no DNS): https://www.cyclologic.com/ (home), https://www.airparkbikeco.com/pages/contact-us, https://www.airparkbikeco.com/pages/bike-repair-scottsdale, https://www.airparkbikeco.com/pages/mtb-rental-phoenix, https://www.landiscyclery.com/about/central-phoenix-pg408.htm, https://www.landiscyclery.com/about/north-scottsdale-pg407.htm, https://www.globalbikes.info/about/bicycle-rentals-in-arizona-pg516.htm, https://www.globalbikes.info/articles/bicycle-repair-services-pg156.htm, https://www.globalbikes.info/contact/ahwatukee-bike-e-bike-shop-pg2499.htm, https://thebicyclecellar.com/, https://shop.moxiebikeshop.com/service/ (404), https://shop.moxiebikeshop.com/shop/bicycle-service-shop/ (404), https://moxiebikeshop.com/scottsdale-location and https://www.themoxiemultisport.com/ (name did not resolve), https://www.yelp.com/biz/cyclologic-scottsdale (robots.txt).
