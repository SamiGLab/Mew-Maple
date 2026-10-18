# Mew & Maple — Chromium mobile and accessibility QA, 18 Oct 2026

**Run:** [GitHub Actions #39113150022](https://github.com/SamiGLab/Mew-Maple/actions/runs/39113150022), completed `success` (`pagesChecked: 20`, `failed: 0`).

### Method
- Builds safe static preview via Astro 6 with `PUBLIC_SITE_READY=false` (all 8 articles remain review and cannot be included in the release artifact).
- Separately serves the 8 draft articles on `127.0.0.1:4323` under `astro dev`, available only inside the ephemeral CI runner.
- Chromium viewports: 390×844 smartphone, 768×1024 tablet, and 1440×900 desktop.
- Every draft guide on phone; homepage/search/category/legal pages plus representative articles at additional widths.
- Checks: document horizontal overflow, correct H1 count, loadable image assets, image alt presence, non-hidden input accessible labels, selected axe WCAG 2.0/2.1 A/AA scans, keyboard skip link, live search interaction.
- Static-safe preview tested independently at 390px: no draft guide route/index leakage. Static source navigation and generated sitemap/index assertions also passed.
- Mobile and desktop screenshots were uploaded to private GitHub Actions ephemeral artifact `mew-maple-browser-qa` for visual inspection.

### Findings and fixes
- 8 inert Markdown task-list checkboxes in Cat-Friendly Apartment created unlabeled controls in rendered HTML. Replaced with semantic bullets. Browser retest passed.
- A first test did not terminate because of a lingering `astro dev` subprocess. The isolated test now explicitly terminates when results are collected; no production code depended on this fix.
- Unreadably light category/breadcrumb/byline shades were darkened in PR #40 based on contrast ratios; additional representative axe tests passed.
- An unnecessary Google Fonts third-party network request was removed in PR #39 before privacy and consent configuration.
- Desktop/mobile screenshots showed the Astro development toolbar covering content in the private editorial preview; it is now disabled only for dev mode.

### Scope limitations
This is automated Chromium coverage, not a full manual screen-reader audit, native iOS Safari / Android WebView matrix, production Lighthouse report or verification of the eventual real domain. A passing axe test does not guarantee WCAG conformance. External verification of production SSL, cookies, consent behavior, redirects, social previews and Cloudflare Access is still required.

**Publication is not authorized.** All article statuses remain `review`; legal/publisher/domain/hosting tasks are open.
