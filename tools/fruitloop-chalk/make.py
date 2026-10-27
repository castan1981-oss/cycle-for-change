"""The Fruit Loop chalk flyer, three sizes, plus the reel overlays.

    python3 tools/fruitloop-chalk/make.py <N>

Writes cfc-site/fruitloop/poster-<N>.jpg/.webp/.avif (1080 x 1350), story-<N>.jpg (1080 x 1920) and
print-<N>.pdf (8.5 x 11, QR to /fl, a third of an inch clear of the edge), and the reel overlays into
tools/fruitloop-chalk/.build/out/. Robert's real photo (templates/fruitloop/photo-red-dress-1.png) with the
background darkened through his own cut-out masks (rembg, made once, committed), his logo in white chalk
(night.py), Walter Turncoat for the lettering (Apache 2.0). Needs Playwright, Pillow, OpenCV, qrcode.
"""
import os, sys, subprocess, json
HERE=os.path.dirname(os.path.abspath(__file__))
ROOT=os.path.abspath(os.path.join(HERE,'..','..'))
N=sys.argv[1] if len(sys.argv)>1 else sys.exit(__doc__)
def run(*a): subprocess.run(['python3',*a],cwd=HERE,check=True)
run('bg.py',json.dumps({"W":1080,"H":1350,"scale":0.70,"left":110,"top":266,"out":"bg-post.png","feather":200,"burn":0.28}))
run('post.py','out/post.png'); run('story.py'); run('printpg.py'); run('reel.py')
from PIL import Image
import cv2
B=os.path.join(HERE,'.build','out'); O=os.path.join(ROOT,'cfc-site','fruitloop')
post=Image.open(os.path.join(B,'post.png')).convert('RGB')
post.save(os.path.join(O,f'poster-{N}.jpg'),quality=88,subsampling=0,optimize=True)
post.save(os.path.join(O,f'poster-{N}.webp'),quality=80)
post.save(os.path.join(O,f'poster-{N}.avif'),quality=55)
Image.open(os.path.join(B,'story.png')).convert('RGB').save(os.path.join(O,f'story-{N}.jpg'),quality=88,subsampling=0,optimize=True)
p=Image.open(os.path.join(B,'print.png')).convert('RGB'); k=0.93
sc=p.resize((int(p.width*k),int(p.height*k)),Image.LANCZOS)
pg=Image.new('RGB',p.size,(0x1A,0x18,0x1E)); pg.paste(sc,((p.width-sc.width)//2,(p.height-sc.height)//2))
f=os.path.join(O,f'print-{N}.pdf'); pg.save(f,resolution=pg.width/8.5)
pg.save(os.path.join(B,'print-safe.png'))
qr=cv2.QRCodeDetector().detectAndDecode(cv2.imread(os.path.join(B,'print-safe.png')))[0]
assert qr=='https://cycleforchange.org/fl', qr
print('wrote poster, story and print', N, '· QR', qr)
