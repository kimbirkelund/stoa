// RWS-1: the startup workspace is named via a `--workspace=<name>` argument.
// Returns the first such name, or null if none is present. Parsing only — the
// name is validated/opened by the storage layer.
export function workspaceNameFromArgv(argv: readonly string[]): string | null {
  for (const arg of argv) {
    const match = /^--workspace=(.+)$/.exec(arg)
    if (match) return match[1]
  }
  return null
}
