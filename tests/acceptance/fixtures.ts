import { test as base, createBdd } from 'playwright-bdd'
import type { ElectronApplication, Page } from '@playwright/test'

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
