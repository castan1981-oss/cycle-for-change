# Second pass: g2-norcal-pnw

Agent: second-pass scout, group g2-norcal-pnw. Date: 2026-10-02.
Areas: ca-bay, ca-north-central, wa, or-id, dakotas-ak-hi. Input: 79 leads.

## Summary

| Outcome | Leads |
|---|---|
| proven, in the JSON | 22 leads (23 new records) |
| proven at the source, not added (host cap, or already listed) | 3 |
| gone | 2 |
| still-unproven | 52 |

New records by place: Bay Area 10 (Pleasant Hill, El Cerrito, San Francisco, Danville, Saratoga, Los Gatos, Palo Alto, Alviso, Sunnyvale, Oakland), Hawaii 7 (Kailua-Kona 3, Hilo 3, Waikoloa 1), Alaska 3 (Fairbanks), Washington 1 (Seattle), Idaho 1 (Coeur d'Alene), Oregon 1 (Medford).
Confidence: 4 high, 19 medium. `node tools/merge-ride-research.js --dry` accepts all 23.

## Why these

- Concord Thursday Night Rides: a weekly family-friendly Iron Horse Trail cruise from Pleasant Hill BART; four dated Thursdays on Bike East Bay's feed.
- Bikes Burgers Brews: a Tuesday night no-drop grown-folks ride from El Cerrito del Norte BART; four dated Tuesdays on the feed.
- Hummingbird All Watts Welcome: a Tuesday 7 am interval ride up from the Golden Gate Bridge for every level, public Strava event for Oct 6.
- Valley Spokesmen Mt Diablo Wednesday Ride: the weekly Diablo climb from Danville, on the club calendar through Nov 4.
- West Coast Mountain Bikers Thursday Night Gap Ride: weekly after-work singletrack plus potluck, with a new 4:30 pm start from Oct 1.
- LGBRC Weekend Road Rides: the Los Gatos racing club's posted weekend rides, non-members welcome with a waiver.
- The Morning Ride (TMR), Alviso Noon Ride, Spectrum Ride: three long-running Peninsula and South Bay rides that only Alto Velo's page lists.
- AIR cc WXMNS Ride: women, non-binary, trans and femme ride from Rockridge BART, Thursday mornings per the April event.
- Critical Mass Seattle: last Friday of the month, 6:30 pm at Westlake Park.
- Fairbanks Cycle Club Moderate Mondays, Lazy-ish Sunday Road Rides, Sunday Brunch Ride: the club's no-drop and easy rides; they run April to September or October, temporary membership offered.
- Coeur d'Alene Friday Coffee Ride: the club's easy café ride, still running after the weeknight rides ended.
- Thursday Lunch Laps (Medford): a weekly shop lunch ride.
- Seven Big Island rides (Kona, Hilo, Waikoloa) listed on the Hawaii Cycling Club's weekly-rides page.

## Where rides are posted here

- **Strava club event pages.** The public page for one event carries a JSON block (`__NEXT_DATA__`) with the date, time, start and full description, so you can read it without a login. It shows one occurrence at a time, with no recurrence flag. Club pages hide the event list.
- **Bike East Bay's calendar** (`bikeeastbay.org/events/category/group-rides/?ical=1`) is a working iCal feed for East Bay rides, including rides the organizers run on Facebook. Each entry says it is not a Bike East Bay event. Machine-readable.
- **Meetup** event lists load as page data (`__NEXT_DATA__` in `/events/`) even when the `/events/ical/` feed is short or answers 'Invalid feed signature'. Private groups hide the start.
- **Wild Apricot club calendars** (Valley Spokesmen) list every recurring ride a few weeks ahead with a full event page.
- **WordPress club calendars** (Los Gatos Bicycle Racing Club): read the month pages; `?ical=1` returned nothing.
- **Shift2Bikes** (Portland) has a JSON API: `/api/events.php?startdate=...&enddate=...` and `/api/ics.php?event_id=...`. Machine-readable.
- **Everyday Rides** (Seattle) group and event pages load as text. Most groups there show no upcoming events, so they prove little.
- **ClubExpress** pages (Lactic Acid, Seattle Randonneurs) load as text but are often updated by hand and by week.
- **Fairbanks Cycle Club** pages are good (dated leaders, first-ride dates, next ride) but the site often answers with a captcha wall (HTTP 202). Retrying eight times got through.
- **Hawaii:** the Hawaii Cycling Club page lists Big Island rides but says they are not club-run; Historic Kailua Village's calendar lists club rides from a different Kona start.
- Facebook groups and Instagram do not load for a robot. Most women, trans, BIPOC and queer groups in this region live there.

Re-check pages that a robot can read: Bike East Bay feed; Valley Spokesmen calendar; Strava event pages for Hummingbird and AIR cc; Meetup events page for West Coast Mountain Bikers; Fairbanks Cycle Club ride pages (when not walled); LGBRC month pages.

## Rejected

- Fairbanks Women on Wheels (WOW): the club page says this year is most likely the last for WOW after almost 25 years; farewell ride Wed Sept 9, 2026 (page read Oct 2, 2026).
- Fairbanks Pedal Powered People: the 2026 series ran Wednesdays and Thursdays, May to the beginning of July only.

## Couldn't confirm

Name, host, what is known, where to look:

- Friends on Bikes SEA, BIPOC women/trans/non-binary riders, since 2017: no day or time; friendsonbikes.com, @fob_sea, group email on its site.
- Ampersand Bikes Club (Seattle, AANHPI and multiracial): food-and-bikes rides; @abc.seattle (a 2023 listing had Thursday ramen rides).
- Breakfast Cycling Club (Seattle WTFNB): First Friday ride per a 2023 listing, 6:30 am meet; @breakfast_cc.
- All Bodies on Bikes Seattle: @abob_seattle, Everyday Rides page shows no events.
- Women Cycle Sacramento, Sacramento Cyclists, Tweed Riders, Hooligans Bicycle Club, Chico Women MTB, Chico Women on Wheels (Wednesday morning road, no start), Chico Area Group Rides, Chico MTB Rippers: Facebook groups behind a login wall.
- SNACC (Sacramento): Instagram @s.n.a.c.c. BARF at the Moon: no page. Team City Sacramento: site returns 403.
- Emerald City Bike Club (Seattle): Thursday 5:15 pm, 20 to 30 miles, beer after, no start place and no upcoming events; @emeraldcitybikeclub.
- Half-Fast Bicycle Spirit Club (Georgetown): first Saturday of the month; Everyday Rides shows none upcoming.
- Cat Rides NW: twice-monthly rides; one cat walk on Oct 4 is the only dated event. info@catridesnw.org.
- The Cyclist Club (Seattle): first ride Sat Oct 17, 9 am, Alki Beach, 10 miles, no-drop; nothing after it.
- VeloFemmes (Tacoma): Monday morning and every-other-Wednesday rides, May to September; no 2026 dates.
- Rápido and Rápida Club (Tacoma): rapido.club shows a blank page; @rapido_club.
- Tacoma Coffee Ride (every other Friday 7 am) and Wheel of Cheese (Thursdays): Instagram only.
- Olympia Cycling and Olympia Mountain Bike Ride Club beginner gravel (second Sundays, Capitol Forest): no page loads.
- Seattle International Randonneurs: brevets and permanents, not a weekly ride.
- Westside Wednesday Ride #141 (Cycle Cats PDX, Beaverton): Wed Oct 14, meet 7, ride 8 pm from Beaverton Transit Center is the only date on Shift.
- AIR cc Sama Sama: monthly, usually Sunday; no time or start.
- Mike's Bikes Sausalito Col du Pantoll: Wednesday 6 pm per an undated listing; shop page empty.
- Rapha SF Donut ride and Stammtisch: clubhouse page needs JavaScript; sanfrancisco@rapha.cc is on the ticket page.
- Roll Deep Bolinas Ridge (Sat Oct 10), Featherweight Cañada ride (Sun Oct 18), Low Key Hill Climbs (Sat Oct 3): one-off Strava events.
- Marin Instagram rides (Roasters Ride at Fairfax Java Hut, Scotty's, Chicken and Divine): Instagram only, no handles.
- Sonoma County Bicycle Coalition: site answers with a bot wall.
- Heather Farm monthly ride (first Tuesday, 5:15 pm, Civic Park, Walnut Creek): listed on Bike East Bay's feed but the entry still says 'Next ride: May 5, 2026'.
- HOP Ride (Danville, Saturday 9 am, Peet's) and POO Ride (Oakland, Tuesday 6 pm): blog roundup only.
- Mere Mortals MTB (Thursday 6 pm, Bay Lands, through March 2027): private Meetup, start hidden. A rider can ask the group.
- North Rim Adventure Sports biweekly rides (Chico): on Chico Velo's calendar only.
- Kona Saturday and Thursday A/B ride (8:15 am): the club page says Kona Target; another listing says the Old Airport Playground.
- Juneau Freewheelers, Juneau Mountain Bike Alliance, Cycle Alaska shop rides: no schedules. cycle@cycleak.com.
- Lactic Acid (Boise) Thursday MTB (Oct 1, 6 pm, start changes weekly) and Sunday No Stress ride (Mar 22 only).
- Velohana (Honolulu): shop hours only. Outta Bounds: own site did not load.
- Siskiyou Velo (Ashland/Medford): the calendar is a Wix app that does not load as text.
- Sorella Forte 'Intermediate': no separate ride on the rides page.
- Barrie's Thursday night no-drop (Pocatello): detail page 404.
- Fastrack Sunday Echelon Club (Santa Barbara, 8:30 am, Mission lot): page footer says 1997-2023.

Not added, but proven: Fat Cake Thursday Wildcard (host at cap of 3); Valley Spokesmen Brisk Bunch (host at cap of 3); Thursday Night Worlds (already listed).

## Events (one-liners)

- Mount Diablo Challenge, Danville, Oct 4, 2026 (the Valley Spokesmen event; the club says the name and format are changing). https://valleyspokesmen.org/
- Kelly Brush Ride Bay Area, Mill Valley, Oct 24, 2026. https://bikeeastbay.org/event/kellybrushride/
- Bike the Bridges, Martinez, Oct 3, 2026. https://bikeeastbay.org/event/17th-annual-bike-the-bridges/

## Stats

- Leads worked: 79. Proven: 22 leads (23 records) plus 3 proven-not-added. Gone: 2. Still unproven: 52.
- Search: the 200-call session search budget ran out part-way (the Chico Velo and later searches were refused), so most leads were tried through the links they carried.
- Surprises: a Strava event page carries its full text in JSON even for logged-out visitors. Meetup's iCal feed for West Coast Mountain Bikers held one event while the page held eleven. The first-pass 'Women on Wheels (WOW)' lead in Fairbanks is a 25-year ride that just ended. The Rogue Cycle and Alto Velo pages are undated, so the 'medium' ones need a human.

## Sources

Fetched and read on Oct 2, 2026:
- https://www.aircc.org/group-rides ; https://www.strava.com/clubs/1008989 ; https://www.strava.com/clubs/1008989/group_events/3476390654283948268
- https://bikeeastbay.org/events/category/group-rides/ ; https://bikeeastbay.org/events/category/group-rides/?ical=1 ; https://bikeeastbay.org/event/bike-burgers-brews/2026-10-06/
- https://www.strava.com/clubs/1384021/group_events/3539467867329820304 ; https://www.strava.com/clubs/996791/group_events/3530381753343803886 ; https://www.strava.com/clubs/1157973/group_events/3528256494678268006 ; https://www.strava.com/clubs/109/group_events/3539366694818991920
- https://valleyspokesmen.org/ ; https://valleyspokesmen.org/ridecalendar ; https://valleyspokesmen.org/event-6496349 ; event-6770659 ; event-6864359 ; event-6819114 ; event-6770496
- https://www.meetup.com/westcoastmtb/events/ ; https://www.meetup.com/westcoastmtb/events/316755061/ ; https://www.meetup.com/Mere-Mortals-Mountain-Biking/events/
- https://www.losgatosbicycleracing.org/events/month/ (and 2026-09, three event pages, club-rides pages)
- https://www.altovelo.org/other-group-rides ; https://www.strava.com/clubs/tmr-1306 ; /clubs/14709 ; /clubs/30616
- https://www.fatcake.cc/rides ; https://mikesbikes.com/pages/sausalito ; https://bayarearides.org/rides/2956 ; https://ti.to/ccsfc/rapha-event-rides/en ; https://ridewithgps.com/events/29892.json ; https://dothebay.com/venues/rapha-cycle-club
- https://friendsonbikes.com/ ; https://www.commuteseattle.com/bike-month-spotlight-cycling-groups-for-shared-identies/ ; https://everydayrides.com/cities/seattle-wa/groups and group pages for Emerald City, Half-Fast, Cat Rides NW, All Bodies on Bikes ; https://everydayrides.com/events/6ab7a0abc9383329e0d3cecd-the-cyclist-club ; https://catridesnw.org/ ; https://www.strava.com/clubs/562154
- https://www.seattlebikeblog.com/2026/01/29/answering-call-from-his-minneapolis-bike-shop-critical-mass-will-ride-for-alex-pretti-friday-alki-and-9-other-wa-communities-ride-saturday/ ; https://theticket.seattletimes.com/top-picks/community-bike-ride-westlake-park/
- https://velofemmes.wixsite.com/velofemmes/our-rides ; https://www.rapido.club/ ; https://seattlerando.org/ (and its ride pages)
- https://www.shift2bikes.org/api/events.php (Oct 2 to Dec 31, 2026) ; https://www.shift2bikes.org/api/ics.php?event_id=14999
- https://www.fairbankscycleclub.org/rides/women-on-wheels/ ; /moderate-mondays-gravel-ish-rides/ ; /sunday-brunch-rides/ ; /lazy-ish-sunday-road-rides/ ; /pedal-powered-people-ppp/ ; /rides/summer-rides/ ; /2026/08/moderate-monday-announcement-wow-schedule-change/
- https://www.hawaiicyclingclub.com/weekly-rides.html ; https://historickailuavillage.com/event/hawaii-cycling-club-weekly-rides/2026-07-28/ ; https://hbl.org/group-ride-listings/ ; https://hbl.org/lets-ride/ride-calendar/ (and its Google calendar feeds) ; https://www.velohana.com/ride-schedule
- https://www.cycleak.com/articles/local-bike-groups-pg124.htm ; https://cycleak.com
- https://lacticacid.clubexpress.com/content.aspx?page_id=22&club_id=95288&module_id=687238 ; https://cdacycling.club/rides ; https://www.roguecycle.com/articles/rides-and-events-pg37.htm ; https://www.siskiyouvelo.org/ ; https://www.sorellaforte.com/rides ; https://www.barriessports.com/articles/weekly-bicycle-rides-pg195.htm
- https://www.chicovelo.org/calendar.html ; https://www.northrimadventure.com/articles/chico-area-rides-and-events-pg37.htm ; http://www.fastrackbicycles.com/rides
- Blocked or not loadable: Facebook group pages, Instagram profiles (HTTP 429 login), bikesonoma.org (202), teamcitysacramento.com (403), outtaboundshawaii.com, rapido.club.
