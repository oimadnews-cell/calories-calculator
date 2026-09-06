import { test } from 'node:test'
import assert from 'node:assert/strict'

import { caloriesForQuantity, mealTotalCalories, targetRelationship } from './calories.ts'
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

test('caloriesForQuantity applies food item x quantity = calories', () => {
  assert.equal(caloriesForQuantity(chickenBreast, 200), 330)
  assert.equal(caloriesForQuantity(rice, 150), 195)
})

test('caloriesForQuantity scales linearly with quantity', () => {
  assert.equal(caloriesForQuantity(chickenBreast, 0), 0)
  assert.equal(caloriesForQuantity(chickenBreast, 100), 165)
  assert.equal(caloriesForQuantity(chickenBreast, 50), 82.5)
})

test('mealTotalCalories sums every item in the composition', () => {
  const total = mealTotalCalories([
    { food: chickenBreast, quantityGrams: 200 },
    { food: rice, quantityGrams: 150 },
  ])

  assert.equal(total, 525)
})

test('mealTotalCalories is 0 for an empty composition', () => {
  assert.equal(mealTotalCalories([]), 0)
})

test('targetRelationship is unset when no target is provided', () => {
  const relationship = targetRelationship(525, null)
  assert.deepEqual(relationship, { hasTarget: false })
})

test('targetRelationship reports a neutral numeric relationship when a target is set', () => {
  const relationship = targetRelationship(525, 600)

  assert.equal(relationship.hasTarget, true)
  if (relationship.hasTarget) {
    assert.equal(relationship.target, 600)
    assert.equal(relationship.total, 525)
    assert.equal(relationship.percentOfTarget, 87.5)
    assert.equal(relationship.differenceFromTarget, -75)
  }
})

test('targetRelationship carries no good/bad judgment even above target', () => {
  const relationship = targetRelationship(700, 600)

  assert.equal(relationship.hasTarget, true)
  if (relationship.hasTarget) {
    assert.equal(relationship.differenceFromTarget, 100)
    // Only neutral numeric fields exist on this shape — no pass/fail flag.
    assert.deepEqual(Object.keys(relationship).sort(), [
      'differenceFromTarget',
      'hasTarget',
      'percentOfTarget',
      'target',
      'total',
    ])
  }
})

test('targetRelationship guards against a zero target', () => {
  const relationship = targetRelationship(100, 0)

  assert.equal(relationship.hasTarget, true)
  if (relationship.hasTarget) {
    assert.equal(relationship.percentOfTarget, 0)
  }
})
