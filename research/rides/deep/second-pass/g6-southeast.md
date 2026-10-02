# Second pass, group g6-southeast (Oct 2, 2026)

Areas: ga-sc, nc-tn, florida, gulf-south. Agent: second-pass scout. Input: `g6-southeast-leads.json` (99 leads).
Outputs: `g6-southeast.json` (18 new records), `g6-southeast-outcomes.json` (99 entries).

## Counts

| Outcome | Leads |
|---|---|
| proven | 16 |
| gone | 1 |
| still-unproven | 82 |

The 16 proven leads gave 18 records: the Boca Raton Bicycle Club lead became three rides, the Baton Rouge Bike Club lead became two, and Black Spoke Society's Fourth Sunday ride came out of a lead that turned out to be gone. Two Seminole Cyclists leads (Friday, Wednesday) are proven but not in the JSON, because of the 3-rides-per-host cap. By confidence: 15 high, 3 medium. The dry run of `tools/merge-ride-research.js` accepts all 18.

Five of the "still-unproven" leads are rides the site already has (Boone Monday and Food Lion rides, Crank Arm, Get Up N Ride, Downtown East). Their notes say so.

## What worked

- **Triangle calendar with an ICS feed.** `bikethetriangle.com/events/?ical=1` (GoTriangle's WordPress Events Calendar) lists Durham rides with real dates. `&tribe-bar-date=YYYY-MM-DD` pages through it. It proved Rescue Racing, Pony Ride and Scrappy Tuesday. It also lists dozens of Raleigh, Cary and Chapel Hill rides nobody has added yet.
- **Bike Durham's monthly ride-calendar image** (bikedurham.org/events, "Updated September 2026"). It is a PNG, so a plain fetch can't read it; downloading it and reading it as an image works. It showed the Black Spoke Society Wednesday ride is gone and what replaced it.
- **Downtown Durham Inc's event pages** (The Events Calendar) carry Black Spoke Society's First Tuesday and Fourth Sunday rides with next dates.
- **WildApricot club calendars** (Seminole Cyclists): one recurring event page lists every 2026 date, plus a "Waiver Only" option that lets guests ride three times.
- **ClubExpress event pages** (Boca Raton Bicycle Club): the calendar renders by script, but each event is a plain page at `content.aspx?page_id=4091&club_id=195201&item_id=N`. Item IDs run in sequence, so a small loop lists the series.
- **RideWithGPS organization events JSON** (`ridewithgps.com/events.json?organization_id=1719`, Baton Rouge Bike Club). Found by decoding the club's Google Calendar embed, which was an imported feed of the RWGPS events.
- **Trek Auburn's events page** lists CAMP's Tuesday ride by date.
- **NOBC's Rides page** has "As of September 2026" edits, so it is current.

## What didn't

- Web search ran out (the shared cap of 200 calls) while I was on lead 20 or so. Everything after that was direct fetches. Many leads had no link, so I could not try them.
- Facebook returns a login wall or "temporarily blocked". About 30 leads are Facebook-only (Atlanta clubs, Miami and Broward critical masses, Lafayette, Tuscaloosa).
- Groups.io (East Side Pedal calendar), the Atlanta Cycling rides list, SORBA Orlando's Wix calendar and lauderale.co loaded empty or behind a bot wall.
- Undated shop pages (Nashville Local Cycling, Ride615, Reality Bikes, Cycle Center, Pro Cycle's seasonal rides, VeloCity's Major Taylor listing, Naples Velo) stayed unproven. I did not list a ride whose page shows no 2026 date at all.

## Surprises

- **Black Spoke Society's Wednesday ride is gone.** Bike Durham's Sept 2026 calendar and Downtown Durham Inc show only a First Tuesday ride (already listed) and a new Fourth Sunday ride, 10:00 am at CCB Plaza.
- **Durham's "Crank Arm" lead is Raleigh's ride.** The dated calendar puts the Wednesday ride at 319 W Davie St, Raleigh, 6:30 pm, not Durham at 7:00.
- **The Scrappy Tuesday start differs by source.** Bike the Triangle says CCB Plaza ("meet at the Bull"); Parts & Labor and Bike Durham's graphic say Bullseye Bicycle. The record says so.
- **Baton Rouge Bike Club's own Google Calendar stopped in April 2019.** The live data is the imported RWGPS calendar.
- **Boca Raton Bicycle Club posts its weekly rides in batches.** The newest batch ends Sept 24 to 29, 2026. The next one is not up yet, so these rides need a recheck in October.
- **Queen City Winter Bike League's Strava text ("Sundays at 10 am starting 12/4") is from 2022.** Dec 4 fell on a Sunday that year.
- **Seminole Cyclists look members-only** ("The marshal will verify who is a member") until you read the join page: a waiver lets a guest ride three times.
- **Major Taylor Cycling Club of Alabama's Thursday B-Ham Turn-Up** appears only on VeloCity's undated page; the club's own WordPress site lists no ride.

## Why these (new records)

- Seminole Cyclists Signature Saturday (Lake Mary, 7:30 am): the club's flagship, pace groups from 18 to 25+ mph, guests get three rides.
- Seminole Cyclists Festive Tuesday (Longwood, 6:30 pm): a 18-20 mph recovery chat ride with beer after.
- Seminole Cyclists Sunday Breakfast (Sanford, 8:00 am): 29 miles from a coffee shop.
- Rescue Racing / Daily Beer Bar ride (Durham, Wed 6:00 pm): two pace groups from downtown.
- Pony Ride (Durham, 2nd Tuesday): short, slow, ends at a brewery.
- Scrappy Tuesday (Durham): the weekly Tuesday night ride, a bit spicier than the other cruiser rides.
- Black Spoke Society Fourth Sunday (Durham, 10:00 am): no-drop, social pace, for Black and queer riders per Bike Durham's guide.
- Bike Durham Community Ride (4th Monday): the advocacy group's own easy ride, medium (start from its March 2025 guide).
- NOBC Giro (New Orleans, Sat and Sun 7:00 am): the big weekend training ride, visitors told to ask.
- Gretna Social Riders (Fri 7:00 pm) and Sistahs on Wheels (first Friday 7:30 pm, City Park): NOLA Social Ride's current list; medium.
- Boone Bike & Touring Wednesday Night Ride from Basil's: 18-20 mph, no-drop with regroups; medium, seasonal.
- CAMP Tuesday Night Ride and Grill (Auburn): Chewacla State Park, 5:30 pm, dated on Trek Auburn's page; medium.
- Baton Rouge Bike Club Shenandoah Shuffle (Tue 5:30 pm, Capitol Cyclery) and Tour du Cafe C Ride (Sun 11:30 am): both no-drop C pace.
- Boca Raton Bicycle Club: Tuesday A1A Ride (Delray Beach), Saturday Breakfast Club Ride (Boca Raton), Thursday B+ Ride (Delray Beach). One free ride for non-members.

## Rejected / gone

- Black Spoke Society Wednesday 6:00 pm ride (Durham): not on the Sept 2026 calendar; replaced by monthly rides.
- Not added, wrong match: Crank Arm Durham (is the Raleigh ride, already listed); Boone Monday Bistro and Food Lion TNR (same as listed rides).

## Where rides are posted here (field guide notes)

- **Triangle NC:** `bikethetriangle.com` (ICS), `bikedurham.org/events` (monthly PNG), `downtowndurham.com` event pages. Machine-readable: the ICS.
- **Florida clubs:** WildApricot (`.../event-<id>`), ClubExpress (`item_id` pages). Both fetchable without login.
- **Louisiana:** `nolasocialride.org` (current "ride with us" list at the foot of every page), `batonrougebikeclub.com` + RWGPS org 1719 (`events.json`).
- **Alabama:** shops' event pages (Trek Auburn) are the best public proof; clubs use GroupMe and Facebook.
- **Everywhere:** Atlanta and Miami rides live on Facebook and in third-party directories (sadlebred.com, themiamibikescene.com). Never use those as proof.

## Couldn't confirm (for a local rider to check by hand)

All 82 are in `g6-southeast-outcomes.json` with the note and public contact. The most promising:
- Hack & Wheeze (Atlanta, Sat 8:00 am, Taco Mac Virginia-Highland, no-drop, beginners): https://www.facebook.com/groups/125310964765/
- Women Crush Wednesdays (Lafayette), WOW Ride (Broward), Black Girls Do Bike Raleigh-Durham (https://www.instagram.com/bgdbraleighdurham/), Tuesday Nite Ladies (West Palm Beach), Ladies on Spokes (Coweta/Fayette).
- Major Taylor B-Ham Turn-Up (Birmingham, Thu 6:00 pm, 1801 First Ave S): majortayloralabama@gmail.com
- Decatur / East Side Pedal rides: https://groups.io/g/ESP (script-loaded calendar).
- Bullseye Thursty Thursday and Full Moon Fever (Durham): only old pages.
- Naples Velo Craig's Coffee Ride: page does not say 7:00 or 7:30.
- Miami: Church of Gravel, Taco Tuesdays, Tuesday Night Gravel, Bike Tech Saturday Donut.
- Reality Bikes Wednesday night and Webb Bridge Saturday (Cumming/Alpharetta): page dated 2025.

## Leads worth a next pass (not in this group's file)

- The Bike the Triangle ICS also lists Raleigh/Cary/Chapel Hill rides (Team on Draft Monday RTP, Slow Spokes, Old North Cycling Umstead gravel, Daily Beer Bar Women's Ride, Wednesday Night Bike Ride from Bicycle Chain). Worth a scout.
- Charlotte Spokes People's `cltspokespeople.org/rides/` lists Sunday Slow Riders and a Full Moon Ride, neither on the site.
- Seminole Cyclists' Friday and Wednesday rides (above).

## Stats

Leads: 99. Pages and feeds fetched: about 190. Searches: about 40 (cap hit). Proven 16, gone 1, still-unproven 82. New records 18 (15 high, 3 medium).

## Sources

bikethetriangle.com/events/?ical=1 and event pages; bikedurham.org/events and its Sept 2026 calendar image; Bike Durham ride guide PDF (March 2025); downtowndurham.com event pages; partsnlabor.com; seminolecyclists.wildapricot.org (events, join-us, event-6497441, -6497402, -6497386, -6497433, -6497420); nolasocialride.org; neworleansbicycleclub.org/rides.htm; boonebike.com local rides; booneareacyclists.org/ride; trekbicycleauburn.com/events; batonrougebikeclub.com and ridewithgps.com/organizations/1719; bocaratonbicycleclub.com (ClubExpress item pages 2969514, 2969536, 2969555); meetup.com/charlotte-urbanists; clturban.ist; atlantatrek.com; sadlebred.com/rides; themiamibikescene.com; cycleworldmiami.com; mackcycle.com; strava.com club pages 572297, 1094348, qcwbl, atlanta-cycling-802, narc; gccfla.org; bikelafayette.org; velocity-cycles.com; mtccalabama.wordpress.com; druidcitybicycleclub.com; gulfcoasttrails.org; cyclecenter.com; procycleandtri.com; realitybikes.com; nashvillelocalcycling.com; ride615.com; naplesvelo.com; evergladesbc.com; piedmontflyers.org; jmc.clubexpress.com; cobbcounty.gov; sorbaorlando.com; bicikletabikeshop.com; durtybull.com.
