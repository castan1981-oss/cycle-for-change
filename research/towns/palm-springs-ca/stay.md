# palm-springs-ca · stay-scout · 2026-10-03

No hotel made the list this run. The Tour de Palm Springs site has a lodging
page with 19 hotels, grouped by distance from the start. Every one of those
hotel pages was refused: the permission request for each URL timed out. So
no property page was read, and nothing about an address, what the place is,
a bike policy or a rate can go in. WebSearch was spent before this run began
(the session had used 200 of 200), so there was no second way to find leads.
The geocoder page for the town centre was refused too, so nothing here is
measured from 33.8303, -116.5453. What did load: the organizer's pages. They
give one official link worth carrying (the Tour's hotel list) and the start
block, which hand-offs below pass on.

## Findings

```json
[]
```

travel_links

```json
[
  {
    "label": "Tour de Palm Springs hotel list",
    "url": "https://tourdepalmsprings.com/event-info/lodging/",
    "kind": "official",
    "note": "The Tour's own list of 19 Palm Springs hotels, grouped by distance from the start and finish: under 1, 2, 3 and 5 miles. The page says each hotel has special rates and incentives, and the Tour's charities get a donation for every room booked. Book with the hotel directly. Read Oct 3, 2026."
  }
]
```

## Why these

- **No hotels.** None could be read on its own page, and a hotel goes in only
  after its own page is read. An empty list is better than a guess about
  where the bike sleeps.
- **Tour de Palm Springs hotel list (travel link)** — the organizer's own
  page, and the closest thing to "where riders stay" this run could read. It
  sorts the hotels by distance from the start on S. Palm Canyon Dr, which
  sits on the brief's centre intersection. It says nothing about bikes.

## Rejected

Nothing was rejected on merit. No property page loaded, so there was nothing
to weigh.

- **GranFondoGuide's Tour page** — read. No lodging. It gives the start as
  "North Palm Canyon," which the organizer's own pages contradict (see
  Hand-offs). Not a source for this section.
- **Big Wheel Bikes CV home page** — read. Nothing about hotels, where
  visiting riders stay, delivery of rentals to a hotel, or receiving a
  shipped bike.
- **Tour de Palm Springs parking page** — read. A map image only; no text
  about bike parking or hotels.
- **Tour de Palm Springs FAQ, registration, expo and sponsors pages** — read.
  No host hotel, no room block, no minimum stay, no bike valet or bike check.
  Nothing on any organizer page says hotels fill or set minimum stays on Tour
  weekend, so the guide shouldn't say it either.

## Couldn't confirm

**The 19 hotels on the Tour's lodging page.** For each one the property page
is missing: address, what the place is, bike policy, rate, open status. The
organizer's distance band is the only fact in hand. The 13 marked "refused"
were tried on Oct 3, 2026 and the permission request timed out; the other 6
were not tried after 13 refusals in a row. Where to look: the same URLs, in a
session where the fetch is approved (or with the URLs pasted into a message),
then each site's amenities, FAQ and policies pages for "bike."

