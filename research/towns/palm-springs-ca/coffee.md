# palm-springs-ca · coffee-scout · 2026-10-03

Three cafés. Two are ride-out starts named on the Desert Bicycle Club's own
calendar, both in Palm Desert, both chains: the Starbucks at Highway 74 and
El Paseo (the Sunday climb up 74) and the Coffee Bean & Tea Leaf on El Paseo
(the 6 a.m. weekday rides). The third, Townie Bagels, is the one Palm Springs
pick, with two 2026 pages behind it. That is below "mostly Palm Springs." No
café in Palm Springs could be confirmed open early near the Tour de Palm
Springs start, and no club page names a café in Palm Springs as a ride start.
No hours were confirmed for any pick, so every `hours_hint` is null. No bike
parking, pump or hose was confirmed anywhere.

How this run went, so the next one doesn't repeat it:

- **WebSearch was spent before I started.** My one call came back "this
  session has used its web search budget (200 of 200 WebSearch calls)." No
  leads came from search. Everything below came from pages I fetched, or from
  the other scouts' reports in this folder.
- **No café's or restaurant's own site opened.** Every one I tried hung on a
  permission request and was withdrawn: Koffi twice, Townie Bagels, Las
  Casuelas, Lulu, Bill's Pizza, Sherman's, King's Highway. Bike n Brews'
  domain did answer, but it now serves a gambling page. The pages that did open
  were the Tour's site, the club's ClubExpress calendar, Tri-A-Bike, Velo Palm
  Springs, Visit Palm Springs' home and one blog post, a few Palm Springs Life
  articles, outxout and the Palm Springs Guys. So addresses come from the
  club's ride pages and the visitor bureau, not the cafés' own pages or Google
  listings. The verifier should check each against the Google listing.
- **No distances.** No geocoder page was fetched (the stay and route scouts'
  Nominatim requests were refused too), so the brief's centre is unconfirmed
  and nothing here is measured from it.
- One run served both sections: 68 fetches. 26 were withdrawn on permission,
  one came back 403, and 41 opened.

## Findings

```json
[
  {
    "name": "Starbucks, Highway 74 and El Paseo",
    "url": null,
    "address": "73030 El Paseo, Palm Desert, CA 92260",
    "note": "Where Highway 74 meets El Paseo in Palm Desert, and the start of {ride:palm-desert-ca-desert-bicycle-club-sunday-climbers|the Desert Bicycle Club's Sunday Climbers}: up Highway 74 at your own pace and back down, regrouping at the Art Smith Trailhead (mile 4) and the Vista Point (mile 8.5), per the club. A chain store, here because the club's climb leaves from it. Its hours and any bike parking weren't on a page we could open.",
    "hours_hint": null,
    "ride_out": true,
    "ride_slug": "palm-desert-ca-desert-bicycle-club-sunday-climbers"
  },
  {
    "name": "Coffee Bean & Tea Leaf, El Paseo",
    "url": null,
    "address": "73400 El Paseo Dr #9, Palm Desert, CA 92260",
    "note": "The Desert Bicycle Club's weekday start in Palm Desert: a B ride (regroup) on Tuesdays and Thursdays and an A ride (drop) on Tuesdays leave from here at 6 a.m., per the club's October 2026 calendar. Whether the store is open by 6 wasn't on any page we could open, so plan on the coffee after. A chain; the club's page says nothing about bike parking.",
    "hours_hint": null,
    "ride_out": true
  },
  {
    "name": "Townie Bagels",
    "url": "https://www.towniebagels.com/",
    "address": "650 E Sunny Dunes Road, Palm Springs, CA",
    "note": "Breakfast in Palm Springs: bagels boiled fresh every day, breakfast sandwiches and cold brew, in the Sunny Dunes neighborhood just east of downtown (Visit Palm Springs, July 2026). Its hours weren't on any page we could open, so check before you plan a ride-out from it. Nothing found on bike parking.",
    "hours_hint": null,
    "ride_out": false
  }
]
```

