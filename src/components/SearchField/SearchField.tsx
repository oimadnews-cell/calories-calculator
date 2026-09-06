import type { FoodItem } from '../../data/foods.ts'
import styles from './SearchField.module.css'

interface SearchFieldProps {
  id: string
  label: string
  placeholder?: string
  query: string
  onQueryChange: (query: string) => void
  results: FoodItem[]
  onSelectResult: (food: FoodItem) => void
}

function SearchField({
  id,
  label,
  placeholder,
  query,
  onQueryChange,
  results,
  onSelectResult,
}: SearchFieldProps) {
  const hasQuery = query.trim().length > 0
  const labelId = `${id}-label`

  return (
    <div className={styles.wrapper}>
      <h1 id={labelId} className={styles.label}>
        {label}
      </h1>
      <input
        id={id}
        type="text"
        className={styles.field}
        placeholder={placeholder}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        autoComplete="off"
        aria-labelledby={labelId}
      />

      {hasQuery && results.length > 0 && (
        <ul className={styles.results}>
          {results.map((food) => (
            <li key={food.id}>
              <button
                type="button"
                className={styles.result}
                onClick={() => onSelectResult(food)}
              >
                <span className={styles.resultName}>{food.name}</span>
                <span className={styles.resultValue}>{food.caloriesPer100g} kcal / 100g</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {hasQuery && results.length === 0 && <p className={styles.noResults}>No matches found</p>}
    </div>
  )
}

export default SearchField
