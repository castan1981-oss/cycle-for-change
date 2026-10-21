// netlify/functions/deploy-succeeded.js
// Netlify runs a function with this exact name after every successful deploy
// (https://docs.netlify.com/functions/trigger-on-events/).
//
// Oct 21, 2026: IndexNow. After a production deploy, read the live sitemaps and tell Bing (and the other
// IndexNow engines) which pages changed in the last two days, plus the pages that change on every deploy
// (home, /rides/, /events/2027/, /tonight/). The daily rebuild means most days that's a short list; a big
// ride merge sends more. Rules and the key: netlify/functions/lib/indexnow.js.
//
// Deploy previews and branch deploys are skipped. Always answers 200: a missed ping is not worth a retry
// loop, and Bing still crawls the sitemap on its own.

const IN = require("./lib/indexnow");

exports.handler = async (event) => {
  const ok = (note) => ({ statusCode: 200, body: JSON.stringify({ ok: true, note }) });

  let deploy = {};
  try {
    deploy = JSON.parse((event && event.body) || "{}").payload || {};
  } catch (_) {
    return ok("no payload");
  }
  if (deploy.context && deploy.context !== "production") return ok(`skipped ${deploy.context}`);

  try {
    const getText = async (url) => {
      const res = await fetch(url, { headers: { "User-Agent": "cycleforchange.org IndexNow" } });
      if (!res.ok) throw new Error(`${res.status}`);
      return res.text();
    };
    const urls = IN.pick(await IN.collect(getText), { since: IN.daysAgo(2) });
    const results = await IN.submit(urls);
    console.log(`indexnow: ${urls.length} URLs →`, JSON.stringify(results));
    return ok(`${urls.length} URLs sent`);
  } catch (err) {
    console.log(`indexnow: failed: ${err.message}`);
    return ok("failed, logged");
  }
};
