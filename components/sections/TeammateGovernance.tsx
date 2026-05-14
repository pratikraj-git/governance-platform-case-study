'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TeammatesTable } from '@/components/ui/TeammatesTable';
import { AuthorityHandoffDiagram } from '@/components/ui/AuthorityHandoffDiagram';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

/**
 * TeammateGovernance — section 06.
 *
 * Three movements:
 *  A. The steady-state Teammates surface — five canonical user types
 *     in one view, with the authority owner made explicit.
 *  B. The authority hand-off — what stays editable when SCIM turns on,
 *     and what shifts back when it doesn't.
 *  C. Ownership transfer — the offboarding handoff that survives both
 *     states.
 *
 * The point is to position governance as an ongoing operational
 * lifecycle, not a one-time onboarding event. The visuals are tables
 * and matrices; the prose stays out of the way.
 */
export function TeammateGovernance() {
  return (
    <SectionContainer id="teammate-governance" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-20 lg:gap-28">
        {/* ── Section header ──────────────────────────────────────── */}
        <SectionHeader
          eyebrow="06 · Teammate Governance"
          title="Governance is an ongoing operational lifecycle — not a one-time setup."
          description="Identity setup ends. Membership management does not. Teammate governance is the steady-state surface where authority between the IdP and the admin becomes legible."
          descriptionWidth="narrow"
        />

        {/* ── Movement A: The steady-state surface ──────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              A · The steady-state surface
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              Five canonical states. One table. One authority column that tells the truth.
            </motion.h3>
            <motion.p variants={revealUp} className="max-w-[58ch] text-body text-ink-2 text-pretty">
              The Teammates page distinguishes five member states — permanent, manually managed,
              deactivated, temporary, expired. A single Source column makes the authority owner
              explicit, so admins never wonder where a change should be made.
            </motion.p>
          </motion.header>

          <TeammatesTable />
        </div>

        {/* ── Movement B: Authority hand-off ────────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              B · Authority hand-off
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              When SCIM is on, the dashboard surfaces — but never forks — IdP authority.
            </motion.h3>
            <motion.p variants={revealUp} className="max-w-[58ch] text-body text-ink-2 text-pretty">
              Activating SCIM closes specific administrative paths. Manual invites disable. Role changes
              disable. Lifecycle moves to the sync. The point isn't to remove admin capability — it's
              to keep one source of truth at a time.
            </motion.p>
          </motion.header>

          <AuthorityHandoffDiagram />
        </div>

        {/* ── Movement C: Ownership transfer ───────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="grid grid-cols-1 gap-12 border-t border-line pt-12 lg:grid-cols-12 lg:gap-x-16"
        >
          <motion.div variants={revealUp} className="lg:col-span-5">
            <p className="text-eyebrow uppercase text-ink-3">C · Ownership transfer</p>
            <h3 className="mt-4 text-h2 text-ink-1 text-balance">
              Offboarding is a governance event — content, not just users.
            </h3>
            <p className="mt-5 max-w-[52ch] text-body text-ink-2 text-pretty">
              When a teammate leaves, their access disappears — their work doesn't. The platform
              requires an explicit ownership target before delete completes. User authority may
              shift to the IdP; ownership transfer stays administrative.
            </p>
          </motion.div>

          <motion.dl variants={revealUp} className="lg:col-span-7 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10">
            {OFFBOARDING.map((row) => (
              <div key={row.label} className="space-y-2 border-t border-line-soft pt-5">
                <dt className="flex items-center gap-3 text-eyebrow uppercase text-ink-3">
                  <span className="font-mono text-[10px] text-ink-4">{row.step}</span>
                  <span>{row.label}</span>
                </dt>
                <dd className="text-body-sm text-ink-1 text-pretty">{row.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Closing observation ─────────────────────────────────── */}
        <motion.blockquote
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={IN_VIEW}
          transition={{ duration: 0.7, ease: ease.standard }}
          className="max-w-[var(--container-narrow)] border-l-2 border-ink-1 pl-6 text-[1.0625rem] leading-[1.65] text-ink-1 text-pretty"
        >
          <p>
            Membership is where governance stops being a setup screen. The right design closes
            the doors the IdP should be holding — and keeps the ones the admin alone can.
          </p>
          <footer className="mt-4 text-eyebrow uppercase text-ink-3">
            Membership · A living surface, not a setup screen
          </footer>
        </motion.blockquote>
      </div>
    </SectionContainer>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Content
 * ──────────────────────────────────────────────────────────────────── */

const OFFBOARDING: Array<{ step: string; label: string; value: string }> = [
  {
    step: '01',
    label: 'Trigger',
    value: 'A delete on an active permanent user, regardless of whether the user is SCIM-managed.',
  },
  {
    step: '02',
    label: 'Required choice',
    value: 'Admin selects an ownership target — content, dashboards, saved views, and configurations move to that user.',
  },
  {
    step: '03',
    label: 'Audit emission',
    value: 'A transfer record is written to the audit stream — actor, source, target, resource counts.',
  },
  {
    step: '04',
    label: 'Reversibility',
    value: 'Ownership transfer is logged but not auto-undone. Re-inviting the original user does not restore prior ownership.',
  },
];
