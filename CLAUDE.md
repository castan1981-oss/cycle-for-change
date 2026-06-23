# Cycle for Change — project context for automated content

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
- Every page ties back to the pledge (7,500 miles; swim/bike/run, 2027) and the cause.
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

## Brand (for any visual) — real tokens from cfc-site/styles.css
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
