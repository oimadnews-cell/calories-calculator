# Design Direction V2 — Acid Nutrition / Dark Market

Status: **direction only**. This document defines a concrete visual direction for a future redesign. It does not change tokens, components, or code, and it does not change `DESIGN_SYSTEM.md`. It is the input to a later implementation pass, not the implementation itself.

Source of the product/UX decisions this direction sits on top of: `PRODUCT_BRIEF.md`, `UX_ARCHITECTURE.md`. None of those decisions are revisited here.

## Why this direction exists

The current implementation ("Market Poster / Acid Market" — see `DESIGN_SYSTEM.md`) is functionally strong and the underlying UX architecture is approved and unchanged. But the shipped visual result reads as a clean utility/design-system prototype rather than a distinctive branded product. This document evolves the visual language — darker, bolder, more editorial — while keeping every confirmed product and UX decision exactly as it is.

This is an evolution of Acid Market, not a replacement of its logic: acid-lime stays the signature accent, restraint around that accent stays non-negotiable, neutral calorie-fit semantics stay neutral, and "expression lives in the frame, discipline lives in the data" still holds. What changes is the base surface (paper → dark) and the intensity of the editorial gesture (quiet poster → bold nutrition-utility poster).

## Name and core idea

**Acid Nutrition / Dark Market** — a bold, editorial nutrition utility that combines dark product surfaces, acid-lime energy, oversized typography, strong numerical hierarchy, and restrained food imagery.

## 1. Color

- **Near-black / ink-black** — primary application background (replaces the previous warm-paper background).
- **Deep charcoal** — primary elevated surface (cards, rows, inputs) — one step lighter than the background, the way the previous direction's surface was one step darker than its paper.
- **Warm white** — primary text color (not pure `#FFFFFF` — keeps the same "warm, not clinical" intent the old paper/ink pairing had, just inverted).
- **Muted grey** — secondary/muted text (placeholders, captions, units, labels).
- **Acid lime** — the signature brand accent. Same role as today: brand/primary-action only.
- Lime must be deliberate and sparse — if anything, sparser than before, since it will read as brighter against a dark ground than it did against paper.
- No green/red (or any other) semantic status colors for calorie fit. Calorie suitability remains neutral information, exactly as confirmed in `PRODUCT_BRIEF.md`.
- Exact hex values, elevation steps beyond the two named above, and any opacity ramp are implementation-layer decisions for the future `DESIGN_SYSTEM.md`/tokens update — not fixed here. The acid-lime hue itself is expected to carry over conceptually from the current palette; whether its exact value needs adjustment for dark-background contrast is an implementation question, not a direction question.

## 2. Typography

- **Bricolage Grotesque** stays the expressive display/heading typeface.
- **Inter** stays the functional/UI typeface.
- Large, heavy display typography becomes a bigger part of the brand than it is today — but hierarchy stays intentional: this is a shift in how *hard* the existing hero moment hits, not a license to enlarge everything. Exactly one numeric hero remains per screen (the meal calorie total on Primary Composition); item-level numbers (row calories, recipe-card calories) stay at their current, smaller scale so the hero doesn't get diluted.
- Numbers — especially calories — should carry strong visual presence throughout, achieved through weight, spacing, and contrast against the dark surface, not through introducing new sizes everywhere.

## 3. Primary Composition

The calculator should feel like a branded nutrition tool, not a form.

Visual hierarchy, top to bottom:
1. Strong masthead ("Calories Calculator").
2. Bold entry statement ("What are you eating?") as an editorial headline, not a form label.
3. Prominent search field — still the primary entry point, per `UX_ARCHITECTURE.md`.
4. Restrained secondary "Find a recipe" action — still secondary, still clearly visible, per the existing entry-point decision.
5. Editorial food-item rows ("Your meal").
6. Large calorie total as the visual hero of the screen.
7. Target relationship as quiet, supporting information beneath the hero number — never competing with it.

The calorie total should feel like the key product moment on this screen — the one place the "poster" gesture is loudest.

**Conceptual structure** (visual reference only — not literal final copy or layout):

```
CALORIES
CALCULATOR

WHAT ARE
YOU EATING?

[ Search food or dish... ]

Find a recipe →

────────────

YOUR MEAL

CHICKEN BREAST
200g                         330

RICE
150g                         195

────────────

525
kcal

600 TARGET
88%
```

## 4. Food items

- Food rows read as editorial and data-forward, not as generic rounded list cards.
- Structure comes from strong typography and hairline rules, not from card chrome.
- Name, quantity, and calories keep clear, scannable hierarchy — calories should be the easiest value to find in a row at a glance.
- The existing interaction is preserved exactly: tapping a row opens the Quantity Editor inline, in place, as it does today. No new interaction is introduced here.

