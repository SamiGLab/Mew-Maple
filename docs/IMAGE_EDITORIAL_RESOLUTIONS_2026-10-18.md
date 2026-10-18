# Visual QA resolution — editorial caption transparency (18 Oct 2026)

This commit accepts **16** previously flagged AI illustrations as **cautionary examples**, NOT verified-safe equipment. The photos themselves have not been modified; editorial framing was corrected in the article body and captions. A consumer must not infer that hanging toys, unknown plants, fabric craft materials or mountings are proven safe.

## Scope
- Cat-friendly apartment: 3 captions; highlighted unidentified plant species, hanging accessory and unverifiable window-perch mounting
- DIY toys: 2 captions; explicitly warned about knitted tied ends, fraying and accessible craft materials
- Entertained while at work: 4 captions plus a leading safety warning distinguishing depicted hanging accessories from safe unattended objects
- Two-cat home: 2 captions about loose woven toys, ingestion/detachment and direct supervision
- Enrichment: 2 captions warning against unsupervised hanging pompom accessories and removable plush parts
- Play routine: 1 caption stressing that a partly open basket is **unsafe** unattended toy storage
- Window perch comparison: 1 caption and main hero caption warning about mounting claims and dangling accessories

## Status
In `docs/image-qa-status.json` these 16 images changed from `manual-review` to `approved` for **transparent editorial illustration use only**, each with a traceable original issue and resolution rationale. No veterinary testing, plant identification, structural/perch certification or toy test was performed.

- 44 editorial-approved images (with explicit warnings where needed).
- 7 remaining manual-review images, all in `cat-trees-small-apartments`.
- 5 newly authored SVG diagrams still require actual rendered-layout QA.
- **12 images remain unapproved; public publishing must stay blocked.**

### Next tasks
1. Resolve 7 cat-tree images, emphasizing unsafe hanging pompoms and absence of anchoring evidence.
2. Verify five SVGs after rendering at the actual mobile/desktop breakpoints.
3. Only then rerun final production release gates (editorial, legal, domain, contact and access-control requirements remain separate).
