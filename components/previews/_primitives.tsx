'use client';

/**
 * Artifact preview strips — small, type-led editorial interludes that
 * sit *between* major case-study sections and point the reader at a
 * matching artifact family (`/workflows`, `/explorations`,
 * `/decisions`, `/before-after`).
 *
 * These are deliberately **not** screenshot containers. The visual
 * register is conceptual: warm canvas, mono eyebrow, a short title,
 * 2–3 hairline cards in a row, and a single editorial CTA. The shape
 * tells the reader "this is a side note, not another section."
 *
 * Layout commitments:
 *
 *   • Compact vertical rhythm — roughly two-thirds the height of a
 *     full section, so the interlude reads as a beat, not a chapter.
 *   • `surface-warm` background — alternates against the white case-
 *     study sections without introducing a new color.
 *   • Hairline cards — no fills, no shadows, no card chrome. The
 *     reader's eye sees type, not panels.
 *   • Single CTA — the artifact link reuses `ArtifactLink` so the
 *     pointer back out to the artifact family reads consistently with
 *     the links already embedded inside case-study sections.
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { ArtifactLink } from '@/components/ui/ArtifactLink';

/* ──────────────────────────────────────────────────────────────────── *
 *  ArtifactPreviewStrip — outer shell
 * ──────────────────────────────────────────────────────────────────── */

interface ArtifactPreviewStripProps {
  id?: string;
  /** Mono eyebrow, e.g. "Side note · Strategic decisions". */
  eyebrow: React.ReactNode;
  /** Short title sentence. One line of meaning. */
  title: React.ReactNode;
  /** Optional single-sentence framing. */
  description?: React.ReactNode;
  /** The single editorial CTA back to the artifact family root. */
  cta: { href: string; eyebrow?: string; label: string };
  /** PreviewCard children. Two or three. */
  children: React.ReactNode;
  /**
   * `bleed` (default) — full-bleed warm-canvas strip, used when this
   * interlude sits *between* top-level case-study sections in
   * `app/page.tsx`. Self-contains its own padding and a `border-y`.
   *
   * `inline` — constrained-width interlude with no background bleed,
   * used when this strip sits *inside* an existing `SectionContainer`
   * between two sub-movements. Renders hairline rules above and below
   * so the interlude still reads as a beat, not as continuation of
   * the surrounding sub-movement.
   */
  variant?: 'bleed' | 'inline';
  className?: string;
}

export function ArtifactPreviewStrip({
  id,
  eyebrow,
  title,
  description,
  cta,
  children,
  variant = 'bleed',
  className,
}: ArtifactPreviewStripProps) {
  const inline = variant === 'inline';

  const Outer = inline ? 'div' : 'section';

  return (
    <Outer
      id={id}
      aria-label={typeof title === 'string' ? title : undefined}
      className={cn(
        'relative w-full',
        inline
          ? // Constrained-width usage — fits inside a SectionContainer.
            // No bg bleed, hairline rules above and below mark the beat.
            'mt-20 border-y border-line-soft py-12 md:mt-24 md:py-14 lg:py-16'
          : // Full-bleed usage — sits between top-level sections.
            'border-y border-line-soft bg-surface-warm',
        className,
      )}
    >
      <div
        className={cn(
          inline
            ? // Inherit parent container width — no extra horizontal padding,
              // the parent SectionContainer already provides it.
              'w-full'
            : 'mx-auto max-w-[var(--container-max)] px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24',
        )}
      >
        <motion.header
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="flex max-w-[60ch] flex-col gap-3"
        >
          <motion.p
            variants={revealUp}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3"
          >
            {eyebrow}
          </motion.p>
          <motion.h3
            variants={revealUp}
            className="max-w-[32ch] text-[clamp(1.375rem,2.2vw,1.625rem)] leading-[1.18] tracking-[-0.018em] font-semibold text-ink-1 text-balance"
          >
            {title}
          </motion.h3>
          {description && (
            <motion.p
              variants={revealUp}
              className="max-w-[58ch] text-body-sm text-ink-2 text-pretty"
            >
              {description}
            </motion.p>
          )}
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {children}
        </motion.div>

        <ArtifactLink
          href={cta.href}
          eyebrow={cta.eyebrow}
          label={cta.label}
          className="mt-10 lg:mt-12"
        />
      </div>
    </Outer>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  PreviewCard — single editorial card
 *
 *  Type-led. Mono ordinal, short title, one-sentence summary, and a
 *  quiet "Open →" affordance. The whole card is a link to the
 *  matching anchor on the artifact page.
 * ──────────────────────────────────────────────────────────────────── */

interface PreviewCardProps {
  ordinal: string;
  title: string;
  summary: string;
  href: string;
}

export function PreviewCard({
  ordinal,
  title,
  summary,
  href,
}: PreviewCardProps) {
  return (
    <motion.div variants={revealUp} className="h-full">
      <Link
        href={href}
        className={cn(
          'group flex h-full flex-col gap-4 rounded-md border border-line-soft bg-surface p-5 lg:p-6',
          'transition-colors duration-300',
          'hover:border-line-strong hover:bg-surface',
        )}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4 group-hover:text-ink-3">
          {ordinal}
        </p>
        <h4 className="text-[15.5px] leading-[1.3] font-semibold text-ink-1 text-balance">
          {title}
        </h4>
        <p className="flex-1 text-[13.5px] leading-[1.55] text-ink-2 text-pretty">
          {summary}
        </p>
        <p className="mt-1 inline-flex items-baseline gap-2 text-[12px] text-ink-3 transition-colors group-hover:text-ink-1">
          <span className="underline-offset-4 group-hover:underline">Open</span>
          <span
            aria-hidden
            className="inline-block translate-x-0 transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </p>
      </Link>
    </motion.div>
  );
}
