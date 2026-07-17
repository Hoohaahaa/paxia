# PAXIA — Components

> Extend before you create. Every component inherits the PAXIA language automatically
> or it is not a PAXIA component.

---

# The Frame

The central primitive. Everything visual that is not raw type is a Frame.

**A Frame is not a card.** The distinction has been unenforceable in every prior doc.
Here it is measurable:

| | Card (banned) | Frame (correct) |
|---|---|---|
| radius | `4–16px` | `--r-none` |
| shadow | elevation | none |
| border | 1px box | none |
| ground | lighter than page | `--surface-frame` or image |
| image | inset with padding | bleeds to all edges |
| separation | gap + elevation | `--seam` only |
| label | below image | inside image, corner |

If it has a radius and a shadow, it is a card, and it is wrong.

A Frame behaves like a gallery mount: it isolates importance, it never decorates.

## Anatomy

```
┌──────────────────────────────┐
│ COLLECTIONS ↗   ← --u-micro, inset --s-5, --text-secondary
│                              │
│         [image bleeds]       │  --img-ratio-portrait
│                              │
│                              │
│ L'Essence      ← --d-1, --text-primary
│ FALL / WINTER 2024  ← --u-nano, --text-metadata
│ ────────────                 │  --line-hairline
│ EXPLORE COLLECTION  ← --u-micro
└──────────────────────────────┘
   ↑ --scrim-bottom under all text
```

## States

```
default   scrim-bottom @ 0.88 · --lift-frame @ 0.05
hover     scrim → 0.82 · --lift-frame → 0.09 · rule --line-hairline → --patina-500
          image does not move · --t-fast --e-out
focus     --focus-ring
pressed   translateY(1px) --t-instant
```

## Variants

`Frame.Collection` · `Frame.Product` · `Frame.Campaign` · `Frame.Store` ·
`Frame.Agency` · `Frame.Journal`

One component. Six configurations. Not six components.

---

# Strip

Layout primitive. Five Frames, `--seam` apart, edge-to-edge, `--strip-h`.

```
≥ --bp-lg    5 across, fixed
--bp-md      scroll-snap, 2.2 visible
< --bp-md    scroll-snap, 1.4 visible
```

The partial frame at the edge is deliberate — it is what invites the swipe. Never show
a whole number of frames on a scrolling strip.

Keyboard: arrow keys move focus, `scroll-snap` follows focus, never traps.

---

# Button

Crafted object, not an interface control.

| Variant | Ground | Text | Rule |
|---|---|---|---|
| Primary | `--ink-000` | `--text-on-bone` | — |
| Secondary | transparent | `--text-primary` | `--line-hairline` |
| Ghost | transparent | `--text-secondary` | — |
| Text | — | `--text-primary` | underline on hover |

```
type      --u-micro, uppercase, tracking --u-micro-track
padding   --s-4 --s-6
radius    --r-soft (2px — the only radius in the system)
min-h     44px
hover     --t-fast --e-out — light and contrast only
press     translateY(1px) --t-instant
focus     --focus-ring
```

Never oversized. Never a dramatic color change. Never a gradient.

---

# Link

Never color alone. A rule draws left→right on hover, `--t-fast` `--e-out`,
`--line-hairline` → `--patina-500`.

Editorial links inside prose: `--patina-400` text + persistent hairline underline.

---

# Field

Forms are conversations. They resemble a printed document, not software.

```
ground     transparent
rule       --line-hairline, bottom only
radius     --r-none
label      --u-nano, uppercase, --text-metadata, above
input      --u-base, --text-primary
focus      rule → --patina-500 over --t-fast — light landing on a surface, not a box
error      rule → --err, message --u-small below, never red-fills the field
min-h      44px
```

Validation reassures. Never punishes. Never blames.

---

# Navigation

`Rail` · `RailMobile` · `MenuPanel` · `SectionIndex` · `Breadcrumb`

Always orienting. Never dominant. Never covers photography. See `02_LAYOUT_IA.md`.

---

# Media

`Image` — wraps `next/image`, requires ratio token + `sizes`, enforces scrim when it has
children.
`Gallery` — selected image is the origin of the next layout.
`Video` — natural grading, no cinematic filters, `poster` always, muted autoplay only
when decorative and never above 1080p.

---

# Feedback

`Toast` — bottom-left, above rail, `--surface-raised`, `--t-normal`, auto-dismiss 5s,
pauses on hover.
`EmptyState` — editorial, not generic. A statement `--d-1` + one action. Never an icon
of a sad box.
`ErrorState` — human, actionable, never technical. Always offers a next step.

---

# Utility

`Accordion` · `Tabs` · `Tooltip` · `Progress` · `Pagination` · `Divider` · `Spacer`

Use only when improving clarity. `Skeleton` is **banned** — see `03_MOTION.md` → Loading.

---

# Universal Requirements

Every component defines: purpose · hierarchy · spacing · all states · motion · responsive ·
accessibility. Nothing is left to implementation guesswork.

Every interactive component supports:
`default · hover · focus · pressed · active · selected · disabled · loading · error`

---

# Acceptance

- [ ] Uses only tokens — no raw values
- [ ] All states defined
- [ ] Keyboard operable, visible focus
- [ ] Touch target ≥ 44px
- [ ] Semantic element (`<button>`, not `<div onClick>`)
- [ ] Motion cites tokens
- [ ] No radius except `--r-soft` on Button
- [ ] No shadow except `--lift-modal`
- [ ] Recomposes at every breakpoint
- [ ] Extends an existing primitive, or documents why it cannot

---

# Final

Users should never recognize components. They should recognize PAXIA.
