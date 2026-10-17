---
description: Brief a route the way /brief/ does, with the desks checking it — for a listed ride's route, a climb page, or an event's day. Usage — /brief <ride-slug>   ·   /brief climb <name or slug>   ·   /brief check <ride-slug>
argument-hint: <ride-slug> | climb <name> | check <ride-slug>
---

Brief a route for Cycle for Change. Argument: `$ARGUMENTS`.

Rules for the whole run: `CLAUDE.md`, `.claude/agents/README.md` ("The briefing team and the
trust desk"). Each step names the agent that does it; run them as subagents and don't do their
research here. Report to Robert in five lines at the end.

The route must already be in `data/ride-routes.json` (from the people who run the ride, or
Robert's own file with their OK). If it isn't, stop and say so: `/brief` never draws a route and
never pulls one from Strava's API.

## 1. The road — @route-analyst, @climb-specialist, @surface-analyst, @hazards (in parallel)

Each reads the GPX at `data/routes/<slug>/` and files its note under `research/routes/<slug>/`
(`route.md`, `surface.md`, `hazards.md`) or `research/climbs/`. Every number with its source and
date. Unknown is null.

## 2. The day — @weather-on-the-road, @water-heat, @pace-timing (in parallel, after 1)

Weather at the sample points at the hour the rider gets there (the next scheduled start from
`start_times`); refill points with the time they're passed; the flat speed the briefing uses
(the host's posted average). `@wear-carry` checks that the Wear line matches the forecast.

## 3. The page — @graphics-maps, then @editor

`graphics-maps` confirms the chart and map follow the rules. `editor` traces every fact to a
note, checks the freshness table, runs `@brand-ambassador`, `@consent-legal` and `@access-speed`,
writes the verification line, and either clears it or returns the one field that failed.

## 4. Ship

Branch `brief/<slug>`, the route JSON and `node tools/build-rides.js`, a PR with the Search Lab
line. Nothing hand-edited in `cfc-site/`.

If the argument is `climb <name>`: steps 1 and 3 only, for the climb page (`@climb-specialist`
leads; the climb must sit on a route already on the site).

If the argument is `check <ride-slug>`: no new research. `@editor` re-reads the page against the
freshness table and reports what's out of window.
