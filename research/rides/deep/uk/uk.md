# UK deep sweep (area `uk`) — scout report

Agent: group-ride scout, London and the United Kingdom. Date: 2026-10-01. About 155 fetches.

WebSearch was exhausted, so no search engine was used (a quick Bing and DuckDuckGo try returned a captcha and junk; nothing from them is used). Rides were found through the Meetup group finder (`meetup.com/find/?keywords=…&location=gb--London`, which returns group lists without a login), British Cycling's Let's Ride ride finder (`letsride.co.uk/rides?lat=…&lng=…&radius=…&date_to=…`, which returns dated rides and group pages), the LCC events iCal feed, and the link lists on club pages. Ireland (Dublin, Belfast) was not reached. No queer ride beyond the one already listed (Joyride Collective) could be proven.

## Summary

New rides in `uk.json`: **27** (19 high, 8 medium). Dry run: 27 accepted, 0 refused.

| City | New |
|---|---|
| London (Richmond area x6, Kilburn, East Finchley) | 8 |
| Harrow | 2 |
| Watford | 2 |
| Cardiff | 2 |
| Manchester | 2 |
| Ealing, Croydon, Eastcote | 1 each |
| Glasgow, Leeds, Bristol, Newport, North Tyneside, Newcastle, Birmingham, Saltaire | 1 each |

London is now 18 rides under the city name (10 listed before + 8) and 23 counting Ealing, Croydon, Harrow and Eastcote. That is over the 12 guide; the bulk is six Richmond-area club rides. If you want to trim, drop the Richmond Park Velo Wednesday laps and the Richmond Scenic Tuesday ride first (both medium, start point hidden to non-members).

