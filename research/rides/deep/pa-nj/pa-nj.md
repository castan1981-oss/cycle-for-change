# pa-nj: group-ride scout report

- **Area id:** `pa-nj` (Pennsylvania and south and central New Jersey)
- **Agent:** PA/NJ group-ride scout (Claude Sonnet 5.5)
- **Date:** Thursday, Oct 1, 2026
- **Files:** `pa-nj.json` (19 new rides), `upkeep.json` (10 re-check entries), this report
- **Fetch budget:** about 165 page fetches, most of them Meetup pages and calendar feeds. Web search was not available, so no Strava event pages were found (see "Where rides are posted here").

## Summary

**New rides: 19** (18 high, 1 medium). The target was about 25. I did not reach it, and I would rather say so than pad the file. Both dry runs pass.

By city:

- Horsham: 3
- Easton: 2
- Phillipsburg NJ: 2
- Lancaster: 2
- York: 2
- Nazareth: 1
- Breinigsville: 1
- Macungie: 1
- Harrisburg: 1
- Wexford (Pittsburgh): 1
- Harmony (Pittsburgh area): 1
- Medford NJ: 1
- Woodbine NJ (Cape May County): 1

By state: PA 15, NJ 4. By host: SCU 3; Launchpad Bikes 2; Easton Area Cycling Group 2; Lancaster Bicycle Club 2 (plus the Tuesday ride already on the site, so 3); York Bicycling 2; Premier Bicycle Club 2; Harrisburg Bicycle Club 1 (plus 1 on the site); one each for VMB, Fitness Central, LVCC, Outdoor Club of South Jersey and Tuckahoe Bike Shop. No host is over 3.

**Where it is thin.** Nothing new for the city of Philadelphia, the city of Pittsburgh, Reading, Scranton, State College, Erie, Princeton, Cherry Hill or Atlantic City. The scenes exist. The rides I know of there live on Instagram, Facebook and invite-only Strava clubs, or on sites that block robots (the Bicycle Club of Philadelphia is behind Cloudflare). They are in "Couldn't confirm" with what I know. Lehigh Valley, Lancaster/York and the Philadelphia suburbs came out well because those clubs run their dated calendars on Meetup.

**Types.** Road 18 (8 of those also tagged social), mountain bike 1. No-drop in the host's own words: 8. No new queer, women / trans / nonbinary or BIPOC ride made it in; the only ones I found are on the existing list or in "Couldn't confirm".

**Re-check: 18 rides listed already.** 10 got an entry: 5 confirmed, 2 changed, 3 seasonal-break. 8 I could not re-check, and I wrote no entry for them.

## For the editor

- **JSTS weeknight rides changed a lot.** The club calendar moves the Tue / Wed / Thu start from 4:45 pm (week of Sept 29) to 4:30 pm (Oct 6 to 8) and 4:00 pm (Oct 13 to 15), then stops weeknight evening rides after Oct 15. The upkeep entry has `start_times` for it. The site had 5:15 pm.
- **Three rides on the site are over for the season** (HBC Friendship Park, Major Taylor Pittsburgh Wednesdays, Pgh Babes Frigid Witch). Entries are `seasonal-break` with the host's words.
- **SCU's Horsham library ride moved to 10:00 am on Oct 6.** The new record has `start_times` for it. Its Tuesday and Thursday evening rides are 5:30 pm, a new start time per the Thursday listing.
- **Meetup iCal feeds are short.** `https://www.meetup.com/<group>/events/ical/` returns only about the next 10 events (roughly two weeks), so a ride can be missing from it on a given day. I put `feed_url` only on rides I saw in the feed. I left it off the LBC Wednesday ride, which was not in the window, and off LBC's Tuesday upkeep entry for the same reason. The Meetup events page itself (`/events/`) carries about 40 and is the better watch page.
- **Easton Area Cycling's rides start in Phillipsburg, NJ** (Warren County, across the river from Easton). That is not the north Jersey the NYC sweep covers, but check there is no overlap.
- **Tuckahoe Bike Shop is medium.** Its group-rides page states Saturday 8:30 am but carries no 2026 date, and its footer says 2002 to 2025. Treat it as one to confirm by phone or Facebook.
- **Personal phone numbers** appear on the Fran's Friday and LBC Wednesday Meetup pages. I left them out.
- **Premier Bicycle Club** asks for registration on its own calendar and lists a Guest Concierge email on its home page. I put both in `visitor_notes`.

