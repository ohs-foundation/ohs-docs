import {assertRuntime, candidateFromArgs, cleanOutput, ensureCandidate, npmCommand, outputRoot, pocRoot, run} from './shared.mjs';

await ensureCandidate(candidateFromArgs());
await assertRuntime();
await cleanOutput();
await run(npmCommand(), ['run', 'build', '--prefix', 'docusaurus', '--', '--out-dir', outputRoot], {cwd: pocRoot});
