# guerneville-ca — verify (@town-verifier, Nov 16, 2026)

**ships.** No fail is left in queer-owned (one claim, in the hotel's own words), ship-to-shop
(none claimed), rentals, routes or bike policy. Fourteen facts failed or were unsupported and were
corrected or cut in `data/towns/guerneville-ca.json` this run (the launching brief allowed that
edit; the agent file's "never edits" was overridden for this run only). The fetch run still exits
FAIL on 16 source links: all are timeouts or resets from the script's fetch, none is a listing's
own URL, and the chamber and county pages among them load with curl and a browser user agent.

## Script output

First run, with fetches (`NODE_USE_ENV_PROXY=1 node tools/verify-town.js data/towns/guerneville-ca.json`):

```
FAIL  data/towns/guerneville-ca.json  (225 urls, 32 fails, 9 warnings)
```

After the fixes, with fetches:

```
FAIL  data/towns/guerneville-ca.json  (220 urls, 16 fails, 9 warnings)
  ✗ russianriver.com (8 chamber pages) → timeout
  ✗ sonomacounty.com (2 pages) → timeout
  ✗ https://blueheronrestaurant.com/ → fetch failed
  ✗ https://www.boonhotels.com/boon-policies → 503
  ✗ https://frankiapp.com/business/higher-ground-organic-espresso-262487.md → timeout
  ✗ https://www.restaurantji.com/ca/guerneville/coffee-shops/ → timeout
  ✗ https://www.opentable.com/single.aspx?rid=63679 → timeout
  ✗ https://sonoma.com/businesses/11167/river-inn-grill → fetch failed
```

After the fixes, `--no-fetch`:

```
ok  data/towns/guerneville-ca.json  (220 urls, not fetched, 0 fails, 5 warnings)
  ! routes[0]–routes[4] start has no lat/lon
```

`node scripts/build-events.js`: passes. Built 130 pages: 14 events, 18 towns, 10 states.

Non-200s resolved by hand (curl, browser user agent, Nov 16):
- russianriver.com and sonomacounty.com pages: 200. The script's parallel fetches time out on them.
- blueheronrestaurant.com, boonhotels.com: 200 by hand. The two runs failed different pages.
- OpenTable, sonoma.com, restaurantji, Fodor's, aa.com (403): couldn't verify. Source links only.
- Redirects, same business, URL updated in the file: booksletters.com → `https://www.booksletters.com/`,
  queersteer.com → `https://queersteer.com/`, russianriverartgallery.com → `https://russianriverartgallery.com/`.
- Cottages on River Road `booking_url` (ipms247) redirects to `https://letsbook.me/booking/cottageonriverroad`.
  The hotel's own site still links the ipms247 address, so it stays. The landing page is script-only;
  nothing on it could be read.

## Fails (all applied)

- **summary, about, faq — Cycle to Zero nights.** "camps here on May 21–23" read as three nights.
  SFAF's page: May 21–23, 2027, "We'll camp both nights at Camp Russian River and Johnson's Beach,
  a 15-minute walk apart". Now "two nights, Friday and Saturday, May 21 and 22" in all three places.
- **about[1] — "coffee, the river and a walk in the redwoods."** "the river" cut. Johnson's Beach's
  public season starts after that weekend by both of its own pages.
- **best_months, culture, Johnson's Beach season.** Its two pages disagree. `/the-area`: "opens for
  service on Memorial Day, and closes October 1". `/faq`: beach open the weekend of May 16–17, then
  daily June 1 through September 7 (2026 dates); campsites from March 14. Both now stated; the note
  says not to count on the beach, rentals or snack shack in May.
- **routes[1] — "Forestville is the next town upriver."** Contradicts `about[0]` (Rio Nido and
  Korbel are between). Cut; now "about 6 miles east of it in a straight line".
- **faq[4] — "Monte Rio, the next town downriver."** Same problem. Now "starts in Monte Rio."
- **routes[2] and routes[3] hazards — construction not mentioned.** Caltrans advisory (July 30, 2026):
  one-way signal control on SR-116 between Sheridan Ranch Road and Vacation Beach, "between
  Guerneville, Vacation Beach, and Monte Rio", into early 2027. Both routes are reached from
  Guerneville through it. One sentence added to each hazards line, with the source.
- **restaurants, Stumptown Brewery — URL 404 and hours wrong.** `/cgi/wwpints/head.cgi` is 404; the
  site is `http://stumptown.com/` (its frame loads `/cgi-bin/head.pl`). Own pages: kitchen Sunday to
  Thursday 11 to 9, Friday and Saturday 11 to 10; pub every day from 11 until at least 11. The file
  said kitchen to 10 every day and pub from 10:30. Corrected. The deck is now quoted from the
  brewery's own page; the sonoma.com source (unreachable) is dropped.
- **coffee, The Farmhand — hours.** thefarmhand.net posts them: Monday, Friday, Saturday, Sunday
  9 to 4, Thursday 9 to 3, Tuesday and Wednesday closed. Note, `hours_hint` and the coffee FAQ now
  say so and drop "by the one listing".
- **culture, Russian River Art Gallery — hours exist.** Own site: summer 11 to 6, closed Wednesdays;
  winter 11 to 5, closed Tuesday and Wednesday; 16357 Main Street, 707-869-9099, © 2026. Added in
  place of "No hours on the chamber listing".
- **culture, Rainbow Cattle Company — attribution.** 1979 and "the new gay tourists" are on its own
  site. "The Rainbow" and "The Bow" are from the county tourism listing. Note reworded to say which.
- **culture, farmers market — URL couldn't be verified.** russianriverfarmersmarket.com fails TLS
  from here (certificate chain). `url` now points at the county tourism listing, which states
  Thursdays 3 to 7, June through August, Fourth and Church, behind Hubert's Hall. Editor: restore
  the market's own URL if it loads in a browser.
- **airports — SFO miles.** Great-circle from the town's lat/lon to Wikipedia's coordinates:
  SFO 69.9, OAK 68.5, STS 9.6. SFO is now 70 (card, airport entry, `getting_there`, note). OAK 69 and
  STS 10 stand.
- **getting_there, get_around, transit_bike_rules — Route 20.** The source URL is 404; the page is
  `https://sctransit.com/routes/route-20/` and the timetable is one "Daily Service" PDF (effective
  April 12, 2026) with some trips marked M-F only. There is no separate Saturday or Sunday table, so
  "last Saturday bus 2:50 pm", "Saturday about 9 and 5, Sunday about 6 and 6" are cut. Now: the last
  every-day bus toward the river leaves Coddingtown at 5:20 pm; fewer trips on weekends. Guerneville
  stops (Safeway, West County Services Center) and the 3rd Street SMART stop are on the timetable.
- **dead sources removed** (404): russianriverhistory.org `?p=1461`, three visitsantarosa.com event
  pages, santarosametrochamber and happeningsonomacounty Biker Chicks pages, the sonomacounty.gov
  road-safety release, old.sonomacounty.com Gold Coast. No prose rested on them.

## Passes

- Cycle to Zero — sfaf.org/get-involved/cycle-to-zero/ (today): May 21–23, 2027; both nights at Camp
  Russian River and Johnson's Beach, a 15-minute walk apart; Day 2 about 40 miles or about 100, or a
  day off; 1-Day Cyclists ride Saturday, May 22, 2027.
- routes, Sweetwater Springs — bayarearides: 26 miles, 2300 feet, First Street parking, the quarter
  mile walked, Westside shoulder one or two feet, River Road traffic heavy. PJAMM: 2.3 miles, 8.8%,
  16% pitches.
- routes, West County Regional Trail — parks.sonomacounty.gov: 5.5 miles, mostly paved, boardwalk
  north of Graton, 7 a.m. to sunset, the three parking trailheads, 14 miles with the Joe Rodota.
- routes, Sonoma Coast — SRCC page and ride library: Occidental, 34 miles, the Bay Hill 750-foot
  climb, "River Road, also known over this section as Hwy 116" (voice item 5 settled: the name is
  the club's). RideWithGPS 15294865 opens: "TGR-SonomaCoast", starts in Occidental.
- routes, King Ridge — SRCC page and library: Monte Rio, 55 miles, two refills in 40 miles.
  RideWithGPS 15294984 opens: "TGR-King Ridge", 54.8 miles, starts at Monte Rio. Both links stay.
- routes, Howarth to Korbel — RideWithGPS ambassador page: 48 mi, 1,529 ft (file says 1550),
  Korbel deli, debris on the shoulder, the Sunset turn, the Eastside turn.
- bike_shops / rent, Russian River Cycle Service — own site (© 2026): 6559 Front St, (707) 887-2453,
  Wed–Fri 11–6, Saturday 9–5, closed Sunday–Tuesday, rental appointments seven days. Services page:
  "Small jobs are often done while you wait. Less complicated jobs are usually done by days end …
  never over a week" (voice item 8: the order is the shop's own). Rentals: hybrids $45, road $75,
  delivery, "at the trail head for the West County Regional Trail".
- rent, Sports Basement — rental-rates page: aluminum road $75 / $135 / $220, carbon $100 / $175 / $300.
- rent, Revel Cycles — rentals page: cruisers $50, e-bikes $75 for 3 hours or $95, free cancellation
  to 24 hours.
- queer-owned, The Woods — own home and policies pages: "Gay-owned", "an adult-hotel and not
  recommended for minors", 16484 Fourth Street, 707-869-0600.
- hotels, house bikes — boon: "We have cruiser bikes available complimentary to our guests."
  Dawn Ranch (/chalets/): "our complimentary fleet of Retrospec bikes". The Stavrand (/amenities):
  "Take out one of our cheerful yellow bicycles for a spin (first-come, first-served)". All three
  lend bikes to guests in their own words; the wording stays.
- hotels, bike_policy — all six say no stated policy. None of the pages read states one.
- hotels, The Highlands — policies page: 18 and over, 2-night weekends, 3–5 night event minimums.
- coffee, Coffee Bazaar — own home and contact pages: 14045 Armstrong Woods Rd, (707) 869-9706,
  Monday–Thursday 6:00 AM–4:00 PM, Friday–Sunday 6:00 AM–6:00 PM. The 6 a.m. line stands.
- restaurants, Guerneville Taco Truck — own page: 16405 CA-116, daily 11:30 to 9 (voice item 7).
- restaurants, Piknik, boon eat + drink, Blue Heron — own pages: addresses, phones, every hour in
  the notes, no reservations at boon, groups of 8 at the Heron.
- culture, Books & Letters — own site: 14045 Armstrong Woods Road. Chamber listing: the hours as written.
- culture, Armstrong Redwoods — parks.ca.gov (checked 11/16/2026): 8 to an hour after sunset, East
  Ridge Connector closed, Austin Creek camping closed.
- shops, Trek Santa Rosa — 512 Mendocino Ave, 24-hour turnaround. clubs, Sports Basement ride —
  1970 Santa Rosa Ave, 30–40 miles, no-drop.
- transit bike rules — sctransit.com/bicycles: 80 × 48 × 24 inches, no recumbents or tandems.
- phones (voice item 11) — `telHref` strips to ten digits; every format builds.
- health rules — no mental-health language on the page.

## Stale

Nothing is past six months. Every `verified` is 2026-11-16.

## Couldn't verify (rests on one signal or an earlier read)

- Stumptown Brewery open status: its own site only, and the site is old (last dated update March
  2025). The note says call first.
- Coffee Bazaar: own site only (© 2024); closing time conflicts with one listing. Needs a phone call
  (voice item 6). The 6 a.m. opening is on two of its own pages.
- Route 20 weekend trips: read off the timetable image; the M-F marks are small. Editor, eyeball the
  PDF before quoting a weekend count.
- Alaska bike rule: both URLs tried answer page-not-found. Carried with its Sept 2026 read date, as
  the LA guide does. American: aa.com is a bot wall; the scout's Nov 2026 read stands alone.
- Farmers market's own site (TLS failure). Two listings agree on day, hours and place.
- Cottages on River Road booking page: loads, but shows nothing without script.
- `price_hint` (voice item 10): no dollar scale is written anywhere; `$$` for $175–$510 and `$` for
  $79–$219 are the stay scout's relative call. The Stavrand has no rate on record (voice item 1).
- Sidewalk rule for unincorporated Guerneville. The page says so.

## Watch

- Russian River Cycle Service's home page says "closed 11/23 thru 11/30".
- Sonoma Coast: the club says 34 miles; its RideWithGPS file measures 35.7 miles and 2,354 ft. King
  Ridge's file measures 5,191 ft. Neither climbing figure is in the guide; the editor can add them.
- Johnson's Beach has no 2027 dates. Re-read its FAQ in March.
- Caltrans SR-116 signal zone west of town ends "early 2027". Re-read before the May ride.
- Gallery and farmers market are seasonal; Books & Letters' late Friday and Saturday hours end with 2026.
- Airport cards show straight-line miles bare; the prose says straight line.
