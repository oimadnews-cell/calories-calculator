import type { Meta, StoryObj } from '@storybook/react-vite'
import TargetControl from './TargetControl'

const meta = {
  title: 'Design System/Inputs/TargetControl',
  component: TargetControl,
} satisfies Meta<typeof TargetControl>

export default meta
type Story = StoryObj<typeof meta>

/**
 * No target set yet. Click "+ Set target" in the canvas to reach the
 * editing state — it's the component's own internal state, not a prop,
 * so it's reachable live rather than as a separate story.
 */
export const Unset: Story = {
  args: {
    target: null,
    onSetTarget: () => {},
    onClearTarget: () => {},
  },
}

/** A target has been confirmed. "Edit" re-opens the same editing state; "Clear" returns to Unset. */
export const Set: Story = {
  args: {
    target: 600,
    onSetTarget: () => {},
    onClearTarget: () => {},
  },
}
