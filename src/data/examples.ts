export type ExampleCard = {
    title: string;
    description: string;
    href: string;
    category: string;
    status: 'Ready' | 'Draft';
    tags: string[];
    order: number;
};

export const examples: ExampleCard[] = [
    {
        title: 'CSS Flexbox examples',
        description:
            'Учебные примеры по осям, выравниванию, переносам, gap и гибким колонкам во Flexbox.',
        href: '/examples/css/flexbox/',
        category: 'CSS',
        status: 'Ready',
        tags: ['Flexbox', 'Layout', 'CSS'],
        order: 10,
    },
    {
        title: 'CSS Grid examples',
        description:
            'Учебные примеры по grid tracks, areas, stacking, wrapping, auto-fit и minmax().',
        href: '/examples/css/grid/',
        category: 'CSS',
        status: 'Ready',
        tags: ['Grid', 'Layout', 'CSS'],
        order: 20,
    },
    {
        title: 'Memory leaks examples',
        description:
            'Интерактивные примеры для поиска detached DOM nodes, удержанных ссылок и setInterval leaks.',
        href: '/examples/computer-science/memory-leaks/',
        category: 'Computer Science',
        status: 'Ready',
        tags: ['Memory', 'Garbage Collection', 'DevTools'],
        order: 30,
    },
    {
        title: 'Micro Frontends: Movie Ticket',
        description:
            'Host-приложение загружает два remote-приложения через Native Federation.',
        href: '/examples/angular/mfe/movie-ticket/',
        category: 'Angular',
        status: 'Ready',
        tags: ['Micro Frontends', 'Native Federation', 'Angular'],
        order: 40,
    },
];
