# palm-springs-ca — logistics

town: `palm-springs-ca` · agent: **logistics-scout** · date: **2026-10-04** (replaces the Oct 3 report)

One `bring_your_bike` object, now close to the LA bar. What closed since Oct 3,
all from pages fetched this run unless marked:

- **Ship:** Tri-A-Bike receives shipped bikes and names BikeFlights; $150 to
  unbox and build (Oct 2026). From @shop-scout's report, this run.
- **Fly:** Delta's bike page and bag fees read on delta.com (Oct 2026). PSP's
  airline roster from a flight-search page dated Oct 2, 2026, and from
  Wikipedia (which also gives "two miles east of downtown"); the airport's own
  site still would not load. Alaska and Southwest carry the LA guide's
  Sept 30, 2026 read of their own pages, marked as not re-read. United, and
  the Canadian and seasonal carriers, are not confirmed.
- **Transit:** SunLine's own bikes-on-board page and fares page.
- **Law:** CalBike's law page (modified Aug 24, 2026), Vehicle Code 21760 and
  312.5 on california.public.law (current through Sept 28, 2026).
- **CV Link:** CVAG's own site (three open segments with mileage; "substantially
  completed June 2025"; the Arts and Music Line in 2027), the city's CV Link
  page, and the Coachella Valley Independent (April 16, 2026) for hours and
  lighting.
- **Traffic:** no crash dashboard exists for the valley that loaded. The read
  is built from two news-reported Highway 111 crashes (Jan 2025, Mar 2026) and
  the city's own March 2026 safety project filing, which names the
  intersections it is fixing for night-time and bike collisions.

Still thin: the airport's own pages (ground transport with a bike box), the
BikeFlights and ShipBikes transit-time pages, Palm Springs' own sidewalk rule,
and e-bikes on SunLine. See Couldn't confirm.

Distances: PSP "two miles east of downtown" is Wikipedia's line, not the
airport's. LA and Phoenix are straight-line from the briefs' centres (about 99
and 259 miles). Palm Desert is a straight-line estimate (about 12 miles).

**For the Tour event page (the editor):** the registration page (read Oct 3,
2026) gives Feb 6, 2027; long routes $110 Aug 1 to Oct 31, 2026, $115 Nov 1
to Dec 31, $120 Jan 1 to Feb 3, 2027, $125 Feb 4 to 6; no refunds, $5 ride
insurance; register on BikeReg. The home page says "up to 8,000 cyclists
from 46 different states and 4 countries"; `brief.md` and the calendar say
about 10,000. The routes page lists the half metric as 32 miles; the FAQ and
the calendar say 33. Route maps are "to come"; the routes use CV Link "when
feasible." The FAQ gives February weather as highs of 60 to 70 and lows of
50 to 55 — a sourced line for `best_months` or the event page.

## Findings

