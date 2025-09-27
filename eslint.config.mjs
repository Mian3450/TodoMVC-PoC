import js from '@eslint/js'
import globals from 'globals'
import prettier from 'eslint-plugin-prettier'
import playwright from 'eslint-plugin-playwright'
import eslintConfigPrettier from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      js,
      prettier,
    },

    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended',
      eslintConfigPrettier,
    ],

    rules: {
      'prettier/prettier': ['error', { semi: false }],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      semi: ['error', 'never'],
    },
  },
  {
    files: ['tests/**/*.js'],
    plugins: { playwright },
    extends: ['plugin:playwright/playwright-test'],
    rules: {
      'prettier/prettier': ['error', { semi: false }],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      semi: ['error', 'never'],
    },
  },
])
