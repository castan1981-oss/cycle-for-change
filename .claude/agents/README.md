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

## The group-ride upkeep (Sept 30, 2026)

`/rides` runs it (`.claude/commands/rides.md`); `tools/RIDES-UPKEEP.md` explains it in plain words.

| agent | owns | writes |
|---|---|---|
| `ride-verifier` | re-checking listed rides at their source: confirmed / changed / seasonal-break / paused / ended / unreachable — never a guess | `research/rides/upkeep/<date>.json`, applied by `tools/rides-apply.js` |
| `ride-scout` | finding new rides in a city or region, each with proof of life and a way to re-check it | `research/rides/<dir>/<area-id>.json` + `.md`, merged by `tools/merge-ride-research.js` |

## The briefing team and the trust desk (Oct 17, 2026)

Robert's direction from the "most useful cycling websites" reel: every ride page tells you what
you're riding into, every fact says who checked it and when, nobody needs an account. The team is
cut by **what can be wrong**, not by page. Each desk owns a set of facts, the sources it may use,
what "verified" means for it, and what it never asserts. **A fact is a source plus a date, or it
isn't on the page.** The plan, with the page system and the funnel:
https://claude.ai/artifact/QKG9zHH8dYZtjnFcYgLpCv. The engine the desks share:
`cfc-site/brief/engine.js` (tests in `tools/test/brief-engine.test.js`); the page: `/brief/`.

### Route desk — what the road is
| agent | owns | writes |
|---|---|---|
| `route-analyst` | distance, climbing, high point, loop, time at a flat speed; heights checked against a second source | `research/routes/<slug>/route.md` |
| `climb-specialist` | every named climb: bounds, length, grades, gain, category by the stated rule, the local name | `research/climbs/<id>.md`, `data/climbs.json` |
| `surface-analyst` | paved or not, road-class mix, bike lanes, closures (OpenStreetMap, AZ511, the city) | `research/routes/<slug>/surface.md` |
| `pace-timing` | the pace line, drop / regroup / no-drop, start and back-by; three check-ins change a line | `research/rides/pace/<slug>.md` |

### Conditions desk — what the day is
| agent | owns | writes |
|---|---|---|
| `weather-on-the-road` | the forecast at each point at the hour you reach it, wind against heading, sunrise; climate by month | `research/routes/<slug>/weather-<date>.md` |
| `water-heat` | refill points with the time you pass them, bottles, the desert heat lines, monsoon and dust | `research/routes/<slug>/water.md` |
| `wear-carry` | the Wear and Carry lines, derived from the forecast by the engine's table; checks, never writes | — |
| `hazards` | the two or three things a stranger wouldn't know, placed on the line, two sources | `research/routes/<slug>/hazards.md` |

### Local desk — what's here, and whether it still is
`ride-verifier`, `ride-scout` and the town scouts above, plus:
| agent | owns | writes |
|---|---|---|
| `checkin-steward` | the ride check-in → directory corrections, Riders say, photo consent flags, the Post it / Drop it path | `research/rides/checkins/<date>.md` |

### Money and orgs desk — where it goes
| agent | owns | writes |
|---|---|---|
| `orgs-giving` | every fact about one·n·ten, the Center and SFAF (990, annual report, their site), the money sentence | `research/orgs/<id>.md`, `data/orgs/<id>.json` |
| `events-analyst` | the 2027 calendar and event pages: dates, windows, fees, minimums; organizer confirmed or projected | `research/events/<slug>.md` |

### Story desk — why, in his words
| agent | owns | writes |
|---|---|---|
| `story-editor` | ride logs, Why them, Today I rode for — Robert's words laid out, never written; the embargo filter; predicted vs actual | `research/story/<date>-<slug>.md` |
| `brand-ambassador` | the taste and voice gate: words, Lane Paint, the banned look, too-polished, photos, two actions. Pass or block | `research/brand/<date>-<what>.md` |
| `graphics-maps` | maps, climb charts, marks, icons; one scale per chart; After Hours only; works with John | `research/graphics/<date>-<what>.md` |

