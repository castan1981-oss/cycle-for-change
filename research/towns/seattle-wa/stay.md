# seattle-wa · stay-scout · 2026-10-04

A refresh with search back on. All five U District hotels in
`data/towns/seattle-wa.json` opened on their own pages this time, and none of
them says a word about a guest's own bike. Three places elsewhere are added:
HI Seattle at the American Hotel (Chinatown–International District, the one
place in town with a bike policy in writing — "bicycle storage in our
basement"), Hotel Max (downtown; Expedia lists "Bicycle storage" inside its
resort fee, but the hotel's own page only talks about loaner bikes, so the
field stays null) and the Silver Cloud on Broadway (Capitol Hill, for the
Good Weather Sunday ride). Fremont and Ballard have no hotel I could find.

**For the editor:** replace `hotels` with the Findings block. Every record
has the schema's `booking_url` and `bike_policy` fields now. `bike_policy`
is `null` wherever the hotel says nothing in writing; the page then prints
"No stated policy — ask when you book". Watertown's old note ("same distance
to the start") is fixed: Cascade puts it at 1.8 mi, the University Inn at 1.3.
The Graduate's URL moved to hilton.com (the brand is "Graduate by Hilton"
now); the old graduatehotels.com link 302s there.

Cascade's 2027 STP lodging page does not exist yet (both URL patterns 404,
and the 2027 event page links no lodging). The `travel_links` entry keeps
the 2026 page with a line saying to look for 2027.

Calls: 4 searches, 27 fetches (18 loaded, 9 refused or 404).

## Findings

```json
[
  {
    "name": "College Inn",
    "url": "https://www.collegeinnseattle.com",
    "booking_url": null,
    "address": "4000 University Way NE, Seattle, WA 98105",
    "note": "On the Ave at NE 40th, 0.6 mile from the STP start lot by Cascade's 2026 list — the closest bed on it. A 1909 building run as a small inn: half the rooms have a new private bath, the rest share; free coffee and tea all day in the loft. Nothing about bikes on its page, and nothing about an elevator. No rate shown (Oct 2026).",
    "price_hint": null,
    "bike_policy": null
  },
  {
    "name": "University Inn (Staypineapple)",
    "url": "https://www.staypineapple.com/university-inn-seattle-wa",
    "booking_url": null,
    "address": "4140 Roosevelt Way NE, Seattle, WA 98105",
    "note": "Roosevelt Way at NE 41st, 1.3 miles from the STP start lot by Cascade's 2026 list. The hotel lists beach cruisers to borrow; nothing on its page about where your own bike sleeps. Self-parking on site, fee not shown. No rate shown (Oct 2026).",
    "price_hint": null,
    "bike_policy": null
  },
  {
    "name": "Watertown Hotel (Staypineapple)",
    "url": "https://www.staypineapple.com/watertown-hotel-seattle-wa",
    "booking_url": null,
    "address": "4242 Roosevelt Way NE, Seattle, WA 98105",
    "note": "A block north of its sister, the University Inn, on Roosevelt Way; Cascade's 2026 list puts it 1.8 miles from the STP start lot, half a mile farther than the University Inn. Beach cruisers to borrow, per the page; nothing about your own bike. No rate shown (Oct 2026).",
    "price_hint": null,
    "bike_policy": null
  },
  {
    "name": "Graduate by Hilton Seattle",
    "url": "https://www.hilton.com/en/hotels/seagsgu-graduate-seattle/",
    "booking_url": null,
    "address": "4507 Brooklyn Ave NE, Seattle, WA 98105",
    "note": "Brooklyn Ave at NE 45th, a few blocks west of campus; not on Cascade's lodging list, so no measured distance to the start. Two restaurants (Poindexter Coffee on the ground floor, the Mountaineering Club bar on the roof). A daily mandatory destination charge covers internet, a $15 food credit and bicycle rentals; nothing on the page about a guest's own bike. Valet only, $46 a day; no rate shown (Oct 2026).",
    "price_hint": null,
    "bike_policy": null
  },
  {
    "name": "Residence Inn by Marriott Seattle University District",
    "url": "https://www.marriott.com/en-us/hotels/seaud-residence-inn-seattle-university-district/overview/",
    "booking_url": null,
    "address": "4501 12th Avenue NE, Seattle, WA 98105",
    "note": "On 12th Ave NE in the U District, 1.3 miles from the STP start lot by Cascade's 2026 list. The suites have full kitchens, and that matters on STP morning: hotel breakfast starts at 7 a.m. on weekends and the ride leaves at 5. Nothing about bikes on the hotel's page. No rate shown; parking $35 a day (Oct 2026).",
    "price_hint": null,
    "bike_policy": null
  },
  {
    "name": "HI Seattle at the American Hotel",
    "url": "https://www.americanhotelseattle.com/faqs",
    "booking_url": null,
    "address": "520 S King St, Seattle, WA 98104",
    "note": "A hostel in the Chinatown–International District, a block from the King Street light-rail station and about a mile south of downtown's centre; Cascade's 2026 list puts it 4.4 miles from the STP start. Travelers only — it won't take Seattle-area residents — and 14 nights at most. Check-in 3, out 11; luggage storage after check-out is $5 for two bags; a pay lot across the street. The cheap, clean tier for this guide, and the one place in town with the bike rule in writing. No rate shown on its own page (Oct 2026).",
    "price_hint": "$",
    "bike_policy": "Bike storage in the basement; the front desk walks you down to store or fetch your bike (its FAQ's words)."
  },
  {
    "name": "Hotel Max",
    "url": "https://www.hotelmaxseattle.com/hotel/",
    "booking_url": "https://www.expedia.com/Seattle-Hotels-Hotel-Max.h28647.Hotel-Information",
    "address": "620 Stewart St, Seattle, WA 98101",
    "note": "Downtown, Stewart St at 7th, half a mile from Pike Place Market and about a mile from the Elliott Bay Trail at the waterfront. The hotel's own page says it loans Public bikes to guests; Expedia's listing goes further and puts \"Bicycle storage\" inside the $34.22-a-night resort fee, but that line isn't on the hotel's site, so ask when you book. From $204 for a mid-October night, taxes in; covered valet $55.98 (Expedia, Sept 2026).",
    "price_hint": "$$",
    "bike_policy": null
  },
  {
    "name": "Silver Cloud Hotel Seattle – Broadway",
    "url": "https://www.silvercloud.com/seattlebroadway/",
    "booking_url": null,
    "address": "1100 Broadway, Seattle, WA 98122",
    "note": "Broadway at Madison, where Capitol Hill meets First Hill: the Pike/Pine bars and {ride:seattle-wa-good-weather-sunday-social|the Good Weather Sunday Social} start are a short roll north, downtown a long downhill west. Check-in 4, out noon. Nothing about bikes on the hotel's page. No rate shown (Oct 2026).",
    "price_hint": null,
    "bike_policy": null
  }
]
```

