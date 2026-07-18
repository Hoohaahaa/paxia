# PAXIA — Design Tokens

> The single source of every value that can be seen or timed.
> If a value is not here, it does not exist.
> To add a value, edit this file first. Never inline.

---

# 1. Color

## 1.1 Philosophy

The reference explored pure black (`#000000`). We reject it.

Pure black is the cheapest color on the web — it is the browser default, it is what every
template ships with, and it renders as a dead hole on OLED. Luxury black is never neutral.
It is a **warm, low-chroma near-black** that behaves like dyed wool or blackened brass:
it absorbs light rather than deleting it, and it holds a faint hue that the eye registers
as *material* without ever naming the color.

Our entire neutral ramp sits on a single warm hue axis (**h ≈ 60–70**, the hue of raw linen
and bone) with chroma that rises slightly in the midtones — the way real pigment does —
and falls at both ends. This is why the palette will read as expensive at a glance and
survive next to photography without fighting it.

All colors are authored in **oklch** for perceptual uniformity. Every step in the ramp is a
genuine equal-lightness step, so contrast math is predictable and hierarchy is reliable.

## 1.2 The Ink Ramp (warm near-black → bone)

```
--ink-950   oklch(0.13 0.004 65)    #080706   Void. Page ground.
--ink-900   oklch(0.17 0.005 65)    #110F0D   Rail, footer.
--ink-850   oklch(0.21 0.006 62)    #1A1816   Raised ground, seams.
--ink-800   oklch(0.26 0.008 60)    #272320   Frame ground, store tiles.
--ink-700   oklch(0.34 0.009 58)    #3C3733   Hairlines on dark.
--ink-600   oklch(0.45 0.010 58)    #5A5450   Disabled, deep metadata.
--ink-550   oklch(0.58 0.010 60)    #7F7974   Metadata, captions.  [AA floor]
--ink-400   oklch(0.66 0.011 62)    #97918B   Secondary text on dark.
--ink-300   oklch(0.76 0.010 66)    #B6B0AB   Muted body.
--ink-200   oklch(0.85 0.008 70)    #D1CDC8   Body on dark.
--ink-100   oklch(0.91 0.007 72)    #E4E1DC   Bright body.
--ink-050   oklch(0.955 0.006 74)   #F3F0EC   Near-white text.
--ink-000   oklch(0.98 0.005 76)    #FAF8F5   Bone. Highest text.
```

Note what is absent: `#FFFFFF`. Pure white is as cheap as pure black. Our lightest value is
**bone** — it reads as paper stock, not as a screen.

## 1.3 Semantic Surfaces

```
--surface-void           var(--ink-950)   page background
--surface-rail           var(--ink-900)   persistent navigation rail
--surface-raised         var(--ink-850)
--surface-frame          var(--ink-800)   editorial frame ground
--surface-inverse        var(--ink-000)   bone sections (Journal, Bespoke docs)
--surface-inverse-hover  var(--ink-050)   hover ground for inverse-ground objects
--surface-scrim          oklch(0.13 0.004 65 / 0.62)
--surface-scrim-soft     oklch(0.13 0.004 65 / 0.34)
```

Scrims are **void-based in both schemes** — they sit on photography, and the
photography does not change with the scheme.

## 1.4 Semantic Text

```
--text-primary        var(--ink-000)
--text-secondary      var(--ink-200)
--text-muted          var(--ink-400)
--text-metadata       var(--ink-550)
--text-on-bone        var(--ink-900)
--text-on-bone-muted  var(--ink-600)
```

**Text over photography never follows the scheme.** Imagery is graded dark and
scrims are void-based in both schemes, so text on images uses fixed tokens:

```
--text-on-image            var(--ink-000)   never remapped
--text-on-image-secondary  var(--ink-200)   never remapped
--text-on-image-muted      var(--ink-400)   never remapped
```

Any text inside a Frame, hero, campaign, or image band uses `--text-on-image-*`,
not `--text-*`. This is what keeps the light scheme from ever putting dark text
on a dark scrim.

## 1.5 Line

```
--line-hairline   oklch(0.98 0.005 76 / 0.10)   default rule on dark
--line-strong     oklch(0.98 0.005 76 / 0.22)   active/hovered rule
--line-on-bone    oklch(0.13 0.004 65 / 0.14)
```

Borders are a last resort. Prefer seam, space, or light.

