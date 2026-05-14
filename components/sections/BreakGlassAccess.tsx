import { SectionContainer } from '@/components/layout/SectionContainer';
import { EditorialSplitSection } from '@/components/layout/EditorialSplitSection';
import { StickyInsightRail } from '@/components/layout/StickyInsightRail';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WorkflowFramePlaceholder } from '@/components/ui/WorkflowFrame';

/**
 * BreakGlassAccess — section 05.
 *
 * Module pattern: visual on the right, sticky rail on the left.
 * Final framing of the fallback-access model reserved for the next
 * phase.
 */
export function BreakGlassAccess() {
  return (
    <SectionContainer id="break-glass-access" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-14 lg:gap-20">
        <SectionHeader
          eyebrow="05 / Break-Glass Access"
          title="A controlled path back when access breaks."
          description="A working overview — temporary fallback access modeled as a governed, auditable, time-bound recovery primitive."
        />

        <EditorialSplitSection
          ratio="visual-heavy"
          text={
            <StickyInsightRail
              title="In this section"
              items={[
                { label: 'Surface',    value: 'Break-glass setup, escalation, expiry.' },
                { label: 'Discipline', value: 'Operational resilience · audit-grade recovery.' },
                { label: 'Governance', value: 'Time-bound · attestable · monitored.' },
              ]}
            />
          }
          visual={
            <WorkflowFramePlaceholder
              label="break-glass-setup.flow"
              aspect="16/9"
              caption="Workflow placeholder — break-glass user setup."
            />
          }
        />
      </div>
    </SectionContainer>
  );
}
