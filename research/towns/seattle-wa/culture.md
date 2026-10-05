# seattle-wa · culture-scout · 2026-10-04

A refresh with search back on. Seven picks in six kinds, each read on the
place's own page: a museum (Burke), a bar (the Wildrose — open, with Pride
dates for June 2026 on its own site), a beer garden (Fremont Brewing), a
bookstore (Elliott Bay), a queer-owned bookstore (Charlie's — "trans-owned,"
in its own words on its Bookshop.org storefront), a free sculpture park with
bike racks (Olympic Sculpture Park) and the swim on the Burke-Gilman
(Matthews Beach). They sit in Zone 1 (the trail), Zone 4 (the waterfront) and
Zone 5 (the U District, Capitol Hill, Fremont). Nothing on the Eastside.

**Easy Street Records is not in Findings.** Both of its own pages
(`/Location`, `/Cafe`) are blocked by robots.txt and Yelp is too, so the
record store is under Couldn't confirm with everything the verifier needs. If
the editor accepts TripAdvisor plus Wikipedia as two signals, the record is
drafted there, ready to paste.

Two addresses come from a page that isn't the business's own and are flagged
in Couldn't confirm: Elliott Bay's (its site needs JavaScript; TeenTix, a
partner listing, gives the address and hours) and Charlie's (same problem;
the Pacific Northwest Booksellers Association and SGN give the address).
Matthews Beach has `address: null` — Seattle Parks' own page loaded but the
extract held only the one line. No bike parking confirmed anywhere except
the sculpture park.

Calls: 8 searches, 26 fetches (15 loaded with content, 11 refused, blocked
or empty).

## Findings

```json
[
  {
    "name": "Burke Museum",
    "kind": "museum",
    "url": "https://www.burkemuseum.org/hours-admissions",
    "address": "4303 Memorial Way NE, Seattle, WA 98195",
    "note": "The University of Washington's natural history and culture museum, on the north edge of campus a few blocks from the STP start lot. Tuesday to Sunday 10 to 5 (last entry 4:30), closed Monday, open to 8 and free on the first Thursday of the month. General admission $24, students $16 (Oct 2026). The two hours the afternoon before a 5 a.m. roll-out."
  },
  {
    "name": "The Wildrose",
    "kind": "bar",
    "url": "https://www.thewildrosebar.com/",
    "address": "1021 E Pike St, Seattle, WA 98122",
    "note": "E Pike at 11th, on Capitol Hill. Calls itself Seattle's only lesbian bar and the oldest in the country, open since 1984. Tuesday 5 to 10, Wednesday 5 to 11, Thursday 5 to midnight, Friday and Saturday 5 to 2, Sunday 4 to 9, closed Monday (Oct 2026). Runs its own Pride weekend at the end of June."
  },
  {
    "name": "Fremont Brewing Urban Beer Garden",
    "kind": "bar",
    "url": "https://www.fremontbrewing.com/fremont-urban-beer-garden",
    "address": "1050 N 34th St, Seattle, WA 98103",
    "note": "The brewery's beer garden on N 34th St in Fremont, a block up from the Burke-Gilman along the ship canal. Open 11 to 9 every day (Oct 2026). No kitchen: free pretzels, sandwiches to buy, a burger truck 1 to 8 Wednesday to Sunday, and they tell you to order in from the neighborhood. Kids and dogs welcome. The post-ride stop on the trail side of town."
  },
  {
    "name": "Elliott Bay Book Company",
    "kind": "bookstore",
    "url": "https://www.elliottbaybook.com/",
    "address": "1521 10th Ave, Seattle, WA 98122",
    "note": "Capitol Hill's big independent: about 150,000 titles on cedar shelves over several levels, and author events most nights. Open late — 10 to 10 Monday to Thursday, 10 to 11 Friday and Saturday, 10 to 9 Sunday (TeenTix listing, Oct 2026). The bookstore for a rider sleeping on the Hill."
  },
  {
    "name": "Charlie's Queer Books",
    "kind": "queer-owned",
    "url": "https://www.charliesqueerbooks.com/",
    "address": "465 N 36th St, Seattle, WA 98103",
    "note": "A bookstore in Fremont, two blocks from the Burke-Gilman, that sells only books by LGBTQ+ authors or with LGBTQ+ stories, with reading nooks upstairs. Trans-owned, in its own words on its Bookshop.org storefront. Open Wednesday to Sunday; check the site for the day's hours."
  },
  {
    "name": "Olympic Sculpture Park",
    "kind": "other",
    "url": "https://www.seattleartmuseum.org/visit/olympic-sculpture-park",
    "address": "2901 Western Ave, Seattle, WA 98121",
    "note": "The Seattle Art Museum's free sculpture park at the north end of the downtown waterfront, where the Elliott Bay Trail sets off north along the Sound. Open every day from half an hour before sunrise to half an hour after sunset; the PACCAR Pavilion 9 to 4 (Oct 2026). Calder's Eagle and Serra's Wake are here. Bike racks at the garage and by the pavilion; walk the bike inside the park."
  },
  {
    "name": "Matthews Beach Park",
    "kind": "other",
    "url": "https://www.seattle.gov/parks/parks/matthews-beach-park",
    "address": null,
    "note": "Seattle Parks' largest freshwater swimming beach, on Lake Washington in the north end, with the Burke-Gilman running along its west edge. Lifeguards in summer only — check the Parks page for this year's dates before you count on a swim. The stop on a hot day on the trail."
  }
]
```

