# phoenix-az — community

@community-scout · 2026-10-03

Six clubs and no new rides. Every fact below comes from a page fetched this run (the list is under Sources).
Arizona's rides were swept on Sept 30 and Oct 1. Every recurring ride I could confirm for these clubs is
already in `cfc-site/rides/rides.json`, so the `rides` block is empty. Three directory records no longer
match their host's page. They're listed at the end of "Why these" for a re-check through `tools/rides-apply.js`.

The gap the editor has to know about: **I could not confirm a queer club or ride for Phoenix.** OutCyclists, the
LGBT road club, has nothing dated after May 2022. The Gravel Collective (FTWNB, BIPOC, para-athletes) has a site
that no longer resolves cleanly. Both are under "Couldn't confirm", with where to look.

Notes in the `clubs` block name rides as `{ride:slug|label}` tokens, the way the LA guide does. No day or time is
typed next to a token. Every slug was checked against rides.json today. The women's tag is written
`women-trans-femme`, the guide's word. The rides build stores it as `wtf`.

## Findings

### clubs

```json
[
  {
    "name": "Phoenix Metro Bicycle Club",
    "url": "https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=356095",
    "note": "The Valley's big road club. {ride:tempe-az-pmbc-saturday-cycling|Saturday Cycling} from Kiwanis Park in Tempe is, in the club's words, the big weekly ride for everyone: no-drop with a sweep, about 25 or 35 miles, beginners and newcomers welcome. The club also runs {ride:phoenix-az-pmbc-granada-sunday-breakfast-ride|the Granada Park breakfast ride} in Phoenix and {ride:chandler-az-pmbc-wednesday-no-drop|a no-drop ride} that moves around the Southeast Valley. Visitors are always welcome; helmet on, no earphones.",
    "inclusive_focus": ["no-drop", "beginner"],
    "ride_slug": "tempe-az-pmbc-saturday-cycling"
  },
  {
    "name": "Scottsdale Cycling",
    "url": "https://www.strava.com/clubs/620243",
    "note": "The fast crowd at Gainey Village, Scottsdale Rd and Doubletree Ranch Rd. {ride:scottsdale-az-scottsdale-cycling-gainey-tuesday,scottsdale-az-scottsdale-cycling-gainey-thursday|The two Gainey rides} are rated advanced and start in the dark most of the year, so bring front and rear lights. {ride:scottsdale-az-scottsdale-cycling-saturday-ride|The Fuss Buss} is four to five hours and more relaxed, but still a drop ride, and it ends at coffee. The Strava club is set to invite-only: ask to join there, and expect rain to cancel the ride.",
    "inclusive_focus": [],
    "ride_slug": "scottsdale-az-scottsdale-cycling-gainey-thursday"
  },
  {
    "name": "McDowell Mountain Cycles",
    "url": "https://mcdowellmountaincycles.com/mmc-life/",
    "note": "The Fountain Hills shop posts a ride for every kind of bike on its monthly calendar. There's {ride:fountain-hills-az-mcdowell-mountain-cycles-saturday-road-ride|a no-drop road ride} of 30-plus miles from the shop, and {ride:fountain-hills-az-mcdowell-mountain-cycles-sunday-funday-gravel|Sunday Funday}, about 40 no-drop miles of gravel, road and singletrack. {ride:fountain-hills-az-mcdowell-mountain-cycles-tuesday-night-mtb|TNR}, 15 to 20 miles of night mountain biking, and {ride:fountain-hills-az-mcdowell-mountain-cycles-ladies-mountain-bike-ride|the Ladies Mountain Bike Ride} both leave the Four Peaks lot in McDowell Mountain Regional Park. The shop says everyone is welcome and to check its Facebook page for times.",
    "inclusive_focus": ["no-drop", "gravel", "women-trans-femme"],
    "ride_slug": "fountain-hills-az-mcdowell-mountain-cycles-saturday-road-ride"
  },
  {
    "name": "Valley Epic Rides",
    "url": "https://www.meetup.com/valley-epic-rides/",
    "note": "The weeknight mountain bike group on Meetup: {ride:phoenix-az-taco-tuesday-south-mountain|Taco Tuesday} on South Mountain's trails and {ride:phoenix-az-valley-epic-rides-night-rider-trail-100|the Night Rider series} on Trail 100 in the Phoenix Mountains Preserve, 7 to 12 miles in about two hours. Lights are a must. The group asks you to have five or so mountain bike rides behind you, and points very new riders to the beginner-friendly weekend rides it posts now and then. Join the group and RSVP; a ride with no sign-ups six hours out may be cancelled.",
    "inclusive_focus": [],
    "ride_slug": "phoenix-az-taco-tuesday-south-mountain"
  },
  {
    "name": "Bike Saviours Bicycle Collective",
    "url": "https://www.bikesaviours.org/",
    "note": "The volunteer-run co-op at 420 S Perry Lane, Tempe: an open shop with tools and volunteers who teach, plus repurposed bikes and parts. Open shop Saturday and Sunday noon to 6, Wednesday and Thursday 3 to 9; Monday is donations only, Tuesday and Friday closed (Oct 2026); 602-429-9369. The shop posts a safe-space agreement and says it will always say no to racism, sexism, ageism and homophobia.",
    "inclusive_focus": []
  },
  {
    "name": "Black Girls Do Bike: Phoenix",
    "url": "https://www.blackgirlsdobike.org/chapters",
    "note": "The Phoenix chapter of the national group, which says it centers women of color in cycling. The chapter runs through its Facebook group (facebook.com/groups/BlackGirlsDoBikePhoenix), where rides are posted; join the group and ask for the next one. No ride schedule is published on the site.",
    "inclusive_focus": ["bipoc", "women-trans-femme"]
  }
]
```

