import { describe, it, expect } from 'vitest'
import { workspaceNameFromArgv } from './cli'

// RWS-1: the workspace name comes from a `--workspace=<name>` argument. Parsing
// is pure so it can be unit-tested without launching Electron.
describe('workspaceNameFromArgv', () => {
  it('extracts the name from --workspace=<name>', () => {
    expect(workspaceNameFromArgv(['electron', 'entry.js', '--workspace=work'])).toBe('work')
  })

  it('ignores other Electron/Chromium flags', () => {
    expect(
      workspaceNameFromArgv(['electron', 'entry.js', '--user-data-dir=/tmp/x', '--workspace=work'])
    ).toBe('work')
  })

  it('returns null when no workspace argument is present', () => {
    expect(workspaceNameFromArgv(['electron', 'entry.js'])).toBeNull()
  })

  it('treats an empty value as absent', () => {
    expect(workspaceNameFromArgv(['electron', 'entry.js', '--workspace='])).toBeNull()
  })

  it('returns the first when given more than one', () => {
    expect(workspaceNameFromArgv(['--workspace=a', '--workspace=b'])).toBe('a')
  })
})
