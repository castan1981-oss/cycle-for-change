# tucson-az · town-editor · 2026-10-03 · Jobs 3 and 4

A refresh: `data/towns/tucson-az.json` went from an event-host page (verified
2026-09-15) to a destination guide. Every legacy field the El Tour page uses is
kept (name, state, lat/lon, timezone, summary, about, riding, getting_there,
hotels, restaurants, bike_shops, sources). `kind: destination`, `verified`
2026-10-03. Built into `CFC_OUT=…/scratchpad/out-tus` and read every page under
`towns/arizona/tucson/` plus `events/el-tour-de-tucson/`; nothing in
`cfc-site/` or `rides.json` was touched, and `tools/build-rides.js` was not run.

## Counts

routes 7 · coffee 6 (4 ride-out) · bike shops 6 (2 rent) · hotels 6 (1 bike
policy in writing, 5 to ask) · restaurants 8 · culture 6 · clubs 5 · faq 6 ·
travel_links 1 · bring_your_bike: 2 airports, 1 ship shop, 3 rental fleets ·
sources 189 (196 URLs in the file). 15 ride slugs named, all in rides.json.

## Decisions

- **Shops, 7 → 6: BICAS comes out of `bike_shops`, Ajo stays.** The shops list
  answers "who fixes or rents a bike." BICAS does neither for a visitor now (its
  tools page: "We don't fix your bike for you"; rentals are $8 coaster-brake
  town bikes), and it says it may close or pause. It keeps its place on the page
  under **clubs**, where the DIY stands, the Monday WTF workshop and the WTF
  ride belong (the LA guide puts Bicycle Kitchen there too). Ajo is thin but it
  is the one repair shop near TUS for a bike that arrives broken.
- **Tucson Queer Outdoors dropped** from clubs: its report shows a dated 2026
  hike (Tumamoc Hill, Oct 30), no dated bike outing. It sits under the leads
  below. Nothing on the page is `queer-owned`; IBT's is `bar` and says in its
  own words it is Tucson's gay bar. Antigone's founding history (1973,
  lesbian-owned, women-run) came from GayTucson and Local First Arizona, not
  the store, so it is out until the store's own About page is read.
- **GABA token swaps applied** as community.md asked: "easy social rides" →
  `tucson-az-gaba-tuesday-social-ride`, "the north-side NW rides" →
  `tucson-az-gaba-nw-social-rides`, club `ride_slug` moved to the NW rides.
- **Cross-references resolved:** Ren Coffeehouse (4300 N Campbell, Suite 24)
  sits in St. Philip's Plaza, one of the two GABA NW starts and the coffee after
  → `ride_out: true`, `ride_slug` NW rides. Bruegger's La Cañada carries both
  the Cactus Wednesday ride and the NW rides (`ride_slug` array). Transit
  Cycles gets `shop-rides` and `ride_slug` for its Third Thursday ride; Bicycle
  Ranch gets `ride_slug` for the Roundup. Mount Lemmon's description names
  LeBuzz (the lot Bike Mount Lemmon sends drivers to), Earlybird (same road),
  the summit food and GABA's May 7, 2027 hill climb (calendar row; no event
  page to link). Cactus Forest names the Cactus Friday ride and LeBuzz after.
  Gates Pass names the Desert Museum. The Loop names the Mercado trio (Presta,
  Seis, Transit), The Tuxon, the Heirloom market and GABA's Tuesday ride. The
  El Tour course names the DoubleTree and GABA's training rides. Pueblo Vida ↔
  AC Hotel (same block). Sweetwater ↔ SDMB trail days.
- **The Loop is `easy`, 54 mi, "Any length you want."** The scout graded it
  `hard` on the 53.9-mile distance rule. A flat, car-free path you can leave at
  any point is the easy ride; the meta line says 54 mi so nobody is misled.
- **Shootout numbers are mixed on purpose:** 70 mi is Fair Wheel's (the A and
  Scootout groups); 1,600 ft is from the 59.9-mile RideWithGPS version, the
  only page with a figure. The description says so.
- **Mount Lemmon: 6,750 ft** from the Strava segment and GABA's course (Bike
  Mount Lemmon's own FAQ says 6,276). Summit services carry no hours in the
  route note (Bike Mount Lemmon's hours are 2025). The Cookie Cabin's **coffee**
  entry keeps 11–5 from its own page (read Oct 3, 2026) and its own line "check
  Google Maps for closures."
- **Hotels in rider order:** The Tuxon (the Loop two blocks away, El Tour start
  0.7 mi, the only written bike line) → Hotel McCoy (cheap, one level,
  room-front parking) → DoubleTree (closest to the start) → Leo Kent → AC →
  Congress. `bike_policy` is `null` for five, The Tuxon's string for one; the
  build prints "No stated policy — ask when you book" itself. `price_hint` is
  the stay scout's Kayak snapshot of Oct 3, 2026 ($ <110, $$ 110–199, $$$
  200–299); McCoy moved $$ → $ and Congress $$ → $$$ from the Sept file.
