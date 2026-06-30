Feature: Open workspace from the command line
  As a user launching Stoa for a specific workspace
  I want to name it on the command line
  So that it opens directly without the launcher

  # RWS-1 — a workspace named via --workspace=<name> opens directly at startup.
  Scenario: Opening a workspace named on the command line
    Given an existing workspace named "work"
    And the Stoa application is launched with workspace "work"
    Then the workspace "work" is opened
