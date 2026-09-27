# Cycle for Change — project context for automated content

> **HOMEPAGE: the redesign is live since 2026-09-24.** `cfc-site/index.html` +
> `cfc-site/home.css` + `cfc-site/home.js` + `cfc-site/img/` (graded photos and the
> 6s hero film). The Sept 18 coming-soon-based homepage and its files
> (`coming-soon.css/js`, `main.js`, `next/home.css/js`, the feed video and audio) are
> gone — git history has them. `/next/*` redirects home.
> `/field-notes`, `/guides`, `/resources` and `/journal` are served; `cfc-site/404.html`
> is the catch-all. Content work is allowed. **Every page is in the Creosote house
> (Sept 27, 2026) and every inner page wears the homepage's chrome.** One source:
> `scripts/chrome.js` = `<head>` block, header + mobile menu, tally line, pledge
> block, footer (with the mile-updates signup). The three generators import it;
> `python3 scripts/apply-chrome.py` puts it on the hand-written pages (guides,
> field notes, resources, journal, tonight, 404). Styles: `/chrome.css` (tokens,
> type scale, buttons, nav, menu, pledge, footer — every value copied from
> `/home.css`) loads first on every inner page, then the section's own sheet.
> Behaviour: `/chrome.js` (tally, menu, signup). Titles end " — Cycle for Change".
> The cream/plum/yellow + Fraunces/Anton look is gone everywhere.
> The goal is **10,000 miles in 2027, all on the bike**. The count on the site
> is miles since June 1, 2026; never show it as a fraction of 10,000.

## The homepage (Sept 2026 redesign)
- Same Creosote house tokens. One addition, `--tar` #1A1D18 (asphalt a step darker) for the film
  hero, the ride log and the close; `--paper` #F6F1E7 only for text on the creosote field.
- Two families only: Outfit (display + body) and Space Mono (labels, data). No Space Grotesk.
- Volt means "live" and nothing else: the hero dot, the ghost under 10000, the last point on the
  miles chart, desktop hover. Never next to creosote. Creosote is used once, as the field behind
  the orgs.
- `10000` crops on the rule; `10K` appears only in the kit section. Count stays "miles since
  June 1", never shown against 10,000.
- Wiring (all in `home.js`): `/api/strava` → strava function, polled each minute while the tab is
  visible, with the same guards as before (a dead feed is never painted as 0); votes (same
  localStorage keys as before); pledges (board names; the count hides while the function can't
  read them); instagram; Netlify forms `pledges` and `waitlist`. Every number in the HTML is a
  fallback; failures show an honest message.
- The six "riding" rows are hand-kept from `data/calendar-2027.json` (`"riding": true`).
- Do NOT touch `cfc-site/index.html`, `cfc-site/home.js` or anything under `netlify/functions/`
  from the content loops.

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
- The homepage is `cfc-site/index.html`. Do NOT touch it, `cfc-site/home.js`
  (pledge form, votes, Strava/Instagram wiring), `cfc-site/home.css`, or anything
  under `netlify/functions/`. Content pages style with `/chrome.css` +
  `cfc-site/styles.css` (no inline `<style>` block to edit).
- New content pages are **self-contained HTML files**, not markdown. There is no
  `/content` folder and nothing renders markdown.
  - Field Notes: `cfc-site/field-notes/<slug>/index.html`
    → lives at `cycleforchange.org/field-notes/<slug>/`
  - The Field Notes index is `cfc-site/field-notes/index.html` (`/field-notes/`).
  - Directory-style (`<slug>/index.html`) gives a clean URL with no build step.
- Start every new post from `cfc-site/field-notes/_template.html`. Keep the
  `<head>`, the nav, the footer, the JSON-LD block, and the
  `/chrome.css` + `/styles.css` links exactly as the template has them.
  Fill in the page-specific parts only.
- Publishing a post = three edits, all by hand (no loader): create the
  `<slug>/index.html`, add one row to `cfc-site/field-notes/index.html` (newest
  first), and add the URL to `cfc-site/sitemap.xml`.
- Every content page links `/chrome.css` then `/styles.css` (absolute paths) so
  it inherits the brand. Do not inline a different stylesheet.
- The header, menu, tally line, pledge block and footer are shared: edit
  `scripts/chrome.js` (and `/chrome.css`), re-run the three generators, then
  `python3 scripts/apply-chrome.py`. Never hand-edit one page's chrome. If the
  homepage nav or footer changes, change `scripts/chrome.js` to match the same day.
- Every content page ends with the shared pledge block (`CHROME.PLEDGE`) — don't
  write a page-specific CTA. Buttons are the homepage's: `.btn .btn--bone`,
  `.btn--ink`, `.btn--ghost`, `.btn--sm`; text links with an arrow are `.link`.
- The live mileage count is painted into `[data-cur]` by `/chrome.js`
  (reads `/api/strava`, leaves "—" if the feed fails — never paints a dead feed as 0).
  Show it as "miles since June 1". No percentages, no progress line against 10,000.

## 2027 ride calendar — `/events/2027/`
- One page, generated: `node scripts/build-calendar.js` reads
  `data/calendar-2027.json` (600+ organized US rides and races for 2027) and
  writes `cfc-site/events/2027/index.html` + the JSON feed + `sitemap-calendar.xml`.
  Schema and rules in `data/SCHEMA.md` ("2027 calendar"). `calendar.css` and
  `calendar.js` next to it are hand-written; the page loads `/chrome.css`,
  `/events/events.css`, `/chrome.js` and `/events/events.js`.
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

## Brand on content pages — Creosote house (Sept 27, 2026)
- Tokens come from `/chrome.css` and are the homepage's: bone #E8DFD0, bone-2
  #E1D7C5, paper #F6F1E7, dust #C4B7A2, creosote #5C6B4A, asphalt #2A2E28, tar
  #1A1D18, volt #C6FF00, mute #5F5E56. Type scale: h1 = home `.h1`, h3 = home `.h3`.
- Fonts: Outfit (display + body) and Space Mono (labels, data). Nothing else.
- Creosote is the accent (eyebrow rule, link underlines, blockquote rule, kicker
  labels). Volt is not used on content pages — it means "live" (homepage, /tonight/).
- Square corners, hairlines, no shadows, no rounded pills. The end-of-post CTA is
  an asphalt block with the big "10,000" in bone.
- Reuse the `.fn-*` / `.res-*` / `.jr-*` classes in `styles.css`; don't start a
  parallel stylesheet. Share image for every page: `/og-cfc.png`.
- The old cream/plum/acid-yellow, Fraunces, Anton, Space Grotesk and the `///`
  slash are retired. Do not bring them back.
