# Workspace launcher — Description

The **Workspace launcher** is the surface shown at startup when no workspace was
specified ([RWS-2](../workspaces/requirements.md)), and the fallback whenever a
requested workspace cannot be opened ([RWS-4](../workspaces/requirements.md)).
It is the single place from which a user reaches an open workspace by one of two
branches.

## The two branches

- **Select** — choose an existing workspace by name from the list and open it.
- **Create** — name a new, empty workspace; the system persists it as a text file
  in the config dir ([C-3](../../constraints.md)) and opens it.

Both operate over the workspaces the app stores by name
([RWS-3](../workspaces/requirements.md)) — there is no pick-a-file-from-disk
branch; the app owns where workspace files live.

## Mental model

```
Launcher (no workspace open)
├── select existing ──┐
└── create new ───────┴──> open workspace ──> Projects shows tabs (RPJ-1)
```

Both branches end in the same place: a workspace is open and the Projects feature
takes over. If a branch fails (e.g. the selected workspace is unopenable, RWS-4,
or a create name already exists, RWL-3) the launcher stays visible and unchanged.

## Scope

In scope: selecting an existing workspace and creating an empty one. **Out of
scope** (open seeds): adding/removing projects and activating/deactivating them
(Workspace composition), and renaming/deleting stored workspaces (name-based
management). A freshly created workspace is empty.

## Conventions

Honors GUI-only (C-2), full keyboard navigability (X-1), mouse support (X-2), and
human-readable, version-control-friendly workspace storage (C-3).
