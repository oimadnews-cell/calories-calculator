/**
 * Pure recipe-resolution logic — no React. Resolves a recipe's ingredients
 * against the FOODS dataset and derives reference-serving calories using
 * the existing calorie engine. No calorie value is ever stored on a Recipe
 * itself — this module is the only place that turns ingredients into
 * numbers, and it does so by reusing calories.ts, not by duplicating it.
 */

import type { FoodItem } from '../data/foods.ts'
import type { Recipe } from '../data/recipes.ts'
import type { MealEntry } from './meal.ts'
import { mealTotalCalories } from './calories.ts'

/** Resolve a recipe's ingredients into the same MealEntry shape the meal composition uses. */
export function recipeIngredientsToMealEntries(recipe: Recipe, foods: FoodItem[]): MealEntry[] {
  return recipe.ingredients.map((ingredient) => {
    const food = foods.find((candidate) => candidate.id === ingredient.foodId)

    if (!food) {
      throw new Error(`Unknown food id "${ingredient.foodId}" in recipe "${recipe.id}"`)
    }

    return { food, quantityGrams: ingredient.quantityGrams }
  })
}

/** Total calories for the recipe's original/reference serving. */
export function recipeReferenceCalories(recipe: Recipe, foods: FoodItem[]): number {
  return mealTotalCalories(recipeIngredientsToMealEntries(recipe, foods))
}
