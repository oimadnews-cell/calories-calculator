import type { Meta, StoryObj } from '@storybook/react-vite'
import FoodItemRow from './FoodItemRow'
import { FOODS } from '../../data/foods.ts'
import { caloriesForQuantity } from '../../lib/calories.ts'

const meta = {
  title: 'Design System/Food/FoodItemRow',
  component: FoodItemRow,
  decorators: [
    (Story) => (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof FoodItemRow>

export default meta
type Story = StoryObj<typeof meta>

const chickenBreast = FOODS.find((food) => food.id === 'chicken-breast')!

/** A typical row — short name, everyday quantity and calorie values. */
export const Default: Story = {
  args: {
    food: chickenBreast,
    quantityGrams: chickenBreast.defaultPortionGrams,
    calories: caloriesForQuantity(chickenBreast, chickenBreast.defaultPortionGrams),
    onSelect: () => {},
  },
}

/** A long food name, proving the row truncates with an ellipsis instead of overflowing at 320px. */
export const LongName: Story = {
  args: {
    food: {
      ...chickenBreast,
      name: 'Grilled Chicken Breast with Herbs and Lemon, Family Recipe',
    },
    quantityGrams: 200,
    calories: caloriesForQuantity(chickenBreast, 200),
    onSelect: () => {},
  },
}
