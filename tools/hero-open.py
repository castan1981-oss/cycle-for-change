#!/usr/bin/env python3
"""Cycle for Change: the tiles for the homepage hero's opening (Nov 11, 2026).

Robert sent a reel (tiles of his rides flicking through on black, then the mile count running up on a pink card) and
asked for "something like this" on the homepage: no play button, nothing that looks like a video, blended into the hero.
So the opening is not a film. It is his photos, drawn by the page on the hero's own ground, and the count is the page's
live count. This writes the photos it uses:

  python3 tools/hero-open.py            every tile in data/hero-open.json -> cfc-site/img/home/open/<id>-<n>.webp
  python3 tools/hero-open.py --sheet    also a contact sheet (scratch, never committed) to look at each tile 1:1

Each tile is a plain resize of a registry photo's CLEARED copy (cfc-site/img/ph/<key>-2.jpg: already looked at 1:1 for
cars and faces, and already cropped where a crop was what cleared it), never the original in cfc-site/photos/. A tile
that is shown as a wide band ("crop" in the JSON) is cut from that copy first, a plain crop, never extended. Clean:
no grade, no grain, a light unsharp like tools/grade.py. WebP only (the page asks for these from a script, after it has
decided the opening will run; a browser without WebP skips the opening and shows the hero). A changed tile gets a new
number: bump "n" in the JSON, run this, run node scripts/build-home.js, and delete the old files.

Needs Pillow.
"""
import json, os, sys
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPEC = os.path.join(ROOT, "data", "hero-open.json")
SRC = os.path.join(ROOT, "cfc-site", "img", "ph")
OUT = os.path.join(ROOT, "cfc-site", "img", "home", "open")
PH_V = 2          # the registry's served file number (scripts/photos.js `V`)
QUALITY = 60       # a tile is on screen for under half a second; the card's photo carries its own "q"


def tile(photo, px, crop=None):
    """The cleared copy (or a plain crop of it: fractions left, top, right, bottom), its long side brought down to `px`
    (never up), lightly sharpened."""
    im = Image.open(os.path.join(SRC, f"{photo}-{PH_V}.jpg")).convert("RGB")
    if crop:
        im = im.crop((round(crop[0] * im.width), round(crop[1] * im.height), round(crop[2] * im.width), round(crop[3] * im.height)))
    f = px / max(im.size)
    if f < 1:
        im = im.resize((round(im.width * f), round(im.height * f)), Image.LANCZOS)
        im = im.filter(ImageFilter.UnsharpMask(radius=0.6, percent=35, threshold=2))
    return im


def main():
    spec = json.load(open(SPEC, encoding="utf8"))
    n = spec["n"]
    os.makedirs(OUT, exist_ok=True)
    made, total = [], 0
    for t in spec["tiles"] + [spec["card"]]:
        im = tile(t["photo"], t["px"], t.get("crop"))
        dst = os.path.join(OUT, f"{t['id']}-{n}.webp")
        im.save(dst, "WEBP", quality=t.get("q", QUALITY), method=6)
        size = os.path.getsize(dst)
        total += size
        made.append((t["id"], t["photo"], im, size))
        print(f"  {os.path.relpath(dst, ROOT)}  {im.width}x{im.height}  {size / 1024:.1f} KB  <- {t['photo']}")
    print(f"{len(made)} tiles, {total / 1024:.0f} KB in all")
    if "--sheet" in sys.argv:
        pad, h = 12, 720
        ims = [im.resize((round(im.width * h / im.height), h), Image.LANCZOS) for _, _, im, _ in made]
        sheet = Image.new("RGB", (sum(i.width for i in ims) + pad * (len(ims) + 1), h + 2 * pad), (20, 18, 24))
        x = pad
        for i in ims:
            sheet.paste(i, (x, pad)); x += i.width + pad
        dst = os.path.join(ROOT, "tools", ".hero-open-sheet.jpg")
        sheet.save(dst, quality=90)
        print("sheet:", os.path.relpath(dst, ROOT), "(scratch: do not commit)")


if __name__ == "__main__":
    main()
