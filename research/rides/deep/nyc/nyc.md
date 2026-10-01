# Deep sweep: New York City, Long Island, Westchester and North Jersey (area `nyc`)

Scout run Oct 1, 2026. Files: `nyc.json` (17 new rides), `upkeep.json` (16 re-check entries).
`node tools/merge-ride-research.js --dry --today 2026-10-01` accepts all 17 (US-NY 9, US-NJ 8).
`node tools/rides-apply.js upkeep.json --dry --today 2026-10-01 --no-geocode` passes with no new errors.

## Summary

New rides: 17, below the target of about 30. Strava club event pages and Meetup were thin here. Most of
the proof came from club calendars, one big club's public app, and Meetup events pages. I kept to
"fewer, proven, beats more".

| City | New rides |
|---|---|
| New York (Manhattan) | 3 |
| White Plains | 2 |
| Hoboken | 1 |
| Weehawken | 1 |
| Centereach | 1 |
| Glen Rock | 1 |
| Ridgewood | 1 |
| Montclair | 1 |
| Morristown | 1 |
| Hastings-on-Hudson | 1 |
| Parsippany | 1 |
| Jefferson | 1 |
| Old Bethpage | 1 |
| Farmingville | 1 |

Confidence: 13 high, 4 medium. Hosts at the cap of 3 on the site after this: New York Cycle Club
(1 listed + 2 new), Montclair Bikery (2 listed + 1 new).

Re-checks (27 listed rides): 16 entries written. 7 changed, 9 confirmed, 0 seasonal-break, 0 paused,
0 ended. 11 couldn't be re-checked and have no entry.

## Why these

1. **Bicycle Sundays on the Bronx River Parkway** (White Plains, Westchester County Parks): car-free parkway Sundays, May 3 to Oct 4, 2026; the county page was edited after the Sept 27 weather cancel. One date left, so it drops out of "next ride" after Oct 4. Recheck in April.
2. **Bike Hoboken Community Ride** (Hoboken): monthly Sunday, meet 10:45, roll 11:00; next Oct 25, per the county's events calendar. Family and beginner.
3. **Bike North Bergen / WeeBiken Community Ride** (Weehawken): monthly Sunday 10:30 at Hamilton Park; next Oct 11.
4. **Thursday Night Training Ride** (White Plains, Westchester Cycle Club): Thursdays from the Waller Ave lot; the club's schedule steps the start earlier as daylight goes (4:45, 4:30, 4:15, 4:00 pm in October), so it carries `start_times`.
5. **Women's Wednesday, Central Park** (New York, NYCC): WTFNB-only, every Wednesday 6:50 am; next Oct 7. The best queer/women/trans find of the sweep.
6. **Weekday Dawn Laps in Central Park** (New York, NYCC): Mon to Thu pace groups from about 5:40 to 6:50 am, public app lists Oct 1 and Oct 5 to 8.
7. **Suffolk Bicycle Riders Association club rides** (Centereach, SBRA): Thu to Sun, led rides with class and distance; the new-rider page says non-members are welcome. Beginner friendly.
8. **BTCNJ club rides** (Glen Rock): 28 dated rides Oct 1 to 17 on the public schedule. Members-only wording on some rides; visitor notes say to check each ride.
9. **Crack o' Dawn Friday Frolic** (Ridgewood, BTCNJ): Fridays 6:00 am from the Ridgewood Starbucks, wheels down 6:05. Medium: only Oct 2 is posted.
10. **Montclair Cyclists Sunday Ride** (Montclair, Montclair Bikery): Sundays 8:00 am from 148 Valley Rd. Medium: it is on the shop's calendar, last edited Nov 20, 2025, and not on the rides page.
11. **Morris Area Freewheelers club rides** (Morristown, MAF): Thu to Sun, many rides a day, each with its own start and pace; a guest can sign up for one ride.
12. **Westchester Social Cyclists** (Hastings-on-Hudson): Tuesdays 8:15 am, some Saturdays; Meetup lists Oct 2, 6, 10 and 13. Medium: ride details are members-only.
13. **Saturday Morning C Ride** (Parsippany, Cycle Craft): 8:00 am from the shop on Meetup; next Oct 3.
14. **Saturday Mountain Bike Ride at Mahlon Dickerson** (Jefferson, Cycle Craft): 9:00 am every Saturday through January 2027, intermediate terrain.
15. **Bethpage Introductory Ride** (Old Bethpage, CLIMB): first Sunday of the month, 8:45 am; next Oct 4. Beginner.
16. **CLIMB Group Ride & BBQ** (Farmingville, CLIMB): usually the last Sunday, 10:00 am; Sept 27 was the latest. Medium: nothing posted for October.
17. **NYC-ADV Saturday Adventure Rides** (New York, NYC Adventure Cycling Club): Saturdays 8:00 am, Season 11 runs May 16 to Oct 10; mixed surface. Medium: irregular, ends in the fall.

