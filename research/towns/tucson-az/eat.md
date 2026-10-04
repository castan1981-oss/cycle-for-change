# tucson-az · eat-scout · 2026-10-03

Eight places: the six already in `data/towns/tucson-az.json`, re-checked and
all kept with fixes, plus two new ones. Seven have hours and address from the
restaurant's own page this run. Cup Cafe's page loaded but showed no hours,
so its note says so and its old hours come out. One place sits where a listed
ride meets: Seis Kitchen, in the Mercado courtyard where the Women's Shootout
starts. No page anywhere names where a Tucson ride ends for food. No bike
parking, pump or hose was confirmed anywhere.

The picks lean on downtown, Fourth Avenue, the Mercado and midtown. Mount
Lemmon, Saguaro East, the north side and the south (Madera Canyon, Green
Valley) have no confirmed restaurant: the search cap ran out before their
leads could be fetched (see Couldn't confirm). The Cookie Cabin (pizza, at the
top of Lemmon) and Time Market (open till 10 by the university) are confirmed
in `coffee.md`; the editor can cross-list them here.

Both sections shared one budget: 12 searches (the cap, all used) and 47
fetches, 9 of which failed. Fetches only loaded for URLs that had come back in
a search.

**Re-check of the six already listed (verified 2026-09-15):**

- **El Charro Café (Downtown)** — keep, fixed. Address and 11–9 daily confirmed on its own page; it takes reservations. "Same family since 1922" and "carne seca is the dish" were not on the page this run (the History page didn't come back in a search, so it wasn't read); both come out.
- **Cup Cafe at Hotel Congress** — keep, fixed. The page confirms the patio into the hotel plaza and no reservations for breakfast or lunch. It shows no hours, so "breakfast from 8, dinner till 9, closes 2–4" comes out. Address carried from the file's existing source (hotelcongress.com/about/contact/), not re-read.
- **BOCA by Chef Maria Mazon** — keep, fixed. Address, phone and hours confirmed. "Dog-friendly patio" was not on the page; it comes out.
- **Seis Kitchen (Mercado San Agustín)** — keep, fixed. Suite #100 added; breakfast hours split by weekday and weekend; no reservations. "Right on the Loop" was not on the page; it comes out. Tied to the Women's Shootout.
- **Tumerico** — keep, fixed. Hours added (closed Monday). "Chef Wendy Garcia" was not on the page; it comes out.
- **Barrio Bread** — keep, fixed. Now open every day, 9 to 1 or until sold out (the file said Tuesday to Saturday). The 2022 James Beard award is on its About page.

## Findings

