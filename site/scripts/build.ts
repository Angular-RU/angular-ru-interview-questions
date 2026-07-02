import {copyFile, mkdir, readFile, readdir, stat, writeFile} from 'node:fs/promises';
import {dirname, relative, resolve} from 'node:path';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import {questionSections, type QuestionSection} from '../manifest';

interface SearchIndexItem {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly category: string;
    readonly href: string;
    readonly text: string;
}

const root = resolve(import.meta.dirname, '../..');
const siteRoot = resolve(root, 'site');
const dist = resolve(root, 'dist');
const repositoryUrl = 'https://github.com/Angular-RU/angular-ru-interview-questions';
const assetDirectoryNames = new Set(['assets', 'images', 'img']);
const imageExtensions = new Set([
    '.png',
    '.jpg',
    '.jpeg',
    '.webp',
    '.gif',
    '.svg',
    '.avif',
]);
const preserveHrefPattern = /^(?:https?:\/\/|mailto:|tel:|#)/i;
const preserveImageSrcPattern = /^(?:https?:\/\/|data:)/i;

const readTemplate = async (name: string): Promise<string> =>
    readFile(resolve(siteRoot, 'templates', name), 'utf8');

const placeholderPattern = /\{\{\s*([A-Za-z][\w]*)\s*\}\}/g;

const renderTemplate = (
    template: string,
    replacements: Readonly<Record<string, string>>,
): string => {
    const rendered = template.replace(placeholderPattern, (placeholder, key: string) => {
        if (Object.hasOwn(replacements, key)) {
            return replacements[key];
        }

        return placeholder;
    });
    const unresolvedPlaceholders = Array.from(
        rendered.matchAll(placeholderPattern),
        ([placeholder]) => placeholder,
    );

    if (unresolvedPlaceholders.length > 0) {
        throw new Error(
            `Unresolved template placeholders: ${Array.from(new Set(unresolvedPlaceholders)).join(', ')}`,
        );
    }

    return rendered;
};

const escapeHtml = (value: string): string =>
    value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');

const escapeTemplateDelimiters = (value: string): string =>
    value.replaceAll('{{', '&#123;&#123;').replaceAll('}}', '&#125;&#125;');

const stripMarkdownFileExtensions = (value: string): string =>
    value.replaceAll('/README.md', '/').replace(/\.md\b/g, '');

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

const assertQuestionSourcesExist = async (): Promise<void> => {
    const missingSources: string[] = [];

    for (const section of questionSections) {
        if (!(await pathExists(resolve(root, section.source)))) {
            missingSources.push(`${section.id}: ${section.source}`);
        }
    }

    if (missingSources.length > 0) {
        throw new Error(
            `Missing question source files from site/manifest.ts:\n${missingSources.join('\n')}`,
        );
    }
};

const toPosixPath = (path: string): string => path.replaceAll('\\', '/');

const isParentRelativePath = (path: string): boolean =>
    path === '..' || path.startsWith('../');

const hasHiddenPathSegment = (path: string): boolean =>
    toPosixPath(path)
        .split('/')
        .some((segment) => segment.startsWith('.'));

const getPathExtension = (path: string): string => {
    const name = path.split('/').at(-1) ?? '';
    const dotIndex = name.lastIndexOf('.');

    return dotIndex >= 0 ? name.slice(dotIndex).toLowerCase() : '';
};

const isSupportedImagePath = (path: string): boolean =>
    imageExtensions.has(getPathExtension(path));

const splitResourceReference = (
    reference: string,
): {readonly path: string; readonly suffix: string} => {
    const separatorIndex = reference.search(/[?#]/);

    if (separatorIndex < 0) {
        return {path: reference, suffix: ''};
    }

    return {
        path: reference.slice(0, separatorIndex),
        suffix: reference.slice(separatorIndex),
    };
};

const getSectionSourceDir = (section: QuestionSection): string =>
    resolve(root, dirname(section.source));

const getSectionOutputDir = (section: QuestionSection): string =>
    resolve(dist, dirname(section.output));

const getRelativeHref = (fromOutput: string, targetOutput: string): string => {
    const fromDirectory = resolve(dist, fromOutput, '..');
    const target = resolve(dist, targetOutput);
    const relativePath = toPosixPath(relative(fromDirectory, target));

    return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
};

const getDirectoryHref = (fromOutput: string, targetOutput: string): string => {
    const href = getRelativeHref(fromOutput, targetOutput);

    return href.endsWith('/index.html') ? href.slice(0, -'index.html'.length) : href;
};

const getAssetHref = (fromOutput: string, assetOutput: string): string =>
    getRelativeHref(fromOutput, assetOutput);

const createMarkdown = (section: QuestionSection): MarkdownIt => {
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: (code, language) => {
            const canHighlight = language && hljs.getLanguage(language);
            const highlighted = canHighlight
                ? hljs.highlight(code, {language, ignoreIllegals: true}).value
                : hljs.highlightAuto(code).value;

            return `<pre><code class="hljs language-${escapeHtml(language || 'text')}">${highlighted}</code></pre>`;
        },
    }).use(anchor, {
        permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            placement: 'after',
            class: 'header-anchor',
            ariaHidden: false,
        }),
    });

    const defaultRender =
        md.renderer.rules.link_open ??
        ((tokens, index, options, _environment, renderer) =>
            renderer.renderToken(tokens, index, options));

    md.renderer.rules.link_open = (tokens, index, options, environment, renderer) => {
        const token = tokens[index];
        const hrefIndex = token.attrIndex('href');

        if (hrefIndex >= 0) {
            const hrefAttribute = token.attrs?.[hrefIndex];

            if (hrefAttribute) {
                hrefAttribute[1] = normalizeMarkdownHref(hrefAttribute[1], section);
            }
        }

        return defaultRender(tokens, index, options, environment, renderer);
    };

    const defaultImageRender =
        md.renderer.rules.image ??
        ((tokens, index, options, _environment, renderer) =>
            renderer.renderToken(tokens, index, options));

    md.renderer.rules.image = (tokens, index, options, environment, renderer) => {
        const token = tokens[index];
        const srcIndex = token.attrIndex('src');

        if (srcIndex >= 0) {
            const srcAttribute = token.attrs?.[srcIndex];

            if (srcAttribute) {
                srcAttribute[1] = normalizeMarkdownImageSrc(srcAttribute[1], section);
            }
        }

        return defaultImageRender(tokens, index, options, environment, renderer);
    };

    return md;
};

