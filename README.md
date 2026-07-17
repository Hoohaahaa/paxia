# PAXIA

A fashion ecosystem — ready-to-wear, bespoke atelier, flagship stores, agency, and journal,
under one identity, on one platform.

## Stack

Next.js (App Router) · TypeScript (strict) · Tailwind (a thin alias layer over design
tokens) · self-hosted fonts via `next/font`.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Scripts

```bash
pnpm check        # tsc --noEmit + eslint + token-lint (run before every commit)
pnpm build        # production build
pnpm start        # serve the production build
```

## The design system is the contract

The whole system is specified in `docs/` and enforced in CI:

- `docs/PROJECT_STATE.md` — read first, every session; the only file that changes constantly.
- `docs/01_TOKENS.md` — every value that can be seen or timed. If it is not here, it does
  not exist.
- `styles/tokens.css` — the tokens as CSS custom properties (the source Tailwind and
  `token-lint` resolve against).
- `token-lint.mjs` — fails the build on any raw color, spacing, duration, easing, or
  undeclared token in `app/`, `components/`, or `features/`.

To add a value, edit `docs/01_TOKENS.md` first, then `styles/tokens.css`. Never inline.
