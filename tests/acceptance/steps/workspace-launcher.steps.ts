import { Given, Then, launchApp } from '../fixtures'

// Step definitions for the Workspace launcher acceptance features
// (docs/features/workspace-launcher/acceptance/*.feature). The "main window
// opens" step is shared from shell.steps.ts.

Given('the Stoa application is launched without a workspace', async ({ shell }) => {
  // No workspace argument is passed, so the app must present the launcher (RWS-2).
  shell.app = await launchApp()
})

Then('the workspace launcher is shown', async ({ shell }) => {
  await shell.window!.waitForSelector('[data-testid="workspace-launcher"]')
})
