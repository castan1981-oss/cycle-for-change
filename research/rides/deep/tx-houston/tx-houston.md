# tx-houston: deep sweep report

- **Area id:** `tx-houston` (Houston, The Woodlands / Conroe, Katy, Sugar Land, Pearland, Galveston, Bryan-College Station)
- **Agent:** group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026
- **Files:** `tx-houston.json` (18 new rides), `upkeep.json` (4 entries), this report
- **Fetches:** about 125 page fetches. The web-search cap for the session (200) ran out partway through, so the Strava-event hunt by search stopped early.

## Summary

**New rides: 18** (8 high, 10 medium). Dry merge accepts all 18.

By city: Houston 5 · The Woodlands 3 · Pearland 3 · Conroe 2 · College Station 2 · Hockley 1 · Katy 1 · Sugar Land 1. Galveston: none (see "Couldn't confirm").
By host: NWCC 2 (the site already had 2 more, so 4 in all, one over the cap) · Pearland Bicycles 3 · UBG 3 · Motherland Cycling Club 2 · Southenders 2 · Race Ready Repair 2 · BikeHouston 1 · Bikeland 1 · Trek The Woodlands 1 · Woodlands MTB community ride 1.
By type: road 16, MTB 1, social 1. Four are no-drop or beginner rides in the host's own words (NWCC Starbucks, UBG first-Saturday ride, UBG Saturday A/B/C, Bikeland).

**Re-checks (7 rides on the site):** 4 entries written: 3 confirmed, 1 changed. 3 couldn't be re-checked (Critical Mass Houston, Blue Line Wednesday, Southenders Midweek Motley).

**No LGBTQ, women/trans/femme or BIPOC ride made it into the new file.** The one queer ride on the site (Tuesgay) is confirmed. Motherland Cycling Club was started by riders of African descent according to a directory; I did not find that in the club's own words, so `inclusive_focus` stays empty. Houston Gravel Collective (women-focused gravel) and Pride Bike Ride's Monday ride are in "Couldn't confirm".

**The finding that matters:** most Houston shop and club rides live on Chasing Watts (the app Pearland Bicycles, Bikeland and the Woodlands groups all name), on RideWithGPS club calendars, and on Facebook groups. None of those load as plain pages except RideWithGPS's `calendar.ics`.

## For the editor

- **One ride changed time:** NWCC's Saturday Zube Park Ride is 8:00 am from October through March and 7:30 am April through September. The site had 7:30. `upkeep.json` fixes it and adds the April switch back to 7:30 (from 2027-04-01). The Sunday Starbucks ride (new) follows the same table.
- **BikeHouston First Sunday Ride:** the start park changes every month. The record's address is only the Oct 4 start (Terry Hershey Park). Please don't treat it as a fixed start.
- **Southenders The Usual Suspects:** no start location on the host's schedule page, so `start_location.address` is null.
- **Pearland Night Shop Ride** is a Mar-Oct series; the last event on the shop's calendar is Thu Oct 29. Re-check in March. Its `feed_url` is the shop's RideWithGPS `calendar.ics`, which lists each night as an event.
- **Motherland** event pages repeat weekly (Google Calendar link carries `RRULE:FREQ=WEEKLY`) and show the next date. I left `feed_url` null because the per-event iCal only carries the 2023 start plus the weekly rule. The event pages have comment spam with links in them; I did not follow any.
- **UBG's first-Saturday no-drop ride** is listed on a third-party ride board (neloscycles.com, an Austin shop's ride platform that also carries Houston listings), not on UBG's own site. It's medium. Ask UBG to confirm.
- **Over the per-host cap:** NWCC would have 4 on the site. Cut Hump Day or Starbucks to taste. Held back for the cap: UBG's Sunday Urban Ride, NWCC Mountain Bike Sunday (monthly, place changes), Motherland's Saturday and Sunday rides.
- **Woodlands medium rides** lean on one dated secondary page: Bike The Woodlands Coalition's local ride calendar (last updated Apr 24, 2026, rides as of May 2026). Where the host's own page also lists the ride (Bikeland, Race Ready Repair), I cited both.
- **brazoscyclists.org** put up a Cloudflare block after a handful of quick requests. The watcher should read it slowly.

## Why these

