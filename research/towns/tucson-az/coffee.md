# tucson-az · coffee-scout · 2026-10-03

Six cafés. Three are ride-out cafés by `cfc-site/rides/rides.json`: Presta
inside the Mercado, where the Women's Shootout meets; Bruegger's on La Cañada,
where Cactus Cycling Club's Wednesday ride leaves; LeBuzz on Tanque Verde,
where the club's Friday Saguaro East ride stops after. The Shootout's own café
is not settled: UA Cycling names "Starbucks on University/Euclid" as the meet,
and a 2026 Yelp listing marks that store closed (see Couldn't confirm). Time
Market, a few blocks west on the same street, is the confirmed early door
there. The Cookie Cabin is the Mount Lemmon stop, on its own site and two 2026
guides. Ren is the 6 a.m. door by the Rillito stretch of the Loop. No bike
parking, floor pump or hose was confirmed at any of them.

Fetches here only loaded for URLs that had come back in a search, so the club
pages behind two of the ride-outs could not be re-read (cactuscycling.org
blocks fetching in robots.txt). Those two `ride_out` calls rest on
`rides.json`, which the agent file allows; the ride records cite the club's
schedule page, read Sept 30, 2026. Both sections shared one budget: 12
searches (the cap, all used) and 47 fetches, 9 of which failed.

Distances are straight-line from the brief's centre (32.2226, -110.9747),
computed from points in `data/geocode-cache.json`.

## Findings

```json
[
  {
    "name": "Presta Coffee Roasters (Mercado San Agustín)",
    "url": "https://prestacoffee.com/pages/our-locations",
    "address": "100 S Avenida del Convento, Tucson, AZ 85745",
    "note": "Inside Mercado San Agustín on the west side, where {ride:tucson-az-womens-shootout|the Women's Shootout} meets. Opens at 7, per the Mercado's directory, so it is the coffee before or after depending on the ride's start that week. Bar and patio seating, per Presta. Nothing says bike parking.",
    "hours_hint": "7 a.m. to 2 p.m. daily",
    "ride_out": true,
    "ride_slug": "tucson-az-womens-shootout"
  },
  {
    "name": "LeBuzz Caffe (Tanque Verde)",
    "url": "https://www.lebuzzcaffe.com/locations",
    "address": "9121 E Tanque Verde Rd, Tucson, AZ",
    "note": "At Tanque Verde Road and Catalina Highway, the road up Mount Lemmon, about 11 miles northeast of downtown. Opens at 6 every day, so it is the coffee before the climb. {ride:tucson-az-cactus-cycling-friday-saguaro-east-ride|Cactus Cycling Club's Friday Saguaro East ride} leaves from La Herradura on the same road and stops here after. (520) 749-3903.",
    "hours_hint": "6 a.m. to 3 p.m. daily",
    "ride_out": true,
    "ride_slug": "tucson-az-cactus-cycling-friday-saguaro-east-ride"
  },
  {
    "name": "Bruegger's Bagels (La Cañada)",
    "url": "https://locations.brueggers.com/us/az/tucson/11165-north-la-canada",
    "address": "11165 N La Canada Dr, Suite 161, Tucson, AZ 85737",
    "note": "On the north side, about 13 miles north of downtown, where {ride:oro-valley-az-cactus-cycling-wednesday-oro-valley-ride|Cactus Cycling Club's Wednesday ride} leaves. Opens at 5:30 every day, the earliest door on this list. A chain bagel shop; nothing on its page says bike parking or a patio.",
    "hours_hint": "5:30 a.m. daily; closes 4 p.m., 3 p.m. Sunday",
    "ride_out": true,
    "ride_slug": "oro-valley-az-cactus-cycling-wednesday-oro-valley-ride"
  },
  {
    "name": "Mt. Lemmon Cookie Cabin",
    "url": "https://www.thecookiecabin.org/",
    "address": "12781 N Sabino Canyon Park, Mt Lemmon, AZ 85619",
    "note": "In Summerhaven near the top of the Mount Lemmon climb, at 8,000 feet: big cookies, New York-style pizza and drinks, per its site. It opens at 11, so an early climb gets there first; the Mt. Lemmon General Store on the same road opens at 10 with warm drinks and snacks, per the store's site. The Cabin says to check Google Maps for closures. 520-576-1010.",
    "hours_hint": "11 a.m. to 5 p.m. daily",
    "ride_out": false
  },
  {
    "name": "Ren Coffeehouse",
    "url": "https://www.rencoffeehouse.com/coffeehouse",
    "address": "4300 N Campbell Ave, Suite 24, Tucson, AZ",
    "note": "The early one on the Loop: right off the Rillito path section, per Tucson Foodie's list of cyclist cafés. Opens at 6 every day, with an outdoor patio, per its site. Nothing says bike parking. (520) 638-6290.",
    "hours_hint": "6 a.m. to 3 p.m. daily",
    "ride_out": false
  },
  {
    "name": "Time Market",
    "url": "https://www.timemarket.xyz/",
    "address": "444 E University Blvd, Tucson, AZ 85705",
    "note": "On University Boulevard, a few blocks west of the corner where {ride:tucson-az-the-shootout,tucson-az-tuesday-morning-fast-ride|the Shootout and the Tuesday Morning Fast Ride} leave. Opens at 7 every day, with bread baked in-house each morning and a patio, per its site, so it is the sure coffee after. No ride names it as a meet. 520-622-0761.",
    "hours_hint": "7 a.m. to 10 p.m. daily",
    "ride_out": false
  }
]
```

## Why these

- **Presta, Mercado San Agustín** — the Women's Shootout meets at Mercado San Agustín, 100 S Avenida del Convento (`rides.json`; Transit Cycles' events page: "A road ride every Saturday from The Mercado"). Presta's own locations page puts its original shop "Inside Mercado San Agustin" at that address, with "Bar and patio seating." Hours (7–2 daily) come from the Mercado District directory; Presta's page shows none. Tucson Foodie's 2018 cyclist list also sends west-side riders here "for those riding out by Gates Pass." The Mercado directory gives the address as 120 S Avenida del Convento, Building 120, #180; I used Presta's own.
- **LeBuzz, Tanque Verde** — the cyclists' café at the Mount Lemmon end of town. Own site: "9121 E. Tanque Verde Rd (Tanque Verde & Catalina Hwy)," 6–3 daily; Tucson Foodie (2019) gives the same hours and names "morning cyclists"; BikeAZ (modified 2022) calls it the stop where riders "start here, meet here and dine here." `ride_out` because the Cactus Friday ride's record in `rides.json` ends "Social after at LeBuzz." The distance uses the geocoded 9165 E Tanque Verde point (La Herradura), on the same block.
- **Bruegger's, La Cañada** — the start of the Cactus Wednesday ride (`rides.json`: "from Bruegger's Bagels on N La Cañada Dr"). Its own page: Suite 161, Tucson 85737, 5:30 a.m. every day. `rides.json` calls the spot Oro Valley; Bruegger's own page says Tucson, so the address follows Bruegger's. Only north-side pick.
- **Mt. Lemmon Cookie Cabin** — the summit stop the editor asked for. Own site: 12781 N Sabino Canyon Park, 520-576-1010, 11–5 every day, "Check Google Maps for closures." Tucson Foodie's Mount Lemmon guide (updated May 22, 2026) gives the same hours. A Mt. Lemmon Hotel guide (Sept 17, 2026) says 10:30–5, seasonal; the Cabin's own hours win. The General Store line in the note is from mtlemmon.com: 10–6 daily, "Hot Chocolate Available," "cold food … warm drinks, cold drinks, snacks," "Only ATM for 30 miles."
- **Ren Coffeehouse** — 6 a.m. daily with a patio (own site). Tucson Foodie's 2018 list says it sits "Right off the Rillito bike path section of the The Loop." The address is the same now, so the location line stands; the hours are this month's.
- **Time Market** — the confirmed early door on the Shootout's street. Own site: 7 a.m. to 10 p.m. daily, bakery, breakfast to dinner, patio; joe.coffee lists the same hours. 444 E University sits west of the 800 block, where the Shootout start is described (The Joy of Bike: "800 East University Boulevard"). Not a ride-out: nothing names it as a meet. The editor can cross-list it in restaurants as a dinner place open till 10.