## Why these

- **VMB Jacobsburg Tuesday Group Ride (Nazareth).** New in 2026: a weekly social, no-drop, all-abilities mountain bike ride in a state park, with an evening start and lights.
- **TGIF Ride, Launchpad Bikes (Easton).** A 7 am Friday road ride from the circle in downtown Easton, 17 miles at 13 mph, no-drop, ends with coffee.
- **Coffee Loop, Launchpad Bikes (Easton).** A casual early Sunday spin on the D&L Trail at 10 to 13 mph, no-drop, ends at a coffee house.
- **FC Thursday Java Ride (Breinigsville).** A 7:30 am Thursday road ride from the velodrome lot to Topton for coffee, 14 to 16 mph.
- **A Sunday Ride, LVCC (Macungie).** The Lehigh Valley Cycling Club's social 35-mile Sunday ride at 13 to 14 mph, 9:30 am.
- **Char's Sunday Milford Ride, Easton Area Cycling Group (Phillipsburg NJ).** A weekly 35-mile Sunday ride to Milford, B pace, regroups, nobody dropped.
- **Thursday Milford Ride, Easton Area Cycling Group (Phillipsburg NJ).** The group's 30-mile Thursday-morning version of the same route.
- **Wednesday Morning Breakfast Ride, LBC (Lancaster).** A casual weekday breakfast ride at 9 am for riders who want to stay together and eat.
- **Thursday Evening Special, LBC (Lancaster).** The fast one: A and A+ groups, 20 to 24 mph, a flat-rolling 25-mile loop from Calvary Church.
- **Gung Ho Tuesday B+/A- Ride, York Bicycling (York).** York's 5:30 pm Tuesday road ride, 18-plus mph, no-drop, listed through December.
- **Tuesday Coffee House Ride, York Bicycling (York).** A social 25-mile C ride at 12 to 14 mph from a different coffee shop each week.
- **Owen's Sunday Sociable, HBC (Harrisburg).** An easy 8 to 10 mph spin from City Island at 7:15 am, nobody left behind, breakfast after.
- **Tuesday Evening Ride, SCU (Horsham).** A fast 17 to 19 mph Tuesday road ride from the Horsham library.
- **Thursday Evening Ride, SCU (Horsham).** The 15 to 17 mph no-drop Thursday version, 5:30 pm.
- **Weekday Morning Ride, SCU (Horsham).** The slow one: 30 to 40 miles at 10.5 to 11.5 mph on Tuesday and Thursday mornings.
- **Fran's Usual Friday C/C+ Ride, Outdoor Club of South Jersey (Medford NJ).** A Friday-morning no-drop social ride, 25 to 30 miles at 13 to 14 mph.
- **North Park Loops, Premier Bicycle Club (Wexford).** A Wednesday-evening club road ride around North Park, about 29 miles at 14 mph.
- **Harmony Lake Ride, Premier Bicycle Club (Harmony).** A Wednesday-morning 30-mile club road ride in Butler County.
- **Saturday Group Ride, Tuckahoe Bike Shop (Woodbine NJ).** The shore-area shop's main Saturday ride, four pace groups from 10 mph up to 20 plus. Medium: undated page.

## Where rides are posted here

### Words

- **Group ride**, **club ride**, **shop ride**. A **social ride** or **slow roll** is easy and ends at a café or brewery. **No-drop** means the group waits.
- Pace letters follow the club: **A** (20 plus mph), **B** (15 to 18), **C** (12 to 14), **D** (10 to 12). LBC and SCU also post mph ranges. HBC and Premier use a letter plus a "Moderate / Hilly / Flat" rating.
- Local names: **the Wiss** (Wissahickon Valley Park, Philadelphia), **the D&L** (Delaware and Lehigh Trail), **the Velo** or **the velodrome** (Valley Preferred Cycling Center, Trexlertown), **the Oval** (Pittsburgh's Bud Harris track), **Frigid Witch** (Pittsburgh Babes' winter race).
- **Show and go** means no leader: the route is posted and you ride it.

