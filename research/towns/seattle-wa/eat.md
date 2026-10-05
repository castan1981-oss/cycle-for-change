# seattle-wa · eat-scout · 2026-10-04

A refresh with search back on. The Oct 3 run kept four U District places with
no hours and added nothing. This run adds four confirmed places across the
city — Mercer Island, West Seattle, Capitol Hill, Ballard — and keeps the four
U District entries. **The four kept places still could not be re-opened**:
their sites were refused again (the permission request timed out), so their
entries are unchanged, still without hours, for the verifier to re-fetch.
Thai Tom and Aladdin Gyro-cery stay out until they have a page of their own.
Web calls are counted once, for both sections, in coffee.md.

## Findings

```json
[
  {
    "name": "Marination Ma Kai",
    "url": "https://marinationmobile.com/locations",
    "address": "1660 Harbor Avenue SW, Seattle, WA 98126",
    "cuisine": "Hawaiian-Korean",
    "note": "After the ride, West Seattle: at Seacrest Park, the start of the West Seattle loop and the foot of the water taxi. Tacos, rice bowls and shave ice on a waterfront patio, indoor and outdoor, per its site. 11 to 8 Monday to Thursday, 11 to 9 Friday, from 9 on Saturday (to 9) and Sunday (to 8). Bike parking wasn't on the page."
  },
  {
    "name": "Roanoke Inn",
    "url": "https://www.tripadvisor.com/Restaurant_Review-g58605-d513230-Reviews-Roanoke_Inn-Mercer_Island_Washington.html",
    "address": "1825 72nd Ave SE, Mercer Island, WA 98040",
    "cuisine": "Pub",
    "note": "On the way, Mercer Island: the tavern Cascade's Mercer Island loop tells riders to stop at, a few blocks off the I-90 trail at the island's north end. Porch, patio and a back yard. No website; the hours we found are a listing's (11 to midnight Tuesday to Saturday, 11 to 10 Sunday, 3 to 10 Monday) with its last review in July 2025, so call (206) 232-0800 before you count on it."
  },
  {
    "name": "Dick's Drive-In (Broadway)",
    "url": "https://ddir.com/locations/broadway",
    "address": "115 Broadway East, Seattle, WA 98102",
    "cuisine": "Burgers",
    "note": "Late, Capitol Hill: 10:30 a.m. to 2 a.m. every day, per its site, across from the Capitol Hill light rail station. A walk-up window since 1955; stand in line, eat outside or take it away. Cheap. Not the night-before plate, but open when the day ran long and nothing else is."
  },
  {
    "name": "Un Bien (Seaview)",
    "url": "https://www.unbienseattle.com/",
    "address": "6226 Seaview Ave NW, Seattle, WA 98107",
    "cuisine": "Caribbean",
    "note": "The one you'd go back for, and the night-before sandwich on the Ballard side: a pink shack just off Shilshole Bay, on the road to Golden Gardens. Roast pork sandwiches and plates. 11 to 9 Wednesday to Saturday, 11 to 8 Sunday, closed Monday and Tuesday, per its site. Pick-up orders by phone, (206) 420-7545. The Ballard sibling at 7302.5 15th Ave NW keeps the same hours. Seating and bike parking weren't on the page."
  },
  { "name": "Portage Bay Cafe", "url": "https://www.portagebaycafe.com/", "address": "4130 Roosevelt Way NE, Seattle, WA 98105", "cuisine": "Breakfast and brunch", "note": "Local, organic breakfast; opens 7:30 a.m. weekdays, 8 a.m. weekends." },
  { "name": "Big Time Brewery & Alehouse", "url": "https://www.bigtimebrewery.com/", "address": "4133 University Way NE, Seattle, WA 98105", "cuisine": "Brewpub", "note": "Seattle's original brewpub, since 1988; family-friendly." },
  { "name": "Shultzy's Bar & Grill", "url": "https://www.shultzys.com/", "address": "4114 University Way NE, Seattle, WA 98105", "cuisine": "Sausages and grill", "note": "House-made sausage since 1988; a plate of carbs and protein the night before." },
  { "name": "Cedars Restaurant", "url": "https://www.cedarsseattle.com/", "address": "4759 Brooklyn Ave NE, Seattle, WA 98105", "cuisine": "Indian and Mediterranean", "note": "In the U District since 1974; curries and kabobs." }
]
```

## Why these

