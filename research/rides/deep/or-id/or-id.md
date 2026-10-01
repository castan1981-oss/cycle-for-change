# or-id: group-ride deep sweep report

- **Area id:** `or-id` (Oregon and Idaho)
- **Agent:** Oregon and Idaho group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026
- **Files:** `or-id.json` (17 new rides), `upkeep.json` (19 re-checks), this report
- **Fetch budget:** about 150 page fetches. WebSearch was capped, so every ride came from a fetched page: Shift's calendar API, club calendars, shop pages and links off them.
- **Dry runs (today = 2026-10-01):** `merge-ride-research.js` accepted 17 of 17 (US-OR 16, US-ID 1). `rides-apply.js` took all 19 entries, no errors.

## Summary

**New rides: 17** (16 high or medium in Oregon, 1 medium in Idaho). The target was about 25. I came up short on purpose: outside the Portland area almost every ride lives on a Cloudflare-walled site, an Instagram account or an undated shop page, and I would not list those.

By city:

- Portland: 9 (NoPo Night Ride, Friday Night Ride at LADDS, PSU Farmers Market Ride, King Farmer's Market Ride, Corvidae BC, Overlook Bike Ride, Foster Night Ride, RCB Wednesday Intermediate Road Ride, PBC Friday Morning Meander)
- Beaverton: 2 (both Ride Westside Monday evening rides)
- Tigard: 1
- Keizer: 1
- Salem: 1
- Corvallis: 2
- Coeur d'Alene: 1
- Eugene, Bend, Ashland/Medford, Boise, Meridian, Sun Valley/Ketchum, Idaho Falls: none new. See "Couldn't confirm".

By host: Portland Bicycling Club 1 new (3 total with the two already listed), Mid-Valley Bicycle Club 2 (3 total), Salem Bicycle Club 2 (the re-checked Keizer ride plus 2 new = 3 total), Ride Westside 2, River City Bicycles 1, the rest one each. No host is over 3.

By type: road 8, social 10 (some overlap), gravel 1. No-drop in the host's own words: NoPo Night Ride, Corvidae BC, MVBC Wednesday Night Gravel.

**Re-checks: 19.** 7 confirmed, 4 changed, 2 seasonal break, 6 couldn't confirm (written as `unreachable`).

**Biggest finding.** Shift's calendar API (`shift2bikes.org/api/events.php`, 100 days at a time) is the best single source in Oregon. Every Portland-area ride on it shows upcoming dates, a start and a venue. It is also machine-readable, so the watcher can re-read it. Nothing like it exists in Idaho.

## For the editor

- **Four rides already on the site have a new time or form.** Lactic Acid Saturday is 10:00 am from now to April (the site had the September 9:00). MVBC Tenners is 10:00 am from Oct 1. CBR's Tuesday ride is 10:00 am, not 9:00. The Keizer Family Ride was replaced from Oct 8 by a 6:00 pm Thursday Night Lights Ride from the same school.
- **Seasonal tables are in the upkeep file** (`start_times`) for Lactic Acid (May 1, June 1, Sept 1, Oct 1 of 2027) and MVBC Tenners (June 1 and Oct 1 of 2027).
- **Two rides ended for the year.** CDA Tuesday Classic (last ride Sept 29) and Pocatello Tuesday Easy Ride (ended about Sept 10).
- **Dated series, not year-round:** RCB Wednesday Intermediate Road Ride ends Oct 14. King Farmer's Market Ride is listed through Nov 22. The Ride Westside Sunset Happy Hour ride is a fall series at Xplore Food Carts.
- **Monthly rides** (Corvidae BC, Overlook) are second Sundays; `monthly_rule` is set.
- **Start moves:** Keizer Morning Ride was 9:00 am on Sept 29 and is 10:00 am from Oct 6; the host says "note the later start time". Check each October.
- **Things I left out on purpose:** the home address on Lactic Acid's Thursday MTB listing, ride leaders' phone numbers (Salem Bicycle Club, PBC) and individual organizer names.

## Why these

- **NoPo Night Ride (Portland).** Thursday 8:05 pm roll from Columbia Park. A no-drop 10-mile ramble at about 10 mph; any bike works. Lights required.
- **Friday Night Ride at LADDS (Portland).** The sporty Friday night social: 15 to 25 miles, rolls around 8 pm from Ladds Addition. Not necessarily no-drop.
- **PSU Farmers Market Ride (Portland).** Community-led Saturday ride along the Clinton greenway to the market, with three places to jump on. Year-round.
- **King Farmer's Market Ride (Portland).** A bike-bus style Sunday ride, 0 to 3 miles, from Wilshire Park to the King market.
- **Corvidae BC Monthly Ride (Portland).** Second-Sunday no-drop ride since 2017, about 10 miles, a different member leads each month.
- **Overlook Bike Ride (Portland).** Free, family-friendly second-Sunday loop of under 6 miles, coffee first.
- **Foster Night Ride (Portland).** Every other Tuesday from the Foster food carts, ends at a fire. Medium: one organizer, informal listing.
- **RCB Wednesday Intermediate Road Ride (Portland).** River City Bicycles' West Hills climbing ride to Council Crest, 5:15 pm. Only through Oct 14 this year.
- **PBC Friday Morning Meander (Portland).** Weekday-morning intermediate road ride, 20 to 30 miles, from the same church as the Slow Poke Ride.
- **Post Happy Hour Casual Ride (Beaverton).** Ride Westside's casual 7:10 pm loop on second and fourth Mondays, after a bike happy hour.
- **Sunset Happy Hour and Post Ride (Beaverton).** The other Mondays: a 10 to 20 mile ride around northern Washington County after happy hour at Xplore Food Carts.
- **Tigard Bike Happy Hour and Short Ride.** Second and fourth Thursdays, a short ride around Tigard at 6:30 pm. Medium.
- **Keizer Morning Ride (Keizer).** Salem Bicycle Club's Tuesday morning ride from Keizer Station, 10:00 am.
- **East Salem Morning Ride (Salem).** Salem Bicycle Club's Wednesday 10:00 am ride from McKay Park.
- **MVBC Wednesday Night Gravel Ride (Corvallis).** The no-drop, 20-mile McDonald Forest night ride at 6 pm, year-round. Lights needed.
- **MVBC Wednesday Road Ride (Corvallis).** Moderate Wednesday road ride, 45 to 60 miles with a pastry stop; 9:00 am in winter, 8:00 in summer.
- **Saturday Fondo (Coeur d'Alene).** The club's noon Saturday ride, about 18 mph, to Hayden Lake and Fernan Saddle. Medium: no next date listed.

## Where rides are posted here

- **Shift calendar (Portland metro).** `https://www.shift2bikes.org/api/events.php?startdate=YYYY-MM-DD&enddate=YYYY-MM-DD` (max 100 days). JSON with date, time, venue, address, details. Machine-readable. Individual event pages (`/calendar/event-<id>`) are JavaScript shells and don't carry the text.
- **Portland Bicycling Club.** `portlandbicyclingclub.com/scheduled_rides/`: one listing per ride per week with date, time, pace, start. Readable by a robot.
- **Salem Bicycle Club.** ClubExpress calendar (`salembicycleclub.org/content.aspx?page_id=4001&club_id=189926`) with event pages by `item_id`. Dated and readable; listings carry start spot and "register" info.
- **Mid-Valley Bicycle Club.** `mvbc.com/weeklyrides` plus a dated schedule and a RideWithGPS organization page (`ridewithgps.com/organizations/97-mid-valley-bicycle-club`).
- **GEARs (Eugene).** `eugenegears.org/ride-schedules/`: one month at a time, posted about a week before month end, with sign-up links. Ride names change by leader, so only the Wednesday WTNB is a stable repeat.
- **Cooperative Biking & Recreation (Boise).** Wild Apricot calendar, `communitybicyclerides.org/page-18086`; each ride is posted as its own dated event. The Tuesday ride shows only a week ahead.
- **Lactic Acid Cycling (Boise).** ClubExpress "Weekly Ride Information" page, updated by hand each week.
- **River City Bicycles (Portland).** A 2026 shop page with dated series: `rivercitybicycles.com/articles/events-shop-rides-pg140.htm`.
- **Ride Westside (Washington County).** `ridewestside.org` lists happy hours and post-happy-hour rides into 2027.
- **Walled or JavaScript-only:** bendbikerides.com (Cloudflare 403, the best Bend source), pnwridenetwork.org (Cloudflare), powerhousesv.com in Ketchum (Cloudflare), Siskiyou Velo's calendar (Wix, JS), Klink Cycles' events widget (JS). bikegallery.com and a few others are blocked by the session's proxy.
- **Strava.** The CDA club page loads (`strava.com/clubs/cdacyclingclub`) but its events need a login, and no club event pages turned up in this area without search.

## Re-checked

- **Lactic Acid Saturday Ride (Boise).** changed: 10:00 am October to April (site had 9:00). Seasonal table added. Page lists Sept 26 and Oct 1 rides.
- **Mountain Mondays (Boise).** confirmed: Boise State's page, modified June 2, 2026, lists Mondays at 5:30 pm through the fall until DST ends.
- **CBR Tuesday Because We Can Ride (Boise).** changed: 10:00 am (site had 9:00), start rotates. Last listed Sept 29 from Meridian Cycles.
- **Tuesday Classic (Coeur d'Alene).** seasonal-break: "Last ride 9/29"; back in spring.
- **Tuesday Night Easy Ride (Pocatello).** seasonal-break: the page says Tuesdays through September 10.
- **Dave's Monday Night Road Ride (Idaho Falls).** unreachable: page loads but is undated.
- **Ashland Cycle Sport Wednesday Night MTB.** unreachable: page loads but is undated.
- **The Handlebar Tuesday Shop Ride (Ashland).** unreachable: page loads but is undated.
- **Tuesday Night Rubber Mallet (Bend).** unreachable: Cloudflare wall on bendbikerides.com.
- **MVBC Tenners Saturday Social (Corvallis).** changed: 10:00 am from Oct 1 (site had the summer 9:00).
- **GEARs WTNB Wednesday Ride (Eugene).** confirmed: Wed Sept 30, 6:00 pm, Alton Baker Park.
- **Klink Cycles Social Ride (Eugene).** unreachable: first and third Wednesdays confirmed in words, but no time on the page.
- **Keizer Family Ride.** changed: now the Thursday Night Lights Ride, 6:00 pm from Oct 8, 17 miles, lights required.
- **Gay Gravel Group (Portland).** confirmed: Shift lists every Wednesday through Nov 4 and on, meet 5, ride 5:30.
- **Ride Safe PDX Thursdays (Portland).** unreachable: see below.
- **Sorella Forte Saturday Ride (Portland).** confirmed: River City Bicycles' 2026 page and Sorella Forte's home page (modified June 26, 2026).
- **Thursday Night Ride (Portland).** confirmed: Shift lists it every Thursday, 7:00 pm, Salmon Street Springs.
- **Slow Poke Ride (Portland).** confirmed: PBC calendar, Thursdays 10:00 am.
- **Saturday Tualatin Ride (Tualatin).** confirmed: PBC calendar, Saturdays 9:00 am.

Counts: confirmed 7, changed 4, seasonal-break 2, unreachable 6.

## Couldn't re-check

All six are written as `unreachable` in `upkeep.json`; none was marked confirmed.

- Tuesday Night Rubber Mallet (Bend): bendbikerides.com is behind a Cloudflare challenge. A person with a browser can read it.
- Ashland Cycle Sport Wednesday Night MTB and The Handlebar Tuesday Shop Ride (Ashland): both shop pages load and state the ride, but neither is dated. Call the shops (541-488-0581 and 541-646-4353) or check their Facebook and Instagram.
- Dave's Monday Night Road Ride (Idaho Falls): page undated; April to October is its stated season.
- Klink Cycles Social Ride (Eugene): the time (6:30 pm) isn't on any page I could read.
- Ride Safe PDX Thursdays (Portland): the Queer Social Club page is dated Oct 19, 2023, Shift's feed has nothing for Oct to Dec 2026, and the Linktree says "Weekly Thursday Ride 6:30pm @ Col Summers" with no date. Instagram @ridesafepdx is the place to look.

## Rejected

- **CDA Thursday Flats** (Thursdays 5:30 pm). Club page says "Last ride 10/1", so it is done for 2026.
- **RCB Weekly Gravel Ride** (Thursdays 5 pm from the shop, Forest Park). The 2026 series ran May 14 to Oct 1. Ends today.
- **RCB Electric Church E-Bike Road Ride** (Sundays 9:15 am). The 2026 series ends Oct 3.
- **Lactic Acid Tuesday Hill Climb.** Page says the Sept 29 ride was the last Tuesday Hill Climb of 2026.
- **Lactic Acid Thursday Night Social Ride.** Only an old July 23 note (cancelled for heat and smoke); Thursdays are not scheduled on the page now.
- **Mellow Mondays (NakedHearts:PDX).** On Shift every Monday at 7 pm, but the location is "secret, reach out via Instagram or FB". No public start.
- **Bike Social Hour (BikeLoud PDX, Wednesdays 4 pm, Rainbow Road Pub), Hillsboro Downtown Bicycle Happy Hour, Beaverton Bike Happy Hour.** Meetups, not rides.
- **Tapas Tuesday (Joseph Bicycles).** Listing says "NOT A RIDE".
- **Umpqua Velo Club (Roseburg).** Says Wednesdays at 6:00 pm and Friday coffee rides, but its Oct 2026 schedule lists only one-off rides (Oct 2 coffee ride, Oct 3 group ride). Not a proven weekly slot.

## Couldn't confirm

For Robert or a local rider to check by hand.

- **Westside Wednesday Ride #141 (Cycle Cats PDX), Beaverton.** Wednesdays, meet 7 pm, ride 8 pm, from Beaverton Transit Center, 15+ miles, about 2 hours. Shift lists only Oct 14, 2026. The "#141" suggests weekly but it is not proven. URL: `https://www.shift2bikes.org/calendar/event-14999`.
- **Thursday Lunch Laps (Ashland Cycle Sport, Medford shop).** Thursdays, wheels down 12:15 pm, laps around the Medford shop (940 N Phoenix Rd #100). Undated page: `https://www.roguecycle.com/articles/rides-and-events-pg37.htm`.
- **Friday Coffee Ride (CDA Cycling Club).** Fridays at 8:00 am (top of page) or 9:00 am (list lower down), from Workhorse, about 15 mph. The page contradicts itself, and the last ride is "TBD". `https://cdacycling.club/rides`.
- **Lactic Acid Thursday MTB Ride (Boise).** Thursday Oct 1, 6:00 pm, no-drop, Polecat trails, host-led and the start changes weekly. One dated listing, so recurrence is unproven. `https://lacticacid.clubexpress.com/content.aspx?page_id=22&club_id=95288&module_id=687238`.
- **Lactic Acid Sunday No Stress Ride (Boise).** Easiest ride, 15 mph, 17 to 21 miles, 11 am from Eagle Coffee and Bakery on one March 22 listing only.
- **Barrie's Thursday Night "No drop" ride (Pocatello).** Weekly road ride for all levels, sponsored by I.C.E.; detail page not found. `https://www.barriessports.com/articles/weekly-bicycle-rides-pg195.htm`.
- **Siskiyou Velo (Ashland/Medford).** Guests welcome on a first ride; EZ to Brisk groups. The ride calendar is a Wix page that doesn't load text. `https://www.siskiyouvelo.org/calendar`.
- **Bend rides in general.** `https://bendbikerides.com/event` is Cloudflare-blocked from here and is the best list for Bend, including any women's, gravel and early-morning rides.
- **Sorella Forte intermediate ride.** The Sorella Forte home page shows a ride-report block for an "Intermediate Ride, Saturday" that didn't load as text. `https://www.sorellaforte.com/rides`.
- **Queer and women's rides outside Portland.** None found that loads: no Eugene, Boise, Bend or Salem listing. Queer Westsiders (Ride Westside) showed only a June 1 kickoff.
- **Sun Valley/Ketchum and Idaho Falls.** Powerhouse (Ketchum) is walled; Dave's Bike Shop is the only Idaho Falls ride, already listed.

### Over the 3-per-host cap, or leader-run (not added)

- **MVBC:** Saturday Moderate/Fast Ride (9:00 am Oct to May, 8:00 am Jun to Sep, Osborn Aquatic Center), Sunday Gravel Ride series (selected Sundays April to October, 10 am, no-drop). Host already has 3 on the site.
- **Portland Bicycling Club:** Tuesday Tualatin Ride (4:30 pm, fast, from Tualatin Community Park), Wheezers and Geezers (Tuesdays 10 am), Monday Morning Meander from Gateway, Saturday and Sunday Social, Tuesday Morning Challenge. Host already has 3 on the site.
- **Salem Bicycle Club:** Saturday and Sunday leader-led rides (10:00 am and 1:30 pm, 21 to 61 miles) change weekly.
- **GEARs (Eugene):** about 200 scheduled rides a year, named and led by different people each week. Only WTNB is listed.
- **Portland:** NoPo Night Riders also hold a Last Thursday pre-ride social (Oct 29 spot to be announced).

## Stats

- Candidates looked at: about 70 (19 listed, about 30 Shift events, 20 club-calendar and shop rides)
- Listed: 17 (high 12, medium 5)
- Re-checks: 19 (confirmed 7, changed 4, seasonal-break 2, unreachable 6)
- Couldn't confirm: 11 leads above
- Rejected as ended, changed or unfit: 9 groups above
- Fetches: about 150 (cached pages re-read for details)

## Sources

- https://www.shift2bikes.org/api/events.php?startdate=2026-10-01&enddate=2026-11-30 and ...enddate=2026-12-20
- https://www.shift2bikes.org/calendar/event-14549 (and 8727, 12379, 14044, 8132, 13809, 13844, 13810, 13811, 14975, 13816, 14981, 14999)
- https://portlandbicyclingclub.com/scheduled_rides/ and its Slow Poke, Friday Morning Meander, Tuesday Tualatin and Saturday Tualatin listings
- https://www.rivercitybicycles.com/articles/events-shop-rides-pg140.htm
- https://www.sorellaforte.com/ and /rides
- https://www.ridewestside.org/
- https://www.salembicycleclub.org/content.aspx?page_id=4001&club_id=189926 and item pages 3066880, 3066876, 2953886, 2953887, 3066661, 3086068
- https://www.mvbc.com/weeklyrides
- https://eugenegears.org/ride-schedules/, /rides/, /about/links/
- https://www.klinkcycles.com/ and /rides
- https://www.bicycleway.com/articles/local-rides-events-pg195.htm
- https://www.umpquavelo.org/ and /schedule
- https://www.siskiyouvelo.org/ (home, event-list, calendar)
- https://lacticacid.clubexpress.com/content.aspx?page_id=22&club_id=95288&module_id=465312 and module_id=687238
- https://www.boisestate.edu/clc/events-and-programs/
- https://communitybicyclerides.org/ (home, page-18083, page-18086, event-6830760)
- https://cdacycling.club/rides and https://www.strava.com/clubs/cdacyclingclub
- https://www.barriessports.com/articles/weekly-bicycle-rides-pg195.htm and ...group-rides-roll-with-the-pack-tuesday-pg183.htm
- https://www.roguecycle.com/articles/rides-and-events-pg37.htm
- https://www.handlebarashland.com/articles/local-rides-clubs-pg196.htm
- https://davesbikeshop.net/about
- https://queersocialclub.com/events-portland/ride-safe-pdx-thursdays-bike-ride-rfjp6 and https://linktr.ee/ridesafepdx
- Blocked or empty: bendbikerides.com, pnwridenetwork.org, powerhousesv.com, bikegallery.com, westernbikeworks.com
