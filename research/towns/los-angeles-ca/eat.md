# los-angeles-ca · eat-scout · 2026-09-30

Seven places, one or two per zone. Five have hours and address from the
restaurant's own page. Two (the Rock Store, the Donut Man) rest on listings
only, so their notes say "confirm by phone" as the rules require; their own
sites were dead or would not load from this session. No page anywhere names
a place where a listed ride ends, so the after-ride picks are the ones next
to the ride starts, and the notes say so. No bike parking, pump or hose was
confirmed anywhere. 30 web calls (12 searches, 18 fetches), five over the
budget; eight fetches failed (robots.txt, a dead domain, or a fetch approval
that never came).

## Findings

```json
[
  {
    "name": "Reddi Chick BBQ",
    "url": "https://reddichickbbq.com/contact-us",
    "address": "225 26th Street #23, Santa Monica, CA 90402",
    "cuisine": "Barbecue",
    "note": "After the ride, Zone 1: a counter inside the Brentwood Country Mart, on the corner of 26th and San Vicente where Velo Club La Grange's weekday rides leave at 6:30. Open 10 to 7 every day, so it is lunch, not breakfast. Barbecue chicken, ribs and baked potatoes, per its site; seating and bike parking were not on the page."
  },
  {
    "name": "Pine & Crane Silverlake",
    "url": "https://www.pineandcrane.com/silverlake",
    "address": "1521 Griffith Park Blvd, Los Angeles, CA 90026",
    "cuisine": "Taiwanese",
    "note": "The night before, Zone 3: noodle soup and rice plates at a counter in Silver Lake, at the Sunset Triangle, on the Griffith Park side of town. Noon to 10, closed Tuesday. No reservations, so a group lines up and takes what is free; some seating outside in the plaza next door, in to-go boxes, per its site."
  },
  {
    "name": "Canter's Deli",
    "url": "https://cantersdeli.com/north-fairfax",
    "address": "419 N Fairfax Ave, Los Angeles, CA 90036",
    "cuisine": "Deli",
    "note": "Late, and early: 6 a.m. to 11:30 p.m. Monday to Friday, from 5 a.m. Sunday, and all night Saturday, per its site. A big room on Fairfax, mid-city between the Westside and the east side; takes a group at any hour. Breakfast all day."
  },
  {
    "name": "Brent's Deli Northridge",
    "url": "https://brentsdeli.com/locations/",
    "address": "19565 Parthenia Street, Northridge, CA 91324",
    "cuisine": "Deli",
    "note": "After the ride, Zone 6: the Valley deli in Northridge, the same neighborhood as the CSUN lot where SFVBC's Saturday ride leaves at 8. Opens at 8 every day; closes at 8, or 3 on Monday. Outdoor tables and bike parking were not on its page."
  },
  {
    "name": "Martha's 22nd Street Grill",
    "url": "https://www.opentable.com/r/marthas-22nd-street-grill-hermosa-beach",
    "address": "25 22nd St, Hermosa Beach, CA 90254",
    "cuisine": "Breakfast",
    "note": "After the ride, Zone 5: breakfast and lunch on a patio in Hermosa Beach with a view of the sand, on the beach path's South Bay stretch and north of the Donut loop's Redondo Beach start. 7 to 3 every day, per OpenTable and a listing with 2026 reviews. No site of its own was found; (310) 376-7786."
  },
  {
    "name": "The Rock Store",
    "url": "https://www.tripadvisor.com/Restaurant_Review-g32655-d4915186-Reviews-The_Rock_Store-Los_Angeles_California.html",
    "address": "30354 Mulholland Highway, Cornell, CA 91301",
    "cuisine": "Diner",
    "note": "On the way, Zone 2: the motorcycle roadhouse on Mulholland Highway, the road the Latigo loop jogs onto at Kanan; check the map for where it sits against your route. Breakfast and lunch with an outside patio, weekends only: 7 to 6 Saturday and Sunday, 9 to 6 Friday, closed Monday to Thursday, per TripAdvisor and a September 2025 local guide. Its own site was dead when we checked, so call (818) 889-1311 before you count on it."
  },
  {
    "name": "The Donut Man",
    "url": "https://www.yellowpages.com/glendora-ca/mip/the-donut-man-22285272",
    "address": "915 E Route 66, Glendora, CA 91740",
    "cuisine": "Donuts",
    "note": "On the way, Zone 4: the donut shop on Route 66 in Glendora, the town at the bottom of Glendora Mountain Road, for before or after GMR and the Baldy loop. Open 24 hours every day, per a listing; its own site would not load for us, so confirm by phone, (626) 335-9111. Seating was not on the listing."
  }
]
```

