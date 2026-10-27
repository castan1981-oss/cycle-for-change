#!/usr/bin/env python3
"""The Fruit Loop poster (Oct 27, 2026): one poster, three sizes, built from the page's own parts.

  python3 tools/fruitloop-poster.py <photo> <N>     (needs Playwright, Pillow and `pip install qrcode`)

Writes cfc-site/fruitloop/poster-N.jpg/.webp/.avif (1080x1350, the feed post and the page's figure),
story-N.jpg (1080x1920, words kept out of the top and bottom 230 px) and print-N.pdf (8.5 x 11 in, vector type,
QR to /fl, the poster's short link). Bump N when anything changes and update the links in cfc-site/fruitloop/index.html:
phones and Safari cache pictures hard.

The rules (brand review panel, Oct 27, 2026, after a ChatGPT flyer redrew the logo wrong):
- The lockup is placed, never redrawn: this script lifts the SVG out of the page's own h1. The trans O is the second
  O; the chevron is the Progress hoist (black, brown, light blue, pink, white).
- Overpass only, flat bruise ground, the eleven muted colors from fruitloop.css. No chalk, no texture, no doodles.
- Robert's photo goes in as shot: no AI re-render, no grade. Nothing is laid over it.
- Every size carries the basics: every Friday from Dec 11, meet 5:30, roll 6:00, the crosswalk, about 14 flat miles,
  free, nobody gets dropped, 18 and up, two lights, who hosts, the way in. Never fruitloopphx.com (not bought yet),
  never the coffee shop's name (not until it says yes).
"""
import sys, os, re, shutil, tempfile, threading, http.server, functools, socketserver, html
from playwright.sync_api import sync_playwright
from PIL import Image

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(REPO, "cfc-site")
photo, N = sys.argv[1], sys.argv[2]
work = tempfile.mkdtemp()
outdir = tempfile.mkdtemp()
shutil.copy(os.path.join(SITE, "fonts/overpass-latin.woff2"), work)
shutil.copy(photo, os.path.join(work, "photo" + os.path.splitext(photo)[1]))
PHOTO = "photo" + os.path.splitext(photo)[1]

page_html = open(os.path.join(SITE, "fruitloop/index.html")).read()
LOCKUP = re.search(r'<svg class="fl-word".*?</svg>', page_html, re.S).group(0).replace('class="fl-word"', 'class="word"')

# QR for the printed poster only (the /fl short link is "the poster's QR", tagged utm_source=poster)
import qrcode, qrcode.image.svg
qr = qrcode.QRCode(border=0, error_correction=qrcode.constants.ERROR_CORRECT_M)
qr.add_data("https://cycleforchange.org/fl")
qr.make(fit=True)
mods = qr.get_matrix()
n = len(mods)
rects = "".join(f'<rect x="{x}" y="{y}" width="1.02" height="1.02"/>' for y, row in enumerate(mods) for x, v in enumerate(row) if v)
QR = f'<svg class="qr" viewBox="0 0 {n} {n}" shape-rendering="crispEdges" fill="#1C1A22">{rects}</svg>'

