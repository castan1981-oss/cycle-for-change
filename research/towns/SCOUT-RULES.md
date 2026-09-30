# Town guide scouts — the rules every scout follows

The town guides on cycleforchange.org (`/towns/<state>/<town>/`) are built by
a small team of agents in `.claude/agents/`. Each one owns a section of the
guide. This file is the standard they share. Read it before every run. The
section-specific rules live in each agent's own file.

## The unit of work

One town. One section. One report.

```
research/towns/<town-id>/          e.g. research/towns/los-angeles-ca/
  brief.md                          written by @town-editor: who this guide is for, the town's lat/lon, what's already known
  routes.md                         @route-scout
  shops.md                          @shop-scout
  coffee.md                         @coffee-scout
  eat.md                            @eat-scout
  stay.md                           @stay-scout
  culture.md                        @culture-scout
  logistics.md                      @logistics-scout
  community.md                      @community-scout
  verify.md                         @town-verifier's report
  seo.md                            @seo-geo-editor's notes
```

The editor turns the reports into `data/towns/<town-id>.json`. Nothing goes
in the JSON that isn't in a report with a source.

## The report format

Every scout report has the same five parts, in this order:

1. **Findings** — a fenced `json` block holding an array (or object) that
   matches the field shape in `data/SCHEMA.md` exactly. Unknown is `null`.
   The editor pastes this in; it has to validate.
2. **Why these** — one line per pick, plain language: why a rider wants it.
3. **Rejected** — what you looked at and left out, and why (closed, too far,
   no bike parking, tourist trap, can't confirm). This is as useful as the
   picks; it stops the next run from re-checking the same places.
4. **Couldn't confirm** — the places you wanted but could not verify. Name,
   what's missing, where the editor might look.
5. **Sources** — every URL you read, one per line. The findings' `sources`
   arrays draw from this list.

Head the file with the town id, your agent name, and the date.

## What "verified" means

- **Every fact comes from a page you fetched.** Not from memory, not from a
  search snippet, not from a map thumbnail. If the page didn't load, the
  fact doesn't exist.
- **A business is open when its own site or a listing updated in the last
  six months says so.** Two signals beat one. A dead site plus a live Google
  listing with recent reviews is "open, confirm by phone" — say so in the note.
- **Addresses and phones come from the business's own page** or its Google
  listing. Never typed from memory. Never approximated.
- **Prices and fees carry the date** you read them: "$95/day (Sept 2026)."
- **Distances** are measured from the town's lat/lon in `brief.md` (or the
  route start, when the section is about a route). Say "about 4 miles"; don't
  pretend to a decimal you didn't compute.
- **Unknown is null.** A blank is better than a guess. A guess on a guide is a
  rider standing outside a closed shop with a broken derailleur.

## Who the guide is for

A rider who lives somewhere else and is coming to this town with a bike, or
deciding whether to bring one. Not a tourist. So:

- Near the riding beats near the sights. A café at the start of the Saturday
  ride beats the one with the best reviews downtown.
- Early hours matter. Rides start at 6:30. A place that opens at 9 is a
  post-ride place; say which.
- Bike parking, a bike-friendly patio, a hose, a floor pump: worth a mention
  every time you can confirm one.
- Real portions, real coffee, open when riders need it. Skip the fancy.
- Off the bike, the picks are what a rider on a trip actually does with an
  afternoon: a record store, a bookshop, a bar, a market, a swim. Not a
  ranked list of everything in town.

## The queer lens — how it works here

Cycle for Change is queer. The guides can carry that lightly: a queer-owned
shop, the inclusive group ride, the neighborhood that's the obvious place to
land. Rules:

- **A business is `queer-owned` only when the business itself says so** (its
  site, its social bio, a press piece quoting the owner). Never inferred
  from the neighborhood, the name, or a flag in a photo.
- Inclusive rides and clubs are listed with the focus **they** state
  (`inclusive_focus` uses the rides directory's vocabulary: lgbtq, no-drop,
  beginner, women-trans-femme, bipoc, family, gravel).
- It informs the picks. It never headlines the page. No page is "the queer
  guide to X"; it's the guide to X, written by someone who's queer.

## Voice, in every note you write

`CLAUDE.md` at the repo root is the law. Short sentences. Plain. No hype, no
"hidden gem," no "must-visit," no "vibrant." Say what a thing is and why a
rider wants it. The build rejects the banned words (leverage, synergy,
journey, "passionate about," "thrilled to announce," "excited to share," the
$800 line, Prescott, est. 2008, sober-time counts, the 7,500-mile framing),
so don't write them anywhere, notes included.

## How to look

1. Read `brief.md` for the town, then `data/SCHEMA.md` for your field shape.
2. Read any existing `data/towns/<town-id>.json` and the earlier report for
   your section, if there is one. You are updating, not starting over.
3. Search wide, then fetch narrow: local club sites, shop sites, city bike
   pages, RideWithGPS and Strava public pages, the local alt-weekly, Reddit
   threads for leads only (never as a source of record).
4. Fetch the page for every pick. Confirm it. Write the report.
5. Never edit `cfc-site/`, `data/towns/*.json`, `netlify/`, or the kit packs.
   Reports only. The editor and the verifier do the rest.

## Targets per section (a destination town)

Routes 4–8 · bike shops 3–6 · coffee 3–6 · restaurants 4–8 · hotels 3–6 ·
culture 4–8 · clubs 2–6 · one logistics object. Fewer, verified, beats more.
An event-host town (one ride a year, small) can carry half of each.
