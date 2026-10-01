# az-scottsdale-north: group rides report

- **Region id:** az-scottsdale-north
- **Agent:** group-ride scout (Claude), Scottsdale and north Valley sweep
- **Date:** Wednesday, Sept 30, 2026 (Arizona time)
- **Area:** Scottsdale (all), Paradise Valley, Fountain Hills, Rio Verde, Cave Creek, Carefree, North Phoenix (Desert Ridge, Norterra, Anthem, Deer Valley), McDowell Mountain Regional Park
- **Files:** `az-scottsdale-north.json` (11 records) and this report

## Summary

Listed: **11 rides**. 4 high, 7 medium.

| City | Rides listed |
|---|---|
| Scottsdale | 8 |
| Fountain Hills | 2 |
| Cave Creek | 1 |
| Paradise Valley, Carefree, Rio Verde, North Phoenix, McDowell Mountain Regional Park | 0 (see below) |

By type: road 6, MTB 2, gravel 1, social 2. Women's ride: 1. No-drop: 2. Beginner-friendly: 1. LGBTQ: 0. BIPOC: 0.

The target was 30+. I stopped at 11. Most rides in this part of the Valley are posted on Facebook, on Instagram, or on Strava events behind a login, and I won't list a ride I can't prove is still on. Ten names went to "Couldn't confirm". That list is the short list for Robert's own knowledge of the scene.

Nothing verified in Paradise Valley (the Tuesday rides loop through it but start in Scottsdale), Carefree, Rio Verde, Anthem, Desert Ridge, Norterra or Deer Valley. McDowell Mountain Regional Park has no listing of its own: two Fountain Hills shop rides roll from its Four Peaks lot (the Tuesday Night MTB, already on the site, and the Ladies ride listed here).

Already on the site and re-checked today on the shop's page: McDowell Mountain Cycles' Tuesday Night MTB (7:00 pm, Four Peaks lot) and Sunday Funday Gravel (6:00 am, Oct 4 and Oct 25).

## Notes for the editor

