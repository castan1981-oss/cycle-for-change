# Homepage facts — events-analyst, read Mon Oct 26, 2026 (Phoenix)

For the homepage rebuild (branch feat/home-editorial-film). Every row below was read on **Oct 26, 2026**.
Sources are the organizer's or org's own pages unless the row says otherwise. Quotes are the page's words.

Freshness (CLAUDE.md §5, agents README): a ride with registration open now or opening within 14 days is
fresh for 14 days, so re-read by **Mon Nov 9, 2026**. Otherwise 60 days, so by **Fri Dec 25, 2026**.

## Must change on the page

1. **Seattle to Portland: "205 to 208 miles, two days" is wrong on both counts.** Cascade's 2027 listing
   says "206.00 mi." Cascade says "Riders have the option to choose between riding this event in one or two
   days." Correct: **206 miles, one or two days** (`WHERE` in `scripts/chrome.js`).
2. **SFAF: "No one turned away for cost." SFAF doesn't say this.** Its about page and homepage have no
   cost wording at all. The closest it gets is on its sexual health services page: "Care will always be
   provided, without regard to ability to pay or insurance status." The same page also says "Some services &
   visits may come with a co-pay or cost." Cut the sentence, or limit it to sexual health care and use SFAF's
   own words. The wording is for the Editor and Robert to decide.
