import { SectionContainer } from '@/components/layout/SectionContainer';
import { EditorialSplitSection } from '@/components/layout/EditorialSplitSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArchitectureCard } from '@/components/ui/ArchitectureCard';

/**
 * ProblemSpace — section 01.
 *
 * Establishes the editorial split rhythm: text on the left, scaffolded
 * "fragmentation" cards on the right. Final framing copy is reserved
 * for the next phase.
 */
export function ProblemSpace() {
  return (
    <SectionContainer id="problem-space" width="wide" spacing="default" topRule>
      <EditorialSplitSection
        ratio="balanced"
        text={
          <SectionHeader
            eyebrow="01 / Problem Space"
            title="Governance gets harder, faster, as the platform scales."
            description="Identity, lifecycle, and operational visibility are owned by separate surfaces. The result is fragmented authority, slow recovery, and a widening operational tax on every administrator."
          />
        }
        visual={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {placeholders.map((p) => (
              <ArchitectureCard
                key={p.index}
                index={p.index}
                eyebrow={p.eyebrow}
                title={p.title}
                description={p.description}
                density="compact"
                variant="ghost"
              />
            ))}
          </div>
        }
      />
    </SectionContainer>
  );
}

const placeholders: Array<{ index: string; eyebrow: string; title: string; description: string }> = [
  {
    index: '01',
    eyebrow: 'Surface',
    title: 'Fragmented identity surfaces',
    description: 'Working draft — finalized in the next phase.',
  },
  {
    index: '02',
    eyebrow: 'Surface',
    title: 'Provisioning without portability',
    description: 'Working draft — finalized in the next phase.',
  },
  {
    index: '03',
    eyebrow: 'Surface',
    title: 'No path back when access breaks',
    description: 'Working draft — finalized in the next phase.',
  },
  {
    index: '04',
    eyebrow: 'Surface',
    title: 'Operational visibility lives elsewhere',
    description: 'Working draft — finalized in the next phase.',
  },
];
