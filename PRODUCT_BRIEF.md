# Product Brief — Calories Calculator

Source: Product Discovery (Claude Chat), confirmed prior to this repository's setup. See `CLAUDE.md` for assignment context and `UX_ARCHITECTURE.md` / `RECIPE_STORY_ANALYSIS.md` for supporting detail.

## Core User Stories (confirmed)

1. As a user, I want to calculate the amount of calories in a dish or a specific product.
2. As a user, I want to find a recipe for a dish that is suitable for me.

## Confirmed Product Decisions

- **Suitability (v1 definition):** the per-meal calorie target is optional and user-owned. Calories are always calculated and displayed, with or without a target. Suitability/fit only exists when a target is set — without one it is unavailable/undefined, never an implicit pass. No other suitability signal (dietary restriction, ingredient availability, taste preference, etc.) is part of v1.
- **Recipe discovery is core:** it is a real, required flow for this take-home, not a future hypothesis.
- **Recipe → editable composition → calculator:** a selected recipe becomes an editable composition, which is then evaluated by the same calorie calculator used for direct dish/product calculation.
- **Original serving as reference:** the recipe's original serving size is shown as a reference point. The user's actual portion can be adjusted before the final calorie verdict is produced.
- **No hard filtering:** recipe discovery must not hard-filter recipes by calorie target. The calorie target is applied at the verdict stage, not as a discovery-time exclusion rule.
- **AI photo recognition is excluded from core scope:** it is not part of the assignment requirement. It remains only an optional product hypothesis and must not become part of the core architecture. If documented anywhere, it must be clearly labeled as an optional hypothesis, not a requirement.
- **Scope discipline:** the take-home scope is intentionally kept small.

## Shared Calculation Model

- **Primitive:** food item × quantity = calories. This single primitive is used both for a specific product and for a composed dish (manual or recipe-derived) — there is no separate calculation model per case.
- **Quantity model (hybrid):** named portions where available, with grams/ml as a precision fallback when a named portion isn't available or isn't precise enough.
- **Manual composition:** remains fully functional independent of recipe discovery — a user can build a dish from scratch without ever going through a recipe.
- **Unknown food escape hatch:** when a food item isn't found/known, a manual-entry path must be available so composition isn't blocked.

## Calorie Target

The per-meal calorie target is optional and user-owned:

- The product never supplies, derives, suggests, or prefills a target. **No numeric default is confirmed or planned.** Any numeric value used elsewhere (design screens, examples) must be clearly marked as a temporary/placeholder assumption, not a decided requirement.
- The user sets the target through a single numeric input.
- The target persists for the current session and can be edited or cleared.
- The target applies to both meal compositions and recipe fit checks.
- When a target is set, fit is communicated as a neutral numeric relationship to the target, not as a pass/fail judgment.
- When no target is set, suitability/fit is unavailable/undefined — never an implicit pass.
- Cross-session persistence of the target remains an open question (see Not Yet Decided).

## AI Photo Recognition (optional hypothesis)

Not a requirement for this assignment. If it appears in any document or design exploration, it must be clearly labeled as an optional product hypothesis, separate from the confirmed core architecture and flows.

## Out of Scope for v1

Per the scope-discipline decision, the following are not part of this take-home's product surface: navigation architecture beyond the two core flows, accounts/authentication, tracking, macros, pantry matching, allergies, social features. See `UX_ARCHITECTURE.md` for how this bounds the flows.

## Not Yet Decided

Target audience, cross-session persistence of the calorie target, nutrition/ingredient database source, onboarding, visual style, colors, typography, framework, component library, backend, API, and data persistence remain undecided — see `CLAUDE.md`.