const resolveMarkdownPath = (path: string, source: string): string =>
    toPosixPath(relative(root, resolve(root, dirname(source), path)));

const getRepositoryMarkdownHref = (
    path: string,
    source: string,
    hash: string,
): string => {
    const resolvedPath = resolveMarkdownPath(path, source);
    const pathWithoutParentSegments = toPosixPath(path).replace(/^(\.\.\/)+/, '');
    const repositoryPath = pathWithoutParentSegments.startsWith('examples/')
        ? pathWithoutParentSegments
        : resolvedPath;
    const normalizedRepositoryPath = stripMarkdownFileExtensions(repositoryPath);
    const repositoryPage = path.endsWith('README.md') ? 'tree' : 'blob';

    return `${repositoryUrl}/${repositoryPage}/main/${normalizedRepositoryPath}${hash ? `#${hash}` : ''}`;
};

const findQuestionSectionByReadmePath = (
    path: string,
    source: string,
): QuestionSection | undefined => {
    const resolvedPath = resolveMarkdownPath(path, source);
    const sourceMatch = questionSections.find(
        (section) => section.source === resolvedPath || section.source === path,
    );

    if (sourceMatch) {
        return sourceMatch;
    }

    const normalizedPath = toPosixPath(path);
    const pathWithoutParentSegments = normalizedPath.replace(/^(\.\.\/)+/, '');
    const readmeSectionId =
        pathWithoutParentSegments.match(/^([^/]+)\/README\.md$/)?.[1] ??
        normalizedPath.match(/(?:^|\/)questions\/([^/]+)\/README\.md$/)?.[1];

    return questionSections.find((section) => section.id === readmeSectionId);
};

const normalizeMarkdownHref = (href: string, section: QuestionSection): string => {
    if (preserveHrefPattern.test(href)) {
        return href;
    }

    const [path, hash = ''] = href.split('#');
    const manifestSection = path.endsWith('README.md')
        ? findQuestionSectionByReadmePath(path, section.source)
        : undefined;

    if (manifestSection) {
        return `${getDirectoryHref(section.output, manifestSection.output)}${hash ? `#${hash}` : ''}`;
    }

    if (path.endsWith('.md')) {
        return getRepositoryMarkdownHref(path, section.source, hash);
    }

    return href;
};

const normalizeMarkdownImageSrc = (src: string, section: QuestionSection): string => {
    if (preserveImageSrcPattern.test(src)) {
        return src;
    }

    const {path, suffix} = splitResourceReference(src);

    if (!path || path.startsWith('/')) {
        return src;
    }

    const sourceDir = getSectionSourceDir(section);
    const resolvedPath = resolve(sourceDir, path);
    const sectionRelativePath = toPosixPath(relative(sourceDir, resolvedPath));

    if (isParentRelativePath(sectionRelativePath)) {
        throw new Error(
            `Unsupported image outside section folder:\n${section.source} references ${src}\nPlease move the asset into ${dirname(section.source)}/assets/`,
        );
    }

    return `./${sectionRelativePath.replace(/^\.\//, '')}${suffix}`;
};

