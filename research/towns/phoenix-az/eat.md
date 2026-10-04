# phoenix-az · eat-scout · 2026-10-03

Five places: one in Scottsdale, one in Tempe, two in central Phoenix and one
on the South Mountain side (Ahwatukee). Three come from their own pages. Matt's
Big Breakfast and Village Tavern rest on two listings each, or a listing plus
the restaurant's ordering page; their notes say to call. Two picks are tied to
directory rides: Village Tavern (TriScottsdale's start) and Los Taquitos
(Valley Epic Rides' Taco Tuesday).

The slots: night before (Pizzeria Bianco, Pedal Haus), after the ride (Matt's,
Village Tavern, Los Taquitos), late (Pedal Haus, open to 11 p.m. or midnight)
and the one you'd go back for (Pizzeria Bianco). **On the way is empty.** No
route in `routes.md` names a food stop. Fountain View Coffee (`coffee.md`), on
the Rio Verde – Fountain Hills loop, is the closest thing to one, so the editor
may want to cross-list it.

Distances are straight lines from City Hall (33.4484, -112.0740), geocoded
with OpenStreetMap Nominatim. All hours are Arizona time (no daylight saving).
Budget: 5 of the session's 12 searches went to this section, and the cap is
now spent. The fetch tool opened only URLs that a search had returned.

## Findings

```json
[
  {
    "name": "Pizzeria Bianco Heritage Square",
    "url": "https://www.pizzeriabianco.com/pizzeria-bianco-heritage-square",
    "address": "623 E Adams St, Phoenix, AZ 85004",
    "cuisine": "Pizza",
    "note": "The one you'd go back for, and a night-before dinner: wood-fired pizza in Heritage Square, about half a mile east of City Hall. Open 11 to 9 Monday to Saturday, closed Sunday. It takes no reservations and does no take-out, per its site, so a group waits for a table."
  },
  {
    "name": "Pedal Haus Brewery (Tempe)",
    "url": "https://www.pedalhausbrewery.com/tempe-location",
    "address": "730 S Mill Ave #102, Tempe, AZ 85281",
    "cuisine": "Brewpub",
    "note": "The night before, or late, on Mill Avenue in downtown Tempe, about 8 miles east of downtown Phoenix: burgers, fried chicken and pizza, and what its site calls one of the largest patios downtown. Open 11 a.m. to 11 p.m. Monday to Thursday, to midnight Friday and Saturday, and 9:45 a.m. to 11 p.m. Sunday. No reservations, just a waitlist; bikes are in the name, but no bike parking is stated."
  },
  {
    "name": "Matt's Big Breakfast",
    "url": "https://www.tripadvisor.com/Restaurant_Review-g31310-d809958-Reviews-Matt_s_Big_Breakfast-Phoenix_Arizona.html",
    "address": "825 N 1st St, Phoenix, AZ 85004",
    "cuisine": "Breakfast",
    "note": "After the ride, downtown: breakfast and lunch about half a mile north of City Hall, 7 to 2 every day, per two listings. Reviews mention big plates and a wait on weekend mornings, with shade outside to wait in. Its own site wasn't opened, so call (602) 254-1074 first."
  },
  {
    "name": "Village Tavern",
    "url": "https://villagetavern11.netwaiter.com/",
    "address": "8787 N Scottsdale Rd, Scottsdale, AZ 85258",
    "cuisine": "American",
    "note": "After the ride, Scottsdale: the restaurant where {ride:scottsdale-az-triscottsdale-saturday-group-ride|TriScottsdale's Saturday ride} and the club's Tuesday and Thursday rides start, about 12 miles northeast of downtown Phoenix. It's open 11 to 9 Sunday to Thursday and 11 to 10 Friday and Saturday, per its ordering page, so it's lunch after the long Saturday ride, not breakfast. Neither page mentions a patio or bike parking; (480) 951-6445.",
    "ride_slug": [
      "scottsdale-az-triscottsdale-saturday-group-ride",
      "scottsdale-az-triscottsdale-tuesday-flat-and-fast",
      "scottsdale-az-triscottsdale-thursday-six-hill-ride"
    ]
  },
  {
    "name": "Los Taquitos (Ahwatukee)",
    "url": "https://lostaquitosaz.com/ahwatukee",
    "address": "4747 E Elliot Rd #17, Phoenix, AZ 85044",
    "cuisine": "Mexican",
    "note": "After the ride, on the South Mountain side: a Mexican place in Ahwatukee about a mile from the start of {ride:phoenix-az-taco-tuesday-south-mountain|Valley Epic Rides' Taco Tuesday}, a group that names Los Taquitos as one of its after-ride spots. Open 9 to 9 Tuesday to Saturday and 9 to 7 Sunday and Monday, per its site. On a Tuesday it closes at 9, so go straight there.",
    "ride_slug": "phoenix-az-taco-tuesday-south-mountain"
  }
]
```

## Why these

- **Pizzeria Bianco Heritage Square.** The one. Its own page gives the address,
  the phone ((602) 258-8300), the hours and the policy: "we do not accept
  reservations and we do not offer take-out." It's open to 9, so it also works
  as a night-before dinner downtown. It's closed Sunday.
- **Pedal Haus Brewery, Tempe.** The late slot and a night-before option in the
  Tempe zone near ASU, a place the brief says visitors sleep. Its own page
  gives the hours, the patio and the waitlist. The home page's newsletter line
  names "cyclists" among its regulars. It's a bar too, so @culture-scout may
  want it. Other branches (Chandler, Phoenix, Mesa) appear on the home page
  without addresses.
- **Matt's Big Breakfast.** The after-ride plate downtown. The TripAdvisor
  listing (825 N 1st St, "currently open", reviews into 2026) and a second
  listing agree on 7 to 2 daily, the address and the phone. The size and wait
  lines come from reviews quoted on TripAdvisor.
- **Village Tavern.** The after-ride lunch at a ride start. `rides.json` puts
  all three TriScottsdale rides at Village Tavern, 8787 N Scottsdale Rd
  (Saturday 6:30 and 50 to 60 miles, Tuesday 5:35 p.m., Thursday 5:35 a.m.).
  The hours come from its NetWaiter ordering page; the address with the suite
  number (#234) comes from scottsdale.com.
- **Los Taquitos, Ahwatukee.** The South Mountain pick, so Zone 1 has a place
  to eat. @community-scout reports that Valley Epic Rides names Los Taquitos
  among its after-ride spots (with Zeeks and Electric Pickle) but doesn't say
  which branch. Of the three branches on Los Taquitos' own location page, this
  one is about a mile from the Taco Tuesday start at Kyrene de las Lomas; the
  other two are 11 and 14 miles away. The ride rolls at 6:30 p.m., and it closes
  at 9 on Tuesdays.

## Rejected

- **Matt's Big Breakfast, Sky Harbor Terminal 4, Gate B5.** The first
  TripAdvisor hit. It's past security, so it only helps a rider flying out.
- **Los Taquitos, 16th St (7000 N 16th St) and Arcadia (3176 E Indian School
  Rd).** Same hours as Ahwatukee, per the chain's own page. One branch is
  enough. The 16th St branch is about 0.9 mile from Granada Park, if the editor
  would rather tie it to {ride:phoenix-az-pmbc-granada-sunday-breakfast-ride|PMBC's
  Sunday breakfast ride}. That ride names its own breakfast place each week,
  so we didn't make the tie.
- **Red Robin, Goodyear.** West Valley Cycle's start. A chain, in the West
  Valley hub the brief leaves to the editor.

## Couldn't confirm

- **On the way, any route.** `routes.md` names a Safeway (Rio Verde loop start),
  a Walgreens corner (Usery start) and water at the top of Usery. It names no
  diner or taco stand. Leads for a second pass: Cave Creek / Carefree on the
  Bartlett Lake Rd ride (`routes.md` couldn't cover it), Saguaro Lake on the
  Bush Highway, and Fountain Hills on the Rio Verde loop.
- **Restaurants where directory rides start or end, none fetched within the
  budget.** Fiesta Mexicana, 4949 S Alma School Rd, Chandler: Global Bikes and
  Wheel Suckers' Tuesday Taco ride. Philly's Sports Grill, 4855 E Warner Rd,
  Ahwatukee: their Wednesday ride. R.T. O'Sullivan's, 7919 E Thomas Rd,
  Scottsdale: the Tuesday-night greenbelt ride starts and finishes there. These
  addresses come from `rides.json`, not from the restaurants. Each one needs
  its own page or listing fetched.
- **Zeeks and Electric Pickle.** Valley Epic Rides' other after-ride spots, per
  @community-scout. Not searched; which branch is meant isn't known.
- **Village Tavern's own site** (villagetavern.com, linked from scottsdale.com)
  wasn't opened. The ZIP conflicts: the ordering page says 85258, and
  OpenStreetMap puts 8787 N Scottsdale Rd in 85253. The suite is #234 per
  scottsdale.com (a listing last updated Dec 2024). Brunch hours, patio and
  bike parking are unknown. Phone (480) 951-6445.
- **Matt's Big Breakfast's own site** wasn't opened. One listing says it takes
  reservations, which the editor should check before printing. Yelp search
  titles show a Camelback Rd branch (3118 E Camelback Rd). It wasn't fetched.
- **The PMBC breakfast stops.** The Granada Sunday ride ends at a different
  breakfast place each week, and PMBC's Saturday ride has an optional one near
  the Kiwanis Park finish. Both are named on PMBC's RideWithGPS calendar, which
  this session couldn't open. These are the real "after the ride" places for
  two of the biggest club rides.
- **The Downtempo ride's end point.** It ends "at a bar or restaurant" downtown
  on Monday nights, unnamed in `rides.json`. That's for @culture-scout or a
  second pass.
- **A Scottsdale breakfast that opens by 7.** None was confirmed; Village Tavern
  opens at 11. Leads not searched: The Breakfast Club in Old Town Scottsdale,
  and The Original Breakfast House in north Phoenix.
- **Cornish Pasty Co., Tempe.** The late-night lead. It was in the same search
  as Pedal Haus but didn't come back, and it wasn't fetched.

## Sources

- https://www.pizzeriabianco.com/pizzeria-bianco-heritage-square
- https://www.pedalhausbrewery.com/tempe-location
- https://www.pedalhausbrewery.com/
- https://www.tripadvisor.com/Restaurant_Review-g31310-d809958-Reviews-Matt_s_Big_Breakfast-Phoenix_Arizona.html
- https://mattsbigbreakfast.restaurants-us.com/
- https://www.tripadvisor.com/Restaurant_Review-g31310-d9836403-Reviews-Matt_s_Big_Breakfast-Phoenix_Arizona.html
- https://villagetavern11.netwaiter.com/
- https://scottsdale.com/places/village-tavern/
- https://lostaquitosaz.com/ahwatukee
- https://www.lostaquitosaz.com/location
- https://nominatim.openstreetmap.org/ (geocoding for distances only)
- cfc-site/rides/rides.json: TriScottsdale's three rides at Village Tavern; the Taco Tuesday, Granada, PMBC Saturday and Downtempo rides; the Chandler, Ahwatukee and Scottsdale restaurant starts
- research/towns/phoenix-az/community.md: Valley Epic Rides' after-ride spots (Zeeks, Los Taquitos, Electric Pickle)
- research/towns/phoenix-az/routes.md: the route starts and water stops

Not opened: Yelp, Apple Maps and Nextdoor pages for these places came up in search, but their robots.txt blocked every page of theirs tried this session (see `coffee.md`), so none were attempted here. They include https://www.yelp.com/biz/pedal-haus-brewery-tempe, https://www.yelp.com/biz/matts-big-breakfast-phoenix-2, https://www.yelp.com/biz/village-tavern-scottsdale, https://www.yelp.com/biz/los-taquitos-phoenix and https://nextdoor.com/pages/village-tavern-paradise-valley-az/.
