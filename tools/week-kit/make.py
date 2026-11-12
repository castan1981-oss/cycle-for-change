"""The weekly group-ride carousel: "Phoenix group rides this week" (Nov 3, 2026; the poster look since Nov 11).

    python3 tools/week-kit/make.py                         # Monday to Sunday: this week on a Monday, else the next one
    python3 tools/week-kit/make.py --from 2026-11-11       # the seven days from that date
    python3 tools/week-kit/make.py --skip <slug> ...       # leave a ride off by hand (say why; re-check it)
    python3 tools/week-kit/make.py --keep <slug> ...       # put back a ride the doubt check left off

Robert posts it Monday mornings (Nov 3, 2026: "Maybe we should do it for Monday morning"), so the default week is
Monday to Sunday, the same seven days /week shows that morning. A ride the site's own upkeep data doubts (week.js
`doubt`: a red flag, ending words or no upcoming date on the host's page, the host's calendar not listing it for two
weeks) stays off the post and goes in left-off.txt with the reason.

Writes into tools/week-kit/.build/out/ (never committed): post-01..NN.jpg (1080 x 1350: the cover, a slide per day,
Saturday or any day over nine rides split "Early." / "Less early.", the end card), story-*.jpg (1080 x 1920: the week,
then a frame per day, room for a link sticker), caption.txt, left-off.txt.

The rows are the page's rows: tools/week-kit/week.js runs tools/lib/week.js over the listed rides, the same code
/rides/az/phoenix/this-week/ is built from, so the carousel and cycleforchange.org/week always agree (sorted by start,
then name).

The look is the poster (Robert, Nov 9, 2026, sending SLC Fixed's November ride poster: "Can we use some of these
elements for design"; Nov 11, asked whether to switch Monday's slides to it: "Can you just do it for me"). A crumpled
teal paper ground with new creases on every slide, one big word across the top in rough marker capitals (drawn as
strokes here, not a font), the one-liner on a paper strip, taped paper cards with a pink header band and rows with the
name on the left and the time on the right, Robert as a one-color print (assets/print-robert-peace.png, made once by
print.py), a checkered flag, and the mark (scripts/mark-2027.js) as a square badge. Overpass for every word that isn't
hand-lettered; sentence case; caps only in the lettering. The paste-up wall it replaces is in git history.
Needs Playwright (Chromium), Pillow, numpy. Nothing else: no model download, no scipy.
"""
import argparse, subprocess
import json, math, random, pathlib, re, sys, html as H
from datetime import datetime, timezone, timedelta
import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent
SITE = ROOT / "cfc-site"
BUILD = HERE / ".build"
OUT = BUILD / "out"
CACHE = BUILD / "cache"
ASSETS = HERE / "assets"
W, PH, SH = 1080, 1350, 1920

# the site's inks, the mark's pink, and the poster's own paper, teal and lettering pink (Nov 9, 2026)
INK = "#1C1A22"; GUN = "#4A4E55"; PLATE = "#C2557F"
PAPER = "#F4F2ED"; LETTER = "#F4AFC6"; TAPE = "rgba(232,222,196,.86)"; TEAL = (44, 104, 113)

URL = "cycleforchange.org/week"

MARK = json.loads(subprocess.run(["node", "scripts/mark-2027.js"], cwd=ROOT, capture_output=True, text=True, check=True).stdout)
assert MARK["PINK"].upper() == PLATE, "the plate is the mark's pink (scripts/mark-2027.js)"


def esc(s):
    s = str(s)
    s = re.sub(r"(?<=\w)'(?=\w)", "’", s)
    s = s.replace("'", "’")
    return H.escape(s, quote=True)


