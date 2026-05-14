import { cn } from '@/lib/utils';

interface ArchitectureCardProps {
  /** Small uppercase label, e.g. "Module". */
  eyebrow?: React.ReactNode;
  /** Card title. */
  title: React.ReactNode;
  /** Body copy or component (a list, a diagram, a row of stats). */
  description?: React.ReactNode;
  /** Footer slot — typically a metadata row. */
  meta?: React.ReactNode;
  /** Visual variant. */
  variant?: 'default' | 'emphasis' | 'ghost' | 'inverse';
  /** Compact padding for grids of many cards. */
  density?: 'comfortable' | 'compact';
  /** Optional leading number (e.g. "01") for editorial sequencing. */
  index?: string;
  className?: string;
  children?: React.ReactNode;
}

const variantMap: Record<NonNullable<ArchitectureCardProps['variant']>, string> = {
  default:  'border border-line bg-surface',
  emphasis: 'border border-ink-1 bg-surface',
  ghost:    'border border-dashed border-line-strong bg-transparent',
  inverse:  'border border-surface-ink bg-surface-ink text-ink-inverse',
};

const densityMap: Record<NonNullable<ArchitectureCardProps['density']>, string> = {
  comfortable: 'p-7 md:p-8',
  compact:     'p-5 md:p-6',
};

/**
 * ArchitectureCard — the universal block for governance modules,
 * operational blocks, and inline system diagrams. Built on a 1px
 * border + flat surface, no shadow. Hover is a quiet 1px border
 * darken.
 */
export function ArchitectureCard({
  eyebrow,
  title,
  description,
  meta,
  variant = 'default',
  density = 'comfortable',
  index,
  className,
  children,
}: ArchitectureCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-5 rounded-md transition-colors duration-200',
        variantMap[variant],
        densityMap[density],
        variant !== 'inverse' && 'hover:border-line-strong',
        className,
      )}
    >
      {(index || eyebrow) && (
        <div className="flex items-center justify-between">
          {eyebrow ? (
            <span className={cn('text-eyebrow uppercase', variant === 'inverse' ? 'text-ink-inverse/60' : 'text-ink-3')}>
              {eyebrow}
            </span>
          ) : (
            <span />
          )}
          {index && (
            <span className={cn('font-mono text-[11px]', variant === 'inverse' ? 'text-ink-inverse/60' : 'text-ink-4')}>
              {index}
            </span>
          )}
        </div>
      )}

      <div className="space-y-3">
        <h3 className={cn('text-h3', variant === 'inverse' ? 'text-ink-inverse' : 'text-ink-1')}>
          {title}
        </h3>
        {description && (
          <div className={cn('text-body-sm text-pretty', variant === 'inverse' ? 'text-ink-inverse/80' : 'text-ink-2')}>
            {description}
          </div>
        )}
      </div>

      {children && <div className="flex-1">{children}</div>}

      {meta && (
        <div
          className={cn(
            'mt-2 flex items-center gap-3 border-t pt-4 text-[12px]',
            variant === 'inverse'
              ? 'border-ink-inverse/15 text-ink-inverse/60'
              : 'border-line-soft text-ink-3',
          )}
        >
          {meta}
        </div>
      )}
    </div>
  );
}
