# palm-springs-ca · town-verifier · 2026-10-04

**Ships** — once the editor applies the five non-blocking fixes below. No fail in `queer-owned`,
ship-to-shop, rentals, routes or bike policy. Every rental shop, the ship-to-shop shop, Hunters'
wording, every route's miles and feet, the toll-gate rule, CV Link's segments, SunLine's rules,
Delta's fee and the California law lines were re-fetched and match their pages. The fails are
prose: one wrong claim about Monday hours, one count, one inconsistency, research asides that
reached the copy, and two unsourced hazard sentences.

## Script output

```
NODE_USE_ENV_PROXY=1 node tools/verify-town.js data/towns/palm-springs-ca.json
ok  data/towns/palm-springs-ca.json  (163 urls, 0 fails, 23 warnings)
  ! hotels[0..5] have no bike_policy (×6) — true: no hotel page says a word about a guest's bike
  ! routes[0,1,3,4,6,7,8] start has no lat/lon (×7)
  ! listicle word in culture[6].note: "Iconic" — a shop's name (Iconic Atomic), allowed
  ! 403 bot walls: lulupalmsprings.com, hyatt.com, palmspringsca.gov (swim center),
    aa.com ×2, storeopeninghours.com, tripadvisor.com ×3 — verify by hand
  · redirects: theshopsat1345.com → www; delta.com ×2 → Delta's "sorry server"
    (the pages loaded fine through WebFetch today, see Passes); tourdepalmsprings.com www → bare
1 town checked, 0 failed.
```

Greps: no mental-health language; no banned word or phrase (leverage, synergy, journey,
passionate, thrilled, excited to share, $800, Prescott, est. 2008, sober-time, 7,500); "hidden
gem" / "must-visit" / "vibrant" absent; `pdbikenbrews.com` absent (every Bike N Brews URL is
`pdbikesnbrew.com`). All five `{ride:…}` slugs exist once in `cfc-site/rides/rides.json`.

## Fails (all non-blocking — ship with the fix applied)

1. **bike_shops[4] Trek Bicycle Palm Desert** — "The one shop in the valley open on a Monday"
   is false in the file itself: Trek Palm Springs is Monday–Saturday 9–5 (its page, fetched
   today) and Village Peddler is open Monday (closed Sunday and Wednesday, its rates page).
   Trek Palm Desert's own hours do check out (Mon 12–5, Tue–Sat 10–6, closed Sun). **Reword:**
   "Open Monday noon to 5, when Tri-A-Bike and Bike N Brews are closed; Tuesday to Saturday
   10 to 6; closed Sunday."
2. **routes[2].description vs coffee[0].note / riding[1] / clubs[0]** — the Vista Point is
   "mile 8.4" in the PJAMM sentence and "mile 8.5" in the Sunday Climbers sentences. Both are
   true to their sources (PJAMM page: 8.4; the club's event page: 8.5), but a reader sees two
   numbers for one lot. **Fix:** keep 8.4 in the PJAMM sentence; in the club sentences write
   "the Vista Point" with no mile (routes[2].description, coffee[0].note, riding[1]).
3. **Research asides in page copy** — "the airport's own site did not load" (`getting_there`,
   `bring_your_bike.fly.airports[0].note`), "the airport's own ground-transport page did not
   load" (`get_around.note`), "their pages did not load this run" (`airline_note`, about Alaska
   and Southwest), "its own site didn't open, so confirm" (`restaurants[5]` Taqueria
   Tlaquepaque). These are notes to the editor, not to a rider. **Reword:** drop the aside and
   keep the attribution that remains, e.g. "(Wikipedia, Oct 2026)", "(a flight-search page,
   Oct 2026)", "Alaska and Southwest: read their pages before you book; on Sept 30, 2026 both
   checked a bike in a case as a standard bag", "hours from its Tripadvisor listing (reviews to
   Sept 2026); confirm by phone". I could not fetch palmspringsairport.com either (fetch
   refused, see Couldn't verify), so there is no airport fact to swap in — just cut the aside.
