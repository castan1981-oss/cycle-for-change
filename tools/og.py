#!/usr/bin/env python3
"""Render a share card (1200x630) from an HTML template.

  python3 tools/og.py templates/og/nov7.html cfc-site/og-nov7.jpg

The template is served from cfc-site/ (so /fonts/... and /img/... resolve) by an in-process
http.server, and screenshotted with Playwright's Chromium. .jpg out = quality 88; .png = lossless.
Bump the file number when a card changes (og-nov7.jpg -> og-nov7-2.jpg): chat apps cache previews hard.
"""
import functools, http.server, pathlib, shutil, socketserver, sys, tempfile, threading

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = ROOT / "cfc-site"


def main(src, out):
    src, out = pathlib.Path(src).resolve(), pathlib.Path(out).resolve()
    with tempfile.TemporaryDirectory() as tmp:
        # serve the site with the template dropped in at /__og.html
        www = pathlib.Path(tmp) / "www"
        www.mkdir()
        for d in ("fonts", "img", "photos"):
            (www / d).symlink_to(SITE / d)
        shutil.copy(src, www / "__og.html")
        handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(www))
        handler.log_message = lambda *a: None
        with socketserver.TCPServer(("127.0.0.1", 0), handler) as httpd:
            threading.Thread(target=httpd.serve_forever, daemon=True).start()
            port = httpd.server_address[1]
            with sync_playwright() as p:
                b = p.chromium.launch()
                pg = b.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
                pg.goto(f"http://127.0.0.1:{port}/__og.html", wait_until="networkidle")
                pg.evaluate("document.fonts.ready")
                kw = {"type": "jpeg", "quality": 88} if out.suffix.lower() in (".jpg", ".jpeg") else {"type": "png"}
                pg.screenshot(path=str(out), clip={"x": 0, "y": 0, "width": 1200, "height": 630}, **kw)
                b.close()
            httpd.shutdown()
    print("wrote", out.relative_to(ROOT) if out.is_relative_to(ROOT) else out)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
