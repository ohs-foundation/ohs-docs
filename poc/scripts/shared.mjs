import {spawn} from 'node:child_process';
import {mkdir, readFile, rm, stat, writeFile} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {createServer} from 'node:http';
import {extname, join, relative, resolve, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

export const pocRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
export const repositoryRoot = resolve(pocRoot, '..');
export const candidateRoot = join(pocRoot, 'docusaurus');
export const outputRoot = join(pocRoot, '.output', 'docusaurus');
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
    throw new Error(`This compatibility PoC requires Node ${expectedRuntime.node} and npm ${expectedRuntime.npm}; found Node ${process.version} and npm ${actualNpm}.`);
  }
}

export async function assertPackageEngines() {
  for (const path of [`${pocRoot}/package.json`, `${candidateRoot}/package.json`]) {
    const packageJson = await readJson(path);
    for (const [runtime, expected] of Object.entries(expectedEngines)) {
      if (packageJson.engines?.[runtime] !== expected) {
        throw new Error(`${path} must declare engines.${runtime} as ${expected}.`);
      }
    }
  }
}

export async function ensureCandidate(candidate) {
  if (candidate !== 'docusaurus') throw new Error(`Unsupported candidate: ${candidate ?? '(missing)'}.`);
}

export function candidateFromArgs() {
  const match = process.argv.find((argument) => argument.startsWith('--candidate='));
  return match?.slice('--candidate='.length) ?? 'docusaurus';
}

export async function readJson(path) { return JSON.parse(await readFile(path, 'utf8')); }
export async function writeJson(path, value) { await mkdir(resolve(path, '..'), {recursive: true}); await writeFile(path, `${JSON.stringify(value, null, 2)}\n`); }

export async function pathExists(path) { try { await stat(path); return true; } catch { return false; } }
export async function cleanOutput() { await rm(outputRoot, {recursive: true, force: true}); await mkdir(outputRoot, {recursive: true}); }

const mimeTypes = {'.css': 'text/css', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.map': 'application/json', '.xml': 'application/xml'};

export async function startStaticServer(root = outputRoot) {
  const safeRoot = resolve(root);
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://127.0.0.1');
      const pathname = decodeURIComponent(url.pathname);
      if (!pathname.startsWith('/docusaurus/')) { response.writeHead(404).end('Not found'); return; }
      const remainder = pathname.slice('/docusaurus/'.length);
      const candidate = pathname.endsWith('/')
        ? resolve(safeRoot, remainder, 'index.html')
        : resolve(safeRoot, remainder);
      if (relative(safeRoot, candidate).startsWith(`..${sep}`) || !(await pathExists(candidate))) { response.writeHead(404).end('Not found'); return; }
      if (!pathname.endsWith('/') && !extname(candidate)) { response.writeHead(404).end('Canonical paths end with a slash'); return; }
      response.writeHead(200, {'content-type': mimeTypes[extname(candidate)] ?? 'application/octet-stream'}); createReadStream(candidate).pipe(response);
    } catch { response.writeHead(400).end('Bad request'); }
  });
  await new Promise((resolvePromise, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => { server.off('error', reject); resolvePromise(); });
  });
  const {port} = server.address();
  return {origin: `http://127.0.0.1:${port}`, close: () => new Promise((resolvePromise, reject) => server.close((error) => error ? reject(error) : resolvePromise()))};
}

export async function rejectOutboundRequests(page, origin) {
  const outbound = new Set();
  await page.route('**/*', async (route) => {
    const requestUrl = route.request().url();
    if (new URL(requestUrl).origin === origin) return route.continue();
    outbound.add(requestUrl);
    return route.abort();
  });
  return () => {
    if (outbound.size) throw new Error(`Outbound browser requests are prohibited: ${[...outbound].join(', ')}`);
  };
}
