---
description: Run the training team on cycleforchange.org/training — a full pass, one screen, a check, or the teardown of the tools riders use now. Usage — /training pass   ·   /training <screen or task>   ·   /training check   ·   /training teardown [product]
argument-hint: pass | <screen or task> | check | teardown [product]
---

Run the training team for Cycle for Change. Argument: `$ARGUMENTS`.

Rules for the whole run: `CLAUDE.md` (§3 brand, §4 voice and health safety, §8 rider pages and Training, §10
Strava), `research/training/TRAINING.md` (the bar, the promises, the core tasks, the score, the build order) and
`.claude/agents/README.md` ("The training team"). Each step names the agent that does it; run them as subagents
and don't do their work here. Name the pass `<YYYY-MM-DD>-<short-name>`; every note goes in
`research/training/<pass>/`. Screenshots, ride files and sample plans stay in the session's scratch folder, never
the repo. No real invite key, feed link or password is ever typed into a command, a file or a PR.

## 1. Shoot and test — @training-lab, @training-critic (in parallel)
The lab builds the page, starts the stand-in server and runs the core tasks at 390×844 and 1280×800 →
`lab-before.md`. The critic scores the lab's screenshots cold → `critic-before.md`, and on `teardown` reads the
named product's public pages → `research/training/teardown.md`. The critic sees nothing else.

## 2. Look — the specialists (in parallel, after 1)
`@coach-desk` → `coach.md`, `@athlete-experience` → `athlete.md`, `@coach-experience` → `coach-view.md`,
`@data-integrations` → `data.md`, `@metrics-analyst` → `numbers.md`, `@training-writer` → `words.md`,
`@privacy-security` → `security.md`, `@app-architect` → `architecture.md` (only when storage, accounts or offline
are in scope). Each fix carries impact 1–5, effort 1–5, the files and the core task it speeds up.

## 3. Decide — @training-lead
Reads everything, writes `brief.md`: the ranked list, who builds what in which file (no two builders in one
function), the "not now" list, and "For Robert": every decision that is his, as a yes/no question with a
recommendation. On `check`, stop here and report.

## 4. Build — the builders the brief names
`@athlete-experience`, `@coach-experience`, `@training-writer`, `@data-integrations`, `@metrics-analyst`, each in
its own files or functions. Bump `V` in `scripts/build-training.js` when the sheet or script changes; run
`node scripts/build-training.js`; `@training-lab` adds the tests the desks asked for; then
`node --test tools/test/*.test.js`.

## 5. Gate — @privacy-security, then @brand-ambassador, @access-speed, @editor
`privacy-security` reads the diff and the built page and passes or blocks. `/privacy/#training` and CLAUDE.md §8
move the same day as any change to what's kept or who can see it.

## 6. Prove it — @training-lab, @training-critic (cold), then @training-lead
After-shots and the core tasks again; the critic scores cold. Ship only if the score rose with no line dropping
and no core task got slower. One PR; Robert checks it on his phone before it merges.

Report to Robert in five lines: what changed, what got faster, what's still rough, what's waiting on him, what's
next.
