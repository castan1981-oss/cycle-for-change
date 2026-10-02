# Second pass, group g1-socal-nyc (Oct 2, 2026)

Areas: ca-la, ca-south, nyc, ny-upstate. Agent: second-pass scout. 67 leads worked.

## Counts

| Outcome | Leads |
|---|---|
| proven | 15 (12 new, 3 already on the site) |
| gone | 4 |
| still-unproven | 48 |

New records in `g1-socal-nyc.json`: 13 (12 leads; Santa Clarita Velo gives two rides). High: 4. Medium: 9.
By place: Long Beach 4, Cerritos 1, Los Angeles 1, Santa Clarita 2, Ventura 1, San Diego 1, Brooklyn 2, Ithaca 1.

A dry run of `tools/merge-ride-research.js --dry` accepts 11 of the 13. It refuses the two full-moon
rides (Awarewolfs, Ithaca) with "no day": they have no fixed weekday and I left `days` empty on
purpose. If you want them in, set a day by hand (Ithaca's next ride, Oct 26, is a Monday).

The three leads that were already on the site (Queer Joyride, Queercicle, Different Spokes) are marked
`proven` in the outcomes file with a fresh dated source in the note, and were not added again.

## Why these

- Bergen Bike Bus (Brooklyn): weekly Wednesday 7:15 am school-run bike bus for families and kids; the lead had it in the wrong state.
- Prospect Park Moon & Magic Hour Ride (Brooklyn): monthly Saturday 7:15 pm, an iCal feed shows the Oct 31 ride.
- Kidical Mass (Long Beach, Bixby Knolls): monthly Sunday family ride, host page names Sept 20.
- Lbians Ride (Long Beach): queer social ride, about monthly, Sept 27 on the calendar.
- VFIXII (Long Beach): fast Wednesday night ride from 4th and Cherry.
- LB Cannonball Run (Long Beach): Tuesday night taco ride.
- Thursday Squad, Long Beach Riding Club (Cerritos): fast Thursday 5:45 pm.
- The People's Ride (Los Angeles): last-Friday community ride, relaunched July 2026.
- Santa Clarita Velo Saturday and Sunday rides: the club's own site; Sunday is no-drop.
- Ventura Cycling Club Tuesday ride: no-drop, 5:00 pm, from the shop's community page.
- Awarewolfs Full Moon Bike Ride (San Diego): every full moon since 2010; Aug 27, 2026 ride on a San Diego calendar.
- Full Moon Lighted Bike Ride (Ithaca): host lists every 2026 date; last of the season is Oct 26.

## Where rides are posted here

- **Long Beach: the Bike LB calendar is the key.** `bikelb.com/calendar/` is three public Google Calendars,
  all readable as `.ics` with no login: Rides (dated), Weekly (repeating entries) and Events. The
  ids are in the page source. Most Long Beach groups (VFIXII, Cannonball, Thursday Squad, Lbians, Kidical
  Mass, The People's Ride) put their rides there and run everything else on Instagram. The calendar
  also holds Sun Dazies (FTWNB only), Sports Basement Long Beach (2nd and 4th Saturday), Two Wheels One Love (Monday)
  and Bestias Salvajes. I did not add those: they were not leads, and two have conflicting times between sources.
  Worth a follow-up scout.
- `longbeachbikerides.com` is a good undated weekly directory (a lead, never proof).
- **San Diego: `bikingis.fun`** is a volunteer calendar with its events embedded in the page script
  (dates are Excel serial numbers). It listed FMBR #195 and about 20 other rides, including coffee
  rides and Critical Mass. Its copy was last modified Aug 27, 2026, so it can be a month stale.
- **Brooklyn: Time's Up!** runs a WordPress events calendar; `times-up.org/calendar/ical/` is a working feed with
  the Thursday social ride, the Wednesday skate and the Moon ride.
- **Strava clubs** give a club description but no dated event to a plain fetch. Event pages found by
  search worked in the first sweep; search ran out here after the first 20 leads.
- Machine-readable: Bike LB calendars, Time's Up! feed. Not readable: Meetup `.ics` ("Invalid feed
  signature"), Strava, Instagram, Facebook.

## Re-checks the site needs (surprises)

1. **Slow Spokes is on its winter break.** `slowspokesusa.com` says "Thank You for a Great 2026 Season",
   the rides return in 2027, and registration is "coming soon" with no dates. The three leads are `gone`
   for now. The two Slow Spokes rides already listed need a seasonal break:
   `buffalo-ny-slow-spokes-tuesday-wilkeson-pointe-ride` and `lockport-ny-slow-spokes-friday-ride`.
2. **Leucadia Cyclery's community page looks like template copy.** It lists a $85 "San Diego Century",
   a Women's Cycling Summit and "North County Cyclists $30/year", and the shop's events calendar page is
   empty. The already-listed `encinitas-ca-leucadia-cyclery-sunday-social-ride` rests on this page.
   I left all four Leucadia leads unproven. Worth a call to the shop.
3. **A lead pointed at the wrong place.** "Bergen Bike Bus, Bergen County NJ" is a Brooklyn school bike bus.
4. **thegravelcollective.com is dead** (Squarespace "Domain Not Claimed"). Rochester Gravel Collective is `gone`
   as a website; it may still ride and post on social media.
5. Rochester Bicycling Club's weeknight and weekend rides are on a private Meetup (location hidden to non-members).
   Not listed.
6. Rapha LA Social Saturdays is weekly at 8:00 am from the Santa Monica clubhouse but is an RCC member ride "unless stated otherwise". Left out.
7. Santa Clarita Velo's own pages disagree: the home page says 7:00 to 8:00 am, the events page says 8:00 am. I used 8:00 and said so.
8. The Bike LB calendar and longbeachbikerides.com disagree on the Cannonball Run start (Valparaiso Plaza versus the cannon at Junipero and Ocean).

## Rejected

- Slow Spokes at Old Man River, Fattey Beer Co. and Lewiston: 2026 season over (slowspokesusa.com, Oct 2, 2026).
- Rochester Gravel Collective: website dead (Oct 2, 2026).

## Couldn't confirm (the full list is in the outcomes file)

48 leads. Reasons, in order of how common:
- Instagram or Facebook only (login wall): Co.Motion Buffalo, Wheel Women of Tryon, Rochester Rainbow Riders, Coffee & Cogs 585, Grey Area, Yawn@Dawn ROC, Campus Cycling Collective, East Side Bike Club, Tuesday Night Riding Collective, Major Taylor Rochester, No Spandex Saturday, Ventura Coffee Ride, NightCAP (already listed).
- Strava club says the days but no time or dated event: Northstar, Niagara Shootout, 716 Group Rides, Pedal for Pilsners, Shickluna Women's Devo.
- Page gives the day but no start time: Danny's Mohegan Lake (Saturday), Backroads Cycling Club (Tuesday), Eastside Pedalers (Thursday).
- Old or one-off: Brommie Yummie (2019 dates), Rubber N' Road (2023 Strava dates), BGDBNYC beginner rides (two one-offs), Major Taylor SD and Queer Sol (annual events), BCI NewB (on demand).
- Site blocked: Fast & Fabulous (no connection), Rouleur Brewing (403), Old Kranks (bot check, ride page 404), Shickluna (bot check), Rapha (403 to a plain fetch).

## Stats

- Leads worked: 67 of 67.
- Page fetches: about 150 (curl and WebFetch). WebSearch: about 20 before the session's cap ran out; WebFetch also began refusing mid-run.
- Evidence dates: Long Beach calendar entries last edited Feb to Sept 2026.

## Sources

bikebus.nyc/bergen-bike-bus; getwomencycling.com/calendar-of-events; times-up.org/calendar/ and /calendar/ical/;
bikelb.com/calendar/ (three public Google Calendar feeds); longbeachbikerides.com; bixbyknollsinfo.com/events/kidical-mass/;
santaclaritavelo.org and /events/; strava.com/clubs/115506, /queercicle, /venturacycling, /mybike, /1185197, /884353, /1232679, /1241012, /679954;
venturacycling.com/articles/community-pg219.htm; theawarewolfs.com/fmbr/; bikingis.fun; bikewalktompkins.org/lighted-rides;
slowspokesusa.com; reconnectrochester.org/bike-scene-overview/; rochesterbicyclingclub.org and meetup.com/rbc-ny/;
leucadiabikes.com/pages/local-community and /events-calendar; sdbikecoalition.org/calendar; bikeirvine.org/newb-rides;
mybike.la/pages/group-rides; events.rapha.cc; differentspokes.com; ma.to Queer Joyride event; linktr.ee/qjrnyc and /bgdbnyc;
webikenyc.org; bicyclehabitat.com/articles/event-calendar-pg571.htm; dannyscycles.com and martysreliable.com rides pages;
northstarbike.com/group-rides; brommieyummie.wordpress.com; thegravelcollective.com (dead).
