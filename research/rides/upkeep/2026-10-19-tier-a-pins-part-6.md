# Start pins, part 6 — Oct 19, 2026

Eight listed rides with `geo_precision: "city"`. Pin fix only: `checked_on` is each record's current `verified_on`, so the freshness clock does not move. Batch: `research/rides/upkeep/2026-10-19-tier-a-pins-part-6.json` (2 entries, dry run passes, not applied).

## Pinned (2)

- `mcallen-tx-bicycle-world-tnt-ride` — The shop's group-rides page: "All rides meet in the Mcallen Shop parking lot" (TNT: Tue & Thu, wheels down 6:30 pm, 22 & 33 miles), and the page's own store listing gives the McAllen shop as 2025 Nolana St, McAllen, TX 78501. Source: https://www.bicycleworldrgv.com/articles/group-rides-pg625.htm. Nominatim: 26.24008, -98.23610 — "Bicycle World, 2025, West Nolana Avenue, McAllen, Hidalgo County, Texas, 78504" (the shop's own page says 78501; the record keeps the shop's words). Outcome: changed (pin only), checked_on 2026-09-15. No dated signal on the page beyond a 2026 copyright line, so not a re-check.
- `fort-collins-co-gravel-people` — The host's FAQ: "Typically, we meet at 6pm at the upper lot at Odell Brewing. Once a month or so we move the ride to different start points for variety. We also start at 5:30 pm for a few weeks at the begining and end of the season." Source: https://www.gravelfoco.com/faqs. Nominatim: 40.58948, -105.06322 — "Odell Brewing Company, 800, East Lincoln Avenue, Buckingham, Fort Collins, Larimer County, Colorado, 80524". Outcome: changed (pin only, `start_location` now names the usual start and says it moves about once a month), checked_on 2026-09-18. For the next re-check: the same FAQ says the Tuesday rides run April to early or mid October, with weekend rides and no set day through fall and winter, and the site footer now reads "Tuesday – 5:30pm" (the shoulder-season time); by Oct 19 the Tuesday series is probably on its seasonal break. Nothing on the site is dated, and the routes live in the Strava club (https://www.strava.com/clubs/FCGP, login).

## No stated start (6) — no batch entry

- `sedona-az-wednesday-evening-mtb-ride` — VVCC's MTB page: "we meet in West Sedona … watch for an event each Monday that specifies the time and meetup location." The meetup moves weekly and is posted in the Sedona MTB Facebook group (login). The VVCC Meetup group (https://www.meetup.com/vvcc-mtb-ride/events/) lists only Friday rides (Oct 16 – Jan 1, 2027), not this one. Source: https://www.vvcc.us/MTB-Rides. A person with Facebook could read the Monday post in facebook.com/groups/sedonamtb.
- `new-orleans-la-nola-social-ride-thursday` — Facebook-only host; the page is a login wall raw and WebFetch was blocked (https://www.facebook.com/NolaSocialRide/). Nothing readable states a start. A person with Facebook could read the weekly Thursday event post.
- `philadelphia-pa-rar-philadelphia-group-rides` — The chapter page (https://radicaladventureriders.com/chapters/philadelphia) has no ride schedule and no start; it says rides are posted on IG @rar.philadelphia. Irregular rides from varying starts, so no single pin. The Strava club (https://www.strava.com/clubs/2313401) needs a login.
- `tacoma-wa-tacoma-tuesday-night-ride` — Experience Tacoma: "Tuesday Night Ride Club leaves from a different local bar every Tuesday at 6:30 pm" (https://experiencetacoma.com/ride-on-tacoma-bicycles/); Ride Together Pierce says only "gathers on Tuesday nights to cycle around Tacoma". The start changes weekly; stays unpinned. The weekly bar is posted on @tacomatnr / facebook.com/TacomaTNR (login).
- `chicago-il-southside-critical-mass` — The only host channel is the Facebook page (https://www.facebook.com/SSCritMass): login wall raw, WebFetch blocked. The Nichols Park, 55th & Kimbark start the record carries comes from Half Acre Cycling's directory (https://chicagogrouprides.com/, "Updated on 1/10/2025"), a third party, so not pinned under the host's-own-words rule. Lead for a person with Facebook: if the page states Nichols Park, Nominatim puts the park at 41.79703, -87.59418 ("Nichols Park, 1355, Hyde Park, Chicago, 60615"); the 55th & Kimbark corner is its north-east edge. Not applied.
- `washington-dc-dc-bike-party` — No fixed start. TouchGrass DC (the watch page) says "Check social media for start location"; the host's own site (http://dcbikeparty.com/, reached over HTTP only — the HTTPS certificate is self-signed) says "The route and end points will rotate every month" and its newest post is from 2017 (the "May 2026" archive link 404s). The monthly start is announced on @dcbikeparty / facebook.com/DCBikeParty (login). Stays unpinned, as the brief says for a start that changes monthly. For the next re-check: the host site is stale; the proof of life has to come from Instagram.

## Blocked URLs

- https://www.facebook.com/NolaSocialRide/ (WebFetch permission not answered)
- https://www.facebook.com/SSCritMass (WebFetch permission not answered)

## Nominatim calls (4, at least 1.5 s apart)

- "2025 Nolana St, McAllen, TX 78501, USA" → no result; "Bicycle World, McAllen, TX" → 26.24008, -98.23610 (used; the two Nolana Ave variants return the same node)
- "Odell Brewing, Fort Collins, CO, USA" → 40.58948, -105.06322 (used)
- "Nichols Park, Chicago, IL, USA" → 41.79703, -87.59418 (report only, not applied)
