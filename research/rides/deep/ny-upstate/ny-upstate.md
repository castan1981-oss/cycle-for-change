# ny-upstate: group-ride deep sweep

- **Area id:** `ny-upstate` (Hudson Valley, Capital Region, Mohawk Valley, Syracuse, Rochester, Buffalo and Niagara, Finger Lakes and Southern Tier, North Country; NYC, Long Island and Westchester are swept separately)
- **Agent:** group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026
- **Files:** `ny-upstate.json` (8 new rides), `upkeep.json` (8 re-check entries) and this report
- **Fetches:** about 135 (the search tool was out of budget; Strava, Facebook and Instagram event lists need a login)

## Summary

**8 new rides, 3 high and 5 medium.** The target was about 25. I did not get there, and I would rather say so than pad the file. October is a bad month to sweep upstate New York: most rides I found are April-to-September series that ended in the last three weeks (Slow Spokes, OCC's Tuesday and Thursday rides, FLCC's women's and social rides, Tom's Pro Bike's Saturday series, Major Taylor in Rochester). Most of the rest live on Facebook and Instagram, or behind a bot wall.

New rides by city:

- Ithaca: 2 (FLCC Thursday gravel; FLCC Saturday social, on seasonal break)
- Rochester: 2 (Flower City Feeling Good Wednesdays; RBC weekend supported rides)
- Albany area: 2 (MHCC Sunday Wake Up Ride; MHCC Women on Wheels)
- Syracuse: 1 (OCC weekend rides)
- Poughkeepsie / mid-Hudson: 1 (Hudson Valley Rail Trail Riders)
- Buffalo, Utica, Binghamton, Watertown, Saratoga, Schenectady, Kingston, New Paltz, Rhinebeck, the Adirondacks: none. Buffalo has many leads (below) but none with a page that loads and shows a date.

By host: FLCC 2, MHCC 2, Reconnect Rochester 1, Onondaga Cycling Club 1, Rochester Bicycling Club 1, The Hudson Valley Rail Trail Riders 1. Nobody is past the 3-per-host cap.

Mix: road 4, gravel 1, social 3. One women's ride (MHCC WOW), one no-drop gravel ride, two beginner-friendly series. No LGBTQ ride made it in; the only one I found is Facebook-only (see Couldn't confirm).

**Re-checks: 8 of the 9 rides already listed.** 4 changed, 4 on seasonal break, 0 ended, 1 not re-checked.

- Changed: Slow Roll Buffalo (October start is 6:00 pm, not 6:30), MHCC Tuesday River Ride (start varies, last posted ride Oct 6), and two Rochester rides where the check confirmed the ride and added a calendar feed (Just for Giggles, Rochester Bike Gang). Those last two are really confirmations; I wrote them as `changed` so the feed and links go in.
- Seasonal break: both Slow Spokes rides, OCC Tuesday Slow N' Easy, FLCC Women's Road Ride.
- Not re-checked: Beacon Bicycle Coalition monthly ride.

## For the editor

