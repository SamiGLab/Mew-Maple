import { readdirSync, readFileSync } from 'node:fs';

const directory = 'src/content/blog';
const files = readdirSync(directory).filter((name) => name.endsWith('.md')).sort();
const uniqueUrls = new Set();
const failures = [];
let totalSources = 0;

function fail(file, detail) {
  failures.push(file + ': ' + detail);
}

for (const file of files) {
  const markdown = readFileSync(directory + '/' + file, 'utf8');
  const heading = '\n## Sources and further reading\n';
  const parts = markdown.split(heading);
  if (parts.length !== 2) {
    fail(file, 'Expected exactly one Sources and further reading heading');
    continue;
  }

  const [article, sourceSection] = parts;
  const listed = [...sourceSection.matchAll(/^(\d+)\.\s+(.+)$/gm)];
  if (!listed.length) {
    fail(file, 'Source list is empty');
    continue;
  }

  const mentioned = new Set([...article.matchAll(/\[(\d+)\]/g)].map((match) => Number(match[1])));
  const seen = new Set();

  for (const [index, entry] of listed.entries()) {
    const number = Number(entry[1]);
    const sourceLine = entry[2];
    if (number !== index + 1 || seen.has(number)) {
      fail(file, 'Source numbering must be unique and sequential (source ' + number + ')');
    }
    seen.add(number);
    if (!mentioned.has(number)) fail(file, 'Source [' + number + '] is never cited in article body');

    const urls = [...sourceLine.matchAll(/<([^>]+)>/g)].map((match) => match[1]);
    if (urls.length !== 1) {
      fail(file, 'Source [' + number + '] must have exactly one explicit source URL');
      continue;
    }

    try {
      const url = new URL(urls[0]);
      if (url.protocol !== 'https:' || !url.hostname.includes('.') ||
          /(^|\.)((example\.(com|org|net))|invalid|test|localhost)$/.test(url.hostname)) {
        fail(file, 'Source [' + number + '] has an unsafe or placeholder URL');
      }
      uniqueUrls.add(url.toString());
    } catch {
      fail(file, 'Source [' + number + '] has an invalid URL');
    }
  }

  for (const number of mentioned) {
    if (!seen.has(number)) fail(file, 'Article cites missing source [' + number + ']');
  }
  if (!sourceSection.includes('AI-generated editorial illustrations')) {
    fail(file, 'Missing AI-generated illustration disclosure');
  }
  totalSources += listed.length;
}

for (const item of failures) console.error(item);
console.log('Citation structure: articles=' + files.length +
  '; listed entries=' + totalSources +
  '; distinct URLs=' + uniqueUrls.size +
  '; errors=' + failures.length);
if (failures.length) process.exitCode = 1;

// Offline structural check only: source availability, relevance and safety claims
// still require independent editorial verification before public release.
