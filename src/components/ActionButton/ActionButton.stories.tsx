import type { Meta, StoryObj } from '@storybook/react-vite'
import ActionButton from './ActionButton'

const meta = {
  title: 'Design System/Actions/ActionButton',
  component: ActionButton,
} satisfies Meta<typeof ActionButton>

export default meta
type Story = StoryObj<typeof meta>

/** The single confirm-style action on a screen — accent-filled, used sparingly (e.g. "Done", "Set target"). */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Done',
  },
}

/** The default weight for most actions — outlined, ink on paper (e.g. "Find a recipe", "Edit", "Clear"). */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Find a recipe',
  },
}

/** Used when a confirm action isn't valid yet, e.g. TargetControl's "Set target" before a value is entered. */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Set target',
    disabled: true,
  },
}
