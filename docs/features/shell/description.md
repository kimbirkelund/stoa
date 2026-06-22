# Shell — Description

The Shell is the foundational layer of Stoa: the desktop application that hosts
every other feature. It owns the window, the application lifecycle, and the
top-level navigation model. Whatever features are built inside Stoa, they run
within the Shell and rely on the behaviors described here.

## What the Shell is responsible for

- **Application lifecycle** — launching the app and bringing it to a ready state
  on macOS, Windows, and Linux (R-1).
- **Workspace launching** — deciding, at startup, whether to open a workspace
  directly (command-line argument, R-2) or present the workspace launcher
  (R-3), and degrading gracefully when a workspace cannot be opened (R-5).
- **Workspace history** — persistently tracking previously opened workspaces so
  the launcher can offer recent ones (R-4).
- **Project navigation** — presenting the open workspace's active projects as
  browser-like tabs and letting the user move between them (R-6).

## What the Shell is _not_ responsible for

- The contents and behavior of individual projects (terminal sessions, file
  rendering, agent conversations) — those belong to feature areas hosted inside
  a project tab.
- Workspace composition (creating workspaces, adding/removing/activating
  projects) beyond the launcher's create entry point — tracked as an open seed.

## Mental model

```
Application (Shell)
└── Workspace (one open at a time)
    └── Projects
        ├── active   → shown as tabs, navigable
        └── inactive → known to the workspace, not shown
```

Startup resolves to one of two states: a workspace is open (tabs visible), or
the workspace launcher is shown. The launcher is also the fallback whenever a
requested workspace cannot be opened.

## Conventions

The Shell must honor the global [constraints](../../constraints.md) and
[cross-cutting requirements](../../cross-cutting.md): GUI-only (C-2), full
keyboard navigability (X-1), mouse support (X-2), and version-control-friendly
workspace storage (C-3).
