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
      eyebrow="Behind the screens · Strategic decisions"
      title="Three decisions that framed the work."
      description="The calls made before the surfaces — what the platform would model, where control would live, and what the admin home would lead with."
      cta={{
        href: '/decisions',
        eyebrow: 'Read more',
        label: 'See the strategic decisions in detail',
      }}
    >
      <PreviewCard
        ordinal="01"
        title="Organisation-wide visibility, without taking control from teams."
        summary="Visibility aggregates up to the enterprise tier. Day-to-day control stays with each workspace, the way teams already work."
        href="/decisions#centralised-governance-vs-ent-autonomy"
      />
      <PreviewCard
        ordinal="02"
        title="The identity provider is the source of truth."
        summary="The platform stops modelling identity it doesn't own. Read-only states stop feeling restrictive and start reading as truth."
        href="/decisions#idp-source-of-truth"
      />
      <PreviewCard
        ordinal="05"
        title="Opening to posture, not to a settings page."
        summary="The dashboard becomes the home. Configuration moves one click away — the page now answers the question admins actually open it for."
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
      eyebrow="Behind the screens · Governance evolution"
      title="What changed at the platform level."
      description="Two short comparisons of what shifted underneath the surfaces — not at the screen level — once identity was federated and provisioning was orchestrated."
      cta={{
        href: '/before-after',
        eyebrow: 'Read more',
        label: 'See how governance evolved',
      }}
    >
      <PreviewCard
        ordinal="01"
        title="Fragmented → Organisation-wide visibility."
        summary="From per-workspace silos with no shared view to a posture surface that scales with the size of the enterprise."
        href="/before-after#fragmented-to-centralised"
      />
      <PreviewCard
        ordinal="02"
        title="Manual → Orchestrated provisioning."
        summary="From ticket-driven onboarding and ad-hoc role assignment to a SCIM contract the platform handles end to end."
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
      eyebrow="Behind the screens · Operational workflows"
      title="How the surfaces work underneath."
      description="Three workflow walkthroughs — provisioning, SSO with fallback, and teammate lifecycle — kept off the main page so the case study stays focused on the story."
      cta={{
        href: '/workflows',
        eyebrow: 'Read more',
        label: 'See the workflow walkthroughs',
      }}
    >
      <PreviewCard
        ordinal="01"
        title="How provisioning moves between systems."
        summary="Identity lives in the customer's IdP; the platform listens to it. Token rotation, role mapping and sync failures all kept observable."
        href="/workflows#scim-orchestration"
      />
      <PreviewCard
        ordinal="02"
        title="What happens when SSO isn't reachable."
        summary="The canonical sign-in path with two narrow fallback paths beside it, and a recovery loop that returns the system to SSO as soon as it can."
        href="/workflows#sso-break-glass"
      />
      <PreviewCard
        ordinal="03"
        title="The years after a teammate joins."
        summary="Six named lifecycle states, the transitions between them, and three rules that stay true across all of them — operated through one consistent menu."
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
      eyebrow="Behind the screens · Design explorations"
      title="How three surfaces earned their shape."
      description="Wireframe-level direction studies — kept on the page so the call the team made reads as a call, not as the only possibility."
      cta={{
        href: '/explorations',
        eyebrow: 'Read more',
        label: 'See the design explorations',
      }}
    >
      <PreviewCard
        ordinal="01"
        title="Role mapping directions."
        summary="Three explored approaches to mapping IdP groups to platform roles — and the explicit reason the others didn't ship."
        href="/explorations#scim-role-mapping"
      />
      <PreviewCard
        ordinal="02"
        title="Navigation evolution."
        summary="How the platform's information architecture moved from a feature shelf to a single admin home."
        href="/explorations#governance-navigation"
      />
      <PreviewCard
        ordinal="03"
        title="Dashboard directions."
        summary="Three early wireframes, each testing a different first question the page could answer. Only the third one shipped."
        href="/explorations#admin-dashboard"
      />
    </ArtifactPreviewStrip>
  );
}
