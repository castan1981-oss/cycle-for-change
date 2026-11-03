"""The weekly group-ride carousel: "Phoenix group rides this week" (Nov 3, 2026).

    python3 tools/week-kit/make.py                         # the seven days from tomorrow, Phoenix time
    python3 tools/week-kit/make.py --from 2026-11-11       # the seven days from that date
    python3 tools/week-kit/make.py --skip <slug> ...       # leave a ride off (its record is in doubt; re-check it)

Writes into tools/week-kit/.build/out/ (never committed): post-01..NN.jpg (1080 x 1350, one wall sliced, cover, a
sheet per day, Saturday or any day over nine rides split "Early." / "Less early.", the end card), story-*.jpg
(1080 x 1920: the week, then a frame per day, room for a link sticker), caption.txt.

The rows are the page's rows: tools/week-kit/week.js runs tools/lib/week.js over the listed rides, the same code
/rides/az/phoenix/this-week/ is built from, so the carousel and cycleforchange.org/week always agree (sorted by start,
then name). The look is Left Field paste-up in Lane Paint: poured concrete, pasted day sheets (no shadow, the joints
show through), words on slapped strips, a halftone road print with the count overprinted in rose, a clean print of
Robert taped on, CYCLE FOR sprayed through a card on the end card. Crisp edges, no grain, no filters; Overpass only.
Needs Playwright (Chromium), Pillow, numpy.
"""
import argparse, subprocess
import json, math, random, pathlib, base64, io, sys, html as H
from datetime import datetime, timezone, timedelta
import numpy as np
from PIL import Image, ImageOps, ImageFilter, ImageDraw
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent
SITE = ROOT / "cfc-site"
BUILD = HERE / ".build"
OUT = BUILD / "out"
CACHE = BUILD / "cache"

INK = "#1C1A22"; PLASTER = "#EFEDEA"; GUN = "#4A4E55"; ROSE = "#A84C58"; ROSE_INK = "#8F3E4A"; POWDER = "#D9B1AA"
PATINA = "#A9BDB8"; POOL = "#2C4F55"; CONCRETE = "#E1DFDB"
WALL = "#BCB9B2"; JOINT = "#A3A099"; TIE = "#8E8B84"; WHITE = "#F8F7F4"; CORE = "#F4F1EA"; TAPE = "#E3D6B4"; KRAFT = "#C7AC84"
SHADOW = "42,38,32"

W, HH = 1080, 1350
URL = "cycleforchange.org/week"
SPAN = ["this week"]
STENCIL = {
    "C": "M52 34 V24 Q52 8 36 8 H33 M27 8 H24 Q8 8 8 24 V126 Q8 142 24 142 H27 M33 142 H36 Q52 142 52 126 V116",
    "Y": "M11 4 L30 68 L49 4 M30 68 V150", "L": "M8 0 V150 M22 142 H54",
    "E": "M8 0 V150 M22 8 H54 M22 75 H47 M22 142 H54", "F": "M8 0 V150 M22 8 H54 M22 75 H47",
    "O": "M27 8 H24 Q8 8 8 24 V126 Q8 142 24 142 H27 M33 8 H36 Q52 8 52 24 V126 Q52 142 36 142 H33",
    "R": "M8 0 V150 M22 8 H36 Q52 8 52 24 V58 Q52 74 36 74 H22 M33 90 L50 150",
}
ROWX = [("C", 0), ("Y", 74), ("C", 148), ("L", 222), ("E", 296), ("F", 414), ("O", 488), ("R", 562)]


def esc(s):
    import re
    s = str(s)
    s = re.sub(r"(?<=\w)'(?=\w)", "’", s)
    s = s.replace("'", "’")
    return H.escape(s, quote=True)


def font_css():
    a = (SITE / "fonts" / "overpass-latin.woff2").as_uri(); b = (SITE / "fonts" / "overpass-latin-ext.woff2").as_uri()
    return (f'@font-face{{font-family:"Overpass";font-weight:100 900;src:url("{a}") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}}'
            f'@font-face{{font-family:"Overpass";font-weight:100 900;src:url("{b}") format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1E9F,U+2020,U+20A0-20AB,U+2113}}')


CSS = """
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Overpass",system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-kerning:normal;font-variant-numeric:lining-nums;background:#000}
.board{position:relative;overflow:hidden}
.abs{position:absolute}
.paper{width:100%;height:100%}
.strip{display:inline-block;white-space:nowrap;line-height:1}
.row{display:grid;grid-template-columns:var(--tc) 1fr;column-gap:22px;align-items:baseline;border-top:2px solid rgba(28,26,34,.16)}
.row:first-child{border-top:0}
.t{font-weight:800;color:#1C1A22;letter-spacing:-.01em;white-space:nowrap}
.t small{font-weight:700;font-size:.66em;margin-left:.18em;color:#4A4E55}
.n{font-weight:800;color:#1C1A22;letter-spacing:-.012em;white-space:nowrap;display:block;line-height:1.08}
.l{font-weight:600;color:#4A4E55;display:block;margin-top:.3em;line-height:1.2;white-space:nowrap}
"""

