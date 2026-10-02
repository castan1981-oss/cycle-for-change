# Second pass, g7-northeast (dc-md-va, pa-nj, new-england)

Agent: second-pass scout, group g7. Date: Oct 2, 2026. Input: 72 leads.

## Counts

| Outcome | Leads |
|---|---|
| proven | 19 (18 records in `g7-northeast.json`, 1 blocked by the per-host cap) |
| gone | 1 |
| still-unproven | 52 |

New records by state: PA 8, MA 3, VA 3, ME 1, MD 1, VT 1, DC 1. Confidence: 3 high, 15 medium.
The file passes `node tools/merge-ride-research.js --dry` (18 accepted, 0 rejected).

## The new records

- **3 Rivers Outdoor Co Thursday Frick Park MTB ride** (Pittsburgh), high. Shop page lists every Thursday May 21 to Oct 29, 2026, 6 pm.
- **Whatever Weds** (Pgh Babes on Bikes, Pittsburgh), medium. Women+ ride, Wednesdays 6 pm from Kindred Cycles, April to August. Set to seasonal-break; the group has not posted 2027.
- **Critical Mass Pittsburgh**, medium. Second Friday, 6:30 pm, Friendship Park. Only a shop's calendar, dated to May 2026.
- **Cape Cod NEMBA monthly chapter ride** (Falmouth), high. Tue Oct 13, 5:30 pm, Goodwill Park; NEMBA's page and the chapter's 2026 list agree.
- **Wachusett NEMBA Monday Night Ride** (Leominster), high. NEMBA's chapter page lists Oct 5, 12, 19, 26 with start addresses.
- **Single Track Sisters** (Portland ME), medium. Women's MTB, Wednesdays 6 pm, place changes weekly. Source is a dated Aug 2026 Press Herald guide.
- **LVCC Wednesday and Friday Morning Rides** (Lehigh Valley), medium. About 9 am, on the Meetup feed. The start is posted a few days ahead, so not high.
- **Dam Good Watts** (Annapolis), medium. Mondays 6 pm, Housley Rd trailhead. Public Google Calendar, no end date.
- **Trek Roanoke Monday FUNday, But Coffee First, M&M MTB** (Salem and Roanoke), medium. All from Roanoke Outside's guide, updated Jun 8, 2026.
- **Pride Rides Vermont**, medium, irregular. LGBTQ rides posted date by date on a public Google Calendar; last one Sept 27. In the host's own words.
- **Vino Velo** (Philadelphia), medium. Saturday 9:00 from Boathouse Row. The Trellis Oct 2026 calendar plus the ride's Strava club text.
- **PAPERtrail Mountain Espresso** (Philadelphia), medium. Saturday 8 am. Shop page undated; The Trellis says dates alternate.
- **NCVC Espresso Ride** (DC), medium. Sunday 9:15 winter or 8:45 summer. The club doesn't say when winter starts. I used 8:45 and said so.
- **Sutton Bike Works Monday ride** (Millbury), medium. Seven Hills Wheelmen's 2026 list, the shop's Strava club and a Mar 2026 article. The shop's own site lists nothing.
- **814 Outdoor Sports Wednesday Night Rides** (Edinboro), medium. Shop page undated. Bike Erie gives a different start place.

Proven but not written: **Landry's Needham Intermediate Gravel Ride** (Sundays 8 am, 30 miles). It is on Landry's own page. Landry's already has three rides listed, so the cap blocks it. The outcome is `proven` and the note says it is not in the JSON.

## What worked

- **Public Google Calendars.** ABRT's calendar (Dam Good Watts) and Pride Rides VT's calendar both loaded as `.ics` with no login. The ABRT embed gave the calendar id.
- **NEMBA chapter pages** (`nemba.org/chapters/<chapter>`) list dated rides with start addresses in plain HTML. Wachusett and Cape Cod were missed in the first sweep because the shop and club pages point to Facebook.
- **Meetup `/events/ical/`** worked for LVCC and CAT.
- **Roanoke Outside's guide** carries a "Updated" date, which turns undated shop pages into medium.
- **A shop's rides page with real dates** (3 Rivers) is the best proof in this group. Most Northeast shop pages carry no dates.

## What didn't

