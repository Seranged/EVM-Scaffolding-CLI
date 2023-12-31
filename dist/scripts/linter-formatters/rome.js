export const romeConfig = {
    $schema: 'https://docs.rome.tools/schemas/12.1.0/schema.json',
    organizeImports: {
        enabled: false,
    },
    linter: {
        ignore: ['.github/*', '.next/*', '/node_modules'],
        enabled: true,
        rules: {
            recommended: true,
            style: {
                noParameterAssign: 'off',
                useSelfClosingElements: 'off',
            },
            a11y: {
                noSvgWithoutTitle: 'off',
            },
        },
    },
    formatter: {
        ignore: ['.github/*', '.next/*', '/node_modules'],
        enabled: true,
        formatWithErrors: false,
        indentStyle: 'space',
        indentSize: 2,
        lineWidth: 120,
    },
    javascript: {
        formatter: {
            semicolons: 'asNeeded',
            quoteStyle: 'single',
        },
    },
};