def font_css():
    a = (SITE / "fonts" / "overpass-latin.woff2").as_uri(); b = (SITE / "fonts" / "overpass-latin-ext.woff2").as_uri()
    return (f'@font-face{{font-family:"Overpass";font-weight:100 900;src:url("{a}") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}}'
            f'@font-face{{font-family:"Overpass";font-weight:100 900;src:url("{b}") format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1E9F,U+2020,U+20A0-20AB,U+2113}}')


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
KEEP = set()
LEFT_OFF = []
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
            if o["allDay"]:
                continue
            why = "left off by hand" if r["slug"] in SKIP else (o.get("doubt") if r["slug"] not in KEEP else None)
            if why:
                LEFT_OFF.append((d["ymd"], r["name"].strip(), r["slug"], why))
                continue
            at = datetime.fromisoformat(o["at"].replace("Z", "+00:00")).astimezone(PHX)
            rows.append(dict(slug=r["slug"], time=clock(at), at=at.isoformat(), name=r["name"].strip(), kind=r.get("kind"),
                             line=LINE.get(r["name"].strip()) or " \u00b7 ".join([place(r)] + facts(r, o.get("full"))),
                             mine=MINE.get(r["slug"])))
        week.append(dict(ymd=d["ymd"], day=DAYS[wd], date=f"{MON[m-1]} {dd}", rows=rows))
    return week


# ---------------------------------------------------------------- the ground: crumpled paper, teal
def gauss(a, sigma):
    """A Gaussian blur in numpy (mirrored edges), so the tool needs nothing beyond numpy and Pillow."""
    r = max(1, int(4 * sigma + .5))
    k = np.exp(-(np.arange(-r, r + 1, dtype=np.float32) ** 2) / (2 * sigma * sigma)); k /= k.sum()
    for ax in (0, 1):
        n = a.shape[ax]
        p = np.pad(a, [(r, r) if i == ax else (0, 0) for i in range(a.ndim)], mode="symmetric")
        a = sum(k[i] * np.take(p, np.arange(i, i + n), axis=ax) for i in range(2 * r + 1))
    return a.astype(np.float32)


def ground(w, h, seed):
    """Crumpled paper: creases laid at random, lit from the top left. A new pattern for every seed."""
    p = CACHE / f"ground-{w}x{h}-{seed}.png"
    if p.exists():
        return p
    rng = np.random.default_rng(seed)
    s = 4  # work small, then scale up
    gw, gh = w // s, h // s
    yy, xx = np.mgrid[0:gh, 0:gw].astype(np.float32)
    hmap = np.zeros((gh, gw), np.float32)
    for _ in range(140):
        px, py = rng.uniform(-.1, 1.1) * gw, rng.uniform(-.1, 1.1) * gh
        a = rng.uniform(0, math.pi)
        nx, ny = math.cos(a), math.sin(a)
        d = (xx - px) * nx + (yy - py) * ny
        reach = rng.uniform(.25, .7) * max(gw, gh)
        fall = np.exp(-(((xx - px) ** 2 + (yy - py) ** 2) / (2 * reach ** 2)))
        hmap += rng.uniform(.4, 1.2) * -np.abs(d) / 40 * fall * rng.choice([-1, 1])
    hmap += gauss(rng.standard_normal((gh, gw)).astype(np.float32), 6) * 6
    hmap = gauss(hmap, .8)
    gy, gx = np.gradient(hmap)
    shade = np.clip(.5 + (gx * -.7 + gy * -.7) * 3.4, 0, 1)
    img = np.array(TEAL, np.float32)[None, None, :] * (.70 + .56 * shade[..., None])
    CACHE.mkdir(parents=True, exist_ok=True)
    Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).resize((w, h), Image.LANCZOS).save(p)
    return p


def robert():
    """Robert as a one-color print, cut out, to the waist. Made once by print.py and committed."""
    p = ASSETS / "print-robert-peace.png"
    assert p.exists(), "tools/week-kit/assets/print-robert-peace.png is missing (python3 tools/week-kit/print.py)"
    return p


