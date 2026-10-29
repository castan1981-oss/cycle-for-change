"""The phone kit page: every piece from make.py on one page with a Save button, for Robert to save from his phone.

    python3 tools/cfc-kit/kitpage.py      # after make.py; writes tools/cfc-kit/.build/kit/ (index.html, th/, full/)

Published as the "CFC Phone Kit" artifact (it declares the downloads capability, so Save hands the file to the phone).
Lane Paint like the site: concrete and asphalt, the stencil, Overpass (the site's own file, inlined), rose only for the blank.
"""
import base64, shutil, html
from pathlib import Path
from PIL import Image
import pypdfium2 as pdfium
from lib import OUT, BUILD, SITE, LETTERS, ROW

KIT = BUILD / "kit"
V = "1"   # bump on a re-publish that changes pictures, so phones don't show the old ones


def thumb(src, name, w=640):
    """A WebP preview; PDFs are drawn from their first page (the cards: the first four, side by side)."""
    if src.suffix == ".pdf":
        d = pdfium.PdfDocument(str(src))
        if len(d) > 1:
            pages = [d[i].render(scale=1.4).to_pil() for i in range(4)]
            g = 16
            im = Image.new("RGB", (pages[0].width * 2 + g * 3, pages[0].height * 2 + g * 3), (215, 213, 208))
            for i, p in enumerate(pages):
                im.paste(p, (g + (i % 2) * (p.width + g), g + (i // 2) * (p.height + g)))
        else:
            im = d[0].render(scale=2).to_pil()
    else:
        im = Image.open(src)
    im = im.convert("RGBA" if im.mode in ("RGBA", "LA") else "RGB")
    h = round(im.height * w / im.width)
    im.resize((w, h), Image.LANCZOS).save(KIT / "th" / f"{name}.webp", quality=80)
    return w, h


SECTIONS = [
    ("posts", "Posts", "Feed size, 1080 × 1350. The stat posts carry their source; any of the 132 in the stat bank can be made the same way.",
     [("1-ten-thousand", "10,000 miles"), ("2-who-do-you-cycle-for", "Who do you cycle for?"), ("3-today-i-rode-for", "Today I rode for"),
      ("4-stat-work-19", "Stat: straight cyclists"), ("4-stat-youth-18", "Stat: unsafe at school"), ("4-stat-screen-13", "Stat: know someone trans"),
      ("5-ride-with-me", "Ride with me"), ("6-the-2027-rides", "The 2027 rides"), ("7-find-a-group-ride", "Find a group ride"), ("8-the-count", "The count")]),
    ("stories", "Stories", "Full screen, 1080 × 1920. The top and bottom are left clear for Instagram’s bars and stickers. On the blank one, type the day’s word on the pink bar.",
     [("1-ten-thousand", "10,000 miles"), ("2-who-do-you-cycle-for", "Who do you cycle for?"), ("3-today-i-rode-for", "Today I rode for"),
      ("3b-today-i-rode-for-blank", "Today I rode for, blank"), ("4-stat-work-19", "Stat: straight cyclists"), ("4-stat-youth-18", "Stat: unsafe at school"),
      ("4-stat-screen-13", "Stat: know someone trans"), ("5-ride-with-me", "Ride with me"), ("6-the-2027-rides", "The 2027 rides"),
      ("7-find-a-group-ride", "Find a group ride"), ("8-the-count", "The count")]),
    ("reel", "Reel pieces", "The four stickers sit on their own dark block, so they read over any footage. Add one as a photo sticker in Instagram’s reel editor, or as an overlay in CapCut. The end card is the last two seconds.",
     [("reel-1-the-sign", "The sign"), ("reel-2-today-i-rode-for", "Today I rode for"), ("reel-3-the-count", "The count"),
      ("reel-4-the-link", "The link"), ("reel-5-end-card", "End card")]),
    ("print", "To print", "PDFs for a print shop or a home printer. The QR codes are tested and go to short links on the site, so the scans can be counted.",
     [("flyer-8-5x11", "Flyer, 8.5 × 11"), ("poster-11x17", "Poster, 11 × 17"), ("stat-cards-5x7", "Stat cards, 5 × 7")]),
    ("stickers", "Stickers", "Each has 1/8 inch of extra edge for the cutter (the PDF is for a print shop, the PNG is 300 dpi for sticker sites). Write on the blank one with a marker.",
     [("sticker-cycle-for-blank-3x2", "CYCLE FOR ___, 3 × 2 in"), ("sticker-10k-3x3", "10K, 3 × 3 in"), ("sticker-who-do-you-cycle-for-3x3", "Who do you cycle for?, 3 × 3 in")]),
]
LINES = {
    "stat-cards-5x7": "All 132 stats, one per page, with 1/8 in bleed. Each has its source, its catch and a QR to the report. The mental-health ones carry 988 and Trevor.",
    "flyer-8-5x11": "Two QR codes: find a group ride, and ride with me.",
    "poster-11x17": "The 13 rides on the map, with a QR to the sign-up links.",
}


def find(group, stem):
    for ext in (".jpg", ".png", ".pdf"):
        p = OUT / group / (stem + ext)
        if p.exists():
            return p
    raise SystemExit(f"missing {group}/{stem} — run make.py first")


def card(group, stem, label):
    src = find(group, stem)
    key = f"{group}-{stem}"
    shutil.copy(src, KIT / "full" / f"{key}{src.suffix}")
    w, h = thumb(src, key)
    full = f"full/{key}{src.suffix}?v={V}"
    see = src.suffix == ".png" and group == "reel"
    kind = {".jpg": "JPG", ".png": "PNG", ".pdf": "PDF"}[src.suffix]
    size = src.stat().st_size
    meta = f"{kind}, {size/1e6:.1f} MB" if size > 900_000 else kind
    if see:
        meta += ", see-through edges"
    wide = group in ("reel",) and not stem.endswith("end-card")
    fname = html.escape(f"CFC {SECTION_NAME[group].lower()}, {label}{src.suffix}".replace("?", "").replace(":", " -").replace("/", "-"))
    btn = "Save PDF" if src.suffix == ".pdf" else "Save"
    line = f'<small class="line">{html.escape(LINES[stem])}</small>' if stem in LINES else ""
    openl = f'<a class="open" href="{full}" target="_blank" rel="noopener">Open the PDF</a>' if src.suffix == ".pdf" else ""
    pdf2 = OUT / group / (stem + ".pdf")
    if group == "stickers" and pdf2.exists():          # stickers: the 300 dpi PNG and the print shop's PDF
        shutil.copy(pdf2, KIT / "full" / f"{key}.pdf")
        f2 = f"full/{key}.pdf?v={V}"
        meta = "PNG at 300 dpi, or the PDF"
        openl = (f'<button type="button" class="save save--2" data-full="{f2}" data-name="{fname[:-4]}.pdf">Save PDF</button>'
                 f'<a class="open" href="{f2}" target="_blank" rel="noopener">Open the PDF</a>')
    return (f'<figure class="card{" wide" if wide else ""}">'
            f'<div class="pic{" see" if see else ""}" style="aspect-ratio:{w}/{h}"><img src="th/{key}.webp?v={V}" '
            f'data-full-src="{"" if src.suffix == ".pdf" else full}" alt="{html.escape(label)}" width="{w}" height="{h}" loading="lazy" decoding="async"></div>'
            f'<figcaption><b>{html.escape(label)}</b><small>{meta}</small>{line}</figcaption>'
            f'<button type="button" class="save" data-full="{full}" data-name="{fname}">{btn}</button>{openl}'
            f'<p class="status" role="status" aria-live="polite"></p></figure>')


SECTION_NAME = {g: n for g, n, _, _ in SECTIONS}


def stencil_svg():
    uses = "".join(f'<path d="{LETTERS[ch]}" transform="translate({x} 0)"/>' for ch, x in ROW)
    return (f'<svg class="mark" viewBox="-9 -9 768 168" role="img" aria-label="Cycle for">'
            f'<g fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round">{uses}</g>'
            f'<rect class="blank" x="652" y="114" width="98" height="36"/></svg>')


def main():
    shutil.rmtree(KIT, ignore_errors=True)
    (KIT / "th").mkdir(parents=True); (KIT / "full").mkdir()
    font = base64.b64encode((SITE / "fonts" / "overpass-latin.woff2").read_bytes()).decode()
    chips, secs = [], []
    for g, name, note, items in SECTIONS:
        chips.append(f'<a class="chip" href="#{g}">{name} <span>{len(items)}</span></a>')
        secs.append(f'<section id="{g}" class="sec"><h2>{name}</h2><p class="note">{note}</p>'
                    f'<div class="grid">{"".join(card(g, s, l) for s, l in items)}</div></section>')
    page = TEMPLATE.replace("%FONT%", font).replace("%MARK%", stencil_svg()).replace("%CHIPS%", "".join(chips)).replace("%SECTIONS%", "".join(secs))
    (KIT / "index.html").write_text(page)
    n = sum(1 for _ in (KIT / "full").iterdir())
    print(f"kit page: {n} files, {sum(f.stat().st_size for f in KIT.rglob('*') if f.is_file())/1e6:.1f} MB → {KIT}")


TEMPLATE = """<title>CFC Phone Kit</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
/* Lane Paint, as the site: concrete and asphalt grounds, hairlines, square corners, Overpass; rose is only the blank. */
@font-face{font-family:"Overpass CFC";font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,%FONT%) format("woff2")}
:root{
  --ground:#E1DFDB; --ground-2:#D7D5D0; --ink:#1C1A22; --mute:#4A4E55; --line:rgba(28,26,34,.22); --line-seen:#687F7C;
  --blank:#A84C58; --btn:#1C1A22; --btn-ink:#EFEDEA; --ok:#2C4F55; --warn:#8F3E4A; --tile:#EFEDEA;
  --type:"Overpass CFC","Overpass",system-ui,-apple-system,"Segoe UI",sans-serif;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --ground:#1C1A22; --ground-2:#24212A; --ink:#EFEDEA; --mute:#A9BDB8; --line:rgba(239,237,234,.18); --line-seen:#687F7C;
  --blank:#D9B1AA; --btn:#EFEDEA; --btn-ink:#1C1A22; --ok:#A9BDB8; --warn:#D9B1AA; --tile:#2E2A35; color-scheme:dark}}
:root[data-theme="dark"]{
  --ground:#1C1A22; --ground-2:#24212A; --ink:#EFEDEA; --mute:#A9BDB8; --line:rgba(239,237,234,.18); --line-seen:#687F7C;
  --blank:#D9B1AA; --btn:#EFEDEA; --btn-ink:#1C1A22; --ok:#A9BDB8; --warn:#D9B1AA; --tile:#2E2A35; color-scheme:dark}
*{box-sizing:border-box}
body{background:var(--ground);color:var(--ink);font-family:var(--type);font-size:16px;line-height:1.45;-webkit-text-size-adjust:100%;font-variant-numeric:lining-nums}
.wrap{max-width:1080px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:28px 64px}
.mark{display:block;width:min(100%,420px);height:auto;color:var(--ink)} .mark .blank{fill:var(--blank)}
h1{font-weight:800;font-size:clamp(30px,8vw,48px);line-height:1.04;letter-spacing:-.02em;margin:22px 0 0;text-wrap:balance}
.how{margin:12px 0 0;max-width:36em;color:var(--mute);font-size:17px}
.how b{color:var(--ink)}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin:20px 0 0}
.chip{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 14px;border:1.5px solid var(--line-seen);color:var(--ink);text-decoration:none;font-weight:700;font-size:15px}
.chip span{color:var(--mute);font-weight:400;font-variant-numeric:tabular-nums}
.chip:focus-visible,.save:focus-visible,.open:focus-visible{outline:3px solid var(--ink);outline-offset:2px}
.sec{margin-top:48px;scroll-margin-top:12px;border-top:2px solid var(--ink);padding-top:16px}
.sec h2{font-weight:800;font-size:clamp(24px,6vw,34px);line-height:1.1;letter-spacing:-.015em;margin:0;text-wrap:balance}
.note{margin:8px 0 18px;color:var(--mute);max-width:38em}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 12px}
@media (min-width:760px){.grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:32px 18px}}
.card{margin:0;display:flex;flex-direction:column;gap:8px;min-width:0}
.card.wide{grid-column:1/-1}
@media (min-width:760px){.card.wide{grid-column:span 2}}
.pic{max-width:100%;background:var(--ground-2);border:1px solid var(--line);overflow:hidden}
.pic.see{background-color:var(--tile);background-image:linear-gradient(45deg,var(--ground-2) 25%,transparent 25%,transparent 75%,var(--ground-2) 75%),linear-gradient(45deg,var(--ground-2) 25%,transparent 25%,transparent 75%,var(--ground-2) 75%);background-size:20px 20px;background-position:0 0,10px 10px;padding:10px}
.pic img{display:block;width:100%;height:100%;object-fit:contain;-webkit-touch-callout:default}
figcaption{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}
figcaption b{font-weight:700;font-size:15px;line-height:1.25}
figcaption small{color:var(--mute);font-size:13px}
figcaption .line{margin-top:2px;line-height:1.35}
.save{appearance:none;border:0;min-height:48px;width:100%;background:var(--btn);color:var(--btn-ink);font:800 13px/1 var(--type);letter-spacing:.04em;text-transform:uppercase;cursor:pointer}
.save--2{background:transparent;color:var(--ink);border:1.5px solid var(--ink)}
.save:active{transform:translateY(1px)}
.save[disabled]{opacity:.6;cursor:progress}
.open{display:none;color:var(--ink);font-weight:700;font-size:15px;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px}
.no-dl .open{display:inline-block;min-height:44px;line-height:44px}
.status{margin:0;min-height:1.2em;font-size:13px;color:var(--mute)}
.status.ok{color:var(--ok)} .status.warn{color:var(--warn)}
.fallback{display:none;margin:18px 0 0;padding:14px 16px;border:1.5px dashed var(--line-seen)}
.no-dl .fallback{display:block}
footer{margin-top:56px;padding-top:16px;border-top:1px solid var(--line);color:var(--mute);font-size:14px}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
</style>
<div class="wrap">
<header>
%MARK%
<h1>Print and social kit</h1>
<p class="how">Tap <b>Save</b> under a picture. On your iPhone, pick <b>Save Image</b> and it goes to Photos. PDFs save to Files.</p>
<p class="fallback">Saving doesn’t work in this view. Press and hold a picture, then tap <b>Save to Photos</b>. For a PDF, tap <b>Open the PDF</b>.</p>
<nav class="chips" aria-label="Sections">%CHIPS%</nav>
</header>
<main>%SECTIONS%</main>
<footer>Every number comes from the site’s own data: the count from Strava, the rides from the 2027 calendar, the stats from the stat bank with their sources. cycleforchange.org · @cycl_eforchange</footer>
</div>
<script>
(function(){
  var ready=(async function(){
    try{ if(!window.claude||!window.claude.use) return null; return await window.claude.use("downloads"); }catch(e){ return null; }
  })();
  function fallback(){
    document.body.classList.add("no-dl");
    document.querySelectorAll("img[data-full-src]").forEach(function(i){ if(i.dataset.fullSrc) i.src=i.dataset.fullSrc; });
  }
  ready.then(function(d){ if(!d) fallback(); });
  document.addEventListener("click",async function(ev){
    var b=ev.target.closest(".save"); if(!b) return;
    var st=b.parentElement.querySelector(".status");
    st.className="status"; b.disabled=true; st.textContent="Getting it ready\\u2026";
    try{
      var d=await ready;
      if(!d){ fallback(); st.className="status warn"; st.textContent="Press and hold the picture, then Save to Photos."; return; }
      var r=await fetch(b.dataset.full); if(!r.ok) throw {code:"fetch"};
      var blob=await r.blob();
      st.textContent="Choose Save\\u2026";
      await d.save({filename:b.dataset.name,data:blob});
      st.className="status ok"; st.textContent="Saved.";
    }catch(err){
      var c=err&&err.code;
      st.className="status warn";
      if(c==="declined") st.textContent="Not saved. Tap Save to try again.";
      else if(c==="rate_limited") st.textContent="One at a time. Finish the open one, then tap Save.";
      else { fallback(); st.textContent="That didn\\u2019t save. Press and hold the picture, then Save to Photos."; }
    }finally{ b.disabled=false; }
  });
})();
</script>
"""

if __name__ == "__main__":
    main()
