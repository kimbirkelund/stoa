# Shell

Feature code: **`SH`** (requirement IDs `RSH-*`; see [conventions](../../conventions.md)).

The **Shell** is the foundational layer of Stoa: the desktop application that
hosts every other feature. It owns the window and the application lifecycle,
bringing the app to a ready state in which the hosted features run. Workspace
lifecycle, the launcher, and project navigation are separate features.

- [Description](description.md) — how the Shell works (prose, mental model).
- [Requirements](requirements.md) — behavioral requirements (RSH-1) and open
  seeds.
- [Acceptance scenarios](acceptance/_index.md) — BDD scenarios specifying Shell
  behavior. The `.feature` files are executed directly via playwright-bdd; step
  definitions live under `tests/acceptance/steps/`.

Honors the global [constraints](../../constraints.md),
[cross-cutting requirements](../../cross-cutting.md), and
[definitions](../../definitions.md).
