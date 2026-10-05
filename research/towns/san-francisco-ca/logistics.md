# san-francisco-ca — logistics

town: `san-francisco-ca` · agent: **logistics-scout** · date: **2026-10-03**

One `bring_your_bike` object. Every fee and rule comes from a page fetched
this run and carries the month it was read (Oct 2026). Airport miles are
straight-line from City Hall (37.7793, -122.4193), using OpenStreetMap geocodes.
The ship and rent shop lists are lifted from `shops.md` (@shop-scout, today),
not re-checked.

Search ran out: all 12 WebSearch calls in this session's budget were used
across both sections. The rest of this report comes from pages fetched by
name. WebFetch only loaded URLs that had come up in a search, so most pages
here were read with `curl` through the session proxy. That includes JSON
embedded in the page for Alaska. United's page couldn't be read either way,
and Southwest's bike article only renders with JavaScript. Both are in
Couldn't confirm.

## Findings

```json
{
  "summary": "Bring it, unless the trip is a day or two. Alaska, Delta and American check a packed bike as a standard bag, $45 each way (Oct 2026; $50 at the airport on American). SFO has bike assembly stations, so you can build the bike at the airport and take BART into the city. To skip the flight with it, Columbus Cyclery in North Beach builds a shipped bike for $135, and Sports Basement and High Trails rent carbon road and gravel bikes from $100 a day (Oct 2026). You don't need a car: the Golden Gate Bridge is open to bikes around the clock, and BART, Caltrain and the Golden Gate ferries all carry bikes.",
  "fly": {
    "airports": [
      {
        "name": "San Francisco International",
        "code": "SFO",
        "miles": 11,
        "note": "About 11 miles south of City Hall. Alaska, American, Delta, Frontier, JetBlue and Sun Country use Harvey Milk Terminal 1; Southwest uses Terminal 2; United domestic uses Terminals 2 and 3 (SFO's airline list, Oct 2026). Bike assembly stands are in International Terminal Courtyards A and G and on Level 1 of the Rental Car Center. The Airport Travel Agency, in the International Terminal by the G-gate checkpoint, sells airline-approved bike boxes and has a stand and tools, 6 am to 11 pm daily, 650-877-0422. BART leaves from the International Terminal, reached free on AirTrain. Ride apps pick up on Level 5 of the Domestic Garage. Rental cars are at the Rental Car Center on the AirTrain Blue Line. Riding out: bikes are banned on the main airport roadways; the marked route uses North and South McDonnell Road from San Bruno Avenue or Millbrae Avenue."
      },
      {
        "name": "Oakland San Francisco Bay Airport",
        "code": "OAK",
        "miles": 12,
        "note": "About 12 miles southeast of City Hall, across the bay; the door for the East Bay hills. Alaska, Delta, Frontier, Hawaiian, Southwest, Volaris, JSX and Advanced Air (the airport's airline list, Oct 2026). The BART station is across the street from the terminals, and an 8-minute ride reaches Coliseum and the rest of BART. Bikes are banned on that connector's narrow escalators, so use the elevator. Rental cars are a shuttle ride away at the Rental Car Center; the shuttle stops at the third curb outside Terminals 1 and 2."
      },
      {
        "name": "San José Mineta International",
        "code": "SJC",
        "miles": 39,
        "note": "About 39 miles southeast of City Hall, at the far end of the Peninsula. Alaska, American, Delta, Frontier, Hawaiian, Southwest, United, Volaris and ZIPAIR (the airport's airline list, Oct 2026). A fallback fare for the city. Ground transport wasn't read this run."
      }
    ],
    "airline_note": "Read on each airline's own page, Oct 2026. Alaska: a non-motorized bike is on its list of sports equipment that pays the standard checked-bag fee, with the oversize fee waived and the overweight fee waived up to 70 lb. Over 115 linear inches pays oversize; over 70 lb pays overweight. Pack in a soft or hard bike case or the maker's box, one bike per case, handlebars sideways, pedals off. First bag $45, second $55 for flights ticketed on or after April 10, 2026. Southwest: its fee page says sports equipment on its Help Center list is a standard bag, oversize fees are waived, overweight fees still apply ($100 extra for 51 to 70 lb, $200 for 71 to 100 lb), and a limited release of liability may apply. First bag $45, second $55 for travel booked on or after April 9, 2026. Its bike article didn't load this run. Delta: a non-motorized touring or single-seat racing bike in a container built for bikes goes at the standard bag allowance and fee; over 50 lb pays the excess weight fee; over 115 linear inches or 100 lb is refused; a soft bag means signing a limited release, a hard case doesn't. First bag $45, second $55, US domestic Main and Comfort. American: one non-motorized bike in a hard case, bike bag or box pays the standard checked-bag fee up to 50 lb and the standard overweight fee from 51 to 70 lb; oversize fees don't apply. Handlebars fixed sideways, pedals off or wrapped. Outside a hard case it's treated as fragile. First bag $45 online or $50 at the airport, second $55 or $60 (updated May 18, 2026). United: not confirmed; its page didn't load. Check it before you book. Keep the case under 50 lb and on Alaska, Delta and American it's one ordinary checked bag; on Southwest, check that bikes are on its list before you fly."
  },
  "ship": {
    "note": "One shop says it on its own site: Columbus Cyclery in North Beach takes a bike shipped to the shop and builds and tunes it in 24 to 48 hours for $135, $190 for an e-bike (Oct 2026). It holds the bike free for a few days, then charges $13 a day, and boxes it for the trip home for $115, or $135 with accessories. It doesn't service tubeless or tubular tires, so bring your own sealant. Sports Basement builds a boxed bike bought elsewhere for $155 (new) or $120 (used) and boxes one for $110. Valencia Cyclery boxes for BikeFlights from $120 (Oct 2026). Neither says it will receive a shipment; call first. BikeFlights works out the ship date from your trip dates and says to allow an extra day or two for weather. ShipBikes ships by UPS Ground, no more than 6 business days one way within the continental US (both read Oct 2026). Ship a week ahead.",
    "shops": [
      {
        "name": "Columbus Cyclery",
        "url": "https://columbuscyclery.com/bike-assembly-tune-up/",
        "note": "Ship your bike to the shop; they assemble and tune it in 24 to 48 hours. $135, $90 single speed, $190 e-bike (Oct 2026). Free storage for 5 days after assembly per this page (the repair page says 7), then $13 a day. Boxing for the return: $115 bare, $135 with accessories. No tubeless or tubular service. Open every day 10 to 6. 2011 Mason Street, North Beach; (415) 561-9999."
      }
    ]
  },
  "rent": {
    "note": "San Francisco rents real bikes, gravel included. Sports Basement Presidio, nearest the bridge, rents a carbon Synapse or Addict road bike (Shimano 105 or better, 44 to 61 cm) or a Topstone Carbon gravel bike for $100 a day, $175 for 2 to 4 days and $300 for 5 to 9 days. A Dura-Ace Synapse is $135 a day. It's open every day and rents a Thule bike case too. High Trails Cyclery on Polk Street has a Caledonia-type carbon road bike at $100 and an Aspero-type gravel bike at $125 a day, with the pedals you choose. It's closed Sundays; call, because its rental page may be dated. Columbus Cyclery rents race bikes at $59 a day with no model listed (all prices Oct 2026). The math: flying the bike as your first bag costs $90 round trip on Alaska, Delta or American (paid online), $110 as a second bag. So a one-day rental is about a wash, and a weekend rental costs $65 to $85 more but skips the case, the build and the haul in from SFO. A week, a fit you depend on, or your own pedals and saddle: bring yours. Tam's trails: Splitrock in Fairfax rents full-suspension and e-MTBs, prices not published.",
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
  },
  "get_around": {
    "car_needed": false,
    "note": "No. The bridge, the Headlands and Golden Gate Park start inside the city. BART carries bikes to the East Bay hills, Caltrain to the Peninsula climbs, and the Golden Gate ferries bring you back from Sausalito, Tiburon and Larkspur. The longest reach is Fairfax, start of {ride:fairfax-ca-marin-cyclists-fairfax-to-point-reyes-station|the Marin Cyclists' Point Reyes ride}, about 17 miles north of City Hall. A car is also a break-in risk. SFPD's break-in page (updated Oct 2, 2026) tells visitors to put loose items in the trunk before they arrive and to check luggage at the hotel rather than leave it in the car. It says nothing about bikes on racks. Out of SFO with a case: a ride app from Level 5 of the Domestic Garage (book an XL), or a rental car from the Rental Car Center on AirTrain. Or build the bike at an SFO assembly stand (International Terminal Courtyards A and G, or Rental Car Center Level 1) and take BART into the city with it. No BART, AirTrain or SFO page says anything about carrying a boxed bike. Out of OAK: BART is across the street.",
    "transit_bike_rules": "Read Oct 2026. BART: bikes ride every train at all hours, but never in the first car or a crowded car. Folded bikes go in any car. Hold or secure the bike, yield seats and aisles, and never ride inside a station. Bikes may use most escalators, but not the ten narrow ones at 19th Street Oakland, Antioch and the Oakland Airport Connector. Most bikes need the wide accessible fare gate. Class 1, 2 and 3 e-bikes are allowed. Muni: every bus has a front rack for two or three bikes, first come first served, no charge. Wheels must be 20 inches or larger, tires no wider than 3 inches, bars no wider than 42 inches, and no motorized bikes or loose bags on the bike. Only folding bikes go inside a bus or on Muni Metro, light rail and historic streetcars. No bikes on cable cars. Caltrain: electric trains have two bike cars, 36 bikes each; no extra charge; the bike must fit a 71-inch stall; tag it with your stop. The conductor can turn bikes away on a crowded train. No escalators. Folding bikes up to 32 inches wide ride in any car. Caltrain is reviewing its bike rules in 2026 and has paused enforcement of its bike attachment rules; check before you go. Golden Gate Ferry (Sausalito, Tiburon, Larkspur): bikes and e-bikes are welcome, first come first served, and you may have to carry the bike up or down stairs. A Larkspur catamaran holds up to 30 bikes and the larger Spaulding boats up to 100; Tiburon boats take up to 30. Sausalito boards first come first served and gets busy in summer. No charging e-bikes on board. Folding bikes are stowed under a seat. No bike-share bikes.",
    "bike_share": {
      "name": "Bay Wheels",
      "url": "https://www.lyft.com/bikes/bay-wheels/pricing",
      "note": "Classic and electric bikes. A single ride is $1 to unlock, then $0.19 a minute on a classic bike or $0.49 a minute on an e-bike. A day pass is $15, with 30 minutes free per classic ride (Oct 2026). Not allowed on Golden Gate Ferry, and BART asks you to leave them outside the station. For the errand or the ride to dinner, not the ride."
    }
  },
  "rules_and_safety": "California, read Oct 2026. Drivers must give three feet when passing a bike (Vehicle Code 21760, the Three Feet for Safety Act). A driver in the same lane must change lanes to pass when another lane is open. The fine is $35, or $220 if a collision injures the rider (text as amended January 1, 2023). Riders have the same rights and duties as drivers (21200), so stop at stop signs and red lights; CalBike's summary of state law lists no stop-as-yield exception. Ride as far right as practicable except when passing, turning left, avoiding a hazard or in a lane too narrow to share (21202). Use the bike lane when slower than traffic (21208). Helmets are required under 18. E-bikes come in three classes (312.5): class 1 pedal-assist to 20 mph, class 2 throttle to 20 mph, class 3 pedal-assist to 28 mph with a speedometer, rider 16 or older and helmeted. At night you need a white front light and reflectors. In San Francisco it's illegal to ride on the sidewalk if you're over 13 (Transportation Code 7.2.12, per the SF Bicycle Coalition). The Golden Gate Bridge: bikes ride the sidewalks free, 24 hours. Speed limit is 15 mph, 5 mph at the towers, and you yield to people walking. All e-bike classes are allowed. Standard time (November to March): weekdays use the east sidewalk 5 am to 3:30 pm and the west sidewalk 3:30 to 6:30 pm; weekends and holidays use the west sidewalk 5 am to 6:30 pm. Daylight time: the west sidewalk opens at 3:30 pm on weekdays until 9 pm, and both sidewalks are open 5 am to 9 pm on weekends. Overnight it's the east sidewalk through gates you buzz to open. Lights at the approach show which side is open; high wind and events can close the west side. The read: the city counted 14 traffic deaths in the first half of 2026, one of them a person on a bike (Vision Zero SF monthly report, data as of July 17, 2026). The city's High Injury Network is 13 percent of its streets, where 74 percent of severe and fatal injuries happened from 2020 to 2024.",
  "sources": [
    "https://www.alaskaair.com/content/travel-info/baggage/special-baggage/traveling-with-sporting-equipment",
    "https://www.alaskaair.com/content/travel-info/baggage/checked-bags",
    "https://www.southwest.com/html/customer-service/travel-fees.html",
    "https://www.delta.com/us/en/baggage/special-items/sporting-equipment",
    "https://www.delta.com/us/en/baggage/overview",
    "https://www.aa.com/web/i18n/travel-info/baggage/specialty-and-sports.html",
    "https://www.aa.com/i18n/travel-info/baggage/checked-baggage-policy.jsp",
    "https://www.flysfo.com/passengers/flight-info/airlines-sfo",
    "https://www.flysfo.com/passengers/ground-transportation/biking",
    "https://www.flysfo.com/passengers/ground-transportation/public-transit",
    "https://www.flysfo.com/passengers/ground-transportation/rental-cars",
    "https://www.flysfo.com/passengers/ground-transportation/lyft-uber-rides",
    "https://www.iflyoak.com/fly/buy-tickets/",
    "https://www.iflyoak.com/ground-transportation/public-transportation/",
    "https://www.iflyoak.com/ground-transportation/car-rentals/",
    "https://www.flysanjose.com/airlines",
    "https://www.bart.gov/guide/bikes",
    "https://www.bart.gov/guide/bikes/bikeRules",
    "https://www.bart.gov/guide/bikes/bikeFAQ",
    "https://www.sfmta.com/getting-around/bike/bikes-muni",
    "https://www.caltrain.com/rider-information/bicycles",
    "https://www.caltrain.com/rider-information/bicycles/bikes-train",
    "https://www.caltrain.com/bike-scooter-rules-update-pilot",
    "https://www.goldengate.org/ferry/riding-the-ferry/bringing-your-bike/",
    "https://www.goldengate.org/bridge/visiting-the-bridge/bikes-pedestrians/",
    "https://www.lyft.com/bikes/bay-wheels/pricing",
    "https://columbuscyclery.com/bike-assembly-tune-up/",
    "https://columbuscyclery.com/bike-rental-san-francisco/",
    "https://www.sportsbasement.com/pages/bike-rental-rates",
    "https://shop.sportsbasement.com/pages/services-bike",
    "https://www.valenciacyclery.com/articles/ship-your-bike-pg199.htm",
    "https://www.hightrailscycles.com/rentals/rental-and-demo-bikes-pg204.htm",
    "https://www.splitrocktapandwheel.com/about/demos-rentals-pg231.htm",
    "https://faq.bikeflights.com/support/solutions/articles/13000072445-what-delivery-date-should-i-choose-",
    "https://www.shipbikes.com/frequently-asked-questions/",
    "https://california.public.law/codes/vehicle_code_section_21760",
    "https://www.calbike.org/go_for_a_ride/california_bicycle_laws/",
    "https://sfbike.org/resources/bicycle-law/rules-of-the-road/",
    "https://www.sanfranciscopolice.org/prevent-auto-break-ins-know-how-respond",
    "https://www.visionzerosf.org/maps-data/",
    "https://www.visionzerosf.org/wp-content/uploads/2026/07/06.2026Fatalities_JuneSummaryMemo.pdf"
  ]
}
```