### rides

```json
[]
```

## Why these

Clubs, spread across the brief's zones:

- **Phoenix Metro Bicycle Club**: the easiest group ride for a visitor in the Valley. The Saturday ride is no-drop with a sweep and offers two distances. The club's page says beginners and newcomers are always welcome. Its start-time table (8:30 am in January, 6:30 am in summer) is already in the directory record's `start_times`. Granada Park, 20th St and Maryland, is about 6 miles from downtown Phoenix. Zone 3, plus central Phoenix.
- **Scottsdale Cycling**: the dawn rides from Gainey Village, about 11 miles from downtown Phoenix. This is the fast end of a winter training week. The Strava events give the hills and the regroup points, and say lights are needed. Zone 2.
- **McDowell Mountain Cycles**: one shop, four kinds of riding, all on a current October 2026 calendar. It's the way into Fountain Hills, the McDowell park loops and the dirt. The shop is about 23 miles from downtown Phoenix. Zones 2 and 5.
- **Valley Epic Rides**: the dirt group for an evening. Its October dates are live on Meetup (Oct 6, 7, 13, 20). Taco Tuesday meets at Kyrene de las Lomas Elementary in Ahwatukee, about 9 miles from downtown Phoenix. Trail 100's meet spot, 1418 E Sunnyside Dr, is about 10. Zones 1 and 5.
- **Bike Saviours**: the co-op, for a visitor who needs a tool and a stand without a shop bill. The site was updated in late August 2026: it holds an image uploaded Aug 30, 2026. About 10 miles from downtown Phoenix. Zone 3.
- **Black Girls Do Bike: Phoenix**: the BIPOC women's group. The national chapters page (© 2026, which lists the June 2026 national meetup) lists Phoenix with a link to its Facebook group. Some chapters there are marked "Searching for Leadership!"; Phoenix is not. It was entered on the same evidence as the LA chapter, so it's `medium`. The rides themselves are behind Facebook's login.

The `women-trans-femme` tag on McDowell Mountain Cycles rests on its Ladies Mountain Bike Ride. The directory already tags that ride `wtf`. The shop's word is "Ladies", so it's the editor's call whether that tag belongs on the club.

Directory records that no longer match their host's page (for the re-check queue, not for this guide):

- `scottsdale-az-scottsdale-cycling-saturday-ride`: the record says 5:30 am. The Strava event's next occurrence, Sat Oct 10, 2026, is **6:00 am**. The event text says it is "Still a 'drop' ride", and the record's `drop_policy` is `unknown`.
- `fountain-hills-az-mcdowell-mountain-cycles-sunday-funday-gravel`: the record says 6:00 am. The shop's calendar and ride text say **6:30 AM** (Oct 4 and 25).
- `phoenix-az-valley-epic-rides-night-rider-trail-100`: the event text says the series "alternate[s] between South Mountain and Trail 100 each week". The record says the series ends Oct 21. Once it does, the Night Rider token in the club note will render as plain text with a build warning. Drop that token if the series isn't renewed.

## Rejected

