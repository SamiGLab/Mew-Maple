import assert from 'node:assert/strict';
import { runLiveCheck } from './check-live-worker.mjs';
const html='<html><head><meta name="robots" content="noindex,nofollow"></head><body>Draft landing</body></html>';
const deployedSha='abcdef0123456789abcdef0123456789abcdef01';
function fixture(opts={}){
  return async (url)=>{
    const path=new URL(url).pathname;
    const page={
      '/':{status:200,body:html,headers:{'x-robots-tag':opts.missingHeader?'':'noindex, nofollow, noarchive'}},
      '/robots.txt':{status:200,body:'User-agent: *\nAllow: /\n'},
      '/sitemap.xml':{status:200,body:'<?xml version="1.0"?><urlset></urlset>'},
      '/search-index.json':{status:200,body:opts.searchLeak?'[{"title":"Draft"}]':'[]'},
      '/build-info.json':{status:200,body:JSON.stringify({project:'mew-maple',commit:opts.staleBuild?'0123456789abcdef0123456789abcdef01234567':deployedSha,release:opts.publishedBuild?'approved-publication':'draft-safe'})},
      '/guides/indoor-cat-enrichment-ideas/':{status:opts.articleLeak?200:404,body:'Page not found'},
      '/this-route-must-return-404-qa/':{status:404,body:'Page not found'}
    }[path];
    if(opts.dnsFail)throw new TypeError('fetch failed');
    return new Response(page.body,{status:page.status,headers:page.headers||{}});
  };
}
const url='https://mew-maple.samiayten-hu.workers.dev/';
let result=await runLiveCheck(url,fixture());
assert.equal(result.errors.length,0,JSON.stringify(result.errors));
assert.equal(result.deployedCommit,deployedSha);
result=await runLiveCheck(url,fixture(),deployedSha);
assert.equal(result.errors.length,0,JSON.stringify(result.errors));
result=await runLiveCheck(url,fixture({staleBuild:true}),deployedSha);
assert.ok(result.errors.some(x=>x.includes('Stale Worker deployment')));
result=await runLiveCheck(url,fixture({publishedBuild:true}));
assert.ok(result.errors.some(x=>x.includes('NOT draft-safe')));
for(const [option,fragment] of [
  ['searchLeak','Draft search index is not empty'],
  ['articleLeak','must return a real 404'],
  ['missingHeader','missing X-Robots-Tag'],
  ['dnsFail','network/DNS failure']
]){
  result=await runLiveCheck(url,fixture({[option]:true}));
  assert.ok(result.errors.some(x=>x.includes(fragment)),option+': '+JSON.stringify(result.errors));
}
result=await runLiveCheck('http://localhost:8787/',fixture());
assert.ok(result.errors.some(x=>x.includes('Invalid HTTPS site URL')));
console.log('Live Worker smoke tests: passed (safe preview, draft leaks, headers, DNS failure, invalid URL).');
