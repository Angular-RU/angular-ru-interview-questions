import type {Element, ElementContent, Root, RootContent} from 'hast';

type Node = Root | RootContent | ElementContent;
type TransformContext = {
    readonly codeGroupLabel?: string;
    readonly insideFigure?: boolean;
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

const hasDescendant = (node: Node, tagName: string): boolean => {
    if (isTag(node, tagName)) {
        return true;
    }

    return (
        'children' in node && node.children.some((child) => hasDescendant(child, tagName))
    );
};

const getCodeElement = (pre: Element): Element | undefined =>
    pre.tagName === 'pre' ? getDirectElement(pre, 'code') : undefined;

const getCodeLanguage = (code: Element): string | undefined => {
    const languageClass = getClassNames(code).find((className) =>
        className.startsWith('language-'),
    );

    return languageClass?.slice('language-'.length).toLowerCase();
};

const getCodeMeta = (code: Element): string => {
    const meta = code.data?.meta;

    return typeof meta === 'string' ? meta : '';
};

const getExplicitFilename = (pre: Element, code: Element): string | undefined => {
    const propertyFilename = pre.properties.dataFilename ?? code.properties.dataFilename;

    if (typeof propertyFilename === 'string' && propertyFilename.trim()) {
        return propertyFilename.trim();
    }

    const meta = getCodeMeta(code);
    const metaMatch = meta.match(
        /(?:^|\s)(?:filename|file|title)=(?:"([^"]+)"|'([^']+)'|([^\s]+))/i,
    );

    return metaMatch?.slice(1).find(Boolean)?.trim();
};

const getCommentFilename = (code: Element): string | undefined => {
    const firstLine = getTextContent(code).split('\n', 1)[0]?.trim();

    if (!firstLine) {
        return undefined;
    }

    const comment =
        firstLine.match(/^\/\/\s*(.+)$/)?.[1] ??
        firstLine.match(/^<!--\s*(.+?)\s*-->$/)?.[1] ??
        firstLine.match(/^\/\*\s*(.+?)\s*\*\/$/)?.[1] ??
        firstLine.match(/^#\s*(.+)$/)?.[1];

    if (!comment) {
        return undefined;
    }

    const candidate = comment.split(/:\s*/).at(-1)?.trim();

    if (!candidate || /\s/.test(candidate)) {
        return undefined;
    }

    return /(?:^|\/)[\w@.-]+(?:\.[\w-]+)+$/u.test(candidate) ? candidate : undefined;
};

const getCodeFilename = (pre: Element, code: Element): string | undefined =>
    getExplicitFilename(pre, code) ?? getCommentFilename(code);

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

const getImageCaption = (image: Element): string => {
    const title = image.properties.title;
    const alt = image.properties.alt;
    const description =
        typeof title === 'string' && title.trim()
            ? title.trim()
            : typeof alt === 'string' && alt.trim()
              ? alt.trim()
              : '';

    return !description || /^(?:img|image|picture)(?:\.\w+)?$/i.test(description)
        ? 'Иллюстрация'
        : `Иллюстрация: ${description}`;
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

const createCodeFigure = (pre: Element, groupLabel?: string): Element => {
    const code = getCodeElement(pre);
    const language = code ? getCodeLanguage(code) : undefined;
    const filename = code ? getCodeFilename(pre, code) : undefined;
    const languageLabel = language
        ? (LANGUAGE_LABELS[language] ?? language.toUpperCase())
        : undefined;
    const context =
        groupLabel && (filename || languageLabel) ? `${groupLabel} · ` : groupLabel;

    return {
        type: 'element',
        tagName: 'figure',
        properties: {
            className: ['content-figure', 'code-figure'],
        },
        children: [
            filename
                ? createCaption('Файл', `${context ?? ''}${filename}`, true)
                : createCaption('Код', `${context ?? ''}${languageLabel ?? 'пример'}`),
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
    children: [...content, createCaption(getImageCaption(image))],
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

        if (child.tagName === 'fieldset' && hasDescendant(child, 'pre')) {
            const legend = getDirectElement(child, 'legend');
            const groupLabel = legend ? getTextContent(legend).trim() : 'Примеры кода';
            const groupChildren = child.children.filter((item) => item !== legend);

            result.push({
                type: 'element',
                tagName: 'section',
                properties: {
                    ariaLabel: groupLabel,
                    className: ['code-example-group'],
                },
                children: [
                    {
                        type: 'element',
                        tagName: 'p',
                        properties: {
                            className: ['code-example-group__title'],
                        },
                        children: [{type: 'text', value: groupLabel}],
                    },
                    ...(transformChildren(groupChildren, {
                        codeGroupLabel: groupLabel,
                    }) as ElementContent[]),
                ],
            });
            continue;
        }

        const insideFigure = context.insideFigure || child.tagName === 'figure';

        if (child.tagName === 'pre' && getCodeElement(child) && !context.insideFigure) {
            result.push(createCodeFigure(child, context.codeGroupLabel));
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
                ...context,
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
