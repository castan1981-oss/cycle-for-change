# Arizona group rides outside the Phoenix metro: Tucson, the north state and the rest

- **Area id:** `az-tucson-north-state`
- **Agent:** group-ride scout (Tucson and Arizona outside the Phoenix metro)
- **Date:** Wednesday, Sept 30, 2026 (Arizona time)
- **Output:** 15 records in `az-tucson-north-state.json` (13 high, 2 medium). Nothing else in the repo was touched.

## Read this first

1. **Coverage gaps.** No verified ride for Flagstaff, Payson, Yuma, Lake Havasu City, Kingman, Show Low / Pinetop or Bisbee. I ran one search per small town, found nothing I could prove, and then the shared web-search limit ran out (200 of 200). What turned up for those towns is under Couldn't confirm. Marana, Catalina, Green Valley and Mount Lemmon have no host of their own either; they show up only as start places and routes on Cactus Cycling Club's calendar.
2. **Rides already on the site have moved.** Fair Wheel's page puts the Shootout at 6:30 am now and 7:00 from Oct 10, not 7:30. See "Existing records that need a look" under Rejected.
3. **"Prescott" is a banned word in the town-guide build.** Here it is a city and a host name (Bike Prescott, Prescott Valley, the Prescott Mountain Bike Association). Four of my records carry it in the name or slug, as do two rides already on the site. If the same lint runs on rides data, it will trip.
4. **The bike hash is built around beer.** Its Meetup text calls it "a drinking club with a biking problem". It is a real monthly ride with proof of life. You decide whether the directory carries it.
5. **No queer-run, women-only or BIPOC-named ride was verified in this area** beyond the two already listed (BICAS WTF, Women's Shootout). The lead to chase is Tucson Women Shredders (Instagram only). FUGA's pages are in English and Spanish and name Latino Conservation Week, but no word on its pages matches the `inclusive_focus` list, so I left that field empty.
6. **Addresses.** `lat`, `lng` and `geo_precision` are null as asked. Where a page gave a street but no city, I added the city and state of the record. Seven records have no street address at all and need geocoding by place name: Cactus weekend rides (the start moves each week), the bike hash (start is posted per ride), the three Bike Prescott rides (Viewpoint Park, a parking garage near Wild Iris), the PMBA Sunday ride (Lower Spence trailhead) and VeloVets (Sierra Vista Golf Center at Pueblo del Sol).
7. **No personal phone numbers** went into the records. Several host pages carry them (Cactus ride leaders, Civano organizers). The one number in the JSON is Bicycle Ranch's shop line.

## Summary

**15 rides, by city:** Tucson 6 · Prescott 2 · Prescott Valley 2 · Sedona 2 · Oro Valley 1 · Cottonwood 1 · Sierra Vista 1.

**By host:** Cactus Cycling Club 3 · Verde Valley Cyclists Coalition 3 · Bike Prescott 3 · Civano Cycling Club 1 · FUGA 1 · Bicycle Ranch 1 · Tucson's Hash House Harriers 1 · Prescott Mountain Bike Association 1 · VeloVets Sierra Vista 1.

**By type:** road 11 · social 3 · mountain bike 1. Six are no-drop in the host's words, two are beginner-friendly, one is adaptive.

**By proof:** 13 high (host's own page, with a date from the last 30 days or upcoming). 2 medium: Bicycle Ranch (the page gives day and time but no meeting point) and the bike hash (day and time, but the start place is not on the page).

**Held back:** one verified ride, Transit Cycles' Third Thursday, to keep Tucson at the cap of six. Details under Rejected.

## Why these

**Tucson**
- **Friday Saguaro East Ride (Cactus):** the Tucson loop around Saguaro National Park East, Level B, with a free first ride for a visitor and a drink after at LeBuzz.
- **Saturday and Sunday B Rides (Cactus):** a new named route every weekend, from Sahuarita to Vail. Good for a visitor who wants San Xavier, Madera Canyon or Sabino.
- **Civano Cycling Club:** three mornings a week from southeast Tucson. The page heading is "Welcome All Cyclists".
- **Bicis y Burros (FUGA):** a Westside community ride on the second Sunday, run by a neighborhood nonprofit, in English and Spanish. It is not a race.
- **Bicycle Ranch Saturday Roundup:** the shop's fast 56-mile ride at 18 to 22+ mph. Newly back. For strong riders.
- **Pedal Files Bash (bike hash):** a monthly social ride of 8 to 12 miles with beer and food at the end.

**Oro Valley**
- **Wednesday Oro Valley Ride (Cactus):** a weekday morning ride of 36 to 39 miles with a different route each week. Same free first ride.

**Sedona**
- **Thursday Sedona Area Road Ride (VVCC):** the canyons up Dry Creek Rd at 14 to 16 mph. The host says almost nobody comes before mid October, so sign up.
- **Saturday VOC Ride (VVCC):** 20 to 35 miles by Bell Rock and Jacks Canyon, no one left behind, coffee at Fire Creek after.

**Cottonwood**
- **Friday Social Ride (VVCC):** two rides from one coffee shop. A casual 8 to 10 miles at 8 to 10 mph for people new to group rides, and about 20 miles at 10 to 14 mph.

**Prescott and Prescott Valley**
- **Thursday Fun Ride (Bike Prescott):** under 20 miles, slow, no-drop. The easiest way in around here.
- **Friday Hills Ride (Bike Prescott):** 20 to 30 miles, about 100 feet of climbing per mile, no-drop.
- **Saturday Casual Road Ride (Bike Prescott):** 30 to 40 miles at a moderate pace. Faster riders ride ahead and wait.
- **PMBA 8 to 80 Sunday Ride:** mountain bike ride in A, B and C groups that start together, plus an e-bike ride the same morning.

**Sierra Vista**
- **VeloVets Wednesday and Saturday Rides:** a veterans' club that says anyone can ride and it leaves no rider behind. Many members have disabilities.

## Where rides are posted in this area

### Words

- "Group ride", "shop ride", "club ride", "no-drop" (nobody gets left), "regroup".
- Tucson's fast Saturday ride is **the Shootout**, about 70 miles. Its slower groups are the **Scootout**, **Old Man** and **Old-Old Man**. **TMFR** is the Tuesday Morning Fast Ride and **TNR** is the Tuesday Night Ride. All of these are already on the site.
- Pace is a letter or a speed. Cactus says "Level B, 15 to 17 mph". Tucson Riders 4 The Cure says A 17+, B 15 to 16, C 12 to 14. Tucson Velo groups run 14 to 16, 16 to 18 and 18 to 21 mph. GABA ride titles carry a code like "C+/2/34"; GABA publishes the key on its Day Rides page, which I did not open.
- **Bike hash** or **bash**: a trail laid by one rider, followed by the pack, with beer.
- **Bicis y Burros** and **Bicicleteada del Sur**: FUGA's Spanish names for its monthly rides. "Bicicleteada" is a group bike ride.
- **The Loop**: Tucson's paved path of 136+ miles, in Cactus's words.
- **VOC**: the Village of Oak Creek, south of Sedona.
- Bike Prescott names its series: Fun Ride, Hills Ride, Freewheelin', Casual, Brisk, Old Guys, Truckin' Tuesday, Tour de Wednesday, Saints & Sinners.
- **Sweeps**: riders who stay at the back of a group so nobody is dropped (Tucson Riders 4 The Cure asks for them).

### Where rides are published

- **Club calendars on Wild Apricot.** Cactus Cycling Club (`cactuscycling.org/Schedule-List`) lists about a month ahead with time, start place, distance and climbing. VVCC's site (`vvcc.us`) sends you to Meetup.
- **Meetup, with iCal feeds.** VVCC, Bike Prescott, the Tucson hash, GABA and Tucson Riders 4 The Cure all post there. Bike Prescott posts only a few days ahead. VVCC posts about ten days ahead.
- **Gatherist.** GABA now posts day rides on both Gatherist and Meetup and says Meetup's pricing pushed it off. Gatherist group and event pages are public.
- **WordPress calendars.** The Prescott Mountain Bike Association runs "The Events Calendar", which gives a feed.
- **A city council calendar.** FUGA's Westside ride is on the Ward 1 office's Squarespace calendar (`tucward1.com/calendar`). FUGA itself posts on Instagram, Facebook and TikTok first.
- **Shop pages.** Bicycle Ranch's group rides page carries a dated "As of" line. Fair Wheel's page carries the seasonal start-time table. Transit Cycles' events page lists FUGA, Dragonfly, the Sunday and Tuesday rides and the Women's Shootout, with no dates. Sabino Cycles' rides are on hold.
- **Small club sites.** Civano Cycling Club's home page lists the next ride by hand. VeloVets Sierra Vista states the ride on its home page and dates its events on a second page.
- **Strava clubs.** Tucson Sundaze Ride, Tucson Velo, Bicycle Ranch and VVCC have clubs. The club event lists need a login, and the single-event pages I found were all for other states.
- **Instagram and Facebook only.** Dragonfly Rides, Tucson Women Shredders, Tucson MTB Addicts, the Yuma clubs, Kingman, Bullhead City.
- **Directories are leads, not sources:** biketucson.com, bikeaz.org and the tucson.com bike guide are old and thin. They named hosts; they did not prove rides.

### Rhythm

- **Heat sets the clock in Tucson.** Fair Wheel's Shootout table (A group): 6:00 am from the 3rd Saturday of April, 6:30 from the 1st Saturday of September, 7:00 from the 2nd Saturday of October, 7:30 from the 2nd Saturday of November, 7:00 from the 1st Saturday of March, 6:30 from the 1st Saturday of April. The Women's Shootout rolls 15 minutes after the A group. TMFR starts with the A group.
- **Oro Valley's resident club** (Vistoso Cyclists, not open to visitors) shows how far it swings: Oct 8:00, Nov 8:30, Dec to Feb 9:00, Mar 8:30, Apr 8:00, May 7:30, June to Aug 6:00 or 6:30, Sept 7:00.
- **Cactus in October:** Fridays and weekends 7:30, Wednesdays 8:00. The club may move them as the weather turns.
- **Prescott and the Verde Valley:** weekday and weekend rides start between 8:00 and 9:00 in October. Sedona's Thursday ride is nearly empty from April to mid October by the host's own note, and picks up to 4 to 8 riders from late October through March.
- **Monsoon washout.** Bike Prescott's Oct 1 mountain bike post warns that the Headwaters connection may be rough from recent rain.
- **Civano** rides when the temperature gets to about 55 degrees, so the time moves.

### Visitor norms

- **Cactus:** a guest signs up for a free Trial membership (one ride a year), signs the waiver and registers on the club site before the ride. The club cancels by email for weather.
- **VVCC:** members and first-time riders are insured. Non-members can keep riding but at their own risk after the first ride.
- **Bike Prescott:** guests are welcome, but its insurance covers members only. Helmets required, lights recommended.
- **PMBA:** everyone signs in, does an equipment check and tells the ride host about any medical concerns.
- **GABA:** a waiver and a CPSC-certified helmet.
- **Civano:** give the organizer your phone number and an emergency contact before the start.
- **Drop or no-drop.** Tucson's Shootouts and Bicycle Ranch's A and B groups are drop rides by their own words. VVCC's Cottonwood and Sedona VOC rides and the Bike Prescott series say no-drop. Tucson Riders 4 The Cure says its A group is not no-drop.
- **Water and lights.** Bring more water than you think, and lights for dark starts. TUGO, Tucson's bike share, is not available on FUGA's Westside ride.

### Re-check sources

Machine-readable (fetched, and each shows rides from this report):
- `https://www.meetup.com/vvcc-road-bike-rides/events/ical/` (VVCC: Sedona, Cottonwood and Flagstaff rides, 10 events when read)
- `https://www.meetup.com/bike-prescott-meetup/events/ical/` (Bike Prescott: 8 events when read)
- `https://www.meetup.com/jhavelina-tucson-hash/events/ical/` (the hash: 10 events, including the bike hash)
- `https://www.meetup.com/bikegaba/events/ical/` (GABA: 5 events, including the El Tour training ride already on the site)
- `https://www.meetup.com/tr4tc_az/events/ical/` (Tucson Riders 4 The Cure: 1 event)
- `https://prescottmtb.com/events/list/?ical=1` (PMBA; the plain `/events/?ical=1` returns nothing; a category feed at `/events/category/rides/list/?ical=1` also exists)
- `https://www.tucward1.com/calendar`: each event has its own iCal link; the whole-calendar `?format=ical` address returns a web page, not a feed.

Not machine-readable, so an agent or a person has to read them:
- `https://www.cactuscycling.org/Schedule-List` (Wild Apricot list)
- `https://civanocycling.club/` (hand-edited home page)
- `https://www.bicycleranchtucson.com/articles/group-rides-pg68.htm` (check the "As of" date)
- `https://www.fairwheelbikes.com/service/group-rides/` (seasonal start times for the Shootout rides)
- `https://velovetssierravistaaz.org/` and `/upcoming-events`
- `https://www.transitcycles.com/events-1` (no dates)
- Strava club event lists (login wall)

## Rejected

### Ended or paused (counted in Stats)

- **Fair Wheel Bikes, monthly Sunday Women's Ride (Tucson).** Ended. Fair Wheel's women's rides page, first posted April 2, 2024, says "The organized Sunday series is no longer running" and keeps only the Women's Shootout (fetched Sept 30, 2026).
- **Sabino Cycles weekly rides (Tucson).** Paused. The shop's Rides & Events page says "Our weekly rides are currently on hold" (fetched Sept 30, 2026).

### Existing records that need a look (changed times; counted in Stats)

These are rides already on the site, not mine. The hosts' own pages now say something different.
- **The Shootout** (`tucson-az-the-shootout`, listed 07:30). Fair Wheel's table: 6:30 am from the 1st Saturday of September, 7:00 from the 2nd Saturday of October, 7:30 from the 2nd Saturday of November. For Oct 3 it is 6:30, then 7:00 from Oct 10. (Fair Wheel group rides page, fetched Sept 30, 2026.)
- **Tuesday Morning Fast Ride** (`tucson-az-tuesday-morning-fast-ride`, listed 07:00). The same page says TMFR starts at the same time as the Shootout A group, so 6:30 now.
- **Women's Shootout** (`tucson-az-womens-shootout`, listed 06:15). Fair Wheel's women's rides page: 6:45 from the 1st Saturday of September, 7:15 from the 2nd week of October, 7:45 from the 2nd Saturday of November. Transit Cycles' page still says "6a, 6:15 START".
- **Bike Prescott Thursday Mountain Bike Series** (`prescott-az-bike-prescott-thursday-mtb-series`, listed 08:00). The Meetup post for Thu Oct 1 says 9:00 am (Bike Prescott feed, fetched Sept 30, 2026).
- **Worth checking, not proven wrong:**
  - FUGA Southside Ride (`tucson-az-fuga-southside-ride`, Fri 18:00). FUGA's events page and Transit Cycles both say last Fridays of the month, meet 6:00 pm, ride 6:30 to 8:30 pm, El Pueblo Center, 101 W Irvington Rd. Check the record says monthly.
  - BICAS WTF ride (`tucson-az-bicas-wtf-ride`, Mon 19:00). The tucson.com bike guide (updated March 2025) says last Monday of the month. BICAS's events page now carries a notice that BICAS "is at risk of closing or pausing our operations". I did not open `bicas.org/women-trans-femme/`.

### Held back for the city cap (verified, ready to add)

- **Third Thursday Westside Community Ride (Transit Cycles with Dragoon Brewing Company), Tucson.** Tucson already has six of my records, the cap. Schedule from Transit Cycles' events page: third Thursday of the month, meet 5:30 pm at the MSA Annex with a pre-ride drink at Westbound, roll about 6:10 pm, a 10-ish mile cruise at a moderate pace to Dragoon Brewing (30 to 40 minutes), first beer "(n/a or 0.0%) is a buck", bring a helmet, lights, water and cash. The shop's footer gives 267 S Avenida Del Convento, Bldg 10, Tucson AZ 85745. Why I held it first: the page has no date on it, and it says "our monthly ride is getting a refresh!". Dragoon's own calendar and events pages returned 404. It would be medium. Source: `https://www.transitcycles.com/events-1`. Instagram: `http://instagram.com/transitcycles` (linked from that page).

### Unfit

- **University of Arizona Cycling.** Monday, Wednesday, Thursday, Friday and Sunday rides are "for students, faculty, staff, and folks affiliated with the University. These are *not* public rides." Tuesday and Saturday are the Shootouts already listed. (uacycling.com/rides, fetched Sept 30, 2026.)
- **Vistoso Cyclists (Oro Valley).** A chartered club of Sun City Oro Valley. Residents and renters join; non-resident members are capped at 20%; a visitor invited by a member can ride two weeks at most.
- **Project Bike Club (Tucson).** Paid youth programs: After School Bike Club ages 7 to 18 ($600 a season, $25 a day drop-in, Mon, Wed and Sat at Himmel Park), Project Bikepacking ($750, $25 to $40 drop-in), weekend trail rides twice a month at $40 each. Skipped as paid programs. The editor can decide on the `youth` tag.
- **El Grupo Youth Cycling (Tucson).** After-school programs for ages 5 to 18 out of its Clubhouse at 610 N 9th Ave. No day or time is posted for public rides. Its events are on the Events list below.
- **FLYRS (Flagstaff).** Registered seven-week youth mountain bike sessions.
- **Wheel Fun (VVCC's school program).** School programs and camps (Kingman Oct 10 to 11, Cornville Oct 13 to 16, Sedona Oct 24 to 25). Not a drop-in ride.
- **Flagstaff Biking Organization.** Its events page lists trail work days and Ride Your Bike Week, and no recurring group rides (fetched Sept 30, 2026).
- **Flagstaff Bicycle Revolution.** The shop's "Rides" page is recommended routes, not a group ride.
- **Over the Edge Sports.** `otesports.com` is the shop in Melrose, South Australia, not Sedona. I did not find the Sedona shop's own site.
- **Hash runs, not rides.** The Tucson hash's Saturday jHavelina and Wednesday Mr. Happy's trails are on foot.
- **Not bike rides.** Sportbike Riders of Tucson (motorcycles), Tumamoc Thursday (a hike), the Sonoran Desert Mountain Bicyclists calendar (clinics and trail days, no weekly ride), PMBA Wednesdays (a monthly social).
- **Green Valley Cyclists (Strava club 630)** rides around Henderson, Nevada, not Green Valley, Arizona.
- **Four Strava event pages from search leads were for other states** (Hilton Head SC, Poway CA, Calgary, South Barrington IL).

## Couldn't confirm

Robert can check these by hand. "Missing" says what stopped me.

### Tucson and Oro Valley

| Ride | Host | Day, time, start as seen | Missing | Where to look |
|---|---|---|---|---|
| El Mercado Ride | Tucson Riders 4 The Cure (Meetup) | Sunday. The Meetup header says 6:30 pm to 8:30 pm on Sun Oct 4, "Needs a location". The text says meet 6:30 AM, depart 6:45 AM, 32.4 miles, starting and ending at "Mercado". A 17+, B 15 to 16, C 12 to 14 mph; A is not no-drop. | AM or PM; an address; a second dated week to show it repeats | `https://www.meetup.com/tr4tc_az/events/316771468/` · feed `https://www.meetup.com/tr4tc_az/events/ical/` |
| Tucson Sundaze Ride (TSDR) | Strava club, 177 members | Sunday 7:00 am, Highland Underpass on the UA campus, per Transit Cycles' page. The club says "Intermediate group ride on Sunday mornings in Tucson, AZ". | A dated event. Strava shows an "Upcoming Club Event" but hides it behind login. | `https://www.strava.com/clubs/TSDR` · `https://www.transitcycles.com/events-1` |
| Full Moon Ride | Dragonfly Rides | "Nearly every full moon". Meet at Tucson Hop Shop, ride to Bear Canyon along The Loop and neighborhood streets. About 20 miles, no-drop, all bikes welcome (Transit Cycles' words). | Dates and times, which are on Instagram. Their site `hopflycycling.org` did not load twice. | `https://www.instagram.com/dragonflyrides/` |
| Tucson Velo weekly rides | Tucson Velo (nonprofit road club, founded 2024; $30 a year; insurance on its rides) | Saturdays, mostly 40 to 50 miles, with speed groups of 14 to 16, 16 to 18 and 18 to 21 mph. Start place and time change with the forecast. | Its home page says "No upcoming events" and its calendar shows none. No start place. | `https://www.tusvelo.com/about/club-rides/` · `https://www.tusvelo.com/events/` · `https://www.strava.com/clubs/TusVelo` |
| GABA day rides | Greater Arizona Bicycling Association | Several rides a week, each posted on its own. This week: Thu Oct 1 at 7:00 and 8:00 am, Sat Oct 3 at 7:00 am from Bruegger's on N La Cañada Dr in Oro Valley. Riders sign a waiver and wear a CPSC-certified helmet. | No ride I could show repeating under one name. GABA's Meetup past-events page loaded empty. | `https://gatherist.org/groups/greater-arizona-bicycle-association-gaba` · `https://www.meetup.com/bikegaba/events/ical/` · `https://www.bikegaba.org/content.aspx?page_id=22&club_id=307669&module_id=780113` |
| Speedway group ride | Performance Bikes (Tucson) | "Weekly hardcore and social rides" near Speedway and Country Club, per a directory. | Everything. I never opened a host page. | named on `https://www.biketucson.com/group-rides/` (a lead, not a source) |
| Tucson Women Shredders | Women's mountain bike group | Monthly, Tucson Mountain Park or Catalina State Park, per the tucson.com bike guide (updated March 2025). | Day, time, start, any 2026 date | `instagram.com/tucson_women_shredders` (named in that article) |
| Tucson MTB Addicts | Facebook group | "Weekly or twice a week rides", per a directory | Everything | `https://www.facebook.com/TucsonMTBAddicts/` |
| SAMBA (Southern Arizona Mountain Bike Association) | unknown | "Weekly and twice a week rides for advanced riders", per a directory | Everything; the directory gave no link | named on `https://www.biketucson.com/group-rides/` |
| Saddlebrooke Cyclemasters | Club in the Oro Valley area | Not seen | Never opened | `http://saddlebrookecyclemasters.org/` (linked from GABA's site and the state club list) |

### The rest of the area

| Ride | Host | What I saw | Missing | Where to look |
|---|---|---|---|---|
| Cochise County Cycling Community | Strava club (Sierra Vista), 408 members | "The largest cycling club in southeastern AZ." Links a Facebook group. | Any ride, day or time | `https://www.strava.com/clubs/cochise-county-cycling-community-5693` · `https://www.facebook.com/groups/cochisecountycyclingcommunity/` |
| Rim Country Cycling | Strava club (Payson), 41 members | "Cyclists who ride in or around Payson, AZ." | Any ride, day or time. `paysonrimcountry.com/biking/` redirected to an image. | `https://www.strava.com/clubs/38031` |
| Kingman Arizona Bicycle Club (multi-sport) | Facebook | Seen only in a search result | Everything | `https://www.facebook.com/Kingman.Arizona.Bicycle.Club` |
| BHC Cyclists | Facebook (Bullhead City) | "Social group riding in Bullhead City area", per the state club list | Day, time, start | `https://www.facebook.com/BHCCyclists/` |
| Los Psycholists Bike Club | Facebook (Yuma) | "Family friendly, welcoming, and supportive", per the Yuma Region Bicycle Coalition's list (© 2025) | Day, time, start | `https://www.facebook.com/lospsycholistsbc/` |
| Yuma Biking Syndicate | Facebook (Yuma) | Same list | Day, time, start | `https://www.facebook.com/yumabikingsyndicate/` |
| Yuma Bike Life | Facebook group (Yuma) | Same list | Day, time, start | `https://www.facebook.com/groups/570858395061796` |
| Desert Mountain Bikers of Yuma | MTB Project club page | Seen only in a search result | Never opened | `https://www.mtbproject.com/club/7000176/desert-mountain-bikers-of-yuma` |
| Lake Havasu Bike and Paddle Club, and a Havasu mountain bike club | Local news stories | Seen only in search results, one dated 2020 | Never opened | `https://www.havasunews.com/news/paddle-pedal-bike-and-paddle-club-brings-people-together-with-recreation-activities/article_1ec72ee0-15c7-11eb-8701-07d0adcf4468.html` · `https://riverscenemagazine.com/mountain-bike-club-brings-fitness-and-fun-to-the-lake-havasu-community/` |
| High Country Adaptive Sports (Flagstaff) | Nonprofit | Year-round hiking, kayaking, climbing, mountain biking and snow sports, per the state club list. A program, not a posted weekly ride. | Day, time, start | `https://highcountryadaptive.org/` |
| Gear Girls (Flagstaff) | Arizona Trail Association youth program | Mountain biking for girls in grades 4 to 8, per the state club list | Day, time, start; likely registration only | `https://aztrail.org/youth/gear-girls/` |

**No leads at all:** Show Low and Pinetop (my one search returned nothing), Bisbee (only the El Tour de Zona event and tourism pages), Marana, Catalina, Green Valley, Vail, Mount Lemmon.

**Not checked** (leads from the brief or the state list that I did not reach): Living Streets Alliance social rides, the Tucson Bike Collective, Tucson Bicycles, Cycle Tucson, Mike's Bike Shop, Absolute Bikes Flagstaff, the Sedona Over the Edge Sports shop, Cochise Bicycle Advocates, Santa Cruz County cycling club.

## Events

Big annual rides worth the 2027 calendar. Dates are the 2026 editions unless noted.

| Event | City | Month | URL |
|---|---|---|---|
| El Tour de Tucson | Tucson | November (Sat Nov 21, 2026) | `https://www.elgrupocycling.org/calendar` · organizer `http://www.perimeterbicycling.com/` (linked from GABA's site, not opened) |
| El Grupo Fall Fondo (fundraiser for El Grupo Youth Cycling) | Tucson | November (Sun Nov 8, 2026) | `https://www.elgrupocycling.org/calendar` |
| Sky Island Tour | Sierra Vista | October (Sat Oct 3, 2026; Civano's page lists 62 miles at $65 and 30 miles at $45) | `https://skyislandtour.com` (linked from VeloVets' events page, not opened) |
| Nogales Cycling Classic (14th annual) | Nogales | October (Oct 17, 2026) | `https://nogalesbicycleclassic.org/` (linked from VeloVets' events page, not opened) |
| El Tour de Zona | Cochise County | 2027, date not announced | `https://www.eltourdezona.org/` (linked from VeloVets' events page, not opened) |
| Tour de Fields (7th annual, non-competitive, run by the Yuma Region Bicycle Coalition) | Wellton | March (Sat Mar 21, 2026) | `https://www.tourdefields.org/` |
| Chino Grinder Gravel Race | Prescott area | October (Oct 17, 2026) | listed on `https://prescottmtb.com/` |
| Rough Rider 3-day Gravel Race | Prescott area | Oct 30 to Nov 1, 2026 | listed on `https://prescottmtb.com/` |
| Flagstaff Ride Your Bike Week | Flagstaff | May (May 10 to 16, 2026) | `https://flagstaffbiking.org/category/events/` |
| VVCC Fall Picnic (a social ride day, not a race) | Cottonwood | October (Oct 18, 2026, Dead Horse Ranch State Park) | `https://vvcc.us/Road-Rides` |

## Stats

- **Candidates looked at:** about 65 (rides and groups I opened a page for or took from a named lead to a decision).
- **Listed:** 15.
- **Couldn't confirm:** 21 rows above, covering 22 groups (the Lake Havasu row names two). Some are groups where I found no ride at all.
- **Rejected as ended or changed:** 6. Two ended or paused (Fair Wheel's Sunday Women's Ride, Sabino Cycles). Four rides already on the site whose times have changed (the Shootout, Tuesday Morning Fast Ride, Women's Shootout, Bike Prescott Thursday MTB).
- **Held back for the cap:** 1. **Unfit:** about 20.
- **Page fetches:** about 120 (curl for most; WebFetch for a few). Web searches: 32, then the shared limit ran out.

## Sources

Every URL I requested. Failures are marked.

**Tucson: clubs, shops, nonprofits**
- https://www.cactuscycling.org/
- https://www.cactuscycling.org/Schedule-List
- https://www.cactuscycling.org/Guests
- https://civanocycling.club/
- https://www.tucward1.com/calendar
- https://www.tucward1.com/calendar?format=ical (returned a web page, not a feed)
- https://www.fugatucson.org/events
- https://www.transitcycles.com/events-1
- https://www.bicycleranchtucson.com/articles/group-rides-pg68.htm
- https://www.bicycleranchtucson.com/about/upcoming-events-pg76.htm
- https://www.bicycleranchtucson.com/calendar (404)
- https://www.strava.com/routes/3224218000612309750 (Bicycle Ranch route; login wall)
- https://www.fairwheelbikes.com/service/group-rides/
- https://www.fairwheelbikes.com/blogs/posts/womens-rides/
- https://www.fairwheelbikes.com/rentals/routes/tucson-rides-guide/
- https://www.sabinocycles.com/about/rides-events-pg178.htm
- https://uacycling.com/rides/
- https://vistosocyclists.org/riders/
- https://vistosocyclists.org/visitors/
- https://www.projectbikeclub.com/programs
- https://www.projectbikeclub.com/schedule
- https://elgrupocycling.org/
- https://www.elgrupocycling.org/calendar
- https://www.elgrupocycling.org/clubhouseprograms
- https://www.elgrupocycling.org/communityprograms
- https://www.tusvelo.com/
- https://www.tusvelo.com/about/club-rides/
- https://www.tusvelo.com/events/
- https://www.strava.com/clubs/TusVelo
- https://strava.app.link/csYVNBA4jVb (redirects to the Tucson Sundaze Ride club, https://www.strava.com/clubs/TSDR)
- https://bicas.org/events/ (redirects to https://bicas.org/25th-anniversary/events/)
- https://www.sdmb.org/events
- https://www.sdmb.org/calendar-widget
- https://seazoutdoors.net/event/sdmb-night-ride-and-pint-night-w-westbound-and-transit-cycles/ (no connection)
- https://www.dragoonbrewing.com/calendar (404)
- https://www.dragoonbrewing.com/events (404)
- https://hopflycycling.org/ and https://www.hopflycycling.org/ (no connection, both)
- https://www.strava.com/clubs/trek-bicycle-stores-%7C-tucson-194549 (redirected to the Strava login page)

**Tucson: GABA, Meetup and Gatherist**
- https://www.bikegaba.org/content.aspx?page_id=4001&club_id=307669
- https://www.bikegaba.org/content.aspx?page_id=22&club_id=307669&module_id=780113
- https://www.meetup.com/bikegaba/
- https://www.meetup.com/bikegaba/events/?type=past (loaded empty)
- https://www.meetup.com/bikegaba/events/ical/
- https://gatherist.org/groups/greater-arizona-bicycle-association-gaba
- https://gatherist.org/events/1062
- https://gatherist.org/events/1020
- https://www.meetup.com/tr4tc_az/
- https://www.meetup.com/tr4tc_az/events/316771468/
- https://www.meetup.com/tr4tc_az/events/ical/
- https://www.meetup.com/jhavelina-tucson-hash/events/ical/
- https://tucsonhash.com/
- https://tucsonhash.com/calendar (loads without events)
- https://www.meetup.com/find/us--az--tucson/bike/

**Directories and stories (leads only)**
- https://www.bikeaz.org/tucson-group-bike-rides/
- https://www.biketucson.com/group-rides/
- https://www.biketucson.com/group-shop-club-bike-rides/ (404)
- https://tucson.com/thisistucson/article_5333e91e-8ede-11ee-bc7e-6f64f9ce4e37.html
- https://tucson.com/thisistucson/guides/bike-guide-tucson-trails-tours-shops-rides-groups-more/article_5f7422d6-8e55-11ee-bda4-0f6dd8d06780.html (429)
- https://www.tucsonbikerentals.org/group-rides/ (bot wall, 202)
- https://www.ironcladbicycles.com/Clubs/
- https://www.cazbike.org/arizona-bicycle-organizations-volunteer-and-riding-opportunities/
- https://activetransportation.az.gov/bicycling/bicycling-organizations-clubs-and-programs (403)
- https://localraces.com/lake-havasu-city-az/clubs (500)

**Verde Valley, Sedona, Flagstaff**
- https://vvcc.us/
- https://vvcc.us/Road-Rides
- https://www.meetup.com/vvcc-road-bike-rides/
- https://www.meetup.com/vvcc-road-bike-rides/events/316513542/
- https://www.meetup.com/vvcc-road-bike-rides/events/316539580/
- https://www.meetup.com/vvcc-road-bike-rides/events/316528037/
- https://www.meetup.com/vvcc-road-bike-rides/events/ical/
- https://wheelfun.org/
- https://www.meetup.com/find/us--az--flagstaff/mountain-biking/
- https://www.meetup.com/find/us--az--flagstaff/bike/ (404)
- https://www.meetup.com/find/us--az--sedona/bike/ (404)
- https://flagstaffbiking.org/ (bot wall, 202)
- https://flagstaffbiking.org/category/events/
- https://www.flyrsaz.com/ride-with-us
- https://www.flagbikerev.com/service/about/
- https://www.azcycling.org/portfolio-items/flagstaff-cycling/ (bot wall, 202)
- https://otesports.com/ (the Melrose, South Australia shop)
- https://www.strava.com/clubs/82825 (adiUltra, a Flagstaff running club; not a ride)

**Prescott and Prescott Valley**
- https://www.bikeprescott.org/weekly-ride-series
- https://www.meetup.com/bike-prescott-meetup/events/ical/
- https://prescottmtb.com/
- https://prescottmtb.com/event/pmba-8-to-80-ride-every-sunday-casual-c-group-ride/
- https://prescottmtb.com/event/pmba-8-to-80-e-bike-ride/
- https://prescottmtb.com/events/?ical=1 (returned nothing)
- https://prescottmtb.com/events/list/?ical=1
- https://prescottmtb.com/events/category/rides/list/?ical=1

**Payson, Yuma, Lake Havasu City, Kingman, Sierra Vista**
- https://paysonrimcountry.com/biking/ (redirected to an image)
- https://www.strava.com/clubs/38031
- https://yumarbc.org/index.php/yuma-area-bike-clubs/
- https://www.meetup.com/find/us--az--yuma/bike/ (404)
- https://www.tourdefields.org/
- https://www.meetup.com/find/us--az--lake-havasu-city/bike/ (404)
- https://velovetssierravistaaz.org/
- https://velovetssierravistaaz.org/upcoming-events
- https://www.usvetconnect.com/velo-vets (redirected to the VeloVets page on usvetconnect.com)
- https://www.strava.com/clubs/cochise-county-cycling-community-5693
- https://www.meetup.com/find/us--az--sierra-vista/bike/ (404)
- https://www.strava.com/clubs/green-valley-cyclists-630 (Henderson, Nevada)

**Strava event pages from search leads (all other states)**
- https://www.strava.com/clubs/54171/group_events/857635
- https://www.strava.com/clubs/118883/group_events/219337
- https://www.strava.com/clubs/157915/group_events/69278
- https://www.strava.com/clubs/284586/group_events/469328
