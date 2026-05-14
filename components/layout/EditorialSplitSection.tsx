import { cn } from '@/lib/utils';

interface EditorialSplitSectionProps {
  /** Content for the text column. */
  text: React.ReactNode;
  /** Content for the visual column (diagrams, workflow frames, screenshots). */
  visual: React.ReactNode;
  /** Which side the visual sits on. Defaults to `right`. */
  visualSide?: 'left' | 'right';
  /** Column ratio. Defaults to a balanced 5/7 (text gets 5, visual gets 7). */
  ratio?: 'balanced' | 'text-heavy' | 'visual-heavy';
  /** Optional sticky behaviour for the text column on long pages. */
  stickyText?: boolean;
  className?: string;
}

const ratioMap: Record<NonNullable<EditorialSplitSectionProps['ratio']>, [string, string]> = {
  balanced:     ['lg:col-span-5', 'lg:col-span-7'],
  'text-heavy': ['lg:col-span-6', 'lg:col-span-6'],
  'visual-heavy':['lg:col-span-4', 'lg:col-span-8'],
};

/**
 * EditorialSplitSection — the workhorse for left/right systems storytelling.
 *
 * Renders a single 12-column grid on `lg`+, stacks on smaller breakpoints.
 * Has no padding of its own — drop it inside a `<SectionContainer>`.
 */
export function EditorialSplitSection({
  text,
  visual,
  visualSide = 'right',
  ratio = 'balanced',
  stickyText = false,
  className,
}: EditorialSplitSectionProps) {
  const [textSpan, visualSpan] = ratioMap[ratio];

  return (
    <div className={cn('grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16', className)}>
      <div
        className={cn(
          textSpan,
          visualSide === 'left' && 'lg:order-2',
          stickyText && 'lg:sticky lg:top-24 lg:self-start',
        )}
      >
        {text}
      </div>
      <div
        className={cn(
          visualSpan,
          visualSide === 'left' && 'lg:order-1',
        )}
      >
        {visual}
      </div>
    </div>
  );
}
