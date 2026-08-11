from PIL import Image
from pathlib import Path

im = Image.open(
    r"C:\Users\CongW\work\Studio\vote4yu-website\docs\plans\references\lecampquebec\screencapture-lecampquebec-2026-08-10-11_50_21.png"
)
out = Path(r"C:\Users\CongW\work\Studio\vote4yu-website\public\images\lecamp")
out.mkdir(parents=True, exist_ok=True)

# Map strips for visual crop tuning
for i, y in enumerate(range(0, im.height, 900)):
    crop = im.crop((0, y, im.width, min(y + 900, im.height)))
    crop.save(out / f"_map_{i:02d}_y{y}.jpg", quality=70)
    print(i, y, crop.size)

print("done", out)
