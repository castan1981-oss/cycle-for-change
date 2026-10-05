# san-francisco-ca · eat-scout · 2026-10-03

Four places, the floor of the 4–8 target, each fetched on its own site plus a
second listing. They cover the night before and late (El Farolito, the
Mission), the night before (Original Joe's, North Beach), after the ride
(Woodlands Market in Tiburon, the Different Spokes lunch stop) and on the way
(Alice's on Skyline). Zones 3 and 5 have no restaurant, and Zone 2 has only
the bakery in coffee.md. Search ran out: this section had 5 of the 12
WebSearch calls shared with coffee, and WebFetch only opens URLs that came up
in a search, so the ride-start restaurants in `rides.json` (Maya Taqueria,
Split Rock Tap and Wheel) went unchecked. They're in Couldn't confirm. No
outdoor table or bike parking was confirmed in writing, except Alice's
tables outside in its own photos.

## Findings

```json
[
  {
    "name": "El Farolito",
    "url": "https://elfarolitosf.com/about/",
    "address": "2779 Mission St, San Francisco, CA 94110",
    "cuisine": "Mexican",
    "note": "Late, and the night before, in Zone 6: burritos in the Mission, at the original shop, which its site says is open past 3 a.m. most nights. Cash only, and cheap. Seating and bike parking weren't on the page."
  },
  {
    "name": "Original Joe's North Beach",
    "url": "https://www.originaljoes.com/north-beach",
    "address": "601 Union Street, San Francisco, CA 94133",
    "cuisine": "Italian-American",
    "note": "The night before, in Zone 6: North Beach, on the bridge side of the city. Dinner from 4 Monday to Thursday, lunch from 11:30 Friday and 11 on weekends; it closes at 10, or 9 on Sunday, per its site. Book on its site; the walk-in and group policy wasn't on the page."
  },
  {
    "name": "Woodlands Market Tiburon",
    "url": "https://www.woodlandsmarket.com/tiburon/",
    "address": "1550 Tiburon Blvd, Tiburon, CA 94920",
    "cuisine": "Deli",
    "note": "After the ride, in Zone 1: a market in Tiburon with a deli counter of hot and cold sandwiches, where {ride:san-francisco-ca-different-spokes-jersey-ride|Different Spokes' Jersey Ride} had its group lunch in May 2025. 7 a.m. to 9 p.m. daily, per its site and the Tiburon chamber. Seating and bike parking weren't on any page."
  },
  {
    "name": "Alice's Restaurant",
    "url": "https://alicesrestaurant.com/",
    "address": "17288 Skyline Boulevard, Woodside, CA 94062",
    "cuisine": "American",
    "note": "On the way, in Zone 4: the restaurant on Skyline Boulevard in the redwoods above Woodside, a stop for motorcyclists and bike teams alike. 8 a.m. to 8 p.m., to 7 on Sunday, per its site, with tables outside in its photos. (650) 851-0303."
  }
]
```

## Why these

- **El Farolito**: the late slot, and a night-before burrito. Its own About page (© 2026) says the Mission Street flagship (2779 Mission St, the only full address it gives) is "open past 3:00 AM most nights" and that it's "Cash only at all locations", "Big portions, small prices". The page gives no opening time, so the note doesn't either. Second signal: TripAdvisor for the 24th Street shop (2950 24th St; 10 a.m. to 2:45 a.m. daily, newest review Sept 2025). The About page says that shop closes at 1:30 a.m. weeknights and 2:30 a.m. weekends. Zone 6, where the brief has visitors sleeping and eating.
- **Original Joe's North Beach**: the sit-down night before. Its own page gives the hours in the note and has a reservation link. Wikipedia: "mostly Italian-American cuisine", at 601 Union Street since 2012. North Beach is the brief's "close to the bridge" side of town. No menu tour, and portions weren't on any page, so the note doesn't claim them.
- **Woodlands Market Tiburon**: the after-ride lunch for Zone 1, and the Paradise Loop and Tiburon side of the bridge. Different Spokes' May 10, 2025 Jersey Ride page names "Woodlands Market in Tiburon" as the lunch stop. The club's current monthly page and its Aug 8, 2026 event page still say both groups "meet in Tiburon where we have lunch together as a group" but no longer name the place, so the note dates it to May 2025. Hours: its own page and the Tiburon chamber listing (7 to 9 daily). The deli is from DoorDash ("Woodlands Market Deli": hot and cold sandwiches, 7 a.m. to 8:40 p.m.) and Roadtrippers ("a deli counter serving hot takeout items"). Different Spokes is the Bay Area's LGBTQ+ club (`rides.json`), and the token links its ride.
- **Alice's Restaurant**: the on-the-way stop for Zone 4. Its own site gives 17288 Skyline Boulevard, (650) 851-0303 and 8 to 8 Monday to Saturday, 8 to 7 Sunday, sets it "among the redwoods", and shows motorcyclists and tables outside in its photos. TripAdvisor agrees on the hours, has reviews from October 2025 and July 2026, and one review lists "bicycle team[s]" among the crowd. Its site calls it American. The Palo Alto rides hub covers the Peninsula rides; this is only the food on Skyline.

## Rejected

- **Foursquare (Woodlands Market) and Yelp (El Farolito, Woodlands, Alice's, Original Joe's)**: robots.txt blocked them. Yelp titles in search results showed "Updated" dates in 2026, but those were leads only.
- **El Farolito's 24th Street shop as the pick**: its own site gives no full address for it. The flagship has one.
- **Ranked "best of" lists**: none used.

## Couldn't confirm

- **Maya Taqueria, Point Richmond**: `rides.json` starts Berkeley Bicycle Club's Saturday Marin ride (`richmond-ca-berkeley-bicycle-club-saturday-marin-ride`) there. It would be Zone 5's restaurant, and probably the place to eat after. No search left. Where to look: its own site or Google listing for the address and hours, and berkeleybikeclub.org/saturday-marin-ride for the exact meet.
- **Split Rock Tap and Wheel, Fairfax (2020 Sir Francis Drake Blvd)**: where Marin Cyclists' Saturday ride to Point Reyes Station meets (`rides.json`). The name suggests a taproom with a bike side. Not checked. Hand-off to @shop-scout (if it fixes bikes) and @culture-scout (the bar). It may also be the obvious lunch place after the ride.
- **Hook Fish Co. at Proof Lab, Mill Valley**: Equator's own post (June 2023) puts "local favorite restaurant Hook Fish Co. at Proof Lab Beer Garden" next to Equator, where Tam Velo's weekend rides start and finish. It would be the after-ride lunch for Zone 2. Not checked. Its 2023 mention is too old to call it open.
- **Point Reyes Station lunch**: only Bovine Bakery (coffee.md) was checked. A sit-down lunch at the turnaround of the long day is still open. Not searched.
- **Zone 3, the ocean side, and Zone 5, the East Bay**: no restaurant confirmed. Java Beach (coffee.md) sells sandwiches; a TripAdvisor reviewer says they're big enough for lunch. Where to look: a place near the Great Highway or Lake Merced with outdoor tables, and food near Rockridge BART, where AIR cc's rides start.
- **A Castro pick**: the queer club's ride starts at Jane Warner Plaza (Aug 2026 event page; see coffee.md on the Castro Peet's). A breakfast or late place in the Castro would sit right at that start. Not searched.
- **Bike parking and outdoor tables**: not on any fetched page except Alice's photos.

## Sources

- https://elfarolitosf.com/about/
- https://www.tripadvisor.com/Restaurant_Review-g60713-d480433-Reviews-El_Farolito-San_Francisco_California.html
- https://www.originaljoes.com/north-beach
- https://en.wikipedia.org/wiki/Original_Joe%27s
- https://www.woodlandsmarket.com/tiburon/
- https://business.tiburonchamber.org/list/member/woodlands-market-419
- https://www.doordash.com/store/woodlands-market-deli-belvedere-tiburon-40357341/
- https://maps.roadtrippers.com/us/tiburon-ca/food-drink/woodlands-market-tiburon
- https://www.dssf.org/content.aspx?page_id=4091&club_id=17789&item_id=2527581
- https://www.dssf.org/content.aspx?page_id=4002&club_id=17789&item_id=2992657
- https://www.dssf.org/content.aspx?page_id=22&club_id=17789&module_id=336753
- https://alicesrestaurant.com/
- https://www.tripadvisor.com/Restaurant_Review-g33292-d511424-Reviews-Alice_s_Restaurant-Woodside_California.html
- https://www.equatorcoffees.com/blogs/journal/celebrating-10-years-at-proof-lab
- https://www.tripadvisor.com/Restaurant_Review-g60713-d2620311-Reviews-Java_Beach_Cafe-San_Francisco_California.html
- cfc-site/rides/rides.json: the ride starts at Maya Taqueria and Split Rock Tap and Wheel, and Different Spokes as an LGBTQ+ club

Tried and could not open: https://foursquare.com/v/woodlands-market/4dbc5e9c43a1d8504b8a1bc3 (robots.txt) · Yelp pages for all four (robots.txt)
