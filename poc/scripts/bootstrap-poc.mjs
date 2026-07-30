import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {candidateRoot, assertPackageEngines, assertRuntime, npmCommand, npmVersion, pocRoot, readJson, run, writeJson} from './shared.mjs';

await assertRuntime();
await assertPackageEngines();
const npmCache = `${pocRoot}/.npm-cache`;
for (const directory of [pocRoot, candidateRoot]) {
  await run(npmCommand(), ['ci', '--workspaces=false'], {cwd: directory, env: {...process.env, npm_config_cache: npmCache}});
}
const playwrightInstall = process.platform === 'linux'
  ? ['exec', '--', 'playwright', 'install', '--with-deps', 'chromium']
  : ['exec', '--', 'playwright', 'install', 'chromium'];
await run(npmCommand(), playwrightInstall, {cwd: pocRoot, env: {...process.env, npm_config_cache: npmCache}});
const sha256 = async (path) => createHash('sha256').update(await readFile(path)).digest('hex');
const versionFromLock = async (lockPath, packagePath) => (await readJson(lockPath)).packages[packagePath]?.version ?? null;
await writeJson(`${pocRoot}/baseline/capture-manifest.json`, {
  phase: 'docusaurus-feasibility',
  scaffoldDate: '2026-07-27',
  runtime: {node: process.version, npm: await npmVersion()},
  candidates: {
    docusaurus: await versionFromLock(`${candidateRoot}/package-lock.json`, 'node_modules/@docusaurus/core'),
    localSearch: await versionFromLock(`${candidateRoot}/package-lock.json`, 'node_modules/@easyops-cn/docusaurus-search-local'),
    playwright: await versionFromLock(`${pocRoot}/package-lock.json`, 'node_modules/@playwright/test'),
  },
  lockfiles: {
    poc: await sha256(`${pocRoot}/package-lock.json`),
    docusaurus: await sha256(`${candidateRoot}/package-lock.json`),
  },
  runner: {ImageOS: process.env.ImageOS ?? null, ImageVersion: process.env.ImageVersion ?? null},
  baseline: {status: 'comparison pending', reason: 'No approved CI pixel baseline has been provided for this feasibility PoC.'},
});