## 1.6 Accent — Patina

One accent. Not five. Five accents is a design system with no opinion.

```
--patina-600  oklch(0.52 0.062 78)   #7D653F   pressed
--patina-500  oklch(0.60 0.070 80)   #967C4F   base — links, focus, active index
--patina-400  oklch(0.74 0.068 82)   #C0A77A   hover
--patina-300  oklch(0.83 0.052 84)   #D7C5A1   subtle wash
```

**Patina** is aged, unpolished brass — the metal on an atelier door handle after twenty years
of hands. It is deliberately desaturated (chroma 0.07, not 0.15). It must never look like gold.
Gold is a brand asking to be seen as luxurious. Patina is a brand that has been here a while.

Budget: **< 3% of any viewport.** Used for the active state, the focus ring, and nothing else
by default.

Components never reference `--patina-*` directly. They use the scheme-aware alias:

```
--accent   var(--patina-500) on night · var(--patina-600) on day
```

Because patina-500 reads 5.06:1 on void but only 3.74:1 on bone (computed), the
day scheme steps the accent down to patina-600 (5.21:1 on bone). The alias is
what makes that swap a token change instead of a component hunt.

## 1.7 Functional

```
--ok      oklch(0.62 0.055 150)
--warn    oklch(0.72 0.075 75)
--err     oklch(0.58 0.095 25)
--info    oklch(0.64 0.045 240)
```

Desaturated intentionally. An error message should inform, not alarm.

## 1.8 Focus

```
--focus-ring    0 0 0 1px var(--surface-void), 0 0 0 3px var(--patina-500);
--focus-offset  2px
```

Focus behaves like light landing on a surface — a patina rule, never a browser-blue glow.

## 1.9 Contrast Contract

| Pair | Ratio | Use |
|---|---|---|
| `--text-primary` on `--surface-void` | 18.99:1 | headlines, body |
| `--text-secondary` on `--surface-void` | 12.71:1 | supporting |
| `--text-muted` on `--surface-void` | 6.45:1 | body min |
| `--text-metadata` on `--surface-void` | 4.69:1 | ≥14px only, never body |
| `--patina-500` on `--surface-void` | 5.06:1 | links, focus |
| `--text-on-bone` on `--surface-inverse` | 18.05:1 | inverse sections |

All ratios computed, not estimated. `--ink-500` (4.31:1) was **removed from the ramp** —
it failed AA and existed only as a tempting midpoint. `--ink-550` replaces it at the
compliant floor. Every remaining ink step above 550 is safe for text at any size.

**Text over photography always requires `--surface-scrim` or a gradient scrim.**
The reference's store strip (city names on bare imagery) fails this. Never repeat it.

## 1.10 Schemes — Night and Day

The house is dark-first; **night is the identity, day is a courtesy.** The day
scheme is a remap of the *semantic* layer only — the ink ramp, the patina scale,
the scrims, and every `--*-on-image` token are scheme-invariant. Nothing outside
`styles/tokens.css` knows which scheme is active.

Activation: `data-theme="day"` on `<html>`, set before first paint (inline
script), persisted as `paxia-theme`, defaulting to the visitor's
`prefers-color-scheme`, defaulting to night.

Day remaps (all ratios computed from the hex mirrors):

```
--surface-void            var(--ink-000)
--surface-rail            var(--ink-050)
--surface-raised          var(--ink-100)
--surface-frame           var(--ink-100)
--surface-inverse         var(--ink-950)
--surface-inverse-hover   var(--ink-850)
--text-primary            var(--ink-900)   18.04:1 on day ground
--text-secondary          var(--ink-700)   11.09:1
--text-muted              var(--ink-600)    7.03:1
--text-metadata           var(--ink-600)    7.03:1  (ink-550 reads 4.05:1 on bone — fails; stepped up)
--text-on-bone            var(--ink-050)   17.72:1 on day inverse
--text-on-bone-muted      var(--ink-300)    9.38:1
--line-hairline           = --line-on-bone values
--line-strong             ink-950 @ 0.28
--line-on-bone            ink-000 @ 0.14   (inverse sections are dark on day)
--accent                  var(--patina-600) 5.21:1  (patina-500 reads 3.74:1 — fails)
--focus-ring              rebuilt from day ground + patina-600
--lift-frame              inset ink-950 @ 0.08
```

