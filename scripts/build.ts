import {mkdir, rm, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');

const runScript = async (script: string): Promise<void> => {
    await new Promise<void>((resolvePromise, reject) => {
        const child = spawn('npm', ['run', script], {
            cwd: root,
            shell: false,
            stdio: 'inherit',
        });

        child.on('error', reject);
        child.on('exit', (code) => {
            if (code === 0) {
                resolvePromise();

                return;
            }

            reject(
                new Error(
                    `Script "${script}" failed with exit code ${code ?? 'unknown'}.`,
                ),
            );
        });
    });
};

const build = async (): Promise<void> => {
    await rm(dist, {recursive: true, force: true});
    await mkdir(dist, {recursive: true});
    await writeFile(resolve(dist, '.nojekyll'), '');

    await runScript('build:site');
    await runScript('build:examples');
};

build().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);

    console.error(`Failed to build project: ${message}`);
    process.exitCode = 1;
});
