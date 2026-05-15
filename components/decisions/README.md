# Key decision artifacts

A reusable set of "Key decision" content blocks for the governance platform case study. **Not part of the live case study.** Where `components/workflows/` exposes the *architecture* and `components/explorations/` exposes the *design process*, this folder exposes the *strategic reasoning* — the calls that shaped the surface and the tradeoffs each one carried.

| Decision | Component | Suggested home in the case study |
|---|---|---|
| 01 · Centralised governance vs ENT autonomy | `CentralizedGovernanceDecision` | `01 · Problem space` — after the problem framing, before the customer signals |
| 02 · IdP as source of truth | `IdpSourceOfTruthDecision` | `03 · Identity & access` — as a sidebar to the role-mapping figure |
| 03 · Operational state inside setup | `OperationalStatesInSetupDecision` | `03 · Identity & access` — after the SSO setup figure |
| 04 · Governance beyond authentication | `GovernanceBeyondAuthenticationDecision` | `04 · Resilience & lifecycle` — before the teammates figure |
| 05 · Operational intelligence over settings | `OperationalIntelligenceOverSettingsDecision` | `05 · Toward centralised governance` — opening the dashboard movement |

The combined `KeyDecisions` component renders all five as a self-contained chapter — drop it in between two sections of the case study when you want the strategic arc up-front.

## Preview them

Run `npm run dev`, then open:

- **Local:** http://localhost:3000/decisions
- **Production:** `<your-vercel-url>/decisions` (unindexed)

The preview page lives at `app/decisions/page.tsx`. It is **marked `noindex`** so it doesn't leak into search results; once a decision (or the chapter) moves into the case study, remove it from the preview.

## Design language

The primitives are deliberately editorial, not graphical:

- **`KeyDecisionsSection`** — outer shell. Eyebrow (`Key decisions · Strategic tradeoffs`), title, one-paragraph framing, optional designer insight at the foot. Matches `WorkflowSection` / `ExplorationSection` in spacing.
- **`KeyDecisionsList`** — vertical stack of decision rows separated by hairline rules. Children reveal as a stagger.
- **`KeyDecision`** — one decision row. Editorial split: ordinal + title on the left (5 cols), prose on the right (7 cols) at `lg+`; stacks on mobile and tablet.
- **`ProseBlock`** *(internal)* — a single labelled paragraph. Two tiers: monospace label, reading body.

There is **no card chrome, no signal colour, no diagram**. The visual hierarchy lives entirely in type:

| Tier | Role | Treatment |
|---|---|---|
| Decision title | Strategic call | 22–30px sans, semibold, `text-ink-1` |
| Mono labels (`Why this mattered`, `Tradeoff · Impact`) | Editorial signposting | 10.5px mono, uppercase, tracked, `text-ink-3` |
| Body prose | Reading content | 15px sans, `text-ink-2`, leading 1.65 |
| Ordinal (`01 · 02 · …`) | Sequence cue | 11px mono, `text-ink-4` |

Motion is the site's existing `revealUp` + `IN_VIEW` — nothing bespoke.

## Copy register

Every decision follows the same 3-part structure:

```
[Title]                  Sentence-case, single clause of strategic meaning.
Why this mattered        25–45 words. Strategic context, business reality.
Tradeoff · Impact        25–55 words. What was given up, what was gained.
```

The tone is **interview-friendly**: intelligent, calm, mature. No marketing language, no exaggerated impact claims, no buzzwords. Each block reads like a sentence you would actually say in a portfolio walkthrough or a hiring conversation.

## To drop a decision into the case study

### Embed a single decision

Use one as a sidebar to a section, when its argument reinforces a surrounding figure:

```tsx
// components/sections/IdentityAccess.tsx
import { IdpSourceOfTruthDecision } from '@/components/decisions/decisions';

// …inside <IdentityAccess />, after the role-mapping Figure:
<div className="mt-24 border-t border-line-soft pt-14">
  <IdpSourceOfTruthDecision />
</div>
```

### Embed the full chapter

Use the combined section between two narrative sections, when the strategic arc deserves its own beat:

```tsx
// app/page.tsx
import { KeyDecisions } from '@/components/decisions/decisions';

// …between OperationalResilience and CentralizedGovernance:
<KeyDecisions />
```

### Compose a custom subset

Pick decisions à la carte using the primitives:

```tsx
import {
  KeyDecisionsSection,
  KeyDecisionsList,
} from '@/components/decisions/_primitives';
import {
  CentralizedGovernanceDecision,
  OperationalIntelligenceOverSettingsDecision,
} from '@/components/decisions/decisions';

<KeyDecisionsSection
  eyebrow="Two calls that shaped the dashboard"
  title="Centralisation, framed."
  description="Two of the decisions matter most when read together."
>
  <KeyDecisionsList>
    <CentralizedGovernanceDecision />
    <OperationalIntelligenceOverSettingsDecision />
  </KeyDecisionsList>
</KeyDecisionsSection>
```

Notes:

1. Each `KeyDecision` is an `<article>` — it's safe to nest inside any `<section>` in the case study without breaking outline semantics.
2. After promoting an artifact into the case study, delete its import + component instance from `app/decisions/page.tsx`.
3. If you want a decision to participate in the section nav, give it an `id` matching a new entry in `lib/constants.SECTIONS`. Each named decision already has an `id` set on its `<article>`, so deep-links into the preview page work out of the box.

## File map

```
components/decisions/
├── _primitives.tsx              ← KeyDecisionsSection · KeyDecisionsList · KeyDecision
├── decisions.tsx                ← five named decisions + combined KeyDecisions chapter
└── README.md                    ← you are here
```
