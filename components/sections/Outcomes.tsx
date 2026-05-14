import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArchitectureCard } from '@/components/ui/ArchitectureCard';

/**
 * Outcomes — section 08 (closing).
 *
 * Three columns of outcome categories. Numbers and final framing
 * arrive in the next phase. Inverse variant on the central card
 * anchors the close of the case study.
 */
export function Outcomes() {
  return (
    <SectionContainer id="outcomes" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-14 lg:gap-20">
        <SectionHeader
          eyebrow="08 / Outcomes"
          title="What governance unification changes."
          description="A working overview — outcomes across operational resilience, administrative scale, and identity lifecycle. Specifics finalized in the next phase."
          descriptionWidth="narrow"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ArchitectureCard
            eyebrow="Outcome"
            title="Operational resilience"
            description="Working outcome — finalized in the next phase."
            meta={<span>Resilience · recovery · audit-grade</span>}
          />
          <ArchitectureCard
            eyebrow="Outcome"
            title="Administrative scale"
            description="Working outcome — finalized in the next phase."
            variant="inverse"
            meta={<span>Workspaces · roles · orchestration</span>}
          />
          <ArchitectureCard
            eyebrow="Outcome"
            title="Lifecycle clarity"
            description="Working outcome — finalized in the next phase."
            meta={<span>Identity · provisioning · membership</span>}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
