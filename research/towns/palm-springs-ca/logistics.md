# palm-springs-ca — logistics

town: `palm-springs-ca` · agent: **logistics-scout** · date: **2026-10-03**

One `bring_your_bike` object. It's thinner than the LA bar, and here is
why. WebSearch was spent after the third call of this run (the session's
shared cap), and most new domains timed out on the permission step: the
airport (flypsp.com), SunLine, Alaska, Southwest, Delta, United, BikeFlights,
ShipBikes, CalBike, the city and CVAG. None was fetched any other way. What
loaded: American's two baggage pages, the Tour de Palm Springs site, and the
CV Link site (linked from the Tour's routes page). So:

- `fly.airports` has PSP with `miles` and `note` null; `airline_note` is
  American only.
- `transit_bike_rules`, `bike_share` and the California law are null or
  missing. California law is statewide: the LA guide's `rules_and_safety`
  (read Sept 30, 2026, sources in `data/towns/los-angeles-ca.json`) has the
  law sentences. The editor can lift them or have them re-read. The
  traffic read for the valley still needs its own source.
- The ship and rent lists are lifted from `shops.md` (@shop-scout, this
  run), not re-checked.

Driving distances are straight-line, computed from the centres in the three
briefs (Palm Springs 33.8303, -116.5453; LA 34.0522, -118.2437; Phoenix
33.4484, -112.0740): about 99 and 259 miles. No drive-time page loaded.

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
  "summary": "Bring it if your airline checks a packed bike as a regular bag: American does, $45 each way paid online (Oct 2026), and $90 round trip is less than one day of a carbon rental. Rent if you'd rather not pack a bike for one ride: three valley shops rent carbon road bikes at $100 to $140 a day and deliver to Palm Springs hotels (Oct 2026), with a two-day minimum on Tour de Palm Springs weekend at two of them. No shop says on its own site that it receives a shipped bike, so call before you ship.",
  "fly": {
    "airports": [
      {
        "name": "Palm Springs International",
        "code": "PSP",
        "miles": null,
        "note": null
      }
    ],
    "airline_note": "Read on American's own pages, Oct 2026: one non-motorized bike in a hard case, a bike bag or a box built for bikes goes at the standard checked bag fee up to 50 lb; 51 to 70 lb pays the standard overweight fee; oversize fees do not apply. Handlebars fixed sideways; pedals off, or pedals and handlebars wrapped in foam. First bag $50 at the airport or $45 online, second $60 or $55 online, US domestic, updated May 18, 2026. Other airlines: not confirmed for this guide; read your airline's sports-equipment page before you book."
  },
  "ship": {
    "note": "No Coachella Valley shop says on its own site that it receives a shipped bike and builds it (checked Oct 2026). Village Peddler in La Quinta lists \"bike shipping\" with its repairs and does not say which way; call before you ship anything. With three shops renting carbon road bikes, renting is the simpler plan here.",
    "shops": []
  },
  "rent": {
    "note": "Three shops, four stores, rent carbon road bikes: $100 to $140 a day, $300 to $400 a week (Oct 2026), two of them with Di2. All four also rent full-suspension mountain bikes. Big Wheel on South Palm Canyon is the only fleet in Palm Springs; the rest sit in Palm Desert, about 12 miles down the valley, and deliver to Palm Springs for $50 (Big Wheel, Tri-A-Bike) or $100 (Bike N Brews). None lists frame sizes; call with your height. Big Wheel and Tri-A-Bike set a two-day minimum on Tour de Palm Springs weekend, so book early. No gravel rental was found. The math: American checks your bike as a regular bag, $90 round trip paid online (Oct 2026), less than one day of a carbon rental. Renting saves the case, the airport and the build; a carbon rental costs more from the first day. For the Tour, renting is fair if you'd rather not pack a bike for one ride. For a week, or a fit you depend on, bring yours.",
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
    "note": "Not for a Tour weekend or a week of road riding on the valley floor. The Tour starts downtown and packet pickup is downtown, the airport is in town, and the rental shops deliver to Palm Springs hotels for $50 to $100 (Oct 2026). CV Link runs about 20 miles from the Palm Springs Visitor Center along the Whitewater River to Date Palm Drive in Cathedral City, with no posted hours, lights set in the path and water stations; it picks up again for 5.4 miles in Palm Desert, from the Bump and Grind trailhead to Cook Street, and for 16 miles from Washington Street in La Quinta to Coachella. Rancho Mirage and Indian Wells left gaps, and the CV Link site posts no way across them (read Oct 2026). Joshua Tree and the Salton Sea are car days. Driving in: downtown Los Angeles is about 100 miles west and downtown Phoenix about 260 miles east in a straight line; the road is longer. Tour de Palm Springs weekend, Feb 5 and 6, 2027: packet pickup Friday noon to 8 pm and Saturday from 6 am at South Palm Canyon and Baristo; the century rolls at 6:30 am from South Palm Canyon between Baristo and Tahquitz, the 16-mile route at 9:30; bike support at the start and at every SAG stop (the Tour's FAQ and registration page, Oct 2026).",
    "transit_bike_rules": null,
    "bike_share": {
      "name": null,
      "url": null,
      "note": null
    }
  },
  "rules_and_safety": "On CV Link, bikes share the path with e-bikes, electric scooters and low-speed electric vehicles, golf carts included; carts and other low-speed vehicles are held to 20 mph, scooters and boards to 15 mph (CV Link FAQ, Oct 2026). On Tour day all kinds of bikes are allowed, recumbents, trikes and electric bikes included, and you need the helmet sticker to get into a SAG stop (the Tour's FAQ, Oct 2026).",
  "sources": [
    "https://www.aa.com/i18n/travel-info/baggage/specialty-and-sports.jsp",
    "https://www.aa.com/i18n/travel-info/baggage/checked-baggage-policy.jsp",
    "https://tourdepalmsprings.com/faq/",
    "https://tourdepalmsprings.com/registration/",
    "https://tourdepalmsprings.com/event-info/",
    "https://tourdepalmsprings.com/routes2/",
    "https://www.coachellavalleylink.com/",
    "https://www.coachellavalleylink.com/about-the-project/faqs/",
    "https://www.coachellavalleylink.com/maps/",
    "https://www.coachellavalleylink.com/cv-link-city-gaps/",
    "https://bwbtours.com/palm-springs-bike-rentals/",
    "https://bwbtours.com/palm-desert-bike-rentals/",
    "https://www.triabike.com/articles/bike-rentals-pg183.htm",
    "https://www.triabike.com/",
    "https://www.pdbikesnbrew.com/articles/bike-rentals-pg233.htm",
    "https://villagepeddlerlq.com/bike-repair/"
  ]
}
```

## Why these

- **PSP** — the town's own airport, named in the brief. Kept with miles and note null rather than guessed.
- **American's bike rule** — the one airline page that loaded: a bike in a case is a standard bag to 50 lb, no oversize fee. That is the number the rent-or-bring math runs on.
- **No ship-to-shop shop** — an empty list on purpose. A rider trusting this line with a bike needs a shop that says it; none does.
- **The four rental stores** — lifted from `shops.md`: carbon road bikes at three shops, Di2 at two, prices with dates, delivery to Palm Springs from all of them.
- **`car_needed: false`** — the Tour start, packet pickup, the airport and one rental fleet are all in Palm Springs, the Palm Desert shops deliver, and CV Link covers about 20 miles from Palm Springs to Cathedral City. Joshua Tree and the Salton Sea are the car days.
- **CV Link** — the valley's long path, with its open pieces, gaps, speed limits and lights from CVAG's own project site. Shared with the route scout's zone 2.
- **The Tour weekend** — packet pickup times and place, start times and place, and on-course bike support, from the Tour's own FAQ and registration page.

## Rejected

- **Big Wheel Tours' festival pricing** ($140 to $160 a bike for four days) — that's Coachella and Stagecoach pricing, not the Tour. Left out of the rent note.
- **Village Peddler's rentals** — hybrids and cruisers. Not in the rent list (see `shops.md`).
- **Velo Palm Springs' safety page** (https://www.velopalmsprings.com/bicycling-safety-on-roadways/) — general tips, no California law cited and no valley crash data. Not a source for `rules_and_safety`.
- **Velo Palm Springs' CV Link page** — fetched; used only for the CVAG and CV Link links. Facts come from CVAG's own site.
- **Tour lodging page** — a list of hotels by distance from the start, with no rates, minimum stays or bike policies. A hand-off to @stay-scout, not a logistics source.

## Couldn't confirm

- **PSP's airline list, the airport's distance from downtown, and ground transport with a bike box** — flypsp.com and https://flypsp.com/airlines/ timed out; so did the city's aviation page (https://www.palmspringsca.gov/government/departments/aviation). Missing: which airlines fly PSP (seasonal service matters here), the miles, taxi and rideshare pickup, rental cars. Where to look: flypsp.com's airlines and ground-transportation pages.
- **Other airports within about 90 minutes** — Ontario (ONT) is the likely one; nothing loaded to measure or confirm it. The LA guide's ONT entry has its airline list (Sept 2026) but measured from LA.
- **Alaska, Southwest, Delta and United bike rules** — every page timed out this run (Alaska's sporting-equipment and checked-bags pages, Southwest's bike policy and fees, Delta's sporting-equipment and baggage overview, United's sports-equipment page). The LA guide read Alaska, Southwest and Delta on Sept 30, 2026, with sources; United was not confirmed there either. Once PSP's airline list is known, the editor can carry the LA lines for the airlines that fly here, or have them re-read.
- **SunLine bikes on buses** — https://www.sunline.org/ and https://www.sunline.org/bikes timed out. Missing: rack spaces, e-bike and weight rules, whether a bike rides inside, and whether any route serves PSP. Where to look: SunLine's bikes-on-board page.
- **Bike share** — none confirmed in the valley; nothing loaded to check.
- **Shipping carriers** — BikeFlights (https://faq.bikeflights.com/support/solutions/articles/13000072401-how-does-the-service-work-) and ShipBikes (https://www.shipbikes.com/frequently-asked-questions/) timed out. No transit-time line. It matters less while no shop receives a shipped bike.
- **California law** — CalBike's law page (https://www.calbike.org/go_for_a_ride/california_bicycle_laws/) timed out. See the note at the top: the LA guide's text is statewide and verified Sept 30, 2026.
- **Traffic read for Palm Springs and the valley** — no crash data or safety page loaded. Where to look: the city's traffic safety or Vision Zero page, CVAG's active transportation plan, the Desert Sun.
- **Drive times from LA and Phoenix** — only straight-line miles, computed from the briefs.
- **Tour weekend minimum stays** — the Tour's lodging page gives none; @stay-scout has the hotels.
- **The town centre** — 33.8303, -116.5453 was not checked against a geocoder page; none loaded.

## Sources

- https://www.aa.com/i18n/travel-info/baggage/specialty-and-sports.jsp
- https://www.aa.com/i18n/travel-info/baggage/checked-baggage-policy.jsp
- https://www.tourdepalmsprings.com/
- https://tourdepalmsprings.com/event-info/
- https://tourdepalmsprings.com/event-info/lodging/
- https://tourdepalmsprings.com/routes2/
- https://tourdepalmsprings.com/registration/
- https://tourdepalmsprings.com/faq/
- https://tourdepalmsprings.com/parking/ (a map image; no text facts)
- https://tourdepalmsprings.com/sag-stops/
- https://www.coachellavalleylink.com/
- https://www.coachellavalleylink.com/about-the-project/faqs/
- https://www.coachellavalleylink.com/maps/
- https://www.coachellavalleylink.com/cv-link-city-gaps/
- https://www.coachellavalleylink.com/community-connectors/
- https://www.velopalmsprings.com/
- https://www.velopalmsprings.com/cv-link/
- https://www.velopalmsprings.com/bicycling-safety-on-roadways/
- research/towns/palm-springs-ca/shops.md — the ship and rent lists, and their sources
- research/towns/palm-springs-ca/brief.md, research/towns/los-angeles-ca/brief.md, research/towns/phoenix-az/brief.md — the centres for the straight-line miles

Not fetched (permission request timed out): https://flypsp.com/, https://flypsp.com/airlines/, https://www.palmspringsca.gov/government/departments/aviation, https://www.sunline.org/, https://www.sunline.org/bikes, https://www.cvag.org, https://www.alaskaair.com/content/travel-info/baggage/special-baggage/traveling-with-sporting-equipment, https://www.alaskaair.com/content/travel-info/baggage/checked-bags, https://support.southwest.com/helpcenter/article/flying-with-a-bike-policy, https://www.southwest.com/html/customer-service/travel-fees.html, https://www.delta.com/us/en/baggage/special-items/sporting-equipment, https://www.delta.com/us/en/baggage/overview, https://www.united.com/en/us/fly/baggage/sports-equipment.html, https://www.calbike.org/go_for_a_ride/california_bicycle_laws/, https://www.shipbikes.com/frequently-asked-questions/, https://faq.bikeflights.com/support/solutions/articles/13000072401-how-does-the-service-work-.
