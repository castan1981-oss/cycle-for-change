# ojai-ca — logistics

town: `ojai-ca` · agent: **logistics-scout** · date: **2026-11-15** (first report; no earlier one)

One `bring_your_bike` object. `shops.md` had not landed when this was written,
so the ship and rent lists are from this run's own fetches and are thin. The
editor should overwrite both lists from @shop-scout's report when it lands.

What this run read on the source's own page:

- **Fly:** Santa Barbara Airport's airline and ground-transport pages (airlines
  page last modified Sept 29, 2026). Hollywood Burbank's FAQ and
  ground-transport page. Delta, American and Southwest bike pages; Delta and
  American bag fees. LAX, Alaska and Southwest's dollar figures are the LA
  guide's Sept 2026 read, marked as not re-read.
- **Transit:** Gold Coast Transit's bike page. The City of Ojai's Trolley
  pages (routes, fares, the general-information sheet effective Jan 1, 2026)
  and the City's "other public transportation" page. The trolley's hours and
  service area come from the Ojai TDA audit on VCTC's site (status date
  April 1, 2026). Pacific Surfliner's bike page.
- **Law:** CalBike's law page (modified Aug 24, 2026) and Vehicle Code 21760
  on california.public.law (verified Nov 11, 2026).
- **Trail:** VCTC's Biking Ventura County booklet (undated). The County Parks
  page for the Ojai Valley Trail was rejected by the county's server on two
  domains.
- **Roads:** Caltrans District 7's release on the Highway 33 tunnel work
  (Aug 12, 2026).
- **Shop:** The Mob Shop's own home, contact, rental, road, mountain,
  workshop and store-policy pages.

