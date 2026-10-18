// Compile-time publication gate. A build with PUBLIC_SITE_READY=false serves no draft guides.
export const brand = 'Mew & Maple';
export const description = 'Practical, safety-minded ideas for happier indoor-cat living.';
export const validOrigin = /^https:\/\/[^/]+/.test(import.meta.env.SITE ?? '')
  && !String(import.meta.env.SITE ?? '').includes('.invalid');
export const siteReady = import.meta.env.PUBLIC_SITE_READY === 'true' && validOrigin;
// Review copies are visible ONLY in local development. Never in deployed static previews.
export const localReviewMode = import.meta.env.DEV === true && !siteReady;
export const publishable = (post: { data: { status: string } }) =>
  (siteReady && post.data.status === 'published') || localReviewMode;
export const categories = [
  { id: 'play', title: 'Play & Enrichment' },
  { id: 'homes', title: 'Cat-Friendly Homes' },
  { id: 'gear', title: 'Gear & Buying Guides' },
  { id: 'care', title: 'Everyday Cat Life' },
];
export function categorySlug(category: string) {
  const normalized = category.trim().toLocaleLowerCase('en-US');
  const match = categories.find(item => item.title.toLocaleLowerCase('en-US') === normalized);
  if (!match) throw new Error(`Unknown guide category: ${category}`);
  return match.id;
}
