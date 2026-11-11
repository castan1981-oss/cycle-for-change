#!/usr/bin/env python3
"""Cycle for Change: the files that carry the mark with no page around them (Nov 11, 2026).

  cfc-site/favicon.svg        the stacked mark (cycle / for + the pink plate) on a bruise square
  cfc-site/favicon-180.png    the same, for phones' home screens
  cfc-site/favicon-512.png    the same, the logo in the pages' JSON-LD and /ride/'s manifest
  cfc-site/og-cfc-N.png       the site's share card, 1200 x 630 (templates/og/cfc.html, written here too)
  cfc-site/mark.svg, cfc-site/assets/logo.svg
                              two addresses that used to serve retired marks (the wheel, the three strokes): nothing on
                              the site links to them, but they are out in the world, so they serve the icon now

Everything is drawn from scripts/mark-2027.js, so these can't drift from the header's mark.

  python3 tools/brand-files.py            (Playwright; the same seed of nothing, the same pictures)
  python3 tools/brand-files.py --n 3      a new share-card number

A changed share card gets a new number (chat apps keep a preview for weeks): pass --n, then point OG_IMAGE at it in
scripts/chrome.js, tools/build-rides.js, scripts/build-home.js and scripts/build-events.js, add the old address to
RETIRED_OG in scripts/apply-chrome.py, and regenerate. The old numbers are rewritten with the new picture as well, so a
link shared last month never shows a retired mark. A changed favicon keeps its name; bump ICON_V in scripts/chrome.js.
"""
import argparse, json, pathlib, subprocess, sys

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = ROOT / "cfc-site"
BRUISE, PLASTER, PATINA = "#1C1A22", "#EFEDEA", "#A9BDB8"
OLD_CARDS = ["og-cfc.png", "og-image.png"]          # addresses already out in the world: kept, with the current picture
OLD_MARKS = ["mark.svg", "assets/logo.svg"]         # the same for two retired marks' addresses: they serve the icon


def mark(**opts):
    js = "process.stdout.write(require('./scripts/mark-2027.js').FILE(%s))" % json.dumps(opts)
    return subprocess.check_output(["node", "-e", js], cwd=ROOT).decode()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--n", type=int, default=2, help="the share card's number (og-cfc-N.png)")
    a = ap.parse_args()

    # the icon: the stacked mark is 252 x 196; a 300 square gives it a 24-unit margin at the sides
    icon = mark(stack=True, ink=PLASTER, ground=BRUISE, box="-24 -52 300 300") + "\n"
    (SITE / "favicon.svg").write_text(icon)
    for name in OLD_MARKS:
        (SITE / name).write_text(icon)

    # the share card: the stacked mark on bruise, the question, what this is, the address. Overpass from the site.
    card = f"""<!doctype html>
<!-- The site's share card (1200×630). Written and rendered by tools/brand-files.py from scripts/mark-2027.js: don't
     edit it here. The mark's plate is the pink; the words are the site's own. -->
<html lang="en">
<head>
<meta charset="utf-8">
<style>
@font-face{{font-family:"Overpass";font-weight:100 900;src:url(/fonts/overpass-latin.woff2) format("woff2")}}
*{{box-sizing:border-box}}
html,body{{margin:0;width:1200px;height:630px;overflow:hidden;background:{BRUISE};color:{PLASTER};font-family:"Overpass",sans-serif}}
.mark{{position:absolute;left:92px;top:146px;width:434px}}
.mark svg{{display:block;width:100%;height:auto}}
.txt{{position:absolute;left:660px;top:196px;width:480px}}
.q{{margin:0;font-weight:800;font-size:46px;line-height:1.08;letter-spacing:-.02em}}
.what{{margin:26px 0 0;font-weight:600;font-size:27px;line-height:1.38;color:{PATINA}}}
.url{{margin:40px 0 0;font-weight:800;font-size:23px;line-height:1}}
</style>
</head>
<body>
<div class="mark">{mark(stack=True, ink=PLASTER)}</div>
<div class="txt">
  <p class="q">Who do you cycle for?</p>
  <p class="what">10,000 miles in 2027. All on the bike.<br>Every ride written down.</p>
  <p class="url">cycleforchange.org</p>
</div>
</body>
</html>
"""
    tpl = ROOT / "templates" / "og" / "cfc.html"
    tpl.write_text(card)

    with sync_playwright() as p:
        b = p.chromium.launch()
        for size in (180, 512):
            pg = b.new_page(viewport={"width": size, "height": size}, device_scale_factor=1)
            pg.set_content(f'<body style="margin:0;background:{BRUISE}">' + icon.replace("<svg ", f'<svg width="{size}" height="{size}" style="display:block" ', 1))
            pg.screenshot(path=str(SITE / f"favicon-{size}.png"), clip={"x": 0, "y": 0, "width": size, "height": size})
            pg.close()
        b.close()

    out = SITE / f"og-cfc-{a.n}.png"
    subprocess.check_call([sys.executable, str(ROOT / "tools" / "og.py"), str(tpl), str(out)])
    for name in OLD_CARDS:
        (SITE / name).write_bytes(out.read_bytes())
    for f in ["favicon.svg", "favicon-180.png", "favicon-512.png", out.name] + OLD_CARDS + OLD_MARKS:
        print(f"{f:20s} {(SITE / f).stat().st_size:>7,} bytes")


if __name__ == "__main__":
    main()