1. **Scottsdale is over the 6-per-city guide.** It has 8 here, plus 2 already in `scottsdale-cycling.json`. If you trim, drop in this order: The Bike Lane (irregular, no fixed start), Cyclologic Sunday gravel (no time or place), then the TriScottsdale Tuesday and Thursday rides (medium).
2. **McDowell Mountain Cycles would have 4 rides on the site** (2 existing, 2 here) against a max of 3 per host. The Ladies MTB ride is the one to drop, or fold into a description.
3. **Cyclologic's Saturday start place is not on its page.** I put the shop address in `start_location` and said so in the name. Older Strava listings (2019, 2020) give the shop as the meeting spot. Null the address if you want to be strict before geocoding.
4. **TriScottsdale Saturday start times change by month.** `start_hhmm` is the October time (6:30). The full table is in `schedule`. The club's calendar sheet covers 2026 only.
5. **Existing record `phoenix-az-bullshifters-saturday-club-ride` says 07:30.** The club's page today says October rides start at 7:00 (Oct 3 and 10) and 7:30 (Oct 17, 24 and 31).
6. **The DFMBA ride is invisible to a plain page read.** The events page builds its ride list in the browser from `https://www.dfmba.org/_data/events.json`. The re-check robot should read that file.
7. **Strava event pages hide the year.** The visible page says "Oct 6 Tue". The full date is in the page's embedded JSON (`script#__NEXT_DATA__`, `event.occurrences[].occurrenceDateTime`).
8. **Google Sites pages hide an edit date.** "Page updated" renders blank, but the raw HTML carries `data-last-updated-at-time` (epoch milliseconds). That is how I dated the OutCyclists page (May 19, 2022).
9. **Outside my area, for the Tucson scout:** Fair Wheel Bikes' Strava event 73667/4582 showed a "Tuesday Morning Ride", next Tue Oct 6, 2026 at 6:30 am from 825 E University Blvd, Advanced / Rolling. The existing TMFR record says 07:00. It may be a different ride, so check.
10. **Web search ran out** (the session's 200) before I could probe more Strava event pages for Cave Creek, Carefree and North Phoenix. Those towns may have more than I found. I read about 135 pages against a budget of about 120.

## Why these

1. **Gainey Tuesday (Flat Route), Scottsdale Cycling.** The fast Paradise Valley loop out of Gainey Village at 5:30 am, with crit-style sections and two regroups. It joins the club's Thursday and Saturday rides already on file.
2. **TriScottsdale Saturday Group Ride.** Two pace groups (19 mph and 15 to 17), 50 to 60 miles from the Village Tavern, and a public calendar that names every week's route and start time.
3. **TriScottsdale Flat and Fast, Tuesday.** The dawn ride around Paradise Valley. The club's page says to just show up.
4. **TriScottsdale Six-Hill Thursday.** Short hills in a row at Hidden Hills. The training ride of the week.
5. **Cyclologic Saturday Group Ride.** Four pace groups from 15 to 17 mph up to 22+, with a C group for people new to riding in groups. Rolls at 6:30 sharp.
6. **Cyclologic Sunday Gravel Ride.** All abilities, out and back, a new time and place every week. Bring your own flat kit.
7. **Tuesday Night Bike Ride from R.T. O'Sullivan's.** An after-dark social ride on the Greenbelt to Tempe Town Lake with regroups. Weekly on Meetup through Dec 29.
8. **The Bike Lane AZ bike-path rides.** Easy, no-drop path rides for people with no current riding experience. The season opens Oct 10 in Scottsdale.
9. **MMC Saturday Road Ride, Fountain Hills.** A no-drop 30+ miles from McDowell Mountain Cycles, with the route shared first.
10. **MMC Ladies Mountain Bike Ride.** The shop's women's MTB ride in McDowell Mountain Regional Park. Next one is Monday Oct 12. The day moves, so check its Facebook page.
11. **DFMBA Saturday Group Rides, Cave Creek.** The one weekly MTB ride I could find for Cave Creek and Carefree, from the trail association itself. The trailhead rotates.

## Where rides are posted in this area

**Words.** Locals say "shop ride", "group ride", "TNR" (Tuesday Night Ride), "Night Rider", "Pedals and Pints", "Funday", "no-drop", and A / B / C groups. "Wheels down" and "roll out sharp" mean the start time is firm. "Gainey" means a start at Gainey Village (Scottsdale Rd and Doubletree Ranch Rd).

**Where rides are published.**
- **Strava club event pages.** Scottsdale Cycling (club 620243, 1,077 members) posts its Gainey rides here. One event page loads without a login and shows the next date, the start address and the club's level rating. A recurring event keeps one URL. The club's event list needs a login, so search engines are how you reach the pages. Other Strava clubs in the area keep their events behind the login: Dynamite Bike Lab (club 1049615, 408 members), Caffeine and Watts (club 2327, 198), Scottsdale Bike Company (club 1179621, 128), OutCyclists (club "outcyclists", 26).
- **Public calendar sheets.** TriScottsdale keeps a Google Sheet of every 2026 Saturday ride, with route and start time. The CSV export (`.../export?format=csv`) loads without a login.
- **Shop pages.** Cyclologic has a Squarespace page (add `?format=json` to see `collection.updatedOn`). McDowell Mountain Cycles edits its page by hand each month with dates, and says to confirm times on Facebook. Dynamite Bike Lab's home page says weekly rides leave the shop, but its events page only lists one-offs (it loads them from `https://storefrontapi.masterlinq.io/api/ecom/events` with the header `X-Account-Code: PEG`).
- **Meetup.** Only two groups post rides in this area: Phoenix Hiking, Biking and Everythinging Group, and The Bike Lane. Both have ICS feeds at `/events/ical/`. The Meetup city pages (`/find/us--az--scottsdale/cycling/`) embed every upcoming event as JSON-LD, which is a quick way to see all groups at once.
- **Trail association data files.** DFMBA's ride list sits in `_data/events.json`, read by the page's script.
- **Facebook and Instagram only.** McDowell Mountain Cycles' weekly times, Cyclologic's Sunday gravel place, Bullshifters' Tuesday and Thursday rides, OutCyclists' events, Dynamite Bike Lab's weekly rides, DFMBA's weekly trailhead.
- **Shops with no ride published:** Bicycle Haus (Scottsdale), Bicycles of Scottsdale, Sunset Cyclery (Anthem). Scottsdale Bike Company points to its Strava club. Landis Cyclery's calendar page is empty.

**Rhythm.** Start times move with the heat and the light. TriScottsdale's Saturday ride is 5:30 am from late June to August, 6:00 am in spring and September, 6:30 in October, 7:00 in November and March, 7:30 from December to February. The Gainey rides stay at 5:30 am, which is dark most of the year. Evening rides run late in the heat: R.T. O'Sullivan's moved to 7:15 pm because of the daytime heat, and the MMC Tuesday night MTB ride was at 7:30 pm in August 2025 and is at 7:00 pm now. Sunrise is near 6:30 am in early October.

**Visitor norms.**
- Scottsdale Cycling's Strava club is invite-only (its description says to invite yourself), and you need to be in it to see the route.
- Bring front and rear red lights for any start before sunrise. The Gainey Tuesday description asks everyone to obey stop signs and lights.
- TriScottsdale says "or just show up" and keeps a waiver on its site. The Bike Lane asks for its liability waiver when you RSVP on Meetup.
- Cyclologic asks you to call the shop for the Sunday gravel time and place.
- Gravel and MTB rides expect you to carry your own flat kit. Carry more water than you think you need.
- Wheezers and Geezers (Paradise Valley) is a fast group. Its own page says new riders should contact the group first and be comfortable at 20+ mph while drafting.

**Re-check sources.**
- Machine-readable: the two Meetup ICS feeds; the TriScottsdale sheet's CSV export; Strava event pages (date in `__NEXT_DATA__`); DFMBA's `_data/events.json`; Cyclologic's `?format=json` (edit date only).
- Hand-checked: McDowell Mountain Cycles' rides page (monthly); TriScottsdale's group workouts page (no dates on it).

**Not reached from here.** clippedin.bike (certificate error), themoxiemultisport.com and mountainbikerlady.com (no DNS), caffeineandwatts.com (bot wall, 429), carefreecavecreek.org (403), outcyclists.org and mcdowellcycling.com (no DNS), arizonatri.com and moxiebikeshop.com's location page (connection failed). Leads not tried: Team One Racing (teamoneracing.com, a Scottsdale masters race team, from PMBC's links page).

