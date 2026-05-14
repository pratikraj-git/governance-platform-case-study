# Review Notes

Working audit for the local review + iteration phase. Not part of the published case study.

## How to run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`. The dev review toolkit is only mounted in development — `next build` strips it from the production bundle.

## Dev review toolkit

Keyboard shortcuts (development only):

| Shortcut    | Effect                                                              |
| ----------- | ------------------------------------------------------------------- |
| `Shift + O` | Toggle section outlines + section labels                            |
| `Shift + G` | Toggle 12-column layout grid overlay                                |
| `Shift + I` | Toggle visual boundaries; click any figure/svg to inspect enlarged  |
| `Shift + R` | Show / hide the floating review panel                               |
| `Esc`       | Close the visual inspector modal                                    |

Floating panel (bottom-right): jump-to-section nav, overlay toggles, current-section indicator. Hidden in production.

## The new direction

This is **v2** of the case study, deliberately a strategic rewrite rather than an incremental patch:

- Compressed from **9 sections → 7**, organized around a single readable narrative arc.
- Removed every synthetic SVG mock (~22 components deleted) — visuals are now **real product screenshots only**, served through `next/image`.
- Removed the dark hero + dark/light navigation toggle. Single editorial light tone, matching the portfolio site.
- Cut overall copy by roughly 45%. Designer voice; no PRD prose.
- Bundle size on `/`: **29.5 kB → 13.9 kB** (53% smaller).

## Section-by-section

### Strongest sections (ship as-is)

**01 · The Growing Governance Problem**
Sets the design problem in three short patterns. Sets up Signals cleanly.

**02 · Enterprise Signals**
Three customer-pattern cards on a warm surface. No logo wall. Grounds the rest of the case study in real enterprise pressure.

**03 · Simplifying Identity & Access**
The first major design surface, anchored by three real screenshots (SSO setup, SCIM role mapping, SCIM tokens). Two sub-movements (SSO, then SCIM) carry the narrative.

**04 · Operational Resilience & Lifecycle**
BGU + teammates merged into one section. Two real screenshots. The "designer's note" at the end is one of the strongest moments in the case study.

**05 · Toward Centralized Governance**
Closing design surface. Two real dashboard screenshots. The blockquote at the close pays off the narrative arc cleanly.

**06 · Reflection & Outcomes**
Designer-led close. Honest about not having fake metrics. Four short outcomes + a personal sign-off.

### Sections to keep an eye on during local review

**00 · Hero**
Light, type-led, no diagram. Watch the title scale on small laptops (clamp tops out at 4.75rem).

**03 · Identity & Access**
Three figures here — the most visually dense section. If pacing feels heavy on first scroll, the SCIM tokens figure is the most droppable.

**05 · Centralized Governance**
The `governance-layer-overview.png` is 760 KB and serves at small size; check that the dashboard landing visual reads well on tablet.

## Visuals — real screenshots

All visuals are real product screenshots served from `public/assets/` through `next/image` (AVIF/WebP, responsive `sizes`).

| File                                                          | Section | Notes                            |
| ------------------------------------------------------------- | ------- | -------------------------------- |
| `sso/sso-setup.jpg`                                           | 03      | SSO configuration surface        |
| `scim/setup-group-and-role-attributes.jpg`                    | 03      | Group → role mapping             |
| `scim/token-generate-fetch-and-push.jpg`                      | 03      | Multi-workspace token portability|
| `bgu/bgu-setup.jpg`                                           | 04      | Break-glass setup                |
| `teammates/handling-of-different-members.jpg`                 | 04      | Teammate lifecycle table         |
| `dashboard/landing-page.jpg`                                  | 05      | Governance dashboard landing     |
| `dashboard/governance-layer-overview.png`                     | 05      | Architectural layer view         |

**Not currently used** (available in `public/assets/` for future iteration):

- `scim/scim-v2-overview.png`
- `scim/edge-cases-and-error-scenarios.jpg`
- `teammates/adding-new-when-scim-enabled.jpg`
- `teammates/adding-new-when-scim-disabled.jpg`

If a section needs another anchor, these are the strongest candidates.

## Image weight — known performance trade-off

The screenshots are large (some 9–24 MB JPGs). `next/image` optimizes them on first request (AVIF/WebP, responsive `sizes`), so the rendered weight per user is far smaller — but the source files inflate the repo.

**Recommended pre-deployment step:**

```bash
# Optional — compress source JPGs to ~1.5–2 MB each before pushing.
# A quick path with ImageMagick:
mogrify -resize '2400x>' -quality 80 -strip public/assets/**/*.jpg
```

This is not required for local review — Next will already serve optimized variants. It only matters for git repo bloat and initial CDN cache priming.

## Spacing rhythm — known acceptable

| Section                  | Vertical rhythm    |
| ------------------------ | ------------------ |
| Hero                     | self-contained, `min-h-[88svh]` |
| Problem → Reflection     | `SectionContainer` default `py-24 md:py-28 lg:py-36` |
| Signals + Governance     | also wrapped in `surface-warm` for variation |

## Responsiveness — known good

- Tested ranges: 375, 768, 1024, 1280, 1440, 1920.
- All editorial split sections collapse to single column cleanly at `< lg`.
- Sticky navigation no longer toggles tone — flat light styling means no flicker.

## Storytelling tightness — open opportunities

These are subjective; iterate only if they bother you on re-read.

- **01 Problem Space** — the three patterns could become two if we wanted to compress further.
- **03 Identity & Access** — the second movement (SCIM) is the longest read in the case study. Acceptable, but worth watching.
- **06 Reflection** — the four outcomes are intentionally non-metric. If a recruiter explicitly asks for numbers, this is the section to revise.

## Modularity — iteration patterns

- **Copy edits:** edit the section file in `components/sections/<Name>.tsx`. Each section is short and self-contained.
- **Visual swaps:** drop a new JPG/PNG into `public/assets/` and update the `src=` in the corresponding `<Figure>`.
- **Section additions:** add an entry to `SECTIONS` in `lib/constants.ts`, create a file in `components/sections/`, render from `app/page.tsx`. Nav + scroll spy + dev panel pick it up automatically.
- **Tone changes:** `styles/tokens.css` is the single source of truth.

## Known issues

- **None blocking.** Build passes, lint passes, no console errors expected.
- Image source files are large (see "Image weight" above) — optional compression before public deployment.

## Iteration log

Use this section to note changes during local review.

- _empty_
