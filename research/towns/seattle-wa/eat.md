# seattle-wa · eat-scout · 2026-10-03

This was a refresh: re-check the six U District restaurants in
`data/towns/seattle-wa.json`, then add picks across the city. **Neither part
could be done properly.** WebSearch was spent before this run started (the
one call came back "200 of 200"). WebFetch opened only pages earlier agents
had reached this session. Every restaurant site we tried, and the U District
directory, was refused: the permission request timed out. Nothing was
fetched any other way.

Where that leaves the six:

- **Keep four, unchanged:** Portage Bay Cafe, Big Time Brewery, Shultzy's and
  Cedars. Their own sites confirmed them on Sept 15, 2026 (the file's
  `verified` date and `sources`), 18 days ago. We couldn't re-open them, so
  nothing in their entries is changed or added. The verifier re-opens each one
  before this ships.
- **Drop two until they have a real page:** Thai Tom and Aladdin Gyro-cery.
  Their `url` is the U District Partnership's food-and-drink category page,
  not the restaurant or its listing. The rules want an address from the
  business's own page or its Google listing, and this run could reach neither.

No new restaurant could be confirmed. The Roanoke Inn lead from routes.md and
the names on club pages are under Couldn't confirm. So the Findings are the four kept entries, all
in the U District. That's the floor of the 4–8 target, and every other zone is
empty. Web calls are counted once, for both sections, in coffee.md.

## Findings

```json
[
  { "name": "Portage Bay Cafe", "url": "https://www.portagebaycafe.com/", "address": "4130 Roosevelt Way NE, Seattle, WA 98105", "cuisine": "Breakfast and brunch", "note": "Local, organic breakfast; opens 7:30 a.m. weekdays, 8 a.m. weekends." },
  { "name": "Big Time Brewery & Alehouse", "url": "https://www.bigtimebrewery.com/", "address": "4133 University Way NE, Seattle, WA 98105", "cuisine": "Brewpub", "note": "Seattle's original brewpub, since 1988; family-friendly." },
  { "name": "Shultzy's Bar & Grill", "url": "https://www.shultzys.com/", "address": "4114 University Way NE, Seattle, WA 98105", "cuisine": "Sausages and grill", "note": "House-made sausage since 1988; a plate of carbs and protein the night before." },
  { "name": "Cedars Restaurant", "url": "https://www.cedarsseattle.com/", "address": "4759 Brooklyn Ave NE, Seattle, WA 98105", "cuisine": "Indian and Mediterranean", "note": "In the U District since 1974; curries and kabobs." }
]
```

## Why these

All four are kept from the Sept 15 check and unchanged here. They're the STP-start places: on Roosevelt Way, University Way and Brooklyn Ave in the U District, near the hotels in the file.

- **Portage Bay Cafe**: breakfast. The hours on file (7:30 weekdays, 8 weekends) are after the STP's 5 a.m. roll-out (the town file's `riding`), so it's breakfast the day before or the day after, not the morning of. When its site opens again, the note should say that and add closing time and any outdoor tables.
- **Big Time Brewery & Alehouse**: the brewpub dinner, all ages per the note on file. Its hours and kitchen hours aren't in the file. When the site opens again, add them so the note says which slot it fills (night before, or late).
- **Shultzy's Bar & Grill**: the night-before plate, in the note's own words. Its hours and whether it admits under-21s aren't in the file, and both matter for a group.
- **Cedars Restaurant**: curries and kabobs, the rice-plate dinner. Hours aren't in the file.

The eat-scout record wants hours in plain words in every note. None of the four has full hours on file, and this run couldn't add them. That's the first fix for the verifier's re-fetch.

## Rejected

