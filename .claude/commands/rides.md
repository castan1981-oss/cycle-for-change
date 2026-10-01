---
description: Keep the group-ride directory current — re-check the queue, find rides in a new area, add one ride someone told us about, check one ride, or see where things stand. Usage — /rides refresh [N]   ·   /rides discover <area>   ·   /rides add <name or URL>   ·   /rides check <slug>   ·   /rides status
argument-hint: refresh [N] | discover <area> | add <name or URL> | check <slug> | status
---

The group-ride directory, kept honest. Argument: `$ARGUMENTS`.

Rules for every run: `CLAUDE.md` (the group-rides section and the voice rules), `data/SCHEMA.md`
("Group rides"), `tools/RIDES-UPKEEP.md`. The research is done by subagents —
**@ride-verifier** (`.claude/agents/ride-verifier.md`) re-checks rides that are listed,
**@ride-scout** (`.claude/agents/ride-scout.md`) finds new ones — not in this session. Data moves
only through the tools: `tools/rides-apply.js` (re-checks), `tools/merge-ride-research.js` (new
rides). Never edit `cfc-site/rides/rides.json` by hand and never stamp `verified_on` on a ride
nobody confirmed. Dates are Phoenix dates (`TZ=America/Phoenix date +%F`). Tell Robert what
happened in five lines at the end, not a play-by-play.

## /rides refresh [N]

Re-check the top N rides of the queue (default 40).

1. **The queue.** `data/rides-queue.json` → `queue`, top first: rider reports, red flags, amber
   flags, rides due, low confidence, then the oldest checks. If the file is missing or its
   `generated_at` is more than 8 days old, run `node tools/rides-watch.js` first (about 10 minutes).
   Take the first N entries, skipping `ended` rides.
2. **Verify, in parallel.** Split the slugs into groups of about 8 and launch one @ride-verifier
   per group, all at once, each with: *"Re-check these rides: <slugs>. Today is <date>. Read
   .claude/agents/ride-verifier.md and follow it. Write your batch to
   research/rides/upkeep/<date>-part-<k>.json, run `node tools/rides-apply.js <that file> --dry`
   until it passes, and stop — don't apply it. Report outcomes per ride and what a person could
   check by hand for anything unreachable."*
3. **One batch.** When all are back, concatenate the part files (they are JSON arrays) into
   `research/rides/upkeep/<date>.json`, keep the part files, and run
   `node tools/rides-apply.js research/rides/upkeep/<date>.json`. If it refuses, fix the entries it
   names (or drop them to `unreachable` with a note) and run it again. Keep what it printed: it is
   the PR body.
4. **Check and build.** `node tools/validate-rides.js` (no new errors — the apply already checked),
   `node --test tools/test/*.test.js`, `node tools/build-rides.js`, and when rides changed day,
   time or status: `node scripts/build-events.js && node scripts/build-calendar.js`.
5. **Ship.** In CI (the Rides re-check workflow), branch `upkeep/rides-<date>`, commit rides.json,
   the generated `cfc-site/rides/` pages, `data/rides-health.json`, `data/rides-changelog.json` and
   `research/rides/upkeep/`, push, and open the PR with `gh pr create --label rides-upkeep`: title
   "Rides re-check <date>", body = the apply summary + the rides nobody could confirm and what a
   person could check. Never push to main; never merge. In a local session, stop after the build
   and tell Robert what changed — he commits.

## /rides discover <area>

Find rides in a city or region ("Phoenix metro, AZ", "Lisbon", "Bogotá").

1. `<area-id>` = the area slugified (`phoenix-metro-az`). Count what's already listed there
   (grep `cfc-site/rides/rides.json` for the city / state / country).
2. Launch **@ride-scout**: *"Area: <area>. Today is <date>. Read .claude/agents/ride-scout.md and
   the briefs it names. Target: 12 rides (fewer, verified, beats more). Write
   research/rides/discover/<area-id>.json and research/rides/discover/<area-id>.md."*
3. `node tools/merge-ride-research.js research/rides/discover/<area-id>.json --dry`, read what it
   would reject and why, then run it for real (it geocodes, derives and appends).
4. `node tools/validate-rides.js`, `node --test tools/test/*.test.js`, `node tools/build-rides.js`.
   A hub URL that disappeared because the data grew needs a 301 in `netlify.toml` (CLAUDE.md).
5. Ship like refresh (branch `upkeep/rides-discover-<area-id>-<date>`, PR "New rides: <area>",
   body = the merge output + the report's Summary, Couldn't confirm and Rejected sections).

## /rides add <name or URL>

One ride someone told us about — a rider's "add a ride" report (`data/rides-suggestions.json`),
a DM, Robert's own tip.

1. Launch **@ride-scout** on just this ride: *"One ride: <what we were told>. Find the host's own
   page or Strava event, prove it's happening (the confidence rules), and write a one-record
   research/rides/add/<slug>.json and a short research/rides/add/<slug>.md. If you can't prove it,
   write an empty array and say what's missing."*
2. `node tools/merge-ride-research.js research/rides/add/<slug>.json`, then validate, test, build.
3. If it came from `data/rides-suggestions.json`, say so in the report (the suggestion's id), so
   Robert can reply to whoever sent it. Ship like refresh in CI; locally, stop after the build.

## /rides check <slug>

One ride, now — a rider wrote in, or Robert saw something.

1. `node tools/rides-watch.js --only <slug> --no-write --verbose` and read its flags, reports and
   page readings in `data/rides-health.json`.
2. One **@ride-verifier** on that slug; it writes `research/rides/upkeep/<date>-<slug>.json` and,
   being the only verifier, applies it and builds.
3. Tell Robert the outcome in two lines, with the evidence sentence.

## /rides status

No fetching, no subagents. Run `node tools/rides-watch.js --status` and
`node tools/validate-rides.js`, read the summary at the top of `data/rides-queue.md`, and tell
Robert: how many rides are fresh / due / flagged / stale / paused / ended, the open flags by kind,
rider reports and suggestions waiting, how many rides a feed proved this week, when the watcher
last ran, and the five rides most in need of a look.
