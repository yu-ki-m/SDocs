module.exports = {
    root: true,
    ignorePatterns: [
        "node_modules",
        "dist"
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    env: {
        es6: true,
        node: true,
    },
};