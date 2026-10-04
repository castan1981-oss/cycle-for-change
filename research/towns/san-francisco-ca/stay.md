# san-francisco-ca · stay-scout · 2026-10-03

Six places to sleep, two in each of three zones: the bridge (the Presidio and
Fort Baker), Marin (Mill Valley) and where visitors land in the city (Fort Mason
and the Castro). I fetched the property's own page for every pick. One puts the
bike policy in writing: the Fort Mason hostel, with a bicycle room. The other
five say nothing about your own bike, so `bike_policy` is `null` for them (this
run's instruction; LA used the string "No stated policy — ask when you book",
and the schema counts both as "to ask"). Three of the six lend bikes to guests.
That's a loaner, not a policy, and the notes keep the two apart. Prices are only
where a page showed a number: the hostel (momondo, in pounds), Beck's (its own
site) and Cavallo Point (Expedia). No hotel page gave coordinates, so nothing
here is measured from City Hall. Distances are the pages' own words.

Limits this run: all 8 WebSearch calls are spent. WebFetch only opened URLs that
came up in a search result. A URL I typed in or followed from a page sent a
permission request, nobody answered it and it was withdrawn. So the Cycle to
Zero FAQ, Cavallo Point's policies page and several hotel sub-pages went unread.
They're listed under Couldn't confirm.

## Findings

```json
[
  {
    "name": "HI San Francisco Fisherman's Wharf Hostel",
    "url": "https://www.hiusa.org/find-hostels/california/san-francisco-building240-fortmason",
    "booking_url": null,
    "address": "Building 240, Fort Mason, San Francisco, CA 94123",
    "note": "Fort Mason, on the Marina side of the city (zone 6). The hostel's own page puts the Golden Gate Bridge 3 miles away. The only place this run found with the bike policy in writing: a free indoor bicycle room, first come, first served. Dorms of 4 to 20 beds and private rooms; check-in 3 p.m., out 11 a.m.; no elevator (a historic building; ADA rooms on the main floor); a little free parking, passes first come. Rooms from £23 a night on momondo's UK site (Oct 2026); HI's own page shows no rate.",
    "price_hint": "$",
    "bike_policy": "Free indoor bicycle storage in the hostel's bicycle room; space is limited, first come, first served (its words). E-bikes only with UL or EN 15194 certification, battery attached, no charging indoors."
  },
  {
    "name": "Lodge at the Presidio",
    "url": "https://presidiolodging.com/lodge-at-the-presidio/rooms/",
    "booking_url": "https://lodgeres.presidiolodging.com/",
    "address": "105 Montgomery Street, San Francisco, CA 94129",
    "note": "In the Presidio, at the city end of the bridge (zone 1). The Presidio Trust calls it \"the closest hotel to the Golden Gate Bridge in the entire city.\" {ride:san-francisco-ca-fat-cake-club-tuesday-headlands-arsicault,san-francisco-ca-hummingbird-fuels-all-watts-welcome-intervals|Two weekly rides} start at the bridge's south end. The Trust's page tags it \"Bike Parking\" without saying where. The hotel's own rooms page says nothing about bikes. Parking is a nightly fee; no rate or fee shown (Oct 2026).",
    "price_hint": null,
    "bike_policy": null
  },
  {
    "name": "Cavallo Point",
    "url": "https://www.cavallopoint.com/",
    "booking_url": null,
    "address": "601 Murray Circle, Fort Baker, Sausalito, CA 94965",
    "note": "Fort Baker, at the Marin end of the Golden Gate Bridge below the Headlands (zone 1). The 2026 Cycle to Zero started at Fort Baker. The lodge lends Vintage Electric e-bikes free to guests at the valet stand, first come. Its own pages say nothing about bringing your own bike; Expedia lists \"bicycle storage,\" so ask. From $866 for one night with taxes and fees on Oct 4, plus a $65 nightly resort fee (Expedia, read Oct 3, 2026).",
    "price_hint": "$$$$",
    "bike_policy": null
  },
  {
    "name": "Beck's Motor Lodge",
    "url": "https://www.becksmotorlodge.com/",
    "booking_url": "https://reservations.travelclick.com/85196",
    "address": "2222 Market Street, San Francisco, CA 94114",
    "note": "Market Street in the Castro (zone 6), in the same block of Market as the Peet's at 2257 Market where {ride:san-francisco-ca-different-spokes-jersey-ride|Different Spokes' club ride} meets. Family-owned since 1958, with free parking on site. Nothing about bikes on its pages. Check-in 3:30 p.m., out 11 a.m. Rooms from $149 for a Superior Queen (its own site, Oct 2026).",
    "price_hint": "$$",
    "bike_policy": null
  },
  {
    "name": "Holiday Inn Express Mill Valley San Francisco Area",
    "url": "https://www.ihg.com/holidayinnexpress/hotels/us/en/mill-valley/sfomv/hoteldetail",
    "booking_url": null,
    "address": "160 Shoreline Highway, Mill Valley, CA 94941",
    "note": "Shoreline Highway in Mill Valley (zone 2), down the road from Equator Coffees at Proof Lab (244 Shoreline Hwy), where {ride:mill-valley-ca-tam-velo-club-saturday-ride,mill-valley-ca-tam-velo-sunday-recovery-ride,mill-valley-ca-tam-velo-club-wednesday-training-ride|Tam Velo Club's rides} leave. The page puts the Golden Gate Bridge about 7 miles away. Free adult bikes to borrow; nothing about your own bike. Free parking; breakfast from 6:30 a.m. weekdays, 7 a.m. weekends. No rate shown (Oct 2026).",
    "price_hint": null,
    "bike_policy": null
  },
  {
    "name": "Mill Valley Inn",
    "url": "https://millvalleyinn.com/",
    "booking_url": "https://bookings.travelclick.com/5619?domain=millvalleyinn.com",
    "address": "165 Throckmorton Avenue, Mill Valley, CA 94941",
    "note": "Downtown Mill Valley, the Marin town under Mt. Tamalpais (zone 2). The inn has \"Bikes available\" for a ride around town, but nothing on its page about your own. Free parking, no resort fee, a breakfast buffet with an espresso bar. No rate shown (Oct 2026).",
    "price_hint": null,
    "bike_policy": null
  }
]
```

