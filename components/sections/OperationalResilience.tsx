'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Figure } from '@/components/ui/Figure';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { ArtifactLink } from '@/components/ui/ArtifactLink';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

/**
 * 04 · Operational Resilience & Lifecycle
 *
 * The second design surface: governance as something that lives. Two
 * sub-movements — break-glass access (the failure mode) and teammate
 * lifecycle (the steady state) — each anchored by a real screenshot.
 */
export function OperationalResilience() {
  return (
    <SectionContainer id="resilience" width="wide">
      <SectionHeader
        eyebrow="04 · Resilience & Lifecycle"
        title="Once SSO worked, the harder questions started."
        description={
          <>
            What happens when an admin can’t get in? What happens to a teammate slowly, over
            years? Once identity was federated, the design problem moved — from how people get
            in to what happens around them once they’re there.
          </>
        }
      />

      {/* Break-Glass */}
      <div className="mt-20 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start flex flex-col gap-5"
        >
          <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
            A · Fallback access
          </motion.p>
          <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
            A quiet door — never advertised, always there.
          </motion.h3>
          <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
            The first constraint was simple: the platform has to stay administrable when the
            identity provider isn’t. That meant a fallback path that’s discoverable but not
            visible — and a small class of user that survives a sync gone wrong.
          </motion.p>
          <motion.p variants={revealUp} className="text-body text-ink-3 text-pretty">
            Every fallback sign-in notifies the other admins. Resilience without visibility is
            just risk in a different jacket.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={IN_VIEW}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <Figure
              src="/assets/screens/sso/domain-identified-bgu-emergency.png"
              alt="Domain identified — break-glass user (emergency access). The fallback for when the identity provider is unavailable."
              width={1194}
              height={859}
            />
            <Figure
              src="/assets/screens/sso/domain-identified-bgu-active-temp.png"
              alt="Domain identified — break-glass user (active temporary teammate). The fallback for in-flight temporary access."
              width={1295}
              height={859}
            />
          </div>
          <p className="mt-5 max-w-[var(--container-prose)] text-body-sm text-ink-3 text-pretty">
            Two narrow paths the system can take when the identity provider isn’t reachable — an emergency fallback for outages and a separate one for temporary access already in flight.
          </p>
        </motion.div>
      </div>

      <ArtifactLink
        href="/workflows#sso-break-glass-screens"
        eyebrow="Read more"
        label="See the recovery paths and remaining sign-in states"
        className="mx-auto"
      />

      {/* Teammate Lifecycle */}
      <div className="mt-28 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start flex flex-col gap-5"
        >
          <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
            B · Teammate lifecycle
          </motion.p>
          <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
            As more enterprises adopted the platform, managing teammates became a governance problem instead of an invitation flow.
          </motion.h3>
          <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
            The teammates page had quietly grown into the most-used screen in the admin area.
            The redesign treats every member as a lifecycle — managed, unmanaged, guest, or
            temporary — so the same actions read consistently across all four states.
          </motion.p>
          <motion.p variants={revealUp} className="text-body text-ink-3 text-pretty">
            When SCIM is on, certain rows become read-only. The source of truth is named at the
            row itself, not hidden behind a global toggle.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={IN_VIEW}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <Figure
            src="/assets/screens/teammates/teammates-view.png"
            alt="Teammates table — lifecycle state surfaced as a column on every row."
            width={1448}
            height={908}
            caption="Each row already knows what it is — managed, guest, temporary, inactive. Lifecycle becomes a column, not a setting hidden in a drawer."
          />
        </motion.div>
      </div>

      {/* Teammates — validity handling below the hero */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={IN_VIEW}
        transition={{ duration: 0.7 }}
        className="mt-12 flex justify-center lg:mt-16"
      >
        <Figure
          src="/assets/screens/teammates/validity-handling.png"
          alt="Teammates validity handling — temporary access modelled as a property of the row, with a visible expiry."
          width={2938}
          height={908}
          scale="hero"
          caption="Temporary access lives on the row itself. Permissions are time-aware; expiry is visible without opening anything."
        />
      </motion.div>

      {/* Teammates — guest invite (one representative variant) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={IN_VIEW}
        transition={{ duration: 0.7 }}
        className="mt-12 flex justify-center lg:mt-16"
      >
        <Figure
          src="/assets/screens/teammates/add-guests.png"
          alt="Add teammates — Guests tab. The invite path for time-bounded guest access, with SCIM-enabled restrictions in place."
          width={1448}
          height={908}
          scale="support"
          caption="Guest access stays time-bound by default. SCIM restrictions are surfaced on the invite screen — not enforced quietly after the fact."
        />
      </motion.div>

      <ArtifactLink
        href="/decisions#governance-beyond-authentication"
        eyebrow="Read more"
        label="See the thinking behind teammate lifecycle"
        className="mx-auto"
      />

      {/* Flow C — Operational resilience. Connects failure to recovery. */}
      <div className="mt-28 border-t border-line-soft pt-14">
        <FlowDiagram
          eyebrow="Flow C · How resilience is paid for"
          nodes={OPERATIONAL_RESILIENCE}
          insight="Resilience isn’t a feature, it’s a sequence the admin can follow without thinking — designed once, then quietly available whenever it’s needed."
        />
      </div>

      {/* Designer’s note */}
      <motion.aside
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={IN_VIEW}
        transition={{ duration: 0.7 }}
        className="mt-24 max-w-[var(--container-narrow)] border-l-2 border-ink-1 pl-6"
      >
        <p className="text-eyebrow uppercase text-ink-3">A note from the designer</p>
        <p className="mt-3 text-[1.0625rem] leading-[1.65] text-ink-1 text-pretty">
          Resilience and lifecycle are the parts of governance that admins live with longest,
          and that get the least design attention. The most useful decisions on this surface
          were structural — a row knows who owns it, an emergency user knows it’s exempt from
          sync, a temporary user knows when its session ends. The interface gets simpler because
          the data model finally agrees with itself.
        </p>
      </motion.aside>
    </SectionContainer>
  );
}

const OPERATIONAL_RESILIENCE = [
  { label: 'SSO unavailable',     sublabel: 'IdP outage, cert expiry, misconfig' },
  { label: 'Break-glass access',  sublabel: 'Discoverable fallback, sync-exempt' },
  { label: 'Temporary continuity', sublabel: 'Time-bounded, audit-notified' },
  { label: 'Lifecycle recovery',  sublabel: 'Return to IdP, close the door' },
];
