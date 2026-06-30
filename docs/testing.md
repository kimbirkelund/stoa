# Testing strategy

Stoa tests in three tiers. Each tier tests a different **boundary**; together they
form a pyramid (many fast unit tests, fewer component tests, few system tests).
Write tests at the **lowest tier that can prove the behavior** — push logic down
so it can be unit-tested rather than only exercised end-to-end.

## The tiers

| Tier          | Tool                                                                                                           | Environment                 | Owns                                                                            | Lives in                                                               |
| ------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Unit**      | [vitest](https://vitest.dev)                                                                                   | node, fast                  | Pure logic — no DOM, no Electron                                                | `*.test.ts(x)` colocated beside the module                             |
| **Component** | Storybook + [`@storybook/addon-vitest`](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon) | headless browser (Chromium) | A component in isolation: rendering, interactions, the props/callbacks contract | `*.stories.tsx` colocated beside the component                         |
| **System**    | [playwright-bdd](https://github.com/vitalets/playwright-bdd)                                                   | real Electron app           | End-to-end behavior with real effects (disk, IPC, windows)                      | `docs/features/**/acceptance/*.feature` + steps in `tests/acceptance/` |

## The boundary, in one line

- **Unit** — is this input/rule correct? (the logic)
- **Component** — does the component render it and call back correctly? (the UI contract)
- **System** — does the whole app actually do it? (the real effect)

A rule lives in **one** place (a pure module, unit-tested); the component imports
it and is tested only for surfacing/wiring; the system test proves the real
effect. Don't re-enumerate unit cases at the component tier, or component cases at
the system tier.

## TDD

Unit-tier logic is developed **test-first (red → green → refactor) whenever
practical** — write the failing `*.test.ts`, then the implementation. This is the
main reason to push logic into pure modules: it makes test-first cheap.

## Worked example — workspace name validation

- **Unit** (`workspace-name.test.ts`): every case of the name rule
  `^[a-zA-Z][a-zA-Z0-9_-]*$` and case-insensitive duplicate detection (RWL-3/4).
- **Component** (`WorkspaceLauncher.stories.tsx`): typing an invalid/duplicate name
  surfaces the error and does **not** call `onCreate`; a valid name calls it.
- **System** (`workspace-launcher/acceptance`): creating a workspace actually
  writes a file in the config dir and opens it.

## Authoring acceptance scenarios (`@wip`)

Write the system-tier scenarios for a feature **up front**, then implement
outside-in. Tag the not-yet-built ones `@wip`; they are excluded from generation
by `tags: 'not @wip'` in `playwright.config.ts`, so their undefined steps don't
fail the suite. Un-`@wip` each scenario as its slice lands. A placeholder
"walking skeleton" scenario (asserting only that the surface appears) is a good
first executable scenario while the real behavior is still `@wip`.

## Running

| Command                                     | Runs                                        |
| ------------------------------------------- | ------------------------------------------- |
| `./build.ps1 -DoTest`                       | all three tiers (`-Kinds All`, the default) |
| `./build.ps1 -DoTest -Kinds Unit`           | unit only                                   |
| `./build.ps1 -DoTest -Kinds Component`      | component (story) tests only                |
| `./build.ps1 -DoTest -Kinds System`         | Electron BDD acceptance only                |
| `./build.ps1 -DoTest -Kinds Unit,Component` | a subset (comma-separated)                  |

`-Kinds` accepts `All` (default), `Unit`, `Component`, `System`. The underlying
npm scripts are `test:unit`, `test:component`, and `test:acceptance`. The
component tier needs the Chromium browser binary (`npx playwright install
chromium`); `build.ps1` ensures it before running that tier.
