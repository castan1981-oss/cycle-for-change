# phoenix-az — verify

@town-verifier · 2026-10-04 · **does not ship** — one rentals fail: the Bike Emporium inclusions line says pedals and a flat kit come with every rental; the shop's page says that only for road and mountain bikes. A one-line reword in four strings, then it ships. Everything else below is a non-blocking fix or a watch.

Method: `NODE_USE_ENV_PROXY=1 node tools/verify-town.js data/towns/phoenix-az.json`, then WebFetch on every rental shop, the queer-owned entry, every route page, the City of Phoenix heat and South Mountain pages, American's two bag pages, and at least one in five of coffee, restaurants, hotels, culture and clubs — plus every flag in voice.md and editor-notes.md. WebSearch was off. A URL whose permission request timed out is listed under "Couldn't verify" and was not fetched another way. No JSON edited.

## Script output

```
ok  data/towns/phoenix-az.json  (193 urls, 0 fails, 37 warnings)
  6 × hotels[n] has no bike_policy — say "No stated policy — ask" if that's the truth   (the build prints that line itself; all six hotels really have none in writing)
  7 × routes[n] start has no lat/lon   (0,1,3,4,5,6,7 — only Gainey carries a start)
  24 × answered 403 (bot wall) — verify by hand: hyatt.com ×8, changinghands.com ×5, tripadvisor.com ×3, aa.com ×2, trailforks, trivago, reservationdesk, phoenixmag, bookshop.org, axios
  · sources[86] redirects to https://www.lostaquitosaz.com/
  · sources[166] redirects to https://www.rustyspoke.org/
1 town checked, 0 failed.
```

Of the 24 bot-walled URLs, WebFetch read aa.com ×2, hyatt.com (Grand Hyatt main + FAQ, Mission Palms main) this run; see Passes. The rest stay unread (see Couldn't verify).

## Fails

**Blocks shipping**

- **rentals · Bike Emporium · inclusions.** `bike_shops[0].note` and `rent.shops[0].note` say "Pedals, helmet, lock, cage and flat kit come with every rental" / "Helmet, lock, cage, pedals and flat kit included"; `faq[3].a` says "pedals, helmet, lock and flat kit included"; `rent.note` says "Pedals, helmet and flat kit included" (no lock, no cage). The shop's page (bikeemporium.com/rentals) says, verbatim: "Helmets, Water Bottle Cage and locks are included with each rental." and "Pedals and repair kits are also included for any road or mountain bike rental." Nothing says pedals or a kit come with the gravel bike. Fix, in all four strings: "Helmet, lock and bottle cage with every rental; pedals and a repair kit with the road and mountain bikes (the page doesn't say so for the gravel bike)." Source: https://www.bikeemporium.com/rentals

**Does not block — apply before or after**

- **routes[0] · South Mountain · water.** `water` is null and the hazards line says "No city page names a water stop on the climb, so bring all of it." True of the city, but the route page does: PJAMM says "There is a vending machine, restrooms, and a water fountain at the ranger station (start of the climb) but no facilities otherwise." Fix: `water` = "A water fountain, restrooms and a vending machine at the ranger station at the start (PJAMM); nothing on the climb." Trim the hazards sentence to "Nothing on the climb; fill at the ranger station." This also answers the editor's open question 3. Source: https://pjammcycling.com/climb/1812.South-Mountain
- **hotels[0] · Sonesta · fee and rate.** The hotel's own page says the destination fee is "$30 + tax per night" (parking, Wi-Fi, social hour, fitness). The note's "$34.21 nightly destination fee" is hotels.com's taxed figure, from a URL that was pruned as unreachable; the "$159 for Sunday, Oct 25" rate could not be read anywhere. Fix: "$30 plus tax a night destination fee that includes parking (the hotel's page, Oct 2026)"; cut the $159 or keep it as "about $159 on hotels.com for a late-October Sunday (read Oct 3, 2026)". `phone` can be filled: (480) 922-6969 (same page). Source: https://www.sonesta.com/sonesta-hotels-resorts/az/scottsdale/sonesta-suites-scottsdale-gainey-ranch
- **hotels[2] · Hampton Inn · rates.** "$100 to $139 … $417 for Saturday, Nov 7" rests on trivago (403 every run; not read here). The hotel's own page shows no rate. Keep only if the editor is happy with a dated third-party number; otherwise cut to "No rate shown (Oct 2026)". Phone available: (480) 941-3441. Source: https://www.hilton.com/en/hotels/phxsuhx-hampton-suites-phoenix-tempe/
- **routes[7] · Competitive Track · "15-mile".** The county's biking page says 15 miles; the county's own PDF map says "Total tread length is 13.7 miles." The loops (7.9 / 3.0 / 2.7) match both. Fix: say "the county's Competitive Track (15 miles by its web page, 13.7 by its map)" or drop the total. Sources: https://www.maricopacountyparks.net/park-locator/mcdowell-mountain-regional-park/park-activities/biking/ · the PDF
- **routes[4] · Indian Bend Wash · hazards.** TrailLink adds one the line doesn't have: "watch for flying golf balls when you pass the tee-boxes." Add it. Source: https://www.traillink.com/trail/indian-bend-wash-trail
- **hotels[4] · Phoenix Hostel · light rail.** The page says "One mile walk to the Light Rail Station at Central and Roosevelt"; the note says "you can walk to the light rail." Say "a mile's walk". Source: https://www.phxhostel.org/

