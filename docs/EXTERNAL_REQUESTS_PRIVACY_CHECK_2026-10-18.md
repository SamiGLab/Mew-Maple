# Third-party data requests — interim privacy-safe decision

**18 October 2026, prelaunch.**

Removed the stylesheet-level `@import` request to `fonts.googleapis.com`. Loading Google Fonts from a remote origin can send visitor technical request data to the font provider before the user's consent preferences are known. The blog does not yet have a verified publisher privacy notice, cookie/consent infrastructure, analytics configuration or approved legitimate interest assessment.

The existing CSS fallback stack (`Inter, system-ui, -apple-system, sans-serif` for body text and `Fraunces, Georgia, serif` for headings) remains. Sites without locally installed Inter or Fraunces will now display system/Georgia fonts until properly licensed self-hosted font assets are added and tested. **No new font files are included or distributed.**

Before public launch:
- Verify actual network requests in the browser's Network panel, including font requests and embedded third parties, across all pages.
- Decide whether local font assets should be self-hosted. Use an appropriate redistribution license and check CLS/performance when changing fonts.
- Any analytics, affiliate embeds or external media require explicit privacy disclosures and a consent/legal-basis decision applicable to launch markets. Do not falsely claim zero data processing: the hosting provider still handles technical request logs and IP addresses.

This update does **not** finalize or approve the legal Privacy Notice and does not publish draft articles.
