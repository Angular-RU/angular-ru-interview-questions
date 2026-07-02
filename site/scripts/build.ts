import {copyFile, mkdir, readFile, stat, writeFile} from 'node:fs/promises';
import {relative, resolve} from 'node:path';
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

const createMarkdown = (fromOutput: string): MarkdownIt => {
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
            class: 'heading-anchor',
            ariaHidden: true,
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
                hrefAttribute[1] = normalizeMarkdownHref(hrefAttribute[1], fromOutput);
            }
        }

        return defaultRender(tokens, index, options, environment, renderer);
    };

    return md;
};

const normalizeMarkdownHref = (href: string, fromOutput: string): string => {
    if (/^(?:[a-z]+:|#|\/)/i.test(href)) {
        return href;
    }

    const [path, hash = ''] = href.split('#');
    const manifestSection = questionSections.find((section) => section.source === path);

    if (manifestSection) {
        return `${getDirectoryHref(fromOutput, manifestSection.output)}${hash ? `#${hash}` : ''}`;
    }

    if (path.startsWith('questions/') && path.endsWith('/README.md')) {
        return `${repositoryUrl}/blob/main/${path}${hash ? `#${hash}` : ''}`;
    }

    if (path.endsWith('.md')) {
        return `${repositoryUrl}/blob/main/${path}${hash ? `#${hash}` : ''}`;
    }

    return href;
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
        .replace(/\s+/g, ' ')
        .trim();
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
    const html = escapeTemplateDelimiters(
        createMarkdown(section.output).render(markdown),
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

    for (const section of questionSections) {
        const markdown = await readFile(resolve(root, section.source), 'utf8');
        const item = await renderQuestionPage(pageTemplate, section, markdown);

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
};

buildSite().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);

    console.error(`Failed to build site: ${message}`);
    process.exitCode = 1;
});
