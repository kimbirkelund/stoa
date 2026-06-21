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
