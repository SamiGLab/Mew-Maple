> **Historical checkpoint only.** This document records the state before the full-image visual pass. For the current image statuses, see `docs/image-qa-status.json` and `docs/VISUAL_QA_AND_SOURCE_VERIFICATION_2026-10-18.md`: **28 editorial-aligned, 23 manual-review, 5 replace-required** on 18 Oct 2026. AAFP/ISFM bibliographic identity was subsequently verified via PubMed (PMID 23422366). Do not use the historical 0-approved count as the current status. All eight articles remain under review; the site is not publication-ready.

# Mew & Maple — External-source and visual QA checkpoint (18 Oct 2026)

This is a **partial, evidence-based editorial checkpoint**, not final approval. All eight articles remain `status: review` and publication stays blocked.

## Independently opened references
- Cornell Feline Health Center, *Safe toys and gifts*: https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/safe-toys-and-gifts — accessible; warns about detachable/linear toy parts and stresses the play environment.
- ASPCA, *High-Rise Syndrome*: https://www.aspca.org/news/high-rise-syndrome-lifesaving-tips-cat-parents — accessible; confirms fall hazard from windows and need for properly secured screens. It does **not** certify any particular perch or mount.
- Ohio State Indoor Pet Initiative, *Scratching*: https://indoorpet.osu.edu/node/449 — accessible; topic matches placement and scratching guidance.
- Cats Protection, *Preparing for a cat*: https://www.cats.org.uk/help-and-advice/getting-a-cat/preparing-for-a-cat — accessible; supports separated resources and, for multi-cat households, individual essential resources plus one extra.
- Cats Protection, *Getting Another Cat*: https://www.cats.org.uk/help-and-advice/caring-for-your-cat/cats-and-your-family/other-cats — accessible; general multi-cat considerations.
- Cats Protection, *Introducing Cats*: https://www.cats.org.uk/help-and-advice/caring-for-your-cat/cats-and-your-family/introducing-cats — accessible; introductions guidance.
- Cats Protection, *Cats and Play*: https://www.cats.org.uk/help-and-advice/cat-behaviour/cats-and-play — accessible; play guidance.

## Not yet independently verified
- The PubMed Central URL https://pmc.ncbi.nlm.nih.gov/articles/PMC11383066/ returned an automated browser check when opened; its article contents were **not** independently verified in this checkpoint. Do not infer that the reference is false; verify it through an accessible authoritative copy.
- A URL opening successfully is **not** sentence-by-sentence citation validation. Every cited claim, link, attribution and any relevant scientific caveat still needs final comparison against source text.
- No veterinarian has certified, reviewed or endorsed Mew & Maple material.

## Visual audit state from `docs/image-qa-status.json`
- 56 WebP illustrations tracked.
- 48 have `pending-final-review` status.
- 8 have `updated-pending-review` status.
- **0 are `approved`**. Automated file/duplicate checks are not visual safety approval.
- Final human visual/content alignment inspection and any unsafe-image replacements remain a release blocker. Do not flip statuses merely to allow the production build.

## Work remaining before editorial signoff
1. Inspect actual full-size artwork against each guide: ropes, dangling materials, unstable perches, windows, mounting, chewing hazards, misleadingly realistic product depictions.
2. Verify all source-to-sentence mappings, including AAFP/ISFM document identity, linked clinical caveats and the exact wording of claims.
3. Review alt text and captions against **actual** images rather than filenames or AI prompts.
4. Run reproducible source/image/gate checks and inspect preview pages at mobile sizes; confirm CI status on final commit.
5. Resolve actual publisher identity, legal/privacy pages, real domain and Cloudflare Access before an access-restricted preview. Production publication requires explicit owner approval.

**Do not change** `PUBLIC_SITE_READY`, `PUBLISH_APPROVED`, `status: review`, or the production launch gate on the basis of this checkpoint.
