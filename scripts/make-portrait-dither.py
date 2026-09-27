"""Portrait to a 1-bit dither with the white background cut out.

    python scripts/make-portrait-dither.py SRC OUT --size 600 --algo atkinson --ink dark

--ink dark   black dots on transparent (for paper sections)
--ink light  paper dots on transparent (for black sections)
--algo       bayer | floyd | atkinson

Tone is prepared before dithering, because a 1-bit image keeps only what the
grayscale already separates: contrast is stretched on the subject alone, local
contrast is lifted so eyes and mouth survive, and an unsharp mask sharpens
edges the dither would otherwise smear.
"""
import argparse

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

ap = argparse.ArgumentParser()
ap.add_argument('src')
ap.add_argument('out')
ap.add_argument('--size', type=int, default=600)
ap.add_argument('--algo', default='atkinson', choices=['bayer', 'floyd', 'atkinson'])
ap.add_argument('--ink', default='dark', choices=['dark', 'light'])
ap.add_argument('--gamma', type=float, default=1.0)
ap.add_argument('--local', type=float, default=0.6, help='local contrast strength, 0 to disable')
ap.add_argument('--erode', type=int, default=3, help='px trimmed off the cut-out edge; raise it if a light halo shows')
ap.add_argument('--shadow', type=float, default=0.0, help='tones below this go solid, 0 to 0.3')
ap.add_argument('--fade', type=float, default=0.0, help='width of the dithered fade at bottom and sides, as a fraction of size')
ap.add_argument('--rim', type=float, default=0.0, help='dot density of a thin outline along the silhouette, 0 to 1')
a = ap.parse_args()

im = Image.open(a.src).convert('RGB')
W, H = im.size
g = im.convert('L')

# Background: the near-white region touching the top corners, by flood fill.
probe = g.point(lambda v: 255 if v > 232 else 0)
ImageDraw.floodfill(probe, (0, 0), 128)
ImageDraw.floodfill(probe, (W - 1, 0), 128)
bg = probe.point(lambda v: 255 if v == 128 else 0)
mask = ImageOps.invert(bg).filter(ImageFilter.MinFilter(a.erode)).filter(ImageFilter.GaussianBlur(1))
subject = mask.point(lambda v: 255 if v > 128 else 0)

# Upscale first when the output is larger than the source, so sharpening acts
# at the final scale.
if a.size != W:
    g = g.resize((a.size, a.size), Image.LANCZOS)
    mask = mask.resize((a.size, a.size), Image.LANCZOS)
    subject = subject.resize((a.size, a.size), Image.NEAREST)

g = ImageOps.autocontrast(g, cutoff=1, mask=subject)
g = g.filter(ImageFilter.UnsharpMask(radius=2, percent=160, threshold=2))

x = np.asarray(g, dtype=np.float32) / 255.0
if a.local > 0:
    # Local contrast: push each pixel away from its neighbourhood mean.
    blur = np.asarray(g.filter(ImageFilter.GaussianBlur(a.size / 40)), dtype=np.float32) / 255.0
    x = np.clip(x + a.local * (x - blur), 0, 1)
x = x ** a.gamma
h, w = x.shape

# Shadow floor: everything below it goes solid, so a dark suit reads as cloth
# instead of scattered static.
if a.shadow > 0:
    x = np.clip((x - a.shadow) / (1 - a.shadow), 0, 1)

# Soft cut-out plus an edge fade: the subject dissolves into the ground through
# the dither itself instead of stopping at the image's rectangle.
hard = np.asarray(mask, dtype=np.float32) / 255.0
# Soften inward only: the blur may thin the edge but never extends past it, so
# the bright halo around curls never becomes a spray of dots.
soft = np.minimum(np.asarray(mask.filter(ImageFilter.GaussianBlur(2)), dtype=np.float32) / 255.0, hard)
ramp = np.ones_like(soft)
if a.fade > 0:
    span = a.fade * w
    yy_, xx_ = np.mgrid[0:h, 0:w].astype(np.float32)
    ramp = (np.clip((h - 1 - yy_) / span, 0, 1) * np.clip(xx_ / span, 0, 1) * np.clip((w - 1 - xx_) / span, 0, 1)) ** 1.5
    soft = soft * ramp
ground = 0.0 if a.ink == 'light' else 1.0  # the value the page itself reads as
x = ground + (x - ground) * soft

# Rim: a thin band just inside the silhouette, drawn at a fixed dot density.
# A dark jacket on a dark page has no tone to dither, so without it the
# shoulders vanish and the head floats.
if a.rim > 0:
    band = mask.point(lambda v: 255 if v >= 128 else 0)
    inner = band.filter(ImageFilter.MinFilter(5))
    edge = (np.asarray(band, dtype=np.float32) - np.asarray(inner, dtype=np.float32)) / 255.0
    ink = 1.0 - ground
    x = np.where(edge > 0, ground + (np.maximum(np.abs(x - ground), a.rim * ramp)) * (ink - ground), x)

m = soft > 0.02

if a.algo == 'bayer':
    b = np.array([[0,32,8,40,2,34,10,42],[48,16,56,24,50,18,58,26],[12,44,4,36,14,46,6,38],[60,28,52,20,62,30,54,22],
                  [3,35,11,43,1,33,9,41],[51,19,59,27,49,17,57,25],[15,47,7,39,13,45,5,37],[63,31,55,23,61,29,53,21]])
    t = (np.tile(b, (h // 8 + 1, w // 8 + 1))[:h, :w] + 0.5) / 64
    lit = x > t
else:
    e = x.copy()
    e[~m] = ground  # outside the subject reads as the page, so no error bleeds into the edge
    lit = np.zeros_like(x, dtype=bool)
    if a.algo == 'floyd':
        taps = [(0, 1, 7 / 16), (1, -1, 3 / 16), (1, 0, 5 / 16), (1, 1, 1 / 16)]
    else:  # Atkinson: spreads only 3/4 of the error, which keeps highlights clean
        taps = [(0, 1, 1 / 8), (0, 2, 1 / 8), (1, -1, 1 / 8), (1, 0, 1 / 8), (1, 1, 1 / 8), (2, 0, 1 / 8)]
    for yy in range(h):
        row = e[yy]
        for xx in range(w):
            old = row[xx]
            new = 1.0 if old >= 0.5 else 0.0
            lit[yy, xx] = new == 1.0
            err = old - new
            for dy, dx, f in taps:
                ny, nx = yy + dy, xx + dx
                if ny < h and 0 <= nx < w:
                    e[ny, nx] += err * f

out = np.zeros((h, w, 4), dtype=np.uint8)
if a.ink == 'dark':
    on = m & ~lit
    out[on] = (11, 11, 11, 255)
else:
    on = m & lit
    out[on] = (242, 242, 240, 255)
Image.fromarray(out, 'RGBA').save(a.out)
print('saved', a.out, (w, h), a.algo, a.ink)