- **First Sunday Ride (BikeHouston).** The city's own advocacy group runs a free neighborhood ride on the first Sunday, a different park every month. Easy to join, nothing to sign.
- **Sunday Starbucks Ride (NWCC).** A true no-drop Sunday ride at Zone 2 pace, routes of 21, 32 and 42 miles you can cut short, and the host names new riders and women.
- **Hump Day Ride (NWCC, Hockley).** The weekday-morning option in the northwest. Splits by speed; the host calls it good for new riders.
- **Wednesday Night Ride (UBG).** A weekday-evening 20-miler from a Heights shop.
- **Saturday Ride (UBG).** Three pace groups; the club calls it the accessible one, good for beginners.
- **First Saturday No-Drop Beginner Ride (UBG).** 8 to 10 miles at 12 to 14 mph, no-drop, once a month. Medium: third-party listing.
- **Night Shop Ride (Pearland Bicycles).** Twice-weekly evening road ride, dated on the shop's own RideWithGPS feed through Oct 29.
- **Saturday Shop Ride (Pearland Bicycles).** The Saturday 7:00 am road ride people drive in for from across Houston.
- **Sunday Coffee Ride (Pearland Bicycles).** 32 to 36 miles with a coffee stop in Missouri City or Friendswood.
- **Sugar Land Morning Rides (Motherland).** Tuesday and Thursday 6:30 am, two pace groups, next dates on the club's event pages.
- **Katy Morning Rides (Motherland).** Same club, same times, from Handlebar Cyclery in Katy.
- **Friday Follies and The Usual Suspects (Southenders).** The Bryan-College Station road regulars' Friday and Saturday rides, next to the Wednesday Midweek Motley already on the site.
- **Tour de Woodlands (Bikeland).** A flat 30-mile leader-assisted no-drop Saturday shop ride with coffee after.
- **Tuesday Shop Ride (Trek The Woodlands).** The fast Tuesday-evening shop loop, two 15-mile laps.
- **Dirt Church (Woodlands MTB).** A community Sunday mountain bike ride on the Spring Creek Nature Trail.
- **Thursday Night Ride and Saturday Morning Ride (Race Ready Repair, Conroe).** The Conroe shop's road rides, including a slow, fat-tire-friendly first Thursday.

## Where rides are posted here

- **Chasing Watts** (chasingwatts.com, app and web): where the Woodlands, Pearland and many shop and community rides are posted weekly. Needs a free account and JavaScript, so no robot reads it. Pearland's hub is chasingwatts.com/hubs/35.
- **RideWithGPS club calendars:** Pearland Bicycles' `https://ridewithgps.com/organizations/12209-pearland-bicycles/calendar.ics` loads and parses. Other Houston shops likely have one; the org page `/organizations/<id>-<name>/home` shows an ICS export link. This is the best machine-readable source here.
- **Club WordPress calendars:** NWCC (EventON, `nwcc.bike/nwcc-cycling-club-events-list/` shows dated events), Motherland Cycling Club (Modern Events Calendar, event pages show the next date), BikeHouston (Squarespace, each event has `?format=ical`).
- **Bike The Woodlands Coalition's local ride calendar:** `bikethewoodlands.org/rides`, updated by a board member; the best map of Woodlands rides.
- **Strava clubs:** Cool Cat Cycles (454340), Handlebar Cyclery (handlebar-cyclery-111537), Bike Barn (bike-barn-8305), SWCC (swcc-southwest-cycling-club-19711), Houston Gravel Collective (959076), Pride Bike Ride Houston (pridebikeridehouston). Club pages load; their event lists need a login, and I could not find public event pages for them with the search budget I had.
- **Facebook groups** (login-only): Sun & Ski Woodlands group ride, Woodlands Bike Social, Houston Bike Social, Northwest Cycling Club Activities, Houston Ladies Cycling Club, Toxic Shocks.
- **Queer Calendar** (qcal.app) carries Pride Bike Ride's Tuesdays with future dates.
- **Words:** locals say "shop ride", "Zube" (the Saturday ride from Zube Park), "mass ride" (social night rides from Market Square), "levee ride" and "bayou ride".

## Re-checked

- **Zube Park Ride (NWCC), changed.** Events list shows Sat Oct 3, 10, 17 at 8:00 am; the ride page says Oct-March 8 am, April-Sept 7:30 am. The site had 7:30. Fixed, with the April switch.
- **Saturday Coffee Ride (NWCC, Tomball), confirmed.** Events list shows Sat Oct 3 and Oct 10, 2026, 8:00 am; Wildwood Elementary; 8:00 year-round.
- **Tuesgay Social Ride (Pride Bike Ride), confirmed.** Site says every Tuesday, meet 7:00, roll 7:30, Varsity Bar HTX; the group's Queer Calendar listing shows Tue Oct 6 and every Tuesday to Dec 22.
- **BVMBA Tuesday Social Ride, confirmed.** bvmba.net's home page (edited Jul 1, 2026 per the site's page data) says Tuesdays, meet 6:15 pm, ride 6:30 pm, no-drop, Lake Bryan boat ramp. No dated upcoming ride is posted, so `last_seen` is Jul 1.

