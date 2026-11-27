import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import test from "node:test";
import { formatLastUpdated } from "../../src/utils/formatTimestamp.mjs";
import { outputRoot, pathExists, siteRoot } from "../scripts/shared.mjs";

const require = createRequire(import.meta.url);
const configPath = join(siteRoot, "docusaurus.config.js");

function gitLastCommitIso(relPath) {
  const args = ["log", "-1", "--format=%cI"];
  if (relPath) args.push("--", relPath);
  const out = execFileSync("git", args, {
    cwd: siteRoot,
    encoding: "utf8",
  }).trim();
  return new Date(out).toISOString();
}

test("formatLastUpdated formats valid timestamps in deterministic UTC and rejects invalid inputs", () => {
  for (const invalid of [null, undefined, "", NaN, "not-a-date"]) {
    assert.equal(formatLastUpdated(invalid), null);
  }

  const midnightSample = new Date("2026-11-27T00:05:00Z");
  const expectedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(midnightSample);
  const expectedDateTime = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(midnightSample);

  const fromMs = formatLastUpdated(midnightSample.getTime());
  assert.deepEqual(fromMs, {
    iso: "2026-11-27T00:05:00.000Z",
    dateLabel: expectedDate,
    dateTimeLabel: expectedDateTime,
  });
  assert.equal(fromMs.dateTimeLabel.includes("00:05"), true);
  assert.equal(fromMs.dateTimeLabel.includes("24:05"), false);

  const fromIso = formatLastUpdated("2026-11-17T17:28:47+07:00");
  assert.equal(fromIso.iso, "2026-11-17T10:28:47.000Z");
});

test("docusaurus.config.js enables showLastUpdateTime and exposes git siteLastUpdatedAt", () => {
  const cfg = require(configPath);
  const docsPreset = cfg.presets[0][1].docs;
  assert.equal(docsPreset.showLastUpdateTime, true);
  assert.equal(docsPreset.showLastUpdateAuthor, false);

  const expectedSiteIso = gitLastCommitIso();
  assert.equal(cfg.customFields?.siteLastUpdatedAt, expectedSiteIso);
});

test("CI workflows and Netlify build helper ensure full git history", async () => {
  const [checksYml, deployYml] = await Promise.all([
    readFile(join(siteRoot, ".github/workflows/checks.yml"), "utf8"),
    readFile(join(siteRoot, ".github/workflows/deploy.yml"), "utf8"),
  ]);
  assert.match(checksYml, /fetch-depth:\s*0/);
  assert.match(deployYml, /fetch-depth:\s*0/);

  const helperPath = join(siteRoot, "tools/scripts/ensure-git-history.mjs");
  assert.ok(await pathExists(helperPath), "ensure-git-history.mjs must exist");
  execFileSync(process.execPath, [helperPath], { cwd: siteRoot, stdio: "pipe" });
});

test("built HTML renders distinct per-page git timestamps and landing footer site timestamp", async () => {
  assert.ok(
    await pathExists(outputRoot),
    "Build output directory is missing; run `npm run check:build` first.",
  );

  const [indexHtml, whyOhsHtml, engineHtml] = await Promise.all([
    readFile(join(outputRoot, "index.html"), "utf8"),
    readFile(join(outputRoot, "why-ohs/index.html"), "utf8"),
    readFile(join(outputRoot, "tutorials-and-codelabs/engine/index.html"), "utf8"),
  ]);

  const expectedSite = formatLastUpdated(gitLastCommitIso());
  assert.ok(
    indexHtml.includes('class="ohs-footer-updated"'),
    "Landing page footer missing .ohs-footer-updated",
  );
  assert.ok(
    indexHtml.includes(`<time dateTime="${expectedSite.iso}"`) ||
      indexHtml.includes(`<time datetime="${expectedSite.iso}"`),
    `Landing page footer missing site timestamp ${expectedSite.iso}`,
  );
  assert.ok(indexHtml.includes("UTC"), "Landing page footer timestamp should name UTC");

  const whyExpected = formatLastUpdated(gitLastCommitIso("docs/overview/why-ohs.md"));
  const engineExpected = formatLastUpdated(
    gitLastCommitIso("docs/tutorials-and-codelabs/engine.md"),
  );
  assert.notEqual(
    whyExpected.iso,
    engineExpected.iso,
    "Test fixture pages must have distinct git commit dates",
  );

  for (const [label, html, expected] of [
    ["why-ohs", whyOhsHtml, whyExpected],
    ["engine", engineHtml, engineExpected],
  ]) {
    assert.ok(
      html.includes('class="ohs-last-updated"'),
      `${label} built HTML missing .ohs-last-updated`,
    );
    assert.ok(
      html.includes(expected.iso) && html.includes(expected.dateLabel),
      `${label} built HTML missing expected git timestamp ${expected.iso} (${expected.dateLabel})`,
    );
  }
});
