# Mew & Maple — Astro static-blog starter v0.3 (DRAFT)

This is the **public Mew & Maple GitHub source repository**. Source Markdown and illustrations are visible on GitHub. The Cloudflare Workers URL may serve the safe draft landing pages; articles remain excluded from static deployment. The eight content entries are intentionally **under review**. The illustrations are AI-generated editorial artwork. Do not claim hands-on product tests or veterinary review.

## Stack
- Astro 6 static output; TypeScript content schema; no database or SSR adapter
- 8 draft Markdown guides and 56 editorial illustrations (51 WebP plus 5 standalone SVG diagrams)
- Responsive CSS; category pages; article template; robots, sitemap and RSS endpoints
- GitHub Actions source checks; current intended host Cloudflare Workers Static Assets (`npm run build` → `dist` → `wrangler deploy`)

## Local setup
```bash
npm ci
cp .env.example .env
npm run check:source
npm run dev
npm run build
```

GitHub Actions has now successfully completed **`npm ci`, source checks and `npm run build`** using the committed `package-lock.json`. The content is still editorial draft material and is not approved for publication.

> **Public source warning:** The eight unpublished Markdown draft files are publicly viewable in GitHub now that the repository is public. `noindex` on the Worker does not protect repository files. Keep secrets, private contact details and credentials out of all tracked files. This does not represent a full public article launch.

## Important deployment safeguards
- Default `PUBLIC_SITE_READY=false` emits `noindex,nofollow`, leaves the sitemap empty, and excludes draft article routes from static production builds. robots.txt allows crawling so Google can see noindex (robots.txt Disallow would conceal it). Draft articles only appear under local `astro dev` for editorial review. This protects indexing but is not access control for a deployed review environment; use private preview access if confidentiality matters. A public build requires `PUBLISH_APPROVED=YES`, a verified custom `SITE_URL`, at least one `published` post and legal/editorial placeholder removal.
- Local dev mode includes all 8 unreviewed draft guides for inspection. Public preview builds do not include guide pages.
- Before publishing: verify source material, fix all placeholder editorial/legal information, update each approved article to `status: published` and add genuine `publishedAt` dates. Set Cloudflare build environment `SITE_URL=https://your-real-domain`, `PUBLIC_SITE_READY=true`, and `PUBLISH_APPROVED=YES` only after sign-off. Astro config reads SITE_URL from the build environment; a local `.env` file alone does not configure Astro's `site` option.
- Ad/affiliate links, purchase buttons, analytics tracking, email subscription and cookies are intentionally NOT wired up yet.

## Live Cloudflare preview verification — CONFIRMED (18 Oct 2026)

