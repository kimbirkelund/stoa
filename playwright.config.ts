import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/acceptance',
  testMatch: '**/*.spec.ts',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  reporter: 'list',
  fullyParallel: false
})
