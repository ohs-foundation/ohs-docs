import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import test from "node:test";
import {
  expectedRuntime,
  outputRoot,
  pathExists,
  siteRoot,
} from "../scripts/shared.mjs";

const require = createRequire(import.meta.url);
const configPath = join(siteRoot, "docusaurus.config.js");

function loadConfigWithEnv(overrides = {}) {
  const env = { ...process.env };
  delete env.NETLIFY;
  delete env.URL;
  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) delete env[key];
    else env[key] = value;
  }
  const stdout = execFileSync(
    process.execPath,
    [
      "-e",
      `const c = require(${JSON.stringify(configPath)}); console.log(JSON.stringify({ url: c.url, baseUrl: c.baseUrl, trailingSlash: c.trailingSlash, organizationName: c.organizationName, projectName: c.projectName }));`,
    ],
    { env, encoding: "utf8" },
  );
  return JSON.parse(stdout);
}

test("docusaurus.config.js defaults to GitHub Pages when NETLIFY is unset or false", () => {
  for (const overrides of [
    {},
    { NETLIFY: "false" },
    { NETLIFY: "0" },
    { NETLIFY: "" },
  ]) {
    const cfg = loadConfigWithEnv(overrides);
    assert.equal(cfg.baseUrl, "/ohs-docs/");
    assert.equal(cfg.url, "https://ohs-foundation.github.io");
    assert.equal(cfg.trailingSlash, true);
    assert.equal(cfg.organizationName, "ohs-foundation");
    assert.equal(cfg.projectName, "ohs-docs");
  }
});

test("docusaurus.config.js switches to root baseUrl and Netlify URL when NETLIFY is set", () => {
  for (const netlifyVal of ["true", "1"]) {
    const cfg = loadConfigWithEnv({ NETLIFY: netlifyVal });
    assert.equal(cfg.baseUrl, "/");
    assert.equal(cfg.url, "https://docs.ohs.foundation");
    assert.equal(cfg.trailingSlash, true);
  }

  const previewCfg = loadConfigWithEnv({
    NETLIFY: "true",
    URL: "https://deploy-preview-42--ohs-docs.netlify.app/",
  });
  assert.equal(previewCfg.baseUrl, "/");
  assert.equal(previewCfg.url, "https://deploy-preview-42--ohs-docs.netlify.app");
});

test("netlify.toml configures build command, publish dir, and pinned Node version", async () => {
  const netlifyTomlPath = join(siteRoot, "netlify.toml");
  assert.ok(await pathExists(netlifyTomlPath), "netlify.toml must exist at repo root");
  const content = await readFile(netlifyTomlPath, "utf8");
  const expectedNode = expectedRuntime.node.replace(/^v/, "");

  assert.match(content, /^\[build\]/m);
  assert.match(content, /^\s*command\s*=\s*"npm run build"/m);
  assert.match(content, /^\s*publish\s*=\s*"build"/m);
  assert.match(content, /^\[build\.environment\]/m);
  assert.match(
    content,
    new RegExp(`^\\s*NODE_VERSION\\s*=\\s*"${expectedNode.replaceAll(".", "\\.")}"`, "m"),
  );
});

test("built HTML, sitemap, and redirects match active baseUrl and site url", async () => {
  assert.ok(
    await pathExists(outputRoot),
    "Build output directory is missing; run `npm run check:build` first.",
  );

  const cfg = require(configPath);
  const [indexHtml, sitemapXml, redirectHtml] = await Promise.all([
    readFile(join(outputRoot, "index.html"), "utf8"),
    readFile(join(outputRoot, "sitemap.xml"), "utf8"),
    readFile(join(outputRoot, "docs/kotlin-fhir/index.html"), "utf8"),
  ]);

  assert.ok(
    indexHtml.includes(`<link data-rh="true" rel="canonical" href="${cfg.url}${cfg.baseUrl}">`),
    `index.html canonical tag missing ${cfg.url}${cfg.baseUrl}`,
  );
  assert.ok(
    indexHtml.includes(`href="${cfg.baseUrl}assets/css/styles.`),
    `index.html stylesheet link missing ${cfg.baseUrl}assets/css/styles.`,
  );
  if (cfg.baseUrl === "/") {
    assert.equal(
      /(?:href|src)=["']\/ohs-docs\//.test(indexHtml),
      false,
      "Netlify root build index.html must not contain /ohs-docs/ asset or page links",
    );
  }

  assert.ok(
    sitemapXml.includes(`<loc>${cfg.url}${cfg.baseUrl}why-ohs/</loc>`),
    `sitemap.xml missing ${cfg.url}${cfg.baseUrl}why-ohs/`,
  );
  assert.ok(
    sitemapXml.includes(
      `<loc>${cfg.url}${cfg.baseUrl}fhir-foundations/kotlin-fhir/coded-values/</loc>`,
    ),
    `sitemap.xml missing ${cfg.url}${cfg.baseUrl}fhir-foundations/kotlin-fhir/coded-values/`,
  );

  assert.ok(
    redirectHtml.includes(`url=${cfg.baseUrl}fhir-foundations/kotlin-fhir/`),
    `docs/kotlin-fhir redirect missing ${cfg.baseUrl}fhir-foundations/kotlin-fhir/`,
  );
});
