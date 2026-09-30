# los-angeles-ca · coffee-scout · 2026-09-30

Three cafés, one each in Zones 1, 2 and 3, every one fetched on its own site
or on two live listings. Zones 4, 5 and 6 came up empty inside the budget;
the leads are in Couldn't confirm. No LA ride in `cfc-site/rides/rides.json`
starts at a café (a public square, a university lot, the beach, a bike shop,
or a rotating start), so the one `ride_out: true` here rests on the club's
own page naming the corner the café sits on. The note and Couldn't confirm
say so; the editor can flip it. No bike parking, pump or hose was confirmed
anywhere. 31 web calls (9 searches, 22 fetches), six over the budget.

## Findings

```json
[
  {
    "name": "Caffe Luxxe (Brentwood Country Mart)",
    "url": "https://www.caffeluxxe.com/pages/brentwood-country-mart",
    "address": "225 26th Street, Santa Monica, CA 90402",
    "note": "Zone 1, the Westside, in the Brentwood Country Mart on the corner of 26th and San Vicente where Velo Club La Grange's weekday rides leave at 6:30 a.m. (Marina Ride Tuesday, Mandeville Canyon and Gravel Wednesday, Amalfi Loops Thursday, Marina Lite Friday). It opens at 7, after the roll-out, so it's the coffee after; outdoor tables, per its site. The club names the corner, not the café, and nothing on either site says bike parking.",
    "hours_hint": "7 a.m. to 6 p.m. daily",
    "ride_out": true
  },
  {
    "name": "Pedalers Fork / 10 Speed Coffee",
    "url": "https://www.pedalersfork.com/",
    "address": "23504 Calabasas Rd, Calabasas, CA 91302",
    "note": "Zone 2, the Valley side of the Santa Monica Mountains, in Calabasas. Opens at 6 a.m. every day (Tock and joe.coffee, Sept 2026): 10 Speed Coffee's café inside a restaurant, with a bike shop on the creekside patio. Outside the city, and here because it's the one confirmed 6 a.m. open near the canyon climbs; the shop's own hours and any bike parking weren't confirmed.",
    "hours_hint": "6 a.m. daily; closes 3 p.m. Sunday to Tuesday, 9 p.m. Wednesday to Saturday",
    "ride_out": false
  },
  {
    "name": "Spoke Bicycle Cafe",
    "url": "https://www.spokebicyclecafe.com/",
    "address": "3050 N. Coolidge Ave., Los Angeles, CA 90039",
    "note": "Zone 3. A café with a bike shop on the LA River bike path in Frogtown, on the Griffith Park and LA River loop. Opens at 9, so it's the mid-ride or after stop, not the early one; repairs and rentals on site, and the shop is closed Tuesdays. Nothing on its site says bike parking or a pump.",
    "hours_hint": "9 to 6 Monday to Wednesday, 9 to 9 Thursday to Sunday; bike shop 10 to 5 weekdays, 9 to 5 weekends, closed Tuesday",
    "ride_out": false
  }
]
```

## Why these

- **Caffe Luxxe, Brentwood Country Mart** — the café on the corner where La Grange's five 6:30 a.m. weekday rides meet (lagrange.org/rides: "26th and San Vicente Blvd. in Santa Monica"; the Mart is "225 26th Street just south of San Vincente Boulevard" per Wikipedia and 225 26th Street per the café's own page). Opens at 7, so a rider joining the Tuesday Marina Ride rolls out before it opens and comes back to it. Helen's Cycles Santa Monica (shops.md) is the shop on this side. `ride_out: true` on the club's page naming the corner; see Couldn't confirm.
- **Pedalers Fork / 10 Speed Coffee** — the early one: 6 a.m. daily on two live listings (Tock shows reservation slots from 6:00 a.m. on Oct 1, 2026; joe.coffee lists 6 a.m. every day). A bike shop on the patio (OpenTable, Tock, joe.coffee all say so). It's the Zone 2 pick, on the Valley side; the Latigo loop in routes.md starts in Malibu on the other side of the range, so this is not tied to a named route. Calabasas is outside the city; the brief's Zone 2 is the reason.
- **Spoke Bicycle Cafe** — the on-route stop for the Griffith Park and LA River loop (routes.md): its own site puts it "on the L.A. River Bike Path in Frogtown." The only east-side pick, and the only bike-shop café inside the city. Its site rate-limited the shop scout twice; it loaded once this run (findus page and home page). Not early: 9 a.m.