```json
{
  "summary": "Bring it. Delta and American both check a packed bike as a standard bag, $45 each way (Oct 2026), so a round trip costs less than one day of a carbon rental; Alaska and Southwest did the same when their pages were last read (Sept 2026). If you would rather not fly with the case, Tri-A-Bike in Palm Desert receives a BikeFlights delivery and builds it for $150, then delivers to a Palm Springs hotel for $50 (Oct 2026). Rent only for a one-ride trip: three valley shops rent carbon road bikes at $100 to $140 a day and deliver to Palm Springs, with a two-day minimum on Tour de Palm Springs weekend at two of them. You do not need a car for the Tour or the valley floor; Highway 74, Joshua Tree and the Salton Sea are car days.",
  "fly": {
    "airports": [
      {
        "name": "Palm Springs International",
        "code": "PSP",
        "miles": 2,
        "note": "In town: about two miles east of downtown, reached by Tahquitz Canyon Way from downtown or Kirk Douglas Way from the east (Wikipedia; the airport's own site did not load, Oct 2026). Alaska, Southwest, United, Delta, American, WestJet, Air Canada and Sun Country fly it, per a flight-search page dated Oct 2, 2026; Wikipedia adds Allegiant, Flair and Porter. Much of it is winter-only: Alaska's Boise, Everett and New York flights, Delta's Atlanta and Austin, United's Newark and Washington, Southwest's Austin and Chicago run roughly November to April or May (flight-search page, Oct 2026). Rental car counters are in the main building's north wing, and SunLine routes 2 and 4 run to downtown (Wikipedia). Taxi and rideshare pickup with a bike box: not confirmed; see the airport's ground-transportation page."
      }
    ],
    "airline_note": "Delta, read on its own pages Oct 2026: a non-motorized touring or single-seat racing bike packed in a container built for bikes is checked baggage at the standard fee; 50 lb or more pays the overweight fee; over 115 linear inches or 100 lb is refused; a hard-shell bike case needs no release form, a soft bag signs a limited release; some Delta Connection flights exclude bikes. First bag $45, second $55 under 50 lb, US domestic Main Cabin. American, read Oct 3, 2026: one non-motorized bike in a hard case, a bike bag or a box built for bikes goes at the standard checked bag fee up to 50 lb; 51 to 70 lb pays the standard overweight fee; oversize fees do not apply; handlebars fixed sideways and pedals off or wrapped. First bag $50 at the airport or $45 online, second $60 or $55 online, updated May 18, 2026. Alaska and Southwest: their pages did not load this run; when the LA guide read them on Sept 30, 2026, both checked a non-motorized bike in a case as a standard bag with oversize fees waived (Alaska also waives overweight to 70 lb), first bag $45, second $55; read each page before you book. United, WestJet, Air Canada, Sun Country, Allegiant, Flair, Porter: not confirmed; read the airline's sports-equipment page. On every carrier confirmed here, a bike case under 50 lb is one ordinary checked bag."
  },
  "ship": {
    "note": "One valley shop says it on its own site: Tri-A-Bike in Palm Desert accepts shipped bikes, recommends bikeflights.com, and unboxes and assembles for $150; boxing it for the trip home is $100 to $150, and delivery to a Palm Springs hotel is $50 one way (Oct 2026). It is about 12 miles down the valley from downtown Palm Springs, closed Sunday and Monday, and asks for a call ahead. Both Trek stores and Bike N Brews box a bike to ship out ($79.99; $100 to $150, Oct 2026) but none says it receives one; Village Peddler lists \"bike shipping\" with no detail. Call before you ship anywhere but Tri-A-Bike. Carrier transit times were not read this run; the LA guide's Sept 2026 read has BikeFlights by UPS with no stated day count and ShipBikes at no more than 6 business days one way in the continental US. Ship a week ahead and build in the shop's closed days.",
    "shops": [
      {
        "name": "Tri-A-Bike",
        "url": "https://www.triabike.com/articles/bike-service-repair-pg184.htm",
        "note": "Ship to the shop (it recommends bikeflights.com); unbox and assemble $150, box for the return $100 to $150, delivery to Palm Springs $50 one way (Oct 2026). Call 760-340-2840 to book before you ship. Tuesday to Saturday 10 to 4, closed Sunday and Monday. 44841 San Pablo Ave, Palm Desert."
      }
    ]
  },
  "rent": {
    "note": "Three shops, four stores, rent carbon road bikes: $100 to $140 a day, $300 to $400 a week (Oct 2026), two of them with Di2. All four also rent full-suspension mountain bikes. Big Wheel on South Palm Canyon is the only fleet in Palm Springs; the rest sit in Palm Desert, about 12 miles down the valley, and deliver to Palm Springs for $50 (Big Wheel, Tri-A-Bike) or $100 (Bike N Brews). None lists frame sizes; call with your height. Big Wheel and Tri-A-Bike set a two-day minimum on Tour de Palm Springs weekend, so book early. No gravel rental was found; neither Trek store rents. The math: Delta or American checks your bike as a regular bag, $90 round trip paid online (Oct 2026), less than one day of a carbon rental, and shipping to Tri-A-Bike adds the carrier's charge plus $150 to build. Renting saves the case, the airport and the build; it costs more from the first day. For the Tour alone, renting is fair if you would rather not pack a bike for one ride. For a week, a fit you depend on, or a gravel bike, bring yours.",
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
  },
  "get_around": {
    "car_needed": false,
    "note": "Not for a Tour weekend or a week of road riding on the valley floor. The airport is about two miles from downtown, the Tour starts downtown and packet pickup is downtown, Trek's repair shop and Big Wheel's rentals are on South Palm Canyon, and the Palm Desert shops deliver to Palm Springs hotels for $50 to $100 (Oct 2026). CV Link is three separate pieces, open 24 hours year-round with solar lights along parts of it (Coachella Valley Independent, April 2026): 19.6 miles from the Palm Springs Visitor Center at Highway 111 and Tramway Road along the Whitewater River to Date Palm Drive in Cathedral City; 5.4 miles in Palm Desert from the Bump and Grind trailhead to Cook Street; and 16 miles from Washington Street in La Quinta to Airport Boulevard in Coachella. Rancho Mirage and Indian Wells are not in the project, so the gaps between the pieces are on the road; the Arts and Music Line through La Quinta, Indio and Coachella starts construction in 2027 (CVAG, read Oct 2026). Highway 74, Joshua Tree and the Salton Sea are car days; so is the Tram road if you would rather not ride the valley to it. Driving in: downtown Los Angeles is about 100 miles west and downtown Phoenix about 260 miles east in a straight line; the road is longer. Out of PSP with a bike case: rental car counters are in the terminal's north wing (Wikipedia; the airport's own ground-transport page did not load) — book an XL for a rideshare and expect the case to ride in the back. Tour de Palm Springs weekend, Feb 5 and 6, 2027: packet pickup Friday noon to 8 pm and Saturday from 6 am at South Palm Canyon and Baristo; the century rolls at 6:30 am from South Palm Canyon between Baristo and Tahquitz, the 16-mile route at 9:30; bike support at the start and at every SAG stop (the Tour's FAQ and registration page, Oct 2026).",
    "transit_bike_rules": "SunLine (the valley's bus), read Oct 2026: every SunBus has a front rack, no extra fare; a single-seat two-wheeled bike up to 69.5 inches long, 29-inch bars and 28-inch wheels fits; bikes do not ride inside unless they fold to the size of a suitcase; SunLine is not responsible for a bike on the rack. The page says nothing about e-bikes or weight. One way is $1, a day pass $3, exact cash or the Token Transit app (SunLine fares page, Oct 2026). Routes 2 and 4 link the airport and downtown (Wikipedia; SunLine's routes page lists the routes without endpoints). Fine for getting a built bike across the valley on a windy day; no use for a bike case.",
    "bike_share": {
      "name": null,
      "url": null,
      "note": "No bike share operates in the Coachella Valley that any page this run named. Rent from a shop."
    }
  },
  "rules_and_safety": "California, read Oct 2026. Drivers must give three feet when passing a bike (Vehicle Code 21760, the Three Feet for Safety Act); a driver in the same lane must change lanes to pass when one is open, and when three feet is not possible must slow to a reasonable speed and pass only when it does not endanger the rider. The fine is $35, $220 if a collision injures the rider (statute current through Sept 28, 2026). Helmets are required under 18 (21212). E-bikes come in three classes (312.5): class 1 pedal-assist to 20 mph, class 2 throttle to 20 mph, class 3 pedal-assist to 28 mph with a speedometer, rider 16 or older and helmeted; all under 750 watts. Ride as far right as practicable except when passing, turning left, avoiding a hazard or in a lane too narrow to share (21202). Sidewalk riding is set city by city (21206); Palm Springs' rule was not read this run. California has no stop-as-yield law, but a rider may go on the walk signal, including a leading pedestrian interval (21456, per CalBike, page modified Aug 24, 2026). On CV Link, bikes share the path with e-bikes, scooters and low-speed electric vehicles, golf carts included; carts and low-speed vehicles are held to 20 mph, scooters and boards to 15 (CV Link FAQ, Oct 2026). On Tour day all kinds of bikes are allowed, recumbents, trikes and e-bikes included, and you need the helmet sticker to get into a SAG stop (the Tour's FAQ, Oct 2026). The read: Highway 111 is the valley's spine and its fast road. A cyclist was killed on it at Frank Sinatra Drive in Rancho Mirage on Jan 1, 2025 (KESQ, NBC Palm Springs), and another was critically hurt on it northwest of Gateway Drive in Palm Springs on March 4, 2026 (KESQ). The city's own March 2026 safety filing picks nine intersections to fix for night-time and bicyclist collisions, with lighting and leading pedestrian intervals: on Ramon Road, Sunrise Way, Gene Autry Trail, Indian Canyon at Vista Chino and three along Tahquitz Canyon Way (HSIP Cycle 11, CEQAnet, March 19, 2026). Those are the crossings between downtown and the airport. CV Link and South Palm Canyon are the quiet miles; the valley is open and windy, and the Independent's April 2026 guide tells path users to carry a neck gaiter for the wind and water for the heat.",
  "sources": [
    "https://www.delta.com/us/en/baggage/special-items/sporting-equipment",
    "https://www.delta.com/us/en/baggage/overview",
    "https://www.aa.com/i18n/travel-info/baggage/specialty-and-sports.jsp",
    "https://www.aa.com/i18n/travel-info/baggage/checked-baggage-policy.jsp",
    "https://www.flightconnections.com/flights-to-palm-springs-psp",
    "https://en.wikipedia.org/wiki/Palm_Springs_International_Airport",
    "https://www.sunline.org/rider-resources/bikes-on-board",
    "https://www.sunline.org/fares-passes/fares",
    "https://www.sunline.org/services/sun-bus/routes-and-schedules",
    "https://www.triabike.com/articles/bike-service-repair-pg184.htm",
    "https://www.trekbikes.com/us/en_US/retail/palm_springs/",
    "https://www.trekbikes.com/us/en_US/retail/palm_desert/",
    "https://www.pdbikesnbrew.com/articles/bike-service-repair-pg229.htm",
    "https://bwbtours.com/palm-springs-bike-rentals/",
    "https://bwbtours.com/palm-desert-bike-rentals/",
    "https://www.triabike.com/articles/bike-rentals-pg183.htm",
    "https://www.pdbikesnbrew.com/articles/bike-rentals-pg233.htm",
    "https://villagepeddlerlq.com/bike-repair/",
    "https://www.calbike.org/go_for_a_ride/california_bicycle_laws/",
    "https://california.public.law/codes/vehicle_code_section_21760",
    "https://california.public.law/codes/vehicle_code_section_312.5",
    "https://www.coachellavalleylink.com/",
    "https://www.coachellavalleylink.com/about-the-project/faqs/",
    "https://www.coachellavalleylink.com/maps/",
    "https://www.coachellavalleylink.com/cv-link-city-gaps/",
    "https://engagepalmsprings.com/cv-link",
    "https://cvindependent.com/2026/04/hiking-with-t-cv-link-includes-more-than-40-miles-of-trails-with-opportunities-for-exercise-transportation-and-desert-views/",
    "https://kesq.com/news/2025/01/01/travel-alert-accident-on-highway-111-and-frank-sinatra-shuts-down-lanes-for-investigation/",
    "https://www.nbcpalmsprings.com/2025/01/02/bicyclist-killed-on-highway-111-in-rancho-mirage",
    "https://kesq.com/news/2026/03/04/bicyclist-suffers-critical-injuries-after-being-struck-by-vehicle-in-palm-springs/",
    "https://ceqanet.lci.ca.gov/2026030805",
    "https://tourdepalmsprings.com/faq/",
    "https://tourdepalmsprings.com/registration/",
    "https://tourdepalmsprings.com/event-info/",
    "https://tourdepalmsprings.com/routes2/"
  ]
}
```

