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
  const noindex = /X-Robots-Tag:\s*noindex,\s*nofollow,\s*noarchive/i.test(headers);
  if (!isReady && !noindex) fail.push('Draft build missing X-Robots-Tag: noindex');
  if (isReady && noindex) fail.push('Approved build accidentally has X-Robots-Tag: noindex');
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
for (const item of fail) console.error(item);
console.log('Workers static asset QA: errors=' + fail.length);
if (fail.length) process.exitCode = 1;