3. **The Mid South: "Mar 11–13" has no source for the end date.** The organizer's registration page
   (Movemint) says only "March 11, 2027 in Stillwater, Oklahoma." There's no end date and no schedule. Show
   **Mar 11** until the organizer posts the days. (The 2026 festival was Mar 12–15 per Visit Stillwater, the
   tourism listing, so assuming Thursday to Saturday isn't safe either.)

Everything else holds. Chino Grinder and El Tour de Tucson stay projected and Recovery Ride stays TBA. None
of the three has a 2027 date posted.

## A. The 13 rides (`riding: true`, data/calendar-2027.json)

| # | Claim (as the page shows it) | Verdict | Correct text / what the source says | Source | Read | Fresh until |
|---|---|---|---|---|---|---|
| 1 | Tour de Palm Springs, Sat Feb 6, 2027, Palm Springs, CA | VERIFIED | "FEBRUARY 6, 2027" · "PALM SPRINGS, CALIFORNIA" (on Perimeter Bicycling Association's site; Perimeter co-runs the ride) | https://eltourdetucson.org/?p=22347 | Oct 26, 2026 | Nov 9, 2026 (registration open) |
| 2 | Belgian Waffle Ride Arizona, Mar 5–6, 2027, Fountain Hills, AZ (McDowell Mountain Park) | VERIFIED, with a caveat | "Fifth Annual Belgian Waffle Ride Arizona March 5–6, 2027 \| Sonoran Desert, Arizona". Race-day venue: "McDowell Mountain Park Staging Area, Fountain Hills, AZ". Caveat on the page: "Final 2027 routes and venue will be announced separately." | https://www.belgianwaffleride.bike/pages/belgian-waffle-ride-az | Oct 26, 2026 | Nov 9, 2026 |
| 3 | The Mid South, Mar 11–13, 2027, Stillwater, OK | CHANGED (start and place VERIFIED, end date UNVERIFIABLE) | "THE MID SOUTH 2027 — March 11, 2027 in Stillwater, Oklahoma." No end date or schedule. Page text: **Mar 11**, Stillwater, OK. | https://www.movemint.cc/events/the_mid_south_2027 (organizer's ticket page; midsouthgravel.com wouldn't load from this session) | Oct 26, 2026 | Nov 9, 2026 (tickets on sale) |
| 4 | Sea Otter Classic, Apr 15–18, 2027, Monterey, CA (Laguna Seca) | VERIFIED | "During Event (April 15-18, 2027)"; onsite registration "Wednesday, April 14, 2027 at noon"; courses at "Laguna Seca Recreation Area". Life Time's own Unbound page lists "Sea Otter Classic Gravel: April 16, 2027", Monterey, CA. | https://www.seaotterclassic.com/downhill/ · https://www.seaotterclassic.com/trail-run/ · https://www.unboundgravel.com/registration/ | Oct 26, 2026 | Nov 9, 2026 (registration open) |
| 5 | Center Ride Out, Apr 23–25, 2027, LA to Ojai, camp, back along the coast to an oceanside finish; 3 days, 200+ miles; 1-day riders ride Day 2 | VERIFIED | "This year's ride will happen on April 23-25, 2027!" · "Ride from Los Angeles to Ojai, camp with your friends, and cruise back along the coast for a spectacular oceanside finish." · "3-day, 200+ mile Southern California cycling adventure" · "1-Day Rider (Day 2 only)". (The page's meta description still says "April 24-26, 2026"; the body is current.) | https://centerrideout.lalgbtcenter.org/en/ | Oct 26, 2026 | Nov 9, 2026 (registration open) |
| 6 | Cycle to Zero, May 21–23, 2027, SF to the Russian River (Guerneville) and back, 3 days | VERIFIED | "May 21-23, 2027" · "3‑day fundraising event" · "Day 1: SF to Guerneville (~85 miles)" · "Day 3: Guerneville to SF (~85 miles)" · Guerneville, "a storied LGBTQ+ village along the Russian River". The route section has no year on it but sits on the page with the 2027 dates. Also: "Join Us May 21 - 23, 2027." | https://www.sfaf.org/get-involved/cycle-to-zero/ · https://cycletozero.donordrive.com/home | Oct 26, 2026 | Nov 9, 2026 (registration open) |
| 7 | Unbound Gravel, Jun 3–6, 2027, Emporia, KS; lottery Nov 1–15, 2026, results Nov 21 | VERIFIED | "June 3 – 6, 2027 \| Emporia, KS" · lottery opens "November 1 at 10:00 AM CT", closes "November 15 at 11:59 PM CT" · "Results will be announced November 21". Life Time Club members' early lottery opened Oct 25. | https://unboundgravel.com/ · https://www.unboundgravel.com/registration/ | Oct 26, 2026 | Nov 9, 2026 (lottery opens Nov 1) |
| 8 | Seattle to Portland, Jul 10–11, 2027, 205–208 miles, one or two days (page shows "205 to 208 miles, two days") | Dates VERIFIED; miles and days CHANGED | "Seattle to Portland 2027" · "Saturday, Jul. 10 2027 • 5:00 am - Sunday, Jul. 11 2027 • 7:00 pm" · "5,100 ft. • 206.00 mi. • Seattle" · "Registrations are closed." · "Riders have the option to choose between riding this event in one or two days." Page text: **206 miles, one or two days**. Cascade's other pages give other figures ("203 to 206 miles" on /STP, "207 miles" on the 2026 page); the 2027 listing is the only one for 2027. The 2027 event page wouldn't load from this session. | https://cascade.org/rides-events?page=0 · https://www.cascade.org/STP | Oct 26, 2026 | Dec 25, 2026 (closed; reopens to members in January) |
| 9 | Friends for Life Bike Rally, Aug 1–6, 2027, Toronto to Montréal, 600 km, 6 days | VERIFIED | "The 6 Day Montreal 600KM will take place from August 1-6th, 2027." · "It departs from Toronto on a Sunday and heads east over 6 days to Montréal, arriving on the Friday." (The 600 km comes from the ride's own name, "Montreal 600KM".) | https://bikerally.org/join-us | Oct 26, 2026 | Nov 9, 2026 (open; the fee steps up Nov 1) |
| 10 | Cycle for the Cause, Sep 24–26, 2027, New York | VERIFIED | "Join us September 24 - September 26, 2027" · "this fully supported Ride will start and end in New York City" · "three-day, tri-state bike ride" | https://support.gaycenter.org/ · https://support.gaycenter.org/events/522 | Oct 26, 2026 | Nov 9, 2026 (registration open) |
| 11 | Chino Grinder, Oct 16, 2027 PROJECTED, Chino Valley, AZ | PROJECTED stands; no 2027 date posted | The registration page still shows "Sat October 17, 2026", at "Chino Valley, AZ 86323 US". No 2027 date. Keep "date projected (2026 was Sat, Oct 17)". | https://www.bikesignup.com/Race/AZ/ChinoValley/ChinoGrinder · https://runsignup.com/Race/AZ/ChinoValley/ChinoGrinder (shendocatracing.com wouldn't load) | Oct 26, 2026 | Dec 25, 2026 |
| 12 | El Tour de Tucson, Nov 20, 2027 PROJECTED, Tucson, AZ | PROJECTED stands; no 2027 date posted | "We hope you participate in this year's event on November 21, 2026." (43rd edition.) No 2027 date anywhere on the page. | https://eltourdetucson.org | Oct 26, 2026 | Dec 25, 2026 |
| 13 | Recovery Ride (Castro Country Club), 2027 dates TBA, Sausalito to Guerneville and back | TBA stands; the organizer's page is UNVERIFIABLE today | The organizer's page wouldn't load from this session. No 2027 dates turned up anywhere. SFAF's joint release (dated May 1, 2025, modified Jul 29, 2026) gives the 2026 edition: "September 11 – 13, 2026" · "a round-trip bike ride from Sausalito to Guerneville" · "camping overnight in Guerneville". The route on the page is the 2026 route. The calendar's "2027 registration now open" couldn't be re-read. | https://www.sfaf.org/news/complimentary-lgbtq-cycling-events-announced-by-castro-country-club-and-san-francisco-aids-foundation/ (organizer: https://www.castrocountryclub.org/recovery-ride, not reachable) | Oct 26, 2026 | Nov 9, 2026 |

## B. The three orgs

| Org | Line on the site | Verdict | What the org says | Source | Read |
|---|---|---|---|---|---|
| one·n·ten | "Phoenix nonprofit for LGBTQ+ youth ages 11 to 24. Safe spaces, housing, leadership." | VERIFIED | "Our mission is to serve LGBTQ+ youth and young adults, ages 11-24." · "a statewide leader in fostering safe spaces and empowering LGBTQ+ youth" · "the housing & workforce programs" · "promote self-expression, self-acceptance, leadership development, and healthy life choices" · "501 (c)(3) nonprofit charitable organization" · main site the "Downtown Phoenix Youth Center" (it also runs statewide satellite sites) | https://onenten.org/about/ | Oct 26, 2026 |
| Los Angeles LGBT Center | "Health, housing and advocacy for LGBTQ+ people." | VERIFIED | "offering programs, services, and global advocacy that span four broad categories: Health, Social Services and Housing, Culture and Education, and Leadership and Advocacy." | https://lalgbtcenter.org/about | Oct 26, 2026 |
| San Francisco AIDS Foundation, first sentence | "HIV, sexual health and harm-reduction services." | VERIFIED | "through sexual health and substance use services, advocacy, and community partnerships" · "Substance use and behavioral health services are based on principles of harm reduction" · menu: "HIV services", "Sexual health services", "Services for people who use drugs", "Overdose prevention & response" | https://www.sfaf.org/about/about-sfaf/ · https://www.sfaf.org/about/ | Oct 26, 2026 |
| San Francisco AIDS Foundation, second sentence (FLAGGED) | "No one turned away for cost." | CHANGED: SFAF doesn't say it, and doesn't say it about all of its services | Sexual health services page: "Care will always be provided, without regard to ability to pay or insurance status." · "We will ensure free care is provided to any client who cannot afford to pay." · "Most clients pay little or nothing for the care they receive." · "Some services & visits may come with a co-pay or cost." · "Can't afford to pay? No insurance? No problem!" Testing page: "There is no fee for HIV and STI testing services." · "Everyone is eligible for our HIV and STI testing services." The about page, the "Our work" page and the homepage have **no** cost wording. The "Our work" page has "regardless of race/ethnicity or immigration status" (about immigration status, not cost). | https://www.sfaf.org/health-services/sexual-health-services/ · https://sfaf.org/services/sexual-health-and-testing/ · https://www.sfaf.org/about-us/our-work/ | Oct 26, 2026 |

## C. Crisis lines

| Claim | Verdict | What the source says | Source | Read |
|---|---|---|---|---|
| 988 Suicide & Crisis Lifeline: call or text 988, any hour | VERIFIED | Name: "988 Suicide & Crisis Lifeline". Call 988, text 988, or chat at chat.988lifeline.org. "Using the 988 Lifeline is free." Texts are "offered 24 hours a day, 7 days a week"; "call the 988 Lifeline at 988". Also on the page: "The 988 Suicide & Crisis Lifeline LGBTQ+ youth specialized service, also known as the "Press 3 option," has been restored" (no date; it doesn't say how to reach it). That's for the resources desk to weigh, not a homepage change. | https://988lifeline.org/get-help/ · https://988lifeline.org/faq/texting-the-988-lifeline/ | Oct 26, 2026 |
| The Trevor Project: 1-866-488-7386, text START to 678-678 | VERIFIED | "Call us at 1-866-488-7386" · "Text 'START' to 678-678" · "Connect to a crisis counselor 24/7, 365 days a year, from anywhere in the U.S via text, chat, or phone." It's for "LGBTQ+ young people" (that page doesn't print an age range). | https://www.thetrevorproject.org/get-help/ | Oct 26, 2026 |

## D. Map coordinates (city centres, Wikipedia infobox, rounded to 2 decimals; west is negative)

| Place | Infobox (decimal) | lat, lng | Source | Read |
|---|---|---|---|---|
| Palm Springs, CA | 33.83028°N 116.54528°W | 33.83, -116.55 | https://en.wikipedia.org/wiki/Palm_Springs,_California | Oct 26, 2026 |
| Fountain Hills, AZ | 33.60°N 111.72°W | 33.60, -111.72 | https://en.wikipedia.org/wiki/Fountain_Hills,_Arizona | Oct 26, 2026 |
| Stillwater, OK | 36.116°N 97.059°W | 36.12, -97.06 | https://en.wikipedia.org/wiki/Stillwater,_Oklahoma | Oct 26, 2026 |
| Monterey, CA | 36.60306°N 121.89361°W | 36.60, -121.89 | https://en.wikipedia.org/wiki/Monterey,_California | Oct 26, 2026 |
| Los Angeles, CA | 34.050°N 118.250°W | 34.05, -118.25 | https://en.wikipedia.org/wiki/Los_Angeles | Oct 26, 2026 |
| Ojai, CA | 34.44917°N 119.24667°W | 34.45, -119.25 | https://en.wikipedia.org/wiki/Ojai,_California | Oct 26, 2026 |
| San Francisco, CA | 37.77750°N 122.41639°W | 37.78, -122.42 | https://en.wikipedia.org/wiki/San_Francisco | Oct 26, 2026 |
| Guerneville, CA | 38.50639°N 122.99083°W | 38.51, -122.99 | https://en.wikipedia.org/wiki/Guerneville,_California | Oct 26, 2026 |
| Sausalito, CA | 37.85917°N 122.48528°W | 37.86, -122.49 | https://en.wikipedia.org/wiki/Sausalito,_California | Oct 26, 2026 |
| Emporia, KS | 38.40389°N 96.19278°W | 38.40, -96.19 | https://en.wikipedia.org/wiki/Emporia,_Kansas | Oct 26, 2026 |
| Seattle, WA | 47.60389°N 122.33000°W | 47.60, -122.33 | https://en.wikipedia.org/wiki/Seattle | Oct 26, 2026 |
| Portland, OR | 45.52000°N 122.68194°W | 45.52, -122.68 | https://en.wikipedia.org/wiki/Portland,_Oregon | Oct 26, 2026 |
| Toronto, ON | 43.65250°N 79.38167°W | 43.65, -79.38 | https://en.wikipedia.org/wiki/Toronto | Oct 26, 2026 |
| Montréal, QC | 45.50889°N 73.55417°W | 45.51, -73.55 | https://en.wikipedia.org/wiki/Montreal | Oct 26, 2026 |
| New York, NY | 40.7128°N 74.0061°W | 40.71, -74.01 | https://en.wikipedia.org/wiki/New_York_City | Oct 26, 2026 |
| Chino Valley, AZ | 34.75833°N 112.42417°W | 34.76, -112.42 | https://en.wikipedia.org/wiki/Chino_Valley,_Arizona | Oct 26, 2026 |
| Tucson, AZ | 32.22194°N 110.97139°W | 32.22, -110.97 | https://en.wikipedia.org/wiki/Tucson,_Arizona | Oct 26, 2026 |
| Phoenix, AZ | 33.44833°N 112.07389°W | 33.45, -112.07 | https://en.wikipedia.org/wiki/Phoenix,_Arizona | Oct 26, 2026 |

## For the calendar (data/calendar-2027.json, not edited here)

- STP `distances` "205-208 miles total": Cascade's 2027 listing says 206 mi, one or two days.
- The Mid South `end` 2027-03-13 and its `date_note` ("Festival Thu–Sat…"): only Mar 11 is published.
- Sea Otter `date_note` says Sea Otter Classic Gravel is Thursday, Apr 15. Life Time's Unbound qualifier list
  says "April 16, 2027". One of the two is wrong; re-read the Sea Otter gravel page.
- Recovery Ride `reg_status` "2027 registration now open": couldn't re-read the organizer today.
- The 988 page says the LGBTQ+ "Press 3 option" is back. That's for the resources pages to consider (CLAUDE.md §4).
