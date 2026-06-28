import { expect } from '@playwright/test'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { Given, When, Then, launchApp } from '../fixtures'
import { emptyWorkspace, serializeWorkspace } from '../../../src/shared/workspace'

// Step definitions for the Workspace launcher acceptance features
// (docs/features/workspace-launcher/acceptance/*.feature).

Given('the Stoa application is launched without a workspace', async ({ shell }) => {
  // No workspace argument is passed, so the app must present the launcher (RWS-2).
  shell.app = await launchApp(shell)
  shell.window = await shell.app.firstWindow()
})

Given('an existing workspace named {string}', ({ shell }, name: string) => {
  // Pre-seed the scenario's config dir before launch (RWS-3 storage layout).
  const dir = join(shell.userDataDir, 'workspaces')
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, `${name}.yaml`), serializeWorkspace(emptyWorkspace(name)), 'utf8')
})

When(
  'the user selects the workspace {string} from the launcher',
  async ({ shell }, name: string) => {
    await shell.window!.getByRole('button', { name }).click()
  }
)

When('the user creates a workspace named {string}', async ({ shell }, name: string) => {
  await shell.window!.getByLabel('New workspace').fill(name)
  await shell.window!.getByRole('button', { name: 'Create' }).click()
})

Then('the workspace launcher is shown', async ({ shell }) => {
  await shell.window!.waitForSelector('[data-testid="workspace-launcher"]')
})

Then('the workspace {string} is opened', async ({ shell }, name: string) => {
  const view = shell.window!.getByTestId('workspace-view')
  await expect(view).toBeVisible()
  await expect(view).toContainText(name)
})

Then('a workspace file named {string} exists', ({ shell }, name: string) => {
  expect(existsSync(join(shell.userDataDir, 'workspaces', `${name}.yaml`))).toBe(true)
})
