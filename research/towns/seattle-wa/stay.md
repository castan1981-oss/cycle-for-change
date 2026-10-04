# seattle-wa · stay-scout · 2026-10-03

A refresh run that could only confirm one place. Of the five U District hotels
in `data/towns/seattle-wa.json`, only the Residence Inn's own page opened. For
the other four (two Staypineapple hotels, the Graduate and the College Inn),
the WebFetch permission request timed out, as it did on every hotel site I
typed in by hand. Only the exact URLs that WebSearch returned got through.
WebSearch then stopped: my fourth call came back with the session's search
budget spent (200 of 200), after three of my eight. So there are no new
Capitol Hill, downtown or Fremont/Ballard picks. Their best leads, two of
them with bike text on Expedia, are under Couldn't confirm.

**For the editor:** Findings holds only what this run re-read. Don't replace
the JSON's `hotels` with it. Swap in the Residence Inn record below. Keep the
other four U District entries as the Sept 15 run left them until the verifier
can fetch their pages. Don't give them a `bike_policy` or a `booking_url`
until then. Cascade's own lodging pages for 2024, 2025 and 2026 do name all of
them except the Graduate, which helps a little.

Per this run's rules, `bike_policy` is `null` when the hotel says nothing in
writing. The page then prints "No stated policy — ask when you book."

## Findings

```json
[
  {
    "name": "Residence Inn by Marriott Seattle University District",
    "url": "https://www.marriott.com/en-us/hotels/seaud-residence-inn-seattle-university-district/overview/",
    "booking_url": null,
    "address": "4501 12th Avenue NE, Seattle, WA 98105",
    "note": "On 12th Ave NE in the U District, 1.3 miles from the STP start lot by Cascade's 2026 lodging list. The suites have full kitchens, and that matters on STP morning: hotel breakfast starts at 7 a.m. on weekends, and the ride leaves from 5 a.m. Nothing about bikes on the hotel's page. No rate shown; parking $35 a day (Oct 2026).",
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
    "note": "The organizer's list for the 2026 ride: UW dorm rooms at the start the night before, hotels by distance from the start lot, and the overnight stops near the midpoint, several with bike storage in writing. Look for the 2027 page before you book."
  }
]
```

## Why these

- **Residence Inn by Marriott Seattle University District**: the STP rider's pick of the five, and the only one confirmed this run. Cascade puts it 1.3 miles from the start. Breakfast is too late for a 5 a.m. start, so the suite kitchen is the reason to stay. Changes from the current entry: the `url` was the bare marriott.com homepage and now points at the hotel's page. `price_hint` was an undated `$$$` and is now null, because the page shows no rate. The page also has a notice about road work on 12th Ave NE with "intermittent road closures" (Oct 2026). Check whether that's still on before July.
- **Cascade's lodging list** (travel link): the one page that covers the STP night before, the midpoint and the finish. Several midpoint hosts put bike storage in writing.

## Rejected

- **The Harvard on Capitol Hill**: fetched. Its bike room ("a state of the art bike repair station along with secured bike storage") belongs to an apartment building whose availability link goes to a leasing portal. Nothing on the page says it takes short stays. Not a hotel.
- **"Chic Capitol Hill Studio W Gym Bike Storage"** (Travelocity): the listing's URL served a list of hotels instead of the listing. No page means no listing.
- **The "Sweet Suite" units at 619 Malden Ave E** (Travelocity hostel list): five short-term units in one building with no bike text, and none has its own page that I fetched. Short-term rentals only go in with their own URL and a stated policy.
- **Expedia's Ballard filter page**: it showed no hotels in Ballard or Fremont. Its six were downtown, in South Lake Union, in Port Orchard or at Cottage Lake. No leads came from it.
- **Booking-site copies of the Residence Inn** (guestreservations.com, hotel.info, stayparktravel, the washington-state.net and seattlehotelsites mirrors, hotels.com): not fetched. The hotel's own page and Visit Seattle's member listing cover it.
- **Yelp**: not fetched. It's never a source of record here.

## Couldn't confirm

Each of these is still in the JSON from Sept 15 or is a lead. What's missing is the property's own page.

