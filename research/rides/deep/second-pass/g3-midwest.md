# Second pass, group g3-midwest

Areas: chicago, great-lakes, upper-midwest. Agent: Claude (second-pass scout). Date: 2026-10-02.
Input: `g3-midwest-leads.json` (68 leads). Output: `g3-midwest.json` (11 new records),
`g3-midwest-outcomes.json` (68 entries), this report.

## Summary

| | Count |
|---|---|
| Leads worked | 68 |
| proven | 9 (they became 11 new records: Specialized Chicago gives 2, Bluegrass Cycling Club gives 3) |
| gone | 1 |
| still-unproven | 58 |

New records by city: Chicago 2 (Specialized Fulton Market), Geneva IL 1 (Fox Valley Bicycle & Ski Club),
Lake Forest IL 1 (Velo Club Roubaix), Villa Park IL 1 (West Suburban Women's Cycling), Minneapolis 2
(All Bodies on Bikes, Buddy Systems), Akron 1, Lexington KY 2, Midway KY 1. Confidence: 5 high, 6 medium.

Two proven leads are not in the JSON on purpose:
- Fox Valley Saturday 7:00 am Bike Rack Ride (proven; the host already has 2 rides on the site, and the Monday novice ride took the third place).
- Elmhurst Bicycle Club: the lead was a one-date community ride, and the club's recurring rides were already merged on Oct 1.

Six more rides I proved were already on the site (see "Surprises"): Elmhurst Lisle Early Bird, Elmhurst
Monday/Thursday morning ride, Velo Club Roubaix Saturday, Fox Valley Sunday intermediate, NMMBA Cadillac
Pathway. I dropped them from the JSON.

## Why these

- **Specialized Chicago Sunday SMR.** A fast 7:15 am drop ride from the Fulton Market store, with fall dates posted on Strava through the Oct 25 season finale.
- **Specialized Chicago first-Sunday T-Shirt ride.** The shop's slower monthly ride, 7:30 am sharp, next Oct 4.
- **Fox Valley Monday Novice/Casual Slow Roll (Geneva).** An 8 to 10 mph, 11-mile trail ride for new riders. Scarce in the suburbs.
- **Velo Club Roubaix Sunday ride (Lake Forest).** Guests may ride three times; every ride is on a Ride with GPS calendar that has an ICS feed.
- **West Suburban Women's Cycling (Villa Park).** A 600-member women's Meetup with Sunday path rides and bakery stops. Start is members-only.
- **All Bodies on Bikes MPLS.** A size-inclusive monthly social ride, next Oct 5 from Angry Catfish. No-drop, 12 mph or slower.
- **Buddy Systems (Minneapolis).** A first-Monday neighbourhood ride and meetup at Gold Medal Park. Time is 6:30 pm on the calendar though the text says TBD.
- **Akron Bicycle Club Wednesday Morning Ride.** A 34-mile weekday ride at 15 to 17 mph that takes first-time guests; the start moves each week.
- **Bluegrass Cycling Club Masterson Mondays, Horse Park Tuesday, Midway Wednesday (Lexington area).** A full evening program at 5:30 pm with pace groups from 10 mph to 20+, no sign-up, on a calendar that loads.

## Where rides are posted here

**Strava club pages hold more than they show.** The club page loads without a login, but the event list
is hidden. The raw HTML carries the full text of the club's posts in a JSON blob (`"post":"..."` next
to `"date":"..."`), so a shop's "ride schedule look-ahead" post can be read with a plain `curl` and a
browser User-Agent (a bare UA gets a 403). Specialized Chicago posts its whole fall Sunday schedule that way. The post pages
themselves (`/clubs/<id>/posts/<id>`) are login-walled. The club event pages
(`group_events/<id>`) work only if you already have the URL, and search found one only from May.

**Ride with GPS club calendars (best machine-readable source).** For Velo Club Roubaix:
`https://ridewithgps.com/events.json?organization_id=12596` lists every event with start time and
meeting place, and `https://ridewithgps.com/clubs/12596-velo-club-roubaix-vcr/calendar.ics` is a feed.
The page `/clubs/<id>/events` itself loads empty.

**ClubExpress "Future" calendars** render for Fox Valley (club 401197), Elmhurst (695056), Akron (133645),
Bluegrass Cycling Club (740127, on bgcycling.net) and NMMBA (533979). URL pattern:
`/content.aspx?page_id=4001&club_id=<id>&action=cira&vm=Future&sif=0`. Each ride has an event page
(`page_id=4002&item_id=<n>` or `4091` on Akron) with the address and a leader's note. These need no feed:
the watcher can read the Future view.

