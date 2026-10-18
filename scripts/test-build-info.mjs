import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import assert from 'node:assert/strict';

const writer=resolve('scripts/write-build-info.mjs');
const temp=mkdtempSync(join(tmpdir(),'mew-maple-build-info-'));
const sha='abcdef0123456789abcdef0123456789abcdef01';
try{
  function run(extra){
    return spawnSync(process.execPath,[writer],{
      cwd:temp,encoding:'utf8',env:{...process.env,WORKERS_CI:'1',WORKERS_CI_COMMIT_SHA:sha,
      GITHUB_SHA:'',PUBLIC_SITE_READY:'false',...extra}});
  }
  let result=run({});
  assert.equal(result.status,0,result.stdout+'\n'+result.stderr);
  let info=JSON.parse(readFileSync(join(temp,'dist','build-info.json'),'utf8'));
  assert.deepEqual(info,{project:'mew-maple',commit:sha,release:'draft-safe'});
  result=run({PUBLIC_SITE_READY:'true'});
  assert.equal(result.status,0,result.stderr);
  info=JSON.parse(readFileSync(join(temp,'dist','build-info.json'),'utf8'));
  assert.equal(info.release,'approved-publication');
  result=run({WORKERS_CI_COMMIT_SHA:'bad'});
  assert.notEqual(result.status,0,'Malformed CI commit must fail the build');
  console.log('Build fingerprint tests: success (draft, approved, invalid CI identity).');
}finally{
  rmSync(temp,{recursive:true,force:true});
}
