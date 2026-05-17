import type { Metadata } from 'next';
import { ScimOrchestrationWorkflow } from '@/components/workflows/ScimOrchestrationWorkflow';
import { ScimOrchestrationScreens } from '@/components/workflows/ScimOrchestrationScreens';
import { SsoBreakGlassWorkflow } from '@/components/workflows/SsoBreakGlassWorkflow';
import { SsoBreakGlassScreens } from '@/components/workflows/SsoBreakGlassScreens';
import { TeammateLifecycleWorkflow } from '@/components/workflows/TeammateLifecycleWorkflow';
import { TeammateLifecycleScreens } from '@/components/workflows/TeammateLifecycleScreens';
import { DeepDiveHero, DeepDiveFooter } from '@/components/ui/DeepDiveHero';

/**
 * /workflows — Operational workflows deep dive.
 *
 * The public-facing page that expands on the main case study with
 * detailed walkthroughs of identity setup, provisioning behavior,
 * fallback access, and teammate lifecycle management.
 *
 * Reads as a continuation of the case study, not as a preview surface.
 */

export const metadata: Metadata = {
  title: 'Operational workflows · Design deep dive',
  description:
    'A deeper walkthrough of provisioning, SSO with fallback access, and teammate lifecycle management — the workflows that shape day-to-day admin work.',
};

export default function WorkflowsPage() {
  return (
    <>
      <DeepDiveHero
        heading="Operational workflows behind the platform."
        intro="A collection of detailed walkthroughs covering identity setup, provisioning behavior, fallback access, and teammate lifecycle management across enterprise environments."
        expandsOn="These sections expand on the main case study with deeper workflow thinking, edge cases, and operational decisions that shaped the final platform experience."
        chips={[
          { href: '#scim-orchestration', label: 'SCIM provisioning' },
          { href: '#sso-break-glass', label: 'SSO and fallback access' },
          { href: '#teammate-lifecycle', label: 'Teammate lifecycle' },
        ]}
      />

      <ScimOrchestrationWorkflow />
      <ScimOrchestrationScreens />

      <div className="border-t border-line-soft" aria-hidden />

      <SsoBreakGlassWorkflow />
      <SsoBreakGlassScreens />

      <div className="border-t border-line-soft" aria-hidden />

      <TeammateLifecycleWorkflow />
      <TeammateLifecycleScreens />

      <DeepDiveFooter />
    </>
  );
}
