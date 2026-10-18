import { setTimeout as delay } from 'node:timers/promises';
import { runLiveCheck, defaultLiveUrl } from './check-live-worker.mjs';

const expected=(process.env.GITHUB_SHA || process.env.LIVE_WORKER_EXPECTED_SHA || '').toLowerCase();
if(!/^[a-f0-9]{40}$/.test(expected))throw new Error('An exact GITHUB_SHA is required for deployment verification.');
const site=process.env.LIVE_WORKER_URL||defaultLiveUrl;
const origin=new URL(site).origin;
if(!/^https:\/\//.test(site)||new URL(site).username||new URL(site).password)
  throw new Error('Live verification requires a safe HTTPS Worker URL.');
const endpoint=origin+'/build-info.json';
const timeoutMs=8*60*1000;
const started=Date.now();
let attempt=0,reason='No request yet.';
while(Date.now()-started < timeoutMs){
  attempt++;
  try {
    const res=await fetch(endpoint,{signal:AbortSignal.timeout(10000),headers:{'cache-control':'no-cache'}});
    if(res.ok){
      const data=await res.json();
      if(data.project==='mew-maple' && data.commit===expected && data.release==='draft-safe'){
        console.log('Worker is serving expected main Git commit '+expected+'; checking HTTP release safety.');
        const validation=await runLiveCheck(origin+'/',fetch,expected);
        console.log(JSON.stringify(validation,null,2));
        if(validation.errors.length)throw new Error('Live Worker safety regression: '+validation.errors.join('; '));
        console.log('POST-DEPLOY VERIFICATION PASSED: expected SHA and all draft-safe HTTP checks.');
        process.exit(0);
      }
      reason='Got '+res.status+', project='+String(data.project)+', commit='+String(data.commit)+', release='+String(data.release);
    } else {
      reason='HTTP '+res.status+' at /build-info.json';
    }
  }catch(err){
    if(String(err.message||err).startsWith('Live Worker safety regression:'))throw err;
    reason=String(err.message||err).slice(0,300);
  }
  console.log('Waiting for Cloudflare Worker deployment ('+attempt+'): '+reason);
  if(Date.now()-started < timeoutMs)await delay(20000);
}
throw new Error('Cloudflare Workers Builds did not serve expected '+expected+' within eight minutes. Last result: '+reason+'. Inspect Cloudflare Workers > Deployments and Builds logs.');
