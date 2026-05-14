'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Figure } from '@/components/ui/Figure';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
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
            src="/assets/dashboard/landing-page.jpg"
            alt="Governance dashboard — workspaces grouped by posture, attention items, and a quiet activity feed."
            width={6065}
            height={3922}
            aspect="16/10"
            objectPosition="center top"
            caption="Workspaces grouped by posture, attention items pinned to the top, and an activity feed that anchors the page in real operational signal."
          />
        </motion.div>
      </div>

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
