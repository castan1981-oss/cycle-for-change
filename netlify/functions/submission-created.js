// netlify/functions/submission-created.js
// Netlify runs a function with this exact name after every verified form submission
// (https://docs.netlify.com/forms/notifications/#event-triggered-functions).
//
// Oct 6, 2026: the pledge is gone (Pass 26), so its confirmation email went with it.
// What's left: one plain welcome for the mile-updates signup (the "waitlist" form).
//
// It does nothing until RESEND_API_KEY exists (Netlify → Project configuration →
// Environment variables; the cycleforchange.org sending domain has to be verified
// at resend.com), so deploying it is safe.
//
// Other forms (ride-report) pass through untouched. Always answers 200 so Netlify
// never retries: a missed email is not worth a stuck queue.

const FROM = "Robert at Cycle for Change <robert@cycleforchange.org>";
const SUBJECT = "You're on the list";
const TEXT = [
  "You're on the list. One email a month: the miles, the rides, what's next.",
  "",
  "Reply and say stop and you're off.",
  "",
  "— Robert",
].join("\n");

exports.handler = async (event) => {
  const ok = (note) => ({ statusCode: 200, body: JSON.stringify({ ok: true, note }) });

  let payload;
  try {
    payload = JSON.parse((event && event.body) || "{}").payload || {};
  } catch (_) {
    return ok("no payload");
  }
  if (payload.form_name !== "waitlist") return ok("not the waitlist form");

  const KEY = process.env.RESEND_API_KEY;
  if (!KEY) return ok("email not configured (RESEND_API_KEY)");

  const email = String((payload.data && payload.data.email) || payload.email || "").trim();
  if (!email || email.indexOf("@") < 1 || email.length > 254) return ok("no email");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [email], subject: SUBJECT, text: TEXT }),
    });
    return ok(res.ok ? "sent" : `send failed: ${res.status}`);
  } catch (_) {
    return ok("send threw");
  }
};
