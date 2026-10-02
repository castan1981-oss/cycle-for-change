# Second pass, group g8-world (UK, Canada, Mexico, world rest)

Agent: Claude (second-pass scout). Date: 2026-10-02. Input: `g8-world-leads.json` (89 leads).
Outputs: `g8-world.json` (27 new records), `g8-world-outcomes.json` (89 entries), this report.

## Counts

| Outcome | Leads |
|---|---|
| proven | 21 (18 with new records, 3 already on the site) |
| gone | 1 |
| still-unproven | 67 |

The 21 proven leads gave 27 records: Rapha clubhouses 11 (Sydney 2, Melbourne 3, Berlin 1, Mallorca 3, Singapore 2), Critical Mass 5 (Munich, Vienna, Zürich, Barcelona, Montréal), open-streets 5 (Querétaro, Morelia, Cancún, Santiago, Viña del Mar), club and community rides 6 (Cycle Islington Women's Ride, Ealing Leisurely Ride, Wild Cycling, Queer Bike Club Ottawa Level 2, Rocky Lake Saturday and Sunday). Confidence: 18 high, 9 medium.
`node tools/merge-ride-research.js --dry research/rides/deep/second-pass/g8-world.json` accepts all 27 (AU 5, CA 4, ES 4, GB 3, MX 3, DE 2, SG 2, CL 2, AT 1, CH 1).

Three proven leads are already on the site, so nothing new was added: Auster intro rides (Fri 7:00 Richmond Park), Richmond Park Velo's Strava club and Cycle Club London's Strava club. They are marked `proven` with a note, not `still-unproven`.

One record is not from a lead: Queer Bike Club Ottawa's Level 2 rides. The Ottawa Lesbian Outdoor Group lead was a dead end (private Meetup), and the search for it turned up this all-genders LGBTQ+ club with a public Google Calendar.

## Why these (new records)

- Cycle Islington Women's Ride (London). Sun Oct 11, 10:00, free, women only. Host page lists Jul 12, Sep 6, Oct 11. Not weekly.
- Ealing Leisurely Ride (London). First Sunday monthly, 10:00 from Ealing Town Hall, no-drop pace. Next Oct 4.
- Wild Cycling Saturday Rides (London). Gravel and off-road, 10:00 every two weeks, a different railway station each time, e-bikes welcome.
- Queer Bike Club Ottawa Level 2. Every other Monday 6:45 pm, St. Luke's Park. Public ICS feed with dates.
- RLC Saturday and Sunday Cookie rides (Bedford, Halifax). Real club rides with a named start. Members only, but you can join online.
- Masse Critique Montréal. Last Friday, 5 pm at the Mont-Royal statue. Proof is the group's own Mastodon posts (Sep 25, 2026).
- Rapha Sydney Wednesday Open Ride and Thursday Ladies Open Ride. 6:00 am from Taylor Square, open to non-members, women's ride is the Thursday.
- Rapha Melbourne Southside (Thu 6:00), Social Saturday (Sat 8:00, no-drop, new riders) and Mt Pleasant (Sat 7:30).
- Rapha Berlin Wednesday Early Bird. 7:00 am from the Mitte clubhouse, booking slot Oct 7.
- Rapha Mallorca Social (Tue), Spicy (Thu) and Easy (three Saturdays a month, no-drop). 8:30 am from the Palma clubhouse.
- Rapha Singapore Wednesday (RaphaLoloWednesday) and Friday Social. 5:30 am from MacRitchie Reservoir.
- Critical Mass Vienna (third Friday 5 pm), Zürich (last Friday 6:45 pm), Munich (last Friday 6 pm), Barcelona (first Friday 8 pm). The first two have dated posts on the group's own site (high); Munich and Barcelona have the schedule on the group's site with no dated post (medium).
- Open streets: Querétaro (Cerro de las Campanas, Sun 8 to 12), Morelia (Av. Madero, Sundays), Cancún PuenteAndo (last Sunday, evening, started Jul 26, 2026), Santiago and Viña del Mar CicloRecreoVía (Sundays).

## Where rides are posted here

- Rapha: `events.rapha.cc/<rapha-city>` lists the rides but no times. The times and dates sit on each ride's `/products/<slug>` page and its `/shop/<slug>?slot_id=` page (a dated list). The site blocks scripted reads (403, Cloudflare), so every Rapha fact was read through the fetch tool, not the raw page. A re-check by agent works; a plain script will not.
- Critical Mass: the group's own site first. `criticalmass.in` has a JSON API at `https://criticalmass.in/api/<city>/current` (the city description, often with the rule) and `/api/<city>/<yyyy-mm-dd>` (`estimated_participants`, `photos`, `tracks`, `posts`). Future dates on the platform are generated from the rule, so they prove nothing. A logged rider count, photo or track in the last months does.
- Mastodon: a group's public account can be read without a login at `https://<server>/api/v1/accounts/lookup?acct=<name>` then `/api/v1/accounts/<id>/statuses`. This proved Montréal. Worth trying for other Critical Mass groups (Munich, Berlin and Vienna list Mastodon or Bluesky).
- Google Calendar ICS: Queer Bike Club Ottawa links its public `.ics` from its home page.
- LCC (London Cycling Campaign) borough groups: each ride has an event page on `lcc.org.uk/events/`; the borough group's own site names the next ones.
- Meetup: the `/events/` page carries the event list inside `__NEXT_DATA__` (title, date, venue, status), so a plain script can read it. Private groups hide the venue.
- Let's Ride (British Cycling, `letsride.co.uk/groups/<slug>`): public group pages list past and future rides with date, time and postcode, but booking needs a login.
- Municipal open-streets programmes (Mexico, Chile): news pages are the proof, a municipal notice when a Sunday is skipped. The host's own pages are mostly Instagram or X.

## Rejected and gone

- Gone: Guanajuato Mountain Bikers (Meetup, last event Oct 4, 2014).
- Ended range: Rapha Amsterdam Breek de Week (to about Oct 4, 2026) and Sunday Social (to Jun 2026), Rapha Copenhagen Gravel Club Ride (to Mar 19, 2026), Rapha Munich Girls' ride (Mar to Sep 2026) and Rookie rides (to Jun 2026), Rapha Taipei Wednesdays (Jul to Aug 2025), Rapha Seoul women's open rides (Apr to Aug 2026, now "Coming soon").
- Not weekly: the Mexico City leads from the police traffic notices (Pedal y Taco, Masenbici, Biciorientados, Fénix Bikers and others). Sep 23 and Sep 30 notices show different groups, so no rhythm is proven.

## Still unproven, and how to confirm by hand

See `g8-world-outcomes.json` for each one. Groups, by reason:

- Members only or capped, no guest way in: Wild Bettys (Toronto, $72 plus insurance; Tuesday 6 pm, spots posted in a members' forum), Ottawa Women's Cycling Club, NCR Spoke Sisters, Beaches CC, Etobicoke CC, Morning Glory, Autobus (all four Toronto-area clubs publish a grid or times but no start address and no trial ride), WOWride Vancouver (drop-in only first ride in April and May), Meraloma (waitlist full to 2028).
- Private Meetup, venue hidden: Clapham Cycle, Montreal Cyclists and Bike Enthusiasts, Dicycles Roadies (Mon 6:00 am Centennial Park), Pride Outside (Vic) (Melbourne LGBTQ outdoors, 2,900 members), Ottawa Lesbian Outdoor Group.
- Alive but no fixed day or start: Let's Ride Breeze groups (Edinburgh, Bromley, Sutton, Barnet, Harrow), Horwich Ride Social, Pype Hayes, Velothian, Bike Leichhardt (apart from the Balmain Bike Bus already listed), Saskatoon rambles (Saturday or Sunday, start emailed weekly), Brompton London, Brompton Mexico, London Pedal Together, Sweet Ride gravel.
- Instagram or Facebook only: Critical Mass Lisbon (last Friday 6 pm Marquês de Pombal; LisBora Tuesday 8 pm Saldanha), Buenos Aires (last Saturday 4 pm Obelisco), Milan, Montevideo, Osaka, Oslo, Porto, Rio, Stockholm, Melanin Cycling Squad, Mexico City groups.
- Stale or thin: Rapha London Beyond 100 Women's (one date Oct 11, no start time or place; email london@rapha.cc), Out on the Road (4 members, one event), Giant Halifax Ride Club (COVID-era page), City of Lakes CC (Wed 6:30 pm Grahams Grove, only on a shop list), Bike and Bean Train Gang (Thursdays "from July 10th", no year), Cyclesmith club, Pátzcuaro Isaac del Toro via recreativa (Sundays, four hours, no start time), One Love Cycling (a kit store).
- No link given, nothing found: Victoria E-Bike Club, Chorlton Breeze, East London and Essex Cyclists, Spokes SW Herts.
- Berlin first-Sunday ride at the Brandenburger Tor: listed on criticalmass.in but no rider, photo or track logged. The Friday ride is already on the site.

## Surprises

- The web search cap (200 for the whole session) ran out after about 16 of my searches, so the leads past about #55 had only their given links tried. Group-ride proofs came mostly from direct fetches anyway.
- Most Mexico City "leads" came from the daily police traffic notices (SSC-CDMX, reprinted by La Silla Rota). Those prove a ride rolled that night, not a weekly rhythm, and the Sep 23 notice lacked three of the groups listed Sep 30.
- Let's Ride's women-only Breeze groups are very much alive (rides posted through Oct 2026 with 10 am starts) but run on a different day and start each time. They can be found on the site but do not fit a weekly record. A `kind` or `frequency` for "date-by-date" groups could list them.
- criticalmass.in only logs activity for Berlin and Vienna among the 15 cities checked. Everywhere else, future dates are generated and past rides have no counts.
- Rapha's location pages show no times at all. A ride's `/products/` page does, and several are stale (2025 or Jun 2026 ranges) while still sitting on the location page.
- A few facts differ between sources: Morelia's ciclovía ends at 1 pm or 2 pm; PuenteAndo moved from 4 pm to 5 pm between its first and second edition; Ealing's front page says rides must be booked on LCC while its ride notes say just turn up.

## Stats

- Leads: 89. Searches used: about 16 (then capped). Page fetches: about 230.
- New records: 27. No host has more than 3 rides.
- Left out for safety: none. No LGBTQ-focused ride was listed in a never-list country (the only queer group listed is in Canada, in its own words).

## Sources

Fetched: events.rapha.cc (location, product and shop pages for Sydney, Melbourne, Berlin, Mallorca, Singapore, Amsterdam, Copenhagen, Munich, Seoul, Taipei, London), cycleislington.uk, lcc.org.uk event pages (Islington, Ealing), ealingcycling.org.uk, meetup.com (wildcycling, clapham-cycle, brompton-london, auster-intros, london-pedal-together-meetup, velothian, dicycles, bike-leichhardt, GTO-Mountain-Bikers, montreal-cyclists-and-bike-enthusiasts, brompton-mexico, prideoutside, out-on-the-road, lesbian-outdoor-group), letsride.co.uk group pages, qbcottawa.org and its Google Calendar ICS, wildbettys.com, ottawawomenscyclingclub.ca, spokesisters.ca, wowridecycling.com, beachescycling.com, etobicokecycling.com, mgridetoronto.com, autobuscc.ca, rockylakecycling.ca, gianthalifax.ca, cyclingns.ca, cyclesmith.ca, sweetridecycling.com, saskatooncyclingclub.ca, meralomabikeclub.ca, jasette.facil.services (Mastodon, Masse Critique Montréal), criticalmass.in (city pages and API), criticalmass-muenchen.de, criticalmass.at/category/wien, criticalmass-zh.ch, barcelona.bicicritica.com, ciclorecreovia.cl, expresoqueretaro.com, aldialogo.mx, municipiodequeretaro.gob.mx, mimorelia.com, revistamorelia.com, ntsnoticias.com, cgc.qroo.gob.mx, clicnoticias.com.mx, mcvnoticias.com, escapadah.com, lasillarota.com, bicitekas.org, timeoutmexico.mx, thecoast.ca, strava.com club pages (richmond-park-velo, cc-london, 120055, criticalmassmuenchen).
