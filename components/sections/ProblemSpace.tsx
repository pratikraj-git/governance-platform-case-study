'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FragmentationGrid } from '@/components/ui/FragmentationGrid';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

/**
 * ProblemSpace — section 01.
 *
 * Three systems-level problems documented in the actual business case
 * and PRDs: IdP bloat, configuration overhead, and the absence of an
 * org-level governance plane. The framing is operational, not
 * "user pain" UX boilerplate.
 *
 * Layout: editorial split — narrative left, fragmentation visual right,
 * scale strip beneath.
 */
export function ProblemSpace() {
  return (
    <SectionContainer id="problem-space" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-20 lg:gap-28">
        {/* Header — editorial open */}
        <SectionHeader
          eyebrow="01 · Problem Space"
          title="Governance kept getting solved feature by feature."
          description="Each new identity, lifecycle, or access capability shipped as its own surface — configured per workspace, owned by no one in particular. Setting up an enterprise meant repeating the same five operations on every tenant, every time."
          descriptionWidth="narrow"
        />

        {/* Three-problem editorial grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-16"
        >
          {/* Left column — narrative */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {PROBLEMS.map((p) => (
              <motion.article key={p.index} variants={revealUp} className="border-t border-line pt-6">
                <header className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-ink-3">
                    {p.index}
                  </span>
                  <span className="text-eyebrow uppercase text-ink-3">
                    {p.kind}
                  </span>
                </header>
                <h3 className="mt-4 text-h3 text-ink-1 text-balance">
                  {p.title}
                </h3>
                <p className="mt-3 text-body text-ink-2 text-pretty">
                  {p.body}
                </p>
              </motion.article>
            ))}
          </div>

          {/* Right column — fragmentation visual */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={IN_VIEW}
              transition={{ duration: 0.7, ease: ease.standard, delay: 0.1 }}
              className="lg:sticky lg:top-24"
            >
              <FragmentationGrid count={9} />

              <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-ink-3">
                Per-workspace administration — the operational state before unification.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scale strip — real numbers, no fabrication */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-12 sm:grid-cols-4"
        >
          {SCALE.map((s) => (
            <motion.div key={s.label} variants={revealUp}>
              <p className="text-eyebrow uppercase text-ink-4">{s.label}</p>
              <p
                className="mt-3 text-ink-1 tabular-nums"
                style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1 }}
              >
                {s.value}
              </p>
              <p className="mt-3 text-body-sm text-ink-3 text-pretty">{s.note}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing observation */}
        <motion.blockquote
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={IN_VIEW}
          transition={{ duration: 0.7, ease: ease.standard }}
          className="max-w-[var(--container-narrow)] border-l-2 border-ink-1 pl-6 text-[1.0625rem] leading-[1.65] text-ink-1 text-pretty"
        >
          <p>
            The problem was never any one screen. It was that every screen treated governance
            as a per-tenant concern — and the cost of that decision compounded with every new
            workspace, every new feature, every new enterprise customer.
          </p>
          <footer className="mt-4 text-eyebrow uppercase text-ink-3">
            Internal review · Quarterly platform planning
          </footer>
        </motion.blockquote>
      </div>
    </SectionContainer>
  );
}

const PROBLEMS: Array<{ index: string; kind: string; title: string; body: string }> = [
  {
    index: '01',
    kind: 'Identity Provider Bloat',
    title: 'One SCIM application per workspace violates enterprise security policy.',
    body:
      'A customer running 15–20 workspaces had to register 15–20 separate SCIM apps in their identity provider, each with its own token and base URL. Enterprise IT teams enforce a single-application architecture for security review — the platform required them to break it on entry.',
  },
  {
    index: '02',
    kind: 'Configuration Overhead',
    title: 'Bearer tokens and base URLs copy-pasted per workspace, with no central view.',
    body:
      'Setting up identity for a new tenant meant repeating the same orchestration ritual: generate a token, register an app, configure attributes, map roles. Error-prone, untestable in aggregate, and impossible to audit from a single surface.',
  },
  {
    index: '03',
    kind: 'No Organizational Plane',
    title: 'User management, settings, and governance were siloed inside each workspace.',
    body:
      'Nothing correlated tenants. No org-wide view of who had access where. No way to template policy across workspaces. The platform behaved like a federation of independent products — exactly the shape enterprise administrators were asking us to unify.',
  },
];

const SCALE: Array<{ label: string; value: string; note: string }> = [
  {
    label: 'IdP applications',
    value: '15–20',
    note: 'Per enterprise — one SCIM app per workspace, multiplied by tenant count.',
  },
  {
    label: 'ARR impacted',
    value: '$9.5M+',
    note: 'Across 9 enterprise customers whose contract growth depended on org-level governance.',
  },
  {
    label: 'Confirmed asks',
    value: '10+',
    note: 'Enterprise logos — Life Sciences, Automotive, BFSI, Consulting — converging on the same pattern.',
  },
  {
    label: 'Industry posture',
    value: 'Non-negotiable',
    note: 'Org admin plane + multi-tenant SCIM described as table stakes by every reference enterprise SaaS.',
  },
];
