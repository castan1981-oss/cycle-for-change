# guerneville-ca · stay-scout · 2026-11-16

Six places, each read on its own site this run. First build; no earlier
report and no `data/towns/guerneville-ca.json`.

The short version: **no Guerneville lodging page says a word about a
guest's own bike** — not in the room, not in a locked room, not a hose,
not anywhere. Ten property sites were read and searched for "bike /
bicycle / cycl / storage". So every `bike_policy` below is "No stated
policy — ask when you book." What the pages do say is that they lend
bikes: boon ("cruiser bikes available complimentary to our guests"), The
Stavrand ("cheerful yellow bicycles ... first-come, first-served"), Dawn
Ranch ("complimentary fleet of Retrospec bikes"), and AutoCamp ("Seasonal
bike rentals on property", in Rejected). Those are town cruisers, and they
are the answer to the brief's item 3. They are not a policy on your bike,
and the notes don't pretend they are.

Who takes whom matters more here than in most towns, so each note says it
in the property's words: boon is "21+ adults-only", The Highlands says
"All guests must be at least 18 years old", The Woods is "an adult-hotel
and not recommended for minors". The Stavrand says "We welcome families
with children." Cottages on River Road sells itself to families. Dawn
Ranch's pages don't say either way.

Event weekend (Cycle to Zero, May 21–23, 2027): no lodging page mentions
the ride, and the organizer's pages (per the brief) list no hotels. Two
properties state a weekend minimum on their own policy pages (The Woods,
The Highlands); that is all the guide can say. Don't write that places
fill.

Prices: two loaded from a property's own page (Cottages on River Road,
The Woods). The rest book through script engines the fetch tool could not
open, so `price_hint` is null there. Fodor's Guerneville hotel list
carries price symbols but no date; not used.

Distances: no property page links a map pin, and the fetch tool gives no
way to geocode, so nothing is measured from the brief's centre
(38.5064, -122.9908). Where a note says how far, it is the property's own
sentence, quoted as theirs. The editor or verifier should measure the six
addresses before a zone is printed. Nothing is measured from either camp.

Fetching: WebFetch only opens a domain after a search has returned it, so
the property sites were unlocked with two domain-restricted searches.
Four WebSearch calls in all, about fifty fetches. Booking engines
(ResNexus, book-it-now, innRoad, SynXis, Windsurfer) and
sonomacounty.com's listing pages were refused.

## Findings

