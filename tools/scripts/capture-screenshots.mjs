import {mkdir} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {outputRoot,
repositoryRoot, toolsRoot, readJson, rejectOutboundRequests, startStaticServer} from './shared.mjs';

const {viewports} = await readJson(`${toolsRoot}/viewports.json`);
const {routes} = await readJson(`${toolsRoot}/routes.json`);
const server = await startStaticServer(outputRoot);
try {
  await mkdir(`${repositoryRoot}/results/screenshots`, {recursive: true});
  for (const viewport of viewports) {
    for (const route of routes) {
      const browser = await chromium.launch({headless: true});
      const context = await browser.newContext({viewport: {width: viewport.width, height: viewport.height}, deviceScaleFactor: viewport.deviceScaleFactor});
      const page = await context.newPage();
      try {
        const assertNoOutbound = await rejectOutboundRequests(page, server.origin);
        await page.goto(`${server.origin}${route.path}`);
        await page.addStyleTag({content: '*,*::before,*::after{animation:none!important;transition:none!important;}'});
        await page.waitForSelector('html[data-docs-ready="true"]');
        await page.screenshot({path: `${repositoryRoot}/results/screenshots/${route.id}-${viewport.id}.png`, fullPage: true});
        assertNoOutbound();
      } finally {
        await context.close();
        await browser.close();
      }
    }
  }
} finally { await server.close(); }
console.log('Captured screenshots for every route and viewport. There is no approved pixel baseline, so no diff was claimed.');
