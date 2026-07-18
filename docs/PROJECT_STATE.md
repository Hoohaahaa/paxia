# PROJECT_STATE

> Read first, every session. Update at the end of every session.
> This is the only file that changes constantly. Everything else is a contract.

**Updated:** 2026-07-18
**Phase:** 1 — Build (all five numbered slices shipped)

---

## Now

**The numbered plan is complete.** All five slices are built and passing: Shell, Homepage,
Collections + Product, Bespoke + Store, Agency + Journal. 37 static pages, every route
< 120 kB, axe 0 WCAG 2 A/AA violations at every check, `pnpm check` green throughout.

The IA branches that remain unbuilt (all `[Future]` or unnumbered in docs/02 §1):
About · Contact · Search · Cart/Checkout · Account/Wishlist.

Proposed next: **Slice 06 — Completion** (About + Contact + a first Search), then the
deferred enhancements: product-open shared-element transition (Motion), form/cart backends,
real photography, font licenses, hosted deploy + true Lighthouse run.

---

## Done

- [x] Doc set consolidated: 12 overlapping docs → 7 non-overlapping
- [x] `CLAUDE.md` reduced to enforceable constraints
- [x] Full token system specified (`docs/01_TOKENS.md`)
- [x] `styles/tokens.css` authored
- [x] Contrast verified by computation; `--ink-500` removed (failed AA at 4.31:1),
      `--ink-550` added at 4.69:1
- [x] Frame vs. card defined measurably
- [x] Easing curves resolved from names to cubic-bezier
- [x] **Slice 01 — Shell**
  - [x] Scaffold: Next.js App Router, TS strict, Tailwind mapped to tokens
  - [x] `pnpm check`: tsc + eslint + token-lint (green)
  - [x] Fonts loaded via `next/font`, Latin subset — free fallbacks (Playfair/Inter/JetBrains)
  - [x] `Rail` — desktop + mobile bar + bone MenuPanel (focus trap, Escape, focus return)
  - [x] `Frame` primitive + 6 variants
  - [x] `Strip` with scroll-snap (2.2 / 1.4 partial frames)
  - [x] Arrival section + SectionIndex + ambient drift
  - [x] Grain overlay
  - [x] Axe (0 violations) + keyboard pass + reduced-motion tokens
  - [~] Armenian subset — deferred (Open Decision 4; free fallbacks offer no Armenian face)
  - [~] Lighthouse ≥ 95 — build is static, First Load JS 115 kB < 120 kB budget; full
        Lighthouse run pending a hosted deploy
- [x] **Slice 02 — Homepage**
  - [x] Manifesto — one --d-2 statement, offset column 3, --sect-hero of space, single settle
  - [x] Campaign — the single full-bleed reveal, --d-3 line over --scrim-bottom, no CTA
  - [x] Craft — asymmetric 7/12 image + 4/12 text, macro texture not a garment
  - [x] Presence — city band, hover/focus crossfades the store image behind at --scrim-full
  - [x] Journal — three articles, editorial ratio, mono date + --d-1 title, no excerpt
  - [x] Footer — site-wide, --surface-rail, four IA columns + legal
  - [x] axe 0 violations (desktop + mobile); First Load JS 116 kB < 120 kB
- [x] **Slice 03 — Collections + Product**
  - [x] `Button` primitive (04_COMPONENTS): 4 variants, --r-soft, 44px, press/focus
  - [x] `/lib/catalog.ts` — React-free data + getters (CMS-swappable)
  - [x] `/collections` index — editorial intro + collection Frames
  - [x] `/collections/[collection]` — type-only intro + product grid (SSG, notFound guard)
  - [x] `/products/[product]` — full narrative order, sticky purchase below --bp-lg (SSG)
  - [x] `PurchaseModule` — size select + Add to Bag (aria-live; cart not yet wired)
  - [x] axe 0 violations across index/collection/product (desktop + mobile)
  - [~] Product-open shared-element transition (03_MOTION) deferred — needs Motion/View
        Transitions; pages use the standard reveal for now
- [x] **Slice 04 — Bespoke + Store**
  - [x] `Field` primitive (04_COMPONENTS): Text/TextArea/Select, bottom-rule-only,
        real labels, error explains the fix, dark + bone tones
  - [x] `Button` bone tone (dark-ground palette vanishes on --surface-inverse)
  - [x] `/lib/stores.ts` — flagship data, React-free
  - [x] `/bespoke` — bone inversion, three-movement process, appointment form
        (client island; no backend yet — confirms honestly via aria-live)
  - [x] `/store` — architectural index, alternating full-width bands, low density
  - [x] `/store/[store]` — 5 cities SSG, printed-card practicalities (mono tabular)
  - [x] axe 0 violations on all three routes (desktop + mobile); form flow verified
