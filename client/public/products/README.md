# Priinteve product screenshots

Drop homepage screenshots here. The filename must match the `image` field in
`client/src/lib/data.ts` → `priinteveProducts`.

| File | Product | Source |
| --- | --- | --- |
| `priinteve-web.avif` | Priinteve Web | https://priinteve.com |
| `priinteve-cards.avif` | Priinteve Cards | https://cards.priinteve.com |
| `priinteve-menu.avif` | Priinteve Menu | https://menu.priinteve.com |

`Priinteve App` has no `image` set because it is still in development — it
renders the generated placeholder until you add one.

## Requirements

- **Aspect ratio 16:10.** `BrowserFrame` crops to `object-cover object-top`, so
  a taller screenshot loses its bottom rather than squashing.
- **1280×800** is the target size. Larger is fine; it is downscaled.
- **AVIF preferred** (WebP or PNG also work — just change the extension in
  `data.ts` to match).

## Capturing

Chrome DevTools: open the site → `Ctrl+Shift+M` (device toolbar) → set
1280×800 → `Ctrl+Shift+P` → "Capture screenshot".

Then convert (Python + Pillow, already available in this repo's toolchain):

```bash
python -c "
from PIL import Image
im = Image.open('shot.png').convert('RGB')
im.thumbnail((1280, 800*4), Image.LANCZOS)
im.crop((0, 0, im.width, min(im.height, int(im.width*10/16)))).save(
    'client/public/products/priinteve-web.avif', quality=62)
"
```

## Nothing breaks if a file is missing

`BrowserFrame` falls back to a generated gradient placeholder built from the
product's `hue`, with the product name in the middle. Add the real file and it
takes over with no code change.
