# Second pass, group g4-plains-mtn (plains, mountain-west, co)

Agent: second-pass scout. Date: 2026-10-02. Input: 72 leads in `g4-plains-mtn-leads.json`.

## Counts

- Leads worked: 72
- Proven: 9 leads, which became 12 new ride records (`g4-plains-mtn.json`)
- Gone: 0
- Still unproven: 63
- The 12 records pass `node tools/merge-ride-research.js --dry`: 12 accepted (CO 6, NM 3, UT 2, AR 1). High: 5. Medium: 7.

## New records

| Ride | City | Lead | Confidence |
|---|---|---|---|
| Saturday, Saturday! Shop Ride (some Saturdays, 8:00 am) | Longmont CO | Long Mont Velo Saturday | medium |
| HRCC Masters Thursday Coffee Ride (8:30 am, Mike's Bikes) | Highlands Ranch CO | HRCC Masters coffee ride | high |
| HRCC Masters Tuesday Ride (8:30 am, South Platte Reservoir lot) | Littleton CO | same lead, second ride | high |
| RMCC Saturday Fall Road Ride (8:45 meet, 9:00 roll) | Golden CO | RMCC Saturday road | high |
| Front Range Mountain Bikers Monday Ride (5:00 pm) | Golden CO | Front Range Mountain Bikers | high |
| Buffalo Lodge Bike Tribe Saturday Group Ride (10:00 am now) | Colorado Springs CO | Manitou Spokes | high |
| Cycling Peeps Saturday Spin (women, time on each event) | Albuquerque NM | Cycling Peeps | medium |
| Cycling Peeps Wednesday Wheelers (women, 8:30 am) | Albuquerque NM | same lead, second ride | medium |
| Albuquerque Critical Mass (last Friday, 6:30 pm) | Albuquerque NM | Albuquerque Critical Mass | medium |
| Weeknight Worlds / Tuesday Night Worlds (some Tuesdays, 5:55 pm) | Fayetteville AR | Weeknight Worlds | medium |
| Mondays to the Marina (most Mondays, evening) | Salt Lake City UT | Bonneville Social Series | medium |
| Happy Camper Deli Ride (every other Thursday, 10:15 am) | West Jordan UT | Bonneville Social Series | medium |

## What worked

- **Meetup group pages load with curl, with no login.** The page carries a `__NEXT_DATA__` block with the next events and a short run of past ones. The `?type=past` page gives about ten past events, enough to see whether a ride is weekly. The lead file said Meetup "returned 403 to a robot" and that feeds showed one date. Both were wrong for most groups: the ical feed lists only upcoming events, and next week's ride is often not posted yet.
- Past events settled "is it weekly" for HRCC Masters (Tuesday and Thursday), Front Range Mountain Bikers (Mondays), RMCC (Saturdays) and Buffalo Lodge (Saturdays). They also showed Long Mont Velo's Saturday is not weekly.
- The Albuquerque Bike Calendar (abq.bikecal.org, a shared Gancio calendar) has an ics feed at `/feed/ics` and a dated history for Critical Mass.
- The Bonneville Cycling Club calendar page loads by script, but the ride data is inside the page source as JSON (name, date, meeting place). It says "Anyone, member or not, is welcome to join any ride!"

## What didn't

- Facebook and Instagram pages would not load (error, login or "temporarily blocked"). All the Kansas City, Wichita and Albuquerque Facebook-only groups stay unproven.
- WebSearch ran out of budget partway (the session cap was spent), so I could not run `site:strava.com group_events` hunts. Strava club pages load but hide the event list.
- Private Meetup groups (Weekday Warriors, Cycling Peeps) show title, day and time to anyone but hide the start place. Cycling Peeps is listed with the start place null and a note to join the free Meetup group. Weekday Warriors is not listed.
- Off-season rides are not proven: Omaha Pedalers (Finished for the Season, Oct 1), Omaha Velo (May to September), Los Alamos Tuff Riders (May to September), Billings Wednesday MTB (ends early October), Kansas City BRBC Saturdays (March to September). Re-check these in April.
- The Alpine Shop (St. Louis) site returns 403. WebFetch needed a permission I did not have.

## Surprises

- **Little Rock days in the lead file were off by one.** The City of Little Rock list shows the CARVE 5:45 pm ride and the CATA mountain bike ride on Thursday, not Wednesday. RevRock runs Tuesday and Thursday, not Tuesday and Wednesday. I parsed the table by row group to be sure. The lead's own source had been misread, so the Little Rock leads (41, 44, 43) carry the corrected days in their notes.
- **team-carve.com, the CARVE site the city links to, is now an unrelated spam page.** Treat CARVE's rides as unconfirmed. centralarvelo.org does not list group rides.
- **Cycling KC's calendar is a Styled Calendar embed.** The embed's id is in the page, but its data endpoint answers with the app shell. A person can read it; a robot cannot.
- **BMA's BIPOC and BiciFiesta rides look dormant.** The Boulder Mountainbike Alliance's own feed has no 2026 entry for either, and the last on the site are July 5, 2024 and May 12, 2022. The Diversity page still lists them as monthly. BMA also runs Monday and Thursday "Nite Rides" in October (Oct 5, 8, 13, 21, 29), which are not on the site yet; they could be a new lead for the Colorado area.
- **The HRCC Masters ride asks for a signed waiver and invites riders to join.** I put that in the visitor note, not "open".
- **Existing record check.** WTCA's Lubbock page also lists a Tuesday and Thursday 5:30 pm drop ride (17 to 19 mph) from Ransom Canyon Center, next to the 8:00 am no-drop ride already listed.
- **The Bonneville page JSON exposes ride leaders' personal emails and phone numbers.** I did not record any of it. Nothing in the output files holds a personal contact.
- The Mondays to the Marina ride was not posted for Oct 5, so it is recorded as irregular, not weekly.

## Leads for a later pass (not listed)

- Long Mont Velo Velobelles (women's rides, drop and no drop), named in the shop's Meetup about text. No dates seen.
- Bonneville Cycling Club: Murray Scenic Social (Wednesday mornings, weekly from July to Sept 30, now replaced Oct 7 by Hillcrest Sociable) and Tour De Maverick Social (Sept 3 and Oct 1 only, perhaps first Thursdays).
- Missoula: Gravel Heaven (Thursdays, IG @gravel_heaven), Tuesday Hell Ride (IG @missoulahellride), Women Bike Missoula (several social rides a month). All from MT Alpha Cycling's local rides page.
- Bentonville Ride Club (Strava club 685696, bentonvillerideclub.com): not checked for dates.
- Cycling Peeps "Wheely Good Thursday" (Oct 1, 8:30 am): one date only.
- ZiaVelo Saturday no-drop ride (Milagro Coffee y Espresso, 1733 E University Ave, Las Cruces, 8:00 am from late September): host page last changed Jan 2023.

## Sources read

- Meetup groups: long-mont-velo-bikeshop, hrcc-masters, front-range-mountain-bikers, rocky-mountain-cycling-club-rmcc, buffalo-lodge-bike-tribe, cyclingpeeps, boulder-mountain-bikers, christian-cycling-club-denver-spoke, denver-bicycle-touring-club, e-bike, weekday-warriors-of-northern-colorado, two-wheel-therapy-co-springs, loveland-mountain-c, ElPasoBicycleClub (list pages, event pages and ical feeds)
- https://abq.bikecal.org/ (home, tag page, event pages, `/feed/ics`)
- https://www.bccutah.org/ and `/rides/calendar/2026/09`, `/2026/10`, `/rides/5331`, `/rides/5337`
- https://bikeclub.bike/rides/ and https://www.strava.com/clubs/bikeclubNWA
- https://bouldermountainbike.org/group-rides, its events ical, DEI page, BIPOC and BiciFiesta event pages
- https://www.wmbacos.org/group-rides, https://www.wheatridgecyclery.com/articles/wheat-ridge-bike-club-pg560.htm
- https://durangowheelclub.com/, https://www.strava.com/clubs/1965215
- https://www.oldtownbikeshop.com/articles/clubs-group-rides-pg1140.htm
- https://bikewalkkc.org/education/womenbikekc/resources/, https://www.cyclingkc.org (weekly rides, calendar), https://www.blueriverbicycleclub.com/weeklyrides
- https://nmcycling.org/grouprides.html, https://www.fattirecycles.com/, https://www.twowheeldrive.com/, https://www.russmccoy.com/find-a-group-ride-nm
- https://www.bicyclepedaler.com/articles/rides-events-pg202.htm
- https://littlerock.gov/residents/bikeped-little-rock/community/weekly-activities/ and `/clubs/`, https://www.revrockcycling.com/ and `/rides`, https://www.centralartrail.com/, http://team-carve.com/, http://centralarvelo.org/
- https://gallatinvalleybicycleclub.org/riding/weekly-rides/, https://bozemanpedalproject.com/, https://www.southwestmontanamba.org/, https://www.eaglemount.org/
- https://www.visitbentonville.com/blog/stories/post/bentonville-group-rides-your-guide-to-the-citys-cycling-scene/, https://www.strava.com/clubs/2100996, https://www.allbikeswelcome.org/ and `/events`
- https://opbc.clubexpress.com/, https://www.omahavelo.com/group-rides
- https://tuffriders.org/ride-with-us, https://santafefattiresociety.org/events/
- https://billingstrailnet.org/events-calendar/, https://www.spokeshop.com/about/rides-events-calendar-pg238.htm
- https://www.mtalphacycling.org/local-group-rides.html, https://www.freecycles.org/events
- https://elpasobicycleclub.com/club-rides/, https://bikewtca.org/club-rides/
- https://www.maddogcycles.com/articles/local-rides-clubs-pg671.htm, https://www.strava.com/clubs/65876
- https://ziavelocycling.com/ziavelo-group-rides/ (and its WordPress modified date), https://www.velocruces.org/ (rides, organizations-resources, ride-with-grace)
- https://www.gilahikeandbike.com/, https://www.bigshark.com/articles/group-training-rides-pg334.htm
- Blocked or empty: Facebook and Instagram pages, https://www.alpineshop.com/ (403), Strava club event lists (login), https://embed.styledcalendar.com/ data endpoint.
