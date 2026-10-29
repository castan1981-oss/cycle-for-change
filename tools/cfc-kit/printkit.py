"""Reel overlays, print and stickers for the Cycle for Change kit, in the site's look.

Print is laid out in CSS px at 96 to the inch and saved by Chromium as PDF, so the type and the QR codes stay vector.
QR codes go to short links in netlify.toml (/hi, /gr, /2027, /cf), tagged utm_campaign=cfc-kit, so the scans can be
counted; on the stat cards they go to the stat's own source. Stickers and cards carry 1/8 in of bleed on every side.
"""
import json
from lib import *
from social import when, kind, FOR, MON

SHORT = "https://cycleforchange.org"


# ——————————————————————————— reel overlays ———————————————————————————
# Each sits on its own flat tar block (a sign, not a scrim) so it reads over any footage; outside the block is see-through.
def _block(inner, w, h, pad=34):
    css = f".blk{{position:absolute;left:0;top:0;background:{T['tar']};padding:{pad}px {pad+6}px {pad-4}px}}"
    return page(f'<div class="blk">{inner}</div>', css, w, h)


def reel(word, mi):
    out = {}
    out["reel-1-the-sign.png"] = (_block(stencil(640, T["plaster"], T["powder"]), 744, 214), 744, 214, True)
    wrap = len(word) > 8
    k = 520 / 640
    plate_w = 0.62 * 150 * k * 0.58 * len(word) + 60   # rough: wide enough for the plate on one line under the stencil
    w2 = int(max(600, plate_w + 90)) if wrap else int(600 + plate_w)
    h2 = 380 if wrap else 270
    out["reel-2-today-i-rode-for.png"] = (_block(
        f'<p class="label" style="color:{T["patina"]};font-size:30px;margin-bottom:20px">Today I rode for</p>'
        f'{sign(520, T["plaster"], T["powder"], T["asphalt"], word, wrap=wrap)}', w2, h2), w2, h2, True)
    out["reel-3-the-count.png"] = (_block(
        f'<p class="num" style="color:{T["plaster"]};font-size:132px">{fmt_int(mi)}</p>'
        f'<p style="color:{T["patina"]};font-weight:700;font-size:30px;margin-top:16px;max-width:640px;line-height:1.2">{esc(season_words())}</p>',
        720, 320), 720, 320, True)
    out["reel-4-the-link.png"] = (_block(
        f'<p style="color:{T["plaster"]};font-weight:800;font-size:46px;letter-spacing:-.01em">cycleforchange.org</p>'
        f'<p style="color:{T["patina"]};font-weight:700;font-size:32px;margin-top:10px">@cycl_eforchange</p>', 560, 190), 560, 190, True)
    end = (f'<div style="position:absolute;left:72px;top:520px">{stencil(700, T["plaster"], T["powder"], stacked=True)}'
           f'<p style="color:{T["plaster"]};font-weight:800;font-size:62px;letter-spacing:-.018em;line-height:1.04;margin-top:96px">'
           f'10,000 miles. One year.<br>All on the bike.</p>'
           f'<p style="color:{T["patina"]};font-weight:700;font-size:36px;margin-top:48px">cycleforchange.org<br>@cycl_eforchange</p></div>')
    out["reel-5-end-card.jpg"] = (page(end, "", 1080, 1920, T["asphalt"]), 1080, 1920, False)
    return out


# ——————————————————————————— print ———————————————————————————
def qr_block(url, size, head, line, ink, soft, light):
    return (f'<div style="display:flex;gap:18px;align-items:flex-start">{qr_svg(url, dark=T["asphalt"], light=light, size=size)}'
            f'<div style="padding-top:4px"><p style="font-weight:800;font-size:22px;color:{ink};letter-spacing:-.01em;line-height:1.1">{esc(head)}</p>'
            f'<p style="font-size:14px;color:{soft};margin-top:8px;line-height:1.35;max-width:220px">{esc(line)}</p></div></div>')


