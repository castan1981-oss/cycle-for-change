# guerneville-ca — search pass (@seo-geo-editor, Nov 16, 2026)

Applied to `data/towns/guerneville-ca.json`: `faq[]` (6; three answers and one question reworded,
nothing else in the file changed). `tagline` kept.
`verify-town --no-fetch`: ok, 0 fails, 5 warnings (routes 0–4 have no start lat/lon).
`build-events.js`: passes, 130 pages (14 events, 18 towns, 10 states). Nothing in `cfc-site/` or
the generator touched by hand.

## Queries

| page | target query | title / h1 / h2 | |
|---|---|---|---|
| /towns/california/guerneville/ | cycling in Guerneville | "Cycling in Guerneville, CA: the guide" / "Cycling in Guerneville" / "Questions about cycling in Guerneville" | pass; fix 1 |
| routes/ | bike routes in Guerneville | all three carry it | fix 2 |
| coffee/ | coffee in Guerneville open at 6 a.m. (for cyclists) | "Coffee in Guerneville, CA for cyclists" in all three | description is fix 3 |
| bike-shops/ | bike rental and bike shops near Guerneville | title "Bike rental and bike shops near Guerneville, CA"; h1 and h2 "Bike shops near Guerneville: repairs, parts, rentals" | title reads true; lede is fix 4 |
| hotels/ | Guerneville hotels that lend bikes to guests | "Hotels in Guerneville, CA for cyclists" in all three | description is fix 5 |
| restaurants/ | restaurants in Guerneville for cyclists | all three | pass |
| culture/ | Guerneville off the bike | h1 "Guerneville off the bike: bookshops, bars, galleries" (matches the six listed) | pass |
| bring-your-bike/ | should I bring my bike to Guerneville | title and h1 agree; no h2 with the query | fixes 6, 7 |

