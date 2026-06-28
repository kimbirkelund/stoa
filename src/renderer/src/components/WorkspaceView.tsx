import type { JSX } from 'react'
import type { Workspace } from '../../../shared/workspace'
import './WorkspaceView.css'

export type WorkspaceViewProps = {
  workspace: Workspace
}

// The open-workspace surface. For now it only names the open workspace; project
// tabs (RPJ-1) and contents are the Projects feature's concern. Its presence
// (data-testid="workspace-view") is the observable "a workspace is open" state.
export function WorkspaceView({ workspace }: WorkspaceViewProps): JSX.Element {
  return (
    <section className="workspace-view" data-testid="workspace-view">
      <h1 className="workspace-view__name">{workspace.name}</h1>
      <p className="workspace-view__empty">No projects yet.</p>
    </section>
  )
}

export default WorkspaceView