## Why these

- **Starbucks, Highway 74 and El Paseo**: the ride-out for the climb the
  brief asks for. The club's ride page: "Starbucks - Rte 74 / El Paseo, 73030
  El Paseo, Palm Desert, CA 92260", "Ride at your own pace 8.5-20 miles up
  Rte 74 from Starbucks and back down", regroups at "Art Smith Trailhead (mile
  4)" and "Vista Point (mile 8.5)" (detail page dated March 15, 2026). The
  club's Future view lists it every Sunday at 7:30 a.m. from Oct 4 through
  Nov 1, 2026 and on into December. That weekly listing is the open signal;
  no Starbucks page was fetched. A valley pick: the reason is that Highway 74
  starts here, and the Sunday Climbers are the one group that rides it.
  - **`ride_slug`** is the community scout's proposed slug, not yet in
    `rides.json`. Merge `research/towns/palm-springs-ca/rides-proposed.json`
    first, or `build-events.js` fails on the token and the slug.
  - The note leaves the day and time to the token, per SCHEMA.md.
- **Coffee Bean & Tea Leaf, El Paseo**: the valley's 6 a.m. ride-out. The
  club's Future view (read Oct 3, 2026) lists "6:00AM 'A' Fast Ride 30 Miles
  Drop" and "6:00AM 'B' Ride 30 Miles Regroup" every Tuesday in October, and
  "6:00AM 'B' Ride 35 Miles Regroup" every Thursday, all at Coffee Bean. The
  Tuesday B detail page gives "Coffee Bean & Tea Leaf, 73400 El Paseo Dr, 9,
  Palm Desert, CA 92260, USA" and a 17–18 mph average. I wrote the "9" as
  "#9".
  - **No token.** These rides aren't in `rides.json` and weren't proposed:
    community.md held them back under the three-rides-per-host cap. So the
    note carries the day and time by hand, the one place in this report it
    does.
  - **Editor:** if you promote the Coffee Bean B ride over one of the three
    proposed DBC rides, swap the hand-written days for a `{ride:…}` token and
    add `ride_slug`. A weekday 6 a.m. ride is the one a visitor most often
    misses.
- **Townie Bagels**: the Palm Springs pick, for the morning after a ride.
  - **Visit Palm Springs, "Sunny Dunes"** (published June 3, 2025, modified
    July 20, 2026) gives the address "650 E Sunny Dunes Road" and the
    neighborhood "just east of downtown Palm Springs ... about a 20-minute walk
    to the heart of downtown." On the food: "artisan bagels are boiled fresh
    daily", "a strong cold brew", "classic breakfast sandwiches."
  - **The Palm Springs Guys' restaurant guide** (July 23, 2026) lists it
    ("old-fashioned, water-boiled bagels") and links towniebagels.com.
  - Two 2026 signals, no hours. The street address is the bureau's; I added
    only "Palm Springs, CA". No ZIP, because no page I read printed one.
  - **Not tagged queer-owned.** Visit Palm Springs calls it "locally owned and
    proudly gay-owned." That's the bureau's wording, and the shop's own page
    didn't load. If the shop says so on its site or bio, the editor can say so
    in the note, with where it says it.
  - The obvious breakfast place too; the editor can cross-list it in
    `restaurants` (eat.md says the same).

## Rejected

- **Big Wheel Bikes CV, Palm Springs** (1590 South Palm Canyon Drive). The
  directory's one Palm Springs ride starts at the shop, and its events page
  (fetched Oct 3, 2026) names no café. Rides go up on social media, November
  to April. A shop, so it's @shop-scout's.