## Rejected

- **Mt. Lemmon General Store & Gift Shop** (12856 N Sabino Canyon Pkwy, 10–6 daily, own site) — a store, not a café. Folded into the Cookie Cabin note. Its site also says the Control Road from Oracle is closed Dec 15 to Mar 15; that is for @route-scout and @logistics-scout.
- **Beyond Bread at Mount Lemmon Lodge** — Tucson Foodie's Lemmon guide lists it (breakfast 7–11), but Beyond Bread's own locations page lists three city stores and nothing on the mountain, and the Mt. Lemmon Hotel guide calls the café a separate business. The three city stores open at 7 and sit near no ride start.
- **Iron Door, Grub Stake Café, the Fudge Shop (Ski Valley)** — "typically weekends & holidays; call ahead," "staffing-dependent" (Mt. Lemmon Hotel guide). No firm hours.
- **LeBuzz, Plaza Palomino** (2930 N Swan Rd, 6–2 daily) — open, but not where riders go; the Tanque Verde shop is.
- **Presta Sunrise and Presta 9th Street** — open per Presta, near no ride start.
- **Bruegger's other Tucson stores** (Campbell, East Broadway, Tanque Verde, the airport) — no ride starts there.
- **Starbucks, 9451 E 22nd St** — one of the rotating October starts of the Cactus weekend B ride. A chain on a start that moves every week.
- **Pour My Coffee (Rita Rd)** — the end of one Civano Cycling Club route (Oct 1, in `rides.json`), not a standing meet. Not fetched.
- **Tucson Foodie's 2018 list and Oru's 2017 guide** — leads only; every pick drawn from them was fetched on its own page.
- **Hello Bicycle domain guesses, rencoffeehouse.com bakery page, Yelp** — Yelp blocks fetching in robots.txt; the bakery page title came from search, not a fetch, so nothing from it is used.