Titles are 28–47 characters before the suffix; three drop the suffix because the whole title would
pass 60 (bike-shops, restaurants, bring-your-bike), which is `head()`'s rule. Descriptions are
70–154 characters. Canonicals match on all eight. `og:` tags on all eight; the share image is
`/og-cfc-2.png`, the current card (CLAUDE.md §3, Nov 11). JSON-LD parses on all eight: City (geo,
containedInPlace), BreadcrumbList, WebPage (speakable `.lede`, dateModified 2026-11-16), FAQPage
on the guide; ItemList + BreadcrumbList on the lists (Trip, CafeOrCoffeeShop, BikeStore,
LodgingBusiness, Restaurant; culture uses LocalBusiness and its subtypes BookStore, BarOrPub,
ArtGallery). No Review or AggregateRating. All eight URLs are in `sitemap-events.xml`, which
`/sitemap.xml` references. Every outbound link has `rel="noopener"`; no affiliate links in this
guide (`travel_links` is empty), so no `rel="sponsored"` is owed. One image (bring-your-bike), with
alt and `loading="lazy"`. The closing block rendered on all eight; no link to `/pledge/`. Every
page links `/towns/`, `/events/2027/` and its sibling pages. No rides hub exists near Guerneville;
the guide links `/rides/ca/` and the one ride within reach (Sports Basement's Last Sunday Ride).
No mental-health language. "Bike-friendly" appears nowhere.

The lede (`summary`) reads as an answer and lifts whole. Five sentences, one over the 2–4 target;
the last two are the Cycle to Zero dates and could be one. Not my field; no change.

## Fixes (generator and data, for the editor; none applied)

1. **The guide doesn't link Cycle to Zero.** "Bike events in Guerneville" says "No events with
   their own page here yet," while `/events/cycle-to-zero/` exists and its `line` names
   `guerneville-ca` as the camp stop. `build-events.js` line 290 pushes an event only onto its
   `e.town` (san-francisco-ca). In the `(e.line || []).forEach` right under it, also push the
   event onto each stop's town: `const st = townById[s.town]; if (st && st !== t && !st.events.includes(e)) st.events.push(e);`
   The summary, about and FAQ all name the ride, so this is the page's biggest missing link.
2. **routes/.** Lede is `RESOURCES.routes.intro` (line 1005): "The rides locals in Guerneville
   actually do, each with a route you can load." Nothing in the data says locals ride them, and
   one of five starts in town. Replace with a line counted from the data, e.g.
   `Bike routes in and around ${t.name}, with where each one starts.` The description (line 1073)
   opens on a numeral and says "5 bike routes in Guerneville"; four start in Forestville,
   Occidental, Monte Rio and Santa Rosa. Suggested: "Bike routes in Guerneville and nearby:
   Sweetwater Springs Road loop, West County Regional Trail, Sonoma Coast, King Ridge… Miles and
   where each starts."
3. **coffee/ description** (`coffeeDesc`, line 986) reads "Coffee in Guerneville for cyclists:
   Coffee Bazaar and The Farmhand. 2 listed, with hours." It names the shops and leaves out the
   fact that ranks. When a `hours_hint` opens with an hour, say it: "Coffee in Guerneville for
   cyclists: Coffee Bazaar opens at 6 a.m. daily. Two listed, with hours." The lede ("Where riders
   in Guerneville start the day and finish the ride") stands on nothing here: no entry is
   `ride_out`.
4. **bike-shops/ lede** still says "Repairs, rentals and fits in Guerneville." (`RESOURCES["bike-shops"].intro`,
   line 1002). No shop is in town. Use `shopPrep(t)` there as the title and h1 do:
   `Repairs, rentals and fits ${shopPrep(t)} ${t.name}. Call ahead on event weekends.` The title,
   h1, h2 and description all read true ("near Guerneville: 4 do repairs, 3 rent bikes").
5. **hotels/ description**: "Three say they lend bikes to guests, in their own words." is true
   (boon, Dawn Ranch, The Stavrand). "6 listed, each with its bike policy." is not: all six are
   "No stated policy". In `hotelDesc` (line 980), when no hotel has a written policy, end on
   `${num(items.length)} listed; none states a policy on your own bike, so ask.`
6. **bring-your-bike/** `speakable` points at `.lede`, and the page has no `.lede`: `leadFold()`
   (line 926) writes the summary's first sentence as `p.place-line`. Either add `lede` to that
   class on this page or point this page's `cssSelector` at `.place-line`.
7. **bring-your-bike/ h2** "Renting a bike in Guerneville" (line 1214): the section's first line
   says there is nothing to rent in Guerneville. Use `shopPrep(t)` here too ("Renting a bike near
   Guerneville").
8. Event data, not mine: the Cycle to Zero `line` note for the Guerneville stop still says
   "coffee, the river and a shop". The verifier cut "the river" from the town guide today
   (Johnson's Beach's public season starts after that weekend).

## FAQ + tagline (applied)

The six were already the right questions. Changes: the shop and rental answers were four
sentences and are three; the rental answer now leads with the plain answer (nothing in town); the
routes question is in the words of the routes page's query and its answer adds the Sonoma Coast
loop. Every answer is from the JSON as the verifier left it. Hotel wording is each property's own.

```json
{
  "tagline": "Redwoods, the Russian River and one steep climb",
  "faq": [
    {
      "q": "Which Guerneville hotels lend bikes to guests?",
      "a": "Three say so on their own pages. boon hotel + spa says \"We have cruiser bikes available complimentary to our guests,\" Dawn Ranch offers its \"complimentary fleet of Retrospec bikes,\" and The Stavrand says \"Take out one of our cheerful yellow bicycles for a spin (first-come, first-served).\" None of them states a policy on bringing your own bike into the room, so ask when you book."
    },
    {
      "q": "What coffee shop in Guerneville opens at 6 a.m.?",
      "a": "Coffee Bazaar, downtown at 14045 Armstrong Woods Rd, opens at 6 a.m. every day, Saturday and Sunday included. The Farmhand on River Road opens at 9 and is closed Tuesday and Wednesday, so it's for after the ride."
    },
    {
      "q": "Is there a bike shop in Guerneville, and where is the nearest one?",
      "a": "We found no bike shop in Guerneville. The nearest is Russian River Cycle Service at 6559 Front St. in Forestville, about 6 miles east in a straight line, open Wednesday to Friday 11 to 6 and Saturday 9 to 5 and closed Sunday to Tuesday. Revel Cycles in Sebastopol, about 12 miles southeast in a straight line, is open every day 11 to 6."
    },
    {
      "q": "Where can I rent a bike near the Russian River?",
      "a": "We found nothing to rent in Guerneville itself. Russian River Cycle Service in Forestville, about 6 miles east in a straight line, rents road bikes for $75 a day and hybrids for $45, by appointment seven days a week (Nov 2026). Sports Basement in Santa Rosa has the widest range, with carbon road bikes at $100 a day (chain rates, Nov 2026), and Revel Cycles in Sebastopol rents e-bikes and cruisers only."
    },
    {
      "q": "What bike routes start in or near Guerneville?",
      "a": "One loop starts in town: the Sweetwater Springs Road loop, 26 miles and about 2,300 feet, with a climb of 2.3 miles at 8.8%. King Ridge, 55 miles, starts in Monte Rio, and the Sonoma Coast loop, 34 miles, starts in Occidental and passes through Monte Rio. The car-free path is the West County Regional Trail, 5.5 miles each way from Forestville to Sebastopol; it does not reach Guerneville."
    },
    {
      "q": "Where do Cycle to Zero riders sleep in Guerneville?",
      "a": "They camp. Cycle to Zero is May 21–23, 2027, and riders camp two nights, Friday and Saturday, May 21 and 22, at Camp Russian River and Johnson's Beach, about a 15-minute walk apart. The hotels in this guide are for whoever drives up to meet a rider."
    }
  ]
}
```

Tagline is 47 characters. "Steep" is the one adjective and the route data backs it (2.3 miles at
8.8%, pitches of 16%). Kept.

## Overlap

None. Checked against the five other California guides (San Francisco, Los Angeles, Ojai, Palm
Springs, Del Mar): no shared listing, no shared summary sentence, no shared tagline. San Francisco
is the other end of Cycle to Zero; the two guides share the ride's dates and nothing else.

## Search check

"cycling in Guerneville" (WebSearch, Nov 16, 2026): Komoot and Bikemap route collections, a
MapMyRide route, a tour operator's Napa and Sonoma trip, the county tourism office's "48 Hours in
Guerneville," the county parks page for the proposed Lower Russian River Trail. Route lists and a
travel feature. None says there is no bike shop in town and where the nearest one is, which
hotels lend bikes, or what opens at 6. That's the gap this page fills.

Search Lab: Guerneville guide FAQ questions (hotels that lend bikes, 6 a.m. coffee, nearest bike shop, rent a bike near the Russian River) should show impressions · Search Console queries containing "guerneville" or "russian river" · read Dec 14, 2026
