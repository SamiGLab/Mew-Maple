import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';

const articleSlugs=[
  'indoor-cat-enrichment-ideas',
  'entertain-cat-while-at-work',
  'cat-trees-small-apartments',
  'diy-cat-toys',
  'cat-friendly-apartment',
  'window-perch-vs-cat-tree',
  'indoor-cat-play-routine',
  'home-for-two-indoor-cats'
];
const failures=[];
const findings=[];
mkdirSync('browser-qa-screenshots',{recursive:true});
function fail(message){failures.push(message);console.error('FAIL '+message)}
function assert(check,message){if(!check)fail(message)}
async function startServer(command,args,port,env={}){
  const server=spawn(command,args,{env:{...process.env,PUBLIC_SITE_READY:'false',...env},stdio:['ignore','pipe','pipe']});
  let output='';
  server.stdout.on('data',d=>output+=String(d).slice(-3000));
  server.stderr.on('data',d=>output+=String(d).slice(-3000));
  for(let i=0;i<90;i++){
    if(server.exitCode!==null)throw new Error('Server quit early: '+output);
    try{
      const response=await fetch('http://127.0.0.1:'+port+'/');
      if(response.ok)return server;
    }catch{}
    await delay(500);
  }
  server.kill();
  throw new Error('Server startup timed out: '+output);
}
async function inspectPage(page,base,url,label,viewport,screenshot=false){
  const address=base+url;
  const response=await page.goto(address,{waitUntil:'domcontentloaded',timeout:30000});
  assert(response?.status()===200,`${label} ${viewport.width}px HTTP ${response?.status()}`);
  await page.locator('main').waitFor({timeout:12000});
  await page.evaluate(()=>Promise.all([...document.images].map(img=>img.complete?null:new Promise(r=>{img.addEventListener('load',r,{once:true});img.addEventListener('error',r,{once:true})}))));
  const metrics=await page.evaluate(()=>({
    width:window.innerWidth,
    documentWidth:document.documentElement.scrollWidth,
    h1:document.querySelectorAll('h1').length,
    failedImages:[...document.images].filter(img=>!img.complete||img.naturalWidth===0).map(img=>img.getAttribute('src')),
    missingAlt:[...document.images].filter(img=>!img.hasAttribute('alt')).map(img=>img.getAttribute('src')),
    missingLabels:[...document.querySelectorAll('input:not([type=hidden]),textarea,select')].filter(el=>!el.labels?.length && !el.getAttribute('aria-label')).map(el=>el.outerHTML.slice(0,100))
  }));
  assert(metrics.documentWidth<=metrics.width+1,`${label} ${viewport.width}px horizontal overflow: ${metrics.documentWidth} > ${metrics.width}`);
  assert(metrics.h1===1,`${label} H1 count=${metrics.h1}`);
  assert(metrics.failedImages.length===0,`${label} failed images: ${metrics.failedImages.join(', ')}`);
  assert(metrics.missingAlt.length===0,`${label} images without alt`);
  assert(metrics.missingLabels.length===0,`${label} unlabeled inputs`);
  const a11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  for(const violation of a11y.violations){
    const affected=violation.nodes.map(n=>n.target.join(' ')).slice(0,4).join('; ');
    fail(`${label} ${viewport.width}px axe ${violation.id}: ${affected}`);
  }
  findings.push({label,viewport:viewport.width,overflow:metrics.documentWidth-metrics.width,axeViolations:a11y.violations.length});
  if(screenshot)await page.screenshot({path:`browser-qa-screenshots/${label.replace(/[^a-z0-9-]/g,'-')}-${viewport.width}.png`,fullPage:true,animations:'disabled'});
}
let dev,preview,browser;
try{
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  dev=await startServer('npm',['run','dev','--','--host','127.0.0.1','--port','4323'],4323);
  const desktop={width:1440,height:900},mobile={width:390,height:844},tablet={width:768,height:1024};
  for(const viewport of [mobile,tablet,desktop]){
    const context=await browser.newContext({viewport});
    const page=await context.newPage();
    const urls=[['home','/'],['search','/search/'],['category-care','/category/care/'],['privacy','/privacy/'],...articleSlugs.map(x=>[x,'/guides/'+x+'/'])];
    for(const [name,url] of urls)await inspectPage(page,'http://127.0.0.1:4323',url,name,viewport,viewport.width!==tablet.width);
    if(viewport.width===mobile.width){
      await page.goto('http://127.0.0.1:4323/search/');
      const search=page.locator('#search-term');
      await search.fill('cat');
      await page.locator('#search-status').waitFor();
      await page.locator('#search-form button').click();
      const result=await page.locator('#search-status').innerText();
      assert(/guide\(s\) found|No matching published guides found/i.test(result),'Search interaction failed on mobile: '+result);
      await page.goto('http://127.0.0.1:4323/');
      await page.keyboard.press('Tab');
      const skip=await page.evaluate(()=>document.activeElement?.classList.contains('skip-link'));
      assert(skip,'Skip to content is not first keyboard-focus link');
    }
    await context.close();
  }
  dev.kill('SIGTERM');
  preview=await startServer('npm',['run','preview','--','--host','127.0.0.1','--port','4324'],4324);
  const ctx=await browser.newContext({viewport:mobile});
  const p=await ctx.newPage();
  for(const [name,url] of [['safe-home','/'],['safe-search','/search/']])await inspectPage(p,'http://127.0.0.1:4324',url,name,mobile,true);
  const absent=await p.goto('http://127.0.0.1:4324/guides/indoor-cat-enrichment-ideas/',{waitUntil:'domcontentloaded'});
  const body=await absent.text();
  assert(absent.status()!==200 || !body.includes('15 Indoor Cat Enrichment Ideas That'), 'Production-safe preview exposes an editorial draft');
  const index=await (await fetch('http://127.0.0.1:4324/search-index.json')).json();
  assert(Array.isArray(index)&&index.length===0,'Production-safe search index leaked drafts');
  await ctx.close();
} catch(e) {
  fail('Unexpected browser QA exception: '+(e?.stack||e));
} finally{
  if(dev)dev.kill('SIGTERM');
  if(preview)preview.kill('SIGTERM');
  if(browser)await browser.close();
}
console.log(JSON.stringify({pagesChecked:findings.length,failed:failures.length,findings},null,2));
if(failures.length)process.exitCode=1;
