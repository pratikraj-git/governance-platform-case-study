import { cn } from '@/lib/utils';

interface SectionContainerProps {
  id?: string;
  as?: 'section' | 'div' | 'article' | 'header' | 'footer';
  /** Inner max-width. `wide` = 1240, `narrow` = 880, `prose` = 680. */
  width?: 'wide' | 'narrow' | 'prose';
  /** Vertical spacing rhythm. `default` ≈ section, `tight` for sub-blocks. */
  spacing?: 'default' | 'tight' | 'flush';
  /** Optional top hairline divider. */
  topRule?: boolean;
  /** Optional bottom hairline divider. */
  bottomRule?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

const widthMap: Record<NonNullable<SectionContainerProps['width']>, string> = {
  wide:   'max-w-[var(--container-max)]',
  narrow: 'max-w-[var(--container-narrow)]',
  prose:  'max-w-[var(--container-prose)]',
};

const spacingMap: Record<NonNullable<SectionContainerProps['spacing']>, string> = {
  default: 'py-24 md:py-28 lg:py-36',
  tight:   'py-12 md:py-16 lg:py-20',
  flush:   'py-0',
};

/**
 * SectionContainer — the only horizontal & vertical rhythm primitive used
 * across the site. Sections never set their own padding; they wrap one of
 * these.
 *
 * - `wide`   (default): cap at 1240px. Use for module grids and split layouts.
 * - `narrow`:           cap at 880px.  Use for hero blocks and editorial headers.
 * - `prose`:            cap at 680px.  Use for long-form text passages.
 */
export function SectionContainer({
  id,
  as: Tag = 'section',
  width = 'wide',
  spacing = 'default',
  topRule = false,
  bottomRule = false,
  className,
  innerClassName,
  children,
}: SectionContainerProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'relative w-full',
        topRule && 'border-t border-line-soft',
        bottomRule && 'border-b border-line-soft',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto px-6 sm:px-10 lg:px-16',
          widthMap[width],
          spacingMap[spacing],
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
