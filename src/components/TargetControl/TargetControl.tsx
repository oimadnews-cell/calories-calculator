import { useState } from 'react'
import ActionButton from '../ActionButton/ActionButton'
import styles from './TargetControl.module.css'

interface TargetControlProps {
  target: number | null
  onSetTarget: (target: number) => void
  onClearTarget: () => void
}

function TargetControl({ target, onSetTarget, onClearTarget }: TargetControlProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftValue, setDraftValue] = useState('')

  const startEditing = () => {
    setDraftValue(target !== null ? String(target) : '')
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
  }

  const parsedDraft = Number(draftValue)
  const isDraftValid = draftValue.trim() !== '' && Number.isFinite(parsedDraft) && parsedDraft > 0

  const confirmTarget = () => {
    if (!isDraftValid) {
      return
    }
    onSetTarget(parsedDraft)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className={styles.controlExpanded}>
        <span className={styles.label}>Meal target</span>

        <label className={styles.inputLabel} htmlFor="meal-target-input">
          Target
        </label>
        <div className={styles.editRow}>
          <input
            id="meal-target-input"
            type="number"
            inputMode="decimal"
            min={0}
            className={styles.input}
            value={draftValue}
            onChange={(event) => setDraftValue(event.target.value)}
            autoFocus
          />
          <span className={styles.unit}>kcal</span>
        </div>

        <div className={styles.actions}>
          <ActionButton variant="secondary" onClick={cancelEditing}>
            Cancel
          </ActionButton>
          <ActionButton variant="primary" onClick={confirmTarget} disabled={!isDraftValid}>
            Set target
          </ActionButton>
        </div>
      </div>
    )
  }

  if (target === null) {
    return (
      <div className={styles.control}>
        <span className={styles.label}>Meal target</span>
        <ActionButton variant="secondary" onClick={startEditing}>
          + Set target
        </ActionButton>
      </div>
    )
  }

  return (
    <div className={styles.controlExpanded}>
      <span className={styles.label}>Meal target</span>
      <div className={styles.valueRow}>
        <span className={styles.value}>{target} kcal</span>
        <div className={styles.actions}>
          <ActionButton variant="secondary" onClick={startEditing}>
            Edit
          </ActionButton>
          <ActionButton variant="secondary" onClick={onClearTarget}>
            Clear
          </ActionButton>
        </div>
      </div>
    </div>
  )
}

export default TargetControl
