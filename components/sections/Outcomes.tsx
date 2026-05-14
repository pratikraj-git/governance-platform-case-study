'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EvolutionLadder } from '@/components/ui/EvolutionLadder';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

/**
 * Outcomes — section 08.
 *
 * The architectural close — no marketing language, no fabricated metrics.
 * Three movements:
 *  A. A short reflective paragraph that names what changed.
 *  B. The Evolution Ladder — five rungs of before → after.
 *  C. A short note on what scales next.
 *
 * The case study's destination is the architecture, not a victory lap.
 */
export function Outcomes() {
  return (
    <SectionContainer id="outcomes" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-20 lg:gap-28">
        {/* ── Section header ──────────────────────────────────────── */}
        <SectionHeader
          eyebrow="08 · Outcomes"
          title="The platform now holds — and the architecture is what holds it."
          description="The work was not a screen redesign; it was the construction of a layer that hadn&rsquo;t existed. The outcomes here are structural: where five fragmented surfaces stood, one composable governance layer now sits — and every later module gets to inherit it."
          descriptionWidth="narrow"
        />

        {/* ── Movement A: Reflection ───────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-16"
        >
          <motion.div variants={revealUp} className="lg:col-span-5">
            <p className="text-eyebrow uppercase text-ink-3">A · Reflection</p>
            <h3 className="mt-4 text-h2 text-ink-1 text-balance">
              The shape changed before the surface did.
            </h3>
          </motion.div>

          <motion.div variants={revealUp} className="lg:col-span-7 flex flex-col gap-5">
            <p className="text-body text-ink-2 text-pretty">
              The redesign succeeded when there was no longer a screen that owned governance.
              SSO, SCIM, RBAC, audit, and break-glass became facets of one architectural
              object — authored once, projected to many — and the per-workspace surfaces
              became consumers, not authors.
            </p>
            <p className="text-body text-ink-2 text-pretty">
              That shift made the rest of the platform inherit governance properties for free.
              Subsequent modules — content templates, parent-child inheritance, approval
              workflows, analytics-only access — now compose against a plane that already
              knows how to delegate authority, project policy, and emit audit. The work
              compounds, not duplicates.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Movement B: The Evolution Ladder ─────────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              B · The evolution
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              Five rungs of architectural change — what the platform was, what the platform is.
            </motion.h3>
          </motion.header>

          <EvolutionLadder />
        </div>

        {/* ── Movement C: What scales next ─────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="grid grid-cols-1 gap-12 border-t border-line pt-12 lg:grid-cols-12 lg:gap-x-16"
        >
          <motion.div variants={revealUp} className="lg:col-span-5">
            <p className="text-eyebrow uppercase text-ink-3">C · What scales next</p>
            <h3 className="mt-4 text-h2 text-ink-1 text-balance">
              The layer absorbs new modules without re-architecting itself.
            </h3>
            <p className="mt-5 max-w-[52ch] text-body text-ink-2 text-pretty">
              Future surfaces — content governance, parent-child inheritance, approval
              workflows, analytics-only access — are designed to slot into the existing
              shape: an org-level authority, a per-workspace projection, a normalized
              audit trail. Adding modules costs less than adding workspaces used to.
            </p>
          </motion.div>

          <motion.dl variants={revealUp} className="lg:col-span-7 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10">
            {NEXT_HORIZON.map((row) => (
              <div key={row.label} className="space-y-2 border-t border-line-soft pt-5">
                <dt className="flex items-center gap-3 text-eyebrow uppercase text-ink-3">
                  <span className="font-mono text-[10px] text-ink-4">{row.index}</span>
                  <span>{row.label}</span>
                </dt>
                <dd className="text-body-sm text-ink-1 text-pretty">{row.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Closing paragraph ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={IN_VIEW}
          transition={{ duration: 0.7, ease: ease.standard }}
          className="border-t border-line pt-12"
        >
          <p className="text-eyebrow uppercase text-ink-3">Closing</p>
          <p
            className="mt-4 max-w-[var(--container-prose)] text-ink-1 text-pretty"
            style={{
              fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)',
              lineHeight: 1.45,
              letterSpacing: '-0.01em',
            }}
          >
            The case study ends here — but the platform is what continues. Governance is the
            kind of infrastructure that only feels obvious in retrospect: invisible until
            absent, decisive in its absence, and slowly compounding when it&rsquo;s in
            place. That&rsquo;s the work this design is for.
          </p>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            <span>End of case study</span>
            <span className="text-ink-4">·</span>
            <span>2026 · Enterprise Platform Design</span>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Content
 * ──────────────────────────────────────────────────────────────────── */

const NEXT_HORIZON: Array<{ index: string; label: string; value: string }> = [
  {
    index: '01',
    label: 'Content governance',
    value: 'Org-level templates, branding, and inheritable configurations — projected to workspaces under the same authority model.',
  },
  {
    index: '02',
    label: 'Parent–child content',
    value: 'Cross-workspace content inheritance with approval workflows and audit trails, anchored in the existing governance plane.',
  },
  {
    index: '03',
    label: 'Centralized role mapping',
    value: 'Org-level role mapping that applies across workspaces without per-tenant rule duplication.',
  },
  {
    index: '04',
    label: 'Analytics-only access',
    value: 'Read-scoped tiers — executives and auditors gain visibility without dashboard mutation rights.',
  },
];
