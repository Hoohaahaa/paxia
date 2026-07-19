# PAXIA — Photography

> The image slots, their required shapes, and the art direction for each.
> Placeholder art occupies every slot until real photography replaces it —
> slot by slot, with no code changes.

---

# How to replace a placeholder with a real photograph

1. Put the source photo in `photos/` at the repo root (gitignored — sources
   never ship), named **exactly** after its slot: `photos/hero.jpg`
   (also accepts `.jpeg`, `.png`, `.webp`).
2. Run `pnpm images`.
3. Commit. Done.

The pipeline (`ingest-images.mjs`) applies the house grade (darkened, warmed —
photography reads the same in night and day, docs/01 §1.4), crops to the
slot's ratio, exports an optimized progressive JPEG into `public/img/`,
enforces the size budgets from `05_QUALITY.md`, and regenerates
`lib/images.ts` so every page picks the photograph up automatically. Slots
without a photo keep their placeholder art.

Rules that still apply: four ratios only, dark-graded, believable — reject
anything that reads as AI on first glance (05_QUALITY §3). Structure never
depends on a specific image.

---

# The slots

Ratios: portrait 3/4 · editorial 4/5 · campaign 16/9 · city 8/5.
Minimum source width in px in parentheses.

## Chapters

| Slot | Ratio (min w) | Direction |
|---|---|---|
| `hero` | campaign (2400) | The arrival. One figure or one garment in a dark room, warm single-source light from the right. Negative space left for the masthead. |
| `campaign` | campaign (2400) | The Winter Study statement. A city at dusk or a figure against it — near-black, one warm accent. |
| `craft` | editorial (1440) | Macro cloth: weave, stitch, selvedge. Never a full garment. |
| `bespoke` | portrait (1200) | The atelier table — shears, chalk, muslin. Hands allowed, faces not. |

## Ecosystem strip (portrait, 1200)

| Slot | Direction |
|---|---|
| `collections` | One look, three-quarter length, deep shadow. |
| `store` | Interior fragment — stone, brass, one shaft of light. |
| `agency` | Studio portrait, even light, no expression performed. |
| `journal` | Paper, type, or an open spread in warm light. |

## Collections (portrait, 1200)

`collection-volume-one` — the opening look. · `collection-winter-study` —
heavy wool, longer line, darker still. · `collection-stone-series` — the
constant piece on a stone ground.

## Products (portrait, 1200)

One piece per slot, on-figure or still, dark ground, light from one side:
`product-coat` · `product-knit` · `product-dress` · `product-overcoat` ·
`product-scarf` · `product-cardigan` · `product-shirt` · `product-trouser` ·
`product-blazer`

## Cities (city 8/5, 1600)

Architecture, not landmarks-as-postcards. Dusk or blue hour:
`city-yerevan` (tufa stone) · `city-istanbul` · `city-milan` ·
`city-berlin` · `city-madrid`

## Journal (editorial, 1440)

`journal-1` (the atelier at dawn) · `journal-2` (a bolt of wool, half
unrolled) · `journal-3` (a flagship doorway at dusk)

## Talent (portrait, 1200)

Studio portraits, one register, no retouch gloss:
`talent-arev` · `talent-lucine` · `talent-nare` · `talent-tigran` ·
`talent-sona` · `talent-vahe`

---

# Sourcing appendix — free-stock search queries per slot

Until the house has its own photography, free-licensed stock (unsplash.com,
pexels.com — both allow commercial use) can hold every slot. The pipeline
grades whatever you pick into the house palette automatically; choose for
composition and a single light source, not for colour.

| Slot | Query |
|---|---|
| hero | fashion model dark studio portrait dramatic light |
| campaign | fashion editorial night city dark coat |
| craft | wool fabric texture macro dark |
| bespoke | tailor atelier hands sewing dark |
| collections | high fashion look dark editorial three quarter |
| store | luxury boutique interior stone brass light |
| agency | studio portrait model neutral expression dark background |
| journal | open magazine paper typography warm light |
| collection-volume-one | minimal fashion editorial beige dark |
| collection-winter-study | winter coat wool fashion dark moody |
| collection-stone-series | neutral clothing stone texture minimal |
| product-coat | wool coat dark editorial |
| product-knit | cashmere knit sweater texture dark |
| product-dress | silk dress dark elegant minimal |
| product-overcoat | heavy overcoat men fashion dark |
| product-scarf | wool scarf folded dark |
| product-cardigan | ribbed cardigan knitwear moody |
| product-shirt | white shirt cotton minimal shadow |
| product-trouser | tailored trousers wool dark |
| product-blazer | unstructured blazer fashion dark |
| city-yerevan | yerevan architecture tufa stone dusk |
| city-istanbul | istanbul architecture evening moody |
| city-milan | milan architecture dusk elegant |
| city-berlin | berlin architecture concrete evening |
| city-madrid | madrid architecture golden hour street |
| journal-1 | empty workshop dawn light chairs |
| journal-2 | fabric bolt roll wool cutting table |
| journal-3 | old door brass handle dusk |
| talent-* (women) | female model studio portrait dark natural |
| talent-* (men) | male model studio portrait dark natural |

Talent portraits should read as one sitting: same framing, same light, no
retouch gloss. Cities are architecture at dusk, never postcards.

---

# Budgets (enforced by the pipeline)

| Slot type | Max output |
|---|---|
| hero / campaign | 220 KB |
| everything else | 160 KB |

The pipeline fails loudly if a graded export exceeds its budget rather than
shipping a slow page.
