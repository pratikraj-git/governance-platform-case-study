'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ease } from '@/lib/motion';

interface FragmentationGridProps {
  /** How many workspace tiles to show. Defaults to 9 (3 × 3 grid). */
  count?: number;
  className?: string;
}

/**
 * FragmentationGrid — the "before" state of governance.
 *
 * Renders a grid of independent workspace tiles, each carrying its own
 * isolated copy of identity & access configuration. The visual point is
 * redundancy: every tile is the same shape, the same five chips, the
 * same maintenance overhead — multiplied by N.
 *
 * Used inside the Problem Space section. No interactivity, no narrative
 * inside the tile — restrained, architectural, intentionally repetitive.
 */
export function FragmentationGrid({ count = 9, className }: FragmentationGridProps) {
  const tiles = Array.from({ length: count }, (_, i) => i);

  return (
    <div
      className={cn(
        'relative w-full rounded-md border border-line bg-surface p-5 sm:p-6',
        className,
      )}
    >
      <header className="mb-5 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-ink-3">
        <span>Per-Workspace Governance · Today</span>
        <span className="font-mono text-[10px] tracking-[0.18em] text-ink-4">
          ×{count}
        </span>
      </header>

      <div className="grid grid-cols-3 gap-2.5">
        {tiles.map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: i * 0.04, ease: ease.quiet }}
            className="rounded-md border border-line-soft bg-surface-mute p-3 transition-colors hover:border-line"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink-4">
                W{String(i + 1).padStart(2, '0')}
              </span>
              <span aria-hidden className="inline-flex gap-0.5">
                <span className="h-1 w-1 rounded-full bg-line-strong" />
                <span className="h-1 w-1 rounded-full bg-line-strong" />
                <span className="h-1 w-1 rounded-full bg-line-strong" />
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-1">
              {DUPLICATED_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="truncate rounded-sm border border-line-soft bg-surface px-1.5 py-1 text-[10px] font-medium text-ink-2"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line-soft pt-4 text-[12px] text-ink-3">
        <span className="text-balance">
          Every workspace re-implements the same five primitives. Setup, drift, and audit live in parallel — never in dialogue.
        </span>
        <span className="font-mono text-[11px] text-ink-1">
          {count * 5} configurations · 1 source of truth → none
        </span>
      </footer>
    </div>
  );
}

const DUPLICATED_CHIPS = ['SSO', 'SCIM', 'Roles', 'Tokens', 'Audit'] as const;
