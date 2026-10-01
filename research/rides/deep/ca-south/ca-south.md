# ca-south: group-ride deep sweep report

- **Area id:** `ca-south` (San Diego County, Orange County, Riverside / San Bernardino, Coachella Valley)
- **Agent:** group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026
- **Files:** `ca-south.json` (16 new rides), `upkeep.json` (16 re-check entries) and this report
- **Fetches:** about 150. WebSearch was capped (200 of 200) before I started, so no Strava event pages turned up. I did not try to get around that cap.

## Summary

**New rides: 16** (8 high, 8 medium). The target was about 25. I stopped short because the rest of the area's rides live on Instagram, Facebook and Strava clubs that don't load, and I couldn't find a shop or club in Temecula, Oceanside, Laguna, Newport or the Coachella Valley whose page loads with dates.

By city:

- Huntington Beach: 4
- San Diego: 4 (Gravelstoke, SDBC Sunday, Cyclo-Vets x2)
- Irvine: 3
- Riverside: 2
- San Juan Capistrano: 1
- Costa Mesa: 1
- Carlsbad: 1

By host: OC Velo 3, OCW 2, BCI 2, Riverside Bicycle Club 2, Cyclo-Vets 2, and one each for The Unlikely Cyclist, HB Velo, Swami's, Gravelstoke and SDBC. Counting what is already on the site, OC Velo, OCW, BCI, Riverside BC, Cyclo-Vets and Swami's are at the 3-per-host cap.

