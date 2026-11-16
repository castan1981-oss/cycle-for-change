# guerneville-ca · eat-scout · 2026-11-16

Six places, first build. Five are in Guerneville, one is downriver in
Duncans Mills. Hours, address and phone for all six come from the
restaurant's own site, read today.

The slots: the night before (Guerneville Taco Truck, Boon), after the ride
(Piknik Town Market, the Lodge at Dawn Ranch, Stumptown Brewery), late
(Stumptown Brewery, and it is the only one), on the way (the Blue Heron in
Duncans Mills, Stumptown on River Road), and the one to go back for (Boon).

This town eats early. No kitchen I could confirm serves past 10 p.m., and
only Stumptown's serves past 9. Nothing confirmed opens for breakfast before
8 a.m. The pasta place a rider wants on Friday night (Main Street Bistro)
is in "Couldn't confirm": its own site would not load.

Cycle to Zero riders are fed in camp (the brief). So these are for Saturday
off the bike, for the people who drove up, and for any other weekend.

How this run went: 7 searches. WebFetch only opens URLs a search returned,
so the own sites were reached by searching with the domains named. Three own
sites never loaded (Main Street Bistro, Cape Fear Cafe, The Hot Box BBQ) and
several never surfaced (Pat's, Saucy Mama's, The Oxbow, Russian River Pub).
`routes.md` did not exist yet, so "on the way" ties are by road name from the
address only; @route-scout or the editor confirms the road is on a listed
route. No geocoder page was fetched, so no distances from the centre are
given, and none should be added from these addresses without one.

## Findings

```json
[
  {
    "name": "boon eat + drink",
    "url": "https://eatatboon.com/",
    "address": "16248 Main St, Guerneville, CA 95446",
    "cuisine": "Californian",
    "note": "The one to go back for: a small bistro on Main Street with seasonal plates, a burger and a vegan bowl. Dinner only, from 4 p.m.: to 8 Wednesday, Thursday and Sunday, to 9 Friday and Saturday; closed Monday and Tuesday (its own page, Nov 2026). No reservations and walk-in parties of six at most, so a big group splits up or goes elsewhere. A splurge: mains $26 to $45 (Nov 2026). 707-869-0780."
  },
  {
    "name": "Guerneville Taco Truck",
    "url": "https://www.guernevilletacotruck.com/",
    "address": "16405 CA-116, Guerneville, CA 95446",
    "cuisine": "Mexican",
    "note": "The night before, or any time a burrito is the answer: tacos, burritos and a breakfast burrito from a truck in town. Open daily 11:30 a.m. to 9 p.m. (its own page, Nov 2026). The page gives no prices, seating or payment details; Sonoma Magazine says cash only, so bring some. Its page carries no date, so check it's parked before a group walks over."
  },
  {
    "name": "Stumptown Brewery",
    "url": "http://stumptown.com/cgi/wwpints/head.cgi",
    "address": "15045 River Rd, Guerneville, CA 95446",
    "cuisine": "Pub",
    "note": "Late, and after the ride: a brewpub on River Road. The kitchen runs 11 a.m. to 10 p.m. every day and the pub from 10:30 a.m. to at least 11 p.m. (its own page, Nov 2026), the latest kitchen confirmed here. Sonoma.com's listing describes a big open deck over the Russian River; the brewery's page doesn't mention it, or bikes. The page carries no date, so call first: (707) 869-0705."
  },
  {
    "name": "Piknik Town Market",
    "url": "https://www.pikniktownmarket.com/",
    "address": "16228 Main Street, Guerneville, CA 95446",
    "cuisine": "Market",
    "note": "Breakfast and lunch on Main Street: a market with baked goods, salads and grab-and-go food. Opens 8 a.m. every day; closes 5 p.m. Saturday and 4 p.m. the other six (its own page, Nov 2026). Its page says nothing about tables, inside or out. (707) 604-7295."
  },
  {
    "name": "The Lodge at Dawn Ranch",
    "url": "https://dawnranch.com/dine/",
    "address": "16467 CA-116, Guerneville, CA 95446",
    "cuisine": "Californian",
    "note": "A sit-down breakfast, and a dinner for the people who drove up. Breakfast 8 to 11 a.m. Monday to Friday, brunch 8 a.m. to noon Saturday and Sunday. Dinner from 5 p.m., last seating 8 Thursday, Sunday and Monday and 8:30 Friday and Saturday; no dinner Tuesday or Wednesday (its own page, updated Sept 2026). Book dinner: the page says reservations are strongly recommended. A resort restaurant, so likely a splurge; no prices read. (707) 869-0656."
  },
  {
    "name": "Blue Heron Restaurant and Tavern",
    "url": "https://blueheronrestaurant.com/",
    "address": "25275 Steelhead Blvd, Duncans Mills, CA 95430",
    "cuisine": "Seafood",
    "note": "On the way, in Duncans Mills: a tavern with a seafood kitchen and a patio that has music on Sundays. The kitchen runs 4:30 to 8 p.m. Tuesday to Friday, noon to 8 Saturday and noon to 7 Sunday; no kitchen hours are posted for Monday. The bar is open daily, from 3 p.m. on weekdays and noon on weekends, to 10 (its own page, Nov 2026). Groups of eight or more need a reservation. (707) 865-2261."
  }
]
```

