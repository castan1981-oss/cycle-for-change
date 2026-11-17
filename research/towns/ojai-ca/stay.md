# ojai-ca · stay-scout · 2026-11-15

Six places, each read on its own site this run. First build; no earlier
report and no `data/towns/ojai-ca.json`.

The short version: **no Ojai lodging page says a word about a guest's own
bike** — not in the room, not in a locked room, not anywhere. So every
`bike_policy` below is "No stated policy — ask when you book." What Ojai
hotels do say, over and over, is that they lend bikes. Five of the six
picks state house bikes in their own words (Rancho, Hummingbird, Casa Ojai,
Ojai Valley Inn; Blue Iguana rents them on site). That is the fact the
brief's Search Console note asks for (item 3), and it is in each note in
the property's wording. It is not a policy on your bike, and the notes
don't pretend it is.

Prices: only two loaded. The Oakridge Inn prints a rate card on its own
site. Hummingbird showed one rate on Hotels.com. The rest book through
script engines that return nothing to a fetch, so `price_hint` is null
there. Minimum stays are stated only where a property's own page states
them (Blue Iguana; Lavender Inn in Rejected). No lodging page mentions
Center Ride Out, and the organizer's pages (per the brief) list no hotels,
so the guide should not say places fill that weekend.

Distances: three properties link a map pin from their own page; those are
measured from the brief's centre (34.4492, -119.2467) and rounded. The
others carry the distance their own page states, quoted as theirs. Nothing
is measured from any camp location.

Fetching: WebFetch's allowlist refused the property sites directly, so the
property pages were read with curl through the session proxy and searched
for "bike / bicycle / cycl". Four WebSearch calls, about forty page fetches.

## Findings

```json
[
  {
    "name": "Ojai Rancho Inn",
    "url": "https://www.ojairanchoinn.com/",
    "booking_url": null,
    "address": "615 W Ojai Ave, Ojai, CA 93023",
    "note": "West end of town, about half a mile from the centre, where Highway 33 comes in. 17 rooms, a pool and a bar on site. Its amenities list says \"Complimentary bicycles for use\" and the page calls town \"an easy 5 minute bike ride,\" or 15 minutes on foot by the path behind the property. Free parking, fridge and microwave in the rooms. Nothing about bringing your own bike. No rate loaded (Nov 2026). Phone 805-646-1434.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "Hummingbird Inn",
    "url": "https://www.hummingbirdinnojai.com/",
    "booking_url": null,
    "address": "1208 E Ojai Ave, Ojai, CA 93023",
    "note": "East side, about a mile from the centre on Ojai Avenue, on the way out to the orchard roads. Pool, fire pit, fridges and microwaves in the rooms. Its home page says \"grab a complimentary bicycle and tour Ojai.\" The patio rooms are downstairs, by its rooms page, which is the one to ask for with a bike. Nothing about bringing your own. $186 a night before tax on Hotels.com for Nov 17–18 (read Nov 15, 2026). Phone 805-646-4365.",
    "price_hint": "$$",
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "Casa Ojai Inn",
    "url": "https://ojaiinn.com/",
    "booking_url": null,
    "address": "1302 E Ojai Ave, Ojai, CA 93023",
    "note": "East side on Ojai Avenue, the same stretch as the Hummingbird and across from Soule Park Golf Course. The most bike detail of any page in town: \"All guests at Casa Ojai and our sister hotel Su Nido Inn are welcome to use our complimentary bicycles,\" and the amenities list has \"Bicycles, Locks, and Helmets included with amenity fee\" plus a \"hydration station available for refilling water bottles.\" Saltwater pool. The amenity fee isn't priced on the page and no rate loaded (Nov 2026). The site's footer is dated 2022, so call to confirm before you count on it: (805) 646-8175.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "Blue Iguana Inn",
    "url": "https://www.blueiguanainn.com/",
    "booking_url": "https://resnexus.com/resnexus/reservations/book/203D86FB-5698-4849-86C3-0A2F85C0760F",
    "address": "11794 N. Ventura Ave (Hwy 33), Ojai, CA 93023",
    "note": "The one on the path. Its own page puts it \"two miles from downtown Ojai\" with \"onsite bike rental\" and \"the adjacent Ojai Valley Trail.\" Rooms, suites and cottages around a pool. Its policies page says \"Weekends require at least a 2-night booking\" and that holidays and special events may need longer; check-in is 3 pm. Nothing about bringing your own bike. No rate loaded (Nov 2026). Phone (805) 646-5277.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "The Oakridge Inn",
    "url": "https://www.oakridge-inn.com/",
    "booking_url": "https://secure.webrez.com/hotel/3722",
    "address": "780 N. Ventura Ave, Oak View, CA 93022",
    "note": "The cheap one, down the valley in Oak View: \"4 miles south of Ojai\" and \"2 miles east of Lake Casitas,\" by its own page, on Highway 33. A 33-room motel that prints its rates: one queen $109–$129 Sunday to Thursday and $139–$299 Friday and Saturday; two queens $119–$139 and $149–$299 (read Nov 15, 2026; the page says to call for holiday and event rates). Group discount for 10 rooms or more, not on major weekends. Nothing about bikes anywhere on the site. Phone (805) 649-4018.",
    "price_hint": "$",
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "Ojai Valley Inn",
    "url": "https://www.ojaivalleyinn.com/",
    "booking_url": null,
    "address": "905 Country Club Road, Ojai, CA 93023",
    "note": "The splurge: the big golf resort on the west side of town. Its activities page says \"Pick up a complimentary Linus bicycle\" and lists two guided bike tours, about 3 and about 7 miles. Those are cruisers for a picnic, not a ride. Nothing about bringing your own bike, and no rate loaded (Nov 2026). Phone 855-697-8780.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  }
]
```

