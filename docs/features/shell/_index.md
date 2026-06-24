# Shell

Feature code: **`SH`** (requirement IDs `RSH-*`; see [conventions](../../conventions.md)).

The **Shell** is the foundational layer of Stoa: the desktop application that
hosts every other feature. It owns the window, the application lifecycle, and
the top-level navigation model (workspace launching, project tabs).

- [Description](description.md) — how the Shell works (prose, mental model).
- [Requirements](requirements.md) — behavioral requirements (RSH-1..RSH-6) and open
  seeds.
- [Acceptance scenarios](acceptance/_index.md) — BDD scenarios specifying Shell
  behavior. The `.feature` files are executed directly via playwright-bdd; step
  definitions live under `tests/acceptance/steps/`.

Honors the global [constraints](../../constraints.md),
[cross-cutting requirements](../../cross-cutting.md), and
[definitions](../../definitions.md).
