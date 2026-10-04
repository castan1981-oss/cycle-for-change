# palm-springs-ca · eat-scout · 2026-10-03

Two places, both in Palm Springs, well under the 4–8 target:
- **Las Casuelas Terraza**, on the street the Tour de Palm Springs starts on.
  It's the night-before or after-the-Tour plate.
- **Blackbook**, for late food downtown.

Townie Bagels (coffee.md) is the breakfast place too; the editor can
cross-list it. That fills three of the five slots at best. "After the ride"
has only Townie, and "on the way" (Highway 74, the Tram road, Indian Canyons)
has nothing confirmed.

The cause was the tools, not a lack of places. WebSearch was spent before I
started (one call, "200 of 200"). Every restaurant's own site I tried was
withdrawn on a permission request. Both addresses come from press pages, not
the restaurants' own pages or Google listings, and no hours were confirmed
for either. The verifier should check both against the Google listing. The
long list under Couldn't confirm is the next run's work, with the URLs
already in hand.

Both sections were one run: 68 fetches, 26 withdrawn on permission, one 403.
No distances: no geocoder page was fetched, so the brief's centre is
unconfirmed.

## Findings

```json
[
  {
    "name": "Las Casuelas Terraza",
    "url": "https://www.lascasuelas.com/",
    "address": "222 S Palm Canyon Drive, Palm Springs, CA",
    "cuisine": "Mexican",
    "note": "The night before, or after the Tour de Palm Springs: a Mexican restaurant with three patios on South Palm Canyon Drive, the street the Tour starts and finishes on, and one of the Tour's sponsors. Enchiladas, mole and tamales from the Delgado family's recipes, per Palm Springs Life (Sept 2026). Hours and whether it takes a group without a reservation weren't on a page we could open; call 760-325-2794."
  },
  {
    "name": "Blackbook",
    "url": "https://www.blackbookbar.com/",
    "address": "315 E Arenas Road, Palm Springs, CA",
    "cuisine": "Bar food",
    "note": "Late, downtown: a whiskey and cocktail bar on Arenas Road whose small kitchen serves burgers and tacos until midnight (outxout, July 2026). Palm Springs Life names the street tacos and the fried chicken sandwich. A bar first; opening hours weren't on a page we could open. 760-832-8497."
  }
]
```

## Why these

- **Las Casuelas Terraza**: the Tour's own street, and the Tour lists it as a
  sponsor.
  - **Palm Springs Life, "Readers Choice: 9 Mexican Restaurants"** (Sept 29,
    2026) gives "222 S Palm Canyon Drive, Palm Springs", "760-325-2794",
    "three patios" and "Four generations of Delgado family recipes ...
    enchiladas, mole, and tamales." It links lascasuelas.com.
  - **The Tour's sponsors page** (2027 event, read Oct 3, 2026) lists "Las
    Casuelas Terraza" with the same URL.
  - **The Tour's routes page:** "The ride start/finish will be on South Palm
    Canyon at Tahquitz."
  - Two current signals. The address and phone are the magazine's, because
    the restaurant's site was withdrawn on permission.
  - It fits "night before" only if it's open past 8 and takes a group. The
    note says to call, because neither was confirmed.
- **Blackbook**: the late slot. Three pages agree on it.
  - **outxout's LGBTQ guide** (March 24, 2026, updated July 28, 2026):
    "comfort food like burgers and tacos served until midnight."
  - **outxout's bar guide** (same dates): "315 E Arenas Road, Palm Springs."
  - **Palm Springs Life on Arenas Road** (Oct 11, 2024): "315 E Arenas Road,
    Palm Springs", "760-832-8497", "the street tacos or the double-dredged
    fried chicken sandwich", URL blackbookbar.com.
  - **The Palm Springs Guys' restaurant guide** (July 23, 2026) lists
    "Blackbook Bar & Kitchen" in the Arenas District and links
    https://www.blackbookbar.com/.
  - "Until midnight" is outxout's, not the bar's own page. Opening time, days
    and whether minors may come in are unknown.
  - culture.md handed it here. It's a bar, so @culture-scout may list it too;
    here it is for the food.