## Why these

- **Reddi Chick BBQ** — Zone 1. The counter on the ride corner: La Grange's five 6:30 a.m. weekday rides leave from 26th and San Vicente (lagrange.org/rides, via routes.md and coffee.md), and the Mart is 225 26th Street. Family-run since 1979 per its site. It is also the one you would go back for: the plate a rider wants at noon, no menu to study. Hours agree on its own site and the Mart's page.
- **Pine & Crane Silverlake** — Zone 3. The night-before bowl: noodles and rice, open past 8, a group without a reservation. Counter service, so kit and a shower are not an issue either way. Closed Tuesday; note it.
- **Canter's Deli** — the late one, and the early one. 5 or 6 a.m. covers a 6:30 roll-out; 11:30 p.m. covers the day that ran long; Saturday never closes. Fairfax is central, not a brief zone, but it sits between the Westside starts and Griffith Park. Copyright 2026 on its own page.
- **Brent's Deli Northridge** — Zone 6. The Valley pick, in the same neighborhood as SFVBC's CSUN start. Opens at 8, the hour the ride leaves, so it is the after. Closes at 8, so not the night before by the rule (open past 8).
- **Martha's 22nd Street Grill** — Zone 5. Breakfast till 3 on a patio by the beach path in Hermosa; two live listings (OpenTable, dated 2026 in its title; frankiapp with February and April 2026 reviews) agree on 7 to 3 daily. Hermosa is outside the city; the beach path and the Donut loop (routes.md) are the reason.
- **The Rock Store** — Zone 2. The task named it and it is the only food on Mulholland Highway that any fetched page describes. Weekends only; one dead site and two listings that agree on hours. "Open, confirm by phone" per the rules. Cornell is outside the city; the Latigo loop and the Mulholland ClimbFest road are the reason.
- **The Donut Man** — Zone 4. The stand at the bottom of GMR, 24 hours per the listing, so it is there at 6 a.m. before the climb. Glendora is outside the city; GMR and the Baldy loop (routes.md) are the reason. One listing only; "confirm by phone" in the note.

Slots: night before (Pine & Crane; Canter's works too) · after the ride (Reddi Chick, Brent's, Martha's) · late (Canter's) · on the way (the Rock Store, the Donut Man) · the one you'd go back for (Reddi Chick).

## Rejected

- **Brent's Deli Westlake Village** (2799 Townsgate Road) — on the same page with the same hours; the Northridge one is the Valley pick, and Westlake Village is far outside the city.
- **Pine & Crane DTLA** — a second location on the site; the Silver Lake one is the one on the Griffith Park side. Not fetched.
- **Spoke Bicycle Cafe** (Frogtown, on the river path) and **Pedalers Fork** (Calabasas; a restaurant with 10 Speed Coffee inside, open to 9 p.m. Wednesday to Saturday per coffee.md) — both serve food and both are in coffee.md already. Not duplicated here. Pedalers Fork is the Zone 2 dinner if the editor wants one; the coffee scout could not open its own site either.
- **The Trails Cafe** (Griffith Park) — a café stand; in coffee.md's Couldn't confirm. Not mine.
- **Yelp** (the Rock Store, updated July 2026; the Donut Man, September 2026; Reddi Chick, May 2026; Canter's, Pine & Crane, Brent's, all 2026 in the search titles) — disallowed by robots.txt from this session. The dates above are from search-result titles, not fetched pages, so they count for nothing here; they say where the second signal lives.
- **Foursquare, Apple Maps** — robots.txt.
- **Infatuation, Time Out, goop, the Michelin guide, TripAdvisor review lists, mindtrip, wanderboat, restaurantguru** — guide and aggregator pages; leads only, not fetched, except the one TripAdvisor page used for the Rock Store's hours.
- **Reddit, RoadBikeReview forums** — leads only, never a source.

## Couldn't confirm

