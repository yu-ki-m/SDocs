require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:promise/recommended',
        '@vue/eslint-config-prettier'
    ],
    parser: 'vue-eslint-parser',

    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-inferrable-types': 'off', // '型がリテラル値から明らかに推論できる型注釈'を削除するように促すlintを無効化
        'vue/multi-word-component-names': 'off' // コンポーネント名に複数の単語を使用するように促すlintを無効化
    },
    root: true
}
