import { describe, it, expect } from 'vitest'
import { isValidWorkspaceName, validateNewWorkspaceName } from './workspace-name'

// Unit tier (TDD): the workspace-name rule. See docs/definitions.md and RWL-4.
describe('isValidWorkspaceName', () => {
  it.each(['w', 'work', 'Work', 'project-name', 'company_name', 'a1', 'A-_9'])(
    'accepts %j',
    (name) => {
      expect(isValidWorkspaceName(name)).toBe(true)
    }
  )

  it.each(['', '1abc', '-abc', '_abc', 'has space', 'bad!', 'trailing.', ' leading'])(
    'rejects %j',
    (name) => {
      expect(isValidWorkspaceName(name)).toBe(false)
    }
  )
})

// RWL-2/3/4: validate a name for creation against the existing set.
describe('validateNewWorkspaceName', () => {
  it('accepts a valid, unused name and returns it trimmed', () => {
    expect(validateNewWorkspaceName('  personal  ', ['work'])).toEqual({
      ok: true,
      name: 'personal'
    })
  })

  it('rejects a name already taken (exact)', () => {
    expect(validateNewWorkspaceName('work', ['work'])).toEqual({
      ok: false,
      reason: 'duplicate'
    })
  })

  it('rejects a duplicate case-insensitively (RWL-3)', () => {
    expect(validateNewWorkspaceName('Work', ['work'])).toEqual({
      ok: false,
      reason: 'duplicate'
    })
    expect(validateNewWorkspaceName('work', ['WORK'])).toEqual({
      ok: false,
      reason: 'duplicate'
    })
  })

  it.each(['1bad', '', 'has space', 'bad!'])('rejects invalid name %j (RWL-4)', (name) => {
    expect(validateNewWorkspaceName(name, [])).toEqual({ ok: false, reason: 'invalid' })
  })

  it('reports invalid before duplicate', () => {
    // An invalid string can never equal a valid existing name, but the rule
    // order must still put 'invalid' first.
    expect(validateNewWorkspaceName('bad name', ['bad name'])).toEqual({
      ok: false,
      reason: 'invalid'
    })
  })
})
