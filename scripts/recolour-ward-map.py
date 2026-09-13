"""Recolour the City's Ward 2 map into the campaign palette.

Green fill  -> --color-blue-600 #344c96
Black lines -> --color-pink-500 #ec078d

Light grey streets, cream ground and blue water are left alone. Black TEXT
inside the white road-name pills is also left alone: a dark pixel counts as
lettering, not road, when its neighbourhood is mostly white.

Regenerates public/images/ward2-map.webp from the City's original, which is
kept out of the repo. Only needed if that source map is ever reissued:

    python3 scripts/recolour-ward-map.py SOURCE out.png [WIDTH]

then save the result as WebP (quality 92 gave 130KB at 900px wide).
"""
import sys

import numpy as np
from PIL import Image, ImageFilter

PINK = (236, 7, 141)
BLUE_HUE = 226.0 / 360.0  # hue of #344c96


def pill_boxes(density, inset, min_w, min_h):
    """Bounding boxes of the pill-sized blobs in `density`, as a boolean mask.

    Each box is pulled in by `inset` to undo the blur's spread, so protection
    stops at the pill edge instead of leaving a black nub on the road line
    running into it. Plain iterative flood fill: no scipy in this toolchain.
    """
    h, w = density.shape
    seen = np.zeros_like(density)
    out = np.zeros_like(density)
    kept = []
    for sy in range(h):
        for sx in np.nonzero(density[sy] & ~seen[sy])[0]:
            stack = [(sy, int(sx))]
            seen[sy, sx] = True
            y0 = y1 = sy
            x0 = x1 = int(sx)
            while stack:
                y, x = stack.pop()
                if y < y0: y0 = y
                if y > y1: y1 = y
                if x < x0: x0 = x
                if x > x1: x1 = x
                for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
                    if 0 <= ny < h and 0 <= nx < w and density[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        stack.append((ny, nx))
            x0, y0, x1, y1 = x0 + inset, y0 + inset, x1 - inset, y1 - inset
            if (x1 - x0 + 1) >= min_w and (y1 - y0 + 1) >= min_h:
                out[y0:y1 + 1, x0:x1 + 1] = True
                kept.append(f'{x1 - x0 + 1}x{y1 - y0 + 1}')
    print(f'  {len(kept)} label pills: ' + ', '.join(kept))
    return out


def rgb_to_hsv(a):
    m, M = a.min(-1), a.max(-1)
    d = M - m
    v = M
    s = np.where(M == 0, 0, d / np.where(M == 0, 1, M))
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    dz = np.where(d == 0, 1, d)
    h = np.select(
        [d == 0, M == r, M == g],
        [0.0, ((g - b) / dz) % 6, ((b - r) / dz) + 2],
        default=((r - g) / dz) + 4,
    ) / 6.0
    return h, s, v


def hsv_to_rgb(h, s, v):
    i = np.floor(h * 6).astype(int)
    f = h * 6 - i
    p, q, t = v * (1 - s), v * (1 - f * s), v * (1 - (1 - f) * s)
    i = i % 6
    r = np.select([i == 0, i == 1, i == 2, i == 3, i == 4], [v, q, p, p, t], default=v)
    g = np.select([i == 0, i == 1, i == 2, i == 3, i == 4], [t, v, v, q, p], default=p)
    b = np.select([i == 0, i == 1, i == 2, i == 3, i == 4], [p, p, t, v, v], default=q)
    return np.stack([r, g, b], -1)


def main(src_path, out_path, width=None):
    im = Image.open(src_path).convert('RGB')

    # Mask of the white label pills, so their lettering stays black.
    #
    # The white threshold has to be tight. The cream ground is (247,244,240)
    # and the pills are pure white; at a looser threshold every boundary line
    # bordering the cream reads as "on a label" and survives as black. Pure
    # white covers about 9.8k pixels here, nearly all inside the eight pills.
    #
    # Blurring that mask gives a density field: dense inside a pill, negligible
    # at the few stray white pixels in the Hwy 404 cloverleaf eyes. Each dense
    # blob is then protected by its bounding box rather than by the blob
    # itself, because density alone tails off at the pill edges and leaves the
    # first and last letter of every label unprotected.
    r = im.width / 150
    white = im.point(lambda v: 255 if v >= 250 else 0).convert('L')
    density = np.asarray(white.filter(ImageFilter.GaussianBlur(r))) > 30
    on_label = pill_boxes(density, inset=round(r), min_w=round(im.width / 29),
                          min_h=round(im.width / 68))

    a = np.asarray(im, dtype=np.float32) / 255.0
    h, s, v = rgb_to_hsv(a)
    deg = h * 360.0

    # Green fill, including the darker park greens, keeps its tone in blue.
    green = (deg >= 70) & (deg <= 175) & (s > 0.06)
    out = a.copy()
    out[green] = hsv_to_rgb(
        np.full(green.sum(), BLUE_HUE, np.float32),
        np.minimum(s[green] * 1.15, 1.0),
        v[green],
    )

    # Near-black line work goes pink; lettering on a pill stays black.
    dark = (v < 0.42) & (s < 0.45) & ~on_label
    out[dark] = np.array(PINK, np.float32) / 255.0

    res = Image.fromarray((np.clip(out, 0, 1) * 255).round().astype(np.uint8))
    if width and res.width > width:
        res = res.resize((width, round(res.height * width / res.width)), Image.LANCZOS)
    res.save(out_path, optimize=True)
    print(f'{im.size} -> {res.size}  green {int(green.sum())}px  dark {int(dark.sum())}px  {out_path}')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else None)