### Where rides are published

- **Meetup is the best source in this area.** Dated rides, start place and pace on one page, plus an iCal feed. I read these groups: Lancaster Bicycle Club, York Bicycling, Suburban Cyclists Unlimited, Lehigh Valley Cycling Club, Valley Mountain Bikers, Launchpad Bikes Group Rides, Fitness Central Cycling Club, Easton Area Cycling Group (`lvrmbg`), Outdoor Club of South Jersey, CAT Bike Rides in the Lehigh Valley. `https://www.meetup.com/<group>/events/` carries about 40 upcoming events; the iCal feed only about 10.
- **A robot can read a Meetup events page.** The page holds a JSON block (`__NEXT_DATA__`, `__APOLLO_STATE__`) with every event's title, time, venue and URL. Meetup's own find page (`meetup.com/find/?keywords=cycling&location=us--pa--Philadelphia&source=GROUPS`) lists groups the same way.
- **ClubExpress calendars.** Harrisburg Bicycle Club (`harrisburgbicycleclub.org`, club 750678) and Premier Bicycle Club (`premierbicycleclub.org`, club 400812) put the month grid, with every ride's day and time in the link title, in the page HTML. Each ride has an `item_id` page with the location and description.
- **Wild Apricot.** JSTS's ride calendar (`jsts.us/Ride-Calendar`) is server-rendered; each ride's start time is in the link's title text.
- **Google Calendar.** PMTCC (`pmtccrides@gmail.com`) and the Western PA Bicycle Club (`wpabikeclub@gmail.com`) publish public `.ics` feeds. PMTCC's is current; WPABC's has no 2026 ride entries, only meetings.
- **The Trellis** (`thetrellisphilly.com/calendar/`) is the best single list of Philadelphia rides. It is a community page, not a host, so I used it only as a lead and for three re-checks.
- **Shops.** Tuckahoe Bike Shop's group rides page loads. Sourland Cycles' calendar is a public Google Calendar. Many other shops post only on Instagram and Facebook.
- **Strava.** Club pages now ask for a login. I could not search for event pages, so none made it in. Club ids seen on pages I read: GreenTree Thursdays 532208 (Cherry Hill, linked from QCW's page) and Pittsburgh Babes on Bikes 126637.
- **Instagram and Facebook** carry the real schedule for most Philadelphia rides (RAR Philadelphia, Philly Gravel Club, Laurel Hill Fridays, Northwest Night Rides, Wanderlass).

### Rhythm

- Start times slide earlier through October as the light goes: JSTS drops 15 minutes a week, SCU's Thursday ride is a new 5:30 start, HBC's Friendship Park series ended Sept 29.
- A lot of Pittsburgh's rides end in September or October (Team Decaf's season runs to the first Tuesday of October; PMTCC ended Sept 30).
- Morning weekday rides (9 or 10 am) are common in Lancaster, York, Harrisburg and Lehigh Valley. They are retiree-friendly social rides and often the easiest way in.

### Visitor norms

- Many club rides ask for a Meetup RSVP. LBC says only members who RSVP are covered by the club's accident insurance, and it encourages membership. A few LBC rides say membership is required (the CoffeeTue rides do).
- Helmets are mandatory on nearly every ride listed. Lights are required on most evening rides from now on.
- Premier Bicycle Club asks for registration on each ride and has a Guest Concierge. HBC says registration is not required for its rides.

### Re-check sources

| Source | Machine-readable | Use for |
|---|---|---|
| Meetup `/events/` page and `/events/ical/` | yes (JSON block; iCal is short) | all Meetup rides above, LBC Tuesday, CAT |
| ClubExpress calendars (HBC, Premier) | yes (HTML grid) | HBC Owen's, Premier rides |
| `jsts.us/Ride-Calendar` | yes (HTML grid) | JSTS |
| PMTCC Google Calendar `.ics` | yes | PMTCC rides |
| `wednightrides.org` | yes (HTML list, dated posts) | Wednesday Night Rides |
| `thetrellisphilly.com/calendar/` | yes (HTML list) | Philadelphia leads |

## Re-checked

