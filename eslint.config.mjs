import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  { ignores: ['out/', 'dist/', '.features-gen/', 'node_modules/', 'storybook-static/'] },

  // Plain JS recommended for any .js (e.g. this config file).
  js.configs.recommended,

  // Type-aware linting for all TypeScript. projectService resolves each file to
  // the nearest tsconfig (src/, tests/, and the *.config.ts files are covered).
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ]
    }
  },

  // Renderer: React (browser environment).
  {
    files: ['src/renderer/**/*.{ts,tsx}'],
    ...react.configs.flat.recommended,
    settings: { react: { version: 'detect' } },
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: globals.browser
    }
  },
  {
    files: ['src/renderer/**/*.{ts,tsx}'],
    ...react.configs.flat['jsx-runtime']
  },
  {
    files: ['src/renderer/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs['recommended-latest'].rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  },

  // Main and preload run in Node.
  {
    files: ['src/main/**/*.ts', 'src/preload/**/*.ts'],
    languageOptions: { globals: globals.node }
  },

  // Tests run in Node (Playwright host process). Playwright fixtures require
  // the first argument to be a destructuring pattern, which is empty when a
  // fixture uses no other fixtures — allow that specific case.
  {
    files: ['tests/**/*.ts'],
    languageOptions: { globals: globals.node },
    rules: {
      'no-empty-pattern': ['error', { allowObjectPatternsAsParameters: true }]
    }
  },

  // Keep ESLint formatting rules out of the way; Prettier owns formatting.
  prettier
)
