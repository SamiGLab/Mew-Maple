import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const envSha = process.env.WORKERS_CI_COMMIT_SHA || process.env.GITHUB_SHA;
let localSha='';
try { localSha=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim(); }
catch {/* Offline source archives may not have .git. */}
const commit = envSha || localSha;
if (process.env.WORKERS_CI === '1' && !/^[a-f0-9]{40}$/i.test(process.env.WORKERS_CI_COMMIT_SHA||'')) {
  throw new Error('Workers Builds must provide a valid WORKERS_CI_COMMIT_SHA. Verify build integration.');
}
const payload = {
  project: 'mew-maple',
  commit: /^[a-f0-9]{40}$/i.test(commit) ? commit.toLowerCase() : null,
  release: process.env.PUBLIC_SITE_READY === 'true' ? 'approved-publication' : 'draft-safe'
};
// This public metadata contains only source commit identity and release mode: NO build tokens or secret vars.
mkdirSync('dist',{recursive:true});
writeFileSync('dist/build-info.json', JSON.stringify(payload)+'\n','utf8');
console.log('Public build fingerprint: '+(payload.commit||'unavailable')+'; '+payload.release);
