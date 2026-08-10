import {spawn} from 'node:child_process';
import {mkdir, readFile, rm, stat, writeFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

export const toolsRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
export const repositoryRoot = resolve(toolsRoot, '..');
export const siteRoot = repositoryRoot;
export const outputRoot = join(repositoryRoot, 'build');
export const expectedRuntime = {node: 'v24.18.0', npm: '11.16.0'};
export const expectedEngines = {node: '>=24.18.0 <25', npm: '>=11.16.0 <12'};

export function npmCommand() { return process.platform === 'win32' ? 'npm.cmd' : 'npm'; }

export function run(command, args, options = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {stdio: 'inherit', ...options});
    child.on('error', reject);
    child.on('exit', (code) => code === 0 ? resolvePromise() : reject(new Error(`${command} ${args.join(' ')} exited with ${code}`)));
  });
}

export async function npmVersion() {
  const result = await new Promise((resolvePromise, reject) => {
    let output = '';
    const child = spawn(npmCommand(), ['--version'], {stdio: ['ignore', 'pipe', 'inherit']});
    child.stdout.on('data', (chunk) => output += chunk);
    child.on('error', reject);
    child.on('exit', (code) => code === 0 ? resolvePromise(output.trim()) : reject(new Error(`npm --version exited with ${code}`)));
  });
  return result;
}

export async function assertRuntime() {
  const actualNpm = await npmVersion();
  if (process.version !== expectedRuntime.node || actualNpm !== expectedRuntime.npm) {
    throw new Error(`The documentation gates require Node ${expectedRuntime.node} and npm ${expectedRuntime.npm}; found Node ${process.version} and npm ${actualNpm}.`);
  }
}

export async function assertPackageEngines() {
  const path = `${repositoryRoot}/package.json`;
  const packageJson = await readJson(path);
  for (const [runtime, expected] of Object.entries(expectedEngines)) {
    if (packageJson.engines?.[runtime] !== expected) {
      throw new Error(`${path} must declare engines.${runtime} as ${expected}.`);
    }
  }
}

export async function readJson(path) { return JSON.parse(await readFile(path, 'utf8')); }
export async function writeJson(path, value) { await mkdir(resolve(path, '..'), {recursive: true}); await writeFile(path, `${JSON.stringify(value, null, 2)}\n`); }

export async function pathExists(path) { try { await stat(path); return true; } catch { return false; } }
export async function cleanOutput() { await rm(outputRoot, {recursive: true, force: true}); await mkdir(outputRoot, {recursive: true}); }
