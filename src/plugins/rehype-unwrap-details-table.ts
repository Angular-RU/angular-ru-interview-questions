import type {Element, ElementContent, Root, RootContent} from 'hast';

type Node = Root | RootContent | ElementContent;

const SHORT_ANSWER_TITLE = 'Короткий ответ';
const FULL_ANSWER_TITLE = 'Полный ответ';

const isElement = (node: Node): node is Element => node.type === 'element';

const isTag = (node: Node, tagName: string): node is Element =>
    isElement(node) && node.tagName === tagName;

const getElementChildren = (node: Element, tagName?: string): Element[] =>
    node.children.filter(
        (child): child is Element =>
            isElement(child) && (!tagName || child.tagName === tagName),
    );

const getSingleCellChildren = (table: Element): ElementContent[] | null => {
    const tbody = getElementChildren(table, 'tbody')[0];

    const rows = tbody
        ? getElementChildren(tbody, 'tr')
        : getElementChildren(table, 'tr');

    if (rows.length !== 1) {
        return null;
    }

    const cells = getElementChildren(rows[0], 'td');

    if (cells.length !== 1) {
        return null;
    }

    return cells[0].children;
};

const getTextContent = (node: Node): string => {
    if (node.type === 'text') {
        return node.value;
    }

    if (!('children' in node)) {
        return '';
    }

    return node.children.map((child) => getTextContent(child)).join('');
};

const isAnswerTitle = (node: ElementContent, title: string): node is Element =>
    isTag(node, 'p') && getTextContent(node).trim() === title;

const createAnswerSection = (
    className: string,
    children: ElementContent[],
): Element => ({
    type: 'element',
    tagName: 'div',
    properties: {
        className: [className],
    },
    children,
});

const splitAnswerSections = (children: ElementContent[]): ElementContent[] => {
    const shortAnswerIndex = children.findIndex((child) =>
        isAnswerTitle(child, SHORT_ANSWER_TITLE),
    );
    const fullAnswerIndex = children.findIndex(
        (child, index) =>
            index > shortAnswerIndex && isAnswerTitle(child, FULL_ANSWER_TITLE),
    );

    if (shortAnswerIndex === -1 || fullAnswerIndex === -1) {
        return children;
    }

    const shortAnswerTitle = children[shortAnswerIndex];
    const fullAnswerTitle = children[fullAnswerIndex];

    if (!isElement(shortAnswerTitle) || !isElement(fullAnswerTitle)) {
        return children;
    }

    shortAnswerTitle.properties.className = ['answer-title'];
    fullAnswerTitle.properties.className = ['answer-title'];

    return [
        ...children.slice(0, shortAnswerIndex),
        createAnswerSection(
            'answer-short',
            children.slice(shortAnswerIndex, fullAnswerIndex),
        ),
        createAnswerSection('answer-full', children.slice(fullAnswerIndex)),
    ];
};

const createSlug = (value: string): string =>
    value
        .toLocaleLowerCase('ru')
        .trim()
        .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

const createUniqueId = (baseId: string, usedIds: Set<string>): string => {
    let id = baseId;
    let suffix = 2;

    while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
    }

    usedIds.add(id);

    return id;
};

const indexSummary = (details: Element, usedIds: Set<string>): void => {
    if (details.tagName !== 'details') {
        return;
    }

    const summary = getElementChildren(details, 'summary')[0];

    if (
        !summary ||
        getElementChildren(summary).some((child) => /^h[1-6]$/.test(child.tagName))
    ) {
        return;
    }

    const question = getTextContent(summary).trim();

    if (!question) {
        return;
    }

    const explicitId =
        typeof summary.properties.id === 'string' ? summary.properties.id : '';
    const generatedId = `question-${createSlug(question) || 'untitled'}`;
    const id = explicitId || createUniqueId(generatedId, usedIds);

    if (explicitId) {
        delete summary.properties.id;
    }

    summary.children = [
        {
            type: 'element',
            tagName: 'h4',
            properties: {
                className: ['question-search-heading'],
                id,
            },
            children: summary.children,
        },
    ];
};

const unwrapDetailsTable = (details: Element): void => {
    if (details.tagName !== 'details') {
        return;
    }

    const nextChildren: ElementContent[] = [];

    for (const child of details.children) {
        if (isTag(child, 'table')) {
            const cellChildren = getSingleCellChildren(child);

            if (!cellChildren) {
                nextChildren.push(child);
                continue;
            }

            nextChildren.push({
                type: 'element',
                tagName: 'div',
                properties: {
                    className: ['answer'],
                },
                children: splitAnswerSections(cellChildren),
            });

            continue;
        }

        // optional: убираем <br> внутри details, потому что после удаления table он обычно не нужен
        if (isTag(child, 'br')) {
            continue;
        }

        nextChildren.push(child);
    }

    details.children = nextChildren;
};

const collectIds = (node: Node, usedIds: Set<string>): void => {
    if (isElement(node) && typeof node.properties.id === 'string') {
        usedIds.add(node.properties.id);
    }

    if ('children' in node) {
        node.children.forEach((child) => collectIds(child, usedIds));
    }
};

const walk = (node: Node, usedIds: Set<string>): void => {
    if (isElement(node)) {
        unwrapDetailsTable(node);
        indexSummary(node, usedIds);
    }

    if ('children' in node) {
        node.children.forEach((child) => walk(child, usedIds));
    }
};

export const rehypeUnwrapDetailsTable = () => {
    return (tree: Root): void => {
        const usedIds = new Set<string>();

        collectIds(tree, usedIds);
        walk(tree, usedIds);
    };
};
