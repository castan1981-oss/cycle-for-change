# az-tempe-mesa-2026-10-16: group-ride scout report

- **Area id:** `az-tempe-mesa-2026-10-16`
- **Agent:** Tempe and Mesa ride scout (Claude Opus 5.5)
- **Date:** Friday, Oct 16, 2026 (Arizona time)
- **Area:** Tempe (with the ASU and Town Lake area) and Mesa (with Usery, Hawes and Red Mountain)
- **Files:** `az-tempe-mesa-2026-10-16.json` (empty array, no records) and this report
- **Budget:** about 40 searches and fetches. I used about 55: 25 web searches and about 30 page reads. I went over chasing the Mesa leads. Then the leads ran out.

## Findings summary

**Listed: 0 rides.** Nothing I found in Tempe or Mesa meets the proof rules. I didn't pad the file.

| City | Already on the site | New in this file | Total |
|---|---|---|---|
| Tempe | 3 (Regroup Saturday Coffee Ride, PMBC Saturday Cycling, PMBC Sunday Kickoff) | 0 | 3 |
| Mesa | 0 | 0 | 0 |

Tempe still needs 5 more rides for its own city page (8+). Mesa needs 8. Neither is close.

**Why it came up empty.**

- **Strava event pages:** searching `site:strava.com group_events` for Tempe and for Mesa returned no event pages at all, only city PDFs and Regroup's club page. The search engine doesn't index Strava events for these two cities.
- **Meetup:** I read the Meetup find pages for bike, cycling and mountain biking in Tempe and Mesa. Every recurring ride on them is in Chandler, Gilbert, Phoenix or Scottsdale, and most are already on the site. The only Tempe event was a one-off (Mill Ave EBike Cruise, below). No cycling Meetup group is based in Mesa.
- **Shops:** Regroup is the only Tempe or Mesa shop I found with a ride page that loads and carries dates. A search for Bicycle Cellar, Bike Saviours, Landis, Trek or a Mesa shop's "group rides" page turned up no ride page. Searches for "bike shop Mesa group rides" return Action Rideshop dealer listings and a singletracks shop directory, nothing with a schedule.
- **City programs:** Mesa's bike program (MesaMoves) runs annual events (CycloMesa, Bike to Work Day), not a recurring ride. The program page itself (mesaaz.gov/mesamoves) returned 403.
- **Host caps:** PMBC already has 5 rides on the site and Global Bikes has 5. Neither can add a ride in Tempe or Mesa under the 3-per-host cap (the merge counts listed rides).

## For the editor (rides already on the site, seen in passing)

These came from pages I read for this sweep. None of them is in the JSON. They are leads for the Monday re-check, not re-checks.

- **Regroup Saturday Coffee Ride** (`tempe-az-regroup-coffee-ride`) is alive and the time matches (6:30 am). Regroup's rides page shows Sat Oct 3 (50 mi, 20 "rode it") and Sat Oct 10 (46 mi, 44 "rode it"). **No shop ride on Sat Oct 17:** "The Regroup crew will be up at the Chino Grinder, so there will not be an official group ride from the shop this day." In its place the page lists a "Choose Your Own Adventure Ride!" at 6:30 am. You meet at the café and ride on your own. It's a one-week skip, not a change.
  - Useful for the watcher: the page carries schema.org `Event` JSON-LD for each upcoming ride (`startDate`, `eventStatus`, location). Each ride also has its own .ics, e.g. https://regroupwithus.com/rides-and-events/22144.ics. I found no whole-calendar feed.