FIT = """<script>
document.fonts.load('800 40px Overpass').then(() => document.fonts.ready).then(() => {
  for (const e of document.querySelectorAll('[data-fit]')) {
    const w = +e.dataset.fit; let s = parseFloat(getComputedStyle(e).fontSize); const min = +(e.dataset.min || 8);
    while (e.scrollWidth > w && s > min) { s -= 0.5; e.style.fontSize = s + 'px'; }
    if (e.scrollWidth > w && e.dataset.wrap) { e.style.whiteSpace = 'normal'; e.style.maxWidth = w + 'px'; }
  }
  document.body.dataset.ready = '1';
});
</script>"""


PHX = timezone(timedelta(hours=-7))
DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

DISC = {"mtb": "Mountain bike", "gravel": "Gravel", "fixed": "Fixed gear"}
WAIT = {"no-drop": "Waits for you", "groups": "Pace groups", "drop": "Drops"}
# Robert's own lines on rides he rides (memory: the Friday shop ride every Friday; his TSR write-up, Oct 10, 2026)
MINE = {
    "scottsdale-az-bicycle-haus-friday-shop-ride": "I ride this one.",
    "scottsdale-az-scottsdale-cycling-saturday-ride": "I wrote this one up.",
}


def clock(dt):
    h, m = dt.hour, dt.minute
    ap = "am" if h < 12 else "pm"
    h12 = h % 12 or 12
    return f"{h12}:{m:02d} {ap}"


def place(r):
    city, hood = r.get("city"), r.get("neighborhood") or ""
    if city == "Phoenix":
        if "South Mountain" in hood:
            return "South Mountain"
        if hood and len(hood) <= 16 and not any(w in hood for w in ("Park", "Preserve")):
            return "Downtown Phoenix" if hood == "Downtown" else hood
        return "Phoenix"
    return city


def facts(r, full):
    out = []
    disc = r.get("discipline") or []
    if "road" not in disc:
        if "mtb" in disc and "gravel" in disc:
            out.append("Dirt")
        else:
            for d in disc:
                if d in DISC:
                    out.append(DISC[d]); break
            else:
                if "social" in disc:
                    out.append("Social")
    tags = r.get("tags") or []
    if "wtf" in tags:
        out.append("Women, trans, femme")
    if "beginner" in tags:
        out.append("Beginners")
    w = WAIT.get(r.get("drop_policy"))
    if w:
        out.append(w)
    pc = r.get("pc") or ""
    if pc and pc != "Steady pace":
        out.append(pc)
    lg = r.get("lg") or ""
    if lg and len(out) < 3:
        out.append(lg)
    phase = r.get("frequency") == "biweekly" and not [e for e in ((full or {}).get("dates") or []) if e and e.get("date")]
    out = out[:3]
    if phase:
        out = out[:1] + ["Every other week, check first"]
    return out


# Left off with --skip <slug> when the directory's own record is in doubt (say why in the post's notes, and re-check it):
# Nov 3, 2026: phoenix-az-valley-epic-rides-night-rider-trail-100 (its note says the Meetup series ended Oct 27).
SKIP = set()
# Lines written from the record's own schedule text where the generic facts would mislead
LINE = {
    "Silent Sunday at South Mountain": "South Mountain \u00b7 Summit Road closed to cars, 5 to 10 am",
}


def load(start, days=7):
    out = subprocess.run(["node", str(HERE / "week.js"), start, str(days)], cwd=ROOT, capture_output=True, text=True, check=True).stdout
    week = []
    for d in json.loads(out):
        y, m, dd = map(int, d["ymd"].split("-"))
        wd = datetime(y, m, dd).weekday()
        rows = []
        for o in d["rides"]:
            r = o["live"]
            if r["slug"] in SKIP or o["allDay"]:
                continue
            at = datetime.fromisoformat(o["at"].replace("Z", "+00:00")).astimezone(PHX)
            rows.append(dict(slug=r["slug"], time=clock(at), at=at.isoformat(), name=r["name"].strip(), kind=r.get("kind"),
                             line=LINE.get(r["name"].strip()) or " \u00b7 ".join([place(r)] + facts(r, o.get("full"))),
                             mine=MINE.get(r["slug"])))
        week.append(dict(ymd=d["ymd"], day=DAYS[wd], date=f"{MON[m-1]} {dd}", rows=rows))
    return week


# ---------- edges ----------
def jag(rng, n=3, amp=2.2):
    return [(rng.uniform(-amp, amp)) for _ in range(n)]


