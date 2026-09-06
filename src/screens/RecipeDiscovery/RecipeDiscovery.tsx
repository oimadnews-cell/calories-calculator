import ActionButton from '../../components/ActionButton/ActionButton'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import { RECIPES, type Recipe } from '../../data/recipes.ts'
import { FOODS } from '../../data/foods.ts'
import { recipeReferenceCalories } from '../../lib/recipes.ts'
import { targetRelationship } from '../../lib/calories.ts'
import { formatTargetRelationship } from '../../lib/formatTargetRelationship.ts'
import styles from './RecipeDiscovery.module.css'

interface RecipeDiscoveryProps {
  target: number | null
  onSelectRecipe: (recipe: Recipe) => void
  onBack: () => void
}

const RECIPE_IMAGES: Record<string, string> = {
  'chicken-rice-bowl': '/images/recipes/chicken-rice-bowl.jpg',
  'pasta-pomodoro': '/images/recipes/pasta-pomodoro.jpg',
  'banana-egg-breakfast': '/images/recipes/banana-egg-breakfast.jpg',
  'creamy-chicken-pasta': '/images/recipes/creamy-chicken-pasta.jpg',
}

function RecipeDiscovery({ target, onSelectRecipe, onBack }: RecipeDiscoveryProps) {
  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <ActionButton variant="secondary" className={styles.backButton} onClick={onBack}>
          ← Back
        </ActionButton>
        <h1 className={styles.title}>Find a recipe</h1>
      </header>

      <section className={styles.discoverySection}>
        {target === null && (
          <p className={styles.hint}>Set a meal target to see calorie fit for these recipes.</p>
        )}

        <ul className={styles.list}>
          {RECIPES.map((recipe) => {
            const referenceCalories = recipeReferenceCalories(recipe, FOODS)
            const relationship = targetRelationship(referenceCalories, target)

            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                referenceCalories={referenceCalories}
                relationshipText={formatTargetRelationship(relationship)}
                imageUrl={RECIPE_IMAGES[recipe.id]}
                onSelect={() => onSelectRecipe(recipe)}
              />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default RecipeDiscovery