CSS = """
@font-face{font-family:Overpass;src:url(overpass-latin.woff2) format("woff2");font-weight:100 900}
*{box-sizing:border-box;margin:0;padding:0}
:root{--asphalt:#1C1A22;--paper:#EFEDEA;--bone:#E1DFDB;--dust:#A9BDB8;--rose-lift:#D9B1AA;--line:#4A4E55;
  --fl-red:#B04A45;--fl-orange:#C47B3F;--fl-yellow:#C9A54A;--fl-green:#5C8762;--fl-blue:#4E6A9C;--fl-violet:#775A8E;
  --fl-tb:#7AAFC9;--fl-tp:#D9A3B1;--fl-tw:#EFEDEA;--fl-br:#7E5B46;--fl-bk:#332E3B}
html,body{background:var(--asphalt)}
body{width:var(--W);height:var(--H);overflow:hidden;font-family:Overpass,sans-serif;color:var(--bone);
  -webkit-font-smoothing:antialiased;position:relative}
.sheet{position:absolute;inset:0;padding:var(--pad);display:flex;flex-direction:column}
.the{font-weight:800;font-size:calc(var(--W) * .038);line-height:1;color:var(--dust);padding-left:calc(var(--lockw) * .2273)}
.word{display:block;width:var(--lockw);height:auto;color:var(--paper);margin-top:calc(var(--W) * .012)}
.kick{margin-top:calc(var(--W) * .016);font-weight:700;font-size:calc(var(--W) * .03);line-height:1.15;color:var(--dust);
  padding-left:calc(var(--lockw) * .2273);letter-spacing:-.005em}
.mid{flex:1;display:grid;grid-template-columns:minmax(0,1fr) var(--photow);column-gap:var(--gap);margin-top:var(--gap);min-height:0}
.info{display:flex;flex-direction:column;min-height:0}
.info>*{flex:none}
.big{font-weight:900;font-size:var(--big);line-height:.9;letter-spacing:-.035em;color:var(--paper)}
.time{margin-top:var(--rgap)}
.from{margin-top:calc(var(--big) * .14);font-weight:800;font-size:calc(var(--big) * .5);line-height:1;letter-spacing:-.02em;color:var(--rose-lift)}
.rule{flex:none;height:3px;background:var(--paper);margin:var(--rgap) 0}
.time{font-weight:900;font-size:calc(var(--big) * .56);line-height:1.02;letter-spacing:-.025em;color:var(--paper)}
.lab{font-weight:700;font-size:calc(var(--W) * .022);line-height:1.2;color:var(--dust)}
.where{font-weight:800;font-size:calc(var(--W) * .033);line-height:1.12;color:var(--paper);letter-spacing:-.01em}
.facts{display:grid;gap:calc(var(--W) * .006)}

.facts p{font-weight:700;font-size:calc(var(--W) * .025);line-height:1.2;color:var(--bone)}
.why{flex:none;margin-top:var(--gap);font-weight:600;font-size:calc(var(--W) * .022);line-height:1.35;color:var(--dust);max-width:40em}
.photo{position:relative;min-height:0;overflow:hidden;background:#2a2730}
.photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 0}
.foot{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--gap);margin-top:var(--gap)}
.host{font-weight:700;font-size:calc(var(--W) * .022);line-height:1.3;color:var(--dust)}
.host b{display:block;font-weight:800;font-size:calc(var(--W) * .03);color:var(--paper);letter-spacing:-.01em}
.qrbox{display:flex;align-items:center;gap:calc(var(--W) * .016)}
.qrbox .qrw{background:var(--paper);padding:calc(var(--W) * .01);width:var(--qr);height:var(--qr)}
.qr{display:block;width:100%;height:100%}
.qrbox p{font-weight:800;font-size:calc(var(--W) * .024);line-height:1.25;color:var(--paper);text-align:right}
.qrbox p span{display:block;font-weight:700;color:var(--dust);font-size:calc(var(--W) * .02)}
.xwalk{display:grid;grid-template-columns:repeat(6,1fr);gap:calc(var(--W) * .02);margin-top:var(--gap)}
.xwalk i{display:block;height:var(--barh)}
.xwalk i:nth-child(1){background:var(--fl-red)}.xwalk i:nth-child(2){background:var(--fl-orange)}
.xwalk i:nth-child(3){background:var(--fl-yellow)}.xwalk i:nth-child(4){background:var(--fl-green)}
.xwalk i:nth-child(5){background:var(--fl-blue)}.xwalk i:nth-child(6){background:var(--fl-violet)}
"""

def page(kind, W, H, opts):
    pad = opts["pad"]
    lockw = W - 2 * pad
    qr_html = f'<div class="qrbox"><p>{html.escape(opts["link"])}<span>@cycl_eforchange</span></p><div class="qrw">{QR}</div></div>' if opts.get("qr") \
        else f'<div class="qrbox"><p>{html.escape(opts["link"])}<span>@cycl_eforchange</span></p></div>'
    info = f"""
      <div class="info">
        <p class="big">Every<br>Friday</p>
        <p class="from">from Dec 11</p>
        <p class="time">Meet 5:30 pm<br>Roll 6:00</p>
        <div class="rule"></div>
        <p class="where">The rainbow crosswalk at Central and Portland</p>
        <div class="rule"></div>
        <div class="facts">
          <p>About 14 flat miles</p>
          <p>Free. Nobody gets dropped.</p>
          <p>18 and up. Bring two lights.</p>
        </div>

      </div>"""
    photo = f'<div class="photo"><img src="{PHOTO}" alt=""></div>'
    mid = f'<div class="mid">{info}{photo}</div>'
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{CSS}
body{{--W:{W}px;--H:{H}px;--pad:{pad}px;--lockw:{lockw}px;--gap:{opts['gap']}px;--photow:{opts.get('photow',0)}px;
  --big:{opts['big']}px;--rgap:{opts['rgap']}px;--qr:{opts.get('qrsize',0)}px;--barh:{opts['barh']}px}}
{opts.get('extra','')}
</style></head><body class="{kind}"><div class="sheet">
  <p class="the">The</p>{LOCKUP}<p class="kick">A queer night ride through Phoenix history</p>
  {mid}
  <p class="why">The Fruit Loop was the circuit of gay bars and drag clubs downtown, mid-1940s to mid-1990s. The ride ends by riding it.</p>
  <div class="foot"><p class="host"><b>Hosted by Robert Castan</b>Cycle for Change</p>{qr_html}</div>
  <div class="xwalk"><i></i><i></i><i></i><i></i><i></i><i></i></div>
