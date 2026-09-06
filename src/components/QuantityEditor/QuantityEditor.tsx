import { useState } from 'react'
import ActionButton from '../ActionButton/ActionButton'
import type { FoodItem } from '../../data/foods.ts'
import styles from './QuantityEditor.module.css'

interface QuantityEditorProps {
  food: FoodItem
  quantityGrams: number
  onQuantityChange: (quantityGrams: number) => void
  onRemove: () => void
  onDone: () => void
}

function QuantityEditor({ food, quantityGrams, onQuantityChange, onRemove, onDone }: QuantityEditorProps) {
  const [rawValue, setRawValue] = useState(String(quantityGrams))
  const inputId = `quantity-${food.id}`

  const handleChange = (value: string) => {
    setRawValue(value)

    const parsed = Number(value)
    if (value.trim() !== '' && Number.isFinite(parsed) && parsed >= 0) {
      onQuantityChange(parsed)
    }
  }

  return (
    <li className={styles.editor}>
      <span className={styles.name}>{food.name}</span>

      <label className={styles.quantityLabel} htmlFor={inputId}>
        Quantity
      </label>
      <div className={styles.quantityRow}>
        <input
          id={inputId}
          type="number"
          inputMode="decimal"
          min={0}
          className={styles.quantityInput}
          value={rawValue}
          onChange={(event) => handleChange(event.target.value)}
          autoFocus
        />
        <span className={styles.unit}>g</span>
      </div>

      <div className={styles.actions}>
        <ActionButton variant="secondary" onClick={onRemove}>
          Remove item
        </ActionButton>
        <ActionButton variant="primary" onClick={onDone}>
          Done
        </ActionButton>
      </div>
    </li>
  )
}

export default QuantityEditor
