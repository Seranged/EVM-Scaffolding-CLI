module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
        'no-console': 'warn',
        'no-eval': 'error',
        'import/first': 'error',
    },
};
