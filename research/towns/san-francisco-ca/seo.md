# SEO / GEO — San Francisco, CA (audit of the built pages, 2026-10-04)

Pages read: `cfc-site/towns/california/san-francisco/` + routes, coffee, culture, bring-your-bike, hotels, restaurants, bike-shops. All 8 are in `cfc-site/sitemap-events.xml`, which `/sitemap.xml` references. Every page: canonical matches the URL, `og:title` / `og:description` / `og:image=/og-cfc.png` / `twitter:card` present, JSON-LD parses, every outbound link carries `rel="noopener"`, no raw `{ride:}` tokens, the shared pledge block rendered (the "I do the miles" h2), a link back to `/towns/`, `/events/2027/`, and the other seven pages. The town page links the rides hub `/rides/ca/san-francisco/` (exists). No images on these pages (the art is CSS), so nothing to alt.

## Queries

| URL | Target query | Title / h1 / h2 | Verdict |
|---|---|---|---|
| `/towns/california/san-francisco/` | cycling in San Francisco | title "San Francisco, CA for cyclists — rides, bike shops, coffee, where to stay, bringing your bike" (93) · h1 "San Francisco, California" · h2 "Cycling in San Francisco" is `visually-hidden` | **fix (generator)**: the query is only in a hidden h2; the h1 is the place name; title 93 chars |
| `/routes/` | bike routes in San Francisco | title (86) has it · h1 "Rides in San Francisco: the routes to bring your bike for" does not · h2 "Bike routes in San Francisco, listed" | fix (generator): h1 + title length |
| `/coffee/` | coffee in San Francisco for cyclists | title (72) · h1 · h2 all carry it | pass; title length |
| `/culture/` | San Francisco off the bike | title (93) · h1 · h2 carry it | pass on the rule; weak as a typed query (see Fixes); title length |
| `/bring-your-bike/` | should I bring my bike to San Francisco | title "Bringing your bike to San Francisco, CA — fly, ship or rent, getting around, the rules" (86) · h1 "Should you bring your bike to San Francisco?" · no h2 carries it (Flying / Shipping / Renting / Getting around / Rules) | pass-ish; title length; the lede answers it in sentence one |
| `/hotels/` | hotels in San Francisco for cyclists | title (68) · h1 · h2 | pass; title length |
| `/restaurants/` | restaurants in San Francisco for cyclists | title (71) · h1 · h2 | pass; title length |
| `/bike-shops/` | bike shops in San Francisco | title (91) · h1 · h2 | pass; title length |

Descriptions: all 145–153 chars and contain the query, but the generator cuts `summary` mid-sentence with "…" ("…along the ocean on Sunset…"). Lede: the town lede is the whole `summary`, 6 sentences; the first three are the quotable answer ("San Francisco is a city you ride out of without a car. Over the Golden Gate Bridge … home from Marin on the ferry. The bridge is open to bikes around the clock."). The airline/rental/ship-to-shop sentences repeat the bring-your-bike lede. Resource-page ledes are 2–4 sentences and read as answers.

JSON-LD: town page = `City` (geo, `containedInPlace` State, address) + `BreadcrumbList` (Towns → California → San Francisco) + `WebPage` (`speakable` `.lede`, `dateModified` 2026-10-03 = `verified`) + `FAQPage` (6). Routes = `ItemList` of 8 `Trip`; coffee 5 `CafeOrCoffeeShop`; hotels 6 `LodgingBusiness`; restaurants 4 `Restaurant`; bike-shops 6 `BikeStore`; culture 6 typed by kind (MusicStore, BookStore, LocalBusiness, Museum, BarOrPub, EventVenue) — better than a flat LocalBusiness. Bring-your-bike = `WebPage` + speakable. Every FAQ answer in the LD is on the page. Nothing in the LD that isn't visible.

## Fixes (generator — `scripts/build-events.js`; the editor decides)

