import { test as base, createBdd } from 'playwright-bdd'
import { _electron as electron } from '@playwright/test'
import type { ElectronApplication, Page } from '@playwright/test'
import { mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

// Shared per-scenario state ("world"). Steps stash the launched app and its
// window here so later steps can act on them. Each scenario gets its own
// throwaway userData dir; the app is closed and the dir removed when the
// scenario ends.
export type ShellWorld = {
  app?: ElectronApplication
  window?: Page
  userDataDir: string
}

// Launch the built app's main process. Every instance is pointed at the
// scenario's own userData dir (--user-data-dir): the default dir is shared by
// app name, so parallel workers would otherwise race on Electron/Chromium's
// lock and cache files there and the loser fails to spawn (Linux "spawn
// ETXTBSY", Windows "Process failed to launch!"). A short retry absorbs any
// residual transient spawn failure.
export async function launchApp(
  world: ShellWorld,
  args: string[] = []
): Promise<ElectronApplication> {
  const entry = join(process.cwd(), 'out/main/index.js')
  const maxAttempts = 3
  let lastError: unknown
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await electron.launch({
        args: [entry, `--user-data-dir=${world.userDataDir}`, ...args],
        // Point workspace storage at the scenario's throwaway dir so tests never
        // touch the real ~/.config/stoa.
        env: { ...process.env, STOA_CONFIG_DIR: world.userDataDir }
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      const transient =
        message.includes('ETXTBSY') ||
        message.includes('Process failed to launch') ||
        message.includes('being used by another process')
      if (!transient || attempt === maxAttempts) {
        throw error
      }
      lastError = error
      await new Promise((resolve) => setTimeout(resolve, 250 * attempt))
    }
  }
  throw lastError
}

export const test = base.extend<{ shell: ShellWorld }>({
  shell: async ({}, use) => {
    const world: ShellWorld = { userDataDir: mkdtempSync(join(tmpdir(), 'stoa-e2e-')) }
    await use(world)
    await world.app?.close()
    rmSync(world.userDataDir, { recursive: true, force: true })
  }
})

export const { Given, When, Then } = createBdd(test)