def flyer():
    """8.5 x 11. Light ground so it prints well at home; the photo edge to edge on top. QR codes a third of an inch in."""
    n, abroad = ride_counts()
    nrides = len(riding())
    body = (f'<img class="ph" src="{photo_uri("photos/robert-camelback.jpg")}" style="height:500px;object-position:50% 32%">'
            f'<div style="position:absolute;left:48px;right:48px;top:540px">'
            f'{stencil(520, T["asphalt"], T["rose"])}'
            f'<p style="font-weight:800;font-size:40px;color:{T["asphalt"]};letter-spacing:-.018em;line-height:1.06;margin-top:28px">'
            f'10,000 miles. One year.<br>All on the bike.</p>'
            f'<p style="font-size:17px;color:{T["gunmetal"]};margin-top:16px;max-width:600px;line-height:1.4">'
            f'I’d like to say I ride for everyone else. I ride because it changed me.</p>'
            f'<div class="hair" style="margin:30px 0 26px;opacity:1;border-color:{T["asphalt"]};border-top-width:1.5px"></div>'
            f'<div style="display:flex;justify-content:space-between;gap:24px">'
            f'{qr_block(SHORT + "/gr", 104, "Find a group ride.", f"{fmt_int(n)} group rides, each with the date it was last checked.", T["asphalt"], T["gunmetal"], T["plaster"])}'
            f'{qr_block(SHORT + "/2027", 104, "Ride with me.", f"The {nrides} rides I’m doing in 2027, with sign-up links.", T["asphalt"], T["gunmetal"], T["plaster"])}'
            f'</div></div>'
            f'<div style="position:absolute;left:48px;right:48px;bottom:40px;display:flex;justify-content:space-between;font-weight:700;font-size:15px;color:{T["gunmetal"]}">'
            f'<span>cycleforchange.org</span><span>@cycl_eforchange</span></div>')
    return page(body, "", 816, 1056, T["concrete"], print_size="8.5in 11in")


def _map_html(rides, width):
    """The homepage's 2027 map (img/home/map-2027.svg, drawn by build-home.js) with the same numbered squares."""
    m = json.load(open(ROOT / "data" / "geo" / "home-2027.json"))
    B = m["box"]
    nudge = {"recovery-ride": [-11, -24], "cycle-to-zero": [34, -13], "tour-de-palm-springs": [14, 6],
             "belgian-waffle-ride-arizona": [30, -4], "chino-grinder": [-6, -14], "el-tour-de-tucson": [6, 10]}  # build-home.js NUDGE
    h = width * B["h"] / B["w"]
    lead, dots = [], []
    for i, r in enumerate(rides):
        pts = m["rides"].get(r["slug"])
        if not pts:
            continue
        nx, ny = nudge.get(r["slug"], [0, 0])
        x0, y0 = pts[0]["xy"]; x, y = x0 + nx, y0 + ny
        if nx or ny:
            lead.append(f'<path d="M{x0} {y0}L{x} {y}"/>')
        soft = r["status"] != "confirmed"
        px, py = (x - B["x"]) / B["w"] * width, (y - B["y"]) / B["h"] * h
        st = (f'background:{T["plaster"]};color:{T["gunmetal"]};outline:1.5px dashed {T["patina_deep"]};outline-offset:-1.5px' if soft
              else f'background:{T["asphalt"]};color:{T["plaster"]}')
        dots.append(f'<span style="position:absolute;left:{px-13:.1f}px;top:{py-13:.1f}px;width:26px;height:26px;display:grid;place-items:center;'
                    f'font-weight:800;font-size:13px;{st}">{i+1}</span>')
    hx, hy = m["home"]["xy"]
    svg = (f'<svg viewBox="{B["x"]} {B["y"]} {B["w"]} {B["h"]}" width="{width}" height="{h:.0f}" style="position:absolute;left:0;top:0">'
           f'<path d="{m["states"]}" fill="{T["plaster"]}" stroke="{T["patina_deep"]}" stroke-width=".7" stroke-linejoin="round"/>'
           f'<g fill="none" stroke="{T["asphalt"]}" stroke-width="1.2">{"".join(lead)}</g>'
           f'<rect x="{hx-5}" y="{hy-5}" width="10" height="10" fill="{T["asphalt"]}"/></svg>')
    return f'<div style="position:relative;flex:none;width:{width}px;height:{h:.0f}px">{svg}{"".join(dots)}</div>'


