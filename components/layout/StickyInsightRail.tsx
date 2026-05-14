import { cn } from '@/lib/utils';

export interface InsightItem {
  /** A short, factual label — 1–4 words. Uppercase eyebrow style. */
  label: string;
  /** A single-sentence insight. */
  value: React.ReactNode;
}

interface StickyInsightRailProps {
  items: InsightItem[];
  /** Eyebrow shown above the rail. */
  title?: string;
  /** Width target. Defaults to a narrow column. */
  width?: 'narrow' | 'comfortable';
  className?: string;
}

/**
 * StickyInsightRail — a quiet right-side column that stays in view as the
 * reader scrolls a long section. Used to anchor section-level facts and
 * principles without competing with the main narrative.
 *
 * On mobile it collapses to a stacked block.
 */
export function StickyInsightRail({
  items,
  title = 'In this section',
  width = 'narrow',
  className,
}: StickyInsightRailProps) {
  return (
    <aside
      className={cn(
        'lg:sticky lg:top-24 lg:self-start',
        width === 'narrow' ? 'lg:w-[260px]' : 'lg:w-[320px]',
        className,
      )}
    >
      <div className="border-t border-line pt-6">
        <p className="text-eyebrow uppercase text-ink-3">{title}</p>
        <ul className="mt-6 space-y-6">
          {items.map((item, idx) => (
            <li key={idx} className="space-y-1.5">
              <p className="text-eyebrow uppercase text-ink-4">{item.label}</p>
              <p className="text-body-sm text-ink-2">{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
