# How to behave

Read README.md

## Docs

Requirements live in `docs/` in EARS syntax. Every directory has an `_index.md`
— read it first. Feature requirements live under `docs/features/<name>/`.

## Testing

Three tiers (see [`docs/testing.md`](docs/testing.md)): **unit** (vitest, pure
logic), **component** (Storybook + addon-vitest, stories-as-tests in a browser),
**system** (playwright-bdd, real Electron). Test at the lowest tier that can prove
the behavior; a rule lives in one pure module, unit-tested. Develop unit-tier
logic **test-first (TDD)** whenever practical. Run with `./build.ps1 -DoTest`
(`-Kinds Unit|Component|System|All`).

`playwright` is a direct devDependency — playwright-bdd resolves it top-level;
don't drop it even though `@playwright/test` also pulls it transitively (a second
copy de-hoists it and breaks the system tier).

## Committing & Pushing

- Before committing, run `./build.ps1 -DoLint` and `./build.ps1 -DoTest`
  (builds, then runs all test tiers) and fix any failures. Never commit code
  that does not build, lint clean, and pass tests.
- Only commit if explicitly allowed by the human.
- Only push if explicitly allowed by the human.
- Use [Conventional Commits](https://www.conventionalcommits.org) (`type: subject`,
  e.g. `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`, `ci:`, `build:`),
  single-line.
- Never include yourself as co-author.

## Renovate

Renovate auto-merges non-major dependency PRs onto `main` (gated on green CI).
Always `git fetch` and rebase before pushing. When rebasing over a Renovate
commit, never revert its version bumps — keep the newer version it chose.
