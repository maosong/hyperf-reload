module.exports = {
  extends: ['airbnb', 'prettier', 'plugin:eslint-comments/recommended'],
  plugins: ['prettier', 'eslint-comments'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'no-console': 0,
    'generator-star-spacing': 0,
    'function-paren-newline': 0,
    'arrow-body-style': ['error', 'as-needed'],
    // 'arrow-parens': 1,
    'object-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    'no-param-reassign': 1,
    'space-before-function-paren': 0,
    'linebreak-style': 0,
    'no-prototype-builtins': 'off',
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }],

    'import/order': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-default-export': [0, 'camel-case'],
    'import/no-cycle': 0,

    'eslint-comments/no-unlimited-disable': 'error',

    'prettier/prettier': 'error',
  },
  settings: {
    // support import modules from TypeScript files in JavaScript files
    'import/resolver': { node: { extensions: ['.js'] } },
    polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
  },
};