1. **Titles are 68–93 chars before " — Cycle for Change"; Google cuts at ~60.** Day-0 Search Lab fact: 86% of titles already run long. Proposed templates (all ≤ 60 for this town):
   - `townPage()` line 552: `` `Cycling in ${t.name}, ${t.state_code} — rides, shops, where to stay` `` (58)
   - `RES` line 683 hotels: `` `Hotels in ${t.name} for cyclists — stay with a bike` `` (55)
   - line 684 restaurants: `` `Restaurants in ${t.name}, ${t.state_code} for cyclists` `` (45)
   - line 685 bike-shops: `` `Bike shops in ${t.name}, ${t.state_code} — repair and rentals` `` (52)
   - line 686 coffee: `` `Coffee in ${t.name} for cyclists — where rides start` `` (56)
   - line 687 culture: `` `${t.name} off the bike — what to do after the ride` `` (54)
   - line 688 routes: `` `Bike routes in ${t.name}, ${t.state_code} — with maps` `` (44)
   - line 689 bring-your-bike: `` `Bringing your bike to ${t.name}, ${t.state_code} — fly, ship or rent` `` (59)
2. **Town h1 / hidden h2.** Line 601 `<h1>${name}, ${state}</h1>` + line 608 `<h2 class="visually-hidden">Cycling in ${name}</h2>`. The query lives only in hidden text. Change the h1 to `Cycling in ${t.name}` (the eyebrow and breadcrumb already carry county and state) and delete the hidden h2; promote the fold's `<h3>Riding in ${name}</h3>` (line 594) to the visible `<h2>` so the query still has an h2.
3. **Routes h1** (line 688 `h`): `` `Bike routes in ${t.name}: the ones to bring your bike for` `` so the h1 matches the title and h2.
4. **Description** (line 555 `truncate(plain(t.summary), 155)`): cut at the last sentence end under 155 instead of mid-word. For this town that gives the first two sentences, 151 chars, no ellipsis.
5. **Town lede length.** Not a generator change: if the editor wants the lede quotable whole, trim `summary` to its first three sentences and let the bring-your-bike page carry the $45 / $135 / $100 facts (they are already its lede). Not applied — `summary` isn't mine to edit.
6. Culture page query: "San Francisco off the bike" is the site's phrase, not a search. The page still ranks for "what to do in San Francisco after a ride" only through the title tail; fix 1's culture template keeps that tail inside 60.

## FAQ + tagline (applied to `data/towns/san-francisco-ca.json`)

Changed: Q3's answer was a six-sentence sidewalk timetable; it is now three sentences and points at the Bring-your-bike page, where the full table already lives (`bring_your_bike.rules_and_safety`). Every other answer checked against the guide's own data (bridge rules, SFPD break-in page, SFO assembly stands, Columbus $135/$190, Sports Basement/High Trails prices, Donut Alley, McLaren Lodge, Sunset Dunes/KQED) — all backed, left as written. Tagline kept (52 chars). `node tools/verify-town.js --no-fetch` → ok, 0 fails.

```json
{
  "tagline": "Over the bridge to the Headlands and Tam, ferry home",
  "faq": [
    { "q": "Should I bring my bike to San Francisco?", "a": "(unchanged)" },
    { "q": "Do I need a car to ride in San Francisco?", "a": "(unchanged)" },
    { "q": "Can I ride a bike across the Golden Gate Bridge?", "a": "Yes, free, 24 hours a day, on the sidewalks, which you share with people walking: 15 mph, 5 mph at the towers, and all e-bike classes are allowed. Which sidewalk bikes use changes with the clock and the season (the bridge district's page, Oct 2026): on weekdays until 3:30 pm it is the east side, after that and on weekends check the bridge's own table, and lights at the approach show which side is open. Overnight it's the east sidewalk through gates you buzz to open, and high wind can close the west side; the full schedule is on the Bring-your-bike page." },
    { "q": "Where do group rides start in San Francisco?", "a": "(unchanged)" },
    { "q": "Can I rent a road or gravel bike in San Francisco?", "a": "(unchanged)" },
    { "q": "Is the Great Highway closed to cars?", "a": "(unchanged)" }
  ]
}
```

## Overlap

No listing shared with Los Angeles or any other town. `covers[]` names Berkeley, Oakland, Emeryville — if an East Bay guide is ever built, the Grizzly Peak route, Peet's Domingo and the Berkeley Bicycle Club rides move there. Phoenix and Tucson share nothing with this town.

## Search check

"cycling in San Francisco" returns tour operators (Dylan's, Bay City Bike, SF Bike Tours), the Presidio's rental page and SFBike's maps — rental-and-sightsee pages, none of which say which bridge sidewalk is open when, whether to fly the bike, or where a group ride meets. This page answers all three; the thin spot is that the town h1 doesn't say "cycling" (fix 2).