</div></body></html>"""

JOBS = {
    # the feed post is read at ~390 px wide on a phone (x0.36): the basics are set big enough to read there (14 px+),
    # so the lockup gives up a little width
    "post":  (1080, 1350, dict(pad=60, gap=26, photow=430, big=80, rgap=13, barh=30, link="cycleforchange.org/fruitloop",
                               extra="body{--lockw:840px} .where{font-size:40px} .facts p{font-size:35px;line-height:1.15} .why{font-size:29px} .host,.qrbox p span{font-size:26px} .host b,.qrbox p{font-size:32px}")),
    "story": (1080, 1920, dict(pad=64, gap=34, photow=440, big=96, rgap=18, barh=36, link="cycleforchange.org/fruitloop",
                               extra=".sheet{padding-top:230px;padding-bottom:230px} .where{font-size:42px} .facts p{font-size:35px;line-height:1.15} .why{font-size:31px} .host,.qrbox p span{font-size:27px} .host b,.qrbox p{font-size:33px}")),
    # 8.5 x 11 in at 96 css px per inch (816 x 1056): saved as a vector PDF (type and lockup stay sharp at any size),
    # plus a 2x PNG preview
    "print": (816, 1056, dict(pad=54, gap=26, photow=340, big=56, rgap=11, barh=28, qr=True, qrsize=104, link="cycleforchange.org/fl", scale=2, pdf=True)),
}

class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass

for k, (W, H, o) in JOBS.items():
    open(os.path.join(work, f"{k}.html"), "w").write(page(k, W, H, o))

srv = socketserver.ThreadingTCPServer(("127.0.0.1", 0), functools.partial(Q, directory=work))
port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
only = None
with sync_playwright() as p:
    b = p.chromium.launch()
    for k, (W, H, o) in JOBS.items():
        if only and k not in only.split(","):
            continue
        pg = b.new_page(viewport={"width": W, "height": H}, device_scale_factor=o.get("scale", 1))
        pg.goto(f"http://127.0.0.1:{port}/{k}.html", wait_until="networkidle")
        pg.evaluate("document.fonts.ready")
        pg.wait_for_timeout(250)
        over = pg.evaluate("""()=>{const s=document.querySelector('.sheet');const out=[];
          for(const el of s.querySelectorAll('*')){const r=el.getBoundingClientRect(); if(r.bottom>innerHeight+1||r.right>innerWidth+1) out.push(el.className+':'+Math.round(r.bottom)+'/'+Math.round(r.right))}
          const info=document.querySelector('.info'); return {out:out.slice(0,6), infoOverflow: info.scrollHeight>info.clientHeight+1 ? info.scrollHeight-info.clientHeight : 0}}""")
        pg.screenshot(path=os.path.join(outdir, f"{k}.png"))
        if o.get("pdf"):
            pg.emulate_media(media="screen")
            pg.pdf(path=os.path.join(outdir, f"{k}.pdf"), width="8.5in", height="11in", print_background=True,
                   margin={"top": "0", "right": "0", "bottom": "0", "left": "0"}, page_ranges="1")
        print(k, W, H, over)
    b.close()
srv.shutdown()

post = Image.open(os.path.join(outdir, "post.png")).convert("RGB")
dst = os.path.join(SITE, "fruitloop")
post.save(f"{dst}/poster-{N}.jpg", quality=86, optimize=True, progressive=True)
post.save(f"{dst}/poster-{N}.webp", quality=80, method=6)
post.save(f"{dst}/poster-{N}.avif", quality=56)
Image.open(os.path.join(outdir, "story.png")).convert("RGB").save(f"{dst}/story-{N}.jpg", quality=86, optimize=True, progressive=True)
shutil.copy(os.path.join(outdir, "print.pdf"), f"{dst}/print-{N}.pdf")
print("wrote", ", ".join(f"cfc-site/fruitloop/{f}" for f in (f"poster-{N}.jpg", f"poster-{N}.webp", f"poster-{N}.avif", f"story-{N}.jpg", f"print-{N}.pdf")))
