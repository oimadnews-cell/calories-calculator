import type { Recipe } from '../../data/recipes.ts'
import styles from './RecipeCard.module.css'

interface RecipeCardProps {
  recipe: Recipe
  referenceCalories: number
  relationshipText: string | null
  /** Optional recipe-specific photo; falls back to the placeholder frame when unset. */
  imageUrl?: string
  onSelect: () => void
}

function RecipeCard({ recipe, referenceCalories, relationshipText, imageUrl, onSelect }: RecipeCardProps) {
  return (
    <li>
      <button type="button" className={styles.card} onClick={onSelect}>
        {imageUrl ? (
          <img className={styles.image} src={imageUrl} alt="" />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}

        <div className={styles.body}>
          <span className={styles.name}>{recipe.name}</span>

          <div className={styles.calorieBlock}>
            <span className={styles.calorieNumber}>{Math.round(referenceCalories)}</span>
            <span className={styles.calorieCaption}>
              kcal{recipe.servingLabel ? ` · ${recipe.servingLabel}` : ''}
            </span>
          </div>

          {relationshipText && <span className={styles.relationship}>{relationshipText}</span>}
        </div>
      </button>
    </li>
  )
}

export default RecipeCard
