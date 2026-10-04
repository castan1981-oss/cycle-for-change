# seattle-wa · culture-scout · 2026-10-03

Eight picks in five kinds: one record store, two bookstores, a museum, two
bars, a swim beach and a sculpture park. They sit in Zone 1 (Matthews Beach on
the Burke-Gilman), Zone 4 (the West Seattle Junction, the downtown waterfront)
and Zone 5 (the U District, Capitol Hill, Fremont). Nothing in the Eastside
hills.

**Not one of the eight loaded on its own page.** WebSearch stopped working
after one call: the second search came back "used its web search budget (200
of 200)". WebFetch would only load URLs a search had returned, plus pages in
Wikipedia's cache. Every business site, the city's parks page and the U
District's directory got a provenance refusal (permission timed out) or a
robots block. So every fact below comes from Wikipedia or from the listing
pages the one Easy Street search returned. Two rules follow from that:

- **Every `address` is null.** The rules take an address from the business's
  own page or its Google listing, and none loaded. The address each fetched
  source gives is under Couldn't confirm, ready to check.
- **No hours or prices in any note.** Hours come from the place's own page;
  none loaded. Where a source gave hours, they're under Couldn't confirm.

Open status is confirmed for none of them on its own page. Easy Street has
one recent signal (an article dated Sept 25, 2026). The other seven stand on
Wikipedia. The verifier has to load each `url` before any of these ships.

Nothing is `queer-owned`. Wikipedia calls the Wildrose "LGBTQ-owned", but
that's Wikipedia's word, not the bar's, so it's `bar`. No bike parking
confirmed anywhere. Calls: 2 searches (1 ran, 1 refused) and 41 fetch attempts
(27 loaded with content, 2 loaded with nothing useful, 12 refused or missing).

## Findings

```json
[
  {
    "name": "Easy Street Records",
    "kind": "record-store",
    "url": "https://easystreetonline.com/Location",
    "address": null,
    "note": "In the West Seattle Junction since 1988. New and used vinyl, CDs and cassettes, a café inside that serves breakfast, and a small stage: more than 2,000 in-store shows, Pearl Jam's in 2005 among them. The record store on the West Seattle side."
  },
  {
    "name": "Elliott Bay Book Company",
    "kind": "bookstore",
    "url": "https://www.elliottbaybook.com/",
    "address": null,
    "note": "Capitol Hill. Independent, with about 150,000 titles under 19-foot timber ceilings, more than 500 author events a year, and a small café in the store run by a neighboring restaurant. The bookstore for a rider sleeping on Capitol Hill."
  },
  {
    "name": "Charlie's Queer Books",
    "kind": "bookstore",
    "url": null,
    "address": null,
    "note": "Fremont, where the Burke-Gilman runs along the ship canal. An independent bookstore that sells only books by LGBTQ+ authors or with LGBTQ+ themes and characters. It started as a book cart at markets and opened the shop in November 2023."
  },
  {
    "name": "Burke Museum",
    "kind": "museum",
    "url": "https://www.burkemuseum.org/",
    "address": null,
    "note": "On the University of Washington campus, where the STP starts. The natural history and culture museum moved into a new building in October 2019: more than 16 million objects, one of the best-preserved T. rex skulls, and galleries of Northwest Native art. Two hours the day before the start."
  },
  {
    "name": "The Wildrose",
    "kind": "bar",
    "url": "https://www.thewildrosebar.com/",
    "address": null,
    "note": "Capitol Hill, at E Pike St and 11th Ave, on the ground floor of a 1905 apartment building. A lesbian bar since it opened on New Year's Eve 1985."
  },
  {
    "name": "Fremont Brewing",
    "kind": "bar",
    "url": "https://www.fremontbrewing.com/",
    "address": null,
    "note": "Fremont, on N 34th St; the Burke-Gilman runs along the Fremont Cut. The brewery opened in 2009, and its tasting room has grown into a large beer garden with indoor and outdoor seating."
  },
  {
    "name": "Matthews Beach Park",
    "kind": "other",
    "url": null,
    "address": null,
    "note": "On Lake Washington, with the Burke-Gilman along its west edge. A swimming beach, open in summer, with lifeguards and a diving platform anchored offshore. The swim on a hot day on the trail."
  },
  {
    "name": "Olympic Sculpture Park",
    "kind": "other",
    "url": null,
    "address": null,
    "note": "The Seattle Art Museum's public sculpture park in Belltown, at the north end of the downtown waterfront, with a beach on Puget Sound. Calder's Eagle, Serra's Wake and Plensa's Echo are here. It sits at the south end of Myrtle Edwards Park, whose 1.25-mile bike and walking path runs along Elliott Bay."
  }
]
```

