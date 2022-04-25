module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        "vue/setup-compiler-macros": true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
};
