#!/usr/bin/env python3
"""Robert as a one-color print for the weekly ride slides: cut out of his photo, cropped to the waist, printed in
bruise ink (solid darks, a horizontal line screen for the middle tones). Writes tools/week-kit/assets/print-<key>.png,
which is committed, so the Monday run never needs this script.

    pip install "rembg[cpu]"        # downloads the u2net_human_seg model on first use
    python3 tools/week-kit/print.py [key] [x0 y0 x1 y1]

Run it only when the photo changes. The photo is a registry photo (cfc-site/img/ph/<key>-2.jpg): only Robert, no cars.
Nothing in it is redrawn: the cut-out is his own outline and the print is his own tones.
"""
import pathlib, sys
import numpy as np
from PIL import Image

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parent.parent / "cfc-site"
KEY = sys.argv[1] if len(sys.argv) > 1 else "robert-peace"
CROP = tuple(map(int, sys.argv[2:6])) if len(sys.argv) >= 6 else (380, 270, 960, 785)
INK = (28, 26, 34)

if __name__ == "__main__":
    from rembg import remove, new_session
    im = Image.open(SITE / f"img/ph/{KEY}-2.jpg").convert("RGB")
    cut = remove(im, session=new_session("u2net_human_seg")).crop(CROP)
    a = np.asarray(cut).astype(np.float32) / 255
    lum = .3 * a[..., 0] + .59 * a[..., 1] + .11 * a[..., 2]
    alpha = a[..., 3]
    lo, hi = np.percentile(lum[alpha > .5], [4, 96])
    t = np.clip((lum - lo) / (hi - lo), 0, 1)
    yy = np.arange(t.shape[0])[:, None]
    screen = (yy % 7) / 7.0
    ink = (t < .26) | ((t < .60) & (screen > (t - .26) / .34))
    out = np.zeros((*t.shape, 4), np.uint8)
    out[..., :3] = np.array(INK, np.uint8)
    out[..., 3] = (ink & (alpha > .5)).astype(np.uint8) * 255
    p = HERE / "assets" / f"print-{KEY}.png"
    p.parent.mkdir(exist_ok=True)
    Image.fromarray(out).save(p, optimize=True)
    print(p, out.shape[1], "x", out.shape[0], f"{p.stat().st_size} bytes")