- **Marination Ma Kai** fills "after the ride" on the water side. Its own locations page gives the address, hours and "indoor and outdoor, waterfront patio seating"; the TripAdvisor listing (reviews to July 2026) says "right off the water taxi" and puts Seacrest Park at 0 miles. Seacrest Pier (1660 Harbor Ave SW) is the West Seattle loop start in routes.md, the same address. Weekend doors at 9 make it brunch after an early loop.
- **Roanoke Inn** is the on-the-way pick the brief and routes.md asked for. Cascade's Mercer Island ambassador route (read last run): "consider stopping at the Roanoke Tavern for a bite to eat and some wonderful craft brews." A 2019 Seattle Refined piece confirms there's no website, the phone, and "porch, patio or backyard." The hours are TripAdvisor's and more than six months old, so the note says call. The verifier can ring it. If it reads more tavern than kitchen it's also **@culture-scout**'s.
- **Dick's Drive-In** is the late slot, and the only confirmed 2 a.m. door this run. Address and hours from its own locations page. It's fast food; the note says so.
- **Un Bien** is the Ballard/Fremont pick, from its own site: three locations, hours by day, phones. Seaview is the one for a rider — "just off Shilshole Bay" (Seattle Met, April 2016, the opening). Its Wednesday-to-Sunday week matters: a Monday or Tuesday night-before needs the U District.
- **The four kept U District places** (Portage Bay Cafe, Big Time, Shultzy's, Cedars) are the STP-start dinners and breakfast, confirmed Sept 15, 2026 from their own sites. Refused again this run; nothing changed. Hours are the fix the verifier owes them.

Slots: night before = Un Bien, Shultzy's, Cedars · after the ride = Marination, Portage Bay · late = Dick's · on the way = Roanoke Inn · the one = Un Bien. Zones: U District, Capitol Hill, Ballard, West Seattle, Mercer Island. Empty: downtown, the Eastside hills, Bainbridge after the ferry.

## Rejected

- **Paseo** (4225 Fremont Ave N, Fremont), Un Bien's cousin. Only a TripAdvisor listing with a June 2025 last review; its own site wasn't in reach. Un Bien covers the same sandwich from its own page, so Paseo waits.
- **Thai Tom** and **Aladdin Gyro-cery** — still no page of their own; the U District directory page was refused again. Out until the verifier finds each one's own page or Google listing with hours.
- **Dick's Wallingford** (111 NE 45th St, same hours) — closer to the STP start than Broadway, but one Dick's is enough; the editor can swap it if the U District needs a late door.
- **Un Bien Queen Anne** (319 W Galer St, 4–9 weekdays) — no reason a rider goes there over the Seaview shack.
- **Marination's downtown and Columbia City rooms** — the Seacrest one is the rider's.
- **Chipotle** (Eastside Tours finish), **Sammamish Safeway**, the **Chilly Hilly chili**, **RailSpur's pizza lunch** — chain, grocery, event-day, one-off (unchanged from last run).
- **The Beer Junction** (4511 California Ave SW), where {ride:seattle-wa-beer-junction-bike-club|Beer Junction Bike Club} starts and ends; **The Lumberyard** and **Beer Star** in White Center — bars, **@culture-scout**'s.

## Couldn't confirm

- **The four kept U District places**: refused again — https://www.portagebaycafe.com/ · https://www.bigtimebrewery.com/ · https://www.shultzys.com/ · https://www.cedarsseattle.com/. Still needed: today's hours, kitchen hours, minors (Big Time, Shultzy's), outdoor tables, bike parking.
- **Roanoke Inn's hours** from a source newer than July 2025. No website. Phone (206) 232-0800.
- **Paseo Fremont's own hours** (above).
- **Bainbridge after the ferry.** Cascade's midsummer page says "multiple food options in downtown Bainbridge Island" and names none; **O Sole Mio Pizza, Vashon** from Cascade Bicycle Studio's loop page is still unfetched. Winslow restaurants near the ferry want a search.
- **The Eastside hills**: nothing confirmed near Zoo Hill, Issaquah or the Snoqualmie Valley. Cascade's TREATS stops ("the Stillwater store at about mile 8", a Carnation lunch) are still unnamed.
- **The North Lake Washington loop** stops Seattle Bike Blog (July 2023) describes near Chainline Station in Kirkland — unnamed.
- **A downtown night-before** near the Colman Dock hotels — not searched; the budget went to the picks above.

## Sources

Fetched and read this run:

- https://marinationmobile.com/locations
- https://www.tripadvisor.com/Restaurant_Review-g60878-d3613066-Reviews-Marination_Ma_Kai-Seattle_Washington.html
- https://www.tripadvisor.com/Restaurant_Review-g58605-d513230-Reviews-Roanoke_Inn-Mercer_Island_Washington.html
- https://seattlerefined.com/eat-drink/the-roanoke-inn-where-friends-meet-friends-for-more-than-a-century
- https://ddir.com/locations/broadway
- https://ddir.com/locations
- https://www.tripadvisor.com/Restaurant_Review-g60878-d484837-Reviews-Dick_s_Drive_In_Broadway_E-Seattle_Washington.html
- https://www.unbienseattle.com/
- https://www.seattlemet.com/eat-and-drink/2016/04/un-bien-s-second-location-is-open-in-shilshole
- https://www.tripadvisor.com/Restaurant_Review-g60878-d432138-Reviews-Paseo-Seattle_Washington.html

Read last run (Oct 3), relied on here: https://ridewithgps.com/ambassador_routes/511-south-bellevue-mercer-island-loop · https://www.cascadebicyclestudio.com/local-loops-seattle · https://cascade.org/rides-events/chilly-hilly-2026 · https://cascade.org/rides-events/tuesday-ride-eclectic-athletic-travelers-treats/89978

Sources for the four kept entries (the Sept 15 check, in the town file's `sources`, not re-opened): https://www.portagebaycafe.com/ · https://www.bigtimebrewery.com/ · https://www.shultzys.com/ · https://www.cedarsseattle.com/

Tried, refused (permission request timed out): the four above. Blocked by robots.txt: https://www.yelp.com/biz/roanoke-inn-mercer-island · https://www.yelp.com/biz/marination-ma-kai-seattle

WebSearch: 12 of 12 for both sections, listed in coffee.md.
