import { test as base, createBdd } from 'playwright-bdd'
import { _electron as electron } from '@playwright/test'
import type { ElectronApplication, Page } from '@playwright/test'
import { join } from 'path'

// Launch the built app's main process. The first launch after a fresh build
// can hit a transient race where the just-written Electron executable is still
// busy: Linux reports `spawn ETXTBSY` ("text file busy"), Windows reports
// "Process failed to launch!". Both clear on a retry, so retry a few times
// with a short backoff before giving up.
export async function launchApp(args: string[] = []): Promise<ElectronApplication> {
  const entry = join(process.cwd(), 'out/main/index.js')
  const maxAttempts = 5
  let lastError: unknown
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await electron.launch({ args: [entry, ...args] })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      const transient = message.includes('ETXTBSY') || message.includes('Process failed to launch')
      if (!transient || attempt === maxAttempts) {
        throw error
      }
      lastError = error
      await new Promise((resolve) => setTimeout(resolve, 250 * attempt))
    }
  }
  throw lastError
}

// Shared per-scenario state ("world"). Steps stash the launched app and its
// window here so later steps can act on them. The app is closed when the
// scenario ends.
export type ShellWorld = {
  app?: ElectronApplication
  window?: Page
}

export const test = base.extend<{ shell: ShellWorld }>({
  shell: async ({}, use) => {
    const world: ShellWorld = {}
    await use(world)
    await world.app?.close()
  }
})

export const { Given, When, Then } = createBdd(test)