4. **travel_links[0] Tour hotel list** — "The Tour's own list of 19 Palm Springs hotels": the
   page lists 21 (11 under 1 mile, 2 under 2, 5 under 3, 1 under 5, fetched today). **Fix:**
   "21" or drop the number. The groupings, the Caliente Tropics (under 2) and Ace (under 3)
   placements, the Parker's absence and both quotes match.
5. **routes[1].hazards Tramway Road** — "Descents pass 50 mph. Rattlesnakes and bighorn sheep
   on and beside the road." Neither sentence is on PJAMM, myCols or the Palm Springs Life
   page, and routes.md gives no source for them. **Fix:** cut both, or the scout names the
   page.

Also not a fail but worth a word: `culture[0].note` "snow in February" is fine — the visitor
bureau's guide says the Tramway "typically sees snowfall from November through April". The
`best_months` and FAQ heat lines are all on their cited pages (see Passes).

## Passes (fetched today unless dated)

**Ship-to-shop**
- Tri-A-Bike — triabike.com/articles/bike-service-repair-pg184.htm: "You can ship your bike
  to us", recommends bikeflights.com, unbox/assemble $150, box to ship $100–150, delivery to
  Palm Springs $50, check & adjust $95, tune $150, overhaul $225, tube $20 "within 24 hours
  during our busy times", 30-day guarantee, Tue–Sat 10–4, closed Sun–Mon, 44841 San Pablo,
  (760) 340-2840. Home page: "Winter Hours Resume October 19th", "more than 38 years" (the
  "since 1987" line holds). Every number in `bike_shops[0]`, `ship.note`, `ship.shops[0]`,
  `summary`, `bring_your_bike.summary` and `faq[0]` matches.

**Rentals (every store)**
- Tri-A-Bike — bike-rentals-pg183.htm: Cannondale/Giant road 105 $75/$200, carbon $100/$300,
  Di2 $124/$350, MTB (Giant Stance 2 / Cannondale Habit) $80/$250; helmet + lock, road bikes
  get a tool kit; delivery $25 PD, $35 RM/IW/CC, $50 PS/LQ/Indio; two-day minimum on Tour
  weekend. Matches. (The minimum is written for "February 7–8, 2026" — see Watch.)