- Code/CI `wrangler deploy --dry-run` **does not** prove the Worker was deployed or reachable.
- Run `npm run audit:live:worker` to check actual HTTPS, `noindex`, Worker headers, empty sitemap/search index, draft-article 404 and missing-page 404. For independent GitHub-hosted execution, use **Actions > Live Workers safety check > Run workflow** and supply the actual `workers.dev` URL.
- [Live GitHub Actions verification](https://github.com/SamiGLab/Mew-Maple/actions/runs/39118094587) returned **six successful endpoint checks and zero errors**: homepage 200, robots 200, sitemap 200, search index 200, draft guide 404, unknown route 404. Homepage includes both meta noindex and the HTTP X-Robots-Tag. User's Cloudflare production screen shows active deployment version `66c9c552` serving 100% traffic.
- The manual live verification workflow also runs on pull requests to detect preview safety regressions. Its checks describe **draft-safe hosting only**; it does not prove publication-readiness or a custom domain.
- This audit tests only the **not-yet-publication-approved** preview. It does not flip `PUBLIC_SITE_READY`, publish articles, change DNS or configure privacy.

## Cloudflare Workers settings (current)
- Worker: `mew-maple`; managed through Workers Builds from GitHub `main`.
- Build command: `npm run build`; deploy command: `npx wrangler deploy`.
- `wrangler.jsonc` serves static `./dist` and correctly returns a `404-page` for absent content.
- In preview-safe mode, the build generates `dist/_headers` containing `X-Robots-Tag: noindex, nofollow, noarchive`, with equivalent robots meta tags. The headers omit the noindex rule only in explicitly approved production builds.
- No SSR adapter or Worker `main` script is needed for this fully prerendered Astro site.

## Source provenance
Content imported from the eight previously authored article HTML files and 56 WebP images in `Mew_and_Maple_01_Website_Kit.zip`. Always compare original context before publication. Images are editorial AI illustrations, not firsthand evidence.

## Project documents
- `docs/MONETIZATION_STRATEGY_TR.md`: provisional monetization order and official sources.
- `docs/LAUNCH_GATES_TR.md`: required GO/NO-GO checks.
- `docs/CONTENT_MANIFEST.json`: the eight article slugs and counts.
- `docs/CLOUDFLARE_WORKERS_DEPLOY_TR.md`: current Workers Builds configuration and verification checklist.
- `docs/CLOUDFLARE_DOMAIN_KURULUM_PLANI_TR.md`: earlier domain checklist; its Pages-specific instructions are superseded by Workers deployment.

## Verified browser and illustration QA (18 Oct 2026)

- [Passing browser accessibility and layout CI](https://github.com/SamiGLab/Mew-Maple/actions/runs/39113150022): 20 page/viewport combinations (390px, 768px and 1440px), 0 failures. All eight locally rendered draft guides were checked on mobile for overflow, images, basic semantics, navigation and search; representative screens used axe WCAG 2.0/2.1 A/AA rule scans.
- The browser test is local-only: it launches `astro dev` on loopback for editorial drafts, then validates that the static `astro preview` has **no guide page leakage** and an empty public search index. Screenshots are only uploaded while the repository is private; in a public repository CI checks are still run but private screenshot artifacts are not uploaded.
- All 56 images have an editorial QA disposition, including five locally rendered SVG safety diagrams. They are not product safety certification or professional veterinary endorsement.
- Third-party Google Fonts requests were removed from the draft site; fallbacks are system/Georgia until properly licensed fonts are self-hosted.
- Browser QA is not a substitute for final production Lighthouse, full manual assistive-technology testing or owned-domain HTTPS checks.
- Launch owner/publisher, legal/privacy details, domain, Cloudflare Access and final release approval remain unresolved. See `docs/OWNER_RELEASE_INPUTS_TR.md`.

## Release-gate QA 17 Oct 2026
- `npm run test:gates` runs isolated positive/negative release checks without touching actual article content.
- Production approval requires valid custom URL, finished editorial/legal pages, approved publication dates and no links to unpublished articles.
- Note that a crawler `noindex` is NOT an access-control mechanism. Preview deployment should be kept access-restricted.

## Code review notes 17 Oct 2026
- Fixed syntax error in `robots.txt.ts` and removed lockfile requirement from setup-node until a real package-lock exists.
- Added `npm run check:launch` build-time publication gate; no public preview output for review drafts.
- Verified source references and seven release-gate tests locally. GitHub Actions has since compiled Astro successfully using reproducible `npm ci` (17 Oct 2026).

## Verified private-repository milestone (17 Oct 2026)

- Repository: `SamiGLab/Mew-Maple` (initially private; made public by owner on 18 Oct 2026). No changes were made to `SamiGLab/kaftan-angelo` or any existing business domain.
- 98 initial source files imported, including 8 articles and 56 illustrations, followed by a committed dependency lockfile.
- [Source import commit](https://github.com/SamiGLab/Mew-Maple/commit/7f9390519ab876c460b6f6e7c39377c765792d9d).
- [Passing reproducible CI run](https://github.com/SamiGLab/Mew-Maple/actions/runs/39061370469).
- Preview-safe build contains no public guide pages; no draft guide was published. Production release is still gated by editorial, legal, domain, accessibility and owner approval.
