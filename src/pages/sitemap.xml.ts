import { getCollection } from 'astro:content';
import { siteReady, validOrigin } from '../lib/site';
export async function GET() {
  const posts = (await getCollection('blog')).filter(p => p.data.status === 'published');
  const site = import.meta.env.SITE || 'https://preview.invalid/';
  const dates = posts.map(p => (p.data.updatedAt ?? p.data.publishedAt)?.toISOString().slice(0, 10)).filter(Boolean) as string[];
  const latestDate = dates.sort().at(-1) ?? '2026-10-18';
  const staticPaths = ['/', '/start-here/', '/notebook/', '/notebook/small-room-plan/', '/contact/', '/search/', '/about/', '/editorial-policy/', '/privacy/', '/affiliate-disclosure/', '/category/play/', '/category/homes/', '/category/gear/', '/category/care/'];
  const entries = siteReady && validOrigin ? [
    ...staticPaths.map(p => ({ loc: new URL(p, site).toString(), lastmod: latestDate })),
    ...posts.map(p => ({
      loc: new URL(`/guides/${p.id}/`, site).toString(),
      lastmod: (p.data.updatedAt ?? p.data.publishedAt)?.toISOString().slice(0, 10) ?? latestDate,
    })),
  ] : [];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.map(e => `<url><loc>${e.loc}</loc><lastmod>${e.lastmod}</lastmod></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
