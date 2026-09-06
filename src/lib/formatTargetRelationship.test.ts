import { test } from 'node:test'
import assert from 'node:assert/strict'

import { formatTargetRelationship } from './formatTargetRelationship.ts'
import { targetRelationship } from './calories.ts'

test('formatTargetRelationship returns null when no target is set', () => {
  assert.equal(formatTargetRelationship(targetRelationship(480, null)), null)
})

test('formatTargetRelationship reports "within" when at or under the target', () => {
  assert.equal(formatTargetRelationship(targetRelationship(480, 600)), 'within your 600 kcal target')
  assert.equal(formatTargetRelationship(targetRelationship(600, 600)), 'within your 600 kcal target')
})

test('formatTargetRelationship reports the numeric difference when above the target', () => {
  assert.equal(
    formatTargetRelationship(targetRelationship(720, 600)),
    '120 kcal above your 600 kcal target',
  )
})

test('formatTargetRelationship never contains judgmental wording', () => {
  const judgmentalWords = ['good', 'bad', 'success', 'warning', 'fail', 'pass']
  const text = formatTargetRelationship(targetRelationship(720, 600))

  for (const word of judgmentalWords) {
    assert.ok(!text?.toLowerCase().includes(word), `expected "${text}" not to contain "${word}"`)
  }
})
