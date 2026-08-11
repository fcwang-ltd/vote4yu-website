"""Refine Le Camp crops from full-page reference screenshot."""
from pathlib import Path
from PIL import Image

SRC = Path(r"docs/plans/references/lecampquebec/screencapture-lecampquebec-2026-08-10-11_50_21.png")
OUT = Path(r"public/images/lecamp")
OUT.mkdir(parents=True, exist_ok=True)
im = Image.open(SRC).convert("RGB")
W, H = im.size

def save(name, box, q=92):
    x0, y0, x1, y1 = box
    crop = im.crop((max(0, x0), max(0, y0), min(W, x1), min(H, y1)))
    path = OUT / name
    if name.endswith(".png"):
        crop.convert("RGBA").save(path)
    else:
        crop.save(path, quality=q)
    print(name, crop.size)

# Hero bg without nav chrome (full)
save("hero.jpg", (0, 0, W, 980))

# Stickers — tighter boxes from map_00
save("sticker-ceo.png", (95, 175, 290, 385))
save("sticker-softlanding.png", (820, 95, 1035, 310))
save("sticker-basecamp.png", (1565, 165, 1795, 420))
save("sticker-acceleration.png", (55, 655, 355, 900))
save("sticker-programme.png", (865, 760, 1065, 1010))
save("sticker-exploration.png", (1495, 680, 1810, 955))

# Intro photos individually (bottom of map_01)
save("photo-1.jpg", (95, 1485, 620, 1880))
save("photo-2.jpg", (640, 1380, 1080, 1980))
save("photo-3.jpg", (1100, 1280, 1780, 2050))
save("sticker-tent-blue.png", (1680, 1200, 1820, 1340))

# Programs bento
save("bento-forest.jpg", (780, 2380, W - 70, 3180))
save("bento-fern.jpg", (780, 3220, W - 70, 3780))
save("bento-ridge.jpg", (70, 3820, 1050, 4520))

# Logos strip
save("logos.jpg", (100, 5050, W - 100, 5350))

# Guides
save("guides.jpg", (880, 5450, W - 50, 6400))

# Events
save("event-1.jpg", (680, 6650, 1150, 7350))
save("event-2.jpg", (1200, 6550, W - 70, 7300))

# Footer mountains
save("footer-mountains.jpg", (0, 7800, W, H))

# Logo mark from nav
save("logo-nav.png", (40, 28, 220, 88))

print("done")
