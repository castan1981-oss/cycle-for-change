#!/usr/bin/env python3
"""Cycle for Change: is the homepage hero's type readable on every frame of its film? (Oct 27, 2026)

The hero's words sit over Robert's film. A poster that passes says nothing about the frame two seconds later, so this
checks every frame (10 a second) of both films at nine screen sizes, the way a phone or a laptop would draw them:

  1. serves cfc-site/ and asks Chromium where each line of hero type lands (the stencil, the intro, his line, the
     links, and the nav links at 900 and up), and where the words' scrim (.hero-in::before) starts and ends;
  2. lays each film frame under the page as object-fit: cover would (top-anchored on phones, centred on wide screens),
     darkens it by the scrim the CSS draws (keep SCRIM in step with cfc-site/home.css), and reads the background under
     each line: the 95th-percentile luminance, so a few bright pixels count and stray specks don't;
  3. fails any line under 3:1 (the stencil and the intro: large text) or 4.5:1 (everything else), with a 5% margin.

  python3 tools/hero-contrast.py                 (Playwright + numpy + ffmpeg; exits 1 on a fail)

Run it after a recut (tools/hero-film.py), after the hero's type or scrim changes, and before the PR. The nav links sit
on their own ground over the film (.nav-links, rgba .66), so they're checked against that, not the frame.
"""
import functools, http.server, json, os, re, socketserver, subprocess, sys, threading
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, "cfc-site")
VIEWS = [(390, 844), (375, 667), (360, 640), (430, 932), (820, 1180), (1024, 768), (1280, 800), (1440, 900), (1920, 1080)]
# the words' scrim in cfc-site/home.css (.hero-in::before): px from its top -> alpha, then to .72 at the foot;
# on a wide screen it fades out over its last 360px
SCRIM = [(0, 0), (60, .1), (120, .3), (170, .5), (200, .6)]
FOOT, FADE = .72, 360
NAV_GROUND = .66
TAR = np.array([0x14, 0x12, 0x18], np.float32)
PLASTER = np.array([0xEF, 0xED, 0xEA], np.float32)

def lin(c):
    c = c / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)

def lum(rgb):
    l = lin(rgb)
    return 0.2126 * l[..., 0] + 0.7152 * l[..., 1] + 0.0722 * l[..., 2]

LP = float(lum(PLASTER[None, None, :])[0, 0])

def layout():
    from playwright.sync_api import sync_playwright
    class H(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
        def do_GET(self):
            if self.path.startswith("/api/") or self.path.startswith("/.netlify/"):
                self.send_response(404); self.end_headers(); return
            return super().do_GET()
    srv = socketserver.ThreadingTCPServer(("127.0.0.1", 0), functools.partial(H, directory=SITE))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    out = {}
    js = """() => {
      const L = [], vis = (e) => { const s = getComputedStyle(e); return s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0'; };
      document.querySelectorAll('.hero-mark').forEach(e => { const b = e.getBoundingClientRect(); if (b.width && vis(e)) L.push({kind:'large', what:'stencil', x:b.x, y:b.y, w:b.width, h:b.height}); });
      const lines = (el, kind, what) => { if (!el) return; const r = document.createRange(); r.selectNodeContents(el);
        for (const b of r.getClientRects()) if (b.width > 4) L.push({kind, what, x:b.x, y:b.y, w:b.width, h:b.height}); };
      lines(document.querySelector('.hero-intro'), 'large', 'intro');
      lines(document.querySelector('.hero-line'), 'small', 'line');
      document.querySelectorAll('.hero-links a').forEach(a => lines(a, 'small', 'link'));
      document.querySelectorAll('.nav-links a').forEach(a => { if (a.offsetParent) lines(a, 'nav', 'nav'); });
      const hi = document.querySelector('.hero-in'), cs = getComputedStyle(hi, '::before'), r = hi.getBoundingClientRect();
      return { boxes: L, before: { top: r.top + parseFloat(cs.top), bottom: r.bottom, left: r.left + parseFloat(cs.left), width: parseFloat(cs.width) },
               wide: matchMedia(document.getElementById('heroFilm').getAttribute('data-wide-q')).matches,
               films: { phone: document.getElementById('heroFilm').getAttribute('data-phone-mp4'), wide: document.getElementById('heroFilm').getAttribute('data-wide-mp4') } };
    }"""
    with sync_playwright() as p:
        b = p.chromium.launch()
        for w, h in VIEWS:
            pg = b.new_page(viewport={"width": w, "height": h})
            pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/", wait_until="load"); pg.wait_for_timeout(300)
            out[(w, h)] = pg.evaluate(js); pg.close()
        b.close()
    srv.shutdown()
    return out

def frames(path, fps=10):
    w, h = map(int, subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
                                    "-of", "csv=p=0", path], capture_output=True, text=True, check=True).stdout.strip().split(","))
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vf", f"fps={fps}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                         capture_output=True, check=True).stdout
    n = len(raw) // (w * h * 3)
    return np.frombuffer(raw, np.uint8)[: n * w * h * 3].reshape(n, h, w, 3).astype(np.float32), w, h

def main():
    L = layout()
    any_d = next(iter(L.values()))
    F = {k: frames(os.path.join(SITE, any_d["films"][k].lstrip("/"))) for k in ("phone", "wide")}
    print(f"films: {any_d['films']['phone']} ({len(F['phone'][0])} frames), {any_d['films']['wide']} ({len(F['wide'][0])} frames)")
    worst, fails = [], 0
    for (W, H), d in L.items():
        key = "wide" if d["wide"] else "phone"
        fr, fw, fh = F[key]
        s = max(W / fw, H / fh); ox = (W - fw * s) * .5; oy = (H - fh * s) * (.5 if key == "wide" else 0)
        be = d["before"]; top, bot = be["top"], be["bottom"]; edge = be["left"] + be["width"]
        row = []
        for b in d["boxes"]:
            thr = (3.0 if b["kind"] == "large" else 4.5) * 1.05
            yy, xx = np.meshgrid(np.arange(int(b["y"]), int(b["y"] + b["h"])), np.arange(int(b["x"]), int(b["x"] + b["w"])), indexing="ij")
            if b["kind"] == "nav":
                a = np.full(yy.shape, NAV_GROUND, np.float32)
            else:
                t = yy - top
                a = np.interp(t, [p for p, _ in SCRIM] + [max(bot - top, 201)], [v for _, v in SCRIM] + [FOOT], left=0).astype(np.float32)
                if key == "wide": a = a * np.clip((edge - xx) / FADE, 0, 1)
            sx = np.clip(((xx - ox) / s).astype(int), 0, fw - 1); sy = np.clip(((yy - oy) / s).astype(int), 0, fh - 1)
            comp = fr[:, sy, sx, :] * (1 - a[None, ..., None]) + TAR * a[None, ..., None]
            Lb = np.percentile(lum(comp).reshape(len(fr), -1), 95, axis=1)
            cr = (LP + 0.05) / (Lb + 0.05); m = float(cr.min())
            ok = m >= thr; fails += 0 if ok else 1
            row.append(f"{b['what']} {m:.2f}{'' if ok else ' FAIL'}")
            worst.append((m / thr, f"{W}x{H} {b['what']} {m:.2f}:1 (needs {thr / 1.05:.1f})"))
        print(f"{W}x{H} {key:5} " + " | ".join(row))
    worst.sort()
    print("tightest:", "; ".join(w for _, w in worst[:3]))
    print("PASS" if not fails else f"FAIL: {fails} line(s)")
    sys.exit(1 if fails else 0)

if __name__ == "__main__":
    main()
