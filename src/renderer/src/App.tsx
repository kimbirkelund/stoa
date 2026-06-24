import type { JSX } from 'react'
import './theme.css'
import { WorkspaceLauncher } from './components/WorkspaceLauncher'

// The `shell-ready` marker is the observable signal that the shell has reached
// a ready state (RSH-1). It is present once React has mounted this component.
//
// No workspace is opened yet, so the shell presents the workspace launcher
// (RWS-2). Selection and creation are stubbed for now; they will be wired to the
// main process (config-dir storage) as RWL-1..RWL-4 are implemented.
export default function App(): JSX.Element {
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
      <WorkspaceLauncher workspaces={[]} onSelect={() => {}} onCreate={() => {}} />
    </main>
  )
}