- **URL calls:** theleokenthotel.com loads here (200), so `url` is the hotel's
  own site again and Marriott's overview page is `booking_url`. The AC Hotel
  `url` is Marriott's redirect target (`/en-us/hotels/tusad-ac-hotel-tucson-downtown/overview/`).
  Heirloom's `url` is its own site (heirloomfm.org, 200, title "Heirloom Farmers
  Markets") as the scout asked; the hours still cite Visit Tucson. Antigone's
  `url` stays the GayTucson listing: antigonebooks.com answers 403 and nobody
  read it. DoubleTree keeps hilton.com (403 bot wall; nobody read it — see
  below). Hotel McCoy's `url` loads now; `booking_url` stays null (the scout
  never opened the booking page).
- **Fair Wheel loses the `suspension` tag** the shop scout filed: nothing in its
  note or the pages named backs it. Everything else in its tag list is backed.
  Bicycle Ranch keeps `fitting` from the Sept 15 listing (its fitting page was
  refused this run).
- **Bicycle Ranch in the ship note, not the ship list**, with El Tour's shipping
  page as the source ($55 build, $90 with repacking, Oct 2026 for the Nov 21,
  2026 ride), and "call first" because the shop's own pages don't say it.
- **Airline lines lifted from the LA guide.** The logistics scout reached only
  American. Southwest, Delta and Alaska all fly TUS and Southwest is the one
  that matters, so their rules were lifted from `data/towns/los-angeles-ca.json`
  (read Sept 2026 from the airlines' own pages, URLs added to
  `bring_your_bike.sources` and `sources`), labelled in the text as "read Sept
  2026 … for our Los Angeles guide and not re-read for Tucson." The verifier
  fetched Southwest's pages clean; see the fails below for Alaska and Delta.
- **The Arizona statute lines stay.** The scout read ARS 28-812, 28-815 and
  28-819 with curl. `tools/verify-town.js` fetched all four azleg.gov pages with
  200 in this run, so the rule the main session set is met and the lines are in.
  28-819 also has Justia's copy (403 bot wall; the scout fetched it).
- **`car_needed: false`**, with the caveat written in: the car is for the
  airport leg with a case, the far trailheads and anyone who wants Saguaro
  East, Gates Pass or Madera Canyon daily without riding there first.
- **`covers[]`:** all five from the brief — Oro Valley (the Cactus Wednesday
  ride and GABA's NW start live there), Marana (the Loop reaches it; a TBR
  pickup point), Vail, Sahuarita, Green Valley (El Tour's course; Cactus B-ride
  starts). South Tucson was not added: FUGA's and Cyclovia's records say
  "Tucson" already.
- **Tagline** "Mount Lemmon, the car-free Loop, dry winter roads" (49 chars),
  `best_months` and the six **FAQ** were drafted by the editor from the reports;
  @seo-geo-editor has not run — mark them for its pass.
- **El Tour's RideWithGPS link stays on the 2025 route (51686479)** because the
  101.7 mi / 3,007 ft numbers are its. The organizer's 2026 route 55558194
  loads (200) but nobody has read its numbers; swap when someone does.
