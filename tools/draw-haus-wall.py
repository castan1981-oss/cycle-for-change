#!/usr/bin/env python3
"""
draw-haus-wall.py — the build wall at the top of the Friday Shop Ride page (Oct 9, 2026).

Six builds off the Bicycle Haüs Instagram, drawn as clean line art (no logos, no paint jobs copied):
side views on a shop floor line, each with its name under it. One stroke weight, round caps,
currentColor, so the page sets the color. Writes cfc-site/rides/art/haus-wall-1.svg.

    python3 tools/draw-haus-wall.py
"""
import math, os

OUT = os.path.join(os.path.dirname(__file__), "..", "cfc-site", "rides", "art", "haus-wall-1.svg")
W, H = 1600, 300
FLOOR = 228          # the shop floor line
S = 1.45             # units -> px (1 unit ~ 1 cm)


def P(x, y):
    return f"{x:.1f},{y:.1f}"


class Pen:
    def __init__(self, ox, oy, s=S, flip=False):
        self.ox, self.oy, self.s, self.flip = ox, oy, s, flip
        self.out = []

    def pt(self, x, y):
        return (self.ox + x * self.s, self.oy + y * self.s)

    def line(self, *pts, cls=""):
        d = "M" + " L".join(P(*self.pt(x, y)) for x, y in pts)
        self.out.append(f'<path d="{d}"{cls}/>')

    def circle(self, x, y, r, cls=""):
        cx, cy = self.pt(x, y)
        self.out.append(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r * self.s:.1f}"{cls}/>')

    def raw(self, d, cls=""):
        # d in local units: a list of ("M"|"L"|"Q", x, y[, x2, y2])
        parts = []
        for seg in d:
            if seg[0] == "Q":
                parts.append("Q" + P(*self.pt(seg[1], seg[2])) + " " + P(*self.pt(seg[3], seg[4])))
            else:
                parts.append(seg[0] + P(*self.pt(seg[1], seg[2])))
        self.out.append(f'<path d="{" ".join(parts)}"{cls}/>')


THIN = ' class="t"'


def wheel(p, x, r, depth, tire=2.4, spokes=0):
    p.circle(x, 0, r)                      # tire outside
    p.circle(x, 0, r - tire, THIN)         # tire / rim line
    if depth:
        p.circle(x, 0, r - tire - depth, THIN)   # deep rim
    p.circle(x, 0, 1.6)                    # hub
    for i in range(spokes):
        a = i * math.pi * 2 / spokes
        rr = r - tire - (depth or 1)
        p.line((x + 1.6 * math.cos(a), 1.6 * math.sin(a)), (x + rr * math.cos(a + .35), rr * math.sin(a + .35)), cls=THIN)


def drive(p, bb, rear):
    p.circle(bb[0], bb[1], 6.5, THIN)      # chainring
    p.line(bb, (bb[0] + 5, bb[1] + 15))    # crank
    p.line((bb[0] + 2, bb[1] + 15), (bb[0] + 9, bb[1] + 15))   # pedal
    p.line((bb[0], bb[1] - 6.5), (rear[0] + 2, -3.5), cls=THIN)  # chain, top
    p.line((bb[0], bb[1] + 6.5), (rear[0] + 2, 3.5), cls=THIN)   # chain, bottom
    p.circle(rear[0], 0, 4, THIN)          # cassette


def road(p, deep=0, gravel=False, classic=False, frame_only=False):
    R = 34.5 if gravel else 33.5
    A, F = (0, 0), (100, 0)
    BB = (41, 7)
    S_ = (31, -51)
    Ht = (80, -49) if not classic else (80, -51)
    Hb = (83.5, -35)
    if not frame_only:
        wheel(p, A[0], R, deep, tire=3.6 if gravel else 2.2)
        wheel(p, F[0], R, deep, tire=3.6 if gravel else 2.2)
    p.line(BB, S_)                                   # seat tube
    p.line(S_, Ht)                                   # top tube
    p.line(BB, Hb)                                   # down tube
    p.line(Ht, Hb)                                   # head tube
    p.line(BB, A)                                    # chainstay
    stay = (33, -40) if not classic else (32, -48)
    p.line(stay, A)                                  # seatstay
    p.line(Hb, (98.5, -5), F)                        # fork, a little rake
    # seatpost + saddle
    p.line(S_, (29, -59))
    p.line((21, -60.5), (36, -60))
    if frame_only:
        return
    drive(p, BB, A)
    # stem + bar
    p.line(Ht, (Ht[0] + 1, Ht[1] - 3), (Ht[0] + 9, Ht[1] - 4))
    bx, by = Ht[0] + 9, Ht[1] - 4
    if gravel:   # flared drop
        p.raw([("M", bx, by), ("Q", bx + 6, by, bx + 7, by + 6), ("Q", bx + 8, by + 12, bx + 2, by + 13)])
    else:
        p.raw([("M", bx, by), ("Q", bx + 6, by, bx + 6, by + 6), ("Q", bx + 6, by + 11, bx + 1, by + 11)])
    p.line((bx + 1, by + 1), (bx + 3, by + 6), cls=THIN)        # hood


