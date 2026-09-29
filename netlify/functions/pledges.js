// netlify/functions/pledges.js
// Returns the list of names pledged via the Netlify "pledges" form.
// Needs one env var: NETLIFY_API_TOKEN (a personal access token from
// Netlify → User settings → Applications → Personal access tokens).
// Optional: SITE_ID (Netlify auto-provides this at build as SITE_ID).

exports.handler = async () => {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=60",
  };
  const TOKEN = process.env.NETLIFY_API_TOKEN;
  const SITE_ID = process.env.SITE_ID || process.env.NETLIFY_SITE_ID;

  if (!TOKEN || !SITE_ID) {
    // graceful: site still works, roster just stays empty until configured
    return { statusCode: 200, headers, body: JSON.stringify({ names: [], configured: false }) };
  }

  try {
    // 1) find the "pledges" form id
    const formsRes = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/forms`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const forms = await formsRes.json();
    const form = Array.isArray(forms) ? forms.find((f) => f.name === "pledges") : null;
    if (!form) {
      // Say why, so the board's state can be read from the URL alone: the API refused the
      // token (status 401/403), or the site has no "pledges" form registered yet (forms lists
      // what Netlify does have). No names or submission data here.
      const seen = Array.isArray(forms) ? forms.map((f) => f.name) : null;
      return { statusCode: 200, headers, body: JSON.stringify({ names: [], configured: true, form: false, status: formsRes.status, forms: seen }) };
    }

    // 2) pull its submissions (newest first)
    const subRes = await fetch(`https://api.netlify.com/api/v1/forms/${form.id}/submissions?per_page=500`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const subs = await subRes.json();

    // Name, when, and the org they picked (Pass 5) — never the email, phone, rate or amount.
    const ORG_IDS = ["onenten", "lalgbtcenter", "sfaf"];
    const names = (Array.isArray(subs) ? subs : [])
      .map((s) => {
        const org = s.data && s.data.org ? String(s.data.org) : "";
        return {
          name: (s.data && s.data.name ? String(s.data.name) : "").slice(0, 40),
          ago: timeAgo(new Date(s.created_at).getTime()),
          org: ORG_IDS.includes(org) ? org : "",
        };
      })
      .filter((n) => n.name);

    return { statusCode: 200, headers, body: JSON.stringify({ names, configured: true }) };
  } catch (e) {
    return { statusCode: 200, headers, body: JSON.stringify({ names: [], error: true }) };
  }
};

function timeAgo(t) {
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return Math.floor(s / 86400) + "d ago";
}