- **Velo Palm Springs' route pages** (Midcentury Modern loop, April 2026;
  Indian Canyons via South Palm Canyon, Dec 2023). Neither names a café. The
  Indian Canyons page says South Palm Canyon has "charming shops, cafes" and
  names only the Trading Post, for food (eat.md's lead).
- **Starbucks as a Tour sponsor** (the Tour's sponsors page links
  starbucks.com). A sponsor line names no store, so it's not a pick.
- **Dick's on Arenas, Sunday 6 a.m.** outxout (updated July 28, 2026) lists
  "Church Lady's Sunday Service ... 6 AM - 12 PM" with Bloody Marys. A bar's
  morning, not coffee for a ride.
- **The Palm Springs Post's home page** (Oct 3, 2026). No food stories.
- **Visit Palm Springs' home page.** Its five listing links are VillageFest,
  the Air Museum, the Convention Center, the Art Museum and Melvyn's. No café.

## Couldn't confirm

- **Koffi** (kofficoffee.com). This is the likeliest Palm Springs ride-out,
  and the biggest gap.
  - The Palm Springs Guys (July 2026) calls it the daily habit, with "four
    locations in town."
  - The Desert Bicycle Club's winter Monday ride, the community scout's
    `palm-desert-ca-desert-bicycle-club-palm-springs-ride`, names "Rancho
    Mirage Koffi" as its destination (club detail page, read Oct 3, 2026).
  - culture.md puts a "Koffi North" next to Just Fabulous in Uptown, from a
    2022 hotel page.
  - Both https://www.kofficoffee.com/ and https://kofficoffee.com/ were
    withdrawn on permission.
  - **Missing:** every address and every opening time.
  - **Where to look:** kofficoffee.com, each store's Google listing. The
    South Palm Canyon or Camino Real store, if there is one, would be the
    Tour-start pick.
- **Old Town Coffee, 78100 Main St, La Quinta**: the valley's on-route stop.
  - Tri-A-Bike's local-rides page (edited in 2026; it says its Saturday ride
    "starts OCTOBER 2026") lists "Palm Desert/La Quinta: 20 mile ride from
    Triabike to Old Town Coffee." It also says to "add a .6 mile jaunt from the
    north end [of the Bear Creek Trail] to go to the bike friendly Old Town
    Coffee shop at 78100 Main St, La Quinta."
  - "Bike friendly" is the shop's word for it; it names no rack or pump.
  - Held out because that one line is the only signal. No page of the café's
    own, and no listing, was fetched, so I can't say it's open.
  - **Missing:** open status, hours, a URL.
  - **Where to look:** its Google listing. routes.md asks for it too.
  - Promote it with "confirm by phone" if a 2026 listing turns up.
- **Palm Desert Bike N Brews, 73865 CA-111, Palm Desert**: the valley's
  bike-shop café, if it still exists.
  - Velo Palm Springs' shop list says "a full-service bike shop, rental
    center, e-bike dealer, and shuttle service combined with a bar and grill
    serving craft beer and coffee."
  - Palm Springs Life (January 2023) calls it "one-part bike shop and
    one-part coffee/beer bar."
  - The club calendar starts four winter rides there from Nov 2, 2026,
    including the proposed Monday Palm Springs Ride.
  - **But pdbikenbrews.com now serves an online gambling page** (fetched
    Oct 3, 2026). The domain lapsed or was taken.
  - **Missing:** proof it's open, its hours, its current site.
  - **Where to look:** its Google listing, a phone call, the club (it still
    lists the starts).
  - Hand-off to @shop-scout. If it's open, it's the "one with the pump" pick
    for this town.
- **Café La Jefa** (cafelajefa.com). The Palm Springs Guys (July 2026):
  "Latin-influenced coffeehouse energy" with an "airy patio." Not tried; the
  run was losing every business site to permission timeouts by then. Missing:
  address, hours.
- **Gré Records & Coffee**: culture.md's hand-off. A downtown café that sells
  records, women-owned per Visit Palm Springs (Aug 2026). No address or hours
  on any page either of us read.
