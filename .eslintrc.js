module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'indent': ['error', 2, { SwitchCase: 1 }],
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': 'error',
    'comma-spacing': ["error", { before: false, after: true }],
    'semi': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    'no-trailing-spaces': 2,
    'curly': ['error', 'all'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['error', { code: 80 }],
    'quote-props': ['error', 'consistent-as-needed'],
    'linebreak-style': ['error', 'unix'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': ['error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['let', 'const'], next: '*' },
      { blankLine: 'any', prev: ['let', 'const'], next: ['let', 'const'] },
      { blankLine: 'always', prev: ['if'], next: ['*'] },
      { blankLine: 'always', prev: ['*'], next: ['if'] },
    ],

    'vue/html-indent': ['error', 2],
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/max-attributes-per-line': ['error', {
      singleline: 1,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always',
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'never',
    }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
