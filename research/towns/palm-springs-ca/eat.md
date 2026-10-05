# palm-springs-ca · eat-scout · 2026-10-04 (second pass; replaces the Oct 3 report)

Seven places, all in Palm Springs, every slot filled: the night before (Las
Casuelas Terraza, Lulu, Taqueria Tlaquepaque), after the ride (Sherman's,
King's Highway; Townie Bagels cross-listed from coffee.md), late (the Amigo
Room at the Ace, Blackbook). The Oct 3 picks are kept; Las Casuelas now has
hours from its own page, and five of the seven have hours from the business's
own site. Blackbook's site refuses crawlers, so its hours are still a press
line. "On the way" is still empty: nothing on Highway 74, and the Tram road
ends at a gate (routes.md, second pass).

How this run went: search worked (14 calls, shared with coffee and routes).
Every restaurant site was withdrawn on permission when fetched cold and
opened once a search returned it. Yelp, Apple Maps and blackbookbar.com refuse
crawlers. No geocoder page, so no distances from downtown.

## Findings

```json
[
  {
    "name": "Las Casuelas Terraza",
    "url": "https://www.lascasuelas.com/",
    "address": "222 S Palm Canyon Dr, Palm Springs, CA 92262",
    "cuisine": "Mexican",
    "note": "The night before the Tour de Palm Springs, on the street it starts on: enchiladas, mole and tamales on three patios, one with a bar and a bandstand, one on the sidewalk. Open 11 a.m. to 10 p.m. Thursday to Monday (its own page), closed Tuesday and Wednesday. Reservations online or at (760) 325-2794; large parties by email through the site. A Tour sponsor."
  },
  {
    "name": "Lulu California Bistro",
    "url": "https://lulupalmsprings.com/",
    "address": "200 S Palm Canyon Dr, Palm Springs, CA 92262",
    "cuisine": "American",
    "note": "The big room for a group the night before: a long menu, an outdoor terrace on Palm Canyon a block from the Tour start, and a mezzanine the site says is for parties. Open 11 to 9 Monday to Thursday, 11 to 10 Friday, 9 a.m. to 10 Saturday, 9 to 9 Sunday (its own page). Reservations on OpenTable; (760) 327-5858. A Tour sponsor."
  },
  {
    "name": "Taqueria Tlaquepaque",
    "url": null,
    "address": "362 S Palm Canyon Dr, Palm Springs, CA 92262",
    "cuisine": "Mexican",
    "note": "The cheap plate: a carne asada burrito on South Palm Canyon, the Tour's street, with a patio. Its Tripadvisor listing (reviews to Sept 2026) has it open daily to 9, to 10 Friday and Saturday; its own site didn't open, so confirm. A second store sits at 650 E Sunny Dunes Rd, Ste 5, in the same plaza as Townie Bagels, open 8 to 9 daily per its listing. (760) 325-1125."
  },
  {
    "name": "Sherman's Deli & Bakery",
    "url": "https://shermansdeli.com/locations/",
    "address": "401 E Tahquitz Canyon Way, Palm Springs, CA 92262",
    "cuisine": "Deli",
    "note": "The plate after the ride: a New York deli on Tahquitz Canyon Way, two blocks east of the Tour start, pastrami and a bakery counter, big portions. Open 8 a.m. to 9 p.m. every day (its own page), so breakfast is there when you get back. There's a second Sherman's at 73161 Country Club Dr in Palm Desert, same hours. Outdoor seating and bike parking weren't on the page."
  },
  {
    "name": "King's Highway",
    "url": "https://www.kingshighwaydiner.com/",
    "address": "701 E Palm Canyon Dr, Palm Springs, CA 92264",
    "cuisine": "Diner",
    "note": "The diner at the Ace Hotel on the south end of town: breakfast from 7 a.m. daily, dinner 4 to 9 Monday to Thursday and 4 to 10 Friday to Sunday (its own page), with indoor and patio tables. Koffi South is next door. The early breakfast in Palm Springs that isn't a bagel."
  },
  {
    "name": "Amigo Room at the Ace Hotel",
    "url": "https://acehotel.com/palm-springs/eat-drink/",
    "address": "701 E Palm Canyon Dr, Palm Springs, CA 92264",
    "cuisine": "Bar food",
    "note": "Late, when the day ran long: the Ace's bar is open 4 p.m. to 11 Sunday to Thursday and 4 to 1 a.m. Friday and Saturday, and the kitchen closes an hour before the bar (the hotel's page). What the kitchen serves wasn't on the page. A bar, so expect 21 and over."
  },
  {
    "name": "Blackbook",
    "url": "https://www.blackbookbar.com/",
    "address": "315 E Arenas Rd, Palm Springs, CA 92262",
    "cuisine": "Bar food",
    "note": "Late, downtown: a whiskey and cocktail bar on Arenas Road whose kitchen does burgers and tacos until midnight (outxout, July 2026). Palm Springs Life names the street tacos and the fried chicken sandwich. A bar first; its own site refuses crawlers, so opening time and days aren't confirmed. 760-832-8497."
  }
]
```

