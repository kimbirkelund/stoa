# Stoa — Agentic Development Environment

## Tech stack

Built on **Electron** (Chromium + Node, TypeScript), chosen for consistent
cross-platform rendering and a mature ecosystem for hosting terminals and
rendering arbitrary file types. Core components:

- **Terminal hosting** — `@xterm/xterm` (emulator) + `node-pty` (cross-platform PTY, incl. Windows ConPTY).
- **Code & diffs** — Monaco editor.
- **Syntax highlighting** — Shiki.
- **Markdown & diagrams** — markdown-it + Mermaid (+ KaTeX for math).
- **UI framework** — React.

## Development

Requirements written in EARS syntax are used to guide which feature to work on and to generate acceptance tests in BDD style for these features. Acceptance tests are turned executable and used as basis for the coding.
