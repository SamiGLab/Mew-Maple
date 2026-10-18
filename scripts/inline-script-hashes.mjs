import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Astro may inline small executable scripts. Hash exactly the emitted bytes so
// CSP can allow those scripts without allowing arbitrary inline JavaScript.
export function inlineScriptHashes(root='dist'){
  const entries=[];
  function walk(dir){
    for(const name of readdirSync(dir)){
      const path=join(dir,name);
      if(statSync(path).isDirectory())walk(path);
      else if(path.endsWith('.html')){
        const html=readFileSync(path,'utf8');
        for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
          const attrs=match[1],body=match[2];
          const inert=/\btype\s*=\s*["'](?:application\/ld\+json|application\/json)["']/i.test(attrs);
          if(!inert && !/\bsrc\s*=/i.test(attrs) && body.trim()){
            const hash='sha256-'+createHash('sha256').update(body,'utf8').digest('base64');
            entries.push({path,hash});
          }
        }
      }
    }
  }
  if(existsSync(root))walk(root);
  return entries;
}
