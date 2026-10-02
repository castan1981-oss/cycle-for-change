# ca-north-central: group-ride scout report

- **Area id:** `ca-north-central`
- **Agent:** group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026
- **Area:** Sacramento and suburbs, Davis, Chico, Redding, Fresno and Clovis, Bakersfield, Santa Rosa. Looked for and found nothing provable in Modesto, Monterey, San Luis Obispo, Santa Barbara (beyond the ride already listed), Napa and Tahoe.
- **Files:** `ca-north-central.json` (16 records), `upkeep.json` (7 entries) and this report
- **Fetches:** about 125 of the 150 budget. WebSearch was capped (200 of 200 used), and the Bing page I tried ignores place names, so I found rides by reading club pages, calendars and the feeds behind them.

## Summary

**16 new rides: 7 high, 9 medium.** The target was about 25. I stopped at what I could prove.

New rides by city:

- Chico: 3
- Bakersfield: 3
- Davis: 2
- Redding: 2
- Clovis: 1, Fresno: 1
- Sacramento: 1, Fair Oaks: 1, Gold River: 1
- Santa Rosa: 1

By host: Kern Wheelmen 3, Davis Bike Club 2, Shasta Wheelmen 2, Fresno Cycling Club 2, North Rim Adventure Sports 1 (plus 2 rides its page lists with no named host), Sacramento Wheelmen 1, Sacramento Bike Hikers 1, SABA 1, Sports Basement Santa Rosa 1. Counting rides already on the site, no host goes above 3, so Davis Bike Club, Fresno Cycling Club, Shasta Wheelmen, Sacramento Wheelmen and Bike Hikers have more good rides than I listed. They are under "Extras held back".

Types: road 7, road and social 8, social 1, gravel 0. No gravel, queer, women, trans or BIPOC ride made it in: the ones I found live on Facebook and Instagram only (see "Couldn't confirm"). No-drop or beginner rides, in the host's own words: Davis Sunday No Drop, Davis Joy Ride, Fresno Lost Lake, Shasta Geezers, North Rim Friday, Chico Fast Fit and Fun (Fun group), SABA Social, Sports Basement Santa Rosa.

**Re-checks: 7 entries for the 10 rides already listed.** 4 confirmed, 3 changed (Davis got a feed; Shasta Wheelmen's weekday ride moved to 8:30 am; Bike Bakersfield's Full Moon Ride got a start and a confidence bump). No ride ended, paused or went seasonal. 3 had no entry: North Rim's Sunday ride, Bike Party Sacramento and Fastrack Saturday Lake Ride (see "Couldn't re-check").

## For the editor

- **Shasta Wheelmen weekday ride is now 8:30 am**, not 8:00. The club calendar shows 8:00 through Sept 29, 8:30 from Oct 1, and 9:00 on Thu Nov 5. I put the Nov 5 change in `start_times`. Tuesday Nov 3 wasn't on the calendar yet, so that one day may be 8:30.
- **Davis Tuesday Bakery Easy Ride** is 9:00 am from Sept 22 (8:00 am May 26 to Sept 15). The listing already said so; I only added the Google Calendar feed. The same feed carries most of the Davis rides under "Extras held back".
- **Three feeds are public Google Calendars** (Davis Bike Club, Fresno Cycling Club, Shasta Wheelmen) plus SABA's Social Rides calendar. They are in `refresh.feed_url` and the watcher can read them.
- **Kern Wheelmen entries repeat out to 2028.** A listed date there does not prove a ride ran this week, so those three are medium.
- **Two rides have no fixed start.** SABA's social ride changes start and time every month (`start_hhmm` is null). The Shasta weekend rides move between four start points (no address). Please don't geocode either as a fixed start. Sports Basement Santa Rosa has no street address because I couldn't read one.
- **Chico conflict.** North Rim's page says the Friday ride rolls at 9:01 am from the One Mile Recreation Area. Chico Velo's 2026 calendar lists a "Friday 8:30a Road Coffee Ride @ Decide & Ride", which is next to the One Mile bridge. It may be the same ride. It's in the record's schedule line.
- **Davis Joy Ride and Fresno Taco Tuesday** have leaders' phone numbers or emails on the host pages. I left them out.
- **Fresno Taco Tuesday is in Clovis** (zip 93619), not Fresno. The birthday ride's Steven's lot is Clovis too, but that record already says Fresno.

