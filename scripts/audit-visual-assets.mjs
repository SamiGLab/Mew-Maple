import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'public/images';
const ready = process.env.PUBLIC_SITE_READY === 'true';
const allowed = new Set(['approved','pending-final-review','replace-required','manual-review','updated-pending-review']);
const errors = [];
let manifest;
try { manifest = JSON.parse(readFileSync('docs/image-qa-status.json', 'utf8')); }
catch (e) { console.error('Image QA manifest missing or malformed:', e.message); process.exit(1); }
if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.images)) {
  console.error('Unrecognized visual QA manifest structure'); process.exit(1);
}
const files = readdirSync(dir).filter(x=>/\.(webp|svg)$/.test(x)).sort();
const actual = new Set(files), seen = new Set(), digestMap = new Map();
let pending = 0;
for (const image of manifest.images) {
  if (typeof image?.file !== 'string' || !/^[\w-]+\.(?:webp|svg)$/.test(image.file)) {
    errors.push('Invalid filename in QA manifest'); continue;
  }
  if (seen.has(image.file)) errors.push('Duplicate manifest entry: ' + image.file);
  seen.add(image.file);
  if (!actual.has(image.file)) errors.push('Image listed but missing from disk: ' + image.file);
  if (!allowed.has(image.status)) errors.push('Unknown image QA status: ' + image.file);
  if (image.status !== 'approved') pending++;
}
for (const name of files) {
  if (!seen.has(name)) errors.push('Image not listed in QA manifest: ' + name);
  const buf = readFileSync(join(dir, name));
  if (name.endsWith('.webp')) {
    if (buf.length < 16 || buf.toString('ascii',0,4) !== 'RIFF' || buf.toString('ascii',8,12) !== 'WEBP') {
      errors.push('Invalid WebP magic bytes: ' + name); continue;
    }
  } else if (name.endsWith('.svg')) {
    const svg = buf.toString('utf8');
    if (!/^\s*<svg\b[\s\S]*<\/svg>\s*$/.test(svg) ||
        /<\s*(?:script|foreignObject|iframe|image)\b/i.test(svg) ||
        /\bon[a-z]+\s*=/i.test(svg) ||
        /(?:href|src)\s*=\s*['"]\s*(?:https?:|data:|javascript:)/i.test(svg) ||
        /@import\b|url\s*\(/i.test(svg)) {
      errors.push('Invalid or unsafe standalone SVG illustration: ' + name); continue;
    }
  }
  const sha = createHash('sha256').update(buf).digest('hex');
  if (digestMap.has(sha)) errors.push('Byte-identical visual files: '+digestMap.get(sha)+' and '+name);
  digestMap.set(sha,name);
}
if (manifest.images.length !== files.length) errors.push('Image and manifest count mismatch');
if (ready && pending) errors.push('Public publishing BLOCKED: ' + pending + ' images lack explicit editorial sign-off');
for (const e of errors) console.error(e);
console.log('Visual QA: images='+files.length+' unique='+digestMap.size+' unapproved='+pending+' errors='+errors.length);
if (errors.length) process.exitCode = 1;
// This automated file check is not veterinary/installation/image safety certification.
