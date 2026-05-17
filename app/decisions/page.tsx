import type { Metadata } from 'next';
import { KeyDecisions } from '@/components/decisions/decisions';
import { DeepDiveHero, DeepDiveFooter } from '@/components/ui/DeepDiveHero';

/**
 * /decisions — Strategic decisions deep dive.
 *
 * Five strategic choices that shaped the governance platform — written
 * as a public-facing chapter readers reach from the main case study.
 */

export const metadata: Metadata = {
  title: 'Strategic decisions · Design deep dive',
  description:
    'Five strategic choices that shaped the governance platform — what to model, where control lives, and what the dashboard leads with.',
};

export default function DecisionsPage() {
  return (
    <>
      <DeepDiveHero
        heading="Strategic decisions behind the platform."
        intro="Five choices that shaped how the governance platform behaves — what it models, where control lives, and what the admin opens it for in the morning."
        expandsOn="These decisions sit underneath every surface in the main case study. Each one names the friction that forced the call, what was traded, and what the platform can now do that it couldn't before."
        chips={[
          { href: '#centralised-governance-vs-ent-autonomy', label: 'Org-wide visibility' },
          { href: '#idp-source-of-truth', label: 'Identity as truth' },
          { href: '#operational-state-in-setup', label: 'State inside setup' },
          { href: '#governance-beyond-authentication', label: 'Beyond authentication' },
          { href: '#operational-intelligence-over-settings', label: 'Posture over settings' },
        ]}
      />

      <KeyDecisions />

      <DeepDiveFooter />
    </>
  );
}
