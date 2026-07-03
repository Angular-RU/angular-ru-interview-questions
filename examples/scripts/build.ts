import {cp, mkdir, readdir, rm, stat, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
import {
    demos,
    type AngularDemo,
    type Demo,
    type StaticDemo,
    type ViteDemo,
} from '../manifest';

interface PublicDemo {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly category: Demo['category'];
    readonly tags: readonly string[];
    readonly status: Demo['status'];
    readonly href: string;
}

const root = resolve(import.meta.dirname, '../..');
const dist = resolve(root, 'dist');
const examplesDist = resolve(dist, 'examples');

const internalStaticFiles = new Set(['README.md']);

const resolveRootPath = (path: string): string => resolve(root, path);

const pathExists = async (path: string): Promise<boolean> => {
    try {
        await stat(path);

        return true;
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            return false;
        }

        throw error;
    }
};

const assertPathExists = async (path: string, message: string): Promise<void> => {
    if (!(await pathExists(path))) {
        throw new Error(message);
    }
};

const runWorkspaceBuild = async (
    workspace: string,
    args: readonly string[],
): Promise<void> => {
    const command = ['run', 'build', '-w', workspace, '--', ...args];

    await new Promise<void>((resolvePromise, reject) => {
        const child = spawn('npm', command, {
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
                    `Workspace build failed for "${workspace}" with exit code ${code ?? 'unknown'}.`,
                ),
            );
        });
    });
};

const copyDirectory = async (
    source: string,
    target: string,
    filter?: (source: string) => boolean,
): Promise<void> => {
    await mkdir(resolve(target, '..'), {recursive: true});
    await rm(target, {recursive: true, force: true});
    await cp(source, target, {
        recursive: true,
        filter,
    });
};

const copyStaticDemo = async (demo: StaticDemo): Promise<void> => {
    const source = resolveRootPath(demo.source);
    const targets = [resolve(dist, demo.output), resolve(examplesDist, demo.output)];

    await assertPathExists(
        source,
        `Static demo "${demo.id}" source does not exist: ${demo.source}`,
    );

    for (const target of targets) {
        await copyDirectory(
            source,
            target,
            (entry) => !internalStaticFiles.has(entry.split('/').at(-1) ?? ''),
        );
    }
};

const buildViteDemo = async (demo: ViteDemo): Promise<void> => {
    const source = resolveRootPath(demo.source);
    const buildOutput = resolveRootPath(demo.dist);
    const targets = [resolve(dist, demo.output), resolve(examplesDist, demo.output)];

    await assertPathExists(
        source,
        `Vite demo "${demo.id}" source does not exist: ${demo.source}`,
    );
    await rm(resolve(source, 'dist'), {recursive: true, force: true});
    await runWorkspaceBuild(demo.workspace, ['--base', demo.base]);
    await assertPathExists(
        buildOutput,
        `Vite demo "${demo.id}" build output does not exist: ${demo.dist}`,
    );

    for (const target of targets) {
        await copyDirectory(buildOutput, target);
    }
};

const buildAngularDemo = async (demo: AngularDemo): Promise<void> => {
    const source = resolveRootPath(demo.source);
    const buildOutput = resolveRootPath(demo.dist);
    const targets = [resolve(dist, demo.output), resolve(examplesDist, demo.output)];
    const configurationArgs = demo.configuration
        ? ['--configuration', demo.configuration]
        : [];

    await assertPathExists(
        source,
        `Angular demo "${demo.id}" source does not exist: ${demo.source}`,
    );
    await rm(resolve(source, 'dist'), {recursive: true, force: true});
    await runWorkspaceBuild(demo.workspace, configurationArgs);
    await assertPathExists(
        buildOutput,
        `Angular demo "${demo.id}" build output does not exist: ${demo.dist}`,
    );

    for (const target of targets) {
        await copyDirectory(buildOutput, target);
    }
};

const buildDemo = async (demo: Demo): Promise<void> => {
    switch (demo.type) {
        case 'static':
            await copyStaticDemo(demo);
            break;
        case 'vite':
            await buildViteDemo(demo);
            break;
        case 'angular':
            await buildAngularDemo(demo);
            break;
        case 'group':
            for (const app of demo.apps) {
                await buildDemo(app);
            }

            break;
        default: {
            const unknownDemo = demo as {readonly type: string; readonly id?: string};

            throw new Error(
                `Unknown demo type "${unknownDemo.type}" for "${unknownDemo.id ?? 'unknown demo'}".`,
            );
        }
    }
};

const toShowcaseHref = (href: string): string =>
    href.startsWith('./') ? `../${href.slice(2)}` : href;

const toPublicDemo = (demo: Demo): PublicDemo => ({
    id: demo.id,
    title: demo.title,
    description: demo.description,
    category: demo.category,
    tags: demo.tags,
    status: demo.status,
    href: toShowcaseHref(demo.href),
});

const buildExamples = async (): Promise<void> => {
    await mkdir(dist, {recursive: true});
    await mkdir(examplesDist, {recursive: true});
    await cp(resolve(root, 'examples/index.html'), resolve(examplesDist, 'index.html'));

    for (const demo of demos) {
        await buildDemo(demo);
    }

    const publicDemos = demos.map(toPublicDemo);

    await writeFile(
        resolve(examplesDist, 'demos.json'),
        `${JSON.stringify(publicDemos, null, 4)}\n`,
    );

    const entries = await readdir(examplesDist);

    if (!entries.includes('index.html') || !entries.includes('demos.json')) {
        throw new Error('Examples build finished without required showcase files.');
    }
};

buildExamples().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);

    console.error(`Failed to build examples: ${message}`);
    process.exitCode = 1;
});
