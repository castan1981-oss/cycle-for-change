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
                (kind "still-on") — a rider's word that the ride is still happening (Sept 30, 2026)

   Pass 22 (Oct 2, 2026) — Rosa runs a Wednesday shop ride; its time moves to 5:30 pm from Nov 1.
   The form now speaks to the person who runs the ride, not only to riders:
     role=host       "I run this ride". With an email, tools/rides-reports.js files it as a host
                     update for a person to confirm by replying — never a public warning, never
                     the hide clock. Without an email it counts as a rider's word.
     new_time, from_date   shown when "Something changed" is picked (rides only): the re-check can
                     write a start_times row from them.
     days, time, start, drop, for, link   shown when "New ride" is picked (rides only): the short
                     facts an organizer has. days and for are checkbox chips; report.js joins them
                     into one value ("mon, wed") before it posts.
   Every field is in every instance's HTML (hidden until its kind is picked) because Netlify reads
   the form's fields from the static page. report.js reveals a group only on a ride form
   (data-show="new|changed"); on event and place forms they carry data-show="never" and stay
   hidden and disabled. */
const DAY_CHIPS = [["mon", "Mon"], ["tue", "Tue"], ["wed", "Wed"], ["thu", "Thu"], ["fri", "Fri"], ["sat", "Sat"], ["sun", "Sun"]];
const DROP_CHIPS = [["no-drop", "Waits for you"], ["groups", "Pace groups"], ["drop", "Drops"]];
const FOR_CHIPS = [["beginner", "Beginners"], ["lgbtq", "LGBTQ+"], ["wtf", "Women/trans/femme/nonbinary"], ["ebike", "E-bikes welcome"]];
const chips = (type, name, list, cls = "") => list.map(([v, t]) =>
  `<label${cls ? ` class="${cls}"` : ""}><input type="${type}" name="${name}" value="${v}"> <span>${esc(t)}</span></label>`).join("");
let uid = 0;
function REPORT({ thing = "ride", name = "", kind = "new", compact = false, heading, lede, id = "add", stillOn = false } = {}) {
  const n = ++uid;
  const Thing = thing.charAt(0).toUpperCase() + thing.slice(1);
  const ride = thing === "ride";
  const h = heading || (ride ? "Run a ride? Add it, or fix what we got wrong." : thing === "event" ? "Missing an event, or a date changed?" : "Closed, moved, or missing?");
  const l = lede || `Tell us what's new or what changed. We check it against the ${thing}'s own page before it goes up. Listing is free and always will be.`;
  const kinds = [["new", `New ${thing}`], ["changed", "Something changed"], ["gone", "It's gone"], ...(stillOn ? [["still-on", "Still on — I rode it"]] : [])];
  // data-show only on a ride form: report.js reveals the group for that kind. Elsewhere it never shows.
  const show = (k) => ` data-show="${ride ? k : "never"}"`;
  const form = `<form class="dir-report-form" name="ride-report" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field" data-report data-thing="${esc(thing)}">
      <input type="hidden" name="form-name" value="ride-report">
      <input type="hidden" name="page" value="" data-page>
      <p class="hp" hidden><label>Leave this empty: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
      <fieldset class="dir-report-kind">
        <legend class="visually-hidden">What is this about?</legend>
${kinds.map(([v, t]) => `        <label><input type="radio" name="kind" value="${v}"${v === kind ? " checked" : ""}> <span>${esc(t)}</span></label>`).join("\n")}
      </fieldset>
      <label class="dir-report-role"><input type="checkbox" name="role" value="host" data-role> <span>${thing === "event" ? "I organize this event" : `I run this ${esc(thing)}`}</span></label>
      <label class="lab" for="rr-what-${n}">${esc(Thing)} name or link</label>
      <input class="field" id="rr-what-${n}" name="ride" type="text" required autocomplete="off" value="${esc(name)}">
      <div class="dir-report-more"${show("changed")} hidden>
        <p class="dir-report-note">New time? Both optional.</p>
        <div class="dir-report-more--two">
          <div><label class="lab" for="rr-ntime-${n}">New start time</label>
          <input class="field" id="rr-ntime-${n}" name="new_time" type="time"></div>
          <div><label class="lab" for="rr-from-${n}">Starting</label>
          <input class="field" id="rr-from-${n}" name="from_date" type="date"></div>
        </div>
      </div>
      <div class="dir-report-more"${show("new")} hidden>
        <fieldset class="dir-report-chips dir-report-chips--days"><legend class="lab">Day(s)</legend>${chips("checkbox", "days", DAY_CHIPS)}</fieldset>
        <div class="dir-report-more--two">
          <div><label class="lab" for="rr-time-${n}">Start time</label>
          <input class="field" id="rr-time-${n}" name="time" type="time"></div>
          <div><label class="lab" for="rr-start-${n}">Meeting spot</label>
          <input class="field" id="rr-start-${n}" name="start" type="text" autocomplete="off"></div>
        </div>
        <fieldset class="dir-report-chips"><legend class="lab">Drop policy</legend>${chips("radio", "drop", DROP_CHIPS)}</fieldset>
        <fieldset class="dir-report-chips"><legend class="lab">Made for <small>Only if the ride says so</small></legend>${chips("checkbox", "for", FOR_CHIPS)}</fieldset>
        <label class="lab" for="rr-link-${n}">Link <small>Where you post the ride</small></label>
        <input class="field" id="rr-link-${n}" name="link" type="url" inputmode="url" autocomplete="off" placeholder="https://">
        <p class="dir-report-note">Only on Instagram? Leave your email — we'll confirm with you.</p>
      </div>
      <label class="lab" for="rr-details-${n}">What should we know? <small data-hint-new="Anything else: pace, distance, who runs it">Day, time, start, pace, who runs it</small></label>
      <textarea class="field" id="rr-details-${n}" name="details" rows="3"></textarea>
      <label class="lab" for="rr-email-${n}">Your email <small data-hint-host="We'll reply to confirm it with you before the listing changes.">Optional. We'll tell you when it's live, or ask if we have a question.</small></label>
      <input class="field" id="rr-email-${n}" name="email" type="email" autocomplete="email" inputmode="email">
      <div class="dir-report-go"><button class="btn btn--ink" type="submit">Send it</button><p class="ok" role="status" aria-live="polite" hidden></p></div>
    </form>`;
  if (compact) return `
    <details class="dir-report dir-report--compact" id="${id}">
      <summary>${stillOn ? `Rode it, run it, or something's wrong? Tell us` : ride ? `Wrong, gone, or you run this ride? Tell us` : thing === "event" ? `Missing an event, or a date changed?` : `Closed, moved, or missing?`}</summary>
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
