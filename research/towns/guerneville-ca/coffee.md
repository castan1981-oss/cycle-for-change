# guerneville-ca · coffee-scout · 2026-11-16

Two picks, both in Guerneville: one downtown (Zone 1), one upriver on River
Road (Zone 4). A third, in Duncans Mills (Zone 3), is staged under Couldn't
confirm with everything I read, because no dated open signal turned up for
it. The brief allows half targets; two I can stand behind beat three with a
guess.

No ride in `cfc-site/rides/rides.json` starts in Guerneville (per the brief)
and no club or shop page I fetched names a café as a meet, so every
`ride_out` is false. No `routes.md` existed yet, so no pick is tied to a
named route. No bike parking, pump or hose was confirmed anywhere: not one
fetched page mentions bikes. Room for a group (the brief's fact 4) is null
for every place.

Only one café's own site loaded (Coffee Bazaar). The Farmhand's, Gold Coast
Coffee & Bakery's, Baked on the River's and Piknik Town Market's own sites
were blocked by the session's fetch allowlist, so their facts come from the
Russian River Chamber's and Sonoma County Tourism's listings and are marked
as such. The verifier should load those four sites.

No distances are given: I had addresses, not coordinates, and computed
nothing from the brief's centre. No downtown point turned up on any page.

About 45 web calls: 9 searches, 36 fetches (9 blocked by the allowlist, 1
stopped at a redirect I did not follow).

## Findings

```json
[
  {
    "name": "Coffee Bazaar",
    "url": "https://coffeebazaarcafe.com/",
    "address": "14045 Armstrong Woods Rd, Guerneville, CA 95446",
    "note": "Downtown, on Armstrong Woods Road, the road that runs north to the redwoods. Opens at 6 every day, Saturday and Sunday included, so it's the one that's open before a morning ride. Sonoma County Tourism's listing says outdoor seating; the café's own site doesn't mention it, and nothing says bike parking.",
    "hours_hint": "6 a.m. daily; closes 4 p.m. Monday to Thursday, 6 p.m. Friday to Sunday (the café's own site, last changed Feb 2024; one listing says 5 p.m. daily)",
    "ride_out": false
  },
  {
    "name": "The Farmhand",
    "url": "https://www.thefarmhand.net/",
    "address": "15025 River Rd, Guerneville, CA 95446",
    "note": "A deli, espresso bar and market on River Road, upriver from downtown. Opens at 9 by the listing that gives hours, so it's for after the ride, and it's closed Tuesday and Wednesday. Outdoor seating per Sonoma County Tourism's listing. Nothing stated about bike parking.",
    "hours_hint": "Thursday to Monday, 9 a.m. to 4 p.m. per one listing; closed Tuesday and Wednesday. Listings disagree on the times — check the shop's site",
    "ride_out": false
  }
]
```

## Why these

- **Coffee Bazaar** — the early one, and the only pick whose own site I read. coffeebazaarcafe.com (home and contact pages) prints Monday to Thursday 6 to 4, Friday to Sunday 6 to 6, the address and (707) 869-9706. The site's footer is © 2024 and the page was last modified 2024-02-29, so it is older than six months. The current signals: Sonoma County Tourism's profile (© 2026, lists outdoor seating), the tourism office's "48 Hours in Guerneville" page (carries a mid-2026 image, names it for coffee, baked goods and breakfast sandwiches, next to a bookstore), the chamber's Coffee Houses and Bakeries list, pos.do showing 6 to 4 on a Monday (matches the café's own schedule), and joe.coffee (6 to 5 daily, marked open). Every source agrees on 6 a.m. For the Cycle to Zero reader: open at 6 on Saturday, May 22, and at 6 on Sunday. Read "open, hours worth a phone call" rather than fully current.
- **The Farmhand** — the post-ride one, and the only pick outside downtown. The Russian River Chamber's page (last modified Nov 14, 2026, two days before this read) calls it a gourmet deli, espresso bar and market, open Thursday through Monday, with river views, and sends people to thefarmhand.net for times. Sonoma County Tourism's profile (© 2026) lists bakery/coffee, breakfast, lunch and outdoor seating. joe.coffee gives 9 to 4 Thursday to Monday, closed Tuesday and Wednesday, and "Ste B" on the address. pos.do showed 9 to 4 on a Monday and reviewers there describe a deck over the river with tables. The obvious lunch place too; the editor can cross-list it with @eat-scout's report.

## Rejected

- **Big Bottom Market (16228 Main St)** — treat as gone under that name. bigbottommarket.com now answers with a 302 redirect to an unrelated domain (gavangtv.biz); I did not follow it. Sonoma County Tourism's 2026 pages name Piknik Town Market downtown for biscuits, and the chamber and the tourism office both list Piknik Town Market at 16228 Main St. No page I read says in words that one replaced the other. frankiapp still carries Big Bottom Market (updated Aug 14, 2026, opens at 8, no Tuesday), which shows how stale that directory can be. Tell the editor: never link bigbottommarket.com.
- **Piknik Town Market (16228 Main St)** — a café and grocery per the chamber's page (last modified Nov 13, 2026; chef-owner Mags van der Veen; phone (831) 345-7175; site Pikniktownmarket.com). No hours on either listing, coffee isn't mentioned, and its own site wasn't fetched. A food pick more than a coffee one. Lead for @eat-scout.
- **Baked on the River** — moved, and no longer an early bakery. The chamber's page (last modified Nov 16, 2026) and Sonoma Magazine (photos dated Aug 7, 2025) put it at 16390 4th St inside the R3 hotel since May 2025, serving brunch 9 to 2 and dinner 5 to 9, Thursday through Sunday. Sonoma County Tourism's "debuts" article still gives the old address (17071 Highway 116) and the old 6 a.m. hours; don't use it. Still pours locally roasted espresso per the chamber. Phone (707) 865-6060. Lead for @eat-scout, not coffee.
- **Roasters Espresso Bar (6656 Front St, Forestville) and Tiny Town Cafe (6544 Front St, Forestville)** — names and addresses from restaurantji only. Not fetched; budget went to Guerneville. Open slot for Zone 4 on the next run.
- **Monte Rio names from superpages** (Lightwave Coffee and Kitchen at 9725 Main St, Bia Cafe, Rio Cafe & Grill, Don's Dogs, Sam's Holey Cow, Rio Bridge Cafe) — a yellow-pages list with shared phone numbers, undated. Leads only; none fetched.
- **Duncans Mills Tea Shop** — tea.
- **Korbel Delicatessen & Market** — named by the tourism office for lunch. Lead for @eat-scout.
- **Airbnb place pages, tableagent, spinach.guide, roadtrippers ("The Grind Coffee House"), komoot route pages, weekendsherpa** — search noise or route content; not read. The komoot Guerneville pages are leads for @route-scout.

## Couldn't confirm

- **Gold Coast Coffee & Bakery, Duncans Mills** — the pick I wanted for Zone 3, the downriver stop on Highway 116 toward the coast. What I read: 25377 Steelhead Blvd, Duncans Mills, CA 95430 (joe.coffee, restaurantji; the tourism office writes "Steelhead Drive"; MapQuest files it under Jenner 95450); phone 707-865-1441 and site goldcoastcoffeebakery.com (Sonoma County Tourism); roasts on site, pastries from a wood-fired oven, pizza, outdoor seating (same); hours 7 to 5:30, to 6 on Friday and Saturday (joe.coffee only). Missing: its own site (blocked), and any open signal dated inside six months. MapQuest's newest reviews are Oct 21, 2025 and its status read "Closed" with no hours, which may be the hour of day. Where to look: goldcoastcoffeebakery.com, the Google listing, a phone call. If it checks out, the record is ready: opens at 7, so it's a stop on the way out, not a pre-ride one. Whether the organizer's Day 3 passes it is not published; don't say it does.
- **A second early café downtown, at 16350 3rd St.** Two names sit on one address: "Higher Ground Organic Espresso" (frankiapp, updated Aug 14, 2026: weekdays 6 to 3, Saturday and Sunday 7 to 3, outdoor seating, phone (707) 604-7412, and a website link that points at an unrelated music site) and "Country Coffee Organic Espresso & Tea" (joe.coffee, no hours, no status). No site of its own found. Could be one shop renamed. Where to look: the Google listing, a walk-by, the chamber.
- **Coffee Bazaar's closing time and its current hours.** Own site (2024): 4 on weekdays, 6 Friday to Sunday. joe.coffee: 5 daily. The opening time agrees everywhere. Its Facebook page (linked from the chamber's list) is the place to check.
- **The Farmhand's hours.** Chamber: Thursday through Monday, no times. joe.coffee: 9 to 4. frankiapp (Aug 2026): 7 to 7 every day, which nothing else supports. A pos.do reviewer says Sunday breakfast ends at 11:30. Its own site was blocked. If it opens at 7 in May, it becomes a second morning option upriver; until then it's post-ride.
- **The Farmhand's deck.** Outdoor seating is on the tourism office's listing; the deck over the river is from reviewers on pos.do, undated.
- **Coffee Bazaar's outdoor seating.** On the tourism office's and pos.do's listings; not on the café's own pages.
- **Bike parking, a pump, a hose, room for ten bikes** — at every place. Nothing on any fetched page.
- **Any café a ride meets at.** None found. If @community-scout turns up a ride that starts or ends at a café, `ride_out` and a `ride_slug` want a second look.
- **Who owns what.** No café page I read says queer-owned, so nothing is tagged.
- **Distances from the brief's centre**, for every place. Not computed. restaurantji's "4.57 miles" for Gold Coast has no stated reference point.
- **Whether Piknik Town Market took over Big Bottom Market's space.** Same street address on separate listings; no page says so.

## Sources

- https://coffeebazaarcafe.com/
- https://coffeebazaarcafe.com/contact-us/
- https://www.sonomacounty.com/food-drink/restaurants/coffee-bazaar/
- https://joe.coffee/locations/ca/guerneville/coffee-bazaar-cafe-guerneville/
- https://pos.do/en/guerneville/restaurant/coffee-bazaar
- https://web.russianriver.com/atb/Coffee-Houses-and-Bakeries
- https://www.sonomacounty.com/cities/guerneville/48-hours-guerneville/
- https://russianriver.com/business/the-farmhand/
- https://sonomacounty.com/profiles/the-farmhand
- https://joe.coffee/locations/ca/guerneville/the-farmhand-guerneville/
- https://pos.do/ca/guerneville/restaurant/the-farm-hand
- https://frankiapp.com/business/the-farmhand-165811.md
- https://joe.coffee/locations/ca/duncans-mills/gold-coast-coffee-bakery-duncans-mills/
- https://sonomacounty.com/profiles/gold-coast-coffee-and-bakery
- https://old.sonomacounty.com/restaurants/gold-coast-coffee-and-bakery
- https://startpage.mapquest.com/us/california/gold-coast-coffee-bakery-524867828
- https://frankiapp.com/business/higher-ground-organic-espresso-262487.md
- https://joe.coffee/locations/ca/guerneville/country-coffee-organic-espresso-tea-guerneville
- https://frankiapp.com/business/big-bottom-market-226333.md
- https://russianriver.com/business/piknik-town-market/
- https://www.sonomacounty.com/profiles/piknik-town-market
- https://russianriver.com/business/baked-on-the-river
- https://www.sonomamag.com/new-life-new-menu-at-guernevilles-baked-on-the-river/
- https://www.sonomacounty.com/food-drink/baked-river-bakery-and-cafe-debuts-guerneville/ (stale: old address and hours)
- https://www.restaurantji.com/ca/guerneville/coffee-shops/ (names and addresses only)
- https://www.superpages.com/duncans-mills-ca/coffee-shops (Monte Rio names only)
- Not loaded (allowlist): https://www.thefarmhand.net/, https://www.goldcoastcoffeebakery.com/, https://www.bigbottommarket.com, https://www.sonomacounty.com/profiles/baked-on-the-river, https://pos.do/en/guerneville/restaurant/higher-ground-organic-espresso
- Not followed: https://bigbottommarket.com/ (302 to an unrelated domain)
