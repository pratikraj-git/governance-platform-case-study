'use client';

/**
 * Screen-section primitive — shared editorial shell for rendering the
 * real product screenshots that accompany each workflow artifact.
 *
 * The companion `*Screens.tsx` files in this folder compose this
 * primitive. Each one is a *sibling* of its workflow component —
 * never a replacement — so the original architecture diagrams stay
 * untouched.
 *
 * Visual register matches `WorkflowSection`: same eyebrow weight,
 * same title scale, same spacing rhythm. The only deliberate change
 * is the eyebrow copy ("Screens · …") so the reader understands they
 * are moving from architecture to execution proof.
 */

import { motion } from 'framer-motion';
import { IN_VIEW, revealStagger, revealUp, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────────────── *
 *  ScreenSection — outer shell
 * ──────────────────────────────────────────────────────────────────── */

interface ScreenSectionProps {
  id?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  surface?: 'canvas' | 'warm';
  className?: string;
  children: React.ReactNode;
}

export function ScreenSection({
  id,
  eyebrow,
  title,
  description,
  surface = 'canvas',
  className,
  children,
}: ScreenSectionProps) {
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

        <div className="mt-16 flex flex-col gap-20 lg:mt-20 lg:gap-24">
          {children}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  ScreenGroup — labelled cluster inside a ScreenSection
 *
 *  Use to introduce a single screen or a side-by-side pair under a
 *  shared ordinal + label. The label sits as a mono eyebrow with an
 *  ordinal pip and a one-sentence intent.
 * ──────────────────────────────────────────────────────────────────── */

interface ScreenGroupProps {
  ordinal: string;
  label: string;
  /** Optional single-sentence intent printed under the label. */
  intent?: React.ReactNode;
  /** Side-by-side pair on lg+? Otherwise stacks. */
  pair?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ScreenGroup({
  ordinal,
  label,
  intent,
  pair = false,
  className,
  children,
}: ScreenGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className={cn('flex flex-col gap-7', className)}
    >
      <motion.header
        variants={revealUp}
        className="flex max-w-[58ch] flex-col gap-2"
      >
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
            — {ordinal}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            {label}
          </span>
        </div>
        {intent && (
          <p className="text-body text-ink-2 text-pretty">{intent}</p>
        )}
      </motion.header>

      <motion.div
        variants={revealUp}
        transition={{ duration: 0.7, ease: ease.standard }}
        className={cn(
          pair
            ? 'grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8'
            : 'flex flex-col gap-6',
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
