"""The Cycle for Change print and social kit, in the site's look (Lane Paint).

    python3 tools/cfc-kit/make.py                       # everything
    python3 tools/cfc-kit/make.py posts stories          # just those groups (posts stories reel print stickers)
    python3 tools/cfc-kit/make.py --for "my mom"         # the ride pieces carry that word, dated today, no photo
    python3 tools/cfc-kit/make.py --for "my mom" --date 2026-11-02 --photo img/today/x.jpg --where "Phoenix"
                                                          # ... with that day's own photo (a path under cfc-site/)
    python3 tools/cfc-kit/make.py --stat youth-18        # the stat post and Story use that stat (an id from the bank)

Writes into tools/cfc-kit/.build/out/<group>/ (never committed; the kit's pages are where Robert saves them from):
  posts/    1080 x 1350 JPGs          stories/  1080 x 1920 JPGs
  reel/     see-through PNGs + the end card
  print/    vector PDFs: the 8.5 x 11 flyer, the 11 x 17 poster, every stat as a 5 x 7 card (one PDF, with bleed)
  stickers/ PDFs with bleed for the printer, PNGs at 300 dpi
The numbers come from the data: the count from /api/strava (else data/tally.json), the rides from scripts/chrome.js
RIDING, the directory count from cfc-site/rides/live.json, the stats from data/stats/stat-bank.json.
Needs Playwright (Chromium), Pillow, qrcode.
"""
import sys, json, argparse, shutil
from playwright.sync_api import sync_playwright
from PIL import Image
from lib import *
import social, printkit

GROUPS = ["posts", "stories", "reel", "print", "stickers"]
PICKS = ["work-19", "youth-18", "screen-13"]   # the kit's three stat examples; any id in the bank works


def load(pg, html):
    """Open the board from a file, so the fonts and photos (file:// paths) load."""
    BUILD.mkdir(parents=True, exist_ok=True)
    f = BUILD / "board.html"
    f.write_text(html)
    pg.goto(f.as_uri(), wait_until="load")


def shoot(pg, html, out, w, h, transparent=False, scale=1, sel=".board"):
    pg.set_viewport_size({"width": w, "height": h})
    load(pg, html)
    pg.wait_for_function("document.body.dataset.ready === '1'")
    pg.evaluate("document.fonts.ready")
    out.parent.mkdir(parents=True, exist_ok=True)
    png = out.with_suffix(".png")
    pg.locator(sel).first.screenshot(path=str(png), omit_background=transparent, scale="device" if scale != 1 else "css")
    if out.suffix == ".jpg":
        Image.open(png).convert("RGB").save(out, quality=90, subsampling=0, optimize=True)
        png.unlink()
    print("  wrote", out.relative_to(OUT))


def pdf(pg, html, out, w_in, h_in):
    pg.set_viewport_size({"width": int(w_in * 96), "height": int(h_in * 96)})
    load(pg, html)
    pg.wait_for_function("document.body.dataset.ready === '1'")
    pg.evaluate("document.fonts.ready")
    out.parent.mkdir(parents=True, exist_ok=True)
    pg.pdf(path=str(out), width=f"{w_in}in", height=f"{h_in}in", print_background=True, prefer_css_page_size=True,
           margin={"top": "0", "right": "0", "bottom": "0", "left": "0"})
    print("  wrote", out.relative_to(OUT))


# The homepage's #today crops for its own pictures (the gravel photo keeps the painted CYCLE FOR change whole).
TODAY_POS = {"/img/today/oct12-gravel-1.jpg": "66% 50%"}
# The blank Story: his own words from the homepage's #today (data/today.json `line`), the plate left empty to type on.
BLANK = {"word": None, "label": "Every ride, I say who I\u2019m riding for that day.", "photo": None}