## 5. Recipe Discovery

Recipe Discovery should feel more editorial than a generic card grid.

Preferred direction:
- Strong discovery masthead.
- One visually dominant recipe composition per card — not a dense grid of small tiles.
- Cropped, intentionally framed food imagery (see §6).
- Large recipe title.
- Calories as a strong, easy-to-scan data point.
- Serving information visible (the existing "original serving is a reference point" decision — already surfaced today via `servingLabel` — carries forward unchanged).
- Target relationship shown as secondary, neutral information — never a filter, never color-coded, exactly as today.

Explicitly avoid: a Pinterest/masonry-style grid, and any emoji anywhere in the interface.

## 6. Imagery

- Food imagery, where used, is editorial: high-contrast, tightly cropped, intentional — never a generic stock-photo look, never a decorative illustration, never emoji.
- Imagery supports the brand; it does not become decoration for its own sake.
- Primary Composition stays data-first — imagery must not compete with or overwhelm the calculation surface. If imagery appears there at all, it stays minor (e.g. the existing placeholder-style treatment), never a hero element.
- Recipe Discovery is where imagery may play a more prominent, but still restrained and intentional, role — per §5.
- Whether real photography is sourced at all, versus continuing with a typographic/graphic placeholder treatment, is an implementation-time decision, not decided by this direction document.

## 7. Surfaces

- Dark, layered surfaces replace white/paper cards. Layering is built from surface-color steps (background vs. elevated surface) plus hairline borders and typographic contrast — not from shadows.
- Avoid excessive rounded containers — the restrained-radius discipline from Acid Market carries forward unchanged.
- Avoid heavy shadows; a dark UI especially tends to reach for glow/shadow for depth, and this direction deliberately resists that.
- Avoid gradients unless there is a genuinely strong, specific product-level reason — the default is flat, contrast-driven surfaces.
- Hierarchy comes from borders, contrast, spacing, and typography — the same principle Acid Market already established, just executed on an inverted (dark) base.

## 8. Acid-lime usage

Lime may be used for:
- Primary confirm actions.
- Selected/active states.
- Key brand accents.
- Typographic highlights.
- Subtle graphic markers.
- The calorie hero treatment (e.g. as a graphic accent around or near the hero number — a mark, a rule, a unit label — not necessarily coloring the digits themselves).

Lime must **not** automatically mean: healthy, suitable, success, or below target.

Clarifying rule for the calorie hero treatment specifically: if lime is used anywhere near or on the hero calorie number, that use must be **static** — present or absent the same way regardless of whether a target is set, and regardless of the total's relationship to that target. Lime applied to the hero number can never vary based on calorie fit; doing so would recreate the exact status-coding this product explicitly rejects, just via a different visual channel than color-on-a-badge.

## 9. Motion / interaction

Motion stays restrained. Existing transitions (e.g. border-focus transitions) may remain as they are. This direction does not introduce an elaborate animation system, and none should be added when this is implemented.

## 10. Mobile

- Primary target: **375px**.
- Must remain strong at **320px** and **430px**.
- No horizontal overflow at any of the three.
- The system should feel intentionally mobile — composed for a phone frame — not like a desktop layout compressed into one.

## 11. What must not change

- UX architecture (calculator-first entry, no mode-selection screen, recipe discovery as a secondary path, recipe seeds the same composition surface).
- Calculation logic (`food item × quantity = calories`, the shared engine).
- Recipe data model.
- Target logic (optional, user-owned, never derived/suggested/defaulted, neutral numeric relationship only).
- Quantity Editor behavior.
- Recipe → Composition behavior (selection seeds/replaces the meal, no separate recipe-editing context).
- Component responsibilities, as scoped in `COMPONENT_INVENTORY.md`.
- Storybook's purpose (documenting the reusable components).
- Neutral calorie-fit semantics — no pass/fail, no color-coded status, ever.

## 12. What this direction should fix

The product currently risks reading as:
- a generic React form;
- a default SaaS dashboard;
- a collection of rounded cards;
- a beige utility calculator;
- an AI-generated "clean app" template.

It should instead feel:
- bold;
- editorial;
- branded;
- data-confident;
- energetic;
- intentional;
- technically restrained.

## 13. Implementation principle

Do not blindly copy any reference image. Translate these visual principles into a coherent product system, executed through the existing token architecture (primitives → semantics → components) once implementation begins.

The goal is not imitation. The goal is a distinctive Calories Calculator identity.

## Implementation strategy

A short prioritized sequence for the future implementation pass — not started by this document:

1. Global color/surface transformation.
2. Typography hierarchy.
3. Primary Composition redesign.
4. Recipe Discovery redesign.
5. Component adaptation.
6. Responsive QA.
7. Storybook visual alignment.
