# Workspaces

Feature code: **`WS`** (requirement IDs `RWS-*`; see [conventions](../../conventions.md)).

The **Workspaces** feature owns the application-level lifecycle of a
[workspace](../../definitions.md): resolving which workspace to open at startup
(command-line argument or the launcher), tracking the workspaces that have been
opened, and degrading gracefully when a requested workspace cannot be opened.

- [Description](description.md) — how workspace lifecycle works (prose, mental model).
- [Requirements](requirements.md) — behavioral requirements (`RWS-*`) and open seeds.
- Acceptance scenarios — _TBD._

The launcher that RWS-2 presents is elaborated by the
[Workspace launcher](../workspace-launcher/_index.md) feature. Honors the global
[constraints](../../constraints.md) (notably C-3 text storage),
[cross-cutting requirements](../../cross-cutting.md), and
[definitions](../../definitions.md).
