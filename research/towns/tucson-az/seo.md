# SEO / GEO — Tucson, AZ (audit of the built pages, 2026-10-04)

Pages read: `cfc-site/towns/arizona/tucson/` + routes, coffee, culture, bring-your-bike, hotels, restaurants, bike-shops. All 8 are in `cfc-site/sitemap-events.xml`, which `/sitemap.xml` references. Every page: canonical matches the URL, `og:title` / `og:description` / `og:image=/og-cfc.png` / `twitter:card` present, JSON-LD parses, every outbound link carries `rel="noopener"`, no raw `{ride:}` tokens, the shared pledge block rendered, a link back to `/towns/`, `/events/2027/`, and the other seven pages. The town page links the rides hub `/rides/az/tucson/` (exists). The town page's one `<img>` (the El Tour event tile) has alt text and `loading="lazy"`.

## Queries

| URL | Target query | Title / h1 / h2 | Verdict |
|---|---|---|---|
| `/towns/arizona/tucson/` | cycling in Tucson | title "Tucson, AZ for cyclists — rides, bike shops, coffee, where to stay, bringing your bike" (86) · h1 "Tucson, Arizona" · h2 "Cycling in Tucson" is `visually-hidden` | **fix (generator)**: query only in hidden text; title 86 |
| `/routes/` | bike routes in Tucson | title (79) has it · h1 "Rides in Tucson: the routes to bring your bike for" does not · h2 "Bike routes in Tucson, listed" | fix (generator): h1 + title length |
| `/coffee/` | coffee in Tucson for cyclists | title (65) · h1 · h2 | pass; title length |
| `/culture/` | Tucson off the bike | title (86) · h1 · h2 | pass on the rule; weak typed query; title length |
| `/bring-your-bike/` | should I bring my bike to Tucson | title "Bringing your bike to Tucson, AZ — fly, ship or rent, getting around, the rules" (79) · h1 "Should you bring your bike to Tucson?" · no h2 carries it | pass-ish; lede sentence one answers it |
| `/hotels/` | hotels in Tucson for cyclists | title (61) · h1 · h2 | pass; 1 over |
| `/restaurants/` | restaurants in Tucson for cyclists | title (64) · h1 · h2 | pass; title length |
| `/bike-shops/` | bike shops in Tucson | title (84) · h1 · h2 | pass; title length |

Descriptions: 146–154 chars, contain the query, cut mid-sentence with "…" by the generator. Town lede = `summary`, 6 sentences; the first three are the quotable answer ("Tucson is the winter riding town. A 28-mile paved climb up Mount Lemmon … dry, mild roads from October to April. The fast group ride, the Shootout (Saturdays, 7:00 am), leaves University and Euclid …"). The build filled the Shootout's day and time from rides.json, which is the right behaviour. Resource ledes are 2–4 sentences.

JSON-LD: `City` (geo, State, address) + `BreadcrumbList` (Towns → Arizona → Tucson) + `WebPage` (speakable `.lede`, `dateModified` 2026-10-03 = `verified`) + `FAQPage` (6). `City.event` = El Tour de Tucson, `startDate` 2026-11-21, which matches the "Bike events in Tucson" section on the page (Saturday, November 21, 2026); the 2027 row (Nov 20, projected) sits in the 2027 list. Routes 7 `Trip`; coffee 6 `CafeOrCoffeeShop`; hotels 6 `LodgingBusiness`; restaurants 8 `Restaurant`; bike-shops 6 `BikeStore`; culture 6 typed by kind (BarOrPub, LocalBusiness, MusicStore, BookStore, Museum). Every FAQ answer in the LD is on the page.

## Fixes (generator — `scripts/build-events.js`; the editor decides)

Same four as San Francisco; listed in `research/towns/san-francisco-ca/seo.md` with line numbers. For this town the proposed titles land at: town 51 ("Cycling in Tucson, AZ — rides, shops, where to stay"), hotels 48, restaurants 38, bike-shops 45, coffee 49, culture 47, routes 37, bring-your-bike 52.

1. Title templates (`townPage()` line 552; `RES` lines 683–689) — over 60 on all 8 pages.
2. Town h1 (line 601) → `Cycling in ${t.name}`; delete the `visually-hidden` h2 (line 608); promote "Riding in Tucson" (line 594) to the visible h2.
3. Routes h1 (line 688 `h`) → "Bike routes in Tucson: the ones to bring your bike for".
4. Description (line 555): cut at a sentence end, not mid-word.
5. Not a generator change: `summary` could stop after "…GABA posts a social road ride most days of the week." — the TUS / Fair Wheel / Pima Street / Tuxon sentences are the bring-your-bike and hotels ledes already. Not applied.

## FAQ + tagline (checked, not changed)

All six answers checked against the guide's own data: American/Southwest/Delta/Alaska $45, Pima Street $100 build, Fair Wheel $100 road / $75 gravel, Oct–Apr season and the Loop's before-9/after-5 rule, Mount Lemmon 27.8 mi / 6,770 ft / 4.7%, Bigelow water past mile 19, Windy Point, LeBuzz at 6, Shootout and Women's Shootout starts, GABA Gatherist sign-up and the Cactus Cycling trial membership, Tucson Bicycle Rentals $125/$395, Sun Link, 520-351-3351. All backed, 2–4 sentences each. Tagline "Mount Lemmon, the car-free Loop, dry winter roads" (49) kept.

```json
{
  "tagline": "Mount Lemmon, the car-free Loop, dry winter roads",
  "faq": "unchanged — six questions as in data/towns/tucson-az.json"
}
```

## Overlap

Shares no listing with Phoenix. Two FAQ questions are the same shape as Phoenix's ("Should I bring my bike to X?", "Do I need a car to ride in X?") with opposite answers (Tucson: no car if you stay central; Phoenix: yes) — the pair is the point. Both Arizona ledes open on "winter town"; different sentences. `covers[]` (Oro Valley, Marana, Vail, Sahuarita, Green Valley) doesn't touch Phoenix's.

## Search check

"cycling in Tucson" returns Visit Tucson's road-biking page, a concierge blog, Fair Wheel's own route post, PJAMM's Mt. Lemmon page and a bike-tour company — good on routes, silent on whether to fly the bike, which hotel puts bike storage in writing, and where the Shootout leaves. This page answers those and is the only one that ties them to El Tour's dates; the h1 should say "cycling" (fix 2).
