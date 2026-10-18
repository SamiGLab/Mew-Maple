import { siteReady } from '../lib/site';
export function GET() {
  // Allow crawlers to see the HTML noindex meta tag on public preview deployments.
  // Blocking robots.txt would prevent them from discovering noindex at all.
  const site = import.meta.env.SITE || 'https://preview.invalid/';
  const sitemapUrl = new URL('/sitemap.xml', site).toString();
  const sitemapIndexUrl = new URL('/sitemap-index.xml', site).toString();
  const body = siteReady
    ? `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\nSitemap: ${sitemapIndexUrl}\n`
    : 'User-agent: *\nAllow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
