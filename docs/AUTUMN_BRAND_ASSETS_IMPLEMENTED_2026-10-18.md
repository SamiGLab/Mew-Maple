# Mew & Maple — Autumn website artwork integration

**Source:** The eight separate AI-generated brand images prepared in this conversation. They have been optimized to WebP and committed as actual static files in `public/brand/autumn/`, rather than replacing them with a newly invented vector logo.

## Where each asset is used

| Asset | Location | Display purpose |
|---|---|---|
| `lockup.webp` | About page | Full horizontal original Mew & Maple logo (wordmark + tagline) |
| `cat-emblem.webp` | Shared header and footer | Original orange cat-and-leaves emblem |
| `cat-silhouette.webp` | Site favicon and webmanifest | More legible simplified green-cat identity for small icon sizes |
| `maple-leaf.webp` | Homepage hero edge | Low-opacity decorative leaf (empty alt) |
| `botanical-branch.webp` | Reading-room section | Low-opacity botanical corner ornament |
| `botanical-wreath.webp` | About page | Decorative wreath, not an endorsement or product image |
| `leaves-pattern.webp` | Prelaunch topic links | Subdued warm leafy texture under opaque overlay |
| `paws-pattern.webp` | Alternate prelaunch topic links | Subdued paw texture under opaque overlay |

The main hero photograph remains an editorial guide illustration. No unapproved draft articles become public. The four category links in prelaunch mode point to safe category pages, not draft routes.

## Asset and accessibility rules

- Keep the exact names and `public/brand/autumn/` paths; links and checks depend on them.
- The illustrations are decorative in nav/footer/hero and have `alt=""`; the logo link has a descriptive ARIA label and visible brand text.
- Text stays HTML, ensuring readable typography on desktop/mobile rather than relying on tiny text baked into a narrow logo image.
- A historical SVG favicon is retained as a fallback; the new WebP silhouette is declared as the preferred icon.
- The full eight asset set totals less than 170 KiB, distributed across views; images are lazy loaded where not immediately visible.
- The brand audit fails if any new WebP is missing or exceeds 70 KiB. Browser QA validates all displayed images, mobile layout, draft safety and alt text. Post-deploy QA checks HTTP 200 and image/webp for key assets.
- No remote image CDN, fonts or trackers added. Same-origin CSP is preserved.

## Strictly out of scope

- `mewandmaple.com` was purchased, but DNS/custom domain linking is intentionally deferred at the owner's request.
- Article publication statuses, `PUBLIC_SITE_READY`, `PUBLISH_APPROVED` and unapproved publisher/legal details are not changed.
