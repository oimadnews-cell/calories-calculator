# Design System — Foundations & Tokens

Status: foundations and tokens only. No components or product screens exist yet — see "Not Yet Decided" in `CLAUDE.md` for what still has to happen before that work starts.

Source of truth: `design-system/tokens/` (CSS custom properties). This document explains the *why* behind those files; the files themselves are the *what*.

## Visual direction

Selected territory: **Acid Market** — warm paper, near-black ink, and a single acid-lime accent, inspired by produce-market signage and contemporary food posters. Confirmed in the stylescape work (`Stylescape — Final Direction` in the connected Figma file).

Core principle:

> "Expression lives in the frame. Discipline lives in the data."

Branding and expressive moments (headlines, the calorie number, marketing surfaces) can be bold. Calculator data and interaction — quantities, totals, search, buttons — must stay quiet, restrained, and highly readable. Every token decision below follows from this split.

Product personality driving these choices: friendly, clear, lightweight, practical, modern, non-judgmental.

## Token architecture

```
Primitive tokens
    ↓
Semantic tokens
    ↓
Future components
    ↓
Future product patterns
```

- **`design-system/tokens/primitives.css`** — raw values only (hex colors, raw font sizes, the spacing scale, radius scale, border widths, one shadow definition). No meaning attached. This is the only file that changes if the underlying palette, base spacing unit, or type scale changes.
- **`design-system/tokens/semantic.css`** — role-based aliases over the primitives (`--color-text`, `--text-heading-*`, `--space-card-padding`, etc.). This is the layer that carries *meaning* — what something is *for*.
- **`design-system/tokens/index.css`** — the only entry point. Imports primitives before semantics.

**Rule going forward:** future components bind only to semantic tokens (`var(--color-text)`, `var(--space-card-padding)`), never to primitives (`var(--palette-ink)`) and never to hard-coded values. If a component needs a value the semantic layer doesn't have yet, add a semantic token — don't reach past it.

## Color principles

Palette (Acid Market, confirmed):

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#F9F6EE` | Default background — paper, not white |
| `--color-surface` | `#F0ECDD` | Slightly recessed surface (cards, inputs) |
| `--color-text` | `#1A1A16` | Primary text/ink |
| `--color-accent` | `#D7FF3D` | Acid lime — brand/action accent |
| `--color-supporting-tomato` | `#E8462C` | Occasional editorial accent |
| `--color-supporting-olive` | `#2B3B1F` | Occasional editorial accent |

**The interface is paper-and-ink by default.** Background and surface are both warm neutrals; ink carries almost all text and structure. Acid lime is the *only* saturated color in the system, which is what makes it effective — it appears rarely and on purpose.

**Using the accent — read this before binding `--color-accent` to anything:**

- Acid lime means *brand* or *primary action* — a solid block, a primary button, a single emphasis mark. It is never a status.
- Acid lime **must not** mean "healthy," "good," "within target," or any positive calorie judgment. There is no green-for-good / red-for-bad system in this product, by explicit product decision (`PRODUCT_BRIEF.md`: fit is a *neutral numeric relationship* to a target, never a pass/fail judgment).
- **`--color-supporting-tomato` and `--color-supporting-olive` are not semantic status colors either.** They exist for occasional editorial/graphic use (as seen in the stylescape), not to mean "over" or "under." Do not repurpose tomato as an implicit "error" or "above target" signal — that would recreate the exact good/bad color-coding the product explicitly rejects.
- Consequently, this token set deliberately has **no** `--color-success`, `--color-error`, `--color-warning`, or similar. If a future need for genuine system feedback (a real error state, e.g. a failed network request) arises, that is a new, explicit decision to make later — not something to back into by repurposing the accent or supporting colors.
- `--color-on-accent` (black) is the only text/icon color ever placed on top of `--color-accent` — acid lime is too light for white text and the stylescape established black-on-lime as the pairing.

## Typography principles

Two families, split by role, not mixed within a role:

- **Display — Bricolage Grotesque.** Used only for the large numeric moment, headings, and subheadings. Expressive, has personality, earns its place in the "frame."
- **Functional/UI — Inter.** Used for everything else: body copy, labels, item values, quantities. Quiet, neutral, highly legible — this is the "data" half of the core principle.

