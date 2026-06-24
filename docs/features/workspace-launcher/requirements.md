# Workspace launcher — Requirements

Behavioral requirements for the launcher (feature code `WL`). Elaborates
[RWS-2](../workspaces/requirements.md). See [conventions](../../conventions.md)
for the ID scheme and [foundations](../../_index.md#foundations) for `C-*`/`X-*`.

## Select

- **RWL-1 (event) — Select an existing workspace.** When the user selects a
  workspace by name from the launcher's list of existing workspaces, the system
  shall open that workspace.

## Create

- **RWL-2 (event) — Create a new workspace.** When the user creates a workspace
  with a valid name, the system shall create a new empty workspace under that
  name, persist it (RWS-3), and open it.
- **RWL-3 (unwanted) — Duplicate name.** If the user creates a workspace with a
  name that already exists (compared case-insensitively), then the system shall
  inform the user and not overwrite the existing workspace.
- **RWL-4 (unwanted) — Invalid name.** If the user creates a workspace with a name
  that does not match the workspace-name pattern `^[a-zA-Z][a-zA-Z0-9_-]*$` (see
  [definitions](../../definitions.md)), then the system shall inform the user and
  not create a workspace.

## Open seeds (not yet specified)

- **Name-based management from the launcher** — renaming/deleting an existing
  workspace in the list (tracked also as a Workspaces seed).
