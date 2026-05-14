'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CommandCenterMock } from '@/components/ui/CommandCenterMock';
import { PrincipleRow, type Principle } from '@/components/ui/PrincipleRow';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

/**
 * OperationalIntelligence — section 07. The narrative climax.
 *
 * The five module sections (Architecture, SSO, SCIM, Break-Glass, Teammates)
 * ladder up to this one: a single, org-level operational view that makes
 * the governance layer legible at a glance.
 *
 * Four movements:
 *  A. The thesis — what an operational view of governance is.
 *  B. The Command Center mock — the centerpiece artifact.
 *  C. The composition — how the prior modules surface here.
 *  D. The platform commitments — five principles closing the arc.
 */
export function OperationalIntelligence() {
  return (
    <SectionContainer id="operational-intelligence" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-20 lg:gap-28">
        {/* ── Section header ──────────────────────────────────────── */}
        <SectionHeader
          eyebrow="07 · Operational Intelligence"
          title="An evolving governance command center — every module, one operational view."
          description="The case study converges here. SSO health, SCIM coverage, BGU posture, teammate lifecycle, and audit flow are surfaces of the same governance object. The command center is the design surface that lets a single operator hold the whole picture — healthy by default, named by exception."
          descriptionWidth="narrow"
        />

        {/* ── Movement A: The thesis ──────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-16"
        >
          <motion.div variants={revealUp} className="lg:col-span-5">
            <p className="text-eyebrow uppercase text-ink-3">A · The thesis</p>
            <h3 className="mt-4 text-h2 text-ink-1 text-balance">
              Operational intelligence is what governance looks like from above.
            </h3>
            <p className="mt-5 max-w-[52ch] text-body text-ink-2 text-pretty">
              Underneath, every module is its own surface. From above, they share a state
              vocabulary: healthy, attention, critical, drift, expiry. The command center is
              the place that vocabulary gets resolved into a single operational sentence —
              one that an enterprise admin can read in a glance and trust enough to act on.
            </p>
          </motion.div>

          <motion.dl
            variants={revealUp}
            className="lg:col-span-7 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10"
          >
            {THESES.map((t) => (
              <div key={t.label} className="space-y-2 border-t border-line-soft pt-5">
                <dt className="flex items-center gap-3 text-eyebrow uppercase text-ink-3">
                  <span className="font-mono text-[10px] text-ink-4">{t.index}</span>
                  <span>{t.label}</span>
                </dt>
                <dd className="text-body-sm text-ink-1 text-pretty">{t.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Movement B: The Command Center mock ─────────────────── */}
        <div className="flex flex-col gap-8">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              B · The Command Center
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              An org-level surface — every workspace, every module, one frame.
            </motion.h3>
          </motion.header>

          <CommandCenterMock />
        </div>

        {/* ── Movement C: The composition ─────────────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              C · The composition
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              How the prior modules surface here.
            </motion.h3>
            <motion.p variants={revealUp} className="max-w-[58ch] text-body text-ink-2 text-pretty">
              The command center isn&rsquo;t a separate product — it&rsquo;s the natural
              consequence of designing every module against a shared state vocabulary. Each
              surface contributes the same shape of signal, so the operational view
              composes without adapters.
            </motion.p>
          </motion.header>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5"
          >
            {COMPOSITION.map((c) => (
              <motion.article
                key={c.module}
                variants={revealUp}
                className="flex h-full flex-col gap-4 rounded-md border border-line bg-surface p-5 transition-colors hover:border-line-strong md:p-6"
              >
                <header className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
                    {c.index}
                  </span>
                  <span className="text-eyebrow uppercase text-ink-3">{c.module}</span>
                </header>
                <h4 className="text-h3 text-ink-1 text-balance">{c.signal}</h4>
                <p className="text-body-sm text-ink-2 text-pretty">{c.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* ── Movement D: The platform commitments ─────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              D · Platform commitments
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              Five commitments the command center is engineered to uphold.
            </motion.h3>
          </motion.header>

          <PrincipleRow principles={COMMITMENTS} />
        </div>

        {/* ── Closing observation ─────────────────────────────────── */}
        <motion.blockquote
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={IN_VIEW}
          transition={{ duration: 0.7, ease: ease.standard }}
          className="max-w-[var(--container-narrow)] border-l-2 border-ink-1 pl-6 text-[1.0625rem] leading-[1.65] text-ink-1 text-pretty"
        >
          <p>
            A platform is mature not when every administrative action is possible, but when
            the operational state of the system is legible to a single person on a single
            page. The command center is the design surface where that legibility gets
            committed to — and the architecture is what makes the commitment honest.
          </p>
          <footer className="mt-4 text-eyebrow uppercase text-ink-3">
            Platform maturity · Principle
          </footer>
        </motion.blockquote>
      </div>
    </SectionContainer>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Content
 * ──────────────────────────────────────────────────────────────────── */

const THESES: Array<{ index: string; label: string; value: string }> = [
  {
    index: '01',
    label: 'Shared state vocabulary',
    value: 'Every module emits the same shape of state — healthy, attention, critical — so signals compose.',
  },
  {
    index: '02',
    label: 'Healthy by default',
    value: 'A workspace registers in the view by exception, not by enumeration. Steady-state is quiet.',
  },
  {
    index: '03',
    label: 'Org-scoped authority',
    value: 'Delegated administration with org-level context. One operator can hold many tenants without losing local nuance.',
  },
  {
    index: '04',
    label: 'Audit as a first-class signal',
    value: 'Lifecycle events stream back into the same view that surfaces drift — provenance and posture in one place.',
  },
];

const COMPOSITION: Array<{ index: string; module: string; signal: string; body: string }> = [
  {
    index: '03',
    module: 'SSO',
    signal: 'Cert posture · expiring count',
    body: 'Per-workspace cert state rolls into a single org-level KPI; expiring certs become a named row.',
  },
  {
    index: '04',
    module: 'SCIM',
    signal: 'Coverage · stalled syncs',
    body: 'Workspaces with active SCIM, manual workspaces, and stalled payloads each surface as distinct rows in the workspace health table.',
  },
  {
    index: '05',
    module: 'Break-Glass',
    signal: 'BGU ceiling · login events',
    body: 'Every BGU login emits a signal-level event. The org strip shows ceiling utilization without ever quoting a user.',
  },
  {
    index: '06',
    module: 'Teammates',
    signal: 'Lifecycle deltas',
    body: 'Provisioning, deprovisioning, temp expiry, and ownership transfer all land in the same activity stream.',
  },
  {
    index: '02',
    module: 'Audit',
    signal: 'Normalized events',
    body: 'A unified audit stream — same shape across modules — feeding both the activity panel and the export path.',
  },
];

const COMMITMENTS: Principle[] = [
  {
    index: '01',
    title: 'Single operational view',
    description: 'One org-level surface composes every module — no per-workspace context switching for state.',
  },
  {
    index: '02',
    title: 'Quiet by default',
    description: 'Steady-state is silent. The view earns the admin&rsquo;s attention only when something demands it.',
  },
  {
    index: '03',
    title: 'Delegated authority',
    description: 'Org administration scoped — multi-org users switch context without escalating privilege.',
  },
  {
    index: '04',
    title: 'Composable signals',
    description: 'Every module emits the same shape of state. New modules slot in without rewriting the view.',
  },
  {
    index: '05',
    title: 'Audit-first',
    description: 'Every administrative event is a normalized record. Provenance is always one query away.',
  },
];