Seven roles, intentionally not more (`--text-<role>-family/size/weight/line-height`):

| Role | Family | Size | Weight |
|---|---|---|---|
| `display` | Bricolage Grotesque | 64px | 800 |
| `heading` | Bricolage Grotesque | 28px | 800 |
| `subheading` | Bricolage Grotesque | 18px | 600 |
| `body` | Inter | 15px | 400 |
| `body-small` | Inter | 13px | 400 |
| `label` | Inter | 12px | 500 |
| `item-value` | Inter | 14px | 500 |

`display` exists specifically for the calorie number — confirmed in the stylescape as the product's single most important visual element. Nothing else in the interface should compete with it at that scale. Everything below `heading` is Inter by design: hierarchy comes from size and weight, not from mixing display faces into functional contexts.

This is a compact scale on purpose (7 roles, not 15) — a calculator's data density doesn't need more, and every additional size is one more thing to keep consistent.

## Spacing philosophy

Base unit: **4px**. The scale (`--space-1` through `--space-12`) is linear multiples of that unit, restrained to what a 375px mobile frame actually needs — there is no attempt to cover every conceivable gap.

Semantic spacing tokens are named by **relationship**, not by pixel value, so a component author picks based on what two things are to each other:

- `--space-inline-tight` (4px) — an icon hugging a label
- `--space-inline` (8px) — a small inline group (e.g. quantity + unit)
- `--space-item-row-gap` (12px) — between rows in a list, like food items in a meal
- `--space-card-padding` (16px) — internal padding for a card or row container
- `--space-page-margin` (20px) — left/right screen margins
- `--space-section-gap` (32px) — between major sections on a single screen

If a future component needs a gap that doesn't map to one of these relationships, that's a signal to add a new named semantic token — not to drop a raw pixel value into component code.

## Radius philosophy

The Acid Market direction is explicitly **not** heavily rounded — it reads as editorial/poster, not as a soft consumer-app.

- `--radius-small` (4px) — inputs, quantity fields, small tags
- `--radius-medium` (8px) — cards, buttons, images
- `--radius-full` (999px) — reserved for genuinely circular/pill elements only (e.g. an avatar, a true pill toggle) — not a default button or card treatment

Two real steps plus a special-case full radius. Nothing in the system should default to `--radius-full` for ordinary buttons or cards.

## Border & shadow philosophy

Borders carry structure in this system more than shadows do — that's the paper/editorial language the stylescape established (hairline rules, outlined blocks) rather than a soft, floating-card aesthetic.

- `--border-subtle` — 1px, `--color-border` (ink at 12% opacity). Default separator/outline. This is a shorthand token: `border: var(--border-subtle);` works directly.
- `--border-strong` — 1.5px, `--color-border-strong` (solid ink). Reserved for real emphasis — e.g. flagging that a value just changed, a focused input — not a default state.

Shadows are minimal by direction (no drop shadows, nothing decorative). `--shadow-elevation-1` is the **only** shadow token, meant for the rare case something must visually lift off the page (e.g. a modal/sheet over content). Reach for a border before reaching for a shadow.

## Assumptions made

These were necessary implementation choices, not confirmed product decisions — flagging them explicitly:

- **CSS custom properties** as the token format, per this task's explicit instruction — this doesn't imply or decide a web framework, and frameworks/backend remain undecided per `CLAUDE.md`.
- **Base spacing unit of 4px** and the specific scale steps (4/8/12/16/20/24/32/40/48) — a common, restrained convention for a compact mobile scale; not something the product docs specified.
- **Exact type sizes** (e.g. 64px display, 28px heading) were sized for a 375px mobile frame consistent with the wireframes, not pulled from a confirmed spec.
- **Font loading/fallback stacks** are not addressed here (no `@font-face`, no system-font fallback chain) — that's an implementation detail for whenever a framework is chosen.
- **No dark mode / theming layer** — the approved direction is a single paper/ink look; nothing in the product docs asks for a second theme, so none was added.
- **`--shadow-elevation-1`'s exact values** (blur/spread/opacity) are a reasonable, minimal placeholder for "subtle elevation," not a confirmed spec.

None of these affect the confirmed product/UX decisions in `PRODUCT_BRIEF.md` or `UX_ARCHITECTURE.md` — they're purely implementation choices at the tokens layer.
