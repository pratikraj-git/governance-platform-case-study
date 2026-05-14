import { SectionContainer } from '@/components/layout/SectionContainer';
import { EditorialSplitSection } from '@/components/layout/EditorialSplitSection';
import { StickyInsightRail } from '@/components/layout/StickyInsightRail';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WorkflowFramePlaceholder } from '@/components/ui/WorkflowFrame';

/**
 * SCIMLifecycle — section 04.
 *
 * Same module pattern as §03. Two placeholder workflow frames to set up
 * the rhythm for SCIM's two key surfaces (setup + token flow). Detail
 * deferred to the next phase.
 */
export function SCIMLifecycle() {
  return (
    <SectionContainer id="scim-lifecycle" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-14 lg:gap-20">
        <SectionHeader
          eyebrow="04 / SCIM Lifecycle"
          title="Provisioning as a portable, multi-tenant policy."
          description="A working overview — SCIM v2.0 setup, token portability, role mapping, and edge-case handling treated as one lifecycle."
        />

        <EditorialSplitSection
          ratio="visual-heavy"
          visual={
            <div className="space-y-6">
              <WorkflowFramePlaceholder
                label="scim-setup.flow"
                aspect="16/9"
                caption="Workflow placeholder — SCIM setup & attribute mapping."
              />
              <WorkflowFramePlaceholder
                label="scim-token.flow"
                aspect="16/9"
                caption="Workflow placeholder — token generate · fetch · push."
              />
            </div>
          }
          text={
            <StickyInsightRail
              title="In this section"
              items={[
                { label: 'Surface',    value: 'SCIM v2.0 setup, token portability, role mapping.' },
                { label: 'Discipline', value: 'Lifecycle management · multi-tenant policy.' },
                { label: 'Edge',       value: 'Error scenarios surfaced inline — covered next phase.' },
              ]}
            />
          }
        />
      </div>
    </SectionContainer>
  );
}
