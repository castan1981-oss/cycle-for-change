# phoenix-az · stay-scout · 2026-10-03

Six places to sleep, two in each area the editor named: Scottsdale by Gainey
Village, Tempe, and central Phoenix. Every property page was fetched this run.
None of the six puts a policy for your own bike in writing. Three lend or rent
their own bikes, and that is not the same thing. So every `bike_policy` is
`null`, per this run's rule. The build reads `null` the same as "No stated
policy — ask," so the strip will say 0 in writing, 6 to ask. Prices are only
where a number was on a page: the hostel's own rates, and two booking sites
for the Hampton and the Sonesta. The three resort booking engines (Hyatt
twice, the Biltmore) don't render in a fetch, so those three rates are null.
Their resort fees are in the notes. Distances from downtown Phoenix (City
Hall, 33.4484, -112.0740) are measured to the nearby ride start, using the
start's coordinates in rides.json. No hotel page gave coordinates. Search
ran out after eight searches. Everything after that was fetched from pages
the searches had already turned up.

## Findings

```json
[
  {
    "name": "Sonesta Suites Scottsdale Gainey Ranch",
    "url": "https://www.sonesta.com/sonesta-hotels-resorts/az/scottsdale/sonesta-suites-scottsdale-gainey-ranch",
    "booking_url": null,
    "address": "7300 E Gainey Suites Drive, Scottsdale, AZ 85258",
    "note": "Scottsdale, at Gainey Ranch, about 11 miles north-east of downtown Phoenix. Its own page puts the Gainey Village Health Club 0.3 mile away, and {ride:scottsdale-az-scottsdale-cycling-gainey-thursday,scottsdale-az-scottsdale-cycling-saturday-ride|Scottsdale Cycling's rides from Gainey Village} leave from Scottsdale Rd and Doubletree Ranch Rd. Every suite has a full kitchen. Breakfast runs 7 to 9, after those rides leave. $159 for Sunday, Oct 25 on hotels.com, plus a $34.21 nightly destination fee that includes parking (read Oct 3, 2026).",
    "price_hint": "$$",
    "bike_policy": null
  },
  {
    "name": "Grand Hyatt Scottsdale Resort",
    "url": "https://www.hyatt.com/grand-hyatt/en-US/scott-grand-hyatt-scottsdale-resort",
    "booking_url": null,
    "address": "7500 E. Doubletree Ranch Road, Scottsdale, AZ 85258",
    "note": "Scottsdale, at Gainey Ranch, on Doubletree Ranch Rd, the road {ride:scottsdale-az-scottsdale-cycling-gainey-thursday,scottsdale-az-scottsdale-cycling-saturday-ride|the Gainey Village rides} start on. It was the Hyatt Regency until a 2024 renovation. The $55 nightly resort fee includes bicycle rentals. Those are the resort's bikes; nothing on its pages covers yours. No rate shown (Oct 2026).",
    "price_hint": null,
    "bike_policy": null
  },
  {
    "name": "Hampton Inn & Suites Phoenix Tempe",
    "url": "https://www.hilton.com/en/hotels/phxsuhx-hampton-suites-phoenix-tempe/",
    "booking_url": null,
    "address": "1415 N. Scottsdale Road, Tempe, AZ 85288",
    "note": "North Tempe, about 8 miles east of downtown Phoenix. {ride:tempe-az-regroup-coffee-ride|The Regroup Coffee ride} leaves from 1205 N Scottsdale Rd, on the same road. Free hot breakfast and free self-parking; no airport shuttle. Nothing about bikes on the hotel's pages. $100 to $139 a night on trivago for October nights (read Oct 3, 2026).",
    "price_hint": "$$",
    "bike_policy": null
  },
  {
    "name": "Tempe Mission Palms",
    "url": "https://www.hyatt.com/destination-by-hyatt/en-US/phxdt-tempe-mission-palms",
    "booking_url": null,
    "address": "60 E 5th St, Tempe, AZ 85281",
    "note": "Downtown Tempe, beside A Mountain and \"just steps from Mill Avenue,\" by its own page. The $30 nightly destination fee covers parking and a shuttle to and from Sky Harbor, 5:30 a.m. to 10 p.m. It has a rooftop pool. Nothing about bikes on its pages, and no rate shown (Oct 2026).",
    "price_hint": null,
    "bike_policy": null
  },
  {
    "name": "Phoenix Hostel & Cultural Center",
    "url": "https://www.phxhostel.org/",
    "booking_url": "https://bc7c8d0484748b44.sirvoy.me/",
    "address": "1026 N. 9th Street, Phoenix, AZ 85006",
    "note": "Central Phoenix, just north-east of downtown. Its page says you can walk to the light rail, and {ride:phoenix-az-downtempo-ride|the Downtempo ride} leaves from Civic Space Park downtown. Private rooms $60 to $80 a night for one or two (the hostel's page, Oct 2026). Self check-in at any hour, free street parking. Guests need a government ID and must live outside Maricopa County. Nothing about bikes on its pages.",
    "price_hint": "$",
    "bike_policy": null
  },
  {
    "name": "Arizona Biltmore",
    "url": "https://www.arizonabiltmore.com/",
    "booking_url": null,
    "address": "2400 E. Missouri Ave, Phoenix, AZ 85016",
    "note": "Central Phoenix, at 24th St and Missouri in the Biltmore area. {ride:phoenix-az-pmbc-granada-sunday-breakfast-ride|PMBC's breakfast ride} leaves Granada Park at 20th St and Maryland, about 6 miles north of downtown. The $45 nightly resort charge includes a one-hour bike rental. Parking is $28 a night self, $35 valet. No rate shown (Oct 2026).",
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

- **Sonesta Suites Scottsdale Gainey Ranch** (Scottsdale, Gainey Ranch). The closest place this run found to the Gainey Village start, at a mid price. A full kitchen is handy on a training week. Breakfast opens too late for a 5:30 roll-out, so eat in the suite.
- **Grand Hyatt Scottsdale Resort** (Scottsdale, Gainey Ranch). The splurge at the Gainey end, on the same road as the start. Lending bikes says the resort is used to bikes. It is still not a line about yours. Ask.
- **Hampton Inn & Suites Phoenix Tempe** (north Tempe). On Scottsdale Rd with the Regroup Coffee + Bicycles start, at a mid price. Free breakfast and free parking, with no resort fee on the page.
- **Tempe Mission Palms** (downtown Tempe). For the rider who flies in and doesn't rent a car: the fee covers the airport shuttle and parking, and Mill Avenue is on the doorstep. Ask whether the shuttle takes a bike case.
- **Phoenix Hostel & Cultural Center** (central Phoenix). The cheap, clean bed. Private rooms at hostel prices, self check-in for late flights, near the light rail. Only for visitors: the hostel takes no Maricopa County residents.
- **Arizona Biltmore** (central Phoenix, Biltmore area). The central Phoenix splurge, near the Granada Park start of PMBC's Sunday ride. It rents bikes. Nothing about yours.

## Rejected

- **Canopy by Hilton Tempe Downtown** (108 E University Dr): fetched. Valet only, $39 a night and up to $50 on event nights, no self-parking. The "complimentary bikes" are loaners, and there's nothing about your own bike. Mission Palms covers downtown Tempe with parking and the airport shuttle in its fee.
- **Moxy Phoenix Tempe/ASU Area** (1333 S Rural Rd): named on Tempe Tourism's list with "complimentary house bikes" (loaners). Its own page didn't come up in search, so it wasn't fetched.
- **City Express by Marriott Tempe** (808 N Scottsdale Rd) and **Holiday Inn Express & Suites Phoenix-Tempe** (670 N Scottsdale Rd): on Tempe Tourism's list, on the same road as Regroup. Not fetched; the Hampton was taken instead. Leads if the Hampton is full.
- **The Camby, AC Hotel Phoenix Biltmore, Embassy Suites Phoenix Biltmore, Homewood Suites Phoenix-Biltmore, Hampton Inn Phoenix/Biltmore Area**: named on americansouthwest.net's central Phoenix list. Not fetched; their own pages didn't come up before search ran out. These are the leads for a mid-price central Phoenix pick near Granada Park.
- **Downtown Phoenix chain hotels** (Renaissance, Westin, Sheraton Grand, AC, Moxy, Courtyard/Residence Inn): same list. Not fetched. Downtown isn't near the weekend riding, and the hostel covers central Phoenix at the cheap end.
- **The Scottsdale Resort & Spa** (McCormick Ranch): came up only as hotels.com pages in the bike search. Not fetched.
- **An Expedia whole-home listing ("Walk or bike to Old Town Scottsdale")**: a search result with no stated bike policy. A rental needs its own URL and a written bike policy. Left out.
- **Hotelplanner's Grand Hyatt page**: it returned Talking Stick Resort instead. Discarded.
- **Forum threads** (mtbr, Bike Forums, RoadBikeReview) on bikes in hotel rooms: general, not Phoenix.

## Couldn't confirm

- **A written policy for your own bike, at any of the six.** Where to look: phone each one. The Grand Hyatt is the first call, (480) 444-1234. Reservationdesk.com, a booking site, lists "Secured bicycle storage" and "Free bicycles on site" for it. That is the booking site's words, not the resort's, so it isn't in the findings.
- **Splurge rates.** The Grand Hyatt, Mission Palms and the Biltmore show no number in a fetch. The Biltmore's homepage shows only offers (Third Night Free; Fall Sale 30% off plus a $100 credit). Where to look: open each property's booking page for a Tuesday in January.
- **Winter rates.** Every number here is for October. Trivago showed the Hampton at $417 for Saturday, Nov 7, 2026, against $100 to $139 on October nights. Read a January weekday and a January Saturday before printing a price level for the November-to-April rider.
- **The hostel's details.** No phone, nothing on bike storage, and no dorm beds on the pages fetched. The rooms page lists four rooms, each priced per room. Hostelworld lists the same address as "HI Phoenix - The Metcalf House," so the HI name may be what a rider searches for. Where to look: hosteling.us/phoenix-hostel (it came up in search; not fetched).
- **Whether Mission Palms' airport shuttle takes a bike case.** Not on the page. Ask at booking: (480) 894-1400.
- **A Fountain Hills or Rio Verde stay** (the Shea climb, McDowell Mountain): not searched; search ran out. Where to look: lodging near McDowell Mountain Cycles in Fountain Hills, where the Saturday road ride and the Sunday gravel ride leave.
- **A South Mountain or Ahwatukee stay**: outside this run's spread. Where to look: the Arizona Grand Resort, at the foot of South Mountain (not fetched).
- **An event lodging page.** Neither Cycling 4 one·n·ten nor the Valley of the Sun Stage Race has a file in `data/events/`, so there's no organizer hotel list to read.
- **A cyclist-run guesthouse**: none found.

## Hand-offs

- **@logistics-scout:** Mission Palms runs a PHX shuttle, 5:30 a.m. to 10 p.m., inside its $30 nightly fee. The Hampton Tempe has no airport shuttle. Biltmore parking is $28 self, $35 valet a night. Canopy Tempe is valet only, $39 a night, up to $50 on event nights (all Oct 2026). The hostel takes guests only from outside Maricopa County, with government ID.
- **@town-editor:** this run set `bike_policy` to `null` where nothing was in writing. The agent file's honest line, "No stated policy — ask when you book," is what the LA guide uses. The build counts both as "to ask." Pick one for the page.
- **@community-scout:** nothing here runs rides.

## Sources

- https://www.sonesta.com/sonesta-hotels-resorts/az/scottsdale/sonesta-suites-scottsdale-gainey-ranch
- https://www.hotels.com/ho538654/sonesta-suites-scottsdale-gainey-ranch-scottsdale-united-states-of-america/
- https://www.hyatt.com/grand-hyatt/en-US/scott-grand-hyatt-scottsdale-resort
- https://www.hyatt.com/grand-hyatt/en-US/scott-grand-hyatt-scottsdale-resort/policies
- https://www.hyatt.com/grand-hyatt/en-US/scott-grand-hyatt-scottsdale-resort/faqs
- https://www.hyatt.com/grand-hyatt/en-US/scott-grand-hyatt-scottsdale-resort/fall---winter-activities
- https://newsroom.hyatt.com/2024november11GrandHyattScottsdale
- https://www.experiencescottsdale.com/listing/grand-hyatt-scottsdale-resort/966/
- https://www.resortfeechecker.com/24193-resort_fee_grand_hyatt_scottsdale_resort.html
- https://www.reservationdesk.com/hotel/601fb0d/grand-hyatt-scottsdale-resort
- https://www.hilton.com/en/hotels/phxsuhx-hampton-suites-phoenix-tempe/
- https://www.hilton.com/en/hotels/phxsuhx-hampton-suites-phoenix-tempe/hotel-info/
- https://www.trivago.com/en-US/oar/hotel-hampton-inn-suites-phoenix-tempe?search=100-3504880
- https://www.priceline.com/hotel-deals/en-us/P3000001391/H39821504/hampton-inn-by-hilton-suites-phoenix-tempe.ssp
- https://www.tempetourism.com/where-to-stay/
- https://www.hyatt.com/destination-by-hyatt/en-US/phxdt-tempe-mission-palms
- https://www.hyatt.com/destination-by-hyatt/en-US/phxdt-tempe-mission-palms/faqs
- https://www.hyatt.com/destination-by-hyatt/en-US/phxdt-tempe-mission-palms/rooms
- https://www.hyatt.com/destination-by-hyatt/en-US/phxdt-tempe-mission-palms/parking-and-transportation
- https://www.hilton.com/en/hotels/phxtypy-canopy-tempe-downtown/
- https://www.hilton.com/en/hotels/phxtypy-canopy-tempe-downtown/hotel-info/
- https://www.phxhostel.org/
- https://www.phxhostel.org/faq
- https://www.phxhostel.org/rooms-rates
- https://www.phxhostel.org/visit
- https://www.hostelworld.com/hostels/p/67572/hi-phoenix-the-metcalf-house/
- https://www.arizonabiltmore.com/
- https://www.arizonabiltmore.com/azb-guest/
- https://www.arizonabiltmore.com/pre-arrival/
- https://www.arizonabiltmore.com/stay/resort-amenities/
- https://www.americansouthwest.net/arizona/hotels/phoenix.html

Ride starts and their coordinates (for the distances): `cfc-site/rides/rides.json`.

Tried and could not open: https://www.gaineysuiteshotel.com/ (fetch refused; the property is now the Sonesta above) · https://grandhyattscottsdale.com and https://www.hyatt.com/hyatt-regency/en-US/scott-hyatt-regency-scottsdale-resort-and-spa/renovations (fetch refused) · https://www.hotelplanner.com/Hotels/55513/Reservations-Grand-Hyatt-Scottsdale-Resort-Scottsdale-7500-East-Doubletree-Ranch-Rd-85258 (returned a different hotel) · https://us.trip.com/hotels/tempe-tempe-town-lake/hotels-c19913m14696968/ (404)
