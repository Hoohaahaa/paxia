# PAXIA — Layout & Information Architecture

> Structure, navigation, and per-page composition.
> All values referenced here are defined in `01_TOKENS.md`.

---

# 1. Information Architecture

```
Home
Collections → Collection → Product
Bespoke
Store → Store Detail
Agency → Talent · Become a Model · Book a Model
Journal → Article
About
Contact
Search
[Future] Account · Wishlist · Checkout
```

Never invent a page. Never invent a nav pattern. New features fit this tree or they get a
documented amendment first.

---

# 2. The Rail

The rail is PAXIA's structural signature. A horizontal header would make every page a
document; the rail makes every page a **room in one building**. It never scrolls away,
never collapses on desktop, never overlays photography.

**Anatomy** (top → bottom), width `--rail-w`, ground `--surface-rail`, right edge
`--rail-edge`:

```
--s-7   PAXIA wordmark            --u-micro, tracking 0.36em
--s-11  ─ gap ─
        COLLECTIONS               --u-micro
        BESPOKE                   (--s-5 between items)
        STORE
        AGENCY
        JOURNAL
        ABOUT
        ─ flex spacer ─
        SEARCH                    --u-micro, --text-muted
        CART (0)
--s-7
```

**Active state:** a `--patina-500` rule, 1px × 12px, inset left of the label. Not a color
change on the text — text stays `--text-primary`. The mark moves between items over
`--t-normal` `--e-out`. This is the only persistent patina on the page.

**Hover:** label lifts `--text-secondary` → `--text-primary` over `--t-fast`. Nothing else.

**Below `--bp-md`:** collapses to a 56px bar — wordmark left, MENU right. Tapping MENU
unfolds a full-height `--surface-inverse` (bone) panel from the right over `--t-slow`
`--e-heavy`. Bone, not black: the menu is a moment of paper in a dark world, and the
inversion is what makes it feel like a physical object rather than a scrim.

---

# 3. Homepage Composition

The reference is the floor. This is the target.

```
┌─────────┬────────────────────────────────────────────┐
│         │  1. ARRIVAL          100vh                 │
│  RAIL   │                                            │
│         ├────────────────────────────────────────────┤
│         │  2. ECOSYSTEM STRIP  --strip-h             │
│         ├────────────────────────────────────────────┤
│         │  3. MANIFESTO        --sect-hero           │
│         ├────────────────────────────────────────────┤
│         │  4. CAMPAIGN         100vh                 │
│         ├────────────────────────────────────────────┤
│         │  5. CRAFT            --sect-wide           │
│         ├────────────────────────────────────────────┤
│         │  6. PRESENCE (cities)                      │
│         ├────────────────────────────────────────────┤
│         │  7. JOURNAL                                │
│         ├────────────────────────────────────────────┤
│         │  8. FOOTER                                 │
└─────────┴────────────────────────────────────────────┘
```

## 3.1 Arrival — 100vh

Full-bleed campaign image, right 78% of content area. `--scrim-rail` on its left edge so
the rail dissolves into the image rather than butting against it.

```
--u-micro    HIGH FASHION / MEANINGFUL DESIGN       --text-muted
--s-5
--d-4        We don't follow.                        --text-primary
             We define.
--s-6
--u-lead     Timeless designs for those who          --text-secondary
             choose presence over trends.            max --measure-lead
--s-7
--u-micro    DISCOVER THE WORLD OF PAXIA  ↗          + rule
```

**Upgrade over the reference:** the headline is set in `--d-4` Ogg at weight 400 with
`--d-4-track` (−0.024em). The reference's letterforms are too loosely tracked at display
size, which is what makes it read as a template rather than a masthead. Tight tracking at
scale is the whole game.

**Section index (right edge):** `01 02 03 04` in `--u-nano`, vertical, `--text-metadata`;
active step `--patina-500` with a 1px connecting rule. Position `--s-6` from right edge,
vertically centered. It is a *reading position*, not a slideshow control.

**Ambient:** the hero image drifts `scale(1.0 → 1.03)` over `--t-ambient` `--e-linear`,
looping. This is the sole exception to the no-scale rule, and it exists because a static
100vh image reads as a screenshot. 3% over 8 seconds is below conscious detection.

## 3.2 Ecosystem Strip

