# UX Wireframe Review

Source: the 7 low-fidelity wireframe states created in Figma (`calories_calculator_test`, page "Wireframes") — screens 01–07 — reviewed against `PRODUCT_BRIEF.md` and `UX_ARCHITECTURE.md`.

## 1. What Works

- **Calculator-first architecture.** Screen 01 opens directly on the composition surface — no mode-selection step before the user can search for a food or dish.
- **One canonical meal composition surface.** Screens 01, 02, 06, and 07 all resolve to the same "Your meal" list structure, whether the meal started empty, from manual entry, or from a recipe.
- **Shared food-item × quantity = calories primitive.** Every food row (Screens 02, 06, 07) follows the same item / quantity / calories shape, regardless of origin.
- **Recipe as a seed composition, not a separate editing context.** Screen 06 shows recipe ingredients landing directly in the same "Your meal" list used elsewhere — there is no distinct recipe-editing screen.
- **Editable ingredient quantities.** Screens 02, 06, and 07 render quantity as a bordered, editable-looking field rather than static text.
- **Optional, user-owned meal target.** Screen 01 shows the calculator fully usable with no target set; Screen 03 shows the target is only ever entered by the user, never pre-filled.
- **Calories always visible.** Totals appear in Screens 02, 06, and 07 independent of whether a target exists.
- **Target relationship only shown when a target exists.** Screen 05 deliberately omits any fit language, contrasting with Screen 04 where a target is set.
- **Recipe discovery shows both within-target and above-target examples.** Screen 04 includes a card above the target alongside two within-target cards, demonstrating the no-hard-filter rule rather than just asserting it.
- **Manual composition remains a complete path.** Screen 01's "+ Add food" / search entry works with no dependency on recipe discovery.

## 2. Issues / Risks

### 2.1 Meal Target as a Separate Screen
The wireframe "03 — Meal Target" was built as its own frame so the input state and resulting state could be reviewed together. In the actual product, this must **not** become a separate navigation destination — it is an interaction state of the Primary Composition surface (consistent with `UX_ARCHITECTURE.md`'s "Calorie Target Slot"). High-fidelity work should render target-setting as a state change (e.g. inline edit, sheet, or expansion) on the same screen as Screens 01/02, not as a screen a user "navigates to."

### 2.2 Primary vs Secondary Entry
Screen 01 places food/dish search and "Find a recipe" close together in the same hierarchy region. This must not be read as two equally-weighted entry points: food/dish search is the primary interaction, and recipe discovery is a secondary, clearly-visible path that feeds the same surface. High-fidelity visual hierarchy needs to make this weighting unambiguous — without introducing a mode-selection screen, which remains explicitly out of scope.

### 2.3 Quantity Editing Feedback
Screens 06 and 07 show a before/after state of an edited quantity (Parmesan 20 g → 10 g) with the recalculated total, but a static wireframe cannot demonstrate live feedback. The final product must make clear that changing a quantity updates the item's calories and the meal total automatically, with no separate "Recalculate" action or button.

### 2.4 Recipe Fit Language
"within your target" and "above target" (Screen 04) are wireframe placeholder copy, not approved final wording. The exact microcopy for communicating fit is an open content/visual decision, to be finalized during high-fidelity design — not treated as locked because it appears in the wireframe.

## 3. Decisions Before High Fidelity

- The calculator is the canonical composition surface.
- Recipe selection leads into the same composition surface.
- Meal target is contextual state, not a separate destination.
- Target is optional and manually entered by the user.
- The product never derives, suggests, or pre-fills a target.
- Calories remain visible regardless of whether a target exists.
- Fit/suitability is only evaluated when a target exists.
- Quantity changes recalculate automatically.
- No "Recalculate" action.
- Recipe cards should not be hard-filtered by the target.
- The original recipe serving is a reference point.
- User-edited quantities represent personalization.
- Manual food composition remains available even when recipe discovery exists.

## 4. Open Questions

- Final target-edit interaction pattern (inline field, expandable row, sheet/modal, etc.).
- Final wording for target relationship ("within target" / "above target" or an alternative neutral phrasing).
- Exact primary/secondary visual hierarchy between food search and recipe discovery.
- Final treatment of quantity editing (stepper, direct numeric entry, unit switching, etc.).
- Target persistence beyond the current session.
- Target audience.
- Nutrition / ingredient data source.

## 5. High-Fidelity Readiness

**Sufficiently defined to move into visual exploration:**
- [x] Information architecture (one composition surface, no mode-selection screen)
- [x] Core interaction model (food × quantity = calories; recipe seeds the same composition)
- [x] Target behavior rules (optional, user-owned, never derived/suggested, neutral numeric fit)
- [x] Screen-to-screen relationships across all 7 reviewed states

**Still open, not blocking visual exploration:**
- [ ] Visual language (branding, color, typography, component styling)
- [ ] Final microcopy for target relationship / fit language
- [ ] Concrete interaction pattern for target editing and quantity editing
- [ ] Target persistence, target audience, nutrition data source

The information architecture and core interaction model are settled enough to begin high-fidelity visual design; visual language, typography, color, component styling, and the content/interaction details listed above remain open and should be resolved during that phase.
