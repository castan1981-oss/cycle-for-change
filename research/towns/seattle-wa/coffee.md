# seattle-wa · coffee-scout · 2026-10-03

This is the first `coffee[]` for Seattle; the town file had none. It has two cafés, under the 3–6 target. Both
come from pages fetched today. Neither café's own site would open, so both
carry `hours_hint: null`.

Why it's thin: **WebSearch did not work this run.** The first call came back
"web search budget used (200 of 200)", so this section and eat.md ran with
no searches at all. WebFetch opened only pages that earlier agents had already
reached this session (Everyday Rides, Cascade, RideWithGPS, the Cascade
Bicycle Studio loops page). Every café or restaurant site we tried was refused:
the permission request timed out. Nothing was fetched any other way. So the
ride-out cafés rest on the ride listings that name them, and the on-route
stops are names on club pages that we couldn't confirm. No bike parking, pump
or hose was confirmed anywhere. No start had a lat/lon, so no distances are
given. Web calls for both sections together: 1 search (refused) and 30
fetches (21 loaded, 9 refused).

## Findings

```json
[
  {
    "name": "Tailwind Cafe",
    "url": "https://everydayrides.com/events/6a6b7601691c168ef2cbb3a7-good-weather-sunday-social",
    "address": "1424 11th Ave, Seattle, WA",
    "note": "On Capitol Hill, down the corridor into the courtyard of Chophouse Row, per the ride's listing. {ride:seattle-wa-good-weather-sunday-social|Good Weather's Sunday Social} meets here and rolls half an hour later; the group calls it a no-drop ride with park sits and pastry stops. Its own site didn't open for us, so we don't know its hours or bike parking. Check before you go.",
    "hours_hint": null,
    "ride_out": true,
    "ride_slug": "seattle-wa-good-weather-sunday-social"
  },
  {
    "name": "Sound Break Bike House",
    "url": "https://everydayrides.com/events/6ab4629bb5b4051957d3f0af-co-working-lunch-ride-with-beija-summer-at-sound-break",
    "address": "115 S Jackson St, Seattle, WA 98104",
    "note": "Downtown, in RailSpur Alley in Pioneer Square. In its own words, \"a cycling focused gathering place\": a café, bike rentals, retail, repairs and guided rides under one roof. Hours weren't on any page we could open, so check before you count on it.",
    "hours_hint": null,
    "ride_out": false
  }
]
```

## Why these

- **Tailwind Cafe** is the one café in `rides.json` that a weekly ride leaves from: the Good Weather Sunday Social, posted for Oct 4, 11 and 18, 2026 ("Meet at 10:30am, roll at 11:00, back around 2:00pm"). The address and "in the courtyard of Chophouse Row" come from the Everyday Rides event page. "No-drop ride" is the group's own wording on its group page. `url` is the ride listing because the café's own page never opened. Swap in the café's own site once the verifier reaches it. It's a late start, so this is the Sunday social coffee, not the early one.
- **Sound Break Bike House** is the bike café: Sound Break's own post on Everyday Rides (a lunch ride on Oct 7, 2026, posted by "Sound Break Team") describes it as a café with rentals and repairs, at 115 S Jackson St. That post is the one live signal; it is also why `url` points there. It sits downtown, the side of town the Bainbridge ferry leaves from (Colman Dock, 801 Alaskan Way, in routes.md). The ride it posted is a one-off, so `ride_out` is false. Hand-offs: **@shop-scout** for the rentals and repairs; **@community-scout** if it posts a recurring ride.

## Rejected

- **NorthStar Clubhouse** (21st and Union, the NorthStar Sunday Service start). The club's own page says "Meet up at The Clubhouse at 10:30am, roll out 11:00am" and nothing about coffee, food or hours. Nothing we read says it's a café. The ride is already in the directory.
- **Eastside Coffee Outside** (Kirkland Rotary Central Station, 1 Railroad Ave, Kirkland; Wednesdays 7–9 a.m.) and **Coffee Outside Seattle** (Wednesdays 7–8:45 a.m., start TBD), both on the Everyday Rides calendar. These are bring-your-own coffee meetups, not cafés. @community-scout left them out of the rides too.
- **Starbucks and QFC on Mercer Island**, both points of interest on Cascade's Mercer Island loop. They're chains and the page gives no address. The Roanoke Inn is the stop on that loop with a reason (eat.md).
- **Sammamish Safeway**, the only stop on the Aug 22, 2026 Eastside Hills ride ("one stop at the Sammamish Safeway at mile 26.2"). A grocery.
- **Bainbridge Island Rowing's boathouse** (baked goods and hot drinks) and the **Senior Community Center chili** on the Chilly Hilly 2026 page. Event day only.
- **Cascade Bicycle Studio** (180 North Canal Street, Fremont; Tuesday–Saturday 10–6). Its loops page doesn't say it serves coffee. It's a shop, so it goes to @shop-scout.

## Couldn't confirm

