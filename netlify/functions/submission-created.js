// netlify/functions/submission-created.js
// Netlify runs a function with this exact name after every verified form submission
// (https://docs.netlify.com/forms/notifications/#event-triggered-functions).
//
// Pass 5 (Sept 2026): the confirmation email for the "pledges" form. In the only
// controlled study that tested it, a thank-you within the hour cut pledge reneging
// by ~20 points, so this is the single most valuable email the site sends.
//
// It does nothing until two env vars exist (Netlify → Project configuration →
// Environment variables), so deploying it is safe:
//   RESEND_API_KEY   an API key from resend.com (the sending domain has to be verified there)
//   PLEDGE_FROM      e.g. "Robert at Cycle for Change <robert@cycleforchange.org>"
// Optional:
//   PLEDGE_REPLY_TO  where replies go (defaults to the from address)
//   PLEDGE_BCC       a copy of every confirmation, e.g. Robert's own inbox
//
// Other forms (waitlist, ride-report) pass through untouched. Always answers 200 so
// Netlify never retries: a missed email is not worth a stuck queue.

const ORG_NAMES = {
  onenten: "one·n·ten",
  lalgbtcenter: "the Los Angeles LGBT Center",
  sfaf: "the San Francisco AIDS Foundation",
};
const GOAL = 10000;

exports.handler = async (event) => {
  const ok = (note) => ({ statusCode: 200, body: JSON.stringify({ ok: true, note }) });

  let payload;
  try {
    payload = JSON.parse(event.body || "{}").payload || {};
  } catch (_) {
    return ok("no payload");
  }
  if (payload.form_name !== "pledges") return ok("not the pledges form");

  const data = payload.data || {};
  const email = String(data.email || "").trim();
  if (!email || email.indexOf("@") < 1) return ok("no email on the pledge");

  const KEY = process.env.RESEND_API_KEY;
  const FROM = process.env.PLEDGE_FROM;
  if (!KEY || !FROM) return ok("email not configured (RESEND_API_KEY / PLEDGE_FROM)");

  const name = String(data.name || "").trim().slice(0, 40) || "you";
  const text = body(name, data);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        reply_to: process.env.PLEDGE_REPLY_TO || undefined,
        bcc: process.env.PLEDGE_BCC ? [process.env.PLEDGE_BCC] : undefined,
        subject: "You’re on the board",
        text,
      }),
    });
    return ok(res.ok ? "sent" : `send failed: ${res.status}`);
  } catch (e) {
    return ok("send threw");
  }
};

/* The pledge in one line, the way the page says it. */
function line(data) {
  const rate = String(data.rate || "").trim();
  const money = (v) => parseFloat(String(v || "").replace(/[^0-9.]/g, "")) || 0;
  const fmt = (n) => Math.round(n).toLocaleString("en-US");
  const org = ORG_NAMES[String(data.org || "")];
  const to = org ? `to ${org}` : "to the org you pick";
  if (rate === "flat") {
    const amt = money(data.amount);
    return `${amt ? "$" + fmt(amt) + ", flat" : "A flat pledge"}, ${to}.`;
  }
  const cents = parseInt(rate, 10) || 2;
  const total = (cents * GOAL) / 100;
  const cap = money(data.cap);
  let s = `${cents}¢ a mile. If I ride all 10,000 in 2027, that’s $${fmt(total)}`;   // past 10,000 it keeps counting unless capped (Robert, Oct 3, 2026)
  if (cap && cap < total) s += `, capped at $${fmt(cap)},`;
  return `${s} ${to}.`;
}

function body(name, data) {
  const picked = !!ORG_NAMES[String(data.org || "")];
  return [
    `${name},`,
    "",
    "You’re on the board. Here’s your pledge, so we both have it in writing:",
    "",
    line(data),
    picked ? "" : "You haven’t picked an org yet. Any time before Dec 31, 2027: cycleforchange.org/pledge/",
    "",
    "What happens next:",
    "- Mile updates about once a month, from me. The miles, the money, where it went.",
    "- Your pick is yours. Change it any time before Dec 31, 2027 at cycleforchange.org/pledge/",
    "- January 2028: one email with the final miles, your number, and one link to give straight to the org. The money never touches me.",
    "",
    "Need to change something? Reply to this email.",
    "",
    "Robert",
    "cycleforchange.org · Phoenix · bike only",
  ]
    .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
    .join("\n");
}