```json
[
  {
    "name": "El Charro Café (Downtown)",
    "url": "https://www.elcharrocafe.com/locations/downtown/",
    "address": "311 N Court Ave, Tucson, AZ 85701",
    "cuisine": "Sonoran Mexican",
    "note": "The night before, downtown. Open 11 to 9 every day, and it takes reservations, so a group can book ahead, per its site. (520) 622-1922."
  },
  {
    "name": "Cup Cafe at Hotel Congress",
    "url": "https://hotelcongress.com/restaurants/cup-cafe/",
    "address": "311 E Congress St, Tucson, AZ 85701",
    "cuisine": "American cafe",
    "note": "After the ride, downtown: the café inside Hotel Congress, with a dining room and a patio that runs out into the hotel's plaza. No reservations for breakfast or lunch, per its page. The page gave no hours when we checked in October 2026; confirm before you go."
  },
  {
    "name": "BOCA by Chef Maria Mazon",
    "url": "https://bocatacos.com/",
    "address": "533 N 4th Ave, Tucson, AZ 85705",
    "cuisine": "Tacos",
    "note": "The night before, or late on a weekend, on Fourth Avenue: tacos on corn or flour tortillas with the house salsas, cooked to order. Noon to 9 Monday to Thursday, to 10 Friday and Saturday, to 8 Sunday, per its site. 520-777-8134."
  },
  {
    "name": "Seis Kitchen (Mercado San Agustín)",
    "url": "https://www.seiskitchen.com/locations",
    "address": "130 S Avenida del Convento #100, Tucson, AZ 85745",
    "cuisine": "Mexican",
    "note": "After the ride, west side: in the Mercado San Agustín courtyard where {ride:tucson-az-womens-shootout|the Women's Shootout} meets. Breakfast from 8, until 11 on weekdays and noon on weekends, then lunch and dinner to 9. No reservations; you order, then they seat you, per its site. (520) 622-2002.",
    "ride_slug": "tucson-az-womens-shootout"
  },
  {
    "name": "Tumerico",
    "url": "https://www.tumerico.com/",
    "address": "2526 E 6th St, Tucson, AZ 85716",
    "cuisine": "Latin vegan",
    "note": "The meat-free pick, midtown on Sixth Street: vegetarian and vegan Latin American plates. 11 to 8 Tuesday to Saturday, 10 to 4 Sunday, closed Monday, per its site, so it is an early dinner. 520-240-6947."
  },
  {
    "name": "Barrio Bread",
    "url": "https://barriobread.com/",
    "address": "18 S Eastbourne Ave, Tucson, AZ 85716",
    "cuisine": "Bakery",
    "note": "The one you'd go back for: Don Guerra's bakery; he won the James Beard Award for Outstanding Baker in 2022, per its site. Open 9 to 1 every day, or until it sells out, so go in the morning. 520-327-1292."
  },
  {
    "name": "El Güero Canelo (Oracle)",
    "url": "https://elguerocanelo.com/",
    "address": "2480 N Oracle Rd, Tucson, AZ 85705",
    "cuisine": "Sonoran hot dogs",
    "note": "Late, north of downtown on Oracle Road: Sonoran hot dogs, carne asada tacos and burros from a James Beard Award-winning restaurant, per its site. 11 to 10, and to 11 on Friday and Saturday. The two other locations, on East 22nd Street and South 12th Avenue, close at 10. (520) 882-8977."
  },
  {
    "name": "5 Points Restaurant",
    "url": "https://www.5pointstucson.com/",
    "address": "756 S Stone Ave, Tucson, AZ 85701",
    "cuisine": "Brunch",
    "note": "After the ride, just south of downtown in Barrio Viejo: brunch 9 to 2 and dinner 5 to 9, Thursday to Monday, closed Tuesday and Wednesday. Book on Resy, patio tables too; dogs are welcome on the patio, and its site says it is easy to reach by bike. (520) 623-3888."
  }
]
```

## Why these

- **El Charro Café, downtown** — the night-before slot with a reservation, which matters for a group the night before El Tour. Own page: 311 N. Court Ave., (520) 622-1922, "Monday - Sunday 11:00am - 9:00pm," a reservations link. The page's metadata says it was last modified Nov 20, 2023; the reservations page and the live site are the second signal.
- **Cup Cafe at Hotel Congress** — the downtown after-ride table with a big patio, in the hotel already on the hotels list. Kept because the page is live and the patio and walk-in policy are on it; the hours need a call.
- **BOCA** — tacos on Fourth Avenue, open to 10 on Friday and Saturday: night before, or late on a weekend. Hours, address and phone are in the footer of bocatacos.com/chef-maria, the page that loaded; the entry keeps the site's home page as its URL.
- **Seis Kitchen, Mercado** — the one restaurant at a listed ride's start. Breakfast till noon on weekends, a courtyard, no reservations. The west-side base: Tucson Foodie's 2018 cyclist list called it "Perfect stop after you ride Gates Pass."
- **Tumerico** — the plant-based dinner, midtown. Closes at 8, so the note says early dinner.
- **Barrio Bread** — the "one you'd go back for." Bread, not a meal, so it does not fill another slot; the morning-only hours are the point of the note.
- **El Güero Canelo, Oracle** — the late slot: the only pick confirmed open past 10 (11 on Friday and Saturday at this location). Own site names the James Beard award and the menu. Of the three locations, Oracle is the one nearest downtown and the university and the only one open till 11.
- **5 Points** — after the ride near downtown and the convention center hotels: brunch from 9, patio, reservations, and its own site mentions arriving by bike. Closed Tuesday and Wednesday.