## Couldn't confirm

- **Starbucks, Main Gate Square, 802–804 E University Blvd** — UA Cycling's ride page says "Meet at Starbucks on University/Euclid" for its Saturday Shoot Out (the page is undated and lists a 6 a.m. meet). A Yelp result in search is titled "STARBUCKS - CLOSED - Updated April 2026" for 802 E University; Yelp would not load. Main Gate Square's merchant page still lists the store, undated. If it's open, it is the Shootout's ride-out café; if it closed, where riders gather now is unknown. Editor: the Starbucks store locator, or Fair Wheel Bikes, 520-884-9018.
- **Elevated Espresso, Summerhaven** — real espresso near the top. One guide (Mt. Lemmon Hotel, Sept 17, 2026) gives Thu–Fri 10–3, Sat–Sun 9–4, seasonal, at 12925 N Sabino Canyon Pkwy; Tucson Foodie gives 12903. Instagram only (@elevated_espresso). Needs its Google listing.
- **Hello Bicycle + Cafe, 3702 E Hardy Dr** — a coffee bar inside a bike shop, "right off the popular Loop bike path," café Wed–Sun 8–3, closed Mon–Tue (The Radavist, Feb 15, 2024). Own site not reached. Hand-off to @shop-scout (it also runs Old Pueblo Suspension Works).
- **Decibel Coffee Works, 267 S Avenida del Convento, Building 9** — same address as Transit Cycles (Building 10). Mercado directory: 7–2 Monday and Tuesday, 7–8 Wednesday to Sunday; it lists the same phone as Presta, so the directory may be off. Own site (decibelcoffeeworks.com) not fetched.
- **La Estrella Bakery, Mercado San Agustín** — named in Tucson Foodie's 2018 list; may open earlier than Presta. Not fetched.
- **LeBuzz's pump and tubes** — Tucson Foodie (2018) says "spare tubes and pumps if you have a flat." Too old to print. Ask the café.
- **Hand-off to @community-scout** — rides on Transit Cycles' events page that are not in `rides.json`: Tucson Sundaze Ride (Sundays 7 a.m., Highland Underpass on the UA campus), Dragonfly Rides' Full Moon Ride (from Tucson Hop Shop to Bear Canyon on the Loop), Third Thursdays Westside Community Rides (5:30 p.m., MSA Annex, a drink at Westbound first, then Dragoon Brewing). Also UA Cycling's schedule at uacycling.com/rides/, which has a Thursday "Easy Cafe Ride" from the Old Main flagpole with no café named.

## Sources

Read and used:
https://www.fairwheelbikes.com/service/group-rides/
https://www.transitcycles.com/events-1
https://uacycling.com/rides/
https://thejoyofbike.com/shootout-group-ride-tucson/
https://www.granvillebike.com/marks-cycling-blog/the-tucson-shootout-ride
https://www.maingatesquare.com/merchant/starbucks/
https://prestacoffee.com/pages/our-locations
https://mercadodistrict.com/business/presta-coffee-roasters/
https://mercadodistrict.com/business/decibel-coffee-works/
https://www.lebuzzcaffe.com/locations
https://tucsonfoodie.com/news/le-buzz-caffe
https://www.bikeaz.org/best-cycling-rides-oro-valley/le-buzz-caffe-coffee-mandatory-cycling-mount-lemon/
https://locations.brueggers.com/us/az/tucson/11165-north-la-canada?y_source=1_OTczMjIzMy03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D%3Fp2df
https://www.thecookiecabin.org/
https://www.thecookiecabin.org/about
https://mtlemmon.com/
https://mtlemmon.com/faqs/
https://tucsonfoodie.com/guides/eat-drink-mount-lemmon
https://mtlemmonhotel.com/mt-lemmon-restaurants-dining-guide/
https://www.rencoffeehouse.com/coffeehouse
https://www.timemarket.xyz/
https://joe.coffee/locations/az/tucson/time-market-tucson/
https://www.beyondbread.com/contact/locations/
https://tucsonfoodie.com/2018/06/26/cyclist-friendly-cafes/
https://www.orucase.com/blogs/city-guides/tucson
https://tucson.com/thisistucson/guides/article_5f7422d6-8e55-11ee-bda4-0f6dd8d06780.html
https://theradavist.com/hello-bicycle-cafe-and-shop-tucson
cfc-site/rides/rides.json (in the repo: the five ride records named above, verified Sept 30, 2026)
data/geocode-cache.json (in the repo: the two points used for distances)

Tried, did not load:
https://www.fairwheelbikes.com/blogs/posts/womens-rides/ (fetch permission timed out)
https://www.cactuscycling.org/Schedule-List (fetch permission timed out)
https://cactuscycling.org/event-6627917 (robots.txt)
https://www.yelp.com/biz/starbucks-tucson-13 (robots.txt)
