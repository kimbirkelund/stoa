# Workspace launcher — Acceptance scenarios

BDD scenarios (Gherkin) specifying the launcher's behavior. These `.feature`
files **are** the executable acceptance tests: [playwright-bdd](https://github.com/vitalets/playwright-bdd)
(`bddgen`) generates Playwright specs from them using the step definitions in
`tests/acceptance/steps/`.

| Scenario                                     | Validates | Status                                               |
| -------------------------------------------- | --------- | ---------------------------------------------------- |
| Launcher appears when no workspace specified | RWS-2     | ✅ Executable (walking skeleton: placeholder dialog) |
| Selecting an existing workspace opens it     | RWL-1     | 🚧 `@wip` — excluded until the launcher UI is built  |
| Creating a new workspace opens it            | RWL-2     | 🚧 `@wip`                                            |
| Duplicate name is rejected                   | RWL-3     | 🚧 `@wip`                                            |
| Invalid name is rejected                     | RWL-4     | 🚧 `@wip`                                            |

## Walking skeleton

The first milestone is only that the launcher **surface** appears (a placeholder
dialog reading "workspace launcher goes here", marked
`[data-testid="workspace-launcher"]`). This wires up the launcher into Shell
startup and the test harness. The real select/create UI — and the `@wip`
scenarios above — follow once Storybook is in place.

## Notes

- `@wip` scenarios are excluded from generation via `tags: 'not @wip'` in
  `playwright.config.ts`, so their not-yet-defined steps do not fail the suite.
- The launcher surface is identified by a `data-testid`, not UI copy, to decouple
  the test from wording.