- **Search ran out.** The session's WebSearch cap (200) was spent partway through. I used about 20 searches. The Philly and DC leads that needed a search for a host page stayed unproven.
- **The Trellis calendar** (Philly) is a current, hand-edited list. It gives day and sometimes time but almost never a start place or a host page. Rides found only there stay unproven unless a second source gives a start.
- **QCW's Area Rides page** is undated and says QCW does not run those rides. Treated as a lead, not proof. Fountain, Dirty Thirty, Base Ride and Great Valley 30 stay unproven.
- **Strava club pages** load, but "Upcoming Club Event" says sign up to see details. Pgh Babes, Route 1 Velo, GreenTree and Vino Velo gave a description and no dates. Strava returned a 403 on one later load.
- **Facebook** and **Instagram** blocked or were not tried. Those leads are listed with the public handle or URL in the outcomes file.
- **Meetup private groups** (DIVA, VelocityRiders) show past event titles only.
- **Bot walls:** frederickpedalers.org (captcha), sjwheelmen.org (verification page), gbnemba.org (403 and 500).

## Surprises

- **streetscallingbcdc.com now serves an unrelated Chinese-language university page.** The DC chapter of Streets Calling has lost that domain. streetscallingbc.com is a 2020 shop page.
- **Rapha DC's Sunday ride looks over.** The Strava event's only date is Mar 1, 2026, and the shop at 3210 Grace St shows as closed in search results (snippet only). NCVC's Espresso Ride now starts from High Road Cycling at that address.
- **Keswick Cycle (Glenside) now reads "Chenango Point Bicycle Company, formerly Keswick Cycle."**
- **Greater Boston NEMBA's women and gender-expansive ride** is a Tuesday on the chapter page, a Wednesday on the Eventbrite listing (May 20, 2026) and a Wednesday on Hustle Hive's calendar (Jul 22, 2026). Nobody agrees, and nothing is posted for fall.
- **hustlehive.com is a dead redirect.** The real team site is hustlehivecycling.com.
- **Flock of Cycles** is still on BikePGH's 2026 calendars page, yet BikePGH's own message board has a Nov 2014 "taking a sabbatical" post.
- **The scratchpad folder is shared between agents.** Two of my helper scripts were overwritten mid-run. I moved to a `g7/` subfolder. Anyone running parallel scouts should give each its own folder.

## Where rides are posted here (additions to the field guide)

- Pittsburgh: shop event pages (3rivers), Ike's Basement Bike Shop's calendar, Pgh Babes on Bikes' events page (a Tumblr; the "Repeating Events" block is the quickest list).
- Philadelphia: The Trellis calendar (thetrellisphilly.com/calendar) is the community list. Hosts post on Instagram. PAPERtrail's page is the only Philly shop page with a schedule.
- New England MTB: `nemba.org/chapters/<chapter>` (dated event lists) and Eventbrite organizer pages. A chapter's own site often points to Facebook.
- Roanoke: Roanoke Outside's "Group bike rides for every day of the week."
- Lehigh Valley: LVCC and CAT both run Meetup with `/events/ical/` feeds. Machine-readable.
- Annapolis: ABRT's public Google Calendar (`.ics`). Machine-readable.
- Vermont: Pride Rides' public Google Calendar. Machine-readable.

## Machine-readable feeds seen

- `https://www.meetup.com/lehigh-valley-cycling-club/events/ical/` (about 10 events)
- `https://www.meetup.com/cat-bike-rides-in-the-lehigh-valley/events/ical/`
- `https://calendar.google.com/calendar/ical/abrtmembership%40gmail.com/public/basic.ics`
- `https://calendar.google.com/calendar/ical/k8v6tgk9ocd2mfo7ibjrljdgvk%40group.calendar.google.com/public/basic.ics` (Pride Rides VT; also holds 2020 to 2025 history)
- PAPERtrail's `events/?ical=1` loads but holds no events.

## Rejected and gone

- Rapha RCC DC Sunday Ride: Strava event's only date (Mar 1, 2026) has passed.

## Not listed (events, not rides)

