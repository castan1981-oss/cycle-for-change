# florida: group-ride deep sweep

- **Area id:** `florida`
- **Agent:** Florida group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026
- **Files:** `florida.json` (14 new rides, all high except one medium), `upkeep.json` (23 re-checks) and this report
- **Fetches:** about 145. WebSearch was out, DuckDuckGo gave a bot challenge, and WebFetch wasn't approved, so every ride was found by following links off pages I'd already loaded.

## Summary

**New: 14 rides** (13 high, 1 medium). The target was about 30. I'd rather hand over 14 proven rides than pad it. Facebook, Instagram and Strava carry most Florida rides, and none of them loads without a login.

By city: Sarasota 3, Sanford 2, Tallahassee 2, Lakewood Ranch 1, Fort Myers 1, Punta Gorda 1, Estero 1, Naples 1, Port St. Lucie 1, St. Petersburg 1.
By host: Sarasota Manatee Bicycle Club 3, Capital City Cyclists 2, Bicikleta Bike Shop 2, Caloosa Riders 2, Village Idiots 1, SPBC 1, Naples Velo 1, Treasure Coast Cycling Association 1, Estero Bicycle Cafe 1.
By type: road 9, gravel 3 (Caloosa Gravel Nights, Wacissa, Bicikleta Gravel GRIT), social 1 (recumbent rollout), plus road/social 1.
No-drop or beginner in the host's own words: 8 of 14.

**No new ride in Miami, Fort Lauderdale, West Palm Beach, Key West, Orlando, Tampa, Jacksonville, Gainesville, Pensacola or the Space Coast.** Those scenes live on Facebook groups, Instagram and invite-only Strava clubs. I found no queer, women / trans / nonbinary or BIPOC ride with a page that loads. The leads are under "Couldn't confirm".

**Re-checks: 23 of 23 existing rides touched.** 6 changed, 6 confirmed, 11 couldn't be confirmed (written as `unreachable`). Nothing ended, paused or went seasonal.

## For the editor

- **Six rides changed.** EBC and South Broward Wheelers weekend rides move to 7:30 am (EBC from Oct 3). Wednesday Night Worlds now starts at Lakewood Ranch Main Street, not Village Bikes. Saturday Chaires finally has a time (9:00 am). SPBC's Saturday (8:30 from Oct 31) and Tuesday Dunedin (8:30 from Nov 3) now carry `start_times`.
- **South Broward Wheelers start moves week to week** between sponsor shops (Oct 3 is Big Wheel Bicycles, Pembroke Pines), so `start_location` is only the Oct 3 start. Members-only rides are now enforced there; visitors get one trial ride.
- **VICC Wednesday Night Worlds ends Oct 28, 2026** (calendar rule). It restarts in March.
- **Caloosa Riders' calendar is a mine.** About 20 weekly rides a month. Host cap holds me to 3, so the rest are in "Host-cap extras" below.
- **Hosts at the 3-ride cap:** Caloosa Riders (Welcome Ride existing + 2 new), Capital City Cyclists (existing + 2), SMBC (3 new), Bicikleta (existing + 2), SPBC (2 existing + 1).

## Why these

- **VICC Saturday Bacon Ride (Sarasota):** the flagship Saturday ride in Lakewood Ranch, seven pace groups down to a 14-16 mph no-drop group. Its calendar is a Google feed a robot can read.
- **Monday Minions (Fort Myers):** Caloosa Riders' beginner ride. 12-14 mph, no drop, 20 miles, with a pre-ride safety talk.
- **Tuesday Gravel Nights (Punta Gorda):** no-drop gravel through Babcock Webb wildlife area, 13-16 mph, no pace lines.
- **Wacissa Gravel/Dirt Road Ride (Tallahassee):** Tuesday morning, 85% unpaved, all paces, nobody dropped.
- **Tuesday After Work Ride, Killearn (Tallahassee):** no-drop evening road ride with a happy hour.
- **Love the Loop (Sarasota):** SMBC's Saturday country-road ride, two groups, food for the church pantry as the entry fee.
- **Legacy Trail and Casey Key (Sarasota):** SMBC's Sunday ride at 12-16 mph, the gentlest of the club's week.
- **Lakewood Ranch Town Hall ride (Lakewood Ranch):** SMBC Wednesday, five speed groups from 12 mph, "non-members are welcome".
- **Weekday USFSP Ride (St. Petersburg):** the club's daily 8:00 am loop, up to 50 riders, show and go.
- **Naples Velo Monday Recovery Ride (Naples):** four easy laps in Pelican Bay at a capped 20 mph. Medium: the page is undated.
- **TCCA Saturday Cyclewerks Ride (Port St. Lucie):** no-drop C ride, 25 to 35 miles, "all skill levels" in the club's words.
- **Estero Bicycle Cafe Sunday Ride (Estero):** fast 35 miles, three speed groups, one route, run by the shop.
- **Gravel GRIT Night Ride (Sanford):** monthly night gravel in Seminole State Forest.
- **Monthly Recumbent Rollout (Sanford):** first Saturday, 10-15 easy miles onto the RiverWalk. One of the few recumbent rides on the site.

