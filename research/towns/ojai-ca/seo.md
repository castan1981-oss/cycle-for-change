# ojai-ca — search pass (@seo-geo-editor, Nov 15, 2026)

Applied to `data/towns/ojai-ca.json`: `faq[]` (6, rewritten), `tagline` (kept), `radius: 8`.
`verify-town --no-fetch`: ok, 0 fails, 3 warnings (routes 0, 2, 4 have no start lat/lon).
`build-events.js`: passes, 121 pages. Nothing in `cfc-site/` or the generator touched by hand.

## Queries

| page | target query | title / h1 / h2 | |
|---|---|---|---|
| /towns/california/ojai/ | cycling in Ojai | "Cycling in Ojai, CA: the guide" / "Cycling in Ojai" / none | fix 1 |
| routes/ | bike routes in Ojai | title, h1, h2 all carry it | pass |
| coffee/ | coffee in Ojai open at 6 a.m. (for cyclists) | "Coffee in Ojai, CA for cyclists" in all three | pass; description is fix 2 |
| bike-shops/ | bike rental in Ojai (not "bike shops Ojai": that shape sits at 40–99) | "Bike shops in Ojai, CA: repair, rentals" | fix 3 |
| hotels/ | Ojai hotels with complimentary bikes for guests | "Hotels in Ojai, CA for cyclists" | fix 4 |
| restaurants/ | restaurants in Ojai for cyclists | all three | pass |
| culture/ | Ojai off the bike | h1 says "record stores, bookshops, bars" | fix 5 |
| bring-your-bike/ | should I bring my bike to Ojai | title "Bringing your bike to Ojai, CA", h1 "Should you bring your bike to Ojai?", no h2 | fix 6 |

Canonicals match on all eight. JSON-LD parses on all eight: City, BreadcrumbList, WebPage, FAQPage
on the guide; ItemList + BreadcrumbList on the lists. All eight URLs are in `sitemap-events.xml`.
The lede (`summary`) reads as an answer and can be lifted whole. No change.

## Fixes (generator, for the editor; none applied)

1. Town page has no `<h2>` with the query. The FAQ heading "Questions about riding in Ojai" is the
   closest. Change it to "Questions about cycling in Ojai" in `build-events.js` (the FAQ section
   heading). One word, every town.
2. Meta descriptions on the list pages are the same sentence in every town ("Where riders in
   <town> start the day and finish the ride. 3 listed."). Search Console says the specific
   question wins. `RESOURCES.*.intro` in `build-events.js` (line 974 on): build the description
   from the first listing's facts instead. Ojai coffee should read: "Coffee in Ojai for cyclists:
   Ojai Coffee Roasters opens at 6 a.m. every day. Three listed, with hours." (under 155).
3. bike-shops: when a shop has a `rental-*` service, lead the title with it:
   "Bike rental and bike shops in Ojai, CA". Same file, `RESOURCES["bike-shops"].title`.
4. hotels: the page that ranks position 1 for Palm Springs does it on the complimentary-bikes
   question. When any hotel note has "complimentary bicycle", write the description from it:
   "Hotels in Ojai for cyclists: four lend bikes to guests, in their own words. Six listed."
   The count has to come from the data, not be typed.
5. culture h1 is hard-coded "record stores, bookshops, bars". Ojai has a bookshop, a brewery, a
   market, a museum and two venues; no record store. Build the h1 tail from the `type`s present,
   or drop the tail: "Ojai off the bike".
6. bring-your-bike: title and h1 disagree. Title → "Should you bring your bike to Ojai, CA?"
   (39 characters, keeps the suffix).
7. Town description is `summary` cut at 155 with an ellipsis. Fine for now; the first sentence
   carries the query words. A `description` field would be cleaner. Schema change, editor's call.
8. verify.md watch item still open: "Aug 28 to 31, 2026" in `rules_and_safety` wants an en dash.
   Not my field.

## FAQ + tagline (applied)

The old set had "Can I take my bike on the bus between Ojai and Ventura?". It came out to make
room for the Center Ride Out question; the bus facts are still in Getting there and
bring-your-bike. Every answer is from the JSON. Hotel wording is each property's own, from its
hotel note. The camp location is not named.

```json
{
  "tagline": "A rail-trail, a gravel mountain and one long climb",
  "faq": [
    {
      "q": "Which Ojai hotels have complimentary bikes for guests?",
      "a": "Four say so on their own pages. Ojai Rancho Inn lists \"Complimentary bicycles for use,\" Hummingbird Inn says \"grab a complimentary bicycle and tour Ojai,\" Casa Ojai Inn lists \"Bicycles, Locks, and Helmets included with amenity fee,\" and Ojai Valley Inn says \"Pick up a complimentary Linus bicycle.\" None of them states a policy on bringing your own bike into the room, so ask when you book."
    },
    {
      "q": "What coffee shop in Ojai opens at 6 a.m.?",
      "a": "Ojai Coffee Roasters, downtown at 337 E. Ojai Ave., opens at 6 a.m. every day, Saturday and Sunday included; its kitchen runs 9 to 2. Coffee Connection in Meiners Oaks opens at 6 on Saturday and closes at 1, but its Sunday hours aren't settled, so call first."
    },
    {
      "q": "Where can I rent a road bike in Ojai?",
      "a": "The Mob Shop, 110 W Ojai Ave. It rents an ENVE Melee road bike in 54, 56 and 58, plus gravel and mountain bikes, by advance booking only, with no walk-ins, and it's closed Tuesday and Wednesday. Its rental pages say these bikes \"may not be rented for mass start events or races,\" so ask the shop before you plan one for an organized ride."
    },
    {
      "q": "How long is the Ojai Valley Trail, and is it paved?",
      "a": "It's 9.3 miles and paved, a car-free rail-trail from Bryant Street in Ojai to Foster Park. There it meets the Ventura River Trail, which makes about 15 miles one way from Ojai to Ventura. Some stretches are bumpy and cracked from tree roots, and it gets crowded on weekends."
    },
    {
      "q": "Should I bring my bike to Ojai?",
      "a": "Yes, and plan on a car, because Ojai has no airport and no train. Delta, American and Southwest check a packed bike at the standard bag fee (Nov 2026), and Ojai's one rental shop is book-ahead only and closed Tuesday and Wednesday. No shop in the Ojai Valley or Ventura says it receives a shipped bike."
    },
    {
      "q": "Where do Center Ride Out riders sleep in Ojai?",
      "a": "They camp. The ride reaches Ojai on Friday, April 23, 2027 and rolls for Los Angeles by 7:00 am on Sunday, and the Center has not published where the camp is. The hotels in this guide are for whoever drives up to meet a rider."
    }
  ]
}
```

Tagline is 50 characters, three facts, no adjectives that aren't facts. Kept as it was.

## Overlap

None. Nearest guide is `los-angeles-ca`, about 63 miles; no shared lede, sentence or listing.
`radius: 8` keeps this guide off the Ventura ride pages (12 miles); checked after the build, no
Ventura ride page links to it.

## Search check

"cycling in Ojai" (WebSearch, Nov 15, 2026): Komoot route collections, Lonely Planet, ojaihub.com,
Pathless Pedaled, Two Wheeled Wanderer, the Ojai Valley Inn's activities page. Route lists and
travel features. None answers which hotels lend bikes, what opens at 6, or the rental shop's
mass-start limit in one place. That's the gap this page fills.

Search Lab: Ojai guide FAQ questions (complimentary bikes, 6 a.m. coffee, Ojai Valley Trail length) should show impressions · Search Console queries containing "ojai" · read Dec 13, 2026
