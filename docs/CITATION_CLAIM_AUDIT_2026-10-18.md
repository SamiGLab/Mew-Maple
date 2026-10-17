# Mew & Maple — Citation-to-claim editorial audit

**Date:** 2026-10-18. Scope: the eight draft guides' numbered sources. This review checks whether the cited institution/resource is an appropriate basis for each *cited* claim; it is not external expert endorsement, hands-on product testing or a check of every possible uncited assertion. Illustrations are tracked separately.

## Source register (9 distinct resources)
| ID | Publisher / resource | Content checked | Relevant boundary |
| --- | --- | --- | --- |
| S1 | Cornell Feline Health Center — Safe toys and gifts | Swallowable strands/small parts, rotating toys, play environments | Does not certify any depicted commercial/DIY toy |
| S2 | Ohio State Indoor Pet Initiative — Scratching | Surface/orientation/location preferences and stable posts | Does not certify cat-tree anchoring or product strength |
| S3 | AAFP/ISFM — Feline Environmental Needs Guidelines (2013), Ellis et al., DOI 10.1177/1098612X13477537, PMID 23422366 | Five pillars: safe places, separated resources, play/predatory opportunities, positive interaction, sensory environment | Framework, not an individual animal's treatment protocol |
| S4 | Cats Protection — Elderly cats | Reduced mobility, approachable steps/ramps, veterinary attention for changes | Do not prescribe fixed exercise duration |
| S5 | ASPCA — High-Rise Syndrome | Fall risks from unsecured windows and elevated exterior access | No endorsement of a specific perch or suction/mounting design |
| S6 | Cats Protection — Getting Another Cat | Some cats dislike companions; aggression, staring, blocking resources, cat-specific social needs | Behavior guidance, not a diagnosis |
| S7 | Cats Protection — Preparing for a Cat | Separate food and water, litter away from food; multiple resources and additional spare items in multi-cat homes | Layout must be adapted to real rooms and animals |
| S8 | Cats Protection — Cats and Play | Supervised rod toys, allow captures, brief individual play sessions, remove shreddable/entangling toys | Example play frequency is not a quota |
| S9 | Cats Protection — Introducing Cats | Gradual introduction, monitor individual behavior, weeks or longer and no guarantee of compatibility | Never force social contact |

## Claim-to-source match by draft article
| Article slug | Cited source numbers | Reviewed usage | Result |
| --- | --- | --- | --- |
| indoor-cat-enrichment-ideas | 1=S1; 2=S2; 3=S3; 4=S4 | Small-part avoidance/toy rotation; scratch placement; vertical options; mobility adaptations | Appropriate broad attribution |
| entertain-cat-while-at-work | 1=S3; 2=S5; 3=S1; 4=S2; 5=S6 | Separated needs; window falls; unsafe toys; scratching; second cat is not an automatic solution | Appropriate; unattended item suitability remains conditional |
| cat-trees-small-apartments | 1=S2; 2=S3; 3=S5 | Scratching orientation/material; environmental choice; secure windows | Appropriate; product capacity must come from manufacturer |
| diy-cat-toys | 1=S1; 2=S3 | Detachable parts; hiding/safety | Appropriate; unsafe materials are not certified by a citation |
| cat-friendly-apartment | 1=S3; 2=S5; 3=S2; 4=S7 | Five environmental pillars; window fall protection; scratching; multi-cat litter resources | Appropriate; **one illustration contradicts separate food/litter zones and requires replacement** |
| window-perch-vs-cat-tree | 1=S3; 2=S5; 3=S2 | Variety of environmental needs; window falls; scratcher suitability | Appropriate; mounting strength requires manufacturer evidence |
| indoor-cat-play-routine | 1=S3; 2=S1; 3=S8 | Play/positive interaction; ingestion precautions; short individualized play and storage | Appropriate; fixed activity quotas intentionally not prescribed |
| home-for-two-indoor-cats | 1=S3; 2=S7; 3=S6; 4=S9 | Resource separation and spare resources; conflict signals and gradual introduction | Appropriate; side-by-side bowl depiction requires replacement |

**Source links** themselves remain at the end of each Markdown guide. The PubMed bibliographic record for S3 is https://pubmed.ncbi.nlm.nih.gov/23422366/. The directly linked PMC full-text URL is legitimate but may trigger bot protection in some browsers. No broken or misattributed *institution/resource identities* were identified in this editorial pass.

## Remaining blockers
1. Correct/review the 5 required image replacements and 23 manual-review items documented in `docs/image-qa-status.json`.
2. Perform independent veterinarian/behaviorist review if planning expert endorsement; without it, never claim such endorsement.
3. Complete actual publisher, legal, privacy and domain information, then protected Cloudflare staging and mobile checks. All articles stay `review` until the whole gate passes.

This memo **does not** authorize publication and does not modify `PUBLIC_SITE_READY` or `PUBLISH_APPROVED`.