def mtb(p):
    R = 37
    A, F = (0, 0), (116, 0)
    BB = (45, -1)
    S_ = (36, -48)
    Ht = (91, -55)
    Hb = (95, -41)
    wheel(p, A[0], R, 0, tire=5)
    wheel(p, F[0], R, 0, tire=5)
    p.line(BB, S_)
    p.line((38, -38), Ht)                            # sloping top tube into the seat tube
    p.line(BB, Hb)
    p.line(Ht, Hb)
    p.line(BB, A)
    p.line((30, -28), A)                             # seatstay
    p.line((38, -30), (30, -28), cls=THIN)           # rear shock link
    # suspension fork: stanchion + lower
    p.line(Hb, (101, -24))
    p.line((100.5, -26), (116, 0))
    p.line((99, -25), (103.5, -23.5), cls=THIN)
    p.line(S_, (34, -62))                            # dropper
    p.line((26, -63), (41, -62.5))
    drive(p, BB, A)
    p.line(Ht, (Ht[0] + 2, Ht[1] - 5))
    p.line((Ht[0] - 6, Ht[1] - 6), (Ht[0] + 12, Ht[1] - 4.5))   # flat bar


def stand(p):
    # the frame on a work stand: the clamp holds the seatpost from behind, the pole and tripod sit back
    p.line((28.5, -57), (14, -60))                   # clamp arm
    p.line((12, -63), (12, -57), cls=THIN)           # clamp jaw
    p.line((14, -60), (14, 21))                      # pole
    p.line((14, 21), (0, 30), cls=THIN)
    p.line((14, 21), (28, 30), cls=THIN)
    p.line((14, 21), (14, 30), cls=THIN)


BUILDS = [
    # (kind, name, sub)
    ("gravel", "S-Works Crux 5 LTD", "32 of 55. Mine."),
    ("aero", "ENVE Melee V2", "Built in the stand"),
    ("paint", "Custom paint gravel", "Tan walls, every color"),
    ("frame", "Green S-Works frame", "Bare, before the build"),
    ("mtb", "Specialized Epic 9", "Full suspension"),
    ("classic", "Colnago V5Rs", "Demo day bike"),
]


def draw():
    body = []
    n = len(BUILDS)
    slot = W / n
    for i, (kind, name, sub) in enumerate(BUILDS):
        cx = slot * i + slot / 2
        width = (116 + 74) * S if kind == "mtb" else (100 + 68) * S
        ox = cx - width / 2 + 34 * S
        rr = 37 if kind == "mtb" else 34.5 if kind in ("gravel", "paint") else 33.5
        oy = FLOOR - rr * S                       # wheels sit on the floor
        if kind == "frame":
            oy = FLOOR - 30 * S                   # the stand's feet on the floor
        p = Pen(ox, oy)
        if kind == "gravel" or kind == "paint":
            road(p, deep=6 if kind == "gravel" else 0, gravel=True)
        elif kind == "aero":
            road(p, deep=9)
        elif kind == "classic":
            road(p, deep=4, classic=True)
        elif kind == "frame":
            road(p, frame_only=True)
            stand(p)
        elif kind == "mtb":
            mtb(p)
        mine = ' class="mine"' if "Mine" in sub else ""
        body.append(f'<g{mine}>' + "".join(p.out) + "</g>")
        body.append(f'<text x="{cx:.0f}" y="{FLOOR + 30}" class="n">{name}</text>')
        body.append(f'<text x="{cx:.0f}" y="{FLOOR + 50}" class="s">{sub}</text>')
    floor = f'<path class="t" d="M0,{FLOOR} H{W}"/>'
    style = (".w path,.w circle{fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}"
             ".w .t{stroke-width:1}"
             ".w .mine path,.w .mine circle{stroke-width:2.2}"
             ".w text{fill:currentColor;text-anchor:middle;font-family:Overpass,system-ui,sans-serif}"
             ".w .n{font-size:15px;font-weight:700}.w .s{font-size:13px;font-weight:500;opacity:.8}")
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 70 {W} 215" class="w" role="img" '
           f'aria-label="Six builds from the Bicycle Haüs Instagram, drawn as line art on a shop floor: '
           + ", ".join(b[1] for b in BUILDS) + '.">'
           f"<style>{style}</style>{floor}{''.join(body)}</svg>\n")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(svg)
    print("wrote", os.path.relpath(OUT))


if __name__ == "__main__":
    draw()