def cut_clip(rng, amp=2.4, jogs=3):
    """A scissor-cut sheet as a clip-path polygon in calc(% + px): nearly straight sides, a couple of tiny jogs."""
    pts = []
    corners = [(0, 0), (100, 0), (100, 100), (0, 100)]
    for i in range(4):
        (ax, ay), (bx, by) = corners[i], corners[(i + 1) % 4]
        pts.append((ax, ay, rng.uniform(-amp, amp), rng.uniform(-amp, amp)))
        for k in range(1, jogs + 1):
            f = k / (jogs + 1) + rng.uniform(-.06, .06)
            px, py = ax + (bx - ax) * f, ay + (by - ay) * f
            o = rng.uniform(-amp * .7, amp * .7)
            ox, oy = (0, o) if ay == by else (o, 0)
            pts.append((px, py, ox, oy))
    return "polygon(" + ",".join(f"calc({x:.2f}% + {dx:.1f}px) calc({y:.2f}% + {dy:.1f}px)" for x, y, dx, dy in pts) + ")"


def torn_path(rng, w, h, sides="tblr", amp=9, step=6, inset=0.0):
    """A torn-paper outline (SVG path) for a w x h piece; torn sides wander, others are cut straight."""
    def noise(seed):
        r = random.Random(seed); v = [r.random() for _ in range(256)]
        def f(x):
            i = int(math.floor(x)); t = x - i; u = t * t * (3 - 2 * t)
            return v[i % 256] + (v[(i + 1) % 256] - v[i % 256]) * u - .5
        return f
    n1, n2, n3 = noise(rng.random() * 1e6), noise(rng.random() * 1e6), noise(rng.random() * 1e6)

    def edge(p, q, torn):
        (x0, y0), (x1, y1) = p, q
        L = math.hypot(x1 - x0, y1 - y0); nx, ny = -(y1 - y0) / L, (x1 - x0) / L
        out = []
        steps = max(2, int(L / step)) if torn else 3
        for i in range(steps + 1):
            k = i / steps; s = k * L
            o = (amp * (1.4 * n1(s / 90) + .7 * n2(s / 22) + .35 * n3(s / 6)) if torn else rng.uniform(-1, 1)) - inset
            out.append((x0 + (x1 - x0) * k + nx * o, y0 + (y1 - y0) * k + ny * o))
        return out
    c = [(0, 0), (w, 0), (w, h), (0, h)]
    keys = ["t", "r", "b", "l"]
    pts = []
    for i in range(4):
        e = edge(c[i], c[(i + 1) % 4], keys[i] in sides)
        pts += e[:-1]
    return "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + "Z"


# ---------- materials ----------
def sheet(x, y, w, h, rot, seed, inner="", bg=PLASTER, z=2, shadow=None):
    rng = random.Random(seed)
    sh = f"filter:drop-shadow({shadow});" if shadow else ""
    return (f'<div class="abs" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;transform:rotate({rot}deg);z-index:{z};{sh}">'
            f'<div class="paper" style="background:{bg};clip-path:{cut_clip(rng)};position:relative">{inner}</div></div>')


def strip(text, x, y, size, rot, seed, bg=WHITE, fg=INK, weight=900, pad=(.24, .34, .14), z=6, slap=False, extra=""):
    """Words on a cut paper strip, stuck flat with a small contact shadow (slap = the deeper first-frame shadow)."""
    rng = random.Random(seed)
    sh = f"drop-shadow(6px 10px 8px rgba({SHADOW},.26))" if slap else f"drop-shadow(1.5px 2.5px 1.6px rgba({SHADOW},.24))"
    pt, ps, pb = pad
    return (f'<div class="abs" style="left:{x}px;top:{y}px;transform:rotate({rot}deg);transform-origin:0 50%;z-index:{z};filter:{sh}">'
            f'<div class="strip" style="background:{bg};color:{fg};font-size:{size}px;font-weight:{weight};letter-spacing:-.012em;'
            f'padding:{size*pt:.0f}px {size*ps:.0f}px {size*pb:.0f}px;clip-path:{cut_clip(rng, amp=2.0, jogs=2)};{extra}">{text}</div></div>')


def tape(x, y, w, h, rot, seed, z=7, color=TAPE, alpha=.9):
    rng = random.Random(seed)
    teeth = 7
    left = [(0, 0)] + [(rng.uniform(0, 5), (i + .5) / teeth * 100) for i in range(teeth)] + [(0, 100)]
    right = [(100, 100)] + [(100 - rng.uniform(0, 5) * 100 / w, 100 - (i + .5) / teeth * 100) for i in range(teeth)] + [(100, 0)]
    pts = ",".join(f"calc({px if px in (0,100) else 0}% + {(px if px not in (0,100) else 0):.1f}px) {py:.1f}%" for px, py in left)
    pts2 = ",".join(f"{px:.2f}% {py:.1f}%" for px, py in right)
    return (f'<div class="abs" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;transform:rotate({rot}deg);z-index:{z};'
            f'filter:drop-shadow(1px 1.5px 1px rgba({SHADOW},.18))"><div class="paper" style="background:{color};opacity:{alpha};'
            f'clip-path:polygon({pts},{pts2})"></div></div>')


