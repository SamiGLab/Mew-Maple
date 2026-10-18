import { setTimeout as delay } from 'node:timers/promises';
import { pathToFileURL } from 'node:url';
import { runLiveCheck, defaultLiveUrl } from './check-live-worker.mjs';

export async function waitForWorker({
  expected,
  site=defaultLiveUrl,
  fetcher=fetch,
  sleep=delay,
  now=Date.now,
  timeoutMs=8*60*1000,
  pollMs=20000
}){
  if(!/^[a-f0-9]{40}$/i.test(expected||''))throw new Error('An exact Git SHA is required for deployment verification.');
  const u=new URL(site);
  if(u.protocol!=='https:'||u.username||u.password||u.port||u.pathname!=='/'||u.search||u.hash)
    throw new Error('Live verification requires a bare HTTPS Worker origin.');
  const origin=u.origin, endpoint=origin+'/build-info.json';
  const start=now();
  let attempts=0,reason='No request yet.';
  while(now()-start<timeoutMs){
    attempts++;
    try {
      const res=await fetcher(endpoint,{signal:AbortSignal.timeout(10000),headers:{'cache-control':'no-cache'}});
      if(res.ok){
        const data=await res.json();
        if(data.project==='mew-maple' && data.commit===expected.toLowerCase()){
          if(data.release!=='draft-safe')
            throw new Error('UNSAFE RELEASE: Worker serves matching commit but mode '+String(data.release));
          const validation=await runLiveCheck(origin+'/',fetcher,expected);
          if(validation.errors.length)throw new Error('LIVE SAFETY REGRESSION: '+validation.errors.join('; '));
          console.log('POST-DEPLOY VERIFICATION PASSED: exact SHA '+expected+' and draft-safe HTTP checks ('+attempts+' attempt(s)).');
          return {attempts,commit:expected.toLowerCase(),validation};
        }
        reason='HTTP '+res.status+', project='+String(data.project)+', commit='+String(data.commit)+', release='+String(data.release);
      } else {
        reason='HTTP '+res.status+' at /build-info.json';
      }
    }catch(err){
      if(/^(UNSAFE RELEASE:|LIVE SAFETY REGRESSION:)/.test(String(err.message||'')))throw err;
      reason=String(err.message||err).slice(0,300);
    }
    console.log('Waiting for Cloudflare Workers Builds ('+attempts+'): '+reason);
    if(now()-start<timeoutMs)await sleep(pollMs);
  }
  throw new Error('Cloudflare did not serve expected '+expected+' within the configured deadline. Last result: '+reason+'. Inspect Workers > Builds and Deployments.');
}

if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
  try{
    await waitForWorker({expected:process.env.GITHUB_SHA||process.env.LIVE_WORKER_EXPECTED_SHA});
  }catch(error){
    console.error(error.stack||error);
    process.exitCode=1;
  }
}
