# palm-springs-ca · stay-scout · 2026-10-04

Six places, all read on their own pages this run (the Oct 3 run read none).
Five sit inside the Tour de Palm Springs organizer's distance bands from the
start on S. Palm Canyon; the sixth is the splurge farther out. Not one hotel
page in Palm Springs says a word about a guest's own bike. Two (Ace, Parker)
lend house bikes, which tells you they have somewhere to put bikes, but that
is not a policy, so every `bike_policy` below is "No stated policy — ask when
you book." No rate loaded on any page (the booking engines are scripts), so
`price_hint` is null everywhere; the notes carry the fees that did show
(parking, resort fee). Nothing on any hotel page or the Tour's pages says
hotels fill or set minimum stays on Tour weekend, so the guide shouldn't say
it. Distances are the organizer's bands plus the block count from the brief's
centre (Palm Canyon at Tahquitz); no geocoder page was read, so nothing is
measured in miles. Palm Mountain Resort (the mid-price pick a block from the
start) was refused again and is in Couldn't confirm. Five WebSearch calls,
fourteen fetches.

## Findings

```json
[
  {
    "name": "Hilton Palm Springs",
    "url": "https://www.hilton.com/en/hotels/psppshf-hilton-palm-springs/",
    "booking_url": null,
    "address": "400 East Tahquitz Canyon Way, Palm Springs, CA 92262",
    "note": "Downtown, on Tahquitz Canyon Way four blocks east of Palm Canyon; the Tour de Palm Springs lists it under a mile from the start and names it a lodging sponsor. A full-size hotel: outdoor pool, restaurant, poolside bar, meeting rooms, by its own page. Self-parking $30 a day; check-in 4, out noon; pets $75 (Oct 2026). Nothing about bikes on the page.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "Hyatt Palm Springs",
    "url": "https://www.hyatt.com/hyatt-hotels/en-US/palms-hyatt-palm-springs",
    "booking_url": null,
    "address": "285 North Palm Canyon Drive, Palm Springs, CA 92262",
    "note": "On Palm Canyon Drive, three blocks north of Tahquitz and under a mile from the Tour start by the organizer's list. All suites: 197 of them, each with a separate parlor and a refrigerator, by its page; outdoor pool. Daily resort fee $20 plus tax (Oct 2026). Nothing about bikes on the page.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "Hotel Zoso",
    "url": "https://www.hotelzosopalmsprings.com/",
    "booking_url": null,
    "address": "150 S Indian Canyon Dr, Palm Springs, CA 92262",
    "note": "A block east of Palm Canyon on Indian Canyon, a block and a half south of Tahquitz; under a mile from the Tour start by the organizer's list. Its own page sells it as a pool-party hotel downtown (\"party the weekend away\"), with a spa and an airport shuttle folded into a resort fee it doesn't price. Nothing about bikes on the page.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "Caliente Tropics",
    "url": "http://calientetropics.com/",
    "booking_url": null,
    "address": "411 E Palm Canyon Dr, Palm Springs, CA 92264",
    "note": "On E Palm Canyon (Highway 111) where it bends east, under two miles from the Tour start by the organizer's list. A 1964 tiki-styled motor hotel, updated, with a pool; its own page calls it \"your top choice for Palm Springs hotel rooms at affordable prices.\" The cheap, clean pick on the Tour's list by its own words, but no rate loaded (Oct 2026). Nothing about bikes on the page. Phone (760) 327-1391.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "Ace Hotel & Swim Club",
    "url": "https://acehotel.com/palm-springs/",
    "booking_url": null,
    "address": "701 E Palm Canyon Dr, Palm Springs, CA 92264",
    "note": "On E Palm Canyon south of downtown, under three miles from the Tour start by the organizer's list. A converted motel with two pools, a diner and a bar. House bikes: \"We've got bikes. They're free, first come, first served,\" per its survival guide; the FAQ folds bike rentals into the $45-a-night resort fee. Parking $10 a day; check-in after 4, out 11; pets $100 a stay, under 25 lbs (Oct 2026). Nothing about bringing your own bike.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "Parker Palm Springs",
    "url": "https://www.parkerpalmsprings.com/",
    "booking_url": null,
    "address": "4200 E. Palm Canyon Drive, Palm Springs, CA 92264",
    "note": "The splurge: 144 rooms on 13 acres at the Cathedral City end of E Palm Canyon, past the Tour's three-mile band (not measured). Its own cycling page lends \"complimentary bikes\" (beach cruisers with helmets and locks) and hands out the city's cycling map at the concierge desk. Not on the Tour's hotel list. No rate loaded (Oct 2026). Nothing about bringing your own bike.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  }
]
```