def stamp(text, x, y, rot, size=46, z=8, seed=1, color=ROSE, static=False):
    """A rubber stamp: rose ink multiplied onto the paper, a darker rim, a pressure mask (tilt + two light spots)."""
    rng = random.Random(seed)
    w = int(len(text) * size * .56 + size * 1.1); h = int(size * 1.75)
    sx, sy = rng.uniform(.25, .7) * w, rng.uniform(.3, .7) * h
    pos = "position:relative;display:inline-block" if static else f"position:absolute;left:{x}px;top:{y}px"
    return (f'<svg style="{pos};transform:rotate({rot}deg);z-index:{z};mix-blend-mode:multiply;overflow:visible" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
            f'<defs><linearGradient id="sg{seed}" x1="0" x2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#c4c4c4"/></linearGradient>'
            f'<filter id="sb{seed}"><feGaussianBlur stdDeviation="{size*.22:.1f}"/></filter>'
            f'<mask id="sm{seed}"><rect width="{w}" height="{h}" fill="url(#sg{seed})"/>'
            f'<ellipse cx="{sx:.0f}" cy="{sy:.0f}" rx="{size*.5:.0f}" ry="{size*.32:.0f}" fill="#000" opacity=".55" filter="url(#sb{seed})"/>'
            f'<ellipse cx="{w-sx*.6:.0f}" cy="{h-sy*.5:.0f}" rx="{size*.36:.0f}" ry="{size*.22:.0f}" fill="#000" opacity=".4" filter="url(#sb{seed})"/></mask></defs>'
            f'<g mask="url(#sm{seed})"><rect x="5" y="5" width="{w-10}" height="{h-10}" rx="{size*.18:.0f}" fill="none" stroke="{color}" stroke-width="{max(5, size*.13):.1f}"/>'
            f'<text x="{w/2:.0f}" y="{h*.64:.0f}" text-anchor="middle" font-family="Overpass" font-weight="800" font-size="{size}" fill="{color}" stroke="{ROSE_INK}" stroke-width="1.4">{esc(text)}</text></g></svg>')


def scrap(x, y, w, h, rot, seed, color, inner_svg="", z=1, sides="tblr"):
    """An older poster's leftover piece, pasted flat (no shadow), torn with the white paper core showing."""
    rng = random.Random(seed)
    core = torn_path(random.Random(seed + 11), w, h, sides, amp=8, step=5, inset=-3)
    face = torn_path(random.Random(seed + 11), w, h, sides, amp=8, step=5, inset=rng.uniform(1.5, 4))
    face2 = torn_path(random.Random(seed + 23), w, h, sides, amp=3, step=5, inset=2)
    cid = f"sc{seed}"
    return (f'<svg class="abs" style="left:{x}px;top:{y}px;transform:rotate({rot}deg);z-index:{z};overflow:visible" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
            f'<defs><clipPath id="{cid}"><path d="{face}"/></clipPath></defs>'
            f'<path d="{core}" fill="{CORE}"/><g clip-path="url(#{cid})"><rect x="-20" y="-20" width="{w+40}" height="{h+40}" fill="{color}"/>{inner_svg}</g></svg>')


