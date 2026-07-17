# CLAUDE.md — PAXIA

Operating rules for Claude Code in this repository.
This file wins over assumptions. Documentation wins over this file only where it is more specific.

---

## Read Order

1. `PROJECT_STATE.md` — always, first, every session.
2. `docs/01_TOKENS.md` — before any styling.
3. The one doc relevant to the task. Not all of them.

`docs/00_VISION.md` is read once, at onboarding. Do not re-read it per task.

---

## Project

PAXIA — luxury fashion house. One ecosystem, six surfaces:
Collections · Bespoke · Store · Agency · Journal · About.

Not an ecommerce template. An editorial fashion environment that sells.

---

## Stack

Next.js (App Router) · TypeScript (strict) · Tailwind · Motion (Framer Motion) ·
React Three Fiber / Three.js · React Context, Zustand only when justified ·
Lucide · Vercel.

No new dependency without a written justification in the PR body.

---

## Folder Map

```
/app          routes only — thin, server-first
/components   shared primitives (Button, Frame, Type, Field)
/features     domain modules (collections, bespoke, store, agency, journal)
/hooks
/lib          pure utilities, no React
/styles       tokens.css, globals.css
/public
/docs
```

One purpose per file. No `utils/misc.ts`. No new top-level folders.

---

## Hard Constraints

These are checkable. They are not suggestions.

**Tokens**
- No raw hex, rgb, oklch in components. Only `var(--*)` or Tailwind tokens mapped to them.
- No raw px spacing. Only the spacing scale.
- No raw ms/cubic-bezier. Only motion tokens.
- Violations fail lint (`no-restricted-syntax` + custom rule).

**Motion**
- Every animation uses a duration token AND an easing token from `01_TOKENS`.
- No `bounce`, `elastic`, `spring`, `overshoot`, `backOut`. Ever.
- No `transform: scale()` on hover. Ever.
- Max 3 concurrent motion layers per viewport.
- Animate `transform` and `opacity` only. Anything else needs a comment explaining why.

**Type**
- Display serif is never below 32px.
- UI sans is never above 20px.
- Body copy: max 68ch.
- No centered text blocks over 3 lines.

**Images**
- `next/image` always. `sizes` always. Explicit aspect ratio always.
- Below fold = lazy. Hero = priority.
- Never `object-fit: fill`.

**Accessibility**
- Semantic HTML. `<div>` is never a button.
- Visible focus on every interactive element, using `--focus-ring`.
- Touch targets ≥ 44px.
- Text on imagery requires a scrim token, never bare text.
- `prefers-reduced-motion`: reduce travel and duration, keep opacity and hierarchy. Never disable transitions wholesale.

**Performance**
- LCP < 2.0s. INP < 100ms. CLS < 0.02. 60fps.
- No client component without a reason. Server-first by default.

---

## Workflow

Plan → Build → Self-QA → Commit.

**Plan** — state the goal, the files you'll touch, the tokens you'll use. If a token is missing, stop and add it to `01_TOKENS.md` first. Never inline a one-off value.

**Self-QA** — run `pnpm check` (types, lint, token-lint). Then verify against the acceptance list in the relevant doc.

**Commit** — small, single-purpose, imperative mood. Main stays deployable.

---

## When Blocked

Do not improvise. Do not silently simplify. Do not swap a feature for an easier one.
State the conflict, propose 2 options with tradeoffs, wait.

If documentation is missing: write the doc first, then implement. Never the reverse.

---

## Component Rules

Before creating a component, check `/components` and `/features`. Extend before creating.
No duplicate logic. No duplicate styling. PascalCase components, camelCase vars, kebab-case folders.

A PAXIA **Frame** is not a card. Measurable definition:
`border-radius: 0` · no box-shadow · no border · image bleeds to edge · label sits inside the image in the corner · separation comes from the seam gap, never from elevation.

If it has a radius and a shadow, it is a card, and it is wrong.

---

## Do Not

- Do not redesign shipped UI without an explicit request.
- Do not add glassmorphism, neon, decorative blur, parallax without purpose.
- Do not use library default presets.
- Do not use WebGL for particles, noise, or spectacle.
- Do not write comments that restate the code. Comment *why*.
- Do not commit `TODO` without an issue link.
- Do not prioritize speed over quality. Quality is the deliverable.

---

## Final Rule

Every commit should make PAXIA feel more inevitable.
If a change does not improve the experience, do not ship it.