travel_links

```json
[
  {
    "label": "Tour de Palm Springs hotel list",
    "url": "https://tourdepalmsprings.com/event-info/lodging/",
    "kind": "official",
    "note": "The Tour's own list of 19 Palm Springs hotels, grouped by distance from the start and finish: under 1, 2, 3 and 5 miles. The page says \"Each hotel has special rates and incentives\" and \"For every booked room, the Tour de Palm Springs receives a donation towards our charities.\" Book with the hotel directly. Read Oct 4, 2026."
  }
]
```

## Why these

- **Hilton Palm Springs** — the Tour's lodging sponsor, under a mile from the start, a big plain hotel with a pool. Read first, as asked. The only one of the six with a parking price on the page.
- **Hyatt Palm Springs** — on Palm Canyon itself, three blocks from the start block. Every room is a suite with a parlor: room for a bike case on the floor.
- **Hotel Zoso** — a block off Palm Canyon. It is a party hotel by its own words; it goes in so a rider who wants quiet knows to pick something else, and a rider who doesn't has the closest bed.
- **Caliente Tropics** — the cheap pick on the Tour's list, in its own words ("affordable prices"), a 1964 motor hotel with parking at the door. Under two miles from the start.
- **Ace Hotel & Swim Club** — the mid pick with house bikes to borrow, two pools and a bar, under three miles. The $45 resort fee and $10 parking are on the page.
- **Parker Palm Springs** — the splurge, with free beach cruisers and the city's bike map at the desk. Farther out; not on the Tour's list.

## Rejected

- **Drift Palm Springs** (drifthotels.co) — suites with kitchens, "complimentary bikes" first come, first served, downtown. Left out because its amenities page carries no address, and no other page of its own was read. One fetch of its contact page and it can go in as a second mid pick.
- **Parker's "Cycling in Palm Springs" page as a route source** — it names Big Wheel Tours and the city's map, nothing a rider can follow. Passed to @route-scout.
- **Tripadvisor "hotels with bike rentals", bikabout's lodging list, naturehotels.org** — third-party lists. bikabout names Ace, Hotel California and Desert Riviera for "complimentary adult bikes," but its links go to Tripadvisor, not the hotels. Leads only; Ace was read on its own page and is in.
- **Yelp, Expedia, trip.com, guestreservations.com, the *.hotelspalmspringsweb.com clones** — booking and review sites. Not property pages. The zoso clone's "rates from $127" is not the hotel's number.
- **Facebook page for Caliente Tropics** — the fetcher can't read Facebook, and the chamber listing plus the hotel's own site covered it.

## Couldn't confirm

