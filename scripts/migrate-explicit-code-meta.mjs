import {promises as fs} from 'node:fs';
import path from 'node:path';

const PAGES_ROOT = path.resolve('src/pages');
const PLUGIN_PATH = path.resolve('src/plugins/rehype-content-figures.ts');
const FENCE_PATTERN = /^(`{3,})([^\s`]*)[ \t]+([^\n]+)$/gm;
const EXPLICIT_META_PATTERN = /(?:^|\s)(?:filename|file|title)=/i;
const FILENAME_PATTERN = /^(?!.*\s)(?:(?:.+\/)?[^/]+\.[^/]+|(?:.+\/)?(?:Dockerfile|Jenkinsfile|Makefile|Procfile))$/iu;

const replaceRequired = (source, search, replacement, description) => {
    const next = source.replace(search, replacement);

    if (next === source) {
        throw new Error(`Could not update ${description}`);
    }

    return next;
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

const escapeMetaValue = (value) => value.replaceAll('\\', '\\\\').replaceAll('"', '\\"');

let migratedFences = 0;
const markdownFiles = await walk(PAGES_ROOT);

for (const file of markdownFiles) {
    const source = await fs.readFile(file, 'utf8');
    const migrated = source.replace(FENCE_PATTERN, (line, fence, language, rawMeta) => {
        const meta = rawMeta.trim();

        if (!language || EXPLICIT_META_PATTERN.test(meta)) {
            return line;
        }

        migratedFences += 1;
        const key = FILENAME_PATTERN.test(meta) ? 'filename' : 'title';

        return `${fence}${language} ${key}="${escapeMetaValue(meta)}"`;
    });

    if (/<fieldset>\s*<legend>[^<]+<\/legend>[\s\S]*?```/u.test(migrated)) {
        throw new Error(`Decorative fieldset remains in ${path.relative(process.cwd(), file)}`);
    }

    if (/code-example-group/u.test(migrated)) {
        throw new Error(`Temporary code example group remains in ${path.relative(process.cwd(), file)}`);
    }

    if (migrated !== source) {
        await fs.writeFile(file, migrated);
    }
}

let plugin = await fs.readFile(PLUGIN_PATH, 'utf8');

plugin = replaceRequired(
    plugin,
    '    readonly label?: string;',
    '    readonly title?: string;',
    'CodeMeta title field',
);

plugin = replaceRequired(
    plugin,
    /const isFilename = \(value: string\): boolean =>\n\s*!\/\\s\/\.test\(value\) && \/\(\?:\^\|\\\/\)\[\\w@\.\-\]\+\(\?:\\\.\[\\w\-\]\+\)\+\$\/u\.test\(value\);/u,
    `const isFilename = (value: string): boolean =>\n    /^(?!.*\\s)(?:(?:.+\\/)?[^/]+\\.[^/]+|(?:.+\\/)?(?:Dockerfile|Jenkinsfile|Makefile|Procfile))$/iu.test(\n        value,\n    );`,
    'filename detection',
);

plugin = replaceRequired(
    plugin,
    /const getExplicitCodeMeta = \(pre: Element, code: Element\): CodeMeta => \{[\s\S]*?\n\};\n\nconst getCommentCodeMeta/u,
    `const getExplicitCodeMeta = (pre: Element, code: Element): CodeMeta => {\n    const propertyFilename = pre.properties.dataFilename ?? code.properties.dataFilename;\n    const meta = getCodeMetaString(code);\n    const filenameMatch = meta.match(\n        /(?:^|\\s)(?:filename|file)=(?:\"([^\"]+)\"|'([^']+)'|([^\\s]+))/i,\n    );\n    const titleMatch = meta.match(\n        /(?:^|\\s)title=(?:\"([^\"]+)\"|'([^']+)'|([^\\s]+))/i,\n    );\n    const matchedFilename = filenameMatch?.slice(1).find(Boolean)?.trim();\n    const matchedTitle = titleMatch?.slice(1).find(Boolean)?.trim();\n    const filename =\n        typeof propertyFilename === 'string' && propertyFilename.trim()\n            ? propertyFilename.trim()\n            : matchedFilename;\n    const remainingMeta = [filenameMatch?.[0], titleMatch?.[0]]\n        .filter((value): value is string => Boolean(value))\n        .reduce((value, match) => value.replace(match, ' '), meta)\n        .replace(/\\s+/g, ' ')\n        .trim();\n    const plainMeta = unwrapQuotes(remainingMeta);\n    const fallbackFilename = !filename && isFilename(plainMeta) ? plainMeta : undefined;\n    const title = matchedTitle ?? (plainMeta && !fallbackFilename ? plainMeta : undefined);\n\n    return {\n        filename: filename ?? fallbackFilename,\n        title,\n    };\n};\n\nconst getCommentCodeMeta`,
    'explicit filename and title parsing',
);

plugin = replaceRequired(
    plugin,
    `    const label =\n        separatorIndex >= 0 ? comment.slice(0, separatorIndex).trim() : undefined;\n\n    return {\n        filename: candidate,\n        label: label || undefined,\n    };`,
    `    const title =\n        separatorIndex >= 0 ? comment.slice(0, separatorIndex).trim() : undefined;\n\n    return {\n        filename: candidate,\n        title: title || undefined,\n    };`,
    'comment metadata title',
);

plugin = replaceRequired(
    plugin,
    '    return explicit.filename || explicit.label ? explicit : getCommentCodeMeta(code);',
    '    return explicit.filename || explicit.title ? explicit : getCommentCodeMeta(code);',
    'explicit metadata fallback',
);

plugin = replaceRequired(
    plugin,
    '    const {filename, label} = code ? getCodeMeta(pre, code) : {};',
    '    const {filename, title} = code ? getCodeMeta(pre, code) : {};',
    'code figure metadata destructuring',
);

plugin = replaceRequired(
    plugin,
    `        filename && label\n            ? \`\${label} · \${filename}\`\n            : (filename ?? label ?? languageLabel);`,
    `        filename && title\n            ? \`\${title} · \${filename}\`\n            : (filename ?? title ?? languageLabel);`,
    'code figure caption',
);

await fs.writeFile(PLUGIN_PATH, plugin);
console.log(`Migrated ${migratedFences} code fences to explicit metadata.`);
