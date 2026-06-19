(function () {
  "use strict";

  const GOAL = 7500;
  const STATIC_MILES = 211;

  const ORGS = [
    { id: "onenten", name: "one·n·ten", desc: "LGBTQ youth, ages 14–24 · Phoenix", votes: 42 },
    { id: "lalgbt", name: "LA LGBT Center", desc: "Health, housing, advocacy · Los Angeles", votes: 38 },
    { id: "sfaf", name: "SF AIDS Foundation", desc: "Health equity · San Francisco", votes: 31 },
    { id: "trevor", name: "The Trevor Project", desc: "Crisis support for LGBTQ youth · National", votes: 27 },
  ];

  let votedOrgId = null;

  function esc(s) {
    return String(s || "").replace(/[&<>"]/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
    );
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* —— Three-slash mark SVG —— */
  function markSvg(h) {
    return `<span class="mark" aria-hidden="true"><svg viewBox="0 0 48 48" height="${h}" xmlns="http://www.w3.org/2000/svg"><path d="M8 38 L22 10" fill="none" stroke="#A99CB0" stroke-width="5" stroke-linecap="round"/><path d="M18 38 L32 10" fill="none" stroke="#E9E224" stroke-width="5" stroke-linecap="round"/><path d="M28 38 L42 10" fill="none" stroke="#F2EFE6" stroke-width="5" stroke-linecap="round"/></svg></span>`;
  }

  document.querySelectorAll("[data-mark]").forEach((el) => {
    el.innerHTML = markSvg(el.dataset.mark || "14");
  });

  /* —— Scroll reveals —— */
  if (!prefersReducedMotion()) {
    const reveals = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
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

  /* —— Sticky pledge bar —— */
  const stickyBar = document.getElementById("stickyBar");
  const boardSection = document.getElementById("board");
  if (stickyBar && boardSection) {
    const stickyIo = new IntersectionObserver(
      ([entry]) => {
        stickyBar.classList.toggle("visible", !entry.isIntersecting && window.scrollY > 200);
      },
      { threshold: 0, rootMargin: "0px" }
    );
    stickyIo.observe(boardSection);
  }

  /* —— Route chart —— */
  const chartPts = [
    [20, 70], [160, 52], [300, 64], [440, 40], [600, 58], [760, 30], [920, 46], [1060, 24],
  ];

  function initChart() {
    const bg = document.getElementById("routeBg");
    const fg = document.getElementById("routeFg");
    const nodes = document.getElementById("routeNodes");
    if (!bg || !fg || !nodes) return;

    const d = chartPts.map((p, i) => `${i ? "L" : "M"} ${p[0]} ${p[1]}`).join(" ");
    bg.setAttribute("d", d);
    fg.setAttribute("d", d);

    const len = 1600;
    fg.style.strokeDasharray = len;
    fg.style.strokeDashoffset = len;

    nodes.innerHTML = chartPts
      .map(
        (p) =>
          `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="var(--plum)" stroke="var(--yellow)" stroke-width="2"/>`
      )
      .join("");

    window.__route = { pts: chartPts, fg, len };
  }

  function paintTally(miles) {
    const m = Math.max(0, miles);
    const pct = Math.min(100, (m / GOAL) * 100);

    const curEl = document.querySelector("[data-cur]");
    const pctEl = document.querySelector("[data-pct]");
    if (curEl) {
      if (prefersReducedMotion()) {
        curEl.textContent = Math.round(m).toLocaleString();
      } else {
        animateCount(curEl, 0, m, 1200);
      }
    }
    if (pctEl) pctEl.textContent = pct.toFixed(1) + "%";

    const r = window.__route;
    if (r) {
      r.fg.style.strokeDashoffset = r.len - (r.len * pct) / 100;
      const idx = Math.min(r.pts.length - 1, Math.floor((pct / 100) * (r.pts.length - 1)));
      [...document.getElementById("routeNodes").children].forEach((c, i) => {
        c.setAttribute("fill", i <= idx ? "var(--yellow)" : "var(--plum)");
        c.setAttribute("r", i === idx ? "7" : "4");
      });
    }

    const stickyCount = document.getElementById("stickyMiles");
    if (stickyCount) stickyCount.textContent = Math.round(m).toLocaleString();
  }

  function animateCount(el, from, to, dur) {
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(from + (to - from) * eased).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  initChart();
  paintTally(STATIC_MILES);

  fetch("/.netlify/functions/mileage")
    .then((r) => r.json())
    .then((d) => {
      if (typeof d.miles === "number" && d.configured) paintTally(d.miles);
    })
    .catch(() => {});

  /* —— Board / pledges —— */
  const form = document.getElementById("pledgeForm");
  const okMsg = document.getElementById("okmsg");
  const roster = document.getElementById("roster");
  const boardCount = document.getElementById("boardCount");
  const chips = document.getElementById("nameChips");

  function renderRoster(names) {
    if (!roster) return;
    if (!names.length) {
      roster.innerHTML = '<p class="roster-empty">Be the first name on the board.</p>';
      return;
    }
    roster.innerHTML = names
      .map(
        (n) =>
          `<div class="roster-row"><span>${esc(n.name)}</span><span class="roster-chip">${esc(n.ago || "")}</span></div>`
      )
      .join("");
  }

  function addChip(name) {
    if (!chips) return;
    const chip = document.createElement("span");
    chip.className = "name-chip";
    chip.textContent = name;
    chips.prepend(chip);
  }

  fetch("/.netlify/functions/pledges")
    .then((r) => r.json())
    .then((d) => {
      const list = (d && d.names) || [];
      if (boardCount) boardCount.textContent = list.length;
      renderRoster(list);
    })
    .catch(() => {});

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim().slice(0, 40);
      if (!name) return;

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      })
        .then(() => {
          if (okMsg) okMsg.style.display = "block";
          if (roster.querySelector(".roster-empty")) roster.innerHTML = "";
          roster.insertAdjacentHTML(
            "afterbegin",
            `<div class="roster-row"><span>${esc(name)}</span><span class="roster-chip">just now</span></div>`
          );
          addChip(name);
          if (boardCount) boardCount.textContent = String(parseInt(boardCount.textContent || "0", 10) + 1);
          form.reset();
        })
        .catch(() => {
          if (okMsg) {
            okMsg.textContent = "Hmm — try again in a moment.";
            okMsg.style.display = "block";
          }
        });
    });
  }

  /* —— Orgs voting —— */
  const orgsList = document.getElementById("orgsList");
  const voteMsg = document.getElementById("voteMsg");

  function renderOrgs() {
    if (!orgsList) return;
    orgsList.innerHTML = ORGS.map((o) => {
      const voted = votedOrgId === o.id;
      return `<article class="org-card${voted ? " voted" : ""}" data-id="${esc(o.id)}">
        <div class="org-info">
          <h3>${esc(o.name)}</h3>
          <p>${esc(o.desc)}</p>
        </div>
        <div class="org-votes">
          <p class="n" data-votes="${esc(o.id)}">${o.votes}</p>
          <p class="l">votes</p>
          <button type="button" class="vote-btn" data-vote="${esc(o.id)}" ${votedOrgId ? "disabled" : ""}>${voted ? "Your pick ✓" : "Vote"}</button>
        </div>
      </article>`;
    }).join("");
  }

  renderOrgs();

  if (orgsList) {
    orgsList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-vote]");
      if (!btn || votedOrgId) return;
      const id = btn.dataset.vote;
      const org = ORGS.find((o) => o.id === id);
      if (!org) return;
      org.votes += 1;
      votedOrgId = id;
      renderOrgs();
      if (voteMsg) {
        voteMsg.textContent = `You voted for ${org.name}. Final tally closes at year-end.`;
        voteMsg.hidden = false;
      }
    });
  }

  /* —— Email signup (front-end only) —— */
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
