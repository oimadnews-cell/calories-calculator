import { test } from 'node:test'
import assert from 'node:assert/strict'

import { searchFoods } from './search.ts'
import type { FoodItem } from '../data/foods.ts'

const foods: FoodItem[] = [
  { id: 'chicken-breast', name: 'Chicken breast', caloriesPer100g: 165, defaultPortionGrams: 200 },
  { id: 'rice', name: 'Rice', caloriesPer100g: 130, defaultPortionGrams: 150 },
  { id: 'banana', name: 'Banana', caloriesPer100g: 89, defaultPortionGrams: 120 },
]

test('searchFoods returns no results for an empty query', () => {
  assert.deepEqual(searchFoods(foods, ''), [])
  assert.deepEqual(searchFoods(foods, '   '), [])
})

test('searchFoods matches by case-insensitive substring', () => {
  assert.deepEqual(searchFoods(foods, 'chicken'), [foods[0]])
  assert.deepEqual(searchFoods(foods, 'RICE'), [foods[1]])
  assert.deepEqual(searchFoods(foods, 'a'), [foods[0], foods[2]])
})

test('searchFoods returns an empty list when nothing matches', () => {
  assert.deepEqual(searchFoods(foods, 'pizza'), [])
})
