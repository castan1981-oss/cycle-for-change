# Palm Springs — voice pass (Oct 4, 2026)

Applied in place to `data/towns/palm-springs-ca.json`. Prose only; every key, number,
hour, price, URL, `{ride:…}` token and `ride_slug` kept. 5 strings changed. The file was
already in the voice: zone labels up front, dated prices, hazards sharp. What changed
was long sentences cut in two, one repeated line, and one brochure phrase.

`node tools/verify-town.js --no-fetch data/towns/palm-springs-ca.json` passes (0 fails;
the warnings are the pre-existing missing lat/lon and bike_policy nulls, plus "Iconic" in
`culture[6].note`, which is a shop's name, Iconic Atomic — allowed, left in).

## Changes

### `summary` — too long
**Before:** Palm Springs is a winter riding town at the west end of the Coachella Valley: flat miles on CV Link, the car-free path that runs 20 miles from the Palm Springs Visitor Center to Cathedral City, and two climbs, Tramway Road in town and Highway 74 out of Palm Desert. … Delta and American check a packed bike as a standard bag, $45 each way (Oct 2026), one Palm Desert shop builds a shipped bike, and three valley shops rent carbon road bikes.
**After:** Palm Springs is a winter riding town at the west end of the Coachella Valley. The flat miles are on CV Link, the car-free path that runs 20 miles from the Palm Springs Visitor Center to Cathedral City. The two climbs are Tramway Road in town and Highway 74 out of Palm Desert. … Delta and American check a packed bike as a standard bag, $45 each way (Oct 2026). One Palm Desert shop builds a shipped bike, and three valley shops rent carbon road bikes.
A 45-word opener became three sentences.

### `routes[6].description` (Box Canyon) — repetition, label word
**Before:** Zone 4, a car day at the east end of the valley. Tri-A-Bike's scenic ride: from 66 Ave and Johnson Rd through Box Canyon to Pinto Road at Interstate 10. … The shop puts the climbing at 1,590 feet. A car day from Palm Springs, at the far end of the valley.
**After:** Zone 4, a car day at the east end of the valley. Tri-A-Bike's ride from 66 Ave and Johnson Rd through Box Canyon to Pinto Road at Interstate 10. … The shop puts the climbing at 1,590 feet.
The last sentence said the first one again. "Scenic" is a brochure word; the miles and feet say what it is.

### `restaurants[1].note` (King's Highway) — too long
**Before:** The early breakfast, Zone 1: the diner at the Ace Hotel on the south end of town, from 7 a.m. daily, dinner 4 to 9 Monday to Thursday and 4 to 10 Friday to Sunday (its own page), with indoor and patio tables.
**After:** The early breakfast, Zone 1: the diner at the Ace Hotel on the south end of town, from 7 a.m. daily. Dinner 4 to 9 Monday to Thursday and 4 to 10 Friday to Sunday (its own page). Indoor and patio tables.

### `culture[6].note` (The Shops at Thirteen Forty-Five) — brochure
**Before:** Zone 1, Uptown: the anchor of the Uptown Design District, the mid-century furniture and vintage stretch of N Palm Canyon that runs north from Alejo Road. A design collective under one roof: vintage and modern furniture, art, jewelry, resort wear, a bookstore and a café, by its own page, so one stop stands in for the district.
**After:** Zone 1, Uptown. The mid-century furniture and vintage stretch of N Palm Canyon runs north from Alejo Road, and this is the one-stop version of it: vintage and modern furniture, art, jewelry, resort wear, a bookstore and a café under one roof, by its own page.
"Anchor of the … District" and "design collective" are the store's marketing. Hours, phone and the other shops' addresses untouched.

### `bring_your_bike.summary` — too long
**Before:** Bring it. Delta and American both check a packed bike as a standard bag, $45 each way (Oct 2026), so a round trip costs less than one day of a carbon rental; Alaska and Southwest did the same when their pages were last read (Sept 2026). If you would rather not fly with the case, Tri-A-Bike in Palm Desert receives a BikeFlights delivery and builds it for $150, then delivers to a Palm Springs hotel for $50 (Oct 2026). Rent only for a one-ride trip: three valley shops rent carbon road bikes at $100 to $140 a day and deliver to Palm Springs, with a two-day minimum on Tour de Palm Springs weekend at two of them. You do not need a car for the Tour or the valley floor; Highway 74, Joshua Tree and Box Canyon are car days.
**After:** Bring it. Delta and American both check a packed bike as a standard bag, $45 each way (Oct 2026), so a round trip costs less than one day of a carbon rental. Alaska and Southwest did the same when their pages were last read (Sept 2026). If you would rather not fly with the case, Tri-A-Bike in Palm Desert receives a BikeFlights delivery, builds it for $150 and delivers to a Palm Springs hotel for $50 (Oct 2026). Rent only for a one-ride trip. Three valley shops rent carbon road bikes at $100 to $140 a day and deliver to Palm Springs; two of them set a two-day minimum on Tour de Palm Springs weekend. You do not need a car for the Tour or the valley floor. Highway 74, Joshua Tree and Box Canyon are car days.

## Left alone on purpose
- The heat lines on every route repeat the same two sources. That is deliberate: a rider
  lands on one route page, not all of them. Hazards stay as written — none softened.
- Hotel Zoso: "party the weekend away" is the hotel's own quote and the note tells a rider
  who wants quiet to pick something else. That is the voice.
- Hunters: the queer-owned sentence quotes the About page. Streetbar: "first gay bar in
  Palm Springs, per Palm Springs Life." Both plain, both attributed.
- Shop notes are long lists of dated prices. Cutting them cuts facts.
- No mental-health language in the file.

## Flags for @town-verifier
1. **`bike_shops[4].note` (Trek Bicycle Palm Desert): "The one shop in the valley open on a Monday"
   contradicts the file.** Trek Bicycle Palm Springs is "Monday to Saturday 9 to 5" and Village
   Peddler is "Open 9 to 4, closed Sunday and Wednesday" (so open Monday). Also ACME is mobile,
   seven-day. Fix the sentence or the hours; I left the words as written.
2. `routes[2].description` vs `coffee[0].note` / `riding[1]`: the Vista Point regroup is "mile 8.4"
   (PJAMM) in the description and "mile 8.5" in the Sunday Climbers lines. Pick one.
3. `culture[0].note` (Aerial Tramway): "8,500 feet and snow in February" — no source for snow.
   The visitor-bureau guide may say it; confirm or cut "and snow in February".
4. `about[1]` / `getting_there`: the Tour's routes "use CV Link where they can and the maps were
   still to come when we read the page" — fine today; this needs a re-read once the 2027 maps post.
5. `getting_there`: "the airport's own site did not load" appears in prose. Honest, but it's a
   research note reaching a page. Verifier may want to re-fetch and drop the aside.
