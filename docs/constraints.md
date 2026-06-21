# Constraints

Non-functional constraints that inform architecture and tech-stack selection.
Constraints have no direct acceptance test.

- **C-1 — Cross-platform portability.** The system shall be written such that it
  can support macOS, Windows, and Linux. It shall not depend on platform-locked
  technology that would preclude running on any of these three platforms.
- **C-2 — Graphical user interface.** The system shall provide a graphical user
  interface (GUI) as its sole user interface, rather than a terminal/text-based
  interface.
- **C-3 — Version-control-friendly workspace storage.** The system shall store
  workspaces in a text-based file format suitable for version control.
