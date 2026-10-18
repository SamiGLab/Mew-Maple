import { mkdirSync, writeFileSync } from 'node:fs';

// Cloudflare Workers Static Assets reads dist/_headers on deploy.
// X-Robots-Tag is applied only to nonpublishable builds; never carry
// a blanket noindex header into an explicitly approved production build.
const ready = process.env.PUBLIC_SITE_READY === 'true';
const headers = [
  '/*',
  '  X-Content-Type-Options: nosniff',
  '  Referrer-Policy: strict-origin-when-cross-origin',
  '  Permissions-Policy: camera=(), microphone=(), geolocation=()',
  ...(!ready ? ['  X-Robots-Tag: noindex, nofollow, noarchive'] : []),
  ''
].join('\n');
mkdirSync('dist', { recursive: true });
writeFileSync('dist/_headers', headers, 'utf8');
console.log('Workers headers generated: ' + (ready ? 'approved production' : 'non-indexed draft-safe preview'));
