(function () {
  "use strict";

  const GOAL = 7500;
  const INSTAGRAM_URL = "https://instagram.com/cycl_eforchange";
  const INSTAGRAM_HANDLE = "@cycl_eforchange";

  const STATIC_FEED = [
    { discipline: "bike", title: "South Mountain loop", note: "Building the engine.", miles: 62 },
    { discipline: "run", title: "Papago tempo", note: "Heat training.", miles: 8 },
    { discipline: "swim", title: "3,000 yd pool set", note: "The quiet discipline.", miles: 1.7 },
  ];

  const STATIC_IG_TILES = 6;

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
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  }

  /* —— Mobile menu —— */
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const open = mobileNav.getAttribute("aria-hidden") === "false";
      mobileNav.setAttribute("aria-hidden", open ? "true" : "false");
      menuToggle.setAttribute("aria-expanded", open ? "false" : "true");
      menuToggle.textContent = open ? "Menu" : "Close";
    });
    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileNav.setAttribute("aria-hidden", "true");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "Menu";
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
        (a) => `<article class="feed-card">
          <span class="feed-tag ${esc(a.discipline)}">${esc(a.discipline)}</span>
          <div>
            <p class="feed-title">${esc(a.title)}</p>
            ${a.note ? `<p class="feed-note">${esc(a.note)}</p>` : ""}
          </div>
          <span class="feed-mi">${Number(a.miles).toFixed(1)}<span> mi</span></span>
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
      if (boardCount) boardCount.textContent = String(n);
    })
    .catch(() => {});

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim().slice(0, 40);
      if (!name) return;

      const prev = boardCount ? parseInt(boardCount.textContent || "0", 10) : 0;
      if (boardCount) boardCount.textContent = String(prev + 1);
      if (okMsg) okMsg.style.display = "block";

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      })
        .then(() => form.reset())
        .catch(() => {
          if (boardCount) boardCount.textContent = String(prev);
          if (okMsg) {
            okMsg.textContent = "Hmm — try again in a moment.";
            okMsg.style.display = "block";
          }
        });
    });
  }

  /* —— Voting —— */
  const orgsList = document.getElementById("orgsList");
  const voteMsg = document.getElementById("voteMsg");

  function renderOrgs(data) {
    if (!orgsList || !data || !data.orgs) return;
    orgsList.innerHTML = data.orgs
      .map((o) => {
        const voted = votedOrgId === o.id;
        return `<article class="org-card${voted ? " voted" : ""}" data-id="${esc(o.id)}">
          <div class="org-top">
            <div>
              <h3 class="serif"><a href="${esc(o.url)}" target="_blank" rel="noopener noreferrer">${esc(o.name)}</a></h3>
              <p>${esc(o.desc)}</p>
              <a class="org-visit" href="${esc(o.url)}" target="_blank" rel="noopener noreferrer">Visit site →</a>
            </div>
          </div>
          <div class="org-bar-wrap" aria-hidden="true">
            <div class="org-bar" style="width:${o.pct || 0}%"></div>
          </div>
          <div class="org-actions">
            <span class="org-pct">${o.pct || 0}% · ${o.votes} votes</span>
            <button type="button" class="vote-btn" data-vote="${esc(o.id)}" ${votedOrgId ? "disabled" : ""}>
              ${voted ? "Your pick ✓" : "Vote"}
            </button>
          </div>
        </article>`;
      })
      .join("");
  }

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

  getFingerprint();
  fetch("/.netlify/functions/votes")
    .then((r) => r.json())
    .then((d) => {
      if (votedOrgId) renderOrgs(d);
    })
    .catch(() => {});

  /* —— Field notes —— */
  const notesGrid = document.getElementById("notesGrid");
  fetch("/content/field-notes.json")
    .then((r) => r.json())
    .then((posts) => {
      if (!notesGrid || !Array.isArray(posts)) return;
      notesGrid.innerHTML = posts
        .slice(0, 3)
        .map(
          (p) => `<a class="note-card" href="#notes/${esc(p.slug)}">
            <div class="note-photo" aria-hidden="true">Photo</div>
            <div class="note-body">
              <p class="note-meta">${esc(p.category)} · ${esc(p.date)}</p>
              <h3 class="serif">${esc(p.title)}</h3>
              <p>${esc(p.excerpt)}</p>
              <span class="note-read">Read →</span>
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
    grid.innerHTML = Array.from({ length: STATIC_IG_TILES }, (_, i) =>
      `<a class="ig-tile" href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" aria-label="Instagram post ${i + 1}">
        <div class="ig-placeholder"></div>
        <span class="overlay">View</span>
      </a>`
    ).join("");
  }

  function wireInstagram(profileUrl, handle) {
    const url = profileUrl || INSTAGRAM_URL;
    const label = handle || INSTAGRAM_HANDLE;
    ["navInstagram", "mobileInstagram", "igFollowBtn", "igFollowLink", "footInstagram"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.href = url;
      if (id === "navInstagram" || id === "igHandle") el.textContent = label;
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
            (p) => `<a class="ig-tile" href="${esc(p.permalink || INSTAGRAM_URL)}" target="_blank" rel="noopener noreferrer">
              <img src="${esc(p.url)}" alt="" loading="lazy" width="400" height="400">
              <span class="overlay">View</span>
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
