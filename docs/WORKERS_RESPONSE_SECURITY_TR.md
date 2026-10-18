# Workers response hardening — 18 October 2026

This change applies to **Cloudflare Workers Static Assets** through the generated `dist/_headers` file. It does not change the content release gate, the planned domain or tracking setup.

## Public/static response restrictions
- `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY` prevent MIME sniffing and reduce unintended embedding.
- `Content-Security-Policy` limits executable scripts, connections, images and fonts to local origins, disallows object embedding and cross-origin framing. `style-src 'unsafe-inline'` is retained for Astro's inline CSS; executable inline scripts are **not permitted**.
- The build audit rejects executable inline JavaScript emitted in HTML, so a future component cannot silently become incompatible with the response CSP.
- The existing referrer and unnecessary browser permissions policies remain.
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
