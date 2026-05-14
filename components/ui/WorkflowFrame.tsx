import { cn } from '@/lib/utils';

interface WorkflowFrameProps {
  /** Small label rendered in the frame's chrome — like a Figma frame name. */
  label?: React.ReactNode;
  /** Optional caption rendered below the frame. */
  caption?: React.ReactNode;
  /** Optional metadata line on the right of the chrome. */
  meta?: React.ReactNode;
  /** Aspect-ratio control. Defaults to 16/9. */
  aspect?: '16/9' | '4/3' | '3/2' | '1/1' | 'auto';
  /** Visual variant. `inset` = subtle bordered card. `bare` = no chrome. */
  variant?: 'inset' | 'bare';
  className?: string;
  /** The actual visual content — image, screenshot, embedded prototype, etc. */
  children: React.ReactNode;
}

const aspectMap: Record<NonNullable<WorkflowFrameProps['aspect']>, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3':  'aspect-[4/3]',
  '3/2':  'aspect-[3/2]',
  '1/1':  'aspect-square',
  auto:   '',
};

/**
 * WorkflowFrame — image / flow / screenshot container.
 *
 * Mimics a design-tool frame: a 1px-bordered surface with a slim chrome
 * row at the top showing the frame's label, plus an optional caption
 * beneath. Used for SSO / SCIM / Teammates flow captures.
 *
 * Zoom and annotation are intentional non-goals for this phase — the
 * frame just provides the architectural container.
 */
export function WorkflowFrame({
  label,
  caption,
  meta,
  aspect = '16/9',
  variant = 'inset',
  className,
  children,
}: WorkflowFrameProps) {
  return (
    <figure className={cn('w-full', className)}>
      <div
        className={cn(
          'overflow-hidden rounded-md',
          variant === 'inset' && 'border border-line bg-surface',
        )}
      >
        {variant === 'inset' && label && (
          <header className="flex items-center justify-between gap-3 border-b border-line-soft bg-canvas px-4 py-2.5">
            <div className="flex items-center gap-2.5 text-[12px] text-ink-3">
              <FrameDots />
              <span className="font-mono">{label}</span>
            </div>
            {meta && <span className="text-[11px] text-ink-4">{meta}</span>}
          </header>
        )}
        <div className={cn('relative bg-surface-mute', aspectMap[aspect])}>
          {children}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-body-sm text-ink-3 text-pretty">{caption}</figcaption>
      )}
    </figure>
  );
}

function FrameDots() {
  return (
    <span aria-hidden className="flex items-center gap-1">
      <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
      <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
      <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
    </span>
  );
}

/**
 * WorkflowFramePlaceholder — empty state for the foundational scaffold.
 *
 * Renders a quiet diagonal-hatched surface inside a WorkflowFrame so the
 * layout reads as "image slot here" without committing to any screenshot.
 */
export function WorkflowFramePlaceholder({
  label = 'screenshot.png',
  caption,
  aspect = '16/9',
}: Pick<WorkflowFrameProps, 'label' | 'caption' | 'aspect'>) {
  return (
    <WorkflowFrame label={label} caption={caption} aspect={aspect}>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, var(--color-line-soft) 0 1px, transparent 1px 14px)',
        }}
      >
        <span className="rounded border border-line bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-ink-4">
          Visual placeholder
        </span>
      </div>
    </WorkflowFrame>
  );
}
