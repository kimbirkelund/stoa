# Shell — Acceptance scenarios

BDD scenarios (Gherkin) that specify the Shell's behavior. These are the
human-readable source of intent; the executable Playwright versions live under
`tests/acceptance/shell/`.

| Scenario file | Validates | Status |
|---|---|---|
| [startup.feature](startup.feature) | R-1 — Cross-platform startup | Designed (not yet executable) |

## Definition of "ready state" (R-1)

The shell has reached a ready state when:

1. the main window is **shown** (visible, not merely created), and
2. the app root has rendered a known ready marker: `[data-testid="shell-ready"]`.

## Notes

- **Ready marker** is a `data-testid` rather than UI copy, to decouple the test
  from wording.
- **Cross-platform** is realized as a CI matrix (macOS/Windows/Linux) running
  the same scenario — not as separate scenarios. Linux CI requires a headless
  display (e.g. `xvfb`) for Electron.
- No time bound is asserted; "reaches ready" has no performance requirement.
