# research/bikes — the bike knowledge library

A reference library so that any Claude Code session in this repo can talk
about bikes, bike history, the industry, racing, and cycling culture with
real depth. Not published (Netlify only serves `cfc-site/`).

Use it by asking for `@bike-expert` (the agent in `.claude/agents/`) or by
reading the files directly.

| File | What's in it | Refresh |
|---|---|---|
| [01-history.md](01-history.md) | 1817 to now, decade by decade, plus ten common errors | Rarely |
| [02-brands.md](02-brands.md) | Who makes what, who owns whom, components, apparel, software, retail, Arizona | Yearly |
| [03-tech-and-components.md](03-tech-and-components.md) | Categories, materials, geometry, drivetrains, wheels, e-bikes, training data, safety numbers | Yearly |
| [04-racing.md](04-racing.md) | Governance, calendar, how a race works, legends, teams, doping, gravel/ultra, business | Each season |
| [05-culture-advocacy.md](05-culture-advocacy.md) | Tribes, etiquette, advocacy orgs, safety citations, cycling and mental health, queer/BIPOC cycling, charity-ride mechanics | Yearly |
| [06-current-events-2026.md](06-current-events-2026.md) | Dated, sourced snapshot of the 2026 season, industry, policy, research | **Monthly** |
| [07-glossary.md](07-glossary.md) | Vocabulary A–Z | Rarely |

## Refreshing current events

The 06 file was compiled on 2026-09-15 by three web-research agents (season,
industry, advocacy/culture). To refresh, ask Claude Code to "re-run the
bike current-events research" and it should launch the same three searches,
rewrite 06 with the new date, and update anything in 02/04 that changed
(ownership, team names, record holders). Keep the `[C]`/`[R]` markers and
the source URLs; anything without a source doesn't go in.

## Rules that travel with this library

- `CLAUDE.md` still governs anything that reaches a public page: voice,
  banned words, no sober-time counts, crisis lines on every mental-health
  page, no unsourced medical claims.
- History and evergreen facts marked **(verify)** are things the writer was
  not certain of. Check before public use.
- The site is a coming-soon page until December 2026. This library informs
  Instagram drafts, kit copy, the December rebuild, and conversation. It
  does not by itself justify shipping new pages.
