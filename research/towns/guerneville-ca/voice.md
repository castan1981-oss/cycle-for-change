# guerneville-ca — voice pass

@voice-editor · 2026-11-16 · applied to `data/towns/guerneville-ca.json` (after-strings only)

26 strings changed. No fact, number, hour, price, name, address, URL, quote or `{ride:...}` token was changed. The three hotel notes keep "house bikes for guests". `node tools/verify-town.js data/towns/guerneville-ca.json --no-fetch` was NOT run (no shell in this session): the editor has to run it.

## Changes

Where a string is long, only the changed part is shown.

| Path | Before | After | Reason |
|---|---|---|---|
| `summary` | Nine sentences: town, loop, King Ridge, no shop, Forestville, Cycle to Zero, "Plan on a car.", STS | "Guerneville is a small Sonoma County town on the Russian River, with redwoods north and the coast west. One loop starts in town: 26 miles over Sweetwater Springs Road, with a 2.3-mile climb at 8.8 percent. We found no bike shop in town; the nearest is in Forestville, about 6 miles east in a straight line. Cycle to Zero, San Francisco AIDS Foundation's three-day ride, camps here on May 21–23, 2027." | too long |
| `best_months` | "…closes October 1, and the farmers market is listed…" | "…closes October 1. The farmers market is listed…" | too long |
| `about[0]` | "…at 59 feet: 4,552 people at the 2020 census." | "…at 59 feet. It had 4,552 people at the 2020 census." | too long |
| `about[0]` | "That's Rio Nido and Korbel upriver, Guernewood Park and Vacation Beach just downriver, Monte Rio and Duncans Mills toward the coast, and Forestville to the east." | "Upriver, that's Rio Nido and Korbel. Just downriver, Guernewood Park and Vacation Beach. Toward the coast, Monte Rio and Duncans Mills. Forestville is to the east." | too long |
| `about[2]` | "And several places to stay are adults only by their own rules, so read the hotel notes before you book for a family." | "Several places to stay are adults only by their own rules. Read the hotel notes before you book for a family." | too long |
| `riding[0]` | "…then turns onto Sweetwater Springs Road for the climb: 2.3 miles at 8.8 percent, with…" | "…then turns onto Sweetwater Springs Road. The climb is 2.3 miles at 8.8 percent, with…" | too long |
| `riding[1]` | Three sentences of 27, 20 and 21 words (King Ridge route, the club's two water stops, the Sonoma Coast loop) | Seven short ones, same facts, same order | too long |
| `getting_there` | "…in a straight line; the drive is longer. Alaska, American, Southwest and Delta fly there, and nine rental car brands…" | "…in a straight line. The drive is longer. Alaska, American, Southwest and Delta fly there. Nine rental car brands…" | too long |
| `getting_there` | "Without a car: Sonoma County Transit's Route 20 runs between … and Guerneville, with a bike rack on every bus." | "Without a car, there's Sonoma County Transit's Route 20. It runs between … and Guerneville. Every bus has a bike rack." | too long |
| `routes[0].description` | "…to the redwood reserve, then right onto Sweetwater Springs Road: narrow…" | "…to the redwood reserve. Then right onto Sweetwater Springs Road: narrow…" | too long |
| `routes[0].description` | "…are both on Armstrong Woods Road, the road the loop goes out on." | "…are both on Armstrong Woods Road. That's the road the loop goes out on." | too long |
| `routes[1].description` | "…5.5 miles each way, so 11 out and back." | "…5.5 miles each way. That's 11 out and back." | too long |
| `routes[2].description` | "…to Monte Rio, Moscow Road along the river to Duncans Mills, Highway 116 to Jenner, then about 10 miles south on Highway 1." | "…to Monte Rio. Moscow Road along the river to Duncans Mills, then Highway 116 to Jenner. About 10 miles south on Highway 1." | too long |
| `routes[2].description` | "…the Duncans Mills bridge (about mile 10) and a coffee shop across…" | "…the Duncans Mills bridge (about mile 10). It names a coffee shop across…" | too long |
| `routes[3].description` | "…its open ridgetop, down Hauser Bridge Road, back over Seaview and Meyers Grade to Highway 1, then Jenner, Duncans Mills and Moscow Road home." | "…its open ridgetop, then down Hauser Bridge Road. Back over Seaview and Meyers Grade to Highway 1. Then Jenner, Duncans Mills and Moscow Road home." | too long |
| `routes[4].description` | "…a RideWithGPS ambassador route: Santa Rosa out to the deli…" | "…a RideWithGPS ambassador route. It goes from Santa Rosa out to the deli…" | too long |
| `coffee[0].note` | "Sources differ on closing time, and the café's site dates from 2024, so call about the afternoon: (707) 869-9706." | "Listings differ on closing time, and the café's site dates from 2024. Call about the afternoon: (707) 869-9706." | research note |
| `coffee[1].note` | "Outdoor seating per Sonoma County Tourism's listing. Nothing stated about bike parking." | "Sonoma County Tourism's listing says outdoor seating. Nothing says bike parking." | research note |
| `restaurants[1].note` | "The night before, or any time a burrito is the answer: tacos, burritos and a breakfast burrito from a truck in town." | "Tacos, burritos and a breakfast burrito from a truck in town. Good for the night before." | brochure line |
| `restaurants[2].note` | "Late, and after the ride: a brewpub on River Road, the road the Sweetwater Springs loop comes back to town on." | "A brewpub on River Road, the road the Sweetwater Springs loop comes back to town on. It's the late one." | too long |
| `restaurants[2].note` | "That's the latest kitchen we could confirm in town." | "That's the latest kitchen we found in town." | research note |
| `restaurants[4].note` | "The one to go back for: a small bistro on Main Street…" | "A small bistro on Main Street…" | unsourced opinion |
| `restaurants[4].note` | "A splurge: mains $26 to $45 (Nov 2026)." | "Mains $26–$45 (Nov 2026)." | adjective, en dash |
| `restaurants[5].note` | "In Duncans Mills, where the King Ridge and Sonoma Coast routes both pass: a tavern with a seafood kitchen and a patio that has music on Sundays." | "A tavern with a seafood kitchen in Duncans Mills, where the King Ridge and Sonoma Coast routes both pass. The patio has music on Sundays." | too long |
| `hotels[0].note` | "…the road north to the redwood reserve and the way out on the Sweetwater Springs loop." | "…the road north to the redwood reserve. The Sweetwater Springs loop goes out this way." | too long |
| `hotels[2].note` | "The splurge: 21 rooms in three houses on Highway 116, with a hot plated breakfast for two included, a pool, free parking and a desk staffed around the clock." | "Twenty-one rooms in three houses on Highway 116. A hot plated breakfast for two is included. Pool, free parking and a desk staffed around the clock." | too long, unsourced adjective |
| `hotels[5].note` | "Queen Studio $79 to $219 a night" | "Queen Studio $79–$219 a night" | en dash |
| `bike_shops[3].note` | "…says many small jobs are done on the spot, builds a bike from its box for $155 and boxes one…" | "…says many small jobs are done on the spot. It builds a bike from its box for $155 and boxes one…" | grammar |
| `bring_your_bike.summary` | "…in a straight line, and the widest rental fleet is in Santa Rosa…" | "…in a straight line. The widest rental fleet is in Santa Rosa…" | too long |
| `bring_your_bike.fly.airports[0].note` | "Alaska (Boise, … Seattle), American (Phoenix, Dallas-Fort Worth), Southwest (Denver, Burbank, San Diego, Las Vegas) and Delta (Salt Lake City), per the airport's passenger FAQ (modified Oct 9, 2026)." | "Four airlines fly here, by the airport's passenger FAQ (modified Oct 9, 2026). Alaska: Boise, … Seattle. American: Phoenix, Dallas-Fort Worth. Southwest: Denver, Burbank, San Diego, Las Vegas. Delta: Salt Lake City." | "per the FAQ" |
| `bring_your_bike.get_around.note` | "Guerneville has no train and no airport shuttle that we could find." | "We found no train and no airport shuttle to Guerneville." | research note |
| `bring_your_bike.get_around.note` | "…it can be done: Sonoma County Transit's Route 20 runs … and Guerneville, with racks on every bus, and it stops on 3rd Street…" | "…it can be done. Sonoma County Transit's Route 20 runs … and Guerneville. Every bus has racks, and it stops on 3rd Street…" | too long |
| `bring_your_bike.get_around.bike_share.note` | "No bike share was found in Guerneville (Nov 2026)." | "We found no bike share in Guerneville (Nov 2026)." | passive voice |

## Left alone, on purpose

- **Hazards.** All five already name the grade, the shoulder width and the surface. None was softened; none could be made sharper without a new fact.
- **Quoted policies** (hotel quotes, "complimentary", "$175.00 to $510.00"): untouched.
- **`airline_note`, `transit_bike_rules`, `rules_and_safety`, `ship.note`, `rent.note`:** dense, but every clause is a dated fee or a rule. Splitting them risked moving a number away from its airline or its date.
- **Hours and day ranges written "11 to 6", "Wednesday to Friday", and `hours_hint`:** left as words, in case the card build reads them. Only the two money ranges outside quotes got an en dash.
- **Note length.** The brief says notes under three sentences; most place notes here run five to seven, all of it sourced fact (hours, policies, prices). Cutting to two would delete verified facts, so the notes were tightened, not cut. The editor's call whether to move the tail into `line` + "More".
- No banned words, no listicle words, no mental-health language, no cause hype found.

## For the editor

- **`summary` went from nine sentences to four.** Out: King Ridge from Monte Rio, "Plan on a car.", STS 10 miles east. All three are still in `riding`, `getting_there`, `bring_your_bike` and the FAQ. If the search pass needs any of them in the summary, put that sentence back.
- "The splurge" (The Stavrand) and "The one to go back for" / "A splurge" (boon eat + drink) were removed as judgments with no source behind them. See the first verifier flag.

## For the verifier

1. `hotels[2]` The Stavrand: the note called it "The splurge" but `price_hint` is null and no rate is on record. Removed the word; confirm a rate if the label should come back.
2. `summary` and `faq[5]`: "camps here on May 21–23, 2027" / "riders camp both nights". Three dates, two nights. Confirm which nights riders are in Guerneville.
3. `culture[0]` Johnson's Beach opens Memorial Day (May 31, 2027) by its own page, but `about[1]` and `faq[5]` have riders camping there May 21–23. Confirm the camp is open before the public season.
4. `routes[1].description`: "Forestville is the next town upriver." `about[0]` puts Rio Nido and Korbel upriver, between the two. Same question for "Monte Rio, the next town downriver" (`faq[4]`), with Guernewood Park and Vacation Beach between.
5. `routes[2].hazards` and `routes[3].hazards`: "River Road (Highway 116)" between Duncans Mills and Jenner. Elsewhere River Road is the road east of town past Korbel. Confirm the name on that stretch.
6. `coffee[0]`: closing time conflicts (own site 4 p.m. Mon–Thu and 6 p.m. Fri–Sun; one listing 5 p.m. daily), and the site dates from 2024. Needs a phone check.
7. `restaurants[1]` Guerneville Taco Truck: listings give other addresses. Confirm 16405 CA-116.
8. `bike_shops[0].note`: "small jobs often while you wait, simpler ones usually by the end of the day" reads out of order. Check against the shop's services page.
9. SFO and OAK are both given as 69 miles southeast in a straight line. Plausible, but identical; re-measure.
10. `hotels[3]` The Woods is `$$` at $175–$510; `hotels[5]` Cottages is `$` at $79–$219. Check both against the price_hint scale.
11. Phone formats differ: "(707) 869-2721" vs "707-869-0780", "707-869-9093", "707-869-0600". Not changed; check the `tel:` links build from all of them.
