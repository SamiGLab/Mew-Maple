import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

const root = resolve('dist');
const failures = [];
let inspectedLinks = 0;
let inspectedPages = 0;

function walk(directory) {
  const found = [];
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) found.push(...walk(path));
    else if (path.endsWith('.html')) found.push(path);
  }
  return found;
}

if (!existsSync(root)) throw new Error('Build dist directory does not exist');
const pages = walk(root);
for (const file of pages) {
  inspectedPages++;
  const html = readFileSync(file, 'utf8');
  const pageIds = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]));
  const hrefs = [...html.matchAll(/\bhref=["']([^"']*)["']/g)].map(match => match[1]);
  for (const href of hrefs) {
    inspectedLinks++;
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') ||
        href.startsWith('https://') || href.startsWith('http://')) continue;
    if (href.startsWith('#')) {
      if (!pageIds.has(href.slice(1))) failures.push(file + ' missing page anchor: ' + href);
      continue;
    }
    if (!href.startsWith('/')) continue;
    const url = new URL(href, 'https://preview.invalid');
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.includes('..')) { failures.push(file + ' suspicious local path: ' + pathname); continue; }
    const target = join(root, pathname);
    const resolved = existsSync(target) && statSync(target).isFile() ? target
      : join(target, 'index.html');
    if (!existsSync(resolved)) failures.push(file + ' missing linked resource: ' + pathname);
    if (url.hash && pathname === '/' + file.slice(root.length + 1).replace(/index.html$/, '')) {
      if (!pageIds.has(url.hash.slice(1))) failures.push(file + ' missing local anchor: ' + url.hash);
    }
  }
}

for (const mandatory of ['index.html', '404.html', 'search/index.html', 'search-index.json']) {
  if (!existsSync(join(root, mandatory))) failures.push('Missing required route: ' + mandatory);
}

const index = JSON.parse(readFileSync(join(root, 'search-index.json'), 'utf8'));
if (!Array.isArray(index)) failures.push('Search index must be a JSON array');
if (process.env.PUBLIC_SITE_READY !== 'true' && index.length !== 0) {
  failures.push('Draft-safe build exported guide metadata into search-index.json');
}
for (const error of failures) console.error(error);
console.log('Static QA: pages=' + inspectedPages + ' checkedLinks=' + inspectedLinks + ' errors=' + failures.length);
if (failures.length) process.exitCode = 1;
