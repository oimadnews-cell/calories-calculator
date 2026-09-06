import { test } from 'node:test'
import assert from 'node:assert/strict'

import { addFoodToMeal, removeMealItem, setMealItemQuantity, type MealEntry } from './meal.ts'
import type { FoodItem } from '../data/foods.ts'

const chickenBreast: FoodItem = {
  id: 'chicken-breast',
  name: 'Chicken breast',
  caloriesPer100g: 165,
  defaultPortionGrams: 200,
}

const rice: FoodItem = {
  id: 'rice',
  name: 'Rice',
  caloriesPer100g: 130,
  defaultPortionGrams: 150,
}

test('addFoodToMeal appends a new entry for a food not yet in the meal', () => {
  const entries = addFoodToMeal([], chickenBreast)
  assert.deepEqual(entries, [{ food: chickenBreast, quantityGrams: 200 }])
})

test('addFoodToMeal merges a repeated food into its existing entry instead of duplicating the row', () => {
  const afterFirst = addFoodToMeal([], chickenBreast)
  const afterSecond = addFoodToMeal(afterFirst, chickenBreast)

  assert.equal(afterSecond.length, 1)
  assert.equal(afterSecond[0].quantityGrams, 400)
})

test('addFoodToMeal keeps separate entries for different foods', () => {
  const entries = addFoodToMeal(addFoodToMeal([], chickenBreast), rice)

  assert.equal(entries.length, 2)
  assert.deepEqual(
    entries.map((entry) => entry.food.id),
    ['chicken-breast', 'rice'],
  )
})

test('addFoodToMeal accepts an explicit quantity override instead of the food default', () => {
  const entries = addFoodToMeal([], chickenBreast, 150)
  assert.deepEqual(entries, [{ food: chickenBreast, quantityGrams: 150 }])
})

test('addFoodToMeal merges an explicit quantity override into an existing entry', () => {
  const afterFirst = addFoodToMeal([], chickenBreast, 150)
  const afterSecond = addFoodToMeal(afterFirst, chickenBreast, 50)

  assert.equal(afterSecond.length, 1)
  assert.equal(afterSecond[0].quantityGrams, 200)
})

test('addFoodToMeal does not mutate the input array or entry', () => {
  const original: MealEntry[] = [{ food: chickenBreast, quantityGrams: 200 }]
  addFoodToMeal(original, chickenBreast)

  assert.deepEqual(original, [{ food: chickenBreast, quantityGrams: 200 }])
})

test('setMealItemQuantity sets the quantity for the matching food only', () => {
  const entries: MealEntry[] = [
    { food: chickenBreast, quantityGrams: 200 },
    { food: rice, quantityGrams: 150 },
  ]

  const updated = setMealItemQuantity(entries, 'rice', 75)

  assert.deepEqual(updated, [
    { food: chickenBreast, quantityGrams: 200 },
    { food: rice, quantityGrams: 75 },
  ])
})

test('setMealItemQuantity clamps a negative quantity to 0', () => {
  const entries: MealEntry[] = [{ food: chickenBreast, quantityGrams: 200 }]
  const updated = setMealItemQuantity(entries, 'chicken-breast', -50)

  assert.equal(updated[0].quantityGrams, 0)
})

test('setMealItemQuantity does not mutate the input array', () => {
  const original: MealEntry[] = [{ food: chickenBreast, quantityGrams: 200 }]
  setMealItemQuantity(original, 'chicken-breast', 999)

  assert.deepEqual(original, [{ food: chickenBreast, quantityGrams: 200 }])
})

test('removeMealItem removes only the matching food', () => {
  const entries: MealEntry[] = [
    { food: chickenBreast, quantityGrams: 200 },
    { food: rice, quantityGrams: 150 },
  ]

  const updated = removeMealItem(entries, 'chicken-breast')

  assert.deepEqual(updated, [{ food: rice, quantityGrams: 150 }])
})

test('removeMealItem returns an empty composition when the last item is removed', () => {
  const entries: MealEntry[] = [{ food: chickenBreast, quantityGrams: 200 }]
  const updated = removeMealItem(entries, 'chicken-breast')

  assert.deepEqual(updated, [])
})