def wall(width, height, seed=7):
    """Poured concrete: flat color, form-panel joints, tie holes in a grid. Nothing painted, nothing grained."""
    rng = random.Random(seed)
    joints_v = [x for x in range(330, width, 1440)]
    joints_h = [height - 170] if height < 1500 else [430, height - 470]
    ties = []
    for jx in [-1110] + joints_v:
        for cx in (jx + 300, jx + 720, jx + 1140):
            if 0 < cx < width:
                for cy in range(150, height, 330):
                    ties.append((cx + rng.uniform(-3, 3), cy + rng.uniform(-3, 3)))
    lines = "".join(f'<rect x="{x-1.5}" y="0" width="3" height="{height}" fill="{JOINT}"/>' for x in joints_v)
    lines += "".join(f'<rect x="0" y="{y-1.5}" width="{width}" height="3" fill="{JOINT}"/>' for y in joints_h)
    holes = "".join(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="8.5" fill="{TIE}"/><path d="M{x-7:.0f} {y+5:.0f} A9 9 0 0 0 {x+7:.0f} {y+5:.0f}" stroke="#D0CDC6" stroke-width="2" fill="none"/>' for x, y in ties)
    base = (f'<svg class="abs" style="left:0;top:0;z-index:0" width="{width}" height="{height}"><rect width="{width}" height="{height}" fill="{WALL}"/>{lines}{holes}</svg>')
    through = (f'<svg class="abs" style="left:0;top:0;z-index:3;mix-blend-mode:multiply;opacity:.22;pointer-events:none" width="{width}" height="{height}">'
               f'{lines.replace(JOINT, "#8a877f")}</svg>')
    return base + through


def stencil_svg(width, color=INK, bar=ROSE, spray=False, seed=3):
    """CYCLE FOR in the road-stencil letters (the site's paths, stroke 16) + the rose bar. spray = painted through a
    card onto the wall: crisp, with overspray only on two letters where the card lifted and a few spatter dots."""
    rng = random.Random(seed)
    letters = "".join(f'<path d="{STENCIL[ch]}" transform="translate({x} 0)"/>' for ch, x in ROWX)
    h = width * 168 / 768
    extra = ""
    if spray:
        lifted = [ROWX[1], ROWX[6]]
        halo = "".join(f'<path d="{STENCIL[ch]}" transform="translate({x+1.5} 1)"/>' for ch, x in lifted)
        extra += (f'<filter id="os{seed}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter>'
                  f'<g fill="none" stroke="{color}" stroke-width="26" stroke-linejoin="round" opacity=".16" filter="url(#os{seed})">{halo}</g>')
        dots = ""
        for _ in range(26):
            cx, cy = rng.uniform(-20, 780), rng.uniform(-24, 175); r = rng.choice([.9, 1.2, 1.6, 2.2, 3])
            if rng.random() < .8 and not (0 < cx < 640 and 0 < cy < 150 and rng.random() < .5):
                dots += f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r}"/>'
        extra += f'<g fill="{color}" opacity=".85">{dots}</g>'
    return (f'<svg viewBox="-9 -9 768 168" width="{width:.0f}" height="{h:.0f}" style="overflow:visible;display:block" role="img" aria-label="Cycle for">'
            f'{extra}<g fill="none" stroke="{color}" stroke-width="16" stroke-linejoin="round">{letters}</g>'
            f'<rect x="652" y="114" width="98" height="36" fill="{bar}"/></svg>')


# ---------- the halftone print (Left Field move 5) ----------
def halftone_png(src, w, h, cell=16, angle=15, ink=POOL, focus=(.5, .4), lo=40, hi=215, box=None):
    key = CACHE / f"ht-{pathlib.Path(src).stem}-{w}x{h}-{cell}-{angle}-{ink[1:]}-{box}-{lo}-{hi}.png"
    if key.exists():
        return key
    CACHE.mkdir(exist_ok=True)
    im = Image.open(src).convert("L")
    if box: im = im.crop(box)
    g = ImageOps.autocontrast(ImageOps.fit(im, (w, h), Image.LANCZOS, centering=focus), cutoff=1)
    a = np.asarray(g).astype(np.float32)
    g = Image.fromarray((np.clip((a - lo) / (hi - lo), 0, 1) * 255).astype(np.uint8))
    scale = 4; big = Image.new("L", (w * scale, h * scale), 0); d = ImageDraw.Draw(big)
    A = np.asarray(g.filter(ImageFilter.GaussianBlur(cell / 3))).astype(np.float32) / 255.0
    th = math.radians(angle); c, s = math.cos(th), math.sin(th); R = int(max(w, h) * 1.5)
    for i in range(-R // cell, R // cell):
        for j in range(-R // cell, R // cell):
            x = (i * c - j * s) * cell + w / 2; y = (i * s + j * c) * cell + h / 2
            if 0 <= x < w and 0 <= y < h:
                r = cell * .62 * math.sqrt(max(0, 1 - A[int(y), int(x)]))
                if r > .6:
                    d.ellipse([(x - r) * scale, (y - r) * scale, (x + r) * scale, (y + r) * scale], fill=255)
    mask = big.resize((w, h), Image.LANCZOS)
    rgb = tuple(int(ink[i:i + 2], 16) for i in (1, 3, 5))
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0)); out.paste(Image.new("RGB", (w, h), rgb), (0, 0), mask)
    out.save(key)
    return key


def photo_print(src, x, y, w, h, rot, seed, caption="", pos="50% 50%", z=5):
    """A real photo print, clean and ungraded, white border, taped at two corners (a print, so a light lift shadow)."""
    b = 18; cap_h = 44 if caption else 0
    img = (SITE / src).as_uri()
    t1 = tape(x - 26, y - 14, 120, 40, rot - 34, seed + 1, z=z + 1)
    t2 = tape(x + w + 2 * b - 96, y + h + 2 * b + cap_h - 24, 120, 40, rot - 30, seed + 2, z=z + 1)
    cap = (f'<div style="font-size:24px;font-weight:700;color:{GUN};padding:8px 2px 0">{esc(caption)}</div>') if caption else ""
    return (f'<div class="abs" style="left:{x}px;top:{y}px;transform:rotate({rot}deg);z-index:{z};filter:drop-shadow(2px 4px 3px rgba({SHADOW},.26))">'
            f'<div style="background:{WHITE};padding:{b}px {b}px {b if not caption else 10}px;clip-path:{cut_clip(random.Random(seed), amp=1.4, jogs=1)}">'
            f'<img src="{img}" style="display:block;width:{w}px;height:{h}px;object-fit:cover;object-position:{pos}">{cap}</div></div>') + t1 + t2


