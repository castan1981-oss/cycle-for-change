# seattle-wa · town-verifier · 2026-10-04

**Does not ship** as written. Three one-line fails sit in the rentals and ship sections (evo's
repair line, Ride Bicycles' hours, Métier's build-fee line), and the rule is that any fail there
holds the guide. Apply the fixes below and it ships: every queer-owned claim, every rental price,
HI Seattle's bike policy, every Cascade route number, the ferry fare, Link/Metro, Amtrak Cascades,
Delta and Southwest all match their pages. Nine listings couldn't be fetched (bot walls / fetch
permission not answered) and are listed as such, not as passes.

## Script output

```
NODE_USE_ENV_PROXY=1 node tools/verify-town.js data/towns/seattle-wa.json
ok  data/towns/seattle-wa.json  (137 urls, 0 fails, 25 warnings)
  ! hotels[1..7] have no bike_policy (7) — renders "No stated policy — ask"; true to the pages
  ! routes[0..7] start has no lat/lon (8)
  ! listicle word in sources[28]: "eclectic" — the TREATS ride's name, in Cascade's URL
  ! 403/429 bot walls: tripadvisor ×2 (Roanoke Inn, Marination), cedarsseattle.com, expedia (Hotel Max),
    seattleartmuseum.org, aa.com ×2, portseattle.org/transportation/lyft, bookshop.org/shop/charlies
  · sources[69] ridebicycles.com/pages/bike-rentals → www.ridebicycles.com/articles/bike-rentals-pg233.htm (same shop; pass)
  · sources[115], [116] delta.com → ssp.delta.com sorry-server (fetcher only; WebFetch read both pages, see Passes)
1 town checked, 0 failed.
```

Grep for mental-health language and banned words: none. (The only "988" hits are "since 1988".)

## Fails

Blocking (rentals / ship):
- **bike_shops[6] evo Seattle** — note says "the page lists no repair service." The rentals page lists
  "Bike tune-ups & assembly" and "Bike repairs & adjustments" at the service/rental shop behind the main
  store. Source: evo.com/locations/seattle/services/bike-rentals. Fix: "The rental counter sits behind the
  outdoor store, with tune-ups, repairs and assembly at the same desk."
- **bike_shops[9] Ride Bicycles** — hours wrong. Page: "Mon - Fri: 10:00am - 6:00pm, Sat, Sun: 9:30am -
  5:00pm." JSON: "Weekdays 9:30 to 6, Saturday 9:30 to 5, Sunday 9:30 to 3." Source: ridebicycles.com
  bike-rentals page. Fix: "Weekdays 10 to 6, Saturday and Sunday 9:30 to 5."
