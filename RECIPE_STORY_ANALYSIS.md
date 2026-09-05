# Recipe Story Analysis

Source story: "As a user, I want to find a recipe for a dish that is suitable for me."

This document reconstructs the analysis behind the confirmed recipe-suitability decisions in `PRODUCT_BRIEF.md`. It preserves the reasoning trail — what was established as fact, what remains assumption, what is still open — rather than presenting only the conclusion.

## FACT (confirmed during Product Discovery)

- Recipe discovery is a real core flow for this take-home, not a future hypothesis.
- "Suitable" (v1) is defined as calorie fit against a per-meal calorie target — but only when a target is set. Without a target, suitability/fit is unavailable/undefined, never an implicit pass.
- The per-meal calorie target is optional and user-owned: set via a single numeric input, and never supplied, derived, suggested, or prefilled by the product.
- Fit is communicated as a neutral numeric relationship to the target, not as a pass/fail judgment.
- A selected recipe becomes an editable composition, evaluated by the same calorie calculator used for direct dish/product calculation.
- The recipe's original serving is a reference point; the user's actual portion is adjustable before the final verdict.
- Recipe discovery must not hard-filter recipes by calorie target.
- AI photo recognition is not part of this story or the core architecture; it remains an optional, separately-labeled hypothesis.
- Scope is intentionally kept small.

## Interpretation Alternatives for "Suitable"

The source story's word "suitable" is inherently ambiguous. Alternatives considered:

1. **Dietary restriction / allergy match** — suitable = compatible with a stated restriction (e.g., vegetarian, gluten-free).
2. **Ingredient availability / pantry match** — suitable = the user has (or can get) the ingredients.
3. **Taste/cuisine preference match** — suitable = aligned with a stated or learned preference.
4. **Calorie/nutrition fit against a target** — suitable = the calculated result fits a per-meal calorie target.
5. **Some combination of the above.**

## Comparison

- Alternatives 1–3 each require a new data model not otherwise needed by Story 1 (restriction tags, pantry inventory, preference/taste data) and a way to *capture* that data from the user (a preference or profile input), which pulls in product areas — onboarding, profiles, personalization — beyond the two confirmed core stories.
- Alternative 4 requires no new data model: it reuses the same food item × quantity = calories primitive and calculation engine already needed for Story 1. It extends that engine with one additional comparison (result vs. target) rather than introducing a separate subsystem.
- Given the scope-discipline decision (keep the take-home intentionally small) and that Story 1 and Story 2 were already understood to share machinery, alternative 4 is the only option that avoids expanding scope beyond the two confirmed stories.

## Recommendation (confirmed decision)

Adopt alternative 4: v1 "suitable" = calorie fit against a per-meal calorie target. This is the confirmed decision recorded in `PRODUCT_BRIEF.md`. It was chosen because it reuses the Story 1 calculation engine, requires no new data model, and keeps scope small — not because the other interpretations were judged invalid in general.

## ASSUMPTION

The following are reasonable inferences drawn from the confirmed decisions, but are not themselves confirmed requirements:

- That the hybrid quantity model (named portions + grams/ml fallback) applies to recipe ingredients the same way it applies to manually composed items, since both pass through the same composition primitive.
- That editing a recipe's composition (portion, ingredients, quantities) is unrestricted — i.e., the original serving is a *reference value for comparison*, not a locked or bounded value the user must stay within.
- That "discover" implies the user can browse or search across more than one recipe (a discovery surface exists), even though its mechanics are not specified.

## OPEN QUESTION

Not resolved by Product Discovery and not assumed here:

- What is the source of recipe and ingredient calorie data (nutrition database)?
- What does the "discover" step look like beyond the no-hard-filter rule — is there sorting, search, or any soft signal (e.g., proximity to the calorie target) surfaced without excluding recipes?
- Cross-session persistence of the calorie target — does it persist beyond the current session? Not decided.

## Implications for Architecture

- Recipe discovery (Story 2) and direct calculation (Story 1) must share one composition/calculation engine rather than each getting a bespoke one — see `UX_ARCHITECTURE.md`, Shared Composition/Calculation Engine.
- A recipe's role in the architecture is to *seed* an editable composition, not to produce a result directly — the calculation, and the fit-against-target check when a target is set, happen after user edits, using the same mechanism as manual composition.
- The fit comparison (result vs. per-meal target, only when a target is set) is a downstream step applied to the calculated result, not a filter applied to the recipe list — this rules out any architecture that excludes recipes from discovery based on calories.
- The architecture must support an explicit unset/set target state — there is no default value to fall back on. Recipe fit checks and meal-composition fit checks use the same target-application logic; the target is not duplicated per flow.
- Entry into this flow is calculator-first with no mode-selection screen; recipe discovery is a secondary path that feeds the same composition surface used for direct calculation, with no separate recipe editing context (see `UX_ARCHITECTURE.md`, Entry Point).
- AI photo recognition must remain excluded from this flow's core architecture; any future documentation of it must be clearly labeled as an optional hypothesis, separate from Flow B.