## Why these

- **Las Casuelas Terraza**: the Tour's street and a Tour sponsor. Its own
  pages now: "222 S Palm Canyon Dr. Palm Springs, CA 92262", "(760) 325-2794",
  "11AM TO 10PM FOR DINE IN THURSDAY TO MONDAY", three patios (the Terraza
  with the fountain, the Palapa with "an outdoor bar, dance floor and
  bandstand", the Cantina sidewalk patio), reservations online, "large party
  bookings" by email. Palm Springs Life (Sept 2026) supplied the Delgado
  family recipes line on Oct 3. Feb 6, 2027 is a Saturday, so Friday night
  works; a Tuesday or Wednesday arrival doesn't.
- **Lulu California Bistro**: the other Tour sponsor on the start block,
  and the room that takes a group. Its page: "200 S Palm Canyon Dr", "(760)
  327-5858", Sun 9–9, Mon–Thu 11–9, Fri 11–10, Sat 9 a.m.–10, OpenTable, an
  "outdoor terrace", a "climate-controlled patio" and a mezzanine "perfect for
  parties". The 9 a.m. weekend opening also makes it a Sunday brunch after
  a ride. "A block from the start" is read off the addresses (200 vs. the
  start at Tahquitz); not measured.
- **Taqueria Tlaquepaque**: the cheap, fast night-before plate. The Palm
  Springs Guys (July 2026): "no-fuss carne asada burrito". Two Tripadvisor
  listings: 362 S Palm Canyon Dr (patio, "$", newest review Sept 9, 2026;
  hours printed as opening at 8 or 8:30 and closing 9, 10 Fri–Sat) and 650 E
  Sunny Dunes Rd Ste 5 (patio, "$", 8–9 daily, newest review Jan 2026). Both
  print (760) 325-1125. Its own site (taqueriatlaquepaquerest.com) never came
  back in a search, so `url` is null and the note says confirm. The S Palm
  Canyon store is the pick because it's the Tour's street; the Sunny Dunes
  store is in Townie's plaza.
- **Sherman's Deli & Bakery**: the after-ride plate. Its locations page:
  "401 E Tahquitz Canyon Way, Palm Springs, CA 92262", "(760) 325-1199", "open
  from 8:00am to 9:00pm daily", and the Palm Desert store at 73161 Country
  Club Drive, (760) 568-1350, same hours. "Two blocks east" of the start is
  from the addresses (401 E Tahquitz; Koffi Central is at 650), not measured.
- **King's Highway**: the early breakfast. Its page: "The desert diner at Ace
  Hotel & Swim Club", "701 East Palm Canyon Drive, Palm Springs, CA 92264",
  "760.969.5777", daily from 7 a.m., dinner Mon–Thu 4–9, Fri–Sun 4–10,
  "indoor and outdoor patio dining". The Ace's own eat-drink page agrees
  (Fri–Sun 7–10, Mon–Thu 7–9). Koffi South (coffee.md, Why these) is "adjacent
  to The Ace Hotel" per Koffi's page.
- **Amigo Room**: the confirmed late kitchen. The Ace's page: "Sunday-
  Thursday: 4pm-11pm", "Friday-Saturday: 4pm-1am", kitchen closes one hour
  before the bar — so food to 10 most nights and to midnight Friday and
  Saturday. The menu isn't on the page; `cuisine` is "Bar food" because it's
  a bar's kitchen, and the note says the menu is unknown. @culture-scout may
  want it too.
- **Blackbook**: the late pick from Oct 3, unchanged. blackbookbar.com and
  its /hours page answer "All paths disallowed by robots.txt", so the
  "until midnight" is still outxout's (July 2026) and the address and phone
  are Palm Springs Life's (Oct 2024) and outxout's. Kept because three press
  pages agree and it fills the slot; the verifier should call.
- **Townie Bagels** (coffee.md): cross-list as the after-ride breakfast.
  6:30 to noon, closed Tuesday, from its own page.

## Rejected

- **The valley's Mexican restaurants in Palm Springs Life's Sept 2026 list**
  (Las Casuelas Nuevas, Fresh Agave, Don Diego's, Casa Mendoza, Pueblo Viejo
  Grill, Delicias, La Tablita, Seven Feathers). No fetched page ties any to a
  ride or route. Casa Mendoza (78110 Calle Estado, La Quinta) is a block from
  Main Street Coffee in Old Town La Quinta (coffee.md) if the editor wants an
  east-valley plate; not fetched.
- **Special-occasion and hotel dining in the Palm Springs Guys' guide**
  (Copley's, Mr. Lyons, Norma's, 4 Saints, The Colony Club, The Barn Kitchen,
  Workshop, Johannes, Le Vallauris). A dinner bill, not a plate after 80 miles.
- **Drag brunches (Oscar's, Boozehounds).** 11 a.m. weekends; an outing, and
  @culture-scout's.
- **Bill's Pizza.** Two domains (billspizzapalmsprings.com, billspizzapalmdesert.com),
  a Tour sponsor. Not searched this run; the night-before slot is full.
- **Visit Greater Palm Springs' tour-operator post.** Lulu and Eight4Nine as
  pedal-tour partners; no evidence about either.

## Couldn't confirm

- **Taqueria Tlaquepaque's own hours.** Its site never came back in a
  search. Where to look: taqueriatlaquepaquerest.com, a call to (760)
  325-1125.
- **Blackbook's hours and age policy.** Site refuses crawlers. Where to
  look: a call to 760-832-8497, its Instagram.
- **What the Amigo Room's kitchen serves.** Not on the Ace's page.
- **On the way up Highway 74.** PJAMM's climb page names no store or water
  (routes.md, second pass). The Coachella Valley Vista Point at mile 8.4 is
  a parking lot, not a stop. Nothing to list.
- **The Trading Post at Indian Canyons.** Velo Palm Springs (Dec 2023) names
  it on the Indian Canyons ride. Not searched this run. Where to look: the
  Agua Caliente tribe's Indian Canyons page (hours, fee, whether bikes pass
  the gate).
- **Babe's Bar-B-Que and Brewery** (the Tour's beer garden, per Palm Springs
  Life, Jan 2023). Not searched.
