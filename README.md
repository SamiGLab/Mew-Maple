# Mew & Maple — Astro static-blog starter v0.3 (DRAFT)

This is the **private Mew & Maple GitHub source repository**, NOT a live website. The eight content entries are intentionally **under review**. The illustrations are AI-generated editorial artwork. Do not claim hands-on product tests or veterinary review.

## Stack
- Astro 6 static output; TypeScript content schema; no database or SSR adapter
- 8 draft Markdown guides and 56 WebP article images
- Responsive CSS; category pages; article template; robots, sitemap and RSS endpoints
- GitHub Actions source checks; intended host Cloudflare Pages (`npm run build` → `dist`)

## Local setup
```bash
npm ci
cp .env.example .env
npm run check:source
npm run dev
npm run build
```

GitHub Actions has now successfully completed **`npm ci`, source checks and `npm run build`** using the committed `package-lock.json`. The content is still editorial draft material and is not approved for publication.

## Important deployment safeguards
- Default `PUBLIC_SITE_READY=false` emits `noindex,nofollow`, leaves the sitemap empty, and excludes draft article routes from static production builds. robots.txt allows crawling so Google can see noindex (robots.txt Disallow would conceal it). Draft articles only appear under local `astro dev` for editorial review. This protects indexing but is not access control for a deployed review environment; use private preview access if confidentiality matters. A public build requires `PUBLISH_APPROVED=YES`, a verified custom `SITE_URL`, at least one `published` post and legal/editorial placeholder removal.
- Local dev mode includes all 8 unreviewed draft guides for inspection. Public preview builds do not include guide pages.
- Before publishing: verify source material, fix all placeholder editorial/legal information, update each approved article to `status: published` and add genuine `publishedAt` dates. Set Cloudflare build environment `SITE_URL=https://your-real-domain`, `PUBLIC_SITE_READY=true`, and `PUBLISH_APPROVED=YES` only after sign-off. Astro config reads SITE_URL from the build environment; a local `.env` file alone does not configure Astro's `site` option.
- Ad/affiliate links, purchase buttons, analytics tracking, email subscription and cookies are intentionally NOT wired up yet.

## Cloudflare Pages settings
- Framework: Astro
- Build command: `npm run build`
- Output folder: `dist`
- No adapter required for a fully static Astro project.

## Source provenance
Content imported from the eight previously authored article HTML files and 56 WebP images in `Mew_and_Maple_01_Website_Kit.zip`. Always compare original context before publication. Images are editorial AI illustrations, not firsthand evidence.

## Project documents
- `docs/MONETIZATION_STRATEGY_TR.md`: provisional monetization order and official sources.
- `docs/LAUNCH_GATES_TR.md`: required GO/NO-GO checks.
- `docs/CONTENT_MANIFEST.json`: the eight article slugs and counts.

## Release-gate QA 17 Oct 2026
- `npm run test:gates` runs isolated positive/negative release checks without touching actual article content.
- Production approval requires valid custom URL, finished editorial/legal pages, approved publication dates and no links to unpublished articles.
- Note that a crawler `noindex` is NOT an access-control mechanism. Preview deployment should be kept access-restricted.

## Code review notes 17 Oct 2026
- Fixed syntax error in `robots.txt.ts` and removed lockfile requirement from setup-node until a real package-lock exists.
- Added `npm run check:launch` build-time publication gate; no public preview output for review drafts.
- Verified source references and seven release-gate tests locally. GitHub Actions has since compiled Astro successfully using reproducible `npm ci` (17 Oct 2026).

## Verified private-repository milestone (17 Oct 2026)

- Repository: `SamiGLab/Mew-Maple` (private). No changes were made to `SamiGLab/kaftan-angelo` or any existing business domain.
- 98 initial source files imported, including 8 articles and 56 illustrations, followed by a committed dependency lockfile.
- [Source import commit](https://github.com/SamiGLab/Mew-Maple/commit/7f9390519ab876c460b6f6e7c39377c765792d9d).
- [Passing reproducible CI run](https://github.com/SamiGLab/Mew-Maple/actions/runs/39061370469).
- Preview-safe build generated 9 static pages; no draft guide was published. Production release is still gated by editorial, legal, domain, accessibility and owner approval.
