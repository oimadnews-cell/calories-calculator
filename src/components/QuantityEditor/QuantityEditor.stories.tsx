import type { Meta, StoryObj } from '@storybook/react-vite'
import QuantityEditor from './QuantityEditor'
import { FOODS } from '../../data/foods.ts'

const meta = {
  title: 'Design System/Food/QuantityEditor',
  component: QuantityEditor,
  decorators: [
    (Story) => (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof QuantityEditor>

export default meta
type Story = StoryObj<typeof meta>

const rice = FOODS.find((food) => food.id === 'rice')!

/**
 * The one state this component has — a food item's quantity open for direct
 * numeric editing, with "Remove item" and "Done". The quantity field keeps
 * its own real local state, so typing in the canvas behaves exactly as it
 * does in the app.
 */
export const Default: Story = {
  args: {
    food: rice,
    quantityGrams: rice.defaultPortionGrams,
    onQuantityChange: () => {},
    onRemove: () => {},
    onDone: () => {},
  },
}
