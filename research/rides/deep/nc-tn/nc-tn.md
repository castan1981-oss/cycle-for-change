# nc-tn: group-ride deep sweep report

- **Area id:** `nc-tn` (North Carolina and Tennessee)
- **Agent:** NC/TN group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026
- **Files:** `nc-tn.json` (10 new rides), `upkeep.json` (51 entries, one per ride already listed), this report
- **Fetch budget:** about 165 page fetches, a bit over the 150 asked. WebSearch was exhausted, so no Strava event page was reachable by search.

## Summary

**New rides: 10 (6 high, 4 medium), against a target of about 25.** I fell short and would rather say so. The reasons are in "Where rides are posted here": the NC and TN rides that load with dates mostly belong to hosts that already have three rides on the site (Hightailers, Harpeth, Veloteers, Oaks & Spokes, the Chattanooga club), and the 3-rides-per-host cap counts those. The rest are Instagram, Facebook or Strava only.

New rides by city:

- Charlotte: 4 (two Bicycle Sport, two Trek Bicycle Store of Charlotte)
- Boone and Blowing Rock: 2 (Boone Bike & Touring)
- Etowah and Hendersonville: 2 (Blue Ridge Bicycle Club training rides)
- Wilmington: 1 (Cape Fear Cyclists)
- Mint Hill: 1 (Honor The Warriors)
- Raleigh, Durham, Chapel Hill, Greensboro, Winston-Salem, Nashville, Franklin, Memphis, Knoxville, Chattanooga: none new. Nothing provable turned up that wasn't already listed or capped.