- Restaurants: all six kept with the eat scout's fixes (El Charro's history
  line, BOCA's dog patio, Seis "on the Loop", Tumerico's chef, Cup Cafe's hours
  and Barrio Bread's days all came out); 5 Points and El Güero Canelo added.
  Time Market and the Cookie Cabin were not cross-listed under restaurants
  (eight is the target's top; they are on the coffee page with hours).

## What's null, and why

- `hotels[].bike_policy` ×5 — no hotel but The Tuxon states one on its own page.
- `routes[].start.lat/lon` ×6 — only Sweetwater has a point (MTB Project).
  Mile 0's address is Bike Mount Lemmon's. The TCC's address was not re-fetched.
- `routes[1].elevation_gain_ft` (the Loop) and `routes[4]` (Cactus Forest) —
  no county or NPS page gives one.
- `water` on the Shootout, Gates Pass and Sweetwater; `start` on Gates Pass
  (the route pages give numbers, not the start).
- `hotels[].booking_url` for McCoy, DoubleTree, AC, Congress — none read.
- Tugo prices — tugobikeshare.com refused the scout twice.
- Fair Wheel's multi-day rates and Earlybird's prices — booking systems only.
- Cup Cafe's hours — not on its page.
- Hotel phones — not collected by the stay scout.
- No gravel route, no Madera Canyon, no north-zone route, no restaurant near
  Lemmon, Saguaro East, Oro Valley or Green Valley, no hotel near the climbs.

## Verifier — what to look at hardest

`node tools/verify-town.js data/towns/tucson-az.json`: 196 URLs, **3 fails, 29
warnings**, twice (before and after the read-through edits; the URL set did not
change). Every listing URL (routes, coffee, shops, hotels, restaurants, culture,
clubs, ship/rent shops, bike share) answered 2xx/3xx except hilton.com (403).

- The 3 fails are all live pages that refuse a script, kept on the LA
  precedent (its verify.md kept the same alaskaair 406s as "transient"):
  alaskaair.com ×2 answer **406 to the verifier's HEAD and 200 to a GET**
  (300 KB and 540 KB pages); hotels.com (Hotel McCoy's one-level, room-front
  parking, 10-minute walk and $80 lines) answers **503/000 to the script UA and
  429 to a browser UA** — Expedia Group's wall, same as the expedia.com and
  orbitz.com 429s. The stay scout read it on Oct 3.
- delta.com ×2 answer 200 but **redirect the verifier to Delta's "sorry server"**;
  a GET returns the real page ("Flying With Sports Equipment | Delta Air Lines").
- 403/429 walls kept because a scout fetched the page this run: seiskitchen.com,
  elguerocanelo.com, ihg.com (Tuxon booking), aa.com ×2, law.justia.com,
  bikeaz.org, expedia ×3, orbitz, tripadvisor ×4, trivago, pinkbike, rome2rio
  (Sept 15 source for the PHX distance).
- **hilton.com (DoubleTree `url`) is a 403 that nobody fetched** — the stay
  scout was refused, the verifier is walled. The address and facts come from
  Expedia, Kayak and Tripadvisor. Open it in a browser; if the hotel has a bike
  line, it changes the strip count.
- Re-read by hand, in this order: (1) the lifted Southwest / Delta / Alaska
  lines against the airlines' pages, with an Oct 2026 date if they hold;
  (2) ARS 28-812 and 28-815 (curl-read by the scout, no second copy);
  (3) The Tuxon's "secure storage" — where (Bike Shed? a room?) and the two
  phone numbers (520-372-8253 vs 520-372-2853); (4) Bicycle Ranch receiving
  shipped bikes — call 520-219-4311; (5) Hotel Congress: elevator or stairs
  only; (6) Antigone's hours on its own site (GayTucson: Tue–Sat 10–5, Sun
  11–4; NewPages differs); (7) Heirloom's winter/summer switch date and the
  address on heirloomfm.org; (8) Cup Cafe's hours; (9) Fair Wheel's 6th Street
  store hours (only "closed Sundays" is on the rental pages); (10) the Starbucks
  at University and Euclid that UA Cycling names as the Shootout meet — a 2026
  Yelp title says closed; if so, where the Shootout gathers for coffee is
  unknown (Time Market is the confirmed door on the street); (11) Mount Lemmon's
  gain: 6,774 (segment, GABA course) vs 6,276 (Bike Mount Lemmon FAQ);
  (12) the UA cycling team's Gates Pass / Kinney Road hazard lines are dated
  2020; (13) the distances in shop and coffee notes are straight-line estimates
  from approximate points — recompute from geocoded addresses.

## Rides re-check (for @ride-verifier through tools/rides-apply.js — not this file)

rides.json is the record and the guide does not contradict it; these are the
scouts' flags:

- `tucson-az-the-shootout`: the point (32.2627, −110.9495) is about 2.1 miles
  from University & Euclid (Fair Wheel; the TNR's Old Main point is 32.232,
  −110.9534). The town page prints "3 mi out" for a ride that starts a mile
  from downtown.
- `tucson-az-bicas-wtf-ride`: BICAS's WTF Events page (changed May 10, 2026)
  now says gather 6:30 pm, roll at 7, 5 to 10 miles, no-drop. The record has
  `start_hhmm` 19:00 and `time_local` null (renders 7:00 pm). Source
  https://bicas.org/wtf-events/.
- `tucson-az-womens-shootout`: Transit Cycles' events page gives 6 am (6:15
  seasonally) from the Mercado; the record carries Fair Wheel's 6:45 / 7:15 /
  7:45 table. Ask the ride, not the shops.
