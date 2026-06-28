import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import {
  emptyWorkspace,
  parseWorkspace,
  serializeWorkspace,
  validateNewWorkspaceName,
  type Workspace
} from '../shared/workspace'

// Workspaces are stored as `<name>.yaml` files in an app-managed directory
// (model A, C-3). The config root is overridable via STOA_CONFIG_DIR (used by
// tests and the acceptance suite to point at a throwaway directory).
export function workspacesDir(): string {
  const base = process.env.STOA_CONFIG_DIR ?? join(homedir(), '.config', 'stoa')
  return join(base, 'workspaces')
}

function workspaceFile(name: string): string {
  return join(workspacesDir(), `${name}.yaml`)
}

// RWS-3: the persisted workspaces, by name, sorted. Missing dir → none yet.
export async function listWorkspaceNames(): Promise<string[]> {
  try {
    const entries = await readdir(workspacesDir())
    return entries
      .filter((f) => f.endsWith('.yaml'))
      .map((f) => f.slice(0, -'.yaml'.length))
      .sort((a, b) => a.localeCompare(b))
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return []
    throw err
  }
}

// RWL-2: create a new, empty workspace and persist it. Validates the name
// (RWL-4) and rejects case-insensitive duplicates (RWL-3).
export async function createWorkspace(name: string): Promise<Workspace> {
  const existing = await listWorkspaceNames()
  const validation = validateNewWorkspaceName(name, existing)
  if (!validation.ok) {
    throw new Error(
      validation.reason === 'invalid'
        ? `Invalid workspace name: ${name}`
        : `A workspace named "${name.trim()}" already exists.`
    )
  }

  const workspace = emptyWorkspace(validation.name)
  await mkdir(workspacesDir(), { recursive: true })
  await writeFile(workspaceFile(validation.name), serializeWorkspace(workspace), 'utf8')
  return workspace
}

// RWS-1/RWL-1: load a workspace by name. Throws if missing or corrupt (RWS-4).
export async function readWorkspace(name: string): Promise<Workspace> {
  const text = await readFile(workspaceFile(name), 'utf8')
  return parseWorkspace(text)
}
