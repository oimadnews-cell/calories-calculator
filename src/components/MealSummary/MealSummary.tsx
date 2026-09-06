import type { TargetRelationship } from '../../lib/calories.ts'
import styles from './MealSummary.module.css'

interface MealSummaryProps {
  totalCalories: number
  relationship: TargetRelationship
}

function MealSummary({ totalCalories, relationship }: MealSummaryProps) {
  return (
    <div className={styles.summary}>
      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalValue}>
          <span className={styles.totalNumber}>{Math.round(totalCalories)}</span>
          <span className={styles.totalUnit}>kcal</span>
        </span>
      </div>

      {relationship.hasTarget && (
        <p className={styles.relationship}>{Math.round(relationship.percentOfTarget)}% of target</p>
      )}
    </div>
  )
}

export default MealSummary
