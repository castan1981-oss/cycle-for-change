# Cycle for Change — cycleforchange.org

Robert Castan rides **10,000 miles in 2027, all on the bike**. It's his commitment — nobody
pledges, votes or pays on the site. Cycling changed his life; he rides with group rides
everywhere and writes each one up. The money goes through the orgs' own rides: Cycling 4
one·n·ten (Nov 7, 2026), the Los Angeles LGBT Center's Center Ride Out (Apr 2027) and San
Francisco AIDS Foundation's Cycle to Zero (May 2027).

**Status (Oct 2026):** live — the homepage, a worldwide group-ride directory (`/rides/`), the
2027 ride calendar (`/events/2027/`), town guides (`/towns/`), guides, field notes and
resources. Read `CLAUDE.md` before changing anything: it is the voice, brand, safety and build
spec. Search work is tracked in `seo/` (the Search Lab).

## Stack

- Static HTML/CSS/JS in `cfc-site/` — **Netlify publishes that folder**, not the repo root.
  (`index.html` and `guides/` at the repo root are an old tree that is not published.)
- Generators write most pages: `scripts/build-home.js` (homepage), `tools/build-rides.js`
  (rides), `scripts/build-events.js` (events, towns), `scripts/build-calendar.js` (2027
  calendar); `scripts/chrome.js` is the shared header/footer and `scripts/apply-chrome.py` puts it
  on the hand-written pages. Netlify runs `npm install && node tools/build-rides.js` on every
  deploy.
- Serverless functions in `netlify/functions/` (the Strava mile count, Instagram).
- Type: Overpass, self-hosted in `cfc-site/fonts/`. No Google Fonts.

## Run it locally

```bash
python3 -m http.server 8899 --directory cfc-site   # or: netlify dev
node --test tools/test/*.test.js                   # rides tests
```

## Deploy

Push to `main` → Netlify deploys. Work on a branch and open a PR for anything beyond copy fixes.
How the ride directory keeps itself current: `tools/RIDES-UPKEEP.md`.
