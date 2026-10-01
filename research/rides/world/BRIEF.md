# World group rides — the research brief

Written Sept 30, 2026 for the agents building the worldwide layer of
cycleforchange.org/rides/. Read this whole file, then
`research/towns/SCOUT-RULES.md`, then one entry of `cfc-site/rides/rides.json`.

## Why

The site's /rides/ directory lists 413 recurring US group rides
(`cfc-site/rides/rides.json`). It is going worldwide: Canada, Mexico, Central
America and the Caribbean, South America, Europe, Asia, Oceania, Africa and the
Middle East.

The reader is a rider somewhere new — travelling with a bike, or just moved —
who wants to know where the group ride is this week. Group rides are hard to
find from outside. They live on club sites in the local language, on Instagram,
in a shop's WhatsApp, in a federation calendar nobody outside the country has
heard of. You are the local expert who knows where to look.

The failure we are designing against: a rider finds a ride online, shows up at
7:00 on Saturday, and nobody is there. It moved, changed time, went to winter
hours, or died two years ago. So every ride needs **proof of life**, and a note
on **how to re-check it**. A system built next re-checks every ride on a
schedule; your `refresh` notes tell it where to look.

## House rules (SCOUT-RULES.md applies)

- **Verified = fetched.** Every fact comes from a page you fetched with
  WebFetch. A search snippet is a lead, never a source.
- **Unknown = null.** Never guess a time, an address, a handle or a distance.
- **Never guess a social handle.** List an Instagram / Facebook / Strava URL
  only when a fetched page links to it or the URL itself came back from a fetch.
- `inclusive_focus` only in the host's own words.
- **Plain voice.** Short sentences, no hype. Never write: leverage, synergy,
  journey, "passionate about", "thrilled to announce", "excited to share",
  "hidden gem", "must-visit", "vibrant", "bucket list".
- **Hands off the site.** Don't touch `cfc-site/`, `data/`, `tools/`,
  `scripts/`, `.github/` or `rides.json`. Don't run git commands. You write two
  files only (see Output).

## What counts

