# Brief — guerneville-ca

Written by @town-editor (opened from the main session), 2026-11-16. A new
guide. Robert rides Cycle to Zero in May 2027, and the ride camps two
nights in Guerneville.

## The town

- id `guerneville-ca` · Guerneville, California · Sonoma County ·
  America/Los_Angeles
- Centre for distances: **38.5064, -122.9908** — the coordinates on the
  Wikipedia page for Guerneville, California (38°30′23″N 122°59′27″W;
  the page's own decimal is 38.50639, -122.99083), fetched 2026-11-16
  (page last edited 2026-11-05). It's the place point, not a street
  corner. Scouts: if a county or geocoder page gives a downtown point
  (Main Street at Armstrong Woods Road, the plaza, the bridge), say so in
  your report; don't swap it yourself.
- Same page: an unincorporated community and census-designated place, so
  there is **no city hall and no city site**. Population 4,552 (2020
  census), elevation 59 ft (GNIS), on State Route 116 along the Russian
  River, between Monte Rio to the west and Forestville to the east.
  @logistics-scout: `official_url` is the county's page if one exists,
  else null; `visitor_url` from the county tourism office or the local
  chamber, whichever you fetch.
- `kind: destination`. No event page in `data/events/` for Cycle to Zero
  or for this town. No `data/towns/guerneville-ca.json` yet, so this is a
  first build, not a refresh.
- The guide gets `"ask": true` (Just ask, as on Ojai).
- Suggested `covers[]`: Rio Nido, Guernewood Park, Korbel, Vacation
  Beach. The Wikipedia page names all four as inside the Guerneville CDP
  and "often considered separate communities by local residents". Monte
  Rio and Forestville are the neighbours on either side; whether they go
  in `covers[]` is the editor's call at assembly, once the scouts say
  where the picks landed. **Not Santa Rosa, not Sebastopol, not
  Healdsburg** — different towns.
- `radius`: the editor picks it at assembly. See "Already known" for the
  distances that decide it.
- Airports: null for now. @logistics-scout fills `nearest_airport` and
  `major_airport` from pages it fetches.

## Who it's for

Two readers. First, the Cycle to Zero rider: camping in Guerneville
Friday and Saturday night, with Saturday (May 22, 2027) to ride a short
route, ride a long one, or stay off the bike and walk around town.
Second, the family and friends who drive up to meet them and need a
room, plus anyone who comes to the Russian River with a bike on any
other weekend.

What makes it a place to ride: left for the scouts to say from a source.
What the fetched pages give so far: the organizer routes Day 1 in
through Marin County and the redwoods and Day 3 out along the Sonoma
coast; the Wikipedia page names Armstrong Redwoods State Natural
Reserve, Austin Creek State Recreation Area, the river and Johnson's
Beach as the places of interest, and says the Pacific is close.

## Cycle to Zero 2027 — what the organizer's pages say

Read 2026-11-16 on sfaf.org/get-involved/cycle-to-zero/,
2027.cycletozero.org and 2027.cycletozero.org/faqs/. Only what those
three pages say today.

- **May 21–23, 2027** (Friday to Sunday). San Francisco AIDS Foundation's
  three-day ride. The FAQs: it "starts the morning of Friday, May 21,
  2027 and concludes the evening of Sunday, May 23, 2027".
- Day 1 (Fri): SF to Guerneville, about 85 miles, north through Marin
  County and the redwoods.
- Day 2 (Sat): from Guerneville, two routes: "Let's Chill", about 40
  miles, or the "Zero-Hero Century", about 100 miles. Or a day off the
  bike: sponsored Cycle to Zero activities, or a self-guided wander
  through Guerneville. 1-Day Cyclists join on this day and pick one of
  the two routes.
- Day 3 (Sun): Guerneville to SF, about 85 miles, by the Sonoma coast.
- **The 2027 camp is named.** The SFAF page and the FAQs both say:
  "We'll camp both nights at Camp Russian River and Johnson's Beach, a
  15-minute walk apart." Two campsites, one event. The 2027 home page
  itself only says "the Russian River"; the names are on the other two.
- **What is not published:** which riders sleep at which of the two
  sites, either site's street address (the organizer's pages give none),
  the Day 2 route files, where Days 2 and 3 roll out from, check-in and
  start times (the FAQs: "stay tuned in to staff communications for
  event check-in details and start times"), and the San Francisco start
  point. All null. **Never guess which camp a rider is in, never give a
  roll-out time, never measure from a guessed spot.** Measure from the
  town centre above. A scout who fetches Johnson's Beach's or Camp
  Russian River's own page may report its address and what it is on an
  ordinary weekend, as a place, with that page as the source.
- Camp, from the FAQs: shower trucks, water, portable toilets, hot food
  and drinks, charging stations, two-person tents supplied. 3-Day
  cyclists get all meals and camping; 1-Day cyclists get breakfast,
  lunch and dinner. So riders eat in camp, and the hotel reader is
  mostly family and friends. Saturday is the day a rider wants coffee, a
  shop and something to do in town.
- No e-bikes on the ride (FAQs). Road bikes suggested. Rain or shine.
  Cyclists and crew must be 18 by the start.
- Nothing on these pages about bike mechanics in camp, visitors in camp,
  parking in Guerneville, or bike shipping. Null; don't fill it in.
- Money, for the record and not for the town page: 3-Day $95 fee, $500
  raised by March 1, 2027 and $2,500 in total; 1-Day $225, no minimum;
  crew $95 and $250. **The $2,500 date is May 1, 2027 on the SFAF page
  and in one FAQ answer, and May 4, 2027 in another FAQ answer.** The
  organizer's pages disagree with each other; don't print a date for it
  until they agree. Limited space, with a waitlist.
- The pages describe 2027 only. The 2026 details in our calendar file
  (a Sausalito start and finish, Day 2 at 38, 65 and 104 miles) are not
  on any of the three pages today. Don't carry them into the guide.
- **Robert rides this one** (`data/calendar-2027.json`, id 126, slug
  `cycle-to-zero`, `riding: true`, `confirmed`). The closing block can
  say so. He also has the Recovery Ride on his list (id 339, slug
  `recovery-ride`, `riding: true`, date TBA; the calendar says it camps
  in Guerneville, from the Castro Country Club's page — not re-read
  today, so a scout who uses it fetches it first).
- Also on the calendar and through Guerneville, not one of his: the
  Jonathan Pon Memorial Ride (id 643, Positive Pedalers, date TBA,
  overnight in Guerneville).
- The calendar files all three under San Francisco or Sausalito, not
  Guerneville. Leave the calendar alone.
- The event's money goes to San Francisco AIDS Foundation. Nobody gives
  through this site.

## Zones (spread the picks across them)

1. **Downtown Guerneville and the river** — Main Street (State Route
   116), the bridge, Johnson's Beach. Coffee, food, most of the rooms.
2. **Armstrong Woods** — north of town: Armstrong Redwoods State Natural
   Reserve and Austin Creek State Recreation Area. Confirm on the State
   Parks page whether bikes are allowed, on which roads, and any closure,
   with the date.
3. **Downriver** — Guernewood Park, Vacation Beach, Monte Rio, and on
   toward the coast (the organizer's Day 3 leaves by the Sonoma coast).
4. **Upriver** — Rio Nido, Korbel, Forestville, along River Road and
   Highway 116.
5. **The coast** — where the river meets the Pacific, and Highway 1.
   Only with a public route page and an honest hazards line.
6. **Sebastopol and Santa Rosa** — the nearest bigger towns, where the
   group rides and the bigger shops are likely to be. A pick out here
   needs a reason a rider staying in Guerneville would make the trip.

Zones 1 to 4 use place names from the Wikipedia page; 3 and 5 follow the
organizer's "Sonoma coast". Zone 6 comes from the rides directory (Santa
Rosa). Road details are leads until a scout fetches a route or agency
page.

## Already known (don't re-research; link)

**No ride in `cfc-site/rides/rides.json` is in Guerneville.** No slug,
city or text mentions it, or the Russian River. **@community-scout's job
matters most here**: any ride that starts in Guerneville, Monte Rio,
Forestville, Sebastopol or Santa Rosa (a shop ride, a club ride,
anything weekly), proposed with sources, confidence high or medium only.

One active directory ride starts within 30 miles of the centre. The
build will show it on the town page on its own. Name it by slug only;
never type a day or time.

| miles | slug |
|---|---|
| 16 | `santa-rosa-ca-sports-basement-last-sunday-ride` (no-drop, beginner; host Sports Basement Santa Rosa, a shop; confidence medium; no street address on the record; checked Oct 1, 2026) |

It has no lgbtq focus stated. It is also the only directory ride in all
of Sonoma County: nothing is listed for Sebastopol, Healdsburg,
Petaluma, Windsor, Forestville or Monte Rio.

Just outside 30 miles, for context only (all Marin County, 42–48
miles): `san-rafael-ca-marin-cyclists-easy-like-sunday-morning`,
`fairfax-ca-marin-cyclists-fairfax-to-point-reyes-station`,
`corte-madera-ca-marin-cyclists-china-camp-loop`,
`mill-valley-ca-tam-velo-club-wednesday-training-ride`.

Rides hubs: none for Guerneville, Santa Rosa or anywhere in Sonoma
County. The nearest hub is `/rides/ca/san-francisco/` (35 rides, with a
guide), 59 miles from this centre.

Neighbouring guides in `data/towns/`: `san-francisco-ca`, 59 miles
(centre 37.7793, -122.4193; no `radius` set, so the default 25; its
`covers[]` reaches Sausalito, Mill Valley, Tiburon, Fairfax and Point
Reyes Station, none of them in Sonoma County; `verified` 2026-10-03).
Its `about` text already names Cycle to Zero and Guerneville. No overlap
to settle. Next nearest is `ojai-ca`, about 349 miles.

For the editor at Job 3, picking `radius`: with the default 25 miles the
Santa Rosa ride page (16 miles) would pick up the Guerneville strip, the
same problem Ojai had with Ventura (Ojai took 8). Santa Rosa has no
guide of its own, so a wider reach would not collide with another
guide; the question is only whether a Santa Rosa ride page should point
at a river town 16 miles off. Sebastopol has no directory ride, so its
distance is still to measure; @community-scout reports the miles from
this centre for every ride it proposes.

## What search shows (Search Console, 16 town guides, last 90 days, read Nov 15, 2026)

- Plain "bike shop + city" searches sit at positions 40–99 and get no
  clicks. A bare list of shops earns nothing.
- Specific questions with a bike in them rank.

So for every place, these are the facts that matter most. Get them from
the business's own page, in its own words. If the page doesn't say, it's
null:

1. What time it opens (each day; Saturday above all).
2. Whether your own bike can go in the room.
3. Loaner or complimentary bikes for guests.
4. Room for a group (a patio, a big table, somewhere to lean ten bikes).
5. Same-day repair.
6. Rental (what bikes, by the hour or the day, the price with the date).
7. Bike boxing and shipping.

## Leads only — NOT verified

None of these was fetched; they are names to check. Nothing below is
confirmed: not that it exists under that name, not that it's open, not
its address, hours or what it does. Fetch the business's or agency's own
page for each one, or it doesn't go in a report.

- Routes and paths: the West County and Joe Rodota trails (Sonoma County
  Regional Parks) · Armstrong Woods Road · River Road · the Bohemian
  Highway (Monte Rio to Occidental) · Highway 116 to the coast · Westside
  Road toward Healdsburg · King Ridge from Cazadero
- Shops: whether Guerneville has a bike shop at all is the first
  question for @shop-scout. If it doesn't, say so plainly and name the
  nearest ones (Sebastopol, Santa Rosa, Healdsburg) with the miles.
  Sports Basement Santa Rosa is on the directory record as saying it
  rents bikes; confirm on its own page.
- Stay, coffee, food, off the bike: no names given on purpose. Find them
  from the county tourism office's and the chamber's pages, then each
  business's own.

## Watch for

- **Which camp, the camp addresses, roll-out times and the Day 2 route
  files are null.** The two camp names are published; nothing past the
  names is.
- Saturday May 22, 2027 is the day that counts. A café that opens at 6
  or 7 on a Saturday beats a better one that opens at 9. Say which is
  which. Friday riders arrive after 85 miles, late in the day; Sunday
  they leave for another 85, so anything that opens late on Sunday is
  for the people who drove.
- Several hundred riders and crew in a town of 4,552, a week before
  Memorial Day weekend (May 31, 2027). Rooms will be tight; say so only
  where a hotel's own page states a minimum stay or an event policy.
  `bike_policy` only as the hotel states it; otherwise "No stated policy
  — ask".
- **The queer lens.** The organizer calls Guerneville "a storied LGBTQ+
  village along the Russian River", and the Wikipedia page calls it an
  LGBTQ+ vacation destination and names Russian River Pride, Women's
  Weekend, Lazy Bear Weekend and Polar Bear Weekend (the event names are
  leads; @culture-scout fetches each one's own page and 2027 date before
  using it). The rule doesn't move: a business is `queer-owned` only
  when it says so itself, on its site, its bio or in the owner's own
  quoted words. Not from the town, the name, the clientele or a flag. A
  resort that describes itself as gay or LGBTQ is reported in its own
  words. It informs the picks and never headlines the page.
- Many river resorts are adults-only or clothing-optional by their own
  description. Say what a place states about who it takes, plainly, so a
  family driving up doesn't book the wrong room.
- Bars are a real part of this town. A bar is a fine off-the-bike pick;
  write it as a place, no more.
- Floods and closures: the Wikipedia page says the river floods in
  winter (the worst in 1986). `best_months` from a source, with the
  reason. Check Caltrans (Highway 116, Highway 1) and State Parks
  (Armstrong Woods, Austin Creek) for closures and carry the date.
- Narrow roads, redwood shade, logging and tourist traffic, little
  shoulder on 116 and Highway 1: that's what people say, and it's a
  lead. The hazards line needs a source.
- Getting there without a car: nothing fetched yet. @logistics-scout
  checks Sonoma County Transit and SMART on the operators' own pages,
  with bike rules, and says honestly how far the nearest train stops.
- E-bikes: not allowed on Cycle to Zero. A rental shop that only rents
  e-bikes is still a pick for the people who drove up; say which it is.
- No mental-health language anywhere in the reports. Say what a place
  is.
- A small, event-host-sized town: half targets are fine. Three verified
  cafés beat six with two guesses. A section with nothing in Guerneville
  itself says so and gives the nearest, with miles.

## Sources

- https://en.wikipedia.org/wiki/Guerneville,_California (coordinates,
  county, CDP status, population, elevation, Route 116 and the
  neighbouring towns, the communities inside the CDP, places of
  interest, the LGBTQ+ destination line and event names, the flood note)
  — fetched 2026-11-16; last edited 2026-11-05
- https://www.sfaf.org/get-involved/cycle-to-zero/ (2027 dates, the
  three days, the two camp names, fees and minimums) — fetched
  2026-11-16
- https://2027.cycletozero.org/ (2027 dates, participant types) — fetched
  2026-11-16
- https://2027.cycletozero.org/faqs/ (the three days, the two camp
  names, camp amenities, meals, no e-bikes, age, start and end, the two
  different dates for the $2,500) — fetched 2026-11-16
- `cfc-site/rides/rides.json`, `cfc-site/rides/hubs.json`,
  `data/calendar-2027.json`, `data/events/`, `data/towns/*.json` — read
  2026-11-16
