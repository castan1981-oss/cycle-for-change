# Start pins, tier A, part 3 — Oct 19, 2026

Eight rides with `geo_precision: "city"`. Batch: `2026-10-19-tier-a-pins-part-3.json` (dry run passes). Pins come only from a start the host states; Nominatim sanity-checked each hit (within 40 km of the old pin, right street and town).

## Pinned (2)

- **sydney-au-balmain-bike-bus-wednesday** — The Bike Leichhardt Meetup event (Wed Sept 30, 2026) states the venue: "Loyalty Square, Cnr. Darling & Beattie streets, Balmain", with Meetup's own venue pin at -33.857655, 151.18121. Nominatim reverse: "Westpac, 274, Darling Street, Balmain, Inner West, Sydney, NSW 2041" (Loyalty Square is that corner); Nominatim's forward search for "Loyalty Square, Balmain" returned nothing, so the host's own pin is used. 2.5 km from the old city pin. Source: https://www.meetup.com/bike-leichhardt/events/316150340/ · Outcome: changed, pin fix only (checked_on stays 2026-10-01). The Meetup ICS today lists no Bike Bus event (last posted Sept 30), so the ride wasn't confirmed; the watcher's Oct 14 07:50 match was a different event.
- **midland-tx-trek-wednesday-shop-ride** — PBBA's weekly rides page: "Location: Trek Midland … Roll out from Trek at 6:15". Trek's own store page: "Store address 4712 N Midkiff Road Midland, Texas, 79705". Nominatim: 32.0371083, -102.1299218, "Peyton's Bikes, 4712, North Midkiff Road, Northpark Shopping Center, Midland, Midland County, Texas, 79705" (OSM keeps the shop's old name; same address). 24 km from the old pin, which sat south of town. Sources: https://pbbatx.com/weekly-club-rides · https://www.trekbikes.com/us/en_US/retail/midland/ · Outcome: changed, pin fix only (checked_on stays 2026-10-01). Nothing on the PBBA page dates the ride past "Begins March 11, 2026"; it ends when daylight runs out (DST ends Nov 1).

## Confirmed without a pin (1)

- **tulsa-ok-tbc-tuesday-thursday-morning-ride** — The ClubExpress calendar (https://tulsabicycleclub.clubexpress.com/content.aspx?page_id=4001&club_id=539195) loads as text now and lists "Tuesday/Thursday Ride (Bentley Park, Bixby)" for Oct 20, 22, 27 and 29, 2026 at 9:00 AM; the event page gives the October start as "Bentley Park, ne corner near restrooms … 8505 E 148th St S Bixby, OK 74008". September's rides were from "17th & Riverside". The start moves every month, so the pin stays at city level (a Bentley Park pin would be wrong in November). Outcome: changed with checked_on 2026-10-19 — the day and time were seen with upcoming dates — plus `start_times` from the host's own seasonal table on the weekly rides page (Dec–Feb 9:30, Mar–May 9:00, Jun–Aug 8:00, Sep–Nov 9:00) and a refresh note pointing at the calendar. Drop this entry if the merge wants pins only; nothing else in the batch depends on it.

## No stated start (5) — no entry in the batch

- **guadalajara-mx-via-recreactiva** — viarecreactiva.org (and /ruta/) answers 403 with a 110-byte JS redirect to bots; WebFetch failed too. The sources (El Informador, NNC) are news, not the host, and describe a 30 km route, not a meeting point. A person could open viarecreactiva.org in a browser and see whether the program names an anchor (the news puts the Minerva roundabout at the west end of the main axis). Old pin kept.
- **mexico-city-mx-indeporte-cicloton** — indeporte.cdmx.gob.mx resets the connection over HTTPS and answers 503 over HTTP. Chilango (Sept 25, 2026) gives the September circuit as Avenida Mazatlán and Alfonso Reyes to Río Churubusco and Oriente 110; the route changes monthly and the host names no fixed start. Nothing to pin. Next edition Sun Oct 25; Indeporte posts the route on its social accounts the week before.
- **milwaukee-wi-mke-rec-saturday-community-bike-rides** — Bike Fed listing: "Rides originate at different locations all around the county every Saturday". The registration portal (wimilwaukeeweb.myvscloud.com) is a 403 bot wall. No fixed start. Season ends Oct 24, 2026, so the next re-check should set seasonal-break.
- **palo-alto-ca-alto-velo-womens-wtfnb-ride** — altovelo.org/womens-ride: "Start: Saturdays 9:00am from various locations around the bay." Newest post Oct 4, 2026: a recruiting ride Sunday Oct 11 from Summit Bicycles, Palo Alto, meet 9:00, "our final recruiting ride of the year". No fixed start. For the next re-check: several listed rides fall on Sundays (Oct 11, June 28, Dec 7), so "Some Saturdays" undersells it.
- **philadelphia-pa-laurel-hill-fridays** — The Trellis calendar says only "Laurel Hill Fridays | Social, women-led, WTF-friendly. 6:45am." and links Instagram @laurelhillfridays, which bounced to a login wall (429) and was blocked for WebFetch. A person could read the Instagram bio or a recent post for the meeting point.

## Nominatim calls

- reverse -33.857655,151.18121 → 274 Darling Street, Balmain 2041 (used the host's Meetup pin)
- "Loyalty Square, Balmain, NSW, Australia" → no hit · "Loyalty Square Balmain" → no hit · "Woolworths, Darling Street, Balmain" → no hit
- "4712 N Midkiff Road, Midland, TX 79705, USA" → 32.0371083, -102.1299218 (Peyton's Bikes / Trek Midland, Northpark Shopping Center)
