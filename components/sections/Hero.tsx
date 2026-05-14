'use client';

import { motion } from 'framer-motion';
import { GovernanceStack } from '@/components/ui/GovernanceStack';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

/**
 * Hero — section 00.
 *
 * Full-viewport, restrained dark surface. The right column is the
 * Governance Stack — the architectural mark of the case study, visible
 * in the first frame.
 *
 * No CTAs. No social proof badges. The case study itself is the destination.
 * Hierarchy is type, rhythm, and a single hairline meta-strip.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate -mx-0 flex min-h-[100svh] w-full flex-col bg-surface-ink text-ink-inverse"
    >
      {/* Faint architectural grid backdrop — establishes the systems language without dominating */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(250,250,247,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,250,247,0.08) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Top hairline rail — restates section ordinal, mirrors the rest of the site */}
      <div className="relative z-10 border-b border-[rgba(250,250,247,0.10)]">
        <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[rgba(250,250,247,0.55)]">
            00 · Enterprise Platform Design
          </p>
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-[rgba(250,250,247,0.40)] sm:block">
            Case study · 2026
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1">
        <div className="mx-auto grid h-full max-w-[var(--container-max)] grid-cols-1 gap-y-16 px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-12 lg:gap-x-16 lg:px-16 lg:py-28">
          {/* ── Left column: editorial narrative ───────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-[rgba(250,250,247,0.55)]">
              Governance Platform · Case Study
            </motion.p>

            <motion.h1
              variants={revealUp}
              className="mt-6 text-balance font-semibold leading-[1.04] tracking-[-0.035em] text-ink-inverse"
              style={{ fontSize: 'clamp(2.25rem, 5.4vw, 4.25rem)' }}
            >
              Designing a Unified Governance Layer for Enterprise-Scale Administration.
            </motion.h1>

            <motion.p
              variants={revealUp}
              className="mt-8 max-w-[58ch] text-pretty text-[1.0625rem] leading-[1.65] text-[rgba(250,250,247,0.78)]"
            >
              Enterprise platforms accumulate administrative surfaces faster than they consolidate them. Identity,
              provisioning, access policy, and operational visibility end up owned by different screens, drifting
              across workspaces, and stitched together by humans.
            </motion.p>

            <motion.p
              variants={revealUp}
              className="mt-5 max-w-[58ch] text-pretty text-[1.0625rem] leading-[1.65] text-[rgba(250,250,247,0.78)]"
            >
              This case study is the design of the missing layer — a single governance plane that orchestrates SSO,
              SCIM, RBAC, audit, and break-glass access across every workspace. One source of policy. One
              operational view. Built for the scale enterprises actually run at.
            </motion.p>

            {/* Editorial meta strip */}
            <motion.dl
              variants={revealUp}
              className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[rgba(250,250,247,0.16)] pt-8 sm:grid-cols-4"
            >
              <MetaCell label="Role"        value="Lead Product Designer" />
              <MetaCell label="Surfaces"    value="Admin · Identity · Access" />
              <MetaCell label="Discipline"  value="Systems · Governance · UX" />
              <MetaCell label="Scale"       value="Multi-workspace enterprise" />
            </motion.dl>

            {/* Scroll-down hint */}
            <motion.div
              variants={revealUp}
              className="mt-16 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[rgba(250,250,247,0.40)]"
            >
              <ScrollMark />
              <span>Scroll · Problem Space</span>
            </motion.div>
          </motion.div>

          {/* ── Right column: governance stack visualization ───────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={IN_VIEW}
            transition={{ duration: 0.85, ease: ease.standard, delay: 0.15 }}
            className="lg:col-span-5 self-center"
          >
            <GovernanceStack tone="dark" />

            <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-[rgba(250,250,247,0.45)]">
              The unified plane — administration to workspaces, in one architecture.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom hairline rail */}
      <div className="relative z-10 border-t border-[rgba(250,250,247,0.10)]">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-y-3 max-w-[var(--container-max)] px-6 py-4 text-[11px] uppercase tracking-[0.18em] text-[rgba(250,250,247,0.45)] sm:px-10 lg:px-16">
          <span>SSO · SCIM · RBAC · Audit Logs · Break-Glass Access</span>
          <span className="font-mono">v2.0 / orchestration</span>
        </div>
      </div>
    </section>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-eyebrow uppercase text-[rgba(250,250,247,0.40)]">{label}</dt>
      <dd className="mt-2 text-body-sm text-ink-inverse">{value}</dd>
    </div>
  );
}

function ScrollMark() {
  return (
    <span aria-hidden className="relative inline-flex h-5 w-3 items-start justify-center rounded-full border border-[rgba(250,250,247,0.40)]">
      <motion.span
        initial={{ y: 1, opacity: 0.4 }}
        animate={{ y: 6, opacity: 0 }}
        transition={{ duration: 1.6, ease: ease.standard, repeat: Infinity, repeatDelay: 0.4 }}
        className="mt-1 h-1 w-px bg-[rgba(250,250,247,0.85)]"
      />
    </span>
  );
}
