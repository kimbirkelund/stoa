import type { JSX } from 'react'

// The `shell-ready` marker is the observable signal that the shell has reached
// a ready state (RSH-1). It is present once React has mounted this component.
//
// No workspace is opened yet, so the shell presents the workspace launcher
// (RWS-2). This is a walking-skeleton placeholder; the real select/create UI
// (RWL-1..RWL-4) follows once Storybook is in place.
export default function App(): JSX.Element {
  return (
    <main data-testid="shell-ready">
      <h1>Stoa</h1>
      <dialog data-testid="workspace-launcher" open>
        <p>workspace launcher goes here</p>
      </dialog>
    </main>
  )
}
