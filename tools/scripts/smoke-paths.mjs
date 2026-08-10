import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import {
  outputRoot,
  pathExists,
  readJson,
  siteRoot,
  toolsRoot,
} from "./shared.mjs";

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

function emittedPath(target) {
  const relativeTarget = target.slice("/ohs-docs/".length);
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
  const htmlFile = emittedPath(route.path);
  if (!emittedFiles.has(htmlFile))
    throw new Error(`Missing emitted route: ${route.path}`);
  const html = await readFile(join(outputRoot, htmlFile), "utf8");

  if (/(ReferenceError:|exports is not defined|error boundary)/i.test(html))
    throw new Error(
      `Static output for ${route.path} contains a server-rendering error.`,
    );

  // The shared shell must not swallow the page. Both checks derive from the
  // page's own frontmatter, so no copy is duplicated in the contract.
  const expectedTitle = titleBySlug.get(route.path.replace("/ohs-docs", ""));
  if (expectedTitle && !html.includes(`>${expectedTitle}<`))
    throw new Error(
      `Static output for ${route.path} does not render its title "${expectedTitle}".`,
    );
  const bodyLength = visibleText(html).length;
  if (bodyLength < 400)
    throw new Error(
      `Static output for ${route.path} rendered only ${bodyLength} characters of content; the shell may have dropped the document.`,
    );

  for (const match of html.matchAll(/(?:href|src)=["']([^"'#?]+)["']/g)) {
    const target = match[1];
    if (
      /^(https?:|mailto:|data:)/.test(target) ||
      !target.startsWith("/ohs-docs/")
    )
      continue;
    const requiredPath = emittedPath(target);
    if (!emittedFiles.has(requiredPath))
      throw new Error(
        `Missing or incorrectly cased internal reference ${target} from ${route.path}.`,
      );
  }
}

const searchIndex = await readJson(`${outputRoot}/search-index.json`);
const documents = searchIndex.flatMap((entry) => entry.documents ?? []);
for (const route of contract.routes) {
  if (route.searchIndexed === false) continue;
  const hasIndexedContent = documents.some(
    (entry) => entry.u === route.path && (entry.t || entry.b?.length),
  );
  if (!hasIndexedContent)
    throw new Error(`Search index has no usable document for ${route.path}.`);
}

console.log(
  `Smoke-tested ${contract.routes.length} routes: emitted output, rendered content, internal references, and search index.`,
);
