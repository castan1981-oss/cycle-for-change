# san-francisco-ca · culture-scout · 2026-10-03

Five places, five kinds: the record store, the bookstore, the museum, the
theater and the market. Each one was fetched on its own site (the market on
the Ferry Building's own pages). They sit in Zone 3 (the Upper Haight, by
Golden Gate Park) and Zone 6 (North Beach, the Castro, the Embarcadero).
Distances are from City Hall (37.7793, -122.4193), using coordinates from
Wikipedia, and only where I had coordinates.

What's missing: the bar, anything `queer-owned`, and the swim. That's down to
the tools, not the town. All 8 searches are spent. WebFetch only loaded URLs a
search had returned, plus Wikipedia. A site that was only named or linked on a
fetched page got refused: thecastro.com's old domain, twinpeakstavern.com,
elriosf.com, fabulosabooks.com, foodwise.org, Yelp. So El Rio and Twin Peaks
Tavern (the two bars) go to Couldn't confirm, with everything I could read. The
only places I saw called queer-owned or lesbian-owned were in third-party
listings, never in the business's own words. So nothing here is `queer-owned`.
No bike parking was confirmed anywhere. Totals: 8 searches and 40 fetch
attempts. 27 loaded; 13 were refused, blocked or redirected out of reach.

## Findings

```json
[
  {
    "name": "Amoeba Music San Francisco",
    "kind": "record-store",
    "url": "https://www.amoeba.com/our-stores/",
    "address": "1855 Haight St. San Francisco, CA 94117",
    "note": "Zone 3, the Upper Haight near Golden Gate Park, inside the old Park Bowl bowling alley. New and used vinyl and CDs, a DVD room it calls the biggest in the Bay Area, and free in-store shows. Open 11 to 7 every day."
  },
  {
    "name": "City Lights Booksellers & Publishers",
    "kind": "bookstore",
    "url": "https://citylights.com/",
    "address": "261 Columbus Avenue, San Francisco, CA 94133",
    "note": "Zone 6, North Beach, about a mile and a half from City Hall. The bookstore and press the poet Lawrence Ferlinghetti founded in 1953, still selling and publishing. Open 10 a.m. to 10 p.m. every day, so it's the stop after dinner."
  },
  {
    "name": "GLBT Historical Society Museum",
    "kind": "museum",
    "url": "https://www.glbthistory.org/museum-about-visitor-info",
    "address": "4127 18th Street, San Francisco, CA 94114",
    "note": "Zone 6, the Castro, which is where the {ride:san-francisco-ca-different-spokes-jersey-ride|Different Spokes Saturday ride} leaves from. One long-term show, Queer Past Becomes Present, plus rotating ones; the audioguide runs about 35 minutes, so give it an hour. Open 11 to 5 Tuesday to Sunday, closed 1 to 1:30 and all day Monday; $10, $6 discounted, free the first Wednesday of the month (Oct 2026)."
  },
  {
    "name": "Castro Theatre",
    "kind": "venue",
    "url": "https://thecastro.com/",
    "address": "429 Castro St, San Francisco, CA 94114",
    "note": "Zone 6, the Castro, about a mile and a half from City Hall. The neighborhood's theater reopened February 6, 2026 after a $41 million renovation. Another Planet runs it, mostly concerts, with films and comedy too. Buy tickets online; the box office opens 30 minutes before doors on show nights."
  },
  {
    "name": "Ferry Plaza Farmers Market",
    "kind": "market",
    "url": "https://www.ferrybuildingmarketplace.com/farmers-market/",
    "address": "One Ferry Building, San Francisco, California 94111",
    "note": "Zone 6, the Ferry Building on the Embarcadero, about 2 miles from City Hall. Foodwise runs it year-round, rain or shine: Tuesday and Thursday 10 to 2, Saturday 8 to 2, with about 70 farmers and 50 food makers. Saturday is the big one, out front and on the back plaza over the bay; no bike parking stated."
  }
]
```

## Why these

- **Amoeba Music San Francisco**: the record store, open every day till 7, on the Golden Gate Park side of town where the Zone 3 riding is.
- **City Lights**: open till 10 every night in North Beach, the neighborhood closest to the bridge where visitors sleep. You can still walk in after dinner.
- **GLBT Historical Society Museum**: an hour in the Castro, where the Different Spokes ride starts. The price and the free day are on its own page.
- **Castro Theatre**: back open since February 2026, with shows listed through November. The evening plan for anyone staying in the Castro.
- **Ferry Plaza Farmers Market**: Saturday 8 to 2 on the waterfront, so it works after a morning ride. Days, hours and size are from the building's own pages.

