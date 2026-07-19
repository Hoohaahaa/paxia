# PAXIA — Motion

> Replaces the three previous motion documents, which restated each other and defined
> no curves. All timing and easing values live in `01_TOKENS.md`.

---

# Grammar

Nothing appears. Everything reveals.
Nothing disappears. Everything transforms.
Nothing jumps. Everything travels.
Nothing pops. Everything settles.
Nothing loads. Everything becomes present.

---

# The One Test

**What information became clearer because this moved?**

No answer → delete the animation. This is not a philosophy. It is a code review question.

---

# Personality

Calm · Heavy · Cinematic · Precise · Invisible

Never: playful · elastic · bouncy · hyperactive · gamified

---

# Hierarchy

| Level | Duration | Easing |
|---|---|---|
| 1 Ambient | `--t-ambient` | `--e-linear` |
| 2 Hover | `--t-fast` | `--e-out` |
| 3 Interaction | `--t-normal` | `--e-out` |
| 4 Section reveal | `--t-medium` | `--e-inout` |
| 5 Navigation | `--t-slow` | `--e-heavy` |
| 6 Page transition | `--t-hero` | `--e-heavy` |

Higher level always moves slower. Mass and importance are the same signal.

---

# Hard Bans

Enforced by lint. No exceptions, no "just this once."

- `scale()` on hover — the category's most exhausted gesture
- bounce · elastic · spring · overshoot · backOut · anticipate
- any curve leaving [0,1]
- rotation on UI
- animated blur, animated grain, animated glow
- spinners
- more than 3 concurrent motion layers
- animating anything but `transform` / `opacity` without a written reason
- library default presets

---

# Reveal

The only entry animation in the system.

```
opacity: 0 → 1
translateY: var(--reveal-near|mid|far) → 0
duration: --t-medium
easing: --e-inout
stagger: --reveal-stagger (60ms), max 5 children
trigger: IntersectionObserver, 20% visible, once
```

Text `--reveal-near` · frames `--reveal-mid` · images `--reveal-far`.
Heavier things travel further. That is the whole rule.

**Display headlines may reveal as masked line-rises**: each line sits in an
`overflow: hidden` mask and travels its own height (`translateY(100%) → 0`,
opacity 0→1) over `--t-slow` `--e-heavy`, staggered `--reveal-stagger` between
lines. The lines are the staggered children — a headline has at most 3–4, so
the max-5 stagger rule holds. Words are never staggered individually; that is
a lyric video, not a masthead. Under reduced motion the travel collapses and
only opacity remains.

No fade-up on everything. Sections earn their own choreography — a strip reveals as a
stagger, a manifesto reveals as a single settle, a campaign reveals as a scrim lift.

---

# Hover

Affects: light · material · depth · typography · contrast
Never: scale · rotate · bounce · glow · blur

Should feel like touching premium fabric. Fabric does not spring back.

**Image frame hover:** scrim lightens 0.06, `--lift-frame` inset strengthens. Image holds
still. **No Ken Burns.**

**Link hover:** rule draws left→right, `--t-fast` `--e-out`, `--line-hairline` →
`--patina-500`.

---

# Press

```
mousedown → translateY(1px), --t-instant, --e-out
mouseup   → translateY(0),  --t-fast,    --e-out
```

Compression, then release. Physical. Never spring.

---

# Page Transition

Outgoing page never blanks. Content reorganizes; incoming grows from the previous context.
The rail never moves — it is the constant that proves this is one building.

No white flash. No hard cut. No reload feeling.

**Product open:** the selected image is the origin. It expands into the hero position over
`--t-hero` `--e-heavy` while surrounding frames fall to `opacity: 0`. The visitor should
feel they entered the object.

---

# Scroll

Observe → Reveal → Pause → Continue

Scroll reveals scenes, not blocks. Every viewport is composed. Never chain identical
fade-ups down a page — that is a template with an IntersectionObserver.

---

# Ambient

Only atmosphere moves: light drift, hero scale 1.0→1.03 over `--t-ambient`, depth breathing.

No floating decorative objects. No particles. Ambient runs `--e-linear` and must be
invisible — if a user notices it, it is too strong.

---

# Modal

Grows from its trigger. Background stays alive behind `--scrim-full`. Closing returns to
origin. Never teleports. `--lift-modal` is the only shadow permitted.

---

# Loading

Loading belongs to the atmosphere. Progressive revelation over waiting: content becomes
present as it arrives.

Never: spinners · blinking · skeleton overload.

The interface says "we are preparing something," not "please wait."

---

# Mobile

Shorter, closer, more tactile. Never copy desktop timing.

```
--reveal-* → one step down
--t-slow / --t-hero → --t-medium
ambient → off
```

---

# Reduced Motion

Reduce travel and duration. **Keep opacity, keep hierarchy, keep stagger order.**

Never disable transitions wholesale — a hard cut is a worse experience, not a safer one.
Reduced-motion users receive the same emotional sequence with less physical movement.

---

# Performance

60fps floor. `transform` / `opacity` only. `will-change` on active layers only, removed
after. No layout thrashing. Motion must never delay interaction — a page that is animating
is still a page that must respond.

---

# QA

- [ ] Every animation names its token — no raw ms, no raw cubic-bezier
- [ ] Motion answers the one test
- [ ] ≤ 3 concurrent layers
- [ ] No banned curve, no hover scale
- [ ] Reduced motion preserves hierarchy
- [ ] 60fps under CPU 4× throttle
- [ ] Page transition preserves the rail

---

# Final

If users notice the animation, it is too much.
If they notice the experience, the motion succeeded.