- **TriScottsdale**: its group-workouts page reset the connection twice, so I couldn't fetch it this run. Its three rides are in the directory (verified Sept 30) and will show under "Group rides around Phoenix". Left out of the six because I couldn't read the page today.
- **Bullshifters Bicycling Club** (Moon Valley Park, north Phoenix): real and current per the Sept 30 sweep, but not re-fetched this run. Left out for the six-club cap. Its Saturday ride is in the directory.
- **Regroup** (Tempe): a coffee and bike shop with a no-drop Saturday ride already in the directory. It's a shop and café, so it goes to @shop-scout and @coffee-scout rather than this list.
- **Queers On Wheels** (Heylo): it came up in a Phoenix search, but it's a London group.
- **The Gay Agenda, Phoenix community groups**: the page is now a sunset notice with no listings.
- **Equality Arizona, "Queer People Fit: Cycling"** (Aug 18, with OutCyclists and Bike Saviours): the post is from 2022. It was a one-off.
- **Cycling 4 one·n·ten**: an annual ride (Sat Nov 7, 2026 per onenten.org), already on the 2027 calendar. Neither onenten.org nor the ride's RunSignup FAQ mentions training rides, so there's no recurring ride to propose.
- **C3: Cultural Cadence Cycle** (Bike to Wherever): a social-paced ride for Indigenous Peoples' Day, 14 miles on the Rio Salado path from the Audubon Center at 3131 S Central Ave. It ran Sunday Oct 12, 2025, and the 2026 date is "TBA". This is a calendar item, not a recurring ride. Handed to the editor below.
- **Bike to Wherever Phoenix** as a club: it's a Valley-wide ride calendar, not a club. Its calendar loads by script (a Wix Google Event Calendar app), and none of it came through to a plain read.

## Couldn't confirm

- **OutCyclists** (Phoenix LGBT road club, "established in 2020"). The Google Site says it runs an "almost weekly" Thursday sunset social ride: about 20 miles, no-drop, "generally" from the greater Old Town Scottsdale area, wheels down 5:45 pm in winter and 6:45 pm in summer. It also mentions an occasional weekend ride of 30 to 40 miles at about 14 mph. The page's edit stamp is May 19, 2022, and it still mentions "the public health situation". The Strava club has 26 members and no events, and points to outcyclists.org, which no longer resolves. The Facebook group, where the site says each ride is posted, is behind a login. If it's alive, it's the club for this guide, with `lgbtq` and `no-drop`. Where to look: https://www.facebook.com/groups/outcyclists/, or Robert, who rides these roads. The site also names Phoenix TriOUT and Phoenix FrontRunners as sister groups. A search for TriOUT found nothing in Phoenix.
- **The Gravel Collective (Phoenix)**: the bikinglist.com entry (undated) says it centers "FTWNB (femme, trans, women, non-binary), BIPOC ... and para-athletes" through workshops, socials and group rides. Its own site failed today: https gave a certificate mismatch through the proxy, and http showed a Squarespace "Domain Not Claimed" page. The Sept 30 sweep read the home page through WebFetch, so the site may have lapsed since. If it's live, it's a club entry with `women-trans-femme`, `bipoc` and `gravel`. Where to look: https://www.instagram.com/the.gravel.collective/, info@thegravelcollective.com.
- **PMBC Ladies Group**: the page (© 2026) says the group's rides are NO DROP, road, gravel and mountain bike, "you just need to be a lady". It hosts weekend rides from October through May, asks you to sign up first ("Please no drop-ins") and to join PMBC ($25 a year, Oct 2026). The page's "Meetup Page for Ride Calendar" link, meetup.com/The-Ladies-Womens-Cycling-Group, returns an empty group. There's no calendar to send a visitor to. Where to look: rideleaders@pmbcaz.org, or PMBC's Facebook group. If it has a calendar, add `women-trans-femme` to PMBC.
- **Rusty Spoke** (DIY co-op, downtown Phoenix): the site describes the shop and its mission but gives no hours, no address and no date. The Sept 30 sweep saw it last modified April 2024. I can't say it's open. Where to look: its Instagram or Facebook, or a phone call.
- **Black Girls Do Bike: Phoenix ride schedule**: Facebook login wall. The chapter entry stands at `medium` on the national page.
- **Critical Mass Phoenix / Saturday Morning Service**: the newest evidence is the Oct 2022 Downtown Phoenix piece ("second Thursday", about 300 riders). Search turned up only a Yelp event page and a 2023 New Times "Best Nighttime Bike Rides", which returned 403. Where to look: https://www.instagram.com/saturday.morning.service/.
- **Bike to Wherever calendar**: a person with a browser can read https://www.btwphx.com/ in a minute. It color-codes group rides by difficulty and is the most likely place for a current queer or women's ride.

## Sources

