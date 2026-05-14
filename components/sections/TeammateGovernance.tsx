import { SectionContainer } from '@/components/layout/SectionContainer';
import { EditorialSplitSection } from '@/components/layout/EditorialSplitSection';
import { StickyInsightRail } from '@/components/layout/StickyInsightRail';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WorkflowFramePlaceholder } from '@/components/ui/WorkflowFrame';

/**
 * TeammateGovernance — section 06.
 *
 * Three workflow frames placeholdered to set up the rhythm for the
 * SCIM-enabled / SCIM-disabled / member-handling flows. Content
 * deferred to the next phase.
 */
export function TeammateGovernance() {
  return (
    <SectionContainer id="teammate-governance" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-14 lg:gap-20">
        <SectionHeader
          eyebrow="06 / Teammate Governance"
          title="Account lifecycle under two regimes."
          description="A working overview — adding, removing, and reassigning teammates under both SCIM-enabled and SCIM-disabled identity regimes."
        />

        <EditorialSplitSection
          ratio="visual-heavy"
          visualSide="left"
          visual={
            <div className="space-y-6">
              <WorkflowFramePlaceholder
                label="teammates · scim-enabled.flow"
                aspect="16/9"
                caption="Workflow placeholder — adding a teammate when SCIM is enabled."
              />
              <WorkflowFramePlaceholder
                label="teammates · scim-disabled.flow"
                aspect="16/9"
                caption="Workflow placeholder — adding a teammate when SCIM is disabled."
              />
              <WorkflowFramePlaceholder
                label="teammates · member-handling.flow"
                aspect="16/9"
                caption="Workflow placeholder — handling existing members across regimes."
              />
            </div>
          }
          text={
            <StickyInsightRail
              title="In this section"
              items={[
                { label: 'Surface',    value: 'Add, remove, reassign — across two regimes.' },
                { label: 'Discipline', value: 'Lifecycle governance · workspace orchestration.' },
                { label: 'Edge',       value: 'Existing-member handling — covered next phase.' },
              ]}
            />
          }
        />
      </div>
    </SectionContainer>
  );
}
