import type { FoodItem } from '../../data/foods.ts'
import styles from './FoodItemRow.module.css'

interface FoodItemRowProps {
  food: FoodItem
  quantityGrams: number
  calories: number
  onSelect: () => void
}

function FoodItemRow({ food, quantityGrams, calories, onSelect }: FoodItemRowProps) {
  return (
    <li>
      <button type="button" className={styles.row} onClick={onSelect}>
        <span className={styles.primaryLine}>
          <span className={styles.name}>{food.name}</span>
          <span className={styles.calories}>{Math.round(calories)} kcal</span>
        </span>
        <span className={styles.quantity}>{quantityGrams} g</span>
      </button>
    </li>
  )
}

export default FoodItemRow
