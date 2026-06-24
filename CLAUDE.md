# How to behave

Read README.md

## Docs

Requirements live in `docs/` in EARS syntax. Every directory has an `_index.md`
— read it first. Feature requirements live under `docs/features/<name>/`.

## Committing & Pushing

- Only commit if explicitly allowed by the human.
- Only push if explicitly allowed by the human.
- Use single-line commit messages.
- Never include yourself as co-author.

## Renovate

Renovate auto-merges non-major dependency PRs onto `main` (gated on green CI).
Always `git fetch` and rebase before pushing. When rebasing over a Renovate
commit, never revert its version bumps — keep the newer version it chose.
