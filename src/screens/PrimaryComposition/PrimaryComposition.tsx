import { useMemo, useState } from 'react'
import ActionButton from '../../components/ActionButton/ActionButton'
import SearchField from '../../components/SearchField/SearchField'
import TargetControl from '../../components/TargetControl/TargetControl'
import FoodItemRow from '../../components/FoodItemRow/FoodItemRow'
import QuantityEditor from '../../components/QuantityEditor/QuantityEditor'
import MealSummary from '../../components/MealSummary/MealSummary'
import RecipeDiscovery from '../RecipeDiscovery/RecipeDiscovery'
import { FOODS, type FoodItem } from '../../data/foods.ts'
import type { Recipe } from '../../data/recipes.ts'
import { searchFoods } from '../../lib/search.ts'
import { caloriesForQuantity, mealTotalCalories, targetRelationship } from '../../lib/calories.ts'
import { addFoodToMeal, removeMealItem, setMealItemQuantity, type MealEntry } from '../../lib/meal.ts'
import { recipeIngredientsToMealEntries } from '../../lib/recipes.ts'
import styles from './PrimaryComposition.module.css'

function PrimaryComposition() {
  const [view, setView] = useState<'composition' | 'discovery'>('composition')
  const [query, setQuery] = useState('')
  const [mealEntries, setMealEntries] = useState<MealEntry[]>([])
  const [editingFoodId, setEditingFoodId] = useState<string | null>(null)
  const [target, setTarget] = useState<number | null>(null)
  const [sourceRecipe, setSourceRecipe] = useState<Recipe | null>(null)

  const results = useMemo(() => searchFoods(FOODS, query), [query])

  const handleSelectResult = (food: FoodItem) => {
    setMealEntries((entries) => addFoodToMeal(entries, food))
    setQuery('')
  }

  const handleQuantityChange = (foodId: string, quantityGrams: number) => {
    setMealEntries((entries) => setMealItemQuantity(entries, foodId, quantityGrams))
  }

  const handleRemove = (foodId: string) => {
    setMealEntries((entries) => {
      const next = removeMealItem(entries, foodId)
      if (next.length === 0) {
        setSourceRecipe(null)
      }
      return next
    })
    setEditingFoodId(null)
  }

  const handleSelectRecipe = (recipe: Recipe) => {
    const recipeEntries = recipeIngredientsToMealEntries(recipe, FOODS)
    const seeded = recipeEntries.reduce(
      (entries, entry) => addFoodToMeal(entries, entry.food, entry.quantityGrams),
      [] as MealEntry[],
    )
    setMealEntries(seeded)
    setSourceRecipe(recipe)
    setEditingFoodId(null)
    setView('composition')
  }

  const totalCalories = mealTotalCalories(mealEntries)
  const relationship = targetRelationship(totalCalories, target)

  if (view === 'discovery') {
    return (
      <RecipeDiscovery
        target={target}
        onSelectRecipe={handleSelectRecipe}
        onBack={() => setView('composition')}
      />
    )
  }

  return (
    <main className={styles.screen}>
      <section className={styles.entrySection}>
        <SearchField
          id="food-search"
          label="What are you eating?"
          placeholder="Search food or dish..."
          query={query}
          onQueryChange={setQuery}
          results={results}
          onSelectResult={handleSelectResult}
        />
        <ActionButton
          variant="secondary"
          className={styles.findRecipeButton}
          onClick={() => setView('discovery')}
        >
          Find a recipe
        </ActionButton>
      </section>

      <section className={styles.mealSection}>
        <h2 className={styles.sectionLabel}>Your meal</h2>

        {sourceRecipe && mealEntries.length > 0 && (
          <p className={styles.recipeReference}>
            Original recipe · {sourceRecipe.name} · {sourceRecipe.servingLabel}
          </p>
        )}

        {mealEntries.length === 0 ? (
          <div className={styles.emptyState}>No items yet</div>
        ) : (
          <ul className={styles.mealList}>
            {mealEntries.map((entry) =>
              editingFoodId === entry.food.id ? (
                <QuantityEditor
                  key={entry.food.id}
                  food={entry.food}
                  quantityGrams={entry.quantityGrams}
                  onQuantityChange={(quantityGrams) => handleQuantityChange(entry.food.id, quantityGrams)}
                  onRemove={() => handleRemove(entry.food.id)}
                  onDone={() => setEditingFoodId(null)}
                />
              ) : (
                <FoodItemRow
                  key={entry.food.id}
                  food={entry.food}
                  quantityGrams={entry.quantityGrams}
                  calories={caloriesForQuantity(entry.food, entry.quantityGrams)}
                  onSelect={() => setEditingFoodId(entry.food.id)}
                />
              ),
            )}
          </ul>
        )}

        <TargetControl
          target={target}
          onSetTarget={setTarget}
          onClearTarget={() => setTarget(null)}
        />

        {mealEntries.length > 0 && (
          <MealSummary totalCalories={totalCalories} relationship={relationship} />
        )}
      </section>
    </main>
  )
}

export default PrimaryComposition
