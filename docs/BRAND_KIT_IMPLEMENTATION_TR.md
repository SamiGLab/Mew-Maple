# Mew & Maple — approved brand kit applied to the site (18 October 2026)

## Asset provenance
The exact source designs are taken from the user's previously created `Mew_and_Maple_01_Website_Kit.zip`, folder `01_Website_Kit/brand-assets/`:
- `favicon.svg` — **already present in the repository and matching the agreed cat icon; unchanged**.
- `avatar-light.svg` — original cat silhouette with peach leaf, on cream background.
- `avatar-dark.svg` — matching dark-background logo variation.
- `wordmark-light.svg` — original approved full wordmark for future press/social usage.
- `wordmark-dark.svg` — already present and unchanged.

Do not substitute the interim CSS M-star-M icon. Keep the brand palette cream `#FAF8F3`, sage `#DCE8DF`, forest `#263C34`, peach `#E9AA82`. Existing accessible system/Georgia typography is deliberate until appropriately licensed font files are self-hosted.

## Website integration
- Shared header: `avatar-light.svg` + live HTML wordmark **Mew & Maple** and **INDOOR CAT LIVING** subtitle. Live text remains accessible at mobile sizes instead of shrinking the original wide SVG wordmark to an unreadable caption.
- Shared footer: `avatar-dark.svg` and matching subtitle.
- Favicon: retain the verified matching `/brand/favicon.svg`; add `/site.webmanifest` with aligned brand name, color and SVG icon.
- Continue to use the existing brand slogan `Better days for indoor cats.`.

## Checks
- `npm run audit:brand`: verifies all five source SVGs, original cat-and-leaf silhouette and color, no external scripts/assets, no temporary M-star-M logo and correct web manifest.
- The Chromium QA checks that header/footer image resources load successfully, words/subtitle are correct and favicon path is present on mobile, tablet and desktop.
- After Workers Builds deploys, validate the **exact deployed commit SHA** and inspect `/brand/avatar-light.svg`, `/brand/avatar-dark.svg`, `/brand/favicon.svg` and `/site.webmanifest` over HTTPS. Cached content may take time to refresh after deployment.

## Deferred
No domain connection in this PR, by explicit owner request. `mewandmaple.com` was purchased via Namecheap, but DNS/Custom Domain/redirects must wait until site deficiencies are addressed. `PUBLIC_SITE_READY`, `PUBLISH_APPROVED`, and the eight `review` statuses remain untouched. Publisher identity and legal pages also remain unapproved.