Under 1 mile from the start/finish (the organizer's band):
- **Hilton Palm Springs** — https://www.hilton.com/en/hotels/psppshf-hilton-palm-springs/ — refused. Also a Tour lodging sponsor (sponsors page). Read this one first.
- **Hyatt Palm Springs** — https://www.hyatt.com/hyatt-hotels/en-US/palms-hyatt-palm-springs — refused.
- **Rowan** — https://www.rowanpalmsprings.com/ — refused.
- **Hotel Zoso** — https://www.hotelzosopalmsprings.com/ — refused.
- **Palm Mountain Resort** — https://www.palmmountainresort.com/ — refused.
- **Holiday House** — https://holidayhouseps.com/ — refused.
- **Alcazar** — https://alcazarpalmsprings.com/ — not tried.
- **The Dunes** — https://www.dunesps.com/ — not tried.
- **Colony Palms** — https://colonypalmshotel.com/ — refused.
- **Ingleside Estate** — https://inglesideestate.com/ — not tried.
- **Avalon Hotel** — https://www.avalon-hotel.com/palm-springs/ — refused.

Under 2 miles:
- **Riviera Palm Springs** — https://rivierapalmsprings.com/ — refused.
- **Caliente Tropics** — https://calientetropics.com/ — refused. The likeliest cheap pick by name; unread, so no price level.

Under 3 miles:
- **The Saguaro** — https://thesaguaro.com/palm-springs/ — refused.
- **Twin Palms Resort** — https://twinpalmsresort.com/ — not tried.
- **Sparrows Lodge** — https://sparrowslodge.com/ — not tried.
- **Ace Hotel** — https://acehotel.com/ (the organizer links the chain home page, not the Palm Springs page) — refused.
- **L'Horizon** — https://lhorizonpalmsprings.com/ — not tried.

Under 5 miles:
- **Azure Palm Hot Springs** — https://azurepalmhotsprings.com/ — not tried. The only one outside the 3-mile ring.

Also:
- **Palm Springs Resorts members** — https://www.ps-resorts.com/members, linked from the lodging page as the "PS Resorts Partner" and named a lodging sponsor. Refused. The brief's line about small, adults-only and clothing-optional resorts applies here and to several names above. None was read, so none is described. The next run reads each page, says what the place is in its own plain words, and lists only what suits a rider with a bike.
- **Courtyard by Marriott** — a Tour lodging sponsor. The sponsors page doesn't say which Courtyard. Where to look: Marriott's Palm Springs listings, then the Tour (info@tourdepalmsprings.com).
- **Zones 2 and 3 (CV Link, Palm Desert, La Quinta, the Highway 74 climb).** No leads at all; the organizer's list is downtown Palm Springs only, and with no WebSearch there was no way to find more. Where to look: hotels in Palm Desert near Highway 74 and Highway 111; Big Wheel Bikes' Palm Desert shop (74200 Highway 111) may know where visiting riders stay.
- **A hostel or cyclist-run guesthouse.** Not searched (no WebSearch).
- **Short-term rentals.** None looked at; none listed.
- **The town centre.** The brief asks for a geocoder page to confirm 33.8303, -116.5453. The Nominatim query (https://nominatim.openstreetmap.org/search?q=S+Palm+Canyon+Dr+and+Tahquitz+Canyon+Way,+Palm+Springs,+CA&format=json) was refused, so no distance here is measured; the only distances are the organizer's bands.

## Hand-offs

- **@logistics-scout / @town-editor:** the start is "South Palm Canyon between Baristo & Tahquitz" (FAQ), and check-in is at "South Palm Canyon and Baristo (approximately 216 S. Palm Canyon)" (registration page). That block touches the brief's centre (Palm Canyon at Tahquitz). GranFondoGuide says "North Palm Canyon"; the organizer's pages win. Tentative start times from the FAQ: 101 mi 6:30 a.m., 88 mi 7:00, 77 mi 7:30, 64 mi 8:00, 33 mi 9:00, 16 mi 9:30. The expo runs on S. Palm Canyon between Tahquitz and Baristo, Fri Feb 5, 2027, noon to 8 p.m., and Sat Feb 6, 6 a.m. to 5 p.m. The FAQ says parking time limits are waived on ride day; the parking page is a map image with no text.
- **@shop-scout:** the Tour's bike-shop sponsor is Tri-A-Bike (sponsors page). Big Wheel Bikes CV lists two shops: 74200 Highway 111, Palm Desert, CA 92260, and 1590 South Palm Canyon Drive, Palm Springs, CA 92264.
- **@community-scout:** nothing here runs rides.

## Sources

- https://tourdepalmsprings.com/event-info/
- https://tourdepalmsprings.com/event-info/lodging/
- https://tourdepalmsprings.com/faq/
- https://tourdepalmsprings.com/parking/
- https://tourdepalmsprings.com/registration/
- https://tourdepalmsprings.com/event-info/vendor-expo/
- https://tourdepalmsprings.com/event-info/sponsorship-our-sponsors/
- https://www.granfondoguide.com/Events/Index/2618/tour-de-palm-springs
- https://www.bigwheelbikescv.com/

Tried and could not open (permission request timed out, Oct 3, 2026):
https://www.hilton.com/en/hotels/psppshf-hilton-palm-springs/ ·
https://www.hyatt.com/hyatt-hotels/en-US/palms-hyatt-palm-springs ·
https://www.rowanpalmsprings.com/ · https://www.hotelzosopalmsprings.com/ ·
https://www.palmmountainresort.com/ · https://calientetropics.com/ ·
https://acehotel.com/ · https://holidayhouseps.com/ ·
https://rivierapalmsprings.com/ · https://thesaguaro.com/palm-springs/ ·
https://www.avalon-hotel.com/palm-springs/ · https://colonypalmshotel.com/ ·
https://www.ps-resorts.com/members ·
https://nominatim.openstreetmap.org/search?q=S+Palm+Canyon+Dr+and+Tahquitz+Canyon+Way,+Palm+Springs,+CA&format=json

WebSearch: one call made; it returned no results ("this session has used its
web search budget (200 of 200 WebSearch calls)").