- `tucson-az-bicycle-ranch-saturday-roundup`: the shop page still gives no
  meeting point beyond the shop's address.
- `tucson-az-gaba-nw-social-rides`: the Bruegger's start is "the lot south of
  Bruegger's, 11143 N La Cañada Dr, Oro Valley"; Bruegger's own page says 11165
  N La Canada Dr, Suite 161, Tucson 85737. The coffee entry uses Bruegger's.
- `tucson-az-tuesday-morning-fast-ride` / `the-shootout`: both carry the
  Oct 10 → 7:00 and Nov 14 → 7:30 tables; the Shootout shows 7:00 and TMFR
  6:30 on the town page today because TMFR's next ride (Oct 6) is before the
  change. Correct, just worth knowing when reading the page.

## Leads not used (next run)

Routes: Madera Canyon (enduranceWERX RWGPS 6933322; Cactus's October list);
a gravel route (Redington Pass 32285634 / 58176, Green Valley Box Canyon
27099226, the Control Road — closed Dec 15 to Mar 15 per mtlemmon.com);
Oro Valley / Catalina State Park / Tortolita (UA's Strava routes are login-only;
Cactus's four Wednesday loops); TBD's RWGPS routes 1452187 (the Shootout's
own), 41659454 (Gates Pass from the AC Hotel), 38035607 (Lemmon from LeBuzz);
the 100-Acre Wood Bike Park (opens Oct 19, 2026). Shops: Campfire Cycling (15 E
Toole, downtown, a few blocks from the El Tour start; repair pages refused),
Hello Bicycle + Cafe (3702 E Hardy Dr, on the Loop; also Old Pueblo Suspension
Works), Ben's Bikes (Rita Ranch, the Saguaro East side), Sabino Cycles.
Coffee/eat: Decibel Coffee Works and La Estrella Bakery (Mercado), Elevated
Espresso (Summerhaven), Sawmill Run (the sit-down meal on Lemmon), Saguaro
Corners (El Tour course), La Herradura (the Cactus Friday meet), Pub 1922
(Sahuarita), Westbound (MSA Annex, the Third Thursday pre-ride), Tucson Hop
Shop (the bar on the Rillito with racks and loaner locks). Stay: nothing near
the climbs — Loews Ventana Canyon, Comfort Suites at Sabino Canyon, El
Conquistador, Westin La Paloma, JW Marriott Starr Pass; Loop-side Homewood
Suites (Campbell and River), Hilton Tucson East; near the Shootout start,
Graduate Tucson and Marriott University Park; The Alice Hotel ($89 El Tour
block). Culture: Homeward Books (worker-owned, queer and BIPOC focus, no
address found), Old Paint and Hurricane Records, The Loft Cinema, Club
Congress. Clubs under couldn't-confirm: Tucson Queer Outdoors (LGBTQ+, hikes,
no dated 2026 ride), RAR Tucson (FTWN-B and BIPOC, gravel and bikepacking; page
last changed Jan 2025, Instagram only), Tucson Sundaze Ride (Strava club;
Transit's page says Sun 7 am, Highland Underpass), Dragonfly Rides' Full Moon
Ride, Tucson Velo (empty calendar), Tucson Women Shredders, Saddlebrooke
Cyclemasters. Calendar hand-offs from community.md (not mine to add): El Grupo
Fall Fondo (Nov 8, 2026), GABA Bike Swap (Nov 15, 2026), Zia Old Tucson 10'er
(Jan 16, 2027).

## Open questions for Robert

1. BICAS out of the shops list and kept under clubs — fine? (It says it may
   close; the phone is in the note.)
2. `bike_policy`: `null` here, the "No stated policy — ask when you book" string
   in LA. The build treats both the same. Pick one for every town.
3. Lifting another town's airline lines (dated, labelled) when a town's scout
   can't reach the airline — keep doing it, or leave the airline_note thin?
4. `car_needed: false` for Tucson. The logistics scout and I read it that way for
   a rider staying central; say if you want the Lemmon-and-Saguaro-every-day
   rider to be the default instead.
5. The Loop graded `easy` at 54 miles with "Any length you want" — or `moderate`?
6. The DoubleTree's hilton.com link stays as the hotel's own page although our
   tools can't open it. Swap to a booking-site page, or keep?
7. The hotel order on the guide puts The Tuxon first; the El Tour event strip
   only counts, so the event page is unchanged. OK?
8. @voice-editor and @seo-geo-editor have not passed over this file; tagline,
   best_months and faq are the editor's drafts.
