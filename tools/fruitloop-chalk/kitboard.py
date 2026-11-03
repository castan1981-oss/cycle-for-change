import asyncio
from post import blk, scr, row, FIT
from lib import *
W,Hh=2240,1000
sw=[('NIGHT','#1A181E'),('CHALK WHITE',C['white']),('PINK',C['rose']),('YELLOW',C['yellow']),('SKY BLUE',C['cyan']),('BLUE',C['blue']),('ORANGE',C['orange']),('GREEN',C['green']),('PURPLE',C['purple'])]
sw_html=''.join(f'''<div style="display:flex;flex-direction:column;gap:6px;width:160px">
<div style="height:90px;background:{c};{'outline:2px solid #4A4E55;' if n=='NIGHT' else ''}filter:url(#chalk11)"></div>
{blk(n,22,C['white'],70+i,sw='1.5px',fl=5)}{blk(c.upper(),20,'#A9BDB8',90+i,sw='1.1px',fl=5)}</div>''' for i,(n,c) in enumerate(sw))
scribs=''.join(f'<div style="margin-right:18px">{scribble(220,c,200+i,h=20,sw=10)}</div>' for i,(_,c) in enumerate(sw[2:]))
icons=''.join(f'<div style="position:relative;width:90px;height:90px">{icon(n,c,90,2.4)}</div>' for n,c in [('pin',C['rose']),('bike',C['rose']),('light',C['green'])])
html=f'''<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}
.b{{position:relative;filter:url(#chalk7);-webkit-text-stroke:var(--sw) currentColor;white-space:nowrap;width:max-content}}
.scr{{position:static}}
</style></head><body>{DEFS}<div class="fl" style="width:{W}px;height:{Hh}px;background:#1A181E;padding:90px 100px;display:grid;grid-template-columns:1080px 1fr;gap:80px">
<div style="display:flex;flex-direction:column;gap:60px">
<img src="{T}/logo-1-night.png" style="width:1080px;display:block">
<div style="display:flex;flex-direction:column;gap:4px">
{blk('STARTS',64,C['yellow'],1,sw='3.2px')}{scr(200,C['rose'],2)}
{blk('FRIDAY, DEC 11',96,C['rose'],21,sw='4px')}{scr(560,C['yellow'],22,h=22,sw=12)}
{blk('MEET 5:30 PM · ROLL 6:00 PM',48,C['white'],5,sw='3px',mt=6)}{scr(520,C['blue'],6)}
</div></div>
<div style="display:flex;flex-direction:column;gap:46px">
<div>{blk('THE LETTERING',34,C['white'],301,sw='2.2px',fl=5)}{blk('WALTER TURNCOAT, ALL CAPS, A LITTLE CHALK GRAIN',24,'#A9BDB8',302,sw='1.4px',fl=5,mt=8)}</div>
<div style="display:grid;grid-template-columns:repeat(5,160px);gap:28px 20px">{sw_html}</div>
<div>{blk('THE SCRIBBLE UNDER A LINE',30,C['white'],303,sw='2px',fl=5)}<div style="display:flex;flex-wrap:wrap;margin-top:14px">{scribs}</div></div>
<div>{blk('THE MARKS',30,C['white'],304,sw='2px',fl=5)}<div style="display:flex;gap:40px;margin-top:14px">{icons}</div></div>
</div></div>{FIT}</body></html>'''
asyncio.run(shoot(html,os.path.join(H,'out/kit-board.png'),W,Hh))
