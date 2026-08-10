import {readdir, readFile} from 'node:fs/promises';
import {join, relative, resolve, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const docsRoot = join(repositoryRoot, 'docs-content');
const buildRoot = join(repositoryRoot, 'build');

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function walk(directory, root) {
  const found = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(path, root)));
    else found.push(relative(root, path).split(sep).join('/'));
  }
  return found;
}

function frontMatter(content, key) {
  return content.match(new RegExp(`^${key}: (.*)$`, 'm'))?.[1];
}

const contract = await readJson(join(repositoryRoot, 'scripts', 'routes.json'));
const {baseUrl, routes} = contract;
if (contract.trailingSlash !== 'always') throw new Error('Route contract must declare trailingSlash: always.');

for (const route of routes) {
  if (!route.path.startsWith(baseUrl) || !route.path.endsWith('/')) {
    throw new Error(`Route is not canonical under ${baseUrl}: ${route.path}`);
  }
}

const documents = (await walk(docsRoot, docsRoot)).filter((path) => path.endsWith('.md')).sort();
const contracted = routes.map((route) => route.source).sort();
const missing = documents.filter((path) => !contracted.includes(path));
const stale = contracted.filter((path) => !documents.includes(path));
if (missing.length) throw new Error(`Documents absent from the route contract: ${missing.join(', ')}`);
if (stale.length) throw new Error(`Route contract references missing documents: ${stale.join(', ')}`);

for (const route of routes) {
  const content = await readFile(join(docsRoot, route.source), 'utf8');
  const title = frontMatter(content, 'title');
  const description = frontMatter(content, 'description');
  if (!title || !description) throw new Error(`${route.source} must declare both title and description.`);
  if (title !== route.title) throw new Error(`${route.source} title "${title}" disagrees with the route contract.`);
  if (description !== route.content) throw new Error(`${route.source} description disagrees with the route contract.`);
  if (/^# /m.test(content)) throw new Error(`${route.source} has a body H1; the shell renders the title from frontmatter.`);
}

console.log(`Validated ${routes.length} routes against docs-content frontmatter.`);

const emitted = new Set(await walk(buildRoot, buildRoot).catch(() => {
  throw new Error('Build output is missing; run npm run build first.');
}));

function emittedPath(target) {
  const remainder = target.slice(baseUrl.length);
  return target.endsWith('/') ? `${remainder}index.html` : remainder;
}

for (const route of routes) {
  const file = emittedPath(route.path);
  if (!emitted.has(file)) throw new Error(`Missing emitted route: ${route.path}`);
  const html = await readFile(join(buildRoot, file), 'utf8');
  if (/(ReferenceError:|exports is not defined|error boundary)/i.test(html)) {
    throw new Error(`Static output for ${route.path} contains a server-rendering error.`);
  }
  const escapedTitle = route.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (!new RegExp(`<title[^>]*>[^<]*${escapedTitle}`).test(html)) {
    throw new Error(`Static output for ${route.path} is missing its title.`);
  }
  if (!html.includes(route.content)) {
    throw new Error(`Static output for ${route.path} is missing its description text.`);
  }
  for (const match of html.matchAll(/(?:href|src)=["']([^"'#?]+)["']/g)) {
    const target = match[1];
    if (/^(https?:|mailto:|data:)/.test(target) || !target.startsWith(baseUrl)) continue;
    if (!emitted.has(emittedPath(target))) {
      throw new Error(`Missing or incorrectly cased internal reference ${target} from ${route.path}.`);
    }
  }
}

console.log(`Smoke-tested ${routes.length} built routes, rendered content, and internal references.`);
