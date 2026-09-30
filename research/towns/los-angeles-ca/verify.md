# Verify — los-angeles-ca

2026-09-30 · run by the editor in the session that assembled the file (the
@town-verifier agent takes this over for the first refresh). **Ships**, with
the 15 source-list fails below resolved (nine pruned, six transient).

## Script output

`node tools/verify-town.js data/towns/los-angeles-ca.json` — 190 URLs fetched.
Every listing URL (routes, shops, coffee, restaurants, hotels, culture, clubs,
bring-your-bike shops, bike share) answered 2xx/3xx. All 15 fails were in the
town-level `sources[]`:

- Pruned (dead, wrong path, or hijacked): goldensaddlecyclery.com (now redirects
  to a spam link page; the shop was already rejected as closed), rock-store.com/contact
  (dead; the note says so), pacificahotels.com/cyclists (404), hiusa.org/…/los-angeles-santa-monica
  (404; the hostel's real page is listed), incycle.com/pages/pasadena (404),
  metro.net/riding/what-can-i-bring-board (404), safariburbank.com (never resolved),
  united.com legacy sports-equipment path, foursquare rock-store (login wall).
- Transient from this sandbox (real pages, blocked or 503 to a script): ciclavalley.org
  GMR page, opentable ×2, longbeach.gov/lgb, united.com sports-equipment, alaskaair.com ×3
  (406 to a HEAD). Kept.
- 403 bot walls (kept, verify by hand on the refresh): lacity.gov, cantersdeli.com,
  ihg.com ×2, amoeba.com, aa.com ×2, flylax.com ×6, flyontario.com, amlegal LAMC,
  exploretock, yelp ×2, toasttab ×3, ladot Vision Zero, instagram.

## Sample re-fetch — the claims that don't ship on a guess

| claim | page | result |
|---|---|---|
| Bike Shop LA receives BikeFlights shipments and builds the bike; no fee published | bikeshopla.com/articles/bike-shipping-assembly-pg230.htm | **pass** — "Your bike will arrive at Bike Shop LA, our staff will build it, and we will contact you to pick it up." No fee on the page. Address 7740 Santa Monica Blvd; hours 10–5 (header says 9–5) — the note carries both. |
| HI Santa Monica: free bicycle storage; e-bike certification rule; parking $20–25 / $5–14 | hiusa.org/hi-los-angeles-santa-monica-hostel-faq | **pass** — all three quoted on the FAQ. |
| Helen's Santa Monica rents a Cannondale SuperSix EVO CRB 3 at $120 / $90×3 / $75×5+; pedals, helmet, lock on request; photo ID; reserve ahead | helenscycles.com/articles/bike-rentals-pg271.htm | **pass**, verbatim. Manhattan Beach Treadwell 3 at $50 also confirmed. |
| Bike Attack rents Bianchi/KHS 105-level road bikes at $50/day, $75/24h, first come first served | bikeattack.com/bike-rentals/ | **pass**, verbatim. |
| La Grange weekday rides 6:30 a.m. from 26th & San Vicente; open to non-members; Nichols 8:00 from Raymond Fouquet Square | lagrange.org/rides | **pass**. The rides page does not name the Nichols day (rides.json says Saturday, from the ride's own page). The Women's Ride is "2nd Saturday" on this page and 3rd on the ride's page and in rides.json — **watch**; ask the club. |
| queer-owned | — | none claimed. Akbar is listed as `bar` with its own site's sentence; flip only if the site or bio says "queer-owned". |

## Stale
Nothing — first run, `verified` 2026-09-30.

## Watch
- PCH Chautauqua–Carbon Beach work zone (Caltrans): the hazards lines on the beach
  path and the Latigo loop carry it; re-read on the refresh.
- Glendora Mountain Road vehicle closures for fire season; whether bikes are included.
- Airline bag fees: Alaska/Southwest moved to $45/$55 in April 2026, American to $50/$60
  in May 2026 — every other town's `airline_note` written before that is stale.
- The Rock Store's status rests on a Sept 2025 local guide; the site is dead. Phone first.
- The Donut Man and Pedalers Fork hours come from listings, not their own sites.

## Left null on purpose
- Route water stops (no page named them) and start lat/lon on seven of eight routes
  (the pages give a place name, not a pin). Three routes have no hazards line because
  no page named one; the verifier should not invent them either.
- Four hotels' `price_hint` (booking engines don't render to a fetch).