travel_links

```json
[
  {
    "label": "STP lodging list (Cascade Bicycle Club, 2026)",
    "url": "https://cascade.org/rides-events/seattle-portland-2026/lodging",
    "kind": "official",
    "note": "The organizer's list for the 2026 ride: UW dorm rooms at the start the night before, Seattle hotels by distance from the start lot, the overnight stops near the midpoint (several with bike storage in writing) and the Portland finish hotels. The 2027 page wasn't up in October 2026; look for it before you book."
  }
]
```

The `{ride:…}` slug in the Silver Cloud note (`seattle-wa-good-weather-sunday-social`)
is checked against rides.json.

## Why these

- **College Inn**: the closest bed to the STP start on Cascade's list (0.6 mi) and the cheap end of the U District. Half the rooms share a bath — say so, and the page does. Its own page opened this run (it didn't on Oct 3).
- **University Inn**: 1.3 mi from the start, mid-priced, self-parking on site. Confirmed open on its own page; the "beach cruisers" line is the only bike text, and it's about theirs, not yours.
- **Watertown Hotel**: same owner, a block north, and 1.8 mi from the start by Cascade — the old note's "same distance" was wrong and is fixed.
- **Graduate by Hilton Seattle**: the full-service pick a few blocks from campus. The URL changed (hilton.com); the destination charge is worth a line because it covers bike rentals, and the valet-only parking is worth one because a Rivian with a bike rack is going to a valet.
- **Residence Inn**: the kitchen is the reason — breakfast starts after the ride leaves. Carried over from Oct 3 unchanged; its page still has the 12th Ave NE road-work notice.
- **HI Seattle at the American Hotel**: the only bike policy in writing in Seattle this run, and the cheap tier. Hostelworld shows a review from September 2026, so it's open on two signals. The "no local residents" rule is odd enough to say out loud.
- **Hotel Max**: the downtown mid-tier lead from Oct 3, now read on its own page. Loaner bikes are the hotel's words; the storage line is Expedia's. The `booking_url` is the Expedia page because that's where the fee breakdown lives.
- **Silver Cloud Broadway**: the Capitol Hill stay the brief asked for, confirmed open on its own page. No bike text at all; it's here for where it sits.

