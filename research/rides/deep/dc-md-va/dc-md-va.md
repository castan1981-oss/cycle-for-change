# dc-md-va: group-ride deep sweep report

- **Area id:** `dc-md-va` (Washington DC, Maryland, Virginia, Delaware, West Virginia)
- **Agent:** group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026
- **Files:** `dc-md-va.json` (32 new rides), `upkeep.json` (18 re-check entries), this report
- **Fetches:** about 140 of the 150 budget. WebSearch was not used.
- **Dry runs (`--today 2026-10-01`):** `merge-ride-research.js` accepted 32, rejected 0. `rides-apply.js` took all 18 entries, no errors (5 changed, 2 seasonal break, 11 confirmed).

## Summary

**New rides: 32** (25 high, 7 medium). The target was about 30.

By city: Washington 4 · Roanoke 4 · Bowie 3 · Falls Church 2 · Glen Echo 2 · Richmond 2 · Virginia Beach 2 · Norfolk 2 · Arlington 1 · Alexandria 1 · Potomac 1 · Westminster 1 · Reston 1 · Davidsonville (Annapolis area) 1 · Greenville DE 1 · Delaware City DE 1 · Glen Allen 1 · Henrico 1 · Charlottesville 1.

By state: VA 18, MD 8, DC 4, DE 2. None for West Virginia (Charleston and Morgantown were re-checks only).

By host: Conte's Bike Shop 3, MORE 3, Jafe Cycling 3, then 2 each for DC Tri Club, Squadra Coppi, Potomac Pedalers, White Clay BC, RABA, Tripower, East Coast Bicycles and Cardinal Bicycle. Every host is at or under 3 counting rides already on the site.

