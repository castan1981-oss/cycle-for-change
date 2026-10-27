"""Ink ground + Robert's real photo with the background burned down and its edges feathered into the ink.
Nothing is generated: every pixel of the photo is his, only darker away from him."""
import numpy as np, cv2, sys, json
from PIL import Image
from lib import T, H as BUILD
INK=np.array([0x1A,0x18,0x1E],np.float32)/255
def build(W,H,scale,left,top,feather=150,burn=0.34,out='bg.png',feather_bottom=False):
    ph=np.asarray(Image.open(T+'/photo-red-dress-1.png').convert('RGB')).astype(np.float32)/255
    m1=np.asarray(Image.open(T+'/photo-red-dress-1-mask-a.png').convert('L')).astype(np.float32)/255
    m2=np.asarray(Image.open(T+'/photo-red-dress-1-mask-b.png').convert('L')).astype(np.float32)/255
    m2=cv2.erode(m2,np.ones((9,9),np.uint8)); m2=cv2.GaussianBlur(m2,(0,0),2)
    m=np.maximum(m1,m2)
    h,w,_=ph.shape; nw,nh=int(round(w*scale)),int(round(h*scale))
    ph=cv2.resize(ph,(nw,nh),interpolation=cv2.INTER_AREA if scale<1 else cv2.INTER_CUBIC)
    m=cv2.resize(m,(nw,nh),interpolation=cv2.INTER_LINEAR)
    grey=ph.mean(2,keepdims=True)
    bgc=(ph*0.55+grey*0.45)*burn
    pm=m[...,None]
    comp=ph*pm+bgc*(1-pm)
    # edge feather for the background only
    yy,xx=np.mgrid[0:nh,0:nw].astype(np.float32)
    f=np.ones((nh,nw),np.float32)
    f=np.minimum(f,np.clip(xx/feather,0,1)); f=np.minimum(f,np.clip((nw-1-xx)/feather,0,1)); f=np.minimum(f,np.clip(yy/feather,0,1))
    if feather_bottom: f=np.minimum(f,np.clip((nh-1-yy)/feather,0,1))
    f=f*f*(3-2*f)
    a=np.maximum(f,m)[...,None]
    canvas=np.ones((H,W,3),np.float32)*INK
    # paste with clipping
    x0,y0=left,top; x1,y1=x0+nw,y0+nh
    cx0,cy0=max(0,x0),max(0,y0); cx1,cy1=min(W,x1),min(H,y1)
    sx0,sy0=cx0-x0,cy0-y0
    reg=canvas[cy0:cy1,cx0:cx1]
    src=comp[sy0:sy0+(cy1-cy0),sx0:sx0+(cx1-cx0)]; al=a[sy0:sy0+(cy1-cy0),sx0:sx0+(cx1-cx0)]
    canvas[cy0:cy1,cx0:cx1]=reg*(1-al)+src*al
    Image.fromarray((np.clip(canvas,0,1)*255).astype(np.uint8)).save(BUILD+'/'+out)
if __name__=='__main__':
    a=json.loads(sys.argv[1]); build(**a)