- **Thai Tom** (4543 University Way NE) and **Aladdin Gyro-cery** (4139 University Way NE): dropped from the Findings, for now. Both entries cite https://udistrictseattle.com/business-category/food-drink, a neighborhood directory's category page, as their `url`. That isn't the restaurant's page or its Google listing. The page was refused this run, so nothing confirms either is open. "Cash-friendly" and "open late" on file have no source of their own. Put them back when the verifier finds each one's own page or Google listing with hours.
- **Chipotle**, where Cascade's {ride:bellevue-wa-cascade-eastside-tours-evening-ride|Eastside Tours Evening Ride} finishes on the first ride of each month (`rides.json`). It's a chain, and no page says which location.
- **Sammamish Safeway** (Eastside Hills, mile 26.2): a grocery stop.
- **The Chilly Hilly chili** at the Bainbridge Island Senior Community Center ($10 ahead, $15 at the door, 2026 page): event day only.
- **RailSpur Studios' pizza lunch** after Sound Break's Oct 7 ride: a one-off.
- **The Beer Junction** (4511 California Ave SW, West Seattle), where {ride:seattle-wa-beer-junction-bike-club|Beer Junction Bike Club} starts and ends. It's a bar, so it goes to @culture-scout. Same for **The Lumberyard** and **Beer Star** in White Center, the stops on Outspoken's West Seattle Wednesday rides (community.md).

## Couldn't confirm

- **The re-check of the four kept places.** We couldn't open any of these this run: https://www.portagebaycafe.com/ · https://www.bigtimebrewery.com/ · https://www.shultzys.com/ · https://www.cedarsseattle.com/. For each one we still need today's hours, whether it's still open, outdoor tables and bike parking.
- **Thai Tom and Aladdin Gyro-cery**: own page or Google listing, hours, open status (above).
- **Roanoke Inn & Tavern, Mercer Island**: the lead from routes.md. Cascade's Mercer Island ambassador route says: "consider stopping at the Roanoke Tavern for a bite to eat and some wonderful craft brews." It's the on-the-way pick for the Mercer Island loop. That page gives no address or hours, and we couldn't reach the Inn's own page. Where to look: its own site or Google listing. It may also be @culture-scout's if it's more tavern than kitchen.
- **O Sole Mio Pizza, Vashon**: Cascade Bicycle Studio's Vashon Island Ferry Loop recommends it. We couldn't open its own page.
- **Bainbridge Island after the ferry ride.** Cascade's midsummer ride page says "multiple food options in downtown Bainbridge Island at the end of the ride" and names none. Where to look: Winslow restaurants near the ferry, with search.
- **The North Lake Washington loop.** Seattle Bike Blog (July 2023) stopped for pizza and beer near Chainline Station in Feriton Spur Park, Kirkland, on the Eastrail version. The pizza place isn't named. The loop is "peppered with parks, restaurants, breweries and wineries", but the article names none of them.
- **Cascade's TREATS ride stops** (July 14, 2026 page): "the Stillwater store at about mile 8" and "a lunch/coffee break" in Carnation. Neither is named further. These are on-the-way leads for the Snoqualmie Valley, the area of routes.md's Carnation gravel loop.
- **The North Shore Senior Center pie stop**, Bothell (in coffee.md).
- **Slots and zones with nothing:** late (past 10), the night before outside the U District, and after the ride anywhere a listed ride ends. Capitol Hill, Fremont and Ballard, downtown, West Seattle (the Seacrest Pier start of the West Seattle loop) and the Eastside are all empty. A run with search should start there.

## Sources

Fetched and read:

- https://ridewithgps.com/ambassador_routes/511-south-bellevue-mercer-island-loop
- https://www.cascadebicyclestudio.com/local-loops-seattle
- https://cascade.org/rides-events/81550
- https://cascade.org/rides-events/chilly-hilly-2026
- https://cascade.org/rides-events/tuesday-ride-eclectic-athletic-travelers-treats/89978
- https://cascade.org/rides-events/eastside-hills/90363
- https://cascade.org/rides-events/82167
- https://cascade.org/rides-events/83393
- https://cascade.org/rides-events/89717
- https://www.seattlebikeblog.com/2023/07/10/biking-the-new-north-lake-washington-trail-loop/
- https://everydayrides.com/calendar
- https://everydayrides.com/events/6ab4629bb5b4051957d3f0af-co-working-lunch-ride-with-beija-summer-at-sound-break

Sources for the four kept entries (the Sept 15 check, in the town file's
`sources`, not re-opened this run): https://www.portagebaycafe.com/ ·
https://www.bigtimebrewery.com/ · https://www.shultzys.com/ ·
https://www.cedarsseattle.com/

Tried, refused (permission request timed out): https://www.portagebaycafe.com/ · https://www.bigtimebrewery.com/ · https://www.shultzys.com/ · https://www.cedarsseattle.com/ · https://udistrictseattle.com/business-category/food-drink

WebSearch: none available (the session's budget was spent before this run; see coffee.md).