- **Townie Bagels** (in coffee.md): if the editor cross-lists it, it's the
  "after the ride" breakfast in Palm Springs. Bagels, breakfast sandwiches,
  cold brew (Visit Palm Springs, July 2026). No hours.

## Rejected

- **The valley's Mexican restaurants in the same Palm Springs Life piece**
  (Sept 2026; each with an address and phone there):
  - Las Casuelas Nuevas, 70050 Highway 111, Rancho Mirage
  - Fresh Agave, 73325 Highway 111, Palm Desert
  - Don Diego's, 74969 Highway 111, Indian Wells ("dog-friendly patio")
  - Casa Mendoza, 78110 Calle Estado, La Quinta ("alfresco dining area")
  - Pueblo Viejo Grill, 81931 Highway 111, Indio
  - Delicias, 66121 Pierson Blvd., Desert Hot Springs
  - La Tablita, 68369 E Palm Canyon Drive, Cathedral City
  - Seven Feathers at Augustine Casino, Coachella

  No fetched page ties any of them to a ride start or a route, and the brief
  keeps the picks in Palm Springs unless there's a reason. Leads if a route
  report later puts one on the way. Casa Mendoza is the one to check against
  Old Town Coffee in La Quinta, Tri-A-Bike's ride destination (coffee.md).
- **Special-occasion and hotel dining in the Palm Springs Guys' guide**
  (Copley's, Mr. Lyons, Norma's, 4 Saints, The Colony Club, The Barn Kitchen,
  Workshop, Johannes, Le Vallauris, the casino steakhouse). Reservations and
  a dinner bill, not a plate after 80 miles.
