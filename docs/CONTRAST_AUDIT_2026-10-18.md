# Mew & Maple — typography contrast adjustment (2026-10-18)

WCAG AA non-large text should generally reach 4.5:1; large text should reach at least 3:1. The original stylesheet used subtle green and gray text that is inadequate for some light-background combinations.

| Style | Old foreground | New foreground | Representative light-background contrast |
| --- | --- | --- | --- |
| Category eyebrow | `#6B7F71` | `#526B58` | On `#E5EDE5`, improved from ~3.59:1 to ~4.88:1 |
| Card metadata | `#6C8271` | `#526B58` | On white, improved from ~4.14:1 to ~5.83:1 |
| Article byline | `#7B887E` | `#526B58` | On `#FAF8F3`, improved from ~3.49:1 to ~5.49:1 |
| Hero emphasized title | `#76927B` | `#526B58` | On `#E5EDE5`, improved from ~2.85:1 to ~4.88:1 |

The color change retains a forest/sage character without requiring visitor-supplied preferences. These values are computed contrasts, **not** a claim that all WCAG or mobile audits have passed. Browser QA and 200%/400% zoom remain release checks.
