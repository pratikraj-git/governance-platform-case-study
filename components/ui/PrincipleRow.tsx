'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ease } from '@/lib/motion';

export interface Principle {
  /** Editorial sequence — "01", "02", … */
  index: string;
  /** Title — short, structural. */
  title: string;
  /** Single-sentence description. */
  description: string;
}

interface PrincipleRowProps {
  principles: Principle[];
  className?: string;
}

/**
 * PrincipleRow — a five-up row of architectural principles. Used to
 * close the Governance Architecture section. Numbered, hairline-divided,
 * no icons. The whole point is restraint: type and rhythm only.
 */
export function PrincipleRow({ principles, className }: PrincipleRowProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-8 gap-y-10 border-t border-line pt-10',
        'sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-line-soft lg:gap-y-0 lg:gap-x-0',
        className,
      )}
    >
      {principles.map((p, i) => (
        <motion.article
          key={p.index}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: i * 0.06, ease: ease.standard }}
          className="lg:px-6 first:lg:pl-0 last:lg:pr-0"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
            {p.index}
          </p>
          <h4 className="mt-3 text-h3 text-ink-1 text-balance">
            {p.title}
          </h4>
          <p className="mt-3 text-body-sm text-ink-2 text-pretty">
            {p.description}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
