# los-angeles-ca · stay-scout · 2026-09-30

Six places to sleep with a bike, spread across four of the brief's zones plus
the Westwood ride start. Every property page was fetched this run. One
place puts its bike policy in writing (the hostel); the other five say
nothing about your own bike on their own page, so they carry the honest
line. Prices are only where a number was on a page: the hostel and the
Hermosa hotel. The hotel booking engines (SynXis, IHG, Marriott) don't
render in a fetch, and Hostelworld and Yelp refused, so four rates are
null. The Center Ride Out site publishes no host hotel or room block.
Distances are the pages' own words; no hotel page gave coordinates, so
nothing here is measured from City Hall.

## Findings

```json
[
  {
    "name": "HI Los Angeles Santa Monica Hostel",
    "url": "https://www.hiusa.org/find-hostels/california/santa-monica-1436-2nd-street",
    "booking_url": null,
    "address": "1436 2nd Street, Santa Monica, CA 90401",
    "note": "Downtown Santa Monica, 0.4 mi from the pier by the hostel's own page; the beach path passes the pier. The one place this run found with the bike policy in writing: free bicycle storage, with an e-bike rule (only UL- or EN 15194-certified e-bikes are stored, and nothing charges inside the building). Beds from $35 (HI's own site, Sept 2026); dorms of 4 to 10 beds and private rooms; elevator, shared kitchen, lockers; check-in 3 p.m., out 11 a.m.; no parking (the P6 structure across the street is $20 to $25 a day, the Civic Center structure $5 to $14 and a 10-minute walk). Book on the hostel's page.",
    "price_hint": "$",
    "bike_policy": "There is free bicycle storage at the hostel."
  },
  {
    "name": "Inn at Venice Beach",
    "url": "https://www.innatvenicebeach.com/",
    "booking_url": "https://be.synxis.com/?Hotel=101034&Chain=5335",
    "address": "327 Washington Boulevard, Venice, CA 90292",
    "note": "Washington Blvd in Venice, two blocks from the beach and boardwalk by its own page. The beach path runs on-street along Washington Blvd here, between Admiralty Way and the sand, so you roll out the door onto it. Nothing about bikes on the inn's own page; the owner's chain page says Pacifica Hotels \"invites you (and your bike) to vacation like a champion\" and that rental bikes are available. No rate shown (Sept 2026).",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "The Ambrose Hotel",
    "url": "https://www.ambrosehotel.com/",
    "booking_url": "https://reservations.ambrosehotel.com/3549",
    "address": "1255 20th Street, Santa Monica, CA 90404",
    "note": "Mid-city Santa Monica on 20th St, the nearest hotel this run found to 26th St & San Vicente Blvd, where Velo Club La Grange's five weekday rides leave at 6:30 a.m. The page offers beach cruisers to borrow \"based on availability\"; it says nothing about your own bike. No rate shown (Sept 2026).",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "Kimpton Hotel Palomar Los Angeles Beverly Hills",
    "url": "https://www.ihg.com/kimptonhotels/hotels/us/en/hotel-palomar-la-beverly-hills/laxwp/hoteldetail",
    "booking_url": null,
    "address": "10740 Wilshire Boulevard, Los Angeles, CA 90024",
    "note": "Wilshire Blvd in Westwood, the same ZIP as Raymond Fouquet Square, where the Saturday La Grange Nichols Canyon ride starts at 8 a.m. No bike line on the page. No rate shown; self-parking $55 a day, valet $77 (Sept 2026). Book on the hotel's page.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "Kimpton Everly Hotel",
    "url": "https://www.ihg.com/kimptonhotels/hotels/us/en/everly-hotel-los-angeles-ca/laxgy/hoteldetail",
    "booking_url": null,
    "address": "1800 Argyle Ave, Los Angeles, CA 90028",
    "note": "Hollywood, below the hills; the page sells views of the Hollywood Hills, and Griffith Park is the near end of a ride out from here. No bike line on the page. No rate shown; valet parking $75 plus tax a night (Sept 2026). Book on the hotel's page.",
    "price_hint": null,
    "bike_policy": "No stated policy — ask when you book"
  },
  {
    "name": "Sea Sprite Beach Club",
    "url": "https://www.seaspritebeachclub.com/",
    "booking_url": "https://res.windsurfercrs.com/ibe/details.aspx?hotelID=15910",
    "address": "1016 The Strand, Hermosa Beach, CA 90254",
    "note": "On the Strand in Hermosa Beach; the Strand is the beach path here, and the page says \"direct access to The Strand's 22-mile oceanfront path.\" Heading south, the path leaves the sand at First Ave for the roll to Redondo Pier and the Donut start. The page's only bike line is about local rentals. Starting rate shown $287 (Sept 2026), after a 2025 remodel; parking and elevator are not on the page.",
    "price_hint": "$$$",
    "bike_policy": "No stated policy — ask when you book"
  }
]
```