- **An early opener near the Tour start.** None confirmed.
  - The Tour's vendor expo opens at 6 a.m. on Saturday, Feb 6, 2027, on
    South Palm Canyon Drive between Tahquitz and Baristo, and the century
    leaves at 6:30 a.m. (Tour FAQ and expo page).
  - A café on Palm Canyon open by 6 would be the pick. Koffi is the first
    place to check.
- **Hours for the two El Paseo chain stores.** Neither store page was
  fetched. Missing: whether either is open by 6 (Coffee Bean) or 7:30
  (Starbucks). Where to look: each store's Google listing or the chains'
  store locators.
- **Bike parking, a floor pump, a hose.** Not on any fetched page, for any
  pick. Bike n Brews is the one place that might have all three.
- **Trek Bicycle Palm Springs, 611 S Palm Canyon Dr** (Velo's shop list). It's
  a shop, not a café, but it's on the Tour's street. For @shop-scout: does it
  host a ride with a coffee stop?

## Sources

- https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953&action=cira&vm=Future&sif=0
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2911649&event_date_id=456578
- https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2913082&event_date_id=457247
- https://cycleclub.clubexpress.com/content.aspx?page_id=4091&club_id=400953&item_id=2905068&event_date_id=454222
- https://visitpalmsprings.com/blog/post/sunny-dunes-gayborhood/
- https://www.thepalmspringsguys.com/blog/our-favorite-restaurants-in-gay-palm-springs
- https://www.thepalmspringsguys.com/blog
- https://www.triabike.com/articles/local-rides-pg196.htm
- https://www.triabike.com/
- https://www.velopalmsprings.com/local-bike-shops/
- https://www.velopalmsprings.com/
- https://www.velopalmsprings.com/indian-canyons-cycling-route-south-palm-canyon-guide/
- https://www.velopalmsprings.com/cycling-palm-springs-midcentury-modern/
- https://www.palmspringslife.com/an-insiders-guide-to-the-coachella-valley-cycling-scene/
- https://pdbikenbrews.com (now a gambling page; read for that fact only)
- https://www.bigwheelbikescv.com/events
- https://www.tourdepalmsprings.com/
- https://tourdepalmsprings.com/event-info/
- https://tourdepalmsprings.com/routes2/
- https://tourdepalmsprings.com/event-info/vendor-expo/
- https://tourdepalmsprings.com/faq/
- https://tourdepalmsprings.com/sag-stops/
- https://tourdepalmsprings.com/event-info/sponsorship-our-sponsors/
- https://outxout.com/blog/lgbtq-guide-palm-springs
- https://visitpalmsprings.com/
- https://thepalmspringspost.com/
- cfc-site/rides/rides.json: the one Palm Springs ride (Big Wheel Bikes CV, starts at the shop)
- research/towns/palm-springs-ca/community.md and rides-proposed.json: the DBC rides, the Coffee Bean, Starbucks and Koffi hand-off
- research/towns/palm-springs-ca/routes.md: the Old Town Coffee hand-off
- research/towns/palm-springs-ca/culture.md: the Gré Records & Coffee, Townie Bagels and Koffi North leads

Tried and could not open (permission request withdrawn; not fetched any other
way): https://www.kofficoffee.com/ · https://kofficoffee.com/ ·
https://www.towniebagels.com · https://www.desertbicycleclub.org/ ·
http://www.cycleclub.com/rides · https://www.bigwheelbikes.com/ ·
https://joe.coffee/locations/ca/palm-springs/ · https://www.palmspringsca.gov/ ·
https://www.palmspringslife.com/restaurants/locals-go-to-coffee-shops-in-greater-palm-springs/
(twice; the article that would have named the Palm Springs cafés) ·
https://visitpalmsprings.com/blog/all/category/eat-%26-drink/6732a2f249ec280a092a206d/ ·
https://cvindependent.com/ ·
https://www.visitgreaterpalmsprings.com/restaurants-and-nightlife/all-restaurants/breakfast-and-brunch/

WebSearch: one call, refused: "this session has used its web search budget
(200 of 200 WebSearch calls)."
