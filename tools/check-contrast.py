#!/usr/bin/env python3
"""WCAG AA contrast audit for the site's colour tokens (dark + light)."""

THEMES = {
    # ac darkened from #C8381A -> #C33619 so accent text hits WCAG AA on light bg
    "dark":  dict(bg="#161210", s1="#211B17", tx="#F3ECDD", mu="#A89E8D", bd="#3B332B", ac="#FF6A3D", on="#161210", sh="#F3ECDD"),
    "light": dict(bg="#F2ECE0", s1="#FBF8F1", tx="#1B1612", mu="#6A604F", bd="#1B1612", ac="#C33619", on="#FBF8F1", sh="#1B1612"),
}


def lum(hexv):
    c = hexv.lstrip("#")
    ch = [int(c[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    f = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in ch]
    return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]


def ratio(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


# (foreground token, background token, context)
CHECKS = [
    ("tx", "bg", "body text"),
    ("tx", "s1", "text on card"),
    ("mu", "bg", "muted text"),
    ("mu", "s1", "muted text on card"),
    ("ac", "bg", "accent labels/badges"),
    ("ac", "s1", "accent on card"),
    ("on", "ac", "text on accent"),
]

# success message colour
OK_COLOR = {"dark": "#4ADE80", "light": "#147036"}

fails = []
checked = 0
for theme, v in THEMES.items():
    for fg, bg, ctx in CHECKS:
        r = ratio(v[fg], v[bg])
        checked += 1
        if r < 4.5:
            fails.append((theme, f"{fg}/{bg}", ctx, round(r, 2)))
    r = ratio(OK_COLOR[theme], v["bg"])
    checked += 1
    if r < 4.5:
        fails.append((theme, "ok/bg", "success message", round(r, 2)))
    # hard offset shadow colour only has to reach 3:1 (non-text UI)
    checked += 1
    if ratio(v["sh"], v["bg"]) < 3.0:
        fails.append((theme, "sh/bg", "shadow (3:1 UI)", round(ratio(v["sh"], v["bg"]), 2)))

if fails:
    print("FAILURES (need >= 4.5):")
    for f in fails:
        print("  ", f)
else:
    print(f"All {checked} pairs pass WCAG AA (>= 4.5:1).")
