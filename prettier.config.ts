export default {
    $schema: 'https://json.schemastore.org/prettierrc',
    arrowParens: 'always',
    bracketSpacing: false,
    endOfLine: 'lf',
    htmlWhitespaceSensitivity: 'ignore',
    printWidth: 120,
    proseWrap: 'always',
    semi: true,
    singleAttributePerLine: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    useTabs: false,
    plugins: ['prettier-plugin-astro'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
        {
            files: ['*.json'],
            options: {
                parser: 'json',
            },
        },
        {
            files: ['*.less'],
            options: {parser: 'less'},
        },
        {
            files: ['*.scss'],
            options: {parser: 'scss'},
        },
        {
            files: ['*.yml', '*.yaml'],
            options: {parser: 'yaml', tabWidth: 2},
        },
        {
            files: ['*.md'],
            options: {parser: 'markdown', tabWidth: 2},
        },
        {
            files: ['*.html'],
            options: {
                parser: 'angular',
                printWidth: 120,
            },
        },
        {
            files: ['*.{js,ts}'],
            options: {
                parser: 'typescript',
                printWidth: 90,
            },
        },
    ],
};
