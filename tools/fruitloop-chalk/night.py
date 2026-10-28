"""The white chalk version of Robert's crayon logo, made from his own file: black crayon -> chalk white,
coloured crayon kept, the paper dropped, the white bands of the chevron and the trans O filled in.
Writes templates/fruitloop/logo-1-night.png. Nothing is redrawn."""
import numpy as np, cv2
from PIL import Image
from lib import T, H
src=np.asarray(Image.open(T+'/logo-1.png').convert('RGB')).astype(np.float32)/255
H,W,_=src.shape
paper=np.array([0xF5,0xF3,0xEE],np.float32)/255
lum=src@np.array([.299,.587,.114],np.float32); plum=float(paper@np.array([.299,.587,.114]))
chroma=src.max(2)-src.min(2)
dark=np.clip((plum-lum)/plum,0,1)
white=np.array([0xF4,0xF1,0xEC],np.float32)/255
colm=(chroma>0.09)
blk=(~colm)
out=np.zeros_like(src); A=np.zeros((H,W),np.float32)
# black crayon -> chalk white, alpha from how dark
a_b=np.clip(dark*1.35,0,1)
out[blk]=white; A[blk]=a_b[blk]
# coloured crayon keeps its colour, alpha from coverage
a_c=np.clip(np.maximum(chroma*5,dark*1.35),0,1)
out[colm]=src[colm]; A[colm]=a_c[colm]
# white bands inside the chevron and the trans O: close the coloured mask in those boxes only
fill=np.zeros((H,W),bool)
tri=np.zeros((H,W),np.uint8); cv2.fillPoly(tri,[np.array([[104,175],[104,605],[415,387]],np.int32)],1)
ring=np.zeros((H,W),np.uint8); cv2.rectangle(ring,(1395,300),(1575,425),1,-1)
for reg,k,amin in [(tri,41,900),(ring,45,120)]:
    m=(colm&(reg>0)).astype(np.uint8)
    c=cv2.morphologyEx(m,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(k,k)))
    f=((c>0)&(m==0)&(dark<0.25)&(reg>0)).astype(np.uint8)
    n,lab,st,_=cv2.connectedComponentsWithStats(f,8)
    for i in range(1,n):
        if st[i,cv2.CC_STAT_AREA]>amin: fill|=(lab==i)
rng=np.random.default_rng(3)
nz=cv2.GaussianBlur(rng.random((H,W)).astype(np.float32),(0,0),0.9); nz=(nz-nz.min())/(nz.max()-nz.min())
out[fill]=white; A[fill]=np.clip(0.62+0.8*nz[fill],0,1)
Image.fromarray((np.dstack([out,A])*255).astype(np.uint8),'RGBA').save(T+'/logo-1-night.png')
bg=Image.new('RGBA',(W,H),(20,18,24,255)); bg.alpha_composite(Image.open(T+'/logo-1-night.png')); bg.convert('RGB').save(H+'/logo-night-ondark.jpg',quality=92)