## Rejected

- **Starbucks, Manhattan Beach Ave** — bigorangecycling.org names it as the Sunday 8:00 a.m. Big Orange Team Ride start. A chain, outside the city, and the ride isn't in `rides.json`. The club page is the lead for @community-scout, not a coffee pick.
- **Caffe Luxxe's other caffes** (the "Our Caffes" and "Brentwood San Vicente" pages came up in search) — not fetched; only the Mart location sits on the ride corner.
- **Yelp** (Spoke, Dogtown, Yellow Vase, Pedalers Fork, Trails), **TripAdvisor, Foursquare, Uber Eats, hopped.com, OverlookMaps, ClassPass, autoreserve** — leads only; Yelp is disallowed by robots.txt from this session.
- **Reddit, SoCalTrailRiders, MapMyRide, PJAMM, Komoot highlights** for the Donut — leads for the ride, not for coffee.
- **Toast order pages** (The Trails, Pedalers Fork) — both redirect to toast.app, and the redirect fetch never got approval.

## Couldn't confirm

- **The `ride_out` flag on Caffe Luxxe.** No club page names the café; lagrange.org names the corner. The five weekday rides aren't in `rides.json` (hand-off to @community-scout, from routes.md too). If the editor wants the strict reading, set it false; the note still tells the rider where the corner is. Whether the riders actually go in after is not on any fetched page. Where to look: @veloclublagrange on Instagram, the club's Strava club, the La Voix newsletter (lagrange.org/blog).
- **Pedalers Fork's own site** (pedalersfork.com) and **10speedcoffee.com** — both fetches waited on an approval that never came. The address and hours are from three listings that agree (Tock, joe.coffee, OpenTable). Opening time conflict: Tock and joe.coffee say 6 a.m.; OpenTable's older page (latest review March 2019) says breakfast from 7. The bike shop's hours, whether it does walk-in repairs, and bike parking or a pump: not on any fetched page. Where to look: pedalersfork.com, the shop's Yelp (Sept 2026 in search results), phone (818) 225-8231 per joe.coffee. Hand-off to @shop-scout: a bike shop on a café patio in Zone 2, which shops.md has no shop for.
- **Spoke's second open signal.** Its own site (two pages, Sept 2026) is the one signal; Yelp (search results say updated July 2026) is blocked by robots.txt. "Open, confirm by phone" by the rules: 323-622-4686. Bike parking and a pump: not on the site. Hand-off to @shop-scout: a shop with repair and rentals in Frogtown, the east-side hole in shops.md.
- **The Trails Cafe, Griffith Park** (the Fern Dell stand near the Observatory approach) — joe.coffee lists 8 a.m. daily (Tuesday to 2 p.m., other days to 5) and "woodland outdoor seating" at "this Griffith Park stand," but no address on the fetched page; the Toast page redirected and was blocked; no own site found. The obvious stop for the Zoo-lot loop and the Observatory, if confirmed. Where to look: its Google listing; friendsofgriffithpark.org/venues-attractions; the toast.app page.
- **Dogtown Coffee, Main Street, Santa Monica** — joe.coffee lists 7 a.m. to 2 p.m. daily, "a surfer-skater vibe," no address; dogtowncoffee.com and the santamonica.gov listing were both blocked. Near the beach path and Bike Attack (shops.md). Not early by the rule (7). Where to look: dogtowncoffee.com, Google listing.
- **Yellow Vase, Malaga Cove Plaza** — the Zone 5 lead: bigorangecycling.org starts its Sunday 8:00 a.m. Wheatgrass Ride at "Malaga Cove Plaza, Palos Verdes," and the search results put Yellow Vase at 51 Malaga Cove Plaza (not fetched; the kekes.com order page 404'd). On the Donut loop. Where to look: its Google listing, Yelp (July 2026 in search), the plaza's own page.
- **The Donut Ride** — bigorangecycling.org says Saturday 8:00 a.m. from "Avenue I & Elena, Redondo Beach," and also lists a Friendly Donut Ride (Saturday 8:00 a.m., Miramar Park, Redondo Beach). No café named for either. Hand-off to @community-scout (routes.md asked for this). A café near Avenue I and Elena, open by 7:30 Saturday, would be the Zone 5 ride-out pick.
- **Zone 4, the San Gabriels** — nothing searched; the budget ran out. Leads: the FOO CHOW ride leaves from Incycle Pasadena, a shop, not a café; GMR's base is in Glendora. Where to look: "Glendora Mountain Road coffee cyclists"; a café on Fair Oaks near Incycle; Lightning Velo's and Pasadena Athletic Association's ride pages for a "coffee after."
- **Zone 6, the Valley** — nothing searched. SFVBC starts at CSUN Lot B1, Nordhoff and Etiwanda, 8:00 a.m. Where to look: sfvbc.org for a coffee-after line; a café near CSUN open by 7 on weekends; C Street Bikes (shops.md) for a Studio City lead.
- **A weekend 6:30 opener on the Westside** — none found. Caffe Luxxe opens at 7, Dogtown at 7 (unconfirmed). The Saturday rides start at 8, so 7 works for those. Where to look: cafés on Montana Ave or San Vicente open at 6.
- **Bike parking, a floor pump, a hose** — not on any fetched page, for any pick. The "one with the pump" is empty this run.

## Sources

- https://www.lagrange.org/rides
- https://www.caffeluxxe.com/pages/brentwood-country-mart
- https://www.brentwoodcountrymart.com/caffe-luxxe
- https://www.brentwoodcountrymart.com/
- https://en.wikipedia.org/wiki/Brentwood_Country_Mart
- https://www.spokebicyclecafe.com/findus
- https://www.spokebicyclecafe.com/
- https://www.exploretock.com/pedalers-fork-calabasas
- https://joe.coffee/locations/ca/calabasas/pedalers-fork-calabasas-cdbcaacb-7841-4872-b5f1-951f88434e36/
- https://www.opentable.com/r/pedalers-fork-calabasas
- https://www.bigorangecycling.org/local-rides
- https://joe.coffee/locations/ca/los-angeles/the-trails-los-angeles-56b2caf9-b39c-4a82-ba6e-7b1302b7d81f/
- https://joe.coffee/locations/ca/santa-monica/dogtown-coffee-santa-monica/
- cfc-site/rides/rides.json — the LA-area rides and their `start_location`
- research/towns/los-angeles-ca/routes.md — the La Grange weekday hand-off, the Griffith Park and LA River loop
- research/towns/los-angeles-ca/shops.md — the Spoke hand-off, Helen's and Bike Attack

Tried and could not open: https://www.yelp.com/biz/spoke-bicycle-cafe-los-angeles-3 (robots.txt) · https://www.pedalersfork.com/ (no fetch approval) · https://www.10speedcoffee.com/ (no fetch approval) · https://www.dogtowncoffee.com/ (no fetch approval) · https://www.santamonica.gov/local-businesses/dogtown-coffee (bot check) · https://order.kekes.com/store/YellowVase-620368 (404) · https://toast.app/r/the-trails-cafe-2333-fern-dell-drive/order/r-50af251e-b35c-472e-9727-373b09a0a1df (no fetch approval) · https://www.toasttab.com/local/pedalers-fork-calabasas-23504-calabasas-rd/r-1d365613-db5b-4422-a361-564a1d63da51 (redirect not followed)