- [x] **Slice 05 — Agency + Journal**
  - [x] `/lib/agency.ts` + `/lib/journal.ts` — React-free data (6 talent, 3 articles)
  - [x] `/agency` — organized index: portrait tiles with mono captions below (not Frames —
        the clinical register is the point), two IA pathways as a printed index
  - [x] `/agency/[talent]` — comp card: portrait + mono measurement table (6 SSG)
  - [x] `/agency/become` + `/agency/book` — one shared `AgencyForm` island, two configs
  - [x] `/journal` — bone contents page: date, serif title, standfirst, rules — no cards
  - [x] `/journal/[article]` — reading uninterrupted: one column at measure, single
        editorial image, back link as the whole navigation (3 SSG)
  - [x] axe 0 violations across all six checks; both form flows driven in-browser

---

## Next

**Slice 06 — Completion** *(proposed)* — About + Contact + first Search; then deferred
enhancements (shared-element product open, backends, photography, fonts, deploy).
**Slice 03 — Collections + Product**
**Slice 04 — Bespoke + Store**
**Slice 05 — Agency + Journal**

---

## Open Decisions

| # | Decision | Owner | Blocks |
|---|---|---|---|
| 1 | Ogg license vs. Editorial New vs. Playfair fallback | — | Slice 01 |
| 2 | Söhne license vs. Inter fallback | — | Slice 01 |
| 3 | Image pipeline: local vs. DAM/CDN | — | Slice 02 |
| 4 | Armenian subset scope — nav only, or full site | — | Slice 01 |

Decisions 1 and 2 do not block scaffolding. Build on the free fallbacks; the token file
swaps one line when licenses land. This is the point of `--font-display` being a token.

Decision 4 (Armenian subset) is now **blocking Slice 01 only in principle** — the free
Google fallbacks (Playfair Display, Inter, JetBrains Mono) ship no Armenian glyphs, so there
is nothing to subset yet. Revisit when the licensed faces or a dedicated Armenian companion
face land.

---

## Decision Log

**2026-07-17 — Warm ink over pure black.** Reference used `#000000`. Rejected: it is the
browser default, reads dead on OLED, and is the single cheapest color available. Full ramp
moved to a warm axis (h≈60–70) so black reads as dyed material.

**2026-07-17 — One accent, not five.** Prior docs listed champagne, brass, burgundy, forest,
bronze. Five accents is a system with no opinion. Consolidated to Patina (aged brass,
chroma 0.07) at <3% coverage.

**2026-07-17 — Rail confirmed.** Reference's left rail promoted from exploration to
structural signature. It is what makes pages feel like rooms in one building; a top nav
cannot do this.

**2026-07-17 — Strip promoted to primitive.** Five-tile ecosystem strip is the strongest
idea in the reference and answers "what is PAXIA?" without a paragraph. It is the investor
argument, made visually.

**2026-07-17 — Frame defined against card.** "Never cards, use editorial frames" was
unenforceable for the whole prior doc set. Now a table of measurable properties.

**2026-07-17 — Workflow reduced.** 9-stage lifecycle (Research→…→Ship) replaced with
Plan → Build → Self-QA → Commit. The 9-stage version would be abandoned by feature three,
and a bible broken once stops governing.

**2026-07-17 — Unfalsifiable rules removed from law.** "Never generic," "must feel
timeless," "worthy of the world's best studios" moved to `00_VISION.md`. Rules an agent
cannot verify teach it that rules are optional.

**2026-07-17 — Config files moved to their runtime homes.** `tokens.css` →
`styles/tokens.css`, `tailwind.config.ts` and `token-lint.mjs` → repo root — the exact
paths the lint script and Tailwind config already referenced. They lived in `docs/` as
drafts; the scaffold could not run until they moved. `layout.tsx` imports
`styles/tokens.css` before `globals.css` so the custom properties are defined before any
utility resolves them.

**2026-07-17 — Fonts via `next/font`, woven through the token stack.** The stacks now read
`var(--font-loaded-*, '<free fallback>')`. `next/font` injects `--font-loaded-*` at runtime
(self-hosted, `swap`); the licensed names sit ahead of it, so the Ogg/Söhne swap stays a
one-line change and the token file remains the seam. Latin subset only — see Decision 4.

**2026-07-17 — Three additive tokens under real load.** Slice 01 surfaced three documented
values that were never tokenized: `--rail-h` (56px mobile bar), `--tap` (44px touch target),
`--u-wordmark-track` (0.36em, rail wordmark only). Added doc-first to `01_TOKENS.md`, then
`tokens.css`, then Tailwind. No structural token change was needed — the system held.