## Where rides are posted here

**Machine-readable (a robot can re-read these):**

- **Google Calendar feed:** VICC (Sarasota/Lakewood Ranch), `https://calendar.google.com/calendar/ical/viccboard%40gmail.com/public/basic.ics`. Weekly Bacon Ride and Wednesday Night Worlds are in it. Put in `refresh.feed_url`.
- **ClubExpress calendars:** Caloosa Riders (`crbc.clubexpress.com/content.aspx?page_id=4001&club_id=787276`), Capital City Cyclists (`cccyclists.clubexpress.com/content.aspx?page_id=4001&club_id=105555`). Each event has its own page at `page_id=4091&item_id=…`. Boca Raton Bicycle Club is on ClubExpress too (club_id 195201) but its calendar was empty in the raw page.
- **HuntCal:** SMBC, `https://www.huntcal.com/cal/view/SMBC/SMBC?vm=r`, every ride with a date and an event page per day.
- **Wild Apricot event lists:** Seminole Cyclists (`seminolecyclists.wildapricot.org/events`, with an `/events/RSS`), Treasure Coast Cycling Association (home page lists the next public events), South Broward Wheelers (`/page-18071`).
- **Static club or shop pages stating the schedule:** SPBC (`stpetebicycleclub.com/rides`), Kyle's, Bicikleta, Village Bikes, ZenCog (ZenCog's list is undated).

**Hosts that don't load:** Facebook (all of it), Instagram, Strava club event lists (the club page loads but shows only "sign up to see"), Cloudflare-fronted Visit St. Pete-Clearwater, floridafreewheelers.com (bot check), Meetup's search (needs JavaScript), Bike/Walk Central Florida's calendar and The Underline's events (both JavaScript).

**Miami Bike Scene** (`themiamibikescene.com`) is the best regional directory. Its Miami-Dade, Broward, Palm Beach and Keys group-ride pages list hundreds of rides with a contact link. They are undated and some are years old, so I used them as leads only. Its monthly Critical Mass posts are dated and I used those.

## Re-checked

Changed (6):
- `coral-gables-fl-everglades-bicycle-club-saturday-ride`: 7:00 am becomes 7:30 am from Oct 3 (EBC home page and calendar, Oct 1).
- `sunrise-fl-south-broward-wheelers-saturday-ride`: now 7:30 am, rotating shop starts instead of Markham Park, one trial ride for visitors (club home page and calendar, Oct 1).
- `st-petersburg-fl-spbc-saturday-club-ride`: 8:00 am; `start_times` 8:30 am from Oct 31 (rides page states it).
- `seminole-fl-spbc-dunedin-breakfast-ride`: 8:00 am; `start_times` 8:30 am from Nov 3 (rides page states it).
- `lakewood-ranch-fl-vicc-wednesday-night-worlds`: 6:00 pm from Lakewood Ranch Main Street (101 Boardwalk Loop), last ride Oct 28; feed added.
- `tallahassee-fl-ccc-saturday-classic-chaires`: 9:00 am from the Dorothy Cooper Spence Community Center, 18-22 and 17-20 mph groups; the record had no time.

Confirmed (6):
- `miami-fl-miami-critical-mass`: the Sept 25 post gives 6:30 pm gather, 7:15 pm roll, Government Center.
- `sanford-fl-saturday-social-ride`: Bicikleta's page (carries Oct and Dec 2026 events) lists it, 7:15 meet, 7:30 roll.
- `sanford-fl-sanford-bicycle-club-monday-ride`: same page says every Monday at 6 pm from Dees Brothers. Secondary page.
- `orlando-fl-kyles-thursday-night-ride`: shop's page states the 7:00 pm no-drop ride. The page has no week-by-week date; I leaned on the 2026 footer. Thin.
- `fort-myers-fl-caloosa-riders-welcome-ride`: calendar lists Sundays Oct 4, 11, 18, 25 at 7:30 am.
- `naples-fl-naples-velo-saturday-bridge-ride`: rides page states 7 am; the club's home page shows 2026 sponsors. The rides page itself is undated. Thin.

