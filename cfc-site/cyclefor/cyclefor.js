/* /cyclefor/ — "What do you cycle for?" (Oct 12, 2026)
   - the blank on the sign turns through a few answers (still under reduced motion)
   - "Copy the tag"
   - the OK form (Netlify form "cycle-for", release cyclefor-v1): checks it, shrinks a clip that's over what
     Netlify takes in one send (8 MB) by playing it once into a recorder at 720p, then posts it to Netlify.
     A clip that still won't fit gets a plain way out: post it and tag us; the OK covers it.
   Nothing here stores anything in the browser. */
(function () {
  "use strict";
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var MAX_BYTES = 7.5 * 1024 * 1024;   // Netlify Forms takes 8 MB a request
  var KEEP_S = 20;                      // a shrunk clip keeps the first 20 seconds
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // —— the sign ——
  var spin = $("[data-cf-spin]");
  if (spin && !reduce) {
    var words = ["your mom", "the view", "your head", "the morning", "you"], i = 0;
    setInterval(function () {
      if (document.hidden) return;
      i = (i + 1) % words.length;
      spin.textContent = words[i];
    }, 2400);
  }

  // —— copy the tag ——
  var copyBtn = $("[data-cf-copy]"), copied = $("[data-cf-copied]");
  if (copyBtn) copyBtn.addEventListener("click", function () {
    var t = copyBtn.getAttribute("data-cf-copy");
    var done = function () { copied.textContent = "Copied"; setTimeout(function () { copied.textContent = ""; }, 2400); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function () { copied.textContent = t; });
    else copied.textContent = t;
  });

  var form = $("[data-cf-form]");
  if (!form) return;
  form.noValidate = true;   // with JavaScript the page says what's missing in its own words; without it, the browser's required checks run
  var err = $("[data-cf-err]"), send = $("[data-cf-send]"), note = $("[data-cf-clip-note]");
  var fileIn = $("[data-cf-file]"), clipBox = $("[data-cf-clip]"), preview = $("[data-cf-preview]");
  var done = $("[data-cf-done]");
  var clip = null;   // { file, url, video (loaded, for shrinking), duration }

  function mb(n) { return (n / 1048576).toFixed(1) + " MB"; }
  function handle(s) {
    s = String(s || "").trim();
    var m = s.match(/instagram\.com\/([A-Za-z0-9._]{1,30})/i);
    if (m) s = m[1];
    s = s.replace(/^@+/, "");
    return /^[A-Za-z0-9._]{1,30}$/.test(s) ? s : "";
  }

  // —— the clip ——
  function clearClip() {
    if (clip) { URL.revokeObjectURL(clip.url); if (clip.el && clip.el.parentNode) clip.el.parentNode.removeChild(clip.el); }
    clip = null;
    preview.removeAttribute("src");
    clipBox.hidden = true;
    note.textContent = "";
    $("[data-cf-pick-label]").textContent = "Add your clip";
  }
  $("[data-cf-clear]").addEventListener("click", clearClip);
  fileIn.addEventListener("change", function () {
    var f = fileIn.files && fileIn.files[0];
    fileIn.value = "";   // the clip goes in the send by hand, never as the form's own file field
    if (!f) return;
    if (!/^video\//.test(f.type || "") && !/\.(mov|mp4|m4v|webm|3gp)$/i.test(f.name || "")) { note.textContent = "That isn’t a video. Pick a clip."; return; }
    clearClip();
    var url = URL.createObjectURL(f);
    clip = { file: f, url: url, video: null, el: null, duration: 0 };
    preview.src = url;
    clipBox.hidden = false;
    $("[data-cf-pick-label]").textContent = "Pick a different clip";
    if (f.size <= MAX_BYTES) { note.textContent = "Ready to send (" + mb(f.size) + ")."; return; }
    // too big for one send: get it ready to shrink (the shrink itself starts on Send, inside the tap)
    note.textContent = "It’s " + mb(f.size) + ". We’ll shrink it when you send.";
    var v = document.createElement("video");
    v.playsInline = true; v.preload = "auto"; v.src = url;
    v.setAttribute("playsinline", "");
    v.setAttribute("aria-hidden", "true");
    v.style.cssText = "position:fixed;left:0;top:0;width:2px;height:2px;opacity:0;pointer-events:none";
    document.body.appendChild(v);   // some browsers won't hand frames from a clip that isn't on the page
    clip.el = v;
    v.addEventListener("loadedmetadata", function () { if (clip && clip.url === url) { clip.video = v; clip.duration = v.duration || 0; } }, { once: true });
    v.addEventListener("error", function () { if (clip && clip.url === url) note.textContent = "This one is too big to send from here, and we can’t shrink it. Post it and tag @cycl_eforchange instead. Your OK covers it."; }, { once: true });
    v.load();
  });

  function pickType() {
    if (!window.MediaRecorder || !MediaRecorder.isTypeSupported) return "";
    var t = ["video/mp4;codecs=avc1,mp4a.40.2", "video/mp4", "video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"];
    for (var k = 0; k < t.length; k++) if (MediaRecorder.isTypeSupported(t[k])) return t[k];
    return "";
  }

  // Play the clip once into a recorder: a canvas at most 720 wide (or 720 tall when wide), the sound through
  // Web Audio, a bitrate that lands under the limit. Has to start inside the Send tap (sound + autoplay rules).
  function shrink(c, progress) {
    return new Promise(function (resolve, reject) {
      var v = c.video, type = pickType();
      if (!v || !type || !v.videoWidth || !HTMLCanvasElement.prototype.captureStream) return reject(new Error("can't shrink"));
      var AC = window.AudioContext || window.webkitAudioContext;
      var keep = Math.min(c.duration || KEEP_S, KEEP_S);
      var sw = v.videoWidth, sh = v.videoHeight, s = Math.min(1, 720 / Math.min(sw, sh));
      var w = Math.round(sw * s / 2) * 2, h = Math.round(sh * s / 2) * 2;
      var budget = MAX_BYTES * 0.85 * 8 / keep;   // bits a second
      var vbits = Math.max(600000, Math.min(2500000, budget - 128000));
      var cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      var ctx = cv.getContext("2d");
      var stream = cv.captureStream(30), ac = null;
      try {
        if (AC) {
          ac = new AC();
          var src = ac.createMediaElementSource(v), dest = ac.createMediaStreamDestination();
          src.connect(dest);
          dest.stream.getAudioTracks().forEach(function (t) { stream.addTrack(t); });
        }
      } catch (e) { ac = null; }
      var rec;
      try { rec = new MediaRecorder(stream, { mimeType: type, videoBitsPerSecond: vbits, audioBitsPerSecond: 96000 }); }
      catch (e) { return reject(e); }
      var chunks = [], stopped = false, last = Date.now();
      rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
      rec.onstop = function () {
        try { v.pause(); } catch (e) {}
        if (ac && ac.close) ac.close();
        var blob = new Blob(chunks, { type: type.split(";")[0] });
        if (!blob.size) return reject(new Error("empty"));
        resolve(blob);
      };
      function stop() { if (stopped) return; stopped = true; clearInterval(watch); if (rec.state !== "inactive") rec.stop(); }
      function draw() {
        if (stopped) return;
        ctx.drawImage(v, 0, 0, w, h);
        if (v.currentTime >= keep || v.ended) return stop();
        progress(Math.min(.99, v.currentTime / keep));
        last = Date.now();
        if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(draw); else requestAnimationFrame(draw);
      }
      var watch = setInterval(function () { if (Date.now() - last > 8000) { stop(); stopped = true; reject(new Error("stalled")); } }, 1000);
      v.addEventListener("ended", stop, { once: true });
      v.currentTime = 0;
      v.muted = !ac;   // with Web Audio the sound goes to the recorder, not the speaker
      var p = v.play();
      if (ac && ac.resume) ac.resume();
      rec.start(1000);
      ctx.drawImage(v, 0, 0, w, h);
      if (p && p.then) p.then(draw, function (e) { clearInterval(watch); stopped = true; try { rec.stop(); } catch (x) {} reject(e); });
      else draw();
    });
  }

  // —— checks ——
  function bad(el, msg) {
    err.textContent = msg;
    if (el) { el.setAttribute("aria-invalid", "true"); el.focus(); }
    return false;
  }
  function valid() {
    Array.prototype.forEach.call(form.querySelectorAll("[aria-invalid]"), function (el) { el.removeAttribute("aria-invalid"); });
    err.textContent = "";
    var f = form.elements;
    if (!f.cycle_for.value.trim()) return bad(f.cycle_for, "Finish the sentence: I cycle for…");
    if (!f.name.value.trim()) return bad(f.name, "Your first name, please.");
    var ig = f.instagram.value.trim();
    if (ig && !handle(ig)) return bad(f.instagram, "That doesn’t look like an Instagram handle. Try @yourname.");
    if (!ig && !clip) return bad(f.instagram, "Tell us your Instagram, or add your clip, so we can find your video.");
    var link = f.post_link.value.trim();
    if (link && !/^(https?:\/\/)?[^\s]+\.[^\s]+$/i.test(link)) return bad(f.post_link, "That link doesn’t look right. Leave it blank if you don’t have one.");
    var em = f.email.value.trim();
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return bad(f.email, "That email doesn’t look right. It’s optional.");
    if (!f.age_ok.checked) return bad(f.age_ok, "You have to be 18 or older to send us your video.");
    if (!f.people_ok.checked) return bad(f.people_ok, "Tick the second box: you’re in it, and anyone else in it said OK.");
    if (!f.use_ok.checked) return bad(f.use_ok, "Tick the last box to give us the OK.");
    return true;
  }

  function busy(on, label) {
    send.disabled = on;
    send.setAttribute("aria-busy", on ? "true" : "false");
    send.textContent = on ? label : "Send my OK";
  }

  function post(fd) {
    return fetch("/", { method: "POST", body: fd }).then(function (r) { if (!r.ok) throw new Error(r.status); return r; });
  }

  function showDone(answer, name) {
    form.hidden = true;
    $("[data-cf-done-plate]").textContent = answer || "you";
    $("[data-cf-done-h]").textContent = name ? "Got it, " + name + "." : "Got it.";
    done.hidden = false;
    done.focus({ preventScroll: true });
    var top = document.getElementById("ok");
    if (top) top.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    var plate = $("[data-cf-spin]");
    if (plate && answer) plate.textContent = answer;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!valid()) return;
    var f = form.elements;
    $("[data-cf-at]").value = new Date().toISOString();
    var fd = new FormData();
    fd.append("form-name", "cycle-for");
    ["release", "agreed_at", "cycle_for", "name", "post_link", "email"].forEach(function (k) { fd.append(k, String(f[k].value || "").trim()); });
    fd.append("instagram", handle(f.instagram.value));
    ["age_ok", "people_ok", "use_ok"].forEach(function (k) { fd.append(k, f[k].checked ? "yes" : ""); });
    fd.append("bot-field", f["bot-field"].value);
    fd.append("page", "/cyclefor/");

    var ready;
    if (clip && clip.file.size <= MAX_BYTES) {
      ready = Promise.resolve({ blob: clip.file, name: clip.file.name || "clip.mp4" });
    } else if (clip) {
      busy(true, "Shrinking your clip…");
      ready = shrink(clip, function (p) { send.textContent = "Shrinking your clip… " + Math.round(p * 100) + "%"; })
        .then(function (b) {
          if (b.size > MAX_BYTES) throw new Error("still big");
          return { blob: b, name: "clip." + (/mp4/.test(b.type) ? "mp4" : "webm") };
        });
    } else {
      ready = Promise.resolve(null);
    }

    ready.then(function (file) {
      if (file) fd.append("video", file.blob, file.name);
      busy(true, file ? "Sending " + mb(file.blob.size) + "…" : "Sending…");
      return post(fd);
    }, function () {
      busy(false);
      note.textContent = "We couldn’t shrink this clip on your phone. Take it off and post it on Instagram with the tag instead. Your OK covers it.";
      err.textContent = "Your clip is too big to send from here.";
      throw null;
    }).then(function () {
      busy(false);
      showDone(f.cycle_for.value.trim(), f.name.value.trim());
    }, function (x) {
      if (x === null) return;
      busy(false);
      err.textContent = "That didn’t go through. Try again, or send a DM to @cycl_eforchange.";
    });
  });

  $("[data-cf-again]").addEventListener("click", function () {
    form.reset();
    clearClip();
    done.hidden = true;
    form.hidden = false;
    form.elements.cycle_for.focus();
  });

  // a send without JavaScript comes back as /cyclefor/?sent=1
  if (/[?&]sent=1/.test(location.search)) showDone("", "");
})();