**2026-07-17 — Motion by CSS + IntersectionObserver, no Framer Motion yet.** Reveal (the one
entry animation) and the ambient hero drift are pure CSS driven by tokens; the reveal trigger
is a small `IntersectionObserver` client wrapper. Framer Motion earns its place when a slice
needs shared-element / page-transition choreography (`03_MOTION.md` → Page Transition), not
before — keeps the route bundle at 115 kB and server-first.

**2026-07-17 — SVG placeholder art.** Six frames + hero are token-toned SVGs in `/public`,
served via `next/image` (`dangerouslyAllowSVG` scoped to our own static assets). Every layout
is built to survive replacement by real photography, per `05_QUALITY.md`.

**2026-07-17 — Footer nano text uses `--text-muted`, not `--text-metadata`.** §3.8 specifies
metadata for the footer legal, but metadata is a 4.69:1 floor legal only at ≥14px on void
(`01_TOKENS` §1.9); at `--u-nano` (11px) on the lighter `--surface-rail` ground it fails AA,
and axe confirmed it. Accessibility outranks visual expression in the decision hierarchy, so
the footer takes the higher-contrast ink. The on-void nano metadata (SectionIndex, Frame
meta, Journal dates) stays — it clears AA at 4.69:1 there.

**2026-07-17 — JournalPreview is not a Frame.** The homepage Journal teaser (§3.7) puts the
title *below* the image on void, with no eyebrow/scrim/CTA — a different register from the
Frame primitive (label-inside, scrim, CTA). Extending Frame would have fought its anatomy, so
the teaser is its own small component. Frame.Journal remains for the Journal index later.

**2026-07-17 — Two full-bleed 100vh sections on home, by design.** Arrival (§3.1) and Campaign
(§3.4) are both full-bleed. The "once per session" guard (§7) is against *gratuitous* extra
campaigns; the canonical composition names exactly these two. No third was added.

**2026-07-17 — Catalog is a flat /lib data module, not a CMS.** `lib/catalog.ts` holds the
collections/products as plain data + pure getters (React-free per the folder map). Pages read
it through `getX` helpers so a DAM/CMS can replace the module without touching routes. Prices
are integer EUR formatted with `Intl.NumberFormat` (tabular, no fraction).

**2026-07-17 — Cart is not wired in Slice 03.** `PurchaseModule` selects a size and confirms
via an `aria-live` line rather than faking persistence. Wishlist/Cart/Checkout are `[Future]`
in the IA; the honest placeholder beats a fake bag count. "Add to Bag" follows the voice list
(never "Buy Now").

**2026-07-17 — Product-open shared-element transition deferred.** 03_MOTION's "the selected
image is the origin, expands into the hero" is a cross-route shared-element move (Motion +
View Transitions). Slice 03 ships the pages with the standard reveal; the origin transition is
a scoped later enhancement, not a silent omission.

**2026-07-18 — Primitives grew tones, not variants.** The bone world (Bespoke, Journal)
needed Button and Field to survive inversion. Rather than new components (BoneButton), each
primitive takes a `tone: 'dark' | 'bone'` prop mapping to the same anatomy with the inverse
ink pairings from 01_TOKENS §1.4. One component, two grounds — same rule as Frame's variants.

**2026-07-18 — Bespoke form has no backend; it says so.** AppointmentRequest validates
(errors name the fix, per 04_COMPONENTS) and confirms via aria-live with an honest promise
("the atelier will write within two working days") — but nothing is transmitted yet. Wiring
(email/CRM) is an infrastructure decision, not a UI one; the page ships without pretending.
The same holds for AgencyForm (become/book).

**2026-07-18 — Agency talent tiles are not Frames.** The Frame's anatomy (label inside the
image, scrim, serif title) is a campaign register; the agency spec is "organized, not
glamorous" (02 §4). Talent tiles put name/base/height in mono below the image — a comp-card
index. Frame.Agency remains the ecosystem-strip face of the surface.

**2026-07-18 — Journal index is a contents page, not a card wall.** The homepage teaser is
image-led; the Journal's own index is typographic (date, serif title, standfirst, hairline
rules) so the bone world reads as paper, and the article page carries a single editorial
image inside one uninterrupted column.

---

## Session Protocol

**Start:** read this file → read `docs/01_TOKENS.md` → read the one doc for the task.
**End:** update Now / Done / Next. Add to Decision Log if a call was made.

Never restart architecture. Never rebuild completed work.
