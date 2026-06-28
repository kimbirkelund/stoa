import type { Workspace } from './workspace'

// The API the preload bridge exposes to the renderer as `window.stoa`. Keeping
// it in shared lets preload (provider) and renderer (consumer) agree on one
// contract. Type-only — no runtime import crosses the boundary here.
export interface StoaApi {
  /** Names of the persisted workspaces (RWS-3). */
  listWorkspaces(): Promise<string[]>
  /** Create and open a new, empty workspace (RWL-2); rejects on invalid/duplicate. */
  createWorkspace(name: string): Promise<Workspace>
  /** Open an existing workspace by name (RWL-1); rejects if unopenable (RWS-4). */
  openWorkspace(name: string): Promise<Workspace>
}

// IPC channel names, shared so main and preload can't drift.
export const WORKSPACE_CHANNELS = {
  list: 'workspaces:list',
  create: 'workspaces:create',
  open: 'workspaces:open'
} as const