## Couldn't re-check

Written as `unreachable` in upkeep.json, with the reason:

- `coral-gables-fl-ebc-bike305-beginner-ride`: only an undated directory ("starting 9/9/23"); EBC's own Oct calendar shows no beginner ride.
- `fort-lauderdale-fl-critical-mass`, `fort-lauderdale-fl-goonie-prowl`, `west-palm-beach-fl-critical-mass`: Facebook groups won't load; Miami Bike Scene pages are undated.
- `st-petersburg-fl-critical-mass`: Cloudflare check on the only source.
- `tampa-fl-critical-mass-tampa-bay`: site loads and states the schedule but its footer says 2025.
- `jacksonville-fl-ram-ride`, `jacksonville-fl-tunibiri-tuesday-night-ride`: ZenCog's list is undated; Facebook errors.
- `clermont-fl-trek-clermont-saturday-group-ride`: Facebook event only.
- `pensacola-fl-bike-pensacola-slow-ride`: site shows its newest ride as May 22, 2026; says to check Facebook.
- `gainesville-fl-casual-tuesday-ride`: Instagram returned a 429.

## Rejected

- **Bike Walk Coral Gables monthly Gables Bike Tours** (bikewalkcoralgables.org/events, seen Oct 1): $10 guided tours from the Coral Gables Museum, third Sunday at 10 am. A paid tour, not a group ride.
- **Weston Flyers** (westonflyers.wordpress.com): newest post 2018; Miami Bike Scene still lists the rides.
- **Gainesville Cycling Club** (gccfla.org): rides are posted to members only; the group pages describe EZ Riders (beginner adults, 8-12 mph) but give no day, time or start.
- **VICC Women on Wheels (WOW) Ride**, Oct 18, 2026, and SMBC's 12th Anniversary WOW Ride (same day): annual one-off events, not recurring.
- **SMBC Round Lake Okeechobee Tour** (Nov 7-8) and Bike 5 (Oct 17): events, see below.

## Couldn't confirm

Name, host, day, time, start, where seen. A local rider should check these by hand.

**Seminole Cyclists** (Lake Mary / Sanford / Longwood). Wild Apricot events, 2026 sessions listed through December, but each is tagged `#membersride` and the pages don't say whether a guest can join. Ask via `seminolecyclists.wildapricot.org/contact_us`.
- Signature Saturday Ride, Sat 7:30 am, Fresh Market, 3775 Lake Emma Rd, Lake Mary. B-Nice group 18-20 mph, 34 miles, no drop.
- Festive Tuesday Night Ride, Tue 6:30 pm, Reiter Park, 311 W Warren Ave, Longwood. Recovery chat ride at 18-20 mph.
- Sunday Breakfast Ride, Sun 8:00 am, Foxtail Coffee, 4720 International Pkwy, Sanford. 29 miles, 20-21 mph.
- Friday Save Your Legs Ride, Fri 7:30 am, AmStar Theater lot, Lake Mary. 20 mph.
- Wrong Way Wednesday, Wed 6:00 pm through Oct 28, AmStar Theater. Social.

**Bicikleta CHILL MTB Night** (Sanford): last Wednesday of the month at Markham Woods, with SORBA Orlando, no-drop beginner MTB pace; the shop's page gives no time. `bicikletabikeshop.com/articles/local-events-rides-clubs-pg204.htm`.

**Naples Velo Craig's Coffee Ride** (Naples): Saturday, green pace, 40-50 miles to Lely Starbucks. The page says "7:00am or 7:30am March - Nov" and doesn't say which applies now. `naplesvelo.com/north-naples.html`.

