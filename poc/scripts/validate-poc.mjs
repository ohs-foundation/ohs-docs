import {readFile} from 'node:fs/promises';
import {candidateFromArgs, candidateRoot, ensureCandidate, pocRoot, readJson} from './shared.mjs';

await ensureCandidate(candidateFromArgs());
const contract = await readJson(`${pocRoot}/brief/routes.json`);
if (contract.trailingSlash !== 'always' || contract.candidate !== 'docusaurus') throw new Error('Route contract must specify docusaurus and trailingSlash: always.');
for (const route of contract.routes) {
  if (!route.path.startsWith('/docusaurus/') || !route.path.endsWith('/')) throw new Error(`Invalid canonical route: ${route.path}`);
}
for (const file of ['landing.md', 'setups/index.md', 'setups/analytics.md']) {
  const content = await readFile(`${candidateRoot}/docs/${file}`, 'utf8');
  if (!content.startsWith('---\n') || !/title:/.test(content) || !/description:/.test(content) || !/slug:/.test(content)) throw new Error(`Missing ordinary frontmatter in ${file}.`);
}
const analytics = await readFile(`${candidateRoot}/docs/setups/analytics.md`, 'utf8');
if (!analytics.includes('not yet a start command or health check to follow here')) throw new Error('Analytics must identify that its runnable setup material is unavailable.');
console.log('Validated Markdown-first Docusaurus routes and frontmatter offline.');