## Why these

- **PSP, 2 miles** — the town's own airport; the miles and the roster are from Wikipedia and a flight-search page because flypsp.com would not load. Both are marked in the note so the verifier knows what to re-read.
- **Delta and American on their own pages** — the two carriers whose bike rules were read this month. Both treat a bike case as a standard bag; that is the number the rent-or-bring math runs on.
- **Alaska and Southwest as the LA guide's Sept 30 read** — the pages timed out again. The lines are dated and marked "not re-read"; the task allowed lifting them on those terms. The editor can drop them to "not confirmed" if that is too soft.
- **Tri-A-Bike in the ship list** — the one shop that says it on its own page, with the fee. The Oct 3 empty list is gone.
- **The four rental stores** — lifted from `shops.md`: carbon road bikes at three shops, Di2 at two, prices with dates, delivery to Palm Springs from all of them.
- **`car_needed: false`** — airport, Tour start, packet pickup, a repair shop and a rental fleet all inside Palm Springs; the Palm Desert shops deliver; CV Link covers 19.6 miles out of town. The climbs and the far-out days are named as the car days.
- **SunLine** — its own bikes-on-board page, fares and route list. Honest about what the page does not say (e-bikes, weight, airport routes).
- **CV Link from CVAG, the city and the Independent** — CVAG for the three segments and the 2027 line; the city for the Palm Springs construction; the Independent for 24 hours and lights, which CVAG's home page does not state.
- **The law from CalBike and the statute** — CalBike for the overview (modified Aug 2026), california.public.law for 21760's fines and 312.5's text (current through Sept 28, 2026).
- **The traffic read from news and the city's filing** — no dashboard loaded. Two Highway 111 crashes with dates and places, and the city's own list of the intersections it is fixing for bike collisions. Facts, not vibes; no road is called safe.