## Why these

**Davis**

- **Sunday No Drop Ride (Davis Bike Club, high).** The club's long-running Sunday ride to Winters and back, no drop, 14 mph and up, 8 to 18 riders. In the club's Google Calendar with dated Sundays.
- **Saturday Joy Ride (Davis Bike Club, high).** The slow ride, 12 to 14 mph, nobody dropped, for people coming back from an injury. The leader can cancel when few sign up, which the record says.

**Fresno and Clovis**

- **Taco Tuesday Ride (Fresno Cycling Club, Clovis, high).** A flat 30-mile out-and-back on Academy Avenue to a taco stand, every Tuesday at 6 pm, B level and social.
- **Lost Lake Ride (Fresno Cycling Club, Fresno, high).** A 16-mile no-drop evening ride every other Thursday at 5 pm, C level.

**Redding**

- **Saturday Geezer Ride (Shasta Wheelmen, high).** "No murderous pace, no drops." Saturdays at 8:00 sharp to Anderson River Park and coffee. Only Oct 3 is posted ahead.
- **Weekend Club Rides (Shasta Wheelmen, high).** The club's numbered weekend rides, 30 to 70 miles, each its own dated entry with start and pace. Saturday and Sunday at 8:30 in October.

**Sacramento area**

- **Tuesday Coffee Ride, Old Fair Oaks (Sacramento Wheelmen, Fair Oaks, high).** A hilly 47 or 62-mile loop to Loomis for coffee, Tuesdays at 8:30. Each event has a guest registration.
- **Tuesday Morning EZ Rider (Sacramento Bike Hikers, Gold River, medium).** A 20, 26 or 31-mile morning ride on the river trail. Medium because the start moved from 10:00 to 9:00 between two weeks.
- **SABA Monthly Social Ride (Sacramento, medium).** A slow, themed ride around Sacramento and West Sacramento, about 2 hours, children welcome, on the last Sunday. Medium because the October date isn't posted yet.

**Chico**

