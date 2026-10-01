# new-england: group-ride deep sweep report

- **Area id:** `new-england` (MA, CT, RI, VT, NH, ME)
- **Agent:** New England group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026
- **Files:** `new-england.json` (33 new rides), `upkeep.json` (30 re-check entries), this report
- **Dry runs (today = 2026-10-01):** `merge-ride-research.js` accepted 33 of 33. `rides-apply.js` took all 30 entries, no errors, 43 existing warnings unchanged.

## Summary

**New rides: 33** (target was about 30). 22 high, 11 medium. By state: MA 14, RI 6, NH 5, ME 5, VT 2, CT 1.

By city: Nashua NH 3, Portland ME 3, Northampton MA 2, Newport RI 2, Orono ME 2, and one each in Braintree, Cambridge, Marshfield, Randolph, Milton, Lexington, Chelmsford, Milford, Holliston, Framingham, Uxbridge, Hyannis (MA), Providence, West Greenwich, Westerly, Exeter (RI), Barre, South Burlington (VT), Dover, Manchester (NH), Middletown (CT).

By type: mountain bike 20, road 10, gravel 2, social 1. That skew is real. The rides that publish dated listings in New England are NEMBA chapter pages, so most proven rides are MTB. Road and shop rides mostly sit on undated shop pages or Facebook.

Inclusive and beginner: Rose Bike Tuesday Beginner MTB, SNH NEMBA Wednesday (new riders), MVNEMBA Easy Rider, Landry's Braintree (beginner pace, all rides no-drop), QC Bike Friday Spin, and the Vermont Bicycle Shop Thursday Millstone ride (the host asks riders to make room for BIPOC, women and queer folks). No-drop in the host's words: Forest City Saturday, NCC Sawmill, Ten Speed Tempo Sunday, Dash Wednesday, Rose Tuesday rides.

**Gaps, said plainly.** I found nothing I could prove for Somerville, Montpelier, Bar Harbor or the Midcoast, and only thin coverage for Hartford, New Haven and Burlington. Boston and Cambridge got one ride each from a club calendar plus the Landry's and NEMBA rides around them. WebSearch was capped at 200 and had run out, so I worked from link lists on pages already fetched. Many shops here post on Facebook and Instagram, which don't load. Those are under "Couldn't confirm".

**Re-checks: 30 of 37 entries written.** 19 confirmed, 6 changed, 5 seasonal-break, 0 paused, 0 ended. 7 rides could not be re-checked and have no entry.

## For the editor

- **Landry's.** Their group-rides page (the old `/events/...pg163.htm` URL now redirects to `/pages/landrys-group-rides`) no longer lists the Monday Boston Slow Roll or the Tuesday Needham women's/non-binary MTB ride. I set Boston Slow Roll to seasonal-break (the record already said the season ended 9/14). I wrote no entry for Needham women's, since nothing says it ended. I added only one Landry's ride (Braintree Saturday) to stay at 3 per host with the two existing ones.
- **Papa Wheelies and Rose Bike publish public Google Calendars.** I put the .ics feeds in `refresh.feed_url` for Mama Wheelies, Papa Wheelies Monday, Rose Bike Women's MTB, and the two new Rose Bike rides.
- **CRW's ICS feed** (already on the two Croissant rides) also carries Wednesday Wheelers. The Croissant series end on Oct 6 and Oct 9. They will need a seasonal-break after those dates.
- **Dated start times.** Portland Velo Club Wednesday is 5:15 pm now and 5:00 pm from Oct 14 (`start_times` added), last ride Oct 28.
- **Ride times that do not show a clock time.** GMBC Saturday (VP) Training Ride has `time_local` null: the club emails the time by Thursday. Bike Newport's Full Moon Ride changes its start every month; I set the Oct 26 time (4:45 pm).
- **Seasonal-break new records.** Dash Wednesday (back in spring) and Sea Sports Wednesday Night Lights (starts Oct 28) are written with `status: seasonal-break` and the restart in `schedule`.
- **NEMBA "Recurring Event" listings** show only the next date. I called them weekly where the title names a weekday or the host says weekly. Treat the first re-check as the test.
- **Conflict, Thursday NCC D Road** is not in the file (see Over the cap). It shows a "New Time! 4:30" title and a "Leaves 5:30" description.
- **Conflict, NCC Sunday Dirt Road Series.** Calendar start data says 9:00 am for every October Sunday; the event text still says 10:00 am. I used 9:00 and marked it medium.
- **Phone numbers** for ride leaders appear on some source pages (CRW, Seven Hills Wheelmen). I left them out. Shop numbers are in a few visitor notes.

