import { cn } from '@/lib/utils';

interface MetricCardProps {
  /** Short uppercase label. */
  label: React.ReactNode;
  /** Large numeric or short string value. Placeholder copy should pass `—`. */
  value: React.ReactNode;
  /** Optional supporting context — e.g. "vs. last quarter". */
  trend?: React.ReactNode;
  /** Quiet signal hint — keep usage rare and earned. */
  tone?: 'neutral' | 'positive' | 'attention' | 'critical';
  /** Density. `compact` for dense KPI rails, `default` for hero metrics. */
  density?: 'default' | 'compact';
  /** Optional bordered look. */
  bordered?: boolean;
  className?: string;
}

const toneAccent: Record<NonNullable<MetricCardProps['tone']>, string> = {
  neutral:   'bg-ink-1',
  positive:  'bg-signal-positive',
  attention: 'bg-signal-attention',
  critical:  'bg-signal-critical',
};

/**
 * MetricCard — operational metric, restrained.
 *
 * Hierarchy is the only emphasis: a small uppercase label, a confident
 * value at h2 scale, an optional metadata line beneath. A 6px dot in
 * the corner is the only colored signal — and only when `tone` is set.
 */
export function MetricCard({
  label,
  value,
  trend,
  tone = 'neutral',
  density = 'default',
  bordered = true,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-4 rounded-md bg-surface',
        bordered && 'border border-line',
        density === 'default' ? 'p-6 md:p-7' : 'p-4 md:p-5',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-eyebrow uppercase text-ink-3">{label}</p>
        {tone !== 'neutral' && (
          <span aria-hidden className={cn('inline-block h-1.5 w-1.5 rounded-full', toneAccent[tone])} />
        )}
      </div>

      <p
        className={cn(
          'font-semibold text-ink-1 tabular-nums',
          density === 'default' ? 'text-h2 leading-none' : 'text-h3 leading-none',
        )}
      >
        {value}
      </p>

      {trend && (
        <p className={cn('text-body-sm text-ink-3', density === 'compact' && 'text-[12px]')}>{trend}</p>
      )}
    </div>
  );
}
