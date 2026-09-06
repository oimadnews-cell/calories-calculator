/**
 * Pure calorie calculation logic — no React, no rendering, no formatting.
 * Implements the shared "food item × quantity = calories" primitive
 * (PRODUCT_BRIEF.md, UX_ARCHITECTURE.md) used by both direct composition
 * and recipe-derived composition.
 */

import type { FoodItem } from '../data/foods.ts'

export interface MealItem {
  food: FoodItem
  quantityGrams: number
}

/** food item × quantity = calories */
export function caloriesForQuantity(food: FoodItem, quantityGrams: number): number {
  return (food.caloriesPer100g * quantityGrams) / 100
}

/** Sum of every item's calories in the current composition. */
export function mealTotalCalories(items: MealItem[]): number {
  return items.reduce((total, item) => total + caloriesForQuantity(item.food, item.quantityGrams), 0)
}

/**
 * Neutral numeric relationship between a total and a target — never a
 * pass/fail judgment. `target` is `null` when the user has not set one;
 * this module never derives, suggests, or prefills a target value.
 */
export type TargetRelationship =
  | { hasTarget: false }
  | {
      hasTarget: true
      target: number
      total: number
      percentOfTarget: number
      differenceFromTarget: number
    }

export function targetRelationship(totalCalories: number, target: number | null): TargetRelationship {
  if (target === null) {
    return { hasTarget: false }
  }

  return {
    hasTarget: true,
    target,
    total: totalCalories,
    percentOfTarget: target === 0 ? 0 : (totalCalories / target) * 100,
    differenceFromTarget: totalCalories - target,
  }
}
