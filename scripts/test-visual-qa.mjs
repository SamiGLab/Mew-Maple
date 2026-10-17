import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const root=resolve('.');
const tmp=mkdtempSync(join(tmpdir(),'mew-image-qa-'));
const manifestPath=join(tmp,'docs/image-qa-status.json');
const imageDir=join(tmp,'public/images');
let failures=0;
const exec=(label,expected)=>{
  const p=spawnSync(process.execPath,[join(root,'scripts/audit-visual-assets.mjs')],{
    cwd:tmp,encoding:'utf-8',env:{...process.env,PUBLIC_SITE_READY:expected.ready?'true':'false'}
  });
  const valid=(p.status===0)===expected.success;
  console.log(`${valid?'PASS':'FAIL'} ${label}`);
  if(!valid){failures++;console.error((p.stdout||'')+'\n'+(p.stderr||''));}
};
const original=JSON.parse(readFileSync('docs/image-qa-status.json','utf8'));
try{
  cpSync('public/images',imageDir,{recursive:true});
  cpSync('docs/image-qa-status.json',manifestPath,{recursive:true});
  exec('Preview build permits pending image reviews',{ready:false,success:true});
  exec('Production build blocks unapproved images',{ready:true,success:false});
  const allApproved=structuredClone(original);
  allApproved.images.forEach(x=>x.status='approved');
  writeFileSync(manifestPath,JSON.stringify(allApproved));
  exec('Production build permits structurally complete approvals',{ready:true,success:true});
  const missing=structuredClone(allApproved);
  missing.images.pop();
  writeFileSync(manifestPath,JSON.stringify(missing));
  exec('Missing manifest entry blocks build',{ready:false,success:false});
  writeFileSync(manifestPath,JSON.stringify(original));
  const files=original.images.map(x=>x.file);
  const first=readFileSync(join(imageDir,files[0]));
  const otherPath=join(imageDir,files[1]);
  const oldOther=readFileSync(otherPath);
  writeFileSync(otherPath,first);
  exec('Identical image bytes block build',{ready:false,success:false});
  writeFileSync(otherPath,oldOther);
  const origFirst=readFileSync(join(imageDir,files[0]));
  writeFileSync(join(imageDir,files[0]),Buffer.from('fake image bytes'));
  exec('Invalid WebP signature blocks build',{ready:false,success:false});
  writeFileSync(join(imageDir,files[0]),origFirst);
} finally {rmSync(tmp,{recursive:true,force:true});}
if(failures)process.exitCode=1;