What never remaps: the ink ramp, the patina scale, `--scrim-*`,
`--text-on-image-*`, grain, spacing, type, motion. Day is a lighting change,
not a redesign.

---

# 2. Typography

## 2.1 The Pairing

**Display — `Ogg`** (Sharp Type)
A high-contrast serif drawn from Oscar Ogg's mid-century calligraphic hand. Its thick/thin
modulation is *carved*, not engineered — the stems taper the way a brush lifts. It gives us
the couture authority of a Didone without Didone's coldness or its ubiquity in this category.

*Rationale over the obvious alternatives:* Didot and Bodoni are what every fashion house
already uses — instantly legible as "fashion," instantly anonymous. Canela and Reckless are
the current Awwwards default. Ogg has the same editorial weight and almost no presence in
luxury RTW, which is precisely the gap PAXIA occupies.

*Licensed fallback if Ogg is out of budget:* **Editorial New** (Pangram Pangram) — same
calligraphic contrast, permissive license, near-identical metrics.
*Free fallback:* **Playfair Display** — set only at `opsz` 48+, never below.

**UI — `Söhne`** (Klim Type Foundry)
A Helvetica descendant redrawn with warmth and slightly open apertures. It is neutral without
being cold — which is exactly the register the interface must hold while the serif does the
speaking. Its uppercase tracks beautifully at small sizes, which our nav depends on.

*Free fallback:* **Inter** with `tracking` retuned per the scale below.

**Mono — `Söhne Mono`** — measurements, SKUs, coordinates, store hours.
*Free fallback:* **JetBrains Mono**.

```
--font-display  'Ogg', 'Editorial New', var(--font-loaded-display, 'Playfair Display'), Georgia, serif;
--font-ui       'Söhne', var(--font-loaded-ui, 'Inter'), system-ui, sans-serif;
--font-mono     'Söhne Mono', var(--font-loaded-mono, 'JetBrains Mono'), monospace;
```

Two families. A third is a failure of nerve.

`--font-loaded-*` is injected at runtime by `next/font` (self-hosted, subset,
`font-display: swap`). Until the Ogg/Söhne licenses land it carries the free
fallback; after, the licensed name ahead of it wins with no other change. This
is the one-line swap `PROJECT_STATE.md` promised — the token file is the seam.

## 2.2 Display Scale

Fluid, clamped. Optical tracking tightens as size grows — large type needs *less* air between
letters, not more. This one detail separates typeset from typed.

```
--d-1  clamp(2.00rem, 1.6rem + 1.6vw, 2.75rem)   lh 1.10  tracking -0.010em
--d-2  clamp(2.75rem, 2.1rem + 2.6vw, 4.00rem)   lh 1.06  tracking -0.014em
--d-3  clamp(3.75rem, 2.6rem + 4.4vw, 6.00rem)   lh 1.02  tracking -0.018em
--d-4  clamp(5.00rem, 3.0rem + 7.4vw, 9.00rem)   lh 0.96  tracking -0.024em
--d-5  clamp(6.50rem, 3.2rem + 12vw, 13.5rem)    lh 0.92  tracking -0.030em
```

`--d-4` is the homepage headline. `--d-5` is reserved for campaign reveals — no more than
once per session.

Display is always `font-weight: 400`. If a headline needs bold to work, the headline is wrong.

## 2.3 UI Scale

```
--u-nano   0.6875rem  lh 1.30  tracking 0.16em  uppercase   index numerals, seam labels
--u-micro  0.75rem    lh 1.40  tracking 0.14em  uppercase   nav, eyebrows, CTA
--u-small  0.8125rem  lh 1.55  tracking 0.02em              metadata, captions
--u-base   0.9375rem  lh 1.65  tracking 0.00em              body
--u-lead   1.0625rem  lh 1.60  tracking -0.004em            standfirst, hero sub
--u-quote  1.25rem    lh 1.50  tracking -0.008em            pull quotes
```

One tracking value lives outside this scale: `--u-wordmark-track` (0.36em),
used **only** for the rail wordmark, so the mark reads as an identity rather
than a nav label. Do not reach for it anywhere else.

Uppercase tracking is non-negotiable. Uppercase set at default tracking is the single most
common tell of an amateur luxury site.

## 2.4 Rules

