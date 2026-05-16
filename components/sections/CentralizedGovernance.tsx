'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Figure } from '@/components/ui/Figure';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { ArtifactLink } from '@/components/ui/ArtifactLink';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

/**
 * 05 · Toward Centralized Governance
 *
 * The narrative arc closes here. The individual surfaces — SSO, SCIM,
 * BGU, teammates — begin to behave like one platform. The screen that
 * communicates that is the governance dashboard.
 */
export function CentralizedGovernance() {
  return (
    <SectionContainer
      id="governance"
      width="wide"
      className="bg-surface-warm"
      topRule
      bottomRule
    >
      <SectionHeader
        eyebrow="05 · Centralized governance"
        title="What started as separate features became one operational surface."
        description={
          <>
            Each redesigned surface had quietly been built to feed the same model — workspaces,
            identities, roles, lifecycle. With those shared underneath, the dashboard wasn’t a
            new feature so much as a long-overdue consequence.
          </>
        }
      />

      <div className="mt-20 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12 lg:items-start">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-5"
        >
          <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
            The Monday-morning view
          </motion.p>
          <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
            One place to open. One place to scan. One place to act.
          </motion.h3>
          <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
            The governance dashboard is the screen an admin should be able to keep open all day
            and trust. It shows the workspaces under their care, the identity posture of each,
            anything that needs attention, and one clear next action.
          </motion.p>
          <motion.p variants={revealUp} className="text-body text-ink-3 text-pretty">
            It is, deliberately, not an analytics page. It is an operational page that happens
            to summarize.
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
            src="/assets/screens/dashboard/wireframe-insight-driven-flow.png"
            alt="Governance dashboard — the shipped direction. An insight-driven flow that leads with operational posture before any configuration."
            width={1536}
            height={1024}
            caption="The shipped direction. The dashboard stopped being reporting infrastructure and became operational governance infrastructure — posture first, attention items second, configuration deliberately one click away."
          />
        </motion.div>
      </div>

      {/* Compact comparison — the alternate direction that didn't ship */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={IN_VIEW}
        transition={{ duration: 0.7 }}
        className="mt-14 flex flex-col items-center gap-3 lg:mt-16"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          Comparison · The alternate direction
        </p>
        <Figure
          src="/assets/screens/dashboard/wireframe-section-workbench.png"
          alt="Governance dashboard — sectioned-workbench direction. A domain-grouped surface that organised by area of administration."
          width={1536}
          height={1024}
          scale="support"
          caption="A sectioned workbench, kept here for comparison. It organised by area of administration; the shipped direction organised by operational signal."
        />
      </motion.div>

      <ArtifactLink
        href="/explorations#admin-dashboard-screens"
        eyebrow="Exploration directions"
        label="View all three early dashboard directions"
        className="mx-auto"
      />

      {/* Flow D — Governance command surface. The five things this page makes available in one view. */}
      <div className="mt-24 border-t border-line-soft pt-14">
        <FlowDiagram
          eyebrow="Flow D · What the surface brings together"
          nodes={COMMAND_SURFACE}
          insight="The dashboard isn’t a new product. It’s the surface where the earlier surfaces finally know about each other — workspaces, identity, teammates, audit, all visible at the same time."
        />
      </div>

      <motion.blockquote
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={IN_VIEW}
        transition={{ duration: 0.7 }}
        className="mt-24 max-w-[var(--container-narrow)] border-l-2 border-ink-1 pl-6 text-[1.0625rem] leading-[1.65] text-ink-1 text-pretty"
      >
        “The dashboard isn’t a new product. It’s what the existing products look like when they
        finally know about each other.”
        <footer className="mt-3 text-eyebrow uppercase text-ink-3">A note from the designer</footer>
      </motion.blockquote>
    </SectionContainer>
  );
}

const COMMAND_SURFACE = [
  { label: 'Workspaces',     sublabel: 'The unit of governance' },
  { label: 'Identity',       sublabel: 'SSO posture, cert state' },
  { label: 'Teammates',      sublabel: 'Roles, ownership, lifecycle' },
  { label: 'Auditability',   sublabel: 'What changed, when, by whom' },
  { label: 'Operational visibility', sublabel: 'One view, ready on Monday' },
];