- **Friday Morning No-Drop Road Ride (North Rim Adventure Sports, medium).** The shop's Friday ride from the One Mile, alternating flats and hills. Medium because North Rim's page has no dates.
- **Fast, Fit and Fun 50 (listed on North Rim's page, medium).** A Wednesday evening ride in three groups, March through October. The Fun group is no-drop.
- **Saturday Fast Road Ride, October to February (listed on North Rim's page, medium).** The winter Saturday ride, 9:00 am from the One Mile with one regroup.

**Santa Rosa**

- **Last Sunday Ride (Sports Basement Santa Rosa, medium).** A casual 15 to 30 mile no-drop ride the last Sunday of the month, open to all, from the store. Medium because both pages that state it are undated.

**Bakersfield**

- **KW Open Sunday Ride (Kern Wheelmen, medium).** No host, show up and go, 8:00 am sharp, about 20 miles to Enos Lane and back.
- **Monday Recovery Ride (Kern Wheelmen, medium).** A one-hour social ride at 4:30 pm from River Walk.
- **KW Weekly Evening Club Ride (Kern Wheelmen, medium).** Wednesday after-work ride in A, B and C groups on the bike path, with a safety talk first.

## Where rides are posted here

- **Public Google Calendars behind club sites.** The page shows an embedded calendar; the `src=` value in the embed is a base64 calendar id. Decode it, then read `https://calendar.google.com/calendar/ical/<id>/public/basic.ics`. This worked for Davis Bike Club (`davisbikeclubwww@gmail.com`), Fresno Cycling Club (`iajuho1aghkd2de16t400k2cfg@group.calendar.google.com`), Shasta Wheelmen (`c_1a2dfbf2…@group.calendar.google.com`, from https://shastawheelmen.org/ridecalendar) and SABA's eight calendars (https://sacbike.org/events-calendar/; the Social Rides one is `c_2d9b1356…`). It is the best source in the area. These calendars chop each ride into seasonal series, so read the `UNTIL` dates and the newest entry for each ride, not the oldest.
- **WildApricot calendars.** Sacramento Wheelmen (https://sacwheelmen.wildapricot.org/Ride-Calendar/) lists every ride by day, and each event page gives dates, time, start, distance and pace; the Tuesday and Thursday rides come in eight to nine week blocks. Fresno Cycling Club's event pages are WildApricot too.
- **ClubExpress.** Sacramento Bike Hikers (https://bikehikers.clubexpress.com/content.aspx?page_id=4001&club_id=216251). The tooltip on each calendar entry carries date, time and description.
- **ICS Calendar Pro (WordPress).** Kern Wheelmen's calendar (https://kernwheelmen.org/calendar/) loads with JavaScript. A POST to `/wp-admin/admin-ajax.php` with `action=r34ics_ajax`, the page's nonce and its `data-args` value returns the events as JSON.
- **Strava club pages.** Sports Basement Santa Rosa Rides (https://www.strava.com/clubs/santarosagrouprides) and Bike Party Sacramento (club 224090) load without a login and carry the schedule in the description. Neither shows an event date. I found no Strava event page for any ride in this area.
- **Shop pages.** North Rim Adventure Sports in Chico (https://www.northrimadventure.com/articles/chico-area-rides-and-events-pg37.htm) lists its own and three other weekly rides. It has no dates.
- **Lists of clubs.** SABA's Bike Clubs page (https://sacbike.org/bike-clubs/) and Chico Velo's calendar (https://www.chicovelo.org/calendar.html) name the local groups; most of those groups live on Facebook.
- **Facebook and Instagram only.** Bike Party Sacramento, Bike Bakersfield's date posts, Women Cycle Sacramento, Hooligans, Chico's Women on Wheels. None load.

## Re-checked

- **Tuesday Bakery Easy Ride** (Davis, changed): the Davis Bike Club's Google Calendar lists it at 9:00 am from Westlake Market from Sept 22 (8:00 am May 26 to Sept 15), with Oct 6, 13 and 20 next. Schedule unchanged; the feed is new.
- **Fresno Cycling Club Monthly Birthday Rides** (confirmed): the club's event page shows the Sept 19, 2026 ride, meet 7:45, roll 8:00, Steven's parking lot. October's edition isn't posted. Last seen Sept 19.
- **Shasta Wheelmen Weekday Ride** (changed): the club calendar shows 8:00 am through Sept 29, 8:30 am from Oct 1, 9:00 am on Nov 5; summer was 7:00 am. New schedule, time and feed; `start_times` from Nov 5.
- **Bike Bakersfield Full Moon Ride** (changed): the home page (copyright 2026) shows Instagram posts for the July 29, August and September rides. September: Beach Park, meet 6:30 pm, roll 7:00 pm, to Lengthwise Brewing; the post calls it the last Full Moon Ride of the summer. Added the start and the evening times; confidence from low to medium.
- **Sacramento Bike Hikers Tuesday Evening Ride** (confirmed): club calendar lists Tuesday Evening Ride F20 on Sept 29 and Oct 6, 6:00 to 8:00 pm.
- **Saturday Morning Granite Bay Ride** (confirmed): club calendar lists every Saturday in October; the Oct 3 event page gives 8:30 am at Granite Bay Community Park.
- **Tuesday West Breakfast Ride** (confirmed): the event page lists eight Tuesdays, Oct 6 to Nov 24, 9:00 am, Westin Hotel lot.

## Couldn't re-check

- **Easy Does It Sunday Ride** (Chico, North Rim, Sunday 1:00 pm, Hooker Oak Park). The page loads and still lists it, "about 12 miles at about 11 mph", but nothing on it is dated and the shop's Strava club page shows no event details. No entry written.
- **Bike Party Sacramento** (first Friday, 7:00 pm). The old about-us page now fails to load; the home page has no schedule and a 2025 copyright. The Strava club says "a casual-paced ride the first Friday of every month (rain or shine)" with no date. SABA's club list repeats "first Friday". A local rider should look on Fri Oct 2.
- **Fastrack Saturday Lake Ride** (Santa Barbara, Saturday 8:00 am, Dolphin Fountain). The shop's page loads and lists it, but it's copyright 1997-2023 with no dated item. Its Facebook and Instagram (`fastrack9`) don't load.

## Rejected

- Davis Bike Club Taco Tuesday Ride (11:00 am from the Vets Center): the series ended May 19, 2026 (seen Oct 1).
- Davis Bike Club 2nd Saturday Easy Woodland Loop: last series ended Dec 2025; the club now lists a Second Saturday Explorer Ride with no start location (seen Oct 1).
- Napa County Bicycle Coalition events calendar (https://napabike.org/events-calendar/): one-off events only. Its Aug 1 AmCan Sunset Ride and Aug 28 "Napa Shortcuts" group ride had passed (seen Oct 1).
- Bicycling Monterey (https://bikemonterey.org/), SABA's Community Events and Bike Valet calendars: no recurring group ride I could prove.
- teamcitysacramento.com: 403 on every request (Oct 1). bikesonoma.org: returned a bot wall (HTTP 202). Both are in "Couldn't confirm".

## Extras held back (over the 3-per-host cap)

These all have dated entries on the host's own calendar, read Oct 1, 2026. Add them if the cap loosens.

- **Davis Bike Club** (feed: `https://calendar.google.com/calendar/ical/davisbikeclubwww%40gmail.com/public/basic.ics`):
  - Dixon Donut Ride, Fridays 9:00 am, Westlake Market Plaza, 1260 Lake Blvd
  - Woodland Ride, Thursdays 9:00 am, Northstar Park lot, 3500 Anderson Rd
  - Winters, Wednesdays 9:00 am, Westlake Market
  - Woodland or Esparto, Mondays 9:00 am, John Jones lot, 2068 John Jones Rd
  - Yolano Fast Ride, Tuesdays 9:00 am, Northstar Park lot (from Sept 29)
  - SOFT Ride, Fridays 9:00 am, UC Davis Visitor Information, Old Davis Rd
  - 3 Bumps, first Saturday monthly, 9:00 am, Westlake Shopping Plaza (next Oct 3)
  - 3 Bumps from Winters, No Drop, second Saturday monthly, 9:00 am (next Oct 10)
  - Second Saturday Explorer Ride, second Saturday monthly, 9:00 am (next Oct 10; no start listed)
  - 3rd Saturday Long Ride, 9:00 am, John Jones lot (next Oct 17, Nov 21)
- **Fresno Cycling Club** (feed: `https://calendar.google.com/calendar/ical/iajuho1aghkd2de16t400k2cfg%40group.calendar.google.com/public/basic.ics`):
  - Sunday Breakfast Ride to Yava Bakery, Sundays, Marco's Pizza, 2230 Herndon Ave, Clovis, B/1/20 social. The calendar says 9:00 am from Oct 4 (8:00 am before) but the description still says 8:00 am, so I held it back.
  - Mid-Week Morning Rides, Thursdays and Tuesdays, roll 9:01 am from Oct 1 and Oct 6 (8:01 am before), Armstrong and Herndon, Clovis, B/1-2/30 social.
  - Steven's to O'Neals Market, Saturdays 8:30 am from Steven's Bicycles, 1365 N Willow Ave #150, Clovis, B level, 47 miles; calendar series ends Oct 10.
  - ROG Group, Mon/Wed/Fri 9:00 am, no description.
- **Sacramento Wheelmen:** Thursday Breakfast Ride South, Thursdays 9:00 am, Florin and Riverside, Sacramento, 30-60 miles, Oct 1 to Nov 26 (https://sacwheelmen.wildapricot.org/event-6843345).
- **Sacramento Bike Hikers:** Phil's Roundabout from House of Mules, Thursdays 9:00 am, C+24; Barrio to...? Wednesdays and Thursdays 9:00 am (leader JP, destination changes).
- **Kern Wheelmen:** Monthly Gravel Ride, third Sunday 8:00 am, 2 hours, "route and ride leader to be determined" (Oct 18, Nov 15). Held back because no start is given.
- **Healthy Shasta (Redding):** Bike About Shasta, family and beginner neighborhood rides on irregular days (Oct 27 5:15 pm Enterprise Park; Nov 14 10:00 am Anderson; Dec 6 9:00 am Mary Lake) and a Downtown Loop Ride on Sept 22 at 6:00 pm from Shasta Bike Depot, 1322 California St. All on the Shasta Wheelmen's calendar; no fixed weekday.

## Couldn't confirm

Each needs a local rider to check by hand. Name, host, day, time, start, where I saw it.

- **Women Cycle Sacramento**: a group for women and women-identifying cyclists of all skill levels; day and time not stated; start not stated; seen on SABA's Bike Clubs page; Facebook group https://www.facebook.com/groups/750878929089642
- **Sacramento Cyclists**: social riding group; days not stated; seen on SABA's Bike Clubs page; Facebook group https://www.facebook.com/groups/274724869304443/
- **Hooligans Bicycle Club of Northern CA**: family club "all about having fun, building cool stuff and riding," since 2001; schedule not stated; SABA's Bike Clubs page; https://www.facebook.com/HooligansBicycleClub/
- **Tweed Riders**: periodic comfortable-pace rides, vintage bikes and clothing encouraged; schedule not stated; SABA's Bike Clubs page; https://www.facebook.com/groups/534956886520489
- **Sacramento Noshing & Adventure Cycling Collective (SNACC)**: SABA's page says "turning calories into watts"; schedule not stated; Instagram https://www.instagram.com/s.n.a.c.c/
- **Bikes Are Really Fun (BARF), "Barf at the Moon"**: night ride, most Thursdays November through March, under the J Street Bridge in Sacramento; time not stated; seen on SABA's Bike Clubs page; no page of its own found.
- **Team City Sacramento**: racers, recreational riders, commuters and more; schedule not stated; http://teamcitysacramento.com/ returned 403.
- **Women on Wheels (Chico)**: Wednesday morning road ride; start not stated; seen on Chico Velo's 2026 calendar; Facebook group https://www.facebook.com/groups/197917397658909
- **Chico Area Group Rides, Chico Women MTB, Chico MTB Rippers**: Facebook groups linked from Chico Velo's 2026 calendar (https://www.facebook.com/groups/155952774602043, /617518765043311/, /717823961590231/); schedules not stated.
- **North Rim Adventure Sports biweekly rides**: Chico Velo's 2026 calendar lists Monday 6 pm MTB (winter), Thursday 6 pm gravel and Wednesday night hills 6 pm road (meet at North Rim); only the calendar line seen; the shop's Facebook page has the details (https://www.facebook.com/NorthRimAdventureSports/).
- **Fastrack Sunday Echelon Club**: Santa Barbara, Sunday 8:30 am, Mission Santa Barbara parking lot, "typically very spirited"; seen on Fastrack's undated page (http://www.fastrackbicycles.com/rides).
- **Sonoma County Bicycle Coalition**: https://bikesonoma.org/ returned a bot wall; nothing read. Group rides likely.
- **Modesto, Monterey, San Luis Obispo, Napa, Tahoe, Reno-side California**: I found no club or shop calendar that loads. Local riders know the Strava clubs and Facebook groups; none came up in the pages I read.

## Stats

- Candidates looked at: about 45 (10 already listed, 14 Davis, 9 Fresno, about 12 Shasta, 4 Kern Wheelmen, 8 Sacramento clubs from SABA's list, plus North Rim, Chico Velo, Sports Basement and SABA rides)
- Listed: 16 (7 high, 9 medium)
- Re-check entries: 7 of 10 (4 confirmed, 3 changed); 3 couldn't re-check
- Couldn't confirm: 15 entries above (about 20 groups or rides), plus 3 existing rides I couldn't re-check
- Rejected as ended, changed or not recurring: 4 (Davis Taco Tuesday, Davis Easy Woodland Loop, the Napa calendar, Bicycling Monterey and SABA's other calendars counted as one)
- Held back by the per-host cap: 20 rides
- Dry runs: `tools/merge-ride-research.js … --dry --today 2026-10-01` accepted 16 of 16, 0 rejected. `tools/rides-apply.js … --dry --today 2026-10-01` took all 7 entries, no new validation errors.

## Sources

- https://davisbikeclub.org/ · https://davisbikeclub.org/club-events-calendar/ · https://davisbikeclub.org/club-events-calendar/ride-descriptions-2/ · https://davisbikeclub.org/tuesday-bakery-easy-ride/ · https://davisbikeclub.org/sunday-morning-no-drop-ride/ · https://davisbikeclub.org/saturday-joy-ride/ · the Davis Google Calendar feed (`davisbikeclubwww@gmail.com`)
- https://fresnocycling.com/event-6823836 · https://fresnocycling.com/Ride-Calendar · the Fresno Google Calendar feed
- http://shastawheelmen.org/ · https://shastawheelmen.org/pdf-ride-calendar · https://shastawheelmen.org/leaderless-ride-pdf-list · https://shastawheelmen.org/ridecalendar · the Shasta Google Calendar feed
- https://sacwheelmen.wildapricot.org/Ride-Calendar/ · event pages 6843338, 6782221, 6843345, 6846143, 6855802
- https://bikehikers.clubexpress.com/content.aspx?page_id=4001&club_id=216251 · https://bikehikers.clubexpress.com/content.aspx?page_id=4091&club_id=216251&item_id=3088682 · https://www.bikehikers.com/
- https://bikepartysacramento.com/ · https://www.strava.com/clubs/224090
- https://sacbike.org/ · https://sacbike.org/social-rides/ · https://sacbike.org/events-calendar/ · https://sacbike.org/bike-clubs/ · the SABA Social Rides and Community Events Google Calendar feeds
- https://www.northrimadventure.com/articles/chico-area-rides-and-events-pg37.htm · https://www.northrimadventure.com/about/north-rim-group-rides-pg295.htm · https://www.strava.com/clubs/northrimadventure · https://www.chicovelo.org/ · https://www.chicovelo.org/calendar.html · https://www.chicovelo.org/decide--ride.html
- http://www.fastrackbicycles.com/rides · https://movesbcounty.org/ · https://movesbcounty.org/events/
- https://bikebakersfield.org/ · https://kernwheelmen.org/ · https://kernwheelmen.org/calendar/ (via its admin-ajax endpoint)
- https://www.sportsbasement.com/pages/sb-x-strava-groups · https://www.strava.com/clubs/santarosagrouprides · https://www.sportsbasement.com/blogs/stores/santa-rosa
- https://bikemonterey.org/ · https://napabike.org/ · https://napabike.org/events-calendar/ · https://www.sacbikekitchen.org/
- Pages that failed or were the wrong site: http://teamcitysacramento.com/ (403), https://bikesonoma.org/ (bot wall), https://www.srcc.org/ (a state Senate campaign committee, not a cycling club), https://www.slocycling.com/ and https://www.slobike.com/ (empty pages), https://www.facebook.com/BikePartySacramento (login wall), https://www.instagram.com/sacramentobikeparty/ (429)
