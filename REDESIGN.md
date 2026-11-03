# Redesign - "Build Log" (v5.0, Nov 2026)

The site is now told as a changelog: five chapters of *what I was learning* and
*what I made while learning it*, followed by the work, the unfinished bench,
the toolbox and a contact finale.

## Direction
Editorial ink-on-paper with one signal colour. Big expressive grotesk for
display, a serif italic for the human voice, mono for the "terminal" metadata.

Never: glassmorphism, gradient blobs, cursor replacements, scroll-jacking,
stock tech-logo walls.

## Tokens (`client/src/index.css`)
| Role | Paper (default) | Night |
| --- | --- | --- |
| paper / paper-2 / paper-3 | #f3f0e8 / #eae6db / #dfdace | #121211 / #1b1b19 / #26251f |
| ink / ink-2 / ink-3 | #121211 / #3a3833 / #66625a | #eeeae1 / #c4bfb4 / #969186 |
| signal (fills) / signal-ink (text) | #ff5b1f / #b93a0b | #ff6a30 / #ff9466 |

All text pairs pass WCAG AA (lowest: signal-ink on paper-2, 4.58:1).
Type: Bricolage Grotesque (variable, self-hosted), Instrument Serif italic,
JetBrains Mono. Scale utilities: `text-display`, `text-h2`, `text-h3`,
`text-lead`, `text-body`, `text-meta`.

## Motion
- Boot sequence (once per session, ~1.3s)
- Hero: per-letter 3D flip, scroll parallax that pulls the two name lines apart,
  interactive code-glyph canvas (cursor-reactive; idle sweep on touch)
- Lenis inertial scroll; velocity-reactive text bands
- Story: sticky year rail with progress beam and rolling year
- Work: clip-path un-mask on the featured screenshot, cursor-following previews,
  accordion rows; allocation bars draw in
- Bench: 3D tilt-in cards with signal wash on hover
- Contact: headline inks in left→right with scroll; magnetic CTA

Everything respects `prefers-reduced-motion` (canvas, Lenis, boot and
scroll-linked transforms are disabled; content is fully visible).

## Content TODOs
Search `TODO(tarang)` in `client/src/lib/data.ts` - title (Founder & CEO vs
Co-founder), WhatsApp/phone numbers, Priinteve founding year, Hackovate year,
Zerox Buddy / Salonly one-liners and stacks, Royal Timber / Quantivo URLs.

Screenshots: drop 16:10 AVIFs in `client/public/projects/` and set `image`
in `data.ts` - rows with an image get a hover preview automatically.