### Trust desk — the gate
| agent | owns | writes |
|---|---|---|
| `editor` | the last read: every fact traced, every window inside its limit, the gates passed, the verification line | `research/editor/<date>-<page>.md` |
| `consent-legal` | releases, org permissions, attribution, Strava's terms, the no-account no-cookies promise | `research/consent/<date>-<what>.md` |
| `search-answers` | the Search Lab: one query per page, JSON-LD, the crawl, AI-answer checks, the private Regroup read | `seo/experiments/<date>-<what>.md` |
| `access-speed` | 390px first, contrast, keyboard, weight, in-browser tools | `research/access/<date>-<page>.md` |
| `analytics-growth` | the funnel's numbers, by source; never a cause without a test | `research/growth/<month>.md` |

### Freshness — what the Editor holds every page to
| fact | source | fresh for | then the page says |
|---|---|---|---|
| a forecast on a briefing | Open-Meteo, NWS | 6 hours | "forecast from [time]" |
| a group ride's time, spot, host | the host's own channel | 30 days | warning at 45, unlisted at 90, never deleted |
| an event's date, fee, deadline | the organizer's page | 14 days near registration, 60 otherwise | "projected" until confirmed |
| shop, café, tap hours | Google Places, the business | 90 days | "check before you go" |
| route, climbs, surface | GPX, USGS/Open-Meteo, OSM | until the GPX or OSM changes | re-run on change; closures daily |
| org figures | Form 990, annual report | until the next filing | always with the document's year |
| Robert's miles | Strava | 1 hour | "updated [time]" |
| a rider's check-in | the rider | posted after his tap | first name and date |

### How a page gets made
The request names the page type. The desks that feed it run in parallel and hand the Editor their
notes with sources. `brand-ambassador` reads the copy; `consent-legal` reads the media;
`access-speed` checks it on a phone. The Editor traces every fact, writes the verification line,
and publishes or sends it back with the one field that failed. Ride logs and org pages: Robert
reads them on his phone first. Briefings and directory pages: the Editor's pass is enough.

## The Wrenches — the design studio (Oct 21, 2026)

The team named itself on Robert's ask; he picked **The Wrenches** (what a shop calls the people in the
back who make it work).

Robert: the site needs "usability and an image that is visually easy to navigate and enjoyable to
look at … modern and high fashion in the sense that it looks polished." The studio polishes
**inside** the frozen Lane Paint identity (CLAUDE.md §3) — no new colors, fonts or marks. The bar,
the eleven moves, the ten-line score and the core tasks: `research/design/STUDIO.md`.
`/design site | <page> | check <page>` runs it (`.claude/commands/design.md`). Every pass files its
notes in `research/design/<date>-<pass>/`.

| agent | owns | writes |
|---|---|---|
| `art-director` | the bar, the ranked pass brief, who builds what, the sign-off; never adds a color, font, mark or copy | `brief.md` |
| `ux-architect` | way-finding: header and menu, breadcrumbs, section order, the one primary action, how pages end, the core tasks tap by tap | `ux.md`, nav/IA changes in `scripts/chrome.js` and the builders |
| `type-layout` | the Overpass scale, measure, rhythm, the spacing scale, the grid, desktop composition | `type-layout.md`, the shared CSS |
| `design-system` | one button, card, row, tile, chip, fold, field, table, figure; every state; tokens | `system.md`, the shared CSS |
| `photo-editor` | which picture where, crops per width, clean edges, scale and order, weight, the photo rules | `photo.md`, `scripts/photos.js`, crops, `<picture>` markup |
| `motion-interaction` | one timing scale and easing, states in motion, folds and menu, film controls, reduced motion | `motion.md`, the shared CSS/JS |
| `usability-lab` | the core tasks as Playwright tests at 390 and 1440: taps, scroll, first screen, targets; before and after | `lab-before.md`, `lab-after.md` |
| `design-critic` | fresh eyes: the ten-line score from screenshots alone, the five cheapest things, three that work; never sees the brief | `critic-before.md`, `critic-after.md` |

The gates stay where they are: `brand-ambassador` (pass/block), `access-speed` (the floor),
`graphics-maps` (anything drawn). A pass ships when the critic's total rises, no line drops, no
task gets slower, and both gates pass — as one PR Robert checks on his phone before it merges.

## The rest

| agent | job |
|---|---|
| `bike-expert` | bike history, brands, tech, racing, advocacy; fact-checks anything with a bike claim in it; keeps `research/bikes/` current |
| `instagram-specialist` | Instagram strategy, captions, Reels scripts, replies, monthly reports — drafts only |
| `marketing-strategist` | cross-platform publishing through Metricool once Robert says go |
