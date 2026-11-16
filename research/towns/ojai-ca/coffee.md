# ojai-ca · coffee-scout · 2026-11-15

Three cafés: two downtown (Zone 1), one in Meiners Oaks (Zone 3). Each was
fetched on its own site, plus at least one live listing. No ride in
`cfc-site/rides/rides.json` starts in Ojai, and no club or shop page fetched
names a café as a meet, so every `ride_out` is false. No bike parking, pump
or hose was confirmed anywhere; none of the three sites says a word about
bikes. No `routes.md` existed yet for this town, so no pick is tied to a
named route. The brief's lead, Beacon Coffee, is not a pick: its own site
now lists one café, in Ventura, and no Ojai location (see Rejected).
No distances are given: I had addresses, not coordinates, and didn't compute
any from the brief's centre. No downtown point turned up on any page.
26 web calls (5 searches, 21 fetches; 2 fetches blocked by the allowlist,
1 by robots.txt).

## Findings

```json
[
  {
    "name": "Ojai Coffee Roasters",
    "url": "https://ojaicoffeeroasters.com/",
    "address": "337 E. Ojai Ave., Ojai, CA 93023",
    "note": "Downtown, on Ojai Avenue. Opens at 6 every day, Saturday and Sunday included, so it's the one that's open before a 7:00 roll-out. The kitchen runs 9 to 2, so before that it's coffee, not breakfast. Its site says nothing about bike parking or outdoor tables.",
    "hours_hint": "6 a.m. daily; closes 5 p.m. Monday to Thursday, 6 p.m. Friday to Sunday; kitchen 9 to 2",
    "ride_out": false
  },
  {
    "name": "Coffee Connection",
    "url": "https://www.coffeeconnectionojai.com/",
    "address": "311 East El Roblar Drive, Ojai, CA 93023",
    "note": "In Meiners Oaks, on the west side of the valley toward Highway 150 and the lake. Opens at 6 on Saturday and is done by 1, so it's a morning stop. Sunday is in doubt: the shop's own page says 6 to 1, two listings say closed. Outdoor seating per one listing, not the shop's own page; nothing stated about bike parking.",
    "hours_hint": "6 a.m. to 1 p.m. Saturday; weekdays from 5 or 6 a.m. (sources differ); Sunday unconfirmed — call first",
    "ride_out": false
  },
  {
    "name": "Three Birds",
    "url": "https://www.threebirdsojai.com/",
    "address": "205 N Signal St, Ojai, CA 93023",
    "note": "Downtown, a block or so off Ojai Avenue on Signal Street. Opens at 7 and stays open until 4, so it's the one for after the ride. Reviewers on two listings describe a large outdoor seating area; the café's own site doesn't mention it, and nothing says bike parking.",
    "hours_hint": "7 a.m. to 4 p.m. daily",
    "ride_out": false
  }
]
```

## Why these

- **Ojai Coffee Roasters** — the early one, and the only pick with a 2026-dated site of its own that prints the hours: "Mon – Thu 6am – 5pm; Fri – Sun 6am – 6pm", kitchen daily 9 to 2 (ojaicoffeeroasters.com/pages/about-contact, footer © 2026). joe.coffee shows the same hours. For the Center Ride Out reader: open at 6 on Saturday April 24, and open at 6 on Sunday before the 7:00 roll. Family-owned since 1995, per its site.
- **Coffee Connection** — the west-end pick and the other 6 a.m. Saturday opener. Its own "our shops" page says Monday to Friday 5 to 5, Saturday and Sunday 6 to 1, but that site's footer is © 2021. joe.coffee, pos.do, a June 2022 Ojai Festival piece and a Sept 26, 2026 blog all say 6 to 1; joe.coffee and pos.do say closed Sunday. Saturday 6 to 1 is the one thing every source agrees on, so that's what the hint leads with. Farmer and the Cook is on the same street (339 W. El Roblar per the 2022 Ojai Festival piece) if @eat-scout wants a pair.
- **Three Birds** — the post-ride one. "Open Everyday 7am - 4pm" on its own site; joe.coffee and the Sept 2026 blog agree. Outdoor seating comes from reviews on joe.coffee and MapQuest and from the blog ("outdoor patio"), not from the café. It's at the address the 2022 Ojai Festival piece gave for Love Social Café, so that name is retired.

## Rejected