## Why these

- **Landry's Braintree All Levels Road Ride (Braintree).** Saturday 7:00 am, beginner 13-15 mph and enthusiast groups, all no-drop, from a big shop.
- **Wednesday Wheelers, CRW (Cambridge).** A weekday 10 am social ride with a lunch stop and a new start each week. Dated through Nov 18.
- **Manic Monday Ride (Marshfield), Ponky Rockets Dirt Therapy (Randolph), Thursduro (Milton).** Three weekly Southeast MA NEMBA rides, Mon, Wed and Thu evenings, each listed with an Oct date.
- **SNH NEMBA Wednesday, Tuesday and Thursday (Nashua).** A new-rider Wednesday, a leisurely Mine Falls Tuesday and a skills Thursday, all 6-8 pm.
- **MVNEMBA Easy Rider (Lexington) and Rough Riders (Chelmsford).** Beginner Thursday at Landlocked Forest and a faster Tuesday at Russell Mill.
- **Blackstone Valley NEMBA: Thursday Vietnam (Holliston), Nobscot Friday (Framingham), Dam Nice Ride (Uxbridge).** Central MA and MetroWest, with a Sunday morning option.
- **Rhode Island NEMBA night rides: Big River Thursday (West Greenwich), Woody Hill Monday (Westerly), Arcadia Tuesday (Exeter).** The Providence-area MTB scene; Big River runs fast and mellow groups.
- **Milford Bicycle Wednesday MTB at Vietnam (Milford).** A shop-run social MTB ride; page undated, so medium.
- **NCC Monday Sawmill MTB and Sunday Dirt Road Series (Northampton).** A no-drop Monday MTB and the Western Mass gravel ride.
- **Ten Speed Spokes Saturday Social and Tempo Sunday (Newport).** Two 7 am rides from a coffee shop; the Sunday splits for 60+ miles.
- **Dash Wednesday No-Drop Recovery Ride (Providence).** Listed so riders know it comes back in spring.
- **Thursday Night Millstone Adventure Hour (Barre).** Beginner-friendly loop first, then a longer loop; the shop's blog names BIPOC, women and queer riders.
- **GMBC Saturday (VP) Training Ride (South Burlington).** The club's Saturday ride, with dates on its calendar and the time sent by email.
- **Dover Cyclery Tuesday Night Ride (Dover).** The intermediate companion to the Thursday Thirsty Turtle.
- **QC Bike Friday Evening Spin (Manchester).** A relaxed 10-mile city ride ending at a brewery; Oct 2, 16, 30 left.
- **Forest City Cycling Saturday Morning Ride and Monday Night Ride (Portland).** A no-drop 35-65 mile Saturday and the Cousins Island Monday loop.
- **Portland Velo Club Saturday Morning Ride (Portland).** The big competitive Saturday ride, with its season end (Nov 14) on the page.
- **Rose Bike Tuesday Beginner MTB and Mixed Surface (Orono).** A true-beginner MTB ride and a mellow road, dirt and gravel ride, both no-drop.
- **Sea Sports Wednesday Night Lights MTB (Hyannis).** Starts Oct 28, 5:30 pm from the shop.
- **Pedal Power Tuesday Night MTB (Middletown).** The fall MTB ride that takes over from the road season.

## Where rides are posted here