def ride_day(today, a):
    """The ride and who it was for: data/today.json (the homepage's #today), or --for with --date (default today,
    Phoenix) and an optional --photo. The label is the homepage's dated line, never "today"."""
    from datetime import date as _d, datetime as _dt
    if a.word:
        ymd = a.date or _dt.now(PHX).date().isoformat()
        ph = dict(rel=a.photo.lstrip("/"), where=place_month(a.where, ymd) if a.where else "", pos=a.pos) if a.photo else None
        word = a.word
    else:
        ymd, word = today["date"], today["for"]
        p = today["photo"]
        ph = dict(rel=p["src"].lstrip("/"), where=place_month(p.get("where"), ymd), pos=TODAY_POS.get(p["src"], "50% 50%"))
    d = _d.fromisoformat(ymd)
    return {"word": word, "photo": ph, "date": ymd,
            "label": f"The ride on {d.strftime('%A')}, {d.strftime('%B')} {d.day}."}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("groups", nargs="*", default=GROUPS)
    ap.add_argument("--for", dest="word", default=None)
    ap.add_argument("--date", default=None)
    ap.add_argument("--photo", default=None)
    ap.add_argument("--where", default=None)
    ap.add_argument("--pos", default="50% 50%")
    ap.add_argument("--stat", default=None)
    a = ap.parse_args()
    today = json.load(open(ROOT / "data" / "today.json"))
    t = ride_day(today, a)
    word = t["word"]
    bank = {s["id"]: s for s in stats()}
    picks = [a.stat] if a.stat else PICKS
    rides = riding()
    nxt = next(r for r in rides if r.get("start"))
    cal = json.load(open(ROOT / "data" / "calendar-2027.json"))
    lottery = {e["slug"] for e in cal.get("events", []) if str(e.get("lottery", "")).lower().startswith("yes")}
    n, abroad = ride_counts()
    mi, src = live_miles()
    print(f"count {mi:,.1f} ({src}) · {n:,} rides, {abroad} countries abroad · next ride {nxt['name']} · today: {word}")

    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(device_scale_factor=1)
        for size, grp in (("post", "posts"), ("story", "stories")):
            if grp not in a.groups:
                continue
            d = OUT / grp
            shutil.rmtree(d, ignore_errors=True)
            W, H = social.SZ[size]
            boards = [("1-ten-thousand", social.intro(size)), ("2-who-do-you-cycle-for", social.who(size)),
                      ("3-the-ride-on", social.today(size, t))]
            if size == "story":
                boards.append(("3b-who-i-rode-for-blank", social.today(size, BLANK)))
            boards += [(f"4-stat-{k}", social.stat(size, bank[k])) for k in picks]
            boards += [("5-ride-with-me", social.ride(size, nxt, len(rides))), ("6-the-2027-rides", social.year(size, rides, lottery)),
                       ("7-find-a-group-ride", social.find(size, n, abroad)), ("8-the-count", social.miles(size, mi, season_words()))]
            for name, html in boards:
                shoot(pg, html, d / f"{name}.jpg", W, H)
        if "reel" in a.groups:
            d = OUT / "reel"; shutil.rmtree(d, ignore_errors=True)
            for name, (html, w, h, tr) in printkit.reel(t, mi).items():
                shoot(pg, html, d / name, w, h, transparent=tr, sel=".blk" if tr else ".board")
        if "print" in a.groups:
            d = OUT / "print"; shutil.rmtree(d, ignore_errors=True)
            pdf(pg, printkit.flyer(), d / "flyer-8-5x11.pdf", 8.5, 11)
            pdf(pg, printkit.poster(rides, lottery), d / "poster-11x17.pdf", 11, 17)
            pdf(pg, printkit.cards(list(bank.values())), d / "stat-cards-5x7.pdf", 5.25, 7.25)
        if "stickers" in a.groups:
            d = OUT / "stickers"; shutil.rmtree(d, ignore_errors=True)
            hi = b.new_page(device_scale_factor=300 / 96)
            for name, (html, w_in, h_in) in printkit.stickers().items():
                pdf(pg, html, d / f"{name}.pdf", w_in, h_in)
                shoot(hi, html, d / f"{name}.png", int(w_in * 96), int(h_in * 96), scale=300 / 96)
        b.close()


if __name__ == "__main__":
    main()
