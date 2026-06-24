# Workspaces — Requirements

Application-level workspace lifecycle (feature code `WS`): how a workspace is
resolved at startup, tracked across runs, and handled when it cannot be opened.

See [conventions](../../conventions.md) for the ID scheme and
[foundations](../../_index.md#foundations) for `C-*`/`X-*`. The launcher RWS-2
presents is elaborated by the [Workspace launcher](../workspace-launcher/_index.md)
feature (`RWL-*`).

## Resolving a workspace at startup

- **RWS-1 (event) — Open workspace from command line.** When the system is started
  with a workspace specified as a command-line argument, the system shall open
  that workspace.
- **RWS-2 (event) — Workspace launcher.** When the system is started without a
  workspace specified, the system shall present a workspace launcher offering
  (a) recent workspaces, if any, (b) opening a workspace from a file, and
  (c) creating a new workspace.

## History

- **RWS-3 (ubiquitous) — Track opened workspaces.** The system shall track,
  persistently, the workspaces that have been opened. (This persists references
  to opened workspaces, independent of how each workspace itself is stored per
  C-3.)

## Failure handling

- **RWS-4 (unwanted) — Unopenable workspace.** If a specified workspace cannot be
  opened (missing, corrupt, or invalid — whether from a command-line argument or
  from opening a file), then the system shall inform the user and continue as if
  no workspace had been specified.

## Open seeds (not yet specified)

To be elaborated as feature work proceeds:

- **Workspace composition** — creating a workspace, adding/removing projects,
  activating/deactivating projects (RWS-2c introduces creation; elaborated in the
  Workspace launcher feature).
- **In-workspace vs. side-stored data** — what is committed (C-3) vs. stored
  locally (e.g. agent conversations).
