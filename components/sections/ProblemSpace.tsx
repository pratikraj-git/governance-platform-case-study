'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

/**
 * 01 · The Growing Governance Problem
 *
 * Editorial, short, type-led. No diagrams — the problem is communicated
 * in paragraphs and one tight, named list of three patterns. Sets up the
 * customer-signals section that follows.
 */
export function ProblemSpace() {
  return (
    <SectionContainer id="problem" width="wide">
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="01 · The problem"
            title="The growing governance problem."
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <motion.p variants={revealUp} className="text-body-lg text-ink-2 text-pretty">
            Governance, in most SaaS platforms, doesn’t arrive as a feature. It accumulates —
            one admin setting at a time, owned by whichever team needed it most that quarter.
          </motion.p>

          <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
            By the time enterprise customers started arriving with thousands of users across
            multiple workspaces, the platform had grown a governance footprint without ever
            having been designed as one. Identity lived in one corner, provisioning in another,
            roles in a third, and audit somewhere beneath them all.
          </motion.p>

          <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
            From the outside, it looked like a configuration problem. From the inside, it was
            something larger: a coordination problem dressed as a UI problem.
          </motion.p>

          <motion.blockquote
            variants={revealUp}
            className="mt-4 border-l-2 border-ink-1 pl-6 text-[1.0625rem] leading-[1.6] text-ink-1 text-pretty"
          >
            “Most enterprise tools don’t have a governance experience — they have a settings
            page that grew up.”
            <footer className="mt-3 text-eyebrow uppercase text-ink-3">A note I made early on</footer>
          </motion.blockquote>
        </motion.div>
      </div>

      {/* Three patterns — the actual shape of the problem. */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={IN_VIEW}
        variants={revealStagger}
        transition={{ duration: 0.7, ease: ease.standard }}
        className="mt-24 grid grid-cols-1 gap-10 border-t border-line-soft pt-14 md:grid-cols-3 md:gap-x-12"
      >
        {PATTERNS.map((p) => (
          <motion.article key={p.index} variants={revealUp} className="flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
              {p.index}
            </p>
            <h3 className="text-h3 text-ink-1 text-balance">{p.title}</h3>
            <p className="text-body-sm text-ink-2 text-pretty">{p.body}</p>
          </motion.article>
        ))}
      </motion.div>

      {/* Flow A — Governance evolution. A short visual pause before Signals. */}
      <div className="mt-24 border-t border-line-soft pt-14">
        <FlowDiagram
          eyebrow="Flow A · The shape of the problem"
          nodes={GOVERNANCE_EVOLUTION}
          insight="Governance surfaces evolved independently before they shared a model — the friction at the right of this flow is what made the centralization on the left side of every later section possible."
        />
      </div>
    </SectionContainer>
  );
}

const GOVERNANCE_EVOLUTION = [
  { label: 'Disconnected admin tools',  sublabel: 'Per-team ownership, drift over time' },
  { label: 'Growing enterprise complexity', sublabel: 'Multi-workspace, federated identity' },
  { label: 'Operational friction',      sublabel: 'Repeated questions, no single view' },
  { label: 'Centralized governance',    sublabel: 'One model, one operational surface' },
];

const PATTERNS = [
  {
    index: '— 01',
    title: 'Owned by no one in particular.',
    body: 'Each governance surface — SSO, SCIM, roles, audit — had a different team behind it. Decisions made sense locally, then collided in the admin’s actual workflow.',
  },
  {
    index: '— 02',
    title: 'Designed for setup, not for living with it.',
    body: 'Most flows assumed a one-time configuration. The reality was the opposite: certificates expired, tokens rotated, teams reorganized, and the same screens were visited for years.',
  },
  {
    index: '— 03',
    title: 'No single operational view.',
    body: 'Admins couldn’t answer simple questions — who has access to what, across which workspace, configured by whom — without piecing it together across half a dozen places.',
  },
];
