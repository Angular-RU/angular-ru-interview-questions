import type {Element, ElementContent, Root, RootContent} from 'hast';

type Node = Root | RootContent | ElementContent;

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
                children: cellChildren,
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

const walk = (node: Node): void => {
    if (isElement(node)) {
        unwrapDetailsTable(node);
    }

    if ('children' in node) {
        node.children.forEach((child) => walk(child));
    }
};

export const rehypeUnwrapDetailsTable = () => {
    return (tree: Root): void => {
        walk(tree);
    };
};
