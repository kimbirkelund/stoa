import { _electron as electron } from '@playwright/test'
import { join } from 'path'
import { Given, Then } from '../fixtures'

// Step definitions for the Workspace launcher acceptance features
// (docs/features/workspace-launcher/acceptance/*.feature). The "main window
// opens" step is shared from shell.steps.ts.

Given('the Stoa application is launched without a workspace', async ({ shell }) => {
  // No workspace argument is passed, so the app must present the launcher (RWS-2).
  shell.app = await electron.launch({
    args: [join(process.cwd(), 'out/main/index.js')]
  })
})

Then('the workspace launcher is shown', async ({ shell }) => {
  await shell.window!.waitForSelector('[data-testid="workspace-launcher"]')
})
