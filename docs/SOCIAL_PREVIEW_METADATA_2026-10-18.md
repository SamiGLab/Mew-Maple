# Social metadata acceptance — 18 Oct 2026

The site previously included basic Open Graph title/description, but lacked site name, locale and accessible image descriptions on share cards.

This change adds:
- `og:site_name`, `og:locale`, and Twitter/X card title/description.
- `og:image:alt` and `twitter:image:alt` using each article's actual editorial hero alt text.
- Large-image social cards only if `siteReady` and a verified release origin are provided. No public social image URLs are exposed by the draft-safe Worker.
- RSS discovery link only when the full release gate opens.
- Extra static preview checks prohibiting public social image references and RSS discovery while content remains `review`.

**Launch checklist:** After real domain ownership and publication, validate Open Graph and Twitter cards against actual crawler previews, social crop/alt descriptions and returned media types. Do not confuse automated source checks with live social-platform scraping approval. Current brand/domain ownership and legal pages remain unresolved. No article publication date/status was changed.