- **Tuesday Training Ride (Lancaster Bicycle Club):** confirmed. Meetup lists Sept 29 and Oct 6 and 13 at 6:00 pm from Calvary Church.
- **Wednesday Night Rides (Philadelphia):** confirmed. Posts for Sept 2, 16 and 30; every other Wednesday; the Sept 30 ride met at 7:00 and rolled at 7:10.
- **CAT Women's Ride (Bethlehem):** changed (visitor notes and refresh only). The Meetup lists every Wednesday through Oct 28 at 6:00 pm. CAT's page says the women's ride is usually Tuesday or Wednesday, so I added a note. Feed added.
- **JSTS Weeknight Rides (Red Bank):** changed. Start now 4:45 pm, then 4:30 pm Oct 6, then 4:00 pm Oct 13; no weeknight evening rides after Oct 15.
- **UA Friendship Park Evening Rides (HBC, Mechanicsburg):** seasonal-break. The Sept 29 ride was titled "final ride"; nothing after it.
- **Major Taylor Cycling PGH Wednesday Ride:** seasonal-break. The calendar lists a "Final PMTCC Weekly Wednesdays Ride" on Sept 30.
- **Pgh Babes on Bikes Frigid Witch Training Rides:** seasonal-break. The 2026 series ran Jan 4 to Feb 8.
- **Après Gravel (Philly Gravel Club):** confirmed from the Trellis only, Monday 6pm no-drop.
- **Gravel Espresso (PAPERtrail Bike Cafe):** confirmed. Host page says April to October, Wednesdays 6 pm; the Trellis lists it now. The host page has no date.
- **Laurel Hill Fridays:** confirmed from the Trellis only, Fridays 6:45am.

The three Trellis-based confirmations are weaker than the others. The host pages for Après Gravel and Laurel Hill Fridays did not load, and PAPERtrail's carries no date.

## Couldn't re-check

No entry written for any of these.

- **Saturday No-Drop Road Ride (Sourland Cycles, Hopewell):** the group rides page loads but still talks about a July 2024 ride, and the shop's public calendar has no weekly rides; its last group-ride entries are Mar to May 2026 (a Women's Group ride Apr 1, a Women's Needle Creek Ride May 7). Nothing current for Saturday 9:00.
- **Women's Wednesday Road Ride (Sourland Cycles, Hopewell):** same page, same problem. The page lists Wednesday evenings, start between 5 and 6 pm, with no 2026 date.
- **Slow Roll Erie:** Bike Erie's rides page is an old page (its page data says 2015) and its events page is gone. Facebook would not load.
- **Girls Gone Cycle Monday Ride (Fairview):** same Bike Erie page (Mondays April to August, 5:45 pm). It is an undated page and there is no 2026 signal. The shop behind it, Competitive Gear in Erie, has a page for it but no dates.
- **RAR Philadelphia Group Rides:** the chapter page loads and is current (news items dated 2026), but states no schedule. The Trellis lists an RAR "Seasons Change Morning Ride" on Oct 13 and a bikepacking trip Oct 31 to Nov 1. The schedule is on Instagram (`@rar.philadelphia`, from the chapter page).
- **Sunny Sunday D Ride (Bicycle Club of Philadelphia):** phillybikeclub.org returns a Cloudflare "Just a moment" page. Not tried further.
- **Team Decaf Tuesday Ride (Pittsburgh):** WPABC's event page is a 2023 event, and its public Google Calendar has Team Decaf only through 2025 (at 6:15 pm, not 6:00) and a ride-leader meeting on Mar 25, 2026. The 2025 entries say rides run "every Tuesday from April until the first Tuesday in October", so Oct 6 would be the last. Nothing from 2026 shows the ride. The existing record says 6:00 pm; the 2025 feed says 6:15.
- **State College Cycling Club Tuesday Ride:** the ride info page states 5:30 pm in April and September and 6:00 pm May to August, rotating parks, but not October. Its calendar is a script that does not load for a robot. No 2026 date.

## Rejected

