import { mkdir } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import { chromium, expect } from "@playwright/test";
import {
  outputRoot,
repositoryRoot,
  toolsRoot,
  readJson,
  rejectOutboundRequests,
  startStaticServer,
  writeJson,
} from "./shared.mjs";

const { viewports } = await readJson(`${toolsRoot}/viewports.json`);
const { routes } = await readJson(`${toolsRoot}/routes.json`);
const server = await startStaticServer(outputRoot);
const results = [];
const failures = [];

async function scan(page, viewport, route, state) {
  const scanResult = await new AxeBuilder({ page }).analyze();
  const serious = scanResult.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact),
  );
  results.push({
    viewport: viewport.id,
    route: route.path,
    state,
    violations: scanResult.violations,
  });
  if (serious.length)
    failures.push(
      `${viewport.id} ${route.path} ${state}: ${serious.map((item) => item.id).join(", ")}`,
    );
}

try {
  for (const viewport of viewports) {
    for (const route of routes) {
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: viewport.deviceScaleFactor,
      });
      const page = await context.newPage();
      try {
        const assertNoOutbound = await rejectOutboundRequests(
          page,
          server.origin,
        );
        await page.goto(`${server.origin}${route.path}`);
        await page.waitForSelector('html[data-docs-ready="true"]');
        await scan(page, viewport, route, "initial");

        if (viewport.id === "mobile") {
          const menu =
            route.id === "ohs-player"
              ? page.getByRole("button", {
                  name: "Toggle navigation",
                  exact: true,
                })
              : page.getByRole("button", {
                  name: "Open documentation navigation",
                });
          await menu.click();
          await scan(page, viewport, route, "mobile-navigation-open");
          await page.keyboard.press("Escape");
          await expect(menu).toBeFocused();
        }
        assertNoOutbound();
      } catch (error) {
        failures.push(error.message);
      } finally {
        await context.close();
        await browser.close();
      }
    }
  }
} finally {
  await mkdir(`${repositoryRoot}/results/accessibility`, { recursive: true });
  await writeJson(`${repositoryRoot}/results/accessibility/axe.json`, results);
  await server.close();
}
if (failures.length)
  throw new Error(`Accessibility checks failed:\n${failures.join("\n")}`);
console.log(
  "Axe and keyboard checks completed for the Markdown-first landing and guide shells.",
);
