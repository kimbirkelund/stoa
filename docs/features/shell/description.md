# Shell — Description

The Shell is the foundational layer of Stoa: the desktop application that hosts
every other feature. It owns the window and the application lifecycle. Whatever
features are built inside Stoa run within the Shell once it has reached a ready
state.

## What the Shell is responsible for

- **Application lifecycle** — launching the app and bringing it to a ready state
  on macOS, Windows, and Linux (RSH-1).

## What the Shell is _not_ responsible for

- **Workspace lifecycle** — startup resolution, history, and unopenable handling
  belong to the [Workspaces](../workspaces/_index.md) feature; the launcher's
  branches to the [Workspace launcher](../workspace-launcher/_index.md) feature.
- **Project navigation** — presenting projects as tabs belongs to the
  [Projects](../projects/_index.md) feature.
- The contents and behavior of individual projects (terminal sessions, file
  rendering, agent conversations) — those belong to feature areas hosted inside
  a project tab.

## Mental model

```
Application (Shell)  ── reaches ready state (RSH-1)
└── hosts: Workspaces · Workspace launcher · Projects · …
```

Once the Shell is ready, the Workspaces feature resolves startup to one of two
states: a workspace is open (Projects shows tabs), or the launcher is shown.

## Conventions

The Shell must honor the global [constraints](../../constraints.md) and
[cross-cutting requirements](../../cross-cutting.md): GUI-only (C-2), full
keyboard navigability (X-1), mouse support (X-2), and version-control-friendly
workspace storage (C-3).
