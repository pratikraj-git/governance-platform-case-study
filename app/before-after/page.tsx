import type { Metadata } from 'next';
import {
  FragmentedToCentralisedGovernance,
  ManualToOrchestratedProvisioning,
  SettingsToOperationalGovernance,
} from '@/components/before-after/comparisons';
import { DeepDiveHero, DeepDiveFooter } from '@/components/ui/DeepDiveHero';

/**
 * /before-after — Governance evolution deep dive.
 *
 * Three before / after comparisons that name what changed at the
 * platform level — not the screen level — across identity, provisioning
 * and the admin home.
 */

export const metadata: Metadata = {
  title: 'Governance evolution · Design deep dive',
  description:
    'Three before / after comparisons of what changed at the platform level — fragmented governance to organisation-wide visibility, manual provisioning to orchestrated lifecycle, settings navigation to operational posture.',
};

export default function BeforeAfterPage() {
  return (
    <>
      <DeepDiveHero
        heading="How governance evolved on the platform."
        intro="Three comparisons that name what changed at the platform level once identity was federated, provisioning was orchestrated, and the admin home stopped being a settings page."
        expandsOn="Each one is a short before / after read — the shape of the problem on one side, the shape of the platform's response on the other. They sit underneath the surfaces shown in the main case study."
        chips={[
          { href: '#fragmented-to-centralised', label: 'Fragmented → Organisation-wide' },
          { href: '#manual-to-orchestrated', label: 'Manual → Orchestrated provisioning' },
          { href: '#settings-to-operational', label: 'Settings → Operational posture' },
        ]}
      />

      <FragmentedToCentralisedGovernance />

      <div className="border-t border-line-soft" aria-hidden />

      <ManualToOrchestratedProvisioning />

      <div className="border-t border-line-soft" aria-hidden />

      <SettingsToOperationalGovernance />

      <DeepDiveFooter />
    </>
  );
}
