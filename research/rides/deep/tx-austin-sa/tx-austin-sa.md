# tx-austin-sa: group-ride scout report

- **Area id:** `tx-austin-sa`
- **Agent:** Austin / San Antonio / Waco / South Texas group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026 (Central time)
- **Area:** Austin, Round Rock, Georgetown, San Marcos, New Braunfels, San Antonio, Waco, Corpus Christi, Rio Grande Valley
- **Files:** `tx-austin-sa.json` (19 new rides), `upkeep.json` (5 entries), this report
- **Fetch budget:** about 140 page fetches plus 16 web searches. The session's web-search cap (200) ran out partway, so the last hunts for Strava event pages by city did not happen.
- **Dry runs (Oct 1):** `merge-ride-research.js` accepts 19 of 19. `rides-apply.js` applies 5 of 5 (3 changed, 2 confirmed). `validate-rides.js` finds no errors in the 19 records.

## Summary

**19 new rides: 7 high, 12 medium.** The target was about 25. I stopped at what I could prove. Austin and the Strava-linked clubs yielded; the smaller cities did not.

By city:

- Austin: 12
- Round Rock: 2
- San Antonio: 2
- Corpus Christi: 3
- Georgetown, San Marcos, New Braunfels, Waco, McAllen and the rest of the Valley: none new (see "Why so thin" below)