## Why these

- **SFO**: the airport most riders land at. Its own biking page lists bike assembly stations and a desk that sells bike boxes. BART from the International Terminal takes a built bike into the city.
- **OAK**: twelve miles out and BART is across the street, so it's the right door for Grizzly Peak, the Three Bears and Diablo. It's the Southwest and Alaska alternative to SFO. The airport now calls itself Oakland San Francisco Bay Airport on its own pages, so that's the name used.
- **SJC**: listed because the airlines are the same and fares differ. Said plainly that it's 39 miles out.
- **The four airline notes**: each read on the airline's own page this month, with the current first- and second-bag fees so the rent-versus-bring math uses real numbers. Alaska's text came from the JSON embedded in its page, since the page renders with JavaScript.
- **Columbus, Sports Basement, High Trails, Splitrock**: lifted from `shops.md`. Columbus is the one shop in the city that says on its site it receives a shipped bike. Sports Basement and High Trails are the two road and gravel rentals a visitor would ride.
- **BART, Muni, Caltrain, Golden Gate Ferry**: each agency's own bike page, read this month. They decide whether this city works without a car, and it does. Caltrain's 2026 rules review is flagged so nobody quotes a rule that's about to change.
- **Golden Gate Bridge District's page**: the sidewalk schedule, speed limits and e-bike rule, from the bridge's own 2026 page, as the brief asked.
- **Bay Wheels**: priced from its own page and listed as the errand bike it is.
- **CVC 21760 via public.law** (the page says verified Sept 28, 2026), **CalBike** for the e-bike classes, helmets and lane position, and the **SF Bicycle Coalition** for the city's sidewalk code. Three sources for the law, each named.
- **Vision Zero SF's June 2026 memo**: the city's own count, dated, and the High Injury Network figure. **SFPD's break-in page** is quoted for what it says and no more.