**msp.bike (Twin Cities)** publishes a public Google Calendar, `https://calendar.google.com/calendar/ical/6a256e25e316cc67771b99bd499dfa57d2780d51f6eb5f9df1a9d84299a1b3c2%40group.calendar.google.com/public/basic.ics`
(about 760 events, with RRULEs and `UNTIL` dates, which is how I saw Handup's season end), plus a
`feed.rss` and a `/groups` directory that lists each group's next dates. Community-run, so it is a
secondary source, but its entries are copied from the hosts' posts and carry the host's Instagram link.

**Meetup** public group pages show the next three events with day and time, even for a private group.
The ICS feed returns "Invalid feed signature".

**Queen City Bike calendar (events.queencity.bike, Cincinnati)** has a `feed.xml` and JSON-LD per event.

**Directories and what they are worth.** chicagogrouprides.com (kept by Half Acre Cycling) has per-ride
"Updated on" dates, some 2026, and links to each host. milwaukeebikerides.com and dsmgrouprides.com are
undated tables. They name hosts but prove nothing about this fall.

**What does not load.** Instagram answers 429. Facebook groups are login-walled. okaycc.org, risingtidecycling.cc/group-rides,
bikeiowacity.com/event-calendar and events.rapha.cc (Cloudflare) return no usable text. Rapha's
`ramba.org` (Marquette) is a parked domain.

**Rhythm.** Evening rides move to 5:30 pm in October (Akron Monday, Turin Tue/Thu, Bluegrass, Cincinnati).
Many Midwest weekly rides end in the last week of October (Lexington calendar through Oct 28, Elmhurst through
Nov 5). The seasonal MN, WI and MI groups (Handup, Ski Hut, Smith's, Broken Spoke) finish by September.
Expect a gap from November to March.

**Visitor norms.** Fox Valley, Elmhurst and Velo Club Roubaix want an online waiver or registration first
(free for guests). Velo Club Roubaix allows three guest rides. Akron says "members and first-time guests".
Ann Arbor Velo Club guests need a signed waiver and the ride details are members-only.

## Rejected

- **Handup Thursday social rides (Minneapolis).** Gone for the season: the msp.bike calendar series ended Sept 18, 2026 and the last dirt ride "of the year" was Sept 24, 2026. Back in spring, probably May.
- **Smith's Bike Shop group-rides page (La Crosse).** The page was last modified Nov 5, 2024 (its JSON-LD `dateModified`), so its four leads (Wednesday Night World C-Team, EMAG, World Famous Donut Ride, Women's Wednesday MTB) are low. The shop's own calendar carries only TNWC.
- **Reed's Local Cycling Club.** The bar's October 2026 events calendar has no cycling ride, not even on the last Thursday.
- **Elmhurst Community Ride.** One dated event, Fri Oct 16.

## Couldn't confirm

The outcomes file holds all 58 with a note and a public contact. The ones a local rider can settle by hand fastest:

| Ride | Host | What is known | Where to look |
|---|---|---|---|
| Dykes on Bicycles group rides | Dykes on Bicycles (Chicago) | X says "Group rides most weekends"; July 2024 calendar posted on Instagram; last X post Oct 2024 | https://www.instagram.com/dykesonbicycles |
| Chicago United Bite Rides | Chicago United | First Wednesday 6:00 pm, start on Instagram (directory 8/5/2025). Supports BIPOC-owned restaurants; femme, trans, women and non-binary cyclists of colour | https://www.instagram.com/chicagounited.cc/ , info@chicagounitedcycling.org |
| WOMO | WOMO (trans women, cis women, gender-expansive) | Usually first Saturday, start on social | https://www.instagram.com/womo312/ |
| Rapha Chicago Sunday and Three Trails | Rapha Chicago | Strava members ask on Sept 17 whether next week's rides run; clubhouse closed in April | @rapha_chicago |
| Okay Cycle Club Donut Hunt and Sunday ride | Okay Cycle Club | Fri 7:00 am from the Chess Pavilion (directory 5/19/2026); Sunday 9:30 am from Heritage | https://www.instagram.com/okay_cycle_club/ |
| Chicago Muslim Cycling Club | Chicago Muslim Cycling Club | Saturday 10:00 am, Ohio Street Beach, casual hour | https://www.instagram.com/chi.mcc/ |
| Orland Park Cyclery Fri/Sat/Sun rides | Orland Park Cyclery | Page says start times TBD, see Facebook | info@orlandparkcyclery.com |
| Roundagon Cycling Club | Roundagon (Oak Park) | Weeknight, ~30 miles, 19-22 mph, no-drop; join via a member | https://www.strava.com/clubs/roundagoncycling |
| Biking with Baddies | Biking with Baddies (Minneapolis) | Women's monthly rides in 2026 on varying days; site expired | https://www.instagram.com/bikingwithbaddies/ |
| Babes on Bikes Detroit | Babes on Bikes Detroit | Weekly rotating ride for women and non-binary riders (BridgeDetroit 2023-24) | https://www.instagram.com/babesonbikesdetroit/ |
| Black Girls Do Bike Detroit | Black Girls Do Bike Detroit | Named in BridgeDetroit; no schedule | no public link found |
| We Ride Detroit, Biking Belle Isle | Facebook groups | Linked from detroitgreenways.org | https://www.facebook.com/groups/526395907712456 , https://www.facebook.com/groups/1419464634960671 |
| Milwaukee Slow Roses, Scrappy Hour, Two Tired, Tuesday Night Rides, Saddle Tramps, Ride MKE, Tu Th | Instagram or Strava | Nothing dated this season | links in the outcomes file |
| Des Moines TNWC, 515, UME, Zone 2, REI | dsmgrouprides.com | Undated community table | host Facebook pages; none readable |
| Indianapolis Gray Goat/Team Nebo, Westfield, CIBA, VQ Labs | risingtidecycling.cc | 2025 list | host Instagram pages |
| Cincinnati Neighborhood Ride | unnamed shop at 2009 Madison Rd | Calendar says every Monday in October, text says last Monday | https://events.queencity.bike/event/t3n4vt8nht24g18gddlab070to_20261005T220000Z |
| Glacial Hills Paddles and Pedals | NMMBA | Tuesday 6 pm per page, not on the October calendar | https://nmmba.net/content.aspx?page_id=22&club_id=533979&module_id=685190 |

## Events (side list)

- Red River Rally, Oct 3, 2026, Bluegrass Cycling Club, Kentucky's oldest group ride (57th) — https://bgcycling.net/content.aspx?page_id=4001&club_id=740127&action=cira&vm=Future&sif=0
- Twin Cities Bike Tour, Oct 10, 2026, 24 to 50 miles, Wabun Park, Minneapolis — msp.bike calendar
- Hackney's Ride to Eat (14th annual), Oct 10, 2026, ~50 miles, Elmhurst Bicycle Club — https://elmhurstbc.clubexpress.com/content.aspx?page_id=4001&club_id=695056&action=cira&vm=Future&sif=0
- Tour de Donuts (7th annual), Oct 3, 2026, Harter Middle School, Fox Valley Bicycle & Ski Club — https://www.fvbsc.org/content.aspx?page_id=4001&club_id=401197&action=cira&vm=Future&sif=0
- Old Fashioned Gravel, Oct 3, 2026, 20 to 100 miles, Hokah, MN — Elmhurst Bicycle Club calendar
- Filthy 50, Oct 10, 2026, Lanesboro, MN — Smith's Bike Shop calendar, https://smithsbikes.com/calendar/
- Fall Fondo, Oct 24, 2026, Dubuque area, fully supported — Rapha Chicago Strava club post
- Door County destination ride, Oct 2 to 4, 2026, Velo Club Roubaix — https://ridewithgps.com/clubs/12596-velo-club-roubaix-vcr/events
- Big BAM Katy Trail trip, Oct 11 to 17, 2026, Fox Valley Bicycle & Ski Club members — FVBSC calendar
- Think Spring Ride and Lunch, Apr 17, 2027, Akron Bicycle Club — https://www.akronbike.org/content.aspx?page_id=4001&club_id=133645&action=cira&vm=Future&sif=0

## Surprises

1. **`_existing.tsv` was stale.** The Oct 1 deep sweep merged Elmhurst Bicycle Club (2 rides), Velo Club Roubaix Saturday, Fox Valley (Tuesday trail, Sunday intermediate) and NMMBA Cadillac before this pass started, but the area tsv files predate it. I found six proven rides that were already in `rides.json` and dropped them. Dedupe against `rides.json`, not the tsv.
2. **Two listed rides have changed.** (a) `turin-tubular-tuesday-trot` says Tue 6:00 pm, but Turin Bicycle's Strava club says the Tuesday and Thursday rides moved to 5:30 pm from Sept 8 and 10, and the last official rides are Oct 6 and 8. Turin's own community page still says 6:00 pm. (b) `munroe-falls-oh-abc-monday-evening-ride` says Mon 6:00 pm, but the Akron Bicycle Club calendar says Oct 5 starts at 5:30 pm from the Barlow Road Bike-and-Hike trailhead, 331 Barlow Rd, Hudson, because of the earlier sunset. Neither is a re-check I was asked to apply; flagging for the upkeep run.
3. **Strava club HTML shows post bodies.** See the field guide. This is the best new trick: it gave the whole fall schedule for Specialized Chicago.
4. **The Specialized "SMR" fall time is not restated.** Times are from April (7:15 and 7:30 am). Sunrise is later now, so confirm the fall start.
5. **Rapha Chicago looks thin.** Members on Strava ask whether the clubhouse is closed and whether any Sunday ride runs. Treat as unproven.
6. **Web search ran out.** The session cap of 200 searches was already spent; I got about nine queries, so most Chicago, Detroit and Indiana hosts were not searched.
7. **Rides seen on the way that nobody asked about** (not added): msp.bike's groups page lists Bone Saw (rides the last Tuesday of every month all year), EZ Bike Club monthly community ride (Tue Oct 6, 6:30 pm), Fast Casual (Tue Oct 20, 6:15 pm), Grease Rag (FTW rides, Discord), Freewheel Minnetonka Monday gravel/MTB, Geno ATB's Sunday grocery ride (already listed). Turin has a Saturday 7:00 am no-drop Cowbell x Turin ride. The Queen City Bike calendar lists Tuesday Night Worlds, a Women, Trans, Femme, Non-Binary Open Shop, and bike buses. Milwaukee Recreation has free, registered, no-drop community rides (already on the site as MKE Rec).

## Stats

- Leads in: 68. Proven: 9 (11 new records, 5 high and 6 medium). Gone: 1. Still-unproven: 58.
- Fetches: about 140 pages and feeds; web searches: about 9 before the cap.
- Rides proved but already on the site: 6 (dropped from the JSON). One proved ride held back by the per-host cap.

## Sources

Fetched (all read on 2026-10-02):
- Specialized Chicago Strava club and group event: https://www.strava.com/clubs/1060518 , https://www.strava.com/clubs/1060518/group_events/1650834
- Rapha Chicago Strava club: https://www.strava.com/clubs/685524 ; RideWithGPS org events JSON for org 4933 (empty for 2026)
- Turin Bicycle Strava club and site: https://www.strava.com/clubs/turinchicago , https://www.turinbicycle.com/community , https://www.turinbicycle.com/events
- Roundagon Strava club: https://www.strava.com/clubs/roundagoncycling
- Fox Valley Bicycle & Ski Club: https://www.fvbsc.org/ (calendar, About Our Rides, event pages 2938307, 2938332, 2938357, 2938613); The Bike Rack: https://www.thebikerack.com/articles/hours-location-pg782.htm ; Geneva Parks: https://www.genevaparks.org/bestlife-fitness/stephen-d-persinger-recreation-center/
- Elmhurst Bicycle Club: https://elmhurstbc.clubexpress.com/ (calendar, items 2984825, 2965694)
- Velo Club Roubaix: https://www.veloclubroubaix.com/ (rider-info, meeting-locations), https://ridewithgps.com/clubs/12596-velo-club-roubaix-vcr/events , its `calendar.ics` and `events.json?organization_id=12596`
- Meetup: https://www.meetup.com/west-suburban-womens-cycling/
- Chicago directories: https://chicagogrouprides.com/ , https://www.chicagounitedcycling.org/ , https://reedslocal.com/events/ , https://www.orlandparkcyclery.com/about/group-rides-pg113.htm , https://okaycc.org/ , X page for @dykes_on_bikes
- msp.bike: https://msp.bike , https://msp.bike/groups , the Google Calendar ICS, https://bikingwithbaddies.com/events (expired)
- Milwaukee: https://milwaukeebikerides.com , Strava clubs 12855, Slow-Roses-CC, RideMKE
- La Crosse: https://smithsbikes.com/group-bike-rides/ , https://smithsbikes.com/calendar/
- Green Bay: https://www.brokenspokebikes.com/events/local-rides-pg206.htm ; Duluth: https://www.skihut.com/articles/local-rides-clubs-pg208.htm
- Des Moines: https://dsmgrouprides.com , https://www.bikeiowa.com/Event/16079/monday-night-no-drop-road-ride
- Detroit: https://detroitgreenways.org/events-calendar/ , https://www.bridgedetroit.com/group-bike-riding-in-detroit-how-it-began-and-how-to-join/
- Ann Arbor: https://www.annarborveloclub.org/weeklyrides
- Indianapolis: https://risingtidecycling.cc
- Akron: https://www.akronbike.org/ (calendar club_id 133645, items 3071543, 3075027, 3079860, 4091/3072797)
- Cincinnati: https://events.queencity.bike/ and event page for the Neighborhood Ride; https://www.cincinnaticycleclub.org calendar
- Lexington: https://bgcycling.net/ (calendar club_id 740127, items 3076762, 3075921, 2913961, New Cyclists page)
- Grand Rapids: https://www.villagebikeshop.com/events/ride-with-us-pg690.htm ; Marquette: https://www.quickstopbike.com/articles/local-rides-clubs-pg196.htm
- Traverse City / Cadillac: https://nmmba.net/ (calendar club_id 533979, group-rides page, item 3057370)
