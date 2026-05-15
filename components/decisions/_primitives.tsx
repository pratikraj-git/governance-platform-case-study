'use client';

/**
 * Key Decision primitives — shared editorial building blocks for the
 * "Key decisions" artifact family.
 *
 * Where the workflow primitives are architectural (Layer · NodeCard ·
 * VerticalConnector) and the exploration primitives are wireframe
 * (Frame · Bar · Chip · Region), these are *prose*. The visual
 * hierarchy here is type and rhythm, not diagram or canvas.
 *
 * Design commitments:
 *
 *   • Type-led — three editorial tiers (title, mono label, body), no
 *     decorative chrome, no card backgrounds, no signal color.
 *   • Editorial split — title left, prose right on lg+, stacks on
 *     mobile. Generous breathing on either side of the hairline rule.
 *   • Hairline separators only — `divide-y` between rows, no boxes.
 *   • Designed for either embedding (a single `KeyDecision` row inside
 *     an existing case-study section) or wholesale insertion (the full
 *     `KeyDecisions` section as a strategic chapter of its own).
 *
 * Each row is a `<article>` so a single decision can be lifted out of
 * the section and dropped wherever it belongs without losing its
 * semantic structure.
 */

import { motion } from 'framer-motion';
import { IN_VIEW, revealStagger, revealUp, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────────────── *
 *  KeyDecisionsSection
 *  ───────────────────
 *  Outer shell. Eyebrow ("Key decisions · Strategic tradeoffs"),
 *  title, one-paragraph framing, then the children (typically a
 *  `KeyDecisionsList`). Matches WorkflowSection / ExplorationSection
 *  in spacing so the three preview pages feel like siblings.
 * ──────────────────────────────────────────────────────────────────── */

interface KeyDecisionsSectionProps {
  id?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  /** Optional single-sentence designer insight at the foot. */
  insight?: React.ReactNode;
  surface?: 'canvas' | 'warm';
  className?: string;
  children: React.ReactNode;
}

export function KeyDecisionsSection({
  id,
  eyebrow,
  title,
  description,
  insight,
  surface = 'canvas',
  className,
  children,
}: KeyDecisionsSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        surface === 'warm' && 'bg-surface-warm',
        className,
      )}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6 py-24 sm:px-10 md:py-28 lg:px-16 lg:py-32">
        <motion.header
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="flex max-w-[68ch] flex-col gap-5"
        >
          <motion.p
            variants={revealUp}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={revealUp}
            className="max-w-[28ch] text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.12] tracking-[-0.022em] font-semibold text-ink-1 text-balance"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={revealUp}
            className="max-w-[62ch] text-body-lg text-ink-2 text-pretty"
          >
            {description}
          </motion.p>
        </motion.header>

        <div className="mt-16 lg:mt-20">{children}</div>

        {insight && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={IN_VIEW}
            transition={{ duration: 0.7, ease: ease.standard }}
            className="mt-16 max-w-[64ch] text-body-sm italic leading-[1.65] text-ink-2 text-pretty"
          >
            {insight}
          </motion.p>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  KeyDecisionsList
 *  ────────────────
 *  Vertical stack of `KeyDecision` rows, separated by hairline rules.
 *  Reveals as a stagger so each row enters on its own beat. Apply
 *  this when you want the full set; for a single row, use `KeyDecision`
 *  directly.
 * ──────────────────────────────────────────────────────────────────── */

interface KeyDecisionsListProps {
  className?: string;
  children: React.ReactNode;
}

export function KeyDecisionsList({ className, children }: KeyDecisionsListProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className={cn(
        'flex flex-col divide-y divide-line-soft',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  KeyDecision
 *  ───────────
 *  One decision row. Editorial split: ordinal + title on the left,
 *  "why this mattered" + "tradeoff · impact" prose on the right.
 *
 *  Stacks on mobile / tablet, becomes a 12-column grid on lg+.
 *  Top/bottom padding scales with viewport so the rhythm reads as
 *  a chapter, not a settings list.
 * ──────────────────────────────────────────────────────────────────── */

export interface KeyDecisionProps {
  /** Mono ordinal, e.g. "01", "02". Rendered above the title. */
  ordinal: string;
  /** Decision title. Sentence-case, single line of meaning. */
  title: React.ReactNode;
  /** "Why this mattered" — the strategic context. ~25–45 words. */
  why: React.ReactNode;
  /** "Tradeoff · impact" — what was given up and what was gained.
   *  ~25–55 words. */
  tradeoff: React.ReactNode;
  /** Optional element rendered after the tradeoff — a pull quote, a
   *  metric, a one-line attribution. Keep ≤ 25 words. */
  footnote?: React.ReactNode;
  /** Anchor id for deep-linking from a preview index. */
  id?: string;
  className?: string;
}

export function KeyDecision({
  ordinal,
  title,
  why,
  tradeoff,
  footnote,
  id,
  className,
}: KeyDecisionProps) {
  return (
    <motion.article
      id={id}
      variants={revealUp}
      className={cn(
        'grid grid-cols-1 gap-x-12 gap-y-7 py-12 lg:grid-cols-12 lg:gap-y-0 lg:py-16',
        className,
      )}
    >
      {/* Title column */}
      <header className="flex flex-col gap-5 lg:col-span-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
          {ordinal}
        </p>
        <h3 className="max-w-[20ch] text-[clamp(1.4rem,2.4vw,1.875rem)] leading-[1.15] tracking-[-0.018em] font-semibold text-ink-1 text-balance">
          {title}
        </h3>
      </header>

      {/* Prose column */}
      <div className="flex flex-col gap-7 lg:col-span-7 lg:max-w-[58ch]">
        <ProseBlock label="Why this mattered" body={why} />
        <ProseBlock label="Tradeoff · Impact" body={tradeoff} />
        {footnote && (
          <p className="border-t border-line-soft pt-5 text-[13px] italic leading-[1.65] text-ink-3 text-pretty">
            {footnote}
          </p>
        )}
      </div>
    </motion.article>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  ProseBlock
 *  ──────────
 *  Internal: a single labelled paragraph. Two tiers — mono label,
 *  reading body. Used for both "why" and "tradeoff" slots.
 * ──────────────────────────────────────────────────────────────────── */

function ProseBlock({
  label,
  body,
}: {
  label: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.20em] text-ink-3">
        {label}
      </p>
      <p className="text-[15px] leading-[1.65] text-ink-2 text-pretty">
        {body}
      </p>
    </div>
  );
}
