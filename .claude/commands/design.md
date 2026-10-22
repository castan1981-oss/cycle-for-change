---
description: Run the design studio on cycleforchange.org — a whole-site polish pass, one page type, or a check. Usage — /design site   ·   /design <path or page type>   ·   /design check <path>
argument-hint: site | <path or page type> | check <path>
---

Run the design studio for Cycle for Change. Argument: `$ARGUMENTS`.

Rules for the whole run: `CLAUDE.md` (§3 brand — frozen until Dec 1, 2027 — §4 voice, §10 photos),
`research/design/STUDIO.md` (the bar, the eleven moves, the score, the core tasks) and
`.claude/agents/README.md` ("The design studio"). Each step names the agent that does it; run them
as subagents and don't do their work here. Name the pass `<YYYY-MM-DD>-<short-name>`; every note
goes in `research/design/<pass>/`. Screenshots go in the session's scratch folder, never the repo.
Report to Robert in five lines at the end, plus the before/after.

## 1. Shoot and test — @usability-lab, @design-critic (in parallel)

Serve `cfc-site/` in-process and shoot the pages in scope at 390×844 (device scale 2) and
1440×900: first screen and full page, cut into tiles a person can read. `site` = the homepage,
`/rides/`, a city hub, a ride page with film and a write-up, `/find-a-ride/`, `/events/2027/`,
`/events/2027/riding/`, an event page, a town guide, `/brief/`, `/guides/`, a guide,
`/cyclefor/`, `/resources/`.
`usability-lab` runs the core tasks → `lab-before.md`. `design-critic` scores the screenshots cold
→ `critic-before.md`. The critic sees nothing else.

## 2. Look — the specialists (in parallel, after 1)

`@ux-architect` → `ux.md`, `@type-layout` → `type-layout.md`, `@design-system` → `system.md`,
`@photo-editor` → `photo.md`, `@motion-interaction` → `motion.md`. Each reads the shots, the
critic's and the lab's notes, and the code; each fix carries impact 1–5, effort 1–5 and the files.

## 3. Brief — @art-director

`brief.md`: the aim, the ranked list (shared chrome and builders first), owners assigned by file
so no two builders touch one file, **Not this pass**, **For Robert**.

## 4. Build — the owners, by file

Branch `design/<pass>`. Each owner builds their lines. Generators, never hand-edited output; after
`scripts/chrome.js` changes, regenerate in the CLAUDE.md §2 order. `node --test tools/test/*.test.js`
and `node tools/validate-rides.js` pass.

## 5. Check — cold

Shoot the same pages again. `@design-critic` scores only the after shots → `critic-after.md`.
`@usability-lab` reruns the tasks → `lab-after.md`. `@brand-ambassador` and `@access-speed` read the
result. `@art-director` signs off at the foot of `brief.md` or sends back the one thing that failed.
Ship only if the critic's total rose, no score line dropped, and no task got slower.

## 6. Ship

A PR with: the aim, the before/after scores, the lab table, the before/after screenshots (a board
for Robert's phone), the Search Lab line (§7), and **For Robert**. Never merge it — Robert looks at
the deploy preview on his phone and says go.

If the argument is a path or page type: steps 1–6 for those pages only.
If the argument is `check <path>`: steps 1 and 5's critic and lab only, no changes; report the score.
