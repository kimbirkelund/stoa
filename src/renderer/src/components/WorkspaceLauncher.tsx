import { useState, type FormEvent, type JSX } from 'react'
import './WorkspaceLauncher.css'
import { validateNewWorkspaceName } from '../../../shared/workspace'

export type WorkspaceLauncherProps = {
  /** Existing workspaces the user can open, by name. */
  workspaces: string[]
  /** Called when the user opens an existing workspace (RWL-1). */
  onSelect: (name: string) => void
  /** Called when the user creates a new, validly-named workspace (RWL-2). */
  onCreate: (name: string) => void
}

// Presentational launcher (RWL-1..RWL-4). It owns only the create-field input
// and its validation; opening and persistence are delegated to callbacks so the
// component renders in isolation (Storybook) and in Electron alike.
export function WorkspaceLauncher({
  workspaces,
  onSelect,
  onCreate
}: WorkspaceLauncherProps): JSX.Element {
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleCreate(event: FormEvent): void {
    event.preventDefault()
    const result = validateNewWorkspaceName(name, workspaces)

    if (!result.ok) {
      setError(
        result.reason === 'invalid'
          ? 'Name must start with a letter and use only letters, digits, hyphens, or underscores.'
          : `A workspace named "${name.trim()}" already exists.`
      )
      return
    }

    setError(null)
    setName('')
    onCreate(result.name)
  }

  return (
    <dialog className="workspace-launcher" data-testid="workspace-launcher" open>
      <h1 className="workspace-launcher__title">Open a workspace</h1>

      <section className="workspace-launcher__section" aria-label="Existing workspaces">
        {workspaces.length === 0 ? (
          <p className="workspace-launcher__empty">
            No workspaces yet. Create your first one below.
          </p>
        ) : (
          <ul className="workspace-launcher__list">
            {workspaces.map((w) => (
              <li key={w}>
                <button
                  type="button"
                  className="workspace-launcher__item"
                  onClick={() => onSelect(w)}
                >
                  {w}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <form className="workspace-launcher__create" onSubmit={handleCreate} noValidate>
        <label className="workspace-launcher__label" htmlFor="workspace-name">
          New workspace
        </label>
        <div className="workspace-launcher__create-row">
          <input
            id="workspace-name"
            className="workspace-launcher__input"
            value={name}
            placeholder="e.g. personal, work, project-name"
            onChange={(e) => {
              setName(e.target.value)
              if (error) setError(null)
            }}
            aria-invalid={error !== null}
            aria-describedby={error ? 'workspace-name-error' : undefined}
          />
          <button type="submit" className="workspace-launcher__create-button">
            Create
          </button>
        </div>
        {error && (
          <p id="workspace-name-error" role="alert" className="workspace-launcher__error">
            {error}
          </p>
        )}
      </form>
    </dialog>
  )
}

export default WorkspaceLauncher
