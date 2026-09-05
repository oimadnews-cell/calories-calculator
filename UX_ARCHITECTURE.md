# UX Architecture — Calories Calculator

Source: Product Discovery (Claude Chat), confirmed prior to this repository's setup. See `PRODUCT_BRIEF.md` for the underlying product decisions and `RECIPE_STORY_ANALYSIS.md` for the analysis behind the recipe-suitability decisions referenced here.

## Purpose

Define the flows needed to satisfy the two confirmed core user stories, kept intentionally small (scope-discipline decision). This document does not introduce navigation, screens, or product areas beyond what the confirmed decisions require.

## Entry Point

- **Calculator-first:** the composition/calculation surface is the canonical product surface.
- **No mode-selection screen:** there is no separate screen asking the user to choose between "calculate" and "find a recipe."
- **Direct entry is the default input method:** the user can start composing a product/dish immediately.
- **Recipe discovery is a clearly visible secondary input method:** reachable from the same surface, not hidden.
- **Selecting a recipe leads into the same composition/calculation surface** used for direct entry — not a separate screen.
- **No separate recipe editing context:** a recipe never gets its own editing surface distinct from the shared composition surface.

## Shared Composition/Calculation Engine

Both core user stories are served by one shared engine rather than two separate ones:

- **Primitive:** food item × quantity = calories.
- **Quantity model:** hybrid — named portions where available, grams/ml as a precision fallback.
- **Manual composition:** fully functional on its own, independent of recipe discovery.
- **Unknown food:** manual-entry escape hatch, so an unrecognized item never blocks composition.
- **Calories are always calculated and displayed**, independent of whether a calorie target is set.

Recipe discovery (Story 2) feeds into this same composition/calculation experience rather than becoming a separate product — a recipe is a way of *pre-filling* a composition, not a distinct calculation path.

## Calorie Target Slot

The primary composition surface carries a persistent calorie target slot, used by both Flow A and Flow B:

- **Unset state:** no target is set; calories are still calculated and displayed, but fit/suitability is unavailable.
- **Set state:** the user has entered a target via a single numeric input; fit is then shown as a neutral numeric relationship to that target, not a pass/fail judgment.
- **Input:** a single numeric input — the product never supplies, derives, suggests, or prefills a value.
- **Persistence:** the target persists for the current session and can be edited or cleared at any time.
- **Scope:** the same target applies to meal compositions (Flow A) and recipe fit checks (Flow B) — there is no separate target per flow.

## Flow A — Direct Calculation (Story 1)

"As a user, I want to calculate the amount of calories in a dish or a specific product."

Build a composition directly — either a single specific product or a manually assembled dish — using the shared engine, then calculate total calories. This flow is the direct application of the shared calculation primitive and the "manual composition remains fully functional" decision; it does not depend on recipe discovery.

## Flow B — Recipe Discovery (Story 2)

"As a user, I want to find a recipe for a dish that is suitable for me."

Confirmed sequence:

**discover → select recipe → review/edit composition → calculate calories → fit against target (if set)**

- **Discover:** the user browses/finds recipes. Recipes are **not** hard-filtered by calorie target at this step (confirmed decision — no hard filtering).
- **Select recipe:** the user picks one recipe to proceed with.
- **Review/edit composition:** the selected recipe becomes an editable composition (using the same food item × quantity primitive as Flow A). The recipe's original serving is shown as a reference point. The user can adjust their actual portion before proceeding.
- **Calculate calories:** the edited composition is evaluated by the same calculation engine used in Flow A — there is no separate "recipe calculator." Calories are always calculated and displayed here, whether or not a target is set.
- **Fit against target (if set):** if a calorie target is set, the result is shown as a neutral numeric relationship to that target — not a pass/fail judgment. If no target is set, fit is unavailable/undefined, never an implicit pass. This happens here, downstream of the user's edits — not as a discovery-time filter.

## Surface Count Discipline

The two flows share the composition/calculation surface rather than duplicating it: Flow B's "review/edit composition → calculate calories" step is the same surface as Flow A, pre-populated from a recipe instead of started from scratch. This keeps the number of distinct surfaces intentionally small.

## Explicit Exclusions from Core Architecture

- **AI photo recognition** — optional hypothesis only; not part of Flow A, Flow B, or the shared engine.
- **Navigation** beyond what connects Flow A and Flow B — not designed here; not decided.
- **Accounts/authentication, tracking, macros, pantry matching, allergies, social features** — not part of either confirmed flow; out of scope for this take-home.

## Open Architecture Questions

Not decided, and not assumed by this document:

- What the "discover" step looks like (browse/search/sort mechanics), beyond the confirmed rule that it must not hard-filter by calorie target.
- The nutrition/ingredient data source powering calorie values for both flows.
- Cross-session persistence of the calorie target (see `PRODUCT_BRIEF.md`).
