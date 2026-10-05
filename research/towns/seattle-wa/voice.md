# Seattle — voice pass (Oct 4, 2026)

Applied in place to `data/towns/seattle-wa.json`. Prose only; every key, number, hour,
price, URL, `{ride:…}` token and `ride_slug` kept. 10 strings changed. The file read
well going in: the scouts' notes were already plain and dated. Most of what changed
was long sentences cut in two and three opinion phrases removed.

`node tools/verify-town.js --no-fetch data/towns/seattle-wa.json` passes (0 fails; the
warnings are the pre-existing missing lat/lon and bike_policy nulls, plus "eclectic" in a
Cascade ride URL, which is the ride's name, TREATS).

## Changes

### `summary` — too long
**Before:** …The Burke-Gilman runs from Shilshole Bay past the University of Washington to Bothell, almost all of it off the road; the Lake Washington loop is 50 miles around the lake; the Bainbridge ferry leaves Colman Dock downtown and the Chilly Hilly course starts at the other end. Cascade Bicycle Club, which runs the Seattle to Portland Bicycle Classic, leads free group rides most days of the week, and the STP leaves the University of Washington on July 10, 2027. Delta, Southwest and American check a packed bike as a standard bag, $45 each way (Oct 2026); Link light rail takes you and the bike from the airport to downtown in 38 minutes.
**After:** …The Burke-Gilman runs from Shilshole Bay past the University of Washington to Bothell, almost all of it off the road. The Lake Washington loop is 50 miles around the lake. The Bainbridge ferry leaves Colman Dock downtown, and the Chilly Hilly course starts at the other end. Cascade Bicycle Club leads free group rides most days of the week, and its Seattle to Portland Bicycle Classic leaves the University of Washington on July 10, 2027. Delta, Southwest and American check a packed bike as a standard bag, $45 each way (Oct 2026). Link light rail takes you and the bike from the airport to downtown in 38 minutes.
One 45-word sentence became three. Same facts.

### `riding[0]` (first sentence) — too long
**Before:** The ride for the evening you land is the Burke-Gilman: a rail-trail from Golden Gardens past the Ballard Locks, Gas Works Park and the University of Washington to Bothell, about 19 miles one way, turn around whenever you want.
**After:** The ride for the evening you land is the Burke-Gilman. It's a rail-trail from Golden Gardens past the Ballard Locks, Gas Works Park and the University of Washington to Bothell, about 19 miles one way. Turn around whenever you want.

### `routes[0].description` (Lake Washington loop) — hype
**Before:** The lap of the lake, and the signature ride: counter-clockwise from Bellevue… It's a loop, so from Seattle you can join it on the lakeshore, at Seward Park for one.
**After:** The lap of the lake: counter-clockwise from Bellevue… It's a loop, so from Seattle join it on the lakeshore, at Seward Park for one.
"Signature ride" is a brochure word. The route is the lap of the lake; that says it.

### `routes[6].description` (Bainbridge / Chilly Hilly) — too long, brochure
**Before:** Roll onto the Bainbridge ferry at Colman Dock on the downtown waterfront and ride the Chilly Hilly course: a 33-mile loop of the island along the shore with the Seattle skyline behind you, through forested back roads, and up and down the hills it's named for.
**After:** Roll onto the Bainbridge ferry at Colman Dock on the downtown waterfront and ride the Chilly Hilly course. It's a 33-mile loop of the island: the shore road with Seattle behind you, back roads through the trees, and the hills it's named for.
"Skyline" and "forested back roads" were event-page copy.

### `restaurants[0].note` (Un Bien) — hype
**Before:** The one you'd go back for, and the night-before sandwich on the Ballard side: a pink shack…
**After:** The night-before sandwich on the Ballard side: a pink shack…
Opinion with no fact behind it.

### `restaurants[6].note` (Portage Bay Cafe) — register
**Before:** After the ride, the U District: local, organic breakfast next door to the University Inn.
**After:** After the ride, the U District: breakfast next door to the University Inn, local and organic in its own words.
Menu adjectives now attributed to the restaurant, not us.

### `hotels[0].note` (HI Seattle) — spelling
**Before:** …about a mile south of downtown's centre;…
**After:** …about a mile south of the center of downtown;…
US spelling on a US site.

### `bike_shops[0].note` (Métier) — hype, contradiction
**Before:** Capitol Hill. The rental fleet a visitor would choose over their own: a Cervélo Caledonia…
**After:** Capitol Hill. The high-end rental fleet: a Cervélo Caledonia…
The guide's own line is "bring yours for three days or more"; the note shouldn't argue with it. Prices, bikes, policies untouched.

### `clubs[1].note` (Outspoken Cycle Club) — too long
**Before:** Seattle's queer and allied cycle club, in its own words, with social rides from beginner-friendly outings to day-long rides around the region, and trips to rides elsewhere. Every ride…
**After:** Seattle's queer and allied cycle club, in its own words. Social rides run from beginner-friendly outings to day-long rides around the region, plus trips to rides elsewhere. Every ride…
`inclusive_focus` untouched.

### `bring_your_bike.summary` — too long
**Before:** Bring it. Delta, Southwest and American check a packed bike as an ordinary bag, $45 each way as your first bag (Oct 2026), and once you land Link light rail runs from the airport to downtown in 38 minutes. If the trip is a day or two, Métier on Capitol Hill rents a Cervélo or a Tarmac for $125 to $175 a day and evo in Fremont a carbon road bike for $100 (Oct 2026); for a week, or the STP, ride your own.
**After:** Bring it. Delta, Southwest and American check a packed bike as an ordinary bag, $45 each way as your first bag (Oct 2026). Once you land, Link light rail runs from the airport to downtown in 38 minutes. If the trip is a day or two, Métier on Capitol Hill rents a Cervélo or a Tarmac for $125 to $175 a day and evo in Fremont a carbon road bike for $100 (Oct 2026). For a week, or the STP, ride your own.

## Left alone on purpose
- The shop, hotel and airline notes are long because they are lists of prices and
  hours with dates. Cutting them would cut facts. They read as data, not brochure.
- `rules_and_safety` "The honest read:" and the Seattle Bike Blog numbers — plain, sourced.
- "Seattle's only lesbian bar and the oldest in the country" (The Wildrose) — the bar's own
  claim, written as "Calls itself".
- Charlie's Queer Books: the queer-owned sentence is a quote from the store's own storefront. Right as is.
- No mental-health language anywhere in the file.

## Flags for @town-verifier
1. `bike_shops[0].note` (Métier): "The club's B2B ride leaves Saturday mornings" — "the club" has
   no antecedent in a shop note. Is this Métier's own club ride (then "the shop's") or a
   separate club's? Left as written.
2. `restaurants[5].note` (Big Time Brewery): "Seattle's original" brewpub — an unsourced
   superlative with no "per its site". Confirm it's the brewery's own line or cut the words.
3. `routes[1].description` (Burke-Gilman): "About 19 miles, per Cascade; King County says more than
   20" — the disagreement is disclosed, fine, but `miles: 19` is the number the page will show.
   Verifier's call.
4. `culture[6].note` / `riding[0]`: Matthews Beach "Seattle Parks' largest freshwater swimming
   beach" — superlative; the Parks page should say so.
