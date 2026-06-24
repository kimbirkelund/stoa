---
name: tag-release
description: Create and push a release tag for this repo. Use whenever the user asks to "tag", "cut a tag", "tag a release", "tag a version", or otherwise create a git tag for a release. Tags here are managed by Nerdbank.GitVersioning — never hand-write them.
---

# Tagging a release

This repo versions with Nerdbank.GitVersioning (nbgv). Do **not** hand-write
version tags — let nbgv create them so the name matches `version.json` + git
height and the `releases/v{version}` format that the Release workflow and
`publicReleaseRefSpec` expect.

When asked to tag:

1. Ensure the commit to tag is the current `HEAD` and is already pushed.
2. Create the tag with nbgv:
   ```sh
   dotnet nbgv tag
   ```
   It prints the created tag name, e.g.
   `releases/v1.0.10-alpha tag created at <sha>.`
3. Push that exact tag:
   ```sh
   git push origin <tag-name>
   ```

Pushing a `releases/v*` tag triggers the Release workflow, which builds and
publishes installers to a GitHub Release.

To preview the tag name without creating it: `dotnet nbgv tag --what-if`.
