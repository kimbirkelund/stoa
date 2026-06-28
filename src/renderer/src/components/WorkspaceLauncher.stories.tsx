import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'
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

// RWL-1 — selecting an existing workspace calls back with its name.
export const SelectsExisting: Story = {
  args: { workspaces: ['personal', 'work'] },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'personal' }))
    await expect(args.onSelect).toHaveBeenCalledWith('personal')
  }
}

// RWL-2 — a valid name creates and clears the field.
export const CreatesWorkspace: Story = {
  args: { workspaces: [] },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByLabelText('New workspace')
    await userEvent.type(input, 'demo')
    await userEvent.click(canvas.getByRole('button', { name: 'Create' }))
    await expect(args.onCreate).toHaveBeenCalledWith('demo')
    await expect(input).toHaveValue('')
  }
}

// RWL-3 — a duplicate name (case-insensitive) is rejected, no callback.
export const RejectsDuplicate: Story = {
  args: { workspaces: ['work'] },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('New workspace'), 'Work')
    await userEvent.click(canvas.getByRole('button', { name: 'Create' }))
    await expect(await canvas.findByRole('alert')).toHaveTextContent(/already exists/i)
    await expect(args.onCreate).not.toHaveBeenCalled()
  }
}

// RWL-4 — an invalid name is rejected, no callback.
export const RejectsInvalid: Story = {
  args: { workspaces: [] },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('New workspace'), '1bad')
    await userEvent.click(canvas.getByRole('button', { name: 'Create' }))
    await expect(await canvas.findByRole('alert')).toHaveTextContent(/must start with a letter/i)
    await expect(args.onCreate).not.toHaveBeenCalled()
  }
}

// X-3 — the Create button's color comes from the theme token (--color-accent,
// #2d6cdf in the light theme = rgb(45, 108, 223)), proving theming is wired.
export const CssCheck: Story = {
  args: { workspaces: [] },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Create' })
    await expect(window.getComputedStyle(button).backgroundColor).toBe('rgb(45, 108, 223)')
  }
}