- **Wednesday Night B Ride (Outdoor Club of South Jersey, Mount Laurel):** the Meetup titled the Sept 30, 2026 ride "Last Wed Night B Ride of the season!". Ended for the year.
- **PMTCC Slow Roll (Pittsburgh):** a biweekly Monday ride; its calendar rule ends Sept 1, 2026. Season over.
- **PMTCC Weekly Wednesdays Ride:** see Re-checked; seasonal-break, Sept 30.
- **South Jersey Wheelmen:** the club's page says "We do not have regular weekly rides". Not a recurring ride.
- **Pgh Babes' Whatever Wednesday W+ ride (Kindred Cycles):** the events page lists it Apr 22 to Aug 31, 2026 and nothing after. Looks over for the season; the page is an August snapshot.
- **McCall Collective Tuesday Night Stress Reliever (Breinigsville):** the Meetup lists one on Sept 29 and none after, and the group name says it is moving to Strava in September. Not listed.
- **Central Jersey Trail Cycling (Lawrence NJ):** one event only (Oct 6). Not recurring.
- **Bucks and Hunterdon Biking and Hiking Group:** a different ride each week from a different place. Not a fixed ride.
- **York Bicycling Sunday Gravel (Hollow Creek):** one listing (Oct 4, 12:01 pm). The host's text reads like a fall series, but only one date is posted. Not listed.
- **York Bicycling Thursday Gung Ho B Pace:** the start moved from Dover Township Community Center (Sept 17, 24) to Cousler Park (Oct 1) and nothing is posted after Oct 1. Not listed.
- **Lesbians Who Love to Bike, Hike and the Outdoors (East Brunswick NJ):** the Meetup has events in 2024 and one in May 2026, nothing upcoming. Not a recurring ride.

## Couldn't confirm

For a local rider to check by hand. Handles and URLs appear only where a page I read linked to them.

