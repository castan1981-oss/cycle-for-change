# palm-springs-ca · coffee-scout · 2026-10-04 (second pass; replaces the Oct 3 report)

Six cafés, every one with hours from its own page or its chain's store page,
except the Starbucks (two listings, and they disagree). The gaps from Oct 3
are closed: Koffi's site opened, so the early café near the Tour de Palm
Springs start is in (Koffi Central on Tahquitz Canyon Way, 6:30 a.m. daily);
the two Palm Desert ride-out stores have hours (Coffee Bean is open at 5:30
on weekdays, before the club's 6 a.m. roll-out); Townie Bagels has hours
(6:30 to noon, closed Tuesday). The three Oct 3 picks are kept with their
facts; what changed is the hours and the sources. Old Town Coffee in La
Quinta looks closed; Main Street Coffee sits at the same address.

How this run went:

- Search worked (14 calls, all used). The fetch tool opens a URL only after
  it came back in a search result; every direct fetch of a business site was
  withdrawn on permission first, then opened after a search. Yelp, Apple Maps
  and blackbookbar.com refuse crawlers (robots.txt), so none of those were
  read.
- No geocoder page was fetched, so the brief's centre (33.8303, -116.5453)
  is still unconfirmed and no distance is measured from it. Where a note
  says "on the Tour's cross street" it's from the addresses, not a measure.
- Bike parking, a pump, a hose: not on any page fetched, for any pick.

## Findings

```json
[
  {
    "name": "Koffi Palm Springs Central",
    "url": "https://kofficoffee.com/pages/palm-springs-central",
    "address": "650 E Tahquitz Canyon Way, Palm Springs, CA 92262",
    "note": "The early coffee on the morning of the Tour de Palm Springs: open at 6:30 every day, on Tahquitz Canyon Way, the cross street of the Tour's start on South Palm Canyon. Koffi is the valley's own roaster, with five cafés; this one is the bakery for all of them, in Kaptur Plaza near the Convention Center, with an outdoor patio facing the San Jacintos. Nothing on its page about bike parking.",
    "hours_hint": "6:30 a.m. to 5:30 p.m. daily",
    "ride_out": false
  },
  {
    "name": "Koffi Rancho Mirage 111 Café",
    "url": "https://kofficoffee.com/pages/rancho-mirage",
    "address": "71-380 Highway 111, Rancho Mirage, CA 92270",
    "note": "The coffee at the turnaround of {ride:palm-desert-ca-desert-bicycle-club-palm-springs-ride|the Desert Bicycle Club's winter ride to Palm Springs}: the club's own page names Koffi in Rancho Mirage as the destination. The roastery is here, on Highway 111 three blocks west of The River. Open 6:30 to 5:30 every day. Nothing on its page about bike parking.",
    "hours_hint": "6:30 a.m. to 5:30 p.m. daily",
    "ride_out": true,
    "ride_slug": "palm-desert-ca-desert-bicycle-club-palm-springs-ride"
  },
  {
    "name": "The Coffee Bean & Tea Leaf, El Paseo",
    "url": "https://www.coffeebean.com/store/ca/palm-desert",
    "address": "73400 El Paseo Dr, Palm Desert, CA 92260",
    "note": "The valley's weekday ride-out: the Desert Bicycle Club's Tuesday and Thursday rides leave from here at 6 a.m. in winter (club calendar, Oct 2026), and the store is open by then: 5:30 a.m. on weekdays, 6 on weekends, per the chain's store page. A chain, at El Paseo and San Pablo in Palm Desert. Nothing on bike parking.",
    "hours_hint": "5:30 a.m. to 7 p.m. Monday to Friday; 6 a.m. to 7 p.m. Saturday and Sunday",
    "ride_out": true
  },
  {
    "name": "Starbucks, Highway 74 and El Paseo",
    "url": null,
    "address": "73030 El Paseo, Palm Desert, CA 92260",
    "note": "Where Highway 74 meets El Paseo in Palm Desert, and the start of {ride:palm-desert-ca-desert-bicycle-club-sunday-climbers|the Desert Bicycle Club's Sunday Climbers}: up Highway 74 at your own pace and back down, regrouping at the Art Smith Trailhead (mile 4) and the Vista Point (mile 8.5), per the club. A chain store with a patio; it's here because the climb leaves from it. Two listings give different hours and neither is the store's own, so check; both have it open before the ride.",
    "hours_hint": null,
    "ride_out": true,
    "ride_slug": "palm-desert-ca-desert-bicycle-club-sunday-climbers"
  },
  {
    "name": "Townie Bagels",
    "url": "https://www.towniebagels.com/",
    "address": "650 E Sunny Dunes Rd, Palm Springs, CA 92264",
    "note": "Breakfast after the ride in Palm Springs: water-boiled bagels, breakfast sandwiches and cold brew in the Sunny Dunes neighborhood east of downtown. Open 6:30 a.m. to noon, closed Tuesday (its own page), so it's early enough for a ride-out but gone by lunch. Taqueria Tlaquepaque is in the same plaza. Nothing on its page about bike parking.",
    "hours_hint": "6:30 a.m. to noon; closed Tuesday",
    "ride_out": false
  },
  {
    "name": "Main Street Coffee, Old Town La Quinta",
    "url": "https://oldtownlaquinta.com/main-street-coffee-company/",
    "address": "78100 Main St, Suite 102, La Quinta, CA 92253",
    "note": "The east-valley stop: Tri-A-Bike's 20-mile ride from the shop ends at the coffee in Old Town La Quinta, about 0.6 mile from the north end of the Bear Creek Trail (the shop's rides page). The shop names Old Town Coffee at this address; the center's own page now lists Main Street Coffee there, open 7 a.m. to 2 p.m. daily. Nothing on bike parking.",
    "hours_hint": "7 a.m. to 2 p.m. daily",
    "ride_out": false
  }
]
```

## Why these

- **Koffi Palm Springs Central**: the early café near the Tour start, the
  brief's first ask. The Tour starts on South Palm Canyon at Tahquitz
  (organizer's routes page); the expo opens at 6 a.m. and the century leaves
  at 6:30 (Tour FAQ, read Oct 3). Koffi's locations page gives "6:30am to
  5:30pm" at every café, and the Central page adds the address, the phone
  (760) 318-0145, Kaptur Plaza, the bakery and commissary, and the "outdoor
  patio". Koffi's own words: "a beloved independent coffee company based in
  Coachella Valley." The street-level distance to the start line isn't
  measured; it's the same cross street, read off the addresses.
  - **Koffi Palm Springs South** (1700 S Camino Real, next to the Ace Hotel,
    (760) 322-7776, same hours) is the other candidate: it's the café by
    King's Highway (eat.md) and the south end of town, where Big Wheel Bikes'
    store is. Left out to hold the section at six; the editor can swap it in
    for Main Street Coffee if La Quinta is too far for this guide.
  - **Koffi North** (515 N Palm Canyon Dr, (760) 416-2244, "outdoor courtyard
    seating") is the Uptown one culture.md mentions. Same hours. Not a pick;
    Central is nearer the Tour.
- **Koffi Rancho Mirage**: the destination of a ride that's in rides.json
  (`palm-desert-ca-desert-bicycle-club-palm-springs-ride`, which names
  "Koffi in Rancho Mirage as the destination"). Address, phone and hours from
  Koffi's Rancho Mirage page. The ride starts at Bike n Brews in Palm Desert;
  the café is where it turns.
- **The Coffee Bean & Tea Leaf, El Paseo**: coffeebean.com's Palm Desert
  store page: "73400 El Paseo Dr", "5:30 AM - 7:00 PM" Monday to Friday,
  "6:00 AM - 7:00 PM" Saturday and Sunday. That answers Oct 3's question: the
  store is open before the club's 6 a.m. rides. The club's October 2026
  calendar (read Oct 3) lists "6:00AM 'A' Fast Ride 30 Miles Drop" and
  "6:00AM 'B' Ride 30 Miles Regroup" every Tuesday and "6:00AM 'B' Ride 35
  Miles Regroup" every Thursday from this store. The Oct 3 report wrote the
  address with "#9"; the chain's page has no suite, so it's dropped.
  - **No token.** These rides aren't in rides.json (community.md held them
    back under the three-per-host cap), so the day and time are typed by
    hand, against SCHEMA.md's rule. **Editor:** if the Coffee Bean rides get
    merged, swap the hand-written line for a `{ride:…}` token and add
    `ride_slug`. A weekday 6 a.m. ride is what a visitor most often misses.
- **Starbucks, Highway 74 and El Paseo**: the ride-out for the climb. The
  club's ride page (read Oct 3): "Starbucks - Rte 74 / El Paseo, 73030 El
  Paseo, Palm Desert, CA 92260", Sundays 7:30 a.m. from Oct 4, 2026. Now in
  rides.json as `palm-desert-ca-desert-bicycle-club-sunday-climbers`, so the
  token and `ride_slug` are live.
  - **Hours stay null.** The store's own page never came back in a search,
    and Yelp and Apple Maps refuse crawlers. storeopeninghours.com says
    "4:30 am - 7:00 pm" every day; Tripadvisor says "5:00 AM - 9:00 PM" every
    day (and its newest review is from 2019). Neither is dated; they can't
    both be right. Tripadvisor confirms a patio. Both open before 7:30, which
    is all the ride needs, and the note says so.
  - routes.md's second pass carries the climb itself (Highway 74, Palms to
    Pines) with the same `ride_slug`.
- **Townie Bagels**: its own page now. "650 East Sunny Dunes Rd, Palm
  Springs, CA 92264", "(760) 459-4555", hours "6:30 am/12 Noon" every day but
  "Tues: CLOSED". Open at 6:30 means it works as a ride-out too, but no ride
  starts there, so `ride_out` stays false.
  - **Still not tagged queer-owned.** Visit Palm Springs (July 2026) calls it
    "locally owned and proudly gay-owned"; the shop's own page says nothing
    about ownership. The bureau's wording isn't the business's, so it stays
    out of the note.
  - Cross-list in `restaurants` as the after-ride breakfast; eat.md puts
    Taqueria Tlaquepaque's second store in the same plaza (650 E Sunny Dunes,
    Ste 5).
