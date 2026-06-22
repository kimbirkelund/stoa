import { test, expect, _electron as electron, type ElectronApplication } from '@playwright/test'
import { join } from 'path'

// Executable form of docs/features/shell/acceptance/startup.feature.
// Validates R-1 — Cross-platform startup.
test.describe('Feature: Shell startup', () => {
  let app: ElectronApplication

  test.afterEach(async () => {
    await app?.close()
  })

  test('Scenario: Application reaches ready state on launch', async () => {
    // Given the Stoa application is launched
    app = await electron.launch({
      args: [join(__dirname, '../../../out/main/index.js')]
    })

    // When the main window opens
    const window = await app.firstWindow()

    // Then the main window is visible
    await expect
      .poll(() =>
        app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0]?.isVisible() ?? false)
      )
      .toBe(true)

    // And the shell signals it has reached a ready state
    await window.waitForSelector('[data-testid="shell-ready"]')
  })
})