## Rejected

- **The Belltown Inn**, 2301 3rd Ave — fetched (home and amenities pages). "Complimentary bicycle usage (with a lock and helmet)" and kitchenettes in every room, but nothing about a guest's own bike, and its FAQ page returned only headings. Travelocity shows $119 for Oct 14–15, 2026, and the amenities page says nearby public parking is $35 a night. Left out because Hotel Max and HI Seattle already cover downtown; it's the swap-in if the editor wants a cheaper downtown room with a kitchenette. Hand-off below.
- **Silver Cloud Hotel Seattle – University District**, 5036 25th Ave NE — fetched and open (check-in 4, out noon, a free "Silver Cloud Breakfast", no bike text, no rate). Cascade puts it 1.0 mi from the start. Left out only because the U District already carries five; it's the swap-in if College Inn's shared baths put the editor off.
- **The Harvard on Capitol Hill** — an apartment building with a bike room, not a hotel (Oct 3 finding; not re-fetched).
- **Blueground's "Serene Capitol Hill 1BR w/ Bike Storage"** (Expedia/Booking) — a furnished-apartment listing, not fetched; short-term rentals go in only with their own URL and a stated policy, and this one lives on a booking site.
- **Travelocity's Capitol Hill list** — fetched; it names The Paramount, Mediterranean Inn, Executive Pacific, Mayflower Park, Crowne Plaza, Coast Downtown, Arctic Club and Hotel Max, all of them downtown or Queen Anne, none with bike text. Leads only.
- **Travelocity's "5 star Ballard" page** — fetched; the four hotels on it (Lotte, Fairmont Olympic, 1 Hotel, Four Seasons) are all downtown at $326–$460. No Ballard hotel on it.
- **The hotels.com, booking.com, kayak and hotel-mirror pages for Hotel Max and the American Hotel** — not fetched; their own pages opened.
- **Yelp's bike-storage search pages** — not fetched; never a source of record.

## Couldn't confirm

- **Cascade's 2027 STP lodging page** — `cascade.org/rides-events/seattle-portland-2027/lodging` and `…/seattle-portland-2027-2027/lodging` both 404, and the 2027 event page (Saturday Jul 10, 5 a.m., University of Washington E-18 lot) links no lodging. The 2026 page is still up, last modified June 16, 2026, and says nothing about 2027. Re-check in spring.
- **UW dorm rooms for STP Friday night** — 2026: McCarty, Oak and/or Willow halls, $155.50 single, $102.50 a person double, private baths, via `washington.irisregistration.com/Form/7469`. Not fetched (the booking form), and 2027 is unknown. Belongs on the event page, not in `hotels`.
- **Fremont / Ballard** — nothing. Two booking-site neighborhood pages showed no hotel in either. Where to look: a search with "Ballard Ave" or "Hotel Ballard" when the budget allows; the Burke-Gilman runs through both.
- **Hotel Max's resort fee** — Expedia: "$34.22 per accommodation, per night" including "Bicycle storage … Fitness center access … In-room coffee". Not on the hotel's own site, which has no fees or FAQ page I could reach (`/amenities/` 404s; `/contact-us/` is a form). A phone call settles it.
- **Rates for the five U District hotels and the Silver Cloud Broadway** — none show a rate without dates entered, so every `price_hint` is null. Oct 3's undated `$`/`$$`/`$$$` guesses are gone on purpose.
- **Elevators** — no hotel page said. College Inn (a 1909 walk-up by its look) matters most; ask.
- **HI Seattle's own site, beyond the FAQ** — the homepage wasn't in a search result, so only `/faqs` opened. Hostelworld lists "Bicycle Parking" among its facilities and a September 2026 review; TripAdvisor shows a March 2026 review and $171–$197 for a standard room. Bed prices need dates entered. Age limits, kitchen, lockers: unknown.
- **MarQueen Hotel, Moore Hotel, Hotel Nexus, Marriott Waterfront** — on Cascade's list at 3.8, 4.4, 6.2 and 6.0 mi from the start. Not fetched this run.
- **Open status, second signal**: all five U District hotels take bookings on their own pages, and Cascade's June 2026 list names four of them (not the Graduate). Hotel Max: own page plus Expedia (Sept 2026). HI Seattle: FAQ plus Hostelworld (Sept 2026). Silver Cloud Broadway: own page only.