```json
[
  {
    "name": "Cottages on River Road",
    "url": "https://cottagesonriverroad.com/",
    "booking_url": "https://live.ipms247.com/booking/book-rooms-cottageonriverroad",
    "address": "14880 River Road, Guerneville, CA 95446",
    "note": "The cheap one, and the one for the family who drove up. Studios and cottages on River Road; its own page says it is \"across the street from the river,\" Korbel is \"5 minutes\" away and Armstrong Woods \"a 12 minute drive.\" Every unit lists a \"Patio & Seating Area,\" a mini-fridge and a coffee maker; there is free parking, pay laundry and a continental breakfast. Quiet hours start at 10 pm. Nothing about bikes beyond \"biking the back roads.\" Queen Studio $79 to $219 a night on its own page (read Nov 16, 2026). Phone (707) 869-3848.",
    "price_hint": "$",
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "The Woods",
    "url": "https://russianriverhotel.com/",
    "booking_url": "https://www.book-it-now.com/russianriverhotel/",
    "address": "16484 Fourth Street, Guerneville, CA 95446",
    "note": "Cottages and cabins around a pool in the middle of town; its page says it is \"within walking distance to shops, restaurants, dancing and live entertainment.\" In its own words: \"Gay-owned,\" and \"an adult-hotel and not recommended for minors.\" Its chamber listing calls the pool clothing optional. \"Room rates span $175.00 to $510.00\" plus 14% tax (read Nov 16, 2026). Its policies say \"There is a 2 night minimum on weekends during high season more for holiday and special events.\" Nothing about bikes. Phone 707-869-0600.",
    "price_hint": "$$",
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "The Highlands",
    "url": "https://www.highlandsresort.com/",
    "booking_url": "https://res.windsurfercrs.com/ibe/index.aspx?propertyID=16828",
    "address": "14000 Woodland Dr, Guerneville, CA 95446",
    "note": "Cabins, suites and small studios in the redwoods, \"a short walking distance to downtown Guerneville\" by its own page. Adults only: \"All guests must be at least 18 years old.\" Its policies say the pool is \"NO longer clothing optional.\" Book early for an event weekend: \"2 night minimum stay on weekends\" and \"Special Event and Holiday Weekends often have 3-5 night minimum stays.\" Its outdoors page points guests to a rental outfit that delivers bikes; nothing about bringing your own. No rate loaded (Nov 2026). Phone (707) 869-0333.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "boon hotel + spa",
    "url": "https://www.boonhotels.com/",
    "booking_url": "https://boonhotels.client.innroad.com/",
    "address": "14711 Armstrong Woods Road, Guerneville, CA 95446",
    "note": "Fourteen rooms on Armstrong Woods Road, the road north to the redwood reserve. \"21+ adults-only,\" by its policies page. It lends bikes in writing: \"We have cruiser bikes available complimentary to our guests,\" and it points to a local outfit for geared bikes delivered. Queen rooms have \"private back decks.\" Saline pool and hot tub. Check-in 3 pm, 14-day cancellation. Nothing about bringing your own bike. No rate loaded (Nov 2026). Phone (707) 869-2721.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "Dawn Ranch",
    "url": "https://dawnranch.com/",
    "booking_url": null,
    "address": "16467 CA-116, Guerneville, CA 95446",
    "note": "Cabins, chalets, cottages, bungalows and glamping tents on the river; \"Our property stretches along the banks of the Russian River.\" House bikes in writing: \"Explore the town of Guerneville and the surrounding countryside with our complimentary fleet of Retrospec bikes.\" One chalet is ADA-compliant with a ground-level king bed. Restaurant and spa on site. Nothing about bringing your own bike, and nothing on children or minimum stays on the pages read. No rate loaded (Nov 2026). Phone (707) 869-0656.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "The Stavrand Russian River Valley",
    "url": "https://www.thestavrand.com/",
    "booking_url": "https://be.synxis.com/?chain=22402&hotel=46035&src=24C",
    "address": "13555 Highway 116, Guerneville, CA 95446",
    "note": "The splurge: 21 rooms in three houses on Highway 116, with a hot plated breakfast for two included, a pool, free parking and a desk staffed around the clock. Its FAQ says \"We welcome families with children.\" House bikes: \"Take out one of our cheerful yellow bicycles for a spin (first-come, first-served).\" Rooms in the Cazadero house have \"direct access to our surrounding nature\"; ask for one if the bike is coming. Nothing about bringing your own bike. No rate loaded (Nov 2026). Phone 707-869-9093.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  }
]
```

travel_links

```json
[]
```

No affiliate link is used anywhere above. The five `booking_url`s are the
properties' own booking engines, each linked from the property's own page.
Search returned Expedia and Hotels.com affiliate links for The Stavrand
and boon; none was used. The Cottages' link on its page carries a Google
Analytics tracking parameter (`?_ga=…`); it is dropped above, so the
verifier should confirm the bare URL opens. No organizer lodging page
exists to list as `official`.

## Why these

- **Cottages on River Road** — the only printed low rate in town, a patio on every unit, family-run, and no age rule. The room for the people who drove up.
- **The Woods** — in town, a walk to everything on a Saturday off the bike, a printed rate range, and a stated weekend minimum the guide can quote.
- **The Highlands** — by its own page a short walk to downtown; the clearest written minimum-stay rule for event weekends; adults only, said plainly.
- **boon hotel + spa** — the one on Armstrong Woods Road, toward the redwoods, and it lends bikes in writing. Adults 21 and up.
- **Dawn Ranch** — on the river, lends bikes in writing, the widest spread of room types, one ground-level accessible chalet.
- **The Stavrand** — the splurge, breakfast included, families welcome in writing, house bikes, 24-hour desk for a late Friday arrival.

