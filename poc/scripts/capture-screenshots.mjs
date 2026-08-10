import {mkdir} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {candidateFromArgs, ensureCandidate, outputRoot, pocRoot, readJson, rejectOutboundRequests, startStaticServer} from './shared.mjs';

await ensureCandidate(candidateFromArgs());
const {viewports} = await readJson(`${pocRoot}/baseline/viewports.json`);
const {routes} = await readJson(`${pocRoot}/brief/routes.json`);
const server = await startStaticServer(outputRoot);
try {
  await mkdir(`${pocRoot}/results/screenshots`, {recursive: true});
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
        await page.screenshot({path: `${pocRoot}/results/screenshots/${route.id}-${viewport.id}.png`, fullPage: true});
        assertNoOutbound();
      } finally {
        await context.close();
        await browser.close();
      }
    }
  }
} finally { await server.close(); }
console.log('Captured candidate screenshots for every route and viewport. No approved pixel baseline was available, so no diff claim was made.');