- **Palm Mountain Resort & Spa**, 155 S Belardo Rd (address from the search result title, not its page), https://www.palmmountainresort.com/ — refused again (permission request timed out, Oct 4). On the Tour's under-a-mile list and a block west of the start block. The likeliest mid-price pick nearest the start. Missing: what it is, bike line, rate, parking. Where to look: its own site in a session where the fetch is approved.
- **Rowan, Holiday House, Alcazar, The Dunes, Colony Palms, Ingleside Estate, Avalon** (under a mile), **Riviera** (under two), **The Saguaro, Twin Palms, Sparrows Lodge, L'Horizon** (under three), **Azure Palm Hot Springs** (under five) — on the Tour's list, not fetched this run (the search budget went to the six above). The brief's line on small, adults-only and clothing-optional resorts applies to several of these; none was read, so none is described. Twin Palms redirect-looped on Oct 3.
- **Hotel California** and **Desert Riviera Hotel** — bikabout says both lend adult bikes. Neither site surfaced in a search, so neither was fetched. Missing everything.
- **Drift Palm Springs** — address, rate, parking. See Rejected.
- **Rates.** Not one of the six pages printed a nightly rate. The editor can read the booking engines by hand or leave `price_hint` null; the notes say which fees did load.
- **Tour weekend minimum stays.** No hotel page and no Tour page says anything. Leave it out of the guide.
- **Courtyard by Marriott** — a Tour lodging sponsor per the sponsors page (Oct 3 run); the page doesn't say which Courtyard. Not searched this run.
- **Zones 2 and 3** (Palm Desert, La Quinta, the Highway 74 climb) — no hotel looked at. Every pick is Palm Springs proper, which is where the Tour starts and where the brief's winter rider lands.
- **The town centre** (33.8303, -116.5453) — no geocoder page read; distances here are the organizer's bands and block counts.
- **Ace's and Parker's `url`** point at the property landing pages (acehotel.com/palm-springs/, parkerpalmsprings.com). The pages read were Ace's FAQ and survival guide and Parker's cycling page, all under those sites; the landing pages themselves weren't fetched. The verifier's fetch will settle it.

## Hand-offs

- **@route-scout:** Parker's page says the concierge hands out "a cycling map created by the City of Palm Springs" with suggested routes; the city's own bike-map page is worth a fetch. Ace's survival guide calls Indian Canyons "about a 20-minute ride" from 701 E Palm Canyon.
- **@logistics-scout:** Hotel Zoso's resort fee includes an airport shuttle (amount not on the page). Hilton self-parking $30/day, Ace $10/day (Oct 2026).
- **@culture-scout:** Hyatt's page names VillageFest as a nearby draw (it's on the culture list). Ace's Swim Club is open to hotel guests 7 a.m. to 2 a.m.; the main pool is 18+.
- **@community-scout:** nothing here runs rides.

## Sources

- https://tourdepalmsprings.com/event-info/lodging/
- https://www.hilton.com/en/hotels/psppshf-hilton-palm-springs/
- https://www.hyatt.com/hyatt-hotels/en-US/palms-hyatt-palm-springs
- https://www.hotelzosopalmsprings.com/
- http://calientetropics.com/
- https://pschamber.org/business-directory/name/caliente-tropics/
- https://acehotel.com/palm-springs/frequently-asked-questions/
- https://acehotel.com/palm-springs/survival-guide/
- https://www.parkerpalmsprings.com/cycling-in-palm-springs
- https://www.drifthotels.co/palmsprings/amenities
- https://www.bikabout.com/lodging

Tried and could not open (Oct 4, 2026): https://calientetropics.com/ (https
refused; the http address loaded), https://www.palmmountainresort.com/
(refused). Search results not fetched (review and booking sites):
tripadvisor.com, yelp.com, expedia.com, trip.com, travelweekly.com,
guestreservations.com, trivago.com, hotel.info, spasofamerica.com,
reservationdesk.com, *.hotelspalmspringsweb.com, palmspringsresorts.net,
hotelsinpalmsprings.net, allhotelscalifornia.com, naturehotels.org,
spiritofsofia.com, visitgreaterpalmsprings.com (bike rentals page),
facebook.com/CalienteTropics, palmsprings.gaycities.com.

WebSearch: 5 calls (bike-friendly hotels; Caliente Tropics; Palm Mountain /
Zoso / Hyatt; Ace Hotel; Palm Mountain Resort). The culture run used the
other 7 of the session's 12.
