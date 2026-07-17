# PAXIA — Quality

> Accessibility, performance, and voice. Merged because they share one property:
> they are the constraints that make luxury *credible* rather than claimed.

---

# 1. Accessibility

Luxury that excludes is not luxury. It is a velvet rope, and a velvet rope is insecurity.

## Non-negotiable

- Semantic HTML. `<div onClick>` is never a button.
- Visible focus on every interactive element via `--focus-ring`. Never `outline: none`
  without a replacement.
- Touch targets ≥ 44 × 44px.
- Contrast per the table in `01_TOKENS.md` §1.9.
- Text over imagery **always** uses a scrim token.
- `prefers-reduced-motion` reduces travel, never removes hierarchy.
- Keyboard reaches everything, in DOM order, and never traps.
- All imagery has `alt`. Decorative imagery has `alt=""`.
- Form fields have real `<label>`. Placeholder is never a label.
- Errors are announced (`aria-live="polite"`) and describe the fix.
- Language attribute set; `EN` switcher updates `<html lang>`.

## Watch list — where luxury sites fail

1. **Low-contrast metadata.** `--u-nano` at `--text-metadata` is 4.69:1 — the floor, and
   only legal at ≥14px. Never take it lower for elegance.
2. **Text on photography.** The reference's city strip failed this outright. Scrim always.
3. **Invisible focus.** A focus ring is not a design compromise. It is the design.
4. **Scroll-jacking.** Banned. Custom scroll timing steals the one control users own.
5. **Hover-only affordance.** Every hover reveal has a focus and a touch equivalent.

## Testing

Axe clean · keyboard-only pass on every flow · VoiceOver on Home/Product/Checkout ·
reduced-motion pass · 200% zoom without loss.

---

# 2. Performance

Performance is a luxury signal. A slow site does not read as considered; it reads as
unmaintained. Precision is felt in milliseconds before it is seen in pixels.

## Budgets

| Metric | Target | Fail |
|---|---|---|
| LCP | < 2.0s | > 2.5s |
| INP | < 100ms | > 200ms |
| CLS | < 0.02 | > 0.05 |
| FPS | 60 | any sustained drop |
| JS (route, gz) | < 120kb | > 180kb |
| Hero image | < 220kb | > 350kb |
| Fonts | ≤ 4 files | > 5 |

CI fails on the fail column. Budgets are not aspirations.

## Rules

- Server components by default. `'use client'` requires a reason.
- `next/image` always, with `sizes`, explicit ratio, `priority` on hero only.
- AVIF → WebP → JPEG.
- Fonts: `woff2`, `font-display: swap`, preload display + UI regular only. Subset to Latin
  + Armenian (Yerevan flagship).
- Dynamic-import R3F, galleries, modals. Never in the initial bundle.
- Virtualize any list over 40 items.
- No layout thrashing. Batch reads and writes.
- `will-change` only while animating, removed after.

## WebGL

WebGL supports the interface. It never becomes the interface.

Permitted: fabric response · natural reflection · atmospheric depth · environmental light.
Banned: particles · decorative noise · heavy simulation · anything a user would name.

Gated behind: `≥ --bp-lg` · `!prefers-reduced-motion` · `deviceMemory ≥ 4` · WebGL2
support. Every gate fails to a static image that is *good on its own*.

If it cannot degrade to a photograph, it should not exist.

---

# 3. Voice

The brand speaks softly. Every sentence is intentional.

**Tone:** professional · elegant · confident · warm · direct · measured.
**Never:** sarcastic · trendy · internet culture · marketing language.

## Copy Rules

Short sentences. Strong nouns. Minimal adjectives.
No urgency. No scarcity. No clickbait. No exclamation.
Write as if every word costs money.

## CTA

| Use | Never |
|---|---|
| Explore Collection | Buy Now |
| View Piece | Shop Fast |
| Discover | Limited Time |
| Visit Store | Get Yours |
| Book Appointment | Click Here |
| Request Bespoke | Learn More |
| Enter Journal | Sign Up Today |

## Naming

Collections feel curated, not catalogued.

Good: The Atelier Collection · Winter Study · Volume One · Stone Series · Material No.03
Bad: Ultra Collection · Premium Line · Luxury Series · Elite Edition

## Errors

Never blame. Always explain. Always offer the next step.

Good: "That card was declined. Try another, or we can hold this piece for 24 hours."
Bad: "Payment failed. Error 402."

## AI Assets

AI generates possibilities. Humans decide.

Every generated image must match the system's lighting, lens language, grading, and material
behavior. Reject anything that reads as AI on first glance. Structure never depends on a
specific image — every layout must survive replacement by real photography.

Believability is mandatory. Imperfection often reads more premium than perfection.

---

# 4. Definition of Done

A feature ships only when all are true:

- [ ] Matches its doc
- [ ] Tokens only — `pnpm check` clean
- [ ] All component states implemented
- [ ] Every breakpoint recomposed, not scaled
- [ ] Axe clean, keyboard pass, reduced-motion pass
- [ ] Budgets met
- [ ] Motion cites tokens, answers the one test
- [ ] No console errors, no TS errors
- [ ] Copy follows voice
- [ ] Passes the Removal Test (`00_VISION.md`)

One failure means not done.
