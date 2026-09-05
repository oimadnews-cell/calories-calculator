# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

Product Discovery and Recipe Story analysis are complete. The confirmed product decisions and UX flows are documented in:

- `PRODUCT_BRIEF.md` — confirmed product decisions and shared calculation model
- `UX_ARCHITECTURE.md` — confirmed flows and surfaces
- `RECIPE_STORY_ANALYSIS.md` — analysis behind the recipe-suitability decision

Visual direction, design system, and technical architecture have **not** been decided yet, and no application code has been written. Do not write application code until those remaining decisions are made (see "Not Yet Decided" below).

## Assignment Context

This repository is for a UX/UI Engineer Trainee take-home assignment.

**Role:** UX/UI Engineer Trainee

**Product:** Calories Calculator mobile app

**Core user stories (confirmed):**
1. As a user, I want to calculate the amount of calories in a dish or a specific product.
2. As a user, I want to find a recipe for a dish that is suitable for me.

**Required deliverables:**
1. Branding / Stylescape.
2. Design System, using Claude Code.
3. Key Design Screens / Key Flows, using Claude Code.

## Company Expectations

- Strong intersection of Design and Technology.
- AI-native workflow is important; use AI to accelerate design and development work.
- Interfaces should be functional and useful, not only visually attractive.
- Technical feasibility matters.
- Design should consider web interface logic, DOM, styles, and reusable components.
- Design fundamentals include typography, grids, hierarchy, and whitespace.
- Should be able to distinguish functional UI from generic AI-generated layouts.
- Claude Code and Storybook are mentioned in the company's workflow.
- Figma is considered a secondary canvas for style exploration.

## Required Workflow

- Must use a paid Claude subscription and Claude Code.
- Deliverables must be placed in a GitHub repository.
- Deliverables must be accessible from incognito mode.
- All deliverables must be in English.
- A video presentation must cover Branding, Design System, and Final Designs.

## Confirmed Product Decisions

See `PRODUCT_BRIEF.md` and `UX_ARCHITECTURE.md` for full detail. Summary:

- Two core user stories: calculating calories for a dish/product, and finding a suitable recipe.
- "Suitable" (v1) = calorie fit against a per-meal calorie target, but only when the user has set one. The target is optional and user-owned, set via a single numeric input, and never supplied/derived/suggested/prefilled by the product. Without a target, fit is unavailable/undefined — never an implicit pass. Fit is a neutral numeric relationship to the target, not a pass/fail judgment.
- Entry point is calculator-first: there is no mode-selection screen. The composition/calculation surface is the canonical product surface; recipe discovery is a clearly visible secondary input method that feeds that same surface — there is no separate recipe editing context.
- Recipe discovery is a real core flow, not a future hypothesis, and must not hard-filter by calorie target.
- A selected recipe becomes an editable composition, evaluated by the same calorie calculator used for direct dish/product calculation.
- The recipe's original serving is a reference point; the user's actual portion is adjustable before the final verdict.
- Specific product and composed dish share one calculation primitive: food item × quantity = calories, using a hybrid quantity model (named portions with grams/ml as a precision fallback).
- Manual composition remains fully functional, with a manual-entry escape hatch for unknown food items.
- Scope is intentionally kept small (take-home constraint).

## Explicitly Out of Scope for v1

- AI photo recognition — optional product hypothesis only; must not become part of the core architecture.
- Navigation, accounts/authentication, tracking, macros, pantry matching, allergies, and social features — not part of the two confirmed core flows.
- Any system-supplied, derived, or suggested calorie target — the target is always user-entered.
- A separate mode-selection screen, and a separate recipe editing context distinct from the shared composition surface.

## Not Yet Decided

The following remain genuinely open and should not be assumed:

- Target audience
- Cross-session persistence of the calorie target
- Nutrition/ingredient database source
- Onboarding
- Visual style
- Colors
- Typography
- Framework
- Component library
- Backend
- API
- Data persistence
