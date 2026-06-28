import { expect } from '@playwright/test'
import { Given, When, Then, launchApp } from '../fixtures'

// Step definitions for the Shell acceptance features
// (docs/features/shell/acceptance/*.feature). Each Gherkin sentence maps to one
// definition here; they are reused across scenarios as more are added.

Given('the Stoa application is launched', async ({ shell }) => {
  shell.app = await launchApp(shell)
})

When('the main window opens', async ({ shell }) => {
  shell.window = await shell.app!.firstWindow()
})

Then('the main window is visible', async ({ shell }) => {
  await expect
    .poll(() =>
      shell.app!.evaluate(
        ({ BrowserWindow }) => BrowserWindow.getAllWindows()[0]?.isVisible() ?? false
      )
    )
    .toBe(true)
})

Then('the shell signals it has reached a ready state', async ({ shell }) => {
  await shell.window!.waitForSelector('[data-testid="shell-ready"]')
})