By host: Blue Ridge Bicycle Club 2, Boone Bike & Touring 2, Bicycle Sport 2, Trek Bicycle Store of Charlotte 2, Cape Fear Cyclists 1 (3 on the site now), Honor The Warriors 1.
By type: road 7, mtb 1, social 2.
No new queer, women / trans / nonbinary or BIPOC ride made it in. Every one I found is Instagram or Facebook only (see Couldn't confirm). Two are no-drop and beginner-friendly in the host's own words (Eastside Tuesday, Whitewater Thursday MTB).

Re-checks of the 51 rides already listed:

- confirmed 14
- changed 6 (Charlotte Thrives, Cargo District Thursday, Harpeth Sunday start moves Oct 18, three Veloteers rides)
- seasonal-break 4 (Major Taylor Thirsty Thursday, Magic Cycles Wednesday, Harpeth Thursday evening, Harpeth Tuesday evening)
- unreachable 27 (page loads with nothing dated, page won't load, or only an Instagram source)

## For the editor

- **Time changes in October.** Cargo District Thursday (Wilmington) moved from 6:00 to 5:15 pm. The three Veloteers rides on the site changed too: Thursday is 5:15 pm (was 6:00), Girls' Morning Out is 9:00 am (was 8:00), Monday community ride unchanged at 5:30 pm. Harpeth Sunday goes from 8:00 to 9:00 am on Oct 18 (`start_times` set).
- **Veloteers season.** The site has these three as April to September. The club says its full weekday calendar is April to September, but its own home page lists weekday rides for Oct 1 to Oct 6. I cleared `season` and `season_months` on all three and put the club's wording in `visitor_notes`.
- **Charlotte Thrives is not "second Sunday".** The host's own ride page lists the Sept 27 ride (a fourth Sunday) at 10 am from Mugs Coffee, 5126 Park Rd. I set `monthly_rule` to null and the time to 10:00. Please look at the Instagram handle the site already has, because the page shows only the next date.
- **Medium rides without a dated occurrence.** The four Charlotte shop rides and the two Boone Bike rides come from shop pages that state the schedule but show no dated ride. The Charlotte pages carry only a 2026 copyright footer. I marked them medium and left `last_seen` null. Re-check them at the November time change.
- **Boone conflicts.** Boone Area Cyclists and Boone Bike & Touring disagree on the Basil's ride (Tuesday on one page, Wednesday on the other). I listed only the two rides they agree on (Monday and the Food Lion Tuesday) and left Basil's out.
- **Flaming Amy's start time.** The Sept 30 event page says 5:30 pm. The club moved Cargo District Thursday earlier this month, so the October time may have moved too. The calendar lists it only to Oct 21.
- **No Meetup feeds.** Meetup's `/events/ical/` now answers `{"message":"Invalid feed signature"}` (403) for every group I tried, so none went into `feed_url`.
- **Personal phone numbers** appear on several club event pages (Cape Fear Cyclists, Blue Ridge Bicycle Club). I left all of them out.

## Why these

- **Trevor's Etowah Training Ride (Blue Ridge Bicycle Club, Etowah).** A new weekday-noon training series on one 38-mile route to Looking Glass Falls, Tuesdays and Thursdays, with a 30-mile option. Dated calendar entries run through December.
- **Trevor's Jackson Park Training Ride (Blue Ridge Bicycle Club, Hendersonville).** Saturday on the club's 33-mile Apple Pancake loop. The start goes from 9:30 am to noon on Nov 7, and `start_times` carries that.
- **Monday Night Ride (Boone Bike & Touring, Blowing Rock).** The classic Viaduct loop on the Blue Ridge Parkway, 30 miles at 15 to 17 mph, from the Blowing Rock parking deck. The shop calls it a common first group ride.
- **Eastside Tuesday Night Ride (Boone Bike & Touring, Boone).** The shop's "most beginner-friendly no-drop" ride, 27 miles from the Deep Gap Food Lion with regroups.
- **Flaming Amy's Burrito Ride (Cape Fear Cyclists, Wilmington).** The club's all-speeds Wednesday evening ride: laps of Greenfield Lake, then burritos. The easiest on-ramp on their calendar.
- **Monday Night Shop Ride (Bicycle Sport, Charlotte).** A fast 30-mile Uptown ride in A and B groups, 6:00 pm while daylight saving time is on.
- **Saturday Morning Ride (Bicycle Sport, Charlotte).** A year-round 40-mile Myers Park ride with A, B and C groups; the start moves to 8:30 am on Nov 1.
- **South Charlotte Wednesday Night Ride (Trek Bicycle Store of Charlotte).** A show-and-go road ride toward Marvin and Waxhaw with a slower B2 group that has a leader and sweeper.
- **Thursday Night Mountain Bike Ride at Whitewater (Trek Bicycle Store of Charlotte).** No-drop, beginner and intermediate, 10-plus miles, social. One of the few beginner MTB rides in Charlotte with a posted time.
- **Mint Hill Community Ride (Honor The Warriors).** A weekly hour-long Wednesday neighborhood ride run by a veterans adaptive-cycling nonprofit. Everyone is welcome.

## Where rides are posted here

What a robot can re-read (worked on Oct 1):

- **ClubExpress calendars** (the best source in this area). Cape Fear Cyclists: `https://www.capefearcyclists.org/content.aspx?page_id=4001&club_id=807047` (month grid, every ride listed with date; each event page has time and start). Blue Ridge Bicycle Club (Hendersonville): `https://brbcnc.clubexpress.com/content.aspx?page_id=4001&club_id=285841` (list view with every dated ride through December). Memphis Hightailers: the weekly rides page, no date feed.
- **Wild Apricot.** Veloteers' home page (`veloteers.org`) lists the next seven days of rides with times.
- **Harpeth Bike Club** `harpethbikeclub.com/events`: dated list with start, route and level for every ride; each event also has an ICS.
- **Oaks & Spokes** `oaksandspokes.org/events/`: dated list with times and starts. Raleigh Coffee Outside, Critical Mass and the Green Line bus all show there.
- **Two Bikes (Knoxville)** `twobikes.org/community`: dated calendar with a Google Calendar and ICS link per event.
- **Downtown Durham Inc** event pages (The Events Calendar): Black Spoke Society's First Tuesday ride has dated pages for each month through April 2027. The site's `?ical=1` feed did not carry it.
- **Meetup pages** load as HTML and carry past and upcoming events in the page data (Charlotte Urbanists' Critical Mass shows that way); the ICS feeds do not work.
- **Cycles de ORO (Greensboro)** has two ride pages with "Updated" dates.
- **Shop pages built on Lightspeed** (Bicycle Sport, Trek of Charlotte, Trail & Fitness, Ride615, Scott's): they state the weekly schedule but never a date. They are medium at best.

What doesn't load or carries nothing dated:

- **Chattanooga Bicycle Club** calendar: filled in by a MembershipWorks script (org 17513). A plain fetch shows "Loading…". Its four rides on the site can't be re-checked this way. The club has four rides on the site already, over the cap.
- **Instagram or Facebook only:** most Durham rides (Bike Durham's March 2025 PDF lists them with Instagram handles), Charlotte Thrives' dates, Bike Curious, Clarksville Cycling Club, the Charlotte neighborhood rides.
- **Strava clubs** load but show no event without a login (Dirt Divas, PMTNR, Shelby Ave, The Hub, Bicycle Sport, Queen City Winter Bike League). No Strava `group_events` page could be found without search.
- **Bot walls and dead sites:** crankarmbrewing.com (202 page), riversports.com (403), hopflycycling.org, thespokeeasy.com, motionmakersbikeshop.com, smokymountainwheelmen.org, clevelandareacyclists.org (no connection). Not worked around.

## Re-checked

Confirmed (14):

- `memphis-tn-hightailers-chill-ride`: club page says Sundays 2:00 PM, Apr 26 to Nov 22, 2026.
- `oakland-tn-hightailers-tuesday-gravel`: Tuesday 6:00 PM, East Oakland, no-drop, not marked closed.
- `knoxville-tn-two-bikes-coffee-outside`: Oct 4 and Nov 8 on the calendar.
- `knoxville-tn-two-bikes-bike-party`: Sept 25 held; Halloween Bike Party Oct 30, 6:00 PM.
- `asheville-nc-bears-community-ride`: Ride #18 on Sept 30, 6:30 pm roll.
- `charlotte-nc-critical-mass`: Meetup shows Aug 28, 7:00 PM; the host site says last Friday, meet 6:45.
- `durham-nc-black-spoke-society-first-tuesday-ride`: Oct 6, 6:00 pm at CCB Plaza on the Downtown Durham page.
- `greensboro-nc-cycles-de-oro-easy-riders-tuesday`: page updated 7.26.2026, Tuesdays in daylight saving time.
- `greensboro-nc-cycles-de-oro-saturday-social-ride`: page updated 8.26.2026, Saturdays 10 am.
- `raleigh-nc-coffee-outside`: Oct 2, 7:30 am.
- `raleigh-nc-critical-mass`: Oct 30, 7:00 pm.
- `raleigh-nc-green-line-bike-bus`: Wednesdays Oct 7 to Oct 28, 7:30 am, April to October 2026.
- `wilmington-nc-cfc-coffee-and-a-roll-sunday`: Sundays Oct 4 to Oct 25, 8:00 am, from Greenfield Lake.
- `winston-salem-nc-ride-like-a-fish`: every Monday, year round; bonfire edition Nov 2, 6:15 pm.

Changed (6):

- `wilmington-nc-cfc-cargo-district-thursday`: now 5:15 pm (was 6:00); listed Oct 1, 8, 15, 22 and 29.
- `franklin-tn-harpeth-bike-club-sunday-ride`: 8:00 am through Oct 11, 9:00 am from Oct 18 (`start_times`).
- `charlotte-nc-charlotte-thrives-queer-ride`: monthly, but not the second Sunday; Sept 27 at 10 am from Mugs Coffee.
- `gladeville-tn-veloteers-thursday-social-ride`: now "Thursday Afternoon Social Ride", 5:15 pm.
- `gladeville-tn-veloteers-girls-morning-out`: now 9:00 am.
- `mount-juliet-tn-veloteers-monday-community-ride`: unchanged at 5:30 pm; season cleared because the club lists it into October.

Seasonal break (4):

- `germantown-tn-major-taylor-thirsty-thursday`: club says it ends at the end of September.
- `boone-nc-magic-cycles-shop-ride`: Boone Area Cyclists say mid-March to September; the shop page says around the time change. Marked a break; may still be rolling in October.
- `franklin-tn-harpeth-bike-club-thursday-evening-hunters-bend`: last evening date on the club calendar is Oct 1.
- `rockvale-tn-harpeth-bike-club-tuesday-evening-patterson`: last evening date on the club calendar is Sept 22.

## Couldn't re-check (27, written as `unreachable`)

Page loads but nothing is dated, or won't load, or Instagram/Facebook only:

- `asheville-nc-motion-makers-womens-mtb-ride` (SORBA page lists Mondays 6 PM, nothing dated 2025 or 2026; shop site didn't load)
- `charlotte-nc-charlotte-bike-party` (only the weeklyrides.com directory; Birdsong's events page is blank)
- `charlotte-nc-plaza-midwood-tuesday-night-ride` (club page and public Google calendar have nothing after 2017; Facebook didn't load)
- `charlotte-nc-dirt-divas-tuesday-mtb-ride` (calendar page still titled 2025)
- `charlotte-nc-spoke-easy-wednesday-urban-ride` (site didn't load)
- `gastonia-nc-ride-a-bike-happy-tuesday-ride` (shop's social calendar flyers are images)
- `durham-nc-first-friday-ride`, `durham-nc-ride-around-durham`, `durham-nc-the-daily-womens-plus-ride`, `durham-nc-twig-cruiser-ride` (March 2025 PDF pointing to Instagram)
- `pisgah-forest-nc-hub-wednesday-shop-ride` (events page "No event found!", ride lives on Strava)
- `raleigh-nc-crank-arm-wednesday-ride` (Visit Raleigh page undated; brewery site bot wall)
- `chattanooga-tn-cbc-beginner-leisure-ride`, `chattanooga-tn-cbc-downtown-to-market`, `chattanooga-tn-cbc-riverpark-ride`, `chattanooga-tn-velo-vixens-cbc-tuesday-night-hills` (script-loaded calendar)
- `clarksville-tn-clarksville-cycling-club-evening-rides` (Facebook blocked)
- `cleveland-tn-scotts-thursday-night-road-ride`, `cleveland-tn-scotts-tuesday-night-mountain-bike-ride` (shop pages undated)
- `columbia-tn-columbia-cycling-club-saturday-ride` (undated; members get times by email)
- `franklin-tn-nashville-local-cycling-gsd-saturday` (undated; winter start one hour later, no switch date)
- `nashville-tn-bike-curious-sunday-ride` (undated; times on Instagram)
- `nashville-tn-domestiques-weeknight-rides` (site footer 2025, "No events at the moment")
- `nashville-tn-music-city-dope-pedalers-friday-ride` (only a 2025 article; not re-fetched)
- `nashville-tn-trail-and-fitness-percy-warner-night-ride` (only a 2026 copyright footer)
- `nashville-tn-shelby-ave-bicycle-tuesday-night-ride` (aggregator shows May only)
- `nashville-tn-ride615-sylvan-park-tuesday-night-ride` (undated)

## Rejected

- **Cycle N Suds (Blue Ridge Bicycle Club, Weaverville, Saturdays at Eluvium Brewing).** The Oct 3 date was cancelled for rain, and the event page calls it the "last Cycle 'n Suds of 2026" and says the club needs new planners for 2027. Seen Oct 1, 2026.
- **Cumberland Transit (Nashville) events.** The page says "There are no upcoming events"; the newest past event is April 2024. Seen Oct 1, 2026.
- **Queen City Bicycles (Charlotte) events page.** Copyright 2013, no rides.
- **Bike Durham event calendar.** Lists classes and open streets (Oct 4 Move-A-Bull City), not group rides.
- **Liberty Bicycles rides page.** Looked like an Asheville lead from a SORBA note, but the shop is in St. Catharines, Ontario. Not NC.
- **Tour de Frights (Two Bikes, Oct 16)** and the Haunted Hundred, Festi-Velo, NC Mountains to Coast: one-off events.
- **BRBC's Trevor's Etowah Thursday on Oct 1 at 9:30 am.** One earlier time on the same series; folded into the Etowah record.

## Couldn't confirm

For a local rider to check by hand. Name, host, day, time, start, where I saw it.

**Durham** (source: Bike Durham's PDF "Durham-based bike rides", uploaded March 2025, `https://static1.squarespace.com/static/5848723e4402430583905527/t/67e46f6bafa8c16b15cedade/1743023979714/Durham-based+Bike+Rides+List.pdf`; all post on Instagram):
- Black Spoke Society Wednesday ride, Wed 6:00 pm, CCB Plaza, no-drop, about 10 miles, "for Black and queer folks" (@blackspokesociety). Only the First Tuesday ride is confirmed.
- Bike Durham Community Ride, 4th Monday 6 pm, Durty Bull, no-drop, about 8 miles (@bikedurham).
- Pony Ride, 2nd Tuesday 7 pm, CCB Plaza / Ponysaurus Brewing, no-drop (@ponysaurusbrewing).
- Scrappy Tuesdays, Tuesdays 7:30 pm, Bullseye Bike Shop / Parts & Labor, 12 to 15 miles, drop (@parts8labor).
- Rescue Racing Ride, Wednesdays 6:00 pm, The Daily Beer Bar, 22 miles, A and B groups, no-drop (@rescue_racing).
- Crank Arm Ride, Wednesdays 7:00 pm, Crank Arm Brewing Durham (@crankarmdurham).
- Black Girls Do Bike Raleigh-Durham, monthly, various starts, for Black women, private Facebook group (@bgdbraleighdurham).
- Full Moon Fever Ride, monthly at the full moon, 7:30 pm, Mellow Mushroom Durham, 30 miles on the American Tobacco Trail (dprplaymore.org).
- Hyperlocal Bike Tours, 3rd or 4th Sunday about noon, CCB Plaza (@hyperlocaldurham).
- Bullseye Bicycle Thursty Thursday Cruiser Ride, last Thursday of the month, meet 7:00, roll 7:30, 102 Morris St, Durham. `https://bullseyebicycle.com/cruiser-ride-every-last-thursday-of-the-month/`. The page footer says 2024 and it points to Instagram for updates.

**Charlotte** (source: weeklyrides.com's directory `https://www.weeklyrides.com/index.php/group-rides`, third party; host pages not found or not loading):
- Lazy Sunday Bike Ride, 2nd and 4th Sunday, easy and beginner-friendly, Charlotte Urbanists (`clturban.ist`, Instagram @clt_urbanists). No time or start found.
- Cyclehops at Amor Artis, Wednesday night social ride, 7 to 10 miles, parking lot behind Amor Artis Brewing.
- NoDa Social Ride: Thursday 7 pm from Local Loaf, social, 12 to 16 miles; Monday 7 pm from Divine, quicker; a Saturday ride from Summit Coffee.
- P-Ride, Thursday 7 pm, Giddy Goat (1217 The Plaza), faster and longer.
- Queen City Winter Bike League, Sundays 10 am from HopFly Brewing parking lot (1327 S Mint St), about 18 mph, 55 miles. Strava club `https://www.strava.com/clubs/qcwbl`. The Strava text says "starting 12/4" so it is a winter series; restart date unknown.
- Mojo Riding Cycling Team, Sunday 7:30 am, corner of Carmel and Quail Hollow, about 40 miles at 19 mph or more.
- Cornelius Cycling Club, Matthews Cycling Club, Mooresville Area Cyclists, Gaston County Cyclists, FTLOC Waxhaw (Tue and Thu evenings, GroupMe), Rock Hill Bicycle Club, Renaissance Park trails group: names and days only, no host calendar found.
- Piedmont Flyers (Lewisville and Winston-Salem area): `piedmontflyers.org` returns a nearly blank page.

**Boone and mountains:**
- Monday Bistro Ride (Mondays 5:30 pm, Strava), Valle Crucis Thursday Ride (Thursdays 5:30 pm, Strava), Food Lion TNR (RideWithGPS): listed on `https://booneareacyclists.org/ride/`, no dated source. Boone Bike & Touring's Wednesday Night Ride from Basil's (5:30 pm, 25 miles at 18 to 20 mph, no-drop) conflicts with Boone Area Cyclists, who put Basil's on Tuesday.
- Cognative MTB Brevard group ride, weekly, Facebook group (via weeklyrides.com).

**Nashville and Franklin:**
- Tuesday Night Worlds, Nashville Local Cycling, Tuesday night, about 25 miles from Tivity Health in Cool Springs, drop ride. `https://nashvillelocalcycling.com/rides`, page undated.
- Ride615 Homegrown Taproom rides, Thursdays 6:15 pm in fall and winter from Ride615 Donelson, lights required (`https://www.ride615.com/articles/local-rides-pg195.htm`, undated).

### Proven rides left out by the 3-per-host cap

These all have dated evidence from Oct 1, 2026. The cap counts rides already on the site, so I left them out. Add them if Robert lifts the cap for these hosts.

- **Harpeth Bike Club (3 on the site):** Saturday Club Ride, 9:00 am from Hillsboro Elementary, Leipers Fork (Oct 3 at 8:00 am, Oct 10 and 17 at 9:00 am); Westhaven Tuesday AM and Thursday AM rides, informal, club members. `https://www.harpethbikeclub.com/events`
- **Veloteers (3 on the site):** Saturday Morning at Gladeville 9:00 am (Glade Church); Monday Morning 8:00 am (Gladeville Community Center); Tuesday Morning 9:00 am; Cyclists in Cadence Getting Coffee, Wednesday 8:00 am, Hamilton-Denson Park, Mt. Juliet; Rest Day at Gladeville, Sunday 8:00 am. `http://www.veloteers.org/`
- **Cape Fear Cyclists (now 3 with Flaming Amy's):** Monday Night on Town Creek, Mondays 6:00 pm, Class A and B welcome, 27 miles at 20 to 22 mph, Zion UMC, Leland; Tuesday in Leland, Longleaf Park to Wrightsville Beach (Tuesdays), Halyburton Park rides (Thursdays), The Mural Ride.
- **Memphis Hightailers (3 on the site):** Mellow Mushroom ride Tuesday 6:00 pm from Target Germantown (22 to 30 miles, beginner group 16 to 18 mph, no-drop); MHBC Saturday Gravel Ride 8:00 am (25 to 70 miles); Skip's Peanut Butter Ride Saturday 8:00 am; Vic's Ride Saturday (7:00 am in summer, 8:00 am otherwise); Monday Morning Blues Buster 8:00 am. `https://www.memphishightailers.com/content.aspx?page_id=22&club_id=631861&module_id=154509`
- **Chattanooga Bicycle Club (4 on the site):** nothing readable; the calendar is script-loaded.

### Hand-offs

None outside the area. Oaks & Spokes' one-off rides (Light up the Night Oct 2, 50 Miles for 50 Years Oct 4) are events, not recurring rides.

## Stats

- Candidates looked at: about 70 (existing 51 plus about 40 new leads and hosts, some overlapping)
- New rides listed: 10 (high 6, medium 4)
- Re-checks written: 51 (confirmed 14, changed 6, seasonal-break 4, unreachable 27)
- Couldn't confirm (new leads, by name): 31
- Rejected: 7
- Dry runs (Oct 1, 2026): `merge-ride-research.js` accepted 10 of 10; `rides-apply.js` accepted all 51 entries with no new validation errors.

## Sources

Pages I read (fetched Oct 1, 2026 unless noted):

- https://booneareacyclists.org/ride/
- http://www.boonebike.com/about/local-group-rides-pg59.htm
- https://www.memphishightailers.com/content.aspx?page_id=22&club_id=631861&module_id=154509
- https://twobikes.org/community
- https://ashevilleonbikes.com/events/bears-community-ride and https://ashevilleonbikes.com/events
- https://www.pisgahareasorba.org/find-your-ride
- https://cltspokespeople.org/rides/pmtnr/, /calendar/, /feed/ and its public Google calendar (`cltspokespeople@gmail.com`)
- https://www.clturban.ist, https://www.meetup.com/charlotte-urbanists/events/, https://www.meetup.com/charlotte-area-cycling/events/
- https://www.charlottethrives.com and /pridebikeride
- https://www.weeklyrides.com/index.php/group-rides (lead list only)
- https://dirtdivas.net/, /calendar/, /club-activities/; https://www.strava.com/clubs/dirtdivasclt, /276822, /464369, /1755747, /qcwbl
- https://rideabike.com/ and /products/monthly-social-calendar
- https://downtowndurham.com/event/first-tuesday-social-ride/2026-10-06/ and /2027-04-06/; https://downtowndurham.com/events/?ical=1
- https://www.bikedurham.org/events, its calendar API for Oct 2026, and the March 2025 PDF list
- https://bullseyebicycle.com/cruiser-ride-every-last-thursday-of-the-month/
- https://oaksandspokes.org/events/; https://www.visitraleigh.com/event/crank-arm-wednesday-bike-ride/104693/; https://www.oakcitycycling.com/articles/events-pg71.htm
- https://cyclesdeoro.com/Easy_Riders_2026.htm and /Sat_Social_ride.htm
- https://www.beersngears.com/; https://www.thehubpisgah.com/ and /events/
- https://www.capefearcyclists.org/content.aspx?page_id=4001&club_id=807047 and event pages 2995292, 3066359, 3064563, 3065570, 2909815
- https://chattanoogabicycleclub.com/cbc-calendar-mw/
- https://brbcnc.clubexpress.com/content.aspx?page_id=4001&club_id=285841 and event pages 2835071, 2835131, 2835003, 2922194
- https://www.harpethbikeclub.com/events; https://nashvillelocalcycling.com/rides; http://www.veloteers.org/
- https://www.scottsbikes.com/news/thursday-night-road-bike-ride-pg196.htm and /articles/tuesday-night-mountain-bike-ride-pg193.htm
- http://www.columbiacyclingclub.com/grouprides; https://bikecurious.net/about; https://www.domestiquescyclingclubtn.com/
- https://www.tf.bike/articles/rides-and-events-pg37.htm; https://www.ride615.com/articles/local-rides-pg195.htm; https://ma.to/venue/shelbybicycle; https://cumberlandtransit.com/events/
- https://www.bicyclesport.com/articles/rides-events-pg195.htm; https://www.trekofclt.com/articles/our-group-rides-pg1188.htm and /events-news-pg1241.htm; http://www.QueenCityBicycles.com/events.htm
- https://honorthewarriors.org/; http://www.piedmontflyers.org/; https://libertybicycles.com/rides/
- https://www.facebook.com/Clarksvillecyclingclub/ (blocked)