## Hand-offs

- **@town-editor / the STP event page** (`data/events/seattle-to-portland.json`): the 2026 lodging page's bike-storage lines at the overnight stops, re-read this run — Centralia College "$10 secure bike corral"; Centralia Community Church of God "indoor bike storage"; St. John's Lutheran, Chehalis, "Indoor storage of bikes between pews in sanctuary"; Bethel Church Chehalis "secure bike storage"; Napavine Schools "Indoor bike storage"; Winlock Lions Club and Christian Fellowship of Winlock "bike storage"; Toledo Fire District 2 "Secure bike storage". Portland finish: Courtyard Portland Downtown "Free Secure Bike Storage"; Hyatt Regency Portland "Complimentary secure bike storage within guestroom". All 2026.
- **@logistics-scout**: Graduate valet $46 a day (no self-parking); Residence Inn $35 a day; Belltown Inn says nearby public parking is $35 a night; Hotel Max covered valet $55.98 (Expedia). HI Seattle is a block from King Street Station (Amtrak Cascades, Link).
- **@coffee-scout**: Poindexter Coffee is the Graduate's ground-floor café.
- **@culture-scout**: the Mountaineering Club, the Graduate's rooftop bar, if a U District bar is wanted.
- **@eat-scout / @coffee-scout**: the Belltown Inn's loaner bikes and kitchenettes, if a downtown base with a fridge is worth a line anywhere.

## Sources

- https://www.collegeinnseattle.com
- https://www.staypineapple.com/university-inn-seattle-wa
- https://www.staypineapple.com/watertown-hotel-seattle-wa
- https://www.graduatehotels.com/seattle/ (302 → hilton.com)
- https://www.hilton.com/en/hotels/seagsgu-graduate-seattle/
- https://www.marriott.com/en-us/hotels/seaud-residence-inn-seattle-university-district/overview/ (Oct 3 run)
- https://www.silvercloud.com/university/
- https://www.silvercloud.com/seattlebroadway/
- https://www.silvercloud.com/seattlebroadway/neighborhood/
- https://www.americanhotelseattle.com/faqs
- https://www.hostelworld.com/hostels/p/36172/american-hotel-hostel/
- https://www.tripadvisor.com/Hotel_Review-g60878-d1489896-Reviews-American_Hotel_Hostel-Seattle_Washington.html
- https://www.hotelmaxseattle.com/
- https://www.hotelmaxseattle.com/hotel/
- https://www.hotelmaxseattle.com/contact-us/
- https://www.expedia.com/Seattle-Hotels-Hotel-Max.h28647.Hotel-Information
- https://www.belltown-inn.com/
- https://www.belltown-inn.com/amenities/
- https://www.belltown-inn.com/faq/ (headings only)
- https://www.travelocity.com/Capitol-Hill-Station-Hotels.d553248635974544843.Travel-Guide-Hotels (leads only)
- https://www.travelocity.com/5Star-Ballard-Seattle-Hotels.s50-n506257-0.Travel-Guide-Filter-Hotels (no Ballard hotels)
- https://cascade.org/rides-events/seattle-portland-2026/lodging
- https://cascade.org/rides-events/seattle-portland-2027-2027

Tried and failed (not sources): cascade.org/rides-events/seattle-portland-2027/lodging (404) · cascade.org/rides-events/seattle-portland-2027-2027/lodging (404) · hotelmaxseattle.com/amenities/ (404) · silvercloud.com/broadway/ (404) · hotelballardseattle.com (permission timed out) · hiusa.org/find-hostels/washington/seattle-520-south-king-street (permission timed out) · groups.hihostels.com/hostels/hi-seattle-at-the-american-hotel/ (robots/SSL).