travel_links

```json
[]
```

## Why these

- **HI San Francisco Fisherman's Wharf Hostel**: zone 6, the bridge side of the city. The cheap bed, and the only place in town this run found that says in writing where the bike sleeps: a bicycle room, free, first come. No elevator, so it's carry-the-bike-up stairs if your room isn't on the main floor.
- **Lodge at the Presidio**: zone 1. The nearest bed to the bridge on the city side, by the Presidio Trust's own words. Two weekly rides leave from the bridge's south end. The "Bike Parking" tag needs a phone call before it means anything.
- **Cavallo Point**: zone 1, the Marin side. Fort Baker is where the 2026 Cycle to Zero started (brief), and the Recovery Ride starts in Sausalito. It's the splurge, at $866 and up plus the resort fee. Loaner e-bikes, not a policy.
- **Beck's Motor Lodge**: zone 6, the Castro. It's on the same block of Market as the start of Different Spokes' club ride, the city's LGBTQ club ride. Free parking is rare in the city, and $149 is the mid-price of this list.
- **Holiday Inn Express Mill Valley**: zone 2, Marin. Down Shoreline Highway from the Tam Velo start, with breakfast from 6:30 on weekdays and free parking. It's the plain, practical base for Tam and the Marin rides.
- **Mill Valley Inn**: zone 2. It's in the town itself, for a rider who wants to walk to dinner after Tam. It lends bikes for a spin around town.

## Rejected

