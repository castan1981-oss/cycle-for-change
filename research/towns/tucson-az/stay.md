# tucson-az · stay-scout · 2026-10-03

A refresh. I re-checked the five hotels in `data/towns/tucson-az.json` and kept
all five, with fixes. I added one: The Tuxon, the one place in Tucson I found
that puts a policy for your own bike in writing on its own page ("secure
storage"). The other five state nothing about a rider's own bike, so their
`bike_policy` is `null`, per this run's rule. The build reads `null` the same
as "No stated policy — ask," so the strip will say 1 in writing, 5 to ask.
Hotel McCoy and The Tuxon lend their own bikes. That is not a bike policy.

How the run went: the fetch tool would only open URLs that a search had
returned in this session. Search ran out after eight queries. So three
property sites never opened: Hilton's DoubleTree page, Marriott's AC Hotel
page and hotelcongress.com. Those three keep their place on booking-site and
organizer pages (Expedia, Kayak, Tripadvisor, Trivago, Visit Tucson, El Tour's
hotel list, Downtown Tucson Partnership), all read Oct 3, 2026. The verifier
should open their own pages before the build.

Prices: Kayak's "Hotels near Tucson Convention Center" page gave a from-price
and a distance for all six on the same day (Oct 3, 2026). I set `price_hint`
from that single snapshot so the six compare fairly: under $110 is `$`,
$110–199 is `$$`, $200–299 is `$$$`. Kayak shows no stay dates. Dated rates from
Expedia, Hotels.com and El Tour's room blocks are in the notes. These are
October prices, and winter is high season (see Couldn't confirm).

Distances are to the Tucson Convention Center (260 S Church Ave), where El
Tour starts and finishes. They come from Kayak's listing page, with Tripadvisor
as a cross-check. I computed none, and no hotel page gave coordinates.

## Findings

hotels

```json
[
  {
    "name": "The Tuxon",
    "url": "https://www.thetuxonhotel.com/",
    "booking_url": "https://www.ihg.com/voco/hotels/us/en/tucson/tusvo/hoteldetail",
    "address": "960 S Freeway Road, Tucson, AZ 85745",
    "note": "The Loop is two blocks from the door by the hotel's own page, and the convention center, where El Tour starts, is about 0.7 mile by Kayak's map. Secure storage for your own bike, free cruisers from its Bike Shed, free parking; IHG books it as voco The Tuxon. From $127 a night on Kayak (Oct 3, 2026); El Tour's 2026 room block was $159.",
    "price_hint": "$$",
    "bike_policy": "Secure storage for your own bike, per the hotel's About page. It doesn't say the bike can go in the room."
  },
  {
    "name": "Hotel McCoy",
    "url": "https://www.hotelmccoy.com/locations/tucson",
    "booking_url": null,
    "address": "720 West Silverlake Road, Tucson, AZ 85713",
    "note": "A motor lodge on one level with room-front parking (Hotels.com), so the bike goes from the car to the room with no stairs. The Santa Cruz River Park path is about a 10-minute walk by the same listing, and the convention center about 1.4 miles by Kayak's. Free breakfast 6 to 10 a.m., heated saltwater pool, free parking, dogs stay free; $80 a night before tax for Oct 11, 2026 (Hotels.com).",
    "price_hint": "$",
    "bike_policy": null
  },
  {
    "name": "DoubleTree by Hilton Tucson Downtown Convention Center",
    "url": "https://www.hilton.com/en/hotels/tusaudt-doubletree-tucson-downtown-at-the-convention-center/",
    "booking_url": null,
    "address": "280 S Church Ave, Tucson, AZ 85701",
    "note": "About 0.1 mile from the convention center, where El Tour starts and finishes (Kayak and Tripadvisor). Outdoor pool and an elevator; self-parking $24 a night, valet $30. $150 a night for Oct 19, 2026, taxes in (Expedia); from $207 on Kayak (Oct 3, 2026).",
    "price_hint": "$$$",
    "bike_policy": null
  },
  {
    "name": "The Leo Kent Hotel",
    "url": "https://www.marriott.com/en-us/hotels/tustx-the-leo-kent-hotel-tucson-a-tribute-portfolio-hotel/overview/",
    "booking_url": null,
    "address": "1 South Church Avenue, Tucson, AZ 85701",
    "note": "About 0.2 mile from the convention center (Kayak). A Marriott Tribute Portfolio hotel with a gym and an elevator; self-parking $32 a day, valet $39. $175 for Oct 11, 2026, taxes in (Expedia), and from $272 on Kayak (Oct 3, 2026); El Tour's 2026 room block was $235.",
    "price_hint": "$$$",
    "bike_policy": null
  },
  {
    "name": "AC Hotel by Marriott Tucson Downtown",
    "url": "https://www.marriott.com/hotels/travel/tusad-ac-hotel-tucson-downtown/",
    "booking_url": null,
    "address": "151 E Broadway Blvd, Tucson, AZ 85701",
    "note": "On Broadway downtown, about 0.4 mile from the convention center (Kayak). From $211 a night on Kayak (Oct 3, 2026); El Tour's 2026 room block was $214.",
    "price_hint": "$$$",
    "bike_policy": null
  },
  {
    "name": "Hotel Congress",
    "url": "https://hotelcongress.com/",
    "booking_url": null,
    "address": "311 E Congress St, Tucson, AZ 85701",
    "note": "The historic hotel downtown, about 0.5 mile from the convention center (Kayak). The rooms are upstairs (Visit Tucson lists 39 second-floor rooms, so ask about stairs), the Cup Café, a tap room and Club Congress are downstairs, and Visit Tucson mentions the rumble of passing trains: lively, not quiet. From $186 on Trivago and $213 on Kayak (Oct 2026).",
    "price_hint": "$$$",
    "bike_policy": null
  }
]
```

travel_links

```json
[
  {
    "label": "El Tour de Tucson hotel blocks",
    "url": "https://eltourdetucson.org/el-tour-de-tucson/accommodations-and-travel/",
    "kind": "official",
    "note": "The organizer's room blocks for the 2026 ride weekend (Nov 19–22), sorted by distance from the start: about 20 hotels, $89 to $235 a night. Some close early: the JW Marriott Starr Pass block on Oct 22, 2026, TownePlace Suites Tucson Airport on Oct 29, The Alice Hotel on Nov 5."
  }
]
```

## Why these

- **The Tuxon** (new; the Loop, west of downtown). It's the only Tucson hotel I found with a written line about your own bike: "Bringing your own? We've got secure storage to keep your ride safe while you sleep off those poolside slushies" (About page). The Loop is two blocks away, the El Tour start under a mile, and parking is free. It also has a 24/7 gym and a pool, and one dog up to 50 lb is $50 a stay (IHG).
- **Hotel McCoy** (kept, fixed; the Loop, south-west). It's the cheap, clean bed. One level with parking at the door is the next best thing to a bike policy: the bike never sits in a lot. Breakfast opens at 6 a.m., early enough for a ride-out. Booking listings say guests get free use of the hotel's bicycles. Its own homepage says nothing about bikes. A June 2026 Tripadvisor review is from a guest who came "to ride The Loop."
- **DoubleTree Tucson Downtown Convention Center** (kept, fixed). It's the closest bed to the El Tour start and finish, a two-minute walk by Tripadvisor. It has an elevator and a pool. The price level stays `$$$` on Kayak's number. Note that it isn't on El Tour's 2026 room-block list.
- **The Leo Kent Hotel** (kept, fixed). It's a few minutes' walk from the start and is on El Tour's room-block list. It has an elevator and a gym. The highest rate here.
- **AC Hotel by Marriott Tucson Downtown** (kept, fixed). It's downtown, under half a mile from the start, and on El Tour's room-block list. Its own page didn't open, so it has the thinnest record of the six.
- **Hotel Congress** (kept, fixed). It's where you stay for the town, not for the sleep. Breakfast at the Cup Café downstairs. Rooms are upstairs, so an elevator matters if you're carrying a bike; no page I read said whether there is one.

Zones: all six sit in the brief's Zone 2 (the Loop, downtown and the west side
near the Santa Cruz). None is at the foot of Mount Lemmon, in Oro Valley or on
the east side. See Couldn't confirm for the leads.

Event weekend: El Tour de Tucson is in `data/events/` (2027 projected Nov 20).
The organizer's 2026 page lists room blocks for Nov 19–22, 2026 at three
distances from the start. It gives deadlines for only a few (above) and says
nothing about selling out. I didn't check whether a 2027 page exists yet.

## Rejected

- **Bikehaven house (Expedia/Vrbo listing h87891878, Rillito area)**: fetched. A 4-bedroom vacation rental "on the famous Loop Bike Path" that lends four beach cruisers. It says nothing about guests' own bikes, has no site of its own and lists no street address. It fails the short-term-rental rule.
- **Graduate Tucson** (930 E 2nd St): Bikabout says "free bikes for guests." That's loaner bikes, not a policy. Its FAQ URL (graduatehotels.com/tucson/faq/) now 302s to Hilton's Graduate brand page. I didn't read its own page, so I didn't list it. It stays a lead below because of where it is.
- **Bikabout's Tucson list**: fetched. The Tuxon ("roll-in-room bike parking") and the Graduate ("free bikes"). Both links are affiliate redirects to Tripadvisor. Used for leads only. The Tuxon's own page says "secure storage," not "in room," and the record uses the hotel's words.
- **cyclestayguide.com's Tucson list**: fetched. El Conquistador (the resort fee includes a "two-hour bike rental for two"), Loews Ventana Canyon (bike hire "per aggregator listings") and voco The Tuxon ("complimentary guest bikes"). All three are loaner bikes. Used for leads.
- **Tripadvisor "Hotels with Bike Rentals" list**: fetched. Ten properties ranked by rating, with loaner bikes as the filter. Leads only.
- **Tucson bike rental and tour companies** (Tucson Bicycle Rental, Lemmon Bike Rentals, Bike Tucson, Pedego Mt Lemmon) came up in a lodging search. Not lodging, not fetched. They're for @logistics-scout's rent list if useful.
- **The Cycling House, "Arizona Cycling Vacations"**: a guided camp package, not a room you can book for a night. Not fetched.

## Couldn't confirm

- **Own pages for three kept hotels.** DoubleTree (hilton.com), AC Hotel (marriott.com) and Hotel Congress (hotelcongress.com) would not open. The fetch tool refused any URL that hadn't come back from a search, and none of the eight searches returned these. Their addresses match across Expedia or Tripadvisor, Downtown Tucson Partnership's hotel list and (AC) El Tour's list. All three are taking bookings on booking sites as of Oct 3, 2026. Where to look: each URL in the record. On hotelcongress.com, check for an elevator, a bike line and the room rate.
- **The Leo Kent's own site.** theleokenthotel.com (the old `url`) didn't open for the same reason. I switched `url` to Marriott's page for the hotel, which did. If the verifier finds theleokenthotel.com live, the editor can switch back. Marriott calls it "The Leo Kent Hotel, Tucson, a Tribute Portfolio Hotel."
- **Hotel McCoy's location page.** hotelmccoy.com/locations/tucson (the `url`) is linked from the McCoy homepage, which I fetched, but it didn't open itself. The homepage also links hotelmccoy.com/booking/tucson. I left `booking_url` null until someone opens it. The homepage's only phone is 1-844-782-9622 and its email is tucson@hotelmccoy.com. A 2022 TrainerRoad post calls the McCoy "bike friendly" and says it hosted spring cycling camps. That's a forum, not the hotel. Ask the hotel whether bikes can go in the rooms.
- **The Tuxon's storage.** Its page says "secure storage" and doesn't say where (a locked room, a rack, the Bike Shed). Bikabout says "roll-in-room bike parking." The hotel doesn't say that. Its FAQ (thetuxonhotel.com/faqs) is linked from the homepage but didn't open. Two phone numbers appear: 1-520-372-8253 on the hotel's site and +1-520-372-2853 on IHG and Bikabout. The verifier should dial one.
- **Hotel Congress elevator.** Visit Tucson says the rooms are on the second floor. No page I read said whether there's a lift.
- **Winter rates.** Every number here is for October 2026, plus El Tour's November blocks. The rider this guide is for comes November to April. Read a January weekday and a January Saturday on Kayak before trusting the levels. Two levels moved from the old file: Hotel McCoy `$$` → `$` ($80–$103) and Hotel Congress `$$` → `$$$` ($186–$213; it sits on the line).
- **No splurge and nothing near the climbs.** These are the leads for Zones 1, 4 and 5, none with a property page fetched:
  - Loews Ventana Canyon (Catalina foothills, Lemmon side)
  - Comfort Suites at Sabino Canyon ("bike friendly… a few minutes from the Mount Lemmon Highway," Pinkbike, Sept 2018)
  - El Conquistador Tucson, a Hilton resort (Oro Valley; its resort fee includes a two-hour bike rental, per cyclestayguide citing Hilton's things-to-do page)
  - Westin La Paloma (north, near the Loop, TrainerRoad 2022)
  - JW Marriott Starr Pass (Tucson Mountains, west; on El Tour's list at $219, block through Oct 22, 2026)
- **More Loop-side leads** from a five-year-old Tripadvisor forum thread and a 2024 TrainerRoad post, all unchecked:
  - Homewood Suites at Campbell and River ("right on the bike path," the Rillito)
  - Hilton Tucson East on Broadway ("right next to the bike path," Oct 2024)
  - Country Inn & Suites on the Santa Cruz near downtown
  - Holiday Inn & Suites on Wetmore
  - Studio 6 at Irvington
- **Near the Shootout start (University & Euclid).** Graduate Tucson (930 E 2nd St) and Marriott University Park (880 E 2nd St; El Tour block $185) are both on E 2nd St by the university. Neither page opened, and I measured no distance. Where to look: each hotel's page and a map for the distance to `{ride:tucson-az-the-shootout|the Shootout}`'s start.
- **More El Tour block hotels**, from the organizer's page, none with a property page fetched:
  - The Alice Hotel (1222 S Freeway Rd, $89, block until Nov 5): a possible second cheap bed beside the Tuxon
  - Ramada by Wyndham (777 W Cushing St, $115)
  - Hampton Inn & Suites and Home2 Suites (141 S Stone Ave, $200)
  - Aloft (1900 E Speedway, $139)
  - Lodge on the Desert (306 N Alvernon, $195)
  - Spark by Hilton Reid Park ($119)
- **A hostel or cyclist-run guesthouse.** I found none, though search ran out before I could look for a hostel directly. Where to look: "Tucson hostel," and the bike clubs in the rides directory for where visiting riders stay.

## Hand-offs

- **@culture-scout:** Hotel Congress has the Tap Room and three venues (Club Congress, The Plaza, The Century Room) on site, per Visit Tucson.
- **@coffee-scout:** Hotel McCoy's listing name is "Hotel McCoy – Art, Coffee, Beer, Wine," and its homepage mentions an oatmeal bar. Breakfast runs 6 to 10 a.m. per Orbitz. It might be a coffee stop on the south-west Loop.
- **@logistics-scout:** downtown hotel parking runs $24–$39 a day (DoubleTree self $24, valet $30; Leo Kent self $32, valet $39, Oct 2026). The Tuxon and Hotel McCoy park free. El Tour's site has a "Bike Shipping" page (BikeFlights) in its menu. I didn't fetch it.
- **@town-editor:** the session asked for `null` when there's no written policy, not the template's "No stated policy — ask when you book." The LA file uses the string, and the build treats both the same. Pick one for every town.

## Sources

- https://www.thetuxonhotel.com/
- https://www.thetuxonhotel.com/about
- https://www.thetuxonhotel.com/things-to-do-tucson
- https://www.ihg.com/voco/hotels/us/en/tucson/tusvo/hoteldetail
- https://www.expedia.com/Tucson-Hotels-The-Tuxon-Hotel.h206165.Hotel-Information
- https://www.hotelmccoy.com/
- https://www.hotels.com/ho202768/hotel-mccoy-art-coffee-beer-wine-tucson-united-states-of-america/
- https://www.orbitz.com/Tucson-Hotels-Hotel-McCoy-Art.h188379.Hotel-Information
- https://www.tripadvisor.com/Hotel_Review-g60950-d75243-Reviews-Hotel_Mccoy_Tucson-Tucson_Arizona.html
- https://www.arizonahighways.com/business/hotel-mccoy
- https://www.expedia.com/Tucson-Hotels-DoubleTree-By-Hilton-Tucson-Downtown-Convention-Center.h61523752.Hotel-Information
- https://www.marriott.com/en-us/hotels/tustx-the-leo-kent-hotel-tucson-a-tribute-portfolio-hotel/overview/
- https://www.expedia.com/Tucson-Hotels-The-Leo-Kent-Hotel.h83978629.Hotel-Information
- https://www.visittucson.org/listing/hotel-congress/145/
- https://www.trivago.com/en-US/oar/hotel-congress-tucson?search=100-1040594
- https://www.kayak.com/Tucson-Hotels_Tucson-Convention-Center.L8769.29704.hotel.ksp
- https://www.tripadvisor.com/HotelsNear-g60950-d561997-Tucson_Convention_Center-Tucson_Arizona.html
- https://downtowntucson.org/explore/hotels
- https://eltourdetucson.org/el-tour-de-tucson/accommodations-and-travel/
- https://www.bikabout.com/tucson
- https://cyclestayguide.com/destinations/tucson-az/
- https://www.tripadvisor.com/HotelsList-Tucson-Hotels-With-Bike-Rentals-zfp18474566.html
- https://www.tripadvisor.com/ShowTopic-g60950-i259-k13459587-Biking_The_Loop_looking_for_close_hotels-Tucson_Arizona.html
- https://www.trainerroad.com/forum/t/tucson-info-where-to-stay/78161
- https://www.pinkbike.com/news/local-flavors-the-complete-guide-to-riding-in-tucson-az.html
- https://www.expedia.com/Tucson-Hotels-Bikehaven-Large-Stylish-Central-Tucson-Home.h87891878.Hotel-Information

Tried and could not open:
- Refused because the URL hadn't come from a search result:
  - https://www.hilton.com/en/hotels/tusaudt-doubletree-tucson-downtown-at-the-convention-center/
  - https://www.theleokenthotel.com/
  - https://www.marriott.com/hotels/travel/tusad-ac-hotel-tucson-downtown/
  - https://hotelcongress.com/
  - https://www.hotelmccoy.com/locations/tucson
  - https://www.ihg.com/voco/hotels/gb/en/tucson/tusvo/hoteldetail/amenities
  - https://www.hilton.com/en/hotels/tushthh-el-conquistador-tucson/things-to-do/
  - https://downtowntucson.org/go/the-leo-kent-hotel
- 404:
  - https://www.thetuxonhotel.com/outdoor-pursuits/
  - https://thetuxonhotel.com/explore
- 302 to Hilton's brand page: https://www.graduatehotels.com/tucson/faq/
- Blocked by robots.txt: https://www.booking.com/hotel/us/doubletree-by-hilton-tucson-downtown-convention-center.html