Zones, as far as the pages go: The Woods is in town by its own words (zone
1); The Highlands says a short walk from downtown; boon is on Armstrong
Woods Road (zone 2 by street name); Cottages is on River Road five minutes
from Korbel by its own page (zone 4). Dawn Ranch and The Stavrand are both
on Highway 116; which side of town each sits on was not read off a page.
Nothing downriver in Monte Rio and nothing on the coast was looked at.

## Rejected

- **AutoCamp Sonoma** (14120 Old Cazadero Rd, autocamp.com/location/sonoma/; phone (855) 942-0792) — open; Airstreams, cabins and canvas tents. Amenities list "Seasonal bike rentals on property." Left out because its FAQ says each stay gets "one parking spot in our central parking lot which is just a short walk from your stay" and "Adventure Tents are secured via a zipper closure": a hard place to keep a good bike, and nothing says where one goes. Dogs $75 a stay. Good seventh if the editor wants one for the non-riders.
- **R3 Hotel** (16390 4th St, ther3hotel.com; 707-869-8399) — open; 23 rooms around a pool with a bar and stage. Its About page says it "is gay owned and operated and is straight friendly." The rooms are "close to our outdoor pool bar and entertainment stage," which is the wrong room the night before 85 miles. No bike words, no rate loaded. A fine pick for @culture-scout as a bar.
- **Creekside Inn & Resort** (16180 Neeley Road, creeksideinn.com; (707) 869-3623) — open; ten cabins and twelve suites "just across the river from downtown Guerneville," several with kitchens. No bike words, no rate on any page read, and its booking engine would not open. Would be the second cheap pick if a rate can be read.
- **The Rio Nido Lodge** (4444 Wood Rd, rionidolodge.com; (707) 604-8098) — chamber listing only: rooms, cabins, a restaurant and bar with live music most nights. Its own site never came up in search, so it was not read and stays out.
- **Casa Secoya**, **River Bend Resort** — names on the chamber's lodging pages; not opened.
- **Fairfield Inn & Suites Sebastopol** — on the chamber's hotel list; a different town, per the brief.
- **Mine + Farm, The Inn at Guerneville** — named on Fodor's list only; not opened.
- **Vacation rentals** — the chamber has a category page; no specific listing with a stated bike policy was found, so none is listed.

## Couldn't confirm

- **Anyone's policy on a guest's own bike.** Not stated on any of the ten property sites read. A call or email to the six picks is the only way to turn "to ask" into a policy. boon's site has no FAQ; The Stavrand's FAQ offers to "hold your belongings" before check-in but says nothing about a bike.
- **Rates** for The Highlands, boon, Dawn Ranch and The Stavrand. All four use script booking engines the tool refused. Fodor's undated symbols ($ Highlands, $$ boon and Dawn Ranch, $$$ Stavrand) are a lead, not a price.
- **Distances from the centre** for all six. No pins on the pages, no geocoder here. Measure before the build.
- **Dawn Ranch** — children, pets, minimum stay and its own booking link. Its footer names an FAQ with no link, and the guessed FAQ address was refused. Its Stay page's Reserve button points back at itself.
- **The Woods' pool.** The chamber listing (the hotel's own blurb) says clothing optional; on the hotel's site the words appear in a guest review, not its own copy. The policies page doesn't mention it. Ask before printing it as a rule.
- **The Highlands** — whether its small studio rooms share a bath (the page lists "a small bathroom and shower" and no more), its Coyote Camp tent sites, and ownership. Its LGBTQ page says it is "committed to creating a safe haven for everyone"; the chamber listing says "For over 30 years we have been a LBBTQ+ destination" (their typo). Nothing says who owns it, so it is not `queer-owned`.
- **Johnson's Beach and Camp Russian River as ordinary lodging.** Neither site came up in a search, so neither could be opened. Their addresses, cabins or tent sites, season and rates are all unread. sonomacounty.com lists "Johnson's Beach Campground"; that listing page was refused too.
- **Event weekend demand (May 21–23, 2027).** Nothing on any page beyond the two general weekend minimums. Don't state it.
- **Open status, second signal.** Each pick's own site is live with a booking button (The Woods' footer is dated 2026), and each is on the chamber's current list. No Google listing was read.
- **Ground floor, hose, bike wash.** Only what is quoted: patios at Cottages, back decks at boon, one ground-level chalet at Dawn Ranch, direct outdoor access at The Stavrand's Cazadero house. No hose anywhere.
- **A downtown point for the centre.** None of the pages read gives one. The brief's place point stands.

