Feature: Workspace launcher
  As a user who starts Stoa without specifying a workspace
  I want a launcher to appear
  So that I can select an existing workspace or create a new one

  # Validates RWS-2: when no workspace is specified the launcher is presented.
  Scenario: Launcher appears when no workspace is specified
    Given the Stoa application is launched without a workspace
    When the main window opens
    Then the workspace launcher is shown

  # RWL-1 — selecting an existing workspace opens it (real load from the config dir).
  Scenario: Selecting an existing workspace opens it
    Given an existing workspace named "personal"
    And the Stoa application is launched without a workspace
    When the user selects the workspace "personal" from the launcher
    Then the workspace "personal" is opened

  # RWL-2 — creating a workspace persists it and opens it.
  Scenario: Creating a new workspace opens it
    Given the Stoa application is launched without a workspace
    When the user creates a workspace named "work"
    Then the workspace "work" is opened
    And a workspace file named "work" exists

  # NOTE: invalid-name (RWL-4) and duplicate-name (RWL-3) rejection are owned by
  # the component tier (WorkspaceLauncher.stories.tsx) — the launcher blocks them
  # before any IPC call — and the rule itself by the unit tier
  # (src/shared/workspace.test.ts). They are deliberately not re-tested here; the
  # system tier covers the real persist/open effects only. See docs/testing.md.
