export type DemoStatus = 'Ready' | 'Draft';

export type DemoType = 'static' | 'vite' | 'angular' | 'group';

export type DemoCategory =
    | 'Angular'
    | 'React'
    | 'CSS'
    | 'JavaScript'
    | 'Web Platform'
    | 'Computer Science';

export interface BaseDemo {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly category: DemoCategory;
    readonly tags: readonly string[];
    readonly status: DemoStatus;
    readonly href: string;
}

export interface StaticDemo extends BaseDemo {
    readonly type: 'static';
    readonly source: string;
    readonly output: string;
}

export interface ViteDemo extends BaseDemo {
    readonly type: 'vite';
    readonly workspace: string;
    readonly source: string;
    readonly dist: string;
    readonly output: string;
    readonly base: string;
}

export interface AngularDemo extends BaseDemo {
    readonly type: 'angular';
    readonly workspace: string;
    readonly source: string;
    readonly dist: string;
    readonly output: string;
    readonly configuration?: string;
}

export interface DemoGroup extends BaseDemo {
    readonly type: 'group';
    readonly apps: ReadonlyArray<StaticDemo | ViteDemo | AngularDemo>;
}

export type Demo = StaticDemo | ViteDemo | AngularDemo | DemoGroup;

export const demos = [
    {
        id: 'css-flexbox',
        type: 'static',
        title: 'CSS Flexbox examples',
        description:
            'Учебные примеры по осям, выравниванию, переносам, gap и гибким колонкам во Flexbox.',
        category: 'CSS',
        tags: ['Flexbox', 'Layout', 'CSS'],
        status: 'Ready',
        href: './css/flexbox/',
        source: 'examples/css/flexbox',
        output: 'css/flexbox',
    },
    {
        id: 'css-grid',
        type: 'static',
        title: 'CSS Grid examples',
        description:
            'Учебные примеры по grid tracks, areas, stacking, wrapping, auto-fit и minmax().',
        category: 'CSS',
        tags: ['Grid', 'Layout', 'CSS'],
        status: 'Ready',
        href: './css/grid/',
        source: 'examples/css/grid',
        output: 'css/grid',
    },
    {
        id: 'computer-science-memory-leaks',
        type: 'static',
        title: 'Memory leaks examples',
        description:
            'Интерактивные примеры для поиска detached DOM nodes, удержанных ссылок и setInterval leaks.',
        category: 'Computer Science',
        tags: ['Memory', 'Garbage Collection', 'DevTools'],
        status: 'Ready',
        href: './computer-science/',
        source: 'examples/computer-science',
        output: 'computer-science',
    },
    {
        id: 'react-example1',
        type: 'vite',
        title: 'React example 1',
        description:
            'Интерактивный React/Vite пример для подготовки к frontend-интервью.',
        category: 'React',
        tags: ['React', 'Vite', 'TypeScript'],
        status: 'Ready',
        href: './react/example1/',
        workspace: 'example1',
        source: 'examples/react/example1',
        dist: 'examples/react/example1/dist',
        output: 'react/example1',
        base: '/demos/react/example1/',
    },
    {
        id: 'react-example2',
        type: 'vite',
        title: 'React example 2',
        description:
            'Интерактивный React/Vite пример с отдельной сборкой для GitHub Pages.',
        category: 'React',
        tags: ['React', 'Vite', 'TypeScript'],
        status: 'Ready',
        href: './react/example2/',
        workspace: 'example2',
        source: 'examples/react/example2',
        dist: 'examples/react/example2/dist',
        output: 'react/example2',
        base: '/demos/react/example2/',
    },
    {
        id: 'angular-mfe-movie-ticket',
        type: 'group',
        title: 'Micro Frontends: Movie Ticket',
        description:
            'Host-приложение загружает два remote-приложения через Native Federation.',
        category: 'Angular',
        tags: ['Micro Frontends', 'Native Federation', 'Angular'],
        status: 'Ready',
        href: './mfe/movie-ticket/',
        apps: [
            {
                id: 'angular-mfe-movies',
                type: 'angular',
                title: 'Movies remote',
                description: 'Remote-приложение со списком фильмов для MFE демо.',
                category: 'Angular',
                tags: ['Micro Frontends', 'Native Federation', 'Angular'],
                status: 'Ready',
                href: './mfe/movies/',
                workspace: 'movies',
                source: 'examples/angular/mfe/movies',
                dist: 'examples/angular/mfe/movies/dist/pages',
                output: 'mfe/movies',
                configuration: 'pages',
            },
            {
                id: 'angular-mfe-ticket-availability',
                type: 'angular',
                title: 'Ticket Availability remote',
                description: 'Remote-приложение с доступностью билетов для MFE демо.',
                category: 'Angular',
                tags: ['Micro Frontends', 'Native Federation', 'Angular'],
                status: 'Ready',
                href: './mfe/ticket-availability/',
                workspace: 'ticket-availability',
                source: 'examples/angular/mfe/ticket-availability',
                dist: 'examples/angular/mfe/ticket-availability/dist/pages',
                output: 'mfe/ticket-availability',
                configuration: 'pages',
            },
            {
                id: 'angular-mfe-movie-ticket-host',
                type: 'angular',
                title: 'Movie Ticket host',
                description: 'Host-приложение для публичного MFE демо.',
                category: 'Angular',
                tags: ['Micro Frontends', 'Native Federation', 'Angular'],
                status: 'Ready',
                href: './mfe/movie-ticket/',
                workspace: 'movie-ticket',
                source: 'examples/angular/mfe/movie-ticket',
                dist: 'examples/angular/mfe/movie-ticket/dist/pages',
                output: 'mfe/movie-ticket',
                configuration: 'pages',
            },
        ],
    },
] satisfies readonly Demo[];
