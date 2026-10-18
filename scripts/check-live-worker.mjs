import { pathToFileURL } from 'node:url';

export const defaultLiveUrl = 'https://mew-maple.samiayten-hu.workers.dev/';
export const checks = [
  ['home','/'],
  ['robots','/robots.txt'],
  ['sitemap','/sitemap.xml'],
  ['search','/search-index.json'],
  ['build','/build-info.json'],
  ['brandLight','/brand/avatar-light.svg'],
  ['brandDark','/brand/avatar-dark.svg'],
  ['brandFavicon','/brand/favicon.svg'],
  ['brandManifest','/site.webmanifest'],
  ['draft','/guides/indoor-cat-enrichment-ideas/'],
  ['notFound','/this-route-must-return-404-qa/']
];

function robotsMeta(html){
  return [...html.matchAll(/<meta\b[^>]*>/gi)]
    .some(m => /\bname\s*=\s*["']robots["']/i.test(m[0]) &&
      /\bcontent\s*=\s*["'][^"']*\bnoindex\b/i.test(m[0]));
}
export async function runLiveCheck(rawUrl=defaultLiveUrl,fetcher=fetch,expectedSha=process.env.LIVE_WORKER_EXPECTED_SHA||''){
  const results=[]; const errors=[];
  let origin;
  try{
    const u=new URL(rawUrl);
    if(u.protocol!=='https:' || u.username || u.password || u.port ||
      u.pathname!=='/' || u.search || u.hash)throw new Error('Expected a bare HTTPS origin.');
    origin=u.origin;
  }catch(e){return {origin:null,results,errors:['Invalid HTTPS site URL: '+e.message]};}
  const fetched={};
  for(const [kind,path] of checks){
    const uri=origin+path;
    try{
      const response=await fetcher(uri,{signal:AbortSignal.timeout(12000),redirect:'follow'});
      const body=await response.text();
      fetched[kind]={response,body};
      results.push({path,status:response.status,robots:response.headers.get('x-robots-tag')||''});
    }catch(e){
      errors.push(path+': network/DNS failure ('+String(e.message||e).slice(0,160)+')');
    }
  }
  function must(test,message){if(!test)errors.push(message)}
  if(fetched.home){
    const {response,body}=fetched.home;
    must(response.status===200,'/ must return 200');
    must(body.includes('<html') || body.includes('<HTML'),'/ must contain HTML');
    must(robotsMeta(body),'/ missing HTML meta noindex');
    must(/\bnoindex\b/i.test(response.headers.get('x-robots-tag')||''),'/ missing X-Robots-Tag: noindex');
    must(!/rel\s*=\s*["']canonical["']/i.test(body),'Draft homepage has an unexpected canonical URL');
    must(body.includes('/brand/avatar-light.svg') && body.includes('INDOOR CAT LIVING'),
      'Live homepage is still showing an outdated temporary brand mark');
    must(!body.includes('logo-symbol'),'Live homepage includes legacy M-star-M CSS logo');
  }
  if(fetched.robots){
    const {response,body}=fetched.robots;
    must(response.status===200,'/robots.txt must return 200');
    must(/User-agent:\s*\*/i.test(body),'/robots.txt missing User-agent');
    must(!/^\s*Disallow:\s*\/\s*$/im.test(body),'/robots.txt blocks seeing meta noindex');
    must(!/^\s*Sitemap:/im.test(body),'Draft robots.txt must not advertise a sitemap');
  }
  if(fetched.sitemap){
    const {response,body}=fetched.sitemap;
    must(response.status===200,'/sitemap.xml must return 200');
    must(!/<url(?:\s|>)/i.test(body),'Draft sitemap contains indexed URLs');
  }
  if(fetched.search){
    const {response,body}=fetched.search;
    must(response.status===200,'/search-index.json must return 200');
    try{
      const j=JSON.parse(body);
      must(Array.isArray(j)&&j.length===0,'Draft search index is not empty');
    }catch{errors.push('Search index is not valid JSON');}
  }
  let deployedCommit=null;
  if(expectedSha && !/^[a-f0-9]{40}$/i.test(expectedSha))errors.push('Invalid expected Git commit SHA');
  if(fetched.build){
    const {response,body}=fetched.build;
    must(response.status===200,'/build-info.json must return HTTP 200');
    try{
      const info=JSON.parse(body);
      must(info.project==='mew-maple','Build fingerprint project mismatch');
      must(info.release==='draft-safe','Build fingerprint is NOT draft-safe');
      must(/^[a-f0-9]{40}$/i.test(info.commit||''),'Build fingerprint missing Git commit SHA');
      if(/^[a-f0-9]{40}$/i.test(info.commit||''))deployedCommit=info.commit.toLowerCase();
      if(expectedSha && deployedCommit)must(deployedCommit===expectedSha.toLowerCase(),
        'Stale Worker deployment: expected '+expectedSha+' but served '+deployedCommit);
    }catch(e){errors.push('Invalid JSON at /build-info.json: '+String(e.message||e));}
  }
  for(const kind of ['brandLight','brandDark','brandFavicon']){
    if(fetched[kind]){
      const {response,body}=fetched[kind];
      must(response.status===200,kind+': brand SVG must be accessible via HTTPS');
      must(/<svg\b/i.test(body) && body.includes('M 15 93 C -3 76'),
        kind+': must contain the agreed original cat-and-leaf mark');
    }
  }
  if(fetched.brandManifest){
    const {response,body}=fetched.brandManifest;
    must(response.status===200,'/site.webmanifest must return 200');
    try{
      const manifest=JSON.parse(body);
      must(manifest.name==='Mew & Maple — Indoor Cat Living','Brand manifest name mismatch');
      must(manifest.icons?.some(icon=>icon.src==='/brand/favicon.svg'),'Brand manifest favicon mismatch');
    }catch{errors.push('Brand web manifest is invalid JSON');}
  }
  for(const kind of ['draft','notFound']){
    if(fetched[kind]){
      const {response,body}=fetched[kind];
      must(response.status===404,kind+': must return a real 404 (got '+response.status+')');
      if(kind==='draft')must(!body.includes('15 Indoor Cat Enrichment Ideas That'),'Draft article text exposed on public host');
    }
  }
  return {origin,deployedCommit,results,errors};
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
  const url=process.env.LIVE_WORKER_URL||defaultLiveUrl;
  const result=await runLiveCheck(url);
  console.log(JSON.stringify(result,null,2));
  if(result.errors.length)process.exitCode=1;
}
