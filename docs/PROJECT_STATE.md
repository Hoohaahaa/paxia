# PROJECT_STATE

> Read first, every session. Update at the end of every session.
> This is the only file that changes constantly. Everything else is a contract.

**Updated:** 2026-07-18
**Phase:** 1 — Build (all five numbered slices shipped)

---

## Now

**The IA is fully navigable.** Slices 01–06 shipped: every page in docs/02 §1 exists —
Home, Collections → Collection → Product, Bespoke, Store → Detail, Agency (+ Talent /
Become / Book), Journal → Article, About, Contact, Search, and a Cart empty state (the
rail links there; checkout stays [Future]). 41 static pages, every route < 120 kB, axe
0 WCAG 2 A/AA violations at every check, `pnpm check` green throughout.

**Shipped since:** the product-open transition (WAAPI, token-driven) and the **day scheme**
(night/day theming via a semantic-layer remap in `tokens.css`, toggle in the rail, computed
contrast, axe-clean in both schemes).

Remaining work is enhancement, not structure:
1. Form + cart backends (email/CRM, bag persistence, checkout)
2. Real photography replacing the token-toned SVG placeholders
3. Ogg/Söhne licenses (Open Decisions 1–2) + Armenian subset (Decision 4)
4. Hosted deploy → true Lighthouse ≥ 95 verification
5. Vercel deploy — PR #1 is merged to main and CI guards it; the owner connects the repo
   at vercel.com/new (no config needed; Next.js auto-detected); then the true Lighthouse
   run. `metadataBase` is set to https://paxia.vercel.app — update it if the domain differs.

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

- [x] **Slice 06 — Completion**
  - [x] `InquiryForm` — the one form island (components/form); Bespoke + Agency pages
        refactored onto it, feature-level form islands deleted (no duplicate logic)
  - [x] `/about` — statement, the five surfaces as a printed index, facts in mono
  - [x] `/contact` — one letter form + per-city phone lines routing to store pages
  - [x] `/lib/search.ts` — static index built from the same /lib data the pages render
  - [x] `/search` — live client search, printed-index results, editorial empty state
  - [x] `/cart` — editorial EmptyState (rail links here; checkout stays [Future])
  - [x] axe 0 violations on all four routes; search hit/miss + refactored form flows
        driven in-browser

---

## Next

Enhancements, in rough order of leverage: shared-element product open (Motion) →
backends (forms, bag) → photography → fonts → deploy + Lighthouse.
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

**2026-07-18 — One form island.** Three near-identical client forms (bespoke, become, book)
violated "no duplicate logic." Consolidated into `components/form/InquiryForm` driven by a
serializable field config; pages pass their copy and fields inline, feature form islands
deleted. Contact reused it on arrival for free.

**2026-07-18 — Search is a static index, client-filtered.** Built from the same /lib data
the pages render, so it cannot disagree with them. Adequate at this catalog size; a service
replaces `searchEntries` without touching the UI. No spinner — results are synchronous.

**2026-07-18 — /cart exists as an EmptyState.** The rail says CART (0); a 404 behind the
shell's own link would break the house. The page is the 04_COMPONENTS editorial empty state
(statement + one action) until checkout arrives — the route will not move.

**2026-07-18 — Day scheme as a semantic remap, night-first.** Light mode requested by the
owner. Implemented entirely inside `styles/tokens.css` as `[data-theme='day']` overrides of
the semantic layer; the ink ramp, patina scale, scrims, and the new `--text-on-image-*`
tokens never remap. Two contrast corrections were forced by computation: day metadata steps
to ink-600 (ink-550 reads 4.05:1 on bone) and the accent alias `--accent` steps to
patina-600 (patina-500 reads 3.74:1 on bone). Components now reference `--accent`, never
`--patina-*`. Default: stored choice → prefers-color-scheme → night. Set pre-paint by an
inline script; toggled from the rail; axe-clean in both schemes.

