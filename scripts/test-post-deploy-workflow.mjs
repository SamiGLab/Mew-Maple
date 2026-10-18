import assert from 'node:assert/strict';
import { waitForWorker } from './wait-for-worker-deploy.mjs';
import { readFileSync } from 'node:fs';

const sha='a'.repeat(40),stale='b'.repeat(40);
function fakeWorker({staleChecks=0,mode='draft-safe',draftLeak=false}={}){
  let probes=0;
  return {
    count:()=>probes,
    fetcher:async url=>{
      const p=new URL(url).pathname;
      if(p==='/build-info.json'){
        probes++;
        return new Response(JSON.stringify({
          project:'mew-maple', commit:probes<=staleChecks?stale:sha, release:mode
        }),{status:200});
      }
      const pages={
        '/':{status:200,body:'<html><head><meta name="robots" content="noindex,nofollow"></head></html>',headers:{'x-robots-tag':'noindex, nofollow, noarchive'}},
        '/robots.txt':{status:200,body:'User-agent: *\nAllow: /'},
        '/sitemap.xml':{status:200,body:'<urlset></urlset>'},
        '/search-index.json':{status:200,body:'[]'},
        '/guides/indoor-cat-enrichment-ideas/':{status:draftLeak?200:404,body:'Not found'},
        '/this-route-must-return-404-qa/':{status:404,body:'Not found'}
      };
      const page=pages[p];
      if(!page)throw Error('Unknown path '+p);
      return new Response(page.body,{status:page.status,headers:page.headers||{}});
    }
  };
}
let clock=0;
const safe=fakeWorker({staleChecks:2});
const r=await waitForWorker({expected:sha,fetcher:safe.fetcher,now:()=>clock,
  sleep:async ms=>{clock+=ms},timeoutMs:80000,pollMs:20000});
assert.equal(r.attempts,3);
assert.equal(r.commit,sha);
assert.equal(r.validation.errors.length,0);
assert.equal(safe.count(),4); // Third probe finds current SHA, final full audit rechecks it

const unsafe=fakeWorker({mode:'approved-publication'});
await assert.rejects(
  waitForWorker({expected:sha,fetcher:unsafe.fetcher,now:()=>0,sleep:async()=>{},timeoutMs:20000}),
  /UNSAFE RELEASE/
);
const leaked=fakeWorker({draftLeak:true});
await assert.rejects(
  waitForWorker({expected:sha,fetcher:leaked.fetcher,now:()=>0,sleep:async()=>{},timeoutMs:20000}),
  /LIVE SAFETY REGRESSION/
);
clock=0;
const timedOut=fakeWorker({staleChecks:99});
await assert.rejects(
  waitForWorker({expected:sha,fetcher:timedOut.fetcher,now:()=>clock,
    sleep:async ms=>{clock+=ms},timeoutMs:40000,pollMs:20000}),
  /Cloudflare did not serve expected/
);
await assert.rejects(waitForWorker({expected:'abc'}),/exact Git SHA/);
const workflow=readFileSync('.github/workflows/post-deploy-verify.yml','utf8');
assert.match(workflow,/push:\s*\n\s*branches:\s*\[main\]/);
assert.match(workflow,/cancel-in-progress:\s*true/);
assert.doesNotMatch(workflow,/PUBLIC_SITE_READY:\s*true|PUBLISH_APPROVED:\s*YES|wrangler deploy/);
console.log('Post-deploy tests passed: stale-to-current, unsafe release, draft leakage, timeout, invalid SHA, workflow scope.');
