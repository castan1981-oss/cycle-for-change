# SEO / GEO — Phoenix, AZ (audit of the built pages, 2026-10-04)

Pages read: `cfc-site/towns/arizona/phoenix/` + routes, coffee, culture, bring-your-bike, hotels, restaurants, bike-shops. All 8 are in `cfc-site/sitemap-events.xml`, which `/sitemap.xml` references. Every page: canonical matches the URL, `og:title` / `og:description` / `og:image=/og-cfc.png` / `twitter:card` present, JSON-LD parses, every outbound link carries `rel="noopener"`, no raw `{ride:}` tokens, the shared pledge block rendered, a link back to `/towns/`, `/events/2027/`, and the other seven pages. The town page links the rides hub `/rides/az/phoenix/` (exists). No images on these pages.

## Queries

| URL | Target query | Title / h1 / h2 | Verdict |
|---|---|---|---|
| `/towns/arizona/phoenix/` | cycling in Phoenix | title "Phoenix, AZ for cyclists — rides, bike shops, coffee, where to stay, bringing your bike" (87) · h1 "Phoenix, Arizona" · h2 "Cycling in Phoenix" is `visually-hidden` | **fix (generator)**: query only in hidden text; title 87 |
| `/routes/` | bike routes in Phoenix | title (80) has it · h1 "Rides in Phoenix: the routes to bring your bike for" does not · h2 "Bike routes in Phoenix, listed" | fix (generator): h1 + title length |
| `/coffee/` | coffee in Phoenix for cyclists | title (66) · h1 · h2 | pass; title length |
| `/culture/` | Phoenix off the bike | title (87) · h1 · h2 | pass on the rule; weak typed query; title length |
| `/bring-your-bike/` | should I bring my bike to Phoenix | title "Bringing your bike to Phoenix, AZ — fly, ship or rent, getting around, the rules" (80) · h1 "Should you bring your bike to Phoenix?" · no h2 carries it | pass-ish; lede sentence one answers it |
| `/hotels/` | hotels in Phoenix for cyclists | title (62) · h1 · h2 | pass; 2 over |
| `/restaurants/` | restaurants in Phoenix for cyclists | title (65) · h1 · h2 | pass; title length |
| `/bike-shops/` | bike shops in Phoenix | title (85) · h1 · h2 | pass; title length |

Descriptions: 147–154 chars, contain the query, cut mid-sentence with "…" by the generator. Town lede = `summary`, 7 sentences; the first three are the lift-able answer ("Phoenix is a winter cycling town … The climb is South Mountain's Summit Road, closed to cars on Sunday mornings. The long loops go around the McDowell Mountains …"). The car sentence and the American / $90 / shipping sentences repeat the bring-your-bike lede. Resource ledes are 2–4 sentences.

JSON-LD: `City` (geo, State, address) + `BreadcrumbList` (Towns → Arizona → Phoenix) + `WebPage` (speakable `.lede`, `dateModified` 2026-10-03 = `verified`) + `FAQPage` (6). Routes 8 `Trip`; coffee 4 `CafeOrCoffeeShop`; hotels 6 `LodgingBusiness`; restaurants 5 `Restaurant`; bike-shops 6 `BikeStore`; culture 7 typed by kind. Every FAQ answer in the LD is on the page. `City.event` is empty (no event with its own page is hosted here), which matches the page.

## Fixes (generator — `scripts/build-events.js`; the editor decides)

Same four as San Francisco; listed in `research/towns/san-francisco-ca/seo.md` with line numbers. For this town the proposed titles land at: town 52 ("Cycling in Phoenix, AZ — rides, shops, where to stay"), hotels 49, restaurants 39, bike-shops 46, coffee 50, culture 48, routes 38, bring-your-bike 53.

1. Title templates (`townPage()` line 552; `RES` lines 683–689) — over 60 on all 8 pages.
2. Town h1 (line 601) → `Cycling in ${t.name}`; delete the `visually-hidden` h2 (line 608); promote "Riding in Phoenix" (line 594) to the visible h2.
3. Routes h1 (line 688 `h`) → "Bike routes in Phoenix: the ones to bring your bike for".
4. Description (line 555): cut at a sentence end, not mid-word.
5. Not a generator change: `summary` could stop after "…Indian Bend Wash path through Scottsdale." and leave the car, airline and rental sentences to the bring-your-bike page, which already carries them. Not applied — not my field.

## FAQ + tagline (checked, not changed)

All six answers checked against the guide's own data: American $45 online / only-bag condition, Bike Emporium $90 / 7-speed gravel / closed Sunday, "no Valley shop says it receives a shipped bike", Nov–Apr season and the March 19, 2026 heat closures, dust-storm cancellations (clubs), Airpark Bike Co (rent note), Sky Train / 14 rental companies / $20 flat taxi, Summit Road Sunday hours. All backed. Q3 (ride starts) runs five sentences but each is a fact a visitor needs; left. Tagline "South Mountain at dawn, the McDowell loops, the Greenbelt" (57) kept.

```json
{
  "tagline": "South Mountain at dawn, the McDowell loops, the Greenbelt",
  "faq": "unchanged — six questions as in data/towns/phoenix-az.json"
}
```

## Overlap

Shares no listing with Tucson or any other town (`Regroup Coffee + Bicycles` appears twice inside this guide, under coffee and bike shops, on purpose). Two FAQ questions are the same shape as Tucson's ("Should I bring my bike to X?", "Do I need a car to ride in X?") with opposite answers — that is the point of the pair, not a duplicate. Both Arizona ledes open on "winter town" ("Phoenix is a winter cycling town" / "Tucson is the winter riding town"); different sentences, same frame — fine, but a third Arizona guide should open differently.

## Search check

"cycling in Phoenix" returns Visit Phoenix's biking page, AllTrails, RideWithGPS and Komoot route lists and a shop blog ("Best road bike routes in Phoenix") — route lists with no season, no Silent Sunday hours, no "do I need a car", no group-ride starts. This page answers those; it needs the h1 to say "cycling" (fix 2) to be read as the answer.
