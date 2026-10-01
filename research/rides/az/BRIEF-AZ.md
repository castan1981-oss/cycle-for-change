# Arizona group rides — the deep sweep (Sept 30, 2026)

Read `research/rides/world/BRIEF.md` first. Everything there holds (verified = fetched,
unknown = null, proof of life, the record shape, the report). This file adds what's
different about Arizona, the site's home base.

## Why

Robert rides here. He looked at the directory tonight and saw how much is missing — his
own 5:30 am Thursday ride from Gainey Village in Scottsdale wasn't on it. That ride lives
on a Strava club, not on a website. Most Arizona rides are like that. Your job is to find
them where they actually live, prove each one is still happening, and say exactly how to
re-check it.

## Where Arizona rides hide — work these in order

1. **Strava club event pages.** A single event page loads without a login and shows the
   title, the next date and time, the meeting address and the club's level rating. A
   recurring event keeps one URL and always shows its next date — perfect proof of life.
   Find them with searches like:
   - `site:strava.com group_events Scottsdale` (swap in every city in your area)
   - `site:strava.com/clubs <city> cycling` for the clubs, then search each club's name with `group_events`
   Fetch every event page you find. Club pages (`strava.com/clubs/<id>`) also load and give
   the club's description and member count; the club's event *list* needs a login, so
   search engines are how you reach the events.
   Example, already done: `research/rides/az/scottsdale-cycling.json` (Gainey Thursday and
   The Saturday Ride, Scottsdale Cycling club 620243). Don't redo those two.
2. **Bike shops.** Nearly every Valley shop runs a weekly ride. Find the shops in your area
   (web search "bike shop <city> AZ"), then each shop's "group rides" / "events" /
   "community" page. Many post the ride on Strava, Instagram or Facebook instead — follow
   their links.
3. **Clubs and teams** with ride calendars: Bullshifters, Phoenix Metro Bicycle Club (PMBC),
   GABA (Tucson), Hills Angels, TriScottsdale and other tri clubs, the Mountain Bike
   Association of Arizona and other MTB groups, Major Taylor / BIPOC clubs, women's
   groups, LGBTQ groups.
4. **Meetup groups** (they have ICS feeds — put them in `refresh.feed_url`) and
   **RideWithGPS club** event pages.
5. **Coffee shops and breweries** that host rides.
6. **Leads only — never a source:** directory sites (clippedin.bike, weeklyrides.com),
   bikeforums.net threads, Reddit (r/phoenix, r/arizona, r/Tucson, r/cycling), YouTube ride
   vlogs, news stories. Use them to learn names, then confirm at the host's own page or a
   Strava event page.

## Confidence, Arizona edition

- **high:** the host's own page (shop site, club calendar, Meetup event, or a Strava event
  page that loads without a login) states the day, time and start, AND shows a date from
  the last 30 days or an upcoming one.
- A Strava event page whose only date has passed, with nothing newer, is NOT listed:
  put it under "Rejected" (one-off or ended).
- Instagram / Facebook-only rides: you can't load them, so they go under **Couldn't
  confirm** with the handle or link and what you know. Robert knows the local scene and
  will confirm these by hand — make that list useful: name, host, day, time, start, where
  you saw it.

## Arizona specifics for the records

- `state` "AZ", `country` "US", `region` "Arizona", `tz` "America/Phoenix" (Arizona does
  not change clocks; the Navajo Nation does, but you won't be there).
- Start times move with the heat: many rides run 5:00–5:30 am in summer and later in
  winter. Capture both in `schedule` when the host says so; `start_hhmm` is the time in
  force in October 2026.
- `visitor_notes`: what an out-of-towner needs — water (more than you think), lights for
  dark starts, "request to join the Strava club", drop or no-drop, where to park.
- Dedupe: read `research/rides/az/_existing-az.tsv` (the 30 Arizona rides already on the
  site) and `research/rides/az/scottsdale-cycling.json` before you add anything.

## Output

`research/rides/az/<area-id>.json` and `research/rides/az/<area-id>.md` (the report
format in the main brief; the field guide becomes "Where rides are posted in this area").
Write the JSON every three to five rides.
