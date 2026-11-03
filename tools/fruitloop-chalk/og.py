"""The Fruit Loop share card in chalk: python3 tools/fruitloop-chalk/og.py <N> -> cfc-site/og-fruitloop-<N>.jpg (1200 x 630).
What a link preview shows when someone shares /fruitloop/. Same words as the flyer (Robert's rules, Oct 27)."""
import asyncio, os, sys
from post import blk, scr, FIT
from lib import *
N=sys.argv[1] if len(sys.argv)>1 else sys.exit(__doc__)
W,Hh=1200,630
html=f'''<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}
.b{{position:relative;filter:url(#chalk7);-webkit-text-stroke:var(--sw) currentColor;white-space:nowrap;width:max-content}}
.col{{display:flex;flex-direction:column;align-items:center}} .scr{{position:static}}</style></head><body>{DEFS}
<div class="fl" style="width:{W}px;height:{Hh}px;background:#1A181E;display:flex;flex-direction:column;align-items:center">
<img src="{T}/logo-1-night.png" style="width:900px;display:block;margin-top:34px">
<div class="col" style="margin-top:14px">{blk('STARTS FRIDAY, DEC 11',66,C['rose'],11,sw='3.4px')}{scr(560,C['yellow'],12,h=20,sw=12)}
{blk('MEET 5:30 PM · THE RAINBOW CROSSWALK, CENTRAL & PORTLAND',30,C['white'],13,sw='2px',fl=5,fit=1100)}</div></div>{FIT}</body></html>'''
out=os.path.join(H,'out','og.png')
asyncio.run(shoot(html,out,W,Hh))
from PIL import Image
Image.open(out).convert('RGB').save(os.path.join(ROOT,'cfc-site',f'og-fruitloop-{N}.jpg'),quality=88,optimize=True)
print('wrote og-fruitloop-'+N)