- **Main Street Coffee, Old Town La Quinta**: Tri-A-Bike's local-rides page
  (read Oct 3) sends its 20-mile ride to "the bike friendly Old Town Coffee
  shop at 78100 Main St, La Quinta". Yelp's search title for Old Town Coffee
  Company reads "CLOSED" (March 2026) — a title, not a fetched page. The
  shopping center's own page lists Main Street Coffee at "78100 Main Street,
  Suite 102", "(760) 289-6283", "Open Daily from 7:00am to 2:00pm". So the
  address the shop's ride goes to still has a café, and this is it. The note
  says the shop's name for it and the center's; it doesn't claim one replaced
  the other (see Couldn't confirm). "Bike friendly" was the shop's word for
  the old café and isn't carried over.

## Rejected

- **Koffi Cathedral City Café & Drive-Thru**, 67260 Ramon Rd, (760) 656-0025,
  same hours. A drive-through on Ramon Road; no ride or route goes there.
- **Koffi North and Koffi South**: see Why these. Same company, same hours;
  Central is the Tour pick.
- **Starbucks at 73520 El Paseo** (a second El Paseo store in the Yelp
  results). Not the club's start; the club names 73030.
- **Big Wheel Bikes CV, Palm Springs** (1590 S Palm Canyon Dr). The shop's
  events page (Oct 3) names no café; @shop-scout's.
- **Velo Palm Springs' route pages**: none names a café (Oct 3).
- **Starbucks as a Tour sponsor**: a sponsor line, not a store.
- **Dick's on Arenas, Sunday 6 a.m.** (outxout, July 2026): a bar's morning.
- **Visit Palm Springs' and the Palm Springs Post's home pages** (Oct 3): no
  café.

## Couldn't confirm

- **Starbucks, 73030 El Paseo: its hours.** See Why these. Missing: the
  store's own locator page. Where to look: starbucks.com/store-locator (the
  URL never came back in a search, so it couldn't be fetched here) or a call
  to the store; Tripadvisor prints +1 760-674-1111, storeopeninghours.com
  prints 760-340-9429.
- **Old Town Coffee Company → Main Street Coffee.** The Yelp title says
  "CLOSED" and the center lists Main Street Coffee at the same address with
  an Instagram @mainstreetcoffeelq, but no fetched page says one became the
  other. Missing: a line from either business. Where to look: Main Street
  Coffee's Instagram, Tri-A-Bike (update its rides page), a call.
- **Palm Desert Bike N Brews, 73865 CA-111, Palm Desert.** The start of the
  club's Monday Palm Springs Ride (in rides.json). Its domain served a
  gambling page on Oct 3. Not re-checked this run; @shop-scout has it. If
  it's open, it's the one with the pump and the bike-shop café.
- **Café La Jefa** (cafelajefa.com) and **Gré Records & Coffee**: Palm
  Springs leads from Oct 3 (the Palm Springs Guys, Visit Palm Springs). Not
  searched this run; the budget went to the picks. Missing: address, hours.
- **Bike parking, a floor pump, a hose.** Not on any fetched page, for any
  pick.
- **Distances from downtown.** No geocoder page fetched.

## Sources

- https://kofficoffee.com/pages/locations-index
- https://kofficoffee.com/pages/visit-cafes
- https://kofficoffee.com/pages/palm-springs-central
- https://kofficoffee.com/pages/palm-springs-south
- https://kofficoffee.com/pages/rancho-mirage
- https://www.coffeebean.com/store/ca/palm-desert
- https://www.towniebagels.com/
- https://oldtownlaquinta.com/main-street-coffee-company/
- https://www.storeopeninghours.com/starbucks-73030-el-paseo-palm-desert-ca/amp
- https://www.tripadvisor.com/Restaurant_Review-g32846-d4259931-Reviews-Starbucks-Palm_Desert_Greater_Palm_Springs_California.html
- Read Oct 3, 2026 (the first pass; facts carried over): https://cycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=400953&action=cira&vm=Future&sif=0 · https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2911649&event_date_id=456578 · https://cycleclub.clubexpress.com/content.aspx?page_id=4002&club_id=400953&item_id=2913082&event_date_id=457247 · https://www.triabike.com/articles/local-rides-pg196.htm · https://visitpalmsprings.com/blog/post/sunny-dunes-gayborhood/ · https://www.thepalmspringsguys.com/blog/our-favorite-restaurants-in-gay-palm-springs · https://tourdepalmsprings.com/routes2/ · https://tourdepalmsprings.com/faq/ · https://tourdepalmsprings.com/event-info/vendor-expo/ · https://www.bigwheelbikescv.com/events
- cfc-site/rides/rides.json: the five Palm Desert / Palm Springs rides (Desert Bicycle Club ×3, Tri-A-Bike, Big Wheel Bikes), merged Oct 3
- research/towns/palm-springs-ca/routes.md, culture.md, community.md (Oct 3)

Refused by robots.txt (not fetched any other way): https://www.yelp.com/biz/starbucks-palm-desert-21 ·
https://www.yelp.com/biz/townie-bagels-bakery-cafe-palm-springs ·
https://maps.apple.com/place?place-id=I7181A18B5F118489 · https://maps.apple.com/place?place-id=I563CC279074D254F

Withdrawn on permission before a search gave provenance (then opened after one): https://www.kofficoffee.com/ · https://www.towniebagels.com/

WebSearch: 14 calls (the cap), shared across coffee, eat and routes.
