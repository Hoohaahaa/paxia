# PROJECT_STATE

> Read first, every session. Update at the end of every session.
> This is the only file that changes constantly. Everything else is a contract.

**Updated:** 2026-07-17
**Phase:** 0 — Foundation

---

## Now

Design system is specified and locked. Nothing is built.

Immediate task: **Slice 01 — the Shell.** Rail + Arrival + Ecosystem Strip.

This slice is deliberately first: it exercises the rail, the Frame, the Strip, the display
scale, the scrim, the reveal, and the ambient drift. If the token system is wrong, it will
be wrong *here*, cheaply, before anything depends on it.

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

---

## Next

**Slice 01 — Shell**
- [ ] Scaffold: Next.js App Router, TS strict, Tailwind mapped to tokens
- [ ] `pnpm check`: tsc + eslint + token-lint
- [ ] Fonts loaded and subset (Latin + Armenian)
- [ ] `Rail` — desktop + mobile bar + bone MenuPanel
- [ ] `Frame` primitive + 6 variants
- [ ] `Strip` with scroll-snap
- [ ] Arrival section + SectionIndex + ambient drift
- [ ] Grain overlay
- [ ] Axe + keyboard + reduced-motion pass
- [ ] Lighthouse ≥ 95 all categories

**Slice 02 — Homepage** — Manifesto, Campaign, Craft, Presence, Journal, Footer
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

---

## Session Protocol

**Start:** read this file → read `docs/01_TOKENS.md` → read the one doc for the task.
**End:** update Now / Done / Next. Add to Decision Log if a call was made.

Never restart architecture. Never rebuild completed work.
