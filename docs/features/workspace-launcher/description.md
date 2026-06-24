# Workspace launcher — Description

The **Workspace launcher** is the surface shown at startup when no workspace was
specified ([RWS-2](../workspaces/requirements.md)), and the fallback whenever a
requested workspace cannot be opened ([RWS-4](../workspaces/requirements.md)).
It is the single place from which a user reaches an open workspace by one of
three branches.

## The three branches

- **Select** — choose a previously opened workspace from a list of recents and
  open it.
- **Open** — pick an existing workspace file from disk and open it.
- **Create** — name a new, empty workspace, persist it as a text file
  ([C-3](../../constraints.md)), and open it.

## Mental model

```
Launcher (no workspace open)
├── recents ──select──┐
├── open file ────────┼──> open workspace ──> Shell shows project tabs
└── create new ───────┘         │
                                └─> recorded in history (RWS-3)
```

Every branch that succeeds ends in the same place: a workspace is open and the
Projects feature takes over (project tabs, RPJ-1). Every branch that fails or is cancelled leaves
the launcher visible and unchanged, so the user can try another branch.

## Scope

In scope: selecting, opening, and creating-empty. **Out of scope** (open seed,
tracked in Shell's "Workspace composition"): adding/removing projects to a
workspace and activating/deactivating them. A freshly created workspace is empty.

## Conventions

Honors GUI-only (C-2), full keyboard navigability (X-1), mouse support (X-2), and
version-control-friendly workspace storage (C-3).
