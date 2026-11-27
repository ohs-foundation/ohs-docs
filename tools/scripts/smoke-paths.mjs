import { createRequire } from "node:module";
import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import {
  outputRoot,
  pathExists,
  readJson,
  siteRoot,
  toolsRoot,
} from "./shared.mjs";

const require = createRequire(import.meta.url);
const { baseUrl } = require(join(siteRoot, "docusaurus.config.js"));

if (!(await pathExists(outputRoot)))
  throw new Error("Build output is missing; run build first.");

const contract = await readJson(`${toolsRoot}/routes.json`);

// Expectations come from the pages themselves. The contract lists which paths
// must exist; it does not restate their copy, so editing a sentence cannot
// break this gate.
const titleBySlug = new Map();
async function collectDocs(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collectDocs(path);
    else if (entry.name.endsWith(".md")) {
      const text = await readFile(path, "utf8");
      const frontmatter = text.slice(4, text.indexOf("\n---\n", 4));
      const slug = frontmatter.match(/^slug:\s*(\S+)/m)?.[1];
      const title = frontmatter.match(/^title:\s*(.+)$/m)?.[1].trim();
      if (slug && title) titleBySlug.set(slug, title);
    }
  }
}
await collectDocs(`${siteRoot}/docs`);

const emittedFiles = new Set();
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else emittedFiles.add(relative(outputRoot, path).split(sep).join("/"));
  }
}
await walk(outputRoot);

function routeSlug(canonicalPath) {
  return canonicalPath.replace(/^\/ohs-docs/, "") || "/";
}

function activeRoutePath(canonicalPath) {
  const slug = routeSlug(canonicalPath);
  return baseUrl === "/" ? slug : `${baseUrl}${slug.replace(/^\//, "")}`;
}

function emittedPath(target) {
  const relativeTarget = target.startsWith(baseUrl)
    ? target.slice(baseUrl.length)
    : target.replace(/^\/+/, "");
  return target.endsWith("/") ? `${relativeTarget}index.html` : relativeTarget;
}

function visibleText(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  return main
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

for (const route of contract.routes) {
  const slug = routeSlug(route.path);
  const activePath = activeRoutePath(route.path);
  const htmlFile = emittedPath(activePath);
  if (!emittedFiles.has(htmlFile))
    throw new Error(`Missing emitted route: ${activePath}`);
  const html = await readFile(join(outputRoot, htmlFile), "utf8");

  if (/(ReferenceError:|exports is not defined|error boundary)/i.test(html))
    throw new Error(
      `Static output for ${activePath} contains a server-rendering error.`,
    );

  // The shared shell must not swallow the page. Both checks derive from the
  // page's own frontmatter, so no copy is duplicated in the contract.
  const expectedTitle = titleBySlug.get(slug);
  if (expectedTitle && !html.includes(`>${expectedTitle}<`))
    throw new Error(
      `Static output for ${activePath} does not render its title "${expectedTitle}".`,
    );
  const bodyLength = visibleText(html).length;
  if (bodyLength < 400)
    throw new Error(
      `Static output for ${activePath} rendered only ${bodyLength} characters of content; the shell may have dropped the document.`,
    );

  for (const match of html.matchAll(/(?:href|src)=["']([^"'#?]+)["']/g)) {
    const target = match[1];
    if (/^(https?:|mailto:|data:)/.test(target) || target.startsWith("//"))
      continue;
    if (baseUrl === "/" && target.startsWith("/ohs-docs/"))
      throw new Error(
        `Unexpected GitHub Pages prefix ${target} in Netlify build on ${activePath}.`,
      );
    if (!target.startsWith(baseUrl))
      continue;
    const requiredPath = emittedPath(target);
    if (!emittedFiles.has(requiredPath))
      throw new Error(
        `Missing or incorrectly cased internal reference ${target} from ${activePath}.`,
      );
  }
}

const searchIndex = await readJson(`${outputRoot}/search-index.json`);
const documents = searchIndex.flatMap((entry) => entry.documents ?? []);
for (const route of contract.routes) {
  if (route.searchIndexed === false) continue;
  const activePath = activeRoutePath(route.path);
  const hasIndexedContent = documents.some(
    (entry) => entry.u === activePath && (entry.t || entry.b?.length),
  );
  if (!hasIndexedContent)
    throw new Error(`Search index has no usable document for ${activePath}.`);
}

console.log(
  `Smoke-tested ${contract.routes.length} routes (baseUrl=${baseUrl}): emitted output, rendered content, internal references, and search index.`,
);
