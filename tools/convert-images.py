#!/usr/bin/env python3
"""Convert source images to the published WebP assets.

Source : assets/projects-original/*.jpg  (kept out of git / not published)
Output : assets/projects/*.webp          (max width 800px, quality 80)

Also rebuilds the profile photo (photo.png / photo.webp) from photo-original.png.

Usage:  python tools/convert-images.py
Requires: pip install Pillow
"""
import os
import sys

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    sys.exit("Pillow is required:  pip install Pillow")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "projects-original")
OUT = os.path.join(ROOT, "assets", "projects")
PROFILE_SRC = os.path.join(ROOT, "assets", "profile", "photo-original.png")

MAX_WIDTH = 800
QUALITY = 80


def convert_projects():
    if not os.path.isdir(SRC):
        sys.exit(f"missing source folder: {SRC}")
    os.makedirs(OUT, exist_ok=True)
    done = 0
    for name in sorted(os.listdir(SRC)):
        if name.lower().endswith((".jpg", ".jpeg", ".png")):
            base = os.path.splitext(name)[0]
            src = os.path.join(SRC, name)
            dst = os.path.join(OUT, base + ".webp")
            im = Image.open(src)
            if im.mode not in ("RGB", "RGBA"):
                im = im.convert("RGBA" if "A" in im.mode else "RGB")
            if im.width > MAX_WIDTH:
                h = round(im.height * MAX_WIDTH / im.width)
                im = im.resize((MAX_WIDTH, h), Image.LANCZOS)
            im.save(dst, "WEBP", quality=QUALITY, method=6)
            done += 1
            print(f"  {name} -> {base}.webp  ({im.width}x{im.height})")
    print(f"projects: {done} files")


def convert_profile():
    if not os.path.isfile(PROFILE_SRC):
        sys.exit(f"missing profile source: {PROFILE_SRC}")
    out_dir = os.path.join(ROOT, "assets", "profile")
    im = Image.open(PROFILE_SRC).convert("RGBA")
    # displayed around 340px wide -> 900px covers 2x DPR
    if max(im.size) > 900:
        scale = 900 / max(im.size)
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    im.save(os.path.join(out_dir, "photo.png"), "PNG", optimize=True)
    im.save(os.path.join(out_dir, "photo.webp"), "WEBP", quality=90, method=6)
    print(f"profile: photo.png / photo.webp  ({im.width}x{im.height})")


if __name__ == "__main__":
    convert_projects()
    convert_profile()
    print("done")
