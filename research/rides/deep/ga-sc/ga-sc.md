# ga-sc: group-ride deep sweep report

- **Area id:** `ga-sc` (Georgia and South Carolina)
- **Agent:** group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026
- **Files:** `ga-sc.json` (25 new rides), `upkeep.json` (20 re-check entries), this report
- **Fetches:** about 120. The search tool was out, so rides came from shop and club pages, RideWithGPS, WordPress calendars and one Squarespace events page. No Strava event page turned up: the Strava clubs I found (Whitetail, Atlanta Trek, Rock Hill) load, but their event lists don't, and I had no way to find event ids without search.

## Summary

**New: 25 rides** (8 high, 17 medium). Georgia 19, South Carolina 6.

- Georgia: East Point 2, Roswell 2, Milton 2, Conyers 2, Savannah 2, Columbus 2, Atlanta 1, Tucker 1, Vinings 1, Marietta 1, East Cobb 1, Hiram 1, Senoia 1.
- South Carolina: Mount Pleasant 2, Rock Hill 1, Charleston 1, West Columbia 1, Greenville 1.
- Nothing new for Athens, Augusta, Macon, Spartanburg, Myrtle Beach, Hilton Head, Columbia proper or Decatur. I found no page that loads with a schedule for those. See "Couldn't confirm".
- By type: road 19, gravel 3, MTB 3 (RAMBO and two Standing Boy), with 5 of the road rides also social. Beginner or no-drop in the host's words: MACC Beginner / Casual, Free-Flite Saturdays (two), Bike Roswell Saturday, Trek Charleston Saturday, Trek Mount Pleasant Sunday.
- **No LGBTQ ride and no new women / trans / nonbinary ride made it in.** I found none with a page that loads. The two already on the site are Rock Hill Women's Wednesday (re-checked, time changed) and Cola WTFNB Columbia (could not re-check).

