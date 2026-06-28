// The canonical workspace-name rule (see docs/definitions.md, RWL-4): a letter,
// then letters, digits, hyphens, or underscores. Kept as a pure module so it can
// be unit-tested and reused by both the renderer and (later) the main process.
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