- **Chandler North Saturday Ride** (`chandler-az-global-bikes-chandler-north-saturday-ride`): the Meetup event for Sat Oct 17 is titled "The Chandler North Saturday Ride \*\* 6:30 am \*\*" and starts 2026-10-17T06:30-07:00. The site has 06:00. https://www.meetup.com/global-bikes-meetup/events/316948597/
- **Southeast Chandler Sunday Social Ride** (`chandler-az-southeast-chandler-cycling-sunday-social-ride`): the Meetup event for Sun Oct 18 is titled "Sunday Social Ride. 6:30 wheels down." The site has 06:00. https://www.meetup.com/southeast-chandler-cycling/events/316974330/
- **Tuesday Night Bike Ride from R.T. O'Sullivan's** (`scottsdale-az-phoenix-hiking-biking-group-tuesday-night-ride`): the Meetup series is now titled "6:45 PM Tuesday Night Bike Ride From RT O'Sullivans in Scottsdale", with dates Oct 20 to Nov 17 at 6:45 pm. The site has 19:15. https://www.meetup.com/phoenix-hiking-biking-and-everythinging-group/events/316790886/
- **Night Rider Series at Trail 100** (`phoenix-az-valley-epic-rides-night-rider-trail-100`): the Wed Oct 21 event is titled "(Updated meet location)". I didn't open it, so I don't know the new start. https://www.meetup.com/valley-epic-rides/events/316807427/
- Same time as the site: Gilbert Sunday Funday (6:30 am, weekly to Nov 15 in the listing), Taco Tuesday at South Mountain (6:30 pm), B.E.S.T. (7:30 am Oct 24 and 31, 7:15 am Nov 14).

These times are from the event titles and `dateTime` fields in the Meetup find pages' page data. I didn't open each event page.

## Rejected

1. **Mill Ave EBike Cruise** (E-Bike AZ Adventures, Meetup). Fri Oct 16, 2026, 5:00 pm, from Varsity Pub, 501 S Mill Ave, Tempe. "Meetup and cruise around Mill Ave to visit different spots for food and drinks." The group has 7 members, no past events, and this is its only event. That makes it a one-off, not a series. Worth a look in a month in case it repeats. https://www.meetup.com/e-bike-az-adventures/events/316900906/ · feed https://www.meetup.com/e-bike-az-adventures/events/ical/
2. **Regroup Sunday rides** (the "Sunday Sabbatico" from the Sept 30 report). Regroup's past-rides list shows Sunday rides on May 24, Jun 7, Jun 21, Jul 5, Jul 19, Aug 2, Aug 16, Aug 30, Sept 6, Sept 13 and Oct 11. That's about every other week, mostly tagged gravel. The rows give no start. The Sept 10 club post (Sept 30 report) put them at different trailheads, and there's no Sunday ride upcoming. Oct 11 was a 20-mile, 205-ft road ride, but that's one flat Sunday, not a fixed ride. Not a fixed start, so not listed. https://regroupwithus.com/rides-and-events/
3. **PHX Fold (folding-bike Meetup), Tempe and Mesa meetups.** "PHX Fold III - Mesa Meetup" (Sat Mar 30, 2024, The Nile Coffee Shop, 105 W Main St, Mesa) and "PHX FOLD V - PortaPedal" (Sun Jun 30, 2024, Portapedal Bike Inc, 2054 E Southern Ave, Tempe). These were irregular, and nothing came after June 2024 except the annual C3 ride in Phoenix (Events). https://www.meetup.com/phx-fold-folding-bike-meetup/events/?type=past
4. **Mesa Bike to Work Day group ride.** Wed Apr 15, 2026, 7 am, from Lehi Park to the Plaza at Mesa City Center. This is an annual event (Events). https://mesanow.org/news/public/article/3642
5. **CycloMesa community ride.** Sat Mar 28, 2026, a 40-minute all-ages ride through downtown Mesa at the festival. This is an annual event (Events). https://mesanow.org/news/public/article/3641
6. **grouprides.cc.** Searching for "Tempe" and "Mesa, AZ" gives the same German- and Canyon-heavy list both times. It has nothing in Arizona. https://www.grouprides.cc/search?q=Tempe
7. **Sweatpals "Thursday Night Bikeride".** It came up in a Venture West search, but it's West LA Bicycle in Venice, CA. Not this area. https://sweatpals.com/event/thursday-night-bikeride/2026-10-01