## Rejected

Ended, suspended or changed:

- **Flat Tire Bike Shop, Cave Creek: Wednesday Night Ride and Sunday Morning Ride.** The shop's rides page says "ALL GROUP RIDES ARE SUSPENDED UNTIL FURTHER NOTICE" (page undated). Its event calendar lists no events. Fetched Sept 30, 2026. https://flattirebikes.com/bike-shop-rides/
- **No Woman Left Behind AZ (women's group, Scottsdale).** The blog's newest post is March 30, 2022. Posts from 2014 mention a Sunday ride from Paradise Bakery at Doubletree and Scottsdale Rd. No current schedule anywhere I could read. https://nowomanleftbehindaz.blogspot.com/
- **Cyclologic Strava events, three of them.** Oct 5, 2019 (event 588581), Oct 12, 2019 (593176), Feb 1, 2020 (651519). One-off past dates and nothing newer. The ride itself is listed from the shop's own page.
- **Cyclologic's old /group-rides page ("Cyclo Club").** 404. The page moved to /shoprides.
- **Equality Arizona "Queer People Fit: Cycling" (monthly, with OutCyclists and Bike Saviours).** Newsletter dated Aug 18, 2022. Nothing newer. https://equalityarizona.substack.com/p/lgbtq-community-events-in-august

Unfit leads (not rejected as ended):

- **Hills Angels.** The only public team under that name I found is in Zurich. No Arizona ride calendar.
- **Now Bikes** is in St. Paul, Minnesota.
- **Global Bikes Meetup rides** are in Chandler, Gilbert and Ahwatukee (East Valley and Phoenix scouts).
- **Valley Epic Rides** run at South Mountain and Trail 100 (Phoenix scout).
- **Bicycle Haus** (7113 E 1st Ave, Scottsdale). The site publishes no group ride. Its "Social" page is an Instagram feed.
- **Bicycles of Scottsdale, Sunset Cyclery (Anthem).** No group ride on either site.
- **AZ Women Racing Team** (Strava club, 20 members). A race team. No ride schedule.
- **TriScottsdale Friday Mummy Mountain Hill Run.** A run, not a ride.
- **Arizona Endurance Riders** (RideWithGPS club). The page loads but shows no events without a login.

## Couldn't confirm

Robert will check these by hand. In each entry: name, host, day, time, start, where I saw it, URL or handle.

1. **OutCyclists Thursday sunset social ride.** Host: OutCyclists Phoenix LGBT Cycling Club (founded 2020, per its site). Thursday, "almost weekly". Wheels down 5:45 pm in winter, 6:45 pm in summer, about 20 miles, no-drop. Start: "greater Old Town Scottsdale area (but sometimes elsewhere)". Also an occasional weekend morning ride, 30 to 40 miles at a 14 mph tempo. Seen on the club's Google Site, which was last edited May 19, 2022, still mentions the public health situation, and says to check Facebook for each ride. An Aug 2022 Equality Arizona newsletter named the club as a partner. Nothing dated after 2022. It is the only queer ride I found in the area, so check it first. https://sites.google.com/view/outcyclists/ · Strava https://www.strava.com/clubs/outcyclists · Facebook https://www.facebook.com/groups/outcyclists/
2. **Dynamite Bike Lab weekly shop rides (road, gravel, MTB).** Host: Dynamite Bike Lab, 28170 N Alma School Pkwy #107, Scottsdale, AZ 85262. Days and times are not published. The home page says "Road, gravel and mountain bike group rides leave from our shop location each week". The events page lists only three one-offs: Oct 16 season-kickoff happy hour, Nov 7 Bike MS, Dec 5 Christmas Road and Dirt Ride. Strava club events need a login. https://www.dynamitebikelab.com/ · https://www.strava.com/clubs/1049615
3. **Caffeine and Watts (Moxie Bike Shop).** Host: Moxie Bike Shop, Scottsdale. Day, time and start unknown. The Strava club page shows "Upcoming Club Event" behind a login. The team page says monthly rides go out in the newsletter and still says "Applications for 2024 are OPEN". caffeineandwatts.com is behind a bot wall. https://www.strava.com/clubs/2327 · https://www.moxiebikeshop.com/service/moxie-team/
4. **Scottsdale Bike Company group rides.** Host: Scottsdale Bike Company. Strava club description: "Keep an eye out for group rides as we post them!" No day, time or start published. https://www.strava.com/clubs/1179621 · https://scottsdalebikeco.com/
5. **Landis Cyclery group rides (north Scottsdale store).** Host: Landis Cyclery. Its Events and Rides Calendar page has no entries and carries a 2022 copyright. https://www.landiscyclery.com/articles/events-rides-calendar-pg72.htm
6. **PMBC Saturday Via Linda ride, Scottsdale.** Host: Phoenix Metro Bicycle Club. "Every Saturday". Time by month (7:00 am in October; 8:00 Dec to Feb; 7:30 Mar, Apr, Nov; 6:00 Jun to Aug; 6:30 Sept). Start: Mountain View and Hayden, southeast corner parking lot (Starbucks and Circle K). About 14 mph, 30 to 45 miles, stops for coffee. Seen on PMBC's weekly ride descriptions page, but the ride page still says "Please be vaccinated", and the ride is not on PMBC's September or early October 2026 calendar, though the club's Tempe, Chandler and Granada rides are. No dated sign of life. The ride page names a ride leader and phone number, which I left out. https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=364297
7. **Wheezers and Geezers, Paradise Valley.** Host: Wheezers and Geezers (group began in 2000, 250+ members per its About page). Saturdays per PMBC's links page. Its own pages give no day or time. Routes and times are "posted via a group email, Ridewithgps and Facebook". Start: the roundabout at Invergordon and Northern. Typically 30 to 40 miles, 20+ mph on the flats, regroups at the top. New riders must contact the group first. No dates on the pages. https://www.wheezersandgeezers.com/about-us · https://www.wheezersandgeezers.com/local-rides
8. **Bullshifters Tuesday and Thursday rides.** Host: Bullshifters Bicycling Club. Tuesdays and Thursdays, from Moon Valley Park (7th Ave and Coral Gables), posted "as occurrence" on Facebook and a Google Group, with no fixed time. The Saturday club ride is already on the site. https://bullshifters.org/upcoming-bull-shifter-rides-club-events/ · Facebook: facebook.com/BullShiftersBicyclingClub (as written on the club's page)
9. **MMC Thursday Pedal and Pints + Social.** Host: McDowell Mountain Cycles. Thursday evening. The shop's page says "Next date TBD". Meet at the Fountain Hills Park playground by the turtle statue. Ride starts and ends at Euro Pizza Cafe, 15 to 18 miles, social at 7:30 pm. An Aug 2025 Chamber listing had it on Thu Aug 28 at 6:30 pm. https://mcdowellmountaincycles.com/mmc-life/ · https://cm.fhchamber.com/events/details/mcdowell-mountain-cycles-august-group-rides-49986
10. **McDowell Cycling, Scottsdale.** Host: McDowell Cycling. PMBC's links page says it is a Scottsdale group that rides around the McDowell Mountains, with a ride schedule on its site. The domain does not resolve from here. Probably gone. http://www.mcdowellcycling.com/

## Events

Big annual events worth the 2027 calendar (not group rides):

1. **Tour de Scottsdale.** Scottsdale. April 2027 (Thu Apr 8 to Sat Apr 10; ride day Sat Apr 10, 28 and 54 miles). The 2026 ride was Mar 28, per TriScottsdale's calendar. https://www.tourdescottsdale.org/
2. **Bike MS: Arizona.** Fountain Hills. November (Nov 7 and 8, 2026; routes of 25 to 75 miles plus a 19-mile trail ride). Dynamite Bike Lab runs a rest stop. https://events.nationalmssociety.org/2765
3. **Cave Creek Cactus Classic (C4).** Cave Creek. November (Sat Nov 14, 2026, 8:30 am start; a 25-mile MTB race run by DFMBA). https://www.dfmba.org/events

## Stats

- Candidates looked at: 39 (11 listed, 10 couldn't confirm, 8 rejected as ended or changed, 10 unfit leads)
- Listed: 11 (4 high, 7 medium)
- Couldn't confirm: 10
- Rejected as ended, suspended or changed: 8 (Flat Tire Wednesday and Sunday rides, No Woman Left Behind, three old Cyclologic Strava events, Cyclologic's moved page, Equality Arizona 2022)
- Already on the site, skipped as duplicates: MMC Tuesday Night MTB, MMC Sunday Funday Gravel, Bullshifters Saturday Club Ride; Gainey Thursday and The Saturday Ride from `scottsdale-cycling.json`
- Fetches: about 135 page reads (budget was about 120). Searches: 71.

## Sources

Every URL read. Pages marked (WebFetch) were read through WebFetch because the shell could not reach them.

**Strava**
- https://www.strava.com/clubs/620243/group_events/814572
- https://www.strava.com/clubs/620243/group_events/815123
- https://www.strava.com/clubs/620243
- https://www.strava.com/clubs/scottsdale-cycling-620243
- https://www.strava.com/clubs/465038/group_events/588581
- https://www.strava.com/clubs/465038/group_events/593176
- https://www.strava.com/clubs/465038/group_events/651519
- https://www.strava.com/clubs/2327 and https://www.strava.com/clubs/moxie-multisport-2327 (WebFetch)
- https://www.strava.com/clubs/1049615 (WebFetch)
- https://www.strava.com/clubs/1179621
- https://www.strava.com/clubs/outcyclists (WebFetch)
- https://www.strava.com/clubs/az-women-s-racing-team-111045
- Read and set aside (other states or not rides): https://www.strava.com/clubs/168808/group_events/377862, https://www.strava.com/clubs/87737/group_events/712023, https://www.strava.com/clubs/284586/group_events/469328, https://www.strava.com/clubs/73667/group_events/4582, https://www.strava.com/clubs/44180, https://www.strava.com/clubs/UnlistedRC, https://www.strava.com/clubs/bicycle-ranch-2630

**TriScottsdale**
- https://triscottsdale.com/group-workouts
- https://triscottsdale.com/calendar (404)
- https://triscottsdale.com/sitemap.xml
- https://triscottsdale.com/sitemap.website.xml
- https://docs.google.com/spreadsheets/d/1icHTpSwPk8BtJCVjNJe_UbuF_DrIowfoVp0UIjHI9qE/edit?usp=sharing
- https://docs.google.com/spreadsheets/d/1icHTpSwPk8BtJCVjNJe_UbuF_DrIowfoVp0UIjHI9qE/export?format=csv
- https://triscottsdale.teamapp.com/ (loads, script only)

**Cyclologic**
- https://www.cyclologic.com/shoprides
- https://www.cyclologic.com/shoprides?format=json
- https://www.cyclologic.com/group-rides (404)

**McDowell Mountain Cycles and Fountain Hills**
- https://mcdowellmountaincycles.com/mmc-life/
- https://mcdowellmountaincycles.com/join-mmc-adventures/
- https://cm.fhchamber.com/events/details/mcdowell-mountain-cycles-august-group-rides-49986
- https://cm.fhchamber.com/events/search?q=mcdowell+mountain+cycles
- https://cm.fhchamber.com/events/calendar/2026-09-01
- https://cm.fhchamber.com/events/calendar/2026-10-01

**Meetup**
- https://www.meetup.com/phoenix-hiking-biking-and-everythinging-group/events/316479853/
- https://www.meetup.com/phoenix-hiking-biking-and-everythinging-group/events/ical/
- https://www.meetup.com/phoenix-hiking-biking-and-everythinging-group/
- https://www.meetup.com/the-bike-lane/
- https://www.meetup.com/the-bike-lane/events/316264005/
- https://www.meetup.com/the-bike-lane/events/ical/
- https://www.meetup.com/the-bike-lane/events/?type=past
- https://www.meetup.com/find/us--az--scottsdale/cycling/
- https://www.meetup.com/find/us--az--scottsdale/mountain-biking/
- https://www.meetup.com/find/us--az--fountain-hills/road-cycling/
- https://www.meetup.com/find/us--az--cave-creek/cycling/
- https://www.meetup.com/find/us--az--anthem/cycling/
- https://www.meetup.com/find/us--az--phoenix/cycling/
- https://www.meetup.com/find/us--az--phoenix/mountain-biking/
- https://www.meetup.com/global-bikes-meetup/events/ical/
- https://www.meetup.com/valley-epic-rides/events/ical/
- https://www.awildadventure.com/the-bike-lane-az
- https://www.thebikelaneaz.com/

**DFMBA (Cave Creek)**
- https://www.dfmba.org/
- https://www.dfmba.org/events
- https://www.dfmba.org/events.html
- https://www.dfmba.org/js/content.js
- https://www.dfmba.org/_data/events.json

**Clubs, shops and others**
- https://sites.google.com/view/outcyclists/
- https://equalityarizona.substack.com/p/lgbtq-community-events-in-august
- https://bullshifters.org/upcoming-bull-shifter-rides-club-events/
- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=356095
- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=364297
- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=364162
- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=364163
- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=359028
- https://pmbc.clubexpress.com/content.aspx?page_id=4001&club_id=943467
- https://ridewithgps.com/organizations/3053-phoenix-metro-bicycle-club/events
- https://ridewithgps.com/organizations/1921-arizona-endurance-riders/home?lang=en
- https://www.dynamitebikelab.com/
- https://www.dynamitebikelab.com/events
- https://storefrontapi.masterlinq.io/api/ecom/events (header X-Account-Code: PEG)
- https://scottsdalebikeco.com/
- https://bicyclesofscottsdale.com/
- https://www.sunsetcycleryaz.com/
- https://www.bicyclehaus.com/
- https://www.bicyclehaus.com/social
- https://www.landiscyclery.com/ (WebFetch)
- https://www.landiscyclery.com/articles/events-rides-calendar-pg72.htm
- https://flattirebikes.com/bike-shop-rides/
- https://flattirebikes.com/event-calendar/
- https://nowomanleftbehindaz.blogspot.com/
- https://www.nowbikes-fitness.com/articles/rides-events-pg161.htm
- https://www.moxiebikeshop.com/service/moxie-team/ (WebFetch)
- https://www.wheezersandgeezers.com/local-rides (WebFetch)
- https://www.wheezersandgeezers.com/about-us (WebFetch)
- https://www.phoenixnewtimes.com/arts-culture/7-best-group-bike-rides-in-metro-phoenix-6574382/ (lead only; an old article)
- https://www.experiencescottsdale.com/stories/post/bike-riding-tours-groups/ (no ride listings)
- https://www.scottsdaleaz.gov/outdoor-activities/biking (no ride listings)
- https://www.maricopacountyparks.net/park-locator/mcdowell-mountain-regional-park/park-activities/biking/ (no ride listings)
- https://mbaa.net/about/ (no ride listings)

**Events**
- https://www.tourdescottsdale.org/
- https://events.nationalmssociety.org/2765
- https://events.nationalmssociety.org/pages/8392
- https://www.eventbrite.com/d/az--scottsdale/bike-ride/

**Tried, did not load**
- https://www.caffeineandwatts.com (429 bot wall)
- https://carefreecavecreek.org/chamber-events/ (403)
- https://www.clippedin.bike/ and https://www.clippedin.bike/group-rides/triscottsdale-interval-ride/ (certificate error)
- https://www.themoxiemultisport.com/ and https://www.mountainbikerlady.com/ride-groups/ (no DNS, WebFetch refused)
- http://www.outcyclists.org/ (no DNS)
- http://www.mcdowellcycling.com/ (no DNS over http; 502 over https; WebFetch needed approval)
- https://arizonatri.com/scottsdale-guide and https://moxiebikeshop.com/scottsdale-location (connection failed)
- https://www.wheezersandgeezers.com/ (robots check failed in WebFetch)
- https://web.archive.org/ (unreachable)