**Miami / Broward / Palm Beach leads** (from the undated Miami Bike Scene directory plus the host's link; none loaded):
- Bike Tech Saturday Donut Ride, Miami. Strava club 572297 ("Home of the Saturday Donut Ride", 1,410 members). Time not seen.
- Sunset Riders Cycling, Pembroke Pines. Strava club 1094348, meets at Victor's Bakery, 17159 Pines Blvd. Days not seen.
- Church of Gravel, Miami. Last Wednesday, 7 pm, Black Point Marina. Directory says no beginners. Instagram `@church_of_gravel`.
- Tuesday Night Gravel, Black Point Marina. Every other Tuesday, 7 pm, no drop, 20 or 30 miles. `facebook.com/pg/mackcycle/events/`.
- Brian Piccolo Park Velodrome, Cooper City. Monday 6:30-9:00 pm new-rider orientation, free bike and helmet rental. `flavelo.org`.
- Taco Tuesdays Miami. 2nd Tuesday, 8 pm, Bayfront Park fountain, social, 15-20 miles. Facebook group `tacotuesdaysmiami`.
- Hollywood Critical Mass (last Friday, 7:30 pm, Young Circle), Lake Worth Critical Mass (first Friday, 7:30 pm, Bryant Park), Delray Critical Mass (7:00 pm, Veterans Park). Facebook groups.
- LauderAle Thursday Night Ride, Fort Lauderdale. `lauderale.co/upcoming-events/` (didn't load).
- Boca Raton Bicycle Club. Says rides run every day of the week; calendar empty in raw HTML. `bocaratonbicycleclub.com`.
- Everglades Bicycle Club last-Sunday no-drop gravel ride (20-32 miles, varies). Directory only; EBC's calendar doesn't list it.
- Women's rides on the directory with no host page: Tuesday Nite Ladies Cycling Social (Palm Beach), WOW Ride (Broward Facebook group 1500235573600502). No dates.

**Gainesville Cycling Club EZ Riders** (beginner adults, 8-12 mph, 15-25 miles) and other groups: members area only. `gccfla.org`.

**Queer rides:** none found anywhere in Florida. Robert may know of a Miami, Orlando or St. Pete group; none loaded.

## Host-cap extras

Proven on the host's own calendar, left out because the host is at 3.

**Caloosa Riders** (Oct 2026 ClubExpress calendar; each has an event page):
- Taco Tuesday, Tue 6:30 pm, Winn-Dixie at Colonial and Treeline, Fort Myers. C+ 16-19 mph, no drop, 25-28 miles, lights required.
- Easy Like Sunday Morning, Sun 7:30 am, Kohl's/Office Depot, 513 SW Pine Island Rd, Cape Coral. 20-22 mph, 43 miles, not no-drop.
- Minions PLUS, Wed 6:30 pm, Publix at Colonial Crossings. The club's other first-ride pick.
- Gator Trails Ride, Tue and Thu 7:00 am, Gator Trails Park, 3612 Garden Blvd, Cape Coral. Hour of Power, Wed 6:00 pm, same park.
- Fort Myers Beach Ride, Tue 7:30 am, Walmart at 17105 San Carlos Blvd.
- Rumrunners (Tue, Thu, Sat), Thirsty Thursday, Sanibel/Captiva Ride (Thu), Saturday Panera Ride, and The United Ride (weekly, rotating towns, Saturday).

**Capital City Cyclists:** Thursday Night Proctor-Centerville loop (Thu 6:00 pm, Celebration Baptist Church, 3300 Shamrock St, B+ 18 miles); Vintage Wakulla Station Friday Ride (12 mph chat pace, 20 miles); Riding Not Working, Havana (Wed 8:00 am, 12-16 mph, 37-41 miles); Riding Not Working Friday, Buck Lake (12-16 mph); Clay Ride: Flag Loop (Thu 9:00 am, Bradley's Country Store); St. Marks Saturday (14-16 mph, 28 miles); West Lake Road Ride (Sun, 12-16 mph).

**SMBC:** Casey Key Ride (Thu 8:30 am, Publix on Northridge Rd, 14-16 and 16-18 mph); Palm Aire Ride and Brunch (Fri 8:30 am); South of Venice Discovery Ride (Fri 8:30 am, 14-16 mph); Parrish/North River (Tue 8:30 am, 14-16 and 16-18); The Real Ride (Mon 8:30 am, 17-19) and The Wander (Mon 8:30 am, 16-18); Potter Park (Sat 8:30 am, 20-23 mph, 45 miles).

**SPBC:** Tuesday Bridge Ride (8:00 am to Oct 27, then 8:30 am from Nov 3, Seminole City Park, 15-18 mph); Sunday Library Ride (8:00 am, 8:30 after Oct 31); Thursday Gulfport Ride (8:00 am); Thursday Fort De Soto Loop (10:00 am, back after the last Saturday in October).

**Naples Velo:** Sunday FGCU ride (7 am, Black and Blue); Tuesday Hour of Power (7 am, Pelican Bay).

**Village Idiots:** nothing else weekly.

## Events (annual, worth the 2027 calendar)

- Intracoastal Waterway Century, Cocoa, late October (2026: Oct 25). `treasurecoastcycling.org/event-6857004`.
- Round Lake Okeechobee Tour, Nov 7-8, 2026 (SMBC / TCCA). Two-day tour with hotel.
- Bike 5, Orlando, Oct 17, 2026, 10th year. `bwcf.rallybound.org/bike-5-2026/Bicikleta`.
- Sanford Witches Ride, Oct 25, 2026, 5:00 pm. Sixth year.
- South Broward Wheelers Jupiter to Stuart Loop & Picnic, Nov 21, 2026, 50 miles.
- Spaghetti 100, Tallahassee, Oct 24, 2026, 41st edition (Capital City Cyclists).

## Stats

- Candidates looked at: about 70 (rides on host pages and directories)
- Listed: 14 (13 high, 1 medium)
- Couldn't confirm: 30 or so leads (5 Seminole Cyclists, 1 Bicikleta, 1 Naples Velo, about 14 in Miami / Broward / Palm Beach, plus Gainesville and extras)
- Rejected as paid, stale or one-off: 5
- Existing rides re-checked: 23 (6 changed, 6 confirmed, 11 couldn't be confirmed, 0 ended)
- Dry runs: `merge-ride-research.js` accepted 14 of 14; `rides-apply.js` applied 23 of 23 with no new validation errors

## Sources

- https://www.evergladesbc.com/ · https://www.evergladesbc.com/RIDE-GUIDE
- https://www.themiamibikescene.com/ and its /p/ group-ride pages (Miami-Dade, Broward, Palm Beach, Keys) · https://www.themiamibikescene.com/2026/09/miami-critical-mass-friday-september-25.html
- https://www.southbrowardwheelers.com/ · https://www.southbrowardwheelers.com/page-18071 · https://www.southbrowardwheelers.com/event-6835426
- https://stpetebicycleclub.com/rides · https://www.visitstpeteclearwater.com/event/critical-mass-ride-st-pete/49041 (blocked)
- https://criticalmasstampa.com/
- https://kylesbikeshop.net/articles/thursday-night-ride-pg71.htm · https://www.kylesbikeshop.net/articles/local-rides-clubs-pg2279.htm
- https://www.bicikletabikeshop.com/articles/local-events-rides-clubs-pg204.htm
- https://www.villagebikes.com/articles/local-rides-clubs-pg195.htm · https://villageidiotscycling.com/ · https://villageidiotscycling.com/pages/vicc-events-calendar · https://calendar.google.com/calendar/ical/viccboard%40gmail.com/public/basic.ics
- https://www.zencog.com/events/ride-with-us-pg200.htm
- https://crbc.clubexpress.com/content.aspx?page_id=4001&club_id=787276 and event pages item_id 3081635-3081700
- https://www.naplesvelo.com/ · https://www.naplesvelo.com/north-naples.html
- https://www.bikepensacola.org/
- https://cccyclists.clubexpress.com/content.aspx?page_id=4001&club_id=105555 and event pages item_id 2853185, 2927382, 2931940, 2946480, 2981859, 2983012 · https://ridewithgps.com/events.json?organization_id=93
- https://smbc.us/ · https://www.huntcal.com/cal/view/SMBC/SMBC?vm=r and event views 578974296, 616518213, 683057816
- https://www.treasurecoastcycling.org/ · https://www.treasurecoastcycling.org/event-6802234 · event-6652374 · event-6726017
- https://seminolecyclists.wildapricot.org/events · /signature_saturday_groups · /why_join_seminole_cyclists · /event-4063000
- https://gccfla.org/ · https://gccfla.org/rideschedule.shtml · https://gccfla.org/cgi-bin/web_ride_groups.cgi
- https://bikewalkcoralgables.org/events · https://bikewalkcentralflorida.org/calendar-of-events · https://www.theunderline.org/events
- https://www.strava.com/clubs/572297 · https://www.strava.com/clubs/1094348
- https://smbc.us/content.aspx?page_id=22&club_id=796445&module_id=418891 · https://www.bocaratonbicycleclub.com/ · https://www.oymbike.com/pages/group-rides-events · https://westonflyers.wordpress.com/ · https://www.facebook.com/CriticalMassWPB/ (error) · https://www.instagram.com/ctr.gnv/ (429)
