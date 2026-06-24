import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { WorkspaceLauncher } from './WorkspaceLauncher'

const meta = {
  title: 'Launcher/WorkspaceLauncher',
  component: WorkspaceLauncher,
  args: { onSelect: fn(), onCreate: fn() },
  parameters: { layout: 'centered' }
} satisfies Meta<typeof WorkspaceLauncher>

export default meta
type Story = StoryObj<typeof meta>

// First run: no workspaces exist yet.
export const Empty: Story = {
  args: { workspaces: [] }
}

// Returning user: a few existing workspaces to choose from.
export const WithWorkspaces: Story = {
  args: { workspaces: ['personal', 'work', 'project-stoa'] }
}
