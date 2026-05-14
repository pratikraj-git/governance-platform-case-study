'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

interface TokenPortabilityDiagramProps {
  className?: string;
}

/**
 * TokenPortabilityDiagram — the v2.0 architectural innovation.
 *
 *   ┌─────────────────────────────────────────────┐
 *   │ SOURCE WORKSPACE · W₁                       │
 *   │ tkn_sk_3a8b…c9f · scim.platform.io/v2       │
 *   │ generated · referenced by 3 workspaces      │
 *   └─────────────────────────────────────────────┘
 *           │ push    │ push    │ push    │ fetch
 *           ▼         ▼         ▼         ▼
 *        ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
 *        │ W₂  │  │ W₃  │  │ W₄  │  │ W₅  │   ← read-only token
 *        └─────┘  └─────┘  └─────┘  └─────┘
 *
 *  One IdP application. One bearer token. N workspaces governed.
 *
 * No before/after split — the Problem Space already established the
 * fragmented baseline. This diagram is the architectural state itself.
 */
export function TokenPortabilityDiagram({ className }: TokenPortabilityDiagramProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className={cn(
        'relative w-full overflow-hidden rounded-md border border-line bg-surface p-6 sm:p-8 lg:p-10',
        className,
      )}
    >
      {/* Architectural grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-line-soft) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line-soft) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative">
        {/* Header */}
        <motion.header variants={revealUp} className="mb-8 flex items-center justify-between gap-4 border-b border-line-soft pb-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
              Token Portability · v2.0
            </span>
          </div>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4 sm:inline">
            Push · Fetch · Regenerate
          </span>
        </motion.header>

        {/* ── Source workspace ─────────────────────────────────────── */}
        <motion.div variants={revealUp} className="mx-auto max-w-[640px]">
          <div className="rounded-md border-2 border-ink-1 bg-surface p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  Source · W<span className="align-baseline">₁</span>
                </span>
                <span className="rounded-sm border border-line bg-surface-mute px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-ink-2">
                  Account Manager
                </span>
              </div>
              <span className="flex items-center gap-2 text-[11px] text-ink-3">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal-positive" />
                <span>generated</span>
              </span>
            </div>

            <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-[auto_1fr]">
              <Row label="bearer_token" value="tkn_sk_3a8b·9f4e·c9f2" mono />
              <Row label="base_url" value="scim.platform.io/v2/scim" mono />
              <Row label="referenced_by" value="3 workspaces (push) · 1 workspace (fetch)" />
            </dl>
          </div>
        </motion.div>

        {/* ── Connectors ─────────────────────────────────────────────── */}
        <Connectors />

        {/* ── Target workspaces row ──────────────────────────────────── */}
        <motion.ul
          variants={revealStagger}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {TARGETS.map((t) => (
            <motion.li
              key={t.id}
              variants={revealUp}
              className="rounded-md border border-line bg-surface p-4 transition-colors hover:border-line-strong"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  W<span className="align-baseline">{t.subscript}</span>
                </span>
                <span className="rounded-sm border border-line-soft bg-surface-mute px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-ink-3">
                  {t.mode}
                </span>
              </div>
              <p className="mt-3 font-mono text-[11px] text-ink-2 truncate">
                ↳ Token from W<span>₁</span>
              </p>
              <p className="mt-1 text-[11px] text-ink-4">read-only · per-tenant steps 2 + 3</p>
            </motion.li>
          ))}
        </motion.ul>

        {/* ── Caption ─────────────────────────────────────────────────── */}
        <motion.div
          variants={revealUp}
          className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line-soft pt-5"
        >
          <p className="max-w-[60ch] text-body-sm text-ink-2 text-pretty">
            One IdP application. One bearer token. N workspaces governed.
            Steps 2 (identification) and 3 (role mapping) remain per-workspace, so policy stays
            local where it should — and orchestration consolidates where it must.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
            <span className="text-ink-1">N → 1</span>{' '}application architecture
          </p>
        </motion.div>

        {/* ── Broken-state inset ─────────────────────────────────────── */}
        <motion.aside
          variants={revealUp}
          className="mt-6 flex items-start gap-4 rounded-md border border-dashed border-line-strong bg-surface-mute p-4"
        >
          <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-signal-critical ring-2 ring-signal-critical/30" />
          <div>
            <p className="text-eyebrow uppercase text-ink-3">Token regeneration</p>
            <p className="mt-1.5 text-body-sm text-ink-1 text-pretty">
              Regenerating a shared token is a blocking event: a modal lists every workspace
              referencing it, and on confirm, all fetching workspaces enter a broken state until
              the new token is re-pushed. The operational cost is made legible before it’s paid.
            </p>
          </div>
        </motion.aside>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Internals
 * ──────────────────────────────────────────────────────────────────── */

const TARGETS: Array<{ id: string; subscript: string; mode: 'push' | 'fetch' }> = [
  { id: 'w2', subscript: '₂', mode: 'push' },
  { id: 'w3', subscript: '₃', mode: 'push' },
  { id: 'w4', subscript: '₄', mode: 'push' },
  { id: 'w5', subscript: '₅', mode: 'fetch' },
];

function Row({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="contents">
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-4">{label}</dt>
      <dd className={cn('text-[12px] text-ink-1', mono && 'font-mono')}>{value}</dd>
    </div>
  );
}

function Connectors() {
  // 4 vertical connectors with directional labels, only renders on >= sm.
  return (
    <div className="mx-auto my-6 grid max-w-[640px] grid-cols-4 gap-3 sm:my-8 sm:gap-4">
      {(['push', 'push', 'push', 'fetch'] as const).map((dir, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            {dir}
          </span>
          <svg viewBox="0 0 12 56" width="12" height="56" className="mt-1 text-ink-3" role="presentation">
            <motion.line
              x1={6} y1={0} x2={6} y2={46}
              stroke="currentColor" strokeWidth={1}
              strokeDasharray={dir === 'fetch' ? '3 3' : undefined}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              viewport={IN_VIEW}
              transition={{ duration: 0.45, ease: ease.standard, delay: 0.05 * i }}
            />
            <path d="M2 46 L6 54 L10 46" fill="none" stroke="currentColor" strokeWidth={1} strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>
      ))}
    </div>
  );
}