- **Palm Desert Bike N Brews** kitchen (73865 CA-111). Domain served a
  gambling page Oct 3; @shop-scout has it.
- **Torakichi Ramen, Rooster and the Pig, Cheeky's, Liv's** (the Palm
  Springs Guys, July 2026). Not searched; the slots were full. Torakichi is
  the night-before bowl if the editor wants one that isn't Mexican.
- **Outdoor tables and bike parking.** Patios confirmed at Las Casuelas,
  Lulu, King's Highway and both Tlaquepaque stores. Nothing anywhere on bike
  parking.
- **Distances from downtown.** No geocoder page fetched.

## Sources

- https://www.lascasuelas.com/
- https://www.lascasuelas.com/contact-us
- https://lulupalmsprings.com/
- https://shermansdeli.com/locations/
- https://www.kingshighwaydiner.com/
- https://acehotel.com/palm-springs/eat-drink/
- https://www.tripadvisor.com/Restaurant_Review-g32847-d12841820-Reviews-Taqueria_Tlaquepaque-Palm_Springs_Greater_Palm_Springs_California.html
- https://www.tripadvisor.com/Restaurant_Review-g32847-d448089-Reviews-Taqueria_Tlaquepaque-Palm_Springs_Greater_Palm_Springs_California.html
- Read Oct 3, 2026 (the first pass; facts carried over): https://www.palmspringslife.com/restaurants/readers-choice-9-mexican-restaurants-to-try-across-greater-palm-springs/ · https://tourdepalmsprings.com/event-info/sponsorship-our-sponsors/ · https://tourdepalmsprings.com/routes2/ · https://outxout.com/blog/lgbtq-guide-palm-springs · https://outxout.com/blog/best-gay-bars-palm-springs · https://www.palmspringslife.com/restaurants/discover-arenas-road-the-official-gay-district-in-downtown-palm-springs/ · https://www.thepalmspringsguys.com/blog/our-favorite-restaurants-in-gay-palm-springs · https://www.velopalmsprings.com/indian-canyons-cycling-route-south-palm-canyon-guide/ · https://www.palmspringslife.com/an-insiders-guide-to-the-coachella-valley-cycling-scene/
- research/towns/palm-springs-ca/coffee.md (Townie Bagels, Koffi South), routes.md (Highway 74, the Tram gate), culture.md (Blackbook hand-off)

Refused by robots.txt (not fetched any other way): https://www.blackbookbar.com/ · https://www.blackbookbar.com/hours

Withdrawn on permission before a search gave provenance (then opened after one): https://www.lascasuelas.com/ · https://shermansdeli.com/ · https://www.kingshighwaydiner.com/ · https://www.blackbookbar.com/

WebSearch: 14 calls (the cap), shared across coffee, eat and routes.
