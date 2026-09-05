# Component Inventory

Status: component-level planning only. No React/HTML/framework code exists yet — see "Not Yet Decided" in `CLAUDE.md`. This document names and scopes reusable UI components; it does not implement them.

Source of truth for this inventory: `PRODUCT_BRIEF.md`, `UX_ARCHITECTURE.md`, `RECIPE_STORY_ANALYSIS.md`, `UX_WIREFRAME_REVIEW.md`, and `design-system/tokens/`. Every entry below is justified by a specific line in one of those documents — components are not invented ahead of a confirmed flow.

## Method

The candidate list in the assignment was checked against the two confirmed flows (`UX_ARCHITECTURE.md` Flow A / Flow B) and the one canonical screen they share. A candidate stayed only if it appears, unmodified, in more than one place in that architecture, or is the single confirmed instance of a distinct interaction (e.g. the meal target, which is singular but structurally distinct from everything else on the screen). Nothing was added beyond the candidate list — see "Candidates considered and not added" at the end.

Seven of the eight candidates are retained as components. `Section Label` was removed from this inventory during a review pass — it has no states, no variants, and no anatomy beyond one typography token, so it is documented as a typography usage convention in `DESIGN_SYSTEM.md` instead of as a component here. `Action Button` merges the candidate list's "primary/secondary" split into one component with variants. `Search Field` is reframed below to distinguish "reusable interaction primitive" from "confirmed to repeat more than once" — the two are not the same claim, and the original draft conflated them.

---

## 1. Search Field

**Purpose:** the primary entry point into Flow A — locate a food or dish to add to the composition. This is the "direct entry is the default input method" decision (`UX_ARCHITECTURE.md`, Entry Point) made concrete.

**Why this is a component vs. a pattern:** its case for inclusion is different from `Food Item Row` or `Recipe Card`, and should not be read as the same kind of claim. It is a **reusable interaction primitive** — a self-contained input + state machine (empty → typing → results/no-results/loading/error) that is generic to "search for a food or dish" and would be reinstantiated wherever that interaction is needed again, not rebuilt from scratch. It is **not** currently confirmed to repeat more than once: the architecture has exactly one confirmed instance of it (the canonical Primary Composition screen). Flow B's "discover" step may or may not need a similar search/browse affordance — that mechanic is explicitly undecided (`UX_ARCHITECTURE.md`, Open Architecture Questions) — so a second instance is plausible but not assumed here. The component boundary is drawn around the self-contained interaction, not around evidence of multiple placements; where it is placed and how it's weighted against "Find a recipe" is the job of the Primary Composition screen pattern (see "Product-level composition patterns"), not this entry.

**Where it appears:** one confirmed instance today — the canonical Primary Composition screen, at the top of both the empty state (`Search food or dish...`) and the active state; it does not move or get restyled once items exist.

**Content / anatomy:**
- Input field with placeholder text ("Search food or dish...")
- Results list on typing (list mechanics/ranking not designed — see States)

**Relevant semantic tokens:**
- `--color-surface`, `--border-subtle`, `--radius-small` for the field shell
- `--text-body` for typed input, `--color-text-muted` for placeholder
- `--space-card-padding` internal, `--space-page-margin` to screen edge

**States / variants:**
- **Empty** — placeholder text shown, no query entered. Confirmed by the wireframe empty state.
- **Active/focused** — field focused, `--border-strong`, no query yet. Confirmed by the system's general focus convention.
- **Query/results** — user has typed a query and a matching results list is showing. Not designed in any wireframe; result-list layout is open.
- **No results** — query entered, nothing matched. Not designed; must not be silent — needs at minimum a text message, not an empty void.
- **Loading** — query in flight against whatever nutrition-data source is eventually chosen (`CLAUDE.md`, Not Yet Decided). Not designed; flagged here so it isn't forgotten when a data source is picked.
- **Error** — the lookup failed (network/data-source failure). Not designed; per `DESIGN_SYSTEM.md`, a genuine error state is "a new, explicit decision to make later," not something to imply through the accent or supporting colors — this state must not borrow `--color-supporting-tomato` as an implicit "error" meaning.

