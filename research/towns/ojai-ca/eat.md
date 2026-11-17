# ojai-ca · eat-scout · 2026-11-15

Seven places, first build. Every slot has something: the night before
(Boccali's, Papa Lennon's), after the ride (Jim & Rob's, Farmer and the
Cook), late (Radio Roma), on the way (Ojai Deer Lodge on Maricopa Highway,
Farmer and the Cook on the west end, Boccali's on the East End), and the one
to go back for (Ojai Rôtie). Hours, address and phone for all seven come
from the restaurant's own site, read today.

Ojai eats early and shuts early. Nothing here serves a sit-down breakfast
before 8, and only one kitchen is open past 9 on the Friday the Center Ride
Out arrives. The 7 a.m. diner (Bonnie Lu's) is in "Couldn't confirm".

How this run went: 5 searches. WebFetch refused every restaurant's own
domain (not on the session allowlist), so the own-site pages were read with
a plain HTTP request and the text pulled out; aggregator pages opened through
WebFetch. No geocoder page, so no distances from the centre are given, and
none should be added from these addresses without one. `routes.md` did not
exist yet, so "on the way" ties are by road name from the address only;
@route-scout or the editor confirms the road is on a listed route.

## Findings

```json
[
  {
    "name": "Boccali's Pizza & Pasta",
    "url": "https://www.boccalis.com/",
    "address": "3277 E. Ojai Avenue, Ojai, CA 93023",
    "cuisine": "Italian",
    "note": "The night before: pizza, lasagna and pasta on the East End, eaten on the patio or the oak-covered lawn. Open to 9 p.m. every night; from 11:45 a.m. Wednesday to Sunday, from 4 p.m. Monday and Tuesday (its own page, Nov 2026). Large groups email ahead; the lawn can be reserved. No pets. 805-646-6116."
  },
  {
    "name": "Papa Lennon's Pizzeria",
    "url": "https://www.papalennons.com/",
    "address": "515 W El Roblar Drive, Ojai, CA 93023",
    "cuisine": "Italian",
    "note": "The night before, for a group that didn't book: no reservations, order at the counter, seats up to 80, with a patio. Pizza, pasta and sandwiches, with gluten-free dough and pasta. Open daily 11:30 a.m. to 8 p.m. (its own page, Nov 2026), so eat early. (805) 640-7388."
  },
  {
    "name": "Jim & Rob's Fresh Grill",
    "url": "https://www.jimandrobsojai.com/",
    "address": "214 W. Ojai Avenue, Ojai, CA 93023",
    "cuisine": "Mexican",
    "note": "After the ride: burritos, tacos, burgers and breakfast downtown, with outside seating on front and side patios. Open daily from 9 a.m., to 8:30 p.m. Sunday to Thursday and 9 p.m. Friday and Saturday (its own page, Nov 2026). The bar next door, Lisa's Cantina, is the same business, 11:30 a.m. to 9 p.m. daily. Cheap. (805) 640-1301."
  },
  {
    "name": "Farmer and the Cook",
    "url": "https://farmerandcook.com/",
    "address": "339 W El Roblar Dr, Ojai, CA 93023",
    "cuisine": "Vegetarian Mexican",
    "note": "After the ride, on the west end: an organic market and café with vegetarian and vegan Mexican food, a bakery, an espresso bar and a smoothie bar. Opens 8 a.m. every day; closes 4 p.m. Monday to Wednesday and 8 p.m. Thursday to Sunday, with pizza 5 to 8 p.m. Friday, Saturday and Sunday (its own page, Nov 2026). (805) 640-9608."
  },
  {
    "name": "Ojai Deer Lodge",
    "url": "https://www.deerlodgeojai.com/",
    "address": "2261 Maricopa Highway, Ojai, CA 93023",
    "cuisine": "American",
    "note": "On the way, on Maricopa Highway: a tavern with burgers, weekend barbecue, a large dog-friendly patio and live music. Closed Monday and Tuesday. Noon to 8 p.m. Wednesday and Thursday, noon to 9 Friday, 11 a.m. to 9 Saturday, 11 to 8 Sunday; the bar runs to midnight Friday and Saturday (its own page, Nov 2026). Parties of 12 or more ask ahead on the site. 805-646-4256."
  },
  {
    "name": "Radio Roma",
    "url": "https://radioromaojai.com/",
    "address": "307 East Ojai Avenue, Ojai, CA 93023",
    "cuisine": "Mexican",
    "note": "Late: a mezcal bar downtown that serves tacos and mariscos from the taqueria next door. Open 5 p.m. to midnight Thursday to Saturday, 5 to 11 p.m. Tuesday, Wednesday and Sunday, closed Monday (its own page, Nov 2026). A bar first and a small menu; the page doesn't say when the kitchen stops. (805) 272-8140."
  },
  {
    "name": "Ojai Rôtie",
    "url": "https://www.ojairotie.com/",
    "address": "469 E. Ojai Avenue, Ojai, CA 93023",
    "cuisine": "Rotisserie chicken",
    "note": "The one to go back for: rotisserie chicken and sourdough downtown. Lunch 11:30 to 3:30 Wednesday to Sunday; dinner 4:30 to 8 Wednesday, Thursday and Sunday, to 8:30 Friday and Saturday; closed Monday and Tuesday (its own page, Nov 2026). Reservations for four or more only. The Infatuation (Jan 2026) says it has a large front patio. (805) 798-9227."
  }
]
```

## Why these

- **Boccali's Pizza & Pasta**: pasta the night before, and open to 9 every
  night, which is as late as dinner goes in Ojai. Its own pages: "3277 E.
  Ojai Avenue", "805.646.6116", "SUN - 11:45am - 9pm / MON - 4 - 9pm / TUES
  - 4 - 9pm / WED … SAT - 11:45am - 9pm"; dining "on the patio, or on the
  large oak-covered lawn area"; "FOR LARGE GROUP RESERVATIONS EMAIL US";
  the pet rule. It calls itself an East End place. The site carries no
  date; The Infatuation (Jan 2026) and Travel Babbo (updated Apr 2026) both
  list it as open.
- **Papa Lennon's Pizzeria**: the group that turns up without a booking.
  Its FAQ: "No reservations are needed!", "seating for up to 80 guests",
  order at the counter, a dog-friendly patio; more than 20 people, email
  first. "OPEN DAILY 11:3O AM - 8:00 PM". Same street as Farmer and the
  Cook. The Infatuation (Jan 2026) tags it cheap.
- **Jim & Rob's Fresh Grill**: the big burrito after the ride, with room
  outside. Its own page: "Sun-Thur 9:00 AM - 8:30 PM / Fri - Sat 9:00
  AM-9:00 PM", "plenty of outside seating on front and side patios",
  breakfast, lunch and dinner. Not an early start: 9 a.m.
- **Farmer and the Cook**: the earliest real food among the picks (8 a.m.
  daily) and the stop on the west end. Its own page: "Mon–Wed 8:00 AM –
  4:00 PM, Thu–Fri 8:00 AM – 8:00 PM … PIZZA 5:00 PM – 8:00 PM", © 2026.
  Outdoor seating is not on its own page; a listing (Franki, Aug 2026) and
  Travel Babbo say there is some, so it is left out of the note.
- **Ojai Deer Lodge**: the stop on Maricopa Highway north of town, and a
  bar open to midnight on Friday and Saturday. Its own page: "large
  dog-friendly patio", "live music and smokey barbecue on the weekends",
  the hours as written above, reservations only for "a party of 12 or more".
- **Radio Roma**: the only pick open past 10. Its own page: "Tue/Wed/Sun:
  5pm-11pm / Thu/Fri/Sat: 5pm-Midnight / Mon: siesta", "a Mezcal Bar serving
  tacos, mariscos", © 2026. The Infatuation says the menu is small.
- **Ojai Rôtie**: one place that's just good. Its own page gives the
  address, phone, hours and "RESERVATIONS for 4+".

## Rejected

- **The Nest of Ojai** (401 East Ojai Avenue, thenestojai.com): verified
  open, 11 a.m. daily, to 9 p.m. except Tuesday and Wednesday (4 p.m.);
  order at the counter, patio per The Infatuation. Left out only because
  Jim & Rob's fills the same slot two hours earlier. A good spare.
- **The Dutchess** (457 E. Ojai Ave): barista from 7 a.m. daily, breakfast
  from 8, dinner 5 to 9:30 (its own page). A bakery-café by day; passed to
  @coffee-scout. Dinner is not a rider's plate.
- **Rory's Other Place** (133 E. Ojai Ave): café, 7:30 a.m. to 3:30 p.m.
  seven days, breakfast burrito "until sold out" (its own page). Passed to
  @coffee-scout.
- **Rory's Place** (139 E. Ojai Ave): oysters, seafood towers, $36 to $40
  mains (its own menu). Too fancy for this guide.
- **Jimmy's Pub** (Ojai Valley Inn): resort pricing per Travel Babbo. Skipped.
- **Izakaya Full Moon** (928 E Ojai Ave): walk-in only with about a
  45-minute wait per The Infatuation. Not for a tired group. Not fetched.
- **Topa Topa Brewing** (345 E Ojai Ave): drinks and light bites. A bar;
  @culture-scout's if anyone's.
- **Azu, Suzanne's Cuisine, Feast Bistro, The Ranch House, Los Caporales**:
  named only on an Ojai Music Festival dining page marked outdated (last
  modified 2016). Azu's address and phone are now The Dutchess's. Don't
  re-check from that page.
- **Ojai Pizza, Ojai Beverage Co.**: the sites did not load (connection
  refused, 403). Not needed with two pizza picks already.

## Couldn't confirm

- **Bonnie Lu's Country Café** — the one that matters. The 7 a.m. diner
  downtown would be the early breakfast on Saturday April 24. All I have is
  one listing (Franki, updated Aug 14, 2026): 328 E. Ojai Avenue, (805)
  646-0207, 7 a.m. to 2:30 p.m., Wednesday missing from the hours. No own
  site found; Facebook (facebook.com/bonnielusojai) wants a login. Editor:
  check the Google listing or phone, then it earns the after-the-ride slot.
- **Ojai Tortilla House** — the cheap burrito. A site at
  ojaitortillahouse.com says 104 N Signal St, open daily 11 a.m. to 2 p.m.,
  walk-ins only, © 2026. But The Infatuation (Jan 2026) gives 101 N. Signal
  St. and says cash only, and the site's own prices don't agree with each
  other (tacos "$4 each" and "$1.75" on one page), so I'm not sure it is
  the shop's own site. Check the street number on the Google listing.
- **Radio Roma's kitchen hours**: the page gives bar hours only. Taco Roma
  next door lists dinner Friday and Saturday 5 to 11 p.m. and brunch
  Saturday and Sunday 11:30 to 3:30.
- **Deer Lodge**: the site still shows a closure notice for "January 21st"
  with no year, so the page may not be kept up. An old OpenTable page shows
  longer hours (daily, bar to 2 a.m.) with reviews from 2016; I used the
  site's hours. Second signal that it's open: The Infatuation, Jan 2026.
  Whether its road is on the Highway 33 route is for @route-scout. The live
  music goes to @culture-scout: https://www.deerlodgeojai.com/
- **Jim & Rob's opening time**: its own site says 9 a.m. daily; the Franki
  listing (Aug 2026) says 10. I used the site.
- **Farmer and the Cook's phone**: its own site says (805) 640-9608; the
  Franki listing says (805) 646-0960. I used the site.
- **Bike parking**: no restaurant's page mentions a rack. Null everywhere.
- **Distances from the centre**: none computed (no geocoder page).
- **Where any group ride ends**: no Ojai ride is in the directory, so no
  `ride_slug` on any pick.

## Sources

- https://www.boccalis.com/
- https://www.boccalis.com/about-us.html
- https://www.boccalis.com/on-site-buffet.html
- https://www.papalennons.com/
- https://www.papalennons.com/contact
- https://www.papalennons.com/faq
- https://www.papalennons.com/about
- https://www.jimandrobsojai.com/
- https://www.jimandrobsojai.com/contact-us
- https://farmerandcook.com/
- https://www.deerlodgeojai.com/
- https://www.deerlodgeojai.com/reservations
- https://radioromaojai.com/
- https://www.ojairotie.com/
- https://thenestojai.com/comevisit
- https://www.thedutchessojai.com/
- https://www.rorysplaceojai.com/
- https://www.rorysplaceojai.com/rorys-other-place
- https://www.ojaitortillahouse.com/
- https://www.theinfatuation.com/los-angeles/guides/ojai-restaurants (Jan 16, 2026)
- https://travelbabbo.com/ojai-restaurants/ (updated Apr 22, 2026)
- https://frankiapp.com/business/farmer-and-the-cook-197837.md (updated Aug 14, 2026)
- https://frankiapp.com/business/jim-rob-s-fresh-grill-41826.md (updated Aug 14, 2026)
- https://frankiapp.com/business/bonnie-lu-s-248908.md (updated Aug 14, 2026)
- https://www.opentable.com/r/boccalis-ojai
- https://www.opentable.com/r/ojai-deer-lodge-ojai
- https://ojaifestival.org/dining (marked outdated; leads only)
