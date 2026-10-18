# Google Search Console — Mew & Maple verification

Date: 2026-10-18. Owner supplied the **HTML-tag URL-prefix verification method** for Google Search Console.

## Completed in source

Shared Astro layout contains the exact public Google Search Console verification meta tag, so it is exposed inside `<head>` on the homepage. Automated source tests require exactly one tag, and the live Worker smoke test requires it in the actual HTTP body. The token is ownership proof and **not** a private API key.

## Important: which property does this verify?

1. Existing working preview: `https://mew-maple.samiayten-hu.workers.dev/`. Google Search Console > Add property > **URL prefix**. Enter the complete URL including HTTPS and final slash, choose HTML tag and press Verify **after** the post-deploy Worker test completes. The tag must be visible on that specific hostname.
2. Future branded site: `https://mewandmaple.com/` is owned at Namecheap but the custom domain is **not connected** to Workers yet by owner's earlier instruction. The same tag can verify the branded **URL-prefix property only after DNS, TLS and Worker Custom Domain are correctly connected**.
3. To verify a Google Search Console **Domain property** (`mewandmaple.com`, encompassing protocols/subdomains), use the **Google-supplied DNS TXT record** at the active authoritative DNS provider. HTML meta tags cannot verify Domain properties. The HTML token here is **not** a DNS record and should never be copied into a TXT record unless Google explicitly provides a matching DNS TXT value.

## What is NOT completed

- The website source update does not add a Google Search Console property to the owner's Google account, cannot press Google's Verify button, and cannot independently confirm Google's ownership outcome.
- The preview is deliberately `noindex,nofollow`, and the articles remain `review`. Ownership verification **is not** authorization to index previews or publish draft guides. Do **not** submit draft URLs for indexing.
- Google Analytics or tracking cookies were not introduced.
- The custom domain's DNS and launch flags remain untouched.

## Post-deploy acceptance

Run the GitHub `post-deploy-verify.yml` and confirm the merged `main` SHA matches `/build-info.json`. The HTTP smoke test also verifies that the exact HTML ownership meta tag is visible on the homepage. Then owner can complete Google's property verification in Search Console.

For the eventual public release, connect the domain, complete the legal/publisher gates, approve actual article publication and only then submit a production sitemap and monitor Search Console indexing reports.
