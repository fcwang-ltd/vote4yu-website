"""Crop usable assets from map strips (known content)."""
from pathlib import Path
from PIL import Image

MAPS = Path(r"public/images/lecamp/_maps")
OUT = Path(r"public/images/lecamp")
OUT.mkdir(parents=True, exist_ok=True)

def save(src_name, out_name, box):
    im = Image.open(MAPS / src_name).convert("RGB")
    crop = im.crop(box)
    path = OUT / out_name
    if out_name.endswith(".png"):
        crop.convert("RGBA").save(path)
    else:
        crop.save(path, quality=92)
    print(out_name, crop.size, path.stat().st_size)

# map_01 y900: intro photos at bottom
save("map_01_y900.jpg", "photo-1.jpg", (70, 480, 560, 880))
save("map_01_y900.jpg", "photo-2.jpg", (580, 350, 1000, 880))
save("map_01_y900.jpg", "photo-3.jpg", (1040, 220, 1750, 880))
save("map_01_y900.jpg", "sticker-tent-blue.png", (1620, 180, 1760, 320))

# map_02 y1800: programs head + forest
save("map_02_y1800.jpg", "bento-forest.jpg", (780, 280, 1840, 880))

# map_03 y2700: sky card + fern
save("map_03_y2700.jpg", "bento-fern.jpg", (900, 80, 1840, 700))

# map_04 y3600: ridge hiker
save("map_04_y3600.jpg", "bento-ridge.jpg", (60, 40, 900, 780))

# map_05 y4500: logos + guides photo start
save("map_05_y4500.jpg", "logos.jpg", (120, 120, 1800, 420))
save("map_05_y4500.jpg", "guides-top.jpg", (980, 480, 1850, 880))

# map_06 y5400: guides lower + events
save("map_06_y5400.jpg", "guides-bottom.jpg", (980, 0, 1850, 420))
save("map_06_y5400.jpg", "event-network.jpg", (1180, 520, 1750, 880))
save("map_06_y5400.jpg", "event-street.jpg", (700, 720, 1150, 880))

# Compose guides from top+bottom if needed — use guides-top as primary
guides_top = Image.open(OUT / "guides-top.jpg")
guides_bottom = Image.open(OUT / "guides-bottom.jpg")
# Prefer the larger/better of the two available crops for guides
guides_top.save(OUT / "guides.jpg", quality=92)

# map_00 stickers already good from previous run — refresh from map_00
save("map_00_y0.jpg", "hero.jpg", (0, 0, 1919, 900))
save("map_00_y0.jpg", "sticker-ceo.png", (95, 175, 290, 385))
save("map_00_y0.jpg", "sticker-softlanding.png", (820, 95, 1035, 310))
save("map_00_y0.jpg", "sticker-basecamp.png", (1565, 165, 1795, 420))
save("map_00_y0.jpg", "sticker-acceleration.png", (55, 655, 355, 880))
save("map_00_y0.jpg", "sticker-programme.png", (865, 760, 1065, 880))
save("map_00_y0.jpg", "sticker-exploration.png", (1495, 680, 1810, 880))
save("map_00_y0.jpg", "logo-nav.png", (40, 28, 250, 88))

# footer from last maps
save("map_08_y7200.jpg", "footer-mountains.jpg", (0, 200, 1919, 900)) if (MAPS / "map_08_y7200.jpg").exists() else None
save("map_09_y8100.jpg", "footer-mountains.jpg", (0, 0, 1919, 414)) if (MAPS / "map_09_y8100.jpg").exists() else None

print("ok")
