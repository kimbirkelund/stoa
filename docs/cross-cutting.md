# Cross-cutting requirements

Behavioral requirements that apply to every feature, not just one. These drive
acceptance tests at the feature level.

- **X-1 (ubiquitous) — Full keyboard navigability.** The system shall be fully
  keyboard-navigable: every operation shall be performable using the keyboard
  alone, except for the rare operation that is inherently graphical in nature.
  Any such exemption shall be explicitly justified. Selection of non-editable
  text is **not** a valid exemption — it shall be keyboard-operable.
- **X-2 (ubiquitous) — Mouse support.** The system shall also support the mouse
  for operations that are not inherently textual in nature.
- **X-3 (event) — Theming.** When the user selects a visual theme (at least light
  and dark), the system shall apply it consistently across all views. Components
  shall derive their colors from shared theme tokens rather than hard-coded
  values, so a theme change requires no per-component work. _Deferred: the
  theme-selection UI and its persistence are not yet specified; the token system
  (`src/renderer/src/theme.css`) is the foundation, and Storybook exposes a theme
  toolbar for reviewing components against each theme._
