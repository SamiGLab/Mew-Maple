import { readFileSync, existsSync } from 'node:fs';

const fail = [];
const config = JSON.parse(readFileSync('wrangler.jsonc', 'utf8'));
if (config.name !== 'mew-maple') fail.push('Worker name must match current existing Worker');
if (config.main) fail.push('Static Astro site must not have SSR Worker main');
if (config.assets?.directory !== './dist') fail.push('Workers must deploy built dist/, not public/');
if (config.assets?.not_found_handling !== '404-page') fail.push('Missing real 404 responses');
if (config.assets?.html_handling !== 'auto-trailing-slash') fail.push('Astro trailing-slash HTML handling mismatch');
for (const file of ['dist/index.html', 'dist/404.html', 'dist/_headers', 'dist/robots.txt', 'dist/search-index.json', 'dist/build-info.json']) {
  if (!existsSync(file)) fail.push('Missing Worker static asset: ' + file);
}
if (existsSync('dist/_headers')) {
  const headers = readFileSync('dist/_headers', 'utf8');
  const isReady = process.env.PUBLIC_SITE_READY === 'true';
  const [siteHeaders, buildHeaders] = headers.split(/\n\/build-info\.json\s*\n/);
  const noindex = /X-Robots-Tag:\s*noindex,\s*nofollow,\s*noarchive/i.test(siteHeaders);
  if (!isReady && !noindex) fail.push('Draft build missing X-Robots-Tag: noindex');
  if (isReady && noindex) fail.push('Approved build accidentally has blanket X-Robots-Tag: noindex');
  for (const [name,pattern] of [
    ['frame protection',/X-Frame-Options:\s*DENY/i],
    ['MIME sniffing protection',/X-Content-Type-Options:\s*nosniff/i],
    ['strict script CSP',/Content-Security-Policy:[^\n]*script-src 'self';[^\n]*object-src 'none';[^\n]*frame-ancestors 'none'/i],
  ]) if (!pattern.test(siteHeaders)) fail.push('Missing Workers '+name);
  if (!buildHeaders || !/Cache-Control:\s*no-store,\s*max-age=0/i.test(buildHeaders))
    fail.push('Build identity endpoint requires no-store cache policy');
  if (!buildHeaders || !/X-Robots-Tag:\s*noindex/i.test(buildHeaders))
    fail.push('Build identity endpoint must never be indexed');
}
if (existsSync('dist/build-info.json')) {
  let info;
  try { info=JSON.parse(readFileSync('dist/build-info.json','utf8')); }
  catch { fail.push('Invalid Workers build-info.json'); }
  if(info) {
    if(info.project !== 'mew-maple') fail.push('Incorrect build-info project');
    const expected=process.env.PUBLIC_SITE_READY==='true'?'approved-publication':'draft-safe';
    if(info.release !== expected) fail.push('Build fingerprint does not match release mode');
    if(info.commit !== null && !/^[a-f0-9]{40}$/.test(info.commit||'')) fail.push('Malformed build fingerprint commit');
    if(process.env.WORKERS_CI === '1' &&
       info.commit !== (process.env.WORKERS_CI_COMMIT_SHA||'').toLowerCase()) {
      fail.push('Build fingerprint does not match Workers CI commit');
    }
  }
}
// A self-only CSP rejects executable inline JavaScript. Astro's <script> should bundle
// to a local src; fail closed if a new template accidentally introduces inline JS.
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
function walkHtml(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir,entry);
    if(statSync(path).isDirectory())walkHtml(path);
    else if(path.endsWith('.html')){
      const html=readFileSync(path,'utf8');
      for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
        const attrs=match[1],body=match[2];
        const inert=/\btype=["'](?:application\/ld\+json|application\/json)["']/i.test(attrs);
        if(!inert && !/\bsrc\s*=/i.test(attrs) && body.trim())
          fail.push('Executable inline script incompatible with strict CSP: '+path);
      }
    }
  }
}
if(existsSync('dist'))walkHtml('dist');
for (const item of fail) console.error(item);
console.log('Workers static asset QA: errors=' + fail.length);
if (fail.length) process.exitCode = 1;