travel_links

```json
[]
```

## Why these

- **HI Los Angeles Santa Monica Hostel** — Zone 1, the Westside and the coast. The cheap, clean bed a few blocks from the beach path, and the only place in LA this run found that says in writing where the bike sleeps. The e-bike sticker rule matters if you're bringing one.
- **Inn at Venice Beach** — Zone 1. The beach path's on-street leg is Washington Blvd; this sits on it, two blocks from the sand. The chain's "you (and your bike)" line is the nearest thing to a welcome any hotel here published, but it's the chain talking, not this inn's page; confirm the room before you book.
- **The Ambrose Hotel** — Zone 1, the weekday start. La Grange's Tuesday-to-Friday 6:30 rides leave from 26th & San Vicente; this is the closest hotel found, on 20th St. Loaner cruisers, nothing said about your own bike.
- **Kimpton Hotel Palomar** — Westwood, the Saturday start. Raymond Fouquet Square (the Nichols Canyon ride, 8 a.m.) is in the same ZIP. Parking is $55 to $77 a day, so the rider without a car does better here than the one with.
- **Kimpton Everly Hotel** — Zone 3, Griffith Park. The fetched Hollywood option nearest the park; Los Feliz and Burbank would be closer and could not be fetched this run (see Couldn't confirm). Valet-only at $75 a night.
- **Sea Sprite Beach Club** — Zone 5, the South Bay. Front door on the Strand, the beach path itself; the Donut start in Redondo is a short roll south. The splurge of the list at $287 and up.

## Rejected

- **The Kinney Venice Beach** (737 Washington Blvd) — fetched. Same chain (Pacifica) and same street as the Inn at Venice Beach, farther from the sand; its only bike line is "Beach Cruiser Rentals." Take it if the Inn is full; not listed twice.
- **Hotel Dena** (303 Cordova St, Pasadena) — fetched. No bike text, no rate on the page, and the brief says a Pasadena pick needs a reason; nothing on the page gave one. Pasadena gets its own guide. Kept as a Zone 4 lead below.
- **Bikabout's LA list** (Ace DTLA, AKA Beverly Hills, Kimpton Everly, Palomar, Wilshire, La Peer) — fetched. Every entry is a loaner-bike amenity behind an affiliate link (anrdoezrs.net) to TripAdvisor or IHG, not a bring-your-own policy. Used for leads only; the two Kimpton pages fetched here carry no bike text of their own.
- **Kimpton Hotel Wilshire, Kimpton La Peer, AKA Beverly Hills** — not fetched. Same chain-amenity story as above; no reason to spend a fetch on a third Kimpton page after two came back empty.
- **Ace Hotel Downtown LA** — not fetched. Downtown is not a riding zone in the brief.
- **Short-term rentals** — none found with a stated bike policy and its own URL, so none listed. "There are Airbnbs" is not a listing.
- **Yelp, Hostelworld, hotels.com, TripAdvisor** — booking and review sites; Yelp is blocked by robots.txt and the Hostelworld fetch was refused. Never a source of record here anyway.

## Couldn't confirm

- **A Center Ride Out host hotel or room block.** The event site's main page (read Sept 30, 2026) has none. It describes a three-day, 200-plus-mile supported ride from Los Angeles to Ojai and back, with camping ("camp with your friends"), and its FAQ says logistics like "shipping my bike, hotel discounts, what to pack" live in a Participant Guide on Google Drive that was not linked in the page content; the page lists alexi.zagar@lalgbtcenter.org for questions. The 2026 edition ran April 24–26; 2027 registration is open. Where to look: the participant guide, the Center's rider emails, and whether the start is at the Center's campus (not on the page).
- **Midweek rates** for the Inn at Venice Beach, the Ambrose, the Palomar and the Everly. None of the four pages shows a number, and the booking engines (SynXis, IHG, Marriott) don't render in a fetch. Where to look: open each `booking_url` (or the IHG page) for a Tuesday in the target month and read the price.
- **HI Santa Monica's storage itself** — the FAQ says "free bicycle storage" and no more: not whether it's a locked room, a rack, or the room. Where to look: the hostel's phone, or the group-travel page's contact. Also the midweek dorm price beyond "from $35."
- **Whether the Kimptons still lend bikes** — Bikabout says "complimentary Public bikes" at the Palomar and "Complimentary Bikes" at the Everly; neither hotel's own page says it. Ask at the desk.
- **A Zone 2 stay (the Santa Monica Mountains / Malibu).** Nothing fetched. The Latigo loop starts at Civic Center Way near Pepperdine; the Mulholland ClimbFest (April 10, 2027) rider guide from Planet Ultra may name where riders sleep. Where to look: hotels along PCH near the Malibu civic center, the ClimbFest site.
- **A closer Zone 3 stay (Los Feliz / Silver Lake / Burbank).** The Safari Inn in Burbank, a motel by the Zoo-lot side of Griffith Park, could not be fetched (safariburbank.com did not resolve). Where to look: the Coast Hotels site for the Safari Inn, Hotel Covell (Los Feliz), Silver Lake Pool & Inn.
- **Zone 4 (Pasadena / the San Gabriels).** Hotel Dena fetched with no bike text. Where to look: the hotels within a few blocks of Incycle Pasadena (175 S Fair Oaks Ave), where the FOO CHOW ride leaves; the shop may know where visiting riders stay. Glendora, where GMR starts, was not searched.
- **A cyclist-run guesthouse.** None found in Los Angeles this run.
- **Parking cost and elevator** at the Sea Sprite, the Inn at Venice Beach and the Ambrose — not on their pages.
- **Open status, second signal.** Every listed page is live and taking bookings (Sept 30, 2026); the Yelp and Google listings that would give a second signal were not fetchable here. The verifier can phone.

## Hand-offs

- **@town-editor / calendar:** the Center Ride Out site describes a three-day ride (the 2026 edition was April 24–26). The calendar carries April 23, 2027 as a single date; check `end_date` and the `/guides/center-ride-out/` page against the event site.
- **@logistics-scout:** car parking near the Santa Monica end of the beach path, from the hostel's FAQ: P6 structure $20–25 a day across from 1436 2nd St; Civic Center structure $5–14 a day. Hotel parking in Westwood is $55 self / $77 valet (Palomar) and $75 valet in Hollywood (Everly), Sept 2026 — a line for the "do I need a car" answer.
- **@community-scout:** nothing here runs rides. The HI hostel's page says nothing about group rides.

## Sources

- https://centerrideout.lalgbtcenter.org/
- https://www.hiusa.org/hi-los-angeles-santa-monica-hostel-faq
- https://www.hiusa.org/find-hostels/california/santa-monica-1436-2nd-street
- https://www.hiusa.org/group-travel/california/santa-monica-1436-2nd-street
- https://www.innatvenicebeach.com/
- https://www.pacificahotels.com/cyclists
- https://www.thekinneyvenicebeach.com/
- https://www.ambrosehotel.com/
- https://www.ihg.com/kimptonhotels/hotels/us/en/hotel-palomar-la-beverly-hills/laxwp/hoteldetail
- https://www.ihg.com/kimptonhotels/hotels/us/en/everly-hotel-los-angeles-ca/laxgy/hoteldetail
- https://www.seaspritebeachclub.com/ (seaspritehotel.com redirects here)
- https://www.hoteldena.com/
- https://www.bikabout.com/lodging

Tried and could not open: https://www.hiusa.org/find-hostels/california/los-angeles-santa-monica (404) · https://www.safariburbank.com/ (domain did not resolve) · https://www.hostelworld.com/pwa/hosteldetails.php/HI-Los-Angeles-Santa-Monica-Hostel/Santa-Monica/1229 (fetch refused) · https://www.yelp.com/biz/hi-los-angeles-santa-monica-hostel-santa-monica-2 (robots.txt)