def flag(w, h, seed=3, cell=58):
    """The checkered flag, waving: ink and paper."""
    p = CACHE / f"flag-{w}x{h}-{seed}.png"
    if p.exists():
        return p
    ss = 2
    W2, H2 = w * ss, h * ss
    yy, xx = np.mgrid[0:H2, 0:W2].astype(np.float32) / ss
    ang = math.radians(-24)
    u = xx * math.cos(ang) - yy * math.sin(ang)
    v = xx * math.sin(ang) + yy * math.cos(ang)
    lam, A = w * .55, cell * .9
    wave = A * np.sin(2 * math.pi * u / lam + 1.3)
    v2 = v - wave - h * .25
    band = (v2 > 0) & (v2 < cell * 4)
    cx = np.floor(u / cell); cy = np.floor(v2 / cell)
    dark = ((cx + cy) % 2) == 0
    shade = .82 + .18 * np.cos(2 * math.pi * u / lam + 1.3)
    rgb = np.where(dark[..., None], np.array([28, 26, 34]), np.array([244, 242, 237])).astype(np.float32) * shade[..., None]
    out = np.zeros((H2, W2, 4), np.uint8)
    out[..., :3] = np.clip(rgb, 0, 255)
    out[..., 3] = band.astype(np.uint8) * 255
    CACHE.mkdir(parents=True, exist_ok=True)
    Image.fromarray(out).resize((w, h), Image.LANCZOS).save(p)
    return p


