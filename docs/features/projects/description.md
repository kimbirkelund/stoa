# Projects — Description

The **Projects** feature governs how the [projects](../../definitions.md) of the
open [workspace](../../definitions.md) are presented and navigated.

## What it is responsible for

- **Tab navigation** — presenting the workspace's active projects as browser-like
  tabs and letting the user move between them (RPJ-1). A project is **active**
  exactly when its tab is open, **inactive** otherwise.

## What it is _not_ responsible for

- The contents and behavior inside a project tab (terminal sessions, file
  rendering, agent conversations) — those belong to feature areas hosted inside
  the tab.
- Composition of the workspace (which projects exist, adding/removing them) — see
  the Workspace composition open seed in the
  [Workspaces](../workspaces/requirements.md) feature.

## Mental model

```
Open workspace
└── projects
    ├── active   → shown as a tab, navigable (RPJ-1)
    └── inactive → known to the workspace, no tab
```

## Conventions

Honors full keyboard navigability (X-1) and mouse support (X-2): tabs must be
both keyboard- and mouse-operable.
