(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const GOAL = 7500;
  const INSTAGRAM_URL = "https://www.instagram.com/cycle_forchange";
  const INSTAGRAM_HANDLE = "@cycle_forchange";

  const STATIC_FEED = [
    { discipline: "bike", title: "Long ride · South Mountain loop", note: "Building the engine. Dawn desert miles.", miles: 62 },
    { discipline: "run", title: "Tempo · Papago Park", note: "Heat training. Legs remember.", miles: 8 },
    { discipline: "swim", title: "Pool set · 3,000 yds", note: "Base building. The quiet discipline.", miles: 1.7 },
  ];

  const STATIC_IG_CAPS = ["dawn miles", "pool set", "the crew", "race day", "rest day", "trailhead"];

  let votedOrgId = null;
  let voteFingerprint = null;

  function esc(s) {
    return String(s || "").replace(/[&<>"]/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
    );
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function getFingerprint() {
    if (voteFingerprint) return voteFingerprint;
    try {
      voteFingerprint = localStorage.getItem("cfc-vote-fp");
      if (!voteFingerprint) {
        voteFingerprint = "fp_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem("cfc-vote-fp", voteFingerprint);
      }
    } catch (_) {
      voteFingerprint = "session_" + Date.now();
    }
    try {
      votedOrgId = localStorage.getItem("cfc-voted-org");
    } catch (_) {
      /* ignore */
    }
    return voteFingerprint;
  }

  /* —— Scroll reveals —— */
  if (!prefersReducedMotion()) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
  }

  /* —— Mobile menu —— */
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* —— Tally + chart —— */
  function paintTally(miles, pct) {
    const m = Math.max(0, miles);
    const p = pct != null ? pct : Math.min(100, (m / GOAL) * 100);
    const rounded = Math.round(m);

    document.querySelectorAll("[data-cur]").forEach((el) => {
      el.textContent = rounded.toLocaleString();
    });
    document.querySelectorAll("[data-pct]").forEach((el) => {
      el.textContent = p.toFixed(1) + "%";
    });
    const ticker = document.querySelector("[data-ticker-miles]");
    if (ticker) ticker.textContent = rounded.toLocaleString();
  }

  function renderChart(points) {
    const svg = document.getElementById("tallyChart");
    const loading = document.getElementById("chartLoading");
    if (!svg || !points || !points.length) return;

    if (loading) loading.hidden = true;
    svg.hidden = false;

    const w = 400;
    const h = 120;
    const pad = { t: 12, r: 8, b: 8, l: 8 };
    const maxY = Math.max(GOAL, ...points.map((p) => p.y)) * 1.05;

    const toX = (x) => pad.l + (x / 100) * (w - pad.l - pad.r);
    const toY = (y) => pad.t + (1 - y / maxY) * (h - pad.t - pad.b);

    const lineD = "M " + points.map((p) => `${toX(p.x)} ${toY(p.y)}`).join(" L ");
    const areaD =
      lineD +
      ` L ${toX(points[points.length - 1].x)} ${toY(0)} L ${toX(points[0].x)} ${toY(0)} Z`;

    document.getElementById("chartArea").setAttribute("d", areaD);
    document.getElementById("chartLine").setAttribute("d", lineD);
    document.getElementById("chartLineAccent").setAttribute("d", lineD);
  }

  function renderFeed(recent) {
    const list = document.getElementById("feedList");
    if (!list) return;
    const items = recent && recent.length ? recent : STATIC_FEED;
    list.innerHTML = items
      .map(
        (a) => `<article class="ride ${esc(a.discipline)} rv in">
          <div class="ride-top">
            <span class="ride-disc">${esc(a.discipline)}</span>
            <span class="ride-mi">${Number(a.miles).toFixed(1)} mi</span>
          </div>
          <h3>${esc(a.title)}</h3>
          ${a.note ? `<p>${esc(a.note)}</p>` : ""}
        </article>`
      )
      .join("");
  }

  function setStravaLink(url) {
    if (!url) return;
    ["stravaLink", "footStrava"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = url;
    });
  }

  fetch("/.netlify/functions/strava")
    .then((r) => r.json())
    .then((d) => {
      const miles = d.totalMiles ?? d.miles ?? 0;
      paintTally(miles, d.pct);
      if (d.chartPoints) renderChart(d.chartPoints);
      if (d.recent && d.recent.length) renderFeed(d.recent);
      if (d.profileUrl) setStravaLink(d.profileUrl);
      const loading = document.getElementById("chartLoading");
      if (loading && d.chartPoints) loading.hidden = true;
    })
    .catch(() => {
      paintTally(0, 0);
      renderFeed(STATIC_FEED);
    });

  /* —— Board / pledges —— */
  const form = document.getElementById("pledgeForm");
  const okMsg = document.getElementById("okmsg");
  const boardCount = document.getElementById("boardCount");

  fetch("/.netlify/functions/pledges")
    .then((r) => r.json())
    .then((d) => {
      const n = (d && d.names && d.names.length) || 0;
      if (boardCount) boardCount.textContent = n.toLocaleString("en-US");
    })
    .catch(() => {});

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim().slice(0, 40);
      if (!name) return;

      const prev = boardCount ? parseInt(boardCount.textContent.replace(/,/g, "") || "0", 10) : 0;
      if (boardCount) boardCount.textContent = (prev + 1).toLocaleString("en-US");
      if (okMsg) okMsg.style.display = "block";

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      })
        .then(() => form.reset())
        .catch(() => {
          if (boardCount) boardCount.textContent = prev.toLocaleString("en-US");
          if (okMsg) {
            okMsg.textContent = "Hmm — try again in a moment.";
            okMsg.style.display = "block";
          }
        });
    });
  }

  /* —— Voting —— */
  getFingerprint();

  const orgsList = document.getElementById("orgsList");
  const voteMsg = document.getElementById("voteMsg");
  const vtotal = document.getElementById("vtotal");

  const SEED_VOTES = { onenten: 412, tqp: 268, saaf: 223, trevor: 301 };
  const SEED_ORGS = [
    {
      id: "onenten",
      name: "one·n·ten",
      desc: "Phoenix nonprofit for LGBTQ+ youth ages 11–24 — safe spaces, housing, leadership.",
      url: "https://onenten.org",
    },
    {
      id: "tqp",
      name: "Trans Queer Pueblo",
      desc: "Phoenix LGBTQ+ migrant community of color — mutual aid and healing justice.",
      url: "https://www.tqpueblo.org",
    },
    {
      id: "saaf",
      name: "Southern Arizona AIDS Foundation",
      desc: "Tucson — HIV services and LGBTQ+ health across southern Arizona.",
      url: "https://saaf.org",
    },
    {
      id: "trevor",
      name: "The Trevor Project",
      desc: "Crisis intervention and suicide prevention for LGBTQ+ young people.",
      url: "https://www.thetrevorproject.org",
    },
  ];

  function buildSeedResponse() {
    const total = Object.values(SEED_VOTES).reduce((s, n) => s + n, 0) || 1;
    return {
      orgs: SEED_ORGS.map((o) => ({
        ...o,
        votes: SEED_VOTES[o.id] || 0,
        pct: Math.round(((SEED_VOTES[o.id] || 0) / total) * 1000) / 10,
      })),
      totalVotes: total,
    };
  }

  function renderOrgs(data) {
    if (!orgsList || !data || !data.orgs) return;

    if (vtotal) {
      const total = data.totalVotes || data.orgs.reduce((s, o) => s + (o.votes || 0), 0);
      vtotal.textContent = total.toLocaleString("en-US");
    }

    orgsList.innerHTML = data.orgs
      .map((o, i) => {
        const voted = votedOrgId === o.id;
        const pct = Math.round(o.pct || 0);
        return `<div class="org rv in${voted ? " voted" : ""}" data-id="${esc(o.id)}">
          <h3><a href="${esc(o.url)}" target="_blank" rel="noopener noreferrer">${esc(o.name)}</a></h3>
          <div class="ods">${esc(o.desc)}</div>
          <div class="bwrap"><div class="bar2"><i id="b${i}" style="width:${pct}%"></i></div><span class="pct">${pct}%</span></div>
          <a class="org-visit" href="${esc(o.url)}" target="_blank" rel="noopener noreferrer">Visit site →</a>
          <button class="btn votebtn" type="button" data-vote="${esc(o.id)}" ${votedOrgId ? "disabled" : ""}>
            ${voted ? "Your pick ✓" : "Vote"}
          </button>
        </div>`;
      })
      .join("");
  }

  renderOrgs(buildSeedResponse());

  fetch("/.netlify/functions/votes")
    .then((r) => r.json())
    .then((d) => renderOrgs(d))
    .catch(() => {});

  if (orgsList) {
    orgsList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-vote]");
      if (!btn || votedOrgId) return;
      const orgId = btn.dataset.vote;
      btn.disabled = true;

      fetch("/.netlify/functions/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId, fingerprint: getFingerprint() }),
      })
        .then((r) => r.json())
        .then((d) => {
          if (d.error && d.error === "already voted") {
            votedOrgId = d.votedFor;
            try {
              localStorage.setItem("cfc-voted-org", votedOrgId);
            } catch (_) {}
          } else if (!d.error) {
            votedOrgId = orgId;
            try {
              localStorage.setItem("cfc-voted-org", orgId);
            } catch (_) {}
            if (voteMsg) {
              const org = (d.orgs || []).find((o) => o.id === orgId);
              voteMsg.textContent = org
                ? `You voted for ${org.name}. Final tally closes at year-end.`
                : "Vote recorded.";
              voteMsg.hidden = false;
            }
          }
          renderOrgs(d);
        })
        .catch(() => {
          btn.disabled = false;
        });
    });
  }

  /* —— Field notes —— */
  const notesGrid = document.getElementById("notesGrid");
  fetch("/content/field-notes.json")
    .then((r) => r.json())
    .then((posts) => {
      if (!notesGrid || !Array.isArray(posts)) return;
      notesGrid.innerHTML = posts
        .slice(0, 3)
        .map(
          (p) => `<a class="post rv in" href="#notes/${esc(p.slug)}">
            <div class="ph"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="2"/><circle cx="12" cy="12.5" r="3.2"/></svg><span class="pcap">Photo: ${esc(p.title.toLowerCase())}</span></div>
            <div class="body">
              <div class="meta">${esc(p.category)} · ${esc(p.date)}</div>
              <h3>${esc(p.title)}</h3>
              <p>${esc(p.excerpt)}</p>
              <span class="more">Read →</span>
            </div>
          </a>`
        )
        .join("");
    })
    .catch(() => {});

  /* —— Instagram —— */
  function renderStaticIg() {
    const grid = document.getElementById("igGrid");
    if (!grid) return;
    grid.innerHTML = STATIC_IG_CAPS.map(
      (cap, i) =>
        `<a class="igtile rv in" href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" aria-label="Instagram: ${esc(cap)}">
          <span class="cap">${esc(cap)}</span>
          <span class="ov">view</span>
        </a>`
    ).join("");
  }

  function wireInstagram(profileUrl, handle) {
    const url = profileUrl || INSTAGRAM_URL;
    const label = handle || INSTAGRAM_HANDLE;
    ["navInstagram", "mobileInstagram", "igFollowBtn", "footInstagram"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.href = url;
      if (id === "navInstagram") el.textContent = label;
    });
    const handleEl = document.getElementById("igHandle");
    if (handleEl) handleEl.textContent = label;
  }

  wireInstagram(INSTAGRAM_URL, INSTAGRAM_HANDLE);

  fetch("/.netlify/functions/instagram")
    .then((r) => r.json())
    .then((d) => {
      wireInstagram(d.profileUrl || INSTAGRAM_URL, d.handle || INSTAGRAM_HANDLE);

      if (d.source === "behold" && d.beholdFeedId) {
        const mount = document.getElementById("beholdMount");
        const grid = document.getElementById("igGrid");
        if (mount && grid) {
          grid.hidden = true;
          mount.hidden = false;
          mount.innerHTML = `<behold-widget feed-id="${esc(d.beholdFeedId)}"></behold-widget>`;
          const s = document.createElement("script");
          s.type = "module";
          s.src = "https://w.behold.so/v2.js";
          document.body.appendChild(s);
        }
        return;
      }

      if (d.posts && d.posts.length) {
        const grid = document.getElementById("igGrid");
        if (!grid) return;
        grid.innerHTML = d.posts
          .map(
            (p) => `<a class="igtile rv in" href="${esc(p.permalink || INSTAGRAM_URL)}" target="_blank" rel="noopener noreferrer">
              <img src="${esc(p.url)}" alt="" loading="lazy" width="400" height="400">
              <span class="ov">view</span>
            </a>`
          )
          .join("");
        return;
      }

      renderStaticIg();
    })
    .catch(() => renderStaticIg());

  /* —— Email signup —— */
  const emailForm = document.getElementById("emailForm");
  const emailOk = document.getElementById("emailOk");
  if (emailForm) {
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (emailOk) {
        emailOk.style.display = "block";
        emailOk.textContent = "You're on the list. We'll write when there's news.";
      }
      emailForm.reset();
    });
  }
})();
