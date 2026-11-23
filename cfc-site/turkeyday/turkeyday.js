/* /turkeyday/ (Nov 23, 2026). The card maker: what you did, what you're grateful for, an optional picture, drawn
   onto a 1080 x 1350 canvas in the browser. Nothing typed or picked is sent anywhere or stored. The mark is read
   from the header's own paths (#cfCycle, #cfFor), so there is no second copy of it to drift.
   Without this script the form stays hidden and the page still says what to do: post it and tag @cyclefor_. */
(function () {
  "use strict";
  var form = document.querySelector("[data-td-form]");
  var out = document.querySelector("[data-td-out]");
  if (!form || !out || !document.createElement("canvas").getContext) return;
  var img = out.querySelector("[data-td-card]"), save = out.querySelector("[data-td-save]"), msg = out.querySelector("[data-td-msg]");
  var PAPER = "#EFEDEA", INK = "#1C1A22", MUTE = "#4A4E55", PINK = "#C2557F", FONT = "Overpass, system-ui, sans-serif";
  var last = null;
  form.hidden = false;

  function markPaths() {
    return [].slice.call(document.querySelectorAll("#cfCycle path, #cfFor path")).map(function (p) { return p.getAttribute("d"); });
  }
  function wrap(x, text, maxW) {
    var words = text.trim().split(/\s+/), lines = [], cur = "";
    words.forEach(function (w) {
      var t = cur ? cur + " " + w : w;
      if (x.measureText(t).width <= maxW || !cur) cur = t; else { lines.push(cur); cur = w; }
    });
    if (cur) lines.push(cur);
    return lines;
  }
  function fit(x, text, weight, start, min, maxW, maxLines) {
    var s = start, lines;
    for (;;) {
      x.font = weight + " " + s + "px " + FONT;
      lines = wrap(x, text, maxW);
      if ((lines.length <= maxLines && lines.every(function (l) { return x.measureText(l).width <= maxW; })) || s <= min) return { s: s, lines: lines.slice(0, maxLines) };
      s -= 4;
    }
  }
  function rrect(x, w, h, r) {
    x.beginPath(); x.moveTo(r, -h); x.lineTo(w - r, -h); x.quadraticCurveTo(w, -h, w, -h + r); x.lineTo(w, -r);
    x.quadraticCurveTo(w, 0, w - r, 0); x.lineTo(r, 0); x.quadraticCurveTo(0, 0, 0, -r); x.lineTo(0, -h + r); x.quadraticCurveTo(0, -h, r, -h); x.closePath();
  }
  function plate(x, px, py, txt, F) {            // the site's plate: the pink, plaster type, 2.5 degrees off square
    x.font = "900 " + F + "px " + FONT;
    var w = x.measureText(txt).width + F * 0.72, h = F * 1.28;
    x.save(); x.translate(px, py + h); x.rotate(-2.5 * Math.PI / 180);
    x.fillStyle = PINK; rrect(x, w, h, F * 0.07); x.fill();
    x.fillStyle = PAPER; x.textBaseline = "alphabetic"; x.fillText(txt, F * 0.36, -h + F * 0.98);
    x.restore();
    return h;
  }
  function picture() {
    var f = document.getElementById("td-pic").files && document.getElementById("td-pic").files[0];
    if (!f) return Promise.resolve(null);
    return new Promise(function (res) {
      var i = new Image(); i.onload = function () { res(i); }; i.onerror = function () { res(null); };
      i.src = URL.createObjectURL(f);
    });
  }
  function fonts() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all(["400", "700", "800", "900"].map(function (w) { return document.fonts.load(w + " 40px Overpass"); })).catch(function () {});
  }
  function draw() {
    return Promise.all([fonts(), picture()]).then(function (r) {
      var pic = r[1], tall = pic && pic.height / pic.width > 1.2, TW = tall ? 500 : 940;
      var did = document.getElementById("td-did").value.trim() || "Rode my bike.";
      var gr = document.getElementById("td-gr").value.trim() || "This.";
      var nm = document.getElementById("td-nm").value.trim();
      var c = document.createElement("canvas"); c.width = 1080; c.height = 1350;
      var x = c.getContext("2d");
      x.fillStyle = PAPER; x.fillRect(0, 0, 1080, 1350);
      x.save(); x.translate(70, 70); x.scale(1.6, 1.6); x.fillStyle = INK;
      markPaths().forEach(function (d) { x.fill(new Path2D(d)); });
      x.restore();
      plate(x, 70 + 404 * 1.6 + 30, 80, "thanks.", 64);
      x.fillStyle = INK; x.textBaseline = "alphabetic"; x.font = "800 36px " + FONT; x.fillText("Turkey Day 2026", 70, 292);
      if (nm) { x.font = "400 36px " + FONT; x.textAlign = "right"; x.fillText(nm, 1010, 292); x.textAlign = "left"; }
      x.fillRect(70, 314, 940, 3);
      x.font = "400 40px " + FONT; x.fillStyle = MUTE; x.fillText("What I did", 70, 410);
      var a = fit(x, did, "800", tall ? 72 : pic ? 84 : 112, 44, TW, tall ? 5 : pic ? 2 : 3);
      x.fillStyle = INK; x.font = "800 " + a.s + "px " + FONT;
      var y = 410 + a.s * 1.05;
      a.lines.forEach(function (l) { x.fillText(l, 70, y); y += a.s * 1.06; });
      y += 40; x.font = "400 40px " + FONT; x.fillStyle = MUTE; x.fillText("Grateful for", 70, y); y += 34;
      var b = fit(x, gr, "900", tall ? 60 : pic ? 76 : 104, 40, TW - 80, tall ? 4 : pic ? 2 : 3);
      b.lines.forEach(function (l) { y += plate(x, 70, y, l, b.s) + 10; });
      if (pic) {
        var top = tall ? 356 : y + 34, aw = tall ? 400 : 940, ah = 1206 - top;
        var k = Math.min(aw / pic.width, ah / pic.height), w = pic.width * k, h = pic.height * k, ix = tall ? 1010 - w : 70;
        if (ah > 180) { x.drawImage(pic, ix, top, w, h); x.strokeStyle = INK; x.lineWidth = 3; x.strokeRect(ix, top, w, h); }
      }
      x.fillStyle = INK; x.fillRect(70, 1240, 940, 3);
      x.font = "700 32px " + FONT; x.fillText("cycleforchange.org", 70, 1296);
      x.font = "400 32px " + FONT; x.textAlign = "right"; x.fillText("@cyclefor_", 1010, 1296); x.textAlign = "left";
      return c;
    });
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    draw().then(function (c) {
      last = c; img.src = c.toDataURL("image/png"); out.hidden = false; msg.textContent = "";
      var calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      out.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "nearest" });
    });
  });
  save.addEventListener("click", function () {
    if (!last) return;
    last.toBlob(function (blob) {
      if (!blob) { msg.textContent = "That didn’t save. Press and hold the picture instead."; return; }
      var file = null;
      try { file = new File([blob], "turkey-day-card.png", { type: "image/png" }); } catch (err) { file = null; }
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file] }).then(function () { msg.textContent = ""; }, function () {});
        return;
      }
      var a = document.createElement("a"), u = URL.createObjectURL(blob);
      a.href = u; a.download = "turkey-day-card.png"; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(u); }, 4000);
      msg.textContent = "Saved to your downloads.";
    }, "image/png");
  });
})();