Revisited from the Sept 30 list with nothing new: TBAG, the Landis calendar, ASU's calendar, Hawesaholics, Major Taylor Phoenix Riders, State Bicycle, Action Rideshop. A Landis search and a Major Taylor search found no 2026 page. Searches for Usery guided rides, Hawes trail groups and Mesa Strava clubs returned only trail guides, race registrations and other states.

## Couldn't confirm

These are for Robert, in the order I'd check them. Each one lists what's missing and where to look.

1. **BikeMesa, third-Friday ride (Mesa).** Lead: a Reddit thread (r/phoenix, a group-ride round-up, read through a mirror snapshot dated Dec 20, 2025) says "Bike Mesa" rides the third Friday of every month. An r/mesaaz post about CycloMesa says BikeMesa led a 1 pm, 4-mile social loop around the downtown square at the festival. Missing: any BikeMesa page, the time, the start and anything from 2026. I didn't find a site or a handle and didn't guess one. Try: ask at the MesaMoves program (mesaaz.gov/mesamoves loads in a browser; it returned 403 to me) or at a downtown Mesa shop. If it's real, a third-Friday Mesa ride would be Mesa's first listing.
2. **Bike to Wherever Phoenix calendar (Valley-wide).** A Wix events calendar of Valley group rides with a "Submit Event" form. The page loads (the first try got a 429, the second a 200), but the events load by script and no Tempe or Mesa entry was in the HTML. A person with a browser can read it in a minute. Filter it for Tempe and Mesa. This is the best single place to find the five Tempe rides the city page needs. https://www.btwphx.com/
3. **ASU Cycling's Friday Ride (Tempe).** Fri 5:30 am from W 5th St and S Mill Ave (the club's Google Calendar). Still stale: the weekly entries were last edited in 2022–2023 (Sept 30 report), and I found no 2026 page. Try: Instagram https://www.instagram.com/cycling.asu/ or the club's Strava. Feed if it comes back: https://calendar.google.com/calendar/ical/sundevilcycling%40gmail.com/public/basic.ics
4. **Major Taylor Phoenix Riders / The Beginners Lane (Tempe).** A Sunday morning ride from Kiwanis Park, per PMBC's undated links page. No time, nothing dated. Try: https://www.facebook.com/groups/TBLMajorTaylorPhoenixRiders/
5. **BABES Ride (women's social ride, Tempe).** No day, time or start on any page that loads. Try: https://www.facebook.com/groups/bikebabestempe/
6. **Hawesaholics and Babes Ride On (Mesa MTB).** Nothing new since Sept 30. Try: https://www.facebook.com/groups/1710431835903828/
7. **Venture West "SoMo night rides every Thursday from the shop".** The only source is still the Sept 30 Strava post. A search found no shop page. Missing: where the shop is, the time, the start.
8. **Regroup's Strava club** (club 171401, 3,879 members, Tempe). It's active (posts Oct 14 and Sept 24, 2026, one titled "Chino Grinder Pre-ride - 60 mi course"), but no post gives a second fixed weekly ride. Try: ask the shop whether there's a weekday ride. https://www.strava.com/clubs/regroup-cb
9. **Valley-wide Strava-only rides named in the Reddit round-up:** "Heavy Saturdays" and "SMS" (alternating Saturdays, routes and times on Strava) and "Congregation" (Sundays, on Strava). The thread gives no starts, so I can't tell whether any of them leaves from Tempe. ASU's old calendar put "Sunday Congregation" at E Lafayette Blvd and N 68th St, which isn't Tempe.

### Leads seen only in search results (not fetched, not proof)

- **Pedal Haus Brewery (Tempe):** "Rabbit Ride" bike bar crawl and the "Day Drinker Devil Ride" (a search title says "4th annual"). These look like annual events, not weekly rides. https://www.downtowntempe.com/do/pedal-haus-brewery-day-drinker-devil-ride · https://www.downtowntempe.com/do/pedal-haus-rabbit-ride-bike-bar-crawl
- **Tour de Tempe** community ride (an annual October ride, per a cazbike.org title). https://www.cazbike.org/tour-de-tempe-community-bike-ride-oct-26
- **Bikes & Beers Tempe** (a 2026 listing on an event aggregator). A ticketed series stop, not a weekly ride. https://www.endurancegrid.com/events/running-tempe-az-2026-201969

## Events

Annual rides, for the 2027 calendar. None is a weekly ride.

- **C3: Cultural Cadence Cycle** (PHX Fold). Phoenix, Nina Mason Pulliam Rio Salado Audubon Center, 3131 S Central Ave. Sun Nov 8, 2026: check-in 7:00, ride 8:00 am, 15 miles round trip, "an Indigenous-centered community bike ride". The 2025 edition was Oct 12, for Indigenous Peoples' Day. https://www.meetup.com/phx-fold-folding-bike-meetup/events/316953162/
- **CycloMesa Festival.** Mesa, the Plaza at Mesa City Center, 56 E Main St. Sat Mar 28, 2026, 9 am to 2 pm, with a 40-minute all-ages community ride. Free. https://mesanow.org/news/public/article/3641
- **Mesa Bike to Work Day.** Wed Apr 15, 2026, group ride from Lehi Park at 7 am to the Plaza at Mesa City Center. Part of Mesa's Valley Bike Month program in April. https://mesanow.org/news/public/article/3642

## Stats

- Candidates looked at: 22 (0 listed, 9 couldn't confirm, 7 rejected, 3 seen only in search results, 3 annual events)
- Rides already on the site seen in passing: 9 (Regroup alive with a one-week skip; 3 with a new time; 1 with a new meet location; 4 unchanged)
- Searches: 25. Page reads: about 30.

## Sources

**Shops and clubs**

- https://regroupwithus.com/rides-and-events/
- https://regroupwithus.com/rides-and-events/22144.ics
- https://regroupwithus.com/wp-json/wp/v2/types
- https://www.strava.com/clubs/regroup-cb
- https://www.strava.com/routes/3542533246501471868 (loaded, no route details without a login)

**Meetup**

- https://www.meetup.com/find/?keywords=bike%20ride&location=us--az--Mesa&source=EVENTS
- https://www.meetup.com/find/?keywords=cycling&location=us--az--Tempe&source=EVENTS
- https://www.meetup.com/find/?keywords=bike&location=us--az--Tempe&source=GROUPS
- https://www.meetup.com/find/?keywords=bike&location=us--az--Mesa&source=GROUPS
- https://www.meetup.com/find/?keywords=mountain%20biking&location=us--az--Mesa&source=GROUPS
- https://www.meetup.com/find/?keywords=cycling&location=us--az--Mesa&source=GROUPS
- https://www.meetup.com/e-bike-az-adventures/events/
- https://www.meetup.com/e-bike-az-adventures/events/?type=past
- https://www.meetup.com/e-bike-az-adventures/events/ical/
- https://www.meetup.com/e-bike-az-adventures/events/316900906/
- https://www.meetup.com/phx-fold-folding-bike-meetup/events/316953162/
- https://www.meetup.com/phx-fold-folding-bike-meetup/events/?type=past

**City of Mesa**

- https://mesaaz.gov/mesamoves (403)
- https://mesanow.org/news/public/article/3642
- https://mesanow.org/news/public/article/3641
- https://mesanow.org/news/public/article/3459
- https://mesanow.org/news/public/article/3276

**Directories and leads**

- https://www.btwphx.com/ (429, then 200; events load by script)
- https://www.grouprides.cc/search?q=Tempe
- https://www.grouprides.cc/search?q=Mesa%2C%20AZ
- https://sweatpals.com/event/thursday-night-bikeride/2026-10-01
- https://reddit.sentinel-team.org/posts/1pqwzwd/snapshots/2025-12-20T10%3A30%3A45.41187Z (lead only)
- https://reddit.sudovanilla.org/r/mesaaz/comments/1js6its/cyclomesa_today (lead only)
