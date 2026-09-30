# The agents — who does what

Every file here is a Claude Code subagent: `@name` in a session, or launched by
`/town`. Each has one job and reads `CLAUDE.md` before it starts.

## The town-guide team (Sept 30, 2026)

The guide for a rider coming to a town with a bike. One town at a time;
`/town <City, ST>` runs the whole thing.

| agent | owns | writes |
|---|---|---|
| `town-editor` | the brief, the assembled `data/towns/<id>.json`, the PR, "which town next" | `research/towns/<id>/brief.md`, `data/towns/<id>.json` |
| `route-scout` | the rides: signature, climb, gravel, the easy one, the long one, the group-ride route — each with a public route page | `research/towns/<id>/routes.md` |
| `shop-scout` | bike shops: repairs, rentals worth riding, ship-to-shop, fit, box storage | `shops.md` |
| `coffee-scout` | the cafés riders roll out from and finish at | `coffee.md` |
| `eat-scout` | night before, after the ride, late, on the way | `eat.md` |
| `stay-scout` | where to sleep with the bike; the policy in the property's words | `stay.md` |
| `culture-scout` | record stores, bookshops, the bar, the market; queer-owned only in the business's own words | `culture.md` |
| `logistics-scout` | fly / ship / rent / get around / the law — the "should I bring my bike" answer | `logistics.md` |
| `community-scout` | clubs and collectives; new rides for `rides.json` | `community.md` |
| `town-verifier` | the check before it ships and every quarter after; runs `tools/verify-town.js`, re-fetches the claims that don't ship on a guess | `verify.md` |
| `voice-editor` | every sentence in the CFC voice; facts untouched | `voice.md` |
| `seo-geo-editor` | one query per page, JSON-LD, the lede, internal links; writes `faq[]` and `tagline` | `seo.md` |

Shared rules: `research/towns/SCOUT-RULES.md`. Field shapes: `data/SCHEMA.md`.

## The rest

| agent | job |
|---|---|
| `bike-expert` | bike history, brands, tech, racing, advocacy; fact-checks anything with a bike claim in it; keeps `research/bikes/` current |
| `instagram-specialist` | Instagram strategy, captions, Reels scripts, replies, monthly reports — drafts only |
| `marketing-strategist` | cross-platform publishing through Metricool once Robert says go |