- **NEMBA chapter pages** (`nemba.org/chapters/<chapter>-nemba`). Each lists its recurring "NEMBA Group Ride" events with the next date, time and place, and is the best re-readable source in New England. The site is slow after a burst of requests: fetch one at a time. Chapters with rides read today: southeast-ma, southern-nh, merrimack-valley, rhode-island, blackstone-valley, greater-boston. Chapters read with no group rides listed: central-ct, brattleboro-keene, penobscot-region, wachusett, south-central-ma, midcoast-maine, north-shore-ma, cape-cod, northwest-ct, southcoast, southeast-ct, quiet-corner, central-nh, kearsarge, six-rivers, belfast-area, white-mountains.
- **Ride with GPS club pages** (`ridewithgps.com/organizations/<id>`). The server-rendered HTML lists upcoming events as dated rows; each event page has JSON-LD with the start date and place. Northampton Cycling Club is org 15095.
- **Public Google Calendars.** Papa Wheelies (`avp9pdcdec7ptjencp2m66bsk4@group.calendar.google.com`), Rose Bike (`7hjotrffh9ei6900fnonkg87bc@group.calendar.google.com`) and CRW (`calendar@crw.org`). All three `.../public/basic.ics` feeds load and carry the ride series.
- **Wild Apricot club calendars** (CRW). Event pages `crw.org/event-<id>` carry the ride description and registration.
- **Strava event pages.** B2C2's group-rides page links four event pages (`strava.com/clubs/292828/group_events/1328158/-59/-61/-69`) that load with the date, time and level. Strava club pages (`/clubs/<slug>`) load with a description but hide the events.
- **Shop pages on the Lightspeed/Bike Shop CMS** (`...-pgNNN.htm`): Landry's, Gorham, Pedal Power, Sea Sports, Ten Speed Spokes, Slipping Gears, Milford Bicycle, Riverside Cycle, CycleMania. They state the weekly schedule but carry no dates, so only the footer year and store notices date them.
- **Directories worth a re-read:** Seven Hills Wheelmen's `sevenhillswheelmen.org/resources/recurring-rides/` lists Central MA and the Quiet Corner of CT with years in brackets, and Bike West Hartford's calendar links the Hartford-area groups. Both are leads, not sources.
- **Blogs with weekly go/no-go posts:** Vermont Bicycle Club (`vermontbicycleclub.com`), Portland Velo Club (`portlandveloclub.wordpress.com/pvc-group-rides/`).
- **Dead or blocked:** `portlandvelo.org`, `gswheelmen.org`, `bostoncyclingclub.com`, `hartfordwheelers.org`, `valleybikes.com` (empty page), `massbike.org` (403). Instagram and Facebook posts do not load.

## Re-checked

**Confirmed (19)**
- Danny's Cycles Darien Kids' Ride: page lists Sundays 2 pm, 2026 copyright, undated otherwise.
- Pedal Power Saturday Morning Ride and Sunday Beginner Ride: weekly rides page, 2026 copyright, road season marked finished.
- NHBC Tuesday and Thursday rides: FAQ says Mar-Nov, 5:30 pm; club site has a July 2026 post. FAQ itself undated.
- West Hartford Thirsty Thursdays: 2026 dates listed (next Oct 15, 6:30 pm).
- Conte's Sunday Ride (B2C2): four Strava event pages show Oct 4, 9:00 am, Lexington.
- GBNEMBA Tuesday Western Greenway Social: listed Oct 6, 6-8 pm.
- Gorham Portland Friday Coffee Ride, Saco Tuesday Gravel, Waterville Wednesday MTB: all on a page with a Sept 30 store notice.
- Dover Thirsty Turtle: page and Strava club both say Thursdays 6 pm.
- Dash First Sunday Ride: next Oct 4.
- Sea Sports Coffee Cruise: Saturdays 7:30 am, page lists October 2026 events.
- Slipping Gears Saturday Morning Road Ride: "back for 2026", 8 am.
- Ten Speed Spokes Friday Women's Ride: every Friday 6:30 am, 2026 copyright.
- Vermont Bicycle Shop Pizza Ride: first Saturday 4 pm, April-October, 2026 page (next Oct 3).
- GMBC Wednesday Training Ride: late season at 5:30 pm or earlier until Oct 24.
- CRW Praline Croissant (Oct 2, Oct 9) and Speedy Croissant (Sept 29, Oct 6): in the feed, times unchanged. Oct 9 and Oct 6 are the last dates listed.

**Changed (6)**
- Portland Velo Club Wednesday Night Ride: 5:30 pm is now 5:15 pm, 5:00 pm from Oct 14, last ride Oct 28.
- Sunday Morning Over Easy (QC Bike): weekly is now selected Sundays; Sept 27 was rained out, next Oct 25.
- Bike Newport Full Moon Ride: Oct 26 Harvest Moon, gather 4:15, start 4:45 pm; the Sept 26 ride was cancelled for weather.
- Rose Bike Women's MTB: season May-Oct (last year marked finished from Oct 22); calendar feed added.
- Mama Wheelies and Papa Wheelies Monday: calendar feed added, schedule unchanged.

