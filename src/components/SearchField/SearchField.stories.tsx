import type { Meta, StoryObj } from '@storybook/react-vite'
import SearchField from './SearchField'
import { FOODS } from '../../data/foods.ts'
import { searchFoods } from '../../lib/search.ts'

const meta = {
  title: 'Design System/Inputs/SearchField',
  component: SearchField,
} satisfies Meta<typeof SearchField>

export default meta
type Story = StoryObj<typeof meta>

/** No query entered yet — the field's default, empty state. */
export const Empty: Story = {
  args: {
    id: 'search-empty',
    label: 'What are you eating?',
    placeholder: 'Search food or dish...',
    query: '',
    results: [],
    onQueryChange: () => {},
    onSelectResult: () => {},
  },
}

/** A query that matches real entries from the FOODS dataset. */
export const Results: Story = {
  args: {
    id: 'search-results',
    label: 'What are you eating?',
    placeholder: 'Search food or dish...',
    query: 'c',
    results: searchFoods(FOODS, 'c'),
    onQueryChange: () => {},
    onSelectResult: () => {},
  },
}

/** A query that returns nothing — must not be a silent void (per COMPONENT_INVENTORY.md). */
export const NoResults: Story = {
  args: {
    id: 'search-no-results',
    label: 'What are you eating?',
    placeholder: 'Search food or dish...',
    query: 'pizza',
    results: searchFoods(FOODS, 'pizza'),
    onQueryChange: () => {},
    onSelectResult: () => {},
  },
}
