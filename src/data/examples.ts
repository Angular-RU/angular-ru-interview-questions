export type ExampleCard = {
    title: string;
    description: string;
    href: string;
    category: string;
    tags: string[];
    order: number;
    icon: string;
};

export const examples = [
    {
        title: 'CSS Flexbox examples',
        description:
            'Учебные примеры по осям, выравниванию, переносам, gap и гибким колонкам во Flexbox.',
        href: '/css/flexbox/index.html',
        category: 'CSS',
        tags: ['Flexbox', 'Layout', 'CSS'],
        icon: '/logos/css.svg',
        order: 10,
    },
    {
        title: 'CSS Grid examples',
        description:
            'Учебные примеры по grid tracks, areas, stacking, wrapping, auto-fit и minmax().',
        href: '/css/grid/index.html',
        category: 'CSS',
        tags: ['Grid', 'Layout', 'CSS'],
        icon: '/logos/css.svg',
        order: 20,
    },
    {
        title: 'Memory leaks examples',
        description:
            'Интерактивные примеры для поиска detached DOM nodes, удержанных ссылок и setInterval leaks.',
        href: '/computer-science/index.html',
        category: 'Computer Science',
        tags: ['Memory', 'Garbage Collection', 'DevTools'],
        icon: '/logos/computer-science.svg',
        order: 30,
    },
    {
        title: 'React example 1',
        description:
            'Интерактивный React/Vite пример для подготовки к frontend-интервью.',
        href: '/react/example1/index.html',
        category: 'React',
        tags: ['React', 'Vite', 'TypeScript'],
        icon: '/logos/react.svg',
        order: 40,
    },
    {
        title: 'React example 2',
        description:
            'Интерактивный React/Vite пример с отдельной сборкой для GitHub Pages.',
        href: '/react/example2/index.html',
        category: 'React',
        tags: ['React', 'Vite', 'TypeScript'],
        icon: '/logos/react.svg',
        order: 50,
    },
    {
        title: 'Micro Frontends: Movie Ticket',
        description:
            'Host-приложение загружает два remote-приложения через Native Federation.',
        href: '/angular/mfe/movie-ticket/index.html',
        category: 'Angular',
        tags: ['Micro Frontends', 'Native Federation', 'Angular'],
        icon: '/logos/angular.svg',
        order: 60,
    },
] satisfies ExampleCard[];