- **Beacon Coffee, Ojai (211 W. Ojai Ave.)** — the brief's lead. The June 2022 Ojai Festival piece lists it. But beaconcoffee.com (home, Visit Us, Where to Find Beacon; footer © 2026) lists a single café, at 5777 Olivas Park Drive in Ventura, and never mentions Ojai. It's missing from the Sept 2026 blog and the restaurantji Ojai coffee list too. Treat the Ojai café as gone unless someone confirms otherwise. The Ventura café is Zone 6 and opens at 7; no reason for a rider in Ojai to make that trip.
- **Java & Joe (323 E Matilija St #105)** — joe.coffee says 6 to 5 daily; the 2022 piece said 7 to 5. No site of its own could be fetched (javajoeojai.com never came up in search, so the allowlist blocked it). One listing isn't two signals. Good backup if confirmed: downtown, possibly a second 6 a.m. opener.
- **The Dutchess (457 E. Ojai Ave.)** — 7 a.m. per the 2022 piece and the 2026 blog (7 to 2, then 5 to 9). A bakery and restaurant more than a café; own site not fetched. Lead for @eat-scout.
- **Rory's Other Place (133 E Ojai Ave per restaurantji)** — 7:30 to 3:30 per the 2026 blog, small patio. Later than Three Birds and not fetched on its own site. Lead for @eat-scout.
- **Highly Likely Ojai** — opens at 8 per the 2026 blog. Too late to matter here.
- **Farmer and the Cook (339 W. El Roblar Dr., Meiners Oaks)** — its site blocks fetching (robots.txt). Opens at 8 per the 2022 piece. A market and café; lead for @eat-scout.
- **Café Boku, Pinyon, Sage Café, Westridge Midtown Market** — all from the 2022 piece only, all 7 or later, none fetched. Not re-checked.
- **Starbucks and McDonald's on N Ventura Ave** — chains.
- **Airbnb place pages, frankiapp, voyagela, travelbabbo, familyvacationcritic, zola** — search noise; not read.

## Couldn't confirm

- **Coffee Connection on Sunday, and its weekday open.** Own page: Monday to Friday 5 a.m. to 5 p.m., Saturday and Sunday 6 to 1 (footer © 2021, so possibly stale). joe.coffee and pos.do: Monday to Saturday 6 to 1, closed Sunday. Phone on the shop's page: 805.646.7821. Where to look: the Google listing, the shop's Instagram or Facebook. The editor should keep "call first" until one of them settles it.
- **Coffee Connection's patio.** pos.do lists outdoor seating and the 2022 piece mentions orange patio umbrellas. The shop's own pages don't say.
- **Three Birds' outdoor seating and what it is.** Reviews and a blog say patio; the site says only hours, address, a menu link and "We'll be listing our books and retail items soon." MapQuest's newest review is Nov 2, 2025, more than six months back; the Sept 2026 blog and the live joe.coffee listing are the recent signals.
- **Bike parking, a pump, a hose, room for a group** — at all three. Nothing on any fetched page. The brief's fact 4 (room for a group) is null for every pick.
- **Any café a ride meets at.** None found, because no Ojai ride was found. If @community-scout turns up a shop ride (The Mob Shop, Bicycles of Ojai) that starts or ends at a café, the `ride_out` flag and a `ride_slug` want a second look.
- **A stop on the Ojai Valley Trail corridor (Zone 2: Mira Monte, Oak View, Casitas Springs).** Not searched; budget went to confirming the three. Open slot for the next run, once `routes.md` names the trail's access points.
- **Beacon's Ojai café closing.** Inferred from its absence on Beacon's own 2026 site. No page says "closed."
- **Java & Joe's hours and open status.** One listing. Phone per joe.coffee and the 2022 piece: (805) 646-3138.
- **Distances from the brief's centre.** Not computed for any pick.
- Phone numbers on joe.coffee for Ojai Coffee Roasters, Coffee Connection and Three Birds carry non-local area codes and don't match the shops' own pages. Don't use them.

## Sources

- https://ojaicoffeeroasters.com/pages/about-contact
- https://joe.coffee/locations/ca/ojai/ojai-coffee-roasters-ojai-b91183db-731c-4ed0-9b71-fbd5305b358c/
- https://pos.do/en/ojai/restaurant/ojai-coffee-roasting-co
- https://www.coffeeconnectionojai.com/our-shops
- https://www.coffeeconnectionojai.com/
- https://joe.coffee/locations/ca/ojai/coffee-connection-ojai-f2dd6891-625c-4862-b883-d4aaeb20637b/
- https://pos.do/en/ojai/restaurant/coffee-connection
- https://www.threebirdsojai.com/
- https://joe.coffee/locations/ca/ojai/three-birds-ojai-6547574d-01f9-4495-b813-ed78f7248c68/
- https://www.mapquest.com/us/california/three-birds-649723952
- https://beaconcoffee.com/
- https://beaconcoffee.com/pages/visit-us
- https://beaconcoffee.com/pages/where-to-find-beacon
- https://joe.coffee/locations/ca/ojai/java-and-joe-ojai-abf707eb-fa47-4f59-93c9-a5ea84aa3ca6/
- https://www.ojaifestival.org/caffeine-scene/ (June 2022; leads and old hours only)
- https://girlonazebra.com/best-cafes-coffee-shops-in-ojai/ (Sept 26, 2026; leads and an open signal)
- https://www.restaurantji.com/ca/ojai/coffee-shops/ (names and addresses only)
- Not loaded: https://www.farmer-and-the-cook.com/ (robots.txt), https://www.beaconcoffee.com/ and https://threebirdsojai.com/ without www (allowlist; the other hostnames loaded)