**Seasonal-break (5)**
- Landry's Boston Slow Roll: season ended 9/14; no Monday ride on the current page. Back spring 2027.
- Riverside Cycle's Judy Jam: host says weekly rides run mid April to mid September.
- Seven Hills Wheelmen Tuesday Night Ride: "Tuesday night rides have ended for the season" (home page, Oct 2026).
- Northampton Cycling Club Wednesday A/B: no Wednesday ride in NCC's October calendar; series is April-September.
- Ranch Camp Ladies Rides: 2026 series ran Jun 1 to Sept 28 and the shop site is on its winter layout. Ride page didn't load; see note below.

## Couldn't re-check (no entry written)

- **Boston Bike Party** (second Friday, 7 pm, Copley). The site states the schedule but is dead: newest posts are 2023, copyright 2023, and the rest is spam. Nothing from 2026 loads. Check Instagram or Facebook.
- **Landry's Needham Women's/Non-Binary MTB Ride** (Tuesday). Not on Landry's current page; nothing says it ended.
- **CycleMania Thursday Night MTB** (Portland). Page states the schedule, has no date at all, and says to call 207-774-2933.
- **Portland Gear Hub Mellow Monday and Thursday Group Ride.** The Gear Hub events page (Squarespace) holds one event, the Oct 17 Gear Again Festival. No rides listed.
- **Queers in Gear Saturday Ride** (Portland). Instagram only; it did not load. Existing source `instagram.com/p/DZXRXl6RINe/`.
- **Providence Bike Jam** (monthly Friday). Instagram @pvdbikejam did not load. Dash's page describes it as monthly on Fridays but that is a third-party note.
- Ranch Camp's ladies-ride page is in the "seasonal-break" list but its own page was not readable. If Robert prefers, drop that entry. The dates came from the existing record.

## Rejected

