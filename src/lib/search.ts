/**
 * Pure search logic — no React, no rendering. Case-insensitive substring
 * match against the local food dataset (src/data/foods.ts).
 */

import type { FoodItem } from '../data/foods.ts'

export function searchFoods(foods: FoodItem[], query: string): FoodItem[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (normalizedQuery === '') {
    return []
  }

  return foods.filter((food) => food.name.toLowerCase().includes(normalizedQuery))
}
