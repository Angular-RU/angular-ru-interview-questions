import type {Element, ElementContent, Root, RootContent} from 'hast';

type Node = Root | RootContent | ElementContent;
type TransformContext = {
    readonly insideFigure?: boolean;
};
type CodeMeta = {
    readonly filename?: string;
    readonly title?: string;
};

const LANGUAGE_LABELS: Readonly<Record<string, string>> = {
    bash: 'Shell',
    css: 'CSS',
    dockerfile: 'Dockerfile',
    graphql: 'GraphQL',
    html: 'HTML',
    java: 'Java',
    javascript: 'JavaScript',
    js: 'JavaScript',
    json: 'JSON',
    jsx: 'JSX',
    nginx: 'nginx',
    powershell: 'PowerShell',
    scss: 'SCSS',
    sh: 'Shell',
    shell: 'Shell',
    sql: 'SQL',
    text: 'Текст',
    ts: 'TypeScript',
    tsx: 'TSX',
    typescript: 'TypeScript',
    xml: 'XML',
    yaml: 'YAML',
    yml: 'YAML',
};

const isElement = (node: Node): node is Element => node.type === 'element';

const isTag = (node: Node, tagName: string): node is Element =>
    isElement(node) && node.tagName === tagName;

const isWhitespace = (node: Node): boolean => node.type === 'text' && !node.value.trim();

const getTextContent = (node: Node): string => {
    if (node.type === 'text') {
        return node.value;
    }

    if (!('children' in node)) {
        return '';
    }

    return node.children.map((child) => getTextContent(child)).join('');
};

const getClassNames = (element: Element): string[] => {
    const className = element.properties.className;

    if (Array.isArray(className)) {
        return className.map(String);
    }

    return typeof className === 'string' ? className.split(/\s+/).filter(Boolean) : [];
};

const getDirectElement = (element: Element, tagName: string): Element | undefined =>
    element.children.find((child): child is Element => isTag(child, tagName));

const getCodeElement = (pre: Element): Element | undefined =>
    pre.tagName === 'pre' ? getDirectElement(pre, 'code') : undefined;

const getCodeLanguage = (code: Element): string | undefined => {
    const languageClass = getClassNames(code).find((className) =>
        className.startsWith('language-'),
    );

    return languageClass?.slice('language-'.length).toLowerCase();
};

const getCodeMetaString = (code: Element): string => {
    const meta = code.data?.meta;

    return typeof meta === 'string' ? meta.trim() : '';
};

const unwrapQuotes = (value: string): string => {
    const trimmed = value.trim();
    const first = trimmed.at(0);
    const last = trimmed.at(-1);

    return trimmed.length >= 2 && first === last && (first === '"' || first === "'")
        ? trimmed.slice(1, -1).trim()
        : trimmed;
};

const isFilename = (value: string): boolean =>
    /^(?!.*\s)(?:(?:.+\/)?[^/]+\.[^/]+|(?:.+\/)?(?:Dockerfile|Jenkinsfile|Makefile|Procfile))$/iu.test(
        value,
    );

const getExplicitCodeMeta = (pre: Element, code: Element): CodeMeta => {
    const propertyFilename = pre.properties.dataFilename ?? code.properties.dataFilename;
    const meta = getCodeMetaString(code);
    const filenameMatch = meta.match(
        /(?:^|\s)(?:filename|file)=(?:"([^"]+)"|'([^']+)'|([^\s]+))/i,
    );
    const titleMatch = meta.match(/(?:^|\s)title=(?:"([^"]+)"|'([^']+)'|([^\s]+))/i);
    const matchedFilename = filenameMatch?.slice(1).find(Boolean)?.trim();
    const matchedTitle = titleMatch?.slice(1).find(Boolean)?.trim();
    const filename =
        typeof propertyFilename === 'string' && propertyFilename.trim()
            ? propertyFilename.trim()
            : matchedFilename;
    const remainingMeta = [filenameMatch?.[0], titleMatch?.[0]]
        .filter((value): value is string => Boolean(value))
        .reduce((value, match) => value.replace(match, ' '), meta)
        .replace(/\s+/g, ' ')
        .trim();
    const plainMeta = unwrapQuotes(remainingMeta);
    const fallbackFilename = !filename && isFilename(plainMeta) ? plainMeta : undefined;
    const title =
        matchedTitle ?? (plainMeta && !fallbackFilename ? plainMeta : undefined);

    return {
        filename: filename ?? fallbackFilename,
        title,
    };
};