## Rejected

- **Third-party airline bike guides** (Orucase, airline-baggage-fees.com, CabinZero, baggagepolicies.org, The Points Guy, NerdWallet, Box and Ride, Buxumbox, Athletic Minded Traveler, the Bogleheads thread, Velo's old United story): search results only. Not read, not quoted.
- **Alaska's "Sports equipment flies for just $30" news post** (2020): superseded by the current sports-equipment page, which says standard bag fees with the oversize waiver. Not used.
- **united.com "Dangerous items"**: the only United page search returned, and it isn't about bikes.
- **Attorney and explainer pages on sidewalk riding** (Bay Area Bicycle Law, Sally Morin Law, Dolan Law, LegalClarity, LegallyExplained, californiabikeattorney.com) and **Wikipedia's "Bicycle law in California"**: leads only. The SF Bicycle Coalition page is cited for 7.2.12. The SFMTA archive item on sidewalk riding (2010) wasn't fetched.
- **SF Chronicle, Eddie's List, CBS, PressReader and Taraval break-in tips**: leads only. SFPD's own page is the source.
- **Vision Zero SF's 2024 end-of-year report**: not fetched. The June 2026 monthly memo is newer.
- **SFO URLs that 404'd** (/passengers/flights/airlines, /passengers/transportation) and **Caltrain URLs that redirect to a "page not found"** (/riding-caltrain/bikes-board and others): the working pages are cited instead.

## Couldn't confirm

- **United's bike policy.** united.com timed out over curl and returned nothing to search in two tries; WebFetch needs a search hit to open a URL. United flies domestic from SFO Terminals 2 and 3 and international from G, and also flies SJC, so this is the biggest gap. Where to look: united.com/en/us/fly/baggage/sports-equipment.html in a browser. The note says "not confirmed"; the summary names only Alaska, Delta and American, the three whose bike rules were read in full.
- **Southwest's bike article** (support.southwest.com/helpcenter/article/flying-with-a-bike-policy) renders only with JavaScript. The fee page's sports-equipment rule is quoted instead. Whether a bike is on the Help Center list wasn't read this run; the LA guide read it in Sept 2026.
- **Delta's and American's overweight fees** in dollars (51 to 70 lb). Only matters for a case over 50 lb. Where to look: Delta's "Excess & Overweight Baggage" page; aa.com's oversize and overweight page (it came up in search but wasn't fetched).
- **Carrying a boxed bike on BART or AirTrain, or in a ride-app XL.** No page says yes or no. Where to look: BART customer service; SFO's "Getting Around SFO/AirTrain" page.
- **OAK ride apps and SJC ground transport.** Not read. Where to look: iflyoak.com/ground-transportation/rideshare/, flysanjose.com ground transportation.
- **BikeFlights' price and transit days to San Francisco.** Its pages give no day count. Where to look: the quote tool with your origin and Columbus Cyclery's ZIP (94133).
- **"Don't leave a bike on a car rack."** The brief allows it only with a source. SFPD's page tells visitors to put loose items in the trunk and to leave luggage at the hotel, but it doesn't mention bikes. Not written. Where to look: SFPD's auto burglary page (sanfranciscopolice.org/get-service/auto-burglary), which came up in search and wasn't fetched, or a shop's own page.
- **Golden Gate Transit bus racks, SF Bay Ferry (Oakland, Alameda, Vallejo) bike rules, SamTrans racks.** Not read. Golden Gate Transit matters for getting to Fairfax without riding there. Where to look: goldengate.org/bus/riding-the-bus/, sanfranciscobayferry.com.
- **A full-year 2025 count of cyclist deaths in SF.** The memo gives 2025 through June (none) and the 2026 half-year (one). Where to look: Vision Zero SF's 2025 end-of-year report when posted.
- **Sonoma County Airport (STS)** as a door for the Guerneville end of Cycle to Zero and the Recovery Ride. Not read. A lead for the editor if the event pages want it.
- **The Great Highway park's name and hours.** That's @route-scout's line; not read here.
- **Airport-to-zone drive times.** Miles are straight-line from City Hall; no drive time was measured.

## Hand-offs

- Editor, for every town these airlines serve: the fees match the LA run (Sept 2026). Alaska and Southwest are $45 and $55; Delta is $45 and $55; American is $45 online or $50 at the airport, then $55 or $60, updated May 18, 2026. Nothing changed between Sept and Oct.
- Editor: Caltrain is reviewing its bike rules in 2026 (pilot timeline on its page, report due Nov/Dec 2026). Recheck `transit_bike_rules` before this guide ships.
- Editor: the airport's own pages now say "Oakland San Francisco Bay Airport (OAK)". Any other guide that says "Oakland International" should follow.
- @route-scout: the Golden Gate Bridge sidewalk schedule above, from the bridge's own page, for any route that crosses it.

## Sources

- https://www.alaskaair.com/content/travel-info/baggage/special-baggage/traveling-with-sporting-equipment (text from the page's embedded JSON)
- https://www.alaskaair.com/content/travel-info/baggage/checked-bags (same)
- https://www.southwest.com/html/customer-service/travel-fees.html
- https://support.southwest.com/helpcenter/article/flying-with-a-bike-policy (JavaScript only; nothing read)
- https://www.delta.com/us/en/baggage/special-items/sporting-equipment
- https://www.delta.com/us/en/baggage/overview
- https://www.aa.com/web/i18n/travel-info/baggage/specialty-and-sports.html
- https://www.aa.com/i18n/travel-info/baggage/checked-baggage-policy.jsp
- https://www.united.com/en/us/fly/baggage/sports-equipment.html (timed out; nothing read)
- https://www.flysfo.com/passengers/flight-info/airlines-sfo (pages 1 to 5)
- https://www.flysfo.com/passengers/ground-transportation/biking
- https://www.flysfo.com/passengers/ground-transportation/public-transit
- https://www.flysfo.com/passengers/ground-transportation/rental-cars
- https://www.flysfo.com/passengers/ground-transportation/lyft-uber-rides
- https://www.iflyoak.com/
- https://www.iflyoak.com/fly/buy-tickets/
- https://www.iflyoak.com/ground-transportation/public-transportation/
- https://www.iflyoak.com/ground-transportation/car-rentals/
- https://www.flysanjose.com/airlines
- https://www.bart.gov/guide/bikes
- https://www.bart.gov/guide/bikes/bikeRules
- https://www.bart.gov/guide/bikes/bikeFAQ
- https://www.sfmta.com/getting-around/bike/bikes-muni
- https://www.sfmta.com/getting-around/bike/bike-education (no sidewalk or theft line on it)
- https://www.caltrain.com/rider-information/bicycles
- https://www.caltrain.com/rider-information/bicycles/bikes-train
- https://www.caltrain.com/bike-scooter-rules-update-pilot
- https://www.goldengate.org/ferry/riding-the-ferry/
- https://www.goldengate.org/ferry/riding-the-ferry/bringing-your-bike/
- https://www.goldengate.org/bridge/visiting-the-bridge/bikes-pedestrians/
- https://www.lyft.com/bikes/bay-wheels/pricing (redirects to lyftbikes.com/pricing, the Bay Wheels plans page)
- https://faq.bikeflights.com/support/solutions/articles/13000072445-what-delivery-date-should-i-choose-
- https://faq.bikeflights.com/support/solutions/articles/13000072589-how-do-i-ship-with-a-bike-shop-
- https://www.shipbikes.com/frequently-asked-questions/
- https://california.public.law/codes/vehicle_code_section_21760
- https://www.calbike.org/go_for_a_ride/california_bicycle_laws/
- https://sfbike.org/resources/bicycle-law/rules-of-the-road/
- https://www.sanfranciscopolice.org/prevent-auto-break-ins-know-how-respond
- https://www.visionzerosf.org/
- https://www.visionzerosf.org/maps-data/
- https://www.visionzerosf.org/wp-content/uploads/2026/07/06.2026Fatalities_JuneSummaryMemo.pdf
- https://nominatim.openstreetmap.org/ (geocodes for SFO, OAK, SJC and the ferry terminals; distances only)
- research/towns/san-francisco-ca/shops.md: ship and rent lists, with their own sources
