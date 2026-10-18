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
const html=readFileSync('src/layouts/BaseLayout.astro','utf8');
const css=readFileSync('src/styles/global.css','utf8');
for(const [pattern,reason] of [
  [/src="\/brand\/avatar-light\.svg"/,'Header must display the actual cat emblem'],
  [/src="\/brand\/avatar-dark\.svg"/,'Footer must use the dark-brand mark'],
  [/class="logo-subline">INDOOR CAT LIVING/,'Header must include the original brand subline'],
  [/rel="icon" href="\/brand\/favicon\.svg"/,'Missing brand favicon'],
  [/rel="manifest" href="\/site\.webmanifest"/,'Missing brand web manifest']
]) if(!pattern.test(html))errors.push(reason);
if(/logo-symbol|maple-star|M\s*<span[^>]*>✳|mew <em>&<\/em> maple/i.test(html+css))
  errors.push('Temporary M-star-M mark still present');
const manifest=JSON.parse(readFileSync('public/site.webmanifest','utf8'));
if(manifest.name!=='Mew & Maple — Indoor Cat Living'||
   manifest.theme_color!=='#263C34'||
   !manifest.icons?.some(icon=>icon.src==='/brand/favicon.svg'&&icon.type==='image/svg+xml'))
   errors.push('Web app manifest does not match agreed Mew & Maple identity');
for(const error of errors)console.error('BRAND ERROR: '+error);
console.log('Brand identity QA: assets='+required.length+' temporaryMarks=0 errors='+errors.length);
if(errors.length)process.exitCode=1;
