# seattle-wa · coffee-scout · 2026-10-04

A refresh with search back on. The Oct 3 run had two cafés and no hours; this
one replaces it. Five cafés, every one from its own site, hours in its own
words. Two are ride-out cafés in `rides.json`, one is the bike-shop café on
the Burke-Gilman, one is the U District coffee for the STP weekend, one is
the Bainbridge ferry-day coffee. Kept from the last run: Tailwind Cafe (now
with its own site, address and hours). Dropped: Sound Break Bike House (see
Rejected). Web calls, both sections together: 12 searches (the cap) and 30
fetches (24 loaded, 4 refused, 2 blocked by robots.txt). No page we read
confirms a bike rack, pump or hose anywhere, so none is claimed. No distances
are given; no fetched page carried a lat/lon.

## Findings

```json
[
  {
    "name": "Tailwind Cafe & Bar",
    "url": "https://tailwindcafe.com/",
    "address": "1424 11th Ave, Seattle, WA 98122",
    "note": "Capitol Hill, in the alley at Chophouse Row, with a courtyard. {ride:seattle-wa-good-weather-sunday-social|Good Weather's Sunday Social} meets here at 10:30 and rolls at 11; the café opens at 9, so there is time for coffee first. Espresso, breakfast and sandwiches, beer and wine; indoor and outdoor seating, tip-free, per its site. Closed Monday. Nothing on its page says bike parking.",
    "hours_hint": "9 a.m. to 7 p.m. Tuesday to Sunday, closed Monday",
    "ride_out": true,
    "ride_slug": "seattle-wa-good-weather-sunday-social"
  },
  {
    "name": "Pacha Collective",
    "url": "https://www.pacha-collective.com/",
    "address": "7119 Woodlawn Ave NE, Seattle, WA 98115",
    "note": "Green Lake. {ride:seattle-wa-wtfnb-weekly-with-brevay|Brevay's WTFNB Weekly} meets here Thursdays at 6:30 and rolls at 6:35, before the door opens at 7; the ride's listing says coffee and pastries after. An all-day café with coffee, bowls and a bar, open to 9 on weeknights. Brevay's series page showed no upcoming date on Oct 4, 2026 (the last ride posted was Sept 24), so check the ride before you plan on it. Nothing on the café's page says bike parking.",
    "hours_hint": "7 a.m. to 9 p.m. Monday to Friday, 7 to 5 Saturday and Sunday",
    "ride_out": true,
    "ride_slug": "seattle-wa-wtfnb-weekly-with-brevay"
  },
  {
    "name": "PIM Bicycles & Coffeehouse",
    "url": "https://www.cycleandcoffee.com/",
    "address": "4013 Leary Way NW, Seattle, WA 98107",
    "note": "A bike shop with a coffee bar \"located right on the Burke-Gilman trail\" in Fremont, in its own words. Opens at 6 on Monday and Friday and 7 on the weekend, the earliest door we found near the trail. Walk-ins for quick fixes, per the shop page. Tuesday to Thursday hours weren't listed; call first midweek. Nothing on its pages says a pump or bike parking; it has a car lot.",
    "hours_hint": "6 a.m. to 2 p.m. Monday and Friday, 7 to 2 Saturday and Sunday; Tuesday to Thursday not listed",
    "ride_out": false
  },
  {
    "name": "Cafe Allegro",
    "url": "https://seattleallegro.com/",
    "address": "4214 University Way NE, Seattle, WA 98105",
    "note": "The U District, a block from the STP hotels, with the entrance in the alley. Espresso roasted on site. Opens at 7 on weekdays and 8 on weekends, so it is the coffee the day before the STP and the morning after, not the 5 a.m. start. Nothing on its page says outdoor seating or bike parking.",
    "hours_hint": "7 a.m. to 6 p.m. weekdays, 8 to 6 weekends",
    "ride_out": false
  },
  {
    "name": "Pegasus Coffee House",
    "url": "https://pegasuscoffee.com/pages/original-pegasus-coffee-house-bainbridge",
    "address": "131 Parfitt Way SW, Bainbridge Island, WA 98110",
    "note": "The coffee on the ferry-and-island day: Winslow, off the Seattle ferry, on the Chilly Hilly course. Opens at 7 every day; its two pages give the close as 4, 5 or 6 depending on the day, so plan on 4. Cascade Bicycle Studio's Bainbridge loop names it. The same roaster has a weekday coffee bar downtown at 711 3rd Avenue, 6:30 a.m. to 1 p.m. Monday to Friday, on the side of town the ferry leaves from. Bike parking isn't on either page.",
    "hours_hint": "7 a.m. daily; closes 4 to 6 p.m. depending on the day",
    "ride_out": false
  }
]
```

## Why these

- **Tailwind Cafe & Bar** is the Sunday ride-out café: the only café in `rides.json` that a weekly Seattle ride leaves from, and it now has its own page with the address ("1424 11th Ave (in the Alley)"), hours and seating. Its site mentions Good Weather events in its courtyard. Opens 9, meet 10:30: coffee first, then the ride.
- **Pacha Collective** is the early ride-out café, found this run: Everyday Rides' event page puts Brevay's Thursday WTFNB ride at "Pacha Collective, 7119 Woodlawn Ave NE" at 6:30. The café's own site gives the hours. The honest line is in the note: the series page says "No upcoming events scheduled" with the last ride Sept 24, 2026. `rides.json` still lists the ride as active (last seen Sept 24); hand-off to **@community-scout** / the re-check queue to confirm it still runs.
- **PIM Bicycles & Coffeehouse** is the one with the shop, and the early one on the Burke-Gilman: 6 a.m. two days a week, 7 on weekends, repairs while you drink. Hand-off to **@shop-scout** for the repair side (tune-ups from $120, Sept 2026 page; vintage bikes and custom builds).
- **Cafe Allegro** is the U District coffee for the STP weekend. It doesn't open for the 5 a.m. start; nothing in the U District we could confirm does. It's the only pick that's near the sights rather than a ride, and it's here because the STP start is three blocks away.
- **Pegasus Coffee House** is the Bainbridge day. Cascade Bicycle Studio's loops page (read last run) recommends it; its own pages give the address and hours. The downtown Pegasus bar (6:30 weekdays) rides along in the note as the early door before the ferry.

