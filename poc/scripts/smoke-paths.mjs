import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { chromium } from "@playwright/test";
import {
  candidateFromArgs,
  ensureCandidate,
  outputRoot,
  pathExists,
  pocRoot,
  readJson,
  rejectOutboundRequests,
  startStaticServer,
} from "./shared.mjs";

await ensureCandidate(candidateFromArgs());
if (!(await pathExists(outputRoot)))
  throw new Error("Build output is missing; run build first.");
const contract = await readJson(`${pocRoot}/brief/routes.json`);
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

for (const route of contract.routes) {
  if (!route.path.endsWith("/"))
    throw new Error(`Route is not canonical: ${route.path}`);
  const htmlFile = emittedPath(route.path);
  if (!emittedFiles.has(htmlFile))
    throw new Error(`Missing emitted route: ${route.path}`);
  const html = await readFile(join(outputRoot, htmlFile), "utf8");
  if (/(ReferenceError:|exports is not defined|error boundary)/i.test(html))
    throw new Error(
      `Static output for ${route.path} contains a server-rendering error.`,
    );
  const escapedTitle = route.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (
    !new RegExp(`<title[^>]*>[^<]*${escapedTitle}`).test(html) ||
    !html.includes(route.staticHeading ?? route.heading) ||
    (route.content && !html.includes(route.content))
  )
    throw new Error(
      `Static output for ${route.path} is missing its expected title or heading.`,
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

const server = await startStaticServer(outputRoot);
const browser = await chromium.launch({ headless: true });
try {
  for (const route of contract.routes) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const assertNoOutbound = await rejectOutboundRequests(page, server.origin);
    const response = await page.goto(`${server.origin}${route.path}`);
    if (!response?.ok())
      throw new Error(
        `Static server returned ${response?.status()} for ${route.path}.`,
      );
    await page.waitForSelector('html[data-poc-ready="true"]');
    const search = page.getByLabel("Search", { exact: true });
    if ((await search.count()) !== 1)
      throw new Error(`Search control is missing or duplicated on ${route.path}.`);
    if (route.id === "ohs-player") {
      await search.fill("Reference Analytics");
      await page
        .locator('[class*="dropdownMenu"] [class*="suggestion"]')
        .first()
        .waitFor({ state: "visible", timeout: 10000 });
    }
    if (
      !(await page.title()).includes(route.title) ||
      !(await page
        .getByRole("heading", { level: 1, name: route.heading })
        .count()) ||
      (route.content &&
        !(await page.getByText(route.content, { exact: false }).count()))
    ) {
      throw new Error(`Browser smoke check failed for ${route.path}.`);
    }
    assertNoOutbound();
    await context.close();
  }
} finally {
  await browser.close();
  await server.close();
}
console.log(
  `Smoke-tested ${contract.routes.length} canonical Docusaurus routes, rendered content, search index, and static assets.`,
);