- **Drag brunches (Oscar's, Boozehounds).** They start at 11 a.m. weekends
  (outxout on Oscar's). An outing, and @culture-scout's.
- **Palm Springs Life's fine dining, steak, wine bar and ice cream lists.**
  Not the slots a rider needs.
- **Visit Greater Palm Springs' tour-operator post.** Lulu and Eight4Nine
  appear only as partners of Sunny Cycle, a pedal tour. That's no evidence
  about either place.

## Couldn't confirm

All of these are in Palm Springs unless noted. "Missing" is the same for
nearly every one: address, hours, open status from the place's own page or
Google listing.

Withdrawn on permission:

- **Lulu California Bistro** (lulupalmsprings.com). Tried: its own site, the
  Palm Springs Life profile ("For Sweet Treats and Good Eats, Try Lulu
  California Bistro") and its Visit Greater Palm Springs listing
  (/listing/lulu-california-bistro/23768/).
  - A Tour sponsor (sponsors page, 2027).
  - The likeliest big room for a group the night before.
  - **Missing:** address, hours, late hours, patio.
- **Bill's Pizza**. The Tour's sponsors page links billspizzapalmdesert.com,
  and the Palm Springs Guys (July 2026) put it "Downtown" and link
  billspizzapalmsprings.com. Two domains: one store or two?
  - The night-before slice, if confirmed.
  - **Missing:** which store is downtown, its address and hours.
- **Sherman's Deli & Bakery** (shermansdeli.com). The Palm Springs Guys (July
  2026): "Palm Springs landmark ... New York-style pastrami."
  - The after-ride plate, if its breakfast hours check out.
- **King's Highway** at the Ace Hotel (kingshighwaydiner.com). The Palm
  Springs Guys (July 2026): "bohemian diner charm."
  - The likeliest early breakfast in town.
- **Palm Springs Life's brunch, late-night bars and outdoor-dining lists**
  (Aug, July and undated 2026). The brunch list is the after-ride source.

Not tried (the run was losing every restaurant site to the same timeout).
All four are from the Palm Springs Guys (July 2026), and all four are the
night-before or after-ride kind:

- **Torakichi Ramen** (pstorakichiramen.com): "only true ramen place in
  town."
- **Tlaquepaque Taqueria** (taqueriatlaquepaquerest.com): "no-fuss carne
  asada burrito."
- **Rooster and the Pig** (roosterandthepig.com): walk-ins only.
- **Cheeky's** (cheekysf10.com) and **Liv's** (livspalmsprings.com): brunch,
  and breakfast and lunch.

The empty slots:

- **The Trading Post at Indian Canyons.** Velo Palm Springs (Dec 2023) names
  it on the Indian Canyons ride from South Palm Canyon, with "delectable
  Native American cuisine."
  - The "on the way" pick for that ride, if it's open.
  - **Missing:** everything current.
  - **Where to look:** the Agua Caliente tribe's Indian Canyons page (routes.md
    wants it too).
- **On the way up Highway 74.** No food stop found. routes.md couldn't open a
  page for the climb either.
- **Babe's Bar-B-Que and Brewery.** Palm Springs Life (January 2023) says it
  runs the Tour's beer garden downtown. The Tour's FAQ (2027) mentions a beer
  garden on South Palm Canyon but names no operator.
  - A post-Tour lead, nothing more.
- **Palm Desert Bike N Brews** (73865 CA-111, Palm Desert). Its kitchen
  serves "fresh salads, sandwiches, pizzas" (Palm Springs Life, Jan 2023).
  - pdbikenbrews.com now serves a gambling page. See coffee.md; @shop-scout
    has it.
- **Outdoor tables and bike parking.** Las Casuelas has patios. Nothing else
  on bikes, for either pick.

## Sources

- https://www.palmspringslife.com/restaurants/readers-choice-9-mexican-restaurants-to-try-across-greater-palm-springs/
- https://tourdepalmsprings.com/event-info/sponsorship-our-sponsors/
- https://tourdepalmsprings.com/routes2/
- https://tourdepalmsprings.com/faq/
- https://tourdepalmsprings.com/event-info/vendor-expo/
- https://outxout.com/blog/lgbtq-guide-palm-springs
- https://outxout.com/blog/best-gay-bars-palm-springs
- https://www.palmspringslife.com/restaurants/discover-arenas-road-the-official-gay-district-in-downtown-palm-springs/
- https://www.thepalmspringsguys.com/blog/our-favorite-restaurants-in-gay-palm-springs
- https://www.thepalmspringsguys.com/blog
- https://www.palmspringslife.com/restaurants/
- https://www.palmspringslife.com/arts-culture/lgbt/your-guide-to-lgbtq-owned-businesses-in-palm-springs-and-beyond/
- https://www.palmspringslife.com/an-insiders-guide-to-the-coachella-valley-cycling-scene/
- https://visitpalmsprings.com/blog/post/sunny-dunes-gayborhood/
- https://visitpalmsprings.com/
- https://www.visitgreaterpalmsprings.com/
- https://www.visitgreaterpalmsprings.com/blog/post/lgbtq-tour-operators-and-owners/
- https://www.velopalmsprings.com/indian-canyons-cycling-route-south-palm-canyon-guide/
- https://www.granfondoguide.com/Events/Index/2618/tour-de-palm-springs
- https://thepalmspringspost.com/
- research/towns/palm-springs-ca/culture.md: the Blackbook, Oscar's and Boozehounds hand-off
- research/towns/palm-springs-ca/routes.md: Indian Canyons and Highway 74 status

Tried and could not open (permission request withdrawn; not fetched any other
way): https://www.lascasuelas.com/ · https://www.lulupalmsprings.com/ ·
https://www.billspizzapalmdesert.com/ · https://shermansdeli.com/ ·
https://www.kingshighwaydiner.com/ ·
https://www.palmspringslife.com/restaurants/where-our-readers-go-for-the-best-brunch-in-greater-palm-springs/
(twice) ·
https://www.palmspringslife.com/restaurants/8-bars-for-a-late-night-drink-in-greater-palm-springs/ ·
https://www.palmspringslife.com/restaurants/for-sweet-treats-and-good-eats-try-lulu-california-bistro-in-palm-springs/ ·
https://www.palmspringslife.com/restaurants/readers-choice-9-places-for-the-best-outdoor-dining-in-greater-palm-springs/ ·
https://www.visitgreaterpalmsprings.com/listing/lulu-california-bistro/23768/ ·
https://www.visitgreaterpalmsprings.com/blog/post/10-pizza-places-in-greater-palm-springs/ ·
https://visitpalmsprings.com/blog/post/palm-springs-late-night-dining/ ·
https://www.towniebagels.com

403: https://www.bikeforums.net/road-cycling/1138042-palm-springs-riding.html

WebSearch: one call, refused: "this session has used its web search budget
(200 of 200 WebSearch calls)."
