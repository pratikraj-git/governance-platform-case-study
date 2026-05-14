'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

export interface EvolutionStep {
  index: string;
  label: string;
  before: string;
  after: string;
}

interface EvolutionLadderProps {
  steps?: EvolutionStep[];
  className?: string;
}

/**
 * EvolutionLadder — the platform's arc, in five rungs.
 *
 * Each rung names a capability and frames the "before → after" without
 * quoting metrics. Designed as the closing artifact of the case study —
 * a single, calm grid that lets the reader read the whole transformation
 * top-to-bottom.
 */
export function EvolutionLadder({ steps = DEFAULT_STEPS, className }: EvolutionLadderProps) {
  return (
    <motion.ol
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className={cn(
        'flex flex-col divide-y divide-line-soft overflow-hidden rounded-md border border-line bg-surface',
        className,
      )}
    >
      {steps.map((s) => (
        <motion.li
          key={s.index}
          variants={revealUp}
          className="grid grid-cols-1 gap-x-10 gap-y-5 px-6 py-7 transition-colors sm:px-8 sm:py-8 lg:grid-cols-[140px_1fr_auto_1fr]"
        >
          {/* Index + label */}
          <div className="flex items-baseline gap-3 lg:flex-col lg:items-start lg:gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
              {s.index}
            </span>
            <h4 className="text-h3 text-ink-1 text-balance lg:mt-0">{s.label}</h4>
          </div>

          {/* Before */}
          <div className="space-y-1.5">
            <p className="text-eyebrow uppercase text-ink-4">Before</p>
            <p className="text-body-sm text-ink-2 text-pretty">{s.before}</p>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <svg viewBox="0 0 32 12" width="32" height="12" className="text-ink-3" role="presentation">
              <motion.line
                x1={0} y1={6} x2={24} y2={6}
                stroke="currentColor" strokeWidth={1}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={IN_VIEW}
                transition={{ duration: 0.55, ease: ease.standard }}
              />
              <path d="M24 2 L32 6 L24 10" fill="none" stroke="currentColor" strokeWidth={1} strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </div>

          {/* After */}
          <div className="space-y-1.5">
            <p className="text-eyebrow uppercase text-ink-3">After</p>
            <p className="text-body-sm text-ink-1 text-pretty">{s.after}</p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}

const DEFAULT_STEPS: EvolutionStep[] = [
  {
    index: '01',
    label: 'Administration',
    before: 'No organizational plane — every workspace was its own product instance with its own admins.',
    after:  'A delegated, org-level Administration layer that orchestrates workspaces without flattening them.',
  },
  {
    index: '02',
    label: 'Identity',
    before: 'One IdP application per workspace — enterprise IT teams forced to break their Single App policies on entry.',
    after:  'One IdP application, N workspaces — token portability and per-workspace identification resolved at the layer.',
  },
  {
    index: '03',
    label: 'Lifecycle',
    before: 'Manual role uplift after every provisioning. The IdP was authoritative for users, the dashboard for roles.',
    after:  'IdP as the sole source of truth. Attribute-driven role mapping, dynamic re-evaluation, deterministic resolution.',
  },
  {
    index: '04',
    label: 'Resilience',
    before: 'Total dependency on SSO. A cert expiry, a SCIM misconfiguration, or an IdP outage closed every administrative door.',
    after:  'Break-Glass and temporary access as first-class primitives — fallback paths, hard expiries, audit on every emergency.',
  },
  {
    index: '05',
    label: 'Operational visibility',
    before: 'Five siloed surfaces. No way to see governance state across workspaces without manual aggregation.',
    after:  'A single org-level operational view — workspace health, drift, expiry, and lifecycle events on one plane.',
  },
];
