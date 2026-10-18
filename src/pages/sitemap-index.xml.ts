import { getCollection } from 'astro:content';
import { siteReady, validOrigin } from '../lib/site';

export async function GET() {
  const posts = (await getCollection('blog')).filter(p => p.data.status === 'published');
  const site = import.meta.env.SITE || 'https://preview.invalid/';
  const dates = posts.map(p => (p.data.updatedAt ?? p.data.publishedAt)?.toISOString().slice(0, 10)).filter(Boolean) as string[];
  const latestDate = dates.sort().at(-1) ?? '2026-10-18';
  const body = siteReady && validOrigin
    ? `\n  <sitemap>\n    <loc>${new URL('/sitemap-0.xml', site).toString()}</loc>\n    <lastmod>${latestDate}</lastmod>\n  </sitemap>\n`
    : '';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
