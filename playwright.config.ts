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
  // Run one worker: every scenario execs the SAME node_modules electron binary,
  // and Windows refuses to load that executable image concurrently while it is
  // still being written/virus-scanned after extraction ("The process cannot
  // access the file because it is being used by another process"). Playwright's
  // worker parallelism targets cheap isolated browser contexts, not N processes
  // sharing one native binary, so real-Electron e2e must launch serially.
  // (fullyParallel:false alone only serializes within a file, not across files.)
  fullyParallel: false,
  workers: 1
})
