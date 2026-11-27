import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import test from "node:test";
import {
  outputRoot,
  pathExists,
  readJson,
  siteRoot,
  toolsRoot,
} from "../scripts/shared.mjs";

const require = createRequire(import.meta.url);
const { baseUrl } = require(join(siteRoot, "docusaurus.config.js"));

test("KMP FHIR SDK hub page, route contract, redirect, and sidebar IA exist", async () => {
  const [hubMd, routes, docusaurusConfig, sidebarsJs, reposJs] =
    await Promise.all([
      readFile(
        join(siteRoot, "docs/fhir-foundations/kmp-fhir-sdk/overview.md"),
        "utf8",
      ),
      readJson(join(toolsRoot, "routes.json")),
      readFile(join(siteRoot, "docusaurus.config.js"), "utf8"),
      readFile(join(siteRoot, "sidebars.js"), "utf8"),
      readFile(join(siteRoot, "src/data/playerRepositories.js"), "utf8"),
    ]);

  assert.match(hubMd, /slug:\s*\/fhir-foundations\/kmp-fhir-sdk\//);
  assert.match(hubMd, /Kotlin Multiplatform \(KMP\) FHIR SDK/);
  assert.match(hubMd, /kotlin-fhir-knowledge/);
  assert.match(hubMd, /kotlin-fhir-workflow/);

  assert.ok(
    routes.routes.some(
      (route) => route.path === "/ohs-docs/fhir-foundations/kmp-fhir-sdk/",
    ),
    "tools/routes.json missing /ohs-docs/fhir-foundations/kmp-fhir-sdk/",
  );

  assert.match(
    docusaurusConfig,
    /from:\s*"\/docs\/kmp-fhir-sdk",\s*to:\s*"\/fhir-foundations\/kmp-fhir-sdk\/"/,
  );
  assert.match(
    sidebarsJs,
    /label:\s*"Kotlin Multiplatform \(KMP\) FHIR SDK"/,
  );
  assert.match(sidebarsJs, /id:\s*"fhir-foundations\/kmp-fhir-sdk\/overview"/);
  assert.match(sidebarsJs, /label:\s*"Android FHIR SDK \(Maintenance\)"/);
  assert.match(sidebarsJs, /label:\s*"KMP FHIR SDK"/);

  for (const id of [
    "kotlin-fhir-workflow",
    "kotlin-fhir-knowledge",
    "android-fhir",
  ]) {
    assert.ok(
      reposJs.includes(`"${id}"`),
      `playerRepositories.js missing ${id}`,
    );
  }
});

test("Landing, pillars, versions, platform support, and resources cover KMP FHIR SDK accurately", async () => {
  const [
    landingJsx,
    landingMd,
    foundationsMd,
    androidMd,
    whyOhsMd,
    learnMd,
    versionsMd,
    platformMd,
    resourcesMd,
  ] = await Promise.all([
    readFile(join(siteRoot, "src/components/ohs/LandingPage.jsx"), "utf8"),
    readFile(join(siteRoot, "docs/landing.md"), "utf8"),
    readFile(join(siteRoot, "docs/fhir-foundations/overview.md"), "utf8"),
    readFile(
      join(siteRoot, "docs/fhir-foundations/android-fhir/overview.md"),
      "utf8",
    ),
    readFile(join(siteRoot, "docs/overview/why-ohs.md"), "utf8"),
    readFile(join(siteRoot, "docs/learn/overview.md"), "utf8"),
    readFile(join(siteRoot, "docs/fhir-foundations/versions.md"), "utf8"),
    readFile(
      join(siteRoot, "docs/fhir-foundations/platform-support.md"),
      "utf8",
    ),
    readFile(join(siteRoot, "docs/resources.md"), "utf8"),
  ]);

  assert.match(landingJsx, /KMP\) FHIR SDK/);
  assert.match(landingMd, /\/fhir-foundations\/kmp-fhir-sdk\//);
  assert.match(foundationsMd, /### Kotlin Multiplatform \(KMP\) FHIR SDK/);
  assert.match(foundationsMd, /kotlin-fhir-knowledge/);
  assert.match(foundationsMd, /Android FHIR SDK \(Maintenance\)/);
  assert.match(androidMd, /\*\*Maintenance status\*\*/);
  assert.match(androidMd, /## Migrating to the KMP FHIR SDK/);
  assert.match(whyOhsMd, /\/fhir-foundations\/kmp-fhir-sdk\//);
  assert.match(learnMd, /\/fhir-foundations\/kmp-fhir-sdk\//);

  assert.match(versionsMd, /Kotlin FHIR Workflow/);
  assert.match(versionsMd, /Kotlin FHIR Knowledge/);
  assert.match(versionsMd, /2\.0\.0-alpha01/);
  assert.doesNotMatch(versionsMd, /`data-capture` artifact \(up to 1\.0\.0-beta02\)/);
  assert.match(
    versionsMd,
    /maven\.google\.com\/web\/index\.html#com\.google\.android\.fhir:data-capture/,
  );

  assert.match(
    platformMd,
    /\|\s*iOS simulator, Intel \(`iosX64`\)\s*\|\s*✗\s*\|\s*✗\s*\|\s*✗\s*\|\s*✗\s*\|/,
  );
  assert.doesNotMatch(
    platformMd,
    /only repository in the pillar that ships `iosX64`/i,
  );
  assert.match(platformMd, /### Kotlin FHIR Workflow/);
  assert.match(platformMd, /### Kotlin FHIR Knowledge/);

  assert.match(resourcesMd, /kotlin-fhir-workflow/);
  assert.match(resourcesMd, /kotlin-fhir-knowledge/);
  assert.match(resourcesMd, /android-fhir/);
});

test("Issue #15 Engine, Data Capture, and FHIRPath regressions are resolved", async () => {
  const [engineOverview, engineStart, dcStart, conformanceMd] =
    await Promise.all([
      readFile(
        join(siteRoot, "docs/fhir-foundations/kotlin-fhir-engine/overview.md"),
        "utf8",
      ),
      readFile(
        join(
          siteRoot,
          "docs/fhir-foundations/kotlin-fhir-engine/get-started.md",
        ),
        "utf8",
      ),
      readFile(
        join(
          siteRoot,
          "docs/fhir-foundations/kotlin-fhir-data-capture/get-started.md",
        ),
        "utf8",
      ),
      readFile(
        join(
          siteRoot,
          "docs/fhir-foundations/kotlin-fhirpath/conformance.md",
        ),
        "utf8",
      ),
    ]);

  assert.doesNotMatch(engineOverview, /enableEncryptionIfSupported/);
  assert.match(engineOverview, /enableEncryption = true/);
  assert.match(engineOverview, /SQLCipher/);

  assert.match(engineStart, /dev\.ohs\.fhir:fhir-engine:2\.0\.0-alpha05/);
  assert.match(engineStart, /dev\.ohs\.fhir:fhir-model-r4:1\.0\.0-rc03/);
  assert.doesNotMatch(engineStart, /2\.0\.0-alpha02|1\.0\.0-beta05/);

  assert.match(dcStart, /dev\.ohs\.fhir:fhir-data-capture:2\.0\.0-alpha05/);
  assert.match(dcStart, /dev\.ohs\.fhir:fhir-model-r4:1\.0\.0-rc03/);
  assert.doesNotMatch(dcStart, /2\.0\.0-alpha02|1\.0\.0-beta05/);

  assert.match(conformanceMd, /`round\(\)`/);
  assert.match(conformanceMd, /`as` and `ofType\(\)`/);
});

test("built HTML renders KMP FHIR SDK hub, redirect, Maintenance notice, and sitemap", async () => {
  assert.ok(
    await pathExists(outputRoot),
    "Build output directory is missing; run `npm run check:build` first.",
  );

  const [hubHtml, redirectHtml, foundationsHtml, androidHtml, sitemapXml] =
    await Promise.all([
      readFile(
        join(outputRoot, "fhir-foundations/kmp-fhir-sdk/index.html"),
        "utf8",
      ),
      readFile(join(outputRoot, "docs/kmp-fhir-sdk/index.html"), "utf8"),
      readFile(join(outputRoot, "fhir-foundations/index.html"), "utf8"),
      readFile(
        join(outputRoot, "fhir-foundations/android-fhir/index.html"),
        "utf8",
      ),
      readFile(join(outputRoot, "sitemap.xml"), "utf8"),
    ]);

  assert.match(hubHtml, /Kotlin Multiplatform \(KMP\) FHIR SDK/);
  assert.match(hubHtml, /kotlin-fhir-knowledge/);
  assert.match(
    redirectHtml,
    new RegExp(
      `url=${baseUrl.replaceAll("/", "\\/")}fhir-foundations\\/kmp-fhir-sdk\\/`,
    ),
  );
  assert.match(
    foundationsHtml,
    new RegExp(
      `href="${baseUrl.replaceAll("/", "\\/")}fhir-foundations\\/kmp-fhir-sdk\\/"`,
    ),
  );
  assert.match(androidHtml, /Maintenance status/);
  assert.match(androidHtml, /Migrating to the KMP FHIR SDK/);
  assert.match(sitemapXml, /\/fhir-foundations\/kmp-fhir-sdk\//);
});
