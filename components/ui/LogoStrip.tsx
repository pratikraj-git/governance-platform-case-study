'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { IN_VIEW, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

export interface LogoEntry {
  /** Display name. Used as alt text when `src` is provided, and as the
   * rendered wordmark when it isn't. */
  name: string;
  /**
   * Optional path to a logo SVG in `public/assets/logos/`. If provided,
   * the strip renders the SVG (monochrome via CSS filter). If omitted,
   * the strip renders `name` as a restrained typographic wordmark.
   */
  src?: string;
}

interface LogoStripProps {
  /** 3–6 entries recommended. Density scales gracefully up to 7. */
  logos: LogoEntry[];
  /** Optional eyebrow rendered above the strip. */
  eyebrow?: React.ReactNode;
  /** Optional fine-print line below the strip. */
  caption?: React.ReactNode;
  className?: string;
}

/**
 * LogoStrip — a single restrained row of customer logos or industry
 * wordmarks. Monochrome, calm, editorial. No tile boxes, no shadows,
 * no "as seen in" framing. The visual goal is reassurance, not display.
 *
 * Each entry renders one of two ways:
 *
 *   1. SVG file  → `<Image>` at a small fixed height, run through a
 *      desaturate/contrast CSS filter so colored marks render as ink.
 *   2. No file   → a typographic wordmark in caps + tracking, set in
 *      the editorial ink-3 tone.
 *
 * This means the slot exists today; real brand SVGs can be dropped in
 * later without touching the layout.
 */
export function LogoStrip({ logos, eyebrow, caption, className }: LogoStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.7, ease: ease.standard }}
      className={cn('w-full', className)}
      aria-label="Industries and customers"
    >
      {eyebrow && (
        <p className="mb-7 text-eyebrow uppercase text-ink-3">{eyebrow}</p>
      )}

      <ul
        role="list"
        className="flex flex-wrap items-center gap-x-10 gap-y-6 sm:gap-x-12 lg:gap-x-16"
      >
        {logos.map((logo) => (
          <li key={logo.name} className="flex items-center">
            {logo.src ? (
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={28}
                className="h-6 w-auto opacity-60 grayscale transition-opacity hover:opacity-90 sm:h-7"
                style={{
                  filter: 'grayscale(1) brightness(0.55) contrast(1.05)',
                }}
              />
            ) : (
              <span
                aria-label={logo.name}
                className="font-mono text-[12px] uppercase tracking-[0.22em] text-ink-3 transition-colors hover:text-ink-1 sm:text-[13px]"
              >
                {logo.name}
              </span>
            )}
          </li>
        ))}
      </ul>

      {caption && (
        <p className="mt-7 max-w-[58ch] text-[12px] leading-[1.6] text-ink-4 text-pretty">
          {caption}
        </p>
      )}
    </motion.div>
  );
}
