# Workers response hardening — 18 October 2026

This change applies to **Cloudflare Workers Static Assets** through the generated `dist/_headers` file. It does not change the content release gate, the planned domain or tracking setup.

## Public/static response restrictions
- `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY` prevent MIME sniffing and reduce unintended embedding.
- `Content-Security-Policy` limits executable scripts, connections, images and fonts to local origins, disallows object embedding and cross-origin framing. `style-src 'unsafe-inline'` is retained for Astro's inline CSS; executable inline scripts are **not permitted**.
- Astro currently emits a small inline search script. The build computes its exact SHA-256 from generated HTML and inserts only that hash into the executable script CSP; no `unsafe-inline` execution is permitted. The audit recomputes the hashes and fails if a script lacks a corresponding CSP hash. New script changes thus require a freshly generated fingerprint.
- The existing referrer and unnecessary browser permissions policies remain. Inline styles are presently allowed, but inline JavaScript is permitted only when its exact SHA-256 hash appears in the generated policy.
- No external ad, analytics, map, font CDN or affiliate script is authorized. Revisit the policy when any explicitly approved third-party integration is added.

## Version checks must not be cached
`/build-info.json` contains a public Git commit fingerprint and release mode, never credentials. Its specific response rule is `Cache-Control: no-store, max-age=0` and `X-Robots-Tag: noindex, nofollow`. This applies in **both** preview and approved production. The site-wide preview noindex rule applies only when `PUBLIC_SITE_READY` is not true.

`scripts/check-workers-static.mjs` checks the site-wide and fingerprint rules independently; a noindex directive for the fingerprint endpoint must **not** fool the script into thinking the eventual approved homepage remains noindexed.

## Still to verify after Cloudflare deploy
- Real response headers via HTTPS; `_headers` syntax in the actual Worker build.
- Search page JavaScript and any future forms under the CSP in live browsers.
- Exact Git commit SHA through `/build-info.json`; its endpoint should not be cached.
- Final legal/publisher identity, verified domain and approved articles remain separate prerequisites.

This is defense-in-depth, not an external penetration test or approval to launch the blog.
