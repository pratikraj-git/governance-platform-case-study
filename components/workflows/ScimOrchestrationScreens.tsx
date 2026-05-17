'use client';

/**
 * SCIM Orchestration — execution proof.
 *
 * Sibling companion to `ScimOrchestrationWorkflow.tsx`. Renders the
 * real product screens that demonstrate the orchestration described
 * in the workflow diagram:
 *
 *   01 · Role mapping            — hero centerpiece of the surface
 *   02 · Mapping at scale        — conflict prevention + abstractions
 *   03 · Operational state       — what the surface tells the admin
 *                                  after configuration is done
 *
 * No new layout patterns. Reuses the existing `Figure` component for
 * every image and the `ScreenSection` / `ScreenGroup` primitives for
 * the shell — the same editorial register as the rest of the site.
 */

import { Figure } from '@/components/ui/Figure';
import { ScreenSection, ScreenGroup } from './_screens';

export function ScimOrchestrationScreens() {
  return (
    <ScreenSection
      id="scim-orchestration-screens"
      eyebrow="Screens · Provisioning"
      title="What admins actually see, in product."
      description="The role-mapping surface, the conflict-prevention model behind it, and the state-aware messaging that turns setup into an ongoing system the admin can trust."
    >
      {/* ── 01 · Role mapping — hero */}
      <ScreenGroup
        ordinal="01"
        label="Role mapping"
        intent="The centrepiece of SCIM administration: IdP groups mapped to platform roles, with precedence held explicit so two rules can never silently disagree."
      >
        <Figure
          src="/assets/screens/scim/role-mapping.png"
          alt="SCIM role mapping — IdP groups assigned to platform roles with explicit precedence."
          width={1440}
          height={900}
          scale="hero"
          caption="The shipped role-mapping surface. Each row pairs an IdP group with a platform role; precedence is a property of the rule, not an assumption about the order."
        />
      </ScreenGroup>

      {/* ── 02 · Mapping at scale */}
      <ScreenGroup
        ordinal="02"
        label="Mapping at scale"
        intent="Two adjacent surfaces that keep role mapping coherent as the enterprise grows — explicit conflict prevention and a small set of well-named role abstractions."
        pair
      >
        <Figure
          src="/assets/screens/scim/role-mapping-conflict.png"
          alt="Role mapping conflict — the surface naming and resolving an overlap between two mapping rules."
          width={1552}
          height={940}
          scale="support"
          caption="Conflict prevention. When two rules overlap, the conflict is named on the surface — not buried in a tooltip."
        />
        <Figure
          src="/assets/screens/scim/role-mapping-variants.png"
          alt="Role mapping variants — exploration of role abstractions used to keep the mapping surface readable at enterprise scale."
          width={4560}
          height={900}
          scale="support"
          caption="Role abstraction exploration. A small set of named roles keeps the mapping page legible across hundreds of IdP groups."
        />
      </ScreenGroup>

      {/* ── 03 · Operational state */}
      <ScreenGroup
        ordinal="03"
        label="Operational state inside setup"
        intent="Setup completion isn't the same as system health. These two surfaces turn the SCIM configuration page into a page that also reports on itself."
      >
        <Figure
          src="/assets/screens/scim/operational-states.png"
          alt="SCIM operational states — the four observable conditions of a SCIM connection, surfaced inline on the setup page."
          width={4528}
          height={1028}
          scale="hero"
          caption="The four observable conditions of a SCIM connection — configured, syncing, drifted, errored — surfaced inline on the page that configured them."
        />
        <Figure
          src="/assets/screens/scim/state-wise-messages.png"
          alt="SCIM state-wise messages — the operational guidance shown for each connection state."
          width={1654}
          height={952}
          scale="support"
          caption="State-wise guidance. Each operational condition carries a short, specific recovery message — not a generic error."
        />
      </ScreenGroup>
    </ScreenSection>
  );
}
