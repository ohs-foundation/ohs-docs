import {assertPackageEngines, assertRuntime, cleanOutput, npmCommand, outputRoot, repositoryRoot, run} from './shared.mjs';

await assertRuntime();
await assertPackageEngines();
await cleanOutput();
await run(npmCommand(), ['run', 'build', '--', '--out-dir', outputRoot], {cwd: repositoryRoot});
