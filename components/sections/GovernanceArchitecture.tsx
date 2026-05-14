import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GovernanceDiagram } from '@/components/ui/GovernanceDiagram';

/**
 * GovernanceArchitecture — section 02.
 *
 * The architectural anchor of the case study: a single full-bleed
 * diagram with a quiet caption row beneath. Sets the systems-thinking
 * tone for everything that follows.
 */
export function GovernanceArchitecture() {
  return (
    <SectionContainer id="governance-architecture" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-12 lg:gap-16">
        <SectionHeader
          eyebrow="02 / Governance Architecture"
          title="A unified governance layer."
          description="Identity, lifecycle, access, and audit converge into one policy plane — authoritative across every workspace and every administrative surface."
          descriptionWidth="narrow"
        />

        <GovernanceDiagram />

        <ul className="grid grid-cols-2 gap-x-10 gap-y-4 border-t border-line-soft pt-6 md:grid-cols-4">
          {anchors.map((a) => (
            <li key={a.label} className="space-y-1">
              <p className="text-eyebrow uppercase text-ink-4">{a.kind}</p>
              <p className="text-body-sm text-ink-1">{a.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  );
}

const anchors: Array<{ kind: string; label: string }> = [
  { kind: 'Plane',   label: 'Centralized policy authority' },
  { kind: 'Surface', label: 'Identity & lifecycle modules' },
  { kind: 'Surface', label: 'Audit + activity telemetry' },
  { kind: 'Reach',   label: 'Multi-workspace orchestration' },
];
