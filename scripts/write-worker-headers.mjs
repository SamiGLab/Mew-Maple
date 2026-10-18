import { mkdirSync, writeFileSync } from 'node:fs';

// Cloudflare Workers Static Assets reads dist/_headers on deploy.
// X-Robots-Tag is applied only to nonpublishable builds; never carry
// a blanket noindex header into an explicitly approved production build.
const ready = process.env.PUBLIC_SITE_READY === 'true';
const headers = [
  '/*',
  '  X-Content-Type-Options: nosniff',
  '  X-Frame-Options: DENY',
  '  Referrer-Policy: strict-origin-when-cross-origin',
  '  Permissions-Policy: camera=(), microphone=(), geolocation=()',
  // Astro bundles the search-page script; inline CSS requires unsafe-inline for styles only.
  "  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
  ...(!ready ? ['  X-Robots-Tag: noindex, nofollow, noarchive'] : []),
  '',
  '/build-info.json',
  '  Cache-Control: no-store, max-age=0',
  '  X-Robots-Tag: noindex, nofollow',
  ''
].join('\n');
mkdirSync('dist', { recursive: true });
writeFileSync('dist/_headers', headers, 'utf8');
console.log('Workers headers generated: ' + (ready ? 'approved production' : 'non-indexed draft-safe preview'));