Only **Empty** and **Active/focused** are confirmed by the wireframes; the other four are named here as required states of this component, not as new product decisions — none of them introduce a new surface or component, they're all states this one field must eventually handle.

**Accessibility / interaction:**
- Must have a programmatic label (the heading "What are you eating?" reads as the field's label in the wireframe copy — confirm the association, don't rely on visual proximity alone)
- Standard input keyboard/focus behavior; focus state must use `--border-strong`, not color, per the system's border-carries-structure direction

**NOT this component's job:**
- Matching/ranking logic against a nutrition database (source undecided, `CLAUDE.md`)
- Rendering the "Find a recipe" secondary entry point (that's an `Action Button`, placed near this field, not part of it)
- Anything about Flow B's "discover" browsing surface — assumed to be a separate, not-yet-designed affordance (see Assumptions)

---

## 2. Food Item Row

**Purpose:** represent one item — product or recipe ingredient — inside a composition ("Your meal"), applying the shared `food item × quantity = calories` primitive at the row level.

**Where it appears:** identically whether the meal started empty, from manual entry, or from a selected recipe (`UX_WIREFRAME_REVIEW.md` §1: "Screens 02, 06, and 07 all resolve to the same... shape, regardless of origin"). This identity is load-bearing: a recipe ingredient row must be visually indistinguishable in kind from a manually-added row, because there is no separate recipe-editing context (`UX_ARCHITECTURE.md`).

**Content / anatomy:**
- Item name (e.g. "Chicken breast")
- `Quantity Editor` (nested, see below) — e.g. "200 g"
- Calculated calories for this item — e.g. "330 kcal"
- A remove affordance (assumed necessary for a usable editable list; not shown in any wireframe text state — see Assumptions)

**Relevant semantic tokens:**
- `--text-body` (item name) or `--text-item-value` (name if it needs to align visually with quantity/calories)
- `--text-item-value` for quantity and calories values
- `--space-item-row-gap` between rows, `--space-card-padding` internal, `--border-subtle` as row/list separator
- `--border-strong` is the confirmed token for "a value just changed" (`DESIGN_SYSTEM.md`) — candidate for the recalculation-just-happened state

**States / variants:** default; quantity being edited (delegates to `Quantity Editor`); just-recalculated (transient, ties to the no-"Recalculate"-button decision); pending removal.

**Accessibility / interaction:**
- Name, quantity, and calories must be exposed as one accessible group/row, not three disconnected text nodes
- Because there is no manual "Recalculate" action, a quantity edit's effect on this row's calories must be perceivable to assistive tech (e.g. a live region), not just visually

**NOT this component's job:**
- The item×quantity calculation itself — that belongs to the shared calculation engine, not the row
- Meal-level totals or target-fit (`Meal Summary`'s job)
- Encoding whether the item came from manual entry or a recipe — it must not, by decision

---

## 3. Quantity Editor

**Purpose:** let the user view and edit one item's quantity using the confirmed hybrid model (named portion, with grams/ml as a precision fallback).

**Where it appears:** nested inside every `Food Item Row` — never standalone. Both the manual-entry and recipe-derived rows use it identically (`RECIPE_STORY_ANALYSIS.md`, Assumptions: "the hybrid quantity model... applies to recipe ingredients the same way it applies to manually composed items").

**Content / anatomy:** current value + unit or named portion (e.g. "200 g", or eventually "1 slice"); bordered, editable-looking field treatment (`UX_WIREFRAME_REVIEW.md` §1: "Editable ingredient quantities... a bordered, editable-looking field rather than static text").

**Relevant semantic tokens:** `--text-item-value`, `--radius-small`, `--border-subtle` at rest / `--border-strong` while focused or just-edited, `--space-inline` between value and unit.

**States / variants:** display, editing/focused, invalid input (not designed), unit-switched (explicitly an open question — `UX_ARCHITECTURE.md` "Quantity editing treatment").

**Accessibility / interaction:**
- Numeric input semantics once implemented (e.g. numeric keypad on mobile)
- Its label must associate back to the parent item ("Chicken breast quantity"), not read as an anonymous number field
- An edit here is what triggers the `Food Item Row` / `Meal Summary` live-recalculation requirement — this component only owns the input, not the propagation

**NOT this component's job:**
- Recomputing dependent totals (engine's job, surfaced elsewhere)
- Sourcing which named portions exist for a given item (nutrition-data concern, undecided)

---

## 4. Recipe Card

**Purpose:** represent one discoverable recipe during Flow B's "discover" step, so the user can browse before selecting.

**Where it appears:** the Recipe Discovery surface only (Screen 04 in the reviewed wireframes). It disappears once a recipe is selected — selection routes into `Food Item Row`-based composition, not a recipe-specific screen.

**Content / anatomy — confirmed only:**
- Recipe name
- Likely an image (present in wireframe convention, not decided as required)
- A calorie value, since "calories are always calculated and displayed" applies here too

**Content explicitly NOT confirmed:** whether the card also shows a target-relationship signal (e.g. "within target" / "above target") at discovery time. `UX_WIREFRAME_REVIEW.md` §2.4 flags that wording as wireframe placeholder copy, and `RECIPE_STORY_ANALYSIS.md`'s Open Questions lists "any soft signal... surfaced without excluding recipes" as unresolved. Do not treat a fit badge as locked anatomy — it's a pending decision, not a component requirement.

**Relevant semantic tokens:** `--color-surface`, `--radius-medium`, `--border-subtle` preferred over `--shadow-elevation-1` (system default: reach for a border first), `--text-subheading` for the recipe name, `--text-body-small` for supporting info, `--space-card-padding`.

**States / variants (card level):** default, pressed/selected (leads into the shared composition surface). There is deliberately no "above-target" penalty state — recipes are never hard-filtered or visually demoted by calorie target (`PRODUCT_BRIEF.md`), and the system has no color for that judgment by design (`DESIGN_SYSTEM.md`: no `--color-success`/`--color-error`).

**States / variants (collection level — owned by the Recipe Discovery surface pattern, not by an individual card):** loading (recipes not yet fetched), no results (a search/browse returned nothing), error (the fetch failed). These are not new components — no single `Recipe Card` instance has a "loading" or "error" state; the *collection* surrounding the cards does. They're named here so the gap doesn't go undocumented, and are also called out under "Product-level composition patterns" below, where the collection itself is described.

**Accessibility / interaction:**
- Entire card should be one accessible tap target with the recipe name as its accessible name
- If a fit signal is ever confirmed, it must be conveyed as text, never by color alone — this system has no success/error color to lean on even if someone reaches for it later

**NOT this component's job:**
- Hard-filtering by calorie target (explicitly forbidden)
- Rendering the ingredient list — that only exists after selection, as a list of `Food Item Row`s
- Any calculation — the card shows a precomputed reference value, it doesn't compute one

---

## 5. Target Control

**Purpose:** the single place the user sets, edits, or clears the optional per-meal calorie target.

**Why this is a component, not just a region of the screen:** unlike `Section Label` (removed from this inventory for having no states at all), `Target Control` owns a self-contained interaction responsibility that is entirely independent of everything else on the canonical screen: capturing, editing, and clearing one user-owned numeric value, with its own state machine (unset → editing → set → clearing) and its own hard rule (never supply/derive/suggest a value). That responsibility doesn't depend on how many places it's currently rendered — it would move as one unit if the screen were ever restructured, and nothing about its internal states or rules changes based on where it sits. It currently has one confirmed placement (the canonical Primary Composition surface), the same way `Search Field` does, but its justification here is the distinctness of its state machine, not a claim about repetition.

**Where it appears:** canonical Primary Composition screen only, in unset (`+ Set target`) and set (`Meal target — 600 kcal — Edit`) states. Identical for Flow A and Flow B — `UX_ARCHITECTURE.md`: "the same target applies to meal compositions... and recipe fit checks — there is no separate target per flow." Per `UX_WIREFRAME_REVIEW.md` §2.1, this must render as a state of the composition screen, never as its own navigable destination (the "03 — Meal Target" wireframe frame was a review artifact, not a proposed screen).

**Content / anatomy:**
- Label: "Meal target"
- Unset affordance: "+ Set target"
- Set-state value + edit affordance: "600 kcal" / "Edit"
- The actual entry surface (inline field vs. expandable row vs. sheet) — interaction pattern is an open question, not decided here

**Relevant semantic tokens:** `--text-label` for the "Meal target" label, `--text-item-value` for the numeric value, `--color-accent`/`--color-on-accent` only if "+ Set target" is styled as a primary action button — never to imply anything about the target's fit outcome, `--border-subtle`/`--radius-small` for the entry surface.

**States / variants:** unset, set, editing (pattern TBD), clearing.

**Accessibility / interaction:**
- The unset→set transition must be announced to assistive tech, not just visually revealed
- Clearing the target must be an explicit, discoverable action
- This control's own display must never carry a fit judgment — no color, icon, or wording here implies "good" or "bad"; that's out of scope for this component entirely

**NOT this component's job:**
- Computing or displaying the fit relationship (that's `Meal Summary`)
- Supplying, deriving, or suggesting any value — explicitly forbidden; there is no default to fall back on
- Persisting the target beyond the current session (undecided)

---

## 6. Meal Summary

**Purpose:** show the running total for the current composition, and — only when a target is set — the neutral numeric relationship between that total and the target.

**Why this is a component, not just a region of the screen:** its responsibility is a self-contained, read-only computation-and-display contract that reacts to two independent sources of change (the item list, and the target) and answers one question — "what does the current composition total, and how does that relate to the target, if there is one" — regardless of where on a screen that question is asked. That's a distinct responsibility from `Target Control` (which owns *capturing* the target value) and from `Food Item Row` (which owns *one item's* math, not the meal's). The fact that both `Target Control` and `Meal Summary` currently render on one shared surface reflects the "one canonical screen" decision in `UX_ARCHITECTURE.md`, not a merging of their responsibilities — they are separable components that happen to be adjacent today.

**Where it appears:** canonical Primary Composition screen, below the item list, in both Flow A and Flow B (same shared surface, no duplicate per flow).

**Content / anatomy:**
- Total label + value: "Total — 525 kcal"
- Conditional relationship line, shown only when a target exists: "88% of target" (wireframe placeholder wording only — `UX_WIREFRAME_REVIEW.md` §2.4 — not approved copy)

**Relevant semantic tokens:** the total is a strong candidate for `--text-display` — `DESIGN_SYSTEM.md` calls the calorie number out as "the product's single most important visual element," and this total is the closest thing to that number on the composition screen; `--text-body-small` for the relationship line; `--space-section-gap` above, separating it from the item list.

**States / variants:**
- **Empty meal (no items yet):** per `UX_ARCHITECTURE.md`'s Empty State enumeration, no Total line renders at all — this component does not exist yet in any form, not even as "0 kcal." Confirming this explicitly here corrects a gap in the previous draft, which only covered the two states below and implicitly assumed a Total always renders once the screen exists.
- **Active meal, no target set:** total renders; the relationship line is simply absent, not shown empty/greyed.
- **Active meal, target set:** total renders with the relationship line beneath it.
- **Just-recalculated:** transient, same live-update requirement as `Food Item Row`, since there's no "Recalculate" action.

**Accessibility / interaction:**
- The total must update and be perceivably announced as items/quantities change — there's no manual trigger a screen-reader user could invoke instead
- The relationship line must read as neutral information in both visuals and wording — never pass/fail, never color-coded (this system has no color for it by design)

**NOT this component's job:**
- Per-item math (`Food Item Row` / the shared engine)
- The target's own edit interaction (`Target Control`)
- Any good/bad color signal

---

## 7. Action Button *(candidate: "Primary / Secondary Actions")*

**Reframing note:** the candidate list names this as if primary and secondary actions were different components. Across the wireframes they're the same button shape in two visual weights, not two component families — "+ Add food," "Find a recipe," "+ Set target," and "Edit" are all one `Action Button` component with a `primary` / `secondary` variant.

**Purpose:** give every actionable moment on the shared surface a consistent, correctly-weighted treatment — this is the mechanism behind `UX_WIREFRAME_REVIEW.md` §2.2's requirement that food/dish search reads as primary and "Find a recipe" reads as a clearly-visible secondary path, without a mode-selection screen.

**Where it appears:** Primary Composition screen (both states) and Recipe Discovery.

**Content / anatomy:** label text, optional leading "+" glyph, two variants — `primary` (filled `--color-accent` / `--color-on-accent`) and `secondary` (outlined or text-only, ink on paper).

**Relevant semantic tokens:** `--color-accent` / `--color-on-accent` for `primary` only — brand/primary-action meaning per `DESIGN_SYSTEM.md`, never a status; `--border-subtle` or `--border-strong` for `secondary`; `--radius-medium`; `--text-body` or `--text-label` depending on size; `--space-card-padding` for hit area.

**States / variants:** default, pressed, focus-visible, disabled (not confirmed as needed anywhere yet).

**Accessibility / interaction:**
- Minimum touch target size; accessible name matches visible label
- The `secondary` variant must stay clearly perceivable — "clearly visible" is an explicit product requirement for the recipe-discovery entry point, not just "present in the DOM"

**NOT this component's job:**
- Deciding which action is primary vs. secondary in a given context — that's a per-screen composition decision (e.g. "Find a recipe" is secondary specifically on the canonical screen); the component itself only offers the two variants
- Navigation/routing logic

---

## Product-level composition patterns (not components)

These are arrangements of the components above, specific to one screen or flow — not reusable pieces themselves:

- **"Your meal" list** — a stack of `Food Item Row`s plus a trailing `Meal Summary`. The stacking/order is a layout decision on the Primary Composition screen, not a component in its own right.
- **Primary Composition screen** — the canonical screen itself: `Search Field` + `Action Button` ("Find a recipe") + the meal list pattern above + `Target Control`. This is *the* screen, not a reusable piece — there is only one. This is also where `Search Field`'s visual weighting against "Find a recipe" (primary vs. clearly-visible-secondary, per `UX_WIREFRAME_REVIEW.md` §2.2) is decided — the component itself only defines the input's own behavior, not its hierarchy on this screen.
- **Recipe Discovery surface** — a collection of `Recipe Card`s. Its browse/sort/search mechanics are explicitly undecided (`UX_ARCHITECTURE.md`, Open Architecture Questions), so no container component is specified beyond "some list/grid of Recipe Cards." This collection, not any individual card, owns the **loading**, **no results**, and **error** states named under `Recipe Card` above — a fetch-in-progress or fetch-failure is a property of the surface, not of a card that doesn't exist yet.

## Candidates considered and not added

Seven of the eight original candidates are retained as components. `Section Label` was removed from the component inventory in this pass: it had no states, no variants, and no anatomy beyond applying one existing typography token (`--text-label`), which makes it a usage convention rather than a component — it now belongs in `DESIGN_SYSTEM.md`'s typography section, not here.

`Action Button` still merges the candidate list's "primary/secondary" split into one component with variants — that reframing stands unchanged.

No component beyond these seven was added, and none of the newly-added states above introduce a new component. In particular:
- A distinct "fit badge" or "target relationship" component was deliberately *not* created, even though both `Meal Summary` and (possibly) `Recipe Card` render something in that space — the Recipe Card side of that is an open question, not a confirmed second implementation, so inventing a shared component for it now would be scope creep ahead of the decision.
- The **loading / no results / error** states added for `Search Field` and the Recipe Discovery surface are states of those existing component/pattern entries, not new components — no "Spinner," "Empty State," or "Error Banner" component was introduced.
