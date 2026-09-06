/**
 * Pure meal-composition logic — no React. Adding a food selection to the
 * current composition.
 */

import type { FoodItem } from '../data/foods.ts'

export interface MealEntry {
  food: FoodItem
  quantityGrams: number
}

/**
 * Add a food selection to the composition. If the food is already present,
 * merges into that entry by increasing its quantity by `quantityGrams` —
 * one row per food item. Otherwise appends a new entry at that quantity.
 * Defaults to the food's own default portion (the direct-search case);
 * callers seeding from a recipe pass that ingredient's own quantity instead.
 */
export function addFoodToMeal(
  entries: MealEntry[],
  food: FoodItem,
  quantityGrams: number = food.defaultPortionGrams,
): MealEntry[] {
  const existingIndex = entries.findIndex((entry) => entry.food.id === food.id)

  if (existingIndex === -1) {
    return [...entries, { food, quantityGrams }]
  }

  return entries.map((entry, index) =>
    index === existingIndex ? { ...entry, quantityGrams: entry.quantityGrams + quantityGrams } : entry,
  )
}

/** Set a food's quantity directly (e.g. from the Quantity Editor). Negative input is clamped to 0. */
export function setMealItemQuantity(entries: MealEntry[], foodId: string, quantityGrams: number): MealEntry[] {
  const safeQuantity = Math.max(0, quantityGrams)

  return entries.map((entry) =>
    entry.food.id === foodId ? { ...entry, quantityGrams: safeQuantity } : entry,
  )
}

/** Remove a food item from the composition entirely. */
export function removeMealItem(entries: MealEntry[], foodId: string): MealEntry[] {
  return entries.filter((entry) => entry.food.id !== foodId)
}
