import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source=readFileSync('scripts/wait-for-worker-deploy.mjs','utf8');
const workflow=readFileSync('.github/workflows/post-deploy-verify.yml','utf8');
assert.match(source,/GITHUB_SHA/);
assert.match(source,/data\.commit===expected/);
assert.match(source,/data\.release==='draft-safe'/);
assert.match(source,/runLiveCheck\(origin/);
assert.match(source,/throw new Error\('Cloudflare Workers Builds did not serve expected/);
assert.match(workflow,/push:\s*\n\s*branches:\s*\[main\]/);
assert.match(workflow,/cancel-in-progress:\s*true/);
assert.doesNotMatch(workflow,/PUBLIC_SITE_READY:\s*true|PUBLISH_APPROVED:\s*YES|wrangler deploy/);
console.log('Post-deploy workflow guard tests passed.');