**List:** recurring rides a visitor can join — weekly, biweekly, monthly, or a
regular seasonal series. Road, gravel, MTB, social rides, slow rolls, critical
mass, shop rides, café rides, club runs that welcome guests, brand clubhouse
rides (Rapha and the like), women / trans / nonbinary rides, queer rides, BIPOC
rides, no-drop and beginner rides. Also weekly car-free-street programs
(Bogotá's Ciclovía and its cousins) with `"kind": "open-streets"` — riders ask
for them.

**Skip:** one-off events; sportives, gran fondos and dated randonnées (list the
big annual ones in the report's "Events" side list, one line each); paid tours;
indoor rides; members-only rides with no way in. A members-only club that takes
guests for trial rides is in, with `visitor_notes` saying so.

## Proof of life — the confidence levels

- **high** — the host's own page (site, calendar, Meetup, RideWithGPS, Heylo,
  Spond, Eventbrite, a shop's or café's events page) states the day, time and
  start, AND there is a dated signal from **April 2026 or later** (a listed
  upcoming date, a post or news item dated 2026, a calendar entry, a 2026
  "updated" date).
- **medium** — the host's own page states the schedule but nothing on it is
  dated after April 2026; OR a dated 2026 signal exists but the schedule comes
  from a secondary page (a 2026 article, a tourism board, a shop that promotes
  the ride).
- **low** — only third-party pages, or the newest evidence is older than 12
  months (anything dated before Oct 1, 2025 and nothing newer = low, even when
  the host's own page still states the schedule). Low rides do NOT go in the
  rides JSON. They go under "Couldn't confirm" in the report.
- **Ended, moved, renamed, or changed day / time** — record it under
  "Rejected" with what you found and its date. This tells us how fast rides go
  stale. We need it.

Instagram, Facebook and Strava mostly won't load for you (login walls). Don't
fight them. Use them as links when a fetched page points to them; get the proof
of life from something that loads.

**Exact facts from the raw page.** WebFetch returns a summary written by a
small model, and summaries paraphrase. When a time, an address or a date goes
into a record, read it in the raw page too. The shell has network access:

```bash
curl -sL --max-time 20 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36" "<url>" | python3 -c "import sys,re,html;t=re.sub(r'(?s)<(script|style).*?</\\1>',' ',sys.stdin.read());t=html.unescape(re.sub(r'<[^>]+>',' ',t));print(re.sub(r'\\s+',' ',t)[:20000])" | grep -io ".\{0,160\}saturday.\{0,160\}"
```

A 202 or 403 with a tiny body is a bot wall, not a dead page: fall back to
WebFetch. Use the shell for reading pages only (curl, grep, python to strip
tags). The only files you write are your two output files.

**Hunt for a feed.** The system that re-checks rides reads machine-readable
feeds on its own and can confirm the next date without an agent. When one
exists, put it in `refresh.feed_url` — only a feed you fetched and saw this
ride's events in:
- WordPress "The Events Calendar" sites: `<events page>?ical=1` (or `/events/list/?ical=1`)
- Meetup groups: `https://www.meetup.com/<group>/events/ical/`
- Google Calendar embeds: `https://calendar.google.com/calendar/ical/<calendar id>/public/basic.ics`
- any `.ics` / `webcal://` link on the host's page
Eventbrite organizer pages, RideWithGPS club event lists, Heylo and Spond
pages with dated events are worth listing as `refresh.watch_url`.

## Record shape — one JSON object per ride

Same shape as `cfc-site/rides/rides.json` plus the world fields. This example
is invented — never copy its values:

```json
{
  "slug": "exampletown-xx-example-cafe-saturday-ride",
  "name": "Saturday Café Ride",
  "name_en": null,
  "kind": "group-ride",
  "city": "Exampletown",
  "region": "Example Province",
  "state": null,
  "country": "XX",
  "neighborhood": "Old Town",
  "lat": 12.3456,
  "lng": 65.4321,
  "geo_precision": "start",
  "discipline": ["road"],
  "schedule": "Every Saturday, meet 8:45 am, roll 9:00; 8:00 in July and August",
  "days": ["sat"],
  "time_local": "9:00 am",
  "start_hhmm": "09:00",
  "frequency": "weekly",
  "monthly_rule": null,
  "season": "year-round",
  "season_months": null,
  "tz": "Europe/Example",
  "start_location": { "name": "Example Café", "address": "1 Example Street, 12345 Exampletown" },
  "distance_km": 70,
  "distance_miles": 43,
  "duration": "~3 hours",
  "duration_min": 180,
  "pace": "28–30 km/h on the flat, regroups at the top of each climb",
  "drop_policy": "groups",
  "host": { "name": "Example Café", "type": "cafe" },
  "founded_year": null,
  "founded_note": null,
  "cost": "free",
  "language": ["en", "xx"],
  "visitor_notes": "Visitors welcome, no sign-up. Lights required October to March.",
  "description": "Two to four plain sentences in English. What it is, where it goes, what happens after, who it's for.",
  "links": { "website": "https://example.org/rides", "instagram": null, "facebook": null, "strava": null, "meetup": null, "other": [] },
  "inclusive_focus": [],
  "sources": ["https://example.org/rides"],
  "verified_on": "2026-09-30",
  "last_seen": "2026-09-26",
  "evidence": "The café's ride calendar lists this ride for Sat Oct 3, 2026 (fetched Sept 30, 2026).",
  "confidence": "high",
  "status": "active",
  "refresh": { "method": "calendar-page", "watch_url": "https://example.org/rides", "feed_url": "https://example.org/events/?ical=1", "notes": "Winter start time is posted each October." }
}
```

### Vocabularies (use these words only)

- `kind`: `group-ride` · `open-streets` (car-free Sunday programs) · `critical-mass` · `training-series` (the training rides for a charity event)
- `discipline`: `road` · `gravel` · `mtb` · `social` · `cruiser` · `fixed` · `track` · `cyclocross` · `ebike` · `mixed`
- `frequency`: `weekly` · `biweekly` · `monthly` · `irregular` (seasons go in `season` / `season_months`)
- `days`: `mon` `tue` `wed` `thu` `fri` `sat` `sun`
- `monthly_rule`: `[{ "ord": 1, "day": "fri" }]` for "first Friday" (`ord` 1–4, or -1 for "last"); `null` otherwise
- `season_months`: `{ "start": 4, "end": 10 }` (inclusive; southern-hemisphere wraps like `{ "start": 10, "end": 4 }` are fine) or `null` for year-round
- `drop_policy`: `no-drop` · `groups` (splits into pace groups / regroups) · `drop` · `unknown`
- `host.type`: `shop` · `club` · `collective` · `nonprofit` · `informal` · `brand` · `team` · `cafe` · `public` (a city or government program)
- `inclusive_focus`: `lgbtq` · `wtf` (women / trans / femme / nonbinary) · `bipoc` · `beginner` · `no-drop` · `family` · `adaptive` · `youth`
- `confidence`: `high` · `medium`
- `status`: `active` · `seasonal-break` (not running this month, resumes on a known date — say when in `schedule`)
- `refresh.method`: `ics` · `calendar-page` · `meetup` · `ridewithgps` · `eventbrite` · `heylo` · `spond` · `strava-club` · `instagram` · `facebook` · `static-page` · `federation-calendar` · `news`
- `language`: ISO 639-1 codes of the language(s) the ride runs in

### Field notes

- `slug`: `<city>-<cc>-<host>-<ride>`, lowercase ascii `a-z 0-9 -`, `cc` = lowercase ISO country code. Unique.
- `country`: ISO 3166-1 alpha-2, uppercase. `state`: `null` outside the US.
- `region`: the first-level division in plain English (Catalonia, Île-de-France, New South Wales, Ontario, Mexico City).
- `lat` / `lng` / `geo_precision`: leave all three `null`. The editor geocodes
  every start address in one batch after you finish. Spend your fetches on
  proof of life. Give `start_location.address` as fully as the source gives it
  (street and number, postcode, city); `null` when the source gives none.
- `time_local`: 12-hour English ("7:30 am"). `start_hhmm`: the 24-hour roll time.
  If summer and winter times differ, put both in `schedule` and the one in force
  in October 2026 in `start_hhmm`. If the host says on which dates the time
  changes, add `start_times`: `[{ "from": "2026-10-10", "start_hhmm": "07:00" }]`
  (oldest first; the site switches on those dates).
- `distance_km` / `distance_miles`: numbers or `null` (miles = km × 0.621, rounded).
- `pace`: in the host's units and words (km/h outside the US).
- `description`: 2–4 plain sentences in English.
- `verified_on`: the date you fetched the proof. `last_seen`: the newest dated
  evidence that the ride is happening (YYYY-MM-DD) or `null`. `evidence`: one
  sentence — what the page shows, and its date.
- `refresh.watch_url`: the one page that changes when the schedule changes.

**One record per distinct ride**, max 3 per host. A shop with a full weekly
program gets its flagship open rides; mention the rest in the description.
Spread the picks: at most 6 rides per city, 10 in the biggest scenes (London,
Paris, Amsterdam, Berlin, Girona, Tokyo, Sydney, Melbourne, Toronto, Mexico
City, Bogotá, São Paulo).

A ride needs a known day to be listed. A null time is fine only when the host
posts a time per ride (say so in `schedule`: "time on each Meetup event").

## The field guide — the local-expert part

For each country you cover, a short section:

- **Words** — what locals call a group ride and the terms around it ("club run",
  "bunch ride", "sortie", "salida", "rodada", "pedal", "Ausfahrt", "toertocht",
  "uscita"...), so a searcher can find them.
- **Where rides are published** — federations and their calendars, apps (Strava
  clubs, Spond, Heylo, TeamApp, Meetup, WhatsApp, LINE), shop and café culture —
  with URLs.
- **Rhythm** — days, start times, summer vs winter hours, heat, rainy season,
  holidays when everything stops.
- **Visitor norms** — licence or insurance to join a club ride? trial rides?
  helmet law? which side of the road? language on the ride? what visitors get wrong.
- **Re-check sources** — the pages a robot or an agent should re-read to
  confirm rides here are still on (calendars with dates, ICS feeds, Meetup
  groups, federation ride calendars). Say which ones are machine-readable.

## Output — two files

Write the JSON after every three to five rides, so partial work survives an
interruption. If your JSON file already has records from an earlier run,
keep them only after you re-check each one against these rules, and continue
from there.

1. `research/rides/world/<region-id>.json` — a JSON array of your ride records
   (high and medium only). Write it early and rewrite it as you go, so partial
   work survives. It must parse.
2. `research/rides/world/<region-id>.md` — the report:
   - header: region id, agent, date
   - **Summary** — counts by country and city (not the JSON again)
   - **Why these** — one line per ride: why a rider wants it
   - **Field guide** — per country, as above
   - **Rejected** — ended / changed / unfit, with evidence and date
   - **Couldn't confirm** — name, what's missing, the URL or handle to try
   - **Events** — big recurring annual rides / sportives worth the 2027
     calendar (name, city, month, URL), max 15
   - **Stats** — candidates looked at · listed · couldn't confirm · rejected as
     ended or changed
   - **Sources** — every URL you read

## Targets and budget

Your prompt gives a target count. Priority: (1) the cities you're given, the
biggest cycling scenes first; (2) rides that say they're queer, women / trans /
nonbinary, BIPOC, no-drop or beginner-friendly; (3) the iconic rides a visiting
rider would have heard of; (4) café and shop rides that welcome visitors.
Fewer, verified, beats more. Stop at the target or about 150 page fetches.

## Safety

- In countries where same-sex relations are criminalised, or where the law or
  the authorities currently ban LGBTQ public gatherings or "propaganda"
  (Russia, Belarus, Hungary, Georgia, Turkey, and the like), don't list
  LGBTQ-focused groups or rides at all, even public ones. Note in the report
  only that you left them out. Never research individuals.
- No private WhatsApp groups, no personal phone numbers, no home addresses.
