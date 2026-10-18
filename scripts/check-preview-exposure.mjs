import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

// Only the deliberately nonpublishable build is eligible for this assertion.
// This script audits the built output rather than trusting only source flags.
if (process.env.PUBLIC_SITE_READY === 'true') {
  console.error('Preview audit is for PUBLIC_SITE_READY=false builds only.');
  process.exit(1);
}

const root = resolve('dist');
const errors = [];
const pages = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (path.endsWith('.html')) pages.push(path);
  }
}

if (!existsSync(root)) throw new Error('Missing dist; run npm run build first.');
walk(root);
if (pages.length === 0) errors.push('No HTML pages found.');
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const robots = html.match(/<meta\b[^>]*\bname=["']robots["'][^>]*>/i)?.[0] ?? '';
  if (!/\bcontent=["']noindex,nofollow["']/i.test(robots)) {
    errors.push('Missing preview noindex,nofollow: ' + file);
  }
  if (/<link\b[^>]*\brel=["']canonical["']/i.test(html)) {
    errors.push('Unexpected canonical URL on draft preview: ' + file);
  }
  if (/<meta\b[^>]*\bproperty=["']og:url["']/i.test(html)) {
    errors.push('Unexpected Open Graph public URL: ' + file);
  }
}
const sitemap = join(root, 'sitemap.xml');
if (!existsSync(sitemap)) errors.push('Missing sitemap XML.');
else if (/<url(?:\s|>)/i.test(readFileSync(sitemap,'utf8'))) errors.push('Preview sitemap contains indexed URLs.');
const rss = join(root, 'rss.xml');
if (!existsSync(rss)) errors.push('Missing RSS XML.');
else if (/<item(?:\s|>)/i.test(readFileSync(rss,'utf8'))) errors.push('Preview RSS contains draft posts.');
const search = join(root, 'search-index.json');
if (!existsSync(search)) errors.push('Missing search index.');
else {
  const data = JSON.parse(readFileSync(search,'utf8'));
  if (!Array.isArray(data) || data.length !== 0) errors.push('Preview search index leaks draft metadata.');
}
const guides = join(root,'guides');
if (existsSync(guides)) errors.push('Preview includes guide routes.');
const robotsText = join(root,'robots.txt');
if (!existsSync(robotsText)) errors.push('Missing robots.txt.');
else if (/^\s*Disallow:\s*\/\s*$/im.test(readFileSync(robotsText,'utf8'))) {
  errors.push('robots.txt blocks access to the noindex directive.');
}
for (const e of errors) console.error(e);
console.log('Preview exposure audit: html=' + pages.length + '; errors=' + errors.length);
if (errors.length) process.exitCode = 1;