Five frames, `--seam` apart. This is the investor answer. See `04_COMPONENTS.md` → Frame.

Order is fixed: Collections · Bespoke · Store · Agency · Journal.
That order is the emotional sequence — product, service, place, people, culture.

## 3.3 Manifesto — `--sect-hero`

Type only. No image. `--surface-void`.

A single `--d-2` statement, max `--measure-lead`, offset to column 3 of 12 — not centered.
Surrounded by `--sect-hero` of nothing.

This section exists because after the strip's density, the eye needs to be told the brand is
confident enough to spend 380px of a scroll on one sentence. It is the most expensive thing
on the page and the cheapest to build.

## 3.4 Campaign — 100vh

Full-bleed. One image. One `--d-3` line, bottom-left, over `--scrim-bottom`. No CTA.

Rare by contract: `--d-5` and full-bleed campaign appear **once per session**. Rarity is
what makes them land.

## 3.5 Craft — `--sect-wide`

Two columns, asymmetric: 7/12 image (`--img-ratio-editorial`), 4/12 text, 1 column gap.
Macro texture — weave, stitch, selvedge. Not a garment. Detail implies mastery; a full
garment implies a catalog.

## 3.6 Presence

Cities as a horizontal band: Yerevan · Istanbul · Milan · Berlin · Madrid.

**Fixes the reference's worst failure.** There, city names sit on bare imagery at unreadable
contrast. Here: each city is `--u-micro` on `--surface-void`, and hovering a name reveals its
store image behind the band at `--scrim-full`, crossfading over `--t-medium` `--e-inout`.

Text stays legible always. The image serves the text. Never the reverse.

## 3.7 Journal

Three articles, `--img-ratio-editorial`, `--gutter` apart. Date `--u-nano` mono,
title `--d-1`, no excerpt. An excerpt is a magazine admitting its headline failed.

## 3.8 Footer

`--surface-rail`. Wordmark, WORLDWIDE, four link columns `--u-micro`, legal `--u-nano`
`--text-metadata`.

---

# 4. Page Compositions

| Page | Density | Opening | Rhythm |
|---|---|---|---|
| Home | Low | 100vh campaign | Observe → Reveal → Pause |
| Collection | Medium | Editorial intro, type only | Exhibition walk |
| Product | Medium | Image-led, `--img-ratio-portrait` | Emotion → Object → Material → Craft → Info → Purchase |
| Bespoke | Low | Bone `--surface-inverse` | Intimate, narrow measure |
| Store | Low | Architectural, wide | Slow, large, spacious |
| Agency | Medium-high | Structured grid | Organized, not glamorous |
| Journal | Medium | Typographic | Reading, uninterrupted |
| Checkout | High | Functional | Compressed, calm, progressive |

Density must vary across the site. Uniform density is a dashboard.

**Bespoke and Journal invert to `--surface-inverse`.** The dark world is the house; the bone
world is its paper. That contrast is worth more than any effect.

---

# 5. Product Page Order

Emotion → Object → Material → Craft → Information → Purchase → Related

Never open with specifications. Buying begins emotionally and is confirmed rationally.
The purchase module arrives last in the reveal sequence and sticks on scroll below
`--bp-lg` only.

---

# 6. Responsive

Recompose, never shrink.

**Desktop (≥ `--bp-xl`)** — editorial magazine. Rail, 12 col, full-bleed campaigns.
**Laptop (`--bp-lg`)** — rail persists, 12 col, `--strip-h` reduces.
**Tablet (`--bp-md`)** — rail persists narrow, 8 col, strip scroll-snaps at 2.2 frames.
**Mobile (< `--bp-md`)** — rail → top bar, 4 col, strip 1.4 frames, images larger, type up
one step, `--sect-*` down one step.

Mobile is not a smaller desktop. It is a private client experience: closer, more tactile,
less information, more atmosphere.

---

# 7. Acceptance

- [ ] Rail present and orienting at every breakpoint
- [ ] One hero, one supporting element, one action per screen
- [ ] Density varies between adjacent pages
- [ ] Every text-over-image uses a scrim token
- [ ] Full-bleed and `--d-5` used at most once per session
- [ ] Every breakpoint composed, not scaled
- [ ] Section rhythm uses `--sect-*`, never raw values
