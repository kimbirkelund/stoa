import { parse, stringify } from 'yaml'

// Shared workspace domain (used by both the renderer and the main process).
// Pure: no fs, no Electron — so it can be unit-tested directly.

// The canonical workspace-name rule (docs/definitions.md, RWL-4): a letter, then
// letters, digits, hyphens, or underscores.
export const WORKSPACE_NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9_-]*$/

export function isValidWorkspaceName(name: string): boolean {
  return WORKSPACE_NAME_PATTERN.test(name)
}

export type CreateValidation =
  { ok: true; name: string } | { ok: false; reason: 'invalid' | 'duplicate' }

// Validate a proposed new workspace name against the existing set. Names are
// trimmed; the pattern is checked first (RWL-4), then case-insensitive
// uniqueness (RWL-3). On success the trimmed name is returned for the caller.
export function validateNewWorkspaceName(
  rawName: string,
  existing: readonly string[]
): CreateValidation {
  const name = rawName.trim()

  if (!isValidWorkspaceName(name)) {
    return { ok: false, reason: 'invalid' }
  }
  if (existing.some((w) => w.toLowerCase() === name.toLowerCase())) {
    return { ok: false, reason: 'duplicate' }
  }
  return { ok: true, name }
}

export type Project = { path: string; active: boolean }
export type Workspace = { name: string; projects: Project[] }

export function emptyWorkspace(name: string): Workspace {
  return { name, projects: [] }
}

export function serializeWorkspace(ws: Workspace): string {
  return stringify(ws)
}

// Parse a workspace file's text, validating its shape. Throws on anything
// malformed or invalid so the caller can degrade gracefully (RWS-4).
export function parseWorkspace(text: string): Workspace {
  const data: unknown = parse(text)
  if (typeof data !== 'object' || data === null) {
    throw new Error('Workspace file is not a mapping.')
  }

  const record = data as Record<string, unknown>
  const name = record.name
  if (typeof name !== 'string' || !isValidWorkspaceName(name)) {
    throw new Error('Workspace file has a missing or invalid name.')
  }

  const rawProjects = record.projects ?? []
  if (!Array.isArray(rawProjects)) {
    throw new Error('Workspace "projects" must be a list.')
  }

  const projects: Project[] = rawProjects.map((entry, i) => {
    if (typeof entry !== 'object' || entry === null) {
      throw new Error(`Project ${i} is not a mapping.`)
    }
    const { path, active } = entry as Record<string, unknown>
    if (typeof path !== 'string' || path.length === 0) {
      throw new Error(`Project ${i} has a missing or invalid path.`)
    }
    return { path, active: active === true }
  })

  return { name, projects }
}
