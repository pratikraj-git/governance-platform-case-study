# Design exploration artifacts

Three standalone design-exploration artifacts. **Not part of the live case study.** Where `components/workflows/` hosts *architecture* (what the system is), this folder hosts *process* — wireframe-level reasoning about how each surface earned its shape.

| Artifact | File | Suggested home in the case study |
|---|---|---|
| SCIM role mapping | `ScimRoleMappingExploration.tsx` | `03 · Identity & Access` — immediately before the role-mapping `Figure` |
| Governance navigation evolution | `GovernanceNavigationEvolution.tsx` | `05 · Toward centralised governance` — before the dashboard `Figure` |
| Admin dashboard direction | `AdminDashboardDirections.tsx` | `05 · Toward centralised governance` — between the navigation artifact and the final dashboard image |

## Preview them

Run `npm run dev`, then open:

- **Local:** http://localhost:3000/explorations
- **Production:** `<your-vercel-url>/explorations` (unindexed)

The preview page lives at `app/explorations/page.tsx`. It is **marked `noindex`** so it doesn't leak into search results; once an exploration moves into the case study, remove it from the preview.

## Design language

Each exploration is composed from the shared primitives in `_primitives.tsx`:

- **`ExplorationSection`** — outer shell. Eyebrow (`Exploration · …`), title, one-sentence description, optional insight beneath the grid. Mirrors `WorkflowSection`'s spacing so the two preview pages feel like siblings.
- **`ExplorationGrid`** — 2- or 3-column side-by-side comparison. Includes a hairline progression bar (desktop) that suggests "these are points along a journey" without spelling it out. Stacks one-per-row on mobile.
- **`ExplorationCard`** — one direction. Wraps an ordinal label, a name, a verdict tag, the wireframe canvas, and a one-sentence rationale.
- **`WireframeFrame`** — bordered grayscale canvas that hosts the structural mock. Defaults to a 4:3 aspect ratio. The shipped direction is rendered with `emphasis` (ink-tinted border + quiet shadow) so it reads as *the one that earned this* without leaning on color.
- **Block primitives** — `Bar`, `BarStack`, `Chip`, `Region`. Compose these to build a wireframe. Everything renders as a div / span of `bg-line-soft` / `bg-line` / `bg-line-strong` — the canvas reads as paper-and-pencil, never illustrated.
- **`Stagger`** — thin wrapper around `revealStagger`.

The visual register is **wireframe, not infographic**:

- grayscale only (no decorative color, no signal palette)
- structural blocks + skeleton bars (no real text inside the wireframe)
- type-led editorial framing (mono ordinals, mono verdict tags)
- the shipped direction is emphasised by *border weight*, not by color
- motion is the site's `revealUp` + `IN_VIEW` only

### Verdict tiers

Each card carries a small monospace verdict tag. The tiers are deliberate:

| Tier | Meaning | Ink |
|---|---|---|
| `rejected` | This direction taught us something but did not earn a place in the system | `text-ink-4` |
| `bridged` | This direction influenced the shipped design even though it wasn't the final form | `text-ink-3` |
| `shipped` | The direction that earned the system | `text-ink-1` |

The qualifier after the tier (`· too analytics`, `· informed precedence`) is the most useful copy on the card — it's the *why* behind the verdict. Keep qualifiers to ≤ 6 words.

## To drop an exploration into the case study

For example, to insert the SCIM role-mapping exploration before the role-mapping figure in `IdentityAccess.tsx`:

```tsx
// components/sections/IdentityAccess.tsx
import { ScimRoleMappingExploration } from '@/components/explorations/ScimRoleMappingExploration';

// …inside <IdentityAccess />, immediately before the role-mapping Figure:
<div className="mt-28 border-t border-line-soft pt-14">
  <ScimRoleMappingExploration />
</div>
```

Notes:

1. Each exploration renders its own `<section>` with full vertical rhythm. If you embed it inside an existing section, wrap it in a thin top divider so the rhythm stays consistent.
2. After promoting an artifact into the case study, delete its import + component instance from `app/explorations/page.tsx`.
3. If you want the artifact to participate in the section nav, give it an `id` that matches a new entry in `lib/constants.SECTIONS` — otherwise the nav will not surface it.

## Content vs structure

The wireframes are intentionally generic — block, bar, chip — so they carry zero internal information. The editorial copy (ordinal names, verdicts, rationales, insights) is the substantive part. Before promoting any artifact into the published case study, re-read the rationale and insight strings — those are the lines hiring managers will read.

## File map

```
components/explorations/
├── _primitives.tsx                       ← Section, Grid, Card, WireframeFrame, Bar, Chip, Region
├── ScimRoleMappingExploration.tsx
├── GovernanceNavigationEvolution.tsx
├── AdminDashboardDirections.tsx
└── README.md                             ← you are here
```
