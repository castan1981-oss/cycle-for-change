#!/usr/bin/env python3
"""The opinion series' graphic (Nov 18, 2026). Robert: a piece's picture is his bikes, him, or a graphic.

The graphic is one line of his own from the piece (front matter `line`, else `dek`) set big on the dark ground, the
mark under it. Two files a piece, written here and committed (the deploy can't draw them):

  cfc-site/img/op/<slug>-og-N.png   1200 x 630  the piece's share card (every piece), and its picture on the page
                                                 when `photo: graphic`
  cfc-site/img/op/<slug>-N.jpg      1080 x 1350 its card on /field-notes/ and the series page when `photo: graphic`

N is front matter `art` (1 if absent). Change the line, raise `art`: phones and chat apps keep the old picture.

  python3 tools/opinion-art.py            every piece that has no files for its current N
  python3 tools/opinion-art.py <slug>     that piece, redrawn
"""
import functools, html, http.server, json, subprocess, sys, threading
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "cfc-site"
OUT = SITE / "img" / "op"

def node(js):
    return subprocess.run(["node", "-e", js], cwd=ROOT, check=True, capture_output=True, text=True).stdout

def pieces():
    return json.loads(node('const O=require("./scripts/build-opinion.js"),p=require("path"),C=require("./scripts/curl-quotes.js");'
        'console.log(JSON.stringify(O.load(p.join(process.cwd(),"data","opinion"),{today:"9999-12-31"}).map(x=>({slug:x.meta.slug,line:C.curlText(O.artLine(x)),n:O.artN(x)}))))'))

MARK = node('console.log(require("./scripts/mark-2027.js").LINE("m",true))')

def page(line, w, h):
    # the last sentence is the one that lands: it is plaster; what sets it up is patina
    parts = [s.strip() for s in line.replace("? ", "?|").replace("! ", "!|").replace(". ", ".|").split("|") if s.strip()]
    spans = "".join(f'<span class="{"hit" if i == len(parts) - 1 else "set"}">{html.escape(s)} </span>' for i, s in enumerate(parts))
    tall = h > w
    pad = 96 if tall else 84
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
@font-face{{font-family:"Overpass";font-weight:100 900;src:url(/fonts/overpass-latin.woff2) format("woff2")}}
*{{box-sizing:border-box}}
html,body{{margin:0;width:{w}px;height:{h}px;overflow:hidden;background:#1C1A22;color:#EFEDEA;font-family:"Overpass",sans-serif}}
.box{{position:absolute;left:{pad}px;right:{pad}px;top:{pad}px;bottom:{pad + (150 if tall else 96)}px;display:flex;align-items:{"flex-end" if tall else "center"}}}
.line{{margin:0;font-weight:800;line-height:1.04;letter-spacing:-.025em;text-wrap:balance}}
.set{{color:#A9BDB8}} .hit{{color:#EFEDEA}}
.foot{{position:absolute;left:{pad}px;right:{pad}px;bottom:{pad - 16}px;display:flex;justify-content:space-between;align-items:flex-end}}
.foot svg{{display:block;width:{300 if tall else 250}px;height:auto;color:#EFEDEA}}
.what{{font-weight:700;font-size:{30 if tall else 26}px;line-height:1;color:#A9BDB8}}
</style></head><body>
<div class="box"><p class="line" id="l">{spans}</p></div>
<div class="foot">{MARK}<span class="what">Opinion</span></div>
<script>
// the biggest size at which the line still fits its box
const l=document.getElementById("l"),b=l.parentElement;let lo=28,hi={170 if tall else 120};
while(hi-lo>1){{const m=(lo+hi)>>1;l.style.fontSize=m+"px";(l.scrollHeight<=b.clientHeight&&l.scrollWidth<=b.clientWidth)?lo=m:hi=m}}
l.style.fontSize=lo+"px";
</script></body></html>"""

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass

def main():
    want = sys.argv[1] if len(sys.argv) > 1 else None
    todo = [p for p in pieces() if p["slug"] and p["line"] and (p["slug"] == want or (not want and not (OUT / f'{p["slug"]}-og-{p["n"]}.png').exists()))]
    if not todo:
        print("nothing to draw"); return
    OUT.mkdir(parents=True, exist_ok=True)
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=str(SITE)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{srv.server_address[1]}"
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        for p in todo:
            for old in OUT.glob(f'{p["slug"]}-*'):
                old.unlink()
            for (w, h, name, kind) in ((1200, 630, f'{p["slug"]}-og-{p["n"]}.png', "png"), (1080, 1350, f'{p["slug"]}-{p["n"]}.jpg', "jpeg")):
                pg = b.new_page(viewport={"width": w, "height": h})
                pg.goto(base + "/404.html"); pg.set_content(page(p["line"], w, h)); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(250)
                pg.screenshot(path=str(OUT / name), type=kind, **({"quality": 88} if kind == "jpeg" else {}))
                pg.close()
                print("wrote", (OUT / name).relative_to(ROOT))
        b.close()

if __name__ == "__main__":
    main()
