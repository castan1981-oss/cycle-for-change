# Plains deep sweep: Missouri, Kansas, Oklahoma, Nebraska, Arkansas, West and East Texas

Area id `plains` · agent: group-ride scout · date: 2026-10-01 · files: `plains.json` (22 rides), `upkeep.json` (15 entries)

## Summary

**New rides: 22** (7 high, 15 medium). By city: Bentonville 6, Midland 3, Norman 2, Little Rock 2, Abilene 2, St. Louis 1, Richmond Heights (St. Louis) 1, Oklahoma City 1, Omaha 1, Papillion (Omaha) 1, Topeka 1, Tulsa 1. That is short of the 30 target. The big metros that should have the most rides (Kansas City, Wichita, Little Rock, Springfield, Columbia, Lincoln) keep their calendars on Facebook, Instagram, a script-built club calendar, or a bot wall, so I could not prove them. They are in Couldn't confirm.

**Re-checks: 15 of 46 rides written up.** 11 confirmed, 1 changed, 2 seasonal-break, 1 couldn't confirm (unreachable). The other 31 loaded but carry no date from 2026 (or the host's page says 2025), so I wrote no entry and left their Checked date alone. See Couldn't re-check.

**Dry runs (Oct 1, 2026):** `merge-ride-research.js plains.json --dry` accepted 22, rejected 0. `rides-apply.js upkeep.json --dry` applied 15 entries with no errors.

## Why these

- **FAST Wednesday Night Group Ride** (Bentonville, AR, high): The NWA mountain bike group's Wednesday 6 pm ride, every skill level, moves trailhead monthly; proven by its public Google Calendar feed.
- **Femmes Gravel Monthly Ride** (Bentonville, AR, high): A monthly gravel ride for femme riders, all levels; next date Nov 21 listed on the host's events page.
- **Women's Monthly Social Ride at Coler** (Bentonville, AR, high): Beginner-friendly women's mountain bike social at Coler, second Tuesday, dates posted to December; read from the host's calendar API.
- **Bentonville Social Bike Ride** (Bentonville, AR, medium): Monday night themed 10-mile greenway cruise for families, e-bikes and cruisers; medium because only the city tourism guide (May 2026) carries it.
- **Tire'd but Inspired Thursdays** (Bentonville, AR, medium): No-drop Thursday gravel ride that ends at the Rapha Clubhouse; medium, tourism guide only.
- **Trackstand Friday Shop Mountain Bike Ride** (Bentonville, AR, medium): A slow, casual Friday shop MTB ride (about 7 mph) that ends at a tavern; medium, tourism guide only.
- **South Side Training Ride** (St. Louis, MO, high): Coached Saturday training ride with A/B/C groups; the rides page gives dates that match 2026.
- **Big Shark Long Route Shop Ride** (Richmond Heights, MO, high): The fast option on Big Shark's Saturday ride, 31 miles at 16 to 19 mph; shop calendar feed shows the series.
- **Trek Midland Wednesday Shop Ride** (Midland, TX, medium): Wednesday shop ride with A/B/C groups from Trek Midland; PBBA's 2026 page.
- **Energy City Bikes Saturday Shop Ride** (Midland, TX, medium): A fast Saturday ride (65 or 50 miles) from the shop; PBBA's 2026 page.
- **Crepes and Cranks** (Midland, TX, medium): B/C-level Sunday ride that ends with crepes at the Summit Center; PBBA's 2026 page.
- **BLN Tuesday Club Ride** (Norman, OK, medium): Norman's Tuesday club ride in four pace groups; league page updated March 2026.
- **BLN Thursday Club Ride** (Norman, OK, medium): Norman's Thursday club ride from two starts in four pace groups; league page updated March 2026.
- **OBS Sunday Morning Bricktown Ride** (Oklahoma City, OK, medium): Year-round Sunday ride from Lake Hefner to Bricktown for coffee at 12 to 16 mph.
- **Rusty Spokes Thursday Easy Trail Ride** (Omaha, NE, high): An easy Thursday-morning trail ride from Karen Park; the club's home page is current to Oct 12 and does not mark it finished.
- **Saturday Morning Gravel (The Bike Way / Omaha Velo)** (Papillion, NE, medium): Saturday 8 am gravel ride from Walnut Creek, a third ride for a shop that already has two listed.
- **KVBC Fairlawn Starter** (Topeka, KS, high): Entry-level Saturday ride, year-round, the only Topeka club ride still running after the spring-fall series ended; proven by the club's Google Calendar feed.
- **Arkansas Bicycle Club Tuesday Morning Ride** (Little Rock, AR, medium): Little Rock's weekday-morning road ride over the Big Dam Bridge; club page says 8:30, the city list says 9:00.
- **Arkansas Bicycle Club Thursday Morning Ride** (Little Rock, AR, medium): Thursday morning ride to Pinnacle and back for coffee at Community Bakery; same time conflict as Tuesday.
- **BikeTown Thursday Intermediate Ride** (Abilene, TX, medium): Thursday 6 pm intermediate road ride (15 to 18 mph) from the shop.
- **BikeTown Tuesday Kids Night at the Trails** (Abilene, TX, medium): Tuesday one-hour trail ride with kids at Buck Creek.
- **Tuesday/Thursday Morning Ride** (Tulsa, OK, medium): The Tulsa club's weekday-morning ride, 20 to 40 miles, with a published start-time table by season.

