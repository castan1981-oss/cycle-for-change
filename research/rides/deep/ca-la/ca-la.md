# ca-la: group-ride scout report

- **Area id:** `ca-la`
- **Agent:** Los Angeles and Ventura counties group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026 (Pacific time)
- **Area:** Los Angeles (Griffith Park, Silver Lake, Downtown, Westside), Santa Monica, Venice, Culver City, the South Bay (Manhattan, Hermosa, Redondo, Torrance, Palos Verdes), Long Beach, Pasadena, Altadena, Glendale, Burbank, the San Fernando Valley, Malibu, Santa Clarita, Thousand Oaks, Ventura, Ojai, Oxnard
- **Files:** `ca-la.json` (32 new rides), `upkeep.json` (22 re-check entries) and this report
- **Fetch budget:** about 120 of 150 page fetches. I stopped with budget left because the remaining leads needed Instagram or a login.

## Summary

**New: 32 rides. 14 high confidence, 18 medium.** The target was about 30.

By city (the ride's own start town):

- Long Beach: 7
- Ventura: 5
- Pasadena: 5
- Santa Monica: 4
- Los Angeles: 4 (Lunch Rush in San Pedro, the Wheelmen's Ballona Creek ride, CicLAvia, SFVBC's Monday ride)
- Thousand Oaks: 2
- Redondo Beach: 2
- Westlake Village: 1
- Manhattan Beach: 1
- South Pasadena: 1

By host: Conejo Valley Cyclists 3, Beach Cities Cycling Club 3, Channel Islands Bicycle Club 3, La Grange 3, Big Orange 3, Foothill Cycle Club 3, BikeVC 2, PAA Cycling Club 2, Lightning Velo 2, and one each for Los Angeles Wheelmen, CicLAvia, SFVBC, Incycle Pasadena, Sports Basement Long Beach, SunDazies, Two Wheels One Love and Northside Long Beach Ride Club.

By day: Sunday 12, Saturday 8, Thursday 5, Tuesday 4, Monday 3, Friday 2, Wednesday 2 (rides on two days count twice). Road 28, social 9, mixed 3. One open-streets event (CicLAvia).

**Re-checked: 22 of 24 existing rides.** 18 confirmed, 4 changed, 0 seasonal-break, paused or ended. 2 couldn't be re-checked.

**Who is in and who isn't.** Two new rides are women / trans / femme / nonbinary rides in the host's own words (PAA Women on Wheels, SunDazies). Seven are no-drop in the host's words. **No new LGBTQ-focused ride made it in.** The two queer groups I found, Queercicle in Long Beach and Different Spokes, have nothing dated that I can prove (see "Couldn't re-check").

**Where the gaps are.** Silver Lake, Echo Park, Downtown, the Eastside, Culver City, Venice, Malibu, Glendale, Burbank, Altadena, Santa Clarita, Ojai and Oxnard have zero or one ride each. Most rides in those places live on Instagram, Facebook or sites that block robots. The Eastside Bike Club's Meetup feed is empty. Santa Clarita Velo and Old Kranks return a bot wall. Long Beach, Ventura, the South Bay and the Conejo Valley are covered because their clubs publish calendars that load.

## For the editor

- **Apply `upkeep.json` first.** Lightning Velo's Saturday ride moves to `days: ["sat"]` (the Sunday ride is now a separate new record). The dry merge of `ca-la.json` passes either way, because the names differ, but applying upkeep first keeps the Saturday record from claiming Sunday. Read-only check: `node tools/merge-ride-research.js research/rides/deep/ca-la/ca-la.json --dry --today 2026-10-01` gives "accepted 32: US-CA 32".
- **Lightning Velo Saturday time moves.** The club's Meetup feed says 7:30 am through October, and the home page says 8:00 am in standard time. The upkeep entry carries `start_times` from 2026-11-01 (DST ends Sun Nov 1).
- **Venice Electric Light Parade is not a monthly Saturday.** The existing record's page says every Sunday at sunset (Windward Plaza, 1501 Ocean Front Walk). Ventura's parade, in the new file, is a different event: BikeVC, a Saturday once a month, one hour before sunset.
- **La Grange Women's Ride.** The rides page says second Saturday, but the club's Strava posts show the third. I confirmed it and left the rule alone. Worth a look by a person.
- **The Foothill Cycle Club page is old.** Its only date is a Last-Modified header of Jan 9, 2026. That is why those three are medium. Re-check them first.
- **Conejo Valley Cyclists' October start times disagree.** The club's schedule page and the weekly announcement differ. I used the dated announcement (8:00 and 8:30) and wrote the conflict into `visitor_notes` and the refresh notes. No `start_times` entry.
- **Records with no `last_seen`.** NOW Ride, Lunch Rush, Hughes Park crit practice and SFVBC's Monday ride come from pages with a 2026 footer and no date. I left `last_seen` empty rather than invent one. Evidence says "2026".
- **No start address on purpose.** PAA's two rides, SunDazies and CicLAvia change their start each time. The Foothill rides give street corners, not addresses. Don't geocode any of them as a fixed start.
- **Los Angeles Wheelmen's site footer carries injected spam links.** Used the ride text only.
- **Bike Long Beach's calendar is a Google Calendar.** It is a secondary source, so rides proven only by it are medium (Two Wheels One Love, Northside Long Beach Ride Club).
- **Hand-offs to ca-south (Orange County):** The Unlikely Cyclist women's rides in Irvine and Seal Beach; Big Orange Food Park Saturday ride (Sat 7:00 am, 347 Main St, Seal Beach). Lightning Velo's rides end at a Seal Beach cafe but start in Long Beach.
- No personal names, emails or phone numbers are in any file.

## Why these

Conejo Valley Cyclists (Westlake Village and Thousand Oaks). The club posts every week's routes on a public announce archive, so these three are high.

- **Saturday Rides.** The club's big Saturday from The Landing in Westlake Village, 8:00 am. Five groups, from a 20-mile no-drop Mellow Yellow loop to 50 to 60 hilly miles.
- **Sunday Social Ride.** No-drop, 20+ miles at 13 mph or better, 8:30 am from the Agoura Road shopping center.
- **Tuesday and Thursday Rides.** Weekday mornings, 8:30 am, a new route each week, about 31 to 33 miles.

Beach Cities Cycling Club (South Bay). Its Weekly Activities page and ride calendar are both current.

- **Saturday All Levels Rides.** Four levels leave Redondo at 8 am. Level 4 is the beginner, get-in-shape ride, so this is where a new South Bay rider starts.
- **Sunday FunDay Whale Watch.** Irregular. Flat-ish, no-drop ride up the Palos Verdes coast with a stop at Point Vicente.
- **Thursday Social to Marina del Rey.** 9:00 am from the Manhattan Beach Pier, with coffee in Hermosa.

Channel Islands Bicycle Club (Ventura). A Wild Apricot calendar a robot can re-read.

- **Saturday Up the Pacific Coast.** 8:00 am, about 47 fast miles to Carpinteria, Summerland and Montecito. Guests sign a waiver first.
- **Saturday Montecito and Summerland.** 8:30 am, same lot, pick 37, 44 or 54 miles.
- **Sunday Canyon to Canyon.** 8:00 am from Hobert Park, 32 miles through Aliso and Wheeler Canyons to Santa Paula.

BikeVC (Ventura). Meetup feed, dated.

- **Ventura Electric Light Parade.** Monthly, one hour before sunset, from the Ventura Pier. Free and all bikes welcome.
- **Sunday Morning Coffee Ride.** Monthly, easy and no-drop, with coffee and a quick bike check first.

Velo Club La Grange (Santa Monica). Medium: the club's weekly rides page was edited Jan 30, 2026.

- **Marina Ride.** Tuesday 6:30 am, 26 miles in a double paceline.
- **Amalfi Loops.** Thursday 6:30 am, three laps of the Amalfi climb at race pace.
- **Marina Lite.** Friday 6:30 am, the club's shorter recovery ride, and where the club tells novices to start.

Big Orange local-rides page (medium, 2026 footer, no date).

- **NOW Ride.** Saturday 7:15 am from Montana Ave in Santa Monica to Trancas. Not organized: you show up and ride.
- **Lunch Rush.** Wednesday and Friday at noon in San Pedro, 16 laps of a circuit.
- **Hughes Park Beginner Crit Practice.** Monday 7 pm in Long Beach. Big Orange says new racers start here.

Other Los Angeles County rides.

- **Triple Dipper (Los Angeles Wheelmen).** Thursday 8:30 am from the Ballona Creek Bridge, 40 to 50 miles around Palos Verdes. Medium: the page's upcoming rides list is current but undated.
- **CicLAvia: Heart of LA.** Open streets, Sun Oct 11, 2026, 6.5 miles through Downtown, Chinatown, Little Tokyo, the Arts District, Boyle Heights and Echo Park. Free, join anywhere. High: the host's own page.
- **Monday Ride to Simi Valley (SFVBC).** Ride 801B, 8:30 am, over Santa Susana Pass. Medium.
- **Club Supported Ride (PAA Cycling Club).** Monthly supported ride with SAG and lunch. October is Cloudburst Summit on Sat Oct 10.
- **Women on Wheels (PAA Cycling Club).** Last Sunday of the month, no-drop, women only, Intermediate and Advanced groups.
- **Sunday No-Drop Ride (Incycle Pasadena).** 7:30 am from the shop lot. Medium: the shop's Strava club description is the only listing and has no dated posts.

Long Beach.

- **Sports Basement Long Beach Group Ride.** 2nd and 4th Saturday, no-drop, meet 7:30 and roll 8:00. High: its Strava club posted Sept 10 and Sept 20.
- **SunDazies Sunday Ride.** Monthly, for femme, trans, women and nonbinary riders. Next is a witch-themed ride on Oct 25.
- **Lightning Velo Sunday Ride.** 8:00 am, four groups, B and C no-drop. High.
- **Lightning Velo Tuesday and Thursday PTF Ride.** 8:00 am, 33 miles on the San Gabriel River Trail. Medium.
- **Two Wheels One Love.** Monday 6:45 pm from Orizaba Park, 15 to 20 casual miles.
- **Northside Long Beach Ride Club.** Wednesday 7 pm from Houghton Park, about 10 casual miles.

Foothill Cycle Club of San Gabriel Valley (medium, undated page).

- **Sunday Easy Ride.** 8:00 am, Hill and San Pasqual near Caltech, under 20 miles, breakfast somewhere new each week.
- **Sunday Moderate Ride.** 8:00 am from Victory Park, about 40 miles, longer on the last Sunday.
- **Tuesday Morning Ride.** 8:30 am from Kaldi coffee in South Pasadena, about 25 miles with coffee in Sierra Madre.

## Where rides are posted here

**Strava clubs with posts a robot can read:**

- Sports Basement Long Beach Ride Group: `https://www.strava.com/clubs/SBLBridegroup`
- SunDazies (FTWNB): `https://www.strava.com/clubs/1090056`
- Incycle Pasadena: `https://www.strava.com/clubs/incycle-pasadena-183270`
- Foo Chow (Incycle's Monday ride): `https://www.strava.com/clubs/315899`
- La Grange: posts the women's ride a few days ahead.
- Queercicle: `https://www.strava.com/clubs/queercicle` (description only, no dated posts)

**Club calendars that load:**

- Channel Islands Bicycle Club: Wild Apricot, `https://www.cibike.org/Events-Calendar`
- Beach Cities Cycling Club: Wild Apricot, `https://www.bcccsb.org/Ride-Calendar`
- PAA Cycling Club: ClubExpress, `https://paacycling.net`
- Conejo Valley Cyclists: weekly announce archive, `https://mail.cvcbike.org/archives/list/announce@mail.cvcbike.org/`
- Los Angeles Wheelmen: Upcoming Rides page
- SFVBC: home page lists the next rides
- Big Orange: `https://www.bigorangecycling.org/local-rides` and `/more-local-rides`
- La Grange: Squarespace pages, `https://www.lagrange.org/rides`

**Feeds a robot can re-read:**

- BikeVC Meetup: `https://www.meetup.com/bikeventura/events/ical/`
- Lightning Velo Meetup: `https://www.meetup.com/Lightning-Velo-Cycling-Club/events/ical/`
- Long Beach Bicycling Meetup, Easy Rider Meetup
- Bike Long Beach community calendar (public Google ICS), `https://www.bikelb.com/calendar/`. It carries the Instagram-run neighborhood rides, and many rides below.

**Not readable:** Instagram-run ride clubs (most of Long Beach, the Eastside, the Valley), Facebook groups, and Cloudflare-fronted sites.

## Re-checked

18 confirmed, 4 changed. Full entries in `upkeep.json`.

- **Bikes and Coffee (Bike Long Beach):** confirmed. Last Sunday, roll 10:00, calendar agrees.
- **Lightning Velo Saturday Ride:** changed. Days now Saturday only; 7:30 am on the Meetup feed, 8:00 am from Nov 1. The Sunday ride is a separate new record.
- **Long Beach Bicycling Meetup Wednesday Ride:** confirmed. Oct 7 and Oct 14 posted.
- **La Grange Women's Ride:** confirmed. Posted July 7 for Sat July 18. Note the 2nd-versus-3rd Saturday mismatch above.
- **Nichols Canyon Ride (La Grange):** changed. The page says Sunday at 8, not Saturday.
- **SFVBC Saturday Club Ride:** confirmed. Oct 3, 4, 17, 24 listed.
- **Venice Electric Light Parade:** changed. Every Sunday at sunset, Windward Plaza, 1501 Ocean Front Walk.
- **FOO CHOW Ride:** changed. Now Monday, meet 6:00, roll 6:30. Incycle's page still shows the old 1st and 3rd Tuesday.
- **Friday Java Ride (BCCC):** confirmed. Weekly Activities page revised July 15, 2026.
- **BikeVC Brew Ride:** confirmed. Sun Oct 11, 1:00 pm on Meetup.
- **Easy Rider Community Ride:** confirmed. Oct 4 and Oct 18, 9:00 am.
- **LA Wheelmen Sunday Ride:** confirmed. Oct 4 and Oct 11 listed.
- **Los Angeles Critical Mass:** confirmed. Last Friday, roll 7:29 pm.
- **Big Orange Team Ride, New Pier Ride, Major Taylor (Westchester Parkway), Wheatgrass Ride, Big Orange Club Ride, Friendly Donut Ride, The Donut Ride, Telo:** all confirmed against Big Orange's local-rides page (2026 footer). Major Taylor and Telo are daylight-saving hours only, so ask after Nov 1.
- **Gravel Wednesday (La Grange):** confirmed. Weekly Rides page edited Jan 30, 2026.

## Couldn't re-check

- **C U Next Tuesday (Queercicle).** Strava club description says "every Tuesday, and sometimes on other days", Long Beach, coffee after. No dated posts. Bike Long Beach's calendar shows Tuesday 8:00 at Ubuntu cafe, 335 Nieto Ave, but that is a secondary source and says nothing the host dated. Not confirmed.
- **Different Spokes Sunday Ride.** The club's calendar feed stops after May 31, 2026. Nothing newer.

## Rejected

- **Old Strava events, 2018 to 2024.** Several Los Angeles club pages show only dead events. Seen Oct 1.
- **Grim Riders.** One-off Sept 5, 2026, not a recurring ride.
- **Ventura County Road Riders (VCRR).** Last post 2017.
- **Altadena Heritage ride.** Last seen 2022.
- **Rapha LA Social Saturdays.** Rapha Cycling Club members only, and only September 2026 shown. The events page returns 403.
- **Marina Del Rey Cycle Club.** Suspended.
- **Serious Cycling.** Shut down.
- **Dockriders.** Suspended.
- **Velo Allegro.** `/club-rides` is a 404; `/rides` and `/calendar` have no day or time.
- **Girlz Gone Riding.** Mountain bike, Facebook-based.
- **Mybike LA Strava club.** No schedule. The "Rides schedule" link opens an Instagram chat.
- **Palos Verdes Bicycle Club.** The Ride Schedules page (Last-Modified May 6, 2026) says only "Sunday Rides, Weekly, TBA" and to email the club. No day, time or start.
- **La Grange Mandeville.** Skipped for the 3-per-host cap, and it overlaps Gravel Wednesday.
- **SFVBC first Saturday.** Already in the existing record.
- **BCCC Tuesday Explorer.** Not on the October calendar.
- **Moonlight Mash.** Days vary with the full moon.
- **Dead sites:** Major Taylor Cycling Club LA (no response), vcglendale.com, peninsulacc.com, wlacyclingclub.com, cranknstein.com, shiftinggearscycling.com, Delta Pedalers (Northern California).

## Couldn't confirm

For a local rider to check by hand. Nothing here is in the JSON.

| Name | Host | Day and time | Start | Where seen | URL or handle |
|---|---|---|---|---|---|
| C U Next Tuesday (Queer WTFNB and allies, coffee after) | Queercicle | Tuesday, 8:00 am | Ubuntu cafe, 335 Nieto Ave, Long Beach | Strava club description, Bike LB calendar | `https://www.strava.com/clubs/queercicle`, `https://www.longbeachbikerides.com/` |
| Different Spokes Sunday Ride (LGBT club) | Different Spokes Southern California | Sunday, 8:00 am | Not on site | Club site, calendar feed lapsed May 31, 2026 | `https://www.differentspokes.com/` |
| Major Taylor Cycling Club LA, no-drop rides | Major Taylor Cycling Club LA | Unknown | Unknown | Ride calendar page does not load; Instagram only | `majortaylorcyclingclubla.org`, Instagram |
| Ridewitus LA group rides | Ridewitus | Tuesday and Thursday, 6:15 pm | Unknown | LA Bicycle Advisory Committee directory only; the shop's own group-rides page has no days | `https://ridewitus.com/pages/group-rides` |
| Ventura Cycling Club Tuesday Group Ride | Ventura Cycling Club | Tuesday, roll 5:00 pm (warm up 4:45), no-drop | Alternates Faria Camp and Cañada Larga | Undated community page; Strava club has no dated posts; its Meetup feed is empty | `https://www.venturacycling.com/articles/community-pg219.htm`, `https://www.strava.com/clubs/venturacycling` |
| Ventura Coffee Ride | Ventura Coffee Ride | Unknown | Unknown | Instagram only | `@venturacoffeeride` |
| Santa Clarita Velo | Santa Clarita Velo | Unknown | Unknown | Site returns 403 | `https://www.santaclaritavelo.org/events/` |
| Old Kranks ride schedules | Old Kranks | Unknown | Unknown | Site returns a bot-wall 202 | `https://oldkranks.net/ride-schedules` |
| Mybike LA Burbank rides | Mybike LA | Unknown | Burbank | Shop's blog guide and an Instagram chat link only | `https://mybike.la/blogs/news/your-ultimate-guide-to-group-rides-in-los-angeles-where-to-find-your-pack-in-2026` |
| Girlz Gone Riding, LA chapter | Girlz Gone Riding | Unknown | Unknown | Facebook-based | `https://www.girlzgoneriding.com/` |
| Rapha LA Social Saturdays | Rapha | Saturday | Unknown | 403, members only | `https://events.rapha.cc/products/rapha-la-social-saturdays` |
| VFIXII | Bike LB calendar | Wednesday, 7:30 pm | E 4th St and Cherry Ave, Long Beach | Calendar entry edited Feb 19, 2026 | `https://www.bikelb.com/calendar/` |
| LB Cannonball Run | Bike LB calendar | Most Tuesdays, 7:00 pm | Valparaiso Plaza, Long Beach | Calendar says check Instagram | `https://www.bikelb.com/calendar/` |
| Thursday Squad with Long Beach Riding Club | Bike LB calendar | Thursday, 5:45 pm | Liberty Park, Cerritos | Calendar entry only | `https://www.bikelb.com/calendar/` |
| Kidical Mass | Bike LB calendar | Monthly family ride | Pixie Toys, 3914 Atlantic Ave, Long Beach | Calendar entry only | `https://www.bikelb.com/calendar/` |
| The People's Ride LA | Bike LB calendar | Last Friday, 6:00 pm meet, 6:30 roll | Hollywood and Vermont | Calendar entry only | `https://www.bikelb.com/calendar/` |
| Lbians ride | Bike LB calendar | One-off | Good Time Coffee, 2122 E 4th St, Long Beach | Calendar entry, queer, but a single date | `https://www.bikelb.com/calendar/` |

**Most promising to chase first:** Queercicle (queer, weekly, Long Beach), Ventura Cycling Club's no-drop Tuesday (a real weekly ride on a club page, only lacking a date), and Major Taylor Cycling Club LA (a BIPOC-focused club, with no readable schedule).

## Stats

- New rides: 32 (14 high, 18 medium). Low-confidence: 0.
- Existing rides re-checked: 22 of 24 (18 confirmed, 4 changed, 0 seasonal-break, 0 paused, 0 ended). 2 couldn't be re-checked.
- Fetches: about 120 of 150.
- Hosts: 17. Maximum per host: 3.
- Maximum per city: 7 (Long Beach), under the 12 cap.
- Women / trans / femme / nonbinary: 2. No-drop in the host's words: 7. LGBTQ-focused: 0. BIPOC-focused: 0.
- Dry merge: accepted 32, rejected 0.

## Sources

- Conejo Valley Cyclists: `https://www.cvcbike.org/general-ride-schedule.html`, `https://mail.cvcbike.org/archives/list/announce@mail.cvcbike.org/`
- Beach Cities Cycling Club: `https://www.bcccsb.org/Weekly-Activities-Description`, `https://www.bcccsb.org/Ride-Calendar`, `https://www.bcccsb.org/Ride-Start-Locations-Join-Us-Page`
- Channel Islands Bicycle Club: `https://www.cibike.org/Events-Calendar`
- BikeVC: `https://www.meetup.com/bikeventura/events/ical/`
- Velo Club La Grange: `https://www.lagrange.org/rides`, `/marina-tues`, `/riviera`, `/marinafri`
- Big Orange: `https://www.bigorangecycling.org/local-rides`, `https://www.bigorangecycling.org/more-local-rides`
- Los Angeles Wheelmen: `https://www.lawheelmen.org/upcoming-rides/`
- CicLAvia: `https://www.ciclavia.org/`
- SFVBC: `https://sfvbc.org/index.php/ride-descriptions/general-info/`
- PAA Cycling Club: `https://paacycling.net/content.aspx?page_id=22&club_id=45054&module_id=327432`, `...&module_id=449879`, `https://paacycling.net/content.aspx?page_id=4002&club_id=45054`
- Strava: `https://www.strava.com/clubs/incycle-pasadena-183270`, `.../clubs/SBLBridegroup`, `.../clubs/1090056`, `.../clubs/315899`, `.../clubs/queercicle`, `.../clubs/venturacycling`, `.../clubs/mybike`
- Lightning Velo: `https://www.lightningvelo.org/`, `https://www.meetup.com/Lightning-Velo-Cycling-Club/events/ical/`
- Bike Long Beach: `https://www.bikelb.com/calendar/` and its public Google ICS
- Foothill Cycle Club: `http://www.foothillcycle.org/schedule.html`
- Palos Verdes Bicycle Club: `https://pvbikeclub.net/ride-schedules.html`
- Ventura Cycling Club: `https://www.venturacycling.com/articles/community-pg219.htm`
- Leads only, never a source: LA Bicycle Advisory Committee club directory, Mybike LA's 2026 group-ride guide.