- Measure: 62–68ch body, 52ch max for standfirst.
- Never center a block over 3 lines.
- Never letter-space lowercase.
- Never use display serif below 32px — its contrast collapses and it looks broken.
- Never use UI sans above 20px — it has no authority at scale; that is the serif's job.
- Numerals: `tabular-nums` in tables, prices, measurements. `oldstyle` in body prose.
- No fake small-caps. Real `font-variant-caps` or uppercase + tracking.

---

# 3. Space

Base unit **4px**. The scale is non-linear on purpose — it accelerates so that hierarchy is
felt as a jump, not read as a gradient.

```
--s-1     4px
--s-2     8px
--s-3     12px
--s-4     16px
--s-5     24px
--s-6     32px
--s-7     48px
--s-8     64px
--s-9     96px
--s-10    128px
--s-11    192px
--s-12    256px
--s-13    384px
```

**Section rhythm** — the vertical intervals that create the gallery pace:

```
--sect-tight    var(--s-9)    96px    within a module
--sect-normal   var(--s-11)   192px   between modules
--sect-wide     var(--s-12)   256px   between chapters
--sect-hero     var(--s-13)   384px   before/after a campaign reveal
```

Importance increases space. Do not equalize spacing across the interface — equal spacing is
a spreadsheet, not an editorial.

**Seam** — the gap between frames in a strip. This is a signature value:

```
--seam  1px
```

One pixel. Not eight. The frames should read as a single cut sheet with a knife line
between them — not as separate objects floating on a background. `--surface-void` shows
through the seam.

---

# 4. Layout

## 4.1 Breakpoints

```
--bp-sm    640px     phone landscape
--bp-md    900px     tablet portrait  ← rail collapses below this
--bp-lg    1200px    tablet landscape / small laptop
--bp-xl    1600px    desktop
--bp-2xl   1920px    large desktop  ← content stops growing, margins absorb
```

## 4.2 The Rail

The reference's left rail is confirmed as the structural signature. It is not decoration —
it is the spine that makes every page feel like a room in one building, and it is what a
horizontal top-nav can never deliver.

```
--rail-w        clamp(140px, 11vw, 184px)
--rail-w-lg     216px    ≥ --bp-2xl
--rail-h        56px     collapsed mobile bar height (< --bp-md)
--rail-bg       var(--surface-rail)
--rail-edge     var(--line-hairline)   1px right edge, always
```

Below `--bp-md` the rail collapses to a 56px top bar: logo left, menu right. It does not
become a hamburger drawer that covers photography — it becomes a full-height bone overlay
that *unfolds* from the right edge.

## 4.3 Grid

Content area = viewport − rail.

```
--col-desktop   12
--col-tablet    8
--col-mobile    4
--gutter        var(--s-5)    24px
--margin-x      clamp(var(--s-6), 4vw, var(--s-9))
--content-max   1680px
--tap           44px          minimum touch target (05_QUALITY §1)
```

Grid is structural and invisible. Never rendered.

## 4.4 The Ecosystem Strip

The reference's five-tile strip is the strongest idea in it — it answers "what is PAXIA?"
in one glance, without a paragraph. It is promoted to a **named layout primitive**.

```
--strip-h        clamp(320px, 34vh, 420px)
--strip-cols     5
--strip-ratio    3 / 4      each frame
```

Five frames, `--seam` apart, edge-to-edge. Below `--bp-lg` → horizontal scroll-snap,
2.2 frames visible (the partial frame is what invites the swipe). Below `--bp-md` → 1.4
frames.

Frame anatomy: image bleeds full · label `--u-micro` top-left inset `--s-5` · title `--d-1`
bottom-left · rule + CTA `--u-micro` beneath. No radius. No shadow. No border.

## 4.5 Z-Layers

```
--z-atmosphere   0
--z-content      10
--z-frame        20
--z-rail         50
--z-overlay      80
--z-modal        90
--z-toast        95
```

Max 3 visual layers in view. Depth explains hierarchy; it never performs.

---

# 5. Motion

## 5.1 Duration

```
--t-instant   80ms
--t-fast      160ms
--t-normal    260ms
--t-medium    420ms
--t-slow      650ms
--t-hero      1100ms
--t-ambient   8000ms
```

## 5.2 Easing — resolved curves

The prior docs named easings without defining them, which made every motion rule
unenforceable. Resolved:

