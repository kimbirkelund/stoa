import type { Preview, Decorator } from '@storybook/react-vite'
import '../src/renderer/src/theme.css'

// Theme toolbar (X-3): switch the active theme token set for every story, so
// components can be reviewed against light and dark without code changes.
const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string | undefined) ?? 'light'
  return (
    <div
      data-theme={theme}
      style={{
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        padding: 'var(--space-4)',
        minHeight: '100vh',
        fontFamily: 'var(--font-sans)'
      }}
    >
      <Story />
    </div>
  )
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Active theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'todo' }
  }
}

export default preview
