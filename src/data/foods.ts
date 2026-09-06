/**
 * Mock nutrition dataset — local, static fixture data only.
 * Stands in for the not-yet-decided nutrition/ingredient data source
 * (see CLAUDE.md "Not Yet Decided").
 */

export interface FoodItem {
  id: string
  name: string
  caloriesPer100g: number
  defaultPortionGrams: number
}

export const FOODS: FoodItem[] = [
  { id: 'chicken-breast', name: 'Chicken breast', caloriesPer100g: 165, defaultPortionGrams: 200 },
  { id: 'pasta', name: 'Pasta', caloriesPer100g: 131, defaultPortionGrams: 150 },
  { id: 'tomato-sauce', name: 'Tomato sauce', caloriesPer100g: 29, defaultPortionGrams: 100 },
  { id: 'parmesan', name: 'Parmesan', caloriesPer100g: 392, defaultPortionGrams: 20 },
  { id: 'rice', name: 'Rice', caloriesPer100g: 130, defaultPortionGrams: 150 },
  { id: 'banana', name: 'Banana', caloriesPer100g: 89, defaultPortionGrams: 120 },
  { id: 'egg', name: 'Egg', caloriesPer100g: 155, defaultPortionGrams: 50 },
]