```
--e-out      cubic-bezier(0.22, 1, 0.36, 1)      default. exits, hovers.
--e-inout    cubic-bezier(0.65, 0, 0.35, 1)      reveals, section entries.
--e-heavy    cubic-bezier(0.16, 0.84, 0.24, 1)   large objects, images, page transitions.
--e-linear   linear                              ambient only.
```

`--e-heavy` is our signature: a near-instant commitment followed by a long, decelerating
settle. It is how a heavy door closes. It is what makes a 900px image feel like it has mass.

**Forbidden, permanently:** bounce · elastic · spring · overshoot · backOut · anticipate.
Any curve whose output leaves [0,1] is banned. Overshoot is the physics of a toy.

## 5.3 Mapping

| Level | Token | Easing |
|---|---|---|
| Ambient | `--t-ambient` | `--e-linear` |
| Hover | `--t-fast` | `--e-out` |
| Press | `--t-instant` | `--e-out` |
| Interaction | `--t-normal` | `--e-out` |
| Section reveal | `--t-medium` | `--e-inout` |
| Navigation | `--t-slow` | `--e-heavy` |
| Page transition | `--t-hero` | `--e-heavy` |
| Campaign reveal | `--t-hero` | `--e-heavy` |

Higher level = slower. Always.

## 5.4 Reveal Distance

```
--reveal-near   12px    text, metadata
--reveal-mid    24px    frames, groups
--reveal-far    40px    images, heroes
```

Reveal = `opacity 0→1` + `translateY(--reveal-*) → 0`. Nothing else. No scale. No blur.
No rotation. Stagger between siblings: **60ms**. Max 5 staggered children — beyond that it
reads as a loading screen.

## 5.5 Reduced Motion

```
prefers-reduced-motion: reduce
  → all --reveal-* = 0
  → duration ceiling = --t-normal
  → ambient stops
  → opacity transitions retained
  → hierarchy and stagger order retained
```

Never disable transitions wholesale. A hard cut is a worse experience, not a safer one.

---

# 6. Material

## 6.1 Elevation

We do not have shadows. We have **light**.

```
--lift-none    none
--lift-frame   inset 0 0 0 1px oklch(0.98 0.005 76 / 0.05)
--lift-modal   0 40px 120px -20px oklch(0.13 0.004 65 / 0.72)
```

`--lift-modal` is the only true shadow in the system, and it exists solely to answer
"what is this resting on?" — the void. Nothing else casts.

## 6.2 Radius

```
--r-none   0px      frames, images, sections, inputs
--r-soft   2px      buttons only
--r-full   9999px   avatar, language pill only
```

`--r-none` is the default and the answer in nearly every case. A radius is a decision to
look friendly. PAXIA is not friendly. PAXIA is warm — which is a property of color and
pace, not of corners.

## 6.3 Scrims

```
--scrim-bottom  linear-gradient(to top, oklch(0.13 0.004 65 / 0.88) 0%, transparent 62%)
--scrim-full    oklch(0.13 0.004 65 / 0.42)
--scrim-rail    linear-gradient(to right, oklch(0.13 0.004 65 / 0.55) 0%, transparent 100%)
```

Any text over imagery uses one. Non-negotiable — this is a contrast requirement, not a taste.

## 6.4 Grain

```
--grain-opacity  0.028
--grain-size     180px
```

A single tiling SVG turbulence, fixed to viewport, `mix-blend-mode: overlay`, above
atmosphere and below content. At 2.8% it is invisible as texture and present as *stock* —
it kills the digital flatness of large dark fields and stops banding in gradients.

It must never animate. Animated grain is a film-school affectation.

## 6.5 Image Treatment

```
--img-ratio-portrait   3 / 4
--img-ratio-editorial  4 / 5
--img-ratio-campaign   16 / 9
--img-ratio-square     1 / 1
```

Four ratios. Every image uses one. Arbitrary ratios are how a grid loses its rhythm.

Hover on an image: `--scrim` lightens by 0.06 and the frame's `--lift-frame` inset
strengthens. **The image does not move and does not scale.** Ken Burns on hover is the
single most overused gesture in this category.

---

# 7. Enforcement

`pnpm check` runs:

1. `tsc --noEmit`
2. ESLint with `no-restricted-syntax` blocking raw color/px/ms literals in `/components`
   and `/features`
3. `token-lint` — a script asserting every `var(--*)` reference resolves against
   `styles/tokens.css`

A PR that adds a value not in this file fails CI. The token file is the contract.
