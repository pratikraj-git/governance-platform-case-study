import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArchitectureCard } from '@/components/ui/ArchitectureCard';
import { MetricCard } from '@/components/ui/MetricCard';
import { WorkflowFramePlaceholder } from '@/components/ui/WorkflowFrame';

/**
 * OperationalIntelligence — section 07.
 *
 * The "command center" anchor: a wide visual frame for the interactive
 * Admin Dashboard prototype, a 5-up operational KPI rail beneath, and
 * six module cards establishing the dashboard's coverage. All values
 * intentionally em-dashed — real numbers arrive next phase.
 */
export function OperationalIntelligence() {
  return (
    <SectionContainer id="operational-intelligence" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-14 lg:gap-20">
        <SectionHeader
          eyebrow="07 / Operational Intelligence"
          title="A single command center for governance operations."
          description="A working overview — security health, workspace operations, content governance, AI readiness, deployments, and integrations rendered as a unified operational surface."
        />

        <WorkflowFramePlaceholder
          label="admin-dashboard.prototype"
          aspect="16/9"
          caption="Visual placeholder — interactive dashboard embedded or linked from the live prototype in the next phase."
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {kpis.map((k) => (
            <MetricCard key={k.label} label={k.label} value={k.value} trend={k.trend} density="compact" />
          ))}
        </div>

        <div>
          <p className="mb-6 text-eyebrow uppercase text-ink-3">Operational modules</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <ArchitectureCard
                key={m.title}
                index={m.index}
                eyebrow={m.eyebrow}
                title={m.title}
                description={m.description}
                density="compact"
                meta={<span>Drill-down deferred · next phase</span>}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

const kpis: Array<{ label: string; value: string; trend: string }> = [
  { label: 'Active Users',       value: '—', trend: 'Working metric · next phase' },
  { label: 'Workspaces',         value: '—', trend: 'Working metric · next phase' },
  { label: 'Deploy Success',     value: '—', trend: 'Working metric · next phase' },
  { label: 'AI Readiness',       value: '—', trend: 'Working metric · next phase' },
  { label: 'Integration Health', value: '—', trend: 'Working metric · next phase' },
];

const modules: Array<{ index: string; eyebrow: string; title: string; description: string }> = [
  { index: '01', eyebrow: 'Module', title: 'Security Health',     description: 'SSO, SCIM, MFA, API tokens, BGU posture.' },
  { index: '02', eyebrow: 'Module', title: 'Workspace Operations',description: 'Per-workspace state and orchestration.' },
  { index: '03', eyebrow: 'Module', title: 'Content Governance',  description: 'Lifecycle, approvals, localization.' },
  { index: '04', eyebrow: 'Module', title: 'AI Readiness',        description: 'Agent coverage, sandbox, ratings.' },
  { index: '05', eyebrow: 'Module', title: 'Deployment Pipeline', description: 'Success rate, environments, recovery.' },
  { index: '06', eyebrow: 'Module', title: 'Integration Health',  description: 'Connector posture and sync state.' },
];