def poster(rides, lottery=()):
    """11 x 17: the 2027 rides, the map and the list, as the homepage has them."""
    rows = []
    for i, r in enumerate(rides):
        soft = r["status"] != "confirmed"
        note = "date projected" if r["status"] == "projected" else "2027 dates to come" if r["status"] == "tba" else \
               "entry by lottery" if r["slug"] in lottery else ""
        line = " · ".join(x for x in [r["where"], kind(r), note] if x)
        mon, days = when(r)
        pl = (f' <span class="plate" style="background:{T["rose"]};color:{T["plaster"]};font-size:13px;padding:4px 6px 2px;vertical-align:2px">'
              f'{esc(FOR[r["slug"]])}</span>') if r["slug"] in FOR else ""
        rows.append(
            f'<li style="display:flex;gap:12px;align-items:center;opacity:{.66 if soft else 1}">'
            f'<span class="num" style="flex:none;width:22px;font-size:15px;color:{T["gunmetal"]};letter-spacing:0">{i+1}</span>'
            f'<span style="flex:none;width:58px;height:54px;border:1.5px {"dashed" if soft else "solid"} {T["asphalt"]};display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1">'
            f'<span style="font-size:12px;font-weight:700">{mon}</span><span class="num" style="font-size:{17 if len(days)>4 else 21}px;margin-top:3px;letter-spacing:-.02em">{days}</span></span>'
            f'<span style="min-width:0"><b style="font-size:18px;font-weight:800;display:block;white-space:nowrap">{esc(r["name"])}{pl}</b>'
            f'<span style="font-size:13px;color:{T["gunmetal"]};display:block;margin-top:3px">{esc(line)}</span></span></li>')
    half = -(-len(rides) // 2)
    n_proj = sum(r["status"] == "projected" for r in rides); n_tba = sum(r["status"] == "tba" for r in rides)
    words = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen"]
    w = lambda k: words[k] if k < len(words) else str(k)
    bits = []
    if n_proj: bits.append(f'{w(n_proj).lower()} {"sits" if n_proj == 1 else "sit"} on the 2026 weekend until the organizer posts 2027')
    if n_tba: bits.append(f'{w(n_tba).lower()} {"hasn\u2019t" if n_tba == 1 else "haven\u2019t"} put out 2027 dates yet')
    note = f'{w(len(rides) - n_proj - n_tba)} with dates from the organizer' + ("; " + "; ".join(bits) if bits else "") + "."
    body = (f'<div style="position:absolute;left:64px;right:64px;top:60px;color:{T["asphalt"]}">'
            f'{stencil(440, T["asphalt"], T["rose"])}'
            f'<p style="font-weight:800;font-size:70px;letter-spacing:-.022em;line-height:1;margin-top:44px">The 2027 rides<br>I\u2019m doing.</p>'
            f'<p style="font-size:23px;color:{T["gunmetal"]};margin-top:18px">Part of the 10,000 miles. Come ride one.</p>'
            f'<div style="display:flex;gap:28px;align-items:flex-start;margin-top:34px">{_map_html(rides, 690)}'
            f'<div style="padding-top:30px;font-size:14px;line-height:1.4;color:{T["gunmetal"]}">'
            f'<p style="display:flex;gap:8px;align-items:center;font-weight:700;color:{T["asphalt"]}"><span style="width:10px;height:10px;background:{T["asphalt"]};display:inline-block"></span>Phoenix</p>'
            f'<p style="margin-top:12px">{esc(note)}</p></div></div>'
            f'<div class="hair" style="margin:26px 0 24px;opacity:1;border-color:{T["asphalt"]};border-top-width:2px"></div>'
            f'<ol style="list-style:none;display:grid;grid-template-columns:1fr 1fr;grid-auto-flow:column;grid-template-rows:repeat({half},auto);gap:14px 28px">{"".join(rows)}</ol>'
            f'</div>'
            f'<div style="position:absolute;left:64px;right:64px;bottom:52px;display:flex;justify-content:space-between;align-items:flex-end">'
            f'{qr_block(SHORT + "/2027", 112, "Dates and sign-up links", "cycleforchange.org/2027", T["asphalt"], T["gunmetal"], T["plaster"])}'
            f'<p style="font-weight:700;font-size:17px;color:{T["gunmetal"]};text-align:right">cycleforchange.org<br>@cycl_eforchange</p></div>')
    return page(body, "", 1056, 1632, T["concrete"], print_size="11in 17in")


CARD_GROUND = {"harm": (T["asphalt"], T["plaster"], T["patina"], T["powder"], T["plaster"]),
               "hope": (T["patina"], T["asphalt"], T["pool"], T["rose"], T["plaster"]),
               "visibility": (T["concrete"], T["asphalt"], T["gunmetal"], T["rose"], T["plaster"])}


def cards(bank):
    """Every stat as a 5 x 7 card to carry on rides: the number, the line, why it matters, the source with its own QR,
    the catch. Mental-health stats carry 988 and Trevor. One PDF, a page per card, 5.25 x 7.25 in with the bleed."""
    pages = []
    for s in bank:
        bg, ink, soft, bar, tile = CARD_GROUND[s["type"]]
        src = f'{s["org"]}. {s["report"]}. {s["year"]}.'
        help_ = (f'<p style="font-size:11.5px;font-weight:700;color:{ink};margin-top:8px;line-height:1.3">{esc(HELP)}</p>'
                 if s.get("mh") else "")
        pages.append(
            f'<section class="card" style="background:{bg}">'
            f'<div style="position:absolute;left:36px;right:36px;top:40px;color:{ink}">'
            f'<div style="display:flex;justify-content:space-between;align-items:baseline">'
            f'<p style="font-weight:700;font-size:14px;color:{soft}">{esc(TYPE_LABEL[s["type"]])}</p>'
            f'{stencil(110, ink, bar)}</div>'
            f'<p class="num" data-fit="432" style="font-size:150px;margin-top:30px;white-space:nowrap">{esc(s["number"])}</p>'
            f'<p data-fit="432" data-fith="176" style="font-weight:700;font-size:23px;line-height:1.22;margin-top:26px;letter-spacing:-.006em">{esc(s["stat"])}</p>'
            f'<p data-fit="432" data-fith="70" style="font-size:16px;line-height:1.35;margin-top:14px;color:{soft}">{esc(s["why"])}</p></div>'
            f'<div style="position:absolute;left:36px;right:36px;bottom:38px;color:{ink}">'
            f'<div style="display:flex;gap:14px;align-items:flex-end">'
            f'<div style="flex:1;min-width:0"><p data-fit="318" data-fith="64" style="font-size:10.5px;line-height:1.38;color:{soft}">Source: {esc(src)}</p>'
            f'<p style="font-size:10.5px;line-height:1.38;color:{soft};margin-top:4px">{esc(s["caveat"])}</p></div>'
            f'{qr_svg(s["url"], dark=T["asphalt"], light=tile, size=100, quiet=2)}</div>{help_}</div>'
            f'</section>')
    css = (".card{position:relative;width:504px;height:696px;overflow:hidden;break-after:page}"
           ".card:last-child{break-after:auto}")
    # one long document: each card is a 5.25 x 7.25 in page
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{font_css()}{BASE_CSS}@page{{size:5.25in 7.25in;margin:0}}{css}</style></head>'
            f'<body>{"".join(pages)}{FIT}</body></html>')


