import { Given, launchApp } from '../fixtures'

// Step definitions for the Workspaces acceptance features
// (docs/features/workspaces/acceptance/*.feature). The "an existing workspace
// named" and "the workspace … is opened" steps are shared from
// workspace-launcher.steps.ts.

Given(
  'the Stoa application is launched with workspace {string}',
  async ({ shell }, name: string) => {
    // RWS-1: name the startup workspace on the command line.
    shell.app = await launchApp(shell, [`--workspace=${name}`])
    shell.window = await shell.app.firstWindow()
  }
)