## Rejected

- **Seis Kitchen Oro Valley** (9740 N Oracle Rd #110, 11–9 daily) and **Seis Tanque Verde** (6530 E Tanque Verde Rd, 11–9 daily) — confirmed open on the locations page, but no ride starts or ends there. Oro Valley is a ready north-side swap if the editor wants one.
- **El Charro Ventana** — not near the riding; not fetched.
- **Iron Door, Grub Stake Café (Ski Valley)** — "open seasonally — typically weekends & holidays; call ahead," "staffing-dependent" (Mt. Lemmon Hotel guide, Sept 17, 2026). No firm hours.
- **Beyond Bread at Mount Lemmon Lodge** — Beyond Bread's own locations page lists no mountain store; see `coffee.md`.
- **Tiger's Tap Room and Century Room (Hotel Congress)** — bars; for @culture-scout.
- **Pueblo Vida Brewing, Button Brew House, Catalina Brewing, Tucson Hop Shop** — the Arizona Daily Star's bike guide (updated Sept 18, 2025) says they host bike rides; the Hop Shop has bike racks and loaner locks. Bars, for @culture-scout; their rides go to @community-scout.
- **Nico's, 1702 Pizza & Beer** — named only in Oru's 2017 cyclist guide. Not fetched.
- **Rocco's Little Chicago** — a search scoped to the domain I tried returned nothing. Not pursued.

## Couldn't confirm

- **Sawmill Run Restaurant, Summerhaven** — the sit-down meal at the top of Lemmon. Its summer-hours page returned 404. Tucson Foodie (updated May 22, 2026): 12976 N Sabino Canyon Park, (520) 576-9147, no hours. Mt. Lemmon Hotel guide (Sept 17, 2026): "Typically Fri–Sun 11 AM–6 PM (check site for seasonal hours)," dog-friendly patio. Editor: sawmillrun.com home page or its Google listing.
- **Saguaro Corners, 3750 S Old Spanish Trail** — "Along the eastern edge of the Tour de Tucson route," per Tucson Foodie's 2018 list. The El Tour and Saguaro East pick if it is still open. No current page fetched.
- **La Herradura Mexican Grill, 9165 E Tanque Verde Rd** — where Cactus Cycling Club's Friday Saguaro East ride meets (`rides.json`). Not fetched.
- **Pub 1922, 15920 S Rancho Sahuarita Blvd, Sahuarita** — one of the Cactus weekend B ride's October starts (`rides.json`). The only south-side lead. Not fetched.
- **Cup Cafe's hours** — not on its page; hotelcongress.com elsewhere, or a call.
- **El Charro's history line** — "same family since 1922" was in the old note; the History page would confirm it.

## Sources

Read and used:
https://www.elcharrocafe.com/locations/downtown/
https://hotelcongress.com/restaurants/cup-cafe/
https://bocatacos.com/chef-maria
https://www.seiskitchen.com/locations
https://www.tumerico.com/
https://barriobread.com/contact/
https://barriobread.com/about/
https://elguerocanelo.com/
https://www.5pointstucson.com/location
https://www.5pointstucson.com/faq
https://tucsonfoodie.com/2018/06/26/cyclist-friendly-cafes/
https://tucsonfoodie.com/guides/eat-drink-mount-lemmon
https://mtlemmonhotel.com/mt-lemmon-restaurants-dining-guide/
https://www.orucase.com/blogs/city-guides/tucson
https://tucson.com/thisistucson/guides/article_5f7422d6-8e55-11ee-bda4-0f6dd8d06780.html
https://www.beyondbread.com/contact/locations/
https://www.transitcycles.com/events-1
cfc-site/rides/rides.json (in the repo: the Women's Shootout, Cactus Friday and Cactus weekend B records, verified Sept 30, 2026)
https://hotelcongress.com/about/contact/ (carried from the Sept 15 file for Cup Cafe's address; not re-read)

Tried, did not load:
http://sawmillrun.com/summer-hours/ (404)