**2026-07-18 — Text over photography is scheme-invariant.** Imagery is graded dark in both
schemes, so `--text-on-image{,-secondary,-muted}` were added and every Frame/hero/campaign/
band moved onto them. This is the rule that stops day mode from ever setting ink text on a
dark scrim.

**2026-07-18 — Atmosphere decided: the light field stays, particles are out.** The owner
compared both variants and chose the cursor light field. The provisional exception in
06_DO_NOT is closed, the particles ban is restored in full, and the particle code is
removed (git history keeps it). `?atmosphere=off` remains as the baseline flag.

**2026-07-18 — Placeholder art, final pass: one composition per image.** Day mode exposed
that near-identical dark gradients read as broken tiles on bone. Every image (34) now has
its own editorial composition in the warm ink + patina palette, with a motif per category:
products = drape/weave, collections = arc, cities = abstract architecture, talent =
portrait vignette, journal = typography lines, craft = dense weave, bespoke = stitch,
hero/campaign = sweep of light. Photography stays dark-graded in both schemes by design —
in day mode it reads as art on a gallery wall. All still replaceable by real photography
without touching layout.

**2026-07-18 — Publishing scaffold.** CI workflow (pnpm check + build on PRs and main),
`metadataBase` + OpenGraph metadata. PR #1 merged to main; Vercel connection is the one
step only the owner can perform.

**2026-07-18 — Night is the default, always.** The scheme no longer follows
`prefers-color-scheme`: OS-light visitors were landing in day mode and reading it as
broken. Night is the identity; day is entered only by explicit choice. Related day-scheme
fixes: SectionIndex numerals moved to the new scheme-invariant `--accent-on-image` /
`--text-on-image-muted` (they sit on the hero photograph and went dark-on-dark in day),
and the two ThemeToggle instances now sync through a MutationObserver on `data-theme`
instead of holding independent state.

**2026-07-18 — Headlines set themselves; the seam catches light.** Two motion upgrades,
doc-first: (1) `TextReveal` — masked line-rise for display headlines (03_MOTION §Reveal
amendment): lines travel their own height over --t-slow --e-heavy, staggered
--reveal-stagger; lines are the staggered children, never words. Applied to the Arrival
masthead (explicit lines), Manifesto, Campaign, Craft, and every index masthead.
(2) The Frame hover (04_COMPONENTS): the bottom rule draws in accent left→right
(translateX in a mask — no scale) and `--glow-edge`, a defined gradient token, rises from
the seam into the image by opacity. Light lands on the seam; the image never moves.

**2026-07-18 — Atmosphere: two variants under evaluation, ban amended in the open.** The
owner wants to compare a mouse-reactive atmosphere against the particles ban. Per the
amendment clause, 06_DO_NOT §WebGL now carries a *provisional, evaluation-scoped* particle
exception (Arrival only, canvas-2D, token colours, cursor-displaced, `?atmosphere=particles`
flag, never default). The compliant variant — the cursor light field (--glow-cursor token,
soft-light, lerped transform) — is the default and is fully inside 05_QUALITY's permitted
list. Both gate to fine pointers without reduced motion and degrade to the photograph.

**2026-07-18 — Product-open via WAAPI, still no Motion dependency.** The 03_MOTION product
open (origin image expands into the hero over --t-hero --e-heavy; surroundings fall away) is
a delegated click listener + FLIP overlay driven by the Web Animations API, which consumes
the duration/easing tokens verbatim at runtime — transform/opacity only, reduced-motion and
modified clicks fall through to plain navigation. Motion (the library) still has no job here;
it earns its dependency when choreography outgrows WAAPI.

---

## Session Protocol

**Start:** read this file → read `docs/01_TOKENS.md` → read the one doc for the task.
**End:** update Now / Done / Next. Add to Decision Log if a call was made.

Never restart architecture. Never rebuild completed work.
