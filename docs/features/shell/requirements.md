# Shell — Requirements

The **Shell** is the application platform that hosts all other features: the
window and application lifecycle. Workspace lifecycle and project navigation are
their own features (see below); the Shell only brings the application to a ready
state in which they run.

See the foundations for [constraints](../../constraints.md) (C-\*),
[cross-cutting requirements](../../cross-cutting.md) (X-\*), and
[definitions](../../definitions.md) (Workspace, Project).

## Startup

- **RSH-1 — Cross-platform startup.** When started on a supported platform (macOS,
  Windows, or Linux), the system shall reach a ready state. _Depends on: C-1._

## Hosted features

Behavior formerly listed here has moved to dedicated features:

- **[Workspaces](../workspaces/_index.md)** (`RWS-*`) — startup resolution
  (command line / launcher), history, and unopenable-workspace handling.
- **[Workspace launcher](../workspace-launcher/_index.md)** (`RWL-*`) — the
  launcher's select / open / create branches.
- **[Projects](../projects/_index.md)** (`RPJ-*`) — active projects as tabs.

## Open seeds (not yet specified)

To be elaborated as feature work proceeds:

- **Keyboard model** — focus order, shortcut scheme, command palette (drives X-1).
- **Shortcut discoverability** — making keyboard operations discoverable.
