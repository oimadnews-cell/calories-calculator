# Calories Calculator

A mobile-first prototype built for a UX/UI Engineer take-home assignment. It lets a user calculate the calories in a dish or product they compose themselves, or start from a recipe and adjust it to their own portion — both paths flow through the same calculation engine and land on one shared screen.

## Live Demo

[Open the live prototype](https://calories-calculator-ten.vercel.app)

## Video Presentation

[Watch the presentation](https://youtu.be/6ZJm-ooywbE)

## User Stories

1. As a user, I want to calculate the amount of calories in a dish or a specific product.
2. As a user, I want to find a recipe for a dish that is suitable for me.

## Product & UX Approach

The confirmed product and UX decisions (see `PRODUCT_BRIEF.md` and `UX_ARCHITECTURE.md`) shaped an intentionally small, single-surface product:

- **Calculator-first entry** — there is no mode-selection screen. The composition/calculation surface is the canonical screen; "Find a recipe" is a clearly visible secondary entry point into it, not a separate product area.
- **One shared primitive** — `food item × quantity = calories` powers both a single product lookup and a full composed dish, manual or recipe-derived. There is no separate calculation path per case.
- **Hybrid quantity model** — named portions where available, with grams/ml as a precision fallback.
- **Optional, user-owned meal target** — a single numeric input the user sets, edits, or clears. The product never supplies, derives, or suggests a value. Without a target, calories still calculate and display, but fit is undefined — never an implicit pass.
- **Recipe as a seed composition** — selecting a recipe pre-fills the same editable meal, using the same `Food Item Row` / `Quantity Editor` components as manual entry. There is no separate recipe-editing screen.
- **Reference serving, not an arbitrary edit** — a recipe's original serving is shown as a reference point; suitability is judged against the user's actual, adjusted portion, not the recipe's default.
- **Live recalculation, one path** — quantity changes recompute the item and meal total instantly through the shared engine; there is no manual "Recalculate" action.
- **Explicit scope boundaries** — recipe discovery never hard-filters by calorie target (fit is applied at the verdict stage, not as a discovery-time exclusion). AI photo recognition, accounts/authentication, tracking, macros, pantry matching, allergies, and social features are explicitly out of scope for this take-home.

## Design Direction

The approved visual direction is **Acid Nutrition / Dark Market** (`DESIGN_DIRECTION_V2.md`), an evolution of the original Acid Market stylescape onto a dark base:

- **Typography** — Bricolage Grotesque for expressive display/heading moments, Inter for all functional/UI text; exactly one numeric hero per screen (the meal calorie total).
- **Color strategy** — near-black background, deep charcoal elevated surfaces, warm white text, muted grey secondary text, and a single acid-lime accent reserved for brand/primary-action use. Lime never encodes calorie fit, health, or a pass/fail judgment.
- **Editorial food imagery** — high-contrast, tightly cropped, intentional photography in Recipe Discovery; imagery stays minor on the calculation surface so it never competes with the data.
- **Hierarchy over decoration** — structure comes from typography, spacing, and hairline borders, not card chrome, shadows, or gradients.
- **Restrained borders/surfaces** — layered dark surfaces plus subtle/strong border tokens replace shadows and rounded-card treatment; radius stays restrained by design.
- **Intentional acid-lime use** — sparse, static, and never tied to whether a total is above or below target.
- **Mobile-first** — designed primarily for a 375px frame, remaining solid at 320px and 430px with no horizontal overflow.

## Design System

The interface is built on a token-driven design system rather than one-off styles:

- **Tokens** — `design-system/tokens/primitives.css` (raw values) → `design-system/tokens/semantic.css` (role-based aliases) → `design-system/tokens/index.css` (entry point). Components bind only to semantic tokens, never to raw primitives or hard-coded values.
- **Components** (see `COMPONENT_INVENTORY.md` for full rationale, states, and anatomy), each with its own CSS Module and Storybook stories under `src/components/`:
  - **Search Field** — primary entry point for finding a food or dish.
  - **Food Item Row** — one item in the meal, identical whether added manually or from a recipe.
  - **Quantity Editor** — nested in each row; edits quantity using the hybrid portion/gram model.
  - **Recipe Card** — one discoverable recipe in Recipe Discovery.
  - **Target Control** — sets, edits, or clears the optional meal target.
  - **Meal Summary** — running total and, when a target is set, the neutral fit relationship.
  - **Action Button** — one component with `primary` / `secondary` variants for every actionable moment.
- **Product-level patterns** (compositions of the components above, not components themselves):
  - **Primary Composition** — the canonical screen combining Search Field, Action Button, the meal list, and Target Control.
  - **Recipe Discovery** — the collection of Recipe Cards behind the "Find a recipe" entry point.

## Key Flows

- **Direct food/dish calculation** — search a food or dish and add it to "Your meal"; calories calculate immediately.
- **Quantity editing** — tapping a meal row opens its Quantity Editor in place; the row and meal total recalculate live, with no separate confirm step.
- **Meal target** — set, edit, or clear an optional calorie target from the same screen; with a target set, the meal total shows a neutral numeric relationship to it.
- **Recipe discovery** — browse recipes from the secondary "Find a recipe" entry point without any calorie-target filtering.
- **Recipe selection into the shared composition** — picking a recipe seeds "Your meal" with its ingredients and returns to the Primary Composition screen; the original serving is shown as a reference.
- **Editing recipe ingredients** — once seeded, recipe ingredients are ordinary meal items: they use the exact same `Food Item Row` / `Quantity Editor` path as manually added items, so the user's actual portion, not the recipe default, drives the final total.

## AI-Native Workflow

This project was built with an explicit **Think → Prompt → Build → Inspect → Critique → Iterate** loop:

- **Claude** was used for product/UX reasoning — working through the two user stories into confirmed flows and decisions (`PRODUCT_BRIEF.md`, `UX_ARCHITECTURE.md`, `RECIPE_STORY_ANALYSIS.md`) — and for critique passes on the resulting documents and design direction.
- **Claude Code** was used for implementation: turning those decisions into design tokens, components, screens, tests, and Storybook stories, and for iterating on them (including component inventory reviews and the dark visual-direction pass).
- **Figma** served as the secondary visual-exploration canvas for the stylescape work referenced in `DESIGN_SYSTEM.md`.
- **Figma MCP** connected that exploration to this repository's tooling where relevant to the design-system work.

## Tech Stack

- **React 19** with **TypeScript**
- **Vite** for the dev server and production build
- **CSS Modules** for component-scoped styling on top of the token system
- **Storybook** (`@storybook/react-vite`) for isolated component documentation
- **Node.js built-in test runner** (`node --test`) for unit tests — no external test framework

## Project Structure

```
├── PRODUCT_BRIEF.md            # Confirmed product decisions
├── UX_ARCHITECTURE.md          # Confirmed flows and surfaces
├── RECIPE_STORY_ANALYSIS.md    # Analysis behind the recipe-suitability decision
├── DESIGN_SYSTEM.md            # Token foundations and rationale
├── DESIGN_DIRECTION_V2.md      # Approved visual direction (Acid Nutrition / Dark Market)
├── COMPONENT_INVENTORY.md      # Component-by-component scope and states
├── design-system/
│   └── tokens/                 # primitives.css → semantic.css → index.css
├── public/
│   └── images/recipes/         # Recipe photography
├── src/
│   ├── components/             # SearchField, FoodItemRow, QuantityEditor,
│   │                            # RecipeCard, TargetControl, MealSummary, ActionButton
│   ├── screens/
│   │   ├── PrimaryComposition/ # Canonical calculation screen
│   │   └── RecipeDiscovery/    # Recipe browsing screen
│   ├── data/                   # Mock food and recipe data
│   ├── lib/                    # Calculation engine, meal/search/recipe logic + tests
│   ├── App.tsx
│   └── main.tsx
└── .storybook/                 # Storybook configuration
```

## Getting Started

```bash
npm install
npm run dev
```

## Storybook

Component documentation runs as its own Storybook instance:

```bash
npm run storybook
```

This serves the component library (Search Field, Food Item Row, Quantity Editor, Recipe Card, Target Control, Meal Summary, Action Button) in isolation, each with its documented states and variants.

## Quality Checks

```bash
npm test              # Runs unit tests (Node.js built-in test runner) for the calculation
                       # engine, meal logic, search, recipe-to-meal mapping, and target
                       # relationship formatting
npm run build          # Type-checks the project (tsc -b) and produces a production Vite build
npm run build-storybook # Builds the static Storybook output
```

## Submission Notes

This repository contains the full deliverable set for the take-home assignment:

- **Product/UX documentation** — `PRODUCT_BRIEF.md`, `UX_ARCHITECTURE.md`, `RECIPE_STORY_ANALYSIS.md`
- **Design direction** — `DESIGN_SYSTEM.md` (foundations) and `DESIGN_DIRECTION_V2.md` (approved visual evolution)
- **Design system** — token architecture in `design-system/tokens/` and the component scope in `COMPONENT_INVENTORY.md`
- **Implementation** — the React/TypeScript application in `src/`, covering both core user stories end to end
- **Storybook** — isolated documentation for every reusable component
- **Tests** — unit coverage for the shared calculation engine and supporting logic
