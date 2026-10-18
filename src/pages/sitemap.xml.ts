import { getCollection } from 'astro:content';
import { siteReady, validOrigin } from '../lib/site';
export async function GET() {
  const posts = await getCollection('blog');
  const site = import.meta.env.SITE || 'https://preview.invalid/';
  const paths = siteReady && validOrigin ? ['/', '/search/', '/about/', '/editorial-policy/', '/privacy/', '/affiliate-disclosure/', '/category/play/', '/category/homes/', '/category/gear/', '/category/care/', ...posts.filter(p=>p.data.status==='published').map(p=>`/guides/${p.id}/`)] : [];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>${new URL(p,site)}</loc></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type':'application/xml; charset=utf-8' } });
}