- **Quinebaug Valley MultiSport** (Putnam and Danielson CT: Sun 8 am road, Mon and Thu 6 pm road, Wed gravel in Woodstock, Wed women's MTB). qvmultisport.com/rides.aspx loads but is copyright 2006-2025 with 2025 dates, and its road season ends late September. Seven Hills Wheelmen lists them as 2026 rides. Not listed; see Couldn't confirm.
- **Boston Bike Party:** website stale since 2023 (see above).
- **Landry's Charlestown Beginner Road Ride** (Sundays 7:30 am): the page says "Ended 9/27". Not added.
- **Blackstone Valley NEMBA "Friday Gravel"** (West Boylston, Oct 2, 6 pm): one dated event, not marked recurring. Not added.
- **Rhode Island NEMBA Big River Technical Exploration Ride** (Oct 3): one-off.
- **Papa Wheelies Thursday Occasional Casual Gravel Ride:** the calendar entry is a 2025 four-week series.
- **Seven Hills "Mill Street ride"** (Coes Pond, Worcester, Sundays 9 am): the listing is dated 2025.

## Couldn't confirm

Local riders: please check these by hand.

- **Landry's Worcester Fast Road Ride.** Sundays 9 am, 30 miles, from 20 Jolma Rd, Worcester, starting Apr 26, 2026. Seen only on Seven Hills Wheelmen's recurring rides page. Contact Landry's Worcester, 508-713-9695. Also Landry's Worcester Road Ride, Wednesdays 6 pm, 17-20 miles, from May 6, 2026.
- **Landry's Needham Intermediate Gravel Ride.** Sundays 8:00 am, 30 miles, store at Needham, on Landry's group-rides page (fetched today). Not added only because of the 3-per-host cap.
- **Sutton Bike Works rides.** Mondays 6 pm, 22 miles, from 4 South Main St, Millbury. Seen on the Seven Hills page; Strava club `strava.com/clubs/2041470` (153 members) loads, events hidden.
- **Trail Snails.** Saturdays 9 or 10 am, off-road, "for slower mountain bikers", locations vary in Central MA. Facebook group `facebook.com/groups/935922771107627`, via Seven Hills.
- **Wachusett NEMBA Monday MTB Rides.** Mondays 6 pm from Apr 20, 2026, locations vary. Seven Hills says "see Wachusett NEMBA Community on Facebook". The NEMBA chapter page lists none.
- **Milford Bicycle Sunday Morning Stroll.** Every other Sunday 8:00 am, "ending with coffee", on the shop's rides page (2026 copyright) with no start place or dates. Phone 508-473-7955.
- **Greater Boston NEMBA Monday Night Beginner Novice Ride.** Named on the chapter page as a long-running beginner ride; no dated listing found. Same page names a Tuesday Women and Gender Expansive Ride co-led by the Hustle Hive; I could not tell if it is the existing Tuesday ride or another. Chapter email greaterboston@nemba.org.
- **Hustle Hive** (Boston women's cycling community). `hustlehive.com` loads with no ride listings.
- **Pride Rides Vermont** (LGBTQ rides). `prideridesvt.org` loads, with the calendar behind a script. Vermont Bicycle Club's blog shows Pride Rides leading a Burlington path ride on Sunday Sept 27, 2026, 10:15 am from South Burlington High School (one-off) and a Presidential Rail Trail ride in August. Check Instagram or Facebook for a regular schedule.
- **The Smackdown** (Providence). Tuesdays 5:30 pm, India Point Park, fast (25 mph+), becomes cyclocross in fall. Listed on Dash Bicycle's page as a ride it does not run. No host page found.
- **Narragansett Bay Wheelmen** (RI). `nbwclub.org` loads (ClubExpress); weekly arrowed rides appear to be for members. 
- **Single Track Sisters and Greater Portland NEMBA** (Portland ME women's MTB and weekly rides). CycleMania's page points to their Facebook pages only.
- **PVC Monday Night Women's Only Road Ride** (Portland ME, 14-16 mph, no-drop, about 16 miles). On CycleMania's undated page; PVC's own page lists no women's ride.
- **Quinebaug Valley MultiSport** (see Rejected). Facebook group announces the MTB rides.
- **Cape Cod NEMBA** and **Cape Cod Cycling Club (C4).** Sea Sports' page names them: NEMBA rides Wed, Fri and Sun at Trail of Tears, West Barnstable (Facebook).
- **Vermont Bicycle Shop "Kelsey's Rides" and "Mark's Rides"** (Barre). Blog categories exist; none had a standing day and time I could read.

## Over the cap (host already at 3) or not added

Listed so nobody re-finds them.

- **Gorham Bike & Ski** (already 3 on the site): Portland Saturday Morning Road Ride 6:45 am (Cape Loop, 18-20 mph, from May 9); Saco Wednesday Night No-Drop Social Ride 5:30 pm from Clifford Park, Biddeford (17-20 mph, from April 1, until the light runs out); Waterville Thursday Night Road Ride 5:00 pm (no-drop, about 20 mph).
- **Landry's** (already 2, plus Braintree): Needham gravel (above), Natick Tuesday MTB at Vietnam Trails 5:30 pm, Braintree Thursday Enduro MTB at Blue Hills 6:00 pm.
- **Northampton Cycling Club** (3 with the two new): Thursday Night D Road, no-drop, about 20 miles from Keyes St, Florence. The event title says "New Time! 4:30"; the text says 5:30. Oct 8, 15, 22, 29.
- **Forest City Cycling:** Thursday Night Ride (38 miles, 2,000 ft, Baxter Blvd).
- **Portland Velo Club:** Sunday Morning Ride, coed, announced by email.
- **Ten Speed Spokes:** Tuesday Morning Interval Session, 6:30 am from Empire Coffee & Tea.
- **Dover Cyclery:** occasional Sunday morning pop-up gravel rides.
- **CRW** (already 2, plus Wednesday Wheelers): Lexington Truant Thursdays, 10 am from the Minuteman Statue, 25 or 33 miles, about 14 mph led (dated Oct 1); Gravel Tuesday Concord Legs (Oct 6); TGIF Unwinder (Fridays through Sept 18).
- **Seven Hills Wheelmen directory:** Upton State Forest MTB (Landry's Westboro, Wed 5:30 pm) and a Milford Bicycle Wednesday MTB duplicate.
- **QC Bike:** a Manchester Young Professionals ride (Aug 7, one-off).

## Stats

- Candidate rides or hosts looked at: about 95
- Page fetches: about 190 (shell and Fetch combined; the NEMBA site was slow, a burst of 28 requests timed out and was repeated one at a time)
- Existing rides re-checked: 37 (30 entries written)
- New rides listed: 33 (22 high, 11 medium)
- Couldn't confirm: 19 leads, plus 7 existing rides with no entry
- Rejected as ended, changed, one-off or stale: 7
- Dry runs passed: yes (33 accepted; 30 entries applied, 43 warnings carried over)

## Sources

Pages read, fetched Oct 1, 2026 unless noted.

- https://www.dannyscycles.com/about/shop-rides-pg576.htm
- https://www.pedalpowerct.com/events/weekly-group-rides-ride-alert-pg505.htm
- https://www.newhavenbicyclingclub.org/general-5 and /news, /upcoming-events, /
- https://bikewesthartford.org/calendar/
- https://bostonbikeparty.com/about-us/ and /
- https://www.landrys.com/pages/landrys-group-rides, /events, /events/events-calendar-pg37.htm
- https://www.b2c2cycling.com/group-rides and sitemap.xml
- https://www.strava.com/clubs/292828/group_events/1328158, 1328159, 1328161, 1328169
- https://www.strava.com/clubs/ThirstyTurtle, /qcbike, /NHBC, /1166157, /sea-sports-cycling, /2041470, /forestcity
- https://www.riversidecycle.com/about/group-rides-pg200.htm
- https://sevenhillswheelmen.org/ and /resources/recurring-rides/
- https://www.nemba.org/chapters/greater-boston-nemba, southeast-ma-nemba, southern-nh-nemba, merrimack-valley-nemba, rhode-island-nemba, blackstone-valley-nemba, central-ct, brattleboro-keene-nemba, penobscot-region-nemba, wachusett-nemba, south-central-ma-nemba, midcoast-maine-nemba, north-shore-ma-nemba, cape-cod-nemba, northwest-ct-nemba, southcoast-nemba, southeast-ct-nemba, quiet-corner-nemba, central-nh-nemba, kearsarge-nemba, six-rivers-nemba, belfast-area-nemba, white-mountains-nemba; https://www.nemba.org/events
- https://www.eventbrite.com/e/gbnemba-tues-western-greenway-social-group-ride-lights-required-tickets-2000658478365
- https://www.cyclemania1.com/articles/routes-rides-pg193.htm
- https://portlandveloclub.wordpress.com/pvc-group-rides/
- https://www.forestcitycycling.org/ and /rideandevents
- https://www.gorhambike.com/articles/group-rides-pg1358.htm
- https://www.portlandgearhub.org/ and /events
- https://www.instagram.com/p/DZXRXl6RINe/ and /pvdbikejam/ (login walls)
- https://dovercyclery.net/ and /group-rides/
- https://www.papa-wheelies.com/pages/group-rides-and-events
- Google Calendar feeds: Papa Wheelies, Rose Bike, CRW (basic.ics)
- https://www.dashbicycle.com/service/group-rides/
- https://www.capecodseasports.com/about/group-rides-clubs-and-community-pg85.htm
- https://www.nohobikeclub.org/group-rides, /calendar, /events
- https://ridewithgps.com/organizations/15095-northampton-cycling-club and events 472018, 476961, 476962, 476964, 478191, 478192
- https://www.slippinggears.com/articles/group-rides-and-events-pg152.htm
- https://www.rosebike.com/events/
- https://qcbike.org/group-rides/
- https://bikenewportri.org/full-moon-rides/
- https://www.tenspeedspokes.com/articles/tss-group-rides-pg37.htm
- https://nbwclub.org/
- https://vermontbicycleclub.com/, /pizzaride/, /47-2/group-rides/, and the posts of 2026/08/27, 2026/09/12, 2026/09/24
- https://thegmbc.com/wed-training-rides/, /sat-training-rides/, /gravel-rides/
- https://www.ranchcampvt.com/
- https://crw.org/events, /Non-CRW-Rides, /event-6814253, /event-6859341
- https://www.milfordbicycle.com/articles/rides-events-pg37.htm
- http://qvmultisport.com/rides.aspx and /
- https://prideridesvt.org/, https://oldspokeshome.com/, https://hustlehive.com/, https://ridestudiocafe.com/, https://www.wheelworks.net/, https://www.berkshirebikeandboard.com/ (read, no rides found)
