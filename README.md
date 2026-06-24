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

## Component showcase

**Storybook** is used for designing, documenting, and reviewing React components
in isolation. It runs in a **browser** (Chromium engine, to match Electron's
renderer), not in Electron — so components must keep the Electron boundary
(preload/IPC) injectable (props/callbacks) and be free of direct IPC access, so
the showcase can render and mock them. Stories live next to their components
(`src/renderer/src/**/*.stories.tsx`). A theme toolbar (light/dark) exercises the
shared theme tokens (`src/renderer/src/theme.css`).

- `./build.ps1 -DoStorybook` — serve the showcase locally (browser, port 6006).
- `./build.ps1 -DoStorybook -Static` — build the static site to `storybook-static/`.
- On push to `main`, the [Storybook workflow](.github/workflows/storybook.yml)
  publishes the static showcase to **GitHub Pages**.

This gives a two-tier setup: component review/design in the browser via
Storybook, and **app/shell** acceptance tests in Electron (below).

## Development

Requirements written in EARS syntax are used to guide which feature to work on and to generate acceptance tests in BDD style for these features. Acceptance tests are turned executable and used as basis for the coding.

## Build / test / run

Use [`build.ps1`](build.ps1) (PowerShell) as the entry point. It installs
dependencies on demand and repairs the Electron binary if the postinstall was
gated.

```pwsh
./build.ps1 -DoInstall              # install deps + ensure Electron binary
./build.ps1 -DoBuild                # electron-vite build → out/
./build.ps1 -DoRun                  # run the app in development
./build.ps1 -DoTest                 # build + Playwright acceptance tests
./build.ps1 -DoTest -SkipBuild      # run tests against the existing build
./build.ps1 -DoTest -TestFilter ... # only tests matching a regex
./build.ps1 -DoTest -ListTests      # list matching tests without running
./build.ps1 -DoStorybook            # serve the component showcase (browser)
./build.ps1 -DoStorybook -Static    # build the static showcase site
```

Add `-Quiet` to suppress output on success, `-Verbose` for diagnostics.

## Documentation

See [`docs/`](docs/_index.md). Every documentation directory has an `_index.md`
that introduces the section and links its contents — to understand a section,
read its `_index.md` first.