## Why these

- **Easy Street Records**: the record store with a stage and a breakfast café, on the West Seattle side of the guide.
- **Elliott Bay Book Company**: the big independent, on Capitol Hill where the brief puts visitors to sleep, with more than 500 author events a year.
- **Charlie's Queer Books**: a bookstore in Fremont, on the Burke-Gilman side of town, that carries only LGBTQ+ authors and stories.
- **Burke Museum**: on the same campus as the STP start; the afternoon before a 5 a.m. roll-out.
- **The Wildrose**: Capitol Hill's lesbian bar since 1985, near where a visitor sleeps.
- **Fremont Brewing**: the beer garden in the neighborhood the Burke-Gilman runs through; the post-ride stop on the trail side.
- **Matthews Beach Park**: a lifeguarded lake swim right on the Burke-Gilman.
- **Olympic Sculpture Park**: a public park at the south end of the waterfront bike path, with Puget Sound in front of it.

## Rejected

- **Sonic Boom Records, Ballard** — Wikipedia: independent, 2209 NW Market St, since Sept 26, 1997. One record store is enough, and Easy Street has the café and the stage. A lead if Easy Street fails the check.
- **Neptune Theatre, U District** — Wikipedia: 1303 NE 45th St, a 1921 movie house that Seattle Theatre Group made a 1,000-seat performing arts venue in 2011. Cut to keep it to eight; no show listings fetched. The `venue` lead for the STP crowd.
- **Pike Place Market** — Wikipedia gives the streets (Pike Place, Pike St to Virginia St) and calls it Seattle's top tourist draw (20.9 million visitors in 2023), but no days or hours. A market pick needs the day and hours, and this one leans tourist. Left out.
- **Blue Moon Tavern, U District** — named only in Wikipedia's U District article ("an unofficial cultural landmark", founded 1934). Nothing from the bar. Lead only.
- **Scarecrow Video, U District** — a video store, not records. Not this section.
- **keepitlocalseattle.org/products/easy-street-records** and **recordstores.love/506** — both loaded with nothing about the store (a homepage and bare metadata). Not sources.

## Couldn't confirm

For all eight: open status, address and hours from the place's own page or
its Google listing. What the fetched sources say, for the verifier to check:

