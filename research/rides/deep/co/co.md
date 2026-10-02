# co: group-ride deep sweep, Colorado

- **Area id:** `co`
- **Agent:** Colorado group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026
- **Files:** `co.json` (17 new rides), `upkeep.json` (16 re-check entries), this report
- **Fetches:** about 140. The session's web-search cap was already used up, so I could not run the `site:strava.com group_events <city>` hunt the brief starts with. I worked from Meetup feeds, calendars and club and shop pages I could reach directly. Expect Strava club events to be the biggest gap in this file.

## Summary

**New rides: 17** (15 active, 2 on seasonal break). Target was about 25; I stopped at what I could prove.

By city: Colorado Springs 5 · Fort Collins 4 · Durango 2 · Longmont 2 · Arvada 1 · Golden 1 · Greenwood Village 1 · Littleton 1.
By confidence: high 10, medium 7. Medium means the schedule comes from a directory or secondary calendar (Your Group Ride, Pedal Durango, Bike Colorado Springs) or only one date is posted.
By type: road 11, gravel 1, MTB 2, social/road mix 3. No LGBTQ, women/trans/nonbinary or BIPOC ride made it in as a new record. The ones I found are already on the site (OUTspokin', Trek Broomfield women's ride, RAR Front Range, BMA Gurlz Ride) or have no proof for October (see Couldn't confirm).

**Re-check of the 21 rides already listed: 16 entries written.**

- confirmed 9 (Trek Broomfield, RAR Colorado Springs, Denver Cruiser Ride, OUTspokin', OMBA, SOR, Grand Junction CyclePaths, DCC Phil's Circuit, MMB Tuesday)
- changed 2 (Tour de Latte, The Wednesday Ride)
- seasonal-break 5 (BMA Gurlz Ride, BMA Knobby Wednesday, Wednesday Morning Velo, Golden Bike Cruise, SVCG Tuesday)
- couldn't re-check 5 (no entry written; listed below)

Seven Meetup or Google calendar feeds were promoted onto existing rides, so the weekly watch can read their dates itself.

**October is the month Colorado rides stop.** Five of the 21 listed rides went to seasonal break between Sept 29 and Oct 1, and Trek Broomfield's ends Oct 13. Several more end this month: OUTspokin's last ride is Oct 10, OMBA's last is Oct 28, The Wednesday Ride's is Oct 28. The site should expect a lot of seasonal-break flags this week.

## For the editor

- **Two times changed.** Tour de Latte moved to 10:00 am for the October to April off-season (was 9:00). The Wednesday Ride is 5:30 pm from the Lincoln Center, not 6:00 pm, per Bike Colorado Springs' calendar. Old Town Bike Shop's page still says 6 pm and "March 12 to October 29", which are last year's dates (Mar 12, 2026 was a Thursday).
- **BMA times.** The BMA page says in-season Gurlz Ride is Tuesdays at 6:00 pm and Knobby Wednesday is Wednesdays at 6:00 pm. The site has 5:00 and 5:30. Both are on seasonal break now, so I did not change them; fix the times when the season returns in April.
- **BMA still rides in October**, but as co-ed Nite Rides on changing weekdays (Thu Oct 1 at 6:00 pm, Mon Oct 5 at 6:00 pm, Thu Oct 8 at 5:00 pm, Tue Oct 13 at 6:00 pm, Wed Oct 21 at 6:00 pm, Thu Oct 29 at 6:00 pm). No fixed day, so I did not list it.
- **Weaker confirmations.** Denver Cruiser Ride and SOR are confirmed on weak evidence. The cruiser page says "Happy Thursday!! Meet at 7p" with a 2026 footer and no end date. SOR is a Your Group Ride directory page updated June 10. If you want a stricter bar, drop these two.
- **Dated series.** CSCC Tuesday Morning Gravel ends Oct 27; RMCC Thursday Night Climbing ends Oct 29; Tuesday Night Worlds ends at the fall time change (Nov 1); the Crappy Road Bikes series shows to Nov 3.
- **Durango start_times.** Church of the High Pines moves to 11:00 am on Nov 1 (host: winter start from the Home Depot lot). The record carries `start_times` for it. The start address in the record is the summer one, Bread; the winter start is a different place, so don't trust a geocode after Nov 1.
- **Varying starts.** Several records (BFA, SVCG Saturday, CSCC Tuesday gravel, MMB Thursday, Tuesday Night Worlds) have a different start each week. I left `start_location.address` null where the start changes, or gave the first listed start as an example in the name.
- **Personal phone numbers** appear on two Meetup pages. I left them out. The Incycle shop phone, (970) 658-9402, is in its record because it is the shop's public line on the listing.

## Why these

- **BFA Saturday Community Bike Ride (Arvada).** A free Saturday 10 am rec ride, no-drop, May to October, with a new route and start each week.
- **Crappy Road Bikes Group Ride (Greenwood Village).** Thursday 5:15 pm party-pace road ride on an all-paved route, old bikes welcome, food after.
- **After-Work Road Bike Ride (Littleton).** Tuesday 5:30 pm, 25 to 30 miles along the Platte River trail to Chatfield, beer after.
- **RMCC Thursday Night Climbing (Golden).** The Lookout Mountain Thursday climbing ride, drop-and-regroup, through Oct 29.
- **SVCG Saturday Ride (Longmont).** The St Vrain Chain Gang's road ride that carries on through winter after the Tuesday ride stops; groups by pace.
- **Tuesday Morning Road Ride, St. Vrain Cyclists (Longmont).** Weekday 8:30 am no-drop road ride from the Senior Center, year-round.
- **Tuesday Morning Gravel (Colorado Springs).** Intermediate no-drop gravel out to Calhan and Ramah, 25 to 40 miles, different start each week.
- **Wednesday Morning Ride (Colorado Springs).** 9 am no-drop road ride, 18 to 30 miles, from Legacy Loop Plaza.
- **Sunday Social Ride (Colorado Springs).** 8 to 12 mph, no-drop, 10 to 20 miles, 1 pm Sundays through December.
- **Buffalo Lodge Saturday Group Ride (Colorado Springs).** 10 am from the lodge, guided Blue/Black and Blue groups, first Saturdays to Glen Eyrie.
- **MMB Thursday Ride (Colorado Springs).** Thursday-evening singletrack from a different trailhead each week, tailgate after.
- **Tuesday Night Worlds (Durango).** The fast A ride, a hard B ride and a slower C ride, starting from changing spots, on Pedal Durango's calendar.
- **Church of the High Pines Sunday Ride (Durango).** Social no-drop road ride that gets spicy at the end; moves to 11 am in winter.
- **WOR, Wednesday Open Ride (Fort Collins).** B+ to A pace road ride from the FRCC lot, March to mid-October.
- **Incycle MTB Ride (Fort Collins).** Thursday 6:45 pm chill shop MTB ride from Soderberg Trailhead.
- **The Oval (Fort Collins, seasonal break).** The 80-mile race-pace winter classic, Saturdays November to April.
- **RioBase Mile Ride (Fort Collins, seasonal break).** The slow, chilly Sunday base ride, December to May.

## Where rides are posted here

- **Meetup groups with ICS feeds** (a robot can re-read these): `https://www.meetup.com/<group>/events/ical/`. This is where most Front Range rides live. Groups read: boulder-mountain-bikers, colorado-springs-cycling-club, monument-mountain-bikers, denver-cycling-club-dcc, st-vrain-chain-gang, longmont-on-bikes, long-mont-velo-bikeshop, rocky-mountain-cycling-club-rmcc, bikefriendlyarvada-community-bike-rides, denver-outdoor-fun, trek-broomfield-group-ride, gj-cyclepaths, hrcc-masters, front-range-mountain-bikers, denver-bicycle-touring-club. Meetup's feed only carries the next ten events, so a ride that is posted one week at a time (CSCC Wednesday) shows one date.
- **Pedal Durango's event calendar** is a WordPress Events Calendar feed: `https://pedaldurango.com/events/list/?ical=1`. It carries Tuesday Night Worlds and Church of the High Pines with start addresses.
- **OMBA's Google Calendar** (Fort Collins MTB): `https://calendar.google.com/calendar/ical/overlandmtbevents%40gmail.com/public/basic.ics`. **RAR Front Range's Google Calendar** has the Colorado Springs monthly ride.
- **Ride with GPS organization events as JSON:** `https://ridewithgps.com/events.json?organization_id=<id>`. OUTspokin' is 7045; it lists every Green, Blue, Black and Rainbow ride with an exact start.
- **Your Group Ride (yourgroupride.com)** is the Fort Collins directory: each ride has a page with time, status and an "Updated" date. It also has an events calendar. The pages are only as fresh as the "Updated" line; two ride pages there were last updated in 2024.
- **Bike Colorado Springs' calendar** (`bikecoloradosprings.org/calendar/`) lists the Wednesday Ride and Buffalo Lodge Saturday ride with dates.
- **Strava clubs** load as club pages (member count and description) but the event lists need a login. Club ids seen: Fort Collins Gravel People `FCGP`, Your Group Ride Fort Collins `YGRFTC`, Durango Gravel Finders `1965215`, Wheat Ridge Cyclery `wheat-ridge-cyclery-184347`. I found no public event page to cite.
- Many fall schedules are posted one ride at a time (Meetup) or not at all (Facebook). Expect shop rides to go quiet from November.

## Re-checked

- **Gurlz Ride (Boulder):** seasonal-break. BMA says rides run April through September; October's feed has no Gurlz Ride.
- **Knobby Wednesday (Boulder):** seasonal-break. Same page; October's Wednesday ride is a co-ed Nite Ride.
- **Wednesday Morning Velo (Boulder):** seasonal-break. "2026 will run from May 20th to September 30th."
- **Women's Tuesday Group Ride (Broomfield):** confirmed. Oct 6 and Oct 13 at 6:00 pm, series ends Oct 13. Feed promoted.
- **The Wednesday Ride (Colorado Springs):** changed to 5:30 pm from the Lincoln Center, through Oct 28.
- **Tour de Latte (Colorado Springs):** changed to Saturdays 10:00 am, every week to April 24, 2027, no-drop at 8 to 10 mph. Season set to year-round. Feed promoted.
- **RAR See U Next Tuesday (Colorado Springs):** confirmed from RAR's Google Calendar, 2nd Tuesday at 6:00 pm, entry edited Aug 20, 2026. Next Oct 13. Feed promoted.
- **Denver Cruiser Ride:** confirmed, weakly. Home page says Thursday, meet 7p, kickstands up 7:45p; no end date posted.
- **OUTspokin' Club Rides (Denver):** confirmed. Oct 4 and Oct 10 at 8:45 am; Oct 10 is the season finale.
- **OMBA Singletrack Social (Fort Collins):** confirmed. Weds 5:30 pm; Spring Canyon Park from Oct 7; ends Oct 28. Feed promoted.
- **SOR (Fort Collins):** confirmed, weakly. YGR page updated June 10 says "Currently Running", Saturdays 8:00 am, start time changes seasonally.
- **Golden Bike Cruise:** seasonal-break. 2026 schedule ended Sept 29.
- **Grand Junction CyclePaths:** confirmed. Member-led rides on Oct 1, 4, 17, 24 with varying days and times, as listed. Feed promoted.
- **Phil's Circuit Ride (Littleton):** confirmed. Wednesdays 8:00 am from Reynolds Landing through December. Feed promoted.
- **SVCG Tuesday ride (Longmont):** seasonal-break. Club runs Tuesday and Saturday March to September; Saturday only after.
- **MMB Tuesday Ride (Monument):** confirmed. Oct 6 and Oct 13 at 5:30 pm from Mount Herman Trail Head. Feed promoted.

## Couldn't re-check

No entry written for these five:

- **Adventure Cycling Saturday Morning Ride (Aurora).** The shop's page loads and says "every Saturday (depending on weather) at 10 am (9 am in the summer)" from 4361 S Parker Rd, but nothing on it is dated. October is the winter time, 10:00 am; the site has 9:00 am. Worth a phone call to the shop.
- **RAR Front Range See You Next Tuesday (Denver).** RAR's public calendar has only the Colorado Springs monthly ride. No Denver ride, day or time is on any page I could load; dates are said to be on Instagram.
- **The Phoenix Denver Sober Weekend Rides.** The Facebook post returns an error to a robot; thephoenix.org/explore-events builds its list with JavaScript and showed no Colorado rides.
- **Pedal the Peaks Wednesday Shop Ride (Durango).** Only durango.org's road cyclist guide lists it (Wednesday 6 to 8 pm, undated). The shop's own site says nothing about a ride and mentions new owners.
- **Fort Collins Gravel People.** gravelfoco.com says "Rides: Tuesday, 6pm, location varies", undated. YGR's page (updated Mar 27) says it resumed for the season. The Strava club's event list needs a login. With sunset near 6:15 pm in October, I can't tell if it kept 6:00 pm. Ask the club.

## Rejected

- **The Wednesday Ride as shown on Old Town Bike Shop's page (seen Oct 1):** "6 P.M., March 12 to October 29" is last year's schedule. The ride is 5:30 pm now.
- **SOCO Velo Over-the-Hump Day Ride (Colorado Springs):** Wednesday evenings April to September; the club's page says winter rides move to Zwift. Ended for the season.
- **Kids on Bikes PopCycle Ride (Colorado Springs):** May to September per Old Town Bike Shop. Ended.
- **Cruisin' Pueblo (Pueblo):** Bike Colorado Springs' calendar lists one date, Thu Oct 1, with a description from 2022. No later dates. Not enough.
- **BMA Nite Rides (Boulder):** run on changing weekdays in October; no fixed day to list.
- **RioCovery Ride (Fort Collins):** Monday evenings May to August; YGR page (Mar 27) says "has not started for the 2026 season yet". Season over.
- **TTH, Tuesday and Thursday 11:20 am (Fort Collins):** YGR page last updated June 18, 2024. Older than 12 months.
- **Dirt Church Gravel (Fort Collins):** YGR page last updated June 24, 2024. Older than 12 months.
- **Steamboat Springs:** Routt County Riders' calendar for October shows only shop open hours. Orange Peel's site shows nothing on rides. No ride found.
- **coloradocycling.org:** hijacked spam site. Ignore.

## Couldn't confirm

For Robert or a local rider to check by hand. Day, time and start are as the source showed them.

- **Durango Gravel Finders.** Durango Wheel Club, Wednesdays 5:30 pm, from Horse Gulch, weekly gravel group ride. Seen on durangowheelclub.com (footer 2025) and the Strava club `https://www.strava.com/clubs/1965215`. Club description says it starts in March; I could not see fall dates.
- **Wheat Ridge Bike Club.** Wheat Ridge Cyclery with New Image Brewing, Wednesdays 6:00 pm, A and B rides, from New Image's Wheat Ridge taproom. The shop page says "starting March 20th, 2025"; its Ride with GPS org (10844) has no events after 2024. Strava club `https://www.strava.com/clubs/wheat-ridge-cyclery-184347`. `https://www.wheatridgecyclery.com/articles/wheat-ridge-bike-club-pg560.htm`
- **WMBA of Colorado Springs (women's mountain bike group).** Thursdays about 6:00 pm, small ride groups, no-drop, sign up through RunSignup two weeks ahead, members only. Site says the 2026 season started in May; footer 2025; I could not see an October schedule. `https://www.wmbacos.org/group-rides`
- **Long Mont Velo Bikeshop rides (Longmont).** "Saturday, Saturday!" Saturday 8:00 am from 1111 Francis St, and a Friday night ride (Oct 2, 6:10 pm). Meetup feed shows one of each. `https://www.meetup.com/long-mont-velo-bikeshop/`
- **HRCC Masters coffee ride (Highlands Ranch Cycling Club).** Thursday 8:30 am from Mike's Bikes of Highlands Ranch, 2030 E County Line Rd; Oct 1 is the only date in the feed. `https://www.meetup.com/hrcc-masters/`
- **BMA inclusion rides (Boulder).** BiciFiesta, 2nd Thursday at 6 pm; BIPOC ride, 4th Thursday at 6 pm, for BIPOC and Latinx riders and allies, per bouldermountainbike.org/group-rides. Neither is in the October feed. `https://www.meetup.com/boulder-mountain-bikers/`
- **Manitou Spokes (Manitou Springs).** Saturdays from Buffalo Lodge, 10:00 am in winter, 8:30 am in summer (Old Town Bike Shop's page). I found no page of their own. Likely the same start as the Buffalo Lodge ride.
- **Christian Cycling Club Denver Spoke.** Saturday rides, e.g. Marshall Mesa Sat Oct 3, 9:15 am; only one date in the feed. `https://www.meetup.com/christian-cycling-club-denver-spoke/`
- **Front Range Mountain Bikers.** Mondays 5:00 pm, level 5 rides (Oct 5, Oct 26 in the feed); not weekly. `https://www.meetup.com/front-range-mountain-bikers/`
- **RMCC Saturday road rides (Golden).** Fall road rides Oct 3 and Oct 10 at 8:45 am, Golden then North; I could not tell if weekly. `https://www.meetup.com/rocky-mountain-cycling-club-rmcc/`
- **Denver Bicycle Touring Club (DBTC).** Many weekday rides, but each is a one-off led by a member, no standing day. `https://www.meetup.com/denver-bicycle-touring-club/`
- **Meetup groups that returned 403 to a robot** (check by hand): E Bike Riders 50 and Older (`meetup.com/e-bike`, Fri 9 am rides seen on the Denver find page), Weekday Warriors of Northern Colorado, Loveland Mountain C, Two Wheel Therapy CO Springs, We Ride Colorado (Littleton).
- **Not reached at all:** Boulder, Denver, Fort Collins, Golden, Salida, Steamboat, Aurora and Grand Junction shop rides from shop pages; Strava club events in every city; Instagram and Facebook-only groups. No queer, women/trans/femme or BIPOC new ride has public proof here yet beyond the ones already on the site.

## Stats

- Candidates looked at: about 70 (groups and rides across Meetup, shop, club and directory pages)
- Listed: 17 (10 high, 7 medium)
- Couldn't confirm: 12 groups, plus 5 already-listed rides I couldn't re-check
- Rejected as ended, stale or unfit: 10
- Existing rides re-checked: 21 looked at, 16 entries written (9 confirmed, 2 changed, 5 seasonal-break)
- Dry merge: `merge-ride-research.js co.json --dry` accepted 17 of 17. `rides-apply.js upkeep.json --dry` passed with no problems.

## Sources

Feeds and calendars read: Meetup ICS for boulder-mountain-bikers, trek-broomfield-group-ride, colorado-springs-cycling-club, denver-cycling-club-dcc, st-vrain-chain-gang, monument-mountain-bikers, gj-cyclepaths, bikefriendlyarvada-community-bike-rides, christian-cycling-club-denver-spoke, denver-bicycle-touring-club, denver-outdoor-fun, denver-over-50-mountain-biking-meetup-group, front-range-mountain-bikers, hrcc-masters, long-mont-velo-bikeshop, longmont-on-bikes, rocky-mountain-cycling-club-rmcc, womens-fun-biking-group; `https://pedaldurango.com/events/list/?ical=1`; OMBA Google Calendar ICS; RAR Front Range Google Calendar ICS; `https://ridewithgps.com/events.json?organization_id=7045` and `?organization_id=10844`.

Pages read:
- https://www.bouldermountainbike.org/group-rides/
- https://wednesdayvelo.com/
- https://www.adventurecycle.net/about/saturday-morning-rides-pg246.htm
- https://www.oldtownbikeshop.com/articles/clubs-group-rides-pg1140.htm
- https://www.bikecoloradosprings.org/calendar/
- https://rarfrontrange.com/ and https://rarfrontrange.com/calendar
- https://www.denvercruiserride.com/ and https://denvercruiserride.com/howweroll2025.html
- https://goldenbikecruise.com/
- https://yourgroupride.com/group-rides/, /saturday-leaving-from-provelo/, /fort-collins-gravel-people/, /ombc-wednesday-social-rides/, /wor-wednesday-open-ride/, /the-oval/, /tth-tuesday-thursday-ride/, /riocovery-ride/, /sunday-gravel-confessions/, /riobasemile-ride/, /events/incycle-mtb-ride/
- https://www.gravelfoco.com/ and https://www.strava.com/clubs/FCGP, /YGRFTC, /1965215, /wheat-ridge-cyclery-184347
- https://www.outspokin.org/ (returned a bot wall; read the Ride with GPS feed instead)
- https://www.durango.org/blog/post/the-road-cyclists-guide-to-durango/
- https://www.ptpdurango.com/, /local-guidance, /blog
- https://www.durangowheelclub.com/
- https://pedaldurango.com/, /social-rides-2/, and event pages for Tuesday Night Worlds and Church of the High Pines
- https://www.meetup.com/st-vrain-chain-gang/ and event pages for SVCG, Trek Broomfield, CSCC (Tour de Latte, Tuesday gravel, Wednesday, Sunday), MMB, DCC, Denver Outdoor Adventures, RMCC, Longmont On Bikes, Long Mont Velo, HRCC Masters, BFA
- https://thephoenix.org/explore-events and the Phoenix Denver Facebook post (error)
- https://www.wmbacos.org/ and /group-rides
- https://socovelo.com/ and /events/over-the-hump-day-group-ride/
- https://routtcountyriders.org/events/
- https://www.wheatridgecyclery.com/articles/wheat-ridge-bike-club-pg560.htm
- https://www.ridehrcc.com/ and /ride
- https://www.copmoba.org/copmoba-events
- Meetup find pages for Denver, Boulder, Golden, Littleton, Aurora, Arvada, Longmont, Loveland and Colorado Springs (cycling and mountain-biking topics), used as leads only
