# upper-midwest deep sweep (MN, WI, IA)

Area id `upper-midwest`. Scout: Claude (ride scout). Date: 2026-10-01. About 150 fetches.

## Summary

**New rides: 27** (15 high, 12 medium). Dry run of `merge-ride-research.js`: accepted 27 (WI 12, MN 10, IA 5), rejected 0.

| City | New |
|---|---|
| Milwaukee | 7 (Friends With Bikes x2, Critical Mass, MKE REC x3, Cream City WOW women's ride) |
| Minneapolis | 5 (Perennial FTW, Behind Bars Mellow Morning, ACF first-Wednesday social, Fast Casual, Geno ATB) |
| Rochester MN | 2 (Dirty RASCals gravel, RASC Wednesday road, which is in seasonal break) |
| Iowa City | 2 (BIC Tuesday and Saturday rides) |
| Woodbury, Minnetonka, Golden Valley MN | 1 each (Freewheel Woodbury, Freewheel Minnetonka, EZ Cycle Club) |
| Slinger, Waukesha WI | 1 each (Bay View Bicycle Club Saturday and Sunday) |
| Middleton, Cambridge WI | 1 each (CORP Trails Tuesday and Thursday MTB) |
| La Crosse | 1 (Smith's TNWC) |
| Grinnell, Ankeny, Waukee IA | 1 each |

Queer / women / trans / femme / nonbinary: Friends With Bikes MKE (2), Perennial Fall FTW, Cream City WOW. No-drop and beginner: MKE REC (3), CORP Tuesday, Freewheel Minnetonka, EZ Cycle Club, Behind Bars Mellow Morning, Grinnell Gravel Curious. Early-morning: none proven (see Couldn't confirm: 5:15 and 5:30 am rides in Des Moines, Whitefish Bay and La Crosse). Gravel: RASC Dirty RASCals, Grinnell, Freewheel Minnetonka, Geno ATB.

**Re-checked: 29 existing rides.** 20 entries in `upkeep.json`: 6 confirmed, 5 changed, 8 seasonal-break, 1 unreachable. 9 rides got no entry (listed under Couldn't re-check). Dry run of `rides-apply.js`: 20 entries, no errors, no new validation errors.

Cities with nothing proven this pass: St. Paul, Duluth, Eau Claire, Green Bay, Ames, Cedar Rapids, Des Moines (leads only). Their host pages are undated, on Facebook or Instagram, or I couldn't find them.

## Why these

- **Freewheel Woodbury Monday Night Ride**: a Strava club event page loads without login and shows Mon Oct 5, 5:00 pm. It is the only Strava event page I could reach (the club page exposes one event id).
- **Freewheel Minnetonka Monday Gravel/MTB**: year-round, no-drop, shop feeds you after.
- **Perennial Fall FTW Saturday Ride**: femme/trans/women/nonbinary social ride every Saturday in October.
- **Behind Bars Mellow Morning Ride**: relaxed no-drop Saturday cruise from Northeast Minneapolis.
- **Angry Catfish first-Wednesday social**: what the summer Wednesday series turns into from Oct 7.
- **EZ Cycle Club monthly ride**: easy-pace no-drop ride with a bike shop checking bikes on site.
- **Fast Casual x Francis Burger**: intermediate, 14-16 mph, not no-drop, third Tuesday.
- **Geno ATB grocery ride**: Sunday urban gravel with a grocery stop, no-drop.
- **Friends With Bikes Thursday and Last Sunday (Milwaukee)**: the host's own page lists every date through Oct 25, and its Google Calendar repeats them. Women, trans, femme, nonbinary.
- **Critical Mass Milwaukee**: the host's page names the next ride, Oct 30, 6 pm, Red Arrow Park.
- **MKE REC Thursday, Saturday, Tuesday**: Milwaukee County's no-drop beginner rolls through Oct 24-29.
- **Bay View Bicycle Club Saturday (Slinger) and Sunday (Waukesha)**: weekly guest-friendly club rides to Oct 31 / Oct 25.
- **Cream City WOW**: women-only morning ride every other Monday, through October.
- **CORP Trails Tuesday (Middleton) and Thursday (CamRock)**: no-drop mountain bike rides with dated calendar entries as recent as Sept 29 and Sept 24.
- **BIC Tuesday 2sday 2wheelers and Saturday rides (Iowa City)**: the club's calendar lists October dates for both.
- **Imagine Grinnell Gravel Curious**: slower 13-15 mile Thursday gravel ride with free bike loans.
- **Kyle's Bikes Ankeny and Waukee Wednesdays**: shop rides with a fast road group, a trail group, and a new Waukee trail group; the shop's page is headed 2026 Season.
- **RASC Dirty RASCals Thursday gravel (Rochester)**: a different start every week, calendar lists every Thursday to Oct 29.
- **RASC Wednesday road ride**: in seasonal break, ended Sept 30.
- **Smith's TNWC (La Crosse)**: hard Tuesday training ride, on the shop's calendar through Oct 27.

## Where rides are posted here

Machine-readable feeds a robot can re-read:
- **msp.bike Twin Cities calendar** (Minneapolis Cycling Events), public Google Calendar: `https://calendar.google.com/calendar/ical/6a256e25e316cc67771b99bd499dfa57d2780d51f6eb5f9df1a9d84299a1b3c2%40group.calendar.google.com/public/basic.ics` (757 events, RRULEs, last-edited stamps). Its `/groups` page is a directory of Twin Cities clubs and shops. Best single source for Minneapolis.
- **RideWithGPS club events**: `https://ridewithgps.com/events.json?organization_id=7265` (RASC, Rochester) and `https://ridewithgps.com/organizations/7265/calendar.ics`. Both load without login.
- **Public Google Calendars**: Smith's Bike Shop (La Crosse) `invoices.smithsbikes%40gmail.com`; Friends With Bikes MKE `e6e63d65e2b10ef28b478898ac26893a2b98937ac50372d834d964d325c049d4%40group.calendar.google.com`.
- **Squarespace event listings**: Imagine Grinnell (`/events/<slug>` has Google Calendar and ICS links), CORP Trails Madison (`corptrails.org/events`, per-event `?format=ical` works, the listing itself does not).
- **ClubExpress calendars** (HTML month view): Bicyclists of Iowa City, Cream City Cycle Club (`content.aspx?page_id=4001`). Dated rides appear for the current month.
- **Wisconsin Bike Fed event pages** (`wisconsinbikefed.org/events/<slug>/`): carry season date ranges for Milwaukee Recreation and Bay View Bicycle Club rides. The WBF `?ical=1` feed returned 403.
- **Strava clubs**: club pages load; one club page (Freewheel Bike, id 470025) exposed an upcoming event id, the others did not. Club event lists need login.
- Shop pages with a "2026 Season" page: Kyle's Bikes (Ankeny, Waukee), Sugar Bottom Bikes (North Liberty).
- **Directories (leads only)**: milwaukeebikerides.com (hand-curated, CC BY-NC, lists ~30 Milwaukee groups with links), dsmgrouprides.com (Des Moines weekly table, data embedded in the page's JS, undated), Bike Madison catalog on GitHub (unreachable here).

Bot walls (not bypassed): bikeiowacity.com (sgcaptcha), perennialcycle.com (Cloudflare "Just a moment").

## Re-checked

Order is oldest verified first; all but three were verified Sept 15, 2026.

- `des-moines-ia-monday-night-no-drop-road-ride`: **seasonal-break**. BikeIowa page says Daylight Saving start to Labor Day (Sept 7, 2026). Page itself is the 2025 listing.
- `grinnell-ia-prairie-burner-tuesday-gravel-ride`: **changed**. Host page: every Tuesday Mar 10 to Oct 27, 2026, 5:30 pm, ICS available. Added season and the host page as watch URL.
- `iowa-city-ia-bic-wednesday-night-social-ride`: **changed**. October rides are 5:30 pm (Oct 7 and 14, from El Señor Cactus), not 6:00; none listed after Oct 14.
- `iowa-city-ia-gatos-en-ronda-friday-night-ride`: **unreachable**. bikeiowacity.com bot wall.
- `north-liberty-ia-sugar-bottom-bikes-wednesday-night-gravel`: **confirmed**. Shop page: Wednesdays Apr 22 to Oct 14, meet 5:50, roll 6:10. The C ride is on hold.
- `duluth-mn-ski-hut-wednesday-social-ride`: no entry (see Couldn't re-check).
- `minneapolis-mn-angry-catfish-thursday-ftw-social-ride`: **seasonal-break**. msp.bike weekly series ended Sept 24, 2026; nothing for fall.
- `minneapolis-mn-bonesaw-cycling-collective-tuesday-ride`: **changed**. Host page: last Tuesday monthly, Apr-Sep (meet 6:30 pm CEPRO Park) and Nov-Mar winter series (meet 6:45 Sabo Bridge), roll 7:00 both; September ride moved to Oct 6. Feed added.
- `minneapolis-mn-behind-bars-fixie-friday`: **confirmed**. Calendar lists Sept 25, Oct 2, Oct 30, Nov 6, 6:45 pm meet. Oct 9, 16 and 23 not posted.
- `minneapolis-mn-freewheel-wednesday-night-ride`: **seasonal-break**. Weekly series ended Sept 16, 2026.
- `minneapolis-mn-joyful-riders-club-monthly-ride`: **confirmed**. Second Thursday, next Oct 8, 6 pm.
- `minneapolis-mn-joyful-riders-dj-dance-ride`: **changed**. Season finale is Sat Oct 3, meet 6 pm, roll 6:30; the 2026 series also ran from Lowertown (St. Paul) in August.
- `minneapolis-mn-sociable-cider-recovery-wednesday-social-ride`: **confirmed**. Weekly, no end date, Oct 7-28 listed.
- `minneapolis-mn-utepils-cycling-sunday-rides`: **confirmed**. Weekly Sunday 9:45 am meet, Oct 4-25 listed.
- `minnetonka-mn-cycle-unmapped-thursday-rides`: no entry (see Couldn't re-check).
- `rochester-mn-rasc-monday-road-ride`: **seasonal-break**. Last Monday ride Sept 28; end-of-season pizza ride Oct 7.
- `appleton-wi-wheel-and-sprocket-thursday-night-ride`: **seasonal-break**. Season May 7 to Aug 27, 2026; page now shows winter in-store events.
- `green-bay-wi-market-to-music-ride`: no entry.
- `la-crosse-wi-smiths-womens-road-ride`: **seasonal-break**. Calendar series ended Sept 20, 2026; winter is Zwift at 6:30 pm.
- `madison-wi-cap-city-cyclists-mad-town-mondays`: no entry.
- `madison-wi-madison-queer-bike-ride`: no entry.
- `madison-wi-madison-womens-cycling-club-tuesday-ride`: no entry.
- `madison-wi-motorless-motion-taco-ride`: **confirmed**. Bike Fed listing: every Wednesday May-October, 6 pm, roll about 6:15.
- `middleton-wi-capital-brewery-bike-club-rides`: **seasonal-break**. No rides on its calendar after Sept 28.
- `milwaukee-wi-cadence-tuesday-thursday-rides`: **seasonal-break**. Host: season May 1 through Aug 30. It is a women's and nonbinary group (`wtf` focus not yet on the record).
- `suamico-wi-broken-spoke-monday-night-road-ride`: no entry.
- `milwaukee-wi-cream-city-cycle-club-wednesday-morning-ride`: **changed**. October rides are 10:00 am; Oct 7 and 14 on the calendar, Oct 21 and 28 need a ride leader.
- `south-milwaukee-wi-south-milwaukee-critical-mass`: no entry.
- `wauwatosa-wi-tosa-full-moon-bicycle-ride`: no entry.

## Couldn't re-check

Nothing current to read, or no way to read it. Existing records keep their old dates.

- **Ski Hut Duluth Wednesday Social** (Duluth): host page says "throughout the summer months", no dates, undated.
- **Cycle Unmapped Thursdays** (Minnetonka): BikeMN page is the 2025 listing ("Expired", May 1 2025); says Thursday nights in spring and summer.
- **Market to Music Ride** (Green Bay): the GBBC page is a June 2016 post with 2016 dates. GBBC's 2026 newsletters are embedded and unreadable.
- **Mad Town Mondays** (Madison): Google Sites page has no date; ride posts are on Instagram @cap.city.cyclists.
- **Madison Queer Bike Ride**: the only page I could read is a May 2024 article; the schedule lives on Instagram (madisonqueerbikeride).
- **Madison Women's Cycling Club Tuesday**: only a Facebook group and a third-party GitHub catalog.
- **Broken Spoke Monday Night Road Ride** (Suamico): shop page undated.
- **South Milwaukee Critical Mass** and **Tosa Full Moon Ride**: only the milwaukeebikerides.com directory (Tosa entry updated Mar 11, 2026); the hosts are on Facebook.
- **Gatos en Ronda** (Iowa City): bot wall, logged as unreachable.

## Rejected

- ACF Monday Night Training Ride (Minneapolis): calendar series ended Sept 28, 2026.
- Handup dirt ride and spicy ride (Behind Bars): monthly series ended Sept 24 and Sept 10, 2026.
- Perennial Family Fun Rides (fourth Saturdays): final ride Sept 26, 2026.
- ACF Tuesday Zesty Ride: last on calendar Aug 18, 2026. Tangletown Wednesday rides: last Aug 12. Biking with Baddies + V3 Sports summer series: last Aug 27.
- Hubbard Park Beer Garden Wednesday Ride (Milwaukee): discontinued April 2026 per milwaukeebikerides.com.
- Kyle's Friday Family Ice Cream Rides (Waukee): ran Memorial Day to Labor Day, over.
- CORP Dam Trails ride from Vintage (Sauk City, Mondays 6 pm, no-drop): last on calendar Sept 7, 2026, nothing after. CORP Quarry Ridge Sunday ride: last Sept 13, 2026.
- Tour de Chequamegon: the Wheel & Sprocket page says the event is taking a year off.
- Behind Bars Prohibition Ride (Oct 7) and similar themed one-offs: single dates, not recurring.

## Couldn't confirm

For Robert or a local rider to check by hand.

**Des Moines** (all from dsmgrouprides.com, a community-run weekly table with no dates, maps links from May-June 2025; corrections go through its GitHub issues):
- Tuesday Night World Championship (TNWC), Tue 5:30 pm, Grounds for Celebration (Beaverdale), race-pace drop ride, about 50 miles at 25+ mph.
- 515 ride, Wed and Fri 5:15 am, Kum & Go at 60th St and Ashworth Rd, West Des Moines, about 10 miles at 17-19 mph, rolls into UME.
- UME, Wed and Fri 6:00 am, Caribou Coffee on Ingersoll, multi-group no-drop, 25-30 miles.
- Erik's Zone 2 Ride, Thu 5:15 pm, Water Works Park at the Bill Riley bridge, easier no-drop, 35 miles, drinks after.
- REI ride, Sat 7:15 am, no details shown.
- Monday Night No-Drop (existing) is the same table.

**Milwaukee area** (milwaukeebikerides.com directory, hosts on Strava or Instagram):
- Tu Th group, Whitefish Bay Middle School, 5:30 am Tue/Wed/Thu/Fri non-winter months, Strava club https://www.strava.com/clubs/12855.
- Slow Roses Cycling Club, Strava https://www.strava.com/clubs/Slow-Roses-CC, Instagram slowrosescyclingclub ("Everyone Belongs on Bikes"); no schedule seen.
- Ride MKE, Strava https://www.strava.com/clubs/RideMKE, starts at Fox Point Wheel & Sprocket.
- Scrappy Hour (monthly, any weather), Instagram scrappyhourmke. Two Tired Cycling (15 mph average), Instagram two_tired_cycling. Milwaukee Tuesday Night Rides, Instagram mketnr. Milwaukee Saddle Tramps (bikepacking), Instagram mkesaddletramps.
- MKE REC Wednesday "South Side Cycling", Wed 9:30 am, South Shore Park / Kulwicki Park, Apr 15 to Oct 28: host-cap extra (see below).

**La Crosse** (Smith's group rides page, undated; facebook groups: La Crosse Rides, Lax Cycling Google group):
- Wednesday Night World C-Team, Wed 5:30 pm, SE corner of Weigent Park, 25-35 miles at 14-15 mph.
- EMAG (Early Morning Anaerobic Group), Tue/Fri 5:30 am from the dog park near Myrick Park, about 19 miles, regroups after climbs; Wednesday 5:15 am road and MTB too. Join by emailing a Google Group owner.
- World Famous Donut Ride, Saturdays Memorial Day to Labor Day, 5:30 am, La Crescent Bike Bridge, 30 miles at 17-18 mph.
- Women's Wednesday MTB 5:30 pm, Lower Hixon lot.

**Green Bay / Suamico**: Broken Spoke Wednesday Night Dirt Rides 5:30 pm and Sunday Coffee Rides 8:00 am "for newer riders" (shop page undated; Broken Spoke Cycling Facebook page).

**Duluth** (Ski Hut page, undated): Monday Night MTB Ride 5:45 meet / 6:00 roll, all-levels no-drop; Wednesday Night Gravel Ride, advanced, about 17 mph, 40-45 miles, location by email.

**Twin Cities** (msp.bike groups directory):
- All Bodies on Bikes MPLS (size-inclusive): monthly summer series from Angry Catfish, Oct 5 Fall Colors Ride 6 pm meet / 6:30 roll. Schedule is not a fixed weekday.
- Behind Bars Handup Thursday social rides and the Recovery Bike Shop Sunday "Coffee (Outside)" (not a ride, a meetup, 10 am Sundays in NE Minneapolis).
- Balance Cycling Club (members, Bryant Ave S and W 29th St), Biking with Baddies (women, calendar on its linktree), Buddy Systems (first Monday, Gold Medal Park, time TBD).
- No St. Paul recurring rides found beyond the Joyful Riders DJ ride at Lowertown Bike Shop.

**Iowa City**: Iowa City Bike Library Friday Night Ride and its event calendar (bot wall).

**Perennial Cycle**: own page behind Cloudflare; ride details come from msp.bike.

## Host-cap extras

Found and proven but not added, because the host would pass 3 rides on the site:
- Milwaukee Recreation (MKE REC): Wednesday "South Side Cycling" rides, Wed 9:30 am, alternating South Shore Park and Kulwicki Park, Apr 15 to Oct 28, 2026 (https://wisconsinbikefed.org/events/mke-rec-wednesday-rides-south-side-cycling/). Also Sunday touring rides (https://wisconsinbikefed.org/events/mke-rec-sunday-touring-long-distance-rides/).
- Sugar Bottom Bikes: Saturday morning rides, "occasional Saturdays year round", 7-9 am meet, 15-17 mph drop ride (shop page; not added: no dates).
- Imagine Grinnell is at 2 (Tuesday plus Thursday); Kyle's Bikes at 2; RASC at 3 (Monday, Wednesday, Thursday); BIC at 3; Freewheel at 3; Milwaukee Recreation at 3.

## Stats

- Candidates looked at: about 55
- Listed: 27 (high 15, medium 12)
- Couldn't confirm: about 24
- Rejected as ended or changed: 12 (plus 8 existing rides moved to seasonal break and 5 changed)
- Existing rides re-checked: 29 (6 confirmed, 5 changed, 8 seasonal-break, 1 unreachable, 9 no entry)

Notes for the editor: `season` strings like "Apr–Sep, Nov–Mar" (Bonesaw) and "mid-Apr–Oct" are free text. Five new Milwaukee-area records and the Kyle's Ankeny and Waukee records have `last_seen: null` because the proof is a 2026 season window, not a dated ride. Start addresses for the Friends With Bikes, Critical Mass and MKE REC rides are intersections or "varies", so `address` is null. Cadence is a women's and nonbinary group; the existing record could carry `inclusive_focus: ["wtf"]` (host's words: "all women and nonbinary cyclists").

## Sources

Fetched and read:
- https://www.bikeiowa.com/Event/16079/monday-night-no-drop-road-ride
- https://www.dsmgrouprides.com/ (and its page JS)
- https://www.bikeiowa.com/Event/16564/prairie-burner-weekly-gravel-rides
- https://www.imaginegrinnell.org/ , /programs , /events/weekly-prairie-burner-rides , /events/thursday-night-gravel-gravel-curious-ride
- https://bic.clubexpress.com/content.aspx?page_id=22&club_id=74108&module_id=153871 , page_id=4001 calendar , module_id=404746
- https://bikeiowacity.com/event-calendar/ (bot wall)
- https://www.sugarbottombikes.com/ , /rides
- https://www.skihut.com/articles/local-rides-clubs-pg208.htm
- https://www.angrycatfishbicycle.com/articles/group-rides-events-pg260.htm
- https://msp.bike/events , /groups , /events/acf-thursday-ftw-ride-ce93d5dd and the public Google Calendar feed above
- https://bonesawcycling.bike/events
- https://www.perennialcycle.com/shopcast/event/dj-dance-ride-series/ (bot wall)
- https://www.bikemn.org/events/cycle-unmapped-weekly-rides/
- https://www.rasc-mn.org/road-gravel-biking , https://ridewithgps.com/events.json?organization_id=7265 , https://ridewithgps.com/organizations/7265/calendar.ics
- https://www.strava.com/clubs/470025 , /clubs/470025/group_events/3480957573192654492 , /clubs/1844456 , /clubs/1089028 , /clubs/12855 , /clubs/Slow-Roses-CC , /clubs/RideMKE
- https://www.freewheelbike.com/events/group-rides-pg1040.htm
- https://www.wheelandsprocket.com/about/event-calendar-pg76.htm
- https://cadencemke.com/rides/
- https://www.gbbicycle.org/market-to-music-ride/ , /news/ , /june-july-2026-news/ , /march-2026-news/
- https://smithsbikes.com/group-bike-rides/ , /calendar/ , https://calendar.google.com/calendar/ical/invoices.smithsbikes%40gmail.com/public/basic.ics
- https://www.capcitycyclists.com/mad-town-mondays
- https://raw.githubusercontent.com/allyrilling/madison-group-rides/main/src/content/rides/madison-womens-cycling-club-tuesday.md , /README.md
- https://wisconsinbikefed.org/events/ and event pages: motorless-motion-taco-ride, bay-view-bicycle-club-weekly-sat-ride-big-cedar-lake, bay-view-bicycle-club-weekly-sun-ride-3-trails-west, mke-rec-tuesday-rides-good-morning-hank, mke-rec-thursday-night-rides, mke-rec-wednesday-rides-south-side-cycling, mke-rec-saturday-community-bike-rides-2
- https://ourliveswisconsin.com/article/madison-queer-bike-ride/
- https://capitalbikeclub.org/ and its calendar
- https://www.creamcitycycleclub.com/ , /content.aspx?page_id=4001&club_id=119379 , /content.aspx?page_id=22&club_id=119379&module_id=395031
- https://www.brokenspokebikes.com/events/local-rides-pg206.htm
- https://www.milwaukeebikerides.com/ , /llms.txt , /index.xml , /riding-group/<tosa-full-moon-bicycle-rides, slow-roses-cycling-club, scrappy-hour, friends-with-bikes, two-tired-cycling, critical-mass-milwaukee, ride-mke, tuesday-night-rides, tu-th, milwaukee-saddle-tramps>/
- https://fwbmke.com/ and the Friends With Bikes public Google Calendar feed
- https://www.mkecriticalmass.com/ , https://www.slowrosescyclingclub.com/
- https://www.kylesbikes.com/articles/weekly-rides-pg1281.htm
- https://corptrails.org/events and event pages (middleton-tuesday-night-rides..., cy9y7rgng8y89wn-4emfg, the Dam Trails event)
- https://www.machineryrowbicycles.com/articles/group-rides-pg249.htm , /local-rides-pg247.htm
- https://www.coggs.com/calendar , https://www.bikeworldiowa.com/ , https://www.bikeiowa.com/Events (nothing usable)
