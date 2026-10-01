# az-east-valley: group-ride scout report

- **Region id:** `az-east-valley`
- **Agent:** East Valley group-ride scout (Claude Sonnet 5.5)
- **Date:** Wednesday, Sept 30, 2026 (Arizona time)
- **Area:** Tempe and ASU, Mesa, Chandler, Gilbert, Ahwatukee, Queen Creek, San Tan Valley, Apache Junction, and the rides out to Usery Pass, Saguaro Lake and the Bush Highway, and Canyon Lake
- **Files:** `az-east-valley.json` (7 records, all high) and this report
- **Fetch budget:** about 120 page fetches, all used

## Summary

**Listed: 7 rides, all high confidence.** The target was 30 or more. I did not get close. I would rather say so than pad the file with rides I can't prove.

By city:

- Chandler: 4
- Queen Creek: 2
- Tempe: 1
- Mesa, Gilbert, Ahwatukee, San Tan Valley, Apache Junction: none new. Gilbert and Ahwatukee already have Global Bikes rides on the site. I found nothing that loads for Mesa, San Tan Valley, Apache Junction, Saguaro Lake / Bush Highway or Canyon Lake.

By host: Global Bikes 2 (plus 3 already on the site), PMBC 2, Santan Shredders 2, Southeast Chandler Cycling 1.
By type: road 4, MTB or gravel 2, social 2 (one of those is also road).
Five of the seven are no-drop or beginner rides in the host's own words.

**No LGBTQ, women / trans / nonbinary or BIPOC ride made it in.** I found three groups of that kind and none has a page that loads with a date: OutCyclists (LGBT road club, meets in Old Town Scottsdale), Hawesaholics Babes Ride On (women and girls MTB, Mesa) and Major Taylor Phoenix Riders (Tempe). They are in "Couldn't confirm" and "Hand-off".

**Why so few.**

- Most East Valley rides live on Facebook groups, Instagram and invite-only Strava clubs. None of those load. The ones I found by name are in "Couldn't confirm".
- The places that do load with dates are four Meetup groups, PMBC's RideWithGPS calendar and Regroup's rides page. I read all of them.
- Several clubs that older directories still list are gone, silent or unreachable: Ahwatukee Cycling Group, Tempe Bicycle Action Group, Landis Cyclery's calendar, Wheezers and Geezers, Team One Racing.
- The session's web-search cap ran out before I finished hunting Strava event pages city by city.

**Best leads for Robert, in order:** EVSL (Gilbert, Tuesday and Thursday 5:30 am), Major Taylor Phoenix Riders (Tempe, Sunday), Hawesaholics and its women's spin-off (Mesa MTB), Global Bikes' weekly MTB rides (Ahwatukee), OutCyclists (LGBT, Thursday evening).

## For the editor

- **Four rides already on the site have a new time.** Details are under "Rejected, Changed". Regroup Saturday and Gilbert Sunday Funday are now 6:30 am. The Ahwatukee Wednesday ride is 6:30 pm from Oct 7. VER's South Mountain Taco Tuesday is 6:30 pm.
- **Two different Taco Tuesdays.** Valley Epic Rides runs one at South Mountain (already on the site). Wheel Suckers and Global Bikes run one in Chandler (new, in the JSON). Don't merge them.
- **Chandler Taco Tuesday has a conflict.** The Meetup post of Sept 29 says 6:30 pm at Fiesta Mexicana, 4949 S Alma School Rd, "new start time, route and location". wheelsuckers.org still says 6:00 pm at Nando's, 1890 W Germann Rd. I used the dated Meetup post and wrote the conflict into the record. I left `feed_url` null for this one because the group's feed didn't carry the ride on Sept 30.
- **PMBC starts move every week.** Sunday Kickoff's `start_location.address` is only the Sept 27 start (Panera, SE corner of Guadalupe and McClintock, Tempe). Wednesday No-Drop has no address. Please don't geocode either as a fixed start.
- **PMBC's September times may not be October's.** Saturday Cycling (Sept 26) and Mike's Sunday Ride (Sept 27) show 7:00 am on RideWithGPS. The site has 07:30. PMBC's start tables for the two rides I did read (Sunday Kickoff and Wednesday No-Drop) go 7:00 in September and 7:30 in October. The other two may follow the same pattern, so 07:30 may simply be the October time. I did not fetch their description pages.
- **Global Bikes will have five rides on the site** (three already there plus Taco Tuesday and B.E.S.T.). Cut to taste.
- **Dated series, not year-round rides.** Santan Shredders' Wednesday Night Roll runs through Oct 28. B.E.S.T. runs Oct 24 to Nov 21. VER's Night Rider series ends Oct 27. Re-check each at its end.
- **Personal phone numbers** appear on the B.E.S.T. Meetup page and in a Strava post. I left them out.
- **Hand-offs** (outside my area, or already covered by other scouts) are listed below.
- **Pages that did not load at all:** majortaylorphoenixriders.com and wheezersandgeezers.com. santanracing.com returned 403 on an "administrative rules" page. yelp.com returned 403.