## Rejected

- **Alaska's 2020 news release** (news.alaskaair.com, "sports equipment flies for $30") — six years old and superseded by the Sept 2026 read of Alaska's baggage page. Not used for any figure.
- **Orucase, Triathlete, The Points Guy, NerdWallet, Thrifty Traveler, airline-baggage-fees.com** — third-party fee guides. Leads only; never a source for a fee.
- **Big Wheel Tours' festival pricing** ($140 to $160 a bike for four days) — Coachella and Stagecoach pricing, not the Tour.
- **Village Peddler's rentals** — hybrids and cruisers. Not in the rent list.
- **Trek's and Bike N Brews' "box your bike" lines** — outbound shipping only. Not ship-to-shop.
- **Velo Palm Springs' safety page** — general tips, no California law cited and no valley crash data.
- **Velo Palm Springs' CV Link page** — used only for links; facts come from CVAG.
- **The KESQ Dec 14, 2025 Highway 111 fatality** — a driver, not a cyclist, per the headline; not fetched.
- **Law-firm "California bicycle laws" pages** (victimslawyer, bhlflaw, griessmeyer, bayareabicyclelaw) — marketing pages; the statute and CalBike are the sources.
- **Tour lodging page** — hotels by distance from the start, no rates or bike policies. @stay-scout's.