const extractPlainText = (markdown: string): string => {
    const tokens = new MarkdownIt({html: false}).parse(markdown, {});
    const text = tokens
        .flatMap((token) => {
            if (token.type === 'inline' && token.children) {
                return token.children
                    .filter(
                        (child) => child.type === 'text' || child.type === 'code_inline',
                    )
                    .map((child) => child.content);
            }

            return token.type === 'fence' || token.type === 'code_block'
                ? [token.content]
                : [];
        })
        .join(' ');

    return text
        .replace(/<[^>]*>/g, ' ')
        .replaceAll('{{', '{ {')
        .replaceAll('}}', '} }')
        .replace(/\.md\b/g, '')
        .replace(/\s+/g, ' ')
        .trim();
};

const shouldCopyAsset = (relativePath: string): boolean => {
    if (hasHiddenPathSegment(relativePath) || !isSupportedImagePath(relativePath)) {
        return false;
    }

    const segments = toPosixPath(relativePath).split('/');

    return segments.length === 1 || assetDirectoryNames.has(segments[0]);
};

const collectSectionAssetPaths = async (
    directory: string,
    baseDirectory: string,
): Promise<string[]> => {
    const entries = await readdir(directory, {withFileTypes: true});
    const assetPaths: string[] = [];

    for (const entry of entries) {
        const path = resolve(directory, entry.name);
        const relativePath = toPosixPath(relative(baseDirectory, path));

        if (entry.name.startsWith('.')) {
            continue;
        }

        if (entry.isDirectory()) {
            assetPaths.push(...(await collectSectionAssetPaths(path, baseDirectory)));

            continue;
        }

        if (entry.isFile() && shouldCopyAsset(relativePath)) {
            assetPaths.push(relativePath);
        }
    }

    return assetPaths;
};

const copySectionAssets = async (section: QuestionSection): Promise<void> => {
    const sourceDir = getSectionSourceDir(section);
    const outputDir = getSectionOutputDir(section);
    const assetPaths = await collectSectionAssetPaths(sourceDir, sourceDir);

    for (const assetPath of assetPaths) {
        const source = resolve(sourceDir, assetPath);
        const target = resolve(outputDir, assetPath);

        await mkdir(dirname(target), {recursive: true});
        await copyFile(source, target);
    }
};

const isExternalResource = (reference: string): boolean =>
    /^(?:https?:\/\/|mailto:|tel:|data:)/i.test(reference);

const isLocalSiteHref = (href: string): boolean =>
    !isExternalResource(href) && !href.startsWith('#') && href.trim() !== '';

const getLocalTargetPath = (htmlPath: string, reference: string): string => {
    const {path} = splitResourceReference(reference);

    return path.endsWith('/')
        ? resolve(dirname(htmlPath), path, 'index.html')
        : resolve(dirname(htmlPath), path);
};

