import { test } from 'node:test'
import assert from 'node:assert/strict'

import { recipeIngredientsToMealEntries, recipeReferenceCalories } from './recipes.ts'
import type { FoodItem } from '../data/foods.ts'
import type { Recipe } from '../data/recipes.ts'

const foods: FoodItem[] = [
  { id: 'chicken-breast', name: 'Chicken breast', caloriesPer100g: 165, defaultPortionGrams: 200 },
  { id: 'rice', name: 'Rice', caloriesPer100g: 130, defaultPortionGrams: 150 },
]

const chickenRiceBowl: Recipe = {
  id: 'chicken-rice-bowl',
  name: 'Chicken & Rice Bowl',
  servingLabel: '1 serving',
  ingredients: [
    { foodId: 'chicken-breast', quantityGrams: 200 },
    { foodId: 'rice', quantityGrams: 150 },
  ],
}

test('recipeIngredientsToMealEntries resolves ingredients against the food dataset', () => {
  const entries = recipeIngredientsToMealEntries(chickenRiceBowl, foods)

  assert.deepEqual(entries, [
    { food: foods[0], quantityGrams: 200 },
    { food: foods[1], quantityGrams: 150 },
  ])
})

test('recipeIngredientsToMealEntries throws for an unknown food id', () => {
  const brokenRecipe: Recipe = {
    id: 'broken',
    name: 'Broken Recipe',
    servingLabel: '1 serving',
    ingredients: [{ foodId: 'does-not-exist', quantityGrams: 100 }],
  }

  assert.throws(() => recipeIngredientsToMealEntries(brokenRecipe, foods))
})

test('recipeReferenceCalories derives the total from ingredients and FOODS, matching food item x quantity = calories', () => {
  assert.equal(recipeReferenceCalories(chickenRiceBowl, foods), 525)
})
