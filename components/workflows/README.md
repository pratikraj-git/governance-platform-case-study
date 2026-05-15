# Workflow artifacts

Three reusable enterprise-architecture artifacts. **Not part of the live case study.** Each lives in this folder as a self-contained section component that can be dropped into the main case study selectively, when it earns a place there.

| Artifact | File | Suggested home in the case study |
|---|---|---|
| SCIM orchestration | `ScimOrchestrationWorkflow.tsx` | `03 · Identity & Access` — between the SCIM movement and Flow B |
| SSO + break-glass | `SsoBreakGlassWorkflow.tsx` | `04 · Resilience & Lifecycle` — replacing or augmenting Flow C |
| Teammate lifecycle | `TeammateLifecycleWorkflow.tsx` | `04 · Resilience & Lifecycle` — after the teammates figure |

## Preview them

Run `npm run dev`, then open:

- **Local:** http://localhost:3000/workflows
- **Production:** `<your-vercel-url>/workflows` (unindexed)

The preview page lives at `app/workflows/page.tsx`. It is **marked `noindex`** so it doesn't leak into search results; once an artifact moves into the case study, remove it from the preview page.

## Design language

The artifacts share a single set of primitives in `_primitives.tsx`:

- **`WorkflowSection`** — the outer shell with eyebrow, title, one-sentence description, and an optional insight beneath the diagram.
- **`Layer`** — a horizontal architectural tier (e.g. "Source", "Orchestration", "Tenants"). Hairline-framed, hosts a row of `NodeCard`s.
- **`NodeCard`** — a single block in an architecture diagram. Supports a `kind` taxonomy (`source` / `service` / `state` / `tenant` / `fallback` / `observer`) and an `emphasis` flag for the centerpiece node.
- **`VerticalConnector`** — a 1px hairline drop between two layers, optionally labeled (e.g. "SCIM 2.0 · token-authenticated").
- **`BranchConnector`** — a two-armed spreader used for fork moments (e.g. "IdP available" vs "IdP unavailable").
- **`Sidebar`** — sticky two-column wrapper for diagram + editorial commentary.
- **`Stagger`** — thin wrapper around `revealStagger` for children that should reveal together.

The visual register is intentionally Stripe / Vercel / Linear:

- monochrome (no decorative color)
- type-led (mono labels, sentence-case node copy)
- hairlines only (no SVG paths, no arrowheads, no shadows beyond the ink-1 emphasis shadow)
- responsive (every diagram collapses to a single column under `md`)
- motion is the existing site's `revealUp` + `IN_VIEW` only

## To drop an artifact into the case study

For example, to insert the SCIM orchestration into `03 · Identity & Access`:

```tsx
// components/sections/IdentityAccess.tsx
import { ScimOrchestrationWorkflow } from '@/components/workflows/ScimOrchestrationWorkflow';

// …inside <IdentityAccess />, after the SCIM Figure block:
<div className="mt-28 border-t border-line-soft pt-14">
  <ScimOrchestrationWorkflow />
</div>
```

Notes:

1. The artifact renders its own `<section>` with full vertical rhythm. If you embed it inside an existing section, wrap it in a thin top divider so the rhythm stays consistent.
2. To remove an artifact from the preview page afterwards, delete its import and component instance from `app/workflows/page.tsx`.
3. If you want the artifact to participate in the section nav, give it an `id` that matches a new entry in `lib/constants.SECTIONS` — otherwise the nav will not surface it.

## Content vs structure

Each artifact ships with placeholder editorial copy that is generic and safe to publish. Before promoting one into the case study, audit the node sublabels for internal terminology, customer names, or implementation specifics — same checklist used for the screenshots in `REVIEW_NOTES.md`.

## File map

```
components/workflows/
├── _primitives.tsx              ← shared Section, Layer, NodeCard, connectors
├── ScimOrchestrationWorkflow.tsx
├── SsoBreakGlassWorkflow.tsx
├── TeammateLifecycleWorkflow.tsx
└── README.md                    ← you are here
```
