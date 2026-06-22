import type { JSX } from 'react'

// The `shell-ready` marker is the observable signal that the shell has reached
// a ready state (R-1). It is present once React has mounted this component.
export default function App(): JSX.Element {
  return (
    <main data-testid="shell-ready">
      <h1>Stoa</h1>
      <p>Agentic Development Environment</p>
    </main>
  )
}