# ---------- the day sheet ----------
def row_scale(n, avail, story=False):
    per = min(170, avail / max(n, 1))
    name = min(52 if story else 50, (per - 24) / 2.16)
    return per, name


def day_rows(rows, width, avail, story=False):
    n = len(rows)
    mine_n = sum(1 for r in rows if r.get("mine"))
    per, name = row_scale(n, avail - mine_n * 58 - n * 6, story)
    line = min(name * .72, 31); tsz = name * 1.0
    pad = max(9, (per - name * 1.08 - line * 1.5) / 2)
    tc = tsz * 4.3
    out = []
    for r in rows:
        hh, ap = r["time"].split(" ")
        mine = r.get("mine")
        st = ""
        if mine:
            st = (f'<span style="display:block;margin:10px 0 0 -4px;line-height:0">'
                  f'{stamp(mine, 0, 0, -3, size=30, seed=sum(map(ord, mine)), z=9, static=True)}</span>')
        out.append(f'<div class="row" style="--tc:{tc:.0f}px;padding:{pad:.0f}px 0;position:relative">'
                   f'<span class="t" style="font-size:{tsz:.1f}px">{hh}<small>{ap}</small></span>'
                   f'<span style="display:flex;flex-direction:column;align-items:flex-start;min-width:0"><span class="n" style="font-size:{name:.1f}px" data-fit="{width - tc - 22:.0f}" data-min="{name*.64:.0f}" data-wrap="1">{esc(r["name"])}</span>'
                   f'<span class="l" style="font-size:{line:.1f}px" data-fit="{width - tc - 22:.0f}" data-min="{line*.8:.0f}">{esc(r["line"])}</span>{st}</span>'
                   + '</div>')
    return "".join(out)


def sheet_height(n, story=False, avail_max=None):
    head, foot = 150, 104
    per = 170 if n <= 3 else None
    if per:
        return head + n * per + foot
    return avail_max


def day_sheet(x0, d, title, date, rows, seed, y=150, h=1090, story=False, foot=True, note=None):
    """A pasted day sheet: the rows printed on it, the day on a slapped bruise strip, the date on a powder-rose strip."""
    sx, sw = x0 + 64, 952
    inner_w = sw - 96
    head_h = 205 if note else 150
    foot_h = 74 if foot else 26
    rows_html = day_rows(rows, inner_w, h - head_h - foot_h - 24, story=story)
    count = f'{len(rows)} ride{"s" if len(rows) != 1 else ""}'
    footer = (f'<div class="abs" style="left:48px;right:48px;bottom:26px;font-size:25px;font-weight:700;color:{GUN};white-space:nowrap">'
              f'Where they start, how fast, the route: <span style="color:{INK};font-weight:800">{URL}</span></div>') if foot else ""
    inner = (f'<div class="abs" style="right:48px;top:{head_h - 58}px;font-size:28px;font-weight:700;color:{GUN}">{count}</div>'
             f'<div class="abs" style="left:48px;right:48px;top:{head_h}px">{rows_html}</div>{footer}')
    rot = random.Random(seed).uniform(-.3, .3)
    s = sheet(sx, y, sw, h, rot, seed, inner)
    s += strip(esc(title), sx - 18, y - 52, 118, -1.6, seed + 3, bg=INK, fg=PLASTER, slap=True, z=6)
    tw = len(title) * 118 * .6
    s += strip(esc(date), sx + tw + 64, y - 34, 60, 2.2, seed + 5, bg=POWDER, fg=INK, weight=800, z=7)
    if note:
        s += strip(esc(note), sx + 34, y + 118, 50, 1.6, seed + 7, bg=WHITE, fg=INK, weight=900, z=8)
    return s


# ---------- slides ----------
def cover(x0, total, days, story=False):
    """Slide 1: a halftone print of a Valley road pasted up, the number overprinted in rose, a clean print of Robert
    taped on, the words on strips."""
    s = ""
    pw, ph = 960, 860
    px, py = x0 + 60, (60 if not story else 236)
    ht = halftone_png(SITE / "img/ph/pv-morning-road-2.jpg", pw - 40, ph - 40, cell=16, angle=15, ink=PATINA, focus=(.5, .5), box=(0, 260, 1080, 1440), lo=50, hi=235)
    inner = (f'<img src="{ht.as_uri()}" style="position:absolute;left:20px;top:20px;width:{pw-40}px;height:{ph-40}px">'
             f'<div class="abs" style="left:22px;bottom:12px;font-size:470px;font-weight:900;line-height:.74;letter-spacing:-.055em;color:{ROSE};mix-blend-mode:multiply;transform:translate(8px,6px)">{total}</div>')
    s += sheet(px, py, pw, ph, -1.0, 101, inner, bg=PLASTER)
    s += photo_print("img/ph/robert-selfie-camelback-2.jpg", x0 + 548, py + 40, 400, 300, 3.2, 131, "Paradise Valley \u00b7 Oct 2025", "62% 45%", z=6)
    y0 = py + ph - 30
    s += strip("group rides", x0 + 64, y0, 112, -2.0, 111, slap=True)
    s += strip("this week.", x0 + 360, y0 + 132, 112, 1.3, 112)
    s += strip(f"In the Valley, {SPAN[0]}.", x0 + 86, y0 + 290, 54, -.8, 113, bg=POWDER, weight=800, z=7)
    return s


