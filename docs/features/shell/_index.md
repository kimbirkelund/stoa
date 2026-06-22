# Shell

The **Shell** is the foundational layer of Stoa: the desktop application that
hosts every other feature. It owns the window, the application lifecycle, and
the top-level navigation model (workspace launching, project tabs).

- [Description](description.md) — how the Shell works (prose, mental model).
- [Requirements](requirements.md) — behavioral requirements (R-1..R-6) and open
  seeds.
- [Acceptance scenarios](acceptance/_index.md) — BDD scenarios specifying Shell
  behavior. Executable versions live under `tests/acceptance/shell/`.

Honors the global [constraints](../../constraints.md),
[cross-cutting requirements](../../cross-cutting.md), and
[definitions](../../definitions.md).