By host: Violet Crown 2, Breakfast Club 2, Mellow Johnny's 2, Austin Ridge Riders 1 new (1 already on the site), Blur Cycleworks 2, STORM 2, CC Cycling Club 3, one each for ATX Bikes, Queer Ride, Critical Mass Austin, ATX Full Moon Cruise and Sunday Cruise ATX.
By type: road 11, MTB 4, social 8 (some are two types).
Inclusive: 1 LGBTQ (Queer Ride), 2 women / trans / femme (Breakfast Club Babes, Violet Crown Women's Coffee), 13 no-drop or beginner rides in the host's own words, 2 family or youth.

**Re-check of the 11 rides already listed: 5 entries written.** 3 changed, 2 confirmed. 6 rides could not be re-checked (see "Couldn't re-check"). One of those six, Mellow Johnny's Saturday 9 am Scout-a-Route, is no longer on the shop's own ride page and may be dead.

**Why so thin.** Most Texas rides live on Facebook groups, Instagram and private Strava clubs. Five club sites also failed from here (TLS errors, a reset connection, an org-policy block) and Instagram returns 429. What loaded with dates: Ticket Tailor (Austin Ridge Riders), Meetup (STORM), Eventbrite (Sunday Cruise), the full-moon dates page, SAW's calendar, Violet Crown's ride page, Breakfast Club's pages, and Strava club pages (which show posts but hide event details).

**Best leads for Robert, in order:** Spokes y Folkx (FTWNB, Austin), Austin Gravel Collective (FTWNB, BIPOC, para-athletes), Social Cycling Austin's weekly rides (Monday Lend Your Legs, Sunday Bike Curious), Bikin' Betties (monthly Monday, FTWNB), Black Girls Do Bike San Antonio, LezRideSA, Rebel Betties (women's MTB, San Antonio), Friday Flora Coffee Ride (Austin).

## For the editor

- **Mellow Johnny's address is unclear.** The shop's community page lists 400 Nueces St in the header and 115 Sandra Muraida Way, Suite 102 in the footer, and doesn't say where the rides start. The two new MJ records have `start_location.address` null on purpose. The existing Scout-a-Route record still says 400 Nueces.
- **Scout-a-Route.** The shop's own page now lists only Mellow Mondays (Mon 6 pm), The Wednesday Ride (Wed 7 am) and The Saturday Ride (Sat 8 am). The old link `austin.mellowjohnnys.com/rides-clubs` now redirects to the shop's home page. The host did not say Scout-a-Route ended, so I wrote no entry. I added Mellow Mondays and The Saturday Ride; I left out the Wednesday Ride to keep Austin at 12.
- **Sunday Cruise ATX's address is only September's start** (Girard Kinney Park). The start park changes monthly. Please don't geocode it as a fixed start.
- **Austin Ridge Riders Monthly Group Ride** is listed as Austin but the trailheads are outside the city (Oct 24 is Reveille Peak Ranch in Burnet). The `start_location.address` is October's only.
- **Two Critical Mass groups.** criticalmassaustin.com says last Friday, meet 6–6:30 pm at the ping pong tables by Industry Bar, ride about 7 pm. A directory lists a second group at the Pfluger Pedestrian Bridge (wheels down 6:30 pm) and a Friday ride from Parque Zaragoza at 8 pm. I followed the site.
- **Breakfast Club Babes contradiction.** The page says "third Wednesday" for the intermediate ride in one place and "second Wednesday" in another. The record says first and third and tells riders to check Strava.
- **Corpus Christi rides come from a third-party listing** (Nelo's Cycles' ride-listing site, entry for the CC Cycling Club). The club's own site, cccycleclub.com, fails TLS from here. The same listing still carries one ride dated 2016, so these are medium and Robert should confirm them.
- **Violet Crown times move with the season.** The Bagel Ride is 7:30 am from Aug 15 on the club's page; its Jan 3, 2026 Strava event was 8:30 am. Re-check when the club posts winter hours. The directory austinbikegroups.com still lists older times (Bagel 8:00, Violet Cruise 7:00, Sunday 8:15) and an old Babes address, so don't trust it.
- **Austin Ridge Riders' Meetup feed is empty** (it parses with zero events). The club runs on Ticket Tailor now, which is what the upkeep entry points to.
- **SAW switched to 8:00 am** from Oct 3 (the Sept 19 and Sept 27 events were 7:30). The `start_hhmm` is now 08:00.
- **Host cap.** Bicycle World RGV already has 4 rides on the site, so I added none of its Harlingen or Brownsville rides (listed under "Couldn't confirm").

## Why these

**Austin**
- **The Bagel Ride (Violet Crown).** Austin's Saturday road ride since 1992, 50 to 60 miles from Tech Ridge, 18 to 20 mph, drop. The Strava club has posts through September.
- **Women's Coffee Ride (Violet Crown).** Monthly first-Sunday beginner ride for women, 12 to 14 mph, from Mañana Coffee.
- **Babes Ride (Breakfast Club).** First and third Wednesdays for women, women-identifying and non-binary riders. First Wednesday is beginner and no-drop. Ends with food and drinks.
- **Breakfast Club Monthly Ride.** The big monthly Saturday ride, hundreds of riders, A to D groups, D is no-drop, breakfast after.
- **Mellow Mondays (Mellow Johnny's).** The shop's easy Monday evening city ride, 14 to 16 mph, no drop.
- **The Saturday Ride (Mellow Johnny's).** 35 to 40 miles at 17 to 19 mph, regroups, 8 am.
- **Crank 'N Drank (ATX Bikes).** South Austin's Tuesday-night mountain bike tradition, four pace groups, BYOB in the lot after.
- **Queer Ride.** Weekly no-drop social ride for LGBTQIA+ folks and allies from the Capitol since 2011. Flagged for a hand check.
- **Critical Mass Austin.** Monthly last-Friday ride from East 5th Street.
- **ATX Full Moon Cruise.** Late-night monthly social ride from the Pfluger Bridge on the weekend night nearest the full moon. The host's page lists Oct 24 at 11:30 pm.
- **Sunday Cruise ATX.** Second-Sunday easy social cruise since 2016. The club says it suits beginners.
- **Monthly Group Ride (Austin Ridge Riders).** No-drop MTB ride to a new trailhead each fourth Saturday, lunch after, all levels.

**Round Rock**
- **Tuesday Recovery Ride (Blur Cycleworks).** No-drop, 17 miles at 14 to 15 mph, beginners encouraged.
- **Blur Thursday Nighter.** A 27-mile drop ride with four race segments and regroups. For riders who want to push.

**San Antonio**
- **STORM All-Level Ride.** Thursday evening no-drop dirt ride at O.P. Schnabel Park, all levels. The Meetup feed lists Oct 1, 8, 15 and 22.
- **STORM Kids Ride.** Free first-Saturday kids' trail ride at McAllister Park, parents ride along.

**Corpus Christi**
- **Saturday Morning Ride (CC Cycling Club).** The club's biggest ride, 7 am, A to D groups, a slow IQUACK group at 12 to 14 mph.
- **Padre Island Ride.** Monday and Friday evening no-drop ride to the National Seashore, about 20 miles.
- **Tuesday Calallen Ride.** No-drop 16 or 21 miles from West Guth Park to the Nueces River.

## Where rides are posted here

- **Strava clubs.** The main place. Club pages load without a login and show description and posts; an "Upcoming Club Event" flag shows when one is scheduled, but the date and time need a login. Event pages that came up in search were old (a Breakfast Club event dated May 26 and a Paris club). Clubs that matter: The Bagel Ride 1158711 (posts through Sept 2026), Violet Crown 1843, Breakfast Club 718908, Spokes y Folx 904721, Sunday Cruise 1082301, Austin Gravel Collective 1112577, Mellow Johnny's (strava.com/clubs/mellowjohnnys), Blur Cycleworks (strava.com/clubs/blurcycleworks), SATX Social Ride 156195, San Antonio Wheelmen (strava.com/clubs/sawheelmen), Waco Bicycle Club 340757.
- **Ticket Tailor.** Austin Ridge Riders list every Sunday, monthly and advanced ride with dates at tickettailor.com/events/austinridgeriders. A robot can re-read it.
- **Meetup ical.** STORM at `https://www.meetup.com/storm-mountain-biking/events/ical/` carries the Thursday ride and the kids ride. A guess of 18 other Meetup slugs found nothing.
- **Club calendars.** SAW's calendar (sawheelmen.com/events) has one page per ride with date and time and an ICS link per event. Waco Bicycle Club's rides live on its RunSignup member page.
- **Shop pages.** Mellow Johnny's community page, ATX Bikes' Rides & Events, Blur Cycleworks' rides page, Violet Crown's rides page. All undated.
- **Linktree and Eventbrite.** Sunday Cruise ATX and Ride Bikes Austin post their month on a Linktree. Sunday Cruise lists each ride on Eventbrite.
- **Static pages with dates.** The full-moon dates page lists every date for the year.
- **Directories (leads only).** austinbikegroups.com (Austin), bike-san-antonio.org/sa-bike-groups (San Antonio), austintriclub.org group-ride directory, mtbatx.com (© 2023, stale), Nelo's Cycles ride listings.
- **Pages that did not load:** austinsocialcycling.com (org-policy block), thegravelcollective.com, cccycleclub.com, brittonbikes.com, www.queerride.org by curl (TLS errors; the page loaded through a different fetcher), sanantoniocyclingclub.org (connection reset), thebendmag.com (bot wall), instagram.com (429), rgvcycling.com (503), tockify.com Britton's calendar (404), stormmtb.org events calendar (404).

## Re-checked

- **austin-tx-austin-ridge-riders-sunday-ride: changed.** Ticket Tailor lists the Sunday ride with an Oct 4 alternate-venue ride at Georgetown Trails, 9:00 AM, and a venue for each Sunday through Dec 27. Schedule text and refresh source updated (the old watch page was a 2023 directory).
- **austin-tx-thursday-night-social-ride: changed.** Do512's Aug 27, 2026 listing says wheels down 8 pm, "new time since 2026", meet 7:30 pm, from Chicano Park. Roll time is now 20:00. Newest proof is Aug 27; the Instagram reel would not load.
- **san-antonio-tx-san-antonio-wheelmen-weekend-rides: changed.** October rides are 8:00 AM (September was 7:30). Calendar page now the watch page.
- **waco-tx-dam-ride-tuesday: confirmed.** Club-rides page: 2026 season began March 10, roll out 5:45 pm, Waco Dam. No end date given.
- **waco-tx-cameron-park-sunday-mtb-ride: confirmed.** Same page: Sunday 2:00 pm, Redwood Shelter, all levels, no drop. The page also carries a June 2 summer time for the Tue/Thu MTB rides, so it is current for 2026.

## Couldn't re-check

- **austin-tx-mellow-johnnys-scout-a-route** (Sat 9:00 am). The shop's own page (fetched today) no longer lists it. It lists a Saturday 8:00 am intermediate-plus ride instead. The host didn't say it ended, so no entry. A rider showing up at 9 might find nobody. Please check the shop's Strava club.
- **corpus-christi-tx-bicycle-world-tuesday-no-drop-ride, mcallen-tx-mujeres-mondays, mcallen-tx-bicycle-world-tnt-ride.** Bicycle World RGV's group-rides page still lists all three (Tuesday 6:30 pm Corpus Christi; Monday 6:30 pm Mujeres Mondays and Tue/Thu 6:30 pm McAllen) and says "now that daylight savings is here our evening shop rides are back", but it carries no date, and nothing else about these rides loaded. Not confirmed. Expect the evening times to change when daylight saving ends on Nov 1.
- **corpus-christi-tx-cc-led-saturday-light-ride.** The Bend Mag article is behind a bot wall and Instagram returned 429. The CC LED site's footer says © 2023 and doesn't mention the ride.
- **san-antonio-tx-satx-social-ride.** The club's Strava page (156195) says free rides every Tuesday evening and shows an upcoming-event flag, but the date, time and start need a login. Facebook and Instagram don't load. Not confirmed.

## Rejected

- Mellow Johnny's `austin.mellowjohnnys.com/rides-clubs` (seen Oct 1): redirects to the shop home page. The shop's community page replaced it.
- austinbikegroups.com directory (seen Oct 1): several times are stale against the hosts' own pages. Violet Cruise 7:00 (host: 7:30 from Jun 6), Violet Sunday 8:15 (host: 7:30 from Jun 7), Bagel Ride 8:00 (host: 7:30 from Aug 15), Babes at 2110 S Congress (host: 600 Harthan St). Used only for names.
- Austin Ridge Riders' Ride Like a Girl (seen Oct 1): the events page's last Monday-evening date is Sept 14; the club says it runs Mondays in the summer. Not listed. Re-check next summer.
- Strava event pages that surfaced in search were stale: Breakfast Club "Social Group Ride" (May 26 Fri, not 2026) and Le Peloton Cycling Club (Paris). Not used.
- Waco Bicycle Club's Tuesday and Thursday MTB rides (seen Oct 1): the page gives a 9 am time "beginning June 2" for summer heat; no October time. Not listed.
- SAW Sunday Recovery Ride (seen Oct 1): the calendar shows it only on Sept 27 and Oct 25 and I could not tell if it is monthly. Not listed.
- The Time Out archive pages for Queer Ride (2015) are old; I used only the host's page and Do512's weekly listing.
- MTBATX's recurring rides page (© 2023): Peddler Shop Ride, Celis Brewery Ride and Dirty Church are on it but I found nothing current. Leads only.

## Couldn't confirm

Local riders should check these by hand. Where I list a day and time, it comes from a directory or a social post and is undated.

**Austin: LGBTQ, women / trans / femme, BIPOC**
- **Spokes y Folkx.** FTWNB (femme, transgender, women, non-binary), beginner, no-drop, about 7–10 miles at ~9 mph. Monthly. Directory says Saturday 7:00 pm, "check Instagram/Strava". Strava club 904721 (private, "request to join") and Instagram @spokesyfolxrideatx.
- **Austin Gravel Collective.** Gravel community for FTWNB, BIPOC and para-athletes. Strava club 1112577 (885 members, shows an upcoming-event flag). Site thegravelcollective.com/austin fails TLS from here.
- **Bikin' Betties.** Ride for female, female-identifying and gender non-conforming folks, at least once a month on Mondays. Facebook group `facebook.com/groups/bikinbetties`.
- **Austin Latino Heritage Bike Ride** (Instagram @austinlatinoheritagebikeride) and **Black History Bike Ride Austin** (Instagram @blackhistorybikeride, linktr.ee/blackhistorybikeride). Community ride events, no schedule on the directory.
- **Queer Ride** is in the JSON as medium, but neither the host's page nor Do512 shows a dated ride. Worth a Wednesday check.

**Austin: other**
- **Social Cycling Austin's weekly rides** (directory, undated): Monday 6:00 pm Lend Your Legs, leisure pace, Texas School for the Blind; Tuesday 6:30 pm Yoga Ride, ~5 mi, no drop, Doug Sahm Hill; Tuesday 7:45 pm Southern Walnut Creek trail ride, ~20 mi at 10–14 mph, Govalle Park; Sunday 5:45 pm Bike Curious Sunday, 12–16 mi, no drop, Mueller Airport Hangar; Saturday 11:30 am Caffeine Cruise, location on Instagram. Links: linktr.ee/socialcyclingaustin, Instagram @socialcyclingaustin, Facebook group socialcyclingaustin. The group's own site (austinsocialcycling.com) is blocked.
- **Ride Bikes Austin.** Rolls 8:00 pm every Friday from Parque Zaragoza per its Linktree (linktr.ee/RideBikesAustin). No date on the page. Left out only to keep Austin at 12.
- **Friday Flora Coffee Ride** (Bagel Ride club). Fri 7:15 am from Flora Coffee, 3300 W Anderson Lane, 23 or 50 miles. Strava club 1158711 posts, newest Jul 24, 2026 (a cancellation). Not confirmed for October.
- **Violet Crown's other rides:** Tue and Thu 7:00 am T&T, 16–18 mph, from Mellow Johnny's; Saturday Violet Cruise 7:30 am, beginner-intermediate, 15–16 mph; Sunday ride 7:30 am. Left out for the host cap; all on violetcrown.org/rides.
- **North Austin Social Bicycling.** Tuesday 7:30 pm, ~15 mi, Balcones District Park. Facebook group.
- **CapTex Cruisers.** Cruiser and BMX club, Thursday 7:00 pm and Sunday 10:00 am from Ramsey Park, per the directory. captexcruisers.com loads blank.
- **Nelo's Cycles shop rides** (Mesa Dr, up to 75 miles at 16–21 mph), **Buda Bike Co. Cycling Club** (Saturday mornings, 200 S Main St, Buda), **Austin Trek stores** (four shops, rides all week, Facebook). All from austintriclub.org's directory; I did not fetch their own pages.
- **Austin Ridge Riders' Advanced Ride** is high proof (Ticket Tailor: Sat Oct 17 Barton Creek, 9:00 AM; third Saturdays) but advanced-only, so I left it out.

**San Antonio and Hill Country** (all from bike-san-antonio.org, undated, lead only)
- **Black Girls Do Bike San Antonio.** Wednesday 10:00 am Phil Hardberger Park, Thursday 6:30 pm Tobin Park, fourth Saturday monthly. Facebook.
- **LezRideSA.** About monthly, level 1. Facebook.
- **Rebel Betties.** Women's MTB, no-drop, San Antonio / Central Texas. Facebook group `facebook.com/groups/rebelbetties`. stormmtb.org/groups links it.
- **Alamo Bicycle (La Tuna Ride).** Monday and Thursday late afternoon at 100 Probandt; First Friday at Guillermo's, 618 McCullough Ave. Meetup (the ical slug I tried failed).
- **San Antonio Gear Shifters.** Monday (flat) and Thursday (hills) 7:00 pm from Tito's Southtown, 955 S Alamo St.
- **Downtown Highlife Bicycle Club Last Friday Ride.** Last Friday 9:00 pm at the Alamo.
- **Ride Away Bicycles.** Saturday 8:00 am per the directory; the shop's calendar lists it. Not fetched.
- **Britton's Bike Shop rides** (brittonbikes.com, TLS error) and **San Antonio Cycling Club** (sanantoniocyclingclub.org, connection reset): both advertise several weekly rides.
- **Kickstand SA, Hump Day Riders, Heavy Metal Fitness Ride, Cyclones, Life Time Cycle San Antonio (Wed pm, Sat am).** Names only.

**Waco**
- Waco Bicycle Club's **Sunday Social Ride** (13–15 mph, regroups, start and time emailed weekly to members), **Saturday Morning Ride** (A drop, B regroup, C no-drop; start emailed weekly), **RUDE Ride** (daytime social), and **TOTR** (The Other Tuesday Ride). All on the club's RunSignup page; members-only email carries time and place, so I listed none.
- WBC's **Tuesday and Thursday MTB** (Redwood Shelter, Cameron Park, no-drop): 9 am from June 2; October time not stated.

**Corpus Christi** (same Nelo's listing as the three I did add; undated recurrence only)
- Wednesday Lamar ride 6:00 pm (30 mi, no drop), Thursday Hazel Bazemore ride 6:10 pm (no drop; the listing text names two parks), MTB Oso Creek Wednesday (Fall and Spring) and Thursday 5:30 pm from the Cinema 16 lot, Tuesday Southside ride 6:00 pm (a private address), and a Sunday Lamar Park ride whose listing date is 2016.
- **CC LED Saturday Light Ride:** existing on the site; I couldn't re-check it.

**Rio Grande Valley.** All from Bicycle World RGV's group-rides page (undated): Harlingen Tue and Thu 6:15 pm (20 and 25 miles) and Saturday 7:00 am; Brownsville Mon, Tue and Thu 7:00 pm and Saturday 7:00 am from the Event Center on Padre Rd; McAllen Saturday 6:00 am (60 miles) and 7:00 am. rgvcycling.com returned 503. Nothing else turned up.

**Georgetown, San Marcos, New Braunfels.** Nothing found that loads. The Austin Ridge Riders Sunday rides visit Georgetown Trails on Oct 4 and Nov 8 to 29. Leads: Bike SMTX (Facebook), Chain Link Bicycle Shop in New Braunfels (a 2023 article calls it a hub for local cyclists), Gruene Latte and Cibolo rides on the SAW calendar.

## Stats

- Candidates looked at: about 80 (rides and hosts)
- Listed: 19 (7 high, 12 medium)
- Couldn't confirm: about 46 leads across the section above (hosts and rides; several hosts carry more than one ride), plus the 6 existing rides that couldn't be re-checked
- Rejected as ended, changed, stale or unfit: 8
- Existing rides re-checked: 11 rides, 5 entries (3 changed, 2 confirmed), 6 couldn't be re-checked
- Fetches: about 140; web searches: 16 (cap reached)

## Sources

Read and used:

- https://austinbikegroups.com/ and https://austinbikegroups.com/groups
- https://www.violetcrown.org/rides
- https://www.strava.com/clubs/1158711 (The Bagel Ride), /1843 (Violet Crown), /718908 (Breakfast Club), /904721 (Spokes y Folx), /1082301 (Sunday Cruise), /1112577 (Austin Gravel Collective), /mellowjohnnys, /blurcycleworks, /156195 (SATX Social Ride), /sawheelmen, /340757 (Waco Bicycle Club)
- https://breakfastclubatx.com/, /babes, /how-it-works, /schedule
- https://shop.mellowjohnnys.com/pages/community
- https://www.atxbikes.com/articles/rides-events-pg207.htm
- https://www.mtbatx.com/recurring-weekly-rides
- https://www.queerride.org/ and https://do512.com/events/weekly/wed/queer-ride
- https://criticalmassaustin.com/
- https://cycling.frenzied.us/full-moon-rides
- https://linktr.ee/SundayCruiseATX, https://linktr.ee/socialcyclingaustin, https://linktr.ee/RideBikesAustin
- https://www.eventbrite.com/e/sunday-cruise-atx-913-tickets-1999219788204
- https://www.austinridgeriders.com/ride, /events and https://www.tickettailor.com/events/austinridgeriders
- https://www.blurcycleworks.com/rides
- https://www.meetup.com/storm-mountain-biking/events/ical/ and https://stormmtb.org/groups, /events
- https://neloscycles.com/CC-Cycling-Club/
- https://do512.com/events/2026/8/27/thursday-night-social-ride-tribute-to-dolly-parton-tickets and https://heyaustin.com/events/thursday-night-social-ride-28/
- http://www.sawheelmen.com/, /events/1003-cibolo, /events/1004-bulverde, /events/1010-whc, /events/1101-latte, /events/2026-0919-whc, /events/2026-0927-recovery, /events/2026-1025-recovery
- https://runsignup.com/MemberOrg/WacoBicycleClub/Page/club-rides
- https://www.bicycleworldrgv.com/articles/group-rides-pg625.htm and /about/come-ride-with-us-pg377.htm
- https://www.bike-san-antonio.org/sa-bike-groups/ (lead only)
- https://austintriclub.org/cs/austintriclub/page.detail?page_id=58 (lead only)
- https://www.getccled.com/ and https://www.instagram.com/ pages (no usable content)

Tried and did not load: austinsocialcycling.com, thegravelcollective.com, cccycleclub.com, brittonbikes.com, sanantoniocyclingclub.org, thebendmag.com (bot wall), rgvcycling.com, tockify.com/brittons.bikes, stormmtb.org/events-calendar, meetup.com/alamo-bicycle (no such group).
