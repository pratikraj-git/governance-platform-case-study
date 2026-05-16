'use client';

/**
 * Teammate lifecycle — execution proof.
 *
 * Sibling companion to `TeammateLifecycleWorkflow.tsx`. The
 * lifecycle is governed as a state machine in the diagram; this
 * companion shows the surfaces that admins actually use to operate
 * the machine.
 *
 *   01 · Teammates view          — the lifecycle as it ships
 *   02 · Validity handling       — temporary / time-bounded access
 *   03 · Member vs guest invite  — distinct lifecycle entry paths
 *   04 · Invitation constraints  — domain-policy enforcement
 *
 * Six screens total. The two invitation error states are
 * deliberately rendered small (`detail` scale) so they read as
 * operational constraints, not as feature highlights.
 */

import { Figure } from '@/components/ui/Figure';
import { ScreenSection, ScreenGroup } from './_screens';

export function TeammateLifecycleScreens() {
  return (
    <ScreenSection
      id="teammate-lifecycle-screens"
      eyebrow="Screens · Lifecycle governance"
      title="The state machine, made operable."
      description="The lifecycle states named in the workflow are operated through four surfaces — the teammates view, validity handling for time-bounded access, distinct member and guest invite paths, and the domain-policy constraints that gate invitation."
    >
      {/* ── 01 · Teammates view — hero */}
      <ScreenGroup
        ordinal="01"
        label="Teammates view"
        intent="The lifecycle, surfaced. Every row carries the state it is in — managed, guest, temporary, inactive — and the action menu adapts to the row, not the page."
      >
        <Figure
          src="/assets/screens/teammates/teammates-view.png"
          alt="Teammates view — the lifecycle table with state indicators per row."
          width={1448}
          height={908}
          scale="hero"
          caption="The teammates view. Lifecycle state is a column, not a setting — so an admin can see who is who without opening a single drawer."
        />
      </ScreenGroup>

      {/* ── 02 · Validity handling */}
      <ScreenGroup
        ordinal="02"
        label="Validity handling"
        intent="Temporary access modelled as a property of the row, not a separate page. Expiry is visible, editable, and reads as part of the lifecycle — not as an afterthought."
      >
        <Figure
          src="/assets/screens/teammates/validity-handling.png"
          alt="Teammates validity handling — temporary access expiry surfaced per row."
          width={2938}
          height={908}
          scale="hero"
          caption="Validity is a first-class property of the row. Time-bounded access has a visible end date, not a calendar reminder elsewhere."
        />
      </ScreenGroup>

      {/* ── 03 · Invite paths */}
      <ScreenGroup
        ordinal="03"
        label="Distinct invite paths"
        intent="Members and guests enter the lifecycle through deliberately separate surfaces — same component shell, different defaults, different governance rules."
        pair
      >
        <Figure
          src="/assets/screens/teammates/add-members.png"
          alt="Add teammates — Members tab. The invite path for full members."
          width={1448}
          height={908}
          scale="support"
          caption="Member invite. Full-access path; defaults are deliberate."
        />
        <Figure
          src="/assets/screens/teammates/add-guests.png"
          alt="Add teammates — Guests tab. The invite path for time-bounded guest access."
          width={1448}
          height={908}
          scale="support"
          caption="Guest invite. Time-bounded by default; lifecycle constraints inherited."
        />
      </ScreenGroup>

      {/* ── 04 · Invitation constraints */}
      <ScreenGroup
        ordinal="04"
        label="Invitation constraints"
        intent="Domain policy enforced on the invite surface, named explicitly. The error message tells the admin which rule fired — not just that something failed."
        pair
      >
        <Figure
          src="/assets/screens/teammates/invite-error-outside-domain.png"
          alt="Teammate invitation error — outside-domain address blocked at the invite step."
          width={1448}
          height={908}
          scale="support"
          caption="Outside-domain block. The constraint is named, not generic."
        />
        <Figure
          src="/assets/screens/teammates/invite-error-non-whitelisted.png"
          alt="Teammate invitation error — non-whitelisted domain blocked at the invite step."
          width={1448}
          height={908}
          scale="support"
          caption="Non-whitelisted-domain block. Distinct from the outside-domain case, on purpose."
        />
      </ScreenGroup>
    </ScreenSection>
  );
}