Distances are straight-line from the brief's centre (34.4492, -119.2467) to
each airport's coordinates. The airport coordinates were typed in, not
fetched (see Couldn't confirm). The road is longer than each figure.

`official_url`: **https://ojai.ca.gov/** — the City of Ojai's site, read this
run (trolley, fares and transit pages all live there). The brief's
`ojaicity.org` could not be fetched; the City's pages that loaded are on
ojai.ca.gov. `visitor_url`: **null** — no visitor bureau site loaded. The
Ojai Valley Museum's page says it runs the Ojai Valley Visitors Center at
Ojai Avenue and Blanche Street, but gives no visitor-site URL.

## Findings

```json
{
  "summary": "Bring it, and plan on a car. Ojai has no airport: Santa Barbara is about 34 miles west in a straight line, Burbank about 54 and LAX about 59 southeast, and nothing carries a bike case from any of them to town. Delta, American and Southwest all check a packed bike at the standard bag fee (Nov 2026), so flying with it costs less than renting. The Mob Shop downtown rents road, gravel and mountain bikes by advance booking only and is closed Tuesday and Wednesday; no Ojai shop says on its own site that it receives a shipped bike. Once you are in town with a built bike, you can ride to everything.",
  "fly": {
    "airports": [
      {
        "name": "Santa Barbara Airport",
        "code": "SBA",
        "miles": 34,
        "note": "The closest airport with airline service, about 34 miles west in a straight line; the drive is longer. Alaska (Portland, San Diego, Seattle), American (Dallas-Fort Worth, Phoenix), Delta (Salt Lake City), Southwest (Las Vegas, Oakland, Sacramento, Denver, San Diego) and United (Chicago, Denver, Los Angeles, San Francisco), per the airport's airlines page (last modified Sept 29, 2026). Uber and Lyft pick up in front of the terminal; taxis, rental cars and the Santa Barbara Airbus are listed on the airport's ground-transport page. That page says nothing about oversized bags and names no service to Ojai. 500 James Fowler Road, Santa Barbara."
      },
      {
        "name": "Hollywood Burbank",
        "code": "BUR",
        "miles": 54,
        "note": "About 54 miles southeast in a straight line. Alaska, Allegiant, American, Breeze, Delta, JetBlue, Southwest and United, per the airport's FAQ (Nov 2026). Ten rental car companies on site in one building, and an Amtrak and Metrolink station on Empire Avenue. The easier Los Angeles airport to get a rental car and a bike case out of. 2827 N Hollywood Way, Burbank."
      },
      {
        "name": "Los Angeles International",
        "code": "LAX",
        "miles": 59,
        "note": "About 59 miles southeast in a straight line; the most flights. Alaska, Southwest, Delta, American and United, per the airport's airline list as the LA guide read it in Sept 2026 (not re-read this run). Ride apps and taxis pick up at the LAX-it lot; rental car offices are off airport by shuttle (same Sept 2026 read). The Ojai Valley Inn's directions page has you on the 101 for about 50 miles, then Highway 33 for 14 more (Nov 2026)."
      }
    ],
    "airline_note": "Read on each airline's own page, Nov 2026, unless marked. Delta: a non-motorized touring or single-seat racing bike in a container built for bikes goes at the standard bag allowance and fee; over 50 lb pays the excess weight fee; 100 lb or more, or over 115 linear inches, is refused; a hard-shell bike case needs no release form, a soft bag signs a limited release; some Delta Connection flights exclude bikes. First bag $45, second $55, US domestic Main Cabin. American: one non-motorized touring, mountain, tandem or racing bike in a hard case, a bike bag or a box built for bikes; standard checked bag fee up to 50 lb, standard overweight fee from 50 to 70 lb, oversize fees do not apply; handlebars sideways, pedals off or wrapped; not in a hard case it is treated as fragile. Main Cabin first bag $50 at the airport or $45 online, second $60 or $55, for tickets issued on or after April 9, 2026; overweight is $30 for 50 to 53 lb and $100 for 53 to 70 lb. Southwest: a non-motorized single-seat bike is checked baggage at standard checked bag and overweight fees, oversize fees waived; over 100 lb or 115 inches is refused; pedals and handlebars removed and wrapped; cardboard or a soft case flies with a limited release. The Southwest bike page gives no dollar figures; the LA guide read $45 and $55 on Southwest's fee page in Sept 2026. Alaska: its page was not reached this run; the LA guide's Sept 2026 read has a cased bike as a standard checked bag, oversize waived and overweight waived to 70 lb, first bag $45, second $55. United: not confirmed; read its sports-equipment page before you book. Keep the case under 50 lb and it is one ordinary checked bag on every carrier confirmed here."
  },
  "ship": {
    "note": "No Ojai shop says on its own site that it receives or builds a shipped bike. The Mob Shop's contact, workshop and store-policy pages say nothing about shipping, boxing or assembly (Nov 2026); call (805) 272-8102 before you send anything, and remember it is closed Tuesday and Wednesday. Carrier pages were not re-read this run. The LA guide's Sept 2026 read: BikeFlights ships by UPS, states no transit-day count and says to allow an extra day or two for weather; ShipBikes, also UPS ground, says no more than 6 business days one way in the continental US. If a shop agrees to take it, ship at least a week ahead.",
    "shops": []
  },
  "rent": {
    "note": "One shop in town rents bikes a rider would want: The Mob Shop, downtown. Its site lists road, gravel, mountain, electric, town and family bikes, and says to book in advance, no walk-ins. The models, sizes and prices sit in a booking tool that did not load, so none are given here; call or email with your height. No other Ojai rental fleet was confirmed this run. The math: a bike case is a standard checked bag on Delta, American and Southwest, about $90 round trip on Delta or American paid online (Nov 2026). Renting saves the case and the airport, and it suits a one-ride visit or the people who drove up to meet a Center Ride Out rider. For a fit you depend on, or a visit that covers a Tuesday or Wednesday, bring yours.",
    "shops": [
      {
        "name": "The Mob Shop",
        "url": "https://www.themobshop.com/articles/rental-bikes-pg202.htm",
        "note": "Road, gravel, mountain, electric and town bikes. Book in advance; no walk-ins. Prices, models and sizes not readable on the page (Nov 2026). Helmet with every rental; a full refund if you cancel more than 24 hours ahead, half inside 24 hours; no e-bikes for riders under 16. Monday, Thursday, Friday 10 to 5; Saturday 9 to 5; Sunday 9 to 4; closed Tuesday and Wednesday. A post-ride stop on a Saturday, not a pre-ride one. 110 W Ojai Ave; (805) 272-8102; ride@themobshop.com."
      }
    ]
  },
  "get_around": {
    "car_needed": true,
    "note": "To get here with a bike case, yes. Ojai has no airport and no train. The nearest airline airport is Santa Barbara, about 34 miles west in a straight line; Burbank and LAX are about 54 and 59 southeast. None of the airport ground-transport pages read this run names a shuttle to Ojai, and a bus rack takes a built bike, not a box. Rent a car at the airport, or book a large rideshare and expect the case to ride in the back. From Santa Barbara the Ojai Valley Inn's directions page gives two ways off the 101: Highway 33 from Ventura, 14 miles to town, or Route 150 over Casitas Pass, which it advises against in rain, at night or if you do not know the road (Nov 2026). Once you are in Ojai with a built bike you do not need the car: the town is 4.4 square miles, the one bike shop is downtown, and the Ojai Valley Trail runs 15 miles down the valley to Ventura (VCTC's bike booklet). Center Ride Out riders arrive on the bike; this is for the people driving up to meet them.",
    "transit_bike_rules": "Gold Coast Transit Route 16 links downtown Ojai (stops at the Y, Blanche, Signal and the Park n' Ride, per the City) with the Ventura Transit Center at Pacific View Mall (per the Ojai transit audit, April 2026). Gold Coast's bike page, read Nov 2026: every fixed-route bus has a front rack for three bikes, first come, first served; the bike rides free; tell the driver before you load, and load from the curb side. E-bikes that do not fold go on the rack; batteries must be sealed lithium-ion; no gas-powered or homemade bikes. A folded bike can come aboard if it is secured and out of the aisle. The page gives no size or weight limit, and the district takes no responsibility for damage. The Ojai Trolley is the City's own bus: one route along Ojai Avenue and Maricopa Highway, out to Meiners Oaks and Mira Monte, about hourly, weekdays roughly 6:30 am to 7:30 pm and weekends roughly 7 am to 8 pm, every day but seven holidays (audit, April 2026; the City's page). $1.50 a ride or $4 a day, exact fare, free with a transfer from Gold Coast (effective Jan 1, 2026). Nothing the City publishes says whether the trolley carries bikes; ask at (805) 646-5581 ext. 207. The nearest train is the Pacific Surfliner in Ventura, about 12 miles south in a straight line: a full-size bike rides free with a reserved bike space, up to 50 lb and 4-inch tires, standard e-bikes included (Pacific Surfliner's bike page, Nov 2026).",
    "bike_share": {
      "name": null,
      "url": null,
      "note": "No bike share in Ojai turned up on any page read this run. Rent from the shop."
    }
  },
  "rules_and_safety": "California, read Nov 2026. Drivers must give three feet when passing a bike (Vehicle Code 21760); where a second lane runs the same way, the driver moves into it to pass if that is practicable; where three feet is not possible, the driver slows to a reasonable speed and passes only when it does not endanger the rider. The fine is $35, or $220 if a collision injures the rider (statute verified Nov 11, 2026). Helmets are required under 18 (21212). E-bikes come in three classes (312.5): class 1 pedal-assist to 20 mph, class 2 throttle to 20 mph, class 3 pedal-assist to 28 mph with a speedometer, rider 16 or older and helmeted. Ride as far right as practicable except when passing, turning left, avoiding a hazard or in a lane too narrow to share (21202). No earbuds in both ears (27400). At night, a white headlight and a red rear reflector or light (21201). Sidewalk riding is set city by city (21206); Ojai's own rule was not confirmed this run, so walk the bike under the Arcade. CalBike's page (modified Aug 24, 2026) does not list a stop-as-yield law; a rider may go on the walk signal (21456). On the Ojai Valley Trail, class 1 and class 2 e-bikes are allowed; class 3 is not allowed on shared-use paths unless a local ordinance says so (VCTC's bike booklet, undated). The read: the valley floor and the trail are the quiet miles, and the state highways out of town are mountain roads. The Ojai Valley Inn's own directions page tells drivers to skip Route 150 over Casitas Pass in rain, at night or if they do not know it (Nov 2026). A rider was killed on Cuyama Road near Del Norte Road in Ojai on Aug 7, 2020, on what BikinginLA, citing the Ojai Valley News, called a narrow two-lane country road with no shoulders. On Highway 33 north of town, Caltrans is rebuilding three tunnels near Wheeler Gorge (post miles 18.2 to 19.0); it shut the road to everyone for 55 hours on Aug 28 to 31, 2026, and expects to finish in winter 2026/2027 (Caltrans release, Aug 12, 2026). Check Caltrans before you plan that climb.",
  "sources": [
    "https://flysba.santabarbaraca.gov/fly-sba",
    "https://flysba.santabarbaraca.gov/flights-and-airlines",
    "https://flysba.santabarbaraca.gov/terminal/ground-transportation",
    "https://www.hollywoodburbankairport.com/about-us/faq/",
    "https://www.hollywoodburbankairport.com/ground-transportation/",
    "https://www.ojaivalleyinn.com/how-to-get-to-ojai",
    "https://www.delta.com/us/en/baggage/special-items/sporting-equipment",
    "https://www.delta.com/us/en/baggage/overview",
    "https://www.aa.com/i18n/travel-info/baggage/specialty-and-sports.jsp",
    "https://www.aa.com/i18n/customer-service/support/optional-service-fees.jsp",
    "https://support.southwest.com/helpcenter/article/flying-with-a-bike-policy",
    "https://www.themobshop.com/",
    "https://www.themobshop.com/articles/rental-bikes-pg202.htm",
    "https://www.themobshop.com/articles/road-bikes-pg237.htm",
    "https://www.themobshop.com/articles/mountain-bikes-pg244.htm",
    "https://www.themobshop.com/articles/workshop-pg198.htm",
    "https://www.themobshop.com/articles/store-policies-pg59.htm",
    "https://www.themobshop.com/about/contact-pg141.htm",
    "https://www.gctd.org/fares-rider-guide/how-to-ride/bicycles/",
    "https://ojai.ca.gov/345/Trolley-Routes",
    "https://ojai.ca.gov/184/Fares",
    "https://ojai.ca.gov/DocumentCenter/View/1753/Schedule-General-Information",
    "https://ojai.ca.gov/469/Other-Public-Transportation",
    "https://www.goventura.org/wp-content/uploads/2026/06/Ojai-Trollley-2026.pdf",
    "https://www.goventura.org/wp-content/uploads/2023/03/003_BikeBooklet_V8.pdf",
    "https://www.pacificsurfliner.com/pages/how-to-bring-your-bicycle-on-board/",
    "https://www.calbike.org/go_for_a_ride/california_bicycle_laws/",
    "https://california.public.law/codes/vehicle_code_section_21760",
    "https://dot.ca.gov/caltrans-near-me/district-7/district-7-news/state-route-33-extended-weekend-full-closure-north-of-ojai-aug-28-31-2026",
    "https://bikinginla.com/2020/08/08/woman-killed-riding-bike-in-ojai-collision-tenth-socal-bike-death-in-past-30-days"
  ]
}
```

## Why these

- **SBA, about 34 miles** — the closest airport with airlines, and all five big US carriers fly it. The airport's own page gave the roster and the cities.
- **BUR, about 54 miles** — more carriers than SBA, ten rental car counters in one building. The airport's own FAQ.
- **LAX, about 59 miles** — the most flights. Carried from the LA guide's Sept 2026 read and marked that way; only the driving line is new.
- **Delta, American, Southwest on their own pages** — the three bike policies read this month. All three put a cased bike at the standard bag fee; that is what the rent-or-bring math runs on.
- **Alaska and Southwest's dollar figures from the LA guide** — dated Sept 2026 and marked "not re-read". The editor can drop them to "not confirmed".
- **The Mob Shop in the rent list** — its own site lists road, gravel and mountain rentals and is clear on booking, hours and cancellation. No prices, and the note says so.
- **Empty ship list** — no shop says it. An empty list beats a guess.
- **`car_needed: true`** — no airport, no train, no shuttle named on any airport page, and a bus rack does not take a box. The note says where the car stops mattering.
- **Gold Coast Transit** — its own bike page: three-bike racks, e-bikes allowed, free.
- **Ojai Trolley** — the City's own pages for fares and days; the VCTC audit for hours and the Meiners Oaks and Mira Monte reach. Honest that no page mentions bikes.
- **Pacific Surfliner** — the one train a rider could pair with the Ojai Valley Trail; its own bike page.
- **The law from CalBike and the statute** — same sources the other California guides use, re-read this run.
- **The traffic read** — a resort telling its own guests to avoid Route 150 at night, one dated fatality with a place, and Caltrans on the Highway 33 tunnels. No road is called safe.

## Rejected

- **Oxnard Airport (OXR)** — about 17 miles south, but no page read this run shows airline service there. Not listed.
- **Bicycles of Ojai** (108 Canada St) — the only page that loaded was a MapQuest listing marked "Closed", with no phone, hours or site. Not listed for rentals or shipping. @shop-scout's to settle.
- **Trails by Potter** — tour outfit with hybrid bikes, named on ojaihub.com in copy that dates from 2018. Not a rental a rider wants, and not confirmed open.
- **ojaihub.com's Mob Shop and biking pages** — undated, 2018-era tour prices. Leads only; no figure used.
- **ojaifestival.org's Mob Shop post** — gives hours (weekdays 10 to 6) that differ from the shop's own site. The shop's site wins.
- **The Mob Shop's mountain-bike page as a rental source** — what loaded was three demo e-mountain bikes (Pivot Shuttle, Specialized Levo; one-hour blocks, $75, credited to a purchase). That is a test ride, not a rental. Not used for a price.
- **Trek Bicycle Ventura** — surfaced in search; not fetched. No sign it rents or receives shipments. @shop-scout's.
- **ecode360.com/44608600** — a municipal code line banning sidewalk riding in a business district. The page did not name the city, so it is not used as Ojai's rule.
- **gocodebook.com's Ojai page** — a table of state code references, no city bike rule in it.
- **ojaihub.com's "9-mile" Ojai Valley Trail** — conflicts with VCTC's "15 miles each way" (which counts the path through to Ventura). VCTC is the agency; @route-scout has the trail.
- **Third-party airline fee guides** (Points Guy, NerdWallet, lugless, Upgraded Points) — never a source for a fee.
- **Motorcycle crash reports on Highways 33 and 150** (search results) — not bike crashes; not fetched.
- **Caltrans' "SR-33 emergency repairs" project page** — returned "content not available". Not used.

## Couldn't confirm

- **`visitor_url`** — null. No Ojai visitor bureau site loaded or surfaced in search. Leads: the Ojai Valley Museum runs the Visitors Center at Ojai Avenue and Blanche Street; an Edible Ventura County listing gives an "Ojai Visitors Bureau" phone, 805-640-3606, with no URL.
- **`official_url`** — ojai.ca.gov is confirmed as the City's site. The brief's ojaicity.org was not fetchable from this session; it may redirect. The editor should check which one the City uses as its front door.
- **The town centre** — no city or geocoder page gave a downtown point. The brief's 34.4492, -119.2467 stands.
- **Airport miles** — straight-line, from airport coordinates typed in rather than fetched (SBA 34.4262, -119.8404; BUR 34.2007, -118.3585; LAX 33.9416, -118.4085). Drive miles and drive times: no page read gives a total. The verifier should re-measure from each airport's own page.
- **The Mob Shop's rental prices, models and sizes** — in a booking tool that did not render. Call (805) 272-8102 or read the page in a browser.
- **The Mob Shop's home page event** — "Black Friday e-bike group ride, Friday, Nov 28". Nov 28 is a Saturday in 2026 and was a Friday in 2025, so that block may be a year old. The hours on the same page match the Locally listing, so the shop reads as open; @shop-scout or the verifier should confirm by phone.
- **Any ship-to-shop in Ojai or Ventura** — none found. Where to look: @shop-scout's report; a call to The Mob Shop; the Ventura shops.
- **Same-day repair, boxing and build fees at The Mob Shop** — the workshop page lists tune prices ($39 wash to $399 pro tune, Nov 2026) and nothing on turnaround, boxing or builds.
- **Bikes on the Ojai Trolley** — the City's routes page, fares page, information sheet and the TDA audit all say nothing. Call (805) 646-5581 ext. 207.
- **Gold Coast Route 16's schedule, fare and exact route** — the City's page names the Ojai stops; the audit names the Ventura end. The route's own schedule page was not reached. Whether it passes the Ventura train station is not known.
- **A shuttle from any airport to Ojai** — none named on the SBA or BUR pages. Ventura County Airporter and Santa Barbara Airbus were not fetched; neither is known to reach Ojai.
- **Alaska and United bike pages** — neither surfaced in a search, so neither could be fetched. Alaska rides on the LA guide's Sept 2026 read; United is unconfirmed, as in LA.
- **Southwest's bag fee amounts** — the bike page gives none. The $45 and $55 are the LA guide's Sept 2026 read.
- **BikeFlights and ShipBikes** — not re-read; LA guide's Sept 2026 lines quoted as such.
- **Ojai's sidewalk rule and any city e-bike rule** — the municipal code's own bicycle sections were not reached. Where to look: Title 4 or the traffic chapter of the Ojai Municipal Code on ecode360.
- **The County's Ojai Valley Trail page** — venturacounty.gov and ventura.org both returned "Request Rejected". Trail hours, speed limit and any closure are not confirmed here. The e-bike line is VCTC's, and the booklet carries no date.
- **Highway 33 today** — the Aug 2026 release is the newest thing read. Whether more weekend closures are set before the winter 2026/2027 finish, or for April 2027, is not known. Check Caltrans District 7 news and QuickMap.
- **A crash dashboard or count for Ojai** — none found. The 2020 fatality is one event, six years old; the Sheriff's "Ojai fatal traffic collision" page was rejected by the county's server. Where to look: the Ojai Valley News, the City's Active Transportation Plan, UC Berkeley's TIMS.
- **Heat, fire season and forest closures** — not read this run. @route-scout's `best_months`, or a Los Padres National Forest alerts page.

## Hand-offs

- **Editor, every California town:** 21760 reads the same as in October ($35, $220; verified Nov 11, 2026). CalBike's page is unchanged since Aug 24, 2026.
- **Editor, every town American serves:** American's fee page now splits Basic Economy from Main Cabin. Main Cabin is still $45 online and $50 at the airport for the first bag (tickets from April 9, 2026). Basic Economy is $50 online and $55 at the airport (tickets from May 18, 2026). The LA and Palm Springs notes say "updated May 18, 2026" without the split. It also now publishes the overweight steps: $30 for 50 to 53 lb, $100 for 53 to 70 lb.
- **Editor, every town BUR serves:** Burbank's FAQ now lists Alaska, Allegiant, American, Breeze, Delta, JetBlue, Southwest and United. The LA guide (Sept 2026) has Frontier and Spirit and lacks Allegiant and Breeze.
- **@shop-scout:** The Mob Shop is closed Tuesday and Wednesday and opens at 9 on Saturday and Sunday. Rentals are advance booking only. Bicycles of Ojai shows "Closed" on MapQuest.
- **@route-scout:** VCTC's booklet has the Ojai Valley Trail at 15 miles each way, paved, climbing gently from Ventura to Ojai, class 1 and 2 e-bikes allowed. The Highway 33 tunnel work sits at post miles 18.2 to 19.0, just south of Wheeler Gorge campground, due to finish winter 2026/2027. The Mob Shop has a routes page (themobshop.com/articles/routes-pg209.htm) and an East End Loop page.
- **@community-scout:** The Mob Shop's home page advertises a group ride with coffee at 8:30 and a 9 am roll, but the date on it looks like 2025. It has an events page (themobshop.com/articles/events-pg208.htm).
- **@culture-scout / editor:** The Ojai Valley Museum's page says the Visitors Center is closed for remodeling and resumes normal hours Thursday, November 19 (year not stated; Nov 19 is a Thursday in 2026). Normal hours Thursday to Sunday, 10 to 4.

## Sources

Fetched Nov 15, 2026:
- https://flysba.santabarbaraca.gov/fly-sba
- https://flysba.santabarbaraca.gov/flights-and-airlines
- https://flysba.santabarbaraca.gov/terminal/ground-transportation
- https://www.hollywoodburbankairport.com/about-us/faq/
- https://www.hollywoodburbankairport.com/ground-transportation/
- https://www.ojaivalleyinn.com/how-to-get-to-ojai
- https://www.delta.com/us/en/baggage/special-items/sporting-equipment
- https://www.delta.com/us/en/baggage/overview
- https://www.aa.com/i18n/travel-info/baggage/specialty-and-sports.jsp
- https://www.aa.com/i18n/customer-service/support/optional-service-fees.jsp
- https://support.southwest.com/helpcenter/article/flying-with-a-bike-policy
- https://www.themobshop.com/
- https://www.themobshop.com/articles/rental-bikes-pg202.htm
- https://www.themobshop.com/articles/road-bikes-pg237.htm
- https://www.themobshop.com/articles/mountain-bikes-pg244.htm
- https://www.themobshop.com/articles/workshop-pg198.htm
- https://www.themobshop.com/articles/store-policies-pg59.htm
- https://www.themobshop.com/about/contact-pg141.htm
- https://www.locally.com/retailer/42025 (The Mob Shop's address and hours, second signal)
- https://www.gctd.org/fares-rider-guide/how-to-ride/bicycles/
- https://ojai.ca.gov/345/Trolley-Routes
- https://ojai.ca.gov/184/Fares
- https://ojai.ca.gov/DocumentCenter/View/1753/Schedule-General-Information
- https://ojai.ca.gov/469/Other-Public-Transportation
- https://www.goventura.org/wp-content/uploads/2026/06/Ojai-Trollley-2026.pdf (City of Ojai TDA audit, FY 2023 to 2025)
- https://www.goventura.org/wp-content/uploads/2023/03/003_BikeBooklet_V8.pdf (VCTC, Biking Ventura County)
- https://www.pacificsurfliner.com/pages/how-to-bring-your-bicycle-on-board/
- https://www.calbike.org/go_for_a_ride/california_bicycle_laws/
- https://california.public.law/codes/vehicle_code_section_21760
- https://dot.ca.gov/caltrans-near-me/district-7/district-7-news/state-route-33-extended-weekend-full-closure-north-of-ojai-aug-28-31-2026
- https://bikinginla.com/2020/08/08/woman-killed-riding-bike-in-ojai-collision-tenth-socal-bike-death-in-past-30-days
- https://www.ojaivalleymuseum.org/visitor-center
- https://edibleventuracounty.ediblecommunities.com/guide/ojai-visitors-bureau (lead only)
- https://www.ojaihub.com/ojai-business/the-mob-shop/ (rejected)
- https://www.ojaihub.com/explore-ojai/outdoors/biking-in-ojai/ (rejected)
- https://ojaifestival.org/?p=6360 (rejected)
- https://startpage.mapquest.com/us/california/bicycles-of-ojai-11552638 (rejected)
- https://ecode360.com/44608600 (rejected; city not named)
- https://gocodebook.com/library/us/ca/ojai/sr.080.-vehicles-and-traffic (rejected)

Read from the repo, not the web:
- data/towns/los-angeles-ca.json and research/towns/los-angeles-ca/logistics.md — the LAX note, the Alaska line, Southwest's $45 and $55, and the BikeFlights and ShipBikes lines, all read Sept 2026
- research/towns/ojai-ca/brief.md — the centre for the straight-line miles

Did not load or could not be fetched: https://www.ojaicity.org/ (not fetchable from this session), https://venturacounty.gov/parks-department/?p=359 and https://ventura.org/parks-department/?p=359 (Request Rejected), https://sheriff.venturacounty.gov/ojai-fatal-traffic-collision-2 (Request Rejected), https://venturacounty.gov/?p=170 (Request Rejected), https://www.dot.ca.gov/caltrans-near-me/district-7/district-7-projects/d7-sr33-emergency-highway-repairs (content not available), Alaska's and United's baggage pages (not reachable from this session).
