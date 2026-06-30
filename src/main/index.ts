import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { WORKSPACE_CHANNELS } from '../shared/api'
import type { Workspace } from '../shared/workspace'
import { listWorkspaceNames, createWorkspace, readWorkspace } from './workspaces'
import { workspaceNameFromArgv } from './cli'

// Workspace IPC (RWS-1/3/4, RWL-1/2). Handlers reject on invalid/duplicate/
// unopenable so the renderer can degrade gracefully.

// RWS-1: resolve the command-line workspace once. If a name was given but cannot
// be opened, fall back to null (→ launcher); informing the user is RWS-4.
ipcMain.handle(WORKSPACE_CHANNELS.initial, async (): Promise<Workspace | null> => {
  const name = workspaceNameFromArgv(process.argv)
  if (name === null) return null
  try {
    return await readWorkspace(name)
  } catch {
    return null
  }
})
ipcMain.handle(WORKSPACE_CHANNELS.list, () => listWorkspaceNames())
ipcMain.handle(WORKSPACE_CHANNELS.create, (_event, name: string) => createWorkspace(name))
ipcMain.handle(WORKSPACE_CHANNELS.open, (_event, name: string) => readWorkspace(name))

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // electron-vite injects ELECTRON_RENDERER_URL in dev; load the built file otherwise.
  if (process.env['ELECTRON_RENDERER_URL']) {
    void mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    void mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

void app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
