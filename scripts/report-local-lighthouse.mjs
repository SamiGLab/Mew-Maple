import { readFileSync } from 'node:fs';

const file=process.argv[2];
if(!file)throw new Error('Supply Lighthouse JSON output path.');
const report=JSON.parse(readFileSync(file,'utf8'));
if(report.runtimeError)throw new Error('Lighthouse failed: '+report.runtimeError.message);
const required=['performance','accessibility','best-practices'];
const cats=Object.fromEntries(required.map(key=>[key,report.categories?.[key]?.score]));
for(const [key,value] of Object.entries(cats)) {
  if(typeof value!=='number')throw new Error('Missing Lighthouse category: '+key);
}
const metrics={};
for(const [name,key] of Object.entries({
  LCP:'largest-contentful-paint',CLS:'cumulative-layout-shift',
  FCP:'first-contentful-paint',TBT:'total-blocking-time',
  SpeedIndex:'speed-index'
})){
  const v=report.audits?.[key]?.numericValue;
  if(typeof v!=='number')throw new Error('Missing Lighthouse metric '+key);
  metrics[name]=Math.round(v*100)/100;
}
console.log('LOCAL DRAFT HOMEPAGE: simulated-mobile Lighthouse '+JSON.stringify({
  scores:Object.fromEntries(Object.entries(cats).map(([k,v])=>[k,Math.round(v*100)])),
  metrics
}));
if(cats.performance<.8)console.warn('Performance below provisional 80/100 investigation threshold; inspect LCP, image and script audit.');
if(cats.accessibility<.9)console.warn('Accessibility below provisional 90/100 investigation threshold; run axe and manual checks.');
console.log('This is a local, empty draft-safe preview. It is not a live-domain audit of the eight published guides.');
