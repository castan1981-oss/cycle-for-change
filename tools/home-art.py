#!/usr/bin/env python3
"""Cycle for Change: the editorial homepage's drawn textures (Oct 26, 2026).

Robert and Cadence approved "rich but restrained custom graphics: grain/asphalt texture, distressed rose road
markings, subtle torn-paper treatments". Robert has called painted and grained textures "sloppy" before, so
this keeps them small and finished:

  img/home/asphalt-1.webp   a 240 px tile of fine aggregate, light specks on clear, for the dark fields only
                            (never over a photograph, never under small type at more than a whisper)
  img/home/lane-rose-2.svg    one strip of road-marking dashes in smeared rose (#A84C58), for light grounds: the edges
                              a little worn the way paint on a lane wears; drawn shapes, no filter, so they stay crisp
  img/home/lane-powder-2.svg  the same in powder rose (#D9B1AA), for dark grounds
  (-2, Oct 26: each dash centred in its cell, so a run bleeds evenly at both ends)
  TORN (printed)            a clip-path polygon for a torn edge; not used since the review (captions are plain)

  python3 tools/home-art.py        (Pillow + numpy). Same seed, same pictures; bump the file number on a change.
"""
import os, random
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "cfc-site", "img", "home")
os.makedirs(OUT, exist_ok=True)

# —— asphalt: sparse light specks of a few sizes, soft-edged, tileable ——
rng = np.random.default_rng(27)
N = 240
a = np.zeros((N, N), np.float32)
for _ in range(1300):
    x, y = rng.integers(0, N, 2)
    r = rng.choice([0.6, 0.8, 1.1, 1.5], p=[.5, .3, .15, .05])
    v = rng.uniform(.25, 1.0)
    for dx in range(-2, 3):
        for dy in range(-2, 3):
            d = (dx * dx + dy * dy) ** .5
            w = max(0.0, 1 - d / (r + .5))
            if w > 0:
                a[(y + dy) % N, (x + dx) % N] = max(a[(y + dy) % N, (x + dx) % N], v * w)
a += rng.normal(0, .035, a.shape).clip(0, None).astype(np.float32)   # a fine tooth under the specks
alpha = (a.clip(0, 1) * 255 * .55).astype(np.uint8)
rgba = np.dstack([np.full((N, N), 239, np.uint8), np.full((N, N), 237, np.uint8), np.full((N, N), 234, np.uint8), alpha])
Image.fromarray(rgba, "RGBA").save(os.path.join(OUT, "asphalt-1.webp"), "WEBP", quality=80, method=6)

# —— lane paint: 10 dashes on a 1200 x 24 strip, each a little different, worn at the ends and the edges ——
random.seed(11)
def dash(x0, length, h=12, y0=6):
    pts = []
    steps = max(8, int(length / 9))
    for i in range(steps + 1):                       # top edge, left to right
        x = x0 + length * i / steps
        pts.append((x, y0 + random.uniform(-.35, .55)))
    for j in range(1, 4):                            # the right end, worn: a soft, uneven stop
        pts.append((x0 + length + random.uniform(-2.2, .6), y0 + h * j / 4 + random.uniform(-.4, .4)))
    for i in range(steps, -1, -1):                   # bottom edge, right to left
        x = x0 + length * i / steps
        pts.append((x, y0 + h + random.uniform(-.55, .35)))
    for j in range(3, 0, -1):                        # the left end
        pts.append((x0 + random.uniform(-.6, 2.0), y0 + h * j / 4 + random.uniform(-.4, .4)))
    d = "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + "Z"
    # two or three worn spots where the tyres cross: small bites, never holes through the middle
    bites = ""
    for _ in range(random.randint(1, 3)):
        bx = x0 + random.uniform(.15, .85) * length; top = random.random() < .5
        by = y0 + (0 if top else h); s = random.uniform(1.2, 2.4)
        bites += f"M{bx - s:.1f} {by:.1f} Q{bx:.1f} {by + (s if top else -s):.1f} {bx + s:.1f} {by:.1f}Z"
    return d, bites
def lane(fill):
    body, cuts = [], []
    x = 0.0
    for _ in range(10):
        L = random.uniform(66, 78)
        d, b = dash(x + (120 - L) / 2, L)          # centred in its 120-unit cell, so a run bleeds evenly at both ends
        body.append(d); cuts.append(b)
        x += 120
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 24" width="1200" height="24" preserveAspectRatio="none">'
            f'<defs><mask id="w"><rect width="1200" height="24" fill="#fff"/><path d="{"".join(cuts)}" fill="#000"/></mask></defs>'
            f'<path d="{"".join(body)}" fill="{fill}" mask="url(#w)"/></svg>\n')
for name, fill in (("lane-rose-2.svg", "#A84C58"), ("lane-powder-2.svg", "#D9B1AA")):
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