## Couldn't re-check

- **Critical Mass Houston.** The home page still says the last Friday of the month, 6:45-7:15 pm at Guadalupe Plaza Park, but the site's pages were last edited in 2023 and the blog stops in June 2023. The only 2026 sign is a Meetup event from another group (NEO Houston) for a "Critical Mass Halloween edition" on Fri Oct 30, 2026, 7:00 pm. Not the host's page, so no entry. Robert: someone local should confirm.
- **Blue Line Wednesday Ride.** The shop's rides page loads and says Wednesday evening, 17-20 mph, about 20 miles, "call the Heights location on Wednesday afternoon" because it needs a leader. Nothing on the page is dated. It also lists a Saturday Brunch Ride (20-26 mph, about 37 miles) with no start time. No entry.
- **Midweek Motley (Southenders).** Brazos Valley Cyclists' Rides & Events page lists it (Wednesday 7:30 am at 1862 Rock Prairie, 7:50 am at the Pebble Creek entrance) and the site posts in 2026, but the schedule page carries no date and the site then blocked my requests. No entry.

## Rejected

- **Houston Bicycle Club** (houstonbicycleclub.wildapricot.org): ride calendar says "No events available" (Oct 1, 2026). The home page still describes a first-Sunday Sans Car ride from Stude Park. Not listed.
- **Cool Cat Cycles, Katy:** coolcatcycles.com now shows a hosting "suspended page" (Oct 1, 2026). Strava club text (Bike Attack Saturday 7:00, no-drop Sunday, gravel Tuesday 6:30 pm) is undated.
- **Freaks Come Out At Night RC (Strava club 694541):** its event pages show Fri Apr 26 with no year, an old event ID. Not current.
- **Houston Bike Exchange "Daily Open Rides":** says updated August 2019. Lead only, stale.
- **Strava events outside the area** that search returned (Bike Shop Hawaii, Joe's Bike Shop Baltimore): not Houston.
- **Society Cycle Works (Trek Sugar Land) Strava event:** see below; not listed because its cadence is unclear.

## Couldn't confirm

For a local rider to check by hand. Name, host, day and time, start, where I saw it.

1. **Monday Miles: Entry Level-Speed Ride.** Pride Bike Ride Houston. Mondays, rollout 7:30 pm. Starts and ends at 611 Hyde Park Blvd (the Strava text says Eagle Houston; the Tuesday ride says Varsity Bar HTX at the same address). Seen only in the Strava club description, undated: https://www.strava.com/clubs/pridebikeridehouston
2. **Society Cycle Works Saturday ride.** Trek Bicycle Sugar Land (Strava club "MAKE SH!FT HAPPEN", 119398). Strava event "Society Cycle Works Sugarland B+ Exclusive Trial Run Route" shows Sat Oct 10, 2026, 7:00 am, "Society Cycle Works on University", Intermediate / Flat. Oct 3 wasn't shown, so it may not be weekly. https://www.strava.com/clubs/119398/group_events/72993
3. **Sun & Ski Sunday Shop Ride.** Sun & Ski, 25415 I-45, Spring. Sundays, 7:00 or 7:30 am by season, four groups (A 20+ mph, B 18+, C 15-16, D 12 mph over 20 miles). Biggest Woodlands ride per Bike The Woodlands. Start time in October unknown. https://www.bikethewoodlands.org/rides · Facebook group sunandskiwoodlandsgroupride
4. **Love & Coffee Ride.** Community ride, Fridays, 7:30 or 8:00 am by season, Fitness Project, 6511 FM 1488, Magnolia. About 25 miles at 16 mph, no-drop, to the Starbucks on Lake Conroe. Seen at Bike The Woodlands only.
5. **ROMMEO Tuesday and Thursday Morning Rides.** Community rides, 7:30-8:30 am, from Fitness Project (Magnolia) or Whole Foods (Hughes Landing), 60-100 miles at 20+ mph, hard, drops riders. Bike The Woodlands only.
6. **Woodlands Tuesday Night Ride.** Community ride, Tuesday 5:30 pm from Whole Foods, 1925 Hughes Landing; a second lap at 6:30 pm; 44 miles at 18-20+ mph. Bike The Woodlands only.
7. **Friends of Friends Saturday Ride.** Community road ride, Saturday 7:00 or 7:30 am, 50-100 miles at 19-20 mph, varies. Facebook share group 14ZQQcyvhkp, via Bike The Woodlands.
8. **Bikeland Weekly / Woodlands Bike Social.** The Woodlands Bike Social's second-Monday Margarita Monday ride (Yucatan Taco Stand, 24 Waterway, 7:30 pm) appears only on a 2019 list; the Bike Social also has a Strava club (270497) and a Facebook group.
9. **Handlebar Cyclery Saturday open road ride.** Handlebar Cyclery, 24948 FM 1093 #220, Katy/Richmond. Saturday 7:30 am, plus tentative gravel, MTB and camping rides. Strava club text, undated: https://www.strava.com/clubs/handlebar-cyclery-111537
10. **Cool Cat Cycles rides.** Cinco Ranch, Katy. Bike Attack Saturday 7:00 am; no-drop Sunday; gravel Tuesday 6:30 pm (NWCC's directory says a Wednesday night gravel ride on the levee, 24 miles). Shop site suspended. https://www.strava.com/clubs/454340
11. **Clutch City Cruisers.** Thursday 7:30 pm, Market Square Park, downtown, slow-paced social ride. clutchcitycruisers.com did not load; NWCC's club list and Trek's Houston page mention it.
12. **HTX Bike Social.** Second Friday of the month, roll out 7:20 pm, start varies, about 15 mph. Facebook group https://www.facebook.com/groups/htxbike/
13. **Coffee & Bikes HTX Sunday social ride.** Next ride Sun Oct 4, 2026, meet 7:00 am at Spotts Park (401 S Heights Blvd), ride about 8:05, 19.5 miles at about 11 mph. Cadence unknown (this one is #86). https://coffeeandbikeshtx.com/ · Instagram coffee.and.bikes
14. **Houston Gravel Collective.** Strava club 959076, "get more women riding gravel", group rides coed, workshops sometimes women-only. Site is private; no dates seen. https://www.strava.com/clubs/959076
15. **Houston Ladies Cycling Club** and **Toxic Shocks** (ladies' Monday ride, 7 pm, 2019 listing). Facebook only. https://www.facebook.com/groups/hlccl · https://www.facebook.com/groups/toxicshocks
16. **Ciclistas del Barrio.** Mondays 7 pm from Alief Hastings, Sundays 5 pm in southwest Houston, 7-10 miles, bike rides plus local food. Instagram ciclistasdelbarrio.
17. **EaDo Bike Co.** The shop says a ride starts somewhere every night, often from Market Square Park, and its calendar doesn't load. https://www.eadobikeco.com/about/rides-events-pg135.htm
18. **Space City Cycling Club** (Clear Lake). Site says "When and where we ride" but the page doesn't render as text. https://spacecitycycling.club/
19. **Southwest Cycling Club (SWCC).** 3-4 road and gravel rides a week, evenings on weekdays and mornings Saturday and Sunday, posted on its Strava club. southwestcyclingclub.com returned a bot wall (HTTP 429). https://www.strava.com/clubs/swcc-southwest-cycling-club-19711
20. **Major Taylor Houston Cycling Club.** mthcc.com home page loads, with a Join the Ride button; the Events page doesn't render. https://www.mthcc.com/
21. **Handlebar Bicycle Club** (Richmond). Weekly and gravel rides, members-only TeamSnap. https://www.handlebarbicycleclub.com/
22. **Bike Barn / Trek Bicycle Houston shops** (11 stores including College Station, Katy, Sugar Land, The Woodlands). The Bike Barn Strava club (bike-barn-8305) says "free shop events"; no schedule loaded.
23. **Blue Line Bike Lab Saturday Brunch Ride.** 20-26 mph, about 37 miles, East End, time not stated. https://www.bluelinebikelab.com/articles/shop-rides-pg193.htm
24. **UBG Sunday Urban Ride.** 8:00 am, 35+ miles at 18-20 mph (same page as the UBG rides listed). Held back for the host cap.
25. **NWCC Mountain Bike Sunday.** Monthly, time and place change each month, about six riders at 9 mph. Held back (varies by month): https://nwcc.bike/nwcc-mountain-bike-sunday/
26. **Motherland Cycling Club Saturday Ride** (7:30 am, three groups 14-20 mph; start on a map link), **Sunday Recovery Ride** (7:30 am, Blockhouse Coffee in Richmond) and **MCC Combined Group Ride** (Oct 3, 2026, 7:00-10:30 am, place varies). Held back for the host cap and variable starts. https://motherlandcycling.org/event/saturday-ride/
27. **Galveston.** Nothing found with a date. Shops listed in a directory: Island Bicycle Company (1808 Seawall Blvd, site bot-walled), Island Cycle Repair, West End Cycle & Lock. UTMB Health Cycling Team has a Strava club (112652, request to join). Galveston is the gap in this sweep.
28. **Bryan-College Station beyond Southenders and BVMBA.** Aggieland Cycling's events page and the Trek College Station store both returned bot walls or no ride schedule. Brazos Valley Bike Polo (Tuesday 7 pm, Anderson Park) is on the Brazos Valley Cyclists page and isn't a group ride.

## Stats

- Candidates looked at: about 55 rides and groups across 40 sources.
- Listed: 18 (8 high, 10 medium).
- Re-checked: 4 of 7 (3 confirmed, 1 changed).
- Couldn't confirm: 28 leads above. Couldn't re-check: 3.
- Rejected as ended, stale or out of area: 6.

## Sources

- https://bvmba.net/ · https://brazoscyclists.org/rides-and-events/ · https://brazoscyclists.org/ · https://brazoscyclists.org/connect/ · https://ridewithgps.com/groups/Brazos-Valley-Cyclists
- https://criticalmasshouston.com/ (home, blog, weekly-bike-rides, page data) · https://pridebikeride.com/ · https://pridebikeride.com/about · https://www.strava.com/clubs/pridebikeridehouston · https://qcal.app/event/tuesgay-social-ride-houston-tx-us · https://gathryapp.com/houston/eagle-houston/26-05-19/pride-bike-ride-tuesdays · https://linktr.ee/pridebikeride
- https://www.bluelinebikelab.com/articles/shop-rides-pg193.htm
- https://nwcc.bike/ · https://nwcc.bike/road-cycling-nwcc-saturday-zube-park-ride/ · https://nwcc.bike/the-nwcc-coffee-ride/ · https://nwcc.bike/nwcc-hump-day-ride/ · https://nwcc.bike/nwcc-mountain-bike-sunday/ · https://nwcc.bike/nwcc-vintage-park-starbucks-ride/ · https://nwcc.bike/nwcc-cycling-club-events-list/ · https://nwcc.bike/club-events-calendar/ · https://nwcc.bike/houston-bike-clubs/
- https://www.bikethewoodlands.org/rides · https://chasingwatts.com
- https://www.bikehouston.org/events · https://www.bikehouston.org/events/first-sunday-ride-oct-2026 (and ?format=ical, Sept)
- https://www.pearlandbicycles.com/articles/local-rides-events-pg272.htm · https://ridewithgps.com/organizations/12209-pearland-bicycles/home · https://ridewithgps.com/organizations/12209-pearland-bicycles/calendar.ics · https://www.strava.com/clubs/PearlandBicycles
- https://motherlandcycling.org/ (home, event pages for Tuesday, Thursday, Saturday, Sunday, Combined, Katy and Sugar Land) · https://motherlandcycling.org/about-us/
- https://www.urbanbicyclegallery.com/ · https://www.urbanbicyclegallery.com/pages/ubg-cycling-club · https://www.urbanbicyclegallery.com/pages/rides-event-calendar · https://neloscycles.com/UBG-Saturday-No-Drop-Ride/
- https://www.bikelandusa.com/events/rides-events-pg198.htm · https://racereadyrepair.com/ · https://racereadyrepair.com/shop-rides · https://racereadyrepair.com/events
- https://www.strava.com/clubs/454340 · https://www.strava.com/clubs/handlebar-cyclery-111537 · https://www.strava.com/clubs/119398/group_events/72993 · https://www.strava.com/clubs/694541/group_events/1638455 · https://www.strava.com/clubs/959076 · https://www.strava.com/clubs/swcc-southwest-cycling-club-19711 · https://www.strava.com/clubs/bike-barn-8305 · https://www.strava.com/clubs/234952 · https://www.strava.com/clubs/270497 · https://www.strava.com/clubs/132597 · https://www.strava.com/clubs/338922 · https://www.strava.com/clubs/112652
- https://handlebarcyclery.com/ · https://www.handlebarbicycleclub.com/ · https://www.mthcc.com/ · https://coffeeandbikeshtx.com/ · https://houstonbicycleclub.wildapricot.org/ · https://spacecitycycling.club/ · https://www.alkekvelodrome.com/ · https://www.eadobikeco.com/about/rides-events-pg135.htm
- https://www.meetup.com/find/us--tx--houston/cycling/ · https://houston-bike-exchange.com/houston-daily-rides/ · https://wheelbrothers.com/texas-cycling-clubs/ · https://wheelbrothers.com/galveston-bike-shops/ · https://wheelbrothers.com/houston-bike-shops/ · https://www.trekbikes.com/us/en_US/greatrides/houston/ · https://www.bikebarn.com/
