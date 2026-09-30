---
description: Build or refresh a town guide end to end — open the brief, run the eight scouts in parallel, assemble the JSON, verify, build, SEO pass, PR. Usage — /town Los Angeles, CA   ·   /town refresh tucson-az   ·   /town next
argument-hint: <City, ST> | refresh <town-id> | next
---

Build or refresh a Cycle for Change town guide. Argument: `$ARGUMENTS`.

Rules for the whole run: `CLAUDE.md`, `data/SCHEMA.md`,
`research/towns/SCOUT-RULES.md`. Each step names the agent that does it;
run them as subagents with the instructions below and don't do their
research in this session. Report to Robert in five lines at the end, not a
play-by-play.

If the argument is `next`: run **@town-editor** Job 2 (pick the next town),
tell Robert the pick and the reason, and stop.

If the argument is `refresh <town-id>`: same steps, but every scout reads
the existing `data/towns/<town-id>.json` and its old report first and files
an *update* (what changed, what closed, what's new); the editor keeps every
listing the verifier passes.

## 1. Open the town — @town-editor

Write `research/towns/<town-id>/brief.md` (Job 1). Get the id, lat/lon,
zones, what's already listed. If a brief exists and is under a week old,
keep it.

## 2. Scout — eight subagents, in parallel

Launch these together, each with the same one-line instruction: *"Town
`<town-id>`. Read research/towns/SCOUT-RULES.md, then
research/towns/<town-id>/brief.md, then your own agent file. File your
report at research/towns/<town-id>/<section>.md in the five-part format.
Fetch every pick. Unknown is null."*

- **@route-scout** → `routes.md`
- **@shop-scout** → `shops.md`
- **@coffee-scout** → `coffee.md`
- **@eat-scout** → `eat.md`
- **@stay-scout** → `stay.md`
- **@culture-scout** → `culture.md`
- **@community-scout** → `community.md`
- **@logistics-scout** → `logistics.md` — it may lift the ship/rent shop
  lists from `shops.md` if that report has landed; otherwise it finds them.

Wait for all eight. Read each report's **Couldn't confirm** and **Rejected**
so the editor sees them.

## 3. Assemble — @town-editor

Job 3: build `data/towns/<town-id>.json` from the reports; resolve the
cross-references; hand proposed rides to `cfc-site/rides/rides.json`.

## 4. Voice — @voice-editor

Pass over the JSON; apply the after-strings (the editor said so); flag facts
that read wrong for the verifier.

## 5. Verify and build — @town-verifier, then @town-editor

`node tools/verify-town.js data/towns/<town-id>.json`, the sample re-fetch,
`verify.md`. The editor fixes fails, then:

```
node scripts/build-events.js
node tools/build-rides.js   # if rides.json changed
```

and reads every built page under `cfc-site/towns/<state>/<town>/`.

## 6. Search pass — @seo-geo-editor

`seo.md`: the query per page, the fixes, `faq[]` and `tagline` applied,
then one more `node scripts/build-events.js`.

## 7. Ship — @town-editor

Only if `verify.md` says **ships**. Branch `town/<town-id>`, commit, PR
"Town guide: <Name>, <ST>" (Job 5). Robert merges.

Then tell Robert: the page URL it'll have, counts per section, what's
null and why, what didn't ship and why, and the next town.