- **Vino Velo.** Saturday, 9:00 am from Lloyd Hall (Boathouse Row) to Ambler, 35 to 40 miles, fast, "they will not wait". QCW Cycling's undated Area Rides page (`https://qcwcycling.org/arearides`); the Trellis lists it as an A and A- ride.
- **Fountain Ride.** Tuesday and Thursday, 6:00 pm from the Italian Fountain (Chestnut Hill / Lower Merion), 35 to 40 miles, no regroup. QCW's Area Rides page, undated.
- **Dirty Thirty.** Wednesday, 6:45 am, from the Trellis (Paine's Park) by West River Drive, about 25 miles, fast drop ride. QCW's Area Rides page, undated.
- **Base Ride.** Sunday, 8:45 am from the DAWG (25th and Pennsylvania Ave), 45 to 60 miles, steady and no-drop. QCW's Area Rides page, undated.
- **GreenTree Thursdays.** Thursday, 6:30 pm, a drop ride around a one-mile loop in Cherry Hill NJ, with a "death march" variant over the Ben Franklin Bridge. QCW's page links its Strava club (`https://www.strava.com/clubs/532208`, titled GreenTree Thursdays (TRAINING crit)) and a Facebook group; both need a login.
- **Great Valley 30.** Thursday, 6:00 pm, a fast flat circuit around Great Valley Corporate Park. QCW's Area Rides page, undated.
- **Coffee Outside (Philadelphia).** Sunday, 9:30 am, Fairmount Park, coffee then a mixed-terrain ramble. The Trellis calendar (2026) and a Jan 2025 Trellis article.
- **Sunday Funday Gravel (Philly Gravel Club).** Sunday, intermediate no-drop gravel, dates alternate. The Trellis calendar. Instagram likely.
- **Sunday Bike and Coffee.** Sunday, multiple ride options from South Philly, listed by the Trellis under "Nomadic Bikes". The Trellis calendar only.
- **Northwest Night Rides.** The alternate Wednesdays to Wednesday Night Rides, 7 pm, social and beginner-friendly, faster and hillier. The Trellis calendar and a Trellis article; no site found.
- **Philly Bike Train.** A group commute to Center City from several starts, 8 am every other Wednesday. The Trellis calendar. `phillybiketrain.org` loads as a script-only page.
- **Wanderlass MTB.** Bi-weekly all-abilities women's mountain bike ride, Saturday. The Trellis calendar says to check its page for time and day.
- **PAPERtrail Mountain Espresso.** Saturday mountain bike loop in Wissahickon Valley Park, dates alternate. The Trellis calendar.
- **Belmont Thursday and MTB Fight Club.** Thursday mountain bike laps at Belmont Plateau, 6:30 pm. The Trellis calendar and QCW's page.
- **Phixed Friday.** Fixed-gear rides and races, "not just Fridays". The Trellis calendar.
- **Philly Bike Party** (monthly themed ride) and **Philly Full MOOn Ride** (Oct 25, Nov 24, Dec 23). The Trellis calendar and article.
- **Whatever Weds (Pittsburgh).** Women plus group ride from Kindred Cycles, Wednesdays, seasonal; see Rejected for the dates. `https://pghbabesonbikes.com/events`.
- **Mixed Surface group ride, Unison Bike Lab (Pittsburgh).** Monday, alternating weeks. `https://pghbabesonbikes.com/events` repeating-events list.
- **MTB group ride at 3 Rivers Outdoor Co (Pittsburgh).** Thursday. Same list.
- **Coffee Outside Ride (Pittsburgh).** Sundays, April to November. Same list.
- **Critical Mass (Pittsburgh).** Second Friday of the month. Same list.
- **Pgh Babes Strava club** `https://www.strava.com/clubs/126637`, linked from the group's links page; needs a login.
- **Flock of Cycles (Pittsburgh).** "Several rides a month, usually leaving out of Oakland." BikePGH's local calendars page (updated May 27, 2026); `flockofcycles.org` did not load.
- **Dirty Harry's weekly mountain bike rides (Verona).** BikePGH's calendars page; `dirtyharrys.net` not read.
- **Edinboro Group Rides (Erie).** Wednesdays 6:00 pm from the lot behind Sox Harrison Stadium, helmets required. Bike Erie's rides page, an undated page.
- **Presque Isle Cycling Club and Erie Outing Club (Erie).** Named on Bike Erie's page; not read.
- **CAT "Over the Hill" weekday rides and weekend rides (Bethlehem).** CAT's page says weekday mornings and weekends from the Walnut Street co-op; the Meetup has only one Over the Hill ride posted (Sept 30, 10 am, Ironton Rail Trail).
- **LVCC Wednesday Morning Ride and Friday Morning Ride.** Meetup lists both weekly at 9:00 am with no start place ("details posted closer to the ride").
- **Caffeinated Cyclist (Pitman NJ), Action Wheels (Deptford NJ), Peddler Shop (Deptford NJ), Sneakers & Spokes (Woodstown NJ).** South Jersey Wheelmen's page of "weekly bike shop rides", dated winter 2023 to 2024 and summer 2024. The shops' sites did not show group rides.
- **Jersey Shore Cycle Club and Tour de Tuckahoe gravel ride.** Linked from Tuckahoe Bike Shop's group rides page on Facebook (`https://www.facebook.com/JerseyShoreCycleClub/`, `https://www.facebook.com/TuckahoeGravelGrinder`); need a login.
- **Keswick Cycle (Paoli), Highland Orchards Donut Ride Oct 10.** The Trellis names it. The site did not load for me.
- **Scranton, Reading, State College (beyond SCCC), Princeton, Atlantic City.** Nothing with a dated schedule that loads. I found no Meetup groups with upcoming rides for Scranton or Reading, and no club page for the Princeton / Atlantic City area besides Sourland and JSTS.

### Extras over the 3-per-host cap or held back

- LBC: CoffeeTue (Tuesday 9:00 am from rotating starts; the Meetup text says membership is required), Saturday and Sunday ride menus.
- Premier Bicycle Club: Launch to Lunch (Wednesday, 9:45 am).
- Launchpad Bikes: Pedal in Pursuit of Pizza (Sunday, 11:45 am, D&L trailhead in Easton).
- SCU: Friday Frolic (Fridays 9:30 am, no start place), Souderton Out and About (Mon and Wed 5:30 pm), Flourtown C/C+ (Wed 5:30 pm).
- HBC: the Hershey evening rides (Mon, Tue and Thu, 5:00 to 5:30 pm; the Monday ones are not listed past Sept 28) and the weekday Carlisle and West Shore flex rides.

## Stats

- Candidates looked at: about 60 (rides and groups)
- Listed: 19 (18 high, 1 medium)
- Couldn't confirm (leads in the list above): 32
- Rejected as ended, seasonal-over, one-off or moved: 11
- Re-check: 18 rides, 10 entries (5 confirmed, 2 changed, 3 seasonal-break), 8 couldn't re-check
- Dry runs: `merge-ride-research.js` accepted 19 of 19; `rides-apply.js` accepted all 10 entries and the validator found no new errors

## Sources

- https://www.meetup.com/lancaster-bicycle-club/ (events page and iCal feed; event pages 316595290, 316519444, 316587438)
- https://www.meetup.com/york-bicycling/ (events page, iCal feed, event pages 316490022, 316773808, 315672946, 316772938)
- https://www.meetup.com/suburban-cyclists-unlimited-meetup/ (events page, iCal feed, event pages 316489981, 316616768, 316580230)
- https://www.meetup.com/lehigh-valley-cycling-club/ (events page, iCal feed, event pages 316739486, 316623821, 316475353)
- https://www.meetup.com/valley-mountain-bikers-group-rides/ (events page, iCal feed, event 316587469)
- https://www.meetup.com/launchpad-bikes-group-rides/ (events page, iCal feed, events 316525643, 316551651, 316648308) and https://www.launchpadbike.com/
- https://www.meetup.com/fc-cycling-club/ (events page, iCal feed, event 316707967)
- https://www.meetup.com/lvrmbg/ (events page, iCal feed, events 316552565, 316512993)
- https://www.meetup.com/outdoor-club-of-south-jersey/ (events page, iCal feed, event 316758786)
- https://www.meetup.com/cat-bike-rides-in-the-lehigh-valley/ (events page, iCal feed) and https://lvcat.org/group-bike-rides/
- https://www.meetup.com/premier-bicycle-club/, https://www.meetup.com/bicycles-plus/, https://www.meetup.com/central-jersey-trail-cycling/, https://www.meetup.com/bucks-and-hunterdon-biking-and-hiking-group/, https://www.meetup.com/mccall-collective-cycling-running/, https://www.meetup.com/LESBIANS-WHO-LOVE-TO-BIKE-HIKE-AND-THE-OUTDOORS/, https://www.meetup.com/hikers-cyclers-and-kayakers-of-central-jersey/, https://www.meetup.com/saddle-up-for-our-social-rides/, https://www.meetup.com/pittsburgh-and-beyond-bicyclers (events pages, nothing recurring)
- Meetup find pages for cycling keywords in about 20 Pennsylvania and New Jersey cities
- https://harrisburgbicycleclub.org/content.aspx?page_id=4001&club_id=750678 (and item pages 2924775, 3060017, 2924117)
- https://www.premierbicycleclub.org/content.aspx?page_id=4001&club_id=400812 (and item pages 3088337, 3081076) and https://www.premierbicycleclub.org/
- https://www.jsts.us/ and https://www.jsts.us/Ride-Calendar
- https://wednightrides.org/ and https://wednightrides.org/posts/2026/09/271/ride
- https://pmtcc.org/ and its Google Calendar feed (pmtccrides@gmail.com)
- https://wpabikeclub.com/ (Team Decaf pages, Club Google Calendar feed wpabikeclub@gmail.com)
- https://pghbabesonbikes.com/, /events, /links
- https://www.bikepgh.org/events/events-calendar/local-cycling-calendars/
- https://www.thetrellisphilly.com/calendar/ and https://www.thetrellisphilly.com/ride-all-the-rides-six-social-cycles/
- https://papertrailbikecafe.com/group-rides/
- https://radicaladventureriders.com/chapters/philadelphia
- https://qcwcycling.org/arearides
- https://www.sourlandcycles.com/about/sourland-cycles-group-rides-pg229.htm and the shop's public Google Calendar feed
- https://bikeerie.org/get-involved/rides-groups-activities/ and https://www.competitivegear.com/articles/girls-gone-cycle-pg186.htm
- https://www.statecollegecycling.com/general-ride-information and /calendar
- https://www.tuckahoebikeshop.com/articles/group-rides-pg37.htm
- http://www.sjwheelmen.org/ and /r_non-club.html
- https://trophybikes.com/category/urban-rides/ (one-offs only)
- https://phillybikeclub.org/bcpdo/ride/calendarweekly (Cloudflare, not read)
