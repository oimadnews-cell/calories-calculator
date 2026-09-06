import type { Meta, StoryObj } from '@storybook/react-vite'
import RecipeCard from './RecipeCard'
import { RECIPES } from '../../data/recipes.ts'
import { FOODS } from '../../data/foods.ts'
import { recipeReferenceCalories } from '../../lib/recipes.ts'
import { targetRelationship } from '../../lib/calories.ts'
import { formatTargetRelationship } from '../../lib/formatTargetRelationship.ts'

const meta = {
  title: 'Design System/Recipes/RecipeCard',
  component: RecipeCard,
  decorators: [
    (Story) => (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof RecipeCard>

export default meta
type Story = StoryObj<typeof meta>

const chickenRiceBowl = RECIPES.find((recipe) => recipe.id === 'chicken-rice-bowl')!
const creamyChickenPasta = RECIPES.find((recipe) => recipe.id === 'creamy-chicken-pasta')!

/** No meal target is set — calories are shown, fit is never implied. */
export const NoTarget: Story = {
  args: {
    recipe: chickenRiceBowl,
    referenceCalories: recipeReferenceCalories(chickenRiceBowl, FOODS),
    relationshipText: formatTargetRelationship(
      targetRelationship(recipeReferenceCalories(chickenRiceBowl, FOODS), null),
    ),
    onSelect: () => {},
  },
}

/** A target is set and this recipe's reference serving is at or under it. */
export const WithinTarget: Story = {
  args: {
    recipe: chickenRiceBowl,
    referenceCalories: recipeReferenceCalories(chickenRiceBowl, FOODS),
    relationshipText: formatTargetRelationship(
      targetRelationship(recipeReferenceCalories(chickenRiceBowl, FOODS), 600),
    ),
    onSelect: () => {},
  },
}

/** A target is set and this recipe's reference serving is over it — shown neutrally, never as a rejection. */
export const AboveTarget: Story = {
  args: {
    recipe: creamyChickenPasta,
    referenceCalories: recipeReferenceCalories(creamyChickenPasta, FOODS),
    relationshipText: formatTargetRelationship(
      targetRelationship(recipeReferenceCalories(creamyChickenPasta, FOODS), 600),
    ),
    onSelect: () => {},
  },
}
