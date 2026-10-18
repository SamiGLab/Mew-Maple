> **Update 18 Oct 2026 — replacement implementation:** The five `replace-required` WebP illustrations below were replaced in their article references with original, static, self-contained SVG guidance diagrams and the obsolete WebP files were deleted from the repository. The five new SVGs are **updated-pending-review**, not yet visually approved after rendering. The other 23 manual-review files remain open. Consult `docs/image-qa-status.json` for current release status; the 28/23/5 counts recorded below describe the initial visual audit.

# Mew & Maple: illustrated editorial QA report — 18 October 2026

## What was actually checked
All **56 original full-size WebP illustrations** were opened directly from the GitHub repository and compared with the corresponding article's alt text and caption. Human/perceptual image inspection is not a manufacturer load test, toxicology review or veterinary endorsement.

| Status | Count | Meaning |
| --- | ---: | --- |
| approved | 28 | No obvious contradiction found; image/alt/caption broadly consistent. |
| manual-review | 23 | Visible hanging toys, unspecified plants, unverified mountings or inaccessible-storage issues remain; needs further judgment or safer artwork. |
| replace-required | 5 | Visual conflicts directly with explicit safety/resource guidance; must replace before publication. |

## Images that must be replaced
- `cat-friendly-apartment-figure-03.webp`: Hanging tunnel toy and unattached feather toy on carpet contradict safe, unattended-retreat concept.
- `cat-friendly-apartment-figure-04.webp`: Food and water immediately adjacent to litter cabinet, contradicting resource separation guidance.
- `home-for-two-indoor-cats-figure-04.webp`: Feeding bowls are side-by-side while article advocates separated feeding stations.
- `window-perch-vs-cat-tree-figure-04.webp`: Exposed toy baskets accessible to cats conflict with closed, inaccessible supervised-toy storage.
- `window-perch-vs-cat-tree-figure-06.webp`: Loose feather lure left out on floor near resting cat.

Other file-specific observations are recorded within `docs/image-qa-status.json`. Captions of high-risk files were explicitly corrected so no one treats draft artwork as a safety illustration. The 5 replacement-required assets must be replaced and reviewed before changing the production publishing gate. Do not mark these files approved based solely on blanket owner consent.

## Source verification checkpoint
- 2013 **AAFP and ISFM Feline Environmental Needs Guidelines**, Ellis et al., Journal of Feline Medicine and Surgery 15(3), 219–230, DOI `10.1177/1098612X13477537`, PMID 23422366 and PMCID PMC11383066: bibliographic identity **verified via PubMed**: https://pubmed.ncbi.nlm.nih.gov/23422366/ . Publisher/web-index abstract supports the five-pillar environmental framework; direct PMC viewing occasionally presents a browser verification challenge. This is not independent veterinary signoff of all individual article sentences.
- Cornell Feline Health Center **Safe Toys and Gifts**: https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/safe-toys-and-gifts — text directly supports small-part/strand avoidance and toy rotation.
- Ohio State Indoor Pet Initiative **Scratching**: https://indoorpet.osu.edu/node/449 — text directly supports location/orientation/surface preference and adequate stability.
- ASPCA **High-Rise Syndrome**: https://www.aspca.org/news/high-rise-syndrome-lifesaving-tips-cat-parents — confirms window/fall risk; does not certify perches.
- Cats Protection **Preparing for a Cat**, **Introducing Cats**: resource location and cat-introduction advice accessed at their respective article URLs.

### Still required
Citation-by-citation claims assessment for all article paragraphs, visual replacement/second-pass QA, verify alt texts of replacements, owner/publisher/legal/actual domain and restricted staging, final mobile accessibility & production smoke tests. Site must remain `PUBLIC_SITE_READY=false` and all articles `status: review` until the complete launch checklist is met.
