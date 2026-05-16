import { Hero } from '@/components/sections/Hero';
import { ProblemSpace } from '@/components/sections/ProblemSpace';
import { EnterpriseSignals } from '@/components/sections/EnterpriseSignals';
import { IdentityAccess } from '@/components/sections/IdentityAccess';
import { OperationalResilience } from '@/components/sections/OperationalResilience';
import { CentralizedGovernance } from '@/components/sections/CentralizedGovernance';
import { Reflection } from '@/components/sections/Reflection';
import {
  KeyDecisionsPreview,
  DesignExplorationsPreview,
} from '@/components/previews/previews';

/**
 * Home — single editorial page composed of seven highly-consumable sections.
 *
 * Narrative arc:
 *   00 Overview        → A designer’s introduction to the work.
 *   01 Problem         → How governance quietly grew into a systems problem.
 *   02 Signals         → What enterprise customers were actually asking for.
 *   03 Identity        → SSO + SCIM, simplified without being simplified away.
 *   04 Resilience      → Break-glass and lifecycle — designing for the long now.
 *   05 Governance      → The dashboard that emerges when surfaces agree.
 *   06 Reflection      → What changed, and what was learned.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSpace />

      {/* Side note · Strategic decisions
          A compact, type-led interlude pointing to the full /decisions
          artifact page. Renders as a warm-canvas strip with three
          editorial cards — never inlines the decisions themselves. */}
      <KeyDecisionsPreview />

      <EnterpriseSignals />
      <IdentityAccess />
      <OperationalResilience />

      {/* Side note · Design explorations
          A compact preview of the three direction-study artifacts kept
          on /explorations. Sits between the resilience surfaces and the
          governance dashboard so the reader carries the exploration
          context into the final movement. */}
      <DesignExplorationsPreview />

      <CentralizedGovernance />
      <Reflection />
    </>
  );
}
