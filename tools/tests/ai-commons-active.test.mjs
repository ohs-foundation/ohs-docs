import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import test from "node:test";
import { outputRoot, pathExists, siteRoot } from "../scripts/shared.mjs";

const require = createRequire(import.meta.url);
const { baseUrl } = require(join(siteRoot, "docusaurus.config.js"));
const expectedAiCommonsHref = `href="${baseUrl}why-ohs/#pillar-3-for-ai-commons-active"`;

async function collectFiles(directory, extensions) {
  const results = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await collectFiles(fullPath, extensions)));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

test("index card, CSS badge, and sidebar reflect Active AI Commons status", async () => {
  const [landingJsx, customCss, sidebarsJs] = await Promise.all([
    readFile(join(siteRoot, "src/components/ohs/LandingPage.jsx"), "utf8"),
    readFile(join(siteRoot, "src/css/custom.css"), "utf8"),
    readFile(join(siteRoot, "sidebars.js"), "utf8"),
  ]);

  assert.match(
    landingJsx,
    /<span className="ohs-release-badge ohs-release-active">Active<\/span>/,
  );
  assert.match(
    landingJsx,
    /to="\/why-ohs\/#pillar-3-for-ai-commons-active"/,
  );
  assert.doesNotMatch(landingJsx, /ohs-coming-soon-badge">Launching/);
  assert.doesNotMatch(landingJsx, /AI Commons \(Launching\)/);

  assert.match(customCss, /--ohs-green:/);
  assert.match(customCss, /\.ohs-release-active\s*\{/);

  assert.match(sidebarsJs, /label:\s*"Pillar 03 · AI Commons \(Active\)"/);
  assert.match(sidebarsJs, /href:\s*"\/why-ohs\/#pillar-3-for-ai-commons-active"/);
});

test("docs, src, and sidebars contain zero stale Incubating or Launching AI Commons copy", async () => {
  const sourceFiles = [
    ...(await collectFiles(join(siteRoot, "docs"), [".md", ".svg"])),
    ...(await collectFiles(join(siteRoot, "src"), [".js", ".jsx", ".css"])),
    join(siteRoot, "sidebars.js"),
  ];

  const stalePatterns = [
    /AI Commons \(Launching\)/i,
    /AI Commons \(Incubating\)/i,
    /in incubation/i,
    /#pillar-3-for-ai-commons-launching/,
    /#pillar-3-for-ai-commons-incubating/,
    /October 26, 2026/,
  ];

  for (const filePath of sourceFiles) {
    const content = await readFile(filePath, "utf8");
    for (const pattern of stalePatterns) {
      assert.equal(
        pattern.test(content),
        false,
        `Unexpected stale AI Commons reference (${pattern}) in ${filePath}`,
      );
    }
  }
});

test("architecture and pathways SVGs show Active Pillar 3 and Pathway D initiatives", async () => {
  const [ecosystemSvg, pathwaysSvg] = await Promise.all([
    readFile(join(siteRoot, "docs/images/ohs-ecosystem-overview.svg"), "utf8"),
    readFile(join(siteRoot, "docs/images/pathways-overview.svg"), "utf8"),
  ]);

  for (const token of [
    "ACTIVE",
    "gHBench",
    "AI Evals Working Group",
    "Agent Skills",
  ]) {
    assert.ok(
      ecosystemSvg.includes(token),
      `ohs-ecosystem-overview.svg missing "${token}"`,
    );
  }
  assert.ok(pathwaysSvg.includes("ACTIVE"), 'pathways-overview.svg missing "ACTIVE"');
  assert.ok(
    pathwaysSvg.includes("Agent Skills"),
    'pathways-overview.svg missing "Agent Skills"',
  );

  for (const svg of [ecosystemSvg, pathwaysSvg]) {
    assert.doesNotMatch(svg, /LAUNCHING/);
    assert.doesNotMatch(svg, /INCUBATING/);
    assert.doesNotMatch(svg, /stroke-dasharray/);
  }
});

test("built HTML renders Active badge, anchor, and key AI Commons initiatives", async () => {
  assert.ok(
    await pathExists(outputRoot),
    "Build output directory is missing; run `npm run check:build` first.",
  );

  const [indexHtml, whyOhsHtml, learnHtml, pathwaysHtml] = await Promise.all([
    readFile(join(outputRoot, "index.html"), "utf8"),
    readFile(join(outputRoot, "why-ohs/index.html"), "utf8"),
    readFile(join(outputRoot, "learn/index.html"), "utf8"),
    readFile(
      join(outputRoot, "overview/solutions-and-pathways/index.html"),
      "utf8",
    ),
  ]);

  assert.match(indexHtml, /ohs-release-active">Active</);
  assert.ok(
    indexHtml.includes(expectedAiCommonsHref),
    `index built HTML missing ${expectedAiCommonsHref}`,
  );
  assert.doesNotMatch(indexHtml, /AI Commons \(Launching\)/);

  for (const [pageName, html] of [
    ["why-ohs", whyOhsHtml],
    ["learn", learnHtml],
  ]) {
    assert.match(
      html,
      /id="pillar-3-for-ai-commons-active"/,
      `${pageName} missing #pillar-3-for-ai-commons-active heading anchor`,
    );
    for (const requiredText of [
      "gHBench",
      "Google.org",
      "PATH",
      "MLCommons",
      "CHAI",
      "AI Commons for Global Health",
      "AI Evals Working Group",
      "https://github.com/ohs-foundation/labs-ohs-agent/tree/main/skills",
      "https://ohs.foundation/blog/fhir-standards-tax.html",
      "https://ohs.foundation/get-involved",
    ]) {
      assert.ok(
        html.includes(requiredText),
        `${pageName} built HTML missing "${requiredText}"`,
      );
    }
  }

  assert.ok(
    pathwaysHtml.includes(expectedAiCommonsHref),
    `solutions-and-pathways built HTML missing ${expectedAiCommonsHref}`,
  );
  for (const requiredText of [
    "gHBench",
    "AI Evals Working Group",
    "https://ohs.foundation/blog/fhir-standards-tax.html",
  ]) {
    assert.ok(
      pathwaysHtml.includes(requiredText),
      `solutions-and-pathways built HTML missing "${requiredText}"`,
    );
  }
});
