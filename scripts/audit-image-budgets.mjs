import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dir='public/images';
const files=readdirSync(dir).filter(name=>/\.(webp|svg)$/.test(name));
const kib=1024, mib=1024*kib;
const errors=[];
let total=0;
let largest={name:'',bytes:0};
for(const name of files){
  const size=statSync(join(dir,name)).size;
  total+=size;
  if(size>largest.bytes)largest={name,bytes:size};
  if(size>250*kib)errors.push(name+' exceeds 250 KiB individual image budget');
  if(name.endsWith('-hero.webp') && size>150*kib)
    errors.push(name+' exceeds 150 KiB hero image budget');
}
if(total>5*mib)errors.push('All 56 editorial image assets exceed 5 MiB source budget');
if(files.length!==56)errors.push('Expected 56 editorial image assets; found '+files.length);
console.log('Image weight budget: '+files.length+' assets, total '+(total/mib).toFixed(2)+' MiB, largest '+largest.name+' '+(largest.bytes/kib).toFixed(1)+' KiB, errors='+errors.length);
for(const error of errors)console.error(error);
if(errors.length)process.exitCode=1;
// Source asset weight is not the bytes fetched by any individual page. Run local
// Lighthouse and live-domain Core Web Vitals separately.
