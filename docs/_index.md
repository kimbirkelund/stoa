# Stoa — Documentation

Stoa is an agentic development environment. Requirements are written in EARS
syntax to guide which feature to work on and to generate BDD-style acceptance
tests, which are made executable and used as the basis for coding (see
[README](../README.md)).

## Documentation convention

Every documentation directory has an `_index.md` that introduces the section
and links its contents. Leaf content lives in sibling files. **To understand a
section, read its `_index.md` first.**

## Foundations

Global rules that apply across all features:

- [Constraints](constraints.md) — non-functional constraints (C-*) that inform
  architecture and tech-stack selection.
- [Cross-cutting requirements](cross-cutting.md) — behavioral requirements (X-*)
  that apply to every feature.
- [Definitions](definitions.md) — shared domain vocabulary (Workspace, Project).

## Features

See [features](features/) for the feature catalogue and per-feature
requirements.

## Conventions

- Each requirement has a stable ID. Behavioral requirements (R-*, X-*) drive
  acceptance tests; constraints (C-*) have no direct acceptance test.
- Feature-specific behavioral requirements live under `docs/features/<name>/`.