const getCommentCodeMeta = (code: Element): CodeMeta => {
    const firstLine = getTextContent(code).split('\n', 1)[0]?.trim();

    if (!firstLine) {
        return {};
    }

    const comment =
        firstLine.match(/^\/\/\s*(.+)$/)?.[1] ??
        firstLine.match(/^<!--\s*(.+?)\s*-->$/)?.[1] ??
        firstLine.match(/^\/\*\s*(.+?)\s*\*\/$/)?.[1] ??
        firstLine.match(/^#\s*(.+)$/)?.[1];

    if (!comment) {
        return {};
    }

    const separatorIndex = comment.lastIndexOf(':');
    const candidate = (
        separatorIndex >= 0 ? comment.slice(separatorIndex + 1) : comment
    ).trim();

    if (!isFilename(candidate)) {
        return {};
    }

    const title =
        separatorIndex >= 0 ? comment.slice(0, separatorIndex).trim() : undefined;

    return {
        filename: candidate,
        title: title || undefined,
    };
};

const getCodeMeta = (pre: Element, code: Element): CodeMeta => {
    const explicit = getExplicitCodeMeta(pre, code);

    return explicit.filename || explicit.title ? explicit : getCommentCodeMeta(code);
};

const getImageFromContent = (content: readonly Node[]): Element | undefined => {
    const meaningful = content.filter((child) => !isWhitespace(child));

    if (meaningful.length !== 1 || !isElement(meaningful[0])) {
        return undefined;
    }

    const onlyChild = meaningful[0];

    if (onlyChild.tagName === 'img') {
        return onlyChild;
    }

    if (onlyChild.tagName !== 'a') {
        return undefined;
    }

    const linkedContent = onlyChild.children.filter((child) => !isWhitespace(child));

    return linkedContent.length === 1 && isTag(linkedContent[0], 'img')
        ? linkedContent[0]
        : undefined;
};

const getImageDescription = (image: Element): string | undefined => {
    const title = image.properties.title;
    const alt = image.properties.alt;
    const description =
        typeof title === 'string' && title.trim()
            ? title.trim()
            : typeof alt === 'string' && alt.trim()
              ? alt.trim()
              : '';

    return !description || /^(?:img|image|picture)(?:\.\w+)?$/i.test(description)
        ? undefined
        : description;
};

const createCaption = (label: string, value?: string, valueAsCode = false): Element => ({
    type: 'element',
    tagName: 'figcaption',
    properties: {
        className: ['content-figure__caption'],
    },
    children: [
        {
            type: 'element',
            tagName: 'span',
            properties: {
                className: ['content-figure__kind'],
            },
            children: [{type: 'text', value: label}],
        },
        ...(value
            ? [
                  {
                      type: 'element' as const,
                      tagName: valueAsCode ? 'code' : 'span',
                      properties: {
                          className: ['content-figure__value'],
                      },
                      children: [{type: 'text' as const, value}],
                  },
              ]
            : []),
    ],
});

const createCodeFigure = (pre: Element): Element => {
    const code = getCodeElement(pre);
    const language = code ? getCodeLanguage(code) : undefined;
    const {filename, title} = code ? getCodeMeta(pre, code) : {};
    const languageLabel = language
        ? (LANGUAGE_LABELS[language] ?? language.toUpperCase())
        : 'пример';
    const captionValue =
        filename && title
            ? `${title} · ${filename}`
            : (filename ?? title ?? languageLabel);

    return {
        type: 'element',
        tagName: 'figure',
        properties: {
            className: ['content-figure', 'code-figure'],
        },
        children: [
            filename
                ? createCaption('Файл', captionValue, true)
                : createCaption('Код', captionValue),
            pre,
        ],
    };
};

const createImageFigure = (content: ElementContent[], image: Element): Element => ({
    type: 'element',
    tagName: 'figure',
    properties: {
        className: ['content-figure', 'image-figure'],
    },
    children: [...content, createCaption('Иллюстрация', getImageDescription(image))],
});

const transformChildren = (
    children: readonly Node[],
    context: TransformContext = {},
): Node[] => {
    const result: Node[] = [];

    for (const child of children) {
        if (!isElement(child)) {
            result.push(child);
            continue;
        }

        const insideFigure = context.insideFigure || child.tagName === 'figure';

        if (child.tagName === 'pre' && getCodeElement(child) && !context.insideFigure) {
            result.push(createCodeFigure(child));
            continue;
        }

        if (child.tagName === 'p' && !context.insideFigure) {
            const image = getImageFromContent(child.children);

            if (image) {
                result.push(createImageFigure(child.children, image));
                continue;
            }
        }

        if ('children' in child) {
            child.children = transformChildren(child.children, {
                insideFigure,
            }) as ElementContent[];
        }

        result.push(child);
    }

    return result;
};

export const rehypeContentFigures = () => {
    return (tree: Root): void => {
        tree.children = transformChildren(tree.children) as RootContent[];
    };
};