## Why these

- **boon eat + drink** — the one place that's just good, on Main Street.
  Honest about the catch: no bookings, six to a party.
- **Guerneville Taco Truck** — the only confirmed fast, big plate open
  until 9 every night. The burrito slot.
- **Stumptown Brewery** — the only kitchen confirmed open to 10 p.m., seven
  days. A river deck and burgers, both from a listing, not its own page.
  On River Road.
- **Piknik Town Market** — the earliest confirmed food on Main Street on a
  Saturday (8 a.m.), and it's grab-and-go.
- **The Lodge at Dawn Ranch** — the confirmed sit-down breakfast, 8 a.m.
  every day, and a dinner that takes reservations for family driving up.
- **Blue Heron** — a lunch stop on a Saturday or Sunday ride, with a
  patio. Weekday riders find the kitchen shut until 4:30.

## Rejected

- **Trillium** (16222 Main Street) — oysters, wine and small plates by the
  county tourism page's description. Not rider food; not fetched. If
  anything it's @culture-scout's as a bar (the chamber gives trillium.bar).
- **Nimble & Finn's** — ice cream. Not a meal. A lead for @culture-scout or
  @coffee-scout.
- **Brot** — Sonoma Magazine's page says "closed for winter"; it's a sister
  to Boon by Boon's own page. Not fetched on its own site. Re-check before
  May.
- **River's End** (Jenner) — bookings through Resy by the chamber's
  listing. A destination dinner, not a ride stop. Not fetched.
- **A La Heart Kitchen** (Forestville) — on the chamber's restaurant list.
  Not fetched; no reason found to send a rider there.
- **R3 Hotel** — a hotel on the chamber's dining list; @stay-scout's. Its
  restaurant, if any, wasn't read.
- **Coffee Bazaar** (14045 Armstrong Woods Rd) — on the chamber's
  breakfast list, Facebook only. Passed to @coffee-scout.

## Couldn't confirm

- **Main Street Bistro & Piano Bar** (16280 Main St; chamber phone (707)
  869-1568) — the pizza-and-pasta night-before pick, with live music, and
  the likeliest place open to 10 on a Friday. `mainstreetbistro.net`
  returned an error twice today. OpenTable's page gives dinner to 9 Monday
  to Thursday and to 10 Friday and Saturday, but its newest shown review is
  from 2014 and its Sunday lines disagree, so those hours aren't usable.
  Sonoma Magazine gives a different site for it (mainststation.com). The
  editor should load the site in a browser or phone them; if it checks out
  it belongs in the list, and its piano bar goes to @culture-scout.
- **Pat's International** (16236 Main Street; chamber phone (707)
  236-0322) — the diner breakfast. Sonoma Magazine says breakfast and lunch
  daily 8 a.m. to 3 p.m., but the article has no date. The chamber gives
  ilovepats.com and the magazine gives patsinternational.com; neither came
  up in search, so neither was fetched.
