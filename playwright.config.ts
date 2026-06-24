import { defineConfig } from '@playwright/test'
import { defineBddConfig } from 'playwright-bdd'

// The .feature files in docs/ ARE the executable acceptance tests: bddgen
// generates Playwright specs from them using the step definitions below.
const testDir = defineBddConfig({
  features: 'docs/features/**/acceptance/*.feature',
  steps: 'tests/acceptance/**/*.ts',
  // @wip scenarios specify not-yet-built behavior; exclude them from generation
  // so their undefined steps do not fail the suite.
  tags: 'not @wip'
})

export default defineConfig({
  testDir,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  reporter: 'list',
  fullyParallel: false
})