- **Inn at the Presidio** (42 Moraga Avenue, 94129): fetched (presidio.gov). It has the same operator as the Lodge and the same "Bike Parking" tag, 22 rooms, and continental breakfast included. Not listed twice. It's the Presidio pick if the Lodge is full; the Lodge is the one the Trust calls closest to the bridge.
- **Bikabout's Bay Area list** (Argonaut, The Buchanan, Clift, Good Hotel, Sir Francis Drake, Zeppelin, Fairmont San Francisco and Heritage Place, Fairmont Claremont in Berkeley, Inn at Temescal and Waterfront Hotel in Oakland, Waters Edge in Tiburon): fetched. Every entry is a loaner-bike or location line behind an affiliate link, not a bring-your-own policy. Used for leads only. None of their own pages came up in a search, so none were fetched.
- **Marina Motel** (2576 Lombard St, per Expedia): I read the Expedia page only. Its amenities list "Free secured, covered self parking" (small garages, per reviews quoted there) and nothing about bikes. Its own site never came up in a search, so it isn't listed. It's a lead under Couldn't confirm.
- **Marina Inn, Podshare San Francisco Marina**: hotels.com results only. I didn't fetch them, and their own sites never came up.
- **Tamalpais Motel** (680 Redwood Highway, Mill Valley, per Visit Marin): I read the Visit Marin listing only (free parking, continental breakfast, shared kitchen on each floor, no bike line). Its own site (tamalpaismotel.com) never came up in a search, so it isn't listed. It's the budget Marin lead.
- **Short-term rentals**: none found with a stated bike policy and its own URL.
- **Booking and review sites as sources of record**: none used that way. booking.com refused (robots.txt). Trip.com's "hotels near Tam Bikes" page and the Mill Valley Inn itinerary page both returned 404. Enjoy Mill Valley's stay page lists no lodging.

## Couldn't confirm