- Big Wheel Bikes CV, Palm Springs — bwbtours.com/palm-springs-bike-rentals/: KHS Flite 720
  $105/$250/$350, KHS Flite Team and full-suspension $80/$195/$295; lock + helmet, repair kits;
  $50 delivery; 24-hour cancellation or 25%; Tour two-day minimum; 1590 S Palm Canyon, 760.548.0500
  ext 1. bigwheelbikescv.com/locations/ still reads "Closed for summer until August 31st" with
  no winter hours, so the note's "call" is right. Matches, except the Di2 / hydraulic-disc spec
  (see Couldn't verify).
- Big Wheel Bikes CV, Palm Desert — bwbtours.com/palm-desert-bike-rentals/: Ritte Esprit Rival
  (SRAM, aluminum wheels) $105/$250/$350; Esprit Force (SRAM, deep carbon wheels)
  $125/$295/$395; clip-in or flat pedals; $50 delivery; 74200 Hwy 111, 760.779.1837 ext 2.
  Matches. Store hours on the locations page: Wed–Sat 10–5 (summer hours).
- Palm Desert Bike N Brews — pdbikesnbrew.com/articles/bike-rentals-pg233.htm: carbon road
  $140/$300/$400, aluminum $100/$190/$300, carbon full-suspension $125/day; helmet + lock;
  walk-ins taken, reserve ahead; Palm Springs delivery $100 up to 5 bikes; Tue–Sat 9–5, closed
  Sun–Mon; 73865 CA-111; 760-340-3861. Matches. Service page (pg229): basic $150, major $200,
  deluxe $399, tube $10, true $15–25, bleed $30, fork $150–225, shock $150–200, boxing
  $100–150, nothing about receiving a shipped bike. Matches.
- Village Peddler — villagepeddlerlq.com/bike-rental-rates/: $40 full day, 9–4 closed Sunday
  and Wednesday, service by appointment, 50855 Washington St #2D, (760) 777-7433. Matches.
  The page names no bike types, so "hybrids and cruisers" rests on the scout's read of the
  /bike-rental/ page (not re-fetched); "summer hours vary" is not on the rates page.

**Queer-owned**
- Hunters — hunterspalmsprings.com/…about: "LGBTQ+ owned, inclusive and welcoming", "Founded
  in 1998" by Mark Hunter Seymour, open daily 10 a.m.–2 a.m., 302 E Arenas Rd, (760) 323-0700,
  patio, dance floor, DJs, drag, bingo, karaoke, watch parties. The note quotes the page
  exactly. Pass.

**Routes (every one)**
- Highway 74 — pjammcycling.com/climb/1611.Hwy-74-East: 13.9 mi, 3,677 ft, 5.1% avg, 8.3%
  steepest quarter mile, forest boundary mile 3.6, hairpins miles 4.5–8, Vista Point mile 8.4
  (16-vehicle lot), finish 3,955 ft, "high and fast traffic aversion should avoid this climb",
  rider abandoned Apr 2, 2023 for traffic, June–Sept highs 102–108 °F, "do not begin this
  climb any time after sunrise in between June–September". Club event page: Sunday 7:30,
  Starbucks 73030 El Paseo, regroups Art Smith (mile 4) and Vista Point (mile 8.5), "ride at
  your own pace", "narrow winding road with no bike lane after mile 4". All match (shown as
  14 mi / 3,700 ft).
- Tramway Road — PJAMM: 3.8 mi, 1,918 ft, 9.5%, Tour of California Stage 2 finish May 13,
  2013, rider comment: gated entry, "you can only ride your bike to the 'toll booth'". myCols:
  5.7 km, 490 m, 8.8%, max 13.9%, "Since 2014 bicyclist are no longer allowed to ride past the
  ticket/toll booth." Palm Springs Life (Mar 2019, updated May 6, 2024): cyclists prohibited
  past the tollgate about half a mile from the top, "19 percent grade at the top", 3.8 mi,
  1,900+ ft. RWGPS 11063650: 29.8 km (18.5 mi), 693 m, climbs Tramway, "paved & separated
  bike trail beside the road". Shown as 4 mi / 1,900 ft; toll-gate rule holds on three pages.
- Tour de Palm Springs century — RWGPS 933811: 101.4 mi, 3,161 ft. tourdepalmsprings.com
  /event-info/routes/: start/finish "South Palm Canyon at Tahquitz", routes 101/88/77/64/32/16,
  "When feasible … routed on the CVLink", "Additional detailed routes and maps to come",
  "SUBJECT TO CHANGES/MODIFICATIONS BY HOST CITIES". FAQ: Feb 5–6, 2027, century 6:30, 16-mile
  9:30, packet pickup Fri noon–8, Sat 6–10 a.m., Feb highs 60–70 lows 50–55, helmet sticker
  for SAG, recumbents/e-bikes/trikes allowed, Tri-A-Bike and Big Wheel named, 4 water, 3
  lunch, 2 snack stops. All match.