- **bring_your_bike.ship.note** — "Métier's builds start at $895 and are for bikes it sells." The builds page
  says a tailored build ($295 sizing + $600 assembly) "can be from any manufacturer"; only the custom
  build ($1,200) is limited to Enve, Mosaic, Passoni and Sarto. Neither is a boxed-bike reassembly price.
  Source: metier.cc/pages/seattle-bicycle-builds. Fix: cut Métier from the build-fee sentence ("Two
  publish a build fee for a boxed bike: Mello Fellos … Cascade Bicycle Studio …") or reword to "Métier's
  tailored builds start at $895 for a frame from any maker, not a boxed-bike rebuild."

Non-blocking (ship with the fix):
- **bike_shops[0] Métier** — "The club's B2B ride" has no antecedent. metier.cc/pages/metier-group-rides
  calls B2B its own "weekly Saturday morning group ride," 38 mi / 2,400 ft, "You don't have to be a member
  to ride with us," schedule on its Strava club. Fix: "The shop's own B2B ride".
- **restaurants[2] Roanoke Inn** — "No website" is wrong: theroanokeinn.com is live ("Open 7 days a Week
  Except Thanksgiving and Christmas"). Hours there: Mon 3–10, Tue 11–10, Wed–Sat 11–midnight, Sun 11–10
  (JSON has Tuesday to midnight). Fix: `url` → https://theroanokeinn.com/, drop "No website" and the
  listing hedge, hours per the site, keep the phone (206) 232-0800 (matches).
- **restaurants[5] Big Time Brewery** — "Seattle's original" is unattributed. The brewery's blurb on the
  U District partnership listing (udistrictseattle.com/business/big-time-brewery-alehouse) reads
  "Seattle's original brew pub," opened December 8, 1988; bigtimebrewery.com refused the fetch. Fix:
  'calls itself "Seattle's original brew pub," since 1988'.
- **culture[6] Matthews Beach + riding[0] reference** — Seattle Parks' page says "Seattle's largest
  freshwater *bathing* beach," not "swimming beach." Fix: use Parks' word, "per Seattle Parks."
- **bring_your_bike.get_around.note** (and faq[2]) — "Stay with the bike on the car deck." WSF's bicycles
  page says you may leave the bike unattended during the sailing ("take all personal belongings … with
  you") and must not disembark without it. Fix: "You can leave the bike on the car deck during the
  crossing; take your bags, and don't get off without it."
- **bring_your_bike.get_around.note** — 2026 STP bus detail differs from Cascade's transportation page:
  the page gives *final* departures Sat 9:15 pm, Sun 7 pm, Mon 9:30 am (JSON: "Saturday at 8 pm, Sunday
  at 1 pm and Monday at 9 am"), and says "Monday bike truck service is unavailable; bikes must load
  Sunday" (JSON: bikes back "Monday 11 am to 7 pm"). Prices ($115 / $70 by July 5, standby $100 / $60,
  box $20 or $25, parking $20 cash preferred, STPCLASSIC through 8/12/2026) all match. Fix: cut the
  clock times to what faq[5] already says ("loading at the Portland finish Saturday night, Sunday
  afternoon and Monday morning") and drop the Monday bike-return window; it's all 2026 anyway.
- **restaurants[3], [4], [5]** — "Hours weren't re-read this run" is a research note on a public page
  (same family as the "this session" words the calendar build rejects). Fix: "Hours not confirmed since
  Sept 2026; check before you go."

## Passes (page fetched, claim on the page)

- Métier rentals — Caledonia (Ultegra Di2) / Soloist (Ultegra) $125, Tarmac SL8 / Aspero (Rival AXS) $175,
  10% off from four days, SPD / SPD-SL / Keo / flat, no helmets or shoes "for hygiene," full refund 72 h out.
  metier.cc/pages/bike-rental-seattle
- evo rentals — carbon road $100 / $500, MTB $130 / $650, e-MTB $150 / $750, hybrid $60, helmets included,
  damage cover $15 / $25, "Book Now & Save 20%," Mon–Sat 10–8, Sun 10–7, 1320 N 35th St, (206) 973-4470.
- Mello Fellos — road, gravel, city hybrid; helmet, lock, phone mount; no price; up to a week's rental
  credited on a bike bought within 30 days; 2151 6th Ave Via6, (206) 745-5501. Service: $130/hr, basic tune
  $125, build from box $190 ($250 e-bike). rental-pg233, service-pg229
- Ride Bicycles — MTB and e-MTB only, half day ≤4 h, helmet + flats/SPD + safety check, reservations
  required, 48 h cancel, under 280 lb with gear, no prices. (Hours: see Fails.)
- Montlake — "Electric, city, and mountain bikes from Giant and Cannondale" (homepage); rentals
  non-refundable, paid in full, government ID; Mon–Fri 10–6, Sat 9–5, Sun 10–4. (Service rates not on the
  pages fetched; the scout read them Oct 4.)
- Recycled Cycles rentals — online booking, insurance link, Tue–Fri 11–6, Sat 10–6.
- Bainbridge Bike Co — 124 Bjune Dr SE, (206) 842-6413, Wed–Fri 10–6, Sat 10–5, Sun 12–4, closed Mon–Tue,
  "just steps away from the ferry terminal," electric and non-electric rentals, no prices.
- Cascade Bicycle Studio — road/gravel tune ~$300, $150/hr, build from box $250 minimum, assessment by
  phone or in person, "a few days to turn around," Tue–Sat 10–6, 180 N Canal St, (206) 547-4900.
- Ship list empty — evo, Mello Fellos, Montlake, Recycled, Cascade Bicycle Studio, Métier: none of the pages
  fetched says it receives a shipped bike. Claim holds.
- **HI Seattle at the American Hotel bike_policy** — FAQ: "we have a bicycle storage in our basement and
  our front desk staff will escort you there when you need to store or grab your bike." Check-in 3 / out 11,
  luggage $5 per two bags, lot across the street, no Seattle-area residents (25 mi), 14-night max,
  520 S King St. All match.
- **Charlie's Queer Books `queer-owned`** — Bookshop storefront, the store's own words: "Charlie's is a
  trans-owned bookstore in Seattle that sells queer books of all genres." Quote exact. bookshop.org/shop/charlies
- The Wildrose — open, no closure notice; 1021 E Pike St; Sun 4–9, Mon closed, Tue 5–10, Wed 5–11, Thu 5–12,
  Fri–Sat 5–2; "Seattle's only lesbian bar and the oldest in the country … since 1984"; Pride June 26–28, 2026.
- Routes (Cascade pages): Burke-Gilman 18.8 mi Golden Gardens → 102nd Ave NE Bothell, "one of the first
  rails-to-trails in the country" (trails-bicyclists; `miles: 19` stands); North Lake loop 35 mi / 1,103 ft,
  "about 3 miles of traffic roads," Log Boom Park 17415 61st Ave NE (82922); Zoo Hill 9 mi / 1,452 ft,
  3–18%, "8 - 13% range," "you're either going up, or down," Lewis Creek Park 5808 Lakemont Blvd SE,
  water + bathrooms, Newport/164th/Lakemont add-ons (44024, 2018); Snoqualmie Valley 38 mi / 1,200 ft,
  "about 1/2 … gravel," ≥28mm, fenders when wet, Tolt MacDonald Park, mile 23 falls stop (82167); Chilly
  Hilly 2026 33 mi / 2,173 ft (JSON "about 2,150"), "Traffic officers are posted at highway crossings,"
  "Wear layers and be prepared for rain," two island shops named incl. Classic Cycle; midsummer ride 33 mi /
  2,166 ft, Colman Dock 801 Alaskan Way, Battle Point Park mile 14.4 (81550); West Seattle 12 mi / 444 ft,
  clockwise, "half-mile of well-maintained crushed rock trail," Seacrest 1660 Harbor Ave SW (83393);
  water-taxi ride "limited number of available bike racks" (87939).
- WSF fare (Oct 4, 2026): adult $11.35, senior/disability $5.65, 18 and under free, bicycle $1.00, passenger
  fares collected at Seattle. WSF bicycles: $1–4 by route, waived with multi-ride/ORCA except Anacortes /
  San Juan / Sidney, forward end of the car deck, arrive 20 minutes early, unload ahead of vehicles.
- Sound Transit Link: 84 × 23 in, 50 lb, free, first come, no bikes over double the seats, no escalators,
  e-bikes off, no charging, UL-certified; BikeLink lockers. King County Metro: three bikes on the front rack,
  any regular stop, most e-bikes too heavy / cargo too long, Water Taxi 10–26 racks by vessel.
- Amtrak Cascades: "Ten bike racks … on every Amtrak Cascades train," baggage car, $5 each, e-bikes under
  50 lb, boxing $15 + $10 handling except unstaffed stations, "trains fill up quickly" in summer.
- Delta: durable bike container, standard allowance and fees, excess-weight over 50 lb, refused over 115 in
  or 100 lb, limited release outside a hard shell, some Delta Connection carriers; $45 first / $55 second,
  US domestic Main, each way. Southwest: standard checked + overweight fees, oversize waived, refused over
  100 lb / 115 in, pedals and handlebars off, limited release for cardboard/soft; $45 / $55 booked on or
  after April 9, 2026, $100 (51–70 lb), $200 (71–100 lb).
- STP 2026: Sat Jul 11 5 am, UW E-18 lot; Bus & Bike $115, Bike-Only $70, box $25 by July 5 (overview);
  box $20, standby $100 / $60 cash, parking $20/day Fri–Mon cash preferred, STPCLASSIC 15% through 8/12/2026,
  Alaska "standard checked baggage with no additional fees," PBC bus as a registration add-on
  (transportation-details).

## Couldn't verify (fetch refused or bot-walled; not a pass, not a fail)

- RideWithGPS 10708345 (Lake loop 50 mi / 1,900 ft and its hazards), 10318567 (Mercer 16.5 mi / 1,000 ft,
  Roanoke, Lid Park, patrolled stop signs), 741387 (Chilly Hilly copy 32.8 mi / 2,290 ft) — WebFetch
  permission not answered; the script got 200 on all three. The scout read them Oct 3.
- King County Burke-Gilman page ("more than 20" miles, surface, Ballard on-road stretch, uses) — same.
- aa.com ×2 (American's fees and bike rule) — 403. Written as "read Oct 3, 2026."
- shultzys.com, portagebaycafe.com — permission not answered; cedarsseattle.com — 403. The four U District
  restaurants' hours stay unconfirmed, as the notes say.
- bigtimebrewery.com — refused; its blurb was read on the U District partnership listing instead.
- charliesqueerbooks.com — JavaScript-only (hours); ownership verified on Bookshop.
- Expedia (Hotel Max fee and "Bicycle storage"), seattleartmuseum.org (sculpture park hours),
  portseattle.org (ride-app pickup stalls) — bot walls.
- Sounder and ST Express limits (70 in / 3.25 in / 75 lb; 48 in wheelbase / 3.2 in / 75 lb) — not in the
  Sound Transit page extract; Link's numbers were.
- Alaska and United from their own pages — as the JSON already says.

## Stale

None. Town `verified` 2026-10-04; routes 2026-10-03. The Cascade ride pages behind Zoo Hill (2018),
Snoqualmie (2023), the midsummer Chilly Hilly (2023), North Lake (2024) and West Seattle (2024) are old
but the JSON says so where it matters; the roads haven't moved.

## Watch

- Cascade's 2027 STP lodging and transportation pages (every STP price and bus time is 2026; the
  BikeFlights code expired Aug 12, 2026 and the JSON says so).
- Chilly Hilly 2027 date (the 2026 page has none).
- Southwest's fee line is keyed to "booked on or after April 9, 2026"; Delta's fee page is undated.
- WSF fares are dated Oct 4, 2026; WSF reprices in October most years.
- Bike Works Open Shop's summer (May–Sept) Saturday swap; evo's and Pegasus's winter hours.
- Brevay WTFNB at Pacha: series page "No upcoming events scheduled" (last ride Sept 24, 2026) —
  rides re-check queue, slug `seattle-wa-wtfnb-weekly-with-brevay`.
- Burke-Gilman "Missing Link" in Ballard (SDOT page wouldn't open for anyone this week).
- The Wildrose's Pride dates roll each year; the note's "end of June" is safe.
- Montlake's rental/service pricing and Recycled Cycles' rental fleet live only inside booking widgets.