- **A Cycle to Zero or Recovery Ride room block.** 2027.cycletozero.org/faqs/ could not be opened (the permission request was withdrawn), so whether SFAF names a host hotel or a pre-ride night at Fort Baker is unknown. The Castro Country Club's Recovery Ride page wasn't tried. Where to look: the Cycle to Zero FAQ and participant guide, and the Recovery Ride page. Both rides camp in Guerneville, so the beds that matter are the nights before the start and after the finish in Sausalito.
- **Cavallo Point's own word on guests' bikes.** Expedia lists "bicycle storage." The lodge's policies page (cavallopoint.com/policies-faqs/) couldn't be opened. Where to look: that page, or the activities desk at 415.339.4769 (on the lodge's activities page).
- **What "Bike Parking" means at the Presidio lodges**: a rack outside or a room inside. Where to look: presidiolodging.com/features-amenities/ (linked from the hotel's journal page, not opened), or the front desk.
- **Rates** for the Lodge at the Presidio, the Holiday Inn Express and the Mill Valley Inn. No number on their pages, and the booking engines weren't opened. Also a dollar rate for the hostel: HI's page shows none, and momondo's is in pounds. Where to look: each `booking_url`, or the IHG page with a midweek date.
- **Beck's and bikes.** It's a motor lodge with a car park on Market (its About page). Whether a bike can come into the room isn't on any page read. Where to look: becksmotorlodge.com/amenities (not opened), or call 415-621-8212.
- **Zone 3 (Golden Gate Park and the ocean side)**: nothing fetched. Where to look: lodging near Ocean Beach and the Sunset, close to the Great Highway park.
- **Zone 5 (the East Bay)**: no search left. Bikabout's leads are the Waterfront Hotel, Oakland ("located on San Francisco Bay Trail"), Inn at Temescal, Oakland, and the Fairmont Claremont, Berkeley. Where to look: their own pages, plus anything near Rockridge BART (AIR cc) or North Berkeley.
- **A mid-price Sausalito bed** near the Recovery Ride start and Different Spokes' Sausalito group (Mike's Bikes): none fetched. Search ran out.
- **Zone 1 Marin Headlands hostel**: not reached this run, so its status is unknown.
- **Second open-status signal.** Every listed page is live (HI and Beck's take bookings; Expedia priced Cavallo for Oct 4). Yelp titles in the search results ("Updated July 2026") for HI and Beck's weren't fetched. The verifier can phone.

## Hand-offs

- **@town-editor**: decide `bike_policy: null` vs "No stated policy — ask when you book" for the five; LA uses the string. And if the Presidio Trust's "Bike Parking" tag counts as a policy in writing, the Lodge's field could read "Bike parking (the Presidio Trust's page lists it; ask where)". I left it null.
- **@town-editor / rides.json**: Fat Cake Tuesday Headlands and Hummingbird All Watts Welcome carry `geo_precision: "city"` at 37.78794, -122.40752 (downtown), not the bridge's south end where both start. Any hotel-to-start distance off those coordinates would be wrong.
- **@logistics-scout**: free parking at the hostel (limited, first-come passes), Beck's, the Holiday Inn Express and the Mill Valley Inn. Nightly fee at the Presidio lodges (amount not shown). Cavallo Point's $65 resort fee covers parking, per Expedia (Oct 2026). Nothing here about car break-ins.
- **@community-scout**: none of these runs rides.

## Sources

- https://www.hiusa.org/find-hostels/california/san-francisco-building240-fortmason
- https://www.hiusa.org/hi-san-francisco-fishermans-wharf-hostel-faq
- https://www.hihostels.com/hostels/hi-san-francisco-fisherman-s-wharf
- https://www.hostelworld.com/hostels/p/4551/hi-san-francisco-fisherman-s-wharf-hostel/
- https://www.momondo.co.uk/hotels/san-francisco/HI-San-Francisco-Fisherman-s-Wharf-Hostel.mhd743091.ksp
- https://presidiolodging.com/lodge-at-the-presidio/rooms/
- https://presidiolodging.com/journal/hiking-and-biking-in-the-presidio/
- https://presidio.gov/explore/attractions/lodge-at-the-presidio
- https://presidio.gov/explore/attractions/inn-at-the-presidio
- https://www.cavallopoint.com/
- https://www.cavallopoint.com/discover/activities/
- https://www.expedia.com/Sausalito-Hotels-Cavallo-Point.h1886656.Hotel-Information
- https://guide.michelin.com/us/en/hotels-stays/san-francisco-bay-area/cavallo-point-lodge-5433
- https://www.becksmotorlodge.com/
- https://www.becksmotorlodge.com/about-us
- https://www.becksmotorlodge.com/contact-and-location
- https://www.becksmotorlodge.com/offers
- https://www.ihg.com/holidayinnexpress/hotels/us/en/mill-valley/sfomv/hoteldetail
- https://www.ihg.com/holidayinnexpress/hotels/us/en/mill-valley/sfomv/hoteldetail/amenities
- https://millvalleyinn.com/
- https://www.visitmarin.org/hotels/budget/tamalpais-motel/
- https://expedia.com/Marina-District-hotels-Marina-Motel.h41063.Hotel-information
- https://www.bikabout.com/lodging
- https://enjoymillvalley.com/stay-play/

Tried and could not open: https://2027.cycletozero.org/faqs/ (permission request withdrawn) · https://www.hiusa.org/find-hostels/california/san-francisco-fishermans-wharf (permission request withdrawn) · https://www.cavallopoint.com/policies-faqs/ (permission request withdrawn) · https://www.booking.com/hotel/us/mill-valley-sausalito.html (robots.txt) · https://millvalleyinn.com/mill-valley/experiences/itinerary/?id=6 (404) · https://www.trip.com/hotels/mill-valley-tam-bikes/hotels-c25551m60604675/ (404)

Linked from fetched pages but not opened (booking engines in the findings): https://lodgeres.presidiolodging.com/ · https://reservations.travelclick.com/85196 · https://bookings.travelclick.com/5619?domain=millvalleyinn.com
