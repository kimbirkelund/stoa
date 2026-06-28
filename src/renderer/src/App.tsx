import { useEffect, useState, type JSX } from 'react'
import './theme.css'
import { WorkspaceLauncher } from './components/WorkspaceLauncher'
import { WorkspaceView } from './components/WorkspaceView'
import type { Workspace } from '../../shared/workspace'

// The `shell-ready` marker is the observable signal that the shell has reached
// a ready state (RSH-1). It is present once React has mounted this component.
//
// Startup with no workspace shows the launcher (RWS-2); selecting or creating a
// workspace opens it (RWL-1/RWL-2) and swaps in the workspace view. Storage and
// opening live behind window.stoa (the preload bridge); the renderer never
// touches Node/IPC directly.
export default function App(): JSX.Element {
  const [workspaces, setWorkspaces] = useState<string[]>([])
  const [open, setOpen] = useState<Workspace | null>(null)

  useEffect(() => {
    void window.stoa.listWorkspaces().then(setWorkspaces, () => setWorkspaces([]))
  }, [])

  async function handleCreate(name: string): Promise<void> {
    setOpen(await window.stoa.createWorkspace(name))
  }

  async function handleSelect(name: string): Promise<void> {
    try {
      setOpen(await window.stoa.openWorkspace(name))
    } catch {
      // RWS-4: unopenable workspace — stay on the launcher. Refresh the list in
      // case the entry should no longer appear.
      void window.stoa.listWorkspaces().then(setWorkspaces, () => setWorkspaces([]))
    }
  }

  return (
    <main
      data-testid="shell-ready"
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      {open ? (
        <WorkspaceView workspace={open} />
      ) : (
        <WorkspaceLauncher
          workspaces={workspaces}
          onSelect={(name) => void handleSelect(name)}
          onCreate={(name) => void handleCreate(name)}
        />
      )}
    </main>
  )
}
