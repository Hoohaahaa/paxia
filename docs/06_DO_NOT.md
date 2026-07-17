# PAXIA — Do Not

> The prior docs mixed enforceable bans with unfalsifiable ones ("never generic," "never
> fake luxury"). An agent cannot check those, so it learns to treat *all* rules as soft.
>
> This list is only things that can be caught in review or by lint.
> Taste lives in `00_VISION.md`. This is law.

---

# Color

- No `#FFFFFF`. No `#000000`. Bone and void exist for this reason.
- No raw hex / rgb / hsl / oklch literals outside `styles/tokens.css`.
- No gradient except the defined scrim tokens.
- No accent beyond patina.
- Patina above 3% of a viewport.
- Saturated functional colors.

# Type

- Display serif below 32px.
- UI sans above 20px.
- Uppercase without tracking.
- Letter-spaced lowercase.
- Centered blocks over 3 lines.
- Body measure over 68ch.
- Display at any weight but 400.
- A third typeface.

# Space

- Raw px spacing. Scale only.
- Equal spacing between unequal things.
- Section rhythm not using `--sect-*`.

# Motion

- `scale()` on hover.
- bounce · elastic · spring · overshoot · backOut · anticipate.
- Any curve leaving [0,1].
- Raw ms or raw cubic-bezier.
- Library default presets.
- More than 3 concurrent motion layers.
- Animating anything but `transform`/`opacity` without a written reason.
- Scroll-jacking.
- Spinners.
- Animated grain, blur, or glow.
- Rotation on UI.
- Ken Burns on hover.
- Identical fade-ups chained down a page.

# Material

- Any radius but `--r-none`, `--r-soft` (Button), `--r-full` (avatar/pill).
- Any shadow but `--lift-modal`.
- Glassmorphism.
- Blur as decoration.
- Neon.
- Floating cards.
- More than 3 visual layers.
- Borders where space or light would work.

# Layout

- Cards. See `04_COMPONENTS.md` → Frame.
- Shrinking a layout instead of recomposing it.
- Text over imagery without a scrim.
- A whole number of frames in a scrolling strip.
- Inventing a page or nav pattern outside `02_LAYOUT_IA.md`.
- Hero or `--d-5` more than once per session.

# Code

- `<div onClick>`.
- `outline: none` without a replacement.
- `'use client'` without a reason.
- `next/image` omitted or missing `sizes`.
- Placeholder as label.
- A new dependency without justification in the PR body.
- A new top-level folder.
- `TODO` without an issue link.
- Comments restating the code.
- Committing broken main.

# Content

- Buy Now · Shop Fast · Limited Time · Get Yours · Click Here · Learn More.
- Countdowns, scarcity, urgency.
- Exclamation marks.
- Marketing adjectives (premium, luxury, exclusive) describing ourselves.
  We demonstrate. We do not announce.
- Skeleton screens.
- An icon of a sad box in an empty state.

# WebGL

- Particles.
- Decorative noise.
- Anything a user would name.
- Anything that cannot degrade to a still photograph.

---

# Amendment

To remove a rule: open a PR editing this file, with the reason.
Never work around a rule silently. A silently broken rule breaks every other rule with it.
