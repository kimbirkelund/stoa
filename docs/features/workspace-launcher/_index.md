# Workspace launcher

Feature code: **`WL`** (requirement IDs `RWL-*`; see [conventions](../../conventions.md)).

The **Workspace launcher** is the entry surface presented at startup when no
workspace is specified ([RWS-2](../workspaces/requirements.md)). It elaborates the
two branches RWS-2 names into testable behavior: **select** an existing workspace
by name, or **create** a new one. Both branches operate over the workspaces the
app stores by name in its configuration directory
([RWS-3](../workspaces/requirements.md)).

- [Description](description.md) — how the launcher works (prose, mental model).
- [Requirements](requirements.md) — behavioral requirements (`RWL-*`) and open seeds.
- [Acceptance scenarios](acceptance/_index.md) — BDD scenarios. The walking-skeleton
  placeholder scenario is executable; RWL-1..4 are `@wip` until the launcher UI exists.

Honors the global [constraints](../../constraints.md) (notably C-3 text storage),
[cross-cutting requirements](../../cross-cutting.md) (X-1 keyboard), and
[definitions](../../definitions.md).
