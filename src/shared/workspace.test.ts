import { describe, it, expect } from 'vitest'
import {
  isValidWorkspaceName,
  validateNewWorkspaceName,
  emptyWorkspace,
  serializeWorkspace,
  parseWorkspace,
  type Workspace
} from './workspace'

// Unit tier (TDD): the workspace name rule (docs/definitions.md, RWL-4).
describe('isValidWorkspaceName', () => {
  it.each(['w', 'work', 'Work', 'project-name', 'company_name', 'a1', 'A-_9'])(
    'accepts %j',
    (name) => expect(isValidWorkspaceName(name)).toBe(true)
  )

  it.each(['', '1abc', '-abc', '_abc', 'has space', 'bad!', 'trailing.', ' leading'])(
    'rejects %j',
    (name) => expect(isValidWorkspaceName(name)).toBe(false)
  )
})

describe('validateNewWorkspaceName', () => {
  it('accepts a valid, unused name and returns it trimmed', () => {
    expect(validateNewWorkspaceName('  personal  ', ['work'])).toEqual({
      ok: true,
      name: 'personal'
    })
  })

  it('rejects a duplicate case-insensitively (RWL-3)', () => {
    expect(validateNewWorkspaceName('Work', ['work'])).toEqual({ ok: false, reason: 'duplicate' })
    expect(validateNewWorkspaceName('work', ['WORK'])).toEqual({ ok: false, reason: 'duplicate' })
  })

  it.each(['1bad', '', 'has space', 'bad!'])('rejects invalid name %j (RWL-4)', (name) => {
    expect(validateNewWorkspaceName(name, [])).toEqual({ ok: false, reason: 'invalid' })
  })

  it('reports invalid before duplicate', () => {
    expect(validateNewWorkspaceName('bad name', ['bad name'])).toEqual({
      ok: false,
      reason: 'invalid'
    })
  })
})

// Workspace file (de)serialization — YAML, C-3 human-readable storage.
describe('workspace serialization', () => {
  it('round-trips an empty workspace', () => {
    const ws = emptyWorkspace('work')
    expect(ws).toEqual({ name: 'work', projects: [] })
    expect(parseWorkspace(serializeWorkspace(ws))).toEqual(ws)
  })

  it('round-trips a workspace with projects', () => {
    const ws: Workspace = {
      name: 'work',
      projects: [
        { path: '~/code/stoa', active: true },
        { path: '~/code/other', active: false }
      ]
    }
    expect(parseWorkspace(serializeWorkspace(ws))).toEqual(ws)
  })

  it('defaults a missing projects list to empty', () => {
    expect(parseWorkspace('name: work\n')).toEqual({ name: 'work', projects: [] })
  })

  it.each([
    ['malformed YAML', 'name: : :\n  - broken'],
    ['no name', 'projects: []'],
    ['invalid name', 'name: 1bad'],
    ['projects not a list', 'name: work\nprojects: 5'],
    ['project missing path', 'name: work\nprojects:\n  - active: true'],
    ['empty file', '']
  ])('rejects %s (RWS-4)', (_label, text) => {
    expect(() => parseWorkspace(text)).toThrow()
  })
})