- **University Inn (Staypineapple)**, 4140 Roosevelt Way NE. Neither `staypineapple.com/university-inn-seattle-wa` nor `universityinnseattle.com` opened (permission timed out). Missing: open status, any bike text, a rate. Cascade's 2024–26 lists still name it, 1.3 mi from the start, and give universityinnseattle.com as its site. The editor should check which domain is the hotel's current own site.
- **Watertown Hotel (Staypineapple)**, 4242 Roosevelt Way NE. Same problem: neither `staypineapple.com/watertown-hotel-seattle-wa` nor `watertownseattle.com` opened. Cascade's lists put it **1.8 mi** from the start and the University Inn 1.3 mi. That conflicts with the current note's "same distance to the start." Fix or cut that line.
- **Graduate Seattle**, 4507 Brooklyn Ave NE. `graduatehotels.com/seattle/` did not open, and it is on none of Cascade's three lists. Missing: open status, its current own URL (the brand's pages may now sit on another domain), bike text, a rate.
- **College Inn Hotel**, 4000 University Way NE. `collegeinnseattle.com` did not open. Cascade lists it as a B&B 0.6 mi from the start, the closest hotel on its list. Missing: open status, rate, bike text, and whether rooms share baths and the building has stairs only.
- **University Silver Cloud Inn**: Cascade lists it 1.0 mi from the start. `silvercloud.com/university/` did not open. Worth adding once fetched.
- **UW dorm rooms the night before STP**: Cascade's 2026 page lists north-campus rooms (McCarty, Oak and/or Willow halls) at $155.50 single and $102.50 a person double, both with a private bath, booked through `washington.irisregistration.com/Form/7469`. In 2025 they were $149.75 and $99, and in 2024 they sold out. They are at the start line itself. Not in Findings: they exist only for the STP Friday night, the booking page did not open, and the 2027 lodging page did not open. Where to look: Cascade's 2027 STP lodging page.
- **Hotel Max**, 620 Stewart St, downtown. Expedia lists "Bicycle storage," a "Bike storage area" (in its resort-fee description) and "Free bicycle rental," at $177 a night for Nov 1, 2026. It's the best downtown lead for a policy in writing, but a booking site isn't the hotel. Where to look: the hotel's own amenities and fees pages.
- **The Belltown Inn**, 2301 3rd Ave. Expedia: "Free bicycle rentals with helmets and locks," from $140 for Oct 14, 2026, taxes in. That's a loaner bike, not a rule about your own bike. Where to look: the inn's own page, for whether a guest's bike can come in.
- **Hostels downtown**: Green Tortoise Hostel Seattle (105 Pike St, $81 for Oct 7–8 on Travelocity), Hostel Fish Seattle (2327 2nd Ave, $99 for Oct 13–14), and HI Seattle at the American Hotel (4.4 mi from the STP start per Cascade; `americanhotelseattle.com/about` did not open). Missing: own pages and bike storage text. The cheap tier for the guide is one of these.
- **Capitol Hill**: Travelocity names The Boylston Hotel Capitol Hill (1517 Boylston Ave, $98 for Oct 5–6), Kasa Capitol Hill (1208 Pine St, $135) and The Paramount Hotel (724 Pine St, $145). None had bike text, and none was fetched. A Capitol Hill stay suits the Good Weather Sunday ride, so it's worth a pass when search works.
- **Fremont / Ballard**: nothing found. Expedia's Ballard filter came back empty. Where to look: hotels on or near the Burke-Gilman in Ballard and Fremont, on a run where search works.
- **Mediterranean Inn**, 425 Queen Anne Ave N, $135 for Nov 2–3 on Travelocity. A lead only.
- **Marriott Waterfront, MarQueen Hotel, Moore Hotel, Hotel Nexus**: on Cascade's lists at 6.0, 3.8, 4.4 and 6.2 mi from the start. The Marriott Waterfront page did not open. The others weren't tried.
- **Open status, second signal**: the Residence Inn's own page is live and taking bookings, and Visit Seattle's member listing agrees (Oct 3, 2026). The other four U District entries have no signal this run.

## Hand-offs

- **@town-editor / the STP event page** (`data/events/seattle-to-portland.json`): Cascade's 2026 lodging page puts bike storage in writing at several overnight stops for two-day riders. Centralia College has a "$10 secure bike corral." Centralia Community Church of God has "indoor bike storage" ($70 a person, gym floor). Immanuel Lutheran in Centralia has "bike storage" ($75). Bethel Church Chehalis has "secure bike storage" ($65 indoor). Napavine Schools has "Indoor bike storage" ($80, meals in). Toledo Fire District 2 has "Secure bike storage" ($100, 8 mi off route). St. John's Lutheran in Chehalis keeps bikes "between pews in sanctuary" but sold out by May 1. At the Portland finish, the Courtyard Portland Downtown/Convention Center offers "Free Secure Bike Storage" ($169–$179 block, 2026), and the Hyatt Regency Portland offers "Complimentary secure bike storage within guestroom." All are 2026 numbers. That's a line for the event page's FAQ and for a Portland guide if one is built.
- **@logistics-scout**: the Residence Inn charges $35 a day to park (Oct 2026).
- **@coffee-scout / @culture-scout / @community-scout**: nothing from this run.

## Sources

- https://www.marriott.com/en-us/hotels/seaud-residence-inn-seattle-university-district/overview/
- https://visitseattle.org/members/residence-inn-by-marriott-seattle-university-district-pd/
- https://cascade.org/rides-events/seattle-portland-2026/lodging
- https://cascade.org/rides-events/seattle-portland-2025/lodging
- https://cascade.org/rides-events/seattle-portland-2024/lodging
- https://www.theharvardoncapitolhill.com/bikeroom
- https://www.travelocity.com/Seattle-Hotels-Chic-Capitol-Hill-Studio-W-Gym-Bike-Storage.h101019727.Hotel-Information (served a hotel list, not the listing)
- https://www.travelocity.com/Capitol-Hill-Station-Hostels.d553248635974544843-aaHostels.Travel-Guide-Accommodation (leads only)
- https://expedia.com/Downtown-Seattle-hotels-The-Belltown-Inn.h2330513.Hotel-information (leads only)
- https://www.expedia.com/cn/Seattle-Hotels-Hotel-Max.h28647.Hotel-Information (leads only)
- https://www.expedia.com/Ballard-Seattle-Hotels-Hotels-With-Room-Service.0-n506257-0-tHotelswithRoomService.Travel-Guide-Filter-Hotels (no Ballard results)

Tried with WebFetch and could not open, because the permission request timed out (nothing was fetched any other way):
https://www.staypineapple.com/university-inn-seattle-wa · https://www.staypineapple.com/watertown-hotel-seattle-wa · https://www.graduatehotels.com/seattle/ · https://www.collegeinnseattle.com · https://www.universityinnseattle.com · https://www.watertownseattle.com · https://www.silvercloud.com/university/ · https://www.americanhotelseattle.com/about · https://www.marriott.com/en-us/hotels/seawf-seattle-marriott-waterfront/overview/ · https://cascade.org/rides-events/seattle-portland-2027-2027/lodging

WebSearch: three calls ran. The fourth (a lead for the Graduate's current page) returned "this session has used its web search budget (200 of 200)", so the search stopped there.
