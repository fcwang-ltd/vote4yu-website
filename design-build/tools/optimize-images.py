"""Generate web derivatives of the campaign artwork.

Source stays untouched in project/assets/; output goes to assets/ as WebP plus a JPEG or PNG
fallback. Run from the repo root: python3 optimize.py
"""
import os
from PIL import Image

SRC = "project/assets"
OUT = "assets"

# name -> (target width, fallback format)
JOBS = {
    "hero-display.png": (2560, "JPEG"),
    "hero-desktop.png": (2160, "JPEG"),
    "hero-tablet.png": (1536, "JPEG"),
    "hero-mobile.png": (1125, "JPEG"),
    "haohui-portrait-arms-crossed.png": (840, "PNG"),
    "yu-brush-mark.png": (1200, "PNG"),
    "wechat-qr.jpg": (643, "JPEG"),
    "wechat-contact-card.jpg": (820, "JPEG"),
}

os.makedirs(OUT, exist_ok=True)

for name, (width, fallback) in JOBS.items():
    src = os.path.join(SRC, name)
    stem = os.path.splitext(name)[0]
    im = Image.open(src)

    if im.width > width:
        height = round(im.height * width / im.width)
        im = im.resize((width, height), Image.LANCZOS)

    if fallback == "JPEG":
        flat = Image.new("RGB", im.size, (255, 255, 255))
        flat.paste(im, mask=im.getchannel("A") if im.mode in ("RGBA", "LA") else None)
        out = os.path.join(OUT, stem + ".jpg")
        flat.save(out, "JPEG", quality=82, optimize=True, progressive=True)
        flat.save(os.path.join(OUT, stem + ".webp"), "WEBP", quality=82, method=6)
    else:
        rgba = im.convert("RGBA")
        out = os.path.join(OUT, stem + ".png")
        rgba.save(out, "PNG", optimize=True)
        rgba.save(os.path.join(OUT, stem + ".webp"), "WEBP", quality=85, method=6)

    made = [f for f in os.listdir(OUT) if f.startswith(stem + ".")]
    sizes = ", ".join(
        "%s %.0fKB" % (f.rsplit(".", 1)[1], os.path.getsize(os.path.join(OUT, f)) / 1024)
        for f in sorted(made)
    )
    print("%-38s %5dpx  %s" % (name, im.width, sizes))

total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
print("\nassets/ total: %.1f MB" % (total / 1e6))
