Feature: Shell startup
  As a user launching Stoa
  I want the application to start and become ready
  So that I can begin working

  # Validates RSH-1 — Cross-platform startup.
  Scenario: Application reaches ready state on launch
    Given the Stoa application is launched
    When the main window opens
    Then the main window is visible
    And the shell signals it has reached a ready state
