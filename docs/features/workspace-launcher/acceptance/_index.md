# Workspace launcher — Acceptance scenarios

BDD scenarios (Gherkin) specifying the launcher's behavior. These `.feature`
files **are** the executable acceptance tests: [playwright-bdd](https://github.com/vitalets/playwright-bdd)
(`bddgen`) generates Playwright specs from them using the step definitions in
`tests/acceptance/steps/`.

The system tier covers real persist/open effects only. Per
[docs/testing.md](../../../testing.md), input-rejection cases live one tier down:
RWL-4 (invalid) and RWL-3 (duplicate) are owned by the **component** tier
(`WorkspaceLauncher.stories.tsx`) and the rule itself by the **unit** tier
(`src/shared/workspace.test.ts`).

| Scenario                                     | Validates | Status        |
| -------------------------------------------- | --------- | ------------- |
| Launcher appears when no workspace specified | RWS-2     | ✅ Executable |
| Selecting an existing workspace opens it     | RWL-1     | ✅ Executable |
| Creating a new workspace opens it            | RWL-2     | ✅ Executable |

## Notes

- Each scenario runs against a throwaway config dir: the fixture sets
  `STOA_CONFIG_DIR` to the scenario's `--user-data-dir`, so tests never touch the
  real `~/.config/stoa`.
- Surfaces are identified by `data-testid` (`workspace-launcher`,
  `workspace-view`), not UI copy, to decouple tests from wording.
