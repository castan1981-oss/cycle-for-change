// netlify/functions/submission-created.js
// Netlify runs a function with this exact name after every verified form submission
// (https://docs.netlify.com/forms/notifications/#event-triggered-functions).
//
// Oct 9, 2026: the site sends no email to visitors (Robert's call). The mile-updates signup is gone
// from the footer and its welcome email with it. What's left: a "ride-review" submission → an email
// to Robert only (REVIEWS_EMAIL) with the review and two buttons, Post it / Drop it
// (netlify/functions/review.js). Needs RESEND_API_KEY, REVIEWS_EMAIL and REVIEWS_SECRET; without them
// it does nothing and the review waits in Netlify, where the hourly ride-reviews.yml turns it into a
// GitHub issue (label "post" to publish, close to drop).
//
// Sender: cycleforchange.org has no mail records (no SPF/DKIM/MX), so Resend can't send as
// robert@cycleforchange.org. Default is Resend's shared sender, onboarding@resend.dev, which only
// delivers to the Resend account's own address — fine here, the only recipient is Robert. Set
// REVIEWS_FROM once the domain is verified at resend.com.
//
// Other forms (ride-report, old waitlist entries) pass through untouched. Always answers 200 so
// Netlify never retries: a missed email is not worth a stuck queue.

const FROM = process.env.REVIEWS_FROM || "Cycle for Change reviews <onboarding@resend.dev>";

exports.handler = async (event) => {
  const ok = (note) => ({ statusCode: 200, body: JSON.stringify({ ok: true, note }) });

  let payload;
  try {
    payload = JSON.parse((event && event.body) || "{}").payload || {};
  } catch (_) {
    return ok("no payload");
  }
  if (payload.form_name === "ride-review") return reviewMail(payload, ok);
  return ok("not a review");
};

// ---------- Oct 8, 2026: rider reviews → one email with Post it / Drop it ----------
const RV = require("../../tools/lib/reviews.js");
const { sign } = require("./lib/review-link.js");
const escH = (t) => String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const SLUG_OK = { has: (x) => /^[a-z0-9]+(-[a-z0-9]+){2,}$/.test(x) && x.length <= 140 };

async function reviewMail(payload, ok) {
  const KEY = process.env.RESEND_API_KEY, TO = process.env.REVIEWS_EMAIL, SECRET = process.env.REVIEWS_SECRET;
  if (!KEY || !TO || !SECRET) return ok("review email not configured (RESEND_API_KEY, REVIEWS_EMAIL, REVIEWS_SECRET)");
  const c = RV.clean({ id: payload.id, created_at: payload.created_at, data: payload.data || {} }, SLUG_OK);
  if (!c.ok) return ok(`not a review: ${c.reason}`);
  const rv = c.review, base = process.env.URL || "https://cycleforchange.org";
  const { d, s } = sign(rv, SECRET);
  const link = (a) => `${base}/.netlify/functions/review?a=${a}&d=${d}&s=${s}`;
  const page = `${base}/rides/${rv.slug}/`;
  const tags = [rv.again === "yes" ? "Would ride it again" : "Wouldn't ride it again", rv.pace ? `Pace ${RV.PACE_TEXT[rv.pace]}` : null].filter(Boolean).join(" · ");
  const btn = (href, label, dark) => `<a href="${href}" style="display:inline-block;padding:14px 22px;margin:0 10px 10px 0;font:800 14px/1 Arial,sans-serif;letter-spacing:.04em;text-transform:uppercase;text-decoration:none;border:2px solid #1C1A22;${dark ? "background:#1C1A22;color:#EFEDEA" : "background:#EFEDEA;color:#1C1A22"}">${label}</a>`;
  const html = `<div style="background:#E1DFDB;padding:24px;font:16px/1.5 Arial,sans-serif;color:#1C1A22">
  <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#4A4E55">New review · <a href="${page}" style="color:#1C1A22">${escH(rv.slug)}</a></p>
  <p style="margin:0 0 14px;font-size:20px;line-height:1.45">“${escH(rv.words)}”</p>
  <p style="margin:0 0 4px"><b>${escH(rv.name)}</b>${rv.from ? `, ${escH(rv.from)}` : ""} · ${escH(rv.date)}</p>
  <p style="margin:0 0 18px;font-size:14px;color:#4A4E55">${escH(tags)}${payload.data && payload.data.email ? ` · reply to ${escH(payload.data.email)}` : ""}</p>
  ${c.flags.length ? `<p style="margin:0 0 18px;padding:10px 12px;border-left:3px solid #A84C58;background:#EFEDEA;font-size:14px"><b>Look first:</b> ${c.flags.map(escH).join(" ")}</p>` : ""}
  ${btn(link("post"), "Post it", true)}${btn(link("drop"), "Drop it", false)}
  <p style="margin:8px 0 0;font-size:12px;color:#4A4E55">Each button opens a page with one more tap to confirm. Links work for 60 days.</p>
</div>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [TO], subject: `Review: ${rv.name} on ${rv.slug.split("-").slice(2).join(" ")}`.slice(0, 120), html,
        text: `"${rv.words}"\n— ${rv.name}${rv.from ? ", " + rv.from : ""}\n${tags}\n\nPost it: ${link("post")}\nDrop it: ${link("drop")}` }),
    });
    return ok(res.ok ? "review sent" : `review send failed: ${res.status}`);
  } catch (_) {
    return ok("review send threw");
  }
}
