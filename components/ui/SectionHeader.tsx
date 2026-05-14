'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

interface SectionHeaderProps {
  /** Small uppercase label above the title. E.g., "03 / SSO". */
  eyebrow?: React.ReactNode;
  /** The section's title — rendered as h2 by default. */
  title: React.ReactNode;
  /** Optional supporting description. */
  description?: React.ReactNode;
  /** Render the title as h1 (use on the hero only). */
  as?: 'h1' | 'h2';
  /** Horizontal alignment. Defaults to `start` (editorial). */
  align?: 'start' | 'center';
  /** Max-width of the description. Defaults to `prose`. */
  descriptionWidth?: 'prose' | 'narrow' | 'wide';
  className?: string;
}

const descriptionWidthMap = {
  prose:  'max-w-[var(--container-prose)]',
  narrow: 'max-w-[var(--container-narrow)]',
  wide:   'max-w-[var(--container-max)]',
};

/**
 * SectionHeader — eyebrow, title, description. Animates in on viewport entry
 * using the shared `revealStagger` motion primitive.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  as = 'h2',
  align = 'start',
  descriptionWidth = 'prose',
  className,
}: SectionHeaderProps) {
  const Title = as;
  const titleClass =
    as === 'h1'
      ? 'text-[clamp(2.25rem,5.2vw,4rem)] leading-[1.04] tracking-[-0.035em] font-semibold text-ink-1 text-balance'
      : 'text-h2 text-ink-1 text-balance';

  return (
    <motion.header
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
          {eyebrow}
        </motion.p>
      )}

      <motion.div variants={revealUp}>
        <Title className={titleClass}>{title}</Title>
      </motion.div>

      {description && (
        <motion.p
          variants={revealUp}
          className={cn(
            'text-body-lg text-ink-2 text-pretty',
            descriptionWidthMap[descriptionWidth],
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
