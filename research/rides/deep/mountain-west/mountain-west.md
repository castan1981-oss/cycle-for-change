# mountain-west — deep sweep (Utah, Nevada, New Mexico, Montana, Wyoming)

Agent: group-ride scout · Date: 2026-10-01 · Area id `mountain-west`

WebSearch was capped, so every ride here came from pages fetched directly: Meetup ical feeds, a WordPress calendar feed, club and shop pages, and the link lists on pages already fetched. That found far fewer rides than Arizona did. Strava club pages load here but hide their event details behind a login, and I could not guess Meetup group names, so a lot of Strava-only and Facebook-only rides are in "Couldn't confirm" below.

## Summary

New rides: **10** (target was about 30; see the note above). Dry run: all 10 accepted.

| City | New |
|---|---|
| Las Vegas | 2 |
| North Las Vegas | 1 |
| Reno | 1 |
| Sparks | 1 |
| Santa Fe | 1 |
| Albuquerque | 1 |
| Las Cruces | 1 |
| Laramie | 1 |
| Bozeman | 1 |

By confidence: 6 high, 4 medium. By host: Las Vegas Valley Bicycle Club 3, New Mexico Touring Society 3 in all (2 already listed + 1 new), Reno Wheelmen 3 in all (2 listed + 1 new). No city is over its cap.

Re-checks of the 31 rides already listed: **6 confirmed · 2 changed · 4 seasonal break · 19 couldn't confirm (unreachable) · 0 ended.** Dry run of `rides-apply.js`: clean.

