# Workspace launcher — Design proposal

> **Status: proposal.** A starting point for the real launcher UI, to review and
> refine. Not yet ratified; the requirements ([RWL-1..RWL-4](requirements.md))
> are the contract this design must satisfy.

## Goals

- Let a returning user reach an existing workspace in one action (RWL-1).
- Let a new user create their first workspace with minimal friction (RWL-2).
- Make invalid and duplicate names obvious **before** anything is created
  (RWL-3, RWL-4) — inline, not via a modal error.
- Keyboard-first (X-1), mouse-supported (X-2), themeable (X-3).

## Layout

A single centered card (rendered as a `<dialog>`), two stacked regions:

```
┌───────────────────────────────────────┐
│  Open a workspace                       │
│                                         │
│  Existing                               │
│   ┌─────────────────────────────────┐  │
│   │ personal                        ▸│  │   ← list of existing workspaces
│   │ work                            ▸│  │     (each a button; Enter opens)
│   │ project-stoa                    ▸│  │
│   └─────────────────────────────────┘  │
│   (or: "No workspaces yet…" empty copy) │
│                                         │
│  New workspace                          │
│   [ e.g. personal, work, … ] [ Create ] │   ← name field + inline validation
│   ⚠ <error appears here>                │
└───────────────────────────────────────┘
```

The current `WorkspaceLauncher` component already realizes this skeleton; the
proposal is mostly about behavior, polish, and the open questions below.

## Interaction & states

- **Empty** — no existing workspaces; the list is replaced by empty copy that
  points the user at the create field. (Storybook: `Empty` story.)
- **Populated** — existing workspaces listed, most-useful-first. Ordering is
  unspecified by requirements; suggest most-recently-opened first, falling back
  to alphabetical. (Storybook: `WithWorkspaces` story.)
- **Selecting** — clicking a workspace, or focusing it and pressing Enter,
  invokes `onSelect(name)` → the app opens it (RWL-1).
- **Creating** — typing a name and pressing Enter or clicking Create validates,
  then invokes `onCreate(name)` (RWL-2). Validation is local and immediate:
  - empty / pattern miss → invalid-name error (RWL-4),
  - case-insensitive match against an existing name → duplicate error (RWL-3).
    The field clears on success; the error clears as soon as the user edits.

## Keyboard model (X-1)

- Tab order: existing-workspace list → name field → Create.
- Arrow keys move within the list; Enter opens the focused workspace.
- Enter in the name field submits create.
- Esc is reserved — undefined while the launcher is the only surface (there is
  nothing to dismiss to); revisit if the launcher ever overlays an open
  workspace.

## Theming (X-3)

All colors come from `theme.css` tokens (`--color-*`), so light/dark (and future
themes) need no component changes. Storybook's theme toolbar switches the active
token set for review. The card uses `--color-surface`; focus rings use
`--color-accent`; errors use `--color-danger`.

## Component contract

```ts
type WorkspaceLauncherProps = {
  workspaces: string[] // existing names, display order
  onSelect: (name: string) => void // RWL-1
  onCreate: (name: string) => void // RWL-2 (only called with a valid, non-dup name)
}
```

The component is presentational and Electron-free: it owns only the create-field
input and its validation. Opening and persistence (config-dir storage, RWS-3)
live behind the callbacks, so the component renders identically in Storybook and
in the Electron renderer.

## Open questions

- **Workspace metadata** — show more than the name (path, last-opened, project
  count)? Requirements only mandate the name today.
- **Ordering** — recency vs. alphabetical (see above); needs a decision when
  history ordering is specified.
- **Rename / delete from the launcher** — tracked as an open seed; would add
  per-row affordances and confirm-on-delete.
- **Create destination** — under model (A) the app owns the location, so the user
  only supplies a name; confirm no folder picker is wanted.
