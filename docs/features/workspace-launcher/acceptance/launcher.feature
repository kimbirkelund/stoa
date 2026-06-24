Feature: Workspace launcher
  As a user who starts Stoa without specifying a workspace
  I want a launcher to appear
  So that I can select an existing workspace or create a new one

  # Walking skeleton (validates RWS-2): when no workspace is specified the
  # launcher surface is presented. Initially a placeholder dialog; the real
  # select/create UI follows once Storybook is in place.
  Scenario: Launcher appears when no workspace is specified
    Given the Stoa application is launched without a workspace
    When the main window opens
    Then the workspace launcher is shown

  # The scenarios below are the agreed specification for the real launcher
  # (RWL-1..RWL-4). They are tagged @wip and excluded from generation until the
  # launcher UI is built; their step wording will be refined against that UI.

  @wip
  Scenario: Selecting an existing workspace opens it
    # RWL-1
    Given an existing workspace named "personal"
    And the Stoa application is launched without a workspace
    When the user selects the workspace "personal" from the launcher
    Then the workspace "personal" is opened

  @wip
  Scenario: Creating a new workspace opens it
    # RWL-2
    Given the Stoa application is launched without a workspace
    When the user creates a workspace named "work"
    Then a new empty workspace "work" is created
    And the workspace "work" is opened

  @wip
  Scenario: Creating a workspace with a duplicate name is rejected
    # RWL-3 — duplicate names are compared case-insensitively
    Given an existing workspace named "work"
    And the Stoa application is launched without a workspace
    When the user creates a workspace named "Work"
    Then the launcher reports a duplicate-name error
    And the existing workspace "work" is not overwritten

  @wip
  Scenario Outline: Creating a workspace with an invalid name is rejected
    # RWL-4 — name must match ^[a-zA-Z][a-zA-Z0-9_-]*$
    Given the Stoa application is launched without a workspace
    When the user creates a workspace named "<name>"
    Then the launcher reports an invalid-name error
    And no workspace is created

    Examples:
      | name      |
      | 1abc      |
      | has space |
      | bad!      |