## Rejected

- **Green Apple Books** (506 Clement St., and On the Park at 1231 9th Ave. at Lincoln Way). Confirmed on its own page: open 10 to 9 daily at both. Clement St. checks totes and backpacks at the counter. Left out because it would be a second bookstore, and City Lights stays open later. It's the swap if the editor wants the Golden Gate Park side: On the Park is right at the park's edge.
- **Green Apple at SFO** (Harvey Milk Terminal 1, arrivals level, 5 a.m. to 10:30 p.m., per the same page). An airport shop, not an afternoon. Noted only because riders fly in there.
- **The other record stores** on recordbuilds.com (Oct 18, 2025): Stranded (1055 Valencia), Groove Merchant (687 Haight), Rooky Ricardo's (429 Haight), Originals Vinyl (701 Fillmore), Thrillhouse (3422 Mission), Tunnel Records (3614A Taraval). None fetched; Amoeba took the slot. Leads for a later run.
- **7x7's bookstore list** (Aug 2020, modified Sept 2025): Omnivore Books on Food, Book Passage (Ferry Building), Borderlands, the Booksmith, Adobe Books. Leads only, none fetched.
- **Afar's gay-bar list** (2015, modified April 2024): Toad Hall, Hi Tops, The Stud, Oasis, the SF Eagle, Lone Star, Hole in the Wall, Powerhouse, Aunt Charlie's. A 2024 listicle isn't a source of record. Its line that Hole in the Wall is "run by gay bikers" is Afar's, not the bar's. None fetched.
- **Foodwise's own market page**: cuesa.org now redirects to foodwise.org, which was refused. The Ferry Building's two market pages agree on days and hours and stand in.

## Couldn't confirm

