import { readdirSync, readFileSync } from 'node:fs';
const dir = 'src/content/blog';
const errors = [];
const seenTitles = new Set();
const seenDescriptions = new Set();
let links = 0;
for (const file of readdirSync(dir).filter(f => f.endsWith('.md'))) {
  const raw = readFileSync(dir + '/' + file, 'utf8');
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)?.[1];
  if (!fm) { errors.push(file + ': invalid frontmatter'); continue; }
  const title = fm.match(/^title:\s*(.+)$/m)?.[1]?.replace(/^['"]|['"]$/g,'').trim() ?? '';
  const description = fm.match(/^description:\s*(.+(?:\r?\n[ \t]+.+)*)/m)?.[1]
    ?.replace(/\s+/g,' ').replace(/^['"]|['"]$/g,'').trim() ?? '';
  if (title.length < 35 || title.length > 85) errors.push(file + ': review title length (' + title.length + ')');
  if (description.length < 100 || description.length > 170) errors.push(file + ': review description length (' + description.length + ')');
  if (seenTitles.has(title)) errors.push(file + ': duplicate SEO title');
  if (seenDescriptions.has(description)) errors.push(file + ': duplicate meta description');
  seenTitles.add(title); seenDescriptions.add(description);
  const body = raw.slice(raw.indexOf('\n---',4)+4);
  const h2 = [...body.matchAll(/^## /gm)].length;
  const localLinks = [...body.matchAll(/\]\(\/guides\/[a-z0-9-]+\/\)/g)].length;
  if (h2 < 3) errors.push(file + ': too few section headings (' + h2 + ')');
  if (localLinks < 2) errors.push(file + ': inadequate contextual internal navigation (' + localLinks + ')');
  if (/^#\s+/m.test(body)) errors.push(file + ': H1 in markdown would duplicate page-template heading');
  links += localLinks;
}
for (const e of errors) console.error(e);
console.log('Editorial SEO structure: guides=' + seenTitles.size + '; internal guide links=' + links + '; errors=' + errors.length);
if (errors.length) process.exitCode = 1;
// Length bands are editorial heuristics, not Google's ranking or snippet guarantees.