## Where rides are posted here

- **NYCC's public app (https://app.nycc.org/rides).** Loads without a login; date, start time, pace and distance for every ride, detail pages at /rides/<id>. The best single source in the area. The upkeep entry for the old NYCC record now points its refresh here.
- **Meetup events pages** (`/<group>/events/`). The page embeds the dated event list (title, time, venue name) even when the ICS feed returns 403 to scripts. Details are often members-only. Used for Cycle Craft, CLIMB, Westchester Social Cyclists and NYC-ADV.
- **ClubExpress calendars** (5BBC, HBC, SIBA's calendar renders empty to a robot). Dated, one page per ride.
- **Club calendars that are public and dated:** Westchester Cycle Club `/Schedule`; SBRA `/upcoming_rides`; BTCNJ `/pages/rideSchedulePublic`; MAF `/ride-schedule/`; Massapequa Park Bicycle Club `/ride-calendar/`.
- **Squarespace/Google calendars:** Montclair Bikery's public Google calendar (ICS), Time's Up's calendar, Hudson County Complete Streets' events page (also has a Ride With GPS club).
- **Strava:** thin. The searches returned stale or wrong-region events (see Rejected). The private clubs (BGDBNYC, many queer groups) don't show events to a logged-out reader.
- **Instagram, Linktree, Substack:** where the queer and women's rides live (Queer Joyride, NightCAP, Dawn Patrol, WE Bike NYC). A robot can't read them; a local rider has to.

## Re-checked

Changed (7):
- bike-jc-light-up-ride: Bike JC's page now says meet 6:30, roll 7:00 pm (was 7:30); schedule runs to Fri Oct 9 and nothing after.
- montclair-bikery-friday-ladies-ride: still Fridays 9:00 am per the shop calendar (updated Sept 26); added pace and requirements.
- montclair-bikery-saturday-shop-ride: still Saturdays 8:00 am; added pace and requirements.
- massapequa-park-bicycle-club-rides: typical start is 9:00 am in cooler months, 8:30 in warmer; each ride lists its own start and place; guests get one free ride.
- huntington-bicycle-club-weekend-rides: weekend start is 8:30 am in October (9:00 Dec to Apr, 8:30 May and Oct, 8:00 Jun to Sep, nothing for November).
- 5bbc-weekend-day-rides: refresh now points at the ClubExpress calendar; dated rides Oct 10, 11, 13 and 17; two Oct 1 to 2 rides canceled.
- nycc-weekend-club-rides: still on; refresh swapped to the public app; Sat Oct 3 rides at 6:30 to 8:20 am.

Confirmed (9):
- thursday-night-social-bikeride: Time's Up calendar lists Oct 1 and Oct 8, 7:00 pm, Columbus Circle.
- non-binary-bike-club-wednesday: nb.bike says last ride Sept 30; Wednesdays 7:00 pm, Fort Greene Park.
- achilles-citi-bike-adaptive-cycling: page edited Jun 11, 2026; Central Park Tuesdays 5:00 pm and Saturdays 8:00 am, May to early November.
- black-girls-do-bike-nyc-weekend-rides: weakest confirm. Rests on the Big Pink Ride fundraiser (Sun Oct 11, 9 am to noon, Eventbrite) on their Linktree. No Saturday beginner ride is posted for October.
- front-runners-sunday-bike-rides: page edited Jan 7, 2026 says spring through early fall; no dated rides on the calendar.
- intandem-central-park-tandem-rides: page edited May 14, 2026; weekly, year-round, weather permitting.
- outcycling-weekend-training-series: Spond series Saturdays Sept 19 to Nov 7; Oct 3, 10, 17 and 24 still to come.
- outcycling-weekly-park-laps: FAQ edited Mar 12, 2026 says weekly laps in Central and Prospect Park; no day or time published.
- queens-social-ride-sunday: home page edited Sept 4, 2026; every Sunday 9:00 am at the Unisphere, year-round above 25 F.

## Couldn't re-check (no entry written)

- new-york-ny-critical-mass-last-friday: times-up.org shows no current Critical Mass listing I could read.
- scarsdale-ny-dannys-cycles-sunday-road-ride: shop page shows no dated 2026 Sunday ride.
- white-plains-ny-wcc-usi-monday-night-ride: WCC's schedule page lists no Monday night ride for October.
- morristown-nj-martys-monday-womens-ride and martys-tuesday-evening-road-ride: shop's weekly-rides page carries no 2026 date I could read.
- brooklyn-ny-dawn-patrol-prospect-park: only a Substack post; nothing current.
- brooklyn-ny-east-brooklyn-bike-club-wednesday-ride and jackson-heights-ny-34th-ave-citi-bike-saturday-ride: Citi Bike's community page still shows the 2025 line-up; the hosts' own pages weren't found.
- brooklyn-ny-nightcap-monday-ride and brooklyn-ny-queer-joyride-tuesday: Linktree/Substack pages return nothing a robot can read (Linktree docs 410).
- staten-island-ny-siba-saturday-morning-ride: the ClubExpress calendar renders empty.

All 11 keep their old Checked date and age off the lists on schedule. A local rider should confirm the queer ones first.

## Rejected

- Lewis Morris Wednesday novice MTB ride (NJ Mountain Biking): season ends with the "End of season ride" Fri Oct 2, 2026. Seen Oct 1.
- weekdaycyclists.org: hijacked spam domain. Seen Oct 1.
- Major Taylor NY/NJ (majortaylornynj.com): only a Wayback recovery; defunct. Seen Oct 1.
- Bike NYC resources page: lists groups that no longer exist. Seen Oct 1.
- Stale Strava events: Prospect Park Laps (2017), Acme/Rapha (2024), GrNY (2023), Karma Racing (2019). Seen Oct 1.
- Dormant Meetup groups with no event in the last year. Seen Oct 1.
- Cycle Craft Wild Cat Wednesday: type unknown, not listed (see Couldn't confirm).
- Prospect Park Laps (Meetup/Strava page): events behind a login.

## Couldn't confirm

For a local rider to check by hand.

1. **Fast & Fabulous Cycling Club** (LGBT, free weekly rides). Host: Fast & Fabulous. Day, time, start: not seen. Where seen: lead only, the club's site fastandfab.org was blocked by this scout's proxy. URL: https://fastandfab.org. Most promising: a long-running queer club.
2. **Time's Up Prospect Park Moon & Magic Hour Ride.** Host: Time's Up!. Monthly Saturday, about 7:15 pm, from Grand Army Plaza, Brooklyn. Where seen: times-up.org calendar listing; no dated 2026 entry I could prove. URL: https://times-up.org/calendar/
3. **WE Bike NYC.** Host: WE Bike NYC. Social and training rides for women and gender-nonconforming riders. Day, time, start: not seen. Where seen: Eventbrite and Instagram only. Handle: @webikenyc.
4. **Queer Joyride** (Tuesday, Brooklyn) and **NightCAP** (Monday, Cyclists Against Patriarchy). Where seen: Linktree and Substack, no readable dated post. Handles: linktr.ee/qjrnyc; queeronthestreet.substack.com.
5. **Bergen Bike Bus** (Get Women Cycling, Bergen County NJ). Day, time, start: not seen. Lead from a directory.
6. **Bicycle Habitat women's rides.** Host: Bicycle Habitat. Where seen: shop pages, no dated 2026 ride.
7. **Rubber N' Road NYC.** Where seen: a directory only.
8. **Cycle Craft Wild Cat Wednesday.** Host: Cycle Craft. Wednesday evening, on the shop's Meetup; type and pace not shown.
9. **Marty's other rides** (a Saturday ride from Randolph, a Sunday ride from East Hanover/Morristown). Host: Marty's Reliable Cycle. Where seen: shop weekly-rides page, undated.
10. **Danny's Mohegan Lake rides.** Host: Danny's Cycles. Where seen: shop page, undated.
11. **Prospect Park Laps.** Events behind a login.
12. **Foldie Foodie Brommie Yummie** (folding-bike food ride). Lead only.
13. **Black Girls Do Bike NYC beginner Saturday ride.** Strava club is invite-only; only the Oct 11 fundraiser ride is public.

## Stats

- About 150 page fetches.
- 27 listed rides re-checked: 7 changed, 9 confirmed, 11 no entry.
- 17 new rides: 13 high, 4 medium. Tags: 4 queer/women/trans/nonbinary or beginner or family picks (NYCC Women's Wednesday, SBRA, Bike Hoboken, CLIMB intro); 0 BIPOC-led (not found on public pages).
- Hosts: NYCC 2, BTCNJ 2, Cycle Craft 2, CLIMB 2, 9 others 1 each. No host above 3 on the site; no city above 3.
- Merge dry run: accepted 17, rejected 0.

## Sources

Time's Up (times-up.org/calendar, /calendar/thursday-night-social-bikeride/); NYCC (app.nycc.org/rides, nycc.org/riding-with-nycc); Bike JC (bikejc.org/light-up-rides); Montclair Bikery (calendar-pg165, group-rides-pg207, public Google calendar ICS); Massapequa Park Bicycle Club (massparkbikeclub.org/ride-calendar/); nb.bike; Huntington Bicycle Club (hbcli.org ClubExpress pages 22 and 4001); Achilles (achillesinternational.org/citibike); BGDBNYC (linktr.ee/bgdbnyc, Eventbrite listing for Oct 11); 5BBC (5bbc.clubexpress.com calendar); Front Runners New York (frny.org/multisport, /calendar); InTandem (intandembike.org/join-us/ and /faqs/); OutCycling (outcycling.org/fall-training, /faq); Queens Social Ride (queenssocialride.org, /rides/); Westchester County Parks (parks.westchestercountyny.gov/bicycle-sundays); Hudson County Complete Streets (hudcostreets.org/events); Westchester Cycle Club (westchestercycleclub.org/Schedule); SBRA (sbraweb.org/upcoming_rides); BTCNJ (btcnj.com/pages/rideSchedulePublic); Morris Area Freewheelers (mafw.org/ride-schedule/); Meetup events pages for westchester-social-cycling, cycle-craft-nj-rides, climb-concerned-long-island-mountain-bicyclists, nyc-adventure-cycling-club; Danny's Cycles and Marty's Reliable Cycle shop pages; Strava search results (stale); Substack posts (legday, queeronthestreet).

## Editor notes

- Time's Up's Thursday page says "hosted by Social Cycling NYC".
- Montclair Bikery's rides page says April to October, but its calendar runs all year.
- Bike JC's schedule ends Oct 9; the homepage banner still shows the Aug 14 ride.
- Citi Bike program pages still show the 2025 line-up.
- Leader phone numbers and emails on the MPBC, WCC and MAF pages were left out.
- HBC publishes no November start.
- OutCycling Weekly Park Laps has no day or time on the site.
- BGDBNYC confirmation rests on a fundraiser ride.
- NYCC and BTCNJ guest policy is unclear; WCC's guest policy page was a sign-in page, so visitor_notes say so.
- Westchester Bicycle Sundays ends Oct 4; recheck in April.
- Hudson County Complete Streets also has a Ride With GPS club worth a look next sweep.
- Montclair Cyclists Sunday ride is calendar-only.
