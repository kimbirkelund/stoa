# Definitions

Shared domain vocabulary used across all features.

- **Workspace.** A named set of projects (folders/repositories) that together
  constitute one instance of the system. A workspace consists of a number of
  projects, each either **active** or **inactive**. Stored as a
  version-control-friendly text file (see [C-3](constraints.md)).
- **Project.** A folder, with associated settings stored in the workspace, plus
  associated agent conversations and other dev-workflow data (TBD). A project is
  **active** when open as a tab and **inactive** otherwise.