## Why these

- **Sunday Social Ride (Southeast Chandler Cycling).** A 6 am Sunday roll from a Panera on Germann Road. The host's only promise on pace is that nobody gets dropped. Free, RSVP on Meetup.
- **Taco Tuesday Ride (Wheel Suckers with Global Bikes).** The big Tuesday-evening road ride in Chandler. About 21 miles in A, B and C groups, then tacos. Check the start first.
- **B.E.S.T. Beginner to Expert Saturday Training (Global Bikes).** A free training series for beginner road riders. Five Saturdays, 10 to 30 miles, an orientation first. The host says someone stays back with you.
- **Wednesday Night Roll: No Drop (Santan Shredders).** A night ride on the trails at San Tan Mountain Regional Park for newer riders, weekly through Oct 28. Bring bright lights.
- **Shift into the Weekend MTB Ride (Santan Shredders).** Third-Saturday dirt and gravel at San Tan. No-drop, regroups often. The start slides from 6:00 to 8:00 am with the season.
- **The Sunday Kickoff (PMBC).** The club's Sunday social road ride, 25 to 30 miles at 15 to 17 mph, with breakfast after. Visitors welcome. The start moves each week.
- **Wednesday No-Drop (PMBC).** A weekday-morning no-drop road ride at about 12 mph, 20 to 32 miles, with a breakfast stop. Beginners welcome.

## Where rides are posted in this area

### Words

- "Group ride" and "shop ride" are the plain terms. "Social" means food or drinks after.
- **No-drop** means the group waits. Many groups split into **A / B / C**. A is fast and may drop you. C is the no-drop group. Wheel Suckers spells it out: A is 20+ mph, B is 17 to 19, C is under 17 and no-drop.
- **Wheels down** is the roll time (Southeast Chandler Cycling, Wheel Suckers, OutCyclists use it). **Pre-miles** are easy extra miles before the ride (Wheel Suckers does them an hour early).
- Local names: **Taco Tuesday**, **Sunday Funday**, **Kickoff**, **Sat Cycling** (PMBC), **Night Rider** and **night roll** (lit trail rides), **SoMo** (South Mountain), **Hawes** (the Hawes trail system in Mesa), **the Short Loop** (EVSL).
- A **sweeper** rides at the back. A **ride leader** sets the route.

### Where rides are published