**Re-checks: 20 existing rides.** 7 confirmed · 1 changed (Rock Hill Women's Wednesday) · 1 seasonal break (Greenville Spinners Tuesday SCTAC, ended mid-September) · 11 could not confirm (no entry changes; written as `unreachable` with a note).

Host cap (3 per host, counting rides already on the site): MACC 3, ATLPTN 3 (Pizza Ride on the site + 2 new), Perry Rubber 3, Rock Hill Bicycle Club 3, Trek Bicycle Store of Mount Pleasant 3. Extras are under "Rejected, host cap".

## For the editor

- **Rock Hill Women's Wednesday changed.** The site says 6:30 pm. That is the Memorial Day to Labor Day time. The club's RideWithGPS text says 6:00 pm Labor Day to the end of daylight saving time, and the Monday ride's text says 5:30 pm from Oct 7. The club calendar lists every Wednesday at 5:30 pm all year, so it can't be read as the start. I set 6:00 pm now and a `start_times` switch to 5:30 on Oct 7, and wrote the disagreement into `visitor_notes`. If you'd rather not guess, drop the `start_times` entry.
- **Greenville Spinners Tuesday is a seasonal break.** The host's own SCTAC page says the Tuesday night rides end in mid-September. The Greenville Bike & Tri events page still lists "Tuesdays at 6:00PM" for it; ignore that.
- **Confirmed on a live host page with no ride date** (the footer reads 2026, nothing else is dated): Bike Roswell Wednesday, Perry Rubber Saturday, Cycle Center Sunday, ATLPTN Pizza Ride. I held Coastal Cyclists, Bonafide and Outspokin' back because their pages carry no 2026 marker at all.
- **Medium records with a time from a third-party directory.** Cycology Thursday (6:00 pm) and Senoia Thursday gravel's alternate 6:30 start come from or are backed by the Southeastern Cycling directory (sadlebred.com, updated April 2026). The shop pages themselves give no time for Cycology.
- **Standard time on Nov 1.** ATLPTN's Tucker ride is posted only for daylight saving time (9:00 am). A directory says 10:00 am after the change. Not published by the host, so no `start_times`.
- **Pages with old copyright or timestamps.** Senoia Bicycle's footer reads 2023. Whitetail's rides page carries a May 2025 timestamp (footer 2016 to 2026). I kept both as medium because the same rides are on the April 2026 directory.
- **Personal phone numbers and emails** are on Coastal Cyclists, MACC and Free-Flite pages. I left them out of every record.
- **Hosts that need geocoding care.** Tucker, Vinings (Atlanta Cycling store), Free-Flite (two stores), Trek Mount Pleasant Sunday and CTown Bikes have no street address in the record. Don't geocode them from the city centre as a fixed start.

## Why these

- **Tuesday Tap-Out (MACC, East Point).** A year-round Tuesday night road ride, 29 miles in A and B groups, on the club's own dated calendar. The start is sharp.
- **Thursday Tango (MACC, East Point).** The fast one: 26 miles at 19 to 21 mph, filed by the club as a drop ride.
- **Beginner / Casual Ride (MACC, Atlanta).** Second Saturday of the month, city streets, 18 or 28 miles, "no one will be left behind". Best first group ride on the list.
- **Thursday Night Rocks (Rock Hill Bicycle Club).** The only weekly gravel group ride I could prove in the Carolinas, on the club's RideWithGPS calendar through Oct 29.
- **Free-Flite Group Ride at Big Creek (RAMBO, Roswell).** First-Friday evening mountain bike ride, dated on RAMBO's own calendar.
- **Standing Boy Trails Thursday and Sunday Group Rides (Columbus).** The only dependable Columbus, GA ride I could find: weekly MTB group rides, posted on the trail nonprofit's home page.
- **Monday Recovery Ride and Wednesday Ride (Perry Rubber, Savannah).** A slow Monday and a 23 mph Wednesday, both spring to fall.
- **Tuesday and Thursday Night Road Ride (Cycle Center, West Columbia).** Twice-weekly 24-mile road ride in three speed groups.
- **Tucker (ATLPTN, Tucker).** The big Saturday race-pace ride east of Atlanta, with a slower C group at 8:30.
- **Beyond Six Flags (ATLPTN, Vinings).** Saturday 9:00 am from the Atlanta Cycling store, 50-ish steady hard miles that split at mile 13.
- **Thursday Gravel Shop Ride (Whitetail, Milton).** A 33-mile gravel ride at 15+ mph from a bike shop with a coffee shop attached.
- **Saturday Road Shop Ride (Whitetail, Milton).** 60 to 70 miles at 20+ mph.
- **Marietta and East Cobb Saturday Group Road Rides (Free-Flite).** Same ride from two stores, 8:30 am, "beginner-friendly" in the shop's words.
- **Tuesday Evening Ride (Trek Mount Pleasant).** The slow one: 12 to 16 miles at 11 to 13 mph, March to November.
- **Saturday Store Ride (Trek Charleston).** Four no-drop pace groups from 13 to 21 mph, with drinks after.
- **Sunday Ride (Trek Mount Pleasant).** B, C and D no-drop groups; the start changes weekly.
- **Bike Roswell! Saturday Morning Ride.** The Saturday partner of a ride already on the site; 8:00 am, no-drop.
- **Monthly Saturday SCTAC Ride (Greenville Spinners).** Dated on the club's own calendar for Sept 26, 2026; which Saturday of the month isn't published.
- **Thursday Night Group Ride (Cycology, Hiram).** 24 miles on the Silver Comet Trail at 18 mph from the shop.
- **Thursday Night Gravel Ride (Senoia Bicycle).** A, B and C groups, 30 to 40 miles, from a small-town shop south of Atlanta.
- **Tuesday Shop Ride and Thursday Horse Park Ride (CTown Bikes, Conyers).** East-side Atlanta evening road rides, one for everyone and one for experienced riders.

## Where rides are posted here

### Words

- **No drop** means the group waits. A / B / C(/D) are pace groups; A is fastest and may drop you. **Wheels up / wheels rolling** is the roll time (Rock Hill, MACC). **Show and go** means no ride leader.
- Atlanta names: **the Airport ride** (winter Sunday race ride), **Tucker** and **Baby Tucker**, **Pizza** (Avondale), **Nasty Northlake**, **TNC** (Marietta Tuesday Night Crit), **BSF** (Beyond Six Flags), **the Silver Comet** (the long rail-trail west of the city). Charleston: **Awendaw** (the forest loop from the Sewee Outpost) and **Sullivan's / IOP**.

### Where rides are published

- **The Southeastern Cycling directory** (https://sadlebred.com/rides/) lists about 100 Atlanta-area rides with times. It says it is updated each daylight saving season and was last touched April 2026. It's a lead only, but it points to nearly every Atlanta shop and club. Most of the clubs it lists live on Facebook groups.
- **WordPress event calendars with feeds.** MACC (https://maccattack.com/calendar/) shows dated events and a per-event iCal feed at `https://maccattack.com/?method=ical&id=<event id>`; ids 1860, 1882, 1884 are the rides above. Bike Roswell's event calendar is script-loaded.
- **RideWithGPS club calendars.** `https://ridewithgps.com/events.json?organization_id=<id>` and `.../organizations/<id>/calendar.ics` both load. Rock Hill Bicycle Club is org 12871 (dated weekly events). Coastal Cyclists is org 6011 (annual event only). Chattanooga Bicycle Club is org 60 (nothing current).
- **Squarespace events pages.** RAMBO (https://www.rambo-mtb.org/events) gives each event its own date and ICS link but no collection feed.
- **Shop pages on the same shop-software platform** (`...-pgNNN.htm`): Atlanta Trek, Atlanta Cycling, Free-Flite, Cycology, Senoia Bicycle, Cycle Center, Greenville Bike & Tri, Trek Mount Pleasant. Most list rides in a table without dates; Atlanta Cycling's list is script-loaded.
- **Strava clubs.** Whitetail (https://www.strava.com/clubs/whitetail-bicycles-cycling-club-231410) and Atlanta Trek (https://www.strava.com/clubs/atlanta-trek-532221) load, but their events don't.
- **Facebook groups** hold the real schedule for Dunwoody Cycling, Bikes and Friends, Cycle Alpharetta, Olde Blind Dog, Grayson Cycling Club, NARC, Goat Riders, Hack & Wheeze, Brookhaven Bike Alliance and Critical Mass Atlanta. None load.
- **groups.io** hosts the "ESP" calendar (https://groups.io/g/ESP/calendar) behind the Decatur Wonderful Evening Ride and several DeKalb rides. The calendar is script-rendered and has no public feed.

### Rhythm

- Evening rides move earlier through the autumn and many stop at the clock change (Nov 1, 2026). Atlanta Saturday rides run 8:00 to 10:00 am, often an hour later in standard time. Charleston's Sunday rides run 8:00 to 10:00 am; Daniel Island goes to 2:00 pm in winter.
- Summer heat starts are earlier in Savannah and Charleston. Trek Mount Pleasant's Sunday ride is 8:00 am Memorial Day to Labor Day, 9:00 am the rest of the year.

## Re-checked

- **athens-ga-bikeathens-joy-ride:** confirmed. The page says last Friday, 6:00 pm, and a post of Sept 19, 2026 announces Friday Sept 25.
- **avondale-estates-ga-pizza-ride:** confirmed. ATLPTN page, Thursdays 6:00 pm, 2026 footer; directory agrees.
- **roswell-ga-bike-roswell-wednesday-evening-ride:** confirmed. Page lists Wednesday 6:30 PM; footer 2026; no ride date.
- **savannah-ga-perry-rubber-saturday-ride:** confirmed. 7:30 meet, 8:00 sharp, rain or shine, footer 2026.
- **columbia-sc-cycle-center-sunday-ride:** confirmed. Sunday 9:00 AM, footer 2026.
- **greenville-sc-bike-and-tri-saturday-shop-ride:** confirmed. Saturdays at 8AM, A and B groups, on a page that also lists dated Sept and Oct 2026 events.
- **rock-hill-sc-rhbc-slow-spokes:** confirmed. RideWithGPS lists Sept 29 and every Tuesday to Oct 27 at 9:00 am. Feed promoted.
- **rock-hill-sc-rhbc-womens-wednesday-ride:** changed. Time moves from 6:30 pm to 6:00 pm, with a 5:30 pm switch on Oct 7. See "For the editor".
- **greenville-sc-spinners-sctac-tuesday-ride:** seasonal break since mid-September; back first Tuesday in April (April 6, 2027).

## Couldn't re-check

All written as `unreachable` with a note; none was moved.

- **atlanta-ga-critical-mass-atlanta:** Facebook error page; no other source.
- **atlanta-ga-midweek-roll:** Instagram returned 429. The directory's author wrote in April 2026 that she isn't sure it's still going.
- **atlanta-ga-bonafide-motivation-monday:** the rides page still lists Monday 6:00 meet, 6:15 roll from Inman Park; undated, events page empty. Its home page has an undated news item.
- **augusta-ga-outspokin-friday-canal-ride:** page lists it in both seasons' schedules; undated.
- **augusta-ga-outspokin-wednesday-worlds:** the page lists it only in the March-to-"octoberish" schedule and lists indoor training for Wednesdays after that. Probably ending now.
- **brookhaven-ga-brookhaven-bike-alliance-monday-ride:** Facebook error; Big Peach Brookhaven's page shows only a 2025 Wednesday ride.
- **fort-oglethorpe-ga-cbc-thursday-night-riders:** the club calendar renders blank; RideWithGPS org 60 has nothing current. "Until evenings get dark" may already apply.
- **columbia-sc-cola-wtfnb-cyclists-ride:** colatownbikes.com doesn't mention it (newest news May 2025); the City of Columbia page is behind a bot check, which I didn't try to get around.
- **awendaw-sc-coastal-cyclists-friday-social-beginner-ride, daniel-island-sc-coastal-cyclists-daniel-island-ride, sullivans-island-sc-coastal-cyclists-social-fun-sunday:** the rides page lists all three as on the site, but it is undated (footer "© date", one entry still reads "as of April 15, 2023").

## Rejected

- **Decatur shop rides page** (decaturbikes.com/articles/rides-and-events-pg37.htm, a link on the directory): the domain is for sale (Oct 1, 2026).
- **Faster Mustache Tuesday night MTB ride** (fastermustache.org): only archive links left (Oct 1, 2026).
- **Fresh Bikes rides page** (freshbikeservice.com/rides-index): 404 (Oct 1, 2026).
- **Trek Savannah group rides:** page says "NO GROUP RIDES AT THIS TIME" (Oct 1, 2026).
- **Big Peach Brookhaven Wednesday ride:** the store page shows only "2025 season starts March 10th".
- **Reality Bikes Wednesday ride, Cumming:** the shop's page says A- 5:50, B and C 5:35, ATLPTN says 5:45 and 5:50, the directory says 5:30 and 5:35, and the shop's footer reads 2025. Conflict, so not listed.
- **Cycle Center Friday "Beer Ride"** (6:15 pm "in season"): no end of season given and it may be over. Not listed.

### Rejected, host cap (3 per host, counting rides already on the site)

- **Coastal Cyclists** already has 3 on the site. Not added: Mon / Wed / Fri Awendaw A and B rides (9:05 am, fast), Saturday Folly Beach 8 am, Saturday Summerville CVS Ride 8 am (54 miles), Sunday Coffee Ride 8 am (Laing Middle School, Mt Pleasant), Sunday Mt Pleasant Town Centre 8 am (not the 3rd Sunday).
- **Perry Rubber:** Sunday ride from Gallery Espresso (8 to 9 am, "call on Saturday").
- **Rock Hill Bicycle Club:** Monday Night Ride (5:30 pm from Oct 7, four pace groups, no-drop per the event text).
- **ATLPTN:** The Sunday Ride, Airport, Nasty Northlake, Tuesday Night Crit, Silverlake, Webb Bridge, Reality Wednesday.
- **Whitetail:** Tuesday 6:10 road, Thursday 6:10 road, Sunday 9 am road.
- **Senoia Bicycle:** Tuesday 6 pm road series in four groups, Saturday 9 am road ride.
- **Trek Mount Pleasant:** Wednesday 6 pm and Saturday 8 am rides from Awendaw; Friday 6 pm "Barn Jam".
- **Free-Flite:** Wednesday 6 pm no-drop MTB ride at Blankets Creek Park (left out: the page doesn't name the city).
- **Cycology:** Tuesday and every third Saturday no-drop trike ride (an adaptive ride, but no time posted).

## Couldn't confirm

Names, host, day, time, start, where I saw it. Local riders will need to check these by hand.

1. **Atlanta Bicycle Coalition rides** (host: atlantabike.org). Not seen. The site is behind a bot check (403). Worth a look for slow rolls and queer or women's rides.
2. **Mash to Brash** (Loose Nuts Cycles, Atlanta). Wednesday 6:15 am, Westside, 20 miles, no drop, ride to Brash Coffee for breakfast. Seen on the directory only. loosenutscycles.com has no rides page; Instagram https://www.instagram.com/loosenutscycles/. The best early-morning no-drop lead.
3. **Grant Park Sunday** (Loose Nuts Cycles). Sunday, 21 miles, no drop. Directory; Facebook https://www.facebook.com/groups/1041307205915524.
4. **Decatur Wonderful Evening Ride, a.k.a. the CVS Ride.** Thursday 6:30 pm, from the CVS lot in Decatur, 19 to 25 miles, breaks into groups. Directory; groups.io https://groups.io/g/ESP/calendar.
5. **Monday Blues Shakin' Ride** (Decatur, Marlay House). Monday 6:30 pm, 22 miles at about 12 mph, no drop. Directory; groups.io ESP calendar.
6. **Sam's Freight Room Ride** (Decatur, 303 E. Howard St). Saturday 2:00 pm, 11 miles through Avondale and Decatur. Directory; groups.io ESP calendar.
7. **Roz's Rotation Ride / Jack's Lunch Ride** (Stone Mountain and Lulah Hills, alternating Tuesdays, 10-12 mph). Directory; groups.io ESP calendar.
8. **Dunwoody Cycling.** Sunday 8:00 am from the Chick-fil-A on Mt. Vernon, Monday and Thursday 6:30 pm, Saturday 8:00 am, several groups. Facebook https://www.facebook.com/groups/295321979551; dunwoodycycling.com renders blank.
9. **Bikes and Friends** (Atlanta Cycling Duluth, Johns Creek, Suwanee). Monday and Wednesday evenings at 6:30, Saturday 9:00 am no-drop from Great Harvest Bread in Johns Creek. Facebook https://www.facebook.com/groups/1522042881443737.
10. **Cycle Alpharetta.** Tuesday 6:00 or 6:30 pm from the Alpharetta Library, Saturday 9:00 am (8:00 spring and summer) from Halcyon. Facebook https://www.facebook.com/groups/1969099983409021.
11. **Olde Blind Dog Cycling Club** (Crabapple). Tuesday and Thursday 6:30 pm year round, 20 to 28 miles, slower groups no-drop. Facebook https://www.facebook.com/groups/OldeBlindDogCyclingClub/.
12. **Grayson Cycling Club.** Tuesday and Thursday 6:30 pm from Grayson Elementary, 27 miles, no-drop pace groups. Facebook https://www.facebook.com/groups/1035793536464866/.
13. **Roswell Recovery Ride.** Monday 6:45 pm from Gate City Brewing, Roswell, 18 miles. Facebook https://www.facebook.com/groups/ogremondaynightride.
14. **Hack & Wheeze.** Saturday 8:00 am from Taco Mac in Virginia-Highland, 20+ miles, no drop, beginners welcome. Facebook https://www.facebook.com/groups/125310964765/.
15. **Goat Riders** (Forsyth County YMCA, Vickery Village). Sunday, 8:30 am summer and 2:00 pm winter, casual group included. Facebook https://www.facebook.com/groups/640534885995995.
16. **NARC (North Atlanta Road Club) Sunday Ride.** Terrell Mill Park, Marietta; 8:00 am summer, 9:00 to 10:00 winter. Facebook https://www.facebook.com/groups/bikenarc/.
17. **Toona Tuesday** (MTB Atlanta, Allatoona Creek Park, Acworth). Tuesday 6:30 pm, no one left behind. mtbatlanta.com returned a bot-check response (202). Directory only.
18. **Marietta Tuesday Night Crit** and **Gwinnett Tuesday Night Crit.** Training races, 6:30 pm, DST only. Facebook https://www.facebook.com/MariettaTuesdayNightCrit and https://www.facebook.com/groups/1102493983575886.
19. **Make It Happen Mondays** (Southern Crescent Cycling, Atlanta Motor Speedway, Hampton). Monday 6:00 meet, 6:30 roll, four groups. Facebook https://www.facebook.com/75SCC.
20. **Ladies on Spokes** (Coweta and Fayette women's cycling club). Named on Atlanta Trek's rides page; no schedule seen. The nearest to a women's group I found in Georgia.
21. **Reality Bikes Wednesday and Webb Bridge Saturday** (Cumming and Alpharetta). Times conflict (see Rejected). Shop page https://www.realitybikes.com/group-rides.
22. **Atlanta Cycling shop rides** (Vinings, Roswell, Alpharetta, Duluth, Ansley). The rides list is script-loaded: https://www.atlantacycling.com/about/rides-pg759.htm.
23. **Tri-City Cyclers** (Dutch Fork Middle School, Irmo). Saturday 9:00 am, about 40 miles, several groups. Seen only as a row on Cycle Center's page.
24. **Dialed Bicycles & Repair** (Cayce, SC). Site renders blank. A board member of Cola Town Bike Collective co-owns it.
25. **Critical Mass in Savannah, Charleston, Columbia, Athens and Greenville.** Not looked up; none has a site I could reach. Athens is the likeliest.
26. **Standing Boy Trails rides details** (pace and trail). Only the day and time are on the home page.
27. **Athens, Augusta, Macon, Myrtle Beach, Hilton Head, Spartanburg.** I did not find a shop or club page for any of these that loads with a ride schedule. BikeAthens' Joy Ride is the only Athens ride; Outspokin' only in Augusta. Guessed domains for clubs in these towns all failed to resolve.

## Stats

- Candidates looked at: about 70 (20 existing + about 50 new)
- Listed: 25 (high 8, medium 17)
- Couldn't confirm: 27 entries above (about 45 individual rides), plus 11 existing rides
- Rejected as ended, stale, conflicting or capped: 7 plus the host-cap extras
- Re-check: 7 confirmed · 1 changed · 1 seasonal break · 11 unreachable

## Sources

BikeAthens https://www.bikeathens.org/engage/joyrides/ · https://www.bikeathens.org/events/ · https://www.bikeathens.org/grow/ftw/ — Bike Roswell https://bikeroswell.com/group-rides/ · https://bikeroswell.com/event-calendar/ — Bonafide https://ridebonafide.com/page-18182 · https://ridebonafide.com/Events — Outspokin' https://www.outspokinaugusta.com/rides — Perry Rubber https://perryrubberbikeshop.com/group-rides/ (plus /saturday-morning/, /monday/, /wednesday/, /sunday/) — Coastal Cyclists https://coastalcyclists.com/rides · https://ridewithgps.com/events.json?organization_id=6011 — Greenville Spinners https://greenvillespinners.org/ · https://www.greenvillespinners.org/sctac-south-carolina-technology-and-aviation-center/ · https://www.greenvillespinners.org/events/monthly-saturday-sctac-ride-september/ — Chattanooga Bicycle Club https://chattanoogabicycleclub.com/cbc-calendar-mw/ · https://ridewithgps.com/events.json?organization_id=60 — Cola Town https://colatownbikes.com/ — Cycle Center https://www.cyclecenter.com/events/rides-events-pg19.htm — Greenville Bike & Tri https://www.greenvillebikeandtri.com/articles/events-rides-pg1190.htm — Rock Hill https://rockhillbicycleclub.com/content.aspx?page_id=0&club_id=269880 · https://ridewithgps.com/events.json?organization_id=12871 · https://ridewithgps.com/organizations/12871/calendar.ics — ATLPTN https://atlptn.com/ · /rides/pizza-ride · /rides/tucker · /rides/the-sunday-ride · /rides/six-flags · /rides/realty-wednesday-ride — Southeastern Cycling directory https://sadlebred.com/rides/ · https://sadlebred.com/georgia-cycling/ — Big Peach Brookhaven https://www.bigpeachrunningco.com/locations/brookhaven/ — groups.io https://groups.io/g/ESP/calendar — Atlanta Cycling https://www.atlantacycling.com/ · https://www.atlantacycling.com/about/rides-pg759.htm — Reality Bikes https://www.realitybikes.com/group-rides — MACC https://maccattack.com/calendar/ · /events/tuesday-tap-out/ · /events/thursday-tango/ · /events/beginner-casual-ride/ · https://maccattack.com/?method=ical&id=1860 · id=1882 · id=1884 — Whitetail https://whitetailbicycles.com/rides/ · https://www.strava.com/clubs/whitetail-bicycles-cycling-club-231410 — CTown Bikes https://ctownbikes.com/shop-rides/ — Senoia Bicycle https://www.senoiabicycle.com/about/group-rides-pg196.htm — Atlanta Trek https://www.atlantatrek.com/about/rides-events-pg376.htm — Loose Nuts Cycles https://www.loosenutscycles.com/ — Free-Flite https://www.freeflite.com/articles/upcoming-events-pg1420.htm — Cycology https://www.cycologybikeshop.com/articles/events-pg176.htm — Trek Bicycle Store of Mount Pleasant https://www.trekbikesofmountpleasant.com/about/store-group-rides-mount-pleasant-pg972.htm · …charleston-pg973.htm · …savannah-pg974.htm · …group-ride-email-archive-pg993.htm — RAMBO https://www.rambo-mtb.org/ · /rides · /events/2026/10/2/freeflite-group-ride-at-big-creek — Standing Boy https://www.standingboy.org/ — Fresh Bikes http://www.freshbikeservice.com/rides-index — Faster Mustache http://www.fastermustache.org/rides/dirtymustacheride/ — Decatur shop http://www.decaturbikes.com/articles/rides-and-events-pg37.htm — Bike Walk Greenville https://bikewalkgreenville.org/ — Strava clubs https://www.strava.com/clubs/whitetail-bicycles-cycling-club-231410
