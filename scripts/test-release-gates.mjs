import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

// This test writes only to an isolated temporary copy, NEVER to real editorial content.
const root = resolve('.');
const work = mkdtempSync(join(tmpdir(), 'mew-maple-release-gate-'));
const fixture = join(work, 'site');
let failed = 0;
function runCase(name, env, success, expectedText) {
  const proc = spawnSync(process.execPath, [join(root, 'scripts/check-launch.mjs')],
    { cwd: fixture, encoding: 'utf8', env: { ...process.env, ...env } });
  const output = `${proc.stdout}\n${proc.stderr}`;
  const pass = (proc.status === 0) === success && (!expectedText || output.includes(expectedText));
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}${pass ? '' : `\n${output}`}`);
  if (!pass) failed++;
}
function adjustAll(status) {
  const files = ['indoor-cat-enrichment-ideas','entertain-cat-while-at-work','cat-trees-small-apartments','diy-cat-toys','cat-friendly-apartment','window-perch-vs-cat-tree','indoor-cat-play-routine','home-for-two-indoor-cats'];
  for (const slug of files) {
    const path = join(fixture, 'src/content/blog',`${slug}.md`);
    let content = readFileSync(path,'utf8').replace(/status: (review|published)/,'status: '+status);
    if (status === 'published' && !/^publishedAt:/m.test(content)) content=content.replace('status: published','status: published\npublishedAt: 2026-10-01');
    writeFileSync(path, content);
  }
}
try {
  mkdirSync(join(fixture, 'src/content'), {recursive:true});
  mkdirSync(join(fixture, 'src/pages'), {recursive:true});
  cpSync(join(root, 'src/content/blog'), join(fixture, 'src/content/blog'),{recursive:true});
  for(const page of ['about.astro','privacy.astro','editorial-policy.astro','affiliate-disclosure.astro']) cpSync(join(root,'src/pages',page),join(fixture,'src/pages',page));
  const prodEnv={ PUBLIC_SITE_READY:'true', PUBLISH_APPROVED:'YES', SITE_URL:'https://mew-and-maple.net' };
  runCase('Preview mode allows static safe build', { PUBLIC_SITE_READY:'false' }, true, 'PREVIEW-SAFE BUILD');
  runCase('Publish gate blocks all-review content', prodEnv, false, 'No guide has status: published');
  adjustAll('published');
  runCase('Publish gate blocks incomplete legal pages', prodEnv, false, 'legal draft material');
  for(const page of ['about.astro','privacy.astro','editorial-policy.astro','affiliate-disclosure.astro']) writeFileSync(join(fixture,'src/pages',page),'Approved publication text for automated fixture.');
  runCase('Publish gate accepts approved fixture', prodEnv, true, 'Release gate passed');
  const dateFixture=join(fixture,'src/content/blog/indoor-cat-enrichment-ideas.md');
  const approvedArticle=readFileSync(dateFixture,'utf8');
  function checkDateCase(name, replacement, expectedText) {
    writeFileSync(dateFixture,approvedArticle.replace(/^publishedAt:\s*\d{4}-\d{2}-\d{2}\s*$/m, replacement));
    runCase(name,prodEnv,false,expectedText);
    writeFileSync(dateFixture,approvedArticle);
  }
  checkDateCase('Reject nonexistent Gregorian date','publishedAt: 2026-02-30','genuine Gregorian');
  checkDateCase('Reject future publication date','publishedAt: 2099-01-01','must not be a future date');
  checkDateCase('Reject updatedAt before publishedAt',
    'publishedAt: 2026-10-01\\nupdatedAt: 2026-09-29','cannot precede publishedAt');
  checkDateCase('Reject invalid updatedAt',
    'publishedAt: 2026-10-01\\nupdatedAt: 2026-02-30','updatedAt must be a genuine Gregorian');

  runCase('Publish gate rejects example domains',{...prodEnv,SITE_URL:'https://example.com'},false, 'SITE_URL');
  const fname=join(fixture,'src/content/blog/indoor-cat-play-routine.md');
  const f=readFileSync(fname,'utf8').replace('status: published','status: review');
  writeFileSync(fname,f);
  runCase('Published links to draft fail',prodEnv,false,'links to unpublished');
  runCase('Explicit owner approval cannot be omitted',{...prodEnv,PUBLISH_APPROVED:'NO'},false,'PUBLISH_APPROVED=YES');
} finally {rmSync(work,{recursive:true,force:true});}
if(failed) process.exit(1);
