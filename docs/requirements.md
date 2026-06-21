# Stoa — Requirements

Requirements in EARS syntax. Used to guide feature selection and to generate
BDD-style acceptance tests, which are made executable and used as the basis for
coding (see [README](../README.md)).

Each requirement has a stable ID. Behavioral requirements drive acceptance
tests. Constraints inform architecture and tech-stack selection and have no
direct acceptance test.

## Constraints (non-functional)

- **C-1 — Cross-platform portability.** The system shall be written such that it
  can support macOS, Windows, and Linux. It shall not depend on platform-locked
  technology that would preclude running on any of these three platforms.
- **C-2 — Graphical user interface.** The system shall provide a graphical user
  interface (GUI) as its sole user interface, rather than a terminal/text-based
  interface.
- **C-3 — Version-control-friendly workspace storage.** The system shall store
  workspaces in a text-based file format suitable for version control.

## Behavioral requirements

### Deferred

Recorded now, to be made testable when a target platform is actively supported.

- **R-1 (deferred) — Cross-platform startup.** When started on a supported
  platform (macOS, Windows, or Linux), the system shall reach a ready state.
  _Depends on: C-1._

## Cross-cutting requirements

Apply to every feature, not just one.

- **X-1 (ubiquitous) — Full keyboard navigability.** The system shall be fully
  keyboard-navigable: every operation shall be performable using the keyboard
  alone, except for the rare operation that is inherently graphical in nature.
  Any such exemption shall be explicitly justified. Selection of non-editable
  text is **not** a valid exemption — it shall be keyboard-operable.
- **X-2 (ubiquitous) — Mouse support.** The system shall also support the mouse
  for operations that are not inherently textual in nature.

## Definitions

- **Workspace.** A named set of projects (folders/repositories) that together
  constitute one instance of the system. A workspace consists of a number of
  projects, each either **active** or **inactive**. Stored as a
  version-control-friendly text file (see C-3).
- **Project.** A folder, with associated settings stored in the workspace, plus
  associated agent conversations and other dev-workflow data (TBD). A project is
  **active** when open as a tab and **inactive** otherwise.

## Behavioral requirements — Workspaces

- **R-2 (event) — Open workspace from command line.** When the system is started
  with a workspace specified as a command-line argument, the system shall open
  that workspace.
- **R-3 (event) — Workspace launcher.** When the system is started without a
  workspace specified, the system shall present a workspace launcher offering
  (a) recent workspaces, if any, (b) opening a workspace from a file, and
  (c) creating a new workspace.
- **R-4 (ubiquitous) — Track opened workspaces.** The system shall track, persistently,
  the workspaces that have been opened. (This persists references to opened
  workspaces, independent of how each workspace itself is stored per C-3.)
- **R-5 (unwanted) — Unopenable workspace.** If a specified workspace cannot be
  opened (missing, corrupt, or invalid — whether from a command-line argument or
  from opening a file), then the system shall inform the user and continue as if
  no workspace had been specified.

## Behavioral requirements — Projects

- **R-6 (ubiquitous) — Active projects as tabs.** The system shall present the
  active projects of the open workspace as navigable tabs (analogous to browser
  tabs). A project is active exactly when its tab is open.
