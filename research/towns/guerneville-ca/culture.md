# guerneville-ca — culture

Town id: `guerneville-ca` · Agent: @culture-scout · Date: 2026-11-16

First build. Six picks. Read this before using them: **this session's fetch
tool blocked four of the businesses' own sites** (queersteer.com,
booksletters.com, russianriverartgallery.com, russianriverfarmersmarket.com;
johnsonsbeach.com's home page too, though three of its inner pages loaded).
For those four, every fact below comes from the Russian River Chamber's
listing (russianriver.com) or Sonoma County Tourism's listing
(sonomacounty.com), both fetched today. The `url` in each record is the
address those listings give for the business. @town-verifier should open the
four sites before the build. Nothing here is `queer-owned`: no business was
read saying so in its own words (see "Couldn't confirm").

## 1. Findings

```json
[
  {
    "name": "Russian River Books & Letters",
    "kind": "bookstore",
    "url": "http://booksletters.com/",
    "address": "14045 Armstrong Woods Rd, Guerneville, CA 95446",
    "note": "The town's bookstore. Fiction, memoir, kids' books, Spanish-language and LGBTQ+ shelves, plus readings and a book club. Opens at 10 every day but Tuesday, when it's closed; shuts at 5, or 7 on Fridays and Saturdays through the end of 2026 (chamber listing, Oct 2026). A post-ride stop, not a pre-ride one."
  },
  {
    "name": "Rainbow Cattle Company",
    "kind": "bar",
    "url": "http://www.queersteer.com",
    "address": "16220 Main St, Guerneville, CA 95446",
    "note": "A saloon on Main Street, open since 1979 and started for gay visitors to the river. Locals call it the Rainbow or the Bow. Tuesday is Give-Back Tuesday, a potluck fundraiser for local charities. Hours aren't on either listing we read, so call (707) 869-0206."
  },
  {
    "name": "Russian River Art Gallery",
    "kind": "gallery",
    "url": "http://www.russianriverartgallery.com",
    "address": "16357 Main St, Guerneville, CA 95446",
    "note": "A co-operative gallery of Sonoma County artists on Main Street: paintings, photography, ceramics, jewelry, cards. Twenty minutes, not two hours. No hours or price on the chamber listing, so call (707) 869-9099 before you walk over."
  },
  {
    "name": "Guerneville Certified Farmers Market",
    "kind": "market",
    "url": "https://www.russianriverfarmersmarket.com/",
    "address": "Fourth and Church Streets, Guerneville, CA 95446",
    "note": "Thursdays, 3 to 7 pm, June through August only, behind Hubert's Hall downtown. Produce, baked goods and food made to order, with outdoor seating. Not running in May or the rest of the year."
  },
  {
    "name": "Johnson's Beach",
    "kind": "other",
    "url": "https://www.johnsonsbeach.com/",
    "address": "16215 First St, Guerneville, CA 95446",
    "note": "The river beach in the middle of town. Canoes, kayaks, tubes, chairs and umbrellas to rent from 10 am (back by 5), and a snack shack from 11 to 5 with beer and wine until 6. Parking is $10 a car for day visitors (read Nov 2026); no pets, no outside alcohol. It's seasonal, so check the dates before you count on a swim."
  },
  {
    "name": "Armstrong Redwoods State Natural Reserve",
    "kind": "other",
    "url": "https://www.parks.ca.gov/?page_id=450",
    "address": "17000 Armstrong Woods Road, Guerneville, CA 95446",
    "note": "Old redwoods north of town, open 8 am to an hour after sunset. The Pioneer Nature Trail is about 1.5 miles round trip and mostly flat; the Parson Jones Tree, over 310 feet, is a tenth of a mile from the entrance. $10 a vehicle (Nov 2026). Bikes stay on the main paved road and one fire road."
  }
]
```

## 2. Why these

- **Russian River Books & Letters** — the one bookstore in town, open into the evening on Friday and Saturday, which is when a rider is in town.
- **Rainbow Cattle Company** — the bar with the longest record on Main Street (1979), and the Tuesday fundraiser says who drinks there: locals.
- **Russian River Art Gallery** — the only gallery with a current chamber listing and a phone; a short stop on the same block as everything else.
- **Guerneville Certified Farmers Market** — the town's market, with the day and hours on two listings. For the summer visitor, not the May rider; the note says so.
- **Johnson's Beach** — the swim. A rider with a day off the bike wants the river more than a shop.
- **Armstrong Redwoods** — the walk. Flat, short, shaded, and the State Parks page gives hours, fee and the bike rule in writing.

