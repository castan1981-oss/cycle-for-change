import random, math, os, asyncio
HERE=os.path.dirname(os.path.abspath(__file__))
ROOT=os.path.abspath(os.path.join(HERE,'..','..'))
T=os.path.join(ROOT,'templates','fruitloop')
H=os.path.join(HERE,'.build')  # scratch: backgrounds and renders, never committed
os.makedirs(os.path.join(H,'out'),exist_ok=True)
C=dict(white='#F4F1EC',rose='#F0679A',pink='#F6A4B9',yellow='#FFD04D',cyan='#27BFEA',green='#4CC27E',blue='#3A73E0',purple='#9B55CC',red='#E8443A',orange='#F28A2E')
FONT=f"@font-face{{font-family:'chalk';src:url('{T}/walter-turncoat.woff2')}}"
def chalk_filter(seed=7,freq=1.15,disp=4,a=-3.1,b=2.15):
    return f'''<filter id="chalk{seed}" x="-5%" y="-15%" width="110%" height="130%">
<feTurbulence type="fractalNoise" baseFrequency="{freq} {freq*0.55:.2f}" numOctaves="2" seed="{seed}" result="n"/>
<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 {a} {b}" result="m"/>
<feComposite in="SourceGraphic" in2="m" operator="in" result="t"/>
<feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="{seed+3}" result="w"/>
<feDisplacementMap in="t" in2="w" scale="{disp}" xChannelSelector="R" yChannelSelector="G"/>
</filter>'''
DEFS='<svg width="0" height="0" style="position:absolute"><defs>'+chalk_filter(7,1.1,3,-2.7,2.25)+chalk_filter(11,1.3,3,-3.0,2.2)+chalk_filter(5,1.4,2,-2.2,2.3)+'</defs></svg>'
def jit(s,seed,amp=1.0):
    r=random.Random(seed); out=''
    for ch in s:
        if ch==' ': out+='<span class="sp"> </span>'; continue
        if ch==',': out+='<span class="j" style="transform:translateY(1px) scale(1.3);margin-left:-.04em;margin-right:.02em">,</span>'; continue
        out+=f'<span class="j" style="transform:translateY({r.uniform(-2.2,2.2)*amp:.1f}px) rotate({r.uniform(-3.5,3.5)*amp:.1f}deg) scale({r.uniform(.94,1.06):.2f})">{ch}</span>'
    return out
def lines(txt,seed,amp=1.0):
    return '<br>'.join(jit(t,seed*31+i,amp) for i,t in enumerate(txt.split('\n')))
def scribble(w,color,seed,h=26,strokes=4,sw=9,tilt=-2.0):
    """A crayon swash: a few overlapping wobbly strokes, like the flyer's underlines."""
    r=random.Random(seed); ps=[]
    for k in range(strokes):
        y0=h/2+r.uniform(-h*.28,h*.28); x0=r.uniform(0,w*.06); x1=w-r.uniform(0,w*.06)
        sl=math.tan(math.radians(tilt+r.uniform(-1.2,1.2)))*w
        c1=(x0+(x1-x0)*.33, y0+sl*.33+r.uniform(-4,4)); c2=(x0+(x1-x0)*.66, y0+sl*.66+r.uniform(-4,4))
        ps.append(f'<path d="M{x0:.1f} {y0:.1f} C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {x1:.1f} {y0+sl:.1f}" stroke-width="{sw*r.uniform(.7,1.15):.1f}"/>')
    pad=12
    return f'<svg class="scr" width="{w}" height="{h+pad*2}" viewBox="0 {-pad} {w} {h+pad*2}" style="color:{color}"><g fill="none" stroke="currentColor" stroke-linecap="round" filter="url(#chalk11)">{"".join(ps)}</g></svg>'
ICONS={
 'pin':'<path d="M12 22s-7-7.2-7-12.2A7 7 0 0 1 19 9.8C19 14.8 12 22 12 22z"/><circle cx="12" cy="9.8" r="2.6"/>',
 'bike':'<circle cx="5.5" cy="15.5" r="4"/><circle cx="18.5" cy="15.5" r="4"/><path d="M5.5 15.5 9.5 8h6l3 7.5M9.5 8l3.5 7.5h-7.5M8.5 5.5h3M15.5 8l-1-2.5h2.5"/>',
 'light':'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/><path d="M12 0.5v-0M3 9H1.5M22.5 9H21M5 3.5 4 2.5M19 3.5l1-1"/>',
}
def icon(name,color,size=60,sw=2.7):
    return f'<svg class="ic" width="{size}" height="{size}" viewBox="-1 -1 26 26" style="color:{color}"><g fill="none" stroke="currentColor" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" filter="url(#chalk11)">{ICONS[name]}</g></svg>'
BASE_CSS=FONT+'''
*{box-sizing:border-box} body{margin:0}
.fl{position:relative;overflow:hidden;font-family:'chalk';color:#F4F1EC;text-transform:uppercase}
.t{position:absolute;filter:url(#chalk7);-webkit-text-stroke:var(--sw,2.4px) currentColor;line-height:1.02;white-space:nowrap}
.j{display:inline-block} .sp{display:inline-block;width:.32em}
.scr{display:block;position:absolute;overflow:visible}
.ic{position:absolute;overflow:visible}
'''
async def shoot(html,path,W,Hh,scale=1,transparent=False):
    from playwright.async_api import async_playwright
    f=os.path.join(H,'_tmp.html'); open(f,'w').write(html)
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':W,'height':Hh},device_scale_factor=scale)
        await pg.goto('file://'+f); await pg.wait_for_timeout(700)
        await pg.screenshot(path=path,clip={'x':0,'y':0,'width':W,'height':Hh},omit_background=transparent); await b.close()