- CV Link — coachellavalleylink.com/maps/: 19.63 mi Visitor Center → Date Palm Dr; 5.44 mi
  Bump n' Grind → Cook St; 16.02 mi Washington St → Airport Blvd; restrooms at the six places
  named; "open for use day or night"; construction zones on the interactive map. FAQ: bikes
  and e-bikes 20 mph, scooters 15, LSEVs/golf carts 20, no posted hours, solar LED lights in
  the path. City gaps page: Rancho Mirage (excluded from the 2017 EIR) and Indian Wells
  (Measure H, 2016) are the gaps; Desert Hot Springs too. CV Independent (Apr 16, 2026):
  early morning or evening in the hot months, windproof neck gaiter, 24 hours year-round,
  decomposed-granite path alongside. Shown as 20 mi. Match.
- Midcentury Modern loop — velopalmsprings.com: 7.86 mi, mostly flat with one short climb,
  start at the A+D Center 300 S Palm Canyon, the streets and landmarks as listed, ride early
  for less traffic on Palm Canyon, metered street parking + Civic Center structure. Match.
- Gerald Ford / Tamarisk / Country Club loop and Box Canyon — triabike.com local-rides page:
  "14+ miles", easy, moderate uphill on Portola and Gerald Ford to Monterey, Trojan Plaza
  alternate start; Box Canyon from 66 Ave and Johnson Rd to Pinto Rd/I-10, 19.5 mi one way,
  1,590 ft, advanced, 39-mile return or shuttle; La Quinta ride 20 mi to "Old Town Coffee shop
  at 78100 Main St"; fun ride Saturdays 10:30, from October 2026, all bikes. Match.
- Park Boulevard and Geology Tour Road — velopalmsprings.com JT guide: ~25 mi West to North
  entrance, moderate rolling hills; Keys View Road ~5 mi; $15 for seven days; window roughly
  October–April; summer "regularly exceed 100°F", "reached as high as 124°F"; water only at
  entrances and a handful of campgrounds; no bike lanes, most roads lack a shoulder; no shade;
  unreliable cell service; Geology Tour Road ~18-mile dirt out-and-back; bikes allowed on all
  roads open to cars. Match.

**Logistics**
- SunLine bikes-on-board: every SunBus has a rack, no extra fare, 69.5 in / 29 in bars /
  28 in wheels, folding bikes inside only if luggage-sized, "not responsible", nothing on
  e-bikes or weight. Fares: $1 one way, $3 day pass, exact cash or Token Transit. Match.
- Delta sporting-equipment page (loaded today through WebFetch, not the sorry server):
  non-motorized touring or single-seat racing bike in a bike container at standard bag fees,
  50 lb+ overweight, refused at 100 lb or 115 linear inches, hard case no release / soft bag
  signs a limited release, some Delta Connection carriers exclude. Overview page: first bag
  $45, second $55, 50 lb, US domestic Main Cabin. Match.
- California Vehicle Code 21760 (public.law, current through Sept 28, 2026): three feet,
  lane change when available, slow when not, $35 / $220. CalBike (modified Aug 24, 2026):
  helmets under 18 (21212), three e-bike classes with class 3 at 28 mph / 16+ / helmet,
  21202 exceptions, 21206 local sidewalk rule, 21456 walk signal incl. leading pedestrian
  interval, no stop-as-yield. Match.
- Trek Palm Springs: Mon–Sat 9–5, closed Sun, 611 S Palm Canyon Ste 24, 760-325-9319, Level
  One $99.99 / Two $189.99 / Three from $449.99, shipping box $79.99, 24-hour turnaround, free
  bike checks, pick-up and drop-off, group rides and clinics, no rentals. Match.
- Trek Palm Desert: hours and prices as in the note; the "only Monday shop" line is Fail 1.

**Coffee / eat / stay / culture sample**
- Coffee Bean El Paseo: 73400 El Paseo Dr, Mon–Fri 5:30–7, Sat–Sun 6–7. Match.
- Koffi Rancho Mirage: 71-380 Hwy 111, 6:30–5:30 daily, home of the roastery, three blocks
  west of The River. Match.
