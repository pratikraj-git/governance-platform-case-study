'use client';

import Image, { type StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import { IN_VIEW, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface FigureProps {
  /** Public path or imported static image. */
  src: string | StaticImageData;
  /** Required alt — short, descriptive, no "image of". */
  alt: string;
  /** Optional figma-style frame label (top-left of the frame chrome). */
  label?: React.ReactNode;
  /** Optional right-aligned metadata (top-right of the frame chrome). */
  meta?: React.ReactNode;
  /** Caption rendered below the frame. */
  caption?: React.ReactNode;
  /**
   * Native pixel dimensions of the source. Used by Next.js to reserve
   * layout space and prevent CLS. Pass even rough values — the frame
   * always renders responsively at the container width.
   */
  width: number;
  height: number;
  /**
   * Responsive `sizes` hint for the image loader. Defaults to a sensible
   * editorial column width; override for full-bleed or sidebar uses.
   */
  sizes?: string;
  /** Set `true` on the first above-the-fold figure. */
  priority?: boolean;
  /** Optional max-width override for narrower visuals. */
  maxWidth?: 'prose' | 'narrow' | 'wide' | 'full';
  className?: string;
}

const widthMap: Record<NonNullable<FigureProps['maxWidth']>, string> = {
  prose:  'max-w-[var(--container-prose)]',
  narrow: 'max-w-[var(--container-narrow)]',
  wide:   'max-w-[var(--container-max)]',
  full:   '',
};

/**
 * Figure — calm editorial frame for real product screenshots.
 *
 * One visual primitive replaces a folder of synthetic SVG mocks. The frame
 * is intentionally restrained — a soft inset, a one-line label, a caption.
 * Next.js serves the image responsively (AVIF/WebP, lazy by default).
 */
export function Figure({
  src,
  alt,
  label,
  meta,
  caption,
  width,
  height,
  sizes = '(min-width: 1280px) 1080px, (min-width: 1024px) 880px, (min-width: 640px) 90vw, 100vw',
  priority = false,
  maxWidth = 'full',
  className,
}: FigureProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.7, ease: ease.standard }}
      className={cn('w-full', widthMap[maxWidth], className)}
    >
      <div className="overflow-hidden rounded-md border border-line bg-surface shadow-[0_1px_0_0_rgba(14,15,14,0.02),0_18px_40px_-24px_rgba(14,15,14,0.08)]">
        {(label || meta) && (
          <header className="flex items-center justify-between gap-3 border-b border-line-soft bg-canvas/60 px-4 py-2">
            <div className="flex items-center gap-2.5 text-[11px] font-mono text-ink-3">
              <FrameDots />
              {label && <span className="truncate">{label}</span>}
            </div>
            {meta && (
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-4">
                {meta}
              </span>
            )}
          </header>
        )}

        <div className="relative bg-surface-mute">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            quality={82}
            className="h-auto w-full"
          />
        </div>
      </div>

      {caption && (
        <figcaption className="mt-4 max-w-[var(--container-prose)] text-body-sm text-ink-3 text-pretty">
          {caption}
        </figcaption>
      )}
    </motion.figure>
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
