/**
 * Mock recipe dataset — local, static fixture data only, built entirely
 * from src/data/foods.ts (no new ingredients). No calorie totals are
 * stored here: reference-serving calories are always derived from
 * ingredients + FOODS via src/lib/recipes.ts, so there is exactly one
 * source of calorie truth (src/lib/calories.ts).
 */

export interface RecipeIngredient {
  foodId: string
  quantityGrams: number
}

export interface Recipe {
  id: string
  name: string
  servingLabel: string
  ingredients: RecipeIngredient[]
}

export const RECIPES: Recipe[] = [
  {
    id: 'chicken-rice-bowl',
    name: 'Chicken & Rice Bowl',
    servingLabel: '1 serving',
    ingredients: [
      { foodId: 'chicken-breast', quantityGrams: 200 },
      { foodId: 'rice', quantityGrams: 150 },
    ],
  },
  {
    id: 'pasta-pomodoro',
    name: 'Pasta Pomodoro',
    servingLabel: '1 serving',
    ingredients: [
      { foodId: 'pasta', quantityGrams: 150 },
      { foodId: 'tomato-sauce', quantityGrams: 100 },
      { foodId: 'parmesan', quantityGrams: 15 },
    ],
  },
  {
    id: 'banana-egg-breakfast',
    name: 'Banana & Egg Breakfast',
    servingLabel: '1 serving',
    ingredients: [
      { foodId: 'banana', quantityGrams: 120 },
      { foodId: 'egg', quantityGrams: 100 },
    ],
  },
  {
    id: 'creamy-chicken-pasta',
    name: 'Creamy Chicken Pasta',
    servingLabel: '1 serving',
    ingredients: [
      { foodId: 'chicken-breast', quantityGrams: 150 },
      { foodId: 'pasta', quantityGrams: 200 },
      { foodId: 'parmesan', quantityGrams: 30 },
    ],
  },
]