- Townie Bagels: 650 E Sunny Dunes, 6:30–noon, closed Tuesday, water-boiled bagels. Match
  (the home page doesn't itemise breakfast sandwiches or cold brew; minor).
- Ace Hotel survival guide: "We've got bikes. They're free, first come, first served." Nothing
  on bringing your own. Match; `bike_policy: null` is correct for all six hotels.
- Tour lodging page: groupings and quotes match; the hotel count is Fail 4.
- Aerial Tramway: tickets page $36.95 incl. $2 online fee; winter Oct 5, 2026 – May 27, 2027,
  first car 10 a.m. weekdays / 8 a.m. weekends, last up 8, last down 9:30. Visitor guide:
  8,516 ft, ~10 minutes, snow November–April, parking $15, ~one month maintenance usually
  September. Match.

## Stale

None. Every `verified` is 2026-10-03 or 2026-10-04.

## Couldn't verify

- **palmspringsairport.com** — WebFetch refused (permission not granted). The airport's
  address, airlines, rental-car wing and SunLine routes stay on Wikipedia and a flight-search
  page, as the file says; see Fail 3 for the wording.
- **pstramway.com visit page** (the Tramway's own rule on bikes at the toll gate) — WebFetch
  refused. The rule stands on three third-party pages, one updated May 2024.
- **Starbucks, 73030 El Paseo hours** — both listings the scout used answer 403; the store's
  own page was not fetched. `hours_hint: null` and "check" in the note are the right call.
  The club's 7:30 Sunday start is confirmed on its event page.
- **KHS Flite 720 "with Di2 and hydraulic discs"** (`bike_shops[1]`, `rent.shops[0]`, and
  "two of them with Di2" in `rent.note`) — neither bwbtours.com nor bigwheelbikescv.com
  /rentals/ names the groupset or brakes. KHS's own spec for the Flite 720 is Ultegra Di2
  with hydraulic discs, but that isn't on the shop's page. Keep if the shop scout fetched a
  KHS page; otherwise soften to "a carbon KHS Flite 720" and "one of them with Di2 (Tri-A-Bike)".
- **Village Peddler "hybrids and cruisers" / "summer hours vary"** — not on the rates page
  fetched; the /bike-rental/ page was not re-fetched.
- 403 bot walls from the script (Lulu, Hyatt, the city swim-center page, aa.com ×2,
  Tripadvisor ×3, storeopeninghours) — kept on the scouts' reads this week; the editor can
  check Lulu's and the swim center's hours by hand before the quarterly refresh.

## Watch

- **Tour weekend rental minimums** — Tri-A-Bike's page states the two-day minimum for
  "February 7–8, 2026"; Big Wheel's is undated. Re-read both once the shops post 2027 terms,
  and consider "as posted for the 2026 Tour" in the note until then.
- **Tri-A-Bike winter hours** resume Oct 19, 2026 (unposted). **Big Wheel Palm Springs** still
  shows "closed for summer until August 31st" with no winter hours; Big Wheel Palm Desert shows
  summer hours Wed–Sat 10–5.
- **Tour de Palm Springs 2027 maps** — "to come" on the routes page today; re-read `about[1]`,
  `routes[3]` and `getting_there` when they post (the RWGPS 933811 line may not be the course).
- **Aerial Tramway winter hours** run Oct 5, 2026 – May 27, 2027; the September maintenance
  closure is outside the riding season.
- **CV Link construction** — CVAG's maps page points to the interactive map for current zones;
  the Nov 2025 Sunrise Way / Tahquitz Creek work in `routes[0].hazards` needs a re-check at
  the quarterly refresh (coachellavalleylink.com/updates was not fetched).
- **Delta** — delta.com answers the script's fetch with a "sorry server" redirect but loads
  through WebFetch; the bag-fee page carries no "as of" date, so the "(Oct 2026)" stamp is the
  date we read it.
- **Desert Bicycle Club** C rides start in November; the weekday A/B rides from Coffee Bean are
  on the club calendar but not in the directory (held by the per-host cap).
