# world-rest — deep sweep report

Area: `world-rest` (everything outside the US, UK, Canada and Mexico). Agent: group-ride scout. Date: 2026-10-01.

**Read this first.** The target was about 40 new rides. I'm handing over 13. The WebSearch tool was capped, so I could not search for Strava club events, shop pages or club calendars by city. Direct fetches of guessed club, shop and federation sites mostly failed or turned out to be advocacy pages with no ride schedule. What worked was Meetup group pages and their iCal feeds, the criticalmass.in API, and municipal programme pages. Most of the city list (Paris, Lyon, Barcelona, Madrid, Lisbon, Milan, Rome, Girona, Mallorca, Zürich, Brussels, Copenhagen, Stockholm, Oslo, Helsinki, Prague, Warsaw, and most of South America, Seoul, Taipei) has no new ride yet. The leads below are where a searcher with Strava and Google should start.

## Summary

New rides in `world-rest.json` (13; 7 high, 6 medium): 

| Country | City | Rides |
|---|---|---|
| Germany | Berlin 1, Hamburg 1, Frankfurt 1, Köln 1 | 4 |
| Australia | Sydney 3 | 3 |
| Ireland | Dublin 3 | 3 |
| Colombia | Bogotá 1 | 1 |
| Singapore | Singapore 1 | 1 |
| New Zealand | Auckland 1 | 1 |