Not covered at all: Park City, Moab, Provo, Henderson, Taos, Missoula (new rides), Billings (new rides), Cheyenne, Casper. I found no host in those towns with a page I could read that proves a current ride. Women / trans / femme, queer and BIPOC rides: none could be proven (see Couldn't confirm).

## Why these

- **LVVBC Wednesday Morning Ride** (Las Vegas): 7:00 am, ~30 miles at ~15 mph from Einstein Bagels. The club's Meetup shows every Wednesday to Jan 5, 2027.
- **LVVBC Sunday Ride** (Las Vegas): 8:00 am, ~30 miles round trip, coffee after, from W. Cheyenne at Soaring Gulls Dr.
- **LVVBC Monday Night Ride** (North Las Vegas): 6:00 pm, 23-26 mile flat loops at 14-17 mph, a new route each week; lights needed.
- **MWF Morning Ride** (Reno): A and B groups three mornings a week from Dolce Caffe. Not run by Reno Wheelmen but on their calendar. Start time moves with the weather; the group's Strava club has the current one.
- **The Friday Lunch Ride** (Sparks): noon Fridays, 18-23 easy miles, from Greg St. Reno Wheelmen's feed lists each Friday.
- **Rob and Charlie's Sunday Group Ride** (Santa Fe): the shop's 9:00 am Sunday ride, 45-65 miles. Santa Fe Seniors on Bikes points riders to it.
- **NMTS Start the Week Rite Ride** (Albuquerque): 4th Monday, 20 easy miles at 13 mph; the club calls it a beginner ride.
- **ZiaVelo Saturday Group Ride** (Las Cruces): a no-drop 40-miler from Milagro Coffee, 8:00 meet in the cooler months.
- **Tuesday Night Hammer Ride** (Laramie): a drop mountain bike ride from the end of Willett Dr, the hard counterpart to Spinderellas.
- **38 Special** (Bozeman): the fast Saturday road ride over Bozeman Pass. Listed as a seasonal break; the host's schedule runs April through September.

## Where rides are posted here

Machine-readable, a robot can re-read:
- **Meetup ical:** Las Vegas Valley Bicycle Club `https://www.meetup.com/las-vegas-valley-bicycle-club/events/ical/` (10 events, with per-week routes). SLCMTB `https://www.meetup.com/salt-lake-city-mountain-biking/events/ical/` (Tuesday socials only). Wasatch Mountain Club `https://www.meetup.com/discover-the-wasatch-mountain-club/events/ical/` (climbing and socials in October, no biking).
- **Reno Wheelmen** (WordPress, The Events Calendar): `https://renowheelmen.org/events/?ical=1`. It carries the club's rides and also lists MWF Ride, The Friday Lunch Ride, Bike Night Reno and Sparks Group Ride with dates a month ahead.
- **Santa Fe Road Riders** (EventON): the REST list `https://santaferoadriders.com/wp-json/wp/v2/ajde_events` returns every posted ride; each event page carries schema.org `startDate` and a location. Saturday is gravel, Sunday is road, posted a few weeks ahead.
- **Bonneville Cycling Club:** homepage lists the next five rides with local times; `https://www.bccutah.org/rides/calendar/2026/10` is a script page whose static copy shows times in UTC (subtract 6 hours in October). The site says anyone, member or not, can join any ride.
- **Laramie BikeNet** and other Squarespace pages: add `?format=json` to read the page's last-edit stamp. **GVBC** (WordPress): `/wp-json/wp/v2/pages?slug=weekly-rides&_fields=modified` gives the edit date.

Static pages worth re-reading: NMTS `https://www.nmts.org/displayWeekly.php` (day tabs, dated leader notes); Bike & Chowder `https://www.bikeandchowder.org/schedule.html` (a month-by-month A Group list); Santa Fe Seniors on Bikes `https://santafesobs.com/ride-schedule` (a start time for every month); ZiaVelo `https://ziavelocycling.com/ziavelo-group-rides/`; New Mexico Cycling's group list `https://www.nmcycling.org/grouprides.html` (a lead list, last updated Jan 23, 2026).

Walls and dead ends: Billings TrailNet's data feed sits behind Cloudflare (left alone). Strava club pages (IBB 1054190, Pedal & Pour 839143) load but hide events. Facebook-only hosts (999 Ride, Bozeman Pedal Project, Montana Dirt Girls) can't be read. Meetup group names could not be guessed (about 70 guesses, none live).

## Re-checked

Confirmed (6):
- NMTS Sunday Bosque Trail Ride: weekly rides page, copyright 2026, 9:00 am from Open Space Shining River lot, with a July 5 construction note.
- Bike Night Reno: Reno Wheelmen feed, Wednesdays Oct 7-28, 7:45 pm.
- Sparks Group Ride: feed, Saturdays Oct 3-31, 10:00 am from Sierra Bicycle Supply.
- Bike & Chowder Club Rides: October schedule dated 10/4 to 10/27, 8:00 AM.
- Santa Fe Road Riders Weekend Rides: calendar post dated Sept 28 for Sat Oct 17, 9:00 am, Fort Marcy.
- Bonneville Cycling Club Weekly Rides: rides listed Oct 1-3, all-welcome note.

Changed (2):
- Santa Fe Seniors on Bikes Tuesday Ride: A group starts 10:00 am in October and November (was 9:00), 11:00 December to March. Added `start_times` for Oct 1, Dec 1, Apr 1 and May 1, 2027, worked out from the club's month list. The club says WhatsApp has the latest.
- SLCMTB Tuesday Social Ride: starts move with the light in the Meetup feed: Oct 6 at 5:00 pm, Oct 13 at 4:30 pm, then 5:45 pm. Kept 5:45 as the listed time; schedule text carries the early starts. Added the Meetup feed URL.

Seasonal break (4):
- NMTS Saturday Easy Group Ride: "RESUMES March 6, 2027" on the club's page.
- Reno Wheelmen Wednesday Group Ride: **an inference**. October's feed has no Wednesday Group Ride; the club runs it as a spring-to-fall series. Worth a look if a Reno rider is handy.
- Wasatch Mountain Club Tuesday MTB: club says weekly evening rides are a summer series; October calendar has none.
- Bike to Work Wednesdays (Jackson): 2026 series started June 17 "all summer long"; October calendar has none.

## Couldn't re-check (19, entered as unreachable; nothing on the ride changes)

- Billings Spoke Shop Monday Road Ride: TrailNet's page lists it, undated; shop page has no ride details.
- Bozeman Alter Cycles Tuesday MTB: only a GVBC page (modified Mar 9, 2026) lists it; shop site has nothing.
- Montana Dirt Girls Tuesday: Google Sites page undated.
- Missoula Thursday Night MTB: site dates from 2009, feed is a Twitter widget.
- Giant Las Vegas Summerlin Saturday and Giant Las Vegas Tuesday Night MTB: page has the rides but no dates, and a stale January 4 beginner ride.
- Orem Bicycle Coalition Monthly Ride: only an undated Mad Dog Cycles page.
- 999 Ride: Facebook only.
- Laramie Spinderellas and Pedal House Wednesday: BikeNet page last edited Nov 16, 2025, nothing from 2026.
- Great Falls Bicycle Club Thursday Road Ride: newest dates on the page are 2022.
- Helena Bicycle Club Thursday Evening Ride: page undated ("into the fall").
- Wheaton's Saturday Night Roll-Out and Wednesday Night Trails (Kalispell): page undated.
- Pedal & Pour Sunday Coffee Ride: shop rides page shows no details; Strava hides the event.
- IBB Friday Social Road/Gravel Ride: page says "NEW STARTING TIMES" with no date; Strava hides the event.
- Joyride Thursday Night Ride: page says it restarted for Spring/Summer 2025 and has nothing newer.
- Skyline Cycle Wednesday Night Ride (Ogden): the shop's own site has no rides page.
- Cheyenne Mountain Bike Club Wednesday Social Ride: site and events frozen at 2020. **Probably dormant**; a Cheyenne rider should check.

## Rejected

- Bangtail Bikes Monday Night Road Rides and mountain bike rides (Bozeman): the shop's own group rides page (fetched Oct 1, 2026, footer 2023) says "We are not currently running our group rides. Please check back next summer!"
- Great Falls Bicycle Club, Cheyenne Mountain Bike Club, Joyride: stale pages, above.
- ABQ Cycling Club Saturday ride: New Mexico Cycling's list (Jan 23, 2026) says its Facebook page has not been updated since 2024.
- Lobo Ride (Albuquerque): the same list says it is not happening.
- Red Rock Bicycle Co (St. George, Cedar City, Hurricane): says it has weekly group rides for club members but the events page lists none.

## Couldn't confirm (leads for Robert or a local rider)

Women / trans / femme / queer:
- **Bozeman Pedal Project Women's Mountain Bike Rides**, Wednesdays 5:45 pm, trailhead posted weekly on the group's Facebook page. Seen on the GVBC page (modified Mar 9, 2026); its own site says "Coming Soon". Probably a summer series.
- **Bozeman Pedal Project Women's Road Rides**, Tuesday or Monday 6 pm (the GVBC page puts it under Monday), details on Facebook.
- **Cycling Peeps** (Albuquerque): women-only Meetup group, mostly weekend rides, some co-ed. Seen on New Mexico Cycling's list; I could not find the Meetup address.
- **Jemez Honeys** (Jemez Mountains, NM): no-drop, mostly ladies, weekly road rides. Same list, Facebook only.
- **Women, Trans, Femme Nights** at the Bicycle Collective (Salt Lake, Ogden, Provo, St. George) are repair nights, not rides.

Albuquerque and New Mexico (all from New Mexico Cycling's list, last updated Jan 23, 2026, or NMTS):
- **Wednesday Night Crest Climb**: leaves 5:30 pm from the dirt lot at NM14 and Sandia Crest Rd, April to October.
- **Albuquerque Critical Mass**: last Friday of the month, 6:30 pm, UNM Duck Pond (Facebook).
- **Fat Tire Cycles** (Albuquerque): gravel, road and MTB on Sundays and Thursdays (Facebook, 505-345-9005).
- **Two Wheel Drive** (Albuquerque): shop rides "pretty often" (Facebook). **GitSumAdventures**: weekend gravel rides.
- **Reaper Ride** (Albuquerque): a fast Tuesday and Thursday lunch ride past the Believers Center on Central at about 12:05.
- **ZiaVelo Sunday ride** (Milagro Coffee, 8:00 am, harder) and **ZiaVelo Heater** (Wednesday, race-pace drop ride from Spotted Dog Brewery in Mesilla, DST months only): both on ZiaVelo's page, undated.
- **Las Cruces:** Monumental Loop weekly gravel rides (Outdoor Adventures Facebook), Las Cruces MTB Dona Ana Tuesdays about 6 pm, Mesilla Park Cycling Group (two Sunday rides), Adaptive Cyclers Plus Wednesday rides (call 915-490-7375, per Velo Cruces).
- **Silver City:** Saturday Decide-and-Ride MTB at Gila Hike & Bike, 103 E College Ave. **Gallup:** Wednesday night MTB, usually 5:30 at McGaffey (email list).
- **Santa Fe:** Santa Fe Mountain Bike Society, Los Alamos Tuff Riders (Facebook only).
- **Santa Fe Seniors on Bikes Thursday rides** (April to October, by group, WhatsApp). It is a 50-and-older club with dues and a waiver; not listed.

Montana and Wyoming:
- **The Spoke Shop (Billings):** Saturday urban ride, 9:00-10:30 am, 12-16 miles, and Wednesday mountain bike ride 6:30 pm April to early October from the Zimmerman Trail lot. Both on Billings TrailNet's undated page.
- **Eagle Mount adaptive rides** (Bozeman): Tuesdays 6 pm, ~15 miles, hand cyclists and volunteers; call Jenny at 586-1781 (GVBC page).
- **Bozeman:** Alter Cycles Happiest Hour, Fridays 5 pm (a hangout, not a ride); SWMMBA Thursday MTB (the GVBC page's text is from an earlier year).
- **Missoula:** Free Cycles Missoula and Missoulians on Bicycles (weekend road rides) are named on Missoula pages but I found no schedule I could read.

Utah:
- **Bonneville Cycling Club** runs Social Series rides most days (for example Thursday Tour De Maverick Social at 5:30 pm, Happy Camper Deli Ride Thursdays at 10:15 am, Monday evening Mondays to the Marina). I did not list them because the October calendar shows each as an individually led ride and I could not tell which repeat weekly.
- **Mad Dog Cycles (Orem) Strava club** advertises group rides; no schedule found.

Host-cap extras (found but over the 3-per-host cap; the cap is already used by listed rides):
- NMTS Albuquerque: **Any Way the Wind Blows** (Sunday 9:30 am from the Rail Runner lot at Sandia Pueblo near Roy Ave, 40 miles, moved to 9:30 on 9/27); **Flexible Monday Ride** (Monday 9:00 am from Alameda Open Space, 40 miles at 16 mph); **Friday Out and About Ride** (Friday 9:00 am from the same Rail Runner lot, ~32 miles). All on `https://www.nmts.org/displayWeekly.php`, all current.
- Las Vegas Valley Bicycle Club: no extras in the feed.

## Stats

- Candidates looked at: about 75 (31 listed rides, 10 added, the rest rejected or left as leads)
- Listed: 10 new
- Couldn't confirm: 19 existing rides + 24 leads above
- Rejected as ended or stale: 8
- Page fetches: about 165

## Sources

Meetup ical feeds: las-vegas-valley-bicycle-club (and event pages 316595875, 316531839), salt-lake-city-mountain-biking, discover-the-wasatch-mountain-club (group page and feed). Reno Wheelmen: `https://renowheelmen.org/events/?ical=1` and the event pages for bike-night-reno, reno-wheelmen-wednesday-group-ride-3-2-2, pedal-sports-ride-2. Santa Fe Road Riders: `https://santaferoadriders.com/`, `/wp-json/wp/v2/ajde_events`, `/events/sfrr-a-b-c-epic-gravel-adventure-pacheco-canyon-4/`. NMTS `https://www.nmts.org/displayWeekly.php`, `https://www.nmcycling.org/grouprides.html`, `https://www.velocruces.org/organizations-resources`. Bike & Chowder `https://www.bikeandchowder.org/schedule.html`. ZiaVelo `https://ziavelocycling.com/` and `/ziavelo-group-rides/`. Rob and Charlie's `https://www.robandcharlies.com/` and `/node/292`. Santa Fe Seniors on Bikes `https://santafesobs.com/ride-schedule` and `/sunday-energetic-rides/`. Bonneville Cycling Club `https://www.bccutah.org/`, `/rides/calendar/2026/10`, `/rides/5321`, `/rides/4899`. Wasatch Mountain Club `https://www.wasatchmountainclub.org/`, `/road-biking`, `/calendar`. Laramie BikeNet `https://www.laramiebikenet.org/group-rides`. Friends of Pathways `https://friendsofpathways.org/event/bike-to-work-wednesdays-8/` and `/events/`. Gallatin Valley Bicycle Club `https://gallatinvalleybicycleclub.org/weekly-rides/`. Billings TrailNet `https://billingstrailnet.org/events-calendar/`; Spoke Shop `https://www.spokeshop.com/about/rides-events-calendar-pg238.htm`. Alter Cycles, Bangtail Bikes `https://www.bangtailbikes.com/group-rides`. Montana Dirt Girls (Google Sites home and events), `http://thursdaynightmtbr.org/`. Giant Las Vegas `https://www.giantlasvegas.com/articles/local-rides-pg226.htm`; Pedal & Pour `https://pedalpour.com/shop-rides/` and Strava club 839143. IBB `https://www.ibbcyclery.com/rides-and-events/` and Strava club 1054190. Joy Ride `https://www.joyridebikes.com/articles/ride-schedule-pg195.htm`. Skyline Cycle `https://www.skylinecyclery.com/`. Mad Dog Cycles clubs page. Cheyenne Mountain Bike Club (home, events, WordPress page list). Great Falls Bicycle Club `http://www.greatfallsbicycleclub.org/rides/`. Helena Bicycle Club ride calendars page. Wheaton's `https://www.wheatonscycle.com/articles/group-rides-pg169.htm`. Also read for leads: Bike Utah, Bicycle Collective, Mountain Trails Foundation, Red Rock Bicycle Co, Contender Bicycles, Hoback Sports, BikeABQ, Las Vegas Valley Bicycle Club site, Visit Utah hub page (named in the existing record).
