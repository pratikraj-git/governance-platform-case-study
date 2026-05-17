import type { Metadata } from 'next';
import { ScimRoleMappingExploration } from '@/components/explorations/ScimRoleMappingExploration';
import { GovernanceNavigationEvolution } from '@/components/explorations/GovernanceNavigationEvolution';
import { AdminDashboardDirections } from '@/components/explorations/AdminDashboardDirections';
import { AdminDashboardScreens } from '@/components/explorations/AdminDashboardScreens';
import { DeepDiveHero, DeepDiveFooter } from '@/components/ui/DeepDiveHero';

/**
 * /explorations — Design explorations deep dive.
 *
 * Wireframe-level direction studies showing how three surfaces — role
 * mapping, governance navigation, and the admin dashboard — earned
 * their final shape. Each study makes the rejected directions visible
 * alongside the shipped one so the call reads as a call.
 */

export const metadata: Metadata = {
  title: 'Design explorations · Design deep dive',
  description:
    'Wireframe-level direction studies behind three governance surfaces — role mapping, navigation, and the admin dashboard. The rejected directions kept alongside the shipped one.',
};

export default function ExplorationsPage() {
  return (
    <>
      <DeepDiveHero
        heading="How three surfaces earned their shape."
        intro="Wireframe-level direction studies for three governance surfaces — role mapping, navigation, and the admin dashboard. Each one tested a different first question the screen could answer."
        expandsOn="Only one direction shipped in each case. The rejected ones are kept on this page because a call only reads as a call when the alternatives are visible alongside it."
        chips={[
          { href: '#scim-role-mapping', label: 'Role mapping directions' },
          { href: '#governance-navigation', label: 'Navigation evolution' },
          { href: '#admin-dashboard', label: 'Dashboard directions' },
        ]}
      />

      <ScimRoleMappingExploration />

      <div className="border-t border-line-soft" aria-hidden />

      <GovernanceNavigationEvolution />

      <div className="border-t border-line-soft" aria-hidden />

      <AdminDashboardDirections />
      <AdminDashboardScreens />

      <DeepDiveFooter />
    </>
  );
}