- **El Rio, 3158 Mission St. (the Mission)**. This is the bar I wanted: a big back patio with old lemon trees, open since 1978, owned by Dawn Huston since 1997 (Wikipedia). CBS (Oct 2019) calls it "a nightlife staple for the city's LGBTQ and Latinx communities". The Mato events listing shows parties at El Rio Oct 3 to 10, 2026, so it looks open. Hours (Wed–Thu 5 to midnight, Fri 4 to 2, Sat 3 to 2, Sun 3 to 9, closed Mon–Tue) come only from Outxout's undated listing. Outxout says "queer-owned" and GayCities says "lesbian-owned". Both are third parties, so it isn't `queer-owned` on that basis. elriosf.com and Instagram @elriosf were never reachable. Editor: get the address and hours from elriosf.com or its Google listing. Read its own site or bio for an ownership line. If the bar writes "queer-owned" itself, list it as `queer-owned` and say where. If not, list it as `bar`, "the Mission's queer bar with the big back patio", only if a source says so.
- **Twin Peaks Tavern, 401 Castro St.** The Castro's corner bar. Wikipedia: opened 1935. Mary Ellen Cunha and Peggy Forster took it over in 1972 and uncovered the windows, "believed to be the first gay bar which revealed its customers to the outside". City landmark No. 264 (2013). Sold in 2003 to two former bartenders, Jeffrey Green and George Roehm. twinpeakstavern.com and Yelp were refused, so I have no hours and no address from its own page. Editor: its site or Google listing. It's the obvious bar after the Different Spokes ride.
- **A `queer-owned` pick.** Not found in any business's own words. Leads: **Fabulosa Books** on Castro St. (named by Outxout, June 2026, and the Castro Merchants blog; fabulosabooks.com refused). **Queer Arts Featured**: the Castro Merchants blog says it sells "art and goods made entirely by Queer Bay Area Artists" and puts it at 575 Castro, but Outxout says 575 Castro is Harvey Milk's old camera shop, now an HRC store. That conflict is unresolved, and neither source is the business.
- **The Castro Theatre's status.** It's open: its site lists shows Oct 3 to Nov 30, 2026, and Wikipedia gives the Feb 6, 2026 reopening. But its home page still has a "RETURNING 2026!" banner and "renovation … underway" text, and so does the box-office page. Worth a look at refresh; the stale text is the theater's, not ours. The SF Chronicle's guide to the reopened theater was blocked by robots.txt.
- **GLBT Historical Society Museum, a future move.** Wikipedia says the Society announced a long-term plan for a new, bigger museum in 2016. Nothing on the visitor page says it has moved. Check at refresh.
- **A post-ride bar in Marin.** Gestalt Haus in Fairfax is a lead only: not searched, not fetched, and nothing about it is confirmed. Split Rock Tap and Wheel (the Marin Cyclists' start) is a taproom and bike shop, so it belongs to @shop-scout or @coffee-scout.
- **The swim.** Aquatic Park, through the Dolphin Club or South End Rowing Club day-use. Not searched, not fetched. Lead for the `other` slot.
- **Amoeba, the second signal.** Discogs' listing agrees on 1855 Haight and 11 to 7 daily but was last modified Nov 2022. The store's own page is the source.
- **Bike parking.** Nothing on any fetched page.
- **The Castro Merchants blog URL** has a word from the banned list in its slug. I read it for leads only; no finding relies on it. Keep it out of the guide's `sources`.

## Sources

Record store
- https://www.amoeba.com/our-stores/
- https://en.wikipedia.org/wiki/Amoeba_Music
- https://www.discogs.com/record-stores/store/amoebasf/
- https://recordbuilds.com/san-francisco-record-stores/

Bookstores
- https://citylights.com/
- https://en.wikipedia.org/wiki/City_Lights_Bookstore
- https://greenapplebooks.com/locations-directions-hours
- https://www.7x7.com/independent-bookstores-san-francisco-2647088372.html

Museum
- https://www.glbthistory.org/museum-about-visitor-info
- https://en.wikipedia.org/wiki/GLBT_Historical_Society

Theater
- https://thecastro.com/
- https://thecastro.com/venue-info/tickets-box-office/
- https://en.wikipedia.org/wiki/Castro_Theatre

Market
- https://www.ferrybuildingmarketplace.com/farmers-market/
- https://www.ferrybuildingmarketplace.com/shops/the-ferry-plaza-farmers-market/
- https://en.wikipedia.org/wiki/San_Francisco_Ferry_Building

Bars and leads (Couldn't confirm)
- https://en.wikipedia.org/wiki/El_Rio_(gay_bar)
- https://www.cbsnews.com/sanfrancisco/news/el-rio-popular-lgbtq-bar-in-san-francisco-to-be-preserved-through-city-hall-program/
- https://ma.to/venue/elriosf
- https://outxout.com/venue/elriosanfrancisco
- https://sanfrancisco.gaycities.com/bars/24-el-rio
- https://en.wikipedia.org/wiki/Twin_Peaks_Tavern
- https://outxout.com/blog/guide-to-the-castro
- https://www.afar.com/magazine/the-11-best-gay-bars-in-san-francisco
- https://castromerchants.com/blog/8-unmissable-experiences-in-san-franciscos-vibrant-castro-district (leads only; banned word in the slug)

Refused or failed (not sources; listed so the next run doesn't spend calls on them): castrotheatre.com, twinpeakstavern.com, fabulosabooks.com, yelp.com/biz/twin-peaks-tavern-san-francisco, cuesa.org/markets/ferry-plaza-farmers-market-saturday and foodwise.org/markets/ferry-plaza-farmers-market (no provenance: never returned by a search); cuesa.org/markets/ferry-plaza-farmers-market-tuesday (302 to foodwise.org, which was refused); sfchronicle.com Castro Theatre guide and maps.apple.com City Lights listing (robots.txt); andeverythingnice.substack.com queer-owned guide (429). en.wikipedia.org/wiki/Ferry_Building is a disambiguation page with no coordinates. amoeba.com/our-stores/ and citylights.com were refused before any search ran and loaded once a search had returned them.

## Hand-offs

- **El Rio**, if the editor confirms it, might also host a bike swap or club night. Send the URL to @community-scout if so.
- **Book Passage at the Ferry Building** (from the 7x7 list) and **Green Apple at SFO** are small notes for whoever writes the Ferry Building and airport lines. @logistics-scout can use the SFO one if it fits.
- **Split Rock Tap and Wheel** (Fairfax): taproom plus bike shop, and the Marin Cyclists' start. Goes to @shop-scout.