## Passes

**Rentals (all four)**
- Bike Emporium — rentals page: 2023 Cannondale SuperSix EVO carbon, Shimano 105, 48–61 cm, $90/24 h ✓; "2024 Marin Kentfield 1 Gravel Bikes — aluminum frame, 700C wheels, Shimano 7-speed drivetrain, $60/24 hour, 49/52/54/56/59 cm" ✓ (the shop's own word is "Gravel", so the guide's wording is the shop's; Marin sells it as a fitness bike and the 7-speed caveat already tells the rider); 2023 Cannondale Habit S–XL $85 ✓; $50 non-refundable deposit for road/MTB/gravel ✓; "WE DO NOT OFFER ANY E-BIKES" ✓; address 8443 E. McDonald Dr., 85250 ✓; (480) 991-5430 ✓. Service page: "We can build your bike that you purchased from another retailer" and "Professionally Boxing Bikes for Shipping", no prices, nothing about receiving a shipment ✓. Hours not on the home, rentals or service page (see Couldn't verify).
- McDowell Mountain Cycles — bike-rentals page: road, gravel, mountain, e-bikes ✓; no prices ✓; "Helmets and pedals are included. We have a limited number of clip-less pedals" ✓; flat pack, charged if used ✓; ID at pick-up ✓; $25 cancellation ✓; rack $40/reservation ✓; delivery Fountain Hills + McDowell Mountain Regional Park, up to 4 bikes ✓; Mon–Fri 8–5, Sat 8–4, Sun closed ✓; 11879 N. Saguaro Blvd. ✓; (480) 272-8741 ✓.
- Bike Barn — rentals page: "road, mountain, or city bike", booking system link, no prices/sizes ✓; Mon closed, Tue–Sat 9–5, Sun 11–4 ✓; 4112 N 36th St 85018 ✓; (602) 956-3870 ✓.
- Airpark Bike Co — MTB rental page: Santa Cruz, Yeti, Rocky Mountain ✓; prices in the online listing only ✓; photo ID + matching card ✓; pick up at the Scottsdale store, 15745 Hayden Rd Suite 117 ✓; "You'll need a way to transport the bike, such as a hitch rack" ✓; 480-596-6633 ✓. Hours not on this page (see Couldn't verify).

**Queer-owned**
- Boycott Bar — home page: "Arizona's last lesbian-owned bar and one of the only latina-led queer venues in the country" ✓; About page: "proudly LGBTQ+ owned & operated" ✓; 4301 N 7th Ave 85013 ✓; Mon closed, Tue–Fri 5 pm–2 am, Sat 3 pm–2 am, Sun 10 am–2 am ✓; "All guest must be 21+" ✓. The note quotes both pages by name. Clean.

**Routes (all eight; miles and feet within rounding)**
- South Mountain — PJAMM: 7 mi, 1,330 ft, 3.2% (4.8% without the dips), steepest ¼ mi 8.9% ✓; "minimal shoulder", "blind corners/no bail-out areas", "1 or 2 holes", traffic "minimal" ✓; "Highs average 104–106 degrees in the summer" ✓. City page: 4th Sunday all-day 5 a.m.–7 p.m., park at the Activity Complex ✓; 1st/2nd/3rd/5th Sundays 5–10 a.m., closed at the 1.0 mile marker ✓; Parking/Entrance 5 a.m.–7 p.m. ✓; "Dobbins Lookout, at 2,330 feet, is the highest point in the park that is available to the public" ✓. (PJAMM says "last Sunday"; the city's "4th Sunday" is used — right call.) Water: see Fails.
- Rio Verde – Fountain Hills — RWGPS 50221588 "M&L's Rio Verde/Fountain Hills": 49.6 mi, +2,755 ft, Safeway at DC Ranch, "up Pima to Dynamite, up and over the hill to Rio Verde, turn left onto Saguaro all the way to Shea wh…" (cut off, as the note says) ✓. Tour de Scottsdale page: Thu–Sat April 8–10, 2027; 54-mile "circumnavigates the McDowell Mountains riding through Scottsdale, Rio Verde and Fountain Hills" ✓.
- Gainey — RWGPS 29074769: 29.2 mi, +1,097 ft, "Double Tree and Scottsdale (South East Corner)", "Every Tus and Thurs morning" ✓. The five hills rest on the Strava event (not fetched; see Couldn't verify).
- Usery Loop and Salt River — RWGPS ambassador 438, East Side Cycling: 27.1 mi, 1,498 ft, Thomas and Power (Walgreens parking in back), Kong, Little Kong 5–6%, 4 mi at 5–6% over Usery, water only at the Visitor Center, good shoulder, Hawes/Las Sendas finish, Cliffs side trip ✓.
- Indian Bend Wash path — Scottsdale: "An 11-mile multiuse path … more than 24 underpass and bridge crossings", "travel in the right lane and keep the left lane open" ✓, no fountain named ✓. TrailLink: 12 mi, concrete, Venturoso → Curry, Chaparral Park 5401 N. Hayden Rd, Eldorado 2311 N. Miller Rd, "underpasses for almost all road crossings" ✓ (answers the editor's question 4: TrailLink's addresses are printable). Golf-ball line: see Fails.
- Greenbelt loop — Komoot: 51.9 mi, 1,017 ft; cycleway 51.6 km (32 mi), road 13.2 km (8 mi), state road 9.84 km (6 mi) ✓; Taliesin West, Camelback Park, Tempe Town Lake, Salt River view ✓; "grade-separated crossings" ✓.
- Trail 100 — MTB Project: 11.3 mi, 860 ft up, Intermediate/Difficult, "mild-moderate singletrack and some steep, but short climbs" ✓; West Side Trail 100 Loop 10.9 mi, 743 ft, Central Ave lot in North Mountain Park ✓. Singletracks: "fairly loose with lots of big pebbles", rocky; Dreamy Draw, 7th Ave, Tatum, Mountain View Park ✓. City heat page: Piestewa Peak Summit Trail and associated trails close; Trail 100 not named ✓.
- Competitive Track — county PDF: Long 7.9 / Sport 3.0 / Technical 2.7 mi, "for experts only", one-way, "Slower users yield to faster users", "do not 'improve' or sanitize it", Four Peaks Staging Area "water, restrooms with showers, and a bike wash rack" ✓. County biking page: "Long Loop – Designed for the average rider and enjoyed by all skill levels", "Sport Loop – Best suited for intermediate and advanced riders", "Carry plenty of water, check conditions, and let someone know your route" ✓. Total length: see Fails.

**Heat closures (City of Phoenix)**
- Trails heat-safety page: Extreme Heat Warning days, 8 a.m.–5 p.m.; Echo Canyon and Cholla; Piestewa Peak Summit and associated trails; at South Mountain Holbert, Mormon, Hau'pal Loop and the National Trail from Pima Canyon Trailhead ✓; no road named ✓. Heat-response page: "all trails associated with … South Mountain Park and Preserve", drink water before you're thirsty ✓ (the guide's choice of the narrower trails list is stated on the page). azfamily Mar 17, 2026: closures effective March 19–22 ✓ — so "in 2026 those closures began March 19" holds.

**Airline**
- American specialty-and-sports page: "1 non-motorized touring, mountain, tandem, or racing bicycle"; hard case, bag or box; handlebars sideways, pedals off or wrapped; standard bag fee to 50 lb, standard overweight 51–70 lb, oversize waived; not in a hard case = fragile; liable only if hard-sided and visibly damaged ✓. Checked-bag page: first $50 ($45 online), second $60 ($55 online), 62 in / 50 lb, "updated as of May 18, 2026" ✓.

**Calendar dates vs data/calendar-2027.json**
- Belgian Waffle Ride Arizona — calendar id 24, `date_status: confirmed`, note "BWR 'Future Dates' page: Arizona – March 7, 2027". about[1]'s "March 7, 2027" matches. (The BWR page itself timed out this run; the calendar's read stands.)
- HonorHealth Tour de Scottsdale — id 42, confirmed, "ride Sat April 10, 2027"; organizer page read today says the same. about[1] and routes[1] match.
- Valley of the Sun (id 11) and Cactus Cup (id 638) are `projected`; the guide says only "in February" / "in March" ✓. Cycling 4 one·n·ten (id 477) is projected to Nov 6, 2027; the guide says "on the 2027 calendar for November" ✓.

**Coffee (3 of 4)**
- Regroup — café page: Mon closed, Tue–Thu 6:30–12, Fri–Sun 6:30–2 ✓; 1205 N Scottsdale Rd 85288 ✓; (480) 648-8309 ✓; Chacónne Patisserie ✓; nothing on parking/pump ✓; no ride details on the page ✓.
- Village Coffee Roastery — joe.coffee: 6 a.m.–2 p.m. daily, breakfast, sidewalk patio ✓; wanderlog: 8120 Hayden Rd 85258, +1 480-905-0881, 6 a.m.–4 p.m. ✓. The 2-vs-4 disagreement is real and the hours_hint says so ✓.
- Lux Central — luxcoffee.com: 4402 N Central Ave 85012, 6 am–10 pm daily ✓.

**Restaurants (4 of 5)**
- Village Tavern — netwaiter ordering page: 8787 N Scottsdale Rd, Scottsdale, AZ **85258** ✓ (the ZIP flag is settled: 85258, not OSM's 85253); (480) 951-6445 ✓; Sun–Thu 11–9, Fri–Sat 11–10 ✓; outdoor seating is listed there (the note says "neither page mentions a patio" — the editor may add "outdoor seating, per the ordering page").
- Los Taquitos Ahwatukee — redirects to www.lostaquitosaz.com: 4747 E Elliot Rd #17, 85044 ✓; Tue–Sat 9–9, Sun–Mon 9–7 ✓; phone (480) 753-4370 available.
- Pizzeria Bianco Heritage Square — 623 E. Adams St 85004 ✓; Mon–Sat 11–9, Sun closed ✓; "we do not accept reservations and we do not offer take-out" ✓.
- Pedal Haus Tempe — 730 S. Mill Ave #102, 85281 ✓; Mon–Thu 11–11, Fri–Sat 11–12, Sun 9:45–11 ✓; waitlist, no reservations ✓; "one of the largest patios in downtown Tempe" ✓; burgers, fried chicken, pizza ✓.

**Hotels (5 of 6 own pages; no rates anywhere but the hostel)**
- Sonesta — address ✓, breakfast 7–9 ✓, full kitchens ✓, Gainey Village Health Club 0.3 mi ✓, nothing on bikes ✓. Fee/rate: see Fails.
- Grand Hyatt — main page: 7500 E. Doubletree Ranch Road 85258 ✓, resort fee $55 per room per night ✓. FAQ: "formerly known as Hyatt Regency Scottsdale Resort & Spa at Gainey Ranch", rebrand to Grand Hyatt in 2024 ✓. "Fee includes bicycle rentals" sits on the policies / fall-winter pages (not read — see Couldn't verify).
- Hampton Inn & Suites Phoenix Tempe — 1415 N. Scottsdale Road 85288 ✓; free hot breakfast ✓; complimentary self-parking ✓; no airport shuttle ✓; nothing on bikes ✓.
- Tempe Mission Palms — 60 E 5th St 85281 ✓; $30 daily destination fee incl. airport shuttle 5:30 a.m.–10 p.m. ✓; rooftop pool ✓; "just steps from Mill Avenue" ✓; nothing on bikes ✓.
- Phoenix Hostel — FAQ: "All check-ins are self-service and can be completed at any time, even late at night" ✓; "A valid government-issued ID is required" ✓; "must reside outside of Maricopa County" ✓; free street parking ✓. Rooms & Rates: privates from $60 (Salado, 1–3) to $80 (Navajo, 1–2) ✓. 1026 N. 9th Street 85006 ✓.
- Arizona Biltmore — pre-arrival page: resort charge $45/night incl. one-hour bicycle rental ✓; self $28, valet $35 ✓; 2400 E. Missouri Ave 85016 ✓. (Also a $14/night Historic Preservation Fund charge the note doesn't mention — worth adding.)

**Culture (6 of 7)**
- Stinkweeds — 12 W Camelback Rd 85013; Mon–Fri 11–8, Sat 10–8, Sun 12–6; "since 1987" ✓ (the light-rail line isn't on the contact page; it's geography, fine).
- Heard Museum — 2301 N Central Ave; Sept 1–May 31 daily 10–4, June–Aug Tue–Sun ✓; free parking ✓; Encanto/Central stop ✓; price not shown ✓.
- Pedal Haus Roosevelt Row — 214 E. Roosevelt St 85004; Mon–Thu from 3 pm, Fri 3 pm, Sat 11 am, Sun 9:45 am ✓; rooftop "with its own bar" ✓.
- Old Town Scottsdale Farmers Market — city calendar: 7495 East Bennie Gonzales Way; Oct–Apr 8–1, May 8–12, June 7–10, closed Jul–Sep; 100+ vendors; "NEW LOCATION starting October 3rd!" ✓.
- Scottsdale Stadium — cactusleague.com schedule: first games Friday, February 19; last Saturday, March 20; Giants at Scottsdale Stadium, Angels at Tempe Diablo ✓. Tempe Tourism: Giants players sign "right next to their team's dugouts for about a half-hour before the game begins" ✓.
- Boycott Bar — above.

**Bike shops, non-rental (3 of 3 others)**
- The Velo — contact page: 2317 N 7th St 85006, 602-759-8169, Mon–Fri 10–6, Sat 10–4, Sun 10–2 ✓. Services page: walk-ins welcome, flat $10, tune-ups $90/$150/$250, fits $90 (30 min) / $150 (60–90) / $180 tri (90–120) / cleat $40, call or text to book, custom builds ✓. Ride With Us: "Wednesdays at 6AM" from the shop ✓ (the note says "the day and time are on its Ride With Us page" — true; and it's the editor's lead for the next rides merge).
- Global Bikes Chandler North — 2915 West Ray Road #10, 85224; (480) 899-3625; Mon–Fri 10–7, Sat 10–6, Sun 11–4 ✓; five stores (Ahwatukee, Chandler North, Chandler South, Gilbert, Mesa) ✓; repairs, e-bikes, suspension ✓.
- Regroup (shop side) — café facts as above; the service tiers weren't re-read (the café page was the sample).

**Logistics**
- Sky Harbor airlines page: Terminal 3 Alaska, Allegiant, Breeze, Delta, Frontier, JetBlue, Sun Country, United (+ Air Canada, Hawaiian, Porter…); Terminal 4 American, Southwest, Aeroméxico, Air France, British Airways, Volaris, WestJet ✓. Taxis: $7 first mile, $2.60/mile, $20 flat to downtown bounded by Roosevelt / Lincoln / 7th Ave / 7th St ✓. Biking: 44th Street Sky Train station racks, enter off Washington heading south on 41st Place, "Locks left on the rack will be removed and disposed of after five days" ✓.
- BikeFlights shipping policy: 150 lb, 165 in total size (and 108 in length), no transit-day count ✓. The Moxie partner page carries no shop detail — the ship note already says nothing on the shop's side confirms it ✓.

**Health and voice**
- No mental-health language anywhere in the JSON (grep for mental health / depression / anxiety / suicide / therapy / 988 / Trevor: nothing). No banned phrases (leverage, synergy, journey, passionate about, thrilled/excited, $800, two suitcases, Prescott, est. 2008, years sober, 7,500, swim): the only hit is "7500 E. Doubletree Ranch Road", an address. "Hidden gem / must-visit / vibrant": none.

## Stale

None. The town and every route carry `verified: 2026-10-03`.

## Couldn't verify (not fetched here; the scouts' reads stand)

- **Fountain View Coffee phone (805) 310-1544** — the voice flag. Both listings in `sources` carry the same number: joe.coffee and wanderlog ("+1 805-310-1544"), with 12645 N Saguaro Blvd Ste 17, 85268 and 6 a.m.–3 p.m. daily and the fountain-view patio. No site of the café's own exists in the sources and I could not search for one. Area codes travel with mobile numbers, so an (805) number in Fountain Hills is plausible, and two listings agree. Keep it, with the "call first" wording already there; the editor may add "the number both listings give" so a reader isn't surprised. Not a fail.
- Bike Emporium hours (Mon–Fri 9–5, Sat 9–3, Sun closed) — not on the home, rentals or service page; the contact page's permission request timed out.
- Airpark Bike Co hours (Mon–Fri 9–6, Sat 9–2, Sun closed) — not on the MTB rental page; the store page wasn't in the sample.
- Grand Hyatt "$55 resort fee includes bicycle rentals" — on the /policies and /fall---winter-activities pages (403 to the script; not fetched by WebFetch this run).
- PMBC (clubexpress) — the page loads as a script shell; the Saturday Cycling wording (no-drop, sweep, 25/35 mi, helmet, no earphones) rests on the community scout.
- Scottsdale Cycling Strava club 620243 (invite-only, the five hills), Valley Epic Rides Meetup (7–12 mi, five rides' experience, 6-hour RSVP rule, 1.5 L, heat/dust cancellations), Bike Saviours (hours, 602-429-9369, the safe-space statement), Black Girls Do Bike chapters page, Belgian Waffle Ride AZ page — each permission request timed out.
- Changing Hands (both stores, hours, First Draft bar) — 403 to the script; not sampled.
- Matt's Big Breakfast — TripAdvisor 403; not sampled (listings-only pick, as the editor said).
- Hostelworld's HI Phoenix line — not sampled.

## Watch

- **South Mountain's city page carries a banner "Summit Road Closed 2/21 for National Trail Trek."** No year on it. If it is Feb 21, 2027, the route's hazards line and the Silent Sunday ride should say so closer to the date; if it is last February's, it's a stale banner. Check in January.
- **Valley Epic Rides' Night Rider series** ends Oct 27, 2026 (editor-notes). `routes[6].ride_slug` and two tokens point at it; if the record goes off the lists the build prints a bare label. Re-check after the Meetup renews or not.
- **Bike Emporium's rental fleet is year-stamped** (2023/2024 bikes, Oct 2026 prices); the page will change with the fleet. Quarterly.
- **American's bag fees** say "updated as of May 18, 2026"; re-read on the quarterly refresh.
- **Sonesta's destination fee** is "$30 + tax" and "subject to change"; Mission Palms' $30 likewise; the Biltmore's $45 + $14 preservation fund. Hotel fees move every season.
- **The heat-closure trail list** was approved March 27, 2025 and the city's broader heat page already says "all trails associated with … South Mountain". If the city widens the named list in spring 2027, the three hazards lines and `rules_and_safety` change.
- **Old Town Scottsdale Farmers Market** moved on Oct 3, 2026 — first season at the new spot; the June and May hours may be revised.
- **Hostel privates** are "from $60/$70/$75/$80" — a floor, not a rate; fine as written but will drift.
- **Fountain View Coffee** — if Robert or a rider confirms the number from the café's own door or menu, the "call first" caveat can go.