- Highland Orchards Donut Ride, Keswick Cycle, Oct 10 (one-off).
- Tour de Tuckahoe gravel ride (annual).
- CAT Century Classic, Oct 3 (one-off, per CAT's Meetup).
- Bikes & Brews, Foundation Brewing, Portland ME, Oct 24 (one-off, Greater Portland NEMBA).

## Still unproven, best bets for a local to check by hand

Public handles and URLs are in `g7-northeast-outcomes.json`. The ones most likely to be real:

- NCVC Women's Coffee Ride (women@ncvc.net, NCVC Instagram). Monthly or bi-monthly, no day or time.
- Wanderlass MTB, Northwest Night Rides, Coffee Outside Philadelphia, Sunday Funday Gravel (Instagram, via the Trellis).
- GreenTree Thursdays (Strava club says every Thursday 6:30 pm, Marlton NJ).
- Greater Boston NEMBA Monday beginner ride (spring season; ask the chapter).
- Hustle Hive Wednesday ride at Beaver Brook (summer series; ask in spring).
- Landry's Worcester Sunday and Wednesday rides (Seven Hills only).
- Greater Portland NEMBA weekly Wednesday ride.
- Potomac Pedalers Wednesday Night Warriors (restarts in spring).

## Stats

Leads worked 72 · proven 19 · gone 1 · still-unproven 52 · records written 18 · page fetches about 150 · searches about 20 (cap reached).

## Sources read

- https://ncvc.net/rides, https://www.ncvc.net/women
- https://www.thetrellisphilly.com/calendar/, https://qcwcycling.org/arearides, https://papertrailbikecafe.com/espresso-rides/, https://wednightrides.org/
- https://www.strava.com/clubs/126637, /1567535, /532208, /4306, /2041470, /dirty-harrys-bicycles-511515; https://www.strava.com/clubs/1219246/group_events/3462128975154672066
- https://pghbabesonbikes.com/events, /links, /post/779307825378803712/whatever-wednesdays, /post/787432694224224256/whatever-weds-july
- https://3riversoutdoor.com/events/mtnbikerides, https://www.ike.bike/event/pgh-critical-mass-2/, https://www.ternbicycles.com/us/dealers/105062, https://bikepgh.org/shops/, https://bikepgh.org/events/events-calendar/local-cycling-calendars/, https://bikepgh.org/message-board/flock-of-cycles-is-taking-a-sabbatical, https://www.unisonbikelab.com/about
- https://www.nemba.org/chapters/greater-boston-nemba, /wachusett-nemba, /cape-cod-nemba, /greater-portland-nemba; https://www.nemba-capecod.org/2026-chapter-meetings-and-rides/
- https://www.eventbrite.com/e/gbnemba-women-gender-expansive-group-ride-with-hustle-hive-recurring-tickets-1986699725359, https://www.eventbrite.com/cc/gbnemba-events-4277783/, https://www.eventbrite.com/o/greater-portland-nemba-48696676183
- https://www.hustlehivecycling.com/ and /upcoming-events
- https://www.landrys.com/events/landrys-group-rides-pg163.htm, https://www.sevenhillswheelmen.org/recurring-rides, https://www.milfordbicycle.com/articles/rides-events-pg37.htm, https://suttonbikeworks.com/, https://www.myfmtoday.com/good-news/sutton-bike-works-opens-in-millbury-bringing-full-service-bike-repairs-to-blackstone-valley/, http://qvmultisport.com/rides.aspx
- https://www.pressherald.com/2026/08/17/12-group-bicycle-rides-in-greater-portland/, https://portlandveloclub.wordpress.com/pvc-group-rides/, /women/, https://www.cyclemania1.com/articles/routes-rides-pg193.htm, https://gpnemba.org/group-rides-events/
- https://prideridesvt.org/ and /events-and-news/, /why-pride-rides-exists/; the Pride Rides Google Calendar feed; https://vermontbicycleclub.com/category/grouprides/kelseysrides/
- https://www.abrtcycling.com/about/training-rides/, /team-calendar/ and ABRT's public Google Calendar feed
- https://www.potomacpedalers.org/, the ClubExpress calendar and event 2587264
- https://dcpaceline.com, https://www.divacycling.org/, https://www.meetup.com/DIVA-Cycling, https://www.meetup.com/velocityriders
- https://roanokeoutside.com/group-bike-rides-for-every-day-of-the-week/, /location/trek-roanoke/
- https://www.meetup.com/lehigh-valley-cycling-club/ and its ical feed, https://www.lvcycling.club/rides, https://www.meetup.com/cat-bike-rides-in-the-lehigh-valley/ ical feed, https://lvcat.org/group-bike-rides/
- https://www.814os.com/group-rides, https://bikeerie.org/get-involved/rides-groups-activities/
- https://www.tuckahoebikeshop.com/articles/group-rides-pg37.htm, https://www.keswickcycle.com, https://www.phillybiketrain.org/
- https://www.streetscallingbc.com/, https://streetscallingbcdc.com/, https://nbwclub.org/ and its calendar, https://www.capecodseasports.com/about/group-rides-clubs-and-community-pg85.htm
