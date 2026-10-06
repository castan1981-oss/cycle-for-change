# Keeping the group rides honest

For Robert and Josh. How the ride directory on cycleforchange.org/rides/ stays current, what runs
on its own, what you set up once, and how to run any of it by hand.

## The promise

(Why this matters: every ride was checked Sept 15–Oct 4, 2026, so they all age out together. If
the Monday re-check isn't actually re-checking rides, most of the directory hides itself by
mid-March 2027. After a Monday run, look for the `rides-upkeep` PR; a green run with no PR means
it re-checked nothing — usually a missing `ANTHROPIC_API_KEY`.)

Nobody wants to look up a ride, show up at 7:00 on Saturday, and find nobody there. So:

- Every ride on the site says when we last checked it at its source ("Checked Sep 30").
- A ride on the lists was confirmed in the last 150 days, by a person or by the host's own
  calendar.
- If we see something go wrong with a ride, the page says so out loud while we look into it.
  If nobody can confirm it, it comes off the lists on its own.

`verified_on` in `cfc-site/rides/rides.json` is the clock. It only moves when someone actually
checked the ride at the host's page, feed, Strava event or post. Never because it's probably fine.

## How rides get on the list

- **Scouts.** Claude agents follow `research/rides/world/BRIEF.md` (and `research/rides/az/BRIEF-AZ.md`
  for Arizona-style hunting) and write research files; `node tools/merge-ride-research.js` lets in
  only rides with recent proof, no duplicates, nothing on the safety never-list.
- **Strava club event pages.** Most local rides live on a Strava club, not a website. A club's event
  page (`strava.com/clubs/<id>/group_events/<id>`) opens without a login and shows the next date.
  That's the best proof there is, and the watcher reads it every week.
- **Riders.** Every ride page has the "Run a ride? Add it, or fix what we got wrong" form. "New ride"
  submissions land in `data/rides-suggestions.json`.
- **Robert's tips.** You know the scene. Tell Claude `/rides add <name or link>` and it checks the
  ride, writes it up and adds it through the same gates.

## Every Monday, on its own (Phoenix time)

| When | What | Where it ends up |
|---|---|---|
| 2 am | **The watch** (`.github/workflows/rides-watch.yml`). Rider reports come in from the Netlify form. Then every ride's own pages and feeds get read — no AI, about 3 minutes for 700 rides. | `data/rides-health.json`, `data/rides-queue.json`, `data/rides-queue.md`, committed to main. The open issue **"Rides to re-check"** shows the top of the queue. |
| 3 am | **The re-check** (`rides-reverify.yml`). Claude takes the top 40 of the queue, checks each ride at its source, and applies what it found. | A pull request labelled `rides-upkeep`, with a table: confirmed, changed, ended, couldn't confirm. Merged automatically only if you turned that on. |
| 4 am | **The rebuild** (`rides-weekly-rebuild.yml`, every day since Oct 6, 2026, not only Mondays). Netlify rebuilds the site, so next-ride dates and warnings are never more than a day old. | The live site. |

GitHub sometimes starts scheduled jobs a little late. The order still holds.

### What the watch looks for

For each ride it reads the host's page, the host's calendar feed if there is one, and any Strava
event page. It notices:

- **Proof of life:** the host's own calendar (an .ics feed, a Meetup group, a Strava event, event
  data on the page) lists the ride on its day and time in the coming weeks. That counts as a check
  for 21 days.
