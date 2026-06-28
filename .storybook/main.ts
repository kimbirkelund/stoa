import type { StorybookConfig } from '@storybook/react-vite'

// Stories live next to the renderer components they document. Storybook runs in
// a browser (Chromium, matching Electron's renderer) — components must stay free
// of direct Electron/IPC access so the showcase can render them in isolation.
const config: StorybookConfig = {
  stories: ['../src/renderer/src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-vitest'],
  framework: '@storybook/react-vite'
}
export default config