## Where rides are posted here

- **Google Calendar feeds on club and shop pages (best find).** Kaw Valley Bicycle Club (Topeka) embeds a public calendar: `https://calendar.google.com/calendar/ical/kawvalleybicycleclub%40gmail.com/public/basic.ics`. FAST (Northwest Arkansas MTB) has `https://calendar.google.com/calendar/ical/89f7ec4e4c18338d2c0a632de35e0fb6a564a77c2bab10fa32be100c62732096%40group.calendar.google.com/public/basic.ics`. Big Shark's calendar page embeds 13 calendars; the useful one is Group Rides and Runs (`3f3j0q20e2fv8n8me707fmlg18@group.calendar.google.com`). A page's embed `src=` is base64 of the calendar id. All three are machine-readable and re-checkable.
- **Meetup iCal.** El Paso Bicycle Club: `https://www.meetup.com/ElPasoBicycleClub/events/ical/` (lists Saturday Road Ride and Thursday Morning Cruise only; the Wednesday Night Ride is not on it).
- **WordPress The Events Calendar REST API.** Peel Compton Foundation (Coler, Bentonville): `https://peelcompton.org/wp-json/tribe/events/v1/events?start_date=2026-10-01&end_date=2026-12-31`. The `?ical=1` feed came back empty, the REST API works. The page itself sometimes answers 403 on a repeat fetch.
- **Static club and shop pages (no dates):** Phat Tire (OKC/Edmond/Norman/Tulsa/NWA), Bicycle Pedaler (Wichita), BikeTown (Abilene), Omaha Velo, Oklahoma Bicycle Society, Tulsa Bicycle Club, Big Shark, Sunflower (Lawrence), Springbike, Arkansas Bicycle Club. These show a standing schedule but no ride dates, so a robot can only check that the page still says the same thing.
- **Pages with 2026 dates:** Omaha Pedalers' home page (Oct 10 and Oct 12 events), PBBA's weekly club rides page (2026 season start dates), Ride Tyler's events page (upcoming dates through Oct 15), South Side Cyclery's rides page (Apr 1 to Oct 28 Wednesdays, Nov 11 to Mar 17, Saturdays through Oct 31).
- **Ride Alert app** (ridealert.co) is where Oklahoma clubs (Bicycle League of Norman, Phat Tire Edmond) post each week's rides. It has no public web listing, so it is app-only.
- **Hard to reach:** Cycling KC's weekly group rides calendar is a Styled Calendar embed (id `VK5ydwIYLOEcIj1WVx6L`) and its club calendar is script-built; the Wix events pages of Femmes Gravel and the Strava club pages show only the club blurb. Alpine Shop (St. Louis), Rose City Cycling (Tyler) and some repeat fetches returned 403 and I left them alone.
- **Strava:** club pages load (bikeclubNWA, Fasttrails, 2100996 Bike Shop Joe's, 9880 WTCA) but hide the events behind a login. I found no public Strava event URLs in this area.

## Re-checked

- **KVBC Dover Dogs** (Topeka): seasonal-break. KVBC's public Google Calendar (ICS) shows Dover Dogs as a weekly Thursday 6:00 pm series at Western Hills Church that ends 2026-09-17; the rides page (modified Nov 2025) calls it a spring-fall ride.
- **KVBC Wednesday Slow Roll** (Topeka): seasonal-break. KVBC's public Google Calendar (ICS) shows Wednesday Slow Roll as a weekly 6:10 pm series at the Washburn lot that ends 2026-09-16.
- **South Side Cycling Club Wednesday Evening Ride** (St. Louis): changed. South Side Cyclery's rides page lists 'GNO—Girls Night Out: Wednesdays, April 1–October 28 @ 6pm' (dates match 2026 weekdays) as a welcoming community of women, plus Winter Wednesdays Nov 11–Mar 17; it is a women's ride, not just a pace-group ride.
- **Tour de Coler** (Bentonville): unreachable. Host calendar API lists no Tour de Coler dates after Mar 31, 2026 (Apr-Oct empty, Oct Tuesdays show other programs); series page text still says every Tuesday.
- **El Paso Bicycle Club Saturday Road Ride** (El Paso): confirmed. El Paso Bicycle Club's Meetup iCal feed lists Saturday Road Ride at 7:00 am for Oct 3, 10, 17, 24 and 31, 2026 (fetched Oct 1, 2026).
- **Thursday Morning Cruise** (El Paso): confirmed. El Paso Bicycle Club's Meetup iCal feed lists Thursday Morning Cruise at 7:00 am for Oct 8, 15, 22 and 29 and Nov 5, 2026 (fetched Oct 1, 2026).
- **Tuesday Night Worlds** (Midland): confirmed. PBBA's weekly club rides page lists Tuesday Night Worlds from Energy City Bikes at 6:15 pm, 'Begins March 10, 2026' (fetched Oct 1, 2026; daylight-dependent season).
- **Saturday Coffee Ride** (Midland): confirmed. PBBA's weekly club rides page (2026 season, rides 'begin March 10-11, 2026') lists the Saturday Coffee Ride from Trek Midland at 8 AM, 'will vary with weather', no-drop (fetched Oct 1, 2026).
- **Mission & Monday** (Odessa): confirmed. PBBA's weekly club rides page (2026 season) lists Mission & Monday at Mission Fitness, 6:15 pm, scheduled during daylight saving time as weather permits, organized by West Texas Gazelles Odessa (fetched Oct 1, 2026).
- **Lazy Circles Wednesday Night Ride** (Norman): confirmed. Bicycle League of Norman's home page lists the Wednesday Club Ride at 6:30 pm from Lazy Circles Brewery, three groups, daylight saving time March to November, and links meeting minutes dated March 7, 2026 (fetched Oct 1, 2026).
- **Social Spin Urban Ride** (Tyler): confirmed. Ride Tyler's events page (2026) lists Social Spin on the first and third Thursday, rolling 6:00-6:15 pm from the shop, with upcoming dates Aug 6 and 20, Sep 3 and 17, Oct 1 and 15 (fetched Oct 1, 2026).
- **Ride Tyler Donut Ride** (Tyler): confirmed. Ride Tyler's events page (2026) lists the Donut Ride on first Saturdays at 8:00 AM, no-drop, 'next ride will be on Saturday, September 5th' (fetched Oct 1, 2026).
- **Wednesday Urban Ride** (Tyler): confirmed. Ride Tyler's events page (2026) lists Rose City Cycling's Wednesday Urban Ride every Wednesday at 6:00 PM from the back lot of FRESH by Brookshire's, no-drop, organized by Maureen Mangiameli (fetched Oct 1, 2026).
- **Omaha Pedalers Saturday Morning Easy Trail Ride** (Omaha): confirmed. Omaha Pedalers' home page (shows Oct 10 and Oct 12, 2026 events) lists the Saturday Morning Easy Trail Ride, 9:00 AM at the Stinson Park restrooms, with no end-of-season note, while its Sunday road ride and Thursday taco ride are marked finished for the season (fetched Oct 1, 2026).
- **Big Shark Saturday Mellow Ride** (Richmond Heights): confirmed. Big Shark's public Group Rides calendar (Google Calendar ICS) has a weekly Saturday 7:30 am shop road ride from 1155 S Big Bend running to Oct 3, 2026, and the shop's rides page lists the 7:30 Mellow option with a ride leader March 1 to Oct 31 (fetched Oct 1, 2026).

## Couldn't re-check

These 31 pages loaded (or were reachable) but carried nothing dated 2026 that supports a confirm, so no entry was written and their Checked dates stay at Sept 15 or 18.

- **Sunday Service** (Fayetteville): Rides page was last modified Feb 2025 (WordPress API); the club's calendar page is current to Oct 2026 and the Strava club blurb still lists Sunday Service, but no dated ride entry.
- **Arkansas Bicycle Club Sunday Ride** (Little Rock): Standing Rides page says every week at 1:00 pm but is undated; the club's home page does list Oct 3 and Oct 10, 2026 events, so the club is active.
- **Heels on Wheels Monday Ride** (Little Rock): Only on the City of Little Rock weekly-activities list, last modified Jul 11, 2025.
- **BRBC Monday Social Ride** (Leawood): Page says the season runs March to September and is undated; the ride is off-season now.
- **Big Shark West Saturday Gravel Growl** (Chesterfield): Rides page says it rolls year round, undated; the shop's calendar has no 2026 Gravel Growl entry (its last series ended in 2022).
- **KC Critical Mass** (Kansas City): Site says last Friday of the month, 6:30 meet, undated; the group posts news on Facebook.
- **Women-Led Cycling Wednesday Night Ride** (Kansas City): Only a link list on BikeWalkKC (undated); the ride lives on Instagram.
- **The Bike Way / Omaha Velo Monday Shop Ride** (Omaha): Group rides page lists it, undated.
- **Tuesday Night Women's Gravel Ride** (Papillion): Group rides page lists it, undated.
- **Edmond Tuesday Casual Ride** (Edmond): Club page lists it for April to September, undated (copyright 2026).
- **Monday Nights at Arcadia Trails** (Edmond): Shop page lists it, footer says 2026, rides are posted on Ride Alert; no dates.
- **Phat Tire Edmond Tuesday Night Road Ride** (Edmond): Same page as above; no dates.
- **Lake to Lake Friday Ride** (Oklahoma City): Same page as above; no dates.
- **OBS Donut Ride** (Oklahoma City): Club page lists it year-round at 9:04 am, undated (copyright 2026).
- **Major Taylor Cycling Club Little Rock Evening Ride** (Little Rock): Only on the City of Little Rock list (Jul 2025); the club's own site shows a calendar link but no dates.
- **Babes on Bikes Weekly Ride** (Emporia): Visit Emporia's page no longer gives a day or time for Babes on Bikes; it says to follow their Facebook page. Worth a human look.
- **The Sunday Chug** (Lawrence): Sunflower's events page lists it (typically 8:30), undated; ride details are on Strava.
- **Velas Thursday Women's Ride** (Lawrence): Sunflower's events page lists Thursdays at 6 p.m., undated; ride info is on Instagram.
- **Final Fridays (Critical Mass)** (Manhattan): Page says Final Friday at 7:00 pm and the site nav names Tour de Taco 2026, but the ride page has no date.
- **Bicycle Pedaler Monday Gravel Ride** (Wichita): Shop page (copyright 2026) lists Monday nights April to October, undated.
- **KSS Thursday Night MTB Ride** (Wichita): Listed on the Bicycle Pedaler page, undated; the KSS site (copyright 2026) does not mention the ride.
- **Girl Bike Gang Monday Ride** (Kansas City): Instagram only.
- **KC Family Bike Ride** (Kansas City): Instagram only.
- **Springbike Tuesday Night Ride** (Springfield): The page loaded but its weekly rides heading reads 'Springbike Weekly Rides for 2025'. Springbike also requires membership for its rides.
- **Springbike Thursday Night Social Ride** (Willard): Same page; heading says 2025.
- **Tuesday Nacho Ride** (Lincoln): Bike Cass County and Bailey's Local pages say Tuesday evenings May to September, undated; season is over.
- **Saturday Morning Nomad Leisurely Ride** (Tulsa): Club page is undated and the calendar is script-built. The page's start-time table puts fall mornings at 9:00 am; the listing says 8:00 am. Check against the club calendar.
- **Tuesday Evening Leisurely Ride** (Tulsa): Club page is undated and the calendar is script-built.
- **BikeTown Monday Easy Ride** (Abilene): Shop page lists Every Monday 6 PM, undated.
- **WTCA Saturday Ransom** (Lubbock): Club page lists Saturday 8:00 AM, undated; the club points to Facebook for updates.
- **WTCA Tuesday/Thursday Ransom Ride** (Lubbock): Club page lists 8:00 AM and 5:30 PM, undated.

## Rejected

- **St. Charles Group Rides, Monday Night Ride A/B/C** (St. Charles, MO, Big Shark's calendar): the weekly series is set to end Sep 1, 2026. Ended for the season, seen Oct 1, 2026.
- **Big Shark Gravel Growl calendar entries**: the calendar's Gravel Growl series ended in July 2022; the rides page still says it rolls year round. Not used as proof.
- **Springbike Monday and Wednesday Night Rides** (Rogersville, Republic): the club page lists them under 'Weekly Rides for 2025'. Also member-only by insurance.
- **Tour de Coler** (existing ride): host calendar shows no dates after Mar 31, 2026; see Re-checked.
- **KVBC Dover Dogs and Wednesday Slow Roll**: weekly series ended Sept 17 and 16, 2026 on the club calendar. Marked seasonal-break.

## Couldn't confirm

For a local rider to check by hand. Name, host, day, time, start, where I saw it, handle or URL.

- **Bike Shop Joe's Wednesday Night Social Ride**, Bike Shop Joe's, Bentonville. Wednesday evening, time not given. Gravel cruise about 12 mph, no-drop, ride lead and sweep. Visit Bentonville guide (May 11, 2026). Strava club https://www.strava.com/clubs/2100996, Facebook https://www.facebook.com/bikeshopjoes. The shop's homepage lists no ride.
- **Weekend Warm Up**, OZ Cycling Tours with the Bentonville Area Chamber, Bentonville. Fridays 3 pm, chamber parking lot, no-drop, different ride types each week. Aimed at chamber members and partners; I left it out for that reason. Visit Bentonville guide (May 2026).
- **All Bikes Welcome and All Bodies on Bikes Bentonville chapter**, Bentonville and NW Arkansas. Seasonal rides and meet-ups, no day or time found. https://www.allbikeswelcome.org/ and https://www.allbodiesonbikes.com/
- **Party Pace Pedalers**, Raytown, MO. Monday night, Rock Island Trail, no time. Instagram https://www.instagram.com/partypacepedaler (BikeWalkKC's Rides and Resources page, undated).
- **Women Cycle KC**, North Kansas City, MO. Tuesday night group ride, no time. Facebook https://www.facebook.com/Women-Cycle-KC-614498688914306/ (same BikeWalkKC list).
- **All Bodies on Bikes Kansas City**, group rides, no schedule. Facebook https://www.facebook.com/AllBodiesOnBikesKansasCity
- **Cycling KC weekly group ride calendar**, Kansas City. 'Rides for every level of cyclist on almost every day of the week', open to non-members, pace letters A+ to D plus No-Drop. The calendar is a Styled Calendar embed I could not read: http://cyclingkc.org/content.aspx?page_id=22&club_id=368691&module_id=198123. A person can open it and read dozens of KC rides, including no-drop ones.
- **Alpine Shop Tuesday Night Rides**, Alpine Shop, Kirkwood, MO (440 N Kirkwood Rd). Weekly Tuesday series through Oct 27, 2026 on Big Shark's Group Rides calendar, no time. The shop's page returned 403.
- **Little Rock weekday rides** (City of Little Rock weekly-activities list, last modified Jul 2025, so too old to list): CARVE Ladies Only, Monday and Wednesday 6:00 pm, Two Rivers Bridge, beginner to intermediate, 20 miles; CARVE Tuesday 6:15 pm Chenal Kroger and Wednesday 5:45 pm Big Dam Bridge; Chainwheel Tuesday 6:00 pm Clinton Library and Saturday 7:30 am Murry Park Pavilion 2; RevRock Tuesday and Wednesday 5:45 pm Big Dam Bridge; CATA mountain bike Wednesday 6:00 pm Camp Robinson; Heels on Wheels Thursday 6:00 pm Big Dam Bridge NLR and Saturday 8:30 am NLR Submarine. https://littlerock.gov/residents/bikeped-little-rock/community/weekly-activities/
- **Wichita groups** linked from Bicycle Pedaler's page, all Facebook: Women of Wednesday (WOW, Wednesday morning, leisure ride for women), ICT Moxie Chicks, Black Girls Do Bike, Women Bike ICT, West Wichita Bicycle Chicks, ICT Gravel After Dark, Sunday Dose of Vitamin G (https://www.facebook.com/groups/SundayDoseOfVitaminG/). No days or times for most. https://www.bicyclepedaler.com/articles/rides-events-pg202.htm
- **El Paso Wednesday Night Bike Ride (WNBR)**, El Paso Bicycle Club. Fast, leaderless 20-mile club loop, runs with daylight saving time, start time changes through the season, 'check our calendar'. Not on the club's Meetup feed. https://elpasobicycleclub.com/club-rides/
- **WTCA Saturday gravel and pop-up rides**, West Texas Cycling Association, Lubbock. Facebook only.
- **BRBC Saturday rides** (Blue River Bicycle Club, Leawood KS): Le Coffee Ride 7:15 am (advanced, 17 miles) and Club Ride 9:00 am (drop, 40 miles) from Elite Cycling at Mission Farms. Season March to September, page undated.
- **Omaha Pedalers Sunday Morning Road Ride** (no-drop, Farmer Brown's in Waterloo) and **Thursday Bellevue Taco Ride**: both marked 'Finished for the Season' on the club's home page (Oct 1, 2026). Re-check in spring.
- **Omaha Velo Saturday ride from Roast Coffeehouse** in Aksarben, 9:00, May to September, no-drop. Off season. https://www.omahavelo.com/group-rides
- **Fayetteville Bike Club Weeknight Worlds**, Puritan on Dickson St, Tuesday 5:55 pm 'on selected evenings', race pace. Irregular, so not listed. https://bikeclub.bike/rides/
- **Tulsa, Springfield, Columbia, Lincoln, Amarillo**: nothing new reachable. Amarillo and Columbia had no club or shop page I could follow from a page already fetched.

### Host-cap extras

Rides found with proof but not added because the host is already at 3 on the site.

- **KVBC Night Light Ride**, Kaw Valley Bicycle Club, Topeka. Tuesdays 6:10 pm from Pizagel's (2830 SW Fairlawn Rd), weekly Sep 22, 2026 to Mar 16, 2027 per the club's calendar feed; casual, lights required. This is the live Tuesday ride now that Dover Dogs and the Slow Roll are on break.
- **KVBC Saturday Midday/Evening Ride**: weekly Saturdays, 1:00 pm in fall and winter, location varies (club calendar, from Sep 12, 2026).
- **Phat Tire Party Laps After Dark**, Phat Tire Bike Shop, Oklahoma City. Thursdays 6:00 pm from Bluff Creek MTB Trailhead, two groups, helmets and lights required, co-sponsored by Anthem Brewing. Shop page (copyright 2026, undated). https://www.phattirebikeshop.com/articles/oklahoma-group-rides-pg375.htm
- **OBS Casual Ride**, Oklahoma Bicycle Society. Saturdays April to October, 7:30 am in June to August and 8:30 am otherwise, 12 to 14 mph, no-drop, 26 to 42 miles, start rotates weekly.
- **BikeTown Thursday Old Coleman Highway climb** (faster group, 6:30 pm from Mueller Metal Building on Hwy 18) and first-Thursday time trial, Abilene.
- **Tulsa Bicycle Club Saturday Morning Club Ride and Saturday Morning Leisurely Ride**, Tulsa; location posted on the club calendar.
- **Peel Compton Foundation** is at 2 (Tour de Coler, women's social); no extras.

## Stats

- Candidates looked at: about 45 (existing rides re-read plus new leads).
- Listed: 22 (7 high, 15 medium).
- Couldn't confirm: 18 leads in the list above (some bundle several rides).
- Rejected as ended or changed: 5 (see Rejected); plus 2 existing rides moved to seasonal-break and 1 changed.
- Page fetches: about 170, including curl pulls of ICS feeds and APIs.
- Tools that worked well: Google Calendar ICS, Meetup ICS, The Events Calendar REST API, `wp-json` page `modified` dates, Wayback was reachable but not needed.

## Sources

- https://bikeclub.bike/rides/
- https://bikeclub.bike/calendar/
- https://arkansasbicycleclub.org/Standing-Rides-(every-week)
- https://arkansasbicycleclub.org/
- https://littlerock.gov/residents/bikeped-little-rock/community/weekly-activities/
- https://www.blueriverbicycleclub.com/weeklyrides
- https://kvbc.org/rides/
- https://kvbc.org/events-calendar/
- https://calendar.google.com/calendar/ical/kawvalleybicycleclub%40gmail.com/public/basic.ics
- https://www.bigshark.com/articles/group-training-rides-pg334.htm
- https://www.bigshark.com/articles/rides-races-event-calendar-pg22.htm
- https://calendar.google.com/calendar/ical/3f3j0q20e2fv8n8me707fmlg18%40group.calendar.google.com/public/basic.ics
- https://www.kccriticalmass.com/
- https://www.kccriticalmass.com/calendar
- http://cyclingkc.org/content.aspx?page_id=22&club_id=368691&module_id=198123
- https://cyclingkc.org/content.aspx?page_id=4001&club_id=368691
- https://www.southsidecyclery.com/articles/rides-events-pg243.htm
- https://opbc.clubexpress.com/
- https://www.omahavelo.com/group-rides
- https://www.okcbike.org/content.aspx?page_id=22&club_id=437396&module_id=453248
- https://www.phattirebikeshop.com/articles/oklahoma-group-rides-pg375.htm
- https://www.bicycleleagueofnorman.com/
- https://elpasobicycleclub.com/club-rides/
- https://www.meetup.com/ElPasoBicycleClub/events/ical/
- https://peelcompton.org/event/tour-de-coler-weekly-group-ride-24-3/2026-03-03/
- https://peelcompton.org/wp-json/tribe/events/v1/events
- https://www.visitbentonville.com/blog/stories/post/bentonville-group-rides-your-guide-to-the-citys-cycling-scene/
- https://visitemporia.com/place/community-group-rides/
- https://www.sunfloweroutdoorandbike.com/articles/upcoming-events-pg197.htm
- https://www.bikewalkmhk.com/finalfridays
- https://www.bicyclepedaler.com/articles/rides-events-pg202.htm
- https://www.kssingletrack.com/
- https://bikewalkkc.org/education/womenbikekc/resources/
- https://www.springbike.org/rides/club-rides/
- https://www.springbike.org/resources/local-cycling/
- https://www.bikecasscounty.com/eaglenachoride
- http://www.baileyslocal.com/tuesday-nacho-rides.html
- https://tulsabicycleclub.clubexpress.com/content.aspx?page_id=22&club_id=539195&module_id=107729
- https://ridewithgps.com/organizations/710-tulsa-bicycle-club
- https://www.biketown.com/articles/rides-and-events-pg37.htm
- https://bikewtca.org/club-rides/
- https://pbbatx.com/weekly-club-rides
- https://www.ridetyler.com/articles/upcoming-events-pg195.htm
- http://www.mtcc-lr.com/
- https://fasttrails.org/
- https://fasttrails.org/weekly-wednesday-rides/
- https://calendar.google.com/calendar/ical/89f7ec4e4c18338d2c0a632de35e0fb6a564a77c2bab10fa32be100c62732096%40group.calendar.google.com/public/basic.ics
- https://www.femmesgravel.com/
- https://www.femmesgravel.com/event-list
- https://www.trackstandcyclery.com/
- https://www.bikeshopjoes.com/
- https://www.allbikeswelcome.org/
- https://www.allbodiesonbikes.com/
- https://www.strava.com/clubs/bikeclubNWA
- https://www.strava.com/clubs/9880
- https://www.strava.com/clubs/2100996
- https://www.strava.com/clubs/Fasttrails
- https://content.rapha.cc/us/en/clubhouses/bentonville
- https://www.ridealert.co/