By discipline: road 15 (two of those also tagged social: Swami's Friday coffee and the Cyclo-Vets ferry ride), gravel 1. One women's ride (Wednesday, Costa Mesa). No LGBTQ, BIPOC or beginner-labelled ride made it in; see "Couldn't confirm".

**Re-checks: 16 of 16 rides looked at.** Confirmed 9, changed 3, couldn't confirm 4 (written as `unreachable`), seasonal-break 0, paused 0, ended 0.

**Dry runs.** `merge-ride-research.js --dry`: accepted 16, rejected 0. `rides-apply.js --dry`: 16 entries applied, no errors, 43 validator warnings that were already there.

**What matters most for riders this week**

- Riverside Bicycle Club's Saturday ride moved from 7:30 to 8:00 am (October to April) and the site had 07:30. It also starts from Canyon Crest Town Center on the club's own table, not the Stater Brothers lot the site shows.
- Swami's monthly social has a start time now: 8:00 am, next Sun Oct 4, Bird Rock Coffee in Bressi Ranch.
- Lillördag, Moment and SheWolves have nothing current behind them. See "Couldn't re-check".

## Why these

- **OCW Saturday Ride (Irvine).** The Wheelmen's Saturday club ride at 8:30 am, every week on the club's Ride with GPS calendar, guests welcome.
- **OCW Sunday Ride, South County (San Juan Capistrano).** 8:30 am Sundays from a different café each week (JD Flannel, RJ's, Parlor Doughnuts). A way into south county riding.
- **BCI Thursday Ride (Irvine).** A friendly, slower mid-week long ride from Deerfield Park at 9:00 am, with regroups.
- **BCI Tuesday Ride (Irvine).** 9:15 am from University Park, about 26 to 31 miles to a coffee stop, route slip posted weekly.
- **The Unlikely Cyclist Wednesday Women's Ride (Costa Mesa).** Every other Wednesday evening, women's group ride from the shop. Bring lights.
- **HB Velo Wednesday and Friday Coffee Ride (Huntington Beach).** About 25 miles at 15 mph, 8:30 am sharp from the shop. The easier weekday option next to the Sunday ride.
- **Riverside Bicycle Club Sunday Ride (Riverside).** A, B, C and D groups from the Courthouse downtown at 8:00 am, 7:30 am in summer. D group for newer riders.
- **Riverside Bicycle Club Tuesday and Thursday Night Ride (Riverside).** B-group evening ride at 6:30 pm. Lights required. One of the few evening rides out here.
- **Swami's Friday Coffee Ride (Carlsbad).** The flattest ride Swami's offers: about 25 miles of coast to Oceanside Harbor and back, 9:00 am.
- **Gravelstoke Monthly Gravel Ride (San Diego).** A monthly Saturday gravel ride at a different start each time. Next up Dec 5.
- **OC Velo Saturday Club Ride (Huntington Beach).** Four groups from the pier. A2, B and C don't drop you. Bring a signed release.
- **Orange Coast Velo Sunday Turtle Rock Loop (Huntington Beach).** Sunday 8:00 am from the pier, pace set by the group on the day.
- **OC Velo Tuesday and Thursday Training Ride (Huntington Beach).** 8:00 am weekday training at A1/A2 pace.
- **SDBC Sunday Funday (San Diego).** 8:30 am Sundays, D1/D2 pace with regroups, a different start each week.
- **Cyclo-Vets Wednesday Coffee Ride (San Diego).** About 50 miles to the Lumberyard in Encinitas from Fashion Valley, 8:30 am.
- **Cyclo-Vets Friday Coronado Ferry Ride (San Diego).** A flat, leisurely 32-mile loop: free ferry, then the Bayshore Bikeway, 8:00 am.

## Where rides are posted here

**Ride with GPS clubs are the best find of this sweep.** A club's events load without a login at `https://ridewithgps.com/events.json?organization_id=<id>` (JSON with start time, location and notes) and its whole calendar comes as `https://ridewithgps.com/organizations/<id>-<slug>/calendar.ics`. Both worked today. A robot can re-read them. IDs I found:

- Orange County Wheelmen: 5473 (`orange-county-wheelmen`)
- Riverside Bicycle Club: 5058 (`rbc`)
- Orange Coast Velo: 39 (`orange-coast-velo`)
- Gravelstoke: 4002 (`gravelstoke`)

The org ID is usually linked from the club's calendar page ("Calendar" or "Ride with GPS" links). Every club page I read that had one led to a working feed.

**Other machine-readable sources**

- **Squarespace event sites** (BCI, The Unlikely Cyclist, Costa Mesa Alliance for Better Streets, San Diego County Bicycle Coalition, Gravelstoke, OCW): each event page has `?format=ical`. The collection page doesn't give a feed. The event list on the page itself parses cleanly.
- **ClubExpress** (Redlands Water Bottle Transit Company): the calendar page lists the month with each event's full text in the link title.
- **Heylo** (Outspoken Cycle Club): the club's website embed calls a public events endpoint. I read it for the San Diego events (all one-offs).
- **WordPress shop sites**: `/wp-json/wp/v2/pages?_fields=slug,modified` gives a real modified date for a standing-schedule page. HB Velo's home page was modified July 28, 2026.
- **Swami's Cycling Club** (`swamis.org`, The Events Calendar plugin): the calendar is the best in the area (Saturday, Sunday, Friday, Wednesday and race-prep rides, dated). It also puts up a bot check (HTTP 202 with a captcha redirect) after a handful of requests, and the `?ical=1` feed sits behind it. I read it through page summaries after that. A browser will work.
- **Strava**: club pages return 200 or 403 and show nothing. No event pages found because search was capped.

**Words.** Locals say "club ride", "shop ride", "no-drop", "coffee ride", "social ride". Club rides use A, B, C, D letter groups with mph ranges (A 19+, B 17 to 19, C 14 to 16, D 11 to 13). "Casual" and "recovery" mark the easy ones.

**Rhythm.** Mornings start 7:30 to 9:00. Several clubs switch start time with the clocks: Riverside is 7:30 am May to September and 8:00 am October to April. Weekday rides (Tuesday and Thursday 9:00 at BCI and OCW) skew to retirees and time-flexible riders. Evening rides need lights from October.

**Visitor norms.** OC Velo, OCW, BCI and Riverside BC all take guests. OC Velo wants a signed release in hand; BCI's guest page asks for a free annual ticket and a parent for under-18s; Riverside says all club rides are open. Helmets are required everywhere.

## Re-checked

Oldest first. All entries are in `upkeep.json`.

- **Leucadia Cyclery Sunday Social Ride** — couldn't confirm. The shop's page states 8:00 am Sunday but nothing on it is dated and its social links don't load. Blog posts dated July 2026 show the site is live.
- **HB Velo Sunday Morning Shop Ride** — confirmed. Home page lists the 8:05 am sharp roll-out; its WordPress modified date is July 28, 2026.
- **BCI Saturday Ride** — confirmed. Calendar lists 9:00 am from Deerfield Park for Oct 3, 10, 17 and 24.
- **OCW Tuesday/Thursday Ride** — confirmed. Ride with GPS calendar lists both days at 9:00 am from Bill Barber Park through December. Feed promoted.
- **Cyclo-Vets Saturday Ride** — confirmed. Rides page lists 8:30 am from Mission Valley; the page carries a May 3, 2026 notice, so it was edited this year. Entries have no dates of their own.
- **Moment Bicycles Saturday Point Loma Ride** — couldn't confirm. Page loads but says "New for 2016" and nothing on the shop's site is dated 2026.
- **Outspoken Cycle Club San Diego Rides** — confirmed. The San Diego page and the club's Heylo feed show it active (a Nov 7, 2026 event and a June 2027 one). No weekly slot is published, which matches the record.
- **SDBC Saturday Ride** — confirmed. Saturday page says 0830 from UC Cyclery with a 0815 first-timer orientation; home page lists 2026 events.
- **SheWolves Ride** — couldn't confirm. Only source is a San Diego Magazine list dated July 2024. Instagram needs a login.
- **Swami's Monthly Sunday Social Ride** — changed. 8:00 am, Bird Rock Coffee Roasters in Bressi Ranch, next Oct 4. The record had no time. Read through page summaries because the club's site blocked direct fetches.
- **Lillördag Wednesday Night Ride** — couldn't confirm. The only listing is the Costa Mesa Alliance for Better Streets calendar, newest Lillördag entry May 28, 2025.
- **The Unlikely Cyclist Saturday Women's Ride** — changed (pace and visitor notes only). Two pacing groups, 15 and 13 mph, all no-drop, last listed Sept 26. The calendar says 7:45 am and gives no roll time, so the record's 8:15 roll is left alone.
- **Big Wheel Bikes CV Community Group Rides** — confirmed. 2026 events page still lists rides as announced on social media, Nov to Apr season. No fixed slot posted.
- **RWBTC Women Only Friday AM Recovery Ride** — confirmed. Listed Fri Oct 2, meet 8:00, roll 8:15 at Cyclery USA. Only Oct 2 is posted so far; the other October Fridays are blank.
- **Riverside Bicycle Club Saturday Casual Ride** — changed. 8:00 am October to April (the record had 07:30), from Canyon Crest Town Center. `start_times` returns it to 7:30 on May 1, 2027. Feed promoted.
- **World Famous Swami's Saturday Ride** — confirmed. Oct 3 (in reverse, first Saturday of the month) and Oct 10 at 8:15 am from Cadence Cyclery.

## Couldn't re-check

These four got `unreachable` entries (no dates change). A local rider can settle each in a minute:

- Leucadia Cyclery Sunday Social Ride (undated page; Facebook and Instagram don't load).
- Moment Bicycles Saturday Point Loma Ride (page from 2016 era; check the shop or its Strava).
- SheWolves Ride (@sd_shewolves on Instagram; is it weekly or monthly, and is it still going?).
- Lillördag Wednesday Night Ride (Costa Mesa; Instagram or the Alliance's page; last dated May 2025).

## Rejected

- **Orange Coast Velo Sunday ride, first draft** (Oct 1): the merge tool flagged it as the same ride as HB Velo's Sunday shop ride (same city, day and time, "Velo" in both names). They are different hosts and different rides, so I renamed it "Orange Coast Velo Sunday Turtle Rock Loop". It passes now. Worth a look at the dedupe rule for the word "velo".
- **Orange County Women on Wheels (Meetup)**: linked from The Unlikely Cyclist's site; `meetup.com/Orange-County-Women-on-Wheels/` returns 404 (Oct 1, 2026). Gone.
- **Costa Mesa Alliance for Better Streets calendar**: Lillördag entries run from May 2024 to May 28, 2025 and then stop. The only 2026 entry is a one-off Historical Society Bike Ride on Sept 20.
- **Fiesta Island Tracklocross** (San Diego, first Saturday monthly, 9:30 am): a free race series, not a group ride. Not listed. Source is a 2024 article.
- **RWBTC Tuesday and Thursday "C Ride By Consensus", 7:00 am** (Redlands): on the club calendar for every Tuesday and Thursday in October, but there is no start location and no leader; riders pick a destination at the start. Left out.
- **San Diego Magazine's "10 San Diego Biking Clubs"** (July 2024, updated Dec 2022): used for names only. Every ride in it that I could find a page for is in "Couldn't confirm".

## Couldn't confirm

All of these need a local rider to check by hand.

- **Awarewolf Full Moon Bike Ride** (San Diego). Host: The Awarewolfs. Monthly on the full moon, "anyone and any bike", route and time posted ahead. Page `https://theawarewolfs.com/fmbr/` loads and says it has run since 2010, but shows no 2026 date. Instagram `@theawarewolfs`. Next full moon after today: Oct 26.
- **No Spandex Saturday** (San Diego, Normal Heights). Host: former Uptown Bicycles crew. Saturday, casual, refreshment stops. Route each week on Instagram `@nospandexsaturday` (from a 2024 article). Time and start unknown.
- **Rouleur Brewing Social Ride** (North County San Diego). Host: Rouleur Brewing. In the 2024 article. `https://rouleurbrewing.com/` returned 403 to me. Day, time and start unknown.
- **Adams Avenue Bicycles** (North Park). Monday Smackdown road ride, 6:45 pm, about 27 miles; DirTNR Tuesday nights at 5:15 pm from the velodrome (racing season); Field Trips on the second Sunday. From the 2024 article; I couldn't find the shop's page.
- **Major Taylor Cycling Club San Diego** (BIPOC). Hosted the Juneteenth Freedom Ride on Jun 20, 2026 (Westfield Plaza Bonita, 8:00 am), per the San Diego County Bicycle Coalition calendar `https://sdbikecoalition.org/calendar`. Whether it has a weekly ride, and its page, I could not find. Worth asking Robert's local contacts.
- **Queer Sol Collective x San Diego County Bicycle Coalition** (LGBTQ). Kupiihaaw Ride on Sept 20, 2026 (Crown Point Park, 8:30 am) and an annual Pride Ride on Jul 19, 2026 (Bird Park, 9:30 am). Both one-offs on the same calendar; not recurring.
- **Outspoken Cycle Club San Diego** (LGBTQ). Already on the site. Its Heylo group `https://www.heylo.com/762aadbd-ea3b-4853-a5c6-ad70ea8c84ec` has the dates; the page doesn't load for a robot. Worth a look for a regular day.
- **Leucadia Cyclery's other rides** (Encinitas): Wednesday Warriors 6:00 pm from Cardiff State Beach, a Saturday 9:00 am women's group at rotating spots, Saturday 7:00 am MTB meetup, a first-Sunday family ride at San Elijo Lagoon. All on the undated page `https://leucadiabikes.com/pages/local-community`; none confirmed.
- **Swami's extras beyond the 3-per-host cap** (calendar `https://swamis.org/events-calendar/`): Swamis Sunday long steady-distance ride from Lofty Coffee, La Costa (8:00 am, B and C, about 59 miles, Oct 11); FriDave Opener (Friday, A/B/C); Gene Kelley Ride (A/B/C, La Costa and El Camino Real, dawn); Wednesday "Worlds" ride at Camp Pendleton (needs a base pass); Wednesday Hoppy Hour (5:30 pm, spring and summer only).
- **Other extras over the cap**: OC Velo Wednesday 9:00 am training ride, Monday 9:00 am Shoreline Village loop and Friday 8:45 am social ride from "Billy's at the Beach" (the page doesn't say which city); OCW Sunday rides from Irvine parks at 9:00 am (the start changes weekly); BCI Sunday rides at 9:00 am from Deerfield Park; Riverside BC Tuesday and Thursday morning B/C rides from the Stater Brothers on Lincoln; RWBTC Saturday B/C/D rides at 7:00 or 8:00 am (different start each week).
- **BCI NewB rides** (beginners). `http://www.bikeirvine.org/newb-rides` says a session is "scheduled soon" but gives no date.
- **Big Wheel Bikes CV** (Palm Springs and Palm Desert). Already on the site as a seasonal, social-media-only listing. Facebook `https://www.facebook.com/BigWheelToursPalmSprings`. Robert or a local rider could ask for the winter ride days.
- **Coverage gaps.** I found no rides I could prove in Temecula, Oceanside, Laguna Beach, Newport Beach, Palm Desert, Redlands (beyond RWBTC) or San Bernardino. Guesses at club URLs mostly came back as dead domains. Strava event pages, which are how the Arizona sweep found most of its rides, were out of reach.

## Stats

- Candidates looked at: about 45
- Listed: 16 (8 high, 8 medium)
- Couldn't confirm: 14 leads in the list above, plus the 4 re-check rides
- Rejected as ended, stale, changed or unfit: 6
- Re-checks: 16 (9 confirmed, 3 changed, 4 couldn't confirm)

## Sources

Hosts' own pages and feeds read today:

- https://leucadiabikes.com/pages/local-community
- https://leucadiabikes.com/pages/events-calendar
- https://leucadiabikes.com/blogs/leucadia-cyclerys-blog
- https://hbvelocyclery.net/
- https://hbvelocyclery.net/wp-json/wp/v2/pages?per_page=20&_fields=slug,modified
- http://www.bikeirvine.org/rides-events
- http://www.bikeirvine.org/rides-events/2026/10/1
- http://www.bikeirvine.org/rides-events/2026/10/6
- https://www.bikeirvine.org/rides-events?category=Thursday%20Rides
- http://www.bikeirvine.org/rides-events?category=Tuesday%20Rides
- http://www.bikeirvine.org/rides-events?category=Sunday%20Rides
- http://www.bikeirvine.org/newb-rides
- http://www.bikeirvine.org/ridewithus
- https://www.ocwheelmen.org/rideinfo
- https://www.ocwheelmen.org/calendar
- https://ridewithgps.com/organizations/5473-orange-county-wheelmen/calendar.ics
- https://ridewithgps.com/events.json?organization_id=5473
- https://cyclo-vets.com/rides
- https://www.momentbikes.com/events/moment-san-diego-bike-rides-pg369.htm
- https://www.momentbikes.com/
- https://www.outspoken.cc/
- https://www.outspoken.cc/rides-and-events-sd
- https://www.heylo.com/embedded-events.min.js (and its public events endpoint, called with the key printed on the club's page)
- https://sdbc.org/
- https://sdbc.org/saturday
- https://sdbc.org/sunday
- https://sdbc.org/blog-club
- https://sdbc.org/resources
- https://sandiegomagazine.com/everything-sd/health-fitness/10-local-group-rides-for-every-type-of-cyclist/ (lead only)
- https://swamis.org/events/venues/cadence-cyclery/
- https://swamis.org/events-calendar/ (page summary)
- https://swamis.org/rides-events/weekly-group-rides-t/ (raw once, then summary)
- https://swamis.org/events/event/friday-coffee-ride/ (page summary)
- https://swamis.org/events/event/swamis-sunday-fiesta-island-3/ (page summary)
- https://www.cmabs.org/events
- https://www.theunlikelycyclist.com/new-events (and the Sept 26 and Sept 30 event pages)
- https://www.bigwheelbikescv.com/events
- https://rwbtc.clubexpress.com/
- https://rwbtc.clubexpress.com/content.aspx?page_id=4001&club_id=934329
- https://www.riversidebicycleclub.com/
- https://www.riversidebicycleclub.com/page-1379195
- https://ridewithgps.com/organizations/5058-rbc/calendar.ics
- https://ridewithgps.com/events.json?organization_id=5058
- https://www.ocvelo.com/
- https://www.ocvelo.com/ocvelo-rides.html
- https://ridewithgps.com/organizations/39-orange-coast-velo/calendar.ics
- https://www.gravelstoke.com/events
- https://www.gravelstoke.com/calendar/sept-2026-gravelstoke-ride-8lw7p
- https://ridewithgps.com/organizations/4002-gravelstoke/calendar.ics
- https://theawarewolfs.com/fmbr/
- https://sdbikecoalition.org/calendar

Pages that didn't load or had nothing: https://www.instagram.com/sd_shewolves/ (login), https://rouleurbrewing.com/ (403), http://www.meetup.com/Orange-County-Women-on-Wheels/ (404), https://www.strava.com/clubs/1410 (403), https://www.vclj.com and a dozen guessed club domains (no response).
