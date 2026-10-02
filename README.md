# Cycle for Change — cycleforchange.org

Endurance as activism. **10,000 miles in 2027, all on the bike** — every mile for queer
communities. Supporters pledge miles and vote on which orgs receive the funds.

**Status (Oct 2026):** the site is live — home, `/pledge/`, a worldwide group-ride directory
(`/rides/`), the 2027 event calendar (`/events/`), town guides (`/towns/`), guides and resources.
The full launch is December 1, 2026; the pledge year starts January 1, 2027. Read `CLAUDE.md`
before changing anything — it is the voice, brand, and safety spec. Search work is tracked in
`seo/` (the Search Lab case study).

## Stack

- Hand-written static HTML/CSS/JS in `cfc-site/` — **Netlify publishes that folder**, not the
  repo root. No framework, no build step. (`index.html` and `guides/` at the repo root are a
  legacy tree that is not published.)
- Serverless functions in `netlify/functions/` (Strava mileage, pledge-board votes, Instagram).
  `npm install` is the only build command.
- Fonts from Google Fonts (Outfit, Space Grotesk, Space Mono) via a `<link>` in `cfc-site/index.html`.

## Run it locally

```bash
python3 -m http.server 8899 --directory cfc-site   # or: netlify dev
```

## Deploy

Push to `main` → Netlify auto-deploys. Work on a branch and open a PR for anything beyond
copy fixes.
