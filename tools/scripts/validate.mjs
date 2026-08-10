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
}

// Analytics has no published procedure, so it must route readers to the owning
// repository and the upstream engine rather than infer a setup path.
const analytics = await readFile(`${docsRoot}/components/reference-analytics/overview.md`, 'utf8');
for (const link of ['https://github.com/ohs-foundation/ohs-player-reference-analytics', 'https://github.com/ohs-foundation/fhir-data-pipes']) {
  if (!analytics.includes(link)) throw new Error(`Reference Analytics must link ${link}.`);
}

console.log(`Validated ${files.length} Markdown pages, ${contract.routes.length} canonical routes, frontmatter, and reader-facing status language.`);
