import { readdirSync, readFileSync } from 'node:fs';

// A RELEASE gate is different from a crawler directive: a preview is not approved content.
// Run this script before any publishable static build, not only after deployment.
const ready = process.env.PUBLIC_SITE_READY === 'true';
if (!ready) {
  console.log('PREVIEW-SAFE BUILD: PUBLIC_SITE_READY is not true; public guide routes must be excluded.');
  process.exit(0);
}

const errors = [];
const base = 'src/content/blog';
const articleFiles = readdirSync(base).filter(f => f.endsWith('.md'));
const articleInfo = new Map();

const rawSiteUrl = process.env.SITE_URL || '';
let siteUrl;
try { siteUrl = new URL(rawSiteUrl); } catch { /* validation below */ }
if (!siteUrl || siteUrl.protocol !== 'https:' || siteUrl.username || siteUrl.password ||
    siteUrl.port || siteUrl.pathname !== '/' || siteUrl.search || siteUrl.hash ||
    !siteUrl.hostname.includes('.') ||
    /(^|\.)(invalid|test|example|localhost|local|pages\.dev|workers\.dev)$/.test(siteUrl.hostname) ||
    /(^|\.)(example\.com|example\.org|example\.net|127\.0\.0\.1)$/.test(siteUrl.hostname)) {
  errors.push('SITE_URL must be your verified, production HTTPS custom domain (no preview, example or localhost URLs).');
}
if (process.env.PUBLISH_APPROVED !== 'YES') {
  errors.push('PUBLISH_APPROVED=YES is required after the owner approves the release.');
}

for (const filename of articleFiles) {
  const content = readFileSync(`${base}/${filename}`, 'utf8');
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---\n/)?.[1] || '';
  const status = frontmatter.match(/^status:\s*(\S+)/m)?.[1];
  const publicationDate = frontmatter.match(/^publishedAt:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
  const slug = filename.slice(0,-3);
  articleInfo.set(slug,{status,publicationDate,content});
}
const approved = [...articleInfo].filter(([, entry]) => entry.status === 'published');
if (approved.length === 0) errors.push('No guide has status: published.');
for (const [slug, post] of approved) {
  if (!post.publicationDate || Number.isNaN(new Date(`${post.publicationDate}T00:00:00Z`).valueOf())) {
    errors.push(`${slug}: a valid publishedAt: YYYY-MM-DD is required.`);
  } else if (new Date(`${post.publicationDate}T00:00:00Z`) > new Date()) {
    errors.push(`${slug}: publishedAt must not be a future date.`);
  }
  // A published guide must never link internally to a draft guide, which has no public route.
  for (const match of post.content.matchAll(/\]\(\/guides\/([^/)]+)\/?(?:#[^)]+)?\)/g)) {
    const target = match[1];
    if (articleInfo.get(target)?.status !== 'published') {
      errors.push(`${slug}: links to unpublished or missing guide /guides/${target}/.`);
    }
  }
}

for (const page of ['about.astro', 'privacy.astro', 'editorial-policy.astro', 'affiliate-disclosure.astro']) {
  const html = readFileSync(`src/pages/${page}`, 'utf8');
  if (/Before launch:|placeholder|not publication-ready|Draft: publisher|draft preview|privacy notice — draft|not a legal privacy policy|At the time of this draft preview/i.test(html)) {
    errors.push(`${page}: still contains editorial/legal draft material.`);
  }
}
if (errors.length) {
  console.error('LAUNCH BLOCKED:\n - ' + errors.join('\n - '));
  process.exit(1);
}
console.log(`Release gate passed: ${approved.length} approved guides and no links to unpublished guides.`);