## Couldn't confirm

- **PSP's own pages** — flypsp.com and /airlines/ timed out on the permission step again (Oct 4); not fetched any other way. Missing from the source of record: the airline list, the miles, taxi and rideshare pickup with a bike box, and whether a shuttle takes a case. Wikipedia and a flight-search page stand in, and the note says so. Where to look: flypsp.com's airlines and ground-transportation pages.
- **Ontario (ONT) and other airports within 90 minutes** — nothing loaded to measure or confirm; no search budget left. The LA guide has ONT's airline list (Sept 2026), measured from LA. Where to look: flyontario.com, a distance from 33.8303, -116.5453.
- **Alaska, Southwest and United bike pages** — all three timed out (Alaska's sporting-equipment page, Southwest's flying-with-a-bike article, United's sports-equipment page). Alaska and Southwest ride on the LA guide's Sept 30, 2026 read; United is unconfirmed as it was in LA. WestJet, Air Canada, Sun Country, Allegiant, Flair, Porter: not attempted.
- **SunLine and e-bikes, rack capacity, airport routes** — the bikes-on-board page says nothing about e-bikes, weight or how many bikes a rack holds; the routes page lists route numbers without endpoints. Routes 2 and 4 to the airport are Wikipedia's. Where to look: the Route 2 and Route 4 PDFs on sunline.org.
- **BikeFlights and ShipBikes transit times** — neither domain surfaced in a search result, so neither could be fetched. The LA guide's Sept 2026 lines are quoted as such.
- **Palm Springs' sidewalk rule** — the municipal code was not reached. The note says "set city by city; Palm Springs' rule not read."
- **A crash dashboard for Palm Springs or the valley** — none loaded. The city's HSIP filing names intersections but gives no counts. Where to look: the city's traffic engineering page, CVAG's active transportation plan, Riverside County's TIMS data.
- **CV Link lights and hours on CVAG's own page** — the home page gives mileage and dates but not hours or lighting; those are the Independent's (April 2026). The Oct 3 run read "no posted hours, lights set in the path" on CVAG's FAQ; both agree.
- **Drive times from LA and Phoenix** — straight-line miles only.
- **Tour weekend minimum stays** — the Tour's lodging page gives none; @stay-scout has the hotels.
- **The town centre** — 33.8303, -116.5453 was not checked against a geocoder page.

## Hand-offs

- **Editor, every California town:** the 21760 fines and 312.5 text are current through Sept 28, 2026 on california.public.law; CalBike's page was modified Aug 24, 2026. The LA guide's law paragraph still holds.
- **Editor, every town Delta serves:** Delta's bike page read Oct 2026 matches the LA guide's Sept 2026 line, with one addition worth carrying: a hard-shell bike case needs no release form; a soft bag does.
- **@stay-scout:** a hotel within a mile of Trek Palm Springs (611 S Palm Canyon) or Big Wheel (1590 S Palm Canyon) puts repairs and rentals on foot.
- **@route-scout:** CV Link's west piece starts at the Visitor Center at Highway 111 and Tramway Road — the foot of the Tram climb — and the Independent's article has the access points.

## Sources

Fetched Oct 4, 2026:
- https://www.delta.com/us/en/baggage/special-items/sporting-equipment
- https://www.delta.com/us/en/baggage/overview
- https://www.flightconnections.com/flights-to-palm-springs-psp
- https://en.wikipedia.org/wiki/Palm_Springs_International_Airport
- https://www.sunline.org/
- https://www.sunline.org/rider-resources/bikes-on-board
- https://www.sunline.org/fares-passes/fares
- https://www.sunline.org/services/sun-bus/routes-and-schedules
- https://www.triabike.com/articles/bike-service-repair-pg184.htm
- https://www.trekbikes.com/us/en_US/retail/palm_springs/
- https://www.trekbikes.com/us/en_US/retail/palm_desert/
- https://www.pdbikesnbrew.com/articles/bike-service-repair-pg229.htm
- https://www.calbike.org/go_for_a_ride/california_bicycle_laws/
- https://california.public.law/codes/vehicle_code_section_21760
- https://california.public.law/codes/vehicle_code_section_312.5
- https://www.coachellavalleylink.com/
- https://engagepalmsprings.com/cv-link
- https://cvindependent.com/2026/04/hiking-with-t-cv-link-includes-more-than-40-miles-of-trails-with-opportunities-for-exercise-transportation-and-desert-views/
- https://kesq.com/news/2025/01/01/travel-alert-accident-on-highway-111-and-frank-sinatra-shuts-down-lanes-for-investigation/
- https://www.nbcpalmsprings.com/2025/01/02/bicyclist-killed-on-highway-111-in-rancho-mirage
- https://kesq.com/news/2026/03/04/bicyclist-suffers-critical-injuries-after-being-struck-by-vehicle-in-palm-springs/
- https://ceqanet.lci.ca.gov/2026030805
- https://news.alaskaair.com/guest-experience/sports-equipment-update/ (rejected, 2020)

Fetched Oct 3, 2026 (the earlier run; facts kept as read then):
- https://www.aa.com/i18n/travel-info/baggage/specialty-and-sports.jsp
- https://www.aa.com/i18n/travel-info/baggage/checked-baggage-policy.jsp
- https://www.tourdepalmsprings.com/
- https://tourdepalmsprings.com/event-info/
- https://tourdepalmsprings.com/event-info/lodging/
- https://tourdepalmsprings.com/routes2/
- https://tourdepalmsprings.com/registration/
- https://tourdepalmsprings.com/faq/
- https://tourdepalmsprings.com/sag-stops/
- https://www.coachellavalleylink.com/about-the-project/faqs/
- https://www.coachellavalleylink.com/maps/
- https://www.coachellavalleylink.com/cv-link-city-gaps/
- https://www.velopalmsprings.com/cv-link/
- https://www.velopalmsprings.com/bicycling-safety-on-roadways/
- research/towns/palm-springs-ca/shops.md — the ship and rent lists, and their sources
- data/towns/los-angeles-ca.json — the Alaska, Southwest, BikeFlights and ShipBikes lines, read Sept 30, 2026
- research/towns/palm-springs-ca/brief.md, research/towns/los-angeles-ca/brief.md, research/towns/phoenix-az/brief.md — the centres for the straight-line miles

Not fetched (permission request timed out, Oct 4; not fetched any other way): https://flypsp.com/airlines/, https://www.alaskaair.com/content/travel-info/baggage/special-baggage/traveling-with-sporting-equipment, https://support.southwest.com/helpcenter/article/flying-with-a-bike-policy, https://www.united.com/en/us/fly/baggage/sports-equipment.html, https://www.palmspringsca.gov/Home/Components/News/News/8419/23 (403).
