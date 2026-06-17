# Cycle for Change — deploy + turn on the pledge board

Drag this whole folder onto Netlify and the site goes live. The pledge board and the live mileage each take one short setup step. Both fail gracefully — the site works the whole time, the board just stays empty until step 2 is done.

## What's in here
- `index.html` — the site (new palette, route-line tally, board, ride feed, fundraisers)
- `netlify/functions/pledges.js` — reads saved names back for the board
- `netlify/functions/mileage.js` — pulls your live miles from Strava
- `strava-setup.html` — one-time helper to connect Strava
- `netlify.toml` — tells Netlify where the functions live

---

## Step 1 — Deploy (2 min)
1. Go to **app.netlify.com → your site → Deploys**.
2. Drag this entire folder onto the drop zone.
3. It publishes. The site is live. Pledges submitted now are already being **saved** by Netlify — they just won't show in the roster list until Step 2.

## Step 2 — Show the saved names on the board (5 min)
The board reads names back through Netlify's own API, which needs a token.
1. Netlify → **User settings → Applications → Personal access tokens → New access token**. Copy it.
2. Your site → **Site settings → Environment variables → Add**:
   ```
   NETLIFY_API_TOKEN = (paste the token)
   ```
   (SITE_ID is provided automatically — you don't need to add it.)
3. **Deploys → Trigger deploy → Clear cache and deploy.**
4. Done. Every pledge now appears in "The Crew," newest first.

You'll also see every pledge in **Netlify → Forms → pledges** — that's your master list, exportable to CSV anytime.

## Step 3 — Live mileage (optional, 15 min)
Open `yoursite.com/strava-setup.html` and follow its three steps, then add the three values it gives you to Environment Variables (same place as the token). The route-line counter goes live with your real miles. Until then it reads 0, which is correct before 2027.

---

## Notes
- **Spam protection** is built in (a hidden honeypot field). If you ever get junk pledges, turn on Netlify's form spam filtering in the Forms settings.
- **The board shows names only** — no amounts, exactly as designed.
- To **moderate** a name, delete that submission in Netlify → Forms; it drops off the board on the next load.
- Real "Make a pledge / give" links and the Strava profile URL are still placeholders — send them over and I'll wire them in.