- **Pacha Collective**: the start of {ride:seattle-wa-wtfnb-weekly-with-brevay|WTFNB Weekly with Brevay}, the only early ride-out café in the directory. No fetched page gives an address; `rides.json` says only "Seattle, WA". Brevay's series page lists 36 past rides, the last on Sept 24, 2026, and "No upcoming events scheduled", so check that the ride still runs before the café goes in. Where to look: Pacha Collective's own site or Google listing, Brevay's Instagram, and the series page once a new date posts.
- **Tailwind Cafe's own page**: hours, opening time, bike parking. http://www.goodweatherinseattle.com was refused, and we didn't open the Google Maps link on the listing. Where to look: the café's site or Google listing, and Chophouse Row's directory.
- **Sound Break's own site** (http://soundbreak.cc): refused. We're missing the café's hours, whether it opens early, bike parking, and the rental fleet and prices (for @shop-scout).
- **Mello Fellos Bike Shop** (2151 Sixth Ave), the start of {ride:seattle-wa-mello-fellos-saturday-ride|the Mello Fellos Saturday ride}. Nothing we fetched says whether it serves coffee. Its Strava club (https://www.strava.com/clubs/2297734) and its Everyday Rides event page were refused. If it has a coffee bar, it's a ride-out pick. Hand-off to @shop-scout.
- **The Burke-Gilman.** No café on the trail was confirmed. The one named stop is the **North Shore Senior Center** in Bothell. Cascade's LUMPS ride (Oct 1, 2025, from Redmond) takes "a pie or cookie break at NSSC", with "homemade pies with whipped or ice cream, sodas and coffee … for short money". The page gives no address and no public hours, and doesn't say whether a rider off the ride can stop there. Cascade's MUMPS page, from **Log Boom Park** in Kenmore, says "There is no sit-down coffee/food stop." Where to look: the senior center's own page, and Kenmore and Lake Forest Park cafés by the trail, with search.
- **Kirkland Transit Center**, the Eastside Hills start (proposed slug `kirkland-wa-cascade-eastside-hills`, not merged yet). No café is named on either Cascade page (Aug 22 and Oct 3, 2026). Where to look: cafés on Park Lane by the transit center.
- **Pegasus Coffee, Bainbridge Island**: Cascade Bicycle Studio's Seattle–Bainbridge–Kingston–Edmonds loop recommends it. It's the obvious coffee for the ferry-and-island day (routes.md, "Bainbridge Island by ferry"). We couldn't open its own page. Cascade's midsummer Chilly Hilly page says only "multiple food options in downtown Bainbridge Island at the end of the ride".
- **The other names on Cascade Bicycle Studio's loops page**, none opened: **Walnut Street Coffee** ("Get a cup of coffee at Walnut Street Coffee before heading back!", Edmonds & Back), **Vashon Baking** and **Burton Coffee Shack** (Vashon Island Ferry Loop), the **Indianola Country Store** ("coffee & snacks", the Kingston–Edmonds loop) and **Kitchen & Market** ("water & snacks around mile 8", The 610 + Mercer).
- **The U District, near the STP start.** No early café was checked, and no fetched page names one. The 5 a.m. STP start needs one, so this is the first search for the next run, along with West Seattle (Seacrest Pier, the West Seattle loop start), Fremont and Ballard.

## Sources

Fetched and read:

- https://everydayrides.com/groups/good-weather
- https://everydayrides.com/events/6a6b7601691c168ef2cbb3a7-good-weather-sunday-social
- https://everydayrides.com/calendar
- https://everydayrides.com/events/6ab4629bb5b4051957d3f0af-co-working-lunch-ride-with-beija-summer-at-sound-break
- https://everydayrides.com/event-series/690e2a060214ed1d170518b0-brevay-cycling-wtfnb-weekly
- https://northstar-bicycle-club.myshopify.com/pages/when-we-ride
- https://www.cascadebicyclestudio.com/local-loops-seattle
- https://ridewithgps.com/ambassador_routes/511-south-bellevue-mercer-island-loop
- https://ridewithgps.com/ambassador_routes/548-full-lake-loop-from-south-bellevue-p-r?lang=en
- https://cascade.org/rides-events/leisurely-urbane-matthews-beach-pedalers-lumps/87919
- https://cascade.org/rides-events/monday-urban-merry-pedalers-mumps/87109
- https://cascade.org/rides-events/82922
- https://cascade.org/rides-events/eastside-hills/90363
- https://cascade.org/rides-events/84215
- https://cascade.org/rides-events/81550
- https://cascade.org/rides-events/chilly-hilly-2026
- https://www.seattlebikeblog.com/2023/07/10/biking-the-new-north-lake-washington-trail-loop/

Tried, refused (permission request timed out): http://www.goodweatherinseattle.com · http://soundbreak.cc · https://www.strava.com/clubs/2297734 · https://everydayrides.com/events/6ab5af7780459b2004507bf3-a-route-to-be-named-but-we-re-riding-on-saturday · https://udistrictseattle.com/business-category/food-drink

WebSearch: one call, refused because the session's search budget was spent before this run started.