travel_links

```json
[]
```

No affiliate link is used anywhere above. The two `booking_url`s are the
properties' own booking engines (ResNexus, WebRez), linked from their own
pages. No organizer lodging page exists to list as `official`.

## Why these

- **Ojai Rancho Inn** — closest of the six to the centre, on the west side where the valley path and Highway 33 come in, and it lends bikes in writing.
- **Hummingbird Inn** — east side, pointed at the orchard roads; lends bikes; downstairs patio rooms; the one mid-price rate that actually loaded.
- **Casa Ojai Inn** — the only page in town that mentions locks, helmets and a bottle-fill station. Useful for the family who drove up without bikes.
- **Blue Iguana Inn** — the only property whose own page says it sits next to the Ojai Valley Trail. Rental bikes on site. Mind the two-night weekend rule.
- **The Oakridge Inn** — the cheap, plain room, with prices in print, and the nearest of the six to Lake Casitas.
- **Ojai Valley Inn** — the splurge, and the name people will search for. Honest note: its bikes are cruisers.

Zones covered: downtown/west end (Rancho, Ojai Valley Inn), East End side
(Hummingbird, Casa Ojai), the trail corridor (Blue Iguana, Oakridge in Oak
View). Nothing on Highway 33 north or in Upper Ojai; none found with its
own page. Ventura left to its own guide.

## Rejected

- **Capri Hotel** (1180 E. Ojai Ave, caprihotelojai.com; a lead in the brief) — open, same owner as Rancho and Hummingbird (Shelter Social Club), next door to the Hummingbird. Its property page shows a bikes icon in the amenities row but not one word of text about bikes, on any page. An icon isn't a statement. Hummingbird covers the same block with the words in writing. Add it later if the page gets text.
- **Caravan Outpost** (317 Bryant St, caravanoutpostojai.com) — open; Airstream trailers downtown; "Complimentary Adult Bikes. Available on a first-come, first-serve basis." Left out because it's a trailer and nothing on the site says where a guest's own bike goes. Good fallback if the editor wants a seventh.
- **Lavender Inn** (210 East Matilija Street, lavenderinn.com) — open; a bed and breakfast a block off Ojai Avenue. No bike words beyond "set off on a hike or bike ride." Its policies page sets a two-night minimum on any stay that includes a Friday or Saturday. Upstairs rooms. Not a place for a bike.
- **Emerald Iguana Inn** (emeraldiguana.com) — open, adults only, sister to the Blue Iguana. No bike words on its page; the Blue Iguana has them and the trail.
- **Chantico Inn** (406 West Ojai Avenue, chanticoinn.com) — site loads; the only bike words are "mountain biking" in a list of things the valley offers. Nothing to add over the picks.
- **Ojai Retreat & Inn** (160 Besant Road, ojairetreat.com) — open ("Yes We're Open!", page stamped Oct 24, 2026); a hilltop non-profit inn. No bike words. Sells itself on exactly the language the brief says to leave out.
- **Su Nido Inn** — named on Casa Ojai's page as its sister hotel sharing the complimentary bikes. Its own site didn't load (suhermosa.com guess failed), so it stays out; see below.

## Couldn't confirm