Hosts: no host has more than 3 rides (Dublin Easy Wheelers 3, BIKEast 2). None of the new rides is on the site already; none is LGBTQ-focused, so the never-list did not come into play. Early-morning: BIKEast Saturday 7:30, Singapore Sunday 7:00. Beginner: Singapore Sunday (host's words). No women / trans / femme, gravel or queer rides made it in (see leads).

Re-check of the 10 listed rides: 7 confirmed, 0 changed, 0 seasonal-break, 0 paused, 0 ended, 3 couldn't re-check.

## Why these

- **Critical Mass Hamburg** — the biggest mass ride in the list: last Friday, 1,100 to 1,800 riders in summer 2026, start point moves each month.
- **Critical Mass Berlin (Friday evening)** — last Friday, 8:00 pm, Mariannenplatz, about 38 km; 800 to 1,800 riders logged Aug and Sept 2026.
- **Critical Mass Frankfurt (Friday evening)** — second Friday, 7:00 pm at the Alte Oper; 220 to 670 riders logged June to Sept 2026.
- **Critical Mass Köln** — last Friday, 6:00 pm, Rudolfplatz; 25 to 246 riders logged.
- **Ciclovía de Bogotá** — the original: Sundays and holidays, 7:00 am to 2:00 pm, 141 km of closed streets. Riders ask for it.
- **BIKEast SupaSaturday, Moore Park to Ramsgate** — a weekly 7:30 am Saturday coffee ride in east Sydney, 36 km, a 1970s-era Saturday ride.
- **BIKEast Eastern Sydney Coastal Explorer** — easy Sunday-morning coast and harbour ride from Bondi Junction, every second Sunday.
- **Balmain Bike Bus** — a led Wednesday commute ride over the Anzac Bridge (medium: no October date was posted yet).
- **Dublin Easy Wheelers: Howth Social Cycle** — Friday evening, 25 km, flat, pub at the end.
- **Dublin Easy Wheelers: Killakee Viewpoint** — Thursday evening, one steep climb, lights required.
- **Dublin Easy Wheelers: Sunday Wicklow loop** — 60 km, 850 m, lunch in Glencree; newcomers welcome but not for beginner cyclists.
- **Sunday Cycling, Woodleigh to East Coast Park (Singapore)** — weekly 7:00 am, park connectors only, beginners welcome.
- **Over 60 Peddlers (Auckland)** — weekly Thursday 10:30 ride for people over 60; start changes each week (medium).

## Where rides are posted here

Machine-readable and worth re-reading:

- **Meetup iCal feeds** (`https://www.meetup.com/<group>/events/ical/`) load for curl and carry date, time and title (not the venue; open the event page for that). Fetched and seen with this ride's events: `bikeast`, `dublin-easy-wheelers`, `over-60-peddlers`, `sunday-cycling-woodleigh-eunos-ecp-loop`, `atac-amsterdam-triathlon-and-cycling`. The group page itself embeds venue, description and past events in its page JSON, which is how I got proof of life for past rides.
- **criticalmass.in API** (documented on the site): `https://criticalmass.in/api/<city>` (social links), `/api/cycles?citySlug=<city>` (the monthly rule), `/api/ride?citySlug=<city>&year=2026&month=9` (rides with `estimated_participants`, distance and duration once a rider logs it). The "next ride" the site shows is calculated from the rule and proves nothing by itself; a logged rider count does. Only German cities had counts in Jul to Sept 2026 (Berlin, Hamburg, Frankfurt, Köln, Dresden, Bremen, Mainz, Offenbach, Wiesbaden, Münster and others).
- **IDRD Bogotá** `https://www.idrd.gov.co/ciclovia` and the news page `https://www.idrd.gov.co/noticias` (dated items).
- **Meetup topic pages** (`https://www.meetup.com/topics/cycling/<cc>/<city>/`) list a few group slugs in their page JSON, and only for some cities (Sydney, Melbourne, Auckland, Singapore, Dublin, Berlin, Amsterdam gave groups; most others came back empty).
- **ADFC Veranstaltungsportal** (German cycling club federation): the site's own API `https://api-touren-termine.adfc.de/api/eventItems/search?lat=..&lng=..&radius=..&beginning=..&end=..` returns JSON. In Berlin it held only about 60 items in two months and no recurring weekly rides, so I used none. Other German regions may differ.
- **Rapha events** `https://events.rapha.cc/rapha-<city>`: clubhouses at Amsterdam, Berlin, Copenhagen, Mallorca, Munich, Melbourne, Seoul, Singapore, Sydney, Taipei, Hong Kong, Shanghai (plus London, UK, not mine). Plain curl gets a bot check; WebFetch reads them but the pages give ride names and weekdays without start times and with no dated slots after Sept 2026, so I did not list them. See Couldn't confirm.

## Re-checked

- `osaka-jp-ys-road-osaka-honkan-sunday-ride` — confirmed. Store blog post of Sept 25, 2026 re-announces the Sept 27 ride, 8:30 am, after the August heat break. October dates not yet posted.
- `tokyo-jp-night-pedal-cruising-monthly-ride` — confirmed. Meetup shows Jun 20, Jul 18, Aug 15 and Sep 19 rides; no October event posted yet.
- `tokyo-jp-jbpi-palace-cycling` — confirmed. JBPI page (notice of Jul 13, 2026) and the FY2026 calendar PDF match the record: summer break to Sept 13, off on Oct 18, winter break Dec 27 to Jan 24, off Mar 7.
- `tokyo-jp-giant-store-meguro-dori-saturday-morning-ride` — confirmed. Store post dated Sept 19, 2026: every Saturday 7:00 am, no booking.
- `panama-city-pa-recreovia-cinta-costera` — confirmed, on news. Telemetro of Sept 19, 2026 quotes the Alcaldía's post cancelling Sept 20 for the marathon. mupa.gob.pa itself has nothing dated after July about the Sunday programme.
- `kigali-rw-city-of-kigali-car-free-day` — confirmed, on news only. KT Press of Sept 13, 2026 (Kicukiro, Sonatube to IPRC, "twice-monthly"). The City's own page is from 2019.
- `cape-town-za-pedal-power-association-saturday-social-rides` — confirmed. PPA events page: series Aug 1, 2026 to Feb 21, 2027, Saturday 6:30 am from Mowbray.

## Couldn't re-check

- `tokyo-jp-rapha-tokyo-ride-this-city` — `events.rapha.cc` is behind a bot check (403 "Just a moment"). WebFetch reads the Tokyo page but shows no dates or times; the Rapha clubhouse page says rides exist and nothing more. No entry written.
- `abu-dhabi-ae-yas-marina-circuit-trainyas` and `abu-dhabi-ae-yas-marina-circuit-trainyas-ladies` — both detail pages redirect in a loop and end on the Health and Fitness hub. The hub shows a schedule block for Aug to Nov 2025 and a rain-cancellation banner for Mon Mar 23, 2026, nothing newer. No evidence either way for autumn 2026. No entry written. (The record's own notes say to watch @ymcofficial for the restart.)

## Rejected

- **ATAC, Amsterdam Triathlon and Cycling Club** (Meetup `atac-amsterdam-triathlon-and-cycling`). Weekly rides almost every day (Mon, Thu early birds 6:30 am from Klein Kalfie and Nescio Bridge; Mon to Fri evenings, 37 to 90 km), all dated in the iCal feed for Oct 2026. Rejected: the club's FAQ (seen Oct 1, 2026) says it cannot accommodate taster sessions and only paid members (€50 a year) can RSVP. Members-only with no guest way in.
- **Dicycles Roadies, Centennial Park Laps (Sydney)**: Mondays 6:00 am on Sept 14 and 28, 2026, but the Meetup events carry no venue or description, no ride is posted after Sept 28, and the first listed has no start. Not enough to list.
- **Meetup groups that only run one-off events**: Melbourne Bicycle Touring Club (`melbourne-bicycle-touring-club`, a different route every ride), `melbournecycling`, `north-east-melbourne-casual-cycling-meetup-group`, `auckland-cycling-group` (MTB trips), `berlin-walking-biking-meetup-group` (mixed hiking and "relaxed cycling" events), `brompton-berlin` (occasional events). No fixed weekly or monthly ride.
- **Santiago CicloRecreoVía** — see Couldn't confirm.

## Couldn't confirm

Local riders: please check these by hand.

Critical Mass rides on criticalmass.in with a monthly rule but no rider count logged in Jul to Sept 2026 (they may well run; the platform just has no log). Rule as the platform lists it, local time:
- Munich: last Friday, 6:00 pm, Max-Josef-Platz (Odeonsplatz, in front of the Opera). https://criticalmass.in/muenchen
- Vienna: third Friday, 5:00 pm, Schwarzenbergplatz. https://criticalmass.in/wien
- Zürich: last Friday, 6:45 pm, Stadthausanlage (Bürkliplatz). https://criticalmass.in/zuerich
- Stockholm: last Friday, 6:00 pm, Medborgarplatsen. https://criticalmass.in/stockholm
- Oslo: last Friday, 5:00 pm, Universitetsplassen. https://criticalmass.in/oslo
- Milan: last Friday, 7:00 pm, Piazza Sicilia. https://criticalmass.in/milano
- Lisbon: last Friday, 6:00 pm, Marquês de Pombal; and Tuesday nights 9:00 pm, Monumento ao Duque de Saldanha, weeks 1 to 4. https://criticalmass.in/lisboa
- Porto: last Friday, 6:30 pm, Praça do Marquês de Pombal. https://criticalmass.in/porto
- Barcelona (Massa Crítica): first Friday, 8:00 pm, Arc de Triomf. https://criticalmass.in/barcelona
- Montevideo (Masa Crítica): second Sunday, 4:00 pm, Obelisco. https://criticalmass.in/montevideo
- Buenos Aires: last Saturday, 4:00 pm, Obelisco. https://criticalmass.in/buenos-aires
- Rio de Janeiro: last Friday, 3:00 pm, Cinelândia. https://criticalmass.in/rio-de-janeiro
- Osaka: last Friday, 7:30 pm, 中之島公会堂 (Nakanoshima Public Hall). https://criticalmass.in/osaka
- Berlin's first-Sunday 2:00 pm ride from the Brandenburger Tor (the platform lists it; no counts).

Others:
- **Santiago CicloRecreoVía** (https://ciclorecreovia.cl/) — host's own page says every Sunday 9:00 am to 2:00 pm (Santiago, several communes; Viña del Mar 9:00 am to 1:00 pm), free. Nothing on the page is dated 2026, so no proof of life. Probably running; check the Instagram or Facebook (https://es-la.facebook.com/CicloRecreoVia/).
- **Rapha clubhouse rides** (https://events.rapha.cc/rapha-<city>), listed without start times and with Easol slots not readable: Amsterdam (Breek de Week, Wednesday, 60 km at 29 to 32 km/h; Saturday Club Ride; Sunday Social, 80 km at 28 to 30), Berlin (Monday Sundowner, 60 km at 27 km/h; Wednesday Early Bird; Saturday clubhouse ride; Women's Rides "coming soon"), plus Copenhagen, Mallorca, Munich, Melbourne, Seoul, Singapore, Sydney, Taipei. Slots on the Berlin Monday page ran "June 2025 to September 2026" and showed sold out. A rider can open the "book" link in a browser to see start times.
- **Dicycles Roadies (Sydney)**, https://www.meetup.com/dicycles/ — see Rejected.
- **PrideOutside (Melbourne, LGBTQ outdoors Meetup)**, https://www.meetup.com/prideoutside/ — 2,900 members; a "Social Bike Ride: Elwood to Westgate Park and Back" was postponed to Oct 11, 2026. Rides are occasional, not a series, so not listed. Worth a look for a queer ride; Australia is not on the never-list.
- **Melbourne Girls Outside**, https://www.meetup.com/melbourne-girls-outside/ — women's outdoor group; I did not find a recurring bike ride.
- **Bike Leichhardt (Sydney)**, https://www.meetup.com/bike-leichhardt/ — also runs Sunday and Monday rides (Pyrmont meander, Labour Day loop); each is a one-off on the pages I saw.
- **Hamburg and Berlin CM homepages**: `criticalmass.hamburg` did not resolve from here and `critical-mass-berlin.de` is flagged dead by the platform; the records link them or not accordingly.

Not attempted (no fetchable source found, no search): Copenhagen, Helsinki, Prague, Warsaw, Paris, Lyon, Madrid, Rome, Girona, Mallorca, Brussels, Quito, Lima, Medellín, São Paulo, Seoul, Taipei, Tokyo and Osaka beyond the existing rides, Melbourne women's and gravel rides, Cape Town beyond the existing PPA record, and Kigali beyond Car Free Day. Municipal Ciclovía programmes in Medellín (Inder site renders in JavaScript), Quito, Lima and São Paulo (Paulista Aberta, Ciclofaixa de Lazer) are the next open-streets entries to add.

## Stats

- Candidates looked at: about 45 (Meetup groups 21, criticalmass.in cities 20, municipal and other 10).
- Listed: 13 (7 high, 6 medium).
- Couldn't confirm: 20 leads above (13 criticalmass.in rules, Berlin's Sunday ride, Santiago, the Rapha clubhouses, Dicycles, PrideOutside, Melbourne Girls Outside, Bike Leichhardt), plus 3 Job 1 rides I could not re-check.
- Rejected: 1 members-only (ATAC), 1 too thin (Dicycles), 6 one-off Meetup groups.
- Job 1: 10 listed rides; 7 confirmed, 3 couldn't re-check.
- Page fetches: about 155, plus 40 API and feed calls.
- Dry runs (Oct 1, 2026): merge accepts 13 of 13; rides-apply accepts 7 of 7, no new validation errors.

## Sources

Job 1:
- https://ysroad.co.jp/osaka/category/event/cat125/sunday_ride
- https://ysroad.co.jp/osaka/category/event/cat125/sunday_ride/feed
- https://ysroad.co.jp/osaka/2026/09/25/265436
- https://www.meetup.com/tokyo-night-pedal-cruising-npc/events/
- https://www.meetup.com/tokyo-night-pedal-cruising-npc/
- https://jbpi.or.jp/guidance/palace/
- https://jbpi.or.jp/wp-content/uploads/2026/04/2026年度パレスサイクリング事業開催カレンダー.pdf
- https://giant-store.jp/meguro/category/event/
- https://giant-store.jp/meguro/bike/33962/
- https://events.rapha.cc/rapha-tokyo (WebFetch, no dates)
- https://events.rapha.cc/products/ride-this-city-tokyo (403)
- https://content.rapha.cc/jp/ja/clubhouses/tokyo
- https://mupa.gob.pa/ and https://mupa.gob.pa/?s=recreov
- https://www.telemetro.com/nacionales/recreovia-cinta-costera-este-domingo-20-septiembre-horario-y-actividades-n6092338
- https://www.telemetro.com/nacionales/recreovia-regresa-este-domingo-la-cinta-costera-horario-y-actividades-n6085504
- https://www.ktpress.rw/2026/09/when-thousands-leave-their-cars-behind-kigali-turns-streets-into-spaces-for-health/
- https://www.ktpress.rw/?s=car+free+day
- https://www.kigalicity.gov.rw/news-detail/expanding-kigali-car-free-day
- https://www.pedalpower.org.za/events/ppa-social-rides
- https://www.yasmarinacircuit.com/en/healthandfitness/trainyas-detailpage and /trainyas-ladies (redirect loop)

Job 2:
- https://criticalmass.in/berlin, /hamburg and the API at https://criticalmass.in/api/ (city list, `/api/<slug>`, `/api/<slug>/current`, `/api/cycles`, `/api/ride`)
- https://www.idrd.gov.co/ciclovia, https://ciclovia.idrd.gov.co/, https://www.idrd.gov.co/noticias
- https://www.meetup.com/bikeast/ (+ events/ical, events/316728162, events/316396524), https://www.bikeast.org.au/ and /rides/
- https://www.meetup.com/bike-leichhardt/ (+ events/316150340), https://bikeleichhardt.org.au/
- https://www.meetup.com/dublin-easy-wheelers/ (+ events/ical, events/316734111, 316770343, 316784666)
- https://www.meetup.com/sunday-cycling-woodleigh-eunos-ecp-loop/ (+ events/316742543, events/ical)
- https://www.meetup.com/over-60-peddlers/ (+ events/316293000, events/ical)
- https://www.meetup.com/atac-amsterdam-triathlon-and-cycling/ (+ events/ical), https://www.atac-club.nl/, /weekly-schedule, /faq
- https://www.meetup.com/dicycles/, /melbourne-bicycle-touring-club/, /melbournecycling/, /north-east-melbourne-casual-cycling-meetup-group/, /auckland-cycling-group/, /prideoutside/, /melbourne-girls-outside/, /brompton-berlin/, /berlin-walking-biking-meetup-group/, /sg-thailand-road-cycling-and-events/
- https://ciclorecreovia.cl/
- https://events.rapha.cc/ and /rapha-amsterdam, /rapha-berlin, /products/rapha-berlin-monday-sundowner (WebFetch); https://content.rapha.cc/eu/en/clubhouses/amsterdam and /berlin
- https://touren-termine.adfc.de/ and https://api-touren-termine.adfc.de/ (looked at, none used)
- https://www.ysroad.co.jp/support/teamy/category/sunday.html, https://ysroad.co.jp/funabashi/category/event/sr, https://ysroad.co.jp/ikebukuro/category/event, https://giant-store.jp/gscc/ (Japan: no new recurring ride found)
- Looked at and not usable (advocacy or no schedule): https://www.radlobby.at/wien, https://www.gracq.org/, https://www.provelozuerich.ch/, https://www.bicyclensw.org.au/, https://www.bikeauckland.org.nz/, https://www.mubi.pt/, https://cykelframjandet.se/, https://www.cyklistforbundet.dk/, https://syklistene.no/, https://pyoraliitto.fi/, https://www.fub.fr/, https://www.cyclingireland.ie/, https://www.bicyclenetwork.com.au/, https://www.provelo.org/
