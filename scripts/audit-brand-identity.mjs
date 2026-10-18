import { existsSync, readFileSync } from 'node:fs';

const errors=[];
const required=[
  'public/brand/favicon.svg',
  'public/brand/avatar-light.svg',
  'public/brand/avatar-dark.svg',
  'public/brand/wordmark-light.svg',
  'public/brand/wordmark-dark.svg'
];
for(const path of required){
  if(!existsSync(path)){errors.push('Missing agreed brand asset: '+path);continue;}
  const source=readFileSync(path,'utf8');
  if(!/<svg\b/.test(source)||!/<\/svg>\s*$/.test(source))errors.push('Not SVG: '+path);
  if(!source.includes('M 15 93 C -3 76')||!source.includes('#E9AA82'))
    errors.push('Different cat-and-leaf emblem, not the approved brand kit: '+path);
  if(/<\s*(script|foreignObject|iframe|image)\b|\bon[a-z]+\s*=|(?:href|src)\s*=\s*["']\s*(?:http|data:|javascript:)|@import\b|url\s*\(/i.test(source))
    errors.push('Unsafe linked or executable SVG content: '+path);
}
const rasterAssets=[
  ['lockup',360,120],['cat-emblem',256,256],['cat-silhouette',144,144],
  ['maple-leaf',192,192],['botanical-branch',192,192],
  ['botanical-wreath',320,320],['leaves-pattern',384,384],['paws-pattern',384,384]
];
for(const [name] of rasterAssets){
  const path='public/brand/autumn/'+name+'.webp';
  if(!existsSync(path)){errors.push('Missing newly approved brand image: '+path);continue;}
  const buf=readFileSync(path);
  if(buf.toString('ascii',0,4)!=='RIFF'||buf.toString('ascii',8,12)!=='WEBP')
    errors.push('Invalid WebP asset: '+path);
  if(buf.length>70000)errors.push('Brand image exceeds 70 KB: '+path);
}
const html=readFileSync('src/layouts/BaseLayout.astro','utf8');
const verificationToken='jn4f5kUIgYWBpqdnL1ff5O3T5lmJ3iDyBf_Ff9RuY9g';
if((html.match(/name="google-site-verification"/g)||[]).length!==1||
   !html.includes('name="google-site-verification" content="'+verificationToken+'"'))
  errors.push('Google Search Console meta verification must appear exactly once in shared head');
const css=readFileSync('src/styles/global.css','utf8');
for(const [pattern,reason] of [
  [/<img class="logo-full" src="\/brand\/autumn\/lockup\.webp"/,'Header must use the approved full horizontal logo image'],
  [/<img class="footer-lockup" src="\/brand\/autumn\/lockup\.webp"/,'Footer must use the same full horizontal logo'],
  [/rel="icon" href="\/brand\/autumn\/cat-silhouette\.webp" type="image\/webp" sizes="96x96"/,'Brand favicon must use the green cat silhouette'],
  [/rel="manifest" href="\/site\.webmanifest"/,'Missing brand web manifest']
]) if(!pattern.test(html))errors.push(reason);
const faviconLinks=[...html.matchAll(/<link\s+rel="icon"\b[^>]*>/g)];
if(faviconLinks.length!==1 || /\/brand\/favicon\.svg/.test(faviconLinks.map(x=>x[0]).join(' ')))
  errors.push('Only one current green-cat favicon link may be active');
if(/logo-lockup|logo-mark|logo-text|logo-subline|footer-tagline|footer-brand img\{/i.test(html+css))
  errors.push('Obsolete hand-composed brand lockup remains in site layout or CSS');
if(/logo-symbol|maple-star|M\s*<span[^>]*>✳|mew <em>&<\/em> maple/i.test(html+css))
  errors.push('Temporary M-star-M mark still present');
const manifest=JSON.parse(readFileSync('public/site.webmanifest','utf8'));
if(manifest.name!=='Mew & Maple — Indoor Cat Living'||
   manifest.theme_color!=='#263C34'||
   manifest.icons?.length!==1 ||
   manifest.icons[0]?.src!=='/brand/autumn/cat-silhouette.webp' ||
   manifest.icons[0]?.type!=='image/webp' ||
   manifest.icons[0]?.sizes!=='96x96')
   errors.push('Web app manifest must use exactly the approved 96x96 green-cat icon');
for(const error of errors)console.error('BRAND ERROR: '+error);
console.log('Brand identity QA: assets='+required.length+' temporaryMarks=0 errors='+errors.length);
if(errors.length)process.exitCode=1;