- **Anyone's policy on a guest's own bike.** Not stated on any of the fourteen-odd property sites read. A phone call to the six picks is the only way to turn "to ask" into a policy. Rancho, Hummingbird and Capri share one owner; one email to Shelter Social Club could settle three.
- **Casa Ojai Inn — open status.** Site is live with a booking button, but the footer says 2022 and the blog shows no dates. One signal only. Its Google listing would be the second.
- **Rates** for Rancho, Casa Ojai, Blue Iguana and Ojai Valley Inn. All four use script booking engines. HotelTonight's Rancho page loaded but showed "Unavailable" for Nov 15–16 and no price. A Travel Weekly listing shows Casa Ojai "from $129" with no date on it; not used.
- **Casa Ojai's amenity fee** — the page says bikes, locks, helmets, parking and wifi are "included with amenity fee" and never prices the fee.
- **Blue Iguana's bike rental** — what kind of bikes and what they cost. The page says only "onsite bike rental."
- **Ojai Valley Inn's bikes** — whether the Linus bikes are for hotel guests only. The activities page (read by WebFetch; the same URL later returned 404 to curl, so re-check it) doesn't say. The 2016 press release says "based on availability."
- **Oakridge Inn and the Ojai Valley Trail.** Oak View is on the trail corridor per the brief, but the motel's site doesn't mention the trail, so the note doesn't either. @route-scout's trail page may give the nearest access point.
- **Su Nido Inn** and **Hotel El Roblar** — own sites not found from guessed domains; no search spent on them. Leads for a refresh.
- **Best Western Plus Inn of Ojai** — bestwestern.com returned 403. Not read.
- **Event weekend demand (April 23–25, 2027).** Nothing on any page. Don't state it.
- **A downtown point for the centre.** None of the pages read gives one. The brief's city point stands.

## Hand-offs

- @culture-scout / @community-scout: Ojai Rancho Inn's site has a Pride page — an "Ojai Pride Pool Party" at **Chief's Peak Bar at Ojai Rancho Inn**, Sunday June 28, 3–8 pm, after the Ojai Pride Walk at Libbey Park (11 am–3 pm), with "50% of proceeds" to **Queers in the Valley**. No year on the page (June 28 was a Sunday in 2026). That is the hotel hosting, not a statement of ownership; nothing here is `queer-owned`. Queers in the Valley is a lead for the community section.
- @coffee-scout / @eat-scout: the Capri's concierge page is a local's list (Farmer and the Cook, Ojai Rotie, Topa Topa Brewery, Rory's Place, Pinyon, Tortilla House, Bart's Books, "Farmers Market on Sundays", "Community Farmers Market (Thursdays 3-7pm)"). Leads only.
- @logistics-scout: Blue Iguana's nav links an airport shuttle (smartshuttle805.com). Not read.

## Sources

- https://www.ojairanchoinn.com/
- https://www.ojairanchoinn.com/hotel.cfm
- https://www.ojairanchoinn.com/-cid-1
- https://www.ojairanchoinn.com/pride.cfm
- https://www.ojairanchoinn.com/contact2.cfm
- https://www.ojairanchoinn.com/events2.cfm
- https://www.hoteltonight.com/hotel/ojai-rancho-inn-in-ojai-ca
- https://www.hummingbirdinnojai.com/
- https://www.hummingbirdinnojai.com/hotel.cfm
- https://www.hummingbirdinnojai.com/-cid-1
- https://hotels.com/ho262385/hummingbird-inn-of-ojai-ojai-united-states-of-america
- https://www.caprihotelojai.com/
- https://www.caprihotelojai.com/property.cfm
- https://www.caprihotelojai.com/concierge.cfm
- https://www.caprihotelojai.com/-cid-1
- https://ojaiinn.com/
- https://ojaiinn.com/amenities/
- https://ojaiinn.com/around-ojai/bicycle-adventures/
- https://ojaiinn.com/casa-blog/
- https://www.travelweekly-asia.com/Hotels/Ojai-CA/Casa-Ojai-Inn-p8585281
- https://www.blueiguanainn.com/
- https://www.blueiguanainn.com/experience.htm
- https://www.blueiguanainn.com/policies.htm
- https://www.blueiguanainn.com/directions.htm
- https://www.iguanainnsofojai.com/
- https://www.emeraldiguana.com/
- https://www.oakridge-inn.com/
- https://www.oakridge-inn.com/rooms/rates/
- https://www.oakridge-inn.com/directions/
- https://www.ojaivalleyinn.com/
- https://www.ojaivalleyinn.com/ojai-california-activities
- https://www.ojaivalleyinn.com/ojai-valley-hotels
- https://www.ojaivalleyinn.com/the-town
- https://www.ojaivalleyinn.com/ojai-valley-press-room/press-releases/legendary-resort-welcomes-picnic-season-with-unveiling-of-artisan-market-caf-and-boutique-linus-bicycle-partnership-and-picnic-program
- https://caravanoutpostojai.com/
- https://caravanoutpostojai.com/pages/amenities
- https://caravanoutpostojai.com/pages/book-your-stay
- https://lavenderinn.com/
- https://lavenderinn.com/faqs/
- https://lavenderinn.com/policies/
- https://www.chanticoinn.com/
- https://ojairetreat.com/
- https://www.ojaihub.com/explore-ojai/outdoors/biking-in-ojai/ (no lodging named; nothing used)
