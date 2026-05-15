# Before / After comparison artifacts

Three reusable "Before vs After" editorial comparisons. **Not part of the live case study.** Where the sibling families expose *architecture*, *process*, and *strategy*, this folder exposes **evolution** — the shifts the governance surface made and the operational gains each one carried.

| # | Comparison | Component |
|---|---|---|
| 01 | Fragmented governance → Centralised governance | `FragmentedToCentralisedGovernance` |
| 02 | Manual provisioning → Orchestrated lifecycle management | `ManualToOrchestratedProvisioning` |
| 03 | Settings navigation → Operational governance | `SettingsToOperationalGovernance` |

The combined `BeforeAfterComparisons` component renders all three in narrative order, separated by hairline rules.

## Preview them

Run `npm run dev`, then open:

- **Local:** http://localhost:3000/before-after
- **Production:** `<your-vercel-url>/before-after` (unindexed)

There's also an aggregated review index at http://localhost:3000/review that links to all four artifact families on one page.

The preview page lives at `app/before-after/page.tsx`. It is **marked `noindex`** so it doesn't leak into search results.

## Design language

Type-led editorial comparison. No card chrome, no signal colour, no arrow iconography between columns. The visual hierarchy comes from **ink steps** alone:

| Column | Eyebrow | State title | Items | Bullet |
|---|---|---|---|---|
| **Before** | `text-ink-4` | `text-ink-3` | `text-ink-3` | `bg-line-strong` |
| **After**  | `text-ink-1` | `text-ink-1` | `text-ink-2` | `bg-ink-1` |

The AFTER side reads as the destination because every tier is one ink step stronger than its BEFORE counterpart — not because of color or chrome.

### Layout

- **lg+** — two-column grid with a vertical hairline (`lg:border-r lg:border-line-soft`) between the columns; 48–56px gutter on each side.
- **< lg** — single column, stacked. BEFORE on top, AFTER below, separated by a horizontal hairline (`border-t border-line-soft`).
- Each column has: monospace eyebrow → state title → bulleted list.
- Lists can be of unequal length — the comparison doesn't have to be 1:1.

### Editorial register

- **Title** — a single arc, sentence-case, ending in a period. Example: *"Manual provisioning → Orchestrated lifecycle management."*
- **Description** — one paragraph, 35–55 words. Frame the shift, not the features.
- **Items** — short operational phrases, sentence-case, 3–6 words.
- **Insight** — one italic sentence at the foot. The line that ties the comparison to the larger systems argument.

## To drop a comparison into the case study

### Embed a single comparison

```tsx
// components/sections/CentralizedGovernance.tsx
import { FragmentedToCentralisedGovernance } from '@/components/before-after/comparisons';

// …inside <CentralizedGovernance />, before the dashboard Figure:
<div className="mt-24 border-t border-line-soft pt-14">
  <FragmentedToCentralisedGovernance />
</div>
```

### Embed the full chapter

```tsx
// app/page.tsx
import { BeforeAfterComparisons } from '@/components/before-after/comparisons';

// …between two sections of the case study:
<BeforeAfterComparisons />
```

### Compose a custom subset

```tsx
import { BeforeAfterArtifact } from '@/components/before-after/_primitives';

<BeforeAfterArtifact
  eyebrow="Comparison · Identity orchestration"
  title="Before SCIM → After SCIM."
  description="A bespoke comparison the named exports don't already cover."
  before={{
    state: 'Manual lifecycle',
    items: ['…', '…', '…'],
  }}
  after={{
    state: 'Orchestrated lifecycle',
    items: ['…', '…', '…'],
  }}
  insight="…"
/>
```

Notes:

1. Each comparison renders its own `<section>` with full vertical rhythm. If you embed it inside an existing section, wrap it in a thin top divider so the rhythm stays consistent.
2. After promoting an artifact into the case study, remove its import + component instance from `app/before-after/page.tsx`.
3. If you want a comparison to participate in the section nav, give it an `id` matching a new entry in `lib/constants.SECTIONS`. Each named comparison already has an `id` set on its `<section>`, so deep-links into the preview page work out of the box.

## File map

```
components/before-after/
├── _primitives.tsx              ← BeforeAfterArtifact · ComparisonColumn
├── comparisons.tsx              ← three named comparisons + combined BeforeAfterComparisons
└── README.md                    ← you are here
```