Women / trans / femme: West London Breeze (Ealing), Breeze Hillingdon, Watford Cycle Hub Breeze, Cardiff Breeze, Breeze Newcastle & Gateshead (all "women only" in the host's words). Beginner: Kilburn Pedals, Harrow Cycle Hub, Moston Pedal and Chat, Cardiff Social Cycling, Watford Breeze. No-drop in the host's words: Cycle Club London, Richmond Park Rouleurs, Squeaky Wheels, Moston, Saltaire Meanderers, Watford Breeze. Early morning: Auster Friday laps (7:00), Harrow Cycling Club (8:00).

Re-checks (job 1): 10 of 10 listed rides re-checked. 8 confirmed, 1 changed (Joyride: Instagram link added), 1 seasonal break (Dulwich Paragon: no intro ride in October). Dry run of `upkeep.json`: clean.

## Why these

London and the Thames side
- **Richmond Park Velo, Saturday New Members Ride** — the club's own try-us ride, 9:20 am, Ripley/Wisley loop, split by level.
- **Richmond Park Velo, Wednesday evening laps** — easy evening laps to meet the leaders; 6:00 pm on Meetup, 6:20 on the site.
- **Richmond Park Velo, Sunday Club Ride** — the club's main ride, five levels, 50 to 70 miles.
- **Richmond Park Rouleurs, Sunday Club Rides** — a second big Richmond Park club, three Sunday groups listed for Oct 4, no one left behind.
- **Auster, Friday Richmond Park laps** — 7:00 am chilled laps and coffee; intro rides meet at Colicci Roehampton Gate Café.
- **Richmond Scenic Cycling, Tuesday Happy Ride** — long-running weekday group, fitness needed, new riders welcome.
- **Kilburn Pedals** — third Saturdays, easy 5 to 6 miles for first-timers; sister of Kentish Town Pedals.
- **Cycle Club London, Sunday Classic** — no-drop, 8:30 from East Finchley, free trial ride (page checked today).
- **West London Breeze, Friday ride (Ealing)** — women only, weekly from Ealing Town Hall, 9:30 departure.
- **Croydon Social Cycling Group, Sunday ride** — adults, 15 to 30 easy miles from Queens Gardens, café stop.
- **Harrow Cycle Hub, Beginner Bike Ride from Kenton** — Saturday 2:00 pm, 2 to 5 miles, run by a charity.
- **Harrow Cycling Club, Sunday ride** — 8:00 am, 30 to 50 miles at 11 to 13 mph from Harrow Park.
- **Breeze Hillingdon, Sunday ride from Eastcote** — women only, 9:00 am from Eastcote library, about every other week.
- **Watford Cycle Hub, Sunday Social Rides** — "rides every Sunday at 10am", guided, hub with parking and toilets.
- **Watford Cycle Hub Breeze Group, Saturday ride** — women who learned on the hub's beginner course; 12:30 pm.

Beyond London
- **CTC Glasgow, Saturday ride** — Cycling UK's Glasgow group, 10:00, Riverside Museum or Glasgow Green; non-members get three rides.
- **Leeds Cycling, Saturday off-road ride** — four Saturdays listed, start changes weekly, helmets required.
- **Sociable Cycling Group, Bristol** — 5,500-member adult group, Saturday 10:00 from Castle Park; nothing posted ahead right now.
- **Breeze Cardiff, Breeze in the Park** — Friday 10:30 from Pedal Power, women only, hire bikes on site.
- **Cardiff Social Cycling** — third Saturday, for people new to group riding.
- **Newport Social Cycling, Monthly Cake Ride** — first Sunday, 9:00 from the Velodrome, with shorter joining points.
- **Squeaky Wheels, North Tyneside** — Sunday 10:00 from Earsdon, steady 20 to 38 miles, no one left behind.
- **Breeze Newcastle & Gateshead** — weekend 10:30 women's rides, start changes weekly.
- **Moston Cycling Walking, Pedal and Chat (Manchester)** — first Wednesday, leisurely, borrow a bike and helmet, listed to April 2027.
- **Debdale Cycling for Health (Manchester)** — Monday gentle 8 to 15 miles, coffee halfway.
- **Beacon RCC Community Ride (Birmingham)** — Sunday 9:15 social rides, families welcome; only two dates listed (medium).
- **Saltaire Meanderers (Bradford)** — Wednesday 10:30, small groups, e-bikes fine.

## Where rides are posted here

- **Let's Ride (British Cycling)** — `https://www.letsride.co.uk/rides` is the best find. It is server-rendered and filterable by `lat`, `lng`, `radius`, `date_from`, `date_to` and `page`, and each ride card gives the date, time, start text, postcode, distance and pace. Group pages (`/groups/<slug>`) list future rides, the last ten past rides, and the group's own description ("Rides every Sunday at 10am"). It covers Breeze (women's) groups and community groups in every UK city; coverage in Brighton, Bristol city, Glasgow city and Leeds city was thin. Booking needs a free login. Best source for a robot to re-read: group pages (no login, `federation-calendar`).
- **Meetup** — group finder pages and group pages load. Event titles, dates and times show; for private groups (Richmond Park Velo, Rouleurs, Auster, Richmond Scenic) the start location is "visible to members". **Meetup's iCal feeds (`/events/ical/`) now return `{"message":"Invalid feed signature"}` for these groups**, so no `feed_url` is set on any record. The group page's Apollo state (`__NEXT_DATA__`) holds upcoming and recent events and is the thing to parse.
- **LCC events iCal** — `https://lcc.org.uk/events/list/?ical=1` (30 events at a time; add `&tribe-bar-date=YYYY-MM-DD` to page forward). Machine-readable. Carries Ealing Women's Rides, Ealing leisurely rides, Kentish Town Pedals, Kilburn Pedals, Southwark Healthy Rides, Lewisham and Redbridge rides.
- **Club sites with standing schedules** — richmondparkvelo.com/weekly-rides, rprouleurs.co.uk, auster.cc/rides, cycleclub.london/our-rides (WordPress API gives the modified date).
- **Rapha events** — `events.rapha.cc` is behind Cloudflare to curl; WebFetch reads it.
- **Not readable** — britishcycling.org.uk (Cloudflare 403, "Just a moment"), dulwichparagon.com via curl (HTTP 202 bot wall; WebFetch worked). Neither was worked around.

## Re-checked

- Critical Mass London — confirmed. criticalmass.in's mirror of the ride's own Instagram, posts dated Sept 30 and Oct 1, 2026: last Friday, 19:00 under Waterloo Bridge, usual departure 19:30.
- Dulwich Paragon Monthly Introductory Ride — **seasonal-break**. Page modified 2026-09-07: "There will not be an intro ride in October." Usual first Saturday 9:00 at Herne Hill Velodrome; no November date named. The ride record needs flipping back after Nov 7 if the club runs it.
- Ealing Women's Ride — confirmed. LCC feed: Oct 3, 10 (Sat), 18, 25 (Sun), 31 (Sat), 9:45 meet at Ealing Town Hall.
- Kentish Town Pedals — confirmed. LCC feed: 10:00 on Oct 3, Nov 7, Dec 5.
- Rapha Friday Chat Laps — confirmed. Series Oct to Dec 2026, meet 7:00, briefing 7:15, Inner Circle (Jubilee Gates).
- Rapha Women's Chat Laps — confirmed. Weekly Tuesday 7:00, Sept to Dec 2026, no-drop, 22 to 24 km/h.
- Cycle Club London, Regent's Park Chat Laps — confirmed. Page modified 2026-06-15; Wed and Fri 7:00. The club's weekday rides are called open, member-led.
- Cycle Club London, Saturday Steady — confirmed. Same page; 8:30 coffee, 9:00 depart, "all club rides are no-drop".
- Southwark Cyclists Healthy Rides — confirmed. Page and LCC feed: Oct 3 (two rides), Oct 10, provisional Oct 17 and 31; 10am Saturday starts for most rides.
- Joyride Collective — **changed** (Instagram link added: `http://instagram.com/the.joyride.collective/` from the Meetup page). Past rides Sep 13 (1:00 pm, Alexandra Palace), Aug 16, Jul 26, Jun 13; no October ride posted yet. The record stays medium; if nothing appears by late November, mark stale.

The clocks go back on Oct 25. None of these hosts publishes a winter start table, so no `start_times` were added. Rapha's and CCL's early starts get darker; the records say lights.

## Couldn't re-check

None. All 10 loaded (two through WebFetch because of bot walls).

## Rejected

- **Rapha More Than Circles** (every second Saturday) — the page's own season is November 2025 to March 2026 and it shows SOLD OUT. Stale, seen 2026-10-01.
- **Lewisham Cyclists Fix and Ride** (third Sunday) and **Lewisham Cyclists and Beckenham BMX Dr Bike** (first Sunday) — bike repair sessions, not group rides.
- **Redbridge Cycling Campaign** — rides are a few a season; its page calls Oct 18 "our last ride of this season".
- **LOW Riders (Liberty on Wheels)** — skating group first, cycling second; not a ride.
- **Edinburgh Cycling Club (ELREC)** — the Saturday sessions are cycling classes at NKS, 7 Gillespie Street (beginner 10:00, intermediate 11:30), not group rides.
- **Heart of England Cycling and a Coffee (Coventry)** — newest Meetup events are Oct 2025.
- **Bristol Soulful Cycling** — newest events Jan 2026.
- **Sunny Cycles (Glasgow)**, **Putney Casual Cyclists**, **Cycling by Nat**, **American Expats: Leisurely Richmond Park Laps** — no events posted, 1 to 75 members.

## Couldn't confirm

- **Rapha Beyond 100 Women's Rides** — Rapha London, monthly, women's, intermediate; page shows one date (Oct 11, 2026) and no start time or place. https://events.rapha.cc/products/beyond-100-women-s-rides
- **Out on the Road, Women & Queer Cycling** — Meetup, London, 4 members, one event (Sat Feb 21, 2026, 9:30 am, Old Deer Park, Richmond). Women and non-binary riders, queer-friendly, 50 to 70 km+. Ask the organiser. https://www.meetup.com/out-on-the-road
- **London Pedal Together Meetup** — Sundays 12:00 from Wandsworth Town station, "Cycle Rides in & around London" (May 17, May 31, Jul 26, 2026). Nothing since July. https://www.meetup.com/London-Pedal-Together-Meetup
- **Clapham Cycle (club)** — Wednesday 6:30 pm Richmond Park social laps (Sep 16) and Saturday 9:00 am rides (Sep 19, 26); the group marks some rides with a rainbow and "All Colours". Nothing upcoming on Meetup; the club site claphamcycleclub.com did not connect. https://www.meetup.com/clapham-cycle
- **Brompton London** — Saturday and Sunday rides last listed June 20 and 21, 2026. https://www.meetup.com/brompton-london
- **Auster Intro Rides** — Friday 7:00 and weekday evening intro laps from Colicci Roehampton Gate Café; last listed Sep 18, nothing upcoming. https://www.meetup.com/auster-intros
- **Cycle Islington Women's Little Green Ride** — Sun Oct 11, 10:00 from Islington Ecology Centre, 191 Drayton Park N5 1PH; the host says "our usual rides" but only one date is posted. https://lcc.org.uk/events/cycle-islington-womens-little-green-ride/
- **Ealing Cycling Campaign Leisurely / Gentle / Speedy rides** — Sunday 10:00 from Ealing Town Hall (Oct 4 listed); no regular pattern on the page. http://www.ealingcycling.org.uk/p/events.html
- **Richmond Park Velo Strava club** (137 members) and **Cycle Club London Strava club** (cc-london) — club pages load; event lists need a login. https://www.strava.com/clubs/richmond-park-velo
- **Wild Cycling (Twickenham)** — Saturdays 10:00 about every two weeks (Oct 3, 17, 31, Nov 14), start at a different railway station each time; some titles say "FREE RIDE", others look like paid tours. Not listed. https://www.meetup.com/wildcycling
- **VeLothian (Edinburgh)** — social road rides, mostly weekdays and some Saturdays at 10:00, start hidden to members, no fixed day. https://www.meetup.com/velothian
- **Edinburgh Breeze Ladies**, **Breeze Bromley**, **Sutton Breeze**, **Breeze Barnet**, **Breeze Harrow**, **Chorlton Breeze**, **Horwich Ride Social (Ladies and Mixed)**, **Spokes SW Herts**, **East London and Essex Cyclists**, **Pype Hayes Community Cycling** — real, current groups on Let's Ride, but they ride on changing days with no weekly or monthly pattern. Good for a "what is on this week" view, not for a fixed-day directory.
- **Saddle Up for Our Weekly Rides (Birmingham)** — one Meetup event (Sat Oct 10, 5:15 pm) that gives a street address that looks like a home; skipped.
- **British Cycling Breeze ride finder** — Cloudflare wall, not fetched. The same rides appear on Let's Ride.
- **Queer, trans and women's cycling groups that live on Instagram or Strava only** — not reachable without search. Worth a local check: London's queer cycling groups, Pedal Pals-type social rides, Manchester, Edinburgh, Brighton and Bristol queer rides. None turned up on Meetup, Let's Ride or the LCC calendar.
- **Critical Mass in other UK cities, Dublin, Belfast** — not reached.

## Host-cap extras (found, proven, left out)

- **Richmond Park Velo** (3 listed) — Thursday 9:20 am Midweek Mystery ride for Intermediates; Wednesday 9:20 am Midweek Mystery for Steadies (summer only).
- **Cycle Club London** (3 listed with the two existing) — Saturday Faster ride 9:00 am Winchmore Hill; Saturday Sparrows 6:30 am East Finchley; Sunday Gravel ride 8:00 am (Totteridge or Trent Park); Tuesday and Thursday 6:00 am race laps at Regent's Park.
- **Richmond Park Rouleurs** — Wednesday 7:00 pm summer social laps in the park; Thursday summer rides to Box Hill; monthly new-members laps.
- **Auster** — Wednesday evening Richmond Park laps; weekend rides in six speed groups from Richmond Park, Clapham Common or Crystal Palace.
- **Camden Anchor / Camden Cyclists** (2 listed with the existing one) — nothing further.
- **Harrow Cycle Hub** — Thursday 1:00 pm afternoon rides from Kenton Rec; occasional Sunday brunch rides.
- **CTC Glasgow** — Tuesday 10:00 rides from Riverside Museum or McLennan Arch; midweek long rides.
- **Moston Cycling Walking** — Tuesday leisurely rides from the GROWE hub, Failsworth.
- **Watford Cycle Hub** — nothing further beyond the two listed.

## Notes for whoever re-checks

- Meetup now signs its iCal feeds. Public groups can still return an (empty) calendar; private ones do not. Parse the group page instead.
- Time clash to resolve by hand: Richmond Park Velo Wednesday laps (site 6:20 pm, Meetup 6:00 pm); Debdale Cycling for Health (Let's Ride 10:15, group text 10:30); Croydon Social Cycling (10:00 to 11:00, changes by ride).
- Let's Ride group pages only show the next few rides, so a short future list is normal. For groups with two or fewer dates ahead (Beacon RCC, Saltaire Meanderers, Bristol Sociable), mark stale if nothing is posted by late November.
- Cycle Club London pages carry no dated rides (members' Spond app); use the WordPress modified date as the cue.

## Stats

Candidates looked at: about 90 groups and rides. Listed: 27. Couldn't confirm: about 25 entries above. Rejected as ended, stale or unfit: 10. Re-checked: 10 of 10. Fetches: about 155 (Meetup group and finder pages about 40, Let's Ride list and group pages about 40, club and LCC pages about 25, WebFetch 7).

## Sources

LCC events feed https://lcc.org.uk/events/list/?ical=1 (and `?tribe-bar-date=` pages); https://lcc.org.uk/events/kilburn-pedals/2026-10-17/; https://lcc.org.uk/events/ealing-cycling-campaign-leisurely-ride-little-britain-lake-3/; https://lcc.org.uk/events/wanstead-park-tea-hut-to-regents-park/; https://lcc.org.uk/events/cycle-islington-womens-little-green-ride/; https://lcc.org.uk/events/lewisham-cyclists-fix-and-ride-2-2/2026-10-18/; https://redbridgecycling.org/rides/; http://www.ealingcycling.org.uk/p/events.html; https://criticalmass.in/london/socialnetwork/list-items; https://www.dulwichparagon.com/monthly-introductory-ride/; https://southwarkcyclists.org.uk/healthy-rides/; https://events.rapha.cc/rapha-london; https://events.rapha.cc/products/regents-park-friday-chat-laps; https://events.rapha.cc/products/rapha-x-steezy-ride; https://events.rapha.cc/products/rapha-clubhouse-rides; https://events.rapha.cc/products/beyond-100-women-s-rides; https://cycleclub.london/our-rides/; https://cycleclub.london/wp-json/wp/v2/pages?slug=our-rides; https://www.meetup.com/the-joyride-collective/ (and /events/, /events/ical/); https://richmondparkvelo.com/ ; https://richmondparkvelo.com/weekly-rides/; https://www.strava.com/clubs/richmond-park-velo; https://rprouleurs.co.uk/; https://auster.cc/ ; https://auster.cc/rides/; https://claphamcycle.com/; https://www.letsride.co.uk/ ; https://www.letsride.co.uk/rides (London, Manchester, Edinburgh, Glasgow, Bristol, Brighton, Cardiff, Leeds, Newcastle, Birmingham searches); Let's Ride group pages: west-london-breeze, croydon-cool-cycling, harrow-cycle-hub, havering-cyclists, breeze-bromley, sutton-breeze, breeze-barnet, breeze-hillingdon, breeze-cardiff-and-vale-of-glamorgan, cardiff-social-cycling, newport-social-cycling, squeaky-wheels, tyne-valley-breeze, breeze-ladies-edinburgh, moston-breeze-rides, beacon-rcc-social, debdale-cycling-for-health-group, horwich-ride-social-ladies, horwich-ride-social, watford-cycle-hub-social-rides, spokes-watford, lets-go-ride-a-road-bike, watford-cycle-hub-breeze-group, saltaire-socialites, ride-with-sarah; Meetup groups: richmond-park-velo-cycling-club, richmond-park-rouleurs, auster-cc, auster-intros, London-Pedal-Together-Meetup, brompton-london, clapham-cycle, liberty-on-wheels, putney-casual-cyclists, richmond-scenic-cycling, wildcycling, uk-cycling-adventures-london-beyond, cycling-by-nat, american-expats-leisurely-richmond-park-laps, london-mountain-biking-club, out-on-the-road, velothian, edinburgh-cycling-club, gentle-jaunts, sunny-cycles, ctc-glasgow-rides, bristolcyclists, soulful-cycling-bristol-beyond, leeds-cycling, saddle-up-for-our-weekly-rides, westmidlands-coffee-and-cycling-meetup-group; https://www.cyclinguk.org/local-groups/glasgow; https://www.cyclinguk.org/local-groups; https://www.britishcycling.org.uk/breeze (403).
