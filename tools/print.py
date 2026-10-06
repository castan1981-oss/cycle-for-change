#!/usr/bin/env python3
"""The screenprint (Pass 27, Oct 6 2026).

Four inks from the After Hours palette — bruise, drained pool, patina, plaster — plus powder rose as
the spot ink pulled a few pixels off register, paper grain over the top. Used ONCE on the site: the
homepage sign's photograph. Never on a second photo (the brand panel's rule: one print, signed).

    python3 tools/print.py cfc-site/img/hero-wide.jpg cfc-site/img/sign-print.jpg --width 1800
    python3 tools/print.py <in> <out> --width 1200 --warmth .16 --ths .3 .5 .74

Deterministic (seeded) so a rebuild gives the same file.
"""
import argparse
import numpy as np
from PIL import Image, ImageOps, ImageChops, ImageEnhance

PAL = {"bruise": (28, 26, 34), "pool": (44, 79, 85), "patina": (169, 189, 184), "plaster": (239, 237, 234), "rose": (217, 177, 170)}


def print_image(path, width, ths=(0.30, 0.50, 0.74), shift=(5, 3), warmth=0.16, seed=7, quality=80):
    rng = np.random.default_rng(seed)
    im = ImageOps.exif_transpose(Image.open(path).convert("RGB"))
    im = im.resize((width, int(im.height * width / im.width)), Image.LANCZOS)
    g = ImageOps.autocontrast(ImageOps.grayscale(im), cutoff=2)
    g = ImageEnhance.Contrast(g).enhance(1.3)
    a = np.asarray(g).astype(np.float32) / 255
    H, W = a.shape
    noise = rng.random((H, W))
    out = np.zeros((H, W, 3), np.float32) + np.array(PAL["plaster"]) / 255
    for name, th in zip(("patina", "pool", "bruise"), ths[::-1]):
        out[(a + (noise - 0.5) * 0.16) < th] = np.array(PAL[name]) / 255
    arr = np.asarray(im).astype(np.float32) / 255
    warm = np.clip(((arr[..., 0] - arr[..., 2]) - warmth) * 4, 0, 1)
    spot = (warm + (rng.random((H, W)) - 0.5) * 0.2) > 0.5
    spot = np.roll(np.roll(spot, shift[1], 0), shift[0], 1)
    light = np.all(np.abs(out - np.array(PAL["plaster"]) / 255) < 0.01, axis=2) | np.all(np.abs(out - np.array(PAL["patina"]) / 255) < 0.01, axis=2)
    out[spot & light] = np.array(PAL["rose"]) / 255
    img = Image.fromarray((out * 255).astype(np.uint8))
    grain = Image.fromarray((rng.random((H, W)) * 255).astype(np.uint8), "L").filter(__import__("PIL.ImageFilter", fromlist=["GaussianBlur"]).GaussianBlur(0.6))
    grain = ImageOps.autocontrast(grain).point(lambda v: 225 + v * 30 // 255)
    return ImageChops.multiply(img, Image.merge("RGB", (grain, grain, grain)))


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("src"); p.add_argument("out")
    p.add_argument("--width", type=int, default=1800)
    p.add_argument("--warmth", type=float, default=0.16)
    p.add_argument("--ths", type=float, nargs=3, default=(0.30, 0.50, 0.74))
    p.add_argument("--quality", type=int, default=80)
    a = p.parse_args()
    img = print_image(a.src, a.width, tuple(a.ths), warmth=a.warmth, quality=a.quality)
    img.save(a.out, quality=a.quality, optimize=True, progressive=True)
    print("wrote", a.out, img.size)
