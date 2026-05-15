'use client';

/**
 * Before / After primitives — shared building blocks for the
 * "Before vs After" comparison artifacts.
 *
 * This family sits next to the other three:
 *   /workflows     · architecture (what the system is)
 *   /explorations  · process       (how the design got there)
 *   /decisions     · strategy      (why the calls were made)
 *   /before-after  · evolution     (what the surface used to be vs now)
 *
 * Design commitments:
 *
 *   • Typographically led. No card chrome, no signal color, no arrow
 *     iconography between columns. Hierarchy comes from ink steps.
 *   • Two-column editorial split on lg+: BEFORE on the left in muted
 *     ink, AFTER on the right in primary ink. Stacks on mobile and
 *     tablet with a single hairline rule between halves.
 *   • Each side is a list of short operational phrases. Lists can be
 *     of unequal length — the comparison doesn't have to be 1:1.
 *   • Reveals once on scroll using the site's `revealUp` motion.
 *
 * Each artifact renders its own `<section>` so it can be dropped
 * anywhere in the case study without further wrapping.
 */

import { motion } from 'framer-motion';
import { IN_VIEW, revealStagger, revealUp, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────────────── *
 *  Types
 * ──────────────────────────────────────────────────────────────────── */

export interface BeforeAfterColumn {
  /** The "name" of this state — a short noun phrase. */
  state: string;
  /** Three to five short operational phrases. */
  items: string[];
}

interface BeforeAfterArtifactProps {
  /** Optional anchor id, used for deep-linking on preview pages. */
  id?: string;
  /** Monospace eyebrow above the title. */
  eyebrow: React.ReactNode;
  /** Title — a single arc, e.g. "Fragmented governance → Centralised governance." */
  title: React.ReactNode;
  /** One-paragraph editorial framing. */
  description: React.ReactNode;
  /** Left column — the "before" state. */
  before: BeforeAfterColumn;
  /** Right column — the "after" state. */
  after: BeforeAfterColumn;
  /** Optional designer insight rendered after the comparison. */
  insight?: React.ReactNode;
  /** Optional surface tone. Defaults to canvas. */
  surface?: 'canvas' | 'warm';
  className?: string;
}

/* ──────────────────────────────────────────────────────────────────── *
 *  BeforeAfterArtifact — the full comparison section
 *
 *  Renders header + two-column comparison + optional insight inside
 *  the standard case-study section shell. Each artifact composes this
 *  with its own copy.
 * ──────────────────────────────────────────────────────────────────── */

export function BeforeAfterArtifact({
  id,
  eyebrow,
  title,
  description,
  before,
  after,
  insight,
  surface = 'canvas',
  className,
}: BeforeAfterArtifactProps) {
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
          className="flex flex-col gap-5"
        >
          <motion.p
            variants={revealUp}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={revealUp}
            className="max-w-[30ch] text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.12] tracking-[-0.022em] font-semibold text-ink-1 text-balance"
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

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="mt-16 grid grid-cols-1 lg:mt-20 lg:grid-cols-2"
        >
          {/* BEFORE column — muted ink, sits on the left at lg+, on top below */}
          <motion.div
            variants={revealUp}
            className="pb-10 lg:border-r lg:border-line-soft lg:pb-0 lg:pr-12 xl:pr-14"
          >
            <ComparisonColumn tone="before" column={before} />
          </motion.div>

          {/* AFTER column — primary ink, sits on the right at lg+, below on mobile */}
          <motion.div
            variants={revealUp}
            className="border-t border-line-soft pt-10 lg:border-t-0 lg:pl-12 lg:pt-0 xl:pl-14"
          >
            <ComparisonColumn tone="after" column={after} />
          </motion.div>
        </motion.div>

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
 *  ComparisonColumn — one half of the comparison
 *
 *  Internal. Renders the eyebrow ("Before" / "After"), the state
 *  title, and the list of items. The tone prop tunes the ink steps
 *  so the AFTER side reads as the destination without resorting to
 *  color, strikethrough, or arrows.
 * ──────────────────────────────────────────────────────────────────── */

type ColumnTone = 'before' | 'after';

const eyebrowMap: Record<ColumnTone, { label: string; ink: string }> = {
  before: { label: 'Before', ink: 'text-ink-4' },
  after: { label: 'After', ink: 'text-ink-1' },
};

const stateInkMap: Record<ColumnTone, string> = {
  before: 'text-ink-3',
  after: 'text-ink-1',
};

const itemInkMap: Record<ColumnTone, string> = {
  before: 'text-ink-3',
  after: 'text-ink-2',
};

const dotInkMap: Record<ColumnTone, string> = {
  before: 'bg-line-strong',
  after: 'bg-ink-1',
};

function ComparisonColumn({
  tone,
  column,
}: {
  tone: ColumnTone;
  column: BeforeAfterColumn;
}) {
  const eyebrowConfig = eyebrowMap[tone];
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4">
        <p
          className={cn(
            'font-mono text-[11px] uppercase tracking-[0.20em]',
            eyebrowConfig.ink,
          )}
        >
          {eyebrowConfig.label}
        </p>
        <h3
          className={cn(
            'max-w-[22ch] text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.2] tracking-[-0.014em] font-semibold text-balance',
            stateInkMap[tone],
          )}
        >
          {column.state}
        </h3>
      </header>

      <ul className="flex flex-col gap-3.5">
        {column.items.map((item, i) => (
          <li
            key={i}
            className={cn(
              'flex items-baseline gap-3 text-[15px] leading-[1.55] text-pretty',
              itemInkMap[tone],
            )}
          >
            <span
              aria-hidden
              className={cn(
                'relative top-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full',
                dotInkMap[tone],
              )}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
