#!/usr/bin/env python3
"""Cycle for Change: the editorial homepage's drawn textures (Oct 26, 2026).

Robert and Cadence approved "rich but restrained custom graphics: grain/asphalt texture, distressed rose road
markings, subtle torn-paper treatments". Robert has called painted and grained textures "sloppy" before, so
this keeps them small and finished:

  img/home/asphalt-2.webp   a 480 px tile of fine aggregate (shown at 240 css px), light stones on clear, for the two
                            dark rooms only (never over a photograph, never under small type at more than a whisper)
  img/home/lane-rose-3.svg    a lane line in smeared rose (#A84C58), for light grounds: long dashes, the ends and edges
                              a little worn the way paint on a lane wears; drawn shapes, no filter, so they stay crisp
  img/home/lane-powder-3.svg  the same in powder rose (#D9B1AA), for dark grounds
  (-3, Oct 27: the -2 dashes were short and read as a perforated divider; -2 asphalt: the 1x tile blurred on phones)
  TORN (printed)            a clip-path polygon for a torn edge; not used since the review (captions are plain)

  python3 tools/home-art.py        (Pillow + numpy). Same seed, same pictures; bump the file number on a change.
"""
import os, random
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "cfc-site", "img", "home")
os.makedirs(OUT, exist_ok=True)

# —— asphalt (-2, v3): a 480 px tile shown at 240 css px, so the grain stays sharp on a 2x or 3x phone: dense, small
#    stones of a few sizes and a fine tooth, the way a sealed road reads up close (the -1 tile was sparse and read as dust)
rng = np.random.default_rng(27)
N = 480
a = np.zeros((N, N), np.float32)
for _ in range(9000):
    x, y = rng.integers(0, N, 2)
    r = rng.choice([0.5, 0.8, 1.1, 1.6], p=[.45, .33, .17, .05])
    v = rng.uniform(.18, .85)
    for dx in range(-2, 3):
        for dy in range(-2, 3):
            d = (dx * dx + dy * dy) ** .5
            w = max(0.0, 1 - d / (r + .45))
            if w > 0:
                a[(y + dy) % N, (x + dx) % N] = max(a[(y + dy) % N, (x + dx) % N], v * w)
a += rng.normal(0, .05, a.shape).clip(0, None).astype(np.float32)   # the fine tooth between the stones
alpha = (a.clip(0, 1) * 255 * .5).astype(np.uint8)
rgba = np.dstack([np.full((N, N), 239, np.uint8), np.full((N, N), 237, np.uint8), np.full((N, N), 234, np.uint8), alpha])
Image.fromarray(rgba, "RGBA").save(os.path.join(OUT, "asphalt-2.webp"), "WEBP", quality=70, alpha_quality=40, method=6)

# —— lane paint (-3, v3): a lane line's proportions, long dashes and longer gaps (about 30:1 dash to width, the way a
#    centre line reads from the saddle), three to a 1200 x 12 strip, worn at the ends and nicked at the edges ——
random.seed(11)
def dash(x0, length, h=8, y0=2):
    pts = []
    steps = max(10, int(length / 12))
    for i in range(steps + 1):                       # top edge, left to right
        x = x0 + length * i / steps
        pts.append((x, y0 + random.uniform(-.25, .4)))
    for j in range(1, 4):                            # the right end, worn: a soft, uneven stop
        pts.append((x0 + length + random.uniform(-3.5, .8), y0 + h * j / 4 + random.uniform(-.3, .3)))
    for i in range(steps, -1, -1):                   # bottom edge, right to left
        x = x0 + length * i / steps
        pts.append((x, y0 + h + random.uniform(-.4, .25)))
    for j in range(3, 0, -1):                        # the left end
        pts.append((x0 + random.uniform(-.8, 3.2), y0 + h * j / 4 + random.uniform(-.3, .3)))
    d = "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + "Z"
    bites = ""                                       # where the tyres cross: small nicks at the edges, never holes
    for _ in range(random.randint(2, 4)):
        bx = x0 + random.uniform(.1, .9) * length; top = random.random() < .5
        by = y0 + (0 if top else h); sz = random.uniform(.9, 1.8)
        bites += f"M{bx - sz * 1.6:.1f} {by:.1f} Q{bx:.1f} {by + (sz if top else -sz):.1f} {bx + sz * 1.6:.1f} {by:.1f}Z"
    return d, bites
def lane(fill):
    body, cuts = [], []
    x = 0.0
    for _ in range(3):
        L = random.uniform(240, 262)
        d, b = dash(x + (400 - L) / 2, L)            # centred in its 400-unit cell, so a run ends evenly at both sides
        body.append(d); cuts.append(b)
        x += 400
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 12" width="1200" height="12" preserveAspectRatio="none">'
            f'<defs><mask id="w"><rect width="1200" height="12" fill="#fff"/><path d="{"".join(cuts)}" fill="#000"/></mask></defs>'
            f'<path d="{"".join(body)}" fill="{fill}" mask="url(#w)"/></svg>\n')
for name, fill in (("lane-rose-3.svg", "#A84C58"), ("lane-powder-3.svg", "#D9B1AA")):
    random.seed(11)
    open(os.path.join(OUT, name), "w").write(lane(fill))

# —— the torn edge: a polygon for clip-path, flat on top, torn along the bottom (y in px from the bottom) ——
random.seed(5)
pts = ["0 0", "100% 0"]
x = 100.0
while x > 0:
    x -= random.uniform(1.6, 4.2)
    pts.append(f"{max(x, 0):.1f}% calc(100% - {random.uniform(0, 6):.1f}px)")
print("TORN polygon(" + ",".join(pts) + ")")
for f in sorted(os.listdir(OUT)):
    print(f, os.path.getsize(os.path.join(OUT, f)), "bytes")
