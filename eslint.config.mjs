import js from '@eslint/js'
import globals from 'globals'
import prettier from 'eslint-config-prettier'
import playwright from 'eslint-plugin-playwright'

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: [
      'node_modules/**',
      'dist/**',
      'playwright-report/**',
      'test-results/**',
      'allure-results/**',
      'allure-report/**',
      'coverage/**',
      '.nyc_output/**'
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      semi: ['error', 'never'],
    },
  },
  js.configs.recommended,
  {
    files: ['tests/**/*.js', '**/*.spec.js'],
    ...playwright.configs['flat/playwright-test'],
  },
  prettier,
]