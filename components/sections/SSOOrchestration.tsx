import { SectionContainer } from '@/components/layout/SectionContainer';
import { EditorialSplitSection } from '@/components/layout/EditorialSplitSection';
import { StickyInsightRail } from '@/components/layout/StickyInsightRail';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WorkflowFramePlaceholder } from '@/components/ui/WorkflowFrame';

/**
 * SSOOrchestration — section 03.
 *
 * Module pattern (re-used across §03–§06):
 *   - Section header
 *   - Editorial split: workflow frame (visual) + sticky insight rail (text)
 *   - Final content reserved for the next phase.
 */
export function SSOOrchestration() {
  return (
    <SectionContainer id="sso-orchestration" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-14 lg:gap-20">
        <SectionHeader
          eyebrow="03 / SSO Orchestration"
          title="Self-serve identity, governed centrally."
          description="A working overview — SSO setup, certificate lifecycle, and rollout controls treated as a single orchestrated surface."
        />

        <EditorialSplitSection
          ratio="visual-heavy"
          visualSide="left"
          visual={
            <div className="space-y-6">
              <WorkflowFramePlaceholder
                label="sso-setup.flow"
                aspect="16/9"
                caption="Workflow placeholder — SSO setup walkthrough will replace this in the next phase."
              />
            </div>
          }
          text={
            <StickyInsightRail
              title="In this section"
              items={[
                { label: 'Surface',    value: 'SSO setup, provider config, certificate lifecycle.' },
                { label: 'Discipline', value: 'Identity orchestration · enterprise rollout.' },
                { label: 'Outcome',    value: 'Working draft — outcome statement reserved.' },
              ]}
            />
          }
        />
      </div>
    </SectionContainer>
  );
}