- **Easy Street Records** — four listings give 4559 California Ave SW, Seattle, WA 98116 and (206) 938-3279 (TripAdvisor adds "# 200"). Hours disagree. everafterinthewoods.com (Sept 25, 2026) and recordstore.com: 8 a.m. to 9 p.m. Monday to Saturday, 8 to 7 Sunday. vinylmapper.com and travel2concert.com: 9 to 9 and 9 to 7. TripAdvisor gives the café 7 a.m. to 3 p.m. daily (latest review July 12, 2025). easystreetonline.com/Location was blocked (robots.txt error), easystreetonline.com was refused, Yelp blocked by robots.
- **Elliott Bay Book Company** — Wikipedia: 1521 10th Avenue. elliottbaybook.com refused. Hours (the spec wants evenings) and open status missing.
- **Charlie's Queer Books** — Wikipedia: 465 N 36th St. Its latest dated item is Nov 2025, so nothing within six months. No website in the article, so `url` is null. **On `queer-owned`:** Wikipedia names the founders and describes them, but that's an encyclopedia, not the business. If the shop's own site or Instagram bio says queer-owned, flip the kind and say where in the note. If not, it stays `bookstore`.
- **Burke Museum** — Wikipedia: 4303 Memorial Way NE, on the UW campus. Hours and admission price missing; the spec wants both for a museum. burkemuseum.org not fetched (it wasn't in a search result).
- **The Wildrose** — Wikipedia: 1021 East Pike Street, at the corner of E Pike St and 11th Ave. Owners as of 2023 were Martha Manning and Shelley Brothers; Wikipedia says Shelley Brothers died in February 2025. Nothing confirms the bar is open now. Check thewildrosebar.com or its Google listing before it ships. Hours missing.
- **Fremont Brewing** — Wikipedia puts the beer garden on N 34th St in Fremont; no street number. Hours, food, and whether kids or dogs are welcome are missing. fremontbrewing.com not fetched.
- **Matthews Beach Park** — no address, and the lifeguard season and dates are missing. seattle.gov/parks/allparks/matthews-beach-park refused. Seattle Parks' page is the source to get.
- **Olympic Sculpture Park** — Wikipedia: 2901 Western Avenue, "free-admission", open "sunrise to sunset". Both need the Seattle Art Museum's own page before they go in the note. No SAM URL fetched, so `url` is null.
- **U District Farmers Market** — the STP-start market. Wikipedia's U District article says only that it's weekly and was founded in 1993. Day, hours and street missing. The Wikipedia article for the market itself isn't cached. If the editor gets the day and hours, it's the `market` pick.
- **Third Place Books, Lake Forest Park** — the bookstore on the trail: Wikipedia's Lake Forest Park Town Centre article says the center "abuts the Burke-Gilman Trail" and Third Place Books opened there in 1998. Nothing from the store. A strong pick if its own page loads.
- **Queer/Bar, Capitol Hill** — the Wikipedia page isn't cached; nothing fetched. Lead only, including for a `queer-owned` line in its own words.
- **Ballard Farmers Market, Fremont Sunday Market** — Wikipedia pages not cached; nothing fetched.
- **Bike parking** — not on any fetched page.

## Sources

- https://en.wikipedia.org/wiki/Easy_Street_Records
- https://vinylmapper.com/record-stores/us/wa/seattle/easy-street-records-98116/
- https://www.recordstore.com/store/easy-street-records-seattle-wa
- https://everafterinthewoods.com/you-can-sort-through-aisles-of-rare-vinyl-for-hours-at-easy-street-records-cafe-in-washington-a1df78cb/
- https://www.tripadvisor.com/Restaurant_Review-g60878-d2290579-Reviews-Easy_Street_Records_Cafe-Seattle_Washington.html
- https://travel2concert.com/place/easy-street-records-seattle/
- https://en.wikipedia.org/wiki/Elliott_Bay_Book_Company
- https://en.wikipedia.org/wiki/Charlie%27s_Queer_Books
- https://en.wikipedia.org/wiki/Burke_Museum_of_Natural_History_and_Culture
- https://en.wikipedia.org/wiki/The_Wildrose_(bar)
- https://en.wikipedia.org/wiki/The_Wildrose
- https://en.wikipedia.org/wiki/Fremont_Brewing
- https://en.wikipedia.org/wiki/Matthews_Beach_Park
- https://en.wikipedia.org/wiki/Olympic_Sculpture_Park
- https://en.wikipedia.org/wiki/Myrtle_Edwards_Park
- https://en.wikipedia.org/wiki/Burke-Gilman_Trail
- https://en.wikipedia.org/wiki/Pike_Place_Market
- https://en.wikipedia.org/wiki/University_District,_Seattle
- https://en.wikipedia.org/wiki/Neptune_Theatre_(Seattle)
- https://en.wikipedia.org/wiki/Sonic_Boom_Records
- https://en.wikipedia.org/wiki/Third_Place_Books (lands on the Lake Forest Park Town Centre article)

Refused or failed (not sources; listed so the next run doesn't spend the calls
again): easystreetonline.com (provenance, permission timed out);
easystreetonline.com/Location (robots.txt fetch error); yelp.com/biz/easy-street-records-and-cafe-seattle-4
(robots); elliottbaybook.com (provenance); seattle.gov/parks/allparks/matthews-beach-park
(provenance); udistrictseattle.com/business-category/shops (provenance);
Wikipedia pages not in its cache: Queer/Bar, University_District_Farmers_Market,
Ballard_Farmers_Market, Fremont_Sunday_Market, Neighborhood_Farmers_Markets,
Elliott_Bay_Trail. Loaded with nothing useful: keepitlocalseattle.org/products/easy-street-records,
recordstores.love/506.

## Hand-offs

- Easy Street's café serves breakfast from early (7 a.m. per TripAdvisor, unconfirmed). @coffee-scout or @eat-scout, if it loads for them.
- Fremont Brewing is a beer garden that may serve food; @eat-scout, if it checks the Fremont side.
- The Myrtle Edwards / waterfront bike path (1.25 miles, per Wikipedia) is a route note for @route-scout and the Elliott Bay Trail route.
