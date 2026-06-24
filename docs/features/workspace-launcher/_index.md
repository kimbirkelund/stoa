# Workspace launcher

Feature code: **`WL`** (requirement IDs `RWL-*`; see [conventions](../../conventions.md)).

The **Workspace launcher** is the entry surface presented at startup when no
workspace is specified ([RWS-2](../workspaces/requirements.md)). It elaborates the
three branches RWS-2 names into testable behavior: **select** a recent workspace,
**open** one from a file, or **create** a new one. Opening by any branch records
the workspace in history ([RWS-3](../workspaces/requirements.md)) so it can later
appear under recents.

- [Description](description.md) — how the launcher works (prose, mental model).
- [Requirements](requirements.md) — behavioral requirements (`RWL-*`) and open seeds.
- Acceptance scenarios — _TBD once requirements settle._

Honors the global [constraints](../../constraints.md) (notably C-3 text storage),
[cross-cutting requirements](../../cross-cutting.md) (X-1 keyboard), and
[definitions](../../definitions.md).