def end_card(x0, story=False):
    s = ""
    top = 110 if not story else 300
    s += f'<div class="abs" style="left:{x0+70}px;top:{top}px;z-index:2">{stencil_svg(930, spray=True)}</div>'
    y = top + 300
    s += strip("Every ride has a page.", x0 + 70, y, 72, -1.2, 201, slap=True)
    lines = ["Where it starts.", "How fast.", "If they wait.", "When we last checked."]
    for i, t in enumerate(lines):
        s += strip(t, x0 + 92 + (i % 2) * 36, y + 128 + i * 82, 52, [1.1, -.9, 1.6, -.6][i], 210 + i, weight=800)
    yu = y + 128 + 4 * 82 + 40
    s += strip("cycleforchange.org", x0 + 64, yu, 92, -.9, 221, bg=TAPE, weight=800, slap=True, z=8)
    s += strip("/week", x0 + 520, yu + 104, 150, 1.8, 222, bg=INK, fg=PLASTER, weight=900, z=9)
    s += stamp("Save this.", x0 + 120, yu + 150, -9, size=50, seed=231, z=9)
    s += strip("Run a ride that\u2019s not here? DM me.", x0 + 70, yu + 332, 40, -.6, 241, weight=800, z=8)
    return s


def build_feed(days, total):
    """Ten slides on one wall: cover, a sheet per day (Saturday split early / less early), the end card."""
    slides = []
    order = []
    for d in days:
        if d["day"] == "Saturday" or len(d["rows"]) > 9:
            early = [r for r in d["rows"] if r["at"][11:13] < "07"]
            late = [r for r in d["rows"] if r not in early]
            if early and late:
                order.append((d["day"] + ".", "Early.", early, d))
                order.append((d["day"] + ".", "Less early.", late, d))
            else:
                order.append((d["day"] + ".", None, d["rows"], d))
        else:
            order.append((d["day"] + ".", None, d["rows"], d))
    n = 2 + len(order)
    width = W * n
    body = wall(width, HH)
    # old posters: scraps of the last one ("Riding season.") left at a few seams, under everything
    rid = f'<text x="18" y="148" font-family="Overpass" font-weight="900" font-size="150" fill="{INK}" letter-spacing="-4">Riding</text>'
    sea = f'<text x="-40" y="120" font-family="Overpass" font-weight="900" font-size="120" fill="{ROSE}" letter-spacing="-3">season.</text>'
    body += scrap(4 * W - 170, 1262, 340, 200, 2, 301, PATINA, rid)
    body += scrap(3 * W - 120, 1250, 250, 150, -3, 302, POWDER, sides="tbr")
    body += scrap(8 * W - 110, 30, 230, 150, -2, 304, CONCRETE)
    body += scrap(4 * W - 60, -60, 160, 150, 4, 305, PATINA)
    body += cover(0, total, days)
    # a strip across the first seam: the swipe cue, no arrow
    body += strip("Find your day.", W - 250, 1262, 54, -1.2, 120, bg=WHITE, weight=900, slap=True, z=9)
    for i, (title, note, rows, d) in enumerate(order):
        x0 = W * (i + 1)
        if len(rows) <= 3:
            h = sheet_height(len(rows))
            body += day_sheet(x0, d, title, d["date"], rows, 400 + i * 17, h=h, note=note)
            ph = PHOTOS.get(d["day"])
            if ph:
                body += photo_print(ph["src"], x0 + ph["x"], 150 + h + 44, ph["w"], ph["h"], ph["rot"], 500 + i, ph["cap"], ph.get("pos", "50% 50%"))
        else:
            body += day_sheet(x0, d, title, d["date"], rows, 400 + i * 17, note=note, h=1160 if len(rows) >= 8 else 1090)
    body += end_card(W * (n - 1))
    return width, body, n, [o[:3] for o in order]


PHOTOS = {
    "Friday": dict(src="img/ph/pv-shadow-2.jpg", x=330, w=560, h=330, rot=2.0, cap="Paradise Valley · Jul 2026", pos="50% 62%"),
    "Monday": dict(src="img/ph/riders-camelback-2.jpg", x=150, w=600, h=420, rot=-1.6, cap="Paradise Valley · Sep 2025", pos="50% 58%"),
}