Fetched and read:

- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=356095
- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=364159
- https://pmbc.clubexpress.com/content.aspx?page_id=22&club_id=943467&module_id=364165
- https://www.meetup.com/The-Ladies-Womens-Cycling-Group/ (empty group page)
- https://www.strava.com/clubs/620243
- https://www.strava.com/clubs/620243/group_events/815123
- https://www.strava.com/clubs/620243/group_events/814572
- https://www.strava.com/clubs/620243/group_events/814036
- https://mcdowellmountaincycles.com/mmc-life/
- https://www.meetup.com/valley-epic-rides/
- https://www.meetup.com/valley-epic-rides/events/316590721/
- https://www.meetup.com/valley-epic-rides/events/316605938/
- https://www.bikesaviours.org/
- https://www.blackgirlsdobike.org/chapters
- https://www.blackgirlsdobike.org/
- https://www.blackgirlsdobike.org/mission
- https://sites.google.com/view/outcyclists/
- https://www.strava.com/clubs/outcyclists
- https://bikinglist.com/organizations/phoenix-gravel-collective
- http://thegravelcollective.com/ (Squarespace "Domain Not Claimed")
- https://rustyspoke.org/
- https://www.btwphx.com/
- https://www.btwphx.com/c3
- https://onenten.org/
- https://runsignup.com/Race/AZ/Phoenix/c4ont
- https://runsignup.com/Race/c4ont/Page/FA-Qs
- https://www.heylo.com/g/-N4JZ6VUF5uSOLO9zX_T
- https://www.thegayagenda.fyi/phoenix/community-groups/
- https://equalityarizona.substack.com/p/lgbtq-community-events-in-august (2022)

Tried, did not load:

- https://triscottsdale.com/group-workouts (connection reset, twice)
- https://thegravelcollective.com/ (certificate mismatch)
- http://www.outcyclists.org/ (does not resolve)
- https://www.facebook.com/groups/BlackGirlsDoBikePhoenix/ (login wall)
- https://www.facebook.com/groups/outcyclists/ (login wall)
- https://www.phoenixnewtimes.com/best-of-phoenix/2023/fun-and-games/best-nighttime-bike-rides-17214170/ (403)

Surfaced by search, not fetched (leads for the next run):

- https://www.yelp.com/events/phoenix-critical-mass-bike-ride
- https://dtphx.org/post/strength-in-numbers-how-group-rides-bolster-dtphx-bike-culture (Oct 2022; read by the Sept 30 sweep)
- https://equalityarizona.substack.com/p/september-is-voter-registration-month
- https://queeradventurers.com/queer-bike-clubs/
- https://www.meetup.com/find/us--az--phoenix/road-cycling/

Read in the repo for context: `research/rides/az/az-phoenix-west-mtb-social.md`, `az-scottsdale-north.md` and `az-east-valley.md` (the Sept 30 sweep's Couldn't-confirm lists), and `cfc-site/rides/rides.json` (all 76 Arizona records).

Hand-offs:

- **@shop-scout**: McDowell Mountain Cycles, 11879 N. Saguaro Blvd., Fountain Hills, (480) 272-8741, Mon–Fri 8–5, Sat 8–4, Sun closed (its rides page, Oct 2026). Also Regroup, Tempe.
- **@coffee-scout**: the Fuss Buss ends at a coffee stop ("always mandatory"), and the club doesn't name it. Gainey Village is the corner for Scottsdale Cycling.
- **@eat-scout**: Valley Epic Rides names its after-ride spots: Zeeks, Los Taquitos and Electric Pickle.
- **@route-scout**: PMBC links "Routes for Club Rides in RWGPS". The MMC page links the McDowell Mountain Regional Park PDF map and an interactive Fountain Hills trails map. The Gainey Thursday event names its five hills (E Desert Cove Ave, E Via Linda, N 136th St, N 128th St, N 124th St). The Gainey Tuesday event names its Paradise Valley KOM, sprint and regroup points.
- **@logistics-scout / heat line**: Valley Epic Rides asks for at least 1.5 liters of water in summer and may cancel for heat and dust storms. PMBC's Ladies say summer rides, when there are any, run at night or very early and aren't SAG-supported.
- **Editor**: C3: Cultural Cadence Cycle for `data/calendar-2027.json` (Indigenous Peoples' Day ride, Rio Salado path, 2025 was Sunday Oct 12, 2026 "TBA"; contact on the page). The three directory corrections at the end of "Why these". The PMBC tags (add `women-trans-femme` only if the Ladies' calendar turns up).
