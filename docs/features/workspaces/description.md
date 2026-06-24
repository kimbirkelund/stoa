# Workspaces — Description

The **Workspaces** feature governs the lifecycle of a
[workspace](../../definitions.md) at the application level — independent of what
any individual workspace or project contains.

## What it is responsible for

- **Startup resolution** — deciding whether to open a workspace directly from a
  command-line workspace **name** (RWS-1) or present the launcher when none is
  specified (RWS-2).
- **Storage** — persisting workspaces in the app-managed configuration directory,
  each under a unique name, available across restarts (RWS-3). The launcher lists
  these existing workspaces for selection.
- **Failure handling** — degrading gracefully to the launcher when a requested
  workspace cannot be opened (RWS-4).

## What it is _not_ responsible for

- The launcher's branch behavior (select / create) — that is the
  [Workspace launcher](../workspace-launcher/_index.md) feature, which elaborates
  RWS-2.
- The contents of a workspace's projects — see the [Projects](../projects/_index.md)
  feature and the feature areas hosted inside a project tab.
- Workspace composition (creating, adding/removing/activating projects) beyond the
  launcher's create entry point — tracked as an open seed.

## Mental model

```
Startup
├── workspace name on command line ──> open that named workspace (RWS-1)
└── none given ─────────────────────> launcher (RWS-2)
                                         └─ fallback when open fails (RWS-4)
all workspaces persist by name in the config dir (RWS-3)
```

## Conventions

Honors GUI-only (C-2), full keyboard navigability (X-1), and
version-control-friendly workspace storage (C-3).