def page(body, w, h):
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{font_css()}{CSS}</style></head>'
            f'<body><div class="board" style="width:{w}px;height:{h}px">{body}</div>{FIT}</body></html>')


def shoot_feed(pg, days, total):
    width, body, n, order = build_feed(days, total)
    f = BUILD / "feed.html"; f.write_text(page(body, width, HH))
    pg.set_viewport_size({"width": width, "height": HH})
    pg.goto(f.as_uri()); pg.wait_for_function("document.body.dataset.ready === '1'")
    OUT.mkdir(exist_ok=True)
    pg.screenshot(path=str(OUT / "wall-strip.png"), clip={"x": 0, "y": 0, "width": width, "height": HH})
    full = Image.open(OUT / "wall-strip.png").convert("RGB")
    names = []
    for i in range(n):
        p = OUT / f"post-{i+1:02d}.jpg"
        full.crop((i * W, 0, (i + 1) * W, HH)).save(p, quality=93, subsampling=0, optimize=True)
        names.append(p.name)
    return names, order


def story_frames(days, total):
    SH = 1920
    cue = lambda k: (strip("Where they start, how fast, the route.", 64, 1404, 44, -1, 720 + k, weight=800)
                     + strip("Tap the link.", 120, 1474, 44, 1.4, 730 + k, bg=POWDER, weight=900))
    frames = [("story-00-week", wall(W, SH, seed=9) + cover(0, total, days, story=True)
               + strip("Every ride, every day. Tap the link.", 64, 1474, 44, -1, 140, bg=POWDER, weight=900))]
    k = 0
    for d in days:
        parts = [(d["day"] + ".", None, d["rows"])]
        if len(d["rows"]) > 9:
            early = [r for r in d["rows"] if r["at"][11:13] < "07"]
            parts = [(d["day"] + ".", "Early.", early), (d["day"] + ".", "Less early.", [r for r in d["rows"] if r not in early])]
        for title, note, rows in parts:
            k += 1
            body = wall(W, SH, seed=9 + k)
            h = sheet_height(len(rows)) if len(rows) <= 3 else 1080
            body += day_sheet(0, d, title, d["date"], rows, 700 + k * 13, y=290, h=h, story=True, foot=False, note=note)
            body += cue(k)
            slug = d["day"].lower() + ("-" + note.strip(".").lower().replace(" ", "-") if note else "")
            frames.append((f"story-{k:02d}-{slug}", body))
    return frames


def shoot_stories(pg, days, total):
    SH = 1920
    out = []
    for name, body in story_frames(days, total):
        f = BUILD / "story.html"; f.write_text(page(body, W, SH))
        pg.set_viewport_size({"width": W, "height": SH})
        pg.goto(f.as_uri()); pg.wait_for_function("document.body.dataset.ready === '1'")
        png = OUT / f"{name}.png"
        pg.screenshot(path=str(png), clip={"x": 0, "y": 0, "width": W, "height": SH})
        Image.open(png).convert("RGB").save(OUT / f"{name}.jpg", quality=93, subsampling=0, optimize=True); png.unlink()
        out.append(name + ".jpg")
    return out


def span_words(days):
    """'Nov 4\u201310' or 'Oct 28\u2013Nov 3' for the cover."""
    a, z = days[0]["date"], days[-1]["date"]
    return f"{a}\u2013{z.split(' ')[1]}" if a.split(" ")[0] == z.split(" ")[0] else f"{a}\u2013{z}"


def caption(days, total):
    first, last = days[0]["day"], days[-1]["day"]
    mine = [r for d in days for r in d["rows"] if r.get("mine") == "I ride this one."]
    return "\n\n".join([f"{total} group rides in the Valley this week. {first} to {last}.", "Swipe to your day.",
                        f"Every one has a page: where it starts, how fast, if they wait, and when we last checked it. {URL}"]
                       + (["I ride the Friday shop ride. Come say hi."] if mine else [])
                       + ["Run a ride that\u2019s not on here? DM me.", "#phoenixcycling #grouprides"]) + "\n"


if __name__ == "__main__":
    from datetime import date as _date
    ap = argparse.ArgumentParser()
    ap.add_argument("--from", dest="start", default=(datetime.now(PHX).date() + timedelta(days=1)).isoformat())
    ap.add_argument("--skip", nargs="*", default=[])
    ap.add_argument("--no-stories", action="store_true")
    a = ap.parse_args()
    SKIP.update(a.skip)
    days = load(a.start)
    total = sum(1 for d in days for r in d["rows"] if r.get("kind") != "open-streets")
    SPAN[0] = span_words(days)
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page()
        names, order = shoot_feed(pg, days, total)
        print("feed:", " ".join(names))
        if not a.no_stories:
            print("stories:", " ".join(shoot_stories(pg, days, total)))
        b.close()
    (OUT / "caption.txt").write_text(caption(days, total))
    print(f"{total} group rides, {sum(len(d['rows']) for d in days)} rows; caption in {OUT / 'caption.txt'}")
