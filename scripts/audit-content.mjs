import { readdirSync, readFileSync, existsSync } from 'node:fs';
const files = readdirSync('src/content/blog').filter(f => f.endsWith('.md'));
const slugs = new Set();
const validCategories = new Set(['Play & Enrichment', 'Cat-Friendly Homes', 'Gear & Buying Guides', 'Everyday Cat Life']);
let errors = 0;
let images = 0;
let published = 0;
for (const file of files) {
  const raw = readFileSync(`src/content/blog/${file}`, 'utf8');
  const front = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!front) { console.error(`Missing frontmatter: ${file}`); errors++; continue; }
  const fm = front[1];
  const slug = file.slice(0, -3);
  if (slugs.has(slug)) { console.error(`Duplicate slug: ${slug}`); errors++; }
  slugs.add(slug);
  const category = fm.match(/^category:\s*(.+)$/m)?.[1]?.trim();
  if (!validCategories.has(category)) { console.error(`Invalid category: ${file}: ${category ?? 'missing'}`); errors++; }
  const status = fm.match(/^status:\s*(\S+)/m)?.[1];
  if (!['review','published'].includes(status)) { console.error(`Invalid status: ${file}`); errors++; }
  if (!/^language:\s*en-US\s*$/m.test(fm)) { console.error(`Language mismatch: ${file}`); errors++; }
  if (!/^title:\s*.+$/m.test(fm)) { console.error(`Missing title: ${file}`); errors++; }
  if (!/^heroAlt:\s*.+$/m.test(fm)) { console.error(`Missing heroAlt: ${file}`); errors++; }
  if (status === 'published') {
    published++;
    if (!/^publishedAt:\s*\d{4}-\d{2}-\d{2}/m.test(fm)) {
      console.error(`Published post missing real publication date: ${file}`); errors++;
    }
  }
  // Prevent generated explanatory diagrams being relabeled as photographs or tested products.
  const imageAlts = [...raw.matchAll(/!\[([^\]]*)\]\((\/images\/[^)]+)\)/g)];
  for (const [, alt, imagePath] of imageAlts) {
    if (!alt.trim()) { console.error(`Missing image alt text in ${file}: ${imagePath}`); errors++; }
    if (imagePath.endsWith('.svg') && !/\b(?:diagram|illustration)\b/i.test(alt)) {
      console.error(`Editorial SVG requires a descriptive diagram/illustration alt in ${file}: ${imagePath}`); errors++;
    }
  }
  const refs = [...raw.matchAll(/!\[[^\]]*\]\((\/images\/[^)]+)\)/g)];
  images += refs.length;
  for (const item of refs) {
    if (!existsSync(`public${item[1]}`)) { console.error(`Missing image: ${item[1]} in ${file}`); errors++; }
  }
  const hero = fm.match(/^hero:\s*(\/images\/\S+)/m)?.[1];
  if (!hero || !existsSync(`public${hero}`)) { console.error(`Missing hero: ${file}`); errors++; }
  if (hero && refs.some(item => item[1] === hero)) { console.error(`Hero duplicated in article body: ${file}`); errors++; }
  if (hero && !refs.some(item => item[1] === hero)) images++;
}
if (files.length < 8) { console.error('At least eight initial guides expected'); errors++; }
if (images < 56) { console.error('Expected at least 56 existing image references'); errors++; }

// Cross-guide navigation must refer to a real article. Publishing is checked separately.
for (const file of files) {
  const markdown = readFileSync(`src/content/blog/${file}`, 'utf8');
  for (const match of markdown.matchAll(/\]\(\/guides\/([^/)]+)\/?(?:#[^)]+)?\)/g)) {
    if (!slugs.has(match[1])) {
      console.error(`Broken internal guide link in ${file}: ${match[1]}`);
      errors++;
    }
  }
}
console.log(`Guides: ${files.length}; published: ${published}; image references: ${images}; errors: ${errors}`);
if (errors) process.exit(1);
