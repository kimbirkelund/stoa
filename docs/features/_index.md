# Features

Per-feature requirements and descriptions. Each feature lives in its own
directory with an `_index.md` entry point.

Each feature has a unique **2-character code** used to form its requirement IDs
(`RF-N`); see [conventions](../conventions.md).

| Feature                                            | Code | Status      | Description                                                                                                                                          |
| -------------------------------------------------- | ---- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Shell](shell/_index.md)                           | `SH` | In progress | The application platform that hosts all features: window and lifecycle, reaching a ready state.                                                      |
| [Workspaces](workspaces/_index.md)                 | `WS` | In progress | Application-level workspace lifecycle: startup resolution (command-line name / launcher), name-based storage in the config dir, unopenable handling. |
| [Workspace launcher](workspace-launcher/_index.md) | `WL` | In progress | Selecting an existing workspace by name or creating a new one — the launcher RWS-2 presents.                                                         |
| [Projects](projects/_index.md)                     | `PJ` | In progress | Presenting the open workspace's active projects as navigable tabs.                                                                                   |

See the [foundations](../_index.md#foundations) for global constraints,
cross-cutting requirements, and definitions that all features must honor.