- **Meetup** is where the East Valley's dated rides are. Groups: Global Bikes (https://www.meetup.com/global-bikes-meetup/), Southeast Chandler Cycling (https://www.meetup.com/southeast-chandler-cycling/), Santan Shredders (https://www.meetup.com/santan-shredders/) and Valley Epic Rides (https://www.meetup.com/valley-epic-rides/).
- **PMBC** (Phoenix Metro Bicycle Club) keeps ride descriptions on ClubExpress (https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=356095) and the dated calendar on RideWithGPS (https://ridewithgps.com/organizations/3053-phoenix-metro-bicycle-club/events).
- **Shops.** Global Bikes' calendar page sends you to its Meetup (https://www.globalbikes.info/articles/ride-and-clinic-calendar-pg2857.htm). Regroup lists dated rides with distance, route and a going-count on one page (https://regroupwithus.com/rides-and-events/). Landis Cyclery's calendar page is empty. Action Rideshop and State Rideshop show no schedule I could load.
- **Club sites.** wheelsuckers.org lists the Tuesday and Wednesday rides with a ride waiver, but nothing is dated. santanshredders.com is a hub that points to Meetup.
- **Strava clubs.** The club page loads without a login and its description sometimes holds the schedule (EVSL does). The club's event list needs a login. I found no live Strava event page for any recurring East Valley ride.
- **Facebook groups** hold the real schedule for EVSL, Hawesaholics, the Major Taylor group, Aravaipa's community and OutCyclists. They don't load.
- **ASU Cycling** embeds a public Google Calendar on https://www.asucycling.com/calendar. It is stale (see "Couldn't confirm").

### Rhythm

- **Summer is dawn.** PMBC's Sunday Kickoff and Wednesday No-Drop start at 6:30 am from June to August. EVSL's description says 5:30 am. PMBC's Thursday ride skips June and July.
- **PMBC's published start table** (Sunday Kickoff): Jan-Feb 9:00, Mar 8:00, Apr 7:30, May 7:00, Jun-Aug 6:30, Sep 7:00, Oct 7:30, Nov 8:00, Dec 8:30. Wednesday No-Drop: Jan 8:30, Feb-Mar 8:00, Apr 7:30, May 7:00, Jun-Aug 6:30, Sep 7:00, Oct 7:30, Nov 8:00, Dec 8:30.
- **Santan Shredders' third-Saturday ride:** 6:00 am in September, 7:00 in October and November, 8:00 in December.
- **Evenings move earlier as days shorten.** The Chandler Taco Tuesday is 6:30 pm now. The Ahwatukee Wednesday ride goes to 6:30 pm on Oct 7. Wheel Suckers' site says winter 6:00 pm and summer 7:00 pm for that ride.
- **Many rides are seasonal series with an end date**, not year-round. Dates for the next series tend to appear late.
- **Posting lead time:** Global Bikes posts about a week ahead. PMBC posts the next Sunday by Thursday. Santan Shredders posts months ahead.

### Visitor norms

- **Lights** for dark starts and night rides. Wheel Suckers requires helmet and lights. Santan Shredders asks for 700+ lumens on the night roll.
- **Water.** Carry more than feels sensible, even in October.
- **Waivers.** RSVPing on a Global Bikes Meetup event counts as agreeing to its ride waiver. Wheel Suckers has a ride waiver page. PMBC requires a helmet and bans earphones.
- **Park entry** at San Tan Mountain Regional Park, as Santan Shredders listed it in Sept 2026: a Maricopa County annual pass, or $10 per vehicle, or $5 on foot or by bike.
- **Meetup RSVP.** Santan Shredders asks you to join the group, request to join, then RSVP, and to arrive 10 minutes early.
- **Strava clubs are often request-only.** Global Bikes' B.E.S.T. club, Major Taylor Phoenix Riders and OutCyclists are invite-only.
- **Visitors are welcome** at PMBC rides. Ask the ride leaders at rideleaders@pmbcaz.org with the ride name in the subject.

### Re-check sources

Machine-readable:

- **Meetup ICS feeds.** Fetched, and this ride's events seen in them: Southeast Chandler Cycling (https://www.meetup.com/southeast-chandler-cycling/events/ical/), Santan Shredders (https://www.meetup.com/santan-shredders/events/ical/), Global Bikes (https://www.meetup.com/global-bikes-meetup/events/ical/). The feeds hold only the next ten events or so. The events page lists more.
- **PMBC's RideWithGPS org events page.** The HTML has one row per event (`event-row date-YYYY-MM-DD`). Each event page carries Event JSON-LD with start time and coordinates. A street address is there only when the ride leader filled it in.
- **Regroup's rides page** is static HTML with dated rides.
- **Strava club pages** load without a login. The page's `__NEXT_DATA__` holds the club description, member count and a short list of dated posts. That is a pulse check, not a schedule.
- **WordPress sites** show a page's last-edit date at `/wp-json/wp/v2/pages/<id>`. I used it on Aravaipa's group-rides page (last edited Jan 23, 2024).

Not machine-readable: Facebook, Instagram, Strava event lists, wheelsuckers.org (undated), PMBC's ClubExpress description pages (they change rarely), ASU's calendar (stale).

## Rejected

### Ended, stale or not a fit (19)

Ended or stale (12):

1. **Hawes MTB Ride with the Performance Crew.** Strava event 239821, club "Performance Bike Chandler". The only date is Sun Nov 26, 2017, 8:00 am, from a Walgreens lot on N Power Rd, Mesa. A one-off, nothing newer. https://www.strava.com/clubs/299996/group_events/239821
2. **Saturday Regroup Decaf Ride.** Strava event 721322 on Regroup's club. The event URL now redirects to the club page. The event is gone (fetched Sept 30, 2026). https://www.strava.com/clubs/171401/group_events/721322
3. **Ahwatukee Cycling Group.** Strava club 4792, 117 members. The description says a Tuesday and Thursday group. The newest club post is Aug 4, 2023. https://www.strava.com/clubs/ahwatukee-cycling-group-4792
4. **Tempe Bicycle Action Group (TBAG) social rides.** The Group Ride category on biketempe.org ends at Bike MS 2024 (Sept 23, 2024). No recurring ride. The "Second Saturday" rides date from 2011-12. https://www.biketempe.org/category/group-ride
5. **Landis Cyclery shop rides.** The Events & Rides Calendar page is empty and carries a 2022 copyright. The site lists Central Phoenix, North Scottsdale, Tempe North and Tempe South, and no Chandler or Gilbert store. https://www.landiscyclery.com/articles/events-rides-calendar-pg72.htm
6. **East Valley Small Group Rides (Meetup).** Adventure-motorcycle rides. The last event was Nov 2, 2025.
7. **Regroup x Chino Grinder Sunday gravel rides.** A prep series winding down. A Sept 10, 2026 club post said only a few were left, with the next at Seven Springs, 6:30 am at the Bartlett Lake turnoff. The rides page shows a Sunday ride on Sept 13 and none since or upcoming. https://regroupwithus.com/rides-and-events/
8. **Pedaling Against Poaching.** Strava club 330134, Chandler. One rider's 2018 plan to ride 5,000+ miles, the length of Africa, for rhino awareness, with anyone welcome to join. The description says "challenges and group rides are forthcoming". The newest club posts are from Feb 2021. No group ride is listed. https://www.strava.com/clubs/330134
9. **Showdown at Usery Pass.** Strava club 735261, a Mesa race. The description is the 2020 virtual edition and the newest post is Nov 8, 2020. https://www.strava.com/clubs/Showdown
10. **AZphalt Cycling.** azphaltcycling.com is a 2013-era page for a USA Cycling race team. No group-ride calendar. Linked from PMBC's undated links page. http://www.azphaltcycling.com/
11. **Team One Racing.** teamoneracing.com returns 404. Same links page. http://www.teamoneracing.com/
12. **Summit Velo.** summitvelo.org is a parked domain, "recently registered". Same links page. http://www.summitvelo.org/

Not a fit (7):

13. **Coffee & Crawlers (Meetup).** An off-road vehicle meetup at Desert Rat Off Road Centers, Tempe. Not bicycles.
14. **The Bike Lane (Meetup).** Irregular social events and tours, mostly outside this area. The next one listed is a Scottsdale bike party on Oct 10.
15. **Arizona Dragon Riders (Meetup).** Dragon-boat practice at Tempe Town Lake. Not cycling.
16. **Santan Shredders skills classes** (Trail Essentials, Intro to Carving Corners, Carve flat corners, MTB Fundamentals). Paid or instruction, not free group rides. Trail Essentials is $25. MTB Fundamentals is $99.
17. **Outspoken Cycle Club** (outspoken.cc). Chapters in Seattle and San Diego only.
18. **Cycle Mania** (cyclemaniaaz.com). Based in Show Low. Out of area.
19. **Dirt Fiend.** Strava club 8803, Mesa. Three members and no posts.

### Changed on rides already on the site

These are all alive, with dated evidence this week. Only the time or the series changed.

- **Regroup Saturday Coffee Ride** (`tempe-az-regroup-coffee-ride`). Regroup's page lists Sat Oct 3 at 6:30 am, "NEW START TIME", 50-mile route. The site has 06:00. The page also says Regroup is still looking for C-group leaders.
- **Gilbert Sunday Funday** (`gilbert-az-global-bikes-sunday-funday-ride`). Meetup shows 6:30 am from Sept 27 (it was 6:00 am on Sept 13 and 20), weekly through Jan 3, 2027. The site has 06:00.
- **Ahwatukee Climbing Circuit** (`phoenix-az-global-bikes-ahwatukee-wednesday-ride`). Meetup shows 7:00 pm on Sept 30, then 6:30 pm from Oct 7. The site has 19:00. This is the same ride as Wheel Suckers' "Wheel Sucker Wednesday" (same Philly's Sports Grill start), whose site says winter 6:00 pm and summer 7:00 pm.
- **Taco Tuesday at South Mountain, Valley Epic Rides** (`phoenix-az-taco-tuesday-south-mountain`). Meetup shows 6:30 pm since Sept 22 (it was 7:15 pm on Sept 1 and 15; Sept 8 was cancelled). The site has 19:15. The series runs weekly to 2032 on Meetup.
- **Night Rider Series at Trail 100, Valley Epic Rides** (`phoenix-az-valley-epic-rides-night-rider-trail-100`). The time still matches (6:30 pm). The series ends Oct 27 (last Wednesday Oct 21) and Oct 14 is cancelled.

