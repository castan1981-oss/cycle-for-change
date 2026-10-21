# scottsdale-az · stay-scout · 2026-10-20

A new guide. I started from the Tour de Scottsdale's own Lodging page (its six
hotels and WestWorld's RV park), opened each hotel's own site for the address,
phone and what it says about bikes, then re-opened the two Gainey Ranch hotels
the Phoenix guide already carries, because the Saturday rides start there. I
looked for one Old Town pick with a written bike policy and found none, so
Old Town has no entry (see Rejected).

**Nobody writes a bike policy down.** Not one of the nine properties says a
word about a guest's own bike on its own pages. Three of them lend bikes
(the Grand Hyatt's resort fee covers "bicycle rentals"; Canopy and the
Bespoke Inn have house bikes) and one has a Peloton in a room type. None of
that is a policy for the bike you brought. Every `bike_policy` below is
"No stated policy — ask". The strip will read "0 with a bike policy in
writing · 9 to ask", and that is the true state of Scottsdale.

**Distances.** Two points, as the brief asks: Old Town (33.4942, -111.9261)
and WestWorld (16601 N Pima Rd). I geocoded every address with Nominatim
(the repo's own geocoder) and measured straight-line; the notes round to the
nearest mile or half mile and say "about". Where the Tour's page or the
hotel's own page gives a road distance to WestWorld, the note quotes it with
its source. WestWorld geocodes to **33.6330, -111.8823** (the brief's
33.6316, -111.8826 is within 200 yards; either works for the town file).

**Prices** are one snapshot: Expedia's "Hotels near WestWorld" page and the
hotels.com property pages, all read Oct 20, 2026, each with the sample night
it showed. Bands as in the Tucson report: under $110 `$`, $110–199 `$$`,
$200–299 `$$$`, $300 and up `$$$$`. These are late-October and November
prices; the Tour is April 10, 2027, in high season.

**How the run went.** The fetch tool opens only URLs a search returned, and
Hilton, Marriott, Hyatt and IHG block plain fetches, so each hotel took a
search to reach its own page. Four Hyatt sub-pages (Hyatt Place parking,
Hyatt House dining and offers, Grand Hyatt FAQ) refused. The Bespoke Inn's
site now redirects to bespokeinnscottsdale.com, which never opened. Details
under Couldn't confirm.

## Findings

hotels

```json
[
  {
    "name": "Hilton Garden Inn Scottsdale North/Perimeter Center",
    "url": "https://www.hilton.com/en/hotels/sctnpgi-hilton-garden-inn-scottsdale-north-perimeter-center/",
    "booking_url": "https://www.hilton.com/en/attend-my-event/sctnpgi-tds-4a6c5efd-7e09-4b7b-8e2a-cdd4910212bf/",
    "address": "8550 E Princess Dr, Scottsdale, AZ 85255",
    "phone": "(480) 515-4944",
    "note": "The Tour's host hotel, in North Scottsdale off the 101 at Princess Dr. Its own page puts WestWorld 1.5 miles away; the Tour says 2.2 miles by road from the ride start. About 11 miles from Old Town. Free self-parking, an outdoor pool, breakfast at a charge (about $18.50 a person on Expedia). Book through the Tour's Hilton link, or call and ask for the Tour de Scottsdale Attendee room block. About $147 a night for Nov 1, 2026 on Expedia (read Oct 20, 2026). Nothing about your own bike on its pages.",
    "price_hint": "$$",
    "bike_policy": "No stated policy — ask",
    "ride_slug": null
  },
  {
    "name": "Scottsdale Marriott at McDowell Mountains",
    "url": "https://www.marriott.com/en-us/hotels/phxno-scottsdale-marriott-at-mcdowell-mountains/overview/",
    "booking_url": null,
    "address": "16770 N Perimeter Dr, Scottsdale, AZ 85260",
    "phone": "(480) 502-3836",
    "note": "North Scottsdale on Perimeter Dr by TPC Scottsdale, the closest of the Tour's hotels to the start: 1.8 miles by road from the ride start by the Tour's page, about a mile straight across. About 10 miles from Old Town. Heated outdoor pool, a Starbucks in the lobby, check-in 4 p.m.; self-parking $25 a day, valet $35. Call for the Tour's room block. About $248 a night for Nov 20, 2026 on hotels.com (read Oct 20, 2026). Nothing about your own bike on its pages.",
    "price_hint": "$$$",
    "bike_policy": "No stated policy — ask",
    "ride_slug": null
  },
  {
    "name": "Holiday Inn & Suites Scottsdale North – Airpark",
    "url": "https://www.ihg.com/holidayinn/hotels/us/en/scottsdale/phxsa/hoteldetail",
    "booking_url": null,
    "address": "14255 N 87th St, Scottsdale, AZ 85260",
    "phone": "(480) 922-6500",
    "note": "The Airpark, off the 101: 2.4 miles by road from the ride start by the Tour's page, under 5 by its own. About 8.5 miles from Old Town, the nearest of the Tour's hotels to it. Free parking, a heated outdoor pool and hot tub, a free Lyft ride within 5 miles (WestWorld is inside that), breakfast at the Raintree Cafe for a charge. Check-in from 3 p.m., and you have to be 21 to check in. About $151 to $156 a night for a November 2026 night on hotels.com and Expedia (read Oct 20, 2026). Nothing about your own bike on its pages.",
    "price_hint": "$$",
    "bike_policy": "No stated policy — ask",
    "ride_slug": null
  },
  {
    "name": "Fairmont Scottsdale Princess",
    "url": "https://www.fairmont.com/scottsdale/",
    "booking_url": null,
    "address": "7575 E Princess Dr, Scottsdale, AZ 85255",
    "phone": "(480) 585-4848",
    "note": "The splurge: the resort by TPC Scottsdale on Princess Dr, 3.1 miles by road from the ride start by the Tour's page; about 10.5 miles from Old Town. Six pools, parking included, check-in 4 p.m. Call (800) 344-4758 and ask for the Tour de Scottsdale Block. About $555 a night for Oct 30, 2026 on Expedia, and $270 for a late-August night on hotels.com (read Oct 20, 2026), so the season decides the price. Nothing about your own bike on its pages.",
    "price_hint": "$$$$",
    "bike_policy": "No stated policy — ask",
    "ride_slug": null
  },
  {
    "name": "Hilton North Scottsdale at Cavasson",
    "url": "https://www.hilton.com/en/hotels/scfnshh-north-scottsdale-at-cavasson/",
    "booking_url": null,
    "address": "7965 E Cavasson Blvd, Scottsdale, AZ 85255",
    "phone": "(480) 648-1500",
    "note": "North Scottsdale on Cavasson Blvd, 3.6 miles by road from the ride start by the Tour's page; about 11 miles from Old Town. Outdoor pool, EV charging, breakfast for a fee, check-in 4 p.m. Hilton's own pages give self-parking as both free and $25 a day, so ask. Call and ask for the Tour de Scottsdale block. About $246 a night for Oct 31, 2026 on Expedia (read Oct 20, 2026). Nothing about your own bike on its pages.",
    "price_hint": "$$$",
    "bike_policy": "No stated policy — ask",
    "ride_slug": null
  },
  {
    "name": "Hyatt House North Scottsdale / Hyatt Place Scottsdale North",
    "url": "https://www.hyatt.com/hyatt-house/en-US/phxxn-hyatt-house-north-scottsdale",
    "booking_url": null,
    "address": "18513 N Scottsdale Rd, Scottsdale, AZ 85255",
    "phone": "(480) 590-8100",
    "note": "Two Hyatts at one address on Scottsdale Rd north of the 101, 4.1 miles by road from the ride start by the Tour's page; about 11 miles from Old Town. Hyatt House has full kitchens and a free breakfast, which matters on a training week; the Hyatt Place listed with it has a free breakfast bar and an outdoor pool. About $135 a night at Hyatt House for Nov 1, 2026 and $178 at Hyatt Place for Nov 8 on Expedia (read Oct 20, 2026). Nothing about your own bike on either's pages.",
    "price_hint": "$$",
    "bike_policy": "No stated policy — ask",
    "ride_slug": null
  },
  {
    "name": "Sonesta Suites Scottsdale Gainey Ranch",
    "url": "https://www.sonesta.com/sonesta-hotels-resorts/az/scottsdale/sonesta-suites-scottsdale-gainey-ranch",
    "booking_url": null,
    "address": "7300 E Gainey Suites Drive, Scottsdale, AZ 85258",
    "phone": "(480) 922-6969",
    "note": "Gainey Ranch, about 5 miles north of Old Town and 5 miles from WestWorld. Its own page puts the Gainey Village Health Club 0.3 mile away, and {ride:scottsdale-az-scottsdale-cycling-gainey-tuesday,scottsdale-az-scottsdale-cycling-gainey-thursday,scottsdale-az-scottsdale-cycling-saturday-ride|Scottsdale Cycling's rides} leave from Scottsdale Rd and Doubletree Ranch Rd at Gainey Village. Every suite has a full kitchen; the free hot breakfast runs 7 to 9, after the Saturday ride has left. A $30 plus tax a night destination fee that covers parking (the hotel's page, Oct 2026). About $174 a night for Nov 2, 2026 on hotels.com (read Oct 20, 2026). Nothing about your own bike on its pages.",
    "price_hint": "$$",
    "bike_policy": "No stated policy — ask",
    "ride_slug": [
      "scottsdale-az-scottsdale-cycling-gainey-tuesday",
      "scottsdale-az-scottsdale-cycling-gainey-thursday",
      "scottsdale-az-scottsdale-cycling-saturday-ride"
    ]
  },
  {
    "name": "Grand Hyatt Scottsdale Resort",
    "url": "https://www.hyatt.com/grand-hyatt/en-US/scott-grand-hyatt-scottsdale-resort",
    "booking_url": null,
    "address": "7500 E. Doubletree Ranch Road, Scottsdale, AZ 85258",
    "phone": "(480) 444-1234",
    "note": "Gainey Ranch, on Doubletree Ranch Rd, the road {ride:scottsdale-az-scottsdale-cycling-gainey-tuesday,scottsdale-az-scottsdale-cycling-gainey-thursday,scottsdale-az-scottsdale-cycling-saturday-ride|the Gainey Village rides} start on; about 5 miles from Old Town and 5 from WestWorld. The $50 a night resort fee (the resort's policies page, Oct 2026) covers bicycle rentals, a shuttle within 5 miles, the gym and the 2.5-acre pool. Those bikes are the resort's; nothing on its pages covers yours. About $522 a night for Oct 28, 2026 on Expedia (read Oct 20, 2026).",
    "price_hint": "$$$$",
    "bike_policy": "No stated policy — ask",
    "ride_slug": [
      "scottsdale-az-scottsdale-cycling-gainey-tuesday",
      "scottsdale-az-scottsdale-cycling-gainey-thursday",
      "scottsdale-az-scottsdale-cycling-saturday-ride"
    ]
  },
  {
    "name": "WestWorld RV Park (WestWorld of Scottsdale)",
    "url": "https://westworldaz.com/rv-and-camping/",
    "booking_url": "https://westworldaz.com/rv-and-camping/reservations/",
    "address": "16601 N Pima Rd, Scottsdale, AZ 85260",
    "phone": "(480) 312-6802",
    "note": "The Tour's start and finish, about 10 miles north of Old Town. 398 RV spaces in eight lots, each with water and electric, and a dump station on site. $57.01 a night with tax (Oct 2026), the first night charged as a non-refundable deposit; no weekly rate, and 14 nights in any 30 at most. Check-in noon, check-out 11 a.m., quiet hours 10 p.m. to 7 a.m. Reserve online or by phone. WestWorld's rules say it provides no security and isn't liable for your property, so the bike sleeps inside the rig.",
    "price_hint": "$",
    "bike_policy": "No stated policy — ask",
    "ride_slug": null
  }
]
```

travel_links

```json
[
  {
    "label": "Tour de Scottsdale lodging page",
    "url": "https://www.tourdescottsdale.org/Race/TourdeScottsdale/Page/Lodging-R-Vs",
    "kind": "official",
    "note": "The Tour's six hotels with their group names and phone numbers, and the WestWorld RV park."
  },
  {
    "label": "WestWorld RV reservations",
    "url": "https://westworldaz.com/rv-and-camping/reservations/",
    "kind": "official",
    "note": "Request a space online, or call (480) 312-6802."
  }
]
```

Field notes for the editor:

- `phone` is in the record because the Phoenix guide's hotels carry it. Every
  number here is from the hotel's own page except Hyatt House/Place
  ((480) 590-8100 is the Tour's page) and the Fairmont's block line in the
  note ((800) 344-4758, the Tour's page; the hotel's own line is the `phone`).
- The Hyatt House/Place address is the Tour's page, confirmed by the geocoder.
  Hyatt's own pages that opened don't print it (see Couldn't confirm).
- **Phoenix guide corrections** (same sources, re-read Oct 20, 2026): the
  Grand Hyatt's resort fee is **$50** on its policies page, not the $55 the
  Phoenix note says; the Sonesta's phone is (480) 922-6969 (Phoenix has null).
- The RV park sits in `hotels[]` because the schema has no other place for a
  bed. If the editor wants it on the logistics page instead, the record moves
  as is.
- The `{ride:…}` markup on the two Gainey hotels is copied from the Phoenix
  guide; the slugs exist in rides.json.

## Why these

- **Hilton Garden Inn Scottsdale North/Perimeter Center** — the Tour's host
  hotel, a block link, free parking, 1.5 miles from WestWorld by its own page.
- **Scottsdale Marriott at McDowell Mountains** — the closest bed to the
  start line; roll to packet pick-up.
- **Holiday Inn & Suites Scottsdale North – Airpark** — the cheap-and-clean
  one near the start, free parking, and the nearest of the six to Old Town.
- **Fairmont Scottsdale Princess** — the splurge, with a Tour block.
- **Hilton North Scottsdale at Cavasson** — a second mid-high option with a
  Tour block, for when the Marriott fills.
- **Hyatt House North Scottsdale / Hyatt Place Scottsdale North** — the
  training-week bed near the start: kitchens, free breakfast, the lowest
  November price of the six.
- **Sonesta Suites Scottsdale Gainey Ranch** — a short roll to the Gainey
  Village start of the Tuesday, Thursday and Saturday rides; kitchens; mid price.
- **Grand Hyatt Scottsdale Resort** — on the road the Gainey rides start on,
  for the rider who wants the resort.
- **WestWorld RV Park** — sleep at the start line for $57 a night.

## Rejected

- **Canopy by Hilton Scottsdale Old Town** (7142 E 1st St, Scottsdale, AZ
  85251; (480) 590-3864; self-parking $25 a day; check-in 4 p.m.) — the
  obvious Old Town pick, a block from Bicycle Haüs. No written policy for a
  guest's own bike: the only bike line on its pages is the meta description
  "Canopy bikes help you feel right at home in the desert," which is the
  brand's house bikes. The task was one Old Town pick *with* a written
  policy, so it stays out. If the hotel ever writes one down it goes in
  first.
- **Bespoke Inn, Old Town** — the one Scottsdale inn built around bikes (a
  2015 Mountain Living piece: Pashley loaners and an on-site road-bike
  shop). Its own homepage today says only "ride on our charming Pashley
  Bicycles"; nothing about your own bike. Its footer gives 6925 E Indian
  School Rd while an older listing gives 3701 N Marshall Way, and its
  policies page redirects to a new domain that wouldn't open. Not confirmed
  enough to list.
- **The Westin Kierland** — came up only on a Peloton-finder directory. Not
  a bike policy; not fetched.
- **Short-term rentals** ("Walk or bike to Old Town," "Old Town Scottsdale
  hot tub, dog friendly, bikes" on Expedia and Travelocity) — "bikes" in a
  listing title means house bikes; no stated policy, no stable own URL.
  Skipped under the rentals rule.
- **The other hotels on Expedia's WestWorld page** (Hilton Vacation Club
  Scottsdale Links 1.2 mi, Sheraton Desert Oasis Villas 2 mi, Hilton
  Vacation Club Villa Mirage 2.2 mi, Holiday Inn Club Vacations 2.4 mi, Best
  Western Plus Thunderbird Suites 2.4 mi, Residence Inn North Scottsdale 2.7
  mi, Courtyard Scottsdale North 2.8 mi, Sleep Inn North Scottsdale 2.8 mi,
  SpringHill Suites 2.9 mi, Hampton Inn & Suites Phoenix/Scottsdale 2.9 mi) —
  not fetched. The Tour's six already cover `$$` to `$$$$` within 3 miles of
  the start, and none of these turned up any bike-policy signal. The Best
  Western Plus Thunderbird Suites ($116 on Expedia) is the lead if the
  editor wants a true `$` hotel near WestWorld.
- **Hilton Garden Inn's "Peloton" room** — a room type with a stationary
  bike in it. Noted so nobody reads the photo alt text as a bike policy.

## Couldn't confirm

- **Bike policy, anywhere.** No property states one. The host hotel is the
  one to ask: the editor (or Robert) could email the Hilton Garden Inn and
  the Tour and get a line in writing, which would make it the one hotel on
  the page "with a bike policy in writing."
- **The 2027 room blocks.** The Tour's Lodging page carries no dates, rates
  or deadlines. Its Marriott link (book.passkey.com/e/51126898) opens on
  "Tour de Scottsdale, March 27–29, 2026 — reservations are closed," so the
  page may still be last year's. The Hilton Garden Inn's event link loads
  but draws its dates and rate in the browser; I couldn't read them. Re-read
  the Lodging page in January 2027.
- **Hyatt House / Hyatt Place address and phone on Hyatt's own site.** The
  overview, hotel-info and policies pages that opened print neither; the
  parking page, dining page and offers page refused the fetch. Address and
  phone here are the Tour's page; the geocoder agrees on the address.
- **Fairmont resort fee.** Not on the homepage or the hotels.com page I
  read. The hotel's own site says "Parking included." Ask at booking.
- **Hilton Cavasson parking.** The overview says self-parking $25 a day,
  valet $40; the hotel-info page says self-parking complimentary, valet $25.
  Both are Hilton's pages, read the same day.
- **Grand Hyatt FAQ page** errored; the policies page gave the $50 resort
  fee and its contents, so nothing is missing from the record.
- **Bespoke Inn's current state** — see Rejected. bespokeinnscottsdale.com
  wouldn't open.
- **Event-weekend pricing.** No Tour rate is published. April prices will
  not look like the November ones above.

## Sources

Read:

- https://www.tourdescottsdale.org/Race/TourdeScottsdale/Page/Lodging-R-Vs
- https://book.passkey.com/e/51126898
- https://www.hilton.com/en/attend-my-event/sctnpgi-tds-4a6c5efd-7e09-4b7b-8e2a-cdd4910212bf/
- https://www.hilton.com/en/hotels/sctnpgi-hilton-garden-inn-scottsdale-north-perimeter-center/
- https://www.hilton.com/en/hotels/sctnpgi-hilton-garden-inn-scottsdale-north-perimeter-center/hotel-location/
- https://www.marriott.com/en-us/hotels/phxno-scottsdale-marriott-at-mcdowell-mountains/overview/
- https://www.experiencescottsdale.com/listing/scottsdale-marriott-at-mcdowell-mountains/1927/
- https://www.ihg.com/holidayinn/hotels/us/en/scottsdale/phxsa/hoteldetail
- https://www.fairmont.com/scottsdale/
- https://www.hilton.com/en/hotels/scfnshh-north-scottsdale-at-cavasson/
- https://www.hilton.com/en/hotels/scfnshh-north-scottsdale-at-cavasson/hotel-info/
- https://www.hyatt.com/hyatt-house/en-US/phxxn-hyatt-house-north-scottsdale
- https://www.hyatt.com/hyatt-house/en-US/phxxn-hyatt-house-north-scottsdale/hotel-info
- https://www.hyatt.com/hyatt-place/en-US/phxzs-hyatt-place-scottsdale-north
- https://www.hyatt.com/hyatt-place/en-US/phxzs-hyatt-place-scottsdale-north/policies
- https://www.hyatt.com/hyatt-place/en-US/phxzs-hyatt-place-scottsdale-north/hotel-info
- https://westworldaz.com/rv-and-camping/
- https://westworldaz.com/rv-and-camping/reservations/
- https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/westworld/westworld-rv-rules-and-regulations.pdf?sfvrsn=363b2790_1
- https://www.sonesta.com/sonesta-hotels-resorts/az/scottsdale/sonesta-suites-scottsdale-gainey-ranch
- https://www.sonesta.com/locations/us/arizona/scottsdale/westworld-scottsdale
- https://www.hyatt.com/grand-hyatt/en-US/scott-grand-hyatt-scottsdale-resort
- https://www.hyatt.com/grand-hyatt/en-US/scott-grand-hyatt-scottsdale-resort/policies
- https://www.hyatt.com/grand-hyatt/en-US/scott-grand-hyatt-scottsdale-resort/events-and-attractions
- https://www.hilton.com/en/hotels/phxotpy-canopy-scottsdale-old-town/
- https://www.hilton.com/en/hotels/phxotpy-canopy-scottsdale-old-town/hotel-info/
- https://www.bespokeinn.com/
- https://purpleroofs.com/listing/bespoke-inn/
- https://www.mountainliving.com/?p=162
- https://www.outsideonline.com/adventure-travel/destinations/seven-great-hotels-bicyclists/?scope=anon
- https://www.outsideonline.com/adventure-travel/destinations/north-america/best-new-cycling-base-camps/?scope=anon
- https://www.expedia.com/Westworld-Of-Scottsdale-Hotels.0-l502337-0.Travel-Guide-Filter-Hotels
- https://www.expedia.com/Phoenix-Hotels-Hilton-Garden-Inn-Scottsdale-NorthPerimeter-Center.h1184004.Hotel-Information
- https://www.expedia.com/Phoenix-Gainey-Ranch.dx553248635074841821
- https://www.hotels.com/ho149313/scottsdale-marriott-at-mcdowell-mountains-scottsdale-united-states-of-america/
- https://www.hotels.com/ho239066/holiday-inn-hotel-suites-scottsdale-north-airpark-an-ihg-hotel-scottsdale-united-states-of-america/
- https://www.hotels.com/ho186507/fairmont-scottsdale-princess-scottsdale-united-states-of-america/
- https://www.hotels.com/ho1942722048/hyatt-house-north-scottsdale-scottsdale-united-states-of-america/
- https://www.hotels.com/ho538654/sonesta-suites-scottsdale-gainey-ranch-scottsdale-united-states-of-america/
- https://nominatim.openstreetmap.org/ (geocoding of every address above; straight-line distances computed from the results)

Would not open (not sources; listed so the next run doesn't retry blind):

- https://www.hyatt.com/grand-hyatt/en-US/scott-grand-hyatt-scottsdale-resort/faqs
- https://www.hyatt.com/hyatt-place/en-US/phxzs-hyatt-place-scottsdale-north/parking-and-transportation
- https://www.hyatt.com/hyatt-house/en-US/phxxn-hyatt-house-north-scottsdale/dining
- https://hyatt.com/en-US/hotel/arizona/hyatt-house-north-scottsdale/phxxn/offers
- https://www.bespokeinn.com/details--policies.html (302 → bespokeinnscottsdale.com/scottsdale-inn, blocked)
- https://www.expedia.com/phoenix-hotels-bespoke-inn-scottsdale.h6152687.hotel-information
- https://www.hotels.com/ho433861 (429)
