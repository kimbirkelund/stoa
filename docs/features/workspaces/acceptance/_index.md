# Workspaces — Acceptance scenarios

BDD scenarios (Gherkin) for application-level workspace lifecycle. These
`.feature` files **are** the executable acceptance tests: [playwright-bdd](https://github.com/vitalets/playwright-bdd)
generates Playwright specs from them using the step definitions in
`tests/acceptance/steps/`.

| Scenario                             | Validates | Status        |
| ------------------------------------ | --------- | ------------- |
| Opening a workspace named on the CLI | RWS-1     | ✅ Executable |

## Notes

- The startup workspace is named via a `--workspace=<name>` command-line
  argument. A name that cannot be opened falls back to the launcher; surfacing
  that to the user is RWS-4 (not yet specified as a scenario).
- Scenarios run against a throwaway config dir (`STOA_CONFIG_DIR` → the
  scenario's `--user-data-dir`), so they never touch the real `~/.config/stoa`.