- **The Rock Store's open status.** rock-store.com did not resolve (DNS). TripAdvisor gives hours and phone but its newest review is 2019; the Conejo Valley Guide article (September 15, 2025) gives the same hours but is over six months old. Facebook and Yelp could not be opened. Where to look: the Google listing; Yelp (July 2026 per search); phone (818) 889-1311. If it has closed, drop it; there is no other food on Mulholland Highway in this report.
- **The Donut Man's own site.** thedonutmanca.com waited on a fetch approval that never came. The YellowPages listing gives 24 hours daily and shows it open, but its reviews are 2014 to 2015. Where to look: thedonutmanca.com; the Google listing; Yelp (September 2026 per search).
- **Martha's own page.** The Toast order page redirected to toast.app and the redirect was not followed. The OpenTable page shows no reviews; frankiapp has 2026 ones. The `url` here is OpenTable; the editor may prefer null or the toast.app page.
- **Reddi Chick's second signal.** Its own site's copyright line says 2018, and the Mart's page carries no date. Two pages agree on hours and address; neither says "2026." Where to look: Yelp (May 2026 per search); the Mart's Instagram; phone (310) 393-5238.
- **Fred 62** (1850 N Vermont Ave, Los Feliz) — the 24-hour diner on the east side, the obvious late pick for the Griffith Park zone; fred62.com waited on a fetch approval that never came, and the listings were not fetched inside the budget. Where to look: fred62.com; Yelp (September 2026 per search); the Infatuation review.
- **Neptune's Net** (PCH, Malibu, near the county line) — the seafood stand on the "PCH to the Rock" ride that routes.md could not confirm. Only Yelp and TripAdvisor pages surfaced in search; nothing fetched. Where to look: neptunesnet.com; the Google listing. Also depends on the PCH work-zone line in routes.md.
- **Where the rides actually end.** No fetched page names food for any LA ride in `rides.json` or for the Donut. Nichols Canyon returns to Westwood (lagrange.org/nichols via routes.md); a place in Westwood Village near Raymond Fouquet Square, open by 11 on Saturday, would fill it. The Donut (Avenue I and Elena, Redondo Beach, per coffee.md) has no named after. Where to look: @veloclublagrange and Big Orange on Instagram; SFVBC's ride posts for a "lunch at" line.
- **A taco stand or truck.** None confirmed, in a city with one on every route. Where to look: a truck near the Zoo lot in Griffith Park; the stands on Lincoln Blvd near the Venice end of the beach path; the Malibu civic center for the Latigo loop start.
- **Something at the Latigo loop's start** (Civic Center Way, Malibu) — nothing searched inside the budget.
- **Outdoor tables and bike parking** at Reddi Chick, Brent's and Canter's — not on any fetched page. Pine & Crane's plaza seating and Martha's and the Rock Store's patios are the only outdoor seating confirmed.
- **Prices** — no fetched page gave one worth quoting, except OpenTable's "$30 and under" for Martha's.

Hand-offs: **Canter's Kibitz Room** (the bar attached to the deli, not on the fetched page) is a lead for @culture-scout. **Pedalers Fork** and **Spoke** stay with @coffee-scout; the editor can cross-list them under food. The Donut Ride's start and day are still with @community-scout (routes.md and coffee.md both asked).

## Sources

- https://reddichickbbq.com/contact-us
- https://www.brentwoodcountrymart.com/reddi-chick-bbq
- https://www.pineandcrane.com/silverlake
- https://cantersdeli.com/north-fairfax
- https://brentsdeli.com/locations/
- https://www.opentable.com/r/marthas-22nd-street-grill-hermosa-beach
- https://frankiapp.com/business/martha-s-22nd-street-grill-307275
- https://www.tripadvisor.com/Restaurant_Review-g32655-d4915186-Reviews-The_Rock_Store-Los_Angeles_California.html
- https://www.conejovalleyguide.com/welcome/hang-out-with-motorcyclists-at-the-rock-store-on-mulholland.html
- https://www.yellowpages.com/glendora-ca/mip/the-donut-man-22285272
- cfc-site/rides/rides.json — the LA rides and their start locations
- research/towns/los-angeles-ca/routes.md — the Latigo loop, GMR, the Donut loop, the La Grange weekday hand-off
- research/towns/los-angeles-ca/coffee.md — the 26th and San Vicente corner, the Donut's start, Pedalers Fork and Spoke

Tried and could not open: http://rock-store.com/contact/ (domain did not resolve) · https://www.fred62.com/ (no fetch approval) · https://www.brentsdeli.com/ (no fetch approval; the locations page loaded) · https://cantersdeli.com/ (no fetch approval; the North Fairfax page loaded) · http://www.thedonutmanca.com (no fetch approval) · https://www.toasttab.com/local/order/martha-s-22nd-street-grill-25-22nd-st (redirect to toast.app not followed) · https://foursquare.com/v/rock-store/45a0ddd0f964a520d3401fe3 (robots.txt) · https://maps.apple.com/place?place-id=I3DEE6E8C1D5D1475 (robots.txt)
