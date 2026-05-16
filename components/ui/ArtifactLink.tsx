'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IN_VIEW, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * ArtifactLink — subtle, premium pointer from a case-study section to
 * the matching artifact preview page (/workflows, /explorations,
 * /decisions, /before-after).
 *
 * Visual register: a single hairline rule above the line, a small
 * mono eyebrow on the left, an editorial label, and a discreet arrow
 * that gains 2 pixels of travel on hover. No buttons, no chrome.
 * Designed to feel like a footnote pointing somewhere worth following.
 */

interface ArtifactLinkProps {
  /** Target route — `/workflows`, `/explorations`, `/decisions`, `/before-after`. */
  href: string;
  /** Small mono eyebrow to the left of the label. Optional. */
  eyebrow?: string;
  /** Editorial label. e.g. "View SCIM orchestration artifacts". */
  label: string;
  className?: string;
}

export function ArtifactLink({
  href,
  eyebrow,
  label,
  className,
}: ArtifactLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.6, ease: ease.standard }}
      className={cn('mt-10 max-w-[var(--container-narrow)]', className)}
    >
      <div className="border-t border-line-soft pt-4">
        <Link
          href={href}
          className="group inline-flex flex-wrap items-baseline gap-x-4 gap-y-1.5 text-ink-2 transition-colors hover:text-ink-1"
        >
          {eyebrow && (
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 group-hover:text-ink-2">
              {eyebrow}
            </span>
          )}
          <span className="text-body-sm underline-offset-4 group-hover:underline">
            {label}
          </span>
          <span
            aria-hidden
            className="inline-block translate-x-0 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-ink-1"
          >
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