## Rejected

- **Sound Break Bike House** (115 S Jackson St, Pioneer Square), in last run's findings. Its site (soundbreak.cc) was refused again, and the only live signal is still one Oct 7 lunch-ride post. With five confirmed cafés it doesn't earn a slot on a ride post alone. **@shop-scout** should still look at it for rentals and repairs.
- **Chophouse Row's own hours** (7–11 weekdays, 10–11 weekends) are the building's, not Tailwind's. Tailwind's page wins.
- **Saint Helens Cafe, Metier, Peloton** — the three "bike cafés" in Seattle Met's June 2016 piece. Ten years old; none was confirmed open this run. Not listed from a decade-old article.
- **NorthStar Clubhouse** (2015 E Union St) — the NorthStar Sunday Service start. Nothing says it's a café (last run's finding stands).
- **Eastside Coffee Outside** and **Coffee Outside Seattle** — bring-your-own meetups, not cafés.
- **Starbucks and QFC on Mercer Island, the Sammamish Safeway, the Chilly Hilly boathouse bake sale** — chains, groceries, event-day only (unchanged from last run).
- **Cascade Bicycle Studio** (180 N Canal St, Fremont) — a shop; its page doesn't say it serves coffee. **@shop-scout**.

## Couldn't confirm

- **Whether Brevay's Thursday ride still runs.** The series page: "No upcoming events scheduled", last ride Sept 24, 2026. Where to look: Brevay's Instagram, Everyday Rides once October dates post.
- **An early U District door for STP morning.** The 5 a.m. start has no confirmed café. Cafe Allegro opens 7. Where to look: cafés on NE 45th and Roosevelt with a 5 or 6 a.m. open, and whatever Cascade posts for the 2027 start village.
- **PIM's Tuesday to Thursday hours** — not on its pages. Phone 206-784-2097.
- **Pegasus's closing time** — its location page says 5 (Mon–Thu) and 6 (Fri–Sun); its contact page says 4 (Sun–Thu) and 6 (Fri–Sat). Phone 206-317-6914.
- **Mello Fellos Bike Shop** (2151 Sixth Ave), the {ride:seattle-wa-mello-fellos-saturday-ride|Saturday ride} start — whether it has a coffee bar. Its Strava club and Everyday Rides page were refused last run; not retried with the search budget spent. **@shop-scout**.
- **Burke-Gilman stops beyond PIM**: the North Shore Senior Center pie stop in Bothell (Cascade's LUMPS page, no address or public hours), and cafés in Kenmore and Lake Forest Park by the trail. Not searched this run.
- **Kirkland Transit Center** (the {ride:kirkland-wa-cascade-eastside-hills|Eastside Hills} start) — no café named on the Cascade pages; Park Lane cafés unsearched.
- **The names on Cascade Bicycle Studio's loops page**: Walnut Street Coffee (Edmonds), Vashon Baking, Burton Coffee Shack (Vashon), Indianola Country Store, Kitchen & Market. None fetched.
- **West Seattle coffee** at Seacrest Pier, the West Seattle loop start. Marination Ma Kai is there (eat.md) but it's a restaurant, not a café.

## Sources

Fetched and read this run:

- https://tailwindcafe.com/
- https://www.chophouserow.com/
- https://www.pacha-collective.com/
- https://joe.coffee/locations/wa/seattle/pacha-collective-seattle/
- https://everydayrides.com/events/69f81610cdd8e7421494b3a5-wtfnb-weekly-with-brevay
- https://everydayrides.com/event-series/690e2a060214ed1d170518b0-brevay-cycling-wtfnb-weekly
- https://www.cycleandcoffee.com/
- https://www.cycleandcoffee.com/pages/bike-shop
- https://www.cycleandcoffee.com/pages/contact-us
- https://www.cycleandcoffee.com/blogs/community/now-open-p-i-m-bicycles-seattle-location
- https://seattleallegro.com/
- https://pegasuscoffee.com/pages/original-pegasus-coffee-house-bainbridge
- https://pegasuscoffee.com/pages/contact
- https://www.seattlemet.com/eat-and-drink/2016/06/bike-cafes-are-seattle-s-new-thing

Read last run (Oct 3), relied on here for the ride listings and the Bainbridge loop: https://everydayrides.com/groups/good-weather · https://everydayrides.com/events/6a6b7601691c168ef2cbb3a7-good-weather-sunday-social · https://www.cascadebicyclestudio.com/local-loops-seattle · https://northstar-bicycle-club.myshopify.com/pages/when-we-ride

Tried, refused (permission request timed out): http://soundbreak.cc (last run; not retried).

WebSearch this run (shared with eat.md, 12 of 12): Tailwind Cafe hours · Pacha Collective address / Brevay · Burke-Gilman coffee stop · U District coffee opens 6am · Pegasus Coffee House hours · Roanoke Inn hours · Marination Ma Kai hours · Cafe Allegro hours · Dick's Drive-In Broadway hours · Paseo Fremont hours · Marination official site · Un Bien Ballard hours.
