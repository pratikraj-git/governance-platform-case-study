'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

export interface OrchestrationStage {
  /** Editorial sequence — "01", "02", "03". */
  index: string;
  /** Stage label (e.g. "Metadata Intake", "Token & Base URL"). */
  label: string;
  /** Short body description. */
  body: React.ReactNode;
  /** Optional sub-state chips. */
  chips?: readonly string[];
  /** Visual emphasis — `emphasis` darkens the border, default is hairline. */
  tone?: 'default' | 'emphasis';
  /** Optional scope hint — e.g. "shared", "per-workspace". */
  scope?: string;
}

interface OrchestrationFlowProps {
  stages: OrchestrationStage[];
  /** Optional caption beneath the flow. */
  caption?: React.ReactNode;
  /** Optional eyebrow row above the flow. */
  eyebrow?: React.ReactNode;
  className?: string;
}

/**
 * OrchestrationFlow — N-stage horizontal flow.
 *
 * The shared primitive for setup orchestrations (SSO, SCIM). Renders
 * each stage as a hairline-bordered card with an index, label, body,
 * optional chips, and an optional scope tag. Connectors are flat
 * pixel lines with terminal arrowheads — no curves, no bezier flair.
 *
 * On smaller breakpoints the row stacks vertically with downward
 * connectors.
 */
export function OrchestrationFlow({
  stages, caption, eyebrow, className,
}: OrchestrationFlowProps) {
  return (
    <div className={cn('w-full', className)}>
      {eyebrow && (
        <p className="mb-5 text-eyebrow uppercase text-ink-3">{eyebrow}</p>
      )}

      <motion.ol
        initial="hidden"
        whileInView="show"
        viewport={IN_VIEW}
        variants={revealStagger}
        className={cn(
          'grid grid-cols-1 gap-3 md:gap-4',
          // Equal columns per stage on lg+
          stages.length === 3 && 'lg:grid-cols-[1fr_auto_1fr_auto_1fr]',
          stages.length === 4 && 'lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]',
          // Fallback: stacked
          stages.length !== 3 && stages.length !== 4 && 'lg:grid-cols-1',
        )}
      >
        {stages.map((s, i) => {
          const isLast = i === stages.length - 1;
          return (
            <FragmentRow key={s.index} stage={s} isLast={isLast} />
          );
        })}
      </motion.ol>

      {caption && (
        <p className="mt-6 text-body-sm text-ink-3 text-pretty">{caption}</p>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Internals
 * ──────────────────────────────────────────────────────────────────── */

function FragmentRow({ stage, isLast }: { stage: OrchestrationStage; isLast: boolean }) {
  return (
    <>
      <motion.li
        variants={revealUp}
        className={cn(
          'group relative flex h-full flex-col rounded-md border bg-surface p-6 transition-colors',
          stage.tone === 'emphasis'
            ? 'border-ink-1 hover:border-ink-1'
            : 'border-line hover:border-line-strong',
        )}
      >
        <header className="flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
            {stage.index}
          </span>
          {stage.scope && (
            <span className="rounded-sm border border-line-soft bg-surface-mute px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-ink-3">
              {stage.scope}
            </span>
          )}
        </header>

        <h4 className="mt-4 text-h3 text-ink-1 text-balance">{stage.label}</h4>

        <div className="mt-3 text-body-sm text-ink-2 text-pretty">
          {stage.body}
        </div>

        {stage.chips && stage.chips.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {stage.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-sm border border-line-soft bg-surface px-2 py-1 text-[11px] text-ink-2"
              >
                {chip}
              </li>
            ))}
          </ul>
        )}
      </motion.li>

      {!isLast && (
        <motion.li
          aria-hidden
          variants={revealUp}
          className="flex items-center justify-center"
        >
          <Connector />
        </motion.li>
      )}
    </>
  );
}

function Connector() {
  return (
    <>
      {/* Horizontal connector for lg+ */}
      <svg
        viewBox="0 0 40 12" width="40" height="12"
        className="hidden lg:block text-ink-3"
        role="presentation"
      >
        <motion.line
          x1={0} y1={6} x2={32} y2={6}
          stroke="currentColor" strokeWidth={1}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={IN_VIEW}
          transition={{ duration: 0.45, ease: ease.standard }}
        />
        <path d="M32 2 L40 6 L32 10" fill="none" stroke="currentColor" strokeWidth={1} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      {/* Vertical connector for smaller breakpoints */}
      <svg viewBox="0 0 12 28" width="12" height="28" className="lg:hidden text-ink-3" role="presentation">
        <motion.line
          x1={6} y1={0} x2={6} y2={20}
          stroke="currentColor" strokeWidth={1}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={IN_VIEW}
          transition={{ duration: 0.45, ease: ease.standard }}
        />
        <path d="M2 20 L6 28 L10 20" fill="none" stroke="currentColor" strokeWidth={1} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </>
  );
}