const extractAttributeValues = (html: string, attribute: string): string[] => {
    const pattern = new RegExp(
        `<[^>]+\\s${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
        'gi',
    );

    return Array.from(
        html.matchAll(pattern),
        (match) => match[1] ?? match[2] ?? match[3],
    );
};

const assertGeneratedHtmlIsValid = async (outputs: readonly string[]): Promise<void> => {
    const errors: string[] = [];

    for (const output of outputs) {
        const htmlPath = resolve(dist, output);
        const html = await readFile(htmlPath, 'utf8');
        const displayPath = toPosixPath(relative(root, htmlPath));

        const unresolvedPlaceholders = Array.from(
            html.matchAll(placeholderPattern),
            ([placeholder]) => placeholder,
        );

        if (unresolvedPlaceholders.length > 0) {
            errors.push(
                `Unresolved template placeholders in ${displayPath}: ${Array.from(new Set(unresolvedPlaceholders)).join(', ')}`,
            );
        }

        if (html.includes('.md')) {
            errors.push(`Markdown source reference remains in ${displayPath}`);
        }

        for (const src of extractAttributeValues(html, 'src')) {
            if (isExternalResource(src) || src.startsWith('#')) {
                continue;
            }

            const target = getLocalTargetPath(htmlPath, src);

            if (!(await pathExists(target))) {
                errors.push(
                    `Broken image in ${displayPath}:\n${src} -> ${toPosixPath(relative(root, target))} does not exist`,
                );
            }
        }

        for (const href of extractAttributeValues(html, 'href')) {
            if (!isLocalSiteHref(href) || href.includes('/examples/')) {
                continue;
            }

            if (href.includes('.md')) {
                errors.push(`Markdown link remains in ${displayPath}: ${href}`);
                continue;
            }

            const target = getLocalTargetPath(htmlPath, href);

            if (!(await pathExists(target))) {
                errors.push(
                    `Broken link in ${displayPath}:\n${href} -> ${toPosixPath(relative(root, target))} does not exist`,
                );
            }
        }
    }

    if (errors.length > 0) {
        throw new Error(errors.join('\n\n'));
    }
};

const writeHtml = async (output: string, content: string): Promise<void> => {
    const target = resolve(dist, output);

    await mkdir(resolve(target, '..'), {recursive: true});
    await writeFile(target, content);
};

const renderQuestionPage = async (
    template: string,
    section: QuestionSection,
    markdown: string,
): Promise<SearchIndexItem> => {
    const html = stripMarkdownFileExtensions(
        escapeTemplateDelimiters(createMarkdown(section).render(markdown)),
    );
    const content = renderTemplate(template, {
        title: escapeHtml(`${section.title} | Angular RU Interview Questions`),
        description: escapeHtml(section.description),
        category: escapeHtml(section.category),
        content: html,
        stylesHref: getAssetHref(section.output, 'styles.css'),
        homeHref: getDirectoryHref(section.output, 'index.html'),
        questionsHref: getDirectoryHref(section.output, 'questions/index.html'),
        examplesHref: getDirectoryHref(section.output, 'examples/index.html'),
    });

    await writeHtml(section.output, content);

    return {
        id: section.id,
        title: section.title,
        description: section.description,
        category: section.category,
        href: section.href,
        text: extractPlainText(markdown),
    };
};

const groupSectionsByCategory = (): Map<string, readonly QuestionSection[]> => {
    const groups = new Map<string, QuestionSection[]>();

    for (const section of questionSections) {
        groups.set(section.category, [...(groups.get(section.category) ?? []), section]);
    }

    return groups;
};

const renderQuestionCards = (): string =>
    Array.from(groupSectionsByCategory())
        .map(([category, sections]) => {
            const cards = sections
                .map(
                    (section) => `
                <a class="card" href="${escapeHtml(section.href.replace('./questions/', './'))}">
                    <span class="card-category">${escapeHtml(section.category)}</span>
                    <h3>${escapeHtml(section.title)}</h3>
                    <p>${escapeHtml(section.description)}</p>
                </a>`,
                )
                .join('');

            return `
            <section class="category-section">
                <h2>${escapeHtml(category)}</h2>
                <div class="cards">
                    ${cards}
                </div>
            </section>`;
        })
        .join('');

const buildSite = async (): Promise<void> => {
    await assertQuestionSourcesExist();
    await mkdir(dist, {recursive: true});

    const [pageTemplate, questionsIndexTemplate, homeTemplate] = await Promise.all([
        readTemplate('page.html'),
        readTemplate('questions-index.html'),
        readTemplate('home.html'),
    ]);

    const searchIndex: SearchIndexItem[] = [];
    const generatedHtmlOutputs = ['index.html', 'questions/index.html'];

    for (const section of questionSections) {
        const markdown = await readFile(resolve(root, section.source), 'utf8');
        const item = await renderQuestionPage(pageTemplate, section, markdown);

        await copySectionAssets(section);
        generatedHtmlOutputs.push(section.output);
        searchIndex.push(item);
    }

    await writeHtml(
        'questions/index.html',
        renderTemplate(questionsIndexTemplate, {
            content: renderQuestionCards(),
            stylesHref: getAssetHref('questions/index.html', 'styles.css'),
            homeHref: getDirectoryHref('questions/index.html', 'index.html'),
            examplesHref: getDirectoryHref('questions/index.html', 'examples/index.html'),
        }),
    );
    await writeHtml(
        'index.html',
        renderTemplate(homeTemplate, {
            title: 'Angular RU Interview Questions',
            description:
                'Вопросы, ответы и runnable-примеры для подготовки к frontend-собеседованиям.',
            stylesheet: './styles.css',
            stylesHref: './styles.css',
            questionsHref: './questions/',
            examplesHref: './examples/',
            repositoryHref: repositoryUrl,
        }),
    );
    await writeFile(
        resolve(dist, 'search-index.json'),
        `${JSON.stringify(searchIndex, null, 4)}\n`,
    );
    await copyFile(resolve(siteRoot, 'styles.css'), resolve(dist, 'styles.css'));
    await assertGeneratedHtmlIsValid(generatedHtmlOutputs);
};

buildSite().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);

    console.error(`Failed to build site: ${message}`);
    process.exitCode = 1;
});
