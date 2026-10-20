import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

if (process.env.PUBLIC_SITE_READY !== 'true') {
  console.error('Production output audit requires PUBLIC_SITE_READY=true.');
  process.exit(1);
}

const root = resolve('dist');
const errors = [];
const blogDir = 'src/content/blog';
const publishedSlugs = [];
const reviewSlugs = [];

for (const file of readdirSync(blogDir).filter(f => f.endsWith('.md')).sort()) {
  const raw = readFileSync(join(blogDir, file), 'utf8');
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '';
  const status = fm.match(/^status:\s*(\S+)/m)?.[1];
  const slug = file.slice(0, -3);
  if (status === 'published') publishedSlugs.push(slug);
  else reviewSlugs.push(slug);
}

const sitemap = existsSync(join(root, 'sitemap.xml')) ? readFileSync(join(root, 'sitemap.xml'), 'utf8') : '';
const rss = existsSync(join(root, 'rss.xml')) ? readFileSync(join(root, 'rss.xml'), 'utf8') : '';
const searchRaw = existsSync(join(root, 'search-index.json')) ? readFileSync(join(root, 'search-index.json'), 'utf8') : '[]';
const searchIndex = JSON.parse(searchRaw);
const searchUrls = new Set(searchIndex.map(entry => entry.url));

for (const slug of publishedSlugs) {
  const htmlPath = join(root, 'guides', slug, 'index.html');
  if (!existsSync(htmlPath)) {
    errors.push(`Missing built HTML for published guide: ${slug}`);
    continue;
  }
  const html = readFileSync(htmlPath, 'utf8');
  if (!/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["']index,follow["']/i.test(html)) {
    errors.push(`Published guide missing index,follow robots meta: ${slug}`);
  }
  if (!/<link\b[^>]*\brel=["']canonical["']/i.test(html)) {
    errors.push(`Published guide missing canonical link: ${slug}`);
  }
  if (!/<meta\b[^>]*\bproperty=["']article:published_time["']/i.test(html)) {
    errors.push(`Published guide missing article:published_time meta: ${slug}`);
  }
  if (!html.includes('"@type":"BreadcrumbList"')) {
    errors.push(`Published guide missing BreadcrumbList JSON-LD: ${slug}`);
  }
  if (!html.includes('"@type":"FAQPage"')) {
    errors.push(`Published guide missing FAQPage JSON-LD: ${slug}`);
  }
  if (!sitemap.includes(`/guides/${slug}/</loc>`)) {
    errors.push(`Published guide missing from sitemap.xml: ${slug}`);
  }
  if (!rss.includes(`/guides/${slug}/</link>`)) {
    errors.push(`Published guide missing from rss.xml: ${slug}`);
  }
  if (!searchUrls.has(`/guides/${slug}/`)) {
    errors.push(`Published guide missing from search-index.json: ${slug}`);
  }
}

const notFoundHtml = existsSync(join(root, '404.html')) ? readFileSync(join(root, '404.html'), 'utf8') : '';
if (!/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["']noindex,nofollow["']/i.test(notFoundHtml)) {
  errors.push('404.html must have noindex,nofollow robots meta');
}
if (/<link\b[^>]*\brel=["']canonical["']/i.test(notFoundHtml)) {
  errors.push('404.html must not emit a canonical URL');
}

const homeHtml = existsSync(join(root, 'index.html')) ? readFileSync(join(root, 'index.html'), 'utf8') : '';
if (!homeHtml.includes('"@type":"WebSite"') || !homeHtml.includes('"@type":"Organization"')) {
  errors.push('Homepage missing WebSite/Organization JSON-LD schema');
}
if (!sitemap.includes('<lastmod>')) {
  errors.push('sitemap.xml missing <lastmod> entries');
}

for (const slug of reviewSlugs) {
  const htmlPath = join(root, 'guides', slug, 'index.html');
  if (existsSync(htmlPath)) {
    errors.push(`Unapproved review guide was exported to dist: ${slug}`);
  }
  if (sitemap.includes(`/guides/${slug}/`)) {
    errors.push(`Unapproved review guide leaked into sitemap.xml: ${slug}`);
  }
  if (rss.includes(`/guides/${slug}/`)) {
    errors.push(`Unapproved review guide leaked into rss.xml: ${slug}`);
  }
  if (searchUrls.has(`/guides/${slug}/`)) {
    errors.push(`Unapproved review guide leaked into search-index.json: ${slug}`);
  }
}

for (const e of errors) console.error('PRODUCTION AUDIT ERROR: ' + e);
console.log(`Production output audit: published=${publishedSlugs.length} reviewExcluded=${reviewSlugs.length} errors=${errors.length}`);
if (errors.length) process.exitCode = 1;