- **The page is gone** (404, a parked domain, a deleted Strava event). Red.
- **"Cancelled", "no longer", "abgesagt", "ya no se realiza"…** newly near the ride's name. Red.
  ("Cancelled if it rains" doesn't count.)
- **The schedule changed:** the lines with the ride's day and time are different, the start time
  vanished, or the host's calendar shows another day or time ("NEW START TIME 6:30"). Amber.
- **The date has passed** on the ride's event page, or the next date is weeks away. Amber.
- **Unreachable** three Mondays running, or **moved** to another site's homepage. Amber.

It also finds calendar feeds the host never mentioned (a Google Calendar on their page, a WordPress
events feed) and remembers them as candidates for the re-check to adopt.

## Start times that move with the season

Arizona rides move earlier in the summer and later in the winter, and lots of hosts publish exactly
when: "6:30 from the first Saturday of September, 7:00 from the second Saturday of October", or a
start for every month. When they do, the ride carries the table (`start_times` in rides.json) and the
site switches on its own: the card shows the time in force for the next ride, the page says what's
coming ("Then 7:00 am from Oct 10, 7:30 am from Nov 14"), the calendar file has one entry per stretch,
and the watcher compares the host's calendar against the right time for each date. A re-check adds
or updates the table; nobody has to remember to change the time on the day.

## What a rider sees, and when a ride comes off the lists

| The ride is… | On the lists? | What the page says |
|---|---|---|
| Checked in the last 90 days | yes | "Checked Sep 30" |
| Checked 90–150 days ago | yes | when it was checked, and "confirm with the host before you go" |
| Not checked for 150+ days | no | its own page stays up, says so, and isn't in search |
| Amber flag | yes | "The host changed their page on Oct 5. Confirm the day and time with them before you go." (or what the flag found) |
| Red flag, or a rider says it's gone or changed | yes, for 14 days | "We're re-checking it. Confirm with the host before you go." |
| …and still not re-checked after 14 days | no | the page explains why |
| Paused by the host | no | "The host has paused this ride…" |
| Ended | no | the page stays a year, pointing at rides nearby |

A flag clears when the problem goes away (the page is back) or when a person re-checks the ride.
The host's calendar showing the ride is proof of life, but it doesn't clear a red flag. A person
has to look.

## When a rider tells us something

1. They pick "It's gone", "Something changed" or "Still on — I rode it" on the ride's page.
   "Something changed" also asks for the new start time and the day it starts (both optional).
2. Monday at 2 am, `tools/rides-reports.js` reads the form (it needs the Netlify token, below).
   It matches the report to the ride by the page it came from and stores the kind, the date and
   up to 300 characters of what they wrote. Never their email.
3. "Gone" or "changed" puts the ride at the very top of the queue, and the page shows the warning.
   The 3 am re-check looks at it first.
4. "Still on" is a rider's word that it's happening. It's noted, and it helps, but a re-check still
   needs the host's own page.
5. New rides, and reports we can't match to a ride, go to `data/rides-suggestions.json`. Use
   `/rides add` for the ones worth adding.
6. **"I run this ride" with an email** is the host talking. No warning goes on the page and the
   14-day clock doesn't start. It's stored as a `host-update` (with the new start time and the date
   it starts, if they gave them). Reply to their email from the Netlify submission to confirm it,
   then record what they told you as a one-line batch (below): a new time from a date goes in as
   `start_times`. Without an email it counts like any rider's report.

## Set up once

All in GitHub, repo **castan1981-oss/cycle-for-change** → **Settings**.

1. **ANTHROPIC_API_KEY** (needed for the 3 am re-check; the content loop uses it too).
   Settings → Secrets and variables → Actions → **Secrets** tab. If `ANTHROPIC_API_KEY` is in the
   list, you're done. If not: New repository secret → Name `ANTHROPIC_API_KEY` → paste a key from
   console.anthropic.com → Add secret. Without it the re-check job just says it skipped.
2. **Let Actions open pull requests.** Settings → Actions → General → Workflow permissions →
   tick "Allow GitHub Actions to create and approve pull requests" → Save.
3. **Rider reports (optional, but this is how riders reach you).**
   - Netlify → your avatar (top right) → User settings → Applications → Personal access tokens →
     New access token → name it "rides-reports" → Generate → copy it. This token is for rider
     reports only; the old pledges function is retired and never gets one.
   - Netlify → the cycleforchange.org site → Site configuration → General → Site details → copy the
     **Site ID**.
   - Back in GitHub → Settings → Secrets and variables → Actions → New repository secret, twice:
     `NETLIFY_API_TOKEN` = the token, `NETLIFY_SITE_ID` = the site ID.
4. **Merge the Monday PR on its own (optional).** Settings → Secrets and variables → Actions →
   **Variables** tab → New repository variable → Name `RIDES_AUTOMERGE`, Value `true`. The PR is
   then merged only after the validator, the tests and a full build pass on it. Leave it off if you
   want to read every PR first.

To see it work without waiting for Monday: Actions → "Rides watch" → Run workflow. Then
"Rides re-check" → Run workflow (count 10 is a good first try).

## Run it by hand

From the repo folder:

```
node tools/validate-rides.js                    # is rides.json sound? (npm run validate:rides)
node tools/rides-watch.js --status              # where things stand, no fetching
node tools/rides-watch.js                       # the whole watch, ~3 minutes (npm run watch:rides)
node tools/rides-watch.js --only <slug> --no-write --verbose   # what the watcher sees for one ride
node tools/rides-reports.js                     # rider reports (needs the two Netlify values in your shell)
node tools/rides-apply.js <batch.json> --dry    # what a re-check batch would change
node tools/rides-apply.js <batch.json>          # apply it (then: node tools/build-rides.js)
node --test tools/test/*.test.js                # the tests (npm run test:rides)
```

In Claude Code (Cowork or the terminal):

- `/rides status` — the numbers, and the five rides most in need of a look.
- `/rides check <slug>` — one ride, now.
- `/rides refresh 40` — the Monday re-check, by hand.
- `/rides discover Tucson, AZ` — find rides in an area.
- `/rides add <name or link>` — one ride someone told us about.

**You checked a ride yourself** (you rode it, or the shop told you): write a one-line batch and
apply it. That's a real check.

```json
[{ "slug": "scottsdale-az-scottsdale-cycling-gainey-thursday", "outcome": "confirmed", "checked_on": "2026-10-08",
   "evidence": "Robert rode it Thursday Oct 8, 2026: 5:30 am from Gainey Village, about 20 riders." }]
```

Outcomes: `confirmed`, `changed` (with the fields that changed), `seasonal-break`, `paused`,
`ended` (these three need a `status_note`), `unreachable` (nothing changes; it just goes in the log),
`new`. The tool refuses the whole batch if anything is off, and tells you what.

## Where things live

| File | What | Written by |
|---|---|---|
| `cfc-site/rides/rides.json` | the rides (people's facts) | the merge and the apply tools, never by hand |
| `data/rides-health.json` | what the watcher saw: pages, feeds, flags, rider reports | the watch, the reports tool, the apply tool |
| `data/rides-queue.json`, `.md` | the re-check queue, most urgent first | the watch |
| `data/rides-suggestions.json` | new rides riders sent, reports we couldn't match | the reports tool |
| `data/rides-changelog.json` | every re-check: what changed and why | the apply tool |
| `research/rides/upkeep/` | the re-check batches | the re-check |

The rules in one place: `tools/lib/rides-freshness.js` (what's fresh, what hides) and
`data/SCHEMA.md` ("Group rides").

## When something looks wrong

- **A ride is flagged but it's fine.** Re-check it (`/rides check <slug>`, or a one-line batch).
  The flag resolves and the watcher won't raise it again for the same thing.
- **The "Rides check" workflow is red.** `node tools/validate-rides.js` lists what's wrong in
  rides.json, ride by ride. Fix those, and the Monday PR can merge again.
- **A whole site shows as a bot wall.** Some hosts block robots. The watcher counts it as
  unreachable only after three Mondays; the re-check reads those pages the way a person would.