## Why these

- **Burke Museum**: on the STP start's own campus, with hours and a price from its own page. The free first Thursday is a line a rider on a budget wants.
- **The Wildrose**: the Capitol Hill bar, and the one that had to be checked — its site carries June 2026 Pride dates and a December "Wildrose Day," so it's open past the February 2025 mark the brief worried about. Its own words for what it is; no ownership line anywhere on the site, so `bar`.
- **Fremont Brewing Urban Beer Garden**: the beer garden in the neighborhood the trail runs through; hours, food and the kids-and-dogs rule from its own page.
- **Elliott Bay Book Company**: open to 10 or 11 most nights, the one evening bookstore, where the brief puts visitors to sleep.
- **Charlie's Queer Books**: the Fremont bookstore on the trail side. The `queer-owned` kind rests on the store's own storefront copy — "Charlie's is a trans-owned bookstore in Seattle that sells queer books of all genres." Its word is "trans-owned," so the note uses it. If the editor reads the kind's rule narrowly (the business must say "queer-owned"), flip it to `bookstore` and keep the sentence.
- **Olympic Sculpture Park**: free, open dawn to dusk, bike racks in writing, and it's where the waterfront trail starts.
- **Matthews Beach Park**: the lake swim on the Burke-Gilman. Thin on its own page, so the note sends people to it for dates rather than guessing.

## Rejected

