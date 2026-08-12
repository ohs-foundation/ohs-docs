import {readdir, readFile} from 'node:fs/promises';
import {siteRoot, toolsRoot, readJson} from './shared.mjs';

const contract = await readJson(`${toolsRoot}/routes.json`);
if (contract.trailingSlash !== 'always') throw new Error('Route contract must specify trailingSlash: always.');
for (const route of contract.routes) {
  if (!route.path.startsWith('/ohs-docs/') || !route.path.endsWith('/')) throw new Error(`Invalid canonical route: ${route.path}`);
}

async function markdownFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, {withFileTypes: true})) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) found.push(...await markdownFiles(path));
    else if (entry.name.endsWith('.md')) found.push(path);
  }
  return found;
}

const docsRoot = `${siteRoot}/docs`;
const files = await markdownFiles(docsRoot);
if (files.length < 10) throw new Error(`Expected the full docs set; found ${files.length} Markdown files.`);

// Page status is internal triage state for the documentation team. It is not
// rendered, and no page tells a reader that documentation is outstanding.
const bannedInBody = [
  'coming soon',
  'to be documented',
  'will be added',
  'not currently published',
  'not yet published',
  'return to this page when',
  'setup material pending',
  'setup procedure pending',
];
const allowedStatus = new Set(['ready', 'partial', 'pending']);

// A shell comment inside a fenced block looks exactly like a heading, and an
// example of image syntax looks exactly like an image. Strip code first.
function withoutCode(markdown) {
  return markdown
    .replace(/^```[\s\S]*?^```/gm, '')
    .replace(/`[^`\n]*`/g, '');
}

for (const file of files) {
  const name = file.slice(docsRoot.length + 1);
  const content = await readFile(file, 'utf8');
  if (!content.startsWith('---\n')) throw new Error(`Missing frontmatter in ${name}.`);
  const afterOpen = content.slice(4);
  const closing = afterOpen.indexOf('\n---\n');
  if (closing === -1) throw new Error(`Unterminated frontmatter in ${name}.`);
  const frontmatter = afterOpen.slice(0, closing);
  const body = afterOpen.slice(closing + 5);
  for (const field of ['title:', 'description:', 'slug:']) {
    if (!frontmatter.includes(`\n${field}`) && !frontmatter.startsWith(field)) throw new Error(`Missing ${field.slice(0, -1)} in ${name}.`);
  }
  const status = frontmatter.match(/^guide_status:\s*(\S+)/m)?.[1];
  if (status && !allowedStatus.has(status)) throw new Error(`${name} uses guide_status "${status}"; expected ready, partial, or pending.`);
  const lowerBody = body.toLowerCase();
  for (const phrase of bannedInBody) {
    if (lowerBody.includes(phrase)) throw new Error(`${name} tells readers that documentation is outstanding ("${phrase}"). Describe what the component is for and link to its source instead.`);
  }

  const prose = withoutCode(body);

  // Every image needs alternative text. A screen reader announces nothing for
  // an empty alt, and a diagram carrying real information becomes invisible.
  for (const image of prose.matchAll(/!\[([^\]]*)\]\(([^)]*)\)/g)) {
    if (!image[1].trim()) throw new Error(`${name} has an image with no alt text (${image[2] || 'no source'}). Describe what the image shows.`);
  }

  // The frontmatter title is the h1, so body headings start at level two and
  // must not skip a level. Skipping breaks screen-reader navigation.
  let previous = 1;
  for (const heading of prose.matchAll(/^(#{1,6}) +(.+)$/gm)) {
    const level = heading[1].length;
    if (level === 1) throw new Error(`${name} uses a top-level heading ("# ${heading[2]}"). The frontmatter title is the h1; start body headings at "##".`);
    if (level > previous + 1) throw new Error(`${name} jumps from h${previous} to h${level} at "${heading[2]}". Do not skip heading levels.`);
    previous = level;
  }
}

// Analytics is not a separate repository. Its pipeline configuration and
// ViewDefinitions ship in the infrastructure repository, and FHIR Data Pipes is
// the engine underneath. Both pages must route readers to those two sources
// rather than imply an analytics repository of its own.
for (const page of ['components/reference-analytics/overview.md', 'components/reference-analytics/run.md']) {
  const analytics = await readFile(`${docsRoot}/${page}`, 'utf8');
  for (const link of ['https://github.com/ohs-foundation/ohs-player-reference-infrastructure', 'https://github.com/ohs-foundation/fhir-data-pipes']) {
    if (!analytics.includes(link)) throw new Error(`${page} must link ${link}.`);
  }
  if (analytics.includes('ohs-player-reference-analytics')) {
    throw new Error(`${page} links a separate analytics repository, which does not exist. Analytics ships in the infrastructure repository.`);
  }
}

console.log(`Validated ${files.length} Markdown pages, ${contract.routes.length} canonical routes, frontmatter, status language, image alt text, and heading order.`);