# ——————————————————————————— stickers ———————————————————————————
def stickers():
    """3 x 2 and 3 x 3 in, each with 1/8 in of bleed (so the page is 3.25 x 2.25 / 3.25 x 3.25)."""
    out = {}
    # CYCLE FOR ___ : a blank plate to write on with a marker
    out["sticker-cycle-for-blank-3x2"] = (page(
        f'<div style="position:absolute;left:31px;top:38px">{stencil(220, T["plaster"])}'
        f'<div style="margin-top:14px;width:250px;height:72px;background:{T["powder"]}"></div></div>',
        "", 312, 216, T["asphalt"], print_size="3.25in 2.25in"), 3.25, 2.25)
    # 10K: the wearable mark, on the rose plate (the stencil only ever spells CYCLE FOR)
    out["sticker-10k-3x3"] = (page(
        f'<div style="position:absolute;left:34px;top:36px">{stencil(200, T["plaster"])}'
        f'<span class="plate" style="background:{T["powder"]};color:{T["asphalt"]};font-size:112px;padding:16px 16px 4px;margin-top:22px;letter-spacing:-.03em">10K</span>'
        f'<p style="color:{T["patina"]};font-weight:700;font-size:15px;margin-top:16px;line-height:1.3">10,000 miles in 2027.<br>All on the bike.</p></div>',
        "", 312, 312, T["asphalt"], print_size="3.25in 3.25in"), 3.25, 3.25)
    # Who do you cycle for? with the QR to /cyclefor/
    out["sticker-who-do-you-cycle-for-3x3"] = (page(
        f'<div style="position:absolute;left:34px;right:34px;top:34px;color:{T["asphalt"]}">'
        f'{stencil(120, T["asphalt"], T["rose"])}'
        f'<p style="font-weight:800;font-size:31px;letter-spacing:-.015em;line-height:1.04;margin-top:16px">Who do you<br>cycle for?</p>'
        f'<div style="display:flex;gap:12px;align-items:flex-end;margin-top:14px">{qr_svg(SHORT + "/cf", light=T["plaster"], size=96)}'
        f'<p style="font-size:12.5px;font-weight:700;line-height:1.3;color:{T["gunmetal"]}">Say it on video.<br>Five seconds.</p></div></div>',
        "", 312, 312, T["concrete"], print_size="3.25in 3.25in"), 3.25, 3.25)
    return out