## Hand-offs

- @shop-scout / @logistics-scout: two lodging pages name bike rental outfits that deliver. boon's outdoors page links "Russian River Cycles" for "mountain bikes with gears delivered." The Highlands' outdoors page names "River Riders bike rental," who "will deliver your bike to you outfitted with a helmet, lock, water bottle cage." Neither outfit's own site was read. Leads only.
- @culture-scout: R3 Hotel (bar, pool stage, events on Eventbrite; "gay owned and operated" in its own words). The Rio Nido Lodge (bar, live music most nights, Wednesday locals' night, per its chamber listing). The Highlands' site has Lazy Bear and Events pages, not read.
- @eat-scout: boon's nav links Boon Eat + Drink (eatatboon.com). Dawn Ranch has a restaurant on site. The Cottages' amenities page says "Brewery with River Access Across the Street," unnamed.
- @route-scout: The Highlands' outdoors page tells guests to ride "in Armstrong Woods or out to Duncan's Mills." A lead, not a route.

## Sources

- https://russianriver.com/business-category/places-to-stay/
- https://russianriver.com/business-category/hotels-and-motels/
- https://russianriver.com/business/creekside-inn-resort/
- https://russianriver.com/business/boon-hotel-spa/
- https://russianriver.com/business/the-highlands/
- https://russianriver.com/business/r3-hotel/
- https://russianriver.com/business/the-woods/
- https://russianriver.com/business/the-stavrand/
- https://russianriver.com/business/dawn-ranch/
- https://russianriver.com/business/cottages-on-river-road/
- https://russianriver.com/business/the-rio-nido-lodge/
- https://www.sonomacounty.com/sonoma-listings/guerneville-hotels-lodging
- https://cottagesonriverroad.com/
- https://cottagesonriverroad.com/policies/
- https://cottagesonriverroad.com/amenities/
- https://cottagesonriverroad.com/area-attractions/
- https://cottagesonriverroad.com/queen-studio/
- https://www.hotelplanner.com/Hotels/127666/Reservations-Cottages-on-River-Road-Guerneville-14880-River-Rd-95446/?sc=IHS (no rate shown; nothing used)
- https://russianriverhotel.com/
- https://russianriverhotel.com/the-woods-guerneville-cottages-cabins-rates-policies/
- https://www.highlandsresort.com/
- https://www.highlandsresort.com/policies
- https://www.highlandsresort.com/cabins
- https://www.highlandsresort.com/cabins-1
- https://www.highlandsresort.com/nightlife-1
- https://www.highlandsresort.com/lgbtq
- https://www.boonhotels.com/
- https://www.boonhotels.com/boon-policies
- https://www.boonhotels.com/hiking-biking-outdoors
- https://www.boonhotels.com/rooms-at-boon
- https://dawnranch.com/chalets/
- https://dawnranch.com/stay/
- https://dawnranch.com/discover/
- https://www.thestavrand.com/our-russian-river-hotel-resort
- https://www.thestavrand.com/faq
- https://www.thestavrand.com/amenities
- https://www.thestavrand.com/guest-rooms
- https://autocamp.com/location/sonoma/
- https://autocamp.com/location/sonoma/accommodations/
- https://autocamp.com/russian-river/what-to-expect
- https://autocamp.com/faq/
- https://www.ther3hotel.com/
- https://www.ther3hotel.com/rooms-2/
- https://www.ther3hotel.com/about-us/
- https://creeksideinn.com/rooms/
- https://creeksideinn.com/room-type/suites/
- https://creeksideinn.com/getting-here/
- https://www.fodors.com/world/north-america/usa/california/napa-and-sonoma/places/guerneville/hotels (undated price symbols; not used)
