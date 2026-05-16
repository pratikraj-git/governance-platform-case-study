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
        title="Designing for the day SSO doesn’t work — and the years after it does."
        description={
          <>
            Once identity was federated, the design problem moved. It became less about how
            people get in, and more about what happens when they can’t — and what happens to
            them, slowly, over time.
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
            A · Break-glass access
          </motion.p>
          <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
            A quiet door, never marketed — but always there.
          </motion.h3>
          <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
            The first design constraint was simple: the platform must remain administrable when
            the identity provider isn’t. That meant a fallback path that is discoverable, not
            visible — and a class of user that survives a SCIM sync gone wrong.
          </motion.p>
          <motion.p variants={revealUp} className="text-body text-ink-3 text-pretty">
            Every break-glass login notifies the other admins. Resilience without observability
            is just risk in a different jacket.
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
            Identity routing adapted authentication paths based on enterprise governance state — an emergency fallback when the IdP was unreachable, a narrower one for in-flight temporary access.
          </p>
        </motion.div>
      </div>

      <ArtifactLink
        href="/workflows#sso-break-glass-screens"
        eyebrow="Architecture artifact"
        label="View governed recovery paths + remaining auth states"
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
            One table, four kinds of teammate, one set of rules.
          </motion.h3>
          <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
            The teammates surface had quietly grown into the most-used screen in the platform’s
            admin area. The redesign treats every member as a lifecycle object — managed,
            unmanaged, guest, or temporary — and lets the same actions read consistently across
            the four states.
          </motion.p>
          <motion.p variants={revealUp} className="text-body text-ink-3 text-pretty">
            When SCIM is on, certain rows become read-only; the source of truth is named at the
            row, not buried in a global mode switch.
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
            caption="Each row carries the state it is in — managed, guest, temporary, inactive. Lifecycle becomes operational state, not a setting buried in a drawer."
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
          alt="Teammates validity handling — temporary access modelled as a first-class property of the row, with a visible expiry."
          width={2938}
          height={908}
          scale="hero"
          caption="Temporary access modelled as a property of the row, not a separate page. Permissions become time-aware; membership becomes operational state."
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
          caption="Guest invite. Time-bounded by default, with SCIM-enabled restrictions held on the invite surface — not enforced silently after the fact."
        />
      </motion.div>

      <ArtifactLink
        href="/decisions#governance-beyond-authentication"
        eyebrow="Strategic decision"
        label="View governance beyond authentication"
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