# ---------------------------------------------------------------- hand lettering (drawn strokes, not a font)
def ell(cx, cy, rx, ry, n=22, a0=0, a1=2 * math.pi):
    return [(cx + rx * math.sin(a0 + (a1 - a0) * i / n), cy - ry * math.cos(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]


G = {  # skeletons on a 100-high box: (width, [strokes])
    "A": (78, [[(0, 100), (39, 0), (78, 100)], [(17, 64), (61, 64)]]),
    "D": (70, [[(0, 0), (0, 100)], [(0, 2), (30, 0), (56, 10), (70, 50), (56, 90), (30, 100), (0, 98)]]),
    "E": (60, [[(60, 2), (0, 0), (0, 100), (60, 98)], [(0, 50), (46, 50)]]),
    "F": (58, [[(58, 0), (0, 0), (0, 100)], [(0, 50), (44, 50)]]),
    "H": (70, [[(0, 0), (0, 100)], [(70, 0), (70, 100)], [(0, 52), (70, 50)]]),
    "I": (8, [[(4, 0), (4, 100)]]),
    "K": (66, [[(0, 0), (0, 100)], [(66, 0), (2, 62)], [(24, 44), (66, 100)]]),
    "M": (86, [[(0, 100), (2, 0), (43, 66), (84, 0), (86, 100)]]),
    "N": (70, [[(0, 100), (0, 0), (70, 100), (70, 0)]]),
    "O": (76, [ell(38, 50, 38, 50, 26)]),
    "R": (66, [[(0, 100), (0, 0), (34, 0), (56, 6), (64, 24), (56, 42), (34, 50), (0, 50)], [(30, 50), (66, 100)]]),
    "S": (64, [[(62, 14), (50, 3), (32, 0), (12, 5), (2, 20), (6, 36), (30, 48), (56, 58), (64, 76), (56, 94), (34, 100), (14, 96), (0, 84)]]),
    "T": (74, [[(0, 2), (74, 0)], [(37, 0), (37, 100)]]),
    "U": (68, [[(0, 0), (0, 70), (6, 90), (20, 100), (34, 100), (50, 100), (63, 90), (68, 70), (68, 0)]]),
    "V": (74, [[(0, 0), (37, 100), (74, 0)]]),
    "W": (106, [[(0, 0), (22, 100), (53, 28), (84, 100), (106, 0)]]),
    "Y": (74, [[(0, 0), (37, 50), (74, 0)], [(37, 50), (37, 100)]]),
    ".": (10, [[(5, 92), (5, 100)]]),
    " ": (34, []),
}


def smooth(pts, n=6):
    out = []
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        for k in range(n):
            out.append((x0 + (x1 - x0) * k / n, y0 + (y1 - y0) * k / n))
    return out + [pts[-1]]


def hand(word, width, height, seed, color=LETTER, sw=None, cond=.72):
    """A word in rough marker capitals that fills `width` at about `height`, drawn as wobbling strokes."""
    rng = random.Random(seed)
    gap = 16
    letters = [c for c in word.upper()]
    nat = sum(G[c][0] * cond for c in letters) + gap * (len(letters) - 1)
    k = height / 100
    sw = sw or height * .16
    width = width - sw * 2.6
    sx = min(1.0, width / (nat * k))  # squeeze sideways if the word is long
    paths, x = [], 0.0
    for c in letters:
        gw, strokes = G[c]
        rot = math.radians(rng.uniform(-3.5, 3.5)); sc = rng.uniform(.94, 1.06); dy = rng.uniform(-.035, .035) * height
        cxl = gw * cond / 2
        for st in strokes:
            P = []
            for (px, py) in smooth(st, 5):
                px = (px * cond - cxl) * sc; py = (py - 50) * sc
                qx = px * math.cos(rot) - py * math.sin(rot); qy = px * math.sin(rot) + py * math.cos(rot)
                X = (x + cxl + qx) * k * sx + rng.uniform(-.012, .012) * height
                Y = (50 + qy) * k + dy + rng.uniform(-.012, .012) * height
                P.append((X, Y))
            d = "M" + " L".join(f"{a:.1f} {b:.1f}" for a, b in P)
            paths.append(f'<path d="{d}" stroke-width="{sw:.1f}"/>')
            for _ in range(2):  # the brush's uneven edge: two thinner passes, nudged
                ox, oy = rng.uniform(-.24, .24) * sw, rng.uniform(-.24, .24) * sw
                d2 = "M" + " L".join(f"{a+ox:.1f} {b+oy:.1f}" for a, b in P)
                paths.append(f'<path d="{d2}" stroke-width="{sw*rng.uniform(.5,.7):.1f}"/>')
        x += gw * cond + gap
    vw = (x - gap) * k * sx
    fid = f"rough{seed}"
    return (f'<svg width="{vw + sw*2:.0f}" height="{height + sw*2:.0f}" viewBox="{-sw:.1f} {-sw:.1f} {vw + sw*2:.1f} {height + sw*2:.1f}" style="overflow:visible;display:block">'
            f'<defs><filter id="{fid}" x="-10%" y="-10%" width="120%" height="120%">'
            f'<feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="{seed}" result="n"/>'
            f'<feDisplacementMap in="SourceGraphic" in2="n" scale="{sw*.32:.1f}" xChannelSelector="R" yChannelSelector="G" result="d"/>'
            f'<feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="{seed+7}" result="g"/>'
            f'<feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -10 7.6" result="m"/>'
            f'<feComposite in="d" in2="m" operator="in"/></filter></defs>'
            f'<g fill="none" stroke="{color}" stroke-linecap="round" stroke-linejoin="round" filter="url(#{fid})">{"".join(paths)}</g></svg>')


# ---------------------------------------------------------------- pieces
GROUP = ('<svg viewBox="0 0 24 24" class="mk"><g fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'
         '<path d="M3.5 21 8.6 3M20.5 21 15.4 3"/><path d="M12 3v2.2M12 8.2v2.2" opacity=".55"/></g><g fill="currentColor">'
         '<circle cx="9.6" cy="17.2" r="1.8"/><circle cx="14.4" cy="17.2" r="1.8"/><circle cx="12" cy="13.2" r="1.5"/></g></svg>')

# the mark, stacked (cycle / for + the plate), for the square badge
STACK = (f'<svg viewBox="0 0 252 196" aria-hidden="true"><g fill="currentColor">{MARK["CYCLE_PATHS"]}'
         f'<g transform="translate(-261.7 112)">{MARK["FOR_PATHS"]}</g></g>'
         f'<path transform="translate(-261.7 112)" fill="{PLATE}" d="{MARK["PLATE_D"]}"/></svg>')

CSS = f"""
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{background:#000}}
body{{font-family:"Overpass",system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-kerning:normal;font-variant-numeric:lining-nums tabular-nums;color:{INK}}}
.s{{position:relative;overflow:hidden}}
.a{{position:absolute}}
.strip{{position:absolute;background:{PAPER};font-weight:900;letter-spacing:-.01em;line-height:1;white-space:nowrap;padding:.32em .5em .2em;
  clip-path:polygon(0 4%,22% 0,58% 3%,100% 0,99.4% 52%,100% 100%,64% 97%,30% 100%,0 96%,.6% 50%)}}
.tape{{position:absolute;background:{TAPE};clip-path:polygon(3% 0,97% 4%,100% 22%,96% 48%,100% 74%,97% 100%,3% 96%,0 78%,4% 50%,0 24%)}}
.card{{position:absolute;background:{PAPER};display:flex;flex-direction:column}}
.band{{background:{PLATE};color:{PAPER};display:flex;align-items:center;justify-content:center;gap:22px;font-weight:900;letter-spacing:-.01em;padding:.28em .4em .14em;line-height:1}}
.band .mk{{width:1em;height:1em;flex:0 0 auto;margin-top:-.12em}}
.rows{{--s:1;flex:1 1 auto;min-height:0;overflow:hidden;display:flex;flex-direction:column;padding:0 30px}}
.r{{display:grid;grid-template-columns:minmax(0,1fr) auto;column-gap:22px;align-items:baseline;
   padding:calc(18px * var(--s) * var(--p,1)) 0;border-bottom:3px solid rgba(194,85,127,.30)}}
.r:last-child{{border-bottom:0}}
.n{{font-size:calc(44px * var(--s));font-weight:800;line-height:1.04;letter-spacing:-.012em;text-wrap:balance}}
.t{{font-size:calc(44px * var(--s));font-weight:900;color:{PLATE};white-space:nowrap;letter-spacing:-.02em;line-height:1}}
.t small{{font-size:.62em;font-weight:800;margin-left:.12em}}
.l{{grid-column:1 / 3;white-space:nowrap;font-size:calc(27px * var(--s));font-weight:600;color:{GUN};line-height:1.2;margin-top:calc(6px * var(--s))}}
.mine{{display:inline-block;background:{PLATE};color:{PAPER};font-weight:900;font-size:calc(25px * var(--s));line-height:1;
   padding:.22em .36em .12em;transform:rotate(-2.5deg);margin-top:calc(10px * var(--s));border-radius:.07em}}
.badge{{position:absolute;background:{INK};display:flex;align-items:center;justify-content:center;border-radius:14px}}
.badge svg{{display:block;width:72%;height:auto;color:{PAPER}}}
"""

FIT = """<script>
document.fonts.load('800 40px Overpass').then(() => document.fonts.ready).then(() => {
  for (const e of document.querySelectorAll('[data-fitw]')) { const w = +e.dataset.fitw; let fs = parseFloat(getComputedStyle(e).fontSize);
    while (e.scrollWidth > w && fs > 18) { fs -= 1; e.style.fontSize = fs + 'px'; } }
  const fitLines = (root) => { for (const l of root.querySelectorAll('.l')) { l.style.fontSize = '';
      let fs = parseFloat(getComputedStyle(l).fontSize);
      while (l.scrollWidth > l.clientWidth && fs > 20) { fs -= .5; l.style.fontSize = fs + 'px'; }
      if (l.scrollWidth > l.clientWidth) { l.style.whiteSpace = 'normal'; } } };
  const used = (e) => e.lastElementChild ? e.lastElementChild.getBoundingClientRect().bottom - e.getBoundingClientRect().top : 0;
  const lines = (e) => [...e.querySelectorAll('.n')].map(n => Math.round(n.getBoundingClientRect().height / (parseFloat(getComputedStyle(n).fontSize) * 1.04))).join();
  for (const e of document.querySelectorAll('.rows')) {
    let s = 1; fitLines(e);
    while (used(e) > e.clientHeight + 1 && s > 0.6) { s -= 0.01; e.style.setProperty('--s', s.toFixed(2)); fitLines(e); }
    if (s === 1) { const base = lines(e);
      while (s < 1.14) { s += 0.01; e.style.setProperty('--s', s.toFixed(2)); fitLines(e);
        if (used(e) > e.clientHeight || lines(e) !== base) { s -= 0.01; e.style.setProperty('--s', s.toFixed(2)); fitLines(e); break; } }
      let q = 1; while (q < 2.2) { q += 0.02; e.style.setProperty('--p', q.toFixed(2)); if (used(e) > e.clientHeight) { q -= 0.02; e.style.setProperty('--p', q.toFixed(2)); break; } } }
    e.dataset.s = s.toFixed(2); if (used(e) > e.clientHeight + 1) e.dataset.over = '1';
  }
  document.body.dataset.ready = '1';
});
</script>"""


def nobreak(t):
    return re.sub(r"(\S+-\S+)", r'<span style="white-space:nowrap">\1</span>', t)


def strip(text, x, y, size, rot, z=6, extra=""):
    return f'<div class="strip" style="left:{x}px;top:{y}px;font-size:{size}px;transform:rotate({rot}deg);z-index:{z};{extra}">{text}</div>'


def tape(x, y, w, h, rot, z=9):
    return f'<div class="tape" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;transform:rotate({rot}deg);z-index:{z}"></div>'


def badge(x, y, size, rot=0, z=7):
    return f'<div class="badge" style="left:{x}px;top:{y}px;width:{size}px;height:{size}px;transform:rotate({rot}deg);z-index:{z}">{STACK}</div>'


def img(p, x, y, w, h=None, z=3, extra=""):
    hh = f"height:{h}px;" if h else ""
    return f'<img src="{pathlib.Path(p).as_uri()}" alt="" class="a" style="left:{x}px;top:{y}px;width:{w}px;{hh}z-index:{z};{extra}">'


def card(x, y, w, h, rot, band, rows_html, z=5, band_size=46):
    return (f'<div class="card" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;transform:rotate({rot}deg);z-index:{z}">'
            f'<div class="band" style="font-size:{band_size}px">{GROUP}<span>{band}</span>{GROUP}</div>'
            f'<div class="rows" style="padding-top:8px;padding-bottom:8px">{rows_html}</div></div>')


def ride_row(r):
    t, ap = r["time"].split(" ")
    mine = f'<div style="grid-column:1/3"><span class="mine">{esc(r["mine"])}</span></div>' if r.get("mine") else ""
    return (f'<div class="r"><div class="n">{nobreak(esc(r["name"]))}</div><div class="t">{t}<small>{ap}</small></div>'
            f'<div class="l">{esc(r["line"])}</div>{mine}</div>')


def count(n):
    return f"{n} ride" + ("" if n == 1 else "s")


def page(body, w, h):
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{font_css()}{CSS}</style></head>'
            f'<body style="width:{w}px;height:{h}px">{body}{FIT}</body></html>')


# ---------------------------------------------------------------- slides
def cover(days, total, span, story=False):
    h = SH if story else PH
    top = 236 if story else 34
    s = f'<div class="s" style="width:{W}px;height:{h}px;background:url({ground(W, h, 21 if story else 11).as_uri()})">'
    s += f'<div class="a" style="left:40px;top:{top}px;z-index:4">{hand("THIS WEEK", 1000, 190, 5)}</div>'
    y = top + 250
    s += strip(f"{total} group rides in the Valley. {span}.", 34, y, 46, -1.2)
    cy = y + 104
    rows = "".join(f'<div class="r"><div class="n">{d["day"]}<span style="font-weight:600;color:{GUN}">, {d["date"]}</span></div>'
                   f'<div class="t">{count(len(d["rows"]))}</div></div>' for d in days)
    ch = 900 if story else 690
    s += card(40, cy, 650, ch, -1.0, "The week", rows, band_size=44)
    s += tape(40 - 34, cy - 16, 150, 44, -30) + tape(650 - 70, cy - 8, 150, 44, 24)
    # Robert, the print, on the right, standing on the flag
    pw = 560 if story else 520
    ph_ = int(pw * (530 / 580))
    py = cy + (170 if story else 120)
    s += img(robert(), 1080 - pw + 30, py, pw, z=3)
    s += img(flag(560, 420), 1080 - 470, py + ph_ - 150, 560, z=2)
    s += badge(880, cy - 30, 160, 3) if story else badge(40, h - 196, 160, -3)
    fy = cy + ch + (60 if story else 36)
    if story:
        s += strip("Every ride, every day.", 40, fy, 44, -1, z=8)
        s += strip(f'<span style="color:{PAPER}">Tap the link.</span>', 74, fy + 82, 46, 1.2, z=8, extra=f"background:{PLATE}")
    else:
        s += strip("Find your day.", 236, h - 120, 52, 1.2, z=8)
    return s + "</div>"


def day_slide(d, note, rows, story=False, seed=0):
    h = SH if story else PH
    top = 236 if story else 34
    s = f'<div class="s" style="width:{W}px;height:{h}px;background:url({ground(W, h, 40 + seed).as_uri()})">'
    s += f'<div class="a" style="left:40px;top:{top}px;z-index:4">{hand(d["day"], 1000, 200, 100 + seed)}</div>'
    y = top + 258
    s += strip(f'{d["date"]}.' + (f" {note}" if note else ""), 34, y, 50, -1.4)
    cy = y + 106
    few = len(rows) <= 3
    cw = 640 if few else 1000
    bottom = (1540 - 120) if story else (h - 150)
    if few:
        ch = min(bottom - cy, 170 * len(rows) + 120 + (60 if any(r.get("mine") for r in rows) else 0))
    else:
        ch = bottom - cy
    s += card(40, cy, cw, ch, -.8 if seed % 2 else .7, count(len(rows)), "".join(ride_row(r) for r in rows))
    s += tape(40 - 30, cy - 18, 150, 44, -28) + tape(40 + cw - 110, cy - 14, 150, 44, 26)
    if few:  # room for the print and the flag
        s += img(robert(), 1080 - 470, cy + 40, 500, z=3)
        s += img(flag(560, 420), 1080 - 470, cy + 40 + 457 - 140, 560, z=2)
    if story:
        s += strip("Where they start, how fast, the route.", 40, 1540 - 92, 40, -1, z=8)
        s += strip(f'<span style="color:{PAPER}">Tap the link.</span>', 74, 1540 - 26, 44, 1.2, z=8, extra=f"background:{PLATE}")
        s += badge(870, 1540 - 100, 150, -3)
    else:
        s += strip(URL, 34, h - 112, 52, -1.0, z=8)
        s += badge(888, h - 176, 150, -3)
    return s + "</div>"


def end_card(story=False):
    h = SH if story else PH
    top = 236 if story else 34
    s = f'<div class="s" style="width:{W}px;height:{h}px;background:url({ground(W, h, 78 if story else 77).as_uri()})">'
    s += f'<div class="a" style="left:40px;top:{top}px;z-index:4">{hand("SAVE THIS.", 1000, 200, 9)}</div>'
    y = top + 258
    s += strip("Every ride has a page.", 34, y, 56, -1.4)
    cy = y + 116
    lines = "".join(f'<div class="r"><div class="n">{t}</div><div></div></div>' for t in ["Where it starts.", "How fast.", "If they wait.", "When we last checked."])
    s += card(40, cy, 600, 470, -1.0, "Every page", lines, band_size=44)
    s += tape(10, cy - 18, 150, 44, -28) + tape(560, cy - 10, 150, 44, 26)
    s += img(robert(), 1080 - 470, cy - 40, 500, z=3)
    s += img(flag(560, 420), 1080 - 470, cy - 40 + 457 - 140, 560, z=2)
    s += strip("cycleforchange.org", 34, cy + 520, 76, -1.2, z=8)
    s += strip(f'<span style="color:{PAPER}">/week</span>', 560, cy + 620, 96, 2.0, z=9, extra=f"background:{PLATE}")
    s += strip("Run a ride that’s not here? DM me.", 40, cy + 760, 38, -.6, z=8)
    s += badge(860, (1440 - 150) if story else (h - 210), 170, -3)
    return s + "</div>"


def parts(d, story=False, cap=9):
    """A day's slides as (note, rows). One, or two ("Early." before 7 am / "Less early.") when it's Saturday on the
    feed or the day runs past `cap` rows. If the 7 am line doesn't do it, even runs in start order: two keep the
    same two words, three or more are named by their first start."""
    rows = d["rows"]
    if not rows:
        return []
    if (d["day"] == "Saturday" and not story) or len(rows) > cap:
        early = [r for r in rows if r["at"][11:13] < "07"]
        late = [r for r in rows if r not in early]
        if early and late and max(len(early), len(late)) <= cap:
            return [("Early.", early), ("Less early.", late)]
        if len(rows) > cap:
            n = -(-len(rows) // cap)
            size = -(-len(rows) // n)
            runs = [rows[i:i + size] for i in range(0, len(rows), size)]
            if len(runs) == 2:
                return [("Early.", runs[0]), ("Less early.", runs[1])]
            return [(f'From {run[0]["time"]}.', run) for run in runs]
    return [(None, rows)]


def shoot(pg, body, h, png):
    """Load one slide, let it fit its rows, save it. Returns False when a card still can't hold its rows."""
    f = BUILD / "slide.html"; f.write_text(page(body, W, h))
    pg.set_viewport_size({"width": W, "height": h})
    pg.goto(f.as_uri()); pg.wait_for_function("document.body.dataset.ready === '1'", timeout=60000)
    over = pg.evaluate("[...document.querySelectorAll('.rows')].some(e => e.dataset.over)")
    pg.screenshot(path=str(png), clip={"x": 0, "y": 0, "width": W, "height": h})
    return not over


def day_shots(pg, di, d, story):
    """A day's slides, split further until every card holds its rows."""
    h = SH if story else PH
    for cap in (9, 7, 5, 4, 3):
        ps = parts(d, story, cap)
        shots, ok = [], True
        for pi, (note, rows) in enumerate(ps):
            png = CACHE / f"{'story' if story else 'post'}-{di}-{pi}.png"
            ok = shoot(pg, day_slide(d, note, rows, story=story, seed=(20 if story else 0) + 3 * di + pi), h, png) and ok
            shots.append((note, png))
        if ok:
            return shots
    raise SystemExit(f'{d["day"]}: the rows do not fit a slide')


def save(png, name):
    Image.open(png).convert("RGB").save(OUT / f"{name}.jpg", quality=93, subsampling=0, optimize=True)
    return f"{name}.jpg"


def make(days, total, span, stories=True):
    OUT.mkdir(parents=True, exist_ok=True); CACHE.mkdir(parents=True, exist_ok=True)
    for p in list(OUT.glob("post-*.jpg")) + list(OUT.glob("story-*.jpg")) + list(OUT.glob("wall-strip.png")):
        p.unlink()
    feed, story = [], []
    with sync_playwright() as pw:
        b = pw.chromium.launch(); pg = b.new_page()
        tmp = CACHE / "one.png"
        shoot(pg, cover(days, total, span), PH, tmp); feed.append(save(tmp, "post-01"))
        for di, d in enumerate(days):
            for note, png in day_shots(pg, di, d, False):
                feed.append(save(png, f"post-{len(feed) + 1:02d}"))
        shoot(pg, end_card(), PH, tmp); feed.append(save(tmp, f"post-{len(feed) + 1:02d}"))
        if stories:
            shoot(pg, cover(days, total, span, story=True), SH, tmp); story.append(save(tmp, "story-00-week"))
            for di, d in enumerate(days):
                for note, png in day_shots(pg, di, d, True):
                    slug = d["day"].lower() + ("-" + re.sub(r"[^a-z0-9]+", "-", note.lower()).strip("-") if note else "")
                    story.append(save(png, f"story-{len(story):02d}-{slug}"))
        b.close()
    return feed, story


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
    ap = argparse.ArgumentParser()
    now = datetime.now(PHX).date()
    ap.add_argument("--from", dest="start", default=(now + timedelta(days=(7 - now.weekday()) % 7)).isoformat())
    ap.add_argument("--skip", nargs="*", default=[])
    ap.add_argument("--keep", nargs="*", default=[])
    ap.add_argument("--no-stories", action="store_true")
    a = ap.parse_args()
    SKIP.update(a.skip); KEEP.update(a.keep)
    days = load(a.start)
    total = sum(1 for d in days for r in d["rows"] if r.get("kind") != "open-streets")
    feed, story = make(days, total, span_words(days), stories=not a.no_stories)
    print("feed:", " ".join(feed))
    if story:
        print("stories:", " ".join(story))
    (OUT / "caption.txt").write_text(caption(days, total))
    seen, lines = set(), []
    for ymd, name, slug, why in LEFT_OFF:
        if slug not in seen:
            seen.add(slug); lines.append(f"{name} ({slug}): {why}")
    (OUT / "left-off.txt").write_text(("\n".join(lines) + "\n") if lines else "Nothing left off.\n")
    print("left off:", "; ".join(lines) or "none")
    print(f"{total} group rides, {sum(len(d['rows']) for d in days)} rows; caption in {OUT / 'caption.txt'}")