Also seen alive on dated pages: Chandler North Saturday Ride (6:00 am, same as the site, Oct 3 listed) and three PMBC rides (Saturday Cycling on Sept 5, 12, 19 and 26; Mike's Sunday Ride on Sept 6, 13 and 27; Granada Breakfast Ride on Sept 6, 13, 20 and 27). For the PMBC start times see "For the editor".

## Couldn't confirm (20)

Each entry: what it is, what I saw, what's missing, what to try. Robert will check these by hand.

1. **EVSL, East Valley Short Loop** (Gilbert). Tuesday and Thursday, 5:30 am, from the Warner Rd lot next to the Lifetime Fitness driveway by Over Easy. A, B and C groups. C is "no-drop, ask if offered". Seen: Strava club description, 365 members, https://www.strava.com/clubs/291530. Missing: any ride post after Aug 21, 2025, and that one was a question about a changed ride ("the ride that replaced the Joes ride", a donut ride). Try: the club's Facebook group, http://www.facebook.com/groups/1551124238440337/.
2. **EVSL Thursday Throw Down** (Gilbert). Thursday 7 pm from Freestone Park, 1045 E Juniper Rd. Three neutral laps around Lakeview Dr, then hard laps, clockwise. Seen: an EVSL club post dated Jan 30, 2025, "Thursday Throw Down is back". Missing: anything newer. Try: the EVSL Facebook group above.
3. **Hawesaholics** (Mesa MTB, Hawes, Usery and other East Valley trails). Strava club 306545, 1,972 members, posted four times in the last week. The recent posts are member updates, event promos and scam warnings, and only one mentions a ride (Venture West, below). Missing: day, time, start. Try: its Facebook group, https://www.facebook.com/groups/1710431835903828/.
4. **Hawesaholics Babes Ride On** (women and girls MTB, Mesa). A spin-off of Hawesaholics with a beginners' class. Seen: East Valley Tribune, Jan 21, 2022, https://www.eastvalleytribune.com/news/ev-female-mountain-bikers-group-rolling-on/article_e63fe1a0-7747-11ec-8616-f3b428423622.html. The article gives no link for the group. Missing: everything current. Try: ask in Hawesaholics. I did not guess a handle.
5. **Major Taylor Phoenix Riders / The Beginners Lane ("TBL")** (Tempe). Strava club 470977, invite-only, 235 members. It started as a beginners' group, joined the Major Taylor Association, and ties itself to Landis Cyclery on Rural and Warner. PMBC's undated links page says weekly rides start from Kiwanis Park in Tempe on Sunday morning. Its website (majortaylorphoenixriders.com) did not load. Missing: time and anything dated. Try: https://www.facebook.com/groups/TBLMajorTaylorPhoenixRiders/.
6. **ASU Cycling Club** (Tempe). The club's public Google Calendar (sundevilcycling@gmail.com, linked from asucycling.com/calendar) lists weekly rides: Team Coffee Ride (Mon 6:30 am, Old Main), Velo Shop Ride (Wed 6:30 am, The Velo Bike Shop, 2317 N 7th St, Phoenix), The Friday Ride (Fri 5:30 am, W 5th St and S Mill Ave), Sunday Congregation (Sun 6:30 am, E Lafayette Blvd and N 68th St), and Tuesday and Thursday Gainey (5:30 am) and The Saturday Ride (6:00 am) from Gainey Village in Scottsdale. Missing: every weekly entry was last edited in 2022 or 2023. The newest edits (Dec 31, 2024) are race entries. A June 21, 2026 club post on Strava mentions "SMS rides" and "Tuesday/Thursday CRAP rides", names that don't match the calendar. Try: Instagram, https://www.instagram.com/cycling.asu/. Feed: https://calendar.google.com/calendar/ical/sundevilcycling%40gmail.com/public/basic.ics.
7. **PMBC Maple Leaf Thursday.** "Every Thursday", intermediate to advanced, 30 to 45 miles at 14 to 15 mph, start varies weekly, "normally begins in Scottsdale". Seen: PMBC's ride page (https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=552747). Missing: the page says May 22, 2025 was the last Thursday ride until August, and no Thursday event is on RideWithGPS in September 2026. Try: email rideleaders@pmbcaz.org.
8. **PMBC "A Friday Ride".** One event on RideWithGPS, Fri Sept 18, 2026, 7:00 am (https://ridewithgps.com/events/502816-a-friday-ride). No other Friday in September. Missing: whether it repeats. Try: the PMBC calendar after Oct 1.
9. **Regroup "Sunday Sabbatico."** Regroup's rides page calls itself the hub for "our regular Sunday Sabbatico rides" (shop: 1205 N Scottsdale Rd, Tempe). Missing: no Sunday ride is upcoming and the last one on the page is Sept 13. Try: ask the shop, or its Instagram.
10. **Global Bikes, Ahwatukee Saturday beginner MTB ride.** "A weekly Saturday ... Mountain Bike Beginner Morning Ride", free, meet a ride leader at the Global Bikes Ahwatukee shop. No time given. Seen: the shop's "Classes, Clinics & Rides" page (https://www.globalbikes.info/about/classes-clinics-rides-pg2479.htm). Missing: the page is undated and the ride is not on the Global Bikes Meetup, which carries the shop's other rides.
11. **Global Bikes, Ahwatukee early-morning MTB ride.** Weekly, intermediate and advanced, about 15 miles. Meet at the Ahwatukee shop (Ray Rd west of 48th St) and ride to the Desert Classic Trail at South Mountain. The page says "see calendar for ride times". No day given. Same page, same gap.
12. **Global Bikes, North Chandler Saturday Social** (beginner road, 15 to 17 mph). Described as a 4-week program from the Ray Rd store, led by the same person who leads B.E.S.T., so it may be the older version of B.E.S.T. Same page, same gap. The Chandler North Saturday Ride at 6:00 am is a different, listed ride.
13. **Global Bikes, South Mountain Silent Sunday Ride.** One Meetup event, Sun Sept 27, 2026, 7:00 am (meet 6:45) at the lot across from Scorpion Gulch, 10225 S Central Ave, Phoenix. The host calls it "not necessarily a group ride". Missing: a next date. Try: the Global Bikes Meetup in October. https://www.meetup.com/global-bikes-meetup/events/316605946/
14. **Aravaipa Rides, Monday South Mountain group ride** (Pima Canyon trailhead, South Mountain Park, Phoenix). Mondays 6:30 pm, 6 to 10 miles, all abilities, then a social at Fate Brewing. Seen: Aravaipa's group-rides page, https://aravaiparides.com/group_rides/. Missing: the page is undated and was last edited Jan 23, 2024 (WordPress API). It sends you to Facebook for current details. Try: https://www.facebook.com/groups/363815797725826.
15. **Action Rideshop** (Mesa, 1316 S Gilbert Rd). Shop club on Strava, 657 members, "Come ride with us". Missing: no group-ride listing on the shop's site or the club page. Try: Instagram, "actionrideshop", as named in the club description.
16. **State Bicycle Co. Riders / State Rideshop** (Tempe). Strava club 17913, 1,243 members. Recent posts are member photos. Missing: any schedule. Try: https://www.strava.com/clubs/state-bicycle-co-riders-17913.
17. **Tempe Bicycle** (Tempe). A search snippet said it may be closed. The Yelp page (https://www.yelp.com/biz/tempe-bicycle-tempe-3) returned 403, so I couldn't check. Missing: whether the shop or any ride exists.
18. **Venture West, "SoMo night rides every Thursday from the shop."** A single Strava post dated Sept 30, 2026 in the Hawesaholics club feed. Missing: the shop's own page, start, time. I found no URL and did not guess one.
19. **Wheezers and Geezers.** Listed on PMBC's links page. wheezersandgeezers.com did not load. Missing: everything.
20. **San Tan Racing.** Listed on PMBC's links page. santanracing.com returned 403 on an "administrative rules" page. Missing: everything.

No recurring ride found at all for Apache Junction, San Tan Valley (beyond Santan Shredders in Queen Creek), the Saguaro Lake / Bush Highway weekend rides or Canyon Lake.

## Hand-off to other scouts

These were outside my area, or other scouts have the same pages. Facts are what I saw.

- **OutCyclists Phoenix LGBT Cycling Club.** Google Sites page, https://sites.google.com/view/outcyclists/ (I read a copy another scout fetched; its edit stamp is May 2022). It lists an "almost weekly" Thursday sunset social ride, about 20 miles, no-drop, generally from the Greater Old Town Scottsdale area, wheels down 5:45 pm in winter and 6:45 pm in summer, plus an occasional weekend fitness ride of 30 to 40 miles at about 14 mph. Details go on Facebook (https://www.facebook.com/groups/outcyclists/). I fetched the Strava club (https://www.strava.com/clubs/outcyclists): 26 members, invite-only, no dated posts. Not confirmed.
- **Phoenix Hiking, Biking and Everythinging Group.** "7:15 PM Tuesday Night Bike Ride From RT O'Sullivans in Scottsdale", weekly until Dec 29, 2026, R.T. O'Sullivan's Sports Grill, 7919 E Thomas Rd #101, Scottsdale. Seen only in Meetup find-page listings (event 316479853, Oct 6). I did not open the group's own page.
- **PMBC Maple Leaf Thursday** "normally begins in Scottsdale". See above.
- **ASU's Tuesday, Thursday and Saturday rides** start from Gainey Village, the same place as Scottsdale Cycling's Thursday and Saturday rides.

## Events

Big annual rides worth the 2027 calendar. Dates are the 2026 editions unless noted.

- **San Tan Century (PMBC).** Queen Creek (start and finish at Desert Mountain Park). Normally the second Sunday in January, with registration opening in mid-to-late November. The 2026 edition was Feb 15. A 100-mile route plus shorter ones. https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=750280
- **Bike MS: Arizona.** Fountain Hills (Community Center). Sat Nov 7, 2026. https://www.eventbrite.com/e/bike-ms-arizona-2026-ride-to-end-ms-tickets-1990884476061
- **El Tour de Tucson.** Tucson. Nov 21, 2026, per Santan Shredders' Meetup event "Countdown to El Tour on November 21, 2026!". https://www.meetup.com/santan-shredders/events/313119916/
- **Chino Grinder.** A gravel event, mid-October in 2026. Regroup holds early packet pick-up at its Tempe shop on Sat Oct 10, 2026, 11 am to 2 pm. I believe it is in Chino Valley, but that is from memory, not from the page. https://regroupwithus.com/rides-and-events/
- **Stunner Night Rides (Aravaipa).** Usery Mountain Regional Park, Mesa, a July night MTB race. The 2025 edition was July 11. The 2026 date is not on the page. https://aravaiparides.com/stunner/

## Stats

- Candidates looked at: 48 (7 listed, 20 couldn't confirm, 19 rejected, 2 handed off)
- Listed: 7
- Couldn't confirm: 20
- Rejected as ended, stale or not a fit: 19 (12 ended or stale, 7 not a fit)
- Already on the site, re-checked: 9 (all alive; 4 with a new time, 1 with a series end, 2 PMBC rides whose October time I couldn't confirm)
- Page fetches: about 120, including 9 Strava event pages from outside the area that I read to see how event pages show dates

## Sources

Every URL I read. Pages marked (403) or (did not load) are noted in the report.

**Meetup**

- https://www.meetup.com/global-bikes-meetup/events/
- https://www.meetup.com/global-bikes-meetup/events/ical/
- https://www.meetup.com/global-bikes-meetup/events/?type=past
- https://www.meetup.com/global-bikes-meetup/events/316759269/
- https://www.meetup.com/global-bikes-meetup/events/316671369/
- https://www.meetup.com/global-bikes-meetup/events/316605946/
- https://www.meetup.com/global-bikes-meetup/events/316504005/
- https://www.meetup.com/global-bikes-meetup/events/316504148/
- https://www.meetup.com/santan-shredders/events/
- https://www.meetup.com/santan-shredders/events/ical/
- https://www.meetup.com/santan-shredders/events/316509085/
- https://www.meetup.com/santan-shredders/events/312779510/
- https://www.meetup.com/santan-shredders/events/315737548/
- https://www.meetup.com/southeast-chandler-cycling/events/
- https://www.meetup.com/southeast-chandler-cycling/events/ical/
- https://www.meetup.com/southeast-chandler-cycling/events/316764826/
- https://www.meetup.com/valley-epic-rides/events/
- https://www.meetup.com/the-bike-lane/events/
- https://www.meetup.com/east-valley-small-group-rides/events/
- https://www.meetup.com/azmtnbiking/events/
- Find pages: https://www.meetup.com/find/us--az--mesa/road-cycling/ , https://www.meetup.com/find/us--az--tempe/bike/ , https://www.meetup.com/find/us--az--chandler/road-cycling/ , https://www.meetup.com/find/us--az--gilbert/bike/ , https://www.meetup.com/find/us--az--mesa/mountain-biking/ , https://www.meetup.com/find/us--az--tempe/mountain-biking/ , https://www.meetup.com/find/us--az--chandler/cycling/ , https://www.meetup.com/find/us--az--gilbert/mountain-biking/ , https://www.meetup.com/find/us--az--queen-creek/cycling/ , https://www.meetup.com/find/us--az--apache-junction/cycling/

**PMBC and RideWithGPS**

- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=356095
- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=364162
- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=364163
- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=552747
- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=359028
- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=750280
- https://ridewithgps.com/organizations/3053-phoenix-metro-bicycle-club/events
- https://ridewithgps.com/events/504726-sunday-kickoff-9-27-26
- https://ridewithgps.com/events/502142-no-drop-wednesday
- https://ridewithgps.com/events/501705-no-drop-wednesday
- https://ridewithgps.com/events/502816-a-friday-ride
- https://ridewithgps.com/events/504286-mike-s-sunday-ride-indian-bend-wash-sout
- https://ridewithgps.com/events/504284-sat-cycling-downtowns

**Strava (East Valley clubs and events)**

- https://www.strava.com/clubs/299996/group_events/239821
- https://www.strava.com/clubs/326080
- https://www.strava.com/clubs/ahwatukee-cycling-group-4792
- https://www.strava.com/clubs/state-bicycle-co-riders-17913
- https://www.strava.com/clubs/171401
- https://www.strava.com/clubs/171401/group_events/721322
- https://www.strava.com/clubs/171401/group_events (login redirect)
- https://www.strava.com/clubs/8803
- https://www.strava.com/clubs/330134
- https://www.strava.com/clubs/451208
- https://www.strava.com/clubs/291530
- https://www.strava.com/clubs/15828
- https://www.strava.com/clubs/306545
- https://www.strava.com/clubs/Showdown
- https://www.strava.com/clubs/470977
- https://www.strava.com/clubs/aravaiparides
- https://www.strava.com/clubs/outcyclists

**Strava event pages outside the area** (read to see how event pages show dates; no records came from them)

- https://www.strava.com/clubs/118883/group_events/219337 (Poway, CA)
- https://www.strava.com/clubs/73667/group_events/4582 (Tucson)
- https://www.strava.com/clubs/575042/group_events/1684273 (Boulder, CO)
- https://m.strava.com/clubs/329876/group_events/252965 (Durango, CO)
- https://www.strava.com/clubs/44440/group_events/658099 (Santa Monica, CA)
- https://www.strava.com/clubs/465038/group_events/588581 (Scottsdale)
- https://www.strava.com/clubs/1114933/group_events/1938052 (Fountain Valley, CA)
- https://www.strava.com/clubs/54171/group_events/857635 (Hilton Head, SC)
- https://www.strava.com/clubs/64342/group_events/888039 (Aruba)

**Shops, clubs and other sites**

- https://www.globalbikes.info/articles/ride-and-clinic-calendar-pg2857.htm
- https://www.globalbikes.info/about/classes-clinics-rides-pg2479.htm
- https://regroupwithus.com/rides-and-events/
- https://wheelsuckers.org/
- https://santanshredders.com/
- https://santanshredders.com/group-rides/
- https://santanshredders.com/group-rides/roadbike-group-rides/
- https://www.landiscyclery.com/
- https://www.landiscyclery.com/articles/events-rides-calendar-pg72.htm
- https://www.actionrideshop.com/
- https://aravaiparides.com/group_rides/
- https://aravaiparides.com/wp-json/wp/v2/pages/22738
- https://aravaiparides.com/stunner/
- https://www.asucycling.com/
- https://www.asucycling.com/calendar
- https://calendar.google.com/calendar/ical/sundevilcycling%40gmail.com/public/basic.ics
- https://www.biketempe.org/category/group-ride
- https://www.outspoken.cc/
- https://www.emigosbikeshop.com/
- https://www.cyclemaniaaz.com/
- http://www.azphaltcycling.com/
- http://www.teamoneracing.com/ (404)
- http://www.summitvelo.org/ (parked domain)
- https://majortaylorphoenixriders.com/ (did not load)
- https://www.wheezersandgeezers.com/ (did not load)
- http://santanracing.com/ (403)
- https://www.yelp.com/biz/tempe-bicycle-tempe-3 (403)
- https://activetransportation.az.gov/bicycling/bicycling-organizations-clubs-and-programs (403 by script; a second try through WebFetch returned only the name "Tempe Bicycle Action Group", no URL)
- https://www.eventbrite.com/d/az--chandler/bike-events/
- https://www.eventbrite.com/d/az--mesa/bike-events/
- https://www.eastvalleytribune.com/news/ev-female-mountain-bikers-group-rolling-on/article_e63fe1a0-7747-11ec-8616-f3b428423622.html
- https://sites.google.com/view/outcyclists/ (a copy fetched by another scout)
