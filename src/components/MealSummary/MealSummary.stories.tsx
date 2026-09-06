import type { Meta, StoryObj } from '@storybook/react-vite'
import MealSummary from './MealSummary'
import { targetRelationship } from '../../lib/calories.ts'

const meta = {
  title: 'Design System/Summary/MealSummary',
  component: MealSummary,
} satisfies Meta<typeof MealSummary>

export default meta
type Story = StoryObj<typeof meta>

/** No meal target is set — the total is shown, fit is never implied. */
export const NoTarget: Story = {
  args: {
    totalCalories: 525,
    relationship: targetRelationship(525, null),
  },
}

/** A target is set and the current total is at or under it. */
export const WithinTarget: Story = {
  args: {
    totalCalories: 474,
    relationship: targetRelationship(474, 600),
  },
}

/** A target is set and the current total is over it — shown as a neutral number, not a failure. */
export const AboveTarget: Story = {
  args: {
    totalCalories: 720,
    relationship: targetRelationship(720, 600),
  },
}
