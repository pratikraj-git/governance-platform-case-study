'use client';

/**
 * Four artifact preview interludes, in case-study reading order:
 *
 *   • KeyDecisionsPreview        — after the problem-space section
 *   • BeforeAfterPreview         — after the SSO sub-movement
 *   • WorkflowsPreview           — after the SCIM sub-movement
 *   • DesignExplorationsPreview  — after the resilience section
 *
 * Each one is a thin wrapper around `ArtifactPreviewStrip` with two
 * or three `PreviewCard`s. Cards deep-link to the exact anchor on
 * the matching artifact page; the strip-level CTA goes to the
 * artifact family root.
 *
 * Copy register:
 *   • Card title  — one short sentence of meaning, ≤ 9 words.
 *   • Card summary — one sentence of intent, ≤ 22 words.
 *   • Strip title  — what the reader can expect to find one click away.
 *
 * No screenshots, no images. The interlude must read as type and
 * structure — different from the polished product surfaces above
 * and below it.
 */

import { ArtifactPreviewStrip, PreviewCard } from './_primitives';

/** All four previews accept an optional `variant` so they can be
 *  used either between top-level sections (`bleed`, the default) or
 *  inside an existing `SectionContainer` (`inline`). */
type PreviewVariant = 'bleed' | 'inline';

/* ──────────────────────────────────────────────────────────────────── *
 *  01 · After "The growing governance problem"
 *  Three decisions that frame the strategic posture of the project.
 * ──────────────────────────────────────────────────────────────────── */

export function KeyDecisionsPreview({ variant }: { variant?: PreviewVariant } = {}) {
  return (
    <ArtifactPreviewStrip
      id="preview-key-decisions"
      variant={variant}
      eyebrow="Side note · Strategic decisions"
      title="Three decisions framing the work."
      description="Before the surfaces — the calls that decided what the platform would model, where control would live, and what the dashboard would lead with."
      cta={{
        href: '/decisions',
        eyebrow: 'Strategic artifact',
        label: 'View strategic governance decisions',
      }}
    >
      <PreviewCard
        ordinal="01"
        title="Centralised governance, without removing ENT autonomy."
        summary="Visibility aggregates upward to the enterprise tier; day-to-day control stays distributed at the workspace."
        href="/decisions#centralised-governance-vs-ent-autonomy"
      />
      <PreviewCard
        ordinal="02"
        title="The identity provider is the source of truth."
        summary="The platform stops modelling identity it doesn't own. Read-only states become truth, not restriction."
        href="/decisions#idp-source-of-truth"
      />
      <PreviewCard
        ordinal="05"
        title="Operational intelligence over settings navigation."
        summary="The dashboard becomes the home; configuration moves one click away. The page now answers the question admins actually open it for."
        href="/decisions#operational-intelligence-over-settings"
      />
    </ArtifactPreviewStrip>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  02 · After the SSO sub-movement
 *  Two governance-evolution comparisons that the SSO redesign sits
 *  inside.
 * ──────────────────────────────────────────────────────────────────── */

export function BeforeAfterPreview({ variant }: { variant?: PreviewVariant } = {}) {
  return (
    <ArtifactPreviewStrip
      id="preview-before-after"
      variant={variant}
      eyebrow="Side note · Before vs After"
      title="The shape of governance the SSO redesign sits inside."
      description="Two short comparisons of what changed at the platform level — not the screen level — once identity was federated and provisioning was orchestrated."
      cta={{
        href: '/before-after',
        eyebrow: 'Comparison artifact',
        label: 'View governance evolution',
      }}
    >
      <PreviewCard
        ordinal="01"
        title="Fragmented → Centralised governance."
        summary="From per-workspace silos with no organisation-level view to an aggregated posture surface that scales with enterprise size."
        href="/before-after#fragmented-to-centralised"
      />
      <PreviewCard
        ordinal="02"
        title="Manual → Orchestrated provisioning."
        summary="From ticket-driven onboarding and ad-hoc role assignment to a SCIM contract the platform owns end to end."
        href="/before-after#manual-to-orchestrated"
      />
    </ArtifactPreviewStrip>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  03 · After the SCIM sub-movement
 *  Three workflow artifacts that show the architecture behind the
 *  surfaces.
 * ──────────────────────────────────────────────────────────────────── */

export function WorkflowsPreview({ variant }: { variant?: PreviewVariant } = {}) {
  return (
    <ArtifactPreviewStrip
      id="preview-workflows"
      variant={variant}
      eyebrow="Side note · Workflow artifacts"
      title="The architecture behind the surfaces."
      description="Three standalone workflow diagrams — provisioning, authentication continuity, and lifecycle governance — kept off the main page so the case study stays in narrative."
      cta={{
        href: '/workflows',
        eyebrow: 'Architecture artifact',
        label: 'View workflow artifacts',
      }}
    >
      <PreviewCard
        ordinal="01"
        title="SCIM orchestration across enterprise tenants."
        summary="Three-layer architecture: identity provider → orchestration → tenants. Where truth lives, where the design happens, where the contract lands."
        href="/workflows#scim-orchestration"
      />
      <PreviewCard
        ordinal="02"
        title="SSO with a quietly-engineered fallback path."
        summary="Canonical sign-in with two narrowly-scoped fallbacks — emergency access and active temporary teammate continuity."
        href="/workflows#sso-break-glass"
      />
      <PreviewCard
        ordinal="03"
        title="Teammate lifecycle as a governance state machine."
        summary="Six explicit states, named transitions, three cross-cutting concerns — operated through one consistent action menu."
        href="/workflows#teammate-lifecycle"
      />
    </ArtifactPreviewStrip>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  04 · After the resilience / lifecycle section
 *  Three design-exploration artifacts that earned the surfaces above.
 * ──────────────────────────────────────────────────────────────────── */

export function DesignExplorationsPreview({ variant }: { variant?: PreviewVariant } = {}) {
  return (
    <ArtifactPreviewStrip
      id="preview-design-explorations"
      variant={variant}
      eyebrow="Side note · Design explorations"
      title="How the surfaces earned their final shape."
      description="Wireframe-level direction studies — kept as artifacts so the call the team made reads as a call, not as the only possibility."
      cta={{
        href: '/explorations',
        eyebrow: 'Exploration artifact',
        label: 'View design explorations',
      }}
    >
      <PreviewCard
        ordinal="01"
        title="SCIM role-mapping exploration."
        summary="Three role-mapping directions, with the one that survived and the explicit reason the other two didn't."
        href="/explorations#scim-role-mapping"
      />
      <PreviewCard
        ordinal="02"
        title="Governance navigation evolution."
        summary="How the platform's information architecture earned its shape — from feature shelf to governance surface."
        href="/explorations#governance-navigation"
      />
      <PreviewCard
        ordinal="03"
        title="Admin dashboard directions."
        summary="Three early wireframes, each testing a different first question the surface could answer. Only the third shipped."
        href="/explorations#admin-dashboard"
      />
    </ArtifactPreviewStrip>
  );
}
