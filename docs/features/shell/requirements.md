# Shell — Requirements

The **Shell** is the application platform that hosts all other features: the
window, application startup, workspace launching and lifecycle, and project tab
navigation. Behavior here is independent of any feature built inside it.

See the foundations for [constraints](../../constraints.md) (C-\*),
[cross-cutting requirements](../../cross-cutting.md) (X-\*), and
[definitions](../../definitions.md) (Workspace, Project).

## Startup

- **R-1 — Cross-platform startup.** When started on a supported platform (macOS,
  Windows, or Linux), the system shall reach a ready state. _Depends on: C-1._

## Workspaces

- **R-2 (event) — Open workspace from command line.** When the system is started
  with a workspace specified as a command-line argument, the system shall open
  that workspace.
- **R-3 (event) — Workspace launcher.** When the system is started without a
  workspace specified, the system shall present a workspace launcher offering
  (a) recent workspaces, if any, (b) opening a workspace from a file, and
  (c) creating a new workspace.
- **R-4 (ubiquitous) — Track opened workspaces.** The system shall track,
  persistently, the workspaces that have been opened. (This persists references
  to opened workspaces, independent of how each workspace itself is stored per
  C-3.)
- **R-5 (unwanted) — Unopenable workspace.** If a specified workspace cannot be
  opened (missing, corrupt, or invalid — whether from a command-line argument or
  from opening a file), then the system shall inform the user and continue as if
  no workspace had been specified.

## Projects

- **R-6 (ubiquitous) — Active projects as tabs.** The system shall present the
  active projects of the open workspace as navigable tabs (analogous to browser
  tabs). A project is active exactly when its tab is open.

## Open seeds (not yet specified)

To be elaborated as feature work proceeds:

- **Workspace composition** — creating a workspace, adding/removing projects,
  activating/deactivating projects (R-3c introduces creation).
- **Keyboard model** — focus order, shortcut scheme, command palette (drives X-1).
- **Shortcut discoverability** — making keyboard operations discoverable.
- **In-workspace vs. side-stored data** — what is committed (C-3) vs. stored
  locally (e.g. agent conversations).
