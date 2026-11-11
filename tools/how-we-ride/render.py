#!/usr/bin/env python3
"""How we ride, the group-ride film (CLAUDE.md §6): shoot film.html frame by frame and encode it.

    python3 tools/how-we-ride/render.py --n 3     # cfc-site/film/how-we-ride-3.mp4 and its .jpg / .webp / .avif poster
    python3 tools/how-we-ride/render.py --page    # only write .build/film.html, to watch it in a browser
    python3 tools/how-we-ride/render.py --stills  # one PNG per chapter into .build/stills/, for a quick look

film.html draws everything from one clock (window.HWR.seek(t)), so frame i is the page at t = i / 30: 360 x 640 CSS px
at device scale 2 = 720 x 1280. The mark's words come from scripts/mark-2027.js (the page's {{MARK}}), the font and the
asphalt tile from cfc-site/, so a change to the mark or the pink is made there and this is run again with the next
file number (phones cache /film/* hard). Then: HOW_FILMS in tools/build-rides.js takes the new number, the old files
are deleted, and node tools/build-rides.js puts it on the ride pages.

The encode is what the site's other films are (H.264 High, level 3.1, yuv420p, +faststart, no audio), tagged bt709 so
the pink is the pink, with aq-mode 3 so the dark road keeps its grain instead of banding.

Needs Playwright (Chromium), ffmpeg, Pillow with AVIF.
"""
import argparse, json, os, pathlib, shutil, subprocess, sys, time
from concurrent.futures import ProcessPoolExecutor

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent
SITE = ROOT / "cfc-site"
BUILD = HERE / ".build"
FPS = 30
POSTER_T = 2.6            # the intro's still: "First group ride? Here's how it works."


def build_page():
    """film.html with the mark in and the site's files by absolute path -> .build/film.html."""
    m = json.loads(subprocess.run(["node", "scripts/mark-2027.js"], cwd=ROOT, capture_output=True, text=True, check=True).stdout)
    word = (f'<svg class="lock-word" viewBox="0 0 404 97" focusable="false"><g fill="currentColor">'
            f'{m["CYCLE_PATHS"]}{m["FOR_PATHS"]}</g></svg>')
    s = (HERE / "film.html").read_text()
    assert s.count("{{MARK}}") == 2, "film.html: one {{MARK}} in the head comment, one in the page"
    head, body = s.split("-->", 1)
    s = head + "-->" + body.replace("{{MARK}}", word)
    assert f'--plate:{m["PINK"]};' in s, "film.html's plate is not the mark's pink (scripts/mark-2027.js PINK)"
    s = s.replace("../../cfc-site/", SITE.as_uri() + "/")
    BUILD.mkdir(exist_ok=True)
    out = BUILD / "film.html"
    out.write_text(s)
    return out


def open_page(p, page_file):
    br = p.chromium.launch()
    pg = br.new_context(viewport={"width": 360, "height": 640}, device_scale_factor=2, reduced_motion="no-preference").new_page()
    pg.goto(page_file.as_uri())
    pg.wait_for_function("window.HWR && document.fonts.status === 'loaded' && document.fonts.check('900 40px Overpass')")
    pg.wait_for_function("(() => { const i = new Image(); i.src = document.getElementById('asphTile').getAttribute('href'); return i.decode().then(() => true); })()")
    pg.evaluate("HWR.exportMode(true)")
    box = pg.evaluate("(() => { const r = document.getElementById('frame').getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; })()")
    assert [round(v, 2) for v in box] == [0, 0, 360, 640], box
    return br, pg


def shoot(args):
    """Frames a..b of the film into .build/frames/ (one browser per worker)."""
    page_file, a, b = args
    from playwright.sync_api import sync_playwright
    out = BUILD / "frames"
    with sync_playwright() as p:
        br, pg = open_page(p, pathlib.Path(page_file))
        for i in range(a, b + 1):
            pg.evaluate("t => HWR.seek(t)", i / FPS)
            pg.screenshot(path=str(out / f"f{i:05d}.png"), clip={"x": 0, "y": 0, "width": 360, "height": 640})
        br.close()
    return b - a + 1


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--n", type=int, help="the file number: cfc-site/film/how-we-ride-<n>.*")
    ap.add_argument("--page", action="store_true")
    ap.add_argument("--stills", action="store_true")
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--crf", type=int, default=31)
    a = ap.parse_args()
    page_file = build_page()
    print("wrote", page_file.relative_to(ROOT))
    if a.page:
        return
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        br, pg = open_page(p, page_file)
        dur = pg.evaluate("HWR.D")
        chapters = pg.evaluate("HWR.CH.map(c => [c.id, c.start, c.still])")
        if a.stills:
            d = BUILD / "stills"; shutil.rmtree(d, ignore_errors=True); d.mkdir(parents=True)
            for k, (cid, start, still) in enumerate(chapters):
                pg.evaluate("t => HWR.seek(t)", start + still)
                pg.screenshot(path=str(d / f"{k:02d}-{cid}.png"), clip={"x": 0, "y": 0, "width": 360, "height": 640})
            print("wrote", len(chapters), "stills in", d.relative_to(ROOT))
        br.close()
    if a.stills:
        return
    if a.n is None:
        sys.exit("give the file number: --n <n> (the next one after the film that is live)")
    frames = round(dur * FPS)
    fdir = BUILD / "frames"; shutil.rmtree(fdir, ignore_errors=True); fdir.mkdir(parents=True)
    t0 = time.time()
    step = -(-frames // a.workers)
    jobs = [(str(page_file), s, min(frames, s + step) - 1) for s in range(0, frames, step)]
    with ProcessPoolExecutor(a.workers) as ex:
        done = sum(ex.map(shoot, jobs))
    assert done == frames and len(list(fdir.glob("f*.png"))) == frames
    print(f"{frames} frames ({dur:.1f} s) in {time.time() - t0:.0f} s")

    base = SITE / "film" / f"how-we-ride-{a.n}"
    mp4 = base.with_suffix(".mp4")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", str(fdir / "f%05d.png"),
                    "-vf", "scale=in_range=full:out_range=tv:out_color_matrix=bt709:flags=accurate_rnd+full_chroma_int,format=yuv420p",
                    "-c:v", "libx264", "-profile:v", "high", "-level:v", "3.1", "-preset", "veryslow", "-refs", "5",
                    "-crf", str(a.crf), "-x264-params", "aq-mode=3", "-g", "90",
                    "-color_range", "tv", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
                    "-movflags", "+faststart", "-an", str(mp4)], check=True)
    from PIL import Image
    im = Image.open(fdir / f"f{round(POSTER_T * FPS):05d}.png").convert("RGB")
    assert im.size == (720, 1280), im.size
    im.save(base.with_suffix(".jpg"), quality=84, optimize=True, progressive=True)
    im.save(base.with_suffix(".webp"), quality=78, method=6)
    im.save(base.with_suffix(".avif"), quality=52)
    for ext in (".mp4", ".jpg", ".webp", ".avif"):
        f = base.with_suffix(ext)
        print(f"  {f.relative_to(ROOT)}  {os.path.getsize(f):,} bytes")
    print("next: HOW_FILMS.ride in tools/build-rides.js takes the new number; delete the old files; node tools/build-rides.js")


if __name__ == "__main__":
    main()
