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
const css=readFileSync('src/styles/global.css','utf8');
for(const [pattern,reason] of [
  [/src="\/brand\/autumn\/cat-emblem\.webp"/,'Header must display the actual cat emblem'],
  [/src="\/brand\/autumn\/cat-emblem\.webp"/,'Footer must use the dark-brand mark'],
  [/class="logo-subline">INDOOR CAT LIVING/,'Header must include the original brand subline'],
  [/rel="icon" href="\/brand\/autumn\/cat-silhouette\.webp"/,'Missing brand favicon'],
  [/rel="manifest" href="\/site\.webmanifest"/,'Missing brand web manifest']
]) if(!pattern.test(html))errors.push(reason);
if(/logo-symbol|maple-star|M\s*<span[^>]*>✳|mew <em>&<\/em> maple/i.test(html+css))
  errors.push('Temporary M-star-M mark still present');
const manifest=JSON.parse(readFileSync('public/site.webmanifest','utf8'));
if(manifest.name!=='Mew & Maple — Indoor Cat Living'||
   manifest.theme_color!=='#263C34'||
   !manifest.icons?.some(icon=>icon.src==='/brand/autumn/cat-silhouette.webp'&&icon.type==='image/webp'))
   errors.push('Web app manifest does not match agreed Mew & Maple identity');
for(const error of errors)console.error('BRAND ERROR: '+error);
console.log('Brand identity QA: assets='+required.length+' temporaryMarks=0 errors='+errors.length);
if(errors.length)process.exitCode=1;
