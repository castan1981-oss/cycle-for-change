# Cycle for Change — project context for automated content

> **LIVE since 2026-09-18.** Robert took the coming-soon gate down early. The
> homepage is `cfc-site/index.html`, built on the coming-soon design
> (`coming-soon.css` + `next/home.css`, scripts `coming-soon.js` + `main.js`).
> `/field-notes`, `/guides`, `/resources` and `/journal` are served again, and
> `cfc-site/404.html` replaces the old catch-all redirect. Content work is
> allowed again. The old content pages still wear the previous cream/plum/yellow
> styles from `styles.css`; a redesign into the Creosote house is in progress
> (design canvas, Sept 2026), so don't restyle them piecemeal.
> The goal is **10,000 miles in 2027, all on the bike**. The count on the site
> is miles since June 1, 2026; never show it as a fraction of 10,000.

## Directories: /rides/, /events/, /towns/

All generated: edit the data, run the generator, commit data + output. Never
hand-edit a generated page (each one says so in its first line). A merge to
main is a publish, so branch, open a PR, check the Netlify deploy preview, and
let Robert say "merge".

| Section | Data | Generator | Output |
|---|---|---|---|
| `/rides/` — recurring US group rides: search page, state hubs, city hubs, one page + `ride.ics` per ride | `cfc-site/rides/rides.json` | `tools/derive-ride-fields.js` then `tools/build-rides.js` (`npm run derive:rides`, `npm run build:rides`) | `cfc-site/rides/` |
| `/events/`, `/towns/`, `/events/2027/` | `data/events/*.json`, `data/towns/*.json`, `data/calendar-2027.json` (rules in `data/SCHEMA.md`) | `scripts/build-events.js`, `scripts/build-calendar.js` | `cfc-site/events/`, `cfc-site/towns/` |

Rules for these pages:
- **Look:** the Creosote house. Everything loads `/events/events.css` (shared;
  do not rename it or its classes) and rides adds `/rides/rides.css`. Outfit
  display, Space Grotesk body, Space Mono labels. No `/styles.css`, Fraunces or
  Anton here.
- **Chrome:** header nav is Rides · Events · Towns · "The 10000" (→ `/`);
  footer is Rides · Events · Towns · Home; the pledge block is the plain
  paragraph with "See the project" (→ `/`) and "Follow on Instagram". Before
  linking to a homepage anchor, check it exists on the live homepage.
- **No forms.** Robert's call: no signup, email, contact, claim or submit forms
  on directory pages. Corrections go to https://www.instagram.com/cycl_eforchange/.
  The search box on `/rides/` is a filter, not a form.
- **Mileage line:** paint `[data-cur]` from `/api/strava` (`/rides/tally.js`,
  `/events/events.js`). Do not fork the mileage logic.
