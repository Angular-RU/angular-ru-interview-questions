import {promises as fs} from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('src/pages');
const CODE_FENCE_PATTERN = /^(`{3,})([^\n]*)\n([\s\S]*?)^\1\s*$/gm;
const FILENAME_PATTERN = /(?:^|\/)(?:[\w@.-]+\.[\w-]+|Dockerfile|Jenkinsfile|Makefile|Procfile)$/iu;
const KNOWN_LABEL_PATTERN = /^(?:Angular|React|JavaScript|TypeScript|Node(?:\.js)?|HTML|CSS|SQL|Shell|Docker)$/iu;

const isFilename = (value) => !/\s/.test(value) && FILENAME_PATTERN.test(value);

const parseComment = (line) => {
    const comment =
        line.match(/^\/\/\s*(.+)$/)?.[1] ??
        line.match(/^<!--\s*(.+?)\s*-->$/)?.[1] ??
        line.match(/^\/\*\s*(.+?)\s*\*\/$/)?.[1] ??
        line.match(/^#\s*(.+)$/)?.[1];

    if (!comment) {
        return null;
    }

    const separatorIndex = comment.lastIndexOf(':');
    const candidate = (separatorIndex >= 0 ? comment.slice(separatorIndex + 1) : comment).trim();

    if (isFilename(candidate)) {
        return {
            filename: candidate,
            label: separatorIndex >= 0 ? comment.slice(0, separatorIndex).trim() : undefined,
        };
    }

    return KNOWN_LABEL_PATTERN.test(comment.trim()) ? {label: comment.trim()} : null;
};

const transformCodeFences = (source, fallbackLabel) =>
    source.replace(CODE_FENCE_PATTERN, (block, fence, info, body) => {
        const [language = '', ...metaParts] = info.trim().split(/\s+/);

        if (!language) {
            return block;
        }

        let meta = metaParts.join(' ').trim();
        const lines = body.split('\n');
        const firstContentIndex = lines.findIndex((line) => line.trim());

        if (!meta && firstContentIndex >= 0) {
            const parsedComment = parseComment(lines[firstContentIndex].trim());

            if (parsedComment?.filename) {
                meta = parsedComment.filename;
                lines.splice(firstContentIndex, 1);
            } else if (parsedComment?.label) {
                meta = parsedComment.label;
                lines.splice(firstContentIndex, 1);
            }
        }

        if (!meta && fallbackLabel) {
            meta = fallbackLabel;
        }

        const nextBody = lines.join('\n').replace(/^\n/, '');

        return `${fence}${language}${meta ? ` ${meta}` : ''}\n${nextBody}${fence}`;
    });

const unwrapCodeGroups = (source) => {
    const fieldsetPattern = /<fieldset>\s*<legend>([^<]+)<\/legend>\s*([\s\S]*?)\s*<\/fieldset>/g;
    const sectionPattern = /<section class="code-example-group" aria-label="([^"]+)">\s*<p class="code-example-group__title">[^<]*<\/p>\s*([\s\S]*?)\s*<\/section>/g;

    return source
        .replace(fieldsetPattern, (_, label, content) =>
            transformCodeFences(content.trim(), label.trim()),
        )
        .replace(sectionPattern, (_, label, content) =>
            transformCodeFences(content.trim(), label.trim()),
        );
};

const walk = async (directory) => {
    const entries = await fs.readdir(directory, {withFileTypes: true});
    const files = [];

    for (const entry of entries) {
        const location = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...(await walk(location)));
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
            files.push(location);
        }
    }

    return files;
};

const files = await walk(ROOT);
let changedFiles = 0;

for (const file of files) {
    const source = await fs.readFile(file, 'utf8');
    const withoutGroups = unwrapCodeGroups(source);
    const migrated = transformCodeFences(withoutGroups);

    if (migrated !== source) {
        await fs.writeFile(file, migrated);
        changedFiles += 1;
    }

    if (/code-example-group|<fieldset>\s*<legend>[^<]+<\/legend>[\s\S]*?```/u.test(migrated)) {
        throw new Error(`Decorative code wrapper remains in ${path.relative(process.cwd(), file)}`);
    }
}

console.log(`Migrated code fence metadata in ${changedFiles} Markdown files.`);