- **Farmhand** (15025 River Rd) — a deli and market with box lunches; the
  on-the-way sandwich. The only page of its site I could open is a 2019
  event page whose footer gives store hours (9 a.m. to 4 p.m. Friday to
  Monday, to 3 Thursday, closed Tuesday and Wednesday). Too old to print.
  Fetch thefarmhand.net's front page.
- **River Inn Grill** (16141 Main Street, (707) 869-0481) — breakfast.
  Sonoma.com says 8 a.m. to 3 p.m. daily, no date, no site of its own
  found. It isn't on the chamber's list.
- **The Hot Box BBQ** (16155 Drake Rd) — its page redirects to itself and
  never loaded.
- **Saucy Mama's Jook Joint** (16632 CA-116) — Southern dinners by the
  county tourism page. Its ordering site didn't surface in search.
- **The Oxbow** (17132 Highway 116) — dinner and brunch on garden decks, by
  Sonoma Magazine. Own site not fetched.
- **Baked on the River** (16390 4th St) — the chamber says it has a patio.
  Its domain forwards to a Weebly address that couldn't be opened.
- **Cape Fear Cafe** (25191 Main St, Duncans Mills) — on the chamber's
  breakfast list; its site blocks automated readers.
- **La Tapatia, Jay's Taste of India, Rivertime, Smart Pizza** — on the
  chamber's list with addresses and phones, no sites of their own listed.
  Not checked further.
- **Russian River Pub** (11829 River Rd, Forestville) — not fetched.
- **Anything open past 10 p.m.** — none confirmed. Stumptown's pub says "at
  least" 11; its kitchen stops at 10.
- **Open status for the Taco Truck, Stumptown and the Blue Heron** — each
  site is live with current hours but carries no dated notice. One signal,
  not two. Notes say to call or check.
- **The Taco Truck's address** — its own page says 16405 CA-116 (used
  above). The chamber says 16451 Main St and Sonoma Magazine says 16632
  Main St.
- **The Blue Heron's address** — its own page says 25275 Steelhead Blvd
  (used above); the chamber says 25300.
- **Stumptown's deck** — from Sonoma.com's listing, which also gives hours
  (to midnight, to 2 a.m. Friday and Saturday) that don't match the
  brewery's own page. The own page wins on hours. The `url` above is the
  frame page that search returned; the editor may prefer the site root once
  it's checked.
- **Which way each road runs** — that Duncans Mills is downriver toward the
  coast and River Road upriver is from the brief's zones, not a page I
  fetched. The notes say only "on the way" and "on River Road".
- **Bike parking, anywhere** — no page read today says a word about bikes.
- **Distances** — none measured, Duncans Mills included.
- **Queer-owned** — no restaurant page read today says so in its own
  words. Boon's page names its founder, Crista Luedtke, and nothing more.
  Piknik's names its owner, Mags van der Veen, and nothing more.

## Sources

- https://web.russianriver.com/Restaurants
- https://web.russianriver.com/Restaurants/Breakfast
- https://web.russianriver.com/Restaurants/Dinner
- https://web.russianriver.com/Restaurants/Boon-Eat-Drink-10
- https://sonomacounty.com/articles/guerneville-culinary-restaurants
- https://www.sonomacounty.com/profiles/boon-eat-drink
- https://www.sonomamag.com/best-places-to-eat-in-guerneville/
- https://www.sonomamag.com/fried-chicken-with-a-side-of-history-at-pats-international-in-guerneville/
- https://eatatboon.com/
- https://eatatboon.com/dinner/
- https://www.guernevilletacotruck.com/
- http://stumptown.com/cgi/wwpints/head.cgi
- https://sonoma.com/businesses/12887/stumptown-brewery
- https://www.pikniktownmarket.com/
- https://www.pikniktownmarket.com/aboutus
- https://dawnranch.com/dine/
- https://blueheronrestaurant.com/
- https://www.opentable.com/single.aspx?rid=63679
- https://www.thefarmhand.net/events/party
- https://sonoma.com/businesses/11167/river-inn-grill
