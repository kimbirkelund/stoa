# Workspaces — Requirements

Application-level workspace lifecycle (feature code `WS`): how a workspace is
resolved at startup, tracked across runs, and handled when it cannot be opened.

See [conventions](../../conventions.md) for the ID scheme and
[foundations](../../_index.md#foundations) for `C-*`/`X-*`. The launcher RWS-2
presents is elaborated by the [Workspace launcher](../workspace-launcher/_index.md)
feature (`RWL-*`).

## Resolving a workspace at startup

- **RWS-1 (event) — Open workspace by name from command line.** When the system is
  started with a workspace **name** as a command-line argument, the system shall
  open the workspace stored under that name.
- **RWS-2 (event) — Workspace launcher.** When the system is started without a
  workspace specified, the system shall present a workspace launcher offering
  (a) the existing workspaces to select from, and (b) creating a new workspace.

## Storage

- **RWS-3 (ubiquitous) — Persist workspaces by name.** The system shall store
  workspaces persistently in its application-managed configuration directory (C-3),
  each identified by a unique name, such that they remain available across
  restarts.

## Failure handling

- **RWS-4 (unwanted) — Unopenable workspace.** If a specified workspace (named on
  the command line, or selected in the launcher) cannot be opened (missing,
  corrupt, or invalid), then the system shall inform the user and continue as if
  no workspace had been specified.

## Open seeds (not yet specified)

To be elaborated as feature work proceeds:

- **Workspace composition** — adding/removing projects, activating/deactivating
  projects (creation is RWS-2b, elaborated in the Workspace launcher feature).
- **Name-based management** — renaming and deleting stored workspaces.
- **In-workspace vs. side-stored data** — what is committed (C-3) vs. stored
  locally (e.g. agent conversations).
