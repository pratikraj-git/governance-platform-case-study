# Review Notes

Working audit for the local review + iteration phase. Not part of the published case study.

## How to run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`. Hot reload is on. The dev review toolkit is only mounted in development — `next build` strips it from the production bundle.

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

## Visual asset note (important)

This case study has **zero raster screenshots**. Every visual — diagrams, mocks, tables, dashboards — is built from SVG, HTML, and CSS. That's deliberate: it scales, theme-respects, prints cleanly, and never blurs on retina.

What this means for review:

- **No image optimization concerns.** Nothing to crop, swap, or compress.
- **Shift + I still works.** The visual inspector opens any `figure` or `svg[role="img"]` enlarged in a modal — useful for reviewing diagram density and inspecting layout fidelity at scale.
- **There are no `next/image` assets to audit.** The favicon is SVG.

## Section-by-section assessment

### Strongest sections (ship as-is)

**02 · Governance Architecture**
The architectural thesis. Single load-bearing diagram, clear orchestration narrative, no clutter. This is the hiring signal-density peak.

**04 · SCIM Lifecycle**
Most substantive technical narrative. Token portability, role mapping, sync flows. Reads as "this person has thought hard about identity infrastructure." The role-notes trim from 5→3 entries during the previous pass paid off.

**05 · Break-Glass Access**
Operationally mature. The "SCIM immunity" framing is the most strategic single insight in the case study. Lands clean.

**07 · Operational Intelligence**
Strong now that the redundant 5-principle movement was removed. The Command Center mock carries the section.

### Sections to revisit on next pass

**00 · Hero**
Solid. The architectural attribution rail at the bottom is good; the meta strip works. Minor: scroll-mark animation is at the edge of "too subtle" — verify on slower displays.

**01 · Problem Space**
Tight but the three problem bodies still rhyme structurally. If any further compression happens, this is the candidate. The closing blockquote earns its weight.

**03 · SSO Orchestration**
The four movements (metadata, setup, cert lifecycle, retry/failure) are correct, but the section is the longest in the case study. Watch the runtime on first-scroll: if it feels long, the cert lifecycle panel is the most compressible.

**06 · Teammate Governance**
Currently solid but visually closest to a "table-driven" section. The TeammatesTable does heavy lifting. If anything ever feels redundant, consider whether the AuthorityHandoffDiagram and TempAccessTimeline can compress into one.

**08 · Outcomes**
Now compressed. Movement C ("what scales next") is the lightest part of the section by design — it's a horizon statement, not a reflection. Acceptable.

## Visuals — strategic value triage

| Visual                       | Section | Strategic weight | Action          |
| ---------------------------- | ------- | ---------------- | --------------- |
| `GovernanceDiagram`          | 02      | High             | Keep            |
| `OrchestrationFlow`          | 02 / 03 | High             | Keep            |
| `CertLifecyclePanel`         | 03      | Medium-high      | Keep            |
| `TokenPortabilityDiagram`    | 04      | High             | Keep            |
| `RoleMappingRules`           | 04      | High             | Keep            |
| `SCIMSyncFlow`               | 04      | High             | Keep            |
| `FallbackLoginMock`          | 05      | Medium           | Keep            |
| `TempAccessTimeline`         | 05 / 06 | Medium           | Keep            |
| `TeammatesTable`             | 06      | Medium           | Keep            |
| `AuthorityHandoffDiagram`    | 06      | Medium           | Keep            |
| `CommandCenterMock`          | 07      | High             | Keep (anchor)   |
| `EvolutionLadder`            | 08      | Medium           | Keep            |
| `FragmentationGrid`          | 01      | Medium           | Keep            |
| `GovernanceStack`            | 02 / 07 | Medium           | Keep            |
| `PrincipleRow`               | 02      | Medium           | Keep            |

All visuals currently earn their space. None flagged for removal. The previous polish pass already eliminated the over-stacked galleries that would have raised triage flags.

## Spacing rhythm — known acceptable inconsistencies

| Section                  | Vertical rhythm    | Notes                                          |
| ------------------------ | ------------------ | ---------------------------------------------- |
| Hero                     | self-contained     | Full-viewport, intentional                     |
| Problem → SCIM           | `gap-20 lg:gap-28` | Standard editorial section rhythm              |
| BGU → Outcomes           | `gap-20 lg:gap-28` | Same                                           |

If `Shift + G` exposes any spacing irregularity, log it here.

## Responsiveness — known good

- Tested ranges: 375 (iPhone SE), 768 (iPad), 1024, 1280, 1440, 1920.
- All editorial split sections collapse to single column at `< lg` cleanly.
- `CommandCenterMock` activity stream wraps gracefully (fixed in the previous pass).
- Sticky navigation transitions tone (dark over hero, light otherwise) without flicker.

If responsive issues are spotted, log here:

- [ ] _none flagged yet_

## Storytelling tightness — opportunities

These are subjective notes. Iterate only if they bother you on re-read:

- **01 Problem Space** middle paragraph ("orchestration cost") could go one line shorter.
- **03 SSO Orchestration** Movement A → B transition is slightly abrupt. A connective line between metadata handling and cert lifecycle could help.
- **07 Operational Intelligence** Movement A thesis paragraph is dense. Two short sentences may scan better than one long one.

None of these are blockers.

## Modularity — iteration-ready

Already modular. Pattern to follow for swaps:

- **Copy edits:** edit the section file in `components/sections/<Name>.tsx`. Each "movement" body is a self-contained paragraph block — find and replace.
- **Visual swaps:** every diagram is a standalone component in `components/ui/`. Replace its internals; the surrounding section layout is untouched.
- **Section additions:** add a new entry to `SECTIONS` in `lib/constants.ts`, create a new file in `components/sections/`, render it from `app/page.tsx`. The nav, scroll spy, and review panel pick it up automatically.
- **Color / type tokens:** all in `styles/tokens.css`. Change once, propagates everywhere.

## Known issues

- **None at the time of writing.** No console errors, no hydration warnings, no layout shift on first paint.
- Framer-motion animations don't replay inside the zoom inspector modal (the captured HTML is static at click-time). This is intentional — inspection should be still.

## Before public deployment — checklist

- [ ] Set `NEXT_PUBLIC_PORTFOLIO_URL` in Vercel env if/when the portfolio link is wanted
- [ ] Verify the favicon renders at 16px (zoom in browser tab)
- [ ] Confirm Open Graph preview by pasting the production URL into a Slack/Twitter compose
- [ ] Lighthouse pass on a representative URL (target: 90+ on all four scores)
- [ ] One read-through on a mobile device (375 width)

## Iteration log

Use this section to note changes during local review:

- _empty_
