import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtemp, rm, writeFile, mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { listWorkspaceNames, createWorkspace, readWorkspace, workspacesDir } from './workspaces'

// Storage layer over the app-managed config dir (RWS-1/3/4). Runs in the unit
// project (node) against a throwaway STOA_CONFIG_DIR.
let dir: string

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), 'stoa-'))
  process.env.STOA_CONFIG_DIR = dir
})

afterEach(async () => {
  delete process.env.STOA_CONFIG_DIR
  await rm(dir, { recursive: true, force: true })
})

describe('listWorkspaceNames', () => {
  it('is empty when nothing has been created', async () => {
    expect(await listWorkspaceNames()).toEqual([])
  })

  it('lists created workspaces, sorted', async () => {
    await createWorkspace('work')
    await createWorkspace('personal')
    expect(await listWorkspaceNames()).toEqual(['personal', 'work'])
  })
})

describe('createWorkspace', () => {
  it('persists an empty workspace and returns it (RWL-2)', async () => {
    const ws = await createWorkspace('work')
    expect(ws).toEqual({ name: 'work', projects: [] })
    expect(await readWorkspace('work')).toEqual(ws)
  })

  it('rejects a duplicate name case-insensitively (RWL-3)', async () => {
    await createWorkspace('work')
    await expect(createWorkspace('Work')).rejects.toThrow()
  })

  it('rejects an invalid name (RWL-4)', async () => {
    await expect(createWorkspace('1bad')).rejects.toThrow()
  })
})

describe('readWorkspace', () => {
  it('throws when the workspace does not exist (RWS-4)', async () => {
    await expect(readWorkspace('missing')).rejects.toThrow()
  })

  it('throws when the workspace file is corrupt (RWS-4)', async () => {
    await mkdir(workspacesDir(), { recursive: true })
    await writeFile(join(workspacesDir(), 'broken.yaml'), 'name: : :\n  - nope', 'utf8')
    await expect(readWorkspace('broken')).rejects.toThrow()
  })
})
