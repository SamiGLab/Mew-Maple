import { readdirSync, readFileSync } from 'node:fs';

// This check runs in the safe preview too: stage one guide at a time without
// accidentally publishing cross-links to routes that do not yet exist.
const base='src/content/blog';
const files=readdirSync(base).filter(x=>x.endsWith('.md')).sort();
const guides=new Map();
const problems=[];
for(const file of files){
  const raw=readFileSync(base+'/'+file,'utf8');
  const front=raw.match(/^---\n([\s\S]*?)\n---/);
  if(!front){problems.push(file+': no frontmatter');continue;}
  const status=front[1].match(/^status:\s*(\S+)/m)?.[1];
  const publishedAt=front[1].match(/^publishedAt:\s*(\S+)/m)?.[1];
  guides.set(file.slice(0,-3),{status,publishedAt,raw});
}
if(guides.size!==8)problems.push('Expected exactly eight prepared editorial guides');
if(!guides.has('indoor-cat-enrichment-ideas'))problems.push('Missing first rollout guide');
const checks=[...guides.entries()].filter(([slug,data])=>
  data.status==='published'||slug==='indoor-cat-enrichment-ideas');
for(const [slug,data] of checks){
  if(data.status==='published'){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(data.publishedAt||''))
      problems.push(slug+': published guide must have a genuine publishedAt date');
    else {
      const d=new Date(data.publishedAt+'T00:00:00Z');
      if(Number.isNaN(d.getTime())||d.toISOString().slice(0,10)!==data.publishedAt)
        problems.push(slug+': invalid publication date');
    }
  }
  for(const match of data.raw.matchAll(/\]\(\/guides\/([^/)]+)\/?(?:#[^)]+)?\)/g)){
    const target=match[1];
    if(guides.get(target)?.status!=='published')
      problems.push(slug+': staged/published article links to unpublished /guides/'+target+'/');
  }
}
for(const p of problems)console.error('ROLLOUT ERROR: '+p);
console.log('Staged guide rollout: guides='+guides.size+', public='+[...guides.values()].filter(x=>x.status==='published').length+', problems='+problems.length);
if(problems.length)process.exitCode=1;