Spread: bookstore, bar, gallery, market, two `other`. No record store exists to list (see Rejected).

## 3. Rejected

- **A record store** — none found. Two searches and the chamber and tourism listings turned up no record shop in Guerneville. Don't re-check without a new lead.
- **Twice Told Books** — closed its shop, per the Bohemian (June 2021).
- **Blue Door Gallery** (16359 Main St) — tourism listing only, no hours, no date, three artists. Next door to the pick; one gallery is enough.
- **Oli Gallery** (16215 Main St #1) — named once, in a 2021 Bohemian piece. Nothing newer fetched.
- **Out of the Past / Seconds First** (16365 Main St, vintage) — same 2021 piece only. No current page fetched.
- **Studio Blomster, Center for Sacred Studies, Mark Lifvendahl studio** — from an undated Press Democrat roundup (no later than 2015 by its own text). Too old to list.
- **Equality Vines tasting room** — the chamber URL returned an empty directory template; the only description fetched is the 2021 Bohemian piece. A tasting room is also closer to @eat-scout's ground than mine.
- **Guerneville Bank Club** (16290 Main St: pie, ice cream, the historical society's display) — 2021 source only. Food, so a lead for @eat-scout.
- **Russian River Historical Society** — its site's page that loaded is a book list; no museum hours or address on it. Not a museum pick on that evidence.
- **Curtain Call Theatre** — a chamber listing exists; not fetched, no season read. Left out.

## 4. Couldn't confirm

- **Four own sites not read** (queersteer.com, booksletters.com, russianriverartgallery.com, russianriverfarmersmarket.com): blocked by this session's fetch tool, not dead as far as I know. Addresses and phones for those four are from the chamber and tourism listings, which is one step short of the rule ("the business's own page or its Google listing"). Verifier: open each.
- **Rainbow Cattle Company hours.** Neither listing gives them. The Bohemian said "opens at 2 p.m." in June 2021; too old to print. Also: the tourism listing's text is old ("34 years" from 1979 dates it to about 2013), so "Give-Back Tuesday" needs a current look on the bar's own site or social.
- **Russian River Art Gallery hours.** The only hours found (10 to 6 daily, closed Tuesdays) are from the undated Press Democrat roundup. Null in the note.
- **Bookstore hours after Jan 1, 2027.** The 7 pm Friday and Saturday close is "up until the new year". May 2027 hours unknown.
- **Farmers market 2027 dates and whether 2026 ran as listed.** Neither listing carries a year. The chamber listing was modified Nov 3, 2026.
- **Johnson's Beach season, and it matters for Cycle to Zero.** Its own pages disagree: "The Area" says it opens Memorial Day and closes October 1; the FAQ lists weekends only May 17 to June 1, daily June 7 to Aug 17, weekends Aug 23 to Sept 28, with no year (those weekdays fit 2025). Sat, May 22, 2027 falls before Memorial Day (May 31, 2027). Whether rentals and the snack shack run that day is unknown; no 2027 dates are posted. Beach entry price on foot: not stated (only the $10 parking). Rental prices: behind a booking system, not read. Johnson's Beach is also one of the two named Cycle to Zero camps; the record describes it as a place on an ordinary day and says nothing about the event. Address: its own pages say "16215 and 16217 First Street".
- **Armstrong Redwoods on foot or by bike.** The State Parks page lists the fee per vehicle and doesn't say what a walker or a rider pays. Alerts on that page (last checked there 11/1/2026): East Ridge Connector Trail from the Volunteer Office parking area closed; Austin Creek camping closed until further notice after the Walbridge Fire; no equestrian trails. @route-scout and @logistics-scout will want the bike line: main paved road and the fire road off the Colonel Armstrong lot only.
- **Jerry Knight's Historic River Theater** (16135 Main St) — wanted as the `venue`. Tourism listing gives address and (707) 869-8022; the last dated show I could read was May 9, 2026 (Ronstadt Revolution, posted on rivertheaterradio.com), just over six months back, and that site's events page is empty today. Not confirmed open under the six-month rule. Editor: check its Facebook page or call.
- **The R3 Hotel's Main Bar** (16390 4th St) — its own site calls the place an "LGBTQIA+ Hotel, Bar, Restaurant, Entertainment Venue" and says "the Main Bar is the center of activity for the property". Bar hours, the age rule and whether someone not staying there can use the bar or pool: not stated on its site. Sonoma County Tourism's page says the daytime pool area is 21+ (the tourism office's words). Would be a second `bar` once those are answered. @stay-scout likely has it as a room.
- **`queer-owned`: none assigned.** Sonoma County Tourism's "Local LGBTQ+ Owned Businesses" page calls The R3 Hotel "Gay-owned and -run" and the bookstore's owner a "gay Guerneville resident". Those are the tourism office's words, not the businesses'. The R3's own site says nothing on ownership; the bookstore's chamber listing names the owner, Michael, and says nothing more. If the editor reads either business saying it on its own site or bio, the kind can change; until then `bookstore` and nothing.
- **The weekends the brief asked about** (Russian River Pride, Women's Weekend, Lazy Bear, Polar Bear): no 2027 date read on any organizer's page. lazybearweek.org redirects to lazybearfund.org, which the fetch tool blocked. Search results showed 2026 listings only (unfetched, so not facts). All null; don't name dates.
- **Downtown point for distances:** nothing fetched gives one. The brief's centre stands. No distances are stated in the notes.

Hand-offs:
- @coffee-scout — the 2021 Bohemian piece puts Coffee Bazaar at 14045 Armstrong Woods Rd, the bookstore's address. Lead only.
- @eat-scout — Guerneville Bank Club (pie, ice cream), The R3's restaurant (its site: "Baked on the River", winter hours Thursday to Monday 9 am to 3 pm, dinner Thursday to Sunday 5 to 9 pm), Equality Vines.
- @stay-scout — Johnson's Beach has cabins and tent sites (tourism listing: 35 units, 1920s cabins); The R3 Hotel, 23 rooms, daytime pool area 21+ per the tourism office.

## 5. Sources

Fetched 2026-11-16 unless noted.

- https://russianriver.com/business/russian-river-books-and-letters/ (address, phone, hours, what it stocks; modified 2026-10-29)
- https://www.sonomacounty.com/shopping/russian-river-books-letters (address, phone, site)
- https://www.sonomacounty.com/articles/local-lgbtq-owned-businesses-support-sonoma-county/ (leads; the tourism office's ownership wording; bookstore opened Dec 2021)
- https://russianriver.com/venue/rainbow-cattle-company/ (address, phone, 1979, founded for gay visitors; modified 2026-11-16)
- https://www.sonomacounty.com/entertainment/rainbow-cattle-company/ (1979, "The Rainbow" and "The Bow", Give-Back Tuesday)
- https://russianriver.com/business/russian-river-art-gallery-collective (address, phone, co-operative; modified 2026-11-16)
- https://www.pressdemocrat.com/article/news/a-roundup-of-west-county-art-galleries-to-surprise-amaze/ (old gallery hours and other galleries; undated, leads only)
- https://www.sonomacounty.com/arts-culture/blue-door-gallery/ (rejected)
- https://russianriver.com/business/guerneville-certified-farmers-market/ (Thursdays, June through August, 4th and Church; modified 2026-11-03)
- https://www.sonomacounty.com/farms-farmers-markets/the-guerneville-certified-farmers-market/ (3 to 7 pm, behind Hubert's Hall)
- https://www.johnsonsbeach.com/the-area (address, season line, snack bar, rental list)
- https://www.johnsonsbeach.com/faq (parking $10, hours, season dates with no year, no pets, no outside alcohol)
- https://www.johnsonsbeach.com/beach-rentals (booking widget only; no prices)
- https://www.sonomacounty.com/profiles/johnsons-beach/ (phone 707-869-2022, no pets, cabins and tent sites)
- https://www.parks.ca.gov/?page_id=450 (hours, fee, address, trails, bike and dog rules, alerts last checked 11/1/2026)
- https://www.sonomacounty.com/profiles/jerry-knights-river-theater (address, phone, history)
- https://www.rivertheaterradio.com/news/ronstadt-revolution-live-river-theater-friday-night-050926 (last dated show read: May 9, 2026)
- https://www.rivertheaterradio.com/events (no events listed)
- https://russianriver.com/business/r3-hotel (address, phone, self-description; modified 2026-10-25)
- https://ther3hotel.com (own words on what it is; nothing on ownership; restaurant hours)
- https://bohemian.com/?p=412348 (June 2021; leads and the Twice Told Books closure)
- https://russianriverhistory.org/?p=1461 (book list only)
- https://web.russianriver.com/Wineries/Equality-Vines-39 (empty template; nothing usable)

Blocked by the fetch tool, not read: https://www.queersteer.com/ · https://booksletters.com/ · https://www.russianriverartgallery.com · https://www.russianriverfarmersmarket.com/ · https://johnsonsbeach.com/ (home page) · https://www.lazybearfund.org/