Kinds: road 21, MTB 6, gravel 2 (one is the Blue Wheel winter series), social 10 (overlap). Inclusive: 3 women/trans/femme or women-only (MORE Women's, Fastchix, Roanoke Valley Riveters), 4 beginner, 6 no-drop.

**No new LGBTQ ride made it in.** DC Queer Bike Rides and OutRiders are already on the site and both re-checked fine. The leads I found for queer riders (Streets Calling Bike Club DC, DIVA Cycling) live on Instagram or a private Meetup. See Couldn't confirm.

**Re-checks: 18 of 31 written.** Confirmed 11 · changed 5 · seasonal break 2 · ended 0 · paused 0. The other 13 are under Couldn't re-check. Most of those are shop pages that load but carry no date at all, and I did not confirm a ride off an undated page.

**Where Baltimore and Frederick stand.** I found nothing new for Baltimore, Silver Spring, Bethesda proper, Frederick or Rehoboth that I could prove. Rehoboth and Lewes are full because Sussex Cyclists already has its 3 on the site (extras listed below).

## For the editor

- **Seven rides already listed changed or paused.** DC Tri Club Sunday (runs into fall, now has a feed), Sussex Wednesday Dogfish Head (10:00 am from Oct 14), ABRT Sunday (9:00 am since Labor Day, was listed at 8:00), NoVA CBG Tuesday (now 6:00 pm, 5:45 pm from Oct 13), OutRiders (runs into October, not just summer), Goon Ride (off for the season), Blue Wheel Tuesday (paused for winter).
- **NoVA CBG Tuesday Night Ride.** The Meetup feed says arrive 5:45 and roll 6:00 on Oct 6, then arrive 5:30 and roll 5:45 from Oct 13. The site had 6:30 pm. I set `start_hhmm` 18:00 and `start_times` 17:45 from Oct 13. The Thursday "Thirsty Thursday" B and A rides had their last ride of the season today and were not added.
- **WCBC North Wilmington Flat Ride is probably over for the season.** It is on the club calendar for Tue Sept 29, and there is nothing on Tuesdays from Oct 6. The club's Wednesday Castle Trail Night Rides take the evening slot. The host does not say it ended, so I wrote no entry. Please look.
- **Two new rides are dated series that end.** Conte's Richmond Sunday Brunch (series ends Oct 25, 2026) and the DC Tri Club Hains Point Wednesdays (end of October). Conte's Old Town Roll ended Nov 1 last year; this year's calendar entry has no end date.
- **Blue Wheel Winter Gravel Series** is entered with `status: seasonal-break` and a status note that it starts Nov 15, 2026. The page gives no start times, so `time_local` is null.
- **Start times that will move.** ABRT Saturday goes to 10:00 am in December (the 2026 switch date is not published; last year's calendar switched Dec 6). DC Tri Club Saturday goes from 7:30 to 8:30 am for winter (no date published). Frederick Pedalers moved its Sunday ride to 11:00 am on Oct 31 last year; this year's calendar still shows 9:30 am through Nov 29.
- **Private details left out.** Ride-leader phone numbers and emails are on the RABA, PPTC and White Clay pages. I used none.
- **Squadra Coppi, Conte's Hills for Breakfast and the two East Coast Bicycles rides are medium** because their pages carry no recent date. Hills for Breakfast's calendar entry was last edited April 2025.

## Why these

- **Anacostia Park Paceline (DCC).** A Wednesday 7:00 am paceline where the speed goes up every 4-mile loop. Ride as many laps as you can hold.
- **Saturday Ride from Georgetown (DC Tri Club).** The club's all-paces Saturday road ride, 30 to 100+ miles. Not a no-drop ride.
- **Weekly Hains Point Rides (DC Tri Club).** A friendly Wednesday-evening hour at Hains Point with snacks on the grass after.
- **Fabulosity Bike Ride (DC).** A small third-Saturday social ride from the African American museum.
- **Coppi Sunday Ride and Coppi-Vida Saturday (Squadra Coppi).** Two fast Virginia rides, with a no-drop B-ride leader on request.
- **Hills for Breakfast (Conte's Falls Church).** A no-drop 22-mile hilly Saturday ride with A and B groups.
- **Old Town Roll (Conte's Alexandria).** A no-drop 14-16 mph Saturday ride from King Street.
- **The Usual Monday Ride from Glen Echo (Potomac Pedalers).** A relaxed 30-mile weekday-morning ride around Bethesda and Potomac.
- **Glen Echo Loops (Potomac Pedalers).** A Thursday-morning C-pace ride at 11-12 mph. Register each week.
- **MORE Women's Mountain Bike Ride at Cabin John.** Women 18+, beginners welcome, 4 to 5 miles of singletrack, Thursday evening.
- **Get to Know Hashawha (MORE).** A weekly beginner mountain bike ride at 4-6 mph where the leader teaches the trail features.
- **Gears and Beers Lake Fairfax (MORE).** A social Thursday-evening MTB ride in three speed groups with a beer after.
- **Fridays at Jafe's.** A 20-mile Friday shop ride in Bowie with drinks after.
- **Sunday Matinee (FWP x Jafe).** A 40-plus-mile Sunday ride from the same Bowie shop.
- **Fastchix Thursday Morning Ride.** A women's group ride, 21-23 miles at 14-16 mph, Thursday at 7:30 am.
- **ABRT Saturday Ride.** The Annapolis area's 30-year-old Saturday ride, 60 or 42 miles. A drop ride.
- **Greenville Weekend Warrior Ride (WCBC).** A 42-mile Saturday ride at 13-14 mph from Greenville, DE. Sign up first.
- **Castle Trail Night Rides (WCBC).** A Wednesday-night social ride on the C&D Canal trail, open after dark on a state permit. Big lights required.
- **Beer and Buddies Ride (RABA, West Creek).** All paces on a 6-mile loop, Wednesday 5 pm, beer at the brewery after.
- **Ashland Breakfast Club Ride (RABA).** A mostly flat Saturday ride to Ashland. All paces.
- **A+ Pace Road Ride with Full Spectrum Racing (Blue Ridge Cyclery).** The shop's fast Saturday option, new for 2026.
- **Sunday Brunch Ride (Conte's Richmond).** A no-drop 35-mile Sunday ride at 16-18 mph. Runs through Oct 25.
- **Winter Gravel Series (Blue Wheel, Charlottesville).** Seven Sunday gravel rides, November to March, starting with a WTF ride in Nelson County.
- **Saturday Group Ride (Tripower).** A Virginia Beach A/B/C road ride at 7:15 and 8:30 am.
- **Tuesday/Thursday Morning Ride (Tripower).** A 40-mile out-and-back to Pungo at 7:15 am.
- **Saturday Morning Group Ride and Monday Evening Ride (East Coast Bicycles).** A 7 am 55-miler and a Monday cruise from the Norfolk shop. Both medium.
- **Ride With Billy (Cardinal Bicycle Grandin).** An easy Wednesday ride with no experience needed.
- **Thursday Drop Bar Ride (Cardinal Orange Ave).** An intermediate road ride that regroups at every turn. Third-Thursday clinic.
- **Roanoke Valley Riveters.** Women's mountain biking on Wednesdays at Carvins Cove. Medium (secondary source).
- **Thursday No-Drop Ride (Roanoke Mountain Adventures).** A two-hour road and gravel ride to the Mill Mountain Star. Medium (secondary source).

## Where rides are posted here

**Machine-readable feeds (a robot can re-read these):**

- Meetup `.../events/ical/`: district-cycling-collective (read, 10 events), novacbg (read), MORE-Mountain-Bike-Rides, jafe-cycling-bike-shop, fabulosity-bike-rides. All fetched with real events in them. outriders-dc-va-md, velocityriders, DIVA-Cycling, dmv-rollers-cycling, eorocycling, pints-pedals and trail-dames-of-central-virginia return "Invalid feed signature" (private groups). OutRiders' events page still loads and lists dated rides.
- DC Tri Club: `https://www.dctriclub.org/calendar/?ical=1` (a WordPress Events Calendar feed, 30 events).
- Conte's Bike Shop publishes six regional Google Calendars. The two that matter here are Northern Virginia and DC (`...6ac925ab...@group.calendar.google.com`) and Southern Virginia (`...bd12907c...@group.calendar.google.com`). Find the calendar ids in the `src=` on `https://www.contebikes.com/about/rides-events-pg229.htm`. The same page holds the Florida, Georgia, Massachusetts and North Carolina calendars, which are not ours.
- ABRT: Google Calendar `abrtmembership@gmail.com` (the team calendar page embeds it).
- Frederick Pedalers: a WordPress events calendar; the `?ical=1` URL hit a SiteGround captcha, so I did not use it.

**Calendar pages with dates (no feed):**

- Potomac Pedalers: `https://www.potomacpedalers.org/calendar` (ClubExpress; ride descriptions are in each entry's title text).
- RABA: `https://www.raba.org/weekly-rides/` (reposted every month, named "Weekly Rides for October, 2026").
- White Clay Bicycle Club: `https://www.huntcal.com/cal/view/WCBC/WCBC?vm=r` (huntcal, with an iCalendar subscribe link whose URL I did not find).
- Sussex Cyclists: `https://www.sussexcyclists.org/Upcoming-Events` and `/calendar` (rides on every weekday; winter start times are posted as events).
- Mountain State Wheelers: schedule PDF posted each April.

**Shop and club pages (static):** Blue Wheel, Cardinal Bicycle, Blue Ridge Cyclery, Tripower, East Coast Bicycles, Squadra Coppi, NCVC, Bethesda Bike & Ski. Cardinal and Tripower carry 2026 dates; the others are undated.

**A trick worth reusing:** Meetup's search page returns group links in plain HTML. `https://www.meetup.com/find/?keywords=cycling&location=us--dc--Washington&source=GROUPS` (swap `us--md--Baltimore`, `us--va--Richmond` and so on) lists group names without a login. Then fetch each group's `/events/ical/`. About half the hits are dead or private.

**Directories used as leads only:** dcpaceline.com (a good list of the hard DC drop rides with Strava clubs), touchgrassdc.com, bikemore.net's calendar page, roanokeoutside.com (a June 2026 guide).

**Strava clubs seen on dcpaceline.com, event pages not found:** The Goon (`strava.com/clubs/theGoon`), Route 1 Velo (`clubs/4306`), the Thrasher ride (`clubs/329783`), G2 (`clubs/96359`).

## Re-checked

Confirmed (11):

- **DC Queer Bike Rides:** 2026 schedule page lists Oct 10 and Oct 22; announcement dated July 8, 2026.
- **Monday Moves (District Cycling Collective):** Meetup feed, Mondays Oct 5 to Nov 9, meet 10:00, depart 10:15. Feed added.
- **Friday Brewery Gravel Trail Ride (Sussex Cyclists):** Fridays 10:00 am through Oct 30; start rotates between breweries.
- **Cupola Park Thursday Ride (Sussex Cyclists):** Thu Oct 15 at 9:00 am listed; Oct 8 not yet posted.
- **Parvilla Thursday Shop Ride:** ABRT's page says 5:30 pm April through mid-October. The page carries no event date, only a 2026 copyright and a 2026 team calendar behind it.
- **Sunday Ride from Monocacy Middle School (Frederick Pedalers):** Sundays Oct 4 to Nov 29 at 9:30 am.
- **Powhatan Courthouse No Drop (RABA):** the October 2026 table lists Sunday 9:00 am.
- **Saturday Bridge Ride (Blue Ridge Cyclery):** page says new for the 2026 season, every Saturday, roll 8:30.
- **Tuesday Night Ride (Cardinal Bicycle Grandin):** 5:45 pm, page copyright 2026.
- **Sunday Beginner Ride (Tripower):** home page lists Sunday 8:00 am D pace as a new ride; upcoming Pink Ride Oct 10, 2026.
- **Mountain State Wheelers Saturday Ride:** the schedule PDF (as of 3/30/26) has Oct 3 and Oct 10 at 9:00 AM.

Changed (5):

- **Sunday No-Drop Group Bike Rides (DC Tri Club):** listed Oct 4, 11, 18 (8:30 intros, 8:45 ride). Season changed from "Apr–summer" to "Apr–fall"; feed added.
- **Wednesday Dogfish Head Ride (Sussex Cyclists):** 9:00 am through Oct 7, then "NEW WINTER START TIME" 10:00 am from Oct 14 (`start_times` added).
- **Sunday No-Drop Ride (ABRT):** the page's seasons put it at 9:00 am from Labor Day to December. The site had 8:00. Now 09:00.
- **Tuesday Night Ride (NoVA CBG):** new time, 6:00 pm roll on Oct 6 and 5:45 pm from Oct 13 (`start_times` added). B group, no faster than 15 mph, no-drop.
- **OutRiders DC Thursday Night Ride:** the events page shows the ride on Sept 24 and Oct 1 at 6:15 pm with "Lights Required", so it is not just a summer series. Schedule text updated.

Seasonal break (2):

- **Goon Ride:** DC Paceline lists it as March to September; the Strava group has the schedule.
- **Tuesday Shop Ride (Blue Wheel):** "That's a wrap on Tuesday night rides for the season"; paused for winter.

## Couldn't re-check

13 of the 31 listed rides. No entry written for any of them.

- **DC Bike Party** (2nd Friday, 7 pm): dcbikeparty.com did not load (no connection). TouchGrass DC lists it but with no date. Instagram: @dcbikeparty.
- **Baltimore Bike Party** (last Friday, gather 6:30, roll 7:00, St. Mary's Park): the site's newest post is 2018. Bikemore's calendar page lists it "every last Friday" with no date.
- **Taco Tuesday Ride, Baltimore:** Facebook group only (`facebook.com/groups/310740799305361`).
- **Sunday Shop Ride (Bethesda Bike & Ski):** page loads and states Sunday 8:45 am meet, 9:00 roll, 28 miles at 15 mph, WhatsApp group. No date anywhere on it.
- **Wednesday MTB Ride (Endeavor Cycles, Charlottesville):** the page states Wednesday 5 pm meet, 5:30 roll, but its footer says 2020 and nothing is dated. Check their Instagram (@endeavor_cycles).
- **Women's Monday Mountain Bike Ride (Harrisonburg):** Rocktown's page states Monday 5:30 pm, undated. The Shenandoah Valley Bicycle Coalition page returned a Cloudflare block (403). Not worked around.
- **Slow & Steady Sundays (Norfolk):** the Downtown Norfolk event page is marked a past event; its last date is Sun Dec 28, 2025, nothing in 2026. The shop's site did not load.
- **Thursday Community Road Ride (East Coast Bicycles):** the page states 6:00 pm Thursday but carries no date and says times change through the year.
- **RAR Richmond Monday Night Ride:** the chapter page loads and mentions a Monday night ride, with no time or date. Instagram @rar.richmond.
- **Crank Sisters Social Ride (Roanoke) and Olde Salem Brewery Ride (Salem):** only Roanoke Outside's June 8, 2026 guide lists them. Cardinal Bicycle's own current page no longer lists Crank Sisters, so check the shop.
- **MAMBA Weekly Group Ride (Morgantown):** the page says "usually Tuesdays at 6:30 pm, daylight dependent", undated. Instagram @mambawv.
- **North Wilmington Flat Ride (WCBC):** see "For the editor". Last on the calendar Sept 29, none from Oct 6.

## Rejected

- **Thirsty Thursday and Very Thirsty Thursday (NoVA CBG, Alexandria):** the Oct 1, 2026 events are titled "Last One". Season over. Worth adding in spring.
- **Trek Roanoke Dirt Church (Sundays 5 pm, Carvins Cove):** the Eventbrite page says "Event ended" (seen Oct 1, 2026).
- **Baltimore Bicycling Club schedule (baltobikeclub.org/mobile.php):** lists single rides by date, with personal phone numbers; no standing weekly ride to list.
- **WABA events (waba.org/fun):** one-offs and classes only (Hains Point Hoopla Oct 4, Cider Ride Nov 7, learn-to-ride classes).
- **Conte's Old Town Roll, 2025 series:** ended Nov 1, 2025. The 2026 series (edited May 26, 2026) is the one listed.

## Couldn't confirm

Rides a local rider should check by hand. Name, host, day, time, start, where I saw it.

- **Streets Calling Bike Club DC:** weekly social rides through DC neighborhoods; no day or time. Instagram `instagram.com/streetscallingdc` (via touchgrassdc.com).
- **DIVA Cycling (Meetup):** women's cycling group listed for Baltimore and Annapolis; the Meetup feed is private. `meetup.com/DIVA-Cycling`.
- **VelocityRiders (Meetup):** private feed; listed for Baltimore and Annapolis. `meetup.com/velocityriders`.
- **Route 1 Velo Club Ride:** Sundays 10:00 am and a Saturday Ramble at 10:00 am, from Town Center Market, 4705 Queensbury Rd, Riverdale MD. Saw it only on dcpaceline.com; route1velo.com did not load. Strava club `strava.com/clubs/4306`.
- **Rapha RCC Sunday Ride (DC):** Sundays 8:30 am (gather 8:00, briefing 8:20) from Black Coffee, 4885 MacArthur Blvd NW; 27.9 miles, 1,187 ft. dcpaceline.com only; no Rapha page found.
- **NCVC Espresso Ride:** Sundays 9:15 am (winter) or 8:45 am (summer) from High Road Cycling, Georgetown (3210 Grace St NW). 47.8 miles. NCVC's page states it and carries no date, and does not say when winter hours begin. `ncvc.net/rides`. NCVC also lists a Women's Coffee Ride, monthly or bi-monthly on weekend mornings, no drop, ~27 miles; check Instagram.
- **R.E.L.O.A.D. Ride, Cappuccino Ride, N2 and 7 AM Ride (Rock Creek and Georgetown):** Sunday 9:00 am and Saturday starts, all from dcpaceline.com only.
- **Dam Good Watts Monday MTB Ride (Annapolis Waterworks Park):** Mondays 6:00 pm, March through October per ABRT's page; ABRT's calendar entry says year-round. Instagram `instagram.com/damgoodwatts`.
- **Trek Roanoke Monday FUNday (Olde Salem Brewery, 5:45 pm, no-drop):** Roanoke Outside's June 2026 guide and a Facebook event only.
- **Frederick Pedalers Wednesday evening ride:** an Aug 20, 2026 post moves it to 5:00 pm from Sept 23; no weekday ride is listed on their calendar.
- **Potomac Pedalers Wednesday Night Warriors (Riley's Lock, 5:00 pm):** on the calendar for Sept 30 only, with a "NOTE TIME CHANGE" and nothing after.
- **Roanoke Friday Coffee Club, But Coffee First (Saturday 9:30 am), M&M MTB (Sunday 9:30 am):** all from the Roanoke Outside guide only.
- **Bike Doctor Annapolis and Ivy Lane Wednesday evening rides:** named on ABRT's page; no host page found.

**Held back by the 3-per-host cap (or already in the list):**

- Sussex Cyclists: Saturday 9:00 am and Tuesday 9:00 am Stephen Hudson Park rides (35 miles, 15-16 mph); Sunday 9:00 am DROP paceline (18+ mph, 40 miles); Monday 9:30 am Dewey Beer Ride (14 and 17 mph); Friday Rehoboth/Lewes gravel-trail ride, Planet Fitness Rehoboth, 9:00 am (Oct 2). All on `sussexcyclists.org/Upcoming-Events`.
- RABA: Mondays with Mary, Monday RF&P Ride, Tuesdays at Rockville, Wednesday Bud Vye Retirees Ride, Thursday Anything Goes, Friday Charlie Thomas Ride, Chesterfield Saturday Ride, Centerville Saturday Ride.
- Potomac Pedalers: Saturday Out and Back Rock Creek (9:30 am), Friday Lunch Ride, monthly tailgate rides.
- Cardinal Bicycle: Saturday Singletrack Shenanigans (9:30 am, no-drop).
- ABRT: Tuesday Davidsonville ride (6:00 pm, race pace, March to October).
- Conte's Virginia Beach: Sunday 7:30 am 57-mile ride.
- White Clay BC: Unionville Hills (Thursday 9:00 am; Unionville, PA, outside this area).

## Stats

- Candidates looked at: about 75 (31 listed rides, about 45 new candidates)
- Listed: 32 (25 high, 7 medium)
- Re-checks written: 18 of 31 (11 confirmed, 5 changed, 2 seasonal break)
- Couldn't re-check: 13
- Couldn't confirm leads: about 17
- Rejected as ended, over or not recurring: 5
- Fetches: about 140

## Sources

Meetup feeds and pages: meetup.com/district-cycling-collective (ical), /novacbg (ical), /outriders-dc-va-md (events page), /MORE-Mountain-Bike-Rides (ical), /jafe-cycling-bike-shop (ical and group page), /fabulosity-bike-rides (ical and group page), meetup.com/find (cycling searches for DC, Baltimore, Richmond, Virginia Beach, Wilmington, Annapolis, Charlottesville, Frederick, Arlington). Also the ical feeds for ride-to-eat, casual-pace-cycling-group, a-p-e-x-cycling-collaborative, Not-So-Serious-Mountain-Bikers, we-cycle-rva, good-vibes-bikes-rides-meetup, Rockville-Bike-Hub, bike-rockville, md-rail-trail-biking-club, cider-ryderz-bike-group, chill-wheels.

Club and shop pages: dcqueerbikes.neocities.org · touchgrassdc.com (groups and DC Bike Party) · dcbikeparty.com and dcbikeparty.org (did not load) · dctriclub.org (event page, `calendar/?ical=1`) · sussexcyclists.org (Upcoming-Events, calendar) · whiteclaybicycleclub.org and huntcal.com (calendar, three event pages) · abrtcycling.com (training-rides, team-calendar) and the ABRT Google Calendars · baltimorebikeparty.com · bikemore.net/calendar · baltimorebicycleworksracing.com · baltobikeclub.org · bethesdabikeandski.com · frederickpedalers.org (ride-info, events, Aug 20 post) · dcpaceline.com · arlington and DC: squadracoppi.org, ncvc.net, potomacpedalers.org/calendar, more-mtb.org (home, group-rides, womens-rides) · waba.org/fun and /women-bicycles · contebikes.com (rides-events page and four Conte's Google Calendars) · rapha.com (404) · route1velo.com (did not load) · bluewheel.com · endeavorcycles.com · rocktownbicycles.com · svbcoalition.org (Cloudflare 403) · downtownnorfolk.org · slowandsteadybikes.com (did not load) · eastcoastbicycles.com · tripowercycling.com · raba.org/weekly-rides · radicaladventureriders.com · blueridgecyclery.com · cardinalbicycle.com · roanokeoutside.com · eventbrite.com (Trek Roanoke Dirt Church) · mountainstatewheelers.org (page and PDF) · mambawv.org · weeklyrides.com and clippedin.bike (leads only).
