# Cycle for Change — project context for automated content

You write content for cycleforchange.org. Follow these rules on every run.

## Stack (read this — it determines WHERE pages go)
- This is a **hand-written static site**. No framework, no build step. Netlify
  publishes the repo root as-is (`netlify.toml` → `publish = "."`).
- The homepage is `index.html`. Do NOT touch it, its inline CSS, or its inline
  JavaScript (the Field Notes `POSTS` array, the route line, the pledge form).
- New content pages are **self-contained HTML files**, not markdown. There is no
  `/content` folder and nothing renders markdown.
  - Guides:  `/guides/<slug>/index.html`  → lives at `cycleforchange.org/guides/<slug>/`
  - Notes:   `/notes/<slug>/index.html`   → lives at `cycleforchange.org/notes/<slug>/`
  - Directory-style (`<slug>/index.html`) gives a clean URL with no build step.
- Start every new page from `/guides/_template.html`. Keep the `<head>`, the nav,
  the footer, and the `<link rel="stylesheet" href="/guides/guides.css">` exactly
  as the template has them. Fill in the page-specific parts only.
- Every page links its stylesheet at `/guides/guides.css` (absolute path) so it
  inherits the brand. Do not inline a different stylesheet.

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
- Put a short, quotable answer near the top (the `.geo-hook` block in the
  template) so AI assistants can cite it.
- Keep the JSON-LD `Article` block in the template and fill its fields to match
  the page (headline, description, datePublished, url).

## Brand (for any visual) — real tokens from index.html
- Ground/background plum #46344E, card plum #2D2536 / #3A2C42, ink #241D30.
- Acid yellow #ECE84A. Off-white text #F3F0E9. Gold/taupe accent #A1906B.
- Fonts already loaded by the template: Anton (display/wordmark),
  DM Sans (body), JetBrains Mono (labels), Space Mono. Use those — do not add
  Fraunces or Space Grotesk; they are not used on this site.