- **Sonic Boom Records, Ballard** — not fetched this run. The record-store slot is Easy Street's if it clears; Sonic Boom (2209 NW Market St per Wikipedia, Oct 3) is the fallback on the Burke-Gilman side.
- **Neptune Theatre, U District** — not fetched; no show listings read. The `venue` lead if one is wanted for the STP crowd.
- **Pike Place Market** — a tourist draw with no fixed market day; left out again.
- **Blue Moon Tavern, U District** — nothing from the bar itself. Lead only.
- **The Mountaineering Club** (the Graduate's rooftop bar) — handed over by @stay-scout; not fetched, and a hotel bar isn't the pick for a bar slot the Wildrose and Fremont Brewing already fill.
- **Expedia/Travelocity, Yelp, GayCities, misterb&b, EverOut listings** — leads only, or blocked (EverOut's Wildrose page 403s; Yelp's pages are robots-blocked). None is a source of record.
- **Seattle Times on Charlie's** — the fetch came back empty (paywall or blocker). SGN and NW Book Lovers covered it.

## Couldn't confirm

- **Easy Street Records**, the record store pick. Own pages `easystreetonline.com/Location` and `/Cafe` are blocked by robots.txt; Yelp and Apple Maps are too. What's fetched: Wikipedia (Oct 3: in the West Seattle Junction since 1988, café, stage, 2,000+ in-store shows) and TripAdvisor (4559 California Ave SW #200, Seattle, WA 98116, (206) 938-3279; café 7 a.m. to 3 p.m. daily; last review July 12, 2025, so outside six months). Store hours disagree across listings (8–9 or 9–9 Mon–Sat; 8–7 or 9–7 Sun; Oct 3 run). Yelp's search title says "Updated September 2026," a signal I couldn't open. Draft record, if the editor accepts two listings as the signals: `{ "name": "Easy Street Records", "kind": "record-store", "url": "https://easystreetonline.com/Location", "address": "4559 California Ave SW, Seattle, WA 98116", "note": "In the West Seattle Junction since 1988: new and used vinyl, a café that does breakfast from 7, and a small stage with more than 2,000 in-store shows behind it. Hours vary by listing — check the site. The record store on the West Seattle side, near Alki." }`. Where to look: a phone call, or a browser with JavaScript.
- **Elliott Bay Book Company — address and hours** come from TeenTix's venue listing, not the store (elliottbaybook.com loads only a "You need to enable JavaScript" shell; `/hours-and-directions` 404s). Wikipedia and the Yelp search title agree on 1521 10th Ave. The verifier should load the store's site in a browser.
- **Charlie's Queer Books — address and hours**. `charliesqueerbooks.com` is live but JavaScript-only. 465 N 36th St, Seattle, WA 98103 comes from the Pacific Northwest Booksellers Association (Oct 2023), SGN (Jan 2024) and Wikipedia. Hours disagree: PNBA "Wednesday–Saturday 11–7, Sunday 11–5"; TripAdvisor "Sunday 11–6"; SGN "Wednesdays through Sundays." The note says only Wed–Sun. The ownership line is on `bookshop.org/shop/charlies`, the store's own storefront: "Charlie's is a trans-owned bookstore in Seattle." Instagram `@charliesqueerbooks` wasn't fetched; its bio may say more.
- **Matthews Beach Park — address, lifeguard dates**. Seattle Parks' page loaded but the extract carried only "Seattle's largest freshwater bathing beach"; the swimming-beaches page said "9 summer lifeguarded beaches on Green Lake and Lake Washington" and no dates. TripAdvisor (last review July 2022) gives 5100 NE 93rd St, Seattle, WA 98115 and "lifeguards on duty June 20 – September 7" with no year. Where to look: the Parks page in a browser, or `seattle.gov/parks/recreation/swimming-beaches` for this summer's dates.
- **Burke Museum ZIP** — the museum's page gives "4303 Memorial Way NE, Seattle, WA" with no ZIP; 98195 is the UW campus ZIP and should be checked against the Google listing.
- **The Wildrose — ownership**. Wikipedia (Oct 3) named Martha Manning and Shelley Brothers as owners as of 2023 and said Brothers died in February 2025. The bar's site says nothing about who owns it, so no line goes on the page.
- **U District Farmers Market, Ballard Farmers Market, Fremont Sunday Market** — not fetched this run; the `market` kind is still empty. The U District market would be the STP-start pick if its day and hours load.
- **Third Place Books, Lake Forest Park** — on the Burke-Gilman per Wikipedia (Oct 3); not fetched. A strong trail-side bookstore pick for a future run.
- **Queer/Bar, Capitol Hill** — not fetched. Lead only, including for a `queer-owned` line in its own words.
- **Bike parking** — confirmed only at the Olympic Sculpture Park. Nobody else said.

## Sources

- https://www.burkemuseum.org/hours-admissions
- https://www.burkemuseum.org/
- https://www.thewildrosebar.com/
- https://www.fremontbrewing.com/fremont-urban-beer-garden
- https://www.seattleartmuseum.org/visit/olympic-sculpture-park
- https://www.seattle.gov/parks/parks/matthews-beach-park
- https://www.seattle.gov/parks/recreation/swimming-beaches
- https://seattle.gov/parks/recreation/outdoor-water-recreation/swimming-beaches?id=307
- https://www.teentix.org/venues/the-elliot-bay-book-company/
- https://www.elliottbaybook.com/ (JavaScript shell only)
- https://www.charliesqueerbooks.com/ (JavaScript shell only)
- https://bookshop.org/shop/charlies
- https://www.sgn.org/story/330854
- https://nwbooklovers.org/2023/10/27/welcome-to-mams-and-charlies/
- https://www.tripadvisor.com/Attraction_Review-g60878-d26942276-Reviews-Charlie_s_Queer_Books-Seattle_Washington.html
- https://www.tripadvisor.com/Restaurant_Review-g60878-d2290579-Reviews-Easy_Street_Records_Cafe-Seattle_Washington.html
- https://www.tripadvisor.com/Attraction_Review-g60878-d141330-Reviews-Matthews_Beach_Park-Seattle_Washington.html
- Oct 3 run, still relied on for background: https://en.wikipedia.org/wiki/Easy_Street_Records · https://en.wikipedia.org/wiki/The_Wildrose_(bar) · https://en.wikipedia.org/wiki/Charlie%27s_Queer_Books · https://en.wikipedia.org/wiki/Sonic_Boom_Records

Refused, blocked or empty (not sources): easystreetonline.com/Location (robots) · easystreetonline.com/Cafe (robots) · yelp.com/biz/easy-street-records-and-cafe-seattle-4 (robots) · maps.apple.com Easy Street (robots) · everout.com/seattle/locations/wildrose/l20121/ (403) · seattletimes.com Charlie's article (empty) · elliottbaybook.com/hours-and-directions (404) · fremontbrewing.com/contact-us (robots) · glb.seattle.gov swimming-beaches (DNS).

## Hand-offs

- **@eat-scout**: Fremont Brewing has no kitchen — a burger truck Wed–Sun 1–8 and order-in from the neighborhood; Easy Street's café does breakfast from 7 (TripAdvisor, unconfirmed on its own page).
- **@route-scout**: the Elliott Bay Trail starts at the Olympic Sculpture Park (bike racks there; bikes walked through the park); Matthews Beach is the swim stop on the Burke-Gilman.
- **@community-scout**: the Wildrose runs its own Pride weekend in late June, if a queer events line is wanted.
