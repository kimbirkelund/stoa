# Shell — Acceptance scenarios

BDD scenarios (Gherkin) that specify the Shell's behavior. These `.feature`
files **are** the executable acceptance tests: [playwright-bdd](https://github.com/vitalets/playwright-bdd)
(`bddgen`) generates Playwright specs from them using the step definitions in
`tests/acceptance/steps/`. The Gherkin is the single source of truth — there is
no hand-written copy to drift from.

| Scenario file                      | Validates                    | Status                                                                   |
| ---------------------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| [startup.feature](startup.feature) | RSH-1 — Cross-platform startup | ✅ Executable & passing (steps: `tests/acceptance/steps/shell.steps.ts`) |

## Definition of "ready state" (RSH-1)

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
