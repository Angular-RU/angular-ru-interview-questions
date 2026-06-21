module.exports = {
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
    overrides: [
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
                attributeGroups: [
                    '$ANGULAR_STRUCTURAL_DIRECTIVE',
                    '$ANGULAR_ELEMENT_REF',
                    '$ID',
                    '$DEFAULT',
                    '$CLASS',
                    '$ANGULAR_ANIMATION',
                    '$ANGULAR_ANIMATION_INPUT',
                    '$ANGULAR_INPUT',
                    '$ANGULAR_TWO_WAY_BINDING',
                    '$ANGULAR_OUTPUT',
                ],
                attributeSort: 'ASC',
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