- **Reconnect Rochester's Google Calendar is the best single feed here.** It is a public ICS with the Flower City ride, Rochester Bike Gang, Just for Giggles and more. I put it in `refresh.feed_url` for the new Flower City ride and for the two existing rides (via `upkeep.json`). URL: `https://calendar.google.com/calendar/ical/c_8dstjm2qg2l45fbhg5n7ht8thg%40group.calendar.google.com/public/basic.ics`
- **Rochester Bike Gang was Rochester Bicycle Time.** The calendar's old Thursday Night Cruise entry, "Rochester Bicycle Time!", ran until Apr 16, 2026. The same Thursday ride from Parcel 5 restarts that day as "Rochester Bike Gang's Thursday Night Cruise". Same group, new name.
- **Slow Roll Buffalo's switch to 6:00 pm** is in `upkeep.json` as `start_times` from Mon Oct 5. The schedule page lists only Oct 5 and Oct 12 so far, though the ride page says the season runs to the end of October. Re-check after Oct 12.
- **Slow Spokes** says "Thank You for a Great 2026 Season" and "2027 registration coming soon" for Wilkeson Point and Lockport. I marked both on seasonal break with those words and no 2027 date.
- **MHCC Tuesday River Ride** may not start at Kiwanis Park any more. The Oct 6 listing is titled "Lock 8", and MHCC gives the exact start only to riders who use "Contact Leader". I left `start_location` alone and wrote the caveat into `visitor_notes`.
- **Flower City ride** ends Oct 7 and has no fixed start (a different recreation center or park each week). Its `start_location.address` is null on purpose; please don't geocode a point for it.
- **Three new rides have no fixed start**: OCC weekend rides, MHCC Sunday Wake Up Ride, RBC supported rides. Leave them ungeocoded, or give them city-centre pins only.
- **Two new rides have a null time on purpose** (MHCC WOW, Hudson Valley Rail Trail Riders). Each ride on the host's calendar carries its own time.
- **Meetup's ICS feeds no longer work.** `meetup.com/<group>/events/ical/` now returns 403 "Invalid feed signature". The group's `/events/` page still loads, and its page data lists upcoming events, so `refresh.method: meetup` should read that page, not a feed.
- **Personal emails and phone numbers** appear on several pages (Reconnect's calendar, the FLCC pages, Meetup). I left them all out.

## Why these

- **Flower City Feeling Good Wednesday Ride (Rochester).** A free, easy 7-mile guided ride on a different city route each week, run for the city's recreation department. The last one this season is Oct 7.
- **FLCC Thursday Group Gravel Ride (Ithaca).** No-drop gravel at 6 pm, two pace groups, about 20 miles and 2,000 feet. The start moves each week, so join the Google Group.
- **FLCC Saturday Social Ride (Ithaca), seasonal break.** Intermediate 12 to 13 mph road rides, no-drop, May to September. Listed so a visitor knows to look in May.
- **OCC Saturday and Sunday Club Rides (Syracuse).** The club's weekend road rides, Saturday easier and Sunday long. Guests may ride once before joining. Many October dates still need a leader.
- **MHCC Sunday Morning Wake Up Ride (Albany area).** A 23-mile, 12 mph Sunday ride at 8:00 am for the rest of the season. Contact the leader for the start.
- **MHCC Women on Wheels (Albany area).** Women-only rides on rail trails and quiet roads with a bagel or coffee stop. The host calls them safe, non-competitive and judgement free.
- **Hudson Valley Rail Trail Riders (Poughkeepsie).** Easy 22 to 26 mile rides on a different rail trail each time, mostly weekends. The best way into the Hudson Valley's trails.
- **RBC Weekend Supported Rides (Rochester).** The Rochester Bicycling Club's slower rides at 9 am on Saturday and Sunday, 10 to 12 mph, with the leader riding at the back. Start is members-only on Meetup.

## Where rides are posted here

**Machine-readable (a robot can re-read these):**

- **Reconnect Rochester community calendar**, public Google Calendar ICS (link above). Carries Rochester Bike Gang, the Flower City ride, the old Just for Giggles entries, Unity Rides, history tours and most Rochester events. The page is `https://reconnectrochester.org/cyclingcalendar/`.
- **FLCC events feed:** `https://fingerlakescycling.org/events/?ical=1` (WordPress Events Calendar). Shows only the next gravel ride, so later Thursdays appear week by week.
- **Bike Walk Tompkins (Ithaca) calendar**, public Google Calendar ICS: `https://calendar.google.com/calendar/ical/c_tco36n326paenit4jr76h0h1qo%40group.calendar.google.com/public/basic.ics`. Open shop hours, classes and the monthly Full Moon Lighted Bike Ride.
- **Buffalo Bicycling Club events feed:** `https://www.buffalobicyclingclub.com/events/?ical=1`. Mostly races and cyclocross practice; the season's last group ride is the Oct 18 banquet ride.

**Pages with dates (HTML only):**

- **MHCC public ride schedule** (`mohawkhudsoncyclingclub.org/rides/public`). A full list about two weeks ahead, with pace, miles, leader and a "Contact Leader" form. It is the best Capital Region source. The club's sister site in Dutchess County (midhudsonbicycleclub.org) keeps its rides behind a login.
- **OCC ride calendar** (`onondagacyclingclub.org/ride_calendar/`). Month view, every ride with time and leader status. Month pages go back and forward.
- **Meetup event pages:** RBC (`meetup.com/rbc-ny/events/`) and The Hudson Valley Rail Trail Riders. Titles and times load without a login; start locations and descriptions do not.
- **Slow Roll Buffalo** (`slowrollbuffalo.org/schedule`) and **Slow Spokes** (`slowspokesusa.com`). Squarespace and Webflow pages with a host and date per ride.
- **Just for Giggles** keeps three public pages: a Linktree (`linktr.ee/justforgigglescycling`), a Google Sheet of ride leaders for every Monday through December (road and gravel), and a Strava event page that loads without a login (`strava.com/clubs/801735/group_events/3490438284057596288`, Saturday coffee ride, showed Oct 3 8:00 AM).
- **WNY Bike Events Linktree** (`linktr.ee/WNYBRC_Events`) is a one-page list of the weekly rides in the Rochester area (day by day, with links) and the regional race and ride dates. It is the most useful lead page in the area.
- **Buffalo Bicycling Club's group rides page** (`buffalobicyclingclub.com/group-rides/`) lists nine Buffalo-area ride groups with their Strava, Facebook and Instagram links. Good leads; none of the targets loaded with dates.

**Walls and dead ends:** nfbc.com (Cloudflare "Just a moment"), cityofrochester.gov (same), shicklunabikes.com ("Bot Verification"), nybc.net (202, no content), clippedin.bike, thegravelcollective.com and esbcbuffalo.com (no connection), DuckDuckGo's HTML search (challenge). I did not try to get past any of them. Mello Velo's and Advance Cyclery's sites are "under construction" pages.

## Re-checked

- **Buffalo, Slow Roll Buffalo Monday Night Community Ride.** Changed. Schedule page lists Oct 5 and Oct 12 as "Meet at 5:30pm! Ride at 6pm!" (September was 6:00 meet, 6:30 ride). `start_times` from Oct 5 to 18:00.
- **Buffalo, Slow Spokes Tuesday Ride at Wilkeson Pointe.** Seasonal break. "Thank You for a Great 2026 Season"; Wilkeson Point 2027 registration coming soon.
- **Lockport, Slow Spokes Friday Ride.** Seasonal break. Same page; Lockport 2027 registration coming soon.
- **Camillus, OCC Tuesday Slow N' Easy.** Seasonal break since Sept 9. OCC's calendar shows the last Tuesday Slow 'n Easy on Sept 8 (5:30 PM) and no Tuesday evening rides after; the 2026 table runs Apr 21 to Sept 8.
- **Rochester, Just for Giggles Monday Night Ride.** Confirmed (written as changed to add links and a feed). Leader sheet assigns every Monday through December; Strava event shows Sat Oct 3, 8:00 AM from Schoen Place; Linktree and Reconnect's calendar agree on Monday 6:15 pm from Three Heads Brewing.
- **Rochester, Rochester Bike Gang Thursday Ride.** Confirmed (written as changed to add the feed). Reconnect's calendar has a weekly Thursday entry from Apr 16, 2026, edited Oct 1, 2026: meet at Parcel 5 about 7:00, roll 7:30.
- **Rotterdam, MHCC Tuesday Evening River Ride.** Changed. MHCC lists a Tuesday Evening River Ride for Oct 6 at 6:30 PM, 23.8 miles, titled "Lock 8"; nothing posted after Oct 6. Schedule and visitor notes updated.
- **Ithaca, FLCC Women's Road Ride.** Seasonal break. Page says it runs from mid May until mid September.

## Couldn't re-check

- **Beacon, Beacon Bicycle Coalition Monthly Group Ride.** bikebeacon.org/events says "Every Last Thursday at 6pm, meet at the Dummy Light, check Instagram for details", but the only dated item on the page is Aug 15, 2024 and there is nothing from 2026. Route plans go on Instagram, which doesn't load. No entry written; the ride keeps its Sept 18 date. Last Thursday of October is Oct 29.

## Rejected

- **Major Taylor Cycling Club ride (Rochester).** Thursdays, meet 6:00, roll 6:30 pm, 131 Elmwood Ave. The calendar series runs May 7 to Aug 27, 2026 (ended Sept 2; two dates cancelled). Season over, no 2027 date. Contact on the calendar is a club volunteer.
- **Unity Rides (Black Girls Do Bike Rochester).** One ride a month in 2026 (Tue May 19, Jun 16, Jul 21, Aug 18; East, North, South, West). Nothing after Aug 18.
- **Tom's Pro Bike Morning Grind (Victor, Orchard Park, Lancaster).** Saturdays, May 2 to Sept 26, 2026, rotating stores, 17 to 20 mph. Series over; "registration opening soon" for next year.
- **OCC Thursday Slow N' Easy (East), Wednesday rides, Friday morning rides.** OCC's calendar shows the last Thursday Slow 'n Easy on Sept 10, the last Wednesday ride on Sept 9, and Friday rides only through Oct 9.
- **MHCC Gravel Goblin training and Original Cumby's.** The Oct 2 listings say "last month for Gravel Goblin training" and "the last Original Cumby's ride of the year".
- **716 Group Rides at Wayland Brewing (Orchard Park).** Strava club page (undated): April, one Sunday ride; May to September, one Thursday and one Sunday; October, one Sunday. No date for the October ride.
- **Swiftwater Brewing Thursday ride (Rochester).** Calendar entry ended Nov 13, 2025. Nothing newer.
- **WNYBRC Thursday Night Trails.** In 2026 it is a BikeReg race series ("TNT Race Series Results"), not a group ride. The older group-ride calendar entry ended Dec 2024.
- **Rochester Bicycle Time Thursday Night Cruise.** Renamed Rochester Bike Gang on Apr 16, 2026 (see above).
- **CC Riders (Meetup, Albany).** Wed, Sat and Sun 9 am diner runs to the Catskills and Vermont. The wording suggests motorcycle riding; not confirmed. Left out.
- **Huggers Social, Sport and Ski (Rochester Meetup).** Its Meetup says the group closes on Oct 10, 2026.
- **Northstar Bikes group rides (Williamsville).** The page describes Road A, B and C groups, but the shop's public calendar's newest entry is from September 2025 and no 2026 ride shows. Couldn't confirm.

## Couldn't confirm

For a local rider to check by hand. Name, host, day, time, start, where I saw it, link.

**Rochester**
- **Backroads Cycling Club.** Informal club. Tuesday evenings, locations around Rochester. Three groups (10 to 12, 13 to 15, 15+ mph), a leader and a sweep in each, no fee, online liability release, weekly Sunday email with the location. Start time not stated. Seen: the club's Google Doc (undated), Reconnect's overview and the WNY Bike Events Linktree. `https://docs.google.com/document/d/1ZpH1Ai1GCURj-U2mMFyoFVvqNiT_onJPlL-SYT1HJEs/edit`
- **Rochester Rainbow Riders.** LGBTQIA+ rides in and around Rochester, informal group, Facebook. Its Rainbow Ride was Sun Jul 12, 2026 (Reconnect's calendar: any skill level, 5+ miles, no one left behind, route sent to registered riders). No regular day found. `https://www.facebook.com/groups/rochesterrainbowriders/`
- **Rochester Gravel Collective.** Gravel community "centering on FTWNB, BIPOC, queer, and para-athletes", socials, workshops and group rides (Reconnect's description). Site didn't load. `https://thegravelcollective.com/`
- **Wheel Women of Tryon.** Women's group; the WNY Bike Events Linktree lists "Tuesdays: Wheel Women Group Ride". `https://www.facebook.com/WheelWomenofTryon`
- **Eastside Pedalers.** Social group, Thursday mornings, early May to late October, various Rochester starts. Contact is on Reconnect's overview page.
- **Coffee & Cogs 585.** Casual rides ending at roasters and cafes. `https://www.instagram.com/coffee_and_cogs_585/`
- **Grey Area Cycling Club.** Casual morning coffee rides for men (Reconnect's words). `https://www.instagram.com/grey_area_roc/`
- **Yawn@Dawn ROC.** Fridays 6:00 am from Flour City Bread at the Public Market, one-hour recovery pace, no-drop. Reconnect's overview says weekly; the calendar entry ended Oct 2024. `https://www.facebook.com/groups/yawndawnroc`
- **Rochester Bicycling Club weeknight rides.** Wednesday 5:30 pm "SR" rides on Meetup (Oct 7: Rikki's Return) and Thursday 5:30 pm (Sept 24, Sept 30). Starts are members-only.
- **Major Taylor Cycling Club.** See Rejected; look again in spring. `https://www.facebook.com/groups/984951969332637`

**Buffalo and Niagara** (all from the Buffalo Bicycling Club's group-rides page, 2026)
- **Campus Cycling Collective.** Wednesday nights, A, B and C groups, from Campus WheelWorks on Niagara St. `https://www.facebook.com/groups/345273272191768`
- **Co.Motion.** Inclusive group rides for women and non-binary cyclists, Buffalo. `https://www.instagram.com/co.motion.buffalo/`
- **East Side Bike Club.** Saturday 10:00 am from Martin Luther King Park, open to everyone. Site didn't load; Facebook `https://www.facebook.com/esbcbuffalo/`
- **Shickluna Women's Devo Ride.** Sundays (longer rides) and Mondays (skills), from Shickluna Bike Shop on Hertel Ave, led by women for women. Strava club `https://www.strava.com/clubs/1185197`; shop site behind a bot check.
- **Northstar Bikes group rides.** Williamsville, weekly Saturday road groups A, B and C, plus mountain bike and bikepacking. Strava club `https://www.strava.com/clubs/884353`. Calendar stale (2025).
- **Niagara Shootout.** Fast Saturday-morning ride, North Tonawanda to Lewiston, spring and summer; the club says it is near-weekly. Strava club `https://www.strava.com/clubs/1232679`
- **Tuesday Night Riding Collective.** East Aurora, hard efforts on hills with regroups. `https://www.facebook.com/groups/196133770510352`
- **Niagara Frontier Bicycle Club.** Two or three rides a day around the Northtowns and Southtowns. nfbc.com is behind Cloudflare.
- **716 Group Rides at Wayland Brewing.** See Rejected. Strava club `https://www.strava.com/clubs/1241012`
- **Slow Spokes other locations.** Wednesday at Old Man River (Tonawanda), Thursday 5:40 pm at Fattey Beer Co. (North Tonawanda), Lewiston at Olcott Lobster Company; two new rides (Newfane, East Aurora) in 2027. All on seasonal break; see host-cap extras below.

**Finger Lakes and Southern Tier**
- **Pedal for Pilsners (Hammondsport).** Wednesday evenings and Sunday mornings from Steuben Brewing Company, 294 members. Strava club page is undated and shows no event. `https://www.strava.com/clubs/679954`
- **Full Moon Lighted Bike Ride (Ithaca).** Bike Walk Tompkins and Vie Cycle, one evening a month at the full moon (the 2026 dates were at 8:00 pm or so on Apr 1, May 2, May 31, Jun 29, Jul 29, Aug 28, Sep 26), from the shop at 803 Cascadilla St. Day of the week changes, so I left it out. Next date will be on the Bike Walk Tompkins calendar.

**Hudson Valley**
- **Mid Hudson Bicycle Club (Dutchess).** Rides page is members-only. `https://www.midhudsonbicycleclub.org/`
- **Beacon Bicycle Coalition.** See Couldn't re-check.

**Gaps.** Utica, Binghamton, Watertown, Saratoga, Schenectady, Kingston, New Paltz, Rhinebeck and the Adirondacks: nothing I could load. A local rider will do better with Facebook and Instagram search on the town names.

## Host-cap extras

Rides I saw but did not add because the host is at or near the 3-per-host cap, or the ride isn't proven yet:

- **MHCC** (at 3 with the new rides): TGIT Thursday Afternoons, 1:30 pm, Sport/12, about 20 miles (only Oct 1 posted, cancelled for weather); Friday rides at 10 am (Original Cumby's and Gravel Goblin, both ended Oct 2).
- **OCC** (2 of 3): Monday 6:00 pm Off-road Leader's Choice, listed for Oct 12, 19 and 26 with "Leader Needed" (Sept's Monday rides were marked "Off-Road No Drop"); Friday 10 am rides through Oct 9.
- **FLCC** (3 of 3): none left.
- **Slow Spokes** (2 existing): three more weekly rides, all on break until 2027.
- **Reconnect Rochester**: Brighton Rec ride with Reconnect Rochester (three Fridays in 2026, registration required).
- **Just for Giggles** (1): the Saturday coffee ride is already in the existing record; the Monday ride has road and gravel options each week.

## Stats

- Candidates looked at: about 70 (hosts, clubs, shops, calendars, leads)
- Listed: 8 (3 high, 5 medium; one on seasonal break)
- Re-checks written: 8 of 9 (4 changed, 4 seasonal break); 1 couldn't re-check
- Couldn't confirm: 28 (Rochester 10, Buffalo and Niagara 10, Finger Lakes 2, Hudson Valley 2, plus Northstar, Wayland, Major Taylor and Slow Spokes counted under their cities and Rejected)
- Rejected as ended, changed or unfit: 13
- Page fetches: about 135
- Dry runs (Oct 1, 2026): `merge-ride-research.js` accepted 8 (US-NY 8); `rides-apply.js` re-checked 8, no new errors (42 existing warnings)

## Sources

Fetched and read:

- https://www.slowrollbuffalo.org/ride · https://www.slowrollbuffalo.org/schedule
- https://www.slowspokesusa.com/
- https://onondagacyclingclub.org/ · https://onondagacyclingclub.org/ride_calendar/ · https://onondagacyclingclub.org/rides-and-tt/slow-n-easy-rides/ · https://onondagacyclingclub.org/rides-and-tt/weekend-rides/ · https://onondagacyclingclub.org/rides-and-tt/other-rides-of-interest/
- https://reconnectrochester.org/bike-scene-overview/ · https://reconnectrochester.org/our-weekly-rides/ · https://reconnectrochester.org/cyclingcalendar/ · Google Calendar ICS c_8dstjm2qg2l45fbhg5n7ht8thg
- https://linktr.ee/justforgigglescycling · https://www.strava.com/clubs/801735/group_events/3490438284057596288 · the "MNBR by Just for Giggles" ride-leader Google Sheet
- https://linktr.ee/wnybrc · https://linktr.ee/WNYBRC_Events
- https://www.mohawkhudsoncyclingclub.org/rides/public · https://www.mohawkhudsoncyclingclub.org/nonmemberride · https://www.mohawkhudsoncyclingclub.org/events/public
- https://www.midhudsonbicycleclub.org/ · https://www.midhudsonbicycleclub.org/Rides/memberSchedule
- https://bikebeacon.org/ · https://bikebeacon.org/events
- https://fingerlakescycling.org/flccpage/group-rides · .../womens-road-ride/ · .../gravel-rides/ · .../weekend-rides/ · .../regional-rides/ · https://fingerlakescycling.org/events/?ical=1 · https://fingerlakescycling.org/event/flcc-group-gravel-ride-2026-10-01/ · https://fingerlakescycling.org/event/flcc-saturday-social-ride-2-2026-09-26/
- https://www.bikewalktompkins.org/ · https://www.bikewalktompkins.org/calendar · its public Google Calendar ICS
- https://www.rochesterbicyclingclub.org/ · .../RBCRides · .../Rides-We-Do · https://www.meetup.com/rbc-ny/events/ · https://www.meetup.com/rbc-ny/events/316658904/
- https://www.meetup.com/the-hudson-valley-rail-trail-riders/ (and /events/ and one event page) · https://www.meetup.com/ccriders518/events/ · https://www.meetup.com/buffalo-coffee-and-cycling-meetup-group/events/ · Meetup group-search pages for Albany, Syracuse, Buffalo, Rochester, Ithaca, Binghamton, Poughkeepsie, Kingston, Saratoga Springs, Utica and Watertown
- https://www.buffalobicyclingclub.com/ · .../group-rides/ · .../events/?ical=1
- https://www.tomsprobike.com/pages/events/ · https://www.northstarbike.com/group-rides · Northstar's Google Calendar ICS
- https://www.strava.com/clubs/679954 · /884353 · /1185197 · /1232679 · /1241012
- https://gobikebuffalo.org/events/ · https://www.mygroc.com/ · https://www.mygroc.com/groc-trail-rides/ · https://gvccracing.com · https://www.saratogamtb.org/
- Backroads Cycling Club Google Doc (text export)
- Read, nothing useful or bot-walled: bertsbikes.com, campuswheelworks.com, syracusebicycle.com, mellovelo.com, advancecyclery.com, eepathways.us, rochesteraccessibleadventures.org, weeklyrides.com, nfbc.com (403), cityofrochester.gov (403), shicklunabikes.com (bot check), eventbrite.com Albany search, clippedin.bike (no connection)
