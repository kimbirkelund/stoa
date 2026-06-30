import { contextBridge, ipcRenderer } from 'electron'
import { WORKSPACE_CHANNELS, type StoaApi } from '../shared/api'

// Expose a narrow, typed workspace API to the renderer. The renderer never
// touches ipcRenderer or Node directly — it only sees `window.stoa`.
const api: StoaApi = {
  initialWorkspace: () => ipcRenderer.invoke(WORKSPACE_CHANNELS.initial),
  listWorkspaces: () => ipcRenderer.invoke(WORKSPACE_CHANNELS.list),
  createWorkspace: (name) => ipcRenderer.invoke(WORKSPACE_CHANNELS.create, name),
  openWorkspace: (name) => ipcRenderer.invoke(WORKSPACE_CHANNELS.open, name)
}

contextBridge.exposeInMainWorld('stoa', api)
