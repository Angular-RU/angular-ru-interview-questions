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
        title: 'CSS Flexbox',
        description:
            'Учебные примеры по осям, выравниванию, переносам, gap и гибким колонкам во Flexbox.',
        href: '/examples/css/flexbox/index.html',
        category: 'CSS',
        tags: ['Flexbox', 'Layout', 'CSS'],
        icon: '/logos/css.svg',
        order: 10,
    },
    {
        title: 'CSS Grid',
        description:
            'Учебные примеры по grid tracks, areas, stacking, wrapping, auto-fit и minmax().',
        href: '/examples/css/grid/index.html',
        category: 'CSS',
        tags: ['Grid', 'Layout', 'CSS'],
        icon: '/logos/css.svg',
        order: 20,
    },
    {
        title: 'Memory leaks',
        description:
            'Интерактивные примеры для поиска detached DOM nodes, удержанных ссылок и setInterval leaks.',
        href: '/examples/computer-science/index.html',
        category: 'JavaScript',
        tags: ['Memory', 'Garbage Collection', 'DevTools'],
        icon: '/logos/javascript.svg',
        order: 30,
    },
    {
        title: 'React Hello',
        description:
            'Минимальный React/Vite пример с компонентом Hello и передачей props.',
        href: '/examples/react/example1/index.html',
        category: 'React',
        tags: ['React', 'Vite', 'TypeScript'],
        icon: '/logos/react.svg',
        order: 40,
    },
    {
        title: 'React counter',
        description:
            'Интерактивный React/Vite пример со счетчиком и локальным состоянием.',
        href: '/examples/react/example2/index.html',
        category: 'React',
        tags: ['React', 'Vite', 'TypeScript'],
        icon: '/logos/react.svg',
        order: 50,
    },
    {
        title: 'Micro Frontends',
        description:
            'Host-приложение загружает два remote-приложения через Native Federation.',
        href: '/examples/angular/mfe/movie-ticket/index.html',
        category: 'Angular',
        tags: ['Micro Frontends', 'Native Federation', 'Angular'],
        icon: '/logos/angular.svg',
        order: 60,
    },
] satisfies ExampleCard[];