- **Rides data rules:** real, recurring rides only, each checked against its own
  site or social page; unknown = `null`, never a guess; never guess an Instagram
  handle; `confidence: low` shows an "Unconfirmed" badge; `verified_on` is the
  real check date and feeds `dateModified` and the sitemap `lastmod` (never
  stamp today's date on everything). `tz`, `start_hhmm`, `season_months` and
  `monthly_rule` are derived by `tools/derive-ride-fields.js`, not hand-typed;
  they drive the next-ride line, the calendar file and `Event` structured data.
  City hubs exist where 3+ rides sit within 25 miles; before merging a data
  change, check that no live hub URL disappears by accident.
- **Freshness:** Netlify runs the rides generator on every deploy, and
  `.github/workflows/rides-weekly-rebuild.yml` forces a deploy each Monday, so
  baked-in next-ride dates are never more than a week old.
- **SEO facts we checked (Sep 2026):** Google gives no rich result for recurring
  events and retired FAQ rich results; don't add FAQPage, ItemList or
  LocalBusiness markup. Breadcrumbs, honest dates, a real `startDate`, short
  titles and city hubs with real data are what matter. `?q=` search URLs
  canonical to `/rides/`; don't add noindex on top.

## 10K kit — PRODUCTION LOCK (Sep 2026)
> **Update 2026-09-10 (after this lock was written): the lock was reopened.** The maker-pack
> specs and both lookbooks no longer match the direction. New direction: the kit adopts the
> live coming-soon site's identity — bone body, Outfit as the mark face, creosote back in
> (bibs, collar, pocket panel), asphalt 10K, volt as a single slash never adjacent to
> creosote, wheel logo kept. Surviving from the explored all-black direction: the crop,
> off-register volt, and "YOU DECIDE" as the back-hem line. Cap treatment undecided. Maker
> email on hold until the pack is rebuilt. Treat the locked specs below as the *previous*
> state until the pack is rebuilt and this section is rewritten.

If kit mockups, lookbooks, or maker files conflict with older chat, **"sand"** palette notes, slash logos, or the cream/plum/yellow Field Notes tokens below: **the kit lock wins.**

### Marks (do not mix)
| Mark | Role |
|------|------|
| **10K** | Wearable on kit (Outfit ExtraBold 800). Crop on jersey / vest back. Tiny on bibs, cap, socks, stem. Favicon uses 10K. |
| **10000** | Year / story. Coming-soon site hero. Off-bike tee back only if used. **Never on bike kit.** |
| **CYCLE / FOR / CHANGE** | Stack — hem / gripper / hangtag / site. FOR in creosote. Not a chest graphic. |
| **CFC** | Later merch left chest only. Not on bib straps. |
| Icons / `///` / wheel-C / graffiti | **Dead.** Do not revive. If they still appear on the live site, remove them — do not bend the kit toward them. |

`10000` (site/story) and `10K` (wearable) are one hierarchy, not two brands.

### Colors — Creosote house (not "sand")
- Bone `#E8DFD0`
- Creosote `#5C6B4A`
- Asphalt `#2A2E28`
- Volt `#C6FF00` (collar whip only; PMS 802 C)
- Dust `#C4B7A2`

**"Sand" is outdated naming.** Do not audit the kit or coming-soon page against a sand / black / volt-only palette. Cream / plum / acid yellow / Anton below are **paused Field Notes tokens only** — never use them to critique or redesign the kit.

### Locked product (do not redesign)
- **Jersey:** black short-sleeve **pullover, no zipper**. Bone 10K crops off edges. One volt whip at left collar (printed). Three unmarked rear pockets. House woven patch at hem only.
- **Bibs:** quiet creosote; blank black mesh straps; tiny bone 10K + gripper patch only. No large leg type.
- **Cap:** creosote cotton, tiny centered bone 10K. Not corduroy, not 10000, not stack, not CFC.
- Vest / socks / bidon / stem follow the same hierarchy.

### Packs
See `kit-handoff/` (local): `KIT-LOCK.md`, `CFC-10K-CLAUDE-DESIGN.zip`, `CFC-10K-CLAUDE-FACTORY.zip`. Inside the factory zip, `maker-pack/00-LOCKED.md` is the law if anything conflicts.

### Allowed next work
1. Kill leftover `///` / sand / old cream-plum-yellow on anything still public.
2. Men's M jersey + bibs sample / maker email from the factory pack.
3. Real conflicts between locked kit and **live** coming-soon only — do not reopen the kit to match the holding page.
4. No store required for the sample. Coming-soon stays until December.

---

You write content for cycleforchange.org. Follow these rules on every run.

## Stack (read this — it determines WHERE pages go)
- This is a **hand-written static site**. No framework, no markdown rendering,
  no SSG. The only build command is `npm install` (for the serverless functions);
  there is no step that turns markdown/data into pages.
- **Netlify publishes the `cfc-site/` directory**, NOT the repo root
  (`netlify.toml` → `publish = "cfc-site"`). Anything outside `cfc-site/` is not
  served. **Put every new page inside `cfc-site/`** or it will not deploy.
  - Legacy note: the repo-root `index.html` and the `/guides/` folder (with
    `guides.css`) are an older tree that is **not published**. Do not build there.
- The homepage is `cfc-site/index.html`. Do NOT touch it, `cfc-site/main.js`
  (pledge form, votes, Strava/Instagram wiring), or anything under
  `netlify/functions/`. Styling is external in `cfc-site/styles.css` (no inline
  `<style>` block to edit).
- New content pages are **self-contained HTML files**, not markdown. There is no
  `/content` folder and nothing renders markdown.
  - Field Notes: `cfc-site/field-notes/<slug>/index.html`
    → lives at `cycleforchange.org/field-notes/<slug>/`
  - The Field Notes index is `cfc-site/field-notes/index.html` (`/field-notes/`).
  - Directory-style (`<slug>/index.html`) gives a clean URL with no build step.
- Start every new post from `cfc-site/field-notes/_template.html`. Keep the
  `<head>`, the nav, the footer, the JSON-LD block, and the
  `<link rel="stylesheet" href="/styles.css">` exactly as the template has them.
  Fill in the page-specific parts only.
- Publishing a post = three edits, all by hand (no loader): create the
  `<slug>/index.html`, add one row to `cfc-site/field-notes/index.html` (newest
  first), and add the URL to `cfc-site/sitemap.xml`.
- Every page links the shared stylesheet at `/styles.css` (absolute path) so it
  inherits the brand. Do not inline a different stylesheet.
- The live mileage counter is fed by `/.netlify/functions/strava`. Reuse it via
  the `[data-cur]` / `[data-pct]` / `[data-line]` attributes and
  `/field-notes/field-notes.js` — do NOT fork the mileage logic.

## 2027 ride calendar — `/events/2027/`
- One page, generated: `node scripts/build-calendar.js` reads
  `data/calendar-2027.json` (600+ organized US rides and races for 2027) and
  writes `cfc-site/events/2027/index.html` + the JSON feed + `sitemap-calendar.xml`.
  Schema and rules in `data/SCHEMA.md` ("2027 calendar"). `calendar.css` and
  `calendar.js` next to it are hand-written; the page uses the events chrome
  (`/events/events.css`, `/events/events.js`).
- Edit the JSON, run the build, commit both. Never hand-edit the generated page.
- Dates: `confirmed` only when the organizer published it. `projected` keeps its
  `date_note`. No invented dates.
- /events/ is already served (netlify.toml only force-redirects guides,
  field-notes, resources and journal), so this page is public as soon as it
  is merged and deployed.

## Voice
- Short sentences. Anti-polish. Plain.
- No corporate language, no buzzwords, no hype.
- Authenticity over performance. Write like a person, not a brand.

## Never use (auto-reject the draft)
- The "$800 / two suitcases" origin line
- Any "Prescott" or "est. 2008" reference
- Career-bragging or résumé language
- Robert's age
- Robert's recovery or queer identity framed as a credential. It can lightly
  inform a piece. It never headlines.
- **Continuous sober-time, in any form.** "in recovery" / "18 years in
  recovery" is allowed; "X years sober" / "sober since" / anything implying
  unbroken sobriety is forbidden. Never reference or hint at a relapse.
- Banned words anywhere (meta, alt text, nav labels, copy): leverage, synergy,
  "journey" (as a buzzword), "passionate about," "thrilled to announce,"
  "excited to share."

## Mission first
- Every page ties back to the pledge (10,000 miles, all on the bike, 2027) and the cause.
  The old 7,500-mile swim/bike/run framing is retired — never write it.
- At least one internal link toward the pledge. The pledge form is the `#board`
  section of the homepage, so the canonical internal link is `/#board`
  (there is no `/pledge` page on this site).
- Topics live at the intersection of cycling/endurance and queer mental health.

## Health-content safety (queer mental health is YMYL — handle with care)
- No medical claims you can't source. No diagnosis or treatment advice.
- Cite credible sources where a claim needs backing.
- Every mental-health page includes a crisis line:
  988 Suicide & Crisis Lifeline, and the Trevor Project (1-866-488-7386) for LGBTQ youth.
- Lived experience is experience, not advice.

## SEO / GEO
- One target query per page, in the `<title>`, the `<h1>`, and an `<h2>`.
- Real `<meta name="description">`, a `<link rel="canonical">`, clean heading
  hierarchy, descriptive `alt` text on any image.
- Put a short, quotable answer near the top (the `.fn-lede` paragraph) so AI
  assistants can cite it.
- Keep the JSON-LD `BlogPosting` block in the template and fill its fields to
  match the page (headline, description, datePublished, url, author "Robert
  Castan", publisher Cycle for Change).
- Cross-link 2 related posts at the bottom of each post (same tag where
  possible), and link every post from the index. Add new URLs to `sitemap.xml`.

## Brand (paused Field Notes only) — tokens from cfc-site/styles.css
> Not the kit. Not the coming-soon Creosote house. Use only if Field Notes pages return after December.
- Background cream `--cream` #F1EBDD, deeper band `--cream-2` #E7DFCE,
  card `--card` #FBF7EE, ink `--ink` #2E2433.
- Plum `--plum` #372C3C / `--plum-2` #2A2130 (dark panels, footer, CTA).
- Acid yellow `--yellow` #E9E224 (deep variant `--yellow-deep` #B9A800).
- Lavender `--lav` #A99CB0 / `--lav-band` #E7DEEA, muted text `--mute` #7E7388.
- Fonts already loaded by the template: **Fraunces** (`--serif`, headings),
  **Space Grotesk** (`--g`, body), **Space Mono** (`--m`, labels/numbers),
  **Anton** (`--disp`, wordmark). Use the CSS variables — do not hardcode hexes
  and do not add new fonts (no DM Sans / JetBrains Mono — those are the legacy
  un-published tree).
- Field Notes adds its own classes (`.fn-*`) appended to `styles.css`. Reuse
  those; don't introduce a parallel stylesheet.
