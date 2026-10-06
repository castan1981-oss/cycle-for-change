#!/usr/bin/env python3
"""The screenprint (Pass 27, Oct 6 2026; softened Oct 5 evening, Pass 27b).

Four inks from the After Hours palette — bruise, drained pool, patina, plaster — with powder rose as
the spot ink pulled a couple of pixels off register, and a fine paper grain. Used ONCE on the site:
the homepage sign's photograph. Never on a second photo (the brand panel's rule: one print, signed).

Pass 27b: the first cut posterised every pixel into one of four inks with heavy noise, a 5px
misregister and coarse grain, and read as low resolution on a phone. Now the tone runs smoothly
through the four inks (a continuous gradient map, with `--crunch` keeping a little of the stepped
print feel), the rose spot has a soft edge, the misregister is 2px, the grain is fine and light,
and the files are cut at the source's full width so nothing is upscaled on a 3x phone.

    python3 tools/print.py cfc-site/img/hero-wide.jpg cfc-site/img/sign-print.jpg --width 2000 --warmth .10
    python3 tools/print.py cfc-site/img/hero-wide.jpg cfc-site/img/sign-print-phone.jpg --width 1400 --warmth .10
    python3 tools/print.py <in> <out> --width 1200 --warmth .16 --crunch .25 --grain .05

Deterministic (seeded) so a rebuild gives the same file.
"""
import argparse
import numpy as np
from PIL import Image, ImageOps, ImageChops, ImageEnhance, ImageFilter

PAL = {"bruise": (28, 26, 34), "pool": (44, 79, 85), "patina": (169, 189, 184), "plaster": (239, 237, 234), "rose": (217, 177, 170)}
STOPS = (0.0, 0.36, 0.70, 1.0)  # where each ink sits on the tone scale: bruise, pool, patina, plaster


def gradient_map(tone, stops=STOPS):
    """Continuous four-ink map: every tone is a blend of its two neighbouring inks."""
    inks = np.array([PAL["bruise"], PAL["pool"], PAL["patina"], PAL["plaster"]], np.float32) / 255
    out = np.empty(tone.shape + (3,), np.float32)
    for c in range(3):
        out[..., c] = np.interp(tone, stops, inks[:, c])
    return out


def print_image(path, width, crunch=0.25, shift=(2, 1), warmth=0.16, grain=0.05, seed=7, contrast=1.15):
    rng = np.random.default_rng(seed)
    im = ImageOps.exif_transpose(Image.open(path).convert("RGB"))
    if width < im.width:
        im = im.resize((width, int(im.height * width / im.width)), Image.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    g = ImageOps.autocontrast(ImageOps.grayscale(im), cutoff=1)
    g = ImageEnhance.Contrast(g).enhance(contrast)
    tone = np.asarray(g).astype(np.float32) / 255
    H, W = tone.shape
    # the print feel: a little of the tone is stepped to the nearest ink, most of it runs smooth
    stepped = np.array(STOPS)[np.abs(tone[..., None] - np.array(STOPS)).argmin(-1)]
    tone = tone * (1 - crunch) + stepped * crunch
    out = gradient_map(tone)
    # the rose spot: the warm channel of the photo, soft-edged, pulled a touch off register
    arr = np.asarray(im).astype(np.float32) / 255
    warm = np.clip(((arr[..., 0] - arr[..., 2]) - warmth) * 3.2, 0, 1)
    warm = np.asarray(Image.fromarray((warm * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.5))).astype(np.float32) / 255
    warm = np.roll(np.roll(warm, shift[1], 0), shift[0], 1)
    light = np.clip((tone - 0.5) * 3, 0, 1)  # the spot only takes on the lighter inks
    spot = (warm * light)[..., None]
    out = out * (1 - spot) + (np.array(PAL["rose"], np.float32) / 255) * spot
    img = Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8))
    # fine, light paper grain
    gr = Image.fromarray((rng.random((H, W)) * 255).astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(0.5))
    lo = int(255 * (1 - grain))
    gr = ImageOps.autocontrast(gr).point(lambda v: lo + v * (255 - lo) // 255)
    return ImageChops.multiply(img, Image.merge("RGB", (gr, gr, gr)))


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("src"); p.add_argument("out")
    p.add_argument("--width", type=int, default=2000)
    p.add_argument("--warmth", type=float, default=0.10)
    p.add_argument("--crunch", type=float, default=0.25)
    p.add_argument("--grain", type=float, default=0.05)
    p.add_argument("--quality", type=int, default=82)
    a = p.parse_args()
    img = print_image(a.src, a.width, crunch=a.crunch, warmth=a.warmth, grain=a.grain)
    img.save(a.out, quality=a.quality, optimize=True, progressive=True)
    print("wrote", a.out, img.size)
