# The deep sweep — every place the site covers, in Arizona detail (Oct 1, 2026)

Read these first, in this order:
1. `research/rides/world/BRIEF.md` — the house rules, proof of life, confidence levels, the
   record shape, the vocabularies, safety. All of it holds here.
2. `research/rides/az/BRIEF-AZ.md` — where local rides actually live, and how to dig them out.
   Arizona is the model for this sweep.
3. A good record: `research/rides/az/scottsdale-cycling.json`. A good report:
   `research/rides/az/az-east-valley.md`.

## Why

Robert rides a 5:30 am Thursday ride from Gainey Village in Scottsdale. It wasn't on the site.
It lives on a Strava club, not a website. Most group rides are like that. On Sept 30 four scouts
swept Arizona: it went from 30 rides to 76, and 14 rides already listed had changed time or day.
Now every place the site covers gets the same treatment. Your prompt names your area.

The failure we design against: a rider shows up at 6:00 and nobody is there because the ride
moved to 6:30 in October. So every ride you add needs proof of life, and every ride already
listed in your area gets re-checked.

## Two jobs

### Job 1 — re-check the rides already listed in your area

`research/rides/deep/<area>/_existing.tsv` lists them: slug, name, city, days, time, host,
watch_url, verified_on. Work oldest `verified_on` first. For each one, open its watch_url (or
the host's page / feed / Strava event) and write one entry to
`research/rides/deep/<area>/upkeep.json` (a JSON array) in the format `tools/rides-apply.js`
takes:

```json
{ "slug": "…", "outcome": "confirmed", "checked_on": "2026-10-01", "last_seen": "2026-09-26",
  "evidence": "One sentence: what the host's page showed, and its date.", "sources": ["https://…"] }
```

- `confirmed` — the host's own page, feed or Strava event shows the ride as listed, with a date
  in the last 30 days or an upcoming one, or states the current schedule on a page dated 2026.
  This moves the ride's "Checked" date, so only for a real check you made today.
- `changed` — the same proof, but something differs. Add `"changes": { … }` with only the fields
  that changed (name, name_en, schedule, days, time_local, start_hhmm, start_times, frequency,
  monthly_rule, season, season_months, start_location, distance_km, distance_miles, duration,
  pace, drop_policy, host, cost, language, visitor_notes, description, links, inclusive_focus,
  discipline, refresh, kind, confidence). A new time goes in `schedule`, `time_local` and
  `start_hhmm` together. `host`, `links`, `refresh` and `start_location` merge, so
  `{ "refresh": { "feed_url": "…" } }` is enough.
- `seasonal-break`, `paused`, `ended` — only when the host says so. Add `"status_note"` (what the
  host said, plain words) and `"status_since"` (YYYY-MM-DD, not after today).
- Couldn't load it, or nothing current on it: write no entry; list the ride under "Couldn't
  re-check" in your report. Never confirm a ride you didn't see.

**Start times that move.** When a host publishes when its start time changes ("6:30 from the
first Saturday of September, 7:00 from the second Saturday of October", a start for every month,
"6:30 pm from Oct 7"), add `start_times`: `[{ "from": "2026-10-10", "start_hhmm": "07:00" }]`,
oldest first, the dates worked out from the host's words, only changes from today on. The site
switches on those dates by itself. Nothing published, no `start_times`.

**Seasons.** A ride that runs all year says `"season": "year-round"`. A seasonal one names its
months in `season` ("Apr–Oct", "May–fall"). Month words in `schedule` are fine either way.

### Job 2 — find the rides we don't have

Your prompt gives a target. Work the sources in the order BRIEF-AZ.md gives:
1. **Strava club event pages** — `site:strava.com group_events <city>` for every city in your
   area. A single event page loads without a login and shows the next date, time, start and level:
   the best proof there is. Put it in `refresh.watch_url` with `"method": "strava-club"`.
2. **Bike shops** — "bike shop <city>" → each shop's group rides / events / community page.
3. **Clubs and teams** with calendars (ClubExpress, RideWithGPS club events, WordPress event
   calendars, Google Calendar embeds), women's, queer, BIPOC, adaptive and beginner groups.
4. **Meetup** (`https://www.meetup.com/<group>/events/ical/` is the feed) and RideWithGPS clubs.
5. Coffee shops and breweries that host rides.
6. Leads only, never a source: directories, Reddit, forums, YouTube, news.

Write new rides to `research/rides/deep/<area>/<area>.json` (a JSON array, the record shape in
the world brief; high and medium only). Read `_existing.tsv` first so you never add a ride we
have. US records: `"country": "US"`, `"state"` the two-letter code, `"region"` the state's name,
`"tz"` the IANA zone, miles in `distance_miles` (a number) and km in `distance_km`.

Spread the picks: at most 3 rides per host, about 8 per city (12 in the biggest cities). Suburbs
are their own cities. Priority: the rides a rider can't find on their own (Strava clubs, shop
rides, club calendars), then queer, women / trans / nonbinary, BIPOC, no-drop and beginner rides,
then the famous ones. Fewer, proven, beats more.

## Output — only these files, in `research/rides/deep/<area>/`

- `<area>.json` — new rides. Rewrite it every three to five rides so partial work survives.
- `upkeep.json` — the re-check entries. Rewrite it as you go too. Both must parse.
- `<area>.md` — the report: **Summary** (counts by city; re-check counts by outcome) · **Why
  these** (one line per new ride) · **Where rides are posted here** (Strava clubs, shops, club
  calendars, feeds a robot can re-read) · **Re-checked** (one line per existing ride: outcome and
  why) · **Couldn't re-check** · **Rejected** (ended, changed, unfit, with the date you saw) ·
  **Couldn't confirm** (name, host, day, time, start, where you saw it, the URL or handle — a local
  rider will check these by hand) · **Stats** · **Sources**.

Hands off everything else: no edits under `cfc-site/`, `data/`, `tools/`, `scripts/`, no git.
Budget: about 150 page fetches. Today is 2026-10-01.
