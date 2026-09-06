/**
 * Pure text formatting for a neutral target relationship — no React.
 * Never returns judgmental wording ("good"/"bad"/"success"/"warning");
 * only reports the numeric relationship in words.
 */

import type { TargetRelationship } from './calories.ts'

export function formatTargetRelationship(relationship: TargetRelationship): string | null {
  if (!relationship.hasTarget) {
    return null
  }

  if (relationship.differenceFromTarget <= 0) {
    return `within your ${relationship.target} kcal target`
  }

  return `${Math.round(relationship.differenceFromTarget)} kcal above your ${relationship.target} kcal target`
}
