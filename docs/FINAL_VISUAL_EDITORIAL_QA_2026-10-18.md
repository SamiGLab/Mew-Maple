# Visual editorial release — 18 October 2026

**All 56 images now have editorial disposition**. The original 51 WebP illustrations are allowed only as editorial illustrations; images depicting detachable hanging toys, unfamiliar plants or unverifiable mounts have clear contextual safety cautions in captions. None of these are claims that the depicted products are tested or safe.

## Final five SVG replacements
- `cat-friendly-apartment-figure-03.svg`: clear exit, no hanging lure, inspect materials
- `cat-friendly-apartment-figure-04.svg`: food, water, litter in distinct resource areas
- `home-for-two-indoor-cats-figure-04.svg`: separated feeding stations
- `window-perch-vs-cat-tree-figure-04.svg`: closed toy storage and basic scratcher
- `window-perch-vs-cat-tree-figure-06.svg`: closed window, quiet resting area and no hanging lure

Each was rendered in GitHub Actions [run 39110806927](https://github.com/SamiGLab/Mew-Maple/actions/runs/39110806927) with `rsvg-convert` to 960×608 PNG; artifact ID **12130706095**. All five generated PNGs were opened and visually inspected as full-size panels, including title and caption visibility, arrows/labels, logical position of objects, and consistency with the rewritten article copy. They are simple explanatory diagrams rather than real-world construction plans. The article captions link to the original full-size SVG for phone zoom.

## Editorial conclusion
- 56 approved for *editorial illustration use only*.
- 0 pending, 0 replace-required or manual-review in the image manifest.
- Automated `npm run check:source` (including safety-of-SVG code check) and preview build still must pass on this PR.
- These approvals do **not** grant any veterinarian endorsement, guarantee that a cat perch or toy is safe, verify structural load, or provide product recommendations based on firsthand use.

## Separate release blockers remain
Eight articles are `status: review`; real publisher/Contact/Privacy/Affiliate legal details, actual owned domain, Cloudflare Access-protected staging, mobile/keyboard/browser testing and deliberate publication GO/NO-GO decision are not complete. The publication gate must remain closed until separately satisfied.
