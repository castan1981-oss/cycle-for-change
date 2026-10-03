/* Cycle for Change — blocks shared by the three directories (/rides/, /events/ + /towns/, /events/2027/).
   Pass 3 of the site plan (Sept 28, 2026): borrowed from behavioralhealthguide.org's
   "how we verify" block and its claim-your-profile flow.

   BUILT(items)   four short tiles that say how a list is built. Top of a directory, not the bottom.
   REPORT(opts)   the `ride-report` Netlify form: add a ride/event, fix one, or say it's gone.
                  Every instance has the same fields so Netlify registers one form.
                  Replaces every "message us on Instagram" ask: the lead lands in email, not DMs.
   REPORT_JS      the script tag that submits it (cfc-site/events/report.js).

   Styled in /events/events.css (loaded by all three directories). */
"use strict";

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* items: [[label, title, text], ...] — four is the design; three or five still lay out. */
// Pass 8: the kicker picks the mark (cfc-site/rides/marks.svg)
const BUILT_MARKS = { Checked: "checked", Dated: "date", Flagged: "flag", Free: "free", Direct: "signup", Live: "weather" };
const BUILT_MARK = (k) => `<svg class="mk mk--built" aria-hidden="true" focusable="false"><use href="/rides/marks.svg#m-${BUILT_MARKS[k] || "checked"}"/></svg>`;
// Pass 21 (Oct 2, 2026): fold = true tucks the block under a one-line <details> summary — still in
// the page for search, one tap for a person (Robert: "hide it behind stuff"). Hub pages fold it.
function BUILT(items, { heading = "How this list is built", id = "how-built", fold = false } = {}) {
  const grid = `
    <div class="dir-built-grid">
${items.map(([k, h, t]) => `      <div>${BUILT_MARK(k)}<span class="k">${esc(k)}</span><h3>${esc(h)}</h3><p>${t}</p></div>`).join("\n")}
    </div>`;
  if (fold) return `
  <details class="dir-fold dir-built" id="${id}">
    <summary>${esc(heading)}</summary>${grid}
  </details>`;
  return `
  <section class="dir-built" id="${id}" aria-labelledby="${id}-h">
    <h2 id="${id}-h">${esc(heading)}</h2>${grid}
  </section>`;
}

/* opts.thing   "ride" | "event" | "place"  (words only)
   opts.name    prefill for the "which one" field (a ride or event page)
   opts.kind    default radio: "new" | "changed" | "gone"
   opts.compact true on a single ride/event page: tucked into a <details>
   opts.stillOn true on a ride page that's on the lists: a fourth choice, "Still on — I rode it"
                (kind "still-on") — a rider's word that the ride is still happening (Sept 30, 2026) */
let uid = 0;
function REPORT({ thing = "ride", name = "", kind = "new", compact = false, heading, lede, id = "add", stillOn = false } = {}) {
  const n = ++uid;
  const Thing = thing.charAt(0).toUpperCase() + thing.slice(1);
  const h = heading || (thing === "ride" ? "Run a ride? Add it, or fix what we got wrong." : thing === "event" ? "Missing an event, or a date changed?" : "Closed, moved, or missing?");
  const l = lede || `Tell us what's new or what changed. We check it against the ${thing}'s own page before it goes up. Listing is free and always will be.`;
  const kinds = [["new", `New ${thing}`], ["changed", "Something changed"], ["gone", "It's gone"], ...(stillOn ? [["still-on", "Still on — I rode it"]] : [])];
  const form = `<form class="dir-report-form" name="ride-report" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field" data-report>
      <input type="hidden" name="form-name" value="ride-report">
      <input type="hidden" name="page" value="" data-page>
      <p class="hp" hidden><label>Leave this empty: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
      <fieldset class="dir-report-kind">
        <legend class="visually-hidden">What is this about?</legend>
${kinds.map(([v, t]) => `        <label><input type="radio" name="kind" value="${v}"${v === kind ? " checked" : ""}> <span>${esc(t)}</span></label>`).join("\n")}
      </fieldset>
      <label class="lab" for="rr-what-${n}">${esc(Thing)} name or link</label>
      <input class="field" id="rr-what-${n}" name="ride" type="text" required autocomplete="off" value="${esc(name)}">
      <label class="lab" for="rr-details-${n}">What should we know? <small>Day, time, start, pace, who runs it</small></label>
      <textarea class="field" id="rr-details-${n}" name="details" rows="3"></textarea>
      <label class="lab" for="rr-email-${n}">Your email <small>Optional. Only if we have a question.</small></label>
      <input class="field" id="rr-email-${n}" name="email" type="email" autocomplete="email" inputmode="email">
      <div class="dir-report-go"><button class="btn btn--ink" type="submit">Send it</button><p class="ok" role="status" aria-live="polite" hidden></p></div>
    </form>`;
  if (compact) return `
    <details class="dir-report dir-report--compact" id="${id}">
      <summary>${stillOn ? `Rode it lately, or something's wrong? Tell us` : thing === "ride" ? `Wrong, gone, or you run this ride? Tell us` : thing === "event" ? `Missing an event, or a date changed?` : `Closed, moved, or missing?`}</summary>
      ${form}
    </details>`;
  return `
  <section class="dir-report" id="${id}" aria-labelledby="${id}-h">
    <div class="dir-report-head">
      <p class="eyebrow">Free to list</p>
      <h2 id="${id}-h">${esc(h)}</h2>
      <p>${esc(l)}</p>
    </div>
    ${form}
  </section>`;
}

const REPORT_JS = `<script src="/events/report.js" defer></script>`;

module.exports = { BUILT, REPORT, REPORT_JS };
