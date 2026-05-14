import { Hero } from '@/components/sections/Hero';
import { ProblemSpace } from '@/components/sections/ProblemSpace';
import { GovernanceArchitecture } from '@/components/sections/GovernanceArchitecture';
import { SSOOrchestration } from '@/components/sections/SSOOrchestration';
import { SCIMLifecycle } from '@/components/sections/SCIMLifecycle';
import { BreakGlassAccess } from '@/components/sections/BreakGlassAccess';
import { TeammateGovernance } from '@/components/sections/TeammateGovernance';
import { OperationalIntelligence } from '@/components/sections/OperationalIntelligence';
import { Outcomes } from '@/components/sections/Outcomes';

/**
 * Home — single editorial page composed of the 9 site-structure sections.
 *
 * Each section is a self-contained composition built from foundation
 * primitives. No detailed content is committed at this phase; the goal
 * is information architecture, visual system, and editorial rhythm.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSpace />
      <GovernanceArchitecture />
      <SSOOrchestration />
      <SCIMLifecycle />
      <BreakGlassAccess />
      <TeammateGovernance />
      <OperationalIntelligence />
      <Outcomes />
    </>
  );
}
